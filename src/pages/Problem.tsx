import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { PROBLEM_BY_ID } from '@/data/problems';
import { PROBLEM_PARTS, cfProblemUrl, type ProblemEntry, type ProblemPart } from '@/data/problems/types';
import { TAG_BY_SLUG } from '@/data/tags/tags';
import { RatingPill } from '@/components/RatingPill';
import { IoBlock } from '@/components/CodeBlock';
import { RunPanel } from '@/components/RunPanel';
import { PageHead } from '@/components/PageHead';
import { cn } from '@/lib/cn';
import { JellyRadio } from '@/components/fx/JellyRadio';
import { ProblemStatusBadge, ProblemTracker } from '@/components/ProblemTracker';
import { useTutorPage } from '@/lib/tutor';

function useActivePart() {
  const [active, setActive] = useState<ProblemPart>('overview');
  useEffect(() => {
    const els = PROBLEM_PARTS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as ProblemPart);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Part({ id, n, children }: { id: ProblemPart; n: number; children: ReactNode }) {
  const { t, num } = useI18n();
  return (
    <section id={id} className="scroll-mt-24 border-t border-seam/70 pt-8">
      <h2 className="flex items-baseline gap-3 text-2xl font-semibold">
        <span className="font-display text-base font-medium text-slate tabular-nums">{num(n)}</span>
        {t(S.problem.parts[id])}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Toc({ active }: { active: ProblemPart }) {
  const { t, num } = useI18n();
  return (
    <nav aria-label={t(S.problem.contents)} className="sticky top-24 hidden lg:block">
      <p className="mb-3 text-sm text-slate">{t(S.problem.contents)}</p>
      <ol className="relative space-y-0.5 border-l border-seam">
        {PROBLEM_PARTS.map((id, i) => {
          const on = id === active;
          return (
            <li key={id} className="relative">
              {on && (
                <motion.span
                  layoutId="toc-mark"
                  className="absolute -left-px top-0 h-full w-0.5 bg-ember"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <a
                href={`#${id}`}
                className={cn('flex gap-2 py-1 pl-4 text-sm transition-colors', on ? 'text-ash' : 'text-slate hover:text-ash')}
              >
                <span className="w-4 tabular-nums">{num(i + 1)}</span>
                {t(S.problem.parts[id])}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Solutions({ p }: { p: ProblemEntry }) {
  const { t } = useI18n();
  const [sel, setSel] = useState(p.solutions[p.solutions.length > 2 ? 2 : 0].id);
  const s = p.solutions.find((x) => x.id === sel) ?? p.solutions[0];

  return (
    <div>
      <JellyRadio<string>
        role="tablist"
        label={t(S.problem.parts.solutions)}
        value={s.id}
        onChange={setSel}
        options={p.solutions.map((x, i) => ({
          id: x.id,
          label: (
            <>
              <span className="block text-xs text-slate">
                {i + 1}. {t(S.problem.kinds[x.kind])}
              </span>
              <span className="block font-medium">{t(x.title)}</span>
            </>
          ),
        }))}
        className="flex gap-1 overflow-x-auto rounded-xl bg-iron p-1"
        itemClassName="shrink-0 rounded-lg px-3.5 py-2 text-left text-sm"
        pillClassName="rounded-lg bg-iron-2 ring-1 ring-seam"
        activeText="text-ash"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-5"
        >
          <p className="prose-forge text-lg text-ash/90">{t(s.idea)}</p>
          {s.explain && s.explain.length > 0 && (
            <div className="prose-forge mt-4 rounded-xl border border-seam/70 bg-iron/40 p-4 text-ash/85">
              <p className="mb-2 text-sm font-medium text-slate">{t(S.problem.howItWorks)}</p>
              {s.explain.map((para, i) => (
                <p key={i}>{t(para)}</p>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate">
            <span>
              {t(S.problem.time)} <code className="inline-code">{s.time}</code>
            </span>
            <span>
              {t(S.problem.space)} <code className="inline-code">{s.space}</code>
            </span>
            {s.accepted && (
              <span className="inline-flex items-center gap-1 text-r-pupil">
                <CheckCircle2 size={15} /> Accepted
              </span>
            )}
          </div>
          <div className="mt-4">
            <RunPanel key={s.id} code={s.code} tests={p.tests} timeLimitSec={p.limits.timeSec} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Problem() {
  const { id = '' } = useParams();
  const { t, num } = useI18n();
  const p = PROBLEM_BY_ID[id.toUpperCase()];
  const active = useActivePart();
  useTutorPage({ kind: 'problem', id: p?.id ?? id }, p ? `${p.id} ${p.name}` : id);

  if (!p) {
    return (
      <div className="mx-auto max-w-6xl px-5">
        <PageHead title={id} lede={t(S.problem.notFound)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="grid gap-12 lg:grid-cols-[1fr_14rem]">
        <article className="min-w-0 space-y-12 pb-8">
          {/* 1. Overview */}
          <section id="overview" className="scroll-mt-24">
            <PageHead title={`${p.id}. ${p.name}`}>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <RatingPill rating={p.rating} />
                <ProblemStatusBadge p={p} />
                {p.tags.map((s) => (
                  <Link
                    key={s}
                    to={`/tags/${s}`}
                    className="rounded-full px-2.5 py-0.5 text-sm text-slate ring-1 ring-seam transition-colors hover:text-ash hover:ring-slate"
                  >
                    {t(TAG_BY_SLUG[s].name)}
                  </Link>
                ))}
                <a
                  href={cfProblemUrl(p)}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-slate underline decoration-seam underline-offset-4 hover:text-ash"
                >
                  {t(S.problem.openOnCf)} <ExternalLink size={13} />
                </a>
              </div>
              <p className="prose-forge mt-6 text-lg text-ash/80">{t(p.why)}</p>
            </PageHead>
          </section>

          <Part id="statement" n={2}>
            <p className="prose-forge text-ash/90">{t(p.statement)}</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-slate">{t(S.problem.input)}</dt>
                <dd className="mt-1">{t(p.input)}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">{t(S.problem.output)}</dt>
                <dd className="mt-1">{t(p.output)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="text-slate">{t(S.problem.constraints)}</span>
              {p.limits.notes.map((n, i) => (
                <span key={i} className="font-mono text-ash">
                  {t(n)}
                </span>
              ))}
              <span className="text-slate">
                {t(S.problem.time)} {num(p.limits.timeSec)}s, {t(S.problem.memory)} {num(p.limits.memoryMb)} MB
              </span>
            </div>
          </Part>

          <Part id="samples" n={3}>
            <div className="space-y-6">
              {p.samples.map((s, i) => (
                <div key={i}>
                  <p className="mb-2 text-sm text-slate">
                    {t(S.problem.sampleN)} {num(i + 1)}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <IoBlock label={t(S.problem.input)} text={s.input} />
                    <IoBlock label={t(S.problem.output)} text={s.output} />
                  </div>
                  <p className="prose-forge mt-3 text-ash/85">{t(s.explain)}</p>
                </div>
              ))}
            </div>
          </Part>

          <Part id="observation" n={4}>
            <div className="relative rounded-2xl border border-ember/40 bg-ember/[0.07] p-6">
              <span className="absolute -left-px top-6 h-10 w-1 rounded-r bg-ember" aria-hidden="true" />
              <p className="prose-forge text-lg text-ash">{t(p.observation)}</p>
            </div>
          </Part>

          <Part id="approach" n={5}>
            <div className="prose-forge text-ash/85">
              {p.approach.map((a, i) => (
                <p key={i}>{t(a)}</p>
              ))}
            </div>
          </Part>

          <Part id="walkthrough" n={6}>
            <pre className="mb-4 inline-block rounded-lg border border-seam bg-[#141c28] px-3 py-2 font-mono text-sm">
              {p.walkthrough.input}
            </pre>
            <ol className="relative space-y-4 border-l border-seam pl-6">
              {p.walkthrough.steps.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="relative"
                >
                  <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full border-2 border-steel bg-ember" />
                  {s.state && <code className="inline-code">{s.state}</code>}
                  <p className="mt-1 text-ash/85">{t(s.text)}</p>
                </motion.li>
              ))}
            </ol>
          </Part>

          <Part id="complexity" n={7}>
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-slate">{t(S.problem.time)}</p>
                <p className="font-mono text-2xl text-ember">{p.complexity.time}</p>
              </div>
              <div>
                <p className="text-sm text-slate">{t(S.problem.space)}</p>
                <p className="font-mono text-2xl text-ember">{p.complexity.space}</p>
              </div>
            </div>
            <p className="prose-forge mt-3 text-ash/85">{t(p.complexity.why)}</p>
          </Part>

          <Part id="solutions" n={8}>
            <Solutions p={p} />
            <div className="mt-8">
              <ProblemTracker p={p} />
            </div>
          </Part>

          <Part id="tests" n={9}>
            <ul className="space-y-6">
              {p.tests.map((c, i) => (
                <li key={i}>
                  <p className="mb-2 flex items-center gap-2 text-sm">
                    <span className={cn('rounded-full px-2 py-0.5 text-xs', c.source === 'sample' ? 'bg-iron-2 text-slate' : 'bg-ember/15 text-ember')}>
                      {t(c.source === 'sample' ? S.problem.fromSample : S.problem.ownTest)}
                    </span>
                    <span className="text-ash/85">{t(c.note)}</span>
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <IoBlock label={t(S.problem.input)} text={c.input} />
                    <IoBlock label={t(S.problem.output)} text={c.output} />
                  </div>
                </li>
              ))}
            </ul>
          </Part>

          <Part id="pitfalls" n={10}>
            <ul className="space-y-3">
              {p.pitfalls.map((x, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-r-gm/80" aria-hidden="true" />
                  <span className="prose-forge text-ash/85">{t(x)}</span>
                </li>
              ))}
            </ul>
          </Part>

          <Part id="related" n={11}>
            <h3 className="text-lg font-semibold">{t(S.problem.related)}</h3>
            <ul className="mt-3 space-y-2">
              {p.related.map((r) => {
                const hosted = PROBLEM_BY_ID[r.id.toUpperCase()];
                return (
                  <li key={r.id}>
                    {hosted ? (
                      <Link to={`/problems/${r.id}`} className="font-medium text-ember underline decoration-ember/40 underline-offset-4 hover:decoration-ember">
                        {r.id} {r.name}
                      </Link>
                    ) : (
                      <span className="font-medium">
                        {r.id} {r.name}
                      </span>
                    )}
                    <span className="text-ash/75"> {t(r.why)}</span>
                  </li>
                );
              })}
            </ul>
            <h3 className="mt-8 text-lg font-semibold">{t(S.problem.toolkit)}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.toolkit.map((a) => (
                <Link
                  key={a}
                  to={`/toolkit#${a}`}
                  className="rounded-full bg-iron px-3 py-1 font-mono text-sm text-ash/85 ring-1 ring-seam transition-colors hover:text-ember hover:ring-ember/50"
                >
                  {a}
                </Link>
              ))}
            </div>
          </Part>
        </article>

        <aside className="pt-16">
          <Toc active={active} />
        </aside>
      </div>
    </div>
  );
}
