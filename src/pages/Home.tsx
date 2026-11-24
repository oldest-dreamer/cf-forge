import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  AudioWaveform,
  Binary,
  Coins,
  Divide,
  GitFork,
  Layers,
  Network,
  Route,
  SearchCode,
  Sigma,
  Triangle,
  Type,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { FX } from '@/i18n/fxStrings';
import { RankForge } from '@/components/RankForge';
import { PROBLEMS } from '@/data/problems';
import { TAGS, TAG_BY_SLUG } from '@/data/tags/tags';
import { RatingPill } from '@/components/RatingPill';
import { Logo } from '@/components/Logo';
import { ElasticLettering } from '@/components/fx/ElasticLettering';
import { ShinyText } from '@/components/fx/ShinyText';
import { CodeSlots } from '@/components/fx/CodeSlots';
import { OrbitImages, orbitPath, type Orbit } from '@/components/fx/OrbitImages';
import { AnimatedList } from '@/components/fx/AnimatedList';
import { PromptBar } from '@/components/fx/PromptBar';

const INNER = [
  { slug: 'dp', icon: Layers },
  { slug: 'greedy', icon: Coins },
  { slug: 'binary-search', icon: SearchCode },
  { slug: 'math', icon: Sigma },
];
const OUTER = [
  { slug: 'graphs', icon: Network, tint: 'text-r-expert' },
  { slug: 'trees', icon: GitFork, tint: 'text-r-pupil' },
  { slug: 'strings', icon: Type, tint: 'text-r-cm' },
  { slug: 'bitmasks', icon: Binary, tint: 'text-r-specialist' },
  { slug: 'shortest-paths', icon: Route, tint: 'text-r-expert' },
  { slug: 'number-theory', icon: Divide, tint: 'text-ember' },
  { slug: 'geometry', icon: Triangle, tint: 'text-r-specialist' },
  { slug: 'fft', icon: AudioWaveform, tint: 'text-r-cm' },
];

export default function Home() {
  const { t, num, lang } = useI18n();
  const reduce = useReducedMotion();
  const featured = useMemo(
    () => PROBLEMS.filter((p) => p.featuredFor?.length).sort((a, b) => a.rating - b.rating),
    [],
  );
  const solutions = useMemo(() => PROBLEMS.reduce((s, p) => s + p.solutions.length, 0), []);

  const orbits = useMemo<Orbit[]>(
    () => [
      {
        d: orbitPath.ellipse(118, 92, -18),
        period: 26,
        items: INNER.map((x) => ({ key: x.slug, icon: x.icon, label: t(TAG_BY_SLUG[x.slug].name) })),
      },
      {
        d: orbitPath.ellipse(200, 150, 14),
        period: -48,
        items: OUTER.map((x) => ({ key: x.slug, icon: x.icon, tint: x.tint, label: t(TAG_BY_SLUG[x.slug].name) })),
      },
    ],
    [t],
  );

  const stats = [
    { n: PROBLEMS.length, label: FX.stats.problems },
    { n: solutions, label: FX.stats.solutions },
    { n: TAGS.length, label: FX.stats.tags },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <ElasticLettering
            key={lang}
            text={t(S.home.title)}
            byWord={lang === 'bn'}
            className="max-w-[17ch] text-[2.6rem] font-bold leading-[1.08] sm:text-6xl lg:text-[4.2rem]"
          />
          <p className="mt-3 hidden text-sm text-slate/80 [@media(pointer:fine)]:block">{t(FX.elasticHint)}</p>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-6 max-w-[58ch] text-lg text-ash/80"
          >
            {t(S.home.lede)}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl"
          >
            <PromptBar />
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-3">
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
        </div>

        <div className="hidden justify-center lg:flex">
          <OrbitImages
            orbits={orbits}
            center={
              <>
                <Logo className="size-20 drop-shadow-[0_10px_30px_rgba(240,160,75,0.35)]" />
                <span className="mt-3 font-display text-xl font-semibold">
                  <ShinyText variant="chrome" speed={5}>
                    {t(S.brand)}
                  </ShinyText>
                </span>
              </>
            }
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <dl className="grid grid-cols-3 gap-4 border-t border-seam/60 pt-6">
          {stats.map((s) => (
            <div key={s.label.en} className="flex flex-col">
              <dt className="order-2 text-sm text-slate">{t(s.label)}</dt>
              <dd className="font-display text-3xl font-bold text-ash sm:text-[2.6rem]">
                <CodeSlots value={s.n} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-12">
        <RankForge />
        <p className="mt-1 text-sm text-slate">{t(S.home.ladderCaption)}</p>
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

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            <ShinyText>{t(FX.featuredTitle)}</ShinyText>
          </h2>
          <p className="mt-2 max-w-[56ch] text-slate">{t(FX.featuredLede)}</p>
          <AnimatedList
            id="home-featured"
            label={t(FX.featuredTitle)}
            className="-mx-4 mt-4"
            rows={featured.map((p) => ({
              key: p.id,
              href: `/problems/${p.id}`,
              content: (
                <span className="grid grid-cols-[4rem_1fr_auto] items-center gap-3">
                  <span className="font-mono text-sm text-slate">{p.id}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[1.05rem] font-semibold">{p.name}</span>
                    <span className="block truncate text-sm text-slate">
                      {(p.featuredFor ?? []).map((s) => t(TAG_BY_SLUG[s].name)).join(', ')} · {num(p.solutions.length)}{' '}
                      {t(S.problems.solutions)}
                    </span>
                  </span>
                  <RatingPill rating={p.rating} />
                </span>
              ),
            }))}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t(S.home.roadmapTitle)}</h2>
          <ol className="mt-5 space-y-3">
            {S.home.roadmap.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-seam text-xs text-slate tabular-nums">
                  {num(i + 2)}
                </span>
                <span className="text-ash/85">{t(r)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
