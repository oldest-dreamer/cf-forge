import type { Env } from '../_lib/env';
import { requireUser } from '../_lib/auth';
import { getDb, type Sql } from '../_lib/db';
import { error, json } from '../_lib/http';
import { describeContext, systemPrompt, type TutorContext } from '../_lib/tutorContext';

const MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'];
const MAX_TURNS = 12;
const MAX_MSG = 4000;
const MAX_CODE = 12000;

type Turn = { role: 'user' | 'model'; text: string };
type Body = { messages?: unknown; context?: TutorContext; lang?: string; mode?: string; code?: unknown };

function limitOf(env: Env) {
  const n = Number(env.TUTOR_DAILY_LIMIT);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 25;
}

/** Seconds until the daily counter resets (midnight UTC). */
function resetsIn() {
  const now = new Date();
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.round((next - now.getTime()) / 1000);
}

async function usedToday(sql: Sql, userId: string): Promise<number> {
  const rows = (await sql`SELECT count FROM cf_ai_usage WHERE user_id = ${userId} AND day = (now() AT TIME ZONE 'UTC')::date`) as { count: number }[];
  return rows[0]?.count ?? 0;
}

/** How many questions are left today. */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;
  const sql = await getDb(env);
  if (sql instanceof Response) return sql;
  const limit = limitOf(env);
  const used = await usedToday(sql, user.id);
  return json({ enabled: Boolean(env.GEMINI_API_KEY), limit, used, remaining: Math.max(0, limit - used), resetsIn: resetsIn() });
};

/** Ask the tutor. Streams plain text back. */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;
  if (!env.GEMINI_API_KEY) return error(503, 'TUTOR_OFF', 'The tutor is not connected yet.');

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return error(400, 'BAD_JSON', 'Send the question as JSON.');
  }

  const turns: Turn[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m): m is Turn => !!m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string')
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_MSG) }));
  if (!turns.length || turns[turns.length - 1].role !== 'user' || !turns[turns.length - 1].text.trim()) {
    return error(400, 'EMPTY', 'Ask a question first.');
  }
  const code = typeof body.code === 'string' ? body.code.slice(0, MAX_CODE) : '';
  if (code.trim()) {
    const last = turns[turns.length - 1];
    last.text = `${last.text}\n\nMy code:\n\`\`\`cpp\n${code}\n\`\`\``;
  }

  const sql = await getDb(env);
  if (sql instanceof Response) return sql;
  const limit = limitOf(env);

  // Count this question atomically; nothing is returned once the limit is reached.
  const counted = (await sql`
    INSERT INTO cf_ai_usage (user_id, day, count)
    VALUES (${user.id}, (now() AT TIME ZONE 'UTC')::date, 1)
    ON CONFLICT (user_id, day) DO UPDATE SET count = cf_ai_usage.count + 1
    WHERE cf_ai_usage.count < ${limit}
    RETURNING count`) as { count: number }[];
  if (!counted.length) {
    return json({ error: { code: 'LIMIT', message: 'Daily limit reached.' }, limit, resetsIn: resetsIn() }, { status: 429 });
  }
  const used = counted[0].count;
  const refund = () => sql`UPDATE cf_ai_usage SET count = GREATEST(count - 1, 0) WHERE user_id = ${user.id} AND day = (now() AT TIME ZONE 'UTC')::date`;

  const lang = body.lang === 'bn' ? 'bn' : 'en';
  const mode = typeof body.mode === 'string' ? body.mode : 'free';
  const payload = {
    systemInstruction: { parts: [{ text: systemPrompt(lang, describeContext(body.context), mode) }] },
    contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    generationConfig: { maxOutputTokens: 1400 },
  };

  const base = (env.GEMINI_BASE || 'https://generativelanguage.googleapis.com').replace(/\/$/, '');
  const models = env.GEMINI_MODEL ? [env.GEMINI_MODEL] : MODELS;
  let upstream: Response | null = null;
  let lastStatus = 0;
  for (const model of models) {
    const res = await fetch(`${base}/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify(payload),
    });
    if (res.ok && res.body) {
      upstream = res;
      break;
    }
    lastStatus = res.status;
    // Unknown or retired model: try the next one. Anything else: stop.
    if (res.status !== 404 && res.status !== 400) break;
  }

  if (!upstream?.body) {
    await refund();
    const code = lastStatus === 429 ? 'BUSY' : 'UPSTREAM';
    return error(lastStatus === 429 ? 503 : 502, code, 'The tutor could not answer right now.');
  }

  // Turn Gemini's server-sent events into a plain text stream for the browser.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  let buffer = '';
  let produced = false;

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        if (!produced) await refund();
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        try {
          const evt = JSON.parse(line.slice(5)) as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] };
          const parts = evt.candidates?.[0]?.content?.parts ?? [];
          const text = parts.filter((p) => !p.thought).map((p) => p.text ?? '').join('');
          if (text) {
            produced = true;
            controller.enqueue(encoder.encode(text));
          }
        } catch {
          /* ignore partial or keep-alive lines */
        }
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-tutor-used': String(used),
      'x-tutor-limit': String(limit),
    },
  });
};
