import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');

export const p312B: ProblemEntry = {
  id: '312B',
  contestId: 312,
  index: 'B',
  name: 'Archer',
  rating: 1300,
  tags: ['math', 'probabilities'],
  why: L('The first probability series most people meet: an infinite geometric sum with a one-line closed form.', 'প্রথম যে সম্ভাবনার ধারা বেশিরভাগ মানুষ দেখে: একটি অসীম জ্যামিতিক যোগফল, এক লাইনের সরাসরি সূত্রসহ।'),
  statement: L('SmallR and Zanoes shoot at a target in turns, SmallR first. SmallR hits with probability a/b, Zanoes with probability c/d. The first to hit wins. Find the probability that SmallR wins.', 'SmallR আর Zanoes পালা করে লক্ষ্যে গুলি করে, SmallR আগে। SmallR a/b সম্ভাবনায় লাগায়, Zanoes c/d সম্ভাবনায়। যে আগে লাগায় সে জেতে। SmallR জেতার সম্ভাবনা বের করুন।'),
  input: L('a b c d.', 'a b c d।'),
  output: L('The probability that SmallR wins.', 'SmallR জেতার সম্ভাবনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ a, b, c, d ≤ 1000, both probabilities strictly between 0 and 1', '১ ≤ a, b, c, d ≤ ১০০০, দুটি সম্ভাবনাই ০ আর ১-এর মাঝে'), realAnswer] },
  samples: [{ input: '1 2 1 2', output: '0.666666666667', explain: L('0.5 / (1 − 0.25) = 2/3.', '০.৫ / (১ − ০.২৫) = ২/৩।') }],
  observation: L('SmallR wins on his k-th shot when both missed k − 1 full rounds and he then hits: ((1−p)(1−q))ᵏ⁻¹ · p. Summing the geometric series gives p / (1 − (1−p)(1−q)).', 'SmallR তার k-তম গুলিতে জেতে যখন দুজনেই k − ১টি পূর্ণ রাউন্ডে মিস করে আর সে তারপর লাগায়: ((১−p)(১−q))ᵏ⁻¹ · p। জ্যামিতিক ধারা যোগ করলে p / (১ − (১−p)(১−q))।'),
  approach: [L('Compute p = a/b and q = c/d as doubles and apply the formula.', 'p = a/b আর q = c/d double হিসেবে বের করে সূত্র প্রয়োগ।')],
  walkthrough: {
    input: '1 2 1 2',
    steps: [
      { state: 'p = q = 0.5', text: L('Both miss a round with probability 0.25.', 'দুজনেই একটি রাউন্ড মিস করে ০.২৫ সম্ভাবনায়।') },
      { state: '0.5 + 0.125 + 0.03125 + …', text: L('Sum = 0.5 / 0.75 = 0.6667.', 'যোগফল = ০.৫ / ০.৭৫ = ০.৬৬৬৭।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A closed form.', 'একটি সরাসরি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Geometric series', 'জ্যামিতিক ধারা'),
      idea: L('Sum p · rᵏ over k with r = (1 − p)(1 − q).', 'r = (১ − p)(১ − q) নিয়ে k-এর ওপর p · rᵏ যোগ।'),
      explain: [L('Another way to see it: let W be SmallR’s winning probability. He hits now (p), or both miss and the game restarts: W = p + (1−p)(1−q) W. Solving gives the same formula; this “restart” equation is how most expected-value problems are solved.', 'আরেকভাবে দেখুন: W হলো SmallR-এর জয়ের সম্ভাবনা। সে এখনই লাগায় (p), অথবা দুজনেই মিস করে খেলা আবার শুরু: W = p + (১−p)(১−q) W। সমাধান একই সূত্র দেয়; এই “আবার শুরু” সমীকরণ দিয়েই বেশিরভাগ প্রত্যাশিত মানের প্রবলেম সমাধান হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    double a, b, c, d;
    cin >> a >> b >> c >> d;
    double p = a / b, q = c / d;
    // SmallR wins on his 1st, 2nd, ... shot; between shots both must miss.
    // p + (1-p)(1-q) p + ((1-p)(1-q))^2 p + ... = p / (1 - (1-p)(1-q))
    double bothMiss = (1 - p) * (1 - q);
    printf("%.12f\n", p / (1 - bothMiss));
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Add rounds until the rest is negligible', 'বাকিটা নগণ্য হওয়া পর্যন্ত রাউন্ড যোগ'),
      idea: L('Carry the probability that nobody has hit yet and add the chance he wins this round.', 'কেউ এখনো লাগায়নি তার সম্ভাবনা বয়ে নিয়ে এই রাউন্ডে তার জেতার সুযোগ যোগ।'),
      explain: [L('Because every round multiplies the remaining mass by at most 1 − 1/1000 · 1/1000 … in practice it shrinks quickly; stopping at 10⁻¹⁵ gives the same digits. This is how to check a formula you are not sure about.', 'প্রতিটি রাউন্ড বাকি ভরকে গুণ করে কমায়, তাই এটি দ্রুত ছোট হয়; ১০⁻¹⁵-এ থামলে একই অঙ্ক আসে। অনিশ্চিত সূত্র এভাবেই যাচাই করা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    double a, b, c, d;
    cin >> a >> b >> c >> d;
    double p = a / b, q = c / d;
    // Play round by round, carrying the probability that nobody has hit yet.
    double alive = 1, win = 0;
    for (int round = 0; round < 2000000 && alive > 1e-15; round++) {
        win += alive * p;          // SmallR hits now
        alive *= (1 - p) * (1 - q);  // both miss this round
    }
    printf("%.12f\n", win);
    return 0;
}
`,
      time: 'O(rounds)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '1 2 1 2', output: '0.666666666667', source: 'sample', note: sample(1) },
    { input: '1 1000 999 1000', output: '0.001000999999', source: 'own', note: L('A weak archer against a strong one.', 'দুর্বল তীরন্দাজ বনাম শক্তিশালী।') },
  ],
  pitfalls: [L('Integer division a / b gives 0. Convert to double first.', 'পূর্ণসংখ্যা ভাগ a / b ০ দেয়। আগে double-এ রূপান্তর করুন।'), L('Printing with the default 6 significant digits.', 'ডিফল্ট ৬টি তাৎপর্যপূর্ণ অঙ্কে ছাপানো।')],
  related: [
    { id: '1265E', name: 'Beautiful Mirrors', why: L('The same “restart” equation for an expectation.', 'প্রত্যাশার জন্য একই “আবার শুরু” সমীকরণ।') },
    { id: '453A', name: 'Little Pony and Expected Maximum', why: L('Next step in expected values.', 'প্রত্যাশিত মানের পরের ধাপ।') },
  ],
  toolkit: ['setprecision'],
};

export const p453A: ProblemEntry = {
  id: '453A',
  contestId: 453,
  index: 'A',
  name: 'Little Pony and Expected Maximum',
  rating: 1600,
  tags: ['probabilities'],
  why: L('The CDF trick: P(max ≤ k) is easy, so P(max = k) is a difference of two easy things.', 'CDF কৌশল: P(সর্বোচ্চ ≤ k) সহজ, তাই P(সর্বোচ্চ = k) দুটি সহজ জিনিসের বিয়োগফল।'),
  statement: L('A fair die has m faces numbered 1 … m. It is tossed n times. Find the expected value of the maximum number shown.', 'একটি নিরপেক্ষ ছক্কার m-টি তল, ১ … m নম্বর। এটি n-বার ছোড়া হয়। দেখানো সংখ্যাগুলোর সর্বোচ্চের প্রত্যাশিত মান বের করুন।'),
  input: L('m n.', 'm n।'),
  output: L('The expected maximum.', 'প্রত্যাশিত সর্বোচ্চ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ m, n ≤ 10⁵', '১ ≤ m, n ≤ ১০⁵'), realAnswer] },
  samples: [
    { input: '6 1', output: '3.500000000000', explain: L('One toss: the average face.', 'একবার ছোড়া: গড় তল।') },
    { input: '6 3', output: '4.958333333333', explain: L('Σ k · ((k/6)³ − ((k−1)/6)³).', 'Σ k · ((k/৬)³ − ((k−১)/৬)³)।') },
    { input: '2 2', output: '1.750000000000', explain: L('Max is 1 only for (1,1): 1·¼ + 2·¾.', 'সর্বোচ্চ ১ শুধু (১,১)-এ: ১·¼ + ২·¾।') },
  ],
  observation: L('All n tosses are ≤ k with probability (k/m)ⁿ. So P(max = k) = (k/m)ⁿ − ((k−1)/m)ⁿ, and the expectation is Σ k · P(max = k).', 'n-টি ছোড়াই ≤ k হয় (k/m)ⁿ সম্ভাবনায়। তাই P(সর্বোচ্চ = k) = (k/m)ⁿ − ((k−১)/m)ⁿ, আর প্রত্যাশা Σ k · P(সর্বোচ্চ = k)।'),
  approach: [L('Loop k = 1 … m, using pow on k/m (a number ≤ 1, so no overflow).', 'k = ১ … m লুপ, k/m-এ pow ব্যবহার (≤ ১ সংখ্যা, তাই ওভারফ্লো নেই)।')],
  walkthrough: {
    input: '2 2',
    steps: [
      { state: 'P(max ≤ 1) = 1/4', text: L('Both tosses show 1.', 'দুটি ছোড়াই ১।') },
      { state: 'P(max = 2) = 1 − 1/4', text: L('Everything else.', 'বাকি সব।') },
      { state: '1·0.25 + 2·0.75 = 1.75', text: L('Expected maximum.', 'প্রত্যাশিত সর্বোচ্চ।') },
    ],
  },
  complexity: { time: 'O(m log n)', space: 'O(1)', why: L('One pow per face.', 'প্রতি তলে একটি pow।') },
  solutions: [
    {
      id: 'cdf',
      kind: 'optimal',
      title: L('Difference of powers', 'ঘাতের বিয়োগফল'),
      idea: L('P(max = k) from P(max ≤ k).', 'P(সর্বোচ্চ ≤ k) থেকে P(সর্বোচ্চ = k)।'),
      explain: [L('Writing (k/m)ⁿ instead of kⁿ / mⁿ keeps every number between 0 and 1; computing kⁿ directly would overflow even a double for large n.', 'kⁿ / mⁿ-এর বদলে (k/m)ⁿ লিখলে প্রতিটি সংখ্যা ০ আর ১-এর মধ্যে থাকে; সরাসরি kⁿ হিসাব বড় n-এ double-কেও ওভারফ্লো করত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    double ans = 0;
    for (int k = 1; k <= m; k++) {
        // P(max = k) = P(all <= k) - P(all <= k-1)
        double pk = pow((double)k / m, n) - pow((double)(k - 1) / m, n);
        ans += k * pk;
    }
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'tail-sum',
      kind: 'method',
      title: L('Tail sum: E = Σ P(max ≥ k)', 'লেজ যোগফল: E = Σ P(সর্বোচ্চ ≥ k)'),
      idea: L('For a positive integer variable, E[X] = Σₖ P(X ≥ k) = m − Σₖ₌₁ᵐ⁻¹ (k/m)ⁿ.', 'ধনাত্মক পূর্ণসংখ্যা চলকের জন্য E[X] = Σₖ P(X ≥ k) = m − Σₖ₌₁ᵐ⁻¹ (k/m)ⁿ।'),
      explain: [L('X = Σₖ [X ≥ k] for X in 1 … m; taking expectations gives the tail-sum formula. It needs one power per k instead of two.', '১ … m-এর X-এর জন্য X = Σₖ [X ≥ k]; প্রত্যাশা নিলে লেজ-যোগফল সূত্র আসে। এতে প্রতি k-তে দুটির বদলে একটি ঘাত লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    // E[max] = sum over k >= 1 of P(max >= k) = m - sum_{k=1}^{m-1} P(max <= k)
    double ans = m;
    for (int k = 1; k < m; k++) ans -= pow((double)k / m, n);
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every sequence of tosses', 'ছোড়ার প্রতিটি ক্রম'),
      idea: L('Enumerate all mⁿ outcomes as base-m numbers.', 'সব mⁿ ফলাফল m-ভিত্তিক সংখ্যা হিসেবে তালিকা।'),
      explain: [L('Only for tiny m and n, but it averages the maximum literally.', 'শুধু ক্ষুদ্র m আর n-এর জন্য, কিন্তু আক্ষরিকভাবে সর্বোচ্চের গড় নেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    if (pow(m, n) > 3e6) { cout << "\n"; return 0; }
    // Enumerate every sequence of n tosses as a number in base m.
    long long total = 1;
    for (int i = 0; i < n; i++) total *= m;
    double sum = 0;
    for (long long code = 0; code < total; code++) {
        long long x = code;
        int best = 0;
        for (int i = 0; i < n; i++) { best = max(best, int(x % m) + 1); x /= m; }
        sum += best;
    }
    printf("%.12f\n", sum / total);
    return 0;
}
`,
      time: 'O(mⁿ · n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '6 1', output: '3.500000000000', source: 'sample', note: sample(1) },
    { input: '6 3', output: '4.958333333333', source: 'sample', note: sample(2) },
    { input: '2 2', output: '1.750000000000', source: 'sample', note: sample(3) },
    { input: '1 100000', output: '1', source: 'own', note: L('A one-faced die.', 'এক তলের ছক্কা।') },
  ],
  pitfalls: [L('Computing pow(k, n) / pow(m, n): both overflow to infinity.', 'pow(k, n) / pow(m, n) হিসাব: দুটিই অসীমে ওভারফ্লো।')],
  related: [
    { id: '312B', name: 'Archer', why: L('A first probability formula.', 'প্রথম সম্ভাবনা সূত্র।') },
    { id: '235B', name: "Let's Play Osu!", why: L('Linearity of expectation with a twist.', 'বাঁকসহ প্রত্যাশার রৈখিকতা।') },
  ],
  toolkit: ['setprecision'],
};

export const p280C: ProblemEntry = {
  id: '280C',
  contestId: 280,
  index: 'C',
  name: 'Game on Tree',
  rating: 2200,
  tags: ['implementation', 'math', 'probabilities', 'trees'],
  why: L('Linearity of expectation at its most magical: a hard-looking process collapses to Σ 1 / depth.', 'প্রত্যাশার রৈখিকতার সবচেয়ে জাদুকরী রূপ: কঠিন দেখতে একটি প্রক্রিয়া Σ ১ / গভীরতা-তে নেমে আসে।'),
  statement: L('A rooted tree (root 1) has n nodes. In each step a node is chosen uniformly among the remaining nodes and its whole subtree is removed. The game ends when the root is removed. Find the expected number of steps.', 'একটি মূলযুক্ত গাছে (মূল ১) n-টি নোড। প্রতি ধাপে বাকি নোডগুলোর মধ্যে সমভাবে একটি নোড বাছা হয় আর তার পুরো সাবট্রি সরানো হয়। মূল সরলে খেলা শেষ। প্রত্যাশিত ধাপের সংখ্যা বের করুন।'),
  input: L('n, then n − 1 edges.', 'n, তারপর n − ১টি প্রান্ত।'),
  output: L('The expected number of steps.', 'প্রত্যাশিত ধাপের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵'), realAnswer] },
  samples: [
    { input: '2\n1 2', output: '1.500000000000', explain: L('Pick the root first (½, one step) or node 2 first (½, two steps).', 'আগে মূল বাছা (½, এক ধাপ) বা আগে নোড ২ (½, দুই ধাপ)।') },
    { input: '3\n1 2\n1 3', output: '2.000000000000', explain: L('1 + ½ + ½.', '১ + ½ + ½।') },
  ],
  observation: L('The number of steps equals the number of nodes that get chosen. Node v is chosen exactly when it is picked before all of its ancestors. Think of the process as a random order of all nodes: among v and its depth(v) − 1 ancestors, each is equally likely to come first, so P(v chosen) = 1 / depth(v). Sum over v.', 'ধাপের সংখ্যা = যত নোড বাছা হয়। নোড v ঠিক তখন বাছা হয় যখন তার সব পূর্বপুরুষের আগে সেটি আসে। প্রক্রিয়াটিকে সব নোডের একটি এলোমেলো ক্রম ভাবুন: v আর তার depth(v) − ১টি পূর্বপুরুষের মধ্যে প্রত্যেকে আগে আসার সমান সম্ভাবনা, তাই P(v বাছা) = ১ / depth(v)। v-এর ওপর যোগ।'),
  approach: [L('BFS from the root to get depths (root depth 1).', 'মূল থেকে BFS করে গভীরতা (মূলের গভীরতা ১)।'), L('Add 1 / depth for every node.', 'প্রতিটি নোডের জন্য ১ / গভীরতা যোগ।')],
  walkthrough: {
    input: 'root 1 with children 2 and 3',
    steps: [
      { state: 'depth: 1, 2, 2', text: L('Node 1 is always chosen.', 'নোড ১ সবসময় বাছা হয়।') },
      { state: '1 + 1/2 + 1/2 = 2', text: L('Node 2 is chosen if it comes before node 1: probability ½.', 'নোড ২ বাছা হয় যদি নোড ১-এর আগে আসে: সম্ভাবনা ½।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'linearity',
      kind: 'optimal',
      title: L('Σ 1 / depth', 'Σ ১ / গভীরতা'),
      idea: L('Indicator per node: is it chosen?', 'প্রতি নোডে নির্দেশক: এটি কি বাছা হয়?'),
      explain: [
        L('Steps = Σᵥ [v chosen], and E of a sum is the sum of E, even though the indicators are dependent. That is the whole trick.', 'ধাপ = Σᵥ [v বাছা], আর যোগফলের E হলো E-গুলোর যোগফল, যদিও নির্দেশকগুলো নির্ভরশীল। এটুকুই পুরো কৌশল।'),
        L('Why a random order is valid: picking uniformly among remaining nodes is the same as walking a uniformly random permutation and skipping nodes already removed.', 'এলোমেলো ক্রম কেন বৈধ: বাকি নোডের মধ্যে সমভাবে বাছা মানে একটি সমভাবে এলোমেলো পারমুটেশন ধরে হাঁটা আর ইতিমধ্যে সরানো নোড বাদ দেওয়া।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> g(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b);
        g[b].push_back(a);
    }
    // Node v is chosen (not just removed) iff it comes first among its depth(v) ancestors-or-self.
    vector<int> depth(n + 1, 0);
    depth[1] = 1;
    queue<int> q;
    q.push(1);
    double ans = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        ans += 1.0 / depth[v];
        for (int u : g[v])
            if (!depth[u]) depth[u] = depth[v] + 1, q.push(u);
    }
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Exact expectation over subsets', 'উপসেটের ওপর নিখুঁত প্রত্যাশা'),
      idea: L('E(remaining set) = 1 + average of E(set after removing a subtree).', 'E(বাকি সেট) = ১ + সাবট্রি সরানোর পরের সেটের E-এর গড়।'),
      explain: [L('A memoised recursion over the set of remaining nodes, following the process literally. Exponential, but it confirms the surprising formula.', 'বাকি নোডের সেটের ওপর মেমোসহ পুনরাবৃত্তি, প্রক্রিয়া আক্ষরিকভাবে অনুসরণ করে। এক্সপোনেনশিয়াল, কিন্তু চমকপ্রদ সূত্রটি নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> g;
vector<int> par;

void root(int v, int p) {
    par[v] = p;
    for (int u : g[v]) if (u != p) root(u, v);
}

// Expected steps from the set of remaining nodes (bitmask), choosing uniformly.
map<int, double> memo;
double solve(int alive) {
    if (!alive) return 0;
    if (memo.count(alive)) return memo[alive];
    int cnt = __builtin_popcount(alive);
    double sum = 0;
    for (int v = 1; v <= n; v++) {
        if (!(alive >> v & 1)) continue;
        int next = alive;
        for (int u = 1; u <= n; u++) {  // remove v's whole subtree
            int x = u;
            while (x && x != v) x = par[x];
            if (x == v) next &= ~(1 << u);
        }
        sum += 1 + solve(next);
    }
    return memo[alive] = sum / cnt;
}

int main() {
    cin >> n;
    g.assign(n + 1, {});
    par.assign(n + 1, 0);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
    }
    if (n > 14) { cout << "\n"; return 0; }
    root(1, 0);
    int all = 0;
    for (int v = 1; v <= n; v++) all |= 1 << v;
    printf("%.12f\n", solve(all));
    return 0;
}
`,
      time: 'O(2ⁿ · n²)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['map', 'popcount'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: '1.500000000000', source: 'sample', note: sample(1) },
    { input: '3\n1 2\n1 3', output: '2.000000000000', source: 'sample', note: sample(2) },
    { input: '1', output: '1', source: 'own', note: L('Only the root.', 'শুধু মূল।') },
  ],
  pitfalls: [L('Recursive DFS on a path of 10⁵ nodes can overflow the stack; BFS avoids that.', '১০⁵ নোডের পথে পুনরাবৃত্ত DFS স্ট্যাক উপচে দিতে পারে; BFS তা এড়ায়।'), L('Counting depth from 0, which divides by zero at the root.', '০ থেকে গভীরতা গোনা, যাতে মূলে শূন্য দিয়ে ভাগ।')],
  related: [
    { id: '696B', name: 'Puzzles', why: L('Another tree expectation by linearity.', 'রৈখিকতায় আরেকটি গাছের প্রত্যাশা।') },
    { id: '235B', name: "Let's Play Osu!", why: L('Linearity of expectation.', 'প্রত্যাশার রৈখিকতা।') },
  ],
  toolkit: ['setprecision'],
};

export const p235B: ProblemEntry = {
  id: '235B',
  contestId: 235,
  index: 'B',
  name: "Let's Play Osu!",
  rating: 2000,
  tags: ['dp', 'math', 'probabilities'],
  why: L('Expected value of a square is not the square of the expected value; track E[run length] and add the increments 2L + 1.', 'বর্গের প্রত্যাশিত মান প্রত্যাশিত মানের বর্গ নয়; E[রানের দৈর্ঘ্য] রাখুন আর বৃদ্ধি ২L + ১ যোগ করুন।'),
  statement: L('A play is a string of n clicks, each correct (O) with probability pᵢ, independently. The score is the sum of squares of the lengths of maximal blocks of O. Find the expected score.', 'একটি খেলা n-টি ক্লিকের স্ট্রিং, প্রতিটি pᵢ সম্ভাবনায় স্বাধীনভাবে সঠিক (O)। স্কোর হলো O-এর সর্বোচ্চ ব্লকগুলোর দৈর্ঘ্যের বর্গের যোগফল। প্রত্যাশিত স্কোর বের করুন।'),
  input: L('n, then p₁ … pₙ.', 'n, তারপর p₁ … pₙ।'),
  output: L('The expected score.', 'প্রত্যাশিত স্কোর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 0 ≤ pᵢ ≤ 1', '১ ≤ n ≤ ১০⁵, ০ ≤ pᵢ ≤ ১'), realAnswer] },
  samples: [
    { input: '3\n0.5 0.5 0.5', output: '2.750000000000', explain: L('Average of the 8 equally likely strings’ scores: 22 / 8.', '৮টি সমসম্ভাব্য স্ট্রিংয়ের স্কোরের গড়: ২২ / ৮।') },
    { input: '4\n0.7 0.2 0.1 0.9', output: '2.489200000000', explain: L('Same idea with unequal probabilities.', 'অসমান সম্ভাবনায় একই ধারণা।') },
    { input: '5\n1 1 1 1 1', output: '25.000000000000', explain: L('Always OOOOO: 5².', 'সবসময় OOOOO: ৫²।') },
  ],
  observation: L('When a block grows from length L to L + 1 the score grows by (L + 1)² − L² = 2L + 1. So the expected gain at click i is pᵢ · (2 E[Lᵢ₋₁] + 1), which needs only E[L], and E[Lᵢ] = pᵢ · (E[Lᵢ₋₁] + 1).', 'একটি ব্লক দৈর্ঘ্য L থেকে L + ১ হলে স্কোর বাড়ে (L + ১)² − L² = ২L + ১। তাই ক্লিক i-তে প্রত্যাশিত লাভ pᵢ · (২ E[Lᵢ₋₁] + ১), যাতে শুধু E[L] লাগে, আর E[Lᵢ] = pᵢ · (E[Lᵢ₋₁] + ১)।'),
  approach: [L('Keep len = expected length of the current block.', 'len = বর্তমান ব্লকের প্রত্যাশিত দৈর্ঘ্য রাখুন।'), L('For each click: ans += p · (2 len + 1); len = p · (len + 1).', 'প্রতি ক্লিকে: ans += p · (২ len + ১); len = p · (len + ১)।')],
  walkthrough: {
    input: '0.5 0.5 0.5',
    steps: [
      { state: 'i=1: ans 0.5, len 0.5', text: L('Gain 0.5 · 1.', 'লাভ ০.৫ · ১।') },
      { state: 'i=2: ans 1.5, len 0.75', text: L('Gain 0.5 · (1 + 1) = 1.', 'লাভ ০.৫ · (১ + ১) = ১।') },
      { state: 'i=3: ans 2.75', text: L('Gain 0.5 · (1.5 + 1) = 1.25.', 'লাভ ০.৫ · (১.৫ + ১) = ১.২৫।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Two running numbers.', 'দুটি চলমান সংখ্যা।') },
  solutions: [
    {
      id: 'increments',
      kind: 'optimal',
      title: L('Linearity on the increments', 'বৃদ্ধির ওপর রৈখিকতা'),
      idea: L('Score = Σ of per-click increments; each increment’s expectation needs only E[L].', 'স্কোর = প্রতি ক্লিকের বৃদ্ধির যোগফল; প্রতিটি বৃদ্ধির প্রত্যাশায় শুধু E[L] লাগে।'),
      explain: [
        L('E[L²] cannot be built from E[L] alone, so tracking “expected score of the current block” directly fails. Splitting the square into increments makes everything linear in L.', 'শুধু E[L] থেকে E[L²] বানানো যায় না, তাই সরাসরি “বর্তমান ব্লকের প্রত্যাশিত স্কোর” রাখা ব্যর্থ হয়। বর্গকে বৃদ্ধিতে ভাগ করলে সবকিছু L-এ রৈখিক হয়।'),
        L('Equivalently, one can track E[L²] with E[(L+1)²] = E[L²] + 2E[L] + 1; both views give the same code.', 'সমতুল্যভাবে E[(L+১)²] = E[L²] + ২E[L] + ১ দিয়ে E[L²] রাখা যায়; দুই দৃষ্টিভঙ্গি একই কোড দেয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    double len = 0, ans = 0;  // len = expected length of the current run of O's
    for (int i = 0; i < n; i++) {
        double p;
        scanf("%lf", &p);
        // A run of length L growing to L+1 adds (L+1)^2 - L^2 = 2L + 1 to the score.
        ans += (2 * len + 1) * p;
        len = (len + 1) * p;
    }
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All 2ⁿ strings', 'সব ২ⁿ স্ট্রিং'),
      idea: L('Weight each string by its probability and score it.', 'প্রতিটি স্ট্রিংকে তার সম্ভাবনায় ভার দিয়ে স্কোর।'),
      explain: [L('Direct definition of expectation; small n only.', 'প্রত্যাশার সরাসরি সংজ্ঞা; শুধু ছোট n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<double> p(n);
    for (auto& x : p) cin >> x;
    if (n > 20) { cout << "\n"; return 0; }
    double ans = 0;
    for (int mask = 0; mask < (1 << n); mask++) {  // bit i set = click i is O
        double prob = 1;
        long long score = 0, run = 0;
        for (int i = 0; i < n; i++) {
            if (mask >> i & 1) { prob *= p[i]; run++; }
            else { prob *= 1 - p[i]; score += run * run; run = 0; }
        }
        score += run * run;
        ans += prob * score;
    }
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '3\n0.5 0.5 0.5', output: '2.750000000000', source: 'sample', note: sample(1) },
    { input: '4\n0.7 0.2 0.1 0.9', output: '2.489200000000', source: 'sample', note: sample(2) },
    { input: '5\n1 1 1 1 1', output: '25.000000000000', source: 'sample', note: sample(3) },
    { input: '2\n0 0', output: '0', source: 'own', note: L('No O at all.', 'কোনো O নেই।') },
  ],
  pitfalls: [L('Using (E[L])² as E[L²].', '(E[L])²-কে E[L²] ধরা।')],
  related: [
    { id: '453A', name: 'Little Pony and Expected Maximum', why: L('Expectation by a clever decomposition.', 'চতুর বিভাজনে প্রত্যাশা।') },
    { id: '280C', name: 'Game on Tree', why: L('Linearity of expectation.', 'প্রত্যাশার রৈখিকতা।') },
  ],
  toolkit: ['setprecision'],
};

export const p540D: ProblemEntry = {
  id: '540D',
  contestId: 540,
  index: 'D',
  name: 'Bad Luck Island',
  rating: 1900,
  tags: ['dp', 'probabilities'],
  why: L('A probability DP over three counters where “nothing happens” meetings are simply ignored.', 'তিনটি কাউন্টারের ওপর সম্ভাবনার DP যেখানে “কিছু হয় না” এমন সাক্ষাৎ সহজে উপেক্ষা করা হয়।'),
  statement: L('An island has r rocks, s scissors and p papers. Every moment two random individuals meet; if they are different species, one kills the other (rock beats scissors, scissors beat paper, paper beats rock). For each species find the probability that it is the only one left in the end.', 'একটি দ্বীপে r-টি পাথর, s-টি কাঁচি আর p-টি কাগজ। প্রতি মুহূর্তে দুজন এলোমেলো সদস্যের দেখা হয়; ভিন্ন প্রজাতি হলে একজন অন্যকে মারে (পাথর কাঁচিকে হারায়, কাঁচি কাগজকে, কাগজ পাথরকে)। প্রতিটি প্রজাতির জন্য শেষে শুধু সেটি টিকে থাকার সম্ভাবনা বের করুন।'),
  input: L('r s p.', 'r s p।'),
  output: L('Three probabilities: rocks, scissors, papers.', 'তিনটি সম্ভাবনা: পাথর, কাঁচি, কাগজ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ r, s, p ≤ 100', '১ ≤ r, s, p ≤ ১০০'), realAnswer] },
  samples: [
    { input: '2 2 2', output: '0.333333333333 0.333333333333 0.333333333333', explain: L('Symmetric.', 'প্রতিসম।') },
    { input: '2 1 2', output: '0.150000000000 0.300000000000 0.550000000000', explain: L('Fewer scissors helps the papers.', 'কম কাঁচি কাগজকে সাহায্য করে।') },
    { input: '1 1 3', output: '0.057142857143 0.657142857143 0.285714285714', explain: L('Many papers feed the scissors.', 'অনেক কাগজ কাঁচিকে খাওয়ায়।') },
  ],
  observation: L('Meetings of the same species change nothing, so condition on a meeting that does change something. From (r, s, p) the next change is rock–scissors with weight rs, scissors–paper sp, paper–rock pr, normalised by rs + sp + pr. Counts only decrease, so a DP from (R, S, P) downwards works; a state with one species left is final.', 'একই প্রজাতির সাক্ষাৎ কিছু বদলায় না, তাই শুধু বদলানো সাক্ষাতের ওপর শর্ত দিন। (r, s, p) থেকে পরের বদল পাথর–কাঁচি ভার rs, কাঁচি–কাগজ sp, কাগজ–পাথর pr, rs + sp + pr দিয়ে স্বাভাবিকীকৃত। সংখ্যা শুধু কমে, তাই (R, S, P) থেকে নিচের দিকে DP চলে; এক প্রজাতি বাকি থাকলে অবস্থা চূড়ান্ত।'),
  approach: [L('dp[r][s][p] = probability of reaching that state; start with 1 at the input.', 'dp[r][s][p] = সেই অবস্থায় পৌঁছানোর সম্ভাবনা; ইনপুটে ১ দিয়ে শুরু।'), L('Push mass to the three successor states; collect it at final states.', 'তিনটি পরবর্তী অবস্থায় ভর ঠেলুন; চূড়ান্ত অবস্থায় জমা করুন।')],
  walkthrough: {
    input: '1 1 1',
    steps: [
      { state: 'weights 1, 1, 1', text: L('Each of the three duels has probability ⅓.', 'তিনটি দ্বন্দ্বের প্রতিটির সম্ভাবনা ⅓।') },
      { state: '(1,0,1) → paper wins', text: L('After rock kills scissors, paper beats rock.', 'পাথর কাঁচি মারার পর কাগজ পাথরকে হারায়।') },
      { state: '⅓ each', text: L('By symmetry each species wins ⅓.', 'প্রতিসাম্যে প্রতিটি প্রজাতি ⅓ জেতে।') },
    ],
  },
  complexity: { time: 'O(r · s · p)', space: 'O(r · s · p)', why: L('About 10⁶ states, O(1) each.', 'প্রায় ১০⁶ অবস্থা, প্রতিটি O(১)।') },
  solutions: [
    {
      id: 'forward',
      kind: 'optimal',
      title: L('Forward probability DP', 'সামনের দিকে সম্ভাবনার DP'),
      idea: L('Distribute probability from each state to its successors, largest counts first.', 'প্রতিটি অবস্থা থেকে পরবর্তীগুলোতে সম্ভাবনা বণ্টন, বড় সংখ্যা আগে।'),
      explain: [L('Ignoring same-species meetings is valid because they only delay the process; the order of the changing events, and therefore the final outcome, has the same distribution.', 'একই প্রজাতির সাক্ষাৎ উপেক্ষা বৈধ কারণ সেগুলো শুধু প্রক্রিয়া দেরি করায়; বদলানো ঘটনার ক্রম, আর তাই চূড়ান্ত ফল, একই বণ্টনের।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

double dp[101][101][101];

int main() {
    int R, S, P;
    cin >> R >> S >> P;
    dp[R][S][P] = 1;
    double rock = 0, scissors = 0, paper = 0;
    // Counts only go down, so visit states from large to small.
    for (int r = R; r >= 0; r--)
        for (int s = S; s >= 0; s--)
            for (int p = P; p >= 0; p--) {
                double cur = dp[r][s][p];
                if (cur == 0) continue;
                int alive = (r > 0) + (s > 0) + (p > 0);
                if (alive == 1) {
                    if (r) rock += cur;
                    if (s) scissors += cur;
                    if (p) paper += cur;
                    continue;
                }
                // Only meetings of different species change anything.
                double pairs = r * s + s * p + p * r;
                if (r && s) dp[r][s - 1][p] += cur * r * s / pairs;  // rock breaks scissors
                if (s && p) dp[r][s][p - 1] += cur * s * p / pairs;  // scissors cut paper
                if (p && r) dp[r - 1][s][p] += cur * p * r / pairs;  // paper wraps rock
            }
    printf("%.12f %.12f %.12f\n", rock, scissors, paper);
    return 0;
}
`,
      time: 'O(r · s · p)',
      space: 'O(r · s · p)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'memo',
      kind: 'method',
      title: L('Memoised recursion', 'মেমোসহ পুনরাবৃত্তি'),
      idea: L('win(r, s, p) = weighted average of win at the three successors.', 'win(r, s, p) = তিনটি পরবর্তীতে win-এর ভারযুক্ত গড়।'),
      explain: [L('The backward view of the same chain: each state returns its three win probabilities. It is often easier to write, at the cost of recursion depth up to r + s + p.', 'একই চেইনের পেছনের দৃষ্টি: প্রতিটি অবস্থা তার তিনটি জয়ের সম্ভাবনা ফেরত দেয়। প্রায়ই লেখা সহজ, খরচ r + s + p পর্যন্ত পুনরাবৃত্তির গভীরতা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool seen[101][101][101];
array<double, 3> memo[101][101][101];

// Probabilities that rocks / scissors / papers are the last species alive.
array<double, 3> solve(int r, int s, int p) {
    if (s == 0 && p == 0) return {1, 0, 0};
    if (r == 0 && p == 0) return {0, 1, 0};
    if (r == 0 && s == 0) return {0, 0, 1};
    if (seen[r][s][p]) return memo[r][s][p];
    seen[r][s][p] = true;
    double pairs = r * s + s * p + p * r;
    array<double, 3> res = {0, 0, 0};
    auto add = [&](double w, array<double, 3> sub) {
        for (int i = 0; i < 3; i++) res[i] += w * sub[i];
    };
    if (r && s) add(r * s / pairs, solve(r, s - 1, p));
    if (s && p) add(s * p / pairs, solve(r, s, p - 1));
    if (p && r) add(p * r / pairs, solve(r - 1, s, p));
    return memo[r][s][p] = res;
}

int main() {
    int r, s, p;
    cin >> r >> s >> p;
    auto res = solve(r, s, p);
    printf("%.12f %.12f %.12f\n", res[0], res[1], res[2]);
    return 0;
}
`,
      time: 'O(r · s · p)',
      space: 'O(r · s · p)',
      accepted: true,
      toolkit: ['lambda', 'setprecision'],
    },
  ],
  tests: [
    { input: '2 2 2', output: '0.333333333333 0.333333333333 0.333333333333', source: 'sample', note: sample(1) },
    { input: '2 1 2', output: '0.150000000000 0.300000000000 0.550000000000', source: 'sample', note: sample(2) },
    { input: '1 1 3', output: '0.057142857143 0.657142857143 0.285714285714', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Dividing by the number of all pairs including same-species ones without looping: the self-loop must then be solved for, not iterated.', 'একই প্রজাতিসহ সব জোড়ার সংখ্যা দিয়ে ভাগ: তখন স্ব-লুপের জন্য সমাধান করতে হবে, পুনরাবৃত্তি নয়।')],
  related: [
    { id: '518D', name: 'Ilya and Escalator', why: L('Forward probability DP.', 'সামনের সম্ভাবনা DP।') },
    { id: '16E', name: 'Fish', why: L('Pairwise meetings over subsets.', 'উপসেটের ওপর জোড়ায় সাক্ষাৎ।') },
  ],
  toolkit: ['setprecision'],
};

export const p16E: ProblemEntry = {
  id: '16E',
  contestId: 16,
  index: 'E',
  name: 'Fish',
  rating: 1900,
  tags: ['bitmasks', 'dp', 'probabilities'],
  why: L('Probability DP over subsets: the state is “who is still alive”.', 'উপসেটের ওপর সম্ভাবনার DP: অবস্থা হলো “কে এখনো বেঁচে আছে”।'),
  statement: L('n fish live in a lake. Every day one uniformly random pair of living fish meets, and fish i eats fish j with probability aᵢⱼ (aⱼᵢ = 1 − aᵢⱼ). This repeats until one fish remains. For every fish find the probability that it survives.', 'একটি হ্রদে n-টি মাছ। প্রতিদিন বেঁচে থাকা মাছের সমভাবে এলোমেলো একটি জোড়ার দেখা হয়, আর মাছ i মাছ j-কে aᵢⱼ সম্ভাবনায় খায় (aⱼᵢ = ১ − aᵢⱼ)। একটি মাছ বাকি থাকা পর্যন্ত চলে। প্রতিটি মাছের টিকে থাকার সম্ভাবনা বের করুন।'),
  input: L('n, then the n × n matrix a.', 'n, তারপর n × n ম্যাট্রিক্স a।'),
  output: L('n probabilities.', 'n-টি সম্ভাবনা।'),
  limits: { timeSec: 3, memoryMb: 128, notes: [L('1 ≤ n ≤ 18', '১ ≤ n ≤ ১৮'), realAnswer] },
  samples: [
    { input: '2\n0 0.5\n0.5 0', output: '0.500000 0.500000', explain: L('One fair duel.', 'একটি ন্যায্য দ্বন্দ্ব।') },
    { input: '5\n0 1 1 1 1\n0 0 0.5 0.5 0.5\n0 0.5 0 0.5 0.5\n0 0.5 0.5 0 0.5\n0 0.5 0.5 0.5 0', output: '1.000000 0.000000 0.000000 0.000000 0.000000', explain: L('Fish 1 beats everyone for sure.', 'মাছ ১ নিশ্চিতভাবে সবাইকে হারায়।') },
  ],
  observation: L('dp[mask] = probability that at some point exactly the fish in mask are alive. From mask with k fish, each of the k(k−1)/2 pairs meets with equal probability; pair (i, j) leads to mask without j with probability aᵢⱼ. Process masks from full downwards; answer for fish i is dp[{i}].', 'dp[mask] = কোনো সময়ে ঠিক mask-এর মাছগুলো বেঁচে থাকার সম্ভাবনা। k-টি মাছের mask থেকে k(k−১)/২টি জোড়ার প্রত্যেকটির সমান সম্ভাবনায় দেখা হয়; জোড়া (i, j) aᵢⱼ সম্ভাবনায় j-বিহীন mask-এ নেয়। পূর্ণ থেকে নিচে mask প্রক্রিয়া করুন; মাছ i-এর উত্তর dp[{i}]।'),
  approach: [L('Masks only lose bits, so iterating mask downward from 2ⁿ − 1 processes every mask after all its supersets.', 'mask শুধু বিট হারায়, তাই ২ⁿ − ১ থেকে নিচে গেলে প্রতিটি mask তার সব সুপারসেটের পরে প্রক্রিয়া হয়।'), L('For each ordered pair (i, j) inside the mask push dp[mask] · aᵢⱼ / pairs.', 'mask-এর ভেতরে প্রতিটি ক্রমযুক্ত জোড়া (i, j)-এর জন্য dp[mask] · aᵢⱼ / জোড়া ঠেলুন।')],
  walkthrough: {
    input: 'n = 2, a₁₂ = a₂₁ = 0.5',
    steps: [
      { state: 'dp[11] = 1', text: L('Both alive at the start; 1 pair.', 'শুরুতে দুজনেই বেঁচে; ১টি জোড়া।') },
      { state: 'dp[01] = dp[10] = 0.5', text: L('Either eats the other with ½.', 'যেকোনো একজন অন্যকে ½ সম্ভাবনায় খায়।') },
    ],
  },
  complexity: { time: 'O(2ⁿ · n²)', space: 'O(2ⁿ)', why: L('2¹⁸ masks × 324 pairs ≈ 8.5·10⁷.', '২¹⁸ mask × ৩২৪ জোড়া ≈ ৮.৫·১০⁷।') },
  solutions: [
    {
      id: 'subset-dp',
      kind: 'optimal',
      title: L('Push DP over alive sets', 'বেঁচে থাকা সেটের ওপর পুশ DP'),
      idea: L('Each day removes one fish, so the chain of alive sets is a path down the subset lattice.', 'প্রতিদিন একটি মাছ সরে, তাই বেঁচে থাকা সেটের শৃঙ্খল উপসেট-জালিতে নিচের দিকে একটি পথ।'),
      explain: [L('Because exactly one fish dies per day, the event “alive set equals mask at some point” has a clean probability, and the transitions only go to smaller masks. Skip masks with dp = 0 to save time.', 'যেহেতু প্রতিদিন ঠিক একটি মাছ মারা যায়, “কোনো সময়ে বেঁচে থাকা সেট = mask” ঘটনার পরিষ্কার সম্ভাবনা আছে, আর রূপান্তর শুধু ছোট mask-এ যায়। সময় বাঁচাতে dp = ০ এমন mask বাদ দিন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<double>> a(n, vector<double>(n));
    for (auto& row : a)
        for (auto& x : row) scanf("%lf", &x);
    int full = (1 << n) - 1;
    vector<double> dp(1 << n, 0);
    dp[full] = 1;  // dp[mask] = probability that exactly the fish in mask are alive at some point
    for (int mask = full; mask > 0; mask--) {
        if (dp[mask] == 0) continue;
        int k = __builtin_popcount(mask);
        if (k < 2) continue;
        double pairs = k * (k - 1) / 2.0;
        for (int i = 0; i < n; i++) {
            if (!(mask >> i & 1)) continue;
            for (int j = 0; j < n; j++) {
                if (i == j || !(mask >> j & 1)) continue;
                // i and j meet (1 / pairs) and i eats j (a[i][j]).
                dp[mask ^ (1 << j)] += dp[mask] / pairs * a[i][j];
            }
        }
    }
    for (int i = 0; i < n; i++) printf("%.9f ", dp[1 << i]);
    printf("\n");
    return 0;
}
`,
      time: 'O(2ⁿ · n²)',
      space: 'O(2ⁿ)',
      accepted: true,
      toolkit: ['popcount', 'bit-shift', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recursion without memo', 'মেমো ছাড়া পুনরাবৃত্তি'),
      idea: L('survive(mask, who) averages over the next meeting.', 'survive(mask, who) পরের সাক্ষাতের ওপর গড় নেয়।'),
      explain: [L('Explores every history of meetings: correct, but each mask is reached by many histories, so it is factorially slow.', 'সাক্ষাতের প্রতিটি ইতিহাস ঘুরে দেখে: সঠিক, কিন্তু প্রতিটি mask অনেক ইতিহাসে পৌঁছায়, তাই ফ্যাক্টরিয়াল-গতিতে ধীর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
double a[20][20];

// Probability that fish who survives, starting from the set mask, without memoisation.
double survive(int mask, int who) {
    if (!(mask >> who & 1)) return 0;
    int k = __builtin_popcount(mask);
    if (k == 1) return 1;
    double pairs = k * (k - 1) / 2.0, res = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            if (!(mask >> i & 1) || !(mask >> j & 1)) continue;
            res += a[i][j] / pairs * survive(mask ^ (1 << j), who);
            res += a[j][i] / pairs * survive(mask ^ (1 << i), who);
        }
    return res;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> a[i][j];
    if (n > 7) { cout << "\n"; return 0; }
    for (int i = 0; i < n; i++) printf("%.9f ", survive((1 << n) - 1, i));
    printf("\n");
    return 0;
}
`,
      time: 'O((n!)² )',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2\n0 0.5\n0.5 0', output: '0.500000 0.500000', source: 'sample', note: sample(1) },
    { input: '5\n0 1 1 1 1\n0 0 0.5 0.5 0.5\n0 0.5 0 0.5 0.5\n0 0.5 0.5 0 0.5\n0 0.5 0.5 0.5 0', output: '1.000000 0.000000 0.000000 0.000000 0.000000', source: 'sample', note: sample(2) },
    { input: '1\n0', output: '1', source: 'own', note: L('A single fish survives.', 'একটি মাছ টিকে থাকে।') },
  ],
  pitfalls: [L('Iterating masks upward: dp[mask] would be used before all its supersets have pushed into it.', 'mask ওপরের দিকে পুনরাবৃত্তি: সব সুপারসেট ঠেলার আগেই dp[mask] ব্যবহার হতো।'), L('Dividing by k² or k(k−1) instead of the number of unordered pairs.', 'অক্রমযুক্ত জোড়ার সংখ্যার বদলে k² বা k(k−১) দিয়ে ভাগ।')],
  related: [
    { id: '540D', name: 'Bad Luck Island', why: L('Random meetings, probability DP.', 'এলোমেলো সাক্ষাৎ, সম্ভাবনার DP।') },
    { id: '1550E', name: 'Stringforces', why: L('More DP over bitmasks.', 'বিটমাস্কের ওপর আরও DP।') },
  ],
  toolkit: ['bit-shift'],
};

export const p696B: ProblemEntry = {
  id: '696B',
  contestId: 696,
  index: 'B',
  name: 'Puzzles',
  rating: 1700,
  tags: ['dfs', 'math', 'probabilities', 'trees'],
  why: L('Each sibling subtree comes before you with probability ½, so the expected start time is a simple top-down formula.', 'প্রতিটি সহোদর সাবট্রি ½ সম্ভাবনায় আপনার আগে আসে, তাই প্রত্যাশিত শুরুর সময় একটি সহজ ওপর-থেকে-নিচ সূত্র।'),
  statement: L('A rooted tree (root 1) is traversed by a DFS that numbers nodes in visiting order starting from 1, and at every node shuffles the order of its children uniformly at random. For every node find the expected number it receives.', 'একটি মূলযুক্ত গাছ (মূল ১) একটি DFS দিয়ে ঘোরা হয় যা পরিদর্শনের ক্রমে ১ থেকে নোডে নম্বর দেয়, আর প্রতিটি নোডে সন্তানদের ক্রম সমভাবে এলোমেলো করে। প্রতিটি নোডের প্রত্যাশিত নম্বর বের করুন।'),
  input: L('n, then p₂ … pₙ, the parent of each node (pᵢ < i).', 'n, তারপর p₂ … pₙ, প্রতিটি নোডের পিতা (pᵢ < i)।'),
  output: L('n expected values.', 'n-টি প্রত্যাশিত মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵'), realAnswer] },
  samples: [
    { input: '7\n1 2 1 1 4 4', output: '1.0 4.0 5.0 3.5 4.5 5.0 5.0', explain: L('Node 2: 1 + 1 + (6 − 2)/2 = 4.', 'নোড ২: ১ + ১ + (৬ − ২)/২ = ৪।') },
    { input: '12\n1 1 2 2 4 4 3 3 1 10 8', output: '1.0 5.0 5.5 6.5 7.5 8.0 8.0 7.0 7.5 6.5 7.5 8.0', explain: L('The same formula down the tree.', 'গাছ বেয়ে একই সূত্র।') },
  ],
  observation: L('v is visited right after its parent, plus all sibling subtrees that are visited before it. In a random order each sibling comes before v with probability ½, so E[v] = E[parent] + 1 + (size(parent) − 1 − size(v)) / 2.', 'v তার পিতার ঠিক পরে পরিদর্শিত হয়, যোগ যেসব সহোদর সাবট্রি তার আগে আসে। এলোমেলো ক্রমে প্রতিটি সহোদর ½ সম্ভাবনায় v-এর আগে আসে, তাই E[v] = E[পিতা] + ১ + (size(পিতা) − ১ − size(v)) / ২।'),
  approach: [L('Since pᵢ < i, compute subtree sizes by a backward loop and expectations by a forward loop: no recursion needed.', 'pᵢ < i হওয়ায় পেছনের লুপে সাবট্রির আকার আর সামনের লুপে প্রত্যাশা: পুনরাবৃত্তি লাগে না।')],
  walkthrough: {
    input: 'first sample, node 4',
    steps: [
      { state: 'size(1) = 7, size(4) = 3', text: L('Siblings of 4 hold 7 − 1 − 3 = 3 nodes.', '৪-এর সহোদরদের মধ্যে ৭ − ১ − ৩ = ৩টি নোড।') },
      { state: 'E[4] = 1 + 1 + 3/2 = 3.5', text: L('Half of those nodes come first on average.', 'গড়ে তাদের অর্ধেক আগে আসে।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two linear loops.', 'দুটি রৈখিক লুপ।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Half of the siblings’ subtrees', 'সহোদরদের সাবট্রির অর্ধেক'),
      idea: L('Linearity: each sibling subtree contributes its size times ½.', 'রৈখিকতা: প্রতিটি সহোদর সাবট্রি তার আকার × ½ যোগ করে।'),
      explain: [L('The expected number of nodes before v among its siblings’ subtrees is Σ size(sibling) · P(sibling before v) = Σ size / 2. Note this does not depend on how many siblings there are, only on their total size.', 'সহোদরদের সাবট্রির মধ্যে v-এর আগে প্রত্যাশিত নোড Σ size(সহোদর) · P(সহোদর v-এর আগে) = Σ size / ২। লক্ষ করুন এটি কতজন সহোদর তার ওপর নয়, শুধু তাদের মোট আকারের ওপর নির্ভর করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> par(n + 1, 0), sz(n + 1, 1);
    for (int i = 2; i <= n; i++) scanf("%d", &par[i]);
    for (int i = n; i >= 2; i--) sz[par[i]] += sz[i];  // parents have smaller numbers
    vector<double> e(n + 1);
    e[1] = 1;
    for (int v = 2; v <= n; v++) {
        // Each sibling's subtree comes before v with probability 1/2.
        int siblings = sz[par[v]] - 1 - sz[v];
        e[v] = e[par[v]] + 1 + siblings / 2.0;
    }
    for (int v = 1; v <= n; v++) printf("%.1f ", e[v]);
    printf("\n");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every combination of child orders', 'সন্তানদের ক্রমের প্রতিটি সমন্বয়'),
      idea: L('Run the DFS for every choice of permutation at every node and average.', 'প্রতিটি নোডে প্রতিটি পারমুটেশন বাছাইয়ে DFS চালিয়ে গড়।'),
      explain: [L('An odometer of next_permutation calls walks through all combinations, each equally likely.', 'next_permutation কলের একটি ওডোমিটার সব সমন্বয় ঘুরে দেখে, প্রতিটি সমসম্ভাব্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> ch;
vector<double> total;

int main() {
    cin >> n;
    ch.assign(n + 1, {});
    for (int i = 2; i <= n; i++) {
        int p;
        cin >> p;
        ch[p].push_back(i);
    }
    if (n > 8) { cout << "\n"; return 0; }
    for (auto& c : ch) sort(c.begin(), c.end());
    total.assign(n + 1, 0);
    long long runs = 0;
    // Odometer over every combination of child orders (one permutation per node).
    while (true) {
        int timer = 0;
        vector<int> start(n + 1);
        function<void(int)> dfs = [&](int v) {
            start[v] = ++timer;
            for (int u : ch[v]) dfs(u);
        };
        dfs(1);
        for (int v = 1; v <= n; v++) total[v] += start[v];
        runs++;
        int v = 1;
        while (v <= n && !next_permutation(ch[v].begin(), ch[v].end())) v++;
        if (v > n) break;
    }
    for (int v = 1; v <= n; v++) printf("%.1f ", total[v] / runs);
    printf("\n");
    return 0;
}
`,
      time: 'O(Π deg! · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '7\n1 2 1 1 4 4', output: '1.0 4.0 5.0 3.5 4.5 5.0 5.0', source: 'sample', note: sample(1) },
    { input: '12\n1 1 2 2 4 4 3 3 1 10 8', output: '1.0 5.0 5.5 6.5 7.5 8.0 8.0 7.0 7.5 6.5 7.5 8.0', source: 'sample', note: sample(2) },
    { input: '1\n', output: '1.0', source: 'own', note: L('Only the root.', 'শুধু মূল।') },
  ],
  pitfalls: [L('A recursive DFS on a 10⁵-node path can overflow the stack; the pᵢ < i order makes loops enough.', '১০⁵-নোডের পথে পুনরাবৃত্ত DFS স্ট্যাক উপচাতে পারে; pᵢ < i ক্রম লুপকেই যথেষ্ট করে।')],
  related: [
    { id: '280C', name: 'Game on Tree', why: L('Expectation on a tree by linearity.', 'রৈখিকতায় গাছে প্রত্যাশা।') },
    { id: '1092F', name: 'Tree with Maximum Cost', why: L('Subtree sizes in formulas.', 'সূত্রে সাবট্রির আকার।') },
  ],
  toolkit: ['setprecision'],
};
