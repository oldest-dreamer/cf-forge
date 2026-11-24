import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 201B
export const p201B: ProblemEntry = {
  id: '201B',
  contestId: 201,
  index: 'B',
  name: 'Guess That Car!',
  rating: 1800,
  tags: ['math', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'A sum of weighted squared distances splits into an x part and a y part, each a convex parabola. Minimise each axis on its own — by scanning, by ternary search, or by rounding the weighted mean — and the 2-D problem is done.',
    'ভারযুক্ত বর্গ-দূরত্বের যোগফল x অংশ আর y অংশে ভাগ হয়, প্রতিটি উত্তল প্যারাবোলা। প্রতিটি অক্ষ আলাদাভাবে ন্যূনতম করো — স্ক্যানে, টারনারি সার্চে, বা ভারযুক্ত গড় গোল করে — দ্বিমাত্রিক সমস্যা শেষ।',
  ),
  statement: L(
    'A parking lot is an n × m grid of 4 × 4 squares. The square in row i, column j holds a car with a weight cᵢⱼ. Choose a grid point (x, y) with integers 0 ≤ x ≤ n, 0 ≤ y ≤ m (the lines between squares are at multiples of 4). The cost is the sum over all squares of cᵢⱼ times the squared distance from (4x, 4y) to the centre of the square. Find the minimum cost and a point that achieves it.',
    'একটি পার্কিং লট n × m গ্রিডের ৪ × ৪ বর্গ। সারি i, কলাম j-র বর্গে একটি গাড়ি আছে যার ওজন cᵢⱼ। পূর্ণসংখ্যা ০ ≤ x ≤ n, ০ ≤ y ≤ m নিয়ে একটি গ্রিড বিন্দু (x, y) বাছো (বর্গগুলোর মাঝের রেখা ৪-এর গুণিতকে)। খরচ হলো সব বর্গের cᵢⱼ গুণ (৪x, ৪y) থেকে বর্গের কেন্দ্রের দূরত্বের বর্গের যোগফল। ন্যূনতম খরচ আর তা অর্জনকারী একটি বিন্দু বের করো।',
  ),
  input: L('n m, then n rows of m integers cᵢⱼ.', 'n m, তারপর n সারি, প্রতিটিতে m টি পূর্ণসংখ্যা cᵢⱼ।'),
  output: L('The minimum cost, then x and y (any optimal point).', 'ন্যূনতম খরচ, তারপর x আর y (যেকোনো সেরা বিন্দু)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 1000, 0 ≤ cᵢⱼ ≤ 10⁵; the cost reaches about 3·10¹⁸', '১ ≤ n, m ≤ ১০০০, ০ ≤ cᵢⱼ ≤ ১০⁵; খরচ প্রায় ৩·১০¹⁸ ছোঁয়')] },
  samples: [
    { input: '2 3\n3 4 5\n3 9 1', output: '392\n1 1', explain: L('At (1, 1) the x part is 12·4 + 13·4 = 100 and the y part is 6·4 + 13·4 + 6·36 = 292.', '(১, ১)-এ x অংশ ১২·৪ + ১৩·৪ = ১০০ আর y অংশ ৬·৪ + ১৩·৪ + ৬·৩৬ = ২৯২।') },
    { input: '3 4\n1 0 0 0\n0 0 3 0\n0 0 5 5', output: '240\n2 3', explain: L('Row sums 1, 3, 10 give x = 2 (cost 88); column sums 1, 0, 8, 5 give y = 3 (cost 152).', 'সারির যোগফল ১, ৩, ১০ থেকে x = ২ (খরচ ৮৮); কলামের যোগফল ১, ০, ৮, ৫ থেকে y = ৩ (খরচ ১৫২)।') },
  ],
  observation: L(
    'The squared distance is (4x − centreₓ)² + (4y − centre_y)², so the total splits into F(x) + G(y). F(x) = Σᵢ Rᵢ·(4x − (4i + 2))² with Rᵢ the row sums (0-indexed rows), and G likewise with column sums. Each is a convex parabola in its variable: minimise them separately.',
    'বর্গ-দূরত্ব (৪x − কেন্দ্রₓ)² + (৪y − কেন্দ্র_y)², তাই মোট খরচ F(x) + G(y)-তে ভাগ হয়। F(x) = Σᵢ Rᵢ·(৪x − (৪i + ২))², Rᵢ সারির যোগফল (০-ভিত্তিক সারি), G-ও তেমনি কলামের যোগফল দিয়ে। প্রতিটি নিজের চলকে উত্তল প্যারাবোলা: আলাদা করে ন্যূনতম করো।',
  ),
  approach: [
    L('Compute the row sums Rᵢ and column sums Cⱼ in one pass.', 'এক পাসে সারির যোগফল Rᵢ আর কলামের যোগফল Cⱼ হিসাব করো।'),
    L('Find the best integer x in [0, n] for F and the best y in [0, m] for G.', 'F-এর জন্য [০, n]-এ সেরা পূর্ণসংখ্যা x আর G-র জন্য [০, m]-এ সেরা y খোঁজো।'),
    L('Print F(x) + G(y) and the pair (x, y).', 'F(x) + G(y) আর জোড়া (x, y) প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'rows 12 and 13 (first sample)',
    steps: [
      { state: 'F(0) = 12·4 + 13·36', text: L('= 516.', '= ৫১৬।') },
      { state: 'F(1) = 12·4 + 13·4', text: L('= 100: the smallest.', '= ১০০: সবচেয়ে ছোট।') },
      { state: 'F(2) = 12·36 + 13·4', text: L('= 484. So x = 1.', '= ৪৮৪। তাই x = ১।') },
    ],
  },
  complexity: { time: 'O(nm)', space: 'O(n + m)', why: L('Reading the grid dominates; each axis search is at most O(n²) or O(n log n).', 'গ্রিড পড়াই প্রধান; প্রতিটি অক্ষের সার্চ সর্বোচ্চ O(n²) বা O(n log n)।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Ternary search each axis', 'প্রতিটি অক্ষে টারনারি সার্চ'),
      idea: L('F and G are convex: search x in [0, n] and y in [0, m] independently.', 'F আর G উত্তল: x-কে [০, n]-এ আর y-কে [০, m]-এ আলাদা করে খোঁজো।'),
      explain: [L('Each evaluation is O(n) or O(m). If a whole axis has zero weight, F is constant and any x is optimal — the “equal means the minimum is between” rule then just narrows to some valid point.', 'প্রতিটি মূল্যায়ন O(n) বা O(m)। পুরো অক্ষের ওজন শূন্য হলে F ধ্রুবক আর যেকোনো x সেরা — তখন “সমান মানে ন্যূনতম মাঝে” নিয়ম শুধু কোনো একটি বৈধ বিন্দুতে নামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll cost(const vector<ll>& w, ll p) {
    ll s = 0;
    for (size_t i = 0; i < w.size(); i++) {
        ll d = 4 * p - (4 * (ll)i + 2);
        s += w[i] * d * d;
    }
    return s;
}

pair<ll, ll> best(const vector<ll>& w) {
    ll lo = 0, hi = w.size();
    while (hi - lo > 2) {
        ll m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        ll f1 = cost(w, m1), f2 = cost(w, m2);
        if (f1 < f2) hi = m2 - 1;
        else if (f1 > f2) lo = m1 + 1;
        else lo = m1, hi = m2;
    }
    pair<ll, ll> r = {cost(w, lo), lo};
    for (ll p = lo + 1; p <= hi; p++) r = min(r, make_pair(cost(w, p), p));
    return r;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> R(n, 0), C(m, 0);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            ll c;
            scanf("%lld", &c);
            R[i] += c, C[j] += c;
        }
    auto bx = best(R), by = best(C);
    printf("%lld\n%lld %lld\n", bx.first + by.first, bx.second, by.second);
    return 0;
}
`,
      time: 'O(nm + (n + m) log)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['long-long', 'pair', 'lambda'],
    },
    {
      id: 'mean',
      kind: 'better',
      title: L('Round the weighted mean', 'ভারযুক্ত গড় গোল করো'),
      idea: L('The real minimiser of F is the weighted mean of the centres; test the integers next to it.', 'F-এর বাস্তব ন্যূনতম কেন্দ্রগুলোর ভারযুক্ত গড়; তার পাশের পূর্ণসংখ্যাগুলো যাচাই।'),
      explain: [L('Setting the derivative to zero gives x* = Σ Rᵢ(4i + 2) / (4ΣRᵢ). A convex parabola is smallest at an integer next to its vertex, so evaluating floor(x*) and floor(x*) + 1 (clamped to [0, n]) is enough; a small window of ±1 keeps it safe.', 'অন্তরক শূন্য ধরলে x* = Σ Rᵢ(৪i + ২) / (৪ΣRᵢ)। উত্তল প্যারাবোলা শীর্ষের পাশের পূর্ণসংখ্যায় ক্ষুদ্রতম, তাই floor(x*) আর floor(x*) + ১ ([০, n]-এ আটকে) যাচাইই যথেষ্ট; ±১ জানালা নিরাপদ রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll cost(const vector<ll>& w, ll p) {
    ll s = 0;
    for (size_t i = 0; i < w.size(); i++) {
        ll d = 4 * p - (4 * (ll)i + 2);
        s += w[i] * d * d;
    }
    return s;
}

pair<ll, ll> best(const vector<ll>& w) {
    __int128 num = 0, den = 0;
    for (size_t i = 0; i < w.size(); i++) num += (__int128)w[i] * (4 * (ll)i + 2), den += w[i];
    ll c = den == 0 ? 0 : (ll)(num / (4 * den));
    pair<ll, ll> r = {LLONG_MAX, 0};
    for (ll p = max(0LL, c - 1); p <= min((ll)w.size(), c + 2); p++) r = min(r, make_pair(cost(w, p), p));
    return r;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> R(n, 0), C(m, 0);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            ll c;
            scanf("%lld", &c);
            R[i] += c, C[j] += c;
        }
    auto bx = best(R), by = best(C);
    printf("%lld\n%lld %lld\n", bx.first + by.first, bx.second, by.second);
    return 0;
}
`,
      time: 'O(nm)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['long-long', 'pair'],
    },
    {
      id: 'scan',
      kind: 'method',
      title: L('Scan every x and every y', 'প্রতিটি x আর y স্ক্যান'),
      idea: L('Evaluate F at all n + 1 values and G at all m + 1 values: O(n² + m²).', 'F-কে সব n + ১ মানে আর G-কে সব m + ১ মানে মূল্যায়ন: O(n² + m²)।'),
      explain: [L('With n, m ≤ 1000 this is only about two million operations, and it makes no convexity assumption — splitting into F and G is the one idea you need.', 'n, m ≤ ১০০০-এ এটি মাত্র প্রায় বিশ লক্ষ অপারেশন, আর উত্তলতার কোনো অনুমান লাগে না — F আর G-তে ভাগ করাই একমাত্র দরকারি ধারণা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

pair<ll, ll> best(const vector<ll>& w) {
    pair<ll, ll> r = {LLONG_MAX, 0};
    for (ll p = 0; p <= (ll)w.size(); p++) {
        ll s = 0;
        for (size_t i = 0; i < w.size(); i++) {
            ll d = 4 * p - (4 * (ll)i + 2);
            s += w[i] * d * d;
        }
        r = min(r, make_pair(s, p));
    }
    return r;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<ll> R(n, 0), C(m, 0);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            ll c;
            scanf("%lld", &c);
            R[i] += c, C[j] += c;
        }
    auto bx = best(R), by = best(C);
    printf("%lld\n%lld %lld\n", bx.first + by.first, bx.second, by.second);
    return 0;
}
`,
      time: 'O(nm + n² + m²)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['long-long', 'pair', 'for-loop'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every point against every square', 'প্রতিটি বিন্দুকে প্রতিটি বর্গের সঙ্গে'),
      idea: L('For each of the (n + 1)(m + 1) points add up the cost over all squares.', '(n + ১)(m + ১) বিন্দুর প্রতিটির জন্য সব বর্গের খরচ যোগ।'),
      explain: [L('O(n²m²): the statement itself, with no splitting into axes.', 'O(n²m²): কোনো অক্ষে ভাগ না করা প্রবলেম-বিবরণই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<ll>> a(n, vector<ll>(m));
    for (auto& r : a)
        for (ll& x : r) scanf("%lld", &x);
    ll best = LLONG_MAX, bx = 0, by = 0;
    for (int x = 0; x <= n; x++)
        for (int y = 0; y <= m; y++) {
            ll s = 0;
            for (int i = 0; i < n; i++)
                for (int j = 0; j < m; j++) {
                    ll dx = 4LL * x - (4 * i + 2), dy = 4LL * y - (4 * j + 2);
                    s += a[i][j] * (dx * dx + dy * dy);
                }
            if (s < best) best = s, bx = x, by = y;
        }
    printf("%lld\n%lld %lld\n", best, bx, by);
    return 0;
}
`,
      time: 'O(n²m²)',
      space: 'O(nm)',
      accepted: false,
      toolkit: ['vector', 'long-long'],
    },
  ],
  tests: [
    { input: '2 3\n3 4 5\n3 9 1', output: '392\n1 1', source: 'sample', note: sample(1) },
    { input: '3 4\n1 0 0 0\n0 0 3 0\n0 0 5 5', output: '240\n2 3', source: 'sample', note: sample(2) },
    { input: '1 1\n0', output: '0\n0 0', source: 'own', note: L('All weights zero: every point costs 0, any point is accepted.', 'সব ওজন শূন্য: প্রতিটি বিন্দুর খরচ ০, যেকোনো বিন্দু গ্রহণযোগ্য।') },
  ],
  pitfalls: [
    L('Measuring distances in squares instead of in the 4-unit scale: the centre of square i is at 4i + 2.', '৪-একক স্কেলের বদলে বর্গের এককে দূরত্ব মাপা: বর্গ i-র কেন্দ্র ৪i + ২-এ।'),
    L('Keeping a 2-D search: the cost really separates, so two 1-D searches suffice.', 'দ্বিমাত্রিক সার্চ রাখা: খরচ সত্যিই আলাদা হয়, তাই দুটি একমাত্রিক সার্চই যথেষ্ট।'),
    L('The total reaches about 3·10¹⁸: it fits in long long but not in 32 bits (or in double without losing digits).', 'মোট প্রায় ৩·১০¹৮: long long-এ ঢোকে, ৩২ বিটে বা অঙ্ক না হারিয়ে double-এ নয়।'),
  ],
  related: [
    { id: '1730B', name: 'Meeting on the Line', why: L('1-D facility location with a max instead of a sum.', 'যোগফলের বদলে সর্বোচ্চসহ একমাত্রিক অবস্থান-নির্ণয়।') },
    { id: '289B', name: 'Polo the Penguin and Matrix', why: L('A weighted sum of distances minimised at a median.', 'দূরত্বের ভারযুক্ত যোগফল যা মধ্যমায় ন্যূনতম।') },
  ],
  toolkit: ['long-long', 'pair'],
};

