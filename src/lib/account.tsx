import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { api, type Profile } from './api';
import { cf, CfError, problemKey, type CfSubmission, type CfUser } from './cf';
import { useI18n } from '@/i18n/I18nProvider';

type Status = 'idle' | 'loading' | 'ready' | 'error';

type AccountCtx = {
  profile: Profile | null;
  profileStatus: Status;
  setProfile: (p: Profile) => void;

  handle: string | null;
  cfUser: CfUser | null;
  submissions: CfSubmission[] | null;
  cfStatus: Status;
  cfError: CfError | null;
  /** Problem keys like "4A" the user has an Accepted verdict on. */
  solved: Set<string>;
  /** Problem keys the user submitted to without an Accepted verdict. */
  attempted: Set<string>;
  refreshCf: () => Promise<void>;
  /** Merge freshly fetched submissions (e.g. from a verdict check). */
  mergeSubmissions: (subs: CfSubmission[]) => void;
};

const Ctx = createContext<AccountCtx | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const { lang, setLang } = useI18n();
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [profileStatus, setProfileStatus] = useState<Status>('loading');
  const [cfUser, setCfUser] = useState<CfUser | null>(null);
  const [submissions, setSubmissions] = useState<CfSubmission[] | null>(null);
  const [cfStatus, setCfStatus] = useState<Status>('idle');
  const [cfError, setCfError] = useState<CfError | null>(null);
  const langApplied = useRef(false);
  const langRef = useRef(lang);
  langRef.current = lang;

  // Load the saved profile once per sign-in.
  useEffect(() => {
    let alive = true;
    api<{ profile: Profile }>('/api/profile')
      .then(({ profile }) => {
        if (!alive) return;
        setProfileState(profile);
        setProfileStatus('ready');
        if (!langApplied.current && profile.lang && profile.lang !== langRef.current) setLang(profile.lang);
        langApplied.current = true;
      })
      .catch(() => alive && setProfileStatus('error'));
    return () => {
      alive = false;
    };
  }, [setLang]);

  const handle = profile?.cfHandle ?? null;

  const load = useCallback(async (h: string, fresh: boolean) => {
    setCfStatus('loading');
    setCfError(null);
    try {
      const user = await cf.user(h, fresh);
      setCfUser(user);
      const subs = await cf.status(h, fresh);
      setSubmissions(subs);
      setCfStatus('ready');
    } catch (e) {
      setCfError(e instanceof CfError ? e : new CfError(String(e), 'api'));
      setCfStatus('error');
    }
  }, []);

  useEffect(() => {
    setCfUser(null);
    setSubmissions(null);
    if (!handle) {
      setCfStatus('idle');
      return;
    }
    void load(handle, false);
  }, [handle, load]);

  const refreshCf = useCallback(async () => {
    if (handle) await load(handle, true);
  }, [handle, load]);

  const mergeSubmissions = useCallback((fresh: CfSubmission[]) => {
    setSubmissions((old) => {
      const byId = new Map((old ?? []).map((s) => [s.id, s]));
      for (const s of fresh) byId.set(s.id, s);
      return [...byId.values()].sort((a, b) => b.creationTimeSeconds - a.creationTimeSeconds);
    });
  }, []);

  const { solved, attempted } = useMemo(() => {
    const solved = new Set<string>();
    const attempted = new Set<string>();
    for (const s of submissions ?? []) {
      const k = problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index });
      if (s.verdict === 'OK') solved.add(k);
      else attempted.add(k);
    }
    for (const k of solved) attempted.delete(k);
    return { solved, attempted };
  }, [submissions]);

  const value = useMemo<AccountCtx>(
    () => ({
      profile,
      profileStatus,
      setProfile: setProfileState,
      handle,
      cfUser,
      submissions,
      cfStatus,
      cfError,
      solved,
      attempted,
      refreshCf,
      mergeSubmissions,
    }),
    [profile, profileStatus, handle, cfUser, submissions, cfStatus, cfError, solved, attempted, refreshCf, mergeSubmissions],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAccount must be used inside AccountProvider');
  return v;
}
