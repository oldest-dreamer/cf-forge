import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 1730B
export const p1730B: ProblemEntry = {
  id: '1730B',
  contestId: 1730,
  index: 'B',
  name: 'Meeting on the Line',
  rating: 1600,
  tags: ['binary-search', 'geometry', 'greedy', 'implementation', 'math', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'The textbook ternary-search function: the time to meet at x is a maximum of “V” shapes, so it has one valley. And because the V’s have slopes ±1, the valley bottom has an exact formula — the same answer by search and by algebra.',
    'পাঠ্যবইয়ের টারনারি-সার্চ ফাংশন: x-এ মিলিত হওয়ার সময় “V” আকৃতির সর্বোচ্চ, তাই একটিই উপত্যকা। আর V-গুলোর ঢাল ±১ বলে উপত্যকার তলদেশের একটি সঠিক সূত্র আছে — সার্চ আর বীজগণিত একই উত্তর দেয়।',
  ),
  statement: L(
    'n friends stand on a line; friend i is at position xᵢ and needs tᵢ time units to get ready, then walks at speed 1. They want to meet at one point x. The meeting time is the moment the last friend arrives: max over i of (tᵢ + |x − xᵢ|). Find the point x that makes this smallest. (It is unique.)',
    'n জন বন্ধু একটি রেখায় দাঁড়িয়ে; বন্ধু i আছে xᵢ অবস্থানে আর তৈরি হতে tᵢ সময় লাগে, তারপর গতি ১-এ হাঁটে। তারা একটি বিন্দু x-এ মিলতে চায়। মিলনের সময় হলো শেষ বন্ধুর পৌঁছানোর মুহূর্ত: সব i-এর মধ্যে (tᵢ + |x − xᵢ|)-এর সর্বোচ্চ। যে x-এ এটি সবচেয়ে ছোট, সেই বিন্দু বের করো। (এটি অনন্য।)',
  ),
  input: L('t tests; each: n, the positions x₁ … xₙ, then the ready times t₁ … tₙ.', 't টি টেস্ট; প্রতিটিতে n, অবস্থান x₁ … xₙ, তারপর প্রস্তুতির সময় t₁ … tₙ।'),
  output: L('For each test print the optimal x (absolute or relative error up to 10⁻⁶).', 'প্রতিটি টেস্টে সেরা x প্রিন্ট করো (পরম বা আপেক্ষিক ত্রুটি ১০⁻⁶ পর্যন্ত)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 10⁵, 0 ≤ xᵢ, tᵢ ≤ 10⁸; the optimal x is a multiple of 0.5', 'Σ n ≤ ১০⁵, ০ ≤ xᵢ, tᵢ ≤ ১০⁸; সেরা x ০.৫-এর গুণিতক')] },
  samples: [
    { input: '1\n1\n0\n3', output: '0', explain: L('One friend: stay where he is.', 'একজন বন্ধু: সে যেখানে আছে সেখানেই।') },
    { input: '1\n2\n0 4\n0 0', output: '2', explain: L('Both are ready at once, so meet in the middle: time 2.', 'দুজনই সঙ্গে সঙ্গে তৈরি, তাই মাঝখানে মিলো: সময় ২।') },
    { input: '1\n3\n1 5 9\n6 0 0', output: '2', explain: L('The first friend is slow (6): go toward him. At x = 2 the times are 7, 3, 7.', 'প্রথম বন্ধু ধীর (৬): তার দিকে যাও। x = ২-এ সময় ৭, ৩, ৭।') },
  ],
  observation: L(
    'For one friend, tᵢ + |x − xᵢ| is a V. The maximum of V’s is a convex curve, so it has one valley and ternary search works. More exactly, let A = max(tᵢ + xᵢ) and B = max(tᵢ − xᵢ). Right of every friend the time is B + x, left of every friend it is A − x, and f(x) = max(B + x, A − x): the two lines cross at x = (A − B)/2.',
    'একজন বন্ধুর জন্য tᵢ + |x − xᵢ| একটি V। V-গুলোর সর্বোচ্চ একটি উত্তল রেখা, তাই উপত্যকা একটি আর টারনারি সার্চ চলে। আরও সঠিকভাবে, A = max(tᵢ + xᵢ) আর B = max(tᵢ − xᵢ) ধরো। সবার ডানে সময় B + x, সবার বাঁয়ে A − x, আর f(x) = max(B + x, A − x): দুটি রেখা x = (A − B)/২-এ কাটে।',
  ),
  approach: [
    L('Write f(x) = max over i of (tᵢ + |x − xᵢ|).', 'f(x) = সব i-এর (tᵢ + |x − xᵢ|)-এর সর্বোচ্চ লেখো।'),
    L('Either search the valley numerically, or compute A and B in one pass.', 'হয় উপত্যকাটি সংখ্যাগতভাবে খোঁজো, নয়তো এক পাসে A আর B হিসাব করো।'),
    L('Print (A − B)/2 with enough digits.', 'পর্যাপ্ত অঙ্কে (A − B)/২ প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'x = 1 5 9, t = 6 0 0',
    steps: [
      { state: 't + x = 7 5 9, t − x = 5 −5 −9', text: L('A = 9, B = 5.', 'A = ৯, B = ৫।') },
      { state: 'x = (9 − 5)/2 = 2', text: L('The two lines B + x and A − x meet at 2.', 'দুটি রেখা B + x আর A − x ২-এ মেলে।') },
      { state: 'f(2) = max(7, 3, 7) = 7', text: L('Moving to 1 or 3 makes the time 8.', '১ বা ৩-এ গেলে সময় ৮ হয়।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass for A and B. Ternary search is O(n · iterations).', 'A আর B-র জন্য এক পাস। টারনারি সার্চ O(n · পুনরাবৃত্তি)।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Closed form (A − B)/2', 'সূত্র (A − B)/২'),
      idea: L('The two outer lines of the V-maximum cross at the answer.', 'V-সর্বোচ্চের দুই বাইরের রেখা উত্তরে কাটে।'),
      explain: [
        L(
          'Any V satisfies tᵢ + |x − xᵢ| = max(tᵢ − xᵢ + x, tᵢ + xᵢ − x). Taking the maximum over all friends moves the max inside: f(x) = max(B + x, A − x). A rising line and a falling line: the minimum is where they are equal. The answer is half-integral, so doubles lose nothing.',
          'যেকোনো V-এর জন্য tᵢ + |x − xᵢ| = max(tᵢ − xᵢ + x, tᵢ + xᵢ − x)। সব বন্ধুর ওপর সর্বোচ্চ ভেতরে নিলে f(x) = max(B + x, A − x)। একটি ঊর্ধ্বগামী আর একটি নিম্নগামী রেখা: ন্যূনতম যেখানে তারা সমান। উত্তর অর্ধ-পূর্ণসংখ্যা, তাই double-এ কিছু হারায় না।',
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
        vector<long long> x(n), tt(n);
        for (auto& v : x) scanf("%lld", &v);
        for (auto& v : tt) scanf("%lld", &v);
        long long A = LLONG_MIN, B = LLONG_MIN;
        for (int i = 0; i < n; i++) A = max(A, tt[i] + x[i]), B = max(B, tt[i] - x[i]);
        printf("%.7f\n", (A - B) / 2.0);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'c-io', 'long-long'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on the real line', 'বাস্তব রেখায় টারনারি সার্চ'),
      idea: L('f is convex: cut the third that cannot contain the minimum, 100 times.', 'f উত্তল: যে তৃতীয়াংশে ন্যূনতম থাকতে পারে না তা ১০০ বার কাটো।'),
      explain: [
        L(
          'Start with [0, 10⁸]. With m1 and m2 at one third and two thirds, f(m1) < f(m2) means the minimum is left of m2, otherwise right of m1. Each round keeps two thirds; 100 rounds shrink the interval far below 10⁻⁶. This is the method that still works when f is convex but has no neat formula.',
          '[০, ১০⁸] দিয়ে শুরু। m1 আর m2 এক-তৃতীয়াংশ ও দুই-তৃতীয়াংশে; f(m1) < f(m2) হলে ন্যূনতম m2-র বাঁয়ে, নইলে m1-এর ডানে। প্রতি রাউন্ডে দুই-তৃতীয়াংশ থাকে; ১০০ রাউন্ডে ব্যবধান ১০⁻⁶-এর অনেক নিচে নামে। যখন f উত্তল কিন্তু পরিষ্কার সূত্র নেই, এই পদ্ধতিই তখনও চলে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<double> x, tt;

double f(double p) {
    double r = 0;
    for (int i = 0; i < n; i++) r = max(r, tt[i] + fabs(p - x[i]));
    return r;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%d", &n);
        x.assign(n, 0), tt.assign(n, 0);
        for (auto& v : x) scanf("%lf", &v);
        for (auto& v : tt) scanf("%lf", &v);
        double lo = 0, hi = 1e8;
        for (int it = 0; it < 100; it++) {
            double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (f(m1) < f(m2)) hi = m2;
            else lo = m1;
        }
        printf("%.7f\n", (lo + hi) / 2);
    }
    return 0;
}
`,
      time: 'O(100 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every half-integer point', 'প্রতিটি অর্ধ-পূর্ণসংখ্যা বিন্দু যাচাই'),
      idea: L('The optimum is a multiple of 0.5 inside [min x, max x]: evaluate them all.', 'সেরা বিন্দু [min x, max x]-এর মধ্যে ০.৫-এর গুণিতক: সবগুলো মূল্যায়ন।'),
      explain: [L('O(n · range): relies only on the definition of f and on the optimum being half-integral.', 'O(n · পরিসর): শুধু f-এর সংজ্ঞা আর সেরা বিন্দু অর্ধ-পূর্ণসংখ্যা হওয়ার ওপর নির্ভর করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> x(n), tt(n);
        for (int& v : x) scanf("%d", &v);
        for (int& v : tt) scanf("%d", &v);
        int lo = *min_element(x.begin(), x.end()), hi = *max_element(x.begin(), x.end());
        long long best = LLONG_MAX, bp = 0;  // work with doubled coordinates
        for (int p = 2 * lo; p <= 2 * hi; p++) {
            long long r = 0;
            for (int i = 0; i < n; i++) r = max(r, 2LL * tt[i] + abs(p - 2 * x[i]));
            if (r < best) best = r, bp = p;
        }
        printf("%.7f\n", bp / 2.0);
    }
    return 0;
}
`,
      time: 'O(n · range)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '1\n1\n0\n3', output: '0', source: 'sample', note: sample(1) },
    { input: '1\n2\n0 4\n0 0', output: '2', source: 'sample', note: sample(2) },
    { input: '1\n3\n1 5 9\n6 0 0', output: '2', source: 'sample', note: sample(3) },
    { input: '1\n2\n0 1\n0 0', output: '0.5', source: 'own', note: L('The answer is a half-integer: do not print an integer division.', 'উত্তর অর্ধ-পূর্ণসংখ্যা: পূর্ণসংখ্যার ভাগ প্রিন্ট কোরো না।') },
    { input: '1\n2\n100000000 0\n0 100000000', output: '0', source: 'own', note: L('The slow friend is at 0, so the meeting point is his position, not the midpoint.', 'ধীর বন্ধু ০-তে, তাই মিলনবিন্দু মধ্যবিন্দু নয়, তার অবস্থান।') },
    { input: '1\n2\n0 100000000\n0 0', output: '50000000', source: 'own', note: L('Large coordinates, both ready at once: the exact midpoint.', 'বড় স্থানাঙ্ক, দুজনই সঙ্গে সঙ্গে তৈরি: ঠিক মধ্যবিন্দু।') },
  ],
  pitfalls: [
    L('Dividing an integer A − B by 2 with integer division: 0.5 becomes 0.', 'পূর্ণসংখ্যা A − B-কে পূর্ণসংখ্যার ভাগে ২ দিয়ে ভাগ: ০.৫ হয়ে যায় ০।'),
    L('Ternary search with a fixed 30 rounds: the range 10⁸ needs about 50 to reach 10⁻⁶; use 100.', 'ধ্রুব ৩০ রাউন্ডে টারনারি সার্চ: ১০⁸ পরিসরে ১০⁻⁶ পেতে প্রায় ৫০ লাগে; ১০০ নাও।'),
    L('Forgetting that ties in f cannot hide the minimum: the maximum of V’s with slopes ±1 has no flat part except the bottom point.', 'এটা ভোলা যে f-এর সমান মান ন্যূনতম লুকাতে পারে না: ±১ ঢালের V-গুলোর সর্বোচ্চে তলদেশ বিন্দু ছাড়া কোনো সমতল অংশ নেই।'),
  ],
  related: [
    { id: '1301B', name: 'Motarack’s Birthday', why: L('Max of |k − c| terms again, with integers.', 'আবার |k − c| পদের সর্বোচ্চ, এবার পূর্ণসংখ্যায়।') },
    { id: '1288A', name: 'Deadline', why: L('A one-valley cost you can solve by search or by algebra.', 'একউপত্যকা খরচ যা সার্চে বা বীজগণিতে সমাধান হয়।') },
  ],
  toolkit: ['min-max', 'setprecision'],
};

// ───────────────────────────────────────────── 1156C
export const p1156C: ProblemEntry = {
  id: '1156C',
  contestId: 1156,
  index: 'C',
  name: 'Match Points',
  rating: 2000,
  tags: ['binary-search', 'greedy', 'sortings', 'ternary-search', 'two-pointers'],
  why: L(
    'The answer k is monotone, so you can binary-search it; but the exact pairing structure — the k smallest against the k largest — turns the check into one two-pointer sweep. Three views of one idea.',
    'উত্তর k একঘাতিক, তাই বাইনারি সার্চ চলে; কিন্তু জোড়ার সঠিক গঠন — k ক্ষুদ্রতম বনাম k বৃহত্তম — পরীক্ষাটাকে এক টু-পয়েন্টার সুইপে নামায়। একই ধারণার তিনটি রূপ।',
  ),
  statement: L(
    'n points lie on a line at coordinates x₁ … xₙ. Two points can be matched if their distance is at least z. Each point is used in at most one pair. Find the largest number of pairs.',
    'একটি রেখায় n টি বিন্দু, স্থানাঙ্ক x₁ … xₙ। দুটি বিন্দুর দূরত্ব অন্তত z হলে তাদের জোড়া দেওয়া যায়। প্রতিটি বিন্দু সর্বোচ্চ একটি জোড়ায়। সবচেয়ে বেশি জোড়ার সংখ্যা বের করো।',
  ),
  input: L('n z; then x₁ … xₙ.', 'n z; তারপর x₁ … xₙ।'),
  output: L('The maximum number of pairs.', 'সর্বোচ্চ জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, 1 ≤ z, xᵢ ≤ 10⁹', '২ ≤ n ≤ ২·১০⁵, ১ ≤ z, xᵢ ≤ ১০⁹')] },
  samples: [
    { input: '4 2\n1 3 3 7', output: '2', explain: L('Pairs (1, 3) and (3, 7).', 'জোড়া (১, ৩) আর (৩, ৭)।') },
    { input: '5 5\n10 9 5 8 7', output: '1', explain: L('Only 5 and 10 are far enough apart.', 'শুধু ৫ আর ১০ যথেষ্ট দূরে।') },
  ],
  observation: L(
    'If k pairs are possible, they can be the k smallest points matched with the k largest points, in order: the i-th smallest with the (n − k + i)-th. Swapping partners in any valid matching to this shape never breaks a distance condition. Then k is feasible exactly when x[n − k + i] − x[i] ≥ z for all i < k, and feasibility is monotone in k.',
    'k জোড়া সম্ভব হলে সেগুলোকে k ক্ষুদ্রতম বিন্দু আর k বৃহত্তম বিন্দুর ক্রমানুসারে জোড়া বানানো যায়: i-তম ক্ষুদ্রতম (n − k + i)-তমের সঙ্গে। যেকোনো বৈধ জোড়ায় সঙ্গী বদলে এই আকারে আনলে দূরত্বের শর্ত ভাঙে না। তখন k সম্ভব ঠিক তখনই যখন সব i < k-র জন্য x[n − k + i] − x[i] ≥ z, আর সম্ভাব্যতা k-তে একঘাতিক।',
  ),
  approach: [
    L('Sort the points.', 'বিন্দুগুলো সর্ট করো।'),
    L('Binary-search the largest k ≤ n/2 whose check passes.', 'যে বৃহত্তম k ≤ n/২-এর পরীক্ষা পাস করে তা বাইনারি সার্চে খোঁজো।'),
    L('Or sweep once: the left half’s pointer i advances whenever the right half’s pointer j finds a far-enough partner.', 'অথবা একবারে সুইপ করো: ডান অর্ধের পয়েন্টার j যথেষ্ট দূরের সঙ্গী পেলেই বাঁ অর্ধের পয়েন্টার i এগোয়।'),
  ],
  walkthrough: {
    input: 'n = 5, z = 5, sorted: 5 7 8 9 10',
    steps: [
      { state: 'k = 2: 8 − 5 = 3 < 5', text: L('Fails at the first pair, so 2 is too many.', 'প্রথম জোড়াতেই ব্যর্থ, তাই ২ বেশি।') },
      { state: 'k = 1: 10 − 5 = 5 ≥ 5', text: L('Passes: the answer is 1.', 'পাস: উত্তর ১।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('The sort dominates; the sweep is O(n), the binary search O(n log n).', 'সর্টই প্রধান; সুইপ O(n), বাইনারি সার্চ O(n log n)।') },
  solutions: [
    {
      id: 'two-pointers',
      kind: 'optimal',
      title: L('Sort, then one two-pointer sweep', 'সর্ট, তারপর একটি টু-পয়েন্টার সুইপ'),
      idea: L('Left pointer on the smaller half, right pointer scans the larger half.', 'বাম পয়েন্টার ছোট অর্ধে, ডান পয়েন্টার বড় অর্ধ স্ক্যান করে।'),
      explain: [
        L(
          'Take i over the first ⌊n/2⌋ points and j over the rest. For each j in increasing order, if x[j] − x[i] ≥ z, match them and advance i. A j that cannot serve the current smallest i could not serve any later i either (they are larger), so skipping it loses nothing.',
          'i প্রথম ⌊n/২⌋ বিন্দুতে আর j বাকিতে। j-কে বাড়তি ক্রমে নিয়ে x[j] − x[i] ≥ z হলে তাদের জোড়া করো আর i এগিয়ে দাও। যে j বর্তমান ক্ষুদ্রতম i-কে সেবা দিতে পারে না, সে পরের কোনো i-কেও পারত না (তারা বড়), তাই ছেড়ে দিলে ক্ষতি নেই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long z;
    scanf("%d %lld", &n, &z);
    vector<long long> x(n);
    for (auto& v : x) scanf("%lld", &v);
    sort(x.begin(), x.end());
    int i = 0, ans = 0;
    for (int j = n / 2; j < n; j++)
        if (i < n / 2 && x[j] - x[i] >= z) i++, ans++;
    printf("%d\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long'],
    },
    {
      id: 'binary-search',
      kind: 'better',
      title: L('Binary search on the number of pairs', 'জোড়ার সংখ্যায় বাইনারি সার্চ'),
      idea: L('Check k with the smallest-k vs largest-k pairing.', 'ক্ষুদ্রতম-k বনাম বৃহত্তম-k জোড়া দিয়ে k যাচাই।'),
      explain: [
        L(
          'Feasibility is monotone: if k pairs work, so do k − 1 (drop one). So binary-search k in [0, ⌊n/2⌋] with the O(k) check from the observation. It is a little slower than the sweep but shows the general “binary search the answer” pattern.',
          'সম্ভাব্যতা একঘাতিক: k জোড়া চললে k − ১-ও চলে (একটি বাদ দাও)। তাই পর্যবেক্ষণের O(k) পরীক্ষা দিয়ে [০, ⌊n/২⌋]-এ k বাইনারি সার্চ করো। সুইপের চেয়ে একটু ধীর, কিন্তু “উত্তরে বাইনারি সার্চ”-এর সাধারণ ছাঁচ দেখায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long z;
    scanf("%d %lld", &n, &z);
    vector<long long> x(n);
    for (auto& v : x) scanf("%lld", &v);
    sort(x.begin(), x.end());
    auto ok = [&](int k) {
        for (int i = 0; i < k; i++)
            if (x[n - k + i] - x[i] < z) return false;
        return true;
    };
    int lo = 0, hi = n / 2;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (ok(mid)) lo = mid;
        else hi = mid - 1;
    }
    printf("%d\n", lo);
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
      title: L('Bitmask DP over every matching', 'প্রতিটি জোড়ার ওপর বিটমাস্ক ডিপি'),
      idea: L('dp over subsets of used points: skip the lowest free point or pair it with any far-enough one.', 'ব্যবহৃত বিন্দুর উপসেটে ডিপি: সবচেয়ে ছোট মুক্ত বিন্দু ছাড়ো, নয়তো যথেষ্ট দূরের যেকোনোটির সঙ্গে জোড়া।'),
      explain: [L('Exponential but exhaustive, with no assumption about which pairs to choose: the independent check of the pairing claim.', 'সূচকীয় কিন্তু সম্পূর্ণ, কোন জোড়া বাছাই করতে হবে তা নিয়ে কোনো ধারণা ছাড়াই: জোড়া মেলানোর দাবির স্বাধীন যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
long long z;
vector<long long> x;
vector<int> memo;

int go(int mask) {
    if (mask == (1 << n) - 1) return 0;
    if (memo[mask] >= 0) return memo[mask];
    int i = 0;
    while (mask >> i & 1) i++;
    int best = go(mask | 1 << i);  // leave point i unmatched
    for (int j = i + 1; j < n; j++)
        if (!(mask >> j & 1) && llabs(x[i] - x[j]) >= z)
            best = max(best, 1 + go(mask | 1 << i | 1 << j));
    return memo[mask] = best;
}

int main() {
    scanf("%d %lld", &n, &z);
    x.resize(n);
    for (auto& v : x) scanf("%lld", &v);
    memo.assign(1 << n, -1);
    printf("%d\n", go(0));
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '4 2\n1 3 3 7', output: '2', source: 'sample', note: sample(1) },
    { input: '5 5\n10 9 5 8 7', output: '1', source: 'sample', note: sample(2) },
    { input: '2 1\n5 5', output: '0', source: 'own', note: L('Equal points are at distance 0 < z.', 'সমান বিন্দুর দূরত্ব ০ < z।') },
    { input: '6 1\n1 2 3 4 5 6', output: '3', source: 'own', note: L('Everyone can be paired: n / 2 is the ceiling.', 'সবাইকে জোড়া দেওয়া যায়: n / ২ হলো সীমা।') },
  ],
  pitfalls: [
    L('Starting j at n/2 + 1 or letting i run past the left half: both lose or invent pairs.', 'j-কে n/২ + ১-এ শুরু করা বা i-কে বাম অর্ধ ছাড়িয়ে যেতে দেওয়া: দুটিই জোড়া হারায় বা বানায়।'),
    L('Matching neighbours (1st with 2nd) instead of the smallest half with the largest half.', 'ক্ষুদ্রতম অর্ধ আর বৃহত্তম অর্ধের বদলে প্রতিবেশী (১ম-২য়) জোড়া মেলানো।'),
    L('Not sorting: the pairing argument is about sorted order.', 'সর্ট না করা: জোড়ার যুক্তি সর্টেড ক্রমের।'),
  ],
  related: [
    { id: '1244E', name: 'Minimizing Difference', why: L('Binary search on an answer that is checked by a sorted sweep.', 'সর্টেড সুইপে যাচাই করা উত্তরে বাইনারি সার্চ।') },
    { id: '1538C', name: 'Number of Pairs', why: L('Sorted pairs with a distance window.', 'দূরত্ব-জানালাসহ সর্টেড জোড়া।') },
  ],
  toolkit: ['sort', 'lambda'],
};

// ───────────────────────────────────────────── 1244E
export const p1244E: ProblemEntry = {
  id: '1244E',
  contestId: 1244,
  index: 'E',
  name: 'Minimizing Difference',
  rating: 2000,
  tags: ['binary-search', 'constructive', 'greedy', 'sortings', 'ternary-search', 'two-pointers'],
  featuredFor: ['ternary-search'],
  why: L(
    'A greedy that shrinks the cheaper end, and a second solution that nests a ternary search for the window position inside a binary search on its width. Both are standard shapes you will meet again.',
    'সস্তা প্রান্তটি ছোট করা একটি গ্রিডি, আর দ্বিতীয় সমাধানে জানালার প্রস্থের বাইনারি সার্চের ভেতরে জানালার অবস্থানের টারনারি সার্চ। দুটিই আবার দেখা মিলবে এমন প্রচলিত ছাঁচ।',
  ),
  statement: L(
    'You have an array a of n numbers and at most k operations; one operation adds 1 to or subtracts 1 from one element. Minimise the difference between the largest and the smallest element of the array after the operations.',
    'তোমার কাছে n টি সংখ্যার অ্যারে a আর সর্বোচ্চ k টি অপারেশন; একটি অপারেশনে একটি উপাদানে ১ যোগ বা বিয়োগ হয়। অপারেশনের পর অ্যারের বৃহত্তম আর ক্ষুদ্রতম উপাদানের পার্থক্য ন্যূনতম করো।',
  ),
  input: L('n k; then a₁ … aₙ.', 'n k; তারপর a₁ … aₙ।'),
  output: L('The smallest possible difference.', 'সম্ভাব্য সবচেয়ে ছোট পার্থক্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, 1 ≤ k ≤ 10¹⁴, 1 ≤ aᵢ ≤ 10⁹', '২ ≤ n ≤ ১০⁵, ১ ≤ k ≤ ১০¹⁴, ১ ≤ aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '4 5\n3 1 7 5', output: '2', explain: L('Raise 1 to 3 (2 ops), lower 7 to 5 (2 ops): values 3 3 5 5, difference 2.', '১-কে ৩ (২ ধাপ), ৭-কে ৫ (২ ধাপ): মান ৩ ৩ ৫ ৫, পার্থক্য ২।') },
    { input: '3 10\n100 100 100', output: '0', explain: L('Already equal.', 'আগে থেকেই সমান।') },
    { input: '10 9\n4 5 5 7 5 4 5 2 4 3', output: '1', explain: L('Nine operations are enough to squeeze everything into a window of width 1.', 'নয়টি অপারেশনেই সব কিছু প্রস্থ ১-এর জানালায় ঢুকে যায়।') },
  ],
  observation: L(
    'Only the two ends matter: raising the minimum or lowering the maximum shrinks the gap, and each step moves all the elements currently at that end. So always push the end that has fewer elements — it costs less per unit of progress. The partial last step uses leftover k on the cheaper side.',
    'শুধু দুই প্রান্ত গুরুত্বপূর্ণ: ক্ষুদ্রতমকে তোলা বা বৃহত্তমকে নামানো ফাঁক কমায়, আর প্রতিটি ধাপ ওই প্রান্তের সব উপাদানকেই নড়ায়। তাই সবসময় যে প্রান্তে কম উপাদান তাকে ঠেলো — প্রতি একক অগ্রগতিতে খরচ কম। শেষ আংশিক ধাপে বাকি k সস্তা পাশে খরচ হয়।',
  ),
  approach: [
    L('Sort a. Keep L = current minimum (with cₗ elements at it) and R = current maximum (with cᵣ elements).', 'a সর্ট করো। L = বর্তমান ক্ষুদ্রতম (cₗ টি উপাদান), R = বর্তমান বৃহত্তম (cᵣ টি উপাদান) রাখো।'),
    L('Move the side with the smaller count to the next distinct value, paying count · distance.', 'কম গণনার পাশটি পরের আলাদা মানে নাও, খরচ গণনা · দূরত্ব।'),
    L('If k cannot pay the whole step, spend ⌊k / count⌋ units on that side and stop.', 'k পুরো ধাপের খরচ দিতে না পারলে সেই পাশে ⌊k / গণনা⌋ একক খরচ করে থামো।'),
  ],
  walkthrough: {
    input: 'a = 1 3 5 7, k = 5',
    steps: [
      { state: 'L = 1 (1 elem), R = 7 (1 elem)', text: L('Counts are equal: raise L to 3, cost 1 · 2 = 2. k = 3.', 'গণনা সমান: L-কে ৩ করো, খরচ ১ · ২ = ২। k = ৩।') },
      { state: 'L = 3 (2 elem), R = 7 (1 elem)', text: L('Lower R to 5: cost 1 · 2 = 2. k = 1.', 'R-কে ৫ করো: খরচ ১ · ২ = ২। k = ১।') },
      { state: 'L = 3 (2), R = 5 (2)', text: L('Next step costs 2 · 2 = 4 > 1. Spend ⌊1 / 2⌋ = 0 and stop: difference 2.', 'পরের ধাপে ২ · ২ = ৪ > ১। ⌊১ / ২⌋ = ০ খরচ করে থামো: পার্থক্য ২।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Sorting, then each loop step passes a distinct value so there are at most n steps.', 'সর্টিং, তারপর প্রতিটি লুপ ধাপ একটি আলাদা মান পার হয়, তাই সর্বোচ্চ n ধাপ।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Shrink the cheaper end first', 'সস্তা প্রান্ত আগে ছোট করো'),
      idea: L('Compare the number of elements at each end and move the smaller group.', 'দুই প্রান্তের উপাদান সংখ্যা তুলনা করে ছোট দলটি সরাও।'),
      explain: [
        L(
          'At every moment the elements at the minimum are all equal, and likewise at the maximum. Moving a group toward the middle by one unit costs its size. Since reducing the gap by 1 can be done from either side, take the cheaper side; an exchange argument shows no plan beats that. When the next distinct value is too far for the remaining k, take as many whole units as k allows on the cheaper side.',
          'প্রতিটি মুহূর্তে ক্ষুদ্রতমের উপাদানগুলো সবাই সমান, বৃহত্তমের ক্ষেত্রেও তাই। একটি দলকে মাঝের দিকে ১ একক সরাতে তার আকারের সমান খরচ। ফাঁক ১ কমানো দুই পাশ থেকেই সম্ভব, তাই সস্তা পাশ নাও; বিনিময় যুক্তিতে দেখা যায় এর চেয়ে ভালো পরিকল্পনা নেই। পরের আলাদা মান বাকি k-র জন্য বেশি দূরে হলে সস্তা পাশে k যত পূর্ণ একক দেয় ততটাই নাও।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    ll k;
    scanf("%d %lld", &n, &k);
    vector<ll> a(n);
    for (ll& v : a) scanf("%lld", &v);
    sort(a.begin(), a.end());
    ll L = a[0], R = a[n - 1];
    int i = 0, j = n - 1;
    while (L < R) {
        while (i + 1 < n && a[i + 1] <= L) i++;
        while (j > 0 && a[j - 1] >= R) j--;
        ll cl = i + 1, cr = n - j;
        if (cl <= cr) {
            ll nxt = min(R, a[i + 1]);
            if (cl * (nxt - L) <= k) k -= cl * (nxt - L), L = nxt;
            else { L += k / cl; break; }
        } else {
            ll nxt = max(L, a[j - 1]);
            if (cr * (R - nxt) <= k) k -= cr * (R - nxt), R = nxt;
            else { R -= k / cr; break; }
        }
    }
    printf("%lld\n", R - L);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long', 'min-max'],
    },
    {
      id: 'binary-ternary',
      kind: 'method',
      title: L('Binary search the width, ternary search the window', 'প্রস্থে বাইনারি সার্চ, জানালায় টারনারি সার্চ'),
      idea: L('Width D is feasible iff some window [Lo, Lo + D] costs ≤ k; that cost is convex in Lo.', 'প্রস্থ D সম্ভব যদি কোনো জানালা [Lo, Lo + D]-র খরচ ≤ k; সেই খরচ Lo-তে উত্তল।'),
      explain: [
        L(
          'To fit everything into [Lo, Lo + D], an element below Lo pays Lo − aᵢ and one above pays aᵢ − Lo − D. That cost is convex in Lo, so a ternary search finds the cheapest window for each D; with sorted prefix sums each evaluation takes O(log n). A smaller D never costs less, so D itself is binary-searched: a ternary search nested inside a binary search.',
          '[Lo, Lo + D]-তে সবাইকে ঢোকাতে Lo-র নিচের উপাদান দেয় Lo − aᵢ আর ওপরের দেয় aᵢ − Lo − D। এই খরচ Lo-তে উত্তল, তাই টারনারি সার্চ প্রতিটি D-র সস্তা জানালা খুঁজে দেয়; সর্টেড প্রিফিক্স সামে প্রতি মূল্যায়ন O(log n)। ছোট D কখনো কম খরচে আসে না, তাই D-তে বাইনারি সার্চ: বাইনারি সার্চের ভেতরে টারনারি সার্চ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
int n;
ll k;
vector<ll> a, pre;

// cost of squeezing everything into [lo, lo + d]
ll cost(ll lo, ll d) {
    int i = lower_bound(a.begin(), a.end(), lo) - a.begin();          // a < lo
    int j = upper_bound(a.begin(), a.end(), lo + d) - a.begin();      // a <= lo + d
    return lo * i - pre[i] + (pre[n] - pre[j]) - (lo + d) * (n - j);
}

bool feasible(ll d) {
    ll lo = a[0], hi = a[n - 1];
    while (hi - lo > 2) {
        ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        ll f1 = cost(m1, d), f2 = cost(m2, d);
        if (f1 < f2) hi = m2 - 1;
        else if (f1 > f2) lo = m1 + 1;
        else lo = m1, hi = m2;
    }
    ll best = LLONG_MAX;
    for (ll x = lo; x <= hi; x++) best = min(best, cost(x, d));
    return best <= k;
}

int main() {
    scanf("%d %lld", &n, &k);
    a.resize(n);
    for (ll& v : a) scanf("%lld", &v);
    sort(a.begin(), a.end());
    pre.assign(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    ll lo = 0, hi = a[n - 1] - a[0];
    while (lo < hi) {
        ll mid = (lo + hi) / 2;
        if (feasible(mid)) hi = mid;
        else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
`,
      time: 'O(n + log C · log C · log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'lower-bound', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every width and every window position', 'প্রতিটি প্রস্থ আর প্রতিটি জানালা-অবস্থান চেষ্টা'),
      idea: L('For D = 0, 1, 2, … compute the window cost for every start and stop at the first D that fits in k.', 'D = ০, ১, ২, … প্রতিটির জন্য সব শুরুতে জানালার খরচ হিসাব করে k-তে ঢোকে এমন প্রথম D-তে থামো।'),
      explain: [L('O(range² · n): only for small values, but it makes no claim about greedy ends or convexity.', 'O(পরিসর² · n): শুধু ছোট মানে, কিন্তু গ্রিডি প্রান্ত বা উত্তলতা নিয়ে কোনো দাবি করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    ll k;
    scanf("%d %lld", &n, &k);
    vector<ll> a(n);
    ll mx = 0;
    for (ll& v : a) scanf("%lld", &v), mx = max(mx, v);
    for (ll d = 0; d <= mx; d++) {
        for (ll lo = 0; lo <= mx; lo++) {
            ll c = 0;
            for (ll v : a) c += max(0LL, lo - v) + max(0LL, v - lo - d);
            if (c <= k) { printf("%lld\n", d); return 0; }
        }
    }
    return 0;
}
`,
      time: 'O(max² · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '4 5\n3 1 7 5', output: '2', source: 'sample', note: sample(1) },
    { input: '3 10\n100 100 100', output: '0', source: 'sample', note: sample(2) },
    { input: '10 9\n4 5 5 7 5 4 5 2 4 3', output: '1', source: 'sample', note: sample(3) },
    { input: '2 100000000000000\n1 1000000000', output: '0', source: 'own', note: L('Huge k: everything meets in one point.', 'বিশাল k: সবাই এক বিন্দুতে মিলে যায়।') },
    { input: '3 1\n1 5 9', output: '7', source: 'own', note: L('k = 1 only buys one unit on the cheaper end.', 'k = ১ সস্তা প্রান্তে মাত্র এক একক কেনে।') },
  ],
  pitfalls: [
    L('Moving both ends by one step each: the leftover budget belongs to the cheaper side only.', 'দুই প্রান্তকে এক ধাপ করে সরানো: বাকি বাজেট কেবল সস্তা পাশের।'),
    L('Forgetting that a group’s size grows when it merges with the next value.', 'পরের মানের সঙ্গে মিশলে দলের আকার বাড়ে, তা ভুলে যাওয়া।'),
    L('k up to 10¹⁴ and count · distance up to 10¹⁴ as well: use long long everywhere.', 'k ১০¹⁴ পর্যন্ত আর গণনা · দূরত্বও ১০¹⁴ পর্যন্ত: সব জায়গায় long long।'),
  ],
  related: [
    { id: '439D', name: 'Devu and his Brother', why: L('The same convex cost with two arrays.', 'দুটি অ্যারেতে একই উত্তল খরচ।') },
    { id: '1156C', name: 'Match Points', why: L('Another sorted-array binary search.', 'আরেকটি সর্টেড-অ্যারে বাইনারি সার্চ।') },
  ],
  toolkit: ['sort', 'prefix-sum', 'lower-bound', 'long-long'],
};

// ───────────────────────────────────────────── 1538G
export const p1538G: ProblemEntry = {
  id: '1538G',
  contestId: 1538,
  index: 'G',
  name: 'Gift Set',
  rating: 2100,
  tags: ['binary-search', 'greedy', 'math', 'ternary-search'],
  why: L(
    'For a fixed number of gifts the whole question collapses to “is there an integer p in a range?” — an inequality you solve by hand. That makes the count binary-searchable, and the same check can also be done by a ternary search on a convex penalty.',
    'নির্দিষ্ট সংখ্যক উপহারের জন্য পুরো প্রশ্ন নেমে আসে “একটি পরিসরে পূর্ণসংখ্যা p আছে কি?”-তে — হাতে সমাধানযোগ্য অসমতা। তাই গণনা বাইনারি-সার্চযোগ্য হয়, আর একই পরীক্ষা উত্তল জরিমানার ওপর টারনারি সার্চেও করা যায়।',
  ),
  statement: L(
    'There are x red and y blue candies. A gift set is either a red and b blue candies, or b red and a blue candies. Find the largest number of gift sets that can be made at the same time.',
    'x টি লাল আর y টি নীল ক্যান্ডি আছে। একটি উপহার-সেট হলো a লাল ও b নীল, অথবা b লাল ও a নীল ক্যান্ডি। একই সঙ্গে সর্বাধিক কতগুলো সেট বানানো যায়, বের করো।',
  ),
  input: L('t tests, each with x y a b.', 't টি টেস্ট, প্রতিটিতে x y a b।'),
  output: L('For each test, the maximum number of sets.', 'প্রতিটি টেস্টে সর্বাধিক সেটের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ t ≤ 10⁴, 1 ≤ x, y, a, b ≤ 10⁹', '১ ≤ t ≤ ১০⁴, ১ ≤ x, y, a, b ≤ ১০⁹')] },
  samples: [
    {
      input: '9\n10 12 2 5\n1 1 2 2\n52 311 13 27\n1000000000 1000000000 1 1\n1000000000 1 1 1000000000\n1 1000000000 1000000000 1\n1 2 1 1\n7 8 1 2\n4 1 2 3',
      output: '3\n0\n4\n1000000000\n1\n1\n1\n5\n0',
      explain: L('For 10 12 2 5: three sets, e.g. two of (2 red, 5 blue) and one of (5 red, 2 blue). For 7 8 1 2 every candy is used: 5 sets of 3.', '১০ ১২ ২ ৫-এর জন্য: তিনটি সেট, যেমন দুটি (২ লাল, ৫ নীল) আর একটি (৫ লাল, ২ নীল)। ৭ ৮ ১ ২-এ প্রতিটি ক্যান্ডি ব্যবহার হয়: ৩টির ৫ সেট।'),
    },
  ],
  observation: L(
    'Assume a < b (swap otherwise). To make k sets, choose p sets of the form (a red, b blue) and k − p of the form (b red, a blue). Red used: pa + (k − p)b ≤ x; blue used: pb + (k − p)a ≤ y. Both are linear in p, giving p ≥ ⌈(kb − x)/(b − a)⌉ and p ≤ ⌊(y − ka)/(b − a)⌋. So k is feasible iff that interval meets [0, k]. And feasibility is monotone in k: fewer sets are always possible.',
    'ধরো a < b (নইলে বদলাও)। k টি সেটের জন্য p টি (a লাল, b নীল) আর k − p টি (b লাল, a নীল) নাও। লাল লাগে pa + (k − p)b ≤ x; নীল লাগে pb + (k − p)a ≤ y। দুটিই p-তে রৈখিক, তাই p ≥ ⌈(kb − x)/(b − a)⌉ আর p ≤ ⌊(y − ka)/(b − a)⌋। অতএব k সম্ভব যদি ওই ব্যবধান [০, k]-কে ছোঁয়। আর সম্ভাব্যতা k-তে একঘাতিক: কম সেট সবসময় সম্ভব।',
  ),
  approach: [
    L('If a = b the answer is ⌊min(x, y) / a⌋.', 'a = b হলে উত্তর ⌊min(x, y) / a⌋।'),
    L('Otherwise make a < b and binary-search the largest feasible k in [0, (x + y)/(a + b)].', 'নইলে a < b করে [০, (x + y)/(a + b)]-এ বৃহত্তম সম্ভব k বাইনারি সার্চে খোঁজো।'),
    L('For each k test that max(0, ⌈(kb − x)/(b − a)⌉) ≤ min(k, ⌊(y − ka)/(b − a)⌋).', 'প্রতিটি k-তে যাচাই করো: max(০, ⌈(kb − x)/(b − a)⌉) ≤ min(k, ⌊(y − ka)/(b − a)⌋)।'),
  ],
  walkthrough: {
    input: 'x = 10, y = 12, a = 2, b = 5',
    steps: [
      { state: 'k = 3', text: L('p ≥ ⌈(15 − 10)/3⌉ = 2 and p ≤ ⌊(12 − 6)/3⌋ = 2. p = 2 works.', 'p ≥ ⌈(১৫ − ১০)/৩⌉ = ২ আর p ≤ ⌊(১২ − ৬)/৩⌋ = ২। p = ২ চলে।') },
      { state: 'k = 4', text: L('p ≥ ⌈(20 − 10)/3⌉ = 4 but p ≤ ⌊(12 − 8)/3⌋ = 1. Empty: impossible.', 'p ≥ ⌈(২০ − ১০)/৩⌉ = ৪ কিন্তু p ≤ ⌊(১২ − ৮)/৩⌋ = ১। ফাঁকা: অসম্ভব।') },
      { state: 'answer', text: L('3 sets.', '৩টি সেট।') },
    ],
  },
  complexity: { time: 'O(log(x + y)) per test', space: 'O(1)', why: L('About 31 binary-search rounds, each a handful of 64-bit operations.', 'প্রায় ৩১ বাইনারি সার্চ রাউন্ড, প্রতিটিতে গুটিকয় ৬৪-বিট অপারেশন।') },
  solutions: [
    {
      id: 'binary-range',
      kind: 'optimal',
      title: L('Binary search on k with an interval check', 'k-তে বাইনারি সার্চ, ব্যবধান যাচাই'),
      idea: L('k sets are possible iff ⌈(kb − x)/(b − a)⌉ ≤ ⌊(y − ka)/(b − a)⌋, within [0, k].', 'k সেট সম্ভব ঠিক তখনই যখন [০, k]-র মধ্যে ⌈(kb − x)/(b − a)⌉ ≤ ⌊(y − ka)/(b − a)⌋।'),
      explain: [
        L(
          'The check is O(1) with floor and ceiling division that handles negatives (a plain / in C++ rounds toward zero). The count is monotone, so the standard “largest k that passes” binary search finishes in about 31 steps. Every product stays below 2·10¹⁸, so long long is enough.',
          'পরীক্ষা O(১), ঋণাত্মক সামলানো floor আর ceiling ভাগ দিয়ে (C++-এর সাধারণ / শূন্যের দিকে গোল করে)। গণনা একঘাতিক, তাই প্রচলিত “সবচেয়ে বড় যে k পাস করে” বাইনারি সার্চ প্রায় ৩১ ধাপে শেষ। প্রতিটি গুণফল ২·১০¹⁸-এর নিচে, তাই long long যথেষ্ট।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll fdiv(ll a, ll b) { return a / b - ((a % b != 0) && ((a < 0) != (b < 0))); }
ll cdiv(ll a, ll b) { return -fdiv(-a, b); }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll x, y, a, b;
        scanf("%lld %lld %lld %lld", &x, &y, &a, &b);
        if (a > b) swap(a, b);
        if (a == b) {
            printf("%lld\n", min(x, y) / a);
            continue;
        }
        auto ok = [&](ll k) {
            ll lo = max(0LL, cdiv(k * b - x, b - a));
            ll hi = min(k, fdiv(y - k * a, b - a));
            return lo <= hi;
        };
        ll lo = 0, hi = (x + y) / (a + b);
        while (lo < hi) {
            ll mid = (lo + hi + 1) / 2;
            if (ok(mid)) lo = mid;
            else hi = mid - 1;
        }
        printf("%lld\n", lo);
    }
    return 0;
}
`,
      time: 'O(log(x + y))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'lambda', 'min-max'],
    },
    {
      id: 'binary-ternary',
      kind: 'method',
      title: L('Binary search on k, ternary search on p', 'k-তে বাইনারি সার্চ, p-তে টারনারি সার্চ'),
      idea: L('For fixed k the shortfall g(p) of red and blue is convex in p; k works iff min g = 0.', 'নির্দিষ্ট k-র জন্য লাল-নীলের ঘাটতি g(p) p-তে উত্তল; k চলে ঠিক তখনই যখন min g = ০।'),
      explain: [
        L(
          'Define g(p) = max(0, pa + (k − p)b − x) + max(0, pb + (k − p)a − y): the red shortage plus the blue shortage when p sets use the (a, b) form. Each part is the maximum of two linear functions of p, so g is convex on [0, k]; a ternary search finds its minimum and k is feasible exactly when that minimum is 0. This avoids any ceiling or floor algebra at the price of an extra logarithm.',
          'g(p) = max(০, pa + (k − p)b − x) + max(০, pb + (k − p)a − y) ধরো: p টি সেট (a, b) রূপে হলে লালের ঘাটতি আর নীলের ঘাটতির যোগফল। প্রতিটি অংশ p-র দুটি রৈখিক ফাংশনের সর্বোচ্চ, তাই g [০, k]-তে উত্তল; টারনারি সার্চ এর ন্যূনতম খুঁজে দেয়, আর k সম্ভব ঠিক তখনই যখন সেই ন্যূনতম ০। এতে সিলিং-ফ্লোরের বীজগণিত লাগে না, বিনিময়ে একটি বাড়তি লগ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll x, y, a, b;
        scanf("%lld %lld %lld %lld", &x, &y, &a, &b);
        auto ok = [&](ll k) {
            auto g = [&](ll p) {
                return max(0LL, p * a + (k - p) * b - x) + max(0LL, p * b + (k - p) * a - y);
            };
            ll lo = 0, hi = k;
            while (hi - lo > 2) {
                ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
                ll g1 = g(m1), g2 = g(m2);
                if (g1 < g2) hi = m2 - 1;
                else if (g1 > g2) lo = m1 + 1;
                else lo = m1, hi = m2;
            }
            ll best = LLONG_MAX;
            for (ll p = lo; p <= hi; p++) best = min(best, g(p));
            return best == 0;
        };
        ll lo = 0, hi = (x + y) / (a + b);
        while (lo < hi) {
            ll mid = (lo + hi + 1) / 2;
            if (ok(mid)) lo = mid;
            else hi = mid - 1;
        }
        printf("%lld\n", lo);
    }
    return 0;
}
`,
      time: 'O(log² (x + y))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda', 'long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Grow k and try every split p', 'k বাড়াও আর প্রতিটি ভাগ p চেষ্টা'),
      idea: L('For k = 1, 2, … test whether some p in 0 … k fits both colours; stop at the first k that fails.', 'k = ১, ২, … প্রতিটির জন্য ০ … k-র কোনো p দুই রঙেই খাপ খায় কি যাচাই; প্রথম ব্যর্থ k-তে থামো।'),
      explain: [L('O(answer²): exact and assumption-free for small inputs.', 'O(উত্তর²): ছোট ইনপুটে সঠিক আর অনুমানমুক্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll x, y, a, b;
        scanf("%lld %lld %lld %lld", &x, &y, &a, &b);
        ll k = 0;
        for (;; k++) {
            ll K = k + 1;
            bool ok = false;
            for (ll p = 0; p <= K && !ok; p++)
                if (p * a + (K - p) * b <= x && p * b + (K - p) * a <= y) ok = true;
            if (!ok) break;
        }
        printf("%lld\n", k);
    }
    return 0;
}
`,
      time: 'O(answer²)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    {
      input: '9\n10 12 2 5\n1 1 2 2\n52 311 13 27\n1000000000 1000000000 1 1\n1000000000 1 1 1000000000\n1 1000000000 1000000000 1\n1 2 1 1\n7 8 1 2\n4 1 2 3',
      output: '3\n0\n4\n1000000000\n1\n1\n1\n5\n0',
      source: 'sample',
      note: sample(1),
    },
    { input: '2\n1000000000 1000000000 1 1000000000\n999999999 1000000000 1000000000 999999999', output: '1\n1', source: 'own', note: L('Extreme a and b: products near 10¹⁸ must not overflow.', 'চরম a ও b: ১০¹⁸-এর কাছের গুণফল যেন উপচে না পড়ে।') },
    { input: '1\n6 6 3 3', output: '2', source: 'own', note: L('a = b: the (x − kb)/(b − a) formula would divide by zero.', 'a = b: (x − kb)/(b − a) সূত্রে শূন্য দিয়ে ভাগ হতো।') },
  ],
  pitfalls: [
    L('Using C++ integer division on negative numerators: it truncates toward zero, not toward −∞. Write floor and ceiling helpers.', 'ঋণাত্মক লবে C++ পূর্ণসংখ্যা ভাগ: এটি −∞-র দিকে নয়, শূন্যের দিকে কাটে। floor আর ceiling সহায়ক লেখো।'),
    L('Not handling a = b separately: the interval formulas divide by b − a.', 'a = b আলাদাভাবে না সামলানো: ব্যবধানের সূত্রগুলো b − a দিয়ে ভাগ করে।'),
    L('Upper bound of the search: k ≤ (x + y)/(a + b) — starting at 10¹⁸ makes k·b overflow.', 'সার্চের ঊর্ধ্বসীমা: k ≤ (x + y)/(a + b) — ১০¹⁸ থেকে শুরু করলে k·b উপচে পড়ে।'),
  ],
  related: [
    { id: '1288A', name: 'Deadline', why: L('A ceiling turned into a clean inequality.', 'সিলিং থেকে পরিষ্কার অসমতা।') },
    { id: '1244E', name: 'Minimizing Difference', why: L('Another “binary search the answer, check by a convex minimisation”.', 'আরেকটি “উত্তরে বাইনারি সার্চ, উত্তল ন্যূনতমকরণে যাচাই”।') },
  ],
  toolkit: ['long-long', 'lambda'],
};
