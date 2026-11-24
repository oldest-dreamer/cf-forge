import type { L } from '@/i18n/types';

/** One piece of a lesson, rendered in order. */
export type Block =
  | { kind: 'p'; text: L }
  | { kind: 'h'; text: L }
  | { kind: 'list'; items: L[] }
  | { kind: 'tip'; text: L }
  | { kind: 'warn'; text: L }
  /** A complete program the reader can run. `input` pre-fills the input box. */
  | { kind: 'code'; code: string; input?: string; caption?: L };

export type Exercise = {
  prompt: L;
  /** Code the editor starts with. */
  starter: string;
  tests: { input: string; output: string }[];
  hint: L;
  /** A reference solution, shown on request. */
  solution: string;
};

export type Lesson = {
  id: string;
  title: L;
  summary: L;
  minutes: number;
  blocks: Block[];
  mistakes: L[];
  exercise: Exercise;
  /** Toolkit anchors this lesson introduces. */
  toolkit: string[];
};

export type ToolkitGroup = 'io' | 'basics' | 'math' | 'strings' | 'containers' | 'algorithms' | 'modern' | 'bits' | 'memory' | 'debug';

export type ToolkitEntry = {
  id: string;
  group: ToolkitGroup;
  title: string;
  summary: L;
  code: string;
  /** Time cost of the main operations, e.g. "O(log n) insert". */
  cost?: string;
  notes?: L[];
  /** Longer plain-language explanation: what it is, why, when. */
  explain?: L[];
  /** Typical mistakes with this tool. */
  pitfalls?: L[];
  /** Lesson that teaches this, if any. */
  lesson?: string;
};
