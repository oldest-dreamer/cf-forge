import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Clock, Wrench } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COURSE } from '@/i18n/courseStrings';
import { LESSONS } from '@/data/course';
import { useAccount } from '@/lib/account';
import { PageHead } from '@/components/PageHead';
import { cn } from '@/lib/cn';

export default function Learn() {
  const { t, num } = useI18n();
  const reduce = useReducedMotion();
  const { lessonsDone } = useAccount();
  const doneCount = LESSONS.filter((l) => lessonsDone.has(l.id)).length;
  const next = LESSONS.find((l) => !lessonsDone.has(l.id));
  const pct = doneCount / LESSONS.length;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(COURSE.title)} lede={t(COURSE.lede)} />

      <div className="mt-10 flex flex-wrap items-center gap-6 rounded-2xl border border-seam bg-iron/50 p-5 sm:p-6">
        <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r="27" fill="none" stroke="var(--color-iron-2)" strokeWidth="7" />
          <motion.circle
            cx="32"
            cy="32"
            r="27"
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="7"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: pct }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div>
          <p className="font-display text-3xl font-bold tabular-nums">
            {num(doneCount)}
            <span className="text-slate">/{num(LESSONS.length)}</span>
          </p>
          <p className="text-sm text-slate">{t(COURSE.progress)}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {next ? (
            <Link
              to={`/learn/${next.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-2.5 font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98]"
            >
              {doneCount === 0 ? t(COURSE.start) : `${t(COURSE.continue)}: ${t(next.title)}`} <ArrowRight size={16} />
            </Link>
          ) : (
            <p className="text-[#56d364]">{t(COURSE.allDone)}</p>
          )}
          <Link to="/toolkit" className="inline-flex items-center gap-2 rounded-xl border border-seam px-4 py-2.5 text-ash hover:bg-iron-2">
            <Wrench size={15} /> {t(COURSE.toolkitLink)}
          </Link>
        </div>
      </div>

      <ol className="relative mt-10 border-l border-seam pl-8">
        {LESSONS.map((l, i) => {
          const done = lessonsDone.has(l.id);
          const isNext = next?.id === l.id;
          return (
            <motion.li
              key={l.id}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i }}
              className="relative pb-2"
            >
              <span
                className={cn(
                  'absolute -left-[2.55rem] top-4 grid size-7 place-items-center rounded-full text-xs font-semibold tabular-nums ring-4 ring-steel',
                  done ? 'bg-[#56d364] text-steel' : isNext ? 'bg-ember text-steel' : 'bg-iron-2 text-slate',
                )}
              >
                {done ? <Check size={14} strokeWidth={3} /> : num(i + 1)}
              </span>
              <Link to={`/learn/${l.id}`} className="group block rounded-xl px-4 py-3 transition-colors hover:bg-iron/60">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-lg font-semibold group-hover:text-ember">{t(l.title)}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-slate">
                    <Clock size={13} /> {num(l.minutes)} {t(COURSE.min)}
                  </span>
                </span>
                <span className="mt-0.5 block max-w-[70ch] text-ash/70">{t(l.summary)}</span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
