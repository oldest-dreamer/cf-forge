import type { L } from '@/i18n/types';

/** One recurring pattern inside a tag, taught with a template and an example. */
export type TagPattern = {
  name: L;
  /** Paragraphs explaining the pattern. */
  explain: L[];
  /** A short, complete C++ template or illustration. */
  code: string;
  /** A worked example: a CF Forge problem id (if hosted) and the walk-through. */
  example: { problem?: string; text: L };
};

/** A complete guide to one Codeforces tag. */
export type TagGuide = {
  slug: string;
  /** What the tag means and why it matters, in a few paragraphs. */
  intro: L[];
  /** How to recognise the tag from a statement, beyond the short signals. */
  recognize: L[];
  patterns: TagPattern[];
  mistakes: L[];
  /** A step-by-step way to practise the tag. */
  plan: L[];
};
