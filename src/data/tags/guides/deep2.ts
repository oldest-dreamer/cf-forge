import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

// ───────────────────────────────────────────────────────── fft
export const fftGuideDeep: TagGuide = {
  slug: 'fft',
  intro: [
    L(
      'FFT (and its modular cousin NTT) multiplies two polynomials of length n in O(n log n) instead of O(n²). That matters whenever a count is a sum over all pairs (i, j) grouped by some function of i and j: the number of pairs with i + j = k, with j − i = k, or with “position i of the text matches position i + k of the pattern”. Write each side as a polynomial, multiply, and read the coefficients.',
      'FFT (এবং তার মডুলার রূপ NTT) দুটি n দৈর্ঘ্যের বহুপদী গুণ করে O(n²)-এর বদলে O(n log n)-এ। এটি তখন কাজে লাগে যখন কোনো গণনা সব জোড়া (i, j)-এর যোগফল, i ও j-এর কোনো ফাংশন অনুযায়ী ভাগ করা: i + j = k, j − i = k, বা “টেক্সটের i অবস্থান প্যাটার্নের i + k অবস্থানের সাথে মেলে” এমন জোড়ার সংখ্যা। প্রতিটি পাশকে বহুপদী লেখো, গুণ করো, আর সহগ পড়ো।',
    ),
    L(
      'The skill is the modelling, again. “Count pairs with equal sums” is a convolution of two indicator arrays. “Count shifts where the strings agree” is a correlation, which is a convolution with one side reversed. Wildcards and “within distance d” conditions become sums of products that vanish exactly when the match is perfect. Counting in modular arithmetic uses NTT with 998244353; for another modulus, run three NTT primes and reconstruct with CRT (Garner).',
      'এখানেও আসল দক্ষতা মডেলিং। “সমান যোগফলের জোড়া গোনো” দুটি ইন্ডিকেটর অ্যারের কনভোলিউশন। “যে শিফটে স্ট্রিং দুটি মেলে সেগুলো গোনো” একটি কোরিলেশন, মানে এক পাশ উল্টানো কনভোলিউশন। ওয়াইল্ডকার্ড আর “d দূরত্বের মধ্যে” শর্ত এমন গুণফলের যোগ হয়ে যায় যা ঠিক নিখুঁত মিলেই শূন্য হয়। মডুলার গণনায় ৯৯৮২৪৪৩৫৩ দিয়ে NTT; অন্য মডুলাসে তিনটি NTT মৌলিক চালিয়ে CRT (Garner) দিয়ে ফেরত আনো।',
    ),
  ],
  recognize: [
    L('A count over all pairs (i, j) where the condition is on i + j, j − i, or a sum of products.', 'সব জোড়া (i, j)-এর গণনা যেখানে শর্ত i + j, j − i বা গুণফলের যোগফলের ওপর।'),
    L('Arrays of length 10⁵ to 10⁶ and a quadratic brute force that is obviously too slow.', '১০⁵ থেকে ১০⁶ দৈর্ঘ্যের অ্যারে আর একটি দ্বিঘাত ব্রুট ফোর্স যা স্পষ্টতই ধীর।'),
    L('Matching a pattern at every position with wildcards or with “each letter may be off by at most k”.', 'প্রতিটি অবস্থানে ওয়াইল্ডকার্ডসহ বা “প্রতিটি অক্ষর সর্বোচ্চ k দূরে হতে পারে” শর্তে প্যাটার্ন মেলানো।'),
    L('A generating function: the number of ways is the coefficient of a product, a power, or the solution of an equation F = 1 + C·F².', 'জেনারেটিং ফাংশন: উপায়ের সংখ্যা একটি গুণফল, ঘাত বা F = ১ + C·F² সমীকরণের সমাধানের সহগ।'),
  ],
  patterns: [
    {
      name: L('NTT convolution', 'NTT কনভোলিউশন'),
      explain: [
        L('NTT is FFT over the integers modulo a prime p where p − 1 is divisible by a large power of two (998244353 = 119·2²³ + 1, primitive root 3). It avoids floating-point error, so results are exact. The code is the bit-reversal iterative form: transform both arrays, multiply point-wise, and transform back with the inverse root.', 'NTT হলো এমন মৌলিক p মডুলোতে পূর্ণসংখ্যার FFT যেখানে p − ১ বড় দুইয়ের ঘাত দিয়ে বিভাজ্য (৯৯৮২৪৪৩৫৩ = ১১৯·২²³ + ১, আদিম মূল ৩)। এতে ফ্লোটিং-পয়েন্ট ভুল নেই, তাই ফল সঠিক। কোডটি বিট-রিভার্সাল ইটারেটিভ রূপ: দুটি অ্যারেই ট্রান্সফর্ম করো, বিন্দু ধরে গুণ করো, আর উল্টো মূল দিয়ে ফেরত ট্রান্সফর্ম করো।'),
        L('Always size the transform to a power of two at least len(a) + len(b) − 1, or the product wraps around.', 'ট্রান্সফর্মের আকার সবসময় len(a) + len(b) − ১-এর সমান বা বড় দুইয়ের ঘাত নাও, নইলে গুণফল ঘুরে আসে।'),
      ],
      code: raw`const long long MODN = 998244353;

long long power(long long b, long long e, long long m = MODN) {
    long long r = 1;
    b %= m;
    for (; e > 0; e >>= 1, b = b * b % m)
        if (e & 1) r = r * b % m;
    return r;
}

void ntt(vector<long long>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        long long w = power(3, (MODN - 1) / len);
        if (invert) w = power(w, MODN - 2);
        for (int i = 0; i < n; i += len) {
            long long cur = 1;
            for (int j = 0; j < len / 2; j++) {
                long long u = a[i + j], v = a[i + j + len / 2] * cur % MODN;
                a[i + j] = (u + v) % MODN;
                a[i + j + len / 2] = (u - v + MODN) % MODN;
                cur = cur * w % MODN;
            }
        }
    }
    if (invert) {
        long long inv = power(n, MODN - 2);
        for (auto& x : a) x = x * inv % MODN;
    }
}

vector<long long> multiply(vector<long long> a, vector<long long> b) {
    int need = a.size() + b.size() - 1, n = 1;
    while (n < need) n <<= 1;
    a.resize(n); b.resize(n);
    ntt(a, false); ntt(b, false);
    for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % MODN;
    ntt(a, true);
    a.resize(need);
    return a;
}`,
      example: { problem: '993E', text: L('Nikita and Order Statistics: after turning each element into 1 (< x) or 0, prefix sums give the count c of “small” elements before each position. A segment with exactly k small elements is a pair of prefixes with value difference k, so for k ≥ 1 the answer is Σ_v c[v]·c[v + k], the correlation of the histogram c of prefix values with itself; k = 0 is handled separately as Σ c[v](c[v] − 1)/2. One convolution with a reversed copy gives every k at once. The totals can reach about 2·10¹⁰, above the NTT prime, so use doubles with care or split the work over two primes.', 'Nikita and Order Statistics: প্রতিটি উপাদানকে ১ (< x) বা ০ বানিয়ে প্রিফিক্স যোগ প্রতিটি অবস্থানের আগের “ছোট” উপাদানের সংখ্যা c দেয়। ঠিক k টি ছোট উপাদানের খণ্ড মানে এমন দুটি প্রিফিক্স যাদের মানের পার্থক্য k, তাই k ≥ ১-এর উত্তর Σ_v c[v]·c[v + k], প্রিফিক্স মানের হিস্টোগ্রাম c-র নিজের সাথে কোরিলেশন; k = ০ আলাদা: Σ c[v](c[v] − ১)/২। এক কপি উল্টে এক কনভোলিউশন সব k একসাথে দেয়। মোট প্রায় ২·১০¹⁰ পর্যন্ত হতে পারে, যা NTT-র মৌলিকের চেয়ে বড়, তাই সাবধানে ডাবল নাও বা দুটি মৌলিকে ভাগ করো।') },
    },
    {
      name: L('Counting pairs by sum or by difference', 'যোগফল বা পার্থক্য অনুযায়ী জোড়া গোনা'),
      explain: [
        L('Let A[v] be how many items have value v, B[w] likewise for a second group. Then (A ∗ B)[s] is the number of pairs with v + w = s. For differences, reverse one array first: (A ∗ reverse(B))[s + maxV] counts pairs with v − w = s. Pairs of the same group must be corrected: for i + j = s, subtract the cases i = j (value s/2 used twice) and divide by two for unordered pairs.', 'A[v] হোক v মানের জিনিসের সংখ্যা, B[w] দ্বিতীয় দলের জন্য একইভাবে। তাহলে (A ∗ B)[s] হলো v + w = s এমন জোড়ার সংখ্যা। পার্থক্যের জন্য আগে এক অ্যারে উল্টাও: (A ∗ reverse(B))[s + maxV] গোনে v − w = s জোড়া। একই দলের জোড়া সংশোধন করতে হয়: i + j = s-এ i = j (মান s/2 দুবার) বাদ দাও এবং অক্রমিত জোড়ার জন্য দুই দিয়ে ভাগ করো।'),
      ],
      code: raw`// number of ordered pairs (x from A, y from B) with x + y = s, for every s
vector<long long> pairsBySum(const vector<int>& A, const vector<int>& B, int maxV) {
    vector<long long> ca(maxV + 1, 0), cb(maxV + 1, 0);
    for (int x : A) ca[x]++;
    for (int y : B) cb[y]++;
    return multiply(ca, cb);                      // index s = x + y
}

// number of ordered pairs with x - y = d, for d in [-maxV, maxV] (stored at index d + maxV)
vector<long long> pairsByDifference(const vector<int>& A, const vector<int>& B, int maxV) {
    vector<long long> ca(maxV + 1, 0), cb(maxV + 1, 0);
    for (int x : A) ca[x]++;
    for (int y : B) cb[maxV - y]++;               // reversed
    return multiply(ca, cb);                      // index (x + maxV - y)
}`,
      example: { text: L('“How many triples (i, j, k) with a_i + a_j = a_k?” Build the indicator polynomial P of the values, compute P², and for every value v multiply count(v) by (P²)[v], then correct the pairs i = j.', '“কতগুলো ত্রয়ী (i, j, k)-তে a_i + a_j = a_k?” মানগুলোর ইন্ডিকেটর বহুপদী P বানাও, P² হিসাব করো, প্রতিটি মান v-র জন্য count(v)-কে (P²)[v] দিয়ে গুণ করো, তারপর i = j জোড়া সংশোধন করো।') },
    },
    {
      name: L('Pattern matching with sums of products', 'গুণফলের যোগফল দিয়ে প্যাটার্ন ম্যাচিং'),
      explain: [
        L('For each letter c, mark where the text has c as 0/1. A shift matches at letter c exactly when every position of the pattern with c lands on a text position with c. Counting those landings is a correlation of two 0/1 arrays; summing over the letters gives the number of matching positions at every shift in 4 or 26 convolutions. Wildcards: use the identity Σ (a − b)² a b, which is zero exactly when every non-wildcard pair is equal.', 'প্রতিটি অক্ষর c-র জন্য টেক্সটে c যেখানে আছে তা ০/১ করে চিহ্নিত করো। কোনো শিফট অক্ষর c-তে ঠিক তখনই মেলে যখন প্যাটার্নের c-সহ প্রতিটি অবস্থান টেক্সটের c-সহ অবস্থানে পড়ে। এই পড়াগুলো গোনা দুটি ০/১ অ্যারের কোরিলেশন; অক্ষরগুলোর ওপর যোগ করলে প্রতিটি শিফটে মিলের অবস্থান সংখ্যা ৪ বা ২৬টি কনভোলিউশনে পাওয়া যায়। ওয়াইল্ডকার্ড: Σ (a − b)² a b ব্যবহার করো, যা ঠিক তখনই শূন্য যখন ওয়াইল্ডকার্ড নয় এমন প্রতিটি জোড়া সমান।'),
      ],
      code: raw`// matches[s] = number of positions i of P with T[s + i] == P[i], for every shift s
vector<long long> matchCounts(const string& T, const string& P, const string& alphabet) {
    int n = T.size(), m = P.size();
    vector<long long> total(n - m + 1, 0);
    for (char c : alphabet) {
        vector<long long> a(n, 0), b(m, 0);
        for (int i = 0; i < n; i++) a[i] = T[i] == c;
        for (int i = 0; i < m; i++) b[m - 1 - i] = P[i] == c;       // reversed pattern
        auto prod = multiply(a, b);
        for (int s = 0; s + m <= n; s++) total[s] += prod[s + m - 1];
    }
    return total;                                                    // a shift is perfect if total == m
}`,
      example: { problem: '528D', text: L('Fuzzy Search: first widen each text letter into a window of width 2k + 1 (a prefix-sum trick), so “the text letter is within k” becomes a plain 0/1 array per letter. Then the matchCounts above, with a perfect shift when the count equals |S|, counts every position at once. Four letters, so four convolutions of length 4·10⁵ fit easily.', 'Fuzzy Search: প্রথমে টেক্সটের প্রতিটি অক্ষরকে ২k + ১ প্রস্থের উইন্ডোতে ছড়াও (প্রিফিক্স যোগের কৌশল), যাতে “টেক্সটের অক্ষর k-এর মধ্যে আছে” প্রতিটি অক্ষরে সাধারণ ০/১ অ্যারে হয়। তারপর উপরের matchCounts, সংখ্যা |S|-এর সমান হলে নিখুঁত শিফট, প্রতিটি অবস্থান একসাথে গোনে। অক্ষর চারটি, তাই ৪·১০⁵ দৈর্ঘ্যের চারটি কনভোলিউশন সহজেই ধরে।') },
    },
    {
      name: L('Product of many polynomials (divide and conquer)', 'অনেক বহুপদীর গুণফল (ভাগ করে জয়)'),
      explain: [
        L('A product ∏ (1 + x·a_i) of n small factors, or any “choose a subset and sum” generating function, is built by splitting the list in half, solving each half recursively and multiplying. Each level costs O(n log n), and there are log n levels, so the total is O(n log² n).', 'n টি ছোট গুণকের গুণফল ∏ (১ + x·a_i), বা যেকোনো “উপসেট বেছে যোগ করো” জেনারেটিং ফাংশন, তালিকা অর্ধেক করে প্রতিটি অর্ধেক রিকার্সিভলি সমাধান করে গুণ করে বানানো হয়। প্রতি স্তরে খরচ O(n log n), স্তর log n টি, তাই মোট O(n log² n)।'),
      ],
      code: raw`// coefficients of prod (1 + a_i * x) for i in [lo, hi)
vector<long long> productOfLinears(const vector<long long>& a, int lo, int hi) {
    if (hi - lo == 1) return {1, a[lo] % MODN};
    int mid = (lo + hi) / 2;
    return multiply(productOfLinears(a, lo, mid), productOfLinears(a, mid, hi));
}`,
      example: { text: L('Elementary symmetric sums: the coefficient of xᵏ in ∏ (1 + a_i·x) is the sum of products over all k-subsets. It answers “sum over all k-element subsets of the product of their values” for every k in one pass.', 'প্রাথমিক সিমেট্রিক যোগফল: ∏ (১ + a_i·x)-এ xᵏ-এর সহগ হলো সব k-উপাদানের উপসেটের গুণফলের যোগফল। এটি প্রতিটি k-র জন্য “সব k-উপাদান উপসেটের মানের গুণফলের যোগ” এক পাসে দেয়।') },
    },
    {
      name: L('Power-series equations (inverse, square root)', 'পাওয়ার-সিরিজ সমীকরণ (ইনভার্স, বর্গমূল)'),
      explain: [
        L('When a count satisfies F = 1 + C·F² (binary trees with weights from a set C), solve it as a quadratic in power series: F = (1 − √(1 − 4C)) / (2C) = 2 / (1 + √(1 − 4C)). That needs a series inverse and a series square root, both by Newton’s iteration, doubling the precision each time. The inverse is the shorter of the two: if g satisfies g·f ≡ 1 (mod xᵏ), then g(2 − f·g) works modulo x²ᵏ.', 'কোনো গণনা F = ১ + C·F² মানলে (C সেট থেকে ওজনের বাইনারি ট্রি), তাকে পাওয়ার-সিরিজে দ্বিঘাত হিসেবে সমাধান করো: F = (১ − √(১ − ৪C)) / (২C) = ২ / (১ + √(১ − ৪C))। এজন্য সিরিজ ইনভার্স আর সিরিজ বর্গমূল লাগে, দুটিই Newton পদ্ধতিতে, প্রতিবার নির্ভুলতা দ্বিগুণ করে। ইনভার্স দুটির মধ্যে ছোট: g·f ≡ ১ (mod xᵏ) হলে g(২ − f·g) মডুলো x²ᵏ-এ কাজ করে।'),
      ],
      code: raw`// g with f * g = 1 (mod x^n); requires f[0] != 0
vector<long long> seriesInverse(const vector<long long>& f, int n) {
    vector<long long> g = {power(f[0], MODN - 2)};
    for (int k = 1; k < n; k <<= 1) {
        int m = 2 * k;
        vector<long long> fk(f.begin(), f.begin() + min<int>(m, f.size()));
        auto fg = multiply(fk, g);
        fg.resize(m);
        for (auto& x : fg) x = (MODN - x) % MODN;
        fg[0] = (fg[0] + 2) % MODN;                      // 2 - f*g
        g = multiply(g, fg);
        g.resize(m);
    }
    g.resize(n);
    return g;
}`,
      example: { problem: '438E', text: L('The Child and Binary Tree: let C be the 0/1 series of allowed weights and F[s] the number of trees with total weight s. Then F = 1 + C·F², so F = 2 / (1 + √(1 − 4C)), computed with one square root and one inverse in O(m log m) for all weights up to m ≤ 10⁵ at once.', 'The Child and Binary Tree: C হলো অনুমোদিত ওজনের ০/১ সিরিজ আর F[s] হলো মোট ওজন s-এর ট্রির সংখ্যা। তাহলে F = ১ + C·F², অর্থাৎ F = ২ / (১ + √(১ − ৪C)), যা একটি বর্গমূল আর একটি ইনভার্স দিয়ে O(m log m)-এ m ≤ ১০⁵ পর্যন্ত সব ওজন একসাথে বের হয়।') },
    },
  ],
  mistakes: [
    L('Transform size too small: the length must be a power of two at least len(a) + len(b) − 1.', 'ট্রান্সফর্মের আকার ছোট: দৈর্ঘ্য অবশ্যই len(a) + len(b) − ১-এর সমান বা বড় দুইয়ের ঘাত হতে হবে।'),
    L('Using NTT when the answer is not taken modulo 998244353: counts above the prime wrap around silently. Use three primes with Garner, or doubles when values are small.', 'উত্তর ৯৯৮২৪৪৩৫৩ মডুলোতে না চাইলেও NTT ব্যবহার: মৌলিকের ওপরের গণনা নিঃশব্দে ঘুরে যায়। তিনটি মৌলিক ও Garner নাও, বা মান ছোট হলে ডাবল।'),
    L('Floating FFT rounding: add 0.5 before truncating, and keep input values small (split large values into 15-bit halves).', 'ফ্লোটিং FFT রাউন্ডিং: ছাঁটার আগে ০.৫ যোগ করো, ইনপুট মান ছোট রাখো (বড় মান ১৫-বিট অর্ধেকে ভাঙো)।'),
    L('Off-by-one in the reversed array: write down which index of the product corresponds to which shift before coding.', 'উল্টানো অ্যারেতে ১ ভুল: কোড করার আগে লিখে রাখো গুণফলের কোন সূচক কোন শিফটের সমান।'),
    L('Counting ordered pairs when the problem wants unordered ones, or forgetting to remove i = j.', 'সমস্যা অক্রমিত জোড়া চাইলে ক্রমিত জোড়া গোনা, বা i = j বাদ দিতে ভুলে যাওয়া।'),
  ],
  plan: [
    L('Write NTT and multiply from memory and test them against the O(n²) product on random small arrays.', 'NTT ও multiply মুখস্থ লেখো এবং ছোট এলোমেলো অ্যারেতে O(n²) গুণফলের সাথে মিলাও।'),
    L('Do a counting-by-difference problem (993E) to get the reversal trick right.', 'উল্টানোর কৌশল ঠিকমতো শিখতে পার্থক্য অনুযায়ী গণনার সমস্যা (৯৯৩E) করো।'),
    L('Do a matching problem with sums of products (528D), then one with wildcards.', 'গুণফলের যোগফলের ম্যাচিং সমস্যা (৫২৮D) করো, তারপর ওয়াইল্ডকার্ডসহ একটি।'),
    L('Learn series inverse and square root, and finish with the generating-function problem 438E.', 'সিরিজ ইনভার্স ও বর্গমূল শেখো, আর জেনারেটিং-ফাংশন সমস্যা ৪৩৮E দিয়ে শেষ করো।'),
  ],
};

