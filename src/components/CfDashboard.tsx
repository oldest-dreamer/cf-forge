import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useReducedMotion } from 'motion/react';
import { ExternalLink, RefreshCw, Target } from 'lucide-react';
import { useAccount } from '@/lib/account';
import { cf, cfProfileUrl, cfSubmissionUrl, problemKey, type CfRatingChange } from '@/lib/cf';
import { rankFor } from '@/lib/ranks';
import { TAGS, type TagInfo } from '@/data/tags/tags';
import { PROBLEM_BY_ID } from '@/data/problems';
import { useI18n } from '@/i18n/I18nProvider';
import { CFS } from '@/i18n/cfStrings';
import { RatingGraph } from './RatingGraph';
import { VerdictChip, timeAgo } from './Verdict';
import { cn } from '@/lib/cn';

function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { num } = useI18n();
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) return setV(value);
    const c = animate(0, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [value, reduce]);
  return (
    <>
      {num(v)}
      {suffix}
    </>
  );
}

function CfPhoto({ src, handle, color }: { src: string; handle: string; color?: string }) {
  const [broken, setBroken] = useState(false);
  if (broken || !src)
    return (
      <span
        className="grid size-20 place-items-center rounded-xl bg-iron-2 font-display text-3xl font-bold ring-1 ring-seam"
        style={{ color }}
        aria-hidden="true"
      >
        {handle.charAt(0).toUpperCase()}
      </span>
    );
  return (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
      className="size-20 rounded-xl object-cover ring-1 ring-seam"
    />
  );
}

