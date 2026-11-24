import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/cn';

const LOOPS = 2;

/** A number whose digits roll into place like slot-machine reels when it scrolls into view. */
export function CodeSlots({ value, className }: { value: number; className?: string }) {
  const { num } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const glyphs = Array.from({ length: 10 }, (_, d) => num(d));
  const text = num(value);
  const chars = Array.from(text);
  const reel = Array.from({ length: (LOOPS + 1) * 10 }, (_, i) => glyphs[i % 10]);

  return (
    <span ref={ref} className={cn('inline-flex tabular-nums', className)} aria-label={text} role="img">
      {chars.map((c, i) => {
        const d = glyphs.indexOf(c);
        if (d < 0) return <span key={i} aria-hidden="true">{c}</span>;
        const target = LOOPS * 10 + d;
        return (
          <span key={i} aria-hidden="true" className="relative inline-block h-[1.15em] overflow-hidden leading-[1.15em]">
            <span className="invisible">{c}</span>
            <motion.span
              className="absolute inset-x-0 top-0 flex flex-col items-center"
              initial={false}
              animate={{ y: seen || reduce ? `${(-target / reel.length) * 100}%` : '0%' }}
              transition={
                reduce ? { duration: 0 } : { type: 'spring', stiffness: 60, damping: 16, mass: 1, delay: 0.08 * (chars.length - i) }
              }
            >
              {reel.map((g, k) => (
                <span key={k} className="block h-[1.15em]">
                  {g}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
