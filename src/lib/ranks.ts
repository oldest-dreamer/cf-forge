import type { L } from '@/i18n/types';

/** Codeforces rank bands. Colours are used only to mean rating. */
export type Rank = {
  id: string;
  name: L;
  min: number;
  /** CSS custom property holding the band colour. */
  color: string;
};

export const RANKS: Rank[] = [
  { id: 'newbie', name: { en: 'Newbie', bn: 'নিউবি' }, min: 0, color: 'var(--color-r-newbie)' },
  { id: 'pupil', name: { en: 'Pupil', bn: 'পিউপিল' }, min: 1200, color: 'var(--color-r-pupil)' },
  { id: 'specialist', name: { en: 'Specialist', bn: 'স্পেশালিস্ট' }, min: 1400, color: 'var(--color-r-specialist)' },
  { id: 'expert', name: { en: 'Expert', bn: 'এক্সপার্ট' }, min: 1600, color: 'var(--color-r-expert)' },
  { id: 'cm', name: { en: 'Candidate Master', bn: 'ক্যান্ডিডেট মাস্টার' }, min: 1900, color: 'var(--color-r-cm)' },
  { id: 'master', name: { en: 'Master', bn: 'মাস্টার' }, min: 2100, color: 'var(--color-r-master)' },
  { id: 'im', name: { en: 'International Master', bn: 'ইন্টারন্যাশনাল মাস্টার' }, min: 2300, color: 'var(--color-r-im)' },
  { id: 'gm', name: { en: 'Grandmaster', bn: 'গ্র্যান্ডমাস্টার' }, min: 2400, color: 'var(--color-r-gm)' },
  { id: 'igm', name: { en: 'International Grandmaster', bn: 'ইন্টারন্যাশনাল গ্র্যান্ডমাস্টার' }, min: 2600, color: 'var(--color-r-igm)' },
  { id: 'lgm', name: { en: 'Legendary Grandmaster', bn: 'লিজেন্ডারি গ্র্যান্ডমাস্টার' }, min: 3000, color: 'var(--color-r-lgm)' },
];

export function rankFor(rating: number): Rank {
  let r = RANKS[0];
  for (const band of RANKS) if (rating >= band.min) r = band;
  return r;
}
