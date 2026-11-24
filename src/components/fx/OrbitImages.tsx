import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export type OrbitItem = {
  key: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  tint?: string;
};

export type Orbit = {
  /** SVG path in a 440 × 440 box. Any closed shape works: ellipse, rounded square, figure eight. */
  d: string;
  /** Seconds for one lap. Negative runs the other way. */
  period: number;
  items: OrbitItem[];
};

const SIZE = 440;

/**
 * Tiles that travel along SVG paths around a centre piece. Hovering a tile pauses
 * the motion and names it. Purely decorative: every tile also exists as a real link elsewhere.
 */
export function OrbitImages({ orbits, center, className }: { orbits: Orbit[]; center: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const tileRefs = useRef<Record<string, SVGGElement | null>>({});
  const wrap = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [hover, setHover] = useState<OrbitItem | null>(null);

  useEffect(() => {
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    const place = () => {
      orbits.forEach((o, oi) => {
        const p = pathRefs.current[oi];
        if (!p) return;
        const len = p.getTotalLength();
        o.items.forEach((it, ii) => {
          const g = tileRefs.current[it.key];
          if (!g) return;
          const base = ii / o.items.length;
          const f = (((base + clock / o.period) % 1) + 1) % 1;
          const pt = p.getPointAtLength(f * len);
          g.setAttribute('transform', `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)})`);
        });
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (visible && !paused.current) clock += dt;
      place();
      raf = requestAnimationFrame(tick);
    };
    place();
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [orbits, reduce]);

  return (
    <div ref={wrap} className={cn('relative aspect-square w-full max-w-[440px] select-none', className)}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0a04b" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f0a04b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={150} fill="url(#orbit-glow)" />
        {orbits.map((o, oi) => (
          <path
            key={oi}
            ref={(el) => {
              pathRefs.current[oi] = el;
            }}
            d={o.d}
            fill="none"
            stroke="#33425a"
            strokeWidth={1}
            strokeDasharray="3 7"
          />
        ))}
        {orbits.flatMap((o) =>
          o.items.map((it) => {
            const Icon = it.icon;
            const on = hover?.key === it.key;
            return (
              <g
                key={it.key}
                ref={(el) => {
                  tileRefs.current[it.key] = el;
                }}
                onPointerEnter={() => {
                  paused.current = true;
                  setHover(it);
                }}
                onPointerLeave={() => {
                  paused.current = false;
                  setHover(null);
                }}
                style={{ cursor: 'default' }}
              >
                <g style={{ transform: `scale(${on ? 1.18 : 1})`, transition: 'transform 220ms var(--ease-forge)' }}>
                  <rect
                    x={-22}
                    y={-22}
                    width={44}
                    height={44}
                    rx={13}
                    fill="#202b3c"
                    stroke={on ? '#f0a04b' : '#33425a'}
                    strokeWidth={1.2}
                  />
                  <svg x={-11} y={-11} width={22} height={22} overflow="visible">
                    <Icon size={22} strokeWidth={1.8} className={cn(it.tint ?? 'text-ash/85')} />
                  </svg>
                </g>
              </g>
            );
          }),
        )}
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center">
          {center}
          <span className="mt-3 h-6 text-sm text-ember transition-opacity duration-200" style={{ opacity: hover ? 1 : 0 }}>
            {hover?.label ?? ' '}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Helpers that build orbit paths in the 440 box. */
export const orbitPath = {
  ellipse(rx: number, ry: number, tilt = 0) {
    const c = SIZE / 2;
    const r = (tilt * Math.PI) / 180;
    const pts: string[] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const x = rx * Math.cos(a);
      const y = ry * Math.sin(a);
      pts.push(`${(c + x * Math.cos(r) - y * Math.sin(r)).toFixed(1)} ${(c + x * Math.sin(r) + y * Math.cos(r)).toFixed(1)}`);
    }
    return `M ${pts.join(' L ')} Z`;
  },
};