// ───────────────────────────────────────────────────────── suffix-structures
export const suffixStructuresGuideDeep: TagGuide = {
  slug: 'suffix-structures',
  intro: [
    L(
      'Suffix structures answer questions about all substrings of a string at once. The family runs from the very light (prefix function and Z-function, which describe every prefix’s relation to the string itself) through suffix arrays (all suffixes in sorted order, with the longest common prefix between neighbours) to the suffix automaton (the minimal automaton accepting exactly the suffixes, which also encodes all substrings compactly). Hashing with binary search is the pragmatic neighbour.',
      'সাফিক্স স্ট্রাকচার একটি স্ট্রিংয়ের সব সাবস্ট্রিং সম্পর্কে একসাথে প্রশ্নের উত্তর দেয়। পরিবারটি খুব হালকা (প্রিফিক্স ফাংশন ও Z-ফাংশন, যা প্রতিটি প্রিফিক্সের সাথে স্ট্রিংয়ের সম্পর্ক বলে) থেকে সাফিক্স অ্যারে (সব সাফিক্স সাজানো ক্রমে, পাশাপাশি দুটির সবচেয়ে বড় সাধারণ প্রিফিক্সসহ) হয়ে সাফিক্স অটোমেটন (ঠিক সাফিক্সগুলো গ্রহণ করা ন্যূনতম অটোমেটন, যা সব সাবস্ট্রিংকেও সংক্ষেপে ধরে) পর্যন্ত। হ্যাশিং ও বাইনারি সার্চ ব্যবহারিক প্রতিবেশী।',
    ),
    L(
      'Choosing the lightest tool that works is half the problem. Borders and periods: prefix function. Occurrences of a pattern or palindromic prefix: Z or prefix function. Number of distinct substrings, k-th substring, longest repeated substring: suffix array + LCP or suffix automaton. Counting occurrences of every substring class: automaton with counts pushed up the suffix links.',
      'কাজ করে এমন সবচেয়ে হালকা হাতিয়ার বেছে নেওয়া অর্ধেক সমস্যা। বর্ডার ও পর্যায়: প্রিফিক্স ফাংশন। প্যাটার্ন বা প্যালিনড্রোমিক প্রিফিক্সের উপস্থিতি: Z বা প্রিফিক্স ফাংশন। ভিন্ন সাবস্ট্রিংয়ের সংখ্যা, k-তম সাবস্ট্রিং, দীর্ঘতম পুনরাবৃত্ত সাবস্ট্রিং: সাফিক্স অ্যারে + LCP বা সাফিক্স অটোমেটন। প্রতিটি সাবস্ট্রিং শ্রেণির উপস্থিতি গণনা: সাফিক্স লিংক ধরে গণনা ওপরে ঠেলা অটোমেটন।',
    ),
  ],
  recognize: [
    L('“Prefix equals suffix”, “smallest period”, “how many times does each prefix occur”: the prefix function.', '“প্রিফিক্স = সাফিক্স”, “ক্ষুদ্রতম পর্যায়”, “প্রতিটি প্রিফিক্স কতবার আসে”: প্রিফিক্স ফাংশন।'),
    L('Questions about all substrings: distinct count, k-th in order, most frequent, longest repeated or common to two strings.', 'সব সাবস্ট্রিং নিয়ে প্রশ্ন: ভিন্ন সংখ্যা, ক্রমে k-তম, সবচেয়ে বেশি আসা, দীর্ঘতম পুনরাবৃত্ত বা দুই স্ট্রিংয়ের সাধারণ।'),
    L('A string of length 10⁵ to 10⁶ with an answer for every prefix or every position.', '১০⁵ থেকে ১০⁶ দৈর্ঘ্যের স্ট্রিং আর প্রতিটি প্রিফিক্স বা অবস্থানের জন্য উত্তর।'),
    L('Comparing substrings of one string quickly (equal? which is smaller?): hashing or a suffix array with a range-minimum structure over LCP.', 'একই স্ট্রিংয়ের সাবস্ট্রিং দ্রুত তুলনা (সমান? কোনটি ছোট?): হ্যাশিং বা LCP-র ওপর রেঞ্জ-মিনিমাম স্ট্রাকচারসহ সাফিক্স অ্যারে।'),
  ],
  patterns: [
    {
      name: L('Prefix function and borders', 'প্রিফিক্স ফাংশন ও বর্ডার'),
      explain: [
        L('pi[i] is the length of the longest proper prefix of s[0..i] that is also a suffix of it. Following pi from the end visits every border of the string, from longest to shortest, so the periods are n − border. Pushing counts along the same links tells how many times each prefix occurs in the string.', 'pi[i] হলো s[0..i]-র সবচেয়ে বড় প্রকৃত প্রিফিক্সের দৈর্ঘ্য যা তার সাফিক্সও। শেষ থেকে pi ধরে চললে স্ট্রিংয়ের প্রতিটি বর্ডার দীর্ঘতম থেকে ক্ষুদ্রতম ক্রমে মেলে, আর পর্যায় = n − বর্ডার। একই লিংক ধরে গণনা ঠেললে বোঝা যায় প্রতিটি প্রিফিক্স স্ট্রিংয়ে কতবার আছে।'),
      ],
      code: raw`vector<int> prefixFunction(const string& s) {
    int n = s.size();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) k = pi[k - 1];
        if (s[i] == s[k]) k++;
        pi[i] = k;
    }
    return pi;
}

// occurrences of every prefix: occ[len] = how many times the prefix of length len occurs in s
vector<long long> prefixOccurrences(const string& s) {
    int n = s.size();
    auto pi = prefixFunction(s);
    vector<long long> occ(n + 1, 0);
    for (int i = 0; i < n; i++) occ[pi[i]]++;
    for (int len = n - 1; len > 0; len--) occ[pi[len - 1]] += occ[len];
    for (int len = 0; len <= n; len++) occ[len]++;     // the prefix itself
    occ[0] = 0;
    return occ;
}`,
      example: { problem: '432D', text: L('Prefixes and Suffixes: the prefixes that are also suffixes are exactly the borders reached by following pi from the last position (plus the whole string). For each of them, prefixOccurrences gives how many times it occurs in the string.', 'Prefixes and Suffixes: যেসব প্রিফিক্স সাফিক্সও, তারা ঠিক শেষ অবস্থান থেকে pi ধরে পাওয়া বর্ডার (আর পুরো স্ট্রিং)। প্রতিটির জন্য prefixOccurrences বলে স্ট্রিংয়ে সে কতবার আছে।') },
    },
    {
      name: L('Z-function', 'Z-ফাংশন'),
      explain: [
        L('z[i] is the length of the longest common prefix of s and the suffix s[i..]. It answers “does the prefix of length L occur at position i?” in O(1) after O(n) preprocessing. Compared to the prefix function it is easier to use when you compare a pattern with many positions of a text (glue them with a separator).', 'z[i] হলো s ও সাফিক্স s[i..]-এর সবচেয়ে বড় সাধারণ প্রিফিক্সের দৈর্ঘ্য। O(n) প্রি-প্রসেসিংয়ের পর এটি “L দৈর্ঘ্যের প্রিফিক্স কি অবস্থান i-তে আছে?” প্রশ্নের উত্তর O(1)-এ দেয়। প্রিফিক্স ফাংশনের তুলনায় এটি সহজ যখন প্যাটার্নকে টেক্সটের অনেক অবস্থানের সাথে তুলনা করতে হয় (বিভাজক দিয়ে জোড়া লাগাও)।'),
      ],
      code: raw`vector<int> zFunction(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}

// all start positions of pattern p in text t
vector<int> findAll(const string& p, const string& t) {
    string glued = p + char(1) + t;
    auto z = zFunction(glued);
    vector<int> at;
    for (int i = p.size() + 1; i < (int)glued.size(); i++)
        if (z[i] >= (int)p.size()) at.push_back(i - p.size() - 1);
    return at;
}`,
      example: { problem: '1200E', text: L('Compress Words: merging a new word into the result needs the longest suffix of the result that is a prefix of the word. Only the last |word| characters of the result matter, so run the prefix function on word + separator + (that tail) and read its last value: the total work is linear in the sum of word lengths.', 'Compress Words: ফলাফলে নতুন শব্দ মেলাতে ফলাফলের সবচেয়ে বড় সাফিক্স লাগে যা শব্দের প্রিফিক্স। ফলাফলের শুধু শেষ |শব্দ| অক্ষর গুরুত্বপূর্ণ, তাই শব্দ + বিভাজক + (সেই শেষ অংশ)-এ প্রিফিক্স ফাংশন চালাও এবং তার শেষ মান পড়ো: মোট কাজ শব্দের দৈর্ঘ্যের যোগফলের সমানুপাতিক।') },
    },
    {
      name: L('Suffix array with LCP', 'LCP-সহ সাফিক্স অ্যারে'),
      explain: [
        L('Sort all suffixes by doubling: after step k, suffixes are ranked by their first 2ᵏ characters; sorting by (rank[i], rank[i + 2ᵏ]) gives the next rank. With radix or std::sort this is O(n log² n), enough for 10⁵ to 2·10⁵. Kasai’s algorithm then builds lcp[i] (between neighbours in sorted order) in O(n) by noting that the LCP drops by at most one when moving from a suffix to the next one in text order.', 'দ্বিগুণ করে সব সাফিক্স সাজাও: k ধাপের পর সাফিক্স তাদের প্রথম ২ᵏ অক্ষর দিয়ে র‍্যাঙ্ক হয়; (rank[i], rank[i + ২ᵏ]) দিয়ে সাজালে পরের র‍্যাঙ্ক মেলে। রেডিক্স বা std::sort দিয়ে এটি O(n log² n), ১০⁵ থেকে ২·১০⁵-এর জন্য যথেষ্ট। তারপর Kasai অ্যালগরিদম O(n)-এ lcp[i] (সাজানো ক্রমে পাশাপাশি দুটির) বানায়, এই পর্যবেক্ষণে যে টেক্সট ক্রমে এক সাফিক্স থেকে পরেরটিতে গেলে LCP সর্বোচ্চ এক কমে।'),
        L('Number of distinct substrings = n(n + 1)/2 − Σ lcp. The longest repeated substring is the maximum lcp. A substring occurs exactly in a contiguous block of the suffix array, found with binary search.', 'ভিন্ন সাবস্ট্রিংয়ের সংখ্যা = n(n + ১)/২ − Σ lcp। দীর্ঘতম পুনরাবৃত্ত সাবস্ট্রিং হলো সর্বোচ্চ lcp। কোনো সাবস্ট্রিং সাফিক্স অ্যারের একটি ক্রমাগত ব্লকে আছে, যা বাইনারি সার্চে মেলে।'),
      ],
      code: raw`vector<int> suffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rk(n), tmp(n);
    iota(sa.begin(), sa.end(), 0);
    for (int i = 0; i < n; i++) rk[i] = s[i];
    for (int k = 1;; k <<= 1) {
        auto cmp = [&](int a, int b) {
            if (rk[a] != rk[b]) return rk[a] < rk[b];
            int ra = a + k < n ? rk[a + k] : -1, rb = b + k < n ? rk[b + k] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) tmp[sa[i]] = tmp[sa[i - 1]] + cmp(sa[i - 1], sa[i]);
        rk = tmp;
        if (rk[sa[n - 1]] == n - 1) break;
    }
    return sa;
}

// lcp[i] = common prefix length of suffixes sa[i] and sa[i + 1]
vector<int> buildLcp(const string& s, const vector<int>& sa) {
    int n = s.size(), h = 0;
    vector<int> rank(n), lcp(max(0, n - 1), 0);
    for (int i = 0; i < n; i++) rank[sa[i]] = i;
    for (int i = 0; i < n; i++) {
        if (rank[i] + 1 < n) {
            int j = sa[rank[i] + 1];
            while (i + h < n && j + h < n && s[i + h] == s[j + h]) h++;
            lcp[rank[i]] = h;
            if (h > 0) h--;
        } else h = 0;
    }
    return lcp;
}

long long distinctSubstrings(const string& s) {
    auto sa = suffixArray(s);
    auto lcp = buildLcp(s, sa);
    long long n = s.size(), total = n * (n + 1) / 2;
    for (int x : lcp) total -= x;
    return total;
}`,
      example: { problem: '126B', text: L('Password: the answer is the longest border that also occurs strictly inside the string. With L = pi[n − 1], a border of length L occurs inside exactly when some pi[i] ≥ L for i < n − 1; if not, the next border pi[L − 1] always occurs inside (as a suffix of the prefix of length L), so it is the answer when non-zero.', 'Password: উত্তর হলো সবচেয়ে বড় বর্ডার যা স্ট্রিংয়ের ভেতরেও কঠোরভাবে আছে। L = pi[n − ১] হলে L দৈর্ঘ্যের বর্ডার ভেতরে আছে ঠিক তখনই যখন কোনো i < n − ১-এর জন্য pi[i] ≥ L; না হলে পরের বর্ডার pi[L − ১] সবসময় ভেতরে আছে (L দৈর্ঘ্যের প্রিফিক্সের সাফিক্স হিসেবে), তাই তা শূন্য না হলে সেটিই উত্তর।') },
    },
    {
      name: L('Suffix automaton', 'সাফিক্স অটোমেটন'),
      explain: [
        L('The suffix automaton has at most 2n states. Each state stands for a set of substrings with the same set of end positions; len is the longest of them, and link points to the state of the longest suffix with a bigger end set. The number of distinct substrings is Σ (len[v] − len[link[v]]) over states. Counts of occurrences are found by marking the non-clone states with 1 and summing along the links from the longest to the shortest.', 'সাফিক্স অটোমেটনে সর্বোচ্চ ২n অবস্থা। প্রতিটি অবস্থা একই শেষ-অবস্থানের সেটসহ একদল সাবস্ট্রিংকে বোঝায়; len তাদের মধ্যে দীর্ঘতম, আর link বড় শেষ-সেটসহ দীর্ঘতম সাফিক্সের অবস্থার দিকে ইঙ্গিত করে। ভিন্ন সাবস্ট্রিংয়ের সংখ্যা হলো সব অবস্থার Σ (len[v] − len[link[v]])। উপস্থিতির সংখ্যা বের হয় ক্লোন নয় এমন অবস্থায় ১ বসিয়ে দীর্ঘতম থেকে ক্ষুদ্রতম ক্রমে লিংক ধরে যোগ করে।'),
      ],
      code: raw`struct SuffixAutomaton {
    struct State { int len, link; array<int, 26> next; long long cnt; };
    vector<State> st;
    int last;
    SuffixAutomaton() {
        st.push_back({0, -1, {}, 0});
        st[0].next.fill(-1);
        last = 0;
    }
    void extend(char ch) {
        int c = ch - 'a', cur = st.size();
        st.push_back({st[last].len + 1, 0, {}, 1});
        st[cur].next.fill(-1);
        int p = last;
        while (p != -1 && st[p].next[c] == -1) { st[p].next[c] = cur; p = st[p].link; }
        if (p == -1) st[cur].link = 0;
        else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) st[cur].link = q;
            else {
                int clone = st.size();
                st.push_back(st[q]);
                st[clone].len = st[p].len + 1;
                st[clone].cnt = 0;
                while (p != -1 && st[p].next[c] == q) { st[p].next[c] = clone; p = st[p].link; }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }
    // fills cnt with the number of occurrences of the substrings in every state
    void countOccurrences() {
        vector<int> order(st.size());
        iota(order.begin(), order.end(), 0);
        sort(order.begin(), order.end(), [&](int a, int b) { return st[a].len > st[b].len; });
        for (int v : order) if (st[v].link >= 0) st[st[v].link].cnt += st[v].cnt;
    }
    long long distinct() const {
        long long total = 0;
        for (size_t v = 1; v < st.size(); v++) total += st[v].len - st[st[v].link].len;
        return total;
    }
};`,
      example: { text: L('“Find the substring maximising occurrences × length.” After countOccurrences, every state v represents its longest substring of length len[v] with cnt[v] occurrences, so the answer is the maximum of len[v] · cnt[v] over all states.', '“যে সাবস্ট্রিংয়ের উপস্থিতি × দৈর্ঘ্য সর্বোচ্চ তা খুঁজো।” countOccurrences-এর পর প্রতিটি অবস্থা v তার দীর্ঘতম সাবস্ট্রিং (দৈর্ঘ্য len[v]) আর cnt[v] উপস্থিতি বোঝায়, তাই উত্তর হলো সব অবস্থায় len[v] · cnt[v]-এর সর্বোচ্চ।') },
    },
    {
      name: L('Hashing with binary search', 'হ্যাশিং ও বাইনারি সার্চ'),
      explain: [
        L('When the structure is only used to compare substrings, a polynomial hash is shorter: precompute prefix hashes and powers, then the hash of any substring is O(1), and an LCP of two positions is found by binary search on the length. Use a 64-bit modulus such as 2⁶¹ − 1, or two moduli, and a random base so that anti-hash tests cannot target you.', 'যখন কাঠামোটি শুধু সাবস্ট্রিং তুলনায় লাগে, পলিনোমিয়াল হ্যাশ ছোট: প্রিফিক্স হ্যাশ ও ঘাত আগে বের করো, তারপর যেকোনো সাবস্ট্রিংয়ের হ্যাশ O(1), আর দুই অবস্থানের LCP দৈর্ঘ্যের ওপর বাইনারি সার্চে মেলে। ২⁶¹ − ১-এর মতো ৬৪-বিট মডুলাস বা দুটি মডুলাস নাও, আর এলোমেলো বেস নাও যাতে অ্যান্টি-হ্যাশ টেস্ট তোমাকে টার্গেট করতে না পারে।'),
      ],
      code: raw`struct Hasher {
    static const unsigned long long M = (1ULL << 61) - 1;
    vector<unsigned long long> h, pw;
    static unsigned long long mul(unsigned long long a, unsigned long long b) {
        __uint128_t t = (__uint128_t)a * b;
        unsigned long long r = (unsigned long long)(t & M) + (unsigned long long)(t >> 61);
        return r >= M ? r - M : r;
    }
    Hasher(const string& s, unsigned long long base) : h(s.size() + 1, 0), pw(s.size() + 1, 1) {
        for (size_t i = 0; i < s.size(); i++) {
            h[i + 1] = mul(h[i], base) + (unsigned char)s[i];
            if (h[i + 1] >= M) h[i + 1] -= M;
            pw[i + 1] = mul(pw[i], base);
        }
    }
    unsigned long long get(int l, int r) const {            // hash of s[l, r)
        unsigned long long x = h[r] + M - mul(h[l], pw[r - l]);
        return x >= M ? x - M : x;
    }
    int lcp(int i, int j, int limit) const {                 // longest common prefix of s[i..] and s[j..]
        int lo = 0, hi = limit;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (get(i, i + mid) == get(j, j + mid)) lo = mid; else hi = mid - 1;
        }
        return lo;
    }
};`,
      example: { problem: '514C', text: L('Watto and Mechanism: changing one letter changes the hash by one term, so for each query all 2·|q| one-mistake neighbours are hashed in O(1) each and looked up in a set of stored hashes. No suffix structure is needed: this is the case where hashing is the right tool.', 'Watto and Mechanism: একটি অক্ষর বদলালে হ্যাশ একটি পদে বদলায়, তাই প্রতিটি কোয়েরির সব ২·|q| এক-ভুল প্রতিবেশীর হ্যাশ প্রতিটি O(1)-এ বের করে সংরক্ষিত হ্যাশের সেটে খোঁজা হয়। কোনো সাফিক্স স্ট্রাকচার লাগে না: এটি সেই ক্ষেত্র যেখানে হ্যাশিংই সঠিক হাতিয়ার।') },
    },
  ],
  mistakes: [
    L('Using a fixed small modulus and base for hashing: anti-hash tests exist. Randomise the base and use 2⁶¹ − 1 or two moduli.', 'হ্যাশিংয়ে নির্দিষ্ট ছোট মডুলাস ও বেস: অ্যান্টি-হ্যাশ টেস্ট আছে। বেস এলোমেলো করো এবং ২⁶¹ − ১ বা দুটি মডুলাস নাও।'),
    L('Forgetting that the suffix automaton needs clones: the number of states is up to 2n, not n.', 'সাফিক্স অটোমেটনে ক্লোন লাগে ভুলে যাওয়া: অবস্থার সংখ্যা n নয়, সর্বোচ্চ ২n।'),
    L('Mixing up prefix function borders with periods: a period is n − border, and the string is a repetition only when the period divides n.', 'প্রিফিক্স ফাংশনের বর্ডার আর পর্যায় গুলিয়ে ফেলা: পর্যায় = n − বর্ডার, আর স্ট্রিং পুনরাবৃত্তি তখনই যখন পর্যায় n-কে ভাগ করে।'),
    L('Using a separator character that can appear in the input when gluing strings; pick one outside the alphabet.', 'স্ট্রিং জোড়ার সময় ইনপুটে আসতে পারে এমন বিভাজক অক্ষর ব্যবহার; বর্ণমালার বাইরের একটি নাও।'),
    L('Sorting suffixes with a comparator that is O(n): the suffix array must use rank doubling, otherwise it is O(n² log n).', 'O(n) তুলনাকারী দিয়ে সাফিক্স সাজানো: সাফিক্স অ্যারেতে র‍্যাঙ্ক ডাবলিং লাগে, নইলে O(n² log n)।'),
  ],
  plan: [
    L('Start with the prefix function (126B, 432D) and be able to draw the border tree of any string.', 'প্রিফিক্স ফাংশন দিয়ে শুরু করো (১২৬B, ৪৩২D) এবং যেকোনো স্ট্রিংয়ের বর্ডার ট্রি আঁকতে পারো।'),
    L('Learn the Z-function and the overlap trick through Compress Words (1200E), then use the same machinery on the middle part of Prefix-Suffix Palindrome (1326D2).', 'Compress Words (১২০০E) দিয়ে Z-ফাংশন ও ওভারল্যাপ কৌশল শেখো, তারপর Prefix-Suffix Palindrome (১৩২৬D২)-এর মাঝের অংশে একই যন্ত্র ব্যবহার করো।'),
    L('Learn hashing with binary search (514C) and when it replaces a suffix structure.', 'বাইনারি সার্চসহ হ্যাশিং শেখো (৫১৪C) এবং কখন তা সাফিক্স স্ট্রাকচারের বদলে চলে।'),
    L('Write a suffix array with LCP and a suffix automaton from memory, and test both against brute-force counting of distinct substrings.', 'সাফিক্স অ্যারে ও LCP এবং সাফিক্স অটোমেটন মুখস্থ লেখো, আর ভিন্ন সাবস্ট্রিংয়ের ব্রুট-ফোর্স গণনার সাথে দুটিই মিলাও।'),
  ],
};

