import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const graphsGuide: TagGuide = {
  slug: 'graphs',
  intro: [
    L('A graph is a set of vertices joined by edges. Cities and roads, people and friendships, states and moves: whenever objects are linked in pairs, a graph models it, and the question becomes about reachability, components, cycles or distances.',
      'গ্রাফ হলো প্রান্ত দিয়ে যুক্ত শীর্ষবিন্দুর একটি সেট। শহর আর রাস্তা, মানুষ আর বন্ধুত্ব, অবস্থা আর চাল: যখনই জিনিসগুলো জোড়ায় যুক্ত, গ্রাফ সেটিকে মডেল করে, আর প্রশ্ন হয়ে যায় পৌঁছানো, উপাদান, চক্র বা দূরত্ব নিয়ে।'),
    L('Store the graph as an adjacency list: vector<vector<int>> adj(n), with adj[u] holding the neighbours of u. BFS and DFS then visit everything reachable in O(n + m).',
      'গ্রাফকে সংলগ্নতা তালিকা হিসেবে রাখো: vector<vector<int>> adj(n), যেখানে adj[u]-তে u-এর প্রতিবেশীরা থাকে। তারপর BFS আর DFS O(n + m)-এ পৌঁছানো যায় এমন সবকিছু ঘুরে দেখে।'),
  ],
  recognize: [
    L('Input lists pairs (u, v): roads, friendships, “u depends on v”.', 'ইনপুটে জোড়া (u, v) তালিকা: রাস্তা, বন্ধুত্ব, “u নির্ভর করে v-এর ওপর”।'),
    L('A grid where you move between neighbouring cells.', 'একটি গ্রিড যেখানে পাশের ঘরগুলোর মধ্যে চলা যায়।'),
    L('States and moves (“from x you can go to 2x or x − 1”).', 'অবস্থা আর চাল (“x থেকে 2x বা x − ১-এ যাওয়া যায়”)।'),
  ],
  patterns: [
    {
      name: L('BFS for fewest moves', 'সবচেয়ে কম চালের জন্য BFS'),
      explain: [
        L('BFS explores vertices in order of distance, so the first time it reaches a vertex is along a shortest path (when every edge costs 1). The states do not need to be given as a graph: numbers with moves are vertices too.',
          'BFS দূরত্বের ক্রমে শীর্ষবিন্দু ঘোরে, তাই প্রথম যখন কোনো শীর্ষে পৌঁছায় সেটি সবচেয়ে ছোট পথে (যখন প্রতিটি প্রান্তের খরচ ১)। অবস্থাগুলো গ্রাফ হিসেবে দেওয়া থাকার দরকার নেই: চালসহ সংখ্যাও শীর্ষবিন্দু।'),
      ],
      code: raw`vector<int> dist(LIMIT + 1, -1);
queue<int> q; q.push(n); dist[n] = 0;
while (!q.empty()) {
    int x = q.front(); q.pop();
    for (int y : {2 * x, x - 1})
        if (y >= 1 && y <= LIMIT && dist[y] == -1) { dist[y] = dist[x] + 1; q.push(y); }
}`,
      example: { problem: '520B', text: L('Two Buttons: red doubles, blue subtracts one; BFS over numbers gives the fewest presses from n to m.', 'Two Buttons: লাল দ্বিগুণ করে, নীল এক বিয়োগ করে; সংখ্যাগুলোর ওপর BFS n থেকে m পর্যন্ত সবচেয়ে কম চাপ দেয়।') },
    },
    {
      name: L('Follow the single outgoing edge', 'একমাত্র বহির্গামী প্রান্ত অনুসরণ'),
      explain: [
        L('When every vertex has exactly one outgoing edge (a functional graph), walking from any start eventually loops. Mark visited vertices; the first repeated one is where the cycle is entered.',
          'যখন প্রতিটি শীর্ষের ঠিক একটি বহির্গামী প্রান্ত (ফাংশনাল গ্রাফ), যেকোনো শুরু থেকে হাঁটলে শেষে চক্রে পড়ে। দেখা শীর্ষগুলো চিহ্নিত করো; প্রথম পুনরাবৃত্ত শীর্ষেই চক্রে ঢোকা হয়।'),
      ],
      code: raw`for (int s = 1; s <= n; s++) {
    vector<bool> seen(n + 1, false);
    int v = s;
    while (!seen[v]) { seen[v] = true; v = p[v]; }
    cout << v << ' ';
}`,
      example: { problem: '1020B', text: L('Badge: from each student follow p until someone is visited twice; that student gets the second hole.', 'Badge: প্রতিটি ছাত্র থেকে p অনুসরণ করো যতক্ষণ না কেউ দুবার আসে; সেই ছাত্র দ্বিতীয় ছিদ্র পায়।') },
    },
    {
      name: L('Depth of a forest', 'বনের গভীরতা'),
      explain: [
        L('With a parent array (−1 for roots), the depth of each vertex is 1 + the depth of its parent. The answer to “fewest groups so that no one is with their boss” is the greatest depth.',
          'একটি parent অ্যারেতে (মূলের জন্য −১), প্রতিটি শীর্ষের গভীরতা হলো ১ + তার parent-এর গভীরতা। “এমন সবচেয়ে কম দল যাতে কেউ তার বসের সঙ্গে না থাকে”-র উত্তর হলো সবচেয়ে বড় গভীরতা।'),
      ],
      code: raw`int best = 0;
for (int i = 1; i <= n; i++) {
    int d = 0;
    for (int v = i; v != -1; v = boss[v]) d++;
    best = max(best, d);
}`,
      example: { problem: '115A', text: L('Party: the minimum number of groups equals the longest chain of bosses.', 'Party: সর্বনিম্ন দলের সংখ্যা বসদের সবচেয়ে লম্বা শৃঙ্খলের সমান।') },
    },
  ],
  mistakes: [
    L('Mixing 0-based and 1-based vertex numbers.', '০-ভিত্তিক আর ১-ভিত্তিক শীর্ষ নম্বর মেশানো।'),
    L('Adding only one direction for an undirected edge.', 'অনির্দেশিত প্রান্তের জন্য শুধু একদিক যোগ করা।'),
    L('Forgetting to clear the graph between test cases.', 'টেস্ট কেসের মাঝে গ্রাফ খালি করতে ভুলে যাওয়া।'),
    L('Using an adjacency matrix for n = 2·10⁵.', 'n = ২·১০⁵ হলে সংলগ্নতা ম্যাট্রিক্স ব্যবহার।'),
  ],
  plan: [
    L('Write BFS and DFS from memory on adjacency lists and on grids.', 'সংলগ্নতা তালিকা আর গ্রিডে স্মৃতি থেকে BFS আর DFS লেখো।'),
    L('Do 10 graph problems rated 1000–1500: components, BFS distances, cycles.', '১০০০–১৫০০ রেটিংয়ের ১০টি গ্রাফ প্রবলেম করো: উপাদান, BFS দূরত্ব, চক্র।'),
    L('Then move on to trees, DSU and Dijkstra.', 'তারপর ট্রি, DSU আর ডাইকস্ট্রাতে যাও।'),
  ],
};

