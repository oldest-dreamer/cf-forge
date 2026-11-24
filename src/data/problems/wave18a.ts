import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const ours = L('This example is our own.', 'এই উদাহরণটি আমাদের নিজের তৈরি।');

// ───────────────────────────────────────────── 1198E
export const p1198E: ProblemEntry = {
  id: '1198E',
  contestId: 1198,
  index: 'E',
  name: 'Rectangle Painting 2',
  rating: 2500,
  tags: ['flows', 'graphs', 'matchings'],
  why: L(
    'A cost of min(h, w) looks like a geometry puzzle, but it hides a classic: only whole rows and whole columns ever matter, so the task is a minimum vertex cover, which the max-flow min-cut theorem solves. The grid is 10⁹ wide, so coordinate compression has to carry the lengths as capacities.',
    'min(h, w) খরচ দেখে জ্যামিতির ধাঁধা মনে হয়, কিন্তু ভেতরে লুকানো একটি ক্লাসিক: শুধু পুরো সারি আর পুরো কলামই কাজে লাগে, তাই কাজটি ন্যূনতম ভার্টেক্স কভার, যা ম্যাক্স-ফ্লো মিন-কাট উপপাদ্য সমাধান করে। গ্রিড ১০⁹ চওড়া, তাই কোঅর্ডিনেট কম্প্রেশনে দৈর্ঘ্যগুলোকে ক্যাপাসিটি করে নিতে হয়।',
  ),
  statement: L(
    'An n × n grid starts white, and m (possibly overlapping) rectangles are painted black. One operation picks any h × w rectangle and paints it white at cost min(h, w). Find the least total cost that makes the whole grid white.',
    'একটি n × n গ্রিড শুরুতে সাদা, তাতে m টি (একে অপরের ওপর পড়তে পারে এমন) আয়তক্ষেত্র কালো করা হয়েছে। এক অপারেশনে যেকোনো h × w আয়তক্ষেত্র বেছে খরচ min(h, w) দিয়ে সাদা করা যায়। পুরো গ্রিড সাদা করার ন্যূনতম মোট খরচ বের করো।',
  ),
  input: L('n m, then m lines x1 y1 x2 y2 (a black rectangle, x1 ≤ x2, y1 ≤ y2).', 'n m, তারপর m লাইনে x1 y1 x2 y2 (একটি কালো আয়তক্ষেত্র, x1 ≤ x2, y1 ≤ y2)।'),
  output: L('One integer: the minimum cost.', 'একটি পূর্ণসংখ্যা: ন্যূনতম খরচ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹, 0 ≤ m ≤ 50', '১ ≤ n ≤ ১০⁹, ০ ≤ m ≤ ৫০')] },
  samples: [
    { input: '10 2\n4 1 5 10\n1 4 10 5', output: '4', explain: L('The black cells form a plus sign with two thick arms, each 2 cells wide. Painting each arm as one 2 × 10 rectangle costs min(2, 10) = 2, so 4 in total, and nothing cheaper exists.', 'কালো ঘরগুলো দুটি মোটা বাহুর একটি যোগচিহ্ন, প্রতিটি ২ ঘর চওড়া। প্রতিটি বাহু একটি ২ × ১০ আয়তক্ষেত্র হিসেবে সাদা করলে খরচ min(২, ১০) = ২, মোট ৪, এর চেয়ে কমে হয় না।') },
    { input: '5 3\n1 1 3 3\n3 3 5 5\n2 4 2 4', output: '5', explain: L('Two 3 × 3 blocks share one corner cell and one extra cell sticks out. ' + ours.en, 'দুটি ৩ × ৩ ব্লক এক কোণার ঘর ভাগ করে আর একটি বাড়তি ঘর বেরিয়ে আছে। ' + ours.bn) },
  ],
  observation: L(
    'A rectangle h × w with h ≤ w costs h, and h separate 1 × w strips also cost 1 each, so h in total. Hence we never need anything but strips of width 1, each costing exactly 1. A strip can always be stretched across the whole row or column for free. So the task becomes: choose a set of rows and columns of minimum size such that every black cell lies in a chosen row or a chosen column. That is a minimum vertex cover of the bipartite graph with rows on one side, columns on the other, and an edge for every black cell.',
    'h ≤ w হলে h × w আয়তক্ষেত্রের খরচ h, আর h টি আলাদা ১ × w ফালির খরচও ১ করে, মোট h। তাই প্রস্থ ১-এর ফালি ছাড়া কিছু লাগে না, প্রতিটির খরচ ঠিক ১। ফালিকে বিনা খরচে পুরো সারি বা কলাম জুড়ে লম্বা করা যায়। অতএব কাজটি হলো: ন্যূনতম সংখ্যক সারি ও কলাম বাছো যাতে প্রতিটি কালো ঘর কোনো বাছা সারিতে বা বাছা কলামে পড়ে। এটি দ্বিপক্ষীয় গ্রাফের ন্যূনতম ভার্টেক্স কভার: এক পাশে সারি, অন্য পাশে কলাম, আর প্রতিটি কালো ঘরের জন্য একটি কিনারা।',
  ),
  approach: [
    L('Only the coordinates x1 and x2 + 1 (and y1, y2 + 1) of the rectangles change the colour pattern, so sort and deduplicate them. Between two consecutive values every row behaves identically, so the whole run is one “row group” whose weight is its length.', 'আয়তক্ষেত্রগুলোর x1, x2 + ১ (এবং y1, y2 + ১) কোঅর্ডিনেটেই শুধু রঙের ধরন বদলায়, তাই সেগুলো সাজিয়ে ডুপ্লিকেট বাদ দাও। পরপর দুটি মানের মাঝের সব সারি একই রকম, তাই পুরো ধারাটি একটি “সারি-গ্রুপ”, যার ওজন তার দৈর্ঘ্য।'),
    L('Do the same for columns. At most 100 row groups and 100 column groups remain.', 'কলামের জন্যও একই করো। বড়জোর ১০০টি সারি-গ্রুপ ও ১০০টি কলাম-গ্রুপ থাকে।'),
    L('Build a network: source → row group with capacity = its length, column group → sink with capacity = its length, and row group → column group with infinite capacity whenever that block of cells is black (inside some rectangle).', 'নেটওয়ার্ক বানাও: সোর্স → সারি-গ্রুপ (ক্যাপাসিটি = দৈর্ঘ্য), কলাম-গ্রুপ → সিঙ্ক (ক্যাপাসিটি = দৈর্ঘ্য), আর ওই ঘর-ব্লক কালো (কোনো আয়তক্ষেত্রের ভেতরে) হলে সারি-গ্রুপ → কলাম-গ্রুপ অসীম ক্যাপাসিটির কিনারা।'),
    L('The maximum flow equals the minimum cut, which equals the minimum weighted vertex cover. Print it.', 'ম্যাক্সিমাম ফ্লো = মিনিমাম কাট = ন্যূনতম ওজনযুক্ত ভার্টেক্স কভার। সেটিই প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '10 2\n4 1 5 10\n1 4 10 5',
    steps: [
      { state: 'x breakpoints 1, 4, 6, 11 → groups [1,3] [4,5] [6,10]', text: L('Rows split into three groups of lengths 3, 2 and 5. Columns split the same way.', 'সারি তিনটি গ্রুপে ভাগ হয়, দৈর্ঘ্য ৩, ২, ৫। কলামও একইভাবে ভাগ হয়।') },
      { state: 'black blocks: (row group 2, every column group) and (every row group, column group 2)', text: L('The two arms give five black blocks in a plus shape.', 'দুই বাহু যোগচিহ্ন আকারে পাঁচটি কালো ব্লক দেয়।') },
      { state: 'flow: 2 through the middle row group, 2 through the middle column group', text: L('Row group 2 can carry 2 and column group 2 can carry 2, and they together touch every black block. Maximum flow 4, which is also the cover {row group 2, column group 2} of weight 2 + 2.', 'সারি-গ্রুপ ২ বহন করতে পারে ২, কলাম-গ্রুপ ২ বহন করতে পারে ২, আর দুটি মিলে প্রতিটি কালো ব্লক ছোঁয়। ম্যাক্সিমাম ফ্লো ৪, যা কভার {সারি-গ্রুপ ২, কলাম-গ্রুপ ২}-এর ওজন ২ + ২।') },
    ],
  },
  complexity: { time: 'O(m³ + flow)', space: 'O(m²)', why: L('At most 100 groups per side and 100² block checks against 50 rectangles; Dinic on a graph with 200 vertices is instant.', 'প্রতি পাশে সর্বোচ্চ ১০০ গ্রুপ আর ৫০টি আয়তক্ষেত্রের বিপরীতে ১০০² ব্লক-পরীক্ষা; ২০০ শীর্ষের গ্রাফে Dinic মুহূর্তে শেষ হয়।') },
  solutions: [
    {
      id: 'flow',
      kind: 'optimal',
      title: L('Compressed coordinates + max flow (Dinic)', 'কম্প্রেসড কোঅর্ডিনেট + ম্যাক্স ফ্লো (Dinic)'),
      idea: L('Minimum weighted vertex cover of the row–column graph, found as a max flow.', 'সারি–কলাম গ্রাফের ন্যূনতম ওজনযুক্ত ভার্টেক্স কভার, ম্যাক্স ফ্লো হিসেবে বের করা।'),
      explain: [
        L('König’s theorem says the minimum vertex cover of a bipartite graph equals its maximum matching; with weights, the same statement is the max-flow min-cut theorem on the network source → left → right → sink. Infinite middle edges can never be cut, so a minimum cut only cuts source or sink edges, i.e. it picks whole row groups or column groups. That is exactly a cover.', 'König-এর উপপাদ্য: দ্বিপক্ষীয় গ্রাফের ন্যূনতম ভার্টেক্স কভার = সর্বোচ্চ ম্যাচিং; ওজনসহ একই কথা হলো সোর্স → বাঁ → ডান → সিঙ্ক নেটওয়ার্কে ম্যাক্স-ফ্লো মিন-কাট। মাঝের অসীম কিনারা কাটা যায় না, তাই মিনিমাম কাট শুধু সোর্স বা সিঙ্কের কিনারা কাটে, অর্থাৎ পুরো সারি-গ্রুপ বা কলাম-গ্রুপ বাছে। এটাই ঠিক একটি কভার।'),
        L('Capacities are lengths up to 10⁹, so use 64-bit integers, and use a very large value (not 10⁹) for “infinite”.', 'ক্যাপাসিটি ১০⁹ পর্যন্ত দৈর্ঘ্য, তাই ৬৪-বিট পূর্ণসংখ্যা নাও, আর “অসীম” হিসেবে অনেক বড় মান (১০⁹ নয়) ব্যবহার করো।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct MaxFlow {
    struct Edge { int to; ll cap; };
    vector<Edge> es;
    vector<vector<int>> g;
    vector<int> level, it;
    MaxFlow(int n) : g(n), level(n), it(n) {}
    void add(int a, int b, ll c) {
        g[a].push_back(es.size()); es.push_back({b, c});
        g[b].push_back(es.size()); es.push_back({a, 0});
    }
    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (int id : g[v])
                if (es[id].cap > 0 && level[es[id].to] < 0) {
                    level[es[id].to] = level[v] + 1;
                    q.push(es[id].to);
                }
        }
        return level[t] >= 0;
    }
    ll dfs(int v, int t, ll f) {
        if (v == t) return f;
        for (int& i = it[v]; i < (int)g[v].size(); i++) {
            int id = g[v][i], u = es[id].to;
            if (es[id].cap > 0 && level[u] == level[v] + 1) {
                ll d = dfs(u, t, min(f, es[id].cap));
                if (d > 0) { es[id].cap -= d; es[id ^ 1].cap += d; return d; }
            }
        }
        return 0;
    }
    ll run(int s, int t) {
        ll total = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while (ll f = dfs(s, t, LLONG_MAX)) total += f;
        }
        return total;
    }
};

int main() {
    ll n;
    int m;
    scanf("%lld %d", &n, &m);
    vector<array<ll, 4>> r(m);
    vector<ll> xs, ys;
    for (auto& q : r) {
        scanf("%lld %lld %lld %lld", &q[0], &q[1], &q[2], &q[3]);
        xs.push_back(q[0]); xs.push_back(q[2] + 1);
        ys.push_back(q[1]); ys.push_back(q[3] + 1);
    }
    sort(xs.begin(), xs.end()); xs.erase(unique(xs.begin(), xs.end()), xs.end());
    sort(ys.begin(), ys.end()); ys.erase(unique(ys.begin(), ys.end()), ys.end());
    int X = xs.size() - 1, Y = ys.size() - 1;
    int S = X + Y, T = X + Y + 1;
    MaxFlow mf(X + Y + 2);
    const ll INF = (ll)4e18;
    for (int i = 0; i < X; i++) mf.add(S, i, xs[i + 1] - xs[i]);
    for (int j = 0; j < Y; j++) mf.add(X + j, T, ys[j + 1] - ys[j]);
    for (int i = 0; i < X; i++)
        for (int j = 0; j < Y; j++) {
            bool black = false;
            for (auto& q : r)
                if (q[0] <= xs[i] && xs[i + 1] - 1 <= q[2] && q[1] <= ys[j] && ys[j + 1] - 1 <= q[3]) black = true;
            if (black) mf.add(i, X + j, INF);
        }
    printf("%lld\n", mf.run(S, T));
}
`,
      time: 'O(m³) for the block tests + Dinic on ≤ 200 vertices',
      space: 'O(m²)',
      accepted: true,
      toolkit: ['long-long', 'vector', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of rows and columns (tiny n only)', 'সারি আর কলামের সব উপসেট চেষ্টা (শুধু ছোট n)'),
      idea: L('Enumerate 2ⁿ row sets and 2ⁿ column sets, keep those that cover every black cell, take the cheapest.', 'সারির ২ⁿ আর কলামের ২ⁿ উপসেট ধরো, যারা প্রতিটি কালো ঘর ঢাকে তাদের মধ্যে সস্তাটি নাও।'),
      explain: [L('This is the observation turned into code, so it is also the reference for the stress test. It needs n tiny because it is 4ⁿ · n² work and paints the grid cell by cell.', 'এটি পর্যবেক্ষণটিকেই কোড করা, তাই স্ট্রেস টেস্টের রেফারেন্সও। কাজ ৪ⁿ · n² এবং ঘর ধরে ধরে আঁকে, তাই n খুব ছোট হতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> black(n, vector<int>(n, 0));
    for (int k = 0; k < m; k++) {
        int x1, y1, x2, y2;
        scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
        for (int x = x1; x <= x2; x++)
            for (int y = y1; y <= y2; y++) black[x - 1][y - 1] = 1;
    }
    int best = 2 * n;
    for (int rows = 0; rows < (1 << n); rows++)
        for (int cols = 0; cols < (1 << n); cols++) {
            int cost = __builtin_popcount(rows) + __builtin_popcount(cols);
            if (cost >= best) continue;
            bool ok = true;
            for (int x = 0; x < n && ok; x++)
                for (int y = 0; y < n; y++)
                    if (black[x][y] && !(rows >> x & 1) && !(cols >> y & 1)) { ok = false; break; }
            if (ok) best = cost;
        }
    printf("%d\n", best);
}
`,
      time: 'O(4ⁿ · n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['bitwise-and', 'popcount', 'vector'],
    },
  ],
  tests: [
    { input: '10 2\n4 1 5 10\n1 4 10 5', output: '4', source: 'sample', note: L('The plus sign.', 'যোগচিহ্ন।') },
    { input: '5 3\n1 1 3 3\n3 3 5 5\n2 4 2 4', output: '5', source: 'sample', note: L('Two blocks and a stray cell.', 'দুটি ব্লক আর একটি বিচ্ছিন্ন ঘর।') },
    { input: '1 1\n1 1 1 1', output: '1', source: 'own', note: L('The smallest non-empty grid.', 'সবচেয়ে ছোট অশূন্য গ্রিড।') },
    { input: '1000000000 1\n1 1 1000000000 1000000000', output: '1000000000', source: 'own', note: L('The whole huge grid is black: n strips are needed, and the answer needs 64-bit capacities only through the lengths.', 'পুরো বিশাল গ্রিড কালো: n টি ফালি লাগে; উত্তর বড় মান, তাই ৬৪-বিট দরকার।') },
    { input: '1000000000 2\n1 1 1 1000000000\n1 1 1000000000 1', output: '2', source: 'own', note: L('Two huge thin lines cost 1 each: row 1 and column 1.', 'দুটি বিশাল সরু রেখার খরচ ১ করে: সারি ১ আর কলাম ১।') },
    { input: '6 4\n1 1 2 6\n3 1 4 6\n5 1 6 2\n5 5 6 6', output: '6', source: 'own', note: L('Overlapping and adjacent rectangles.', 'একে অপরের ওপর পড়া ও লাগোয়া আয়তক্ষেত্র।') },
    { input: '7 3\n1 4 7 4\n4 1 4 7\n2 2 6 6', output: '6', source: 'own', note: L('A thin cross over a big square.', 'বড় বর্গের ওপর সরু ক্রস।') },
    { input: '3 2\n1 1 3 1\n1 1 3 1', output: '1', source: 'own', note: L('Duplicate rectangles must not be double counted.', 'একই আয়তক্ষেত্র দুবার থাকলেও দ্বিগুণ গোনা যাবে না।') },
  ],
  pitfalls: [
    L('Treating “cost min(h, w)” as a real choice between big rectangles: strips of width 1 are never worse.', '“খরচ min(h, w)”-কে বড় আয়তক্ষেত্রের মধ্যে সত্যিকারের পছন্দ ভাবা: প্রস্থ ১-এর ফালি কখনও খারাপ নয়।'),
    L('Forgetting x2 + 1 as a breakpoint, which merges the last row of a rectangle with the rows after it.', 'x2 + ১-কে ব্রেকপয়েন্ট না ধরা, ফলে আয়তক্ষেত্রের শেষ সারি তার পরের সারির সাথে মিশে যায়।'),
    L('Using 10⁹ as “infinity” on the middle edges: a cut of that size can compete with a real answer. Use 4·10¹⁸.', 'মাঝের কিনারায় ১০⁹-কে “অসীম” ধরা: ওই আকারের কাট আসল উত্তরের সাথে পাল্লা দিতে পারে। ৪·১০¹⁸ নাও।'),
    L('Summing lengths in 32-bit integers.', '৩২-বিট পূর্ণসংখ্যায় দৈর্ঘ্য যোগ করা।'),
  ],
  related: [
    { id: '1404E', name: 'Bricks', why: L('Another “grid hides a bipartite graph” problem: independent set via matching.', 'আরেকটি “গ্রিডের ভেতরে দ্বিপক্ষীয় গ্রাফ” সমস্যা: ম্যাচিং দিয়ে ইনডিপেন্ডেন্ট সেট।') },
    { id: '546E', name: 'Soldier and Traveling', why: L('A plain flow model to compare with.', 'তুলনার জন্য সরল একটি ফ্লো মডেল।') },
  ],
  toolkit: ['long-long', 'vector'],
};

