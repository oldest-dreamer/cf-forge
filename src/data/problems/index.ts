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
import { p160A, p158B, p271A, p236A, p118A, p1360B } from './wave1b_featured.ts';
import { p706B, p279B, p1201C, p371C, p455A } from './wave2a.ts';
import { p189A, p1195C, p230B, p26A, p1350A } from './wave2b.ts';
import { p1520D, p4C, p1343B, p1373B, p1421A } from './wave2c.ts';
import { p1097B, p520B, p1020B, p115A, p1538C } from './wave2d.ts';
import { p996A, p1472B, p580A, p1475B, p1182A, p363B, p489B, p433B } from './wave3a.ts';
import { p476B, p489C, p698A, p550A, p1398C, p431C, p466C, p5C } from './wave3b.ts';
import { p405A, p58A, p230A, p456A, p492B, p451B, p459B, p276C, p514A, p478B } from './wave4a.ts';
import { p723A, p1849B, p1294C, p467B, p327A, p479A, p25A, p208A, p266B, p443A } from './wave4b.ts';
import { p112A, p281A, p59A, p520A, p41A, p734A, p131A, p96A, p339A, p469A, p546A, p122A, p69A } from './wave1b.ts';

/** The CF Forge problem pool. New waves are appended here. */
export const PROBLEMS: ProblemEntry[] = [
  p4A, p1A, p71A, p231A,
  // wave 1a
  p158A, p266A, p282A, p263A, p977A, p791A, p617A, p1475A, p1328A, p486A, p50A,
  // wave 1b
  p160A, p158B, p271A, p236A, p118A, p1360B,
  p112A, p281A, p59A, p520A, p41A, p734A, p131A, p96A, p339A, p469A, p546A, p122A, p69A,
  // wave 2
  p706B, p279B, p1201C, p371C, p455A, p189A, p1195C, p230B, p26A, p1350A,
  p1520D, p4C, p1343B, p1373B, p1421A, p1097B, p520B, p1020B, p115A, p1538C,
  // wave 3 (dp ladder)
  p996A, p1472B, p580A, p1475B, p1182A, p363B, p489B, p433B,
  p476B, p489C, p698A, p550A, p1398C, p431C, p466C, p5C,
  // wave 4 (greedy, sortings, brute force, strings, constructive)
  p405A, p58A, p230A, p456A, p492B, p451B, p459B, p276C, p514A, p478B,
  p723A, p1849B, p1294C, p467B, p327A, p479A, p25A, p208A, p266B, p443A,
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
