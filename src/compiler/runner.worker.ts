/// <reference lib="webworker" />
/**
 * Runner worker: executes one compiled program with the given stdin.
 * It runs synchronously; the page kills this worker if it exceeds the time limit.
 */
import { WASI, WASIProcExit, File, OpenFile, ConsoleStdout } from '@bjorn3/browser_wasi_shim';

export type RunRequest = { id: number; module: WebAssembly.Module; stdin: string };
export type RunReply = {
  id: number;
  status: 'ok' | 'runtime_error' | 'output_limit';
  exitCode: number;
  stdout: string;
  stderr: string;
  ms: number;
  error?: string;
};

const OUTPUT_LIMIT = 1 << 20; // 1 MiB

self.onmessage = async (ev: MessageEvent<RunRequest>) => {
  const { id, module, stdin } = ev.data;
  const out: Uint8Array[] = [];
  const err: Uint8Array[] = [];
  let outLen = 0;
  let errLen = 0;
  let overflow = false;

  const fds = [
    new OpenFile(new File(new TextEncoder().encode(stdin))),
    new ConsoleStdout((b) => {
      outLen += b.length;
      if (outLen > OUTPUT_LIMIT) overflow = true;
      else out.push(b.slice());
    }),
    new ConsoleStdout((b) => {
      errLen += b.length;
      if (errLen <= 64 * 1024) err.push(b.slice());
    }),
  ];
  const wasi = new WASI(['main'], [], fds);

  const join = (parts: Uint8Array[]) => {
    const all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
    let o = 0;
    for (const p of parts) {
      all.set(p, o);
      o += p.length;
    }
    return new TextDecoder().decode(all);
  };

  let exitCode = 0;
  let status: RunReply['status'] = 'ok';
  let error: string | undefined;
  const t0 = performance.now();
  try {
    const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: wasi.wasiImport });
    exitCode = wasi.start(instance as unknown as { exports: { memory: WebAssembly.Memory; _start: () => unknown } });
  } catch (e) {
    if (e instanceof WASIProcExit) exitCode = e.code;
    else {
      status = 'runtime_error';
      exitCode = -1;
      error = String((e as Error)?.message ?? e);
    }
  }
  const ms = Math.round(performance.now() - t0);
  if (status === 'ok' && exitCode !== 0) status = 'runtime_error';
  if (overflow) status = 'output_limit';

  (self as unknown as Worker).postMessage({ id, status, exitCode, stdout: join(out), stderr: join(err), ms, error } satisfies RunReply);
};
