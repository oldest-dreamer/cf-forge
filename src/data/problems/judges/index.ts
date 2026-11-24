import type { JudgeFactory } from './types.ts';
import { j679A, j727C, j1167B, j1486C1, j1486C2 } from './wave21a.ts';

export type { Judge, JudgeFactory, JudgeStep } from './types.ts';

/** One judge per interactive problem id. Wave files add their entries below. */
export const JUDGES: Record<string, JudgeFactory> = {
  '679A': j679A,
  '727C': j727C,
  '1167B': j1167B,
  '1486C1': j1486C1,
  '1486C2': j1486C2,
};
