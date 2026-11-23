import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1097B: ProblemEntry = {
  id: '1097B',
  contestId: 1097,
  index: 'B',
  name: 'Petr and a Combination Lock',
  rating: 1200,
  tags: ['bitmasks', 'brute-force', 'dp'],
  why: L('Try every combination of directions: the textbook use of a bitmask over n ≤ 15 choices.', 'দিকের প্রতিটি সমন্বয় চেষ্টা: n ≤ ১৫ সিদ্ধান্তের ওপর বিটমাস্কের পাঠ্যবই ব্যবহার।'),
  statement: L(
    'A lock has a 360-degree dial pointing at zero. Petr must make exactly n rotations; the i-th rotation is by aᵢ degrees, either clockwise or counterclockwise, his choice. Can he choose the directions so that the pointer is at zero again at the end? Print YES or NO.',
    'একটি তালার ৩৬০ ডিগ্রির ডায়াল শূন্যে নির্দেশ করছে। পিটারকে ঠিক n বার ঘোরাতে হবে; i-তম ঘূর্ণন aᵢ ডিগ্রি, ঘড়ির কাঁটার দিকে বা উল্টো দিকে, তার পছন্দমতো। শেষে কাঁটা আবার শূন্যে আনতে পারে এমনভাবে কি দিকগুলো বাছা যায়? YES বা NO প্রিন্ট করুন।',
  ),
  input: L('n, then n angles.', 'n, তারপর n-টি কোণ।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 15, 1 ≤ aᵢ ≤ 180', '১ ≤ n ≤ ১৫, ১ ≤ aᵢ ≤ ১৮০')] },
  samples: [
    { input: '3\n10\n20\n30', output: 'YES', explain: L('10 + 20 − 30 = 0.', '১০ + ২০ − ৩০ = ০।') },
    { input: '3\n10\n10\n10', output: 'NO', explain: L('±10 ± 10 ± 10 is never a multiple of 360.', '±১০ ± ১০ ± ১০ কখনো ৩৬০-এর গুণিতক নয়।') },
    { input: '3\n120\n120\n120', output: 'YES', explain: L('All clockwise: 360 is a full turn.', 'সব ঘড়ির কাঁটার দিকে: ৩৬০ একটি পূর্ণ ঘূর্ণন।') },
  ],
  observation: L('Each rotation has two choices, so there are 2ⁿ ≤ 32768 combinations. The pointer is at zero when the signed sum is a multiple of 360.', 'প্রতিটি ঘূর্ণনের দুটি বিকল্প, তাই ২ⁿ ≤ ৩২৭৬৮টি সমন্বয়। চিহ্নসহ যোগফল ৩৬০-এর গুণিতক হলে কাঁটা শূন্যে থাকে।'),
  approach: [L('Loop over masks; bit i chooses the sign of aᵢ.', 'mask-গুলোর ওপর লুপ; বিট i aᵢ-এর চিহ্ন বাছে।')],
  walkthrough: { input: '10 20 30', steps: [{ state: 'mask 011: +10 +20 −30 = 0', text: L('0 % 360 == 0: YES.', '০ % ৩৬০ == ০: YES।') }] },
  complexity: { time: 'O(2ⁿ · n)', space: 'O(1)', why: L('Every mask, n additions each.', 'প্রতিটি mask, প্রতিটিতে n যোগ।') },
  solutions: [
    {
      id: 'mask',
      kind: 'optimal',
      title: L('Bitmask over directions', 'দিকের ওপর বিটমাস্ক'),
      idea: L('mask >> i & 1 decides whether aᵢ is added or subtracted.', 'mask >> i & ১ ঠিক করে aᵢ যোগ হবে না বিয়োগ।'),
      explain: [L('The signed sum can be negative, and in C++ −360 % 360 is 0 but −10 % 360 is −10, not 350; testing “% 360 == 0” is safe either way.', 'চিহ্নসহ যোগফল ঋণাত্মক হতে পারে, আর C++-এ −৩৬০ % ৩৬০ হলো ০ কিন্তু −১০ % ৩৬০ হলো −১০, ৩৫০ নয়; “% ৩৬০ == ০” পরীক্ষা দুভাবেই নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int mask = 0; mask < (1 << n); mask++) {
        int angle = 0;
        for (int i = 0; i < n; i++) angle += (mask >> i & 1) ? a[i] : -a[i];
        if (angle % 360 == 0) {
            cout << "YES\n";
            return 0;
        }
    }
    cout << "NO\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bit-shift', 'modulo'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('Reachable angles DP', 'পৌঁছানো যায় এমন কোণের DP'),
      idea: L('can[i][d]: after i rotations the pointer can be at d degrees.', 'can[i][d]: i বার ঘোরানোর পর কাঁটা d ডিগ্রিতে থাকতে পারে।'),
      explain: [L('Only the position modulo 360 matters, so there are just 360 states. From each reachable d, go to (d + aᵢ) mod 360 and (d − aᵢ + 360) mod 360. This is O(360 · n) and would still work for n = 10⁵, where 2ⁿ is hopeless.', 'শুধু ৩৬০ মডুলোতে অবস্থান গুরুত্বপূর্ণ, তাই মাত্র ৩৬০টি অবস্থা। প্রতিটি প্রাপ্য d থেকে (d + aᵢ) mod ৩৬০ আর (d − aᵢ + ৩৬০) mod ৩৬০-এ যান। এটি O(৩৬০ · n) আর n = ১০⁵-এও কাজ করত, যেখানে ২ⁿ আশাহীন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<bool> can(360, false);
    can[0] = true;
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        vector<bool> next(360, false);
        for (int d = 0; d < 360; d++)
            if (can[d]) {
                next[(d + a) % 360] = true;
                next[(d - a + 360) % 360] = true;
            }
        can = next;
    }
    cout << (can[0] ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(360 · n)',
      space: 'O(360)',
      accepted: true,
      toolkit: ['vector', 'modulo'],
    },
  ],
  tests: [
    { input: '3\n10\n20\n30', output: 'YES', source: 'sample', note: sample(1) },
    { input: '3\n10\n10\n10', output: 'NO', source: 'sample', note: sample(2) },
    { input: '3\n120\n120\n120', output: 'YES', source: 'sample', note: sample(3) },
    { input: '1\n180', output: 'NO', source: 'own', note: L('One half turn.', 'একটি অর্ধ ঘূর্ণন।') },
    { input: '2\n180\n180', output: 'YES', source: 'own', note: L('Two half turns.', 'দুটি অর্ধ ঘূর্ণন।') },
  ],
  pitfalls: [L('Checking only for sum 0, forgetting ±360 and ±720.', 'শুধু যোগফল ০ দেখা, ±৩৬০ আর ±৭২০ ভুলে যাওয়া।')],
  related: [{ id: '1421A', name: 'XORwice', why: L('More bits.', 'আরও বিট।') }],
  toolkit: ['bit-shift', 'modulo'],
};

export const p520B: ProblemEntry = {
  id: '520B',
  contestId: 520,
  index: 'B',
  name: 'Two Buttons',
  rating: 1400,
  tags: ['dfs', 'graphs', 'greedy', 'implementation', 'math', 'shortest-paths'],
  featuredFor: ['graphs'],
  why: L('A shortest path where the graph is hidden in the rules, and a greedy that works by thinking backwards.', 'এমন সবচেয়ে ছোট পথ যেখানে গ্রাফ নিয়মের মধ্যে লুকানো, আর একটি গ্রিডি যা পেছন থেকে ভাবলে কাজ করে।'),
  statement: L(
    'A device shows a positive number n. The red button doubles it; the blue button subtracts one. If the number ever stops being positive, the device breaks. What is the minimum number of presses to turn n into m?',
    'একটি যন্ত্র একটি ধনাত্মক সংখ্যা n দেখায়। লাল বোতাম একে দ্বিগুণ করে; নীল বোতাম এক বিয়োগ করে। সংখ্যা কখনো ধনাত্মক না থাকলে যন্ত্র ভেঙে যায়। n-কে m বানাতে সর্বনিম্ন কয়বার চাপতে হবে?',
  ),
  input: L('Two integers n and m.', 'দুটি পূর্ণসংখ্যা n আর m।'),
  output: L('The minimum number of presses.', 'সর্বনিম্ন চাপের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁴', '১ ≤ n, m ≤ ১০⁴')] },
  samples: [
    { input: '4 6', output: '2', explain: L('4 → 3 → 6.', '৪ → ৩ → ৬।') },
    { input: '10 1', output: '9', explain: L('Press blue nine times.', 'নীল নয়বার চাপুন।') },
  ],
  observation: L('Numbers are vertices and presses are edges of cost 1, so BFS gives the answer. Alternatively, go backwards from m: halving (when even) and adding one are the reverse moves, and halving whenever possible is always best.', 'সংখ্যাগুলো শীর্ষবিন্দু আর চাপগুলো ১ খরচের প্রান্ত, তাই BFS উত্তর দেয়। বিকল্পভাবে m থেকে পেছনে যান: অর্ধেক করা (জোড় হলে) আর এক যোগ করা হলো উল্টো চাল, আর যখনই সম্ভব অর্ধেক করাই সবসময় সেরা।'),
  approach: [L('BFS from n over values up to 2·10⁴ (going higher never helps).', 'n থেকে ২·১০⁴ পর্যন্ত মানের ওপর BFS (এর বেশি যাওয়া কখনো কাজে আসে না)।')],
  walkthrough: {
    input: '4 6',
    steps: [
      { state: 'dist 1: 8, 3', text: L('One press from 4.', '৪ থেকে এক চাপ।') },
      { state: 'dist 2: 16, 7, 6, 2', text: L('6 reached from 3. Answer 2.', '৩ থেকে ৬-এ পৌঁছানো। উত্তর ২।') },
    ],
  },
  complexity: { time: 'O(M)', space: 'O(M)', why: L('Each value up to 2·10⁴ is visited once.', '২·১০⁴ পর্যন্ত প্রতিটি মান একবার দেখা হয়।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'method',
      title: L('BFS over numbers', 'সংখ্যার ওপর BFS'),
      idea: L('From x go to 2x and x − 1; the first time m is reached is the answer.', 'x থেকে 2x আর x − ১-এ যান; প্রথমবার m-এ পৌঁছানোই উত্তর।'),
      explain: [L('Values above 2·max(n, m) are never useful: you would have to come down by many −1 steps that could have been saved. With that cap the graph has 2·10⁴ vertices.', '২·max(n, m)-এর বেশি মান কখনো কাজে আসে না: অনেকগুলো −১ ধাপে নামতে হতো যা বাঁচানো যেত। সেই সীমায় গ্রাফে ২·১০⁴টি শীর্ষ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    const int LIMIT = 20000;
    vector<int> dist(LIMIT + 1, -1);
    queue<int> q;
    q.push(n);
    dist[n] = 0;
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        if (x == m) break;
        for (int y : {2 * x, x - 1})
            if (y >= 1 && y <= LIMIT && dist[y] == -1) {
                dist[y] = dist[x] + 1;
                q.push(y);
            }
    }
    cout << dist[m] << "\n";
    return 0;
}
`,
      time: 'O(M)',
      space: 'O(M)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
    {
      id: 'backwards',
      kind: 'optimal',
      title: L('Greedy backwards from m', 'm থেকে পেছনে গ্রিডি'),
      idea: L('While m > n: halve m if even, else add 1. Then add n − m.', 'যতক্ষণ m > n: m জোড় হলে অর্ধেক, না হলে ১ যোগ। তারপর n − m যোগ।'),
      explain: [
        L('Reversed, the moves are “halve” (only for even numbers) and “+1”. When m is odd you must add 1. When m is even and larger than n, halving first is never worse: doing two +1 steps then halving reaches the same place as halving then one +1, with one more step.', 'উল্টো করলে চালগুলো হলো “অর্ধেক” (শুধু জোড় সংখ্যায়) আর “+১”। m বিজোড় হলে ১ যোগ করতেই হবে। m জোড় আর n-এর বড় হলে আগে অর্ধেক করা কখনো খারাপ নয়: দুবার +১ করে অর্ধেক করলে অর্ধেক করে একবার +১ করার জায়গাতেই পৌঁছায়, একটি ধাপ বেশি নিয়ে।'),
        L('Once m ≤ n, only +1 steps remain, n − m of them.', 'm ≤ n হলে শুধু +১ ধাপ বাকি, n − m-টি।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int presses = 0;
    while (m > n) {
        if (m % 2 == 0) m /= 2;
        else m++;
        presses++;
    }
    cout << presses + (n - m) << "\n";
    return 0;
}
`,
      time: 'O(log m)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n', 'modulo'],
    },
  ],
  tests: [
    { input: '4 6', output: '2', source: 'sample', note: sample(1) },
    { input: '10 1', output: '9', source: 'sample', note: sample(2) },
    { input: '1 10000', output: '20', source: 'own', note: L('From 1 up to the limit.', '১ থেকে সীমা পর্যন্ত।') },
    { input: '5 5', output: '0', source: 'own', note: L('Already there.', 'আগেই পৌঁছে গেছে।') },
  ],
  pitfalls: [L('Greedy forwards fails: from 3 to 8, doubling first (3 → 6 → 12, then down to 8) takes 6 presses, but 3 → 2 → 4 → 8 takes 3.', 'সামনের দিকে গ্রিডি ব্যর্থ: ৩ থেকে ৮-এ আগে দ্বিগুণ করলে (৩ → ৬ → ১২, তারপর নেমে ৮) ৬টি চাপ লাগে, কিন্তু ৩ → ২ → ৪ → ৮-এ লাগে ৩টি।'), L('No upper limit on BFS values.', 'BFS-এর মানে কোনো ঊর্ধ্বসীমা না রাখা।')],
  related: [{ id: '1020B', name: 'Badge', why: L('Following edges in a graph.', 'গ্রাফে প্রান্ত অনুসরণ।') }],
  toolkit: ['stack-queue', 'while-n'],
};