// ───────────────────────────────────────────────────────── parsing
export const parsingGuideDeep: TagGuide = {
  slug: 'parsing',
  intro: [
    L(
      'Parsing problems hand you a string with structure, such as an expression, a type, a bracket sequence, a date, a path, a tiny programming language, and ask you to evaluate it, check it, convert it or count something about it. The difficulty is rarely clever mathematics; it is turning the structure into code that does not drift out of sync with the grammar.',
      'পার্সিং সমস্যা কাঠামোযুক্ত একটি স্ট্রিং দেয়, যেমন রাশি, টাইপ, ব্র্যাকেট সিকোয়েন্স, তারিখ, পাথ, ছোট একটি প্রোগ্রামিং ভাষা, আর সেটি মূল্যায়ন, যাচাই, রূপান্তর বা কিছু গোনার কাজ দেয়। কঠিন অংশ খুব কমই চতুর গণিত; আসল চ্যালেঞ্জ কাঠামোকে এমন কোডে রূপ দেওয়া যা ব্যাকরণ থেকে সরে যায় না।',
    ),
    L(
      'Three tools cover almost everything. A stack handles nesting without recursion (brackets, undo, matching). Recursive descent writes one function per grammar rule and calls them in precedence order, so operator priority is built into the code’s shape. A tokenizer or a position pointer (an index that all functions share) keeps the input handling separate from the logic.',
      'তিনটি হাতিয়ার প্রায় সব কিছু ঢাকে। স্ট্যাক রিকার্সন ছাড়া নেস্টিং সামলায় (ব্র্যাকেট, আনডু, ম্যাচিং)। রিকার্সিভ ডিসেন্ট প্রতিটি ব্যাকরণ নিয়মের জন্য একটি ফাংশন লেখে এবং অগ্রাধিকার ক্রমে তাদের ডাকে, তাই অপারেটরের অগ্রাধিকার কোডের আকারেই ঢুকে থাকে। টোকেনাইজার বা পজিশন পয়েন্টার (সব ফাংশনের ভাগ করা একটি সূচক) ইনপুট সামলানোকে লজিক থেকে আলাদা রাখে।',
    ),
  ],
  recognize: [
    L('An expression with + − × ÷ and parentheses to evaluate, or to check for validity.', 'মূল্যায়ন বা বৈধতা যাচাইয়ের জন্য + − × ÷ ও প্রথম বন্ধনীসহ রাশি।'),
    L('A string that is a nested structure (types, tags, JSON-like, bracket sequences) and a question about depth, matching or conversion.', 'নেস্টেড কাঠামোর স্ট্রিং (টাইপ, ট্যাগ, JSON-এর মতো, ব্র্যাকেট সিকোয়েন্স) আর গভীরতা, ম্যাচিং বা রূপান্তরের প্রশ্ন।'),
    L('Input in an unusual format: times “hh:mm”, dates, paths with “..”, commands, lines of different shapes.', 'অস্বাভাবিক ফরম্যাটের ইনপুট: সময় “hh:mm”, তারিখ, “..”সহ পাথ, কমান্ড, ভিন্ন আকৃতির লাইন।'),
    L('A mini language: “a program of statements, run it for these inputs”.', 'ছোট ভাষা: “বিবৃতির একটি প্রোগ্রাম, এই ইনপুটে চালাও”।'),
  ],
  patterns: [
    {
      name: L('Recursive descent for expressions', 'রাশির জন্য রিকার্সিভ ডিসেন্ট'),
      explain: [
        L('Write the grammar first. expression = term { (+ | −) term }, term = factor { (× | ÷) factor }, factor = number | “(” expression “)” | “−” factor. One function per line; each function consumes characters through a shared position index and returns a value. Operator priority is automatic because a term is built entirely from factors before the expression sees a +.', 'আগে ব্যাকরণ লেখো। expression = term { (+ | −) term }, term = factor { (× | ÷) factor }, factor = সংখ্যা | “(” expression “)” | “−” factor। প্রতি লাইনে একটি ফাংশন; প্রতিটি ফাংশন ভাগ করা পজিশন সূচক দিয়ে অক্ষর খায় এবং একটি মান ফেরত দেয়। অগ্রাধিকার স্বয়ংক্রিয়, কারণ expression একটি + দেখার আগে term পুরোপুরি factor দিয়ে তৈরি হয়ে যায়।'),
      ],
      code: raw`struct Parser {
    const string& s;
    size_t pos = 0;
    Parser(const string& s) : s(s) {}
    char peek() { return pos < s.size() ? s[pos] : '\0'; }
    long long number() {
        long long v = 0;
        while (isdigit(peek())) v = v * 10 + (s[pos++] - '0');
        return v;
    }
    long long factor() {
        if (peek() == '-') { pos++; return -factor(); }
        if (peek() == '(') { pos++; long long v = expression(); pos++; return v; }   // skip ')'
        return number();
    }
    long long term() {
        long long v = factor();
        while (peek() == '*' || peek() == '/') {
            char op = s[pos++];
            long long r = factor();
            v = op == '*' ? v * r : v / r;
        }
        return v;
    }
    long long expression() {
        long long v = term();
        while (peek() == '+' || peek() == '-') {
            char op = s[pos++];
            long long r = term();
            v = op == '+' ? v + r : v - r;
        }
        return v;
    }
};

long long evaluate(const string& expr) { Parser p(expr); return p.expression(); }`,
      example: { problem: '552E', text: L('Vanya and Brackets: the string has only digits, + and ×, and you add one pair of brackets to maximise the value. Only positions next to a × (or the ends) are worth trying, and each candidate is evaluated with a small stack evaluator in linear time. The evaluator is the recursive-descent idea without recursion: keep a running sum and a running product.', 'Vanya and Brackets: স্ট্রিংয়ে শুধু অঙ্ক, + ও ×, আর মান সর্বোচ্চ করতে এক জোড়া বন্ধনী বসাতে হয়। শুধু × (বা প্রান্ত)-এর পাশের অবস্থান চেষ্টা করা সার্থক, আর প্রতিটি প্রার্থী ছোট স্ট্যাক ইভ্যালুয়েটর দিয়ে রৈখিক সময়ে মূল্যায়ন হয়। ইভ্যালুয়েটরটি রিকার্সন ছাড়া রিকার্সিভ-ডিসেন্ট ধারণা: একটি চলতি যোগফল ও একটি চলতি গুণফল রাখো।') },
    },
    {
      name: L('Parsing nested structures (types, tags)', 'নেস্টেড কাঠামো পার্সিং (টাইপ, ট্যাগ)'),
      explain: [
        L('A grammar such as type = “int” | “pair” “<” type “,” type “>” is read by a function that consumes tokens left to right: it reads a word, and if the word needs children it calls itself for each. The output is built while unwinding the recursion, so punctuation is added exactly where the grammar says. If the input does not fit, the function reports failure by returning false or throwing an exception.', 'type = “int” | “pair” “<” type “,” type “>” ধরনের ব্যাকরণ এমন ফাংশনে পড়া হয় যা বাঁ থেকে ডানে টোকেন খায়: সে একটি শব্দ পড়ে, আর শব্দের সন্তান লাগলে প্রতিটির জন্য নিজেকে ডাকে। আউটপুট রিকার্সন গুটানোর সময় বানানো হয়, তাই যতিচিহ্ন ঠিক ব্যাকরণ যেখানে বলে সেখানে বসে। ইনপুট না মিললে ফাংশন false ফেরত দিয়ে বা এক্সেপশন ছুড়ে ব্যর্থতা জানায়।'),
      ],
      code: raw`// tokens: "pair" and "int" only; returns the type written with <, > and commas, or "" if invalid
struct TypeReader {
    vector<string> tok;
    size_t at = 0;
    bool ok = true;
    string read() {
        if (at >= tok.size()) { ok = false; return ""; }
        string w = tok[at++];
        if (w == "int") return "int";
        if (w != "pair") { ok = false; return ""; }
        string left = read();
        string right = read();
        if (!ok) return "";
        return "pair<" + left + "," + right + ">";
    }
    string parse(const vector<string>& tokens) {
        tok = tokens; at = 0; ok = true;
        string res = read();
        if (!ok || at != tok.size()) return "Error occurred";
        return res;
    }
};`,
      example: { problem: '190C', text: L('STL: the input lists the words of a type in order without any brackets (pair pair int int int). A function that reads one word, and calls itself twice after “pair”, consumes the sequence exactly. If words are left over or run out, print “Error occurred”.', 'STL: ইনপুটে একটি টাইপের শব্দগুলো ক্রমে দেওয়া, কোনো বন্ধনী ছাড়া (pair pair int int int)। একটি শব্দ পড়ে “pair”-এর পর নিজেকে দুবার ডাকা ফাংশন ক্রমটি ঠিক খেয়ে ফেলে। শব্দ বাকি থাকলে বা কম পড়লে “Error occurred” প্রিন্ট করো।') },
    },
    {
      name: L('Stack for nesting and brackets', 'নেস্টিং ও ব্র্যাকেটের জন্য স্ট্যাক'),
      explain: [
        L('A stack of open brackets validates a sequence with several bracket kinds: push on open; on close, the top must be the matching opener. For sequences with only one kind, the balance (a counter) is enough: it must never drop below zero and must end at zero. For “fix the sequence with the fewest changes”, track the minimum prefix balance and the final balance.', 'খোলা ব্র্যাকেটের স্ট্যাক একাধিক ধরনের ব্র্যাকেটসহ সিকোয়েন্স যাচাই করে: খোলায় পুশ; বন্ধে স্ট্যাকের মাথা অবশ্যই মিলে যাওয়া খোলা ব্র্যাকেট হতে হবে। একই ধরনের ব্র্যাকেটে ব্যালেন্স (একটি কাউন্টার) যথেষ্ট: তা কখনও শূন্যের নিচে নামবে না আর শেষে শূন্য হবে। “ন্যূনতম পরিবর্তনে ঠিক করো”-র জন্য ন্যূনতম প্রিফিক্স ব্যালেন্স আর শেষ ব্যালেন্স দেখো।'),
      ],
      code: raw`bool balanced(const string& s) {
    string stack;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') stack.push_back(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (stack.empty()) return false;
            char open = stack.back();
            if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
            stack.pop_back();
        }
    }
    return stack.empty();
}

// minimum single-character flips to make a '(' / ')' string balanced, or -1 if impossible
int minFlips(const string& s) {
    if (s.size() % 2) return -1;
    int open = 0, flips = 0;
    for (char c : s) {
        if (c == '(') open++;
        else if (open > 0) open--;
        else { flips++; open++; }             // flip this ')' to '('
    }
    return flips + open / 2;
}`,
      example: { problem: '380C', text: L('Sereja and Brackets: for a substring, the largest balanced subsequence is found by matching as many pairs as possible. A segment tree whose node keeps (matched pairs, unmatched closes, unmatched opens) merges two children in O(1): the new matches are min(left opens, right closes). The stack logic becomes a mergeable summary.', 'Sereja and Brackets: কোনো সাবস্ট্রিংয়ে সবচেয়ে বড় ব্যালেন্সড সাবসিকোয়েন্স পাওয়া যায় যতটা সম্ভব জোড়া মিলিয়ে। সেগমেন্ট ট্রির প্রতিটি নোড (মেলানো জোড়া, অমেলা বন্ধ, অমেলা খোলা) রাখলে দুই সন্তানকে O(1)-এ মেলানো যায়: নতুন মিল = min(বামের খোলা, ডানের বন্ধ)। স্ট্যাকের যুক্তি মেলানোযোগ্য সারাংশ হয়ে যায়।') },
    },
    {
      name: L('Tokenizing and line formats', 'টোকেনাইজিং ও লাইন ফরম্যাট'),
      explain: [
        L('Before logic, separate the string into pieces. For whitespace-separated words read with cin or stringstream; for formats with fixed punctuation (“hh:mm”, “a.b.c”, “key=value;”) split on the delimiter with a small helper. Convert times and dates to a single integer (minutes since midnight, days since the first day) immediately, so every later step is plain arithmetic.', 'লজিকের আগে স্ট্রিংকে টুকরো করো। ফাঁকা দিয়ে আলাদা শব্দ cin বা stringstream দিয়ে পড়ো; নির্দিষ্ট যতিচিহ্নের ফরম্যাটে (“hh:mm”, “a.b.c”, “key=value;”) ছোট একটি সহায়ক দিয়ে ডিলিমিটারে ভাঙো। সময় ও তারিখ সঙ্গে সঙ্গে একটি পূর্ণসংখ্যায় (মধ্যরাত থেকে মিনিট, প্রথম দিন থেকে দিন) বদলে ফেলো, যাতে পরের সব ধাপ সাধারণ গাণিতিক হিসাব হয়।'),
      ],
      code: raw`vector<string> splitBy(const string& s, char delim) {
    vector<string> parts;
    string cur;
    for (char c : s) {
        if (c == delim) { parts.push_back(cur); cur.clear(); }
        else cur.push_back(c);
    }
    parts.push_back(cur);
    return parts;
}

// "hh:mm" -> minutes since midnight
int parseClock(const string& t) {
    auto p = splitBy(t, ':');
    return stoi(p[0]) * 60 + stoi(p[1]);
}

// canonical path: resolves "." and ".." components of an absolute path
string canonicalPath(const string& path) {
    vector<string> stack;
    for (auto& part : splitBy(path, '/')) {
        if (part.empty() || part == ".") continue;
        if (part == "..") { if (!stack.empty()) stack.pop_back(); }
        else stack.push_back(part);
    }
    string res;
    for (auto& part : stack) res += "/" + part;
    return res.empty() ? "/" : res;
}`,
      example: { text: L('Typical contest forms: “given log lines hh:mm:ss message, find the first minute when …” (convert to seconds, then a sliding window), “normalise a path” (the stack above), “evaluate a command list on a toy machine” (a switch on the first token).', 'সাধারণ কনটেস্ট রূপ: “লগ লাইন hh:mm:ss বার্তা দেওয়া, প্রথম যে মিনিটে … তা খুঁজো” (সেকেন্ডে বদলাও, তারপর স্লাইডিং উইন্ডো), “পাথ স্বাভাবিক করো” (উপরের স্ট্যাক), “খেলনা মেশিনে কমান্ড তালিকা চালাও” (প্রথম টোকেনে সুইচ)।') },
    },
  ],
  mistakes: [
    L('Handling operator priority with a pile of special cases: write the grammar and one function per rule instead.', 'অপারেটর অগ্রাধিকার একগাদা বিশেষ ক্ষেত্র দিয়ে সামলানো: বদলে ব্যাকরণ লেখো আর প্রতি নিয়মে একটি ফাংশন।'),
    L('Left-associative operators evaluated right to left (a − b − c computed as a − (b − c)): use a loop, not recursion on the right side.', 'বাম-সংযোজী অপারেটর ডান থেকে বাঁয়ে মূল্যায়ন (a − b − c হয়ে যায় a − (b − c)): ডান পাশে রিকার্সনের বদলে লুপ ব্যবহার করো।'),
    L('Integer division and modulo with negative numbers: C++ truncates toward zero, and the problem may want floor division.', 'ঋণাত্মক সংখ্যায় পূর্ণসংখ্যার ভাগ ও মডুলো: C++ শূন্যের দিকে ছাঁটে, আর সমস্যা ফ্লোর ভাগ চাইতে পারে।'),
    L('Reading past the end of the string: every peek must be safe, and the main call must check that the whole input was consumed.', 'স্ট্রিংয়ের শেষ পেরিয়ে পড়া: প্রতিটি peek নিরাপদ হতে হবে, আর মূল কলে দেখতে হবে পুরো ইনপুট খাওয়া হয়েছে।'),
    L('Recursion depth on a 10⁵-long string of nested brackets: use an explicit stack instead.', '১০⁵ দৈর্ঘ্যের নেস্টেড ব্র্যাকেটের স্ট্রিংয়ে রিকার্সনের গভীরতা: বদলে সুস্পষ্ট স্ট্যাক নাও।'),
  ],
  plan: [
    L('Write the expression parser above and test it on tricky strings (a − b − c, −(−3), 2 × (3 + 4) × 5).', 'উপরের রাশি পার্সার লেখো এবং জটিল স্ট্রিংয়ে পরীক্ষা করো (a − b − c, −(−৩), ২ × (৩ + ৪) × ৫)।'),
    L('Do STL (190C) for grammar-driven recursion and Vanya and Brackets (552E) for evaluating many variants fast.', 'ব্যাকরণ-চালিত রিকার্সনের জন্য STL (১৯০C) এবং অনেক রূপ দ্রুত মূল্যায়নের জন্য Vanya and Brackets (৫৫২E) করো।'),
    L('Practise bracket sequences with a stack and a balance counter, then Sereja and Brackets (380C) for the segment-tree version.', 'স্ট্যাক ও ব্যালেন্স কাউন্টার দিয়ে ব্র্যাকেট সিকোয়েন্সের অনুশীলন করো, তারপর সেগমেন্ট-ট্রি রূপের জন্য Sereja and Brackets (৩৮০C)।'),
    L('Finish with format-heavy implementation problems (times, dates, paths) where the whole task is the parse.', 'ফরম্যাট-ভারী ইমপ্লিমেন্টেশন সমস্যা (সময়, তারিখ, পাথ) দিয়ে শেষ করো, যেখানে পার্সই পুরো কাজ।'),
  ],
};

