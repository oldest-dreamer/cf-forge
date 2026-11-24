import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, Footprints } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { TAG_BY_SLUG, cfTagUrl } from '@/data/tags/tags';
import { GUIDES } from '@/data/tags/guides';
import { LADDERS } from '@/data/tags/ladders';
import { PROBLEM_BY_ID, featuredForTag, problemsForTag } from '@/data/problems';
import { PageHead } from '@/components/PageHead';
import { ProblemRow } from '@/components/ProblemRow';
import { CodeSlots } from '@/components/fx/CodeSlots';
import { CodeBlock } from '@/components/CodeBlock';
import { RatingPill } from '@/components/RatingPill';
import { useAccount } from '@/lib/account';
import { problemKey } from '@/lib/cf';
import NotFound from './NotFound';
import { useTutorPage } from '@/lib/tutor';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function TagDetail() {
  const { slug = '' } = useParams();
  const { t, num } = useI18n();
  const { solved } = useAccount();
  const tag = TAG_BY_SLUG[slug];
  useTutorPage({ kind: 'tag', id: slug }, tag ? t(tag.name) : slug);
  if (!tag) return <NotFound />;

  const guide = GUIDES[tag.slug];
  const featured = featuredForTag(tag.slug);
  const rest = problemsForTag(tag.slug).filter((p) => !featured.includes(p));
  const ladder = LADDERS[tag.slug] ?? [];

  return (
    <div className="mx-auto max-w-6xl px-5">
      <Link to="/tags" className="mt-8 inline-flex items-center gap-1.5 text-sm text-slate hover:text-ash">
        <ArrowLeft size={15} /> {t(S.tags.back)}
      </Link>
      <PageHead title={t(tag.name)} lede={t(tag.blurb)}>
        <a
          href={cfTagUrl(tag)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate underline decoration-seam underline-offset-4 hover:text-ash"
        >
          {t(S.tags.openOnCf)} <ExternalLink size={13} />
        </a>
      </PageHead>

      <div className="max-w-4xl">
        {guide ? (
          <Section title={t(S.tags.guide.what)}>
            <div className="prose-forge space-y-4 text-ash/90">
              {guide.intro.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
          </Section>
        ) : (
          <p className="mt-10 rounded-xl border border-dashed border-seam p-4 text-slate">{t(S.tags.guide.comingSoon)}</p>
        )}

        <Section title={t(S.tags.guide.recognize)}>
          <ul className="grid gap-3 md:grid-cols-2">
            {[...tag.signals, ...(guide?.recognize ?? [])].map((s, i) => (
              <li key={i} className="rounded-xl border border-seam bg-iron/50 p-4 text-ash/85">
                {t(s)}
              </li>
            ))}
          </ul>
        </Section>

        {guide && (
          <Section title={t(S.tags.guide.patterns)}>
            <ol className="space-y-10">
              {guide.patterns.map((pt, i) => {
                const hosted = pt.example.problem ? PROBLEM_BY_ID[pt.example.problem] : undefined;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35 }}
                    className="relative border-l-2 border-ember/50 pl-5"
                  >
                    <h3 className="flex items-baseline gap-3 text-xl font-semibold">
                      <span className="font-display text-base text-slate tabular-nums">{num(i + 1)}</span>
                      {t(pt.name)}
                    </h3>
                    <div className="prose-forge mt-2 space-y-3 text-ash/85">
                      {pt.explain.map((p, k) => (
                        <p key={k}>{t(p)}</p>
                      ))}
                    </div>
                    <CodeBlock code={pt.code} showLines={false} className="mt-4" />
                    <div className="mt-4 rounded-xl bg-iron/60 p-4">
                      <p className="flex flex-wrap items-center gap-2 text-sm text-slate">
                        <Footprints size={15} className="text-ember" /> {t(S.tags.guide.example)}
                        {hosted && (
                          <Link to={`/problems/${hosted.id}`} className="font-medium text-ember hover:underline">
                            {hosted.id} {hosted.name}
                          </Link>
                        )}
                      </p>
                      <p className="mt-1.5 text-ash/85">{t(pt.example.text)}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </Section>
        )}

        {guide && (
          <Section title={t(S.tags.guide.mistakes)}>
            <ul className="space-y-3">
              {guide.mistakes.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <AlertTriangle size={17} className="mt-1 shrink-0 text-[#f0b54b]" />
                  <span className="prose-forge text-ash/85">{t(m)}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {guide && (
          <Section title={t(S.tags.guide.plan)}>
            <ol className="space-y-3">
              {guide.plan.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ember/15 text-xs font-semibold text-ember tabular-nums">
                    {num(i + 1)}
                  </span>
                  <span className="prose-forge text-ash/85">{t(m)}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </div>

      {featured.length + rest.length > 0 && (
        <Section title={t(S.tags.guide.explained)}>
          <p className="mb-4 text-sm text-slate">
            <span className="font-display text-base font-semibold text-ember"><CodeSlots value={featured.length + rest.length} /></span> {t(S.tags.guide.explainedGoal)}
          </p>
          <ul className="border-t border-seam/70">
            {featured.map((p, i) => (
              <ProblemRow key={p.id} p={p} featured index={i} />
            ))}
            {rest.map((p, i) => (
              <ProblemRow key={p.id} p={p} index={featured.length + i} />
            ))}
          </ul>
        </Section>
      )}

      {ladder.length > 0 && (
        <Section title={t(S.tags.guide.ladder)}>
          <p className="mb-4 max-w-[62ch] text-slate">{t(S.tags.guide.ladderLede)}</p>
          <ul className="border-t border-seam/70">
            {ladder.map((it) => {
              const id = `${it.c}${it.i}`;
              const hosted = PROBLEM_BY_ID[id];
              const done = solved.has(problemKey({ contestId: it.c, index: it.i }));
              return (
                <li key={id} className="border-b border-seam/70">
                  <div className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 py-3 sm:grid-cols-[5.5rem_1fr_auto_auto]">
                    <span className="pl-2 font-mono text-sm text-slate">{id}</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        {hosted ? (
                          <Link to={`/problems/${id}`} className="truncate font-medium text-ash hover:text-ember">
                            {it.n}
                          </Link>
                        ) : (
                          <a
                            href={`https://codeforces.com/problemset/problem/${it.c}/${it.i}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 truncate text-ash/90 hover:text-ember"
                          >
                            {it.n} <ExternalLink size={12} className="shrink-0 text-slate" />
                          </a>
                        )}
                        {hosted && <span className="rounded-full bg-ember/15 px-2 py-0.5 text-xs text-ember">CF Forge</span>}
                        {done && <CheckCircle2 size={15} className="text-[#56d364]" />}
                      </span>
                    </span>
                    <span className="hidden text-sm text-slate tabular-nums sm:block">
                      {num(it.s)} {t(S.tags.guide.solvedBy)}
                    </span>
                    <RatingPill rating={it.r} className="mr-2" />
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </div>
  );
}