// ───────────────────────────────────────────── 1404E
export const p1404E: ProblemEntry = {
  id: '1404E',
  contestId: 1404,
  index: 'E',
  name: 'Bricks',
  rating: 2800,
  tags: ['flows', 'graphs', 'matchings'],
  why: L(
    'Covering a shape with 1 × k and k × 1 bricks sounds like geometry or DP, but fewer bricks means more merged neighbours. Choosing which neighbours to merge, with the rule that a cell cannot be merged both horizontally and vertically, is a maximum independent set in a bipartite graph, solved by a matching.',
    '১ × k আর k × 1 ইট দিয়ে আকার ঢাকাকে জ্যামিতি বা DP মনে হয়, কিন্তু কম ইট মানে বেশি প্রতিবেশী জোড়া লাগানো। কোন প্রতিবেশীরা জোড়া লাগবে তা বাছা, এই নিয়মে যে একটি ঘর একই সাথে আড়াআড়ি ও লম্বালম্বি জোড়া লাগতে পারে না, দ্বিপক্ষীয় গ্রাফে ম্যাক্সিমাম ইনডিপেন্ডেন্ট সেট, যা ম্যাচিং দিয়ে হয়।',
  ),
  statement: L(
    'An n × m grid has some cells marked # (to be covered) and the rest . (must stay empty). Cover every # cell with bricks, each a horizontal 1 × k or vertical k × 1 strip (k ≥ 1) lying only on # cells, with no overlap. Print the smallest number of bricks.',
    'একটি n × m গ্রিডের কিছু ঘর # (ঢাকতে হবে), বাকিগুলো . (খালি থাকতে হবে)। প্রতিটি # ঘর ইট দিয়ে ঢাকো; ইট হলো আড়াআড়ি ১ × k বা লম্বালম্বি k × ১ ফালি (k ≥ ১), শুধু # ঘরের ওপর, কোনো অধিক্রমণ নয়। ন্যূনতম ইটের সংখ্যা প্রিন্ট করো।',
  ),
  input: L('n m, then n lines of m characters (# or .).', 'n m, তারপর n লাইনে m অক্ষর (# বা .)।'),
  output: L('One integer: the minimum number of bricks.', 'একটি পূর্ণসংখ্যা: ন্যূনতম ইটের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 200', '১ ≤ n, m ≤ ২০০')] },
  samples: [
    { input: '3 3\n###\n#.#\n###', output: '4', explain: L('A ring of 8 cells: one brick for the top row, one for the bottom row and one single cell each for the left and right middle cells, 4 bricks. ' + ours.en, '৮ ঘরের একটি বলয়: ওপরের সারির জন্য একটি ইট, নিচের সারির জন্য একটি, আর বাঁ-ডানের মাঝের দুই ঘরের জন্য একটি করে ঘর, মোট ৪ ইট। ' + ours.bn) },
    { input: '3 3\n.#.\n###\n.#.', output: '3', explain: L('A plus sign: the middle row is one brick, and the top and bottom cells are single bricks. The middle column cannot also be one brick, because the centre belongs to only one brick. ' + ours.en, 'যোগচিহ্ন: মাঝের সারি একটি ইট, ওপর ও নিচের ঘর দুটি আলাদা ইট। মাঝের কলামও একটি ইট হতে পারে না, কারণ কেন্দ্রের ঘর মাত্র একটি ইটের। ' + ours.bn) },
  ],
  observation: L(
    'Bricks = cells − (number of adjacent # pairs that share a brick). Call such a pair a joint, horizontal or vertical. A set of joints is realisable exactly when no cell has both a horizontal joint and a vertical joint touching it, because a brick is straight. So build a graph whose vertices are all possible joints and whose edges connect a horizontal joint with a vertical joint that share a cell. We want the largest set of joints with no edge between them, a maximum independent set. The graph is bipartite (horizontal vs vertical), so it equals (number of joints) − (maximum matching).',
    'ইট = ঘর − (একই ইটে থাকা পাশাপাশি # জোড়ার সংখ্যা)। এমন জোড়াকে বলি জয়েন্ট, আড়াআড়ি বা লম্বালম্বি। একগুচ্ছ জয়েন্ট তখনই তৈরি করা যায় যখন কোনো ঘরকে একসাথে একটি আড়াআড়ি ও একটি লম্বালম্বি জয়েন্ট ছোঁয় না, কারণ ইট সোজা। তাই গ্রাফ বানাও যার শীর্ষ সব সম্ভাব্য জয়েন্ট আর কিনারা এমন আড়াআড়ি ও লম্বালম্বি জয়েন্টের মধ্যে যারা একটি ঘর ভাগ করে। আমরা চাই কিনারাহীন সবচেয়ে বড় জয়েন্ট-সেট, অর্থাৎ ম্যাক্সিমাম ইনডিপেন্ডেন্ট সেট। গ্রাফ দ্বিপক্ষীয় (আড়াআড়ি বনাম লম্বালম্বি), তাই এটি (জয়েন্টের সংখ্যা) − (ম্যাক্সিমাম ম্যাচিং)।',
  ),
  approach: [
    L('Number every horizontal joint (cell and its right neighbour both #) and every vertical joint (cell and the one below). There are at most about 40 000 of each.', 'প্রতিটি আড়াআড়ি জয়েন্ট (ঘর ও তার ডানের ঘর দুটিই #) আর প্রতিটি লম্বালম্বি জয়েন্ট (ঘর ও তার নিচের ঘর) নম্বর দাও। প্রতিটি ধরনের সর্বোচ্চ প্রায় ৪০ ০০০টি।'),
    L('For every # cell, connect each horizontal joint touching it (the one to its left and the one to its right) with each vertical joint touching it (above and below). That is at most 4 edges per cell.', 'প্রতিটি # ঘরের জন্য তাকে ছোঁয়া প্রতিটি আড়াআড়ি জয়েন্ট (বাঁয়ের ও ডানের) আর প্রতিটি লম্বালম্বি জয়েন্ট (ওপরের ও নিচের) যুক্ত করো। প্রতি ঘরে সর্বোচ্চ ৪টি কিনারা।'),
    L('Run Hopcroft–Karp between the horizontal and vertical joints for a maximum matching M.', 'আড়াআড়ি ও লম্বালম্বি জয়েন্টের মধ্যে Hopcroft–Karp চালিয়ে ম্যাক্সিমাম ম্যাচিং M বের করো।'),
    L('The largest consistent set of joints has H + V − M members, so the answer is cells − (H + V − M).', 'সবচেয়ে বড় সামঞ্জস্যপূর্ণ জয়েন্ট-সেটে H + V − M টি সদস্য, তাই উত্তর ঘর − (H + V − M)।'),
  ],
  walkthrough: {
    input: '3 3\n.#.\n###\n.#.',
    steps: [
      { state: 'cells = 5; H joints: 2 (in the middle row); V joints: 2 (in the middle column)', text: L('The plus has two horizontal and two vertical adjacent pairs.', 'যোগচিহ্নে দুটি আড়াআড়ি ও দুটি লম্বালম্বি পাশাপাশি জোড়া।') },
      { state: 'every H joint touches the centre, and so does every V joint', text: L('Each horizontal joint conflicts with both vertical joints: a complete bipartite graph K₂,₂.', 'প্রতিটি আড়াআড়ি জয়েন্ট দুটি লম্বালম্বি জয়েন্টের সাথেই বিরোধী: সম্পূর্ণ দ্বিপক্ষীয় গ্রাফ K₂,₂।') },
      { state: 'maximum matching M = 2, independent set = 2 + 2 − 2 = 2', text: L('Keep both horizontal joints (or both vertical). Bricks = 5 − 2 = 3.', 'দুটি আড়াআড়ি জয়েন্টই রাখো (বা দুটি লম্বালম্বিই)। ইট = ৫ − ২ = ৩।') },
    ],
  },
  complexity: { time: 'O(nm · √(nm))', space: 'O(nm)', why: L('Hopcroft–Karp on about 80 000 vertices and 160 000 edges.', 'প্রায় ৮০ ০০০ শীর্ষ ও ১ ৬০ ০০০ কিনারার গ্রাফে Hopcroft–Karp।') },
  solutions: [
    {
      id: 'matching',
      kind: 'optimal',
      title: L('Joints as vertices, maximum independent set by Hopcroft–Karp', 'জয়েন্টকে শীর্ষ ধরে Hopcroft–Karp দিয়ে ম্যাক্সিমাম ইনডিপেন্ডেন্ট সেট'),
      idea: L('Answer = cells − (H + V − maximum matching).', 'উত্তর = ঘর − (H + V − ম্যাক্সিমাম ম্যাচিং)।'),
      explain: [
        L('A set of joints is valid exactly when it contains no horizontal and vertical joint at a common cell, and the bricks are then the maximal straight runs of chosen joints. The number of bricks is cells minus chosen joints, so we maximise the chosen joints.', 'জয়েন্টের একটি সেট তখনই বৈধ যখন তাতে কোনো সাধারণ ঘরে আড়াআড়ি ও লম্বালম্বি জয়েন্ট একসাথে নেই, আর তখন ইটগুলো হলো বাছা জয়েন্টের সর্বোচ্চ সোজা ধারা। ইটের সংখ্যা = ঘর − বাছা জয়েন্ট, তাই বাছা জয়েন্ট সর্বাধিক করি।'),
        L('In a bipartite graph the largest independent set has size |V| − (maximum matching), by König’s theorem. The DFS inside Hopcroft–Karp is recursive but only as deep as an alternating path, which stays far below the stack limit here.', 'দ্বিপক্ষীয় গ্রাফে König-এর উপপাদ্য অনুযায়ী সবচেয়ে বড় ইনডিপেন্ডেন্ট সেটের আকার |V| − (ম্যাক্সিমাম ম্যাচিং)। Hopcroft–Karp-এর ভেতরের DFS রিকার্সিভ, কিন্তু গভীরতা একটি অল্টারনেটিং পথের সমান, যা এখানে স্ট্যাক সীমার অনেক নিচে থাকে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<string> g(n);
    char buf[512];
    for (auto& row : g) { scanf("%s", buf); row = buf; }
    auto cell = [&](int i, int j) { return i >= 0 && j >= 0 && i < n && j < m && g[i][j] == '#'; };
    vector<vector<int>> hid(n, vector<int>(m, -1)), vid(n, vector<int>(m, -1));
    int H = 0, V = 0, cells = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (!cell(i, j)) continue;
            cells++;
            if (cell(i, j + 1)) hid[i][j] = H++;
            if (cell(i + 1, j)) vid[i][j] = V++;
        }
    vector<vector<int>> adj(H);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (!cell(i, j)) continue;
            int hs[2] = {j > 0 ? hid[i][j - 1] : -1, hid[i][j]};
            int vs[2] = {i > 0 ? vid[i - 1][j] : -1, vid[i][j]};
            for (int h : hs)
                for (int v : vs)
                    if (h >= 0 && v >= 0) adj[h].push_back(v);
        }
    vector<int> matchL(H, -1), matchR(V, -1), dist(H);
    auto bfs = [&]() {
        queue<int> q;
        bool found = false;
        for (int u = 0; u < H; u++) {
            if (matchL[u] < 0) { dist[u] = 0; q.push(u); }
            else dist[u] = -1;
        }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : adj[u]) {
                int w = matchR[v];
                if (w < 0) found = true;
                else if (dist[w] < 0) { dist[w] = dist[u] + 1; q.push(w); }
            }
        }
        return found;
    };
    function<bool(int)> dfs = [&](int u) {
        for (int v : adj[u]) {
            int w = matchR[v];
            if (w < 0 || (dist[w] == dist[u] + 1 && dfs(w))) {
                matchL[u] = v; matchR[v] = u;
                return true;
            }
        }
        dist[u] = -1;
        return false;
    };
    int matching = 0;
    while (bfs())
        for (int u = 0; u < H; u++)
            if (matchL[u] < 0 && dfs(u)) matching++;
    printf("%d\n", cells - (H + V - matching));
}
`,
      time: 'O(nm · √(nm))',
      space: 'O(nm)',
      accepted: true,
      toolkit: ['vector', 'io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Give every cell an orientation and count runs (tiny grids)', 'প্রতিটি ঘরকে একটি দিক দাও এবং ধারা গোনো (ছোট গ্রিড)'),
      idea: L('Try all 2^(cells) ways to say “this cell is part of a horizontal or a vertical brick”.', 'প্রতিটি ঘর “আড়াআড়ি না লম্বালম্বি ইটের অংশ” তা বলার সব ২^(ঘর) উপায় চেষ্টা করো।'),
      explain: [L('Once orientations are fixed, a horizontal cell starts a new brick unless the cell to its left is also horizontal, and a vertical cell starts a new brick unless the cell above is vertical. Every real tiling arises from some orientation, so the minimum over all of them is exact. It is exponential, so only tiny grids can use it.', 'দিক ঠিক হয়ে গেলে একটি আড়াআড়ি ঘর নতুন ইট শুরু করে, যদি না তার বাঁয়ের ঘরও আড়াআড়ি হয়; আর লম্বালম্বি ঘর নতুন ইট শুরু করে, যদি না ওপরের ঘরও লম্বালম্বি হয়। প্রতিটি আসল টাইলিং কোনো না কোনো দিক-নির্ধারণ থেকে আসে, তাই সবগুলোর ন্যূনতম নির্ভুল। এটি এক্সপোনেনশিয়াল, তাই শুধু ছোট গ্রিডে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<string> g(n);
    char buf[512];
    for (auto& row : g) { scanf("%s", buf); row = buf; }
    vector<pair<int, int>> cells;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == '#') cells.push_back({i, j});
    int k = cells.size(), best = k;
    for (int mask = 0; mask < (1 << k); mask++) {
        vector<vector<int>> dir(n, vector<int>(m, -1));
        for (int t = 0; t < k; t++) dir[cells[t].first][cells[t].second] = mask >> t & 1;
        int bricks = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                if (dir[i][j] < 0) continue;
                bool continues = dir[i][j] == 0 ? (j > 0 && dir[i][j - 1] == 0) : (i > 0 && dir[i - 1][j] == 1);
                if (!continues) bricks++;
            }
        best = min(best, bricks);
    }
    printf("%d\n", best);
}
`,
      time: 'O(2^(cells) · nm)',
      space: 'O(nm)',
      accepted: false,
      toolkit: ['bit-shift', 'vector'],
    },
  ],
  tests: [
    { input: '3 3\n###\n#.#\n###', output: '4', source: 'sample', note: L('A ring.', 'একটি বলয়।') },
    { input: '3 3\n.#.\n###\n.#.', output: '3', source: 'sample', note: L('A plus sign: the centre decides.', 'যোগচিহ্ন: কেন্দ্রই সিদ্ধান্ত নেয়।') },
    { input: '2 3\n###\n###', output: '2', source: 'own', note: L('A full rectangle needs min(rows, columns) bricks.', 'পূর্ণ আয়তক্ষেত্রে min(সারি, কলাম) ইট লাগে।') },
    { input: '1 5\n#.##.', output: '2', source: 'own', note: L('A single row broken by an empty cell.', 'খালি ঘরে ভাঙা একটি সারি।') },
    { input: '4 4\n####\n#..#\n#..#\n####', output: '4', source: 'own', note: L('A bigger ring.', 'আরও বড় বলয়।') },
    { input: '2 2\n..\n..', output: '0', source: 'own', note: L('No # cells at all.', 'একটিও # নেই।') },
    { input: '5 5\n#####\n#####\n#####\n#####\n#####', output: '5', source: 'own', note: L('A full square.', 'পূর্ণ বর্গ।') },
  ],
  pitfalls: [
    L('Counting the bricks directly with a greedy: choosing horizontal first can be wrong, as the plus sign shows only when you look at the whole shape.', 'গ্রিডি দিয়ে সরাসরি ইট গোনা: আগে আড়াআড়ি বাছা ভুল হতে পারে, যা পুরো আকার দেখলেই বোঝা যায়।'),
    L('Making edges between ALL joints of a cell: two horizontal joints at one cell (left and right) do not conflict, they just form a longer brick.', 'একটি ঘরের সব জয়েন্টের মধ্যে কিনারা টানা: একই ঘরের বাঁ ও ডান আড়াআড়ি জয়েন্ট বিরোধী নয়, তারা শুধু লম্বা ইট বানায়।'),
    L('Plain Kuhn’s algorithm on 80 000 vertices can be too slow; use Hopcroft–Karp or Dinic.', '৮০ ০০০ শীর্ষে সাধারণ Kuhn অ্যালগরিদম ধীর হতে পারে; Hopcroft–Karp বা Dinic নাও।'),
    L('Mixing up the sides: only horizontal–vertical pairs are edges, so the graph really is bipartite.', 'পক্ষ গুলিয়ে ফেলা: শুধু আড়াআড়ি–লম্বালম্বি জোড়াই কিনারা, তাই গ্রাফ সত্যিই দ্বিপক্ষীয়।'),
  ],
  related: [
    { id: '1198E', name: 'Rectangle Painting 2', why: L('Vertex cover on a row–column graph, with weights.', 'সারি–কলাম গ্রাফে ওজনসহ ভার্টেক্স কভার।') },
    { id: '1525D', name: 'Armchairs', why: L('A smaller matching-flavoured problem to warm up.', 'ওয়ার্ম-আপের জন্য ছোট ম্যাচিং-স্বাদের সমস্যা।') },
  ],
  toolkit: ['vector', 'io-basics'],
};

