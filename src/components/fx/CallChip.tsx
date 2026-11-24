import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A compact "on a call" chip: an avatar, a live voice meter and a label.
 * On hover or focus it widens to show a second line.
 */
export function CallChip({
  icon,
  title,
  status,
  onClick,
  ariaLabel,
  className,
}: {
  icon: ReactNode;
  title: string;
  status: string;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      initial={reduce ? false : { scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.6, opacity: 0, y: 20 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full bg-iron/95 py-1.5 pl-1.5 pr-4 text-left text-ash ring-1 ring-seam backdrop-blur-md',
        'shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(240,160,75,0.08)] transition-[box-shadow] duration-300 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(240,160,75,0.35)]',
        className,
      )}
    >
      <span className="relative grid size-9 place-items-center rounded-full bg-ember text-steel">
        {icon}
        <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-[#3fb950] ring-2 ring-iron">
          {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#3fb950]/70" />}
        </span>
      </span>
      <span className="flex items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="callbar w-[3px] rounded-full bg-ember/80"
            style={{ animationDelay: `${i * 0.13}s`, height: 6 + ((i * 5) % 9) }}
          />
        ))}
      </span>
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="text-[0.95rem] font-medium">{title}</span>
        <span className="grid grid-rows-[0fr] text-xs text-slate transition-[grid-template-rows] duration-300 ease-[var(--ease-forge)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <span className="overflow-hidden">{status}</span>
        </span>
      </span>
    </motion.button>
  );
}
