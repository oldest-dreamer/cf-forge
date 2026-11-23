/**
 * Packs the in-browser C++ compiler (@yowasp/clang) into dist/clang/<version>/.
 *
 * Cloudflare Pages serves files up to 25 MiB, and the compiler's main file is ~74 MB,
 * so every resource is gzip-compressed and split into ≤ 20 MiB parts. The compiler
 * worker downloads the parts, joins them and decompresses them in the browser.
 * Nothing large is committed to git; this runs after `vite build`.
 */
import { createReadStream, createWriteStream, mkdirSync, readFileSync, writeFileSync, copyFileSync, statSync, readdirSync } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkgDir = join(root, 'node_modules/@yowasp/clang');
const gen = join(pkgDir, 'gen');
const { version } = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
const out = join(root, 'dist/clang', version);
const PART = 20 * 1024 * 1024;

mkdirSync(out, { recursive: true });
copyFileSync(join(gen, 'bundle.js'), join(out, 'bundle.js'));

const resources = readdirSync(gen).filter((f) => f.endsWith('.wasm') || f.endsWith('.tar'));
const manifest = { version, files: {} };

for (const name of resources) {
  const gzPath = join(out, `${name}.gz`);
  await pipeline(createReadStream(join(gen, name)), createGzip({ level: 9 }), createWriteStream(gzPath));
  const gz = readFileSync(gzPath);
  const parts = Math.max(1, Math.ceil(gz.length / PART));
  for (let i = 0; i < parts; i++) {
    writeFileSync(join(out, `${name}.gz.${i}`), gz.subarray(i * PART, (i + 1) * PART));
  }
  // remove the unsplit file so no asset exceeds the size limit
  writeFileSync(gzPath, '');
  const { rmSync } = await import('node:fs');
  rmSync(gzPath);
  manifest.files[name] = { parts, size: statSync(join(gen, name)).size, gzSize: gz.length };
  console.log(`clang: ${name} → ${parts} part(s), ${(gz.length / 1048576).toFixed(1)} MB compressed`);
}

writeFileSync(join(root, 'dist/clang/manifest.json'), JSON.stringify(manifest));
console.log(`clang ${version} ready in dist/clang/${version}`);
