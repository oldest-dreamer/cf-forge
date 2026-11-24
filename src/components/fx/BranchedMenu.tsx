import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export type Branch = { to: string; label: string };

/**
 * A vertical menu drawn as a tree: one trunk, a curved branch to every item.
 * Branches draw themselves in order when the menu opens; the active one glows ember.
 */
export function BranchedMenu({ items, className, onPick }: { items: Branch[]; className?: string; onPick?: () => void }) {
  const reduce = useReducedMotion();
  return (
    <ul className={cn('relative', className)}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <li key={it.to} className="relative h-12">
            <NavLink to={it.to} onClick={onPick} className="group flex h-full items-center pl-11">
              {({ isActive }) => (
                <>
                  <svg viewBox="0 0 40 48" className="absolute left-1 top-0 h-12 w-10" aria-hidden="true">
                    {!last && (
                      <motion.path
                        d="M6 24 V48"
                        stroke="#33425a"
                        strokeWidth={1.5}
                        fill="none"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.16, delay: 0.05 + i * 0.07 + 0.1 }}
                      />
                    )}
                    <motion.path
                      d="M6 0 V14 Q6 24 16 24 H34"
                      stroke={isActive ? '#f0a04b' : '#33425a'}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      fill="none"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.24, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.circle
                      cx={34}
                      cy={24}
                      r={3}
                      fill={isActive ? '#f0a04b' : '#33425a'}
                      initial={reduce ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.2 + i * 0.07 }}
                    />
                  </svg>
                  <motion.span
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16 + i * 0.07 }}
                    className={cn(
                      'rounded-lg px-2.5 py-1.5 transition-colors',
                      isActive ? 'bg-iron text-ash' : 'text-slate group-hover:text-ash',
                    )}
                  >
                    {it.label}
                  </motion.span>
                </>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
