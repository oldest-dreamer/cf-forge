// Usage: node tools/verify-lessons.mjs [lessonId ...]
// Compiles every code block, runs it, and checks each exercise solution against its tests.
import { build } from 'esbuild';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const tmp = mkdtempSync(join(tmpdir(), 'vl-'));
const out = join(tmp, 'course.mjs');
await build({ entryPoints: ['src/data/course/index.ts'], bundle: true, format: 'esm', outfile: out, platform: 'node', logLevel: 'error' });
const { LESSONS } = await import(pathToFileURL(out).href);
const only = process.argv.slice(2);
let bad = 0, n = 0;
function compile(code, name) {
  const src = join(tmp, name + '.cpp'), bin = join(tmp, name);
  writeFileSync(src, code);
  const r = spawnSync('g++', ['-std=gnu++20', '-O2', '-Wall', '-o', bin, src], { encoding: 'utf8' });
  if (r.status !== 0) { console.log('COMPILE FAIL', name, '\n' + r.stderr.slice(0, 800)); bad++; return null; }
  return bin;
}
function run(bin, input) {
  const r = spawnSync(bin, [], { input, encoding: 'utf8', timeout: 5000 });
  return r;
}
for (const L of LESSONS) {
  if (only.length && !only.includes(L.id)) continue;
  let k = 0;
  for (const b of L.blocks) if (b.kind === 'code') {
    n++;
    const bin = compile(b.code, `${L.id}_b${k++}`);
    if (!bin) continue;
    const r = run(bin, b.input ?? '');
    if (r.status !== 0) { console.log('RUN FAIL', L.id, 'block', k - 1, 'status', r.status, r.stderr.slice(0, 300)); bad++; }
  }
  const ex = L.exercise;
  const starter = compile(ex.starter, `${L.id}_starter`);
  const sol = compile(ex.solution, `${L.id}_sol`);
  if (sol) ex.tests.forEach((t, i) => {
    n++;
    const r = run(sol, t.input);
    if (r.stdout.trim() !== t.output.trim()) { console.log('TEST FAIL', L.id, 'test', i, '\n expected:', JSON.stringify(t.output), '\n got:     ', JSON.stringify(r.stdout)); bad++; }
  });
  console.log('checked', L.id);
}
console.log(bad ? `FAILED ${bad}/${n}` : `ALL OK (${n} checks)`);
process.exit(bad ? 1 : 0);
