// Compiles every toolkit snippet: first inside main(), else at global scope.
import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const tmp = mkdtempSync(join(tmpdir(), 'vt-'));
await build({ entryPoints: ['src/data/course/toolkit.ts'], bundle: true, format: 'esm', outfile: join(tmp, 't.mjs'), platform: 'node', logLevel: 'error' });
const { TOOLKIT } = await import(pathToFileURL(join(tmp, 't.mjs')).href);
const common = 'int n=5,m=5,i=1,j=1,k=2,b=2,c=3,mx=0,sum2=0; long long x=3,s=0,sum=0; int cnt[300]; int dp[300]; set<int> st; string str="ab"; vector<string> g(5), words; vector<int> w; const int N=200005;\n';
const preVec = '#include <bits/stdc++.h>\nusing namespace std;\n' + common + 'vector<int> a(10), v(10);\n';
const preArr = '#include <bits/stdc++.h>\nusing namespace std;\n' + common + 'int a[300000]; vector<int> v(10);\n';
const only = process.argv.slice(2);
let bad = 0;
for (const e of TOOLKIT) {
  if (only.length && !only.includes(e.id)) continue;
  const tries = [preVec + 'int main(){\n' + e.code + '\nreturn 0;}\n', preArr + 'int main(){\n' + e.code + '\nreturn 0;}\n', '#include <bits/stdc++.h>\nusing namespace std;\nint n=5,m=5;\n' + e.code + '\nint main(){return 0;}\n'];
  let ok = false, err = '';
  for (const [t, src] of tries.entries()) {
    writeFileSync(join(tmp, 'x.cpp'), src);
    const r = spawnSync('g++', ['-std=gnu++20', '-fsyntax-only', join(tmp, 'x.cpp')], { encoding: 'utf8' });
    if (r.status === 0) { ok = true; break; } err = r.stderr.split('\n').filter(l => l.includes('error')).slice(0, 3).join('\n');
  }
  if (!ok) { bad++; console.log('FAIL', e.id, '\n' + err); }
}
console.log(bad ? `FAILED ${bad}` : `toolkit OK (${TOOLKIT.length} entries)`);
