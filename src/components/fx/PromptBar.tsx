import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Hash, Search, Sparkles } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { FX } from '@/i18n/fxStrings';
import { PROBLEMS } from '@/data/problems';
import { TAGS, TAG_BY_SLUG } from '@/data/tags/tags';
import { useTutor } from '@/lib/tutor';
import { RatingPill } from '@/components/RatingPill';
import { cn } from '@/lib/cn';

type Hit =
  | { kind: 'tag'; key: string; href: string; title: string; sub: string }
  | { kind: 'problem'; key: string; href: string; title: string; sub: string; rating: number }
  | { kind: 'ask'; key: string; title: string };

/**
 * One bar for everything: type a problem id, a name, a rating or a tag and jump there,
 * or ask the tutor when nothing matches. The placeholder rotates through examples.
 */
export function PromptBar({ className }: { className?: string }) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { ask } = useTutor();
  const reduce = useReducedMotion();
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [hint, setHint] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (q || focus || reduce) return;
    const id = setInterval(() => setHint((h) => (h + 1) % FX.prompt.hints.length), 3200);
    return () => clearInterval(id);
  }, [q, focus, reduce]);

  const hits = useMemo<Hit[]>(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const tags = TAGS.filter((x) => [x.slug, x.cf, x.name.en, x.name.bn].some((v) => v.toLowerCase().includes(s)))
      .slice(0, 2)
      .map<Hit>((x) => ({ kind: 'tag', key: `t-${x.slug}`, href: `/tags/${x.slug}`, title: t(x.name), sub: t(x.blurb) }));
    const asNum = /^\d{3,4}$/.test(s) ? Number(s) : null;
    const scored = PROBLEMS.map((p) => {
      const id = p.id.toLowerCase();
      let score = 0;
      if (id === s) score = 100;
      else if (id.startsWith(s)) score = 60;
      else if (p.name.toLowerCase().includes(s)) score = 40;
      else if (asNum !== null && p.rating === asNum) score = 30;
      else if (p.tags.some((g) => TAG_BY_SLUG[g].name[lang].toLowerCase().includes(s) || g.includes(s))) score = 10;
      return { p, score };
    })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.p.rating - b.p.rating)
      .slice(0, tags.length ? 4 : 6)
      .map<Hit>(({ p }) => ({
        kind: 'problem',
        key: `p-${p.id}`,
        href: `/problems/${p.id}`,
        title: `${p.id} · ${p.name}`,
        sub: p.tags.map((g) => t(TAG_BY_SLUG[g].name)).join(', '),
        rating: p.rating,
      }));
    return [...tags, ...scored, { kind: 'ask', key: 'ask', title: q.trim() }];
  }, [q, t, lang]);

  useEffect(() => setActive(0), [q]);

  function pick(h: Hit) {
    if (h.kind === 'ask') ask(h.title);
    else navigate(h.href);
    setQ('');
    input.current?.blur();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const h = hits[active];
    if (h) pick(h);
  }

  function onKey(e: KeyboardEvent) {
    if (!hits.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length);
    } else if (e.key === 'Escape') {
      setQ('');
    }
  }

  const open = focus && hits.length > 0;
  const onlyAsk = hits.length === 1;

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={onSubmit} className={cn('prompt-ring rounded-2xl p-px', focus && 'is-focused')}>
        <div className="flex items-center gap-2 rounded-[15px] bg-iron px-3 py-2">
          <Search size={18} className="shrink-0 text-slate" aria-hidden="true" />
          <div className="relative flex-1">
            <label htmlFor={`${listId}-in`} className="sr-only">
              {t(FX.prompt.label)}
            </label>
            <input
              ref={input}
              id={`${listId}-in`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 120)}
              onKeyDown={onKey}
              role="combobox"
              aria-expanded={open}
              aria-controls={`${listId}-list`}
              aria-activedescendant={open ? `${listId}-${active}` : undefined}
              autoComplete="off"
              className="w-full bg-transparent py-1.5 text-[1rem] text-ash focus:outline-none"
            />
            {!q && (
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden text-slate/80">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${hint}-${lang}`}
                    initial={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="truncate"
                  >
                    {t(FX.prompt.hints[hint])}
                  </motion.span>
                </AnimatePresence>
              </span>
            )}
          </div>
          <kbd className="hidden rounded-md border border-seam px-1.5 py-0.5 text-[0.7rem] text-slate md:block">Enter</kbd>
          <motion.button
            type="submit"
            aria-label={t(FX.prompt.go)}
            disabled={!q.trim()}
            animate={{ scale: q.trim() ? 1 : 0.85, opacity: q.trim() ? 1 : 0.45 }}
            transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-ember text-steel"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${listId}-list`}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 origin-top overflow-hidden rounded-2xl border border-seam bg-iron p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
          >
            {onlyAsk && <li className="px-3 pb-1 pt-2 text-sm text-slate">{t(FX.prompt.none)}</li>}
            {hits.map((h, i) => (
              <li
                key={h.key}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onPointerEnter={() => setActive(i)}
                onPointerDown={(e) => {
                  e.preventDefault();
                  pick(h);
                }}
                className="relative cursor-pointer rounded-xl px-3 py-2.5"
              >
                {i === active && (
                  <motion.span
                    layoutId={`${listId}-hl`}
                    className="absolute inset-0 rounded-xl bg-iron-2"
                    transition={{ type: 'spring', stiffness: 600, damping: 42 }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-steel/70 text-slate">
                    {h.kind === 'tag' ? <Hash size={15} /> : h.kind === 'ask' ? <Sparkles size={15} className="text-ember" /> : <span className="font-mono text-[0.7rem]">CF</span>}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.95rem] text-ash">
                      {h.kind === 'ask' ? `${t(FX.prompt.askTutor)}: “${h.title}”` : h.title}
                    </span>
                    {h.kind !== 'ask' && <span className="block truncate text-xs text-slate">{h.sub}</span>}
                  </span>
                  {h.kind === 'problem' && <RatingPill rating={h.rating} />}
                  {h.kind === 'tag' && <span className="text-xs text-slate">{t(FX.prompt.tag)}</span>}
                </span>
              </li>
            ))}
            <li aria-hidden="true" className="px-3 pb-1 pt-2 text-xs text-slate/70">
              {t(FX.prompt.keys)}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
