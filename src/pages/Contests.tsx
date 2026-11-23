import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { CONTESTS, SYSTEMS, type ContestType } from '@/data/contests';
import { RatingRange } from '@/components/RatingPill';
import { RANKS } from '@/lib/ranks';
import { cn } from '@/lib/cn';
import { PageHead } from '@/components/PageHead';

const FLOOR = 0;
const CEIL = 3800;

/** A thin strip of the rank spectrum with the rated audience lit up. */
function BandBar({ band }: { band: [number, number] }) {
  const [lo, hi] = band;
  return (
    <div className="relative h-2.5 overflow-hidden rounded-full bg-iron-2">
      <div className="absolute inset-0 flex opacity-25">
        {RANKS.map((r, i) => {
          const next = i + 1 < RANKS.length ? RANKS[i + 1].min : CEIL;
          return <span key={r.id} style={{ width: `${((next - r.min) / CEIL) * 100}%`, background: r.color }} />;
        })}
      </div>
      <motion.div
        className="absolute inset-y-0 flex overflow-hidden rounded-full"
        style={{ left: `${((lo - FLOOR) / CEIL) * 100}%`, width: `${((hi - lo) / CEIL) * 100}%` }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {RANKS.map((r, i) => {
          const next = i + 1 < RANKS.length ? RANKS[i + 1].min : CEIL;
          const a = Math.max(r.min, lo);
          const b = Math.min(next, hi);
          if (b <= a) return null;
          return <span key={r.id} style={{ width: `${((b - a) / (hi - lo)) * 100}%`, background: r.color }} />;
        })}
      </motion.div>
    </div>
  );
}

function ContestDetail({ c }: { c: ContestType }) {
  const { t } = useI18n();
  return (
    <motion.article
      key={c.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="text-3xl font-bold">{c.name}</h2>
        <span className="text-ash/80">{t(c.ratedFor)}</span>
      </div>
      <div className="mt-4">
        <BandBar band={c.band} />
      </div>

      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-slate">{t(S.contests.scoring)}</dt>
          <dd className="mt-1">{t(SYSTEMS[c.scoring].name)}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate">{t(S.contests.shape)}</dt>
          <dd className="mt-1">{t(c.shape)}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate">{t(S.contests.hacks)}</dt>
          <dd className="mt-1">{t(c.hacks)}</dd>
        </div>
      </dl>

      <h3 className="mt-10 text-xl font-semibold">{t(S.contests.slots)}</h3>
      <ul className="mt-4 divide-y divide-seam/70 border-y border-seam/70">
        {c.slots.map((s, i) => (
          <motion.li
            key={s.letter}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i + 0.1 }}
            className="grid grid-cols-[3.5rem_7.5rem_1fr] items-baseline gap-3 py-3 sm:grid-cols-[4.5rem_9rem_1fr]"
          >
            <span className="font-display text-lg font-semibold">{s.letter}</span>
            <RatingRange low={s.low} high={s.high} />
            <span className="text-ash/80">{t(s.note)}</span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-slate">{t(S.contests.typicalNote)}</p>

      <h3 className="mt-10 text-xl font-semibold">{t(S.contests.strategy)}</h3>
      <ul className="mt-3 space-y-2.5">
        {c.strategy.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
            <span className="text-ash/85">{t(s)}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Contests() {
  const { t } = useI18n();
  const [active, setActive] = useState(CONTESTS[0].id);
  const current = CONTESTS.find((c) => c.id === active)!;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.contests.title)} lede={t(S.contests.lede)} />

      <section aria-labelledby="systems" className="mt-10">
        <h2 id="systems" className="sr-only">
          {t(S.contests.systemsTitle)}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(['standard', 'icpc'] as const).map((k) => (
            <div key={k} className={cn('rounded-2xl border p-6', k === current.scoring ? 'border-ember/60 bg-iron' : 'border-seam bg-iron/40')}>
              <h3 className="text-lg font-semibold">{t(SYSTEMS[k].name)}</h3>
              <p className="mt-2 text-ash/80">{t(SYSTEMS[k].body)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-[13rem_1fr]">
        <div role="tablist" aria-label={t(S.contests.title)} className="flex gap-1 overflow-x-auto lg:flex-col">
          {CONTESTS.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={cn(
                  'relative shrink-0 rounded-lg px-4 py-2.5 text-left font-display font-medium transition-colors',
                  on ? 'text-ash' : 'text-slate hover:text-ash',
                )}
              >
                {on && (
                  <motion.span
                    layoutId="contest-tab"
                    className="absolute inset-0 -z-10 rounded-lg bg-iron ring-1 ring-seam"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                {c.name}
              </button>
            );
          })}
        </div>
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <ContestDetail key={current.id} c={current} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