// ───────────────────────────────────────────────────────── schedules
export const schedulesGuideDeep: TagGuide = {
  slug: 'schedules',
  intro: [
    L(
      'Scheduling problems order tasks or place them on machines in time. Each task has a duration, maybe a start window, a deadline, a weight, or a rest period, and the question is how many tasks you can fit, what the cheapest order is, or how many machines you need. The solutions are almost always a sort followed by a greedy rule, and the proof is an exchange argument: if two neighbours are out of order, swapping them never hurts.',
      'শিডিউলিং সমস্যা কাজগুলোকে সময়ে সাজায় বা মেশিনে বসায়। প্রতিটি কাজের সময়কাল, হয়তো শুরুর জানালা, ডেডলাইন, ওজন বা বিশ্রামের সময় আছে, আর প্রশ্ন হয় কতগুলো কাজ ধরানো যায়, সবচেয়ে সস্তা ক্রম কী, বা কত মেশিন লাগে। সমাধান প্রায় সবসময় একটি সর্টের পর গ্রিডি নিয়ম, আর প্রমাণ এক্সচেঞ্জ যুক্তি: দুটি প্রতিবেশী ভুল ক্রমে থাকলে অদলবদল কখনও ক্ষতি করে না।',
    ),
    L(
      'The one decision that matters is the sort key. Earliest finish first for “most non-overlapping”, earliest deadline first for “nothing may be late”, largest ratio first for “minimum weighted completion”. A priority queue then handles the cases where you must regret an earlier choice: keep the chosen tasks in a heap, and when the schedule becomes infeasible throw out the worst one.',
      'গুরুত্বপূর্ণ একটিই সিদ্ধান্ত হলো সর্টের চাবি। “সবচেয়ে বেশি অ-ওভারল্যাপিং” হলে যেটি আগে শেষ হয় সেটি আগে, “কিছুই দেরি হবে না” হলে ডেডলাইন আগে, “ন্যূনতম ওজনযুক্ত সমাপ্তি” হলে সবচেয়ে বড় অনুপাত আগে। প্রায়োরিটি কিউ তখন সেই ক্ষেত্র সামলায় যেখানে আগের পছন্দ ফিরিয়ে নিতে হয়: বাছা কাজ হিপে রাখো, আর সময়সূচি অসম্ভব হলে সবচেয়ে খারাপটি ফেলে দাও।',
    ),
  ],
  recognize: [
    L('Tasks with start and end times and a question about the maximum count that do not overlap.', 'শুরু ও শেষের সময়সহ কাজ আর পরস্পর অ-ওভারল্যাপ সর্বোচ্চ সংখ্যার প্রশ্ন।'),
    L('Tasks with durations and deadlines: “can everything finish in time?”, “maximise profit of tasks finished by their deadline”.', 'সময়কাল ও ডেডলাইনসহ কাজ: “সব কি সময়মতো শেষ হবে?”, “ডেডলাইনের মধ্যে শেষ হওয়া কাজের লাভ সর্বাধিক করো”।'),
    L('“Minimum number of rooms/machines/workers so that nobody is double-booked.”', '“কেউ যাতে দুবার বুক না হয় সেজন্য ন্যূনতম কতটি ঘর/মেশিন/কর্মী।”'),
    L('Order of items matters through a cost that depends on the position: the best order comes from comparing two neighbours.', 'অবস্থানের ওপর নির্ভর করা খরচের মাধ্যমে জিনিসের ক্রম গুরুত্বপূর্ণ: সেরা ক্রম দুই প্রতিবেশীর তুলনা থেকে আসে।'),
  ],
  patterns: [
    {
      name: L('Maximum number of non-overlapping intervals', 'সর্বোচ্চ সংখ্যক অ-ওভারল্যাপিং ব্যবধান'),
      explain: [
        L('Sort by end time and take an interval whenever it starts at or after the end of the last one taken. Finishing early leaves the most room for the future, and any optimal solution can be changed to start with the earliest-finishing interval without losing a task. Be careful with the problem’s rule for touching endpoints (is [1, 3] followed by [3, 5] allowed?).', 'শেষের সময় ধরে সাজাও এবং যে ব্যবধান শেষ নেওয়াটির শেষের সমান বা পরে শুরু হয় সেটি নাও। আগে শেষ হলে ভবিষ্যতের জন্য সবচেয়ে বেশি জায়গা থাকে, আর যেকোনো সর্বোত্তম সমাধান কোনো কাজ না হারিয়ে সবচেয়ে আগে শেষ হওয়া ব্যবধান দিয়ে শুরু করা যায়। প্রান্ত ছোঁয়ার নিয়মে সতর্ক থাকো ([১, ৩]-এর পরে [৩, ৫] অনুমোদিত কি?)।'),
      ],
      code: raw`int maxNonOverlapping(vector<pair<int, int>> iv) {          // {start, end}, touching allowed
    sort(iv.begin(), iv.end(), [](auto& a, auto& b) { return a.second < b.second; });
    int count = 0, lastEnd = INT_MIN;
    for (auto [l, r] : iv)
        if (l >= lastEnd) { count++; lastEnd = r; }
    return count;
}`,
      example: { text: L('“Choose the most meetings in one room”: sort by end and sweep. Changing the rule to “touching is not allowed” only changes the test to l > lastEnd.', '“এক ঘরে সবচেয়ে বেশি মিটিং বাছো”: শেষ ধরে সাজাও এবং সুইপ করো। নিয়ম “ছোঁয়া অনুমোদিত নয়” হলে শুধু পরীক্ষা l > lastEnd হয়।') },
    },
    {
      name: L('Deadlines with profits (regret with a heap)', 'ডেডলাইনসহ লাভ (হিপ দিয়ে অনুশোচনা)'),
      explain: [
        L('Each task takes one unit of time and must be done by its deadline, and has a profit. Process tasks in order of deadline, push each profit onto a min-heap, and if the heap holds more tasks than the deadline allows, pop the smallest profit. At the end the heap is the best feasible set. The same “add, then drop the worst” pattern solves tasks with durations when you drop the longest one.', 'প্রতিটি কাজ এক একক সময় নেয়, ডেডলাইনের মধ্যে করতে হয়, আর লাভ আছে। ডেডলাইন ক্রমে কাজ প্রক্রিয়া করো, প্রতিটি লাভ মিন-হিপে ঠেলো, আর হিপে ডেডলাইন যতটা অনুমতি দেয় তার চেয়ে বেশি কাজ হলে সবচেয়ে ছোট লাভ বের করে ফেলো। শেষে হিপই সেরা সম্ভব সেট। একই “যোগ করো, তারপর সবচেয়ে খারাপটি ফেলো” ধরন সময়কালসহ কাজের জন্যও কাজ করে, তখন সবচেয়ে লম্বাটি ফেলতে হয়।'),
      ],
      code: raw`long long maxProfit(vector<pair<int, long long>> tasks) {    // {deadline, profit}, each task takes 1 unit
    sort(tasks.begin(), tasks.end());
    priority_queue<long long, vector<long long>, greater<long long>> heap;
    for (auto [deadline, profit] : tasks) {
        heap.push(profit);
        if ((int)heap.size() > deadline) heap.pop();
    }
    long long total = 0;
    while (!heap.empty()) { total += heap.top(); heap.pop(); }
    return total;
}

// tasks {duration, deadline}: the largest number that can all finish on time (one machine)
int maxOnTime(vector<pair<long long, long long>> tasks) {
    sort(tasks.begin(), tasks.end(), [](auto& a, auto& b) { return a.second < b.second; });
    priority_queue<long long> heap;                           // durations of chosen tasks
    long long time = 0;
    for (auto [d, deadline] : tasks) {
        heap.push(d);
        time += d;
        if (time > deadline) { time -= heap.top(); heap.pop(); }
    }
    return heap.size();
}`,
      example: { text: L('A standard task: each course has a length and a last day, and you want to take as many courses as possible. Sorting by last day and dropping the longest course whenever the running total exceeds the day is exactly maxOnTime.', 'একটি আদর্শ কাজ: প্রতিটি কোর্সের দৈর্ঘ্য ও শেষ দিন আছে, আর যতগুলো সম্ভব কোর্স নিতে হবে। শেষ দিন ধরে সাজানো আর চলতি যোগফল দিন ছাড়ালে সবচেয়ে লম্বা কোর্স ফেলে দেওয়া ঠিক maxOnTime।') },
    },
    {
      name: L('Minimising the maximum lateness (earliest deadline first)', 'সর্বোচ্চ দেরি কমানো (আগে ডেডলাইন)'),
      explain: [
        L('When all tasks must run and you want the largest lateness (finish − deadline) to be smallest, run them in order of increasing deadline. Swapping two neighbours that are in the opposite order never increases the maximum, because the one with the earlier deadline gets to finish earlier and the other still finishes at the same moment.', 'সব কাজ চালাতেই হবে এবং সর্বোচ্চ দেরি (শেষ − ডেডলাইন) সবচেয়ে ছোট চাইলে ডেডলাইন বাড়ার ক্রমে চালাও। উল্টো ক্রমে থাকা দুই প্রতিবেশী অদলবদল করলে সর্বোচ্চ কখনও বাড়ে না, কারণ আগের ডেডলাইনের কাজ আগে শেষ হয় আর অন্যটি একই মুহূর্তে শেষ হয়।'),
      ],
      code: raw`// lateness of a task is max(0, finish - deadline); returns the smallest possible maximum
long long minMaxLateness(vector<pair<long long, long long>> tasks) {  // {duration, deadline}
    sort(tasks.begin(), tasks.end(), [](auto& a, auto& b) { return a.second < b.second; });
    long long time = 0, worst = 0;
    for (auto [d, deadline] : tasks) {
        time += d;
        worst = max(worst, time - deadline);
    }
    return worst;
}`,
      example: { text: L('Tasks (duration 5, due 5) and (duration 1, due 2). Deadline order runs the short one first: finishes at 1 and 6, lateness −1 and +1, maximum 1. The other order finishes at 5 and 6, lateness 0 and +4, maximum 4. The deadline decides the order, not the duration.', 'কাজ (সময়কাল ৫, ডেডলাইন ৫) ও (সময়কাল ১, ডেডলাইন ২)। ডেডলাইন ক্রমে ছোটটি আগে: শেষ ১ ও ৬, দেরি −১ ও +১, সর্বোচ্চ ১। উল্টো ক্রমে শেষ ৫ ও ৬, দেরি ০ ও +৪, সর্বোচ্চ ৪। ক্রম ডেডলাইন ঠিক করে, সময়কাল নয়।') },
    },
    {
      name: L('Minimum number of machines (sweep with a heap)', 'ন্যূনতম মেশিন সংখ্যা (হিপসহ সুইপ)'),
      explain: [
        L('Sort the intervals by start time. Keep a min-heap of the end times of the machines that are busy. For the next interval, if the earliest-ending machine is free by its start, reuse it (pop), then push the new end. The heap size at the end is the number of machines; equivalently it is the maximum overlap at any single time, found with a sweep over events.', 'ব্যবধানগুলো শুরুর সময় ধরে সাজাও। ব্যস্ত মেশিনগুলোর শেষের সময়ের একটি মিন-হিপ রাখো। পরের ব্যবধানের শুরুতে সবচেয়ে আগে শেষ হওয়া মেশিন মুক্ত থাকলে তাকেই আবার ব্যবহার করো (পপ), তারপর নতুন শেষ পুশ করো। শেষে হিপের আকার মেশিনের সংখ্যা; সমতুল্যভাবে এটি একক সময়ে সর্বোচ্চ ওভারল্যাপ, ঘটনার ওপর সুইপে পাওয়া যায়।'),
      ],
      code: raw`int minMachines(vector<pair<int, int>> iv) {                // [start, end), touching is fine
    sort(iv.begin(), iv.end());
    priority_queue<int, vector<int>, greater<int>> ends;
    for (auto [l, r] : iv) {
        if (!ends.empty() && ends.top() <= l) ends.pop();
        ends.push(r);
    }
    return ends.size();
}`,
      example: { text: L('Rooms for lectures: lectures [1,4), [2,5), [4,6) need two rooms because the first and third can share. If the problem says that sharing an endpoint is a clash, change ends.top() <= l into ends.top() < l.', 'লেকচারের ঘর: লেকচার [১,৪), [২,৫), [৪,৬)-এ দুটি ঘর লাগে, কারণ প্রথম ও তৃতীয়টি একটি ঘর ভাগ করতে পারে। প্রান্ত ভাগ করা সংঘর্ষ হলে ends.top() <= l বদলে ends.top() < l করো।') },
    },
    {
      name: L('Ordering by an exchange argument (ratios)', 'এক্সচেঞ্জ যুক্তিতে ক্রম (অনুপাত)'),
      explain: [
        L('When task i takes time p_i and has a weight w_i, and the cost is the sum of w_i × (completion time of i), compare two neighbours i, j. Putting i first costs w_j·p_i extra and putting j first costs w_i·p_j extra, so i goes first when p_i / w_i < p_j / w_j. Sort with a cross-multiplied comparator to avoid fractions. The same recipe works for any cost where you can compute the effect of swapping two neighbours.', 'কাজ i সময় নেয় p_i, ওজন w_i, আর খরচ হলো w_i × (i-র সমাপ্তির সময়)-এর যোগফল। দুই প্রতিবেশী i, j তুলনা করো। i আগে রাখলে অতিরিক্ত খরচ w_j·p_i, j আগে রাখলে w_i·p_j, তাই p_i / w_i < p_j / w_j হলে i আগে যায়। ভগ্নাংশ এড়াতে ক্রস-গুণ করা তুলনাকারী দিয়ে সাজাও। যেকোনো খরচে একই রেসিপি কাজ করে যেখানে দুই প্রতিবেশী অদলবদলের প্রভাব হিসাব করা যায়।'),
      ],
      code: raw`long long minWeightedCompletion(vector<pair<long long, long long>> tasks) {   // {time p, weight w}
    sort(tasks.begin(), tasks.end(), [](auto& a, auto& b) { return a.first * b.second < b.first * a.second; });
    long long time = 0, cost = 0;
    for (auto [p, w] : tasks) {
        time += p;
        cost += w * time;
    }
    return cost;
}`,
      example: { text: L('Two tasks: (p = 3, w = 1) and (p = 1, w = 2). Ratios are 3 and 1/2, so the second goes first: costs 2·1 + 1·4 = 6. The other order costs 1·3 + 2·4 = 11.', 'দুটি কাজ: (p = ৩, w = ১) ও (p = ১, w = ২)। অনুপাত ৩ ও ১/২, তাই দ্বিতীয়টি আগে: খরচ ২·১ + ১·৪ = ৬। উল্টো ক্রমে খরচ ১·৩ + ২·৪ = ১১।') },
    },
    {
      name: L('Weighted intervals (DP with binary search)', 'ওজনযুক্ত ব্যবধান (বাইনারি সার্চসহ DP)'),
      explain: [
        L('When intervals carry a profit, greedy by end time no longer works; use a DP over the intervals sorted by end time. best[i] is either best[i − 1] (skip the interval) or its profit plus best[j], where j is the last interval that ends no later than this one starts, found with binary search.', 'ব্যবধানে লাভ থাকলে শেষ ধরে গ্রিডি আর কাজ করে না; শেষ ধরে সাজানো ব্যবধানের ওপর DP ব্যবহার করো। best[i] হয় best[i − ১] (ব্যবধান বাদ) অথবা তার লাভ + best[j], যেখানে j হলো এই ব্যবধান শুরুর আগে বা সময়ে শেষ হওয়া সর্বশেষ ব্যবধান, বাইনারি সার্চে পাওয়া।'),
      ],
      code: raw`struct Job { int start, end; long long profit; };

long long weightedIntervals(vector<Job> jobs) {
    sort(jobs.begin(), jobs.end(), [](const Job& a, const Job& b) { return a.end < b.end; });
    int n = jobs.size();
    vector<int> ends(n);
    for (int i = 0; i < n; i++) ends[i] = jobs[i].end;
    vector<long long> best(n + 1, 0);                        // best[i]: using the first i jobs
    for (int i = 1; i <= n; i++) {
        int j = upper_bound(ends.begin(), ends.begin() + (i - 1), jobs[i - 1].start) - ends.begin();
        best[i] = max(best[i - 1], best[j] + jobs[i - 1].profit);
    }
    return best[n];
}`,
      example: { text: L('Jobs [1,10] profit 20, [1,3] profit 5, [4,6] profit 5, [7,9] profit 5: taking the most jobs (3) gives 15, but the DP sees that the long job alone gives 20.', 'কাজ [১,১০] লাভ ২০, [১,৩] লাভ ৫, [৪,৬] লাভ ৫, [৭,৯] লাভ ৫: সবচেয়ে বেশি কাজ (৩টি) নিলে ১৫, কিন্তু DP দেখে লম্বা কাজটি একা ২০ দেয়।') },
    },
  ],
  mistakes: [
    L('Picking the wrong sort key: start time, end time, duration and deadline each solve a different problem. State which one the exchange argument supports.', 'ভুল সর্ট চাবি: শুরুর সময়, শেষের সময়, সময়কাল ও ডেডলাইন প্রত্যেকে আলাদা সমস্যা সমাধান করে। এক্সচেঞ্জ যুক্তি কোনটিকে সমর্থন করে তা বলো।'),
    L('Off-by-one on touching endpoints: decide whether intervals are closed or half-open and use the same rule in the code (< versus <=).', 'প্রান্ত ছোঁয়ায় ১ ভুল: ব্যবধান বদ্ধ না অর্ধ-খোলা তা ঠিক করো এবং কোডে একই নিয়ম (< বনাম <=) ব্যবহার করো।'),
    L('Dividing to compare ratios and losing precision: cross-multiply with long long instead.', 'অনুপাত তুলনায় ভাগ করে নির্ভুলতা হারানো: বদলে long long-এ ক্রস-গুণ করো।'),
    L('Forgetting that a greedy that works for unit profit fails for weighted profit: weights usually need DP or a heap with regret.', 'ইউনিট লাভে চলা গ্রিডি ওজনযুক্ত লাভে ব্যর্থ হয় ভুলে যাওয়া: ওজন থাকলে সাধারণত DP বা অনুশোচনার হিপ লাগে।'),
    L('Overflow in the completion time: sums of 10⁵ durations up to 10⁹ need long long.', 'সমাপ্তির সময়ে ওভারফ্লো: ১০⁹ পর্যন্ত ১০⁵ সময়কালের যোগফলে long long লাগে।'),
  ],
  plan: [
    L('Prove interval scheduling by exchange on paper and code it. Then do one problem where the rule is “touching is not allowed”.', 'কাগজে এক্সচেঞ্জ দিয়ে ইন্টারভাল শিডিউলিং প্রমাণ করো এবং কোড করো। তারপর “ছোঁয়া অনুমোদিত নয়” নিয়মের একটি সমস্যা করো।'),
    L('Learn the heap-with-regret pattern on a deadlines problem, first with unit tasks and then with durations.', 'ডেডলাইনের সমস্যায় অনুশোচনার হিপ ধরন শেখো, আগে ইউনিট কাজে, তারপর সময়কালসহ।'),
    L('Practise sweeps for minimum machines and for “maximum overlap at any time”.', 'ন্যূনতম মেশিন ও “যেকোনো সময়ে সর্বোচ্চ ওভারল্যাপ”-এর জন্য সুইপের অনুশীলন করো।'),
    L('Finish with problems where the order is decided by a custom comparator, and prove each comparator with the two-neighbour swap.', 'যেসব সমস্যায় ক্রম নিজস্ব তুলনাকারী ঠিক করে সেগুলো দিয়ে শেষ করো, আর প্রতিটি তুলনাকারী দুই-প্রতিবেশী অদলবদল দিয়ে প্রমাণ করো।'),
  ],
};
