import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');
const anyAnswer = L('Any correct answer is accepted.', 'যেকোনো সঠিক উত্তর গ্রহণযোগ্য।');

// ───────────────────────────────────────────── 1354C1
export const p1354C1: ProblemEntry = {
  id: '1354C1',
  contestId: 1354,
  index: 'C1',
  name: 'Simple Polygon Embedding',
  rating: 1400,
  tags: ['binary-search', 'geometry', 'math', 'ternary-search'],
  featuredFor: ['geometry'],
  why: L(
    'A first real geometry problem: find the symmetry, then one trigonometric formula answers it. Ternary search over the rotation angle gives the same answer without the insight, and it also solves the hard version.',
    'প্রথম আসল জ্যামিতি প্রবলেম: প্রতিসাম্য খুঁজুন, তারপর একটি ত্রিকোণমিতিক সূত্রই উত্তর। ঘূর্ণনের কোণের ওপর টার্নারি সার্চ এই অন্তর্দৃষ্টি ছাড়াই একই উত্তর দেয়, আর কঠিন সংস্করণও সমাধান করে।',
  ),
  statement: L(
    'A regular polygon with 2n vertices has all sides of length 1, and n is even. Find the side of the smallest square that the polygon fits into. The polygon may be rotated.',
    '২n শীর্ষবিন্দুর একটি সুষম বহুভুজের প্রতিটি বাহুর দৈর্ঘ্য ১, আর n জোড়। যে সবচেয়ে ছোট বর্গক্ষেত্রে বহুভুজটি আঁটে তার বাহু বের করুন। বহুভুজ ঘোরানো যায়।',
  ),
  input: L('T, then T values of n.', 'T, তারপর T-টি n।'),
  output: L('For each test, the side of the square.', 'প্রতিটি টেস্টে বর্গের বাহু।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 200, n even, T ≤ 200', '২ ≤ n ≤ ২০০, n জোড়, T ≤ ২০০'), realAnswer] },
  samples: [
    { input: '3\n2\n4\n200', output: '1.000000000\n2.414213562\n127.321336469', explain: L('n = 2 is the unit square; n = 4 is the regular octagon.', 'n = ২ হলো একক বর্গ; n = ৪ হলো সুষম অষ্টভুজ।') },
  ],
  observation: L(
    'With 2n sides and n even, the number of sides is a multiple of 4, so the polygon can be turned so that two pairs of parallel sides lie on the square’s sides. Then the square’s side equals the distance between opposite sides: twice the inradius, 1 / tan(π / 2n).',
    '২n বাহু আর n জোড় হলে বাহুর সংখ্যা ৪-এর গুণিতক, তাই বহুভুজকে এমনভাবে ঘোরানো যায় যাতে দুই জোড়া সমান্তরাল বাহু বর্গের বাহুর ওপর থাকে। তখন বর্গের বাহু = বিপরীত বাহুদ্বয়ের দূরত্ব: অন্তর্ব্যাসার্ধের দ্বিগুণ, ১ / tan(π / ২n)।',
  ),
  approach: [
    L('Inradius of a regular m-gon with side 1: 1 / (2 tan(π/m)).', '১ বাহুর সুষম m-ভুজের অন্তর্ব্যাসার্ধ: ১ / (২ tan(π/m))।'),
    L('Answer = 2 · inradius with m = 2n.', 'উত্তর = ২ · অন্তর্ব্যাসার্ধ, m = ২n।'),
  ],
  walkthrough: {
    input: 'n = 4 (octagon)',
    steps: [
      { state: 'm = 8, π/8 = 22.5°', text: L('tan 22.5° = √2 − 1.', 'tan ২২.৫° = √২ − ১।') },
      { state: '1 / (√2 − 1) = 1 + √2 ≈ 2.414', text: L('Distance between opposite sides.', 'বিপরীত বাহুর দূরত্ব।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('One formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Twice the inradius', 'অন্তর্ব্যাসার্ধের দ্বিগুণ'),
      idea: L('Answer = 1 / tan(π / 2n).', 'উত্তর = ১ / tan(π / ২n)।'),
      explain: [
        L(
          'Split the polygon into 2n isosceles triangles from the centre. Each has apex angle 2π/2n and base 1, so its height, the inradius, is ½ / tan(π/2n). Opposite sides are parallel and two inradii apart.',
          'কেন্দ্র থেকে বহুভুজকে ২n-টি সমদ্বিবাহু ত্রিভুজে ভাগ করুন। প্রতিটির শীর্ষকোণ ২π/২n আর ভূমি ১, তাই উচ্চতা, অর্থাৎ অন্তর্ব্যাসার্ধ, ½ / tan(π/২n)। বিপরীত বাহু সমান্তরাল আর দুই অন্তর্ব্যাসার্ধ দূরে।',
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
        printf("%.9f\n", 1.0 / tan(M_PI / (2 * n)));
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
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on the rotation angle', 'ঘূর্ণন কোণের ওপর টার্নারি সার্চ'),
      idea: L('For angle θ the square side is max(width, height) of the rotated vertices; minimize over θ.', 'কোণ θ-তে বর্গের বাহু = ঘোরানো শীর্ষগুলোর max(প্রস্থ, উচ্চতা); θ-এর ওপর ন্যূনতম।'),
      explain: [
        L(
          'The bounding box only depends on θ modulo π / 2n (the polygon’s symmetry), and on that interval max(width, height) first falls, then rises, so ternary search finds the minimum. This version does not need n to be even.',
          'বাউন্ডিং বক্স শুধু θ mod π / ২n-এর ওপর নির্ভর করে (বহুভুজের প্রতিসাম্য), আর সেই ব্যবধিতে max(প্রস্থ, উচ্চতা) আগে কমে, পরে বাড়ে, তাই টার্নারি সার্চ ন্যূনতম খুঁজে পায়। এই সংস্করণে n জোড় হতে হয় না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int m;      // number of vertices
double R;   // circumradius

double side(double th) {
    double lx = 1e18, hx = -1e18, ly = 1e18, hy = -1e18;
    for (int i = 0; i < m; i++) {
        double a = th + 2 * M_PI * i / m;
        double x = R * cos(a), y = R * sin(a);
        lx = min(lx, x), hx = max(hx, x), ly = min(ly, y), hy = max(hy, y);
    }
    return max(hx - lx, hy - ly);
}

int main() {
    int T;
    scanf("%d", &T);
    while (T--) {
        int n;
        scanf("%d", &n);
        m = 2 * n;
        R = 0.5 / sin(M_PI / m);
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
      toolkit: ['setprecision', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Scan many angles', 'অনেক কোণ স্ক্যান'),
      idea: L('Try 20 000 angles evenly, then refine around the best one.', 'সমান দূরত্বে ২০ ০০০ কোণ চেষ্টা, তারপর সেরাটির চারপাশে সূক্ষ্ম করা।'),
      explain: [L('No assumption about the shape of the function at all; a slow but trustworthy referee.', 'ফাংশনের আকার সম্পর্কে কোনো ধারণা নেই; ধীর কিন্তু নির্ভরযোগ্য বিচারক।')],
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
        double best = 1e18, at = 0, span = M_PI / 2;
        for (int round = 0; round < 4; round++) {
            double from = max(0.0, at - span), to = at + span;
            for (int k = 0; k <= 5000; k++) {
                double th = from + (to - from) * k / 5000;
                double s = side(th);
                if (s < best) best = s, at = th;
            }
            span /= 1000;
        }
        printf("%.9f\n", best);
    }
    return 0;
}
`,
      time: 'O(T · n · 20 000)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['setprecision'],
    },
  ],
  tests: [
    { input: '3\n2\n4\n200', output: '1.000000000\n2.414213562\n127.321336469', source: 'sample', note: sample(1) },
    { input: '1\n6', output: '3.732050808', source: 'own', note: L('The regular dodecagon: 2 + √3.', 'সুষম দ্বাদশভুজ: ২ + √৩।') },
  ],
  pitfalls: [
    L('Using the circumscribed diameter: the corners of the polygon do not touch the square here.', 'পরিবৃত্তের ব্যাস নেওয়া: এখানে বহুভুজের কোণ বর্গকে ছোঁয় না।'),
    L('Computing in degrees: the C++ trig functions take radians.', 'ডিগ্রিতে হিসাব: C++-এর ত্রিকোণমিতিক ফাংশন রেডিয়ান নেয়।'),
  ],
  related: [
    { id: '1354C2', name: 'Not So Simple Polygon Embedding', why: L('n odd: the ternary search still works.', 'n বিজোড়: টার্নারি সার্চ তবু চলে।') },
    { id: '600D', name: 'Area of Two Circles’ Intersection', why: L('Exact formulas with trigonometry.', 'ত্রিকোণমিতিসহ নির্ভুল সূত্র।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 514B
export const p514B: ProblemEntry = {
  id: '514B',
  contestId: 514,
  index: 'B',
  name: 'Han Solo and Lazer Gun',
  rating: 1400,
  tags: ['brute-force', 'data-structures', 'geometry', 'implementation', 'math'],
  why: L(
    'Count distinct lines through a point. A direction becomes a hashable key once you divide by the gcd and fix the sign, the same trick as normalized fractions.',
    'একটি বিন্দু দিয়ে যাওয়া ভিন্ন রেখা গোনা। gcd দিয়ে ভাগ করে চিহ্ন ঠিক করলে দিক হ্যাশযোগ্য কী হয়, স্বাভাবিক ভগ্নাংশের মতো একই কৌশল।',
  ),
  statement: L(
    'A gun stands at (x₀, y₀). One shot destroys every stormtrooper on a line through the gun. Given the positions of n stormtroopers (none at the gun), find the minimum number of shots needed to destroy all of them.',
    'একটি বন্দুক (x₀, y₀)-এ। একটি গুলি বন্দুক দিয়ে যাওয়া একটি রেখার সব স্টর্মট্রুপার ধ্বংস করে। n-টি স্টর্মট্রুপারের অবস্থান দেওয়া (কেউ বন্দুকে নেই); সবাইকে ধ্বংস করতে ন্যূনতম কতটি গুলি লাগে, বের করুন।',
  ),
  input: L('n x₀ y₀, then n lines xᵢ yᵢ.', 'n x₀ y₀, তারপর n লাইনে xᵢ yᵢ।'),
  output: L('The minimum number of shots.', 'ন্যূনতম গুলির সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 1000, |coordinates| ≤ 10⁴', 'n ≤ ১০০০, |স্থানাঙ্ক| ≤ ১০⁴')] },
  samples: [
    { input: '4 0 0\n1 1\n2 2\n2 0\n-1 -1', output: '2', explain: L('(1,1), (2,2), (−1,−1) share the line y = x.', '(১,১), (২,২), (−১,−১) একই রেখা y = x-এ।') },
    { input: '2 1 2\n1 1\n1 0', output: '1', explain: L('Both are on the vertical line x = 1.', 'দুজনেই উল্লম্ব রেখা x = ১-এ।') },
  ],
  observation: L(
    'Two troopers fall to the same shot iff the vectors from the gun to them are parallel. Reduce (dx, dy) by gcd(|dx|, |dy|) and make the first non-zero coordinate positive, so (2, 2) and (−1, −1) both become (1, 1). The answer is the number of distinct reduced vectors.',
    'দুই ট্রুপার একই গুলিতে মরে যদি ও কেবল যদি বন্দুক থেকে তাদের ভেক্টর সমান্তরাল হয়। (dx, dy)-কে gcd(|dx|, |dy|) দিয়ে সরল করে প্রথম অশূন্য স্থানাঙ্ক ধনাত্মক করুন, তাতে (২, ২) আর (−১, −১) দুটোই (১, ১) হয়। উত্তর হলো ভিন্ন সরল ভেক্টরের সংখ্যা।',
  ),
  approach: [
    L('For every trooper compute (dx, dy) = (x − x₀, y − y₀).', 'প্রতিটি ট্রুপারের (dx, dy) = (x − x₀, y − y₀)।'),
    L('Divide by the gcd, fix the sign, insert into a set.', 'gcd দিয়ে ভাগ, চিহ্ন ঠিক, সেটে রাখা।'),
  ],
  walkthrough: {
    input: 'gun (0,0): (1,1), (2,2), (2,0), (−1,−1)',
    steps: [
      { state: '(1,1), (1,1), (1,0), (1,1)', text: L('After reduction and sign fixing.', 'সরল আর চিহ্ন ঠিক করার পর।') },
      { state: '{(1,1), (1,0)} → 2', text: L('Two shots.', 'দুটি গুলি।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A gcd and a set insertion per trooper.', 'প্রতি ট্রুপারে একটি gcd আর একটি সেট সন্নিবেশ।') },
  solutions: [
    {
      id: 'normalize',
      kind: 'optimal',
      title: L('Set of normalized directions', 'স্বাভাবিক দিকের সেট'),
      idea: L('Canonical form of a line through the origin: reduced, first non-zero coordinate positive.', 'মূলবিন্দু দিয়ে যাওয়া রেখার নির্দিষ্ট রূপ: সরল, প্রথম অশূন্য স্থানাঙ্ক ধনাত্মক।'),
      explain: [
        L(
          'A line has two directions, so the sign must be fixed as well as the scale. Fixing “dx > 0, or dx = 0 and dy > 0” picks one of the two in a consistent way.',
          'একটি রেখার দুটি দিক, তাই মাপের সঙ্গে চিহ্নও ঠিক করতে হয়। “dx > ০, অথবা dx = ০ আর dy > ০” নিয়ম দুটির একটিকে সামঞ্জস্যপূর্ণভাবে বাছে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x0, y0;
    scanf("%d %d %d", &n, &x0, &y0);
    set<pair<int, int>> lines;
    for (int i = 0; i < n; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        int dx = x - x0, dy = y - y0;
        int g = gcd(abs(dx), abs(dy));
        dx /= g, dy /= g;
        if (dx < 0 || (dx == 0 && dy < 0)) dx = -dx, dy = -dy;  // one direction per line
        lines.insert({dx, dy});
    }
    printf("%d\n", (int)lines.size());
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set', 'gcd-lcm', 'pair'],
    },
    {
      id: 'cross',
      kind: 'method',
      title: L('Group by cross product', 'ক্রস গুণফল দিয়ে দল'),
      idea: L('Two vectors are parallel iff dx₁·dy₂ − dy₁·dx₂ = 0; compare each trooper with one representative per shot.', 'দুটি ভেক্টর সমান্তরাল যদি ও কেবল যদি dx₁·dy₂ − dy₁·dx₂ = ০; প্রতিটি ট্রুপারকে প্রতি গুলির একজন প্রতিনিধির সঙ্গে তুলনা।'),
      explain: [
        L(
          'The cross product is the basic tool of computational geometry: zero means collinear, its sign tells left from right. No division, no gcd, all in integers.',
          'ক্রস গুণফল গণনামূলক জ্যামিতির মৌলিক হাতিয়ার: শূন্য মানে একরেখীয়, চিহ্ন বাম-ডান বলে। ভাগ নেই, gcd নেই, সব পূর্ণসংখ্যায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long x0, y0;
    scanf("%d %lld %lld", &n, &x0, &y0);
    vector<pair<long long, long long>> reps;  // one direction per shot
    for (int i = 0; i < n; i++) {
        long long x, y;
        scanf("%lld %lld", &x, &y);
        long long dx = x - x0, dy = y - y0;
        bool found = false;
        for (auto& [rx, ry] : reps)
            if (rx * dy - ry * dx == 0) { found = true; break; }
        if (!found) reps.push_back({dx, dy});
    }
    printf("%d\n", (int)reps.size());
    return 0;
}
`,
      time: 'O(n · answer)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'structured-bindings'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Shoot greedily, remove the victims', 'লোভীভাবে গুলি, শিকার সরানো'),
      idea: L('Aim at any remaining trooper, remove everyone collinear with the gun and him, repeat.', 'যেকোনো বাকি ট্রুপারের দিকে তাক, বন্দুক আর তার সঙ্গে একরেখীয় সবাইকে সরানো, পুনরাবৃত্তি।'),
      explain: [L('A literal simulation of the shots.', 'গুলির আক্ষরিক সিমুলেশন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long x0, y0;
    cin >> n >> x0 >> y0;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    vector<bool> dead(n, false);
    int shots = 0;
    for (int i = 0; i < n; i++) {
        if (dead[i]) continue;
        shots++;
        for (int j = 0; j < n; j++)
            if ((x[i] - x0) * (y[j] - y0) == (y[i] - y0) * (x[j] - x0)) dead[j] = true;
    }
    cout << shots << "\n";
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
    { input: '4 0 0\n1 1\n2 2\n2 0\n-1 -1', output: '2', source: 'sample', note: sample(1) },
    { input: '2 1 2\n1 1\n1 0', output: '1', source: 'sample', note: sample(2) },
    { input: '3 0 0\n0 5\n0 -3\n4 0', output: '2', source: 'own', note: L('Opposite sides of the gun on one vertical line: one shot.', 'বন্দুকের দুই পাশে একই উল্লম্ব রেখা: একটি গুলি।') },
  ],
  pitfalls: [
    L('Storing the slope dy/dx as a double: vertical lines and rounding break it.', 'ঢাল dy/dx-কে double-এ রাখা: উল্লম্ব রেখা আর গোলকরণ একে ভাঙে।'),
    L('Forgetting that opposite directions are the same line.', 'বিপরীত দিক যে একই রেখা তা ভুলে যাওয়া।'),
  ],
  related: [
    { id: '1133D', name: 'Zero Quantity Maximization', why: L('Normalize fractions by gcd and sign.', 'gcd আর চিহ্ন দিয়ে ভগ্নাংশ স্বাভাবিক করা।') },
    { id: '618C', name: 'Constellation', why: L('Cross products for collinearity.', 'একরেখীয়তার জন্য ক্রস গুণফল।') },
  ],
  toolkit: ['set', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 908C
export const p908C: ProblemEntry = {
  id: '908C',
  contestId: 908,
  index: 'C',
  name: 'New Year and Curling',
  rating: 1500,
  tags: ['brute-force', 'geometry', 'implementation', 'math'],
  why: L(
    'Two touching circles of radius r have centres exactly 2r apart; Pythagoras turns that into a height. A sliding disk stops at the highest such contact.',
    'r ব্যাসার্ধের দুটি স্পর্শকারী বৃত্তের কেন্দ্র ঠিক ২r দূরে; পিথাগোরাস তা উচ্চতায় বদলায়। সরে আসা চাকতি এমন সবচেয়ে উঁচু স্পর্শে থামে।',
  ),
  statement: L(
    'n disks of radius r are pushed one by one. Disk i starts very high with centre x = xᵢ and moves straight down until it touches the line y = 0 or a disk that has already stopped. Print the final y-coordinate of every centre.',
    'r ব্যাসার্ধের n-টি চাকতি একে একে ঠেলা হয়। চাকতি i অনেক উঁচু থেকে কেন্দ্র x = xᵢ নিয়ে শুরু করে সোজা নিচে নামে, যতক্ষণ না রেখা y = ০ বা আগে থেমে যাওয়া কোনো চাকতিকে ছোঁয়। প্রতিটি কেন্দ্রের শেষ y-স্থানাঙ্ক ছাপুন।',
  ),
  input: L('n r, then x₁ … xₙ.', 'n r, তারপর x₁ … xₙ।'),
  output: L('n real numbers.', 'n-টি বাস্তব সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, r, xᵢ ≤ 1000', 'n, r, xᵢ ≤ ১০০০'), realAnswer] },
  samples: [
    {
      input: '6 2\n5 5 6 8 3 12',
      output: '2 6.0 9.87298334621 13.3370849613 12.5187346573 13.3370849613',
      explain: L('The second disk lands exactly on top of the first: 2 + 4 = 6.', 'দ্বিতীয় চাকতি ঠিক প্রথমটির মাথায় পড়ে: ২ + ৪ = ৬।'),
    },
  ],
  observation: L(
    'Disk i can touch an earlier disk j only if |xᵢ − xⱼ| ≤ 2r, and then the contact height is yⱼ + √(4r² − (xᵢ − xⱼ)²). Coming from above it meets the highest of these first, so yᵢ = max(r, all contact heights).',
    'চাকতি i আগের চাকতি j-কে ছুঁতে পারে শুধু |xᵢ − xⱼ| ≤ ২r হলে, আর তখন স্পর্শের উচ্চতা yⱼ + √(৪r² − (xᵢ − xⱼ)²)। ওপর থেকে আসায় এদের সবচেয়ে উঁচুটির সঙ্গেই প্রথমে দেখা হয়, তাই yᵢ = max(r, সব স্পর্শ-উচ্চতা)।',
  ),
  approach: [L('For every disk, take the maximum over all earlier disks within 2r horizontally.', 'প্রতিটি চাকতিতে অনুভূমিকভাবে ২r-এর মধ্যে আগের সব চাকতির ওপর সর্বোচ্চ।')],
  walkthrough: {
    input: 'r = 2: x = 5, 5, 6',
    steps: [
      { state: 'disk 1: y = r = 2', text: L('Lands on the ground.', 'মাটিতে পড়ে।') },
      { state: 'disk 2: dx = 0 → 2 + 4 = 6', text: L('Straight on top.', 'ঠিক মাথায়।') },
      { state: 'disk 3: dx = 1 → 6 + √15 ≈ 9.873', text: L('Disk 2 gives the highest contact.', 'চাকতি ২ সবচেয়ে উঁচু স্পর্শ দেয়।') },
    ],
  },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('Each disk looks at all earlier ones.', 'প্রতিটি চাকতি আগের সবগুলো দেখে।') },
  solutions: [
    {
      id: 'brute',
      kind: 'optimal',
      title: L('Highest contact with any earlier disk', 'আগের যেকোনো চাকতির সঙ্গে সবচেয়ে উঁচু স্পর্শ'),
      idea: L('yᵢ = max(r, max over |dx| ≤ 2r of yⱼ + √(4r² − dx²)).', 'yᵢ = max(r, |dx| ≤ ২r হলে yⱼ + √(৪r² − dx²)-এর সর্বোচ্চ)।'),
      explain: [
        L(
          'n ≤ 1000, so checking every earlier disk is only 5·10⁵ steps. Use ≤ 2r, not < 2r: disks exactly 2r apart touch at the same height.',
          'n ≤ ১০০০, তাই আগের প্রতিটি চাকতি দেখা মাত্র ৫·১০⁵ ধাপ। < ২r নয়, ≤ ২r ব্যবহার করুন: ঠিক ২r দূরের চাকতি একই উচ্চতায় স্পর্শ করে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    double r;
    scanf("%d %lf", &n, &r);
    vector<double> x(n), y(n);
    for (int i = 0; i < n; i++) {
        scanf("%lf", &x[i]);
        y[i] = r;  // the ground
        for (int j = 0; j < i; j++) {
            double dx = fabs(x[i] - x[j]);
            if (dx <= 2 * r) y[i] = max(y[i], y[j] + sqrt(4 * r * r - dx * dx));
        }
        printf("%.10f ", y[i]);
    }
    puts("");
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'min-max'],
    },
    {
      id: 'columns',
      kind: 'method',
      title: L('Only the top disk of each column matters', 'প্রতিটি কলামের শুধু ওপরের চাকতিই গুরুত্বপূর্ণ'),
      idea: L('Keep top[x] = the highest centre stopped at x; scan x − 2r … x + 2r.', 'top[x] = x-এ থামা সবচেয়ে উঁচু কেন্দ্র; x − ২r … x + ২r স্ক্যান।'),
      explain: [
        L(
          'For a fixed horizontal distance the contact height grows with yⱼ, so among disks in the same column only the highest can be hit first. Since xᵢ ≤ 1000, an array indexed by x replaces the list of disks.',
          'নির্দিষ্ট অনুভূমিক দূরত্বে স্পর্শ-উচ্চতা yⱼ-এর সঙ্গে বাড়ে, তাই একই কলামের চাকতির মধ্যে শুধু সবচেয়ে উঁচুটিই প্রথমে লাগে। xᵢ ≤ ১০০০ বলে x দিয়ে সূচিত অ্যারে চাকতির তালিকার জায়গা নেয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, r;
    scanf("%d %d", &n, &r);
    vector<double> top(1001, -1);  // -1: no disk in this column yet
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        double y = r;
        for (int c = max(1, x - 2 * r); c <= min(1000, x + 2 * r); c++)
            if (top[c] >= 0) {
                double dx = c - x;
                y = max(y, top[c] + sqrt(4.0 * r * r - dx * dx));
            }
        top[x] = max(top[x], y);
        printf("%.10f ", y);
    }
    puts("");
    return 0;
}
`,
      time: 'O(n · min(r, 1000))',
      space: 'O(1000)',
      accepted: true,
      toolkit: ['setprecision', 'vector'],
    },
  ],
  tests: [
    { input: '6 2\n5 5 6 8 3 12', output: '2 6.0 9.87298334621 13.3370849613 12.5187346573 13.3370849613', source: 'sample', note: sample(1) },
    { input: '2 1\n1 3', output: '1 1', source: 'own', note: L('Exactly 2r apart: they touch side by side.', 'ঠিক ২r দূরে: পাশাপাশি ছোঁয়।') },
  ],
  pitfalls: [
    L('Stopping at the first disk found instead of the highest contact.', 'সবচেয়ে উঁচু স্পর্শের বদলে প্রথম পাওয়া চাকতিতে থামা।'),
    L('Using < 2r and missing side-by-side contact.', '< ২r ব্যবহার করে পাশাপাশি স্পর্শ বাদ দেওয়া।'),
  ],
  related: [
    { id: '600D', name: 'Area of Two Circles’ Intersection', why: L('Distances between circle centres.', 'বৃত্তকেন্দ্রের দূরত্ব।') },
    { id: '1C', name: 'Ancient Berland Circus', why: L('Circles and coordinates.', 'বৃত্ত আর স্থানাঙ্ক।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 935C
export const p935C: ProblemEntry = {
  id: '935C',
  contestId: 935,
  index: 'C',
  name: 'Fifa and Fafa',
  rating: 1600,
  tags: ['geometry'],
  why: L(
    'The largest circle inside a circle that avoids a point: its centre sits on the line through the point and the big centre. A clean case analysis, or a ternary search along that line.',
    'বড় বৃত্তের ভেতরে একটি বিন্দু এড়ানো সবচেয়ে বড় বৃত্ত: তার কেন্দ্র বিন্দু আর বড় কেন্দ্রের সংযোগরেখায়। পরিচ্ছন্ন কেস বিশ্লেষণ, বা সেই রেখা বরাবর টার্নারি সার্চ।',
  ),
  statement: L(
    'A flat is a circle with centre (x₁, y₁) and radius R. Place a Wi-Fi access point at (x, y) with range r so that the circle of radius r lies inside the flat and the laptop at (x₂, y₂) is not strictly inside it, while r is as large as possible. The laptop may be outside the flat.',
    'একটি ফ্ল্যাট হলো কেন্দ্র (x₁, y₁) আর ব্যাসার্ধ R-এর বৃত্ত। (x, y)-এ পরিসর r-এর একটি ওয়াই-ফাই অ্যাক্সেস পয়েন্ট বসান যাতে r ব্যাসার্ধের বৃত্ত ফ্ল্যাটের ভেতরে থাকে আর (x₂, y₂)-এর ল্যাপটপ তার কঠোরভাবে ভেতরে না থাকে, আর r যত বড় সম্ভব হয়। ল্যাপটপ ফ্ল্যাটের বাইরেও থাকতে পারে।',
  ),
  input: L('R x₁ y₁ x₂ y₂.', 'R x₁ y₁ x₂ y₂।'),
  output: L('x y r.', 'x y r।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('R ≤ 10⁵, |coordinates| ≤ 10⁵', 'R ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁵'), L('The radius must be optimal within 10⁻⁶; the circle may stick out or cover the laptop by at most 10⁻⁶.', 'ব্যাসার্ধ ১০⁻⁶-এর মধ্যে সর্বোত্তম হতে হবে; বৃত্ত বড়জোর ১০⁻⁶ বাইরে যেতে বা ল্যাপটপ ঢাকতে পারে।')] },
  samples: [
    { input: '5 3 3 1 1', output: '3.7677669529663684 3.7677669529663684 3.914213562373095', explain: L('The laptop is inside: r = (R + d) / 2.', 'ল্যাপটপ ভেতরে: r = (R + d) / ২।') },
    { input: '10 5 5 5 15', output: '5.0 5.0 10.0', explain: L('The laptop is on the boundary: use the whole flat.', 'ল্যাপটপ সীমানায়: পুরো ফ্ল্যাট ব্যবহার।') },
  ],
  observation: L(
    'Let d be the distance from the laptop to the flat’s centre. If d ≥ R, the whole flat works. Otherwise the best circle touches the flat’s boundary at the point farthest from the laptop and passes through the laptop: its diameter is R + d, along the line from the laptop through the centre.',
    'd হোক ল্যাপটপ থেকে ফ্ল্যাটের কেন্দ্রের দূরত্ব। d ≥ R হলে পুরো ফ্ল্যাট চলে। নইলে সেরা বৃত্ত ল্যাপটপ থেকে সবচেয়ে দূরের সীমানা-বিন্দুতে ফ্ল্যাটকে ছোঁয় আর ল্যাপটপ দিয়ে যায়: ল্যাপটপ থেকে কেন্দ্রের দিকে রেখা বরাবর এর ব্যাস R + d।',
  ),
  approach: [
    L('d ≥ R: answer (x₁, y₁, R).', 'd ≥ R: উত্তর (x₁, y₁, R)।'),
    L('d = 0: r = R/2, centre at distance R/2 in any direction.', 'd = ০: r = R/২, যেকোনো দিকে R/২ দূরে কেন্দ্র।'),
    L('Otherwise r = (R + d)/2 and the centre is the laptop moved by r towards (x₁, y₁).', 'নইলে r = (R + d)/২ আর কেন্দ্র হলো ল্যাপটপকে (x₁, y₁)-এর দিকে r সরানো।'),
  ],
  walkthrough: {
    input: 'R = 5, centre (3,3), laptop (1,1)',
    steps: [
      { state: 'd = √8 ≈ 2.828 < 5', text: L('The laptop is inside.', 'ল্যাপটপ ভেতরে।') },
      { state: 'r = (5 + 2.828)/2 ≈ 3.914', text: L('Diameter from the laptop to the far side.', 'ল্যাপটপ থেকে দূরের প্রান্ত পর্যন্ত ব্যাস।') },
      { state: 'centre = (1,1) + r·(1,1)/√2 ≈ (3.768, 3.768)', text: L('Matches the sample.', 'স্যাম্পলের সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A few formulas.', 'কয়েকটি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Diameter from the laptop to the far wall', 'ল্যাপটপ থেকে দূরের দেয়াল পর্যন্ত ব্যাস'),
      idea: L('r = (R + d)/2, centre on the ray from the laptop through the flat’s centre.', 'r = (R + d)/২, কেন্দ্র ল্যাপটপ থেকে ফ্ল্যাটের কেন্দ্র দিয়ে যাওয়া রশ্মিতে।'),
      explain: [
        L(
          'Shrinking the flat by r, the centre must stay within distance R − r of the flat’s centre and at least r from the laptop. The farthest such point from the laptop is d + R − r away, so r is feasible iff d + R − r ≥ r, that is r ≤ (R + d)/2, with the centre on the line from the laptop through the flat’s centre.',
          'কেন্দ্রকে ফ্ল্যাটের কেন্দ্র থেকে R − r-এর মধ্যে আর ল্যাপটপ থেকে অন্তত r দূরে থাকতে হবে। এমন বিন্দুর মধ্যে ল্যাপটপ থেকে সবচেয়ে দূরেরটি d + R − r দূরে, তাই r সম্ভব যদি ও কেবল যদি d + R − r ≥ r, অর্থাৎ r ≤ (R + d)/২, আর কেন্দ্র ল্যাপটপ থেকে ফ্ল্যাটের কেন্দ্র দিয়ে যাওয়া রেখায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    double R, x1, y1, x2, y2;
    scanf("%lf %lf %lf %lf %lf", &R, &x1, &y1, &x2, &y2);
    double dx = x1 - x2, dy = y1 - y2, d = sqrt(dx * dx + dy * dy);
    if (d >= R) {                       // laptop outside: use the whole flat
        printf("%.10f %.10f %.10f\n", x1, y1, R);
        return 0;
    }
    if (d == 0) {                       // laptop at the centre: any direction
        printf("%.10f %.10f %.10f\n", x1 + R / 2, y1, R / 2);
        return 0;
    }
    double r = (R + d) / 2;
    printf("%.10f %.10f %.10f\n", x2 + dx / d * r, y2 + dy / d * r, r);
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search along the line', 'রেখা বরাবর টার্নারি সার্চ'),
      idea: L('For a centre c, the best radius is min(R − |c − O|, |c − laptop|); maximize over c on the line.', 'কেন্দ্র c-এর জন্য সেরা ব্যাসার্ধ min(R − |c − O|, |c − ল্যাপটপ|); রেখার ওপর c-এর জন্য সর্বোচ্চ।'),
      explain: [
        L(
          'Both terms are concave along a line (a constant minus a distance, and a distance that is linear on each side of the laptop), and their minimum has a single peak on the segment from the centre to the far wall. Ternary search finds it numerically.',
          'রেখা বরাবর দুটি পদই একবার চূড়ায় ওঠে, আর তাদের ন্যূনতমের কেন্দ্র থেকে দূরের দেয়াল পর্যন্ত রেখাংশে একটিই শিখর। টার্নারি সার্চ তা সংখ্যাগতভাবে খুঁজে পায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    double R, x1, y1, x2, y2;
    cin >> R >> x1 >> y1 >> x2 >> y2;
    double dx = x1 - x2, dy = y1 - y2, d = sqrt(dx * dx + dy * dy);
    if (d >= R) { printf("%.10f %.10f %.10f\n", x1, y1, R); return 0; }
    double ux = 1, uy = 0;                   // direction from the laptop through the centre
    if (d > 0) ux = dx / d, uy = dy / d;
    auto at = [&](double t, double& cx, double& cy) {  // t = signed offset from the flat's centre
        cx = x1 + ux * t, cy = y1 + uy * t;
        double toWall = R - fabs(t), toLaptop = hypot(cx - x2, cy - y2);
        return min(toWall, toLaptop);
    };
    double lo = 0, hi = R, cx, cy;
    for (int it = 0; it < 200; it++) {
        double a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
        if (at(a, cx, cy) < at(b, cx, cy)) lo = a; else hi = b;
    }
    double r = at((lo + hi) / 2, cx, cy);
    printf("%.10f %.10f %.10f\n", cx, cy, r);
    return 0;
}
`,
      time: 'O(iterations)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
  ],
  tests: [
    { input: '5 3 3 1 1', output: '3.7677669529663684 3.7677669529663684 3.914213562373095', source: 'sample', note: sample(1) },
    { input: '10 5 5 5 15', output: '5.0 5.0 10.0', source: 'sample', note: sample(2) },
    { input: '4 0 0 0 0', output: '2 0 2', source: 'own', note: L('Laptop at the centre: radius R/2 in any direction.', 'ল্যাপটপ কেন্দ্রে: যেকোনো দিকে ব্যাসার্ধ R/২।') },
  ],
  pitfalls: [
    L('Not handling the laptop outside the flat.', 'ল্যাপটপ ফ্ল্যাটের বাইরে থাকার কেস না ধরা।'),
    L('Dividing by d = 0 when the laptop is at the centre.', 'ল্যাপটপ কেন্দ্রে থাকলে d = ০ দিয়ে ভাগ।'),
  ],
  related: [
    { id: '600D', name: 'Area of Two Circles’ Intersection', why: L('Two circles and their centres.', 'দুটি বৃত্ত আর তাদের কেন্দ্র।') },
    { id: '1354C1', name: 'Simple Polygon Embedding', why: L('Ternary search on a geometric function.', 'জ্যামিতিক ফাংশনে টার্নারি সার্চ।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 559A
export const p559A: ProblemEntry = {
  id: '559A',
  contestId: 559,
  index: 'A',
  name: 'Gerald’s Hexagon',
  rating: 1600,
  tags: ['brute-force', 'geometry', 'math'],
  why: L(
    'Area by subtraction: a hexagon with 120° angles is a big triangle with three small triangles cut off its corners, and a triangle of side k holds k² unit triangles.',
    'বিয়োগ দিয়ে ক্ষেত্রফল: ১২০° কোণের ষড়ভুজ হলো একটি বড় ত্রিভুজ যার তিন কোণ থেকে তিনটি ছোট ত্রিভুজ কাটা, আর k বাহুর ত্রিভুজে k²টি একক ত্রিভুজ থাকে।',
  ),
  statement: L(
    'A hexagon has all angles equal to 120° and integer sides a₁ … a₆ in clockwise order. Lines parallel to the sides cut it into equilateral triangles with side 1. How many triangles are there?',
    'একটি ষড়ভুজের সব কোণ ১২০° আর ঘড়ির কাঁটার দিকে পূর্ণসংখ্যার বাহু a₁ … a₆। বাহুর সমান্তরাল রেখা একে ১ বাহুর সমবাহু ত্রিভুজে কাটে। কতগুলো ত্রিভুজ হয়?',
  ),
  input: L('a₁ … a₆.', 'a₁ … a₆।'),
  output: L('The number of unit triangles.', 'একক ত্রিভুজের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ aᵢ ≤ 1000; such a hexagon exists', '১ ≤ aᵢ ≤ ১০০০; এমন ষড়ভুজ আছে')] },
  samples: [
    { input: '1 1 1 1 1 1', output: '6', explain: L('The regular hexagon of side 1.', '১ বাহুর সুষম ষড়ভুজ।') },
    { input: '1 2 1 2 1 2', output: '13', explain: L('A triangle of side 4 (16) minus three corners of side 1.', '৪ বাহুর ত্রিভুজ (১৬) থেকে ১ বাহুর তিনটি কোণ বাদ।') },
  ],
  observation: L(
    'Extend sides a₁, a₃, a₅: they form an equilateral triangle of side a₁ + a₂ + a₃, and the hexagon is that triangle minus three corner triangles of sides a₁, a₃ and a₅. A triangle of side k contains k² unit triangles, so the answer is (a₁ + a₂ + a₃)² − a₁² − a₃² − a₅².',
    'a₁, a₃, a₅ বাহু বাড়ালে a₁ + a₂ + a₃ বাহুর একটি সমবাহু ত্রিভুজ হয়, আর ষড়ভুজ হলো সেই ত্রিভুজ থেকে a₁, a₃ আর a₅ বাহুর তিনটি কোণ-ত্রিভুজ বাদ। k বাহুর ত্রিভুজে k²টি একক ত্রিভুজ, তাই উত্তর (a₁ + a₂ + a₃)² − a₁² − a₃² − a₅²।',
  ),
  approach: [L('Plug into the formula.', 'সূত্রে বসানো।')],
  walkthrough: {
    input: '1 2 1 2 1 2',
    steps: [
      { state: '(1 + 2 + 1)² = 16', text: L('The big triangle.', 'বড় ত্রিভুজ।') },
      { state: '16 − 1 − 1 − 1 = 13', text: L('Remove the corners.', 'কোণগুলো বাদ।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'big-triangle',
      kind: 'optimal',
      title: L('Big triangle minus three corners', 'বড় ত্রিভুজ বিয়োগ তিন কোণ'),
      idea: L('(a₁ + a₂ + a₃)² − a₁² − a₃² − a₅².', '(a₁ + a₂ + a₃)² − a₁² − a₃² − a₅²।'),
      explain: [
        L(
          'Row k of a triangle of side s (from the top) has 2k − 1 unit triangles, and 1 + 3 + … + (2s − 1) = s². Cutting off a corner of side c removes c² of them.',
          's বাহুর ত্রিভুজের ওপর থেকে k-তম সারিতে ২k − ১টি একক ত্রিভুজ, আর ১ + ৩ + … + (২s − ১) = s²। c বাহুর একটি কোণ কাটলে তার c²টি বাদ যায়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a[6];
    for (auto& x : a) cin >> x;
    long long side = a[0] + a[1] + a[2];
    cout << side * side - a[0] * a[0] - a[2] * a[2] - a[4] * a[4] << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
    {
      id: 'brute',
      kind: 'method',
      title: L('Count strip by strip', 'ফালি ধরে গোনা'),
      idea: L('Each horizontal strip holds (top width + bottom width) triangles; the width changes by ±½ per slanted side.', 'প্রতিটি অনুভূমিক ফালিতে (ওপরের প্রস্থ + নিচের প্রস্থ) ত্রিভুজ; প্রতিটি হেলানো বাহুতে প্রস্থ ±½ বদলায়।'),
      explain: [
        L(
          'Put a₁ on top. For the first a₂ strips the right side goes outward, then inward for a₃ strips; the left side goes outward for a₆ strips, then inward for a₅. A strip of top width w and bottom width w′ holds w + w′ unit triangles.',
          'a₁-কে ওপরে রাখুন। প্রথম a₂ ফালিতে ডান বাহু বাইরের দিকে যায়, তারপর a₃ ফালিতে ভেতরে; বাম বাহু a₆ ফালিতে বাইরে, তারপর a₅-এ ভেতরে। ওপরের প্রস্থ w আর নিচের প্রস্থ w′-এর ফালিতে w + w′টি একক ত্রিভুজ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a[6];
    for (auto& x : a) cin >> x;
    long long rows = a[1] + a[2], total = 0;
    long long w2 = 2 * a[0];  // twice the current width, to keep halves integral
    for (long long k = 0; k < rows; k++) {
        long long right = k < a[1] ? 1 : -1;  // +1/2 or -1/2 per strip
        long long left = k < a[5] ? 1 : -1;
        long long next = w2 + right + left;
        total += (w2 + next) / 2;
        w2 = next;
    }
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(a₂ + a₃)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'ternary'],
    },
  ],
  tests: [
    { input: '1 1 1 1 1 1', output: '6', source: 'sample', note: sample(1) },
    { input: '1 2 1 2 1 2', output: '13', source: 'sample', note: sample(2) },
    { input: '1000 1000 1000 1000 1000 1000', output: '6000000', source: 'own', note: L('Largest regular hexagon: 6 · 1000².', 'সবচেয়ে বড় সুষম ষড়ভুজ: ৬ · ১০০০²।') },
  ],
  pitfalls: [
    L('Trying to compute the real area with √3 and dividing: rounding errors.', '√৩ দিয়ে আসল ক্ষেত্রফল বের করে ভাগ: গোলকরণের ভুল।'),
    L('Subtracting the wrong three sides: it must be every other side.', 'ভুল তিনটি বাহু বিয়োগ: একটি বাদে একটি বাহু হতে হবে।'),
  ],
  related: [
    { id: '1C', name: 'Ancient Berland Circus', why: L('Regular polygons and their geometry.', 'সুষম বহুভুজ আর তাদের জ্যামিতি।') },
    { id: '1354C1', name: 'Simple Polygon Embedding', why: L('Regular polygons by formula.', 'সূত্রে সুষম বহুভুজ।') },
  ],
  toolkit: ['long-long'],
};

// ───────────────────────────────────────────── 618C
export const p618C: ProblemEntry = {
  id: '618C',
  contestId: 618,
  index: 'C',
  name: 'Constellation',
  rating: 1600,
  tags: ['geometry', 'implementation'],
  why: L(
    'An existence proof that is also an algorithm: sort the points, take the first two, and the first point not on their line gives an empty triangle. The cross product does all the work.',
    'অস্তিত্বের প্রমাণ যা নিজেই অ্যালগরিদম: বিন্দুগুলো সাজিয়ে প্রথম দুটি নিন, আর তাদের রেখায় নেই এমন প্রথম বিন্দু একটি খালি ত্রিভুজ দেয়। সব কাজ ক্রস গুণফলের।',
  ),
  statement: L(
    'n distinct points are given, not all on one line. Choose three of them forming a triangle of positive area such that every other point lies strictly outside the triangle. Print their indices.',
    'n-টি ভিন্ন বিন্দু দেওয়া, সবাই এক রেখায় নয়। এমন তিনটি বাছুন যারা ধনাত্মক ক্ষেত্রফলের ত্রিভুজ বানায় আর অন্য প্রতিটি বিন্দু ত্রিভুজের কঠোরভাবে বাইরে থাকে। তাদের সূচক ছাপুন।',
  ),
  input: L('n, then n lines xᵢ yᵢ.', 'n, তারপর n লাইনে xᵢ yᵢ।'),
  output: L('Three indices.', 'তিনটি সূচক।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁵, |coordinates| ≤ 10⁹', '৩ ≤ n ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁹'), anyAnswer] },
  samples: [
    { input: '3\n0 1\n1 0\n1 1', output: '1 2 3', explain: L('Only three points.', 'মাত্র তিনটি বিন্দু।') },
    { input: '5\n0 0\n0 2\n2 0\n2 2\n1 1', output: '1 3 5', explain: L('Point 5 is the centre; 1, 3, 5 is an empty triangle.', 'বিন্দু ৫ কেন্দ্র; ১, ৩, ৫ একটি খালি ত্রিভুজ।') },
  ],
  observation: L(
    'Sort by (x, y). Let A, B be the first two points. Every point is lexicographically after B, so none lies strictly between A and B. Let C be the first point not on line AB. All points before C are on line AB beyond B, and all points after C come after C in sorted order, so nothing can be inside or on the triangle ABC except its corners.',
    '(x, y) দিয়ে সাজান। A, B হোক প্রথম দুটি বিন্দু। প্রতিটি বিন্দু অভিধানক্রমে B-এর পরে, তাই কেউ A আর B-এর কঠোরভাবে মাঝে নেই। C হোক রেখা AB-তে নেই এমন প্রথম বিন্দু। C-এর আগের সব বিন্দু B-এর পরে রেখা AB-তে, আর C-এর পরের সব বিন্দু সাজানো ক্রমে C-এর পরে, তাই কোণ ছাড়া ABC ত্রিভুজের ভেতরে বা সীমায় কিছু থাকতে পারে না।',
  ),
  approach: [
    L('Sort indices by (x, y).', '(x, y) দিয়ে সূচক সাজানো।'),
    L('Scan for the first point with a non-zero cross product against the first two.', 'প্রথম দুটির বিপরীতে অশূন্য ক্রস গুণফলের প্রথম বিন্দু খোঁজা।'),
  ],
  walkthrough: {
    input: '(0,0), (0,2), (2,0), (2,2), (1,1)',
    steps: [
      { state: 'sorted: (0,0), (0,2), (1,1), (2,0), (2,2)', text: L('A = (0,0), B = (0,2).', 'A = (০,০), B = (০,২)।') },
      { state: '(1,1) is not on x = 0 → C', text: L('Triangle 1, 2, 5 is empty.', 'ত্রিভুজ ১, ২, ৫ খালি।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One sort and one scan.', 'একবার সাজানো আর একবার স্ক্যান।') },
  solutions: [
    {
      id: 'sort',
      kind: 'optimal',
      title: L('First two sorted points and the first non-collinear one', 'সাজানো প্রথম দুটি বিন্দু আর প্রথম অ-একরেখীয়টি'),
      idea: L('The lexicographic order keeps every other point outside.', 'অভিধানক্রম অন্য প্রতিটি বিন্দুকে বাইরে রাখে।'),
      explain: [
        L(
          'Cross products can reach 8·10¹⁸ here (differences up to 2·10⁹), which still fits in a signed 64-bit integer, but only just: do not add two of them.',
          'এখানে ক্রস গুণফল ৮·১০¹⁸ পর্যন্ত যেতে পারে (পার্থক্য ২·১০⁹ পর্যন্ত), যা তবু সাইনড ৬৪-বিটে আঁটে, কিন্তু কোনোমতে: দুটি যোগ করবেন না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    vector<int> id(n);
    iota(id.begin(), id.end(), 0);
    sort(id.begin(), id.end(), [&](int a, int b) { return make_pair(x[a], y[a]) < make_pair(x[b], y[b]); });
    int a = id[0], b = id[1];
    for (int k = 2; k < n; k++) {
        int c = id[k];
        long long cr = (x[b] - x[a]) * (y[c] - y[a]) - (y[b] - y[a]) * (x[c] - x[a]);
        if (cr != 0) {
            printf("%d %d %d\n", a + 1, b + 1, c + 1);
            return 0;
        }
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'long-long'],
    },
    {
      id: 'min-area',
      kind: 'method',
      title: L('Nearest neighbour, then the smallest area', 'নিকটতম প্রতিবেশী, তারপর ক্ষুদ্রতম ক্ষেত্রফল'),
      idea: L('A = point 1, B = its nearest point, C = the non-collinear point with the smallest |cross(B − A, C − A)|.', 'A = বিন্দু ১, B = তার নিকটতম বিন্দু, C = ক্ষুদ্রতম |cross(B − A, C − A)|-এর অ-একরেখীয় বিন্দু।'),
      explain: [
        L(
          'A point strictly inside, or on edge AC or BC, would form a smaller positive area with A and B; a point on segment AB would be closer to A than B. So the minimal-area triangle is empty: an extremal-choice argument, no sorting needed.',
          'কঠোরভাবে ভেতরের, বা AC বা BC বাহুর ওপরের কোনো বিন্দু A আর B-এর সঙ্গে আরও ছোট ধনাত্মক ক্ষেত্রফল বানাত; AB রেখাংশের ওপরের বিন্দু B-এর চেয়ে A-এর কাছে হত। তাই ক্ষুদ্রতম-ক্ষেত্রফল ত্রিভুজ খালি: চরম-পছন্দের যুক্তি, সাজানো লাগে না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    int b = 1;
    auto d2 = [&](int i) { return (x[i] - x[0]) * (x[i] - x[0]) + (y[i] - y[0]) * (y[i] - y[0]); };
    for (int i = 2; i < n; i++) if (d2(i) < d2(b)) b = i;
    int c = -1;
    long long best = LLONG_MAX;
    for (int i = 1; i < n; i++) {
        long long cr = llabs((x[b] - x[0]) * (y[i] - y[0]) - (y[b] - y[0]) * (x[i] - x[0]));
        if (cr != 0 && cr < best) best = cr, c = i;
    }
    printf("%d %d %d\n", 1, b + 1, c + 1);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every triple', 'প্রতিটি ত্রয়ী চেষ্টা'),
      idea: L('Test all triangles and all other points with cross products.', 'ক্রস গুণফল দিয়ে সব ত্রিভুজ আর অন্য সব বিন্দু যাচাই।'),
      explain: [L('O(n⁴): only for tiny inputs, but it checks the definition directly.', 'O(n⁴): শুধু ক্ষুদ্র ইনপুটে, কিন্তু সরাসরি সংজ্ঞা যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    auto cr = [&](int a, int b, int c) { return (x[b] - x[a]) * (y[c] - y[a]) - (y[b] - y[a]) * (x[c] - x[a]); };
    auto sgn = [](long long v) { return (v > 0) - (v < 0); };
    for (int a = 0; a < n; a++)
        for (int b = a + 1; b < n; b++)
            for (int c = b + 1; c < n; c++) {
                long long area = cr(a, b, c);
                if (area == 0) continue;
                bool ok = true;
                for (int p = 0; p < n && ok; p++) {
                    if (p == a || p == b || p == c) continue;
                    int s1 = sgn(cr(a, b, p)), s2 = sgn(cr(b, c, p)), s3 = sgn(cr(c, a, p)), s = sgn(area);
                    if (s1 * s >= 0 && s2 * s >= 0 && s3 * s >= 0) ok = false;  // inside or on the border
                }
                if (ok) { cout << a + 1 << " " << b + 1 << " " << c + 1 << "\n"; return 0; }
            }
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
    { input: '3\n0 1\n1 0\n1 1', output: '1 2 3', source: 'sample', note: sample(1) },
    { input: '5\n0 0\n0 2\n2 0\n2 2\n1 1', output: '1 3 5', source: 'sample', note: sample(2) },
    { input: '4\n0 0\n1 0\n2 0\n0 1', output: '1 2 4', source: 'own', note: L('Three points on a line: take the two nearest ones.', 'তিনটি বিন্দু এক রেখায়: সবচেয়ে কাছের দুটি নিন।') },
  ],
  pitfalls: [
    L('Taking the first three sorted points: they may be collinear.', 'সাজানো প্রথম তিনটি বিন্দু নেওয়া: তারা একরেখীয় হতে পারে।'),
    L('Using doubles for the cross product with 10⁹ coordinates.', '১০⁹ স্থানাঙ্কে ক্রস গুণফলের জন্য double।'),
  ],
  related: [
    { id: '514B', name: 'Han Solo and Lazer Gun', why: L('Collinearity with cross products.', 'ক্রস গুণফলে একরেখীয়তা।') },
    { id: '166B', name: 'Polygons', why: L('Point-in-polygon with orientations.', 'অভিমুখ দিয়ে বহুভুজের ভেতরে বিন্দু।') },
  ],
  toolkit: ['sort', 'long-long'],
};

// ───────────────────────────────────────────── 407A
export const p407A: ProblemEntry = {
  id: '407A',
  contestId: 407,
  index: 'A',
  name: 'Triangle',
  rating: 1600,
  tags: ['brute-force', 'geometry', 'implementation', 'math'],
  why: L(
    'Lattice points on a circle: enumerate integer vectors of length a, rotate by 90° and scale to length b, and keep it only if everything stays on the grid and off the axes.',
    'বৃত্তের ওপর ল্যাটিস বিন্দু: a দৈর্ঘ্যের পূর্ণসংখ্যা ভেক্টর তালিকা করুন, ৯০° ঘুরিয়ে b দৈর্ঘ্যে বড় করুন, আর সব গ্রিডে আর অক্ষের বাইরে থাকলে তবেই রাখুন।',
  ),
  statement: L(
    'A right triangle has legs a and b. Place it on the plane so that all vertices have integer coordinates and no side is parallel to a coordinate axis, or report that it is impossible.',
    'একটি সমকোণী ত্রিভুজের লম্ব বাহু a আর b। এমনভাবে সমতলে বসান যাতে সব শীর্ষ পূর্ণসংখ্যা স্থানাঙ্কে থাকে আর কোনো বাহু অক্ষের সমান্তরাল না হয়, নইলে অসম্ভব জানান।',
  ),
  input: L('a b.', 'a b।'),
  output: L('NO, or YES and three lines with the vertices.', 'NO, অথবা YES আর তিন লাইনে শীর্ষগুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a, b ≤ 1000, |coordinates| ≤ 10⁹', '১ ≤ a, b ≤ ১০০০, |স্থানাঙ্ক| ≤ ১০⁹'), anyAnswer] },
  samples: [
    { input: '1 1', output: 'NO', explain: L('The only integer vectors of length 1 are axis-parallel.', '১ দৈর্ঘ্যের পূর্ণসংখ্যা ভেক্টর শুধু অক্ষ-সমান্তরাল।') },
    { input: '5 5', output: 'YES\n2 1\n5 5\n-2 4', explain: L('Legs (3, 4) and (−4, 3).', 'লম্ব বাহু (৩, ৪) আর (−৪, ৩)।') },
    { input: '5 10', output: 'YES\n-10 4\n-2 -2\n1 2', explain: L('Legs (8, −6) and (3, 4), scaled.', 'লম্ব বাহু (৮, −৬) আর (৩, ৪)।') },
  ],
  observation: L(
    'Put the right angle at the origin. Leg one is (x, y) with x² + y² = a² and x, y ≠ 0. Leg two must be perpendicular with length b: (−y, x) · b/a, which needs a to divide y·b and x·b. The hypotenuse (x + y·b/a, y − x·b/a) must also have both components non-zero.',
    'সমকোণটি মূলবিন্দুতে রাখুন। প্রথম লম্ব বাহু (x, y), যেখানে x² + y² = a² আর x, y ≠ ০। দ্বিতীয়টি লম্ব আর b দৈর্ঘ্যের হতে হবে: (−y, x) · b/a, যার জন্য a-কে y·b আর x·b ভাগ করতে হবে। অতিভুজ (x + y·b/a, y − x·b/a)-এর দুই উপাংশও অশূন্য হতে হবে।',
  ),
  approach: [
    L('Loop x from 1 to a − 1; y = √(a² − x²) must be an integer.', 'x = ১ থেকে a − ১; y = √(a² − x²) পূর্ণসংখ্যা হতে হবে।'),
    L('Check divisibility and the hypotenuse; print (0,0), (x,y), (−y·b/a, x·b/a).', 'বিভাজ্যতা আর অতিভুজ যাচাই; ছাপা (০,০), (x,y), (−y·b/a, x·b/a)।'),
  ],
  walkthrough: {
    input: 'a = b = 5',
    steps: [
      { state: 'x = 3, y = 4', text: L('3² + 4² = 25.', '৩² + ৪² = ২৫।') },
      { state: 'second leg (−4, 3), hypotenuse (7, 1)', text: L('No zero components: YES.', 'কোনো শূন্য উপাংশ নেই: YES।') },
    ],
  },
  complexity: { time: 'O(a)', space: 'O(1)', why: L('One square-root test per x.', 'প্রতি x-এ একটি বর্গমূল যাচাই।') },
  solutions: [
    {
      id: 'rotate',
      kind: 'optimal',
      title: L('Rotate the first leg by 90° and scale', 'প্রথম লম্ব বাহু ৯০° ঘুরিয়ে বড় করা'),
      idea: L('Second leg = (−y, x) · b/a when that is integral.', 'দ্বিতীয় লম্ব বাহু = (−y, x) · b/a, যদি তা পূর্ণসংখ্যা হয়।'),
      explain: [
        L(
          'Rotating (x, y) by 90° gives (−y, x), and the only perpendicular directions are ± that. So the search is one-dimensional: just the choice of the first leg.',
          '(x, y)-কে ৯০° ঘোরালে (−y, x), আর লম্ব দিক শুধু তার ±। তাই খোঁজ একমাত্রিক: শুধু প্রথম লম্ব বাহু বাছাই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    for (long long x = 1; x < a; x++) {
        long long y = llround(sqrt((double)(a * a - x * x)));
        if (x * x + y * y != a * a || y == 0) continue;
        if ((y * b) % a || (x * b) % a) continue;
        long long u = -y * b / a, v = x * b / a;  // perpendicular leg of length b
        if (x - u == 0 || y - v == 0) continue;     // hypotenuse parallel to an axis
        printf("YES\n0 0\n%lld %lld\n%lld %lld\n", x, y, u, v);
        return 0;
    }
    puts("NO");
    return 0;
}
`,
      time: 'O(a)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Pair every vector of length a with every vector of length b', 'a দৈর্ঘ্যের প্রতিটি ভেক্টরকে b দৈর্ঘ্যের প্রতিটির সঙ্গে জোড়া'),
      idea: L('List lattice vectors of both lengths and test the dot product.', 'দুই দৈর্ঘ্যের ল্যাটিস ভেক্টর তালিকা করে ডট গুণফল যাচাই।'),
      explain: [L('No rotation trick: perpendicularity is checked with the dot product. Still fast, since a circle has few lattice points.', 'কোনো ঘূর্ণন কৌশল নেই: লম্বতা ডট গুণফলে যাচাই। তবু দ্রুত, কারণ বৃত্তে ল্যাটিস বিন্দু অল্প।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<pair<long long, long long>> onCircle(long long r) {
    vector<pair<long long, long long>> v;
    for (long long x = -r; x <= r; x++)
        for (long long y = -r; y <= r; y++)
            if (x && y && x * x + y * y == r * r) v.push_back({x, y});
    return v;
}

int main() {
    long long a, b;
    cin >> a >> b;
    for (auto [x1, y1] : onCircle(a))
        for (auto [x2, y2] : onCircle(b))
            if (x1 * x2 + y1 * y2 == 0 && x1 != x2 && y1 != y2) {
                printf("YES\n0 0\n%lld %lld\n%lld %lld\n", x1, y1, x2, y2);
                return 0;
            }
    puts("NO");
    return 0;
}
`,
      time: 'O(a² + b²)',
      space: 'O(a + b)',
      accepted: false,
      toolkit: ['pair', 'structured-bindings'],
    },
  ],
  tests: [
    { input: '1 1', output: 'NO', source: 'sample', note: sample(1) },
    { input: '5 5', output: 'YES\n2 1\n5 5\n-2 4', source: 'sample', note: sample(2) },
    { input: '5 10', output: 'YES\n-10 4\n-2 -2\n1 2', source: 'sample', note: sample(3) },
    { input: '5 7', output: 'NO', source: 'own', note: L('7 has no lattice vector off the axes.', '৭-এর অক্ষের বাইরে কোনো ল্যাটিস ভেক্টর নেই।') },
  ],
  pitfalls: [
    L('Forgetting to check the hypotenuse: for some choices of legs it ends up parallel to an axis.', 'অতিভুজ যাচাই ভুলে যাওয়া: কিছু পছন্দে অতিভুজ অক্ষের সমান্তরাল হয়।'),
    L('Comparing sqrt results as doubles instead of re-squaring integers.', 'পূর্ণসংখ্যা আবার বর্গ না করে sqrt-এর double ফল তুলনা।'),
  ],
  related: [
    { id: '994C', name: 'Two Squares', why: L('Rotated shapes on a grid.', 'গ্রিডে ঘোরানো আকার।') },
    { id: '618C', name: 'Constellation', why: L('Integer geometry with vectors.', 'ভেক্টরসহ পূর্ণসংখ্যা জ্যামিতি।') },
  ],
  toolkit: ['long-long'],
};

// ───────────────────────────────────────────── 994C
export const p994C: ProblemEntry = {
  id: '994C',
  contestId: 994,
  index: 'C',
  name: 'Two Squares',
  rating: 1600,
  tags: ['geometry', 'implementation'],
  why: L(
    'Two ways to intersect shapes: test every grid point (the coordinates are tiny), or do real geometry with containment and segment intersection. Both are worth knowing.',
    'আকারের ছেদ বোঝার দুই উপায়: প্রতিটি গ্রিড বিন্দু পরীক্ষা (স্থানাঙ্ক ক্ষুদ্র), অথবা অন্তর্ভুক্তি আর রেখাংশের ছেদ দিয়ে আসল জ্যামিতি। দুটোই জানার মতো।',
  ),
  statement: L(
    'One square has sides parallel to the axes, the other is rotated by 45°. Each is given by its four vertices in some order. Do the squares have a common point (touching and containment count)?',
    'একটি বর্গের বাহু অক্ষের সমান্তরাল, অন্যটি ৪৫° ঘোরানো। প্রতিটি তার চারটি শীর্ষ দিয়ে দেওয়া (কোনো ক্রমে)। বর্গ দুটির কি কোনো সাধারণ বিন্দু আছে (ছোঁয়া আর ভেতরে থাকাও গণ্য)?',
  ),
  input: L('Two lines, each with 8 integers: the vertices.', 'দুই লাইন, প্রতিটিতে ৮টি পূর্ণসংখ্যা: শীর্ষগুলো।'),
  output: L('YES or NO.', 'YES বা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|coordinates| ≤ 100', '|স্থানাঙ্ক| ≤ ১০০')] },
  samples: [
    { input: '0 0 6 0 6 6 0 6\n1 3 3 5 5 3 3 1', output: 'YES', explain: L('The diamond lies inside the square.', 'হীরকটি বর্গের ভেতরে।') },
    { input: '0 0 6 0 6 6 0 6\n7 3 9 5 11 3 9 1', output: 'NO', explain: L('The diamond is to the right.', 'হীরকটি ডান দিকে।') },
    { input: '6 0 6 6 0 6 0 0\n7 4 4 7 7 10 10 7', output: 'YES', explain: L('They overlap near the corner (6, 6).', '(৬, ৬) কোণের কাছে ওভারল্যাপ।') },
  ],
  observation: L(
    'A point is in the axis square iff minX ≤ x ≤ maxX and minY ≤ y ≤ maxY; it is in the diamond with centre (cx, cy) and half-diagonal d iff |x − cx| + |y − cy| ≤ d. All corners are integers, so if the squares share a point they share one with half-integer coordinates; checking all such points in [−100, 100]² is cheap.',
    'একটি বিন্দু অক্ষ-বর্গে আছে যদি ও কেবল যদি minX ≤ x ≤ maxX আর minY ≤ y ≤ maxY; কেন্দ্র (cx, cy) আর অর্ধ-কর্ণ d-এর হীরকে আছে যদি ও কেবল যদি |x − cx| + |y − cy| ≤ d। সব কোণ পূর্ণসংখ্যা, তাই সাধারণ বিন্দু থাকলে অর্ধ-পূর্ণসংখ্যার একটি সাধারণ বিন্দু থাকে; [−১০০, ১০০]²-এ এমন সব বিন্দু যাচাই সস্তা।',
  ),
  approach: [
    L('Double all coordinates so half-integers become integers.', 'সব স্থানাঙ্ক দ্বিগুণ করুন যাতে অর্ধ-পূর্ণসংখ্যা পূর্ণসংখ্যা হয়।'),
    L('Check every grid point against both inequalities.', 'প্রতিটি গ্রিড বিন্দু দুটি অসমতার বিপরীতে যাচাই।'),
  ],
  walkthrough: {
    input: 'square [0,6]², diamond centre (3,3), d = 2',
    steps: [
      { state: 'point (3,3)', text: L('Inside both: YES.', 'দুটোরই ভেতরে: YES।') },
    ],
  },
  complexity: { time: 'O(C²)', space: 'O(1)', why: L('About 160 000 grid points.', 'প্রায় ১,৬০,০০০টি গ্রিড বিন্দু।') },
  solutions: [
    {
      id: 'grid',
      kind: 'optimal',
      title: L('Test every half-integer point', 'প্রতিটি অর্ধ-পূর্ণসংখ্যা বিন্দু পরীক্ষা'),
      idea: L('Shared point ⇒ shared half-integer point; scan them all.', 'সাধারণ বিন্দু থাকলে ⇒ সাধারণ অর্ধ-পূর্ণসংখ্যা বিন্দু; সবগুলো স্ক্যান।'),
      explain: [
        L(
          'When coordinates are small, brute force over the grid is the most reliable geometry: there are no special cases for touching or containment, just two inequalities per point.',
          'স্থানাঙ্ক ছোট হলে গ্রিডে ব্রুট ফোর্সই সবচেয়ে নির্ভরযোগ্য জ্যামিতি: ছোঁয়া বা অন্তর্ভুক্তির কোনো বিশেষ কেস নেই, প্রতি বিন্দুতে শুধু দুটি অসমতা।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int ax[4], ay[4], bx[4], by[4];
    for (int i = 0; i < 4; i++) cin >> ax[i] >> ay[i], ax[i] *= 2, ay[i] *= 2;
    for (int i = 0; i < 4; i++) cin >> bx[i] >> by[i], bx[i] *= 2, by[i] *= 2;
    int x1 = *min_element(ax, ax + 4), x2 = *max_element(ax, ax + 4);
    int y1 = *min_element(ay, ay + 4), y2 = *max_element(ay, ay + 4);
    int cx = (*min_element(bx, bx + 4) + *max_element(bx, bx + 4)) / 2;
    int cy = (*min_element(by, by + 4) + *max_element(by, by + 4)) / 2;
    int d = *max_element(bx, bx + 4) - cx;  // half-diagonal of the diamond
    for (int x = -200; x <= 200; x++)
        for (int y = -200; y <= 200; y++)
            if (x1 <= x && x <= x2 && y1 <= y && y <= y2 && abs(x - cx) + abs(y - cy) <= d) {
                puts("YES");
                return 0;
            }
    puts("NO");
    return 0;
}
`,
      time: 'O(C²)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max', 'for-loop'],
    },
    {
      id: 'segments',
      kind: 'method',
      title: L('Containment plus edge intersection', 'অন্তর্ভুক্তি আর বাহুর ছেদ'),
      idea: L('Two convex shapes meet iff a vertex of one lies in the other or two edges intersect.', 'দুটি উত্তল আকার মেলে যদি ও কেবল যদি একটির শীর্ষ অন্যটির ভেতরে থাকে বা দুটি বাহু ছেদ করে।'),
      explain: [
        L(
          'This is the general method that also works with huge coordinates. Segment intersection uses orientation signs (cross products) plus a bounding-box check for the collinear case.',
          'এটি সাধারণ পদ্ধতি যা বিশাল স্থানাঙ্কেও চলে। রেখাংশের ছেদ অভিমুখের চিহ্ন (ক্রস গুণফল) আর একরেখীয় কেসের জন্য বাউন্ডিং-বক্স যাচাই ব্যবহার করে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
struct P { ll x, y; };
ll cross(P o, P a, P b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); }
int sgn(ll v) { return (v > 0) - (v < 0); }
bool onSeg(P a, P b, P p) {
    return min(a.x, b.x) <= p.x && p.x <= max(a.x, b.x) && min(a.y, b.y) <= p.y && p.y <= max(a.y, b.y);
}
bool segInter(P a, P b, P c, P d) {
    int d1 = sgn(cross(c, d, a)), d2 = sgn(cross(c, d, b)), d3 = sgn(cross(a, b, c)), d4 = sgn(cross(a, b, d));
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
    if (!d1 && onSeg(c, d, a)) return true;
    if (!d2 && onSeg(c, d, b)) return true;
    if (!d3 && onSeg(a, b, c)) return true;
    if (!d4 && onSeg(a, b, d)) return true;
    return false;
}
// order the 4 vertices counter-clockwise around their centre
vector<P> ccw(vector<P> v) {
    double cx = 0, cy = 0;
    for (auto& p : v) cx += p.x / 4.0, cy += p.y / 4.0;
    sort(v.begin(), v.end(), [&](P a, P b) { return atan2(a.y - cy, a.x - cx) < atan2(b.y - cy, b.x - cx); });
    return v;
}
bool inside(const vector<P>& poly, P p) {  // convex, counter-clockwise, border counts
    for (int i = 0; i < 4; i++) if (cross(poly[i], poly[(i + 1) % 4], p) < 0) return false;
    return true;
}

int main() {
    vector<P> a(4), b(4);
    for (auto& p : a) cin >> p.x >> p.y;
    for (auto& p : b) cin >> p.x >> p.y;
    a = ccw(a), b = ccw(b);
    bool hit = false;
    for (int i = 0; i < 4; i++) hit |= inside(a, b[i]) || inside(b, a[i]);
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 4; j++) hit |= segInter(a[i], a[(i + 1) % 4], b[j], b[(j + 1) % 4]);
    puts(hit ? "YES" : "NO");
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['sort', 'functions', 'lambda'],
    },
  ],
  tests: [
    { input: '0 0 6 0 6 6 0 6\n1 3 3 5 5 3 3 1', output: 'YES', source: 'sample', note: sample(1) },
    { input: '0 0 6 0 6 6 0 6\n7 3 9 5 11 3 9 1', output: 'NO', source: 'sample', note: sample(2) },
    { input: '6 0 6 6 0 6 0 0\n7 4 4 7 7 10 10 7', output: 'YES', source: 'sample', note: sample(3) },
    { input: '0 0 2 0 2 2 0 2\n3 1 4 2 5 1 4 0', output: 'NO', source: 'own', note: L('A gap of one unit.', 'এক এককের ফাঁক।') },
    { input: '0 0 2 0 2 2 0 2\n2 1 3 2 4 1 3 0', output: 'YES', source: 'own', note: L('They touch at the single point (2, 1).', 'শুধু (২, ১) বিন্দুতে ছোঁয়।') },
  ],
  pitfalls: [
    L('Checking only vertex containment: two squares can cross like a plus sign with no vertex inside the other.', 'শুধু শীর্ষের অন্তর্ভুক্তি দেখা: দুটি বর্গ যোগচিহ্নের মতো ছেদ করতে পারে যেখানে কোনো শীর্ষ অন্যটির ভেতরে নেই।'),
    L('Assuming the vertices are given in order.', 'শীর্ষগুলো ক্রমে দেওয়া ধরে নেওয়া।'),
  ],
  related: [
    { id: '407A', name: 'Triangle', why: L('Rotated shapes on the integer grid.', 'পূর্ণসংখ্যা গ্রিডে ঘোরানো আকার।') },
    { id: '166B', name: 'Polygons', why: L('Point-in-convex-polygon tests.', 'উত্তল বহুভুজে বিন্দু যাচাই।') },
  ],
  toolkit: ['min-max'],
};
