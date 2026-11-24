import { mk } from './mk.ts';

const raw = String.raw;


export const p1096G = mk({
  "id": "1096G",
  "name": "Lucky Tickets",
  "rating": 2000,
  "tags": [
    "fft",
    "dp",
    "math"
  ],
  "why": [
    "Counting equal-sum halves is a convolution power: the number of ways to get each digit sum is a coefficient of (allowed digits polynomial)^(n/2).",
    "দুই অর্ধের সমান যোগফল গোনা আসলে কনভোল্যুশনের পাওয়ার: প্রতিটি অঙ্ক-যোগফলের উপায় সংখ্যা (অনুমোদিত অঙ্কের বহুপদী)^(n/2)-এর সহগ।"
  ],
  "statement": [
    "A ticket has n digits (n is even), and each digit must come from a given set of k allowed digits. A ticket is lucky if the sum of its first n/2 digits equals the sum of its last n/2 digits. Count the lucky tickets, modulo 998244353. Leading zeros are fine.",
    "একটি টিকিটে n টি অঙ্ক (n জোড়), প্রতিটি অঙ্ক k টি অনুমোদিত অঙ্কের সেট থেকে আসতে হবে। প্রথম n/2 অঙ্কের যোগফল শেষ n/2 অঙ্কের যোগফলের সমান হলে টিকিট ভাগ্যবান। ভাগ্যবান টিকিট 998244353 মডুলোতে গুনুন। শুরুতে শূন্য চলবে।"
  ],
  "input": [
    "n and k, then the k allowed digits.",
    "n ও k, তারপর k টি অনুমোদিত অঙ্ক।"
  ],
  "output": [
    "The number of lucky tickets modulo 998244353.",
    "ভাগ্যবান টিকিটের সংখ্যা 998244353 মডুলোতে।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "2 ≤ n ≤ 10⁵, n even; 1 ≤ k ≤ 10",
        "২ ≤ n ≤ ১০⁵, n জোড়; ১ ≤ k ≤ ১০"
      ]
    ]
  },
  "samples": [
    {
      "input": "4 2\n1 8",
      "output": "6",
      "explain": [
        "Each half is two digits from {1, 8}. Sums: 2 (one way), 9 (two ways), 16 (one way). Matching halves: 1·1 + 2·2 + 1·1 = 6.",
        "প্রতিটি অর্ধ {১, ৮} থেকে দুটি অঙ্ক। যোগফল: ২ (১ উপায়), ৯ (২ উপায়), ১৬ (১ উপায়)। মিলে যাওয়া অর্ধ: ১·১ + ২·২ + ১·১ = ৬।"
      ]
    },
    {
      "input": "20 1\n6",
      "output": "1",
      "explain": [
        "Only the ticket 66…6, which is lucky.",
        "শুধু 66…6 টিকিট, যা ভাগ্যবান।"
      ]
    },
    {
      "input": "10 5\n6 1 4 0 3",
      "output": "569725",
      "explain": [
        "Half length 5 over five digits; sum of squared counts.",
        "অর্ধ-দৈর্ঘ্য ৫, পাঁচটি অঙ্ক; গণনার বর্গের যোগফল।"
      ]
    },
    {
      "input": "1000 7\n5 4 0 1 8 3 2",
      "output": "460571165",
      "explain": [
        "Needs a fast polynomial power; plain DP is too slow.",
        "দ্রুত বহুপদী পাওয়ার দরকার; সাধারণ DP খুব ধীর।"
      ]
    }
  ],
  "observation": [
    "Let w[s] be the number of ways for one half (n/2 digits from the allowed set) to have digit sum s. The two halves are independent, so the answer is the sum over s of w[s]·w[s]. And w are exactly the coefficients of f(x)^(n/2) where f(x) is the sum of x^d for each allowed digit d.",
    "ধরুন w[s] হলো একটি অর্ধের (অনুমোদিত সেট থেকে n/2 অঙ্ক) অঙ্ক-যোগফল s হওয়ার উপায়। দুই অর্ধ স্বাধীন, তাই উত্তর হলো সব s-এ w[s]·w[s]-এর যোগফল। আর w হলো ঠিক f(x)^(n/2)-এর সহগ, যেখানে f(x) প্রতিটি অনুমোদিত অঙ্ক d-এর জন্য x^d-র যোগফল।"
  ],
  "approach": [
    [
      "Build f(x) with a 1 at each allowed digit (degree at most 9).",
      "f(x) গড়ুন, প্রতিটি অনুমোদিত অঙ্কে ১ (ঘাত সর্বোচ্চ ৯)।"
    ],
    [
      "Raise f to the power n/2: either by binary exponentiation with NTT, or by the linear recurrence that comes from differentiating the power.",
      "f-কে n/2 ঘাতে তুলুন: হয় NTT দিয়ে বাইনারি এক্সপোনেনশিয়েশনে, নয়তো ঘাত-এর অন্তরক থেকে আসা রৈখিক পুনরাবৃত্তিতে।"
    ],
    [
      "Sum the squares of all coefficients modulo 998244353.",
      "সব সহগের বর্গের যোগফল 998244353 মডুলোতে।"
    ]
  ],
  "walk": {
    "input": "4 2\n1 8",
    "steps": [
      [
        "f(x)",
        [
          "f = x + x⁸.",
          "f = x + x⁸।"
        ]
      ],
      [
        "f²",
        [
          "(x + x⁸)² = x² + 2x⁹ + x¹⁶: w = {2:1, 9:2, 16:1}.",
          "(x + x⁸)² = x² + 2x⁹ + x¹⁶: w = {২:১, ৯:২, ১৬:১}।"
        ]
      ],
      [
        "answer",
        [
          "1² + 2² + 1² = 6.",
          "১² + ২² + ১² = ৬।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n log n)",
    "space": "O(n)",
    "why": [
      "The polynomial has degree at most 9·n/2, and binary exponentiation does O(log n) NTT products whose sizes double each time; the last one dominates.",
      "বহুপদীর ঘাত সর্বোচ্চ ৯·n/২, বাইনারি এক্সপোনেনশিয়েশনে O(log n) NTT গুণ যাদের আকার প্রতিবার দ্বিগুণ হয়; শেষটিই প্রধান।"
    ]
  },
  "sols": [
    {
      "id": "ntt",
      "kind": "optimal",
      "title": [
        "NTT and binary exponentiation",
        "NTT ও বাইনারি এক্সপোনেনশিয়েশন"
      ],
      "idea": [
        "Compute f^(n/2) by repeated squaring, each product by NTT.",
        "পুনরাবৃত্ত বর্গে f^(n/2) বের করুন, প্রতিটি গুণ NTT দিয়ে।"
      ],
      "explain": [
        [
          "998244353 = 119·2²³ + 1 with primitive root 3, so an NTT of size up to 2²³ works with no precision problems. Square only while the exponent has bits left, to avoid a useless last product.",
          "998244353 = ১১৯·২²³ + ১ এবং আদি মূল ৩, তাই ২²³ পর্যন্ত আকারের NTT নির্ভুল চলে। ঘাতে বিট বাকি থাকা পর্যন্তই বর্গ করুন, যাতে অকেজো শেষ গুণ না হয়।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

const int MOD = 998244353, G = 3;
long long pw(long long a, long long e) {
    long long r = 1;
    for (a %= MOD; e; e >>= 1, a = a * a % MOD)
        if (e & 1) r = r * a % MOD;
    return r;
}
void ntt(vector<long long>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        long long w = pw(G, (MOD - 1) / len);
        if (inv) w = pw(w, MOD - 2);
        for (int i = 0; i < n; i += len) {
            long long cur = 1;
            for (int j = 0; j < len / 2; j++) {
                long long u = a[i + j], v = a[i + j + len / 2] * cur % MOD;
                a[i + j] = (u + v) % MOD;
                a[i + j + len / 2] = (u - v + MOD) % MOD;
                cur = cur * w % MOD;
            }
        }
    }
    if (inv) {
        long long ni = pw(n, MOD - 2);
        for (auto& x : a) x = x * ni % MOD;
    }
}
vector<long long> mul(vector<long long> a, vector<long long> b) {
    size_t need = a.size() + b.size() - 1;
    int n = 1;
    while ((size_t)n < need) n <<= 1;
    a.resize(n);
    b.resize(n);
    ntt(a, false);
    ntt(b, false);
    for (int i = 0; i < n; i++) a[i] = a[i] * b[i] % MOD;
    ntt(a, true);
    a.resize(need);
    return a;
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<long long> f(10, 0);
    for (int i = 0; i < k; i++) {
        int d;
        scanf("%d", &d);
        f[d] = 1;
    }
    // P = f^(n/2) by binary exponentiation; answer = sum of squares of its coefficients
    vector<long long> P = {1}, base = f;
    for (int e = n / 2; e; e >>= 1) {
        if (e & 1) P = mul(P, base);
        if (e > 1) base = mul(base, base);
    }
    long long ans = 0;
    for (long long c : P) ans = (ans + c * c) % MOD;
    printf("%lld\n", ans);
}
`,
      "time": "O(n log n)",
      "space": "O(n)",
      "toolkit": [
        "mod-pow"
      ]
    },
    {
      "id": "recurrence",
      "kind": "better",
      "title": [
        "Power of a sparse polynomial by recurrence",
        "বিরল বহুপদীর পাওয়ার, পুনরাবৃত্তি দিয়ে"
      ],
      "idea": [
        "P = g^m obeys g·P′ = m·g′·P, so each coefficient needs only the last 9.",
        "P = g^m মানে g·P′ = m·g′·P, তাই প্রতিটি সহগে শুধু শেষ ৯টি লাগে।"
      ],
      "explain": [
        [
          "Shift f so its smallest digit becomes x⁰ (shifting changes no coefficient squared sum). Then g(0) = 1 and the identity gives i·P_i = Σ_j g_j·(m·j − (i − j))·P_(i−j), with j up to 9. Division by i uses modular inverses, valid since i < 998244353.",
          "f-কে সরিয়ে ক্ষুদ্রতম অঙ্ককে x⁰ করুন (সরালে সহগ-বর্গের যোগফল বদলায় না)। তখন g(0) = ১ এবং অভেদ থেকে i·P_i = Σ_j g_j·(m·j − (i − j))·P_(i−j), j সর্বোচ্চ ৯। i দিয়ে ভাগ মডুলার ইনভার্সে, i < 998244353 হওয়ায় বৈধ।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;
long long pw(long long a, long long e) {
    long long r = 1;
    for (a %= MOD; e; e >>= 1, a = a * a % MOD)
        if (e & 1) r = r * a % MOD;
    return r;
}

// P = g^m with g(0) = 1 satisfies  g * P' = m * g' * P, which gives each coefficient of P from
// the D previous ones: i * P_i = sum_j g_j * (m*j - (i - j)) * P_{i-j}.
int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<int> dig(k);
    for (auto& d : dig) scanf("%d", &d);
    int lo = *min_element(dig.begin(), dig.end()), hi = *max_element(dig.begin(), dig.end());
    int D = hi - lo;
    vector<long long> g(D + 1, 0);
    for (int d : dig) g[d - lo] = 1;  // shifting by x^lo does not change the sum of squares
    long long m = n / 2;
    vector<long long> P(m * D + 1, 0);
    P[0] = 1;
    for (long long i = 1; i <= m * D; i++) {
        long long s = 0;
        for (int j = 1; j <= D && j <= i; j++) {
            if (!g[j]) continue;
            long long coef = ((m * j - (i - j)) % MOD + MOD) % MOD;
            s = (s + coef * P[i - j]) % MOD;
        }
        P[i] = s * pw(i, MOD - 2) % MOD;
    }
    long long ans = 0;
    for (long long c : P) ans = (ans + c * c) % MOD;
    printf("%lld\n", ans);
}
`,
      "time": "O(n · 10 · log MOD)",
      "space": "O(n)",
      "toolkit": [
        "mod-pow"
      ]
    },
    {
      "id": "brute",
      "kind": "brute",
      "title": [
        "Digit-sum DP",
        "অঙ্ক-যোগফল DP"
      ],
      "idea": [
        "Add one digit at a time to every reachable sum.",
        "প্রতিবার একটি অঙ্ক যোগ করে প্রতিটি পৌঁছনো যোগফলে।"
      ],
      "explain": [
        [
          "O((n/2)² · 9 · k): fine for n up to a few hundred, far too slow for 10⁵. It is the reference for our stress test.",
          "O((n/2)² · ৯ · k): কয়েকশো n পর্যন্ত ঠিক, ১০⁵-এ অনেক ধীর। স্ট্রেস টেস্টের রেফারেন্স।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// ways[s] = number of m-digit halves with digit sum s, by plain DP; answer = sum of ways[s]^2.
int main() {
    const long long MOD = 998244353;
    int n, k;
    cin >> n >> k;
    vector<int> d(k);
    for (auto& x : d) cin >> x;
    int m = n / 2;
    vector<long long> ways(9 * m + 1, 0);
    ways[0] = 1;
    for (int step = 0; step < m; step++) {
        vector<long long> nw(9 * m + 1, 0);
        for (int s = 0; s <= 9 * m; s++)
            if (ways[s])
                for (int x : d)
                    if (s + x <= 9 * m) nw[s + x] = (nw[s + x] + ways[s]) % MOD;
        ways = nw;
    }
    long long ans = 0;
    for (long long w : ways) ans = (ans + w * w) % MOD;
    cout << ans << "\n";
}
`,
      "time": "O(n² · k)",
      "space": "O(n)",
      "accepted": false,
      "toolkit": [
        "vector"
      ]
    }
  ],
  "own": [
    {
      "input": "2 1\n0",
      "output": "1",
      "note": [
        "The single ticket 00.",
        "একমাত্র টিকিট 00।"
      ]
    },
    {
      "input": "2 10\n0 1 2 3 4 5 6 7 8 9",
      "output": "10",
      "note": [
        "Two digits: lucky means equal digits, so 10.",
        "দুটি অঙ্ক: ভাগ্যবান মানে সমান অঙ্ক, তাই ১০।"
      ]
    },
    {
      "input": "6 2\n0 9",
      "output": "20",
      "note": [
        "Sums 0, 9, 18 with counts 1, 3, 3, 1 on the half-sums: 1 + 9 + 9 + 1.",
        "অর্ধ-যোগফল ০, ৯, ১৮, ২৭ এর গণনা ১, ৩, ৩, ১: ১ + ৯ + ৯ + ১।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Using ordinary DP over sums: 10⁵ digits make it O(n²·k).",
      "যোগফলের উপর সাধারণ DP: ১০⁵ অঙ্কে O(n²·k)।"
    ],
    [
      "Squaring one time too many: the polynomial then doubles in size for nothing.",
      "একবার বেশি বর্গ: বহুপদী অকারণে দ্বিগুণ হয়।"
    ],
    [
      "Forgetting that leading zeros are allowed.",
      "শুরুর শূন্য চলে, এটি ভুলে যাওয়া।"
    ]
  ],
  "related": [
    {
      "id": "438E",
      "name": "The Child and Binary Tree",
      "why": [
        "More power-series work modulo 998244353.",
        "আরও 998244353 মডুলোতে পাওয়ার-সিরিজের কাজ।"
      ]
    },
    {
      "id": "993E",
      "name": "Nikita and Order Statistics",
      "why": [
        "Counting by convolution.",
        "কনভোল্যুশন দিয়ে গণনা।"
      ]
    }
  ],
  "toolkit": [
    "mod-pow"
  ]
});

export const p1105E = mk({
  "id": "1105E",
  "name": "Helping Hiasat",
  "rating": 2200,
  "tags": [
    "meet-in-the-middle",
    "bitmasks",
    "brute-force",
    "dp"
  ],
  "why": [
    "A long event log hides a tiny graph: 40 friends, a conflict between two when they visit in the same stretch, and the answer is a maximum independent set, solved by splitting the vertices in two halves.",
    "দীর্ঘ ঘটনা-লগের ভেতরে একটি ছোট গ্রাফ লুকিয়ে: ৪০ বন্ধু, একই পর্বে দুজন গেলে বিরোধ, আর উত্তর সর্বোচ্চ স্বাধীন সেট, যা দুই অর্ধে ভেঙে সমাধান হয়।"
  ],
  "statement": [
    "Hiasat has a social-network account whose handle he can change. The log has n events: type 1 means he may change his handle to anything; type 2 s means friend s visits the profile (and sees the current handle). Between two type-1 events the handle stays fixed. A friend is happy if every one of his visits saw a handle equal to his own name. What is the largest number of friends that can be happy at once?",
    "হিয়াসাতের একটি সোশ্যাল নেটওয়ার্ক অ্যাকাউন্ট, যার হ্যান্ডেল সে বদলাতে পারে। লগে n টি ঘটনা: ধরন ১ মানে সে হ্যান্ডেল যেকোনো কিছুতে বদলাতে পারে; ধরন ২ s মানে বন্ধু s প্রোফাইল দেখে (এবং বর্তমান হ্যান্ডেল দেখে)। দুই ধরন-১ ঘটনার মাঝে হ্যান্ডেল স্থির। একজন বন্ধু খুশি যদি তার প্রতিটি দেখায় হ্যান্ডেল তার নিজের নামের সমান থাকে। একসাথে সর্বোচ্চ কতজন বন্ধু খুশি হতে পারে?"
  ],
  "input": [
    "n and m, then n events (“1” or “2 s”).",
    "n ও m, তারপর n টি ঘটনা (“1” বা “2 s”)।"
  ],
  "output": [
    "The maximum number of happy friends.",
    "সর্বোচ্চ খুশি বন্ধুর সংখ্যা।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "1 ≤ n ≤ 10⁵, 1 ≤ m ≤ 40",
        "১ ≤ n ≤ ১০⁵, ১ ≤ m ≤ ৪০"
      ],
      [
        "The first event is type 1; every friend visits at least once.",
        "প্রথম ঘটনা ধরন ১; প্রতিটি বন্ধু অন্তত একবার আসে।"
      ]
    ]
  },
  "samples": [
    {
      "input": "5 3\n1\n2 motarack\n2 mike\n1\n2 light",
      "output": "2",
      "explain": [
        "motarack and mike visit in the same stretch, so only one of them can be happy; light is alone. Best: 2.",
        "motarack ও mike একই পর্বে আসে, তাই একজনই খুশি হতে পারে; light একা। সেরা: ২।"
      ]
    },
    {
      "input": "4 3\n1\n2 alice\n2 bob\n2 tanyaromanova",
      "output": "1",
      "explain": [
        "All three visit in one stretch; only one can be happy.",
        "তিনজনই একই পর্বে আসে; একজনই খুশি হতে পারে।"
      ]
    }
  ],
  "observation": [
    "In one stretch the handle is a single string, so at most one visiting friend can be happy there. Draw an edge between two friends whenever they visit in the same stretch. A set of friends can all be happy exactly when no two of them are joined: the answer is the maximum independent set of a graph on at most 40 vertices.",
    "একটি পর্বে হ্যান্ডেল একটিই স্ট্রিং, তাই সেখানে আসা বন্ধুদের মধ্যে একজনই খুশি হতে পারে। দুজন একই পর্বে এলে তাদের মধ্যে একটি ধার আঁকুন। একদল বন্ধু সবাই খুশি হতে পারে ঠিক তখনই যখন তাদের কোনো দুজনের মাঝে ধার নেই: উত্তর সর্বোচ্চ ৪০ শীর্ষের গ্রাফের সর্বোচ্চ স্বাধীন সেট।"
  ],
  "approach": [
    [
      "Number the friends by first appearance. Keep a bitmask of friends seen in the current stretch; on a type-1 event (and at the end) add edges between all of them.",
      "বন্ধুদের প্রথম আবির্ভাব অনুযায়ী নম্বর দিন। বর্তমান পর্বে দেখা বন্ধুদের একটি বিটমাস্ক রাখুন; ধরন-১ ঘটনায় (এবং শেষে) তাদের সবার মধ্যে ধার যোগ করুন।"
    ],
    [
      "Split the m vertices into halves A and B of about 20.",
      "m শীর্ষকে প্রায় ২০-এর দুই অর্ধ A ও B-তে ভাগ করুন।"
    ],
    [
      "For A, precompute best[mask] = largest independent subset of mask by a DP over subsets.",
      "A-র জন্য best[mask] = mask-এর বৃহত্তম স্বাধীন উপসেট, সাবসেট DP দিয়ে আগে থেকে হিসাব।"
    ],
    [
      "For every independent subset S of B, the A-vertices still allowed are those with no neighbour in S; take |S| + best[allowed].",
      "B-র প্রতিটি স্বাধীন উপসেট S-এর জন্য A-র যে শীর্ষের S-এ কোনো প্রতিবেশী নেই তারাই অনুমোদিত; |S| + best[অনুমোদিত] নিন।"
    ]
  ],
  "walk": {
    "input": "5 3\n1\n2 motarack\n2 mike\n1\n2 light",
    "steps": [
      [
        "stretch 1",
        [
          "{motarack, mike}: add edge 0–1.",
          "{motarack, mike}: ধার ০–১।"
        ]
      ],
      [
        "stretch 2",
        [
          "{light}: no edge.",
          "{light}: কোনো ধার নেই।"
        ]
      ],
      [
        "MIS",
        [
          "Pick one of the two joined friends and light: 2.",
          "জোড়া দুজনের একজন ও light নিন: ২।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n + 2^(m/2) · m)",
    "space": "O(2^(m/2))",
    "why": [
      "Reading the log is linear; the two halves cost 2²⁰ states each, with an inner loop over at most 20 vertices.",
      "লগ পড়া রৈখিক; দুই অর্ধের প্রতিটি ২²⁰ অবস্থা, ভেতরে সর্বোচ্চ ২০ শীর্ষের লুপ।"
    ]
  },
  "sols": [
    {
      "id": "mitm",
      "kind": "optimal",
      "title": [
        "Two halves: subset DP + enumeration",
        "দুই অর্ধ: সাবসেট DP + গণনা"
      ],
      "idea": [
        "best[mask] on the first half; enumerate independent sets of the second half and combine.",
        "প্রথম অর্ধে best[mask]; দ্বিতীয় অর্ধের স্বাধীন সেট গুনে মিলান।"
      ],
      "explain": [
        [
          "best[mask] is built by looking at the lowest vertex v of the mask: either skip it, or take it and remove its neighbours. The B side is handled by plain enumeration with an independence check on the fly.",
          "best[mask] তৈরি হয় mask-এর সর্বনিম্ন শীর্ষ v দেখে: হয় বাদ দিন, নয়তো নিয়ে তার প্রতিবেশী সরান। B পাশ সরাসরি গণনা করে, চলতি অবস্থায় স্বাধীনতা যাচাই করে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    unordered_map<string, int> id;
    vector<long long> adj(m, 0);
    long long seg = 0;  // friends seen in the current stretch between two handle changes
    auto flush = [&]() {
        for (int i = 0; i < m; i++)
            if (seg >> i & 1) adj[i] |= seg & ~(1LL << i);
        seg = 0;
    };
    for (int i = 0; i < n; i++) {
        int t;
        cin >> t;
        if (t == 1) {
            flush();
        } else {
            string s;
            cin >> s;
            if (!id.count(s)) { int k = id.size(); id[s] = k; }
            seg |= 1LL << id[s];
        }
    }
    flush();
    // maximum independent set: split the vertices in halves A (first h) and B (the rest)
    int h = m / 2, rest = m - h;
    vector<int> best(1 << h, 0);  // best[mask] = largest independent subset inside mask (A side)
    for (int mask = 1; mask < (1 << h); mask++) {
        int v = __builtin_ctz(mask);
        int without = mask & (mask - 1);
        int a = best[without];
        int b = 1 + best[without & ~(int)(adj[v] & ((1LL << h) - 1))];
        best[mask] = max(a, b);
    }
    int ans = 0;
    for (int sub = 0; sub < (1 << rest); sub++) {  // every subset of B, kept if independent
        bool ok = true;
        long long banned = 0;
        for (int j = 0; j < rest && ok; j++)
            if (sub >> j & 1) {
                long long nb = adj[h + j];
                if ((nb >> h) & sub) ok = false;
                banned |= nb & ((1LL << h) - 1);
            }
        if (!ok) continue;
        int freeA = ((1 << h) - 1) & ~(int)banned;
        ans = max(ans, __builtin_popcount(sub) + best[freeA]);
    }
    cout << ans << "\n";
}
`,
      "time": "O(2^(m/2) · m)",
      "space": "O(2^(m/2))",
      "toolkit": [
        "popcount"
      ]
    },
    {
      "id": "branch",
      "kind": "alt",
      "title": [
        "Branching with degree rules",
        "ডিগ্রি-নিয়মে ব্রাঞ্চিং"
      ],
      "idea": [
        "Branch on the highest-degree vertex; stop when every degree is at most 1.",
        "সর্বোচ্চ ডিগ্রির শীর্ষে ব্রাঞ্চ; সব ডিগ্রি ≤ ১ হলে থামুন।"
      ],
      "explain": [
        [
          "When all degrees are ≤ 1 the graph is isolated vertices and single edges, so the answer is the vertex count minus the number of edges. Otherwise branch: drop the vertex, or take it and drop its neighbours (at least 2 of them). That gives about 1.47^m steps, fine for m = 40.",
          "সব ডিগ্রি ≤ ১ হলে গ্রাফ বিচ্ছিন্ন শীর্ষ ও একক ধার, তাই উত্তর = শীর্ষ সংখ্যা − ধার সংখ্যা। নইলে ব্রাঞ্চ: শীর্ষ বাদ, নয়তো নিয়ে তার প্রতিবেশী (অন্তত ২টি) বাদ। এতে প্রায় ১.৪৭^m ধাপ, m = ৪০-এ ঠিক।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int m;
vector<unsigned long long> adj;

// Maximum independent set by branching on a vertex of largest degree.
int solve(unsigned long long mask) {
    if (!mask) return 0;
    int bestV = -1, bestD = -1, edges2 = 0;
    for (unsigned long long t = mask; t; t &= t - 1) {
        int v = __builtin_ctzll(t);
        int d = __builtin_popcountll(adj[v] & mask);
        edges2 += d;
        if (d > bestD) bestD = d, bestV = v;
    }
    if (bestD <= 1) return __builtin_popcountll(mask) - edges2 / 2;  // isolated vertices and single edges
    unsigned long long without = mask & ~(1ULL << bestV);
    return max(solve(without), 1 + solve(without & ~adj[bestV]));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n >> m;
    unordered_map<string, int> id;
    adj.assign(m, 0);
    unsigned long long seg = 0;
    auto flush = [&]() {
        for (int i = 0; i < m; i++)
            if (seg >> i & 1) adj[i] |= seg & ~(1ULL << i);
        seg = 0;
    };
    for (int i = 0; i < n; i++) {
        int t;
        cin >> t;
        if (t == 1) flush();
        else {
            string s;
            cin >> s;
            if (!id.count(s)) { int k = id.size(); id[s] = k; }
            seg |= 1ULL << id[s];
        }
    }
    flush();
    cout << solve(m == 64 ? ~0ULL : (1ULL << m) - 1) << "\n";
}
`,
      "time": "O(1.47^m)",
      "space": "O(m)",
      "toolkit": [
        "bitwise-and"
      ]
    },
    {
      "id": "brute",
      "kind": "brute",
      "title": [
        "Every set of friends",
        "প্রতিটি বন্ধু-সেট"
      ],
      "idea": [
        "For each of the 2^m sets, check every stretch holds at most one chosen friend.",
        "২^m টি সেটের প্রতিটির জন্য দেখুন কোনো পর্বে একজনের বেশি বাছা বন্ধু নেই।"
      ],
      "explain": [
        [
          "This follows the statement directly and is only usable for small m; it is our stress reference.",
          "সরাসরি বিবৃতি অনুসরণ করে, শুধু ছোট m-এ চলে; আমাদের স্ট্রেস রেফারেন্স।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Pick a set of friends, then check segment by segment that no segment holds two of them.
int main() {
    int n, m;
    cin >> n >> m;
    unordered_map<string, int> id;
    vector<vector<int>> segs(1);
    vector<int> first;
    for (int i = 0; i < n; i++) {
        int t;
        cin >> t;
        if (t == 1) segs.emplace_back();
        else {
            string s;
            cin >> s;
            if (!id.count(s)) { int k = id.size(); id[s] = k; }
            segs.back().push_back(id[s]);
        }
    }
    int best = 0;
    for (int mask = 0; mask < (1 << m); mask++) {
        bool ok = true;
        for (auto& sg : segs) {
            set<int> chosen;  // distinct chosen friends visiting this stretch
            for (int f : sg)
                if (mask >> f & 1) chosen.insert(f);
            if (chosen.size() > 1) ok = false;
        }
        if (ok) best = max(best, __builtin_popcount(mask));
    }
    cout << best << "\n";
}
`,
      "time": "O(2^m · n)",
      "space": "O(n)",
      "accepted": false,
      "toolkit": [
        "bitwise-and"
      ]
    }
  ],
  "own": [
    {
      "input": "3 1\n1\n2 a\n2 a",
      "output": "1",
      "note": [
        "A single friend visiting twice is happy.",
        "একজন বন্ধু দুবার এলেও খুশি।"
      ]
    },
    {
      "input": "6 3\n1\n2 a\n1\n2 b\n1\n2 c",
      "output": "3",
      "note": [
        "No two friends share a stretch: all happy.",
        "কোনো দুজন একই পর্বে নেই: সবাই খুশি।"
      ]
    },
    {
      "input": "7 3\n1\n2 a\n2 b\n1\n2 b\n2 c\n2 a",
      "output": "1",
      "note": [
        "A path-shaped conflict graph a–b, b–c, c–a visits twice.",
        "বিরোধ গ্রাফে a–b, b–c, c–a, কিছু বন্ধু দুবার।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Adding an edge only between consecutive friends of a stretch instead of all pairs.",
      "পর্বের সব জোড়ার বদলে শুধু পরপর বন্ধুদের মধ্যে ধার যোগ।"
    ],
    [
      "Forgetting to flush the last stretch after the final event.",
      "শেষ ঘটনার পরে শেষ পর্ব প্রক্রিয়া করতে ভুলে যাওয়া।"
    ],
    [
      "Using 1 << i with i ≥ 31 on an int mask; use 64-bit masks.",
      "int মাস্কে i ≥ ৩১ এ 1 << i; ৬৪-বিট মাস্ক ব্যবহার করুন।"
    ]
  ],
  "related": [
    {
      "id": "888E",
      "name": "Maximum Subsequence",
      "why": [
        "The same “split in halves and combine” idea.",
        "একই “দুই অর্ধে ভেঙে মিলানো” ধারণা।"
      ]
    },
    {
      "id": "1006F",
      "name": "Xor-Paths",
      "why": [
        "Meet at the middle of a grid.",
        "গ্রিডের মাঝখানে মিলন।"
      ]
    }
  ],
  "toolkit": [
    "popcount",
    "bitwise-and"
  ]
});

export const p912E = mk({
  "id": "912E",
  "name": "Prime Gift",
  "rating": 2400,
  "tags": [
    "meet-in-the-middle",
    "binary-search",
    "two-pointers"
  ],
  "why": [
    "The n-th smooth number is too far to list, but every one is a product of a number from each of two small groups of primes, which makes counting by two pointers possible.",
    "n-তম মসৃণ সংখ্যা এত দূরে যে তালিকা করা যায় না, কিন্তু প্রতিটি সংখ্যা দুই ছোট মৌলিক-গ্রুপের দুটি সংখ্যার গুণফল, যা টু-পয়েন্টারে গণনা সম্ভব করে।"
  ],
  "statement": [
    "You are given k distinct primes (k ≤ 16, each below 100). Consider all positive integers whose prime divisors all belong to this set (1 counts). Sort them ascending and print the n-th. It is guaranteed that the answer does not exceed 10¹⁸.",
    "k টি ভিন্ন মৌলিক সংখ্যা (k ≤ ১৬, প্রতিটি ১০০-এর কম) দেওয়া। সেই সব ধনাত্মক পূর্ণসংখ্যা ভাবুন যাদের সব মৌলিক গুণনীয়ক এই সেটে (১ সহ)। ছোট থেকে বড় সাজিয়ে n-তমটি ছাপুন। উত্তর ১০¹৮-এর বেশি হবে না, নিশ্চিত।"
  ],
  "input": [
    "k, the primes in ascending order, then n.",
    "k, মৌলিকগুলো ছোট থেকে বড়, তারপর n।"
  ],
  "output": [
    "The n-th number.",
    "n-তম সংখ্যা।"
  ],
  "limits": {
    "timeSec": 3,
    "memoryMb": 256,
    "notes": [
      [
        "n can be in the billions, so the numbers cannot be listed one by one.",
        "n শত কোটি হতে পারে, তাই সংখ্যাগুলো একে একে তালিকা করা যায় না।"
      ]
    ]
  },
  "samples": [
    {
      "input": "3\n2 3 5\n7",
      "output": "8",
      "explain": [
        "The numbers are 1, 2, 3, 4, 5, 6, 8, 9, 10, …; the 7th is 8 (7 is not allowed).",
        "সংখ্যাগুলো ১, ২, ৩, ৪, ৫, ৬, ৮, ৯, ১০, …; ৭-তম হলো ৮ (৭ অনুমোদিত নয়)।"
      ]
    }
  ],
  "observation": [
    "Counting how many allowed numbers are ≤ x is the hard part. Put the primes alternately into two groups. Each group alone produces about 10⁶ numbers ≤ 10¹⁸, and every allowed number is a·b with a from the first group and b from the second, in exactly one way. So “how many ≤ x” is the number of pairs with a·b ≤ x, which two pointers count in linear time.",
    "কতগুলো অনুমোদিত সংখ্যা ≤ x, এটি গোনাই কঠিন অংশ। মৌলিকগুলোকে একটি করে বদলে দুই গ্রুপে রাখুন। প্রতিটি গ্রুপ একা ১০¹৮-এর মধ্যে প্রায় ১০⁶ সংখ্যা বানায়, আর প্রতিটি অনুমোদিত সংখ্যা ঠিক এক ভাবে a·b, a প্রথম গ্রুপের আর b দ্বিতীয় গ্রুপের। তাই “কতগুলো ≤ x” মানে a·b ≤ x এমন জোড়ার সংখ্যা, যা টু-পয়েন্টার রৈখিক সময়ে গোনে।"
  ],
  "approach": [
    [
      "Generate every product ≤ 10¹⁸ of the first group’s primes (A) and of the second group’s (B) by DFS, taking care not to overflow; sort both.",
      "প্রথম গ্রুপের (A) ও দ্বিতীয় গ্রুপের (B) মৌলিকের ১০¹৮-এর মধ্যে সব গুণফল DFS-এ বানান, ওভারফ্লো এড়িয়ে; দুটিই সাজান।"
    ],
    [
      "count(x): for a in A ascending, move a pointer j down B while B[j−1] > x / a; add j.",
      "count(x): A-র a ছোট থেকে বড়, B-তে পয়েন্টার j নামান যতক্ষণ B[j−1] > x / a; j যোগ করুন।"
    ],
    [
      "Binary search the smallest x with count(x) ≥ n.",
      "ক্ষুদ্রতম x খুঁজুন যেখানে count(x) ≥ n, বাইনারি সার্চে।"
    ]
  ],
  "walk": {
    "input": "3\n2 3 5\n7",
    "steps": [
      [
        "groups",
        [
          "A uses {2, 5}, B uses {3}. A = 1, 2, 4, 5, 8, 10, …; B = 1, 3, 9, 27, …",
          "A-তে {২, ৫}, B-তে {৩}। A = ১, ২, ৪, ৫, ৮, ১০, …; B = ১, ৩, ৯, ২৭, …"
        ]
      ],
      [
        "count(8)",
        [
          "Pairs with product ≤ 8: 1,2,3,4,5,6,8 → 7 numbers.",
          "গুণফল ≤ ৮: ১, ২, ৩, ৪, ৫, ৬, ৮ → ৭টি সংখ্যা।"
        ]
      ],
      [
        "search",
        [
          "count(7) = 6 < 7 ≤ count(8), so the answer is 8.",
          "count(৭) = ৬ < ৭ ≤ count(৮), তাই উত্তর ৮।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(S · log 10¹⁸)",
    "space": "O(S)",
    "why": [
      "S ≈ 10⁶ numbers per group; each of the 60 binary-search steps is one linear two-pointer pass.",
      "প্রতি গ্রুপে S ≈ ১০⁶ সংখ্যা; ৬০টি বাইনারি-সার্চ ধাপের প্রতিটি একটি রৈখিক টু-পয়েন্টার পাস।"
    ]
  },
  "sols": [
    {
      "id": "mitm",
      "kind": "optimal",
      "title": [
        "Two groups, binary search, two pointers",
        "দুই গ্রুপ, বাইনারি সার্চ, টু-পয়েন্টার"
      ],
      "idea": [
        "Alternate the primes between groups; count pairs a·b ≤ x with two pointers.",
        "মৌলিকগুলো গ্রুপে বদলে বদলে ভাগ করুন; টু-পয়েন্টারে a·b ≤ x জোড়া গুনুন।"
      ],
      "explain": [
        [
          "Splitting the sorted primes alternately balances the two sizes; putting all small primes in one group would make that group huge. In count(x) the pointer j only moves left as a grows, so one pass is enough.",
          "সাজানো মৌলিকগুলো একটি করে বদলে ভাগ করলে দুই আকার সমান থাকে; সব ছোট মৌলিক এক গ্রুপে দিলে সেটি বিশাল হতো। count(x)-এ a বাড়লে j শুধু বামে যায়, তাই একটি পাসই যথেষ্ট।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

typedef unsigned long long ull;
const ull LIM = 1000000000000000000ULL;

void gen(const vector<int>& pr, size_t i, ull cur, vector<ull>& out) {
    if (i == pr.size()) { out.push_back(cur); return; }
    for (ull x = cur;; x *= pr[i]) {
        gen(pr, i + 1, x, out);
        if (x > LIM / pr[i]) break;
    }
}

int main() {
    int k;
    scanf("%d", &k);
    vector<int> p(k), ga, gb;
    for (int i = 0; i < k; i++) {
        scanf("%d", &p[i]);
        (i % 2 ? gb : ga).push_back(p[i]);  // alternate, so both groups get small and large primes
    }
    long long n;
    scanf("%lld", &n);
    vector<ull> A, B;
    gen(ga, 0, 1, A);
    gen(gb, 0, 1, B);
    sort(A.begin(), A.end());
    sort(B.begin(), B.end());
    auto count = [&](ull x) {  // numbers a*b <= x
        long long c = 0;
        size_t j = B.size();
        for (ull a : A) {
            if (a > x) break;
            while (j > 0 && B[j - 1] > x / a) j--;
            c += j;
        }
        return c;
    };
    ull lo = 1, hi = LIM;
    while (lo < hi) {
        ull mid = lo + (hi - lo) / 2;
        if (count(mid) >= n) hi = mid;
        else lo = mid + 1;
    }
    printf("%llu\n", lo);
}
`,
      "time": "O(S log 10¹⁸)",
      "space": "O(S)",
      "toolkit": [
        "binary-search"
      ]
    },
    {
      "id": "heap",
      "kind": "brute",
      "title": [
        "Min-heap of smooth numbers",
        "মসৃণ সংখ্যার মিন-হিপ"
      ],
      "idea": [
        "Pop numbers in increasing order, pushing x·p only for primes at or after the last one used.",
        "ছোট থেকে বড় সংখ্যা পপ করুন, শেষ ব্যবহৃত মৌলিক বা তার পরেরগুলোর জন্যই x·p পুশ করুন।"
      ],
      "explain": [
        [
          "That rule creates every number exactly once, so there are no duplicates to filter. It needs n pops, so it works for small n only, but it is a good reference.",
          "এই নিয়মে প্রতিটি সংখ্যা ঠিক একবার তৈরি হয়, ডুপ্লিকেট ছাঁকতে হয় না। n বার পপ লাগে, তাই শুধু ছোট n-এ চলে, কিন্তু ভালো রেফারেন্স।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Pop numbers from a min-heap in increasing order; only practical when n is small.
int main() {
    int k;
    cin >> k;
    vector<int> p(k);
    for (auto& x : p) cin >> x;
    long long n;
    cin >> n;
    typedef unsigned long long ull;
    priority_queue<pair<ull, int>, vector<pair<ull, int>>, greater<>> pq;  // (value, index of last prime used)
    pq.push({1, 0});
    ull ans = 0;
    while (n--) {
        auto [x, last] = pq.top();
        pq.pop();
        ans = x;
        for (int j = last; j < k; j++)
            if (x <= 1000000000000000000ULL / p[j]) pq.push({x * p[j], j});  // stay within 10^18
    }
    cout << ans << "\n";
}
`,
      "time": "O(n · k log n)",
      "space": "O(n · k)",
      "accepted": false,
      "toolkit": [
        "priority-queue"
      ]
    }
  ],
  "own": [
    {
      "input": "1\n2\n10",
      "output": "512",
      "note": [
        "Only powers of two: the 10th is 2⁹.",
        "শুধু ২-এর ঘাত: ১০-তম ২⁹।"
      ]
    },
    {
      "input": "2\n2 3\n10",
      "output": "18",
      "note": [
        "Numbers of the form 2^a·3^b: 1, 2, 3, 4, 6, 8, 9, 12, 16, 18, …",
        "২^a·৩^b আকারের সংখ্যা: ১, ২, ৩, ৪, ৬, ৮, ৯, ১২, ১৬, ১৮, …"
      ]
    }
  ],
  "pitfalls": [
    [
      "Putting the small primes in one group: that group then holds almost everything and the other almost nothing.",
      "ছোট মৌলিকগুলো এক গ্রুপে দেওয়া: সেই গ্রুপে প্রায় সবকিছু থাকে, অন্যটিতে প্রায় কিছুই না।"
    ],
    [
      "Overflow while generating: test cur > LIMIT / p before multiplying.",
      "তৈরির সময় ওভারফ্লো: গুণের আগে cur > LIMIT / p পরীক্ষা করুন।"
    ],
    [
      "Computing a·b directly in count(x); compare b with x / a instead.",
      "count(x)-এ সরাসরি a·b না করে b-কে x / a-র সাথে তুলনা করুন।"
    ]
  ],
  "related": [
    {
      "id": "888E",
      "name": "Maximum Subsequence",
      "why": [
        "Another halves-and-combine counting with two pointers.",
        "টু-পয়েন্টারসহ আরেকটি অর্ধ-ভেঙে-মিলানো গণনা।"
      ]
    }
  ],
  "toolkit": [
    "binary-search"
  ]
});

export const WAVE = [p1096G, p1105E, p912E];
