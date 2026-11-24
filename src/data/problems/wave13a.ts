import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p449B: ProblemEntry = {
  id: '449B',
  contestId: 449,
  index: 'B',
  name: 'Jzzhu and Cities',
  rating: 2000,
  tags: ['graphs', 'greedy', 'shortest-paths'],
  why: L('Dijkstra, then decide per city whether a train is the only way to achieve its distance.', 'ডাইকস্ট্রা, তারপর প্রতিটি শহরের জন্য ঠিক করা ট্রেনই কি তার দূরত্ব অর্জনের একমাত্র উপায়।'),
  statement: L('Cities 1 … n with m roads (u, v, x), plus k train routes from the capital 1 to city s of length y. Close as many train routes as possible without changing any city’s shortest distance from the capital.', 'শহর ১ … n-এ m-টি রাস্তা (u, v, x), আর রাজধানী ১ থেকে শহর s পর্যন্ত y দৈর্ঘ্যের k-টি ট্রেন রুট। কোনো শহরের রাজধানী থেকে সবচেয়ে ছোট দূরত্ব না বদলে যত বেশি সম্ভব ট্রেন রুট বন্ধ করুন।'),
  input: L('n m k, the roads, then the routes s y.', 'n m k, রাস্তাগুলো, তারপর রুট s y।'),
  output: L('The maximum number of routes to close.', 'বন্ধ করার সর্বোচ্চ রুটের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵, m ≤ 3·10⁵, k ≤ 10⁵', 'n ≤ ১০⁵, m ≤ ৩·১০⁵, k ≤ ১০⁵')] },
  samples: [
    { input: '5 5 3\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n1 5 5\n3 5\n4 5\n5 5', output: '2', explain: L('Routes to 4 and the duplicate to 5 can go; the shorter train to 3 must stay.', '৪-এর রুট আর ৫-এর দ্বিতীয় রুট যেতে পারে; ৩-এর ছোট ট্রেন থাকতেই হবে।') },
    { input: '2 2 3\n1 2 2\n2 1 3\n2 1\n2 2\n2 3', output: '2', explain: L('Only the length-1 train is needed.', 'শুধু দৈর্ঘ্য-১ ট্রেন লাগে।') },
  ],
  observation: L('Run Dijkstra on roads and trains together. A train (s, y) with y > dist[s] is useless. If y = dist[s], it is needed only if no road reaches s at that distance (some road (u, s, w) with dist[u] + w = dist[s]) and no other train of the same length has been kept.', 'রাস্তা আর ট্রেন একসঙ্গে ডাইকস্ট্রা চালান। y > dist[s] এমন ট্রেন (s, y) অকেজো। y = dist[s] হলে এটি লাগে শুধু যদি কোনো রাস্তা সেই দূরত্বে s-এ না পৌঁছায় (dist[u] + w = dist[s] এমন রাস্তা (u, s, w)) আর একই দৈর্ঘ্যের অন্য কোনো ট্রেন রাখা না হয়।'),
  approach: [L('Dijkstra; mark cities reachable optimally by road; keep at most one tight train per remaining city.', 'ডাইকস্ট্রা; রাস্তায় সেরাভাবে পৌঁছানো শহর চিহ্নিত; বাকি প্রতিটি শহরে সর্বোচ্চ একটি টাইট ট্রেন রাখা।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'dist with trains = 0 1 3 5 5', text: L('Train (3, 5) > 3: close. Train (4, 5) is the only way to reach 4 in 5: keep. Train (5, 5): road 1–5 also gives 5: close. Answer 2.', 'ট্রেন (৩, ৫) > ৩: বন্ধ। ট্রেন (৪, ৫) ৫-এ ৪-এ পৌঁছানোর একমাত্র উপায়: রাখুন। ট্রেন (৫, ৫): রাস্তা ১–৫-ও ৫ দেয়: বন্ধ। উত্তর ২।') }] },
  complexity: { time: 'O((n + m + k) log n)', space: 'O(n + m + k)', why: L('One Dijkstra.', 'একটি ডাইকস্ট্রা।') },
  solutions: [
    {
      id: 'dijkstra',
      kind: 'optimal',
      title: L('Dijkstra + tight-edge check', 'ডাইকস্ট্রা + টাইট প্রান্ত যাচাই'),
      idea: L('A train is needed only if it is the unique way to reach dist[s].', 'একটি ট্রেন লাগে শুধু যদি এটি dist[s]-এ পৌঁছানোর একমাত্র উপায় হয়।'),
      explain: [L('“Tight” edges (dist[u] + w = dist[v]) form the shortest-path DAG. A vertex keeps its distance as long as at least one tight incoming edge remains.', '“টাইট” প্রান্ত (dist[u] + w = dist[v]) সবচেয়ে ছোট পথের DAG গঠন করে। অন্তত একটি টাইট আগত প্রান্ত থাকলে একটি শীর্ষ তার দূরত্ব রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<vector<pair<int, long long>>> road(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long x;
        scanf("%d %d %lld", &u, &v, &x);
        road[u].push_back({v, x});
        road[v].push_back({u, x});
    }
    vector<pair<int, long long>> train(k);
    for (auto& [s, y] : train) scanf("%d %lld", &s, &y);
    vector<long long> dist(n + 1, LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[1] = 0;
    for (auto [s, y] : train) if (y < dist[s]) { dist[s] = y; }
    for (int v = 1; v <= n; v++) if (dist[v] != LLONG_MAX) pq.push({dist[v], v});
    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d != dist[v]) continue;
        for (auto [u, w] : road[v])
            if (d + w < dist[u]) { dist[u] = d + w; pq.push({dist[u], u}); }
    }
    vector<bool> byRoad(n + 1, false), kept(n + 1, false);
    for (int v = 2; v <= n; v++)
        for (auto [u, w] : road[v]) if (dist[u] != LLONG_MAX && dist[u] + w == dist[v]) byRoad[v] = true;
    int closed = 0;
    for (auto [s, y] : train) {
        if (y > dist[s] || byRoad[s] || kept[s]) closed++;
        else kept[s] = true;
    }
    printf("%d\n", closed);
    return 0;
}
`,
      time: 'O((n + m + k) log n)',
      space: 'O(n + m + k)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every subset of trains to keep', 'রাখার জন্য ট্রেনের প্রতিটি সাবসেট চেষ্টা'),
      idea: L('Recompute distances for each subset and keep the smallest valid one.', 'প্রতিটি সাবসেটে দূরত্ব আবার হিসাব করে সবচেয়ে ছোট বৈধটি রাখা।'),
      explain: [L('2ᵏ Dijkstras: only for tiny k, but it needs no reasoning about tight edges.', '২ᵏ-টি ডাইকস্ট্রা: শুধু ক্ষুদ্র k-এর জন্য, কিন্তু টাইট প্রান্ত নিয়ে কোনো যুক্তি লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m, k;
vector<array<long long, 3>> e;
vector<pair<int, long long>> tr;

vector<long long> dij(int mask) {
    vector<vector<pair<int, long long>>> g(n + 1);
    for (auto [u, v, w] : e) { g[u].push_back({(int)v, w}); g[v].push_back({(int)u, w}); }
    for (int i = 0; i < k; i++) if (mask >> i & 1) { g[1].push_back({tr[i].first, tr[i].second}); g[tr[i].first].push_back({1, tr[i].second}); }
    vector<long long> d(n + 1, LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [x, v] = pq.top();
        pq.pop();
        if (x != d[v]) continue;
        for (auto [u, w] : g[v]) if (x + w < d[u]) { d[u] = x + w; pq.push({d[u], u}); }
    }
    return d;
}

int main() {
    cin >> n >> m >> k;
    e.resize(m);
    for (auto& [u, v, w] : e) cin >> u >> v >> w;
    tr.resize(k);
    for (auto& [s, y] : tr) cin >> s >> y;
    if (k > 12) { cout << "\n"; return 0; }
    vector<long long> full = dij((1 << k) - 1);
    int best = 0;
    for (int mask = 0; mask < (1 << k); mask++)
        if (dij(mask) == full) best = max(best, k - __builtin_popcount(mask));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2ᵏ · m log n)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['priority-queue', 'bit-shift'],
    },
  ],
  tests: [
    { input: '5 5 3\n1 2 1\n2 3 2\n1 3 3\n3 4 4\n1 5 5\n3 5\n4 5\n5 5', output: '2', source: 'sample', note: sample(1) },
    { input: '2 2 3\n1 2 2\n2 1 3\n2 1\n2 2\n2 3', output: '2', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Keeping two trains of the same length to the same city.', 'একই শহরে একই দৈর্ঘ্যের দুটি ট্রেন রাখা।'), L('int overflow in distances.', 'দূরত্বে int ওভারফ্লো।')],
  related: [{ id: '20C', name: 'Dijkstra?', why: L('Dijkstra basics.', 'ডাইকস্ট্রার মূল বিষয়।') }],
  toolkit: ['priority-queue'],
};

export const p545E: ProblemEntry = {
  id: '545E',
  contestId: 545,
  index: 'E',
  name: 'Paths and Trees',
  rating: 2000,
  tags: ['graphs', 'greedy', 'shortest-paths'],
  featuredFor: ['shortest-paths'],
  why: L('Among all shortest-path trees, pick for every vertex the cheapest tight incoming edge.', 'সব সবচেয়ে ছোট পথের ট্রির মধ্যে প্রতিটি শীর্ষের জন্য সবচেয়ে সস্তা টাইট আগত প্রান্ত বাছা।'),
  statement: L('A connected weighted graph and a start vertex u. Find a shortest-path tree from u (distances along the tree equal true distances) with the minimum total weight. Print the weight and the edge indices.', 'একটি সংযুক্ত ওজনযুক্ত গ্রাফ আর একটি শুরুর শীর্ষ u। u থেকে একটি সবচেয়ে ছোট পথের ট্রি (ট্রি বরাবর দূরত্ব আসল দূরত্বের সমান) বের করুন যার মোট ওজন সর্বনিম্ন। ওজন আর প্রান্তের ইনডেক্স প্রিন্ট করুন।'),
  input: L('n m, the edges, then u.', 'n m, প্রান্তগুলো, তারপর u।'),
  output: L('The total weight, then n − 1 edge indices.', 'মোট ওজন, তারপর n − ১টি প্রান্তের ইনডেক্স।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n, m ≤ 3·10⁵', 'n, m ≤ ৩·১০⁵'), anyAnswer] },
  samples: [
    { input: '3 3\n1 2 1\n2 3 1\n1 3 2\n3', output: '2\n1 2', explain: L('From 3: edges 2 (3–2) and 1 (2–1), weight 2.', '৩ থেকে: প্রান্ত ২ (৩–২) আর ১ (২–১), ওজন ২।') },
    { input: '4 4\n1 2 1\n2 3 1\n3 4 1\n4 1 2\n4', output: '4\n2 3 4', explain: L('From 4: vertex 3 via edge 3, vertex 2 via edge 2, vertex 1 via edge 4 (the path 4–3–2–1 would be longer).', '৪ থেকে: শীর্ষ ৩ প্রান্ত ৩ দিয়ে, শীর্ষ ২ প্রান্ত ২ দিয়ে, শীর্ষ ১ প্রান্ত ৪ দিয়ে (৪–৩–২–১ পথ লম্বা হতো)।') },
  ],
  observation: L('Every vertex v ≠ u needs exactly one parent edge, and any tight edge (dist[x] + w = dist[v]) is allowed; the choices are independent. So pick the lightest tight edge into each vertex.', 'u ছাড়া প্রতিটি শীর্ষ v-এর ঠিক একটি parent প্রান্ত লাগে, আর যেকোনো টাইট প্রান্ত (dist[x] + w = dist[v]) অনুমোদিত; বাছাইগুলো স্বাধীন। তাই প্রতিটি শীর্ষে সবচেয়ে হালকা টাইট প্রান্ত বাছুন।'),
  approach: [L('Dijkstra, then for each edge check both directions for tightness and keep the cheapest per vertex.', 'ডাইকস্ট্রা, তারপর প্রতিটি প্রান্তের দুই দিকে টাইটনেস যাচাই করে প্রতি শীর্ষে সবচেয়ে সস্তাটি রাখা।')],
  walkthrough: { input: 'sample 2 from 4', steps: [{ state: 'dist: 4→0, 3→1, 1→2, 2→2', text: L('Tight edges: 3 into 3, 2 into 2, 4 into 1; total 1 + 1 + 2 = 4.', 'টাইট প্রান্ত: ৩-এ ৩, ২-এ ২, ১-এ ৪; মোট ১ + ১ + ২ = ৪।') }] },
  complexity: { time: 'O(m log n)', space: 'O(n + m)', why: L('One Dijkstra and one edge scan.', 'একটি ডাইকস্ট্রা আর একটি প্রান্ত স্ক্যান।') },
  solutions: [
    {
      id: 'cheapest-tight',
      kind: 'optimal',
      title: L('Cheapest tight edge per vertex', 'প্রতি শীর্ষে সবচেয়ে সস্তা টাইট প্রান্ত'),
      idea: L('Independent choices.', 'স্বাধীন বাছাই।'),
      explain: [L('Because weights are positive, tight edges always go from smaller to larger distance, so the chosen parents cannot form a cycle: the result is a tree.', 'ওজন ধনাত্মক বলে টাইট প্রান্ত সবসময় ছোট থেকে বড় দূরত্বে যায়, তাই বাছা parent-রা চক্র গঠন করতে পারে না: ফল একটি ট্রি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<array<long long, 3>> e(m);
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        long long a, b, w;
        scanf("%lld %lld %lld", &a, &b, &w);
        e[i] = {a, b, w};
        adj[a].push_back({(int)b, i});
        adj[b].push_back({(int)a, i});
    }
    int u;
    scanf("%d", &u);
    vector<long long> dist(n + 1, LLONG_MAX);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[u] = 0;
    pq.push({0, u});
    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d != dist[v]) continue;
        for (auto [x, id] : adj[v])
            if (d + e[id][2] < dist[x]) { dist[x] = d + e[id][2]; pq.push({dist[x], x}); }
    }
    vector<int> best(n + 1, -1);
    for (int i = 0; i < m; i++) {
        auto [a, b, w] = e[i];
        for (int t = 0; t < 2; t++, swap(a, b))
            if (dist[a] + w == dist[b] && (best[b] == -1 || w < e[best[b]][2])) best[b] = i;
    }
    long long total = 0;
    for (int v = 1; v <= n; v++) if (v != u) total += e[best[v]][2];
    printf("%lld\n", total);
    for (int v = 1; v <= n; v++) if (v != u) printf("%d ", best[v] + 1);
    printf("\n");
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long'],
    },
    {
      id: 'tiebreak',
      kind: 'alt',
      title: L('Dijkstra with a tie-break on the last edge', 'শেষ প্রান্তে সমতা-ভাঙাসহ ডাইকস্ট্রা'),
      idea: L('Relax also when the distance ties but the last edge is lighter.', 'দূরত্ব সমান কিন্তু শেষ প্রান্ত হালকা হলেও শিথিল করা।'),
      explain: [L('Keep (dist, weight of parent edge) for each vertex and update the parent when the distance is equal but the edge is cheaper. The parent choice does not affect anyone’s distance, so it is safe to change late.', 'প্রতিটি শীর্ষে (দূরত্ব, parent প্রান্তের ওজন) রাখুন আর দূরত্ব সমান কিন্তু প্রান্ত সস্তা হলে parent হালনাগাদ করুন। parent বাছাই কারো দূরত্বে প্রভাব ফেলে না, তাই দেরিতে বদলানো নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<array<long long, 3>>> adj(n + 1);  // (to, w, id)
    for (int i = 1; i <= m; i++) {
        long long a, b, w;
        scanf("%lld %lld %lld", &a, &b, &w);
        adj[a].push_back({b, w, i});
        adj[b].push_back({a, w, i});
    }
    int u;
    scanf("%d", &u);
    vector<long long> dist(n + 1, LLONG_MAX), pw(n + 1, 0);
    vector<int> pid(n + 1, 0);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[u] = 0;
    pq.push({0, u});
    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d != dist[v]) continue;
        for (auto [x, w, id] : adj[v]) {
            if (d + w < dist[x]) { dist[x] = d + w; pw[x] = w; pid[x] = id; pq.push({dist[x], (int)x}); }
            else if (d + w == dist[x] && w < pw[x]) { pw[x] = w; pid[x] = id; }
        }
    }
    long long total = 0;
    for (int v = 1; v <= n; v++) if (v != u) total += pw[v];
    printf("%lld\n", total);
    for (int v = 1; v <= n; v++) if (v != u) printf("%d ", pid[v]);
    printf("\n");
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long'],
    },
  ],
  tests: [
    { input: '3 3\n1 2 1\n2 3 1\n1 3 2\n3', output: '2\n1 2', source: 'sample', note: sample(1) },
    { input: '4 4\n1 2 1\n2 3 1\n3 4 1\n4 1 2\n4', output: '4\n2 3 4', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Taking the parent found first by Dijkstra.', 'ডাইকস্ট্রা প্রথমে যে parent পায় সেটি নেওয়া।')],
  related: [{ id: '449B', name: 'Jzzhu and Cities', why: L('Tight edges after Dijkstra.', 'ডাইকস্ট্রার পরে টাইট প্রান্ত।') }],
  toolkit: ['priority-queue'],
};

export const p1076D: ProblemEntry = {
  id: '1076D',
  contestId: 1076,
  index: 'D',
  name: 'Edge Deletion',
  rating: 1800,
  tags: ['graphs', 'greedy', 'shortest-paths'],
  why: L('Keep the parent edges of the first k vertices settled by Dijkstra: each keeps one more vertex good.', 'ডাইকস্ট্রার প্রথম k-টি স্থির শীর্ষের parent প্রান্ত রাখুন: প্রতিটি আরও একটি শীর্ষকে ভালো রাখে।'),
  statement: L('Keep at most k edges of a weighted graph so that as many vertices as possible keep their shortest distance from vertex 1 (“good” vertices). Print the kept edges.', 'একটি ওজনযুক্ত গ্রাফের সর্বোচ্চ k-টি প্রান্ত রাখুন যাতে যত বেশি সম্ভব শীর্ষ শীর্ষ ১ থেকে তাদের সবচেয়ে ছোট দূরত্ব রাখে (“ভালো” শীর্ষ)। রাখা প্রান্তগুলো প্রিন্ট করুন।'),
  input: L('n m k, then m edges.', 'n m k, তারপর m-টি প্রান্ত।'),
  output: L('The number of kept edges, then their indices.', 'রাখা প্রান্তের সংখ্যা, তারপর তাদের ইনডেক্স।'),
  limits: { timeSec: 2.5, memoryMb: 256, notes: [L('n, m ≤ 3·10⁵', 'n, m ≤ ৩·১০⁵'), anyAnswer] },
  samples: [
    { input: '3 3 2\n1 2 1\n3 2 1\n1 3 3', output: '2\n1 2', explain: L('Path 1–2–3 keeps all three vertices good.', 'পথ ১–২–৩ তিনটি শীর্ষকেই ভালো রাখে।') },
    { input: '4 5 2\n4 1 8\n2 4 1\n2 1 3\n3 4 9\n3 1 5', output: '2\n3 2', explain: L('Edges 1–2 and 2–4 make 1, 2, 4 good.', 'প্রান্ত ১–২ আর ২–৪ ১, ২, ৪-কে ভালো করে।') },
  ],
  observation: L('With e kept edges at most e + 1 vertices can be good, since good vertices other than 1 each need an incoming tight edge. Dijkstra settles vertices in distance order and each settled vertex’s parent was settled earlier, so the first k settled vertices’ parent edges keep exactly min(k, n − 1) + 1 vertices good.', 'e-টি রাখা প্রান্তে সর্বোচ্চ e + ১টি শীর্ষ ভালো হতে পারে, কারণ ১ ছাড়া প্রতিটি ভালো শীর্ষের একটি আগত টাইট প্রান্ত লাগে। ডাইকস্ট্রা দূরত্বের ক্রমে শীর্ষ স্থির করে আর প্রতিটি স্থির শীর্ষের parent আগে স্থির, তাই প্রথম k-টি স্থির শীর্ষের parent প্রান্ত ঠিক min(k, n − ১) + ১টি শীর্ষ ভালো রাখে।'),
  approach: [L('Dijkstra recording the parent edge; output parents in settle order.', 'parent প্রান্ত লিখে ডাইকস্ট্রা; স্থির হওয়ার ক্রমে parent প্রিন্ট।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'settle 1, 2 (via edge 3), 4 (via edge 2), 3', text: L('k = 2: edges 3 and 2.', 'k = ২: প্রান্ত ৩ আর ২।') }] },
  complexity: { time: 'O(m log n)', space: 'O(n + m)', why: L('One Dijkstra.', 'একটি ডাইকস্ট্রা।') },
  solutions: [
    {
      id: 'settle-order',
      kind: 'optimal',
      title: L('Parents in Dijkstra settle order', 'ডাইকস্ট্রার স্থির-ক্রমে parent'),
      idea: L('A prefix of the settle order is closed under parents.', 'স্থির-ক্রমের একটি প্রিফিক্স parent-এর অধীনে বদ্ধ।'),
      explain: [L('The shortest-path tree is built incrementally by Dijkstra; any prefix of it is still a tree containing vertex 1 with correct distances.', 'ডাইকস্ট্রা ধাপে ধাপে সবচেয়ে ছোট পথের ট্রি বানায়; এর যেকোনো প্রিফিক্স তখনও সঠিক দূরত্বসহ শীর্ষ ১ ধারণকারী একটি ট্রি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<vector<array<long long, 3>>> adj(n + 1);
    for (int i = 1; i <= m; i++) {
        long long a, b, w;
        scanf("%lld %lld %lld", &a, &b, &w);
        adj[a].push_back({b, w, i});
        adj[b].push_back({a, w, i});
    }
    vector<long long> dist(n + 1, LLONG_MAX);
    vector<int> pe(n + 1, 0), kept;
    vector<bool> done(n + 1, false);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[1] = 0;
    pq.push({0, 1});
    while (!pq.empty() && (int)kept.size() < k) {
        auto [d, v] = pq.top();
        pq.pop();
        if (done[v]) continue;
        done[v] = true;
        if (v != 1) kept.push_back(pe[v]);
        for (auto [x, w, id] : adj[v])
            if (d + w < dist[x]) { dist[x] = d + w; pe[x] = id; pq.push({dist[x], (int)x}); }
    }
    printf("%d\n", (int)kept.size());
    for (int id : kept) printf("%d ", id);
    printf("\n");
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'long-long'],
    },
    {
      id: 'sort-by-dist',
      kind: 'alt',
      title: L('Sort vertices by distance', 'দূরত্ব অনুযায়ী শীর্ষ সর্ট'),
      idea: L('After a full Dijkstra, take the k nearest vertices’ parent edges.', 'পূর্ণ ডাইকস্ট্রার পরে সবচেয়ে কাছের k-টি শীর্ষের parent প্রান্ত নিন।'),
      explain: [L('With positive weights a parent is strictly closer than its child, so any distance-sorted prefix also contains every needed parent. Ties are broken by index; the checker accepts any valid set.', 'ধনাত্মক ওজনে parent তার সন্তানের চেয়ে কঠোরভাবে কাছে, তাই দূরত্ব-সাজানো যেকোনো প্রিফিক্সে প্রতিটি প্রয়োজনীয় parent থাকে। সমতা ইনডেক্সে ভাঙা হয়; চেকার যেকোনো বৈধ সেট গ্রহণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<vector<array<long long, 3>>> adj(n + 1);
    for (int i = 1; i <= m; i++) {
        long long a, b, w;
        scanf("%lld %lld %lld", &a, &b, &w);
        adj[a].push_back({b, w, i});
        adj[b].push_back({a, w, i});
    }
    vector<long long> dist(n + 1, LLONG_MAX);
    vector<int> pe(n + 1, 0);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d != dist[v]) continue;
        for (auto [x, w, id] : adj[v])
            if (d + w < dist[x]) { dist[x] = d + w; pe[x] = id; pq.push({dist[x], (int)x}); }
    }
    vector<int> order;
    for (int v = 2; v <= n; v++) order.push_back(v);
    sort(order.begin(), order.end(), [&](int a, int b) { return dist[a] < dist[b]; });
    int e = min(k, n - 1);
    printf("%d\n", e);
    for (int i = 0; i < e; i++) printf("%d ", pe[order[i]]);
    printf("\n");
    return 0;
}
`,
      time: 'O(m log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'sort', 'lambda'],
    },
  ],
  tests: [
    { input: '3 3 2\n1 2 1\n3 2 1\n1 3 3', output: '2\n1 2', source: 'sample', note: sample(1) },
    { input: '4 5 2\n4 1 8\n2 4 1\n2 1 3\n3 4 9\n3 1 5', output: '2\n3 2', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Keeping edges whose parent vertex is not kept.', 'যে প্রান্তের parent শীর্ষ রাখা নয় তা রাখা।')],
  related: [{ id: '545E', name: 'Paths and Trees', why: L('Shortest-path trees.', 'সবচেয়ে ছোট পথের ট্রি।') }],
  toolkit: ['priority-queue'],
};

export const p1307D: ProblemEntry = {
  id: '1307D',
  contestId: 1307,
  index: 'D',
  name: 'Cow and Fields',
  rating: 1900,
  tags: ['binary-search', 'data-structures', 'dfs', 'graphs', 'greedy', 'shortest-paths', 'sortings'],
  why: L('BFS from both ends, then a sorting trick to maximise a min of two sums over pairs.', 'দুই প্রান্ত থেকে BFS, তারপর জোড়ার ওপর দুটি যোগফলের min সর্বোচ্চ করার সর্টিং কৌশল।'),
  statement: L('An unweighted graph with special fields. Add one road between two different special fields to maximise the shortest distance from 1 to n. Print that distance.', 'বিশেষ মাঠসহ একটি ওজনহীন গ্রাফ। দুটি আলাদা বিশেষ মাঠের মাঝে একটি রাস্তা যোগ করে ১ থেকে n-এর সবচেয়ে ছোট দূরত্ব সর্বোচ্চ করুন। সেই দূরত্ব প্রিন্ট করুন।'),
  input: L('n m k, the special fields, then m edges.', 'n m k, বিশেষ মাঠগুলো, তারপর m-টি প্রান্ত।'),
  output: L('The maximum shortest distance.', 'সর্বোচ্চ সবচেয়ে ছোট দূরত্ব।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵', 'n, m ≤ ২·১০⁵')] },
  samples: [
    { input: '5 5 3\n1 3 5\n1 2\n2 3\n3 4\n3 5\n2 4', output: '3', explain: L('Join 3 and 5: distance stays 3.', '৩ আর ৫ যুক্ত: দূরত্ব ৩ থাকে।') },
    { input: '5 4 2\n2 4\n1 2\n2 3\n3 4\n4 5', output: '3', explain: L('Join 2 and 4: 1–2–4–5.', '২ আর ৪ যুক্ত: ১–২–৪–৫।') },
  ],
  observation: L('With d₁ and dₙ from two BFS, adding (a, b) gives min(d₁[n], d₁[a] + 1 + dₙ[b], d₁[b] + 1 + dₙ[a]). Sort specials by d₁ − dₙ; for a before b in that order, d₁[a] + dₙ[b] ≤ d₁[b] + dₙ[a], so the inner min is d₁[a] + 1 + dₙ[b]. Keep the best d₁ among earlier specials.', 'দুটি BFS থেকে d₁ আর dₙ নিয়ে (a, b) যোগ করলে পাওয়া যায় min(d₁[n], d₁[a] + ১ + dₙ[b], d₁[b] + ১ + dₙ[a])। বিশেষগুলো d₁ − dₙ দিয়ে সর্ট করুন; সেই ক্রমে a, b-এর আগে হলে d₁[a] + dₙ[b] ≤ d₁[b] + dₙ[a], তাই ভেতরের min হলো d₁[a] + ১ + dₙ[b]। আগের বিশেষগুলোর মধ্যে সেরা d₁ রাখুন।'),
  approach: [L('Two BFS, sort, one scan; answer min(d₁[n], best).', 'দুটি BFS, সর্ট, একটি স্ক্যান; উত্তর min(d₁[n], সেরা)।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'd₁: 2→1, 4→3; dₙ: 2→3, 4→1', text: L('Order 2, 4: d₁[2] + 1 + dₙ[4] = 3.', 'ক্রম ২, ৪: d₁[২] + ১ + dₙ[৪] = ৩।') }] },
  complexity: { time: 'O(n + m + k log k)', space: 'O(n + m)', why: L('Two BFS and a sort.', 'দুটি BFS আর একটি সর্ট।') },
  solutions: [
    {
      id: 'sorted',
      kind: 'optimal',
      title: L('Sort by d₁ − dₙ', 'd₁ − dₙ দিয়ে সর্ট'),
      idea: L('The order fixes which term of the min is active.', 'ক্রম ঠিক করে min-এর কোন পদ সক্রিয়।'),
      explain: [L('“Maximise over pairs of min(x_a + y_b, x_b + y_a)” is a recurring pattern; sorting by x − y removes the min.', '“জোড়ার ওপর min(x_a + y_b, x_b + y_a) সর্বোচ্চ” একটি বারবার আসা প্যাটার্ন; x − y দিয়ে সর্ট করলে min দূর হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int s) {
    vector<int> d(adj.size(), -1);
    queue<int> q;
    q.push(s);
    d[s] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
    }
    return d;
}

int main() {
    int n, m, k;
    scanf("%d %d %d", &n, &m, &k);
    vector<int> sp(k);
    for (auto& x : sp) scanf("%d", &x);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> d1 = bfs(adj, 1), dn = bfs(adj, n);
    sort(sp.begin(), sp.end(), [&](int a, int b) { return d1[a] - dn[a] < d1[b] - dn[b]; });
    int best = 0, maxD1 = INT_MIN;
    for (int b : sp) {
        if (maxD1 != INT_MIN) best = max(best, maxD1 + 1 + dn[b]);
        maxD1 = max(maxD1, d1[b]);
    }
    printf("%d\n", min(d1[n], best));
    return 0;
}
`,
      time: 'O(n + m + k log k)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'sort', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every pair of specials', 'বিশেষের প্রতিটি জোড়া চেষ্টা'),
      idea: L('O(k²) with the same BFS distances.', 'একই BFS দূরত্ব দিয়ে O(k²)।'),
      explain: [L('Evaluates the formula for every pair. Too slow for k = 2·10⁵, but it shows what the sort is optimising.', 'প্রতিটি জোড়ায় সূত্রটি মূল্যায়ন করে। k = ২·১০⁵-এ খুব ধীর, কিন্তু দেখায় সর্ট কী সর্বোচ্চ করছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> sp(k);
    for (auto& x : sp) cin >> x;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    auto bfs = [&](int s) {
        vector<int> d(n + 1, -1);
        queue<int> q;
        q.push(s);
        d[s] = 0;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
        }
        return d;
    };
    vector<int> d1 = bfs(1), dn = bfs(n);
    int best = 0;
    for (int i = 0; i < k; i++)
        for (int j = i + 1; j < k; j++) {
            int a = sp[i], b = sp[j];
            best = max(best, min(d1[a] + 1 + dn[b], d1[b] + 1 + dn[a]));
        }
    cout << min(d1[n], best) << "\n";
    return 0;
}
`,
      time: 'O(n + m + k²)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['lambda', 'min-max'],
    },
  ],
  tests: [
    { input: '5 5 3\n1 3 5\n1 2\n2 3\n3 4\n3 5\n2 4', output: '3', source: 'sample', note: sample(1) },
    { input: '5 4 2\n2 4\n1 2\n2 3\n3 4\n4 5', output: '3', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Forgetting that the new road can never increase the distance beyond d₁[n].', 'নতুন রাস্তা দূরত্বকে কখনো d₁[n]-এর বেশি করতে পারে না তা ভুলে যাওয়া।')],
  related: [{ id: '601A', name: 'The Two Routes', why: L('BFS distances from endpoints.', 'প্রান্তবিন্দু থেকে BFS দূরত্ব।') }],
  toolkit: ['stack-queue'],
};

export const p1320B: ProblemEntry = {
  id: '1320B',
  contestId: 1320,
  index: 'B',
  name: 'Navigation System',
  rating: 1700,
  tags: ['dfs', 'graphs', 'shortest-paths'],
  why: L('BFS from the target on reversed edges tells which moves are shortest, and how many shortest choices each vertex has.', 'উল্টো প্রান্তে লক্ষ্য থেকে BFS বলে কোন চাল সবচেয়ে ছোট, আর প্রতিটি শীর্ষের কয়টি সবচেয়ে ছোট বিকল্প আছে।'),
  statement: L(
    'A directed graph and a fixed path p₁ … p_k to t = p_k. At every vertex the navigator shows some shortest path to t; if Polycarp leaves it, the navigator rebuilds. Find the minimum and maximum possible number of rebuilds.',
    'একটি নির্দেশিত গ্রাফ আর t = p_k পর্যন্ত একটি নির্দিষ্ট পথ p₁ … p_k। প্রতিটি শীর্ষে নেভিগেটর t পর্যন্ত কোনো সবচেয়ে ছোট পথ দেখায়; পলিকার্প সেটি ছাড়লে নেভিগেটর আবার বানায়। আবার বানানোর সর্বনিম্ন আর সর্বোচ্চ সম্ভাব্য সংখ্যা বের করুন।',
  ),
  input: L('n m, the edges, k, then the path.', 'n m, প্রান্তগুলো, k, তারপর পথ।'),
  output: L('min max.', 'min max।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('n, m ≤ 2·10⁵', 'n, m ≤ ২·১০⁵')] },
  samples: [
    { input: '6 9\n1 5\n5 4\n1 2\n2 3\n3 4\n4 1\n2 6\n6 4\n4 2\n4\n1 2 3 4', output: '1 2', explain: L('1 → 2 is not shortest (rebuild); at 2 two shortest moves exist.', '১ → ২ সবচেয়ে ছোট নয় (আবার বানানো); ২-এ দুটি সবচেয়ে ছোট চাল আছে।') },
    { input: '7 7\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 1\n7\n1 2 3 4 5 6 7', output: '0 0', explain: L('The only path.', 'একমাত্র পথ।') },
    { input: '8 13\n8 7\n8 6\n7 5\n7 4\n6 5\n6 4\n5 3\n5 2\n4 3\n4 2\n3 1\n2 1\n1 8\n5\n8 7 5 2 1', output: '0 3', explain: L('Every step is shortest but has an alternative.', 'প্রতিটি ধাপ সবচেয়ে ছোট কিন্তু বিকল্প আছে।') },
  ],
  observation: L('Let d[v] be the distance from v to t (BFS on reversed edges). A step pᵢ → pᵢ₊₁ with d[pᵢ₊₁] ≠ d[pᵢ] − 1 always forces a rebuild. A shortest step forces one only in the worst case, when pᵢ has another neighbour u with d[u] = d[pᵢ] − 1.', 'd[v] হলো v থেকে t-এর দূরত্ব (উল্টো প্রান্তে BFS)। d[pᵢ₊₁] ≠ d[pᵢ] − ১ এমন ধাপ pᵢ → pᵢ₊₁ সবসময় আবার বানাতে বাধ্য করে। একটি সবচেয়ে ছোট ধাপ শুধু সবচেয়ে খারাপ ক্ষেত্রে বাধ্য করে, যখন pᵢ-এর d[u] = d[pᵢ] − ১ এমন আরেকটি প্রতিবেশী u আছে।'),
  approach: [L('Reverse BFS from t; count shortest successors of each vertex; scan the path.', 't থেকে উল্টো BFS; প্রতিটি শীর্ষের সবচেয়ে ছোট উত্তরসূরি গুনুন; পথ স্ক্যান।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'd: 1→2, 2→2, 3→1, 4→0', text: L('1→2 not shortest: +1 both. 2→3 shortest, 2 also has 6: max +1. 3→4 unique. 1 2.', '১→২ সবচেয়ে ছোট নয়: দুটিতেই +১। ২→৩ সবচেয়ে ছোট, ২-এর ৬-ও আছে: max +১। ৩→৪ অনন্য। ১ ২।') }] },
  complexity: { time: 'O(n + m)', space: 'O(n + m)', why: L('One BFS and one scan.', 'একটি BFS আর একটি স্ক্যান।') },
  solutions: [
    {
      id: 'reverse-bfs',
      kind: 'optimal',
      title: L('Reverse BFS + shortest-successor counts', 'উল্টো BFS + সবচেয়ে ছোট উত্তরসূরির গণনা'),
      idea: L('Count, for each vertex, outgoing edges into distance − 1.', 'প্রতিটি শীর্ষের জন্য দূরত্ব − ১-এ বহির্গামী প্রান্ত গুনুন।'),
      explain: [L('Distances to a single target come from one BFS on the reversed graph, the mirror of the usual single-source BFS.', 'একটি একক লক্ষ্যের দূরত্ব আসে উল্টো গ্রাফে একটি BFS থেকে, প্রচলিত একক-উৎস BFS-এর আয়না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        g[u].push_back(v);
        rg[v].push_back(u);
    }
    int k;
    scanf("%d", &k);
    vector<int> p(k);
    for (auto& x : p) scanf("%d", &x);
    int t = p[k - 1];
    vector<int> d(n + 1, -1);
    queue<int> q;
    q.push(t);
    d[t] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int u : rg[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
    }
    vector<int> ways(n + 1, 0);
    for (int v = 1; v <= n; v++) for (int u : g[v]) if (d[u] != -1 && d[u] == d[v] - 1) ways[v]++;
    int lo = 0, hi = 0;
    for (int i = 0; i + 1 < k; i++) {
        if (d[p[i + 1]] != d[p[i]] - 1) { lo++; hi++; }
        else if (ways[p[i]] > 1) hi++;
    }
    printf("%d %d\n", lo, hi);
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Simulate the navigator', 'নেভিগেটর সিমুলেশন'),
      idea: L('Track the vertex the navigator currently suggests, choosing it adversarially for the maximum and favourably for the minimum.', 'নেভিগেটর এখন যে শীর্ষ প্রস্তাব করে তা রাখা, সর্বোচ্চের জন্য প্রতিকূলভাবে আর সর্বনিম্নের জন্য অনুকূলভাবে বেছে।'),
      explain: [L('At each vertex the navigator suggests some shortest successor: for the minimum it suggests our next vertex whenever that is shortest, for the maximum any other shortest successor. Counting mismatches gives both numbers.', 'প্রতিটি শীর্ষে নেভিগেটর কোনো সবচেয়ে ছোট উত্তরসূরি প্রস্তাব করে: সর্বনিম্নের জন্য আমাদের পরের শীর্ষ সবচেয়ে ছোট হলে সেটিই প্রস্তাব করে, সর্বোচ্চের জন্য অন্য যেকোনো সবচেয়ে ছোট উত্তরসূরি। অমিল গুনলে দুটি সংখ্যাই আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1), rg(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        rg[v].push_back(u);
    }
    int k;
    cin >> k;
    vector<int> p(k);
    for (auto& x : p) cin >> x;
    vector<int> d(n + 1, -1);
    queue<int> q;
    q.push(p[k - 1]);
    d[p[k - 1]] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int u : rg[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
    }
    int lo = 0, hi = 0;
    for (int i = 0; i + 1 < k; i++) {
        int v = p[i], nxt = p[i + 1];
        int friendly = -1, hostile = -1;  // suggestion for min / max
        for (int u : g[v]) {
            if (d[u] != d[v] - 1) continue;
            if (u == nxt) friendly = u;
            else hostile = u;
        }
        if (friendly == -1) friendly = hostile;
        if (hostile == -1) hostile = friendly;
        if (friendly != nxt) lo++;
        if (hostile != nxt) hi++;
    }
    cout << lo << " " << hi << "\n";
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [
    { input: '6 9\n1 5\n5 4\n1 2\n2 3\n3 4\n4 1\n2 6\n6 4\n4 2\n4\n1 2 3 4', output: '1 2', source: 'sample', note: sample(1) },
    { input: '7 7\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 1\n7\n1 2 3 4 5 6 7', output: '0 0', source: 'sample', note: sample(2) },
    { input: '8 13\n8 7\n8 6\n7 5\n7 4\n6 5\n6 4\n5 3\n5 2\n4 3\n4 2\n3 1\n2 1\n1 8\n5\n8 7 5 2 1', output: '0 3', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('BFS from the start instead of from the target.', 'লক্ষ্যের বদলে শুরু থেকে BFS।')],
  related: [{ id: '1307D', name: 'Cow and Fields', why: L('BFS from the far end.', 'দূর প্রান্ত থেকে BFS।') }],
  toolkit: ['stack-queue'],
};

export const p1611E1: ProblemEntry = {
  id: '1611E1',
  contestId: 1611,
  index: 'E1',
  name: 'Escape The Maze (easy version)',
  rating: 1700,
  tags: ['dfs', 'greedy', 'shortest-paths', 'trees', 'two-pointers'],
  why: L('Multi-source BFS: a leaf is safe for Vlad iff he reaches it strictly before every friend.', 'বহু-উৎস BFS: একটি পাতা ভ্লাদের জন্য নিরাপদ ঠিক তখনই যখন সে প্রতিটি বন্ধুর আগে সেখানে পৌঁছায়।'),
  statement: L('A tree; Vlad starts at room 1 and k friends at rooms xᵢ. Each turn everyone moves along an edge or stays. Vlad wins if he reaches a leaf (other than room 1) without ever meeting a friend in a room or on an edge. Can he guarantee a win? There are t test cases.', 'একটি ট্রি; ভ্লাদ ঘর ১-এ আর k-জন বন্ধু ঘর xᵢ-এ শুরু করে। প্রতি পালায় সবাই একটি প্রান্ত ধরে সরে বা থাকে। ভ্লাদ জেতে যদি কোনো ঘরে বা প্রান্তে বন্ধুর সঙ্গে না মিলে একটি পাতায় (ঘর ১ ছাড়া) পৌঁছায়। সে কি জয় নিশ্চিত করতে পারে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n k, the friends, and n − 1 edges.', 't; প্রতিটি টেস্টে n k, বন্ধুরা, আর n − ১টি প্রান্ত।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '4\n\n8 2\n5 3\n4 7\n2 5\n1 6\n3 6\n7 2\n1 7\n6 8\n\n3 1\n2\n1 2\n2 3\n\n3 1\n2\n1 2\n1 3\n\n3 2\n2 3\n3 1\n1 2', output: 'YES\nNO\nYES\nNO', explain: L('Third test: Vlad runs to leaf 3 while the friend sits at leaf 2.', 'তৃতীয় টেস্ট: বন্ধু পাতা ২-এ বসে থাকার সময় ভ্লাদ পাতা ৩-এ দৌড়ায়।') }],
  observation: L('A friend intercepts Vlad at vertex v iff the friend can reach v no later than Vlad. So compute dF (multi-source BFS from all friends) and dV (BFS from 1); Vlad wins iff some leaf v ≠ 1 is reachable through vertices with dV < dF — and since dV < dF along the tree path is monotone, it suffices that the leaf itself has dV[v] < dF[v].', 'একজন বন্ধু ভ্লাদকে শীর্ষ v-তে ধরে ঠিক তখনই যখন বন্ধু ভ্লাদের চেয়ে দেরিতে না এসে v-তে পৌঁছাতে পারে। তাই dF (সব বন্ধু থেকে বহু-উৎস BFS) আর dV (১ থেকে BFS) হিসাব করুন; ভ্লাদ জেতে ঠিক তখনই যখন কোনো পাতা v ≠ ১-এ dV[v] < dF[v]।'),
  approach: [L('Two BFS; check leaves.', 'দুটি BFS; পাতা যাচাই।')],
  walkthrough: { input: 'test 2 (path 1–2–3, friend at 2)', steps: [{ state: 'leaf 3: dV = 2, dF = 1', text: L('Friend is closer: NO.', 'বন্ধু কাছে: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two BFS.', 'দুটি BFS।') },
  solutions: [
    {
      id: 'two-bfs',
      kind: 'optimal',
      title: L('Multi-source BFS from friends', 'বন্ধুদের থেকে বহু-উৎস BFS'),
      idea: L('Push all friends into the queue at distance 0.', 'সব বন্ধুকে দূরত্ব ০-তে কিউতে রাখা।'),
      explain: [L('Multi-source BFS computes, for every vertex, the distance to the nearest source in one pass. If a vertex on Vlad’s path were reachable by a friend first, the friend could also reach the leaf no later than Vlad, so checking leaves is enough.', 'বহু-উৎস BFS প্রতিটি শীর্ষের জন্য সবচেয়ে কাছের উৎসের দূরত্ব একবারে হিসাব করে। ভ্লাদের পথের কোনো শীর্ষে বন্ধু আগে পৌঁছাতে পারলে বন্ধু পাতাতেও ভ্লাদের আগে বা একসঙ্গে পৌঁছাতে পারত, তাই পাতা যাচাই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        vector<int> fr(k);
        for (auto& x : fr) scanf("%d", &x);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        auto bfs = [&](vector<int> src) {
            vector<int> d(n + 1, -1);
            queue<int> q;
            for (int s : src) { d[s] = 0; q.push(s); }
            while (!q.empty()) {
                int v = q.front();
                q.pop();
                for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
            }
            return d;
        };
        vector<int> dF = bfs(fr), dV = bfs({1});
        bool win = false;
        for (int v = 2; v <= n; v++) if (adj[v].size() == 1 && dV[v] < dF[v]) win = true;
        puts(win ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Walk only through safe vertices', 'শুধু নিরাপদ শীর্ষ দিয়ে হাঁটা'),
      idea: L('DFS from 1 entering a vertex only if dV < dF there; win if a leaf is reached.', '১ থেকে DFS, শুধু সেখানে dV < dF হলে শীর্ষে ঢোকা; পাতায় পৌঁছালে জয়।'),
      explain: [L('This follows Vlad’s actual escape route instead of only testing leaves, so it does not rely on the monotonicity argument.', 'এটি শুধু পাতা পরীক্ষার বদলে ভ্লাদের আসল পালানোর পথ অনুসরণ করে, তাই একমুখিতার যুক্তির ওপর নির্ভর করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<int> fr(k);
        for (auto& x : fr) cin >> x;
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            cin >> a >> b;
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        vector<int> dF(n + 1, -1), dV(n + 1, -1);
        queue<int> q;
        for (int s : fr) { dF[s] = 0; q.push(s); }
        while (!q.empty()) { int v = q.front(); q.pop(); for (int u : adj[v]) if (dF[u] == -1) { dF[u] = dF[v] + 1; q.push(u); } }
        bool win = false;
        vector<int> st = {1};
        dV[1] = 0;
        while (!st.empty() && !win) {
            int v = st.back();
            st.pop_back();
            if (v != 1 && adj[v].size() == 1) win = true;
            for (int u : adj[v])
                if (dV[u] == -1 && dV[v] + 1 < dF[u]) { dV[u] = dV[v] + 1; st.push_back(u); }
        }
        cout << (win ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [{ input: '4\n\n8 2\n5 3\n4 7\n2 5\n1 6\n3 6\n7 2\n1 7\n6 8\n\n3 1\n2\n1 2\n2 3\n\n3 1\n2\n1 2\n1 3\n\n3 2\n2 3\n3 1\n1 2', output: 'YES\nNO\nYES\nNO', source: 'sample', note: sample(1) }],
  pitfalls: [L('Using ≤ instead of < (meeting at the same moment is a loss).', '<-এর বদলে ≤ (একই মুহূর্তে মিলন হার)।'), L('Counting room 1 as a leaf.', 'ঘর ১-কে পাতা ধরা।')],
  related: [{ id: '1404B', name: 'Tree Tag', why: L('Chases on trees.', 'ট্রিতে তাড়া।') }],
  toolkit: ['stack-queue'],
};

export const p1365D: ProblemEntry = {
  id: '1365D',
  contestId: 1365,
  index: 'D',
  name: 'Solve The Maze',
  rating: 1700,
  tags: ['constructive', 'dfs', 'dsu', 'graphs', 'greedy', 'implementation', 'shortest-paths'],
  why: L('Wall in every bad person greedily, then one BFS from the exit checks everyone else.', 'প্রতিটি খারাপ মানুষকে গ্রিডিভাবে দেয়ালে ঘিরে, তারপর প্রস্থান থেকে একটি BFS বাকি সবাইকে যাচাই করে।'),
  statement: L('An n × m grid of empty cells (.), walls (#), good people (G) and bad people (B); the exit cell (n, m) is empty. You may turn empty cells into walls. Is it possible that every good person can reach the exit (n, m) and no bad person can? There are t test cases.', 'খালি ঘর (.), দেয়াল (#), ভালো মানুষ (G) আর খারাপ মানুষ (B)-এর একটি n × m গ্রিড; প্রস্থান ঘর (n, m) খালি। খালি ঘরকে দেয়াল বানানো যায়। এমন কি সম্ভব যে প্রতিটি ভালো মানুষ প্রস্থান (n, m)-এ পৌঁছাতে পারে আর কোনো খারাপ মানুষ পারে না? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n m and the grid.', 't; প্রতিটি টেস্টে n m আর গ্রিড।'),
  output: L('Yes or No.', 'Yes অথবা No।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m ≤ 50', 'n, m ≤ ৫০')] },
  samples: [{ input: '6\n1 1\n.\n1 2\nG.\n2 2\n#B\nG.\n2 3\nG.#\nB#.\n3 3\n#B.\n#..\nGG.\n2 2\n#B\nB.', output: 'Yes\nYes\nNo\nNo\nYes\nYes', explain: L('Fourth test: G and B are adjacent and the G cannot reach the exit anyway.', 'চতুর্থ টেস্ট: G আর B পাশাপাশি আর G এমনিতেও প্রস্থানে পৌঁছাতে পারে না।') }],
  observation: L('Surround every B by turning its empty neighbours into walls — this never hurts a valid plan, since any path through those cells would let the B out too. If a B is adjacent to a G, it is impossible. Then BFS from the exit (if it is not a wall now): every G must be reached and no B can be. With no G at all, the answer is always Yes.', 'প্রতিটি B-কে তার খালি প্রতিবেশীগুলো দেয়াল বানিয়ে ঘিরে ফেলুন — এটি কখনো একটি বৈধ পরিকল্পনার ক্ষতি করে না, কারণ সেই ঘর দিয়ে যেকোনো পথ B-কেও বের হতে দিত। কোনো B কোনো G-এর পাশে হলে অসম্ভব। তারপর প্রস্থান থেকে BFS (যদি এখন দেয়াল না হয়): প্রতিটি G-তে পৌঁছাতে হবে আর কোনো B-তে নয়। কোনো G না থাকলে উত্তর সবসময় Yes।'),
  approach: [L('Block around B, BFS from (n, m), check.', 'B-এর চারপাশ বন্ধ, (n, m) থেকে BFS, যাচাই।')],
  walkthrough: { input: 'test 3', steps: [{ state: '#B / G.: block (2,2) next to B', text: L('Exit is now a wall but a G exists: No.', 'প্রস্থান এখন দেয়াল কিন্তু একটি G আছে: No।') }] },
  complexity: { time: 'O(n · m)', space: 'O(n · m)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'block-bfs',
      kind: 'optimal',
      title: L('Block around B, then BFS', 'B-এর চারপাশ বন্ধ, তারপর BFS'),
      idea: L('Greedy walls are safe.', 'গ্রিডি দেয়াল নিরাপদ।'),
      explain: [L('BFS from the single exit instead of from every person: reversing the direction turns many searches into one.', 'প্রতিটি মানুষ থেকে না করে একক প্রস্থান থেকে BFS: দিক উল্টালে অনেক খোঁজ একটিতে পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<string> g(n);
        for (auto& r : g) cin >> r;
        int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        bool ok = true;
        int goods = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                if (g[i][j] == 'G') goods++;
                if (g[i][j] != 'B') continue;
                for (int k = 0; k < 4; k++) {
                    int a = i + dr[k], b = j + dc[k];
                    if (a < 0 || a >= n || b < 0 || b >= m) continue;
                    if (g[a][b] == 'G') ok = false;
                    if (g[a][b] == '.') g[a][b] = '#';
                }
            }
        if (ok && goods > 0) {
            if (g[n - 1][m - 1] == '#') ok = false;
            else {
                vector<vector<bool>> seen(n, vector<bool>(m, false));
                queue<pair<int, int>> q;
                q.push({n - 1, m - 1});
                seen[n - 1][m - 1] = true;
                int reached = 0;
                while (!q.empty()) {
                    auto [i, j] = q.front();
                    q.pop();
                    if (g[i][j] == 'G') reached++;
                    if (g[i][j] == 'B') ok = false;
                    for (int k = 0; k < 4; k++) {
                        int a = i + dr[k], b = j + dc[k];
                        if (a < 0 || a >= n || b < 0 || b >= m || seen[a][b] || g[a][b] == '#') continue;
                        seen[a][b] = true;
                        q.push({a, b});
                    }
                }
                if (reached != goods) ok = false;
            }
        }
        cout << (ok ? "Yes" : "No") << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['stack-queue', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of extra walls', 'বাড়তি দেয়ালের প্রতিটি সেট চেষ্টা'),
      idea: L('For tiny grids, enumerate which empty cells become walls and test with BFS.', 'ক্ষুদ্র গ্রিডে কোন খালি ঘর দেয়াল হবে তা গণনা করে BFS দিয়ে পরীক্ষা।'),
      explain: [L('Exponential in the number of empty cells; it checks that the greedy walls never miss a solution.', 'খালি ঘরের সংখ্যায় সূচকীয়; এটি যাচাই করে গ্রিডি দেয়াল কখনো কোনো সমাধান বাদ দেয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<string> g(n);
        for (auto& r : g) cin >> r;
        vector<pair<int, int>> empty;
        for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) if (g[i][j] == '.') empty.push_back({i, j});
        if (empty.size() > 12) { cout << "\n"; continue; }
        bool any = false;
        for (int mask = 0; mask < (1 << empty.size()) && !any; mask++) {
            vector<string> h = g;
            for (size_t e = 0; e < empty.size(); e++) if (mask >> e & 1) h[empty[e].first][empty[e].second] = '#';
            vector<vector<bool>> seen(n, vector<bool>(m, false));
            if (h[n - 1][m - 1] != '#') {
                queue<pair<int, int>> q;
                q.push({n - 1, m - 1});
                seen[n - 1][m - 1] = true;
                while (!q.empty()) {
                    auto [i, j] = q.front();
                    q.pop();
                    int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
                    for (int k = 0; k < 4; k++) {
                        int a = i + dr[k], b = j + dc[k];
                        if (a < 0 || a >= n || b < 0 || b >= m || seen[a][b] || h[a][b] == '#') continue;
                        seen[a][b] = true;
                        q.push({a, b});
                    }
                }
            }
            bool ok = true;
            for (int i = 0; i < n; i++)
                for (int j = 0; j < m; j++) {
                    if (h[i][j] == 'G' && !seen[i][j]) ok = false;
                    if (h[i][j] == 'B' && seen[i][j]) ok = false;
                }
            any = ok;
        }
        cout << (any ? "Yes" : "No") << "\n";
    }
    return 0;
}
`,
      time: 'O(2^(empty) · n · m)',
      space: 'O(n · m)',
      accepted: false,
      toolkit: ['bit-shift', 'stack-queue'],
    },
  ],
  tests: [{ input: '6\n1 1\n.\n1 2\nG.\n2 2\n#B\nG.\n2 3\nG.#\nB#.\n3 3\n#B.\n#..\nGG.\n2 2\n#B\nB.', output: 'Yes\nYes\nNo\nNo\nYes\nYes', source: 'sample', note: sample(1) }],
  pitfalls: [L('Answering No when there are no good people but the exit gets blocked.', 'কোনো ভালো মানুষ না থাকলেও প্রস্থান বন্ধ হলে No উত্তর।')],
  related: [{ id: '1063B', name: 'Labyrinth', why: L('Grid BFS.', 'গ্রিড BFS।') }],
  toolkit: ['stack-queue'],
};
