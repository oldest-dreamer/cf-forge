import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

/* Shared: polynomial hashing modulo the Mersenne prime 2^61 − 1 with a random base. */
const hash61 = raw`typedef unsigned long long ull;
const ull MOD = (1ULL << 61) - 1;
ull mul(ull a, ull b) {
    __uint128_t c = (__uint128_t)a * b;
    ull r = (ull)(c & MOD) + (ull)(c >> 61);
    return r >= MOD ? r - MOD : r;
}
ull add(ull a, ull b) { a += b; return a >= MOD ? a - MOD : a; }
ull sub(ull a, ull b) { return a >= b ? a - b : a + MOD - b; }`;

// ───────────────────────────────────────────── 1137B
export const p1137B: ProblemEntry = {
  id: '1137B',
  contestId: 1137,
  index: 'B',
  name: 'Camp Schedule',
  rating: 1600,
  tags: ['greedy', 'hashing', 'strings'],
  why: L(
    'The longest border of t tells you how much of the previous copy can be reused by the next one. Find it with the prefix function or with hashing, then build greedily.',
    't-এর দীর্ঘতম বর্ডার বলে দেয় আগের কপির কতটা পরের কপি আবার ব্যবহার করতে পারে। প্রিফিক্স ফাংশন বা হ্যাশিং দিয়ে তা খুঁজে লোভী পদ্ধতিতে বানান।',
  ),
  statement: L(
    'Binary strings s and t are given. Rearrange the characters of s (keeping the same number of 0s and 1s) so that t occurs in it as a substring as many times as possible. Occurrences may overlap. Print any best arrangement.',
    'বাইনারি স্ট্রিং s আর t দেওয়া। s-এর অক্ষরগুলো সাজান (০ আর ১-এর সংখ্যা একই রেখে) যাতে t সাবস্ট্রিং হিসেবে যত বেশি সম্ভব বার আসে। ঘটনা একে অপরের ওপর পড়তে পারে। যেকোনো সেরা বিন্যাস ছাপুন।',
  ),
  input: L('Two lines: s and t.', 'দুই লাইন: s আর t।'),
  output: L('A rearrangement of s with the maximum number of occurrences of t.', 's-এর এমন বিন্যাস যাতে t সর্বোচ্চ বার আসে।'),
  limits: { timeSec: 1, memoryMb: 512, notes: [L('1 ≤ |s|, |t| ≤ 5·10⁵', '১ ≤ |s|, |t| ≤ ৫·১০⁵'), L('Any optimal answer is accepted.', 'যেকোনো সর্বোত্তম উত্তর গ্রহণযোগ্য।')] },
  samples: [
    { input: '101101\n110', output: '110110', explain: L('Two occurrences of 110; no arrangement has three.', '১১০ দুবার; কোনো বিন্যাসে তিনবার নেই।') },
    { input: '10010110\n100011', output: '01100011', explain: L('One occurrence is the best possible.', 'একবারই সর্বোচ্চ।') },
    { input: '10\n11100', output: '01', explain: L('t is longer than s: any arrangement.', 't, s-এর চেয়ে লম্বা: যেকোনো বিন্যাস।') },
  ],
  observation: L(
    'Let p be the length of the longest proper border of t (a prefix that is also a suffix). After one full copy of t, the next occurrence can start p characters before the end, so each further occurrence costs only t[p..] characters. Writing t, then t[p..] again and again, packs occurrences as tightly as possible; stop when a needed character runs out, then dump the leftovers.',
    'p হোক t-এর দীর্ঘতম প্রকৃত বর্ডারের দৈর্ঘ্য (যে প্রিফিক্স সাফিক্সও)। t-এর একটি পূর্ণ কপির পর পরের ঘটনা শেষের p অক্ষর আগে শুরু হতে পারে, তাই প্রতিটি নতুন ঘটনায় খরচ শুধু t[p..]-এর অক্ষর। t, তারপর বারবার t[p..] লিখলে ঘটনাগুলো সবচেয়ে ঘনভাবে বসে; দরকারি অক্ষর ফুরালে থামুন, তারপর বাকিগুলো বসান।',
  ),
  approach: [
    L('Count zeros and ones of s.', 's-এর শূন্য আর একের সংখ্যা গোনা।'),
    L('p = prefix function of t at its last position.', 'p = t-এর শেষ অবস্থানে প্রিফিক্স ফাংশন।'),
    L('Walk j through t: append t[j] while it is available; after j = |t| jump to j = p.', 't-এর ভেতর j চালান: পাওয়া গেলে t[j] যোগ; j = |t| হলে j = p-তে লাফ।'),
    L('Append the remaining zeros and ones.', 'বাকি শূন্য আর এক যোগ।'),
  ],
  walkthrough: {
    input: 's = 101101 (two 0s, four 1s), t = 110',
    steps: [
      { state: 'border of 110 is empty, p = 0', text: L('Copies cannot overlap.', 'কপিগুলো ওভারল্যাপ করতে পারে না।') },
      { state: '110 → left: one 0, two 1s', text: L('First copy.', 'প্রথম কপি।') },
      { state: '110110 → nothing left', text: L('Second copy; two occurrences.', 'দ্বিতীয় কপি; দুটি ঘটনা।') },
    ],
  },
  complexity: { time: 'O(|s| + |t|)', space: 'O(|s| + |t|)', why: L('Prefix function plus one pass to build.', 'প্রিফিক্স ফাংশন আর বানাতে এক পাস।') },
  solutions: [
    {
      id: 'prefix-function',
      kind: 'optimal',
      title: L('Greedy copies with the prefix-function border', 'প্রিফিক্স-ফাংশন বর্ডারসহ লোভী কপি'),
      idea: L('Write t, then keep writing t[p..] while the characters last.', 't লিখুন, তারপর অক্ষর থাকা পর্যন্ত t[p..] লিখতে থাকুন।'),
      explain: [
        L(
          'Why greedy is optimal: every occurrence after the first needs at least |t| − p new characters, and we spend exactly that, choosing the cheapest possible overlap each time. Putting the leftover characters at the end can only add occurrences, never remove them.',
          'লোভী কেন সর্বোত্তম: প্রথমটির পর প্রতিটি ঘটনায় অন্তত |t| − p নতুন অক্ষর লাগে, আর আমরা ঠিক তা-ই খরচ করি, প্রতিবার সবচেয়ে সস্তা ওভারল্যাপ বেছে। বাকি অক্ষর শেষে রাখলে ঘটনা শুধু বাড়তে পারে, কমে না।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    int c[2] = {0, 0};
    for (char ch : s) c[ch - '0']++;
    int m = t.size();
    vector<int> pi(m, 0);
    for (int i = 1; i < m; i++) {
        int k = pi[i - 1];
        while (k && t[i] != t[k]) k = pi[k - 1];
        if (t[i] == t[k]) k++;
        pi[i] = k;
    }
    int p = pi[m - 1];  // longest proper border of t
    string out;
    out.reserve(s.size());
    for (int j = 0;; ) {
        int need = t[j] - '0';
        if (!c[need]) break;
        c[need]--;
        out += t[j];
        if (++j == m) j = p;  // the next copy reuses the border
    }
    out += string(c[0], '0') + string(c[1], '1');
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(|s| + |t|)',
      space: 'O(|s| + |t|)',
      accepted: true,
      toolkit: ['string-basics', 'while-n'],
    },
    {
      id: 'hash-border',
      kind: 'method',
      title: L('Find the border by hashing', 'হ্যাশিং দিয়ে বর্ডার খোঁজা'),
      idea: L('The largest p < |t| with hash(t[0..p)) = hash(t[|t|−p..|t|)).', 'সবচেয়ে বড় p < |t| যেখানে hash(t[০..p)) = hash(t[|t|−p..|t|))।'),
      explain: [
        L(
          'Prefix hashes give every prefix and every suffix hash in O(1), so all candidate borders are tested in O(|t|). It is the same answer as the prefix function, found by a tool you may already have in your template.',
          'প্রিফিক্স হ্যাশ প্রতিটি প্রিফিক্স আর সাফিক্সের হ্যাশ O(১)-এ দেয়, তাই সব সম্ভাব্য বর্ডার O(|t|)-এ যাচাই হয়। প্রিফিক্স ফাংশনের একই উত্তর, এমন এক টুল দিয়ে যা হয়তো আপনার টেমপ্লেটে আগে থেকেই আছে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    string s, t;
    cin >> s >> t;
    int c[2] = {0, 0};
    for (char ch : s) c[ch - '0']++;
    int m = t.size();
    vector<ull> pre(m + 1, 0), pw(m + 1, 1);
    for (int i = 0; i < m; i++) {
        pre[i + 1] = add(mul(pre[i], B), (ull)t[i]);
        pw[i + 1] = mul(pw[i], B);
    }
    auto get = [&](int l, int r) { return sub(pre[r], mul(pre[l], pw[r - l])); };
    int p = 0;
    for (int len = m - 1; len >= 1; len--)
        if (get(0, len) == get(m - len, m)) { p = len; break; }
    string out;
    for (int j = 0;; ) {
        int need = t[j] - '0';
        if (!c[need]) break;
        c[need]--;
        out += t[j];
        if (++j == m) j = p;
    }
    out += string(c[0], '0') + string(c[1], '1');
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(|s| + |t|)',
      space: 'O(|s| + |t|)',
      accepted: true,
      toolkit: ['prefix-sum', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every arrangement', 'প্রতিটি বিন্যাস চেষ্টা'),
      idea: L('next_permutation over the sorted s; count occurrences in each.', 'সাজানো s-এর ওপর next_permutation; প্রতিটিতে ঘটনা গোনা।'),
      explain: [L('Exponential, tiny inputs only, but it knows nothing about borders.', 'সূচকীয়, শুধু ক্ষুদ্র ইনপুট, কিন্তু বর্ডার সম্পর্কে কিছুই জানে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    if (s.size() > 12) { cout << "\n"; return 0; }
    sort(s.begin(), s.end());
    string best = s;
    int bestCnt = -1;
    do {
        int cnt = 0;
        for (size_t i = 0; i + t.size() <= s.size(); i++)
            if (s.compare(i, t.size(), t) == 0) cnt++;
        if (cnt > bestCnt) bestCnt = cnt, best = s;
    } while (next_permutation(s.begin(), s.end()));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(|s|! · |s|)',
      space: 'O(|s|)',
      accepted: false,
      toolkit: ['sort'],
    },
  ],
  tests: [
    { input: '101101\n110', output: '110110', source: 'sample', note: sample(1) },
    { input: '10010110\n100011', output: '01100011', source: 'sample', note: sample(2) },
    { input: '10\n11100', output: '01', source: 'sample', note: sample(3) },
    { input: '11111\n11', output: '11111', source: 'own', note: L('Border 1: four overlapping occurrences.', 'বর্ডার ১: চারটি ওভারল্যাপিং ঘটনা।') },
  ],
  pitfalls: [
    L('Restarting from j = 0 after each copy: overlapping occurrences are lost.', 'প্রতিটি কপির পর j = ০ থেকে শুরু: ওভারল্যাপিং ঘটনা হারায়।'),
    L('Stopping as soon as a full copy is impossible but forgetting to append the leftover characters.', 'পূর্ণ কপি অসম্ভব হলে থেমে গিয়ে বাকি অক্ষর যোগ করতে ভোলা।'),
  ],
  related: [
    { id: '126B', name: 'Password', why: L('Borders of a string, by prefix function or hashing.', 'স্ট্রিংয়ের বর্ডার, প্রিফিক্স ফাংশন বা হ্যাশিং দিয়ে।') },
    { id: '182D', name: 'Common Divisors', why: L('Periods of strings.', 'স্ট্রিংয়ের পর্যায়।') },
  ],
  toolkit: ['string-basics'],
};

// ───────────────────────────────────────────── 1225D
export const p1225D: ProblemEntry = {
  id: '1225D',
  contestId: 1225,
  index: 'D',
  name: 'Power Products',
  rating: 1800,
  tags: ['hashing', 'math', 'number-theory'],
  why: L(
    'A product is a perfect k-th power when every prime exponent is a multiple of k. Reduce each number to a “signature” of exponents mod k, and its partner must have the complementary signature: a lookup in a hash table.',
    'একটি গুণফল নিখুঁত k-তম ঘাত যখন প্রতিটি মৌলিক সূচক k-এর গুণিতক। প্রতিটি সংখ্যাকে সূচক mod k-এর একটি “স্বাক্ষরে” নামান, তার সঙ্গী হবে পরিপূরক স্বাক্ষর: একটি হ্যাশ টেবিলে খোঁজা।',
  ),
  statement: L(
    'Given n positive integers a₁ … aₙ and k ≥ 2, count pairs i < j such that aᵢ · aⱼ = xᵏ for some integer x.',
    'n-টি ধনাত্মক পূর্ণসংখ্যা a₁ … aₙ আর k ≥ ২ দেওয়া। কতগুলো জোড়া i < j-তে কোনো পূর্ণসংখ্যা x-এর জন্য aᵢ · aⱼ = xᵏ, গুনুন।',
  ),
  input: L('n k, then a₁ … aₙ.', 'n k, তারপর a₁ … aₙ।'),
  output: L('The number of pairs.', 'জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('n ≤ 10⁵, 2 ≤ k ≤ 100, aᵢ ≤ 10⁵', 'n ≤ ১০⁵, ২ ≤ k ≤ ১০০, aᵢ ≤ ১০⁵')] },
  samples: [
    { input: '6 3\n1 3 9 8 24 1', output: '5', explain: L('1·8 = 2³, 1·1 = 1³, 1·8 again, 3·9 = 3³, 9·24 = 6³.', '১·৮ = ২³, ১·১ = ১³, আবার ১·৮, ৩·৯ = ৩³, ৯·২৪ = ৬³।') },
  ],
  observation: L(
    'Write a = Π pᵉ. The signature sig(a) = Π p^(e mod k) is at most a ≤ 10⁵. The partner must have sig = Π p^((k − e mod k) mod k); if that number exceeds 10⁵, no aⱼ can match. So each number needs one lookup in an array indexed by signature.',
    'a = Π pᵉ লিখুন। স্বাক্ষর sig(a) = Π p^(e mod k) সর্বোচ্চ a ≤ ১০⁵। সঙ্গীর sig = Π p^((k − e mod k) mod k) হতে হবে; সেই সংখ্যা ১০⁵ ছাড়ালে কোনো aⱼ মিলতে পারে না। তাই প্রতিটি সংখ্যায় স্বাক্ষর দিয়ে সূচিত অ্যারেতে একটি খোঁজা।',
  ),
  approach: [
    L('Smallest-prime-factor sieve up to 10⁵.', '১০⁵ পর্যন্ত ক্ষুদ্রতম-মৌলিক-উৎপাদক চালনি।'),
    L('For each aⱼ compute sig and the needed partner signature (capped above 10⁵).', 'প্রতিটি aⱼ-এর sig আর প্রয়োজনীয় সঙ্গী স্বাক্ষর (১০⁵-এর ওপরে সীমা) বের করা।'),
    L('ans += cnt[partner]; cnt[sig]++.', 'ans += cnt[সঙ্গী]; cnt[sig]++।'),
  ],
  walkthrough: {
    input: 'k = 3: 9, 24',
    steps: [
      { state: '9 = 3² → sig 9, partner 3¹ = 3', text: L('Needs one more 3.', 'আরেকটি ৩ লাগবে।') },
      { state: '24 = 2³·3 → sig 3, partner 3² = 9', text: L('Looks up 9 and finds it.', '৯ খুঁজে পায়।') },
    ],
  },
  complexity: { time: 'O(C log log C + n log C)', space: 'O(C)', why: L('Sieve, then factorization in O(log a) per number.', 'চালনি, তারপর প্রতি সংখ্যায় O(log a)-এ উৎপাদকে ভাঙা।') },
  solutions: [
    {
      id: 'signature',
      kind: 'optimal',
      title: L('Signatures as numbers, counts in an array', 'স্বাক্ষর সংখ্যা হিসেবে, গণনা অ্যারেতে'),
      idea: L('sig ≤ 10⁵ fits as an index; cap the partner at 10⁵ + 1.', 'sig ≤ ১০⁵ সূচক হিসেবে আঁটে; সঙ্গীকে ১০⁵ + ১-এ সীমিত।'),
      explain: [
        L(
          'A perfect “hash function” is one with no collisions at all. Here the signature itself is a small integer, so an array of size 10⁵ is a hash table that never collides.',
          'নিখুঁত “হ্যাশ ফাংশন” হলো যার কোনো সংঘর্ষই নেই। এখানে স্বাক্ষর নিজেই ছোট পূর্ণসংখ্যা, তাই ১০⁵ আকারের অ্যারে এমন হ্যাশ টেবিল যা কখনো সংঘর্ষ করে না।',
        ),
        L(
          'The partner can be huge (for k = 100, 2^99), so build it with a guard that stops as soon as it passes 10⁵.',
          'সঙ্গী বিশাল হতে পারে (k = ১০০-এ ২^৯৯), তাই ১০⁵ পেরোলেই থেমে যায় এমন সুরক্ষাসহ বানান।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int C = 100000;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<int> spf(C + 1, 0);
    for (int i = 2; i <= C; i++)
        if (!spf[i])
            for (int j = i; j <= C; j += i)
                if (!spf[j]) spf[j] = i;
    vector<long long> cnt(C + 1, 0);
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        int a;
        scanf("%d", &a);
        long long sig = 1, need = 1;
        while (a > 1) {
            int p = spf[a], e = 0;
            while (a % p == 0) a /= p, e++;
            e %= k;
            for (int t = 0; t < e; t++) sig *= p;
            for (int t = 0; t < (k - e) % k && need <= C; t++) need *= p;  // stop once too big
        }
        if (need <= C) ans += cnt[need];
        cnt[sig]++;
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(C log log C + n log C)',
      space: 'O(C)',
      accepted: true,
      toolkit: ['long-long', 'vector'],
    },
    {
      id: 'vector-key',
      kind: 'method',
      title: L('Signature as a list of (prime, exponent)', 'স্বাক্ষর (মৌলিক, সূচক)-এর তালিকা হিসেবে'),
      idea: L('Use the factorization itself as a map key; the partner is the list with exponents k − e.', 'উৎপাদকে ভাঙাটাই ম্যাপ কী; সঙ্গী হলো k − e সূচকের তালিকা।'),
      explain: [
        L(
          'This version never multiplies, so it never overflows and needs no cap. It is the general pattern when a key is a whole structure: maps compare vectors lexicographically out of the box.',
          'এই সংস্করণ কখনো গুণ করে না, তাই উপচে পড়ে না, সীমাও লাগে না। কী যখন একটি পূর্ণ কাঠামো তখন এটিই সাধারণ প্যাটার্ন: ম্যাপ নিজে থেকেই ভেক্টর অভিধানক্রমে তুলনা করে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    map<vector<pair<int, int>>, long long> cnt;
    long long ans = 0;
    for (int i = 0; i < n; i++) {
        int a;
        scanf("%d", &a);
        vector<pair<int, int>> sig, need;
        for (int p = 2; (long long)p * p <= a; p++) {
            int e = 0;
            while (a % p == 0) a /= p, e++;
            if (e % k) sig.push_back({p, e % k}), need.push_back({p, k - e % k});
        }
        if (a > 1 && k > 1) sig.push_back({a, 1}), need.push_back({a, k - 1});
        auto it = cnt.find(need);
        if (it != cnt.end()) ans += it->second;
        cnt[sig]++;
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n √C + n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'pair', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Test every product for a k-th root', 'প্রতিটি গুণফলে k-তম মূল যাচাই'),
      idea: L('For every pair, search an integer x with xᵏ = aᵢ · aⱼ.', 'প্রতিটি জোড়ায় এমন পূর্ণসংখ্যা x খোঁজা যাতে xᵏ = aᵢ · aⱼ।'),
      explain: [L('Round the real root, then confirm with exact integer powers around it.', 'বাস্তব মূল গোল করে আশেপাশে নির্ভুল পূর্ণসংখ্যা ঘাত দিয়ে নিশ্চিত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isPower(long long v, int k) {
    long long r = llround(pow((double)v, 1.0 / k));
    for (long long x = max(1LL, r - 2); x <= r + 2; x++) {
        long long p = 1;
        bool big = false;
        for (int i = 0; i < k && !big; i++) {
            p *= x;
            if (p > v) big = true;
        }
        if (!big && p == v) return true;
    }
    return false;
}

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long ans = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) ans += isPower(a[i] * a[j], k);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n² k)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['long-long', 'functions'],
    },
  ],
  tests: [
    { input: '6 3\n1 3 9 8 24 1', output: '5', source: 'sample', note: sample(1) },
    { input: '4 2\n2 8 18 3', output: '3', source: 'own', note: L('2·8 = 4², 2·18 = 6², 8·18 = 12².', '২·৮ = ৪², ২·১৮ = ৬², ৮·১৮ = ১২²।') },
    { input: '3 100\n2 4 8', output: '0', source: 'own', note: L('Partners would be 2⁹⁹: far above 10⁵.', 'সঙ্গী হতো ২⁹⁹: ১০⁵-এর অনেক ওপরে।') },
  ],
  pitfalls: [
    L('Building the partner signature without a cap: it overflows for large k.', 'সীমা ছাড়া সঙ্গী স্বাক্ষর বানানো: বড় k-এ উপচে পড়ে।'),
    L('Counting a number with itself: look up before inserting.', 'একটি সংখ্যাকে নিজের সঙ্গে গোনা: ঢোকানোর আগে খুঁজুন।'),
    L('Using int for the answer: up to about 5·10⁹ pairs.', 'উত্তরের জন্য int: প্রায় ৫·১০⁹ জোড়া পর্যন্ত।'),
  ],
  related: [
    { id: '1899D', name: 'Yarik and Musical Notes', why: L('Turn a power equation into equal keys.', 'ঘাতের সমীকরণকে সমান কী-তে বদলানো।') },
    { id: '1133D', name: 'Zero Quantity Maximization', why: L('A normalized key per element.', 'প্রতি উপাদানে একটি স্বাভাবিক কী।') },
  ],
  toolkit: ['long-long', 'map'],
};

// ───────────────────────────────────────────── 835D
export const p835D: ProblemEntry = {
  id: '835D',
  contestId: 835,
  index: 'D',
  name: 'Palindromic characteristics',
  rating: 1900,
  tags: ['brute-force', 'dp', 'hashing', 'strings'],
  featuredFor: ['hashing'],
  why: L(
    'One recursive definition, four ways to evaluate it: an interval DP table, hashes that test palindromes in O(1), Manacher radii, and plain brute force. A great place to see what hashing buys and what it costs.',
    'একটি পুনরাবৃত্ত সংজ্ঞা, মূল্যায়নের চার উপায়: ইন্টারভাল DP টেবিল, O(১)-এ প্যালিনড্রোম যাচাই করা হ্যাশ, মানাচার ব্যাসার্ধ, আর সাধারণ ব্রুট ফোর্স। হ্যাশিং কী দেয় আর কী খরচ করায় তা দেখার চমৎকার জায়গা।',
  ),
  statement: L(
    'A 1-palindrome is a palindrome. For k > 1, a string of length m is a k-palindrome if its left half (first ⌊m/2⌋ letters) equals its right half (last ⌊m/2⌋ letters) and both halves are non-empty (k − 1)-palindromes. For a string s, print for each k from 1 to |s| how many substrings (counted by position) are k-palindromes.',
    '১-প্যালিনড্রোম হলো প্যালিনড্রোম। k > ১-এর জন্য m দৈর্ঘ্যের স্ট্রিং k-প্যালিনড্রোম যদি এর বাম অর্ধেক (প্রথম ⌊m/২⌋ অক্ষর) ডান অর্ধেকের (শেষ ⌊m/২⌋ অক্ষর) সমান হয় আর দুই অর্ধেক অশূন্য (k − ১)-প্যালিনড্রোম হয়। s-এর জন্য ১ থেকে |s| পর্যন্ত প্রতিটি k-তে কতগুলো সাবস্ট্রিং (অবস্থান ধরে গুনে) k-প্যালিনড্রোম, ছাপুন।',
  ),
  input: L('One line: s.', 'এক লাইন: s।'),
  output: L('|s| numbers.', '|s|-টি সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('|s| ≤ 5000, lowercase letters', '|s| ≤ ৫০০০, ছোট হাতের অক্ষর')] },
  samples: [
    { input: 'abba', output: '6 1 0 0', explain: L('Four letters, bb and abba are palindromes; bb is also a 2-palindrome (b | b).', 'চারটি অক্ষর, bb আর abba প্যালিনড্রোম; bb ২-প্যালিনড্রোমও (b | b)।') },
    { input: 'abacaba', output: '12 4 1 0 0 0 0', explain: L('12 palindromes; aba, aca, aba and abacaba have degree at least 2; only abacaba has degree 3.', '১২টি প্যালিনড্রোম; aba, aca, aba আর abacaba-এর ডিগ্রি অন্তত ২; শুধু abacaba-এর ডিগ্রি ৩।') },
  ],
  observation: L(
    'Every k-palindrome is also a (k − 1)-palindrome, so it is enough to compute deg(t), the largest k for which t is a k-palindrome (0 if t is not a palindrome). If t is a palindrome, its left half is the mirror of its right half; “left = right” then simply says the left half is itself a palindrome. So deg(t) = 0 if t is not a palindrome, else 1 + deg(left half), with deg(empty) = 0.',
    'প্রতিটি k-প্যালিনড্রোম (k − ১)-প্যালিনড্রোমও, তাই deg(t) বের করাই যথেষ্ট, সবচেয়ে বড় k যার জন্য t একটি k-প্যালিনড্রোম (প্যালিনড্রোম না হলে ০)। t প্যালিনড্রোম হলে তার বাম অর্ধেক ডান অর্ধেকের আয়না; তখন “বাম = ডান” মানে শুধু বাম অর্ধেক নিজেই প্যালিনড্রোম। তাই t প্যালিনড্রোম না হলে deg(t) = ০, নইলে ১ + deg(বাম অর্ধেক), deg(খালি) = ০।',
  ),
  approach: [
    L('Compute deg for every substring.', 'প্রতিটি সাবস্ট্রিংয়ের deg বের করা।'),
    L('cnt[deg]++, then answer[k] = number of substrings with deg ≥ k (suffix sums).', 'cnt[deg]++, তারপর উত্তর[k] = deg ≥ k সাবস্ট্রিংয়ের সংখ্যা (সাফিক্স যোগফল)।'),
  ],
  walkthrough: {
    input: 'abacaba',
    steps: [
      { state: '7 single letters: deg 1 each', text: L('deg(single letter) = 1 + deg(empty) = 1.', 'deg(একটি অক্ষর) = ১ + deg(খালি) = ১।') },
      { state: 'aba, aca, aba: halves a → deg 2', text: L('Three substrings of degree 2.', 'ডিগ্রি ২-এর তিনটি সাবস্ট্রিং।') },
      { state: 'bacab: half ba is no palindrome → deg 1; abacaba: half aba → deg 3', text: L('One substring of degree 3.', 'ডিগ্রি ৩-এর একটি সাবস্ট্রিং।') },
      { state: 'palindromes: 7 + 3 + bacab + abacaba = 12; deg ≥ 2: 4; deg ≥ 3: 1', text: L('Output 12 4 1 0 0 0 0.', 'আউটপুট ১২ ৪ ১ ০ ০ ০ ০।') },
    ],
  },
  complexity: { time: 'O(n²)', space: 'O(n²) bytes', why: L('One table cell per substring.', 'প্রতি সাবস্ট্রিংয়ে টেবিলের একটি ঘর।') },
  solutions: [
    {
      id: 'interval-dp',
      kind: 'optimal',
      title: L('Interval DP on degrees', 'ডিগ্রির ওপর ইন্টারভাল DP'),
      idea: L('deg[l][r] = s[l] = s[r] and inner palindrome ? 1 + deg[l][l + len/2 − 1] : 0.', 'deg[l][r] = s[l] = s[r] আর ভেতরটা প্যালিনড্রোম ? ১ + deg[l][l + len/২ − ১] : ০।'),
      explain: [
        L(
          'Process substrings by increasing length so the inner part and the left half are already known. deg never exceeds 13 for n = 5000, so a byte per cell is enough: 25 MB.',
          'দৈর্ঘ্য বাড়ার ক্রমে সাবস্ট্রিং প্রক্রিয়া করুন, যাতে ভেতরের অংশ আর বাম অর্ধেক আগেই জানা থাকে। n = ৫০০০-এ deg কখনো ১৩ ছাড়ায় না, তাই প্রতি ঘরে এক বাইট যথেষ্ট: ২৫ MB।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<unsigned char> deg((size_t)n * n, 0);  // deg[l * n + r]
    auto D = [&](int l, int r) -> unsigned char& { return deg[(size_t)l * n + r]; };
    vector<long long> cnt(n + 2, 0);
    for (int len = 1; len <= n; len++)
        for (int l = 0; l + len - 1 < n; l++) {
            int r = l + len - 1;
            bool pal = s[l] == s[r] && (len <= 2 || D(l + 1, r - 1) > 0);
            if (!pal) continue;
            int half = len / 2;
            D(l, r) = 1 + (half ? D(l, l + half - 1) : 0);
            cnt[D(l, r)]++;
        }
    for (int k = n - 1; k >= 1; k--) cnt[k] += cnt[k + 1];  // deg >= k
    for (int k = 1; k <= n; k++) printf("%lld%c", cnt[k], k < n ? ' ' : '\n');
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['lambda', 'vector'],
    },
    {
      id: 'hash-halving',
      kind: 'method',
      title: L('Hashes: test palindromes in O(1), halve until it fails', 'হ্যাশ: O(১)-এ প্যালিনড্রোম যাচাই, ব্যর্থ না হওয়া পর্যন্ত অর্ধেক'),
      idea: L('t is a palindrome iff hash(t) = hash(reverse t); follow left halves while true.', 't প্যালিনড্রোম যদি ও কেবল যদি hash(t) = hash(reverse t); যতক্ষণ সত্য, বাম অর্ধেক ধরে চলুন।'),
      explain: [
        L(
          'Prefix hashes of s and of reverse(s) give the forward and backward hash of any substring in O(1). For each substring, keep halving while the current piece is a palindrome; the number of successful steps is its degree.',
          's আর reverse(s)-এর প্রিফিক্স হ্যাশ যেকোনো সাবস্ট্রিংয়ের সামনের আর পেছনের হ্যাশ O(১)-এ দেয়। প্রতিটি সাবস্ট্রিংয়ে বর্তমান টুকরো প্যালিনড্রোম থাকা পর্যন্ত অর্ধেক করুন; সফল ধাপের সংখ্যাই তার ডিগ্রি।',
        ),
        L(
          'Memory drops from O(n²) to O(n). The price is a log factor on strings like aaaa…, where every substring keeps halving, and a tiny chance of a collision.',
          'মেমরি O(n²) থেকে O(n)-এ নামে। দাম হলো aaaa…-এর মতো স্ট্রিংয়ে একটি লগ গুণক, যেখানে প্রতিটি সাবস্ট্রিং অর্ধেক হতেই থাকে, আর সংঘর্ষের খুব ক্ষুদ্র সম্ভাবনা।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    string s;
    cin >> s;
    int n = s.size();
    vector<ull> f(n + 1, 0), g(n + 1, 0), pw(n + 1, 1);
    for (int i = 0; i < n; i++) {
        f[i + 1] = add(mul(f[i], B), (ull)s[i]);          // s
        g[i + 1] = add(mul(g[i], B), (ull)s[n - 1 - i]);  // reverse(s)
        pw[i + 1] = mul(pw[i], B);
    }
    auto fw = [&](int l, int r) { return sub(f[r], mul(f[l], pw[r - l])); };          // s[l..r)
    auto bw = [&](int l, int r) { return sub(g[n - l], mul(g[n - r], pw[r - l])); };  // reverse of s[l..r)
    vector<long long> cnt(n + 2, 0);
    for (int l = 0; l < n; l++)
        for (int r = l + 1; r <= n; r++) {
            int k = 0, e = r;
            while (e > l && fw(l, e) == bw(l, e)) {
                k++;
                e = l + (e - l) / 2;  // move to the left half
            }
            cnt[k]++;
        }
    for (int k = n - 1; k >= 1; k--) cnt[k] += cnt[k + 1];
    for (int k = 1; k <= n; k++) printf("%lld%c", cnt[k], k < n ? ' ' : '\n');
    return 0;
}
`,
      time: 'O(n² log n) worst case',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'while-n'],
    },
    {
      id: 'manacher',
      kind: 'method',
      title: L('Manacher radii instead of hashes', 'হ্যাশের বদলে মানাচার ব্যাসার্ধ'),
      idea: L('s[l..r) is a palindrome iff the radius at its centre reaches its ends.', 's[l..r) প্যালিনড্রোম যদি ও কেবল যদি তার কেন্দ্রের ব্যাসার্ধ প্রান্ত পর্যন্ত পৌঁছায়।'),
      explain: [
        L(
          'Manacher’s algorithm gives, for every centre, the longest palindrome around it in O(n) total. Any substring is a palindrome exactly when it fits inside the maximal palindrome of its own centre, an exact O(1) test with no collision risk.',
          'মানাচার অ্যালগরিদম প্রতিটি কেন্দ্রের চারপাশের দীর্ঘতম প্যালিনড্রোম মোট O(n)-এ দেয়। যেকোনো সাবস্ট্রিং ঠিক তখন প্যালিনড্রোম যখন তা নিজের কেন্দ্রের সর্বোচ্চ প্যালিনড্রোমের ভেতরে এঁটে যায়, সংঘর্ষের ঝুঁকিহীন একটি নির্ভুল O(১) যাচাই।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    // t = #s0#s1#...#  ; p[i] = radius in t
    string t = "#";
    for (char c : s) t += c, t += '#';
    int m = t.size();
    vector<int> p(m, 0);
    for (int i = 0, l = 0, r = -1; i < m; i++) {
        int k = i > r ? 0 : min(p[l + r - i], r - i);
        while (i - k - 1 >= 0 && i + k + 1 < m && t[i - k - 1] == t[i + k + 1]) k++;
        p[i] = k;
        if (i + k > r) l = i - k, r = i + k;
    }
    // s[a..b) (b > a) has centre a + b in t and needs radius >= b - a
    auto pal = [&](int a, int b) { return p[a + b] >= b - a; };
    vector<long long> cnt(n + 2, 0);
    for (int l = 0; l < n; l++)
        for (int r = l + 1; r <= n; r++) {
            int k = 0, e = r;
            while (e > l && pal(l, e)) k++, e = l + (e - l) / 2;
            cnt[k]++;
        }
    for (int k = n - 1; k >= 1; k--) cnt[k] += cnt[k + 1];
    for (int k = 1; k <= n; k++) printf("%lld%c", cnt[k], k < n ? ' ' : '\n');
    return 0;
}
`,
      time: 'O(n² log n) worst case',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Apply the definition literally', 'সংজ্ঞা আক্ষরিকভাবে প্রয়োগ'),
      idea: L('For each substring and each k, check halves recursively with real string comparisons.', 'প্রতিটি সাবস্ট্রিং আর প্রতিটি k-তে আসল স্ট্রিং তুলনায় অর্ধেকগুলো পুনরাবৃত্তভাবে যাচাই।'),
      explain: [L('Follows the statement, including the “left half equals right half” test that the other solutions prove unnecessary.', 'স্টেটমেন্ট অনুসরণ করে, সেই “বাম অর্ধেক = ডান অর্ধেক” পরীক্ষাসহ যা অন্য সমাধানগুলো অপ্রয়োজনীয় প্রমাণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isK(const string& t, int k) {
    if (t.empty()) return false;
    if (k == 1) return equal(t.begin(), t.end(), t.rbegin());
    int h = t.size() / 2;
    if (h == 0) return false;
    string a = t.substr(0, h), b = t.substr(t.size() - h);
    return a == b && isK(a, k - 1) && isK(b, k - 1);
}

int main() {
    string s;
    cin >> s;
    int n = s.size();
    for (int k = 1; k <= n; k++) {
        long long c = 0;
        for (int l = 0; l < n; l++)
            for (int len = 1; l + len <= n; len++) c += isK(s.substr(l, len), k);
        cout << c << (k < n ? ' ' : '\n');
    }
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics', 'functions'],
    },
  ],
  tests: [
    { input: 'abba', output: '6 1 0 0', source: 'sample', note: sample(1) },
    { input: 'abacaba', output: '12 4 1 0 0 0 0', source: 'sample', note: sample(2) },
    { input: 'aaaa', output: '10 6 1 0', source: 'own', note: L('Every substring is a palindrome; aa, aaa (halves a) and aaaa reach degree 2, and aaaa (half aa) reaches 3.', 'প্রতিটি সাবস্ট্রিং প্যালিনড্রোম; aa, aaa (অর্ধেক a) আর aaaa ডিগ্রি ২-এ, আর aaaa (অর্ধেক aa) ৩-এ পৌঁছায়।') },
  ],
  pitfalls: [
    L('Printing only “exactly k” counts: a k-palindrome is also counted for every smaller k.', 'শুধু “ঠিক k” গণনা ছাপানো: একটি k-প্যালিনড্রোম প্রতিটি ছোট k-তেও গোনা হয়।'),
    L('An int table of 5000 × 5000: 100 MB. Bytes are enough.', '৫০০০ × ৫০০০-এর int টেবিল: ১০০ MB। বাইটই যথেষ্ট।'),
  ],
  related: [
    { id: '7D', name: 'Palindrome Degree', why: L('The same halving recursion on prefixes only.', 'একই অর্ধেক-করা পুনরাবৃত্তি, শুধু প্রিফিক্সে।') },
    { id: '1800D', name: 'Remove Two Letters', why: L('Substring hashes in O(1).', 'O(১)-এ সাবস্ট্রিং হ্যাশ।') },
  ],
  toolkit: ['string-basics', 'prefix-sum'],
};

// ───────────────────────────────────────────── 514C
export const p514C: ProblemEntry = {
  id: '514C',
  contestId: 514,
  index: 'C',
  name: 'Watto and Mechanism',
  rating: 2000,
  tags: ['binary-search', 'data-structures', 'hashing', 'suffix-structures', 'strings'],
  why: L(
    'Changing one letter changes a polynomial hash by a single term, so all 2·|q| neighbours of a query are hashed in O(1) each. The trie with one allowed mistake is the hash-free alternative.',
    'একটি অক্ষর বদলালে পলিনোমিয়াল হ্যাশে শুধু একটি পদ বদলায়, তাই একটি কোয়েরির সব ২·|q| প্রতিবেশী প্রতিটি O(১)-এ হ্যাশ হয়। একটি ভুলের অনুমতিসহ ট্রাই হলো হ্যাশহীন বিকল্প।',
  ),
  statement: L(
    'The memory holds n strings over the letters a, b, c. For each of m queries s, answer YES if the memory contains a string of the same length that differs from s in exactly one position, otherwise NO.',
    'মেমরিতে a, b, c অক্ষরের n-টি স্ট্রিং আছে। m-টি কোয়েরির প্রতিটি s-এর জন্য YES বলুন যদি মেমরিতে একই দৈর্ঘ্যের এমন স্ট্রিং থাকে যা s থেকে ঠিক এক অবস্থানে আলাদা, নইলে NO।',
  ),
  input: L('n m, then n memory strings, then m queries.', 'n m, তারপর n-টি মেমরি স্ট্রিং, তারপর m-টি কোয়েরি।'),
  output: L('m lines YES or NO.', 'm লাইনে YES বা NO।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('0 ≤ n, m ≤ 3·10⁵, total length ≤ 6·10⁵', '০ ≤ n, m ≤ ৩·১০⁵, মোট দৈর্ঘ্য ≤ ৬·১০⁵')] },
  samples: [
    { input: '2 3\naaaaa\nacacaca\naabaa\nccacacc\ncaaac', output: 'YES\nNO\nNO', explain: L('aabaa differs from aaaaa only in the middle.', 'aabaa শুধু মাঝখানে aaaaa থেকে আলাদা।') },
  ],
  observation: L(
    'With h(s) = Σ code(sᵢ) · B^(L−1−i), replacing letter i by c changes the hash by (code(c) − code(sᵢ)) · B^(L−1−i). Put all memory hashes (tagged with length) in a set; each query tries its 2L neighbours in O(1) each.',
    'h(s) = Σ code(sᵢ) · B^(L−১−i) হলে অক্ষর i-কে c দিয়ে বদলালে হ্যাশ বদলায় (code(c) − code(sᵢ)) · B^(L−১−i)। সব মেমরি হ্যাশ (দৈর্ঘ্যসহ) একটি সেটে রাখুন; প্রতিটি কোয়েরি তার ২L প্রতিবেশী প্রতিটি O(১)-এ চেষ্টা করে।',
  ),
  approach: [
    L('Hash every memory string; store (hash, length) pairs, sorted.', 'প্রতিটি মেমরি স্ট্রিং হ্যাশ; (হ্যাশ, দৈর্ঘ্য) জোড়া সাজিয়ে রাখা।'),
    L('For a query, compute its hash, then each single-letter change, and binary-search it.', 'কোয়েরির হ্যাশ, তারপর প্রতিটি এক-অক্ষর বদল বের করে বাইনারি সার্চ।'),
  ],
  walkthrough: {
    input: 'memory aaaaa, query aabaa',
    steps: [
      { state: 'h(aabaa) − (2 − 1)·B² = h(aaaaa)', text: L('Changing position 2 from b to a hits the memory.', 'অবস্থান ২-এ b থেকে a বদলালে মেমরিতে মেলে।') },
      { state: 'YES', text: L('Found.', 'পাওয়া গেছে।') },
    ],
  },
  complexity: { time: 'O(total · log n)', space: 'O(total)', why: L('2 neighbours per letter, each a binary search.', 'প্রতি অক্ষরে ২টি প্রতিবেশী, প্রতিটি একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'hash-neighbours',
      kind: 'optimal',
      title: L('Hash every one-letter neighbour', 'প্রতিটি এক-অক্ষর প্রতিবেশী হ্যাশ'),
      idea: L('Neighbour hash = h + (c − sᵢ) · B^(L−1−i).', 'প্রতিবেশীর হ্যাশ = h + (c − sᵢ) · B^(L−১−i)।'),
      explain: [
        L(
          'Point updates are where polynomial hashing shines: no recomputation, just add a correction term. Strings of different lengths could share a hash value, so the key includes the length.',
          'বিন্দু-আপডেটেই পলিনোমিয়াল হ্যাশিং উজ্জ্বল: আবার হিসাব নয়, শুধু একটি সংশোধন পদ যোগ। ভিন্ন দৈর্ঘ্যের স্ট্রিংয়ের হ্যাশ একই হতে পারে, তাই কী-তে দৈর্ঘ্যও থাকে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    int n, m;
    scanf("%d %d", &n, &m);
    static char buf[600005];
    vector<ull> pw(600005, 1);
    for (int i = 1; i < 600005; i++) pw[i] = mul(pw[i - 1], B);
    auto h = [&](const char* s, int len) {
        ull x = 0;
        for (int i = 0; i < len; i++) x = add(mul(x, B), (ull)(s[i] - 'a' + 1));
        return x;
    };
    vector<pair<ull, int>> mem;
    for (int i = 0; i < n; i++) {
        scanf("%s", buf);
        int len = strlen(buf);
        mem.push_back({h(buf, len), len});
    }
    sort(mem.begin(), mem.end());
    while (m--) {
        scanf("%s", buf);
        int len = strlen(buf);
        ull base = h(buf, len);
        bool ok = false;
        for (int i = 0; i < len && !ok; i++) {
            ull cur = buf[i] - 'a' + 1;
            for (ull c = 1; c <= 3 && !ok; c++) {
                if (c == cur) continue;
                ull nh = add(sub(base, mul(cur, pw[len - 1 - i])), mul(c, pw[len - 1 - i]));
                ok = binary_search(mem.begin(), mem.end(), make_pair(nh, len));
            }
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(total · log n)',
      space: 'O(total)',
      accepted: true,
      toolkit: ['lower-bound', 'pair', 'sort'],
    },
    {
      id: 'trie',
      kind: 'method',
      title: L('Trie search with one mistake allowed', 'একটি ভুলের অনুমতিসহ ট্রাই সার্চ'),
      idea: L('Walk the trie; at each depth you may spend your single mismatch on another child.', 'ট্রাই ধরে হাঁটুন; প্রতিটি গভীরতায় একমাত্র ভুলটি অন্য সন্তানে খরচ করা যায়।'),
      explain: [
        L(
          'After the mismatch is spent, the rest of the path must match exactly, which is a straight walk. Nodes mark the end of a memory string, so the length check is automatic. No hashing, no randomness, exact answers.',
          'ভুল খরচ হলে বাকি পথ হুবহু মিলতে হবে, যা একটি সোজা হাঁটা। নোড মেমরি স্ট্রিংয়ের শেষ চিহ্নিত করে, তাই দৈর্ঘ্য যাচাই আপনা থেকেই হয়। হ্যাশিং নেই, এলোমেলোতা নেই, নির্ভুল উত্তর।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<array<int, 3>> nxt(1, {-1, -1, -1});
vector<char> term(1, 0);

bool exact(int v, const char* s) {
    for (; *s; s++) {
        v = nxt[v][*s - 'a'];
        if (v < 0) return false;
    }
    return term[v];
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    static char buf[600005];
    for (int i = 0; i < n; i++) {
        scanf("%s", buf);
        int v = 0;
        for (char* p = buf; *p; p++) {
            int c = *p - 'a';
            if (nxt[v][c] < 0) {
                nxt[v][c] = nxt.size();
                nxt.push_back({-1, -1, -1});
                term.push_back(0);
            }
            v = nxt[v][c];
        }
        term[v] = 1;
    }
    while (m--) {
        scanf("%s", buf);
        bool ok = false;
        int v = 0;
        for (char* p = buf; *p && !ok && v >= 0; p++) {
            int c = *p - 'a';
            for (int d = 0; d < 3 && !ok; d++)        // spend the mistake here
                if (d != c && nxt[v][d] >= 0) ok = exact(nxt[v][d], p + 1);
            v = nxt[v][c];                           // or match and go deeper
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(total · L) worst case, fast in practice',
      space: 'O(total)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Compare with every memory string', 'প্রতিটি মেমরি স্ট্রিংয়ের সঙ্গে তুলনা'),
      idea: L('Count differing positions against each memory string of the same length.', 'একই দৈর্ঘ্যের প্রতিটি মেমরি স্ট্রিংয়ের সঙ্গে ভিন্ন অবস্থান গোনা।'),
      explain: [L('O(n · m · L): the obvious method and the stress reference.', 'O(n · m · L): স্পষ্ট পদ্ধতি আর স্ট্রেস রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> mem(n);
    for (auto& s : mem) cin >> s;
    while (m--) {
        string q;
        cin >> q;
        bool ok = false;
        for (auto& s : mem) {
            if (s.size() != q.size()) continue;
            int diff = 0;
            for (size_t i = 0; i < s.size(); i++) diff += s[i] != q[i];
            if (diff == 1) ok = true;
        }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m · L)',
      space: 'O(total)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '2 3\naaaaa\nacacaca\naabaa\nccacacc\ncaaac', output: 'YES\nNO\nNO', source: 'sample', note: sample(1) },
    { input: '1 2\nabc\nabc\nab', output: 'NO\nNO', source: 'own', note: L('An identical string differs in zero places; a shorter one never matches.', 'হুবহু একই স্ট্রিং শূন্য জায়গায় আলাদা; ছোট দৈর্ঘ্যের কখনো মেলে না।') },
    { input: '0 1\na', output: 'NO', source: 'own', note: L('Empty memory.', 'খালি মেমরি।') },
  ],
  pitfalls: [
    L('Hashing without the length: a and aa-style collisions across lengths.', 'দৈর্ঘ্য ছাড়া হ্যাশিং: ভিন্ন দৈর্ঘ্যের মধ্যে সংঘর্ষ।'),
    L('Answering YES for an exact match: exactly one difference is required.', 'হুবহু মিললে YES বলা: ঠিক একটি পার্থক্য লাগে।'),
    L('Recomputing the hash for each changed letter: O(L²) per query.', 'প্রতিটি বদলানো অক্ষরে হ্যাশ আবার হিসাব: প্রতি কোয়েরিতে O(L²)।'),
  ],
  related: [
    { id: '1800D', name: 'Remove Two Letters', why: L('Hashes of edited strings in O(1).', 'সম্পাদিত স্ট্রিংয়ের হ্যাশ O(১)-এ।') },
    { id: '4C', name: 'Registration System', why: L('Membership queries on a set of strings.', 'স্ট্রিংয়ের সেটে সদস্যপদ কোয়েরি।') },
  ],
  toolkit: ['set', 'lower-bound'],
};

// ───────────────────────────────────────────── 7D
export const p7D: ProblemEntry = {
  id: '7D',
  contestId: 7,
  index: 'D',
  name: 'Palindrome Degree',
  rating: 2200,
  tags: ['hashing', 'strings'],
  why: L(
    'Rolling hashes in both directions test “is this prefix a palindrome?” in O(1) while reading the string once. With 5·10⁶ characters, only linear methods survive.',
    'দুই দিকের রোলিং হ্যাশ একবার স্ট্রিং পড়তে পড়তেই O(১)-এ “এই প্রিফিক্স কি প্যালিনড্রোম?” যাচাই করে। ৫·১০⁶ অক্ষরে শুধু রৈখিক পদ্ধতিই টেকে।',
  ),
  statement: L(
    'The palindrome degree of a string is the largest k such that it is a k-palindrome: a palindrome whose prefix and suffix of length ⌊n/2⌋ are (k − 1)-palindromes (every string is a 0-palindrome, including the empty one). Find the sum of the degrees of all prefixes of s.',
    'একটি স্ট্রিংয়ের প্যালিনড্রোম ডিগ্রি হলো সবচেয়ে বড় k যাতে সেটি k-প্যালিনড্রোম: এমন প্যালিনড্রোম যার ⌊n/২⌋ দৈর্ঘ্যের প্রিফিক্স আর সাফিক্স (k − ১)-প্যালিনড্রোম (প্রতিটি স্ট্রিং, খালিটিও, ০-প্যালিনড্রোম)। s-এর সব প্রিফিক্সের ডিগ্রির যোগফল বের করুন।',
  ),
  input: L('One line: s (Latin letters and digits, case-sensitive).', 'এক লাইন: s (লাতিন অক্ষর আর অঙ্ক, বড়-ছোট আলাদা)।'),
  output: L('The sum of degrees.', 'ডিগ্রির যোগফল।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 5·10⁶', '|s| ≤ ৫·১০⁶')] },
  samples: [
    { input: 'a2A', output: '1', explain: L('Only the prefix a is a palindrome; its degree is 1.', 'শুধু প্রিফিক্স a প্যালিনড্রোম; তার ডিগ্রি ১।') },
    { input: 'abacaba', output: '6', explain: L('a: 1, aba: 2, abacaba: 3.', 'a: ১, aba: ২, abacaba: ৩।') },
  ],
  observation: L(
    'A palindromic prefix of length i has the prefix of length ⌊i/2⌋ as its left half, and its right half is the mirror image, so deg[i] = deg[⌊i/2⌋] + 1 if s[0..i) is a palindrome, else 0. Since ⌊i/2⌋ < i, one left-to-right pass fills deg.',
    'i দৈর্ঘ্যের প্যালিনড্রোমিক প্রিফিক্সের বাম অর্ধেক হলো ⌊i/২⌋ দৈর্ঘ্যের প্রিফিক্স, আর ডান অর্ধেক তার আয়না, তাই s[০..i) প্যালিনড্রোম হলে deg[i] = deg[⌊i/২⌋] + ১, নইলে ০। ⌊i/২⌋ < i বলে বাম থেকে ডানে এক পাসে deg পূর্ণ হয়।',
  ),
  approach: [
    L('Maintain the forward hash Σ sⱼ Bⁱ⁻¹⁻ʲ and the backward hash Σ sⱼ Bʲ of the prefix.', 'প্রিফিক্সের সামনের হ্যাশ Σ sⱼ Bⁱ⁻¹⁻ʲ আর পেছনের হ্যাশ Σ sⱼ Bʲ রাখা।'),
    L('They are equal exactly when the prefix reads the same both ways (up to collisions).', 'প্রিফিক্স দুই দিকে একই পড়লে ঠিক তখনই এরা সমান (সংঘর্ষ ছাড়া)।'),
    L('deg[i] = equal ? deg[i/2] + 1 : 0; sum.', 'deg[i] = সমান ? deg[i/২] + ১ : ০; যোগ।'),
  ],
  walkthrough: {
    input: 'abacaba',
    steps: [
      { state: 'i=1 a: palindrome, deg = deg[0] + 1 = 1', text: L('Running sum 1.', 'চলমান যোগফল ১।') },
      { state: 'i=3 aba: deg = deg[1] + 1 = 2', text: L('Running sum 3.', 'চলমান যোগফল ৩।') },
      { state: 'i=7 abacaba: deg = deg[3] + 1 = 3', text: L('Running sum 6.', 'চলমান যোগফল ৬।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Constant work per character.', 'প্রতি অক্ষরে ধ্রুব কাজ।') },
  solutions: [
    {
      id: 'two-way-hash',
      kind: 'optimal',
      title: L('Forward and backward rolling hashes', 'সামনের আর পেছনের রোলিং হ্যাশ'),
      idea: L('fw = fw · B + c, bw = bw + c · Bⁱ; palindrome iff fw = bw.', 'fw = fw · B + c, bw = bw + c · Bⁱ; প্যালিনড্রোম যদি ও কেবল যদি fw = bw।'),
      explain: [
        L(
          'Both hashes update in O(1) when a character is appended, so the test costs nothing extra. A collision could only make the answer too large on a few prefixes; with a random base modulo 2⁶¹ − 1 the chance is about n / 2⁶¹.',
          'একটি অক্ষর যোগ হলে দুই হ্যাশই O(১)-এ আপডেট হয়, তাই যাচাইয়ে বাড়তি খরচ নেই। সংঘর্ষ কেবল কয়েকটি প্রিফিক্সে উত্তর বাড়িয়ে দিতে পারত; ২⁶¹ − ১ মডুলাসে এলোমেলো বেসে সম্ভাবনা প্রায় n / ২⁶¹।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

static char s[5000005];

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    scanf("%s", s);
    int n = strlen(s);
    vector<int> deg(n + 1, 0);
    ull fw = 0, bw = 0, pw = 1;
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        ull c = (unsigned char)s[i - 1];
        fw = add(mul(fw, B), c);   // s[0..i) read left to right
        bw = add(bw, mul(c, pw));  // s[0..i) read right to left
        pw = mul(pw, B);
        if (fw == bw) deg[i] = deg[i / 2] + 1;
        total += deg[i];
    }
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['c-io', 'long-long'],
    },
    {
      id: 'prefix-function',
      kind: 'method',
      title: L('Prefix function on s # reverse(s)', 's # reverse(s)-এ প্রিফিক্স ফাংশন'),
      idea: L('The palindromic prefixes are exactly the borders of s + # + reverse(s).', 'প্যালিনড্রোমিক প্রিফিক্সগুলোই হলো s + # + reverse(s)-এর বর্ডার।'),
      explain: [
        L(
          's[0..i) is a palindrome iff it equals reverse of itself, which is the suffix of length i of reverse(s). So it is a prefix of u = s#reverse(s) that is also a suffix of u: a border. Following π from the end of u lists every border, exactly, with no hashing.',
          's[০..i) প্যালিনড্রোম যদি ও কেবল যদি এটি নিজের উল্টোর সমান, যা reverse(s)-এর i দৈর্ঘ্যের সাফিক্স। তাই এটি u = s#reverse(s)-এর এমন প্রিফিক্স যা u-এর সাফিক্সও: একটি বর্ডার। u-এর শেষ থেকে π অনুসরণ করলে হ্যাশিং ছাড়াই প্রতিটি বর্ডার নির্ভুলভাবে পাওয়া যায়।',
        ),
        L('It needs about 10⁷ ints of memory, still within the limit.', 'প্রায় ১০⁷টি int মেমরি লাগে, তবু সীমার মধ্যে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    string u = s + '#' + string(s.rbegin(), s.rend());
    int m = u.size();
    vector<int> pi(m, 0);
    for (int i = 1; i < m; i++) {
        int k = pi[i - 1];
        while (k && u[i] != u[k]) k = pi[k - 1];
        if (u[i] == u[k]) k++;
        pi[i] = k;
    }
    vector<char> isPal(n + 1, 0);
    for (int k = pi[m - 1]; k > 0; k = pi[k - 1]) isPal[k] = 1;  // every border of u
    vector<int> deg(n + 1, 0);
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        if (isPal[i]) deg[i] = deg[i / 2] + 1;
        total += deg[i];
    }
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'while-n'],
    },
    {
      id: 'manacher',
      kind: 'method',
      title: L('Manacher: does the palindrome at the centre reach the start?', 'মানাচার: কেন্দ্রের প্যালিনড্রোম কি শুরু পর্যন্ত পৌঁছায়?'),
      idea: L('Prefix of length i is a palindrome iff the radius at its centre covers position 0.', 'i দৈর্ঘ্যের প্রিফিক্স প্যালিনড্রোম যদি ও কেবল যদি তার কেন্দ্রের ব্যাসার্ধ অবস্থান ০ ঢাকে।'),
      explain: [
        L(
          'Manacher’s radii describe every palindrome in the string in O(n). A prefix [0, i) has its centre at position i in the #-interleaved string, and it is a palindrome when that radius is at least i.',
          'মানাচার ব্যাসার্ধ O(n)-এ স্ট্রিংয়ের প্রতিটি প্যালিনড্রোম বর্ণনা করে। #-মেশানো স্ট্রিংয়ে প্রিফিক্স [০, i)-এর কেন্দ্র অবস্থান i-তে, আর সেই ব্যাসার্ধ অন্তত i হলে এটি প্যালিনড্রোম।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    string t(2 * n + 1, '#');
    for (int i = 0; i < n; i++) t[2 * i + 1] = s[i];
    int m = t.size();
    vector<int> p(m, 0);
    for (int i = 0, l = 0, r = -1; i < m; i++) {
        int k = i > r ? 0 : min(p[l + r - i], r - i);
        while (i - k - 1 >= 0 && i + k + 1 < m && t[i - k - 1] == t[i + k + 1]) k++;
        p[i] = k;
        if (i + k > r) l = i - k, r = i + k;
    }
    vector<int> deg(n + 1, 0);
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        if (p[i] >= i) deg[i] = deg[i / 2] + 1;  // s[0..i) has centre i in t
        total += deg[i];
    }
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every prefix directly', 'প্রতিটি প্রিফিক্স সরাসরি যাচাই'),
      idea: L('Compare each prefix with its reverse, O(n²).', 'প্রতিটি প্রিফিক্সকে তার উল্টোর সঙ্গে তুলনা, O(n²)।'),
      explain: [L('Correct and simple, hopeless for 5·10⁶. The stress reference.', 'সঠিক আর সহজ, ৫·১০⁶-এ অচল। স্ট্রেস রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> deg(n + 1, 0);
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        bool pal = true;
        for (int a = 0, b = i - 1; a < b; a++, b--) pal &= s[a] == s[b];
        if (pal) deg[i] = deg[i / 2] + 1;
        total += deg[i];
    }
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: 'a2A', output: '1', source: 'sample', note: sample(1) },
    { input: 'abacaba', output: '6', source: 'sample', note: sample(2) },
    { input: 'aaaa', output: '8', source: 'own', note: L('Degrees 1, 2, 2, 3.', 'ডিগ্রি ১, ২, ২, ৩।') },
  ],
  pitfalls: [
    L('Reading 5·10⁶ characters with slow I/O or storing many copies of s.', 'ধীর I/O দিয়ে ৫·১০⁶ অক্ষর পড়া বা s-এর অনেক কপি রাখা।'),
    L('Lowercasing the input: the letters are case-sensitive.', 'ইনপুট ছোট হাতের করা: অক্ষরের বড়-ছোট আলাদা।'),
    L('A natural-overflow hash with a fixed base can be broken by a crafted test.', 'নির্দিষ্ট বেসসহ স্বাভাবিক-ওভারফ্লো হ্যাশ বানানো টেস্টে ভাঙতে পারে।'),
  ],
  related: [
    { id: '835D', name: 'Palindromic characteristics', why: L('The same degree, for every substring.', 'একই ডিগ্রি, প্রতিটি সাবস্ট্রিংয়ে।') },
    { id: '1326D2', name: 'Prefix-Suffix Palindrome (Hard version)', why: L('Longest palindromic prefix.', 'দীর্ঘতম প্যালিনড্রোমিক প্রিফিক্স।') },
  ],
  toolkit: ['c-io', 'long-long'],
};

// ───────────────────────────────────────────── 25E
export const p25E: ProblemEntry = {
  id: '25E',
  contestId: 25,
  index: 'E',
  name: 'Test',
  rating: 2200,
  tags: ['hashing', 'strings'],
  why: L(
    'The shortest string containing three given strings: try all 6 orders and glue with the largest overlap. Finding overlaps and containment fast is where KMP or hashing comes in.',
    'তিনটি স্ট্রিং ধারণ করা সবচেয়ে ছোট স্ট্রিং: ৬টি ক্রম চেষ্টা করে সবচেয়ে বড় ওভারল্যাপে জোড়া। ওভারল্যাপ আর অন্তর্ভুক্তি দ্রুত খুঁজতেই KMP বা হ্যাশিং লাগে।',
  ),
  statement: L(
    'Given three strings s₁, s₂, s₃, find the minimum length of a string that contains all three as substrings.',
    'তিনটি স্ট্রিং s₁, s₂, s₃ দেওয়া। তিনটিকেই সাবস্ট্রিং হিসেবে ধারণ করে এমন স্ট্রিংয়ের ন্যূনতম দৈর্ঘ্য বের করুন।',
  ),
  input: L('Three lines with s₁, s₂, s₃ (lowercase letters).', 'তিন লাইনে s₁, s₂, s₃ (ছোট হাতের অক্ষর)।'),
  output: L('The minimum length.', 'ন্যূনতম দৈর্ঘ্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ |sᵢ| ≤ 10⁵', '১ ≤ |sᵢ| ≤ ১০⁵')] },
  samples: [
    { input: 'ab\nbc\ncd', output: '4', explain: L('abcd.', 'abcd।') },
    { input: 'abacaba\nabaaba\nx', output: '11', explain: L('abaabacabax: abaaba overlaps abacaba by aba.', 'abaabacabax: abaaba আর abacaba-এর ওভারল্যাপ aba।') },
  ],
  observation: L(
    'In an optimal answer the three strings appear in some left-to-right order, and consecutive ones overlap as much as possible. So: for every order, merge(a, b) = a if b occurs inside a, otherwise a + b without its longest prefix that is a suffix of a. Take the shortest of the 6 results.',
    'সর্বোত্তম উত্তরে তিনটি স্ট্রিং বাম থেকে ডানে কোনো এক ক্রমে আসে, আর পরপর দুটি যত বেশি সম্ভব ওভারল্যাপ করে। তাই প্রতিটি ক্রমে merge(a, b) = a যদি b, a-এর ভেতরে থাকে, নইলে a + b থেকে তার দীর্ঘতম প্রিফিক্স বাদ যা a-এর সাফিক্স। ৬টি ফলের সবচেয়ে ছোটটি নিন।',
  ),
  approach: [
    L('Run KMP on b + # + a: a value |b| means b ⊂ a; the last value is the overlap.', 'b + # + a-এ KMP: মান |b| মানে b ⊂ a; শেষ মানটি ওভারল্যাপ।'),
    L('Merge in all 6 orders and keep the minimum length.', '৬টি ক্রমেই জোড়া লাগিয়ে ন্যূনতম দৈর্ঘ্য রাখা।'),
  ],
  walkthrough: {
    input: 'abacaba, abaaba, x',
    steps: [
      { state: 'order abaaba, abacaba: overlap aba → abaabacaba (10)', text: L('Suffix aba of abaaba = prefix aba of abacaba.', 'abaaba-এর সাফিক্স aba = abacaba-এর প্রিফিক্স aba।') },
      { state: '+ x → 11', text: L('No overlap with x.', 'x-এর সঙ্গে ওভারল্যাপ নেই।') },
    ],
  },
  complexity: { time: 'O(Σ|sᵢ|)', space: 'O(Σ|sᵢ|)', why: L('12 linear KMP runs.', '১২টি রৈখিক KMP চালানো।') },
  solutions: [
    {
      id: 'kmp',
      kind: 'optimal',
      title: L('KMP overlaps over all 6 orders', '৬টি ক্রমে KMP ওভারল্যাপ'),
      idea: L('Prefix function of b # a gives containment and overlap at once.', 'b # a-এর প্রিফিক্স ফাংশন একসঙ্গে অন্তর্ভুক্তি আর ওভারল্যাপ দেয়।'),
      explain: [
        L(
          'Handling containment is the subtle part: if b sits inside a, the merge is a itself. Without that, abc and b would give abcb instead of abc.',
          'অন্তর্ভুক্তি সামলানোই সূক্ষ্ম অংশ: b যদি a-এর ভেতরে থাকে, জোড়া হলো a নিজেই। তা না করলে abc আর b থেকে abc-এর বদলে abcb আসত।',
        ),
        L(
          'Only the merged string of the first two is needed for the second merge, so build it explicitly; lengths stay below 3·10⁵.',
          'দ্বিতীয় জোড়ার জন্য প্রথম দুটির জোড়া স্ট্রিং লাগে, তাই সরাসরি বানান; দৈর্ঘ্য ৩·১০⁵-এর নিচে থাকে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

string merge(const string& a, const string& b) {
    string u = b + '#' + a;
    vector<int> pi(u.size(), 0);
    for (size_t i = 1; i < u.size(); i++) {
        int k = pi[i - 1];
        while (k && u[i] != u[k]) k = pi[k - 1];
        if (u[i] == u[k]) k++;
        pi[i] = k;
        if (k == (int)b.size()) return a;  // b occurs inside a
    }
    return a + b.substr(pi.back());        // glue on the longest overlap
}

int main() {
    vector<string> s(3);
    for (auto& x : s) cin >> x;
    int order[3] = {0, 1, 2};
    size_t best = SIZE_MAX;
    do {
        string m = merge(merge(s[order[0]], s[order[1]]), s[order[2]]);
        best = min(best, m.size());
    } while (next_permutation(order, order + 3));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(Σ|sᵢ|)',
      space: 'O(Σ|sᵢ|)',
      accepted: true,
      toolkit: ['string-basics', 'functions'],
    },
    {
      id: 'hash',
      kind: 'method',
      title: L('Hashes for containment and overlap', 'অন্তর্ভুক্তি আর ওভারল্যাপের জন্য হ্যাশ'),
      idea: L('Slide a window of length |b| over a for containment; test every overlap length by comparing a suffix hash with a prefix hash.', 'অন্তর্ভুক্তির জন্য a-এর ওপর |b| দৈর্ঘ্যের জানালা সরানো; প্রতিটি ওভারল্যাপ দৈর্ঘ্য সাফিক্স আর প্রিফিক্স হ্যাশ তুলনায় যাচাই।'),
      explain: [
        L(
          'The same merges, now with substring hashes: Rabin–Karp for “is b in a”, and a scan from the longest possible overlap down for the glue.',
          'একই জোড়া, এবার সাবস্ট্রিং হ্যাশ দিয়ে: “b কি a-তে আছে” প্রশ্নের জন্য রাবিন–কার্প, আর জোড়ার জন্য সম্ভাব্য দীর্ঘতম ওভারল্যাপ থেকে নিচে স্ক্যান।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

ull B;
vector<ull> pw;

struct H {
    vector<ull> pre;
    H(const string& s) : pre(s.size() + 1, 0) {
        for (size_t i = 0; i < s.size(); i++) pre[i + 1] = add(mul(pre[i], B), (ull)s[i]);
    }
    ull get(int l, int r) const { return sub(pre[r], mul(pre[l], pw[r - l])); }
};

string merge(const string& a, const string& b) {
    H ha(a), hb(b);
    int na = a.size(), nb = b.size();
    ull whole = hb.get(0, nb);
    for (int i = 0; i + nb <= na; i++)
        if (ha.get(i, i + nb) == whole) return a;   // b inside a
    for (int k = min(na, nb); k >= 0; k--)
        if (ha.get(na - k, na) == hb.get(0, k)) return a + b.substr(k);
    return a + b;
}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    B = rng() % (MOD - 1000) + 500;
    pw.assign(400005, 1);
    for (int i = 1; i < 400005; i++) pw[i] = mul(pw[i - 1], B);
    vector<string> s(3);
    for (auto& x : s) cin >> x;
    int order[3] = {0, 1, 2};
    size_t best = SIZE_MAX;
    do {
        best = min(best, merge(merge(s[order[0]], s[order[1]]), s[order[2]]).size());
    } while (next_permutation(order, order + 3));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(Σ|sᵢ|)',
      space: 'O(Σ|sᵢ|)',
      accepted: true,
      toolkit: ['string-basics', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Naive overlaps with find and compare', 'find আর compare দিয়ে সাধারণ ওভারল্যাপ'),
      idea: L('The same 6 orders, but containment by string::find and overlaps by direct comparison.', 'একই ৬টি ক্রম, কিন্তু অন্তর্ভুক্তি string::find দিয়ে আর ওভারল্যাপ সরাসরি তুলনায়।'),
      explain: [L('Quadratic per merge; an independent check of the KMP and hashing versions.', 'প্রতি জোড়ায় দ্বিঘাত; KMP আর হ্যাশিং সংস্করণের স্বাধীন যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

string merge(const string& a, const string& b) {
    if (a.find(b) != string::npos) return a;
    for (int k = min(a.size(), b.size()); k >= 0; k--)
        if (a.compare(a.size() - k, k, b, 0, k) == 0) return a + b.substr(k);
    return a + b;
}

int main() {
    vector<string> s(3);
    for (auto& x : s) cin >> x;
    int order[3] = {0, 1, 2};
    size_t best = SIZE_MAX;
    do best = min(best, merge(merge(s[order[0]], s[order[1]]), s[order[2]]).size());
    while (next_permutation(order, order + 3));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(Σ|sᵢ|²)',
      space: 'O(Σ|sᵢ|)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: 'ab\nbc\ncd', output: '4', source: 'sample', note: sample(1) },
    { input: 'abacaba\nabaaba\nx', output: '11', source: 'sample', note: sample(2) },
    { input: 'abc\nb\nbc', output: '3', source: 'own', note: L('Both others sit inside abc.', 'অন্য দুটি abc-এর ভেতরেই।') },
    { input: 'aaa\naaa\naaa', output: '3', source: 'own', note: L('Identical strings.', 'হুবহু একই স্ট্রিং।') },
  ],
  pitfalls: [
    L('Ignoring containment: overlaps alone give abcb for abc and b.', 'অন্তর্ভুক্তি উপেক্ষা: শুধু ওভারল্যাপে abc আর b থেকে abcb আসে।'),
    L('Trying only one order.', 'শুধু একটি ক্রম চেষ্টা।'),
    L('Testing every overlap length by direct comparison: O(n²) on aaaa…', 'প্রতিটি ওভারল্যাপ দৈর্ঘ্য সরাসরি তুলনায় যাচাই: aaaa…-এ O(n²)।'),
  ],
  related: [
    { id: '1200E', name: 'Compress Words', why: L('Glue strings on their longest overlap.', 'দীর্ঘতম ওভারল্যাপে স্ট্রিং জোড়া।') },
    { id: '1137B', name: 'Camp Schedule', why: L('Overlaps of a string with itself.', 'একটি স্ট্রিংয়ের নিজের সঙ্গে ওভারল্যাপ।') },
  ],
  toolkit: ['string-basics'],
};

// ───────────────────────────────────────────── 1003F
export const p1003F: ProblemEntry = {
  id: '1003F',
  contestId: 1003,
  index: 'F',
  name: 'Abbreviation',
  rating: 2200,
  tags: ['dp', 'hashing', 'strings'],
  why: L(
    'Comparing whole word segments fast: an LCP table over words (or hashes of word ids) makes every “are these segments equal?” question O(1), and n ≤ 300 allows O(n³).',
    'পুরো শব্দ-অংশ দ্রুত তুলনা: শব্দের ওপর LCP টেবিল (বা শব্দ আইডির হ্যাশ) প্রতিটি “এই অংশগুলো কি সমান?” প্রশ্নকে O(১) করে, আর n ≤ ৩০০ O(n³) অনুমতি দেয়।',
  ),
  statement: L(
    'A text is n words separated by single spaces. You may do at most one abbreviation: pick at least two non-overlapping segments of words that are equal (same words in the same order) and replace each of them by the string of their first letters in uppercase. Find the minimum possible length of the text.',
    'একটি লেখায় n-টি শব্দ, একটি করে স্পেসে আলাদা। বড়জোর একটি সংক্ষেপণ করা যায়: অন্তত দুটি পরস্পর-না-ছোঁয়া সমান শব্দ-অংশ (একই শব্দ একই ক্রমে) বেছে প্রতিটিকে তাদের প্রথম অক্ষরগুলোর বড় হাতের স্ট্রিং দিয়ে বদলানো। লেখার ন্যূনতম সম্ভাব্য দৈর্ঘ্য বের করুন।',
  ),
  input: L('n, then the n words.', 'n, তারপর n-টি শব্দ।'),
  output: L('The minimum length.', 'ন্যূনতম দৈর্ঘ্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 300, total length of the text ≤ 10⁵', 'n ≤ ৩০০, লেখার মোট দৈর্ঘ্য ≤ ১০⁵')] },
  samples: [
    { input: '6\nto be or not to be', output: '12', explain: L('TB or not TB.', 'TB or not TB।') },
    { input: '10\na ab a a b ab a a b c', output: '13', explain: L('Abbreviate “ab a a b” twice: a AAAB AAAB c.', '“ab a a b” দুবার সংক্ষেপ: a AAAB AAAB c।') },
    { input: '6\naa bb aa aa bb bb', output: '11', explain: L('AB aa AB bb.', 'AB aa AB bb।') },
  ],
  observation: L(
    'A segment of len words with letters L saves (L + len − 1) − len = L − 1 characters each time it is abbreviated. Fix its first occurrence i and its length; then take later non-overlapping copies greedily from the left, since the earliest copies leave the most room. lcp[i][j], the number of equal words starting at i and at j, answers “is there a copy at j” in O(1).',
    'len শব্দ আর মোট L অক্ষরের একটি অংশ প্রতিবার সংক্ষেপে (L + len − ১) − len = L − ১ অক্ষর বাঁচায়। প্রথম ঘটনা i আর দৈর্ঘ্য ঠিক করুন; তারপর বাম থেকে লোভীভাবে পরের না-ছোঁয়া কপি নিন, কারণ আগের কপি সবচেয়ে বেশি জায়গা রাখে। lcp[i][j], i আর j থেকে শুরু হওয়া সমান শব্দের সংখ্যা, “j-তে কি কপি আছে” প্রশ্নের উত্তর O(১)-এ দেয়।',
  ),
  approach: [
    L('Map words to integer ids so equal words compare in O(1).', 'শব্দগুলোকে পূর্ণসংখ্যা আইডিতে বদলানো যাতে সমান শব্দ O(১)-এ তুলনা হয়।'),
    L('lcp[i][j] = word[i] = word[j] ? lcp[i+1][j+1] + 1 : 0, filled from the end.', 'lcp[i][j] = word[i] = word[j] ? lcp[i+১][j+১] + ১ : ০, শেষ থেকে পূর্ণ।'),
    L('For each i and len: scan j from i, jump by len at every copy, count copies; if ≥ 2, saving = count · (L − 1).', 'প্রতিটি i আর len-এ: i থেকে j স্ক্যান, প্রতিটি কপিতে len লাফ, কপি গোনা; ≥ ২ হলে সাশ্রয় = গণনা · (L − ১)।'),
  ],
  walkthrough: {
    input: 'to be or not to be',
    steps: [
      { state: 'total = 13 letters + 5 spaces = 18', text: L('Original length.', 'আসল দৈর্ঘ্য।') },
      { state: 'i = 0, len = 2 (to be): copies at 0 and 4', text: L('L = 4 letters, saving 2 · 3 = 6.', 'L = ৪ অক্ষর, সাশ্রয় ২ · ৩ = ৬।') },
      { state: '18 − 6 = 12', text: L('No other choice saves more.', 'অন্য কোনো পছন্দ বেশি বাঁচায় না।') },
    ],
  },
  complexity: { time: 'O(n³)', space: 'O(n²)', why: L('For each (i, len) one scan over j.', 'প্রতিটি (i, len)-এ j-এর ওপর এক স্ক্যান।') },
  solutions: [
    {
      id: 'lcp-table',
      kind: 'optimal',
      title: L('Word LCP table plus greedy copies', 'শব্দ LCP টেবিল আর লোভী কপি'),
      idea: L('lcp over word ids; for each (i, len) greedily count copies.', 'শব্দ আইডির ওপর lcp; প্রতিটি (i, len)-এ লোভীভাবে কপি গোনা।'),
      explain: [
        L(
          'The LCP table is a DP on pairs of positions, the same idea as edit distance or longest common substring, here on words instead of letters.',
          'LCP টেবিল অবস্থান-জোড়ার ওপর একটি DP, এডিট দূরত্ব বা দীর্ঘতম সাধারণ সাবস্ট্রিংয়ের মতো একই ধারণা, এখানে অক্ষরের বদলে শব্দে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> w(n);
    map<string, int> id;
    vector<int> a(n), len(n);
    int total = n - 1;  // spaces
    for (int i = 0; i < n; i++) {
        cin >> w[i];
        a[i] = id.emplace(w[i], id.size()).first->second;
        len[i] = w[i].size();
        total += len[i];
    }
    vector<vector<int>> lcp(n + 1, vector<int>(n + 1, 0));
    for (int i = n - 1; i >= 0; i--)
        for (int j = n - 1; j >= 0; j--)
            lcp[i][j] = a[i] == a[j] ? lcp[i + 1][j + 1] + 1 : 0;
    int best = 0;
    for (int i = 0; i < n; i++) {
        int letters = 0;
        for (int k = 1; i + k <= n; k++) {
            letters += len[i + k - 1];
            int copies = 0;
            for (int j = i; j + k <= n; ) {
                if (lcp[i][j] >= k) copies++, j += k;
                else j++;
            }
            if (copies >= 2) best = max(best, copies * (letters - 1));
        }
    }
    cout << total - best << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['map', 'vector', 'min-max'],
    },
    {
      id: 'segment-hash',
      kind: 'method',
      title: L('Hash word segments', 'শব্দ-অংশ হ্যাশ'),
      idea: L('Polynomial hash over word ids; a copy at j exists iff hash(j, j + len) = hash(i, i + len).', 'শব্দ আইডির ওপর পলিনোমিয়াল হ্যাশ; j-তে কপি আছে যদি ও কেবল যদি hash(j, j + len) = hash(i, i + len)।'),
      explain: [
        L(
          'A sequence of words is just a string over a large alphabet, so prefix hashes over word ids work unchanged and need only O(n) memory instead of the n² table.',
          'শব্দের অনুক্রম আসলে একটি বড় বর্ণমালার স্ট্রিং, তাই শব্দ আইডির ওপর প্রিফিক্স হ্যাশ হুবহু চলে, আর n² টেবিলের বদলে শুধু O(n) মেমরি লাগে।',
        ),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${hash61}

int main() {
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    ull B = rng() % (MOD - 1000) + 500;
    int n;
    cin >> n;
    map<string, int> id;
    vector<ull> pre(n + 1, 0), pw(n + 1, 1);
    vector<int> len(n);
    int total = n - 1;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        ull x = id.emplace(w, id.size() + 1).first->second;
        pre[i + 1] = add(mul(pre[i], B), x);
        pw[i + 1] = mul(pw[i], B);
        len[i] = w.size();
        total += len[i];
    }
    auto get = [&](int l, int r) { return sub(pre[r], mul(pre[l], pw[r - l])); };
    int best = 0;
    for (int i = 0; i < n; i++) {
        int letters = 0;
        for (int k = 1; i + k <= n; k++) {
            letters += len[i + k - 1];
            ull want = get(i, i + k);
            int copies = 0;
            for (int j = i; j + k <= n; ) {
                if (get(j, j + k) == want) copies++, j += k;
                else j++;
            }
            if (copies >= 2) best = max(best, copies * (letters - 1));
        }
    }
    cout << total - best << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Compare segments word by word', 'শব্দ ধরে অংশ তুলনা'),
      idea: L('Same greedy, but every copy test compares the words directly.', 'একই লোভী, কিন্তু প্রতিটি কপি যাচাইয়ে সরাসরি শব্দ তুলনা।'),
      explain: [L('O(n⁴) string comparisons; fine for the small stress inputs.', 'O(n⁴) স্ট্রিং তুলনা; ছোট স্ট্রেস ইনপুটে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<string> w(n);
    int total = n - 1;
    for (auto& x : w) cin >> x, total += x.size();
    int best = 0;
    for (int i = 0; i < n; i++)
        for (int k = 1; i + k <= n; k++) {
            int letters = 0;
            for (int t = 0; t < k; t++) letters += w[i + t].size();
            int copies = 0;
            for (int j = i; j + k <= n; ) {
                bool same = true;
                for (int t = 0; t < k; t++) same &= w[i + t] == w[j + t];
                if (same) copies++, j += k;
                else j++;
            }
            if (copies >= 2) best = max(best, copies * (letters - 1));
        }
    cout << total - best << "\n";
    return 0;
}
`,
      time: 'O(n⁴ · word length)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '6\nto be or not to be', output: '12', source: 'sample', note: sample(1) },
    { input: '10\na ab a a b ab a a b c', output: '13', source: 'sample', note: sample(2) },
    { input: '6\naa bb aa aa bb bb', output: '11', source: 'sample', note: sample(3) },
    { input: '3\na a a', output: '5', source: 'own', note: L('One-letter words save nothing.', 'এক অক্ষরের শব্দ কিছুই বাঁচায় না।') },
    { input: '4\nxy xy xy xy', output: '5', source: 'own', note: L('Two copies of “xy xy” save 2 · 3 = 6, more than four copies of “xy” (4 · 1).', '“xy xy”-এর দুটি কপি ২ · ৩ = ৬ বাঁচায়, “xy”-এর চারটি কপির (৪ · ১) চেয়ে বেশি।') },
  ],
  pitfalls: [
    L('Letting the chosen segments overlap.', 'বাছাই করা অংশগুলোকে ওভারল্যাপ করতে দেওয়া।'),
    L('Forgetting the spaces inside a segment: they disappear in the abbreviation too.', 'অংশের ভেতরের স্পেস ভুলে যাওয়া: সংক্ষেপণে সেগুলোও উধাও হয়।'),
    L('Abbreviating a segment that occurs only once.', 'মাত্র একবার আসা অংশ সংক্ষেপ করা।'),
  ],
  related: [
    { id: '1200E', name: 'Compress Words', why: L('Equal pieces of text found by hashing.', 'হ্যাশিং দিয়ে লেখার সমান টুকরো খোঁজা।') },
    { id: '182D', name: 'Common Divisors', why: L('Repeated blocks of a string.', 'স্ট্রিংয়ের পুনরাবৃত্ত ব্লক।') },
  ],
  toolkit: ['map', 'vector'],
};