// ───────────────────────────────────────────── 277E
export const p277E: ProblemEntry = {
  id: '277E',
  contestId: 277,
  index: 'E',
  name: 'Binary Tree on Plane',
  rating: 2400,
  tags: ['flows', 'geometry', 'trees'],
  why: L(
    'Every non-root point needs exactly one parent above it, and no point may have more than two children. That is an assignment problem with capacity 2 on one side, so min-cost flow (or the Hungarian algorithm) builds the cheapest tree, and infeasibility shows up as a flow that is too small.',
    'রুট বাদে প্রতিটি বিন্দুর ঠিক একটি বাবা লাগে যে তার ওপরে, আর কারও দুইয়ের বেশি সন্তান নেই। এটি এমন অ্যাসাইনমেন্ট সমস্যা যার একপাশে ক্যাপাসিটি ২, তাই মিন-কস্ট ফ্লো (বা Hungarian অ্যালগরিদম) সবচেয়ে সস্তা গাছ বানায়, আর অসম্ভব হলে ফ্লো ছোট থেকে যায়।',
  ),
  statement: L(
    'n distinct points are given on the plane. Join them into a rooted binary tree: every point except the root gets exactly one parent, a parent has at most two children, and each arc must go strictly downward (the parent has a larger y than the child). The cost of an arc is the Euclidean distance between its ends. Print the smallest total length, or -1 if no such tree exists.',
    'সমতলে n টি ভিন্ন বিন্দু দেওয়া আছে। এগুলোকে একটি মূলযুক্ত বাইনারি গাছে জোড়ো: রুট বাদে প্রতিটি বিন্দুর ঠিক একজন বাবা, বাবার সর্বোচ্চ দুইজন সন্তান, আর প্রতিটি চাপ কঠোরভাবে নিচের দিকে (বাবার y সন্তানের y-এর চেয়ে বড়)। চাপের খরচ দুই প্রান্তের ইউক্লিডীয় দূরত্ব। ন্যূনতম মোট দৈর্ঘ্য প্রিন্ট করো, এমন গাছ না থাকলে -১।',
  ),
  input: L('n, then n lines x y.', 'n, তারপর n লাইনে x y।'),
  output: L('The minimum total length (absolute or relative error up to 10⁻⁶), or -1.', 'ন্যূনতম মোট দৈর্ঘ্য (পরম বা আপেক্ষিক ত্রুটি ১০⁻⁶ পর্যন্ত), অথবা -১।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('2 ≤ n ≤ 400, |x|, |y| ≤ 1000, all points distinct', '২ ≤ n ≤ ৪০০, |x|, |y| ≤ ১০০০, সব বিন্দু ভিন্ন')] },
  samples: [
    { input: '3\n0 0\n1 1\n2 0', output: '2.828427125', explain: L('The top point (1, 1) is the root with two children, each at distance √2: 2√2 ≈ 2.828427. ' + ours.en, 'সবচেয়ে ওপরের বিন্দু (১, ১) রুট, তার দুই সন্তানের প্রতিটি √২ দূরে: ২√২ ≈ ২.৮২৮৪২৭। ' + ours.bn) },
    { input: '4\n0 1\n1 1\n0 0\n1 0', output: '-1', explain: L('Two points share the highest y, and neither can have a parent above it, so there are two roots. ' + ours.en, 'দুটি বিন্দুর y সবচেয়ে বেশি এবং একই; কারও ওপরে বাবা হওয়ার মতো বিন্দু নেই, তাই দুটি রুট হয়ে যায়। ' + ours.bn) },
  ],
  observation: L(
    'Only the topmost point can be the root, and it must be unique. Every other point picks one parent among the points strictly above it, and a point can be picked at most twice. That is a bipartite assignment: left side = children, right side = parents with capacity 2, cost = distance, and an arc exists only when the parent is higher. A full assignment of n − 1 children is automatically a tree, because following parents always climbs in y, so it cannot loop.',
    'শুধু সবচেয়ে ওপরের বিন্দুই রুট হতে পারে, এবং সেটি অবশ্যই একটি। বাকি প্রতিটি বিন্দু তার ঠিক ওপরের বিন্দুদের মধ্য থেকে একজন বাবা বাছে, আর একটি বিন্দু সর্বোচ্চ দুবার বাছা যায়। এটি দ্বিপক্ষীয় অ্যাসাইনমেন্ট: বাঁ পাশে সন্তান, ডান পাশে ক্যাপাসিটি ২-এর বাবা, খরচ = দূরত্ব, আর বাবা উঁচু হলেই শুধু চাপ। n − ১ সন্তানের পূর্ণ অ্যাসাইনমেন্টই নিজে থেকে গাছ, কারণ বাবা ধরে ধরে গেলে y সবসময় বাড়ে, তাই চক্র হয় না।',
  ),
  approach: [
    L('Build a network: source → parent copy i with capacity 2 and cost 0; parent copy i → child copy j with capacity 1 and cost dist(i, j) whenever y_i > y_j; child copy j → sink with capacity 1 and cost 0.', 'নেটওয়ার্ক বানাও: সোর্স → বাবা-কপি i (ক্যাপাসিটি ২, খরচ ০); y_i > y_j হলে বাবা-কপি i → সন্তান-কপি j (ক্যাপাসিটি ১, খরচ dist(i, j)); সন্তান-কপি j → সিঙ্ক (ক্যাপাসিটি ১, খরচ ০)।'),
    L('Push flow with successive shortest paths (SPFA, since residual edges have negative cost) until no augmenting path remains.', 'সাকসেসিভ শর্টেস্ট পাথ (SPFA, কারণ রেসিডুয়াল কিনারার খরচ ঋণাত্মক হয়) দিয়ে ফ্লো ঠেলো যতক্ষণ না বর্ধনশীল পথ শেষ হয়।'),
    L('If the flow is below n − 1, some point has no admissible parent: print -1. Otherwise print the total cost with 9 decimals.', 'ফ্লো n − ১-এর কম হলে কোনো বিন্দুর যোগ্য বাবা নেই: -১ প্রিন্ট করো। নইলে মোট খরচ ৯ দশমিক ঘর পর্যন্ত প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '3\n0 0\n1 1\n2 0',
    steps: [
      { state: 'arcs: (1,1) → (0,0) cost 1.414, (1,1) → (2,0) cost 1.414', text: L('Only the top point is higher than the other two; the two bottom points are level, so they cannot be parents of each other.', 'শুধু ওপরের বিন্দুটি অন্য দুটির চেয়ে উঁচু; নিচের দুটি সমান উচ্চতায়, তাই একে অপরের বাবা হতে পারে না।') },
      { state: 'flow 2, cost 2.828', text: L('Both children take the top point as parent. n − 1 = 2, so the tree exists and costs 2√2.', 'দুই সন্তানই ওপরের বিন্দুকে বাবা নেয়। n − ১ = ২, তাই গাছ আছে এবং খরচ ২√২।') },
    ],
  },
  complexity: { time: 'O(n · E · log) ≈ O(n³)', space: 'O(n²)', why: L('At most n − 1 augmentations, each an SPFA over about n²/2 arcs (80 000 for n = 400).', 'সর্বোচ্চ n − ১ বার বর্ধন, প্রতিটি প্রায় n²/২ চাপের (n = ৪০০-তে ৮০ ০০০) ওপর SPFA।') },
  solutions: [
    {
      id: 'mcmf',
      kind: 'optimal',
      title: L('Min-cost max-flow with doubles', 'ডাবল সহ মিন-কস্ট ম্যাক্স-ফ্লো'),
      idea: L('Parents have capacity 2, every child needs one unit of flow.', 'বাবার ক্যাপাসিটি ২, প্রতিটি সন্তানের এক একক ফ্লো দরকার।'),
      explain: [
        L('Successive shortest paths gives a minimum-cost flow of every value along the way, so the final flow is the cheapest among all maximum flows. Costs are real numbers; relaxing only when the distance drops by more than 10⁻⁹ stops floating-point noise from looping SPFA forever on zero-cost cycles.', 'সাকসেসিভ শর্টেস্ট পাথ পথে প্রতিটি মানের ন্যূনতম-খরচ ফ্লো দেয়, তাই শেষ ফ্লো সব ম্যাক্সিমাম ফ্লোর মধ্যে সস্তা। খরচ বাস্তব সংখ্যা; দূরত্ব ১০⁻⁹-এর বেশি কমলেই রিল্যাক্স করলে ফ্লোটিং-পয়েন্টের গোলমালে শূন্য-খরচ চক্রে SPFA অনন্তকাল ঘোরে না।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct Edge { int to, cap; double cost; };
vector<Edge> es;
vector<vector<int>> g;

void add(int a, int b, int cap, double cost) {
    g[a].push_back(es.size()); es.push_back({b, cap, cost});
    g[b].push_back(es.size()); es.push_back({a, 0, -cost});
}

int main() {
    int n;
    scanf("%d", &n);
    vector<int> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%d %d", &x[i], &y[i]);
    int S = 2 * n, T = 2 * n + 1;
    g.assign(2 * n + 2, {});
    for (int i = 0; i < n; i++) {
        add(S, i, 2, 0);
        add(n + i, T, 1, 0);
        for (int j = 0; j < n; j++)
            if (y[i] > y[j]) add(i, n + j, 1, hypot(x[i] - x[j], y[i] - y[j]));
    }
    int flow = 0;
    double total = 0;
    const double EPS = 1e-9;
    while (true) {
        vector<double> d(2 * n + 2, 1e18);
        vector<int> from(2 * n + 2, -1);
        vector<char> inq(2 * n + 2, 0);
        deque<int> q;
        d[S] = 0; q.push_back(S);
        while (!q.empty()) {
            int v = q.front(); q.pop_front();
            inq[v] = 0;
            for (int id : g[v])
                if (es[id].cap > 0 && d[v] + es[id].cost < d[es[id].to] - EPS) {
                    d[es[id].to] = d[v] + es[id].cost;
                    from[es[id].to] = id;
                    if (!inq[es[id].to]) { inq[es[id].to] = 1; q.push_back(es[id].to); }
                }
        }
        if (from[T] < 0) break;
        int v = T;
        while (v != S) {
            int id = from[v];
            es[id].cap -= 1;
            es[id ^ 1].cap += 1;
            v = es[id ^ 1].to;
        }
        flow++;
        total += d[T];
    }
    if (flow < n - 1) puts("-1");
    else printf("%.9f\n", total);
}
`,
      time: 'O(n · n² · k) SPFA',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['vector', 'io-basics'],
    },
    {
      id: 'hungarian',
      kind: 'alt',
      title: L('Hungarian algorithm on children × parent slots', 'সন্তান × বাবার-স্লটে Hungarian অ্যালগরিদম'),
      idea: L('Give every point two parent slots; assign each child to a distinct slot.', 'প্রতিটি বিন্দুকে দুটি বাবা-স্লট দাও; প্রতিটি সন্তানকে আলাদা স্লটে বসাও।'),
      explain: [
        L('Capacity 2 becomes two identical columns per point, so “each parent at most twice” turns into the plain rule that every column holds one child. The matrix has n − 1 rows (all points except the top one) and 2n columns, and forbidden pairs cost 10⁷. If the optimum uses any forbidden pair, no tree exists.', 'ক্যাপাসিটি ২ মানে প্রতি বিন্দুর জন্য দুটি একই কলাম, তাই “প্রতি বাবা সর্বোচ্চ দুবার” হয়ে যায় সাধারণ নিয়ম: প্রতি কলামে একজন সন্তান। ম্যাট্রিক্সে n − ১ সারি (ওপরের বিন্দু বাদে সব) ও ২n কলাম, নিষিদ্ধ জোড়ার খরচ ১০⁷। সর্বোত্তমে কোনো নিষিদ্ধ জোড়া এলে গাছ নেই।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%d %d", &x[i], &y[i]);
    int top = 0;
    for (int i = 1; i < n; i++)
        if (y[i] > y[top]) top = i;
    vector<int> kids;
    for (int i = 0; i < n; i++)
        if (i != top) kids.push_back(i);
    int R = kids.size(), C = 2 * n;
    const double BIG = 1e7;
    auto cost = [&](int r, int c) {
        int child = kids[r - 1], parent = (c - 1) / 2;
        if (y[parent] > y[child]) return hypot(x[parent] - x[child], y[parent] - y[child]);
        return BIG;
    };
    // Hungarian algorithm on an R x C matrix (R <= C), 1-indexed.
    vector<double> u(R + 1, 0), w(C + 1, 0);
    vector<int> p(C + 1, 0), way(C + 1, 0);
    for (int i = 1; i <= R; i++) {
        p[0] = i;
        int j0 = 0;
        vector<double> minv(C + 1, 1e18);
        vector<char> used(C + 1, 0);
        do {
            used[j0] = 1;
            int i0 = p[j0], j1 = 0;
            double delta = 1e18;
            for (int j = 1; j <= C; j++)
                if (!used[j]) {
                    double cur = cost(i0, j) - u[i0] - w[j];
                    if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
                    if (minv[j] < delta) { delta = minv[j]; j1 = j; }
                }
            for (int j = 0; j <= C; j++)
                if (used[j]) { u[p[j]] += delta; w[j] -= delta; }
                else minv[j] -= delta;
            j0 = j1;
        } while (p[j0] != 0);
        do {
            int j1 = way[j0];
            p[j0] = p[j1];
            j0 = j1;
        } while (j0);
    }
    double total = 0;
    bool bad = false;
    for (int j = 1; j <= C; j++)
        if (p[j]) {
            double c = cost(p[j], j);
            if (c >= BIG) bad = true;
            total += c;
        }
    if (bad) puts("-1");
    else printf("%.9f\n", total);
}
`,
      time: 'O(n² · 2n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Backtracking over parents (tiny n)', 'বাবা বেছে ব্যাকট্র্যাকিং (ছোট n)'),
      idea: L('Try every higher point with a free slot as the parent of each child.', 'প্রতিটি সন্তানের জন্য ফাঁকা স্লটসহ প্রতিটি উঁচু বিন্দুকে বাবা ধরে চেষ্টা করো।'),
      explain: [L('A branch-and-bound search: abandon a branch whose cost already reaches the best answer. It is exact but exponential, so it only checks small inputs.', 'ব্রাঞ্চ-অ্যান্ড-বাউন্ড: যে শাখার খরচ সেরা উত্তরে পৌঁছে গেছে তা ছেড়ে দাও। নির্ভুল কিন্তু এক্সপোনেনশিয়াল, তাই শুধু ছোট ইনপুট পরীক্ষা করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> x, y, kids;
vector<int> used;
double best = 1e18;

void go(int idx, double sum) {
    if (sum >= best) return;
    if (idx == (int)kids.size()) { best = sum; return; }
    int c = kids[idx];
    for (int p = 0; p < n; p++)
        if (y[p] > y[c] && used[p] < 2) {
            used[p]++;
            go(idx + 1, sum + hypot(x[p] - x[c], y[p] - y[c]));
            used[p]--;
        }
}

int main() {
    scanf("%d", &n);
    x.resize(n); y.resize(n); used.assign(n, 0);
    for (int i = 0; i < n; i++) scanf("%d %d", &x[i], &y[i]);
    int top = max_element(y.begin(), y.end()) - y.begin();
    if (count(y.begin(), y.end(), y[top]) > 1) { puts("-1"); return 0; }
    for (int i = 0; i < n; i++)
        if (i != top) kids.push_back(i);
    go(0, 0);
    if (best > 1e17) puts("-1");
    else printf("%.9f\n", best);
}
`,
      time: 'O(n^n) worst case',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3\n0 0\n1 1\n2 0', output: '2.828427125', source: 'sample', note: L('One root with two children.', 'এক রুট, দুই সন্তান।') },
    { input: '4\n0 1\n1 1\n0 0\n1 0', output: '-1', source: 'sample', note: L('Two points tie for the top.', 'ওপরের স্থানে দুটি বিন্দুর টাই।') },
    { input: '2\n0 0\n1 0', output: '-1', source: 'own', note: L('Two points at the same height cannot be linked.', 'সমান উচ্চতার দুই বিন্দু জোড়া যায় না।') },
    { input: '5\n0 3\n-1 2\n1 2\n-2 0\n2 0', output: '7.300563080', source: 'own', note: L('Two levels of children below a root.', 'রুটের নিচে দুই স্তরের সন্তান।') },
    { input: '4\n0 3\n0 2\n0 1\n0 0', output: '3.000000000', source: 'own', note: L('A vertical chain: every point has one child.', 'লম্বালম্বি শৃঙ্খল: প্রতি বিন্দুর একটি সন্তান।') },
    { input: '7\n0 3\n-2 2\n2 2\n-3 1\n-1 1\n1 1\n3 1', output: '10.128990204', source: 'own', note: L('A complete binary shape: capacity 2 is exactly enough.', 'সম্পূর্ণ বাইনারি আকার: ক্যাপাসিটি ২ ঠিক যথেষ্ট।') },
    { input: '2\n0 5\n0 -5', output: '10.000000000', source: 'own', note: L('The smallest possible tree.', 'সবচেয়ে ছোট সম্ভাব্য গাছ।') },
  ],
  pitfalls: [
    L('Forgetting the tie on the top: two points with the maximum y both lack a parent, so the answer is -1.', 'ওপরের টাই ভুলে যাওয়া: সর্বোচ্চ y-র দুটি বিন্দুর কারও বাবা নেই, তাই উত্তর -১।'),
    L('Allowing arcs between points of equal y: the rule is strictly downward.', 'সমান y-এর বিন্দুর মধ্যে চাপ অনুমতি দেওয়া: নিয়ম কঠোরভাবে নিচের দিকে।'),
    L('Comparing floating-point distances in SPFA with plain < : without an epsilon it can loop on rounding noise.', 'SPFA-তে ফ্লোটিং-পয়েন্ট দূরত্ব সাধারণ < দিয়ে তুলনা: ইপসিলন ছাড়া রাউন্ডিং গোলমালে ঘুরতে পারে।'),
    L('Printing -1.000000 when the flow is short: print the integer -1 exactly.', 'ফ্লো কম হলে -১.০০০০০০ প্রিন্ট করা: পূর্ণসংখ্যা -১ই প্রিন্ট করো।'),
  ],
  related: [
    { id: '546E', name: 'Soldier and Traveling', why: L('A flow where supplies move to demands.', 'যেখানে সরবরাহ চাহিদার দিকে যায় এমন ফ্লো।') },
    { id: '1139E', name: 'Maximize Mex', why: L('Matching on a bipartite graph again, now combined with a sweep.', 'আবার দ্বিপক্ষীয় গ্রাফে ম্যাচিং, এবার সুইপের সাথে।') },
  ],
  toolkit: ['vector', 'pair'],
};
