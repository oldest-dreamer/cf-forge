import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export type JellyOption<T extends string> = { id: T; label: ReactNode; className?: string };

/**
 * A radio group whose selection pill slides with a jelly wobble: it stretches as it
 * leaves, squashes as it lands. Arrow keys move the selection.
 */
export function JellyRadio<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
  itemClassName,
  pillClassName = 'rounded-full bg-ember',
  activeText = 'text-steel',
  idleText = 'text-slate hover:text-ash',
  role = 'radiogroup',
}: {
  options: JellyOption<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
  itemClassName?: string;
  pillClassName?: string;
  activeText?: string;
  idleText?: string;
  role?: 'radiogroup' | 'tablist';
}) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const jelly = useAnimationControls();
  const first = useRef(true);

  useLayoutEffect(() => {
    const measure = () => {
      const b = btns.current[value];
      if (b) setRect({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [value, options]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    void jelly.start({
      scaleX: [1, 1.22, 0.9, 1.04, 1],
      scaleY: [1, 0.78, 1.1, 0.97, 1],
      transition: { duration: 0.55, ease: 'easeOut' },
    });
  }, [value, jelly, reduce]);

  function onKey(e: KeyboardEvent, i: number) {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = options[(i + step + options.length) % options.length];
    onChange(next.id);
    btns.current[next.id]?.focus();
  }

  const item = role === 'tablist' ? 'tab' : 'radio';

  return (
    <div ref={box} role={role} aria-label={label} className={cn('relative isolate', className)}>
      {rect && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 -z-10"
          initial={false}
          animate={{ x: rect.x, y: rect.y, width: rect.w, height: rect.h }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 30 }}
        >
          <motion.span animate={jelly} className={cn('block size-full', pillClassName)} />
        </motion.span>
      )}
      {options.map((o, i) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            ref={(el) => {
              btns.current[o.id] = el;
            }}
            type="button"
            role={item}
            aria-checked={item === 'radio' ? on : undefined}
            aria-selected={item === 'tab' ? on : undefined}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(o.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn('relative transition-colors duration-200', on ? activeText : idleText, itemClassName, o.className)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
