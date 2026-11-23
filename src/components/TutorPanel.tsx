import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Code2, RotateCcw, SendHorizontal, Sparkles, Square, X } from 'lucide-react';
import { useTutor, streamAnswer, fetchUsage, TutorError, type TutorContext, type Usage } from '@/lib/tutor';
import { useI18n } from '@/i18n/I18nProvider';
import { TUTOR } from '@/i18n/tutorStrings';
import type { L } from '@/i18n/types';
import { Markdown } from './Markdown';
import { cn } from '@/lib/cn';

type Msg = { role: 'user' | 'model'; text: string; code?: string; error?: L; detail?: string };

const storeKey = (c: TutorContext) => `cf-forge:tutor:${JSON.stringify(c)}`;

function quickFor(c: TutorContext): { label: L; prompt: L; mode: string; needsCode?: boolean }[] {
  const q = TUTOR.quick;
  const p = TUTOR.prompts;
  switch (c.kind) {
    case 'problem':
      return [
        { label: q.hint, prompt: p.hint, mode: 'hint' },
        { label: q.idea, prompt: p.idea, mode: 'explain' },
        { label: q.debug, prompt: p.debug, mode: 'debug', needsCode: true },
      ];
    case 'lesson':
      return [
        { label: q.simpler, prompt: p.simpler, mode: 'explain' },
        { label: q.exercise, prompt: p.exercise, mode: 'hint' },
        { label: q.debug, prompt: p.debug, mode: 'debug', needsCode: true },
      ];
    case 'tag':
      return [
        { label: q.tag, prompt: p.tag, mode: 'explain' },
        { label: q.tagPractice, prompt: p.tagPractice, mode: 'free' },
      ];
    case 'contests':
      return [{ label: q.contest, prompt: p.contest, mode: 'free' }, { label: q.start, prompt: p.start, mode: 'free' }];
    default:
      return [
        { label: q.start, prompt: p.start, mode: 'free' },
        { label: q.debug, prompt: p.debug, mode: 'debug', needsCode: true },
      ];
  }
}

