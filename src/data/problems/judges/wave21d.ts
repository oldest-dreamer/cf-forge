import { accept, bad, budget, intsOf, nums, reject, reply, type JudgeFactory } from './types.ts';

// 1155E Guess the Root: "? x" -> f(x) mod p for a hidden polynomial of degree <= 10; at most 50 queries;
// "! x" with f(x) = 0, or "! -1" when there is no root.
const P = 1000003;
export const j1155E: JudgeFactory = (data, o) => {
  const a = nums(data);
  const f = (x: number) => {
    let r = 0;
    for (let i = a.length - 1; i >= 0; i--) r = (r * x + a[i]) % P;
    return r;
  };
  const max = budget(50, o.lenient);
  let q = 0;
  return {
    first: '',
    onLine(line) {
      const t = line.trim();
      const v = intsOf(t.slice(1));
      if (t.startsWith('!')) {
        if (!v || v.length !== 1) return reject(bad(line));
        if (v[0] === -1) {
          for (let x = 0; x < P; x++) if (f(x) === 0) return reject(`x = ${x} is a root, so -1 is wrong`);
          return accept(`correctly found that there is no root (${q} queries)`);
        }
        if (v[0] < 0 || v[0] >= P) return reject(bad(line));
        return f(v[0]) === 0 ? accept(`f(${v[0]}) is 0 mod p (${q} queries)`) : reject(`f(${v[0]}) is not 0 mod p`);
      }
      if (!t.startsWith('?') || !v || v.length !== 1 || v[0] < 0 || v[0] >= P) return reject(bad(line));
      if (++q > max) return reject('more than 50 queries');
      return reply(String(f(v[0])));
    },
    end: () => ({ ok: false, message: 'the program ended without printing an answer' }),
  };
};

// 1153E Serval and Snake: "? x1 y1 x2 y2" -> how many times the snake's path steps across the border of the
// rectangle; at most 2019 queries; "! hx hy tx ty" with the head and the tail in either order.
export const j1153E: JudgeFactory = (data, o) => {
  const [n, ...rest] = nums(data);
  const cells: number[][] = [];
  for (let i = 0; i + 1 < rest.length; i += 2) cells.push([rest[i], rest[i + 1]]);
  const W = n + 2;
  const right = new Uint8Array(W * W); // edge (x,y)-(x,y+1)
  const down = new Uint8Array(W * W); // edge (x,y)-(x+1,y)
  for (let i = 0; i + 1 < cells.length; i++) {
    const [x, y] = cells[i];
    const [u, v] = cells[i + 1];
    if (x === u) right[x * W + Math.min(y, v)] = 1;
    else down[Math.min(x, u) * W + y] = 1;
  }
  const head = cells[0];
  const tail = cells[cells.length - 1];
  const max = budget(2019, o.lenient);
  let q = 0;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      const v = intsOf(t.slice(1));
      if (t.startsWith('!')) {
        if (!v || v.length !== 4) return reject(bad(line));
        const ok = (v[0] === head[0] && v[1] === head[1] && v[2] === tail[0] && v[3] === tail[1]) || (v[0] === tail[0] && v[1] === tail[1] && v[2] === head[0] && v[3] === head[1]);
        return ok ? accept(`found both ends with ${q} queries`) : reject('those are not the head and the tail');
      }
      if (!t.startsWith('?') || !v || v.length !== 4) return reject(bad(line));
      const [x1, y1, x2, y2] = v;
      if (x1 < 1 || y1 < 1 || x2 > n || y2 > n || x1 > x2 || y1 > y2) return reject(bad(line));
      if (++q > max) return reject('more than 2019 queries');
      let c = 0;
      for (let y = y1; y <= y2; y++) c += down[(x1 - 1) * W + y] + down[x2 * W + y];
      for (let x = x1; x <= x2; x++) c += right[x * W + y1 - 1] + right[x * W + y2];
      return reply(String(c));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the ends' }),
  };
};

// 1363D Guess The Maximums: the judge first sends 1, "n k" and the k subsets; "? c i1..ic" -> the maximum over those
// positions; at most 12 queries; "! m1 .. mk" where m_i is the maximum outside subset i.
export const j1363D: JudgeFactory = (data, o) => {
  const t = nums(data);
  const [n, k] = t;
  let pos = 2;
  const subsets: number[][] = [];
  const lines: string[] = [];
  for (let i = 0; i < k; i++) {
    const c = t[pos++];
    subsets.push(t.slice(pos, pos + c));
    lines.push(`${c} ${t.slice(pos, pos + c).join(' ')}`);
    pos += c;
  }
  const a = [0, ...t.slice(pos, pos + n)];
  const want = subsets.map((s) => {
    const inS = new Set(s);
    let m = 0;
    for (let i = 1; i <= n; i++) if (!inS.has(i) && a[i] > m) m = a[i];
    return m;
  });
  const max = budget(12, o.lenient);
  let q = 0;
  return {
    first: `1\n${n} ${k}\n${lines.join('\n')}`,
    onLine(line) {
      const s = line.trim();
      const v = intsOf(s.slice(1));
      if (s.startsWith('!')) {
        if (!v || v.length !== k) return reject(bad(line));
        return v.every((x, i) => x === want[i]) ? accept(`correct after ${q} queries`) : reject('some of the maximums are wrong');
      }
      if (!s.startsWith('?') || !v || v.length < 2 || v[0] !== v.length - 1) return reject(bad(line));
      const idx = v.slice(1);
      if (new Set(idx).size !== idx.length || idx.some((x) => x < 1 || x > n)) return reject(bad(line));
      if (++q > max) return reject('more than 12 queries');
      return reply(String(Math.max(...idx.map((x) => a[x]))));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the maximums' }),
  };
};