export const dfsGuide: TagGuide = {
  slug: 'dfs',
  intro: [
    L('This tag covers DFS and BFS, the two basic ways to explore a graph. DFS goes as deep as it can before backtracking, which makes it natural for components, cycles, trees and anything recursive. BFS explores level by level and gives shortest paths in unweighted graphs.',
      'এই ট্যাগে DFS আর BFS আছে, গ্রাফ ঘোরার দুটি মৌলিক উপায়। DFS ফেরার আগে যতটা গভীরে পারে যায়, তাই উপাদান, চক্র, ট্রি আর রিকার্সিভ যেকোনো কিছুর জন্য স্বাভাবিক। BFS স্তরে স্তরে ঘোরে আর ওজনহীন গ্রাফে সবচেয়ে ছোট পথ দেয়।'),
    L('Both visit each vertex and edge once, so they run in O(n + m). The visited array is what keeps them from looping forever.',
      'দুটিই প্রতিটি শীর্ষ আর প্রান্ত একবার ঘোরে, তাই O(n + m)-এ চলে। visited অ্যারেই এদের চিরকাল ঘুরতে থাকা থেকে বাঁচায়।'),
  ],
  recognize: [
    L('“How many connected groups”, “is there a path”, “is there a cycle”.', '“কতগুলো যুক্ত দল”, “পথ আছে কি”, “চক্র আছে কি”।'),
    L('Flood fill in a grid: lakes, islands, regions.', 'গ্রিডে ফ্লাড ফিল: হ্রদ, দ্বীপ, অঞ্চল।'),
  ],
  patterns: [
    {
      name: L('Count components', 'উপাদান গোনা'),
      explain: [
        L('Start a DFS from every unvisited vertex; each start discovers one new component. While exploring, you can also collect facts about the component, such as whether every vertex has degree 2 (then it is a cycle).',
          'প্রতিটি না-দেখা শীর্ষ থেকে DFS শুরু করো; প্রতিটি শুরু একটি নতুন উপাদান খুঁজে পায়। ঘোরার সময় উপাদান সম্পর্কে তথ্যও জড়ো করা যায়, যেমন প্রতিটি শীর্ষের ডিগ্রি ২ কি না (তাহলে এটি একটি চক্র)।'),
      ],
      code: raw`vector<bool> vis(n + 1, false);
int cycles = 0;
for (int s = 1; s <= n; s++) if (!vis[s]) {
    bool allTwo = true;
    vector<int> st = {s}; vis[s] = true;
    while (!st.empty()) {
        int v = st.back(); st.pop_back();
        if (adj[v].size() != 2) allTwo = false;
        for (int u : adj[v]) if (!vis[u]) { vis[u] = true; st.push_back(u); }
    }
    if (allTwo) cycles++;
}`,
      example: { problem: '977E', text: L('Cyclic Components: a component is a cycle exactly when every vertex in it has degree 2.', 'Cyclic Components: একটি উপাদান চক্র ঠিক তখনই, যখন এর প্রতিটি শীর্ষের ডিগ্রি ২।') },
    },
    {
      name: L('Flood fill on a grid', 'গ্রিডে ফ্লাড ফিল'),
      explain: [
        L('Treat each free cell as a vertex connected to its four neighbours. A DFS from one free cell reaches its whole region; the order in which it finishes cells can be used to remove cells without disconnecting the rest.',
          'প্রতিটি ফাঁকা ঘরকে এর চারটি প্রতিবেশীর সঙ্গে যুক্ত শীর্ষ হিসেবে ধরো। একটি ফাঁকা ঘর থেকে DFS পুরো অঞ্চলে পৌঁছায়; যে ক্রমে ঘরগুলো শেষ হয় তা দিয়ে বাকিটা বিচ্ছিন্ন না করে ঘর সরানো যায়।'),
      ],
      code: raw`int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
function<void(int,int)> dfs = [&](int r, int c) {
    seen[r][c] = true;
    for (int d = 0; d < 4; d++) {
        int nr = r + dr[d], nc = c + dc[d];
        if (nr >= 0 && nr < n && nc >= 0 && nc < m && g[nr][nc] == '.' && !seen[nr][nc]) dfs(nr, nc);
    }
    order.push_back({r, c});   // finished: a leaf of the DFS tree
};`,
      example: { problem: '377A', text: L('Maze: turn the first k cells that DFS finishes into walls; they are leaves, so the rest stays connected.', 'Maze: DFS যে প্রথম k-টি ঘর শেষ করে সেগুলোকে দেয়াল বানাও; এগুলো পাতা, তাই বাকিটা যুক্ত থাকে।') },
    },
    {
      name: L('Detect a cycle with colours', 'রং দিয়ে চক্র শনাক্ত'),
      explain: [
        L('In a directed graph, colour vertices white (unseen), grey (on the current DFS path) and black (finished). Reaching a grey vertex means a cycle. Finished vertices in reverse order give a topological sort.',
          'নির্দেশিত গ্রাফে শীর্ষগুলোকে সাদা (না দেখা), ধূসর (বর্তমান DFS পথে) আর কালো (শেষ) রং দাও। ধূসর শীর্ষে পৌঁছানো মানে চক্র। শেষ হওয়া শীর্ষগুলোর উল্টো ক্রম টপোলজিক্যাল সর্ট দেয়।'),
      ],
      code: raw`vector<int> color(n, 0); bool cyc = false; vector<int> topo;
function<void(int)> dfs = [&](int v) {
    color[v] = 1;
    for (int u : adj[v]) {
        if (color[u] == 1) cyc = true;
        else if (color[u] == 0) dfs(u);
    }
    color[v] = 2; topo.push_back(v);
};
// reverse(topo) is a topological order when !cyc`,
      example: { text: L('Course prerequisites, build orders, “can these tasks be scheduled at all?”.', 'কোর্সের পূর্বশর্ত, বিল্ডের ক্রম, “এই কাজগুলো আদৌ সাজানো যায় কি?”।') },
    },
  ],
  mistakes: [
    L('Deep recursion on a path of 2·10⁵ vertices can overflow the stack; use an explicit stack or BFS.', '২·১০⁵ শীর্ষের পথে গভীর রিকার্শন স্ট্যাক ওভারফ্লো করতে পারে; নিজস্ব স্ট্যাক বা BFS ব্যবহার করো।'),
    L('Marking a vertex visited when popping instead of when pushing in BFS, which adds it many times.', 'BFS-এ পুশ করার বদলে পপ করার সময় visited চিহ্নিত করা, ফলে একই শীর্ষ বহুবার যোগ হয়।'),
  ],
  plan: [
    L('Do 5 component/flood-fill problems and 5 BFS shortest-path problems.', '৫টি উপাদান/ফ্লাড-ফিল আর ৫টি BFS সবচেয়ে ছোট পথের প্রবলেম করো।'),
    L('Learn topological sort and cycle detection in directed graphs.', 'নির্দেশিত গ্রাফে টপোলজিক্যাল সর্ট আর চক্র শনাক্তকরণ শেখো।'),
  ],
};

