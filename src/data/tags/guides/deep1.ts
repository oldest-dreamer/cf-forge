import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

// ───────────────────────────────────────────────────────── flows
export const flowsGuideDeep: TagGuide = {
  slug: 'flows',
  intro: [
    L(
      'A flow network is a directed graph whose edges have capacities, with a source s and a sink t. A flow sends stuff from s to t without exceeding any capacity, and without creating or losing stuff at the vertices in between. The maximum flow is the most you can send, and the max-flow min-cut theorem says it equals the capacity of the cheapest set of edges whose removal disconnects t from s. That second reading, “the cheapest way to cut”, is how most contest problems use flows.',
      'ফ্লো নেটওয়ার্ক হলো এমন নির্দেশিত গ্রাফ যার কিনারার ক্যাপাসিটি আছে, সাথে একটি সোর্স s ও একটি সিঙ্ক t। ফ্লো মানে s থেকে t-তে কিছু পাঠানো, কোনো ক্যাপাসিটি না ছাড়িয়ে, আর মাঝের শীর্ষে কিছু তৈরি বা হারিয়ে না ফেলে। সর্বোচ্চ ফ্লো হলো সর্বাধিক যতটা পাঠানো যায়, আর max-flow min-cut উপপাদ্য বলে এটি সবচেয়ে সস্তা সেই কিনারা-সেটের ক্যাপাসিটির সমান যাদের সরালে t, s থেকে বিচ্ছিন্ন হয়। এই দ্বিতীয় পাঠ, “কাটার সবচেয়ে সস্তা উপায়”, বেশিরভাগ কনটেস্ট সমস্যায় ব্যবহৃত হয়।',
    ),
    L(
      'The skill is modelling. A problem rarely says “flow”. It says “assign each A to a B”, “choose a set of things where picking one forces picking another”, “split into two groups with penalties”, or “find the cheapest way to move”. You decide what a unit of flow means, draw vertices and capacities, and the algorithm does the rest. The implementation is almost always Dinic’s algorithm, which is fast enough for graphs with tens of thousands of edges, and for unit-capacity or bipartite graphs it behaves like O(E√V).',
      'আসল দক্ষতা মডেলিং। সমস্যা খুব কমই “ফ্লো” বলে। সে বলে “প্রতিটি A-কে একটি B-তে বরাদ্দ করো”, “এমন জিনিসের সেট বাছো যেখানে একটি নিলে আরেকটি নিতেই হয়”, “জরিমানাসহ দুই দলে ভাগ করো”, বা “সবচেয়ে সস্তা উপায়ে সরাও”। এক একক ফ্লো কী বোঝায় তুমি ঠিক করো, শীর্ষ ও ক্যাপাসিটি আঁকো, বাকিটা অ্যালগরিদম করে। বাস্তবায়ন প্রায় সবসময় Dinic অ্যালগরিদম, যা দশ হাজার কিনারার গ্রাফের জন্য যথেষ্ট দ্রুত, আর একক-ক্যাপাসিটি বা দ্বিপক্ষীয় গ্রাফে প্রায় O(E√V)-এর মতো চলে।',
    ),
    L(
      'Min-cost flow adds a price per unit on each edge and asks for the cheapest way to push the required amount. It is the tool for weighted assignment, transport and scheduling with limited capacity. The graphs stay small (hundreds of vertices) because it is slower than plain max flow.',
      'মিন-কস্ট ফ্লোতে প্রতিটি কিনারায় প্রতি একক দাম থাকে, আর প্রয়োজনীয় পরিমাণ ঠেলার সবচেয়ে সস্তা উপায় চাওয়া হয়। এটি ওজনযুক্ত অ্যাসাইনমেন্ট, পরিবহন আর সীমিত ক্যাপাসিটির শিডিউলিংয়ের হাতিয়ার। গ্রাফ ছোট থাকে (কয়েকশ শীর্ষ), কারণ এটি সাধারণ ম্যাক্স ফ্লোর চেয়ে ধীর।',
    ),
  ],
  recognize: [
    L('A bipartite structure with limits: every worker takes at most one job, every job needs one worker.', 'সীমাসহ দ্বিপক্ষীয় কাঠামো: প্রতিটি কর্মী সর্বোচ্চ একটি কাজ নেয়, প্রতিটি কাজে একজন কর্মী লাগে।'),
    L('“Maximise the profit, but taking X forces taking Y” (closure), or “each item goes to one of two sides, mismatches cost money” (min cut).', '“লাভ সর্বাধিক করো, কিন্তু X নিলে Y নিতেই হবে” (ক্লোজার), বা “প্রতিটি জিনিস দুই পাশের একটিতে যায়, অমিলে খরচ” (মিন কাট)।'),
    L('Small limits (n, m ≤ a few thousand) and a sentence like “minimum number of edges/cells to remove so that A cannot reach B”.', 'ছোট সীমা (n, m কয়েক হাজার পর্যন্ত) আর “A যাতে B-তে পৌঁছাতে না পারে সেজন্য ন্যূনতম কতটি কিনারা/ঘর সরাতে হবে” ধরনের বাক্য।'),
    L('A greedy or DP that almost works but fails on a counter-example: the structure is usually a hidden bipartite graph.', 'গ্রিডি বা DP প্রায় কাজ করে কিন্তু একটি পাল্টা উদাহরণে ভুল করে: কাঠামো সাধারণত লুকানো দ্বিপক্ষীয় গ্রাফ।'),
  ],
  patterns: [
    {
      name: L('Dinic’s algorithm', 'Dinic অ্যালগরিদম'),
      explain: [
        L('Repeat: build the BFS level graph from s, then send blocking flow with a DFS that only follows edges to the next level and keeps a per-vertex pointer so dead ends are never revisited. Edges are stored in pairs (index i and i ^ 1), so the reverse edge is always one XOR away.', 'বারবার: s থেকে BFS লেভেল গ্রাফ বানাও, তারপর এমন DFS-এ ব্লকিং ফ্লো পাঠাও যা শুধু পরের লেভেলের কিনারা ধরে চলে এবং প্রতি শীর্ষে একটি পয়েন্টার রাখে যাতে অচল পথ আবার দেখা না হয়। কিনারা জোড়ায় রাখা হয় (সূচক i ও i ^ ১), তাই উল্টো কিনারা সবসময় একটি XOR দূরে।'),
        L('Use 64-bit capacities when they can be large, and a really large “infinity” such as 4·10¹⁸ for edges that must never be cut.', 'ক্যাপাসিটি বড় হতে পারলে ৬৪-বিট নাও, আর কখনও কাটা চলবে না এমন কিনারার জন্য ৪·১০¹⁸-এর মতো সত্যিই বড় “অসীম” ব্যবহার করো।'),
      ],
      code: raw`struct MaxFlow {
    struct Edge { int to; long long cap; };
    vector<Edge> es;
    vector<vector<int>> g;
    vector<int> level, it;
    MaxFlow(int n) : g(n), level(n), it(n) {}
    void add(int a, int b, long long c) {
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
    long long dfs(int v, int t, long long f) {
        if (v == t) return f;
        for (int& i = it[v]; i < (int)g[v].size(); i++) {
            int id = g[v][i], u = es[id].to;
            if (es[id].cap > 0 && level[u] == level[v] + 1) {
                long long d = dfs(u, t, min(f, es[id].cap));
                if (d > 0) { es[id].cap -= d; es[id ^ 1].cap += d; return d; }
            }
        }
        return 0;
    }
    long long run(int s, int t) {
        long long total = 0;
        while (bfs(s, t)) {
            fill(it.begin(), it.end(), 0);
            while (long long f = dfs(s, t, LLONG_MAX)) total += f;
        }
        return total;
    }
};`,
      example: { problem: '546E', text: L('Soldier and Traveling: give every city a “before” copy (fed by the source with its soldiers) and an “after” copy (feeding the sink with the wanted number). Join the before copy of a city to the after copy of itself and of each neighbour with infinite capacity. The answer is “possible” exactly when the maximum flow equals the total number of soldiers, and the flow on the middle edges is the movement plan.', 'Soldier and Traveling: প্রতিটি শহরের একটি “আগের” কপি (সোর্স থেকে সৈন্য সংখ্যা দিয়ে ভরা) আর একটি “পরের” কপি (চাহিদা সংখ্যা নিয়ে সিঙ্কে যায়) বানাও। শহরের আগের কপিকে তার নিজের ও প্রতিটি প্রতিবেশীর পরের কপির সাথে অসীম ক্যাপাসিটিতে জোড়ো। ম্যাক্সিমাম ফ্লো মোট সৈন্য সংখ্যার সমান হলেই এবং শুধু তখনই “সম্ভব”, আর মাঝের কিনারার ফ্লোই চলাচলের পরিকল্পনা।') },
    },
    {
      name: L('Project selection (maximum-weight closure)', 'প্রজেক্ট সিলেকশন (সর্বোচ্চ-ওজন ক্লোজার)'),
      explain: [
        L('Each item has a profit, positive or negative, and some items force others. Add the source → item edge with capacity = profit for the positive ones and item → sink with capacity = −profit for the negative ones; add item → required item with infinite capacity. The best total profit is (sum of positive profits) − (min cut). Intuitively, the cut pays for every profit you give up and every cost you accept.', 'প্রতিটি জিনিসের লাভ আছে, ধনাত্মক বা ঋণাত্মক, আর কিছু জিনিস অন্যগুলোকে বাধ্য করে। ধনাত্মকদের জন্য সোর্স → জিনিস কিনারা (ক্যাপাসিটি = লাভ), ঋণাত্মকদের জন্য জিনিস → সিঙ্ক (ক্যাপাসিটি = −লাভ), আর জিনিস → প্রয়োজনীয় জিনিস অসীম ক্যাপাসিটিতে যোগ করো। সেরা মোট লাভ = (ধনাত্মক লাভের যোগফল) − (মিন কাট)। সহজ ভাষায়, কাট তোমার ছেড়ে দেওয়া প্রতিটি লাভ আর মেনে নেওয়া প্রতিটি খরচের দাম দেয়।'),
      ],
      code: raw`long long closure(const vector<long long>& profit, const vector<pair<int, int>>& needs) {
    const long long INF = 4e18;
    int n = profit.size(), S = n, T = n + 1;
    MaxFlow f(n + 2);
    long long total = 0;
    for (int i = 0; i < n; i++) {
        if (profit[i] > 0) { f.add(S, i, profit[i]); total += profit[i]; }
        else f.add(i, T, -profit[i]);
    }
    for (auto [i, j] : needs) f.add(i, j, INF);  // choosing i forces j
    return total - f.run(S, T);
}`,
      example: { problem: '1082G', text: L('Petya and Graph: every edge is a project with profit w that needs both endpoints, every vertex is a project with cost a. Profit edges point to their two endpoints with infinite capacity, vertices point to the sink with their cost. Answer = (sum of all w) − (min cut), clamped at 0 by taking nothing.', 'Petya and Graph: প্রতিটি কিনারা একটি প্রজেক্ট, লাভ w, যার জন্য দুই প্রান্তই লাগে; প্রতিটি শীর্ষ একটি প্রজেক্ট, খরচ a। লাভের কিনারা দুই প্রান্তে অসীম ক্যাপাসিটিতে যায়, শীর্ষ খরচসহ সিঙ্কে যায়। উত্তর = (সব w-এর যোগ) − (মিন কাট), কিছু না নিলে ০, তাই ০-এর নিচে নয়।') },
    },
    {
      name: L('Min-cost flow', 'মিন-কস্ট ফ্লো'),
      explain: [
        L('Push one augmenting path at a time along the cheapest path in the residual graph. Reverse edges carry the negated cost, so a shortest-path routine that allows negative edges (SPFA or Bellman–Ford) is needed. The total cost after k units is minimal for exactly k units, so you can stop early when the next path would be too expensive.', 'প্রতিবার রেসিডুয়াল গ্রাফের সবচেয়ে সস্তা পথ ধরে একটি অগমেন্টিং পথ ঠেলো। উল্টো কিনারার খরচ ঋণাত্মক, তাই ঋণাত্মক কিনারা সামলানো শর্টেস্ট-পাথ (SPFA বা Bellman–Ford) দরকার। k একক পাঠানোর পর মোট খরচ ঠিক k এককের জন্য সর্বনিম্ন, তাই পরের পথ বেশি দামি হলে আগেই থামা যায়।'),
        L('With real-valued costs, relax only when the distance improves by more than a small epsilon; otherwise rounding noise can loop forever.', 'বাস্তব সংখ্যার খরচে দূরত্ব ছোট ইপসিলনের বেশি কমলেই শুধু রিল্যাক্স করো; নইলে রাউন্ডিং গোলমালে অনন্ত লুপ হতে পারে।'),
      ],
      code: raw`struct MinCostFlow {
    struct Edge { int to, cap; long long cost; };
    vector<Edge> es;
    vector<vector<int>> g;
    MinCostFlow(int n) : g(n) {}
    void add(int a, int b, int cap, long long cost) {
        g[a].push_back(es.size()); es.push_back({b, cap, cost});
        g[b].push_back(es.size()); es.push_back({a, 0, -cost});
    }
    // sends as much as possible from s to t, returns {flow, cost}
    pair<int, long long> run(int s, int t) {
        int n = g.size(), flow = 0;
        long long cost = 0;
        while (true) {
            vector<long long> dist(n, LLONG_MAX);
            vector<int> from(n, -1);
            vector<char> inQueue(n, 0);
            deque<int> q;
            dist[s] = 0;
            q.push_back(s);
            while (!q.empty()) {
                int v = q.front(); q.pop_front();
                inQueue[v] = 0;
                for (int id : g[v])
                    if (es[id].cap > 0 && dist[v] + es[id].cost < dist[es[id].to]) {
                        dist[es[id].to] = dist[v] + es[id].cost;
                        from[es[id].to] = id;
                        if (!inQueue[es[id].to]) { inQueue[es[id].to] = 1; q.push_back(es[id].to); }
                    }
            }
            if (from[t] < 0) break;
            for (int v = t; v != s; v = es[from[v] ^ 1].to) { es[from[v]].cap--; es[from[v] ^ 1].cap++; }
            flow++;
            cost += dist[t];
        }
        return {flow, cost};
    }
};`,
      example: { problem: '277E', text: L('Binary Tree on Plane: each point is a child needing one parent and a parent with two slots. Source → parent (capacity 2, cost 0), parent → child when the parent is higher (capacity 1, cost = distance), child → sink (capacity 1). A flow below n − 1 means some point has no valid parent: print -1.', 'Binary Tree on Plane: প্রতিটি বিন্দু একজন বাবা-চাওয়া সন্তান এবং দুটি স্লটের বাবা। সোর্স → বাবা (ক্যাপাসিটি ২, খরচ ০), বাবা উঁচু হলে বাবা → সন্তান (ক্যাপাসিটি ১, খরচ = দূরত্ব), সন্তান → সিঙ্ক (ক্যাপাসিটি ১)। ফ্লো n − ১-এর কম মানে কোনো বিন্দুর বৈধ বাবা নেই: -১ প্রিন্ট করো।') },
    },
    {
      name: L('Minimum vertex cover on a grid or on intervals', 'গ্রিড বা ব্যবধানে ন্যূনতম ভার্টেক্স কভার'),
      explain: [
        L('When “cover every special cell using whole rows or whole columns” appears, rows and columns are the two sides of a bipartite graph and each special cell is an edge. With weights (compressed groups of equal rows or columns), the minimum weighted vertex cover is a max flow: source → row group with the group size as capacity, column group → sink, row group → column group with infinite capacity for every special block.', '“প্রতিটি বিশেষ ঘর পুরো সারি বা পুরো কলাম দিয়ে ঢাকো” দেখলে সারি আর কলাম দ্বিপক্ষীয় গ্রাফের দুই পাশ আর প্রতিটি বিশেষ ঘর একটি কিনারা। ওজনসহ (একই রকম সারি বা কলামের কম্প্রেসড গ্রুপ), ন্যূনতম ওজনযুক্ত ভার্টেক্স কভার একটি ম্যাক্স ফ্লো: সোর্স → সারি-গ্রুপ (ক্যাপাসিটি গ্রুপের আকার), কলাম-গ্রুপ → সিঙ্ক, আর প্রতিটি বিশেষ ব্লকের জন্য সারি-গ্রুপ → কলাম-গ্রুপ অসীম ক্যাপাসিটিতে।'),
      ],
      code: raw`// groups: lengths of the compressed row groups and column groups
long long coverByFlow(const vector<long long>& rowLen, const vector<long long>& colLen,
                      const vector<pair<int, int>>& blackBlocks) {
    const long long INF = 4e18;
    int R = rowLen.size(), C = colLen.size(), S = R + C, T = R + C + 1;
    MaxFlow f(R + C + 2);
    for (int i = 0; i < R; i++) f.add(S, i, rowLen[i]);
    for (int j = 0; j < C; j++) f.add(R + j, T, colLen[j]);
    for (auto [i, j] : blackBlocks) f.add(i, R + j, INF);
    return f.run(S, T);
}`,
      example: { problem: '1198E', text: L('Rectangle Painting 2: a rectangle of cost min(h, w) is never better than h (or w) strips of width one, so the answer is the minimum vertex cover of the row–column graph of black cells. Coordinates up to 10⁹ are compressed into at most 100 groups per side, each group weighted by its length.', 'Rectangle Painting 2: min(h, w) খরচের আয়তক্ষেত্র কখনও h (বা w) টি প্রস্থ-১ ফালির চেয়ে ভালো নয়, তাই উত্তর কালো ঘরের সারি–কলাম গ্রাফের ন্যূনতম ভার্টেক্স কভার। ১০⁹ পর্যন্ত কোঅর্ডিনেট প্রতি পাশে সর্বোচ্চ ১০০ গ্রুপে কম্প্রেস হয়, প্রতিটি গ্রুপের ওজন তার দৈর্ঘ্য।') },
    },
    {
      name: L('Vertex capacities by splitting', 'শীর্ষ ভেঙে শীর্ষ-ক্যাপাসিটি'),
      explain: [
        L('Flow limits live on edges. To limit how much may pass through a vertex v, split it into v_in and v_out and add an edge v_in → v_out with the capacity. Every original edge u → v becomes u_out → v_in. The same trick turns “each vertex used at most once” (vertex-disjoint paths) into plain edge capacity 1.', 'ফ্লোর সীমা কিনারায় থাকে। শীর্ষ v দিয়ে কতটা যেতে পারবে তা সীমিত করতে v-কে v_in ও v_out-এ ভাঙো এবং ক্যাপাসিটিসহ v_in → v_out কিনারা দাও। মূল প্রতিটি কিনারা u → v হয়ে যায় u_out → v_in। একই কৌশলে “প্রতিটি শীর্ষ সর্বোচ্চ একবার” (শীর্ষ-বিচ্ছিন্ন পথ) সাধারণ কিনারা ক্যাপাসিটি ১ হয়ে যায়।'),
      ],
      code: raw`// vertex v becomes nodes 2*v (in) and 2*v+1 (out)
void addVertexCap(MaxFlow& f, int v, long long cap) { f.add(2 * v, 2 * v + 1, cap); }
void addArc(MaxFlow& f, int u, int v, long long cap) { f.add(2 * u + 1, 2 * v, cap); }`,
      example: { text: L('Vertex-disjoint paths from a to b: give every vertex capacity 1 (except a and b), every arc capacity 1, and read the answer as the max flow from a_out to b_in.', 'a থেকে b-তে শীর্ষ-বিচ্ছিন্ন পথ: প্রতিটি শীর্ষের ক্যাপাসিটি ১ (a ও b বাদে), প্রতিটি চাপের ক্যাপাসিটি ১, আর উত্তর a_out থেকে b_in-এর ম্যাক্স ফ্লো।') },
    },
  ],
  mistakes: [
    L('Forgetting that undirected edges need capacity in both directions: add one edge with capacity c on each side.', 'অনির্দেশিত কিনারায় দুই দিকেই ক্যাপাসিটি লাগে ভুলে যাওয়া: প্রতি পাশে ক্যাপাসিটি c-সহ একটি করে কিনারা দাও।'),
    L('An “infinity” that is too small (10⁹) when real capacities sum to more, or too large to add up (INT_MAX + something).', 'এমন “অসীম” যা খুব ছোট (১০⁹) যখন আসল ক্যাপাসিটির যোগ তার বেশি, বা এত বড় যে যোগ করলে ওভারফ্লো (INT_MAX + কিছু)।'),
    L('Rebuilding the graph from scratch for every query when only one capacity changes: reuse and reset, or think again about the model.', 'শুধু একটি ক্যাপাসিটি বদলালে প্রতিটি কোয়েরিতে গ্রাফ নতুন করে বানানো: পুনর্ব্যবহার ও রিসেট করো, নয়তো মডেল আবার ভাবো।'),
    L('Building far too many edges (all pairs) when a smarter model exists: Dinic is fast per edge but 10⁷ edges do not fit in memory.', 'অনেক বেশি কিনারা বানানো (সব জোড়া) যখন বুদ্ধিমান মডেল আছে: Dinic প্রতি কিনারায় দ্রুত, কিন্তু ১০⁷ কিনারা মেমরিতে ধরে না।'),
    L('Reading the min cut when the problem wants the flow itself, or the reverse: decide which one you print before coding.', 'সমস্যা ফ্লো চাইলে মিন কাট পড়া, বা উল্টোটা: কোডের আগে ঠিক করো কোনটি প্রিন্ট করবে।'),
  ],
  plan: [
    L('Warm up with a plain transport problem (546E) and write Dinic until you can do it from memory.', 'সাধারণ পরিবহন সমস্যা (৫৪৬E) দিয়ে শুরু করো এবং Dinic মুখস্থ লেখা না আসা পর্যন্ত লেখো।'),
    L('Learn the three standard models: bipartite assignment, closure (1082G) and weighted vertex cover (1198E). Practise recognising which one a statement is.', 'তিনটি আদর্শ মডেল শেখো: দ্বিপক্ষীয় অ্যাসাইনমেন্ট, ক্লোজার (১০৮২G) আর ওজনযুক্ত ভার্টেক্স কভার (১১৯৮E)। বিবৃতি দেখে কোনটি চেনার অনুশীলন করো।'),
    L('Add min-cost flow with 277E, then read about flows with lower bounds and about extracting the actual cut (vertices reachable from s in the residual graph).', '২৭৭E দিয়ে মিন-কস্ট ফ্লো যোগ করো, তারপর লোয়ার বাউন্ডসহ ফ্লো আর আসল কাট বের করা (রেসিডুয়াল গ্রাফে s থেকে পৌঁছানো শীর্ষ) পড়ো।'),
    L('Finish with the mixed problems: 1404E (independent set through a matching of joints) and 1139E (matching that grows as time runs backwards).', 'মিশ্র সমস্যা দিয়ে শেষ করো: ১৪০৪E (জয়েন্টের ম্যাচিং দিয়ে ইনডিপেন্ডেন্ট সেট) আর ১১৩৯E (সময় উল্টো চালালে বাড়তে থাকা ম্যাচিং)।'),
  ],
};