// ───────────────────────────────────────────── 613A
export const p613A: ProblemEntry = {
  id: '613A',
  contestId: 613,
  index: 'A',
  name: 'Peter and Snow Blower',
  rating: 1900,
  tags: ['binary-search', 'geometry', 'ternary-search'],
  why: L(
    'Rotating a polygon around a point sweeps a ring: the outer radius is the farthest vertex and the inner radius is the closest point of the boundary. The closest point on a segment is a textbook convex minimisation — solved by projection or by ternary search.',
    'একটি বহুভুজকে বিন্দুর চারপাশে ঘোরালে একটি আংটি ঝাড়া হয়: বাইরের ব্যাসার্ধ সবচেয়ে দূরের শীর্ষ আর ভেতরের ব্যাসার্ধ সীমানার সবচেয়ে কাছের বিন্দু। রেখাংশের সবচেয়ে কাছের বিন্দু পাঠ্যবইয়ের উত্তল ন্যূনতমকরণ — প্রজেকশনে বা টারনারি সার্চে সমাধান।',
  ),
  statement: L(
    'A snow blower is tied at a point P and rotates around it, clearing the snow swept by a polygon with n vertices (P lies strictly outside the polygon). Find the area of the cleared region.',
    'একটি স্নো-ব্লোয়ার P বিন্দুতে বাঁধা এবং তার চারপাশে ঘোরে, n শীর্ষের বহুভুজ যে তুষার ঝাড়ে তা পরিষ্কার করে (P বহুভুজের কঠোরভাবে বাইরে)। পরিষ্কার হওয়া অংশের ক্ষেত্রফল বের করো।',
  ),
  input: L('n and the coordinates of P, then the n vertices in order.', 'n আর P-র স্থানাঙ্ক, তারপর ক্রমে n টি শীর্ষ।'),
  output: L('The area π(R² − r²) with error up to 10⁻⁶.', 'ক্ষেত্রফল π(R² − r²), ত্রুটি ১০⁻⁶ পর্যন্ত।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁵, |coordinates| ≤ 10⁶', '৩ ≤ n ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁶')] },
  samples: [
    { input: '3 0 0\n0 1\n-1 2\n1 2', output: '12.566370614359172464', explain: L('R² = 5 (vertices (±1, 2)), r² = 1 (vertex (0, 1)): π · 4.', 'R² = ৫ (শীর্ষ (±১, ২)), r² = ১ (শীর্ষ (০, ১)): π · ৪।') },
    { input: '4 1 -1\n0 0\n1 2\n2 0\n1 1', output: '21.991148575128551812', explain: L('P = (1, −1): the farthest vertex (1, 2) gives R² = 9; the nearest boundary points are the vertices (0, 0) and (2, 0), r² = 2. So π · 7.', 'P = (১, −১): সবচেয়ে দূরের শীর্ষ (১, ২) থেকে R² = ৯; সবচেয়ে কাছের সীমানা-বিন্দু শীর্ষ (০, ০) ও (২, ০), r² = ২। তাই π · ৭।') },
  ],
  observation: L(
    'The swept region is an annulus. The largest distance from P is attained at a vertex, so R² = max over vertices of |Pvᵢ|². The smallest distance is attained somewhere on an edge — at an endpoint or at the foot of the perpendicular — so r² = min over edges of the squared distance from P to that segment.',
    'ঝাড়া অংশ একটি অ্যানুলাস। P থেকে সর্বোচ্চ দূরত্ব কোনো শীর্ষে, তাই R² = সব শীর্ষের |Pvᵢ|²-এর সর্বোচ্চ। সর্বনিম্ন দূরত্ব কোনো কিনারায় — প্রান্তে বা লম্বের পাদবিন্দুতে — তাই r² = সব কিনারার জন্য P থেকে সেই রেখাংশের বর্গ-দূরত্বের ন্যূনতম।',
  ),
  approach: [
    L('R² = max |P − vᵢ|².', 'R² = max |P − vᵢ|²।'),
    L('For each edge A → B project P onto the line, clamp the parameter to [0, 1], and take the squared distance.', 'প্রতিটি কিনারা A → B-র জন্য P-কে রেখায় প্রজেক্ট করো, প্যারামিটার [০, ১]-এ আটকাও, বর্গ-দূরত্ব নাও।'),
    L('Print π(R² − r²).', 'π(R² − r²) প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'P = (0, 0), edge (0, 1) → (−1, 2)',
    steps: [
      { state: 't = (P − A)·(B − A) / |B − A|² = (0, −1)·(−1, 1)/2 = −0.5', text: L('Negative: clamp to 0, the closest point is A.', 'ঋণাত্মক: ০-তে আটকাও, সবচেয়ে কাছের বিন্দু A।') },
      { state: 'distance² = 1', text: L('This edge contributes r² ≤ 1.', 'এই কিনারা থেকে r² ≤ ১।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over the vertices and edges.', 'শীর্ষ আর কিনারার ওপর এক পাস।') },
  solutions: [
    {
      id: 'projection',
      kind: 'optimal',
      title: L('Project onto each edge and clamp', 'প্রতিটি কিনারায় প্রজেক্ট করে আটকাও'),
      idea: L('t = ((P − A)·(B − A)) / |B − A|², clamp t to [0, 1].', 't = ((P − A)·(B − A)) / |B − A|², t-কে [০, ১]-এ আটকাও।'),
      explain: [L('The distance from P to A + t(B − A) is a convex quadratic in t with its minimum at the projection; on a segment only [0, 1] is allowed, so clamping gives the exact closest point. Everything uses long double; the coordinates are integers, so the dot products are exact before the division.', 'P থেকে A + t(B − A)-র দূরত্ব t-তে উত্তল দ্বিঘাত যার ন্যূনতম প্রজেকশনে; রেখাংশে শুধু [০, ১] অনুমোদিত, তাই আটকালে সঠিক নিকটতম বিন্দু মেলে। সবকিছু long double-এ; স্থানাঙ্ক পূর্ণসংখ্যা, তাই ভাগের আগে ডট গুণফল সঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    ld px, py;
    scanf("%d %Lf %Lf", &n, &px, &py);
    vector<ld> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%Lf %Lf", &x[i], &y[i]);
    ld R = 0, r = 1e30L;
    for (int i = 0; i < n; i++) {
        R = max(R, (x[i] - px) * (x[i] - px) + (y[i] - py) * (y[i] - py));
        int j = (i + 1) % n;
        ld dx = x[j] - x[i], dy = y[j] - y[i];
        ld t = ((px - x[i]) * dx + (py - y[i]) * dy) / (dx * dx + dy * dy);
        t = max((ld)0, min((ld)1, t));
        ld cx = x[i] + t * dx - px, cy = y[i] + t * dy - py;
        r = min(r, cx * cx + cy * cy);
    }
    printf("%.12Lf\n", acosl(-1.0L) * (R - r));
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'min-max'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search the closest point on each edge', 'প্রতিটি কিনারায় নিকটতম বিন্দুতে টারনারি সার্চ'),
      idea: L('Squared distance from P along a segment is convex: search t in [0, 1].', 'রেখাংশ বরাবর P থেকে বর্গ-দূরত্ব উত্তল: t-কে [০, ১]-এ খোঁজো।'),
      explain: [L('No projection formula: evaluate the squared distance at two points of the segment and cut the side with the larger value, 100 rounds per edge. It also works for any convex distance function, e.g. when the distance is not Euclidean.', 'প্রজেকশন সূত্র নেই: রেখাংশের দুই বিন্দুতে বর্গ-দূরত্ব হিসাব করে বড় মানের দিকটা কাটো, প্রতি কিনারায় ১০০ রাউন্ড। যেকোনো উত্তল দূরত্ব ফাংশনেও কাজ করে, যেমন দূরত্ব ইউক্লিডীয় না হলেও।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    ld px, py;
    scanf("%d %Lf %Lf", &n, &px, &py);
    vector<ld> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%Lf %Lf", &x[i], &y[i]);
    ld R = 0, r = 1e30L;
    for (int i = 0; i < n; i++) {
        R = max(R, (x[i] - px) * (x[i] - px) + (y[i] - py) * (y[i] - py));
        int j = (i + 1) % n;
        auto d2 = [&](ld t) {
            ld cx = x[i] + t * (x[j] - x[i]) - px, cy = y[i] + t * (y[j] - y[i]) - py;
            return cx * cx + cy * cy;
        };
        ld lo = 0, hi = 1;
        for (int it = 0; it < 100; it++) {
            ld m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (d2(m1) < d2(m2)) hi = m2;
            else lo = m1;
        }
        r = min(r, d2((lo + hi) / 2));
    }
    printf("%.12Lf\n", acosl(-1.0L) * (R - r));
    return 0;
}
`,
      time: 'O(100 n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Sample every edge densely', 'প্রতিটি কিনারায় ঘন নমুনা'),
      idea: L('Check 200 000 equally spaced points of each edge.', 'প্রতিটি কিনারার ২,০০,০০০ সমদূরবর্তী বিন্দু দেখো।'),
      explain: [L('Approximate but independent of any formula; the error is far below the 10⁻⁶ tolerance for small coordinates.', 'আনুমানিক কিন্তু কোনো সূত্রের ওপর নির্ভরশীল নয়; ছোট স্থানাঙ্কে ত্রুটি ১০⁻⁶ সহনশীলতার অনেক নিচে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    int n;
    ld px, py;
    scanf("%d %Lf %Lf", &n, &px, &py);
    vector<ld> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%Lf %Lf", &x[i], &y[i]);
    ld R = 0, r = 1e30L;
    const int K = 200000;
    for (int i = 0; i < n; i++) {
        R = max(R, (x[i] - px) * (x[i] - px) + (y[i] - py) * (y[i] - py));
        int j = (i + 1) % n;
        for (int s = 0; s <= K; s++) {
            ld t = (ld)s / K;
            ld cx = x[i] + t * (x[j] - x[i]) - px, cy = y[i] + t * (y[j] - y[i]) - py;
            r = min(r, cx * cx + cy * cy);
        }
    }
    printf("%.12Lf\n", acosl(-1.0L) * (R - r));
    return 0;
}
`,
      time: 'O(n · 2·10⁵)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['setprecision', 'for-loop'],
    },
  ],
  tests: [
    { input: '3 0 0\n0 1\n-1 2\n1 2', output: '12.566370614359172464', source: 'sample', note: sample(1) },
    { input: '4 1 -1\n0 0\n1 2\n2 0\n1 1', output: '21.991148575128551812', source: 'sample', note: sample(2) },
    { input: '3 0 0\n1000000 1000000\n-1000000 1000000\n0 -1000000', output: '5654866776461.627829551697', source: 'own', note: L('Big coordinates: R² = 2·10¹², r² = 2·10¹¹ (the slanted edge), area ≈ 5.65·10¹².', 'বড় স্থানাঙ্ক: R² = ২·১০¹², r² = ২·১০¹¹ (ঢালু কিনারা), ক্ষেত্রফল ≈ ৫.৬৫·১০¹²।') },
  ],
  pitfalls: [
    L('Taking the nearest vertex instead of the nearest point of an edge: the foot of a perpendicular can be inside an edge.', 'কিনারার নিকটতম বিন্দুর বদলে নিকটতম শীর্ষ নেওয়া: লম্বের পাদবিন্দু কিনারার ভেতরে হতে পারে।'),
    L('Forgetting the closing edge from the last vertex back to the first.', 'শেষ শীর্ষ থেকে প্রথমে ফেরার বন্ধ-করা কিনারা ভুলে যাওয়া।'),
    L('Using the unclamped projection: the foot of the perpendicular on the infinite line may lie outside the segment.', 'আটকানো ছাড়া প্রজেকশন: অসীম রেখায় লম্বের পাদবিন্দু রেখাংশের বাইরে হতে পারে।'),
  ],
  related: [
    { id: '1059D', name: 'Nature Reserve', why: L('Another convex function of a real position, found by ternary search.', 'বাস্তব অবস্থানের আরেকটি উত্তল ফাংশন, টারনারি সার্চে।') },
    { id: '1730B', name: 'Meeting on the Line', why: L('Distances along a line, minimised by search or by algebra.', 'রেখা বরাবর দূরত্ব, সার্চে বা বীজগণিতে ন্যূনতম।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 626E
export const p626E: ProblemEntry = {
  id: '626E',
  contestId: 626,
  index: 'E',
  name: 'Simple Skewness',
  rating: 2400,
  tags: ['binary-search', 'math', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'For a fixed median the mean first rises and then falls as you add pairs, so the best number of pairs is a peak you can find by binary or ternary search. The proof that odd-sized subsets built from the largest elements are optimal is the real work.',
    'নির্দিষ্ট মধ্যমার জন্য জোড়া যোগ করলে গড় আগে বাড়ে, পরে কমে, তাই সেরা জোড়ার সংখ্যা এমন চূড়া যা বাইনারি বা টারনারি সার্চে মেলে। বিজোড় আকারের, বৃহত্তম উপাদান দিয়ে গড়া উপসেট সেরা হওয়ার প্রমাণই আসল কাজ।',
  ),
  statement: L(
    'The simple skewness of a collection is its mean minus its median. Given n numbers, find a non-empty subset (taking each element at most as many times as it occurs) with the largest simple skewness. Print its size and its elements, in any order.',
    'একটি সংগ্রহের সরল বক্রতা হলো তার গড় বিয়োগ মধ্যমা। n টি সংখ্যা দেওয়া আছে, সবচেয়ে বড় সরল বক্রতার একটি অশূন্য উপসেট (প্রতিটি উপাদান যতবার আছে তার বেশি নয়) বের করো। এর আকার আর উপাদানগুলো যেকোনো ক্রমে প্রিন্ট করো।',
  ),
  input: L('n, then the n numbers.', 'n, তারপর n টি সংখ্যা।'),
  output: L('The size k, then the k chosen elements (any optimal subset).', 'আকার k, তারপর বাছা k টি উপাদান (যেকোনো সেরা উপসেট)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵, 0 ≤ values ≤ 10⁶; a checker accepts any optimal subset', '১ ≤ n ≤ ২·১০⁵, ০ ≤ মান ≤ ১০⁶; চেকার যেকোনো সেরা উপসেট গ্রহণ করে')] },
  samples: [
    { input: '4\n1 2 3 12', output: '3\n1 2 12', explain: L('Mean 5, median 2: skewness 3.', 'গড় ৫, মধ্যমা ২: বক্রতা ৩।') },
    { input: '4\n1 1 2 2', output: '3\n1 1 2', explain: L('Mean 4/3, median 1: skewness 1/3.', 'গড় ৪/৩, মধ্যমা ১: বক্রতা ১/৩।') },
    { input: '2\n1 2', output: '2\n1 2', explain: L('Mean 1.5, median 1.5: skewness 0 — and no subset does better.', 'গড় ১.৫, মধ্যমা ১.৫: বক্রতা ০ — আর কোনো উপসেট ভালো নয়।') },
  ],
  observation: L(
    'An optimal subset has odd size, so its median is an actual element aᵢ of the sorted array. With that median fixed, extra elements should be chosen in pairs: one just below the median (the closest ones) and one from the very top of the array, since small elements below the median do not move the median but large ones pull the mean up. Adding the k-th pair (a[i − k], a[n − k]) raises the mean exactly while the pair’s average exceeds the current mean — and the pair sums only fall, so it is a peak in k.',
    'সেরা উপসেটের আকার বিজোড়, তাই এর মধ্যমা সর্টেড অ্যারের একটি আসল উপাদান aᵢ। মধ্যমা ঠিক রেখে বাড়তি উপাদান জোড়ায় জোড়ায় বাছতে হবে: একটি মধ্যমার ঠিক নিচের (সবচেয়ে কাছেরগুলো) আর একটি অ্যারের একদম ওপর থেকে, কারণ মধ্যমার নিচের ছোট উপাদান মধ্যমা নড়ায় না আর বড়গুলো গড় টানে। k-তম জোড়া (a[i − k], a[n − k]) যোগ করলে গড় ঠিক তখনই বাড়ে যখন জোড়ার গড় বর্তমান গড়ের বেশি — আর জোড়ার যোগফল কেবল কমে, তাই k-তে একটি চূড়া।',
  ),
  approach: [
    L('Sort the array and build prefix sums.', 'অ্যারে সর্ট করে প্রিফিক্স সাম বানাও।'),
    L('For every median index i, binary-search the largest k ≤ min(i, n − 1 − i) for which the pair k still improves the mean.', 'প্রতিটি মধ্যমা সূচক i-র জন্য বাইনারি সার্চে সবচেয়ে বড় k ≤ min(i, n − ১ − i) খোঁজো যেখানে জোড়া k এখনও গড় বাড়ায়।'),
    L('Compare candidates by the exact fraction (sum − size · median) / size and print the best one.', 'প্রার্থীদের সঠিক ভগ্নাংশ (যোগফল − আকার · মধ্যমা) / আকার দিয়ে তুলনা করে সেরাটি প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'sorted 1 2 3 12, median index i = 1 (value 2)',
    steps: [
      { state: 'k = 0: {2}', text: L('Skewness 0.', 'বক্রতা ০।') },
      { state: 'pair 1: a[0] = 1 and a[3] = 12', text: L('The pair average 6.5 exceeds the mean 2: take it. {1, 2, 12}: mean 5.', 'জোড়ার গড় ৬.৫ বর্তমান গড় ২-এর বেশি: নাও। {১, ২, ১২}: গড় ৫।') },
      { state: 'maxk = min(1, 2) = 1', text: L('Skewness 5 − 2 = 3.', 'বক্রতা ৫ − ২ = ৩।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('The sort and one binary search per median.', 'সর্ট আর প্রতিটি মধ্যমার জন্য একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'binary',
      kind: 'optimal',
      title: L('Binary search the number of pairs per median', 'প্রতিটি মধ্যমায় জোড়ার সংখ্যায় বাইনারি সার্চ'),
      idea: L('Take pair k + 1 iff its sum exceeds twice the current mean: (2k + 1)(x + y) > 2S.', 'জোড়া k + ১ নাও ঠিক তখনই যখন তার যোগফল বর্তমান গড়ের দ্বিগুণের বেশি: (২k + ১)(x + y) > ২S।'),
      explain: [L('The predicate “adding the next pair raises the mean” is true for small k and false afterwards, because pair sums are non-increasing and the mean sits between the old mean and the pair average. So the smallest k where it fails is the peak. Compare candidates with 128-bit cross multiplication to stay exact.', '“পরের জোড়া গড় বাড়ায়” শর্ত ছোট k-তে সত্য আর পরে মিথ্যা, কারণ জোড়ার যোগফল অ-বর্ধমান আর নতুন গড় পুরোনো গড় ও জোড়ার গড়ের মাঝে। তাই যে ক্ষুদ্রতম k-তে এটি ব্যর্থ সেটিই চূড়া। সঠিক থাকতে প্রার্থীদের ১২৮-বিট ক্রস-গুণে তুলনা করো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> a(n);
    for (ll& x : a) scanf("%lld", &x);
    sort(a.begin(), a.end());
    vector<ll> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    auto sum = [&](int k, int i) { return a[i] + pre[i] - pre[i - k] + pre[n] - pre[n - k]; };
    ll bn = 0, bc = 1;  // best numerator / denominator
    int bi = 0, bk = 0;
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = min(i, n - 1 - i);
        while (lo < hi) {
            int k = (lo + hi) / 2;
            ll x = a[i - k - 1], y = a[n - k - 1];
            if ((ll)(2 * k + 1) * (x + y) > 2 * sum(k, i)) lo = k + 1;
            else hi = k;
        }
        ll c = 2 * lo + 1, N = sum(lo, i) - c * a[i];
        if ((__int128)N * bc > (__int128)bn * c) bn = N, bc = c, bi = i, bk = lo;
    }
    printf("%d\n%lld", 2 * bk + 1, a[bi]);
    for (int j = 1; j <= bk; j++) printf(" %lld %lld", a[bi - j], a[n - j]);
    puts("");
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'lambda', 'long-long'],
    },
    {
      id: 'ternary',
      kind: 'method',
      title: L('Ternary search k with exact fractions', 'সঠিক ভগ্নাংশসহ k-তে টারনারি সার্চ'),
      idea: L('The skewness as a function of k rises and then falls: compare two interior values.', 'k-র ফাংশন হিসেবে বক্রতা বাড়ে তারপর কমে: দুটি ভেতরের মান তুলনা।'),
      explain: [L('Evaluate the exact fraction for two values of k; the smaller side is discarded. A flat stretch can only occur at the peak (a pair that equals the current mean changes nothing, and every later pair is not larger), so the equal case keeps both points.', 'k-র দুটি মানে সঠিক ভগ্নাংশ হিসাব করো; ছোট দিকটা বাদ। সমতল অংশ শুধু চূড়ায় হতে পারে (বর্তমান গড়ের সমান জোড়া কিছু বদলায় না, আর পরের প্রতিটি জোড়া বড় নয়), তাই সমান হলে দুই বিন্দুই রাখো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> a(n);
    for (ll& x : a) scanf("%lld", &x);
    sort(a.begin(), a.end());
    vector<ll> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    ll bn = 0, bc = 1;
    int bi = 0, bk = 0;
    for (int i = 0; i < n; i++) {
        // skewness numerator / denominator for k pairs
        auto val = [&](int k) {
            ll c = 2 * k + 1, s = a[i] + pre[i] - pre[i - k] + pre[n] - pre[n - k];
            return make_pair(s - c * a[i], c);
        };
        auto less_ = [&](pair<ll, ll> p, pair<ll, ll> q) { return (__int128)p.first * q.second < (__int128)q.first * p.second; };
        int lo = 0, hi = min(i, n - 1 - i);
        while (hi - lo > 2) {
            int m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            auto v1 = val(m1), v2 = val(m2);
            if (less_(v1, v2)) lo = m1 + 1;
            else if (less_(v2, v1)) hi = m2 - 1;
            else lo = m1, hi = m2;
        }
        for (int k = lo; k <= hi; k++) {
            auto v = val(k);
            if ((__int128)v.first * bc > (__int128)bn * v.second) bn = v.first, bc = v.second, bi = i, bk = k;
        }
    }
    printf("%d\n%lld", 2 * bk + 1, a[bi]);
    for (int j = 1; j <= bk; j++) printf(" %lld %lld", a[bi - j], a[n - j]);
    puts("");
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'prefix-sum', 'lambda', 'pair', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every subset', 'প্রতিটি উপসেট'),
      idea: L('Enumerate all 2ⁿ − 1 subsets and keep the one with the largest mean − median.', 'সব ২ⁿ − ১ উপসেট গুনে সবচেয়ে বড় গড় − মধ্যমার উপসেট রাখো।'),
      explain: [L('Even sizes included, so it never relies on the “odd sizes are optimal” lemma. Exact integer fractions again.', 'জোড় আকারসহ, তাই “বিজোড় আকার সেরা” প্রমাণের ওপর নির্ভর করে না। আবারও সঠিক পূর্ণসংখ্যা ভগ্নাংশ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> a(n);
    for (ll& x : a) scanf("%lld", &x);
    ll bn = -1, bc = 1;
    int bm = 1;
    for (int m = 1; m < (1 << n); m++) {
        vector<ll> e;
        for (int i = 0; i < n; i++)
            if (m >> i & 1) e.push_back(a[i]);
        sort(e.begin(), e.end());
        ll k = e.size(), s = 0;
        for (ll x : e) s += x;
        ll mid = k % 2 ? 2 * e[k / 2] : e[k / 2 - 1] + e[k / 2];
        ll N = 2 * s - k * mid;  // skewness = N / (2k)
        if (bn < 0 || (__int128)N * bc > (__int128)bn * k) bn = N, bc = k, bm = m;
    }
    printf("%d\n", __builtin_popcount(bm));
    for (int i = 0; i < n; i++)
        if (bm >> i & 1) printf("%lld ", a[i]);
    puts("");
    return 0;
}
`,
      time: 'O(2ⁿ · n log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift', 'popcount', 'sort'],
    },
  ],
  tests: [
    { input: '4\n1 2 3 12', output: '3\n1 2 12', source: 'sample', note: sample(1) },
    { input: '4\n1 1 2 2', output: '3\n1 1 2', source: 'sample', note: sample(2) },
    { input: '2\n1 2', output: '2\n1 2', source: 'sample', note: sample(3) },
    { input: '1\n7', output: '1\n7', source: 'own', note: L('A single element: skewness 0.', 'একটিমাত্র উপাদান: বক্রতা ০।') },
  ],
  pitfalls: [
    L('Comparing skewness as doubles: the differences can be 10⁻¹¹ relative; use exact fractions with 128-bit products.', 'বক্রতা ডাবলে তুলনা: পার্থক্য আপেক্ষিক ১০⁻¹¹ হতে পারে; ১২৮-বিট গুণফলসহ সঠিক ভগ্নাংশ ব্যবহার করো।'),
    L('Taking elements just above the median instead of the very largest ones.', 'সবচেয়ে বড় উপাদানের বদলে মধ্যমার ঠিক ওপরের উপাদান নেওয়া।'),
    L('Allowing k so large that the top k overlap with the lower k and the median: k ≤ min(i, n − 1 − i).', 'এত বড় k নেওয়া যাতে ওপরের k নিচের k আর মধ্যমার সঙ্গে মিলে যায়: k ≤ min(i, n − ১ − i)।'),
  ],
  related: [
    { id: '1244E', name: 'Minimizing Difference', why: L('Another “peak in k” found over a sorted array.', 'সর্টেড অ্যারেতে পাওয়া আরেকটি “k-তে চূড়া”।') },
    { id: '1156C', name: 'Match Points', why: L('Pairing the smallest with the largest after sorting.', 'সর্টের পর ক্ষুদ্রতমকে বৃহত্তমের সঙ্গে জোড়া।') },
  ],
  toolkit: ['sort', 'prefix-sum', 'long-long'],
};

// ───────────────────────────────────────────── 660F
export const p660F: ProblemEntry = {
  id: '660F',
  contestId: 660,
  index: 'F',
  name: 'Bear and Bowling 4',
  rating: 2500,
  tags: ['binary-search', 'data-structures', 'divide-and-conquer', 'geometry', 'ternary-search'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'A weighted subarray score becomes “maximum over lines at a point” — the convex hull trick. You can run it globally with prefix sums, or split the array in the middle and do it only for crossing subarrays: the textbook divide and conquer with a hull inside.',
    'ওজনযুক্ত সাবঅ্যারে স্কোর হয়ে যায় “একটি বিন্দুতে রেখাগুলোর সর্বোচ্চ” — কনভেক্স হাল ট্রিক। প্রিফিক্স সাম দিয়ে একবারে করা যায়, নয়তো অ্যারে মাঝে ভেঙে শুধু ক্রসিং সাবঅ্যারের জন্য: ভেতরে হালসহ পাঠ্যবইয়ের ডিভাইড অ্যান্ড কনকার।',
  ),
  statement: L(
    'For an array b₁ … b_k define its score as Σ i · bᵢ. Given an array a of n integers, find the maximum score over all subarrays (the empty subarray has score 0).',
    'অ্যারে b₁ … b_k-র স্কোর ধরা হয় Σ i · bᵢ। n টি পূর্ণসংখ্যার অ্যারে a দেওয়া, সব সাবঅ্যারের সর্বোচ্চ স্কোর বের করো (ফাঁকা সাবঅ্যারের স্কোর ০)।',
  ),
  input: L('n, then a₁ … aₙ.', 'n, তারপর a₁ … aₙ।'),
  output: L('The maximum score.', 'সর্বোচ্চ স্কোর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵, |aᵢ| ≤ 10⁷; the answer reaches about 10¹⁸', '১ ≤ n ≤ ২·১০⁵, |aᵢ| ≤ ১০⁷; উত্তর প্রায় ১০¹⁸ ছোঁয়')] },
  samples: [
    { input: '6\n5 -1000 1 -3 7 -8', output: '16', explain: L('The subarray 1 −3 7 scores 1 − 6 + 21 = 16.', 'সাবঅ্যারে ১ −৩ ৭-এর স্কোর ১ − ৬ + ২১ = ১৬।') },
    { input: '3\n-10 -20 -30', output: '0', explain: L('Every non-empty subarray is negative; pick the empty one.', 'প্রতিটি অশূন্য সাবঅ্যারে ঋণাত্মক; ফাঁকাটা বাছো।') },
  ],
  observation: L(
    'Let S[r] = a₁ + … + a_r and A[r] = 1·a₁ + … + r·a_r. The score of the subarray (j, r] is (A[r] − A[j]) − j·(S[r] − S[j]) = A[r] + (−j)·S[r] + (j·S[j] − A[j]). For a fixed r this is the value at x = S[r] of the line with slope −j and intercept j·S[j] − A[j], and we want the maximum over j < r: a convex hull query.',
    'S[r] = a₁ + … + a_r আর A[r] = ১·a₁ + … + r·a_r ধরো। সাবঅ্যারে (j, r]-এর স্কোর (A[r] − A[j]) − j·(S[r] − S[j]) = A[r] + (−j)·S[r] + (j·S[j] − A[j])। নির্দিষ্ট r-এর জন্য এটি ঢাল −j আর ছেদ j·S[j] − A[j]-র রেখার x = S[r]-এ মান, আর আমরা j < r-এর ওপর সর্বোচ্চ চাই: কনভেক্স হাল কোয়েরি।',
  ),
  approach: [
    L('Compute S and A. Keep a hull of lines, one per j, added in order of j.', 'S আর A হিসাব করো। প্রতিটি j-র জন্য একটি করে রেখার হাল রাখো, j-র ক্রমে যোগ করে।'),
    L('For each r query the hull at −S[r] (slopes made increasing by using x = −S).', 'প্রতিটি r-এ −S[r]-এ হাল কোয়েরি করো (x = −S ধরে ঢাল বর্ধমান করা)।'),
    L('Answer = max(0, max over r of the query + A[r]).', 'উত্তর = max(০, সব r-এ কোয়েরি + A[r]-র সর্বোচ্চ)।'),
  ],
  walkthrough: {
    input: 'a = 5 −1000 1 −3 7 −8',
    steps: [
      { state: 'S = 0 5 −995 −994 −997 −990 −998', text: L('Prefix sums (index 0 first).', 'প্রিফিক্স সাম (সূচক ০ আগে)।') },
      { state: 'j = 2 → r = 5', text: L('Score = (A[5] − A[2]) − 2·(S[5] − S[2]) = 16 as in the sample.', 'স্কোর = (A[৫] − A[২]) − ২·(S[৫] − S[২]) = ১৬, স্যাম্পলের মতো।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Each line is added once and each query is a binary search on the hull; the divide and conquer version does the same per level and is O(n log² n).', 'প্রতিটি রেখা একবার যোগ হয় আর প্রতিটি কোয়েরি হালে বাইনারি সার্চ; ডিভাইড অ্যান্ড কনকার সংস্করণ প্রতি স্তরে একই কাজ করে, মোট O(n log² n)।') },
  solutions: [
    {
      id: 'cht',
      kind: 'optimal',
      title: L('Convex hull trick over prefix sums', 'প্রিফিক্স সামের ওপর কনভেক্স হাল ট্রিক'),
      idea: L('Lines with slope j and intercept j·S[j] − A[j], queried at x = −S[r].', 'ঢাল j আর ছেদ j·S[j] − A[j]-র রেখা, x = −S[r]-এ কোয়েরি।'),
      explain: [L('Slopes arrive in increasing order, so a monotone stack builds the upper hull in O(1) amortised per line; queries at arbitrary x use a binary search over the hull, comparing neighbouring lines. Cross multiplications can reach 10³⁶ so they are done in __int128.', 'ঢাল বর্ধমান ক্রমে আসে, তাই মনোটোন স্ট্যাক প্রতি রেখায় O(১) অ্যামর্টাইজডে ঊর্ধ্ব হাল বানায়; যেকোনো x-এর কোয়েরি হালে বাইনারি সার্চ, পাশের রেখা তুলনা করে। ক্রস গুণফল ১০³⁶ ছুঁতে পারে, তাই __int128-এ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef __int128 LL;

struct Hull {  // maximum of lines; slopes added in increasing order
    vector<ll> m, b;
    bool bad(int i, int j, ll M, ll B) {  // is line j unnecessary between i and the new line?
        return (LL)(b[i] - B) * (m[j] - m[i]) <= (LL)(b[i] - b[j]) * (M - m[i]);
    }
    void add(ll M, ll B) {
        while (m.size() >= 2 && bad(m.size() - 2, m.size() - 1, M, B)) m.pop_back(), b.pop_back();
        m.push_back(M), b.push_back(B);
    }
    ll at(int i, ll x) { return m[i] * x + b[i]; }
    ll query(ll x) {
        int lo = 0, hi = m.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (at(mid, x) <= at(mid + 1, x)) lo = mid + 1;
            else hi = mid;
        }
        return at(lo, x);
    }
};

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> S(n + 1, 0), A(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        ll a;
        scanf("%lld", &a);
        S[i] = S[i - 1] + a, A[i] = A[i - 1] + i * a;
    }
    Hull h;
    h.add(0, 0);
    ll ans = 0;
    for (int r = 1; r <= n; r++) {
        ans = max(ans, A[r] + h.query(-S[r]));
        h.add(r, (ll)r * S[r] - A[r]);
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'long-long', 'prefix-sum'],
    },
    {
      id: 'dc',
      kind: 'method',
      title: L('Divide and conquer: only crossing subarrays', 'ডিভাইড অ্যান্ড কনকার: শুধু ক্রসিং সাবঅ্যারে'),
      idea: L('Best of the left half, the right half, and subarrays that cross the middle — those are lines queried by their right end.', 'বাম অর্ধ, ডান অর্ধ আর মাঝ-পেরোনো সাবঅ্যারের সেরা — এগুলো রেখা যা ডান প্রান্ত দিয়ে কোয়েরি হয়।'),
      explain: [L('For a subarray [x, y] crossing the middle m the score is L[x] + (m − x)·SR[y] + RW[y], where L[x] is the score of the left piece, SR[y] the sum of the right piece and RW[y] its own weighted score. The left pieces give lines slope (m − x), intercept L[x]; each right end queries them at SR[y]. The recursion depth is log n and the hull work is O(n log n) per level.', 'মাঝ m পেরোনো সাবঅ্যারে [x, y]-এর স্কোর L[x] + (m − x)·SR[y] + RW[y], যেখানে L[x] বাম টুকরোর স্কোর, SR[y] ডান টুকরোর যোগফল আর RW[y] তার নিজের ভারযুক্ত স্কোর। বাম টুকরোগুলো দেয় ঢাল (m − x), ছেদ L[x]-র রেখা; প্রতিটি ডান প্রান্ত SR[y]-এ কোয়েরি করে। রিকার্সনের গভীরতা log n আর প্রতি স্তরে হালের কাজ O(n log n)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef __int128 LL;

struct Hull {
    vector<ll> m, b;
    void add(ll M, ll B) {
        while (m.size() >= 2) {
            int i = m.size() - 2, j = m.size() - 1;
            if ((LL)(b[i] - B) * (m[j] - m[i]) <= (LL)(b[i] - b[j]) * (M - m[i])) m.pop_back(), b.pop_back();
            else break;
        }
        m.push_back(M), b.push_back(B);
    }
    ll at(int i, ll x) { return m[i] * x + b[i]; }
    ll query(ll x) {
        int lo = 0, hi = m.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (at(mid, x) <= at(mid + 1, x)) lo = mid + 1;
            else hi = mid;
        }
        return at(lo, x);
    }
};

int n;
vector<ll> a;
ll best = 0;

void solve(int l, int r) {  // [l, r)
    if (r - l == 1) {
        best = max(best, a[l]);
        return;
    }
    int m = (l + r) / 2;
    solve(l, m), solve(m, r);
    Hull h;
    ll Lx = 0, SL = 0;
    for (int x = m - 1; x >= l; x--) {
        SL += a[x];
        Lx += SL;               // L[x] = L[x + 1] + sum(a[x .. m - 1])
        h.add(m - x, Lx);       // slope m - x grows as x moves left
    }
    ll SR = 0, RW = 0;
    for (int y = m; y < r; y++) {
        SR += a[y];
        RW += (ll)(y - m + 1) * a[y];
        best = max(best, RW + h.query(SR));
    }
}

int main() {
    scanf("%d", &n);
    a.resize(n);
    for (ll& x : a) scanf("%lld", &x);
    solve(0, n);
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n log² n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every subarray', 'প্রতিটি সাবঅ্যারে'),
      idea: L('Fix the left end and extend the right end, keeping the weighted sum.', 'বাম প্রান্ত ঠিক করে ডান প্রান্ত বাড়াও, ভারযুক্ত যোগফল রেখে।'),
      explain: [L('O(n²): adding element r with weight (r − l + 1) to the running score. The reference for any hull or recursion mistake.', 'O(n²): চলমান স্কোরে ওজন (r − l + ১)-সহ r উপাদান যোগ। হাল বা রিকার্সনের যেকোনো ভুলের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<ll> a(n);
    for (ll& x : a) scanf("%lld", &x);
    ll best = 0;
    for (int l = 0; l < n; l++) {
        ll cur = 0;
        for (int r = l; r < n; r++) {
            cur += (ll)(r - l + 1) * a[r];
            best = max(best, cur);
        }
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '6\n5 -1000 1 -3 7 -8', output: '16', source: 'sample', note: sample(1) },
    { input: '3\n-10 -20 -30', output: '0', source: 'sample', note: sample(2) },
    { input: '5\n1000 1000 -3000 -10 -20', output: '3000', source: 'own', note: L('1000·1 + 1000·2 = 3000: the prefix pair wins.', '১০০০·১ + ১০০০·২ = ৩০০০: প্রিফিক্সের জোড়াই জেতে।') },
    { input: '1\n10000000', output: '10000000', source: 'own', note: L('A single element with weight 1.', 'ওজন ১-সহ একটিমাত্র উপাদান।') },
  ],
  pitfalls: [
    L('Allowing only j < r − 1: the subarray (j, r] may contain a single element, j = r − 1.', 'শুধু j < r − ১ অনুমতি দেওয়া: সাবঅ্যারে (j, r]-তে একটিমাত্র উপাদান থাকতে পারে, j = r − ১।'),
    L('Hull cross products in 64-bit: they overflow around 10³⁶; use __int128.', '৬৪-বিটে হালের ক্রস গুণফল: ১০³⁶-এর কাছে উপচে পড়ে; __int128 ব্যবহার করো।'),
    L('Forgetting the empty subarray: when all numbers are negative the answer is 0.', 'ফাঁকা সাবঅ্যারে ভুলে যাওয়া: সব সংখ্যা ঋণাত্মক হলে উত্তর ০।'),
  ],
  related: [
    { id: '1139E', name: 'Maximize Mex', why: L('Another pattern where the structure does the heavy lifting.', 'আরেকটি প্যাটার্ন যেখানে কাঠামোই ভারী কাজ করে।') },
    { id: '1213G', name: 'Path Queries', why: L('Offline sorting and merging, a close cousin of divide and conquer.', 'অফলাইন সর্টিং আর মার্জ, ডিভাইড অ্যান্ড কনকারের ঘনিষ্ঠ আত্মীয়।') },
  ],
  toolkit: ['long-long', 'prefix-sum'],
};
