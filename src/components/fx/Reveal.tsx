import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll reveal: fades and lifts 16px once when it enters the viewport.
 * Only opacity and transform are animated. `index` staggers siblings by 60ms.
 */
export function Reveal({
  children,
  index = 0,
  y = 16,
  className,
  as = 'div',
  id,
}: {
  children: ReactNode;
  index?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'footer';
  id?: string;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: EASE, delay: Math.min(index, 8) * 0.06 }}
    >
      {children}
    </M>
  );
}
