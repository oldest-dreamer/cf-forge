import type { JudgeFactory } from './types.ts';
import { j1407C, j1797C, j1698D, j1697D, j1556D } from './wave21b.ts';
import { j1534D, j862D, j1088D, j1103B, j843B } from './wave21c.ts';
import { j679A, j727C, j1167B, j1486C1, j1486C2 } from './wave21a.ts';

export type { Judge, JudgeFactory, JudgeStep } from './types.ts';

/** One judge per interactive problem id. Wave files add their entries below. */
export const JUDGES: Record<string, JudgeFactory> = {
  '679A': j679A,
  '727C': j727C,
  '1167B': j1167B,
  '1486C1': j1486C1,
  '1486C2': j1486C2,
  '1407C': j1407C,
  '1797C': j1797C,
  '1698D': j1698D,
  '1697D': j1697D,
  '1556D': j1556D,
  '1534D': j1534D,
  '862D': j862D,
  '1088D': j1088D,
  '1103B': j1103B,
  '843B': j843B,
};
