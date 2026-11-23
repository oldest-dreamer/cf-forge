import { useCallback, useRef, useState } from 'react';
import { compile, isCompilerReady, run, sameOutput, type RunResult } from './index';

export type Phase = 'idle' | 'downloading' | 'compiling' | 'running' | 'done';

export type TestOutcome = RunResult & { verdict: 'passed' | 'wrong' | 'tle' | 'rte' | 'ole' | 'ran' };

export function verdictOf(r: RunResult, expected?: string): TestOutcome['verdict'] {
  if (r.status === 'time_limit') return 'tle';
  if (r.status === 'runtime_error') return 'rte';
  if (r.status === 'output_limit') return 'ole';
  if (expected === undefined) return 'ran';
  return sameOutput(r.stdout, expected) ? 'passed' : 'wrong';
}

/** Compile once, then run the program on several inputs, reporting progress as it goes. */
export function useCompiler() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [compileError, setCompileError] = useState<{ kind: 'compile' | 'load'; message: string } | null>(null);
  const [results, setResults] = useState<(TestOutcome | null)[]>([]);
  const [current, setCurrent] = useState(-1);
  const busy = useRef(false);

  const runAll = useCallback(async (code: string, cases: { input: string; output?: string }[], timeLimitMs: number) => {
    if (busy.current) return;
    busy.current = true;
    setCompileError(null);
    setResults(cases.map(() => null));
    setCurrent(-1);
    setProgress(0);
    setPhase(isCompilerReady() ? 'compiling' : 'downloading');

    const c = await compile(code, ({ done, total }) => {
      const pct = total ? done / total : 0;
      setProgress(pct);
      if (pct >= 1) setPhase('compiling');
    });
    if (!c.ok) {
      setCompileError({ kind: c.kind, message: c.message });
      setPhase('done');
      busy.current = false;
      return;
    }

    setPhase('running');
    for (let i = 0; i < cases.length; i++) {
      setCurrent(i);
      const r = await run(c.module, cases[i].input.endsWith('\n') ? cases[i].input : cases[i].input + '\n', timeLimitMs);
      const outcome: TestOutcome = { ...r, verdict: verdictOf(r, cases[i].output) };
      setResults((old) => {
        const next = old.slice();
        next[i] = outcome;
        return next;
      });
      // Like a judge, stop after a time limit: the rest would only make you wait.
      if (outcome.verdict === 'tle') break;
    }
    setCurrent(-1);
    setPhase('done');
    busy.current = false;
  }, []);

  return { phase, progress, compileError, results, current, runAll };
}
