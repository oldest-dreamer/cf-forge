import type { ProblemEntry } from './types';
import { p1A } from './p1A';
import { p4A } from './p4A';
import { p71A } from './p71A';
import { p231A } from './p231A';

/** The CF Forge problem pool. New waves are appended here. */
export const PROBLEMS: ProblemEntry[] = [p4A, p1A, p71A, p231A];

export const PROBLEM_BY_ID: Record<string, ProblemEntry> = Object.fromEntries(
  PROBLEMS.map((p) => [p.id.toUpperCase(), p]),
);

export function problemsForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.tags as string[]).includes(slug)).sort((a, b) => a.rating - b.rating);
}

export function featuredForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.featuredFor as string[] | undefined)?.includes(slug));
}
