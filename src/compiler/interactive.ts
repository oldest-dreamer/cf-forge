import type { Judge } from '@/data/problems/judges/types';
import { run } from './index';
import { playInteractive } from './interactiveCore';

export type { InteractiveOutcome, Turn } from './interactiveCore';

/** Judge a compiled program against an interactive judge, replaying it once per query. */
export function runInteractive(module: WebAssembly.Module, judge: Judge, timeLimitMs: number) {
  return playInteractive((stdin, remaining) => run(module, stdin, remaining, true), judge, timeLimitMs);
}
