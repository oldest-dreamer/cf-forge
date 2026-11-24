import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 166E
export const p166E: ProblemEntry = {
  id: '166E',
  contestId: 166,
  index: 'E',
  name: 'Tetrahedron',
  rating: 1500,
  tags: ['dp', 'math', 'matrices'],
  featuredFor: ['matrices'],
  why: L(
    'The best first matrix-power problem: a two-state DP whose transition is a 2 × 2 matrix. Then the same recurrence collapses into a closed formula, so you see three levels of the same idea.',
    'প্রথম ম্যাট্রিক্স-ঘাতের সেরা প্রবলেম: দুই অবস্থার একটি DP যার রূপান্তর একটি ২ × ২ ম্যাট্রিক্স। তারপর একই পুনরাবৃত্তি একটি সরাসরি সূত্রে নেমে আসে, তাই একই ধারণার তিনটি স্তর দেখা যায়।',
  ),
  statement: L(
    'An ant stands at vertex D of a tetrahedron ABCD. Each step it walks along an edge to a different vertex. How many ways can it return to D after exactly n steps? Print the answer modulo 10⁹ + 7.',
    'একটি পিঁপড়ে চতুস্তলক ABCD-এর শীর্ষ D-তে। প্রতি ধাপে সে একটি ধার ধরে অন্য শীর্ষে যায়। ঠিক n ধাপ পরে D-তে ফেরার কত উপায়? উত্তর ১০⁹ + ৭ মডুলো ছাপুন।',
  ),
  input: L('n.', 'n।'),
  output: L('The number of ways modulo 10⁹ + 7.', 'উপায়ের সংখ্যা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁷', '১ ≤ n ≤ ১০⁷')] },
  samples: [
    { input: '2', output: '3', explain: L('D → A → D, D → B → D, D → C → D.', 'D → A → D, D → B → D, D → C → D।') },
    { input: '4', output: '21', explain: L('(3⁴ + 3) / 4 = 21.', '(৩⁴ + ৩) / ৪ = ২১।') },
  ],
  observation: L(
    'By symmetry only two quantities matter: f = ways to be at D, g = ways to be at one particular other vertex. From D you go to 3 vertices; from a non-D vertex you go to D or to 2 others. So f′ = 3g and g′ = f + 2g, a linear map that a 2 × 2 matrix represents.',
    'প্রতিসাম্যের কারণে শুধু দুটি রাশি গুরুত্বপূর্ণ: f = D-তে থাকার উপায়, g = অন্য একটি নির্দিষ্ট শীর্ষে থাকার উপায়। D থেকে ৩টি শীর্ষে যাওয়া যায়; অ-D শীর্ষ থেকে D-তে বা অন্য ২টিতে। তাই f′ = ৩g আর g′ = f + ২g, একটি রৈখিক ম্যাপ যা একটি ২ × ২ ম্যাট্রিক্স প্রকাশ করে।',
  ),
  approach: [
    L('Start with f = 1, g = 0 and apply the step n times (O(n) is enough for 10⁷).', 'f = ১, g = ০ থেকে শুরু করে ধাপটি n বার প্রয়োগ (১০⁷-এর জন্য O(n)-ই যথেষ্ট)।'),
    L('Or raise [[0, 3], [1, 2]] to the n-th power in O(log n).', 'অথবা [[০, ৩], [১, ২]]-কে O(log n)-এ n-তম ঘাতে তোলা।'),
  ],
  walkthrough: {
    input: 'n = 4',
    steps: [
      { state: '(f, g) = (1, 0) → (0, 1) → (3, 2) → (6, 7) → (21, 20)', text: L('Four steps of f′ = 3g, g′ = f + 2g.', 'f′ = ৩g, g′ = f + ২g-এর চার ধাপ।') },
    ],
  },
  complexity: { time: 'O(n) or O(log n)', space: 'O(1)', why: L('Two numbers per step, or a 2 × 2 matrix power.', 'প্রতি ধাপে দুটি সংখ্যা, বা একটি ২ × ২ ম্যাট্রিক্স ঘাত।') },
  solutions: [
    {
      id: 'dp',
      kind: 'better',
      title: L('Two-state DP, step by step', 'দুই অবস্থার DP, ধাপে ধাপে'),
      idea: L('f′ = 3g, g′ = f + 2g, n times.', 'f′ = ৩g, g′ = f + ২g, n বার।'),
      explain: [
        L(
          'Symmetry shrinks four vertices to two classes. 10⁷ steps of two multiplications each run in well under a second.',
          'প্রতিসাম্য চারটি শীর্ষকে দুটি শ্রেণিতে নামায়। দুটি গুণের ১০⁷ ধাপ এক সেকেন্ডের অনেক কমে চলে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    long long n;
    cin >> n;
    long long f = 1, g = 0;  // f: at D, g: at one fixed other vertex
    for (long long i = 0; i < n; i++) {
        long long nf = 3 * g % MOD;
        long long ng = (f + 2 * g) % MOD;
        f = nf, g = ng;
    }
    cout << f << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-arith', 'long-long'],
    },
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('2 × 2 matrix exponentiation', '২ × ২ ম্যাট্রিক্স ঘাত'),
      idea: L('(f, g) after n steps = Mⁿ · (1, 0) with M = [[0, 3], [1, 2]].', 'n ধাপ পরে (f, g) = Mⁿ · (১, ০), যেখানে M = [[০, ৩], [১, ২]]।'),
      explain: [
        L(
          'Any linear recurrence with constant coefficients is a matrix times a vector, and repeated squaring computes Mⁿ with O(log n) multiplications. This version would work even for n = 10¹⁸.',
          'ধ্রুব সহগের যেকোনো রৈখিক পুনরাবৃত্তি হলো ম্যাট্রিক্স গুণ ভেক্টর, আর বারবার বর্গ করে O(log n) গুণে Mⁿ পাওয়া যায়। এই সংস্করণ n = ১০¹⁸-এও চলত।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
typedef array<array<long long, 2>, 2> Mat;

Mat mul(const Mat& a, const Mat& b) {
    Mat c{};
    for (int i = 0; i < 2; i++)
        for (int k = 0; k < 2; k++)
            for (int j = 0; j < 2; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    return c;
}

int main() {
    long long n;
    cin >> n;
    Mat r{{{1, 0}, {0, 1}}}, m{{{0, 3}, {1, 2}}};
    for (; n; n >>= 1, m = mul(m, m))
        if (n & 1) r = mul(r, m);
    cout << r[0][0] << "\n";  // first column = M^n * (1, 0)
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-arith', 'bit-shift'],
    },
    {
      id: 'closed-form',
      kind: 'method',
      title: L('Closed form (3ⁿ + 3·(−1)ⁿ) / 4', 'সরাসরি সূত্র (৩ⁿ + ৩·(−১)ⁿ) / ৪'),
      idea: L('The eigenvalues of M are 3 and −1, so f(n) = (3ⁿ + 3(−1)ⁿ) / 4.', 'M-এর আইগেনমান ৩ আর −১, তাই f(n) = (৩ⁿ + ৩(−১)ⁿ) / ৪।'),
      explain: [
        L(
          'Total walks are 3ⁿ, and by symmetry the walks ending away from D split evenly. Solving f + 3g = 3ⁿ with f(n) = 3g(n − 1) gives the formula; the division by 4 becomes multiplication by the modular inverse of 4.',
          'মোট পথ ৩ⁿ, আর প্রতিসাম্যে D-এর বাইরে শেষ হওয়া পথগুলো সমানভাবে ভাগ হয়। f + ৩g = ৩ⁿ আর f(n) = ৩g(n − ১) সমাধান করলে সূত্রটি আসে; ৪ দিয়ে ভাগ হয়ে যায় ৪-এর মডুলার ইনভার্স দিয়ে গুণ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    for (; e; e >>= 1, b = b * b % MOD)
        if (e & 1) r = r * b % MOD;
    return r;
}

int main() {
    long long n;
    cin >> n;
    long long sign = (n % 2 == 0) ? 3 : MOD - 3;  // 3 * (-1)^n
    cout << (power(3, n) + sign) % MOD * power(4, MOD - 2) % MOD << "\n";
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every walk', 'প্রতিটি পথ তালিকা'),
      idea: L('DFS over all 3ⁿ walks and count those ending at D.', 'সব ৩ⁿ পথে DFS করে D-তে শেষ হওয়াগুলো গোনা।'),
      explain: [L('Uses no symmetry at all; the stress reference for small n.', 'কোনো প্রতিসাম্যই ব্যবহার করে না; ছোট n-এর স্ট্রেস রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long walks(int at, int left) {
    if (left == 0) return at == 3;  // vertex 3 is D
    long long s = 0;
    for (int v = 0; v < 4; v++)
        if (v != at) s += walks(v, left - 1);
    return s;
}

int main() {
    int n;
    cin >> n;
    if (n > 14) { cout << "\n"; return 0; }
    cout << walks(3, n) % 1000000007 << "\n";
    return 0;
}
`,
      time: 'O(3ⁿ)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2', output: '3', source: 'sample', note: sample(1) },
    { input: '4', output: '21', source: 'sample', note: sample(2) },
    { input: '1', output: '0', source: 'own', note: L('One step always leaves D.', 'এক ধাপ সবসময় D ছেড়ে যায়।') },
  ],
  pitfalls: [
    L('Tracking all four vertices separately with n = 10⁷ arrays: memory limit.', 'n = ১০⁷ আকারের অ্যারেতে চারটি শীর্ষ আলাদা ধরা: মেমরি সীমা।'),
    L('Dividing 3ⁿ + 3 by 4 after reducing modulo p with plain division.', 'p মডুলো নেওয়ার পর সাধারণ ভাগে ৩ⁿ + ৩-কে ৪ দিয়ে ভাগ।'),
  ],
  related: [
    { id: '621E', name: 'Wet Shark and Blocks', why: L('DP transitions raised to a huge power.', 'বিশাল ঘাতে তোলা DP রূপান্তর।') },
    { id: '691E', name: 'Xor-sequences', why: L('Counting walks with a matrix power.', 'ম্যাট্রিক্স ঘাতে পথ গোনা।') },
  ],
  toolkit: ['mod-pow', 'mod-arith'],
};

// ───────────────────────────────────────────── 691E
export const p691E: ProblemEntry = {
  id: '691E',
  contestId: 691,
  index: 'E',
  name: 'Xor-sequences',
  rating: 1900,
  tags: ['matrices'],
  why: L(
    'Counting walks of length k in a graph is the (k − 1)-th power of its adjacency matrix. Here the graph is “popcount of the xor is a multiple of 3”.',
    'গ্রাফে k দৈর্ঘ্যের পথ গোনা মানে সংলগ্নতা ম্যাট্রিক্সের (k − ১)-তম ঘাত। এখানে গ্রাফটি হলো “xor-এর popcount ৩-এর গুণিতক”।',
  ),
  statement: L(
    'Given n integers a₁ … aₙ and k, count sequences of length k where every element is one of the aᵢ (chosen by position, so equal values at different positions count separately) and for every two neighbours x, y the number of 1 bits in x xor y is a multiple of 3. Print the count modulo 10⁹ + 7.',
    'n-টি পূর্ণসংখ্যা a₁ … aₙ আর k দেওয়া। k দৈর্ঘ্যের এমন অনুক্রম গুনুন যার প্রতিটি উপাদান কোনো একটি aᵢ (অবস্থান ধরে বাছা, তাই ভিন্ন অবস্থানের সমান মান আলাদা গণ্য) আর প্রতিটি প্রতিবেশী x, y-এর জন্য x xor y-এর ১ বিটের সংখ্যা ৩-এর গুণিতক। গণনা ১০⁹ + ৭ মডুলো ছাপুন।',
  ),
  input: L('n k, then a₁ … aₙ.', 'n k, তারপর a₁ … aₙ।'),
  output: L('The count modulo 10⁹ + 7.', 'গণনা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n ≤ 100, k ≤ 10¹⁸, aᵢ ≤ 10¹⁸', 'n ≤ ১০০, k ≤ ১০¹⁸, aᵢ ≤ ১০¹⁸')] },
  samples: [
    { input: '5 2\n15 1 2 4 8', output: '13', explain: L('5 pairs (x, x) plus 8 ordered pairs between 15 and the powers of two (popcount 3).', '৫টি (x, x) জোড়া আর ১৫ ও দুইয়ের ঘাতগুলোর মধ্যে ৮টি ক্রমযুক্ত জোড়া (popcount ৩)।') },
    { input: '5 1\n15 1 2 4 8', output: '5', explain: L('Any single element.', 'যেকোনো একটি উপাদান।') },
  ],
  observation: L(
    'Build the n × n matrix A with A[i][j] = 1 when popcount(aᵢ xor aⱼ) mod 3 = 0 (including i = j). The number of valid sequences that go i → … → j in k − 1 steps is A^(k−1)[i][j], so the answer is the sum of all entries of A^(k−1).',
    'n × n ম্যাট্রিক্স A বানান, যেখানে popcount(aᵢ xor aⱼ) mod ৩ = ০ হলে A[i][j] = ১ (i = j-সহ)। k − ১ ধাপে i → … → j যাওয়া বৈধ অনুক্রমের সংখ্যা A^(k−১)[i][j], তাই উত্তর A^(k−১)-এর সব উপাদানের যোগফল।',
  ),
  approach: [
    L('Build A with __builtin_popcountll.', '__builtin_popcountll দিয়ে A বানানো।'),
    L('Compute A^(k−1) by repeated squaring (n³ log k ≈ 6·10⁷).', 'বারবার বর্গ করে A^(k−১) (n³ log k ≈ ৬·১০⁷)।'),
    L('Sum all entries.', 'সব উপাদান যোগ।'),
  ],
  walkthrough: {
    input: '15 1 2 4 8, k = 2',
    steps: [
      { state: 'diagonal: 5 ones', text: L('x xor x = 0.', 'x xor x = ০।') },
      { state: '15 xor 1 = 14 (3 bits): yes; 1 xor 2 = 3 (2 bits): no', text: L('15 connects to each of 1, 2, 4, 8 in both directions: 8 more.', '১৫ প্রতিটি ১, ২, ৪, ৮-এর সঙ্গে দুই দিকে যুক্ত: আরও ৮।') },
      { state: 'sum = 13', text: L('Matches the sample.', 'স্যাম্পলের সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(n³ log k)', space: 'O(n²)', why: L('About 60 multiplications of 100 × 100 matrices.', '১০০ × ১০০ ম্যাট্রিক্সের প্রায় ৬০টি গুণ।') },
  solutions: [
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('Adjacency matrix to the power k − 1', 'সংলগ্নতা ম্যাট্রিক্সের k − ১ ঘাত'),
      idea: L('Answer = Σ A^(k−1)[i][j].', 'উত্তর = Σ A^(k−১)[i][j]।'),
      explain: [
        L(
          'Accumulate products in unsigned 64-bit and reduce once per entry: 100 products below 10¹⁸ each would overflow, so reduce after every multiplication, or add at most 18 terms between reductions. Here we simply reduce every term.',
          'গুণফল আনসাইনড ৬৪-বিটে জমান আর প্রতিটি ঘরে কমান: ১০¹⁸-এর নিচের ১০০টি গুণফল উপচে পড়ত, তাই প্রতিটি গুণের পর মডুলো নিন। এখানে আমরা প্রতিটি পদেই মডুলো নিই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const unsigned long long MOD = 1e9 + 7;
typedef vector<vector<unsigned long long>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    int n = a.size();
    Mat c(n, vector<unsigned long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (!a[i][k]) continue;
            for (int j = 0; j < n; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    Mat A(n, vector<unsigned long long>(n, 0)), R(n, vector<unsigned long long>(n, 0));
    for (int i = 0; i < n; i++) {
        R[i][i] = 1;
        for (int j = 0; j < n; j++) A[i][j] = __builtin_popcountll(a[i] ^ a[j]) % 3 == 0;
    }
    for (long long e = k - 1; e; e >>= 1, A = mul(A, A))
        if (e & 1) R = mul(R, A);
    unsigned long long ans = 0;
    for (auto& row : R)
        for (auto v : row) ans = (ans + v) % MOD;
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n³ log k)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['popcount', 'mod-arith', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP over the length', 'দৈর্ঘ্যের ওপর DP'),
      idea: L('cnt[j] after step t = Σ cnt[i] over allowed i → j; repeat k − 1 times.', 'ধাপ t-এর পর cnt[j] = অনুমোদিত i → j-এর ওপর Σ cnt[i]; k − ১ বার।'),
      explain: [L('The same transitions, applied one step at a time: O(k n²), fine only for small k.', 'একই রূপান্তর, একবারে এক ধাপ: O(k n²), শুধু ছোট k-তে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    if (k > 2000) { cout << "\n"; return 0; }
    vector<long long> cnt(n, 1);
    for (long long step = 1; step < k; step++) {
        vector<long long> nx(n, 0);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (__builtin_popcountll(a[i] ^ a[j]) % 3 == 0) nx[j] = (nx[j] + cnt[i]) % MOD;
        cnt = nx;
    }
    long long ans = 0;
    for (auto c : cnt) ans = (ans + c) % MOD;
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(k n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['popcount'],
    },
  ],
  tests: [
    { input: '5 2\n15 1 2 4 8', output: '13', source: 'sample', note: sample(1) },
    { input: '5 1\n15 1 2 4 8', output: '5', source: 'sample', note: sample(2) },
    { input: '2 3\n7 7', output: '8', source: 'own', note: L('Equal values at two positions: 2³ sequences.', 'দুই অবস্থানে সমান মান: ২³টি অনুক্রম।') },
  ],
  pitfalls: [
    L('Raising to the k-th power instead of k − 1.', 'k − ১-এর বদলে k-তম ঘাত।'),
    L('Merging equal values: positions are distinct choices.', 'সমান মান এক করে ফেলা: অবস্থানগুলো আলাদা পছন্দ।'),
  ],
  related: [
    { id: '166E', name: 'Tetrahedron', why: L('Walk counting with a matrix power.', 'ম্যাট্রিক্স ঘাতে পথ গোনা।') },
    { id: '576D', name: 'Flights for Regular Customers', why: L('Boolean matrix powers on a graph.', 'গ্রাফে বুলিয়ান ম্যাট্রিক্স ঘাত।') },
  ],
  toolkit: ['popcount', 'mod-arith'],
};

// ───────────────────────────────────────────── 514E
export const p514E: ProblemEntry = {
  id: '514E',
  contestId: 514,
  index: 'E',
  name: 'Darth Vader and Tree',
  rating: 2200,
  tags: ['dp', 'matrices'],
  why: L(
    'A linear recurrence of order 100 plus a running prefix sum, both packed into one 101 × 101 matrix. The trick of adding the sum as an extra state is worth remembering.',
    '১০০ ক্রমের একটি রৈখিক পুনরাবৃত্তি আর একটি চলমান প্রিফিক্স যোগফল, দুটোই একটি ১০১ × ১০১ ম্যাট্রিক্সে। যোগফলকে বাড়তি অবস্থা হিসেবে যোগ করার কৌশলটি মনে রাখার মতো।',
  ),
  statement: L(
    'In an infinite rooted tree every node has exactly n children, and the edge to the i-th child has length dᵢ. Count the nodes at distance at most x from the root, modulo 10⁹ + 7.',
    'একটি অসীম শিকড়যুক্ত গাছে প্রতিটি নোডের ঠিক n-টি সন্তান, আর i-তম সন্তানের ধারের দৈর্ঘ্য dᵢ। শিকড় থেকে বড়জোর x দূরত্বের নোড গুনুন, ১০⁹ + ৭ মডুলো।',
  ),
  input: L('n x, then d₁ … dₙ.', 'n x, তারপর d₁ … dₙ।'),
  output: L('The count modulo 10⁹ + 7.', 'গণনা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵, x ≤ 10⁹, 1 ≤ dᵢ ≤ 100', 'n ≤ ১০⁵, x ≤ ১০⁹, ১ ≤ dᵢ ≤ ১০০')] },
  samples: [
    { input: '3 3\n1 2 3', output: '8', explain: L('1 root, 1 at distance 1, 2 at distance 2, 4 at distance 3.', '১টি শিকড়, দূরত্ব ১-এ ১টি, ২-এ ২টি, ৩-এ ৪টি।') },
  ],
  observation: L(
    'Let c[d] be how many edges have length d and dp[t] the number of nodes at distance exactly t. A node at distance t is a child of a node at distance t − d through one of c[d] edges: dp[t] = Σ c[d] · dp[t − d], d ≤ 100. Keep the last 100 values of dp and the running sum S in a vector; one step is a 101 × 101 matrix.',
    'c[d] হোক d দৈর্ঘ্যের ধারের সংখ্যা আর dp[t] হোক ঠিক t দূরত্বের নোডের সংখ্যা। t দূরত্বের নোড c[d]-টি ধারের একটি দিয়ে t − d দূরত্বের নোডের সন্তান: dp[t] = Σ c[d] · dp[t − d], d ≤ ১০০। dp-এর শেষ ১০০টি মান আর চলমান যোগফল S একটি ভেক্টরে রাখুন; এক ধাপ একটি ১০১ × ১০১ ম্যাট্রিক্স।',
  ),
  approach: [
    L('State (dp[t], dp[t−1], …, dp[t−99], S(t)) with dp[0] = 1, S(0) = 1.', 'অবস্থা (dp[t], dp[t−১], …, dp[t−৯৯], S(t)), dp[০] = ১, S(০) = ১।'),
    L('Row 0: new dp = Σ c[d] · dp[t+1−d]; rows 1–99 shift; last row S + new dp.', 'সারি ০: নতুন dp = Σ c[d] · dp[t+১−d]; সারি ১–৯৯ সরানো; শেষ সারি S + নতুন dp।'),
    L('Apply the matrix x times by fast exponentiation and read S.', 'দ্রুত ঘাত দিয়ে ম্যাট্রিক্স x বার প্রয়োগ করে S পড়া।'),
  ],
  walkthrough: {
    input: 'd = 1, 2, 3; x = 3',
    steps: [
      { state: 'dp = 1, 1, 2, 4', text: L('dp[3] = dp[2] + dp[1] + dp[0].', 'dp[৩] = dp[২] + dp[১] + dp[০]।') },
      { state: 'S(3) = 8', text: L('Matches the sample.', 'স্যাম্পলের সঙ্গে মেলে।') },
    ],
  },
  complexity: { time: 'O(101³ log x)', space: 'O(101²)', why: L('About 30 squarings of a 101 × 101 matrix.', '১০১ × ১০১ ম্যাট্রিক্সের প্রায় ৩০টি বর্গ।') },
  solutions: [
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('Recurrence plus prefix sum in one matrix', 'পুনরাবৃত্তি আর প্রিফিক্স যোগফল একটি ম্যাট্রিক্সে'),
      idea: L('Augment the state with S so the matrix also accumulates the answer.', 'অবস্থায় S যোগ করুন যাতে ম্যাট্রিক্স উত্তরও জমায়।'),
      explain: [
        L(
          'n can be 10⁵ but only the counts c[1..100] matter, so the matrix size is fixed at 101. The vector is multiplied by the matrix power, so start from the identity and fold in squares of the step matrix.',
          'n ১০⁵ হতে পারে কিন্তু শুধু c[১..১০০] গণনাই গুরুত্বপূর্ণ, তাই ম্যাট্রিক্সের আকার স্থির ১০১। ভেক্টরকে ম্যাট্রিক্স ঘাত দিয়ে গুণ করা হয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
const int K = 101;
typedef vector<vector<long long>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    Mat c(K, vector<long long>(K, 0));
    for (int i = 0; i < K; i++)
        for (int k = 0; k < K; k++) {
            if (!a[i][k]) continue;
            for (int j = 0; j < K; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}

int main() {
    int n;
    long long x;
    scanf("%d %lld", &n, &x);
    vector<long long> cnt(101, 0);
    for (int i = 0; i < n; i++) { int d; scanf("%d", &d); cnt[d]++; }
    // state: v[0..99] = dp[t], dp[t-1], ..., dp[t-99]; v[100] = S(t)
    Mat M(K, vector<long long>(K, 0));
    for (int d = 1; d <= 100; d++) M[0][d - 1] = cnt[d];
    for (int i = 1; i < 100; i++) M[i][i - 1] = 1;
    for (int d = 1; d <= 100; d++) M[100][d - 1] = cnt[d];  // S(t+1) = S(t) + dp[t+1]
    M[100][100] = 1;
    Mat R(K, vector<long long>(K, 0));
    for (int i = 0; i < K; i++) R[i][i] = 1;
    for (long long e = x; e; e >>= 1, M = mul(M, M))
        if (e & 1) R = mul(R, M);
    // initial vector: dp[0] = 1, S(0) = 1
    printf("%lld\n", (R[100][0] + R[100][100]) % MOD);
    return 0;
}
`,
      time: 'O(101³ log x)',
      space: 'O(101²)',
      accepted: true,
      toolkit: ['mod-arith', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Linear DP up to x', 'x পর্যন্ত রৈখিক DP'),
      idea: L('Fill dp[0..x] directly and sum.', 'সরাসরি dp[০..x] পূর্ণ করে যোগ।'),
      explain: [L('O(100 · x): exactly the recurrence, without the matrix.', 'O(১০০ · x): ঠিক পুনরাবৃত্তিটিই, ম্যাট্রিক্স ছাড়া।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    int n;
    long long x;
    cin >> n >> x;
    vector<long long> cnt(101, 0);
    for (int i = 0; i < n; i++) { int d; cin >> d; cnt[d]++; }
    if (x > 200000) { cout << "\n"; return 0; }
    vector<long long> dp(x + 1, 0);
    dp[0] = 1;
    long long total = 1;
    for (long long t = 1; t <= x; t++) {
        for (int d = 1; d <= 100 && d <= t; d++) dp[t] = (dp[t] + cnt[d] * dp[t - d]) % MOD;
        total = (total + dp[t]) % MOD;
    }
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(100 · x)',
      space: 'O(x)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3 3\n1 2 3', output: '8', source: 'sample', note: sample(1) },
    { input: '1 0\n5', output: '1', source: 'own', note: L('x = 0: only the root.', 'x = ০: শুধু শিকড়।') },
    { input: '2 4\n2 2', output: '7', source: 'own', note: L('1 + 2 + 4 nodes at distances 0, 2, 4.', 'দূরত্ব ০, ২, ৪-এ ১ + ২ + ৪টি নোড।') },
  ],
  pitfalls: [
    L('Building an n × n matrix: only edge lengths matter, not the number of children.', 'n × n ম্যাট্রিক্স বানানো: শুধু ধারের দৈর্ঘ্য গুরুত্বপূর্ণ, সন্তানের সংখ্যা নয়।'),
    L('Forgetting the root itself in the count.', 'গণনায় শিকড়কে ভুলে যাওয়া।'),
  ],
  related: [
    { id: '621E', name: 'Wet Shark and Blocks', why: L('A DP step as a matrix.', 'DP-এর একটি ধাপ ম্যাট্রিক্স হিসেবে।') },
    { id: '1117D', name: 'Magic Gems', why: L('A linear recurrence of large order.', 'বড় ক্রমের রৈখিক পুনরাবৃত্তি।') },
  ],
  toolkit: ['mod-arith'],
};

// ───────────────────────────────────────────── 821E
export const p821E: ProblemEntry = {
  id: '821E',
  contestId: 821,
  index: 'E',
  name: 'Okabe and El Psy Kongroo',
  rating: 2100,
  tags: ['dp', 'matrices'],
  why: L(
    'The transition matrix changes from segment to segment. Power each segment’s matrix separately and clip the vector at the boundaries: piecewise matrix exponentiation.',
    'রূপান্তর ম্যাট্রিক্স অংশ থেকে অংশে বদলায়। প্রতিটি অংশের ম্যাট্রিক্স আলাদাভাবে ঘাতে তুলে সীমানায় ভেক্টর কেটে দিন: খণ্ড খণ্ড ম্যাট্রিক্স ঘাত।',
  ),
  statement: L(
    'Okabe walks from (0, 0) to (k, 0). Each step goes from (x, y) to (x + 1, y + 1), (x + 1, y) or (x + 1, y − 1). There are n segments: for aᵢ ≤ x ≤ bᵢ he must keep 0 ≤ y ≤ cᵢ. The segments are consecutive (a₁ = 0, aᵢ = bᵢ₋₁) and aₙ ≤ k ≤ bₙ. Count the walks modulo 10⁹ + 7.',
    'ওকাবে (০, ০) থেকে (k, ০)-তে হাঁটে। প্রতি ধাপে (x, y) থেকে (x + ১, y + ১), (x + ১, y) বা (x + ১, y − ১)। n-টি অংশ আছে: aᵢ ≤ x ≤ bᵢ হলে তাকে ০ ≤ y ≤ cᵢ রাখতে হবে। অংশগুলো পরপর (a₁ = ০, aᵢ = bᵢ₋₁) আর aₙ ≤ k ≤ bₙ। পথ গুনুন, ১০⁹ + ৭ মডুলো।',
  ),
  input: L('n k, then n lines aᵢ bᵢ cᵢ.', 'n k, তারপর n লাইনে aᵢ bᵢ cᵢ।'),
  output: L('The number of walks modulo 10⁹ + 7.', 'পথের সংখ্যা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 100, k ≤ 10¹⁸, cᵢ ≤ 15', 'n ≤ ১০০, k ≤ ১০¹⁸, cᵢ ≤ ১৫')] },
  samples: [
    { input: '1 3\n0 3 3', output: '4', explain: L('Walks of 3 steps from y = 0 back to y = 0 staying ≥ 0: 4 (Motzkin number).', '৩ ধাপে y = ০ থেকে y = ০-তে ফেরা, ≥ ০ থেকে: ৪টি (মটজকিন সংখ্যা)।') },
    { input: '2 6\n0 3 0\n3 10 2', output: '4', explain: L('Flat for the first 3 steps, then 3 free steps under y ≤ 2.', 'প্রথম ৩ ধাপ সমতল, তারপর y ≤ ২-এর নিচে ৩টি মুক্ত ধাপ।') },
  ],
  observation: L(
    'Inside one segment the rule is fixed: y moves by −1, 0, +1 within [0, c]. That is a (c + 1) × (c + 1) tridiagonal matrix T. Crossing a segment of length len multiplies the count vector by T^len. At the start of each segment, heights above the new c are no longer allowed: set them to 0.',
    'একটি অংশের ভেতরে নিয়ম স্থির: y [০, c]-এর মধ্যে −১, ০, +১ সরে। এটি একটি (c + ১) × (c + ১) ত্রিকর্ণ ম্যাট্রিক্স T। len দৈর্ঘ্যের অংশ পার হওয়া মানে গণনা ভেক্টরকে T^len দিয়ে গুণ। প্রতিটি অংশের শুরুতে নতুন c-এর ওপরের উচ্চতা আর অনুমোদিত নয়: সেগুলো ০ করুন।',
  ),
  approach: [
    L('v = (1, 0, …, 0) at x = 0.', 'x = ০-তে v = (১, ০, …, ০)।'),
    L('For each segment: zero v above cᵢ, then v = T_cᵢ^(min(bᵢ, k) − aᵢ) · v.', 'প্রতিটি অংশে: cᵢ-এর ওপরে v শূন্য, তারপর v = T_cᵢ^(min(bᵢ, k) − aᵢ) · v।'),
    L('Answer v[0].', 'উত্তর v[০]।'),
  ],
  walkthrough: {
    input: 'segments [0,3] c = 0, [3,10] c = 2, k = 6',
    steps: [
      { state: 'segment 1: T = [1], 3 steps → v = (1)', text: L('Must stay on y = 0.', 'y = ০-তে থাকতেই হবে।') },
      { state: 'segment 2: 3 steps with c = 2 from y = 0 to y = 0', text: L('4 walks.', '৪টি পথ।') },
    ],
  },
  complexity: { time: 'O(n · 16³ · log k)', space: 'O(16²)', why: L('One small matrix power per segment.', 'প্রতি অংশে একটি ছোট ম্যাট্রিক্স ঘাত।') },
  solutions: [
    {
      id: 'segments',
      kind: 'optimal',
      title: L('One matrix power per segment', 'প্রতি অংশে একটি ম্যাট্রিক্স ঘাত'),
      idea: L('Clip, then multiply by T_c^len.', 'কাটা, তারপর T_c^len দিয়ে গুণ।'),
      explain: [
        L(
          'The last segment may run past k, so its length is min(bᵢ, k) − aᵢ. Applying a matrix power to a vector is cheaper as “vector times squares”: multiply the vector by T whenever the bit is set, squaring T each time.',
          'শেষ অংশ k পেরিয়ে যেতে পারে, তাই তার দৈর্ঘ্য min(bᵢ, k) − aᵢ। ভেক্টরে ম্যাট্রিক্স ঘাত প্রয়োগ “ভেক্টর গুণ বর্গ” হিসেবে সস্তা: বিট থাকলে ভেক্টরকে T দিয়ে গুণ, প্রতিবার T বর্গ।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
typedef vector<vector<long long>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    int n = a.size();
    Mat c(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++)
            for (int j = 0; j < n; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    return c;
}

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> v(16, 0);
    v[0] = 1;
    for (int s = 0; s < n; s++) {
        long long a, b;
        int c;
        cin >> a >> b >> c;
        if (a >= k) continue;                       // segment starts at or after the goal
        for (int y = c + 1; y < 16; y++) v[y] = 0;  // heights above c are forbidden here
        Mat T(c + 1, vector<long long>(c + 1, 0));
        for (int y = 0; y <= c; y++)
            for (int dy = -1; dy <= 1; dy++)
                if (y + dy >= 0 && y + dy <= c) T[y + dy][y] = 1;  // column = from, row = to
        long long len = min(b, k) - a;
        for (; len; len >>= 1, T = mul(T, T))
            if (len & 1) {
                vector<long long> nv(16, 0);
                for (int i = 0; i <= c; i++)
                    for (int j = 0; j <= c; j++) nv[i] = (nv[i] + T[i][j] * v[j]) % MOD;
                v = nv;
            }
    }
    cout << v[0] << "\n";
    return 0;
}
`,
      time: 'O(n · 16³ · log k)',
      space: 'O(16²)',
      accepted: true,
      toolkit: ['mod-arith', 'vector', 'bit-shift'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Step-by-step DP', 'ধাপে ধাপে DP'),
      idea: L('Move x from 0 to k, applying the limit of the segment(s) containing x.', 'x-কে ০ থেকে k পর্যন্ত সরানো, x ধারণকারী অংশের সীমা প্রয়োগ করে।'),
      explain: [L('A plain DP over x: O(k · 16), so only for small k.', 'x-এর ওপর সাধারণ DP: O(k · ১৬), তাই শুধু ছোট k।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n), b(n), c(n);
    for (int i = 0; i < n; i++) cin >> a[i] >> b[i] >> c[i];
    if (k > 100000) { cout << "\n"; return 0; }
    auto limit = [&](long long x) {  // tightest bound among segments containing x
        long long lim = 1000;
        for (int i = 0; i < n; i++) if (a[i] <= x && x <= b[i]) lim = min(lim, c[i]);
        return lim;
    };
    vector<long long> v(17, 0);
    v[0] = 1;
    for (long long x = 1; x <= k; x++) {
        vector<long long> nv(17, 0);
        long long lim = limit(x);
        for (int y = 0; y <= 15; y++)
            for (int dy = -1; dy <= 1; dy++) {
                int ny = y + dy;
                if (ny >= 0 && ny <= lim && ny <= 15) nv[ny] = (nv[ny] + v[y]) % MOD;
            }
        v = nv;
    }
    cout << v[0] << "\n";
    return 0;
}
`,
      time: 'O(k · n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '1 3\n0 3 3', output: '4', source: 'sample', note: sample(1) },
    { input: '2 6\n0 3 0\n3 10 2', output: '4', source: 'sample', note: sample(2) },
    { input: '2 4\n0 2 1\n2 5 0', output: '2', source: 'own', note: L('Up and down in the first segment, then flat.', 'প্রথম অংশে ওঠা-নামা, তারপর সমতল।') },
  ],
  pitfalls: [
    L('Forgetting to clip the vector when the limit drops between segments.', 'অংশের মাঝে সীমা কমলে ভেক্টর কাটতে ভোলা।'),
    L('Powering the last segment to bᵢ − aᵢ instead of k − aᵢ.', 'শেষ অংশকে k − aᵢ-এর বদলে bᵢ − aᵢ ঘাতে তোলা।'),
  ],
  related: [
    { id: '954F', name: 'Runner’s Problem', why: L('A small matrix that changes along the way.', 'পথে বদলানো একটি ছোট ম্যাট্রিক্স।') },
    { id: '166E', name: 'Tetrahedron', why: L('Counting walks with matrix powers.', 'ম্যাট্রিক্স ঘাতে পথ গোনা।') },
  ],
  toolkit: ['mod-arith'],
};

// ───────────────────────────────────────────── 551D
export const p551D: ProblemEntry = {
  id: '551D',
  contestId: 551,
  index: 'D',
  name: 'GukiZ and Binary Operations',
  rating: 2100,
  tags: ['combinatorics', 'implementation', 'math', 'matrices', 'number-theory'],
  why: L(
    'Bitwise conditions split into independent bits. For one bit the question is “binary strings with no two adjacent 1s”, which is Fibonacci, computed with a 2 × 2 matrix power for n up to 10¹⁸.',
    'বিটভিত্তিক শর্ত স্বাধীন বিটে ভাগ হয়। একটি বিটের প্রশ্ন হলো “পাশাপাশি দুটি ১ নেই এমন বাইনারি স্ট্রিং”, যা ফিবোনাচি, ১০¹⁸ পর্যন্ত n-এর জন্য ২ × ২ ম্যাট্রিক্স ঘাতে হিসাব।',
  ),
  statement: L(
    'Count arrays a of length n with 0 ≤ aᵢ < 2ˡ such that (a₁ and a₂) or (a₂ and a₃) or … or (aₙ₋₁ and aₙ) = k, where and/or are bitwise. Print the count modulo m.',
    'n দৈর্ঘ্যের অ্যারে a গুনুন, যেখানে ০ ≤ aᵢ < ২ˡ আর (a₁ and a₂) or (a₂ and a₃) or … or (aₙ₋₁ and aₙ) = k (বিটভিত্তিক and/or)। গণনা m মডুলো ছাপুন।',
  ),
  input: L('n k l m.', 'n k l m।'),
  output: L('The count modulo m.', 'গণনা m মডুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10¹⁸, k ≤ 10¹⁸, l ≤ 64, 1 ≤ m ≤ 10⁹ + 7', '২ ≤ n ≤ ১০¹⁸, k ≤ ১০¹⁸, l ≤ ৬৪, ১ ≤ m ≤ ১০⁹ + ৭')] },
  samples: [
    { input: '2 1 2 10', output: '3', explain: L('{1,1}, {3,1}, {1,3}.', '{১,১}, {৩,১}, {১,৩}।') },
    { input: '2 1 1 3', output: '1', explain: L('Only {1,1}.', 'শুধু {১,১}।') },
    { input: '3 3 2 10', output: '9', explain: L('Each bit: 3 strings with an adjacent pair of 1s; 3 · 3.', 'প্রতিটি বিটে: পাশাপাশি দুটি ১ আছে এমন ৩টি স্ট্রিং; ৩ · ৩।') },
  ],
  observation: L(
    'Look at one bit across the array: a binary string of length n. The OR of the ANDs has this bit set iff the string contains two adjacent 1s. Strings without adjacent 1s number F = Fib(n + 2); with them, 2ⁿ − F. Bits are independent, so multiply over the l bits; if k has a bit at position ≥ l, the answer is 0.',
    'অ্যারে জুড়ে একটি বিট দেখুন: n দৈর্ঘ্যের একটি বাইনারি স্ট্রিং। AND-গুলোর OR-এ এই বিট থাকে যদি ও কেবল যদি স্ট্রিংয়ে পাশাপাশি দুটি ১ থাকে। পাশাপাশি ১ নেই এমন স্ট্রিং F = Fib(n + ২)টি; আছে এমন ২ⁿ − F। বিটগুলো স্বাধীন, তাই l বিটের ওপর গুণ; k-তে ≥ l অবস্থানে বিট থাকলে উত্তর ০।',
  ),
  approach: [
    L('F = Fib(n + 2) mod m with a 2 × 2 matrix power; P = 2ⁿ mod m.', 'F = Fib(n + ২) mod m, ২ × ২ ম্যাট্রিক্স ঘাতে; P = ২ⁿ mod m।'),
    L('For each bit b < l multiply by (P − F) if k has bit b, else by F.', 'প্রতিটি বিট b < l-এ k-তে বিট b থাকলে (P − F), নইলে F দিয়ে গুণ।'),
    L('Check that k < 2ˡ; print the result mod m (m may be 1).', 'k < ২ˡ যাচাই; ফল mod m ছাপা (m ১ হতে পারে)।'),
  ],
  walkthrough: {
    input: 'n = 3, k = 3, l = 2, m = 10',
    steps: [
      { state: 'Fib(5) = 5 strings without 11: 000 001 010 100 101', text: L('8 − 5 = 3 strings with 11.', '৮ − ৫ = ৩টি স্ট্রিংয়ে ১১।') },
      { state: 'both bits of k set: 3 · 3 = 9', text: L('Answer 9.', 'উত্তর ৯।') },
    ],
  },
  complexity: { time: 'O(log n + l)', space: 'O(1)', why: L('One Fibonacci, one power, l multiplications.', 'একটি ফিবোনাচি, একটি ঘাত, l-টি গুণ।') },
  solutions: [
    {
      id: 'bits-fib',
      kind: 'optimal',
      title: L('Independent bits and Fibonacci', 'স্বাধীন বিট আর ফিবোনাচি'),
      idea: L('Π over bits of (F or 2ⁿ − F).', 'বিটগুলোর ওপর (F বা ২ⁿ − F)-এর গুণফল।'),
      explain: [
        L(
          'Strings without two adjacent 1s: end in 0 (any valid string of length n − 1) or in 01 (any valid string of length n − 2), so G(n) = G(n − 1) + G(n − 2) with G(1) = 2, G(2) = 3: shifted Fibonacci.',
          'পাশাপাশি দুটি ১ নেই এমন স্ট্রিং: শেষে ০ (n − ১ দৈর্ঘ্যের যেকোনো বৈধ স্ট্রিং) বা ০১ (n − ২ দৈর্ঘ্যের যেকোনো বৈধ স্ট্রিং), তাই G(n) = G(n − ১) + G(n − ২), G(১) = ২, G(২) = ৩: সরানো ফিবোনাচি।',
        ),
        L('Edge cases: m = 1 makes everything 0; l = 64 means every k fits.', 'প্রান্তিক কেস: m = ১ হলে সব ০; l = ৬৪ মানে প্রতিটি k আঁটে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef unsigned long long ull;
ull M;

void mul(ull a[2][2], ull b[2][2]) {
    ull c[2][2] = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; i++)
        for (int k = 0; k < 2; k++)
            for (int j = 0; j < 2; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % M;
    memcpy(a, c, sizeof c);
}

ull fib(ull n) {  // Fib(n) mod M with Fib(1) = Fib(2) = 1
    ull r[2][2] = {{1 % M, 0}, {0, 1 % M}}, q[2][2] = {{1, 1}, {1, 0}};
    for (; n; n >>= 1, mul(q, q))
        if (n & 1) mul(r, q);
    return r[0][1];
}

ull power(ull b, ull e) {
    ull r = 1 % M;
    for (b %= M; e; e >>= 1, b = b * b % M)
        if (e & 1) r = r * b % M;
    return r;
}

int main() {
    ull n, k, l;
    cin >> n >> k >> l >> M;
    if (l < 64 && (k >> l)) { cout << 0 << "\n"; return 0; }
    ull F = fib(n + 2), P = power(2, n), bad = (P + M - F) % M;
    ull ans = 1 % M;
    for (ull b = 0; b < l; b++) ans = ans * ((k >> b & 1) ? bad : F) % M;
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(log n + l)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'bit-shift', 'mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every array', 'প্রতিটি অ্যারে তালিকা'),
      idea: L('Try all (2ˡ)ⁿ arrays and evaluate the expression.', 'সব (২ˡ)ⁿ অ্যারে চেষ্টা করে রাশি মূল্যায়ন।'),
      explain: [L('Direct evaluation of the definition for tiny n and l.', 'ক্ষুদ্র n আর l-এর জন্য সংজ্ঞার সরাসরি মূল্যায়ন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    unsigned long long n, k, l, m;
    cin >> n >> k >> l >> m;
    if (n > 6 || l > 3) { cout << "\n"; return 0; }
    unsigned long long base = 1ULL << l, total = 1, cnt = 0;
    for (unsigned long long i = 0; i < n; i++) total *= base;
    vector<unsigned long long> a(n);
    for (unsigned long long code = 0; code < total; code++) {
        unsigned long long c = code;
        for (auto& x : a) x = c % base, c /= base;
        unsigned long long v = 0;
        for (unsigned long long i = 0; i + 1 < n; i++) v |= a[i] & a[i + 1];
        cnt += v == k;
    }
    cout << cnt % m << "\n";
    return 0;
}
`,
      time: 'O(2^(l·n) · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bitwise-and'],
    },
  ],
  tests: [
    { input: '2 1 2 10', output: '3', source: 'sample', note: sample(1) },
    { input: '2 1 1 3', output: '1', source: 'sample', note: sample(2) },
    { input: '3 3 2 10', output: '9', source: 'sample', note: sample(3) },
    { input: '5 8 3 1000', output: '0', source: 'own', note: L('k = 8 needs bit 3, but l = 3.', 'k = ৮-এ বিট ৩ লাগে, কিন্তু l = ৩।') },
    { input: '4 0 2 1', output: '0', source: 'own', note: L('Everything is 0 modulo 1.', '১ মডুলোতে সব ০।') },
  ],
  pitfalls: [
    L('Shifting 1 << 64: undefined behaviour when l = 64.', '১ << ৬৪: l = ৬৪ হলে অনির্ধারিত আচরণ।'),
    L('Printing 1 instead of 1 % m when m = 1.', 'm = ১ হলে ১ % m-এর বদলে ১ ছাপা।'),
  ],
  related: [
    { id: '166E', name: 'Tetrahedron', why: L('A 2 × 2 matrix power.', 'একটি ২ × ২ ম্যাট্রিক্স ঘাত।') },
    { id: '1182E', name: 'Product Oriented Recurrence', why: L('Recurrences for huge n with matrices.', 'বিশাল n-এর জন্য ম্যাট্রিক্সে পুনরাবৃত্তি।') },
  ],
  toolkit: ['mod-pow', 'bitwise-and'],
};

// ───────────────────────────────────────────── 954F
export const p954F: ProblemEntry = {
  id: '954F',
  contestId: 954,
  index: 'F',
  name: 'Runner’s Problem',
  rating: 2100,
  tags: ['dp', 'matrices', 'sortings'],
  why: L(
    'A 3-row DP over a field of length 10¹⁸. Obstacles change the transition only at their endpoints, so sort the events and power one of 8 masked 3 × 3 matrices between them.',
    '১০¹⁸ দৈর্ঘ্যের মাঠে ৩ সারির DP। বাধা শুধু তাদের প্রান্তে রূপান্তর বদলায়, তাই ঘটনাগুলো সাজিয়ে মাঝে ৮টি মাস্কড ৩ × ৩ ম্যাট্রিক্সের একটির ঘাত।',
  ),
  statement: L(
    'A field has 3 rows and m columns. You start at (2, 1) and must reach (2, m); from (i, j) you may go to (i − 1, j + 1), (i, j + 1) or (i + 1, j + 1) if that cell is inside the field. n obstacles each block cells (aₖ, j) for lₖ ≤ j ≤ rₖ. Count the paths modulo 10⁹ + 7.',
    'একটি মাঠে ৩টি সারি আর m-টি কলাম। আপনি (২, ১) থেকে শুরু করে (২, m)-এ পৌঁছাবেন; (i, j) থেকে (i − ১, j + ১), (i, j + ১) বা (i + ১, j + ১)-এ যাওয়া যায় যদি ঘরটি মাঠের ভেতরে থাকে। n-টি বাধার প্রতিটি lₖ ≤ j ≤ rₖ-এ (aₖ, j) ঘর বন্ধ করে। পথ গুনুন, ১০⁹ + ৭ মডুলো।',
  ),
  input: L('n m, then n lines aₖ lₖ rₖ.', 'n m, তারপর n লাইনে aₖ lₖ rₖ।'),
  output: L('The number of paths modulo 10⁹ + 7.', 'পথের সংখ্যা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 4, memoryMb: 256, notes: [L('n ≤ 10⁴, 3 ≤ m ≤ 10¹⁸, 2 ≤ lₖ ≤ rₖ ≤ m − 1', 'n ≤ ১০⁴, ৩ ≤ m ≤ ১০¹⁸, ২ ≤ lₖ ≤ rₖ ≤ m − ১')] },
  samples: [
    { input: '2 5\n1 3 4\n2 2 3', output: '2', explain: L('Two paths avoid both obstacles.', 'দুটি পথ দুই বাধাই এড়ায়।') },
  ],
  observation: L(
    'One column step multiplies the 3-vector of path counts by T = [[1,1,0],[1,1,1],[0,1,1]] and then zeroes the blocked rows. The set of blocked rows changes only at columns lₖ and rₖ + 1, at most 2n times; between those columns the same masked matrix repeats, so raise it to the length of the stretch.',
    'একটি কলাম-ধাপ পথ-গণনার ৩-ভেক্টরকে T = [[১,১,০],[১,১,১],[০,১,১]] দিয়ে গুণ করে, তারপর বন্ধ সারিগুলো শূন্য করে। বন্ধ সারির সেট শুধু lₖ আর rₖ + ১ কলামে বদলায়, বড়জোর ২n বার; সেই কলামগুলোর মাঝে একই মাস্কড ম্যাট্রিক্স বারবার আসে, তাই প্রসারের দৈর্ঘ্য পর্যন্ত ঘাতে তুলুন।',
  ),
  approach: [
    L('Events: (lₖ, row, +1) and (rₖ + 1, row, −1); sort by column.', 'ঘটনা: (lₖ, সারি, +১) আর (rₖ + ১, সারি, −১); কলাম দিয়ে সাজানো।'),
    L('Keep blocked counters per row; between events apply (mask · T)^(length).', 'প্রতি সারির বন্ধ-গণনা রাখা; ঘটনার মাঝে (মাস্ক · T)^(দৈর্ঘ্য) প্রয়োগ।'),
    L('After the last column m, answer = count in row 2.', 'শেষ কলাম m-এর পর উত্তর = সারি ২-এর গণনা।'),
  ],
  walkthrough: {
    input: 'm = 5: row 1 blocked on columns 3–4, row 2 on 2–3',
    steps: [
      { state: 'col 1: (0,1,0)', text: L('Start in row 2.', 'সারি ২-এ শুরু।') },
      { state: 'col 2 (row 2 blocked): (1,0,1)', text: L('Must step to rows 1 or 3.', 'সারি ১ বা ৩-এ যেতেই হবে।') },
      { state: 'col 3 (rows 1, 2 blocked): (0,0,1); col 4 (row 1 blocked): (0,1,1)', text: L('Only row 3 survives, then it spreads.', 'শুধু সারি ৩ টেকে, তারপর ছড়ায়।') },
      { state: 'col 5: row 2 gets 0 + 1 + 1 = 2', text: L('Two paths.', 'দুটি পথ।') },
    ],
  },
  complexity: { time: 'O(n log n + n · 27 · log m)', space: 'O(n)', why: L('Sorting events, then a 3 × 3 power per stretch.', 'ঘটনা সাজানো, তারপর প্রতি প্রসারে ৩ × ৩ ঘাত।') },
  solutions: [
    {
      id: 'sweep',
      kind: 'optimal',
      title: L('Event sweep with masked matrix powers', 'মাস্কড ম্যাট্রিক্স ঘাতসহ ঘটনা-সুইপ'),
      idea: L('Constant mask between consecutive events ⇒ one matrix power per stretch.', 'পরপর ঘটনার মাঝে ধ্রুব মাস্ক ⇒ প্রতি প্রসারে একটি ম্যাট্রিক্স ঘাত।'),
      explain: [
        L(
          'Columns lₖ … rₖ are blocked, so the mask turns on at lₖ and off at rₖ + 1. Counters per row handle overlapping obstacles in the same row. A stretch from column cur + 1 up to next − 1 uses the current mask.',
          'lₖ … rₖ কলাম বন্ধ, তাই মাস্ক lₖ-এ চালু আর rₖ + ১-এ বন্ধ হয়। একই সারিতে ওভারল্যাপিং বাধা প্রতি সারির কাউন্টার সামলায়। cur + ১ থেকে next − ১ কলাম পর্যন্ত প্রসার বর্তমান মাস্ক ব্যবহার করে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
typedef array<array<long long, 3>, 3> Mat;

Mat mul(const Mat& a, const Mat& b) {
    Mat c{};
    for (int i = 0; i < 3; i++)
        for (int k = 0; k < 3; k++)
            for (int j = 0; j < 3; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
    return c;
}

array<long long, 3> advance(array<long long, 3> v, int mask, long long len) {
    Mat T{};
    for (int to = 0; to < 3; to++)
        for (int from = 0; from < 3; from++)
            T[to][from] = abs(to - from) <= 1 && !(mask >> to & 1);
    for (; len; len >>= 1, T = mul(T, T))
        if (len & 1) {
            array<long long, 3> nv{};
            for (int i = 0; i < 3; i++)
                for (int j = 0; j < 3; j++) nv[i] = (nv[i] + T[i][j] * v[j]) % MOD;
            v = nv;
        }
    return v;
}

int main() {
    int n;
    long long m;
    scanf("%d %lld", &n, &m);
    vector<tuple<long long, int, int>> ev;  // column, row, +1/-1
    for (int i = 0; i < n; i++) {
        int a;
        long long l, r;
        scanf("%d %lld %lld", &a, &l, &r);
        ev.push_back({l, a - 1, 1});
        ev.push_back({r + 1, a - 1, -1});
    }
    sort(ev.begin(), ev.end());
    array<long long, 3> v = {0, 1, 0};
    int blocked[3] = {0, 0, 0};
    long long cur = 1;  // v describes column cur
    for (size_t i = 0; i <= ev.size(); i++) {
        long long next = i < ev.size() ? get<0>(ev[i]) : m + 1;
        int mask = (blocked[0] > 0) | (blocked[1] > 0) << 1 | (blocked[2] > 0) << 2;
        v = advance(v, mask, next - 1 - cur);  // columns cur+1 .. next-1
        cur = next - 1;
        if (i < ev.size()) blocked[get<1>(ev[i])] += get<2>(ev[i]);
    }
    printf("%lld\n", v[1]);
    return 0;
}
`,
      time: 'O(n log n + n log m)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'bit-shift', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Column-by-column DP', 'কলাম ধরে DP'),
      idea: L('Mark blocked cells, advance one column at a time.', 'বন্ধ ঘর চিহ্নিত করে একবারে এক কলাম এগোনো।'),
      explain: [L('O(m · n): the plain DP the fast version compresses.', 'O(m · n): সাধারণ DP যাকে দ্রুত সংস্করণ সংকুচিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    int n;
    long long m;
    cin >> n >> m;
    vector<int> a(n);
    vector<long long> l(n), r(n);
    for (int i = 0; i < n; i++) cin >> a[i] >> l[i] >> r[i];
    if (m > 20000) { cout << "\n"; return 0; }
    vector<long long> v = {0, 1, 0};
    for (long long col = 2; col <= m; col++) {
        vector<long long> nv(3, 0);
        for (int to = 0; to < 3; to++)
            for (int from = 0; from < 3; from++)
                if (abs(to - from) <= 1) nv[to] = (nv[to] + v[from]) % MOD;
        for (int i = 0; i < n; i++)
            if (l[i] <= col && col <= r[i]) nv[a[i] - 1] = 0;
        v = nv;
    }
    cout << v[1] << "\n";
    return 0;
}
`,
      time: 'O(m · n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '2 5\n1 3 4\n2 2 3', output: '2', source: 'sample', note: sample(1) },
    { input: '0 3', output: '3', source: 'own', note: L('No obstacles: the middle column can be any row.', 'কোনো বাধা নেই: মাঝের কলাম যেকোনো সারি।') },
    { input: '3 3\n1 2 2\n2 2 2\n3 2 2', output: '0', source: 'own', note: L('A full wall.', 'পুরো দেয়াল।') },
  ],
  pitfalls: [
    L('Using a boolean per row instead of a counter: overlapping obstacles in one row end too early.', 'সারিপ্রতি কাউন্টারের বদলে বুলিয়ান: এক সারিতে ওভারল্যাপিং বাধা আগেভাগে শেষ হয়।'),
    L('Applying the mask before the move instead of after it.', 'চলার পরের বদলে আগে মাস্ক প্রয়োগ।'),
  ],
  related: [
    { id: '821E', name: 'Okabe and El Psy Kongroo', why: L('Piecewise matrix powers.', 'খণ্ড খণ্ড ম্যাট্রিক্স ঘাত।') },
    { id: '166E', name: 'Tetrahedron', why: L('A tiny transition matrix.', 'একটি ক্ষুদ্র রূপান্তর ম্যাট্রিক্স।') },
  ],
  toolkit: ['sort', 'mod-arith'],
};

// ───────────────────────────────────────────── 1980E
export const p1980E: ProblemEntry = {
  id: '1980E',
  contestId: 1980,
  index: 'E',
  name: 'Permutation of Rows and Columns',
  rating: 1600,
  tags: ['constructive', 'data-structures', 'greedy', 'hashing', 'implementation', 'math', 'matrices', 'sortings'],
  why: L(
    'Row swaps keep every row’s set of values, column swaps keep every column’s. Because all values are distinct, matching row sets and column sets is also enough: an invariant that is both necessary and sufficient.',
    'সারি বদল প্রতিটি সারির মানের সেট রাখে, কলাম বদল প্রতিটি কলামের। সব মান ভিন্ন বলে সারির সেট আর কলামের সেট মিলে যাওয়াই যথেষ্ট: এমন একটি অপরিবর্তনীয় যা প্রয়োজনীয় ও যথেষ্ট দুটোই।',
  ),
  statement: L(
    'Two n × m matrices a and b each contain every number from 1 to n·m exactly once. You may swap any two rows or any two columns of a, any number of times. Can a become b?',
    'দুটি n × m ম্যাট্রিক্স a আর b-এর প্রতিটিতে ১ থেকে n·m পর্যন্ত প্রতিটি সংখ্যা ঠিক একবার। a-এর যেকোনো দুটি সারি বা দুটি কলাম যতবার খুশি বদলানো যায়। a কি b হতে পারে?',
  ),
  input: L('t test cases; each has n m, matrix a, matrix b.', 't-টি টেস্ট কেস; প্রতিটিতে n m, ম্যাট্রিক্স a, ম্যাট্রিক্স b।'),
  output: L('YES or NO per test.', 'প্রতি টেস্টে YES বা NO।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('sum of n·m ≤ 2·10⁵', 'n·m-এর যোগফল ≤ ২·১০⁵')] },
  samples: [
    { input: '2\n2 2\n1 2\n3 4\n4 3\n2 1\n2 2\n1 2\n3 4\n4 2\n3 1', output: 'YES\nNO', explain: L('First: swap rows, then columns. Second: 1 and 2 share a row in a but not in b.', 'প্রথম: সারি বদল, তারপর কলাম। দ্বিতীয়: a-তে ১ আর ২ একই সারিতে, b-তে নয়।') },
  ],
  observation: L(
    'Record for every value its row and column in a and in b. a can become b iff the map “row in a → row in b” is consistent (each row of a always goes to the same row of b) and so is the map for columns. Consistency makes both maps bijections, and then every value lands in the right cell.',
    'প্রতিটি মানের a আর b-তে সারি ও কলাম লিখে রাখুন। a, b হতে পারে যদি ও কেবল যদি “a-এর সারি → b-এর সারি” ম্যাপ সামঞ্জস্যপূর্ণ হয় (a-এর প্রতিটি সারি সবসময় b-এর একই সারিতে যায়) আর কলামের ম্যাপও তা-ই। সামঞ্জস্য দুটি ম্যাপকেই এক-এক করে, আর তখন প্রতিটি মান ঠিক ঘরে পৌঁছায়।',
  ),
  approach: [
    L('posA[v] = (row, col) in a, posB[v] in b.', 'posA[v] = a-তে (সারি, কলাম), posB[v] b-তে।'),
    L('For each v: rowMap[ra] must equal rb whenever set; colMap[ca] must equal cb.', 'প্রতিটি v-তে: rowMap[ra] সেট থাকলে rb-এর সমান হতে হবে; colMap[ca] cb-এর সমান।'),
  ],
  walkthrough: {
    input: 'a = [[1,2],[3,4]], b = [[4,3],[2,1]]',
    steps: [
      { state: '1: row 0 → 1, col 0 → 1; 2: row 0 → 1, col 1 → 0', text: L('Consistent so far.', 'এ পর্যন্ত সামঞ্জস্যপূর্ণ।') },
      { state: '3, 4 agree as well', text: L('YES.', 'YES।') },
    ],
  },
  complexity: { time: 'O(n·m)', space: 'O(n·m)', why: L('Each value is looked at once.', 'প্রতিটি মান একবার দেখা হয়।') },
  solutions: [
    {
      id: 'maps',
      kind: 'optimal',
      title: L('Consistent row and column maps', 'সামঞ্জস্যপূর্ণ সারি আর কলাম ম্যাপ'),
      idea: L('Every value must agree on where its row and its column go.', 'প্রতিটি মানকে তার সারি আর কলাম কোথায় যায় তাতে একমত হতে হবে।'),
      explain: [
        L(
          'Swaps realise any pair of permutations (π on rows, σ on columns), and the result is b exactly when b[π(r)][σ(c)] = a[r][c] for all cells. Reading π and σ off the values and checking consistency is that test, done in one pass.',
          'বদলগুলো যেকোনো জোড়া বিন্যাস (সারিতে π, কলামে σ) তৈরি করতে পারে, আর ফল ঠিক তখনই b যখন সব ঘরে b[π(r)][σ(c)] = a[r][c]। মান থেকে π আর σ পড়ে সামঞ্জস্য যাচাই সেই পরীক্ষাই, এক পাসে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        int N = n * m;
        vector<int> ra(N + 1), ca(N + 1);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) { int v; scanf("%d", &v); ra[v] = i, ca[v] = j; }
        vector<int> rowMap(n, -1), colMap(m, -1);
        bool ok = true;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                int v;
                scanf("%d", &v);
                if (rowMap[ra[v]] == -1) rowMap[ra[v]] = i;
                else if (rowMap[ra[v]] != i) ok = false;
                if (colMap[ca[v]] == -1) colMap[ca[v]] = j;
                else if (colMap[ca[v]] != j) ok = false;
            }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n·m)',
      space: 'O(n·m)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
    {
      id: 'sorted-lines',
      kind: 'method',
      title: L('Compare sorted rows and sorted columns', 'সাজানো সারি আর সাজানো কলাম তুলনা'),
      idea: L('The multiset of sorted rows of a must equal that of b, and the same for columns.', 'a-এর সাজানো সারিগুলোর বহুসেট b-এর সমান হতে হবে, কলামেও তা-ই।'),
      explain: [
        L(
          'Each row, sorted, is the row’s value set. If the row sets of a and b coincide and so do the column sets, value v sits in row π(r) and column σ(c) of b, so at their intersection. An invariant check written with plain sorting.',
          'প্রতিটি সারি, সাজালে, সেই সারির মানের সেট। a আর b-এর সারি-সেট আর কলাম-সেট মিললে মান v b-এর সারি π(r) আর কলাম σ(c)-তে, তাই তাদের ছেদে। সাধারণ সাজানো দিয়ে লেখা অপরিবর্তনীয় যাচাই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> lines(const vector<vector<int>>& g, bool byRow) {
    int n = g.size(), m = g[0].size();
    vector<vector<int>> out;
    if (byRow) out = g;
    else {
        out.assign(m, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) out[j][i] = g[i][j];
    }
    for (auto& l : out) sort(l.begin(), l.end());
    sort(out.begin(), out.end());
    return out;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<int>> a(n, vector<int>(m)), b(n, vector<int>(m));
        for (auto& r : a) for (auto& x : r) scanf("%d", &x);
        for (auto& r : b) for (auto& x : r) scanf("%d", &x);
        bool ok = lines(a, true) == lines(b, true) && lines(a, false) == lines(b, false);
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n·m · log(n·m))',
      space: 'O(n·m)',
      accepted: true,
      toolkit: ['sort', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every row and column permutation', 'প্রতিটি সারি আর কলাম বিন্যাস চেষ্টা'),
      idea: L('next_permutation over rows and columns, compare with b.', 'সারি আর কলামের ওপর next_permutation, b-এর সঙ্গে তুলনা।'),
      explain: [L('n!·m! checks: tiny matrices only.', 'n!·m! যাচাই: শুধু ক্ষুদ্র ম্যাট্রিক্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<vector<int>> a(n, vector<int>(m)), b(n, vector<int>(m));
        for (auto& r : a) for (auto& x : r) cin >> x;
        for (auto& r : b) for (auto& x : r) cin >> x;
        vector<int> p(n), q(m);
        iota(p.begin(), p.end(), 0);
        bool ok = false;
        do {
            iota(q.begin(), q.end(), 0);
            do {
                bool same = true;
                for (int i = 0; i < n && same; i++)
                    for (int j = 0; j < m && same; j++) same = a[p[i]][q[j]] == b[i][j];
                ok |= same;
            } while (!ok && next_permutation(q.begin(), q.end()));
        } while (!ok && next_permutation(p.begin(), p.end()));
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n!·m!·n·m)',
      space: 'O(n·m)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '2\n2 2\n1 2\n3 4\n4 3\n2 1\n2 2\n1 2\n3 4\n4 2\n3 1', output: 'YES\nNO', source: 'sample', note: sample(1) },
    { input: '1\n1 3\n1 2 3\n3 1 2', output: 'YES', source: 'own', note: L('A single row: any column order works.', 'একটিমাত্র সারি: যেকোনো কলাম ক্রম চলে।') },
  ],
  pitfalls: [
    L('Checking only rows or only columns.', 'শুধু সারি বা শুধু কলাম যাচাই।'),
    L('Comparing unsorted rows: the same row may appear with its columns permuted.', 'না সাজিয়ে সারি তুলনা: একই সারি কলাম-বিন্যাসসহ আসতে পারে।'),
  ],
  related: [
    { id: '1536C', name: 'Diluc and Kaeya', why: L('Invariants turned into keys.', 'অপরিবর্তনীয়কে কী-তে বদলানো।') },
    { id: '1538E', name: 'Funny Substrings', why: L('Another “matrices”-tagged implementation task.', 'আরেকটি “ম্যাট্রিক্স” ট্যাগের ইমপ্লিমেন্টেশন কাজ।') },
  ],
  toolkit: ['vector', 'sort'],
};

// ───────────────────────────────────────────── 718C
export const p718C: ProblemEntry = {
  id: '718C',
  contestId: 718,
  index: 'C',
  name: 'Sasha and Array',
  rating: 2300,
  tags: ['data-structures', 'math', 'matrices'],
  why: L(
    'Adding x to every index shifts Fibonacci numbers by multiplying the pair (F(a), F(a−1)) with Qˣ. Because matrix multiplication is linear, a lazy segment tree can push the whole matrix down: lazy propagation with matrices.',
    'প্রতিটি সূচকে x যোগ করলে জোড়া (F(a), F(a−১))-কে Qˣ দিয়ে গুণ করে ফিবোনাচি সংখ্যা সরে। ম্যাট্রিক্স গুণ রৈখিক বলে একটি লেজি সেগমেন্ট ট্রি পুরো ম্যাট্রিক্স নিচে পাঠাতে পারে: ম্যাট্রিক্সসহ লেজি প্রোপাগেশন।',
  ),
  statement: L(
    'An array a₁ … aₙ supports two queries: “1 l r x” adds x to every aᵢ with l ≤ i ≤ r; “2 l r” asks for f(aₗ) + … + f(aᵣ) modulo 10⁹ + 7, where f is the Fibonacci sequence with f(1) = f(2) = 1.',
    'একটি অ্যারে a₁ … aₙ দুটি কোয়েরি সমর্থন করে: “১ l r x” l ≤ i ≤ r-এর প্রতিটি aᵢ-তে x যোগ করে; “২ l r” f(aₗ) + … + f(aᵣ) ১০⁹ + ৭ মডুলো জানতে চায়, যেখানে f হলো f(১) = f(২) = ১ ফিবোনাচি অনুক্রম।',
  ),
  input: L('n m, the array, then m queries.', 'n m, অ্যারে, তারপর m-টি কোয়েরি।'),
  output: L('The answer to every query of type 2.', 'টাইপ ২-এর প্রতিটি কোয়েরির উত্তর।'),
  limits: { timeSec: 5, memoryMb: 256, notes: [L('n, m ≤ 10⁵, aᵢ, x ≤ 10⁹', 'n, m ≤ ১০⁵, aᵢ, x ≤ ১০⁹')] },
  samples: [
    { input: '5 4\n1 1 2 1 1\n2 1 5\n1 2 4 2\n2 2 4\n2 1 5', output: '5\n7\n9', explain: L('After the update the array is 1 3 4 3 1: f-values 1, 2, 3, 2, 1.', 'আপডেটের পর অ্যারে ১ ৩ ৪ ৩ ১: f-মান ১, ২, ৩, ২, ১।') },
  ],
  observation: L(
    'With Q = [[1,1],[1,0]], (f(a + x), f(a + x − 1)) = Qˣ · (f(a), f(a − 1)). Multiplication by a fixed matrix distributes over sums, so a segment tree node can store the sum of the pairs of its range, and a range update multiplies that sum by Qˣ and stores Qˣ as a lazy tag (tags compose by matrix multiplication).',
    'Q = [[১,১],[১,০]] হলে (f(a + x), f(a + x − ১)) = Qˣ · (f(a), f(a − ১))। নির্দিষ্ট ম্যাট্রিক্স দিয়ে গুণ যোগফলের ওপর বণ্টিত হয়, তাই সেগমেন্ট ট্রির নোড তার পরিসরের জোড়াগুলোর যোগফল রাখতে পারে, আর পরিসর-আপডেট সেই যোগফলকে Qˣ দিয়ে গুণ করে Qˣ-কে লেজি ট্যাগ হিসেবে রাখে (ট্যাগ ম্যাট্রিক্স গুণে মেশে)।',
  ),
  approach: [
    L('Leaf i stores (f(aᵢ), f(aᵢ − 1)), computed with a matrix power.', 'পাতা i রাখে (f(aᵢ), f(aᵢ − ১)), ম্যাট্রিক্স ঘাতে হিসাব।'),
    L('Update: compute Qˣ once, apply it to the covered nodes lazily.', 'আপডেট: একবার Qˣ বের করে আচ্ছাদিত নোডে লেজিভাবে প্রয়োগ।'),
    L('Query: sum of the first components.', 'কোয়েরি: প্রথম উপাংশগুলোর যোগফল।'),
  ],
  walkthrough: {
    input: 'add 2 on [2, 4] of 1 1 2 1 1',
    steps: [
      { state: 'Q² = [[2,1],[1,1]]', text: L('Applied lazily to the nodes covering [2, 4].', '[২, ৪] ঢাকা নোডে লেজিভাবে প্রয়োগ।') },
      { state: 'f-values on [2,4]: 2 + 3 + 2 = 7', text: L('Second query.', 'দ্বিতীয় কোয়েরি।') },
    ],
  },
  complexity: { time: 'O((n + m) · 8 · log n + m log x)', space: 'O(n)', why: L('2 × 2 matrix work per visited node.', 'প্রতিটি দেখা নোডে ২ × ২ ম্যাট্রিক্সের কাজ।') },
  solutions: [
    {
      id: 'segtree',
      kind: 'optimal',
      title: L('Lazy segment tree of Fibonacci pairs', 'ফিবোনাচি জোড়ার লেজি সেগমেন্ট ট্রি'),
      idea: L('Node = Σ (f(a), f(a−1)); lazy = pending matrix.', 'নোড = Σ (f(a), f(a−১)); লেজি = অপেক্ষমাণ ম্যাট্রিক্স।'),
      explain: [
        L(
          'Lazy propagation works for any update that is a linear map on the stored summary. Here the identity matrix means “no pending update”; pushing a tag multiplies the children’s sums and composes with their tags.',
          'সংরক্ষিত সারাংশের ওপর যেকোনো রৈখিক ম্যাপের আপডেটে লেজি প্রোপাগেশন চলে। এখানে একক ম্যাট্রিক্স মানে “অপেক্ষমাণ আপডেট নেই”; ট্যাগ পাঠালে সন্তানদের যোগফল গুণ হয় আর তাদের ট্যাগের সঙ্গে মেশে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll MOD = 1e9 + 7;
struct M { ll a, b, c, d; };  // [[a, b], [c, d]]
const M I = {1, 0, 0, 1};
M mul(const M& x, const M& y) {
    return {(x.a * y.a + x.b * y.c) % MOD, (x.a * y.b + x.b * y.d) % MOD,
            (x.c * y.a + x.d * y.c) % MOD, (x.c * y.b + x.d * y.d) % MOD};
}
M qpow(ll e) {
    M r = I, q = {1, 1, 1, 0};
    for (; e; e >>= 1, q = mul(q, q))
        if (e & 1) r = mul(r, q);
    return r;
}
bool isI(const M& m) { return m.a == 1 && m.b == 0 && m.c == 0 && m.d == 1; }

int n;
vector<ll> s0, s1;  // sums of f(a) and f(a - 1)
vector<M> lz;

void applyTag(int v, const M& m) {
    ll x = (m.a * s0[v] + m.b * s1[v]) % MOD, y = (m.c * s0[v] + m.d * s1[v]) % MOD;
    s0[v] = x, s1[v] = y;
    lz[v] = mul(m, lz[v]);
}
void push(int v) {
    if (!isI(lz[v])) { applyTag(2 * v, lz[v]); applyTag(2 * v + 1, lz[v]); lz[v] = I; }
}
void update(int v, int l, int r, int ql, int qr, const M& m) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { applyTag(v, m); return; }
    push(v);
    int mid = (l + r) / 2;
    update(2 * v, l, mid, ql, qr, m);
    update(2 * v + 1, mid + 1, r, ql, qr, m);
    s0[v] = (s0[2 * v] + s0[2 * v + 1]) % MOD;
    s1[v] = (s1[2 * v] + s1[2 * v + 1]) % MOD;
}
ll query(int v, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return s0[v];
    push(v);
    int mid = (l + r) / 2;
    return (query(2 * v, l, mid, ql, qr) + query(2 * v + 1, mid + 1, r, ql, qr)) % MOD;
}
void build(int v, int l, int r, const vector<ll>& a) {
    lz[v] = I;
    if (l == r) {
        M p = qpow(a[l] - 1);   // Q^(a-1) = [[f(a), f(a-1)], ...]
        s0[v] = p.a, s1[v] = p.b;
        return;
    }
    int mid = (l + r) / 2;
    build(2 * v, l, mid, a);
    build(2 * v + 1, mid + 1, r, a);
    s0[v] = (s0[2 * v] + s0[2 * v + 1]) % MOD;
    s1[v] = (s1[2 * v] + s1[2 * v + 1]) % MOD;
}

int main() {
    int m;
    scanf("%d %d", &n, &m);
    vector<ll> a(n);
    for (auto& x : a) scanf("%lld", &x);
    s0.assign(4 * n, 0), s1.assign(4 * n, 0), lz.assign(4 * n, I);
    build(1, 0, n - 1, a);
    while (m--) {
        int type, l, r;
        scanf("%d %d %d", &type, &l, &r);
        if (type == 1) {
            ll x;
            scanf("%lld", &x);
            update(1, 0, n - 1, l - 1, r - 1, qpow(x));
        } else {
            printf("%lld\n", query(1, 0, n - 1, l - 1, r - 1));
        }
    }
    return 0;
}
`,
      time: 'O((n + m) log n + m log x)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-arith', 'functions', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Keep the values, compute f on demand', 'মান রেখে দরকার হলে f হিসাব'),
      idea: L('Update values directly; for a query compute each f(aᵢ) by matrix power.', 'সরাসরি মান আপডেট; কোয়েরিতে প্রতিটি f(aᵢ) ম্যাট্রিক্স ঘাতে।'),
      explain: [L('O(n log a) per query: correct, far too slow for the full limits.', 'প্রতি কোয়েরিতে O(n log a): সঠিক, পূর্ণ সীমায় অনেক ধীর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll MOD = 1e9 + 7;

ll fib(ll n) {  // fast doubling: returns F(n)
    ll a = 0, b = 1;  // F(0), F(1)
    for (int bit = 62; bit >= 0; bit--) {
        ll c = a * ((2 * b - a + MOD) % MOD) % MOD, d = (a * a + b * b) % MOD;  // F(2k), F(2k+1)
        a = c, b = d;
        if (n >> bit & 1) { ll t = (a + b) % MOD; a = b, b = t; }
    }
    return a;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<ll> a(n);
    for (auto& x : a) cin >> x;
    while (m--) {
        int type, l, r;
        cin >> type >> l >> r;
        if (type == 1) {
            ll x;
            cin >> x;
            for (int i = l - 1; i < r; i++) a[i] += x;
        } else {
            ll s = 0;
            for (int i = l - 1; i < r; i++) s = (s + fib(a[i])) % MOD;
            cout << s << "\n";
        }
    }
    return 0;
}
`,
      time: 'O(m · n · log a)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['mod-arith'],
    },
  ],
  tests: [
    { input: '5 4\n1 1 2 1 1\n2 1 5\n1 2 4 2\n2 2 4\n2 1 5', output: '5\n7\n9', source: 'sample', note: sample(1) },
    { input: '1 2\n10\n1 1 1 5\n2 1 1', output: '610', source: 'own', note: L('f(15) = 610.', 'f(১৫) = ৬১০।') },
  ],
  pitfalls: [
    L('Storing only f(a): to shift by x you also need f(a − 1).', 'শুধু f(a) রাখা: x সরাতে f(a − ১)-ও লাগে।'),
    L('Recomputing Qˣ in every node instead of once per update.', 'প্রতি আপডেটে একবারের বদলে প্রতিটি নোডে Qˣ আবার হিসাব।'),
  ],
  related: [
    { id: '551D', name: 'GukiZ and Binary Operations', why: L('Fibonacci with a 2 × 2 matrix.', '২ × ২ ম্যাট্রিক্সে ফিবোনাচি।') },
    { id: '339D', name: 'Xenia and Bit Operations', why: L('Segment trees with custom combine.', 'নিজস্ব সংযোগসহ সেগমেন্ট ট্রি।') },
  ],
  toolkit: ['mod-arith'],
};
