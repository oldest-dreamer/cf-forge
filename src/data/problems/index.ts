import type { ProblemEntry } from './types.ts';
import { p1A } from './p1A.ts';
import { p4A } from './p4A.ts';
import { p71A } from './p71A.ts';
import { p231A } from './p231A.ts';
import { p158A } from './p158A.ts';
import { p266A } from './p266A.ts';
import { p617A } from './p617A.ts';
import { p1475A } from './p1475A.ts';
import { p282A, p263A, p977A, p791A, p1328A, p486A, p50A } from './wave1a.ts';

/** The CF Forge problem pool. New waves are appended here. */
export const PROBLEMS: ProblemEntry[] = [
  p4A, p1A, p71A, p231A,
  // wave 1a
  p158A, p266A, p282A, p263A, p977A, p791A, p617A, p1475A, p1328A, p486A, p50A,
];

export const PROBLEM_BY_ID: Record<string, ProblemEntry> = Object.fromEntries(
  PROBLEMS.map((p) => [p.id.toUpperCase(), p]),
);

export function problemsForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.tags as string[]).includes(slug)).sort((a, b) => a.rating - b.rating);
}

export function featuredForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.featuredFor as string[] | undefined)?.includes(slug));
}
