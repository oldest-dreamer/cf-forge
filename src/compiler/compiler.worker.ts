/// <reference lib="webworker" />
/**
 * Compiler worker: runs Clang (compiled to WebAssembly) entirely in the browser.
 * The compiler's files are served as gzip parts from /clang/<version>/ and joined here.
 */
import { BITS_STDCXX } from './headers';

type Manifest = { version: string; files: Record<string, { parts: number; size: number; gzSize: number }> };
type Clang = {
  runClang: (args: string[], files: Record<string, unknown>, opts: Record<string, unknown>) => Promise<Record<string, unknown>>;
  Exit: new (...a: unknown[]) => Error & { code: number };
};

export type CompileRequest = { id: number; type: 'compile'; code: string };
export type WorkerReply =
  | { id: number; type: 'progress'; done: number; total: number }
  | { id: number; type: 'compiled'; wasm: ArrayBuffer; warnings: string; ms: number }
  | { id: number; type: 'error'; kind: 'compile' | 'load'; message: string };

let clang: Promise<Clang> | null = null;
let progressId = 0;

function partsResponse(base: string, name: string, info: Manifest['files'][string]): Response {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (let i = 0; i < info.parts; i++) {
          const res = await fetch(`${base}/${name}.gz.${i}`);
          if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} for ${name} part ${i}`);
          const reader = res.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });
  const body = stream.pipeThrough(new DecompressionStream('gzip') as unknown as ReadableWritablePair<Uint8Array, Uint8Array>);
  return new Response(body, {
    headers: {
      'content-type': name.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream',
      'content-length': String(info.size),
    },
  });
}

async function loadClang(): Promise<Clang> {
  const manifest = (await (await fetch('/clang/manifest.json')).json()) as Manifest;
  const base = `/clang/${manifest.version}`;
  const realFetch = self.fetch.bind(self);

  // The compiler fetches its own files; hand it our joined, decompressed parts instead.
  self.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, self.location.href);
    const name = url.pathname.split('/').pop() ?? '';
    const info = manifest.files[name];
    if (info && url.pathname.startsWith(base)) return partsResponse(base, name, info);
    return realFetch(input, init);
  }) as typeof fetch;

  const mod = (await import(/* @vite-ignore */ `${base}/bundle.js`)) as Clang;
  // Download and compile the toolchain now, reporting progress.
  await mod.runClang(['clang++', '--version'], {}, {
    stdout: () => {},
    stderr: () => {},
    fetchProgress: ({ totalLength, doneLength }: { totalLength: number; doneLength: number }) => {
      (self as unknown as Worker).postMessage({ id: progressId, type: 'progress', done: doneLength, total: totalLength } satisfies WorkerReply);
    },
  });
  return mod;
}

const decoder = new TextDecoder();

self.onmessage = async (ev: MessageEvent<CompileRequest>) => {
  const { id, code } = ev.data;
  progressId = id;
  let mod: Clang;
  try {
    clang ??= loadClang();
    mod = await clang;
  } catch (e) {
    clang = null;
    (self as unknown as Worker).postMessage({ id, type: 'error', kind: 'load', message: String((e as Error)?.message ?? e) } satisfies WorkerReply);
    return;
  }

  let stderr = '';
  const t0 = performance.now();
  try {
    const out = await mod.runClang(
      ['clang++', '-std=c++20', '-O2', '-fno-exceptions', '-Wall', '-Wno-unused-const-variable', '-I', 'inc', 'main.cpp', '-o', 'main.wasm'],
      { 'main.cpp': code, inc: { bits: { 'stdc++.h': BITS_STDCXX } } },
      { stdout: () => {}, stderr: (b: Uint8Array | null) => b && (stderr += decoder.decode(b, { stream: true })) },
    );
    const bytes = out['main.wasm'] as Uint8Array;
    const wasm = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    (self as unknown as Worker).postMessage(
      { id, type: 'compiled', wasm, warnings: stderr, ms: Math.round(performance.now() - t0) } satisfies WorkerReply,
      [wasm],
    );
  } catch (e) {
    const msg = stderr || String((e as Error)?.message ?? e);
    (self as unknown as Worker).postMessage({ id, type: 'error', kind: 'compile', message: msg } satisfies WorkerReply);
  }
};
