import type { ProblemEntry, Solution, SolutionKind } from './types';
import type { TagSlug } from '@/data/tags/tags';

/** A bilingual pair: [English, Bangla]. */
export type T = [string, string];
const L = (t: T) => ({ en: t[0], bn: t[1] });

export type Spec = {
  id: string;
  name: string;
  rating: number;
  tags: TagSlug[];
  why: T;
  statement: T;
  input: T;
  output: T;
  limits: { timeSec: number; memoryMb: number; notes: T[] };
  samples: { input: string; output: string; explain: T }[];
  observation: T;
  approach: T[];
  walk: { input: string; steps: [string, T][] };
  cx: { time: string; space: string; why: T };
  sols: {
    id: string;
    kind: SolutionKind;
    title: T;
    idea: T;
    explain: T[];
    code: string;
    time: string;
    space: string;
    accepted?: boolean;
    toolkit?: string[];
  }[];
  own: { input: string; output: string; note: T }[];
  pitfalls: T[];
  related: { id: string; name: string; why: T }[];
  toolkit: string[];
};

const digits = '০১২৩৪৫৬৭৮৯';

/** Builds a full ProblemEntry from a compact spec (samples double as sample tests). */
export function mk(s: Spec): ProblemEntry {
  const m = /^(\d+)([A-Z]\d?)$/.exec(s.id)!;
  const sols: Solution[] = s.sols.map((x) => ({
    id: x.id,
    kind: x.kind,
    title: L(x.title),
    idea: L(x.idea),
    explain: x.explain.map(L),
    code: x.code,
    time: x.time,
    space: x.space,
    accepted: x.accepted ?? true,
    toolkit: x.toolkit,
  }));
  return {
    id: s.id,
    contestId: Number(m[1]),
    index: m[2],
    name: s.name,
    rating: s.rating,
    tags: s.tags,
    why: L(s.why),
    statement: L(s.statement),
    input: L(s.input),
    output: L(s.output),
    limits: { timeSec: s.limits.timeSec, memoryMb: s.limits.memoryMb, notes: s.limits.notes.map(L) },
    samples: s.samples.map((x) => ({ input: x.input, output: x.output, explain: L(x.explain) })),
    observation: L(s.observation),
    approach: s.approach.map(L),
    walkthrough: { input: s.walk.input, steps: s.walk.steps.map(([state, text]) => ({ state, text: L(text) })) },
    complexity: { time: s.cx.time, space: s.cx.space, why: L(s.cx.why) },
    solutions: sols,
    tests: [
      ...s.samples.map((x, i) => ({
        input: x.input,
        output: x.output,
        source: 'sample' as const,
        note: { en: `Sample ${i + 1}.`, bn: `স্যাম্পল ${digits[i + 1]}।` },
      })),
      ...s.own.map((x) => ({ input: x.input, output: x.output, source: 'own' as const, note: L(x.note) })),
    ],
    pitfalls: s.pitfalls.map(L),
    related: s.related.map((r) => ({ id: r.id, name: r.name, why: L(r.why) })),
    toolkit: s.toolkit,
  };
}