// ───────────────────────────────────────────────────────── matchings
export const matchingsGuideDeep: TagGuide = {
  slug: 'matchings',
  intro: [
    L(
      'A matching is a set of edges that share no vertex. In a bipartite graph (two sides, edges only between them) the maximum matching can be found quickly, and it unlocks three more answers through König’s theorem: the minimum vertex cover has the same size, the maximum independent set has size (vertices) − (matching), and Hall’s theorem says when every vertex on one side can be matched.',
      'ম্যাচিং হলো এমন কিনারার সেট যাদের কোনো শীর্ষ সাধারণ নয়। দ্বিপক্ষীয় গ্রাফে (দুই পাশ, কিনারা শুধু দুই পাশের মধ্যে) সর্বোচ্চ ম্যাচিং দ্রুত বের করা যায়, আর König-এর উপপাদ্য দিয়ে আরও তিনটি উত্তর খোলে: ন্যূনতম ভার্টেক্স কভারের আকার একই, সর্বোচ্চ ইনডিপেন্ডেন্ট সেটের আকার (শীর্ষ) − (ম্যাচিং), আর Hall-এর উপপাদ্য বলে কখন এক পাশের প্রতিটি শীর্ষ ম্যাচ করা যায়।',
    ),
    L(
      'In contests the work is seeing the bipartite graph. Rows against columns, workers against jobs, “horizontal joints against vertical joints”, positions against values. Once the graph is clear, Kuhn’s algorithm (simple, O(VE)) or Hopcroft–Karp (O(E√V)) does the matching, and often you do not even need a general algorithm because the graph has an interval or greedy structure.',
      'কনটেস্টে আসল কাজ দ্বিপক্ষীয় গ্রাফটি দেখতে পাওয়া। সারি বনাম কলাম, কর্মী বনাম কাজ, “আড়াআড়ি জয়েন্ট বনাম লম্বালম্বি জয়েন্ট”, অবস্থান বনাম মান। গ্রাফ পরিষ্কার হলে Kuhn অ্যালগরিদম (সরল, O(VE)) বা Hopcroft–Karp (O(E√V)) ম্যাচিং করে, আর অনেক সময় সাধারণ অ্যালগরিদমই লাগে না, কারণ গ্রাফে ব্যবধান বা গ্রিডির কাঠামো আছে।',
    ),
  ],
  recognize: [
    L('“Pair up” or “assign each X to a different Y” with a compatibility rule between X and Y.', '“জোড়া বানাও” বা “প্রতিটি X-কে ভিন্ন Y-তে বরাদ্দ করো” আর X ও Y-র মধ্যে সামঞ্জস্যের নিয়ম।'),
    L('“Largest set with no two conflicting” where conflicts only happen between two kinds (colours, rows vs columns): maximum independent set in a bipartite graph.', '“সবচেয়ে বড় সেট যেখানে কোনো দুটি বিরোধী নয়” আর বিরোধ শুধু দুই ধরনের মধ্যে (রং, সারি বনাম কলাম): দ্বিপক্ষীয় গ্রাফে ম্যাক্সিমাম ইনডিপেন্ডেন্ট সেট।'),
    L('“Minimum number of lines/paths to cover everything”: minimum vertex cover or minimum path cover.', '“সবকিছু ঢাকতে ন্যূনতম কতটি রেখা/পথ”: ন্যূনতম ভার্টেক্স কভার বা ন্যূনতম পথ-কভার।'),
    L('Every vertex has an even degree or a regular structure: think Euler tours instead of matching.', 'প্রতিটি শীর্ষের ডিগ্রি জোড় বা কাঠামো নিয়মিত: ম্যাচিংয়ের বদলে অয়লার ট্যুর ভাবো।'),
  ],
  patterns: [
    {
      name: L('Kuhn’s algorithm', 'Kuhn অ্যালগরিদম'),
      explain: [
        L('For each left vertex, search for an augmenting path with DFS: try each neighbour; if it is free or its current partner can find another neighbour, take it. Reset the visited marks for every left vertex. Simple, short, and fast enough for a few thousand vertices.', 'প্রতিটি বাঁ শীর্ষের জন্য DFS দিয়ে অগমেন্টিং পথ খোঁজো: প্রতিটি প্রতিবেশী চেষ্টা করো; সে মুক্ত হলে বা তার বর্তমান সঙ্গী অন্য প্রতিবেশী খুঁজে পেলে তাকে নাও। প্রতিটি বাঁ শীর্ষের জন্য ভিজিটেড চিহ্ন রিসেট করো। সরল, ছোট, আর কয়েক হাজার শীর্ষের জন্য যথেষ্ট দ্রুত।'),
      ],
      code: raw`vector<vector<int>> adjK;   // adjK[u]: right neighbours of left vertex u
vector<int> matchRight;     // matchRight[v] = left partner of v, or -1
vector<char> seenRight;

bool kuhn(int u) {
    for (int v : adjK[u]) {
        if (seenRight[v]) continue;
        seenRight[v] = 1;
        if (matchRight[v] < 0 || kuhn(matchRight[v])) { matchRight[v] = u; return true; }
    }
    return false;
}

int maxMatching(int leftCount, int rightCount) {
    matchRight.assign(rightCount, -1);
    int result = 0;
    for (int u = 0; u < leftCount; u++) {
        seenRight.assign(rightCount, 0);
        if (kuhn(u)) result++;
    }
    return result;
}`,
      example: { problem: '489B', text: L('BerSU Ball: boys and girls can dance if their skills differ by at most one. This is a bipartite matching, but after sorting both lists a two-pointer sweep is optimal, so Kuhn is only the check that the greedy is right.', 'BerSU Ball: ছেলে-মেয়ের দক্ষতার ব্যবধান সর্বোচ্চ ১ হলে নাচতে পারে। এটি দ্বিপক্ষীয় ম্যাচিং, কিন্তু দুই তালিকা সাজানোর পর দুই-পয়েন্টার সুইপই সেরা, তাই Kuhn শুধু গ্রিডি ঠিক কি না তার যাচাই।') },
    },
    {
      name: L('Hopcroft–Karp', 'Hopcroft–Karp'),
      explain: [
        L('Do all the shortest augmentations of one length in one phase: a BFS builds layers from the free left vertices, then DFS finds vertex-disjoint augmenting paths along the layers. There are O(√V) phases, so large graphs (tens of thousands of vertices, hundreds of thousands of edges) finish in time.', 'এক দৈর্ঘ্যের সব সংক্ষিপ্ত অগমেন্টেশন এক ফেজে করো: BFS মুক্ত বাঁ শীর্ষ থেকে স্তর বানায়, তারপর DFS স্তর ধরে শীর্ষ-বিচ্ছিন্ন অগমেন্টিং পথ খোঁজে। ফেজ O(√V)-টি, তাই বড় গ্রাফও (দশ হাজার শীর্ষ, লাখ কিনারা) সময়মতো শেষ হয়।'),
      ],
      code: raw`struct HopcroftKarp {
    int L, R;
    vector<vector<int>> adj;
    vector<int> matchL, matchR, dist;
    HopcroftKarp(int L, int R) : L(L), R(R), adj(L), matchL(L, -1), matchR(R, -1), dist(L) {}
    void addEdge(int u, int v) { adj[u].push_back(v); }
    bool bfs() {
        queue<int> q;
        bool found = false;
        for (int u = 0; u < L; u++) {
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
    }
    bool dfs(int u) {
        for (int v : adj[u]) {
            int w = matchR[v];
            if (w < 0 || (dist[w] == dist[u] + 1 && dfs(w))) { matchL[u] = v; matchR[v] = u; return true; }
        }
        dist[u] = -1;
        return false;
    }
    int run() {
        int result = 0;
        while (bfs())
            for (int u = 0; u < L; u++)
                if (matchL[u] < 0 && dfs(u)) result++;
        return result;
    }
};`,
      example: { problem: '1404E', text: L('Bricks: vertices are the possible joints between neighbouring # cells (horizontal on one side, vertical on the other), and a horizontal joint conflicts with a vertical one when they share a cell. The grid has up to 80 000 joints, so use Hopcroft–Karp. The answer is cells − (joints − matching).', 'Bricks: শীর্ষ হলো পাশাপাশি # ঘরের সম্ভাব্য জয়েন্ট (এক পাশে আড়াআড়ি, অন্য পাশে লম্বালম্বি), আর আড়াআড়ি ও লম্বালম্বি জয়েন্ট একটি ঘর ভাগ করলে বিরোধী। গ্রিডে সর্বোচ্চ ৮০ ০০০ জয়েন্ট, তাই Hopcroft–Karp নাও। উত্তর = ঘর − (জয়েন্ট − ম্যাচিং)।') },
    },
    {
      name: L('König: vertex cover and independent set', 'König: ভার্টেক্স কভার ও ইনডিপেন্ডেন্ট সেট'),
      explain: [
        L('After a maximum matching, start from every unmatched left vertex and walk alternating paths: left to right along non-matching edges, right to left along matching edges. Let Z be everything reached. Then (left vertices not in Z) ∪ (right vertices in Z) is a minimum vertex cover, and its complement is a maximum independent set.', 'সর্বোচ্চ ম্যাচিংয়ের পর প্রতিটি অম্যাচড বাঁ শীর্ষ থেকে অল্টারনেটিং পথে হাঁটো: বাঁ থেকে ডানে ম্যাচিং-বহির্ভূত কিনারা ধরে, ডান থেকে বাঁয়ে ম্যাচিং কিনারা ধরে। Z হলো যা যা পৌঁছানো গেল। তখন (Z-এ না থাকা বাঁ শীর্ষ) ∪ (Z-এ থাকা ডান শীর্ষ) একটি ন্যূনতম ভার্টেক্স কভার, আর তার পরিপূরক একটি সর্বোচ্চ ইনডিপেন্ডেন্ট সেট।'),
      ],
      code: raw`// given HopcroftKarp hk after hk.run(): returns which left/right vertices are in a minimum vertex cover
pair<vector<char>, vector<char>> minVertexCover(const HopcroftKarp& hk) {
    vector<char> visL(hk.L, 0), visR(hk.R, 0);
    function<void(int)> go = [&](int u) {
        visL[u] = 1;
        for (int v : hk.adj[u]) {
            if (visR[v] || hk.matchL[u] == v) continue;
            visR[v] = 1;
            if (hk.matchR[v] >= 0 && !visL[hk.matchR[v]]) go(hk.matchR[v]);
        }
    };
    for (int u = 0; u < hk.L; u++)
        if (hk.matchL[u] < 0 && !visL[u]) go(u);
    vector<char> coverL(hk.L), coverR(hk.R);
    for (int u = 0; u < hk.L; u++) coverL[u] = !visL[u];
    for (int v = 0; v < hk.R; v++) coverR[v] = visR[v];
    return {coverL, coverR};
}`,
      example: { problem: '1389F', text: L('Bicolored Segments: the conflict graph (colour 0 against colour 1, edges between touching segments) is bipartite, so the best set has n − matching segments. That graph can have n² edges, which is why the real solution is a segment-tree DP; the matching is the reference for small n.', 'Bicolored Segments: বিরোধ-গ্রাফ (রং ০ বনাম রং ১, ছোঁয়া খণ্ডের মধ্যে কিনারা) দ্বিপক্ষীয়, তাই সেরা সেটে n − ম্যাচিং খণ্ড। গ্রাফে n² কিনারা হতে পারে, তাই আসল সমাধান সেগমেন্ট-ট্রি DP; ম্যাচিং ছোট n-এর জন্য রেফারেন্স।') },
    },
    {
      name: L('Minimum path cover in a DAG', 'DAG-এ ন্যূনতম পথ-কভার'),
      explain: [
        L('Split every vertex v into v_out (left) and v_in (right), and join u_out to v_in for each edge u → v. A matching picks which edges continue a path. The vertex-disjoint paths needed to visit every vertex number n − (maximum matching). If paths may share vertices, take the transitive closure first.', 'প্রতিটি শীর্ষ v-কে v_out (বাঁ) ও v_in (ডান)-এ ভাঙো এবং প্রতিটি কিনারা u → v-র জন্য u_out-কে v_in-এর সাথে জোড়ো। ম্যাচিং ঠিক করে কোন কিনারা পথকে এগিয়ে নেয়। প্রতিটি শীর্ষ ঘুরতে লাগা শীর্ষ-বিচ্ছিন্ন পথের সংখ্যা n − (সর্বোচ্চ ম্যাচিং)। পথ শীর্ষ ভাগ করতে পারলে আগে ট্রানজিটিভ ক্লোজার নাও।'),
      ],
      code: raw`int minPathCover(int n, const vector<pair<int, int>>& arcs) {
    HopcroftKarp hk(n, n);
    for (auto [u, v] : arcs) hk.addEdge(u, v);
    return n - hk.run();
}`,
      example: { text: L('Fair paths on a DAG, “at least how many robots are needed to visit all checkpoints”: every robot is one path, so the answer is the path cover.', 'DAG-এ “সব চেকপয়েন্ট ঘুরতে ন্যূনতম কতটি রোবট লাগে”: প্রতিটি রোবট একটি পথ, তাই উত্তর পথ-কভার।') },
    },
    {
      name: L('When a matching is secretly a balance (Euler tour, greedy heaps)', 'যখন ম্যাচিং আসলে ভারসাম্য (অয়লার ট্যুর, গ্রিডি হিপ)'),
      explain: [
        L('If every vertex has an even degree and you want to split its edges into two equal halves, orient the edges along closed trails: in-degree equals out-degree everywhere. This is the engine behind “colour each element L or R so that every row and every value is balanced”.', 'প্রতিটি শীর্ষের ডিগ্রি জোড় হলে এবং তার কিনারাকে সমান দুই ভাগে ভাগ করতে চাইলে বদ্ধ ট্রেইল ধরে কিনারার দিক ঠিক করো: সর্বত্র ইন-ডিগ্রি = আউট-ডিগ্রি। এটাই “প্রতিটি উপাদানকে L বা R রং করো যাতে প্রতিটি সারি ও প্রতিটি মান ভারসাম্যপূর্ণ হয়” সমস্যার ইঞ্জিন।'),
        L('If you must pick items from groups of different sizes, always take from the group with the largest remaining count (a heap). That keeps the leftover as flat as possible, which is exactly what a later derangement needs.', 'ভিন্ন আকারের দল থেকে জিনিস বাছতে হলে সবসময় সবচেয়ে বেশি অবশিষ্ট সংখ্যার দল থেকে নাও (হিপ)। এতে অবশিষ্ট যতটা সম্ভব সমান থাকে, যা পরের ডিরেঞ্জমেন্টের ঠিক যা দরকার।'),
      ],
      code: raw`// colour the edges of an even-degree multigraph so every vertex has equally many in and out edges
vector<char> orientEdges(int vertices, const vector<array<int, 2>>& edges) {
    int E = edges.size();
    vector<vector<int>> adj(vertices);
    for (int i = 0; i < E; i++) { adj[edges[i][0]].push_back(i); adj[edges[i][1]].push_back(i); }
    vector<char> used(E, 0), forward(E, 0);  // forward[i]: edge i is walked from edges[i][0] to edges[i][1]
    vector<int> ptr(vertices, 0);
    for (int s = 0; s < vertices; s++) {
        int v = s;
        while (true) {
            while (ptr[v] < (int)adj[v].size() && used[adj[v][ptr[v]]]) ptr[v]++;
            if (ptr[v] == (int)adj[v].size()) {
                if (v == s) break;
                continue;
            }
            int id = adj[v][ptr[v]];
            used[id] = 1;
            int u = edges[id][0] == v ? edges[id][1] : edges[id][0];
            forward[id] = edges[id][0] == v;
            v = u;
        }
    }
    return forward;
}`,
      example: { problem: '1634E', text: L('Fair Share: one vertex per array and per value, one edge per element. All degrees are even, so closed trails orient every edge; “leaving an array vertex” means L. Every array and every value ends up half and half.', 'Fair Share: প্রতিটি অ্যারে ও প্রতিটি মানের একটি করে শীর্ষ, প্রতিটি উপাদানের একটি কিনারা। সব ডিগ্রি জোড়, তাই বদ্ধ ট্রেইল প্রতিটি কিনারার দিক ঠিক করে; “অ্যারে-শীর্ষ থেকে বেরোনো” মানে L। প্রতিটি অ্যারে ও প্রতিটি মান অর্ধেক-অর্ধেক হয়।') },
    },
  ],
  mistakes: [
    L('Forgetting to reset the visited array between left vertices in Kuhn’s algorithm: the matching quietly becomes too small.', 'Kuhn অ্যালগরিদমে বাঁ শীর্ষগুলোর মাঝে ভিজিটেড অ্যারে রিসেট করতে ভুলে যাওয়া: ম্যাচিং চুপচাপ ছোট হয়ে যায়।'),
    L('Using a matching when the graph is not bipartite (odd cycles): a general matching needs the blossom algorithm; check whether a bipartition really exists.', 'গ্রাফ দ্বিপক্ষীয় না হলেও (বিজোড় চক্র) ম্যাচিং ব্যবহার: সাধারণ ম্যাচিংয়ের জন্য blossom অ্যালগরিদম লাগে; দ্বিপক্ষীয় ভাগ সত্যিই আছে কি না দেখো।'),
    L('Mixing up “minimum vertex cover = matching” (true) with “minimum edge cover = matching” (it is vertices − matching).', '“ন্যূনতম ভার্টেক্স কভার = ম্যাচিং” (সত্য) আর “ন্যূনতম এজ কভার = ম্যাচিং” (আসলে শীর্ষ − ম্যাচিং) গুলিয়ে ফেলা।'),
    L('Building the full conflict graph when it has n² edges, instead of using the interval or grid structure to avoid it.', 'n² কিনারার পূর্ণ বিরোধ-গ্রাফ বানানো, ব্যবধান বা গ্রিডের কাঠামো কাজে লাগিয়ে তা এড়ানোর বদলে।'),
    L('Recursive DFS in Kuhn or Hopcroft–Karp on a path-like graph with 10⁵ vertices: the recursion depth can reach the stack limit.', '১০⁵ শীর্ষের পথের মতো গ্রাফে Kuhn বা Hopcroft–Karp-এ রিকার্সিভ DFS: রিকার্সনের গভীরতা স্ট্যাক সীমায় পৌঁছাতে পারে।'),
  ],
  plan: [
    L('Start with BerSU Ball (489B) and prove the greedy with an exchange argument; then write Kuhn and compare.', 'BerSU Ball (৪৮৯B) দিয়ে শুরু করো, এক্সচেঞ্জ যুক্তিতে গ্রিডি প্রমাণ করো; তারপর Kuhn লিখে তুলনা করো।'),
    L('Do Bricks (1404E) to learn “independent set = vertices − matching” on a real graph, then Rectangle Painting 2 (1198E) for the weighted version via flow.', 'বাস্তব গ্রাফে “ইনডিপেন্ডেন্ট সেট = শীর্ষ − ম্যাচিং” শিখতে Bricks (১৪০৪E) করো, তারপর ফ্লো দিয়ে ওজনযুক্ত রূপ জানতে Rectangle Painting 2 (১১৯৮E)।'),
    L('Study the problems where the matching hides behind a data-structure solution: Bicolored Segments (1389F) and Mastermind (1381C).', 'যেসব সমস্যায় ম্যাচিং ডেটা-স্ট্রাকচার সমাধানের পেছনে লুকায় সেগুলো পড়ো: Bicolored Segments (১৩৮৯F) ও Mastermind (১৩৮১C)।'),
    L('Finish with Fair Share (1634E) to see an Euler tour replace a matching, and Maximize Mex (1139E) for matching that grows backwards in time.', 'শেষে Fair Share (১৬৩৪E) করে দেখো অয়লার ট্যুর কীভাবে ম্যাচিংয়ের জায়গা নেয়, আর Maximize Mex (১১৩৯E) করে সময় উল্টো চালিয়ে বাড়তে থাকা ম্যাচিং।'),
  ],
};

