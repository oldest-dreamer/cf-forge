import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');

const fftCode = raw`using cd = complex<double>;
const double PI = acos(-1);

void fft(vector<cd>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wl(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wl;
            }
        }
    }
    if (invert) for (cd& x : a) x /= n;
}

vector<long long> multiply(const vector<long long>& a, const vector<long long>& b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < (int)(a.size() + b.size())) n <<= 1;
    fa.resize(n);
    fb.resize(n);
    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);
    vector<long long> res(n);
    for (int i = 0; i < n; i++) res[i] = llround(fa[i].real());
    return res;
}`;

export const p578C: ProblemEntry = {
  id: '578C',
  contestId: 578,
  index: 'C',
  name: 'Weakness and Poorness',
  rating: 2000,
  tags: ['ternary-search'],
  featuredFor: ['ternary-search'],
  why: L('f(x) = max |subarray sum of aᵢ − x| is convex in x, so ternary search finds its minimum.', 'f(x) = max |aᵢ − x-এর সাবঅ্যারে যোগফল| x-এ উত্তল, তাই টার্নারি সার্চ এর সর্বনিম্ন খুঁজে পায়।'),
  statement: L('Choose a real x and subtract it from every element. The weakness is the maximum absolute value of a subarray sum. Minimise the weakness.', 'একটি বাস্তব x বেছে প্রতিটি উপাদান থেকে বিয়োগ করুন। দুর্বলতা হলো একটি সাবঅ্যারে যোগফলের সর্বোচ্চ পরম মান। দুর্বলতা সর্বনিম্ন করুন।'),
  input: L('n, then the array.', 'n, তারপর অ্যারে।'),
  output: L('The minimum weakness.', 'সর্বনিম্ন দুর্বলতা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵, |aᵢ| ≤ 10⁴', 'n ≤ ২·১০⁵, |aᵢ| ≤ ১০⁴'), realAnswer] },
  samples: [
    { input: '3\n1 2 3', output: '1.000000000000000', explain: L('x = 2 gives −1, 0, 1.', 'x = ২ দেয় −১, ০, ১।') },
    { input: '4\n1 2 3 4', output: '2.000000000000000', explain: L('x = 2.5.', 'x = ২.৫।') },
    { input: '10\n1 10 2 9 3 8 4 7 5 6', output: '4.500000000000000', explain: L('x = 5.5.', 'x = ৫.৫।') },
  ],
  observation: L('For a fixed subarray of length ℓ and sum s, |s − ℓx| is convex in x. A maximum of convex functions is convex, so f has a single valley: ternary search on x. Evaluating f is Kadane’s algorithm for the maximum and the minimum subarray sum.', 'ℓ দৈর্ঘ্য আর s যোগফলের একটি নির্দিষ্ট সাবঅ্যারের জন্য |s − ℓx| x-এ উত্তল। উত্তল ফাংশনের সর্বোচ্চ উত্তল, তাই f-এর একটিই উপত্যকা: x-এ টার্নারি সার্চ। f মূল্যায়ন হলো সর্বোচ্চ আর সর্বনিম্ন সাবঅ্যারে যোগফলের জন্য কাদানের অ্যালগরিদম।'),
  approach: [L('100 iterations on [−10⁴, 10⁴], each O(n).', '[−১০⁴, ১০⁴]-এ ১০০টি পুনরাবৃত্তি, প্রতিটি O(n)।')],
  walkthrough: { input: '1 2 3', steps: [{ state: 'f(1) = 3, f(2) = 1, f(3) = 3', text: L('The valley is at x = 2.', 'উপত্যকা x = ২-এ।') }] },
  complexity: { time: 'O(100 · n)', space: 'O(n)', why: L('Kadane per evaluation.', 'প্রতি মূল্যায়নে কাদান।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Ternary search + Kadane', 'টার্নারি সার্চ + কাদান'),
      idea: L('Shrink the interval by a third each step.', 'প্রতি ধাপে ব্যবধান এক-তৃতীয়াংশ ছোট।'),
      explain: [L('Compare f(m₁) and f(m₂) at the thirds: the larger side cannot contain the minimum of a convex function. 100 iterations shrink 2·10⁴ by (2/3)¹⁰⁰, far below 10⁻⁶.', 'তৃতীয়াংশে f(m₁) আর f(m₂) তুলনা: উত্তল ফাংশনের সর্বনিম্ন বড় দিকে থাকতে পারে না। ১০০টি পুনরাবৃত্তি ২·১০⁴-কে (২/৩)¹⁰⁰ গুণে ছোট করে, ১০⁻⁶-এর অনেক নিচে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<double> a;

double f(double x) {
    double best = 0, cur = 0, worst = 0, cur2 = 0;
    for (double v : a) {
        cur = max(0.0, cur + v - x);
        cur2 = min(0.0, cur2 + v - x);
        best = max(best, cur);
        worst = min(worst, cur2);
    }
    return max(best, -worst);
}

int main() {
    scanf("%d", &n);
    a.resize(n);
    for (auto& v : a) scanf("%lf", &v);
    double lo = -1e4, hi = 1e4;
    for (int it = 0; it < 100; it++) {
        double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2; else lo = m1;
    }
    printf("%.15f\n", f((lo + hi) / 2));
    return 0;
}
`,
      time: 'O(100 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'functions'],
    },
    {
      id: 'binary-balance',
      kind: 'method',
      title: L('Binary search where the two sides balance', 'যেখানে দুই দিক সমান সেখানে বাইনারি সার্চ'),
      idea: L('maxSub(x) decreases and −minSub(x) increases; find where they cross.', 'maxSub(x) কমে আর −minSub(x) বাড়ে; যেখানে তারা ছেদ করে তা খুঁজুন।'),
      explain: [L('f = max(P(x), N(x)) with P decreasing and N increasing, so the minimum is at their crossing. Comparing P and N gives a monotone predicate, so plain binary search works, with half the evaluations of ternary search.', 'f = max(P(x), N(x)) যেখানে P কমে আর N বাড়ে, তাই সর্বনিম্ন তাদের ছেদে। P আর N তুলনা একটি একমুখী শর্ত দেয়, তাই সাধারণ বাইনারি সার্চ চলে, টার্নারি সার্চের অর্ধেক মূল্যায়নে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<double> a(n);
    for (auto& v : a) scanf("%lf", &v);
    auto sides = [&](double x) {
        double P = 0, N = 0, cp = 0, cn = 0;
        for (double v : a) {
            cp = max(0.0, cp + v - x); P = max(P, cp);
            cn = min(0.0, cn + v - x); N = max(N, -cn);
        }
        return make_pair(P, N);
    };
    double lo = -1e4, hi = 1e4;
    for (int it = 0; it < 100; it++) {
        double mid = (lo + hi) / 2;
        auto [P, N] = sides(mid);
        if (P > N) lo = mid; else hi = mid;
    }
    auto [P, N] = sides((lo + hi) / 2);
    printf("%.15f\n", max(P, N));
    return 0;
}
`,
      time: 'O(100 · n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'structured-bindings'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every breakpoint', 'প্রতিটি ভাঙন-বিন্দু যাচাই'),
      idea: L('The optimum is where a rising and a falling line meet: x = (s₁ + s₂) / (ℓ₁ + ℓ₂).', 'সেরাটি যেখানে একটি ওঠা আর একটি নামা রেখা মেলে: x = (s₁ + s₂) / (ℓ₁ + ℓ₂)।'),
      explain: [L('f is piecewise linear; evaluating it at every intersection of two subarray lines finds the exact minimum. Exact but O(n⁵).', 'f খণ্ডে খণ্ডে রৈখিক; দুটি সাবঅ্যারে রেখার প্রতিটি ছেদে মূল্যায়ন নিখুঁত সর্বনিম্ন দেয়। নিখুঁত কিন্তু O(n⁵)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<double> a(n);
    for (auto& v : a) cin >> v;
    if (n > 8) { cout << "\n"; return 0; }
    vector<pair<double, double>> seg;  // (sum, length)
    for (int l = 0; l < n; l++) {
        double s = 0;
        for (int r = l; r < n; r++) { s += a[r]; seg.push_back({s, double(r - l + 1)}); }
    }
    auto f = [&](double x) {
        double m = 0;
        for (auto [s, len] : seg) m = max(m, fabs(s - len * x));
        return m;
    };
    double best = 1e18;
    for (auto [s1, l1] : seg)
        for (auto [s2, l2] : seg) best = min(best, f((s1 + s2) / (l1 + l2)));
    printf("%.15f\n", best);
    return 0;
}
`,
      time: 'O(n⁶)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '3\n1 2 3', output: '1.000000000000000', source: 'sample', note: sample(1) },
    { input: '4\n1 2 3 4', output: '2.000000000000000', source: 'sample', note: sample(2) },
    { input: '10\n1 10 2 9 3 8 4 7 5 6', output: '4.500000000000000', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Too few iterations for 10⁻⁶ precision.', '১০⁻⁶ নির্ভুলতার জন্য কম পুনরাবৃত্তি।'), L('Ternary search on a function that is not unimodal.', 'একমুখী-চূড়া নয় এমন ফাংশনে টার্নারি সার্চ।')],
  related: [{ id: '1355E', name: 'Restorer Distance', why: L('Ternary search over integers.', 'পূর্ণসংখ্যায় টার্নারি সার্চ।') }],
  toolkit: ['setprecision'],
};

export const p1355E: ProblemEntry = {
  id: '1355E',
  contestId: 1355,
  index: 'E',
  name: 'Restorer Distance',
  rating: 2100,
  tags: ['binary-search', 'greedy', 'math', 'sortings', 'ternary-search'],
  why: L('For a fixed final height the cost is a simple formula, and that cost is unimodal in the height.', 'নির্দিষ্ট চূড়ান্ত উচ্চতায় খরচ একটি সরল সূত্র, আর সেই খরচ উচ্চতায় একচূড়া।'),
  statement: L('Pillars have heights hᵢ. Adding a brick costs A, removing one costs R, moving one from a pillar to another costs M. Make all heights equal at minimum cost.', 'স্তম্ভগুলোর উচ্চতা hᵢ। একটি ইট যোগে A, সরাতে R, এক স্তম্ভ থেকে আরেকটিতে সরাতে M খরচ। সব উচ্চতা সর্বনিম্ন খরচে সমান করুন।'),
  input: L('n A R M, then the heights.', 'n A R M, তারপর উচ্চতাগুলো।'),
  output: L('The minimum cost.', 'সর্বনিম্ন খরচ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 10⁵, values ≤ 10⁹', 'n ≤ ১০⁵, মান ≤ ১০⁹')] },
  samples: [
    { input: '3 1 100 100\n1 3 8', output: '12', explain: L('Raise everything to 8.', 'সবকিছু ৮-এ তুলুন।') },
    { input: '3 100 1 100\n1 3 8', output: '9', explain: L('Lower everything to 1.', 'সবকিছু ১-এ নামান।') },
    { input: '3 100 100 1\n1 3 8', output: '4', explain: L('Move bricks to reach height 4.', 'উচ্চতা ৪-এ পৌঁছাতে ইট সরান।') },
    { input: '5 1 2 4\n5 5 3 6 5', output: '4', explain: L('Mix of operations.', 'অপারেশনের মিশ্রণ।') },
    { input: '5 1 2 2\n5 5 3 6 5', output: '3', explain: L('Moving is cheap here.', 'এখানে সরানো সস্তা।') },
  ],
  observation: L('Set M = min(M, A + R). For final height H let P = bricks above H and Q = bricks missing below H. Move min(P, Q) bricks, then remove or add the rest: cost(H) = min(P, Q) · M + (P − min) · R + (Q − min) · A. This is unimodal in H, so ternary search over integers.', 'M = min(M, A + R) ধরুন। চূড়ান্ত উচ্চতা H-এর জন্য P = H-এর ওপরের ইট আর Q = H-এর নিচে অনুপস্থিত ইট। min(P, Q)টি ইট সরান, তারপর বাকিগুলো সরান বা যোগ করুন: cost(H) = min(P, Q) · M + (P − min) · R + (Q − min) · A। এটি H-এ একচূড়া, তাই পূর্ণসংখ্যায় টার্নারি সার্চ।'),
  approach: [L('Integer ternary search on [min h, max h]; finish by scanning the last few heights.', '[min h, max h]-এ পূর্ণসংখ্যা টার্নারি সার্চ; শেষ কয়েকটি উচ্চতা স্ক্যান করে শেষ।')],
  walkthrough: { input: 'A = R = 100, M = 1, heights 1 3 8', steps: [{ state: 'H = 4: P = 4, Q = 3 + 1 = 4', text: L('4 moves · 1 = 4.', '৪টি সরানো · ১ = ৪।') }] },
  complexity: { time: 'O(n log V)', space: 'O(n)', why: L('O(n) per evaluation, O(log V) evaluations.', 'প্রতি মূল্যায়নে O(n), O(log V)টি মূল্যায়ন।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Integer ternary search', 'পূর্ণসংখ্যা টার্নারি সার্চ'),
      idea: L('Stop when the interval is small and check it fully.', 'ব্যবধান ছোট হলে থেমে পুরোটা যাচাই।'),
      explain: [L('On integers, ternary search loops while hi − lo > 2 and then tries the remaining candidates, avoiding off-by-one traps on flat plateaus.', 'পূর্ণসংখ্যায় টার্নারি সার্চ hi − lo > ২ পর্যন্ত চলে তারপর বাকি প্রার্থী চেষ্টা করে, সমতল মালভূমিতে এক-এর ভুল এড়িয়ে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
long long A, R, M;
vector<long long> h;

long long cost(long long H) {
    long long P = 0, Q = 0;
    for (long long x : h) { if (x > H) P += x - H; else Q += H - x; }
    long long mv = min(P, Q);
    return mv * M + (P - mv) * R + (Q - mv) * A;
}

int main() {
    scanf("%d %lld %lld %lld", &n, &A, &R, &M);
    M = min(M, A + R);
    h.resize(n);
    for (auto& x : h) scanf("%lld", &x);
    long long lo = *min_element(h.begin(), h.end()), hi = *max_element(h.begin(), h.end());
    while (hi - lo > 2) {
        long long m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (cost(m1) <= cost(m2)) hi = m2; else lo = m1;
    }
    long long best = LLONG_MAX;
    for (long long H = lo; H <= hi; H++) best = min(best, cost(H));
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n log V)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max', 'functions'],
    },
    {
      id: 'candidates',
      kind: 'method',
      title: L('Only a few candidate heights', 'শুধু কয়েকটি প্রার্থী উচ্চতা'),
      idea: L('The optimum is at some hᵢ or at ⌊avg⌋ / ⌈avg⌉; sort and use prefix sums.', 'সেরাটি কোনো hᵢ-এ বা ⌊গড়⌋ / ⌈গড়⌉-এ; সর্ট করে প্রিফিক্স সাম।'),
      explain: [L('Between consecutive heights the cost is linear except where P = Q switches the min, i.e. at the average. So it suffices to test the n heights and the two integers around the mean, each in O(log n) with prefix sums.', 'পরপর উচ্চতার মাঝে খরচ রৈখিক, শুধু যেখানে P = Q min বদলায় সেখানে নয়, অর্থাৎ গড়ে। তাই n-টি উচ্চতা আর গড়ের চারপাশের দুটি পূর্ণসংখ্যা পরীক্ষা যথেষ্ট, প্রতিটি প্রিফিক্স সামে O(log n)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long A, R, M;
    scanf("%d %lld %lld %lld", &n, &A, &R, &M);
    M = min(M, A + R);
    vector<long long> h(n);
    for (auto& x : h) scanf("%lld", &x);
    sort(h.begin(), h.end());
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + h[i];
    auto cost = [&](long long H) {
        int k = lower_bound(h.begin(), h.end(), H) - h.begin();  // h[0..k) < H
        long long Q = H * k - pre[k], P = (pre[n] - pre[k]) - H * (n - k);
        long long mv = min(P, Q);
        return mv * M + (P - mv) * R + (Q - mv) * A;
    };
    long long best = LLONG_MAX;
    for (long long x : h) best = min(best, cost(x));
    long long avg = pre[n] / n;
    best = min({best, cost(avg), cost(avg + 1)});
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'lower-bound', 'sort'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every height', 'প্রতিটি উচ্চতা চেষ্টা'),
      idea: L('Scan H from min to max.', 'min থেকে max পর্যন্ত H স্ক্যান।'),
      explain: [L('O(n · range): small heights only.', 'O(n · পরিসর): শুধু ছোট উচ্চতা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long A, R, M;
    cin >> n >> A >> R >> M;
    vector<long long> h(n);
    for (auto& x : h) cin >> x;
    long long lo = *min_element(h.begin(), h.end()), hi = *max_element(h.begin(), h.end());
    if (hi - lo > 100000) { cout << "\n"; return 0; }
    long long best = LLONG_MAX;
    for (long long H = lo; H <= hi; H++) {
        long long P = 0, Q = 0;
        for (long long x : h) { if (x > H) P += x - H; else Q += H - x; }
        // try every number of moves, not only min(P, Q)
        for (long long mv = 0; mv <= min(P, Q); mv++) best = min(best, mv * M + (P - mv) * R + (Q - mv) * A);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(range · (n + V))',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '3 1 100 100\n1 3 8', output: '12', source: 'sample', note: sample(1) },
    { input: '3 100 1 100\n1 3 8', output: '9', source: 'sample', note: sample(2) },
    { input: '3 100 100 1\n1 3 8', output: '4', source: 'sample', note: sample(3) },
    { input: '5 1 2 4\n5 5 3 6 5', output: '4', source: 'sample', note: sample(4) },
    { input: '5 1 2 2\n5 5 3 6 5', output: '3', source: 'sample', note: sample(5) },
  ],
  pitfalls: [L('Forgetting M = min(M, A + R).', 'M = min(M, A + R) ভুলে যাওয়া।'), L('Overflow: sums reach 10¹⁴ and costs 10¹⁸.', 'ওভারফ্লো: যোগফল ১০¹⁴ আর খরচ ১০¹⁸ পর্যন্ত।')],
  related: [{ id: '578C', name: 'Weakness and Poorness', why: L('Ternary search on a convex function.', 'উত্তল ফাংশনে টার্নারি সার্চ।') }],
  toolkit: ['long-long'],
};

export const p939E: ProblemEntry = {
  id: '939E',
  contestId: 939,
  index: 'E',
  name: 'Maximize!',
  rating: 1800,
  tags: ['binary-search', 'greedy', 'ternary-search', 'two-pointers'],
  why: L('The best set is the newest maximum plus a prefix of the smallest numbers; the prefix length only grows.', 'সেরা সেট হলো নতুনতম সর্বোচ্চ আর সবচেয়ে ছোট সংখ্যার একটি প্রিফিক্স; প্রিফিক্সের দৈর্ঘ্য শুধু বাড়ে।'),
  statement: L('Process queries: “1 x” adds x to a multiset (x is never smaller than earlier numbers); “2” asks for the maximum of max(S) − mean(S) over non-empty subsets S.', 'কোয়েরি প্রক্রিয়া: “১ x” একটি মাল্টিসেটে x যোগ করে (x আগের সংখ্যার চেয়ে কখনো ছোট নয়); “২” অ-খালি সাবসেট S-এর ওপর max(S) − mean(S)-এর সর্বোচ্চ জানতে চায়।'),
  input: L('Q, then the queries.', 'Q, তারপর কোয়েরিগুলো।'),
  output: L('One real number per type-2 query.', 'প্রতিটি ধরন-২ কোয়েরিতে একটি বাস্তব সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Q ≤ 5·10⁵', 'Q ≤ ৫·১০⁵'), realAnswer] },
  samples: [
    { input: '6\n1 3\n2\n1 4\n2\n1 8\n2', output: '0.0000000000\n0.5000000000\n3.0000000000', explain: L('After 3, 4, 8: S = {3, 8} gives 8 − 5.5 = 2.5, S = {3, 4, 8} gives 8 − 5 = 3.', '৩, ৪, ৮-এর পরে: S = {৩, ৮} দেয় ৮ − ৫.৫ = ২.৫, S = {৩, ৪, ৮} দেয় ৮ − ৫ = ৩।') },
    { input: '4\n1 1\n1 4\n1 5\n2', output: '2.0000000000', explain: L('S = {1, 5}: 5 − 3 = 2.', 'S = {১, ৫}: ৫ − ৩ = ২।') },
  ],
  observation: L('For a fixed maximum, adding a smaller element helps iff it is below the current mean; so take the largest element plus the k smallest elements. As the maximum only grows, the best k never decreases, so a pointer advances while adding the next smallest element improves the value.', 'একটি নির্দিষ্ট সর্বোচ্চের জন্য একটি ছোট উপাদান যোগ সাহায্য করে ঠিক তখনই যখন এটি বর্তমান গড়ের নিচে; তাই সবচেয়ে বড় উপাদান আর k-টি সবচেয়ে ছোট উপাদান নিন। সর্বোচ্চ শুধু বাড়ে বলে সেরা k কখনো কমে না, তাই পরের ছোট উপাদান যোগ মান বাড়ালে একটি পয়েন্টার এগোয়।'),
  approach: [L('Keep the numbers in insertion order (already sorted), a prefix sum and a pointer k.', 'সংখ্যাগুলো যোগের ক্রমে রাখুন (আগেই সাজানো), একটি প্রিফিক্স সাম আর একটি পয়েন্টার k।')],
  walkthrough: { input: '3 4 8', steps: [{ state: 'k = 1: 8 − (8 + 3)/2 = 2.5; k = 2: 8 − 15/3 = 3', text: L('Answer 3.', 'উত্তর ৩।') }] },
  complexity: { time: 'O(Q)', space: 'O(Q)', why: L('Amortised pointer moves.', 'গড় পয়েন্টার সরানো।') },
  solutions: [
    {
      id: 'pointer',
      kind: 'optimal',
      title: L('Monotone pointer over the prefix', 'প্রিফিক্সের ওপর একমুখী পয়েন্টার'),
      idea: L('Advance k while the next small element is below the current mean.', 'পরের ছোট উপাদান বর্তমান গড়ের নিচে হলে k এগোন।'),
      explain: [L('The function of k is unimodal, which is why the problem is tagged ternary search; monotonicity across queries makes a two-pointer walk even faster.', 'k-এর ফাংশন একচূড়া, তাই প্রবলেমটি টার্নারি সার্চ ট্যাগ পেয়েছে; কোয়েরির মধ্যে একমুখিতা টু-পয়েন্টার হাঁটাকে আরও দ্রুত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    scanf("%d", &q);
    vector<long long> a, pre = {0};
    int k = 0;  // number of small elements used
    while (q--) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            long long x;
            scanf("%lld", &x);
            a.push_back(x);
            pre.push_back(pre.back() + x);
        } else {
            int n = a.size();
            long long mx = a.back();
            auto value = [&](int kk) { return mx - double(pre[kk] + mx) / (kk + 1); };
            while (k + 1 < n && value(k + 1) >= value(k)) k++;
            printf("%.10f\n", value(k));
        }
    }
    return 0;
}
`,
      time: 'O(Q)',
      space: 'O(Q)',
      accepted: true,
      toolkit: ['prefix-sum', 'lambda', 'setprecision'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search on k per query', 'প্রতি কোয়েরিতে k-এর ওপর টার্নারি সার্চ'),
      idea: L('value(k) rises then falls; find its peak on integers.', 'value(k) ওঠে তারপর নামে; পূর্ণসংখ্যায় এর চূড়া খুঁজুন।'),
      explain: [L('Without noticing the monotone pointer, a per-query ternary search over k ∈ [0, n − 1] is O(log n) per query and still fast enough.', 'একমুখী পয়েন্টার খেয়াল না করেও k ∈ [০, n − ১]-এর ওপর প্রতি কোয়েরিতে টার্নারি সার্চ O(log n) আর যথেষ্ট দ্রুত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    scanf("%d", &q);
    vector<long long> a, pre = {0};
    while (q--) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            long long x;
            scanf("%lld", &x);
            a.push_back(x);
            pre.push_back(pre.back() + x);
            continue;
        }
        int n = a.size();
        long long mx = a.back();
        auto value = [&](int kk) { return mx - double(pre[kk] + mx) / (kk + 1); };
        int lo = 0, hi = n - 1;
        while (hi - lo > 2) {
            int m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (value(m1) < value(m2)) lo = m1; else hi = m2;
        }
        double best = 0;
        for (int kk = lo; kk <= hi; kk++) best = max(best, value(kk));
        printf("%.10f\n", best);
    }
    return 0;
}
`,
      time: 'O(Q log Q)',
      space: 'O(Q)',
      accepted: true,
      toolkit: ['lambda', 'prefix-sum'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All subsets', 'সব সাবসেট'),
      idea: L('For tiny inputs, try every subset.', 'ক্ষুদ্র ইনপুটে প্রতিটি সাবসেট চেষ্টা।'),
      explain: [L('No structure assumed: it confirms that “max plus smallest prefix” is optimal.', 'কোনো কাঠামো ধরে নেওয়া হয় না: এটি নিশ্চিত করে “সর্বোচ্চ আর ছোট প্রিফিক্স” সেরা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    cin >> q;
    vector<long long> a;
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) { long long x; cin >> x; a.push_back(x); continue; }
        int n = a.size();
        if (n > 14) { cout << "\n"; continue; }
        double best = 0;
        for (int mask = 1; mask < (1 << n); mask++) {
            long long mx = LLONG_MIN, s = 0;
            int c = 0;
            for (int i = 0; i < n; i++) if (mask >> i & 1) { mx = max(mx, a[i]); s += a[i]; c++; }
            best = max(best, mx - double(s) / c);
        }
        printf("%.10f\n", best);
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n) per query',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '6\n1 3\n2\n1 4\n2\n1 8\n2', output: '0.0000000000\n0.5000000000\n3.0000000000', source: 'sample', note: sample(1) },
    { input: '4\n1 1\n1 4\n1 5\n2', output: '2.0000000000', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Recomputing the best k from scratch every query: O(Q²).', 'প্রতি কোয়েরিতে শুরু থেকে সেরা k হিসাব: O(Q²)।')],
  related: [{ id: '578C', name: 'Weakness and Poorness', why: L('Ternary search.', 'টার্নারি সার্চ।') }],
  toolkit: ['prefix-sum'],
};

export const p993E: ProblemEntry = {
  id: '993E',
  contestId: 993,
  index: 'E',
  name: 'Nikita and Order Statistics',
  rating: 2300,
  tags: ['fft', 'math'],
  featuredFor: ['fft'],
  why: L('Counting pairs of prefixes by the difference of their values is a convolution, computed with FFT.', 'প্রিফিক্সের জোড়া তাদের মানের পার্থক্য দিয়ে গোনা একটি কনভোলিউশন, FFT দিয়ে হিসাব।'),
  statement: L('For each k = 0 … n, count the subarrays in which exactly k elements are less than x.', 'প্রতিটি k = ০ … n-এর জন্য এমন সাবঅ্যারে গুনুন যেখানে ঠিক k-টি উপাদান x-এর ছোট।'),
  input: L('n x, then the array.', 'n x, তারপর অ্যারে।'),
  output: L('n + 1 counts.', 'n + ১টি গণনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵', 'n ≤ ২·১০⁵')] },
  samples: [
    { input: '5 3\n1 2 3 4 5', output: '6 5 4 0 0 0', explain: L('Elements less than 3 are 1 and 2.', '৩-এর ছোট উপাদান ১ আর ২।') },
    { input: '2 6\n-5 9', output: '1 2 0', explain: L('Only [9] has none.', 'শুধু [৯]-এ একটিও নেই।') },
    { input: '6 99\n-1 -1 -1 -1 -1 -1', output: '0 6 5 4 3 2 1', explain: L('Every element counts.', 'প্রতিটি উপাদান গোনা হয়।') },
  ],
  observation: L('Let p₀ … pₙ be prefix counts of elements < x, and c[v] the number of prefixes equal to v. A subarray (l, r] has p_r − p_l elements below x. For k ≥ 1 the answer is Σ_v c[v] · c[v + k]: a correlation, i.e. a convolution of c with reversed c. For k = 0 it is Σ c[v](c[v] − 1)/2.', 'p₀ … pₙ হলো x-এর ছোট উপাদানের প্রিফিক্স গণনা, আর c[v] হলো v-এর সমান প্রিফিক্সের সংখ্যা। একটি সাবঅ্যারে (l, r]-এ p_r − p_l-টি উপাদান x-এর নিচে। k ≥ ১-এর জন্য উত্তর Σ_v c[v] · c[v + k]: একটি সহসম্পর্ক, অর্থাৎ c আর উল্টো c-এর কনভোলিউশন। k = ০-এ এটি Σ c[v](c[v] − ১)/২।'),
  approach: [L('Multiply c by reversed c with FFT; read entries n + k.', 'FFT দিয়ে c-কে উল্টো c দিয়ে গুণ; n + k-তম মান পড়ুন।')],
  walkthrough: { input: '1 2 3 4 5, x = 3', steps: [{ state: 'p = 0 1 2 2 2 2 → c = [1, 1, 4]', text: L('k = 1: 1·1 + 1·4 = 5. k = 2: 1·4 = 4. k = 0: C(4, 2) = 6.', 'k = ১: ১·১ + ১·৪ = ৫। k = ২: ১·৪ = ৪। k = ০: C(৪, ২) = ৬।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One FFT multiplication.', 'একটি FFT গুণ।') },
  solutions: [
    {
      id: 'fft',
      kind: 'optimal',
      title: L('Correlation by FFT', 'FFT দিয়ে সহসম্পর্ক'),
      idea: L('Σ c[v] c[v + k] = (c * reverse(c))[n + k].', 'Σ c[v] c[v + k] = (c * reverse(c))[n + k]।'),
      explain: [L('Whenever an answer has the shape Σ f(i) g(i + k) for every k, reverse one sequence and multiply polynomials. Values up to n² ≈ 4·10¹⁰ are exact enough in doubles after rounding.', 'যখনই একটি উত্তর প্রতিটি k-এর জন্য Σ f(i) g(i + k) রূপের, একটি ক্রম উল্টে বহুপদী গুণ করুন। n² ≈ ৪·১০¹⁰ পর্যন্ত মান গোল করার পরে double-এ যথেষ্ট নিখুঁত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${fftCode}

int main() {
    int n;
    long long x;
    scanf("%d %lld", &n, &x);
    vector<long long> c(n + 1, 0);
    int p = 0;
    c[0] = 1;
    for (int i = 0; i < n; i++) {
        long long a;
        scanf("%lld", &a);
        if (a < x) p++;
        c[p]++;
    }
    vector<long long> rc(c.rbegin(), c.rend());
    vector<long long> prod = multiply(c, rc);
    long long zero = 0;
    for (long long v : c) zero += v * (v - 1) / 2;
    printf("%lld", zero);
    for (int k = 1; k <= n; k++) printf(" %lld", prod[n + k]);
    printf("\n");
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Count every subarray', 'প্রতিটি সাবঅ্যারে গোনা'),
      idea: L('O(n²) over (l, r).', '(l, r)-এর ওপর O(n²)।'),
      explain: [L('The direct count, 4·10¹⁰ for n = 2·10⁵: too slow, but it checks the FFT.', 'সরাসরি গণনা, n = ২·১০⁵-এ ৪·১০¹⁰: খুব ধীর, কিন্তু FFT যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> a(n);
    for (auto& v : a) cin >> v;
    vector<long long> ans(n + 1, 0);
    for (int l = 0; l < n; l++) {
        int k = 0;
        for (int r = l; r < n; r++) { if (a[r] < x) k++; ans[k]++; }
    }
    for (int k = 0; k <= n; k++) cout << ans[k] << (k == n ? '\n' : ' ');
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
    { input: '5 3\n1 2 3 4 5', output: '6 5 4 0 0 0', source: 'sample', note: sample(1) },
    { input: '2 6\n-5 9', output: '1 2 0', source: 'sample', note: sample(2) },
    { input: '6 99\n-1 -1 -1 -1 -1 -1', output: '0 6 5 4 3 2 1', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Forgetting the special formula for k = 0 (pairs with l < r only).', 'k = ০-এর বিশেষ সূত্র ভুলে যাওয়া (শুধু l < r জোড়া)।'), L('Rounding FFT results with a plain cast instead of llround.', 'llround-এর বদলে সাধারণ cast দিয়ে FFT ফল গোল করা।')],
  related: [{ id: '528D', name: 'Fuzzy Search', why: L('Pattern matching with FFT.', 'FFT দিয়ে প্যাটার্ন মেলানো।') }],
  toolkit: ['long-long'],
};

export const p528D: ProblemEntry = {
  id: '528D',
  contestId: 528,
  index: 'D',
  name: 'Fuzzy Search',
  rating: 2500,
  tags: ['bitmasks', 'brute-force', 'fft'],
  why: L('Per letter, “T has this letter here and S has it nearby” is a 0/1 correlation; four FFTs count matches at every shift.', 'প্রতিটি অক্ষরে “T-এর এখানে এই অক্ষর আর S-এর কাছে আছে” একটি ০/১ সহসম্পর্ক; চারটি FFT প্রতিটি সরণে মিল গোনে।'),
  statement: L('Strings S and T over A, C, G, T and an integer k. T occurs at position i of S if for every j, the letter T[j] appears somewhere in S within distance k of i + j. Count such positions.', 'A, C, G, T-এর স্ট্রিং S আর T আর একটি পূর্ণসংখ্যা k। T S-এর অবস্থান i-তে আছে যদি প্রতিটি j-এর জন্য অক্ষর T[j] S-এ i + j থেকে k দূরত্বের মধ্যে কোথাও থাকে। এমন অবস্থান গুনুন।'),
  input: L('|S| |T| k, then S and T.', '|S| |T| k, তারপর S আর T।'),
  output: L('The number of positions.', 'অবস্থানের সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('|T| ≤ |S| ≤ 2·10⁵', '|T| ≤ |S| ≤ ২·১০⁵')] },
  samples: [{ input: '10 4 1\nAGCAATTCAT\nACAT', output: '3', explain: L('Positions 2, 3 and 6 (1-based).', 'অবস্থান ২, ৩ আর ৬ (১-ভিত্তিক)।') }],
  observation: L('For letter c, let near_c[p] = 1 if c occurs in S within distance k of p (difference array), and t_c[j] = 1 if T[j] = c. Position i works iff Σ_c Σ_j near_c[i + j] · t_c[j] = |T|. Each inner sum over j for all i at once is a correlation: multiply near_c by reversed t_c.', 'অক্ষর c-এর জন্য near_c[p] = ১ যদি c S-এ p থেকে k দূরত্বের মধ্যে থাকে (পার্থক্য অ্যারে), আর t_c[j] = ১ যদি T[j] = c। অবস্থান i চলে ঠিক তখনই যখন Σ_c Σ_j near_c[i + j] · t_c[j] = |T|। সব i-এর জন্য একসঙ্গে j-এর ওপর প্রতিটি ভেতরের যোগফল একটি সহসম্পর্ক: near_c-কে উল্টো t_c দিয়ে গুণ।'),
  approach: [L('Four multiplications; add the results; count positions reaching |T|.', 'চারটি গুণ; ফল যোগ; |T|-এ পৌঁছানো অবস্থান গুনুন।')],
  walkthrough: { input: 'sample', steps: [{ state: 'k = 1 smears each letter over 3 cells', text: L('3 shifts have all 4 letters covered.', '৩টি সরণে ৪টি অক্ষরই ঢাকা।') }] },
  complexity: { time: 'O(4 · n log n)', space: 'O(n)', why: L('Four FFT products.', 'চারটি FFT গুণফল।') },
  solutions: [
    {
      id: 'fft',
      kind: 'optimal',
      title: L('Four correlations', 'চারটি সহসম্পর্ক'),
      idea: L('Match count at shift i = Σ_c (near_c ⋆ t_c)[i].', 'সরণ i-এ মিলের সংখ্যা = Σ_c (near_c ⋆ t_c)[i]।'),
      explain: [L('FFT pattern matching: with a small alphabet, one convolution per letter counts matching positions for every alignment at once.', 'FFT প্যাটার্ন মেলানো: ছোট বর্ণমালায় প্রতি অক্ষরে একটি কনভোলিউশন প্রতিটি সারিবদ্ধতার জন্য একসঙ্গে মেলা অবস্থান গোনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${fftCode}

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    static char S[200005], T[200005];
    scanf("%s %s", S, T);
    const string letters = "ACGT";
    vector<long long> total(n + m, 0);
    for (char c : letters) {
        vector<int> diff(n + 1, 0);
        for (int i = 0; i < n; i++)
            if (S[i] == c) { diff[max(0, i - k)]++; diff[min(n, i + k + 1)]--; }
        vector<long long> near(n), t(m);
        int run = 0;
        for (int i = 0; i < n; i++) { run += diff[i]; near[i] = run > 0; }
        for (int j = 0; j < m; j++) t[m - 1 - j] = T[j] == c;  // reversed
        vector<long long> prod = multiply(near, t);
        for (int i = 0; i + m <= n; i++) total[i] += prod[i + m - 1];
    }
    int ans = 0;
    for (int i = 0; i + m <= n; i++) if (total[i] == m) ans++;
    printf("%d\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every position directly', 'প্রতিটি অবস্থান সরাসরি যাচাই'),
      idea: L('Precompute near_c, then compare T at each shift.', 'near_c আগে হিসাব, তারপর প্রতিটি সরণে T তুলনা।'),
      explain: [L('O(|S| · |T|): 4·10¹⁰ in the worst case, but a direct check of the definition.', 'O(|S| · |T|): সবচেয়ে খারাপ ক্ষেত্রে ৪·১০¹⁰, কিন্তু সংজ্ঞার সরাসরি যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    string S, T;
    cin >> S >> T;
    int ans = 0;
    for (int i = 0; i + m <= n; i++) {
        bool ok = true;
        for (int j = 0; j < m && ok; j++) {
            bool found = false;
            for (int p = max(0, i + j - k); p <= min(n - 1, i + j + k) && !found; p++) if (S[p] == T[j]) found = true;
            ok = found;
        }
        if (ok) ans++;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(|S| · |T| · k)',
      space: 'O(|S|)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '10 4 1\nAGCAATTCAT\nACAT', output: '3', source: 'sample', note: sample(1) }],
  pitfalls: [L('Forgetting to reverse T before multiplying.', 'গুণের আগে T উল্টাতে ভুলে যাওয়া।')],
  related: [{ id: '993E', name: 'Nikita and Order Statistics', why: L('Correlation with FFT.', 'FFT দিয়ে সহসম্পর্ক।') }],
  toolkit: ['prefix-sum'],
};

const dinicCode = raw`struct Dinic {
    struct E { int to; long long cap; };
    vector<E> e;
    vector<vector<int>> g;
    vector<int> level, it;
    Dinic(int n) : g(n), level(n), it(n) {}
    void add(int u, int v, long long c) {
        g[u].push_back(e.size()); e.push_back({v, c});
        g[v].push_back(e.size()); e.push_back({u, 0});
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        queue<int> q;
        q.push(s);
        level[s] = 0;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (int id : g[v]) if (e[id].cap > 0 && level[e[id].to] < 0) { level[e[id].to] = level[v] + 1; q.push(e[id].to); }
        }
        return level[t] >= 0;
    }
    long long dfs(int v, int t, long long f) {
        if (v == t) return f;
        for (int& i = it[v]; i < (int)g[v].size(); i++) {
            int id = g[v][i];
            if (e[id].cap > 0 && level[e[id].to] == level[v] + 1) {
                long long d = dfs(e[id].to, t, min(f, e[id].cap));
                if (d > 0) { e[id].cap -= d; e[id ^ 1].cap += d; return d; }
            }
        }
        return 0;
    }
    long long maxflow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while (long long f = dfs(s, t, LLONG_MAX)) flow += f;
        }
        return flow;
    }
};`;

export const p1082G: ProblemEntry = {
  id: '1082G',
  contestId: 1082,
  index: 'G',
  name: 'Petya and Graph',
  rating: 2400,
  tags: ['flows', 'graphs'],
  featuredFor: ['flows'],
  why: L('Maximum-weight closure: “take an edge only if both endpoints are taken” becomes a min cut.', 'সর্বোচ্চ-ওজনের ক্লোজার: “দুই প্রান্তবিন্দু নিলেই একটি প্রান্ত নাও” একটি মিন কাটে পরিণত হয়।'),
  statement: L('Vertices have weights aᵥ and edges weights w. The weight of a subgraph is the sum of its edge weights minus the sum of its vertex weights (an edge needs both endpoints). Find the maximum weight; the empty subgraph has weight 0.', 'শীর্ষের ওজন aᵥ আর প্রান্তের ওজন w। একটি সাবগ্রাফের ওজন হলো এর প্রান্তের ওজনের যোগফল বিয়োগ এর শীর্ষের ওজনের যোগফল (একটি প্রান্তের দুই প্রান্তবিন্দু লাগে)। সর্বোচ্চ ওজন বের করুন; খালি সাবগ্রাফের ওজন ০।'),
  input: L('n m, the vertex weights, then m edges.', 'n m, শীর্ষের ওজন, তারপর m-টি প্রান্ত।'),
  output: L('The maximum weight.', 'সর্বোচ্চ ওজন।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 1000', 'n, m ≤ ১০০০')] },
  samples: [
    { input: '4 5\n1 5 2 2\n1 3 4\n1 4 4\n3 4 5\n3 2 2\n4 2 2', output: '8', explain: L('Vertices 1, 3, 4: edges 4 + 4 + 5 = 13, vertices 1 + 2 + 2 = 5.', 'শীর্ষ ১, ৩, ৪: প্রান্ত ৪ + ৪ + ৫ = ১৩, শীর্ষ ১ + ২ + ২ = ৫।') },
    { input: '3 3\n9 7 8\n1 2 1\n2 3 2\n1 3 3', output: '0', explain: L('Every non-empty choice is negative.', 'প্রতিটি অ-খালি বাছাই ঋণাত্মক।') },
  ],
  observation: L('Build a network: source → edge node (capacity w), edge node → each endpoint (∞), vertex → sink (aᵥ). A finite cut chooses a set of edge nodes on the source side, forcing their endpoints there too; its capacity is (edges not taken) + (vertices taken). So answer = Σ w − min cut = Σ w − max flow.', 'একটি নেটওয়ার্ক বানান: উৎস → প্রান্ত নোড (ক্ষমতা w), প্রান্ত নোড → প্রতিটি প্রান্তবিন্দু (∞), শীর্ষ → সিংক (aᵥ)। একটি সসীম কাট উৎসের দিকে কিছু প্রান্ত নোড বাছে, তাদের প্রান্তবিন্দুও সেখানে বাধ্য করে; এর ক্ষমতা (না নেওয়া প্রান্ত) + (নেওয়া শীর্ষ)। তাই উত্তর = Σ w − মিন কাট = Σ w − ম্যাক্স ফ্লো।'),
  approach: [L('Dinic on n + m + 2 nodes.', 'n + m + ২ নোডে ডিনিক।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'Σ w = 6, every edge is cheaper than its endpoints', text: L('Max flow 6: answer 0.', 'ম্যাক্স ফ্লো ৬: উত্তর ০।') }] },
  complexity: { time: 'O(V² E) worst, fast in practice', space: 'O(n + m)', why: L('Dinic on a small network.', 'ছোট নেটওয়ার্কে ডিনিক।') },
  solutions: [
    {
      id: 'closure',
      kind: 'optimal',
      title: L('Project selection with max flow', 'ম্যাক্স ফ্লো দিয়ে প্রজেক্ট নির্বাচন'),
      idea: L('Profit nodes from the source, cost nodes to the sink, ∞ for dependencies.', 'উৎস থেকে লাভের নোড, সিংকে খরচের নোড, নির্ভরতায় ∞।'),
      explain: [L('This is the “project selection” (maximum closure) template: choose projects with profits that require tools with costs. Max flow = min cut picks the best set.', 'এটি “প্রজেক্ট নির্বাচন” (সর্বোচ্চ ক্লোজার) টেমপ্লেট: খরচযুক্ত সরঞ্জাম লাগে এমন লাভের প্রজেক্ট বাছা। ম্যাক্স ফ্লো = মিন কাট সেরা সেট বাছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${dinicCode}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    int S = n + m, T = n + m + 1;
    Dinic d(n + m + 2);
    for (int v = 0; v < n; v++) { long long a; scanf("%lld", &a); d.add(v, T, a); }
    long long total = 0;
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        scanf("%d %d %lld", &u, &v, &w);
        total += w;
        d.add(S, n + i, w);
        d.add(n + i, u - 1, LLONG_MAX / 4);
        d.add(n + i, v - 1, LLONG_MAX / 4);
    }
    printf("%lld\n", total - d.maxflow(S, T));
    return 0;
}
`,
      time: 'O(V² E)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'functions', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every vertex set', 'প্রতিটি শীর্ষের সেট চেষ্টা'),
      idea: L('Given the vertices, take every edge inside them, since edge weights are positive.', 'শীর্ষ দেওয়া থাকলে ভেতরের প্রতিটি প্রান্ত নিন, কারণ প্রান্তের ওজন ধনাত্মক।'),
      explain: [L('2ⁿ vertex sets; all edges inside a chosen set are worth taking.', '২ⁿ শীর্ষ সেট; বাছা সেটের ভেতরের সব প্রান্ত নেওয়ার যোগ্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    vector<array<long long, 3>> e(m);
    for (auto& [u, v, w] : e) { cin >> u >> v >> w; u--, v--; }
    if (n > 16) { cout << "\n"; return 0; }
    long long best = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        long long s = 0;
        for (int v = 0; v < n; v++) if (mask >> v & 1) s -= a[v];
        for (auto [u, v, w] : e) if ((mask >> u & 1) && (mask >> v & 1)) s += w;
        best = max(best, s);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · (n + m))',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '4 5\n1 5 2 2\n1 3 4\n1 4 4\n3 4 5\n3 2 2\n4 2 2', output: '8', source: 'sample', note: sample(1) },
    { input: '3 3\n9 7 8\n1 2 1\n2 3 2\n1 3 3', output: '0', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Using int capacities for ∞.', '∞-এর জন্য int ক্ষমতা ব্যবহার।')],
  related: [{ id: '546E', name: 'Soldier and Traveling', why: L('Another flow network.', 'আরেকটি ফ্লো নেটওয়ার্ক।') }],
  toolkit: ['functions'],
};

export const p546E: ProblemEntry = {
  id: '546E',
  contestId: 546,
  index: 'E',
  name: 'Soldier and Traveling',
  rating: 2100,
  tags: ['flows', 'graphs', 'math'],
  why: L('A bipartite transport network: soldiers flow from cities to cities they can reach in one step.', 'একটি বাইপার্টাইট পরিবহন নেটওয়ার্ক: সৈন্যরা শহর থেকে এক ধাপে পৌঁছানো যায় এমন শহরে প্রবাহিত হয়।'),
  statement: L('City i has aᵢ soldiers and should end with bᵢ. Each soldier either stays or moves along one road. Is it possible? If yes, print an n × n matrix: how many soldiers go from i to j.', 'শহর i-তে aᵢ সৈন্য আর শেষে bᵢ থাকা উচিত। প্রতিটি সৈন্য হয় থাকে নয়তো একটি রাস্তা ধরে সরে। এটি কি সম্ভব? হলে একটি n × n ম্যাট্রিক্স প্রিন্ট করুন: i থেকে j-তে কতজন যায়।'),
  input: L('n m, a, b, then m roads.', 'n m, a, b, তারপর m-টি রাস্তা।'),
  output: L('NO, or YES and the matrix.', 'NO, অথবা YES আর ম্যাট্রিক্স।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 100, m ≤ 200, aᵢ, bᵢ ≤ 100', 'n ≤ ১০০, m ≤ ২০০, aᵢ, bᵢ ≤ ১০০'), anyAnswer] },
  samples: [
    { input: '4 4\n1 2 6 3\n3 5 3 1\n1 2\n2 3\n3 4\n4 2', output: 'YES\n1 0 0 0\n2 0 0 0\n0 5 1 0\n0 0 2 1', explain: L('One valid plan.', 'একটি বৈধ পরিকল্পনা।') },
    { input: '2 0\n1 2\n2 1', output: 'NO', explain: L('No roads and the counts differ.', 'রাস্তা নেই আর গণনা আলাদা।') },
  ],
  observation: L('Source → left copy of i (aᵢ), left i → right j (∞) if j = i or (i, j) is a road, right j → sink (bⱼ). The plan exists iff Σa = Σb and the max flow equals Σa. Flow on left i → right j is the matrix entry.', 'উৎস → i-এর বাম কপি (aᵢ), বাম i → ডান j (∞) যদি j = i বা (i, j) একটি রাস্তা, ডান j → সিংক (bⱼ)। পরিকল্পনা আছে ঠিক তখনই যখন Σa = Σb আর ম্যাক্স ফ্লো Σa-এর সমান। বাম i → ডান j-এর ফ্লো ম্যাট্রিক্সের মান।'),
  approach: [L('Dinic; read flows from the middle edges.', 'ডিনিক; মাঝের প্রান্ত থেকে ফ্লো পড়ুন।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'Σa = 3 = Σb but no roads', text: L('Flow 2 < 3: NO.', 'ফ্লো ২ < ৩: NO।') }] },
  complexity: { time: 'O(V² E)', space: 'O(n²)', why: L('Small network.', 'ছোট নেটওয়ার্ক।') },
  solutions: [
    {
      id: 'flow',
      kind: 'optimal',
      title: L('Bipartite transport flow', 'বাইপার্টাইট পরিবহন ফ্লো'),
      idea: L('Read the answer from the flow on middle edges.', 'মাঝের প্রান্তের ফ্লো থেকে উত্তর পড়া।'),
      explain: [L('Splitting each city into “before” and “after” copies is the standard trick for one-step moves in flow networks. The flow on the reverse edge equals what was pushed.', 'প্রতিটি শহরকে “আগে” আর “পরে” কপিতে ভাগ করা ফ্লো নেটওয়ার্কে এক-ধাপের চালের প্রচলিত কৌশল। বিপরীত প্রান্তের ফ্লো যা পাঠানো হয়েছে তার সমান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${dinicCode}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<long long> a(n), b(n);
    for (auto& x : a) scanf("%lld", &x);
    for (auto& x : b) scanf("%lld", &x);
    vector<vector<bool>> can(n, vector<bool>(n, false));
    for (int i = 0; i < n; i++) can[i][i] = true;
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        can[u - 1][v - 1] = can[v - 1][u - 1] = true;
    }
    int S = 2 * n, T = 2 * n + 1;
    Dinic d(2 * n + 2);
    vector<vector<int>> id(n, vector<int>(n, -1));
    for (int i = 0; i < n; i++) { d.add(S, i, a[i]); d.add(n + i, T, b[i]); }
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (can[i][j]) { id[i][j] = d.e.size(); d.add(i, n + j, LLONG_MAX / 4); }
    long long sa = accumulate(a.begin(), a.end(), 0LL), sb = accumulate(b.begin(), b.end(), 0LL);
    if (sa != sb || d.maxflow(S, T) != sa) { puts("NO"); return 0; }
    puts("YES");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%lld ", id[i][j] < 0 ? 0 : d.e[id[i][j] ^ 1].cap);
        printf("\n");
    }
    return 0;
}
`,
      time: 'O(V² E)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['accumulate', 'functions'],
    },
    {
      id: 'ford-fulkerson',
      kind: 'method',
      title: L('Ford–Fulkerson with DFS augmenting paths', 'DFS অগমেন্টিং পথসহ ফোর্ড–ফালকারসন'),
      idea: L('Push one augmenting path at a time on a capacity matrix.', 'ক্ষমতার ম্যাট্রিক্সে একবারে একটি অগমেন্টিং পথ পাঠানো।'),
      explain: [L('The total flow is at most Σa ≤ 10⁴, and each DFS finds a path in O(V²) on a 202-node matrix, so the simplest max-flow algorithm is fast enough. The matrix answer is read from the reverse capacities.', 'মোট ফ্লো সর্বোচ্চ Σa ≤ ১০⁴, আর ২০২-নোডের ম্যাট্রিক্সে প্রতিটি DFS O(V²)-এ একটি পথ খোঁজে, তাই সবচেয়ে সরল ম্যাক্স-ফ্লো অ্যালগরিদম যথেষ্ট দ্রুত। ম্যাট্রিক্সের উত্তর বিপরীত ক্ষমতা থেকে পড়া হয়।'), L('Hall’s theorem gives the same YES/NO: feasible iff Σa = Σb and every set X of cities satisfies Σ_X b ≤ Σ over the neighbourhood of X of a. CF Forge uses that subset check as an independent reference in its stress tests.', 'হলের উপপাদ্য একই YES/NO দেয়: সম্ভব ঠিক তখনই যখন Σa = Σb আর শহরের প্রতিটি সেট X-এ Σ_X b ≤ X-এর প্রতিবেশের a-এর যোগফল। CF Forge তার স্ট্রেস টেস্টে সেই সাবসেট যাচাইকে স্বাধীন রেফারেন্স হিসেবে ব্যবহার করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int V;
vector<vector<long long>> cap;
vector<bool> seen;

long long dfs(int v, int t, long long f) {
    if (v == t) return f;
    seen[v] = true;
    for (int u = 0; u < V; u++)
        if (!seen[u] && cap[v][u] > 0)
            if (long long d = dfs(u, t, min(f, cap[v][u]))) { cap[v][u] -= d; cap[u][v] += d; return d; }
    return 0;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> a(n), b(n);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    V = 2 * n + 2;
    int S = 2 * n, T = 2 * n + 1;
    cap.assign(V, vector<long long>(V, 0));
    const long long INF = 1e9;
    for (int i = 0; i < n; i++) { cap[S][i] = a[i]; cap[n + i][T] = b[i]; cap[i][n + i] = INF; }
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        u--, v--;
        cap[u][n + v] = cap[v][n + u] = INF;
    }
    long long flow = 0;
    while (true) {
        seen.assign(V, false);
        long long f = dfs(S, T, LLONG_MAX);
        if (!f) break;
        flow += f;
    }
    long long sa = accumulate(a.begin(), a.end(), 0LL), sb = accumulate(b.begin(), b.end(), 0LL);
    if (sa != sb || flow != sa) { cout << "NO\n"; return 0; }
    cout << "YES\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << cap[n + j][i] << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(F · V²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['functions', 'accumulate'],
    },
  ],
  tests: [
    { input: '4 4\n1 2 6 3\n3 5 3 1\n1 2\n2 3\n3 4\n4 2', output: 'YES\n1 0 0 0\n2 0 0 0\n0 5 1 0\n0 0 2 1', source: 'sample', note: sample(1) },
    { input: '2 0\n1 2\n2 1', output: 'NO', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Forgetting that soldiers may stay (edge i → i).', 'সৈন্যরা থাকতে পারে (প্রান্ত i → i) তা ভুলে যাওয়া।')],
  related: [{ id: '1082G', name: 'Petya and Graph', why: L('Max flow modelling.', 'ম্যাক্স ফ্লো মডেলিং।') }],
  toolkit: ['functions'],
};

export const p1139E: ProblemEntry = {
  id: '1139E',
  contestId: 1139,
  index: 'E',
  name: 'Maximize Mex',
  rating: 2400,
  tags: ['flows', 'matchings'],
  featuredFor: ['matchings'],
  why: L('Reverse time so students only arrive; then grow the MEX with augmenting paths of a bipartite matching.', 'সময় উল্টে দিন যাতে ছাত্ররা শুধু আসে; তারপর বাইপার্টাইট ম্যাচিংয়ের অগমেন্টিং পথ দিয়ে MEX বাড়ান।'),
  statement: L('n students each have a potential pᵢ and a club cᵢ. On each of d days one student leaves, and then the principal picks at most one remaining student from each club; the day’s value is the MEX of the picked potentials. Maximise the value of each day.', 'n-জন ছাত্রের প্রত্যেকের একটি সম্ভাবনা pᵢ আর একটি ক্লাব cᵢ। d দিনের প্রতিটিতে একজন ছাত্র চলে যায়, তারপর অধ্যক্ষ প্রতিটি ক্লাব থেকে সর্বোচ্চ একজন বাকি ছাত্র বাছেন; দিনের মান হলো বাছা সম্ভাবনার MEX। প্রতিটি দিনের মান সর্বোচ্চ করুন।'),
  input: L('n m, potentials, clubs, d, then the leaving students.', 'n m, সম্ভাবনা, ক্লাব, d, তারপর চলে যাওয়া ছাত্ররা।'),
  output: L('d values.', 'd-টি মান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 5000, pᵢ < 5000', 'n, m ≤ ৫০০০, pᵢ < ৫০০০')] },
  samples: [{ input: '5 3\n0 1 2 2 0\n1 2 2 3 2\n5\n3\n2\n4\n5\n1', output: '3\n1\n1\n1\n0', explain: L('Day 1: potentials 0, 1, 2 can come from three different clubs.', 'দিন ১: সম্ভাবনা ০, ১, ২ তিনটি আলাদা ক্লাব থেকে আসতে পারে।') }],
  observation: L('MEX ≥ k iff potentials 0 … k − 1 can each be matched to a distinct club having a student with that potential: a bipartite matching from potentials to clubs. Process days backwards (students are added), and each time try to extend the matching to potential mex with one Kuhn augmenting path; repeat while it succeeds.', 'MEX ≥ k ঠিক তখনই যখন সম্ভাবনা ০ … k − ১ প্রতিটি সেই সম্ভাবনার ছাত্রসহ একটি আলাদা ক্লাবের সঙ্গে মেলানো যায়: সম্ভাবনা থেকে ক্লাবে একটি বাইপার্টাইট ম্যাচিং। দিনগুলো পেছন থেকে প্রক্রিয়া করুন (ছাত্র যোগ হয়), আর প্রতিবার একটি কুন অগমেন্টিং পথ দিয়ে ম্যাচিংকে সম্ভাবনা mex পর্যন্ত বাড়ানোর চেষ্টা; সফল হলে পুনরাবৃত্তি।'),
  approach: [L('Start with students that never leave, compute answers from the last day backwards.', 'যারা কখনো যায় না তাদের দিয়ে শুরু, শেষ দিন থেকে পেছনে উত্তর হিসাব।')],
  walkthrough: { input: 'sample, in reverse', steps: [{ state: 'after all 5 leave nobody is left: MEX 0 for the last day', text: L('Adding students back raises the MEX to 1, 1, 1 and finally 3; read backwards: 3 1 1 1 0.', 'ছাত্রদের ফেরত যোগ করলে MEX ১, ১, ১ আর শেষে ৩ হয়; পেছন থেকে পড়া: ৩ ১ ১ ১ ০।') }] },
  complexity: { time: 'O(P · E)', space: 'O(n)', why: L('Each MEX increase costs one augmenting search.', 'প্রতিটি MEX বৃদ্ধিতে একটি অগমেন্টিং খোঁজ।') },
  solutions: [
    {
      id: 'kuhn',
      kind: 'optimal',
      title: L('Offline reverse + Kuhn’s matching', 'অফলাইন উল্টো + কুনের ম্যাচিং'),
      idea: L('Adding edges never breaks a matching, so the MEX never decreases in reverse time.', 'প্রান্ত যোগ কখনো ম্যাচিং ভাঙে না, তাই উল্টো সময়ে MEX কখনো কমে না।'),
      explain: [L('Kuhn’s algorithm finds an augmenting path by DFS from a new left vertex; it is the simplest bipartite matching and fits incremental settings perfectly.', 'কুনের অ্যালগরিদম একটি নতুন বাম শীর্ষ থেকে DFS দিয়ে অগমেন্টিং পথ খোঁজে; এটি সবচেয়ে সরল বাইপার্টাইট ম্যাচিং আর ক্রমবর্ধমান পরিবেশে নিখুঁত মেলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int P = 5001;
vector<int> adj[P];
int matchClub[5005], vis[5005], stamp = 0;

bool kuhn(int p) {
    for (int c : adj[p]) {
        if (vis[c] == stamp) continue;
        vis[c] = stamp;
        if (matchClub[c] == -1 || kuhn(matchClub[c])) { matchClub[c] = p; return true; }
    }
    return false;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> p(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &p[i]);
    for (int i = 1; i <= n; i++) scanf("%d", &c[i]);
    int d;
    scanf("%d", &d);
    vector<int> leave(d);
    vector<bool> gone(n + 1, false);
    for (auto& x : leave) { scanf("%d", &x); gone[x] = true; }
    for (int i = 1; i <= n; i++) if (!gone[i]) adj[p[i]].push_back(c[i]);
    memset(matchClub, -1, sizeof matchClub);
    int mex = 0;
    vector<int> ans(d);
    for (int day = d - 1; day >= 0; day--) {
        while (mex < P) {
            stamp++;
            if (!kuhn(mex)) break;
            mex++;
        }
        ans[day] = mex;
        int s = leave[day];
        adj[p[s]].push_back(c[s]);
    }
    for (int x : ans) printf("%d\n", x);
    return 0;
}
`,
      time: 'O(P · E)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Fresh matching every day', 'প্রতিদিন নতুন ম্যাচিং'),
      idea: L('For each day, rebuild the graph and grow the MEX from 0.', 'প্রতিদিন গ্রাফ আবার বানিয়ে MEX ০ থেকে বাড়ানো।'),
      explain: [L('Correct but d times more work; it checks the offline trick.', 'সঠিক কিন্তু d গুণ বেশি কাজ; এটি অফলাইন কৌশল যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> adj;
vector<int> mc, vis;
int stamp = 0;

bool kuhn(int p) {
    for (int c : adj[p]) {
        if (vis[c] == stamp) continue;
        vis[c] = stamp;
        if (mc[c] == -1 || kuhn(mc[c])) { mc[c] = p; return true; }
    }
    return false;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> p(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];
    for (int i = 1; i <= n; i++) cin >> c[i];
    int d;
    cin >> d;
    vector<bool> gone(n + 1, false);
    for (int day = 0; day < d; day++) {
        int s;
        cin >> s;
        gone[s] = true;
        adj.assign(n + 2, {});
        for (int i = 1; i <= n; i++) if (!gone[i]) adj[p[i]].push_back(c[i]);
        mc.assign(m + 1, -1);
        vis.assign(m + 1, 0);
        int mex = 0;
        while (mex <= n) { stamp++; if (!kuhn(mex)) break; mex++; }
        cout << mex << "\n";
    }
    return 0;
}
`,
      time: 'O(d · n · E)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [{ input: '5 3\n0 1 2 2 0\n1 2 2 3 2\n5\n3\n2\n4\n5\n1', output: '3\n1\n1\n1\n0', source: 'sample', note: sample(1) }],
  pitfalls: [L('Processing days forwards, where students disappear and matchings break.', 'দিন সামনের দিকে প্রক্রিয়া, যেখানে ছাত্র উধাও হয় আর ম্যাচিং ভাঙে।')],
  related: [{ id: '489B', name: 'BerSU Ball', why: L('Bipartite matching.', 'বাইপার্টাইট ম্যাচিং।') }],
  toolkit: ['functions'],
};

export const p1525D: ProblemEntry = {
  id: '1525D',
  contestId: 1525,
  index: 'D',
  name: 'Armchairs',
  rating: 1800,
  tags: ['dp', 'flows', 'matchings', 'greedy'],
  why: L('An optimal matching on a line never crosses, so a two-index DP matches occupied and free chairs in order.', 'রেখায় একটি সেরা ম্যাচিং কখনো ছেদ করে না, তাই দুই-ইনডেক্সের DP দখলকৃত আর খালি চেয়ার ক্রমে মেলায়।'),
  statement: L('Chairs in a row are occupied (1) or free (0), with at most n / 2 occupied. Move every person to a different chair that was initially free; moving from i to j takes |i − j| minutes, one move at a time. Minimise the total time.', 'একটি সারির চেয়ার দখলকৃত (১) বা খালি (০), সর্বোচ্চ n / ২টি দখলকৃত। প্রতিটি মানুষকে শুরুতে খালি ছিল এমন আলাদা চেয়ারে সরান; i থেকে j-তে |i − j| মিনিট লাগে, একবারে একটি সরানো। মোট সময় সর্বনিম্ন করুন।'),
  input: L('n, then the chairs.', 'n, তারপর চেয়ারগুলো।'),
  output: L('The minimum total time.', 'সর্বনিম্ন মোট সময়।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('n ≤ 5000', 'n ≤ ৫০০০')] },
  samples: [
    { input: '7\n1 0 0 1 0 0 1', output: '3', explain: L('Each person moves one step.', 'প্রত্যেকে এক ধাপ সরে।') },
    { input: '6\n1 1 1 0 0 0', output: '9', explain: L('3 + 3 + 3.', '৩ + ৩ + ৩।') },
    { input: '5\n0 0 0 0 0', output: '0', explain: L('Nobody to move.', 'সরানোর কেউ নেই।') },
  ],
  observation: L('This is a minimum-cost matching between occupied positions and free positions on a line. Crossing pairs can always be uncrossed without increasing the cost, so the i-th person (left to right) goes to a free chair after the one used by person i − 1. dp[i][j] = min cost to seat the first i people using the first j free chairs.', 'এটি রেখায় দখলকৃত আর খালি অবস্থানের মধ্যে একটি সর্বনিম্ন-খরচের ম্যাচিং। ছেদকারী জোড়া সবসময় খরচ না বাড়িয়ে খোলা যায়, তাই i-তম মানুষ (বাম থেকে ডানে) মানুষ i − ১-এর ব্যবহৃত চেয়ারের পরের একটি খালি চেয়ারে যায়। dp[i][j] = প্রথম j-টি খালি চেয়ার দিয়ে প্রথম i জনকে বসানোর সর্বনিম্ন খরচ।'),
  approach: [L('dp[i][j] = min(dp[i][j − 1], dp[i − 1][j − 1] + |pos_i − free_j|), rolling over i.', 'dp[i][j] = min(dp[i][j − ১], dp[i − ১][j − ১] + |pos_i − free_j|), i ধরে গড়ানো।')],
  walkthrough: { input: '1 1 1 0 0 0', steps: [{ state: 'people 1, 2, 3 → chairs 4, 5, 6', text: L('3 + 3 + 3 = 9.', '৩ + ৩ + ৩ = ৯।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('A 2D DP with a rolling row.', 'গড়ানো সারিসহ একটি দ্বিমাত্রিক DP।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Non-crossing matching DP', 'ছেদহীন ম্যাচিং DP'),
      idea: L('Skip a free chair or use it for the next person.', 'একটি খালি চেয়ার বাদ দিন বা পরের মানুষের জন্য ব্যবহার করুন।'),
      explain: [L('Matchings on a line (or a circle) often reduce to an O(n²) DP once you prove an optimal matching is non-crossing; the general alternative would be min-cost flow.', 'রেখায় (বা বৃত্তে) ম্যাচিং প্রায়ই একটি O(n²) DP-তে নামে যখন প্রমাণ হয় একটি সেরা ম্যাচিং ছেদহীন; সাধারণ বিকল্প হতো মিন-কস্ট ফ্লো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> occ, fre;
    for (int i = 0; i < n; i++) { int a; scanf("%d", &a); (a ? occ : fre).push_back(i); }
    int k = occ.size(), f = fre.size();
    const long long INF = LLONG_MAX / 4;
    vector<long long> prev(f + 1, 0), cur(f + 1);
    for (int i = 1; i <= k; i++) {
        cur[0] = INF;
        for (int j = 1; j <= f; j++)
            cur[j] = min(cur[j - 1], prev[j - 1] + abs(occ[i - 1] - fre[j - 1]));
        swap(prev, cur);
    }
    printf("%lld\n", prev[f]);
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every assignment', 'প্রতিটি বণ্টন চেষ্টা'),
      idea: L('Every injective map from people to free chairs.', 'মানুষ থেকে খালি চেয়ারে প্রতিটি একৈক ম্যাপ।'),
      explain: [L('Exponential, but it checks the non-crossing claim on small inputs.', 'সূচকীয়, কিন্তু ছোট ইনপুটে ছেদহীন দাবি যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> occ, fre;
long long best = LLONG_MAX;

void go(size_t i, int usedMask, long long cost) {
    if (cost >= best) return;
    if (i == occ.size()) { best = cost; return; }
    for (size_t j = 0; j < fre.size(); j++)
        if (!(usedMask >> j & 1)) go(i + 1, usedMask | 1 << j, cost + abs(occ[i] - fre[j]));
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) { int a; cin >> a; (a ? occ : fre).push_back(i); }
    if (fre.size() > 12) { cout << "\n"; return 0; }
    go(0, 0, 0);
    cout << best << "\n";
    return 0;
}
`,
      time: 'exponential',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions', 'bit-shift'],
    },
  ],
  tests: [
    { input: '7\n1 0 0 1 0 0 1', output: '3', source: 'sample', note: sample(1) },
    { input: '6\n1 1 1 0 0 0', output: '9', source: 'sample', note: sample(2) },
    { input: '5\n0 0 0 0 0', output: '0', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Greedy nearest free chair, which can be worse.', 'গ্রিডি সবচেয়ে কাছের খালি চেয়ার, যা খারাপ হতে পারে।')],
  related: [{ id: '1139E', name: 'Maximize Mex', why: L('Matchings.', 'ম্যাচিং।') }],
  toolkit: ['vector'],
};
