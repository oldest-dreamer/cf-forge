import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1594D: ProblemEntry = {
  id: '1594D',
  contestId: 1594,
  index: 'D',
  name: 'The Number of Imposters',
  rating: 1700,
  tags: ['constructive', 'dfs', 'dp', 'dsu', 'graphs'],
  why: L('DSU with parity: each comment says “same role” or “different role”, and each component splits into two sides.', 'জোড়-বিজোড়সহ DSU: প্রতিটি মন্তব্য বলে “একই ভূমিকা” বা “ভিন্ন ভূমিকা”, আর প্রতিটি উপাদান দুই দিকে ভাগ হয়।'),
  statement: L(
    'n players are crewmates (always truthful) or imposters (always lying). m comments “i j imposter/crewmate” say what i claims about j. Find the maximum possible number of imposters, or −1 if the comments contradict. There are t test cases.',
    'n-জন খেলোয়াড় ক্রুমেট (সবসময় সত্যবাদী) বা ইম্পোস্টার (সবসময় মিথ্যাবাদী)। m-টি মন্তব্য “i j imposter/crewmate” বলে i j সম্পর্কে কী দাবি করে। ইম্পোস্টারের সর্বোচ্চ সম্ভাব্য সংখ্যা বের করুন, মন্তব্য পরস্পরবিরোধী হলে −১। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n m and m comments.', 't; প্রতিটি টেস্টে n m আর m-টি মন্তব্য।'),
  output: L('The maximum number of imposters, or −1.', 'ইম্পোস্টারের সর্বোচ্চ সংখ্যা, অথবা −১।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, Σ m ≤ 5·10⁵', 'Σ n ≤ ২·১০⁵, Σ m ≤ ৫·১০⁵')] },
  samples: [{ input: '5\n3 2\n1 2 imposter\n2 3 crewmate\n5 4\n1 3 crewmate\n2 5 crewmate\n2 4 imposter\n3 4 imposter\n2 2\n1 2 imposter\n2 1 crewmate\n3 5\n1 2 imposter\n1 2 imposter\n3 2 crewmate\n3 2 crewmate\n1 3 imposter\n5 0', output: '2\n4\n-1\n2\n5', explain: L('Third test: 1 says 2 differs, 2 says 1 is the same: contradiction.', 'তৃতীয় টেস্ট: ১ বলে ২ ভিন্ন, ২ বলে ১ একই: বিরোধ।') }],
  observation: L('“i says j is an imposter” holds exactly when i and j have different roles (a truthful crewmate accuses an imposter; a lying imposter accuses a crewmate). “Crewmate” means same role. Each component is 2-coloured; pick the larger colour as imposters.', '“i বলে j ইম্পোস্টার” সত্য ঠিক তখনই যখন i আর j-এর ভূমিকা ভিন্ন (সত্যবাদী ক্রুমেট ইম্পোস্টারকে অভিযুক্ত করে; মিথ্যাবাদী ইম্পোস্টার ক্রুমেটকে)। “ক্রুমেট” মানে একই ভূমিকা। প্রতিটি উপাদান ২-রঙ করা হয়; বড় রঙটিকে ইম্পোস্টার বাছুন।'),
  approach: [L('Weighted DSU storing parity to the root; then per root count each parity and add the max.', 'মূল পর্যন্ত জোড়-বিজোড় রাখা ওজনযুক্ত DSU; তারপর প্রতি মূলে প্রতিটি জোড়-বিজোড় গুনে বড়টি যোগ।')],
  walkthrough: { input: 'test 1', steps: [{ state: '1 ≠ 2, 2 = 3', text: L('Sides {1} and {2, 3}: 2 imposters.', 'দিক {১} আর {২, ৩}: ২ জন ইম্পোস্টার।') }] },
  complexity: { time: 'O((n + m) α)', space: 'O(n)', why: L('One union per comment.', 'প্রতি মন্তব্যে একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'parity-dsu',
      kind: 'optimal',
      title: L('DSU with parity', 'জোড়-বিজোড়সহ DSU'),
      idea: L('d[x] = parity from x to its root.', 'd[x] = x থেকে মূল পর্যন্ত জোড়-বিজোড়।'),
      explain: [L('find returns the root and updates d[x] along the path. Joining x and y with required difference w sets d[ry] = d[x] ^ d[y] ^ w. A contradiction is a comment inside one set whose parities disagree.', 'find মূল ফেরত দেয় আর পথে d[x] হালনাগাদ করে। প্রয়োজনীয় পার্থক্য w দিয়ে x আর y যুক্ত করলে d[ry] = d[x] ^ d[y] ^ w। বিরোধ হলো এক সেটের ভেতরের এমন মন্তব্য যার জোড়-বিজোড় মেলে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par, d;

int find(int x) {
    if (par[x] == x) return x;
    int r = find(par[x]);
    d[x] ^= d[par[x]];
    return par[x] = r;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        par.resize(n + 1);
        iota(par.begin(), par.end(), 0);
        d.assign(n + 1, 0);
        bool ok = true;
        char word[16];
        for (int k = 0; k < m; k++) {
            int i, j;
            scanf("%d %d %s", &i, &j, word);
            int w = word[0] == 'i' ? 1 : 0;
            int ri = find(i), rj = find(j);
            if (ri == rj) { if ((d[i] ^ d[j]) != w) ok = false; }
            else { par[rj] = ri; d[rj] = d[i] ^ d[j] ^ w; }
        }
        if (!ok) { puts("-1"); continue; }
        vector<array<int, 2>> cnt(n + 1, {0, 0});
        for (int v = 1; v <= n; v++) { int r = find(v); cnt[r][d[v]]++; }
        long long best = 0;
        for (int v = 1; v <= n; v++) if (find(v) == v) best += max(cnt[v][0], cnt[v][1]);
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O((n + m) α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'bitwise-and'],
    },
    {
      id: 'bfs',
      kind: 'method',
      title: L('Weighted graph + BFS colouring', 'ওজনযুক্ত গ্রাফ + BFS রঙ'),
      idea: L('Edge weight 1 = different, 0 = same; colour each component.', 'প্রান্তের ওজন ১ = ভিন্ন, ০ = একই; প্রতিটি উপাদান রঙ করুন।'),
      explain: [L('colour[u] = colour[v] ^ w along every edge; a conflict means −1. The same idea as checking bipartiteness, generalised to “same” edges.', 'প্রতিটি প্রান্ত বরাবর colour[u] = colour[v] ^ w; সংঘাত মানে −১। বাইপার্টাইট যাচাইয়ের একই ধারণা, “একই” প্রান্তে সাধারণীকৃত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<pair<int, int>>> adj(n + 1);
        char word[16];
        for (int k = 0; k < m; k++) {
            int i, j;
            scanf("%d %d %s", &i, &j, word);
            int w = word[0] == 'i' ? 1 : 0;
            adj[i].push_back({j, w});
            adj[j].push_back({i, w});
        }
        vector<int> col(n + 1, -1);
        long long best = 0;
        bool ok = true;
        for (int s = 1; s <= n && ok; s++) {
            if (col[s] != -1) continue;
            int c[2] = {0, 0};
            queue<int> q;
            q.push(s);
            col[s] = 0;
            while (!q.empty() && ok) {
                int v = q.front();
                q.pop();
                c[col[v]]++;
                for (auto [u, w] : adj[v]) {
                    if (col[u] == -1) { col[u] = col[v] ^ w; q.push(u); }
                    else if (col[u] != (col[v] ^ w)) ok = false;
                }
            }
            best += max(c[0], c[1]);
        }
        printf("%lld\n", ok ? best : -1LL);
    }
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'pair'],
    },
  ],
  tests: [{ input: '5\n3 2\n1 2 imposter\n2 3 crewmate\n5 4\n1 3 crewmate\n2 5 crewmate\n2 4 imposter\n3 4 imposter\n2 2\n1 2 imposter\n2 1 crewmate\n3 5\n1 2 imposter\n1 2 imposter\n3 2 crewmate\n3 2 crewmate\n1 3 imposter\n5 0', output: '2\n4\n-1\n2\n5', source: 'sample', note: sample(1) }],
  pitfalls: [L('Treating “imposter” as a statement about j only.', '“imposter”-কে শুধু j সম্পর্কে বিবৃতি ধরা।')],
  related: [{ id: '1702E', name: 'Split Into Two Sets', why: L('2-colouring with DSU.', 'DSU দিয়ে ২-রঙ।') }],
  toolkit: ['functions'],
};

export const p1534C: ProblemEntry = {
  id: '1534C',
  contestId: 1534,
  index: 'C',
  name: "Little Alawn's Puzzle",
  rating: 1300,
  tags: ['combinatorics', 'dfs', 'dsu', 'graphs', 'math'],
  featuredFor: ['combinatorics'],
  why: L('Swapping one column forces a whole cycle of columns to swap: the answer is 2^(number of cycles).', 'একটি কলাম অদলবদল একটি পুরো কলাম-চক্রকে অদলবদলে বাধ্য করে: উত্তর ২^(চক্রের সংখ্যা)।'),
  statement: L('A 2 × n grid whose rows are permutations of 1 … n, with distinct numbers in each column. Columns may have their two numbers swapped, as long as both rows stay permutations. Count the reachable grids modulo 10⁹ + 7. There are t test cases.', 'একটি ২ × n গ্রিড যার সারিগুলো ১ … n-এর পারমুটেশন, প্রতিটি কলামে আলাদা সংখ্যা। কলামের দুটি সংখ্যা অদলবদল করা যায়, যতক্ষণ দুটি সারিই পারমুটেশন থাকে। পৌঁছানো যায় এমন গ্রিড ১০⁹ + ৭ মডুলো গুনুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the two rows.', 't; প্রতিটি টেস্টে n আর দুটি সারি।'),
  output: L('The count mod 10⁹ + 7.', 'গণনা mod ১০⁹ + ৭।'),
  limits: { timeSec: 2.5, memoryMb: 256, notes: [L('Σ n ≤ 4·10⁵', 'Σ n ≤ ৪·১০⁵')] },
  samples: [{ input: '2\n4\n1 4 2 3\n3 2 1 4\n8\n2 6 5 1 4 3 7 8\n3 8 7 5 1 2 4 6', output: '2\n8', explain: L('First grid: all columns form one cycle, so 2 choices.', 'প্রথম গ্রিড: সব কলাম একটি চক্র, তাই ২টি বিকল্প।') }],
  observation: L('Join value aᵢ with value bᵢ for every column. Every value has degree 2 (once in each row), so the graph is a union of cycles. Swapping one column of a cycle forces every column of that cycle to swap, and cycles are independent: 2^c configurations.', 'প্রতিটি কলামের জন্য মান aᵢ-কে মান bᵢ-এর সঙ্গে যুক্ত করুন। প্রতিটি মানের ডিগ্রি ২ (প্রতি সারিতে একবার), তাই গ্রাফ চক্রের সমষ্টি। একটি চক্রের একটি কলাম অদলবদল সেই চক্রের প্রতিটি কলামকে বাধ্য করে, আর চক্রগুলো স্বাধীন: ২^c বিন্যাস।'),
  approach: [L('DSU over values, count components, fast power.', 'মানের ওপর DSU, উপাদান গুনে দ্রুত পাওয়ার।')],
  walkthrough: { input: '1 4 2 3 / 3 2 1 4', steps: [{ state: '1–3, 4–2, 2–1, 3–4: one cycle', text: L('2¹ = 2.', '২¹ = ২।') }] },
  complexity: { time: 'O(n α)', space: 'O(n)', why: L('One union per column.', 'প্রতি কলামে একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Count cycles with a DSU', 'DSU দিয়ে চক্র গোনা'),
      idea: L('Each component is one cycle; multiply by 2 per component.', 'প্রতিটি উপাদান একটি চক্র; প্রতি উপাদানে ২ দিয়ে গুণ।'),
      explain: [L('“Independent binary choices multiply” is the basic counting rule; the graph shows which choices are tied together.', '“স্বাধীন দ্বিমুখী বিকল্প গুণ হয়” মৌলিক গণনার নিয়ম; গ্রাফ দেখায় কোন বিকল্পগুলো একসঙ্গে বাঁধা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;
vector<int> par;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n), b(n);
        for (auto& x : a) scanf("%d", &x);
        for (auto& x : b) scanf("%d", &x);
        par.resize(n + 1);
        iota(par.begin(), par.end(), 0);
        int comps = n;
        for (int i = 0; i < n; i++) {
            int x = find(a[i]), y = find(b[i]);
            if (x != y) { par[x] = y; comps--; }
        }
        long long ans = 1;
        for (int i = 0; i < comps; i++) ans = ans * 2 % MOD;
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'mod-arith'],
    },
    {
      id: 'permutation',
      kind: 'method',
      title: L('Cycles of a permutation', 'একটি পারমুটেশনের চক্র'),
      idea: L('pos[x] = column where x is on top; follow x → b[pos[x]].', 'pos[x] = যে কলামে x ওপরে; x → b[pos[x]] অনুসরণ।'),
      explain: [L('The graph is exactly the permutation σ(aᵢ) = bᵢ, so counting its cycles with a visited array is enough, and 2^c comes from fast exponentiation.', 'গ্রাফটি ঠিক পারমুটেশন σ(aᵢ) = bᵢ, তাই দেখা-অ্যারে দিয়ে এর চক্র গোনাই যথেষ্ট, আর ২^c আসে দ্রুত সূচক থেকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;

long long power(long long b, long long e) {
    long long r = 1;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n), b(n), sigma(n + 1);
        for (auto& x : a) scanf("%d", &x);
        for (auto& x : b) scanf("%d", &x);
        for (int i = 0; i < n; i++) sigma[a[i]] = b[i];
        vector<bool> seen(n + 1, false);
        int cycles = 0;
        for (int x = 1; x <= n; x++) {
            if (seen[x]) continue;
            cycles++;
            for (int y = x; !seen[y]; y = sigma[y]) seen[y] = true;
        }
        printf("%lld\n", power(2, cycles));
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-pow', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of swapped columns', 'অদলবদল কলামের প্রতিটি সেট চেষ্টা'),
      idea: L('2ⁿ subsets; count those keeping both rows permutations.', '২ⁿ সাবসেট; যেগুলো দুটি সারিকে পারমুটেশন রাখে তা গোনা।'),
      explain: [L('Exponential; it counts final grids directly (each subset gives a different grid, since columns hold distinct numbers).', 'সূচকীয়; এটি সরাসরি চূড়ান্ত গ্রিড গোনে (প্রতিটি সাবসেট আলাদা গ্রিড দেয়, কারণ কলামে আলাদা সংখ্যা)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n), b(n);
        for (auto& x : a) cin >> x;
        for (auto& x : b) cin >> x;
        if (n > 16) { cout << "\n"; continue; }
        long long cnt = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            vector<bool> top(n + 1, false);
            bool ok = true;
            for (int i = 0; i < n && ok; i++) {
                int x = mask >> i & 1 ? b[i] : a[i];
                if (top[x]) ok = false;
                top[x] = true;
            }
            if (ok) cnt++;
        }
        cout << cnt % 1000000007 << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [{ input: '2\n4\n1 4 2 3\n3 2 1 4\n8\n2 6 5 1 4 3 7 8\n3 8 7 5 1 2 4 6', output: '2\n8', source: 'sample', note: sample(1) }],
  pitfalls: [L('Counting columns instead of cycles.', 'চক্রের বদলে কলাম গোনা।')],
  related: [{ id: '1475E', name: 'Advertising Agency', why: L('Counting modulo a prime.', 'মৌলিক মডুলো গণনা।') }],
  toolkit: ['mod-arith'],
};

export const p1209D: ProblemEntry = {
  id: '1209D',
  contestId: 1209,
  index: 'D',
  name: 'Cow and Snacks',
  rating: 1700,
  tags: ['dfs', 'dsu', 'graphs'],
  why: L('Guests are edges between flavours; in a component with s flavours only s − 1 guests can be happy.', 'অতিথিরা স্বাদের মাঝে প্রান্ত; s স্বাদের একটি উপাদানে শুধু s − ১ জন অতিথি খুশি হতে পারে।'),
  statement: L('n snack flavours, one snack each. k guests each like two flavours; in your chosen order, each guest eats every remaining snack of their two flavours, and is sad if none remain. Minimise the number of sad guests.', 'n-টি স্ন্যাকের স্বাদ, প্রতিটির একটি স্ন্যাক। k-জন অতিথি প্রত্যেকে দুটি স্বাদ পছন্দ করে; আপনার বাছা ক্রমে প্রতিটি অতিথি তার দুটি স্বাদের বাকি সব স্ন্যাক খায়, আর কিছু না থাকলে দুঃখী হয়। দুঃখী অতিথির সংখ্যা সর্বনিম্ন করুন।'),
  input: L('n k, then k pairs.', 'n k, তারপর k-টি জোড়া।'),
  output: L('The minimum number of sad guests.', 'দুঃখী অতিথির সর্বনিম্ন সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, k ≤ 10⁵', 'n, k ≤ ১০⁵')] },
  samples: [
    { input: '5 4\n1 2\n4 3\n1 4\n3 4', output: '1', explain: L('Flavours 1–4 form one component with 4 guests: 3 happy.', 'স্বাদ ১–৪ ৪ জন অতিথিসহ একটি উপাদান: ৩ জন খুশি।') },
    { input: '6 5\n2 3\n2 1\n3 4\n6 5\n4 5', output: '0', explain: L('The guest graph is a forest: everyone is happy.', 'অতিথির গ্রাফ একটি বন: সবাই খুশি।') },
  ],
  observation: L('The first guest in a component eats two snacks, every later happy guest eats at least one new snack, so a component with s flavours has at most s − 1 happy guests. A BFS/DSU spanning tree order achieves exactly that. So sad guests = edges that close a cycle.', 'একটি উপাদানের প্রথম অতিথি দুটি স্ন্যাক খায়, পরের প্রতিটি খুশি অতিথি অন্তত একটি নতুন স্ন্যাক খায়, তাই s স্বাদের উপাদানে সর্বোচ্চ s − ১ জন খুশি। একটি BFS/DSU স্প্যানিং ট্রির ক্রম ঠিক সেটি অর্জন করে। তাই দুঃখী অতিথি = যেসব প্রান্ত চক্র বন্ধ করে।'),
  approach: [L('Count edges whose endpoints are already connected in a DSU.', 'DSU-তে আগেই সংযুক্ত প্রান্তবিন্দুর প্রান্ত গুনুন।')],
  walkthrough: { input: 'sample 1', steps: [{ state: '1–2, 4–3, 1–4 merge; 3–4 already connected', text: L('1 sad guest.', '১ জন দুঃখী অতিথি।') }] },
  complexity: { time: 'O((n + k) α)', space: 'O(n)', why: L('One union per guest.', 'প্রতি অতিথিতে একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Count cycle edges', 'চক্র প্রান্ত গোনা'),
      idea: L('sad = k − (n − components).', 'দুঃখী = k − (n − উপাদান)।'),
      explain: [L('An upper bound (s − 1 per component) matched by a construction (spanning tree order) is a complete proof; the DSU just counts.', 'একটি ঊর্ধ্বসীমা (প্রতি উপাদানে s − ১) আর তার সমান একটি গঠন (স্প্যানিং ট্রি ক্রম) একটি পূর্ণ প্রমাণ; DSU শুধু গোনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    par.resize(n + 1);
    iota(par.begin(), par.end(), 0);
    int sad = 0;
    for (int i = 0; i < k; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        x = find(x), y = find(y);
        if (x == y) sad++;
        else par[x] = y;
    }
    printf("%d\n", sad);
    return 0;
}
`,
      time: 'O((n + k) α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every order of guests', 'অতিথিদের প্রতিটি ক্রম চেষ্টা'),
      idea: L('next_permutation over guests and simulate.', 'অতিথিদের ওপর next_permutation আর সিমুলেশন।'),
      explain: [L('k! orders for tiny k. It proves the counting argument on random inputs.', 'ক্ষুদ্র k-এ k! ক্রম। এটি এলোমেলো ইনপুটে গণনার যুক্তি প্রমাণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<pair<int, int>> g(k);
    for (auto& [x, y] : g) cin >> x >> y;
    if (k > 8) { cout << "\n"; return 0; }
    vector<int> ord(k);
    iota(ord.begin(), ord.end(), 0);
    int best = INT_MAX;
    do {
        vector<bool> left(n + 1, true);
        int sad = 0;
        for (int i : ord) {
            auto [x, y] = g[i];
            if (!left[x] && !left[y]) sad++;
            left[x] = left[y] = false;
        }
        best = min(best, sad);
    } while (next_permutation(ord.begin(), ord.end()));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(k! · k)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['pair', 'min-max'],
    },
  ],
  tests: [
    { input: '5 4\n1 2\n4 3\n1 4\n3 4', output: '1', source: 'sample', note: sample(1) },
    { input: '6 5\n2 3\n2 1\n3 4\n6 5\n4 5', output: '0', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Simulating a greedy order without the cycle argument.', 'চক্রের যুক্তি ছাড়া গ্রিডি ক্রম সিমুলেশন।')],
  related: [{ id: '25D', name: 'Roads not only in Berland', why: L('Edges that close cycles.', 'চক্র বন্ধ করা প্রান্ত।') }],
  toolkit: ['functions'],
};

export const p1278D: ProblemEntry = {
  id: '1278D',
  contestId: 1278,
  index: 'D',
  name: 'Segment Tree',
  rating: 2100,
  tags: ['data-structures', 'dsu', 'graphs', 'trees'],
  why: L('A tree has exactly n − 1 edges, so stop counting crossing pairs as soon as there are n; a sweep with a set finds them.', 'একটি ট্রিতে ঠিক n − ১টি প্রান্ত, তাই n-টি হলেই ছেদকারী জোড়া গোনা বন্ধ; একটি set-সহ সুইপ সেগুলো খুঁজে পায়।'),
  statement: L('n segments with all 2n endpoints distinct. Two segments are joined if they intersect but neither contains the other. Is the resulting graph a tree?', 'n-টি অংশ যাদের ২n-টি প্রান্তবিন্দু সব আলাদা। দুটি অংশ যুক্ত যদি তারা ছেদ করে কিন্তু কেউ অন্যটিকে ধারণ করে না। ফলাফলের গ্রাফ কি একটি ট্রি?'),
  input: L('n, then n segments l r.', 'n, তারপর n-টি অংশ l r।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 4, memoryMb: 256, notes: [L('n ≤ 5·10⁵', 'n ≤ ৫·১০⁵')] },
  samples: [
    { input: '6\n9 12\n2 11\n1 3\n6 10\n5 7\n4 8', output: 'YES', explain: L('Exactly 5 crossing pairs, all connected.', 'ঠিক ৫টি ছেদকারী জোড়া, সব সংযুক্ত।') },
    { input: '5\n1 3\n2 4\n5 9\n6 8\n7 10', output: 'NO', explain: L('Not connected.', 'সংযুক্ত নয়।') },
    { input: '5\n5 8\n3 6\n2 9\n7 10\n1 4', output: 'NO', explain: L('A cycle appears.', 'একটি চক্র আসে।') },
  ],
  observation: L('Sweep segments by left end, keeping a set of open segments keyed by right end. A new segment [l, r] crosses exactly the open segments with right end in (l, r). Enumerate them; if the edge count ever reaches n, it cannot be a tree, so total work is O(n log n). Then check with a DSU that the n − 1 edges connect everything.', 'বাম প্রান্ত ধরে অংশ সুইপ করুন, ডান প্রান্তের কী দিয়ে খোলা অংশের একটি set রেখে। একটি নতুন অংশ [l, r] ঠিক সেসব খোলা অংশ ছেদ করে যাদের ডান প্রান্ত (l, r)-এ। এগুলো গণনা করুন; প্রান্তের সংখ্যা কখনো n-এ পৌঁছালে এটি ট্রি হতে পারে না, তাই মোট কাজ O(n log n)। তারপর DSU দিয়ে দেখুন n − ১টি প্রান্ত সবকিছু যুক্ত করে কি না।'),
  approach: [L('Events by coordinate; set of (r, id); early exit at n edges; DSU.', 'স্থানাঙ্ক ধরে ঘটনা; (r, id)-এর set; n প্রান্তে আগে থামা; DSU।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'edges: (1,3)–(2,4), (5,9)–(7,10), (6,8)–(7,10)', text: L('3 edges for 5 vertices: NO.', '৫ শীর্ষে ৩টি প্রান্ত: NO।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('At most n edges are ever listed.', 'সর্বোচ্চ n-টি প্রান্ত তালিকাভুক্ত হয়।') },
  solutions: [
    {
      id: 'sweep',
      kind: 'optimal',
      title: L('Sweep with a set, stop at n edges', 'set-সহ সুইপ, n প্রান্তে থামা'),
      idea: L('The early exit bounds the enumeration.', 'আগে থামা গণনা সীমিত করে।'),
      explain: [L('Output-sensitive enumeration: listing crossing pairs could be quadratic, but we only need to know whether there are exactly n − 1, so we stop at n.', 'আউটপুট-সংবেদনশীল গণনা: ছেদকারী জোড়া তালিকা বর্গীয় হতে পারত, কিন্তু আমাদের শুধু জানতে হবে ঠিক n − ১টি কি না, তাই n-এ থামি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }

int main() {
    int n;
    scanf("%d", &n);
    vector<int> l(n), r(n), at(2 * n + 1, -1);
    for (int i = 0; i < n; i++) { scanf("%d %d", &l[i], &r[i]); at[l[i]] = i; at[r[i]] = i; }
    par.resize(n);
    iota(par.begin(), par.end(), 0);
    set<pair<int, int>> open;  // (right end, id)
    long long edges = 0;
    bool ok = true;
    for (int x = 1; x <= 2 * n && ok; x++) {
        int i = at[x];
        if (x == r[i]) { open.erase({r[i], i}); continue; }
        for (auto it = open.begin(); it != open.end() && it->first < r[i]; ++it) {
            if (++edges >= n) { ok = false; break; }
            int a = find(i), b = find(it->second);
            if (a == b) { ok = false; break; }  // cycle
            par[a] = b;
        }
        open.insert({r[i], i});
    }
    if (ok && edges != n - 1) ok = false;
    puts(ok ? "YES" : "NO");
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set', 'pair', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every pair', 'প্রতিটি জোড়া যাচাই'),
      idea: L('O(n²) crossing test, then edge count and connectivity.', 'O(n²) ছেদ পরীক্ষা, তারপর প্রান্তের সংখ্যা আর সংযুক্ততা।'),
      explain: [L('Segments i, j cross iff lᵢ < lⱼ < rᵢ < rⱼ (or the symmetric case). A graph is a tree iff it has n − 1 edges and is connected.', 'অংশ i, j ছেদ করে ঠিক তখনই যখন lᵢ < lⱼ < rᵢ < rⱼ (বা প্রতিসম ক্ষেত্র)। একটি গ্রাফ ট্রি ঠিক তখনই যখন এতে n − ১টি প্রান্ত আর এটি সংযুক্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> l(n), r(n);
    for (int i = 0; i < n; i++) cin >> l[i] >> r[i];
    vector<int> p(n);
    iota(p.begin(), p.end(), 0);
    function<int(int)> f = [&](int x) { return p[x] == x ? x : p[x] = f(p[x]); };
    long long edges = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (l[i] < l[j] && l[j] < r[i] && r[i] < r[j]) { edges++; p[f(i)] = f(j); }
    int comps = 0;
    for (int i = 0; i < n; i++) if (f(i) == i) comps++;
    cout << (edges == n - 1 && comps == 1 ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '6\n9 12\n2 11\n1 3\n6 10\n5 7\n4 8', output: 'YES', source: 'sample', note: sample(1) },
    { input: '5\n1 3\n2 4\n5 9\n6 8\n7 10', output: 'NO', source: 'sample', note: sample(2) },
    { input: '5\n5 8\n3 6\n2 9\n7 10\n1 4', output: 'NO', source: 'sample', note: sample(3) },
    { input: '1\n1 2', output: 'YES', source: 'own', note: L('One vertex is a tree.', 'একটি শীর্ষ একটি ট্রি।') },
  ],
  pitfalls: [L('Enumerating all crossing pairs without the early exit (TLE).', 'আগে না থেমে সব ছেদকারী জোড়া গণনা (TLE)।'), L('Joining nested segments.', 'অন্তর্নিহিত অংশ যুক্ত করা।')],
  related: [{ id: '1209D', name: 'Cow and Snacks', why: L('Edges and cycles with a DSU.', 'DSU দিয়ে প্রান্ত আর চক্র।') }],
  toolkit: ['set'],
};

export const p2020D: ProblemEntry = {
  id: '2020D',
  contestId: 2020,
  index: 'D',
  name: 'Connect the Dots',
  rating: 1800,
  tags: ['brute-force', 'dp', 'dsu', 'graphs', 'math', 'trees'],
  why: L('Small step sizes: for each d ≤ 10, a difference array marks which points must link to the point d ahead.', 'ছোট ধাপের আকার: প্রতিটি d ≤ ১০-এর জন্য একটি পার্থক্য অ্যারে চিহ্নিত করে কোন বিন্দুকে d সামনের বিন্দুর সঙ্গে যুক্ত হতে হবে।'),
  statement: L('n points on a line. Each operation (a, d, k) connects a, a + d, …, a + k·d with arcs (d ≤ 10). After all m operations, count connected components. There are t test cases.', 'একটি রেখায় n-টি বিন্দু। প্রতিটি অপারেশন (a, d, k) a, a + d, …, a + k·d-কে চাপ দিয়ে যুক্ত করে (d ≤ ১০)। সব m-টি অপারেশনের পরে সংযুক্ত উপাদান গুনুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n m and m triples.', 't; প্রতিটি টেস্টে n m আর m-টি ত্রয়ী।'),
  output: L('The number of components.', 'উপাদানের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('Σ n, Σ m ≤ 2·10⁵, 1 ≤ d ≤ 10', 'Σ n, Σ m ≤ ২·১০⁵, ১ ≤ d ≤ ১০')] },
  samples: [{ input: '3\n10 2\n1 2 4\n2 2 4\n100 1\n19 2 4\n100 3\n1 2 5\n7 2 6\n17 2 31', output: '2\n96\n61', explain: L('First test: odd points form one component, even points another.', 'প্রথম টেস্ট: বিজোড় বিন্দু একটি উপাদান, জোড় বিন্দু আরেকটি।') }],
  observation: L('Linking consecutive points of each progression gives the same components. For a fixed d, point x must link to x + d iff some operation with step d covers x as a non-final point. A difference array along stride d counts this: +1 at a, −1 at a + k·d, then prefix-sum with step d.', 'প্রতিটি প্রগমনের পরপর বিন্দু যুক্ত করলে একই উপাদান হয়। নির্দিষ্ট d-তে বিন্দু x-কে x + d-এর সঙ্গে যুক্ত হতে হবে ঠিক তখনই যখন ধাপ d-এর কোনো অপারেশন x-কে অ-শেষ বিন্দু হিসেবে ঢাকে। d স্ট্রাইড বরাবর একটি পার্থক্য অ্যারে এটি গোনে: a-তে +১, a + k·d-তে −১, তারপর d ধাপে প্রিফিক্স সাম।'),
  approach: [L('10 difference arrays, then unions x ↔ x + d; count roots.', '১০টি পার্থক্য অ্যারে, তারপর ইউনিয়ন x ↔ x + d; মূল গুনুন।')],
  walkthrough: { input: '1 2 4', steps: [{ state: 'd = 2: cover[1], cover[3], cover[5], cover[7] = 1, cover[9] = 0', text: L('Unions 1–3, 3–5, 5–7, 7–9.', 'ইউনিয়ন ১–৩, ৩–৫, ৫–৭, ৭–৯।') }] },
  complexity: { time: 'O(10 · n α + m)', space: 'O(10 · n)', why: L('Ten strides.', 'দশটি স্ট্রাইড।') },
  solutions: [
    {
      id: 'stride-diff',
      kind: 'optimal',
      title: L('Difference arrays per step size', 'প্রতি ধাপের আকারে পার্থক্য অ্যারে'),
      idea: L('cover[d][x] = diff[d][x] + cover[d][x − d].', 'cover[d][x] = diff[d][x] + cover[d][x − d]।'),
      explain: [L('A difference array works along any arithmetic progression, not just consecutive indices. Small d lets us keep one array per step size.', 'একটি পার্থক্য অ্যারে শুধু পরপর ইনডেক্স নয়, যেকোনো সমান্তর প্রগমন বরাবর চলে। ছোট d প্রতি ধাপের আকারে একটি অ্যারে রাখতে দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<int>> diff(11, vector<int>(n + 2, 0));
        for (int i = 0; i < m; i++) {
            int a, d, k;
            scanf("%d %d %d", &a, &d, &k);
            if (k == 0) continue;
            diff[d][a]++;
            diff[d][a + k * d]--;
        }
        par.resize(n + 1);
        iota(par.begin(), par.end(), 0);
        int comps = n;
        for (int d = 1; d <= 10; d++) {
            vector<int>& c = diff[d];
            for (int x = 1; x <= n; x++) {
                if (x - d >= 1) c[x] += c[x - d];
                if (c[x] > 0 && x + d <= n) {
                    int a = find(x), b = find(x + d);
                    if (a != b) { par[a] = b; comps--; }
                }
            }
        }
        printf("%d\n", comps);
    }
    return 0;
}
`,
      time: 'O(10 · n α + m)',
      space: 'O(10 · n)',
      accepted: true,
      toolkit: ['prefix-sum', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Union every consecutive pair', 'প্রতিটি পরপর জোড়া ইউনিয়ন'),
      idea: L('For each operation, union a + i·d with a + (i + 1)·d.', 'প্রতিটি অপারেশনে a + i·d-কে a + (i + ১)·d-এর সঙ্গে ইউনিয়ন।'),
      explain: [L('Correct but Σ k can reach m · n, far too slow for the limits.', 'সঠিক কিন্তু Σ k m · n পর্যন্ত হতে পারে, সীমার জন্য অনেক ধীর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<int> p(n + 1);
        iota(p.begin(), p.end(), 0);
        function<int(int)> f = [&](int x) { return p[x] == x ? x : p[x] = f(p[x]); };
        for (int i = 0; i < m; i++) {
            int a, d, k;
            cin >> a >> d >> k;
            for (int j = 0; j < k; j++) p[f(a + j * d)] = f(a + (j + 1) * d);
        }
        int comps = 0;
        for (int v = 1; v <= n; v++) if (f(v) == v) comps++;
        cout << comps << "\n";
    }
    return 0;
}
`,
      time: 'O(Σ k · α)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [{ input: '3\n10 2\n1 2 4\n2 2 4\n100 1\n19 2 4\n100 3\n1 2 5\n7 2 6\n17 2 31', output: '2\n96\n61', source: 'sample', note: sample(1) }],
  pitfalls: [L('Linking the last point of a progression to the next one.', 'একটি প্রগমনের শেষ বিন্দুকে পরেরটির সঙ্গে যুক্ত করা।')],
  related: [{ id: '1534C', name: 'Little Alawn’s Puzzle', why: L('Counting components.', 'উপাদান গোনা।') }],
  toolkit: ['prefix-sum'],
};
