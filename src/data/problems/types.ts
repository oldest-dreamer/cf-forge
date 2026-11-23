/**
 * ProblemEntry — the schema behind every CF Forge problem page.
 *
 * A problem page has 11 parts, in this order:
 *  1. overview     – id, name, rating, tags, why it is worth solving
 *  2. statement    – the task retold in plain words + input/output + limits
 *  3. samples      – the statement's samples with an explanation of each
 *  4. observation  – the one insight that unlocks the problem
 *  5. approach     – the plan built on that insight
 *  6. walkthrough  – a step-by-step dry run on a concrete input
 *  7. complexity   – time and memory of the final solution, and why
 *  8. solutions    – C++ solutions (featured problems: 5, others: 1+)
 *  9. tests        – sample tests plus our own edge cases
 * 10. pitfalls     – mistakes people make on this problem
 * 11. related      – what to solve next + C++ toolkit anchors
 *
 * All human text is bilingual ({ en, bn }). Code, input and output are not.
 * Statements are retold in our own words; the full original lives on Codeforces.
 */
import type { L } from '@/i18n/types';
import type { TagSlug } from '@/data/tags/tags';

/** Anchor ids inside the C++ toolkit, e.g. "io-fast", "stl-sort". */
export type ToolkitAnchor = string;

export type SolutionKind =
  /** A genuinely different method (used first, up to 5). */
  | 'method'
  /** Ladder slots, used to fill the remaining places up to 5. */
  | 'brute'
  | 'better'
  | 'optimal'
  | 'stl'
  | 'alt';

export type Solution = {
  id: string;
  kind: SolutionKind;
  title: L;
  /** The idea in one or two sentences (shown above the code). */
  idea: L;
  /**
   * The full explanation of this method: how to think of it, why it is correct,
   * and how it runs on an example. One entry per paragraph.
   */
  explain?: L[];
  /** Complete C++ that compiles with GNU G++20 and passes on Codeforces. */
  code: string;
  time: string;
  space: string;
  /** Whether this solution is fast enough to get Accepted. */
  accepted: boolean;
  toolkit?: ToolkitAnchor[];
};

export type Sample = {
  input: string;
  output: string;
  explain: L;
};

export type TestCase = {
  input: string;
  output: string;
  source: 'sample' | 'own';
  /** What this case checks. */
  note: L;
};

export type WalkStep = {
  /** Short state label, e.g. "w = 8". Not translated. */
  state?: string;
  text: L;
};

export type RelatedProblem = {
  /** CF Forge id like "1A" or a Codeforces id we do not host yet. */
  id: string;
  name: string;
  why: L;
};

export type ProblemEntry = {
  /** 1. overview */
  id: string; // `${contestId}${index}`, e.g. "4A"
  contestId: number;
  index: string;
  name: string;
  rating: number;
  tags: TagSlug[];
  /** Featured problems carry the full 5-solution treatment on their tag page. */
  featuredFor?: TagSlug[];
  /** Why this problem is in the pool. */
  why: L;

  /** 2. statement */
  statement: L;
  input: L;
  output: L;
  limits: { timeSec: number; memoryMb: number; notes: L[] };

  /** 3. samples */
  samples: Sample[];

  /** 4. observation */
  observation: L;

  /** 5. approach */
  approach: L[];

  /** 6. walkthrough */
  walkthrough: { input: string; steps: WalkStep[] };

  /** 7. complexity */
  complexity: { time: string; space: string; why: L };

  /** 8. solutions */
  solutions: Solution[];

  /** 9. tests */
  tests: TestCase[];

  /** 10. pitfalls */
  pitfalls: L[];

  /** 11. related */
  related: RelatedProblem[];
  toolkit: ToolkitAnchor[];
};

export const PROBLEM_PARTS = [
  'overview',
  'statement',
  'samples',
  'observation',
  'approach',
  'walkthrough',
  'complexity',
  'solutions',
  'tests',
  'pitfalls',
  'related',
] as const;
export type ProblemPart = (typeof PROBLEM_PARTS)[number];

export function cfProblemUrl(p: Pick<ProblemEntry, 'contestId' | 'index'>) {
  return `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`;
}