export const treesGuide: TagGuide = {
  slug: 'trees',
  intro: [
    L('A tree is a connected graph with n vertices and n − 1 edges and no cycles. Between any two vertices there is exactly one path, which makes many problems simpler: root the tree, and every vertex has one parent and a subtree below it.',
      'ট্রি হলো n শীর্ষ আর n − ১ প্রান্তের একটি যুক্ত গ্রাফ, যাতে কোনো চক্র নেই। যেকোনো দুই শীর্ষের মধ্যে ঠিক একটি পথ, যা অনেক প্রবলেম সহজ করে: ট্রিকে একটি মূল দাও, তাহলে প্রতিটি শীর্ষের একটি parent আর নিচে একটি সাবট্রি থাকে।'),
    L('Most tree problems are solved with one DFS that carries information down from the root (depths, counts on the path) or up from the leaves (subtree sizes, subtree DP).',
      'বেশিরভাগ ট্রি প্রবলেম একটি DFS দিয়ে সমাধান হয়, যা মূল থেকে নিচে তথ্য নামায় (গভীরতা, পথের গণনা) বা পাতা থেকে ওপরে তোলে (সাবট্রির আকার, সাবট্রি DP)।'),
  ],
  recognize: [
    L('n vertices and exactly n − 1 edges, “it is guaranteed the graph is connected”.', 'n শীর্ষ আর ঠিক n − ১ প্রান্ত, “গ্রাফটি যুক্ত হওয়ার নিশ্চয়তা আছে”।'),
    L('Parents, children, subtrees, leaves, root.', 'parent, সন্তান, সাবট্রি, পাতা, মূল।'),
  ],
  patterns: [
    {
      name: L('Carry state down from the root', 'মূল থেকে অবস্থা নিচে নামানো'),
      explain: [
        L('Pass the needed information as DFS parameters. To count leaves reachable without more than m consecutive cats, pass the current run of cats; reset it to 0 on a cat-free vertex and stop when it passes m.',
          'দরকারি তথ্য DFS-এর প্যারামিটার হিসেবে দাও। পরপর m-এর বেশি বিড়াল ছাড়া যত পাতায় পৌঁছানো যায় তা গুনতে বর্তমান বিড়ালের ধারা পাঠাও; বিড়ালহীন শীর্ষে এটি ০ করো আর m ছাড়ালে থামো।'),
      ],
      code: raw`int leaves = 0;
function<void(int,int,int)> dfs = [&](int v, int parent, int run) {
    run = cat[v] ? run + 1 : 0;
    if (run > m) return;
    bool leaf = true;
    for (int u : adj[v]) if (u != parent) { leaf = false; dfs(u, v, run); }
    if (leaf) leaves++;
};
dfs(1, 0, 0);`,
      example: { problem: '580C', text: L('Kefa and Park: count restaurants (leaves) whose path from home never has more than m cats in a row.', 'Kefa and Park: এমন রেস্তোরাঁ (পাতা) গুনো যেখানে বাড়ি থেকে পথে কখনো পরপর m-এর বেশি বিড়াল নেই।') },
    },
    {
      name: L('Subtree sizes from the leaves up', 'পাতা থেকে ওপরে সাবট্রির আকার'),
      explain: [
        L('size[v] = 1 + the sizes of its children. Many answers use it: the number of paths through an edge is size[child] · (n − size[child]).',
          'size[v] = ১ + সন্তানদের আকারের যোগফল। অনেক উত্তরে এটি লাগে: একটি প্রান্ত দিয়ে যাওয়া পথের সংখ্যা size[child] · (n − size[child])।'),
      ],
      code: raw`vector<int> sz(n + 1, 1);
function<void(int,int)> dfs = [&](int v, int p) {
    for (int u : adj[v]) if (u != p) { dfs(u, v); sz[v] += sz[u]; }
};`,
      example: { text: L('Sum of all pairwise distances in a tree: add size · (n − size) for every edge.', 'ট্রিতে সব জোড়ার দূরত্বের যোগফল: প্রতিটি প্রান্তের জন্য size · (n − size) যোগ করো।') },
    },
    {
      name: L('Depth via BFS from the root', 'মূল থেকে BFS দিয়ে গভীরতা'),
      explain: [
        L('BFS from the root assigns depth[child] = depth[parent] + 1. Iterative BFS avoids recursion limits on long chains. Running BFS twice (from any vertex, then from the farthest one) also gives the diameter.',
          'মূল থেকে BFS depth[child] = depth[parent] + ১ দেয়। লম্বা শৃঙ্খলে পুনরাবৃত্ত BFS রিকার্শনের সীমা এড়ায়। দুবার BFS চালালে (যেকোনো শীর্ষ থেকে, তারপর সবচেয়ে দূরেরটি থেকে) ব্যাসও পাওয়া যায়।'),
      ],
      code: raw`vector<int> depth(n + 1, -1);
queue<int> q; q.push(root); depth[root] = 0;
while (!q.empty()) {
    int v = q.front(); q.pop();
    for (int u : adj[v]) if (depth[u] == -1) { depth[u] = depth[v] + 1; q.push(u); }
}`,
      example: { problem: '115A', text: L('Party: each company hierarchy is a tree; the largest depth is the answer.', 'Party: প্রতিটি কোম্পানির শ্রেণিবিন্যাস একটি ট্রি; সবচেয়ে বড় গভীরতাই উত্তর।') },
    },
  ],
  mistakes: [
    L('Walking back to the parent in DFS: always skip u == parent.', 'DFS-এ parent-এ ফিরে যাওয়া: সবসময় u == parent বাদ দাও।'),
    L('Counting the root as a leaf when n = 1 or when it has one child.', 'n = ১ হলে বা এর একটি সন্তান থাকলে মূলকে পাতা গোনা।'),
    L('Stack overflow from recursion on a 2·10⁵-long chain.', '২·১০⁵ লম্বা শৃঙ্খলে রিকার্শনে স্ট্যাক ওভারফ্লো।'),
  ],
  plan: [
    L('Do 5 problems with depths, leaves and subtree sizes.', 'গভীরতা, পাতা আর সাবট্রির আকার নিয়ে ৫টি প্রবলেম করো।'),
    L('Then 5 tree DP problems (dp[v][taken or not]).', 'তারপর ৫টি ট্রি DP প্রবলেম (dp[v][নেওয়া বা না])।'),
    L('Learn LCA with binary lifting for path queries.', 'পথের কোয়েরির জন্য বাইনারি লিফটিং দিয়ে LCA শেখো।'),
  ],
};

