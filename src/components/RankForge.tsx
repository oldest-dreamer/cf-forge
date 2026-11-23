import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RANKS } from '@/lib/ranks';
import { useI18n } from '@/i18n/I18nProvider';
import type { L } from '@/i18n/types';

const FLOOR = 800;
const CEIL = 3500;

/** What a coder in each band should be training next. */
const TRAIN: Record<string, L> = {
  newbie: { en: 'Solve Div. 4 A–C and Div. 3 A–B quickly and without wrong attempts.', bn: 'Div. 4-এর A–C আর Div. 3-এর A–B দ্রুত ও ভুল ছাড়া সমাধান করুন।' },
  pupil: { en: 'Make Div. 2 B routine: greedy, sorting, counting with maps.', bn: 'Div. 2-এর B স্বাভাবিক করুন: গ্রিডি, সর্টিং, map দিয়ে গণনা।' },
  specialist: { en: 'Crack Div. 2 C: binary search on the answer, prefix sums, two pointers.', bn: 'Div. 2-এর C ভাঙুন: উত্তরের ওপর বাইনারি সার্চ, প্রিফিক্স সাম, টু পয়েন্টার।' },
  expert: { en: 'Reach Div. 2 D: DP, BFS/DFS, DSU, number theory.', bn: 'Div. 2-এর D-তে পৌঁছান: DP, BFS/DFS, DSU, সংখ্যাতত্ত্ব।' },
  cm: { en: 'You are Div. 1 now. Segment trees, combinatorics, harder DP.', bn: 'এখন আপনি Div. 1। সেগমেন্ট ট্রি, কম্বিনেটরিক্স, কঠিন DP।' },
  master: { en: 'Div. 1 B–C: strong observations on top of standard tools.', bn: 'Div. 1-এর B–C: প্রচলিত টুলের ওপর জোরালো পর্যবেক্ষণ।' },
  im: { en: 'Consistency across many rounds is the whole game here.', bn: 'এখানে অনেক রাউন্ডে ধারাবাহিকতাই আসল খেলা।' },
  gm: { en: 'Div. 1 D and beyond.', bn: 'Div. 1-এর D এবং তার পরের প্রবলেম।' },
  igm: { en: 'A few hundred people in the world.', bn: 'সারা বিশ্বে কয়েকশো জন।' },
  lgm: { en: 'The very top of the ladder.', bn: 'সিঁড়ির একেবারে চূড়া।' },
};

export function RankForge() {
  const { t, num } = useI18n();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>('newbie');

  const bands = RANKS.map((r, i) => {
    const lo = Math.max(r.min, FLOOR);
    const hi = i + 1 < RANKS.length ? RANKS[i + 1].min : CEIL;
    return { ...r, lo, width: ((hi - lo) / (CEIL - FLOOR)) * 100 };
  });

  const current = bands.find((b) => b.id === active) ?? bands[0];
  const step = reduce ? 0 : 0.11;

  return (
    <div className="w-full">
      <div
        className="relative flex h-14 overflow-hidden rounded-xl border border-seam bg-iron sm:h-16"
        onMouseLeave={() => setActive('newbie')}
      >
        {bands.map((b, i) => (
          <button
            key={b.id}
            type="button"
            className="group relative h-full outline-none first:rounded-l-xl last:rounded-r-xl focus-visible:z-10"
            style={{ width: `${b.width}%` }}
            onMouseEnter={() => setActive(b.id)}
            onFocus={() => setActive(b.id)}
            aria-label={`${t(b.name)}, ${num(b.min)}+`}
          >
            <motion.span
              className="absolute inset-0 origin-left"
              style={{ background: b.color }}
              initial={reduce ? false : { scaleX: 0, opacity: 0.4 }}
              animate={{ scaleX: 1, opacity: active === b.id ? 1 : 0.62 }}
              transition={{
                scaleX: { delay: 0.25 + i * step, duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              }}
            />
            {/* the hot edge that runs along the bar while it heats */}
            {!reduce && (
              <motion.span
                className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-white/70 blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 0.3 + i * step, duration: 0.5 }}
              />
            )}
            <span className="absolute inset-y-0 right-0 w-px bg-steel/40" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="relative mt-2 h-5 text-xs text-slate tabular-nums" aria-hidden="true">
        {bands.map((b) => {
          const left = ((b.lo - FLOOR) / (CEIL - FLOOR)) * 100;
          return (
            <span key={b.id} className="absolute hidden -translate-x-1/2 first:translate-x-0 sm:inline" style={{ left: `${left}%` }}>
              {num(b.lo)}
            </span>
          );
        })}
      </div>

      <div className="mt-4 min-h-[4.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + t(current.name)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-display text-lg font-semibold" style={{ color: current.color }}>
              {t(current.name)}
              <span className="ml-2 text-sm font-normal text-slate tabular-nums">
                {current.min === 0 ? `< ${num(RANKS[1].min)}` : `${num(current.min)}+`}
              </span>
            </div>
            <p className="text-ash/85">{t(TRAIN[current.id])}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
