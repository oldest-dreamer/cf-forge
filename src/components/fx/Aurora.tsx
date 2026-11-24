import { cn } from '@/lib/cn';

/**
 * Ambient background: three soft blobs drifting slowly, over a faded dot grid.
 * Decorative only. Blobs move with transform, never with layout properties.
 */
export function Aurora({ className, grid = true }: { className?: string; grid?: boolean }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {grid && <div className="dot-grid absolute inset-0" />}
      <div className="aurora-blob aurora-a" />
      <div className="aurora-blob aurora-b" />
      <div className="aurora-blob aurora-c" />
    </div>
  );
}
