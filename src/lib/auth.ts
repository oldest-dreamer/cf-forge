import { createAuthClient } from '@neon/neon-js/auth';
import { BetterAuthReactAdapter } from '@neon/neon-js/auth/react/adapters';

/**
 * Neon Auth base URL. It is public (the browser talks to it directly),
 * so a build-time env var can override it but a default is safe to ship.
 */
export const NEON_AUTH_URL: string =
  import.meta.env.VITE_NEON_AUTH_URL ||
  'https://ep-green-dew-bib9sv10.neonauth.c-5.ap-southeast-1.aws.neon.tech/neondb/auth';

export const authClient = createAuthClient(NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  createdAt?: string | Date;
};

/** The signed JWT for the current session, sent to our own API. */
export async function getAccessToken(): Promise<string | null> {
  const res = await authClient.getSession();
  const token = (res.data?.session as { token?: string } | undefined)?.token;
  if (token && token.split('.').length === 3) return token;
  // Fallback: ask the JWT plugin directly.
  const t = await (authClient as unknown as { token: () => Promise<{ data?: { token?: string } }> }).token();
  return t.data?.token ?? null;
}

/** Only allow in-site redirects after login. */
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/';
  if (next.startsWith('/login') || next.startsWith('/signup')) return '/';
  return next;
}