export const shortestPathsGuide: TagGuide = {
  slug: 'shortest-paths',
  intro: [
    L('Shortest path problems ask for the cheapest way between vertices. With all edges of cost 1, BFS is enough. With non-negative weights, Dijkstra’s algorithm with a priority queue runs in O((n + m) log n). With tiny n, Floyd–Warshall gives all pairs in O(n³).',
      'সবচেয়ে ছোট পথের প্রবলেম শীর্ষগুলোর মধ্যে সবচেয়ে সস্তা পথ চায়। সব প্রান্তের খরচ ১ হলে BFS যথেষ্ট। অঋণাত্মক ওজনে প্রায়োরিটি কিউসহ ডাইকস্ট্রার অ্যালগরিদম O((n + m) log n)-এ চলে। খুব ছোট n হলে ফ্লয়েড–ওয়ারশাল O(n³)-এ সব জোড়া দেয়।'),
    L('Dijkstra repeatedly takes the closest unfinished vertex and relaxes its edges: if going through it makes a neighbour cheaper, update the neighbour.',
      'ডাইকস্ট্রা বারবার সবচেয়ে কাছের অসমাপ্ত শীর্ষ নেয় আর এর প্রান্তগুলো শিথিল করে: এর মধ্য দিয়ে গেলে কোনো প্রতিবেশী সস্তা হলে প্রতিবেশীকে আপডেট করে।'),
  ],
  recognize: [
    L('Weighted edges and “minimum cost/time/distance from 1 to n”.', 'ওজনযুক্ত প্রান্ত আর “১ থেকে n পর্যন্ত সর্বনিম্ন খরচ/সময়/দূরত্ব”।'),
    L('“Print the path itself”: keep a parent array.', '“পথটাই প্রিন্ট করো”: একটি parent অ্যারে রাখো।'),
  ],
  patterns: [
    {
      name: L('Dijkstra with a priority queue', 'প্রায়োরিটি কিউসহ ডাইকস্ট্রা'),
      explain: [
        L('Push (distance, vertex) pairs into a min-heap. When popping, skip stale entries whose distance is larger than the recorded one. Record the parent to rebuild the path.',
          'মিন-হিপে (দূরত্ব, শীর্ষ) জোড়া পুশ করো। পপ করার সময় যেসব পুরনো এন্ট্রির দূরত্ব রেকর্ড করা দূরত্বের চেয়ে বেশি সেগুলো বাদ দাও। পথ আবার বানাতে parent রেকর্ড করো।'),
      ],
      code: raw`vector<long long> d(n + 1, LLONG_MAX); vector<int> par(n + 1, -1);
priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
d[1] = 0; pq.push({0, 1});
while (!pq.empty()) {
    auto [dv, v] = pq.top(); pq.pop();
    if (dv != d[v]) continue;
    for (auto [u, w] : adj[v])
        if (d[v] + w < d[u]) { d[u] = d[v] + w; par[u] = v; pq.push({d[u], u}); }
}`,
      example: { problem: '20C', text: L('Dijkstra?: find the shortest path from 1 to n and print it by following par back from n, or −1 if unreachable.', 'Dijkstra?: ১ থেকে n পর্যন্ত সবচেয়ে ছোট পথ বের করে n থেকে par ধরে পিছিয়ে প্রিন্ট করো, অপ্রাপ্য হলে −১।') },
    },
    {
      name: L('0–1 BFS', '০–১ BFS'),
      explain: [
        L('When edges cost only 0 or 1, use a deque: push 0-cost neighbours to the front and 1-cost ones to the back. It gives the same result as Dijkstra in O(n + m).',
          'প্রান্তের খরচ শুধু ০ বা ১ হলে একটি deque ব্যবহার করো: ০-খরচের প্রতিবেশী সামনে আর ১-খরচের পেছনে পুশ করো। এটি O(n + m)-এ ডাইকস্ট্রার একই ফল দেয়।'),
      ],
      code: raw`deque<int> dq; dq.push_back(s); d[s] = 0;
while (!dq.empty()) {
    int v = dq.front(); dq.pop_front();
    for (auto [u, w] : adj[v]) if (d[v] + w < d[u]) {
        d[u] = d[v] + w;
        w ? dq.push_back(u) : dq.push_front(u);
    }
}`,
      example: { text: L('Grids where some moves are free (following an arrow) and others cost one (changing it).', 'এমন গ্রিড যেখানে কিছু চাল বিনামূল্যে (তীর অনুসরণ) আর কিছুতে একটি খরচ (তীর বদলানো)।') },
    },
    {
      name: L('Floyd–Warshall for all pairs', 'সব জোড়ার জন্য ফ্লয়েড–ওয়ারশাল'),
      explain: [
        L('For n ≤ 400, three nested loops with k outermost compute every pairwise distance: d[i][j] = min(d[i][j], d[i][k] + d[k][j]).',
          'n ≤ ৪০০ হলে k সবচেয়ে বাইরে রেখে তিনটি নেস্টেড লুপ প্রতিটি জোড়ার দূরত্ব বের করে: d[i][j] = min(d[i][j], d[i][k] + d[k][j])।'),
      ],
      code: raw`for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);`,
      example: { text: L('Small graphs with many distance queries.', 'অনেক দূরত্ব-কোয়েরিসহ ছোট গ্রাফ।') },
    },
  ],
  mistakes: [
    L('Using int distances that overflow: sums of 10⁵ edges of 10⁹ need long long.', 'ওভারফ্লো করে এমন int দূরত্ব: ১০⁹-এর ১০⁵টি প্রান্তের যোগফলে long long লাগে।'),
    L('Running Dijkstra with negative edges.', 'ঋণাত্মক প্রান্তে ডাইকস্ট্রা চালানো।'),
    L('Not skipping stale heap entries, which makes it slow.', 'পুরনো হিপ এন্ট্রি বাদ না দেওয়া, যাতে ধীর হয়।'),
  ],
  plan: [
    L('Write Dijkstra from memory and solve 5 problems with it.', 'স্মৃতি থেকে ডাইকস্ট্রা লিখে ৫টি প্রবলেম করো।'),
    L('Learn 0–1 BFS and Floyd–Warshall, 3 problems each.', '০–১ BFS আর ফ্লয়েড–ওয়ারশাল শেখো, প্রতিটিতে ৩টি প্রবলেম।'),
    L('Then multi-source Dijkstra and Dijkstra on states (vertex, extra info).', 'তারপর বহু-উৎস ডাইকস্ট্রা আর অবস্থার ওপর ডাইকস্ট্রা (শীর্ষ, বাড়তি তথ্য)।'),
  ],
};

