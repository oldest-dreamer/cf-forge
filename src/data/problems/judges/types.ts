/**
 * Judges for interactive problems.
 *
 * A judge is a tiny state machine that plays the part of the Codeforces interactor. It never sees
 * the program's code, only the lines the program prints. The same judge runs in the browser (see
 * src/compiler/interactive.ts) and in tools/verify.mjs, so what we verify is what the site runs.
 *
 * Rules every judge follows:
 *  - `data` is the hidden test case (the same text that is stored as the test's `input`).
 *  - `first` is sent to the program before it prints anything (for example "n" or "n k").
 *  - `onLine(line)` is called once per line the program prints, in order.
 *    A reply of "" means "send nothing" (for a line that is part of a longer message).
 *  - With `lenient: true` the judge skips the query-count limit. Slow reference solutions that
 *    are marked `accepted: false` are verified that way; every other check stays strict.
 *  - Judges are pure TypeScript with no imports from the app, so Node can load them directly.
 */
export type JudgeStep = { kind: 'reply'; text: string } | { kind: 'done'; ok: boolean; message: string };

export type Judge = {
  first: string;
  onLine(line: string): JudgeStep;
  /** Called when the program exits before the judge said it was done. */
  end(): { ok: boolean; message: string };
};

export type JudgeFactory = (data: string, opts: { lenient?: boolean }) => Judge;

export const reply = (text: string): JudgeStep => ({ kind: 'reply', text });
export const accept = (message = 'OK'): JudgeStep => ({ kind: 'done', ok: true, message });
export const reject = (message: string): JudgeStep => ({ kind: 'done', ok: false, message });

/** Split a hidden-data string into numbers (whitespace separated). */
export const nums = (data: string) => data.trim().split(/\s+/).filter(Boolean).map(Number);
/** Split a program line into numbers; null when it contains anything else. */
export function intsOf(line: string): number[] | null {
  const parts = line.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  const out: number[] = [];
  for (const x of parts) {
    if (!/^-?\d+$/.test(x)) return null;
    out.push(Number(x));
  }
  return out;
}

/** Query budget: unlimited for the slow reference solutions (lenient), `max` for everything else. */
export const budget = (max: number, lenient?: boolean) => (lenient ? Number.MAX_SAFE_INTEGER : max);
export const bad = (line: string) => `could not understand "${line.slice(0, 40)}"`;
