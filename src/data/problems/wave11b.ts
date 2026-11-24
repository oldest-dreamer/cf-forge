import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p197A: ProblemEntry = {
  id: '197A',
  contestId: 197,
  index: 'A',
  name: 'Plate Game',
  rating: 1600,
  tags: ['constructive', 'games', 'math'],
  why: L('The central-symmetry strategy: First takes the centre, then copies every Second move through it.', 'কেন্দ্রীয় প্রতিসাম্য কৌশল: প্রথমজন কেন্দ্র নেয়, তারপর দ্বিতীয়জনের প্রতিটি চাল কেন্দ্রের মধ্য দিয়ে নকল করে।'),
  statement: L('Players alternately place plates of radius r on an a × b table; plates may touch but not overlap, and must lie fully on the table. The player who cannot place a plate loses. Who wins with optimal play?', 'খেলোয়াড়রা পালা করে a × b টেবিলে r ব্যাসার্ধের প্লেট রাখে; প্লেট ছুঁতে পারে কিন্তু একটির ওপর আরেকটি নয়, আর পুরোপুরি টেবিলে থাকতে হবে। যে প্লেট রাখতে পারে না সে হারে। সেরা খেলায় কে জেতে?'),
  input: L('a b r.', 'a b r।'),
  output: L('First or Second.', 'First অথবা Second।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ a, b, r ≤ 100', '১ ≤ a, b, r ≤ ১০০')] },
  samples: [
    { input: '5 5 2', output: 'First', explain: L('One plate fits; First puts it in the centre.', 'একটি প্লেট আঁটে; প্রথমজন কেন্দ্রে রাখে।') },
    { input: '6 7 4', output: 'Second', explain: L('A plate of diameter 8 does not fit at all.', '৮ ব্যাসের প্লেট মোটেই আঁটে না।') },
  ],
  observation: L('If a plate fits at all (2r ≤ a and 2r ≤ b), First puts one exactly in the centre. After that, whenever Second places a plate, its mirror image through the centre is free (the table and the central plate are symmetric), so First always has a reply. Otherwise First cannot move.', 'একটি প্লেট আদৌ আঁটলে (২r ≤ a আর ২r ≤ b), প্রথমজন ঠিক কেন্দ্রে একটি রাখে। তারপর দ্বিতীয়জন যখনই একটি প্লেট রাখে, কেন্দ্রের মধ্য দিয়ে তার আয়নার প্রতিবিম্ব খালি (টেবিল আর কেন্দ্রের প্লেট প্রতিসম), তাই প্রথমজনের সবসময় উত্তর আছে। নইলে প্রথমজন চাল দিতে পারে না।'),
  approach: [L('First iff 2r ≤ min(a, b).', '২r ≤ min(a, b) হলেই First।')],
  walkthrough: { input: '5 5 2', steps: [{ state: 'diameter 4 ≤ 5', text: L('First.', 'First।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A comparison.', 'একটি তুলনা।') },
  solutions: [
    {
      id: 'symmetry',
      kind: 'optimal',
      title: L('Centre, then mirror', 'কেন্দ্র, তারপর প্রতিফলন'),
      idea: L('Does one plate fit?', 'একটি প্লেট কি আঁটে?'),
      explain: [L('Point symmetry is the 2D version of the mirror strategy. The first move occupies the only self-symmetric spot, after which every opponent move has a distinct partner.', 'বিন্দু প্রতিসাম্য হলো প্রতিফলন কৌশলের দ্বিমাত্রিক রূপ। প্রথম চাল একমাত্র স্ব-প্রতিসম স্থান দখল করে, তারপর প্রতিপক্ষের প্রতিটি চালের একটি আলাদা জোড়া থাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, r;
    cin >> a >> b >> r;
    cout << (2 * r <= min(a, b) ? "First" : "Second") << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max', 'ternary'],
    },
    {
      id: 'separate',
      kind: 'alt',
      title: L('Check both sides separately', 'দুই দিক আলাদাভাবে যাচাই'),
      idea: L('The plate’s bounding square must fit in width and in height.', 'প্লেটের সীমাবদ্ধ বর্গকে প্রস্থে আর উচ্চতায় আঁটতে হবে।'),
      explain: [L('A disc of radius r fits in a rectangle iff its 2r × 2r bounding square does. Writing the two conditions separately makes that geometric fact explicit.', 'r ব্যাসার্ধের একটি চাকতি একটি আয়তক্ষেত্রে আঁটে ঠিক তখনই যখন এর ২r × ২r সীমাবদ্ধ বর্গ আঁটে। দুটি শর্ত আলাদা লিখলে সেই জ্যামিতিক তথ্য স্পষ্ট হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, r;
    cin >> a >> b >> r;
    bool fitsWidth = 2 * r <= a, fitsHeight = 2 * r <= b;
    cout << (fitsWidth && fitsHeight ? "First" : "Second") << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bool-arith'],
    },
  ],
  tests: [
    { input: '5 5 2', output: 'First', source: 'sample', note: sample(1) },
    { input: '6 7 4', output: 'Second', source: 'sample', note: sample(2) },
    { input: '100 4 2', output: 'First', source: 'own', note: L('Exactly fits in height.', 'উচ্চতায় ঠিক আঁটে।') },
  ],
  pitfalls: [L('Counting how many plates fit (irrelevant).', 'কয়টি প্লেট আঁটে গোনা (অপ্রাসঙ্গিক)।')],
  related: [{ id: '493D', name: 'Vasya and Chess', why: L('Symmetry strategies.', 'প্রতিসাম্য কৌশল।') }],
  toolkit: ['min-max'],
};

export const p1527A: ProblemEntry = {
  id: '1527A',
  contestId: 1527,
  index: 'A',
  name: 'And Then There Were K',
  rating: 800,
  tags: ['bitmasks'],
  why: L('To clear the highest bit of n, the AND must pass below 2ᵏ, which first happens at 2ᵏ − 1.', 'n-এর সবচেয়ে উঁচু বিট মুছতে AND-কে ২ᵏ-এর নিচে যেতে হয়, যা প্রথম ঘটে ২ᵏ − ১-এ।'),
  statement: L('Find the largest k such that n & (n − 1) & (n − 2) & … & k = 0. There are t test cases.', 'সবচেয়ে বড় k বের করুন যাতে n & (n − ১) & (n − ২) & … & k = ০। t-টি টেস্ট কেস আছে।'),
  input: L('t, then n per test.', 't, তারপর প্রতিটি টেস্টে n।'),
  output: L('k.', 'k।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹', '১ ≤ n ≤ ১০⁹')] },
  samples: [{ input: '3\n2\n5\n17', output: '1\n3\n15', explain: L('5 & 4 & 3 = 0.', '৫ & ৪ & ৩ = ০।') }],
  observation: L('Let 2ᵐ be the highest bit of n. Every number in [2ᵐ, n] has that bit, so the AND keeps it until 2ᵐ − 1 joins. And 2ᵐ & (2ᵐ − 1) = 0, so the AND becomes 0 exactly then.', '২ᵐ হলো n-এর সবচেয়ে উঁচু বিট। [২ᵐ, n]-এর প্রতিটি সংখ্যায় সেই বিট আছে, তাই ২ᵐ − ১ যোগ না হওয়া পর্যন্ত AND এটি রাখে। আর ২ᵐ & (২ᵐ − ১) = ০, তাই ঠিক তখনই AND ০ হয়।'),
  approach: [L('Print (1 << __lg(n)) − 1.', '(1 << __lg(n)) − ১ প্রিন্ট।')],
  walkthrough: { input: '17', steps: [{ state: 'highest bit 16', text: L('k = 15.', 'k = ১৫।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One bit operation.', 'একটি বিট অপারেশন।') },
  solutions: [
    {
      id: 'highest-bit',
      kind: 'optimal',
      title: L('Highest bit minus one', 'সবচেয়ে উঁচু বিট বিয়োগ এক'),
      idea: L('2ᵐ − 1.', '২ᵐ − ১।'),
      explain: [L('An AND over a range of consecutive numbers can only lose bits as the range grows; the highest bit survives the longest.', 'পরপর সংখ্যার একটি পরিসরের AND পরিসর বাড়লে শুধু বিট হারায়; সবচেয়ে উঁচু বিট সবচেয়ে বেশি টেকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (1 << __lg(n)) - 1 << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Run the AND downwards', 'নিচের দিকে AND চালানো'),
      idea: L('acc = n; k = n; while acc ≠ 0: k−−, acc &= k.', 'acc = n; k = n; acc ≠ ০ যতক্ষণ: k−−, acc &= k।'),
      explain: [L('Up to n iterations per test, too slow for 10⁴ tests with n = 10⁹, but it is the statement.', 'প্রতি টেস্টে n পর্যন্ত পুনরাবৃত্তি, n = ১০⁹-এ ১০⁴টি টেস্টে খুব ধীর, কিন্তু এটিই স্টেটমেন্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int acc = n, k = n;
        while (acc != 0) { k--; acc &= k; }
        cout << k << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['bitwise-and', 'while-n'],
    },
  ],
  tests: [
    { input: '3\n2\n5\n17', output: '1\n3\n15', source: 'sample', note: sample(1) },
    { input: '2\n1\n1000000000', output: '0\n536870911', source: 'own', note: L('n = 1 and the largest n.', 'n = ১ আর সবচেয়ে বড় n।') },
  ],
  pitfalls: [L('Answering n − 1.', 'n − ১ উত্তর দেওয়া।')],
  related: [{ id: '1632B', name: 'Roof Construction', why: L('Highest-bit reasoning.', 'সবচেয়ে উঁচু বিটের যুক্তি।') }],
  toolkit: ['bit-shift'],
};

export const p1559A: ProblemEntry = {
  id: '1559A',
  contestId: 1559,
  index: 'A',
  name: 'Mocha and Math',
  rating: 900,
  tags: ['bitmasks', 'constructive', 'math'],
  why: L('AND can only remove bits, and with enough operations every element can reach the AND of all.', 'AND শুধু বিট সরাতে পারে, আর যথেষ্ট অপারেশনে প্রতিটি উপাদান সবার AND-এ পৌঁছাতে পারে।'),
  statement: L('An operation picks l ≤ r and replaces a_{l+i} by a_{l+i} & a_{r−i} for all i at once. Using any number of operations, minimise the maximum of the array. There are t test cases.', 'একটি অপারেশন l ≤ r বেছে সব i-এর জন্য একসঙ্গে a_{l+i}-কে a_{l+i} & a_{r−i} দিয়ে বদলায়। যতবার খুশি অপারেশনে অ্যারের সর্বোচ্চ সর্বনিম্ন করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The minimum possible maximum.', 'সর্বনিম্ন সম্ভাব্য সর্বোচ্চ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 100', 'n ≤ ১০০')] },
  samples: [{ input: '4\n2\n1 2\n3\n1 1 3\n4\n3 11 3 7\n5\n11 7 15 3 7', output: '0\n1\n3\n3', explain: L('1 & 2 = 0 for the first test.', 'প্রথম টেস্টে ১ & ২ = ০।') }],
  observation: L('Every value stays a superset of the total AND’s bits, so the maximum is at least AND(all). Operations on pairs (l, r) let any element absorb any other, so every element can become AND(all).', 'প্রতিটি মান মোট AND-এর বিটগুলোর অধিসেট থাকে, তাই সর্বোচ্চ অন্তত AND(সব)। (l, r) জোড়ার অপারেশনে যেকোনো উপাদান অন্য যেকোনোটিকে শুষে নিতে পারে, তাই প্রতিটি উপাদান AND(সব) হতে পারে।'),
  approach: [L('Print the AND of all elements.', 'সব উপাদানের AND প্রিন্ট।')],
  walkthrough: { input: '3 11 3 7', steps: [{ state: '3 & 11 & 3 & 7', text: L('= 3.', '= ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'and-all',
      kind: 'optimal',
      title: L('AND of everything', 'সবকিছুর AND'),
      idea: L('Lower bound = construction.', 'নিম্নসীমা = গঠন।'),
      explain: [L('Start the accumulator at −1 (all bits set), the identity for AND, just as 0 is the identity for OR and XOR.', 'অ্যাকুমুলেটর −১ (সব বিট সেট) থেকে শুরু, AND-এর অভেদ, যেমন OR আর XOR-এর অভেদ ০।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, acc = -1;
        cin >> n;
        for (int i = 0; i < n; i++) { int a; cin >> a; acc &= a; }
        cout << acc << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and'],
    },
    {
      id: 'per-bit',
      kind: 'method',
      title: L('Bit by bit', 'বিট ধরে ধরে'),
      idea: L('Bit b survives iff every element has it.', 'বিট b টেকে ঠিক তখনই যখন প্রতিটি উপাদানে এটি আছে।'),
      explain: [L('Counting, for every bit, how many elements contain it is the general technique behind AND/OR/XOR aggregate problems.', 'প্রতিটি বিটের জন্য কয়টি উপাদানে এটি আছে গোনা AND/OR/XOR সমষ্টি প্রবলেমের সাধারণ কৌশল।')],
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
        int ans = 0;
        for (int b = 0; b < 31; b++) {
            bool all = true;
            for (int x : a) if (!(x >> b & 1)) all = false;
            if (all) ans |= 1 << b;
        }
        cout << ans << "\n";
    }
    return 0;
}
`,
      time: 'O(31 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [{ input: '4\n2\n1 2\n3\n1 1 3\n4\n3 11 3 7\n5\n11 7 15 3 7', output: '0\n1\n3\n3', source: 'sample', note: sample(1) }],
  pitfalls: [L('Starting the AND accumulator at 0.', 'AND অ্যাকুমুলেটর ০ থেকে শুরু।')],
  related: [{ id: '1527A', name: 'And Then There Were K', why: L('AND over many numbers.', 'অনেক সংখ্যার AND।') }],
  toolkit: ['bitwise-and'],
};

export const p1395C: ProblemEntry = {
  id: '1395C',
  contestId: 1395,
  index: 'C',
  name: 'Boboniu and Bit Operations',
  rating: 1600,
  tags: ['bitmasks', 'brute-force', 'dp', 'greedy'],
  why: L('The answer is below 512, so try every candidate A and check it greedily.', 'উত্তর ৫১২-এর নিচে, তাই প্রতিটি প্রার্থী A চেষ্টা করে গ্রিডিভাবে যাচাই।'),
  statement: L('For each aᵢ choose some bⱼ and let cᵢ = aᵢ & bⱼ (the same bⱼ may be reused). Minimise c₁ | c₂ | … | cₙ.', 'প্রতিটি aᵢ-এর জন্য কোনো bⱼ বেছে cᵢ = aᵢ & bⱼ ধরুন (একই bⱼ বারবার চলে)। c₁ | c₂ | … | cₙ সর্বনিম্ন করুন।'),
  input: L('n m, then a and b.', 'n m, তারপর a আর b।'),
  output: L('The minimum OR.', 'সর্বনিম্ন OR।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m ≤ 200, values < 2⁹', 'n, m ≤ ২০০, মান < ২⁹')] },
  samples: [
    { input: '4 2\n2 6 4 0\n2 4', output: '2', explain: L('c = 2, 2, 0, 0.', 'c = ২, ২, ০, ০।') },
    { input: '7 6\n1 9 1 9 8 1 0\n1 1 4 5 1 4', output: '0', explain: L('Every aᵢ has a bⱼ with no common bits.', 'প্রতিটি aᵢ-এর এমন bⱼ আছে যার সঙ্গে কোনো সাধারণ বিট নেই।') },
    { input: '8 5\n179 261 432 162 82 43 10 38\n379 357 202 184 197', output: '147', explain: L('A larger case.', 'একটি বড় ক্ষেত্র।') },
  ],
  observation: L('A is achievable iff for every i there is a j with (aᵢ & bⱼ) a submask of A, i.e. ((aᵢ & bⱼ) | A) == A. Check A = 0, 1, 2, … in order; the first achievable one is the answer.', 'A অর্জনযোগ্য ঠিক তখনই যখন প্রতিটি i-এর জন্য এমন j আছে যেখানে (aᵢ & bⱼ) A-এর সাবমাস্ক, অর্থাৎ ((aᵢ & bⱼ) | A) == A। A = ০, ১, ২, … ক্রমে যাচাই; প্রথম অর্জনযোগ্যটিই উত্তর।'),
  approach: [L('512 · n · m ≈ 2·10⁷ checks.', '৫১২ · n · m ≈ ২·১০⁷টি যাচাই।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'A = 0: a = 2 has 2 & 2 = 2, 2 & 4 = 0 ✓; a = 6: 6 & 2 = 2, 6 & 4 = 4 ✗', text: L('A = 1 fails too; A = 2 works.', 'A = ১-ও ব্যর্থ; A = ২ চলে।') }] },
  complexity: { time: 'O(512 · n · m)', space: 'O(n + m)', why: L('Small value range.', 'ছোট মানের পরিসর।') },
  solutions: [
    {
      id: 'try-all',
      kind: 'optimal',
      title: L('Try every answer', 'প্রতিটি উত্তর চেষ্টা'),
      idea: L('Submask test (x | A) == A.', 'সাবমাস্ক পরীক্ষা (x | A) == A।'),
      explain: [L('When the answer lives in a tiny range (here < 512), enumerating it and checking feasibility is often simpler than any clever greedy.', 'যখন উত্তর একটি ক্ষুদ্র পরিসরে থাকে (এখানে < ৫১২), এটি গণনা করে সম্ভাব্যতা যাচাই প্রায়ই যেকোনো চতুর গ্রিডির চেয়ে সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(m);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    for (int A = 0; A < 512; A++) {
        bool ok = true;
        for (int i = 0; i < n && ok; i++) {
            bool found = false;
            for (int j = 0; j < m && !found; j++) if (((a[i] & b[j]) | A) == A) found = true;
            ok = found;
        }
        if (ok) { cout << A << "\n"; return 0; }
    }
    return 0;
}
`,
      time: 'O(512 · n · m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['bitwise-and', 'for-loop'],
    },
    {
      id: 'greedy-bits',
      kind: 'method',
      title: L('Decide bits from high to low', 'উঁচু থেকে নিচু বিট ঠিক করা'),
      idea: L('Keep bit b off if it is still feasible with all lower bits allowed.', 'নিচের সব বিট অনুমোদিত রেখেও সম্ভব হলে বিট b বন্ধ রাখুন।'),
      explain: [L('Higher bits matter more than all lower bits together, so fix them first: try to keep bit b out of A while allowing everything below; keep it only if forced. Only 9 feasibility checks.', 'উঁচু বিট নিচের সব বিট মিলিয়ে বেশি গুরুত্বপূর্ণ, তাই আগে সেগুলো ঠিক করুন: নিচের সবকিছু অনুমোদন করে বিট b-কে A-এর বাইরে রাখার চেষ্টা; বাধ্য হলেই রাখুন। মাত্র ৯টি সম্ভাব্যতা যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<int> a, b;

bool feasible(int A) {
    for (int i = 0; i < n; i++) {
        bool found = false;
        for (int j = 0; j < m && !found; j++) if (((a[i] & b[j]) | A) == A) found = true;
        if (!found) return false;
    }
    return true;
}

int main() {
    cin >> n >> m;
    a.resize(n);
    b.resize(m);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    int A = 0;  // bits decided so far
    for (int bit = 8; bit >= 0; bit--)
        if (!feasible(A | ((1 << bit) - 1))) A |= 1 << bit;  // bit cannot be avoided
    cout << A << "\n";
    return 0;
}
`,
      time: 'O(9 · n · m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['bit-shift', 'functions'],
    },
  ],
  tests: [
    { input: '4 2\n2 6 4 0\n2 4', output: '2', source: 'sample', note: sample(1) },
    { input: '7 6\n1 9 1 9 8 1 0\n1 1 4 5 1 4', output: '0', source: 'sample', note: sample(2) },
    { input: '8 5\n179 261 432 162 82 43 10 38\n379 357 202 184 197', output: '147', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Choosing for each aᵢ the bⱼ with the smallest AND, which is not optimal for the OR.', 'প্রতিটি aᵢ-এর জন্য সবচেয়ে ছোট AND-এর bⱼ বাছা, যা OR-এর জন্য সেরা নয়।')],
  related: [{ id: '550B', name: 'Preparing Olympiad', why: L('Enumerating masks.', 'মাস্ক গণনা।') }],
  toolkit: ['bitwise-and'],
};

export const p1516B: ProblemEntry = {
  id: '1516B',
  contestId: 1516,
  index: 'B',
  name: 'AGAGA XOOORRR',
  rating: 1500,
  tags: ['bitmasks', 'brute-force', 'dp', 'greedy'],
  why: L('Merging adjacent equal-XOR parts: only 2 or 3 parts ever need to be considered.', 'পাশাপাশি সমান-XOR অংশ মেলানো: কখনো শুধু ২ বা ৩টি অংশ বিবেচনা করতে হয়।'),
  statement: L('An operation replaces two adjacent elements by their XOR. Can the array be reduced to at least two elements that are all equal? There are t test cases.', 'একটি অপারেশন দুটি পাশাপাশি উপাদানকে তাদের XOR দিয়ে বদলায়। অ্যারেকে কি অন্তত দুটি উপাদানে নামানো যায় যারা সবাই সমান? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 2000', '২ ≤ n ≤ ২০০০')] },
  samples: [{ input: '2\n3\n0 2 2\n4\n2 3 1 10', output: 'YES\nNO', explain: L('0 2 2 → (0 ^ 2) 2 = 2 2.', '০ ২ ২ → (০ ^ ২) ২ = ২ ২।') }],
  observation: L('The result is a split into contiguous parts with equal XOR v. Three equal parts can merge into one (v ^ v ^ v = v), so k parts reduce to 2 or 3. If the total XOR is 0, any split into two works. Otherwise the number of parts is odd, so it must be 3: cut greedily whenever the running XOR equals the total; two such cuts suffice.', 'ফলাফল হলো সমান XOR v-এর পরপর অংশে ভাগ। তিনটি সমান অংশ একটিতে মেলে (v ^ v ^ v = v), তাই k অংশ ২ বা ৩-এ নামে। মোট XOR ০ হলে যেকোনো দুই ভাগ চলে। নইলে অংশের সংখ্যা বিজোড়, তাই ৩ হতে হবে: চলতি XOR মোটের সমান হলেই গ্রিডিভাবে কাটুন; এমন দুটি কাটা যথেষ্ট।'),
  approach: [L('total == 0 → YES; else count greedy cuts with running XOR == total; YES iff ≥ 2.', 'মোট == ০ → YES; নইলে চলতি XOR == মোট হলে গ্রিডি কাটা গুনুন; ≥ ২ হলে YES।')],
  walkthrough: { input: '2 3 1 10', steps: [{ state: 'total = 2 ^ 3 ^ 1 ^ 10 = 10', text: L('Running XOR hits 10 only at the end: one cut. NO.', 'চলতি XOR শুধু শেষে ১০ ছোঁয়: একটি কাটা। NO।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Greedy cuts at the total XOR', 'মোট XOR-এ গ্রিডি কাটা'),
      idea: L('Two cuts mean three parts with XOR equal to the total.', 'দুটি কাটা মানে মোটের সমান XOR-এর তিনটি অংশ।'),
      explain: [L('If two greedy cuts exist, the remaining suffix has XOR total ^ total ^ total = total, so the three parts are equal.', 'দুটি গ্রিডি কাটা থাকলে বাকি সাফিক্সের XOR মোট ^ মোট ^ মোট = মোট, তাই তিনটি অংশ সমান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        int total = 0;
        for (auto& x : a) { cin >> x; total ^= x; }
        if (total == 0) { cout << "YES\n"; continue; }
        int cur = 0, cuts = 0;
        for (int x : a) {
            cur ^= x;
            if (cur == total) { cuts++; cur = 0; }
        }
        cout << (cuts >= 2 ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bitwise-and', 'ternary'],
    },
    {
      id: 'two-cuts',
      kind: 'method',
      title: L('Try every pair of cut points', 'প্রতিটি কাটা-বিন্দুর জোড়া চেষ্টা'),
      idea: L('Prefix XORs; test 2 parts and all 3-part splits.', 'প্রিফিক্স XOR; ২ অংশ আর সব ৩-অংশ ভাগ পরীক্ষা।'),
      explain: [L('With n ≤ 2000, O(n²) over cut pairs (i, j) is fast enough and needs only the “2 or 3 parts” insight, not the greedy argument.', 'n ≤ ২০০০-এ কাটা-জোড়া (i, j)-এর ওপর O(n²) যথেষ্ট দ্রুত আর শুধু “২ বা ৩ অংশ” অন্তর্দৃষ্টি লাগে, গ্রিডি যুক্তি নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> p(n + 1, 0);
        for (int i = 1; i <= n; i++) { int x; cin >> x; p[i] = p[i - 1] ^ x; }
        bool ok = false;
        for (int i = 1; i < n && !ok; i++) if (p[i] == (p[n] ^ p[i])) ok = true;  // two parts
        for (int i = 1; i < n && !ok; i++)
            for (int j = i + 1; j < n && !ok; j++)
                if (p[i] == (p[j] ^ p[i]) && p[i] == (p[n] ^ p[j])) ok = true;  // three parts
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'bitwise-and'],
    },
  ],
  tests: [
    { input: '2\n3\n0 2 2\n4\n2 3 1 10', output: 'YES\nNO', source: 'sample', note: sample(1) },
    { input: '1\n2\n5 5', output: 'YES', source: 'own', note: L('Already two equal elements.', 'আগেই দুটি সমান উপাদান।') },
  ],
  pitfalls: [L('Requiring exactly two parts when the total is non-zero.', 'মোট শূন্য না হলে ঠিক দুটি অংশ চাওয়া।')],
  related: [{ id: '1559A', name: 'Mocha and Math', why: L('Bitwise aggregates.', 'বিটওয়াইজ সমষ্টি।') }],
  toolkit: ['bitwise-and'],
};

export const p1554B: ProblemEntry = {
  id: '1554B',
  contestId: 1554,
  index: 'B',
  name: 'Cobb',
  rating: 1700,
  tags: ['bitmasks', 'brute-force', 'greedy', 'math'],
  why: L('A bound shows small indices can never win, so only the last 2k indices need to be paired.', 'একটি সীমা দেখায় ছোট ইনডেক্স কখনো জেতে না, তাই শুধু শেষ ২k ইনডেক্স জোড়া দিতে হয়।'),
  statement: L('Maximise i · j − k · (aᵢ | aⱼ) over 1 ≤ i < j ≤ n. There are t test cases.', '১ ≤ i < j ≤ n-এর ওপর i · j − k · (aᵢ | aⱼ) সর্বোচ্চ করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n k and the array.', 't; প্রতিটি টেস্টে n k আর অ্যারে।'),
  output: L('The maximum value.', 'সর্বোচ্চ মান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 3·10⁵, k ≤ min(n, 100), 0 ≤ aᵢ ≤ n', 'Σ n ≤ ৩·১০⁵, k ≤ min(n, ১০০), ০ ≤ aᵢ ≤ n')] },
  samples: [{ input: '4\n3 3\n1 1 3\n2 2\n1 2\n4 3\n0 1 2 3\n6 6\n3 2 0 0 5 6', output: '-1\n-4\n3\n12', explain: L('Fourth test: i = 3, j = 4, 12 − 0.', 'চতুর্থ টেস্ট: i = ৩, j = ৪, ১২ − ০।') }],
  observation: L('The pair (n − 1, n) gives at least (n − 1)n − 2kn. Since aᵢ | aⱼ ≤ 2n, any pair with i < n − 2k gives at most i · n < (n − 2k)n, which is no better. So only indices ≥ n − 2k matter: O(k²) pairs.', 'জোড়া (n − ১, n) অন্তত (n − ১)n − ২kn দেয়। aᵢ | aⱼ ≤ ২n বলে i < n − ২k এমন যেকোনো জোড়া সর্বোচ্চ i · n < (n − ২k)n দেয়, যা ভালো নয়। তাই শুধু n − ২k-এর সমান বা বড় ইনডেক্স গুরুত্বপূর্ণ: O(k²) জোড়া।'),
  approach: [L('Brute force over i, j in [max(1, n − 2k), n].', '[max(১, n − ২k), n]-এর i, j-এর ওপর ব্রুট ফোর্স।')],
  walkthrough: { input: 'n = 6, k = 6', steps: [{ state: 'window covers all indices', text: L('Best is (3, 4): 12 − 6 · (0 | 0) = 12.', 'সেরা (৩, ৪): ১২ − ৬ · (০ | ০) = ১২।') }] },
  complexity: { time: 'O(k²) per test', space: 'O(n)', why: L('About 4·10⁴ pairs.', 'প্রায় ৪·১০⁴টি জোড়া।') },
  solutions: [
    {
      id: 'window',
      kind: 'optimal',
      title: L('Only the last 2k indices', 'শুধু শেষ ২k ইনডেক্স'),
      idea: L('Bound the penalty, then brute force a small window.', 'জরিমানা সীমিত করে একটি ছোট উইন্ডোতে ব্রুট ফোর্স।'),
      explain: [L('A typical “prune by bounds” argument: compare the best a far-away candidate could ever get with what a near candidate already guarantees.', 'একটি সাধারণ “সীমা দিয়ে ছাঁটাই” যুক্তি: দূরের প্রার্থী সর্বোচ্চ যা পেতে পারে তা কাছের প্রার্থী যা নিশ্চিত দেয় তার সঙ্গে তুলনা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);
        long long best = LLONG_MIN;
        int from = max(1, n - 2 * k);
        for (int i = from; i <= n; i++)
            for (int j = i + 1; j <= n; j++)
                best = max(best, (long long)i * j - k * (a[i] | a[j]));
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(k²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs', 'সব জোড়া'),
      idea: L('Two loops over everything.', 'সবকিছুর ওপর দুটি লুপ।'),
      explain: [L('O(n²), too slow for n = 3·10⁵, but it checks the pruning argument.', 'O(n²), n = ৩·১০⁵-এ খুব ধীর, কিন্তু ছাঁটাই যুক্তি যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        long long best = LLONG_MIN;
        for (int i = 1; i <= n; i++)
            for (int j = i + 1; j <= n; j++) best = max(best, (long long)i * j - k * (a[i] | a[j]));
        cout << best << "\n";
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
  tests: [{ input: '4\n3 3\n1 1 3\n2 2\n1 2\n4 3\n0 1 2 3\n6 6\n3 2 0 0 5 6', output: '-1\n-4\n3\n12', source: 'sample', note: sample(1) }],
  pitfalls: [L('Taking only the last few indices without the 2k bound.', '২k সীমা ছাড়া শুধু শেষ কয়েকটি ইনডেক্স নেওয়া।')],
  related: [{ id: '1420B', name: 'Rock and Lever', why: L('Pairs with bitwise conditions.', 'বিটওয়াইজ শর্তসহ জোড়া।') }],
  toolkit: ['long-long'],
};

export const p1847B: ProblemEntry = {
  id: '1847B',
  contestId: 1847,
  index: 'B',
  name: 'Hamon Odyssey',
  rating: 1000,
  tags: ['bitmasks', 'greedy', 'two-pointers'],
  why: L('The minimum possible sum of ANDs is the AND of all; then cut greedily whenever the running AND hits 0.', 'AND-এর সর্বনিম্ন সম্ভাব্য যোগফল সবার AND; তারপর চলতি AND ০ ছুঁলেই গ্রিডিভাবে কাটা।'),
  statement: L('Split the array into contiguous groups so that the sum of the groups’ ANDs is minimal; among such splits, maximise the number of groups. There are t test cases.', 'অ্যারেকে পরপর দলে ভাগ করুন যাতে দলগুলোর AND-এর যোগফল সর্বনিম্ন হয়; এমন ভাগের মধ্যে দলের সংখ্যা সর্বোচ্চ করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The maximum number of groups.', 'দলের সর্বোচ্চ সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '3\n3\n1 2 3\n5\n2 3 1 5 2\n4\n5 7 12 6', output: '1\n2\n1', explain: L('2 3 1 5 2 → (2 3 1)(5 2): both ANDs are 0.', '২ ৩ ১ ৫ ২ → (২ ৩ ১)(৫ ২): দুটি AND-ই ০।') }],
  observation: L('Each group’s AND is ≥ the AND of everything, and splitting never lowers the total below it. If the total AND is positive, more groups only add more positive terms: answer 1. If it is 0, every group must have AND 0, and the greedy “cut as soon as the AND becomes 0” maximises the count; a leftover tail merges into the last group.', 'প্রতিটি দলের AND সবকিছুর AND-এর সমান বা বড়, আর ভাগ করা কখনো মোটকে এর নিচে নামায় না। মোট AND ধনাত্মক হলে বেশি দল শুধু বেশি ধনাত্মক পদ যোগ করে: উত্তর ১। এটি ০ হলে প্রতিটি দলের AND ০ হতে হবে, আর গ্রিডি “AND ০ হলেই কাটো” সংখ্যা সর্বোচ্চ করে; বাকি লেজ শেষ দলে মেশে।'),
  approach: [L('Count greedy zero-AND groups; print max(1, count).', 'গ্রিডি শূন্য-AND দল গুনুন; max(১, গণনা) প্রিন্ট।')],
  walkthrough: { input: '2 3 1 5 2', steps: [{ state: '2 & 3 & 1 = 0 → cut; 5 & 2 = 0 → cut', text: L('2 groups.', '২টি দল।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Cut when the AND reaches 0', 'AND ০ হলে কাটা'),
      idea: L('Reset the accumulator to all ones after each cut.', 'প্রতিটি কাটার পরে অ্যাকুমুলেটর সব-এক-এ ফেরানো।'),
      explain: [L('AND over a growing window only decreases, so the earliest point where it reaches 0 is the shortest valid group: the classic greedy for “as many pieces as possible”.', 'বাড়তে থাকা উইন্ডোর AND শুধু কমে, তাই যেখানে প্রথম ০ হয় সেটিই সবচেয়ে ছোট বৈধ দল: “যত বেশি টুকরো সম্ভব”-এর ক্লাসিক গ্রিডি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        int cur = -1, groups = 0;
        for (int i = 0; i < n; i++) {
            int a;
            scanf("%d", &a);
            cur &= a;
            if (cur == 0) { groups++; cur = -1; }
        }
        printf("%d\n", max(1, groups));
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP over split points', 'ভাগের বিন্দুর ওপর DP'),
      idea: L('dp[i] = (minimum sum, maximum groups) for the prefix of length i.', 'dp[i] = i দৈর্ঘ্যের প্রিফিক্সের (সর্বনিম্ন যোগফল, সর্বোচ্চ দল)।'),
      explain: [L('O(n²): compare (sum, −groups) lexicographically over the last group’s start. It makes no greedy assumption.', 'O(n²): শেষ দলের শুরুর ওপর (যোগফল, −দল) অভিধানক্রমে তুলনা। এটি কোনো গ্রিডি ধারণা করে না।')],
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
        vector<pair<long long, int>> dp(n + 1, {LLONG_MAX, 0});  // (sum, -groups)
        dp[0] = {0, 0};
        for (int i = 1; i <= n; i++) {
            int acc = -1;
            for (int j = i; j >= 1; j--) {
                acc &= a[j - 1];
                pair<long long, int> cand = {dp[j - 1].first + acc, dp[j - 1].second - 1};
                dp[i] = min(dp[i], cand);
            }
        }
        cout << -dp[n].second << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['pair', 'min-max'],
    },
  ],
  tests: [{ input: '3\n3\n1 2 3\n5\n2 3 1 5 2\n4\n5 7 12 6', output: '1\n2\n1', source: 'sample', note: sample(1) }],
  pitfalls: [L('Printing 0 when no group reaches AND 0.', 'কোনো দল AND ০-তে না পৌঁছালে ০ প্রিন্ট।')],
  related: [{ id: '1559A', name: 'Mocha and Math', why: L('AND of a whole array.', 'পুরো অ্যারের AND।') }],
  toolkit: ['bitwise-and'],
};

export const p1979B: ProblemEntry = {
  id: '1979B',
  contestId: 1979,
  index: 'B',
  name: 'XOR Sequences',
  rating: 1000,
  tags: ['bitmasks', 'greedy'],
  why: L('Two XOR sequences agree on a block exactly when the block never touches the lowest bit where x and y differ.', 'দুটি XOR ক্রম একটি অংশে মেলে ঠিক তখনই যখন অংশটি x আর y-এর আলাদা সবচেয়ে নিচু বিট কখনো ছোঁয় না।'),
  statement: L('aₙ = n ^ x and bₙ = n ^ y for n ≥ 1 (x ≠ y). Find the length of the longest common contiguous subsegment of a and b. There are t test cases.', 'n ≥ ১-এর জন্য aₙ = n ^ x আর bₙ = n ^ y (x ≠ y)। a আর b-এর সবচেয়ে লম্বা সাধারণ পরপর উপ-অংশের দৈর্ঘ্য বের করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t, then x y per test.', 't, তারপর প্রতিটি টেস্টে x y।'),
  output: L('The length.', 'দৈর্ঘ্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('x, y < 2³⁰', 'x, y < ২³⁰')] },
  samples: [{ input: '4\n0 1\n12 4\n57 37\n316560849 14570961', output: '1\n8\n4\n33554432', explain: L('12 ^ 4 = 8: the answer is 8.', '১২ ^ ৪ = ৮: উত্তর ৮।') }],
  observation: L('aᵢ = bⱼ means j = i ^ x ^ y = i ^ z. Consecutive runs i, i + 1, … map to consecutive j only while the bits below the lowest set bit of z keep carrying identically, which lasts for a block of length 2ᵏ, where 2ᵏ is the lowest set bit of z.', 'aᵢ = bⱼ মানে j = i ^ x ^ y = i ^ z। পরপর i, i + ১, … পরপর j-তে যায় শুধু যতক্ষণ z-এর সবচেয়ে নিচু সেট বিটের নিচের বিটগুলো একইভাবে হাতে বহন করে, যা ২ᵏ দৈর্ঘ্যের একটি অংশ ধরে চলে, যেখানে ২ᵏ হলো z-এর সবচেয়ে নিচু সেট বিট।'),
  approach: [L('z = x ^ y; print z & −z.', 'z = x ^ y; z & −z প্রিন্ট।')],
  walkthrough: { input: '57 37', steps: [{ state: 'z = 28 = 11100₂', text: L('Lowest bit 4.', 'সবচেয়ে নিচু বিট ৪।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One bit trick.', 'একটি বিট কৌশল।') },
  solutions: [
    {
      id: 'lowbit',
      kind: 'optimal',
      title: L('Lowest set bit of x ^ y', 'x ^ y-এর সবচেয়ে নিচু সেট বিট'),
      idea: L('z & −z isolates the lowest bit.', 'z & −z সবচেয়ে নিচু বিট আলাদা করে।'),
      explain: [L('In two’s complement, −z = ~z + 1 flips every bit above the lowest 1, so z & −z keeps only that bit. The same trick drives Fenwick trees.', 'টু’স কমপ্লিমেন্টে −z = ~z + ১ সবচেয়ে নিচু ১-এর ওপরের প্রতিটি বিট উল্টায়, তাই z & −z শুধু সেই বিট রাখে। একই কৌশল ফেনউইক ট্রি চালায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x, y;
        cin >> x >> y;
        long long z = x ^ y;
        cout << (z & -z) << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Compare the sequences directly', 'ক্রমগুলো সরাসরি তুলনা'),
      idea: L('For each start i, align with j = i ^ x ^ y and extend while terms match.', 'প্রতিটি শুরু i-এর জন্য j = i ^ x ^ y-এর সঙ্গে মিলিয়ে পদগুলো মেলা পর্যন্ত বাড়ানো।'),
      explain: [L('Only works for small x and y, but it uses nothing but the definition, so it confirms the bit argument.', 'শুধু ছোট x আর y-এ চলে, কিন্তু সংজ্ঞা ছাড়া কিছুই ব্যবহার করে না, তাই বিটের যুক্তি নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x, y;
        cin >> x >> y;
        if (max(x, y) > 1000) { cout << "\n"; continue; }
        long long best = 0;
        for (long long i = 1; i <= 4096; i++) {
            long long j = i ^ x ^ y;
            if (j < 1) continue;
            long long len = 0;
            while (((i + len) ^ x) == ((j + len) ^ y)) len++;
            best = max(best, len);
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(range · answer)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['while-n'],
    },
  ],
  tests: [{ input: '4\n0 1\n12 4\n57 37\n316560849 14570961', output: '1\n8\n4\n33554432', source: 'sample', note: sample(1) }],
  pitfalls: [L('Answering the highest differing bit instead of the lowest.', 'সবচেয়ে নিচুর বদলে সবচেয়ে উঁচু আলাদা বিট উত্তর।')],
  related: [{ id: '1420B', name: 'Rock and Lever', why: L('Bit positions decide.', 'বিটের অবস্থান ঠিক করে।') }],
  toolkit: ['bitwise-and'],
};

export const p276D: ProblemEntry = {
  id: '276D',
  contestId: 276,
  index: 'D',
  name: 'Little Girl and Maximum XOR',
  rating: 1700,
  tags: ['bitmasks', 'dp', 'greedy', 'implementation', 'math'],
  why: L('Above the highest differing bit of l and r, every number in the range agrees; below it, everything can be made 1.', 'l আর r-এর সবচেয়ে উঁচু আলাদা বিটের ওপরে পরিসরের প্রতিটি সংখ্যা একমত; এর নিচে সবকিছু ১ করা যায়।'),
  statement: L('Find the maximum of a ^ b over l ≤ a ≤ b ≤ r.', 'l ≤ a ≤ b ≤ r-এর ওপর a ^ b-এর সর্বোচ্চ বের করুন।'),
  input: L('l r.', 'l r।'),
  output: L('The maximum XOR.', 'সর্বোচ্চ XOR।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ l ≤ r ≤ 10¹⁸', '১ ≤ l ≤ r ≤ ১০¹⁸')] },
  samples: [
    { input: '1 2', output: '3', explain: L('1 ^ 2.', '১ ^ ২।') },
    { input: '8 16', output: '31', explain: L('15 ^ 16.', '১৫ ^ ১৬।') },
    { input: '1 1', output: '0', explain: L('Only a = b.', 'শুধু a = b।') },
  ],
  observation: L('Let p be the highest bit where l and r differ. Every number in [l, r] shares the bits above p, so they cancel in any XOR. Take a = (common prefix) 0 111…1 and b = (common prefix) 1 000…0: both are in [l, r], and a ^ b = 2ᵖ⁺¹ − 1, the maximum possible.', 'p হলো সবচেয়ে উঁচু বিট যেখানে l আর r আলাদা। [l, r]-এর প্রতিটি সংখ্যা p-এর ওপরের বিট ভাগ করে, তাই যেকোনো XOR-এ এরা বাতিল হয়। a = (সাধারণ প্রিফিক্স) ০ ১১১…১ আর b = (সাধারণ প্রিফিক্স) ১ ০০০…০ নিন: দুটিই [l, r]-এ, আর a ^ b = ২ᵖ⁺¹ − ১, সর্বোচ্চ সম্ভব।'),
  approach: [L('If l == r print 0, else 2^(bitlength(l ^ r)) − 1.', 'l == r হলে ০, নইলে ২^(l ^ r-এর বিট দৈর্ঘ্য) − ১।')],
  walkthrough: { input: '8 16', steps: [{ state: '8 ^ 16 = 24 = 11000₂ (5 bits)', text: L('2⁵ − 1 = 31.', '২⁵ − ১ = ৩১।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One bit operation.', 'একটি বিট অপারেশন।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('All ones below the highest differing bit', 'সবচেয়ে উঁচু আলাদা বিটের নিচে সব এক'),
      idea: L('2^(⌊log₂(l ^ r)⌋ + 1) − 1.', '২^(⌊log₂(l ^ r)⌋ + ১) − ১।'),
      explain: [L('Use 64-bit shifts (1LL << …) because r reaches 10¹⁸ ≈ 2⁶⁰.', '৬৪-বিট শিফট (1LL << …) ব্যবহার করুন কারণ r ১০¹⁸ ≈ ২⁶⁰ পর্যন্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long l, r;
    cin >> l >> r;
    if (l == r) { cout << 0 << "\n"; return 0; }
    int p = 63 - __builtin_clzll(l ^ r);
    cout << (p == 62 ? LLONG_MAX : (1LL << (p + 1)) - 1) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'long-long'],
    },
    {
      id: 'bit-dp',
      kind: 'method',
      title: L('Bit-by-bit greedy from the top', 'ওপর থেকে বিট ধরে গ্রিডি'),
      idea: L('Scan bits from 60 down; once l and r differ at some bit, every lower bit can contribute.', '৬০ থেকে নিচে বিট স্ক্যান; l আর r কোনো বিটে আলাদা হলে নিচের প্রতিটি বিট অবদান রাখতে পারে।'),
      explain: [L('The same idea written as a scan, which is the template for harder “maximise XOR in a range” digit DPs where l and r are tracked as tight bounds.', 'একই ধারণা স্ক্যান হিসেবে লেখা, যা কঠিন “পরিসরে XOR সর্বোচ্চ” অঙ্ক DP-এর টেমপ্লেট যেখানে l আর r কঠোর সীমা হিসেবে রাখা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long l, r;
    cin >> l >> r;
    long long ans = 0;
    bool differ = false;
    for (int b = 60; b >= 0; b--) {
        if (!differ && ((l >> b) & 1) != ((r >> b) & 1)) differ = true;
        if (differ) ans |= 1LL << b;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(log r)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'bool-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs in a small range', 'ছোট পরিসরে সব জোড়া'),
      idea: L('Two loops.', 'দুটি লুপ।'),
      explain: [L('Quadratic in r − l: only for checking.', 'r − l-এ বর্গীয়: শুধু যাচাইয়ের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long l, r;
    cin >> l >> r;
    if (r - l > 3000) { cout << "\n"; return 0; }
    long long best = 0;
    for (long long a = l; a <= r; a++)
        for (long long b = a; b <= r; b++) best = max(best, a ^ b);
    cout << best << "\n";
    return 0;
}
`,
      time: 'O((r − l)²)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '1 2', output: '3', source: 'sample', note: sample(1) },
    { input: '8 16', output: '31', source: 'sample', note: sample(2) },
    { input: '1 1', output: '0', source: 'sample', note: sample(3) },
    { input: '1 1000000000000000000', output: '1152921504606846975', source: 'own', note: L('Largest range: 2⁶⁰ − 1.', 'সবচেয়ে বড় পরিসর: ২⁶⁰ − ১।') },
  ],
  pitfalls: [L('Using int shifts.', 'int শিফট ব্যবহার।'), L('Printing r ^ l.', 'r ^ l প্রিন্ট।')],
  related: [{ id: '1979B', name: 'XOR Sequences', why: L('Bit positions of XOR.', 'XOR-এর বিট অবস্থান।') }],
  toolkit: ['bit-shift'],
};

export const p1325D: ProblemEntry = {
  id: '1325D',
  contestId: 1325,
  index: 'D',
  name: 'Ehab the Xorcist',
  rating: 1700,
  tags: ['bitmasks', 'constructive', 'greedy', 'number-theory'],
  why: L('sum = xor + 2 · and: the gap v − u must be even and non-negative, and three numbers always suffice.', 'যোগফল = xor + ২ · and: ফাঁক v − u জোড় আর অঋণাত্মক হতে হবে, আর তিনটি সংখ্যা সবসময় যথেষ্ট।'),
  statement: L('Find the shortest array of positive integers whose XOR is u and whose sum is v, or print −1.', 'ধনাত্মক পূর্ণসংখ্যার সবচেয়ে ছোট অ্যারে বের করুন যার XOR u আর যোগফল v, না হলে −১ প্রিন্ট করুন।'),
  input: L('u v.', 'u v।'),
  output: L('The length, then the elements (or −1).', 'দৈর্ঘ্য, তারপর উপাদানগুলো (অথবা −১)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('0 ≤ u, v ≤ 10¹⁸', '০ ≤ u, v ≤ ১০¹⁸'), anyAnswer] },
  samples: [
    { input: '2 4', output: '2\n3 1', explain: L('3 ^ 1 = 2, 3 + 1 = 4.', '৩ ^ ১ = ২, ৩ + ১ = ৪।') },
    { input: '1 3', output: '3\n1 1 1', explain: L('No pair works, three ones do.', 'কোনো জোড়া চলে না, তিনটি এক চলে।') },
    { input: '8 5', output: '-1', explain: L('The XOR can never exceed the sum.', 'XOR কখনো যোগফল ছাড়াতে পারে না।') },
    { input: '0 0', output: '0', explain: L('The empty array.', 'খালি অ্যারে।') },
  ],
  observation: L('XOR ≤ sum and they have the same parity, so u > v or odd v − u means −1. u = v: the empty array (u = 0) or [u]. Otherwise let x = (v − u) / 2: [u, x, x] always works. Two elements are possible iff u & x = 0, namely [u + x, x] (adding x to u causes no carries).', 'XOR ≤ যোগফল আর এদের জোড়-বিজোড় একই, তাই u > v বা বিজোড় v − u মানে −১। u = v: খালি অ্যারে (u = ০) বা [u]। নইলে x = (v − u) / ২: [u, x, x] সবসময় চলে। দুটি উপাদান সম্ভব ঠিক তখনই যখন u & x = ০, অর্থাৎ [u + x, x] (u-তে x যোগে হাতে কিছু নেই)।'),
  approach: [L('Case analysis in that order.', 'সেই ক্রমে ক্ষেত্র বিশ্লেষণ।')],
  walkthrough: { input: '1 3', steps: [{ state: 'x = 1, u & x = 1 ≠ 0', text: L('Three elements: 1 1 1.', 'তিনটি উপাদান: ১ ১ ১।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Arithmetic.', 'পাটিগণিত।') },
  solutions: [
    {
      id: 'cases',
      kind: 'optimal',
      title: L('Parity check, then [u + x, x] or [u, x, x]', 'জোড়-বিজোড় যাচাই, তারপর [u + x, x] বা [u, x, x]'),
      idea: L('a + b = (a ^ b) + 2(a & b).', 'a + b = (a ^ b) + ২(a & b)।'),
      explain: [L('The identity a + b = (a ^ b) + 2(a & b) explains everything: for two numbers with XOR u and sum v, their AND must be x = (v − u) / 2, and an AND must be disjoint from the XOR.', 'অভেদ a + b = (a ^ b) + ২(a & b) সব ব্যাখ্যা করে: XOR u আর যোগফল v-এর দুটি সংখ্যার AND হতেই হবে x = (v − u) / ২, আর AND XOR থেকে বিচ্ছিন্ন হতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long u, v;
    cin >> u >> v;
    if (u > v || (v - u) % 2) { cout << -1 << "\n"; return 0; }
    if (u == v) {
        if (u == 0) cout << 0 << "\n";
        else cout << 1 << "\n" << u << "\n";
        return 0;
    }
    long long x = (v - u) / 2;
    if ((u & x) == 0) cout << 2 << "\n" << (u + x) << " " << x << "\n";
    else cout << 3 << "\n" << u << " " << x << " " << x << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Search arrays of length 0 … 3', 'দৈর্ঘ্য ০ … ৩-এর অ্যারে খোঁজা'),
      idea: L('Try lengths in order; for small v enumerate the values.', 'দৈর্ঘ্য ক্রমে চেষ্টা; ছোট v-এ মানগুলো গণনা।'),
      explain: [L('Shows by search that the shortest answer never needs more than three numbers.', 'খুঁজে দেখায় যে সবচেয়ে ছোট উত্তরে কখনো তিনটির বেশি সংখ্যা লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long u, v;
    cin >> u >> v;
    if (v > 60) { cout << "\n"; return 0; }
    if (u == 0 && v == 0) { cout << 0 << "\n"; return 0; }
    if (u == v) { cout << 1 << "\n" << u << "\n"; return 0; }
    for (long long a = 1; a <= v; a++) {
        long long b = v - a;
        if (b >= 1 && (a ^ b) == u) { cout << 2 << "\n" << a << " " << b << "\n"; return 0; }
    }
    for (long long a = 1; a <= v; a++)
        for (long long b = 1; a + b < v; b++) {
            long long c = v - a - b;
            if ((a ^ b ^ c) == u) { cout << 3 << "\n" << a << " " << b << " " << c << "\n"; return 0; }
        }
    cout << -1 << "\n";
    return 0;
}
`,
      time: 'O(v²)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '2 4', output: '2\n3 1', source: 'sample', note: sample(1) },
    { input: '1 3', output: '3\n1 1 1', source: 'sample', note: sample(2) },
    { input: '8 5', output: '-1', source: 'sample', note: sample(3) },
    { input: '0 0', output: '0', source: 'sample', note: sample(4) },
    { input: '0 10', output: '2\n5 5', source: 'own', note: L('u = 0: two equal halves.', 'u = ০: দুটি সমান অর্ধেক।') },
  ],
  pitfalls: [L('Printing [u] for u = 0 (elements must be positive).', 'u = ০-এ [u] প্রিন্ট (উপাদান ধনাত্মক হতে হবে)।'), L('Missing the parity check.', 'জোড়-বিজোড় যাচাই বাদ।')],
  related: [{ id: '1559A', name: 'Mocha and Math', why: L('Bitwise identities.', 'বিটওয়াইজ অভেদ।') }],
  toolkit: ['bitwise-and'],
};