export const dsuGuide: TagGuide = {
  slug: 'dsu',
  intro: [
    L('A disjoint set union (union–find) keeps elements in groups and supports two operations: find the group of an element, and merge two groups. With path compression and union by size, both are almost O(1).',
      'ডিসজয়েন্ট সেট ইউনিয়ন (ইউনিয়ন–ফাইন্ড) উপাদানগুলোকে দলে রাখে আর দুটি অপারেশন সমর্থন করে: একটি উপাদানের দল খোঁজা, আর দুটি দল মেলানো। পাথ কমপ্রেশন আর আকার অনুযায়ী ইউনিয়নে দুটিই প্রায় O(১)।'),
    L('Use it when edges arrive one at a time and you need to know, at each moment, which vertices are connected.',
      'যখন প্রান্তগুলো একটি একটি করে আসে আর প্রতি মুহূর্তে কোন শীর্ষগুলো যুক্ত তা জানা দরকার, তখন এটি ব্যবহার করো।'),
  ],
  recognize: [
    L('“Merge”, “join”, “are x and y in the same group?”.', '“মেলাও”, “যুক্ত করো”, “x আর y কি একই দলে?”।'),
    L('Kruskal’s minimum spanning tree.', 'ক্রুসকালের সর্বনিম্ন স্প্যানিং ট্রি।'),
    L('Counting components while edges are added.', 'প্রান্ত যোগ হওয়ার সময় উপাদান গোনা।'),
  ],
  patterns: [
    {
      name: L('The DSU template', 'DSU টেমপ্লেট'),
      explain: [
        L('p[x] points towards the group’s representative; size[r] is the group size at its representative. find flattens the path as it goes; unite attaches the smaller group under the larger.',
          'p[x] দলের প্রতিনিধির দিকে নির্দেশ করে; size[r] হলো প্রতিনিধির কাছে দলের আকার। find চলতে চলতে পথ সমান করে; unite ছোট দলকে বড়টির নিচে জোড়ে।'),
      ],
      code: raw`struct DSU {
    vector<int> p, sz;
    DSU(int n) : p(n), sz(n, 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a), b = find(b);
        if (a == b) return false;
        if (sz[a] < sz[b]) swap(a, b);
        p[b] = a; sz[a] += sz[b];
        return true;
    }
};`,
      example: { problem: '1167C', text: L('News Distribution: unite all members of each group, then each user’s answer is the size of their set.', 'News Distribution: প্রতিটি দলের সব সদস্যকে যুক্ত করো, তারপর প্রতিটি ব্যবহারকারীর উত্তর তার সেটের আকার।') },
    },
    {
      name: L('Find redundant edges', 'অপ্রয়োজনীয় প্রান্ত খোঁজা'),
      explain: [
        L('Process edges in order; if unite returns false, the edge closes a cycle and is redundant. The components left over need component count − 1 new edges to connect.',
          'প্রান্তগুলো ক্রমে দেখো; unite false দিলে প্রান্তটি একটি চক্র বন্ধ করে আর অপ্রয়োজনীয়। যে উপাদানগুলো থাকে সেগুলো যুক্ত করতে উপাদানের সংখ্যা − ১টি নতুন প্রান্ত লাগে।'),
      ],
      code: raw`vector<pair<int,int>> extra;
for (auto [a, b] : roads) if (!d.unite(a, b)) extra.push_back({a, b});
vector<int> roots;
for (int v = 1; v <= n; v++) if (d.find(v) == v) roots.push_back(v);
// close extra[i] and build roots[i] - roots[i + 1]`,
      example: { problem: '25D', text: L('Roads not only in Berland: each redundant road is moved to join two different components.', 'Roads not only in Berland: প্রতিটি অপ্রয়োজনীয় রাস্তা সরিয়ে দুটি আলাদা উপাদান জোড়া হয়।') },
    },
    {
      name: L('Kruskal’s minimum spanning tree', 'ক্রুসকালের সর্বনিম্ন স্প্যানিং ট্রি'),
      explain: [
        L('Sort edges by weight and add each one whose ends are in different components. The chosen edges form a minimum spanning tree.',
          'প্রান্তগুলো ওজন অনুযায়ী সর্ট করো আর যার দুই প্রান্ত আলাদা উপাদানে, সেটি যোগ করো। বাছা প্রান্তগুলো একটি সর্বনিম্ন স্প্যানিং ট্রি গঠন করে।'),
      ],
      code: raw`sort(edges.begin(), edges.end());   // (w, u, v)
long long total = 0;
for (auto [w, u, v] : edges) if (d.unite(u, v)) total += w;`,
      example: { text: L('Connect all cities with the cheapest set of roads.', 'সবচেয়ে সস্তা রাস্তার সেট দিয়ে সব শহর যুক্ত করো।') },
    },
  ],
  mistakes: [
    L('Reading size[x] instead of size[find(x)].', 'size[find(x)]-এর বদলে size[x] পড়া।'),
    L('Forgetting to initialise p[i] = i.', 'p[i] = i শুরু করতে ভুলে যাওয়া।'),
  ],
  plan: [
    L('Memorise the template and solve 5 DSU problems rated 1300–1600.', 'টেমপ্লেট মুখস্থ করে ১৩০০–১৬০০ রেটিংয়ের ৫টি DSU প্রবলেম করো।'),
    L('Implement Kruskal and solve 3 MST problems.', 'ক্রুসকাল লিখে ৩টি MST প্রবলেম করো।'),
  ],
};

