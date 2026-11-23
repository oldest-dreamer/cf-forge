import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Eye, EyeOff, Lightbulb, Loader2, PartyPopper, Play, RotateCcw, XCircle } from 'lucide-react';
import type { Lesson } from '@/data/course/types';
import { useCompiler } from '@/compiler/useCompiler';
import { useAccount } from '@/lib/account';
import { useI18n } from '@/i18n/I18nProvider';
import { COURSE } from '@/i18n/courseStrings';
import { RUN } from '@/i18n/runStrings';
import { CodeEditor } from './CodeEditor';
import { CodeBlock } from './CodeBlock';
import { PhaseBar, ResultRow } from './RunPanel';
import { cn } from '@/lib/cn';
import { Sparkles } from 'lucide-react';
import { useTutor } from '@/lib/tutor';
import { TUTOR } from '@/i18n/tutorStrings';
import { runQuestion } from '@/lib/askAboutRun';

const draftKey = (id: string) => `cf-forge:exercise:${id}`;

function Sparks() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5 rounded-full"
            style={{ background: i % 2 ? '#56d364' : 'var(--color-ember)' }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * 90, y: Math.sin(a) * 50, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        );
      })}
    </span>
  );
}

export function ExerciseBox({ lesson }: { lesson: Lesson }) {
  const { t, num } = useI18n();
  const { lessonsDone, markLessonDone } = useAccount();
  const ex = lesson.exercise;
  const [code, setCode] = useState(() => {
    try {
      return localStorage.getItem(draftKey(lesson.id)) ?? ex.starter;
    } catch {
      return ex.starter;
    }
  });
  const [hint, setHint] = useState(false);
  const [solution, setSolution] = useState(false);
  const [justPassed, setJustPassed] = useState(false);
  const r = useCompiler();
  const { ask } = useTutor();
  const busy = r.phase === 'downloading' || r.phase === 'compiling' || r.phase === 'running';
  const done = lessonsDone.has(lesson.id);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(draftKey(lesson.id), code);
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(id);
  }, [code, lesson.id]);

  const passed = r.results.filter((x) => x?.verdict === 'passed').length;
  const allPassed = r.phase === 'done' && !r.compileError && r.results.length === ex.tests.length && passed === ex.tests.length;

  useEffect(() => {
    if (!allPassed) return;
    markLessonDone(lesson.id);
    setJustPassed(true);
    const id = setTimeout(() => setJustPassed(false), 1500);
    return () => clearTimeout(id);
  }, [allPassed, lesson.id, markLessonDone]);

  const check = () => r.runAll(code, ex.tests, 4000);

  return (
    <section id="exercise" className="scroll-mt-24 rounded-2xl border border-ember/40 bg-ember/[0.05] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold">{t(COURSE.exercise.title)}</h2>
        {done && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#56d364]/12 px-2.5 py-0.5 text-sm text-[#56d364] ring-1 ring-[#56d364]/35">
            <CheckCircle2 size={14} /> {t(COURSE.exercise.already)}
          </span>
        )}
      </div>
      <p className="prose-forge mt-3 text-ash/90">{t(ex.prompt)}</p>

      <div className="mt-5">
        <CodeEditor value={code} onChange={setCode} onRun={check} minRows={12} label={t(COURSE.exercise.title)} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={check}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-ember px-4 py-2 text-sm font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />} {t(COURSE.exercise.check)}
        </button>
        <button type="button" onClick={() => setHint((h) => !h)} className="inline-flex items-center gap-1.5 rounded-xl border border-seam px-3.5 py-2 text-sm text-ash hover:bg-iron-2">
          <Lightbulb size={14} /> {t(hint ? COURSE.exercise.hideHint : COURSE.exercise.hint)}
        </button>
        <button type="button" onClick={() => setSolution((s) => !s)} className="inline-flex items-center gap-1.5 rounded-xl border border-seam px-3.5 py-2 text-sm text-ash hover:bg-iron-2">
          {solution ? <EyeOff size={14} /> : <Eye size={14} />} {t(solution ? COURSE.exercise.hideSolution : COURSE.exercise.solution)}
        </button>
        {code !== ex.starter && (
          <button type="button" onClick={() => setCode(ex.starter)} className="inline-flex items-center gap-1 text-sm text-slate hover:text-ash">
            <RotateCcw size={12} /> {t(COURSE.reset)}
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hint && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <span className="mt-4 flex gap-2 rounded-xl bg-iron/70 p-4 text-ash/90">
              <Lightbulb size={17} className="mt-0.5 shrink-0 text-ember" /> {t(ex.hint)}
            </span>
          </motion.p>
        )}
        {solution && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="mt-4 text-sm text-slate">{t(COURSE.exercise.solutionNote)}</p>
            <CodeBlock code={ex.solution} className="mt-2" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <PhaseBar phase={r.phase} progress={r.progress} />
      </AnimatePresence>

      {r.compileError && (
        <div className="mt-4" role="alert">
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-sm text-[#ff7b72]">
            <XCircle size={15} /> {r.compileError.kind === 'load' ? t(RUN.loadError) : t(RUN.compileError)}
          </p>
          {r.compileError.kind === 'compile' && (
            <pre className="max-h-64 overflow-auto rounded-lg border border-[#ff7b72]/40 bg-[#141c28] px-3 py-2 font-mono text-[0.8rem] text-[#ffb4ab]">{r.compileError.message}</pre>
          )}
        </div>
      )}

      {r.results.length > 0 && !r.compileError && (
        <div className="relative mt-4 rounded-xl border border-seam bg-iron/50 px-4">
          {justPassed && <Sparks />}
          {r.phase === 'done' && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn('flex items-center gap-2 border-b border-seam/60 py-3 font-medium', allPassed ? 'text-[#56d364]' : 'text-[#ff7b72]')}
            >
              {allPassed ? <PartyPopper size={18} /> : <XCircle size={17} />}
              {allPassed ? t(COURSE.exercise.passed) : `${num(passed)}/${num(ex.tests.length)} ${t(RUN.summary)}`}
            </motion.p>
          )}
          <ul>
            {ex.tests.map((tc, i) => (
              <ResultRow key={i} i={i} tc={tc} r={r.results[i] ?? null} running={r.current === i} />
            ))}
          </ul>
        </div>
      )}

      {(() => {
        const fails = r.compileError?.kind === 'compile'
          ? { compileError: r.compileError.message }
          : (() => {
              const i = r.results.findIndex((x) => x && x.verdict !== 'passed');
              if (r.phase !== 'done' || i < 0) return null;
              return { input: ex.tests[i].input, expected: ex.tests[i].output, got: r.results[i] };
            })();
        if (!fails) return null;
        return (
          <button
            type="button"
            onClick={() => ask(runQuestion(t(TUTOR.failIntro), code, fails), 'debug')}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-ember/40 bg-ember/10 px-3 py-1.5 text-sm text-ember hover:bg-ember/15"
          >
            <Sparkles size={14} /> {t(TUTOR.askWhy)}
          </button>
        );
      })()}
    </section>
  );
}
