import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, ChevronDown, Clock3, Loader2, Pencil, Play, RotateCcw, TerminalSquare, XCircle, AlertTriangle } from 'lucide-react';
import { useCompiler, type Phase, type TestOutcome } from '@/compiler/useCompiler';
import type { TestCase } from '@/data/problems/types';
import type { JudgeFactory } from '@/data/problems/judges/types';
import { useI18n } from '@/i18n/I18nProvider';
import { RUN } from '@/i18n/runStrings';
import type { L } from '@/i18n/types';
import { CodeBlock } from './CodeBlock';
import { CodeEditor } from './CodeEditor';
import { cn } from '@/lib/cn';
import { Sparkles } from 'lucide-react';
import { useTutor } from '@/lib/tutor';
import { TUTOR } from '@/i18n/tutorStrings';
import { runQuestion } from '@/lib/askAboutRun';

const V: Record<TestOutcome['verdict'], { label: L; cls: string; Icon: typeof CheckCircle2 }> = {
  passed: { label: RUN.passed, cls: 'text-[#56d364]', Icon: CheckCircle2 },
  ran: { label: RUN.output, cls: 'text-ash', Icon: TerminalSquare },
  wrong: { label: RUN.wrong, cls: 'text-[#ff7b72]', Icon: XCircle },
  tle: { label: RUN.tle, cls: 'text-[#f0b54b]', Icon: Clock3 },
  rte: { label: RUN.rte, cls: 'text-[#ff7b72]', Icon: AlertTriangle },
  ole: { label: RUN.ole, cls: 'text-[#f0b54b]', Icon: AlertTriangle },
};

export function PhaseBar({ phase, progress }: { phase: Phase; progress: number }) {
  const { t, num } = useI18n();
  if (phase !== 'downloading' && phase !== 'compiling') return null;
  const downloading = phase === 'downloading';
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4" role="status">
      <div className="flex items-center gap-2 text-sm text-ash/85">
        <Loader2 size={15} className="animate-spin text-ember" />
        {downloading ? (progress >= 1 ? t(RUN.preparing) : t(RUN.downloading)) : t(RUN.compiling)}
        {downloading && progress < 1 && <span className="ml-auto text-slate tabular-nums">{num(Math.round(progress * 100))}%</span>}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-iron-2">
        {downloading && progress < 1 ? (
          <motion.div className="h-full rounded-full bg-ember" animate={{ width: `${Math.max(2, progress * 100)}%` }} transition={{ ease: 'linear' }} />
        ) : (
          <motion.div
            className="h-full w-1/3 rounded-full bg-ember"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
    </motion.div>
  );
}

function Io({ label, text, tone }: { label: string; text: string; tone?: 'bad' }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-xs text-slate">{label}</p>
      <pre
        className={cn(
          'max-h-48 overflow-auto rounded-lg border bg-[#141c28] px-3 py-2 font-mono text-[0.82rem] leading-relaxed',
          tone === 'bad' ? 'border-[#ff7b72]/40 text-[#ffb4ab]' : 'border-seam text-ash',
        )}
      >
        {text || ' '}
      </pre>
    </div>
  );
}

function Talk({ turns, message, ok }: { turns: NonNullable<TestOutcome['transcript']>; message?: string; ok: boolean }) {
  const { t } = useI18n();
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-xs text-slate">
        {t(RUN.conversation)} <span className="text-slate/70">({t(RUN.youPrint)} → · ← {t(RUN.judgeReplies)})</span>
      </p>
      <pre className={cn('max-h-64 overflow-auto rounded-lg border bg-[#141c28] px-3 py-2 font-mono text-[0.82rem] leading-relaxed', ok ? 'border-seam' : 'border-[#ff7b72]/40')}>
        {turns.length === 0 && ' '}
        {turns.map((x, i) => (
          <span key={i} className={cn('block', x.dir === 'out' ? 'text-ash' : 'text-ember')}>
            {x.dir === 'out' ? '→ ' : '← '}
            {x.text}
          </span>
        ))}
        {message && <span className={cn('mt-1 block border-t border-seam/60 pt-1', ok ? 'text-[#56d364]' : 'text-[#ffb4ab]')}>{t(RUN.judgeSays)}: {message}</span>}
      </pre>
    </div>
  );
}

