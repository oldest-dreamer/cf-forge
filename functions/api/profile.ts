import type { Env } from '../_lib/env';
import { requireUser } from '../_lib/auth';
import { getDb } from '../_lib/db';
import { error, json } from '../_lib/http';
import { cleanProfile, type ProfileInput, type Row } from '../_lib/profile';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;
  const sql = await getDb(env);
  if (sql instanceof Response) return sql;

  const rows = (await sql`
    SELECT display_name, cf_handle, lang, created_at
    FROM cf_profiles WHERE user_id = ${user.id}`) as Row[];
  const row = rows[0];

  return json({
    profile: {
      displayName: row?.display_name ?? user.name,
      cfHandle: row?.cf_handle ?? null,
      lang: row?.lang ?? null,
      email: user.email,
      createdAt: row?.created_at ?? null,
    },
  });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;

  let body: ProfileInput;
  try {
    body = (await request.json()) as ProfileInput;
  } catch {
    return error(400, 'BAD_JSON', 'Send the profile as JSON.');
  }
  const clean = cleanProfile(body);
  if (typeof clean === 'string') return error(400, 'INVALID', clean);

  const sql = await getDb(env);
  if (sql instanceof Response) return sql;

  const rows = (await sql`
    INSERT INTO cf_profiles (user_id, display_name, cf_handle, lang)
    VALUES (${user.id}, ${clean.displayName}, ${clean.cfHandle}, ${clean.lang})
    ON CONFLICT (user_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      cf_handle    = EXCLUDED.cf_handle,
      lang         = EXCLUDED.lang,
      updated_at   = now()
    RETURNING display_name, cf_handle, lang, created_at`) as Row[];

  const row = rows[0];
  return json({
    profile: {
      displayName: row.display_name,
      cfHandle: row.cf_handle,
      lang: row.lang,
      email: user.email,
      createdAt: row.created_at,
    },
  });
};
