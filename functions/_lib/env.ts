export interface Env {
  /** Neon Postgres connection string (secret). Set in Cloudflare Pages settings. */
  DATABASE_URL?: string;
  /** Neon Auth base URL. Public; defaults to the project's URL. */
  NEON_AUTH_URL?: string;
  /** Google AI Studio key for the tutor (secret). */
  GEMINI_API_KEY?: string;
  /** Optional: force a Gemini model, e.g. "gemini-3.8-flash". */
  GEMINI_MODEL?: string;
  /** Optional: questions per user per day (default 25). */
  TUTOR_DAILY_LIMIT?: string;
  /** Optional: API base URL, only for local testing. */
  GEMINI_BASE?: string;
  /** Optional: SQL-over-HTTP endpoint, only for local testing. */
  DATABASE_HTTP_ENDPOINT?: string;
}

export const DEFAULT_NEON_AUTH_URL =
  'https://ep-green-dew-bib9sv10.neonauth.c-5.ap-southeast-1.aws.neon.tech/neondb/auth';
