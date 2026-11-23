import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getAccessToken } from './auth';

export type TutorContext =
  | { kind: 'problem'; id: string }
  | { kind: 'lesson'; id: string }
  | { kind: 'tag'; id: string }
  | { kind: 'toolkit'; id?: string }
  | { kind: 'contests' }
  | { kind: 'general' };

export type TutorPage = { context: TutorContext; label: string };

type Ctx = {
  page: TutorPage;
  setPage: (p: TutorPage | null) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  /** Open the tutor and start a question right away (e.g. from a button on a page). */
  ask: (text: string, mode?: string) => void;
  pending: { text: string; mode?: string } | null;
  clearPending: () => void;
};

const GENERAL: TutorPage = { context: { kind: 'general' }, label: '' };
const TutorCtx = createContext<Ctx | null>(null);

export function TutorProvider({ children }: { children: ReactNode }) {
  const [page, setPageState] = useState<TutorPage>(GENERAL);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<{ text: string; mode?: string } | null>(null);

  const setPage = useCallback((p: TutorPage | null) => setPageState(p ?? GENERAL), []);
  const ask = useCallback((text: string, mode?: string) => {
    setPending({ text, mode });
    setOpen(true);
  }, []);
  const clearPending = useCallback(() => setPending(null), []);

  const value = useMemo(() => ({ page, setPage, open, setOpen, ask, pending, clearPending }), [page, setPage, open, ask, pending, clearPending]);
  return <TutorCtx.Provider value={value}>{children}</TutorCtx.Provider>;
}

export function useTutor() {
  const v = useContext(TutorCtx);
  if (!v) throw new Error('useTutor must be used inside TutorProvider');
  return v;
}

/** Pages call this to tell the tutor what the student is looking at. */
export function useTutorPage(context: TutorContext, label: string) {
  const { setPage } = useTutor();
  const key = JSON.stringify(context);
  useEffect(() => {
    setPage({ context: JSON.parse(key) as TutorContext, label });
    return () => setPage(null);
  }, [key, label, setPage]);
}

export type Usage = { enabled: boolean; limit: number; used: number; remaining: number; resetsIn: number };

export class TutorError extends Error {
  constructor(
    public code: string,
    public resetsIn?: number,
  ) {
    super(code);
  }
}

/** Stream an answer. Calls onText with each new piece. */
export async function streamAnswer(
  req: { messages: { role: 'user' | 'model'; text: string }[]; context: TutorContext; lang: string; mode: string; code?: string },
  onText: (chunk: string) => void,
  signal: AbortSignal,
): Promise<{ used?: number; limit?: number }> {
  const token = await getAccessToken();
  let res: Response;
  try {
    res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(req),
      signal,
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e;
    throw new TutorError('NETWORK');
  }
  if (!res.ok || !res.body) {
    const data = (await res.json().catch(() => ({}))) as { error?: { code?: string }; resetsIn?: number };
    throw new TutorError(data.error?.code ?? 'UPSTREAM', data.resetsIn);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    onText(dec.decode(value, { stream: true }));
  }
  return { used: Number(res.headers.get('x-tutor-used')) || undefined, limit: Number(res.headers.get('x-tutor-limit')) || undefined };
}

export async function fetchUsage(): Promise<Usage | null> {
  try {
    const token = await getAccessToken();
    const res = await fetch('/api/tutor', { headers: token ? { authorization: `Bearer ${token}` } : {} });
    if (!res.ok) return null;
    return (await res.json()) as Usage;
  } catch {
    return null;
  }
}
