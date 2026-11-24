import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 1413E
export const p1413E: ProblemEntry = {
  id: '1413E',
  contestId: 1413,
  index: 'E',
  name: 'Solo mid Oracle',
  rating: 2100,
  tags: ['greedy', 'math', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'A damage-over-time puzzle that collapses to a parabola in the number of casts. Spot the “−1 if damage beats healing” case, then maximise a concave quadratic by formula, by ternary search, or by simulating small cases.',
    'সময়ের সঙ্গে ক্ষতির একটি ধাঁধা যা নিক্ষেপের সংখ্যায় প্যারাবোলায় নেমে আসে। “ক্ষতি সুস্থতাকে ছাড়ালে −১” কেসটি চিনে নাও, তারপর অবতল দ্বিঘাতকে সূত্রে, টারনারি সার্চে বা ছোট কেস সিমুলেশনে সর্বোচ্চ করো।',
  ),
  statement: L(
    'An ability can be cast at times 0, d, 2d, …. A cast deals a damage at once and then heals the enemy b health at each of the next c seconds (times t + 1 … t + c); heals from different casts add up. What is the largest enemy health that can be killed (brought to ≤ 0) by casting as often as possible? Print −1 if every health can be killed.',
    'একটি দক্ষতা ০, d, ২d, … সময়ে ব্যবহার করা যায়। একবার ব্যবহারে সঙ্গে সঙ্গে a ক্ষতি হয়, তারপর পরের c সেকেন্ডে (সময় t + ১ … t + c) প্রতি সেকেন্ডে শত্রুর b স্বাস্থ্য ফেরে; আলাদা ব্যবহারের সুস্থতা যোগ হয়। যতবার সম্ভব ব্যবহার করে সবচেয়ে বেশি কত স্বাস্থ্যের শত্রুকে মারা (≤ ০ করা) যায়? যেকোনো স্বাস্থ্যই মারা গেলে −১ প্রিন্ট করো।',
  ),
  input: L('t tests, each with a b c d.', 't টি টেস্ট, প্রতিটিতে a b c d।'),
  output: L('The largest killable health, or −1.', 'সর্বাধিক মারা-যায় এমন স্বাস্থ্য, বা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 10⁵, 1 ≤ a, b, c, d ≤ 10⁶', '১ ≤ t ≤ ১০⁵, ১ ≤ a, b, c, d ≤ ১০⁶')] },
  samples: [
    {
      input: '7\n1 1 1 1\n2 2 2 2\n1 2 3 4\n4 3 2 1\n228 21 11 3\n239 21 11 3\n1000000 1 1000000 1',
      output: '1\n2\n1\n5\n534\n-1\n500000500000',
      explain: L('For 4 3 2 1: two casts give 4 + 4 − 3 = 5. For 239 21 11 3 one cast heals at most 21 · 11 = 231 < 239, so repeated casts win without bound: −1.', '৪ ৩ ২ ১-এর জন্য: দুবার ব্যবহারে ৪ + ৪ − ৩ = ৫। ২৩৯ ২১ ১১ ৩-এ একবারের সুস্থতা সর্বোচ্চ ২১ · ১১ = ২৩১ < ২৩৯, তাই বারবার ব্যবহারে সীমাহীন জেতা যায়: −১।'),
    },
  ],
  observation: L(
    'One cast heals up to b·c in total. If a > b·c, each further cast adds a net positive amount forever: the answer is −1. Otherwise, after k + 1 casts the enemy has taken a(k + 1) damage and healed b·d·(1 + 2 + … + k) (the j-th older cast has healed d·j seconds), as long as kd ≤ c. The net damage a(k + 1) − bd·k(k + 1)/2 is a concave parabola in k.',
    'একবার ব্যবহারে মোট সুস্থতা সর্বোচ্চ b·c। a > b·c হলে প্রতিটি অতিরিক্ত ব্যবহার চিরকাল নিট ধনাত্মক যোগ করে: উত্তর −১। নইলে k + ১ বার ব্যবহারের পর শত্রু a(k + ১) ক্ষতি পেয়েছে আর b·d·(১ + ২ + … + k) সুস্থ হয়েছে (j-তম পুরোনো ব্যবহার d·j সেকেন্ড সুস্থ করেছে), যতক্ষণ kd ≤ c। নিট ক্ষতি a(k + ১) − bd·k(k + ১)/২, k-তে অবতল প্যারাবোলা।',
  ),
  approach: [
    L('If a > b·c print −1.', 'a > b·c হলে −১ প্রিন্ট করো।'),
    L('Otherwise the best number of extra casts is k = ⌊a / (b·d)⌋ (the last cast still adds a positive amount).', 'নইলে সেরা অতিরিক্ত ব্যবহারের সংখ্যা k = ⌊a / (b·d)⌋ (শেষ ব্যবহারও ধনাত্মক যোগ করে)।'),
    L('Print a(k + 1) − b·d·k(k + 1)/2.', 'প্রিন্ট করো a(k + ১) − b·d·k(k + ১)/২।'),
  ],
  walkthrough: {
    input: 'a = 4, b = 3, c = 2, d = 1',
    steps: [
      { state: 'b·c = 6 ≥ 4', text: L('Finite answer.', 'সসীম উত্তর।') },
      { state: 'k = ⌊4 / 3⌋ = 1', text: L('One extra cast pays: 4 − 3 = +1.', 'একটি অতিরিক্ত ব্যবহার লাভজনক: ৪ − ৩ = +১।') },
      { state: '4·2 − 3·1·1·2/2 = 5', text: L('Net damage 5: matches the sample.', 'নিট ক্ষতি ৫: স্যাম্পলের সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('A closed form; the ternary version adds O(log(c/d)).', 'সরাসরি সূত্র; টারনারি সংস্করণে O(log(c/d)) বাড়ে।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Closed form with k = ⌊a / (b·d)⌋', 'k = ⌊a / (b·d)⌋ দিয়ে সূত্র'),
      idea: L('The parabola peaks while each extra cast still adds a − b·d·k > 0.', 'প্যারাবোলার চূড়া ততক্ষণ যতক্ষণ প্রতিটি অতিরিক্ত ব্যবহার a − b·d·k > ০ যোগ করে।'),
      explain: [L('The (k+1)-th cast adds a minus the heal it will undergo relative to the earlier ones, b·d·k. It stays positive while k < a/(bd), so stop at k = ⌊a/(bd)⌋. Because a ≤ b·c this k satisfies kd ≤ c, which is the assumption the formula needs.', '(k+১)-তম ব্যবহার যোগ করে a বিয়োগ আগেরগুলোর সাপেক্ষে সুস্থতা b·d·k। এটি k < a/(bd) পর্যন্ত ধনাত্মক, তাই k = ⌊a/(bd)⌋-এ থামো। a ≤ b·c বলে এই k-তে kd ≤ c, যা সূত্রের প্রয়োজনীয় শর্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll a, b, c, d;
        scanf("%lld %lld %lld %lld", &a, &b, &c, &d);
        if (a > b * c) {
            puts("-1");
            continue;
        }
        ll k = a / (b * d);
        printf("%lld\n", a * (k + 1) - b * d * (k * (k + 1) / 2));
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search the number of casts', 'নিক্ষেপ সংখ্যায় টারনারি সার্চ'),
      idea: L('g(k) = a(k + 1) − bd·k(k + 1)/2 is concave on 0 … c/d: find its peak.', 'g(k) = a(k + ১) − bd·k(k + ১)/২, ০ … c/d-তে অবতল: এর চূড়া খোঁজো।'),
      explain: [L('Restrict k to [0, c/d], where the formula for the healing is exact. Compare g(m1) and g(m2): the smaller side is cut. Concave functions repeat a value only around the peak, so an equal comparison keeps both points. This version never needs the closed form k = a/(bd).', 'k-কে [০, c/d]-তে সীমাবদ্ধ রাখো, যেখানে সুস্থতার সূত্র সঠিক। g(m1) আর g(m2) তুলনা করো: ছোট দিকটা কাটো। অবতল ফাংশন কোনো মান পুনরাবৃত্তি করে কেবল চূড়ার আশেপাশে, তাই সমান হলে দুই বিন্দুই রাখো। এই সংস্করণে k = a/(bd) সূত্র লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
ll a, b, c, d;

ll g(ll k) { return a * (k + 1) - b * d * (k * (k + 1) / 2); }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%lld %lld %lld %lld", &a, &b, &c, &d);
        if (a > b * c) {
            puts("-1");
            continue;
        }
        ll lo = 0, hi = c / d;
        while (hi - lo > 2) {
            ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (g(m1) < g(m2)) lo = m1 + 1;
            else if (g(m1) > g(m2)) hi = m2 - 1;
            else lo = m1, hi = m2;
        }
        ll best = 0;
        for (ll k = lo; k <= hi; k++) best = max(best, g(k));
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(log(c / d))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Simulate the casts and track the net damage', 'নিক্ষেপ সিমুলেট করে নিট ক্ষতি দেখো'),
      idea: L('For every number of casts, add up the damage and the healing each older cast has already produced.', 'প্রতিটি নিক্ষেপ সংখ্যার জন্য ক্ষতি আর প্রতিটি পুরোনো নিক্ষেপ যত সুস্থতা দিয়েছে তা যোগ করো।'),
      explain: [L('Counts min(c, (k − j)·d) healed seconds for each earlier cast j, literally. If the net damage is still growing after 300 casts, print −1. Exact for small parameters and independent of the formulas.', 'প্রতিটি আগের নিক্ষেপ j-র জন্য আক্ষরিকভাবে min(c, (k − j)·d) সুস্থতার সেকেন্ড গোনে। ৩০০ নিক্ষেপের পরও নিট ক্ষতি বাড়তে থাকলে −১ প্রিন্ট করে। ছোট প্যারামিটারে সঠিক আর সূত্রগুলো থেকে স্বাধীন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll a, b, c, d;
        scanf("%lld %lld %lld %lld", &a, &b, &c, &d);
        auto net = [&](int k) {
            ll s = 0;
            for (int j = 0; j <= k; j++) s += a - b * min(c, (ll)(k - j) * d);
            return s;
        };
        ll best = 0, at200 = net(200);
        for (int k = 0; k <= 300; k++) best = max(best, net(k));
        if (net(300) > at200) printf("-1\n");
        else printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(300²) per test',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '7\n1 1 1 1\n2 2 2 2\n1 2 3 4\n4 3 2 1\n228 21 11 3\n239 21 11 3\n1000000 1 1000000 1', output: '1\n2\n1\n5\n534\n-1\n500000500000', source: 'sample', note: sample(1) },
    { input: '2\n1000000 1000000 1 1000000\n5 1 5 1', output: '1000000\n15', source: 'own', note: L('Huge d: only one cast helps. And a = b·c exactly is still finite: a(k+1) − k(k+1)/2 with k = 5 gives 15.', 'বিশাল d: একবার ব্যবহারই কাজে লাগে। আর a = b·c ঠিক হলেও সসীম: k = ৫-এ a(k+১) − k(k+১)/২ = ১৫।') },
  ],
  pitfalls: [
    L('Comparing a with b·c using int: b·c reaches 10¹².', 'int দিয়ে a আর b·c তুলনা: b·c ১০¹² ছোঁয়।'),
    L('Treating a = b·c as −1: equal damage and healing is a finite plateau, not infinite growth.', 'a = b·c-কে −১ ধরা: সমান ক্ষতি আর সুস্থতা সসীম সমতল, অসীম বৃদ্ধি নয়।'),
    L('Applying the formula past kd > c, where the oldest casts have stopped healing.', 'kd > c ছাড়িয়ে সূত্র প্রয়োগ, যেখানে সবচেয়ে পুরোনো নিক্ষেপ সুস্থ করা বন্ধ করেছে।'),
  ],
  related: [
    { id: '1978B', name: 'New Bakery', why: L('A parabola in the number of items.', 'আইটেমের সংখ্যায় একটি প্যারাবোলা।') },
    { id: '1288A', name: 'Deadline', why: L('Another parabola with a threshold.', 'সীমাসহ আরেকটি প্যারাবোলা।') },
  ],
  toolkit: ['long-long'],
};

// ───────────────────────────────────────────── 808E
export const p808E: ProblemEntry = {
  id: '808E',
  contestId: 808,
  index: 'E',
  name: 'Selling Souvenirs',
  rating: 2300,
  tags: ['binary-search', 'dp', 'greedy', 'ternary-search'],
  why: L(
    'A knapsack with only three item weights. Fix how many weight-3 items to take; the rest is a concave choice between weight-1 and weight-2 items, so a ternary search finds it. A DP with greedy states solves it too, and a plain knapsack is the reference.',
    'মাত্র তিনটি ওজনের নেপস্যাক। কতগুলো ওজন-৩ আইটেম নেবে তা ঠিক করো; বাকিটা ওজন-১ আর ওজন-২ আইটেমের মধ্যে অবতল বাছাই, তাই টারনারি সার্চ তা খুঁজে দেয়। গ্রিডি-অবস্থার ডিপিও সমাধান করে, আর সাধারণ নেপস্যাক রেফারেন্স।',
  ),
  statement: L(
    'There are n souvenirs, each with weight 1, 2 or 3 and a cost. Choose a set whose total weight is at most m so that the total cost is as large as possible.',
    'n টি স্মারক, প্রতিটির ওজন ১, ২ বা ৩ আর একটি দাম। এমন একটি সেট বাছো যার মোট ওজন সর্বোচ্চ m আর মোট দাম যতটা সম্ভব বেশি।',
  ),
  input: L('n m; then n lines wᵢ cᵢ.', 'n m; তারপর n লাইনে wᵢ cᵢ।'),
  output: L('The maximum total cost.', 'সর্বাধিক মোট দাম।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ m ≤ 3·10⁵, 1 ≤ cᵢ ≤ 10⁹, wᵢ ∈ {1, 2, 3}', '১ ≤ n ≤ ১০⁵, ১ ≤ m ≤ ৩·১০⁵, ১ ≤ cᵢ ≤ ১০⁹, wᵢ ∈ {১, ২, ৩}')] },
  samples: [
    { input: '1 1\n2 1', output: '0', explain: L('The only item weighs 2 and does not fit.', 'একমাত্র আইটেমের ওজন ২, ঢোকে না।') },
    { input: '2 2\n1 3\n2 2', output: '3', explain: L('Take the weight-1 item (3); the weight-2 item (2) would fill the bag alone.', 'ওজন-১ আইটেম (৩) নাও; ওজন-২ আইটেম (২) একাই ব্যাগ ভরত।') },
    { input: '4 3\n3 10\n2 7\n2 8\n1 1', output: '10', explain: L('Either the weight-3 item alone (10), or 8 + 1 = 9, or 7 + 1: the best is 10.', 'ওজন-৩ আইটেম একা (১০), অথবা ৮ + ১ = ৯, অথবা ৭ + ১: সেরা ১০।') },
  ],
  observation: L(
    'Sort each weight class by cost, largest first, and take prefix sums P₁, P₂, P₃: taking j items of a class always means taking its j best. Fix j items of weight 3; the remaining capacity r = m − 3j is split into k items of weight 2 and as many weight-1 items as fit. The total P₂[k] + P₁[min(n₁, r − 2k)] is concave in k, so it has one peak.',
    'প্রতিটি ওজন-শ্রেণি দাম অনুসারে বড় থেকে ছোট সর্ট করো আর প্রিফিক্স সাম P₁, P₂, P₃ নাও: কোনো শ্রেণির j টি নেওয়া মানে সবসময় তার সেরা j টি। ওজন-৩-এর j টি ঠিক করো; বাকি ধারণক্ষমতা r = m − ৩j ভাগ হয় ওজন-২-এর k টি আর যত ওজন-১ ঢোকে তত। মোট P₂[k] + P₁[min(n₁, r − ২k)] k-তে অবতল, তাই একটিই চূড়া।',
  ),
  approach: [
    L('Sort the three groups descending and build prefix sums.', 'তিনটি দল বড় থেকে ছোট সর্ট করে প্রিফিক্স সাম বানাও।'),
    L('For each j = 0 … min(n₃, ⌊m/3⌋): ternary-search k ∈ [0, min(n₂, ⌊(m − 3j)/2⌋)] for the best P₂[k] + P₁[min(n₁, r − 2k)].', 'প্রতিটি j = ০ … min(n₃, ⌊m/৩⌋)-এর জন্য: সেরা P₂[k] + P₁[min(n₁, r − ২k)]-র জন্য k ∈ [০, min(n₂, ⌊(m − ৩j)/২⌋)]-এ টারনারি সার্চ।'),
    L('Answer = max over j of P₃[j] + that value.', 'উত্তর = সব j-র মধ্যে P₃[j] + সেই মানের সর্বোচ্চ।'),
  ],
  walkthrough: {
    input: 'm = 3; weight 3: [10]; weight 2: [8, 7]; weight 1: [1]',
    steps: [
      { state: 'j = 0, r = 3', text: L('k = 0: 0 + 1 = 1. k = 1: 8 + P₁[min(1, 1)] = 8 + 1 = 9.', 'k = ০: ০ + ১ = ১। k = ১: ৮ + P₁[min(১, ১)] = ৮ + ১ = ৯।') },
      { state: 'j = 1, r = 0', text: L('Only k = 0: P₃[1] = 10.', 'শুধু k = ০: P₃[১] = ১০।') },
      { state: 'max', text: L('10.', '১০।') },
    ],
  },
  complexity: { time: 'O(n log n + (m/3) · log m)', space: 'O(n)', why: L('Three sorts, then one logarithmic search per weight-3 count.', 'তিনটি সর্ট, তারপর প্রতিটি ওজন-৩ সংখ্যার জন্য একটি লগারিদমিক সার্চ।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Enumerate weight-3 items, ternary-search weight-2 items', 'ওজন-৩ গণনা, ওজন-২-এ টারনারি সার্চ'),
      idea: L('For each j the best mix of weights 1 and 2 is a concave peak in k.', 'প্রতিটি j-র জন্য ওজন ১ আর ২-এর সেরা মিশ্রণ k-তে একটি অবতল চূড়া।'),
      explain: [L('The sequence P₁ is concave (its steps are non-increasing and then zero), and k ↦ r − 2k is linear, so P₁[min(n₁, r − 2k)] is concave in k; adding the concave P₂[k] keeps concavity. A concave sequence is flat only at its maximum, which makes the “equal means the peak is between” rule safe.', 'P₁ অবতল (তার ধাপ ক্রমহ্রাসমান, তারপর শূন্য), আর k ↦ r − ২k রৈখিক, তাই P₁[min(n₁, r − ২k)] k-তে অবতল; অবতল P₂[k] যোগ করলেও অবতল থাকে। অবতল ধারা কেবল সর্বোচ্চে সমতল, তাই “সমান মানে চূড়া মাঝে” নিয়ম নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> g[4];
    for (int i = 0; i < n; i++) {
        int w;
        ll c;
        scanf("%d %lld", &w, &c);
        g[w].push_back(c);
    }
    vector<ll> P[4];
    for (int w = 1; w <= 3; w++) {
        sort(g[w].rbegin(), g[w].rend());
        P[w].assign(g[w].size() + 1, 0);
        for (size_t i = 0; i < g[w].size(); i++) P[w][i + 1] = P[w][i] + g[w][i];
    }
    int n1 = g[1].size(), n2 = g[2].size(), n3 = g[3].size();
    ll best = 0;
    for (int j = 0; j <= min(n3, m / 3); j++) {
        int r = m - 3 * j;
        auto f = [&](int k) { return P[2][k] + P[1][min(n1, r - 2 * k)]; };
        int lo = 0, hi = min(n2, r / 2);
        while (hi - lo > 2) {
            int m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            ll f1 = f(m1), f2 = f(m2);
            if (f1 < f2) lo = m1 + 1;
            else if (f1 > f2) hi = m2 - 1;
            else lo = m1, hi = m2;
        }
        ll top = 0;
        for (int k = lo; k <= hi; k++) top = max(top, f(k));
        best = max(best, P[3][j] + top);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n log n + (m/3) log m)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'lambda', 'long-long'],
    },
    {
      id: 'greedy-dp',
      kind: 'method',
      title: L('DP over weight with a greedy state', 'ওজনের ওপর গ্রিডি-অবস্থার ডিপি'),
      idea: L('dp[w] = best cost using weights 1 and 2 with total weight ≤ w, remembering how many of each were used.', 'dp[w] = ওজন ১ আর ২ দিয়ে মোট ওজন ≤ w-তে সেরা দাম, প্রতিটির কতগুলো নেওয়া হয়েছে মনে রেখে।'),
      explain: [L('dp[w] either equals dp[w − 1], or extends dp[w − 1] with its next unused weight-1 item, or extends dp[w − 2] with its next unused weight-2 item; keep whichever costs most. Then try every j of weight-3 items. This relies on the best set for capacity w being a prefix of each sorted class, which the stress test confirms.', 'dp[w] হয় dp[w − ১]-এর সমান, নয়তো dp[w − ১]-কে তার পরের অব্যবহৃত ওজন-১ আইটেম দিয়ে বাড়ায়, নয়তো dp[w − ২]-কে পরের অব্যবহৃত ওজন-২ আইটেম দিয়ে; যেটি সবচেয়ে দামি তা রাখো। তারপর ওজন-৩-এর প্রতিটি j চেষ্টা করো। এটি নির্ভর করে ধারণক্ষমতা w-র সেরা সেট প্রতিটি সর্টেড শ্রেণির প্রিফিক্স হওয়ার ওপর, যা স্ট্রেস টেস্ট নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct St { ll c; int x1, x2; };

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> g[4];
    for (int i = 0; i < n; i++) {
        int w;
        ll c;
        scanf("%d %lld", &w, &c);
        g[w].push_back(c);
    }
    for (int w = 1; w <= 3; w++) sort(g[w].rbegin(), g[w].rend());
    vector<ll> P3(g[3].size() + 1, 0);
    for (size_t i = 0; i < g[3].size(); i++) P3[i + 1] = P3[i] + g[3][i];
    vector<St> dp(m + 1, {0, 0, 0});
    for (int w = 1; w <= m; w++) {
        dp[w] = dp[w - 1];
        St a = dp[w - 1];
        if (a.x1 < (int)g[1].size()) {
            a.c += g[1][a.x1++];
            if (a.c > dp[w].c) dp[w] = a;
        }
        if (w >= 2) {
            St b = dp[w - 2];
            if (b.x2 < (int)g[2].size()) {
                b.c += g[2][b.x2++];
                if (b.c > dp[w].c) dp[w] = b;
            }
        }
    }
    ll best = 0;
    for (int j = 0; j <= min((int)g[3].size(), m / 3); j++) best = max(best, P3[j] + dp[m - 3 * j].c);
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n log n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'long-long', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('0/1 knapsack over capacity', '০/১ নেপস্যাক, ধারণক্ষমতার ওপর'),
      idea: L('dp[w] = best cost with total weight ≤ w, processing items one at a time.', 'dp[w] = মোট ওজন ≤ w-তে সেরা দাম, আইটেম একে একে নিয়ে।'),
      explain: [L('The textbook O(n·m) knapsack, correct for any weights — here the reference.', 'প্রচলিত O(n·m) নেপস্যাক, যেকোনো ওজনে সঠিক — এখানে রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> dp(m + 1, 0);
    for (int i = 0; i < n; i++) {
        int w;
        ll c;
        scanf("%d %lld", &w, &c);
        for (int j = m; j >= w; j--) dp[j] = max(dp[j], dp[j - w] + c);
    }
    printf("%lld\n", dp[m]);
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(m)',
      accepted: false,
      toolkit: ['vector', 'long-long'],
    },
  ],
  tests: [
    { input: '1 1\n2 1', output: '0', source: 'sample', note: sample(1) },
    { input: '2 2\n1 3\n2 2', output: '3', source: 'sample', note: sample(2) },
    { input: '4 3\n3 10\n2 7\n2 8\n1 1', output: '10', source: 'sample', note: sample(3) },
    { input: '3 6\n3 5\n3 5\n3 5', output: '10', source: 'own', note: L('Only two weight-3 items fit: capacity, not item count, limits you.', 'শুধু দুটি ওজন-৩ আইটেম ঢোকে: আইটেম সংখ্যা নয়, ধারণক্ষমতা সীমা।') },
    { input: '3 4\n2 9\n2 9\n1 1', output: '18', source: 'own', note: L('Two weight-2 items beat anything with the cheap weight-1 item.', 'দুটি ওজন-২ আইটেম সস্তা ওজন-১ আইটেমসহ যেকোনো কিছুকে হারায়।') },
  ],
  pitfalls: [
    L('Taking weight-1 items first because they are “small”: a weight-2 item with a big cost can beat two of them.', '“ছোট” বলে ওজন-১ আইটেম আগে নেওয়া: বড় দামের একটি ওজন-২ আইটেম দুটি ওজন-১-কে হারাতে পারে।'),
    L('Reading P₁ out of range: clamp with min(n₁, r − 2k).', 'পরিসরের বাইরে P₁ পড়া: min(n₁, r − ২k) দিয়ে আটকাও।'),
    L('Forgetting that 1 + 2 can never exactly fill an odd capacity left by a greedy parity trick: let the DP or the search decide.', 'ধরে নেওয়া যে গ্রিডি জোড়-বিজোড় কৌশল ধারণক্ষমতা ঠিকঠাক ভরবে: ডিপি বা সার্চকেই সিদ্ধান্ত নিতে দাও।'),
  ],
  related: [
    { id: '1244E', name: 'Minimizing Difference', why: L('Another concave search nested in an outer loop.', 'বাইরের লুপের ভেতরে আরেকটি অবতল সার্চ।') },
    { id: '1538G', name: 'Gift Set', why: L('A choice between two item types for a fixed total.', 'নির্দিষ্ট মোটের জন্য দুই ধরনের আইটেমের বাছাই।') },
  ],
  toolkit: ['sort', 'prefix-sum', 'long-long'],
};

// ───────────────────────────────────────────── 1059D
export const p1059D: ProblemEntry = {
  id: '1059D',
  contestId: 1059,
  index: 'D',
  name: 'Nature Reserve',
  rating: 2200,
  tags: ['binary-search', 'geometry', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'The radius needed for a circle that touches the river at x = c is a maximum of simple quadratics in c, so it is convex: ternary-search the touching point. The same answer comes from binary-searching R with interval intersection, and from exact candidate enumeration.',
    'নদীকে x = c-তে ছোঁয়া বৃত্তের জন্য দরকারি ব্যাসার্ধ c-র সরল দ্বিঘাতের সর্বোচ্চ, তাই উত্তল: স্পর্শ-বিন্দুতে টারনারি সার্চ করো। একই উত্তর মেলে R-এ বাইনারি সার্চ আর ব্যবধান ছেদে, আবার সঠিক প্রার্থী গণনাতেও।',
  ),
  statement: L(
    'n animals live at points (xᵢ, yᵢ), yᵢ ≠ 0. The river is the line y = 0. A circular reserve must contain all animals and must touch the river at exactly one point (it may not cross it). Find the smallest possible radius, or print −1 if the animals are on both sides of the river.',
    'n টি প্রাণী বাস করে (xᵢ, yᵢ) বিন্দুতে, yᵢ ≠ ০। নদী হলো y = ০ রেখা। একটি বৃত্তাকার অভয়ারণ্যে সব প্রাণী থাকতে হবে আর নদীকে ঠিক এক বিন্দুতে ছুঁতে হবে (পার হওয়া যাবে না)। সবচেয়ে ছোট সম্ভব ব্যাসার্ধ বের করো, প্রাণীরা নদীর দুই পাশে থাকলে −১ প্রিন্ট করো।',
  ),
  input: L('n, then n lines xᵢ yᵢ.', 'n, তারপর n লাইনে xᵢ yᵢ।'),
  output: L('The minimum radius (error up to 10⁻⁶), or −1.', 'ন্যূনতম ব্যাসার্ধ (ত্রুটি ১০⁻⁶ পর্যন্ত), বা −১।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, |xᵢ|, |yᵢ| ≤ 10⁷; use long double for the search', '১ ≤ n ≤ ১০⁵, |xᵢ|, |yᵢ| ≤ ১০⁷; সার্চের জন্য long double ব্যবহার করো')] },
  samples: [
    { input: '1\n0 1', output: '0.5', explain: L('One animal: the circle with diameter from the animal down to the river.', 'একটি প্রাণী: প্রাণী থেকে নদী পর্যন্ত ব্যাসযুক্ত বৃত্ত।') },
    { input: '3\n0 1\n0 2\n0 -3', output: '-1', explain: L('Animals on both sides of the river.', 'নদীর দুই পাশেই প্রাণী।') },
    { input: '2\n0 1\n1 1', output: '0.625', explain: L('Touch the river at x = 0.5: both animals need radius (0.25 + 1)/2.', 'নদী ছোঁও x = ০.৫-এ: দুই প্রাণীরই ব্যাসার্ধ (০.২৫ + ১)/২।') },
  ],
  observation: L(
    'Flip everything to y > 0. A circle touching the river at (c, 0) has its centre at (c, R). A point (x, y) is inside iff (x − c)² + (y − R)² ≤ R², that is R ≥ ((x − c)² + y²)/(2y). So the radius needed is f(c) = max over i of ((xᵢ − c)² + yᵢ²)/(2yᵢ). Each term is a parabola in c, so f is convex, and the best c lies in [min x, max x].',
    'সবকিছু y > ০-তে উল্টে নাও। নদীকে (c, ০)-তে ছোঁয়া বৃত্তের কেন্দ্র (c, R)-এ। বিন্দু (x, y) ভেতরে থাকে যদি (x − c)² + (y − R)² ≤ R², অর্থাৎ R ≥ ((x − c)² + y²)/(২y)। তাই দরকারি ব্যাসার্ধ f(c) = সব i-র ((xᵢ − c)² + yᵢ²)/(২yᵢ)-এর সর্বোচ্চ। প্রতিটি পদ c-র প্যারাবোলা, তাই f উত্তল, আর সেরা c [min x, max x]-এ।',
  ),
  approach: [
    L('If the signs of y differ, print −1; otherwise replace y by |y|.', 'y-এর চিহ্ন আলাদা হলে −১; নইলে y-কে |y| করো।'),
    L('Ternary-search c in [min x, max x] on f(c) with 200 rounds in long double.', 'long double-এ ২০০ রাউন্ডে f(c)-তে [min x, max x]-এ c টারনারি সার্চ করো।'),
    L('Print f at the final c.', 'শেষ c-তে f প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'points (0, 1) and (1, 1)',
    steps: [
      { state: 'f(c) = max(((c)² + 1)/2, ((1 − c)² + 1)/2)', text: L('Two parabolas with vertices at 0 and 1.', 'শীর্ষ ০ আর ১-এ দুটি প্যারাবোলা।') },
      { state: 'they cross at c = 0.5', text: L('f(0.5) = (0.25 + 1)/2 = 0.625; moving either way makes one parabola larger.', 'f(০.৫) = (০.২৫ + ১)/২ = ০.৬২৫; যেকোনো দিকে সরলে একটি প্যারাবোলা বড় হয়।') },
    ],
  },
  complexity: { time: 'O(n · iterations)', space: 'O(n)', why: L('200 rounds, each evaluating f in O(n).', '২০০ রাউন্ড, প্রতিটিতে f O(n)-এ।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Ternary search the touching point', 'স্পর্শ-বিন্দুতে টারনারি সার্চ'),
      idea: L('f(c) = max ((xᵢ − c)² + yᵢ²)/(2yᵢ) is convex in c.', 'f(c) = ((xᵢ − c)² + yᵢ²)/(২yᵢ)-এর সর্বোচ্চ c-তে উত্তল।'),
      explain: [L('Evaluate f at two interior points and discard the side with the larger value. The maximum of parabolas has no flat part except possibly at the very bottom, so no special handling is needed. Use long double: x differences reach 2·10⁷ and R can be about 10¹⁴.', 'দুটি ভেতরের বিন্দুতে f হিসাব করে বড় মানের দিকটা বাদ দাও। প্যারাবোলার সর্বোচ্চে একদম তলদেশ ছাড়া সমতল অংশ নেই, তাই বিশেষ সামলানো লাগে না। long double ব্যবহার করো: x-এর পার্থক্য ২·১০⁷ আর R প্রায় ১০¹⁴ হতে পারে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    scanf("%d", &n);
    vector<ld> x(n), y(n);
    bool pos = false, neg = false;
    for (int i = 0; i < n; i++) {
        double a, b;
        scanf("%lf %lf", &a, &b);
        x[i] = a, y[i] = fabs(b);
        (b > 0 ? pos : neg) = true;
    }
    if (pos && neg) {
        puts("-1");
        return 0;
    }
    auto f = [&](ld c) {
        ld r = 0;
        for (int i = 0; i < n; i++) r = max(r, ((x[i] - c) * (x[i] - c) + y[i] * y[i]) / (2 * y[i]));
        return r;
    };
    ld lo = *min_element(x.begin(), x.end()), hi = *max_element(x.begin(), x.end());
    for (int it = 0; it < 200; it++) {
        ld m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2;
        else lo = m1;
    }
    printf("%.9Lf\n", f((lo + hi) / 2));
    return 0;
}
`,
      time: 'O(200 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
    {
      id: 'binary-radius',
      kind: 'method',
      title: L('Binary search the radius, intersect intervals', 'ব্যাসার্ধে বাইনারি সার্চ, ব্যবধান ছেদ'),
      idea: L('For a given R each animal allows the touching point only inside [x − √(y(2R − y)), x + √(y(2R − y))].', 'নির্দিষ্ট R-এর জন্য প্রতিটি প্রাণী স্পর্শ-বিন্দু শুধু [x − √(y(২R − y)), x + √(y(২R − y))]-এর ভেতরে অনুমতি দেয়।'),
      explain: [L('R is feasible iff R ≥ y/2 for every animal and all those intervals have a common point. Feasibility is monotone in R, so binary search the smallest feasible R in [maxy/2, 10¹⁵]. Same answer, no convexity argument needed — only monotonicity.', 'R সম্ভব যদি প্রতিটি প্রাণীর R ≥ y/২ হয় আর সব ব্যবধানের একটি সাধারণ বিন্দু থাকে। সম্ভাব্যতা R-এ একঘাতিক, তাই [maxy/২, ১০¹⁵]-এ ক্ষুদ্রতম সম্ভব R বাইনারি সার্চে খোঁজো। একই উত্তর, উত্তলতার যুক্তি লাগে না — শুধু একঘাতিকতা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    scanf("%d", &n);
    vector<ld> x(n), y(n);
    bool pos = false, neg = false;
    for (int i = 0; i < n; i++) {
        double a, b;
        scanf("%lf %lf", &a, &b);
        x[i] = a, y[i] = fabs(b);
        (b > 0 ? pos : neg) = true;
    }
    if (pos && neg) {
        puts("-1");
        return 0;
    }
    ld lo = *max_element(y.begin(), y.end()) / 2, hi = 1e15L;
    for (int it = 0; it < 200; it++) {
        ld R = (lo + hi) / 2, L = -1e30L, U = 1e30L;
        bool ok = true;
        for (int i = 0; i < n && ok; i++) {
            if (2 * R < y[i]) { ok = false; break; }
            ld w = sqrtl(y[i] * (2 * R - y[i]));
            L = max(L, x[i] - w), U = min(U, x[i] + w);
            if (L > U) ok = false;
        }
        if (ok) hi = R;
        else lo = R;
    }
    printf("%.9Lf\n", hi);
    return 0;
}
`,
      time: 'O(200 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every candidate touching point', 'প্রতিটি সম্ভাব্য স্পর্শ-বিন্দু গণনা'),
      idea: L('The optimum of a maximum of parabolas is a vertex xᵢ or a crossing of two parabolas: test all of them.', 'প্যারাবোলার সর্বোচ্চের সেরা বিন্দু একটি শীর্ষ xᵢ বা দুই প্যারাবোলার ছেদ: সবগুলো পরীক্ষা করো।'),
      explain: [L('O(n³): solve the quadratic where two parabolas are equal and evaluate f at every root and every vertex. Exact (up to floating point), independent of any search.', 'O(n³): যেখানে দুই প্যারাবোলা সমান সেই দ্বিঘাত সমাধান করে প্রতিটি মূল আর প্রতিটি শীর্ষে f হিসাব। সঠিক (ভাসমান বিন্দু পর্যন্ত), কোনো সার্চ থেকে স্বাধীন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    scanf("%d", &n);
    vector<ld> x(n), y(n);
    bool pos = false, neg = false;
    for (int i = 0; i < n; i++) {
        double a, b;
        scanf("%lf %lf", &a, &b);
        x[i] = a, y[i] = fabs(b);
        (b > 0 ? pos : neg) = true;
    }
    if (pos && neg) {
        puts("-1");
        return 0;
    }
    auto f = [&](ld c) {
        ld r = 0;
        for (int i = 0; i < n; i++) r = max(r, ((x[i] - c) * (x[i] - c) + y[i] * y[i]) / (2 * y[i]));
        return r;
    };
    vector<ld> cand(x.begin(), x.end());
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            ld A = y[j] - y[i], B = -2 * (y[j] * x[i] - y[i] * x[j]);
            ld C = y[j] * (x[i] * x[i] + y[i] * y[i]) - y[i] * (x[j] * x[j] + y[j] * y[j]);
            if (fabsl(A) < 1e-12L) {
                if (fabsl(B) > 1e-12L) cand.push_back(-C / B);
            } else {
                ld D = B * B - 4 * A * C;
                if (D >= 0) cand.push_back((-B + sqrtl(D)) / (2 * A)), cand.push_back((-B - sqrtl(D)) / (2 * A));
            }
        }
    ld best = 1e30L;
    for (ld c : cand) best = min(best, f(c));
    printf("%.9Lf\n", best);
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['setprecision'],
    },
  ],
  tests: [
    { input: '1\n0 1', output: '0.5', source: 'sample', note: sample(1) },
    { input: '3\n0 1\n0 2\n0 -3', output: '-1', source: 'sample', note: sample(2) },
    { input: '2\n0 1\n1 1', output: '0.625', source: 'sample', note: sample(3) },
    { input: '2\n-10000000 1\n10000000 1', output: '50000000000000.5', source: 'own', note: L('Huge radius ≈ 5·10¹³: precision of the search and printing matters.', 'বিশাল ব্যাসার্ধ ≈ ৫·১০¹³: সার্চ আর প্রিন্টের নির্ভুলতা গুরুত্বপূর্ণ।') },
  ],
  pitfalls: [
    L('Forgetting that the circle must touch the river: even a single animal needs R = y/2, not 0.', 'বৃত্তকে নদী ছুঁতে হবে তা ভুলে যাওয়া: একটিমাত্র প্রাণীর জন্যও R = y/২, ০ নয়।'),
    L('Using double with R about 10¹⁴: subtracting nearly equal numbers loses the answer; use long double.', 'R প্রায় ১০¹⁴ হলে double ব্যবহার: প্রায়-সমান সংখ্যার বিয়োগে উত্তর হারায়; long double ব্যবহার করো।'),
    L('Ternary-searching a range that is too small: the touching point can be anywhere in [min x, max x] (and the optimum never lies outside).', 'খুব ছোট পরিসরে টারনারি সার্চ: স্পর্শ-বিন্দু [min x, max x]-এর যেকোনো জায়গায় (আর সেরা বিন্দু কখনো বাইরে নয়)।'),
  ],
  related: [
    { id: '1730B', name: 'Meeting on the Line', why: L('A maximum of V shapes instead of parabolas.', 'প্যারাবোলার বদলে V আকৃতির সর্বোচ্চ।') },
    { id: '578C', name: 'Weakness and Poorness', why: L('Convex in a real parameter, searched with doubles.', 'বাস্তব প্যারামিটারে উত্তল, ডাবলে খোঁজা।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 1119E
export const p1119E: ProblemEntry = {
  id: '1119E',
  contestId: 1119,
  index: 'E',
  name: 'Pavel and Triangles',
  rating: 1900,
  tags: ['brute-force', 'dp', 'greedy', 'ternary-search'],
  why: L(
    'Sticks of length 2ⁱ: a non-degenerate triangle is either three equal sticks or two equal long sticks plus one shorter one. Process lengths from short to long, keeping the unused short sticks as “fillers” — a clean greedy, checked against an exhaustive search.',
    '২ⁱ দৈর্ঘ্যের কাঠি: অবিকৃত ত্রিভুজ হয় তিনটি সমান কাঠিতে, নয়তো দুটি সমান লম্বা আর একটি ছোট কাঠিতে। ছোট থেকে বড় দৈর্ঘ্যে এগোও, অব্যবহৃত ছোট কাঠিগুলো “পূরক” হিসেবে রাখো — পরিষ্কার গ্রিডি, সম্পূর্ণ সার্চের বিপরীতে যাচাই করা।',
  ),
  statement: L(
    'Pavel has aᵢ sticks of length 2ⁱ for i = 0 … n − 1. He wants to make as many non-degenerate triangles as possible (positive area), each stick used in at most one triangle and all three sides of a triangle being whole sticks. Print the maximum number of triangles.',
    'পাভেলের কাছে i = ০ … n − ১-এর জন্য ২ⁱ দৈর্ঘ্যের aᵢ টি কাঠি। সে যতটা সম্ভব অবিকৃত (ধনাত্মক ক্ষেত্রফল) ত্রিভুজ বানাতে চায়, প্রতিটি কাঠি সর্বোচ্চ একটি ত্রিভুজে, আর ত্রিভুজের তিন বাহুই গোটা কাঠি। সর্বাধিক ত্রিভুজের সংখ্যা প্রিন্ট করো।',
  ),
  input: L('n, then a₀ … aₙ₋₁.', 'n, তারপর a₀ … aₙ₋₁।'),
  output: L('The maximum number of triangles.', 'সর্বাধিক ত্রিভুজের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 3·10⁵, 0 ≤ aᵢ ≤ 10⁹', '১ ≤ n ≤ ৩·১০⁵, ০ ≤ aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '5\n1 2 2 2 2', output: '3', explain: L('Lengths are 1, 2, 4, 8, 16 with counts 1, 2, 2, 2, 2. Triangles (1, 2, 2), (4, 8, 8) and (4, 16, 16): the two 4-sticks act as fillers for the longer pairs.', 'দৈর্ঘ্য ১, ২, ৪, ৮, ১৬ আর গণনা ১, ২, ২, ২, ২। ত্রিভুজ (১, ২, ২), (৪, ৮, ৮) আর (৪, ১৬, ১৬): দুটি ৪-কাঠি লম্বা জোড়াগুলোর পূরক।') },
    { input: '3\n1 1 1', output: '0', explain: L('One stick of each length: no triangle has a valid shape.', 'প্রতি দৈর্ঘ্যে একটি করে কাঠি: কোনো ত্রিভুজই সম্ভব নয়।') },
    { input: '3\n3 3 3', output: '3', explain: L('Three equal sticks of each length: three equilateral triangles.', 'প্রতি দৈর্ঘ্যে তিনটি সমান কাঠি: তিনটি সমবাহু ত্রিভুজ।') },
  ],
  observation: L(
    'Because 2ᵃ + 2ᵇ ≤ 2ᶜ for a ≤ b < c, a valid triangle has sides (2ˣ, 2ˣ, 2ˣ) or (2ᵃ, 2ᵇ, 2ᵇ) with a < b. So the two longest sides are always equal. Scan lengths upward and keep `rem`, the number of unused shorter sticks: at length b, use pairs of length-b sticks together with one shorter stick each, then group what is left into triples.',
    '২ᵃ + ২ᵇ ≤ ২ᶜ যখন a ≤ b < c, তাই বৈধ ত্রিভুজের বাহু (২ˣ, ২ˣ, ২ˣ) বা (২ᵃ, ২ᵇ, ২ᵇ), a < b। অর্থাৎ দুই বৃহত্তম বাহু সবসময় সমান। দৈর্ঘ্য ওপরের দিকে স্ক্যান করো আর `rem` রাখো, অব্যবহৃত ছোট কাঠির সংখ্যা: দৈর্ঘ্য b-তে প্রতি জোড়া দৈর্ঘ্য-b কাঠিকে একটি ছোট কাঠির সঙ্গে ব্যবহার করো, তারপর বাকিদের তিন-তিন করে দল করো।',
  ),
  approach: [
    L('rem = 0, answer = 0.', 'rem = ০, উত্তর = ০।'),
    L('For each length i: t = min(rem, aᵢ / 2); answer += t; aᵢ −= 2t; rem −= t.', 'প্রতিটি দৈর্ঘ্য i-র জন্য: t = min(rem, aᵢ / ২); উত্তর += t; aᵢ −= ২t; rem −= t।'),
    L('Then answer += aᵢ / 3 and rem += aᵢ mod 3.', 'তারপর উত্তর += aᵢ / ৩ আর rem += aᵢ mod ৩।'),
  ],
  walkthrough: {
    input: 'a = 1 2 2 2 2',
    steps: [
      { state: 'i = 0: a = 1', text: L('No triple; rem = 1.', 'ত্রিক নেই; rem = ১।') },
      { state: 'i = 1: a = 2, rem = 1', text: L('Use the pair with the filler: answer 1, rem 0.', 'পূরকসহ জোড়া ব্যবহার: উত্তর ১, rem ০।') },
      { state: 'i = 2: a = 2', text: L('Nothing to pair with; rem = 2.', 'জোড়া দেওয়ার কিছু নেই; rem = ২।') },
      { state: 'i = 3: a = 2, rem = 2', text: L('One more triangle: answer 2, rem 1.', 'আরও একটি ত্রিভুজ: উত্তর ২, rem ১।') },
      { state: 'i = 4: a = 2, rem = 1', text: L('Answer 3.', 'উত্তর ৩।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over the lengths.', 'দৈর্ঘ্যগুলোর ওপর এক পাস।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Greedy with unused shorter sticks as fillers', 'অব্যবহৃত ছোট কাঠিকে পূরক ধরে গ্রিডি'),
      idea: L('Pair equal sticks with a leftover shorter one first, then make equilateral triples.', 'আগে সমান কাঠির জোড়াকে অবশিষ্ট ছোট কাঠির সঙ্গে মেলাও, তারপর সমবাহু ত্রিক বানাও।'),
      explain: [L('A leftover shorter stick is useless unless it is a filler for a longer pair, so spending it that way is free. A pair of equal sticks with a filler uses 2 long sticks per triangle, while an equilateral one needs 3, so fillers are the cheaper way to use the long sticks.', 'অবশিষ্ট ছোট কাঠি লম্বা জোড়ার পূরক না হলে অকেজো, তাই এভাবে খরচ বিনামূল্যে। পূরকসহ সমান জোড়া প্রতি ত্রিভুজে ২টি লম্বা কাঠি নেয়, আর সমবাহুতে ৩টি লাগে, তাই লম্বা কাঠি ব্যবহারে পূরকই সস্তা পথ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    ll ans = 0, rem = 0;
    for (int i = 0; i < n; i++) {
        ll a;
        scanf("%lld", &a);
        ll t = min(rem, a / 2);
        ans += t, a -= 2 * t, rem -= t;
        ans += a / 3, rem += a % 3;
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Exhaustive search over every triangle', 'প্রতিটি ত্রিভুজের ওপর সম্পূর্ণ সার্চ'),
      idea: L('From the current counts, try every valid triangle type and recurse with memoisation.', 'বর্তমান গণনা থেকে প্রতিটি বৈধ ত্রিভুজ-ধরন চেষ্টা করে মেমোসহ রিকার্সন।'),
      explain: [L('Types are (x, x, x) and (a, b, b) with a < b. The memoised search explores all of them, so it makes no assumption about order or fillers: the independent check of the greedy.', 'ধরন (x, x, x) আর (a, b, b), a < b। মেমোসহ সার্চ সবগুলো দেখে, তাই ক্রম বা পূরক নিয়ে কোনো ধারণা ছাড়াই: গ্রিডির স্বাধীন যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
map<vector<int>, int> memo;

int go(vector<int>& c) {
    auto it = memo.find(c);
    if (it != memo.end()) return it->second;
    int best = 0;
    for (int x = 0; x < n; x++) {
        if (c[x] >= 3) {
            c[x] -= 3;
            best = max(best, 1 + go(c));
            c[x] += 3;
        }
        for (int a = 0; a < x; a++)
            if (c[a] >= 1 && c[x] >= 2) {
                c[a]--, c[x] -= 2;
                best = max(best, 1 + go(c));
                c[a]++, c[x] += 2;
            }
    }
    return memo[c] = best;
}

int main() {
    scanf("%d", &n);
    vector<int> c(n);
    for (int& x : c) scanf("%d", &x);
    printf("%d\n", go(c));
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['vector', 'map'],
    },
  ],
  tests: [
    { input: '5\n1 2 2 2 2', output: '3', source: 'sample', note: sample(1) },
    { input: '3\n1 1 1', output: '0', source: 'sample', note: sample(2) },
    { input: '3\n3 3 3', output: '3', source: 'sample', note: sample(3) },
    { input: '1\n1000000000', output: '333333333', source: 'own', note: L('Only one length: equilateral triangles only.', 'একটিমাত্র দৈর্ঘ্য: শুধু সমবাহু ত্রিভুজ।') },
    { input: '2\n0 5', output: '1', source: 'own', note: L('No short stick to act as a filler.', 'পূরক হওয়ার মতো ছোট কাঠি নেই।') },
  ],
  pitfalls: [
    L('Counting a triangle (2ᵃ, 2ᵇ, 2ᶜ) with three different lengths: 2ᵃ + 2ᵇ ≤ 2ᶜ, so it is degenerate.', 'তিন আলাদা দৈর্ঘ্যের (২ᵃ, ২ᵇ, ২ᶜ) ত্রিভুজ গোনা: ২ᵃ + ২ᵇ ≤ ২ᶜ, তাই এটি বিকৃত।'),
    L('Making equilateral triples first: it can waste long sticks that a filler would have used more cheaply.', 'আগে সমবাহু ত্রিক বানানো: এতে এমন লম্বা কাঠি নষ্ট হতে পারে যা পূরক দিয়ে সস্তায় ব্যবহার করা যেত।'),
    L('Overflow: the answer is up to about 10¹⁴.', 'উপচে পড়া: উত্তর প্রায় ১০¹⁴ পর্যন্ত।'),
  ],
  related: [
    { id: '1312C', name: 'Adding Powers', why: L('Powers of a base: why smaller powers can never replace a bigger one.', 'ভিত্তির ঘাত: কেন ছোট ঘাত কখনো বড়টির বদলি হতে পারে না।') },
    { id: '1538C', name: 'Number of Pairs', why: L('Counting valid combinations after sorting.', 'সর্টিংয়ের পর বৈধ সমন্বয় গণনা।') },
  ],
  toolkit: ['long-long'],
};
