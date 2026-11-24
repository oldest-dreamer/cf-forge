import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');

// ───────────────────────────────────────────── 717D
export const p717D: ProblemEntry = {
  id: '717D',
  contestId: 717,
  index: 'D',
  name: 'Dexterina’s Lab',
  rating: 1900,
  tags: ['games', 'matrices', 'probabilities'],
  why: L(
    'Nim says the first player wins iff the xor of the heaps is non-zero. The distribution of a xor of n independent heaps is an n-fold “xor-convolution” power, computed by repeated squaring or by the Walsh–Hadamard transform.',
    'নিম বলে প্রথম খেলোয়াড় জেতে যদি ও কেবল যদি স্তূপগুলোর xor অশূন্য। n-টি স্বাধীন স্তূপের xor-এর বণ্টন একটি n-গুণ “xor-কনভলিউশন” ঘাত, বারবার বর্গ বা ওয়ালশ–হাদামার্ড রূপান্তরে হিসাব।',
  ),
  statement: L(
    'A Nim game has n heaps; the size of each heap is chosen independently: it is i with probability P(i) for 0 ≤ i ≤ x. Find the probability that the first player wins with perfect play.',
    'একটি নিম খেলায় n-টি স্তূপ; প্রতিটি স্তূপের আকার স্বাধীনভাবে বাছা হয়: ০ ≤ i ≤ x-এর জন্য P(i) সম্ভাবনায় i। নিখুঁত খেলায় প্রথম খেলোয়াড়ের জেতার সম্ভাবনা বের করুন।',
  ),
  input: L('n x, then P(0) … P(x).', 'n x, তারপর P(০) … P(x)।'),
  output: L('The probability.', 'সম্ভাবনা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 10⁹, x ≤ 100', 'n ≤ ১০⁹, x ≤ ১০০'), realAnswer] },
  samples: [
    { input: '2 2\n0.500000 0.250000 0.250000', output: '0.62500000', explain: L('The xor is 0 when both heaps are equal: 0.25 + 0.0625 + 0.0625 = 0.375.', 'দুই স্তূপ সমান হলে xor ০: ০.২৫ + ০.০৬২৫ + ০.০৬২৫ = ০.৩৭৫।') },
  ],
  observation: L(
    'Heap sizes are below 128, so every xor is below 128. If D is the distribution of one heap, the distribution of the xor of two independent heaps is D ⊛ D with (A ⊛ B)[k] = Σ A[i]·B[j] over i xor j = k. The answer is 1 − (D ⊛ … ⊛ D)[0] with n factors, and ⊛ is associative, so square-and-multiply needs only O(log n) convolutions.',
    'স্তূপের আকার ১২৮-এর নিচে, তাই প্রতিটি xor ১২৮-এর নিচে। একটি স্তূপের বণ্টন D হলে দুটি স্বাধীন স্তূপের xor-এর বণ্টন D ⊛ D, যেখানে i xor j = k-এর ওপর (A ⊛ B)[k] = Σ A[i]·B[j]। উত্তর ১ − (n গুণ D ⊛ … ⊛ D)[০], আর ⊛ সংযোজী, তাই বর্গ-ও-গুণে শুধু O(log n) কনভলিউশন লাগে।',
  ),
  approach: [
    L('Pad D to 128 entries.', 'D-কে ১২৮টি ঘরে প্রসারিত।'),
    L('Compute D^⊛n by binary exponentiation (each step 128² operations).', 'বাইনারি ঘাতে D^⊛n (প্রতি ধাপে ১২৮² ক্রিয়া)।'),
    L('Print 1 − result[0].', '১ − ফল[০] ছাপা।'),
  ],
  walkthrough: {
    input: 'n = 2, D = (0.5, 0.25, 0.25)',
    steps: [
      { state: '(D ⊛ D)[0] = 0.25 + 0.0625 + 0.0625 = 0.375', text: L('Pairs (0,0), (1,1), (2,2).', 'জোড়া (০,০), (১,১), (২,২)।') },
      { state: '1 − 0.375 = 0.625', text: L('First player wins.', 'প্রথম খেলোয়াড় জেতে।') },
    ],
  },
  complexity: { time: 'O(128² · log n)', space: 'O(128)', why: L('About 60 xor-convolutions of size 128.', '১২৮ আকারের প্রায় ৬০টি xor-কনভলিউশন।') },
  solutions: [
    {
      id: 'square',
      kind: 'optimal',
      title: L('Binary exponentiation of xor-convolution', 'xor-কনভলিউশনের বাইনারি ঘাত'),
      idea: L('Same as fast power, with ⊛ instead of ×.', 'দ্রুত ঘাতের মতোই, × এর বদলে ⊛।'),
      explain: [
        L(
          'Fast exponentiation works for any associative operation with an identity. Here the identity is the distribution “always 0” (xor with 0 changes nothing). The 128 × 128 convolution matrix view is where the matrices tag comes from.',
          'দ্রুত ঘাত একক উপাদানসহ যেকোনো সংযোজী ক্রিয়ায় চলে। এখানে একক হলো “সবসময় ০” বণ্টন (০-এর সঙ্গে xor কিছু বদলায় না)। ১২৮ × ১২৮ কনভলিউশন ম্যাট্রিক্সের দৃষ্টিভঙ্গি থেকেই ম্যাট্রিক্স ট্যাগ এসেছে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef array<double, 128> Dist;

Dist conv(const Dist& a, const Dist& b) {
    Dist c{};
    for (int i = 0; i < 128; i++)
        for (int j = 0; j < 128; j++) c[i ^ j] += a[i] * b[j];
    return c;
}

int main() {
    long long n;
    int x;
    scanf("%lld %d", &n, &x);
    Dist d{}, r{};
    for (int i = 0; i <= x; i++) scanf("%lf", &d[i]);
    r[0] = 1;  // identity: xor of zero heaps is 0
    for (; n; n >>= 1, d = conv(d, d))
        if (n & 1) r = conv(r, d);
    printf("%.10f\n", 1 - r[0]);
    return 0;
}
`,
      time: 'O(128² log n)',
      space: 'O(128)',
      accepted: true,
      toolkit: ['setprecision', 'bit-shift'],
    },
    {
      id: 'walsh',
      kind: 'method',
      title: L('Walsh–Hadamard transform', 'ওয়ালশ–হাদামার্ড রূপান্তর'),
      idea: L('The transform turns ⊛ into pointwise multiplication: transform, raise each value to the n-th power, transform back.', 'রূপান্তর ⊛-কে বিন্দুভিত্তিক গুণে বদলায়: রূপান্তর, প্রতিটি মানকে n-তম ঘাতে, ফেরত রূপান্তর।'),
      explain: [
        L(
          'This is the xor analogue of using the FFT for ordinary convolution. 128 values each raised to the power n: O(128 log 128 + 128 log n).',
          'এটি সাধারণ কনভলিউশনে FFT ব্যবহারের xor-রূপ। ১২৮টি মানের প্রতিটি n-তম ঘাতে: O(১২৮ log ১২৮ + ১২৮ log n)।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

void fwht(vector<double>& a, bool inv) {
    int n = a.size();
    for (int len = 1; len < n; len <<= 1)
        for (int i = 0; i < n; i += 2 * len)
            for (int j = i; j < i + len; j++) {
                double u = a[j], v = a[j + len];
                a[j] = u + v, a[j + len] = u - v;
            }
    if (inv) for (auto& v : a) v /= n;
}

double ipow(double b, long long e) {
    double r = 1;
    for (; e; e >>= 1, b *= b)
        if (e & 1) r *= b;
    return r;
}

int main() {
    long long n;
    int x;
    cin >> n >> x;
    vector<double> d(128, 0);
    for (int i = 0; i <= x; i++) cin >> d[i];
    fwht(d, false);
    for (auto& v : d) v = ipow(v, n);
    fwht(d, true);
    printf("%.10f\n", 1 - d[0]);
    return 0;
}
`,
      time: 'O(128 log n)',
      space: 'O(128)',
      accepted: true,
      toolkit: ['setprecision', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Add heaps one at a time', 'একবারে একটি স্তূপ যোগ'),
      idea: L('n rounds of the xor DP.', 'xor DP-এর n রাউন্ড।'),
      explain: [L('O(n · 128 · x): the direct DP, for small n.', 'O(n · ১২৮ · x): সরাসরি DP, ছোট n-এর জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    int x;
    cin >> n >> x;
    vector<double> p(x + 1);
    for (auto& v : p) cin >> v;
    if (n > 3000) { cout << "\n"; return 0; }
    vector<double> cur(128, 0);
    cur[0] = 1;
    for (long long h = 0; h < n; h++) {
        vector<double> nx(128, 0);
        for (int s = 0; s < 128; s++)
            for (int i = 0; i <= x; i++) nx[s ^ i] += cur[s] * p[i];
        cur = nx;
    }
    printf("%.10f\n", 1 - cur[0]);
    return 0;
}
`,
      time: 'O(n · 128 · x)',
      space: 'O(128)',
      accepted: false,
      toolkit: ['setprecision'],
    },
  ],
  tests: [
    { input: '2 2\n0.500000 0.250000 0.250000', output: '0.62500000', source: 'sample', note: sample(1) },
    { input: '1 1\n0.300000 0.700000', output: '0.7', source: 'own', note: L('One heap: win iff it is non-empty.', 'একটি স্তূপ: খালি না হলেই জয়।') },
  ],
  pitfalls: [
    L('Simulating n heaps one by one for n = 10⁹.', 'n = ১০⁹-এর জন্য একে একে n-টি স্তূপ সিমুলেট।'),
    L('Using an array of size x + 1 for xors: the xor can exceed x (e.g. 1 xor 2 = 3).', 'xor-এর জন্য x + ১ আকারের অ্যারে: xor x ছাড়াতে পারে (যেমন ১ xor ২ = ৩)।'),
  ],
  related: [
    { id: '1182E', name: 'Product Oriented Recurrence', why: L('Fast exponentiation of a non-numeric object.', 'অসাংখ্যিক বস্তুর দ্রুত ঘাত।') },
    { id: '993E', name: 'Nikita and Order Statistics', why: L('Transforms that turn convolutions into products.', 'কনভলিউশনকে গুণে বদলানো রূপান্তর।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 1151F
export const p1151F: ProblemEntry = {
  id: '1151F',
  contestId: 1151,
  index: 'F',
  name: 'Sonya and Informatics',
  rating: 2300,
  tags: ['combinatorics', 'dp', 'matrices', 'probabilities'],
  why: L(
    'A random process on 2ⁿ arrays collapses to a Markov chain on one number: how many zeros already sit in the zero zone. Then k steps of the chain are a matrix power with modular probabilities.',
    '২ⁿ অ্যারের ওপর একটি এলোমেলো প্রক্রিয়া একটি সংখ্যার মার্কভ চেইনে নেমে আসে: কতগুলো শূন্য ইতিমধ্যে শূন্য-অঞ্চলে বসে আছে। তারপর চেইনের k ধাপ হলো মডুলার সম্ভাবনাসহ একটি ম্যাট্রিক্স ঘাত।',
  ),
  statement: L(
    'An array of n zeros and ones is given. k times, a pair of positions i < j is chosen uniformly at random among all pairs and the two elements are swapped. Find the probability that the array is sorted (non-decreasing) at the end, as P · Q⁻¹ modulo 10⁹ + 7.',
    'n-টি শূন্য আর একের একটি অ্যারে দেওয়া। k বার সব জোড়ার মধ্যে সমভাবে এলোমেলো একটি জোড়া অবস্থান i < j বেছে উপাদান দুটি বদলানো হয়। শেষে অ্যারে সাজানো (অহ্রাসমান) থাকার সম্ভাবনা P · Q⁻¹ হিসেবে ১০⁹ + ৭ মডুলো বের করুন।',
  ),
  input: L('n k, then the array.', 'n k, তারপর অ্যারে।'),
  output: L('The probability modulo 10⁹ + 7.', 'সম্ভাবনা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 100, k ≤ 10⁹', '২ ≤ n ≤ ১০০, k ≤ ১০⁹')] },
  samples: [
    { input: '3 2\n0 1 0', output: '333333336', explain: L('Probability 1/3.', 'সম্ভাবনা ১/৩।') },
    { input: '5 1\n1 1 1 0 0', output: '0', explain: L('One swap can fix at most one misplaced pair.', 'একটি বদল বড়জোর একটি ভুল জোড়া ঠিক করতে পারে।') },
    { input: '6 4\n1 0 0 1 1 0', output: '968493834', explain: L('Computed by the chain.', 'চেইন দিয়ে হিসাব।') },
  ],
  observation: L(
    'Let z be the number of zeros. The array is sorted iff the first z positions hold only zeros. Let i be the number of zeros among the first z positions. A swap raises i only by exchanging a 1 in the zone with a 0 outside: (z − i)² pairs; it lowers i by exchanging a 0 in the zone with a 1 outside: i · (n − 2z + i) pairs; otherwise i stays. So i alone is a Markov chain.',
    'z হোক শূন্যের সংখ্যা। অ্যারে সাজানো যদি ও কেবল যদি প্রথম z অবস্থানে শুধু শূন্য থাকে। i হোক প্রথম z অবস্থানের শূন্যের সংখ্যা। একটি বদল i বাড়ায় শুধু অঞ্চলের একটি ১-কে বাইরের একটি ০-এর সঙ্গে বদলে: (z − i)² জোড়া; কমায় অঞ্চলের একটি ০-কে বাইরের একটি ১-এর সঙ্গে বদলে: i · (n − ২z + i) জোড়া; নইলে i একই থাকে। তাই শুধু i-ই একটি মার্কভ চেইন।',
  ),
  approach: [
    L('Build the (z + 1) × (z + 1) transition matrix with probabilities (count / C(n, 2)) mod p.', 'সম্ভাবনা (গণনা / C(n, ২)) mod p দিয়ে (z + ১) × (z + ১) রূপান্তর ম্যাট্রিক্স বানানো।'),
    L('Raise it to the k-th power; answer = probability of going from the initial i to i = z.', 'k-তম ঘাতে তোলা; উত্তর = প্রাথমিক i থেকে i = z-এ যাওয়ার সম্ভাবনা।'),
  ],
  walkthrough: {
    input: '0 1 0, k = 2',
    steps: [
      { state: 'z = 2, initial i = 1 (first two cells: 0 1)', text: L('Out of C(3,2) = 3 pairs, 1 fixes it.', 'C(৩,২) = ৩ জোড়ার ১টি ঠিক করে।') },
      { state: 'P(sorted after 2 swaps) = 1/3', text: L('Combining both steps of the chain.', 'চেইনের দুই ধাপ মিলিয়ে।') },
    ],
  },
  complexity: { time: 'O(z³ log k)', space: 'O(z²)', why: L('A matrix of size at most 51.', 'বড়জোর ৫১ আকারের ম্যাট্রিক্স।') },
  solutions: [
    {
      id: 'chain',
      kind: 'optimal',
      title: L('Markov chain on “zeros in place”', '“জায়গামতো শূন্য”-এর ওপর মার্কভ চেইন'),
      idea: L('Transition counts (z − i)², i(n − 2z + i), rest; matrix power k.', 'রূপান্তর গণনা (z − i)², i(n − ২z + i), বাকিটা; ম্যাট্রিক্স ঘাত k।'),
      explain: [
        L(
          'Probabilities modulo a prime behave exactly like real probabilities under + and ×, so the chain can be powered in modular arithmetic and the final number is already P · Q⁻¹.',
          'মৌলিক সংখ্যার মডুলোতে সম্ভাবনা + আর ×-এর অধীনে আসল সম্ভাবনার মতোই আচরণ করে, তাই চেইনকে মডুলার গাণিতে ঘাতে তোলা যায় আর শেষ সংখ্যাটি আগে থেকেই P · Q⁻¹।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
typedef vector<vector<long long>> Mat;

long long power(long long b, long long e) {
    long long r = 1;
    for (b %= MOD; e; e >>= 1, b = b * b % MOD)
        if (e & 1) r = r * b % MOD;
    return r;
}
Mat mul(const Mat& a, const Mat& b) {
    int n = a.size();
    Mat c(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (!a[i][k]) continue;
            for (int j = 0; j < n; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}

int main() {
    long long n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& v : a) cin >> v;
    long long z = count(a.begin(), a.end(), 0), start = 0;
    for (int i = 0; i < z; i++) start += a[i] == 0;
    long long pairs = n * (n - 1) / 2, inv = power(pairs, MOD - 2);
    Mat T(z + 1, vector<long long>(z + 1, 0));
    for (long long i = 0; i <= z; i++) {
        if (n - 2 * z + i < 0) continue;            // impossible state
        long long up = (z - i) * (z - i), down = i * (n - 2 * z + i), stay = pairs - up - down;
        if (i < z) T[i][i + 1] = up % MOD * inv % MOD;
        if (i > 0) T[i][i - 1] = down % MOD * inv % MOD;
        T[i][i] = stay % MOD * inv % MOD;
    }
    Mat R(z + 1, vector<long long>(z + 1, 0));
    for (int i = 0; i <= z; i++) R[i][i] = 1;
    for (; k; k >>= 1, T = mul(T, T))
        if (k & 1) R = mul(R, T);
    cout << R[start][z] << "\n";
    return 0;
}
`,
      time: 'O(z³ log k)',
      space: 'O(z²)',
      accepted: true,
      toolkit: ['mod-pow', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Exact distribution over all arrays', 'সব অ্যারের ওপর নির্ভুল বণ্টন'),
      idea: L('Track the probability of every bit pattern through k random swaps.', 'k-টি এলোমেলো বদলের মধ্য দিয়ে প্রতিটি বিট-প্যাটার্নের সম্ভাবনা অনুসরণ।'),
      explain: [L('No reduction to i at all: 2ⁿ states and every pair, for tiny n and k. It confirms the chain’s transition counts.', 'i-তে কোনো সংকোচন নেই: ২ⁿ অবস্থা আর প্রতিটি জোড়া, ক্ষুদ্র n আর k-এর জন্য। এটি চেইনের রূপান্তর গণনা নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
long long power(long long b, long long e) {
    long long r = 1;
    for (b %= MOD; e; e >>= 1, b = b * b % MOD) if (e & 1) r = r * b % MOD;
    return r;
}

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& v : a) cin >> v;
    if (n > 8 || k > 8) { cout << "\n"; return 0; }
    int S = 1 << n, start = 0;
    for (int i = 0; i < n; i++) start |= a[i] << i;
    long long inv = power(n * (n - 1) / 2, MOD - 2);
    vector<long long> p(S, 0);
    p[start] = 1;
    for (int step = 0; step < k; step++) {
        vector<long long> q(S, 0);
        for (int s = 0; s < S; s++) {
            if (!p[s]) continue;
            for (int i = 0; i < n; i++)
                for (int j = i + 1; j < n; j++) {
                    int bi = s >> i & 1, bj = s >> j & 1;
                    int t = s & ~(1 << i) & ~(1 << j) | bj << i | bi << j;
                    q[t] = (q[t] + p[s] * inv) % MOD;
                }
        }
        p = q;
    }
    int z = count(a.begin(), a.end(), 0), sorted = 0;
    for (int i = z; i < n; i++) sorted |= 1 << i;
    cout << p[sorted] << "\n";
    return 0;
}
`,
      time: 'O(k · 2ⁿ · n²)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '3 2\n0 1 0', output: '333333336', source: 'sample', note: sample(1) },
    { input: '5 1\n1 1 1 0 0', output: '0', source: 'sample', note: sample(2) },
    { input: '6 4\n1 0 0 1 1 0', output: '968493834', source: 'sample', note: sample(3) },
    { input: '2 1\n0 1', output: '0', source: 'own', note: L('The only swap unsorts it.', 'একমাত্র বদলটিই এলোমেলো করে।') },
  ],
  pitfalls: [
    L('Including impossible states (more ones outside the zone than ones exist).', 'অসম্ভব অবস্থা ধরা (যত ১ আছে তার চেয়ে বেশি অঞ্চলের বাইরে)।'),
    L('Dividing by n² instead of C(n, 2).', 'C(n, ২)-এর বদলে n² দিয়ে ভাগ।'),
  ],
  related: [
    { id: '717D', name: 'Dexterina’s Lab', why: L('Probability distributions raised to a power.', 'ঘাতে তোলা সম্ভাবনা বণ্টন।') },
    { id: '1265E', name: 'Beautiful Mirrors', why: L('Modular probabilities.', 'মডুলার সম্ভাবনা।') },
  ],
  toolkit: ['mod-pow'],
};

// ───────────────────────────────────────────── 147B
export const p147B: ProblemEntry = {
  id: '147B',
  contestId: 147,
  index: 'B',
  name: 'Smile House',
  rating: 2500,
  tags: ['binary-search', 'graphs', 'matrices'],
  why: L(
    'Max-plus matrices: replace + by max and × by + and matrix powers give the best walks of a given length. Binary lifting over the powers then finds the shortest positive cycle.',
    'ম্যাক্স-প্লাস ম্যাট্রিক্স: + এর বদলে max আর × এর বদলে + দিলে ম্যাট্রিক্স ঘাত নির্দিষ্ট দৈর্ঘ্যের সেরা পথ দেয়। তারপর ঘাতগুলোর ওপর বাইনারি লিফটিং সবচেয়ে ছোট ধনাত্মক চক্র খুঁজে পায়।',
  ),
  statement: L(
    'A house has n rooms and m doors. A door between rooms i and j adds cᵢⱼ to your mood when you go from i to j and cⱼᵢ when you go back. Find the minimum number of rooms in a cycle (a closed walk, rooms may repeat) whose total mood change is positive, or 0 if there is none.',
    'একটি বাড়িতে n-টি ঘর আর m-টি দরজা। i আর j ঘরের মধ্যে দরজা দিয়ে i থেকে j-তে গেলে মেজাজে cᵢⱼ যোগ হয়, ফিরলে cⱼᵢ। ধনাত্মক মোট মেজাজ-পরিবর্তনের একটি চক্রে (বদ্ধ পথ, ঘর পুনরাবৃত্তি হতে পারে) ন্যূনতম কতটি ঘর লাগে বের করুন, না থাকলে ০।',
  ),
  input: L('n m, then m lines i j cᵢⱼ cⱼᵢ.', 'n m, তারপর m লাইনে i j cᵢⱼ cⱼᵢ।'),
  output: L('The minimum cycle length, or 0.', 'ন্যূনতম চক্র-দৈর্ঘ্য, বা ০।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n ≤ 300, |c| ≤ 10⁴', 'n ≤ ৩০০, |c| ≤ ১০⁴')] },
  samples: [
    { input: '4 4\n1 2 -10 3\n1 3 1 -10\n2 4 -10 -1\n3 4 0 -3', output: '4', explain: L('1 → 3 → 4 → 2 → 1: 1 + 0 − 1 + 3 = 3 > 0.', '১ → ৩ → ৪ → ২ → ১: ১ + ০ − ১ + ৩ = ৩ > ০।') },
  ],
  observation: L(
    'Add a 0-weight self-loop at every room; then the max-plus power Aᵗ gives the best walk with at most t steps, and “some positive cycle of length ≤ t exists” is monotone in t. If no positive cycle of length ≤ n exists, none exists at all (a positive closed walk contains a positive simple cycle). So binary-search t using the powers A, A², A⁴, … : greedily add 2ʲ while the diagonal stays non-positive.',
    'প্রতিটি ঘরে ০-ওজনের স্ব-লুপ যোগ করুন; তখন ম্যাক্স-প্লাস ঘাত Aᵗ বড়জোর t ধাপের সেরা পথ দেয়, আর “≤ t দৈর্ঘ্যের ধনাত্মক চক্র আছে” t-এ একমুখী। ≤ n দৈর্ঘ্যের ধনাত্মক চক্র না থাকলে কোনোটিই নেই (ধনাত্মক বদ্ধ পথে একটি ধনাত্মক সরল চক্র থাকে)। তাই A, A², A⁴, … দিয়ে t-এর বাইনারি সার্চ: কর্ণ অধনাত্মক থাকা পর্যন্ত লোভীভাবে ২ʲ যোগ।',
  ),
  approach: [
    L('P[0] = A (with zero diagonal), P[j] = P[j−1] ⊗ P[j−1].', 'P[০] = A (শূন্য কর্ণসহ), P[j] = P[j−১] ⊗ P[j−১]।'),
    L('cur = identity; for j from high to low: if cur ⊗ P[j] has no positive diagonal entry, take it and add 2ʲ.', 'cur = একক; j উঁচু থেকে নিচে: cur ⊗ P[j]-এ কোনো ধনাত্মক কর্ণ না থাকলে নিন আর ২ʲ যোগ করুন।'),
    L('Answer = taken + 1 if that is ≤ n, else 0.', 'উত্তর = নেওয়া + ১ যদি ≤ n, নইলে ০।'),
  ],
  walkthrough: {
    input: 'sample',
    steps: [
      { state: 'lengths 2 and 3: all cycles ≤ 0', text: L('The diagonal of A³ (at most 3 steps) is still 0.', 'A³-এর (বড়জোর ৩ ধাপ) কর্ণ এখনো ০।') },
      { state: 'length 4: cycle 1-3-4-2-1 has +3', text: L('Answer 4.', 'উত্তর ৪।') },
    ],
  },
  complexity: { time: 'O(n³ log n)', space: 'O(n² log n)', why: L('About 2 log n max-plus products.', 'প্রায় ২ log n ম্যাক্স-প্লাস গুণ।') },
  solutions: [
    {
      id: 'lifting',
      kind: 'optimal',
      title: L('Max-plus binary lifting', 'ম্যাক্স-প্লাস বাইনারি লিফটিং'),
      idea: L('Find the largest t with no positive cycle of length ≤ t; answer t + 1.', 'সবচেয়ে বড় t যাতে ≤ t দৈর্ঘ্যের ধনাত্মক চক্র নেই; উত্তর t + ১।'),
      explain: [
        L(
          'Binary lifting is binary search where the steps are precomputed powers. Each product is n³ with max and +; the inner loop over k is written row by row so it vectorises well.',
          'বাইনারি লিফটিং হলো এমন বাইনারি সার্চ যার ধাপগুলো আগে হিসাব করা ঘাত। প্রতিটি গুণ max আর + দিয়ে n³; k-এর ওপর ভেতরের লুপ সারি ধরে লেখা যাতে দ্রুত চলে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int NEG = -1000000000;
int n;
typedef vector<vector<int>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    Mat c(n, vector<int>(n, NEG));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (a[i][k] == NEG) continue;
            int aik = a[i][k];
            const vector<int>& bk = b[k];
            vector<int>& ci = c[i];
            for (int j = 0; j < n; j++)
                if (bk[j] != NEG && aik + bk[j] > ci[j]) ci[j] = aik + bk[j];
        }
    return c;
}
bool positive(const Mat& m) {
    for (int i = 0; i < n; i++) if (m[i][i] > 0) return true;
    return false;
}

int main() {
    int m;
    scanf("%d %d", &n, &m);
    Mat A(n, vector<int>(n, NEG));
    for (int i = 0; i < n; i++) A[i][i] = 0;  // "at most" t steps
    for (int e = 0; e < m; e++) {
        int i, j, cij, cji;
        scanf("%d %d %d %d", &i, &j, &cij, &cji);
        A[i - 1][j - 1] = max(A[i - 1][j - 1], cij);
        A[j - 1][i - 1] = max(A[j - 1][i - 1], cji);
    }
    int LOG = 0;
    while ((1 << LOG) < n) LOG++;            // 2^LOG >= n
    vector<Mat> P(LOG + 1);
    P[0] = A;
    for (int j = 1; j <= LOG; j++) P[j] = mul(P[j - 1], P[j - 1]);
    if (!positive(P[LOG])) { puts("0"); return 0; }  // no positive cycle of length <= n
    Mat cur(n, vector<int>(n, NEG));
    for (int i = 0; i < n; i++) cur[i][i] = 0;
    int taken = 0;
    for (int j = LOG - 1; j >= 0; j--) {
        Mat t = mul(cur, P[j]);
        if (!positive(t)) cur = t, taken += 1 << j;
    }
    printf("%d\n", taken + 1);
    return 0;
}
`,
      time: 'O(n³ log n)',
      space: 'O(n² log n)',
      accepted: true,
      toolkit: ['vector', 'bit-shift', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Grow the walk length one step at a time', 'পথের দৈর্ঘ্য একবারে এক ধাপ বাড়ানো'),
      idea: L('best[t][s][v] = best walk of exactly t steps from s to v; stop at the first t with best[t][s][s] > 0.', 'best[t][s][v] = s থেকে v-তে ঠিক t ধাপের সেরা পথ; প্রথম যে t-তে best[t][s][s] > ০ সেখানে থামা।'),
      explain: [L('O(n⁴) with exact lengths and no self-loops: a different formulation of the same question.', 'নির্দিষ্ট দৈর্ঘ্য আর স্ব-লুপ ছাড়া O(n⁴): একই প্রশ্নের ভিন্ন রূপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    const long long NEG = LLONG_MIN / 4;
    vector<vector<long long>> w(n, vector<long long>(n, NEG));
    for (int e = 0; e < m; e++) {
        int i, j;
        long long a, b;
        cin >> i >> j >> a >> b;
        w[i - 1][j - 1] = max(w[i - 1][j - 1], a);
        w[j - 1][i - 1] = max(w[j - 1][i - 1], b);
    }
    vector<vector<long long>> cur = w;  // exactly 1 step
    for (int t = 2; t <= n; t++) {
        vector<vector<long long>> nx(n, vector<long long>(n, NEG));
        for (int s = 0; s < n; s++)
            for (int u = 0; u < n; u++) {
                if (cur[s][u] == NEG) continue;
                for (int v = 0; v < n; v++)
                    if (w[u][v] != NEG) nx[s][v] = max(nx[s][v], cur[s][u] + w[u][v]);
            }
        cur = nx;
        for (int s = 0; s < n; s++)
            if (cur[s][s] > 0) { cout << t << "\n"; return 0; }
    }
    cout << 0 << "\n";
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4 4\n1 2 -10 3\n1 3 1 -10\n2 4 -10 -1\n3 4 0 -3', output: '4', source: 'sample', note: sample(1) },
    { input: '2 1\n1 2 5 -4', output: '2', source: 'own', note: L('Go and come back: +1.', 'যাওয়া-আসা: +১।') },
    { input: '2 1\n1 2 5 -5', output: '0', source: 'own', note: L('The only cycle sums to 0, which is not positive.', 'একমাত্র চক্রের যোগফল ০, ধনাত্মক নয়।') },
  ],
  pitfalls: [
    L('Running Floyd–Warshall for “positive cycles”: it does not tell you the length.', '“ধনাত্মক চক্র”-এর জন্য ফ্লয়েড–ওয়ারশাল: এটি দৈর্ঘ্য বলে না।'),
    L('Forgetting the zero self-loops, which make the condition monotone.', 'শূন্য স্ব-লুপ ভুলে যাওয়া, যা শর্তকে একমুখী করে।'),
  ],
  related: [
    { id: '696D', name: 'Legen...', why: L('Max-plus matrix powers.', 'ম্যাক্স-প্লাস ম্যাট্রিক্স ঘাত।') },
    { id: '576D', name: 'Flights for Regular Customers', why: L('Matrix powers over a non-standard semiring.', 'অপ্রচলিত সেমিরিংয়ে ম্যাট্রিক্স ঘাত।') },
  ],
  toolkit: ['bit-shift'],
};

// ───────────────────────────────────────────── 107D
export const p107D: ProblemEntry = {
  id: '107D',
  contestId: 107,
  index: 'D',
  name: 'Crime Management',
  rating: 2400,
  tags: ['dp', 'graphs', 'matrices'],
  why: L(
    'Only the count of each crime modulo the lcm of its multiplicities matters, and the product rule caps the whole state space at 123. Counting strings of length 10¹⁸ is then a 123 × 123 matrix power.',
    'প্রতিটি অপরাধের গণনা শুধু তার গুণকগুলোর lcm মডুলো গুরুত্বপূর্ণ, আর গুণফলের নিয়ম পুরো অবস্থা-জগৎকে ১২৩-এ সীমিত করে। তখন ১০¹⁸ দৈর্ঘ্যের স্ট্রিং গোনা একটি ১২৩ × ১২৩ ম্যাট্রিক্স ঘাত।',
  ),
  statement: L(
    'Zeyad commits exactly n crimes, each one of 26 types A–Z, and the order matters. There are c conditions “t m”: if the number of crimes of type t is a multiple of m, he goes unpunished for t. A crime type is safe if its count is a multiple of at least one of its multiplicities (zero counts are always safe); types with no condition may not be committed at all. The product of all multiplicities is at most 123. Count the sequences in which every type is safe, modulo 12345.',
    'জায়েদ ঠিক n-টি অপরাধ করে, প্রতিটি A–Z-এর ২৬ ধরনের একটি, আর ক্রম গুরুত্বপূর্ণ। c-টি শর্ত “t m” আছে: t ধরনের অপরাধের সংখ্যা m-এর গুণিতক হলে t-এর জন্য শাস্তি নেই। একটি ধরন নিরাপদ যদি তার গণনা তার অন্তত একটি গুণকের গুণিতক হয় (শূন্য সবসময় নিরাপদ); শর্তহীন ধরন একদমই করা যাবে না। সব গুণকের গুণফল বড়জোর ১২৩। যে অনুক্রমে প্রতিটি ধরন নিরাপদ তা ১২৩৪৫ মডুলো গুনুন।',
  ),
  input: L('n c, then c lines “t m”.', 'n c, তারপর c লাইনে “t m”।'),
  output: L('The count modulo 12345.', 'গণনা ১২৩৪৫ মডুলো।'),
  limits: { timeSec: 5, memoryMb: 256, notes: [L('n ≤ 10¹⁸, c ≤ 1000, product of multiplicities ≤ 123', 'n ≤ ১০¹⁸, c ≤ ১০০০, গুণকগুলোর গুণফল ≤ ১২৩')] },
  samples: [
    { input: '5 2\nA 1\nB 2', output: '16', explain: L('Strings of A and B with an even number of B: 2⁴.', 'জোড় সংখ্যক B-সহ A আর B-এর স্ট্রিং: ২⁴।') },
    { input: '6 3\nA 1\nB 2\nC 3', output: '113', explain: L('B even and C a multiple of 3.', 'B জোড় আর C ৩-এর গুণিতক।') },
    { input: '8 3\nA 2\nA 3\nB 2', output: '128', explain: L('A divisible by 2 or 3, B even.', 'A ২ বা ৩ দিয়ে বিভাজ্য, B জোড়।') },
  ],
  observation: L(
    'For a type t with multiplicities m₁, m₂, …, safety depends only on count mod Lₜ = lcm(mᵢ). The joint state is the tuple of these residues, a mixed-radix number below Π Lₜ ≤ 123. Committing a crime of type t moves the state deterministically, so the transition matrix has one 1 per (state, type) pair; the answer sums Mⁿ[0][s] over accepting states s.',
    'গুণক m₁, m₂, …-সহ ধরন t-এর নিরাপত্তা শুধু গণনা mod Lₜ = lcm(mᵢ)-এর ওপর নির্ভর করে। যৌথ অবস্থা হলো এই অবশেষগুলোর টাপল, Π Lₜ ≤ ১২৩-এর নিচের একটি মিশ্র-ভিত্তি সংখ্যা। t ধরনের একটি অপরাধ অবস্থাকে নির্দিষ্টভাবে সরায়, তাই রূপান্তর ম্যাট্রিক্সে প্রতি (অবস্থা, ধরন)-এ একটি ১; উত্তর গ্রহণযোগ্য অবস্থা s-এর ওপর Mⁿ[০][s]-এর যোগফল।',
  ),
  approach: [
    L('Group multiplicities by type; Lₜ = lcm; radix positions for the state code.', 'ধরন অনুযায়ী গুণক দল; Lₜ = lcm; অবস্থা-কোডের জন্য ভিত্তি অবস্থান।'),
    L('For each state and type add 1 to M[state][next state].', 'প্রতিটি অবস্থা আর ধরনে M[অবস্থা][পরের অবস্থা]-তে ১ যোগ।'),
    L('Mⁿ by fast exponentiation mod 12345; sum accepting states from state 0.', 'দ্রুত ঘাতে Mⁿ mod ১২৩৪৫; অবস্থা ০ থেকে গ্রহণযোগ্য অবস্থাগুলোর যোগফল।'),
  ],
  walkthrough: {
    input: 'A 1, B 2, n = 5',
    steps: [
      { state: 'L_A = 1, L_B = 2 → 2 states (B count parity)', text: L('A never changes the state.', 'A কখনো অবস্থা বদলায় না।') },
      { state: 'M = [[1,1],[1,1]], M⁵[0][0] = 16', text: L('Accept only B even.', 'শুধু B জোড় গ্রহণযোগ্য।') },
    ],
  },
  complexity: { time: 'O(S³ log n), S ≤ 123', space: 'O(S²)', why: L('About 120 products of 123 × 123 matrices.', '১২৩ × ১২৩ ম্যাট্রিক্সের প্রায় ১২০টি গুণ।') },
  solutions: [
    {
      id: 'residues',
      kind: 'optimal',
      title: L('State = residues of every type', 'অবস্থা = প্রতিটি ধরনের অবশেষ'),
      idea: L('Mixed-radix state, one transition per type, matrix power.', 'মিশ্র-ভিত্তি অবস্থা, প্রতি ধরনে একটি রূপান্তর, ম্যাট্রিক্স ঘাত।'),
      explain: [
        L(
          'This is a deterministic automaton over the alphabet of crimes; counting accepted words of length n is always “adjacency matrix to the n, then sum accepting columns”. With c = 0 only the empty sequence is allowed.',
          'এটি অপরাধের বর্ণমালায় একটি নির্ধারিত অটোমেটন; n দৈর্ঘ্যের গৃহীত শব্দ গোনা সবসময় “সংলগ্নতা ম্যাট্রিক্সের n ঘাত, তারপর গ্রহণযোগ্য কলামের যোগ”। c = ০ হলে শুধু খালি অনুক্রম চলে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int MOD = 12345;
typedef vector<vector<int>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    int S = a.size();
    Mat c(S, vector<int>(S, 0));
    for (int i = 0; i < S; i++)
        for (int k = 0; k < S; k++) {
            if (!a[i][k]) continue;
            for (int j = 0; j < S; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
        }
    return c;
}

int main() {
    long long n;
    int c;
    cin >> n >> c;
    map<int, vector<int>> mult;
    for (int i = 0; i < c; i++) { char t; int m; cin >> t >> m; mult[t - 'A'].push_back(m); }
    vector<int> type, Lt, radix;
    int S = 1;
    for (auto& [t, ms] : mult) {
        int l = 1;
        for (int m : ms) l = lcm(l, m);
        type.push_back(t), Lt.push_back(l), radix.push_back(S);
        S *= l;
    }
    int T = type.size();
    Mat M(S, vector<int>(S, 0)), R(S, vector<int>(S, 0));
    for (int s = 0; s < S; s++) {
        R[s][s] = 1;
        for (int k = 0; k < T; k++) {
            int digit = s / radix[k] % Lt[k];
            int ns = s - digit * radix[k] + (digit + 1) % Lt[k] * radix[k];
            M[s][ns]++;
        }
    }
    for (; n; n >>= 1, M = mul(M, M))
        if (n & 1) R = mul(R, M);
    int ans = 0;
    for (int s = 0; s < S; s++) {
        bool ok = true;
        for (int k = 0; k < T && ok; k++) {
            int digit = s / radix[k] % Lt[k];
            bool safe = false;
            for (int m : mult[type[k]]) safe |= digit % m == 0;
            ok = safe;
        }
        if (ok) ans = (ans + R[0][s]) % MOD;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(S³ log n)',
      space: 'O(S²)',
      accepted: true,
      toolkit: ['map', 'gcd-lcm', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every sequence', 'প্রতিটি অনুক্রম তালিকা'),
      idea: L('Try all |types|ⁿ sequences and count each type.', 'সব |ধরন|ⁿ অনুক্রম চেষ্টা করে প্রতিটি ধরন গোনা।'),
      explain: [L('The definition, for tiny n.', 'সংজ্ঞা, ক্ষুদ্র n-এর জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    int c;
    cin >> n >> c;
    map<int, vector<int>> mult;
    for (int i = 0; i < c; i++) { char t; int m; cin >> t >> m; mult[t - 'A'].push_back(m); }
    vector<int> types;
    for (auto& kv : mult) types.push_back(kv.first);
    int T = types.size();
    if (n > 9) { cout << "\n"; return 0; }
    if (T == 0) { cout << (n == 0 ? 1 : 0) << "\n"; return 0; }
    long long total = 1, ans = 0;
    for (int i = 0; i < n; i++) total *= T;
    for (long long code = 0; code < total; code++) {
        vector<int> cnt(T, 0);
        long long x = code;
        for (int i = 0; i < n; i++) cnt[x % T]++, x /= T;
        bool ok = true;
        for (int k = 0; k < T; k++) {
            bool safe = false;
            for (int m : mult[types[k]]) safe |= cnt[k] % m == 0;
            ok &= safe;
        }
        ans += ok;
    }
    cout << ans % 12345 << "\n";
    return 0;
}
`,
      time: 'O(Tⁿ · n)',
      space: 'O(T)',
      accepted: false,
      toolkit: ['map'],
    },
  ],
  tests: [
    { input: '5 2\nA 1\nB 2', output: '16', source: 'sample', note: sample(1) },
    { input: '6 3\nA 1\nB 2\nC 3', output: '113', source: 'sample', note: sample(2) },
    { input: '8 3\nA 2\nA 3\nB 2', output: '128', source: 'sample', note: sample(3) },
    { input: '3 0', output: '0', source: 'own', note: L('No allowed crime type but n > 0.', 'কোনো অনুমোদিত ধরন নেই কিন্তু n > ০।') },
    { input: '0 0', output: '1', source: 'own', note: L('The empty sequence.', 'খালি অনুক্রম।') },
  ],
  pitfalls: [
    L('Taking the product of multiplicities of one type instead of their lcm.', 'একটি ধরনের গুণকগুলোর lcm-এর বদলে গুণফল নেওয়া।'),
    L('Requiring the count to be a multiple of all multiplicities: one is enough.', 'গণনাকে সব গুণকের গুণিতক হতে বলা: একটিই যথেষ্ট।'),
  ],
  related: [
    { id: '696D', name: 'Legen...', why: L('An automaton powered by a matrix.', 'ম্যাট্রিক্স দিয়ে চালানো অটোমেটন।') },
    { id: '691E', name: 'Xor-sequences', why: L('Counting sequences with an adjacency matrix.', 'সংলগ্নতা ম্যাট্রিক্সে অনুক্রম গোনা।') },
  ],
  toolkit: ['gcd-lcm', 'map'],
};

// ───────────────────────────────────────────── 696D
export const p696D: ProblemEntry = {
  id: '696D',
  contestId: 696,
  index: 'D',
  name: 'Legen...',
  rating: 2500,
  tags: ['data-structures', 'dp', 'matrices', 'strings'],
  why: L(
    'Aho–Corasick turns “occurrences of many patterns” into a walk in an automaton, and a max-plus matrix power walks it 10¹⁴ steps. Two classic tools in one problem.',
    'আহো–করাসিক “অনেক প্যাটার্নের ঘটনা”-কে একটি অটোমেটনে হাঁটায় বদলায়, আর একটি ম্যাক্স-প্লাস ম্যাট্রিক্স ঘাত তাতে ১০¹⁴ ধাপ হাঁটে। এক প্রবলেমে দুটি ক্লাসিক হাতিয়ার।',
  ),
  statement: L(
    'There are n pickup lines; line i gives happiness aᵢ every time it appears as a substring of a text (overlaps count). Find the maximum total happiness of a text of exactly l lowercase letters.',
    'n-টি পিকআপ লাইন আছে; লাইন i একটি লেখায় সাবস্ট্রিং হিসেবে যতবার আসে ততবার aᵢ আনন্দ দেয় (ওভারল্যাপও গণ্য)। ঠিক l-টি ছোট হাতের অক্ষরের লেখার সর্বোচ্চ মোট আনন্দ বের করুন।',
  ),
  input: L('n l, then a₁ … aₙ, then the n lines.', 'n l, তারপর a₁ … aₙ, তারপর n-টি লাইন।'),
  output: L('The maximum happiness.', 'সর্বোচ্চ আনন্দ।'),
  limits: { timeSec: 6, memoryMb: 256, notes: [L('n ≤ 200, l ≤ 10¹⁴, aᵢ ≤ 100, total length ≤ 200', 'n ≤ ২০০, l ≤ ১০¹⁴, aᵢ ≤ ১০০, মোট দৈর্ঘ্য ≤ ২০০')] },
  samples: [
    { input: '3 6\n3 2 1\nheart\nearth\nart', output: '6', explain: L('hearth contains each line once: 3 + 2 + 1.', 'hearth-এ প্রতিটি লাইন একবার: ৩ + ২ + ১।') },
    { input: '3 6\n3 2 8\nheart\nearth\nart', output: '16', explain: L('artart: art twice.', 'artart: art দুবার।') },
  ],
  observation: L(
    'Build the Aho–Corasick automaton (at most 201 states). Each state s has a gain g(s) = sum of aᵢ over lines that end at s (follow suffix links). Adding a letter moves to a fixed next state and earns its gain, so the answer is the best walk of length l from the root: a max-plus matrix power.',
    'আহো–করাসিক অটোমেটন বানান (বড়জোর ২০১টি অবস্থা)। প্রতিটি অবস্থা s-এর লাভ g(s) = s-এ শেষ হওয়া লাইনগুলোর aᵢ-এর যোগফল (সাফিক্স লিংক ধরে)। একটি অক্ষর যোগ করলে একটি নির্দিষ্ট পরের অবস্থায় যায় আর তার লাভ পায়, তাই উত্তর শিকড় থেকে l দৈর্ঘ্যের সেরা হাঁটা: একটি ম্যাক্স-প্লাস ম্যাট্রিক্স ঘাত।',
  ),
  approach: [
    L('Build the trie, BFS suffix links and full goto transitions; accumulate gains along suffix links.', 'ট্রাই বানানো, BFS-এ সাফিক্স লিংক আর পূর্ণ goto রূপান্তর; সাফিক্স লিংক ধরে লাভ জমানো।'),
    L('M[s][goto(s, c)] = max(…, g(goto(s, c))).', 'M[s][goto(s, c)] = max(…, g(goto(s, c)))।'),
    L('Compute M^l in max-plus and take the max of row 0.', 'ম্যাক্স-প্লাসে M^l বের করে সারি ০-এর সর্বোচ্চ।'),
  ],
  walkthrough: {
    input: 'lines heart (3), earth (2), art (8); l = 6',
    steps: [
      { state: 'artart: “art” ends at positions 3 and 6', text: L('8 + 8 = 16.', '৮ + ৮ = ১৬।') },
      { state: 'hearth only gives 3 + 2 + 8 = 13', text: L('The automaton finds the better text.', 'অটোমেটন ভালো লেখাটি খুঁজে পায়।') },
    ],
  },
  complexity: { time: 'O(S³ log l), S ≤ 201', space: 'O(S²)', why: L('About 94 max-plus products.', 'প্রায় ৯৪টি ম্যাক্স-প্লাস গুণ।') },
  solutions: [
    {
      id: 'aho-maxplus',
      kind: 'optimal',
      title: L('Aho–Corasick + max-plus power', 'আহো–করাসিক + ম্যাক্স-প্লাস ঘাত'),
      idea: L('Best walk of length l in the automaton.', 'অটোমেটনে l দৈর্ঘ্যের সেরা হাঁটা।'),
      explain: [
        L(
          'Gains must include patterns that end at a state through suffix links: “art” ends inside “heart”. Accumulating g along the BFS order handles that in one pass.',
          'লাভে সাফিক্স লিংক দিয়ে কোনো অবস্থায় শেষ হওয়া প্যাটার্নও ধরতে হবে: “art” “heart”-এর ভেতরে শেষ হয়। BFS ক্রমে g জমালে এক পাসে তা হয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll NEG = LLONG_MIN / 4;
int S;
typedef vector<vector<ll>> Mat;

Mat mul(const Mat& a, const Mat& b) {
    Mat c(S, vector<ll>(S, NEG));
    for (int i = 0; i < S; i++)
        for (int k = 0; k < S; k++) {
            if (a[i][k] == NEG) continue;
            for (int j = 0; j < S; j++)
                if (b[k][j] != NEG) c[i][j] = max(c[i][j], a[i][k] + b[k][j]);
        }
    return c;
}

int main() {
    int n;
    ll l;
    cin >> n >> l;
    vector<ll> a(n);
    for (auto& x : a) cin >> x;
    vector<array<int, 26>> go(1);
    go[0].fill(-1);
    vector<ll> gain(1, 0);
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        int v = 0;
        for (char ch : s) {
            int c = ch - 'a';
            if (go[v][c] < 0) {
                go[v][c] = go.size();
                go.emplace_back();
                go.back().fill(-1);
                gain.push_back(0);
            }
            v = go[v][c];
        }
        gain[v] += a[i];
    }
    S = go.size();
    vector<int> link(S, 0), order;
    queue<int> q;
    for (int c = 0; c < 26; c++)
        if (go[0][c] < 0) go[0][c] = 0;
        else link[go[0][c]] = 0, q.push(go[0][c]);
    while (!q.empty()) {
        int v = q.front(); q.pop();
        gain[v] += gain[link[v]];  // patterns ending here through suffix links
        for (int c = 0; c < 26; c++) {
            int u = go[v][c];
            if (u < 0) go[v][c] = go[link[v]][c];
            else link[u] = go[link[v]][c], q.push(u);
        }
    }
    Mat M(S, vector<ll>(S, NEG)), R(S, vector<ll>(S, NEG));
    for (int s = 0; s < S; s++) {
        R[s][s] = 0;
        for (int c = 0; c < 26; c++) {
            int t = go[s][c];
            M[s][t] = max(M[s][t], gain[t]);
        }
    }
    for (; l; l >>= 1, M = mul(M, M))
        if (l & 1) R = mul(R, M);
    cout << *max_element(R[0].begin(), R[0].end()) << "\n";
    return 0;
}
`,
      time: 'O(S³ log l)',
      space: 'O(S²)',
      accepted: true,
      toolkit: ['vector', 'stack-queue', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP over the length', 'দৈর্ঘ্যের ওপর DP'),
      idea: L('best[s] after t letters; l rounds of relaxation.', 't অক্ষরের পর best[s]; l রাউন্ড শিথিলকরণ।'),
      explain: [L('Same automaton, but one letter at a time: O(l · S · 26).', 'একই অটোমেটন, কিন্তু একবারে এক অক্ষর: O(l · S · ২৬)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    ll l;
    cin >> n >> l;
    vector<ll> a(n);
    vector<string> s(n);
    for (auto& x : a) cin >> x;
    for (auto& x : s) cin >> x;
    if (l > 2000) { cout << "\n"; return 0; }
    // state = the last (maxLen - 1) letters, kept as a string; gains counted directly
    size_t K = 0;
    for (auto& x : s) K = max(K, x.size());
    map<string, ll> best;
    best[""] = 0;
    for (ll t = 0; t < l; t++) {
        map<string, ll> nx;
        for (auto& [tail, v] : best)
            for (char c = 'a'; c <= 'z'; c++) {
                string w = tail + c;
                ll g = v;
                for (int i = 0; i < n; i++)
                    if (w.size() >= s[i].size() && w.compare(w.size() - s[i].size(), s[i].size(), s[i]) == 0) g += a[i];
                if (w.size() >= K) w = w.substr(w.size() - (K - 1));
                auto it = nx.find(w);
                if (it == nx.end() || it->second < g) nx[w] = g;
            }
        best = nx;
    }
    ll ans = LLONG_MIN;
    for (auto& [t, v] : best) ans = max(ans, v);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(l · 26^K)',
      space: 'O(26^K)',
      accepted: false,
      toolkit: ['map', 'string-basics'],
    },
  ],
  tests: [
    { input: '3 6\n3 2 1\nheart\nearth\nart', output: '6', source: 'sample', note: sample(1) },
    { input: '3 6\n3 2 8\nheart\nearth\nart', output: '16', source: 'sample', note: sample(2) },
    { input: '1 5\n7\naa', output: '28', source: 'own', note: L('aaaaa has four overlapping aa.', 'aaaaa-এ চারটি ওভারল্যাপিং aa।') },
  ],
  pitfalls: [
    L('Not propagating gains along suffix links.', 'সাফিক্স লিংক ধরে লাভ না ছড়ানো।'),
    L('Using ordinary (+, ×) matrix multiplication for a maximum.', 'সর্বোচ্চের জন্য সাধারণ (+, ×) ম্যাট্রিক্স গুণ।'),
  ],
  related: [
    { id: '147B', name: 'Smile House', why: L('Max-plus matrices.', 'ম্যাক্স-প্লাস ম্যাট্রিক্স।') },
    { id: '107D', name: 'Crime Management', why: L('Automaton plus matrix power.', 'অটোমেটন আর ম্যাট্রিক্স ঘাত।') },
  ],
  toolkit: ['stack-queue'],
};

// ───────────────────────────────────────────── 1538E
export const p1538E: ProblemEntry = {
  id: '1538E',
  contestId: 1538,
  index: 'E',
  name: 'Funny Substrings',
  rating: 2100,
  tags: ['data-structures', 'hashing', 'implementation', 'matrices', 'strings'],
  why: L(
    'Strings that double 50 times are too long to store, but a count of “haha” only needs a summary: length, count, first three and last three letters. Concatenation combines summaries in O(1).',
    '৫০ বার দ্বিগুণ হওয়া স্ট্রিং রাখার পক্ষে অনেক লম্বা, কিন্তু “haha” গোনার জন্য শুধু একটি সারাংশ লাগে: দৈর্ঘ্য, গণনা, প্রথম তিন আর শেষ তিন অক্ষর। জোড়া লাগানো সারাংশগুলো O(১)-এ মেশায়।',
  ),
  statement: L(
    'A program has n statements, each “x := s” (assign a literal string) or “x = a + b” (concatenate two variables). Print how many times “haha” occurs in the variable assigned by the last statement.',
    'একটি প্রোগ্রামে n-টি বিবৃতি, প্রতিটি “x := s” (একটি আক্ষরিক স্ট্রিং বসানো) বা “x = a + b” (দুটি ভেরিয়েবল জোড়া)। শেষ বিবৃতিতে বসানো ভেরিয়েবলে “haha” কতবার আসে ছাপুন।',
  ),
  input: L('t tests; each has n and n statements.', 't-টি টেস্ট; প্রতিটিতে n আর n-টি বিবৃতি।'),
  output: L('The count per test.', 'প্রতি টেস্টে গণনা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 50, literal strings ≤ 5 letters', 'n ≤ ৫০, আক্ষরিক স্ট্রিং ≤ ৫ অক্ষর')] },
  samples: [
    {
      input: '4\n6\na := h\nb := aha\nc = a + b\nc = c + c\ne = c + c\nd = a + c\n15\nx := haha\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\n1\nhaha := hah\n5\nhaahh := aaaha\nahhhh = haahh + haahh\nhaahh = haahh + haahh\nahhhh = ahhhh + haahh\nahhaa = haahh + ahhhh',
      output: '3\n32767\n0\n0',
      explain: L('In the second test each doubling also creates one new “haha” across the joint.', 'দ্বিতীয় টেস্টে প্রতিটি দ্বিগুণে জোড়ায় একটি নতুন “haha”ও হয়।'),
    },
  ],
  observation: L(
    'An occurrence of “haha” in a + b is inside a, inside b, or crosses the joint. A crossing one uses at most the last 3 letters of a and the first 3 of b. So store (count, length, first ≤ 3 letters, last ≤ 3 letters) and combine: count(a) + count(b) + occurrences in last3(a) + first3(b).',
    'a + b-তে “haha”-এর একটি ঘটনা a-র ভেতরে, b-র ভেতরে, বা জোড় পেরিয়ে। পেরোনোটি বড়জোর a-র শেষ ৩ আর b-র প্রথম ৩ অক্ষর ব্যবহার করে। তাই (গণনা, দৈর্ঘ্য, প্রথম ≤ ৩ অক্ষর, শেষ ≤ ৩ অক্ষর) রাখুন আর মেশান: count(a) + count(b) + last3(a) + first3(b)-তে ঘটনা।',
  ),
  approach: [
    L('Map variable names to summaries.', 'ভেরিয়েবলের নাম থেকে সারাংশের ম্যাপ।'),
    L('Literal: count directly. Sum: combine as above; prefix/suffix from the joined short string.', 'আক্ষরিক: সরাসরি গোনা। যোগ: ওপরের মতো মেশানো; জোড়া ছোট স্ট্রিং থেকে প্রিফিক্স/সাফিক্স।'),
  ],
  walkthrough: {
    input: 'x := haha, then x = x + x',
    steps: [
      { state: 'x: count 1, “hah” … “aha”', text: L('One occurrence.', 'একটি ঘটনা।') },
      { state: 'x + x: 1 + 1 + count(“aha” + “hah”) = 3', text: L('“ahahah” contains one more across the joint.', '“ahahah”-এ জোড় পেরিয়ে আরও একটি।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Constant work per statement.', 'প্রতি বিবৃতিতে ধ্রুব কাজ।') },
  solutions: [
    {
      id: 'summary',
      kind: 'optimal',
      title: L('Summaries: count, first 3, last 3', 'সারাংশ: গণনা, প্রথম ৩, শেষ ৩'),
      idea: L('Only the borders can create new occurrences.', 'শুধু প্রান্তই নতুন ঘটনা তৈরি করতে পারে।'),
      explain: [
        L(
          'This is the monoid trick behind segment trees: keep just enough of each piece to merge two pieces correctly. Counts reach about 2⁵⁰, so use 64-bit integers.',
          'এটি সেগমেন্ট ট্রির পেছনের মনোয়েড কৌশল: প্রতিটি টুকরোর ঠিক ততটুকু রাখুন যতটা দুটি টুকরো সঠিকভাবে মেশাতে লাগে। গণনা প্রায় ২⁵⁰-এ পৌঁছায়, তাই ৬৪-বিট পূর্ণসংখ্যা।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct Info { long long cnt; string pre, suf; };

long long occ(const string& s) {
    long long c = 0;
    for (size_t i = 0; i + 4 <= s.size(); i++) c += s.compare(i, 4, "haha") == 0;
    return c;
}
Info make(const string& s) {
    return {occ(s), s.substr(0, min<size_t>(3, s.size())), s.substr(s.size() - min<size_t>(3, s.size()))};
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        map<string, Info> var;
        string last;
        for (int i = 0; i < n; i++) {
            string x, op;
            cin >> x >> op;
            if (op == ":=") {
                string s;
                cin >> s;
                var[x] = make(s);
            } else {
                string a, plus, b;
                cin >> a >> plus >> b;
                Info A = var[a], B = var[b];
                Info r;
                r.cnt = A.cnt + B.cnt + occ(A.suf + B.pre);
                string head = A.pre.size() < 3 ? A.pre + B.pre : A.pre;  // A is shorter than 3 letters
                string tail = B.suf.size() < 3 ? A.suf + B.suf : B.suf;
                r.pre = head.substr(0, min<size_t>(3, head.size()));
                r.suf = tail.substr(tail.size() - min<size_t>(3, tail.size()));
                var[x] = r;
            }
            last = x;
        }
        cout << var[last].cnt << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'string-basics', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Build the real strings', 'আসল স্ট্রিং বানানো'),
      idea: L('Store every variable’s full text and count at the end.', 'প্রতিটি ভেরিয়েবলের পূর্ণ লেখা রেখে শেষে গোনা।'),
      explain: [L('Exponential memory in general; fine when strings stay short.', 'সাধারণভাবে সূচকীয় মেমরি; স্ট্রিং ছোট থাকলে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        map<string, string> var;
        string last;
        bool tooBig = false;
        for (int i = 0; i < n; i++) {
            string x, op;
            cin >> x >> op;
            if (op == ":=") { string s; cin >> s; var[x] = s; }
            else {
                string a, plus, b;
                cin >> a >> plus >> b;
                string s = var[a] + var[b];
                if (s.size() > 2000000) tooBig = true, s = s.substr(0, 10);
                var[x] = s;
            }
            last = x;
        }
        if (tooBig) { cout << "\n"; continue; }
        long long c = 0;
        string& s = var[last];
        for (size_t i = 0; i + 4 <= s.size(); i++) c += s.compare(i, 4, "haha") == 0;
        cout << c << "\n";
    }
    return 0;
}
`,
      time: 'O(total length)',
      space: 'O(total length)',
      accepted: false,
      toolkit: ['map', 'string-basics'],
    },
  ],
  tests: [
    {
      input: '4\n6\na := h\nb := aha\nc = a + b\nc = c + c\ne = c + c\nd = a + c\n15\nx := haha\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\nx = x + x\n1\nhaha := hah\n5\nhaahh := aaaha\nahhhh = haahh + haahh\nhaahh = haahh + haahh\nahhhh = ahhhh + haahh\nahhaa = haahh + ahhhh',
      output: '3\n32767\n0\n0',
      source: 'sample',
      note: sample(1),
    },
    { input: '1\n3\na := ha\nb := h\nc = a + b', output: '0', source: 'own', note: L('“hah”: three letters, no “haha”.', '“hah”: তিন অক্ষর, “haha” নেই।') },
  ],
  pitfalls: [
    L('Keeping only 3 prefix letters when the left part itself is shorter than 3.', 'বাম অংশ নিজেই ৩-এর ছোট হলেও শুধু ৩টি প্রিফিক্স অক্ষর রাখা।'),
    L('A variable can be reassigned from itself (x = x + x): read both operands before writing.', 'ভেরিয়েবল নিজের থেকে আবার বসানো যায় (x = x + x): লেখার আগে দুটি অপারেন্ড পড়ুন।'),
  ],
  related: [
    { id: '1980E', name: 'Permutation of Rows and Columns', why: L('Another implementation-heavy “matrices” task.', 'আরেকটি ইমপ্লিমেন্টেশন-ভারী “ম্যাট্রিক্স” কাজ।') },
    { id: '1200E', name: 'Compress Words', why: L('Joining strings and checking the seam.', 'স্ট্রিং জোড়া আর সংযোগস্থল যাচাই।') },
  ],
  toolkit: ['map', 'string-basics'],
};

// ───────────────────────────────────────────── 576D
export const p576D: ProblemEntry = {
  id: '576D',
  contestId: 576,
  index: 'D',
  name: 'Flights for Regular Customers',
  rating: 2700,
  tags: ['dp', 'graphs', 'matrices'],
  why: L(
    'Edges unlock over time. Between unlock moments the graph is fixed, so “where can I be after exactly t flights” advances by a boolean matrix power with bitsets; after each unlock a BFS finishes the trip.',
    'ধারগুলো সময়ের সঙ্গে খোলে। খোলার মুহূর্তগুলোর মাঝে গ্রাফ স্থির, তাই “ঠিক t ফ্লাইট পরে কোথায় থাকতে পারি” বিটসেটসহ বুলিয়ান ম্যাট্রিক্স ঘাতে এগোয়; প্রতিটি খোলার পর একটি BFS যাত্রা শেষ করে।',
  ),
  statement: L(
    'There are n cities and m one-way flights; flight i from aᵢ to bᵢ may be used only if you have already taken at least dᵢ flights. Starting in city 1 with no flights taken, find the minimum number of flights to reach city n, or print Impossible.',
    'n-টি শহর আর m-টি একমুখী ফ্লাইট; aᵢ থেকে bᵢ-তে ফ্লাইট i ব্যবহার করা যায় শুধু অন্তত dᵢ-টি ফ্লাইট আগে নেওয়া থাকলে। কোনো ফ্লাইট ছাড়া শহর ১ থেকে শুরু করে শহর n-এ পৌঁছাতে ন্যূনতম ফ্লাইট বের করুন, নইলে Impossible ছাপুন।',
  ),
  input: L('n m, then m lines aᵢ bᵢ dᵢ.', 'n m, তারপর m লাইনে aᵢ bᵢ dᵢ।'),
  output: L('The minimum number of flights or Impossible.', 'ন্যূনতম ফ্লাইট বা Impossible।'),
  limits: { timeSec: 4, memoryMb: 256, notes: [L('n, m ≤ 150, dᵢ ≤ 10⁹', 'n, m ≤ ১৫০, dᵢ ≤ ১০⁹')] },
  samples: [
    { input: '3 2\n1 2 0\n2 3 1', output: '2', explain: L('1 → 2, then the second flight is unlocked.', '১ → ২, তারপর দ্বিতীয় ফ্লাইট খোলা।') },
    { input: '2 1\n1 2 100500', output: 'Impossible', explain: L('You can never take 100500 flights first.', 'আগে কখনো ১০০৫০০টি ফ্লাইট নেওয়া যায় না।') },
    { input: '3 3\n2 1 0\n2 3 6\n1 2 0', output: '8', explain: L('Bounce between 1 and 2 for 7 flights to stand in city 2, then fly 2 → 3: 8 flights.', '৭টি ফ্লাইটে ১ আর ২-এর মধ্যে আসা-যাওয়া করে শহর ২-এ দাঁড়ান, তারপর ২ → ৩: ৮টি ফ্লাইট।') },
  ],
  observation: L(
    'Sort flights by dᵢ. Keep the set R of cities where you can be after exactly t flights (t = current threshold). Before the next threshold d, the usable graph does not change, so R after d − t more flights is R · A^(d − t) in boolean arithmetic. At each threshold (and at the start) a BFS from R in the current graph gives the best finish t + dist(R, n).',
    'dᵢ দিয়ে ফ্লাইট সাজান। ঠিক t ফ্লাইটের পর যেসব শহরে থাকা সম্ভব তার সেট R রাখুন (t = বর্তমান সীমা)। পরের সীমা d-এর আগে ব্যবহারযোগ্য গ্রাফ বদলায় না, তাই d − t আরও ফ্লাইট পরে R হলো বুলিয়ান গাণিতে R · A^(d − t)। প্রতিটি সীমায় (আর শুরুতে) বর্তমান গ্রাফে R থেকে একটি BFS সেরা সমাপ্তি t + dist(R, n) দেয়।',
  ),
  approach: [
    L('Bitset rows for the boolean matrix; product in n³/64.', 'বুলিয়ান ম্যাট্রিক্সের জন্য বিটসেট সারি; গুণ n³/৬৪-এ।'),
    L('Advance R with fast exponentiation applied to the vector.', 'ভেক্টরে প্রয়োগ করা দ্রুত ঘাতে R এগোনো।'),
    L('Unlock the flight, BFS, update the answer.', 'ফ্লাইট খোলা, BFS, উত্তর হালনাগাদ।'),
  ],
  walkthrough: {
    input: 'sample 3',
    steps: [
      { state: 't = 0: edges 2→1, 1→2; R = {1}', text: L('BFS cannot reach 3 yet.', 'BFS এখনো ৩-এ পৌঁছায় না।') },
      { state: 'advance 6 flights: R = {1} (even number of hops)', text: L('Bouncing 1 ↔ 2.', '১ ↔ ২ লাফ।') },
      { state: 'unlock 2→3; BFS from {1}: 1→2→3 = 2 more', text: L('6 + 2 = 8.', '৬ + ২ = ৮।') },
    ],
  },
  complexity: { time: 'O(m · n³/64 · log d)', space: 'O(n²/64)', why: L('A bitset matrix power between consecutive thresholds.', 'পরপর সীমার মাঝে একটি বিটসেট ম্যাট্রিক্স ঘাত।') },
  solutions: [
    {
      id: 'bitset-power',
      kind: 'optimal',
      title: L('Boolean matrix powers with bitsets', 'বিটসেটে বুলিয়ান ম্যাট্রিক্স ঘাত'),
      idea: L('Reachable set after exactly t flights, advanced between thresholds.', 'ঠিক t ফ্লাইটের পর পৌঁছানো যায় এমন সেট, সীমার মাঝে এগোনো।'),
      explain: [
        L(
          'Boolean matrix product: (A·B)[i] is the OR of rows B[k] over k in row A[i], so with bitsets one product costs n²/64 word operations per row. The vector update R′ = OR of A-rows for k in R costs n²/64.',
          'বুলিয়ান ম্যাট্রিক্স গুণ: (A·B)[i] হলো A[i] সারির k-গুলোর জন্য B[k] সারির OR, তাই বিটসেটে একটি গুণে প্রতি সারিতে n²/৬৪ শব্দ-ক্রিয়া। ভেক্টর আপডেট R′ = R-এর k-গুলোর জন্য A-সারির OR, খরচ n²/৬৪।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int N = 150;
int n;
typedef array<bitset<N>, N> BM;

BM mul(const BM& a, const BM& b) {
    BM c{};
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++)
            if (a[i][k]) c[i] |= b[k];
    return c;
}
bitset<N> step(const bitset<N>& v, const BM& a) {
    bitset<N> r;
    for (int k = 0; k < n; k++) if (v[k]) r |= a[k];
    return r;
}

int main() {
    int m;
    scanf("%d %d", &n, &m);
    vector<array<long long, 3>> e(m);
    for (auto& [d, a, b] : e) scanf("%lld %lld %lld", &a, &b, &d), a--, b--;
    sort(e.begin(), e.end());
    BM A{};
    bitset<N> R;
    R[0] = 1;
    long long t = 0, ans = LLONG_MAX;
    auto bfs = [&]() {
        vector<int> dist(n, -1);
        queue<int> q;
        for (int v = 0; v < n; v++) if (R[v]) dist[v] = 0, q.push(v);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (int u = 0; u < n; u++)
                if (A[v][u] && dist[u] < 0) dist[u] = dist[v] + 1, q.push(u);
        }
        if (dist[n - 1] >= 0) ans = min(ans, t + dist[n - 1]);
    };
    bfs();
    for (int i = 0; i < m; i++) {
        long long d = e[i][0];
        if (d >= ans) break;            // cannot improve anymore
        long long len = d - t;
        BM P = A;
        for (; len && R.any(); len >>= 1, P = mul(P, P))
            if (len & 1) R = step(R, P);
        if (R.none()) break;
        t = d;
        A[e[i][1]][e[i][2]] = 1;
        bfs();
    }
    if (ans == LLONG_MAX) puts("Impossible");
    else printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(m · n³/64 · log d)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['sort', 'stack-queue', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('BFS over (city, flights taken)', '(শহর, নেওয়া ফ্লাইট)-এর ওপর BFS'),
      idea: L('Walk time forward one flight at a time.', 'একবারে এক ফ্লাইট করে সময় এগোনো।'),
      explain: [L('Exact simulation: fine when all dᵢ are small.', 'নির্ভুল সিমুলেশন: সব dᵢ ছোট হলে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> a(m), b(m), d(m);
    long long maxd = 0;
    for (int i = 0; i < m; i++) cin >> a[i] >> b[i] >> d[i], a[i]--, b[i]--, maxd = max(maxd, d[i]);
    if (maxd > 5000) { cout << "\n"; return 0; }
    vector<char> cur(n, 0);
    cur[0] = 1;
    for (long long t = 0; t <= maxd + n + 1; t++) {
        if (cur[n - 1]) { cout << t << "\n"; return 0; }
        vector<char> nx(n, 0);
        for (int i = 0; i < m; i++)
            if (d[i] <= t && cur[a[i]]) nx[b[i]] = 1;
        cur = nx;
    }
    cout << "Impossible\n";
    return 0;
}
`,
      time: 'O((max d + n) · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3 2\n1 2 0\n2 3 1', output: '2', source: 'sample', note: sample(1) },
    { input: '2 1\n1 2 100500', output: 'Impossible', source: 'sample', note: sample(2) },
    { input: '3 3\n2 1 0\n2 3 6\n1 2 0', output: '8', source: 'sample', note: sample(3) },
  ],
  pitfalls: [
    L('Running plain BFS: you may have to fly in circles to unlock an edge.', 'সাধারণ BFS: একটি ধার খুলতে হয়তো চক্রে উড়তে হবে।'),
    L('Tracking “at most t flights” instead of “exactly t”: the parity matters.', '“ঠিক t”-এর বদলে “বড়জোর t ফ্লাইট” ধরা: সমতা গুরুত্বপূর্ণ।'),
  ],
  related: [
    { id: '147B', name: 'Smile House', why: L('Matrix powers over a semiring on graphs.', 'গ্রাফে সেমিরিংয়ের ওপর ম্যাট্রিক্স ঘাত।') },
    { id: '691E', name: 'Xor-sequences', why: L('Walks of a fixed length.', 'নির্দিষ্ট দৈর্ঘ্যের পথ।') },
  ],
  toolkit: ['sort', 'stack-queue'],
};

// ───────────────────────────────────────────── 1106F
export const p1106F: ProblemEntry = {
  id: '1106F',
  contestId: 1106,
  index: 'F',
  name: 'Lunar New Year and a Recursive Sequence',
  rating: 2400,
  tags: ['math', 'matrices', 'number-theory'],
  why: L(
    'A multiplicative recurrence becomes linear in the exponents (mod p − 1, by Fermat). A matrix power gives the exponent e with fₙ = fₖᵉ, and then x^e = m is solved with a discrete logarithm.',
    'গুণনমূলক পুনরাবৃত্তি সূচকে রৈখিক হয়ে যায় (ফার্মার কারণে mod p − ১)। ম্যাট্রিক্স ঘাত সূচক e দেয় যাতে fₙ = fₖᵉ, তারপর বিচ্ছিন্ন লগারিদম দিয়ে x^e = m সমাধান।',
  ),
  statement: L(
    'For i > k, fᵢ = f_{i−1}^{b₁} · f_{i−2}^{b₂} · … · f_{i−k}^{bₖ} mod p with p = 998244353. f₁ = … = f_{k−1} = 1, fₖ is unknown, and fₙ = m is known. Find any valid fₖ (1 ≤ fₖ < p), or −1.',
    'i > k-এর জন্য fᵢ = f_{i−১}^{b₁} · f_{i−২}^{b₂} · … · f_{i−k}^{bₖ} mod p, p = ৯৯৮২৪৪৩৫৩। f₁ = … = f_{k−১} = ১, fₖ অজানা, আর fₙ = m জানা। যেকোনো বৈধ fₖ (১ ≤ fₖ < p) বের করুন, নইলে −১।',
  ),
  input: L('k, then b₁ … bₖ, then n m.', 'k, তারপর b₁ … bₖ, তারপর n m।'),
  output: L('Any valid fₖ or −1.', 'যেকোনো বৈধ fₖ বা −১।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('k ≤ 100, k < n ≤ 10⁹, 1 ≤ m < p', 'k ≤ ১০০, k < n ≤ ১০⁹, ১ ≤ m < p'), L('Any valid answer is accepted.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য।')] },
  samples: [
    { input: '3\n2 3 5\n4 16', output: '4', explain: L('f₄ = f₃² · 1 · 1 = 16 → f₃ = 4 (or p − 4).', 'f₄ = f₃² · ১ · ১ = ১৬ → f₃ = ৪ (বা p − ৪)।') },
    { input: '1\n2\n88888 66666', output: '-1', explain: L('No value works.', 'কোনো মান চলে না।') },
  ],
  observation: L(
    'Every fᵢ is fₖ raised to some exponent eᵢ, and eᵢ = Σ bⱼ · e_{i−j}, a linear recurrence; by Fermat exponents live mod p − 1. A k × k matrix power gives e = eₙ. With the primitive root g = 3, write m = g^L (discrete log) and fₖ = g^y: then e·y ≡ L (mod p − 1), solvable iff gcd(e, p − 1) divides L.',
    'প্রতিটি fᵢ হলো fₖ-এর কোনো সূচক eᵢ ঘাত, আর eᵢ = Σ bⱼ · e_{i−j}, একটি রৈখিক পুনরাবৃত্তি; ফার্মার কারণে সূচক mod p − ১-এ। একটি k × k ম্যাট্রিক্স ঘাত e = eₙ দেয়। আদিম মূল g = ৩ দিয়ে m = g^L (বিচ্ছিন্ন লগ) আর fₖ = g^y লিখলে: e·y ≡ L (mod p − ১), সমাধানযোগ্য যদি ও কেবল যদি gcd(e, p − ১) L-কে ভাগ করে।',
  ),
  approach: [
    L('e via matrix power mod p − 1 (e_k = 1, earlier e = 0).', 'mod p − ১-এ ম্যাট্রিক্স ঘাতে e (e_k = ১, আগেরগুলো ০)।'),
    L('L = log₃ m by baby-step giant-step.', 'বেবি-স্টেপ জায়ান্ট-স্টেপে L = log₃ m।'),
    L('Solve e·y ≡ L with the extended gcd; output 3^y.', 'বর্ধিত gcd দিয়ে e·y ≡ L সমাধান; ৩^y ছাপা।'),
  ],
  walkthrough: {
    input: 'k = 3, b = 2 3 5, n = 4, m = 16',
    steps: [
      { state: 'e₄ = 2·e₃ = 2', text: L('f₄ = f₃².', 'f₄ = f₃²।') },
      { state: 'x² = 16 → x = 4', text: L('Any square root works.', 'যেকোনো বর্গমূল চলে।') },
    ],
  },
  complexity: { time: 'O(k³ log n + √p)', space: 'O(k² + √p)', why: L('Matrix power plus one discrete log.', 'ম্যাট্রিক্স ঘাত আর একটি বিচ্ছিন্ন লগ।') },
  solutions: [
    {
      id: 'bsgs',
      kind: 'optimal',
      title: L('Exponent matrix + baby-step giant-step', 'সূচক ম্যাট্রিক্স + বেবি-স্টেপ জায়ান্ট-স্টেপ'),
      idea: L('fₙ = fₖᵉ; take logs base 3; solve a linear congruence.', 'fₙ = fₖᵉ; ৩ ভিত্তিতে লগ; একটি রৈখিক সর্বসমতা সমাধান।'),
      explain: [
        L(
          'Baby-step giant-step finds L with 3^L = m in O(√p): store 3^j for j < s, then test m · 3^(−s·i). The congruence e·y ≡ L (mod p − 1) reduces by d = gcd(e, p − 1) to an invertible one.',
          'বেবি-স্টেপ জায়ান্ট-স্টেপ O(√p)-এ ৩^L = m-এর L খোঁজে: j < s-এর জন্য ৩^j রাখুন, তারপর m · ৩^(−s·i) পরীক্ষা। সর্বসমতা e·y ≡ L (mod p − ১) d = gcd(e, p − ১) দিয়ে ভাগ করলে বিপরীতযোগ্য হয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll P = 998244353, Q = P - 1;
ll power(ll b, ll e, ll m) {
    ll r = 1 % m;
    for (b %= m; e; e >>= 1, b = (__int128)b * b % m)
        if (e & 1) r = (__int128)r * b % m;
    return r;
}
ll egcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1, y = 0; return a; }
    ll g = egcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}

int main() {
    int k;
    cin >> k;
    vector<ll> b(k);
    for (auto& x : b) cin >> x;
    ll n, m;
    cin >> n >> m;
    // exponent recurrence: e_i = sum b_j e_{i-j} (mod Q); state (e_i, ..., e_{i-k+1})
    vector<vector<ll>> M(k, vector<ll>(k, 0)), R(k, vector<ll>(k, 0));
    for (int j = 0; j < k; j++) M[0][j] = b[j] % Q;
    for (int i = 1; i < k; i++) M[i][i - 1] = 1;
    for (int i = 0; i < k; i++) R[i][i] = 1;
    auto mul = [&](const vector<vector<ll>>& x, const vector<vector<ll>>& y) {
        vector<vector<ll>> z(k, vector<ll>(k, 0));
        for (int i = 0; i < k; i++)
            for (int t = 0; t < k; t++) {
                if (!x[i][t]) continue;
                for (int j = 0; j < k; j++) z[i][j] = (z[i][j] + x[i][t] * y[t][j]) % Q;
            }
        return z;
    };
    for (ll e = n - k; e; e >>= 1, M = mul(M, M))
        if (e & 1) R = mul(R, M);
    ll e = R[0][0];  // initial state (e_k, ..., e_1) = (1, 0, ..., 0)
    // discrete log of m base 3
    ll s = sqrtl(P) + 1;
    unordered_map<ll, ll> baby;
    baby.reserve(2 * s);
    for (ll j = 0, cur = 1; j < s; j++, cur = cur * 3 % P)
        if (!baby.count(cur)) baby[cur] = j;
    ll factor = power(power(3, s, P), P - 2, P), cur = m % P, Lg = -1;
    for (ll i = 0; i <= s; i++, cur = cur * factor % P) {
        auto it = baby.find(cur);
        if (it != baby.end()) { Lg = i * s + it->second; break; }
    }
    ll x, y, d = egcd(e, Q, x, y);
    if (Lg % d) { cout << -1 << "\n"; return 0; }
    ll mod = Q / d;
    ll sol = (__int128)((x % mod + mod) % mod) * (Lg / d) % mod;
    cout << power(3, sol, P) << "\n";
    return 0;
}
`,
      time: 'O(k³ log n + √p)',
      space: 'O(k² + √p)',
      accepted: true,
      toolkit: ['mod-pow', 'gcd-lcm', 'map'],
    },
    {
      id: 'pohlig',
      kind: 'method',
      title: L('Pohlig–Hellman discrete log', 'পোহলিগ–হেলম্যান বিচ্ছিন্ন লগ'),
      idea: L('p − 1 = 2²³ · 7 · 17 is smooth: find the log modulo each prime power, then combine by CRT.', 'p − ১ = ২²³ · ৭ · ১৭ মসৃণ: প্রতিটি মৌলিক ঘাতের মডুলোতে লগ বের করে CRT দিয়ে মেলানো।'),
      explain: [
        L(
          'Raising both sides to (p − 1)/qᵉ projects the problem into a subgroup of order qᵉ, where the log is found digit by digit in base q. For 998244353 that is 23 tiny steps for q = 2 plus two small searches, much faster than √p.',
          'দুই পক্ষকে (p − ১)/qᵉ ঘাতে তুললে প্রবলেমটি qᵉ ক্রমের একটি উপগোষ্ঠীতে যায়, যেখানে লগ q ভিত্তিতে অঙ্ক ধরে খোঁজা হয়। ৯৯৮২৪৪৩৫৩-এর জন্য তা q = ২-এর ২৩টি ক্ষুদ্র ধাপ আর দুটি ছোট খোঁজ, √p-এর চেয়ে অনেক দ্রুত।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll P = 998244353, Q = P - 1;
ll power(ll b, ll e, ll m) {
    ll r = 1 % m;
    for (b %= m; e; e >>= 1, b = (__int128)b * b % m)
        if (e & 1) r = (__int128)r * b % m;
    return r;
}
ll egcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1, y = 0; return a; }
    ll g = egcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}
ll inv(ll a, ll m) { ll x, y; egcd(((a % m) + m) % m, m, x, y); return ((x % m) + m) % m; }

// log base 3 of h modulo the prime power q^e (Pohlig–Hellman step)
ll logPrimePower(ll h, ll q, int e) {
    ll qe = 1;
    for (int i = 0; i < e; i++) qe *= q;
    ll g = power(3, Q / qe, P), gamma = power(g, qe / q, P);  // gamma has order q
    ll x = 0, qi = 1;
    ll hh = power(h, Q / qe, P);
    for (int i = 0; i < e; i++) {
        // h_i = (g^-x * hh)^(q^(e-1-i))
        ll t = power(power(g, (qe - x % qe) % qe, P) * hh % P, qe / qi / q, P);
        ll digit = 0, cur = 1;
        while (cur != t) cur = cur * gamma % P, digit++;
        x += digit * qi;
        qi *= q;
    }
    return x;
}

int main() {
    int k;
    cin >> k;
    vector<ll> b(k);
    for (auto& v : b) cin >> v;
    ll n, m;
    cin >> n >> m;
    vector<vector<ll>> M(k, vector<ll>(k, 0)), R(k, vector<ll>(k, 0));
    for (int j = 0; j < k; j++) M[0][j] = b[j] % Q;
    for (int i = 1; i < k; i++) M[i][i - 1] = 1;
    for (int i = 0; i < k; i++) R[i][i] = 1;
    auto mul = [&](const vector<vector<ll>>& x, const vector<vector<ll>>& y) {
        vector<vector<ll>> z(k, vector<ll>(k, 0));
        for (int i = 0; i < k; i++)
            for (int t = 0; t < k; t++)
                if (x[i][t])
                    for (int j = 0; j < k; j++) z[i][j] = (z[i][j] + x[i][t] * y[t][j]) % Q;
        return z;
    };
    for (ll e = n - k; e; e >>= 1, M = mul(M, M))
        if (e & 1) R = mul(R, M);
    ll e = R[0][0];
    // combine logs modulo 2^23, 7, 17 with CRT
    ll mods[3] = {1LL << 23, 7, 17}, qs[3] = {2, 7, 17};
    int es[3] = {23, 1, 1};
    ll Lg = 0;
    for (int i = 0; i < 3; i++) {
        ll r = logPrimePower(m, qs[i], es[i]), Mi = Q / mods[i];
        Lg = (Lg + (__int128)r * Mi % Q * inv(Mi, mods[i])) % Q;
    }
    ll x, y, d = egcd(e, Q, x, y);
    if (Lg % d) { cout << -1 << "\n"; return 0; }
    ll mod = Q / d;
    ll sol = (__int128)((x % mod + mod) % mod) * (Lg / d) % mod;
    cout << power(3, sol, P) << "\n";
    return 0;
}
`,
      time: 'O(k³ log n + 23 log p)',
      space: 'O(k²)',
      accepted: true,
      toolkit: ['mod-pow', 'gcd-lcm', 'mod-arith'],
    },
  ],
  tests: [
    { input: '3\n2 3 5\n4 16', output: '4', source: 'sample', note: sample(1) },
    { input: '1\n2\n88888 66666', output: '-1', source: 'sample', note: sample(2) },
    { input: '5\n4 7 1 5 6\n7 14187219', output: '6', source: 'own', note: L('f₇ from f₅ = 6.', 'f₅ = ৬ থেকে f₇।') },
  ],
  pitfalls: [
    L('Reducing exponents modulo p instead of p − 1.', 'সূচক p-এর বদলে p − ১ মডুলো নেওয়া।'),
    L('e = 0 (or e sharing factors with p − 1): x ↦ xᵉ is not invertible; use the gcd test.', 'e = ০ (বা p − ১-এর সঙ্গে উৎপাদক ভাগ করা e): x ↦ xᵉ বিপরীতযোগ্য নয়; gcd পরীক্ষা ব্যবহার করুন।'),
  ],
  related: [
    { id: '1182E', name: 'Product Oriented Recurrence', why: L('Exponents of a product recurrence via matrices.', 'ম্যাট্রিক্সে গুণফল-পুনরাবৃত্তির সূচক।') },
    { id: '687B', name: 'Remainders Game', why: L('The Chinese remainder theorem.', 'চীনা অবশেষ উপপাদ্য।') },
  ],
  toolkit: ['mod-pow', 'gcd-lcm'],
};
