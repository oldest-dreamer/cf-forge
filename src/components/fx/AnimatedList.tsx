import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export type ListRow = { key: string; href: string; content: ReactNode };

/**
 * A scrolling list whose rows spring into view. A highlight glides to the row under
 * the pointer or keyboard focus; ↑ ↓ Home End move between rows and Enter opens one.
 */
export function AnimatedList({
  rows,
  id,
  label,
  className,
}: {
  rows: ListRow[];
  id: string;
  label: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  function move(to: number) {
    const i = Math.max(0, Math.min(rows.length - 1, to));
    setActive(i);
    const el = links.current[i];
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }

  function onKey(e: KeyboardEvent) {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: rows.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      move(map[e.key]);
    }
  }

  return (
    <div className={cn('list-fade relative max-h-[30rem] overflow-y-auto overscroll-contain py-2', className)}>
      <ul aria-label={label} onKeyDown={onKey} className="relative">
        {rows.map((r, i) => (
          <motion.li
            key={r.key}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ type: 'spring', stiffness: 340, damping: 26, delay: Math.min(i, 8) * 0.05 }}
            className="relative"
          >
            {active === i && (
              <motion.span
                layoutId={`${id}-glide`}
                className="absolute inset-0 rounded-xl bg-iron-2/70 ring-1 ring-seam"
                transition={{ type: 'spring', stiffness: 520, damping: 40 }}
              />
            )}
            <Link
              ref={(el) => {
                links.current[i] = el;
              }}
              to={r.href}
              tabIndex={active === i ? 0 : -1}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="relative block rounded-xl px-4 py-3.5 focus-visible:outline-offset-0"
            >
              {r.content}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