export const flowsGuide: TagGuide = {
  slug: 'flows',
  intro: [
    L('Flow problems send as much “stuff” as possible from a source to a sink through edges with capacities. The max-flow equals the min-cut: the cheapest set of edges whose removal separates source from sink.',
      'ফ্লো প্রবলেম ক্ষমতাসহ প্রান্ত দিয়ে একটি উৎস থেকে একটি গন্তব্যে যত বেশি সম্ভব “জিনিস” পাঠায়। সর্বোচ্চ ফ্লো সর্বনিম্ন কাটের সমান: সবচেয়ে সস্তা প্রান্তের সেট যা সরালে উৎস আর গন্তব্য আলাদা হয়।'),
    L('Many problems that do not look like flows are flows in disguise: assignments, choosing a closed set of projects, splitting into two camps with penalties. Dinic’s algorithm is the usual implementation.',
      'ফ্লো মনে না হওয়া অনেক প্রবলেম আসলে ছদ্মবেশী ফ্লো: বরাদ্দ, প্রকল্পের বন্ধ সেট বাছা, জরিমানাসহ দুই শিবিরে ভাগ। ডিনিকের অ্যালগরিদম প্রচলিত বাস্তবায়ন।'),
  ],
  recognize: [
    L('Small n (≤ 1000) with “maximum number of disjoint …” or “minimum cost to separate …”.', 'ছোট n (≤ ১০০০) সঙ্গে “সর্বোচ্চ সংখ্যক আলাদা …” বা “আলাদা করার সর্বনিম্ন খরচ …”।'),
    L('Each item must be in one of two groups, with gains and penalties.', 'প্রতিটি জিনিসকে দুটি দলের একটিতে থাকতে হবে, লাভ আর জরিমানাসহ।'),
  ],
  patterns: [
    {
      name: L('Dinic’s max-flow', 'ডিনিকের সর্বোচ্চ ফ্লো'),
      explain: [
        L('Build a level graph with BFS, then push blocking flow with DFS along edges that go one level deeper. Repeat until the sink is unreachable. Every edge has a reverse edge with capacity 0 so flow can be undone.',
          'BFS দিয়ে স্তরের গ্রাফ বানাও, তারপর এক স্তর গভীরে যাওয়া প্রান্ত ধরে DFS দিয়ে ব্লকিং ফ্লো পাঠাও। গন্তব্য অপ্রাপ্য না হওয়া পর্যন্ত পুনরাবৃত্তি করো। প্রতিটি প্রান্তের ০ ক্ষমতার একটি উল্টো প্রান্ত থাকে যাতে ফ্লো ফেরানো যায়।'),
      ],
      code: raw`struct E { int to; long long cap; };
vector<E> e; vector<vector<int>> g; vector<int> lvl, it;
void add(int u, int v, long long c) { g[u].push_back(e.size()); e.push_back({v, c}); g[v].push_back(e.size()); e.push_back({u, 0}); }
bool bfs(int s, int t) { lvl.assign(g.size(), -1); queue<int> q; q.push(s); lvl[s] = 0;
    while (!q.empty()) { int v = q.front(); q.pop(); for (int id : g[v]) if (e[id].cap > 0 && lvl[e[id].to] < 0) { lvl[e[id].to] = lvl[v] + 1; q.push(e[id].to); } }
    return lvl[t] >= 0; }
long long dfs(int v, int t, long long f) { if (v == t) return f;
    for (int& i = it[v]; i < (int)g[v].size(); i++) { E& x = e[g[v][i]];
        if (x.cap > 0 && lvl[x.to] == lvl[v] + 1) { long long got = dfs(x.to, t, min(f, x.cap));
            if (got) { x.cap -= got; e[g[v][i] ^ 1].cap += got; return got; } } }
    return 0; }`,
      example: { problem: '1082G', text: L('Petya and Graph: choosing edges forces choosing their endpoints; maximise weight minus cost as a project-selection min cut.', 'Petya and Graph: প্রান্ত বাছলে তার প্রান্তবিন্দু বাছতে হয়; ওজন বিয়োগ খরচ সর্বোচ্চ করো, প্রজেক্ট-নির্বাচনের মিন কাট হিসেবে।') },
    },
    {
      name: L('Project selection as a min cut', 'মিন কাট হিসেবে প্রজেক্ট নির্বাচন'),
      explain: [
        L('Connect the source to every profitable item with its profit and every costly item to the sink with its cost; add infinite edges for “taking A requires B”. The answer is total profit − max-flow.',
          'উৎসকে প্রতিটি লাভজনক জিনিসের সঙ্গে তার লাভ দিয়ে, আর প্রতিটি খরচের জিনিসকে গন্তব্যের সঙ্গে তার খরচ দিয়ে যুক্ত করো; “A নিলে B নিতে হবে”-র জন্য অসীম প্রান্ত যোগ করো। উত্তর হলো মোট লাভ − সর্বোচ্চ ফ্লো।'),
      ],
      code: raw`for (int i = 0; i < m; i++) { add(S, edgeNode[i], w[i]); add(edgeNode[i], u[i], INF); add(edgeNode[i], v[i], INF); }
for (int v = 0; v < n; v++) add(v, T, a[v]);
cout << totalW - maxflow(S, T) << "\n";`,
      example: { text: L('The same construction solves many “closure” problems.', 'একই গঠন অনেক “ক্লোজার” প্রবলেম সমাধান করে।') },
    },
  ],
  mistakes: [
    L('Forgetting reverse edges.', 'উল্টো প্রান্ত ভুলে যাওয়া।'),
    L('Using too small an “infinite” capacity.', 'খুব ছোট “অসীম” ক্ষমতা ব্যবহার।'),
  ],
  plan: [
    L('Learn flows after you are comfortable at 1900+; they appear mostly in Div 1.', '১৯০০+-এ স্বচ্ছন্দ হওয়ার পর ফ্লো শেখো; এগুলো বেশিরভাগ Div 1-এ আসে।'),
    L('Implement Dinic and solve classic max-flow, bipartite matching and min-cut problems.', 'ডিনিক লিখে ক্লাসিক সর্বোচ্চ ফ্লো, বাইপার্টাইট ম্যাচিং আর মিন-কাট প্রবলেম করো।'),
  ],
};

