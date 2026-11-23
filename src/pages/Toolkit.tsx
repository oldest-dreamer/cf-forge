import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COURSE } from '@/i18n/courseStrings';
import { TOOLKIT, TOOLKIT_GROUPS } from '@/data/course/toolkit';
import { LESSON_BY_ID, lessonIndex } from '@/data/course';
import { PageHead } from '@/components/PageHead';
import { CodeBlock } from '@/components/CodeBlock';
import { cn } from '@/lib/cn';
import { useTutorPage } from '@/lib/tutor';

export default function Toolkit() {
  const { t, num } = useI18n();
  const { hash } = useLocation();
  const [q, setQ] = useState('');
  const [flash, setFlash] = useState<string | null>(null);
  const entryId = hash.slice(1);
  useTutorPage({ kind: 'toolkit', id: entryId || undefined }, entryId ? `${t(COURSE.toolkit.nav)}: ${entryId}` : t(COURSE.toolkit.nav));

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return TOOLKIT;
    return TOOLKIT.filter((e) => [e.id, e.title, e.summary.en, e.summary.bn, e.code].some((s) => s.toLowerCase().includes(needle)));
  }, [q]);

  // Scroll to the linked entry and flash it so the eye finds it.
  useEffect(() => {
    const id = hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    setFlash(id);
    const timer = setTimeout(() => setFlash(null), 1800);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(COURSE.toolkit.title)} lede={t(COURSE.toolkit.lede)} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm" aria-label={t(COURSE.toolkit.title)}>
            {TOOLKIT_GROUPS.map((g) => (
              <a key={g.id} href={`#group-${g.id}`} className="block rounded-lg px-3 py-1.5 text-slate hover:bg-iron hover:text-ash">
                {t(g.name)}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <label className="relative block max-w-md">
            <span className="sr-only">{t(COURSE.toolkit.search)}</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(COURSE.toolkit.search)}
              className="w-full rounded-xl border border-seam bg-iron py-2 pl-9 pr-3 placeholder:text-slate/70 focus:border-ember/60 focus:outline-none"
            />
          </label>
          {list.length === 0 && <p className="mt-6 text-slate">{t(COURSE.toolkit.noMatch)}</p>}

          {TOOLKIT_GROUPS.map((g) => {
            const entries = list.filter((e) => e.group === g.id);
            if (!entries.length) return null;
            return (
              <section key={g.id} id={`group-${g.id}`} className="scroll-mt-24">
                <h2 className="mt-12 text-2xl font-semibold">{t(g.name)}</h2>
                <div className="mt-4 space-y-4">
                  {entries.map((e) => {
                    const lesson = e.lesson ? LESSON_BY_ID[e.lesson] : undefined;
                    return (
                      <motion.article
                        key={e.id}
                        id={e.id}
                        animate={flash === e.id ? { boxShadow: ['0 0 0 0 rgba(240,160,75,0)', '0 0 0 3px rgba(240,160,75,0.7)', '0 0 0 0 rgba(240,160,75,0)'] } : {}}
                        transition={{ duration: 1.6 }}
                        className={cn('scroll-mt-24 rounded-2xl border bg-iron/40 p-5', flash === e.id ? 'border-ember/60' : 'border-seam')}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="font-mono text-lg font-semibold text-ash">{e.title}</h3>
                          <a href={`#${e.id}`} className="font-mono text-xs text-slate hover:text-ember">
                            #{e.id}
                          </a>
                          {e.cost && (
                            <span className="ml-auto text-sm text-slate">
                              {t(COURSE.toolkit.cost)} <code className="inline-code">{e.cost}</code>
                            </span>
                          )}
                        </div>
                        <p className="prose-forge mt-2 text-ash/85">{t(e.summary)}</p>
                        <CodeBlock code={e.code} showLines={false} className="mt-3" />
                        {e.notes?.map((n, k) => (
                          <p key={k} className="mt-2 text-sm text-slate">
                            {t(n)}
                          </p>
                        ))}
                        {lesson && (
                          <Link to={`/learn/${lesson.id}`} className="mt-3 inline-block text-sm text-ember hover:underline">
                            {t(COURSE.toolkit.learnIt)}: {num(lessonIndex(lesson.id) + 1)}. {t(lesson.title)}
                          </Link>
                        )}
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
