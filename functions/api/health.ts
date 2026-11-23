import type { Env } from '../_lib/env';
import { json } from '../_lib/http';

/** Public status check: is the API up and is the database connected? */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json({ ok: true, database: Boolean(env.DATABASE_URL) });
};
