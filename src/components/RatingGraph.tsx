import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { CfRatingChange } from '@/lib/cf';
import { RANKS, rankFor } from '@/lib/ranks';
import { useI18n } from '@/i18n/I18nProvider';
import { CFS } from '@/i18n/cfStrings';

const H = 300;
const PAD = { top: 16, right: 16, bottom: 28, left: 46 };

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(720);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function RatingGraph({ changes }: { changes: CfRatingChange[] }) {
  const { t, num, lang } = useI18n();
  const reduce = useReducedMotion();
  const [wrap, W] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const g = useMemo(() => {
    const pts = changes.map((c) => ({ x: c.ratingUpdateTimeSeconds, y: c.newRating, c }));
    const ys = pts.map((p) => p.y).concat(pts.length ? [pts[0].c.oldRating] : []);
    const yMin = Math.max(0, Math.floor((Math.min(...ys) - 150) / 100) * 100);
    const yMax = Math.ceil((Math.max(...ys) + 150) / 100) * 100;
    const x0 = pts[0].x;
    const x1 = pts.length > 1 ? pts[pts.length - 1].x : x0 + 86400;
    const iw = W - PAD.left - PAD.right;
    const ih = H - PAD.top - PAD.bottom;
    const sx = (x: number) => PAD.left + ((x - x0) / (x1 - x0 || 1)) * iw;
    const sy = (y: number) => PAD.top + (1 - (y - yMin) / (yMax - yMin)) * ih;

    const bands = RANKS.map((r, i) => {
      const lo = Math.max(r.min, yMin);
      const hi = Math.min(i + 1 < RANKS.length ? RANKS[i + 1].min : 5000, yMax);
      return hi > lo ? { id: r.id, color: r.color, y: sy(hi), h: sy(lo) - sy(hi) } : null;
    }).filter(Boolean) as { id: string; color: string; y: number; h: number }[];

    const step = yMax - yMin > 1200 ? 400 : yMax - yMin > 600 ? 200 : 100;
    const ticks: number[] = [];
    for (let v = Math.ceil(yMin / step) * step; v <= yMax; v += step) ticks.push(v);

    const xy = pts.map((p) => ({ ...p, px: sx(p.x), py: sy(p.y) }));
    const d = xy.map((p, i) => `${i ? 'L' : 'M'}${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(' ');

    const years: { x: number; label: string }[] = [];
    const y0 = new Date(x0 * 1000).getFullYear();
    const y1 = new Date(x1 * 1000).getFullYear();
    for (let y = y0 + 1; y <= y1; y++) years.push({ x: sx(Date.UTC(y, 0, 1) / 1000), label: String(y) });

    return { xy, d, bands, ticks, sy, years, iw };
  }, [changes, W]);

  function onMove(e: PointerEvent<SVGRectElement>) {
    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    let best = 0;
    let bestD = Infinity;
    g.xy.forEach((p, i) => {
      const dd = Math.abs(p.px - x);
      if (dd < bestD) {
        bestD = dd;
        best = i;
      }
    });
    setHover(best);
  }

  const hp = hover !== null ? g.xy[hover] : null;
  const fmtDate = (sec: number) =>
    new Date(sec * 1000).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div ref={wrap} className="relative w-full">
      <svg width={W} height={H} role="img" aria-label={t(CFS.dash.graphTitle)} className="block overflow-visible">
        {g.bands.map((b) => (
          <rect key={b.id} x={PAD.left} y={b.y} width={g.iw} height={b.h} fill={b.color} opacity={0.13} />
        ))}
        {g.ticks.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={g.sy(v)} y2={g.sy(v)} stroke="var(--color-seam)" strokeOpacity={0.55} strokeDasharray="2 4" />
            <text x={PAD.left - 8} y={g.sy(v)} dy="0.32em" textAnchor="end" className="fill-slate text-[11px] tabular-nums">
              {num(v)}
            </text>
          </g>
        ))}
        {g.years.map((y) => (
          <text key={y.label} x={y.x} y={H - 8} textAnchor="middle" className="fill-slate text-[11px] tabular-nums">
            {num(Number(y.label)).replace(/,/g, '')}
          </text>
        ))}

        <motion.path
          d={g.d}
          fill="none"
          stroke="var(--color-ash)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {g.xy.map((p, i) => (
          <motion.circle
            key={p.c.contestId}
            cx={p.px}
            cy={p.py}
            r={hover === i ? 6 : 4}
            fill={rankFor(p.y).color}
            stroke="var(--color-steel)"
            strokeWidth={2}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.2 + (i / Math.max(1, g.xy.length)) * 0.9 }}
          />
        ))}

        {hp && (
          <line x1={hp.px} x2={hp.px} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--color-slate)" strokeOpacity={0.6} />
        )}
        <rect
          x={PAD.left}
          y={0}
          width={g.iw}
          height={H}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>

      {hp && (
        <div
          className="pointer-events-none absolute z-10 w-60 rounded-xl border border-seam bg-iron px-3.5 py-2.5 text-sm shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]"
          style={{
            left: Math.min(Math.max(hp.px - 120, 0), W - 240),
            top: Math.max(hp.py - 118, 0),
          }}
        >
          <p className="line-clamp-2 font-medium text-ash">{hp.c.contestName}</p>
          <p className="mt-0.5 text-slate">{fmtDate(hp.x)}</p>
          <div className="mt-1.5 flex items-center justify-between tabular-nums">
            <span className="text-slate">
              {t(CFS.dash.rank)} {num(hp.c.rank)}
            </span>
            <span className={hp.c.newRating >= hp.c.oldRating ? 'text-[#56d364]' : 'text-[#ff7b72]'}>
              {hp.c.newRating >= hp.c.oldRating ? '+' : '−'}
              {num(Math.abs(hp.c.newRating - hp.c.oldRating))}
            </span>
            <span className="font-semibold text-ash">{num(hp.c.newRating)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