// ───────────────────────────────────────────────────────── 2-sat
export const twoSatGuideDeep: TagGuide = {
  slug: '2-sat',
  intro: [
    L(
      '2-SAT asks: given boolean variables and a list of conditions of the form “(x or y)”, where each of x and y may be negated, can all of them hold at once, and what assignment works? Every condition is two implications, (¬x → y) and (¬y → x), so the conditions form a directed graph on 2n literal nodes, and the instance is satisfiable exactly when no variable lies in the same strongly connected component as its own negation.',
      '2-SAT জিজ্ঞেস করে: কিছু বুলিয়ান ভেরিয়েবল আর “(x অথবা y)” আকারের শর্তের তালিকা দেওয়া আছে (x ও y-এর প্রতিটি ঋণাত্মকও হতে পারে); সবগুলো একসাথে সত্য হয় কি না, আর কোন অ্যাসাইনমেন্ট কাজ করে? প্রতিটি শর্ত দুটি ইমপ্লিকেশন, (¬x → y) ও (¬y → x), তাই শর্তগুলো ২n লিটারেল-নোডের নির্দেশিত গ্রাফ বানায়, আর ইনস্ট্যান্স তখনই সন্তুষ্টিযোগ্য যখন কোনো ভেরিয়েবল তার নিজের নেগেশনের সাথে একই শক্তভাবে সংযুক্ত কম্পোনেন্টে নেই।',
    ),
    L(
      'To read off an assignment, order the components topologically and make true the literal whose component comes later. The skill in contests is turning a story into pairwise conditions: “at least one of these two”, “not both”, “if this then that”, “these two are equal or different”. Anything that talks about three or more things at once must first be broken into pairs, often with helper variables.',
      'অ্যাসাইনমেন্ট পেতে কম্পোনেন্টগুলোকে টপোলজিক্যাল ক্রমে সাজাও এবং যার কম্পোনেন্ট পরে আসে সেই লিটারেলকে সত্য করো। কনটেস্টে দক্ষতা হলো গল্পকে জোড়ায় শর্তে রূপান্তর: “এই দুটির অন্তত একটি”, “দুটি একসাথে নয়”, “এটি হলে ওটি”, “এই দুটি সমান বা ভিন্ন”। তিন বা বেশি জিনিস একসাথে বললে আগে জোড়ায় ভাঙতে হয়, অনেক সময় সহায়ক ভেরিয়েবল দিয়ে।',
    ),
  ],
  recognize: [
    L('Every item has exactly two choices (side A or B, on or off, left or right).', 'প্রতিটি জিনিসের ঠিক দুটি পছন্দ (পাশ A বা B, অন বা অফ, বাঁ বা ডান)।'),
    L('All restrictions involve at most two items at a time: “these two cannot both be chosen”, “if X is first then Y is second”.', 'সব বিধিনিষেধ একসাথে সর্বোচ্চ দুটি জিনিস নিয়ে: “এই দুটি একসাথে বাছা যাবে না”, “X প্রথম হলে Y দ্বিতীয়”।'),
    L('“Does a valid configuration exist?” or “print any valid configuration” on thousands of items.', 'হাজার হাজার জিনিসে “বৈধ কনফিগারেশন আছে কি?” বা “যেকোনো বৈধ কনফিগারেশন প্রিন্ট করো”।'),
    L('Binary search on a parameter together with a feasibility check that is a 2-SAT instance.', 'কোনো প্যারামিটারের ওপর বাইনারি সার্চ, আর feasibility পরীক্ষাটি একটি 2-SAT ইনস্ট্যান্স।'),
  ],
  patterns: [
    {
      name: L('The standard 2-SAT solver', 'আদর্শ 2-SAT সলভার'),
      explain: [
        L('Number the literal “v is true” as 2v and “v is false” as 2v + 1, so the negation is x ^ 1. A clause (a or b) adds the edges ¬a → b and ¬b → a. Run Tarjan’s algorithm; it numbers components in reverse topological order, so the literal with the smaller component number is the one to set true.', 'লিটারেল “v সত্য”-কে ২v এবং “v মিথ্যা”-কে ২v + ১ নম্বর দাও, তাই নেগেশন x ^ ১। ক্লজ (a অথবা b) ¬a → b ও ¬b → a কিনারা যোগ করে। Tarjan অ্যালগরিদম চালাও; সে কম্পোনেন্টকে উল্টো টপোলজিক্যাল ক্রমে নম্বর দেয়, তাই ছোট কম্পোনেন্ট নম্বরের লিটারেলকেই সত্য করতে হয়।'),
        L('Recursion depth can reach the number of nodes, so for 10⁶ literals use an iterative version or raise the stack size.', 'রিকার্সনের গভীরতা নোড সংখ্যার সমান হতে পারে, তাই ১০⁶ লিটারেলে ইটারেটিভ সংস্করণ নাও বা স্ট্যাক বাড়াও।'),
      ],
      code: raw`struct TwoSat {
    int n, timer = 0, comps = 0;
    vector<vector<int>> g;
    vector<int> comp, idx, low, stk;
    vector<char> on;
    TwoSat(int n) : n(n), g(2 * n), comp(2 * n, -1), idx(2 * n, -1), low(2 * n, 0), on(2 * n, 0) {}
    // literal 2*v: v is true, 2*v+1: v is false
    void addClause(int a, int b) { g[a ^ 1].push_back(b); g[b ^ 1].push_back(a); }  // a or b
    void dfs(int v) {
        idx[v] = low[v] = timer++;
        stk.push_back(v);
        on[v] = 1;
        for (int u : g[v]) {
            if (idx[u] < 0) { dfs(u); low[v] = min(low[v], low[u]); }
            else if (on[u]) low[v] = min(low[v], idx[u]);
        }
        if (low[v] == idx[v]) {
            while (true) {
                int u = stk.back(); stk.pop_back();
                on[u] = 0;
                comp[u] = comps;
                if (u == v) break;
            }
            comps++;
        }
    }
    bool solve(vector<int>& value) {
        for (int v = 0; v < 2 * n; v++)
            if (idx[v] < 0) dfs(v);
        value.assign(n, 0);
        for (int v = 0; v < n; v++) {
            if (comp[2 * v] == comp[2 * v + 1]) return false;
            value[v] = comp[2 * v] < comp[2 * v + 1];
        }
        return true;
    }
};`,
      example: { problem: '776D', text: L('The Door Problem: every door is controlled by exactly two switches, and the door must end up open. “Open” means the two switches differ if the door starts closed (x xor y = 1) and are equal if it starts open. Each equality or difference is two clauses, so the whole instance is 2-SAT (or a 2-colouring).', 'The Door Problem: প্রতিটি দরজা ঠিক দুটি সুইচে নিয়ন্ত্রিত, আর দরজা শেষে খোলা থাকতে হবে। “খোলা” মানে দরজা বন্ধ থাকলে সুইচ দুটি ভিন্ন (x xor y = ১), আর খোলা থাকলে সমান। প্রতিটি সমতা বা পার্থক্য দুটি ক্লজ, তাই পুরো ইনস্ট্যান্স 2-SAT (বা ২-রঙ)।') },
    },
    {
      name: L('Building clauses from stories', 'গল্প থেকে ক্লজ বানানো'),
      explain: [
        L('“a or b”: addClause(a, b). “Not both”: addClause(¬a, ¬b). “a implies b”: addClause(¬a, b). “a is forced true”: addClause(a, a). “a equals b”: the two clauses (¬a or b) and (a or ¬b). “a differs from b”: (a or b) and (¬a or ¬b).', '“a অথবা b”: addClause(a, b)। “দুটি একসাথে নয়”: addClause(¬a, ¬b)। “a হলে b”: addClause(¬a, b)। “a সত্য বাধ্য”: addClause(a, a)। “a = b”: দুটি ক্লজ (¬a অথবা b) ও (a অথবা ¬b)। “a ≠ b”: (a অথবা b) ও (¬a অথবা ¬b)।'),
      ],
      code: raw`inline int lit(int v, bool truth = true) { return 2 * v + (truth ? 0 : 1); }

void same(TwoSat& s, int a, int b) { s.addClause(lit(a, false), lit(b)); s.addClause(lit(a), lit(b, false)); }
void different(TwoSat& s, int a, int b) { s.addClause(lit(a), lit(b)); s.addClause(lit(a, false), lit(b, false)); }
void force(TwoSat& s, int a, bool truth) { s.addClause(lit(a, truth), lit(a, truth)); }`,
      example: { problem: '27D', text: L('Ring Road 2: every planned road is a chord of the ring and goes inside or outside. Two chords whose endpoints interleave around the ring would cross if drawn on the same side, so for each such pair the two chords must be on different sides: different(a, b). If the instance is unsatisfiable the answer is “Impossible”.', 'Ring Road 2: প্রতিটি পরিকল্পিত রাস্তা বলয়ের একটি জ্যা, ভেতরে বা বাইরে যায়। যে দুই জ্যার প্রান্ত বলয়ে ভাগ হয়ে আছে তারা একই পাশে আঁকলে ছেদ করে, তাই এমন প্রতিটি জোড়ায় জ্যা দুটি ভিন্ন পাশে হতে হবে: different(a, b)। ইনস্ট্যান্স অসন্তুষ্ট হলে উত্তর “Impossible”।') },
    },
    {
      name: L('Equalities with a union-find', 'ইউনিয়ন-ফাইন্ড দিয়ে সমতা'),
      explain: [
        L('When every condition is “x and y are equal” or “x and y are different”, no implication graph is needed: a union-find that stores the parity to the root answers it, and a contradiction is just an odd cycle. When single choices are also forced (“x must be B”), mark the groups and check that no group is forced both ways.', 'প্রতিটি শর্ত যখন “x ও y সমান” বা “x ও y ভিন্ন”, ইমপ্লিকেশন গ্রাফ লাগে না: রুট পর্যন্ত প্যারিটি রাখা ইউনিয়ন-ফাইন্ডই উত্তর দেয়, আর বিরোধ মানে বিজোড় চক্র। একক পছন্দও বাধ্য হলে (“x অবশ্যই B”), গ্রুপগুলো চিহ্নিত করো এবং দেখো কোনো গ্রুপ দুই দিকেই বাধ্য নয়।'),
      ],
      code: raw`struct ParityDsu {
    vector<int> parent, parity;  // parity[v]: 0 if v has the same value as its parent, else 1
    ParityDsu(int n) : parent(n), parity(n, 0) { iota(parent.begin(), parent.end(), 0); }
    pair<int, int> find(int v) {  // {root, parity of v relative to the root}
        if (parent[v] == v) return {v, 0};
        auto [r, p] = find(parent[v]);
        parent[v] = r;
        parity[v] ^= p;
        return {r, parity[v]};
    }
    // demand value(a) xor value(b) == d; false when this contradicts earlier demands
    bool join(int a, int b, int d) {
        auto [ra, pa] = find(a);
        auto [rb, pb] = find(b);
        if (ra == rb) return (pa ^ pb) == d;
        parent[ra] = rb;
        parity[ra] = pa ^ pb ^ d;
        return true;
    }
};`,
      example: { problem: '1475F', text: L('Unusual Matrix: after fixing the first row’s flip, every other row and column flip is forced by the equation r_i xor c_j = d_ij. Either a parity union-find or 2-SAT checks that no cell contradicts the choice. For Two Sets (468B), the same idea says x and a − x always travel together.', 'Unusual Matrix: প্রথম সারির ফ্লিপ ঠিক করলে বাকি প্রতিটি সারি ও কলামের ফ্লিপ সমীকরণ r_i xor c_j = d_ij থেকে বাধ্য হয়ে যায়। প্যারিটি ইউনিয়ন-ফাইন্ড বা 2-SAT দেখে নেয় কোনো ঘর পছন্দের সাথে বিরোধ করছে কি না। Two Sets (৪৬৮B)-এ একই ধারণা বলে x ও a − x সবসময় একসাথে চলে।') },
    },
    {
      name: L('A feasibility oracle inside a greedy or a binary search', 'গ্রিডি বা বাইনারি সার্চের ভেতরে feasibility অ্যাসক্রেল'),
      explain: [
        L('For “the smallest valid answer” (lexicographic words, smallest threshold) keep a fixed prefix, then try the candidates for the next position in increasing order and ask the 2-SAT whether a completion exists. A candidate whose 2-SAT is infeasible is dropped, the first feasible one is kept.', '“ক্ষুদ্রতম বৈধ উত্তর” (লেক্সিকোগ্রাফিক শব্দ, সবচেয়ে ছোট সীমা)-র জন্য একটি প্রিফিক্স ঠিক রাখো, তারপর পরের অবস্থানের প্রার্থীদের ছোট থেকে বড় ক্রমে চেষ্টা করে 2-SAT-কে জিজ্ঞেস করো পূরণ সম্ভব কি না। যে প্রার্থীর 2-SAT অসম্ভব তাকে বাদ দাও, প্রথম সম্ভবটি রাখো।'),
        L('Build the base implication graph once. Each query only adds unit clauses for the fixed positions (a forced edge per fixed literal), so the cost of one feasibility test stays linear.', 'বেস ইমপ্লিকেশন গ্রাফ একবারই বানাও। প্রতিটি কোয়েরি শুধু নির্দিষ্ট অবস্থানের জন্য একক ক্লজ যোগ করে (প্রতিটি নির্দিষ্ট লিটারেলে একটি বাধ্যতামূলক কিনারা), তাই এক feasibility পরীক্ষার খরচ রৈখিক থাকে।'),
      ],
      code: raw`// feasible(fixedType): runs 2-SAT with the rules plus the unit clauses for fixed positions
string smallestAtLeast(const string& s, int alphabet, const function<bool(const vector<int>&)>& feasible,
                       const function<int(int)>& typeOf) {
    int n = s.size();
    vector<int> fixedType(n, -1);
    for (int i = 0; i < n; i++) fixedType[i] = typeOf(s[i] - 'a');
    if (feasible(fixedType)) return s;
    for (int i = n - 1; i >= 0; i--) {
        fill(fixedType.begin(), fixedType.end(), -1);
        for (int j = 0; j < i; j++) fixedType[j] = typeOf(s[j] - 'a');
        for (int c = s[i] - 'a' + 1; c < alphabet; c++) {
            fixedType[i] = typeOf(c);
            if (!feasible(fixedType)) continue;
            string w = s.substr(0, i) + char('a' + c);
            for (int j = i + 1; j < n; j++)
                for (int d = 0; d < alphabet; d++) {
                    fixedType[j] = typeOf(d);
                    if (feasible(fixedType)) { w += char('a' + d); break; }
                }
            return w;
        }
    }
    return "-1";
}`,
      example: { problem: '568C', text: L('New Language: the unknown for each position is its type (vowel or consonant), the rules are implications between types, and the word is built letter by letter with one 2-SAT call per candidate type. Only two types exist, so a type that fails once at a position fails for every letter of that type.', 'New Language: প্রতিটি অবস্থানের অজানা হলো তার ধরন (স্বর বা ব্যঞ্জন), নিয়মগুলো ধরনের মধ্যে ইমপ্লিকেশন, আর শব্দ অক্ষর ধরে ধরে বানানো হয় প্রতি প্রার্থী-ধরনে একটি 2-SAT কলে। ধরন মাত্র দুটি, তাই কোনো অবস্থানে একটি ধরন একবার ব্যর্থ হলে ওই ধরনের সব অক্ষরের জন্যই ব্যর্থ।') },
    },
    {
      name: L('Flipping choices on a graph', 'গ্রাফে পছন্দ উল্টানো'),
      explain: [
        L('If choosing a vertex flips all edges around it, an edge ends up in its target state exactly when the number of chosen endpoints has a known parity. That is “x_u xor x_v = d” for every edge, which the parity union-find (or 2-SAT) solves directly.', 'কোনো শীর্ষ বাছলে তাকে ঘিরে থাকা সব কিনারা উল্টে গেলে, বাছা প্রান্তের সংখ্যার নির্দিষ্ট প্যারিটি হলেই কিনারা লক্ষ্য অবস্থায় আসে। প্রতিটি কিনারায় এটি “x_u xor x_v = d”, যা প্যারিটি ইউনিয়ন-ফাইন্ড (বা 2-SAT) সরাসরি সমাধান করে।'),
      ],
      code: raw`// edge (u, v, d): the edge needs (x_u xor x_v) == d, where d = 1 if it must be flipped an odd number of times
bool solveFlips(int n, const vector<array<int, 3>>& edges, vector<int>& pick) {
    ParityDsu dsu(n);
    for (auto [u, v, d] : edges)
        if (!dsu.join(u, v, d)) return false;
    pick.assign(n, 0);
    for (int v = 0; v < n; v++) pick[v] = dsu.find(v).second;  // each component rooted at 0
    return true;
}`,
      example: { problem: '228E', text: L('The Road to Berland is Paved With Good Intentions: choosing a city flips every road at it, and each road must end up asphalted. A road is asphalted exactly when the number of chosen endpoints plus its starting state is odd, an xor equation per road.', 'The Road to Berland is Paved With Good Intentions: শহর বাছলে তার সব রাস্তা উল্টে যায়, আর প্রতিটি রাস্তা শেষে পাকা হতে হবে। রাস্তা পাকা হয় ঠিক তখনই যখন বাছা প্রান্তের সংখ্যা ও তার শুরুর অবস্থার যোগ বিজোড়, প্রতি রাস্তায় একটি xor সমীকরণ।') },
    },
  ],
  mistakes: [
    L('Forgetting the contrapositive edge: an implication a → b must come with ¬b → ¬a, or the graph is incomplete.', 'কনট্রাপজিটিভ কিনারা ভুলে যাওয়া: ইমপ্লিকেশন a → b-র সাথে ¬b → ¬a থাকতেই হবে, নইলে গ্রাফ অসম্পূর্ণ।'),
    L('Reading the assignment the wrong way round: with Tarjan’s numbering the literal with the SMALLER component index is true.', 'অ্যাসাইনমেন্ট উল্টো পড়া: Tarjan নম্বরে ছোট কম্পোনেন্ট সূচকের লিটারেলই সত্য।'),
    L('Encoding a constraint on three variables as one clause: 2-SAT cannot express it without helper variables, and some constraints (exactly one of three) are NP-hard in general.', 'তিন ভেরিয়েবলের শর্তকে একটি ক্লজ বানানো: সহায়ক ভেরিয়েবল ছাড়া 2-SAT তা প্রকাশ করতে পারে না, আর কিছু শর্ত (তিনটির ঠিক একটি) সাধারণভাবে NP-hard।'),
    L('Allowing x = y in “different”: (a or a) and (¬a or ¬a) together are a contradiction, which is correct, but check that the problem really means it.', '“different”-এ x = y অনুমতি: (a অথবা a) ও (¬a অথবা ¬a) একসাথে বিরোধ, যা ঠিক, কিন্তু সমস্যা সত্যিই তা বোঝায় কি না দেখো।'),
    L('Deep recursion in the SCC on 10⁶ nodes: iterate, or increase the stack.', '১০⁶ নোডে SCC-তে গভীর রিকার্সন: ইটারেটিভ করো বা স্ট্যাক বাড়াও।'),
  ],
  plan: [
    L('Solve The Door Problem (776D) with both a 2-colouring and a 2-SAT, and see that they agree.', 'The Door Problem (৭৭৬D) ২-রঙ ও 2-SAT দুভাবে সমাধান করো, দেখো দুটি মেলে।'),
    L('Practise turning stories into clauses with Ring Road 2 (27D) and Two Sets (468B).', 'Ring Road 2 (২৭D) ও Two Sets (৪৬৮B) দিয়ে গল্পকে ক্লজে রূপান্তরের অনুশীলন করো।'),
    L('Learn the parity union-find on Unusual Matrix (1475F) and Good Intentions (228E).', 'Unusual Matrix (১৪৭৫F) ও Good Intentions (২২৮E) দিয়ে প্যারিটি ইউনিয়ন-ফাইন্ড শেখো।'),
    L('Finish with New Language (568C), where 2-SAT is the oracle inside a greedy, then try binary search + 2-SAT problems from the full problemset.', 'শেষে New Language (৫৬৮C) করো, যেখানে 2-SAT গ্রিডির ভেতরের অ্যাসক্রেল, তারপর পুরো প্রবলেমসেট থেকে বাইনারি সার্চ + 2-SAT সমস্যা চেষ্টা করো।'),
  ],
};

