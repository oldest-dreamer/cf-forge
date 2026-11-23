export interface Env {
  /** Neon Postgres connection string (secret). Set in Cloudflare Pages settings. */
  DATABASE_URL?: string;
  /** Neon Auth base URL. Public; defaults to the project's URL. */
  NEON_AUTH_URL?: string;
}

export const DEFAULT_NEON_AUTH_URL =
  'https://ep-green-dew-bib9sv10.neonauth.c-5.ap-southeast-1.aws.neon.tech/neondb/auth';
