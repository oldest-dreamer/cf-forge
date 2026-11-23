import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2, Pencil, Play, RotateCcw, XCircle } from 'lucide-react';
import { useCompiler } from '@/compiler/useCompiler';
import { useI18n } from '@/i18n/I18nProvider';
import { COURSE } from '@/i18n/courseStrings';
import { RUN } from '@/i18n/runStrings';
import { CodeBlock } from './CodeBlock';
import { CodeEditor } from './CodeEditor';
import { PhaseBar } from './RunPanel';
import { cn } from '@/lib/cn';

/** A runnable example inside a lesson: view, edit, give input, run, see output. */
export function TryIt({ code, input: initialInput, caption }: { code: string; input?: string; caption?: string }) {
  const { t, num } = useI18n();
  const [src, setSrc] = useState(code);
  const [editing, setEditing] = useState(false);
  const [showInput, setShowInput] = useState(initialInput !== undefined);
  const [input, setInput] = useState(initialInput ?? '');
  const r = useCompiler();
  const busy = r.phase === 'downloading' || r.phase === 'compiling' || r.phase === 'running';
  const out = r.results[0];

  const go = () => r.runAll(src, [{ input }], 4000);

  return (
    <figure className="my-6">
      {editing ? <CodeEditor value={src} onChange={setSrc} onRun={go} minRows={6} label={t(COURSE.edit)} /> : <CodeBlock code={src} />}
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={go}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-ember px-3.5 py-1.5 text-sm font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />} {t(COURSE.run)}
        </button>
        <button type="button" onClick={() => setEditing((e) => !e)} className="inline-flex items-center gap-1.5 rounded-lg border border-seam px-3 py-1.5 text-sm text-ash hover:bg-iron-2">
          <Pencil size={13} /> {t(editing ? RUN.view : COURSE.edit)}
        </button>
        {!showInput && (
          <button type="button" onClick={() => setShowInput(true)} className="rounded-lg px-2 py-1.5 text-sm text-slate hover:text-ash">
            + {t(COURSE.addInput)}
          </button>
        )}
        {src !== code && (
          <button type="button" onClick={() => setSrc(code)} className="inline-flex items-center gap-1 text-sm text-slate hover:text-ash">
            <RotateCcw size={12} /> {t(COURSE.reset)}
          </button>
        )}
        {caption && <figcaption className="text-sm text-slate sm:ml-auto">{caption}</figcaption>}
      </div>

      <AnimatePresence initial={false}>
        {showInput && (
          <motion.label initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 block overflow-hidden text-sm text-slate">
            {t(COURSE.input)}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={Math.min(6, Math.max(2, input.split('\n').length))}
              spellCheck={false}
              className="mt-1 w-full resize-y rounded-lg border border-seam bg-[#141c28] px-3 py-2 font-mono text-[0.84rem] text-ash outline-none focus:border-ember/60"
            />
          </motion.label>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <PhaseBar phase={r.phase} progress={r.progress} />
      </AnimatePresence>

      {(out || r.compileError) && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          <p className="mb-1 flex items-center gap-2 text-sm text-slate">
            {t(COURSE.output)}
            {out && (
              <span className="ml-auto tabular-nums">
                {num(out.ms)} {t(RUN.ms)}
              </span>
            )}
          </p>
          <pre
            className={cn(
              'max-h-64 overflow-auto rounded-lg border bg-[#141c28] px-3 py-2 font-mono text-[0.84rem] leading-relaxed',
              r.compileError || (out && out.verdict !== 'ran') ? 'border-[#ff7b72]/40 text-[#ffb4ab]' : 'border-seam text-ash',
            )}
          >
            {r.compileError ? (
              <>
                <span className="mb-1 flex items-center gap-1.5 font-sans text-[#ff7b72]">
                  <XCircle size={14} /> {r.compileError.kind === 'load' ? t(RUN.loadError) : t(RUN.compileError)}
                </span>
                {r.compileError.kind === 'compile' ? r.compileError.message : ''}
              </>
            ) : out ? (
              <>
                {out.verdict === 'tle' && <span className="font-sans">{t(RUN.tle)}</span>}
                {out.verdict === 'rte' && <span className="font-sans">{t(RUN.rte)}{'\n'}</span>}
                {out.stdout}
                {out.stderr}
              </>
            ) : null}
          </pre>
        </motion.div>
      )}
    </figure>
  );
}
