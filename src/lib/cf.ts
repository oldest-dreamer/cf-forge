/**
 * Codeforces API client that runs in the visitor's browser.
 * The API allows cross-origin calls, so every visitor uses their own rate limit.
 * Calls are spaced 2 s apart (the API's limit) and cached in sessionStorage.
 */

const BASE = 'https://codeforces.com/api/';
const GAP_MS = 2050;

export type CfUser = {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contribution: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  country?: string;
  organization?: string;
};

export type CfRatingChange = {
  contestId: number;
  contestName: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
};

export type CfProblem = {
  contestId?: number;
  index: string;
  name: string;
  rating?: number;
  tags: string[];
};

export type Verdict =
  | 'OK'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'COMPILATION_ERROR'
  | 'IDLENESS_LIMIT_EXCEEDED'
  | 'PRESENTATION_ERROR'
  | 'CHALLENGED'
  | 'SKIPPED'
  | 'TESTING'
  | 'PARTIAL'
  | 'FAILED'
  | 'REJECTED'
  | string;

export type CfSubmission = {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  problem: CfProblem;
  programmingLanguage: string;
  verdict?: Verdict;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
  author?: { participantType?: string };
};

export class CfError extends Error {
  constructor(
    message: string,
    public kind: 'not_found' | 'limit' | 'network' | 'api',
  ) {
    super(message);
  }
}

let nextSlot = 0;
const inflight = new Map<string, Promise<unknown>>();

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function takeSlot() {
  const now = Date.now();
  const at = Math.max(now, nextSlot);
  nextSlot = at + GAP_MS;
  if (at > now) await wait(at - now);
}

function cacheGet<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { exp, data } = JSON.parse(raw) as { exp: number; data: T };
    if (Date.now() > exp) return null;
    return data;
  } catch {
    return null;
  }
}

function cacheSet(key: string, data: unknown, ttlMs: number) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ exp: Date.now() + ttlMs, data }));
  } catch {
    /* storage full or blocked: skip caching */
  }
}

async function call<T>(method: string, params: Record<string, string | number>, opts: { ttlMs: number; fresh?: boolean }): Promise<T> {
  const qs = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString();
  const key = `cf:${method}?${qs}`;
  if (!opts.fresh) {
    const hit = cacheGet<T>(key);
    if (hit) return hit;
    const running = inflight.get(key);
    if (running) return running as Promise<T>;
  }

  const run = (async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      await takeSlot();
      let res: Response;
      try {
        res = await fetch(`${BASE}${method}?${qs}`);
      } catch {
        throw new CfError('Could not reach Codeforces.', 'network');
      }
      const body = (await res.json().catch(() => null)) as { status: string; result?: T; comment?: string } | null;
      if (body?.status === 'OK') {
        cacheSet(key, body.result, opts.ttlMs);
        return body.result as T;
      }
      const comment = body?.comment ?? `HTTP ${res.status}`;
      if (/not found/i.test(comment)) throw new CfError(comment, 'not_found');
      if (/limit exceeded/i.test(comment) || res.status === 503) {
        await wait(1500 * (attempt + 1));
        continue;
      }
      throw new CfError(comment, 'api');
    }
    throw new CfError('Codeforces is busy. Try again in a minute.', 'limit');
  })();

  inflight.set(key, run);
  try {
    return await run;
  } finally {
    inflight.delete(key);
  }
}

export const cf = {
  user: (handle: string, fresh = false) =>
    call<CfUser[]>('user.info', { handles: handle }, { ttlMs: 5 * 60_000, fresh }).then((r) => r[0]),
  rating: (handle: string, fresh = false) =>
    call<CfRatingChange[]>('user.rating', { handle }, { ttlMs: 10 * 60_000, fresh }),
  status: (handle: string, fresh = false) =>
    call<CfSubmission[]>('user.status', { handle }, { ttlMs: 3 * 60_000, fresh }),
  recent: (handle: string, count = 20) =>
    call<CfSubmission[]>('user.status', { handle, from: 1, count }, { ttlMs: 0, fresh: true }),
};

export const problemKey = (p: { contestId?: number; index: string }) => `${p.contestId ?? ''}${p.index}`.toUpperCase();

export const isPending = (v?: Verdict) => !v || v === 'TESTING';

export function cfSubmissionUrl(s: CfSubmission) {
  const c = s.contestId ?? s.problem.contestId;
  return c && c >= 100000
    ? `https://codeforces.com/gym/${c}/submission/${s.id}`
    : `https://codeforces.com/contest/${c}/submission/${s.id}`;
}

export function cfProfileUrl(handle: string) {
  return `https://codeforces.com/profile/${encodeURIComponent(handle)}`;
}
