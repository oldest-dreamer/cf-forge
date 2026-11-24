import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { FX } from '@/i18n/fxStrings';
import { PROBLEMS } from '@/data/problems';
import { TAG_BY_SLUG } from '@/data/tags/tags';
import { PageHead } from '@/components/PageHead';
import { ProblemRow } from '@/components/ProblemRow';
import { JellyRadio } from '@/components/fx/JellyRadio';
import { CodeSlots } from '@/components/fx/CodeSlots';
import { cn } from '@/lib/cn';

type Band = 'all' | 'b1' | 'b2' | 'b3' | 'b4';
const BANDS: { id: Band; lo: number; hi: number }[] = [
  { id: 'all', lo: 0, hi: 9999 },
  { id: 'b1', lo: 0, hi: 1200 },
  { id: 'b2', lo: 1300, hi: 1600 },
  { id: 'b3', lo: 1700, hi: 2000 },
  { id: 'b4', lo: 2100, hi: 9999 },
];

const SORTED = [...PROBLEMS].sort((a, b) => a.rating - b.rating || a.contestId - b.contestId);

export default function Problems() {
  const { t, num } = useI18n();
  const [band, setBand] = useState<Band>('all');
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);

  const list = useMemo(() => {
    const b = BANDS.find((x) => x.id === band)!;
    const needle = q.trim().toLowerCase();
    return SORTED.filter((p) => {
      if (p.rating < b.lo || p.rating > b.hi) return false;
      if (!needle) return true;
      if (p.id.toLowerCase().startsWith(needle) || p.name.toLowerCase().includes(needle)) return true;
      if (/^\d{3,4}$/.test(needle) && p.rating === Number(needle)) return true;
      return p.tags.some((g) => {
        const tag = TAG_BY_SLUG[g];
        return g.includes(needle) || tag.name.en.toLowerCase().includes(needle) || tag.name.bn.includes(needle);
      });
    });
  }, [band, q]);

  const bandLabel = (x: (typeof BANDS)[number]) =>
    x.id === 'all' ? t(FX.problemsPage.all) : x.hi > 3000 ? `${num(x.lo)}+` : x.lo === 0 ? `≤ ${num(x.hi)}` : `${num(x.lo)}–${num(x.hi)}`;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.problems.title)} lede={t(S.problems.lede)} />

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
        <JellyRadio<Band>
          label={t(FX.problemsPage.bands)}
          value={band}
          onChange={setBand}
          options={BANDS.map((x) => ({ id: x.id, label: bandLabel(x) }))}
          className="flex flex-wrap gap-1.5"
          itemClassName="rounded-full px-3.5 py-1.5 text-sm tabular-nums"
          idleText="text-slate ring-1 ring-seam hover:text-ash"
        />
        <div className={cn('prompt-ring rounded-xl p-px md:ml-auto md:w-80', focus && 'is-focused')}>
          <label className="relative flex items-center rounded-[11px] bg-iron">
            <span className="sr-only">{t(FX.problemsPage.search)}</span>
            <Search size={16} className="pointer-events-none absolute left-3 text-slate" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder={t(FX.problemsPage.search)}
              className="w-full bg-transparent py-2 pl-9 pr-9 text-[0.95rem] placeholder:text-slate/70 focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                className="absolute right-2 grid size-6 place-items-center rounded-md text-slate hover:text-ash"
                aria-label={t(S.close)}
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>
      </div>

      <p className="mt-6 flex items-baseline gap-2 text-sm text-slate">
        <span className="font-display text-xl font-semibold text-ash">
          <CodeSlots key={`${band}-${q}`} value={list.length} />
        </span>
        {t(FX.problemsPage.shown)} · {t(S.problems.sortRating)}
      </p>
      <ul className="mt-3 border-t border-seam/70">
        {list.map((p, i) => (
          <ProblemRow key={p.id} p={p} featured={!!p.featuredFor?.length} index={i} />
        ))}
      </ul>
      {list.length === 0 && <p className="mt-8 text-slate">{t(FX.problemsPage.none)}</p>}
    </div>
  );
}