// ───────────────────────────────────────────────────────── crt
export const crtGuideDeep: TagGuide = {
  slug: 'crt',
  intro: [
    L(
      'The Chinese Remainder Theorem says: if m₁, …, m_k are pairwise coprime, then for any remainders r₁, …, r_k there is exactly one x modulo M = m₁ · … · m_k with x ≡ r_i (mod m_i) for all i. In words, a number modulo M is the same information as its remainders modulo each m_i. When the moduli are not coprime, a solution exists only if the congruences agree on the shared part, and then it is unique modulo the lcm instead of the product.',
      'চাইনিজ রিমেইন্ডার থিওরেম বলে: m₁, …, m_k জোড়ায় জোড়ায় সহমৌলিক হলে যেকোনো ভাগশেষ r₁, …, r_k-এর জন্য M = m₁ · … · m_k মডুলোতে ঠিক একটি x আছে যাতে সব i-এর জন্য x ≡ r_i (mod m_i)। সহজ কথায়, M মডুলোতে একটি সংখ্যা আর প্রতিটি m_i মডুলোতে তার ভাগশেষগুলো একই তথ্য। মডুলাস সহমৌলিক না হলে সমাধান তখনই আছে যখন সাধারণ অংশে সমশেষগুলো একমত, আর তখন সমাধান গুণফলের বদলে lcm মডুলোতে অনন্য।',
    ),
    L(
      'In contests CRT shows up in four ways. As a counting statement (“do the remainders determine x mod k?”: yes exactly when k divides the lcm). As two events with periods (“first day on which both happen”). As a decomposition tool: work modulo each prime power or each small prime separately, then glue the answers (binomials modulo a composite, arbitrary-modulus convolutions with three NTT primes). And as a way to treat two coordinates of an index separately (the exponent’s period p − 1 and the value’s period p).',
      'কনটেস্টে CRT চার ভাবে আসে। গণনার উক্তি হিসেবে (“ভাগশেষগুলো কি x mod k নির্ধারণ করে?”: হ্যাঁ, ঠিক তখন যখন k, lcm-কে ভাগ করে)। পর্যায়কালসহ দুটি ঘটনা হিসেবে (“যে প্রথম দিনে দুটিই ঘটে”)। বিভাজনের হাতিয়ার হিসেবে: প্রতিটি মৌলিক ঘাত বা প্রতিটি ছোট মৌলিক সংখ্যা মডুলোতে আলাদা কাজ করে উত্তর জোড়া লাগানো (যৌগিক মডুলোতে বাইনোমিয়াল, তিনটি NTT মৌলিক দিয়ে যেকোনো-মডুলো কনভোলিউশন)। আর একটি সূচকের দুই অংশ আলাদা ভাবে সামলানোর উপায় হিসেবে (সূচকের পর্যায়কাল p − ১ আর মানের পর্যায়কাল p)।',
    ),
  ],
  recognize: [
    L('Several conditions “x ≡ r_i (mod m_i)”, or periodic events with different periods and a question about when they coincide.', 'একাধিক শর্ত “x ≡ r_i (mod m_i)”, বা ভিন্ন পর্যায়কালের পর্যায়বৃত্ত ঘটনা আর কখন একসাথে ঘটে সেই প্রশ্ন।'),
    L('“Does knowing x mod each c_i reveal x mod k?” or “find x from its remainders”.', '“প্রতিটি c_i মডুলোতে x জানলে কি x mod k জানা যায়?” বা “ভাগশেষ থেকে x বের করো”।'),
    L('An expression that depends on n through two different periods (n mod (p − 1) and n mod p).', 'এমন রাশি যা n-এর ওপর দুটি ভিন্ন পর্যায়কালের মাধ্যমে নির্ভর করে (n mod (p − ১) ও n mod p)।'),
    L('A modulus that is not prime, but whose factorisation is small: split into prime powers, solve each, glue.', 'মডুলাস মৌলিক নয়, কিন্তু তার উৎপাদক ছোট: মৌলিক ঘাতে ভেঙে প্রতিটি সমাধান করে জোড়া লাগাও।'),
  ],
  patterns: [
    {
      name: L('Extended Euclid and modular inverse', 'বর্ধিত ইউক্লিড ও মডুলার ইনভার্স'),
      explain: [
        L('Extended Euclid returns g = gcd(a, b) and numbers x, y with a·x + b·y = g. If g = 1, then x is the inverse of a modulo b. Everything below is built from it. Keep the numbers in long long and reduce results into [0, m).', 'বর্ধিত ইউক্লিড g = gcd(a, b) এবং এমন x, y দেয় যাতে a·x + b·y = g। g = ১ হলে x হলো a-এর b মডুলোতে ইনভার্স। নিচের সব কিছু এ থেকেই তৈরি। সংখ্যাগুলো long long-এ রাখো এবং ফল [০, m)-এ নামিয়ে আনো।'),
      ],
      code: raw`long long extGcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long g = extGcd(b, a % b, y, x);
    y -= a / b * x;
    return g;
}

// inverse of a modulo m (needs gcd(a, m) = 1), result in [0, m)
long long inverse(long long a, long long m) {
    long long x, y;
    extGcd(((a % m) + m) % m, m, x, y);
    return ((x % m) + m) % m;
}`,
      example: { problem: '687B', text: L('Remainders Game: knowing x mod every c_i means knowing x mod lcm(c). So x mod k is always determined exactly when k divides that lcm. Compute the lcm without overflow by keeping it as lcm(l, gcd(c_i, k)), which always divides k.', 'Remainders Game: প্রতিটি c_i মডুলোতে x জানা মানে lcm(c) মডুলোতে x জানা। তাই x mod k সবসময় নির্ধারিত ঠিক তখনই যখন k সেই lcm-কে ভাগ করে। ওভারফ্লো এড়াতে lcm-কে lcm(l, gcd(c_i, k)) হিসেবে রাখো, যা সবসময় k-কে ভাগ করে।') },
    },
    {
      name: L('Merging two congruences (coprime or not)', 'দুটি সমশেষ মেলানো (সহমৌলিক হোক বা না হোক)'),
      explain: [
        L('To solve x ≡ a₁ (mod m₁) and x ≡ a₂ (mod m₂), write x = a₁ + m₁·t and solve m₁·t ≡ a₂ − a₁ (mod m₂). With g = gcd(m₁, m₂), a solution exists exactly when g divides a₂ − a₁; then t is determined modulo m₂/g, and the merged congruence is modulo lcm = m₁/g · m₂. Merge the congruences one at a time.', 'x ≡ a₁ (mod m₁) ও x ≡ a₂ (mod m₂) সমাধান করতে x = a₁ + m₁·t লেখো এবং m₁·t ≡ a₂ − a₁ (mod m₂) সমাধান করো। g = gcd(m₁, m₂) হলে সমাধান আছে ঠিক তখনই যখন g, a₂ − a₁-কে ভাগ করে; তখন t, m₂/g মডুলোতে নির্ধারিত, আর মেলানো সমশেষ lcm = m₁/g · m₂ মডুলোতে। সমশেষগুলো একটি একটি করে মেলাও।'),
        L('Use __int128 for the intermediate product when the lcm can reach 10¹⁸.', 'lcm ১০¹⁸ ছুঁতে পারলে মধ্যবর্তী গুণফলে __int128 ব্যবহার করো।'),
      ],
      code: raw`// x = a1 mod m1 and x = a2 mod m2 -> {x mod lcm, lcm}, or {-1, -1} if there is no solution
pair<long long, long long> mergeCongruences(long long a1, long long m1, long long a2, long long m2) {
    long long x, y;
    long long g = extGcd(m1, m2, x, y);
    if ((a2 - a1) % g != 0) return {-1, -1};
    long long l = m1 / g * m2;
    long long step = m2 / g;
    long long t = (long long)((__int128)((a2 - a1) / g % step + step) % step * ((x % step + step) % step) % step);
    long long res = (a1 + (__int128)m1 * t) % l;
    if (res < 0) res += l;
    return {res, l};
}`,
      example: { problem: '1500B', text: L('Two chandeliers: chandelier 1 shows colour x_i on days ≡ i (mod n) and chandelier 2 shows y_j on days ≡ j (mod m). For every colour that both have, the pair of positions gives two congruences, and merging them (when gcd(n, m) divides i − j) yields one residue modulo lcm(n, m). Then counting the days up to X on which colours differ is easy, and binary search on X finds the k-th.', 'Two chandeliers: ঝাড়বাতি ১ দিন ≡ i (mod n)-এ রং x_i দেখায়, ঝাড়বাতি ২ দিন ≡ j (mod m)-এ y_j দেখায়। দুটিতেই থাকা প্রতিটি রঙের জন্য অবস্থানের জোড়া দুটি সমশেষ দেয়, আর মেলালে (gcd(n, m), i − j-কে ভাগ করলে) lcm(n, m) মডুলোতে একটি ভাগশেষ মেলে। তারপর X পর্যন্ত যেসব দিনে রং ভিন্ন তা গোনা সহজ, আর X-এর ওপর বাইনারি সার্চ k-তম দিন খোঁজে।') },
    },
    {
      name: L('Gluing two periods of one expression', 'একটি রাশির দুটি পর্যায়কাল জোড়া লাগানো'),
      explain: [
        L('If a quantity depends on n through n mod A and also through n mod B with gcd(A, B) = 1 (for example Fermat: aⁿ depends on n mod (p − 1), while a factor n depends on n mod p), loop over the residues of one period, solve the equation for the other, and glue each pair with CRT into a residue modulo A·B. Here p and p − 1 are coprime, so the glued modulus is p·(p − 1).', 'কোনো রাশি n-এর ওপর n mod A এবং n mod B (gcd(A, B) = ১) দুইভাবে নির্ভর করলে (যেমন ফের্মা: aⁿ নির্ভর করে n mod (p − ১)-এর ওপর, আর গুণক n নির্ভর করে n mod p-এর ওপর) এক পর্যায়কালের প্রতিটি ভাগশেষের ওপর ঘোরো, অন্যটির জন্য সমীকরণ সমাধান করো, আর প্রতিটি জোড়া CRT দিয়ে A·B মডুলোর ভাগশেষে জোড়ো। এখানে p ও p − ১ সহমৌলিক, তাই জোড়া মডুলাস p·(p − ১)।'),
      ],
      code: raw`// n = r1 (mod m1), n = r2 (mod m2) with gcd(m1, m2) = 1; result in [0, m1 * m2)
long long crtCoprime(long long r1, long long m1, long long r2, long long m2) {
    long long inv = inverse(m1 % m2, m2);                 // m1^-1 mod m2
    long long t = (long long)((__int128)((r2 - r1) % m2 + m2) % m2 * inv % m2);
    return r1 + m1 * t;
}`,
      example: { problem: '919E', text: L('Congruence Equation: we need n·aⁿ ≡ b (mod p) with n up to p(p − 1). For every i in [0, p − 2], put n ≡ i (mod p − 1); then aⁿ = aⁱ is known, so n ≡ b·a⁻ⁱ (mod p) is known. CRT turns the pair into one n modulo p(p − 1), and we count those that are at most x.', 'Congruence Equation: p(p − ১) পর্যন্ত n-এর জন্য n·aⁿ ≡ b (mod p) দরকার। প্রতিটি i ∈ [০, p − ২]-এর জন্য n ≡ i (mod p − ১) ধরো; তখন aⁿ = aⁱ জানা, তাই n ≡ b·a⁻ⁱ (mod p)-ও জানা। CRT জোড়াটিকে p(p − ১) মডুলোতে একটি n বানায়, আর x-এর সমান বা ছোটগুলো গোনা হয়।') },
    },
    {
      name: L('Row and column congruences (GCD tables)', 'সারি ও কলামের সমশেষ (GCD টেবিল)'),
      explain: [
        L('A condition like gcd(i, j + l) = a_l for l = 0 … k − 1 says that a_l divides i (so i is a multiple of L = lcm(a)) and that j + l ≡ 0 (mod a_l). That is one congruence per l on the unknown j, with non-coprime moduli, merged one at a time. After the merge only the minimal candidates need to be verified with a real gcd.', 'gcd(i, j + l) = a_l (l = ০ … k − ১) ধরনের শর্ত বলে a_l, i-কে ভাগ করে (তাই i হলো L = lcm(a)-এর গুণিতক) এবং j + l ≡ ০ (mod a_l)। অজানা j-এর ওপর প্রতিটি l-এর জন্য একটি সমশেষ, সহমৌলিক নয় এমন মডুলাসে, একটি একটি করে মেলানো হয়। মেলানোর পর শুধু ন্যূনতম প্রার্থীগুলো আসল gcd দিয়ে যাচাই করতে হয়।'),
      ],
      code: raw`// does the table row i contain a_0 .. a_{k-1} starting at some column j?  Returns j or -1 (columns start at 1)
long long findColumn(long long i, const vector<long long>& a) {
    long long cur = 0, mod = 1;                          // j = cur (mod mod)
    for (int l = 0; l < (int)a.size(); l++) {
        auto [r, m] = mergeCongruences(cur, mod, ((-l) % a[l] + a[l]) % a[l], a[l]);
        if (r < 0) return -1;
        cur = r; mod = m;
    }
    if (cur == 0) cur = mod;                             // columns are positive
    for (int l = 0; l < (int)a.size(); l++)
        if (__gcd(i, cur + l) != a[l]) return -1;
    return cur;
}`,
      example: { problem: '338D', text: L('GCD Table: the row must be a multiple of L = lcm(a); the smallest candidate is L itself (if L exceeds n, print NO). The column satisfies j + l ≡ 0 (mod a_l) for each l, merged by CRT, then the minimal j is verified against the real gcd values and the bound m.', 'GCD Table: সারি অবশ্যই L = lcm(a)-এর গুণিতক; ক্ষুদ্রতম প্রার্থী L নিজেই (L, n ছাড়ালে NO)। কলাম প্রতিটি l-এর জন্য j + l ≡ ০ (mod a_l) মানে, যা CRT দিয়ে মেলে, তারপর ন্যূনতম j আসল gcd মান ও সীমা m-এর সাথে যাচাই হয়।') },
    },
    {
      name: L('Solve modulo each prime power, then glue (Garner)', 'প্রতিটি মৌলিক ঘাত মডুলোতে সমাধান, তারপর জোড়া (Garner)'),
      explain: [
        L('A composite modulus M = p₁^e₁ · … · p_k^e_k makes division impossible, but modulo each prime power the problem is often easy, for example because each factor modulus is a prime for which inverses exist. Compute the answer modulo each, then combine them with CRT. When only small answers exist (for instance values below 10¹⁸ computed with several 30-bit NTT primes), Garner’s algorithm reconstructs the integer without big numbers.', 'যৌগিক মডুলাস M = p₁^e₁ · … · p_k^e_k-এ ভাগ অসম্ভব, কিন্তু প্রতিটি মৌলিক ঘাত মডুলোতে সমস্যা প্রায়ই সহজ, যেমন প্রতিটি গুণক-মডুলাস মৌলিক হলে ইনভার্স থাকে। প্রতিটির মডুলোতে উত্তর বের করে CRT দিয়ে জোড়ো। শুধু ছোট উত্তর থাকলে (যেমন কয়েকটি ৩০-বিট NTT মৌলিক দিয়ে বের করা ১০¹⁸-এর নিচের মান), Garner অ্যালগরিদম বড় সংখ্যা ছাড়াই পূর্ণসংখ্যাটি ফিরিয়ে আনে।'),
      ],
      code: raw`// x < prod(mods) from x mod mods[i] (mods pairwise coprime, each < 2^31); result taken modulo M
long long garner(const vector<long long>& rem, const vector<long long>& mods, long long M) {
    int k = mods.size();
    vector<long long> coef(k);                                // mixed radix digits
    for (int i = 0; i < k; i++) {
        long long cur = rem[i];
        for (int j = 0; j < i; j++) {
            cur = (cur - coef[j]) % mods[i];
            if (cur < 0) cur += mods[i];
            cur = cur * inverse(mods[j] % mods[i], mods[i]) % mods[i];
        }
        coef[i] = cur;
    }
    long long result = 0, prod = 1 % M;
    for (int i = 0; i < k; i++) {
        result = (result + coef[i] % M * prod) % M;
        prod = prod * (mods[i] % M) % M;
    }
    return result;
}`,
      example: { problem: '1748D', text: L('ConstructOR: we need x with d dividing both a | x and b | x. Write d = 2ᵏ·d′ with d′ odd. Choose x with bits k … 29 all set and bits below k clear, so a | x = b | x = x (or print −1 if a or b has a bit below k), and then only d | x remains: x ≡ 2³⁰ − 2ᵏ (mod 2³⁰) and x ≡ 0 (mod d′), two coprime moduli and one CRT.', 'ConstructOR: এমন x দরকার যাতে a | x ও b | x দুটোই d দিয়ে বিভাজ্য। d = ২ᵏ·d′ (d′ বিজোড়) লেখো। বিট k … ২৯ সব সেট আর k-এর নিচের বিট খালি এমন x নাও, তাই a | x = b | x = x (a বা b-র k-এর নিচে বিট থাকলে −১), তখন শুধু d | x বাকি: x ≡ ২³⁰ − ২ᵏ (mod ২³⁰) ও x ≡ ০ (mod d′), দুটি সহমৌলিক মডুলাস, একটি CRT।') },
    },
  ],
  mistakes: [
    L('Applying the coprime formula to moduli that share a factor: first check gcd(m₁, m₂) divides a₂ − a₁, then divide it out.', 'যে মডুলাসে সাধারণ গুণক আছে তাতে সহমৌলিক সূত্র প্রয়োগ: আগে দেখো gcd(m₁, m₂), a₂ − a₁-কে ভাগ করে, তারপর ভাগ করে নাও।'),
    L('Overflow: the lcm of a few numbers around 10⁹ already needs 128-bit arithmetic for the intermediate product, and the lcm itself can exceed 10¹⁸.', 'ওভারফ্লো: ১০⁹-এর কাছাকাছি কয়েকটি সংখ্যার lcm-এর মধ্যবর্তী গুণফলেই ১২৮-বিট লাগে, আর lcm নিজেই ১০¹⁸ ছাড়াতে পারে।'),
    L('Negative remainders: (a % m + m) % m everywhere, including a₂ − a₁ and the inverse.', 'ঋণাত্মক ভাগশেষ: সর্বত্র (a % m + m) % m, a₂ − a₁ ও ইনভার্সসহ।'),
    L('Returning x = 0 where the problem wants a positive solution: the smallest positive solution is the modulus, not zero.', 'সমস্যা ধনাত্মক সমাধান চাইলে x = ০ ফেরত দেওয়া: ক্ষুদ্রতম ধনাত্মক সমাধান মডুলাস, শূন্য নয়।'),
    L('Forgetting to verify a candidate at the end: the congruences are necessary, and sometimes the real condition (a gcd, a bound) is stronger.', 'শেষে প্রার্থী যাচাই করতে ভুলে যাওয়া: সমশেষ প্রয়োজনীয় শর্ত, কখনও আসল শর্ত (gcd, সীমা) আরও কঠোর।'),
  ],
  plan: [
    L('Write extGcd and inverse from memory, then implement mergeCongruences and test it against brute force on small moduli.', 'extGcd ও inverse মুখস্থ লেখো, তারপর mergeCongruences বানাও এবং ছোট মডুলাসে ব্রুট ফোর্সের সাথে পরীক্ষা করো।'),
    L('Do Remainders Game (687B) for the counting view, then Congruence Equation (919E) for gluing two periods.', 'গণনার দিকের জন্য Remainders Game (৬৮৭B), তারপর দুই পর্যায়কাল জোড়ার জন্য Congruence Equation (৯১৯E) করো।'),
    L('Move to ConstructOR (1748D) and Two chandeliers (1500B) for CRT inside a constructive or binary-search solution.', 'গঠনমূলক বা বাইনারি সার্চ সমাধানের ভেতরে CRT-র জন্য ConstructOR (১৭৪৮D) ও Two chandeliers (১৫০০B)-এ যাও।'),
    L('Finish with GCD Table (338D), where non-coprime moduli, the lcm bound and final verification all appear together.', 'শেষে GCD Table (৩৩৮D) করো, যেখানে সহমৌলিক নয় এমন মডুলাস, lcm সীমা আর শেষ যাচাই একসাথে আসে।'),
  ],
};
