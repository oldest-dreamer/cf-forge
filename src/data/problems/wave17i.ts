import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 715C
export const p715C: ProblemEntry = {
  id: '715C',
  contestId: 715,
  index: 'C',
  name: 'Digit Tree',
  rating: 2600,
  tags: ['dfs', 'divide-and-conquer', 'dsu', 'math', 'trees'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'Reading digits along a path is a polynomial in 10. Splitting every path at a centroid turns “the number is divisible by M” into “one half equals a known function of the other half”, which a sorted array of residues can count — and M being coprime to 10 is exactly what makes 10 invertible.',
    'পথ বরাবর অঙ্ক পড়া ১০-এর বহুপদী। প্রতিটি পথ সেন্ট্রয়েডে ভাঙলে “সংখ্যাটি M দিয়ে বিভাজ্য” হয়ে যায় “এক অর্ধ অন্য অর্ধের জানা ফাংশনের সমান”, যা অবশিষ্টের সর্টেড অ্যারেতে গোনা যায় — আর M, ১০-এর সঙ্গে সহমৌলিক বলেই ১০ উল্টানো যায়।',
  ),
  statement: L(
    'A tree of n vertices has a digit 0–9 written on every edge. M is coprime to 10. Count the ordered pairs (u, v), u ≠ v, such that the decimal number written by the digits along the path from u to v (in order, u first) is divisible by M.',
    'n শীর্ষের গাছের প্রতিটি কিনারায় ০–৯ একটি অঙ্ক লেখা। M, ১০-এর সঙ্গে সহমৌলিক। এমন ক্রমিক জোড়া (u, v), u ≠ v গোনো যাতে u থেকে v-র পথের অঙ্কগুলো (ক্রমে, u আগে) নিয়ে গড়া দশমিক সংখ্যা M দিয়ে বিভাজ্য।',
  ),
  input: L('n and M, then n − 1 lines u v w.', 'n আর M, তারপর n − ১ লাইনে u v w।'),
  output: L('The number of ordered pairs.', 'ক্রমিক জোড়ার সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, 1 ≤ M ≤ 10⁹, gcd(M, 10) = 1', '২ ≤ n ≤ ১০⁵, ১ ≤ M ≤ ১০⁹, gcd(M, ১০) = ১')] },
  samples: [
    { input: '6 7\n0 1 2\n4 2 4\n2 0 1\n3 0 9\n2 5 7', output: '7', explain: L('Seven ordered pairs read a multiple of 7 (including numbers with leading zeros).', 'সাতটি ক্রমিক জোড়া ৭-এর গুণিতক পড়ে (প্রধান শূন্যসহ সংখ্যাও ধরে)।') },
    { input: '5 11\n1 2 3\n2 0 3\n3 0 3\n4 3 3', output: '8', explain: L('Eight ordered pairs read a number divisible by 11, such as 33 or 0 (a single 0 edge).', 'আটটি ক্রমিক জোড়া ১১ দিয়ে বিভাজ্য সংখ্যা পড়ে, যেমন ৩৩ বা ০ (একক শূন্য-কিনারা)।') },
  ],
  observation: L(
    'Fix a centroid c and let depth(x) = the number of edges from c to x. Let A(x) be the number read from x to c and B(x) the number read from c to x. Then the pair (u, v) through c reads A(u)·10^depth(v) + B(v). Because 10 is invertible mod M, this is 0 iff A(u) ≡ −B(v)·(10⁻¹)^depth(v) =: key(v). So for each v we just count the vertices u whose A equals key(v), outside v’s own subtree.',
    'একটি সেন্ট্রয়েড c ধরো আর depth(x) = c থেকে x-এর কিনারা সংখ্যা। A(x) = x থেকে c পর্যন্ত পড়া সংখ্যা আর B(x) = c থেকে x পর্যন্ত। তাহলে c দিয়ে যাওয়া জোড়া (u, v) পড়ে A(u)·১০^depth(v) + B(v)। ১০ mod M-এ উল্টানো যায় বলে এটি ০ হয় ঠিক তখনই যখন A(u) ≡ −B(v)·(১০⁻¹)^depth(v) =: key(v)। তাই প্রতিটি v-র জন্য শুধু সেইসব u গোনো যাদের A = key(v), v-র নিজের উপগাছের বাইরে।',
  ),
  approach: [
    L('Precompute 10ᵏ and (10⁻¹)ᵏ mod M; the inverse comes from the extended Euclid algorithm, since M need not be prime.', '১০ᵏ আর (১০⁻¹)ᵏ mod M আগে হিসাব করো; M মৌলিক নয় বলে বিপরীত পাওয়া যায় এক্সটেন্ডেড ইউক্লিড দিয়ে।'),
    L('At each centroid compute A, B and depth for every vertex of every child subtree (the centroid has A = B = 0, depth 0).', 'প্রতিটি সেন্ট্রয়েডে প্রতিটি সন্তান-উপগাছের প্রতিটি শীর্ষের A, B, depth বের করো (সেন্ট্রয়েডের A = B = ০, depth ০)।'),
    L('Sort all A values; for every v add the number of equal A values to key(v) overall, then subtract the matches inside v’s own subtree; subtract 1 for the pair (c, c).', 'সব A সর্ট করো; প্রতিটি v-র জন্য key(v)-র সমান A-এর মোট সংখ্যা যোগ করো, তারপর v-র নিজের উপগাছের ভেতরের মিল বাদ দাও; জোড়া (c, c)-র জন্য ১ বিয়োগ।'),
  ],
  walkthrough: {
    input: 'M = 7, star at c with edges digit 2 to x and digit 1 to y',
    steps: [
      { state: 'A(x) = 2, B(x) = 2; A(y) = 1, B(y) = 1', text: L('Depth 1: number read each way is the single digit.', 'গভীরতা ১: দুই দিকেই পড়া সংখ্যা একক অঙ্ক।') },
      { state: 'path x → y reads 2·10 + 1 = 21', text: L('21 = 3 · 7: divisible. Via keys: key(y) = −1·10⁻¹ ≡ 2 mod 7 = A(x). ✓', '২১ = ৩ · ৭: বিভাজ্য। key দিয়ে: key(y) = −১·১০⁻¹ ≡ ২ mod ৭ = A(x) ✓।') },
    ],
  },
  complexity: { time: 'O(n log² n)', space: 'O(n)', why: L('Each level sorts n residues; there are log n levels.', 'প্রতি স্তরে n টি অবশিষ্ট সর্ট; log n স্তর।') },
  solutions: [
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Centroid decomposition with sorted residues', 'সর্টেড অবশিষ্টসহ সেন্ট্রয়েড ডিকম্পোজিশন'),
      idea: L('Count (A(u) = key(v)) over the whole component, subtract inside each child subtree.', 'পুরো কম্পোনেন্টে (A(u) = key(v)) গোনো, প্রতিটি সন্তান-উপগাছের ভেতরের মিল বাদ দাও।'),
      explain: [L('All products fit in 64 bits because M ≤ 10⁹. The subtraction handles u = v as well (a vertex whose own A equals its own key), so there is no special case except the centroid pair (c, c).', 'M ≤ ১০⁹ বলে সব গুণফল ৬৪ বিটে ধরে। বিয়োগে u = v-ও সামলানো যায় (যে শীর্ষের নিজের A তার নিজের key-র সমান), তাই সেন্ট্রয়েড জোড়া (c, c) ছাড়া বিশেষ কেস নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

ll M;

ll egcdInv(ll a, ll m) {  // inverse of a mod m, gcd(a, m) = 1
    ll g = m, x = 0, y = 1, aa = a % m;
    ll r0 = m, r1 = aa, t0 = 0, t1 = 1;
    while (r1) {
        ll q = r0 / r1;
        ll r2 = r0 - q * r1, t2 = t0 - q * t1;
        r0 = r1, r1 = r2, t0 = t1, t1 = t2;
    }
    (void)g; (void)x; (void)y;
    return ((t0 % m) + m) % m;
}

int main() {
    int n;
    scanf("%d %lld", &n, &M);
    vector<vector<pair<int, int>>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        u++, v++;  // input vertices are 0-indexed
        g[u].push_back({v, w}), g[v].push_back({u, w});
    }
    vector<ll> p10(n + 2), ip10(n + 2);
    ll inv10 = M == 1 ? 0 : egcdInv(10, M);
    p10[0] = ip10[0] = 1 % M;
    for (int i = 1; i <= n + 1; i++) p10[i] = p10[i - 1] * 10 % M, ip10[i] = ip10[i - 1] * inv10 % M;
    vector<int> sz(n + 1), pr(n + 1);
    vector<char> dead(n + 1, 0);
    vector<int> stk = {1}, order;
    ll ans = 0;
    while (!stk.empty()) {
        int s = stk.back();
        stk.pop_back();
        order.assign(1, s);
        pr[s] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (auto [w, d] : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = s;
        for (int v : order) {
            int mx = tot - sz[v];
            for (auto [w, d] : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        struct Item { ll A, key; };
        vector<vector<Item>> groups;
        vector<ll> allA = {0};
        ll all_keys_zero = 0;
        for (auto [w, d] : g[c]) {
            if (dead[w]) continue;
            vector<int> nodes = {w}, par = {c}, dep = {1};
            vector<ll> A = {d % M}, B = {d % M};
            for (size_t i = 0; i < nodes.size(); i++)
                for (auto [x, t] : g[nodes[i]])
                    if (!dead[x] && x != par[i]) {
                        nodes.push_back(x), par.push_back(nodes[i]), dep.push_back(dep[i] + 1);
                        A.push_back((A[i] + (ll)t * p10[dep[i]]) % M);
                        B.push_back((B[i] * 10 + t) % M);
                    }
            vector<Item> grp;
            for (size_t i = 0; i < nodes.size(); i++) {
                ll key = (M - B[i] % M) % M * ip10[dep[i]] % M;
                grp.push_back({A[i], key});
                allA.push_back(A[i]);
            }
            groups.push_back(grp);
        }
        sort(allA.begin(), allA.end());
        auto countEq = [&](const vector<ll>& v, ll x) {
            auto r = equal_range(v.begin(), v.end(), x);
            return (ll)(r.second - r.first);
        };
        ans += countEq(allA, 0) - 1;  // v = c: key 0, minus the pair (c, c)
        for (auto& grp : groups) {
            vector<ll> As;
            for (auto& it : grp) As.push_back(it.A);
            sort(As.begin(), As.end());
            for (auto& it : grp) ans += countEq(allA, it.key) - countEq(As, it.key);
        }
        (void)all_keys_zero;
        dead[c] = 1;
        for (auto [w, d] : g[c])
            if (!dead[w]) stk.push_back(w);
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log² n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'pair', 'structured-bindings', 'mod-arith', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Walk every ordered pair', 'প্রতিটি ক্রমিক জোড়া হাঁটো'),
      idea: L('For each u run a DFS carrying the value of the path read so far.', 'প্রতিটি u থেকে DFS চালাও, এ পর্যন্ত পড়া সংখ্যা বহন করে।'),
      explain: [L('O(n²): the value extends as value·10 + digit. It never uses inverses, which makes it a good independent check of the key formula.', 'O(n²): মান বাড়ে মান·১০ + অঙ্ক হিসেবে। বিপরীত ব্যবহার করে না, তাই key সূত্রের ভালো স্বাধীন যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    ll M;
    scanf("%d %lld", &n, &M);
    vector<vector<pair<int, int>>> g(n);
    for (int i = 1; i < n; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        g[u].push_back({v, w}), g[v].push_back({u, w});
    }
    ll ans = 0;
    for (int s = 0; s < n; s++) {
        vector<ll> val(n, -1);
        vector<int> q = {s};
        val[s] = 0;
        for (size_t h = 0; h < q.size(); h++)
            for (auto [w, d] : g[q[h]])
                if (val[w] < 0) val[w] = (val[q[h]] * 10 + d) % M, q.push_back(w);
        for (int v = 0; v < n; v++)
            if (v != s && val[v] == 0) ans++;
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'pair', 'structured-bindings', 'modulo'],
    },
  ],
  tests: [
    { input: '6 7\n0 1 2\n4 2 4\n2 0 1\n3 0 9\n2 5 7', output: '7', source: 'sample', note: sample(1) },
    { input: '5 11\n1 2 3\n2 0 3\n3 0 3\n4 3 3', output: '8', source: 'sample', note: sample(2) },
    { input: '2 1\n0 1 5', output: '2', source: 'own', note: L('M = 1: every number is divisible, two ordered pairs.', 'M = ১: প্রতিটি সংখ্যা বিভাজ্য, দুটি ক্রমিক জোড়া।') },
  ],
  pitfalls: [
    L('Using the plain modular inverse by Fermat’s little theorem: M is not prime. Use the extended Euclid algorithm.', 'ফার্মার ছোট উপপাদ্যে সাধারণ মডুলার বিপরীত: M মৌলিক নয়। এক্সটেন্ডেড ইউক্লিড ব্যবহার করো।'),
    L('Mixing the reading direction: the number read from u to v has u’s digit first, so A uses the weight 10^(depth − 1) for the new edge, while B multiplies by 10.', 'পড়ার দিক গুলিয়ে ফেলা: u থেকে v-র সংখ্যায় u-র অঙ্ক আগে, তাই নতুন কিনারায় A ১০^(depth − ১) ওজন পায়, আর B ১০ দিয়ে গুণ হয়।'),
    L('Forgetting to subtract the same-subtree matches: they correspond to paths that do not pass through the centroid.', 'একই-উপগাছের মিল বাদ না দেওয়া: ওগুলো সেন্ট্রয়েড না ছোঁয়া পথের মিল।'),
  ],
  related: [
    { id: '914E', name: 'Palindromes in a Tree', why: L('Centroid counting with masks instead of residues.', 'অবশিষ্টের বদলে মাস্কসহ সেন্ট্রয়েড গণনা।') },
    { id: '161D', name: 'Distance in Tree', why: L('The simplest centroid counting problem.', 'সবচেয়ে সহজ সেন্ট্রয়েড গণনা-সমস্যা।') },
  ],
  toolkit: ['mod-arith', 'long-long'],
};

// ───────────────────────────────────────────── 1100F
export const p1100F: ProblemEntry = {
  id: '1100F',
  contestId: 1100,
  index: 'F',
  name: 'Ivan and Burgers',
  rating: 2600,
  tags: ['data-structures', 'divide-and-conquer'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'Maximum XOR of a subset is solved by a linear basis. For range queries there are two classic answers: a basis that remembers the latest position of every vector, or a divide and conquer that merges two precomputed bases at the midpoint.',
    'সাবসেটের সর্বোচ্চ XOR লিনিয়ার বেসিসে সমাধান হয়। রেঞ্জ কোয়েরিতে দুটি ক্লাসিক উত্তর: প্রতিটি ভেক্টরের সর্বশেষ অবস্থান মনে রাখা বেসিস, অথবা মাঝখানে দুটি আগে-হিসাব-করা বেসিস মেলানো ডিভাইড অ্যান্ড কনকার।',
  ),
  statement: L(
    'There are n burgers, the i-th costs cᵢ. For each query (l, r) a customer may buy any subset of the burgers l … r, and the money he loses is the XOR of the chosen costs. Print the largest value this XOR can take (the empty subset is allowed).',
    'n টি বার্গার, i-তমটির দাম cᵢ। প্রতিটি কোয়েরি (l, r)-এ ক্রেতা বার্গার l … r থেকে যেকোনো উপসেট কিনতে পারে, আর তার ক্ষতি হয় বাছা দামগুলোর XOR। এই XOR-এর সর্বোচ্চ মান প্রিন্ট করো (ফাঁকা উপসেটও চলে)।',
  ),
  input: L('n, the costs, q, then q queries l r.', 'n, দামগুলো, q, তারপর q টি কোয়েরি l r।'),
  output: L('One number per query.', 'প্রতিটি কোয়েরির জন্য একটি সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('1 ≤ n, q ≤ 5·10⁵, 0 ≤ cᵢ ≤ 10⁶', '১ ≤ n, q ≤ ৫·১০⁵, ০ ≤ cᵢ ≤ ১০⁶')] },
  samples: [
    { input: '4\n7 2 3 4\n3\n1 4\n2 3\n1 3', output: '7\n3\n7', explain: L('For [2, 3] the options are 0, 2, 3 and 2 xor 3 = 1, so 3. For [1, 4] and [1, 3] the burger of cost 7 alone gives 7, the largest 3-bit value.', '[২, ৩]-এ বিকল্প ০, ২, ৩ আর ২ xor ৩ = ১, তাই ৩। [১, ৪] আর [১, ৩]-এ দাম ৭-এর বার্গার একাই ৭ দেয়, যা ৩-বিটের বৃহত্তম মান।') },
  ],
  observation: L(
    'A linear basis over GF(2) has at most 20 vectors; the maximum XOR is found by taking each basis vector greedily when it increases the result. For ranges sort the queries by r and keep a basis for the prefix [1, r] in which each vector carries the latest position it can be built from: while inserting, if the new element has a later position than the stored one, swap them and keep inserting the displaced one. A query (l, r) uses only the basis vectors with position ≥ l.',
    'GF(২)-এর লিনিয়ার বেসিসে সর্বোচ্চ ২০টি ভেক্টর; ফল বাড়ালেই প্রতিটি বেসিস ভেক্টর লোভীভাবে নিয়ে সর্বোচ্চ XOR মেলে। রেঞ্জের জন্য কোয়েরি r অনুযায়ী সর্ট করো আর প্রিফিক্স [১, r]-এর একটি বেসিস রাখো যাতে প্রতিটি ভেক্টর সবচেয়ে দেরির অবস্থান বহন করে: ঢোকানোর সময় নতুন উপাদানের অবস্থান সংরক্ষিতটির চেয়ে পরের হলে তাদের অদলবদল করে সরে যাওয়াটি ঢোকাতে থাকো। কোয়েরি (l, r) শুধু অবস্থান ≥ l বেসিস ভেক্টর নেয়।',
  ),
  approach: [
    L('Sort queries by r.', 'কোয়েরি r অনুযায়ী সর্ট করো।'),
    L('Insert cᵣ with position r into the timestamped basis, swapping with older vectors that have an earlier position.', 'অবস্থান r-সহ cᵣ টাইমস্ট্যাম্পযুক্ত বেসিসে ঢোকাও, আগের অবস্থানের পুরোনো ভেক্টরের সঙ্গে অদলবদল করে।'),
    L('Answer each query ending at r by greedily XOR-ing the basis vectors with position ≥ l.', 'r-এ শেষ হওয়া প্রতিটি কোয়েরির উত্তর দাও অবস্থান ≥ l বেসিস ভেক্টর লোভীভাবে XOR করে।'),
  ],
  walkthrough: {
    input: 'costs 7 2 3 4, query (2, 3)',
    steps: [
      { state: 'after r = 3 the basis has vectors from positions 1, 2 and 3', text: L('7 (position 1) keeps the top bit; 2 and 3 are reduced against it but stay marked with their later positions 2 and 3 where they can replace it.', '৭ (অবস্থান ১) সর্বোচ্চ বিট ধরে রাখে; ২ আর ৩ এর বিপরীতে কমে কিন্তু তাদের পরের অবস্থান ২ ও ৩-সহ চিহ্নিত থাকে, যেখানে তারা একে প্রতিস্থাপন করতে পারে।') },
      { state: 'query l = 2: use only vectors with position ≥ 2', text: L('Greedy XOR over them gives 3.', 'তাদের ওপর লোভী XOR দেয় ৩।') },
    ],
  },
  complexity: { time: 'O((n + q) · 20)', space: 'O(n + q)', why: L('One insertion per element and one greedy pass per query, each 20 steps.', 'প্রতি উপাদানে একটি ঢোকানো আর প্রতি কোয়েরিতে একটি লোভী পাস, প্রতিটি ২০ ধাপ।') },
  solutions: [
    {
      id: 'prefix',
      kind: 'optimal',
      title: L('Prefix linear basis with latest positions', 'সর্বশেষ অবস্থানসহ প্রিফিক্স লিনিয়ার বেসিস'),
      idea: L('Offline by right end; the basis always prefers later positions.', 'ডান প্রান্ত অনুযায়ী অফলাইন; বেসিস সবসময় পরের অবস্থান পছন্দ করে।'),
      explain: [L('The swap keeps the invariant that for every l the vectors with position ≥ l span exactly the same space as the original c_l … c_r. The query needs no extra work beyond the greedy pass.', 'অদলবদল এই অপরিবর্তনীয়তা রাখে যে প্রতিটি l-এর জন্য অবস্থান ≥ l ভেক্টরগুলো ঠিক c_l … c_r-এর স্প্যানের সমান স্পেস গড়ে। কোয়েরিতে লোভী পাসের বাইরে বাড়তি কাজ লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> c(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &c[i]);
    int q;
    scanf("%d", &q);
    vector<array<int, 3>> qs(q);
    for (int i = 0; i < q; i++) scanf("%d %d", &qs[i][1], &qs[i][0]), qs[i][2] = i;  // sort by r
    sort(qs.begin(), qs.end());
    vector<int> ans(q);
    int b[20] = {}, pos[20] = {};
    int k = 0;
    for (int r = 1; r <= n; r++) {
        int x = c[r], p = r;
        for (int bit = 19; bit >= 0 && x; bit--) {
            if (!(x >> bit & 1)) continue;
            if (!b[bit]) { b[bit] = x, pos[bit] = p; break; }
            if (pos[bit] < p) swap(b[bit], x), swap(pos[bit], p);
            x ^= b[bit];
        }
        while (k < q && qs[k][0] == r) {
            int l = qs[k][1], res = 0;
            for (int bit = 19; bit >= 0; bit--)
                if (b[bit] && pos[bit] >= l && (res ^ b[bit]) > res) res ^= b[bit];
            ans[qs[k][2]] = res;
            k++;
        }
    }
    for (int i = 0; i < q; i++) printf("%d\n", ans[i]);
    return 0;
}
`,
      time: 'O((n + q) log C)',
      space: 'O(n + q)',
      accepted: true,
      toolkit: ['sort', 'bitwise-and', 'bit-shift'],
    },
    {
      id: 'dc',
      kind: 'method',
      title: L('Offline divide and conquer, merging two bases', 'অফলাইন ডিভাইড অ্যান্ড কনকার, দুটি বেসিস মেলানো'),
      idea: L('For queries crossing the midpoint, the answer is the merge of “basis of c[l..mid]” and “basis of c[mid+1..r]”.', 'মাঝ পেরোনো কোয়েরিতে উত্তর “c[l..mid]-এর বেসিস” আর “c[mid+1..r]-এর বেসিস”-এর মিলন।'),
      explain: [L('From the midpoint outwards build a basis for every suffix on the left and every prefix on the right (20 ints each). A crossing query copies one, inserts the other’s 20 vectors and runs the greedy pass: about 20 · 20 operations. Queries inside one half recurse.', 'মাঝ থেকে বাইরের দিকে বামের প্রতিটি সাফিক্স আর ডানের প্রতিটি প্রিফিক্সের বেসিস বানাও (প্রতিটিতে ২০টি int)। ক্রসিং কোয়েরি একটি কপি করে অন্যটির ২০ ভেক্টর ঢোকায় আর লোভী পাস চালায়: প্রায় ২০ · ২০ অপারেশন। এক অর্ধের ভেতরের কোয়েরি রিকার্স করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, q;
vector<int> c;
vector<array<int, 2>> qs;
vector<int> ans;

struct Basis {
    int b[20] = {};
    void insert(int x) {
        for (int bit = 19; bit >= 0 && x; bit--) {
            if (!(x >> bit & 1)) continue;
            if (!b[bit]) { b[bit] = x; return; }
            x ^= b[bit];
        }
    }
    int best() const {
        int r = 0;
        for (int bit = 19; bit >= 0; bit--)
            if ((r ^ b[bit]) > r) r ^= b[bit];
        return r;
    }
};

void solve(int l, int r, vector<int>& ids) {
    if (ids.empty()) return;
    if (l == r) {
        for (int id : ids) ans[id] = c[l];
        return;
    }
    int m = (l + r) / 2;
    vector<int> lo, hi, cross;
    for (int id : ids) {
        if (qs[id][1] <= m) lo.push_back(id);
        else if (qs[id][0] > m) hi.push_back(id);
        else cross.push_back(id);
    }
    if (!cross.empty()) {
        vector<Basis> L(m - l + 1), R(r - m);
        Basis cur;
        for (int i = m; i >= l; i--) cur.insert(c[i]), L[i - l] = cur;
        cur = Basis();
        for (int i = m + 1; i <= r; i++) cur.insert(c[i]), R[i - m - 1] = cur;
        for (int id : cross) {
            Basis t = L[qs[id][0] - l];
            const Basis& rb = R[qs[id][1] - m - 1];
            for (int bit = 0; bit < 20; bit++)
                if (rb.b[bit]) t.insert(rb.b[bit]);
            ans[id] = t.best();
        }
    }
    solve(l, m, lo), solve(m + 1, r, hi);
}

int main() {
    scanf("%d", &n);
    c.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &c[i]);
    scanf("%d", &q);
    qs.resize(q), ans.assign(q, 0);
    vector<int> ids(q);
    for (int i = 0; i < q; i++) scanf("%d %d", &qs[i][0], &qs[i][1]), ids[i] = i;
    solve(1, n, ids);
    for (int i = 0; i < q; i++) printf("%d\n", ans[i]);
    return 0;
}
`,
      time: 'O(n log n · 20 + q · 400)',
      space: 'O(n · 20)',
      accepted: true,
      toolkit: ['vector', 'bitwise-and', 'bit-shift'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every subset of the range', 'পরিসরের প্রতিটি উপসেট গোনা'),
      idea: L('Try all 2^(r − l + 1) subsets and take the largest XOR.', 'সব ২^(r − l + ১) উপসেট চেষ্টা করে সর্বোচ্চ XOR নাও।'),
      explain: [L('The statement itself. It never uses a basis, so it is a trustworthy reference for both solutions above.', 'প্রবলেম-বিবরণই। বেসিস ব্যবহার করে না, তাই ওপরের দুটি সমাধানের ভরসাযোগ্য রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> c(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &c[i]);
    int q;
    scanf("%d", &q);
    while (q--) {
        int l, r;
        scanf("%d %d", &l, &r);
        int len = r - l + 1, best = 0;
        for (int m = 0; m < (1 << len); m++) {
            int x = 0;
            for (int i = 0; i < len; i++)
                if (m >> i & 1) x ^= c[l + i];
            best = max(best, x);
        }
        printf("%d\n", best);
    }
    return 0;
}
`,
      time: 'O(q · 2ⁿ)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift', 'bitwise-and'],
    },
  ],
  tests: [
    { input: '4\n7 2 3 4\n3\n1 4\n2 3\n1 3', output: '7\n3\n7', source: 'sample', note: sample(1) },
    { input: '1\n0\n1\n1 1', output: '0', source: 'own', note: L('Zero cost: the only value is 0.', 'দাম শূন্য: একমাত্র মান ০।') },
  ],
  pitfalls: [
    L('Using a plain prefix basis without positions: it answers only queries starting at 1.', 'অবস্থান ছাড়া সাধারণ প্রিফিক্স বেসিস: শুধু ১ থেকে শুরু কোয়েরির উত্তর দেয়।'),
    L('Swapping the vector but not its position (or the other way round): both must move together.', 'ভেক্টর অদলবদল কিন্তু অবস্থান নয় (বা উল্টোটা): দুটিকেই একসঙ্গে সরাতে হবে।'),
    L('Stopping after the first differing bit while inserting: after a swap the displaced vector must continue to be inserted.', 'ঢোকানোর সময় প্রথম ভিন্ন বিটে থেমে যাওয়া: অদলবদলের পর সরে যাওয়া ভেক্টরটিকে ঢোকানো চালিয়ে যেতে হবে।'),
  ],
  related: [
    { id: '660F', name: 'Bear and Bowling 4', why: L('Another offline divide and conquer with a structure merged at the midpoint.', 'আরেকটি অফলাইন ডিভাইড অ্যান্ড কনকার, মাঝখানে কাঠামো মেলানো।') },
    { id: '1213G', name: 'Path Queries', why: L('Offline sorting by one end, a close relative of the prefix trick.', 'এক প্রান্তে অফলাইন সর্টিং, প্রিফিক্স কৌশলের ঘনিষ্ঠ আত্মীয়।') },
  ],
  toolkit: ['bitwise-and', 'sort'],
};

// ───────────────────────────────────────────── 848C
export const p848C: ProblemEntry = {
  id: '848C',
  contestId: 848,
  index: 'C',
  name: 'Goodbye Souvenir Protocol',
  rating: 2600,
  tags: ['data-structures', 'divide-and-conquer'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'The “sum of last − first per value” turns into a sum over consecutive equal pairs (prev → i) — points in the plane. Updates change a few points over time, so queries become three-dimensional: time, prev and index. Offline divide and conquer over time (CDQ) is the standard weapon.',
    '“প্রতি মানের (শেষ − প্রথম)-এর যোগফল” হয়ে যায় পরপর সমান জোড়া (prev → i)-এর যোগফল — সমতলে বিন্দু। আপডেট সময়ের সঙ্গে কয়েকটি বিন্দু বদলায়, তাই কোয়েরি ত্রিমাত্রিক: সময়, prev আর সূচক। সময়ের ওপর অফলাইন ডিভাইড অ্যান্ড কনকার (CDQ) মান অস্ত্র।',
  ),
  statement: L(
    'An array of n integers receives q operations. Type 1 p x: set aₚ = x. Type 2 l r: for every value that occurs in a[l..r], take (last position − first position) of its occurrences inside the range; print the sum over all values.',
    'n টি পূর্ণসংখ্যার অ্যারেতে q টি অপারেশন। ধরন ১ p x: aₚ = x করো। ধরন ২ l r: a[l..r]-এ যত মান আছে, প্রতিটির জন্য পরিসরের ভেতরে তার (শেষ অবস্থান − প্রথম অবস্থান) নাও; সব মানের যোগফল প্রিন্ট করো।',
  ),
  input: L('n q, the array, then q operations.', 'n q, অ্যারে, তারপর q টি অপারেশন।'),
  output: L('One number per type 2 operation.', 'ধরন ২-এর প্রতিটি অপারেশনের জন্য একটি সংখ্যা।'),
  limits: { timeSec: 6, memoryMb: 256, notes: [L('1 ≤ n, q ≤ 2·10⁵, 1 ≤ aᵢ, x ≤ 2·10⁵', '১ ≤ n, q ≤ ২·১০⁵, ১ ≤ aᵢ, x ≤ ২·১০⁵')] },
  samples: [
    { input: '3 1\n1 2 1\n2 1 3', output: '2', explain: L('Value 1 occurs at positions 1 and 3: last − first = 2; value 2 occurs once.', 'মান ১ অবস্থান ১ আর ৩-এ: শেষ − প্রথম = ২; মান ২ একবার।') },
  ],
  observation: L(
    'For each position i let prev(i) be the previous position holding the same value. Then (last − first) of a value inside [l, r] equals the sum of (i − prev(i)) over the consecutive pairs with l ≤ prev(i) and i ≤ r. So a query is a sum of weights of points (prev(i), i) in the region x ≥ l, y ≤ r. A type 1 operation removes and adds at most six such points. Offline, an event list in time order and CDQ over time: points from the left half contribute to queries of the right half, sorted by x and summed with a Fenwick tree over y.',
    'প্রতিটি অবস্থান i-র জন্য prev(i) = একই মান ধরা আগের অবস্থান। তখন [l, r]-এ একটি মানের (শেষ − প্রথম) = l ≤ prev(i) আর i ≤ r এমন পরপর জোড়ার (i − prev(i))-এর যোগফল। তাই কোয়েরি = অঞ্চল x ≥ l, y ≤ r-এর বিন্দু (prev(i), i)-র ওজনের যোগফল। ধরন ১ অপারেশন সর্বোচ্চ ছয়টি এমন বিন্দু বাদ ও যোগ করে। অফলাইনে সময়ক্রমে ইভেন্ট তালিকা আর সময়ের ওপর CDQ: বাম অর্ধের বিন্দু ডান অর্ধের কোয়েরিতে অবদান রাখে, x অনুযায়ী সর্ট করে y-র ওপর ফেনউইক ট্রি দিয়ে যোগ।',
  ),
  approach: [
    L('Keep a set of positions per value; produce the events: initial points, then for every update the removal and insertion of the affected points, and every query.', 'প্রতি মানের জন্য অবস্থানের সেট রাখো; ইভেন্ট বানাও: শুরুর বিন্দু, তারপর প্রতি আপডেটে প্রভাবিত বিন্দুর বাদ ও যোগ, এবং প্রতিটি কোয়েরি।'),
    L('CDQ over the event index: solve both halves, then let every point of the left half be added to a Fenwick tree (keyed by y) before each query of the right half with x ≥ l, processing in decreasing x.', 'ইভেন্ট সূচকের ওপর CDQ: দুই অর্ধ সমাধান করো, তারপর ডান অর্ধের প্রতিটি কোয়েরির আগে x ≥ l বামের বিন্দুগুলো (y দিয়ে) ফেনউইক ট্রি-তে যোগ করো, x-এর নিচের ক্রমে।'),
    L('Print the accumulated query answers.', 'জমা হওয়া কোয়েরি-উত্তর প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'a = 1 2 1 and the query (1, 3)',
    steps: [
      { state: 'points: (1, 3) with weight 2', text: L('Only the value 1 repeats: prev(3) = 1.', 'শুধু মান ১ পুনরাবৃত্ত: prev(৩) = ১।') },
      { state: 'query x ≥ 1, y ≤ 3', text: L('Contains the point: answer 2.', 'বিন্দুটি আছে: উত্তর ২।') },
    ],
  },
  complexity: { time: 'O((n + q) log² n)', space: 'O(n + q)', why: L('N events, log N levels of recursion, a Fenwick operation each.', 'N টি ইভেন্ট, log N স্তর, প্রতিটিতে একটি ফেনউইক অপারেশন।') },
  solutions: [
    {
      id: 'cdq',
      kind: 'optimal',
      title: L('CDQ divide and conquer over time', 'সময়ের ওপর CDQ ডিভাইড অ্যান্ড কনকার'),
      idea: L('Dominance counting in (time, x, y) space.', '(সময়, x, y) স্থানে আধিপত্য-গণনা।'),
      explain: [L('Merge-sorting the events by x (descending, updates before queries on ties) inside the recursion removes the extra sorting log. Every Fenwick insertion made for a merge step is undone afterwards by inserting the negative weight.', 'রিকার্সনের ভেতরে ইভেন্টগুলো x অনুযায়ী (নিচের ক্রমে, সমান x-এ আপডেট আগে) মার্জ-সর্ট করলে বাড়তি সর্টিং-লগ যায়। প্রতিটি মার্জ ধাপের ফেনউইক ঢোকানো পরে ঋণাত্মক ওজন ঢুকিয়ে ফেরানো হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

struct Ev {
    int type;  // 0 = point update, 1 = query
    int x, y;  // point (prev, i)  or query (l, r)
    ll w;
    int id;
};

int n, q;
vector<Ev> ev;
vector<ll> ansv, bit_;
int NB;

void badd(int i, ll v) {
    for (; i <= NB; i += i & -i) bit_[i] += v;
}
ll bsum(int i) {
    ll s = 0;
    for (; i > 0; i -= i & -i) s += bit_[i];
    return s;
}

bool before(const Ev& a, const Ev& b) {  // sorted by x descending, updates first on ties
    if (a.x != b.x) return a.x > b.x;
    return a.type < b.type;
}

void cdq(int lo, int hi) {  // [lo, hi), leaves the range sorted by "before"
    if (hi - lo <= 1) return;
    int mid = (lo + hi) / 2;
    cdq(lo, mid), cdq(mid, hi);
    int i = lo, j = mid;
    vector<int> added;
    while (j < hi) {
        if (i < mid && !before(ev[j], ev[i])) {
            if (ev[i].type == 0) badd(ev[i].y, ev[i].w), added.push_back(i);
            i++;
        } else {
            if (ev[j].type == 1) ansv[ev[j].id] += bsum(ev[j].y);
            j++;
        }
    }
    for (int k : added) badd(ev[k].y, -ev[k].w);
    inplace_merge(ev.begin() + lo, ev.begin() + mid, ev.begin() + hi, before);
}

int main() {
    scanf("%d %d", &n, &q);
    NB = n + 2;
    bit_.assign(NB + 1, 0);
    vector<int> a(n + 1);
    const int V = 200001;
    vector<set<int>> pos(V + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]), pos[a[i]].insert(i);
    auto addPt = [&](int x, int y, ll sign) {
        if (x > 0 && y > 0) ev.push_back({0, x, y, sign * (y - x), -1});
    };
    for (int v = 1; v <= V; v++) {
        int prev = 0;
        for (int p : pos[v]) addPt(prev, p, 1), prev = p;
    }
    int qc = 0;
    for (int t = 0; t < q; t++) {
        int ty, x, y;
        scanf("%d %d %d", &ty, &x, &y);
        if (ty == 1) {
            int p = x, nv = y, ov = a[p];
            if (ov == nv) continue;
            {  // remove p from ov
                auto it = pos[ov].find(p);
                int pa = 0, nb = 0;
                if (it != pos[ov].begin()) pa = *prev(it);
                if (next(it) != pos[ov].end()) nb = *next(it);
                addPt(pa, p, -1), addPt(p, nb, -1);
                if (pa && nb) addPt(pa, nb, 1);
                pos[ov].erase(it);
            }
            {  // insert p into nv
                auto it = pos[nv].insert(p).first;
                int pa = 0, nb = 0;
                if (it != pos[nv].begin()) pa = *prev(it);
                if (next(it) != pos[nv].end()) nb = *next(it);
                if (pa && nb) addPt(pa, nb, -1);
                addPt(pa, p, 1), addPt(p, nb, 1);
            }
            a[p] = nv;
        } else {
            ev.push_back({1, x, y, 0, qc++});
        }
    }
    ansv.assign(qc, 0);
    cdq(0, ev.size());
    for (int i = 0; i < qc; i++) printf("%lld\n", ansv[i]);
    return 0;
}
`,
      time: 'O((n + q) log² n)',
      space: 'O(n + q)',
      accepted: true,
      toolkit: ['vector', 'set', 'long-long', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recompute every query from scratch', 'প্রতিটি কোয়েরি শুরু থেকে হিসাব'),
      idea: L('Apply the update, and for a query scan the range keeping first and last positions per value.', 'আপডেট প্রয়োগ করো, আর কোয়েরিতে পরিসর স্ক্যান করে প্রতি মানের প্রথম ও শেষ অবস্থান রাখো।'),
      explain: [L('O(n) per query: the definition applied literally. Reference for the event bookkeeping.', 'প্রতি কোয়েরিতে O(n): সংজ্ঞা অক্ষরে অক্ষরে প্রয়োগ। ইভেন্ট-হিসাবের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, q;
    scanf("%d %d", &n, &q);
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    while (q--) {
        int t, x, y;
        scanf("%d %d %d", &t, &x, &y);
        if (t == 1) a[x] = y;
        else {
            map<int, pair<int, int>> fl;
            for (int i = x; i <= y; i++) {
                if (!fl.count(a[i])) fl[a[i]] = {i, i};
                fl[a[i]].second = i;
            }
            ll s = 0;
            for (auto& kv : fl) s += kv.second.second - kv.second.first;
            printf("%lld\n", s);
        }
    }
    return 0;
}
`,
      time: 'O(n q log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['map', 'pair', 'long-long'],
    },
  ],
  tests: [
    { input: '3 1\n1 2 1\n2 1 3', output: '2', source: 'sample', note: sample(1) },
    { input: '5 4\n1 2 3 1 2\n2 1 5\n1 4 3\n2 1 5\n2 2 5', output: '6\n4\n4', source: 'own', note: L('Before the update 1 spans 3, 2 spans 3. After a₄ = 3 the array is 1 2 3 3 2: 2 spans 3 and 3 spans 1, total 4; the range 2…5 gives the same 4.', 'আপডেটের আগে ১ বিস্তার ৩, ২ বিস্তার ৩। a₄ = ৩ করার পর অ্যারে ১ ২ ৩ ৩ ২: ২ বিস্তার ৩ আর ৩ বিস্তার ১, মোট ৪; পরিসর ২…৫-ও একই ৪।') },
  ],
  pitfalls: [
    L('Forgetting to merge the neighbours when a position leaves a value’s set: the pair (prev, next) must be added back.', 'কোনো অবস্থান মানের সেট ছাড়লে প্রতিবেশীদের মেলাতে ভুলে যাওয়া: জোড়া (prev, next) ফেরত যোগ করতে হবে।'),
    L('Counting a point whose x is 0 (no previous occurrence): skip it, it contributes nothing.', 'x = ০ (আগে কোনো কপি নেই) বিন্দু গোনা: বাদ দাও, কিছু যোগ করে না।'),
    L('Skipping the undo of the Fenwick tree between recursion levels: stale values from one merge leak into the next.', 'রিকার্সন স্তরের মাঝে ফেনউইক ট্রি-র ফেরত না নেওয়া: এক মার্জের পুরোনো মান পরেরটিতে ঢুকে যায়।'),
  ],
  related: [
    { id: '1527E', name: 'Partition Array Into Segments', why: L('A cost made of gaps between equal elements, too.', 'এটিতেও সমান উপাদানের মাঝের ফাঁকের খরচ।') },
    { id: '1100F', name: 'Ivan and Burgers', why: L('Another offline divide and conquer over positions.', 'অবস্থানের ওপর আরেকটি অফলাইন ডিভাইড অ্যান্ড কনকার।') },
  ],
  toolkit: ['set', 'long-long'],
};
