import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p550B: ProblemEntry = {
  id: '550B',
  contestId: 550,
  index: 'B',
  name: 'Preparing Olympiad',
  rating: 1400,
  tags: ['bitmasks', 'brute-force'],
  featuredFor: ['bitmasks'],
  why: L('The textbook use of a bitmask: n ≤ 15 means you can try every subset.', 'বিটমাস্কের পাঠ্যবইয়ের ব্যবহার: n ≤ ১৫ মানে প্রতিটি সাবসেট চেষ্টা করা যায়।'),
  statement: L(
    'There are n problems with difficulties cᵢ. Count the sets of at least two problems whose total difficulty is between l and r and whose hardest and easiest problems differ by at least x.',
    'cᵢ কঠিনতার n-টি প্রবলেম আছে। অন্তত দুটি প্রবলেমের এমন সেট গুনুন যাদের মোট কঠিনতা l আর r-এর মধ্যে আর যাদের সবচেয়ে কঠিন ও সবচেয়ে সহজ প্রবলেমের পার্থক্য অন্তত x।',
  ),
  input: L('n l r x, then c₁ … cₙ.', 'n l r x, তারপর c₁ … cₙ।'),
  output: L('The number of valid sets.', 'বৈধ সেটের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 15, l ≤ r ≤ 10⁹, cᵢ ≤ 10⁶', 'n ≤ ১৫, l ≤ r ≤ ১০⁹, cᵢ ≤ ১০⁶')] },
  samples: [
    { input: '3 5 6 1\n1 2 3', output: '2', explain: L('{2, 3} and {1, 2, 3}.', '{২, ৩} আর {১, ২, ৩}।') },
    { input: '4 40 50 10\n10 20 30 25', output: '2', explain: L('{10, 30} and {20, 30}.', '{১০, ৩০} আর {২০, ৩০}।') },
    { input: '5 25 35 10\n10 10 20 10 20', output: '6', explain: L('Any one 10 with any one 20.', 'যেকোনো একটি ১০ আর যেকোনো একটি ২০।') },
  ],
  observation: L('2¹⁵ = 32768 subsets, each checked in O(n): about 5·10⁵ operations. Bit i of the mask says whether problem i is in the set.', '২¹⁵ = ৩২৭৬৮টি সাবসেট, প্রতিটি O(n)-এ যাচাই: প্রায় ৫·১০⁵ অপারেশন। মাস্কের বিট i বলে প্রবলেম i সেটে আছে কি না।'),
  approach: [L('For mask in [0, 2ⁿ): collect sum, min, max and size of the chosen problems; test the three conditions.', '[০, ২ⁿ)-এর প্রতিটি mask-এর জন্য: বাছাই করা প্রবলেমের যোগফল, min, max আর আকার জড়ো করে তিনটি শর্ত যাচাই।')],
  walkthrough: { input: '1 2 3, mask = 110₂', steps: [{ state: 'problems {2, 3}: sum 5, max − min = 1', text: L('5 ∈ [5, 6], 1 ≥ 1: counted.', '৫ ∈ [৫, ৬], ১ ≥ ১: গোনা হলো।') }] },
  complexity: { time: 'O(2ⁿ · n)', space: 'O(n)', why: L('Every subset once.', 'প্রতিটি সাবসেট একবার।') },
  solutions: [
    {
      id: 'mask',
      kind: 'optimal',
      title: L('Enumerate subsets as bitmasks', 'বিটমাস্ক হিসেবে সাবসেট গণনা'),
      idea: L('mask >> i & 1 tests membership.', 'mask >> i & ১ সদস্যপদ পরীক্ষা করে।'),
      explain: [L('The loop over masks replaces n nested “take or skip” loops. __builtin_popcount(mask) gives the set size directly.', 'মাস্কের লুপ n-টি নেস্টেড “নাও বা বাদ দাও” লুপের জায়গা নেয়। __builtin_popcount(mask) সরাসরি সেটের আকার দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long l, r, x;
    cin >> n >> l >> r >> x;
    vector<long long> c(n);
    for (auto& v : c) cin >> v;
    int ways = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (__builtin_popcount(mask) < 2) continue;
        long long sum = 0, lo = LLONG_MAX, hi = LLONG_MIN;
        for (int i = 0; i < n; i++)
            if (mask >> i & 1) { sum += c[i]; lo = min(lo, c[i]); hi = max(hi, c[i]); }
        if (l <= sum && sum <= r && hi - lo >= x) ways++;
    }
    cout << ways << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bit-shift', 'popcount', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Recursive take-or-skip', 'রিকার্সিভ নাও-বা-বাদ দাও'),
      idea: L('Decide for each problem whether to include it, carrying sum, min, max and count.', 'প্রতিটি প্রবলেম নেওয়া হবে কি না ঠিক করুন, যোগফল, min, max আর গণনা সঙ্গে নিয়ে।'),
      explain: [L('The same 2ⁿ leaves, reached through recursion instead of a counter. Recursion is the natural form when you want to prune (for example, stop once the sum exceeds r).', 'একই ২ⁿ-টি পাতা, কাউন্টারের বদলে রিকার্শনে পৌঁছানো। ছাঁটাই করতে চাইলে (যেমন যোগফল r ছাড়ালে থামা) রিকার্শনই স্বাভাবিক রূপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
long long l, r, x, c[20];
int ways = 0;

void go(int i, long long sum, long long lo, long long hi, int cnt) {
    if (sum > r) return;  // sums only grow
    if (i == n) {
        if (cnt >= 2 && sum >= l && hi - lo >= x) ways++;
        return;
    }
    go(i + 1, sum, lo, hi, cnt);
    go(i + 1, sum + c[i], min(lo, c[i]), max(hi, c[i]), cnt + 1);
}

int main() {
    cin >> n >> l >> r >> x;
    for (int i = 0; i < n; i++) cin >> c[i];
    go(0, 0, LLONG_MAX, LLONG_MIN, 0);
    cout << ways << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'min-max'],
    },
  ],
  tests: [
    { input: '3 5 6 1\n1 2 3', output: '2', source: 'sample', note: sample(1) },
    { input: '4 40 50 10\n10 20 30 25', output: '2', source: 'sample', note: sample(2) },
    { input: '5 25 35 10\n10 10 20 10 20', output: '6', source: 'sample', note: sample(3) },
    { input: '1 1 10 0\n5', output: '0', source: 'own', note: L('A single problem is never enough.', 'একটি প্রবলেম কখনো যথেষ্ট নয়।') },
  ],
  pitfalls: [L('Counting sets of size 1.', '১ আকারের সেট গোনা।'), L('Writing 1 << n with n near 31 in int.', 'int-এ ৩১-এর কাছের n-এ 1 << n লেখা।')],
  related: [{ id: '1097B', name: 'Petr and Combination Lock', why: L('Another “try every subset” problem.', 'আরেকটি “প্রতিটি সাবসেট চেষ্টা” প্রবলেম।') }],
  toolkit: ['bit-shift', 'popcount'],
};

export const p579A: ProblemEntry = {
  id: '579A',
  contestId: 579,
  index: 'A',
  name: 'Raising Bacteria',
  rating: 1000,
  tags: ['bitmasks'],
  why: L('Doubling every night means each added bacterium becomes a power of two: the answer is the popcount.', 'প্রতি রাতে দ্বিগুণ মানে প্রতিটি যোগ করা ব্যাকটেরিয়া দুইয়ের একটি ঘাত হয়: উত্তর হলো popcount।'),
  statement: L('The box starts empty. Each morning you may add any number of bacteria; each night every bacterium splits into two. What is the minimum total number you must add to see exactly x bacteria at some moment?', 'বাক্স খালি থেকে শুরু হয়। প্রতি সকালে যত খুশি ব্যাকটেরিয়া যোগ করা যায়; প্রতি রাতে প্রতিটি ব্যাকটেরিয়া দুটি হয়। কোনো এক মুহূর্তে ঠিক x-টি ব্যাকটেরিয়া দেখতে মোট সর্বনিম্ন কতটি যোগ করতে হবে?'),
  input: L('x.', 'x।'),
  output: L('The minimum number of bacteria to add.', 'যোগ করার সর্বনিম্ন ব্যাকটেরিয়ার সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ x ≤ 10⁹', '১ ≤ x ≤ ১০⁹')] },
  samples: [
    { input: '5', output: '2', explain: L('Add 1, wait two nights (4), add 1.', '১ যোগ, দুই রাত অপেক্ষা (৪), ১ যোগ।') },
    { input: '8', output: '1', explain: L('Add 1 and wait three nights.', '১ যোগ করে তিন রাত অপেক্ষা।') },
  ],
  observation: L('A bacterium added k nights before the end contributes 2ᵏ. So x is written as a sum of powers of two, and the fewest terms is its binary representation: the number of 1 bits.', 'শেষের k রাত আগে যোগ করা একটি ব্যাকটেরিয়া ২ᵏ দেয়। তাই x-কে দুইয়ের ঘাতের যোগফল হিসেবে লেখা হয়, আর সবচেয়ে কম পদ হলো তার বাইনারি রূপ: ১ বিটের সংখ্যা।'),
  approach: [L('Print popcount(x).', 'popcount(x) প্রিন্ট।')],
  walkthrough: { input: '5 = 101₂', steps: [{ state: 'two 1 bits', text: L('Answer 2.', 'উত্তর ২।') }] },
  complexity: { time: 'O(log x)', space: 'O(1)', why: L('One pass over the bits.', 'বিটগুলোর ওপর একবার।') },
  solutions: [
    {
      id: 'popcount',
      kind: 'optimal',
      title: L('Built-in popcount', 'বিল্ট-ইন popcount'),
      idea: L('__builtin_popcount(x).', '__builtin_popcount(x)।'),
      explain: [L('Recognising “sum of distinct powers of two” as binary is the whole problem.', '“দুইয়ের আলাদা ঘাতের যোগফল”-কে বাইনারি হিসেবে চেনাই পুরো প্রবলেম।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << __builtin_popcount(x) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['popcount'],
    },
    {
      id: 'loop',
      kind: 'method',
      title: L('Peel off the lowest bit', 'সবচেয়ে নিচের বিট খুলে ফেলা'),
      idea: L('x & 1 then x >>= 1, or x &= x − 1.', 'x & ১ তারপর x >>= ১, অথবা x &= x − ১।'),
      explain: [L('x &= x − 1 clears the lowest set bit, so the loop runs once per 1 bit (Kernighan’s trick).', 'x &= x − ১ সবচেয়ে নিচের সেট বিট মোছে, তাই লুপ প্রতিটি ১ বিটে একবার চলে (কার্নিহানের কৌশল)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    int bits = 0;
    while (x) { x &= x - 1; bits++; }
    cout << bits << "\n";
    return 0;
}
`,
      time: 'O(log x)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'while-n'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP over counts', 'গণনার ওপর DP'),
      idea: L('best[v] = min added to have v: either add one to v − 1, or v is even and came from v / 2 overnight.', 'best[v] = v পেতে সর্বনিম্ন যোগ: হয় v − ১-এ একটি যোগ, নয়তো v জোড় আর রাতে v / ২ থেকে এসেছে।'),
      explain: [L('A DP that knows nothing about binary. It reproduces popcount on every x it can afford, which is a good way to convince yourself of the observation.', 'বাইনারি সম্পর্কে কিছু না জানা একটি DP। সাধ্যমতো প্রতিটি x-এ এটি popcount ফিরিয়ে দেয়, যা পর্যবেক্ষণটি বিশ্বাস করার ভালো উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    if (x > 20000000) { cout << "\n"; return 0; }
    vector<int> best(x + 1);
    best[0] = 0;
    for (int v = 1; v <= x; v++) {
        best[v] = best[v - 1] + 1;
        if (v % 2 == 0) best[v] = min(best[v], best[v / 2]);
    }
    cout << best[x] << "\n";
    return 0;
}
`,
      time: 'O(x)',
      space: 'O(x)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '5', output: '2', source: 'sample', note: sample(1) },
    { input: '8', output: '1', source: 'sample', note: sample(2) },
    { input: '1000000000', output: '13', source: 'own', note: L('Largest x.', 'সবচেয়ে বড় x।') },
  ],
  pitfalls: [L('Thinking you may remove bacteria.', 'ব্যাকটেরিয়া সরানো যায় ভাবা।')],
  related: [{ id: '1420B', name: 'Rock and Lever', why: L('Reasoning about individual bits.', 'আলাদা বিট নিয়ে যুক্তি।') }],
  toolkit: ['popcount'],
};

export const p1420B: ProblemEntry = {
  id: '1420B',
  contestId: 1420,
  index: 'B',
  name: 'Rock and Lever',
  rating: 1200,
  tags: ['bitmasks', 'math'],
  why: L('a & b ≥ a ^ b exactly when a and b have the same highest bit.', 'a & b ≥ a ^ b ঠিক তখনই যখন a আর b-এর সবচেয়ে উঁচু বিট একই।'),
  statement: L('Count pairs i < j with aᵢ & aⱼ ≥ aᵢ ^ aⱼ. There are t test cases.', 'i < j এমন জোড়া গুনুন যেখানে aᵢ & aⱼ ≥ aᵢ ^ aⱼ। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The number of pairs.', 'জোড়ার সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 10⁵, aᵢ ≤ 10⁹', 'Σ n ≤ ১০⁵, aᵢ ≤ ১০⁹')] },
  samples: [{ input: '5\n5\n1 4 3 7 10\n3\n1 1 1\n4\n6 2 5 3\n2\n2 4\n1\n1', output: '1\n3\n2\n0\n0', explain: L('First test: only (4, 7), both with highest bit 2.', 'প্রথম টেস্ট: শুধু (৪, ৭), দুটিরই সবচেয়ে উঁচু বিট ২।') }],
  observation: L('Compare & and ^ from the top bit down. At the highest bit where either number has a 1: if both have it, & has it and ^ does not, so & wins; if only one has it, ^ wins. So the condition is “same highest set bit”.', 'ওপরের বিট থেকে নিচে & আর ^ তুলনা করুন। যেকোনো সংখ্যার ১ থাকা সবচেয়ে উঁচু বিটে: দুটিরই থাকলে &-এর আছে আর ^-এর নেই, তাই & জেতে; একটির থাকলে ^ জেতে। তাই শর্তটি হলো “একই সবচেয়ে উঁচু সেট বিট”।'),
  approach: [L('Bucket numbers by __lg(a); add c·(c − 1)/2 per bucket.', '__lg(a) অনুযায়ী সংখ্যা ভাগ করে প্রতি ভাগে c·(c − ১)/২ যোগ।')],
  walkthrough: { input: '6 2 5 3', steps: [{ state: 'highest bits 2, 1, 2, 1', text: L('Buckets of size 2 and 2: 1 + 1 = 2.', '২ আর ২ আকারের ভাগ: ১ + ১ = ২।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('31 buckets.', '৩১টি ভাগ।') },
  solutions: [
    {
      id: 'buckets',
      kind: 'optimal',
      title: L('Count by highest bit', 'সবচেয়ে উঁচু বিট অনুযায়ী গোনা'),
      idea: L('Pairs inside a bucket: c choose 2.', 'একটি ভাগের ভেতরে জোড়া: c থেকে ২ বাছাই।'),
      explain: [L('Up to 10⁵ equal-bucket numbers give ~5·10⁹ pairs: long long. __lg(x) is the index of the highest set bit.', 'একই ভাগে ১০⁵ পর্যন্ত সংখ্যা ~৫·১০⁹ জোড়া দেয়: long long। __lg(x) সবচেয়ে উঁচু সেট বিটের ইনডেক্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        long long cnt[32] = {};
        for (int i = 0; i < n; i++) {
            int a;
            scanf("%d", &a);
            cnt[__lg(a)]++;
        }
        long long pairs = 0;
        for (long long c : cnt) pairs += c * (c - 1) / 2;
        printf("%lld\n", pairs);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'long-long', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every pair', 'প্রতিটি জোড়া দেখা'),
      idea: L('Evaluate the condition directly.', 'শর্তটি সরাসরি মূল্যায়ন।'),
      explain: [L('O(n²) is too slow for n = 10⁵ but makes the claim easy to test. Note the parentheses: & and ^ bind weaker than ≥ in C++.', 'n = ১০⁵-এ O(n²) খুব ধীর কিন্তু দাবিটি পরীক্ষা সহজ করে। বন্ধনী লক্ষ করুন: C++-এ & আর ^ ≥-এর চেয়ে দুর্বলভাবে বাঁধে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        long long pairs = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if ((a[i] & a[j]) >= (a[i] ^ a[j])) pairs++;
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bitwise-and'],
    },
  ],
  tests: [{ input: '5\n5\n1 4 3 7 10\n3\n1 1 1\n4\n6 2 5 3\n2\n2 4\n1\n1', output: '1\n3\n2\n0\n0', source: 'sample', note: sample(1) }],
  pitfalls: [L('Writing a[i] & a[j] >= a[i] ^ a[j] without parentheses.', 'বন্ধনী ছাড়া a[i] & a[j] >= a[i] ^ a[j] লেখা।'), L('int overflow in the count.', 'গণনায় int ওভারফ্লো।')],
  related: [{ id: '1615B', name: 'And It’s Non-Zero', why: L('Per-bit reasoning on many numbers.', 'অনেক সংখ্যায় বিট ধরে যুক্তি।') }],
  toolkit: ['bit-shift'],
};

export const p1615B: ProblemEntry = {
  id: '1615B',
  contestId: 1615,
  index: 'B',
  name: "And It's Non-Zero",
  rating: 1300,
  tags: ['bitmasks', 'greedy', 'math'],
  why: L('An AND is non-zero iff some bit survives everywhere: keep the numbers sharing the most popular bit.', 'একটি AND শূন্য নয় ঠিক তখনই যখন কোনো বিট সবখানে টিকে থাকে: সবচেয়ে জনপ্রিয় বিট ভাগ করা সংখ্যাগুলো রাখুন।'),
  statement: L('Take the array [l, l + 1, …, r]. Find the minimum number of elements to delete so that the bitwise AND of the rest is non-zero. There are t test cases.', '[l, l + ১, …, r] অ্যারেটি নিন। সর্বনিম্ন কয়টি উপাদান মুছলে বাকিদের বিটওয়াইজ AND শূন্য নয় হয়? t-টি টেস্ট কেস আছে।'),
  input: L('t, then l r for each test.', 't, তারপর প্রতিটি টেস্টের l r।'),
  output: L('The minimum number of deletions.', 'সর্বনিম্ন মোছার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('t ≤ 10⁴, 1 ≤ l ≤ r ≤ 2·10⁵', 't ≤ ১০⁴, ১ ≤ l ≤ r ≤ ২·১০⁵')] },
  samples: [{ input: '5\n1 2\n2 8\n4 5\n1 5\n100000 200000', output: '1\n3\n0\n2\n31072', explain: L('2..8: bit 1 is set in 2, 3, 6, 7 (four numbers), so delete the other three.', '২..৮: বিট ১ সেট আছে ২, ৩, ৬, ৭-এ (চারটি), তাই বাকি তিনটি মুছুন।') }],
  observation: L('The AND is non-zero iff some bit b is set in every kept number. For a fixed b, keep exactly the numbers with bit b: delete (r − l + 1) − count_b. Minimise over b.', 'কোনো বিট b প্রতিটি রাখা সংখ্যায় সেট থাকলেই AND শূন্য নয়। একটি নির্দিষ্ট b-এর জন্য ঠিক বিট b থাকা সংখ্যাগুলো রাখুন: (r − l + ১) − count_b মুছুন। b-এর ওপর সর্বনিম্ন করুন।'),
  approach: [L('Prefix counts pre[b][i] = how many of 1..i have bit b; count_b = pre[b][r] − pre[b][l − 1].', 'প্রিফিক্স গণনা pre[b][i] = ১..i-এর কয়টিতে বিট b; count_b = pre[b][r] − pre[b][l − ১]।')],
  walkthrough: { input: '1 5', steps: [{ state: 'bit 0: 1, 3, 5 → 3; bit 1: 2, 3 → 2; bit 2: 4, 5 → 2', text: L('Keep 3, delete 2.', '৩টি রাখুন, ২টি মুছুন।') }] },
  complexity: { time: 'O(18 · (N + t))', space: 'O(18 · N)', why: L('Precomputed table, O(18) per query.', 'আগে হিসাব করা টেবিল, প্রতি কোয়েরিতে O(১৮)।') },
  solutions: [
    {
      id: 'prefix',
      kind: 'optimal',
      title: L('Prefix counts per bit', 'বিট প্রতি প্রিফিক্স গণনা'),
      idea: L('18 bits cover 2·10⁵.', '১৮টি বিট ২·১০⁵ ঢাকে।'),
      explain: [L('With up to 10⁴ queries, scanning [l, r] each time would be 2·10⁹ steps; the prefix table answers each in O(18).', '১০⁴ পর্যন্ত কোয়েরিতে প্রতিবার [l, r] স্ক্যান করলে ২·১০⁹ ধাপ হতো; প্রিফিক্স টেবিল প্রতিটির উত্তর O(১৮)-এ দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int N = 200000, B = 18;
int pre[B][N + 1];

int main() {
    for (int b = 0; b < B; b++)
        for (int i = 1; i <= N; i++) pre[b][i] = pre[b][i - 1] + (i >> b & 1);
    int t;
    scanf("%d", &t);
    while (t--) {
        int l, r;
        scanf("%d %d", &l, &r);
        int keep = 0;
        for (int b = 0; b < B; b++) keep = max(keep, pre[b][r] - pre[b][l - 1]);
        printf("%d\n", (r - l + 1) - keep);
    }
    return 0;
}
`,
      time: 'O(18 · (N + t))',
      space: 'O(18 · N)',
      accepted: true,
      toolkit: ['prefix-sum', 'bit-shift', 'c-io'],
    },
    {
      id: 'formula',
      kind: 'better',
      title: L('Closed-form count of a bit in [0, n]', '[০, n]-এ একটি বিটের সরাসরি গণনা'),
      idea: L('Bit b repeats with period 2ᵇ⁺¹: 2ᵇ zeros then 2ᵇ ones.', 'বিট b ২ᵇ⁺¹ পর্যায়ে ঘোরে: ২ᵇ-টি শূন্য তারপর ২ᵇ-টি এক।'),
      explain: [L('count(n, b) = (n + 1) / 2ᵇ⁺¹ · 2ᵇ + max(0, (n + 1) mod 2ᵇ⁺¹ − 2ᵇ). No table at all, and it works for any r, even 10¹⁸.', 'count(n, b) = (n + ১) / ২ᵇ⁺¹ · ২ᵇ + max(০, (n + ১) mod ২ᵇ⁺¹ − ২ᵇ)। কোনো টেবিল নেই, আর যেকোনো r-এ চলে, এমনকি ১০¹⁸।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long countBit(long long n, int b) {  // numbers in [0, n] with bit b set
    long long period = 1LL << (b + 1), half = 1LL << b;
    return (n + 1) / period * half + max(0LL, (n + 1) % period - half);
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long l, r;
        scanf("%lld %lld", &l, &r);
        long long keep = 0;
        for (int b = 0; b < 31; b++) keep = max(keep, countBit(r, b) - countBit(l - 1, b));
        printf("%lld\n", (r - l + 1) - keep);
    }
    return 0;
}
`,
      time: 'O(31 · t)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'modulo', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Scan the range for each bit', 'প্রতিটি বিটের জন্য পরিসর স্ক্যান'),
      idea: L('Count directly with a loop.', 'লুপ দিয়ে সরাসরি গোনা।'),
      explain: [L('Correct and simple, O((r − l) · 18) per query: fine for one query, too slow for 10⁴ of them.', 'সঠিক আর সরল, প্রতি কোয়েরিতে O((r − l) · ১৮): একটি কোয়েরিতে ঠিক, ১০⁴টিতে খুব ধীর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int l, r;
        cin >> l >> r;
        int keep = 0;
        for (int b = 0; b < 18; b++) {
            int c = 0;
            for (int v = l; v <= r; v++) c += v >> b & 1;
            keep = max(keep, c);
        }
        cout << (r - l + 1) - keep << "\n";
    }
    return 0;
}
`,
      time: 'O(18 · (r − l))',
      space: 'O(1)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '5\n1 2\n2 8\n4 5\n1 5\n100000 200000', output: '1\n3\n0\n2\n31072', source: 'sample', note: sample(1) },
    { input: '1\n7 7', output: '0', source: 'own', note: L('A single number is non-zero.', 'একটি সংখ্যা শূন্য নয়।') },
  ],
  pitfalls: [L('Trying to keep numbers sharing different bits.', 'আলাদা বিট ভাগ করা সংখ্যা রাখার চেষ্টা।')],
  related: [{ id: '1420B', name: 'Rock and Lever', why: L('Bit-by-bit counting.', 'বিট ধরে গণনা।') }],
  toolkit: ['prefix-sum', 'bit-shift'],
};

export const p131C: ProblemEntry = {
  id: '131C',
  contestId: 131,
  index: 'C',
  name: 'The World is a Theatre',
  rating: 1400,
  tags: ['combinatorics', 'math'],
  featuredFor: ['combinatorics'],
  why: L('Split a choice by a parameter and multiply binomials: Σ C(n, i) · C(m, t − i).', 'একটি প্যারামিটার দিয়ে বাছাই ভাগ করে দ্বিপদ গুণ: Σ C(n, i) · C(m, t − i)।'),
  statement: L('There are n boys and m girls. Choose a troupe of exactly t actors with at least 4 boys and at least 1 girl. How many ways?', 'n-জন ছেলে আর m-জন মেয়ে আছে। অন্তত ৪ জন ছেলে আর অন্তত ১ জন মেয়েসহ ঠিক t-জন অভিনেতার একটি দল বাছুন। কত উপায়ে?'),
  input: L('n m t.', 'n m t।'),
  output: L('The number of ways.', 'উপায়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('4 ≤ n ≤ 30, 1 ≤ m ≤ 30, 5 ≤ t ≤ n + m', '৪ ≤ n ≤ ৩০, ১ ≤ m ≤ ৩০, ৫ ≤ t ≤ n + m')] },
  samples: [
    { input: '5 2 5', output: '10', explain: L('4 boys and 1 girl: C(5, 4) · C(2, 1) = 10.', '৪ ছেলে আর ১ মেয়ে: C(৫, ৪) · C(২, ১) = ১০।') },
    { input: '4 3 5', output: '3', explain: L('All 4 boys and 1 of 3 girls.', 'চার ছেলেই আর ৩ মেয়ের ১ জন।') },
  ],
  observation: L('Fix the number of boys i (4 ≤ i ≤ n). Then t − i girls are needed, with 1 ≤ t − i ≤ m. Choices of boys and girls are independent, so multiply, then add over i.', 'ছেলের সংখ্যা i ঠিক করুন (৪ ≤ i ≤ n)। তখন t − i মেয়ে লাগে, যেখানে ১ ≤ t − i ≤ m। ছেলে আর মেয়ে বাছাই স্বাধীন, তাই গুণ করে i-এর ওপর যোগ।'),
  approach: [L('Pascal’s triangle up to 60, then the sum.', '৬০ পর্যন্ত প্যাসকেলের ত্রিভুজ, তারপর যোগফল।')],
  walkthrough: { input: '5 2 5', steps: [{ state: 'i = 4: C(5,4)·C(2,1) = 10; i = 5: t − i = 0 girls, not allowed', text: L('Answer 10.', 'উত্তর ১০।') }] },
  complexity: { time: 'O(N²)', space: 'O(N²)', why: L('A 61 × 61 table.', 'একটি ৬১ × ৬১ টেবিল।') },
  solutions: [
    {
      id: 'pascal',
      kind: 'optimal',
      title: L('Pascal’s triangle and a sum', 'প্যাসকেলের ত্রিভুজ আর একটি যোগফল'),
      idea: L('C[i][j] = C[i − 1][j − 1] + C[i − 1][j].', 'C[i][j] = C[i − ১][j − ১] + C[i − ১][j]।'),
      explain: [L('C(30, 15) ≈ 1.55·10⁸, so a product is about 2.4·10¹⁶ and the sum still fits in long long. Pascal needs only additions, so no overflow from intermediate factorials.', 'C(৩০, ১৫) ≈ ১.৫৫·১০⁸, তাই একটি গুণফল প্রায় ২.৪·১০¹⁶ আর যোগফল তখনও long long-এ আঁটে। প্যাসকেলে শুধু যোগ লাগে, তাই মধ্যবর্তী ফ্যাক্টরিয়ালের ওভারফ্লো নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, t;
    cin >> n >> m >> t;
    long long C[61][61] = {};
    for (int i = 0; i <= 60; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
    long long ways = 0;
    for (int boys = 4; boys <= n; boys++) {
        int girls = t - boys;
        if (girls >= 1 && girls <= m) ways += C[n][boys] * C[m][girls];
    }
    cout << ways << "\n";
    return 0;
}
`,
      time: 'O(60²)',
      space: 'O(60²)',
      accepted: true,
      toolkit: ['long-long', 'for-loop'],
    },
    {
      id: 'multiplicative',
      kind: 'method',
      title: L('Multiplicative binomial', 'গুণনীয় দ্বিপদ'),
      idea: L('C(n, k) = Π (n − k + i) / i, dividing at every step.', 'C(n, k) = Π (n − k + i) / i, প্রতিটি ধাপে ভাগ।'),
      explain: [L('After step i the running value is C(n − k + i, i), an integer, so each division is exact. Useful when you need just a few binomials and no table.', 'ধাপ i-এর পরে চলতি মান C(n − k + i, i), একটি পূর্ণসংখ্যা, তাই প্রতিটি ভাগ নিখুঁত। কয়েকটি দ্বিপদ লাগলে আর টেবিল না চাইলে কাজের।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long binom(int n, int k) {
    if (k < 0 || k > n) return 0;
    long long r = 1;
    for (int i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return r;
}

int main() {
    int n, m, t;
    cin >> n >> m >> t;
    long long ways = 0;
    for (int boys = 4; boys <= n; boys++) {
        int girls = t - boys;
        if (girls >= 1) ways += binom(n, boys) * binom(m, girls);
    }
    cout << ways << "\n";
    return 0;
}
`,
      time: 'O(n · t)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions', 'long-long'],
    },
  ],
  tests: [
    { input: '5 2 5', output: '10', source: 'sample', note: sample(1) },
    { input: '4 3 5', output: '3', source: 'sample', note: sample(2) },
    { input: '30 30 30', output: '118264581548187697', source: 'own', note: L('Largest case.', 'সবচেয়ে বড় ক্ষেত্র।') },
  ],
  pitfalls: [L('Computing C(60, 30) as C(n+m, t) minus bad cases with factorials and overflowing.', 'ফ্যাক্টরিয়াল দিয়ে C(৬০, ৩০) বিয়োগ খারাপ ক্ষেত্র হিসাব করে ওভারফ্লো।')],
  related: [{ id: '1475E', name: 'Advertising Agency', why: L('Binomials in a counting problem.', 'গণনার প্রবলেমে দ্বিপদ।') }],
  toolkit: ['long-long'],
};

export const p1475E: ProblemEntry = {
  id: '1475E',
  contestId: 1475,
  index: 'E',
  name: 'Advertising Agency',
  rating: 1600,
  tags: ['combinatorics', 'math', 'sortings'],
  why: L('The best set is forced except for ties at the cut-off value: count those with one binomial.', 'সেরা সেট বাধ্যতামূলক, শুধু কাট-অফ মানের সমতা ছাড়া: একটি দ্বিপদ দিয়ে সেগুলো গুনুন।'),
  statement: L('There are n bloggers, blogger i has aᵢ followers. Choose exactly k bloggers with the maximum total followers. In how many ways, modulo 10⁹ + 7? There are t test cases.', 'n-জন ব্লগার আছে, ব্লগার i-এর aᵢ ফলোয়ার। সর্বোচ্চ মোট ফলোয়ারসহ ঠিক k-জন ব্লগার বাছুন। কত উপায়ে, ১০⁹ + ৭ মডুলো? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n k and the array.', 't; প্রতিটি টেস্টে n k আর অ্যারে।'),
  output: L('The number of ways mod 10⁹ + 7.', 'উপায়ের সংখ্যা mod ১০⁹ + ৭।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 1000, aᵢ ≤ n', 'Σ n ≤ ১০০০, aᵢ ≤ n')] },
  samples: [{ input: '3\n4 3\n1 3 1 2\n4 2\n1 1 1 1\n2 1\n1 2', output: '2\n6\n1', explain: L('1 3 1 2, k = 3: take 3, 2 and either 1: 2 ways.', '১ ৩ ১ ২, k = ৩: ৩, ২ আর যেকোনো একটি ১: ২ উপায়।') }],
  observation: L('Sort descending; the k-th value v is the cut-off. Every value above v must be taken. Among the cnt bloggers equal to v, exactly need of them are in the top k, and any need of the cnt work: C(cnt, need).', 'বড় থেকে সর্ট; k-তম মান v হলো কাট-অফ। v-এর বড় প্রতিটি মান নিতেই হবে। v-এর সমান cnt-জন ব্লগারের ঠিক need-জন সেরা k-তে আছে, আর cnt-এর যেকোনো need-জন চলে: C(cnt, need)।'),
  approach: [L('Sort, find v, count cnt and need, output C(cnt, need) mod p.', 'সর্ট, v খুঁজে cnt আর need গুনে C(cnt, need) mod p প্রিন্ট।')],
  walkthrough: { input: '1 1 1 1, k = 2', steps: [{ state: 'v = 1, cnt = 4, need = 2', text: L('C(4, 2) = 6.', 'C(৪, ২) = ৬।') }] },
  complexity: { time: 'O(n log n)', space: 'O(N²) or O(N)', why: L('A sort plus a binomial.', 'একটি সর্ট আর একটি দ্বিপদ।') },
  solutions: [
    {
      id: 'pascal',
      kind: 'optimal',
      title: L('Pascal’s triangle mod p', 'mod p প্যাসকেলের ত্রিভুজ'),
      idea: L('Precompute C up to 1000 once.', '১০০০ পর্যন্ত C একবার হিসাব।'),
      explain: [L('A 1001 × 1001 table of ints is 4 MB and needs only additions mod p.', '১০০১ × ১০০১-এর int টেবিল ৪ MB আর শুধু mod p যোগ লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int MOD = 1000000007, N = 1000;
int C[N + 1][N + 1];

int main() {
    for (int i = 0; i <= N; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.rbegin(), a.rend());
        int v = a[k - 1];
        int cnt = count(a.begin(), a.end(), v);
        int need = count(a.begin(), a.begin() + k, v);
        printf("%d\n", C[cnt][need]);
    }
    return 0;
}
`,
      time: 'O(N² + n log n)',
      space: 'O(N²)',
      accepted: true,
      toolkit: ['sort', 'count-find', 'mod-arith'],
    },
    {
      id: 'factorials',
      kind: 'method',
      title: L('Factorials and modular inverses', 'ফ্যাক্টরিয়াল আর মডুলার ইনভার্স'),
      idea: L('C(n, k) = n! · (k!)⁻¹ · ((n − k)!)⁻¹ mod p, inverses by Fermat.', 'C(n, k) = n! · (k!)⁻¹ · ((n − k)!)⁻¹ mod p, ফার্মা দিয়ে ইনভার্স।'),
      explain: [L('The standard way once n reaches 10⁵ or more, where a Pascal table no longer fits. p is prime, so x⁻¹ = x^(p−2).', 'n ১০⁵ বা বেশি হলে প্রচলিত উপায়, যেখানে প্যাসকেল টেবিল আর আঁটে না। p মৌলিক, তাই x⁻¹ = x^(p−২)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

int main() {
    vector<long long> f(1001, 1);
    for (int i = 1; i <= 1000; i++) f[i] = f[i - 1] * i % MOD;
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.rbegin(), a.rend());
        int v = a[k - 1];
        int cnt = count(a.begin(), a.end(), v), need = count(a.begin(), a.begin() + k, v);
        long long ans = f[cnt] * power(f[need], MOD - 2) % MOD * power(f[cnt - need], MOD - 2) % MOD;
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n + log p)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['mod-pow', 'mod-arith', 'sort'],
    },
  ],
  tests: [
    { input: '3\n4 3\n1 3 1 2\n4 2\n1 1 1 1\n2 1\n1 2', output: '2\n6\n1', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Counting only the ties inside the first k.', 'শুধু প্রথম k-এর ভেতরের সমতা গোনা।')],
  related: [{ id: '131C', name: 'The World is a Theatre', why: L('Binomial coefficients.', 'দ্বিপদ সহগ।') }],
  toolkit: ['mod-arith'],
};

export const p9A: ProblemEntry = {
  id: '9A',
  contestId: 9,
  index: 'A',
  name: 'Die Roll',
  rating: 800,
  tags: ['math', 'probabilities'],
  featuredFor: ['probabilities'],
  why: L('Probability with equally likely outcomes is favourable / total, reduced by the gcd.', 'সমান সম্ভাব্য ফলাফলে সম্ভাবনা হলো অনুকূল / মোট, gcd দিয়ে সরলীকৃত।'),
  statement: L('Yakko and Wakko rolled Y and W on a die. Dot rolls next and wins if her roll is at least the larger of theirs. Print her winning probability as an irreducible fraction A/B.', 'ইয়াক্কো আর ওয়াক্কো একটি ছক্কায় Y আর W পেয়েছে। এরপর ডট ছোড়ে আর তার ফল তাদের বড়টির অন্তত সমান হলে সে জেতে। তার জেতার সম্ভাবনা অখণ্ডনীয় ভগ্নাংশ A/B হিসেবে প্রিন্ট করুন।'),
  input: L('Y W.', 'Y W।'),
  output: L('A/B.', 'A/B।'),
  limits: { timeSec: 1, memoryMb: 64, notes: [L('1 ≤ Y, W ≤ 6', '১ ≤ Y, W ≤ ৬')] },
  samples: [{ input: '4 2', output: '1/2', explain: L('Rolls 4, 5, 6 win: 3/6 = 1/2.', '৪, ৫, ৬ জেতে: ৩/৬ = ১/২।') }],
  observation: L('Six equally likely outcomes; favourable ones are max(Y, W) … 6, that is 7 − max(Y, W). Divide both by their gcd.', 'ছয়টি সমান সম্ভাব্য ফলাফল; অনুকূলগুলো max(Y, W) … ৬, অর্থাৎ ৭ − max(Y, W)। দুটিকেই তাদের gcd দিয়ে ভাগ।'),
  approach: [L('a = 7 − max, g = gcd(a, 6), print a/g "/" 6/g.', 'a = ৭ − max, g = gcd(a, ৬), a/g "/" ৬/g প্রিন্ট।')],
  walkthrough: { input: '1 1', steps: [{ state: 'a = 6, g = 6', text: L('1/1.', '১/১।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A gcd of small numbers.', 'ছোট সংখ্যার gcd।') },
  solutions: [
    {
      id: 'gcd',
      kind: 'optimal',
      title: L('Favourable / total, reduced', 'অনুকূল / মোট, সরলীকৃত'),
      idea: L('gcd reduces the fraction.', 'gcd ভগ্নাংশ সরল করে।'),
      explain: [L('Printing an exact fraction instead of a decimal is common in probability problems; when the denominator is large they switch to “p · q⁻¹ mod M”.', 'দশমিকের বদলে নিখুঁত ভগ্নাংশ প্রিন্ট সম্ভাবনার প্রবলেমে সাধারণ; হর বড় হলে তারা “p · q⁻¹ mod M”-এ যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int y, w;
    cin >> y >> w;
    int a = 7 - max(y, w), b = 6;
    int g = __gcd(a, b);
    cout << a / g << "/" << b / g << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['gcd-lcm', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate Dot’s roll and reduce by trial division', 'ডটের ফল গুনে ট্রায়াল ডিভিশনে সরলীকরণ'),
      idea: L('Count winning faces; divide out common factors 2 and 3.', 'জেতার মুখ গুনে সাধারণ উৎপাদক ২ আর ৩ বাদ দিন।'),
      explain: [L('Counting outcomes explicitly is the definition of a classical probability. 6 = 2 · 3, so removing shared 2s and 3s gives the irreducible form.', 'ফলাফল স্পষ্টভাবে গোনাই ধ্রুপদি সম্ভাবনার সংজ্ঞা। ৬ = ২ · ৩, তাই ভাগ করা ২ আর ৩ বাদ দিলে অখণ্ডনীয় রূপ আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int y, w;
    cin >> y >> w;
    int a = 0, b = 6;
    for (int d = 1; d <= 6; d++) if (d >= y && d >= w) a++;
    for (int p : {2, 3})
        while (a % p == 0 && b % p == 0) { a /= p; b /= p; }
    cout << a << "/" << b << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'modulo'],
    },
  ],
  tests: [
    { input: '4 2', output: '1/2', source: 'sample', note: sample(1) },
    { input: '1 1', output: '1/1', source: 'own', note: L('Dot always wins.', 'ডট সবসময় জেতে।') },
    { input: '6 6', output: '1/6', source: 'own', note: L('Only a 6 wins.', 'শুধু ৬ জেতে।') },
  ],
  pitfalls: [L('Printing 6/6 instead of 1/1.', '১/১-এর বদলে ৬/৬ প্রিন্ট।'), L('Using > instead of ≥ (ties go to Dot).', '≥-এর বদলে > (সমতা ডটের)।')],
  related: [{ id: '131C', name: 'The World is a Theatre', why: L('Counting outcomes.', 'ফলাফল গোনা।') }],
  toolkit: ['gcd-lcm'],
};

export const p601A: ProblemEntry = {
  id: '601A',
  contestId: 601,
  index: 'A',
  name: 'The Two Routes',
  rating: 1600,
  tags: ['graphs', 'shortest-paths'],
  why: L('BFS on a graph or its complement; the edge 1–n always belongs to one of them.', 'একটি গ্রাফ বা তার পরিপূরকে BFS; প্রান্ত ১–n সবসময় তাদের একটিতে থাকে।'),
  statement: L(
    'n towns; m pairs are joined by railways, and every other pair by a road. A train (railways only) and a bus (roads only) leave town 1 together; each edge takes one hour. They must never arrive in the same town at the same time, except town n. Find the minimum time until both have reached n, or −1 if either cannot.',
    'n-টি শহর; m-টি জোড়া রেলপথে যুক্ত, আর বাকি প্রতিটি জোড়া সড়কে। একটি ট্রেন (শুধু রেল) আর একটি বাস (শুধু সড়ক) একসঙ্গে শহর ১ থেকে ছাড়ে; প্রতিটি প্রান্তে এক ঘণ্টা লাগে। শহর n ছাড়া তারা কখনো একই সময়ে একই শহরে পৌঁছাতে পারবে না। দুটিই n-এ পৌঁছানো পর্যন্ত সর্বনিম্ন সময় বের করুন, যেকোনোটি না পারলে −১।',
  ),
  input: L('n m, then m railway pairs.', 'n m, তারপর m-টি রেলের জোড়া।'),
  output: L('The minimum time, or −1.', 'সর্বনিম্ন সময়, অথবা −১।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 400', '২ ≤ n ≤ ৪০০')] },
  samples: [
    { input: '4 2\n1 3\n3 4', output: '2', explain: L('Train 1→3→4, bus 1→4 directly.', 'ট্রেন ১→৩→৪, বাস সরাসরি ১→৪।') },
    { input: '4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4', output: '-1', explain: L('There are no roads at all.', 'কোনো সড়কই নেই।') },
    { input: '5 5\n4 2\n3 5\n4 5\n5 1\n1 2', output: '3', explain: L('Train 1→5; bus 1→3→2→5.', 'ট্রেন ১→৫; বাস ১→৩→২→৫।') },
  ],
  observation: L('Pair 1–n is either a railway or a road, so one vehicle arrives after exactly 1 hour and is never in an intermediate town again. The other just takes its shortest path, and no collision is possible. Answer: BFS distance in the graph that does not contain edge 1–n.', 'জোড়া ১–n হয় রেল নয়তো সড়ক, তাই একটি যান ঠিক ১ ঘণ্টা পরে পৌঁছায় আর আর কখনো মাঝের শহরে থাকে না। অন্যটি শুধু তার সবচেয়ে ছোট পথ নেয়, আর সংঘর্ষ সম্ভব নয়। উত্তর: যে গ্রাফে প্রান্ত ১–n নেই তাতে BFS দূরত্ব।'),
  approach: [L('Adjacency matrix; if rail[1][n], BFS over roads (!rail), else BFS over rails.', 'সংলগ্নতা ম্যাট্রিক্স; rail[১][n] হলে সড়কে (!rail) BFS, নইলে রেলে BFS।')],
  walkthrough: { input: 'sample 3', steps: [{ state: 'rail 1–5 exists', text: L('BFS over roads from 1 gives 3.', '১ থেকে সড়কে BFS ৩ দেয়।') }] },
  complexity: { time: 'O(n²)', space: 'O(n²)', why: L('BFS on a dense matrix.', 'ঘন ম্যাট্রিক্সে BFS।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('BFS on the graph without edge 1–n', 'প্রান্ত ১–n ছাড়া গ্রাফে BFS'),
      idea: L('want = !rail[1][n]; neighbours are j with rail[v][j] == want.', 'want = !rail[১][n]; প্রতিবেশী হলো সেই j যেখানে rail[v][j] == want।'),
      explain: [L('With a dense complement, an adjacency matrix is simpler than building lists. Graph complements are a recurring trick: “roads = everything that is not a railway”.', 'ঘন পরিপূরকে তালিকা বানানোর চেয়ে সংলগ্নতা ম্যাট্রিক্স সহজ। গ্রাফের পরিপূরক একটি বারবার আসা কৌশল: “সড়ক = রেল নয় এমন সবকিছু”।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<bool>> rail(n + 1, vector<bool>(n + 1, false));
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        rail[a][b] = rail[b][a] = true;
    }
    bool want = !rail[1][n];  // follow rails if 1-n is a road, roads if it is a rail
    vector<int> d(n + 1, -1);
    queue<int> q;
    q.push(1);
    d[1] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int u = 1; u <= n; u++)
            if (u != v && rail[v][u] == want && d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
    }
    cout << d[n] << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
    {
      id: 'floyd',
      kind: 'method',
      title: L('Floyd–Warshall on both graphs', 'দুটি গ্রাফে ফ্লয়েড–ওয়ারশাল'),
      idea: L('All-pairs distances for rails and for roads; answer max of the two, or −1.', 'রেল আর সড়ক দুটির সব-জোড়া দূরত্ব; উত্তর দুটির বড়টি, অথবা −১।'),
      explain: [L('O(n³) = 6.4·10⁷ for n = 400, fine in 2 seconds. Taking the max of both distances expresses the answer without the case split, since one of them is always 1.', 'n = ৪০০-এ O(n³) = ৬.৪·১০⁷, ২ সেকেন্ডে ঠিক। দুটি দূরত্বের বড়টি নিলে ক্ষেত্র-ভাগ ছাড়াই উত্তর আসে, কারণ এদের একটি সবসময় ১।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    const int INF = 1e9;
    vector<vector<int>> rail(n + 1, vector<int>(n + 1, INF)), road(n + 1, vector<int>(n + 1, INF));
    vector<vector<bool>> isRail(n + 1, vector<bool>(n + 1, false));
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        isRail[a][b] = isRail[b][a] = true;
    }
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) {
            if (i == j) rail[i][j] = road[i][j] = 0;
            else if (isRail[i][j]) rail[i][j] = 1;
            else road[i][j] = 1;
        }
    for (auto* g : {&rail, &road})
        for (int k = 1; k <= n; k++)
            for (int i = 1; i <= n; i++)
                for (int j = 1; j <= n; j++)
                    (*g)[i][j] = min((*g)[i][j], (*g)[i][k] + (*g)[k][j]);
    int ans = max(rail[1][n], road[1][n]);
    cout << (ans >= INF ? -1 : ans) << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['min-max', 'vector'],
    },
  ],
  tests: [
    { input: '4 2\n1 3\n3 4', output: '2', source: 'sample', note: sample(1) },
    { input: '4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4', output: '-1', source: 'sample', note: sample(2) },
    { input: '5 5\n4 2\n3 5\n4 5\n5 1\n1 2', output: '3', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Simulating both vehicles together to avoid collisions — unnecessary.', 'সংঘর্ষ এড়াতে দুটি যান একসঙ্গে সিমুলেশন — দরকার নেই।')],
  related: [{ id: '20C', name: 'Dijkstra?', why: L('Shortest paths.', 'সবচেয়ে ছোট পথ।') }],
  toolkit: ['stack-queue'],
};

export const p1063B: ProblemEntry = {
  id: '1063B',
  contestId: 1063,
  index: 'B',
  name: 'Labyrinth',
  rating: 1800,
  tags: ['graphs', 'shortest-paths'],
  featuredFor: ['shortest-paths'],
  why: L('0-1 BFS: vertical moves are free, horizontal moves cost one, and minimising left moves minimises right moves too.', '০-১ BFS: খাড়া চাল বিনামূল্যে, আনুভূমিক চালে এক খরচ, আর বাম চাল কমালে ডান চালও কমে।'),
  statement: L(
    'An n × m maze has free cells (.) and obstacles (*). From the start (r, c) you may move up and down freely, but at most x moves left and at most y moves right in total. How many cells are reachable (including the start)?',
    'n × m-এর একটি গোলকধাঁধায় খালি ঘর (.) আর বাধা (*)। শুরু (r, c) থেকে ইচ্ছামতো ওপরে-নিচে যাওয়া যায়, কিন্তু মোট সর্বোচ্চ x বার বামে আর y বার ডানে। কয়টি ঘরে পৌঁছানো যায় (শুরুসহ)?',
  ),
  input: L('n m, r c, x y, then the grid.', 'n m, r c, x y, তারপর গ্রিড।'),
  output: L('The number of reachable cells.', 'পৌঁছানো যায় এমন ঘরের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('n, m ≤ 2000, x, y ≤ 10⁹', 'n, m ≤ ২০০০, x, y ≤ ১০⁹')] },
  samples: [
    { input: '4 5\n3 2\n1 2\n.....\n.***.\n...**\n*....', output: '10', explain: L('Going around the wall would need two left moves.', 'দেয়াল ঘুরে যেতে দুবার বামে যেতে হতো।') },
    { input: '4 4\n2 2\n0 1\n....\n..*.\n....\n....', output: '7', explain: L('No left moves at all, one right move.', 'একবারও বামে নয়, একবার ডানে।') },
  ],
  observation: L('For any path to column j, right − left = j − c, a constant. So minimising left moves also minimises right moves. Compute, for every cell, the minimum number of left moves: a shortest path where a left move costs 1 and other moves cost 0, which is a 0-1 BFS with a deque.', 'কলাম j-তে যেকোনো পথে ডান − বাম = j − c, একটি ধ্রুবক। তাই বাম চাল কমালে ডান চালও কমে। প্রতিটি ঘরের জন্য সর্বনিম্ন বাম চাল হিসাব করুন: একটি সবচেয়ে ছোট পথ যেখানে বাম চালে খরচ ১ আর অন্য চালে ০, যা deque দিয়ে ০-১ BFS।'),
  approach: [L('0-1 BFS on left-move count; a cell counts if left ≤ x and left + (j − c) ≤ y.', 'বাম চালের সংখ্যায় ০-১ BFS; বাম ≤ x আর বাম + (j − c) ≤ y হলে ঘরটি গোনা হয়।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'left = 0 everywhere reachable without going left', text: L('Right moves = j − c ≤ 1: columns 2 and 3 only, 7 cells.', 'ডান চাল = j − c ≤ ১: শুধু কলাম ২ আর ৩, ৭টি ঘর।') }] },
  complexity: { time: 'O(n · m)', space: 'O(n · m)', why: L('Each cell enters the deque a bounded number of times.', 'প্রতিটি ঘর সীমিত বার deque-এ ঢোকে।') },
  solutions: [
    {
      id: 'bfs01',
      kind: 'optimal',
      title: L('0-1 BFS on left moves', 'বাম চালে ০-১ BFS'),
      idea: L('Cost-0 edges go to the deque front, cost-1 edges to the back.', 'খরচ-০ প্রান্ত deque-এর সামনে, খরচ-১ প্রান্ত পেছনে।'),
      explain: [L('0-1 BFS is Dijkstra for weights 0 and 1 without a heap. Here right moves are also given cost 0 in the search: they are accounted for by the formula right = left + (j − c).', '০-১ BFS হলো হিপ ছাড়া ০ আর ১ ওজনের ডাইকস্ট্রা। এখানে খোঁজে ডান চালেও খরচ ০ দেওয়া হয়: সেগুলো সূত্র ডান = বাম + (j − c) দিয়ে হিসাব হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, r, c;
    long long x, y;
    scanf("%d %d %d %d %lld %lld", &n, &m, &r, &c, &x, &y);
    r--, c--;
    vector<string> g(n);
    char buf[2048];
    for (auto& row : g) { scanf("%s", buf); row = buf; }
    const int INF = INT_MAX;
    vector<vector<int>> left(n, vector<int>(m, INF));
    deque<pair<int, int>> dq;
    left[r][c] = 0;
    dq.push_back({r, c});
    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    while (!dq.empty()) {
        auto [i, j] = dq.front();
        dq.pop_front();
        for (int k = 0; k < 4; k++) {
            int a = i + dr[k], b = j + dc[k];
            if (a < 0 || a >= n || b < 0 || b >= m || g[a][b] == '*') continue;
            int w = (k == 2);  // only a left move costs 1
            if (left[i][j] + w < left[a][b]) {
                left[a][b] = left[i][j] + w;
                if (w) dq.push_back({a, b}); else dq.push_front({a, b});
            }
        }
    }
    int reach = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (left[i][j] != INF && left[i][j] <= x && left[i][j] + (j - c) <= y) reach++;
    printf("%d\n", reach);
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['stack-queue', 'pair', 'c-io'],
    },
    {
      id: 'dijkstra',
      kind: 'method',
      title: L('Dijkstra with a priority queue', 'প্রায়োরিটি কিউসহ ডাইকস্ট্রা'),
      idea: L('Same costs, general shortest-path algorithm.', 'একই খরচ, সাধারণ সবচেয়ে ছোট পথের অ্যালগরিদম।'),
      explain: [L('An extra log factor (4·10⁶ cells · log) still fits. Seeing that weights are only 0 and 1 is what lets you drop the heap for the deque.', 'একটি বাড়তি log গুণক (৪·১০⁶ ঘর · log) তখনও আঁটে। ওজন শুধু ০ আর ১ দেখলেই হিপ বাদ দিয়ে deque নেওয়া যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, r, c;
    long long x, y;
    scanf("%d %d %d %d %lld %lld", &n, &m, &r, &c, &x, &y);
    r--, c--;
    vector<string> g(n);
    char buf[2048];
    for (auto& row : g) { scanf("%s", buf); row = buf; }
    vector<int> dist(n * m, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    dist[r * m + c] = 0;
    pq.push({0, r * m + c});
    while (!pq.empty()) {
        auto [d, id] = pq.top();
        pq.pop();
        if (d != dist[id]) continue;
        int i = id / m, j = id % m;
        const int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
        for (int k = 0; k < 4; k++) {
            int a = i + dr[k], b = j + dc[k];
            if (a < 0 || a >= n || b < 0 || b >= m || g[a][b] == '*') continue;
            int nd = d + (k == 2);
            if (nd < dist[a * m + b]) { dist[a * m + b] = nd; pq.push({nd, a * m + b}); }
        }
    }
    int reach = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            int L = dist[i * m + j];
            if (L != INT_MAX && L <= x && L + (j - c) <= y) reach++;
        }
    printf("%d\n", reach);
    return 0;
}
`,
      time: 'O(n · m · log(n · m))',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['priority-queue', 'pair'],
    },
  ],
  tests: [
    { input: '4 5\n3 2\n1 2\n.....\n.***.\n...**\n*....', output: '10', source: 'sample', note: sample(1) },
    { input: '4 4\n2 2\n0 1\n....\n..*.\n....\n....', output: '7', source: 'sample', note: sample(2) },
    { input: '1 1\n1 1\n0 0\n.', output: '1', source: 'own', note: L('Only the start.', 'শুধু শুরু।') },
  ],
  pitfalls: [L('Plain BFS by step count, which can reach a cell first with too many left moves.', 'ধাপের সংখ্যা ধরে সাধারণ BFS, যা প্রথমে খুব বেশি বাম চালে কোনো ঘরে পৌঁছাতে পারে।'), L('Minimising left and right separately.', 'বাম আর ডান আলাদাভাবে সর্বনিম্ন করা।')],
  related: [{ id: '601A', name: 'The Two Routes', why: L('BFS shortest paths.', 'BFS সবচেয়ে ছোট পথ।') }],
  toolkit: ['stack-queue'],
};

export const p1490D: ProblemEntry = {
  id: '1490D',
  contestId: 1490,
  index: 'D',
  name: 'Permutation Transformation',
  rating: 1200,
  tags: ['dfs', 'divide-and-conquer', 'implementation'],
  featuredFor: ['divide-and-conquer'],
  why: L('Divide and conquer in its plainest form: split at the maximum, recurse on both halves.', 'সবচেয়ে সরল রূপে ডিভাইড অ্যান্ড কনকার: সর্বোচ্চ মানে ভাগ করে দুই অর্ধে রিকার্শন।'),
  statement: L(
    'A permutation becomes a tree: the maximum is the root, the part to its left builds the left subtree the same way, the part to its right the right subtree. Print the depth of every element (root depth 0). There are t test cases.',
    'একটি পারমুটেশন একটি ট্রি হয়: সর্বোচ্চ মানটি মূল, এর বামের অংশ একইভাবে বাম সাবট্রি বানায়, ডানের অংশ ডান সাবট্রি। প্রতিটি উপাদানের গভীরতা প্রিন্ট করুন (মূলের গভীরতা ০)। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the permutation.', 't; প্রতিটি টেস্টে n আর পারমুটেশন।'),
  output: L('Depths in input order.', 'ইনপুটের ক্রমে গভীরতা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 100', 'n ≤ ১০০')] },
  samples: [{ input: '3\n5\n3 5 2 1 4\n1\n1\n4\n4 3 1 2', output: '1 0 2 3 1\n0\n0 1 3 2', explain: L('5 is the root; 3 and 4 are its children; 2 is under 4, and 1 under 2.', '৫ মূল; ৩ আর ৪ তার সন্তান; ২ আছে ৪-এর নিচে, আর ১ ২-এর নিচে।') }],
  observation: L('build(l, r, d): find the maximum position p in [l, r], set depth[p] = d, then build(l, p − 1, d + 1) and build(p + 1, r, d + 1).', 'build(l, r, d): [l, r]-এ সর্বোচ্চ অবস্থান p খুঁজে depth[p] = d, তারপর build(l, p − ১, d + ১) আর build(p + ১, r, d + ১)।'),
  approach: [L('Direct recursion; O(n²) worst case is fine for n ≤ 100.', 'সরাসরি রিকার্শন; n ≤ ১০০-এ সবচেয়ে খারাপ O(n²) ঠিক আছে।')],
  walkthrough: { input: '4 3 1 2', steps: [{ state: 'root 4 (depth 0) → right part 3 1 2: root 3 (1) → right 1 2: root 2 (2) → left 1 (3)', text: L('0 1 3 2.', '০ ১ ৩ ২।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('Each level scans its segment.', 'প্রতিটি স্তর তার অংশ স্ক্যান করে।') },
  solutions: [
    {
      id: 'recursion',
      kind: 'optimal',
      title: L('Recursive split at the maximum', 'সর্বোচ্চ মানে রিকার্সিভ ভাগ'),
      idea: L('max_element gives the split point.', 'max_element ভাগের বিন্দু দেয়।'),
      explain: [L('This is exactly the construction of a Cartesian tree. The same split-at-max recursion appears in problems that count subarrays where an element is the maximum.', 'এটি ঠিক একটি কার্টেসিয়ান ট্রি গঠন। একই সর্বোচ্চে-ভাগ রিকার্শন সেসব প্রবলেমে আসে যেখানে গোনা হয় কোন সাবঅ্যারেতে একটি উপাদান সর্বোচ্চ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> a, depth;

void build(int l, int r, int d) {
    if (l > r) return;
    int p = max_element(a.begin() + l, a.begin() + r + 1) - a.begin();
    depth[p] = d;
    build(l, p - 1, d + 1);
    build(p + 1, r, d + 1);
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        a.assign(n, 0);
        depth.assign(n, 0);
        for (auto& x : a) cin >> x;
        build(0, n - 1, 0);
        for (int d : depth) cout << d << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Count ancestors directly', 'সরাসরি পূর্বপুরুষ গোনা'),
      idea: L('j is an ancestor of i iff aⱼ is the maximum of the segment between i and j.', 'j হলো i-এর পূর্বপুরুষ ঠিক তখনই যখন i আর j-এর মাঝের অংশের সর্বোচ্চ aⱼ।'),
      explain: [L('No recursion: for each pair check the range maximum. The depth is the number of ancestors. This characterisation is useful when you need depths without building the tree.', 'কোনো রিকার্শন নয়: প্রতিটি জোড়ায় পরিসরের সর্বোচ্চ যাচাই। গভীরতা হলো পূর্বপুরুষের সংখ্যা। ট্রি না বানিয়ে গভীরতা লাগলে এই বৈশিষ্ট্য কাজের।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        for (int i = 0; i < n; i++) {
            int depth = 0;
            for (int j = 0; j < n; j++) {
                if (j == i) continue;
                int lo = min(i, j), hi = max(i, j);
                if (*max_element(a.begin() + lo, a.begin() + hi + 1) == a[j]) depth++;
            }
            cout << depth << ' ';
        }
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'for-loop'],
    },
  ],
  tests: [
    { input: '3\n5\n3 5 2 1 4\n1\n1\n4\n4 3 1 2', output: '1 0 2 3 1\n0\n0 1 3 2', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Printing depths in the order of the tree instead of input order.', 'ইনপুটের ক্রমের বদলে ট্রির ক্রমে গভীরতা প্রিন্ট।')],
  related: [{ id: '1336A', name: 'Linova and Kingdom', why: L('Depths in a tree.', 'ট্রিতে গভীরতা।') }],
  toolkit: ['functions'],
};
