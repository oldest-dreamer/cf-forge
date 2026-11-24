import { accept, budget, bad, intsOf, nums, reject, reply, type JudgeFactory } from './types.ts';

// 679A Bear and Prime 100: secret n in [2,100]; "x" -> yes/no (divisible?); answer prime/composite.
export const j679A: JudgeFactory = (data, o) => {
  const n = nums(data)[0];
  const max = budget(20, o.lenient);
  let q = 0;
  const prime = n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((d) => n % d !== 0);
  return {
    first: '',
    onLine(line) {
      const t = line.trim();
      if (t === 'prime' || t === 'composite') return t === (prime ? 'prime' : 'composite') ? accept(`${n} is ${t}`) : reject(`wrong: ${n} is ${prime ? 'prime' : 'composite'}`);
      const v = intsOf(t);
      if (!v || v.length !== 1 || v[0] < 2 || v[0] > 100) return reject(bad(line));
      if (++q > max) return reject('more than 20 queries');
      return reply(n % v[0] === 0 ? 'yes' : 'no');
    },
    end: () => ({ ok: false, message: 'the program ended without printing prime or composite' }),
  };
};

// 727C Guess the Array: "? i j" -> a_i + a_j, at most n queries, answer "! a_1 ... a_n".
export const j727C: JudgeFactory = (data, o) => {
  const [n, ...a] = nums(data);
  const max = budget(n, o.lenient);
  let q = 0;
  return {
    first: String(n),
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        return v && v.length === n && v.every((x, i) => x === a[i]) ? accept(`found the array after ${q} queries`) : reject('the array is wrong');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 2 || v[0] === v[1] || v.some((x) => x < 1 || x > n)) return reject(bad(line));
      if (++q > max) return reject(`more than ${n} queries`);
      return reply(String(a[v[0] - 1] + a[v[1] - 1]));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the array' }),
  };
};

// 1167B Lost Numbers: a is a permutation of 4 8 15 16 23 42; "? i j" -> a_i*a_j; at most 4 queries.
export const j1167B: JudgeFactory = (data, o) => {
  const a = nums(data);
  const max = budget(4, o.lenient);
  let q = 0;
  return {
    first: '',
    onLine(line) {
      const t = line.trim();
      if (t.startsWith('!')) {
        const v = intsOf(t.slice(1));
        return v && v.length === 6 && v.every((x, i) => x === a[i]) ? accept(`found it with ${q} queries`) : reject('the six numbers are wrong');
      }
      if (!t.startsWith('?')) return reject(bad(line));
      const v = intsOf(t.slice(1));
      if (!v || v.length !== 2 || v.some((x) => x < 1 || x > 6)) return reject(bad(line));
      if (++q > max) return reject('more than 4 queries');
      return reply(String(a[v[0] - 1] * a[v[1] - 1]));
    },
    end: () => ({ ok: false, message: 'the program ended without printing the numbers' }),
  };
};

// 1486C1 / C2 Guessing the Greatest: "? l r" (l<r) -> position of the second largest in a[l..r]; answer "! p".
function greatest(limit: number): JudgeFactory {
  return (data, o) => {
    const [n, ...a] = nums(data);
    const max = budget(limit, o.lenient);
    let q = 0;
    let top = 0;
    for (let i = 1; i < n; i++) if (a[i] > a[top]) top = i;
    return {
      first: String(n),
      onLine(line) {
        const t = line.trim();
        if (t.startsWith('!')) {
          const v = intsOf(t.slice(1));
          return v && v.length === 1 && v[0] === top + 1 ? accept(`found the maximum with ${q} queries`) : reject('that is not the position of the maximum');
        }
        if (!t.startsWith('?')) return reject(bad(line));
        const v = intsOf(t.slice(1));
        if (!v || v.length !== 2 || v[0] < 1 || v[1] > n || v[0] >= v[1]) return reject(bad(line));
        if (++q > max) return reject(`more than ${limit} queries`);
        let best = -1;
        let second = -1;
        for (let i = v[0] - 1; i < v[1]; i++) {
          if (best < 0 || a[i] > a[best]) {
            second = best;
            best = i;
          } else if (second < 0 || a[i] > a[second]) second = i;
        }
        return reply(String(second + 1));
      },
      end: () => ({ ok: false, message: 'the program ended without printing the position' }),
    };
  };
}
export const j1486C1 = greatest(40);
export const j1486C2 = greatest(20);
