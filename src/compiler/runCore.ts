/**
 * Runs one compiled program on a fixed stdin. Shared by the runner worker and by the Node-side
 * checks in tools/, so it only imports packages (no "@/" aliases, no extensionless paths).
 */
import { WASI, WASIProcExit, File, OpenFile, ConsoleStdout } from '@bjorn3/browser_wasi_shim';

export type CoreResult = {
  status: 'ok' | 'runtime_error' | 'output_limit' | 'need_input';
  exitCode: number;
  stdout: string;
  stderr: string;
  ms: number;
  error?: string;
};

const OUTPUT_LIMIT = 1 << 20; // 1 MiB

/** Thrown when an interactive run reads past the input it has been given so far. */
class NeedInput extends Error {}

/** stdin that stops the program (instead of returning end-of-file) when it runs dry. */
class BlockingStdin extends OpenFile {
  fd_read(size: number) {
    if (this.file_pos >= this.file.size) throw new NeedInput();
    return super.fd_read(size);
  }
}

export async function runModule(module: WebAssembly.Module, stdin: string, blockOnEof: boolean): Promise<CoreResult> {
  const out: Uint8Array[] = [];
  const err: Uint8Array[] = [];
  let outLen = 0;
  let errLen = 0;
  let overflow = false;

  const input = new File(new TextEncoder().encode(stdin));
  const fds = [
    blockOnEof ? new BlockingStdin(input) : new OpenFile(input),
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
  let status: CoreResult['status'] = 'ok';
  let error: string | undefined;
  const t0 = performance.now();
  try {
    const instance = await WebAssembly.instantiate(module, { wasi_snapshot_preview1: wasi.wasiImport });
    exitCode = wasi.start(instance as unknown as { exports: { memory: WebAssembly.Memory; _start: () => unknown } });
  } catch (e) {
    if (e instanceof WASIProcExit) exitCode = e.code;
    else if (e instanceof NeedInput) {
      status = 'need_input';
      exitCode = 0;
    } else {
      status = 'runtime_error';
      exitCode = -1;
      error = String((e as Error)?.message ?? e);
    }
  }
  const ms = Math.round(performance.now() - t0);
  if (status === 'ok' && exitCode !== 0) status = 'runtime_error';
  if (overflow) status = 'output_limit';

  return { status, exitCode, stdout: join(out), stderr: join(err), ms, error };
}