export const matchingsGuide: TagGuide = {
  slug: 'matchings',
  intro: [
    L('A matching pairs vertices so that no vertex is used twice. In bipartite graphs (two sides, edges only across), the maximum matching can be found with Kuhn’s augmenting-path algorithm or with max-flow.',
      'ম্যাচিং শীর্ষগুলোকে এমনভাবে জোড়া দেয় যাতে কোনো শীর্ষ দুবার ব্যবহার না হয়। বাইপার্টাইট গ্রাফে (দুই পাশ, প্রান্ত শুধু এপার-ওপার) সর্বোচ্চ ম্যাচিং কুনের অগমেন্টিং-পাথ অ্যালগরিদম বা সর্বোচ্চ ফ্লো দিয়ে পাওয়া যায়।'),
    L('Simple cases are solved greedily: when both sides lie on a line and a pair is allowed if the values are close, sorting both and matching in order is optimal.',
      'সরল কেস গ্রিডিভাবে সমাধান হয়: দুই পাশ একটি রেখায় থাকলে আর মান কাছাকাছি হলে জোড়া অনুমোদিত হলে, দুটিই সর্ট করে ক্রমে মেলানো সেরা।'),
  ],
  recognize: [
    L('“Pair boys with girls”, “assign workers to jobs”, “each item used at most once”.', '“ছেলেদের মেয়েদের সঙ্গে জোড়া”, “কর্মীদের কাজে বরাদ্দ”, “প্রতিটি জিনিস সর্বোচ্চ একবার”।'),
  ],
  patterns: [
    {
      name: L('Greedy matching after sorting', 'সর্টের পর গ্রিডি ম্যাচিং'),
      explain: [
        L('Sort both lists. Walk with two pointers: if the current pair is compatible, match it and advance both; otherwise advance the smaller one, since it cannot match anything later.',
          'দুটি তালিকাই সর্ট করো। দুটি পয়েন্টার নিয়ে চলো: বর্তমান জোড়া মিললে মেলাও আর দুটোই এগোও; না হলে ছোটটি এগোও, কারণ সেটি পরে কারও সঙ্গে মিলবে না।'),
      ],
      code: raw`sort(a.begin(), a.end()); sort(b.begin(), b.end());
int i = 0, j = 0, pairs = 0;
while (i < n && j < m) {
    if (abs(a[i] - b[j]) <= 1) { pairs++; i++; j++; }
    else if (a[i] < b[j]) i++;
    else j++;
}`,
      example: { problem: '489B', text: L('BerSU Ball: boys and girls dance together if their skills differ by at most 1; greedy after sorting is optimal.', 'BerSU Ball: দক্ষতার পার্থক্য সর্বোচ্চ ১ হলে ছেলে আর মেয়ে একসঙ্গে নাচে; সর্টের পর গ্রিডি সেরা।') },
    },
    {
      name: L('Kuhn’s algorithm', 'কুনের অ্যালগরিদম'),
      explain: [
        L('For each left vertex, try to find an augmenting path with DFS: take a free right neighbour, or a matched one whose partner can be re-matched elsewhere. O(n · m) is fine for a few thousand edges.',
          'প্রতিটি বাম শীর্ষের জন্য DFS দিয়ে একটি অগমেন্টিং পথ খোঁজো: একটি মুক্ত ডান প্রতিবেশী নাও, বা এমন একটি মিলিত প্রতিবেশী যার সঙ্গী অন্যত্র আবার মিলতে পারে। কয়েক হাজার প্রান্তে O(n · m) ঠিক আছে।'),
      ],
      code: raw`vector<int> mt(R, -1); vector<bool> used;
function<bool(int)> tryKuhn = [&](int v) {
    if (used[v]) return false; used[v] = true;
    for (int u : adj[v]) if (mt[u] == -1 || tryKuhn(mt[u])) { mt[u] = v; return true; }
    return false;
};
int match = 0;
for (int v = 0; v < Lsz; v++) { used.assign(Lsz, false); if (tryKuhn(v)) match++; }`,
      example: { text: L('General bipartite matching when the greedy order does not work.', 'গ্রিডি ক্রম কাজ না করলে সাধারণ বাইপার্টাইট ম্যাচিং।') },
    },
  ],
  mistakes: [
    L('Applying a greedy to a general matching without a proof.', 'প্রমাণ ছাড়া সাধারণ ম্যাচিংয়ে গ্রিডি প্রয়োগ।'),
    L('Resetting used only once instead of before every augmentation.', 'প্রতিটি অগমেন্টেশনের আগে না করে used শুধু একবার রিসেট করা।'),
  ],
  plan: [
    L('Solve the greedy matching problems first (rated 1000–1400).', 'আগে গ্রিডি ম্যাচিং প্রবলেম করো (১০০০–১৪০০)।'),
    L('Then implement Kuhn and use it on 3 assignment problems.', 'তারপর কুন লিখে ৩টি বরাদ্দ প্রবলেমে ব্যবহার করো।'),
  ],
};

