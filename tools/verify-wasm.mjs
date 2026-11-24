/**
 * Runs interactive problems the way the website does: compile with the site's own Clang (wasm),
 * then judge with the replay engine (src/compiler/interactiveCore.ts + runCore.ts).
 * Checks the samples and own tests of every accepted solution. Needs `npm run build` first
 * (it unpacks the toolchain from dist/clang the first time).
 *
 * Usage: node --experimental-strip-types tools/verify-wasm.mjs [ID...]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tc = '/tmp/cf-forge-clang';
if (!existsSync(join(tc, 'bundle.js'))) {
  const ver = readdirSync(join(root, 'dist/clang')).find((d) => d !== 'manifest.json');
  const dir = join(root, 'dist/clang', ver);
  mkdirSync(tc, { recursive: true });
  execFileSync('cp', [join(dir, 'bundle.js'), tc]);
  const manifest = JSON.parse(readFileSync(join(root, 'dist/clang/manifest.json'), 'utf8'));
  for (const f of Object.keys(manifest.files)) execFileSync('sh', ['-c', `cat ${dir}/${f}.gz.* | gunzip > ${tc}/${f}`]);
}
const { BITS_STDCXX } = await import(join(root, 'src/compiler/headers.ts'));
const { runModule } = await import(join(root, 'src/compiler/runCore.ts'));
const { playInteractive } = await import(join(root, 'src/compiler/interactiveCore.ts'));
const { PROBLEMS } = await import(join(root, 'src/data/problems/index.ts'));
const { JUDGES } = await import(join(root, 'src/data/problems/judges/index.ts'));
const clang = await import(join(tc, 'bundle.js'));
const dec = new TextDecoder();

async function compile(code) {
  let err = '';
  const out = await clang.runClang(
    ['clang++', '-std=c++20', '-O2', '-fno-exceptions', '-Wall', '-Wno-unused-const-variable', '-I', 'inc', 'main.cpp', '-o', 'main.wasm'],
    { 'main.cpp': code, inc: { bits: { 'stdc++.h': BITS_STDCXX } } },
    { stdout: () => {}, stderr: (b) => b && (err += dec.decode(b, { stream: true })) },
  );
  return WebAssembly.compile(out['main.wasm']);
}

const only = process.argv.slice(2);
let bad = 0;
let runs = 0;
for (const p of PROBLEMS) {
  if (only.length && !only.includes(p.id)) continue;
  if (!p.interactive) {
    // Ordinary problems: compile every accepted solution in the browser toolchain and run samples + tests.
    if (!only.length) continue;
    console.log(`${p.id} ${p.name}`);
    // Problems that accept several answers ship a native checker: run it instead of comparing text.
    const checkFile = join(root, 'tools/stress', `${p.id}.check.cpp`);
    let checkBin = null;
    if (existsSync(checkFile)) {
      checkBin = `/tmp/cf-forge-wasm-check-${p.id}`;
      execFileSync('g++', ['-std=gnu++20', '-O2', '-o', checkBin, checkFile]);
    }
    const checkWith = (input, got, want) => {
      const d = `/tmp/cf-forge-wasm-io-${process.pid}`;
      mkdirSync(d, { recursive: true });
      writeFileSync(join(d, 'in.txt'), input);
      writeFileSync(join(d, 'out.txt'), got);
      writeFileSync(join(d, 'ans.txt'), want);
      try {
        execFileSync(checkBin, [join(d, 'in.txt'), join(d, 'out.txt'), join(d, 'ans.txt')], { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    };
    const sameTokens = (a, b) => {
      const x = a.trim().split(/\s+/), y = b.trim().split(/\s+/);
      if (x.length !== y.length) return false;
      return x.every((t, i) => t === y[i] || (!isNaN(+t) && !isNaN(+y[i]) && Math.abs(+t - +y[i]) <= 1e-6 * Math.max(1, Math.abs(+y[i]))));
    };
    for (const s of p.solutions.filter((x) => x.accepted)) {
      let mod;
      try {
        mod = await compile(s.code);
      } catch (e) {
        bad++;
        console.log(`  ✗ ${s.id} does not compile in the browser toolchain: ${String(e).slice(0, 200)}`);
        continue;
      }
      for (const c of [...p.samples, ...p.tests]) {
        runs++;
        const r = await runModule(mod, c.input + '\n', false);
        const got = r.status === 'ok' ? r.stdout : 'RUNTIME ' + r.status + ' ' + (r.error ?? '');
        if (checkBin ? !checkWith(c.input + '\n', got, c.output) : !sameTokens(got, c.output)) {
          bad++;
          console.log(`  ✗ ${s.id} on ${JSON.stringify(c.input).slice(0, 40)}: got ${got.trim().slice(0, 40)} expected ${c.output.slice(0, 40)}`);
        }
      }
    }
    continue;
  }
  console.log(`${p.id} ${p.name}`);
  const factory = JUDGES[p.id];
  const data = [...p.samples.map((s) => s.input), ...p.tests.map((t) => t.input)];
  for (const s of p.solutions.filter((x) => x.accepted)) {
    let mod;
    try {
      mod = await compile(s.code);
    } catch (e) {
      bad++;
      console.log(`  ✗ ${s.id} does not compile in the browser toolchain: ${String(e).slice(0, 200)}`);
      continue;
    }
    for (const d of data) {
      runs++;
      const o = await playInteractive((stdin) => runModule(mod, stdin, true), factory(d + '\n', {}), 20000);
      if (o.verdict !== 'passed') {
        bad++;
        console.log(`  ✗ ${s.id} on ${JSON.stringify(d).slice(0, 40)}: ${o.verdict} ${o.message}`);
      }
    }
  }
}
console.log(`\n${runs} browser-style runs, ${bad} failures`);
process.exit(bad ? 1 : 0);
