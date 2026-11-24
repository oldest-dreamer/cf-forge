import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

/* Shared: polynomial hashing modulo the Mersenne prime 2^61 − 1 with a random base. */
const hash61 = raw`typedef unsigned long long ull;
const ull MOD = (1ULL << 61) - 1;
ull mul(ull a, ull b) {
    __uint128_t c = (__uint128_t)a * b;
    ull r = (ull)(c & MOD) + (ull)(c >> 61);
    return r >= MOD ? r - MOD : r;
}
ull add(ull a, ull b) { a += b; return a >= MOD ? a - MOD : a; }
ull sub(ull a, ull b) { return a >= b ? a - b : a + MOD - b; }`;

// ───────────────────────────────────────────── 1800D
export const p1800D: ProblemEntry = {
  id: '1800D',
  contestId: 1800,
  index: 'D',
  name: 'Remove Two Letters',
  rating: 1200,
  tags: ['data-structures', 'greedy', 'hashing', 'strings'],
  featuredFor: ['hashing'],
  why: L(
    'The cleanest first hashing problem: hash n − 1 strings in O(1) each by gluing a prefix hash to a suffix hash. Then a one-line observation makes hashing unnecessary, which is the best lesson of all.',
    'হ্যাশিংয়ের সবচেয়ে পরিষ্কার প্রথম প্রবলেম: একটি প্রিফিক্স হ্যাশের সঙ্গে সাফিক্স হ্যাশ জুড়ে n − ১টি স্ট্রিং প্রতিটি O(১)-এ হ্যাশ করা। তারপর এক লাইনের একটি পর্যবেক্ষণ হ্যাশিংকেই অপ্রয়োজনীয় করে দেয়, যা সবচেয়ে বড় শিক্ষা।',
  ),
  statement: L(
    'You are given a string s of n lowercase letters. You must delete exactly two consecutive characters. How many different strings can you get?',
    'n-টি ছোট হাতের অক্ষরের একটি স্ট্রিং s দেওয়া আছে। ঠিক দুটি পরপর অক্ষর মুছতে হবে। কতগুলো ভিন্ন স্ট্রিং পাওয়া সম্ভব?',
  ),
  input: L('t test cases; each has n and then s.', 't-টি টেস্ট কেস; প্রতিটিতে n, তারপর s।'),
  output: L('For each test, the number of distinct strings.', 'প্রতিটি টেস্টে ভিন্ন স্ট্রিংয়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 2·10⁵, sum of n ≤ 2·10⁵', '৩ ≤ n ≤ ২·১০⁵, n-এর যোগফল ≤ ২·১০⁵')] },
  samples: [
    {
      input: '7\n6\naaabcc\n10\naaaaaaaaaa\n6\nabcdef\n7\nabacaba\n6\ncccfff\n4\nabba\n5\nababa',
      output: '4\n1\n5\n3\n3\n3\n1',
      explain: L(
        'For aaabcc the five deletions give abcc, abcc, aacc, aaac, aaab: four distinct strings.',
        'aaabcc-এ পাঁচটি মোছা দেয় abcc, abcc, aacc, aaac, aaab: চারটি ভিন্ন স্ট্রিং।',
      ),
    },
  ],
  observation: L(
    'Deleting the pair at i or at i + 1 leaves strings that differ in only one place: position i holds s[i + 2] in the first and s[i] in the second. So the two results are equal exactly when s[i] = s[i + 2]. Equal results always form runs of neighbouring deletions, so the answer is (n − 1) minus the number of i with s[i] = s[i + 2].',
    'i-তে বা i + ১-এ জোড়া মুছলে যে স্ট্রিং থাকে তারা শুধু এক জায়গায় আলাদা: প্রথমটিতে অবস্থান i-তে s[i + ২], দ্বিতীয়টিতে s[i]। তাই দুই ফল ঠিক তখন সমান যখন s[i] = s[i + ২]। সমান ফলগুলো সবসময় পাশাপাশি মোছার ধারা তৈরি করে, তাই উত্তর (n − ১) বিয়োগ যেসব i-তে s[i] = s[i + ২] তাদের সংখ্যা।',
  ),
  approach: [
    L('There are n − 1 possible deletions.', 'মোছার সম্ভাব্য উপায় n − ১টি।'),
    L('Every i with s[i] = s[i + 2] merges deletion i + 1 into deletion i, removing one distinct result.', 'যে i-তে s[i] = s[i + ২], সেখানে মোছা i + ১ মোছা i-এর সঙ্গে মিশে যায় এবং একটি ভিন্ন ফল কমে।'),
    L('Hashing gives the same answer without the insight: hash each result in O(1) and count distinct hashes.', 'হ্যাশিং এই অন্তর্দৃষ্টি ছাড়াই একই উত্তর দেয়: প্রতিটি ফল O(১)-এ হ্যাশ করে ভিন্ন হ্যাশ গোনা।'),
  ],
  walkthrough: {
    input: 'aaabcc',
    steps: [
      { state: 'n − 1 = 5', text: L('Five ways to delete a pair.', 'জোড়া মোছার পাঁচ উপায়।') },
      { state: 'i = 0: s[0] = a, s[2] = a → equal', text: L('Deleting “aa” at 0 or at 1 gives the same abcc.', '০ বা ১-এ “aa” মুছলে একই abcc।') },
      { state: 'i = 1: a ≠ b, i = 2: a ≠ c, i = 3: b ≠ c', text: L('No other merges.', 'আর কোনো মিশে যাওয়া নেই।') },
      { state: '5 − 1 = 4', text: L('Four distinct strings.', 'চারটি ভিন্ন স্ট্রিং।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over the string.', 'স্ট্রিংয়ের ওপর এক পাস।') },
  solutions: [
    {
      id: 'neighbours',
      kind: 'optimal',
      title: L('Compare s[i] with s[i + 2]', 's[i]-কে s[i + ২]-এর সঙ্গে তুলনা'),
      idea: L('Answer = (n − 1) − #{i : s[i] = s[i + 2]}.', 'উত্তর = (n − ১) − #{i : s[i] = s[i + ২]}।'),
      explain: [
        L(
          'Write Rᵢ for the string after deleting positions i and i + 1. Rᵢ and Rᵢ₊₁ agree everywhere except at position i, so Rᵢ = Rᵢ₊₁ iff s[i] = s[i + 2].',
          'i আর i + ১ মোছার পরের স্ট্রিংকে Rᵢ বলি। Rᵢ আর Rᵢ₊₁ অবস্থান i ছাড়া সব জায়গায় মেলে, তাই Rᵢ = Rᵢ₊₁ যদি ও কেবল যদি s[i] = s[i + ২]।',
        ),
        L(
          'Could Rᵢ equal a far-away Rⱼ while some step in between differs? Comparing Rᵢ and Rⱼ (i < j) letter by letter shows Rᵢ = Rⱼ forces s[k] = s[k + 2] for every k from i to j − 1, so the chain is unbroken. Counting the “breaks” between neighbours therefore counts the groups.',
          'Rᵢ কি দূরের কোনো Rⱼ-এর সমান হতে পারে যখন মাঝে কোনো ধাপ আলাদা? Rᵢ আর Rⱼ (i < j) অক্ষর ধরে মেলালে দেখা যায় Rᵢ = Rⱼ হলে i থেকে j − ১ পর্যন্ত প্রতিটি k-তে s[k] = s[k + ২] লাগে, তাই শৃঙ্খল অবিচ্ছিন্ন। তাই প্রতিবেশীদের মধ্যে “ভাঙন” গুনলেই দলের সংখ্যা পাওয়া যায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        static char buf[200005];
        scanf("%d %s", &n, buf);
        string s = buf;
        int ans = n - 1;                      // one result per deletion position
        for (int i = 0; i + 2 < n; i++)
            if (s[i] == s[i + 2]) ans--;      // deletion i and i + 1 give the same string
        printf("%d\n", ans);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'c-io'],
    },
    {
      id: 'hash-sort',
      kind: 'method',
      title: L('Hash every result, sort, count distinct', 'প্রতিটি ফল হ্যাশ, সাজানো, ভিন্ন গোনা'),
      idea: L('hash(Rᵢ) = hash(s[0..i)) · Bⁿ⁻ⁱ⁻² + hash(s[i+2..n)).', 'hash(Rᵢ) = hash(s[০..i)) · Bⁿ⁻ⁱ⁻² + hash(s[i+২..n))।'),
      explain: [
        L(
          'A polynomial hash of a concatenation is the hash of the left part shifted by the length of the right part, plus the hash of the right part. With prefix hashes and powers of B precomputed, every Rᵢ costs O(1).',
          'দুটি অংশ জোড়া লাগানো স্ট্রিংয়ের পলিনোমিয়াল হ্যাশ = বাম অংশের হ্যাশকে ডান অংশের দৈর্ঘ্য পরিমাণ সরানো, যোগ ডান অংশের হ্যাশ। প্রিফিক্স হ্যাশ আর B-এর ঘাত আগে বের করলে প্রতিটি Rᵢ-এর খরচ O(১)।',
        ),
        L(
          'Modulus 2⁶¹ − 1 with a random base makes a collision among 2·10⁵ strings astronomically unlikely, and nobody can prepare an anti-hash test against a base chosen at run time.',
          'মডুলাস ২⁶¹ − ১ আর এলোমেলো বেস হলে ২·১০⁵ স্ট্রিংয়ের মধ্যে সংঘর্ষ প্রায় অসম্ভব, আর রান-টাইমে বাছা বেসের বিরুদ্ধে কেউ অ্যান্টি-হ্যাশ টেস্ট বানাতে পারে না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    int t;
    scanf("%d", &t);
    static char buf[200005];
    while (t--) {
        int n;
        scanf("%d %s", &n, buf);
        vector<ull> pre(n + 1, 0), pw(n + 1, 1);
        for (int i = 0; i < n; i++) {
            pre[i + 1] = add(mul(pre[i], B), (ull)buf[i]);
            pw[i + 1] = mul(pw[i], B);
        }
        auto get = [&](int l, int r) { return sub(pre[r], mul(pre[l], pw[r - l])); };  // hash of s[l..r)
        vector<ull> h;
        for (int i = 0; i + 1 < n; i++)
            h.push_back(add(mul(get(0, i), pw[n - i - 2]), get(i + 2, n)));
        sort(h.begin(), h.end());
        printf("%d\n", (int)(unique(h.begin(), h.end()) - h.begin()));
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'prefix-sum'],
    },
    {
      id: 'hash-set',
      kind: 'method',
      title: L('Hash into an unordered_set', 'unordered_set-এ হ্যাশ'),
      idea: L('Same O(1) hashes, deduplicated by a hash set instead of sorting.', 'একই O(১) হ্যাশ, সাজানোর বদলে হ্যাশ সেট দিয়ে পুনরাবৃত্তি বাদ।'),
      explain: [
        L(
          'Distinct counting with a set is the everyday pattern. Here the 61-bit values already look random, so a plain unordered_set has no bad cases; reserve space first to avoid rehashing.',
          'সেট দিয়ে ভিন্ন গোনা রোজকার প্যাটার্ন। এখানে ৬১-বিটের মানগুলো আগেই এলোমেলো দেখায়, তাই সাধারণ unordered_set-এ খারাপ কেস নেই; রিহ্যাশ এড়াতে আগে জায়গা রিজার্ভ করুন।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    int t;
    scanf("%d", &t);
    static char buf[200005];
    while (t--) {
        int n;
        scanf("%d %s", &n, buf);
        // suffix hashes: suf[i] = hash of s[i..n)
        vector<ull> pre(n + 1, 0), suf(n + 1, 0), pw(n + 1, 1);
        for (int i = 0; i < n; i++) pw[i + 1] = mul(pw[i], B);
        for (int i = 0; i < n; i++) pre[i + 1] = add(mul(pre[i], B), (ull)buf[i]);
        for (int i = n - 1; i >= 0; i--) suf[i] = add(mul((ull)buf[i], pw[n - 1 - i]), suf[i + 1]);
        unordered_set<ull> seen;
        seen.reserve(2 * n);
        for (int i = 0; i + 1 < n; i++) seen.insert(add(mul(pre[i], pw[n - i - 2]), suf[i + 2]));
        printf("%d\n", (int)seen.size());
    }
    return 0;
}
`,
      time: 'O(n) expected',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Build every string, put it in a set', 'প্রতিটি স্ট্রিং বানিয়ে সেটে রাখা'),
      idea: L('Literally erase two letters n − 1 times.', 'আক্ষরিক অর্থে n − ১ বার দুটি অক্ষর মোছা।'),
      explain: [
        L(
          'O(n²) time and memory, far too slow for n = 2·10⁵, but obviously correct. It is the referee for the stress test.',
          'O(n²) সময় আর মেমরি, n = ২·১০⁵-এর জন্য অনেক ধীর, কিন্তু স্পষ্টভাবে সঠিক। স্ট্রেস টেস্টে এটিই বিচারক।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        set<string> all;
        for (int i = 0; i + 1 < n; i++) all.insert(s.substr(0, i) + s.substr(i + 2));
        cout << all.size() << "\n";
    }
    return 0;
}
`,
      time: 'O(n² log n)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['set', 'string-basics'],
    },
  ],
  tests: [
    { input: '7\n6\naaabcc\n10\naaaaaaaaaa\n6\nabcdef\n7\nabacaba\n6\ncccfff\n4\nabba\n5\nababa', output: '4\n1\n5\n3\n3\n3\n1', source: 'sample', note: sample(1) },
    { input: '1\n3\naba', output: '1', source: 'own', note: L('Deleting “ab” or “ba” both leave one letter a.', '“ab” বা “ba” মুছলে দুই ক্ষেত্রেই একটি a থাকে।') },
    { input: '1\n3\nabc', output: '2', source: 'own', note: L('Smallest n with two different results.', 'দুটি ভিন্ন ফলের ক্ষুদ্রতম n।') },
  ],
  pitfalls: [
    L('Building every string with substr: O(n²) and a memory limit exceeded.', 'substr দিয়ে প্রতিটি স্ট্রিং বানানো: O(n²) আর মেমরি সীমা পার।'),
    L('Hashing with a fixed base and modulus 2⁶⁴ (overflow): Thue–Morse strings break it.', 'নির্দিষ্ট বেস আর ২⁶⁴ মডুলাস (ওভারফ্লো) দিয়ে হ্যাশিং: থু–মোর্স স্ট্রিং একে ভেঙে দেয়।'),
    L('Comparing s[i] with s[i + 1] instead of s[i + 2].', 's[i + ২]-এর বদলে s[i + ১]-এর সঙ্গে তুলনা।'),
  ],
  related: [
    { id: '4C', name: 'Registration System', why: L('Counting with a hash map.', 'হ্যাশ ম্যাপ দিয়ে গোনা।') },
    { id: '1200E', name: 'Compress Words', why: L('Prefix and suffix hashes compared in O(1).', 'প্রিফিক্স আর সাফিক্স হ্যাশ O(১)-এ তুলনা।') },
    { id: '835D', name: 'Palindromic characteristics', why: L('Substring hashes to test palindromes fast.', 'দ্রুত প্যালিনড্রোম যাচাইয়ে সাবস্ট্রিং হ্যাশ।') },
  ],
  toolkit: ['string-basics', 'set'],
};

// ───────────────────────────────────────────── 1899D
export const p1899D: ProblemEntry = {
  id: '1899D',
  contestId: 1899,
  index: 'D',
  name: 'Yarik and Musical Notes',
  rating: 1300,
  tags: ['hashing', 'math', 'number-theory'],
  why: L(
    'Turn a scary equation into “equal keys”, then count equal pairs with a hash map. The one exception (1 and 2) is the whole trick.',
    'একটি ভয়ংকর সমীকরণকে “সমান কী”-তে বদলে হ্যাশ ম্যাপে সমান জোড়া গোনা। একমাত্র ব্যতিক্রম (১ আর ২) পুরো কৌশল।',
  ),
  statement: L(
    'Note i is the number bᵢ = 2^aᵢ. A combination of notes (x, y) is the number x^y. Count pairs i < j for which bᵢ^bⱼ = bⱼ^bᵢ.',
    'নোট i হলো সংখ্যা bᵢ = ২^aᵢ। নোটের সমন্বয় (x, y) হলো সংখ্যা x^y। কতগুলো জোড়া i < j-তে bᵢ^bⱼ = bⱼ^bᵢ, গুনুন।',
  ),
  input: L('t test cases; each has n and a₁ … aₙ.', 't-টি টেস্ট কেস; প্রতিটিতে n আর a₁ … aₙ।'),
  output: L('For each test, the number of pairs.', 'প্রতিটি টেস্টে জোড়ার সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ aᵢ ≤ 10⁹, sum of n ≤ 2·10⁵', '১ ≤ aᵢ ≤ ১০⁹, n-এর যোগফল ≤ ২·১০⁵')] },
  samples: [
    {
      input: '5\n1\n2\n4\n3 1 3 2\n2\n1000 1000\n3\n1 1 1\n19\n2 4 1 6 2 8 5 4 2 10 5 10 8 7 4 3 2 6 10',
      output: '0\n2\n1\n3\n19',
      explain: L('In 3 1 3 2 the two 3s match, and so do 1 and 2 (2² = 4² … see the observation).', '৩ ১ ৩ ২-এ দুটি ৩ মেলে, আর ১ ও ২-ও মেলে (পর্যবেক্ষণ দেখুন)।'),
    },
  ],
  observation: L(
    'Take logarithms base 2: (2^a)^(2^b) = (2^b)^(2^a) ⇔ a · 2^b = b · 2^a ⇔ a / 2^a = b / 2^b. The function f(x) = x / 2^x gives f(1) = f(2) = ½ and is strictly decreasing from 2 on, so equality holds only for a = b or {a, b} = {1, 2}.',
    'লগ ভিত্তি ২ নিন: (২^a)^(২^b) = (২^b)^(২^a) ⇔ a · ২^b = b · ২^a ⇔ a / ২^a = b / ২^b। ফাংশন f(x) = x / ২^x-এ f(১) = f(২) = ½ আর ২ থেকে কঠোরভাবে কমে, তাই সমতা শুধু a = b বা {a, b} = {১, ২} হলে।',
  ),
  approach: [
    L('Count each value with a hash map; add c·(c − 1)/2 for every value.', 'হ্যাশ ম্যাপে প্রতিটি মান গুনে প্রতিটি মানের জন্য c·(c − ১)/২ যোগ।'),
    L('Add cnt[1] · cnt[2] for the special pairs.', 'বিশেষ জোড়ার জন্য cnt[১] · cnt[২] যোগ।'),
  ],
  walkthrough: {
    input: '3 1 3 2',
    steps: [
      { state: 'cnt = {3: 2, 1: 1, 2: 1}', text: L('Group equal exponents.', 'সমান সূচক এক দলে।') },
      { state: '2·1/2 = 1', text: L('The two 3s.', 'দুটি ৩।') },
      { state: 'cnt[1] · cnt[2] = 1', text: L('The pair (1, 2): 2^4 = 4^2 = 16.', 'জোড়া (১, ২): ২^৪ = ৪^২ = ১৬।') },
      { state: 'total 2', text: L('Matches the sample.', 'স্যাম্পলের সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One map insertion per note.', 'প্রতি নোটে একটি ম্যাপ সন্নিবেশ।') },
  solutions: [
    {
      id: 'map',
      kind: 'optimal',
      title: L('Count equal exponents, plus 1 × 2', 'সমান সূচক গোনা, যোগ ১ × ২'),
      idea: L('Pairs with equal aᵢ, plus cnt[1] · cnt[2].', 'সমান aᵢ-এর জোড়া, যোগ cnt[১] · cnt[২]।'),
      explain: [
        L(
          'Counting pairs with equal keys is the hash-map pattern: when a value arrives, it pairs with every earlier copy, so add the current count before incrementing. Use long long: one test can have about 2·10¹⁰ pairs.',
          'সমান কী-এর জোড়া গোনা হ্যাশ ম্যাপের প্যাটার্ন: একটি মান এলে সে আগের প্রতিটি কপির সঙ্গে জোড়া বাঁধে, তাই বাড়ানোর আগে বর্তমান গণনা যোগ করুন। long long লাগবে: এক টেস্টে প্রায় ২·১০¹⁰ জোড়া হতে পারে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        map<int, long long> cnt;
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            int a;
            scanf("%d", &a);
            ans += cnt[a];   // pairs with earlier equal exponents
            cnt[a]++;
        }
        ans += cnt[1] * cnt[2];  // 2^(2^2) = (2^2)^(2^1) = 16
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'long-long'],
    },
    {
      id: 'sort-groups',
      kind: 'method',
      title: L('Sort and measure runs', 'সাজিয়ে ধারা মাপা'),
      idea: L('After sorting, equal values are adjacent; a run of length c gives c(c − 1)/2.', 'সাজানোর পর সমান মান পাশাপাশি; c দৈর্ঘ্যের ধারা দেয় c(c − ১)/২।'),
      explain: [
        L(
          'Whenever you need “how many of each value”, sorting is the hash map’s twin. It needs no extra structure, and the special count of 1s and 2s comes from the first two runs.',
          '“প্রতিটি মান কতবার” লাগলে সাজানো হ্যাশ ম্যাপের যমজ। কোনো বাড়তি কাঠামো লাগে না, আর ১ ও ২-এর বিশেষ গণনা প্রথম দুটি ধারা থেকেই আসে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.begin(), a.end());
        long long ans = 0, ones = 0, twos = 0;
        for (int i = 0, j; i < n; i = j) {
            j = i;
            while (j < n && a[j] == a[i]) j++;
            long long c = j - i;
            ans += c * (c - 1) / 2;
            if (a[i] == 1) ones = c;
            if (a[i] == 2) twos = c;
        }
        printf("%lld\n", ans + ones * twos);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Test the equation for every pair', 'প্রতিটি জোড়ায় সমীকরণ যাচাই'),
      idea: L('Check a · 2^b = b · 2^a exactly, without trusting the observation.', 'পর্যবেক্ষণে ভরসা না করে a · ২^b = b · ২^a ঠিকঠাক যাচাই।'),
      explain: [
        L(
          'With a ≤ b the equation is b = a · 2^(b − a). That can only hold if b − a < 31 (b ≤ 10⁹), so the check fits in 64-bit integers.',
          'a ≤ b হলে সমীকরণ b = a · ২^(b − a)। b ≤ ১০⁹ বলে এটি কেবল b − a < ৩১ হলেই সম্ভব, তাই যাচাই ৬৪-বিট পূর্ণসংখ্যায় এঁটে যায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n);
        for (auto& x : a) cin >> x;
        long long ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                long long x = min(a[i], a[j]), y = max(a[i], a[j]);
                if (y - x < 40 && (x << (y - x)) == y) ans++;  // y * 2^x == x * 2^y
            }
        cout << ans << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '5\n1\n2\n4\n3 1 3 2\n2\n1000 1000\n3\n1 1 1\n19\n2 4 1 6 2 8 5 4 2 10 5 10 8 7 4 3 2 6 10', output: '0\n2\n1\n3\n19', source: 'sample', note: sample(1) },
    { input: '1\n4\n1 1 2 2', output: '6', source: 'own', note: L('Every pair works: two equal pairs and four 1–2 pairs.', 'প্রতিটি জোড়া চলে: দুটি সমান জোড়া আর চারটি ১–২ জোড়া।') },
    { input: '1\n2\n2 4', output: '0', source: 'own', note: L('2 and 4 look alike but 2·2⁴ ≠ 4·2².', '২ আর ৪ দেখতে একই রকম হলেও ২·২⁴ ≠ ৪·২²।') },
  ],
  pitfalls: [
    L('Forgetting the (1, 2) pairs.', '(১, ২) জোড়া ভুলে যাওয়া।'),
    L('Using int for the answer: n = 2·10⁵ equal values give about 2·10¹⁰ pairs.', 'উত্তরের জন্য int: ২·১০⁵টি সমান মানে প্রায় ২·১০¹⁰ জোড়া।'),
    L('unordered_map with default hashing can be attacked; a map or sorting is safe.', 'ডিফল্ট হ্যাশিংসহ unordered_map আক্রমণযোগ্য; map বা সাজানো নিরাপদ।'),
  ],
  related: [
    { id: '1520D', name: 'Same Differences', why: L('Rewrite the condition as equal keys, then count.', 'শর্তকে সমান কী-তে লিখে গোনা।') },
    { id: '1133D', name: 'Zero Quantity Maximization', why: L('Group by a normalized key.', 'স্বাভাবিকীকৃত কী দিয়ে দল।') },
  ],
  toolkit: ['map', 'long-long'],
};

// ───────────────────────────────────────────── 1536C
export const p1536C: ProblemEntry = {
  id: '1536C',
  contestId: 1536,
  index: 'C',
  name: 'Diluc and Kaeya',
  rating: 1500,
  tags: ['data-structures', 'dp', 'hashing', 'number-theory'],
  why: L(
    'The key of a hash map does not have to be a value: here it is a ratio reduced by gcd. Counting earlier prefixes with the same key answers every prefix online.',
    'হ্যাশ ম্যাপের কী শুধু একটি মান হতে হবে না: এখানে এটি gcd দিয়ে সরল করা একটি অনুপাত। একই কী-এর আগের প্রিফিক্স গুনে প্রতিটি প্রিফিক্সের উত্তর সঙ্গে সঙ্গে।',
  ),
  statement: L(
    'A string of n letters, each D or K, is given. For every prefix, find the largest number of pieces you can cut it into so that every piece has the same ratio of D to K (a : 0 and 0 : b count as ratios; 1 : 2 equals 2 : 4).',
    'n দৈর্ঘ্যের একটি স্ট্রিং, প্রতিটি অক্ষর D বা K। প্রতিটি প্রিফিক্সের জন্য সর্বোচ্চ কত টুকরোয় কাটা যায় যাতে প্রতিটি টুকরোয় D আর K-এর অনুপাত সমান হয় (a : ০ আর ০ : b-ও অনুপাত; ১ : ২ = ২ : ৪)।',
  ),
  input: L('t test cases; each has n and the string.', 't-টি টেস্ট কেস; প্রতিটিতে n আর স্ট্রিং।'),
  output: L('For each test, n numbers: the answer for every prefix.', 'প্রতিটি টেস্টে n-টি সংখ্যা: প্রতিটি প্রিফিক্সের উত্তর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('sum of n ≤ 5·10⁵', 'n-এর যোগফল ≤ ৫·১০⁵')] },
  samples: [
    {
      input: '5\n3\nDDK\n6\nDDDDDD\n4\nDKDK\n1\nD\n9\nDKDKDDDDK',
      output: '1 2 1\n1 2 3 4 5 6\n1 1 1 2\n1\n1 1 1 2 1 2 1 1 3',
      explain: L('DKDK splits into DK | DK, both 1 : 1, so the fourth answer is 2.', 'DKDK ভাগ হয় DK | DK-তে, দুটোই ১ : ১, তাই চতুর্থ উত্তর ২।'),
    },
  ],
  observation: L(
    'If a prefix of ratio d : k is cut into pieces of equal ratio, every piece has ratio d : k (equal ratios add up to the same ratio). So every cut point is an earlier prefix whose ratio is also d : k, and every such prefix is a valid cut. The answer is the number of prefixes up to i (including i) with the same reduced ratio.',
    'd : k অনুপাতের একটি প্রিফিক্স যদি সমান অনুপাতের টুকরোয় কাটা হয়, তবে প্রতিটি টুকরোর অনুপাত d : k (সমান অনুপাত যোগ করলে একই অনুপাত)। তাই প্রতিটি কাটার বিন্দু এমন একটি আগের প্রিফিক্স যার অনুপাতও d : k, আর এমন প্রতিটি প্রিফিক্স বৈধ কাটা। উত্তর হলো i পর্যন্ত (i-সহ) একই সরল অনুপাতের প্রিফিক্সের সংখ্যা।',
  ),
  approach: [
    L('Keep running counts d and k.', 'চলমান গণনা d আর k রাখা।'),
    L('Reduce (d, k) by g = gcd(d, k); gcd(d, 0) = d keeps a : 0 as (1, 0).', 'g = gcd(d, k) দিয়ে (d, k) সরল; gcd(d, ০) = d বলে a : ০ হয় (১, ০)।'),
    L('Increment and print cnt[(d / g, k / g)].', 'cnt[(d / g, k / g)] বাড়িয়ে ছাপা।'),
  ],
  walkthrough: {
    input: 'DKDK',
    steps: [
      { state: 'D: (1,0) → cnt 1', text: L('First prefix.', 'প্রথম প্রিফিক্স।') },
      { state: 'DK: (1,1) → cnt 1', text: L('New ratio.', 'নতুন অনুপাত।') },
      { state: 'DKD: (2,1) → cnt 1', text: L('New ratio.', 'নতুন অনুপাত।') },
      { state: 'DKDK: (2,2) → (1,1) → cnt 2', text: L('Matches the prefix DK: cut there.', 'DK প্রিফিক্সের সঙ্গে মেলে: সেখানে কাটা।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A gcd and a map update per letter.', 'প্রতি অক্ষরে একটি gcd আর একটি ম্যাপ আপডেট।') },
  solutions: [
    {
      id: 'ratio-map',
      kind: 'optimal',
      title: L('Count reduced ratios of prefixes', 'প্রিফিক্সের সরল অনুপাত গোনা'),
      idea: L('Answer for prefix i = how many prefixes so far have the same reduced (d, k).', 'প্রিফিক্স i-এর উত্তর = এ পর্যন্ত কতগুলো প্রিফিক্সের সরল (d, k) একই।'),
      explain: [
        L(
          'A pair of numbers is a fine map key. Reducing by the gcd turns “same ratio” into “same pair”, which is exactly what maps and hash tables can compare.',
          'দুটি সংখ্যার জোড়া ম্যাপের ভালো কী। gcd দিয়ে সরল করলে “একই অনুপাত” হয়ে যায় “একই জোড়া”, যা ম্যাপ আর হ্যাশ টেবিল তুলনা করতে পারে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    static char s[500005];
    while (t--) {
        int n;
        scanf("%d %s", &n, s);
        map<pair<int, int>, int> cnt;
        int d = 0, k = 0;
        string out;
        for (int i = 0; i < n; i++) {
            (s[i] == 'D' ? d : k)++;
            int g = gcd(d, k);                       // gcd(x, 0) = x
            int c = ++cnt[{d / g, k / g}];
            out += to_string(c);
            out += (i + 1 < n ? ' ' : '\n');
        }
        fputs(out.c_str(), stdout);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'gcd-lcm', 'pair'],
    },
    {
      id: 'packed-key',
      kind: 'method',
      title: L('Pack the pair into one 64-bit key', 'জোড়াকে একটি ৬৪-বিট কী-তে ভরা'),
      idea: L('key = (d/g) · 2³² + (k/g) in an unordered_map with a randomized hash.', 'key = (d/g) · ২³² + (k/g), এলোমেলো হ্যাশসহ unordered_map-এ।'),
      explain: [
        L(
          'Two numbers below 2³² fit side by side in one unsigned 64-bit integer, which is cheaper to hash than a pair. A splitmix64 mixer with a time-based offset protects the table from crafted collisions.',
          '২³²-এর নিচের দুটি সংখ্যা একটি আনসাইনড ৬৪-বিট পূর্ণসংখ্যায় পাশাপাশি এঁটে যায়, যা জোড়ার চেয়ে সস্তায় হ্যাশ হয়। সময়-ভিত্তিক অফসেটসহ splitmix64 মিক্সার টেবিলকে বানানো সংঘর্ষ থেকে বাঁচায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct SplitMix {
    static unsigned long long mix(unsigned long long x) {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return x ^ (x >> 31);
    }
    size_t operator()(unsigned long long x) const {
        static const unsigned long long seed = chrono::steady_clock::now().time_since_epoch().count();
        return mix(x + seed);
    }
};

int main() {
    int t;
    scanf("%d", &t);
    static char s[500005];
    while (t--) {
        int n;
        scanf("%d %s", &n, s);
        unordered_map<unsigned long long, int, SplitMix> cnt;
        cnt.reserve(2 * n);
        unsigned long long d = 0, k = 0;
        for (int i = 0; i < n; i++) {
            (s[i] == 'D' ? d : k)++;
            unsigned long long g = gcd(d, k);
            printf("%d%c", ++cnt[(d / g) << 32 | (k / g)], i + 1 < n ? ' ' : '\n');
        }
    }
    return 0;
}
`,
      time: 'O(n log n) (the gcd)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['gcd-lcm', 'bit-shift'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Compare with every earlier prefix', 'প্রতিটি আগের প্রিফিক্সের সঙ্গে তুলনা'),
      idea: L('Prefix j has the same ratio as prefix i iff dⱼ · kᵢ = kⱼ · dᵢ.', 'প্রিফিক্স j আর i-এর অনুপাত একই যদি ও কেবল যদি dⱼ · kᵢ = kⱼ · dᵢ।'),
      explain: [
        L('Cross-multiplication compares ratios without any gcd. Quadratic, used as the stress reference.', 'আড়াআড়ি গুণ gcd ছাড়াই অনুপাত তুলনা করে। দ্বিঘাত, স্ট্রেস রেফারেন্স।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        vector<long long> d(n + 1, 0), k(n + 1, 0);
        for (int i = 0; i < n; i++) {
            d[i + 1] = d[i] + (s[i] == 'D');
            k[i + 1] = k[i] + (s[i] == 'K');
        }
        for (int i = 1; i <= n; i++) {
            int c = 0;
            for (int j = 1; j <= i; j++)
                if (d[j] * k[i] == k[j] * d[i]) c++;
            cout << c << (i < n ? ' ' : '\n');
        }
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['prefix-sum'],
    },
  ],
  tests: [
    { input: '5\n3\nDDK\n6\nDDDDDD\n4\nDKDK\n1\nD\n9\nDKDKDDDDK', output: '1 2 1\n1 2 3 4 5 6\n1 1 1 2\n1\n1 1 1 2 1 2 1 1 3', source: 'sample', note: sample(1) },
    { input: '1\n6\nKDDKDK', output: '1 1 1 2 1 3', source: 'own', note: L('Ratio 1 : 1 at lengths 2, 4 and 6.', 'দৈর্ঘ্য ২, ৪ আর ৬-এ অনুপাত ১ : ১।') },
  ],
  pitfalls: [
    L('Storing the unreduced pair: (1, 1) and (2, 2) would be different keys.', 'অসরল জোড়া রাখা: (১, ১) আর (২, ২) আলাদা কী হয়ে যেত।'),
    L('Dividing by k to get a floating ratio: precision errors and division by zero.', 'k দিয়ে ভাগ করে দশমিক অনুপাত: নির্ভুলতার ভুল আর শূন্য দিয়ে ভাগ।'),
  ],
  related: [
    { id: '1133D', name: 'Zero Quantity Maximization', why: L('Fractions reduced by gcd as hash keys.', 'gcd দিয়ে সরল ভগ্নাংশ হ্যাশ কী হিসেবে।') },
    { id: '1520D', name: 'Same Differences', why: L('Count earlier elements with the same key.', 'একই কী-এর আগের উপাদান গোনা।') },
  ],
  toolkit: ['map', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 1133D
export const p1133D: ProblemEntry = {
  id: '1133D',
  contestId: 1133,
  index: 'D',
  name: 'Zero Quantity Maximization',
  rating: 1500,
  tags: ['hashing', 'math', 'number-theory'],
  why: L(
    'Each index “votes” for one value of d. Normalizing the fraction −b/a (gcd and sign) turns the vote into a hashable key; two edge cases decide the score.',
    'প্রতিটি সূচক d-এর একটি মানের পক্ষে “ভোট” দেয়। −b/a ভগ্নাংশকে স্বাভাবিক করলে (gcd আর চিহ্ন) ভোট হ্যাশযোগ্য কী হয়; দুটি প্রান্তিক কেস নম্বর ঠিক করে।',
  ),
  statement: L(
    'Arrays a and b of length n are given. Choose a real number d and set cᵢ = d · aᵢ + bᵢ. Maximize the number of zeros in c.',
    'n দৈর্ঘ্যের অ্যারে a আর b দেওয়া। একটি বাস্তব সংখ্যা d বেছে cᵢ = d · aᵢ + bᵢ নিন। c-তে শূন্যের সংখ্যা সর্বোচ্চ করুন।',
  ),
  input: L('n, then a₁ … aₙ, then b₁ … bₙ.', 'n, তারপর a₁ … aₙ, তারপর b₁ … bₙ।'),
  output: L('The maximum number of zeros.', 'শূন্যের সর্বোচ্চ সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵, |aᵢ|, |bᵢ| ≤ 10⁹', 'n ≤ ২·১০⁵, |aᵢ|, |bᵢ| ≤ ১০⁹')] },
  samples: [
    { input: '5\n1 2 3 4 5\n2 4 7 11 3', output: '2', explain: L('d = −2 zeroes the first two.', 'd = −২ প্রথম দুটিকে শূন্য করে।') },
    { input: '3\n13 37 39\n1 2 3', output: '2', explain: L('d = −1/13 zeroes indices 1 and 3.', 'd = −১/১৩ সূচক ১ আর ৩-কে শূন্য করে।') },
    { input: '4\n0 0 0 0\n1 2 3 4', output: '0', explain: L('With aᵢ = 0 the value is bᵢ ≠ 0, whatever d is.', 'aᵢ = ০ হলে মান bᵢ ≠ ০, d যা-ই হোক।') },
    { input: '3\n1 2 -1\n-6 -12 6', output: '3', explain: L('d = 6 works for all three.', 'd = ৬ তিনটিতেই চলে।') },
  ],
  observation: L(
    'If aᵢ ≠ 0, index i is zero for exactly one d = −bᵢ / aᵢ. If aᵢ = bᵢ = 0 it is zero for every d. If aᵢ = 0 ≠ bᵢ it is never zero. So answer = (always-zero count) + (most popular value of −bᵢ / aᵢ).',
    'aᵢ ≠ ০ হলে সূচক i ঠিক একটি d = −bᵢ / aᵢ-এর জন্য শূন্য। aᵢ = bᵢ = ০ হলে প্রতিটি d-তে শূন্য। aᵢ = ০ ≠ bᵢ হলে কখনো শূন্য নয়। তাই উত্তর = (সবসময়-শূন্যের সংখ্যা) + (−bᵢ / aᵢ-এর সবচেয়ে জনপ্রিয় মান)।',
  ),
  approach: [
    L('Normalize −bᵢ / aᵢ: divide by gcd(|a|, |b|) and make the denominator positive.', '−bᵢ / aᵢ স্বাভাবিক করা: gcd(|a|, |b|) দিয়ে ভাগ আর হর ধনাত্মক।'),
    L('Count the normalized pairs in a map and take the maximum.', 'ম্যাপে স্বাভাবিক জোড়া গুনে সর্বোচ্চ নেওয়া।'),
    L('Add the number of indices with aᵢ = bᵢ = 0.', 'aᵢ = bᵢ = ০ সূচকের সংখ্যা যোগ।'),
  ],
  walkthrough: {
    input: 'a = 1 2 −1, b = −6 −12 6',
    steps: [
      { state: '6/1, 12/2 → 6/1, −6/−1 → 6/1', text: L('All three normalize to the same fraction.', 'তিনটিই একই ভগ্নাংশে স্বাভাবিক হয়।') },
      { state: 'max count 3, always-zero 0', text: L('Answer 3.', 'উত্তর ৩।') },
    ],
  },
  complexity: { time: 'O(n log C)', space: 'O(n)', why: L('A gcd and a map update per index.', 'প্রতি সূচকে একটি gcd আর একটি ম্যাপ আপডেট।') },
  solutions: [
    {
      id: 'normalized-map',
      kind: 'optimal',
      title: L('Map of normalized fractions', 'স্বাভাবিক ভগ্নাংশের ম্যাপ'),
      idea: L('Key (p, q) with q > 0 and gcd(|p|, q) = 1 for the fraction −b/a.', '−b/a ভগ্নাংশের জন্য কী (p, q), যেখানে q > ০ আর gcd(|p|, q) = ১।'),
      explain: [
        L(
          'A fraction has many spellings (2/4, −1/−2, 1/2). Choosing one canonical spelling, positive denominator and lowest terms, makes equal fractions equal keys.',
          'একটি ভগ্নাংশের অনেক রূপ (২/৪, −১/−২, ১/২)। একটি নির্দিষ্ট রূপ, ধনাত্মক হর আর লঘিষ্ঠ আকার, বেছে নিলে সমান ভগ্নাংশ সমান কী হয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n), b(n);
    for (auto& x : a) scanf("%lld", &x);
    for (auto& x : b) scanf("%lld", &x);
    map<pair<long long, long long>, int> cnt;
    int always = 0, best = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] == 0) {
            if (b[i] == 0) always++;  // zero for every d
            continue;                 // otherwise never zero
        }
        long long p = -b[i], q = a[i];
        long long g = gcd(llabs(p), llabs(q));
        p /= g, q /= g;
        if (q < 0) p = -p, q = -q;    // canonical sign
        best = max(best, ++cnt[{p, q}]);
    }
    printf("%d\n", best + always);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'gcd-lcm', 'pair'],
    },
    {
      id: 'sort-cross',
      kind: 'method',
      title: L('Sort fractions by cross-multiplication', 'আড়াআড়ি গুণে ভগ্নাংশ সাজানো'),
      idea: L('With positive denominators, p₁/q₁ < p₂/q₂ ⇔ p₁q₂ < p₂q₁; equal fractions become adjacent.', 'ধনাত্মক হরে p₁/q₁ < p₂/q₂ ⇔ p₁q₂ < p₂q₁; সমান ভগ্নাংশ পাশাপাশি আসে।'),
      explain: [
        L(
          'No gcd at all: products stay below 10¹⁸ and fit in long long. After sorting, the longest block of equal fractions is the answer for the d part.',
          'কোনো gcd লাগে না: গুণফল ১০¹⁸-এর নিচে থাকে, long long-এ আঁটে। সাজানোর পর সমান ভগ্নাংশের দীর্ঘতম ব্লকই d অংশের উত্তর।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n), b(n);
    for (auto& x : a) scanf("%lld", &x);
    for (auto& x : b) scanf("%lld", &x);
    vector<pair<long long, long long>> f;  // (p, q) with q > 0, value p / q
    int always = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] == 0) { always += b[i] == 0; continue; }
        long long p = -b[i], q = a[i];
        if (q < 0) p = -p, q = -q;
        f.push_back({p, q});
    }
    auto less_ = [](const pair<long long, long long>& x, const pair<long long, long long>& y) {
        return x.first * y.second < y.first * x.second;
    };
    sort(f.begin(), f.end(), less_);
    int best = 0;
    for (size_t i = 0, j; i < f.size(); i = j) {
        j = i;
        while (j < f.size() && !less_(f[i], f[j])) j++;  // equal to f[i]
        best = max(best, (int)(j - i));
    }
    printf("%d\n", best + always);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try each candidate d', 'প্রতিটি সম্ভাব্য d চেষ্টা'),
      idea: L('Only d = −bᵢ/aᵢ can matter; count zeros for each one exactly.', 'শুধু d = −bᵢ/aᵢ গুরুত্বপূর্ণ; প্রতিটির জন্য ঠিকঠাক শূন্য গোনা।'),
      explain: [
        L('For d = −bᵢ/aᵢ, cⱼ = 0 ⇔ aⱼ · (−bᵢ) + bⱼ · aᵢ = 0, all in integers. O(n²).', 'd = −bᵢ/aᵢ হলে cⱼ = ০ ⇔ aⱼ · (−bᵢ) + bⱼ · aᵢ = ০, সব পূর্ণসংখ্যায়। O(n²)।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n), b(n);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    int best = 0;
    for (int j = 0; j < n; j++) best += a[j] == 0 && b[j] == 0;  // d = anything
    for (int i = 0; i < n; i++) {
        if (a[i] == 0) continue;
        int c = 0;
        for (int j = 0; j < n; j++)
            if (-a[j] * b[i] + b[j] * a[i] == 0) c++;  // d = -b[i]/a[i] times a[i]
        best = max(best, c);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '5\n1 2 3 4 5\n2 4 7 11 3', output: '2', source: 'sample', note: sample(1) },
    { input: '3\n13 37 39\n1 2 3', output: '2', source: 'sample', note: sample(2) },
    { input: '4\n0 0 0 0\n1 2 3 4', output: '0', source: 'sample', note: sample(3) },
    { input: '3\n1 2 -1\n-6 -12 6', output: '3', source: 'sample', note: sample(4) },
    { input: '3\n0 0 5\n0 0 7', output: '3', source: 'own', note: L('Two always-zero indices plus the third with d = −7/5.', 'দুটি সবসময়-শূন্য সূচক আর d = −৭/৫ দিয়ে তৃতীয়টি।') },
  ],
  pitfalls: [
    L('Using double for −b/a: different fractions can round to the same value.', '−b/a-এর জন্য double: ভিন্ন ভগ্নাংশ একই মানে গোল হতে পারে।'),
    L('Not fixing the sign: 1/−2 and −1/2 become different keys.', 'চিহ্ন ঠিক না করা: ১/−২ আর −১/২ আলাদা কী হয়ে যায়।'),
    L('Counting aᵢ = bᵢ = 0 inside the map instead of adding it to every d.', 'aᵢ = bᵢ = ০-কে প্রতিটি d-তে যোগ না করে ম্যাপের ভেতরে গোনা।'),
  ],
  related: [
    { id: '1536C', name: 'Diluc and Kaeya', why: L('Ratios reduced by gcd as keys.', 'gcd দিয়ে সরল অনুপাত কী হিসেবে।') },
    { id: '1899D', name: 'Yarik and Musical Notes', why: L('Rewrite an equation as equal keys.', 'সমীকরণকে সমান কী-তে লেখা।') },
  ],
  toolkit: ['map', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 182D
export const p182D: ProblemEntry = {
  id: '182D',
  contestId: 182,
  index: 'D',
  name: 'Common Divisors',
  rating: 1400,
  tags: ['brute-force', 'hashing', 'implementation', 'math', 'strings'],
  why: L(
    'Divisors of strings behave like divisors of numbers. Only lengths dividing gcd(|s₁|, |s₂|) can work, and testing each one is cheap with hashing or direct comparison.',
    'স্ট্রিংয়ের ভাজক সংখ্যার ভাজকের মতোই আচরণ করে। শুধু gcd(|s₁|, |s₂|)-কে ভাগ করে এমন দৈর্ঘ্য চলতে পারে, আর প্রতিটি যাচাই হ্যাশিং বা সরাসরি তুলনায় সস্তা।',
  ),
  statement: L(
    'A string a is a divisor of b if b is a repeated some whole number of times (abab has divisors ab and abab). Given s₁ and s₂, count the strings that divide both.',
    'স্ট্রিং a হলো b-এর ভাজক যদি b হয় a-কে পূর্ণ সংখ্যক বার পুনরাবৃত্তি (abab-এর ভাজক ab আর abab)। s₁ আর s₂ দেওয়া; দুটিকেই ভাগ করে এমন স্ট্রিং গুনুন।',
  ),
  input: L('Two lines: s₁ and s₂, lowercase letters.', 'দুই লাইন: s₁ আর s₂, ছোট হাতের অক্ষর।'),
  output: L('The number of common divisors.', 'সাধারণ ভাজকের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ |s₁|, |s₂| ≤ 10⁵', '১ ≤ |s₁|, |s₂| ≤ ১০⁵')] },
  samples: [
    { input: 'abcdabcd\nabcdabcdabcdabcd', output: '2', explain: L('abcd and abcdabcd.', 'abcd আর abcdabcd।') },
    { input: 'aaa\naa', output: '1', explain: L('Only a.', 'শুধু a।') },
  ],
  observation: L(
    'A common divisor of length L must be the first L letters of both strings, and L must divide both lengths, so it divides g = gcd(|s₁|, |s₂|). There are at most about 128 such L for g ≤ 10⁵, and each is checked in linear time.',
    'L দৈর্ঘ্যের সাধারণ ভাজক দুই স্ট্রিংয়েরই প্রথম L অক্ষর হতে হবে, আর L দুই দৈর্ঘ্যকেই ভাগ করবে, তাই g = gcd(|s₁|, |s₂|)-কে ভাগ করে। g ≤ ১০⁵-এ এমন L বড়জোর প্রায় ১২৮টি, আর প্রতিটি রৈখিক সময়ে যাচাই হয়।',
  ),
  approach: [
    L('For every L dividing g: the prefixes of length L must be equal.', 'g-কে ভাগ করা প্রতিটি L-এর জন্য: L দৈর্ঘ্যের প্রিফিক্স সমান হতে হবে।'),
    L('s₁ must have period L: s₁[i] = s₁[i − L] for all i ≥ L; same for s₂.', 's₁-এর পর্যায় L হতে হবে: সব i ≥ L-এ s₁[i] = s₁[i − L]; s₂-তেও একই।'),
  ],
  walkthrough: {
    input: 'aaa, aa',
    steps: [
      { state: 'g = gcd(3, 2) = 1', text: L('Only L = 1 can work.', 'শুধু L = ১ চলতে পারে।') },
      { state: 'L = 1: prefixes a = a, both strings are all a', text: L('One common divisor.', 'একটি সাধারণ ভাজক।') },
    ],
  },
  complexity: { time: 'O(d(g) · (|s₁| + |s₂|))', space: 'O(|s₁| + |s₂|)', why: L('About 128 divisors at most, each a linear scan.', 'বড়জোর প্রায় ১২৮টি ভাজক, প্রতিটি একটি রৈখিক স্ক্যান।') },
  solutions: [
    {
      id: 'periods',
      kind: 'optimal',
      title: L('Check every divisor of the gcd', 'gcd-এর প্রতিটি ভাজক যাচাই'),
      idea: L('L works iff prefixes match and both strings have period L.', 'L চলে যদি ও কেবল যদি প্রিফিক্স মেলে আর দুই স্ট্রিংয়ের পর্যায় L।'),
      explain: [
        L(
          '“s is t repeated” is the same as “|t| divides |s| and s[i] = s[i − |t|] for every i ≥ |t|”: each block copies the one before it. This avoids building repeated strings.',
          '“s হলো t-এর পুনরাবৃত্তি” মানে “|t| ভাগ করে |s|-কে আর প্রতিটি i ≥ |t|-এ s[i] = s[i − |t|]”: প্রতিটি ব্লক আগেরটির কপি। এতে পুনরাবৃত্ত স্ট্রিং বানাতে হয় না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool hasPeriod(const string& s, int L) {
    for (size_t i = L; i < s.size(); i++)
        if (s[i] != s[i - L]) return false;
    return true;
}

int main() {
    string a, b;
    cin >> a >> b;
    int g = gcd((int)a.size(), (int)b.size()), ans = 0;
    for (int L = 1; L <= g; L++) {
        if (g % L) continue;
        if (a.compare(0, L, b, 0, L) != 0) continue;  // same first L letters
        if (hasPeriod(a, L) && hasPeriod(b, L)) ans++;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(d(g) · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['gcd-lcm', 'string-basics', 'functions'],
    },
    {
      id: 'hash',
      kind: 'method',
      title: L('Compare block hashes', 'ব্লক হ্যাশ তুলনা'),
      idea: L('s splits into blocks of length L that all hash to hash(s₁[0..L)).', 's-কে L দৈর্ঘ্যের ব্লকে ভাঙলে সবগুলোর হ্যাশ hash(s₁[০..L))-এর সমান।'),
      explain: [
        L(
          'With prefix hashes every block hash is O(1), so checking L costs n / L instead of n. Summed over divisors this is the divisor-sum σ(g) / g · n, a little faster, and it shows how substring hashes replace character loops.',
          'প্রিফিক্স হ্যাশে প্রতিটি ব্লক হ্যাশ O(১), তাই L যাচাইয়ের খরচ n-এর বদলে n / L। ভাজকগুলোর ওপর যোগ করলে σ(g) / g · n, একটু দ্রুত, আর দেখায় সাবস্ট্রিং হ্যাশ কীভাবে অক্ষর-লুপের জায়গা নেয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

ull B;
struct Hasher {
    vector<ull> pre, pw;
    Hasher(const string& s) : pre(s.size() + 1, 0), pw(s.size() + 1, 1) {
        for (size_t i = 0; i < s.size(); i++) {
            pre[i + 1] = add(mul(pre[i], B), (ull)s[i]);
            pw[i + 1] = mul(pw[i], B);
        }
    }
    ull get(int l, int r) const { return sub(pre[r], mul(pre[l], pw[r - l])); }
};

bool blocks(const Hasher& h, int n, int L, ull want) {
    for (int i = 0; i < n; i += L)
        if (h.get(i, i + L) != want) return false;
    return true;
}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    B = rng() % (MOD - 1000) + 500;
    string a, b;
    cin >> a >> b;
    Hasher ha(a), hb(b);
    int g = gcd((int)a.size(), (int)b.size()), ans = 0;
    for (int L = 1; L <= g; L++) {
        if (g % L) continue;
        ull want = ha.get(0, L);
        if (blocks(ha, a.size(), L, want) && blocks(hb, b.size(), L, want)) ans++;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n + σ(g) · n / g)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['gcd-lcm', 'prefix-sum'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Build the repeated strings', 'পুনরাবৃত্ত স্ট্রিং বানানো'),
      idea: L('For every L, literally repeat the prefix and compare.', 'প্রতিটি L-এর জন্য আক্ষরিক অর্থে প্রিফিক্স পুনরাবৃত্তি করে তুলনা।'),
      explain: [L('The definition, word for word. Fine for short strings only.', 'সংজ্ঞা, হুবহু। শুধু ছোট স্ট্রিংয়ে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isDivisor(const string& t, const string& s) {
    if (s.size() % t.size()) return false;
    string r;
    while (r.size() < s.size()) r += t;
    return r == s;
}

int main() {
    string a, b;
    cin >> a >> b;
    int ans = 0;
    for (size_t L = 1; L <= min(a.size(), b.size()); L++) {
        string t = a.substr(0, L);
        if (isDivisor(t, a) && isDivisor(t, b)) ans++;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: 'abcdabcd\nabcdabcdabcdabcd', output: '2', source: 'sample', note: sample(1) },
    { input: 'aaa\naa', output: '1', source: 'sample', note: sample(2) },
    { input: 'aaaaaa\naaaa', output: '2', source: 'own', note: L('a and aa.', 'a আর aa।') },
    { input: 'ab\nba', output: '0', source: 'own', note: L('Same length, different prefixes.', 'একই দৈর্ঘ্য, ভিন্ন প্রিফিক্স।') },
  ],
  pitfalls: [
    L('Trying every L up to min length and building strings: O(n²) for aaaa…', 'ন্যূনতম দৈর্ঘ্য পর্যন্ত প্রতিটি L চেষ্টা করে স্ট্রিং বানানো: aaaa…-এ O(n²)।'),
    L('Checking only that each string is a repetition, but not that the two prefixes are equal.', 'শুধু প্রতিটি স্ট্রিং পুনরাবৃত্তি কি না দেখা, কিন্তু দুই প্রিফিক্স সমান কি না না দেখা।'),
  ],
  related: [
    { id: '1200E', name: 'Compress Words', why: L('Compare substrings by hash in O(1).', 'হ্যাশ দিয়ে O(১)-এ সাবস্ট্রিং তুলনা।') },
    { id: '1137B', name: 'Camp Schedule', why: L('Periods and borders of a string.', 'স্ট্রিংয়ের পর্যায় আর বর্ডার।') },
  ],
  toolkit: ['gcd-lcm', 'string-basics'],
};

// ───────────────────────────────────────────── 2A
export const p2A: ProblemEntry = {
  id: '2A',
  contestId: 2,
  index: 'A',
  name: 'Winner',
  rating: 1500,
  tags: ['hashing', 'implementation'],
  why: L(
    'Two passes over the same log: the first finds the final scores, the second replays history to break ties. A map from names to scores is the whole data structure.',
    'একই লগের ওপর দুই পাস: প্রথমটি শেষ স্কোর বের করে, দ্বিতীয়টি টাই ভাঙতে ইতিহাস আবার চালায়। নাম থেকে স্কোরের ম্যাপই পুরো ডেটা স্ট্রাকচার।',
  ),
  statement: L(
    'A game has n rounds; each round is “name score”, adding score (possibly negative) to that player. At the end, the winner is the player with the maximum score m. If several players have m, the winner is the one among them who first reached at least m points during the game. At least one player ends with a positive score.',
    'একটি খেলায় n রাউন্ড; প্রতিটি রাউন্ড “নাম স্কোর”, সেই খেলোয়াড়ের সঙ্গে স্কোর (ঋণাত্মকও হতে পারে) যোগ হয়। শেষে বিজয়ী হলো সর্বোচ্চ স্কোর m-এর খেলোয়াড়। কয়েকজনের m হলে তাদের মধ্যে যে খেলার সময় প্রথম অন্তত m পয়েন্টে পৌঁছায় সে বিজয়ী। অন্তত একজনের শেষ স্কোর ধনাত্মক।',
  ),
  input: L('n, then n lines “name score”.', 'n, তারপর n লাইনে “নাম স্কোর”।'),
  output: L('The winner’s name.', 'বিজয়ীর নাম।'),
  limits: { timeSec: 1, memoryMb: 64, notes: [L('n ≤ 1000, |score| ≤ 1000, names of up to 32 letters', 'n ≤ ১০০০, |স্কোর| ≤ ১০০০, নাম বড়জোর ৩২ অক্ষর')] },
  samples: [
    { input: '3\nmike 3\nandrew 5\nmike 2', output: 'andrew', explain: L('Both end with 5; andrew got there in round 2, mike in round 3.', 'দুজনেই ৫-এ শেষ; andrew রাউন্ড ২-এ পৌঁছায়, mike রাউন্ড ৩-এ।') },
    { input: '3\nandrew 3\nandrew 2\nmike 5', output: 'andrew', explain: L('Same idea: andrew reaches 5 first.', 'একই ধারণা: andrew প্রথমে ৫-এ পৌঁছায়।') },
  ],
  observation: L(
    'The tie-break looks at the running score during the game, not at the end. Replay the rounds a second time and stop at the first finalist (a player whose final score is m) whose running score reaches m.',
    'টাই-ব্রেক খেলার সময়ের চলমান স্কোর দেখে, শেষেরটা নয়। রাউন্ডগুলো দ্বিতীয়বার চালান, আর প্রথম যে ফাইনালিস্টের (যার শেষ স্কোর m) চলমান স্কোর m-এ পৌঁছায় সেখানে থামুন।',
  ),
  approach: [
    L('Pass 1: final[name] += score; m = max final.', 'পাস ১: final[নাম] += স্কোর; m = সর্বোচ্চ final।'),
    L('Pass 2: run[name] += score; the first name with final = m and run ≥ m wins.', 'পাস ২: run[নাম] += স্কোর; প্রথম যার final = m আর run ≥ m সে জেতে।'),
  ],
  walkthrough: {
    input: 'mike 3, andrew 5, mike 2',
    steps: [
      { state: 'final: mike 5, andrew 5 → m = 5', text: L('A tie.', 'টাই।') },
      { state: 'replay: mike 3 < 5; andrew 5 ≥ 5', text: L('andrew wins.', 'andrew জেতে।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Two passes of map updates.', 'ম্যাপ আপডেটের দুই পাস।') },
  solutions: [
    {
      id: 'two-pass',
      kind: 'optimal',
      title: L('Final scores, then replay', 'শেষ স্কোর, তারপর আবার চালানো'),
      idea: L('Two maps from name to score.', 'নাম থেকে স্কোরের দুটি ম্যাপ।'),
      explain: [
        L(
          'Store the rounds so you can read them twice. In the replay, a player who does not finish with m is ignored even if they touch m on the way: they lost points later and are not in the tie.',
          'রাউন্ডগুলো জমা রাখুন যাতে দুবার পড়া যায়। আবার চালানোর সময় যে খেলোয়াড় m-এ শেষ করে না, পথে m ছুঁলেও তাকে উপেক্ষা: সে পরে পয়েন্ট হারিয়েছে, টাইয়ে নেই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<string, int>> rounds(n);
    map<string, int> fin;
    for (auto& [name, sc] : rounds) {
        cin >> name >> sc;
        fin[name] += sc;
    }
    int m = INT_MIN;
    for (auto& [name, sc] : fin) m = max(m, sc);
    map<string, int> run;
    for (auto& [name, sc] : rounds) {
        run[name] += sc;
        if (fin[name] == m && run[name] >= m) {  // a finalist reaching m first
            cout << name << "\n";
            return 0;
        }
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'structured-bindings', 'pair'],
    },
    {
      id: 'first-time',
      kind: 'method',
      title: L('Record when each finalist first reaches m', 'প্রতিটি ফাইনালিস্ট কখন প্রথম m-এ পৌঁছায় তা রাখা'),
      idea: L('For each finalist store the first round with running score ≥ m; pick the smallest.', 'প্রতিটি ফাইনালিস্টের জন্য প্রথম রাউন্ড যেখানে চলমান স্কোর ≥ m; ক্ষুদ্রতমটি নেওয়া।'),
      explain: [
        L(
          'The same replay, written as “compute a key for every candidate, take the minimum”. This shape generalises well when ties need several criteria.',
          'একই আবার-চালানো, লেখা হয়েছে “প্রতিটি প্রার্থীর জন্য একটি কী, তারপর ন্যূনতম” হিসেবে। টাই ভাঙতে কয়েকটি মানদণ্ড লাগলে এই গঠন ভালো কাজ করে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> who(n);
    vector<int> sc(n);
    unordered_map<string, int> fin, run, first;
    for (int i = 0; i < n; i++) { cin >> who[i] >> sc[i]; fin[who[i]] += sc[i]; }
    int m = INT_MIN;
    for (auto& kv : fin) m = max(m, kv.second);
    for (int i = 0; i < n; i++) {
        run[who[i]] += sc[i];
        if (fin[who[i]] == m && run[who[i]] >= m && !first.count(who[i])) first[who[i]] = i;
    }
    string best;
    int when = INT_MAX;
    for (auto& [name, i] : first)
        if (i < when) when = i, best = name;
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n) expected',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recompute every score from scratch', 'প্রতিটি স্কোর শুরু থেকে আবার হিসাব'),
      idea: L('After round r, sum each player’s scores over rounds 1 … r with loops.', 'রাউন্ড r-এর পর লুপ দিয়ে ১ … r রাউন্ডে প্রতিটি খেলোয়াড়ের স্কোর যোগ।'),
      explain: [L('No maps, just vectors and repeated sums. O(n³), a slow but independent reference.', 'কোনো ম্যাপ নেই, শুধু ভেক্টর আর বারবার যোগ। O(n³), ধীর কিন্তু স্বাধীন রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> who(n);
    vector<int> sc(n);
    for (int i = 0; i < n; i++) cin >> who[i] >> sc[i];
    auto score = [&](const string& p, int upto) {  // score of p after rounds 0..upto-1
        int s = 0;
        for (int i = 0; i < upto; i++) if (who[i] == p) s += sc[i];
        return s;
    };
    int m = INT_MIN;
    for (int i = 0; i < n; i++) m = max(m, score(who[i], n));
    for (int r = 1; r <= n; r++)
        for (int i = 0; i < n; i++)
            if (score(who[i], n) == m && score(who[i], r) >= m) {
                cout << who[i] << "\n";
                return 0;
            }
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '3\nmike 3\nandrew 5\nmike 2', output: 'andrew', source: 'sample', note: sample(1) },
    { input: '3\nandrew 3\nandrew 2\nmike 5', output: 'andrew', source: 'sample', note: sample(2) },
    { input: '4\na 10\nb 5\na -5\nb 0', output: 'a', source: 'own', note: L('b reaches 5 in round 2 but a already had 10 ≥ 5 in round 1.', 'b রাউন্ড ২-এ ৫-এ পৌঁছায়, কিন্তু a রাউন্ড ১-এই ১০ ≥ ৫ ছিল।') },
    { input: '3\nx 7\ny 7\nx -7', output: 'y', source: 'own', note: L('x touched 7 first but did not finish with it.', 'x প্রথমে ৭ ছুঁয়েছিল কিন্তু ৭-এ শেষ করেনি।') },
  ],
  pitfalls: [
    L('Tie-breaking by “first to reach exactly m” instead of “at least m”.', '“অন্তত m”-এর বদলে “ঠিক m”-এ প্রথম পৌঁছানো দিয়ে টাই ভাঙা।'),
    L('Letting a non-finalist who passed m early win the replay.', 'যে আগে m পেরিয়ে পরে নেমে গেছে তাকে জিততে দেওয়া।'),
  ],
  related: [
    { id: '4C', name: 'Registration System', why: L('A map from names to counters.', 'নাম থেকে কাউন্টারের ম্যাপ।') },
    { id: '1527C', name: 'Sequence Pair Weight', why: L('Maps that carry running sums.', 'চলমান যোগফল বহন করা ম্যাপ।') },
  ],
  toolkit: ['map'],
};

// ───────────────────────────────────────────── 1527C
export const p1527C: ProblemEntry = {
  id: '1527C',
  contestId: 1527,
  index: 'C',
  name: 'Sequence Pair Weight',
  rating: 1600,
  tags: ['hashing', 'implementation', 'math'],
  why: L(
    'Contribution counting: instead of summing over subsegments, ask how many subsegments contain each equal pair. A hash map then carries “sum of earlier positions” per value.',
    'অবদান গণনা: সাবসেগমেন্টের ওপর যোগ না করে জিজ্ঞেস করুন প্রতিটি সমান জোড়া কতগুলো সাবসেগমেন্টে আছে। তারপর একটি হ্যাশ ম্যাপ প্রতিটি মানের জন্য “আগের অবস্থানগুলোর যোগফল” বহন করে।',
  ),
  statement: L(
    'The weight of a sequence is the number of pairs of indices i < j with equal values. Given a₁ … aₙ, find the sum of the weights of all its subsegments.',
    'একটি অনুক্রমের ওজন হলো সমান মানের সূচক-জোড়া i < j-এর সংখ্যা। a₁ … aₙ দেওয়া; এর সব সাবসেগমেন্টের ওজনের যোগফল বের করুন।',
  ),
  input: L('t test cases; each has n and a₁ … aₙ.', 't-টি টেস্ট কেস; প্রতিটিতে n আর a₁ … aₙ।'),
  output: L('For each test, the total weight.', 'প্রতিটি টেস্টে মোট ওজন।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('sum of n ≤ 10⁵, aᵢ ≤ 10⁹', 'n-এর যোগফল ≤ ১০⁵, aᵢ ≤ ১০⁹')] },
  samples: [
    {
      input: '2\n4\n1 2 1 1\n4\n1 2 3 4',
      output: '6\n0',
      explain: L('Pairs (1,3), (1,4), (3,4) appear in 2, 1 and 3 subsegments: 6.', 'জোড়া (১,৩), (১,৪), (৩,৪) যথাক্রমে ২, ১ আর ৩টি সাবসেগমেন্টে: ৬।'),
    },
  ],
  observation: L(
    'An equal pair i < j (1-indexed) lies in every subsegment [l, r] with l ≤ i and r ≥ j: i · (n − j + 1) of them. So the answer is Σ over equal pairs of i · (n − j + 1) = Σⱼ (n − j + 1) · (sum of earlier positions with value aⱼ).',
    'একটি সমান জোড়া i < j (১-সূচক) প্রতিটি সাবসেগমেন্ট [l, r]-এ আছে যেখানে l ≤ i আর r ≥ j: এমন i · (n − j + ১)টি। তাই উত্তর = সমান জোড়াগুলোর ওপর Σ i · (n − j + ১) = Σⱼ (n − j + ১) · (aⱼ মানের আগের অবস্থানগুলোর যোগফল)।',
  ),
  approach: [
    L('Scan j from left to right.', 'j বাম থেকে ডানে স্ক্যান।'),
    L('ans += sum[aⱼ] · (n − j + 1), then sum[aⱼ] += j.', 'ans += sum[aⱼ] · (n − j + ১), তারপর sum[aⱼ] += j।'),
  ],
  walkthrough: {
    input: '1 2 1 1',
    steps: [
      { state: 'j=1 (1): sum[1]=0 → +0; sum[1]=1', text: L('Nothing earlier.', 'আগে কিছু নেই।') },
      { state: 'j=3 (1): +1·2 = 2; sum[1]=4', text: L('Pair (1,3) in 1·2 subsegments.', 'জোড়া (১,৩) ১·২টি সাবসেগমেন্টে।') },
      { state: 'j=4 (1): +4·1 = 4; total 6', text: L('Pairs (1,4) and (3,4): 1 + 3.', 'জোড়া (১,৪) আর (৩,৪): ১ + ৩।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One map lookup per element.', 'প্রতি উপাদানে একটি ম্যাপ খোঁজা।') },
  solutions: [
    {
      id: 'contribution',
      kind: 'optimal',
      title: L('Contribution of each pair, with a map of position sums', 'প্রতিটি জোড়ার অবদান, অবস্থান-যোগফলের ম্যাপসহ'),
      idea: L('Σⱼ (n − j + 1) · Σ{i < j, aᵢ = aⱼ} i.', 'Σⱼ (n − j + ১) · Σ{i < j, aᵢ = aⱼ} i।'),
      explain: [
        L(
          'Swapping the order of summation is the most useful trick in counting problems. The answer can reach about n⁴ / 24 ≈ 4·10¹⁸ for n = 10⁵ (all equal), which still fits in long long.',
          'যোগের ক্রম বদলানো গণনা প্রবলেমের সবচেয়ে কাজের কৌশল। n = ১০⁵ (সব সমান) হলে উত্তর প্রায় n⁴ / ২৪ ≈ ৪·১০¹⁸ পর্যন্ত যায়, যা এখনো long long-এ আঁটে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        map<int, long long> sum;  // value -> sum of earlier 1-based positions
        long long ans = 0;
        for (int j = 1; j <= n; j++) {
            int a;
            scanf("%d", &a);
            long long& s = sum[a];
            ans += s * (n - j + 1);  // every earlier i pairs with j in i * (n - j + 1) segments
            s += j;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'long-long'],
    },
    {
      id: 'compress',
      kind: 'method',
      title: L('Coordinate compression instead of a map', 'ম্যাপের বদলে কোঅর্ডিনেট কম্প্রেশন'),
      idea: L('Replace values by their rank so a plain vector holds the sums.', 'মানগুলোকে তাদের ক্রম দিয়ে বদলালে একটি সাধারণ ভেক্টরে যোগফল রাখা যায়।'),
      explain: [
        L(
          'Sort a copy, remove duplicates, and look each value up with lower_bound. The per-element work becomes an array access, which is the fastest “hash map” there is.',
          'একটি কপি সাজিয়ে পুনরাবৃত্তি বাদ দিন, আর lower_bound দিয়ে প্রতিটি মান খুঁজুন। প্রতি উপাদানের কাজ হয়ে যায় অ্যারে অ্যাক্সেস, যা সবচেয়ে দ্রুত “হ্যাশ ম্যাপ”।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        vector<int> vals = a;
        sort(vals.begin(), vals.end());
        vals.erase(unique(vals.begin(), vals.end()), vals.end());
        vector<long long> sum(vals.size(), 0);
        long long ans = 0;
        for (int j = 1; j <= n; j++) {
            int id = lower_bound(vals.begin(), vals.end(), a[j - 1]) - vals.begin();
            ans += sum[id] * (n - j + 1);
            sum[id] += j;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'lower-bound'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every pair, counted directly', 'প্রতিটি জোড়া, সরাসরি গোনা'),
      idea: L('For every equal pair add i · (n − j + 1).', 'প্রতিটি সমান জোড়ায় i · (n − j + ১) যোগ।'),
      explain: [L('O(n²) pairs; correct but too slow for 10⁵. The stress reference.', 'O(n²) জোড়া; সঠিক কিন্তু ১০⁵-এর জন্য ধীর। স্ট্রেস রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        long long ans = 0;
        for (int i = 1; i <= n; i++)
            for (int j = i + 1; j <= n; j++)
                if (a[i] == a[j]) ans += (long long)i * (n - j + 1);
        cout << ans << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '2\n4\n1 2 1 1\n4\n1 2 3 4', output: '6\n0', source: 'sample', note: sample(1) },
    { input: '1\n3\n5 5 5', output: '5', source: 'own', note: L('Pairs (1,2): 2, (1,3): 1, (2,3): 2.', 'জোড়া (১,২): ২, (১,৩): ১, (২,৩): ২।') },
  ],
  pitfalls: [
    L('Summing over all O(n²) subsegments.', 'সব O(n²) সাবসেগমেন্টের ওপর যোগ।'),
    L('Using int for position sums: they reach about 5·10⁹.', 'অবস্থান-যোগফলে int: সেগুলো প্রায় ৫·১০⁹-এ পৌঁছায়।'),
  ],
  related: [
    { id: '1899D', name: 'Yarik and Musical Notes', why: L('Counting equal pairs with a map.', 'ম্যাপে সমান জোড়া গোনা।') },
    { id: '1520D', name: 'Same Differences', why: L('Pairs counted by scanning and looking back.', 'স্ক্যান করে পেছনে তাকিয়ে জোড়া গোনা।') },
  ],
  toolkit: ['map', 'long-long'],
};