function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-2xl border border-seam bg-iron/50 p-5 sm:p-6', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {[120, 300, 220].map((h, i) => (
        <motion.div
          key={i}
          className="rounded-2xl bg-iron/70"
          style={{ height: h }}
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function CfDashboard() {
  const { t, num } = useI18n();
  const { handle, cfUser, submissions, cfStatus, cfError, refreshCf } = useAccount();
  const [ratings, setRatings] = useState<CfRatingChange[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRatings(null);
    if (!handle) return;
    let alive = true;
    cf.rating(handle)
      .then((r) => alive && setRatings(r))
      .catch(() => alive && setRatings([]));
    return () => {
      alive = false;
    };
  }, [handle]);

  const stats = useMemo(() => {
    const subs = submissions ?? [];
    const ok = subs.filter((s) => s.verdict === 'OK').length;

    // Unique solved problems with their rating and tags.
    const solvedProblems = new Map<string, { rating?: number; tags: string[] }>();
    for (const s of subs) {
      if (s.verdict !== 'OK') continue;
      const k = problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index });
      if (!solvedProblems.has(k)) solvedProblems.set(k, { rating: s.problem.rating, tags: s.problem.tags });
    }

    const byRating = new Map<number, number>();
    let unrated = 0;
    const byTag = new Map<string, number>();
    for (const p of solvedProblems.values()) {
      if (p.rating) byRating.set(p.rating, (byRating.get(p.rating) ?? 0) + 1);
      else unrated++;
      for (const tg of p.tags) byTag.set(tg, (byTag.get(tg) ?? 0) + 1);
    }
    const ratingBuckets = [...byRating.entries()].sort((a, b) => a[0] - b[0]);

    const tagRows = TAGS.map((tag) => ({ tag: tag as TagInfo, n: byTag.get(tag.cf) ?? 0 }))
      .filter((r) => r.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 10);

    const weak = TAGS.filter((tg) => tg.group === 'core')
      .map((tag) => ({ tag: tag as TagInfo, n: byTag.get(tag.cf) ?? 0 }))
      .sort((a, b) => a.n - b.n)
      .slice(0, 4);

    return {
      solvedCount: solvedProblems.size,
      total: subs.length,
      acc: subs.length ? Math.round((ok / subs.length) * 100) : 0,
      ratingBuckets,
      unrated,
      tagRows,
      weak,
    };
  }, [submissions]);

  async function onRefresh() {
    if (!handle) return;
    setRefreshing(true);
    await refreshCf();
    try {
      setRatings(await cf.rating(handle, true));
    } catch {
      /* keep old graph */
    }
    setRefreshing(false);
  }

  if (!handle) {
    return (
      <div className="rounded-2xl border border-dashed border-seam p-8">
        <h2 className="text-xl font-semibold">{t(CFS.dash.noHandleTitle)}</h2>
        <p className="mt-2 max-w-[56ch] text-ash/75">{t(CFS.dash.noHandleBody)}</p>
      </div>
    );
  }

  if (cfStatus === 'error' && cfError) {
    return (
      <div className="rounded-2xl border border-[#ff7b72]/40 bg-[#ff7b72]/8 p-6" role="alert">
        <p className="text-ash">{t(CFS.dash.error[cfError.kind])}</p>
        <button onClick={onRefresh} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-seam px-3 py-1.5 text-sm hover:bg-iron">
          <RefreshCw size={14} /> {t(CFS.dash.refresh)}
        </button>
      </div>
    );
  }

  if (!cfUser || !submissions) {
    return (
      <div>
        <p className="mb-4 text-sm text-slate" role="status">
          {t(CFS.dash.loading)}
        </p>
        <Skeleton />
      </div>
    );
  }

  const rated = typeof cfUser.rating === 'number';
  const rank = rankFor(cfUser.rating ?? 0);
  const maxRank = rankFor(cfUser.maxRating ?? 0);
  const target = Math.min(3500, Math.max(800, Math.round(((cfUser.rating ?? 800) + 200) / 100) * 100));
  const maxBucket = Math.max(1, ...stats.ratingBuckets.map(([, n]) => n));
  const maxTag = Math.max(1, ...stats.tagRows.map((r) => r.n));

  return (
    <div className="space-y-5">
      {/* Identity */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-seam bg-iron/60 p-5 sm:p-6"
      >
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: rated ? rank.color : 'var(--color-seam)' }} />
        <div className="flex flex-wrap items-center gap-5">
          <CfPhoto src={cfUser.titlePhoto || cfUser.avatar} handle={cfUser.handle} color={rated ? rank.color : undefined} />
          <div className="min-w-0 flex-1">
            <p className="text-sm" style={{ color: rated ? rank.color : undefined }}>
              {rated ? t(rank.name) : t(CFS.dash.unrated)}
            </p>
            <p className="truncate font-display text-3xl font-bold" style={{ color: rated ? rank.color : 'var(--color-ash)' }}>
              {cfUser.handle}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate">
              <span>
                {t(CFS.dash.contribution)} <span className="text-ash tabular-nums">{num(cfUser.contribution)}</span>
              </span>
              <span>
                {t(CFS.dash.friendOf)} <span className="text-ash tabular-nums">{num(cfUser.friendOfCount)}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-sm text-slate">{t(CFS.dash.rating)}</p>
              <p className="font-display text-3xl font-bold tabular-nums" style={{ color: rated ? rank.color : undefined }}>
                {rated ? <CountUp value={cfUser.rating!} /> : '—'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate">{t(CFS.dash.maxRating)}</p>
              <p className="font-display text-3xl font-bold tabular-nums" style={{ color: rated ? maxRank.color : undefined }}>
                {rated ? <CountUp value={cfUser.maxRating ?? cfUser.rating!} /> : '—'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <a
            href={cfProfileUrl(cfUser.handle)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-slate underline decoration-seam underline-offset-4 hover:text-ash"
          >
            {t(CFS.dash.openCf)} <ExternalLink size={13} />
          </a>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-seam px-3 py-1.5 text-slate hover:bg-iron-2 hover:text-ash disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : undefined} /> {t(CFS.dash.refresh)}
          </button>
        </div>
      </motion.section>

      {/* Headline numbers */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: CFS.dash.solved, v: stats.solvedCount },
          { label: CFS.dash.submissions, v: stats.total },
          { label: CFS.dash.acceptance, v: stats.acc, suffix: '%' },
          { label: CFS.dash.contests, v: ratings?.length ?? 0 },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-seam bg-iron/50 px-4 py-4"
          >
            <p className="text-sm text-slate">{t(s.label)}</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">
              <CountUp value={s.v} suffix={s.suffix} />
            </p>
          </motion.div>
        ))}
      </div>

      {/* Rating history */}
      <Panel title={t(CFS.dash.graphTitle)}>
        {ratings === null ? (
          <div className="h-[300px] animate-pulse rounded-xl bg-iron/70" />
        ) : ratings.length === 0 ? (
          <p className="text-slate">{t(CFS.dash.graphEmpty)}</p>
        ) : (
          <RatingGraph changes={ratings} />
        )}
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Solved by rating */}
        <Panel title={t(CFS.dash.byRatingTitle)}>
          {stats.ratingBuckets.length === 0 ? (
            <p className="text-slate">{t(CFS.dash.byRatingEmpty)}</p>
          ) : (
            <>
              <div className="flex h-48 items-end gap-[2px]" role="list">
                {stats.ratingBuckets.map(([r, n], i) => (
                  <div key={r} role="listitem" className="group relative flex h-full flex-1 flex-col justify-end">
                    <motion.div
                      className="w-full rounded-t-[4px]"
                      style={{ background: rankFor(r).color }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(n / maxBucket) * 100}%` }}
                      transition={{ delay: 0.03 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      aria-label={`${num(r)}: ${num(n)}`}
                    />
                    <span className="pointer-events-none absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-seam bg-iron px-2 py-1 text-xs text-ash group-hover:block">
                      {num(r)}: {num(n)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-[2px] text-[10px] text-slate tabular-nums">
                {stats.ratingBuckets.map(([r], i) => (
                  <span key={r} className="flex-1 text-center">
                    {stats.ratingBuckets.length <= 14 || i % 2 === 0 ? num(r) : ''}
                  </span>
                ))}
              </div>
            </>
          )}
          {stats.unrated > 0 && (
            <p className="mt-3 text-sm text-slate">
              +{num(stats.unrated)} {t(CFS.dash.unratedProblems)}
            </p>
          )}
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-steel/60 p-4">
            <Target size={18} className="mt-0.5 shrink-0 text-ember" />
            <p className="text-sm text-ash/85">
              <span className="font-semibold" style={{ color: rankFor(target).color }}>
                {t(CFS.dash.target)} {num(target)}
              </span>
              <span className="text-slate"> {t(CFS.dash.targetBody)}</span>
            </p>
          </div>
        </Panel>

        {/* Tags */}
        <Panel title={t(CFS.dash.tagsTitle)}>
          {stats.tagRows.length === 0 ? (
            <p className="text-slate">{t(CFS.dash.byRatingEmpty)}</p>
          ) : (
            <ul className="space-y-2">
              {stats.tagRows.map((r, i) => (
                <li key={r.tag.slug}>
                  <Link to={`/tags/${r.tag.slug}`} className="group grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3 text-sm">
                    <span className="truncate text-ash/85 group-hover:text-ember">{t(r.tag.name)}</span>
                    <span className="h-2 rounded-full bg-iron-2">
                      <motion.span
                        className="block h-full rounded-full bg-ember"
                        initial={{ width: 0 }}
                        animate={{ width: `${(r.n / maxTag) * 100}%` }}
                        transition={{ delay: 0.04 * i, duration: 0.5 }}
                      />
                    </span>
                    <span className="text-right text-ash tabular-nums">{num(r.n)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <h3 className="mt-6 font-semibold">{t(CFS.dash.trainNext)}</h3>
          <p className="text-sm text-slate">{t(CFS.dash.trainNextBody)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stats.weak.map((w) => (
              <Link
                key={w.tag.slug}
                to={`/tags/${w.tag.slug}`}
                className="rounded-full px-3 py-1 text-sm text-ash/90 ring-1 ring-seam transition-colors hover:text-ember hover:ring-ember/50"
              >
                {t(w.tag.name)} <span className="text-slate tabular-nums">{num(w.n)}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>

      {/* Recent submissions */}
      <Panel title={t(CFS.dash.recentTitle)}>
        {submissions.length === 0 ? (
          <p className="text-slate">{t(CFS.dash.recentEmpty)}</p>
        ) : (
          <ul className="divide-y divide-seam/60">
            {submissions.slice(0, 12).map((s) => {
              const key = problemKey({ contestId: s.problem.contestId ?? s.contestId, index: s.problem.index });
              const hosted = PROBLEM_BY_ID[key];
              return (
                <li key={s.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5 text-sm">
                  <span className="w-24 shrink-0 text-slate">{timeAgo(s.creationTimeSeconds, t, num)}</span>
                  <span className="min-w-0 flex-1 truncate">
                    {hosted ? (
                      <Link to={`/problems/${hosted.id}`} className="text-ash hover:text-ember">
                        {key} {s.problem.name}
                      </Link>
                    ) : (
                      <span className="text-ash/90">
                        {key} {s.problem.name}
                      </span>
                    )}
                  </span>
                  <a href={cfSubmissionUrl(s)} target="_blank" rel="noreferrer" className="shrink-0">
                    <VerdictChip s={s} />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </div>
  );
}