export const twoSatGuide: TagGuide = {
  slug: '2-sat',
  intro: [
    L('2-SAT decides whether boolean variables can be set so that a list of clauses “a or b” all hold, where a and b are variables or their negations. Each clause becomes two implications (¬a → b, ¬b → a) in a graph of 2n literals.',
      '২-স্যাট ঠিক করে বুলিয়ান চলকগুলো এমনভাবে বসানো যায় কি না যাতে “a অথবা b” ধরনের সব শর্ত মানে, যেখানে a আর b চলক বা তাদের নেতিবাচক। প্রতিটি শর্ত ২n লিটারালের গ্রাফে দুটি অনুসিদ্ধান্ত হয় (¬a → b, ¬b → a)।'),
    L('A solution exists exactly when no variable is in the same strongly connected component as its negation, which Tarjan’s or Kosaraju’s algorithm checks in O(n + m).',
      'সমাধান থাকে ঠিক তখনই, যখন কোনো চলক তার নেতিবাচকের সঙ্গে একই সবলভাবে যুক্ত উপাদানে নেই, যা টারজান বা কোসারাজুর অ্যালগরিদম O(n + m)-এ যাচাই করে।'),
  ],
  recognize: [
    L('Each item has two choices (on/off, left/right), and constraints involve pairs of items.', 'প্রতিটি জিনিসের দুটি বিকল্প (চালু/বন্ধ, বাম/ডান), আর শর্তগুলো জোড়া জিনিস নিয়ে।'),
  ],
  patterns: [
    {
      name: L('Equal or different as clauses', 'শর্ত হিসেবে সমান বা আলাদা'),
      explain: [
        L('“x and y must be equal” is (x → y), (y → x), (¬x → ¬y), (¬y → ¬x). “Different” is the same with one side negated. Problems with only equal/different constraints can also be solved with a DSU or a 2-colouring.',
          '“x আর y সমান হতে হবে” হলো (x → y), (y → x), (¬x → ¬y), (¬y → ¬x)। “আলাদা” একই, এক পাশ নেতিবাচক করে। শুধু সমান/আলাদা শর্তের প্রবলেম DSU বা ২-রঙ দিয়েও সমাধান হয়।'),
      ],
      code: raw`// literal 2*x = x is true, 2*x+1 = x is false
auto imp = [&](int a, int b) { g[a].push_back(b); g[b ^ 1].push_back(a ^ 1); };
// door d controlled by switches x, y; locked (r = 0) means exactly one must flip
if (r[d]) { imp(2*x, 2*y); imp(2*x+1, 2*y+1); }
else      { imp(2*x, 2*y+1); imp(2*x+1, 2*y); }`,
      example: { problem: '776D', text: L('The Door Problem: each door has two switches; locked doors need exactly one flip, unlocked doors zero or two.', 'The Door Problem: প্রতিটি দরজার দুটি সুইচ; তালাবন্ধ দরজায় ঠিক একটি উল্টাতে হবে, খোলা দরজায় শূন্য বা দুটি।') },
    },
  ],
  mistakes: [
    L('Adding only one of the two implications of a clause.', 'একটি শর্তের দুটি অনুসিদ্ধান্তের শুধু একটি যোগ করা।'),
    L('Mixing up the literal numbering for negations.', 'নেতিবাচকের জন্য লিটারালের নম্বর গুলিয়ে ফেলা।'),
  ],
  plan: [
    L('Learn SCCs first (Kosaraju or Tarjan).', 'আগে SCC শেখো (কোসারাজু বা টারজান)।'),
    L('Then solve 3 2-SAT problems; most are rated 2000+.', 'তারপর ৩টি ২-স্যাট প্রবলেম করো; বেশিরভাগ ২০০০+ রেটিংয়ের।'),
  ],
};
