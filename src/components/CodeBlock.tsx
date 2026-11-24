import { useState } from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { RUN } from '@/i18n/runStrings';
import { cn } from '@/lib/cn';

export const forgeTheme: PrismTheme = {
  plain: { color: '#dfe5ee', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog'], style: { color: '#6f7d93', fontStyle: 'italic' } },
    { types: ['keyword', 'operator'], style: { color: '#f0a04b' } },
    { types: ['string', 'char', 'attr-value'], style: { color: '#9fd8a5' } },
    { types: ['number', 'boolean'], style: { color: '#ffc387' } },
    { types: ['function', 'class-name'], style: { color: '#8ab4ff' } },
    { types: ['macro', 'property', 'directive', 'directive-hash'], style: { color: '#c79bff' } },
    { types: ['punctuation'], style: { color: '#8e9aae' } },
  ],
};

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate transition-colors hover:bg-iron-2 hover:text-ash',
        className,
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            <Check size={14} className="text-r-pupil" />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Copy size={14} />
          </motion.span>
        )}
      </AnimatePresence>
      {t(done ? S.problem.copied : S.problem.copy)}
    </button>
  );
}

export function CodeBlock({
  code,
  language = 'cpp',
  className,
  showLines = true,
}: {
  code: string;
  language?: string;
  className?: string;
  showLines?: boolean;
}) {
  const trimmed = code.replace(/\n$/, '');
  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-seam bg-[#141c28]', className)}>
      <CopyButton text={trimmed} className="absolute right-2 top-2 z-10 bg-[#141c28]/80" />
      <Highlight code={trimmed} language={language} theme={forgeTheme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto py-4 pr-4 text-[0.86rem] leading-[1.7]">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                {showLines && (
                  <span className="table-cell select-none pl-4 pr-4 text-right text-[#4d5b72] tabular-nums">{i + 1}</span>
                )}
                <span className={cn('table-cell', !showLines && 'pl-4')}>
                  {line.map((token, k) => (
                    <span key={k} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

/** Plain monospaced block for test input/output. */
export function IoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-1.5 flex items-center justify-between text-sm text-slate">
        <span>{label}</span>
        <CopyButton text={text} />
      </div>
      <pre className="max-h-64 overflow-auto rounded-lg border border-seam bg-[#141c28] px-3.5 py-3 font-mono text-[0.86rem] leading-relaxed text-ash">
        {text}
      </pre>
    </div>
  );
}

/** An interactive sample: "> " lines are printed by the program, "< " lines are the judge's replies. */
export function Transcript({ text }: { text: string }) {
  const { t } = useI18n();
  const lines = text.split('\n');
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-center justify-between text-sm text-slate">
        <span>
          {t(RUN.conversation)} <span className="text-slate/70">({t(RUN.youPrint)} → · ← {t(RUN.judgeReplies)})</span>
        </span>
      </div>
      <pre className="max-h-72 overflow-auto rounded-lg border border-seam bg-[#141c28] px-3.5 py-3 font-mono text-[0.86rem] leading-relaxed">
        {lines.map((l, i) => {
          const mine = l.startsWith('>');
          return (
            <span key={i} className={mine ? 'block text-ash' : 'block text-ember'}>
              {mine ? '→ ' : '← '}
              {l.replace(/^[<>]\s?/, '')}
            </span>
          );
        })}
      </pre>
    </div>
  );
}
