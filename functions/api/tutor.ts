import type { Env } from '../_lib/env';
import { requireUser } from '../_lib/auth';
import { getDb, type Sql } from '../_lib/db';
import { error, json } from '../_lib/http';
import { describeContext, systemPrompt, type TutorContext } from '../_lib/tutorContext';

const FALLBACK_MODELS = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];

/** The model that answered last, tried first for the next 10 minutes. */
let lastGood: { model: string; at: number } | null = null;

export function rememberGood(model: string) {
  lastGood = { model, at: Date.now() };
}

let modelCache: { at: number; models: string[] } | null = null;

/** Parse "gemini-3.8-flash" -> 3.8 so newer models sort first. */
function versionOf(name: string) {
  const m = /gemini-(\d+(?:\.\d+)?)/.exec(name);
  return m ? Number(m[1]) : 0;
}

/**
 * Ask Google which models this key can use, and prefer the newest stable Flash model.
 * Cached for an hour per worker. Falls back to a fixed list if listing fails.
 */
export async function pickModels(env: Env, base: string): Promise<string[]> {
  if (env.GEMINI_MODEL) return [env.GEMINI_MODEL];
  if (modelCache && Date.now() - modelCache.at < 3600_000) return withLastGood(modelCache.models);
  try {
    const res = await fetch(`${base}/v1beta/models?pageSize=200`, { headers: { 'x-goog-api-key': env.GEMINI_API_KEY! } });
    if (res.ok) {
      const data = (await res.json()) as { models?: { name: string; supportedGenerationMethods?: string[] }[] };
      const names = (data.models ?? [])
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => m.name.replace(/^models\//, ''))
        .filter((n) => /^gemini-[\d.]+-flash/.test(n) && versionOf(n) >= 3 && !/(tts|image|audio|live|embedding|robotics|computer|thinking-exp)/.test(n));
      const score = (n: string) => versionOf(n) * 10 - (n.includes('lite') ? 3 : 0) - (/preview|exp/.test(n) ? 5 : 0);
      const sorted = [...new Set(names)].sort((a, b) => score(b) - score(a));
      const full = sorted.filter((n) => !n.includes('lite') && !/preview|exp/.test(n)).slice(0, 3);
      const lite = sorted.filter((n) => n.includes('lite') && !/preview|exp/.test(n)).slice(0, 2);
      // Lite models first: on the free tier they answer reliably while the big ones are often busy.
      const ranked = [...lite, ...full];
      if (ranked.length) {
        modelCache = { at: Date.now(), models: ranked };
        return withLastGood(ranked);
      }
    }
  } catch {
    /* fall through */
  }
  return withLastGood(FALLBACK_MODELS);
}

function withLastGood(models: string[]) {
  if (!lastGood || Date.now() - lastGood.at > 600_000) return models;
  return [lastGood.model, ...models.filter((m) => m !== lastGood!.model)];
}
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

/** Ask the tutor. Streams plain text back. Unexpected crashes come back as readable JSON. */
export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    return await handlePost(ctx);
  } catch (e) {
    return json({ error: { code: 'UPSTREAM', message: 'The tutor crashed.', detail: String((e as Error)?.message ?? e).slice(0, 300) } }, { status: 500 });
  }
};

const handlePost: PagesFunction<Env> = async ({ request, env }) => {
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
    // Generous: Gemini 3 models spend part of this budget on internal thinking.
    generationConfig: { maxOutputTokens: 8192 },
  };

  const base = (env.GEMINI_BASE || 'https://generativelanguage.googleapis.com').replace(/\/$/, '');
  const models = await pickModels(env, base);
  let upstream: Response | null = null;
  let lastStatus = 0;
  let lastMessage = '';
  let tried = '';
  for (const model of models) {
    tried = model;
    // Give each model 6 s to start answering; the timer stops once headers arrive.
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 6_000);
    let res: Response;
    try {
      res = await fetch(`${base}/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify(payload),
        signal: ac.signal,
      });
    } catch {
      lastStatus = 504;
      lastMessage = 'timed out';
      continue;
    } finally {
      clearTimeout(timer);
    }
    if (res.ok && res.body) {
      upstream = res;
      rememberGood(model);
      break;
    }
    lastStatus = res.status;
    lastMessage = await res
      .json()
      .then((d) => String((d as { error?: { message?: string } }).error?.message ?? ''))
      .catch(() => '');
    // Busy, rate-limited, retired or unknown model: try the next one. A bad key or bad request: stop.
    const tryNext = [404, 429, 500, 503].includes(res.status) || (res.status === 400 && /model/i.test(lastMessage));
    if (!tryNext) break;
  }

  // Everything busy: wait a moment and give the first model one more try.
  if (!upstream?.body && [429, 500, 503, 504].includes(lastStatus)) {
    await new Promise((r) => setTimeout(r, 1500));
    const retry = await fetch(`${base}/v1beta/models/${models[0]}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (retry?.ok && retry.body) {
      upstream = retry;
      rememberGood(models[0]);
    } else if (retry) {
      lastStatus = retry.status;
      tried = models[0];
    }
  }

  if (!upstream?.body) {
    await refund();
    const code = lastStatus === 429 ? 'BUSY' : 'UPSTREAM';
    return json(
      {
        error: {
          code,
          message: 'The tutor could not answer right now.',
          detail: `Gemini ${lastStatus} (${tried}): ${lastMessage.slice(0, 300)}`,
        },
      },
      { status: lastStatus === 429 ? 503 : 502 },
    );
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
