/**
 * Interactive judging in the browser.
 *
 * The compiled program is synchronous WebAssembly: it cannot wait for the judge in the middle of
 * a run. So we replay it. Each round starts the program from scratch with everything the judge
 * has said so far as stdin. The program runs until it asks for input we do not have yet (the
 * runner stops it right there), and the lines it printed beyond those already handled are the new
 * queries. The judge answers them, the answers are appended to stdin, and the next round starts.
 * A program that is deterministic (all of ours are) behaves exactly as it would in a live chat.
 */
import type { Judge } from '@/data/problems/judges/types';
import type { RunResult } from './index';

export type Turn = { dir: 'out' | 'in'; text: string };

export type InteractiveOutcome = {
  verdict: 'passed' | 'wrong' | 'tle' | 'rte' | 'ole';
  message: string;
  transcript: Turn[];
  ms: number;
  stderr: string;
  exitCode: number;
  error?: string;
};

/** One run of the program on a fixed stdin. `need_input` means it stopped at the end of stdin. */
export type RunOnce = (stdin: string, remainingMs: number) => Promise<RunResult>;

const MAX_ROUNDS = 1200;

export async function playInteractive(runOnce: RunOnce, judge: Judge, timeLimitMs: number): Promise<InteractiveOutcome> {
  const transcript: Turn[] = [];
  const t0 = Date.now();
  let stdin = judge.first ? judge.first + '\n' : '';
  let handled = 0; // program lines already given to the judge
  const printed: string[] = [];
  let last: RunResult | null = null;

  const finish = (verdict: InteractiveOutcome['verdict'], message: string): InteractiveOutcome => ({
    verdict,
    message,
    transcript,
    ms: Date.now() - t0,
    stderr: last?.stderr ?? '',
    exitCode: last?.exitCode ?? 0,
    error: last?.error,
  });

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const remaining = timeLimitMs - (Date.now() - t0);
    if (remaining <= 0) return finish('tle', '');
    const r = await runOnce(stdin, remaining);
    last = r;
    if (r.status === 'time_limit') return finish('tle', '');
    if (r.status === 'output_limit') return finish('ole', '');
    if (r.status === 'runtime_error') return finish('rte', '');

    const exited = r.status === 'ok';
    const lines = r.stdout.split('\n');
    const tail = lines.pop() ?? ''; // text after the last newline: only counts if the program has exited
    if (exited && tail.trim()) lines.push(tail);

    // The replay must print what it printed before; otherwise the program is not deterministic.
    for (let i = 0; i < Math.min(handled, lines.length); i++) {
      if (lines[i] !== printed[i]) {
        return finish('wrong', 'The program printed something different on a replay. In the browser runner it must behave the same way every time (no clock-based random seeds).');
      }
    }
    if (lines.length < handled) return finish('wrong', 'The program printed fewer lines on a replay. It must behave the same way every time.');

    let progressed = false;
    for (let i = handled; i < lines.length; i++) {
      handled++;
      printed.push(lines[i]);
      transcript.push({ dir: 'out', text: lines[i] });
      const step = judge.onLine(lines[i]);
      if (step.kind === 'done') return finish(step.ok ? 'passed' : 'wrong', step.message);
      if (step.text !== '') {
        transcript.push({ dir: 'in', text: step.text });
        stdin += step.text + '\n';
        progressed = true;
      }
    }

    if (exited) {
      const end = judge.end();
      return finish(end.ok ? 'passed' : 'wrong', end.message);
    }
    if (!progressed) {
      return finish('wrong', 'The program is waiting for input, but the judge has nothing more to say. (Did you forget to print a query, or to flush?)');
    }
  }
  return finish('wrong', 'Too many rounds of interaction.');
}
