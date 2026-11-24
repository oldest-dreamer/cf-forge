import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 919E
export const p919E: ProblemEntry = {
  id: '919E',
  contestId: 919,
  index: 'E',
  name: 'Congruence Equation',
  rating: 2100,
  tags: ['crt', 'math', 'number-theory'],
  featuredFor: ['crt'],
  why: L(
    'aⁿ only depends on n mod (p − 1), and the factor n only on n mod p. Fix one residue, solve for the other, and the Chinese remainder theorem glues them into one residue mod p(p − 1).',
    'aⁿ শুধু n mod (p − ১)-এর ওপর নির্ভর করে, আর গুণক n শুধু n mod p-এর ওপর। একটি অবশেষ ঠিক করে অন্যটি সমাধান করুন, আর চীনা অবশেষ উপপাদ্য তাদের mod p(p − ১)-এ একটি অবশেষে জোড়া দেয়।',
  ),
  statement: L(
    'Given a prime p and integers a, b, x, count the integers n with 1 ≤ n ≤ x such that n · aⁿ ≡ b (mod p).',
    'একটি মৌলিক p আর পূর্ণসংখ্যা a, b, x দেওয়া। ১ ≤ n ≤ x-এর কতগুলো n-এ n · aⁿ ≡ b (mod p), গুনুন।',
  ),
  input: L('a b p x.', 'a b p x।'),
  output: L('The count.', 'গণনা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('2 ≤ p ≤ 10⁶ + 3 prime, 1 ≤ a, b < p, x ≤ 10¹²', '২ ≤ p ≤ ১০⁶ + ৩ মৌলিক, ১ ≤ a, b < p, x ≤ ১০¹²')] },
  samples: [
    { input: '2 3 5 8', output: '2', explain: L('n = 2 (2·4 = 8 ≡ 3) and n = 8.', 'n = ২ (২·৪ = ৮ ≡ ৩) আর n = ৮।') },
    { input: '4 6 7 13', output: '1', explain: L('Only one n up to 13.', '১৩ পর্যন্ত মাত্র একটি n।') },
    { input: '233 233 10007 1', output: '1', explain: L('n = 1: 1 · 233 = 233.', 'n = ১: ১ · ২৩৩ = ২৩৩।') },
  ],
  observation: L(
    'By Fermat, aⁿ depends only on i = n mod (p − 1). For each i, the equation becomes n ≡ b · a⁻ⁱ (mod p) =: j. The pair (n mod (p − 1), n mod p) = (i, j) determines n mod p(p − 1) because p − 1 and p are coprime. Writing n = i + (p − 1)t and using p − 1 ≡ −1 (mod p) gives t ≡ i − j (mod p).',
    'ফার্মা অনুযায়ী aⁿ শুধু i = n mod (p − ১)-এর ওপর নির্ভর করে। প্রতিটি i-তে সমীকরণ হয় n ≡ b · a⁻ⁱ (mod p) =: j। p − ১ আর p সহমৌলিক বলে (n mod (p − ১), n mod p) = (i, j) জোড়া n mod p(p − ১) নির্ধারণ করে। n = i + (p − ১)t লিখে p − ১ ≡ −১ (mod p) ব্যবহার করলে t ≡ i − j (mod p)।',
  ),
  approach: [
    L('Loop i = 0 … p − 2, keeping a⁻ⁱ incrementally.', 'i = ০ … p − ২ লুপ, a⁻ⁱ ধাপে ধাপে রেখে।'),
    L('n₀ = i + (p − 1)·((i − j) mod p) is the residue mod M = p(p − 1); use M if n₀ = 0.', 'n₀ = i + (p − ১)·((i − j) mod p) হলো mod M = p(p − ১)-এ অবশেষ; n₀ = ০ হলে M নিন।'),
    L('Count n ≤ x in that residue class: (x − n₀)/M + 1 when n₀ ≤ x.', 'সেই অবশেষ-শ্রেণিতে n ≤ x গোনা: n₀ ≤ x হলে (x − n₀)/M + ১।'),
  ],
  walkthrough: {
    input: 'a = 2, b = 3, p = 5, x = 8',
    steps: [
      { state: 'i = 2: a² = 4, j = 3 · 4⁻¹ = 3 · 4 = 12 ≡ 2', text: L('n ≡ 2 (mod 4) and n ≡ 2 (mod 5): n ≡ 2 (mod 20).', 'n ≡ ২ (mod ৪) আর n ≡ ২ (mod ৫): n ≡ ২ (mod ২০)।') },
      { state: 'i = 0: j = 3 → n ≡ 0 (mod 4), n ≡ 3 (mod 5): n ≡ 8', text: L('Two solutions up to 8.', '৮ পর্যন্ত দুটি সমাধান।') },
    ],
  },
  complexity: { time: 'O(p)', space: 'O(1)', why: L('One modular inverse at the start, then O(1) per residue.', 'শুরুতে একটি মডুলার ইনভার্স, তারপর প্রতি অবশেষে O(১)।') },
  solutions: [
    {
      id: 'crt',
      kind: 'optimal',
      title: L('One CRT residue per exponent class', 'প্রতি সূচক-শ্রেণিতে একটি CRT অবশেষ'),
      idea: L('i = n mod (p − 1) fixes aⁿ; j = n mod p follows; combine.', 'i = n mod (p − ১) aⁿ ঠিক করে; j = n mod p তা থেকে আসে; মেলানো।'),
      explain: [
        L(
          'This is CRT in its simplest form: two coprime moduli, one residue each, a unique combined residue. Here p − 1 ≡ −1 (mod p) even gives the combination without computing an inverse.',
          'এটি CRT-এর সবচেয়ে সহজ রূপ: দুটি সহমৌলিক মডুলাস, প্রতিটিতে একটি অবশেষ, একটি অনন্য মিলিত অবশেষ। এখানে p − ১ ≡ −১ (mod p) এমনকি ইনভার্স ছাড়াই মিলিয়ে দেয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll power(ll b, ll e, ll m) {
    ll r = 1;
    for (b %= m; e; e >>= 1, b = b * b % m)
        if (e & 1) r = r * b % m;
    return r;
}

int main() {
    ll a, b, p, x;
    cin >> a >> b >> p >> x;
    ll M = p * (p - 1), ans = 0;
    ll inva = power(a, p - 2, p), cur = b % p;  // cur = b * a^(-i)
    for (ll i = 0; i < p - 1; i++, cur = cur * inva % p) {
        ll j = cur;
        ll t = ((i - j) % p + p) % p;
        ll n0 = i + (p - 1) * t;  // n ≡ i (mod p-1), n ≡ j (mod p)
        if (n0 == 0) n0 = M;
        if (n0 <= x) ans += (x - n0) / M + 1;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(p)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow', 'long-long'],
    },
    {
      id: 'general-crt',
      kind: 'method',
      title: L('General CRT with the extended gcd', 'বর্ধিত gcd দিয়ে সাধারণ CRT'),
      idea: L('Combine n ≡ i (mod p − 1) and n ≡ j (mod p) with the standard CRT routine.', 'প্রচলিত CRT রুটিনে n ≡ i (mod p − ১) আর n ≡ j (mod p) মেলানো।'),
      explain: [
        L(
          'The reusable template: solve r₁ + m₁·t ≡ r₂ (mod m₂) with t = (r₂ − r₁)/g · inv(m₁/g, m₂/g). It also handles non-coprime moduli, which later CRT problems need.',
          'পুনর্ব্যবহারযোগ্য টেমপ্লেট: r₁ + m₁·t ≡ r₂ (mod m₂) সমাধান, t = (r₂ − r₁)/g · inv(m₁/g, m₂/g)। এটি অসহমৌলিক মডুলাসও সামলায়, যা পরের CRT প্রবলেমে লাগে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll egcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1, y = 0; return a; }
    ll g = egcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}
// combine x ≡ r1 (mod m1), x ≡ r2 (mod m2); returns false if impossible
bool crt(ll r1, ll m1, ll r2, ll m2, ll& r, ll& m) {
    ll p, q, g = egcd(m1, m2, p, q);
    if ((r2 - r1) % g) return false;
    ll l = m1 / g * m2;
    ll t = (__int128)((r2 - r1) / g % (m2 / g) + m2 / g) % (m2 / g) * ((p % (m2 / g) + m2 / g) % (m2 / g)) % (m2 / g);
    r = ((r1 + (__int128)m1 * t) % l + l) % l, m = l;
    return true;
}
ll power(ll b, ll e, ll m) {
    ll r = 1;
    for (b %= m; e; e >>= 1, b = b * b % m) if (e & 1) r = r * b % m;
    return r;
}

int main() {
    ll a, b, p, x;
    cin >> a >> b >> p >> x;
    ll ans = 0, inva = power(a, p - 2, p), cur = b % p;
    for (ll i = 0; i < p - 1; i++, cur = cur * inva % p) {
        ll r, M;
        crt(i, p - 1, cur, p, r, M);
        ll n0 = r == 0 ? M : r;
        if (n0 <= x) ans += (x - n0) / M + 1;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(p log p)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['gcd-lcm', 'mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every n up to x', 'x পর্যন্ত প্রতিটি n যাচাই'),
      idea: L('Keep aⁿ mod p incrementally and test n·aⁿ.', 'ধাপে ধাপে aⁿ mod p রেখে n·aⁿ যাচাই।'),
      explain: [L('O(x): the definition, for small x.', 'O(x): সংজ্ঞা, ছোট x-এর জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b, p, x;
    cin >> a >> b >> p >> x;
    if (x > 20000000) { cout << "\n"; return 0; }
    long long pw = 1, ans = 0;
    for (long long n = 1; n <= x; n++) {
        pw = pw * a % p;
        if (n % p * pw % p == b) ans++;
    }
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(x)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['modulo'],
    },
  ],
  tests: [
    { input: '2 3 5 8', output: '2', source: 'sample', note: sample(1) },
    { input: '4 6 7 13', output: '1', source: 'sample', note: sample(2) },
    { input: '233 233 10007 1', output: '1', source: 'sample', note: sample(3) },
    { input: '1 1 2 10', output: '5', source: 'own', note: L('p = 2: every odd n works.', 'p = ২: প্রতিটি বিজোড় n চলে।') },
  ],
  pitfalls: [
    L('Reducing the exponent mod p instead of p − 1.', 'সূচক p − ১-এর বদলে p মডুলো নেওয়া।'),
    L('Counting n = 0 when the combined residue is 0: the smallest positive solution is M.', 'মিলিত অবশেষ ০ হলে n = ০ গোনা: সবচেয়ে ছোট ধনাত্মক সমাধান M।'),
  ],
  related: [
    { id: '687B', name: 'Remainders Game', why: L('What CRT can and cannot recover.', 'CRT কী ফিরিয়ে দিতে পারে আর কী পারে না।') },
    { id: '1500B', name: 'Two chandeliers', why: L('CRT with non-coprime moduli.', 'অসহমৌলিক মডুলাসে CRT।') },
  ],
  toolkit: ['mod-pow', 'gcd-lcm'],
};

// ───────────────────────────────────────────── 1500B
export const p1500B: ProblemEntry = {
  id: '1500B',
  contestId: 1500,
  index: 'B',
  name: 'Two chandeliers',
  rating: 2200,
  tags: ['binary-search', 'brute-force', 'crt', 'math', 'number-theory'],
  why: L(
    'Days on which both chandeliers show colour c form one residue class modulo lcm(n, m), found by CRT. Counting matches up to day X is then easy, and binary search on X finds the k-th mismatch.',
    'যেসব দিনে দুটি ঝাড়বাতি রঙ c দেখায় তারা lcm(n, m) মডুলোতে একটি অবশেষ-শ্রেণি, CRT দিয়ে পাওয়া। তখন দিন X পর্যন্ত মিল গোনা সহজ, আর X-এর ওপর বাইনারি সার্চ k-তম অমিল খোঁজে।',
  ),
  statement: L(
    'Chandelier 1 cycles through n distinct colours a₁ … aₙ, chandelier 2 through m distinct colours b₁ … bₘ, one colour per day, both starting on day 1. Find the day on which their colours differ for the k-th time.',
    'ঝাড়বাতি ১ n-টি ভিন্ন রঙ a₁ … aₙ চক্রাকারে দেখায়, ঝাড়বাতি ২ m-টি ভিন্ন রঙ b₁ … bₘ, প্রতিদিন একটি রঙ, দুটোই দিন ১ থেকে শুরু। কোন দিনে তাদের রঙ k-তম বার ভিন্ন হয়, বের করুন।',
  ),
  input: L('n m k, then a, then b.', 'n m k, তারপর a, তারপর b।'),
  output: L('The day number.', 'দিনের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 5·10⁵, k ≤ 10¹², colours ≤ 2·max(n, m); the sequences differ somewhere', 'n, m ≤ ৫·১০⁵, k ≤ ১০¹², রঙ ≤ ২·max(n, m); অনুক্রম দুটি কোথাও ভিন্ন')] },
  samples: [
    { input: '4 2 4\n4 2 3 1\n2 1', output: '5', explain: L('Days 1, 2, 3, 5 differ; day 4 shows 1 and 1.', 'দিন ১, ২, ৩, ৫ ভিন্ন; দিন ৪-এ ১ আর ১।') },
    { input: '3 8 41\n1 3 2\n1 6 4 3 5 7 2 8', output: '47', explain: L('Found by counting matches.', 'মিল গুনে পাওয়া।') },
    { input: '1 2 31\n1\n1 2', output: '62', explain: L('They differ exactly on even days.', 'ঠিক জোড় দিনে ভিন্ন।') },
  ],
  observation: L(
    'Use 0-indexed days d. Colour c sits at index i in a and j in b, so both show it iff d ≡ i (mod n) and d ≡ j (mod m). By CRT this is either impossible (i ≢ j mod gcd) or one residue t_c modulo L = lcm(n, m). The number of matching days among the first X is Σ_c ⌊(X − 1 − t_c)/L⌋ + 1 over t_c < X, which grows with X, so binary search the smallest X with X − matches(X) ≥ k.',
    '০-সূচক দিন d নিন। রঙ c a-তে সূচক i-তে আর b-তে j-তে, তাই দুটোই দেখায় যদি ও কেবল যদি d ≡ i (mod n) আর d ≡ j (mod m)। CRT অনুযায়ী এটি হয় অসম্ভব (i ≢ j mod gcd), নয়তো L = lcm(n, m) মডুলোতে একটি অবশেষ t_c। প্রথম X দিনে মিল-দিনের সংখ্যা t_c < X-এর ওপর Σ_c ⌊(X − ১ − t_c)/L⌋ + ১, যা X-এর সঙ্গে বাড়ে, তাই X − matches(X) ≥ k এমন সবচেয়ে ছোট X বাইনারি সার্চ করুন।',
  ),
  approach: [
    L('Position of every colour in b; for each colour of a also in b, CRT → t_c.', 'b-তে প্রতিটি রঙের অবস্থান; a-এর যে রঙ b-তেও আছে তার CRT → t_c।'),
    L('Binary search X ∈ [1, 2·10¹⁸] on X − matches(X) ≥ k.', 'X ∈ [১, ২·১০¹⁸]-এ X − matches(X) ≥ k-এর ওপর বাইনারি সার্চ।'),
  ],
  walkthrough: {
    input: 'a = 4 2 3 1, b = 2 1',
    steps: [
      { state: 'colour 2: i = 1, j = 0 → d ≡ 1 (mod 4), d ≡ 0 (mod 2): impossible', text: L('Parities clash.', 'সমতা মেলে না।') },
      { state: 'colour 1: i = 3, j = 1 → d ≡ 3 (mod 4): day 4', text: L('The only matching day per 4.', 'প্রতি ৪ দিনে একমাত্র মিল-দিন।') },
      { state: 'X = 5: 5 − 1 = 4 mismatches', text: L('Answer 5.', 'উত্তর ৫।') },
    ],
  },
  complexity: { time: 'O((n + m) log + n · 62)', space: 'O(n + m)', why: L('One CRT per colour, then about 62 counting passes.', 'প্রতি রঙে একটি CRT, তারপর প্রায় ৬২টি গণনা-পাস।') },
  solutions: [
    {
      id: 'crt-bsearch',
      kind: 'optimal',
      title: L('CRT per colour + binary search on the day', 'প্রতি রঙে CRT + দিনের ওপর বাইনারি সার্চ'),
      idea: L('Matching days form ≤ min(n, m) residue classes mod lcm.', 'মিল-দিনগুলো lcm মডুলোতে ≤ min(n, m)টি অবশেষ-শ্রেণি।'),
      explain: [
        L(
          'lcm(n, m) can be about 2.5·10¹¹ and the answer about 5·10¹⁷, so products in the CRT step need __int128. The binary search works because the number of mismatches up to X never decreases.',
          'lcm(n, m) প্রায় ২.৫·১০¹¹ আর উত্তর প্রায় ৫·১০¹⁷ হতে পারে, তাই CRT ধাপের গুণে __int128 লাগে। X পর্যন্ত অমিলের সংখ্যা কখনো কমে না বলে বাইনারি সার্চ চলে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll egcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1, y = 0; return a; }
    ll g = egcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}

int main() {
    ll n, m, k;
    scanf("%lld %lld %lld", &n, &m, &k);
    vector<ll> a(n), posB(2 * max(n, m) + 1, -1);
    for (auto& v : a) scanf("%lld", &v);
    for (ll j = 0; j < m; j++) { ll v; scanf("%lld", &v); posB[v] = j; }
    ll p, q, g = egcd(n, m, p, q), Lc = n / g * m, mg = m / g;
    ll inv = ((p % mg) + mg) % mg;  // inverse of n/g modulo m/g
    vector<ll> t;
    for (ll i = 0; i < n; i++) {
        ll j = posB[a[i]];
        if (j < 0 || (j - i) % g) continue;
        ll s = (__int128)(((j - i) / g % mg + mg) % mg) * inv % mg;
        t.push_back(i + n * s);  // d ≡ i (mod n), d ≡ j (mod m), 0 <= d < lcm
    }
    auto mismatches = [&](ll X) {  // among days 1..X (0-indexed 0..X-1)
        __int128 same = 0;
        for (ll v : t) if (v < X) same += (X - 1 - v) / Lc + 1;
        return (__int128)X - same;
    };
    ll lo = 1, hi = 2000000000000000000LL;
    while (lo < hi) {
        ll mid = lo + (hi - lo) / 2;
        if (mismatches(mid) >= k) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
`,
      time: 'O(n log X)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['gcd-lcm', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Walk day by day', 'দিনে দিনে হাঁটা'),
      idea: L('Compare colours on each day until k mismatches are seen.', 'k-টি অমিল না দেখা পর্যন্ত প্রতিদিন রঙ তুলনা।'),
      explain: [L('O(answer): fine for small k.', 'O(উত্তর): ছোট k-তে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m, k;
    cin >> n >> m >> k;
    vector<long long> a(n), b(m);
    for (auto& v : a) cin >> v;
    for (auto& v : b) cin >> v;
    if (k > 3000000) { cout << "\n"; return 0; }
    long long seen = 0;
    for (long long d = 0;; d++) {
        if (a[d % n] != b[d % m] && ++seen == k) { cout << d + 1 << "\n"; return 0; }
        if (d > 200000000) { cout << "\n"; return 0; }
    }
}
`,
      time: 'O(answer)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['modulo'],
    },
  ],
  tests: [
    { input: '4 2 4\n4 2 3 1\n2 1', output: '5', source: 'sample', note: sample(1) },
    { input: '3 8 41\n1 3 2\n1 6 4 3 5 7 2 8', output: '47', source: 'sample', note: sample(2) },
    { input: '1 2 31\n1\n1 2', output: '62', source: 'sample', note: sample(3) },
  ],
  pitfalls: [
    L('Assuming n and m coprime: CRT needs the gcd check.', 'n আর m সহমৌলিক ধরা: CRT-এ gcd যাচাই লাগে।'),
    L('An upper bound like k · lcm overflows; use a safe constant or __int128.', 'k · lcm-এর মতো ঊর্ধ্বসীমা উপচে পড়ে; নিরাপদ ধ্রুবক বা __int128 নিন।'),
  ],
  related: [
    { id: '919E', name: 'Congruence Equation', why: L('Counting a residue class up to x.', 'x পর্যন্ত একটি অবশেষ-শ্রেণি গোনা।') },
    { id: '338D', name: 'GCD Table', why: L('CRT with many non-coprime moduli.', 'অনেক অসহমৌলিক মডুলাসে CRT।') },
  ],
  toolkit: ['gcd-lcm', 'long-long'],
};

// ───────────────────────────────────────────── 1748D
export const p1748D: ProblemEntry = {
  id: '1748D',
  contestId: 1748,
  index: 'D',
  name: 'ConstructOR',
  rating: 2100,
  tags: ['bitmasks', 'crt', 'combinatorics', 'constructive', 'math', 'number-theory'],
  why: L(
    'Make x contain every bit of a and b, so that a | x = b | x = x, and make x a multiple of d. Both are congruences: one modulo 2³⁰ (fixed low bits) and one modulo the odd part of d, combined by CRT.',
    'x-এ a আর b-এর প্রতিটি বিট রাখুন, যাতে a | x = b | x = x, আর x-কে d-এর গুণিতক করুন। দুটোই সর্বসমতা: একটি ২³⁰ মডুলোতে (নির্দিষ্ট নিচের বিট) আর একটি d-এর বিজোড় অংশের মডুলোতে, CRT দিয়ে মেলানো।',
  ),
  statement: L(
    'Given a, b, d (all below 2³⁰), find x with 0 ≤ x < 2⁶⁰ such that both a | x and b | x are divisible by d (| is bitwise OR), or report −1.',
    'a, b, d দেওয়া (সব ২³⁰-এর নিচে)। ০ ≤ x < ২⁶⁰ এমন x খুঁজুন যাতে a | x আর b | x দুটোই d দিয়ে বিভাজ্য (| হলো বিটভিত্তিক OR), নইলে −১।',
  ),
  input: L('t tests; each has a b d.', 't-টি টেস্ট; প্রতিটিতে a b d।'),
  output: L('x or −1 per test.', 'প্রতি টেস্টে x বা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('t ≤ 10⁴, 1 ≤ a, b, d < 2³⁰', 't ≤ ১০⁴, ১ ≤ a, b, d < ২³⁰'), L('Any valid x is accepted.', 'যেকোনো বৈধ x গ্রহণযোগ্য।')] },
  samples: [
    { input: '3\n12 39 5\n6 8 14\n100 200 200', output: '175\n14\n-1', explain: L('Any valid x is accepted; these come from the bit-by-bit construction. In the last test d = 200 is divisible by 8 but a = 100 has bit 2 set, so it is impossible.', 'যেকোনো বৈধ x গ্রহণযোগ্য; এগুলো বিট-ধরে নির্মাণ থেকে। শেষ টেস্টে d = ২০০ ৮ দিয়ে বিভাজ্য কিন্তু a = ১০০-এর বিট ২ সেট, তাই অসম্ভব।') },
  ],
  observation: L(
    'Let d = 2ᵏ · d′ with d′ odd. If a or b has a set bit below position k, then a | x is odd-ish in those bits and never divisible by 2ᵏ: answer −1. Otherwise choose x whose bits k … 29 are all set and bits 0 … k − 1 are clear; then a | x = b | x = x, and we only need d | x. That is x ≡ 2³⁰ − 2ᵏ (mod 2³⁰) and x ≡ 0 (mod d′): CRT with coprime moduli.',
    'd = ২ᵏ · d′, d′ বিজোড়। a বা b-এর k অবস্থানের নিচে কোনো বিট থাকলে a | x-এর সেই বিট কখনো ২ᵏ দিয়ে বিভাজ্য হতে দেয় না: উত্তর −১। নইলে এমন x নিন যার বিট k … ২৯ সব সেট আর ০ … k − ১ ফাঁকা; তখন a | x = b | x = x, আর শুধু d | x লাগে। অর্থাৎ x ≡ ২³⁰ − ২ᵏ (mod ২³⁰) আর x ≡ ০ (mod d′): সহমৌলিক মডুলাসে CRT।',
  ),
  approach: [
    L('k = number of trailing zeros of d; reject if (a | b) has bits below k.', 'k = d-এর শেষের শূন্যের সংখ্যা; (a | b)-এর k-এর নিচে বিট থাকলে বাতিল।'),
    L('Greedy: for each bit i ≥ k of (a | b) missing in x, add d · 2^(i−k); the low bits stay unchanged.', 'লোভী: (a | b)-এর x-এ না থাকা প্রতিটি বিট i ≥ k-এর জন্য d · ২^(i−k) যোগ; নিচের বিট অপরিবর্তিত থাকে।'),
  ],
  walkthrough: {
    input: 'a = 12, b = 39, d = 5 (k = 0)',
    steps: [
      { state: 'a | b = 47 = 101111₂', text: L('Bits 0, 1, 2, 3, 5 must appear in x.', 'বিট ০, ১, ২, ৩, ৫ x-এ লাগবে।') },
      { state: 'add 5·1, then 5·2 for bit 1 … until all are set', text: L('x stays a multiple of 5 at every step.', 'প্রতিটি ধাপে x ৫-এর গুণিতক থাকে।') },
    ],
  },
  complexity: { time: 'O(30) per test', space: 'O(1)', why: L('One pass over the bits.', 'বিটগুলোর ওপর এক পাস।') },
  solutions: [
    {
      id: 'greedy-bits',
      kind: 'optimal',
      title: L('Add shifted copies of d bit by bit', 'বিট ধরে d-এর সরানো কপি যোগ'),
      idea: L('d · 2^(i−k) has its lowest set bit exactly at i, so adding it fixes bit i without touching lower bits.', 'd · ২^(i−k)-এর সবচেয়ে নিচের সেট বিট ঠিক i-তে, তাই যোগ করলে নিচের বিট না ছুঁয়ে বিট i ঠিক হয়।'),
      explain: [
        L(
          'Every step adds a multiple of d, so x stays divisible by d; processing bits from low to high never breaks a bit already set. The largest term is below 2³⁰ · 2²⁹, so x < 2⁶⁰.',
          'প্রতিটি ধাপ d-এর একটি গুণিতক যোগ করে, তাই x d দিয়ে বিভাজ্য থাকে; নিচ থেকে ওপরে বিট প্রক্রিয়া করলে আগে সেট করা বিট ভাঙে না। সবচেয়ে বড় পদ ২³⁰ · ২²⁹-এর নিচে, তাই x < ২⁶⁰।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long a, b, d;
        scanf("%lld %lld %lld", &a, &b, &d);
        int k = __builtin_ctzll(d);
        long long need = a | b;
        if (need & ((1LL << k) - 1)) { puts("-1"); continue; }
        long long x = 0;
        for (int i = k; i < 30; i++)
            if ((need >> i & 1) && !(x >> i & 1)) x += d << (i - k);
        printf("%lld\n", x);
    }
    return 0;
}
`,
      time: 'O(30)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'bitwise-and'],
    },
    {
      id: 'crt',
      kind: 'method',
      title: L('CRT: fixed low bits and a multiple of the odd part', 'CRT: নির্দিষ্ট নিচের বিট আর বিজোড় অংশের গুণিতক'),
      idea: L('x ≡ 2³⁰ − 2ᵏ (mod 2³⁰), x ≡ 0 (mod d′).', 'x ≡ ২³⁰ − ২ᵏ (mod ২³⁰), x ≡ ০ (mod d′)।'),
      explain: [
        L(
          'Write x = (2³⁰ − 2ᵏ) + 2³⁰·s. Divisibility by d′ needs s ≡ −(2³⁰ − 2ᵏ) · (2³⁰)⁻¹ (mod d′), and 2³⁰ is invertible because d′ is odd. Then x is a multiple of 2ᵏ (low bits clear) and of d′, hence of d.',
          'x = (২³⁰ − ২ᵏ) + ২³⁰·s লিখুন। d′ দিয়ে বিভাজ্যতায় s ≡ −(২³⁰ − ২ᵏ) · (২³⁰)⁻¹ (mod d′) লাগে, আর d′ বিজোড় বলে ২³⁰ বিপরীতযোগ্য। তখন x ২ᵏ-এর গুণিতক (নিচের বিট ফাঁকা) আর d′-এর, তাই d-এর।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
ll power(ll b, ll e, ll m) {
    ll r = 1 % m;
    for (b %= m; e; e >>= 1, b = (__int128)b * b % m)
        if (e & 1) r = (__int128)r * b % m;
    return r;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll a, b, d;
        scanf("%lld %lld %lld", &a, &b, &d);
        int k = __builtin_ctzll(d);
        if ((a | b) & ((1LL << k) - 1)) { puts("-1"); continue; }
        ll odd = d >> k, low = (1LL << 30) - (1LL << k);
        ll inv = power((odd + 1) / 2, 30, odd);  // (odd+1)/2 is the inverse of 2 modulo an odd number
        ll s = (__int128)((odd - low % odd) % odd) * inv % odd;
        printf("%lld\n", low + (s << 30));
    }
    return 0;
}
`,
      time: 'O(log) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow', 'bit-shift'],
    },
  ],
  tests: [
    { input: '3\n12 39 5\n6 8 14\n100 200 200', output: '175\n14\n-1', source: 'sample', note: sample(1) },
    { input: '1\n3 4 6', output: '-1', source: 'own', note: L('d is even but a is odd: a | x is always odd.', 'd জোড় কিন্তু a বিজোড়: a | x সবসময় বিজোড়।') },
  ],
  pitfalls: [
    L('Trying to fix a and b separately: one x must serve both.', 'a আর b আলাদাভাবে ঠিক করার চেষ্টা: একটি x-কেই দুটো সামলাতে হবে।'),
    L('Missing the impossibility test on the trailing zeros of d.', 'd-এর শেষের শূন্যের অসম্ভবতা-যাচাই বাদ দেওয়া।'),
  ],
  related: [
    { id: '919E', name: 'Congruence Equation', why: L('Combining two congruences.', 'দুটি সর্বসমতা মেলানো।') },
    { id: '551D', name: 'GukiZ and Binary Operations', why: L('Reasoning bit by bit.', 'বিট ধরে যুক্তি।') },
  ],
  toolkit: ['bit-shift', 'bitwise-and'],
};

// ───────────────────────────────────────────── 338D
export const p338D: ProblemEntry = {
  id: '338D',
  contestId: 338,
  index: 'D',
  name: 'GCD Table',
  rating: 2900,
  tags: ['crt', 'math', 'number-theory'],
  why: L(
    'If the sequence occurs in row i, then every aₗ divides i, so the smallest candidate row is L = lcm(a). The column then satisfies k congruences j + l ≡ 0 (mod aₗ), merged one by one with general CRT.',
    'অনুক্রমটি সারি i-তে থাকলে প্রতিটি aₗ i-কে ভাগ করে, তাই সবচেয়ে ছোট প্রার্থী সারি L = lcm(a)। তখন কলাম k-টি সর্বসমতা j + l ≡ ০ (mod aₗ) মানে, সাধারণ CRT দিয়ে একে একে মেলানো।',
  ),
  statement: L(
    'An n × m table has G(i, j) = gcd(i, j). Does the sequence a₁ … aₖ occur in some row as consecutive cells, that is, are there i and j with G(i, j + l − 1) = aₗ for all l?',
    'n × m টেবিলে G(i, j) = gcd(i, j)। অনুক্রম a₁ … aₖ কি কোনো সারিতে পরপর ঘরে আছে, অর্থাৎ এমন i আর j কি আছে যাতে সব l-এ G(i, j + l − ১) = aₗ?',
  ),
  input: L('n m k, then a₁ … aₖ.', 'n m k, তারপর a₁ … aₖ।'),
  output: L('YES or NO.', 'YES বা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m ≤ 10¹², k ≤ 10⁴, aₗ ≤ 10¹²', 'n, m ≤ ১০¹², k ≤ ১০⁴, aₗ ≤ ১০¹²')] },
  samples: [
    { input: '100 100 5\n5 2 1 2 1', output: 'YES', explain: L('Row 10, columns 5 to 9.', 'সারি ১০, কলাম ৫ থেকে ৯।') },
    { input: '100 8 5\n5 2 1 2 1', output: 'NO', explain: L('Only 8 columns.', 'মাত্র ৮টি কলাম।') },
    { input: '100 100 7\n1 2 3 4 5 6 7', output: 'NO', explain: L('No row and column fit.', 'কোনো সারি আর কলাম মেলে না।') },
  ],
  observation: L(
    'Every aₗ divides i, so lcm(a) = L divides i. Taking i = L is best: a larger multiple of L only adds common factors and can only break gcd = aₗ. The column must satisfy aₗ | j + l − 1 for all l: a system of congruences; general CRT gives the smallest j ≥ 1 or shows none exists. Finally check j + k − 1 ≤ m, L ≤ n and gcd(L, j + l − 1) = aₗ for every l.',
    'প্রতিটি aₗ i-কে ভাগ করে, তাই lcm(a) = L i-কে ভাগ করে। i = L নেওয়াই সেরা: L-এর বড় গুণিতক শুধু সাধারণ উৎপাদক যোগ করে আর gcd = aₗ ভাঙতেই পারে। কলামকে সব l-এ aₗ | j + l − ১ মানতে হবে: সর্বসমতার একটি তন্ত্র; সাধারণ CRT সবচেয়ে ছোট j ≥ ১ দেয় বা দেখায় যে নেই। শেষে j + k − ১ ≤ m, L ≤ n আর প্রতিটি l-এ gcd(L, j + l − ১) = aₗ যাচাই।',
  ),
  approach: [
    L('L = lcm, stopping as soon as it exceeds n.', 'L = lcm, n ছাড়ালেই থামা।'),
    L('Merge j ≡ −(l − 1) (mod aₗ) with general CRT (__int128).', 'সাধারণ CRT (__int128) দিয়ে j ≡ −(l − ১) (mod aₗ) মেলানো।'),
    L('j = residue, or L if the residue is 0; verify every gcd.', 'j = অবশেষ, বা অবশেষ ০ হলে L; প্রতিটি gcd যাচাই।'),
  ],
  walkthrough: {
    input: '5 2 1 2 1 in a 100 × 100 table',
    steps: [
      { state: 'L = 10', text: L('Row 10.', 'সারি ১০।') },
      { state: 'j ≡ 0 (mod 5), j + 1 ≡ 0 (mod 2), j + 3 ≡ 0 (mod 2) → j ≡ 5 (mod 10)', text: L('Columns 5 … 9: gcds 5, 2, 1, 2, 1.', 'কলাম ৫ … ৯: gcd ৫, ২, ১, ২, ১।') },
    ],
  },
  complexity: { time: 'O(k log)', space: 'O(k)', why: L('k merges and k gcd checks.', 'k-টি মেলানো আর k-টি gcd যাচাই।') },
  solutions: [
    {
      id: 'lcm-crt',
      kind: 'optimal',
      title: L('Row = lcm, column by general CRT', 'সারি = lcm, কলাম সাধারণ CRT দিয়ে'),
      idea: L('Merge k congruences, then verify.', 'k-টি সর্বসমতা মেলানো, তারপর যাচাই।'),
      explain: [
        L(
          'Merging non-coprime congruences: x ≡ r₁ (mod m₁) and x ≡ r₂ (mod m₂) are compatible iff r₁ ≡ r₂ (mod gcd), and the result is modulo lcm. The final verification matters: CRT guarantees aₗ divides the gcd, not that the gcd equals aₗ.',
          'অসহমৌলিক সর্বসমতা মেলানো: x ≡ r₁ (mod m₁) আর x ≡ r₂ (mod m₂) সামঞ্জস্যপূর্ণ যদি ও কেবল যদি r₁ ≡ r₂ (mod gcd), আর ফল lcm মডুলোতে। শেষ যাচাই জরুরি: CRT নিশ্চিত করে aₗ gcd-কে ভাগ করে, gcd যে aₗ-এর সমান তা নয়।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef __int128 LL;

ll egcd(ll a, ll b, ll& x, ll& y) {
    if (!b) { x = 1, y = 0; return a; }
    ll g = egcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}

int main() {
    ll n, m;
    int k;
    cin >> n >> m >> k;
    vector<ll> a(k);
    for (auto& v : a) cin >> v;
    ll Lc = 1;
    for (ll v : a) {
        LL l = (LL)Lc / __gcd(Lc, v) * v;
        if (l > n) { puts("NO"); return 0; }
        Lc = (ll)l;
    }
    ll r = 0, mod = 1;  // j ≡ r (mod mod)
    for (int l = 0; l < k; l++) {
        ll r2 = ((-(ll)l) % a[l] + a[l]) % a[l], m2 = a[l];
        ll p, q, g = egcd(mod, m2, p, q);
        if ((r2 - r) % g) { puts("NO"); return 0; }
        ll mg = m2 / g;
        ll t = (LL)(((r2 - r) / g % mg + mg) % mg) * ((p % mg + mg) % mg) % mg;
        ll nm = mod / g * m2;  // stays <= lcm(a) <= n
        r = (ll)(((LL)r + (LL)mod * t) % nm);
        mod = nm;
    }
    ll j = r == 0 ? mod : r;
    if ((LL)j + k - 1 > m) { puts("NO"); return 0; }
    for (int l = 0; l < k; l++)
        if (__gcd(Lc, j + l) != a[l]) { puts("NO"); return 0; }
    puts("YES");
    return 0;
}
`,
      time: 'O(k log)',
      space: 'O(k)',
      accepted: true,
      toolkit: ['gcd-lcm', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Scan the table', 'টেবিল স্ক্যান'),
      idea: L('Try every row and starting column of a small table.', 'ছোট টেবিলের প্রতিটি সারি আর শুরুর কলাম চেষ্টা।'),
      explain: [L('O(n · m · k): only for tiny tables, but it tests the lcm argument too.', 'O(n · m · k): শুধু ক্ষুদ্র টেবিলে, কিন্তু lcm যুক্তিও যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m;
    int k;
    cin >> n >> m >> k;
    vector<long long> a(k);
    for (auto& v : a) cin >> v;
    if (n > 300 || m > 300) { cout << "\n"; return 0; }
    for (long long i = 1; i <= n; i++)
        for (long long j = 1; j + k - 1 <= m; j++) {
            bool ok = true;
            for (int l = 0; l < k && ok; l++) ok = __gcd(i, j + l) == a[l];
            if (ok) { cout << "YES\n"; return 0; }
        }
    cout << "NO\n";
    return 0;
}
`,
      time: 'O(n · m · k)',
      space: 'O(k)',
      accepted: false,
      toolkit: ['gcd-lcm'],
    },
  ],
  tests: [
    { input: '100 100 5\n5 2 1 2 1', output: 'YES', source: 'sample', note: sample(1) },
    { input: '100 8 5\n5 2 1 2 1', output: 'NO', source: 'sample', note: sample(2) },
    { input: '100 100 7\n1 2 3 4 5 6 7', output: 'NO', source: 'sample', note: sample(3) },
    { input: '1000000000000 1000000000000 1\n1000000000000', output: 'YES', source: 'own', note: L('G(10¹², 10¹²) = 10¹².', 'G(১০¹², ১০¹²) = ১০¹²।') },
  ],
  pitfalls: [
    L('Skipping the final gcd check: CRT only ensures divisibility.', 'শেষ gcd যাচাই বাদ: CRT শুধু বিভাজ্যতা নিশ্চিত করে।'),
    L('Letting the lcm overflow before comparing with n.', 'n-এর সঙ্গে তুলনার আগে lcm উপচে পড়তে দেওয়া।'),
  ],
  related: [
    { id: '1500B', name: 'Two chandeliers', why: L('CRT with non-coprime moduli.', 'অসহমৌলিক মডুলাসে CRT।') },
    { id: '687B', name: 'Remainders Game', why: L('lcm of moduli and what remainders reveal.', 'মডুলাসের lcm আর অবশেষ কী প্রকাশ করে।') },
  ],
  toolkit: ['gcd-lcm'],
};
