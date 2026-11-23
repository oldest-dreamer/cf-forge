import type { Env } from '../_lib/env';
import { json } from '../_lib/http';
import { pickModels, rememberGood } from './tutor';

/**
 * Public health check for the tutor: is the Gemini key accepted, which model is
 * picked, and does a tiny request succeed? Never returns the key. Cached for
 * 5 minutes per worker so it cannot be used to burn quota.
 */
let cached: { at: number; body: unknown } | null = null;

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (cached && Date.now() - cached.at < 300_000) return json(cached.body);
  const key = env.GEMINI_API_KEY;
  if (!key) return json({ keyPresent: false });

  const base = (env.GEMINI_BASE || 'https://generativelanguage.googleapis.com').replace(/\/$/, '');
  const out: Record<string, unknown> = {
    keyPresent: true,
    keyLooksLike: `${key.length} chars, starts "${key.slice(0, 4)}", ${/\s/.test(key) ? 'HAS WHITESPACE' : 'no whitespace'}`,
  };

  const list = await fetch(`${base}/v1beta/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
  const listBody = (await list.json().catch(() => ({}))) as { models?: { name: string }[]; error?: { message?: string } };
  out.listStatus = list.status;
  out.listError = listBody.error?.message;
  out.flashModels = (listBody.models ?? []).map((m) => m.name.replace(/^models\//, '')).filter((n) => n.includes('flash')).slice(0, 30);
  const models = await pickModels(env, base);
  out.picked = models;

  // Probe one model at a time and stop at the first that answers, so the check
  // itself does not use up the free per-minute quota.
  const tries: { model: string; status: number; error?: string; reply?: string }[] = [];
  for (const model of models) {
    try {
      const res = await fetch(`${base}/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Reply with the single word OK.' }] }], generationConfig: { maxOutputTokens: 200 } }),
        signal: AbortSignal.timeout(8_000),
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: { message?: string; status?: string };
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      tries.push({
        model,
        status: res.status,
        error: body.error ? `${body.error.status ?? ''} ${body.error.message ?? ''}`.trim().slice(0, 160) : undefined,
        reply: body.candidates?.[0]?.content?.parts?.map((p) => p.text).join('')?.slice(0, 40),
      });
      if (res.ok) break;
    } catch {
      tries.push({ model, status: 0, error: 'timed out after 8 s' });
    }
  }
  const firstOk = tries.find((x) => x.status === 200);
  const ok = Boolean(firstOk);
  if (firstOk) rememberGood(firstOk.model);
  out.generate = tries;
  // Keep good results for 5 minutes, failures for only 30 seconds.
  cached = { at: Date.now() - (ok ? 0 : 270_000), body: out };
  return json(out);
};
