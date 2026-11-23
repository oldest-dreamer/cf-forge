import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock, Lightbulb } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COURSE } from '@/i18n/courseStrings';
import { LESSONS, LESSON_BY_ID, lessonIndex } from '@/data/course';
import type { Block } from '@/data/course/types';
import { useAccount } from '@/lib/account';
import { PageHead } from '@/components/PageHead';
import { TryIt } from '@/components/TryIt';
import { ExerciseBox } from '@/components/ExerciseBox';
import NotFound from './NotFound';

function BlockView({ b }: { b: Block }) {
  const { t } = useI18n();
  switch (b.kind) {
    case 'p':
      return <p className="prose-forge mt-4 text-ash/90">{t(b.text)}</p>;
    case 'h':
      return <h2 className="mt-10 text-2xl font-semibold">{t(b.text)}</h2>;
    case 'list':
      return (
        <ul className="prose-forge mt-4 space-y-2.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-ash/90">
              <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
              <span>{t(it)}</span>
            </li>
          ))}
        </ul>
      );
    case 'tip':
      return (
        <p className="prose-forge mt-5 flex gap-3 rounded-xl border border-seam bg-iron/60 p-4 text-ash/90">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-ember" />
          <span>{t(b.text)}</span>
        </p>
      );
    case 'warn':
      return (
        <p className="prose-forge mt-5 flex gap-3 rounded-xl border border-[#ff7b72]/35 bg-[#ff7b72]/8 p-4 text-ash/90">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#ff7b72]" />
          <span>{t(b.text)}</span>
        </p>
      );
    case 'code':
      return (
        <div className="max-w-3xl">
          <TryIt code={b.code} input={b.input} caption={b.caption && t(b.caption)} />
        </div>
      );
  }
}

export default function Lesson() {
  const { id = '' } = useParams();
  const { t, num } = useI18n();
  const { lessonsDone } = useAccount();
  const lesson = LESSON_BY_ID[id];
  if (!lesson) return <NotFound />;

  const i = lessonIndex(id);
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];
  const done = lessonsDone.has(lesson.id);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <Link to="/learn" className="mt-8 inline-flex items-center gap-1.5 text-sm text-slate hover:text-ash">
        <ArrowLeft size={15} /> {t(COURSE.backToCourse)}
      </Link>

      <PageHead title={t(lesson.title)} lede={t(lesson.summary)}>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate">
          <span>
            {t(COURSE.lesson)} {num(i + 1)} {t(COURSE.of)} {num(LESSONS.length)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {num(lesson.minutes)} {t(COURSE.min)}
          </span>
          {done && (
            <span className="inline-flex items-center gap-1 text-[#56d364]">
              <CheckCircle2 size={15} /> {t(COURSE.done)}
            </span>
          )}
        </div>
      </PageHead>

      <article className="mt-8 max-w-4xl">
        {lesson.blocks.map((b, k) => (
          <BlockView key={k} b={b} />
        ))}

        <h2 className="mt-12 text-2xl font-semibold">{t(COURSE.mistakes)}</h2>
        <ul className="prose-forge mt-4 space-y-3">
          {lesson.mistakes.map((m, k) => (
            <li key={k} className="flex gap-3">
              <span className="mt-[0.55em] size-2 shrink-0 rotate-45 bg-r-gm/80" aria-hidden="true" />
              <span className="text-ash/85">{t(m)}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-sm text-slate">{t(COURSE.usedHere)}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {lesson.toolkit.map((a) => (
            <Link
              key={a}
              to={`/toolkit#${a}`}
              className="rounded-full bg-iron px-3 py-1 font-mono text-sm text-ash/85 ring-1 ring-seam transition-colors hover:text-ember hover:ring-ember/50"
            >
              {a}
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <ExerciseBox lesson={lesson} />
        </div>

        <nav className="mt-12 grid gap-3 border-t border-seam/70 pt-6 sm:grid-cols-2">
          {prev ? (
            <Link to={`/learn/${prev.id}`} className="group rounded-xl border border-seam p-4 hover:bg-iron/60">
              <span className="flex items-center gap-1.5 text-sm text-slate">
                <ArrowLeft size={14} /> {t(COURSE.prev)}
              </span>
              <span className="mt-1 block font-display font-semibold group-hover:text-ember">{t(prev.title)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/learn/${next.id}`} className="group rounded-xl border border-seam p-4 text-right hover:bg-iron/60">
              <span className="flex items-center justify-end gap-1.5 text-sm text-slate">
                {t(COURSE.next)} <ArrowRight size={14} />
              </span>
              <span className="mt-1 block font-display font-semibold group-hover:text-ember">{t(next.title)}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
