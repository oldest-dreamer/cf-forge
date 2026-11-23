/**
 * Page-side API for the in-browser C++ toolchain.
 * - compile(): one long-lived compiler worker (the toolchain stays loaded)
 * - run(): a runner worker per program; killed and replaced on time limit
 */
import type { CompileRequest, WorkerReply } from './compiler.worker';
import type { RunReply, RunRequest } from './runner.worker';

export type CompileResult =
  | { ok: true; module: WebAssembly.Module; warnings: string; ms: number }
  | { ok: false; kind: 'compile' | 'load'; message: string };

export type RunResult = {
  status: 'ok' | 'runtime_error' | 'output_limit' | 'time_limit';
  stdout: string;
  stderr: string;
  exitCode: number;
  ms: number;
  error?: string;
};

export type Progress = { done: number; total: number };

let compiler: Worker | null = null;
let seq = 0;
let ready = false;
const cache = new Map<string, Promise<CompileResult>>();

function compilerWorker() {
  compiler ??= new Worker(new URL('./compiler.worker.ts', import.meta.url), { type: 'module' });
  return compiler;
}

export const isCompilerReady = () => ready;

export function compile(code: string, onProgress?: (p: Progress) => void): Promise<CompileResult> {
  const hit = cache.get(code);
  if (hit) return hit;

  const p = new Promise<CompileResult>((resolve) => {
    const w = compilerWorker();
    const id = ++seq;
    const onMsg = (ev: MessageEvent<WorkerReply>) => {
      const m = ev.data;
      if (m.id !== id) return;
      if (m.type === 'progress') {
        onProgress?.({ done: m.done, total: m.total });
        return;
      }
      w.removeEventListener('message', onMsg);
      if (m.type === 'compiled') {
        ready = true;
        WebAssembly.compile(m.wasm).then(
          (module) => resolve({ ok: true, module, warnings: m.warnings, ms: m.ms }),
          (e) => resolve({ ok: false, kind: 'compile', message: String(e) }),
        );
      } else {
        if (m.kind === 'compile') ready = true;
        resolve({ ok: false, kind: m.kind, message: m.message });
      }
    };
    w.addEventListener('message', onMsg);
    w.postMessage({ id, type: 'compile', code } satisfies CompileRequest);
  });

  cache.set(code, p);
  p.then((r) => {
    if (!r.ok && r.kind === 'load') cache.delete(code);
  });
  if (cache.size > 30) cache.delete(cache.keys().next().value as string);
  return p;
}

let runner: Worker | null = null;

export function run(module: WebAssembly.Module, stdin: string, timeLimitMs: number): Promise<RunResult> {
  return new Promise((resolve) => {
    runner ??= new Worker(new URL('./runner.worker.ts', import.meta.url), { type: 'module' });
    const w = runner;
    const id = ++seq;
    const t0 = performance.now();
    const timer = setTimeout(() => {
      w.terminate();
      if (runner === w) runner = null;
      resolve({ status: 'time_limit', stdout: '', stderr: '', exitCode: -1, ms: Math.round(performance.now() - t0) });
    }, timeLimitMs);
    const onMsg = (ev: MessageEvent<RunReply>) => {
      if (ev.data.id !== id) return;
      clearTimeout(timer);
      w.removeEventListener('message', onMsg);
      const { id: _id, ...rest } = ev.data;
      void _id;
      resolve(rest);
    };
    w.addEventListener('message', onMsg);
    w.postMessage({ id, module, stdin } satisfies RunRequest);
  });
}

/** Codeforces-style check: compare whitespace-separated tokens. */
export function sameOutput(got: string, expected: string) {
  const a = got.trim().split(/\s+/).filter(Boolean);
  const b = expected.trim().split(/\s+/).filter(Boolean);
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
