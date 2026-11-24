import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 1288A
export const p1288A: ProblemEntry = {
  id: '1288A',
  contestId: 1288,
  index: 'A',
  name: 'Deadline',
  rating: 1100,
  tags: ['binary-search', 'brute-force', 'math', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'The cheapest way to teach “a valley is searchable”: the cost x + d/(x + 1) falls and then rises. You can scan around √d, ternary-search the valley, or notice the check is a parabola and finish in O(1).',
    '“উপত্যকা খোঁজা যায়” শেখার সবচেয়ে সস্তা উদাহরণ: খরচ x + d/(x + ১) আগে কমে, তারপর বাড়ে। √d-র আশেপাশে স্ক্যান করা যায়, উপত্যকায় টারনারি সার্চ করা যায়, অথবা বুঝে ফেলা যায় পরীক্ষাটা একটি প্যারাবোলা, আর O(১)-এ শেষ।',
  ),
  statement: L(
    'A program needs d days to run. Before running it you may spend x ≥ 0 whole days optimising it; after that it runs in ⌈d / (x + 1)⌉ days. Optimising and running happen one after the other. Is it possible to finish everything within n days? Answer for t independent tests.',
    'একটি প্রোগ্রাম চলতে d দিন লাগে। চালানোর আগে তুমি x ≥ ০ পূর্ণ দিন ওটাকে অপ্টিমাইজ করতে পারো; তারপর ওটা চলে ⌈d / (x + ১)⌉ দিনে। অপ্টিমাইজ আর চালানো একটার পর একটা হয়। মোট n দিনের মধ্যে সব শেষ করা কি সম্ভব? t-টি স্বাধীন টেস্টের উত্তর দাও।',
  ),
  input: L('t, then t lines with n and d.', 't, তারপর t লাইনে n আর d।'),
  output: L('For each test print YES or NO.', 'প্রতিটি টেস্টে YES বা NO প্রিন্ট করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 50, 1 ≤ n, d ≤ 10⁹', '১ ≤ t ≤ ৫০, ১ ≤ n, d ≤ ১০⁹')] },
  samples: [
    {
      input: '3\n1 1\n4 5\n5 11',
      output: 'YES\nYES\nNO',
      explain: L(
        'n = 1, d = 1: x = 0 costs 0 + 1 = 1. n = 4, d = 5: x = 1 gives 1 + ⌈5/2⌉ = 4. n = 5, d = 11: x = 2 and x = 3 both give 6, nothing reaches 5.',
        'n = ১, d = ১: x = ০-তে ০ + ১ = ১। n = ৪, d = ৫: x = ১-এ ১ + ⌈৫/২⌉ = ৪। n = ৫, d = ১১: x = ২ আর x = ৩ দুটোতেই ৬, ৫-এ কেউ পৌঁছায় না।',
      ),
    },
  ],
  observation: L(
    'We need an integer x ≥ 0 with x + ⌈d/(x + 1)⌉ ≤ n. Because n − x is an integer, ⌈y⌉ ≤ n − x holds exactly when y ≤ n − x. So the test is d ≤ (n − x)(x + 1). The right side is a downward parabola in x with its top at x ≈ (n − 1)/2, so only the integers next to the vertex matter.',
    'আমাদের চাই পূর্ণসংখ্যা x ≥ ০ যাতে x + ⌈d/(x + ১)⌉ ≤ n। n − x পূর্ণসংখ্যা বলে ⌈y⌉ ≤ n − x ঠিক তখনই সত্য যখন y ≤ n − x। তাই পরীক্ষাটা d ≤ (n − x)(x + ১)। ডান পাশ x-এর নিম্নমুখী প্যারাবোলা, শীর্ষ x ≈ (n − ১)/২-এ, তাই শুধু শীর্ষের পাশের পূর্ণসংখ্যাগুলোই কাজে লাগে।',
  ),
  approach: [
    L('Remove the ceiling: ⌈d/(x+1)⌉ ≤ n − x ⇔ d ≤ (n − x)(x + 1).', 'সিলিং সরাও: ⌈d/(x+১)⌉ ≤ n − x ⇔ d ≤ (n − x)(x + ১)।'),
    L('h(x) = (n − x)(x + 1) is concave, so its maximum is found by ternary search — or directly at x = ⌊(n − 1)/2⌋.', 'h(x) = (n − x)(x + ১) অবতল, তাই এর সর্বোচ্চ টারনারি সার্চে মেলে — অথবা সরাসরি x = ⌊(n − ১)/২⌋-এ।'),
    L('Answer YES exactly when max h ≥ d.', 'উত্তর YES ঠিক তখনই যখন max h ≥ d।'),
  ],
  walkthrough: {
    input: '1\n5 11',
    steps: [
      { state: 'h(0) = 5·1', text: L('5.', '৫।') },
      { state: 'h(1) = 4·2, h(2) = 3·3', text: L('8 and 9 — the top of the parabola is at x = 2.', '৮ আর ৯ — প্যারাবোলার শীর্ষ x = ২-এ।') },
      { state: 'h(3) = 2·4 = 8', text: L('It falls again. max h = 9 < 11, so the answer is NO.', 'আবার কমছে। max h = ৯ < ১১, তাই উত্তর NO।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('Only the two integers around the vertex need a check.', 'শীর্ষের দুই পাশের দুটি পূর্ণসংখ্যা যাচাই করলেই হয়।') },
  solutions: [
    {
      id: 'vertex',
      kind: 'optimal',
      title: L('Parabola vertex in O(1)', 'প্যারাবোলার শীর্ষ, O(১)-এ'),
      idea: L('Test d ≤ h(x) at x = ⌊(n − 1)/2⌋ and x + 1.', 'x = ⌊(n − ১)/২⌋ আর x + ১-এ d ≤ h(x) যাচাই।'),
      explain: [
        L(
          'h(x) = (n − x)(x + 1) = −x² + (n − 1)x + n, a parabola opening downwards with vertex at x = (n − 1)/2. On integers the maximum is at ⌊(n − 1)/2⌋ or the next one; one of them is the best. Compare it with d and print.',
          'h(x) = (n − x)(x + ১) = −x² + (n − ১)x + n, নিচে খোলা প্যারাবোলা, শীর্ষ x = (n − ১)/২-এ। পূর্ণসংখ্যায় সর্বোচ্চ ⌊(n − ১)/২⌋-এ বা তার পরেরটায়; দুটির একটাই সেরা। d-র সঙ্গে তুলনা করে প্রিন্ট করো।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, d;
        scanf("%lld %lld", &n, &d);
        ll x = (n - 1) / 2;
        ll best = max((n - x) * (x + 1), (n - x - 1) * (x + 2));
        puts(best >= d ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'c-io'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on the concave parabola', 'অবতল প্যারাবোলায় টারনারি সার্চ'),
      idea: L('Shrink [0, n] around the maximum of h, then scan the last few integers.', 'h-এর সর্বোচ্চ ঘিরে [০, n] ছোট করো, শেষে কয়েকটি পূর্ণসংখ্যা স্ক্যান।'),
      explain: [
        L(
          'Ternary search needs a function that rises and then falls (or the reverse). Compare h at two inner points: if the left one is smaller, the peak is to the right of it, otherwise it is to the left of the right point. When equal, the peak lies between them, so keeping [m1, m2] is safe. Stop at width ≤ 2 and test the survivors.',
          'টারনারি সার্চে এমন ফাংশন লাগে যা আগে বাড়ে, পরে কমে (বা উল্টো)। ভেতরের দুটি বিন্দুতে h তুলনা করো: বাঁটা ছোট হলে চূড়া তার ডানে, নইলে ডান বিন্দুর বাঁয়ে। সমান হলে চূড়া দুটির মাঝে, তাই [m1, m2] রাখা নিরাপদ। প্রস্থ ≤ ২ হলে থামো, বেঁচে থাকাগুলো যাচাই করো।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
ll n, d;

ll h(ll x) { return (n - x) * (x + 1); }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%lld %lld", &n, &d);
        ll lo = 0, hi = n;
        while (hi - lo > 2) {
            ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (h(m1) < h(m2)) lo = m1 + 1;
            else hi = m2;
        }
        ll best = 0;
        for (ll x = lo; x <= hi; x++) best = max(best, h(x));
        puts(best >= d ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'c-io'],
    },
    {
      id: 'scan',
      kind: 'better',
      title: L('Scan x up to about √d on the original cost', 'মূল খরচে √d পর্যন্ত x স্ক্যান'),
      idea: L('x + ⌈d/(x+1)⌉ is smallest near x + 1 = √d, so trying x ≤ 10⁵ is enough.', 'x + ⌈d/(x+১)⌉ সবচেয়ে ছোট x + ১ = √d-র কাছে, তাই x ≤ ১০⁵ যাচাই যথেষ্ট।'),
      explain: [
        L(
          'By AM–GM, x + 1 + d/(x + 1) is at least 2√d with equality at x + 1 = √d ≤ 31623. The ceiling adds less than 1, so the true minimiser is within a few hundred of that point; scanning the first 10⁵ values of x covers it with a huge margin. No algebra needed, only the observation that the valley sits at √d.',
          'AM–GM অনুযায়ী x + ১ + d/(x + ১) ≥ ২√d, সমতা x + ১ = √d ≤ ৩১৬২৩-এ। সিলিং ১-এর কম যোগ করে, তাই আসল ন্যূনতম বিন্দু ওই জায়গার কয়েকশো কাছেই; x-এর প্রথম ১০⁵ মান স্ক্যানে বিশাল নিরাপত্তা-ব্যবধানে ঢেকে যায়। বীজগণিত লাগে না, শুধু জানা চাই উপত্যকা √d-তে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, d;
        scanf("%lld %lld", &n, &d);
        bool ok = false;
        for (ll x = 0; x <= n && x <= 100000 && !ok; x++)
            if (x + (d + x) / (x + 1) <= n) ok = true;
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(10⁵) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div', 'long-long', 'for-loop'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every x from 0 to n', '০ থেকে n পর্যন্ত প্রতিটি x চেষ্টা'),
      idea: L('Evaluate x + ⌈d/(x+1)⌉ for all x.', 'সব x-এর জন্য x + ⌈d/(x+১)⌉ হিসাব।'),
      explain: [L('Correct by definition and O(n): too slow for n = 10⁹, perfect as the reference in the stress test.', 'সংজ্ঞা অনুযায়ী সঠিক আর O(n): n = ১০⁹-এ ধীর, স্ট্রেস টেস্টের রেফারেন্স হিসেবে চমৎকার।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll n, d;
        scanf("%lld %lld", &n, &d);
        bool ok = false;
        for (ll x = 0; x <= n; x++)
            if (x + (d + x) / (x + 1) <= n) ok = true;
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['ceil-div', 'for-loop'],
    },
  ],
  tests: [
    { input: '3\n1 1\n4 5\n5 11', output: 'YES\nYES\nNO', source: 'sample', note: sample(1) },
    { input: '2\n63245 1000000000\n63244 1000000000', output: 'YES\nNO', source: 'own', note: L('The exact boundary for d = 10⁹: 2√d ≈ 63245.55.', 'd = ১০⁹-এর ঠিক সীমা: ২√d ≈ ৬৩২৪৫.৫৫।') },
    { input: '2\n1 1000000000\n1000000000 1', output: 'NO\nYES', source: 'own', note: L('One day only / lots of days for a tiny program.', 'মাত্র একদিন / ছোট প্রোগ্রামের জন্য অনেক দিন।') },
  ],
  pitfalls: [
    L('Computing the ceiling as d / (x + 1) + 1: when it divides evenly this is one too large. Use (d + x) / (x + 1).', 'সিলিং d / (x + ১) + ১ ধরা: ভাগ মিলে গেলে এটি একটি বেশি। (d + x) / (x + ১) ব্যবহার করো।'),
    L('Running ternary search on f(x) = x + ⌈d/(x+1)⌉ itself: the ceiling makes flat steps that are not at the minimum, and ternary search can discard the valley. Search the clean parabola h instead.', 'x + ⌈d/(x+১)⌉-এর ওপরই টারনারি সার্চ: সিলিংয়ে এমন সমতল ধাপ হয় যা ন্যূনতম নয়, আর টারনারি সার্চ উপত্যকাই বাদ দিতে পারে। বরং পরিষ্কার প্যারাবোলা h-এ খোঁজো।'),
    L('(n − x)(x + 1) reaches 2.5·10¹⁷, so it needs long long.', '(n − x)(x + ১) ২.৫·১০¹৭ ছোঁয়, তাই long long লাগে।'),
  ],
  related: [
    { id: '1301B', name: 'Motarack’s Birthday', why: L('Another “minimise a convex function” in disguise.', 'ছদ্মবেশে আরেকটি “উত্তল ফাংশনের ন্যূনতম”।') },
    { id: '1538G', name: 'Gift Set', why: L('Same trick: turn a ceiling into a clean inequality.', 'একই কৌশল: সিলিংকে পরিষ্কার অসমতায় বদলানো।') },
  ],
  toolkit: ['ceil-div', 'long-long'],
};

// ───────────────────────────────────────────── 1301B
export const p1301B: ProblemEntry = {
  id: '1301B',
  contestId: 1301,
  index: 'B',
  name: 'Motarack’s Birthday',
  rating: 1500,
  tags: ['binary-search', 'greedy', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'The cost of choosing k is a maximum of |k − c| terms: a convex “V-shaped” curve. Ternary search finds its bottom, but the best k is also just the midpoint of the smallest and largest neighbour — a pattern worth seeing both ways.',
    'k বেছে নেওয়ার খরচ |k − c| পদগুলোর সর্বোচ্চ: একটি উত্তল “V-আকৃতি” রেখা। টারনারি সার্চ এর তলদেশ খুঁজে পায়, কিন্তু সেরা k আসলে সবচেয়ে ছোট আর সবচেয়ে বড় প্রতিবেশীর মধ্যবিন্দুই — দুইভাবে দেখার মতো প্যাটার্ন।',
  ),
  statement: L(
    'An array has some missing elements marked −1. Pick one non-negative integer k and write it in every missing place. Minimise the largest absolute difference between neighbouring elements, and print that minimum m together with a k that achieves it. Several tests are given.',
    'একটি অ্যারেতে কিছু উপাদান নেই, −১ দিয়ে চিহ্নিত। একটিই অঋণাত্মক পূর্ণসংখ্যা k বেছে প্রতিটি ফাঁকা জায়গায় বসাও। পাশাপাশি উপাদানদের সবচেয়ে বড় পরম পার্থক্য ন্যূনতম করো, আর সেই ন্যূনতম m সহ এমন একটি k প্রিন্ট করো যা তা অর্জন করে। একাধিক টেস্ট দেওয়া।',
  ),
  input: L('t; each test: n, then n integers (−1 or 0 … 10⁹).', 't; প্রতিটি টেস্টে n, তারপর n টি পূর্ণসংখ্যা (−১ বা ০ … ১০⁹)।'),
  output: L('For each test print m and k (any valid k, 0 ≤ k ≤ 10⁹).', 'প্রতিটি টেস্টে m আর k প্রিন্ট করো (যেকোনো বৈধ k, ০ ≤ k ≤ ১০⁹)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 10⁵; any correct k is accepted (the real judge uses a checker)', 'Σ n ≤ ১০⁵; যেকোনো সঠিক k গ্রহণযোগ্য (আসল জাজ চেকার ব্যবহার করে)')] },
  samples: [
    { input: '2\n5\n-1 10 -1 12 -1\n6\n-1 -1 9 -1 3 -1', output: '1 11\n3 6', explain: L('First: k = 11 gives 11 10 11 12 11, max difference 1. Second: k = 6 gives 6 6 9 6 3 6, max difference 3.', 'প্রথমটি: k = ১১-এ ১১ ১০ ১১ ১২ ১১, সর্বোচ্চ পার্থক্য ১। দ্বিতীয়টি: k = ৬-এ ৬ ৬ ৯ ৬ ৩ ৬, সর্বোচ্চ পার্থক্য ৩।') },
    { input: '2\n2\n-1 -1\n2\n0 -1', output: '0 42\n0 0', explain: L('An all-missing array is constant for any k; a single known neighbour 0 makes k = 0 perfect.', 'সব-ফাঁকা অ্যারে যেকোনো k-এ ধ্রুবক; একটিমাত্র জানা প্রতিবেশী ০ হলে k = ০ নিখুঁত।') },
  ],
  observation: L(
    'Pairs of two known numbers do not depend on k; they only set a floor C. Every pair that touches a missing slot contributes |k − c| where c is its known neighbour. So the cost is max(C, |k − c₁|, |k − c₂|, …), minimised exactly when k is the midpoint of the smallest and largest such c.',
    'দুটি জানা সংখ্যার জোড়া k-এর ওপর নির্ভর করে না; শুধু একটি মেঝে C ঠিক করে। ফাঁকা ঘর ছুঁয়ে থাকা প্রতিটি জোড়া দেয় |k − c|, যেখানে c তার জানা প্রতিবেশী। তাই খরচ max(C, |k − c₁|, |k − c₂|, …), যা ঠিক তখনই ন্যূনতম যখন k ওই c-গুলোর সবচেয়ে ছোট আর সবচেয়ে বড়র মধ্যবিন্দু।',
  ),
  approach: [
    L('Collect every known number that sits next to a −1; remember the smallest lo and the largest hi.', '−১-এর পাশে থাকা প্রতিটি জানা সংখ্যা সংগ্রহ করো; সবচেয়ে ছোট lo আর সবচেয়ে বড় hi মনে রাখো।'),
    L('Take k = (lo + hi) / 2 (or 0 if there is no such number).', 'k = (lo + hi) / ২ নাও (এমন সংখ্যা না থাকলে ০)।'),
    L('Substitute k and recompute the largest neighbouring difference: that is m.', 'k বসিয়ে আবার সবচেয়ে বড় প্রতিবেশী পার্থক্য হিসাব করো: সেটাই m।'),
  ],
  walkthrough: {
    input: '-1 -1 9 -1 3 -1',
    steps: [
      { state: 'neighbours of −1: 9, 9, 3, 3', text: L('lo = 3, hi = 9.', 'lo = ৩, hi = ৯।') },
      { state: 'k = (3 + 9) / 2 = 6', text: L('Substitute: 6 6 9 6 3 6.', 'বসাও: ৬ ৬ ৯ ৬ ৩ ৬।') },
      { state: 'differences: 0 3 3 3 3', text: L('m = 3.', 'm = ৩।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass to find lo and hi, one pass to measure m.', 'lo, hi খুঁজতে এক পাস, m মাপতে এক পাস।') },
  solutions: [
    {
      id: 'midpoint',
      kind: 'optimal',
      title: L('Midpoint of the extreme neighbours', 'প্রান্তীয় প্রতিবেশীদের মধ্যবিন্দু'),
      idea: L('k = (min + max) / 2 over numbers adjacent to a −1.', '−১-এর পাশের সংখ্যাগুলোর k = (min + max) / ২।'),
      explain: [
        L(
          'The worst term among |k − c| is always one of the two extremes, and their distances are balanced exactly at the midpoint. With integer k the rounded midpoint loses at most half a unit, which still gives the optimal integer m because every other term is smaller.',
          '|k − c|-গুলোর মধ্যে সবচেয়ে খারাপটি সবসময় দুই প্রান্তের একটি, আর তাদের দূরত্ব ঠিক মধ্যবিন্দুতে সমান। পূর্ণসংখ্যা k-তে গোল করা মধ্যবিন্দুতে সর্বোচ্চ আধ একক হারায়, তবু সেরা পূর্ণসংখ্যা m পাওয়া যায় কারণ অন্য সব পদ ছোট।',
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
        for (int& x : a) scanf("%d", &x);
        int lo = INT_MAX, hi = -1;
        for (int i = 0; i < n; i++)
            if (a[i] == -1) {
                if (i > 0 && a[i - 1] != -1) lo = min(lo, a[i - 1]), hi = max(hi, a[i - 1]);
                if (i + 1 < n && a[i + 1] != -1) lo = min(lo, a[i + 1]), hi = max(hi, a[i + 1]);
            }
        int k = hi < 0 ? 0 : (lo + hi) / 2;
        int m = 0;
        for (int i = 0; i + 1 < n; i++) {
            int x = a[i] == -1 ? k : a[i], y = a[i + 1] == -1 ? k : a[i + 1];
            m = max(m, abs(x - y));
        }
        printf("%d %d\n", m, k);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'c-io'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on k', 'k-এর ওপর টারনারি সার্চ'),
      idea: L('f(k) = max difference is convex in k; search its bottom.', 'f(k) = সর্বোচ্চ পার্থক্য k-তে উত্তল; এর তলদেশ খোঁজো।'),
      explain: [
        L(
          'Every |k − c| is convex and a maximum of convex functions is convex, so f has no local valleys and any flat part is exactly the minimum. Compare f(m1) and f(m2): the larger side is cut away; if they are equal the minimum is between them. About 60 evaluations of an O(n) function.',
          'প্রতিটি |k − c| উত্তল, আর উত্তল ফাংশনের সর্বোচ্চও উত্তল, তাই f-এ কোনো স্থানীয় উপত্যকা নেই আর সমতল অংশ মানেই ন্যূনতম। f(m1) আর f(m2) তুলনা করো: বড় দিকটা কেটে ফেলো; সমান হলে ন্যূনতম তাদের মাঝে। O(n) ফাংশনের প্রায় ৬০ বার মূল্যায়ন।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
int n;
vector<ll> a;

ll f(ll k) {
    ll m = 0;
    for (int i = 0; i + 1 < n; i++) {
        ll x = a[i] == -1 ? k : a[i], y = a[i + 1] == -1 ? k : a[i + 1];
        m = max(m, llabs(x - y));
    }
    return m;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%d", &n);
        a.assign(n, 0);
        for (ll& x : a) scanf("%lld", &x);
        ll lo = 0, hi = 1000000000;
        while (hi - lo > 2) {
            ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            ll f1 = f(m1), f2 = f(m2);
            if (f1 < f2) hi = m2 - 1;
            else if (f1 > f2) lo = m1 + 1;
            else lo = m1, hi = m2;
        }
        ll bk = lo, bv = f(lo);
        for (ll k = lo + 1; k <= hi; k++)
            if (f(k) < bv) bv = f(k), bk = k;
        printf("%lld %lld\n", bv, bk);
    }
    return 0;
}
`,
      time: 'O(n log 10⁹)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every k from 0 to the largest value', '০ থেকে সবচেয়ে বড় মান পর্যন্ত প্রতিটি k চেষ্টা'),
      idea: L('Substitute each k and take the best.', 'প্রতিটি k বসিয়ে সেরাটা নাও।'),
      explain: [L('O(n · maxValue): only for small values, but it never trusts the midpoint idea.', 'O(n · সর্বোচ্চ মান): শুধু ছোট মানে চলে, কিন্তু মধ্যবিন্দুর ধারণায় ভরসা করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n);
        int mx = 0;
        for (int& x : a) scanf("%d", &x), mx = max(mx, x);
        int bm = INT_MAX, bk = 0;
        for (int k = 0; k <= mx + 1; k++) {
            int m = 0;
            for (int i = 0; i + 1 < n; i++) {
                int x = a[i] == -1 ? k : a[i], y = a[i + 1] == -1 ? k : a[i + 1];
                m = max(m, abs(x - y));
            }
            if (m < bm) bm = m, bk = k;
        }
        printf("%d %d\n", bm, bk);
    }
    return 0;
}
`,
      time: 'O(n · max)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '2\n5\n-1 10 -1 12 -1\n6\n-1 -1 9 -1 3 -1', output: '1 11\n3 6', source: 'sample', note: sample(1) },
    { input: '2\n2\n-1 -1\n2\n0 -1', output: '0 42\n0 0', source: 'sample', note: sample(2) },
    { input: '1\n4\n1 -1 3 -1', output: '1 2', source: 'own', note: L('Neighbours 1 and 3: k = 2 gives max difference 1.', 'প্রতিবেশী ১ আর ৩: k = ২-এ সর্বোচ্চ পার্থক্য ১।') },
    { input: '1\n4\n1000000000 -1 0 -1', output: '500000000 500000000', source: 'own', note: L('Extreme values: the midpoint must not overflow 32-bit sums.', 'চরম মান: মধ্যবিন্দু যেন ৩২-বিট যোগফলে উপচে না পড়ে।') },
  ],
  pitfalls: [
    L('Using the mean of all neighbours instead of the midpoint of the extremes.', 'প্রান্তের মধ্যবিন্দুর বদলে সব প্রতিবেশীর গড় ব্যবহার করা।'),
    L('Forgetting that pairs of two known numbers still count toward m.', 'দুটি জানা সংখ্যার জোড়াও যে m-এ গোনা হয় তা ভুলে যাওয়া।'),
    L('lo + hi up to 2·10⁹ overflows int; use long long or lo + (hi − lo) / 2.', 'lo + hi ২·১০⁹ পর্যন্ত গিয়ে int উপচে পড়ে; long long বা lo + (hi − lo) / ২ ব্যবহার করো।'),
  ],
  related: [
    { id: '1288A', name: 'Deadline', why: L('A valley you can scan, search or solve by algebra.', 'এমন উপত্যকা যা স্ক্যান, সার্চ বা বীজগণিতে সমাধান করা যায়।') },
    { id: '1730B', name: 'Meeting on the Line', why: L('The same V-shaped max of |x − c| terms, now with real numbers.', 'একই V-আকৃতির |x − c| পদের সর্বোচ্চ, এবার বাস্তব সংখ্যায়।') },
  ],
  toolkit: ['min-max', 'long-long'],
};

// ───────────────────────────────────────────── 1574C
export const p1574C: ProblemEntry = {
  id: '1574C',
  contestId: 1574,
  index: 'C',
  name: 'Slay the Dragon',
  rating: 1300,
  tags: ['binary-search', 'greedy', 'sortings', 'ternary-search'],
  why: L(
    'One hero must be strong enough to defend, the rest must out-attack the dragon. Sort the heroes and only two of them can ever be the best defender — a clean first use of lower_bound, and a convex cost in disguise.',
    'একজন নায়ককে রক্ষার জন্য যথেষ্ট শক্তিশালী হতে হবে, বাকিদের সম্মিলিত আক্রমণ ড্রাগনকে ছাড়াতে হবে। নায়কদের সর্ট করলে সেরা রক্ষক হতে পারে শুধু দুজন — lower_bound-এর পরিষ্কার প্রথম ব্যবহার, আর ছদ্মবেশে একটি উত্তল খরচ।',
  ),
  statement: L(
    'There are n heroes with strengths a₁ … aₙ. A dragon has defence x and attack y. Send exactly one hero to defend (needs strength ≥ x) and all the others to attack (their total strength must be ≥ y). One coin raises any hero’s strength by 1. For each of m dragons, print the least number of coins.',
    'n জন নায়কের শক্তি a₁ … aₙ। একটি ড্রাগনের রক্ষা x আর আক্রমণ y। ঠিক একজন নায়ককে রক্ষায় পাঠাও (শক্তি ≥ x লাগে), বাকি সবাইকে আক্রমণে (তাদের মোট শক্তি ≥ y হতে হবে)। একটি কয়েন যেকোনো নায়কের শক্তি ১ বাড়ায়। m-টি ড্রাগনের প্রত্যেকের জন্য সবচেয়ে কম কয়েন প্রিন্ট করো।',
  ),
  input: L('n; a₁ … aₙ; m; then m lines x y.', 'n; a₁ … aₙ; m; তারপর m লাইনে x y।'),
  output: L('m lines: the minimum coins for each dragon.', 'm লাইন: প্রতিটি ড্রাগনের ন্যূনতম কয়েন।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, aᵢ ≤ 10¹², x ≤ 10¹², y ≤ 10¹⁸, m ≤ 2·10⁵; dragons are independent', '২ ≤ n ≤ ২·১০⁵, aᵢ ≤ ১০¹², x ≤ ১০¹², y ≤ ১০¹⁸, m ≤ ২·১০⁵; ড্রাগনরা স্বাধীন')] },
  samples: [
    {
      input: '4\n3 6 2 3\n5\n3 12\n7 9\n4 14\n1 10\n8 7',
      output: '1\n2\n4\n0\n2',
      explain: L(
        'Total strength is 14. Dragon (3, 12): hero 3 defends, the rest sum to 11, buy 1 coin. Dragon (7, 9): hero 6 needs 1 coin to defend, the rest sum to 8, one more coin: 2 in all. Dragon (1, 10) needs nothing.',
        'মোট শক্তি ১৪। ড্রাগন (৩, ১২): নায়ক ৩ রক্ষা করে, বাকিদের যোগফল ১১, ১ কয়েন কেনো। ড্রাগন (৭, ৯): নায়ক ৬-কে রক্ষায় ১ কয়েন, বাকিদের যোগফল ৮, আরেক কয়েন: মোট ২। ড্রাগন (১, ১০)-এ কিছুই লাগে না।',
      ),
    },
  ],
  observation: L(
    'If hero i defends, the cost is max(0, x − aᵢ) + max(0, y − (S − aᵢ)), where S is the total. As a function of aᵢ this is convex: the first term falls until aᵢ = x, the second rises with aᵢ. So the best defender is the weakest hero who is already ≥ x, or the strongest one below x — only two candidates.',
    'নায়ক i রক্ষা করলে খরচ max(০, x − aᵢ) + max(০, y − (S − aᵢ)), যেখানে S মোট যোগফল। aᵢ-র ফাংশন হিসেবে এটি উত্তল: প্রথম পদ aᵢ = x পর্যন্ত কমে, দ্বিতীয় পদ aᵢ-র সঙ্গে বাড়ে। তাই সেরা রক্ষক হলো ইতিমধ্যে ≥ x এমন সবচেয়ে দুর্বল নায়ক, অথবা x-এর নিচের সবচেয়ে শক্তিশালী — মাত্র দুজন প্রার্থী।',
  ),
  approach: [
    L('Sort a and compute S once.', 'a সর্ট করো আর S একবার হিসাব করো।'),
    L('For each dragon find i = lower_bound(x): the first hero with strength ≥ x.', 'প্রতিটি ড্রাগনের জন্য i = lower_bound(x) খোঁজো: প্রথম নায়ক যার শক্তি ≥ x।'),
    L('Evaluate the cost for hero i and hero i − 1, print the smaller.', 'নায়ক i আর নায়ক i − ১-এর খরচ বের করো, ছোটটি প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'a = 2 3 3 6, S = 14, dragon (4, 14)',
    steps: [
      { state: 'lower_bound(4) → hero 6', text: L('Defends for free; the others sum to 8, need 14: 6 coins.', 'বিনামূল্যে রক্ষা করে; বাকিদের যোগফল ৮, লাগে ১৪: ৬ কয়েন।') },
      { state: 'previous hero 3', text: L('Needs 1 coin to defend; the others sum to 11, need 14: 3 more, total 4.', 'রক্ষায় ১ কয়েন; বাকিদের যোগফল ১১, লাগে ১৪: আরও ৩, মোট ৪।') },
      { state: 'min(6, 4)', text: L('The answer is 4.', 'উত্তর ৪।') },
    ],
  },
  complexity: { time: 'O((n + m) log n)', space: 'O(n)', why: L('One sort, then one binary search per dragon.', 'একবার সর্ট, তারপর প্রতি ড্রাগনে একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'lower-bound',
      kind: 'optimal',
      title: L('Sort and lower_bound, two candidates', 'সর্ট আর lower_bound, দুজন প্রার্থী'),
      idea: L('Only the first hero ≥ x and the last hero < x can be the best defender.', 'শুধু প্রথম নায়ক ≥ x আর শেষ নায়ক < x সেরা রক্ষক হতে পারে।'),
      explain: [
        L(
          'A stronger-than-needed defender wastes strength that could attack, a weaker one costs coins to reach x. The cost is convex in the defender’s strength with its kink at x, so scanning outward from x in both directions can only get worse; the two neighbours of x in sorted order are the whole answer.',
          'প্রয়োজনের চেয়ে শক্তিশালী রক্ষক এমন শক্তি নষ্ট করে যা আক্রমণে কাজে লাগত, দুর্বল রক্ষকের x পৌঁছাতে কয়েন লাগে। খরচ রক্ষকের শক্তিতে উত্তল, বাঁক x-এ, তাই x থেকে দুই দিকে সরলে কেবল খারাপ হয়; সর্টেড ক্রমে x-এর দুই প্রতিবেশীই পুরো উত্তর।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d", &n);
    vector<ll> a(n);
    ll S = 0;
    for (ll& v : a) scanf("%lld", &v), S += v;
    sort(a.begin(), a.end());
    scanf("%d", &m);
    while (m--) {
        ll x, y;
        scanf("%lld %lld", &x, &y);
        int i = lower_bound(a.begin(), a.end(), x) - a.begin();
        ll ans = LLONG_MAX;
        if (i < n) ans = min(ans, max(0LL, y - (S - a[i])));
        if (i > 0) ans = min(ans, (x - a[i - 1]) + max(0LL, y - (S - a[i - 1])));
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'long-long'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search over the distinct strengths', 'আলাদা শক্তিগুলোর ওপর টারনারি সার্চ'),
      idea: L('The cost is convex in the defender’s strength, so search the bottom among sorted distinct values.', 'খরচ রক্ষকের শক্তিতে উত্তল, তাই সর্টেড আলাদা মানগুলোর মধ্যে তলদেশ খোঁজো।'),
      explain: [
        L(
          'Keep S from the full array, but run the search on the sorted distinct strengths: equal strengths would create equal costs that are not the minimum and confuse the “equal means minimum is between” rule. On distinct points of a convex function equal values really do bracket the minimum.',
          'S পুরো অ্যারে থেকে রাখো, কিন্তু সার্চ চালাও সর্টেড আলাদা শক্তিগুলোর ওপর: সমান শক্তি এমন সমান খরচ বানাবে যা ন্যূনতম নয়, আর “সমান মানে ন্যূনতম মাঝে” নিয়ম গুলিয়ে ফেলবে। উত্তল ফাংশনের আলাদা বিন্দুতে সমান মান সত্যিই ন্যূনতমকে ঘিরে রাখে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d", &n);
    vector<ll> a(n);
    ll S = 0;
    for (ll& v : a) scanf("%lld", &v), S += v;
    sort(a.begin(), a.end());
    vector<ll> d = a;
    d.erase(unique(d.begin(), d.end()), d.end());
    int k = d.size();
    scanf("%d", &m);
    while (m--) {
        ll x, y;
        scanf("%lld %lld", &x, &y);
        auto f = [&](int i) { return max(0LL, x - d[i]) + max(0LL, y - (S - d[i])); };
        int lo = 0, hi = k - 1;
        while (hi - lo > 2) {
            int m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            ll f1 = f(m1), f2 = f(m2);
            if (f1 < f2) hi = m2 - 1;
            else if (f1 > f2) lo = m1 + 1;
            else lo = m1, hi = m2;
        }
        ll ans = f(lo);
        for (int i = lo + 1; i <= hi; i++) ans = min(ans, f(i));
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n + m log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every hero as the defender', 'প্রতিটি নায়ককে রক্ষক ধরে দেখো'),
      idea: L('For each dragon, evaluate the cost for all n heroes.', 'প্রতিটি ড্রাগনের জন্য সব n নায়কের খরচ হিসাব।'),
      explain: [L('O(n · m): no sorting, no clever claim, perfect as the reference.', 'O(n · m): সর্টিং নেই, চালাক দাবি নেই, রেফারেন্স হিসেবে নিখুঁত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d", &n);
    vector<ll> a(n);
    ll S = 0;
    for (ll& v : a) scanf("%lld", &v), S += v;
    scanf("%d", &m);
    while (m--) {
        ll x, y;
        scanf("%lld %lld", &x, &y);
        ll ans = LLONG_MAX;
        for (int i = 0; i < n; i++)
            ans = min(ans, max(0LL, x - a[i]) + max(0LL, y - (S - a[i])));
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '4\n3 6 2 3\n5\n3 12\n7 9\n4 14\n1 10\n8 7', output: '1\n2\n4\n0\n2', source: 'sample', note: sample(1) },
    { input: '2\n1 1\n1\n1000000000000 1000000000000000000', output: '1000000999999999998', source: 'own', note: L('Large x and y: the answer needs 64-bit arithmetic.', 'বড় x আর y: উত্তরে ৬৪-বিট হিসাব লাগে।') },
    { input: '3\n5 5 5\n2\n5 10\n6 11', output: '0\n2', source: 'own', note: L('Equal strengths: the distinct-values search must keep S from the full array.', 'সমান শক্তি: আলাদা-মানের সার্চেও S পুরো অ্যারে থেকে রাখতে হবে।') },
  ],
  pitfalls: [
    L('Sorting but then taking S from the distinct values: the attackers’ total uses every hero.', 'সর্ট করে আলাদা মানগুলো থেকে S নেওয়া: আক্রমণকারীদের মোট যোগফলে সব নায়ক গোনা হয়।'),
    L('Forgetting the case i = 0 (nobody below x) or i = n (nobody ≥ x).', 'i = ০ (x-এর নিচে কেউ নেই) বা i = n (≥ x কেউ নেই) ভুলে যাওয়া।'),
    L('y − (S − a) can be negative: clamp the attack deficit at 0.', 'y − (S − a) ঋণাত্মক হতে পারে: আক্রমণের ঘাটতি ০-তে আটকাও।'),
  ],
  related: [
    { id: '1538C', name: 'Number of Pairs', why: L('Sort, then count with lower_bound.', 'সর্ট করো, তারপর lower_bound দিয়ে গোনো।') },
    { id: '439D', name: 'Devu and his Brother', why: L('Another convex cost over a sorted array.', 'সর্টেড অ্যারেতে আরেকটি উত্তল খরচ।') },
  ],
  toolkit: ['sort', 'lower-bound', 'long-long'],
};

// ───────────────────────────────────────────── 439D
export const p439D: ProblemEntry = {
  id: '439D',
  contestId: 439,
  index: 'D',
  name: 'Devu and his Brother',
  rating: 1700,
  tags: ['binary-search', 'sortings', 'ternary-search', 'two-pointers'],
  featuredFor: ['ternary-search'],
  why: L(
    'The total cost of lifting every a to x and lowering every b to x is a convex piecewise-linear curve. That one fact gives four honest solutions: ternary search on x, checking the breakpoints with prefix sums, a greedy pairing, and a brute force.',
    'প্রতিটি a-কে x-এ তুলে আর প্রতিটি b-কে x-এ নামানোর মোট খরচ একটি উত্তল খণ্ডশ রৈখিক রেখা। এই একটি তথ্য থেকে চারটি সৎ সমাধান মেলে: x-এ টারনারি সার্চ, প্রিফিক্স সাম দিয়ে বাঁকগুলো যাচাই, গ্রিডি জোড়া মেলানো, আর ব্রুট ফোর্স।',
  ),
  statement: L(
    'Two arrays a (n numbers) and b (m numbers). In one step you may add 1 to or subtract 1 from any single element of either array. Find the minimum number of steps after which the smallest element of a is at least as large as the largest element of b.',
    'দুটি অ্যারে a (n টি সংখ্যা) আর b (m টি সংখ্যা)। এক ধাপে যেকোনো একটি অ্যারের যেকোনো একটি উপাদানে ১ যোগ বা বিয়োগ করা যায়। সর্বনিম্ন কত ধাপে a-এর ক্ষুদ্রতম উপাদান b-এর বৃহত্তম উপাদানের সমান বা বড় হবে, বের করো।',
  ),
  input: L('n m; the n numbers of a; the m numbers of b.', 'n m; a-এর n টি সংখ্যা; b-এর m টি সংখ্যা।'),
  output: L('The minimum number of steps.', 'সর্বনিম্ন ধাপ সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁵, 1 ≤ aᵢ, bⱼ ≤ 10⁹; the answer can reach about 10¹⁴', '১ ≤ n, m ≤ ১০⁵, ১ ≤ aᵢ, bⱼ ≤ ১০⁹; উত্তর প্রায় ১০¹⁴ ছুঁতে পারে')] },
  samples: [
    { input: '2 2\n2 3\n3 5', output: '3', explain: L('Choose threshold 3: raise the 2 to 3 (1 step), lower the 5 to 3 (2 steps).', 'সীমা ৩ বেছে: ২-কে ৩ করো (১ ধাপ), ৫-কে ৩ করো (২ ধাপ)।') },
    { input: '3 2\n1 2 3\n3 4', output: '4', explain: L('Threshold 3: 1 → 3 and 2 → 3 cost 3, 4 → 3 costs 1.', 'সীমা ৩: ১ → ৩ আর ২ → ৩-এ ৩, ৪ → ৩-এ ১।') },
    { input: '3 2\n4 5 6\n1 2', output: '0', explain: L('Already min a = 4 ≥ max b = 2.', 'আগে থেকেই min a = ৪ ≥ max b = ২।') },
  ],
  observation: L(
    'Pick a threshold x with every aᵢ ≥ x ≥ every bⱼ. Each element moves independently, so the cost is f(x) = Σ max(0, x − aᵢ) + Σ max(0, bⱼ − x). Each term is convex in x, hence f is convex and piecewise linear, with its bottom at one of the values aᵢ or bⱼ.',
    'এমন সীমা x বেছে নাও যেন প্রতিটি aᵢ ≥ x ≥ প্রতিটি bⱼ। প্রতিটি উপাদান স্বাধীনভাবে নড়ে, তাই খরচ f(x) = Σ max(০, x − aᵢ) + Σ max(০, bⱼ − x)। প্রতিটি পদ x-এ উত্তল, তাই f উত্তল ও খণ্ডশ রৈখিক, আর এর তলদেশ কোনো aᵢ বা bⱼ মানে।',
  ),
  approach: [
    L('Define f(x) as above; the answer is min over integers x of f(x).', 'ওপরের মতো f(x) সংজ্ঞায়িত করো; উত্তর হলো পূর্ণসংখ্যা x-এ f(x)-এর ন্যূনতম।'),
    L('Because f is convex, ternary-search x in [1, 10⁹], or test only the values aᵢ and bⱼ with prefix sums.', 'f উত্তল বলে x ∈ [১, ১০⁹]-এ টারনারি সার্চ করো, অথবা প্রিফিক্স সাম দিয়ে শুধু aᵢ আর bⱼ মানগুলো যাচাই করো।'),
    L('Equivalent greedy: pair the smallest a with the largest b while aᵢ < bⱼ and add the gaps.', 'সমতুল্য গ্রিডি: যতক্ষণ aᵢ < bⱼ, সবচেয়ে ছোট a-কে সবচেয়ে বড় b-র সঙ্গে জোড়া দিয়ে পার্থক্য যোগ করো।'),
  ],
  walkthrough: {
    input: 'a = 1 2 3, b = 3 4',
    steps: [
      { state: 'sorted a ↑: 1 2 3; b ↓: 4 3', text: L('Pair (1, 4): gap 3 — then (2, 3): gap 1.', 'জোড়া (১, ৪): ফাঁক ৩ — তারপর (২, ৩): ফাঁক ১।') },
      { state: 'stop: no third pair, total 3 + 1', text: L('The answer is 4, matching f(3) = 2 + 1 + 0 + 1 + 0 = 4.', 'উত্তর ৪, যা f(৩) = ২ + ১ + ০ + ১ + ০ = ৪-এর সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(n log n + m log m)', space: 'O(n + m)', why: L('Sorting dominates; the greedy and prefix versions are linear after it, ternary search is O((n + m) log 10⁹).', 'সর্টিং-ই প্রধান; গ্রিডি আর প্রিফিক্স সংস্করণ এরপর রৈখিক, টারনারি সার্চ O((n + m) log ১০⁹)।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Pair smallest a with largest b', 'সবচেয়ে ছোট a-কে সবচেয়ে বড় b-র সঙ্গে জোড়া'),
      idea: L('Sum max(0, b↓ᵢ − a↑ᵢ) over the first min(n, m) pairs.', 'প্রথম min(n, m) জোড়ায় max(০, b↓ᵢ − a↑ᵢ) যোগ করো।'),
      explain: [
        L(
          'Rewrite f(x) = Σ(x − aᵢ)⁺ + Σ(bⱼ − x)⁺. For any x, the offending a’s are the smallest ones and the offending b’s are the largest ones. Matching them in that order, every offending a with a distinct offending b, each pair costs at least bⱼ − aᵢ whatever x is, and a single x achieves it. Unmatched leftovers are on the right side of x for free.',
          'f(x) = Σ(x − aᵢ)⁺ + Σ(bⱼ − x)⁺ লেখো। যেকোনো x-এর জন্য দোষী a-গুলো সবচেয়ে ছোটগুলো আর দোষী b-গুলো সবচেয়ে বড়গুলো। সেই ক্রমে মেলালে, প্রতিটি দোষী a একটি আলাদা দোষী b-র সঙ্গে, x যাই হোক প্রতিটি জোড়ার খরচ অন্তত bⱼ − aᵢ, আর একটি x তা অর্জন করে। অমিল বাকিরা x-এর ঠিক দিকেই, বিনামূল্যে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> a(n), b(m);
    for (ll& x : a) scanf("%lld", &x);
    for (ll& x : b) scanf("%lld", &x);
    sort(a.begin(), a.end());
    sort(b.rbegin(), b.rend());
    ll ans = 0;
    for (int i = 0; i < min(n, m) && a[i] < b[i]; i++) ans += b[i] - a[i];
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log n + m log m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'long-long', 'min-max'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on the threshold x', 'সীমা x-এর ওপর টারনারি সার্চ'),
      idea: L('f is convex; shrink [1, 10⁹] around its minimum and scan the survivors.', 'f উত্তল; এর ন্যূনতমের চারপাশে [১, ১০⁹] ছোট করো, বেঁচে থাকাগুলো স্ক্যান।'),
      explain: [
        L(
          'Evaluating f(x) takes O(n + m). Compare f(m1) and f(m2) and cut the side with the larger value; equal values mean the minimum is in between. About 40 rounds — each shrinks the interval by a third — then a tiny scan. No sorting and no prefix sums: only the convexity.',
          'f(x) মূল্যায়নে O(n + m)। f(m1) আর f(m2) তুলনা করে বড় মানের দিকটা কেটে ফেলো; সমান হলে ন্যূনতম মাঝে। প্রায় ৪০ রাউন্ড — প্রতিটি ব্যবধান এক-তৃতীয়াংশ কমায় — তারপর ছোট্ট স্ক্যান। সর্টিং নেই, প্রিফিক্স সাম নেই: শুধু উত্তলতা।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
int n, m;
vector<ll> a, b;

ll f(ll x) {
    ll s = 0;
    for (ll v : a) s += max(0LL, x - v);
    for (ll v : b) s += max(0LL, v - x);
    return s;
}

int main() {
    scanf("%d %d", &n, &m);
    a.resize(n), b.resize(m);
    for (ll& x : a) scanf("%lld", &x);
    for (ll& x : b) scanf("%lld", &x);
    ll lo = 1, hi = 1000000000;
    while (hi - lo > 2) {
        ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        ll f1 = f(m1), f2 = f(m2);
        if (f1 < f2) hi = m2 - 1;
        else if (f1 > f2) lo = m1 + 1;
        else lo = m1, hi = m2;
    }
    ll ans = f(lo);
    for (ll x = lo + 1; x <= hi; x++) ans = min(ans, f(x));
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O((n + m) log 10⁹)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['lambda', 'long-long', 'min-max'],
    },
    {
      id: 'prefix',
      kind: 'better',
      title: L('Evaluate f at every breakpoint with prefix sums', 'প্রিফিক্স সাম দিয়ে প্রতিটি বাঁকে f মূল্যায়ন'),
      idea: L('A piecewise-linear convex function is minimal at a breakpoint: try x = every aᵢ and bⱼ.', 'উত্তল খণ্ডশ রৈখিক ফাংশন কোনো বাঁকে ন্যূনতম: x = প্রতিটি aᵢ আর bⱼ চেষ্টা।'),
      explain: [
        L(
          'Sort both arrays and build prefix sums. For a candidate x, binary search how many a’s are below x and how many b’s are above it; the cost is x·cnt − sum on each side. 2·10⁵ candidates, each O(log n).',
          'দুটি অ্যারে সর্ট করে প্রিফিক্স সাম বানাও। প্রার্থী x-এর জন্য বাইনারি সার্চে বের করো কতগুলো a x-এর নিচে আর কতগুলো b ওপরে; প্রতিপাশে খরচ x·গণনা − যোগফল। ২·১০⁵ প্রার্থী, প্রতিটি O(log n)।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> a(n), b(m);
    for (ll& x : a) scanf("%lld", &x);
    for (ll& x : b) scanf("%lld", &x);
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    vector<ll> pa(n + 1, 0), pb(m + 1, 0);
    for (int i = 0; i < n; i++) pa[i + 1] = pa[i] + a[i];
    for (int i = 0; i < m; i++) pb[i + 1] = pb[i] + b[i];
    auto f = [&](ll x) {
        int i = lower_bound(a.begin(), a.end(), x) - a.begin();  // a < x
        int j = upper_bound(b.begin(), b.end(), x) - b.begin();  // b <= x
        return x * i - pa[i] + (pb[m] - pb[j]) - x * (m - j);
    };
    ll ans = LLONG_MAX;
    for (ll x : a) ans = min(ans, f(x));
    for (ll x : b) ans = min(ans, f(x));
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O((n + m) log(n + m))',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'lower-bound', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every threshold in the value range', 'মানের পরিসরে প্রতিটি সীমা চেষ্টা'),
      idea: L('Evaluate f(x) for every x from 0 up to the largest value.', '০ থেকে সবচেয়ে বড় মান পর্যন্ত প্রতিটি x-এ f(x) হিসাব।'),
      explain: [L('O((n + m) · maxValue): fine for tiny values, and it trusts nothing but the definition of f.', 'O((n + m) · সর্বোচ্চ মান): ছোট মানে ঠিক আছে, আর f-এর সংজ্ঞা ছাড়া কিছুতে ভরসা করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> a(n), b(m);
    ll mx = 0;
    for (ll& x : a) scanf("%lld", &x), mx = max(mx, x);
    for (ll& x : b) scanf("%lld", &x), mx = max(mx, x);
    ll best = LLONG_MAX;
    for (ll x = 0; x <= mx; x++) {
        ll s = 0;
        for (ll v : a) s += max(0LL, x - v);
        for (ll v : b) s += max(0LL, v - x);
        best = min(best, s);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O((n + m) · max)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '2 2\n2 3\n3 5', output: '3', source: 'sample', note: sample(1) },
    { input: '3 2\n1 2 3\n3 4', output: '4', source: 'sample', note: sample(2) },
    { input: '3 2\n4 5 6\n1 2', output: '0', source: 'sample', note: sample(3) },
    { input: '2 2\n1 1\n1000000000 1000000000', output: '1999999998', source: 'own', note: L('Largest gap: 2 · 10⁹ − 2 steps, bigger than 32 bits.', 'সবচেয়ে বড় ফাঁক: ২ · ১০⁹ − ২ ধাপ, ৩২ বিটের চেয়ে বড়।') },
    { input: '1 1\n7\n7', output: '0', source: 'own', note: L('Equal min a and max b: nothing to do.', 'min a আর max b সমান: কিছু করার নেই।') },
  ],
  pitfalls: [
    L('Printing an int: with n, m = 10⁵ and values 10⁹ the answer is about 10¹⁴.', 'int প্রিন্ট করা: n, m = ১০⁵ আর মান ১০⁹ হলে উত্তর প্রায় ১০¹⁴।'),
    L('Moving only the arrays toward the middle of their own values instead of toward a common threshold.', 'সাধারণ সীমার দিকে না গিয়ে প্রতিটি অ্যারেকে শুধু নিজের মানের মাঝামাঝি নেওয়া।'),
    L('Stopping the greedy pairing too late: once aᵢ ≥ bᵢ no later pair can help, because a only grows and b only shrinks.', 'গ্রিডি জোড়া মেলানো দেরিতে থামানো: aᵢ ≥ bᵢ হলে পরের কোনো জোড়া কাজে লাগে না, কারণ a কেবল বাড়ে আর b কেবল কমে।'),
  ],
  related: [
    { id: '1244E', name: 'Minimizing Difference', why: L('The window version: ternary search inside a binary search.', 'জানালা সংস্করণ: বাইনারি সার্চের ভেতরে টারনারি সার্চ।') },
    { id: '1574C', name: 'Slay the Dragon', why: L('A convex cost evaluated on a sorted array.', 'সর্টেড অ্যারেতে মূল্যায়ন করা উত্তল খরচ।') },
  ],
  toolkit: ['sort', 'prefix-sum', 'long-long'],
};
