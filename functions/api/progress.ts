import type { Env } from '../_lib/env';
import { requireUser } from '../_lib/auth';
import { getDb } from '../_lib/db';
import { error, json } from '../_lib/http';

const LESSON_RE = /^[a-z0-9-]{1,40}$/;

/** Which lessons has this user finished? */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;
  const sql = await getDb(env);
  if (sql instanceof Response) return sql;

  const rows = (await sql`
    SELECT lesson_id, completed_at FROM cf_lesson_progress
    WHERE user_id = ${user.id} ORDER BY completed_at`) as { lesson_id: string; completed_at: string }[];
  return json({ completed: rows.map((r) => r.lesson_id) });
};

/** Mark a lesson finished. Idempotent. */
export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;

  let lessonId: unknown;
  try {
    lessonId = ((await request.json()) as { lessonId?: unknown }).lessonId;
  } catch {
    return error(400, 'BAD_JSON', 'Send { "lessonId": "..." }.');
  }
  if (typeof lessonId !== 'string' || !LESSON_RE.test(lessonId)) return error(400, 'INVALID', 'Unknown lesson.');

  const sql = await getDb(env);
  if (sql instanceof Response) return sql;
  await sql`
    INSERT INTO cf_lesson_progress (user_id, lesson_id) VALUES (${user.id}, ${lessonId})
    ON CONFLICT (user_id, lesson_id) DO NOTHING`;
  return json({ ok: true });
};
