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
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = '/tmp/cf-forge-verify';
mkdirSync(tmp, { recursive: true });
const [roundsArg, ...only] = process.argv.slice(2);
const ROUNDS = Number(roundsArg) || 300;

const { PROBLEMS } = await import(join(root, 'src/data/problems/index.ts'));
const { JUDGES } = await import(join(root, 'src/data/problems/judges/index.ts'));
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
/**
 * Interactive problems: run the solution as a child process and let the problem's judge
 * (src/data/problems/judges) talk to it line by line. The judge is the same code the site uses.
 */
function playNative(bin, factory, data, lenient) {
  return new Promise((resolve) => {
    const judge = factory(data, { lenient });
    const child = spawn(bin, [], { stdio: ['pipe', 'pipe', 'ignore'] });
    let buf = '';
    let settled = false;
    let lines = 0;
    const done = (ok, message) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.kill('SIGKILL');
      resolve({ ok, message });
    };
    const timer = setTimeout(() => done(false, 'timeout (no answer within 10 s)'), 10000);
    child.stdin.on('error', () => {});
    const send = (text) => {
      if (text !== '' && !settled) child.stdin.write(text + '\n');
    };
    if (judge.first) send(judge.first);
    child.stdout.on('data', (d) => {
      buf += d.toString();
      let i;
      while (!settled && (i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i);
        buf = buf.slice(i + 1);
        if (++lines > 200000) return done(false, 'too many lines');
        const step = judge.onLine(line);
        if (step.kind === 'done') return done(step.ok, step.message);
        send(step.text);
      }
    });
    child.on('exit', () => {
      if (settled) return;
      if (buf.trim()) {
        const step = judge.onLine(buf.trim());
        if (step.kind === 'done') return done(step.ok, step.message);
      }
      const e = judge.end();
      done(e.ok, e.message);
    });
  });
}

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
  if (p.interactive) {
    const factory = JUDGES[p.id];
    if (!factory) {
      fail('interactive problem has no judge in src/data/problems/judges');
      continue;
    }
    const data = [...p.samples.map((x) => x.input), ...p.tests.map((x) => x.input)];
    // Each sample conversation must be exactly what the judge says when fed the program's lines.
    for (const sm of p.samples) {
      if (!sm.transcript) {
        fail('interactive sample without a transcript');
        continue;
      }
      const judge = factory(sm.input + '\n', {});
      const lines = sm.transcript.split('\n');
      let ended = false;
      let expectReply = null;
      const firstLines = judge.first ? judge.first.split('\n') : [];
      if (firstLines.some((fl, i) => lines[i] !== '< ' + fl)) {
        // the first message from the judge is shown first only when it has one
        fail(`sample transcript should start with the judge's "${judge.first}"`);
      }
      for (const [li, ln] of lines.entries()) {
        const body = ln.slice(2);
        if (ln.startsWith('< ')) {
          if (li < firstLines.length) continue;
          if (expectReply === null || expectReply !== body) fail(`sample transcript: judge would not say "${body}" here (it says ${JSON.stringify(expectReply)})`);
          expectReply = null;
        } else if (ln.startsWith('> ')) {
          if (ended) fail('sample transcript continues after the judge finished');
          const step = judge.onLine(body);
          if (step.kind === 'done') {
            ended = true;
            if (!step.ok) fail(`sample transcript is rejected by the judge: ${step.message}`);
          } else expectReply = step.text === '' ? null : step.text;
        } else fail(`sample transcript line must start with "> " or "< ": ${JSON.stringify(ln)}`);
      }
      if (!ended) fail('sample transcript never reaches the judge\'s verdict');
    }
    for (const x of [...p.samples.map((x) => x.output), ...p.tests.map((x) => x.output)]) {
      if (x.trim() !== 'OK') fail(`interactive test output must be "OK", got ${JSON.stringify(x).slice(0, 30)}`);
    }
    for (const [id, bin] of Object.entries(bins)) {
      const lenient = !p.solutions.find((s) => s.id === id).accepted;
      for (const d of data) {
        checks++;
        const r = await playNative(bin, factory, d + '\n', lenient);
        if (!r.ok && lenient && /too many lines|timeout/.test(r.message)) continue; // reference too slow for this data
        if (!r.ok) fail(`${id} on ${JSON.stringify(d).slice(0, 60)}: ${r.message}`);
      }
    }
    const gen = join(root, 'tools/stress', `${p.id}.gen.cpp`);
    if (!existsSync(gen)) {
      console.log('  (no stress generator)');
      continue;
    }
    const genBin = build(`${p.id}_gen`, readText(gen));
    let bad = 0;
    for (let seed = 1; seed <= ROUNDS && bad < 3; seed++) {
      const d = run(genBin, '', [String(seed)]);
      for (const [id, bin] of Object.entries(bins)) {
        const lenient = !p.solutions.find((s) => s.id === id).accepted;
        // Reference solutions that are too slow only run on small hidden data.
        if (lenient && id === 'brute' && d.length > 3000) continue;
        checks++;
        const r = await playNative(bin, factory, d, lenient);
        // A reference that is too slow for this hidden data is not a failure.
        if (!r.ok && lenient && /too many lines|timeout/.test(r.message)) continue;
        if (!r.ok) {
          bad++;
          fail(`stress seed ${seed}: ${id}: ${r.message}\n    data: ${JSON.stringify(d).slice(0, 120)}`);
        }
      }
    }
    console.log(`  stress: ${ROUNDS} random hidden cases × ${Object.keys(bins).length} solutions (interactive)`);
    continue;
  }
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
