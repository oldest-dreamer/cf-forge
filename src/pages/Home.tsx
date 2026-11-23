import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { RankForge } from '@/components/RankForge';
import { PROBLEMS } from '@/data/problems';
import { TAGS } from '@/data/tags/tags';
import { RatingPill } from '@/components/RatingPill';

export default function Home() {
  const { t, num } = useI18n();
  const reduce = useReducedMotion();
  const featured = PROBLEMS.find((p) => p.featuredFor?.length) ?? PROBLEMS[0];

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-20">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[17ch] text-[2.6rem] font-bold sm:text-6xl lg:text-[4.4rem]"
        >
          {t(S.home.title)}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 max-w-[60ch] text-lg text-ash/80"
        >
          {t(S.home.lede)}
        </motion.p>

        <div className="mt-12">
          <RankForge />
          <p className="mt-1 text-sm text-slate">{t(S.home.ladderCaption)}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/tags"
            className="rounded-xl bg-ember px-5 py-3 font-medium text-steel transition-[transform,background-color] duration-200 hover:bg-[#f5b46a] active:scale-[0.98]"
          >
            {t(S.home.ctaTags)}
          </Link>
          <Link
            to="/contests"
            className="rounded-xl border border-seam px-5 py-3 font-medium text-ash transition-colors duration-200 hover:border-slate hover:bg-iron"
          >
            {t(S.home.ctaContests)}
          </Link>
        </div>
      </section>

      <section className="border-y border-seam/60 bg-iron/40">
        <div className="mx-auto grid max-w-6xl gap-px px-5 py-14 md:grid-cols-3 md:gap-10">
          <h2 className="sr-only">{t(S.home.pillarsTitle)}</h2>
          {S.home.pillars.map((p) => (
            <Link key={p.to} to={p.to} className="group block py-4">
              <h3 className="text-xl font-semibold transition-colors group-hover:text-ember">{t(p.title)}</h3>
              <p className="mt-2 text-ash/75">{t(p.body)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">{featured.name}</h2>
          <div className="mt-2 flex items-center gap-3">
            <RatingPill rating={featured.rating} />
            <span className="text-sm text-slate">
              {num(featured.solutions.length)} {t(S.problems.solutions)}
            </span>
          </div>
          <p className="mt-4 max-w-[58ch] text-ash/80">{t(featured.why)}</p>
          <Link
            to={`/problems/${featured.id}`}
            className="mt-5 inline-block font-medium text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember"
          >
            {featured.id} {featured.name}
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{t(S.home.roadmapTitle)}</h2>
          <ol className="mt-4 space-y-3">
            {S.home.roadmap.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-seam text-xs text-slate tabular-nums">
                  {num(i + 2)}
                </span>
                <span className="text-ash/85">{t(r)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex gap-5 text-sm text-slate">
            <span>
              {num(TAGS.length)} {t(S.nav.tags)}
            </span>
            <span>
              {num(PROBLEMS.length)} {t(S.nav.problems)}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
