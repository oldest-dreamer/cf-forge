import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A band of light that sweeps across text.
 * `soft` is a gentle highlight; `chrome` is a hard, metallic reflection with an ember edge.
 */
export function ShinyText({
  children,
  variant = 'soft',
  className,
  speed = 3.6,
}: {
  children: ReactNode;
  variant?: 'soft' | 'chrome';
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={cn('shiny', variant === 'chrome' && 'shiny-chrome', className)}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </span>
  );
}
