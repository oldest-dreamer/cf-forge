import { rankFor } from '@/lib/ranks';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/cn';

/** A rating shown in its rank colour, with the rank name for screen readers. */
export function RatingPill({ rating, className }: { rating: number; className?: string }) {
  const { t, num } = useI18n();
  const rank = rankFor(rating);
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-medium tabular-nums', className)}
      style={{
        color: rank.color,
        background: `color-mix(in oklab, ${rank.color} 14%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${rank.color} 35%, transparent)`,
      }}
      title={t(rank.name)}
    >
      <span className="size-1.5 rounded-full" style={{ background: rank.color }} aria-hidden="true" />
      {num(rating)}
      <span className="sr-only">, {t(rank.name)}</span>
    </span>
  );
}

export function RatingRange({ low, high }: { low: number; high: number }) {
  const { num } = useI18n();
  const lo = rankFor(low);
  const hi = rankFor(high);
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium tabular-nums">
      <span style={{ color: lo.color }}>{num(low)}</span>
      {high !== low && (
        <>
          <span className="text-slate">–</span>
          <span style={{ color: hi.color }}>{num(high)}</span>
        </>
      )}
    </span>
  );
}
