import { getAccessToken } from './auth';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

/** Call our own Cloudflare API with the user's session token attached. */
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  if (token) headers.set('authorization', `Bearer ${token}`);
  if (init.body && !headers.has('content-type')) headers.set('content-type', 'application/json');

  const res = await fetch(path, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = (data as { error?: { code?: string; message?: string } }).error;
    throw new ApiError(res.status, e?.code ?? 'HTTP_' + res.status, e?.message ?? res.statusText);
  }
  return data as T;
}

export type Profile = {
  displayName: string | null;
  cfHandle: string | null;
  lang: 'en' | 'bn' | null;
  email: string | null;
  createdAt: string | null;
};

export const HANDLE_RE = /^[A-Za-z0-9_.-]{3,24}$/;
