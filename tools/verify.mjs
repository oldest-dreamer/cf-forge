/**
 * Verifies every problem in src/data/problems:
 *  1. every solution compiles with g++ -std=gnu++20 -O2
 *  2. every solution passes every sample and test case
 *  3. stress test: tools/stress/<ID>.gen.cpp makes random inputs (seed = argv[1]);
 *     all solutions must agree with the reference (tools/stress/<ID>.brute.cpp,
 *     or the problem's own "brute" solution) on every input.
 *
 * Usage: node --experimental-strip-types tools/verify.mjs [ROUNDS] [ID...]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = '/tmp/cf-forge-verify';
mkdirSync(tmp, { recursive: true });
const [roundsArg, ...only] = process.argv.slice(2);
const ROUNDS = Number(roundsArg) || 300;

const { PROBLEMS } = await import(join(root, 'src/data/problems/index.ts'));
const norm = (s) => s.trim().split(/\s+/).filter(Boolean).join(' ');
let failures = 0;
let checks = 0;

function build(name, code) {
  const src = join(tmp, `${name}.cpp`);
  const bin = join(tmp, name);
  writeFileSync(src, code);
  execFileSync('g++', ['-std=gnu++20', '-O2', '-fno-exceptions', '-o', bin, src], { stdio: 'pipe' });
  return bin;
}
const run = (bin, input, args = []) => execFileSync(bin, args, { input, timeout: 5000, maxBuffer: 64 << 20 }).toString();
function fail(msg) {
  failures++;
  console.log('  ✗ ' + msg);
}

for (const p of PROBLEMS) {
  if (only.length && !only.includes(p.id)) continue;
  console.log(`${p.id} ${p.name}`);
  const bins = {};
  for (const s of p.solutions) {
    try {
      bins[s.id] = build(`${p.id}_${s.id}`, s.code);
    } catch (e) {
      fail(`${s.id} does not compile:\n${e.stderr}`);
    }
  }
  // Problems that accept several correct outputs ship a checker: tools/stress/<ID>.check.cpp,
  // run as "check input output answer"; exit code 0 means accepted.
  const checkFile = join(root, 'tools/stress', `${p.id}.check.cpp`);
  const checkBin = existsSync(checkFile) ? build(`${p.id}_check`, readText(checkFile)) : null;
  const same = (input, got, want) => {
    if (!checkBin) return norm(got) === norm(want);
    writeFileSync(join(tmp, 'in.txt'), input);
    writeFileSync(join(tmp, 'out.txt'), got);
    writeFileSync(join(tmp, 'ans.txt'), want);
    try {
      execFileSync(checkBin, [join(tmp, 'in.txt'), join(tmp, 'out.txt'), join(tmp, 'ans.txt')], { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  };
  const cases = [...p.samples.map((x) => ({ input: x.input, output: x.output })), ...p.tests];
  const slow = new Set(p.solutions.filter((s) => !s.accepted).map((s) => s.id));
  for (const [id, bin] of Object.entries(bins)) {
    // Too-slow reference solutions are only checked on small stress inputs.
    for (const c of slow.has(id) ? [] : cases) {
      checks++;
      const got = run(bin, c.input + '\n');
      if (slow.has(id) && !got.trim()) continue; // a slow reference may skip inputs too big for it
      if (!same(c.input + '\n', got, c.output)) fail(`${id} on ${JSON.stringify(c.input).slice(0, 60)}: got ${norm(got).slice(0, 60)}, expected ${norm(c.output).slice(0, 60)}`);
    }
  }

  const gen = join(root, 'tools/stress', `${p.id}.gen.cpp`);
  if (!existsSync(gen)) {
    console.log('  (no stress generator)');
    continue;
  }
  const genBin = build(`${p.id}_gen`, readText(gen));
  const bruteFile = join(root, 'tools/stress', `${p.id}.brute.cpp`);
  const refBin = existsSync(bruteFile) ? build(`${p.id}_ref`, readText(bruteFile)) : bins.brute;
  if (!refBin) {
    fail('no reference for stress test');
    continue;
  }
  let bad = 0;
  for (let seed = 1; seed <= ROUNDS && bad < 3; seed++) {
    const input = run(genBin, '', [String(seed)]);
    const want = run(refBin, input);
    for (const [id, bin] of Object.entries(bins)) {
      checks++;
      const got = run(bin, input);
      if (!same(input, got, want)) {
        bad++;
        fail(`stress seed ${seed}: ${id} says ${norm(got).slice(0, 50)}, reference says ${norm(want).slice(0, 50)}\n    input: ${JSON.stringify(input).slice(0, 120)}`);
      }
    }
  }
  console.log(`  stress: ${ROUNDS} random inputs × ${Object.keys(bins).length} solutions`);
}

function readText(f) {
  return readFileSync(f, 'utf8');
}

console.log(`\n${checks} checks, ${failures} failures`);
process.exit(failures ? 1 : 0);
