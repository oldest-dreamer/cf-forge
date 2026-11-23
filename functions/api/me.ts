import type { Env } from '../_lib/env';
import { requireUser } from '../_lib/auth';
import { json } from '../_lib/http';

/** Who am I? Proves the backend trusts the browser's Neon Auth session. */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const user = await requireUser(request, env);
  if (user instanceof Response) return user;
  return json({ user, database: Boolean(env.DATABASE_URL) });
};
