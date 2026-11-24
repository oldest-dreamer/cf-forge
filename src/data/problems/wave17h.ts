import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 321E
export const p321E: ProblemEntry = {
  id: '321E',
  contestId: 321,
  index: 'E',
  name: 'Ciel and Gondolas',
  rating: 2600,
  tags: ['data-structures', 'divide-and-conquer', 'dp'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'Partitioning a line into k groups with a pairwise cost is the textbook case for “divide and conquer optimisation”: the best split point only moves right as the right end moves right, so each DP layer can be filled by splitting the range in half.',
    'কোনো রেখাকে জোড়াভিত্তিক খরচে k দলে ভাগ করা “ডিভাইড অ্যান্ড কনকার অপটিমাইজেশন”-এর পাঠ্যবই উদাহরণ: ডান প্রান্ত ডানে সরলে সেরা ভাগ-বিন্দুও কেবল ডানে সরে, তাই প্রতিটি DP স্তর পরিসর অর্ধেক করে ভরা যায়।',
  ),
  statement: L(
    'n people stand in a queue and must be split into k non-empty consecutive groups, one per gondola. Between each pair i, j there is an unfamiliarity u_ij ∈ [0, 9] (symmetric, zero on the diagonal). The cost of a group is the sum of u over all pairs inside it. Minimise the total cost.',
    'n জন লাইনে দাঁড়িয়ে আছে এবং k টি অশূন্য ধারাবাহিক দলে ভাগ হবে, প্রতিটি গন্ডোলার জন্য একটি। প্রতিটি জোড়া i, j-র মধ্যে অপরিচয় u_ij ∈ [০, ৯] (প্রতিসম, কর্ণে শূন্য)। দলের খরচ হলো তার ভেতরের সব জোড়ার u-এর যোগফল। মোট খরচ ন্যূনতম করো।',
  ),
  input: L('n and k, then the n × n matrix u.', 'n আর k, তারপর n × n ম্যাট্রিক্স u।'),
  output: L('The minimum total unfamiliarity.', 'ন্যূনতম মোট অপরিচয়।'),
  limits: { timeSec: 4, memoryMb: 512, notes: [L('1 ≤ n ≤ 4000, 1 ≤ k ≤ min(n, 800)', '১ ≤ n ≤ ৪০০০, ১ ≤ k ≤ min(n, ৮০০)')] },
  samples: [
    { input: '5 2\n0 0 1 1 1\n0 0 1 1 1\n1 1 0 0 0\n1 1 0 0 0\n1 1 0 0 0', output: '0', explain: L('Groups {1, 2} and {3, 4, 5} have no unfamiliar pairs inside.', 'দল {১, ২} আর {৩, ৪, ৫}-এর ভেতরে অপরিচিত জোড়া নেই।') },
    { input: '3 2\n0 2 0\n2 0 3\n0 3 0', output: '2', explain: L('Groups {1, 2} and {3}: cost 2. The other split costs 3.', 'দল {১, ২} আর {৩}: খরচ ২। অন্য ভাগের খরচ ৩।') },
  ],
  observation: L(
    'With a 2-D prefix sum P, cost(l, r) = (P[r][r] − P[l][r] − P[r][l] + P[l][l]) / 2 is O(1) for the group l + 1 … r. The DP is dp[g][i] = min over j < i of dp[g − 1][j] + cost(j, i). The cost satisfies the quadrangle inequality, so the optimal j for i never decreases as i grows.',
    '২ডি প্রিফিক্স সাম P দিয়ে দল l + ১ … r-এর খরচ(l, r) = (P[r][r] − P[l][r] − P[r][l] + P[l][l]) / ২ O(১)-এ মেলে। DP হলো dp[g][i] = j < i-এর ওপর dp[g − ১][j] + খরচ(j, i)-এর ন্যূনতম। খরচ চতুর্ভুজ-অসমতা মানে, তাই i বাড়লে সেরা j কখনও কমে না।',
  ),
  approach: [
    L('Read the matrix fast and build the 2-D prefix sums.', 'ম্যাট্রিক্স দ্রুত পড়ে ২ডি প্রিফিক্স সাম বানাও।'),
    L('Layer 1: dp[i] = cost(0, i). For each next layer fill dp over i with compute(l, r, optl, optr): take the middle m, scan j in [optl, min(m − 1, optr)], record the best j*, then recurse left with [optl, j*] and right with [j*, optr].', 'স্তর ১: dp[i] = খরচ(০, i)। পরের প্রতিটি স্তরে compute(l, r, optl, optr)-এ dp ভরো: মাঝ m নাও, j ∈ [optl, min(m − ১, optr)] স্ক্যান করে সেরা j* রাখো, বামে [optl, j*] আর ডানে [j*, optr] নিয়ে রিকার্স।'),
    L('After k layers print dp[n].', 'k স্তর পর dp[n] প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'second sample, layer 2',
    steps: [
      { state: 'dp₁(1), dp₁(2), dp₁(3) = 0, 2, 5', text: L('One group over the first i people: cost(0, 2) = 2, cost(0, 3) = 2 + 0 + 3.', 'প্রথম i জনের এক দল: খরচ(০, ২) = ২, খরচ(০, ৩) = ২ + ০ + ৩।') },
      { state: 'dp2[3] = min(dp1[1] + cost(1, 3), dp1[2] + cost(2, 3))', text: L('= min(0 + 3, 2 + 0) = 2.', '= min(০ + ৩, ২ + ০) = ২।') },
    ],
  },
  complexity: { time: 'O(n² + k·n log n)', space: 'O(n²)', why: L('The prefix sums cost n²; each layer’s recursion has log n levels of total width n.', 'প্রিফিক্স সাম n²; প্রতি স্তরের রিকার্সনে log n স্তর, প্রতি স্তরে মোট প্রস্থ n।') },
  solutions: [
    {
      id: 'dc',
      kind: 'optimal',
      title: L('Divide and conquer optimisation', 'ডিভাইড অ্যান্ড কনকার অপটিমাইজেশন'),
      idea: L('Compute the middle state’s best split, then restrict both halves to one side of it.', 'মাঝের অবস্থার সেরা ভাগ বের করে দুই অর্ধকে তার এক পাশে সীমাবদ্ধ করো।'),
      explain: [L('Reading 16 million numbers needs a custom reader. The recursion depth is only log n, and each layer touches about n log n transitions, so 800 layers cost roughly 4·10⁷ cost evaluations.', '১.৬ কোটি সংখ্যা পড়তে কাস্টম রিডার লাগে। রিকার্সনের গভীরতা শুধু log n, আর প্রতি স্তরে প্রায় n log n রূপান্তর, তাই ৮০০ স্তরে প্রায় ৪·১০⁷ খরচ-মূল্যায়ন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

static int P[4001][4001];
static int dpPrev[4005], dpCur[4005];

static int readInt() {
    int c = getchar();
    while (c < '0') c = getchar();
    int x = 0;
    while (c >= '0') x = x * 10 + c - '0', c = getchar();
    return x;
}

inline int cost(int l, int r) { return (P[r][r] - P[l][r] - P[r][l] + P[l][l]) / 2; }

void compute(int l, int r, int optl, int optr) {
    if (l > r) return;
    int m = (l + r) / 2, best = INT_MAX, bo = optl;
    for (int j = optl; j <= min(m - 1, optr); j++) {
        int v = dpPrev[j] + cost(j, m);
        if (v < best) best = v, bo = j;
    }
    dpCur[m] = best;
    compute(l, m - 1, optl, bo);
    compute(m + 1, r, bo, optr);
}

int main() {
    int n = readInt(), k = readInt();
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) P[i][j] = readInt() + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];
    for (int i = 1; i <= n; i++) dpPrev[i] = cost(0, i);
    for (int g = 2; g <= k; g++) {
        compute(g, n, g - 1, n - 1);
        for (int i = g; i <= n; i++) dpPrev[i] = dpCur[i];
    }
    printf("%d\n", dpPrev[n]);
    return 0;
}
`,
      time: 'O(n² + k n log n)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['prefix-sum', 'functions', 'min-max'],
    },
    {
      id: 'knuth',
      kind: 'better',
      title: L('Knuth-style monotone bounds', 'ক্লুথ-ধাঁচের মনোটোন সীমা'),
      idea: L('opt[g − 1][i] ≤ opt[g][i] ≤ opt[g][i + 1]: scan each state only inside that window.', 'opt[g − ১][i] ≤ opt[g][i] ≤ opt[g][i + ১]: প্রতিটি অবস্থা শুধু সেই জানালায় স্ক্যান।'),
      explain: [L('The windows of consecutive i telescope, so one layer costs O(n + total slack) and k layers together O(n² + nk). The cost is the same as the divide and conquer version; only the traversal order differs (i downward within a layer).', 'পরপর i-র জানালাগুলো টেলিস্কোপ করে, তাই এক স্তরের খরচ O(n + মোট ঢিলা) আর k স্তরে মোট O(n² + nk)। খরচ ডিভাইড অ্যান্ড কনকারের মতোই; শুধু ক্রম আলাদা (স্তরের ভেতরে i নিচের দিকে)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

static int P[4001][4001];
static int dpPrev[4005], dpCur[4005], optPrev[4005], optCur[4005];

static int readInt() {
    int c = getchar();
    while (c < '0') c = getchar();
    int x = 0;
    while (c >= '0') x = x * 10 + c - '0', c = getchar();
    return x;
}

inline int cost(int l, int r) { return (P[r][r] - P[l][r] - P[r][l] + P[l][l]) / 2; }

int main() {
    int n = readInt(), k = readInt();
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) P[i][j] = readInt() + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];
    for (int i = 1; i <= n; i++) dpPrev[i] = cost(0, i), optPrev[i] = 0;
    for (int g = 2; g <= k; g++) {
        for (int i = n; i >= g; i--) {
            int lo = max(optPrev[i], g - 1), hi = (i == n) ? i - 1 : optCur[i + 1];
            hi = min(hi, i - 1);
            if (lo > hi) lo = hi = max(g - 1, min(lo, i - 1));
            int best = INT_MAX, bo = lo;
            for (int j = lo; j <= hi; j++) {
                int v = dpPrev[j] + cost(j, i);
                if (v < best) best = v, bo = j;
            }
            dpCur[i] = best, optCur[i] = bo;
        }
        for (int i = g; i <= n; i++) dpPrev[i] = dpCur[i], optPrev[i] = optCur[i];
    }
    printf("%d\n", dpPrev[n]);
    return 0;
}
`,
      time: 'O(n² + nk)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['prefix-sum', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Plain O(k n²) DP', 'সাধারণ O(k n²) DP'),
      idea: L('Try every split point for every state.', 'প্রতিটি অবস্থার জন্য প্রতিটি ভাগ-বিন্দু চেষ্টা।'),
      explain: [L('The recurrence without any monotonicity trick — correct but 800 · 4000² / 2 ≈ 6·10⁹ operations on the full limits.', 'কোনো মনোটোনিসিটি কৌশল ছাড়া পুনরাবৃত্তি — সঠিক, কিন্তু পূর্ণ সীমায় ৮০০ · ৪০০০² / ২ ≈ ৬·১০⁹ অপারেশন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<vector<int>> P(n + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) {
            int x;
            scanf("%d", &x);
            P[i][j] = x + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1];
        }
    auto cost = [&](int l, int r) { return (P[r][r] - P[l][r] - P[r][l] + P[l][l]) / 2; };
    const int INF = 1e9;
    vector<int> dp(n + 1, INF);
    for (int i = 1; i <= n; i++) dp[i] = cost(0, i);
    for (int g = 2; g <= k; g++) {
        vector<int> nd(n + 1, INF);
        for (int i = g; i <= n; i++)
            for (int j = g - 1; j < i; j++) nd[i] = min(nd[i], dp[j] + cost(j, i));
        dp = nd;
    }
    printf("%d\n", dp[n]);
    return 0;
}
`,
      time: 'O(k n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['vector', 'lambda'],
    },
  ],
  tests: [
    { input: '5 2\n0 0 1 1 1\n0 0 1 1 1\n1 1 0 0 0\n1 1 0 0 0\n1 1 0 0 0', output: '0', source: 'sample', note: sample(1) },
    { input: '3 2\n0 2 0\n2 0 3\n0 3 0', output: '2', source: 'sample', note: sample(2) },
    { input: '1 1\n0', output: '0', source: 'own', note: L('One person, one gondola.', 'একজন, একটি গন্ডোলা।') },
    { input: '3 3\n0 9 9\n9 0 9\n9 9 0', output: '0', source: 'own', note: L('Every person alone: no pair is together.', 'প্রত্যেকে একা: কোনো জোড়া একসঙ্গে নেই।') },
  ],
  pitfalls: [
    L('Using scanf on 16 million integers: it can take over a second. Use a hand-written reader.', '১.৬ কোটি পূর্ণসংখ্যায় scanf: এক সেকেন্ডের বেশি লাগতে পারে। হাতে লেখা রিডার ব্যবহার করো।'),
    L('Forgetting that groups are non-empty: layer g can only use states with at least g people (l = g) and splits j ≥ g − 1.', 'দলগুলো অশূন্য, তা ভুলে যাওয়া: স্তর g শুধু অন্তত g জনের অবস্থা (l = g) আর ভাগ j ≥ g − ১ নিতে পারে।'),
    L('Dividing the prefix-sum value by 2 only at the end: it is already the double count of symmetric pairs, divide inside cost().', 'প্রিফিক্স সামের মান শুধু শেষে ২ দিয়ে ভাগ: এটি প্রতিসম জোড়ার দ্বিগুণ গণনা, cost()-এর ভেতরেই ভাগ করো।'),
  ],
  related: [
    { id: '660F', name: 'Bear and Bowling 4', why: L('Divide and conquer with a hull inside instead of an optimum pointer.', 'অপ্টিমাম পয়েন্টারের বদলে ভেতরে হালসহ ডিভাইড অ্যান্ড কনকার।') },
    { id: '808E', name: 'Selling Souvenirs', why: L('Another DP whose layers have a monotone structure.', 'আরেকটি DP যার স্তরগুলোর মনোটোন কাঠামো আছে।') },
  ],
  toolkit: ['prefix-sum'],
};

// ───────────────────────────────────────────── 868F
export const p868F: ProblemEntry = {
  id: '868F',
  contestId: 868,
  index: 'F',
  name: 'Yet Another Minimization Problem',
  rating: 2500,
  tags: ['divide-and-conquer', 'dp'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'The same optimisation as 321E, but the cost of a segment is no longer a table lookup — it is “number of equal pairs”, maintained by moving two pointers. The pointers only move O(n log n) in total per layer because the recursion visits ranges in a sweeping order.',
    '৩২১E-র একই অপটিমাইজেশন, কিন্তু সেগমেন্টের খরচ আর টেবিল-খোঁজ নয় — “সমান জোড়ার সংখ্যা”, যা দুটি পয়েন্টার সরিয়ে রাখা হয়। রিকার্সন পরিসরগুলো ঝাড়ু-ক্রমে ঘোরে বলে প্রতি স্তরে পয়েন্টার মোট O(n log n) সরে।',
  ),
  statement: L(
    'Split an array of n integers into k non-empty consecutive subarrays. The cost of a subarray is the number of pairs of positions with equal values. Minimise the total cost.',
    'n টি পূর্ণসংখ্যার অ্যারেকে k টি অশূন্য ধারাবাহিক সাবঅ্যারেতে ভাগ করো। সাবঅ্যারের খরচ হলো সমান মানের অবস্থান-জোড়ার সংখ্যা। মোট খরচ ন্যূনতম করো।',
  ),
  input: L('n and k, then the array.', 'n আর k, তারপর অ্যারে।'),
  output: L('The minimum total cost.', 'ন্যূনতম মোট খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, 2 ≤ k ≤ min(n, 20), 1 ≤ aᵢ ≤ n', '২ ≤ n ≤ ১০⁵, ২ ≤ k ≤ min(n, ২০), ১ ≤ aᵢ ≤ n')] },
  samples: [
    { input: '7 3\n1 1 3 3 3 2 1', output: '1', explain: L('Split [1] [1 3] [3 3 2 1]: only the two 3s in the last part form an equal pair.', 'ভাগ [১] [১ ৩] [৩ ৩ ২ ১]: শেষ অংশের দুটি ৩-ই একমাত্র সমান জোড়া।') },
    { input: '10 2\n1 2 1 2 1 2 1 2 1 2', output: '8', explain: L('Cut in the middle: [1 2 1 2 1] has 3 + 1 = 4 pairs and [2 1 2 1 2] has 3 + 1 = 4, total 8.', 'মাঝখানে কাটো: [১ ২ ১ ২ ১]-এ ৩ + ১ = ৪ জোড়া আর [২ ১ ২ ১ ২]-এ ৩ + ১ = ৪, মোট ৮।') },
  ],
  observation: L(
    'Let cost(l, r) be the number of equal pairs in a[l..r]. The recurrence dp[g][i] = min over j < i of dp[g − 1][j] + cost(j + 1, i) has the same quadrangle inequality as before, so the optimal j is monotone and divide and conquer applies. A segment’s cost changes by cnt[x] when an element x is added or removed, so a Mo-style pair of pointers keeps cost() cheap.',
    'cost(l, r) = a[l..r]-তে সমান জোড়ার সংখ্যা ধরো। পুনরাবৃত্তি dp[g][i] = j < i-এর ওপর dp[g − ১][j] + cost(j + ১, i)-র ন্যূনতম আগের মতোই চতুর্ভুজ-অসমতা মানে, তাই সেরা j মনোটোন আর ডিভাইড অ্যান্ড কনকার চলে। উপাদান x যোগ বা বাদ দিলে খরচ cnt[x] বদলায়, তাই Mo-ধাঁচের দুই পয়েন্টার cost() সস্তা রাখে।',
  ),
  approach: [
    L('Maintain cl, cr, cur and cnt[]; cost(l, r) moves the pointers to (l, r), expanding before shrinking.', 'cl, cr, cur আর cnt[] রাখো; cost(l, r) পয়েন্টার (l, r)-এ সরায়, আগে বাড়িয়ে তারপর কমিয়ে।'),
    L('Layer 1: dp[i] = cost(1, i). Next layers use the same compute(l, r, optl, optr) recursion as 321E.', 'স্তর ১: dp[i] = cost(১, i)। পরের স্তরে ৩২১E-র মতোই compute(l, r, optl, optr) রিকার্সন।'),
    L('Print dp[n] after k layers.', 'k স্তর পর dp[n] প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'array 1 1 3 3 3 2 1, k = 3, cut [1] [1 3] [3 3 2 1]',
    steps: [
      { state: 'cost(1, 1) = 0 and cost(2, 3) = 0', text: L('A single element and the pair 1, 3 have no equal values.', 'একক উপাদান আর জোড়া ১, ৩-তে সমান মান নেই।') },
      { state: 'cost(4, 7) = 1', text: L('In 3 3 2 1 the two 3s are the only equal pair. Total 0 + 0 + 1 = 1.', '৩ ৩ ২ ১-এ দুটি ৩-ই একমাত্র সমান জোড়া। মোট ০ + ০ + ১ = ১।') },
    ],
  },
  complexity: { time: 'O(k n log n)', space: 'O(n)', why: L('Each layer’s recursion has log n levels and the pointers move O(n) per level.', 'প্রতি স্তরের রিকার্সনে log n স্তর, প্রতি স্তরে পয়েন্টার O(n) সরে।') },
  solutions: [
    {
      id: 'dc',
      kind: 'optimal',
      title: L('Divide and conquer optimisation with moving pointers', 'চলমান পয়েন্টারসহ ডিভাইড অ্যান্ড কনকার অপটিমাইজেশন'),
      idea: L('The recursion is monotone in both l and opt, so the pointers move little.', 'রিকার্সন l আর opt দুটিতেই মনোটোন, তাই পয়েন্টার অল্প সরে।'),
      explain: [L('Always evaluate the middle state’s candidates in increasing j so cost(j + 1, m) moves cl rightwards.', 'মাঝের অবস্থার প্রার্থীদের j-র ঊর্ধ্বক্রমে মূল্যায়ন করো যাতে cost(j + ১, m)-এ cl ডানে সরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, K, a[100005];
int cnt[100005];
int cl = 1, cr = 0;
ll cur = 0;
ll dpPrev[100005], dpCur[100005];

ll cost(int l, int r) {
    while (cl > l) cl--, cur += cnt[a[cl]]++;
    while (cr < r) cr++, cur += cnt[a[cr]]++;
    while (cl < l) cur -= --cnt[a[cl]], cl++;
    while (cr > r) cur -= --cnt[a[cr]], cr--;
    return cur;
}

void compute(int l, int r, int optl, int optr) {
    if (l > r) return;
    int m = (l + r) / 2, bo = optl;
    ll best = LLONG_MAX;
    for (int j = optl; j <= min(m - 1, optr); j++) {
        ll v = dpPrev[j] + cost(j + 1, m);
        if (v < best) best = v, bo = j;
    }
    dpCur[m] = best;
    compute(l, m - 1, optl, bo);
    compute(m + 1, r, bo, optr);
}

int main() {
    scanf("%d %d", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    for (int i = 1; i <= n; i++) dpPrev[i] = cost(1, i);
    for (int g = 2; g <= K; g++) {
        compute(g, n, g - 1, n - 1);
        for (int i = g; i <= n; i++) dpPrev[i] = dpCur[i];
    }
    printf("%lld\n", dpPrev[n]);
    return 0;
}
`,
      time: 'O(k n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Precompute every segment cost, then O(k n²) DP', 'প্রতিটি সেগমেন্টের খরচ আগে বের করে O(k n²) DP'),
      idea: L('A table cost[l][r] by direct counting, and the plain recurrence.', 'সরাসরি গুনে cost[l][r] টেবিল আর সাধারণ পুনরাবৃত্তি।'),
      explain: [L('Independent of any pointer or monotonicity logic.', 'কোনো পয়েন্টার বা মনোটোনিসিটি যুক্তির ওপর নির্ভর করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, K;
    scanf("%d %d", &n, &K);
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    vector<vector<ll>> c(n + 2, vector<ll>(n + 2, 0));
    for (int l = 1; l <= n; l++)
        for (int r = l; r <= n; r++) {
            ll s = 0;
            for (int x = l; x <= r; x++)
                for (int y = x + 1; y <= r; y++) s += a[x] == a[y];
            c[l][r] = s;
        }
    const ll INF = 1e18;
    vector<ll> dp(n + 1, INF);
    for (int i = 1; i <= n; i++) dp[i] = c[1][i];
    for (int g = 2; g <= K; g++) {
        vector<ll> nd(n + 1, INF);
        for (int i = g; i <= n; i++)
            for (int j = g - 1; j < i; j++) nd[i] = min(nd[i], dp[j] + c[j + 1][i]);
        dp = nd;
    }
    printf("%lld\n", dp[n]);
    return 0;
}
`,
      time: 'O(n³ + k n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['vector', 'long-long'],
    },
  ],
  tests: [
    { input: '7 3\n1 1 3 3 3 2 1', output: '1', source: 'sample', note: sample(1) },
    { input: '10 2\n1 2 1 2 1 2 1 2 1 2', output: '8', source: 'sample', note: sample(2) },
    { input: '2 2\n5 5', output: '0', source: 'own', note: L('Each element alone: no equal pairs.', 'প্রতিটি উপাদান একা: সমান জোড়া নেই।') },
  ],
  pitfalls: [
    L('Moving the pointers in the wrong order: shrinking before expanding can make the range empty and the counts negative. Expand first.', 'ভুল ক্রমে পয়েন্টার সরানো: বাড়ানোর আগে কমালে পরিসর ফাঁকা হয়ে গণনা ঋণাত্মক হতে পারে। আগে বাড়াও।'),
    L('Counting pairs with a ×2: cur += cnt[x] before incrementing counts each new pair once.', 'জোড়া ×২ করে গোনা: গণনা বাড়ানোর আগে cur += cnt[x] প্রতিটি নতুন জোড়া একবার যোগ করে।'),
    L('Using int for the answer: it reaches about n² / 2 = 5·10⁹.', 'উত্তরের জন্য int: এটি প্রায় n² / ২ = ৫·১০⁹ ছোঁয়।'),
  ],
  related: [
    { id: '321E', name: 'Ciel and Gondolas', why: L('The same recursion with an O(1) table cost.', 'একই রিকার্সন, O(১) টেবিল-খরচসহ।') },
    { id: '833B', name: 'The Bakery', why: L('The same layers with a distinct-count cost.', 'একই স্তর, ভিন্ন-গণনার খরচসহ।') },
  ],
  toolkit: ['long-long'],
};

// ───────────────────────────────────────────── 833B
export const p833B: ProblemEntry = {
  id: '833B',
  contestId: 833,
  index: 'B',
  name: 'The Bakery',
  rating: 2200,
  tags: ['data-structures', 'divide-and-conquer', 'dp'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'The value of a box is its number of distinct cake types, and the best partition into k boxes is a layered DP. The same DP can be driven by a lazy segment tree or by divide and conquer with a moving window — two answers to “how do I add one element to every candidate at once?”.',
    'বাক্সের মান তার ভিন্ন কেকের ধরনের সংখ্যা, আর k বাক্সে সেরা ভাগ একটি স্তরভিত্তিক DP। একই DP লেজি সেগমেন্ট ট্রি বা চলমান জানালাসহ ডিভাইড অ্যান্ড কনকার দিয়ে চলে — “সব প্রার্থীতে এক উপাদান একসঙ্গে যোগ করব কীভাবে?” প্রশ্নের দুই উত্তর।',
  ),
  statement: L(
    'A row of n cakes, each of a type aᵢ, is divided into exactly k non-empty consecutive boxes. The value of a box is the number of distinct types in it; the total is the sum over boxes. Maximise the total.',
    'n টি কেকের সারি, প্রতিটির ধরন aᵢ, ঠিক k টি অশূন্য ধারাবাহিক বাক্সে ভাগ করা হয়। বাক্সের মান তার ভিন্ন ধরনের সংখ্যা; মোট মান হলো বাক্সগুলোর যোগফল। মোট সর্বোচ্চ করো।',
  ),
  input: L('n and k, then the n types.', 'n আর k, তারপর n টি ধরন।'),
  output: L('The maximum total value.', 'সর্বোচ্চ মোট মান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 35 000, 1 ≤ k ≤ min(n, 50), 1 ≤ aᵢ ≤ n', '১ ≤ n ≤ ৩৫ ০০০, ১ ≤ k ≤ min(n, ৫০), ১ ≤ aᵢ ≤ n')] },
  samples: [
    { input: '4 1\n1 2 2 1', output: '2', explain: L('One box with two distinct types.', 'দুটি ভিন্ন ধরনের এক বাক্স।') },
    { input: '7 2\n1 3 3 1 4 4 4', output: '5', explain: L('Cut [1 3] [3 1 4 4 4]: 2 distinct types plus 3 distinct types (3, 1, 4) = 5. The cut [1 3 3 1] [4 4 4] gives only 2 + 1 = 3.', 'কাট [১ ৩] [৩ ১ ৪ ৪ ৪]: ২টি ভিন্ন ধরন আর ৩টি ভিন্ন ধরন (৩, ১, ৪) = ৫। কাট [১ ৩ ৩ ১] [৪ ৪ ৪] দেয় মাত্র ২ + ১ = ৩।') },
    { input: '8 3\n7 7 8 7 7 8 1 7', output: '6', explain: L('For instance [7 7 8] [7 7 8] [1 7] gives 2 + 2 + 2.', 'যেমন [৭ ৭ ৮] [৭ ৭ ৮] [১ ৭] দিলে ২ + ২ + ২।') },
  ],
  observation: L(
    'Let dp[g][i] be the best value of the first i cakes in g boxes. Moving from i − 1 to i, the distinct count of the box (j, i] grows by 1 exactly for the starts j ≥ prev(i), where prev(i) is the previous index with the same type. So the whole row of candidates dp[g − 1][j] + distinct(j + 1, i) is updated by one range add.',
    'dp[g][i] = প্রথম i কেক g বাক্সে সেরা মান ধরো। i − ১ থেকে i-তে গেলে বাক্স (j, i]-এর ভিন্ন সংখ্যা ঠিক সেইসব শুরু j ≥ prev(i)-র জন্য ১ বাড়ে, যেখানে prev(i) একই ধরনের আগের সূচক। তাই প্রার্থীদের পুরো সারি dp[g − ১][j] + ভিন্ন(j + ১, i) এক রেঞ্জ-অ্যাডে হালনাগাদ হয়।',
  ),
  approach: [
    L('For each layer g, load the segment tree with the leaves dp[g − 1][j] (j = 0 … n − 1).', 'প্রতিটি স্তর g-তে সেগমেন্ট ট্রি-তে পাতা dp[g − ১][j] (j = ০ … n − ১) ভরো।'),
    L('For i = 1 … n add +1 to the range [prev(i), i − 1], then dp[g][i] = the maximum of the leaves in [0, i − 1].', 'i = ১ … n-এ রেঞ্জ [prev(i), i − ১]-এ +১ যোগ করো, তারপর dp[g][i] = [০, i − ১]-র পাতাগুলোর সর্বোচ্চ।'),
    L('Print dp[k][n].', 'dp[k][n] প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'types 1 3 3 1, layer 1',
    steps: [
      { state: 'i = 1: add on [0, 0]', text: L('dp[1][1] = 1.', 'dp[১][১] = ১।') },
      { state: 'i = 2: add on [0, 1]', text: L('dp[1][2] = 2 (types 1 and 3).', 'dp[১][২] = ২ (ধরন ১ আর ৩)।') },
      { state: 'i = 3: prev = 2, add on [2, 2]', text: L('Only the box starting at 3 gets a new type: dp[1][3] stays 2.', 'শুধু ৩-এ শুরু হওয়া বাক্স নতুন ধরন পায়: dp[১][৩] ২ থাকে।') },
    ],
  },
  complexity: { time: 'O(k n log n)', space: 'O(n)', why: L('n range adds and n range maxima per layer, each O(log n).', 'প্রতি স্তরে n রেঞ্জ-অ্যাড আর n রেঞ্জ-ম্যাক্স, প্রতিটি O(log n)।') },
  solutions: [
    {
      id: 'seg',
      kind: 'optimal',
      title: L('Lazy segment tree per layer', 'প্রতি স্তরে লেজি সেগমেন্ট ট্রি'),
      idea: L('Range add +1 and prefix maximum, rebuilt per layer from the previous layer.', 'রেঞ্জ-অ্যাড +১ আর প্রিফিক্স সর্বোচ্চ, আগের স্তর থেকে প্রতি স্তরে নতুন করে।'),
      explain: [L('Invalid states carry a large negative value so they never win. The tree is rebuilt from scratch per layer in O(n).', 'অবৈধ অবস্থা বড় ঋণাত্মক মান পায় যাতে কখনও না জেতে। ট্রি প্রতি স্তরে O(n)-এ নতুন করে বানানো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int NEG = -1e9;
int n, K, a[35005], prv[35005];
int mx[4 * 35005], lz[4 * 35005];
int base[35005];

void build(int o, int l, int r) {
    lz[o] = 0;
    if (l == r) { mx[o] = base[l]; return; }
    int m = (l + r) / 2;
    build(2 * o, l, m), build(2 * o + 1, m + 1, r);
    mx[o] = max(mx[2 * o], mx[2 * o + 1]);
}

void add(int o, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { mx[o]++, lz[o]++; return; }
    int m = (l + r) / 2;
    add(2 * o, l, m, ql, qr), add(2 * o + 1, m + 1, r, ql, qr);
    mx[o] = max(mx[2 * o], mx[2 * o + 1]) + lz[o];
}

int query(int o, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return INT_MIN;
    if (ql <= l && r <= qr) return mx[o];
    int m = (l + r) / 2;
    return max(query(2 * o, l, m, ql, qr), query(2 * o + 1, m + 1, r, ql, qr)) + lz[o];
}

int main() {
    scanf("%d %d", &n, &K);
    vector<int> last(n + 2, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    map<int, int> pos;
    for (int i = 1; i <= n; i++) prv[i] = pos.count(a[i]) ? pos[a[i]] : 0, pos[a[i]] = i;
    vector<int> dp(n + 1, NEG), nd(n + 1, NEG);
    dp[0] = 0;
    for (int g = 1; g <= K; g++) {
        for (int j = 0; j < n; j++) base[j] = dp[j];
        build(1, 0, n - 1);
        fill(nd.begin(), nd.end(), NEG);
        for (int i = 1; i <= n; i++) {
            add(1, 0, n - 1, prv[i], i - 1);
            nd[i] = max(NEG, query(1, 0, n - 1, 0, i - 1));
        }
        dp = nd;
    }
    printf("%d\n", dp[n]);
    return 0;
}
`,
      time: 'O(k n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'map', 'functions'],
    },
    {
      id: 'dc',
      kind: 'method',
      title: L('Divide and conquer optimisation with a distinct counter', 'ভিন্ন-গণনাকারীসহ ডিভাইড অ্যান্ড কনকার অপটিমাইজেশন'),
      idea: L('The optimal split is monotone; a moving window gives distinct(l, r).', 'সেরা ভাগ মনোটোন; চলমান জানালা distinct(l, r) দেয়।'),
      explain: [L('The same compute(l, r, optl, optr) as in 321E and 868F. The cost is “number of types with cnt > 0”, so the moves are O(1) each. For maximisation the monotonicity of the optimum holds just as for minimisation.', '৩২১E আর ৮৬৮F-র মতো একই compute(l, r, optl, optr)। খরচ “cnt > ০ ধরনের সংখ্যা”, তাই প্রতিটি সরানো O(১)। সর্বোচ্চকরণেও সেরা ভাগের মনোটোনিসিটি ন্যূনতমকরণের মতোই খাটে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, K, a[35005];
int cnt[35005], cl = 1, cr = 0, cur = 0;
int dpPrev[35005], dpCur[35005];
const int NEG = -1e9;

int cost(int l, int r) {
    while (cl > l) cl--, cur += cnt[a[cl]]++ == 0;
    while (cr < r) cr++, cur += cnt[a[cr]]++ == 0;
    while (cl < l) cur -= --cnt[a[cl]] == 0, cl++;
    while (cr > r) cur -= --cnt[a[cr]] == 0, cr--;
    return cur;
}

void compute(int l, int r, int optl, int optr) {
    if (l > r) return;
    int m = (l + r) / 2, best = NEG, bo = optl;
    for (int j = optl; j <= min(m - 1, optr); j++) {
        int v = dpPrev[j] + cost(j + 1, m);
        if (v > best) best = v, bo = j;
    }
    dpCur[m] = best;
    compute(l, m - 1, optl, bo);
    compute(m + 1, r, bo, optr);
}

int main() {
    scanf("%d %d", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    for (int i = 1; i <= n; i++) dpPrev[i] = cost(1, i);
    for (int g = 2; g <= K; g++) {
        compute(g, n, g - 1, n - 1);
        for (int i = g; i <= n; i++) dpPrev[i] = dpCur[i];
    }
    printf("%d\n", dpPrev[n]);
    return 0;
}
`,
      time: 'O(k n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Plain O(k n²) DP with direct distinct counts', 'সরাসরি ভিন্ন-গণনাসহ সাধারণ O(k n²) DP'),
      idea: L('Compute distinct(l, r) by a set and try every split.', 'সেট দিয়ে distinct(l, r) বের করে প্রতিটি ভাগ চেষ্টা।'),
      explain: [L('The recurrence straight from the statement, for stress testing.', 'প্রবলেম-বিবরণ থেকে সরাসরি পুনরাবৃত্তি, স্ট্রেস টেস্টের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, K;
    scanf("%d %d", &n, &K);
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    vector<vector<int>> d(n + 2, vector<int>(n + 2, 0));
    for (int l = 1; l <= n; l++) {
        set<int> s;
        for (int r = l; r <= n; r++) s.insert(a[r]), d[l][r] = s.size();
    }
    const int NEG = -1e9;
    vector<int> dp(n + 1, NEG);
    for (int i = 1; i <= n; i++) dp[i] = d[1][i];
    for (int g = 2; g <= K; g++) {
        vector<int> nd(n + 1, NEG);
        for (int i = g; i <= n; i++)
            for (int j = g - 1; j < i; j++) nd[i] = max(nd[i], dp[j] + d[j + 1][i]);
        dp = nd;
    }
    printf("%d\n", dp[n]);
    return 0;
}
`,
      time: 'O(k n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['set', 'vector'],
    },
  ],
  tests: [
    { input: '4 1\n1 2 2 1', output: '2', source: 'sample', note: sample(1) },
    { input: '7 2\n1 3 3 1 4 4 4', output: '5', source: 'sample', note: sample(2) },
    { input: '8 3\n7 7 8 7 7 8 1 7', output: '6', source: 'sample', note: sample(3) },
    { input: '3 3\n1 1 1', output: '3', source: 'own', note: L('Every cake in its own box: three boxes of one type.', 'প্রতিটি কেক নিজের বাক্সে: এক ধরনের তিন বাক্স।') },
  ],
  pitfalls: [
    L('Letting a box be empty: dp[g][i] for i < g must stay at minus infinity.', 'বাক্স ফাঁকা রাখা: i < g-র dp[g][i] ঋণাত্মক অসীম থাকতে হবে।'),
    L('Adding +1 to the whole prefix instead of only to starts j ≥ prev(i): the segment (j, i] already contained that type for j < prev(i).', 'শুধু শুরু j ≥ prev(i)-র বদলে পুরো প্রিফিক্সে +১: j < prev(i)-র জন্য (j, i]-তে ওই ধরন আগে থেকেই আছে।'),
    L('Allowing the segment tree range to include i itself: the box (i, i] is empty, so query only [0, i − 1].', 'সেগমেন্ট ট্রি রেঞ্জে i নিজেকে রাখা: বাক্স (i, i] ফাঁকা, তাই শুধু [০, i − ১] কোয়েরি।'),
  ],
  related: [
    { id: '868F', name: 'Yet Another Minimization Problem', why: L('The same layers with a pairs-counting cost.', 'একই স্তর, জোড়া-গণনার খরচসহ।') },
    { id: '1527E', name: 'Partition Array into Segments', why: L('Layered DP where a range add also updates all candidates.', 'স্তরভিত্তিক DP যেখানে রেঞ্জ-অ্যাডও সব প্রার্থী হালনাগাদ করে।') },
  ],
  toolkit: ['vector', 'map'],
};

// ───────────────────────────────────────────── 1527E
export const p1527E: ProblemEntry = {
  id: '1527E',
  contestId: 1527,
  index: 'E',
  name: 'Partition Array Into Segments',
  rating: 2600,
  tags: ['data-structures', 'divide-and-conquer', 'dp'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'The cost is a sum of gaps between consecutive equal values. Adding an element only changes the cost of segments that already contain its previous copy — a clean prefix range add — so the layered DP is a lazy segment tree away.',
    'খরচ হলো সমান মানের পরপর অবস্থানের ফাঁকের যোগফল। উপাদান যোগে শুধু সেই সেগমেন্টগুলোর খরচ বদলায় যাতে তার আগের কপি আছে — একটি পরিষ্কার প্রিফিক্স রেঞ্জ-অ্যাড — তাই স্তরভিত্তিক DP একটি লেজি সেগমেন্ট ট্রি-এর দূরত্বে।',
  ),
  statement: L(
    'The cost of an array is the sum, over its distinct values x, of (last position of x − first position of x). Split an array of n integers into exactly k non-empty consecutive segments to minimise the total cost.',
    'অ্যারের খরচ = তার প্রতিটি ভিন্ন মান x-এর (x-এর শেষ অবস্থান − প্রথম অবস্থান)-এর যোগফল। n টি পূর্ণসংখ্যার অ্যারেকে ঠিক k টি অশূন্য ধারাবাহিক সেগমেন্টে ভাগ করে মোট খরচ ন্যূনতম করো।',
  ),
  input: L('n and k, then the array.', 'n আর k, তারপর অ্যারে।'),
  output: L('The minimum total cost.', 'ন্যূনতম মোট খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ k ≤ min(n, 100), 1 ≤ n ≤ 35 000, 1 ≤ aᵢ ≤ n', '১ ≤ k ≤ min(n, ১০০), ১ ≤ n ≤ ৩৫ ০০০, ১ ≤ aᵢ ≤ n')] },
  samples: [
    { input: '7 2\n1 6 6 4 6 6 6', output: '3', explain: L('Split [1 6 6 4] and [6 6 6]: the 6s in the first part are 1 apart and in the second 2 apart, 1 + 2 = 3.', 'ভাগ [১ ৬ ৬ ৪] আর [৬ ৬ ৬]: প্রথম অংশে ৬-গুলো ১ দূরে আর দ্বিতীয়তে ২ দূরে, ১ + ২ = ৩।') },
    { input: '7 4\n5 5 5 5 2 3 3', output: '1', explain: L('Cut [5] [5] [5] [5 2 3 3]: the only cost is the two 3s, 1 apart, total 1.', 'কাট [৫] [৫] [৫] [৫ ২ ৩ ৩]: একমাত্র খরচ দুটি ৩ (১ দূরে), মোট ১।') },
  ],
  observation: L(
    'Consider dp[g][i] = min over j < i of dp[g − 1][j] + cost(j + 1, i). When element i with previous occurrence p = prev(i) joins the segment (j, i − 1], its cost grows by i − p exactly when p lies inside the segment, i.e. j + 1 ≤ p. So for all j ≤ p − 1 the candidate increases by i − p; the others stay the same.',
    'dp[g][i] = j < i-এর ওপর dp[g − ১][j] + cost(j + ১, i)-র ন্যূনতম ধরো। আগের কপি p = prev(i)-সহ উপাদান i সেগমেন্ট (j, i − ১]-এ যোগ দিলে খরচ ঠিক তখন i − p বাড়ে যখন p সেগমেন্টের ভেতরে, অর্থাৎ j + ১ ≤ p। তাই সব j ≤ p − ১-এর প্রার্থী i − p বাড়ে; বাকিরা একই থাকে।',
  ),
  approach: [
    L('Per layer, build the tree from dp[g − 1][0 … n − 1] (long long, infinity for invalid).', 'প্রতি স্তরে dp[g − ১][০ … n − ১] (long long, অবৈধে অসীম) থেকে ট্রি বানাও।'),
    L('For i = 1 … n, if prev(i) > 0 add (i − prev(i)) on [0, prev(i) − 1]; then dp[g][i] = the minimum over [0, i − 1].', 'i = ১ … n-এ prev(i) > ০ হলে [০, prev(i) − ১]-এ (i − prev(i)) যোগ করো; তারপর dp[g][i] = [০, i − ১]-এর ন্যূনতম।'),
    L('Output dp[k][n].', 'dp[k][n] প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'array 5 5 5, one layer',
    steps: [
      { state: 'i = 1: prev = 0', text: L('dp[1] = 0.', 'dp[১] = ০।') },
      { state: 'i = 2: prev = 1, add 1 on [0, 0]', text: L('The only start j = 0: cost 1.', 'একমাত্র শুরু j = ০: খরচ ১।') },
      { state: 'i = 3: prev = 2, add 1 on [0, 1]', text: L('Starts 0 and 1 now cost 2 and 1 respectively.', 'শুরু ০ আর ১ এখন যথাক্রমে ২ আর ১।') },
    ],
  },
  complexity: { time: 'O(k n log n)', space: 'O(n)', why: L('n range adds and queries per layer.', 'প্রতি স্তরে n রেঞ্জ-অ্যাড ও কোয়েরি।') },
  solutions: [
    {
      id: 'seg',
      kind: 'optimal',
      title: L('Lazy segment tree (range add, range min)', 'লেজি সেগমেন্ট ট্রি (রেঞ্জ-অ্যাড, রেঞ্জ-মিন)'),
      idea: L('One range add and one range minimum per element and layer.', 'প্রতি উপাদান ও স্তরে একটি রেঞ্জ-অ্যাড আর একটি রেঞ্জ-মিন।'),
      explain: [L('Use long long: the true cost can reach about n² / 2, and infinity must survive additions.', 'long long ব্যবহার করো: আসল খরচ প্রায় n² / ২ ছুঁতে পারে, আর অসীমকে যোগের পরেও টিকতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

const ll INF = 4e18 / 4;
int n, K, a[35005], prv[35005];
ll mn[4 * 35005], lz[4 * 35005], base[35005];

void build(int o, int l, int r) {
    lz[o] = 0;
    if (l == r) { mn[o] = base[l]; return; }
    int m = (l + r) / 2;
    build(2 * o, l, m), build(2 * o + 1, m + 1, r);
    mn[o] = min(mn[2 * o], mn[2 * o + 1]);
}

void add(int o, int l, int r, int ql, int qr, ll v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { mn[o] += v, lz[o] += v; return; }
    int m = (l + r) / 2;
    add(2 * o, l, m, ql, qr, v), add(2 * o + 1, m + 1, r, ql, qr, v);
    mn[o] = min(mn[2 * o], mn[2 * o + 1]) + lz[o];
}

ll query(int o, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return LLONG_MAX / 2;
    if (ql <= l && r <= qr) return mn[o];
    int m = (l + r) / 2;
    return min(query(2 * o, l, m, ql, qr), query(2 * o + 1, m + 1, r, ql, qr)) + lz[o];
}

int main() {
    scanf("%d %d", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    map<int, int> pos;
    for (int i = 1; i <= n; i++) prv[i] = pos.count(a[i]) ? pos[a[i]] : 0, pos[a[i]] = i;
    vector<ll> dp(n + 1, INF), nd(n + 1, INF);
    dp[0] = 0;
    for (int g = 1; g <= K; g++) {
        for (int j = 0; j < n; j++) base[j] = dp[j];
        build(1, 0, n - 1);
        fill(nd.begin(), nd.end(), INF);
        for (int i = 1; i <= n; i++) {
            if (prv[i] > 0) add(1, 0, n - 1, 0, prv[i] - 1, i - prv[i]);
            nd[i] = min(INF, query(1, 0, n - 1, 0, i - 1));
        }
        dp = nd;
    }
    printf("%lld\n", dp[n]);
    return 0;
}
`,
      time: 'O(k n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'map', 'long-long'],
    },
    {
      id: 'dc',
      kind: 'method',
      title: L('Divide and conquer optimisation with a moving window', 'চলমান জানালাসহ ডিভাইড অ্যান্ড কনকার অপটিমাইজেশন'),
      idea: L('The optimal split is monotone; the window cost changes by the gap to the neighbouring equal element.', 'সেরা ভাগ মনোটোন; জানালার খরচ পাশের সমান উপাদানের ফাঁকে বদলায়।'),
      explain: [L('Adding a[r + 1] adds r + 1 − prev if prev ≥ l; removing it subtracts the same. Adding on the left uses the next occurrence instead. Everything else is identical to 321E.', 'a[r + ১] যোগে prev ≥ l হলে r + ১ − prev যোগ হয়; বাদ দিলে একই বিয়োগ। বামে যোগ করলে পরের কপি ব্যবহার হয়। বাকি সব ৩২১E-র মতো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, K, a[35005], prv[35005], nxt[35005];
int cl = 1, cr = 0;
ll cur = 0;
ll dpPrev[35005], dpCur[35005];

ll cost(int l, int r) {
    while (cl > l) {
        cl--;
        if (nxt[cl] <= cr && nxt[cl] > 0) cur += nxt[cl] - cl;
    }
    while (cr < r) {
        cr++;
        if (prv[cr] >= cl) cur += cr - prv[cr];
    }
    while (cl < l) {
        if (nxt[cl] <= cr && nxt[cl] > 0) cur -= nxt[cl] - cl;
        cl++;
    }
    while (cr > r) {
        if (prv[cr] >= cl) cur -= cr - prv[cr];
        cr--;
    }
    return cur;
}

void compute(int l, int r, int optl, int optr) {
    if (l > r) return;
    int m = (l + r) / 2, bo = optl;
    ll best = LLONG_MAX;
    for (int j = optl; j <= min(m - 1, optr); j++) {
        ll v = dpPrev[j] + cost(j + 1, m);
        if (v < best) best = v, bo = j;
    }
    dpCur[m] = best;
    compute(l, m - 1, optl, bo);
    compute(m + 1, r, bo, optr);
}

int main() {
    scanf("%d %d", &n, &K);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    map<int, int> pos;
    for (int i = 1; i <= n; i++) prv[i] = pos.count(a[i]) ? pos[a[i]] : 0, pos[a[i]] = i;
    pos.clear();
    for (int i = n; i >= 1; i--) nxt[i] = pos.count(a[i]) ? pos[a[i]] : 0, pos[a[i]] = i;
    for (int i = 1; i <= n; i++) dpPrev[i] = cost(1, i);
    for (int g = 2; g <= K; g++) {
        compute(g, n, g - 1, n - 1);
        for (int i = g; i <= n; i++) dpPrev[i] = dpCur[i];
    }
    printf("%lld\n", dpPrev[n]);
    return 0;
}
`,
      time: 'O(k n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Plain DP with directly computed costs', 'সরাসরি হিসাব করা খরচসহ সাধারণ DP'),
      idea: L('cost(l, r) from first and last positions, then the O(k n²) recurrence.', 'প্রথম ও শেষ অবস্থান থেকে cost(l, r), তারপর O(k n²) পুনরাবৃত্তি।'),
      explain: [L('Follows the statement’s definition of cost with first and last positions rather than neighbouring gaps.', 'প্রতিবেশী ফাঁকের বদলে প্রথম ও শেষ অবস্থানে প্রবলেম-বিবরণের খরচের সংজ্ঞা অনুসরণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, K;
    scanf("%d %d", &n, &K);
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    vector<vector<ll>> c(n + 2, vector<ll>(n + 2, 0));
    for (int l = 1; l <= n; l++)
        for (int r = l; r <= n; r++) {
            map<int, pair<int, int>> fl;
            for (int x = l; x <= r; x++) {
                if (!fl.count(a[x])) fl[a[x]] = {x, x};
                fl[a[x]].second = x;
            }
            ll s = 0;
            for (auto& kv : fl) s += kv.second.second - kv.second.first;
            c[l][r] = s;
        }
    const ll INF = 1e18;
    vector<ll> dp(n + 1, INF);
    for (int i = 1; i <= n; i++) dp[i] = c[1][i];
    for (int g = 2; g <= K; g++) {
        vector<ll> nd(n + 1, INF);
        for (int i = g; i <= n; i++)
            for (int j = g - 1; j < i; j++) nd[i] = min(nd[i], dp[j] + c[j + 1][i]);
        dp = nd;
    }
    printf("%lld\n", dp[n]);
    return 0;
}
`,
      time: 'O(n³ log n + k n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['map', 'pair', 'long-long'],
    },
  ],
  tests: [
    { input: '7 2\n1 6 6 4 6 6 6', output: '3', source: 'sample', note: sample(1) },
    { input: '7 4\n5 5 5 5 2 3 3', output: '1', source: 'sample', note: sample(2) },
    { input: '1 1\n1', output: '0', source: 'own', note: L('A single element costs nothing.', 'একটিমাত্র উপাদানের খরচ নেই।') },
  ],
  pitfalls: [
    L('Adding the range update to [prev(i), i − 1] like in 833B: here the affected starts are j ≤ prev(i) − 1, the opposite side.', '৮৩৩B-র মতো [prev(i), i − ১]-এ আপডেট: এখানে প্রভাবিত শুরু j ≤ prev(i) − ১, উল্টো পাশ।'),
    L('Using int: the cost reaches about n² / 2 ≈ 6·10⁸ per segment and sums beyond 2³¹ when infinity is added on top.', 'int ব্যবহার: খরচ প্রতি সেগমেন্টে প্রায় n² / ২ ≈ ৬·১০⁸ ছোঁয় আর অসীম যোগ হলে ২³¹ ছাড়ায়।'),
    L('Starting from layer 0 without setting dp[0][0] = 0 and the rest to infinity.', 'স্তর ০ থেকে শুরুতে dp[০][০] = ০ আর বাকি অসীম না রাখা।'),
  ],
  related: [
    { id: '833B', name: 'The Bakery', why: L('The same layered DP with a suffix range add.', 'একই স্তরভিত্তিক DP, সাফিক্স রেঞ্জ-অ্যাডসহ।') },
    { id: '868F', name: 'Yet Another Minimization Problem', why: L('The same layers solved with divide and conquer optimisation.', 'ডিভাইড অ্যান্ড কনকার অপটিমাইজেশনে সমাধান করা একই স্তর।') },
  ],
  toolkit: ['map', 'long-long'],
};
