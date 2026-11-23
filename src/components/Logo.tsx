/** Anvil with a glowing ingot: the CF Forge mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--color-iron-2)" />
      <path d="M7 19h18l-2.5 4h-13z" fill="var(--color-slate)" />
      <path d="M12 23h8v3h-8z" fill="var(--color-seam)" />
      <rect x="9" y="11" width="14" height="5" rx="1.5" fill="var(--color-ember)" />
      <rect x="9" y="11" width="14" height="5" rx="1.5" fill="url(#heat)" opacity="0.7" />
      <defs>
        <linearGradient id="heat" x1="0" x2="1">
          <stop offset="0" stopColor="#ffd28a" />
          <stop offset="1" stopColor="var(--color-ember-deep)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
