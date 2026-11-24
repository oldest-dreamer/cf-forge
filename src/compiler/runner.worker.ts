/// <reference lib="webworker" />
/**
 * Runner worker: executes one compiled program with the given stdin.
 * It runs synchronously; the page kills this worker if it exceeds the time limit.
 */
import { runModule } from './runCore';

export type RunRequest = { id: number; module: WebAssembly.Module; stdin: string; blockOnEof?: boolean };
export type RunReply = {
  id: number;
  status: 'ok' | 'runtime_error' | 'output_limit' | 'need_input';
  exitCode: number;
  stdout: string;
  stderr: string;
  ms: number;
  error?: string;
};

self.onmessage = async (ev: MessageEvent<RunRequest>) => {
  const { id, module, stdin, blockOnEof } = ev.data;
  const r = await runModule(module, stdin, !!blockOnEof);
  (self as unknown as Worker).postMessage({ id, ...r } satisfies RunReply);
};
