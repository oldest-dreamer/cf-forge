import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 1978B
export const p1978B: ProblemEntry = {
  id: '1978B',
  contestId: 1978,
  index: 'B',
  name: 'New Bakery',
  rating: 800,
  tags: ['binary-search', 'greedy', 'math', 'ternary-search'],
  why: L(
    'The profit as a function of the promotion size k is a downward parabola, and the best k is where the next bun would sell below the usual price. An 800-rated warm-up that shows concave maximisation in four different ways.',
    'প্রোমোশনের আকার k-র ফাংশন হিসেবে লাভ একটি নিম্নমুখী প্যারাবোলা, আর সেরা k সেখানে যেখানে পরের বানটি স্বাভাবিক দামের কমে বিক্রি হবে। ৮০০ রেটিংয়ের এই ওয়ার্ম-আপ অবতল সর্বোচ্চকরণকে চারভাবে দেখায়।',
  ),
  statement: L(
    'Bob has n buns; the usual price of one is a. He picks an integer k with 0 ≤ k ≤ min(n, b) and sells the first k buns at prices b, b − 1, …, b − k + 1, and the other n − k buns at a each. Find the largest total profit.',
    'বব-এর n টি বান; একটির স্বাভাবিক দাম a। সে একটি পূর্ণসংখ্যা k বাছে যেখানে ০ ≤ k ≤ min(n, b), প্রথম k টি বান বিক্রি করে b, b − ১, …, b − k + ১ দামে, আর বাকি n − k টি a করে। সর্বাধিক মোট লাভ বের করো।',
  ),
  input: L('t tests, each with n, a, b.', 't টি টেস্ট, প্রতিটিতে n, a, b।'),
  output: L('For each test, the maximum profit.', 'প্রতিটি টেস্টে সর্বাধিক লাভ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 10⁴, 1 ≤ n, a, b ≤ 10⁹; the answer can reach 10¹⁸', '১ ≤ t ≤ ১০⁴, ১ ≤ n, a, b ≤ ১০⁹; উত্তর ১০¹⁸ ছুঁতে পারে')] },
  samples: [
    {
      input: '7\n4 4 5\n5 5 9\n10 10 5\n5 5 11\n1000000000 1000000000 1000000000\n1000000000 1000000000 1\n1000 1 1000',
      output: '17\n35\n100\n45\n1000000000000000000\n1000000000000000000\n500500',
      explain: L('For 4 4 5: k = 1 sells one bun at 5 and three at 4: 17. For 1000 1 1000 every promotional price beats 1, so k = 1000 and the profit is 1000 + 999 + … + 1 = 500500.', '৪ ৪ ৫-এর জন্য: k = ১-এ একটি বান ৫-এ আর তিনটি ৪-এ: ১৭। ১০০০ ১ ১০০০-এ প্রতিটি প্রোমো দাম ১-এর চেয়ে ভালো, তাই k = ১০০০ আর লাভ ১০০০ + ৯৯৯ + … + ১ = ৫০০৫০০।'),
    },
  ],
  observation: L(
    'The i-th promotional bun sells for b − i + 1. It is worth putting in the promotion exactly while b − i + 1 > a, that is i < b − a + 1. So k = min(n, max(0, b − a)) — and profit(k) = k·b − k(k − 1)/2 + (n − k)·a is a concave parabola whose peak is there.',
    'i-তম প্রোমো বান বিক্রি হয় b − i + ১ দামে। প্রোমোতে রাখা লাভজনক ঠিক ততক্ষণ যতক্ষণ b − i + ১ > a, অর্থাৎ i < b − a + ১। তাই k = min(n, max(০, b − a)) — আর profit(k) = k·b − k(k − ১)/২ + (n − k)·a একটি অবতল প্যারাবোলা যার চূড়া ওখানেই।',
  ),
  approach: [
    L('Compute k = min(n, max(0, b − a)).', 'k = min(n, max(০, b − a)) হিসাব করো।'),
    L('Print k·b − k(k − 1)/2 + (n − k)·a using 64-bit integers.', '৬৪-বিট পূর্ণসংখ্যায় k·b − k(k − ১)/২ + (n − k)·a প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'n = 4, a = 4, b = 5',
    steps: [
      { state: 'b − a = 1', text: L('Only the first promotional bun beats the usual price: k = 1.', 'শুধু প্রথম প্রোমো বান স্বাভাবিক দামের চেয়ে ভালো: k = ১।') },
      { state: 'profit = 1·5 − 0 + 3·4', text: L('5 + 12 = 17.', '৫ + ১২ = ১৭।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('A closed formula; search versions add a logarithm.', 'সরাসরি সূত্র; সার্চ সংস্করণে একটি লগ বাড়ে।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Take k = min(n, b − a)', 'k = min(n, b − a) নাও'),
      idea: L('Promote exactly the buns whose promotional price beats a.', 'ঠিক যে বানগুলোর প্রোমো দাম a-কে ছাড়ায় সেগুলোই প্রোমোতে।'),
      explain: [L('Each extra bun adds b − k + 1 − a to the profit, which is positive until k reaches b − a. A greedy marginal argument is a complete proof.', 'প্রতিটি অতিরিক্ত বান লাভে যোগ করে b − k + ১ − a, যা k, b − a-তে পৌঁছানো পর্যন্ত ধনাত্মক। প্রান্তিক গ্রিডি যুক্তিই সম্পূর্ণ প্রমাণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, a, b;
        scanf("%lld %lld %lld", &n, &a, &b);
        ll k = min(n, max(0LL, b - a));
        printf("%lld\n", k * b - k * (k - 1) / 2 + (n - k) * a);
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search the concave profit', 'অবতল লাভে টারনারি সার্চ'),
      idea: L('profit(k) rises and then falls: shrink [0, min(n, b)] toward the top.', 'profit(k) আগে বাড়ে, পরে কমে: [০, min(n, b)] চূড়ার দিকে ছোট করো।'),
      explain: [L('Compare profit(m1) and profit(m2); equal values mean the peak is between them (a concave function repeats a value only around its maximum). A few dozen rounds and a final scan.', 'profit(m1) আর profit(m2) তুলনা করো; সমান হলে চূড়া মাঝে (অবতল ফাংশন কোনো মান পুনরাবৃত্তি করে কেবল সর্বোচ্চের আশেপাশে)। কয়েক ডজন রাউন্ড আর শেষে একটি স্ক্যান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
ll n, a, b;

ll profit(ll k) { return k * b - k * (k - 1) / 2 + (n - k) * a; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%lld %lld %lld", &n, &a, &b);
        ll lo = 0, hi = min(n, b);
        while (hi - lo > 2) {
            ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (profit(m1) < profit(m2)) lo = m1 + 1;
            else if (profit(m1) > profit(m2)) hi = m2 - 1;
            else lo = m1, hi = m2;
        }
        ll best = 0;
        for (ll k = lo; k <= hi; k++) best = max(best, profit(k));
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'binary',
      kind: 'better',
      title: L('Binary search the last profitable bun', 'শেষ লাভজনক বান বাইনারি সার্চে খোঁজো'),
      idea: L('The marginal gain b − k + 1 − a is decreasing: find the largest k where it is still positive.', 'প্রান্তিক লাভ b − k + ১ − a কমতে থাকে: যে বৃহত্তম k-তে এটি এখনও ধনাত্মক তা খোঁজো।'),
      explain: [L('A monotone predicate on k, so the plain “largest k that passes” binary search works. Equivalent to the formula, but it needs no algebra at all.', 'k-র একঘাতিক শর্ত, তাই সাধারণ “সবচেয়ে বড় যে k পাস করে” বাইনারি সার্চ চলে। সূত্রের সমতুল্য, কিন্তু কোনো বীজগণিত লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, a, b;
        scanf("%lld %lld %lld", &n, &a, &b);
        ll lo = 0, hi = min(n, b);
        while (lo < hi) {
            ll k = (lo + hi + 1) / 2;
            if (b - k + 1 > a) lo = k;
            else hi = k - 1;
        }
        printf("%lld\n", lo * b - lo * (lo - 1) / 2 + (n - lo) * a);
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every k', 'প্রতিটি k চেষ্টা'),
      idea: L('Evaluate the profit for every k from 0 to min(n, b).', '০ থেকে min(n, b) পর্যন্ত প্রতিটি k-র লাভ হিসাব।'),
      explain: [L('O(n) per test, too slow for 10⁹ but the plain statement made executable.', 'প্রতি টেস্টে O(n), ১০⁹-এ ধীর, কিন্তু সরল প্রবলেম-বিবরণকেই চালানোর যোগ্য করা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, a, b;
        scanf("%lld %lld %lld", &n, &a, &b);
        ll best = 0;
        for (ll k = 0; k <= min(n, b); k++) {
            ll s = (n - k) * a;
            for (ll i = 1; i <= k; i++) s += b - i + 1;
            best = max(best, s);
        }
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '7\n4 4 5\n5 5 9\n10 10 5\n5 5 11\n1000000000 1000000000 1000000000\n1000000000 1000000000 1\n1000 1 1000', output: '17\n35\n100\n45\n1000000000000000000\n1000000000000000000\n500500', source: 'sample', note: sample(1) },
    { input: '1\n1 1 1', output: '1', source: 'own', note: L('Smallest case: promotion price equals the usual price.', 'সবচেয়ে ছোট কেস: প্রোমো দাম স্বাভাবিক দামের সমান।') },
    { input: '1\n1000000000 1 1000000000', output: '500000000500000000', source: 'own', note: L('Every bun in the promotion: a triangular number near 5·10¹⁷.', 'প্রতিটি বান প্রোমোতে: ৫·১০¹⁷-এর কাছে একটি ত্রিভুজ সংখ্যা।') },
  ],
  pitfalls: [
    L('Taking k = b without min(n, …): you cannot promote more buns than you have.', 'min(n, …) ছাড়া k = b নেওয়া: যত বান আছে তার বেশি প্রোমোতে দেওয়া যায় না।'),
    L('Using a negative k when b < a: clamp with max(0, b − a).', 'b < a হলে ঋণাত্মক k নেওয়া: max(০, b − a) দিয়ে আটকাও।'),
    L('int overflow: n·a reaches 10¹⁸.', 'int উপচে পড়া: n·a ১০¹⁸ ছোঁয়।'),
  ],
  related: [
    { id: '1288A', name: 'Deadline', why: L('Another concave quantity maximised at an integer.', 'আরেকটি অবতল রাশি যা পূর্ণসংখ্যায় সর্বোচ্চ।') },
    { id: '1413E', name: 'Solo mid Oracle', why: L('A parabola in the number of casts.', 'নিক্ষেপের সংখ্যায় একটি প্যারাবোলা।') },
  ],
  toolkit: ['long-long', 'min-max'],
};

// ───────────────────────────────────────────── 2009E
export const p2009E: ProblemEntry = {
  id: '2009E',
  contestId: 2009,
  index: 'E',
  name: 'Klee’s SUPER DUPER LARGE Array!!!',
  rating: 1400,
  tags: ['binary-search', 'math', 'ternary-search'],
  why: L(
    'The difference between the two halves is a strictly increasing function of the split point, so its absolute value is a clean V. You can binary-search the zero crossing, ternary-search the V, or solve the quadratic — and each must handle numbers near 10¹⁸.',
    'দুই অর্ধের পার্থক্য বিভাজন বিন্দুর কঠোরভাবে বর্ধমান ফাংশন, তাই এর পরম মান একটি পরিষ্কার V। শূন্য-অতিক্রম বাইনারি সার্চে খোঁজা যায়, V-তে টারনারি সার্চ করা যায়, বা দ্বিঘাত সমীকরণ সমাধান করা যায় — আর প্রতিটিকে ১০¹⁸-এর কাছের সংখ্যা সামলাতে হবে।',
  ),
  statement: L(
    'Klee has the array a = [k, k + 1, …, k + n − 1]. Choose an index i with 1 ≤ i ≤ n and let x = |(a₁ + … + aᵢ) − (aᵢ₊₁ + … + aₙ)|. Find the smallest possible x. Answer t tests.',
    'ক্লি-র কাছে অ্যারে a = [k, k + ১, …, k + n − ১]। একটি সূচক i বাছো যেখানে ১ ≤ i ≤ n, আর x = |(a₁ + … + aᵢ) − (aᵢ₊₁ + … + aₙ)|। সবচেয়ে ছোট সম্ভব x বের করো। t টি টেস্টের উত্তর দাও।',
  ),
  input: L('t tests, each with n and k.', 't টি টেস্ট, প্রতিটিতে n আর k।'),
  output: L('For each test, the minimum x.', 'প্রতিটি টেস্টে ন্যূনতম x।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ t ≤ 10⁴, 2 ≤ n, k ≤ 10⁹; sums reach about 1.5·10¹⁸', '১ ≤ t ≤ ১০⁴, ২ ≤ n, k ≤ ১০⁹; যোগফল প্রায় ১.৫·১০¹⁸ ছোঁয়')] },
  samples: [
    { input: '4\n2 2\n7 2\n5 3\n1000000000 1000000000', output: '1\n5\n1\n347369930', explain: L('For n = 2, k = 2 the array is 2 3: i = 1 gives |2 − 3| = 1. The last case needs 64-bit arithmetic and still fits.', 'n = ২, k = ২-এ অ্যারে ২ ৩: i = ১-এ |২ − ৩| = ১। শেষ কেসে ৬৪-বিট হিসাব লাগে, আর তাতে ঢুকে যায়।') },
  ],
  observation: L(
    'With Sᵢ the prefix sum, x(i) = |2Sᵢ − Sₙ|. Sᵢ increases strictly with i, so 2Sᵢ − Sₙ crosses zero at most once: x(i) falls, then rises. The best i is one of the two indices around the crossing.',
    'Sᵢ প্রিফিক্স সাম হলে x(i) = |২Sᵢ − Sₙ|। Sᵢ, i-র সঙ্গে কঠোরভাবে বাড়ে, তাই ২Sᵢ − Sₙ সর্বোচ্চ একবার শূন্য অতিক্রম করে: x(i) কমে, তারপর বাড়ে। সেরা i অতিক্রম বিন্দুর পাশের দুটি সূচকের একটি।',
  ),
  approach: [
    L('Sᵢ = i·k + i(i − 1)/2, and Sₙ is the same with i = n.', 'Sᵢ = i·k + i(i − ১)/২, আর Sₙ একই সূত্রে i = n।'),
    L('Binary-search the first i with 2Sᵢ ≥ Sₙ.', '২Sᵢ ≥ Sₙ হওয়া প্রথম i বাইনারি সার্চে খোঁজো।'),
    L('Print the smaller of x(i) and x(i − 1) (when i − 1 ≥ 1).', 'x(i) আর x(i − ১)-এর ছোটটি প্রিন্ট করো (যখন i − ১ ≥ ১)।'),
  ],
  walkthrough: {
    input: 'n = 7, k = 2',
    steps: [
      { state: 'array 2 3 4 5 6 7 8, Sₙ = 35', text: L('Need 2Sᵢ near 35.', '২Sᵢ ≈ ৩৫ দরকার।') },
      { state: 'S₄ = 14 → 28 − 35 = −7; S₅ = 20 → 40 − 35 = 5', text: L('The crossing lies between i = 4 and 5; the smaller |·| is 5.', 'অতিক্রম i = ৪ আর ৫-এর মাঝে; ছোট |·| হলো ৫।') },
    ],
  },
  complexity: { time: 'O(log n) per test', space: 'O(1)', why: L('Binary search on the index; the formula version is O(1).', 'সূচকে বাইনারি সার্চ; সূত্র সংস্করণ O(১)।') },
  solutions: [
    {
      id: 'binary',
      kind: 'optimal',
      title: L('Binary search the zero crossing', 'শূন্য-অতিক্রমে বাইনারি সার্চ'),
      idea: L('Find the first i with 2Sᵢ ≥ Sₙ and compare it with its left neighbour.', '২Sᵢ ≥ Sₙ-এর প্রথম i খুঁজে তার বাম প্রতিবেশীর সঙ্গে তুলনা করো।'),
      explain: [L('2Sᵢ ≤ 3·10¹⁸ fits in a signed 64-bit integer. The predicate is monotone because Sᵢ is increasing.', '২Sᵢ ≤ ৩·১০¹⁸ সাইনড ৬৪-বিটে ঢোকে। Sᵢ বর্ধমান বলে শর্তটি একঘাতিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, k;
        scanf("%lld %lld", &n, &k);
        auto S = [&](ll i) { return i * k + i * (i - 1) / 2; };
        ll total = S(n), lo = 1, hi = n;
        while (lo < hi) {
            ll mid = (lo + hi) / 2;
            if (2 * S(mid) >= total) hi = mid;
            else lo = mid + 1;
        }
        ll ans = llabs(2 * S(lo) - total);
        if (lo > 1) ans = min(ans, llabs(2 * S(lo - 1) - total));
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'lambda', 'min-max'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search the V', 'V-তে টারনারি সার্চ'),
      idea: L('x(i) = |2Sᵢ − Sₙ| decreases then increases: shrink [1, n] around its bottom.', 'x(i) = |২Sᵢ − Sₙ| কমে তারপর বাড়ে: এর তলদেশ ঘিরে [১, n] ছোট করো।'),
      explain: [L('A strictly monotone function inside an absolute value gives a V, never a flat stretch except at the bottom, so the comparison rule is safe. 35 rounds and a short scan.', 'পরম মানের ভেতরে কঠোরভাবে একঘাতিক ফাংশন একটি V দেয়, তলদেশ ছাড়া কোনো সমতল অংশ নেই, তাই তুলনার নিয়ম নিরাপদ। ৩৫ রাউন্ড আর ছোট স্ক্যান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
ll n, k;

ll S(ll i) { return i * k + i * (i - 1) / 2; }
ll x(ll i) { return llabs(2 * S(i) - S(n)); }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%lld %lld", &n, &k);
        ll lo = 1, hi = n;
        while (hi - lo > 2) {
            ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (x(m1) < x(m2)) hi = m2 - 1;
            else if (x(m1) > x(m2)) lo = m1 + 1;
            else lo = m1, hi = m2;
        }
        ll best = LLONG_MAX;
        for (ll i = lo; i <= hi; i++) best = min(best, x(i));
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'quadratic',
      kind: 'better',
      title: L('Solve the quadratic and check the neighbours', 'দ্বিঘাত সমাধান করে প্রতিবেশী যাচাই'),
      idea: L('2Sᵢ = Sₙ is i² + (2k − 1)i − Sₙ = 0; take the root and test the integers around it.', '২Sᵢ = Sₙ মানে i² + (২k − ১)i − Sₙ = ০; মূল নিয়ে তার আশেপাশের পূর্ণসংখ্যা যাচাই।'),
      explain: [L('(2k − 1)² + 4Sₙ is about 10¹⁹ and overflows a signed 64-bit integer, so take the square root in long double and then correct by checking the indices i₀ − 2 … i₀ + 2 exactly.', '(২k − ১)² + ৪Sₙ প্রায় ১০¹⁹ আর সাইনড ৬৪-বিটে উপচে পড়ে, তাই long double-এ বর্গমূল নিয়ে i₀ − ২ … i₀ + ২ সূচকগুলো সঠিকভাবে যাচাই করে শুধরে নাও।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, k;
        scanf("%lld %lld", &n, &k);
        auto S = [&](ll i) { return i * k + i * (i - 1) / 2; };
        long double b = 2.0L * k - 1, c = S(n);
        ll i0 = (ll)((-b + sqrtl(b * b + 4 * c)) / 2);
        ll best = LLONG_MAX;
        for (ll i = max(1LL, i0 - 2); i <= min(n, i0 + 2); i++) best = min(best, llabs(2 * S(i) - S(n)));
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'lambda', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every split point', 'প্রতিটি বিভাজন বিন্দু চেষ্টা'),
      idea: L('Build the array and evaluate every i.', 'অ্যারে বানিয়ে প্রতিটি i-র মান হিসাব।'),
      explain: [L('O(n) with a real array and real sums: the statement, literally.', 'আসল অ্যারে আর আসল যোগফলসহ O(n): প্রবলেমের হুবহু রূপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, k;
        scanf("%lld %lld", &n, &k);
        ll best = LLONG_MAX;
        for (ll i = 1; i <= n; i++) {
            ll l = 0, r = 0;
            for (ll j = 1; j <= n; j++) (j <= i ? l : r) += k + j - 1;
            best = min(best, llabs(l - r));
        }
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '4\n2 2\n7 2\n5 3\n1000000000 1000000000', output: '1\n5\n1\n347369930', source: 'sample', note: sample(1) },
    { input: '2\n2 3\n3 3', output: '1\n2', source: 'own', note: L('Tiny arrays 3 4 and 3 4 5 (the best split of the second is 3 4 | 5).', 'ছোট অ্যারে ৩ ৪ আর ৩ ৪ ৫ (দ্বিতীয়টির সেরা ভাগ ৩ ৪ | ৫)।') },
  ],
  pitfalls: [
    L('Computing (2k − 1)² + 4Sₙ in 64-bit integers: it is about 10¹⁹ and overflows.', '৬৪-বিট পূর্ণসংখ্যায় (২k − ১)² + ৪Sₙ হিসাব: এটি প্রায় ১০¹⁹, উপচে পড়ে।'),
    L('Forgetting that i = n is allowed (the right half is empty).', 'i = n অনুমোদিত (ডান অর্ধ ফাঁকা) তা ভুলে যাওয়া।'),
    L('Checking only one side of the crossing: the minimum may be at i − 1.', 'অতিক্রমের শুধু এক পাশ যাচাই: ন্যূনতম i − ১-এ হতে পারে।'),
  ],
  related: [
    { id: '1978B', name: 'New Bakery', why: L('Another integer peak of a smooth function.', 'মসৃণ ফাংশনের আরেকটি পূর্ণসংখ্যা চূড়া।') },
    { id: '289B', name: 'Polo the Penguin and Matrix', why: L('A sum of absolute values minimised at a median.', 'পরম মানের যোগফল যা মধ্যমায় ন্যূনতম।') },
  ],
  toolkit: ['long-long', 'lambda'],
};

// ───────────────────────────────────────────── 289B
export const p289B: ProblemEntry = {
  id: '289B',
  contestId: 289,
  index: 'B',
  name: 'Polo the Penguin and Matrix',
  rating: 1400,
  tags: ['brute-force', 'dp', 'implementation', 'sortings', 'ternary-search'],
  why: L(
    'Make all numbers equal by adding or subtracting d: first the residue test, then the classic “sum of |aᵢ − t| is smallest at the median”. The same cost is convex in t, so ternary search is a fair alternative, and brute force over targets is the safety net.',
    'd যোগ বা বিয়োগ করে সব সংখ্যা সমান করো: প্রথমে অবশেষ পরীক্ষা, তারপর প্রচলিত “|aᵢ − t|-এর যোগফল মধ্যমায় ক্ষুদ্রতম”। একই খরচ t-তে উত্তল, তাই টারনারি সার্চ ন্যায্য বিকল্প, আর লক্ষ্যমানের ওপর ব্রুট ফোর্স নিরাপত্তা-জাল।',
  ),
  statement: L(
    'A matrix has n rows and m columns. In one move you may add d to, or subtract d from, any single element. Find the minimum number of moves to make all elements equal, or print −1 if it is impossible.',
    'একটি ম্যাট্রিক্সে n সারি আর m কলাম। এক চালে যেকোনো একটি উপাদানে d যোগ বা বিয়োগ করা যায়। সব উপাদান সমান করতে ন্যূনতম কত চাল লাগে, বের করো; অসম্ভব হলে −১ প্রিন্ট করো।',
  ),
  input: L('n m d, then n rows of m integers.', 'n m d, তারপর n সারি, প্রতিটিতে m টি পূর্ণসংখ্যা।'),
  output: L('The minimum number of moves, or −1.', 'ন্যূনতম চাল সংখ্যা, বা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 100, 1 ≤ d ≤ 10⁴, 1 ≤ aᵢⱼ ≤ 10⁴', '১ ≤ n, m ≤ ১০০, ১ ≤ d ≤ ১০⁴, ১ ≤ aᵢⱼ ≤ ১০⁴')] },
  samples: [
    { input: '2 2 2\n2 4\n6 8', output: '4', explain: L('Make everything 4 (or 6): 2 → 4 is one move, 6 → 4 one, 8 → 4 two.', 'সবকিছু ৪ (বা ৬) করো: ২ → ৪ এক চাল, ৬ → ৪ এক, ৮ → ৪ দুই।') },
    { input: '1 2 7\n6 7', output: '-1', explain: L('6 and 7 differ by 1, which is not a multiple of 7.', '৬ আর ৭-এর পার্থক্য ১, যা ৭-এর গুণিতক নয়।') },
  ],
  observation: L(
    'Moves of size d never change a number modulo d, so all numbers must have the same remainder or the answer is −1. Then write aᵢ = r + d·qᵢ: the cost of target r + d·u is Σ|qᵢ − u|, a convex function of u that is smallest at a median of the qᵢ.',
    'd আকারের চাল কোনো সংখ্যার d মডুলো অবশেষ বদলায় না, তাই সব সংখ্যার অবশেষ সমান হতে হবে, নইলে উত্তর −১। তারপর aᵢ = r + d·qᵢ লেখো: লক্ষ্য r + d·u-এর খরচ Σ|qᵢ − u|, u-র উত্তল ফাংশন, qᵢ-র মধ্যমায় ক্ষুদ্রতম।',
  ),
  approach: [
    L('Read everything into one list; if any element has a different remainder mod d, print −1.', 'সব একটি তালিকায় পড়ো; কোনো উপাদানের d মডুলো অবশেষ আলাদা হলে −১ প্রিন্ট করো।'),
    L('Sort and take the median as the target.', 'সর্ট করে মধ্যমাকে লক্ষ্য নাও।'),
    L('The answer is Σ|aᵢ − median| / d.', 'উত্তর Σ|aᵢ − মধ্যমা| / d।'),
  ],
  walkthrough: {
    input: '2 4 6 8, d = 2',
    steps: [
      { state: 'all even', text: L('Same remainder 0: possible.', 'একই অবশেষ ০: সম্ভব।') },
      { state: 'sorted 2 4 6 8, median 6 (upper)', text: L('Distances 4 2 0 2, total 8; divide by d = 2.', 'দূরত্ব ৪ ২ ০ ২, মোট ৮; d = ২ দিয়ে ভাগ।') },
      { state: 'answer 4', text: L('Any target between 4 and 6 gives the same sum.', '৪ আর ৬-এর মাঝের যেকোনো লক্ষ্যে একই যোগফল।') },
    ],
  },
  complexity: { time: 'O(nm log(nm))', space: 'O(nm)', why: L('Sorting dominates; the ternary version is O(nm log 10⁴).', 'সর্টিংই প্রধান; টারনারি সংস্করণ O(nm log ১০⁴)।') },
  solutions: [
    {
      id: 'median',
      kind: 'optimal',
      title: L('Median target', 'মধ্যমা লক্ষ্য'),
      idea: L('Sort and move every element to the median.', 'সর্ট করে প্রতিটি উপাদান মধ্যমায় আনো।'),
      explain: [L('Σ|aᵢ − t| is smallest for any t between the two middle elements; the upper median is one of them. Dividing each distance by d is exact because the remainders agree.', 'Σ|aᵢ − t| মাঝের দুই উপাদানের মধ্যের যেকোনো t-তে ক্ষুদ্রতম; উপরের মধ্যমা তার একটি। অবশেষ সমান বলে প্রতিটি দূরত্বকে d দিয়ে ভাগ সঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, d;
    scanf("%d %d %d", &n, &m, &d);
    vector<int> a(n * m);
    for (int& x : a) scanf("%d", &x);
    for (int x : a)
        if (x % d != a[0] % d) {
            puts("-1");
            return 0;
        }
    sort(a.begin(), a.end());
    int med = a[a.size() / 2];
    long long moves = 0;
    for (int x : a) moves += abs(x - med) / d;
    printf("%lld\n", moves);
    return 0;
}
`,
      time: 'O(nm log nm)',
      space: 'O(nm)',
      accepted: true,
      toolkit: ['sort', 'modulo', 'long-long'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search the target', 'লক্ষ্যে টারনারি সার্চ'),
      idea: L('With qᵢ = (aᵢ − r)/d, the cost Σ|qᵢ − u| is convex in u: search u.', 'qᵢ = (aᵢ − r)/d ধরে খরচ Σ|qᵢ − u| u-তে উত্তল: u খোঁজো।'),
      explain: [L('No sorting at all — only the residue test and the convexity of a sum of absolute values. A flat part exists only where the cost is minimal (an even count of elements), so the “equal means the minimum is between” rule is safe.', 'কোনো সর্টিং নেই — শুধু অবশেষ পরীক্ষা আর পরম মানের যোগফলের উত্তলতা। সমতল অংশ শুধু যেখানে খরচ ন্যূনতম (জোড় সংখ্যক উপাদানে), তাই “সমান মানে ন্যূনতম মাঝে” নিয়ম নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
vector<ll> q;

ll cost(ll u) {
    ll s = 0;
    for (ll v : q) s += llabs(v - u);
    return s;
}

int main() {
    int n, m, d;
    scanf("%d %d %d", &n, &m, &d);
    vector<int> a(n * m);
    for (int& x : a) scanf("%d", &x);
    for (int x : a)
        if (x % d != a[0] % d) {
            puts("-1");
            return 0;
        }
    int r = a[0] % d;
    for (int x : a) q.push_back((x - r) / d);
    ll lo = 0, hi = *max_element(q.begin(), q.end());
    while (hi - lo > 2) {
        ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (cost(m1) < cost(m2)) hi = m2 - 1;
        else if (cost(m1) > cost(m2)) lo = m1 + 1;
        else lo = m1, hi = m2;
    }
    ll best = LLONG_MAX;
    for (ll u = lo; u <= hi; u++) best = min(best, cost(u));
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(nm log 10⁴)',
      space: 'O(nm)',
      accepted: true,
      toolkit: ['long-long', 'modulo', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every target value', 'প্রতিটি লক্ষ্যমান চেষ্টা'),
      idea: L('For every t between the smallest and largest value with the right remainder, add up the moves.', 'ঠিক অবশেষওয়ালা সবচেয়ে ছোট থেকে সবচেয়ে বড় মানের প্রতিটি t-র জন্য চাল যোগ করো।'),
      explain: [L('O(nm · range / d): no claim about medians or convexity.', 'O(nm · পরিসর / d): মধ্যমা বা উত্তলতা নিয়ে কোনো দাবি নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, d;
    scanf("%d %d %d", &n, &m, &d);
    vector<int> a(n * m);
    for (int& x : a) scanf("%d", &x);
    for (int x : a)
        if (x % d != a[0] % d) {
            puts("-1");
            return 0;
        }
    long long best = LLONG_MAX;
    for (int t = a[0] % d; t <= 100000; t += d) {
        long long s = 0;
        for (int x : a) s += abs(x - t) / d;
        best = min(best, s);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(nm · 10⁵ / d)',
      space: 'O(nm)',
      accepted: false,
      toolkit: ['for-loop', 'modulo'],
    },
  ],
  tests: [
    { input: '2 2 2\n2 4\n6 8', output: '4', source: 'sample', note: sample(1) },
    { input: '1 2 7\n6 7', output: '-1', source: 'sample', note: sample(2) },
    { input: '1 1 5\n9', output: '0', source: 'own', note: L('One element is already “all equal”.', 'একটিমাত্র উপাদান আগেই “সব সমান”।') },
    { input: '1 3 1\n1 10000 5000', output: '9999', source: 'own', note: L('d = 1: the median is 5000, so the moves are 4999 + 5000 + 0.', 'd = ১: মধ্যমা ৫০০০, তাই চাল ৪৯৯৯ + ৫০০০ + ০।') },
  ],
  pitfalls: [
    L('Testing the remainder against 0 instead of against the first element: only equality of remainders matters.', 'প্রথম উপাদানের বদলে ০-র সঙ্গে অবশেষ পরীক্ষা: শুধু অবশেষের সমতা গুরুত্বপূর্ণ।'),
    L('Using the mean as the target: the mean minimises squares, the median minimises absolute values.', 'গড়কে লক্ষ্য নেওয়া: গড় বর্গ ক্ষুদ্রতম করে, মধ্যমা পরম মান।'),
    L('Dividing each distance by d before checking the remainders.', 'অবশেষ পরীক্ষার আগেই প্রতিটি দূরত্বকে d দিয়ে ভাগ।'),
  ],
  related: [
    { id: '2009E', name: 'Klee’s SUPER DUPER LARGE Array!!!', why: L('A V-shaped absolute value over an index.', 'সূচকের ওপর V-আকৃতির পরম মান।') },
    { id: '439D', name: 'Devu and his Brother', why: L('A sum of one-sided distances over two arrays.', 'দুটি অ্যারেতে একমুখী দূরত্বের যোগফল।') },
  ],
  toolkit: ['sort', 'modulo'],
};

// ───────────────────────────────────────────── 1312C
export const p1312C: ProblemEntry = {
  id: '1312C',
  contestId: 1312,
  index: 'C',
  name: 'Adding Powers',
  rating: 1400,
  tags: ['bitmasks', 'greedy', 'implementation', 'math', 'number-theory', 'ternary-search'],
  why: L(
    'Base-k digits in disguise: step i may add kⁱ to one element at most once, so every number must be a sum of distinct powers and no power may be used by two numbers. Read it digit by digit, or greedily from the largest power.',
    'ছদ্মবেশে k-ভিত্তিক অঙ্ক: ধাপ i একটি উপাদানে সর্বোচ্চ একবার kⁱ যোগ করতে পারে, তাই প্রতিটি সংখ্যা আলাদা ঘাতের যোগফল হতে হবে আর কোনো ঘাত দুই সংখ্যায় ব্যবহার হবে না। অঙ্ক ধরে ধরে পড়ো, নয়তো সবচেয়ে বড় ঘাত থেকে গ্রিডি।',
  ),
  statement: L(
    'You start with an array of n zeros and an integer k. In step i (i = 0, 1, 2, …) you may either skip or add kⁱ to exactly one element. You may stop at any time. Can you obtain the given array a₁ … aₙ? Answer t tests.',
    'তুমি n টি শূন্যের অ্যারে আর একটি পূর্ণসংখ্যা k দিয়ে শুরু করো। ধাপ i-তে (i = ০, ১, ২, …) তুমি হয় ছেড়ে দিতে পারো, নয়তো ঠিক একটি উপাদানে kⁱ যোগ করতে পারো। যেকোনো সময় থামা যায়। দেওয়া অ্যারে a₁ … aₙ কি পাওয়া সম্ভব? t টি টেস্টের উত্তর দাও।',
  ),
  input: L('t; each test: n k, then a₁ … aₙ.', 't; প্রতিটি টেস্টে n k, তারপর a₁ … aₙ।'),
  output: L('YES or NO for each test.', 'প্রতিটি টেস্টে YES বা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ t ≤ 1000, 1 ≤ n ≤ 30, 2 ≤ k ≤ 100, 0 ≤ aᵢ ≤ 10¹⁶', '১ ≤ t ≤ ১০০০, ১ ≤ n ≤ ৩০, ২ ≤ k ≤ ১০০, ০ ≤ aᵢ ≤ ১০¹⁶')] },
  samples: [
    {
      input: '5\n4 100\n0 0 0 0\n1 2\n1\n3 4\n1 4 1\n3 2\n0 1 3\n3 9\n0 59049 810',
      output: 'YES\nYES\nNO\nNO\nYES',
      explain: L('1 4 1 with k = 4 needs 4⁰ twice (first and third element). 0 1 3 with k = 2 needs 2⁰ twice as well: 1 = 2⁰ and 3 = 2⁰ + 2¹. But 0 59049 810 works: 59049 = 9⁵ and 810 = 9³ + 9².', '১ ৪ ১ আর k = ৪-এ ৪⁰ দুবার লাগে (প্রথম ও তৃতীয় উপাদান)। ০ ১ ৩ আর k = ২-এও ২⁰ দুবার: ১ = ২⁰ আর ৩ = ২⁰ + ২¹। কিন্তু ০ ৫৯০৪৯ ৮১০ চলে: ৫৯০৪৯ = ৯⁵ আর ৮১০ = ৯³ + ৯²।'),
    },
  ],
  observation: L(
    'Write every aᵢ in base k. A digit larger than 1 means the same power would be needed twice by one element — impossible. And if two different elements both have digit 1 in the same position, that power is needed twice overall — also impossible. If neither happens, assign each power to the element that holds it.',
    'প্রতিটি aᵢ k-ভিত্তিতে লেখো। ১-এর বেশি অঙ্ক মানে একটি উপাদানেই একই ঘাত দুবার লাগবে — অসম্ভব। আর দুটি আলাদা উপাদানে একই স্থানে অঙ্ক ১ থাকলে সেই ঘাত মোট দুবার লাগবে — তাও অসম্ভব। কোনোটাই না ঘটলে প্রতিটি ঘাত যে উপাদানে আছে তাকে দাও।',
  ),
  approach: [
    L('Keep a counter of how many elements use each power position.', 'প্রতিটি ঘাত-স্থান কতটি উপাদান ব্যবহার করছে তার গণনা রাখো।'),
    L('Peel the digits of every aᵢ: reject a digit above 1, count each digit equal to 1.', 'প্রতিটি aᵢ-র অঙ্ক ছাড়াও: ১-এর বেশি অঙ্ক বাতিল, ১ হলে গণনা করো।'),
    L('Answer YES if no position is counted twice.', 'কোনো স্থান দুবার গণনা না হলে YES।'),
  ],
  walkthrough: {
    input: 'k = 4, a = 1 4 1',
    steps: [
      { state: '1 = (1)₄', text: L('Position 0 used once.', 'স্থান ০ একবার ব্যবহৃত।') },
      { state: '4 = (10)₄', text: L('Position 1 used once.', 'স্থান ১ একবার ব্যবহৃত।') },
      { state: '1 = (1)₄', text: L('Position 0 would be used a second time: NO.', 'স্থান ০ দ্বিতীয়বার ব্যবহৃত হতো: NO।') },
    ],
  },
  complexity: { time: 'O(n log_k max a)', space: 'O(log max a)', why: L('Each number has at most ~54 digits in base 2.', 'প্রতিটি সংখ্যায় ভিত্তি ২-এ সর্বোচ্চ প্রায় ৫৪ অঙ্ক।') },
  solutions: [
    {
      id: 'digits',
      kind: 'optimal',
      title: L('Base-k digits with a usage counter', 'ব্যবহার-গণনাসহ k-ভিত্তিক অঙ্ক'),
      idea: L('Every digit must be 0 or 1, and each position may be 1 in at most one element.', 'প্রতিটি অঙ্ক ০ বা ১ হতে হবে, আর প্রতিটি স্থান সর্বোচ্চ একটি উপাদানে ১।'),
      explain: [L('Step i can only add kⁱ once, so each power appears at most once in total across the array — and within one element at most once because it is the same step. That is exactly the digit/position condition.', 'ধাপ i শুধু একবারই kⁱ যোগ করতে পারে, তাই পুরো অ্যারেতে প্রতিটি ঘাত মোট সর্বোচ্চ একবার — আর এক উপাদানে সর্বোচ্চ একবার কারণ ধাপটি একই। এটাই ঠিক অঙ্ক/স্থান শর্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        ll k;
        scanf("%d %lld", &n, &k);
        vector<int> used(64, 0);
        bool ok = true;
        for (int i = 0; i < n; i++) {
            ll a;
            scanf("%lld", &a);
            for (int p = 0; a > 0; p++, a /= k) {
                ll digit = a % k;
                if (digit > 1) ok = false;
                else if (digit == 1 && ++used[p] > 1) ok = false;
            }
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n log a)',
      space: 'O(log a)',
      accepted: true,
      toolkit: ['modulo', 'long-long', 'vector'],
    },
    {
      id: 'greedy',
      kind: 'method',
      title: L('Greedy from the largest power', 'সবচেয়ে বড় ঘাত থেকে গ্রিডি'),
      idea: L('For each power from large to small, at most one element may be ≥ it; subtract it from that element.', 'বড় থেকে ছোট প্রতিটি ঘাতের জন্য সর্বোচ্চ একটি উপাদান তার সমান বা বড় হতে পারে; সেই উপাদান থেকে ঘাতটি বাদ দাও।'),
      explain: [L('All smaller powers together sum to less than kᵖ, so any element ≥ kᵖ must use kᵖ itself. Two such elements would need it twice: NO. At the end every element must have been reduced to exactly 0.', 'ছোট সব ঘাতের যোগফল kᵖ-র চেয়ে কম, তাই kᵖ-র সমান বা বড় যেকোনো উপাদানকে kᵖ নিজেই ব্যবহার করতে হবে। এমন দুটি উপাদান থাকলে দুবার লাগবে: NO। শেষে প্রতিটি উপাদান ঠিক ০ হতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        ll k;
        scanf("%d %lld", &n, &k);
        vector<ll> a(n);
        for (ll& x : a) scanf("%lld", &x);
        vector<ll> pw = {1};
        while (pw.back() <= (ll)2e16 / k) pw.push_back(pw.back() * k);
        bool ok = true;
        for (int p = (int)pw.size() - 1; p >= 0; p--) {
            int cnt = 0, who = -1;
            for (int i = 0; i < n; i++)
                if (a[i] >= pw[p]) cnt++, who = i;
            if (cnt > 1) ok = false;
            else if (cnt == 1) a[who] -= pw[p];
        }
        for (ll x : a) if (x != 0) ok = false;
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n log_k a)',
      space: 'O(log a)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Search over every step choice', 'প্রতিটি ধাপের সিদ্ধান্তে সার্চ'),
      idea: L('At step i either stop adding or add kⁱ to any element that stays within its target.', 'ধাপ i-তে যোগ বন্ধ করো, নয়তো লক্ষ্যের ভেতরে থাকে এমন যেকোনো উপাদানে kⁱ যোগ করো।'),
      explain: [L('A depth-first search over the real process; exponential, so only for tiny inputs, but it never uses the digit argument.', 'আসল প্রক্রিয়ার ওপর ডেপ্থ-ফার্স্ট সার্চ; সূচকীয়, তাই কেবল ছোট ইনপুটে, কিন্তু অঙ্ক-যুক্তি কখনো ব্যবহার করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
int n;
ll k;
vector<ll> a, cur;

bool go(ll pw) {
    if (cur == a) return true;
    ll mx = *max_element(a.begin(), a.end());
    if (pw > mx) return false;
    if (go(pw * k)) return true;  // skip this step
    for (int i = 0; i < n; i++)
        if (cur[i] + pw <= a[i]) {
            cur[i] += pw;
            bool r = go(pw * k);
            cur[i] -= pw;
            if (r) return true;
        }
    return false;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%d %lld", &n, &k);
        a.assign(n, 0);
        for (ll& x : a) scanf("%lld", &x);
        cur.assign(n, 0);
        puts(go(1) ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'O(log a)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '5\n4 100\n0 0 0 0\n1 2\n1\n3 4\n1 4 1\n3 2\n0 1 3\n3 9\n0 59049 810', output: 'YES\nYES\nNO\nNO\nYES', source: 'sample', note: sample(1) },
    { input: '2\n2 2\n3 3\n1 2\n10000000000000000', output: 'NO\nYES', source: 'own', note: L('3 and 3 share both 2⁰ and 2¹. A single huge number is fine: its binary digits are all 0 or 1.', '৩ আর ৩ দুটোই ২⁰ আর ২¹ ভাগ করে। একটিমাত্র বিশাল সংখ্যা ঠিক আছে: এর বাইনারি অঙ্ক সবই ০ বা ১।') },
  ],
  pitfalls: [
    L('Allowing a digit 2 in a single element: it means the same power twice.', 'একক উপাদানে অঙ্ক ২ অনুমতি দেওয়া: এর মানে একই ঘাত দুবার।'),
    L('Forgetting the cross-element rule: two different numbers may not share a power.', 'আন্তঃ-উপাদান নিয়ম ভোলা: দুটি আলাদা সংখ্যা একই ঘাত ভাগ করতে পারে না।'),
    L('Computing powers of k past 10¹⁶ and overflowing; stop when the next power would exceed the largest value.', 'k-র ঘাত ১০¹⁶ ছাড়িয়ে উপচে পড়া; পরের ঘাত সবচেয়ে বড় মানের বেশি হলে থামো।'),
  ],
  related: [
    { id: '1312D', name: 'Count the Arrays', why: L('Another count where powers of two decide the structure.', 'আরেকটি গণনা যেখানে দুইয়ের ঘাত কাঠামো ঠিক করে।') },
    { id: '1119E', name: 'Pavel and Triangles', why: L('Sticks of lengths 2ⁱ: why smaller powers can never fill a gap.', '২ⁱ দৈর্ঘ্যের কাঠি: কেন ছোট ঘাত কখনো ফাঁক পূরণ করতে পারে না।') },
  ],
  toolkit: ['modulo', 'long-long'],
};
