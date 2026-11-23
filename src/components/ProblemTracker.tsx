import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, CircleDashed, ExternalLink, Loader2, RefreshCw, Send, XCircle } from 'lucide-react';
import { useAccount } from '@/lib/account';
import { cf, cfSubmissionUrl, isPending, problemKey, type CfSubmission } from '@/lib/cf';
import { cfProblemUrl, type ProblemEntry } from '@/data/problems/types';
import { useI18n } from '@/i18n/I18nProvider';
import { CFS } from '@/i18n/cfStrings';
import { VerdictChip, timeAgo } from './Verdict';

const POLL_MS = 5000;
const POLL_MAX = 36; // about 3 minutes

function useAttempts(p: ProblemEntry): CfSubmission[] {
  const { submissions } = useAccount();
  return useMemo(() => {
    const key = problemKey(p);
    return (submissions ?? []).filter(
      (s) => problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index }) === key,
    );
  }, [submissions, p]);
}

/** Small status chip for the top of a problem page. */
export function ProblemStatusBadge({ p }: { p: ProblemEntry }) {
  const { t } = useI18n();
  const { handle, solved, attempted } = useAccount();
  if (!handle) return null;
  const key = problemKey(p);
  if (solved.has(key))
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#56d364]/12 px-2.5 py-0.5 text-sm text-[#56d364] ring-1 ring-[#56d364]/35">
        <CheckCircle2 size={14} /> {t(CFS.track.solved)}
      </span>
    );
  if (attempted.has(key))
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff7b72]/10 px-2.5 py-0.5 text-sm text-[#ff7b72] ring-1 ring-[#ff7b72]/30">
        <XCircle size={14} /> {t(CFS.track.tried)}
      </span>
    );
  return null;
}

function Burst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <span className="pointer-events-none absolute left-6 top-6" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full"
            style={{ background: i % 2 ? '#56d364' : 'var(--color-ember)' }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * 46, y: Math.sin(a) * 46, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        );
      })}
    </span>
  );
}

export function ProblemTracker({ p }: { p: ProblemEntry }) {
  const { t, num } = useI18n();
  const { handle, solved, mergeSubmissions } = useAccount();
  const attempts = useAttempts(p);
  const [checking, setChecking] = useState(false);
  const [watching, setWatching] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const polls = useRef(0);
  const wasSolved = useRef(solved.has(problemKey(p)));

  const latest = attempts[0];
  const isSolved = solved.has(problemKey(p));

  // Celebrate the moment this problem flips to Accepted.
  useEffect(() => {
    if (isSolved && !wasSolved.current) {
      setCelebrate(true);
      const id = setTimeout(() => setCelebrate(false), 1200);
      wasSolved.current = true;
      return () => clearTimeout(id);
    }
    wasSolved.current = isSolved;
  }, [isSolved]);

  async function check() {
    if (!handle) return;
    setChecking(true);
    try {
      const recent = await cf.recent(handle, 20);
      mergeSubmissions(recent);
      const mine = recent.filter(
        (s) => problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index }) === problemKey(p),
      );
      if (mine[0] && isPending(mine[0].verdict)) {
        polls.current = 0;
        setWatching(true);
      } else {
        setWatching(false);
      }
    } catch {
      setWatching(false);
    } finally {
      setChecking(false);
    }
  }

  // While a submission is still being judged, poll until it finishes.
  useEffect(() => {
    if (!watching || !handle) return;
    const id = setInterval(async () => {
      polls.current += 1;
      if (polls.current > POLL_MAX) {
        setWatching(false);
        return;
      }
      try {
        const recent = await cf.recent(handle, 10);
        mergeSubmissions(recent);
        const mine = recent.find(
          (s) => problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index }) === problemKey(p),
        );
        if (mine && !isPending(mine.verdict)) setWatching(false);
      } catch {
        /* try again on the next tick */
      }
    }, POLL_MS);
    return () => clearInterval(id);
  }, [watching, handle, mergeSubmissions, p]);

  if (!handle) {
    return (
      <div className="rounded-2xl border border-dashed border-seam p-5">
        <h3 className="font-semibold">{t(CFS.track.title)}</h3>
        <p className="mt-1 text-sm text-ash/75">{t(CFS.track.needHandle)}</p>
        <Link to="/profile" className="mt-3 inline-block text-sm font-medium text-ember hover:underline">
          {t(CFS.track.goProfile)}
        </Link>
      </div>
    );
  }

  const headline = isSolved ? CFS.track.solved : attempts.length ? CFS.track.tried : CFS.track.notTried;
  const HeadIcon = isSolved ? CheckCircle2 : attempts.length ? XCircle : CircleDashed;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-seam bg-iron/50 p-5">
      {celebrate && <Burst />}
      <div className="flex flex-wrap items-center gap-3">
        <motion.span
          key={String(isSolved)}
          initial={{ scale: 0.6, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className={isSolved ? 'text-[#56d364]' : attempts.length ? 'text-[#ff7b72]' : 'text-slate'}
        >
          <HeadIcon size={26} />
        </motion.span>
        <div>
          <p className="text-sm text-slate">{t(CFS.track.title)}</p>
          <p className="font-display text-lg font-semibold">{t(headline)}</p>
        </div>
        {latest && (
          <div className="ml-auto">
            <VerdictChip s={latest} size="lg" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={cfProblemUrl(p)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-ember px-4 py-2 text-sm font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98]"
        >
          <Send size={15} /> {t(CFS.track.submit)} <ExternalLink size={13} />
        </a>
        <button
          type="button"
          onClick={check}
          disabled={checking || watching}
          className="inline-flex items-center gap-2 rounded-xl border border-seam px-4 py-2 text-sm text-ash transition-colors hover:bg-iron-2 disabled:opacity-70"
        >
          {checking || watching ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
          {t(checking ? CFS.track.checking : CFS.track.check)}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {watching && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-sm text-ember"
            role="status"
          >
            {t(CFS.track.watching)}
          </motion.p>
        )}
      </AnimatePresence>
      {!watching && <p className="mt-3 text-sm text-slate">{t(CFS.track.howTo)}</p>}

      <h4 className="mt-5 text-sm font-medium text-ash/85">{t(CFS.track.attempts)}</h4>
      {attempts.length === 0 ? (
        <p className="mt-1 text-sm text-slate">{t(CFS.track.none)}</p>
      ) : (
        <ul className="mt-2 divide-y divide-seam/60">
          <AnimatePresence initial={false}>
            {attempts.slice(0, 6).map((s) => (
              <motion.li
                key={s.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-sm"
              >
                <span className="w-24 shrink-0 text-slate">{timeAgo(s.creationTimeSeconds, t, num)}</span>
                <span className="min-w-0 flex-1 truncate text-slate">{s.programmingLanguage}</span>
                <a href={cfSubmissionUrl(s)} target="_blank" rel="noreferrer">
                  <VerdictChip s={s} />
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