export const p1020B: ProblemEntry = {
  id: '1020B',
  contestId: 1020,
  index: 'B',
  name: 'Badge',
  rating: 1000,
  tags: ['brute-force', 'dfs', 'graphs'],
  why: L('A functional graph: every vertex has one outgoing edge, so every walk ends in a cycle.', 'একটি ফাংশনাল গ্রাফ: প্রতিটি শীর্ষের একটি বহির্গামী প্রান্ত, তাই প্রতিটি হাঁটা একটি চক্রে শেষ হয়।'),
  statement: L(
    'There are n students; student i, when caught, points at student pᵢ. A teacher starts with student a, makes a hole in their badge, then goes to the student they point at, and so on, until reaching a student who already has a hole; that student gets a second hole. For every starting student a, print who gets two holes.',
    'n জন ছাত্র আছে; ছাত্র i ধরা পড়লে ছাত্র pᵢ-কে দেখায়। একজন শিক্ষক ছাত্র a থেকে শুরু করে তার ব্যাজে একটি ছিদ্র করেন, তারপর যাকে দেখানো হয় তার কাছে যান, এভাবে যতক্ষণ না এমন ছাত্রের কাছে পৌঁছান যার আগেই ছিদ্র আছে; সেই ছাত্র দ্বিতীয় ছিদ্র পায়। প্রতিটি শুরুর ছাত্র a-এর জন্য প্রিন্ট করুন কে দুটি ছিদ্র পায়।',
  ),
  input: L('n, then p₁ … pₙ.', 'n, তারপর p₁ … pₙ।'),
  output: L('n numbers: the answer for a = 1 … n.', 'n-টি সংখ্যা: a = ১ … n-এর উত্তর।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000', '১ ≤ n ≤ ১০০০')] },
  samples: [
    { input: '3\n2 3 2', output: '2 2 3', explain: L('From 1: 1 → 2 → 3 → 2, so 2.', '১ থেকে: ১ → ২ → ৩ → ২, তাই ২।') },
    { input: '3\n1 2 3', output: '1 2 3', explain: L('Everyone points at themselves.', 'সবাই নিজেকে দেখায়।') },
  ],
  observation: L('Following pᵢ from any start must repeat a student within n steps. The first repeated student is the answer.', 'যেকোনো শুরু থেকে pᵢ অনুসরণ করলে n ধাপের মধ্যে কোনো ছাত্র পুনরাবৃত্ত হবেই। প্রথম পুনরাবৃত্ত ছাত্রই উত্তর।'),
  approach: [L('Simulate from every start with a fresh visited array: O(n²) = 10⁶ steps.', 'প্রতিটি শুরু থেকে নতুন visited অ্যারে নিয়ে সিমুলেট করুন: O(n²) = ১০⁶ ধাপ।')],
  walkthrough: { input: '3\n2 3 2', steps: [{ state: 'start 3: 3 → 2 → 3', text: L('3 is repeated: answer 3.', '৩ পুনরাবৃত্ত: উত্তর ৩।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('At most n steps from each of n starts.', 'n-টি শুরুর প্রতিটি থেকে সর্বোচ্চ n ধাপ।') },
  solutions: [
    {
      id: 'simulate',
      kind: 'method',
      title: L('Simulate from every start', 'প্রতিটি শুরু থেকে সিমুলেশন'),
      idea: L('Walk until a visited student appears.', 'দেখা ছাত্র না আসা পর্যন্ত হাঁটুন।'),
      explain: [L('The statement is already an algorithm. Because n ≤ 1000, running it n times is fast. Reset the visited marks for every start.', 'স্টেটমেন্ট নিজেই একটি অ্যালগরিদম। n ≤ ১০০০ হওয়ায় n বার চালানো দ্রুত। প্রতিটি শুরুর জন্য visited চিহ্ন রিসেট করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];
    for (int a = 1; a <= n; a++) {
        vector<bool> holed(n + 1, false);
        int v = a;
        while (!holed[v]) {
            holed[v] = true;
            v = p[v];
        }
        cout << v << (a == n ? '\n' : ' ');
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'while-n'],
    },
    {
      id: 'cycles',
      kind: 'better',
      title: L('Find cycle vertices once', 'একবারে চক্রের শীর্ষ খোঁজা'),
      idea: L('A student on a cycle is their own answer; everyone else gets the answer of the student they point at.', 'চক্রের ওপর থাকা ছাত্র নিজেই নিজের উত্তর; বাকি সবাই যাকে দেখায় তার উত্তর পায়।'),
      explain: [L('Starting on a cycle, the walk returns to the start first. Starting off the cycle, the walk is the same as starting from pₐ, one step later. Compute answers with memoised recursion: O(n) after marking cycle vertices, which is the efficient way for large n.', 'চক্রের ওপর শুরু করলে হাঁটা প্রথমে শুরুতেই ফেরে। চক্রের বাইরে শুরু করলে হাঁটা pₐ থেকে শুরুর মতোই, এক ধাপ পরে। মেমোসহ রিকার্শনে উত্তর হিসাব করুন: চক্রের শীর্ষ চিহ্নিত করার পর O(n), বড় n-এর জন্য এটিই দক্ষ উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];
    // color: 0 unseen, 1 on current walk, 2 finished
    vector<int> color(n + 1, 0), ans(n + 1, 0);
    for (int s = 1; s <= n; s++) {
        if (color[s]) continue;
        vector<int> path;
        int v = s;
        while (color[v] == 0) { color[v] = 1; path.push_back(v); v = p[v]; }
        if (color[v] == 1) {                       // found a new cycle starting at v
            int u = v;
            do { ans[u] = u; u = p[u]; } while (u != v);
        }
        for (int i = (int)path.size() - 1; i >= 0; i--) {
            int w = path[i];
            if (ans[w] == 0) ans[w] = ans[p[w]];
            color[w] = 2;
        }
    }
    for (int a = 1; a <= n; a++) cout << ans[a] << (a == n ? '\n' : ' ');
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3\n2 3 2', output: '2 2 3', source: 'sample', note: sample(1) },
    { input: '3\n1 2 3', output: '1 2 3', source: 'sample', note: sample(2) },
    { input: '1\n1', output: '1', source: 'own', note: L('One student.', 'একজন ছাত্র।') },
    { input: '4\n2 3 4 1', output: '1 2 3 4', source: 'own', note: L('One big cycle.', 'একটি বড় চক্র।') },
  ],
  pitfalls: [L('Not resetting the visited array between starts.', 'শুরুগুলোর মাঝে visited অ্যারে রিসেট না করা।')],
  related: [{ id: '115A', name: 'Party', why: L('Following parent pointers.', 'parent নির্দেশক অনুসরণ।') }],
  toolkit: ['vector'],
};

export const p115A: ProblemEntry = {
  id: '115A',
  contestId: 115,
  index: 'A',
  name: 'Party',
  rating: 900,
  tags: ['dfs', 'graphs', 'trees'],
  featuredFor: ['trees'],
  why: L('The depth of a forest, hidden in a story about bosses.', 'বসদের গল্পে লুকানো একটি বনের গভীরতা।'),
  statement: L(
    'A company has n employees; each has at most one immediate manager (pᵢ, or −1 if none), and there are no cycles. Employee A is a superior of B if A is B’s manager or a superior of B’s manager. Split everyone into the minimum number of groups so that no group contains two people where one is a superior of the other.',
    'একটি কোম্পানিতে n জন কর্মী; প্রত্যেকের সর্বোচ্চ একজন সরাসরি ম্যানেজার (pᵢ, বা না থাকলে −১), আর কোনো চক্র নেই। A হলো B-এর ঊর্ধ্বতন যদি A, B-এর ম্যানেজার হয় বা B-এর ম্যানেজারের ঊর্ধ্বতন হয়। সবাইকে সর্বনিম্ন সংখ্যক দলে ভাগ করুন যাতে কোনো দলে এমন দুজন না থাকে যেখানে একজন অন্যজনের ঊর্ধ্বতন।',
  ),
  input: L('n, then pᵢ for each employee.', 'n, তারপর প্রতিটি কর্মীর pᵢ।'),
  output: L('The minimum number of groups.', 'সর্বনিম্ন দলের সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('1 ≤ n ≤ 2000', '১ ≤ n ≤ ২০০০')] },
  samples: [{ input: '5\n-1\n1\n2\n1\n-1', output: '3', explain: L('The chain 1 → 2 → 3 has three levels.', 'শৃঙ্খল ১ → ২ → ৩-এ তিনটি স্তর।') }],
  observation: L('People on the same level (same depth) are never superiors of each other, so grouping by depth works. A chain of length d needs d different groups. So the answer is the greatest depth.', 'একই স্তরের (একই গভীরতার) মানুষ কখনো একে অপরের ঊর্ধ্বতন নয়, তাই গভীরতা অনুযায়ী দল করা চলে। d দৈর্ঘ্যের একটি শৃঙ্খলে d-টি আলাদা দল লাগে। তাই উত্তর হলো সবচেয়ে বড় গভীরতা।'),
  approach: [L('For each employee, walk up the manager chain and count its length; print the maximum.', 'প্রতিটি কর্মীর জন্য ম্যানেজারের শৃঙ্খল ধরে ওপরে উঠে দৈর্ঘ্য গুনুন; সর্বোচ্চটি প্রিন্ট করুন।')],
  walkthrough: { input: 'p = −1 1 2 1 −1', steps: [{ state: 'depths 1 2 3 2 1', text: L('Max depth 3.', 'সর্বোচ্চ গভীরতা ৩।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('A chain of up to n per employee.', 'প্রতি কর্মীর জন্য সর্বোচ্চ n দৈর্ঘ্যের শৃঙ্খল।') },
  solutions: [
    {
      id: 'walk-up',
      kind: 'method',
      title: L('Walk up from every employee', 'প্রতিটি কর্মী থেকে ওপরে ওঠা'),
      idea: L('depth(i) = number of people on the chain from i to the top.', 'depth(i) = i থেকে শীর্ষ পর্যন্ত শৃঙ্খলে কতজন।'),
      explain: [L('With n ≤ 2000, n chains of length ≤ n is 4·10⁶ steps. This needs no graph code at all, just a loop following pᵢ.', 'n ≤ ২০০০ হলে n-টি ≤ n দৈর্ঘ্যের শৃঙ্খল মানে ৪·১০⁶ ধাপ। এতে কোনো গ্রাফ কোডই লাগে না, শুধু pᵢ অনুসরণের একটি লুপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];
    int best = 0;
    for (int i = 1; i <= n; i++) {
        int d = 0;
        for (int v = i; v != -1; v = p[v]) d++;
        best = max(best, d);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop', 'min-max'],
    },
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('BFS from all roots', 'সব মূল থেকে BFS'),
      idea: L('Build children lists, start BFS from every top manager, and take the deepest level.', 'সন্তানের তালিকা বানিয়ে প্রতিটি শীর্ষ ম্যানেজার থেকে BFS শুরু করুন, আর সবচেয়ে গভীর স্তর নিন।'),
      explain: [L('This is the tree view: the company is a forest, the top managers are roots, and BFS assigns depth[child] = depth[parent] + 1. It runs in O(n), so it would handle n = 2·10⁵ too.', 'এটি ট্রির দৃষ্টিভঙ্গি: কোম্পানি একটি বন, শীর্ষ ম্যানেজাররা মূল, আর BFS depth[child] = depth[parent] + ১ দেয়। এটি O(n)-এ চলে, তাই n = ২·১০⁵-ও সামলাত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> kids(n + 1);
    queue<int> q;
    vector<int> depth(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int p;
        cin >> p;
        if (p == -1) { q.push(i); depth[i] = 1; }
        else kids[p].push_back(i);
    }
    int best = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        best = max(best, depth[v]);
        for (int c : kids[v]) { depth[c] = depth[v] + 1; q.push(c); }
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [
    { input: '5\n-1\n1\n2\n1\n-1', output: '3', source: 'sample', note: sample(1) },
    { input: '1\n-1', output: '1', source: 'own', note: L('One person.', 'একজন।') },
    { input: '4\n-1\n-1\n-1\n-1', output: '1', source: 'own', note: L('No managers at all.', 'কোনো ম্যানেজার নেই।') },
    { input: '4\n2\n3\n4\n-1', output: '4', source: 'own', note: L('One long chain.', 'একটি লম্বা শৃঙ্খল।') },
  ],
  pitfalls: [L('Counting the number of top managers instead of the depth.', 'গভীরতার বদলে শীর্ষ ম্যানেজারের সংখ্যা গোনা।'), L('Starting depth at 0, which gives an answer one too small.', 'গভীরতা ০ থেকে শুরু, যাতে উত্তর এক কম হয়।')],
  related: [{ id: '1020B', name: 'Badge', why: L('Walking along pointers again.', 'আবার নির্দেশক ধরে হাঁটা।') }],
  toolkit: ['stack-queue'],
};

export const p1538C: ProblemEntry = {
  id: '1538C',
  contestId: 1538,
  index: 'C',
  name: 'Number of Pairs',
  rating: 1300,
  tags: ['binary-search', 'data-structures', 'math', 'two-pointers'],
  why: L('Counting pairs in a range by subtracting two “at most” counts, solved with two pointers or binary search.', 'দুটি “সর্বোচ্চ” গণনা বিয়োগ করে একটি পরিসরে জোড়া গোনা, টু পয়েন্টার বা বাইনারি সার্চ দিয়ে।'),
  statement: L(
    'Given an array of n integers and two numbers l and r, count pairs i < j such that l ≤ aᵢ + aⱼ ≤ r. There are t test cases.',
    'n-টি পূর্ণসংখ্যার একটি অ্যারে আর দুটি সংখ্যা l ও r দেওয়া আছে; i < j এমন জোড়া গুনুন যেখানে l ≤ aᵢ + aⱼ ≤ r। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, l, r and the array.', 't; প্রতিটি টেস্টে n, l, r আর অ্যারে।'),
  output: L('The number of pairs for each test.', 'প্রতিটি টেস্টের জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵, Σ n ≤ 2·10⁵', '১ ≤ n ≤ ২·১০⁵, Σ n ≤ ২·১০⁵'), L('1 ≤ l ≤ r ≤ 10⁹, 1 ≤ aᵢ ≤ 10⁹', '১ ≤ l ≤ r ≤ ১০⁹, ১ ≤ aᵢ ≤ ১০⁹')] },
  samples: [
    {
      input: '4\n3 4 7\n5 1 2\n5 5 8\n5 1 2 4 3\n4 100 1000\n1 1 1 1\n5 9 13\n2 5 5 1 1',
      output: '2\n7\n0\n1',
      explain: L('First test: 5 + 1 = 6 and 5 + 2 = 7 fit.', 'প্রথম টেস্ট: ৫ + ১ = ৬ আর ৫ + ২ = ৭ খাপ খায়।'),
    },
  ],
  observation: L('Order of indices does not matter for a sum, so sort. Then count(≤ r) − count(≤ l − 1), where count(≤ x) is the number of pairs with sum at most x.', 'যোগফলে ইনডেক্সের ক্রম গুরুত্বপূর্ণ নয়, তাই সর্ট করুন। তারপর count(≤ r) − count(≤ l − ১), যেখানে count(≤ x) হলো সর্বোচ্চ x যোগফলের জোড়ার সংখ্যা।'),
  approach: [L('count(≤ x) with two pointers from both ends of the sorted array.', 'সাজানো অ্যারের দুই প্রান্ত থেকে টু পয়েন্টার দিয়ে count(≤ x)।')],
  walkthrough: {
    input: 'a = 5 1 2, l = 4, r = 7',
    steps: [
      { state: 'sorted 1 2 5', text: L('count(≤ 7) = 3 (all pairs).', 'count(≤ ৭) = ৩ (সব জোড়া)।') },
      { state: 'count(≤ 3) = 1 (1 + 2)', text: L('3 − 1 = 2.', '৩ − ১ = ২।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('The sort dominates.', 'সর্টই প্রধান।') },
  solutions: [
    {
      id: 'two-pointers',
      kind: 'optimal',
      title: L('Two pointers on the sorted array', 'সাজানো অ্যারেতে টু পয়েন্টার'),
      idea: L('If a[i] + a[j] ≤ x, all of i+1..j pair with i; count j − i and move i.', 'a[i] + a[j] ≤ x হলে i+১..j সবাই i-এর সঙ্গে জোড়া; j − i গুনে i সরান।'),
      explain: [L('With i at the smallest and j at the largest element: if their sum is too big, j is too big for every remaining i, so move j left. Otherwise every k in (i, j] works with i. Each pointer moves at most n times.', 'i সবচেয়ে ছোট আর j সবচেয়ে বড় উপাদানে: যোগফল বেশি হলে বাকি প্রতিটি i-এর জন্য j বেশি বড়, তাই j বামে সরান। না হলে (i, j]-এর প্রতিটি k i-এর সঙ্গে কাজ করে। প্রতিটি পয়েন্টার সর্বোচ্চ n বার সরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long countAtMost(const vector<long long>& a, long long x) {
    long long pairs = 0;
    int i = 0, j = (int)a.size() - 1;
    while (i < j) {
        if (a[i] + a[j] <= x) { pairs += j - i; i++; }
        else j--;
    }
    return pairs;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long l, r;
        cin >> n >> l >> r;
        vector<long long> a(n);
        for (auto& x : a) cin >> x;
        sort(a.begin(), a.end());
        cout << countAtMost(a, r) - countAtMost(a, l - 1) << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'functions', 'io-fast'],
    },
    {
      id: 'binary',
      kind: 'method',
      title: L('Binary search for each element', 'প্রতিটি উপাদানের জন্য বাইনারি সার্চ'),
      idea: L('For each i, partners j > i lie in [l − a[i], r − a[i]]; count them with lower_bound and upper_bound.', 'প্রতিটি i-এর জন্য j > i সঙ্গীরা [l − a[i], r − a[i]]-এ; lower_bound আর upper_bound দিয়ে গুনুন।'),
      explain: [L('Searching only to the right of i (from a.begin() + i + 1) counts each pair once. This version is the most direct translation of the condition and is fast enough at O(n log n).', 'শুধু i-এর ডানে (a.begin() + i + ১ থেকে) খুঁজলে প্রতিটি জোড়া একবার গোনা হয়। এই সংস্করণ শর্তের সবচেয়ে সরাসরি অনুবাদ আর O(n log n)-এ যথেষ্ট দ্রুত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long l, r;
        cin >> n >> l >> r;
        vector<long long> a(n);
        for (auto& x : a) cin >> x;
        sort(a.begin(), a.end());
        long long pairs = 0;
        for (int i = 0; i < n; i++) {
            auto from = a.begin() + i + 1;
            pairs += upper_bound(from, a.end(), r - a[i]) - lower_bound(from, a.end(), l - a[i]);
        }
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check all pairs', 'সব জোড়া দেখা'),
      idea: L('Two loops.', 'দুটি লুপ।'),
      explain: [L('2·10¹⁰ pairs at worst; useful only to check the fast solutions.', 'সবচেয়ে খারাপ ক্ষেত্রে ২·১০¹⁰ জোড়া; শুধু দ্রুত সমাধানগুলো যাচাইয়ে কাজে লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long l, r;
        cin >> n >> l >> r;
        vector<long long> a(n);
        for (auto& x : a) cin >> x;
        long long pairs = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (l <= a[i] + a[j] && a[i] + a[j] <= r) pairs++;
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '4\n3 4 7\n5 1 2\n5 5 8\n5 1 2 4 3\n4 100 1000\n1 1 1 1\n5 9 13\n2 5 5 1 1', output: '2\n7\n0\n1', source: 'sample', note: sample(1) },
    { input: '1\n1 1 10\n5', output: '0', source: 'own', note: L('No pairs at all.', 'কোনো জোড়াই নেই।') },
    { input: '1\n3 2 2\n1 1 1', output: '3', source: 'own', note: L('Every pair has sum exactly 2.', 'প্রতিটি জোড়ার যোগফল ঠিক ২।') },
  ],
  pitfalls: [L('Counting pairs (i, i) or each pair twice.', '(i, i) জোড়া বা প্রতিটি জোড়া দুবার গোনা।'), L('Storing the count in int.', 'গণনা int-এ রাখা।')],
  related: [{ id: '279B', name: 'Books', why: L('Another two-pointer scan.', 'আরেকটি টু-পয়েন্টার স্ক্যান।') }],
  toolkit: ['sort', 'lower-bound'],
};
