import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1433G: ProblemEntry = {
  id: '1433G',
  contestId: 1433,
  index: 'G',
  name: 'Reducing Delivery Cost',
  rating: 2100,
  tags: ['brute-force', 'graphs', 'shortest-paths'],
  why: L('All-pairs Dijkstra once; then a free edge (x, y) changes a route to min(d[a][b], d[a][x] + d[y][b], d[a][y] + d[x][b]).', 'একবার সব-জোড়া ডাইকস্ট্রা; তারপর একটি বিনামূল্যের প্রান্ত (x, y) একটি রুটকে min(d[a][b], d[a][x] + d[y][b], d[a][y] + d[x][b]) করে।'),
  statement: L('A weighted graph and k courier routes (a, b), each travelled along a shortest path. You may make exactly one road free (cost 0). Minimise the total cost of all routes.', 'একটি ওজনযুক্ত গ্রাফ আর k-টি কুরিয়ার রুট (a, b), প্রতিটি সবচেয়ে ছোট পথে যায়। ঠিক একটি রাস্তা বিনামূল্যে (খরচ ০) করা যায়। সব রুটের মোট খরচ সর্বনিম্ন করুন।'),
  input: L('n m k, the roads, then k routes.', 'n m k, রাস্তাগুলো, তারপর k-টি রুট।'),
  output: L('The minimum total cost.', 'সর্বনিম্ন মোট খরচ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m, k ≤ 1000', 'n, m, k ≤ ১০০০')] },
  samples: [
    { input: '6 5 2\n1 2 5\n2 3 7\n2 4 4\n4 5 2\n4 6 8\n1 6\n5 3', output: '22', explain: L('Make 2–4 or 4–6 free.', '২–৪ বা ৪–৬ বিনামূল্যে।') },
    { input: '5 5 4\n1 2 5\n2 3 4\n1 4 3\n4 3 7\n3 5 2\n1 5\n1 3\n3 3\n1 5', output: '13', explain: L('Make 4–3 free.', '৪–৩ বিনামূল্যে।') },
  ],
  observation: L('A route either ignores the free edge or uses it once, entering at x or at y. With all distances known, each (edge, route) pair is O(1): O(m · k) after n Dijkstras.', 'একটি রুট হয় বিনামূল্যের প্রান্ত উপেক্ষা করে নয়তো একবার ব্যবহার করে, x বা y দিয়ে ঢুকে। সব দূরত্ব জানা থাকলে প্রতিটি (প্রান্ত, রুট) জোড়া O(১): n-টি ডাইকস্ট্রার পরে O(m · k)।'),
  approach: [L('Dijkstra from every vertex; try every edge.', 'প্রতিটি শীর্ষ থেকে ডাইকস্ট্রা; প্রতিটি প্রান্ত চেষ্টা।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'edge 4–3 free', text: L('1→5: 3 + 0 + 2 = 5, 1→3: 3, 3→3: 0, 1→5: 5. Total 13.', '১→৫: ৩ + ০ + ২ = ৫, ১→৩: ৩, ৩→৩: ০, ১→৫: ৫। মোট ১৩।') }] },
  complexity: { time: 'O(n · m log n + m · k)', space: 'O(n²)', why: L('n Dijkstras and m · k checks.', 'n-টি ডাইকস্ট্রা আর m · k-টি যাচাই।') },
  solutions: [
    {
      id: 'all-pairs',
      kind: 'optimal',
      title: L('All-pairs Dijkstra + try each edge', 'সব-জোড়া ডাইকস্ট্রা + প্রতিটি প্রান্ত চেষ্টা'),
      idea: L('cost = Σ min(d[a][b], d[a][x] + d[y][b], d[a][y] + d[x][b]).', 'খরচ = Σ min(d[a][b], d[a][x] + d[y][b], d[a][y] + d[x][b])।'),
      explain: [L('n ≤ 1000 makes n Dijkstras (10⁶ · log) fine, and m · k = 10⁶ checks are cheap; this is the classic “precompute all distances, then try every modification” pattern.', 'n ≤ ১০০০-এ n-টি ডাইকস্ট্রা (১০⁶ · log) ঠিক, আর m · k = ১০⁶টি যাচাই সস্তা; এটি ক্লাসিক “সব দূরত্ব আগে হিসাব, তারপর প্রতিটি পরিবর্তন চেষ্টা” প্যাটার্ন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<array<int, 3>> e(m);
    vector<vector<pair<int, int>>> adj(n + 1);
    for (auto& [x, y, w] : e) {
        scanf("%d %d %d", &x, &y, &w);
        adj[x].push_back({y, w});
        adj[y].push_back({x, w});
    }
    vector<pair<int, int>> r(k);
    for (auto& [a, b] : r) scanf("%d %d", &a, &b);
    vector<vector<int>> d(n + 1, vector<int>(n + 1, INT_MAX));
    for (int s = 1; s <= n; s++) {
        auto& ds = d[s];
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        ds[s] = 0;
        pq.push({0, s});
        while (!pq.empty()) {
            auto [dv, v] = pq.top();
            pq.pop();
            if (dv != ds[v]) continue;
            for (auto [u, w] : adj[v]) if (dv + w < ds[u]) { ds[u] = dv + w; pq.push({ds[u], u}); }
        }
    }
    long long best = LLONG_MAX;
    for (auto [x, y, w] : e) {
        long long total = 0;
        for (auto [a, b] : r) total += min({d[a][b], d[a][x] + d[y][b], d[a][y] + d[x][b]});
        best = min(best, total);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n · m log n + m · k)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['priority-queue', 'min-max', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recompute shortest paths for each free edge', 'প্রতিটি বিনামূল্যের প্রান্তে সবচেয়ে ছোট পথ আবার হিসাব'),
      idea: L('Set the edge weight to 0 and run Floyd–Warshall.', 'প্রান্তের ওজন ০ করে ফ্লয়েড–ওয়ারশাল চালানো।'),
      explain: [L('O(m · n³): only for tiny graphs, but it uses no formula about how a route can use the free edge.', 'O(m · n³): শুধু ক্ষুদ্র গ্রাফে, কিন্তু একটি রুট কীভাবে বিনামূল্যের প্রান্ত ব্যবহার করতে পারে তার কোনো সূত্র ব্যবহার করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<array<long long, 3>> e(m);
    for (auto& [x, y, w] : e) cin >> x >> y >> w;
    vector<pair<int, int>> r(k);
    for (auto& [a, b] : r) cin >> a >> b;
    if (n > 30) { cout << "\n"; return 0; }
    long long best = LLONG_MAX;
    for (int f = 0; f < m; f++) {
        const long long INF = 1e15;
        vector<vector<long long>> d(n + 1, vector<long long>(n + 1, INF));
        for (int i = 1; i <= n; i++) d[i][i] = 0;
        for (int i = 0; i < m; i++) {
            auto [x, y, w] = e[i];
            long long c = i == f ? 0 : w;
            d[x][y] = min(d[x][y], c);
            d[y][x] = min(d[y][x], c);
        }
        for (int z = 1; z <= n; z++)
            for (int i = 1; i <= n; i++)
                for (int j = 1; j <= n; j++) d[i][j] = min(d[i][j], d[i][z] + d[z][j]);
        long long total = 0;
        for (auto [a, b] : r) total += d[a][b];
        best = min(best, total);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(m · n³)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['min-max'],
    },
  ],
  tests: [
    { input: '6 5 2\n1 2 5\n2 3 7\n2 4 4\n4 5 2\n4 6 8\n1 6\n5 3', output: '22', source: 'sample', note: sample(1) },
    { input: '5 5 4\n1 2 5\n2 3 4\n1 4 3\n4 3 7\n3 5 2\n1 5\n1 3\n3 3\n1 5', output: '13', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Re-running Dijkstra for every edge (m · n · m log n).', 'প্রতিটি প্রান্তে আবার ডাইকস্ট্রা (m · n · m log n)।')],
  related: [{ id: '1196F', name: 'K-th Path', why: L('All-pairs shortest paths.', 'সব-জোড়া সবচেয়ে ছোট পথ।') }],
  toolkit: ['priority-queue'],
};

export const p1473E: ProblemEntry = {
  id: '1473E',
  contestId: 1473,
  index: 'E',
  name: 'Minimum Path',
  rating: 2400,
  tags: ['graphs', 'shortest-paths'],
  why: L('Dijkstra on a layered graph: two flags record whether one edge was already subtracted and one doubled.', 'স্তরযুক্ত গ্রাফে ডাইকস্ট্রা: দুটি পতাকা লেখে একটি প্রান্ত আগে বিয়োগ আর একটি দ্বিগুণ হয়েছে কি না।'),
  statement: L('The weight of a path is (sum of its edges) − (its maximum edge) + (its minimum edge). For every vertex 2 … n, find the minimum weight of a path from 1.', 'একটি পথের ওজন (প্রান্তগুলোর যোগফল) − (সর্বোচ্চ প্রান্ত) + (সর্বনিম্ন প্রান্ত)। প্রতিটি শীর্ষ ২ … n-এর জন্য ১ থেকে একটি পথের সর্বনিম্ন ওজন বের করুন।'),
  input: L('n m, then m weighted edges.', 'n m, তারপর m-টি ওজনযুক্ত প্রান্ত।'),
  output: L('n − 1 numbers.', 'n − ১টি সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 512, notes: [L('n, m ≤ 2·10⁵, w ≤ 10⁹', 'n, m ≤ ২·১০⁵, w ≤ ১০⁹')] },
  samples: [
    { input: '5 4\n5 3 4\n2 1 1\n3 2 2\n2 4 2', output: '1 2 2 4', explain: L('Vertex 2: a single edge of weight 1 gives 1 − 1 + 1 = 1.', 'শীর্ষ ২: ওজন ১-এর একটি প্রান্ত ১ − ১ + ১ = ১ দেয়।') },
    { input: '6 8\n3 1 1\n3 6 2\n5 4 2\n4 2 2\n6 1 1\n5 2 1\n3 2 3\n1 5 4', output: '2 1 4 3 1', explain: L('A larger graph.', 'একটি বড় গ্রাফ।') },
    { input: '7 10\n7 5 5\n2 3 3\n4 7 1\n5 3 6\n2 7 6\n6 2 6\n3 7 6\n4 2 1\n3 1 4\n1 7 4', output: '3 4 2 7 7 3', explain: L('Another graph.', 'আরেকটি গ্রাফ।') },
  ],
  observation: L('Relax the problem: choose any one edge to subtract and any one edge to add again. Σ − a + b is minimised exactly by a = max and b = min, so the relaxed optimum equals the true one. Model it with states (v, subtracted?, added?) and four edge kinds: normal (w), subtract (0), add (2w), both at once (w).', 'প্রবলেমটি শিথিল করুন: বিয়োগের জন্য যেকোনো একটি প্রান্ত আর আবার যোগের জন্য যেকোনো একটি প্রান্ত বাছুন। Σ − a + b ঠিক a = max আর b = min-এ সর্বনিম্ন, তাই শিথিল সেরা আসলটির সমান। অবস্থা (v, বিয়োগ হয়েছে?, যোগ হয়েছে?) আর চার ধরনের প্রান্ত দিয়ে মডেল করুন: সাধারণ (w), বিয়োগ (০), যোগ (২w), দুটি একসঙ্গে (w)।'),
  approach: [L('Dijkstra over 4n states; answer dist[v][1][1].', '৪n অবস্থায় ডাইকস্ট্রা; উত্তর dist[v][১][১]।')],
  walkthrough: { input: 'sample 1, vertex 3', steps: [{ state: 'path 1–2–3 with edges 1, 2', text: L('3 − 2 + 1 = 2.', '৩ − ২ + ১ = ২।') }] },
  complexity: { time: 'O(m log n)', space: 'O(n + m)', why: L('Four copies of the graph.', 'গ্রাফের চারটি কপি।') },
  solutions: [
    {
      id: 'layered',
      kind: 'optimal',
      title: L('Dijkstra on (vertex, flags)', '(শীর্ষ, পতাকা)-এর ওপর ডাইকস্ট্রা'),
      idea: L('Flags: one edge free, one edge doubled.', 'পতাকা: একটি প্রান্ত বিনামূল্যে, একটি প্রান্ত দ্বিগুণ।'),
      explain: [L('Turning “subtract the maximum” into “subtract any edge you choose” is the key relaxation: the minimisation then picks the maximum automatically, and choices become simple graph layers.', '“সর্বোচ্চ বিয়োগ”-কে “আপনার বাছা যেকোনো প্রান্ত বিয়োগ”-এ বদলানোই মূল শিথিলকরণ: তখন সর্বনিম্নকরণ আপনাআপনি সর্বোচ্চটি বাছে, আর বিকল্পগুলো সরল গ্রাফ স্তরে পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        scanf("%d %d %lld", &u, &v, &w);
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    // state id = v * 4 + (sub << 1 | add)
    vector<long long> dist(4 * (n + 1), LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[1 * 4] = 0;
    pq.push({0, 4});
    while (!pq.empty()) {
        auto [d, s] = pq.top();
        pq.pop();
        if (d != dist[s]) continue;
        int v = s / 4, sub = s >> 1 & 1, add = s & 1;
        for (auto [u, w] : adj[v]) {
            auto relax = [&](int ns, int na, long long c) {
                int id = u * 4 + (ns << 1 | na);
                if (d + c < dist[id]) { dist[id] = d + c; pq.push({dist[id], id}); }
            };
            relax(sub, add, w);
            if (!sub) relax(1, add, 0);
            if (!add) relax(sub, 1, 2 * w);
            if (!sub && !add) relax(1, 1, w);
        }
    }
    for (int v = 2; v <= n; v++) printf("%lld ", dist[v * 4 + 3]);
    printf("\n");
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Exact DP over (vertex, max, min)', '(শীর্ষ, max, min)-এর ওপর নিখুঁত DP'),
      idea: L('For small weights, minimise the plain sum for every (max, min) pair, then subtract and add.', 'ছোট ওজনে প্রতিটি (max, min) জোড়ার জন্য সাধারণ যোগফল সর্বনিম্ন করে তারপর বিয়োগ আর যোগ।'),
      explain: [L('No relaxation argument: it tracks the true maximum and minimum edge of each walk explicitly. Bellman–Ford style relaxation until nothing changes.', 'কোনো শিথিলকরণের যুক্তি নয়: এটি প্রতিটি হাঁটার আসল সর্বোচ্চ আর সর্বনিম্ন প্রান্ত স্পষ্টভাবে রাখে। কিছু না বদলানো পর্যন্ত বেলম্যান–ফোর্ড ধরনের শিথিলকরণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<array<int, 3>> e(m);
    int W = 0;
    for (auto& [u, v, w] : e) { cin >> u >> v >> w; W = max(W, w); }
    if (W > 12 || n > 12) { cout << "\n"; return 0; }
    const long long INF = LLONG_MAX / 4;
    // best[v][mx][mn] = min sum of a walk 1 -> v (with at least one edge) whose max is mx and min is mn
    vector<vector<vector<long long>>> best(n + 1, vector<vector<long long>>(W + 1, vector<long long>(W + 1, INF)));
    bool changed = true;
    for (auto [u, v, w] : e) {
        if (u == 1) best[v][w][w] = min(best[v][w][w], (long long)w);
        if (v == 1) best[u][w][w] = min(best[u][w][w], (long long)w);
    }
    while (changed) {
        changed = false;
        for (auto [u, v, w] : e)
            for (int t = 0; t < 2; t++, swap(u, v))
                for (int mx = 1; mx <= W; mx++)
                    for (int mn = 1; mn <= mx; mn++) {
                        if (best[u][mx][mn] == INF) continue;
                        int nmx = max(mx, w), nmn = min(mn, w);
                        long long c = best[u][mx][mn] + w;
                        if (c < best[v][nmx][nmn]) { best[v][nmx][nmn] = c; changed = true; }
                    }
    }
    for (int v = 2; v <= n; v++) {
        long long ans = INF;
        for (int mx = 1; mx <= W; mx++)
            for (int mn = 1; mn <= mx; mn++)
                if (best[v][mx][mn] != INF) ans = min(ans, best[v][mx][mn] - mx + mn);
        cout << ans << ' ';
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(iterations · m · W²)',
      space: 'O(n · W²)',
      accepted: false,
      toolkit: ['vector', 'min-max'],
    },
  ],
  tests: [
    { input: '5 4\n5 3 4\n2 1 1\n3 2 2\n2 4 2', output: '1 2 2 4', source: 'sample', note: sample(1) },
    { input: '6 8\n3 1 1\n3 6 2\n5 4 2\n4 2 2\n6 1 1\n5 2 1\n3 2 3\n1 5 4', output: '2 1 4 3 1', source: 'sample', note: sample(2) },
    { input: '7 10\n7 5 5\n2 3 3\n4 7 1\n5 3 6\n2 7 6\n6 2 6\n3 7 6\n4 2 1\n3 1 4\n1 7 4', output: '3 4 2 7 7 3', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Trying to track the real maximum and minimum inside Dijkstra.', 'ডাইকস্ট্রার ভেতরে আসল সর্বোচ্চ আর সর্বনিম্ন রাখার চেষ্টা।'), L('Forgetting the “both on one edge” transition.', '“একটি প্রান্তে দুটি একসঙ্গে” রূপান্তর ভুলে যাওয়া।')],
  related: [{ id: '1915G', name: 'Bicycles', why: L('Dijkstra on an expanded state space.', 'বর্ধিত অবস্থার ওপর ডাইকস্ট্রা।') }],
  toolkit: ['priority-queue'],
};

export const p1486E: ProblemEntry = {
  id: '1486E',
  contestId: 1486,
  index: 'E',
  name: 'Paired Payment',
  rating: 2200,
  tags: ['binary-search', 'brute-force', 'constructive', 'dp', 'flows', 'graphs', 'shortest-paths'],
  why: L('Edges are paid in pairs, (w₁ + w₂)²: remember the first weight of an unfinished pair as part of the state.', 'প্রান্তের দাম জোড়ায়, (w₁ + w₂)²: অসমাপ্ত জোড়ার প্রথম ওজন অবস্থার অংশ হিসেবে মনে রাখা।'),
  statement: L('You may only travel two roads at a time, paying (w₁ + w₂)² for each pair. For every city, find the minimum cost to reach it from city 1, or −1.', 'একবারে শুধু দুটি রাস্তা যাওয়া যায়, প্রতিটি জোড়ার জন্য (w₁ + w₂)² দিয়ে। প্রতিটি শহরের জন্য শহর ১ থেকে সেখানে পৌঁছানোর সর্বনিম্ন খরচ বের করুন, না হলে −১।'),
  input: L('n m, then m weighted roads.', 'n m, তারপর m-টি ওজনযুক্ত রাস্তা।'),
  output: L('n numbers.', 'n-টি সংখ্যা।'),
  limits: { timeSec: 4, memoryMb: 512, notes: [L('n ≤ 10⁵, m ≤ 2·10⁵, w ≤ 50', 'n ≤ ১০⁵, m ≤ ২·১০⁵, w ≤ ৫০')] },
  samples: [
    { input: '5 6\n1 2 3\n2 3 4\n3 4 5\n4 5 6\n1 5 1\n2 4 2', output: '0 98 49 25 114', explain: L('City 3: 1–2–3 costs (3 + 4)² = 49.', 'শহর ৩: ১–২–৩-এর খরচ (৩ + ৪)² = ৪৯।') },
    { input: '3 2\n1 2 1\n2 3 2', output: '0 -1 9', explain: L('City 2 is one road away, so it is unreachable on its own.', 'শহর ২ একটি রাস্তা দূরে, তাই একা পৌঁছানো যায় না।') },
  ],
  observation: L('State (v, p): at city v having just taken the first road of a pair with weight p (p = 0 means no pending road). From (v, 0) a road of weight w leads to (u, w) for free; from (v, p) a road of weight w leads to (u, 0) for (p + w)². Weights ≤ 50 keep the state count at 51n.', 'অবস্থা (v, p): শহর v-তে, সবে একটি জোড়ার প্রথম রাস্তা p ওজনে নেওয়া (p = ০ মানে কোনো অপেক্ষমাণ রাস্তা নেই)। (v, ০) থেকে w ওজনের রাস্তা বিনামূল্যে (u, w)-তে নেয়; (v, p) থেকে w ওজনের রাস্তা (p + w)²-এ (u, ০)-তে নেয়। ওজন ≤ ৫০ অবস্থার সংখ্যা ৫১n রাখে।'),
  approach: [L('Dijkstra over 51 layers; answer dist[v][0].', '৫১টি স্তরে ডাইকস্ট্রা; উত্তর dist[v][০]।')],
  walkthrough: { input: '3 2: 1–2 (1), 2–3 (2)', steps: [{ state: '(1,0) → (2,1) free → (3,0) cost 9', text: L('dist[2][0] stays ∞: −1.', 'dist[২][০] ∞ থাকে: −১।') }] },
  complexity: { time: 'O(51 · m log)', space: 'O(51 · n)', why: L('51 copies of the graph.', 'গ্রাফের ৫১টি কপি।') },
  solutions: [
    {
      id: 'layers',
      kind: 'optimal',
      title: L('Dijkstra with a pending weight', 'অপেক্ষমাণ ওজনসহ ডাইকস্ট্রা'),
      idea: L('State = (city, first weight of the open pair).', 'অবস্থা = (শহর, খোলা জোড়ার প্রথম ওজন)।'),
      explain: [L('When the cost depends on more than one edge, store the information you still need in the state. Small weights keep that state space affordable.', 'খরচ একাধিক প্রান্তের ওপর নির্ভর করলে যে তথ্য এখনও লাগবে তা অবস্থায় রাখুন। ছোট ওজন সেই অবস্থার জায়গা সাধ্যের মধ্যে রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    const long long INF = LLONG_MAX;
    vector<array<long long, 51>> dist(n + 1);
    for (auto& d : dist) d.fill(INF);
    priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> pq;
    dist[1][0] = 0;
    pq.push({0, 1, 0});
    while (!pq.empty()) {
        auto [d, v, p] = pq.top();
        pq.pop();
        if (d != dist[v][p]) continue;
        for (auto [u, w] : adj[v]) {
            int np = p == 0 ? w : 0;
            long long nd = p == 0 ? d : d + (long long)(p + w) * (p + w);
            if (nd < dist[u][np]) { dist[u][np] = nd; pq.push({nd, u, np}); }
        }
    }
    for (int v = 1; v <= n; v++) printf("%lld ", dist[v][0] == INF ? -1 : dist[v][0]);
    printf("\n");
    return 0;
}
`,
      time: 'O(51 · m log)',
      space: 'O(51 · n)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Explicit two-road graph', 'স্পষ্ট দুই-রাস্তার গ্রাফ'),
      idea: L('Add an edge u → w of cost (w₁ + w₂)² for every pair of roads u–v–w, then plain Dijkstra.', 'প্রতিটি রাস্তার জোড়া u–v–w-এর জন্য (w₁ + w₂)² খরচে একটি প্রান্ত u → w যোগ, তারপর সাধারণ ডাইকস্ট্রা।'),
      explain: [L('The new graph can have Σ deg² edges, too many in general, but it is the most direct model of the statement.', 'নতুন গ্রাফে Σ ডিগ্রি²টি প্রান্ত হতে পারে, সাধারণভাবে অনেক বেশি, কিন্তু এটি স্টেটমেন্টের সবচেয়ে সরাসরি মডেল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    vector<vector<pair<int, long long>>> h(n + 1);
    for (int v = 1; v <= n; v++)
        for (auto [a, w1] : adj[v])
            for (auto [b, w2] : adj[v]) h[a].push_back({b, (long long)(w1 + w2) * (w1 + w2)});
    vector<long long> d(n + 1, LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [x, v] = pq.top();
        pq.pop();
        if (x != d[v]) continue;
        for (auto [u, c] : h[v]) if (x + c < d[u]) { d[u] = x + c; pq.push({d[u], u}); }
    }
    for (int v = 1; v <= n; v++) cout << (d[v] == LLONG_MAX ? -1 : d[v]) << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(Σ deg² log)',
      space: 'O(Σ deg²)',
      accepted: false,
      toolkit: ['priority-queue'],
    },
  ],
  tests: [
    { input: '5 6\n1 2 3\n2 3 4\n3 4 5\n4 5 6\n1 5 1\n2 4 2', output: '0 98 49 25 114', source: 'sample', note: sample(1) },
    { input: '3 2\n1 2 1\n2 3 2', output: '0 -1 9', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Answering with a state that has a pending road.', 'অপেক্ষমাণ রাস্তাসহ অবস্থা দিয়ে উত্তর।')],
  related: [{ id: '1473E', name: 'Minimum Path', why: L('Layered Dijkstra.', 'স্তরযুক্ত ডাইকস্ট্রা।') }],
  toolkit: ['priority-queue'],
};

export const p1915G: ProblemEntry = {
  id: '1915G',
  contestId: 1915,
  index: 'G',
  name: 'Bicycles',
  rating: 1800,
  tags: ['graphs', 'greedy', 'implementation', 'shortest-paths', 'sortings'],
  why: L('Dijkstra over (city, bike currently held): the bike changes the cost of every later edge.', '(শহর, এখন হাতে থাকা সাইকেল)-এর ওপর ডাইকস্ট্রা: সাইকেল পরের প্রতিটি প্রান্তের খরচ বদলায়।'),
  statement: L('Each city sells a bike with slowness sᵢ. Riding a road of length w with a bike of slowness s takes w · s. You start at city 1 with no bike (buy the one there) and may switch to any city’s bike when you pass it. Find the minimum time to reach city n. There are t test cases.', 'প্রতিটি শহর sᵢ ধীরতার একটি সাইকেল বিক্রি করে। s ধীরতার সাইকেলে w দৈর্ঘ্যের রাস্তায় w · s সময় লাগে। শহর ১-এ সাইকেল ছাড়া শুরু করেন (সেখানকারটি কেনেন) আর যে শহর পার হন তার সাইকেলে বদলাতে পারেন। শহর n-এ পৌঁছানোর সর্বনিম্ন সময় বের করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n m, the roads, and s₁ … sₙ.', 't; প্রতিটি টেস্টে n m, রাস্তাগুলো, আর s₁ … sₙ।'),
  output: L('The minimum time.', 'সর্বনিম্ন সময়।'),
  limits: { timeSec: 4, memoryMb: 256, notes: [L('Σ n, Σ m ≤ 1000', 'Σ n, Σ m ≤ ১০০০')] },
  samples: [{ input: '3\n5 5\n1 2 2\n3 2 1\n2 4 5\n2 5 7\n4 5 1\n5 2 1 3 3\n5 10\n1 2 5\n1 3 5\n1 4 4\n1 5 8\n2 3 6\n2 4 3\n2 5 2\n3 4 1\n3 5 8\n4 5 2\n7 2 8 4 1\n7 10\n3 2 8\n2 1 4\n2 5 7\n2 6 4\n7 1 2\n4 3 5\n6 4 2\n6 7 1\n6 7 4\n4 5 9\n7 6 5 4 3 2 1', output: '19\n36\n14', explain: L('First test: ride to city 3 for the slowness-1 bike, then on to 5.', 'প্রথম টেস্ট: ধীরতা-১ সাইকেলের জন্য শহর ৩-এ যান, তারপর ৫-এ।') }],
  observation: L('The only thing that matters about the past is the bike in hand. State (v, b) where b is the city whose bike you hold; on arrival at v switch to b′ = v if sᵥ < s_b. Dijkstra over n² states.', 'অতীত সম্পর্কে শুধু হাতের সাইকেলটি গুরুত্বপূর্ণ। অবস্থা (v, b) যেখানে b হলো যে শহরের সাইকেল ধরে আছেন; v-তে পৌঁছে sᵥ < s_b হলে b′ = v-তে বদলান। n² অবস্থায় ডাইকস্ট্রা।'),
  approach: [L('Dijkstra on (city, bike city); answer min over bikes at n.', '(শহর, সাইকেলের শহর)-এ ডাইকস্ট্রা; উত্তর n-এ সব সাইকেলের ওপর min।')],
  walkthrough: { input: 'test 1', steps: [{ state: '1 → 2 costs 2 · 5 = 10 (take bike 2), 2 → 3 costs 1 · 2 = 2 (take bike 3, slowness 1)', text: L('3 → 2 → 4 → 5 costs 1 + 5 + 1 = 7. Total 19.', '৩ → ২ → ৪ → ৫-এর খরচ ১ + ৫ + ১ = ৭। মোট ১৯।') }] },
  complexity: { time: 'O(n · m log)', space: 'O(n²)', why: L('n² states, n · m transitions.', 'n² অবস্থা, n · m রূপান্তর।') },
  solutions: [
    {
      id: 'state-dijkstra',
      kind: 'optimal',
      title: L('Dijkstra on (city, bike)', '(শহর, সাইকেল)-এ ডাইকস্ট্রা'),
      idea: L('Always switch to a faster bike.', 'সবসময় দ্রুত সাইকেলে বদলান।'),
      explain: [L('Switching to a faster bike never hurts, so the state only needs the best bike seen so far; with Σ n ≤ 1000 the n² states are affordable.', 'দ্রুত সাইকেলে বদলানো কখনো ক্ষতি করে না, তাই অবস্থায় শুধু এ পর্যন্ত দেখা সেরা সাইকেল লাগে; Σ n ≤ ১০০০-এ n² অবস্থা সাধ্যের মধ্যে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<pair<int, long long>>> adj(n + 1);
        for (int i = 0; i < m; i++) {
            int u, v;
            long long w;
            scanf("%d %d %lld", &u, &v, &w);
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }
        vector<long long> s(n + 1);
        for (int i = 1; i <= n; i++) scanf("%lld", &s[i]);
        vector<vector<long long>> dist(n + 1, vector<long long>(n + 1, LLONG_MAX));
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> pq;
        dist[1][1] = 0;
        pq.push({0, 1, 1});
        long long ans = LLONG_MAX;
        while (!pq.empty()) {
            auto [d, v, b] = pq.top();
            pq.pop();
            if (d != dist[v][b]) continue;
            if (v == n) { ans = d; break; }
            for (auto [u, w] : adj[v]) {
                int nb = s[u] < s[b] ? u : b;
                long long nd = d + w * s[b];
                if (nd < dist[u][nb]) { dist[u][nb] = nd; pq.push({nd, u, nb}); }
            }
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n · m log)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long'],
    },
    {
      id: 'by-slowness',
      kind: 'alt',
      title: L('Dijkstra on (city, slowness value)', '(শহর, ধীরতার মান)-এ ডাইকস্ট্রা'),
      idea: L('Index the state by the slowness itself (≤ 1000) instead of by city.', 'অবস্থাকে শহরের বদলে ধীরতা দিয়েই (≤ ১০০০) সূচিত করা।'),
      explain: [L('Two bikes with equal slowness behave identically, so the slowness value is enough. This is the same model compressed differently, useful when there are many cities but few distinct speeds.', 'সমান ধীরতার দুটি সাইকেল একইভাবে আচরণ করে, তাই ধীরতার মানই যথেষ্ট। এটি একই মডেল অন্যভাবে সংকুচিত, শহর অনেক কিন্তু আলাদা গতি কম হলে কাজের।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<pair<int, long long>>> adj(n + 1);
        for (int i = 0; i < m; i++) {
            int u, v;
            long long w;
            scanf("%d %d %lld", &u, &v, &w);
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }
        vector<int> s(n + 1);
        for (int i = 1; i <= n; i++) scanf("%d", &s[i]);
        const int S = 1001;
        vector<vector<long long>> dist(n + 1, vector<long long>(S, LLONG_MAX));
        priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> pq;
        dist[1][s[1]] = 0;
        pq.push({0, 1, s[1]});
        while (!pq.empty()) {
            auto [d, v, k] = pq.top();
            pq.pop();
            if (d != dist[v][k]) continue;
            for (auto [u, w] : adj[v]) {
                int nk = min(k, s[u]);
                long long nd = d + w * k;
                if (nd < dist[u][nk]) { dist[u][nk] = nd; pq.push({nd, u, nk}); }
            }
        }
        printf("%lld\n", *min_element(dist[n].begin(), dist[n].end()));
    }
    return 0;
}
`,
      time: 'O(S · m log)',
      space: 'O(n · S)',
      accepted: true,
      toolkit: ['priority-queue', 'min-max'],
    },
  ],
  tests: [{ input: '3\n5 5\n1 2 2\n3 2 1\n2 4 5\n2 5 7\n4 5 1\n5 2 1 3 3\n5 10\n1 2 5\n1 3 5\n1 4 4\n1 5 8\n2 3 6\n2 4 3\n2 5 2\n3 4 1\n3 5 8\n4 5 2\n7 2 8 4 1\n7 10\n3 2 8\n2 1 4\n2 5 7\n2 6 4\n7 1 2\n4 3 5\n6 4 2\n6 7 1\n6 7 4\n4 5 9\n7 6 5 4 3 2 1', output: '19\n36\n14', source: 'sample', note: sample(1) }],
  pitfalls: [L('Plain Dijkstra on cities, which forgets which bike you hold.', 'শহরে সাধারণ ডাইকস্ট্রা, যা হাতের সাইকেল ভুলে যায়।')],
  related: [{ id: '1473E', name: 'Minimum Path', why: L('Dijkstra with extra state.', 'বাড়তি অবস্থাসহ ডাইকস্ট্রা।') }],
  toolkit: ['priority-queue'],
};

export const p1196F: ProblemEntry = {
  id: '1196F',
  contestId: 1196,
  index: 'F',
  name: 'K-th Path',
  rating: 2200,
  tags: ['brute-force', 'constructive', 'shortest-paths', 'sortings'],
  why: L('Only the k lightest edges can matter, so shrink the graph to at most 2k vertices and run Floyd–Warshall.', 'শুধু k-টি সবচেয়ে হালকা প্রান্ত গুরুত্বপূর্ণ হতে পারে, তাই গ্রাফকে সর্বোচ্চ ২k শীর্ষে নামিয়ে ফ্লয়েড–ওয়ারশাল চালান।'),
  statement: L('In a connected weighted graph, take the shortest-path distances of all pairs i < j, sort them, and print the k-th smallest.', 'একটি সংযুক্ত ওজনযুক্ত গ্রাফে সব জোড়া i < j-এর সবচেয়ে ছোট পথের দূরত্ব নিয়ে সাজিয়ে k-তম ছোটটি প্রিন্ট করুন।'),
  input: L('n m k, then m edges.', 'n m k, তারপর m-টি প্রান্ত।'),
  output: L('The k-th smallest shortest path.', 'k-তম ছোট সবচেয়ে ছোট পথ।'),
  limits: { timeSec: 2.5, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵, k ≤ min(400, n(n−1)/2)', 'n, m ≤ ২·১০⁵, k ≤ min(৪০০, n(n−১)/২)')] },
  samples: [
    { input: '6 10 5\n2 5 1\n5 3 9\n6 2 2\n1 3 1\n5 1 8\n6 5 10\n1 6 5\n6 4 6\n3 6 2\n3 4 5', output: '3', explain: L('The five smallest distances are 1, 1, 2, 2, 3.', 'পাঁচটি সবচেয়ে ছোট দূরত্ব ১, ১, ২, ২, ৩।') },
    { input: '7 15 18\n2 6 3\n5 7 4\n6 5 4\n3 6 9\n6 7 7\n1 6 4\n7 1 6\n7 2 1\n4 3 2\n3 2 8\n5 3 6\n2 5 5\n3 7 9\n4 1 8\n2 1 1', output: '9', explain: L('A larger case.', 'একটি বড় ক্ষেত্র।') },
  ],
  observation: L('Each of the k lightest edges is itself a candidate distance, so the answer is at most the k-th edge weight. Any path using a heavier edge is at least that long. So only the k lightest edges and their ≤ 2k endpoints matter; all-pairs on 800 vertices is 5·10⁸ simple steps.', 'k-টি সবচেয়ে হালকা প্রান্তের প্রতিটি নিজেই একটি প্রার্থী দূরত্ব, তাই উত্তর সর্বোচ্চ k-তম প্রান্তের ওজন। ভারী প্রান্ত ব্যবহার করা যেকোনো পথ অন্তত ততটা লম্বা। তাই শুধু k-টি সবচেয়ে হালকা প্রান্ত আর তাদের ≤ ২k প্রান্তবিন্দু গুরুত্বপূর্ণ; ৮০০ শীর্ষে সব-জোড়া ৫·১০⁸টি সরল ধাপ।'),
  approach: [L('Sort edges, keep k, compress vertices, Floyd, sort pair distances.', 'প্রান্ত সর্ট, k-টি রাখা, শীর্ষ সংকোচন, ফ্লয়েড, জোড়ার দূরত্ব সর্ট।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'lightest edges: 1, 1, 2, 2, 5', text: L('After Floyd on their endpoints the 5th distance is 3 (1–3–6? 1 + 2).', 'তাদের প্রান্তবিন্দুতে ফ্লয়েডের পরে ৫ম দূরত্ব ৩ (১ + ২)।') }] },
  complexity: { time: 'O(m log m + k³)', space: 'O(k²)', why: L('Floyd on ≤ 2k vertices.', '≤ ২k শীর্ষে ফ্লয়েড।') },
  solutions: [
    {
      id: 'small-floyd',
      kind: 'optimal',
      title: L('Keep k lightest edges, Floyd–Warshall', 'k-টি হালকা প্রান্ত রেখে ফ্লয়েড–ওয়ারশাল'),
      idea: L('The answer is bounded by the k-th edge weight.', 'উত্তর k-তম প্রান্তের ওজন দিয়ে সীমিত।'),
      explain: [L('A bound on the answer that throws away most of the input is the key: the remaining graph is tiny regardless of n and m.', 'ইনপুটের বেশিরভাগ বাদ দেওয়া উত্তরের একটি সীমাই মূল: n আর m যা-ই হোক বাকি গ্রাফটি ক্ষুদ্র।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<array<long long, 3>> e(m);
    for (auto& [w, u, v] : e) scanf("%lld %lld %lld", &u, &v, &w);
    sort(e.begin(), e.end());
    e.resize(min(m, k));
    vector<int> ids;
    for (auto& [w, u, v] : e) { ids.push_back(u); ids.push_back(v); }
    sort(ids.begin(), ids.end());
    ids.erase(unique(ids.begin(), ids.end()), ids.end());
    int V = ids.size();
    auto id = [&](long long x) { return int(lower_bound(ids.begin(), ids.end(), x) - ids.begin()); };
    const long long INF = LLONG_MAX / 4;
    vector<vector<long long>> d(V, vector<long long>(V, INF));
    for (int i = 0; i < V; i++) d[i][i] = 0;
    for (auto& [w, u, v] : e) {
        int a = id(u), b = id(v);
        d[a][b] = min(d[a][b], w);
        d[b][a] = min(d[b][a], w);
    }
    for (int z = 0; z < V; z++)
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++) d[i][j] = min(d[i][j], d[i][z] + d[z][j]);
    vector<long long> all;
    for (int i = 0; i < V; i++)
        for (int j = i + 1; j < V; j++) if (d[i][j] < INF) all.push_back(d[i][j]);
    sort(all.begin(), all.end());
    printf("%lld\n", all[k - 1]);
    return 0;
}
`,
      time: 'O(m log m + k³)',
      space: 'O(k²)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'lower-bound'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs on the whole graph', 'পুরো গ্রাফে সব জোড়া'),
      idea: L('Dijkstra from every vertex, collect i < j, sort.', 'প্রতিটি শীর্ষ থেকে ডাইকস্ট্রা, i < j জড়ো, সর্ট।'),
      explain: [L('O(n · m log n): fine on small graphs and the direct reading of the statement.', 'O(n · m log n): ছোট গ্রাফে ঠিক আর স্টেটমেন্টের সরাসরি পাঠ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    if (n > 300) { cout << "\n"; return 0; }
    vector<long long> all;
    for (int s = 1; s <= n; s++) {
        vector<long long> d(n + 1, LLONG_MAX);
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        d[s] = 0;
        pq.push({0, s});
        while (!pq.empty()) {
            auto [x, v] = pq.top();
            pq.pop();
            if (x != d[v]) continue;
            for (auto [u, w] : adj[v]) if (x + w < d[u]) { d[u] = x + w; pq.push({d[u], u}); }
        }
        for (int j = s + 1; j <= n; j++) all.push_back(d[j]);
    }
    sort(all.begin(), all.end());
    cout << all[k - 1] << "\n";
    return 0;
}
`,
      time: 'O(n · m log n)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['priority-queue', 'sort'],
    },
  ],
  tests: [
    { input: '6 10 5\n2 5 1\n5 3 9\n6 2 2\n1 3 1\n5 1 8\n6 5 10\n1 6 5\n6 4 6\n3 6 2\n3 4 5', output: '3', source: 'sample', note: sample(1) },
    { input: '7 15 18\n2 6 3\n5 7 4\n6 5 4\n3 6 9\n6 7 7\n1 6 4\n7 1 6\n7 2 1\n4 3 2\n3 2 8\n5 3 6\n2 5 5\n3 7 9\n4 1 8\n2 1 1', output: '9', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Running all-pairs on the full graph.', 'পুরো গ্রাফে সব-জোড়া চালানো।')],
  related: [{ id: '1433G', name: 'Reducing Delivery Cost', why: L('All-pairs distances.', 'সব-জোড়া দূরত্ব।') }],
  toolkit: ['sort'],
};

export const p295B: ProblemEntry = {
  id: '295B',
  contestId: 295,
  index: 'B',
  name: 'Greg and Graph',
  rating: 1700,
  tags: ['dp', 'graphs', 'shortest-paths'],
  why: L('Floyd–Warshall in reverse: deleting vertices backwards is adding them, which is exactly Floyd’s outer loop.', 'উল্টো ক্রমে ফ্লয়েড–ওয়ারশাল: শীর্ষ পেছন থেকে মোছা মানে যোগ করা, যা ঠিক ফ্লয়েডের বাইরের লুপ।'),
  statement: L('A complete weighted directed graph. Vertices are deleted one by one in a given order. Before each deletion, print the sum of shortest distances between all ordered pairs of remaining vertices.', 'একটি সম্পূর্ণ ওজনযুক্ত নির্দেশিত গ্রাফ। প্রদত্ত ক্রমে শীর্ষ একে একে মোছা হয়। প্রতিটি মোছার আগে বাকি শীর্ষগুলোর সব ক্রমযুক্ত জোড়ার সবচেয়ে ছোট দূরত্বের যোগফল প্রিন্ট করুন।'),
  input: L('n, the adjacency matrix, then the deletion order.', 'n, সংলগ্নতা ম্যাট্রিক্স, তারপর মোছার ক্রম।'),
  output: L('n sums.', 'n-টি যোগফল।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n ≤ 500', 'n ≤ ৫০০')] },
  samples: [
    { input: '1\n0\n1', output: '0', explain: L('One vertex.', 'একটি শীর্ষ।') },
    { input: '2\n0 5\n4 0\n1 2', output: '9 0', explain: L('5 + 4, then a single vertex.', '৫ + ৪, তারপর একটি শীর্ষ।') },
    { input: '4\n0 3 1 1\n6 0 400 1\n2 4 0 1\n1 1 1 0\n4 1 2 3', output: '17 23 404 0', explain: L('Deleting 4 first removes useful shortcuts.', 'প্রথমে ৪ মুছলে কাজের শর্টকাট সরে যায়।') },
  ],
  observation: L('Floyd–Warshall’s invariant: after processing intermediates in some order, d holds shortest paths using only those intermediates. Reverse the deletion order and add vertices one by one as intermediates; after adding the j-th, sum d over the added vertices.', 'ফ্লয়েড–ওয়ারশালের অপরিবর্তনীয়: কোনো ক্রমে মধ্যবর্তী শীর্ষ প্রক্রিয়ার পরে d শুধু সেই মধ্যবর্তী ব্যবহার করে সবচেয়ে ছোট পথ রাখে। মোছার ক্রম উল্টে শীর্ষগুলো একে একে মধ্যবর্তী হিসেবে যোগ করুন; j-তম যোগের পরে যোগ করা শীর্ষগুলোর ওপর d যোগ করুন।'),
  approach: [L('Floyd with k in reversed deletion order; record sums; print reversed.', 'উল্টো মোছার ক্রমে k দিয়ে ফ্লয়েড; যোগফল লিখুন; উল্টো প্রিন্ট।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'add 2: sum 0; add 1: d = 5, 4 → 9', text: L('Output 9 0.', 'আউটপুট ৯ ০।') }] },
  complexity: { time: 'O(n³)', space: 'O(n²)', why: L('One Floyd–Warshall.', 'একটি ফ্লয়েড–ওয়ারশাল।') },
  solutions: [
    {
      id: 'reverse-floyd',
      kind: 'optimal',
      title: L('Reverse order Floyd–Warshall', 'উল্টো ক্রমে ফ্লয়েড–ওয়ারশাল'),
      idea: L('Deletions backwards = insertions.', 'পেছন থেকে মোছা = যোগ।'),
      explain: [L('Relax all pairs (not only added ones) through each new vertex, so later-added vertices already have correct paths through earlier intermediates. Sums can exceed 2³¹: use long long.', 'প্রতিটি নতুন শীর্ষ দিয়ে সব জোড়া শিথিল করুন (শুধু যোগ করাগুলো নয়), যাতে পরে যোগ করা শীর্ষেরও আগের মধ্যবর্তী দিয়ে সঠিক পথ থাকে। যোগফল বড়: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<long long>> d(n + 1, vector<long long>(n + 1));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) scanf("%lld", &d[i][j]);
    vector<int> x(n);
    for (auto& v : x) scanf("%d", &v);
    vector<bool> added(n + 1, false);
    vector<long long> ans(n);
    for (int step = n - 1; step >= 0; step--) {
        int k = x[step];
        added[k] = true;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++) d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        long long sum = 0;
        for (int i = 1; i <= n; i++)
            if (added[i])
                for (int j = 1; j <= n; j++) if (added[j]) sum += d[i][j];
        ans[step] = sum;
    }
    for (long long s : ans) printf("%lld ", s);
    printf("\n");
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Floyd on the remaining vertices each time', 'প্রতিবার বাকি শীর্ষে ফ্লয়েড'),
      idea: L('Before each deletion, run Floyd on what is left.', 'প্রতিটি মোছার আগে যা বাকি তাতে ফ্লয়েড।'),
      explain: [L('O(n⁴): the literal process, which the reverse trick speeds up by a factor of n.', 'O(n⁴): আক্ষরিক প্রক্রিয়া, যা উল্টো কৌশল n গুণ দ্রুত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<long long>> w(n + 1, vector<long long>(n + 1));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) cin >> w[i][j];
    vector<int> x(n);
    for (auto& v : x) cin >> v;
    vector<bool> alive(n + 1, true);
    for (int step = 0; step < n; step++) {
        auto d = w;
        for (int k = 1; k <= n; k++) {
            if (!alive[k]) continue;
            for (int i = 1; i <= n; i++)
                for (int j = 1; j <= n; j++) d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
        }
        long long sum = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++) if (alive[i] && alive[j]) sum += d[i][j];
        cout << sum << ' ';
        alive[x[step]] = false;
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '1\n0\n1', output: '0', source: 'sample', note: sample(1) },
    { input: '2\n0 5\n4 0\n1 2', output: '9 0', source: 'sample', note: sample(2) },
    { input: '4\n0 3 1 1\n6 0 400 1\n2 4 0 1\n1 1 1 0\n4 1 2 3', output: '17 23 404 0', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Relaxing only pairs of already added vertices.', 'শুধু আগে যোগ করা শীর্ষের জোড়া শিথিল করা।')],
  related: [{ id: '1196F', name: 'K-th Path', why: L('Floyd–Warshall.', 'ফ্লয়েড–ওয়ারশাল।') }],
  toolkit: ['long-long'],
};
