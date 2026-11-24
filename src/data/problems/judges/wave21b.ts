import { accept, bad, budget, intsOf, nums, reject, reply, type JudgeFactory } from './types.ts';

// 1407C Chocolate Bunny: "? i j" -> p_i mod p_j, at most 2n queries, answer "! p_1 ... p_n".
export const j1407C: JudgeFactory = (data, o) => {
  const [n, ...p] = nums(data);
  const max = budget(2 * n, o.lenient);
  let q = 0;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        return v && v.length === n && v.every((x, i) => x === p[i]) ? accept(`found the permutation with ${q} queries`) : reject('the permutation is wrong');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 2 || v[0] === v[1] || v.some((x) => x < 1 || x > n)) return reject(bad(line));
      if (++q > max) return reject(`more than ${2 * n} queries`);
      return reply(String(p[v[0] - 1] % p[v[1] - 1]));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the permutation' }),
  };
};

// 1797C Li Hua and Chess: hidden king (x, y) in an n x m board; "? a b" -> king distance to (a, b); at most 3 queries.
export const j1797C: JudgeFactory = (data, o) => {
  const [n, m, x, y] = nums(data);
  const max = budget(3, o.lenient);
  let q = 0;
  return {
    first: `${n} ${m}`,
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        return v && v.length === 2 && v[0] === x && v[1] === y ? accept(`found the king with ${q} queries`) : reject('that is not where the king is');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 2 || v[0] < 1 || v[0] > n || v[1] < 1 || v[1] > m) return reject(bad(line));
      if (++q > max) return reject('more than 3 queries');
      return reply(String(Math.max(Math.abs(v[0] - x), Math.abs(v[1] - y))));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the position' }),
  };
};

// 1698D Fixed Point Guessing: "? l r" -> #{ i in [l,r] : a_i in [l,r] }; at most 15 queries; answer "! x" with a_x = x.
export const j1698D: JudgeFactory = (data, o) => {
  const [n, ...a] = nums(data);
  const max = budget(15, o.lenient);
  let q = 0;
  const fixed = a.findIndex((v, i) => v === i + 1) + 1;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        return v && v.length === 1 && v[0] === fixed ? accept(`found the fixed point with ${q} queries`) : reject('that is not the fixed point');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 2 || v[0] < 1 || v[1] > n || v[0] > v[1]) return reject(bad(line));
      if (++q > max) return reject('more than 15 queries');
      let c = 0;
      for (let i = v[0]; i <= v[1]; i++) if (a[i - 1] >= v[0] && a[i - 1] <= v[1]) c++;
      return reply(String(c));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the position' }),
  };
};

// 1697D Guess The String: "? 1 i" -> s_i (at most 26 times); "? 2 l r" -> #distinct letters in s[l..r] (at most 6000 times).
export const j1697D: JudgeFactory = (data, o) => {
  const [first, s] = data.trim().split(/\s+/);
  const n = Number(first);
  let q1 = 0;
  let q2 = 0;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) return t.slice(1).trim() === s ? accept(`found the string with ${q1} + ${q2} queries`) : reject('the string is wrong');
      const parts = t.split(/\s+/);
      if (parts[0] !== '?') return reject(bad(line));
      const v = intsOf(parts.slice(1).join(' '));
      if (!v) return reject(bad(line));
      if (v[0] === 1 && v.length === 2 && v[1] >= 1 && v[1] <= n) {
        if (++q1 > budget(26, o.lenient)) return reject('more than 26 queries of the first kind');
        return reply(s[v[1] - 1]);
      }
      if (v[0] === 2 && v.length === 3 && v[1] >= 1 && v[1] <= v[2] && v[2] <= n) {
        if (++q2 > budget(6000, o.lenient)) return reject('more than 6000 queries of the second kind');
        return reply(String(new Set(s.slice(v[1] - 1, v[2])).size));
      }
      return reject(bad(line));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the string' }),
  };
};

// 1556D Take a Guess: "or i j" / "and i j" -> bitwise OR / AND; at most 2n queries; "finish x" with x the k-th smallest.
export const j1556D: JudgeFactory = (data, o) => {
  const [n, k, ...a] = nums(data);
  const max = budget(2 * n, o.lenient);
  let q = 0;
  const kth = [...a].sort((x, y) => x - y)[k - 1];
  return {
    first: `${n} ${k}`,
    onLine(line) {
      const t = line.trim();
      const parts = t.split(/\s+/);
      if (parts[0] === 'finish') {
        const v = intsOf(parts.slice(1).join(' '));
        return v && v.length === 1 && v[0] === kth ? accept(`found the ${k}-th smallest with ${q} queries`) : reject(`wrong: the ${k}-th smallest is ${kth}`);
      }
      if (parts[0] !== 'or' && parts[0] !== 'and') return reject(bad(line));
      const v = intsOf(parts.slice(1).join(' '));
      if (!v || v.length !== 2 || v[0] === v[1] || v.some((x) => x < 1 || x > n)) return reject(bad(line));
      if (++q > max) return reject(`more than ${2 * n} queries`);
      const x = a[v[0] - 1];
      const y = a[v[1] - 1];
      return reply(String(parts[0] === 'or' ? (x | y) >>> 0 : (x & y) >>> 0));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the answer' }),
  };
};
