import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import type { Env } from './env';
import { error } from './http';

export type Sql = NeonQueryFunction<false, false>;

let schemaReady: Promise<void> | null = null;

/** Tables CF Forge owns. Safe to run many times. */
async function ensureSchema(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS cf_profiles (
      user_id      text PRIMARY KEY,
      display_name text,
      cf_handle    text,
      lang         text NOT NULL DEFAULT 'en' CHECK (lang IN ('en', 'bn')),
      created_at   timestamptz NOT NULL DEFAULT now(),
      updated_at   timestamptz NOT NULL DEFAULT now()
    )`;
}

/** A query function with the schema guaranteed, or a 503 Response if the DB is not connected. */
export async function getDb(env: Env): Promise<Sql | Response> {
  if (!env.DATABASE_URL) {
    return error(503, 'DB_NOT_CONFIGURED', 'The database is not connected yet.');
  }
  const sql = neon(env.DATABASE_URL);
  if (!schemaReady) {
    schemaReady = ensureSchema(sql).catch((e) => {
      schemaReady = null;
      throw e;
    });
  }
  await schemaReady;
  return sql;
}
