// node tools/genwave.mjs <spec.mjs> <out.ts> : turns a compact spec module into a wave file.
// Code is read from the files named in each solution's `code` field (relative to the spec).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [specPath, outPath] = process.argv.slice(2);
const { specs, header } = await import(pathToFileURL(resolve(specPath)).href);
const base = dirname(resolve(specPath));
const codes = [];
for (const s of specs) {
  for (const sol of s.sols) {
    const c = readFileSync(resolve(base, sol.code), 'utf8');
    if (c.includes('`') || c.includes('${')) throw new Error(`${sol.code}: backtick or \${ in code`);
    codes.push(c);
    sol.code = `@@CODE${codes.length - 1}@@`;
  }
}
let out = `import { mk } from './mk';\n${header ?? ''}\n`;
const names = [];
for (const s of specs) {
  let js = JSON.stringify(s, null, 2);
  js = js.replace(/"@@CODE(\d+)@@"/g, (_, i) => 'raw`' + codes[+i] + '`');
  out += `\nexport const p${s.id} = mk(${js});\n`;
  names.push('p' + s.id);
}
out += `\nexport const WAVE = [${names.join(', ')}];\n`;
out = out.replace("import { mk } from './mk';", "import { mk } from './mk.ts';\n\nconst raw = String.raw;");
writeFileSync(outPath, out);
console.log('wrote', outPath, names.join(' '));
