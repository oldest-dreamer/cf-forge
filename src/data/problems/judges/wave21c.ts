import { accept, bad, budget, intsOf, nums, reject, reply, type JudgeFactory } from './types.ts';

// 1534D Lost Tree: "? r" -> distances from r to every vertex; at most ceil(n/2) queries;
// then "!" and n-1 edge lines.
export const j1534D: JudgeFactory = (data, o) => {
  const [n, ...e] = nums(data);
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  const edges = new Set<string>();
  for (let i = 0; i < n - 1; i++) {
    const u = e[2 * i];
    const v = e[2 * i + 1];
    adj[u].push(v);
    adj[v].push(u);
    edges.add(u < v ? `${u} ${v}` : `${v} ${u}`);
  }
  const max = budget(Math.ceil(n / 2), o.lenient);
  let q = 0;
  let collecting = false;
  const got = new Set<string>();
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (collecting) {
        const v = intsOf(t);
        if (!v || v.length !== 2 || v.some((x) => x < 1 || x > n) || v[0] === v[1]) return reject(bad(line));
        const key = v[0] < v[1] ? `${v[0]} ${v[1]}` : `${v[1]} ${v[0]}`;
        if (!edges.has(key)) return reject(`the edge ${v[0]} ${v[1]} is not in the tree`);
        got.add(key);
        return got.size === n - 1 ? accept(`found the tree with ${q} queries`) : reply('');
      }
      if (t === '!') {
        collecting = true;
        return reply('');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 1 || v[0] < 1 || v[0] > n) return reject(bad(line));
      if (++q > max) return reject(`more than ${Math.ceil(n / 2)} queries`);
      const d = new Array(n + 1).fill(-1);
      d[v[0]] = 0;
      const queue = [v[0]];
      for (let h = 0; h < queue.length; h++) for (const w of adj[queue[h]]) if (d[w] < 0) { d[w] = d[queue[h]] + 1; queue.push(w); }
      return reply(d.slice(1).join(' '));
    },
    end: () => ({ ok: false, message: 'the program ended before listing all the edges' }),
  };
};

// 862D Mahmoud and Ehab and the binary string: "? t" -> Hamming distance; at most 15 queries; "! p0 p1".
export const j862D: JudgeFactory = (data, o) => {
  const s = data.trim().split(/\s+/)[0];
  const n = s.length;
  const max = budget(15, o.lenient);
  let q = 0;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        if (!v || v.length !== 2 || v.some((x) => x < 1 || x > n)) return reject(bad(line));
        return s[v[0] - 1] === '0' && s[v[1] - 1] === '1' ? accept(`found a 0 and a 1 with ${q} queries`) : reject('the first position must hold a 0 and the second a 1');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const w = t.slice(1).trim();
      if (!/^[01]+$/.test(w) || w.length !== n) return reject(bad(line));
      if (++q > max) return reject('more than 15 queries');
      let d = 0;
      for (let i = 0; i < n; i++) if (w[i] !== s[i]) d++;
      return reply(String(d));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the positions' }),
  };
};

// 1088D Ehab and another another xor problem: "? c d" -> sign of (a xor c) - (b xor d); at most 62 queries; "! a b".
export const j1088D: JudgeFactory = (data, o) => {
  const [a, b] = nums(data);
  const max = budget(62, o.lenient);
  let q = 0;
  return {
    first: '',
    onLine(line) {
      const t = line.trim();
      const v = intsOf(t.slice(1));
      if (t.startsWith('!')) return v && v.length === 2 && v[0] === a && v[1] === b ? accept(`found a and b with ${q} queries`) : reject('a and b are wrong');
      if (!t.startsWith('?') || !v || v.length !== 2 || v.some((x) => x < 0 || x >= 2 ** 30)) return reject(bad(line));
      if (++q > max) return reject('more than 62 queries');
      const x = (a ^ v[0]) >>> 0;
      const y = (b ^ v[1]) >>> 0;
      return reply(x > y ? '1' : x < y ? '-1' : '0');
    },
    end: () => ({ ok: false, message: 'the program ended without printing a and b' }),
  };
};

// 1103B Game with modulo: "? x y" -> "x" if x mod a >= y mod a else "y"; at most 60 queries; "! a".
export const j1103B: JudgeFactory = (data, o) => {
  const a = nums(data)[0];
  const max = budget(60, o.lenient);
  let q = 0;
  return {
    first: 'start',
    onLine(line) {
      const t = line.trim();
      const v = intsOf(t.slice(1));
      if (t.startsWith('!')) return v && v.length === 1 && v[0] === a ? accept(`found a with ${q} queries`) : reject('a is wrong');
      if (!t.startsWith('?') || !v || v.length !== 2 || v.some((x) => x < 0 || x > 1e9)) return reject(bad(line));
      if (++q > max) return reject('more than 60 queries');
      return reply(v[0] % a >= v[1] % a ? 'x' : 'y');
    },
    end: () => ({ ok: false, message: 'the program ended without printing a' }),
  };
};

// 843B Interactive LowerBound: "? i" -> "value next" of the i-th list cell; at most 2000 queries; "! v" (or "! -1").
export const j843B: JudgeFactory = (data, o) => {
  const [n, start, x, ...rest] = nums(data);
  const val: number[] = [0];
  const nxt: number[] = [0];
  for (let i = 0; i < n; i++) {
    val.push(rest[2 * i]);
    nxt.push(rest[2 * i + 1]);
  }
  let want = -1;
  for (let c = start; c !== -1; c = nxt[c]) {
    if (val[c] >= x) {
      want = val[c];
      break;
    }
  }
  const max = budget(2000, o.lenient);
  let q = 0;
  return {
    first: `${n} ${start} ${x}`,
    onLine(line) {
      const t = line.trim();
      const v = intsOf(t.slice(1));
      if (t.startsWith('!')) return v && v.length === 1 && v[0] === want ? accept(`found ${want} with ${q} queries`) : reject(`the answer is ${want}`);
      if (!t.startsWith('?') || !v || v.length !== 1 || v[0] < 1 || v[0] > n) return reject(bad(line));
      if (++q > max) return reject('more than 2000 queries');
      return reply(`${val[v[0]]} ${nxt[v[0]]}`);
    },
    end: () => ({ ok: false, message: 'the program ended without printing the answer' }),
  };
};
