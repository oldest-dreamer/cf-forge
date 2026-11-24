import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');
const anyAnswer = L('Any correct answer is accepted.', 'যেকোনো সঠিক উত্তর গ্রহণযোগ্য।');

// ───────────────────────────────────────────── 1468F
export const p1468F: ProblemEntry = {
  id: '1468F',
  contestId: 1468,
  index: 'F',
  name: 'Full Turn',
  rating: 1700,
  tags: ['geometry', 'hashing', 'number-theory'],
  why: L(
    'Everyone turns at the same speed, so relative directions never change. Two people meet eyes iff they look in exactly opposite directions: count pairs of opposite normalized vectors.',
    'সবাই একই গতিতে ঘোরে, তাই আপেক্ষিক দিক কখনো বদলায় না। দুজনের চোখাচোখি হয় যদি ও কেবল যদি তারা ঠিক বিপরীত দিকে তাকায়: বিপরীত স্বাভাবিক ভেক্টরের জোড়া গোনা।',
  ),
  statement: L(
    'n people stand at (xᵢ, yᵢ), each initially looking towards (uᵢ, vᵢ). All of them rotate clockwise at the same angular speed for a full turn. Count the pairs of people who look at each other at the same moment at least once.',
    'n জন মানুষ (xᵢ, yᵢ)-এ দাঁড়িয়ে, প্রত্যেকে শুরুতে (uᵢ, vᵢ)-এর দিকে তাকিয়ে। সবাই একই কৌণিক গতিতে ঘড়ির কাঁটার দিকে একটি পূর্ণ পাক ঘোরে। কতগুলো জোড়া অন্তত একবার একই মুহূর্তে একে অপরের দিকে তাকায়, গুনুন।',
  ),
  input: L('t tests; each has n and n lines x y u v.', 't-টি টেস্ট; প্রতিটিতে n আর n লাইনে x y u v।'),
  output: L('The number of pairs per test.', 'প্রতি টেস্টে জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('sum of n ≤ 10⁵, |coordinates| ≤ 10⁹, positions distinct', 'n-এর যোগফল ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁹, অবস্থান ভিন্ন')] },
  samples: [
    {
      input: '3\n2\n0 0 0 1\n1 0 2 0\n3\n0 0 1 1\n1 1 0 0\n1 0 2 0\n6\n0 0 0 1\n1 0 1 2\n2 0 2 3\n3 0 3 -5\n4 0 4 -5\n5 0 5 -5',
      output: '0\n1\n9',
      explain: L('In the last test three people look up and three look down: 3 · 3 pairs.', 'শেষ টেস্টে তিনজন ওপরে আর তিনজন নিচে তাকায়: ৩ · ৩ জোড়া।'),
    },
  ],
  observation: L(
    'Rotation by the same angle keeps the angle between two gaze directions. A looks at B exactly when A’s direction points from A to B, and then B looks at A iff B’s direction is the opposite one. Since everyone sweeps all directions, any pair with exactly opposite directions meets at some moment, and no other pair ever does.',
    'একই কোণে ঘোরানো দুটি দৃষ্টি-দিকের মধ্যের কোণ রাখে। A ঠিক তখন B-র দিকে তাকায় যখন A-র দিক A থেকে B-র দিকে, আর তখন B A-র দিকে তাকায় যদি ও কেবল যদি B-র দিক ঠিক উল্টো। সবাই সব দিক ঘুরে দেখে বলে ঠিক বিপরীত দিকের যেকোনো জোড়া কোনো এক মুহূর্তে মেলে, আর অন্য কোনো জোড়া কখনো নয়।',
  ),
  approach: [
    L('Direction (u − x, v − y) divided by its gcd.', 'দিক (u − x, v − y), তার gcd দিয়ে ভাগ।'),
    L('Count directions in a map; answer Σ cnt[d] · cnt[−d], each unordered pair once.', 'ম্যাপে দিক গোনা; উত্তর Σ cnt[d] · cnt[−d], প্রতিটি অক্রমিক জোড়া একবার।'),
  ],
  walkthrough: {
    input: 'test 2',
    steps: [
      { state: '(1,1), (−1,−1), (1,0)', text: L('Reduced directions.', 'সরল দিক।') },
      { state: '(1,1) meets (−1,−1): 1 pair', text: L('(1,0) has no opposite.', '(১,০)-এর কোনো বিপরীত নেই।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A gcd and a map update per person.', 'প্রতি জনে একটি gcd আর একটি ম্যাপ আপডেট।') },
  solutions: [
    {
      id: 'opposite',
      kind: 'optimal',
      title: L('Count opposite directions', 'বিপরীত দিক গোনা'),
      idea: L('Reduce by gcd but keep the sign; look up the negated vector.', 'gcd দিয়ে সরল কিন্তু চিহ্ন রেখে; উল্টো ভেক্টর খোঁজা।'),
      explain: [
        L(
          'Unlike lines (where ±d are the same), here the sign matters, so do not normalise it away. Add cnt[−d] when inserting d to count every pair exactly once.',
          'রেখার মতো নয় (যেখানে ±d একই), এখানে চিহ্ন গুরুত্বপূর্ণ, তাই সেটি বাদ দেবেন না। d ঢোকানোর সময় cnt[−d] যোগ করলে প্রতিটি জোড়া ঠিক একবার গোনা হয়।',
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
        map<pair<long long, long long>, long long> cnt;
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            long long x, y, u, v;
            scanf("%lld %lld %lld %lld", &x, &y, &u, &v);
            long long dx = u - x, dy = v - y, g = gcd(llabs(dx), llabs(dy));
            dx /= g, dy /= g;
            auto it = cnt.find({-dx, -dy});
            if (it != cnt.end()) ans += it->second;  // pairs with earlier opposite gazes
            cnt[{dx, dy}]++;
        }
        printf("%lld\n", ans);
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
      id: 'sort',
      kind: 'method',
      title: L('Sort reduced directions, match d with −d', 'সরল দিক সাজিয়ে d-কে −d-এর সঙ্গে মেলানো'),
      idea: L('Group equal directions by sorting, then binary search for the opposite group.', 'সাজিয়ে সমান দিক দলে, তারপর বিপরীত দল বাইনারি সার্চে।'),
      explain: [L('The hash-map-free version of the same count, using equal_range on a sorted vector.', 'একই গণনার হ্যাশ-ম্যাপহীন রূপ, সাজানো ভেক্টরে equal_range ব্যবহার করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<pair<long long, long long>> d(n);
        for (auto& [dx, dy] : d) {
            long long x, y, u, v;
            scanf("%lld %lld %lld %lld", &x, &y, &u, &v);
            dx = u - x, dy = v - y;
            long long g = gcd(llabs(dx), llabs(dy));
            dx /= g, dy /= g;
        }
        sort(d.begin(), d.end());
        long long ans = 0;
        for (size_t i = 0, j; i < d.size(); i = j) {
            j = i;
            while (j < d.size() && d[j] == d[i]) j++;
            auto [lo, hi] = equal_range(d.begin(), d.end(), make_pair(-d[i].first, -d[i].second));
            ans += (long long)(j - i) * (hi - lo);
        }
        printf("%lld\n", ans / 2);  // each pair seen from both sides
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'structured-bindings'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every pair with cross and dot products', 'ক্রস আর ডট গুণফলে প্রতিটি জোড়া যাচাই'),
      idea: L('Opposite ⇔ cross = 0 and dot < 0.', 'বিপরীত ⇔ ক্রস = ০ আর ডট < ০।'),
      explain: [L('No gcd at all; O(n²) for small tests.', 'কোনো gcd নেই; ছোট টেস্টে O(n²)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> dx(n), dy(n);
        for (int i = 0; i < n; i++) {
            long long x, y, u, v;
            cin >> x >> y >> u >> v;
            dx[i] = u - x, dy[i] = v - y;
        }
        long long ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (dx[i] * dy[j] - dy[i] * dx[j] == 0 && dx[i] * dx[j] + dy[i] * dy[j] < 0) ans++;
        cout << ans << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    {
      input: '3\n2\n0 0 0 1\n1 0 2 0\n3\n0 0 1 1\n1 1 0 0\n1 0 2 0\n6\n0 0 0 1\n1 0 1 2\n2 0 2 3\n3 0 3 -5\n4 0 4 -5\n5 0 5 -5',
      output: '0\n1\n9',
      source: 'sample',
      note: sample(1),
    },
  ],
  pitfalls: [
    L('Normalising the sign as for lines: opposite gazes would merge.', 'রেখার মতো চিহ্ন স্বাভাবিক করা: বিপরীত দৃষ্টি মিশে যেত।'),
    L('Counting pairs with the same direction: they never face each other.', 'একই দিকের জোড়া গোনা: তারা কখনো মুখোমুখি হয় না।'),
  ],
  related: [
    { id: '514B', name: 'Han Solo and Lazer Gun', why: L('Normalized directions by gcd.', 'gcd দিয়ে স্বাভাবিক দিক।') },
    { id: '1163C2', name: 'Power Transmission (Hard Edition)', why: L('Counting with normalized lines.', 'স্বাভাবিক রেখা দিয়ে গোনা।') },
  ],
  toolkit: ['map', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 1163C2
export const p1163C2: ProblemEntry = {
  id: '1163C2',
  contestId: 1163,
  index: 'C2',
  name: 'Power Transmission (Hard Edition)',
  rating: 1900,
  tags: ['data-structures', 'geometry', 'implementation', 'math'],
  why: L(
    'Represent a line exactly as integers (a, b, c) with a canonical sign, deduplicate, then count non-parallel pairs as “all pairs minus parallel pairs”.',
    'একটি রেখাকে পূর্ণসংখ্যা (a, b, c) হিসেবে নির্দিষ্ট চিহ্নসহ নির্ভুলভাবে প্রকাশ করুন, পুনরাবৃত্তি বাদ দিন, তারপর অসমান্তরাল জোড়া গুনুন “সব জোড়া বিয়োগ সমান্তরাল জোড়া” হিসেবে।',
  ),
  statement: L(
    'n distinct poles stand on a plane. Every two poles are connected by a wire, an infinite straight line; poles on one line share a single wire. Count the pairs of wires that intersect.',
    'সমতলে n-টি ভিন্ন খুঁটি। প্রতি দুটি খুঁটি একটি তার দিয়ে যুক্ত, একটি অসীম সরলরেখা; এক রেখার খুঁটিগুলো একটিই তার ভাগ করে। কতগুলো তার-জোড়া ছেদ করে, গুনুন।',
  ),
  input: L('n, then n lines xᵢ yᵢ.', 'n, তারপর n লাইনে xᵢ yᵢ।'),
  output: L('The number of intersecting pairs.', 'ছেদকারী জোড়ার সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n ≤ 1000, |coordinates| ≤ 10⁴', 'n ≤ ১০০০, |স্থানাঙ্ক| ≤ ১০⁴')] },
  samples: [
    { input: '4\n0 0\n1 1\n0 3\n1 2', output: '14', explain: L('6 wires, one pair of them parallel: 15 − 1.', '৬টি তার, তাদের এক জোড়া সমান্তরাল: ১৫ − ১।') },
    { input: '4\n0 0\n0 2\n0 4\n2 0', output: '6', explain: L('The three collinear poles share one wire: 4 wires, all crossing.', 'একরেখীয় তিন খুঁটির একটিই তার: ৪টি তার, সব ছেদ করে।') },
    { input: '3\n-1 -1\n1 0\n3 1', output: '0', explain: L('All on one line: a single wire.', 'সব এক রেখায়: একটিই তার।') },
  ],
  observation: L(
    'The line through P and Q is a·x + b·y = c with a = Qy − Py, b = Px − Qx, c = a·Px + b·Py. Divide by gcd(a, b) and make (a, b) start positive: equal lines then have equal triples, and parallel lines have equal (a, b). Two distinct lines intersect iff they are not parallel.',
    'P আর Q দিয়ে যাওয়া রেখা a·x + b·y = c, যেখানে a = Qy − Py, b = Px − Qx, c = a·Px + b·Py। gcd(a, b) দিয়ে ভাগ করে (a, b)-কে ধনাত্মক দিয়ে শুরু করান: তখন সমান রেখার ত্রয়ী সমান, আর সমান্তরাল রেখার (a, b) সমান। দুটি ভিন্ন রেখা ছেদ করে যদি ও কেবল যদি সমান্তরাল না হয়।',
  ),
  approach: [
    L('Insert the canonical (a, b, c) of every pair into a set.', 'প্রতিটি জোড়ার নির্দিষ্ট (a, b, c) একটি সেটে রাখা।'),
    L('With L lines and kᵢ lines per direction: L(L − 1)/2 − Σ kᵢ(kᵢ − 1)/2.', 'L-টি রেখা আর প্রতি দিকে kᵢ-টি রেখা হলে: L(L − ১)/২ − Σ kᵢ(kᵢ − ১)/২।'),
  ],
  walkthrough: {
    input: '(0,0), (1,1), (0,3), (1,2)',
    steps: [
      { state: '6 distinct wires', text: L('No three poles collinear.', 'কোনো তিন খুঁটি একরেখীয় নয়।') },
      { state: '(0,0)–(1,1) ∥ … no; (0,0)–(0,3) ∥ (1,1)–(1,2): one parallel pair', text: L('15 − 1 = 14.', '১৫ − ১ = ১৪।') },
    ],
  },
  complexity: { time: 'O(n² log n)', space: 'O(n²)', why: L('About 5·10⁵ lines in a set.', 'সেটে প্রায় ৫·১০⁵টি রেখা।') },
  solutions: [
    {
      id: 'canonical',
      kind: 'optimal',
      title: L('Canonical lines, minus parallel pairs', 'নির্দিষ্ট রেখা, বিয়োগ সমান্তরাল জোড়া'),
      idea: L('Set of (a, b, c), map of (a, b).', '(a, b, c)-এর সেট, (a, b)-এর ম্যাপ।'),
      explain: [
        L(
          'Integer line coefficients avoid every floating-point issue. The sign rule (a > 0, or a = 0 and b > 0) picks one of the two equivalent triples (a, b, c) and (−a, −b, −c).',
          'পূর্ণসংখ্যা রেখা-সহগ সব দশমিক সমস্যা এড়ায়। চিহ্নের নিয়ম (a > ০, বা a = ০ আর b > ০) দুটি সমতুল্য ত্রয়ী (a, b, c) আর (−a, −b, −c)-এর একটি বাছে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    set<tuple<long long, long long, long long>> lines;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            long long a = y[j] - y[i], b = x[i] - x[j];
            long long g = gcd(llabs(a), llabs(b));
            a /= g, b /= g;
            if (a < 0 || (a == 0 && b < 0)) a = -a, b = -b;
            lines.insert({a, b, a * x[i] + b * y[i]});
        }
    map<pair<long long, long long>, long long> dir;
    for (auto& [a, b, c] : lines) dir[{a, b}]++;
    long long L = lines.size(), ans = L * (L - 1) / 2;
    for (auto& [d, k] : dir) ans -= k * (k - 1) / 2;
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n² log n)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['set', 'map', 'gcd-lcm', 'structured-bindings'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Deduplicate by collinearity, compare every pair of wires', 'একরেখীয়তায় পুনরাবৃত্তি বাদ, প্রতিটি তার-জোড়া তুলনা'),
      idea: L('A wire is new if no earlier wire contains both of its poles; then test all pairs for parallelism.', 'একটি তার নতুন যদি আগের কোনো তারে তার দুই খুঁটি না থাকে; তারপর সব জোড়ায় সমান্তরালতা যাচাই।'),
      explain: [L('Only cross products, no normal form: an independent check for small n.', 'শুধু ক্রস গুণফল, কোনো নির্দিষ্ট রূপ নেই: ছোট n-এর স্বাধীন যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    auto col = [&](int a, int b, int c) { return (x[b] - x[a]) * (y[c] - y[a]) - (y[b] - y[a]) * (x[c] - x[a]) == 0; };
    vector<pair<int, int>> w;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            bool seen = false;
            for (auto [p, q] : w) if (col(p, q, i) && col(p, q, j)) seen = true;
            if (!seen) w.push_back({i, j});
        }
    long long ans = 0;
    for (size_t a = 0; a < w.size(); a++)
        for (size_t b = a + 1; b < w.size(); b++) {
            auto [p, q] = w[a];
            auto [r, s] = w[b];
            long long cr = (x[q] - x[p]) * (y[s] - y[r]) - (y[q] - y[p]) * (x[s] - x[r]);
            ans += cr != 0;
        }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['lambda', 'pair'],
    },
  ],
  tests: [
    { input: '4\n0 0\n1 1\n0 3\n1 2', output: '14', source: 'sample', note: sample(1) },
    { input: '4\n0 0\n0 2\n0 4\n2 0', output: '6', source: 'sample', note: sample(2) },
    { input: '3\n-1 -1\n1 0\n3 1', output: '0', source: 'sample', note: sample(3) },
  ],
  pitfalls: [
    L('Counting the same wire several times when three or more poles are collinear.', 'তিন বা বেশি খুঁটি একরেখীয় হলে একই তার কয়েকবার গোনা।'),
    L('Using slopes as doubles.', 'ঢালকে double হিসেবে নেওয়া।'),
  ],
  related: [
    { id: '514B', name: 'Han Solo and Lazer Gun', why: L('Canonical directions.', 'নির্দিষ্ট দিক।') },
    { id: '1468F', name: 'Full Turn', why: L('Counting pairs of normalized vectors.', 'স্বাভাবিক ভেক্টরের জোড়া গোনা।') },
  ],
  toolkit: ['set', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 600D
export const p600D: ProblemEntry = {
  id: '600D',
  contestId: 600,
  index: 'D',
  name: 'Area of Two Circles’ Intersection',
  rating: 2000,
  tags: ['geometry'],
  why: L(
    'A textbook formula that only works with care: two circular segments, three cases, and long double because coordinates reach 10⁹ and the answer can be tiny.',
    'একটি পাঠ্যবইয়ের সূত্র যা শুধু যত্নে কাজ করে: দুটি বৃত্তখণ্ড, তিনটি কেস, আর long double, কারণ স্থানাঙ্ক ১০⁹ পর্যন্ত আর উত্তর খুব ছোট হতে পারে।',
  ),
  statement: L(
    'Two circles are given by centre and radius. Find the area of their intersection.',
    'কেন্দ্র আর ব্যাসার্ধ দিয়ে দুটি বৃত্ত দেওয়া। তাদের ছেদের ক্ষেত্রফল বের করুন।',
  ),
  input: L('x₁ y₁ r₁, then x₂ y₂ r₂.', 'x₁ y₁ r₁, তারপর x₂ y₂ r₂।'),
  output: L('The area.', 'ক্ষেত্রফল।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|coordinates| ≤ 10⁹, 1 ≤ r ≤ 10⁹', '|স্থানাঙ্ক| ≤ ১০⁹, ১ ≤ r ≤ ১০⁹'), realAnswer] },
  samples: [
    { input: '0 0 4\n6 0 4', output: '7.25298806364175601379', explain: L('Two equal circular segments.', 'দুটি সমান বৃত্তখণ্ড।') },
    { input: '0 0 5\n11 0 5', output: '0.00000000000000000000', explain: L('Too far apart.', 'অনেক দূরে।') },
  ],
  observation: L(
    'Let d be the distance between centres. If d ≥ r₁ + r₂ the area is 0; if d ≤ |r₁ − r₂| the smaller circle is inside: π·min(r)². Otherwise the lens is two circular segments; for circle i, the half-angle αᵢ satisfies cos αᵢ = (d² + rᵢ² − r_other²) / (2·d·rᵢ), and its segment has area rᵢ²·(αᵢ − sin αᵢ cos αᵢ).',
    'কেন্দ্রদ্বয়ের দূরত্ব d হোক। d ≥ r₁ + r₂ হলে ক্ষেত্রফল ০; d ≤ |r₁ − r₂| হলে ছোট বৃত্ত ভেতরে: π·min(r)²। নইলে লেন্সটি দুটি বৃত্তখণ্ড; বৃত্ত i-এর অর্ধ-কোণ αᵢ-এর জন্য cos αᵢ = (d² + rᵢ² − অন্য_r²) / (২·d·rᵢ), আর তার খণ্ডের ক্ষেত্রফল rᵢ²·(αᵢ − sin αᵢ cos αᵢ)।',
  ),
  approach: [
    L('Work in long double; compute d² exactly in integers first.', 'long double-এ কাজ; d² আগে পূর্ণসংখ্যায় নির্ভুলভাবে।'),
    L('Handle the two containment cases, then add the two segments.', 'দুটি অন্তর্ভুক্তি কেস সামলে, তারপর দুটি খণ্ড যোগ।'),
  ],
  walkthrough: {
    input: 'r = 4, 4, d = 6',
    steps: [
      { state: 'cos α = 36 / 48 = 0.75, α ≈ 0.7227', text: L('Same for both circles.', 'দুই বৃত্তেই একই।') },
      { state: '2 · 16 · (0.7227 − 0.75 · 0.6614) ≈ 7.253', text: L('Two equal segments.', 'দুটি সমান খণ্ড।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A few trigonometric calls.', 'কয়েকটি ত্রিকোণমিতিক কল।') },
  solutions: [
    {
      id: 'segments',
      kind: 'optimal',
      title: L('Two circular segments in long double', 'long double-এ দুটি বৃত্তখণ্ড'),
      idea: L('Area = Σ rᵢ²(αᵢ − sin αᵢ cos αᵢ).', 'ক্ষেত্রফল = Σ rᵢ²(αᵢ − sin αᵢ cos αᵢ)।'),
      explain: [
        L(
          'With r up to 10⁹ the areas are near 10¹⁸ and doubles keep only about 16 digits, so tiny lenses lose all precision. long double (about 19 digits) and computing d² as an exact integer are what make this pass.',
          'r ১০⁹ পর্যন্ত হলে ক্ষেত্রফল প্রায় ১০¹⁸ আর double মাত্র প্রায় ১৬ অঙ্ক রাখে, তাই ক্ষুদ্র লেন্সে সব নির্ভুলতা হারায়। long double (প্রায় ১৯ অঙ্ক) আর d²-কে নির্ভুল পূর্ণসংখ্যায় হিসাব করাই এটিকে পাস করায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    long long x1, y1, r1, x2, y2, r2;
    cin >> x1 >> y1 >> r1 >> x2 >> y2 >> r2;
    long long dx = x1 - x2, dy = y1 - y2;
    ld d2 = (ld)dx * dx + (ld)dy * dy, d = sqrtl(d2);
    const ld PI = acosl(-1);
    if (d >= r1 + r2) { printf("%.20Lf\n", (ld)0); return 0; }
    if (d <= llabs(r1 - r2)) {
        ld r = min(r1, r2);
        printf("%.20Lf\n", PI * r * r);
        return 0;
    }
    auto segment = [&](ld r, ld R) {
        ld c = (d2 + r * r - R * R) / (2 * d * r);
        c = max((ld)-1, min((ld)1, c));
        ld a = acosl(c);
        return r * r * (a - sinl(a) * cosl(a));
    };
    printf("%.20Lf\n", segment(r1, r2) + segment(r2, r1));
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'lambda', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Numerical integration of the overlap', 'ওভারল্যাপের সংখ্যাগত সমাকলন'),
      idea: L('Integrate the overlap height over x with Simpson’s rule.', 'সিম্পসনের নিয়মে x-এর ওপর ওভারল্যাপের উচ্চতা সমাকলন।'),
      explain: [L('No geometry formulas at all: at each x the overlap of two vertical chords. Accurate for small circles, a cross-check of the formula.', 'কোনো জ্যামিতি সূত্র নেই: প্রতিটি x-এ দুটি উল্লম্ব জ্যার ওভারল্যাপ। ছোট বৃত্তে নির্ভুল, সূত্রের পাল্টা যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    ld x1, y1, r1, x2, y2, r2;
    cin >> x1 >> y1 >> r1 >> x2 >> y2 >> r2;
    if (r1 > 50 || r2 > 50) { cout << "\n"; return 0; }
    auto h = [&](ld x) {
        auto chord = [&](ld cx, ld cy, ld r, ld& lo, ld& hi) {
            ld t = r * r - (x - cx) * (x - cx);
            if (t <= 0) return false;
            lo = cy - sqrtl(t), hi = cy + sqrtl(t);
            return true;
        };
        ld a, b, c, d;
        if (!chord(x1, y1, r1, a, b) || !chord(x2, y2, r2, c, d)) return (ld)0;
        return max((ld)0, min(b, d) - max(a, c));
    };
    ld lo = max(x1 - r1, x2 - r2), hi = min(x1 + r1, x2 + r2);
    if (lo >= hi) { printf("%.10Lf\n", (ld)0); return 0; }
    int N = 2000000;
    ld step = (hi - lo) / N, s = h(lo) + h(hi);
    for (int i = 1; i < N; i++) s += h(lo + i * step) * (i % 2 ? 4 : 2);
    printf("%.10Lf\n", s * step / 3);
    return 0;
}
`,
      time: 'O(N)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['setprecision', 'lambda'],
    },
  ],
  tests: [
    { input: '0 0 4\n6 0 4', output: '7.25298806364175601379', source: 'sample', note: sample(1) },
    { input: '0 0 5\n11 0 5', output: '0.00000000000000000000', source: 'sample', note: sample(2) },
    { input: '0 0 1\n0 0 3', output: '3.14159265358979323846', source: 'own', note: L('Concentric: the small circle.', 'সমকেন্দ্রিক: ছোট বৃত্ত।') },
  ],
  pitfalls: [
    L('Using double: large equal circles that barely overlap lose all precision.', 'double ব্যবহার: সামান্য ওভারল্যাপ করা বড় বৃত্তে সব নির্ভুলতা হারায়।'),
    L('Computing dx² + dy² in long long: (2·10⁹)² · 2 overflows.', 'long long-এ dx² + dy²: (২·১০⁹)² · ২ উপচে পড়ে।'),
    L('Forgetting to clamp the cosine to [−1, 1] before acos.', 'acos-এর আগে কোসাইনকে [−১, ১]-এ সীমিত না করা।'),
  ],
  related: [
    { id: '935C', name: 'Fifa and Fafa', why: L('Circles inside circles.', 'বৃত্তের ভেতরে বৃত্ত।') },
    { id: '1C', name: 'Ancient Berland Circus', why: L('Circle geometry with care for precision.', 'নির্ভুলতার যত্নসহ বৃত্ত জ্যামিতি।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 1354C2
export const p1354C2: ProblemEntry = {
  id: '1354C2',
  contestId: 1354,
  index: 'C2',
  name: 'Not So Simple Polygon Embedding',
  rating: 2000,
  tags: ['binary-search', 'brute-force', 'geometry', 'math'],
  why: L(
    'Now 2n is not a multiple of 4, so the polygon cannot sit flat on all four sides. The best tilt is the half-step angle, which gives a cos/sin formula; ternary search confirms it numerically.',
    'এবার ২n চারের গুণিতক নয়, তাই বহুভুজ চার বাহুতেই সমতলভাবে বসতে পারে না। সেরা হেলানো হলো অর্ধ-ধাপের কোণ, যা একটি cos/sin সূত্র দেয়; টার্নারি সার্চ সংখ্যাগতভাবে তা নিশ্চিত করে।',
  ),
  statement: L(
    'A regular polygon with 2n vertices has sides of length 1, and n is odd. Find the side of the smallest square containing it (rotation allowed).',
    '২n শীর্ষের সুষম বহুভুজের বাহুর দৈর্ঘ্য ১, আর n বিজোড়। একে ধারণ করা সবচেয়ে ছোট বর্গের বাহু বের করুন (ঘোরানো যায়)।',
  ),
  input: L('T, then T odd values of n.', 'T, তারপর T-টি বিজোড় n।'),
  output: L('The square’s side for each test.', 'প্রতিটি টেস্টে বর্গের বাহু।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 199, n odd', '৩ ≤ n ≤ ১৯৯, n বিজোড়'), realAnswer] },
  samples: [
    { input: '3\n3\n5\n199', output: '1.931851653\n3.196226611\n126.687663595', explain: L('n = 3 is the regular hexagon.', 'n = ৩ হলো সুষম ষড়ভুজ।') },
  ],
  observation: L(
    'With 2n ≡ 2 (mod 4) the bounding box is minimal when the polygon is turned by π/(4n) from the position with a vertex on an axis; then width and height are equal, both 2R·cos(π/(4n)) with circumradius R = 1 / (2 sin(π/(2n))). So the answer is cos(π/(4n)) / sin(π/(2n)).',
    '২n ≡ ২ (mod ৪) হলে বাউন্ডিং বক্স ন্যূনতম যখন বহুভুজকে অক্ষে শীর্ষ থাকা অবস্থান থেকে π/(৪n) ঘোরানো হয়; তখন প্রস্থ আর উচ্চতা সমান, দুটোই ২R·cos(π/(৪n)), পরিব্যাসার্ধ R = ১ / (২ sin(π/(২n)))। তাই উত্তর cos(π/(৪n)) / sin(π/(২n))।',
  ),
  approach: [L('Apply the formula; or ternary-search the angle as in the easy version.', 'সূত্র প্রয়োগ; অথবা সহজ সংস্করণের মতো কোণে টার্নারি সার্চ।')],
  walkthrough: {
    input: 'n = 3 (hexagon, R = 1)',
    steps: [
      { state: 'cos(15°) / sin(30°) = 0.9659 / 0.5', text: L('≈ 1.9319.', '≈ ১.৯৩১৯।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('One formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Tilt by π/(4n)', 'π/(৪n) হেলানো'),
      idea: L('Answer = cos(π/4n) / sin(π/2n).', 'উত্তর = cos(π/৪n) / sin(π/২n)।'),
      explain: [
        L(
          'By symmetry the box’s width at angle θ equals its height at θ + π/2; the best angle balances them, which happens halfway between the vertex-aligned positions.',
          'প্রতিসাম্যে θ কোণে বক্সের প্রস্থ θ + π/২-এ উচ্চতার সমান; সেরা কোণ এদের সমান করে, যা শীর্ষ-সমান্তরাল অবস্থানগুলোর ঠিক মাঝে ঘটে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int n;
        scanf("%d", &n);
        printf("%.9f\n", cos(M_PI / (4 * n)) / sin(M_PI / (2 * n)));
    }
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
      kind: 'method',
      title: L('Ternary search on the angle', 'কোণের ওপর টার্নারি সার্চ'),
      idea: L('Minimize max(width, height) over θ ∈ [0, π/(2n)].', 'θ ∈ [০, π/(২n)]-এ max(প্রস্থ, উচ্চতা) ন্যূনতম।'),
      explain: [L('The same code as for the easy version: it never needed n to be even.', 'সহজ সংস্করণের একই কোড: এতে কখনো n জোড় হওয়ার দরকার ছিল না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        int m = 2 * n;
        double R = 0.5 / sin(M_PI / m);
        auto side = [&](double th) {
            double lx = 1e18, hx = -1e18, ly = 1e18, hy = -1e18;
            for (int i = 0; i < m; i++) {
                double a = th + 2 * M_PI * i / m;
                lx = min(lx, R * cos(a)), hx = max(hx, R * cos(a));
                ly = min(ly, R * sin(a)), hy = max(hy, R * sin(a));
            }
            return max(hx - lx, hy - ly);
        };
        double lo = 0, hi = M_PI / m;
        for (int it = 0; it < 100; it++) {
            double a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
            if (side(a) < side(b)) hi = b; else lo = a;
        }
        printf("%.9f\n", side((lo + hi) / 2));
    }
    return 0;
}
`,
      time: 'O(T · n · iterations)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
  ],
  tests: [
    { input: '3\n3\n5\n199', output: '1.931851653\n3.196226611\n126.687663595', source: 'sample', note: sample(1) },
    { input: '1\n7', output: '4.465702177', source: 'own', note: L('The regular 14-gon.', 'সুষম ১৪-ভুজ।') },
  ],
  pitfalls: [
    L('Reusing the even-n formula 1 / tan(π/2n): it is too small for odd n.', 'জোড় n-এর সূত্র ১ / tan(π/২n) আবার ব্যবহার: বিজোড় n-এ তা খুব ছোট।'),
    L('Searching θ over a range that misses the optimal tilt.', 'এমন পরিসরে θ খোঁজা যা সেরা হেলানো বাদ দেয়।'),
  ],
  related: [
    { id: '1354C1', name: 'Simple Polygon Embedding', why: L('The even case.', 'জোড় কেস।') },
    { id: '578C', name: 'Weakness and Poorness', why: L('Ternary search on a unimodal function.', 'একশিখর ফাংশনে টার্নারি সার্চ।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 340B
export const p340B: ProblemEntry = {
  id: '340B',
  contestId: 340,
  index: 'B',
  name: 'Maximal Area Quadrilateral',
  rating: 2100,
  tags: ['brute-force', 'geometry'],
  why: L(
    'Every quadrilateral is split by a diagonal into two triangles on opposite sides. Fix the diagonal and choose the best point on each side independently: O(n³) instead of O(n⁴).',
    'প্রতিটি চতুর্ভুজ একটি কর্ণ দিয়ে বিপরীত পাশের দুটি ত্রিভুজে ভাগ হয়। কর্ণ ঠিক করে প্রতিটি পাশে আলাদাভাবে সেরা বিন্দু বাছুন: O(n⁴)-এর বদলে O(n³)।',
  ),
  statement: L(
    'n points are given, no three collinear. Find the maximum area of a quadrilateral (a simple polygon, not necessarily convex) with all four vertices among the points.',
    'n-টি বিন্দু দেওয়া, কোনো তিনটি একরেখীয় নয়। চারটি শীর্ষই বিন্দুগুলোর মধ্যে এমন চতুর্ভুজের (সরল বহুভুজ, উত্তল হতে হবে না) সর্বোচ্চ ক্ষেত্রফল বের করুন।',
  ),
  input: L('n, then n lines xᵢ yᵢ.', 'n, তারপর n লাইনে xᵢ yᵢ।'),
  output: L('The maximum area.', 'সর্বোচ্চ ক্ষেত্রফল।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('4 ≤ n ≤ 300, |coordinates| ≤ 1000', '৪ ≤ n ≤ ৩০০, |স্থানাঙ্ক| ≤ ১০০০'), realAnswer] },
  samples: [
    { input: '5\n0 0\n0 4\n4 0\n4 4\n2 3', output: '16.000000', explain: L('The square of the four corners.', 'চার কোণের বর্গ।') },
  ],
  observation: L(
    'Any simple quadrilateral has a diagonal that lies inside it and splits it into two triangles with the other two vertices on opposite sides of that diagonal. So area = max over diagonals (i, j) of (best triangle area on the left) + (best on the right).',
    'যেকোনো সরল চতুর্ভুজের এমন একটি কর্ণ আছে যা ভেতরে থাকে আর অন্য দুই শীর্ষকে বিপরীত পাশে রেখে একে দুটি ত্রিভুজে ভাগ করে। তাই ক্ষেত্রফল = কর্ণ (i, j)-এর ওপর (বামের সেরা ত্রিভুজ) + (ডানের সেরা) এর সর্বোচ্চ।',
  ),
  approach: [
    L('For each pair (i, j), scan all k: track the max positive and the max negative cross product.', 'প্রতিটি জোড়া (i, j)-এ সব k স্ক্যান: সর্বোচ্চ ধনাত্মক আর সর্বোচ্চ ঋণাত্মক ক্রস গুণফল রাখা।'),
    L('If both sides have a point, candidate = (left + right) / 2.', 'দুই পাশেই বিন্দু থাকলে প্রার্থী = (বাম + ডান) / ২।'),
  ],
  walkthrough: {
    input: 'corners of [0,4]² and (2,3)',
    steps: [
      { state: 'diagonal (0,0)–(4,4): left best (0,4) area 8, right best (4,0) area 8', text: L('16.', '১৬।') },
    ],
  },
  complexity: { time: 'O(n³)', space: 'O(n)', why: L('2.7·10⁷ cross products.', '২.৭·১০⁷টি ক্রস গুণফল।') },
  solutions: [
    {
      id: 'diagonal',
      kind: 'optimal',
      title: L('Fix the diagonal, best point per side', 'কর্ণ ঠিক করে প্রতি পাশে সেরা বিন্দু'),
      idea: L('max over (i, j) of maxLeft + maxRight.', '(i, j)-এর ওপর maxLeft + maxRight-এর সর্বোচ্চ।'),
      explain: [
        L(
          'The two sides are independent once the diagonal is fixed, which removes one nested loop. Work with doubled areas (cross products) in integers and divide by 2 once at the end.',
          'কর্ণ ঠিক হলে দুই পাশ স্বাধীন, যা একটি নেস্টেড লুপ সরায়। পূর্ণসংখ্যায় দ্বিগুণ ক্ষেত্রফল (ক্রস গুণফল) নিয়ে কাজ করে শেষে একবার ২ দিয়ে ভাগ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    long long best = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            long long left = 0, right = 0;  // doubled triangle areas
            for (int k = 0; k < n; k++) {
                long long cr = (x[j] - x[i]) * (y[k] - y[i]) - (y[j] - y[i]) * (x[k] - x[i]);
                if (cr > 0) left = max(left, cr);
                else if (cr < 0) right = max(right, -cr);
            }
            if (left && right) best = max(best, left + right);
        }
    printf("%.6f\n", best / 2.0);
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All quadruples, all six diagonals', 'সব চতুষ্টয়, ছয়টি কর্ণ'),
      idea: L('For every 4 points try each of the 6 pairs as the diagonal, with the other two on opposite sides.', 'প্রতি ৪টি বিন্দুতে ৬টি জোড়ার প্রতিটিকে কর্ণ ধরে, বাকি দুটি বিপরীত পাশে।'),
      explain: [L('O(n⁴): checks the same principle by exhaustive enumeration.', 'O(n⁴): একই নীতি সম্পূর্ণ গণনায় যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    auto cr = [&](int a, int b, int c) { return (x[b] - x[a]) * (y[c] - y[a]) - (y[b] - y[a]) * (x[c] - x[a]); };
    long long best = 0;
    for (int a = 0; a < n; a++)
        for (int b = a + 1; b < n; b++)
            for (int c = b + 1; c < n; c++)
                for (int d = c + 1; d < n; d++) {
                    int p[4] = {a, b, c, d};
                    int split[6][4] = {{0, 1, 2, 3}, {2, 3, 0, 1}, {0, 2, 1, 3}, {1, 3, 0, 2}, {0, 3, 1, 2}, {1, 2, 0, 3}};
                    for (auto& s : split) {  // diagonal s[0]-s[1], other vertices s[2], s[3]
                        long long u = cr(p[s[0]], p[s[1]], p[s[2]]), v = cr(p[s[0]], p[s[1]], p[s[3]]);
                        if ((u > 0 && v < 0) || (u < 0 && v > 0)) best = max(best, llabs(u) + llabs(v));
                    }
                }
    printf("%.6f\n", best / 2.0);
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '5\n0 0\n0 4\n4 0\n4 4\n2 3', output: '16.000000', source: 'sample', note: sample(1) },
    { input: '4\n0 0\n10 0\n0 10\n2 2', output: '40.000000', source: 'own', note: L('A concave quadrilateral: 50 − 10.', 'একটি অবতল চতুর্ভুজ: ৫০ − ১০।') },
  ],
  pitfalls: [
    L('Assuming the answer is a convex hull quadrilateral: with an interior point the best one can be concave.', 'উত্তরকে উত্তল আবরণের চতুর্ভুজ ধরা: ভেতরের বিন্দু থাকলে সেরাটি অবতল হতে পারে।'),
    L('Accepting a diagonal with both other points on the same side.', 'অন্য দুই বিন্দু একই পাশে এমন কর্ণ গ্রহণ।'),
  ],
  related: [
    { id: '618C', name: 'Constellation', why: L('Triangle areas from cross products.', 'ক্রস গুণফল থেকে ত্রিভুজের ক্ষেত্রফল।') },
    { id: '166B', name: 'Polygons', why: L('Orientation tests.', 'অভিমুখ যাচাই।') },
  ],
  toolkit: ['long-long'],
};

// ───────────────────────────────────────────── 166B
export const p166B: ProblemEntry = {
  id: '166B',
  contestId: 166,
  index: 'B',
  name: 'Polygons',
  rating: 2100,
  tags: ['geometry', 'sortings'],
  why: L(
    'Point-in-convex-polygon in O(log n): split the polygon into a fan of triangles from one vertex and binary search the wedge. A must-know routine.',
    'O(log n)-এ উত্তল বহুভুজে বিন্দু: একটি শীর্ষ থেকে বহুভুজকে ত্রিভুজের পাখায় ভাগ করে কীলক বাইনারি সার্চ। অবশ্যই জানার মতো রুটিন।',
  ),
  statement: L(
    'Polygon A is strictly convex with n vertices, polygon B is simple with m vertices; both are given clockwise. Is B strictly inside A (no vertex of B on or outside A’s boundary)?',
    'বহুভুজ A n শীর্ষের কঠোরভাবে উত্তল, বহুভুজ B m শীর্ষের সরল; দুটোই ঘড়ির কাঁটার দিকে দেওয়া। B কি A-র কঠোরভাবে ভেতরে (B-র কোনো শীর্ষ A-র সীমায় বা বাইরে নয়)?',
  ),
  input: L('n and A’s vertices, then m and B’s vertices.', 'n আর A-র শীর্ষ, তারপর m আর B-র শীর্ষ।'),
  output: L('YES or NO.', 'YES বা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵, m ≤ 2·10⁴, |coordinates| ≤ 10⁹', 'n ≤ ১০⁵, m ≤ ২·১০⁴, |স্থানাঙ্ক| ≤ ১০⁹')] },
  samples: [
    { input: '6\n-2 1\n0 3\n3 3\n4 1\n3 -2\n2 -2\n4\n0 1\n2 2\n3 1\n1 0', output: 'YES', explain: L('All four vertices are strictly inside.', 'চারটি শীর্ষই কঠোরভাবে ভেতরে।') },
    { input: '5\n1 2\n4 2\n3 -3\n-2 -2\n-2 1\n4\n0 1\n1 2\n4 1\n2 -1', output: 'NO', explain: L('(1, 2) lies on A’s boundary.', '(১, ২) A-র সীমায়।') },
  ],
  observation: L(
    'A is convex, so B is inside A iff every vertex of B is strictly inside A (the segments between inside points stay inside a convex set). Test each vertex in O(log n): from vertex A₀ the other vertices are sorted by angle, so binary search finds the wedge A₀Aᵢ Aᵢ₊₁ containing the point; then one cross product decides.',
    'A উত্তল, তাই B, A-র ভেতরে যদি ও কেবল যদি B-র প্রতিটি শীর্ষ কঠোরভাবে A-র ভেতরে (উত্তল সেটে ভেতরের বিন্দুর মধ্যের রেখাংশ ভেতরেই থাকে)। প্রতিটি শীর্ষ O(log n)-এ যাচাই: শীর্ষ A₀ থেকে অন্য শীর্ষগুলো কোণে সাজানো, তাই বাইনারি সার্চ বিন্দু ধারণকারী কীলক A₀Aᵢ Aᵢ₊₁ খোঁজে; তারপর একটি ক্রস গুণফলই সিদ্ধান্ত।',
  ),
  approach: [
    L('Reverse A to counter-clockwise order.', 'A-কে ঘড়ির কাঁটার বিপরীত ক্রমে উল্টানো।'),
    L('For each B vertex: strictly left of A₀A₁, strictly right of A₀Aₙ₋₁, then binary search the wedge and test the edge.', 'প্রতিটি B শীর্ষে: A₀A₁-এর কঠোরভাবে বামে, A₀Aₙ₋₁-এর কঠোরভাবে ডানে, তারপর কীলক বাইনারি সার্চ করে বাহু যাচাই।'),
  ],
  walkthrough: {
    input: 'sample 2',
    steps: [
      { state: 'point (1, 2) is a vertex-adjacent boundary point of A', text: L('The cross product with the edge is 0: not strictly inside → NO.', 'বাহুর সঙ্গে ক্রস গুণফল ০: কঠোরভাবে ভেতরে নয় → NO।') },
    ],
  },
  complexity: { time: 'O(n + m log n)', space: 'O(n)', why: L('A binary search per vertex of B.', 'B-র প্রতিটি শীর্ষে একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'fan',
      kind: 'optimal',
      title: L('Fan binary search from vertex 0', 'শীর্ষ ০ থেকে পাখা বাইনারি সার্চ'),
      idea: L('Locate the wedge by angle, then test against one edge.', 'কোণে কীলক খুঁজে একটি বাহুর বিপরীতে যাচাই।'),
      explain: [
        L(
          'Coordinates up to 10⁹ make cross products up to about 8·10¹⁸, at the edge of long long; using __int128 for them removes the worry.',
          '১০⁹ পর্যন্ত স্থানাঙ্কে ক্রস গুণফল প্রায় ৮·১০¹⁸, long long-এর সীমায়; এগুলোর জন্য __int128 ব্যবহার করলে দুশ্চিন্তা থাকে না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
struct P { ll x, y; };
__int128 cross(P o, P a, P b) { return (__int128)(a.x - o.x) * (b.y - o.y) - (__int128)(a.y - o.y) * (b.x - o.x); }

int main() {
    int n;
    scanf("%d", &n);
    vector<P> a(n);
    for (auto& p : a) scanf("%lld %lld", &p.x, &p.y);
    reverse(a.begin(), a.end());  // now counter-clockwise
    int m;
    scanf("%d", &m);
    bool ok = true;
    for (int i = 0; i < m; i++) {
        P q;
        scanf("%lld %lld", &q.x, &q.y);
        if (!ok) continue;
        if (cross(a[0], a[1], q) <= 0 || cross(a[0], a[n - 1], q) >= 0) { ok = false; continue; }
        int lo = 1, hi = n - 1;  // find wedge a0 a[lo] a[lo+1]
        while (hi - lo > 1) {
            int mid = (lo + hi) / 2;
            if (cross(a[0], a[mid], q) > 0) lo = mid; else hi = mid;
        }
        if (cross(a[lo], a[lo + 1], q) <= 0) ok = false;
    }
    puts(ok ? "YES" : "NO");
    return 0;
}
`,
      time: 'O(n + m log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['reverse-unique', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Test every edge for every vertex', 'প্রতিটি শীর্ষে প্রতিটি বাহু যাচাই'),
      idea: L('Strictly inside a convex counter-clockwise polygon ⇔ strictly left of every edge.', 'ঘড়ির কাঁটার বিপরীত উত্তল বহুভুজের কঠোরভাবে ভেতরে ⇔ প্রতিটি বাহুর কঠোরভাবে বামে।'),
      explain: [L('O(n · m): the definition with no binary search.', 'O(n · m): বাইনারি সার্চ ছাড়া সংজ্ঞা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    cin >> n;
    vector<ll> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    int m;
    cin >> m;
    bool ok = true;
    for (int k = 0; k < m; k++) {
        ll px, py;
        cin >> px >> py;
        for (int i = 0; i < n; i++) {
            int j = (i + 1) % n;  // clockwise input: inside means strictly right of each edge
            __int128 cr = (__int128)(x[j] - x[i]) * (py - y[i]) - (__int128)(y[j] - y[i]) * (px - x[i]);
            if (cr >= 0) ok = false;
        }
    }
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '6\n-2 1\n0 3\n3 3\n4 1\n3 -2\n2 -2\n4\n0 1\n2 2\n3 1\n1 0', output: 'YES', source: 'sample', note: sample(1) },
    { input: '5\n1 2\n4 2\n3 -3\n-2 -2\n-2 1\n4\n0 1\n1 2\n4 1\n2 -1', output: 'NO', source: 'sample', note: sample(2) },
    { input: '4\n0 0\n0 10\n10 10\n10 0\n3\n1 1\n9 9\n5 9', output: 'YES', source: 'own', note: L('A triangle inside a square.', 'বর্গের ভেতরে একটি ত্রিভুজ।') },
  ],
  pitfalls: [
    L('Treating boundary points as inside: the problem wants strictly inside.', 'সীমার বিন্দুকে ভেতরে ধরা: প্রবলেম কঠোরভাবে ভেতরে চায়।'),
    L('Forgetting that the input is clockwise and flipping the sign test.', 'ইনপুট ঘড়ির কাঁটার দিকে তা ভুলে চিহ্ন-যাচাই উল্টে ফেলা।'),
  ],
  related: [
    { id: '994C', name: 'Two Squares', why: L('Point-in-polygon tests.', 'বহুভুজে বিন্দু যাচাই।') },
    { id: '598C', name: 'Nearest vectors', why: L('Sorting by angle.', 'কোণে সাজানো।') },
  ],
  toolkit: ['functions'],
};

// ───────────────────────────────────────────── 598C
export const p598C: ProblemEntry = {
  id: '598C',
  contestId: 598,
  index: 'C',
  name: 'Nearest vectors',
  rating: 2300,
  tags: ['geometry', 'sortings'],
  why: L(
    'Sort vectors by polar angle; the closest pair is adjacent (including the wrap-around). The real lesson is precision: compare angles exactly with cross and dot products instead of atan2.',
    'ভেক্টরগুলো ধ্রুবীয় কোণে সাজান; সবচেয়ে কাছের জোড়া পাশাপাশি (চক্রাকার মোড়সহ)। আসল শিক্ষা নির্ভুলতা: atan2-এর বদলে ক্রস আর ডট গুণফল দিয়ে কোণ নির্ভুলভাবে তুলনা।',
  ),
  statement: L(
    'n vectors starting at the origin are given; no two share a direction. Find a pair with the minimum non-oriented angle between them (an angle between 0 and π).',
    'মূলবিন্দু থেকে শুরু হওয়া n-টি ভেক্টর দেওয়া; কোনো দুটির দিক এক নয়। তাদের মধ্যে ন্যূনতম অনভিমুখী কোণের (০ থেকে π-এর মধ্যে) একটি জোড়া বের করুন।',
  ),
  input: L('n, then n lines x y.', 'n, তারপর n লাইনে x y।'),
  output: L('Two indices.', 'দুটি সূচক।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵, |coordinates| ≤ 10⁴', 'n ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁴'), anyAnswer] },
  samples: [
    { input: '4\n-1 0\n0 -1\n1 0\n1 1', output: '3 4', explain: L('45° between (1, 0) and (1, 1).', '(১, ০) আর (১, ১)-এর মধ্যে ৪৫°।') },
    { input: '6\n-1 0\n0 -1\n1 0\n1 1\n-4 -5\n-4 -6', output: '6 5', explain: L('A tiny angle between (−4, −5) and (−4, −6).', '(−৪, −৫) আর (−৪, −৬)-এর মধ্যে খুব ছোট কোণ।') },
  ],
  observation: L(
    'After sorting by polar angle, the vector closest in angle to any vector is one of its two neighbours in the circular order. So only n candidate pairs. The angle of a pair is atan2(|cross|, dot), and two such angles can be compared exactly: (c₁, d₁) is smaller than (c₂, d₂) iff d₁·c₂ − c₁·d₂ > 0 (both have c ≥ 0).',
    'ধ্রুবীয় কোণে সাজানোর পর যেকোনো ভেক্টরের কোণে সবচেয়ে কাছেরটি চক্রাকার ক্রমে তার দুই প্রতিবেশীর একটি। তাই মাত্র n-টি প্রার্থী জোড়া। একটি জোড়ার কোণ atan2(|cross|, dot), আর এমন দুটি কোণ নির্ভুলভাবে তুলনা করা যায়: (c₁, d₁) ছোট (c₂, d₂)-এর চেয়ে যদি ও কেবল যদি d₁·c₂ − c₁·d₂ > ০ (দুটোতেই c ≥ ০)।',
  ),
  approach: [
    L('Sort by half-plane, then by cross product (exact angle order).', 'অর্ধ-তল, তারপর ক্রস গুণফল দিয়ে সাজানো (নির্ভুল কোণ-ক্রম)।'),
    L('For each adjacent pair (and last with first) compare its (|cross|, dot) exactly; keep the best.', 'প্রতিটি পাশাপাশি জোড়ায় (আর শেষ-প্রথম) (|cross|, dot) নির্ভুলভাবে তুলনা; সেরাটি রাখা।'),
  ],
  walkthrough: {
    input: '(−4, −5) and (−4, −6)',
    steps: [
      { state: 'cross = 24 − 20 = 4, dot = 16 + 30 = 46', text: L('Angle atan2(4, 46) ≈ 0.087.', 'কোণ atan2(৪, ৪৬) ≈ ০.০৮৭।') },
      { state: 'smaller than 45° = atan2(1, 1)', text: L('This pair wins.', 'এই জোড়া জেতে।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One sort plus a linear scan.', 'একবার সাজানো আর একটি রৈখিক স্ক্যান।') },
  solutions: [
    {
      id: 'exact',
      kind: 'optimal',
      title: L('Exact angular sort and exact angle comparison', 'নির্ভুল কৌণিক সাজানো আর নির্ভুল কোণ তুলনা'),
      idea: L('No floating point anywhere.', 'কোথাও দশমিক নেই।'),
      explain: [
        L(
          'atan2 in double cannot separate angles that differ by about 10⁻¹⁶, and with coordinates up to 10⁴ such near-ties really occur. Cross and dot products stay below 2·10⁸, so all comparisons fit in 64 bits.',
          'double-এ atan2 প্রায় ১০⁻¹⁶ পার্থক্যের কোণ আলাদা করতে পারে না, আর ১০⁴ পর্যন্ত স্থানাঙ্কে এমন প্রায়-সমতা সত্যিই ঘটে। ক্রস আর ডট গুণফল ২·১০⁸-এর নিচে, তাই সব তুলনা ৬৪ বিটে আঁটে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    auto half = [&](int i) { return y[i] < 0 || (y[i] == 0 && x[i] < 0); };  // lower half-plane
    vector<int> id(n);
    iota(id.begin(), id.end(), 0);
    sort(id.begin(), id.end(), [&](int a, int b) {
        if (half(a) != half(b)) return half(a) < half(b);
        return x[a] * y[b] - y[a] * x[b] > 0;
    });
    ll bc = -1, bd = 0;  // best angle as (|cross|, dot)
    int ba = 0, bb = 1;
    for (int k = 0; k < n; k++) {
        int i = id[k], j = id[(k + 1) % n];
        ll c = llabs(x[i] * y[j] - y[i] * x[j]), d = x[i] * x[j] + y[i] * y[j];
        if (bc < 0 || d * bc - c * bd > 0) bc = c, bd = d, ba = i, bb = j;  // angle(c,d) < angle(bc,bd)
    }
    printf("%d %d\n", ba + 1, bb + 1);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'long-long'],
    },
    {
      id: 'long-double',
      kind: 'method',
      title: L('atan2l in long double', 'long double-এ atan2l'),
      idea: L('Sort by atan2l, compare adjacent differences in long double.', 'atan2l দিয়ে সাজানো, পাশাপাশি পার্থক্য long double-এ তুলনা।'),
      explain: [
        L(
          'The common contest fix: long double has a 64-bit mantissa, enough to separate the closest possible angles for coordinates up to 10⁴. It is simpler to write, but the exact version is the one that never needs this kind of reasoning.',
          'প্রচলিত কনটেস্ট-সমাধান: long double-এর ৬৪-বিট ম্যান্টিসা ১০⁴ পর্যন্ত স্থানাঙ্কের সবচেয়ে কাছের কোণ আলাদা করতে যথেষ্ট। লেখা সহজ, কিন্তু নির্ভুল সংস্করণে এমন যুক্তির দরকারই পড়ে না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    scanf("%d", &n);
    vector<pair<ld, int>> a(n);
    for (int i = 0; i < n; i++) {
        long long x, y;
        scanf("%lld %lld", &x, &y);
        a[i] = {atan2l((ld)y, (ld)x), i};
    }
    sort(a.begin(), a.end());
    const ld PI = acosl(-1);
    ld best = 10;
    int ba = 0, bb = 1;
    for (int k = 0; k < n; k++) {
        int j = (k + 1) % n;
        ld d = a[j].first - a[k].first;
        if (j == 0) d += 2 * PI;
        if (d > PI) d = 2 * PI - d;
        if (d < best) best = d, ba = a[k].second, bb = a[j].second;
    }
    printf("%d %d\n", ba + 1, bb + 1);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every pair, exact comparison', 'প্রতিটি জোড়া, নির্ভুল তুলনা'),
      idea: L('O(n²) over all pairs with the (|cross|, dot) comparison.', '(|cross|, dot) তুলনাসহ সব জোড়ায় O(n²)।'),
      explain: [L('No sorting assumption: confirms that adjacent pairs suffice.', 'সাজানোর কোনো ধারণা নেই: নিশ্চিত করে যে পাশাপাশি জোড়াই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    cin >> n;
    vector<ll> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    ll bc = -1, bd = 0;
    int ba = 0, bb = 1;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            ll c = llabs(x[i] * y[j] - y[i] * x[j]), d = x[i] * x[j] + y[i] * y[j];
            if (bc < 0 || d * bc - c * bd > 0) bc = c, bd = d, ba = i, bb = j;
        }
    cout << ba + 1 << " " << bb + 1 << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n-1 0\n0 -1\n1 0\n1 1', output: '3 4', source: 'sample', note: sample(1) },
    { input: '6\n-1 0\n0 -1\n1 0\n1 1\n-4 -5\n-4 -6', output: '6 5', source: 'sample', note: sample(2) },
    { input: '2\n1 0\n-1 0', output: '1 2', source: 'own', note: L('Opposite vectors: the angle is π.', 'বিপরীত ভেক্টর: কোণ π।') },
  ],
  pitfalls: [
    L('Comparing atan2 results in double: near-equal angles are misordered.', 'double-এ atan2-এর ফল তুলনা: প্রায়-সমান কোণ ভুল ক্রমে আসে।'),
    L('Forgetting the pair formed by the last and the first vector after sorting.', 'সাজানোর পর শেষ আর প্রথম ভেক্টরের জোড়া ভুলে যাওয়া।'),
  ],
  related: [
    { id: '166B', name: 'Polygons', why: L('Angular order around a point.', 'একটি বিন্দুর চারপাশে কৌণিক ক্রম।') },
    { id: '1468F', name: 'Full Turn', why: L('Directions of vectors.', 'ভেক্টরের দিক।') },
  ],
  toolkit: ['sort', 'long-long'],
};

// ───────────────────────────────────────────── 136D
export const p136D: ProblemEntry = {
  id: '136D',
  contestId: 136,
  index: 'D',
  name: 'Rectangle and Square',
  rating: 1600,
  tags: ['brute-force', 'geometry', 'math'],
  why: L(
    'Eight points, 70 ways to split them: brute force is the intended solution. The interesting part is recognising a square or rectangle from four unordered points with no axis alignment.',
    'আটটি বিন্দু, ভাগের ৭০টি উপায়: ব্রুট ফোর্সই উদ্দিষ্ট সমাধান। মজার অংশ হলো অক্ষ-সমান্তরালতা ছাড়া চারটি অক্রমিক বিন্দু থেকে বর্গ বা আয়তক্ষেত্র চেনা।',
  ),
  statement: L(
    'Eight distinct points are given. Split them into two groups of four so that the first group forms a square and the second a rectangle (a square is also a rectangle). Sides need not be parallel to the axes; areas must be positive. Print YES and the indices, or NO.',
    'আটটি ভিন্ন বিন্দু দেওয়া। এদের চারটি করে দুই দলে ভাগ করুন যাতে প্রথম দল একটি বর্গ আর দ্বিতীয়টি একটি আয়তক্ষেত্র বানায় (বর্গও আয়তক্ষেত্র)। বাহু অক্ষের সমান্তরাল হতে হবে না; ক্ষেত্রফল ধনাত্মক। YES আর সূচকগুলো ছাপুন, নইলে NO।',
  ),
  input: L('8 lines x y.', '৮ লাইনে x y।'),
  output: L('NO, or YES, the square’s indices, the rectangle’s indices.', 'NO, অথবা YES, বর্গের সূচক, আয়তক্ষেত্রের সূচক।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|coordinates| ≤ 10⁴', '|স্থানাঙ্ক| ≤ ১০⁴'), anyAnswer] },
  samples: [
    { input: '0 0\n10 11\n10 0\n0 11\n1 1\n2 2\n2 1\n1 2', output: 'YES\n5 6 7 8\n1 2 3 4', explain: L('A unit square and a 10 × 11 rectangle.', 'একটি একক বর্গ আর ১০ × ১১ আয়তক্ষেত্র।') },
    { input: '0 0\n1 1\n2 2\n3 3\n4 4\n5 5\n6 6\n7 7', output: 'NO', explain: L('All points are collinear.', 'সব বিন্দু একরেখীয়।') },
    { input: '0 0\n4 4\n4 0\n0 4\n1 2\n2 3\n3 2\n2 1', output: 'YES\n1 2 3 4\n5 6 7 8', explain: L('Two squares; one is the “rectangle”.', 'দুটি বর্গ; একটি “আয়তক্ষেত্র”।') },
  ],
  observation: L(
    'Four points form a rectangle iff, sorting the 6 pairwise squared distances d₁ ≤ … ≤ d₆: d₁ = d₂, d₃ = d₄, d₅ = d₆, d₁ + d₃ = d₅ and d₁ > 0. They form a square if additionally d₁ = d₃. Try all 70 ways to choose the square.',
    'চারটি বিন্দু আয়তক্ষেত্র যদি ও কেবল যদি, ৬টি জোড়াভিত্তিক বর্গ-দূরত্ব d₁ ≤ … ≤ d₆ সাজালে: d₁ = d₂, d₃ = d₄, d₅ = d₆, d₁ + d₃ = d₅ আর d₁ > ০। এছাড়া d₁ = d₃ হলে বর্গ। বর্গ বাছাইয়ের ৭০টি উপায়ই চেষ্টা করুন।',
  ),
  approach: [L('For every 4-subset as the square, check it and the complement.', 'বর্গ হিসেবে প্রতিটি ৪-উপসেটে, তাকে আর পরিপূরককে যাচাই।')],
  walkthrough: {
    input: 'sample 1',
    steps: [
      { state: 'points 5–8: distances 1,1,1,1,2,2 → square', text: L('Unit square.', 'একক বর্গ।') },
      { state: 'points 1–4: 100,100,121,121,221,221 → rectangle', text: L('100 + 121 = 221.', '১০০ + ১২১ = ২২১।') },
    ],
  },
  complexity: { time: 'O(70)', space: 'O(1)', why: L('A constant number of checks.', 'ধ্রুব সংখ্যক যাচাই।') },
  solutions: [
    {
      id: 'distances',
      kind: 'optimal',
      title: L('Sorted pairwise distances', 'সাজানো জোড়াভিত্তিক দূরত্ব'),
      idea: L('Shape test from the multiset of 6 squared distances.', '৬টি বর্গ-দূরত্বের বহুসেট থেকে আকার যাচাই।'),
      explain: [
        L(
          'Squared distances are integers, so all tests are exact. The condition d₁ + d₃ = d₅ (Pythagoras on the diagonal) rules out rhombi and other shapes with repeated distances.',
          'বর্গ-দূরত্ব পূর্ণসংখ্যা, তাই সব যাচাই নির্ভুল। d₁ + d₃ = d₅ শর্ত (কর্ণে পিথাগোরাস) রম্বস আর পুনরাবৃত্ত দূরত্বের অন্য আকার বাদ দেয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long X[8], Y[8];

int shape(const vector<int>& p) {  // 0: none, 1: rectangle, 2: square
    vector<long long> d;
    for (int i = 0; i < 4; i++)
        for (int j = i + 1; j < 4; j++) {
            long long dx = X[p[i]] - X[p[j]], dy = Y[p[i]] - Y[p[j]];
            d.push_back(dx * dx + dy * dy);
        }
    sort(d.begin(), d.end());
    if (d[0] == 0 || d[0] != d[1] || d[2] != d[3] || d[4] != d[5] || d[0] + d[2] != d[4]) return 0;
    return d[0] == d[2] ? 2 : 1;
}

int main() {
    for (int i = 0; i < 8; i++) cin >> X[i] >> Y[i];
    for (int mask = 0; mask < 256; mask++) {
        if (__builtin_popcount(mask) != 4) continue;
        vector<int> a, b;
        for (int i = 0; i < 8; i++) (mask >> i & 1 ? a : b).push_back(i);
        if (shape(a) == 2 && shape(b) >= 1) {
            puts("YES");
            for (int v : a) printf("%d ", v + 1);
            puts("");
            for (int v : b) printf("%d ", v + 1);
            puts("");
            return 0;
        }
    }
    puts("NO");
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['popcount', 'sort', 'functions'],
    },
    {
      id: 'brute',
      kind: 'method',
      title: L('Try every vertex order and check right angles', 'প্রতিটি শীর্ষ-ক্রম চেষ্টা করে সমকোণ যাচাই'),
      idea: L('A quadrilateral ABCD is a rectangle iff AB + CD = 0 (as vectors), AB ⟂ BC, and AB, BC ≠ 0.', 'চতুর্ভুজ ABCD আয়তক্ষেত্র যদি ও কেবল যদি AB + CD = ০ (ভেক্টরে), AB ⟂ BC, আর AB, BC ≠ ০।'),
      explain: [L('A different shape test with dot products over the 24 orders of four points; it confirms the distance criterion.', 'চারটি বিন্দুর ২৪টি ক্রমের ওপর ডট গুণফলে ভিন্ন আকার-যাচাই; দূরত্বের মানদণ্ড নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long X[8], Y[8];

int shape(vector<int> p) {
    sort(p.begin(), p.end());
    int best = 0;
    do {
        long long ax = X[p[1]] - X[p[0]], ay = Y[p[1]] - Y[p[0]];
        long long bx = X[p[2]] - X[p[1]], by = Y[p[2]] - Y[p[1]];
        long long cx = X[p[3]] - X[p[2]], cy = Y[p[3]] - Y[p[2]];
        if ((ax || ay) && (bx || by) && ax + cx == 0 && ay + cy == 0 && ax * bx + ay * by == 0) {
            int s = ax * ax + ay * ay == bx * bx + by * by ? 2 : 1;
            best = max(best, s);
        }
    } while (next_permutation(p.begin(), p.end()));
    return best;
}

int main() {
    for (int i = 0; i < 8; i++) cin >> X[i] >> Y[i];
    for (int mask = 0; mask < 256; mask++) {
        if (__builtin_popcount(mask) != 4) continue;
        vector<int> a, b;
        for (int i = 0; i < 8; i++) (mask >> i & 1 ? a : b).push_back(i);
        if (shape(a) == 2 && shape(b) >= 1) {
            cout << "YES\n";
            for (int v : a) cout << v + 1 << " ";
            cout << "\n";
            for (int v : b) cout << v + 1 << " ";
            cout << "\n";
            return 0;
        }
    }
    cout << "NO\n";
    return 0;
}
`,
      time: 'O(70 · 24)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['popcount', 'sort'],
    },
  ],
  tests: [
    { input: '0 0\n10 11\n10 0\n0 11\n1 1\n2 2\n2 1\n1 2', output: 'YES\n5 6 7 8\n1 2 3 4', source: 'sample', note: sample(1) },
    { input: '0 0\n1 1\n2 2\n3 3\n4 4\n5 5\n6 6\n7 7', output: 'NO', source: 'sample', note: sample(2) },
    { input: '0 0\n4 4\n4 0\n0 4\n1 2\n2 3\n3 2\n2 1', output: 'YES\n1 2 3 4\n5 6 7 8', source: 'sample', note: sample(3) },
  ],
  pitfalls: [
    L('Accepting a rhombus as a square: equal sides are not enough.', 'রম্বসকে বর্গ হিসেবে গ্রহণ: সমান বাহু যথেষ্ট নয়।'),
    L('Assuming axis-parallel sides.', 'অক্ষ-সমান্তরাল বাহু ধরে নেওয়া।'),
  ],
  related: [
    { id: '994C', name: 'Two Squares', why: L('Rotated squares from vertices.', 'শীর্ষ থেকে ঘোরানো বর্গ।') },
    { id: '407A', name: 'Triangle', why: L('Right angles on the integer grid.', 'পূর্ণসংখ্যা গ্রিডে সমকোণ।') },
  ],
  toolkit: ['popcount', 'sort'],
};
