import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey, type JWTPayload } from 'jose';
import { DEFAULT_NEON_AUTH_URL, type Env } from './env';
import { error } from './http';

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
};

// One JWKS fetcher per auth URL, reused across requests in the same isolate.
const jwksCache = new Map<string, JWTVerifyGetKey>();

function jwksFor(authUrl: string): JWTVerifyGetKey {
  let jwks = jwksCache.get(authUrl);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${authUrl.replace(/\/$/, '')}/.well-known/jwks.json`), {
      cooldownDuration: 30_000,
      cacheMaxAge: 10 * 60_000,
    });
    jwksCache.set(authUrl, jwks);
  }
  return jwks;
}

/** Verify a Neon Auth JWT and return the user it belongs to. */
export async function verifyToken(token: string, getKey: JWTVerifyGetKey): Promise<AuthUser> {
  const { payload } = await jwtVerify(token, getKey, { clockTolerance: 30 });
  return userFromPayload(payload);
}

export function userFromPayload(payload: JWTPayload): AuthUser {
  const p = payload as JWTPayload & { id?: string; email?: string; name?: string };
  const id = p.sub ?? p.id;
  if (!id) throw new Error('token has no subject');
  return { id, email: p.email ?? null, name: p.name ?? null };
}

/**
 * Read `Authorization: Bearer <jwt>` and verify it.
 * Returns the user, or a 401 Response to send back as-is.
 */
export async function requireUser(request: Request, env: Env): Promise<AuthUser | Response> {
  const header = request.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return error(401, 'NO_TOKEN', 'Sign in to use this.');
  try {
    return await verifyToken(match[1].trim(), jwksFor(env.NEON_AUTH_URL || DEFAULT_NEON_AUTH_URL));
  } catch {
    return error(401, 'BAD_TOKEN', 'Your session has expired. Sign in again.');
  }
}