export function TutorButton() {
  const { t } = useI18n();
  const { open, setOpen } = useTutor();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={reduce ? false : { scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ember px-4 py-3 font-medium text-steel shadow-[0_12px_32px_-8px_rgba(240,160,75,0.55)]"
          aria-label={t(TUTOR.open)}
        >
          <Sparkles size={18} />
          <span className="hidden sm:inline">{t(TUTOR.open)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function fmtWait(sec: number, t: (l: L) => string, num: (n: number) => string) {
  const h = Math.floor(sec / 3600);
  const m = Math.ceil((sec % 3600) / 60);
  return h > 0 ? `${num(h)} ${t(TUTOR.hours)} ${num(m)} ${t(TUTOR.minutes)}` : `${num(m)} ${t(TUTOR.minutes)}`;
}

export function TutorPanel() {
  const { t, num, lang } = useI18n();
  const { page, open, setOpen, pending, clearPending } = useTutor();
  const ctx = page.context;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [usage, setUsage] = useState<Usage | null>(null);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // One conversation per page, kept for this browser session.
  useEffect(() => {
    try {
      setMsgs(JSON.parse(sessionStorage.getItem(storeKey(ctx)) ?? '[]') as Msg[]);
    } catch {
      setMsgs([]);
    }
  }, [ctx]);

  useEffect(() => {
    if (streaming) return;
    try {
      sessionStorage.setItem(storeKey(ctx), JSON.stringify(msgs.slice(-20)));
    } catch {
      /* ignore */
    }
  }, [msgs, ctx, streaming]);

  useEffect(() => {
    if (open) {
      void fetchUsage().then(setUsage);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const send = useCallback(
    async (text: string, mode = 'free') => {
      const q = text.trim();
      if (!q || streaming) return;
      const attached = showCode && code.trim() ? code : undefined;
      const history: Msg[] = [...msgs.filter((m) => !m.error), { role: 'user', text: q, code: attached }];
      setMsgs([...history, { role: 'model', text: '' }]);
      setInput('');
      setStreaming(true);
      const ac = new AbortController();
      abort.current = ac;
      try {
        const meta = await streamAnswer(
          {
            messages: history.map((m) => ({ role: m.role, text: m.code ? `${m.text}\n\nMy code:\n\`\`\`cpp\n${m.code}\n\`\`\`` : m.text })).slice(0, -1).concat([{ role: 'user', text: q }]),
            context: ctx,
            lang,
            mode,
            code: attached,
          },
          (chunk) =>
            setMsgs((old) => {
              const next = old.slice();
              const last = next[next.length - 1];
              next[next.length - 1] = { ...last, text: last.text + chunk };
              return next;
            }),
          ac.signal,
        );
        if (meta.used && meta.limit) setUsage((u) => ({ enabled: true, limit: meta.limit!, used: meta.used!, remaining: Math.max(0, meta.limit! - meta.used!), resetsIn: u?.resetsIn ?? 0 }));
        if (attached) setShowCode(false);
      } catch (e) {
        if ((e as Error).name === 'AbortError') {
          // keep what arrived
        } else {
          const err = e instanceof TutorError ? e : new TutorError('UPSTREAM');
          const base = TUTOR.errors[err.code] ?? TUTOR.errors.UPSTREAM;
          const msg: L =
            err.code === 'LIMIT' && err.resetsIn
              ? { en: `${base.en} ${fmtWait(err.resetsIn, (l) => l.en, String)}.`, bn: `${base.bn} ${fmtWait(err.resetsIn, (l) => l.bn, (n) => new Intl.NumberFormat('bn-BD').format(n))} পরে।` }
              : base;
          setMsgs((old) => [...old.slice(0, -1), { role: 'model', text: '', error: msg, detail: err.detail }]);
          if (err.code === 'LIMIT') setUsage((u) => (u ? { ...u, remaining: 0 } : u));
        }
      } finally {
        setStreaming(false);
        abort.current = null;
      }
    },
    [streaming, showCode, code, msgs, ctx, lang],
  );

  // Questions started from elsewhere on the page.
  useEffect(() => {
    if (open && pending && !streaming) {
      void send(pending.text, pending.mode);
      clearPending();
    }
  }, [open, pending, streaming, send, clearPending]);

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  const quick = quickFor(ctx);
  const disabled = usage?.enabled === false;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-steel/60 backdrop-blur-[2px] lg:hidden"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-label={t(TUTOR.title)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-seam bg-iron shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.6)] sm:w-[27rem]"
          >
            <header className="flex items-center gap-3 border-b border-seam/70 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-xl bg-ember/15 text-ember">
                <Sparkles size={18} />
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold">{t(TUTOR.title)}</p>
                <p className="truncate text-xs text-slate">
                  {t(TUTOR.about)}: {page.label || t(TUTOR.general)}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {msgs.length > 0 && (
                  <button type="button" onClick={() => setMsgs([])} disabled={streaming} className="grid size-9 place-items-center rounded-lg text-slate hover:bg-iron-2 hover:text-ash" title={t(TUTOR.clear)} aria-label={t(TUTOR.clear)}>
                    <RotateCcw size={16} />
                  </button>
                )}
                <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-lg text-slate hover:bg-iron-2 hover:text-ash" aria-label={t(TUTOR.close)}>
                  <X size={18} />
                </button>
              </div>
            </header>

            <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-4">
              {msgs.length === 0 ? (
                <div>
                  <p className="text-ash/85">{t(TUTOR.intro)}</p>
                  {disabled && <p className="mt-4 rounded-xl border border-seam bg-steel/60 p-3 text-sm text-slate">{t(TUTOR.errors.TUTOR_OFF)}</p>}
                  <div className="mt-5 flex flex-col items-start gap-2">
                    {quick.map((qk, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i + 0.1 }}
                        disabled={disabled}
                        onClick={() => {
                          if (qk.needsCode && !code.trim()) {
                            setShowCode(true);
                            setInput(t(qk.prompt));
                            return;
                          }
                          void send(t(qk.prompt), qk.mode);
                        }}
                        className="rounded-xl border border-seam bg-steel/50 px-3.5 py-2 text-left text-sm text-ash transition-colors hover:border-ember/50 hover:text-ember disabled:opacity-50"
                      >
                        {t(qk.label)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {msgs.map((m, i) => (
                    <motion.li key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={cn(m.role === 'user' && 'flex justify-end')}>
                      {m.role === 'user' ? (
                        <div className="min-w-0 max-w-[88%] rounded-2xl rounded-br-md bg-iron-2 px-3.5 py-2 text-[0.95rem] text-ash">
                          <div className="[&_pre]:max-h-56 [&_p]:my-1">
                            <Markdown text={m.text} />
                          </div>
                          {m.code && (
                            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-slate">
                              <Code2 size={12} /> {num(m.code.split('\n').length)} {t(TUTOR.linesOfCode)}
                            </p>
                          )}
                        </div>
                      ) : m.error ? (
                        <p className="rounded-xl border border-[#ff7b72]/35 bg-[#ff7b72]/8 px-3.5 py-2.5 text-sm text-[#ffb4ab]" role="alert">
                          {t(m.error)}
                          {m.detail && <span className="mt-1.5 block break-words font-mono text-xs text-slate">{m.detail}</span>}
                        </p>
                      ) : (
                        <div className="text-[0.95rem] leading-relaxed text-ash/90">
                          {m.text ? (
                            <Markdown text={m.text} />
                          ) : (
                            <span className="inline-flex items-center gap-2 text-slate">
                              <motion.span className="size-2 rounded-full bg-ember" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
                              {t(TUTOR.thinking)}
                            </span>
                          )}
                          {streaming && i === msgs.length - 1 && m.text && (
                            <motion.span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-ember" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                          )}
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-seam/70 p-3">
              <AnimatePresence initial={false}>
                {showCode && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t(TUTOR.codePlaceholder)}
                      rows={6}
                      spellCheck={false}
                      className="mb-2 w-full resize-y rounded-xl border border-seam bg-[#141c28] px-3 py-2 font-mono text-[0.8rem] text-ash outline-none placeholder:text-slate/60 focus:border-ember/60"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={t(TUTOR.placeholder)}
                  rows={Math.min(5, Math.max(1, input.split('\n').length))}
                  disabled={disabled}
                  className="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-seam bg-steel/70 px-3.5 py-2.5 text-[0.95rem] text-ash outline-none placeholder:text-slate/60 focus:border-ember/60 disabled:opacity-60"
                />
                {streaming ? (
                  <button type="button" onClick={() => abort.current?.abort()} className="grid size-11 place-items-center rounded-xl border border-seam text-ash hover:bg-iron-2" aria-label={t(TUTOR.stop)}>
                    <Square size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void send(input)}
                    disabled={!input.trim() || disabled}
                    className="grid size-11 place-items-center rounded-xl bg-ember text-steel transition-[transform,opacity] active:scale-95 disabled:opacity-40"
                    aria-label={t(TUTOR.send)}
                  >
                    <SendHorizontal size={18} />
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate">
                <button type="button" onClick={() => setShowCode((s) => !s)} className={cn('inline-flex items-center gap-1 hover:text-ash', showCode && 'text-ember')}>
                  <Code2 size={13} /> {t(showCode ? TUTOR.detach : TUTOR.attach)}
                </button>
                <span className="hidden sm:inline">{t(TUTOR.shortcut)}</span>
                {usage?.enabled && (
                  <span className="ml-auto tabular-nums">
                    {num(usage.remaining)} {t(TUTOR.of)} {num(usage.limit)} {t(TUTOR.left)}
                  </span>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
