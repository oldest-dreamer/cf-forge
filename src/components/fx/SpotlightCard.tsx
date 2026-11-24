import { useRef, type ElementType, type ReactNode, type PointerEvent } from 'react';
import { cn } from '@/lib/cn';

/**
 * A surface whose border and fill glow where the pointer is.
 * The pointer position is written to two CSS variables; the glow itself is a
 * pseudo-element that only changes opacity, so nothing re-lays out.
 */
export function SpotlightCard({
  as: Tag = 'div',
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [k: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <Tag ref={ref} onPointerMove={onMove} className={cn('spot', className)} {...rest}>
      {children}
    </Tag>
  );
}