export function ResultRow({ i, tc, r, running }: { i: number; tc: { input: string; output?: string }; r: TestOutcome | null; running: boolean }) {
  const { t, num } = useI18n();
  const [open, setOpen] = useState(false);
  const failed = r && r.verdict !== 'passed' && r.verdict !== 'ran';
  const show = open || !!failed || r?.verdict === 'ran';
  const v = r ? V[r.verdict] : null;

  return (
    <li className="border-b border-seam/60 last:border-0">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 py-2.5 text-left text-sm" aria-expanded={show}>
        <span className="w-16 text-slate">
          {t(RUN.test)} {num(i + 1)}
        </span>
        <span className="flex-1">
          {running ? (
            <span className="inline-flex items-center gap-1.5 text-ember">
              <Loader2 size={14} className="animate-spin" /> {t(RUN.running)}
            </span>
          ) : v ? (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={cn('inline-flex items-center gap-1.5', v.cls)}>
              <v.Icon size={15} /> {t(v.label)}
            </motion.span>
          ) : (
            <span className="text-slate/60">—</span>
          )}
        </span>
        {r && (
          <span className="text-slate tabular-nums">
            {num(r.ms)} {t(RUN.ms)}
          </span>
        )}
        <ChevronDown size={15} className={cn('text-slate transition-transform', show && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {show && r && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex flex-col gap-3 pb-4 sm:flex-row">
              {r.transcript ? (
                <>
                  <Io label={t(RUN.judgeData)} text={tc.input} />
                  <Talk turns={r.transcript} message={r.message} ok={!failed} />
                </>
              ) : (
                <>
                  <Io label={t(RUN.input)} text={tc.input} />
                  {tc.output !== undefined && <Io label={t(RUN.expected)} text={tc.output} />}
                  <Io label={t(RUN.got)} text={r.verdict === 'tle' ? '' : r.stdout} tone={failed ? 'bad' : undefined} />
                </>
              )}
            </div>
            {(r.stderr || r.error) && (
              <div className="pb-4">
                <Io label={`${t(RUN.stderr)}${r.exitCode > 0 ? ` (${t(RUN.exitCode)} ${r.exitCode})` : ''}`} text={(r.stderr || '') + (r.error ? `\n${r.error}` : '')} tone="bad" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Run a solution against the problem's tests, edit it, or feed it your own input. */
export function RunPanel({ code, tests, timeLimitSec, judge }: { code: string; tests: TestCase[]; timeLimitSec: number; judge?: JudgeFactory }) {
  const { t, num } = useI18n();
  const [editing, setEditing] = useState(false);
  const [src, setSrc] = useState(code);
  const [custom, setCustom] = useState(false);
  const [input, setInput] = useState(tests[0]?.input ?? '');
  const testsRun = useCompiler();
  const customRun = useCompiler();
  const { ask } = useTutor();
  const limit = Math.max(2000, timeLimitSec * 2000);

  const active = custom ? customRun : testsRun;
  const busy = active.phase === 'downloading' || active.phase === 'compiling' || active.phase === 'running';
  const passed = testsRun.results.filter((r) => r && (r.verdict === 'passed' || r.verdict === 'ran')).length;
  const allDone = testsRun.phase === 'done' && !testsRun.compileError && testsRun.results.every(Boolean);

  const doRun = () =>
    custom ? customRun.runAll(src, [{ input }], limit, judge) : testsRun.runAll(src, tests.map((x) => ({ input: x.input, output: x.output })), limit, judge);

  return (
    <div>
      {editing ? (
        <CodeEditor value={src} onChange={setSrc} onRun={doRun} label={t(RUN.edit)} />
      ) : (
        <CodeBlock code={src} />
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={doRun}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-ember px-4 py-2 text-sm font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
          {t(custom ? RUN.runCustom : RUN.runTests)}
        </button>
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="inline-flex items-center gap-2 rounded-xl border border-seam px-3.5 py-2 text-sm text-ash hover:bg-iron-2"
        >
          <Pencil size={14} /> {t(editing ? RUN.view : RUN.edit)}
        </button>
        <button
          type="button"
          onClick={() => setCustom((c) => !c)}
          aria-pressed={custom}
          className={cn(
            'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm',
            custom ? 'border-ember/60 bg-ember/10 text-ember' : 'border-seam text-ash hover:bg-iron-2',
          )}
        >
          <TerminalSquare size={14} /> {t(judge ? RUN.judgeData : RUN.customInput)}
        </button>
        {src !== code && (
          <>
            <span className="rounded-full bg-iron-2 px-2 py-0.5 text-xs text-slate">{t(RUN.edited)}</span>
            <button type="button" onClick={() => setSrc(code)} className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-ash">
              <RotateCcw size={13} /> {t(RUN.reset)}
            </button>
          </>
        )}
      </div>

      <AnimatePresence initial={false}>
        {custom && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <label className="mt-4 block text-sm text-ash/85">
              {t(judge ? RUN.judgeData : RUN.customInput)}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                spellCheck={false}
                className="mt-1.5 w-full resize-y rounded-xl border border-seam bg-[#141c28] px-3.5 py-2.5 font-mono text-[0.86rem] text-ash outline-none focus:border-ember/60"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <PhaseBar phase={active.phase} progress={active.progress} />
      </AnimatePresence>

      {active.compileError && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4" role="alert">
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-sm text-[#ff7b72]">
            <XCircle size={15} /> {active.compileError.kind === 'load' ? t(RUN.loadError) : t(RUN.compileError)}
          </p>
          {active.compileError.kind === 'compile' && (
            <pre className="max-h-64 overflow-auto rounded-lg border border-[#ff7b72]/40 bg-[#141c28] px-3 py-2 font-mono text-[0.8rem] leading-relaxed text-[#ffb4ab]">
              {active.compileError.message}
            </pre>
          )}
        </motion.div>
      )}

      {!custom && testsRun.results.length > 0 && !testsRun.compileError && (
        <div className="mt-4 rounded-xl border border-seam bg-iron/40 px-4">
          {allDone && (
            <motion.p
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn('flex items-center gap-2 border-b border-seam/60 py-3 font-medium', passed === tests.length ? 'text-[#56d364]' : 'text-[#ff7b72]')}
            >
              {passed === tests.length ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
              {passed === tests.length ? t(RUN.allPassed) : `${num(passed)}/${num(tests.length)} ${t(RUN.summary)}`}
            </motion.p>
          )}
          <ul>
            {tests.map((tc, i) => (
              <ResultRow key={i} i={i} tc={tc} r={testsRun.results[i] ?? null} running={testsRun.current === i} />
            ))}
          </ul>
        </div>
      )}

      {custom && customRun.results[0] && (
        <div className="mt-4 rounded-xl border border-seam bg-iron/40 px-4">
          <ul>
            <ResultRow i={0} tc={{ input }} r={customRun.results[0]} running={customRun.current === 0} />
          </ul>
        </div>
      )}


      {(() => {
        const fails = active.compileError?.kind === 'compile'
          ? { compileError: active.compileError.message }
          : (() => {
              const i = testsRun.results.findIndex((r) => r && r.verdict !== 'passed' && r.verdict !== 'ran');
              if (custom || i < 0) return null;
              return { input: tests[i].input, expected: tests[i].output, got: testsRun.results[i] };
            })();
        if (!fails) return null;
        return (
          <button
            type="button"
            onClick={() => ask(runQuestion(t(TUTOR.failIntro), src, fails), 'debug')}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-ember/40 bg-ember/10 px-3 py-1.5 text-sm text-ember hover:bg-ember/15"
          >
            <Sparkles size={14} /> {t(TUTOR.askWhy)}
          </button>
        );
      })()}
      {judge && <p className="mt-3 rounded-lg border border-seam/70 bg-iron/40 px-3 py-2 text-xs leading-relaxed text-ash/85">{t(RUN.interactiveNote)}</p>}
      <p className="mt-3 text-xs text-slate">{t(RUN.timingNote)}</p>
    </div>
  );
}
