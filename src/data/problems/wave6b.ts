import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p580C: ProblemEntry = {
  id: '580C',
  contestId: 580,
  index: 'C',
  name: 'Kefa and Park',
  rating: 1500,
  tags: ['dfs', 'graphs', 'trees'],
  featuredFor: ['trees'],
  why: L('Carry information down a tree: the current run of cats on the path.', 'ট্রিতে তথ্য নিচে নামানো: পথে বিড়ালের চলতি ধারা।'),
  statement: L(
    'A park is a tree rooted at vertex 1 (Kefa’s home); leaves are restaurants. Some vertices have cats. Kefa refuses any path containing more than m consecutive vertices with cats. How many restaurants can he reach?',
    'একটি পার্ক শীর্ষ ১-এ (কেফার বাড়ি) মূলযুক্ত একটি ট্রি; পাতাগুলো রেস্তোরাঁ। কিছু শীর্ষে বিড়াল আছে। কেফা এমন কোনো পথ নেয় না যেখানে বিড়ালসহ পরপর m-এর বেশি শীর্ষ। সে কয়টি রেস্তোরাঁয় পৌঁছাতে পারে?',
  ),
  input: L('n and m, the cat flags, then n − 1 edges.', 'n আর m, বিড়ালের ফ্ল্যাগ, তারপর n − ১টি প্রান্ত।'),
  output: L('The number of reachable restaurants.', 'পৌঁছানো যায় এমন রেস্তোরাঁর সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵', '২ ≤ n ≤ ১০⁵')] },
  samples: [
    { input: '4 1\n1 1 0 0\n1 2\n1 3\n1 4', output: '2', explain: L('Leaf 2 makes two cats in a row.', 'পাতা ২-এ পরপর দুটি বিড়াল।') },
    { input: '7 1\n1 0 1 1 0 0 0\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7', output: '2', explain: L('Leaves 6 and 7 are behind two cats.', 'পাতা ৬ আর ৭ দুটি বিড়ালের পেছনে।') },
  ],
  observation: L('Walking down from the root, keep the number of consecutive cat vertices ending at the current one. If it exceeds m, the whole subtree is unreachable.', 'মূল থেকে নিচে নামার সময় বর্তমান শীর্ষে শেষ হওয়া পরপর বিড়াল-শীর্ষের সংখ্যা রাখুন। এটি m ছাড়ালে পুরো সাবট্রি অপ্রাপ্য।'),
  approach: [L('Iterative DFS with (vertex, parent, run) on a stack; count leaves reached.', 'স্ট্যাকে (শীর্ষ, parent, ধারা) সহ পুনরাবৃত্ত DFS; পৌঁছানো পাতা গুনুন।')],
  walkthrough: { input: 'sample 2', steps: [{ state: '1 (run 1) → 3 (run 2 > 1)', text: L('Prune the subtree of 3. Leaves 4, 5 reached.', '৩-এর সাবট্রি বাদ। পাতা ৪, ৫-এ পৌঁছানো।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each vertex once.', 'প্রতিটি শীর্ষ একবার।') },
  solutions: [
    {
      id: 'dfs',
      kind: 'optimal',
      title: L('DFS carrying the cat run', 'বিড়ালের ধারা নিয়ে DFS'),
      idea: L('run = cat[v] ? run + 1 : 0; stop if run > m.', 'run = cat[v] ? run + ১ : ০; run > m হলে থামুন।'),
      explain: [L('A leaf is a non-root vertex with only its parent as a neighbour. An explicit stack avoids recursion depth problems on a 10⁵-long path.', 'পাতা হলো মূল নয় এমন শীর্ষ যার প্রতিবেশী শুধু parent। স্পষ্ট স্ট্যাক ১০⁵ লম্বা পথে রিকার্শনের গভীরতার সমস্যা এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> cat(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &cat[i]);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    int leaves = 0;
    vector<array<int, 3>> st = {{1, 0, 0}};
    while (!st.empty()) {
        auto [v, par, run] = st.back();
        st.pop_back();
        run = cat[v] ? run + 1 : 0;
        if (run > m) continue;
        bool leaf = true;
        for (int u : adj[v]) if (u != par) { leaf = false; st.push_back({u, v, run}); }
        if (leaf) leaves++;
    }
    printf("%d\n", leaves);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['structured-bindings', 'stack-queue'],
    },
    {
      id: 'bfs',
      kind: 'method',
      title: L('BFS storing the run per vertex', 'প্রতি শীর্ষে ধারা রেখে BFS'),
      idea: L('run[child] = cat[child] ? run[v] + 1 : 0, computed level by level.', 'run[child] = cat[child] ? run[v] + ১ : ০, স্তরে স্তরে হিসাব।'),
      explain: [L('Storing the value in an array instead of on the stack works the same for any “carry down” quantity, such as depth or path sums.', 'স্ট্যাকের বদলে অ্যারেতে মান রাখা যেকোনো “নিচে নামানো” পরিমাণে একইভাবে কাজ করে, যেমন গভীরতা বা পথের যোগফল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> cat(n + 1), run(n + 1, -1);
    for (int i = 1; i <= n; i++) scanf("%d", &cat[i]);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    int leaves = 0;
    queue<int> q;
    run[1] = cat[1];
    if (run[1] <= m) q.push(1);
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        bool leaf = true;
        for (int u : adj[v]) {
            if (run[u] != -1) continue;
            leaf = false;
            run[u] = cat[u] ? run[v] + 1 : 0;
            if (run[u] <= m) q.push(u);
        }
        if (leaf && v != 1) leaves++;
    }
    printf("%d\n", leaves);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [
    { input: '4 1\n1 1 0 0\n1 2\n1 3\n1 4', output: '2', source: 'sample', note: sample(1) },
    { input: '7 1\n1 0 1 1 0 0 0\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7', output: '2', source: 'sample', note: sample(2) },
    { input: '2 1\n0 0\n1 2', output: '1', source: 'own', note: L('One restaurant, no cats.', 'একটি রেস্তোরাঁ, বিড়াল নেই।') },
  ],
  pitfalls: [L('Counting all cats on the path instead of consecutive ones.', 'পরপরের বদলে পথের সব বিড়াল গোনা।'), L('Counting the root as a leaf.', 'মূলকে পাতা গোনা।')],
  related: [{ id: '115A', name: 'Party', why: L('Depth in a tree.', 'ট্রিতে গভীরতা।') }],
  toolkit: ['stack-queue'],
};

export const p977E: ProblemEntry = {
  id: '977E',
  contestId: 977,
  index: 'E',
  name: 'Cyclic Components',
  rating: 1500,
  tags: ['dfs', 'dsu', 'graphs'],
  why: L('A component is a simple cycle exactly when every vertex has degree 2.', 'একটি উপাদান সরল চক্র ঠিক তখনই, যখন প্রতিটি শীর্ষের ডিগ্রি ২।'),
  statement: L(
    'An undirected graph with n vertices and m edges (no loops or multi-edges) is given. Count the connected components that are cycles: every vertex has degree exactly 2 and the component has at least 3 vertices.',
    'n শীর্ষ আর m প্রান্তের একটি অনির্দেশিত গ্রাফ দেওয়া আছে (কোনো লুপ বা একাধিক প্রান্ত নেই)। যে যুক্ত উপাদানগুলো চক্র সেগুলো গুনুন: প্রতিটি শীর্ষের ডিগ্রি ঠিক ২ আর উপাদানে অন্তত ৩টি শীর্ষ।',
  ),
  input: L('n and m, then m edges.', 'n আর m, তারপর m-টি প্রান্ত।'),
  output: L('The number of cycle components.', 'চক্র উপাদানের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵', 'n, m ≤ ২·১০⁵')] },
  samples: [
    { input: '5 4\n1 2\n3 4\n5 4\n3 5', output: '1', explain: L('3-4-5 is a triangle.', '৩-৪-৫ একটি ত্রিভুজ।') },
    { input: '17 15\n1 8\n1 12\n5 11\n11 9\n9 15\n15 5\n4 13\n3 13\n4 3\n10 16\n7 10\n16 7\n14 3\n14 4\n17 6', output: '2', explain: L('5-11-9-15 and 7-10-16 are cycles.', '৫-১১-৯-১৫ আর ৭-১০-১৬ চক্র।') },
  ],
  observation: L('With no multi-edges, a connected component where every vertex has degree 2 is automatically a simple cycle with at least 3 vertices.', 'একাধিক প্রান্ত না থাকলে যে যুক্ত উপাদানের প্রতিটি শীর্ষের ডিগ্রি ২, সেটি আপনাআপনি অন্তত ৩ শীর্ষের সরল চক্র।'),
  approach: [L('Explore each component and check all degrees equal 2.', 'প্রতিটি উপাদান ঘুরে সব ডিগ্রি ২ কি না দেখুন।')],
  walkthrough: { input: 'sample 1', steps: [{ state: '{1,2}: degrees 1, 1', text: L('Not a cycle.', 'চক্র নয়।') }, { state: '{3,4,5}: all 2', text: L('A cycle.', 'একটি চক্র।') }] },
  complexity: { time: 'O(n + m)', space: 'O(n + m)', why: L('One traversal.', 'একবার ঘোরা।') },
  solutions: [
    {
      id: 'dfs',
      kind: 'optimal',
      title: L('Component traversal checking degrees', 'ডিগ্রি দেখে উপাদান ঘোরা'),
      idea: L('A component counts if no vertex in it has degree ≠ 2.', 'কোনো শীর্ষের ডিগ্রি ≠ ২ না হলে উপাদানটি গোনা হয়।'),
      explain: [L('Gathering a property of the whole component while traversing it is a pattern that comes up often (sizes, minimum, all degrees, number of edges).', 'ঘোরার সময় পুরো উপাদানের একটি গুণ জড়ো করা প্রায়ই আসা প্যাটার্ন (আকার, সর্বনিম্ন, সব ডিগ্রি, প্রান্তের সংখ্যা)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> adj(n + 1);
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<bool> seen(n + 1, false);
    int cycles = 0;
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        bool allTwo = true;
        vector<int> st = {s};
        seen[s] = true;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            if (adj[v].size() != 2) allTwo = false;
            for (int u : adj[v]) if (!seen[u]) { seen[u] = true; st.push_back(u); }
        }
        if (allTwo) cycles++;
    }
    printf("%d\n", cycles);
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
    {
      id: 'dsu',
      kind: 'method',
      title: L('DSU: vertices equal edges, all degrees 2', 'DSU: শীর্ষ সমান প্রান্ত, সব ডিগ্রি ২'),
      idea: L('Union the edges, then mark a root bad if any member has degree ≠ 2.', 'প্রান্তগুলো যুক্ত করে, কোনো সদস্যের ডিগ্রি ≠ ২ হলে মূলকে খারাপ চিহ্ন দিন।'),
      explain: [L('With DSU you do not need adjacency lists: store degrees, union endpoints, then check each component through its root.', 'DSU-তে সংলগ্নতা তালিকা লাগে না: ডিগ্রি রাখুন, প্রান্তবিন্দু যুক্ত করুন, তারপর মূল দিয়ে প্রতিটি উপাদান দেখুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    p.resize(n + 1);
    iota(p.begin(), p.end(), 0);
    vector<int> deg(n + 1, 0);
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        deg[a]++, deg[b]++;
        p[find(a)] = find(b);
    }
    vector<bool> bad(n + 1, false);
    for (int v = 1; v <= n; v++) if (deg[v] != 2) bad[find(v)] = true;
    int cycles = 0;
    for (int v = 1; v <= n; v++) if (find(v) == v && !bad[v]) cycles++;
    printf("%d\n", cycles);
    return 0;
}
`,
      time: 'O((n + m) α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
  ],
  tests: [
    { input: '5 4\n1 2\n3 4\n5 4\n3 5', output: '1', source: 'sample', note: sample(1) },
    { input: '17 15\n1 8\n1 12\n5 11\n11 9\n9 15\n15 5\n4 13\n3 13\n4 3\n10 16\n7 10\n16 7\n14 3\n14 4\n17 6', output: '2', source: 'sample', note: sample(2) },
    { input: '1 0', output: '0', source: 'own', note: L('An isolated vertex.', 'একটি বিচ্ছিন্ন শীর্ষ।') },
  ],
  pitfalls: [L('Counting an isolated vertex or a single edge as a cycle.', 'বিচ্ছিন্ন শীর্ষ বা একটি প্রান্তকে চক্র গোনা।')],
  related: [{ id: '1829E', name: 'The Lakes', why: L('Component aggregates.', 'উপাদানের সমষ্টি।') }],
  toolkit: ['stack-queue'],
};

export const p3A: ProblemEntry = {
  id: '3A',
  contestId: 3,
  index: 'A',
  name: 'Shortest path of the king',
  rating: 1000,
  tags: ['greedy', 'shortest-paths'],
  featuredFor: ['shortest-paths'],
  why: L('Chebyshev distance: diagonal steps cover both axes at once.', 'চেবিশেভ দূরত্ব: কোনাকুনি ধাপ একসঙ্গে দুই অক্ষ ঢাকে।'),
  statement: L(
    'A chess king stands on square s and must reach square t in the fewest moves. Print the number of moves and one shortest sequence using L, R, U, D, LU, LD, RU, RD.',
    'একটি দাবার রাজা বর্গ s-এ আছে আর সবচেয়ে কম চালে বর্গ t-তে যেতে হবে। চালের সংখ্যা আর L, R, U, D, LU, LD, RU, RD দিয়ে একটি সবচেয়ে ছোট ক্রম প্রিন্ট করুন।',
  ),
  input: L('Two squares like a8 and h1.', 'a8 আর h1-এর মতো দুটি বর্গ।'),
  output: L('The number of moves, then the moves.', 'চালের সংখ্যা, তারপর চালগুলো।'),
  limits: { timeSec: 1, memoryMb: 64, notes: [L('Any shortest sequence is accepted.', 'যেকোনো সবচেয়ে ছোট ক্রম গ্রহণযোগ্য।')] },
  samples: [{ input: 'a8\nh1', output: '7\nRD\nRD\nRD\nRD\nRD\nRD\nRD', explain: L('Seven diagonal moves.', 'সাতটি কোনাকুনি চাল।') }],
  observation: L('Each move changes the column and the row by at most 1, so at least max(|dx|, |dy|) moves are needed, and moving diagonally while both differ achieves it.', 'প্রতিটি চালে কলাম আর সারি সর্বোচ্চ ১ বদলায়, তাই অন্তত max(|dx|, |dy|) চাল লাগে, আর দুটোই আলাদা থাকা পর্যন্ত কোনাকুনি চাললে তা অর্জিত হয়।'),
  approach: [L('Repeat: step one column toward t (L/R) and one row toward t (U/D) together, omitting the part already aligned.', 'বারবার: একসঙ্গে t-এর দিকে এক কলাম (L/R) আর এক সারি (U/D) এগোন, যে অংশ আগেই মিলেছে তা বাদ দিয়ে।')],
  walkthrough: { input: 'a8 → h1', steps: [{ state: 'dx = 7, dy = −7', text: L('Seven RD moves.', 'সাতটি RD চাল।') }] },
  complexity: { time: 'O(8)', space: 'O(1)', why: L('At most 7 moves.', 'সর্বোচ্চ ৭টি চাল।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Diagonal while both differ', 'দুটোই আলাদা থাকা পর্যন্ত কোনাকুনি'),
      idea: L('Build each move from the signs of dx and dy.', 'dx আর dy-এর চিহ্ন থেকে প্রতিটি চাল বানান।'),
      explain: [L('Writing the move as “horizontal part + vertical part” handles all eight directions with two ifs. Rows grow upward, so U means increasing the digit.', 'চালকে “আনুভূমিক অংশ + উল্লম্ব অংশ” হিসেবে লিখলে দুটি if দিয়ে আটটি দিক সামলানো যায়। সারি ওপরে বাড়ে, তাই U মানে অঙ্ক বাড়ানো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    int x = s[0], y = s[1], tx = t[0], ty = t[1];
    vector<string> moves;
    while (x != tx || y != ty) {
        string m;
        if (x < tx) m += 'R', x++;
        else if (x > tx) m += 'L', x--;
        if (y < ty) m += 'U', y++;
        else if (y > ty) m += 'D', y--;
        moves.push_back(m);
    }
    cout << moves.size() << "\n";
    for (auto& m : moves) cout << m << "\n";
    return 0;
}
`,
      time: 'O(8)',
      space: 'O(8)',
      accepted: true,
      toolkit: ['string-basics', 'while-n'],
    },
    {
      id: 'bfs',
      kind: 'method',
      title: L('BFS on the 8 × 8 board', '৮ × ৮ বোর্ডে BFS'),
      idea: L('Shortest path with 8 neighbours per square, recording parents.', 'প্রতি বর্গে ৮টি প্রতিবেশী নিয়ে সবচেয়ে ছোট পথ, parent রেখে।'),
      explain: [L('Running BFS from the target gives every square its distance to t; from s, any move to a square one step closer is part of a shortest path. The moves may differ from the greedy ones, which is fine because any shortest sequence is accepted. This general method works even with obstacles on the board.', 'লক্ষ্য থেকে BFS চালালে প্রতিটি বর্গ t পর্যন্ত তার দূরত্ব পায়; s থেকে এক ধাপ কাছের বর্গে যেকোনো চাল একটি সবচেয়ে ছোট পথের অংশ। চালগুলো গ্রিডির থেকে আলাদা হতে পারে, যা ঠিক আছে কারণ যেকোনো সবচেয়ে ছোট ক্রম গ্রহণযোগ্য। বোর্ডে বাধা থাকলেও এই সাধারণ পদ্ধতি কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    int sx = s[0] - 'a', sy = s[1] - '1', tx = t[0] - 'a', ty = t[1] - '1';
    int dx[] = {1, 1, -1, -1, 1, -1, 0, 0}, dy[] = {-1, 1, -1, 1, 0, 0, 1, -1};
    string name[] = {"RD", "RU", "LD", "LU", "R", "L", "U", "D"};
    // BFS from the target so that following parents walks forward from s
    vector<vector<int>> dist(8, vector<int>(8, -1));
    queue<pair<int, int>> q;
    q.push({tx, ty});
    dist[tx][ty] = 0;
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        for (int d = 0; d < 8; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || nx > 7 || ny < 0 || ny > 7 || dist[nx][ny] != -1) continue;
            dist[nx][ny] = dist[x][y] + 1;
            q.push({nx, ny});
        }
    }
    cout << dist[sx][sy] << "\n";
    int x = sx, y = sy;
    while (dist[x][y] > 0) {
        for (int d = 0; d < 8; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx < 0 || nx > 7 || ny < 0 || ny > 7) continue;
            if (dist[nx][ny] == dist[x][y] - 1) { cout << name[d] << "\n"; x = nx, y = ny; break; }
        }
    }
    return 0;
}
`,
      time: 'O(64)',
      space: 'O(64)',
      accepted: true,
      toolkit: ['stack-queue', 'structured-bindings'],
    },
  ],
  tests: [
    { input: 'a8\nh1', output: '7\nRD\nRD\nRD\nRD\nRD\nRD\nRD', source: 'sample', note: sample(1) },
    { input: 'a1\na1', output: '0', source: 'own', note: L('Already there.', 'আগেই সেখানে।') },
    { input: 'a1\nc2', output: '2\nRU\nR', source: 'own', note: L('One diagonal, one straight.', 'একটি কোনাকুনি, একটি সোজা।') },
  ],
  pitfalls: [L('Using |dx| + |dy| (that is a rook-like count).', '|dx| + |dy| ব্যবহার (সেটি নৌকার মতো গণনা)।')],
  related: [{ id: '520B', name: 'Two Buttons', why: L('Shortest path by BFS.', 'BFS দিয়ে সবচেয়ে ছোট পথ।') }],
  toolkit: ['string-basics'],
};

export const p1360E: ProblemEntry = {
  id: '1360E',
  contestId: 1360,
  index: 'E',
  name: 'Polygon',
  rating: 1300,
  tags: ['dp', 'graphs', 'implementation', 'shortest-paths'],
  why: L('Find the local condition that is necessary and sufficient: each 1 must be supported.', 'প্রয়োজনীয় আর যথেষ্ট স্থানীয় শর্ত খোঁজা: প্রতিটি ১-এর একটি অবলম্বন থাকতে হবে।'),
  statement: L(
    'Cannons on the top and left of an n × n field shoot 1s that fly right (or down) until they hit the border or another 1, stopping just before it. Given a final 0/1 matrix, could it be produced by some sequence of shots? There are t test cases.',
    'একটি n × n মাঠের ওপর আর বামে কামান ১ ছোড়ে যা ডানে (বা নিচে) উড়ে সীমানা বা অন্য ১-এ না লাগা পর্যন্ত যায়, ঠিক তার আগে থামে। একটি চূড়ান্ত ০/১ ম্যাট্রিক্স দেওয়া আছে; কোনো ক্রমের গোলায় কি এটি তৈরি হতে পারে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and n rows of 0/1.', 't; প্রতিটি টেস্টে n আর ০/১-এর n-টি সারি।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 50', 'n ≤ ৫০')] },
  samples: [
    { input: '5\n4\n0010\n0011\n0000\n0000\n2\n10\n01\n2\n00\n00\n4\n0101\n1111\n0101\n0111\n4\n0100\n1110\n0101\n0111', output: 'YES\nNO\nYES\nYES\nNO', explain: L('Second test: the top-left 1 has nothing to stop it.', 'দ্বিতীয় টেস্ট: ওপর-বামের ১-কে থামানোর কিছু নেই।') },
  ],
  observation: L('A 1 stops only against the border or another 1. So every 1 not in the last row or column needs a 1 directly to its right or directly below. That condition is also enough: fill 1s from the bottom-right corner backwards.', 'একটি ১ শুধু সীমানা বা অন্য ১-এর গায়ে থামে। তাই শেষ সারি বা কলামে নেই এমন প্রতিটি ১-এর ঠিক ডানে বা ঠিক নিচে একটি ১ লাগে। এই শর্তই যথেষ্ট: নিচ-ডান কোণ থেকে পেছনে ১ ভরুন।'),
  approach: [L('Check every cell (i, j) with i, j < n − 1.', 'i, j < n − ১ এমন প্রতিটি ঘর (i, j) দেখুন।')],
  walkthrough: { input: '10 / 01', steps: [{ state: '(0,0) = 1, right 0, below 0', text: L('Unsupported: NO.', 'অবলম্বন নেই: NO।') }] },
  complexity: { time: 'O(n²)', space: 'O(n²)', why: L('One pass over the grid.', 'গ্রিডের ওপর একবার।') },
  solutions: [
    {
      id: 'local',
      kind: 'optimal',
      title: L('Every 1 needs support', 'প্রতিটি ১-এর অবলম্বন লাগে'),
      idea: L('g[i][j] = 1 ⇒ g[i][j+1] = 1 or g[i+1][j] = 1 (inside the board).', 'g[i][j] = ১ ⇒ g[i][j+১] = ১ বা g[i+১][j] = ১ (বোর্ডের ভেতরে)।'),
      explain: [L('Sufficiency: process 1s in decreasing order of i + j. Each one has a 1 to its right or below that was placed earlier, so a shot from the left (or top) stops exactly there.', 'যথেষ্টতা: ১-গুলো i + j-এর কমতে থাকা ক্রমে দেখুন। প্রতিটির ডানে বা নিচে আগে বসানো একটি ১ আছে, তাই বাম (বা ওপর) থেকে গোলা ঠিক সেখানে থামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<string> g(n);
        for (auto& r : g) cin >> r;
        bool ok = true;
        for (int i = 0; i + 1 < n; i++)
            for (int j = 0; j + 1 < n; j++)
                if (g[i][j] == '1' && g[i][j + 1] == '0' && g[i + 1][j] == '0') ok = false;
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'reach',
      kind: 'method',
      title: L('Reachability from the borders', 'সীমানা থেকে পৌঁছানো'),
      idea: L('Mark 1s on the last row/column as “stable”, then spread stability left and up through 1s; YES if every 1 is stable.', 'শেষ সারি/কলামের ১-গুলো “স্থির” চিহ্ন দিন, তারপর ১ দিয়ে বামে আর ওপরে স্থিরতা ছড়ান; প্রতিটি ১ স্থির হলে YES।'),
      explain: [L('This is the graph view (hence the shortest-paths tag): a 1 is valid if a chain of 1s going right/down reaches the border. A DP from the bottom-right computes it.', 'এটি গ্রাফের দৃষ্টিভঙ্গি (তাই সবচেয়ে ছোট পথের ট্যাগ): ডানে/নিচে যাওয়া ১-এর শৃঙ্খল সীমানায় পৌঁছালে একটি ১ বৈধ। নিচ-ডান থেকে DP এটি হিসাব করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<string> g(n);
        for (auto& r : g) cin >> r;
        vector<vector<bool>> stable(n, vector<bool>(n, false));
        bool ok = true;
        for (int i = n - 1; i >= 0; i--)
            for (int j = n - 1; j >= 0; j--) {
                if (g[i][j] != '1') continue;
                stable[i][j] = (i == n - 1 || j == n - 1) ||
                               (j + 1 < n && stable[i][j + 1]) || (i + 1 < n && stable[i + 1][j]);
                if (!stable[i][j]) ok = false;
            }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '5\n4\n0010\n0011\n0000\n0000\n2\n10\n01\n2\n00\n00\n4\n0101\n1111\n0101\n0111\n4\n0100\n1110\n0101\n0111', output: 'YES\nNO\nYES\nYES\nNO', source: 'sample', note: sample(1) },
    { input: '1\n1\n1', output: 'YES', source: 'own', note: L('A single cell on the border.', 'সীমানায় একটি ঘর।') },
  ],
  pitfalls: [L('Requiring support for 1s in the last row or column.', 'শেষ সারি বা কলামের ১-এর জন্যও অবলম্বন চাওয়া।')],
  related: [{ id: '1829E', name: 'The Lakes', why: L('Grid reasoning.', 'গ্রিডের যুক্তি।') }],
  toolkit: ['string-basics'],
};

export const p20C: ProblemEntry = {
  id: '20C',
  contestId: 20,
  index: 'C',
  name: 'Dijkstra?',
  rating: 1900,
  tags: ['graphs', 'shortest-paths'],
  featuredFor: ['shortest-paths'],
  why: L('The textbook Dijkstra with path reconstruction.', 'পথ পুনর্গঠনসহ পাঠ্যবইয়ের ডাইকস্ট্রা।'),
  statement: L(
    'A weighted undirected graph has n vertices and m edges. Print a shortest path from vertex 1 to vertex n, or −1 if n is unreachable. Loops and multiple edges may appear.',
    'একটি ওজনযুক্ত অনির্দেশিত গ্রাফে n শীর্ষ আর m প্রান্ত। শীর্ষ ১ থেকে শীর্ষ n পর্যন্ত একটি সবচেয়ে ছোট পথ প্রিন্ট করুন, n অপ্রাপ্য হলে −১। লুপ আর একাধিক প্রান্ত থাকতে পারে।',
  ),
  input: L('n and m, then m lines a b w.', 'n আর m, তারপর m-টি লাইন a b w।'),
  output: L('The vertices of a shortest path, or −1.', 'একটি সবচেয়ে ছোট পথের শীর্ষগুলো, অথবা −১।'),
  limits: { timeSec: 1, memoryMb: 64, notes: [L('n, m ≤ 10⁵, w ≤ 10⁶', 'n, m ≤ ১০⁵, w ≤ ১০⁶')] },
  samples: [{ input: '5 6\n1 2 2\n2 5 5\n2 3 4\n1 4 1\n4 3 3\n3 5 1', output: '1 4 3 5', explain: L('Length 1 + 3 + 1 = 5.', 'দৈর্ঘ্য ১ + ৩ + ১ = ৫।') }],
  observation: L('All weights are non-negative, so Dijkstra applies. Remember the parent of each vertex when its distance improves, then walk back from n.', 'সব ওজন অঋণাত্মক, তাই ডাইকস্ট্রা চলে। কোনো শীর্ষের দূরত্ব উন্নত হলে তার parent মনে রাখুন, তারপর n থেকে পেছনে হাঁটুন।'),
  approach: [L('Priority-queue Dijkstra, then reverse the parent chain.', 'প্রায়োরিটি-কিউ ডাইকস্ট্রা, তারপর parent শৃঙ্খল উল্টান।')],
  walkthrough: { input: 'sample', steps: [{ state: 'd = 0, 2, 4, 1, 5', text: L('par[5] = 3, par[3] = 4, par[4] = 1.', 'par[৫] = ৩, par[৩] = ৪, par[৪] = ১।') }] },
  complexity: { time: 'O((n + m) log n)', space: 'O(n + m)', why: L('Each edge relaxes once per pop.', 'প্রতিটি পপে প্রতিটি প্রান্ত একবার শিথিল হয়।') },
  solutions: [
    {
      id: 'dijkstra',
      kind: 'optimal',
      title: L('Dijkstra with parents', 'parent-সহ ডাইকস্ট্রা'),
      idea: L('Skip stale heap entries; record par[u] on every improvement.', 'পুরনো হিপ এন্ট্রি বাদ দিন; প্রতিটি উন্নতিতে par[u] লিখুন।'),
      explain: [L('Distances reach 10⁵ · 10⁶ = 10¹¹, so long long. The path is rebuilt backwards from n and then reversed.', 'দূরত্ব ১০⁵ · ১০⁶ = ১০¹¹ পর্যন্ত যায়, তাই long long। পথ n থেকে পেছনে বানিয়ে তারপর উল্টানো হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<pair<int, int>>> adj(n + 1);
    while (m--) {
        int a, b, w;
        scanf("%d %d %d", &a, &b, &w);
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
    }
    vector<long long> d(n + 1, LLONG_MAX);
    vector<int> par(n + 1, -1);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    d[1] = 0;
    pq.push({0, 1});
    while (!pq.empty()) {
        auto [dv, v] = pq.top();
        pq.pop();
        if (dv != d[v]) continue;
        for (auto [u, w] : adj[v])
            if (d[v] + w < d[u]) { d[u] = d[v] + w; par[u] = v; pq.push({d[u], u}); }
    }
    if (d[n] == LLONG_MAX) { puts("-1"); return 0; }
    vector<int> path;
    for (int v = n; v != -1; v = par[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    for (int v : path) printf("%d ", v);
    printf("\n");
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['priority-queue', 'pair', 'structured-bindings'],
    },
    {
      id: 'set',
      kind: 'method',
      title: L('Dijkstra with a set', 'set দিয়ে ডাইকস্ট্রা'),
      idea: L('Keep (distance, vertex) in a std::set and erase the old entry when a distance improves.', 'std::set-এ (দূরত্ব, শীর্ষ) রাখুন আর দূরত্ব উন্নত হলে পুরনো এন্ট্রি মুছুন।'),
      explain: [L('A set supports “decrease key” by erase + insert, so it never holds stale entries. Same complexity, different bookkeeping; some people find it easier to reason about.', 'set মুছে আর ঢুকিয়ে “decrease key” সমর্থন করে, তাই কখনো পুরনো এন্ট্রি রাখে না। একই জটিলতা, ভিন্ন হিসাব-রাখা; কারও কাছে এটি ভাবতে সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<pair<int, int>>> adj(n + 1);
    while (m--) {
        int a, b, w;
        scanf("%d %d %d", &a, &b, &w);
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
    }
    vector<long long> d(n + 1, LLONG_MAX);
    vector<int> par(n + 1, -1);
    set<pair<long long, int>> s;
    d[1] = 0;
    s.insert({0, 1});
    while (!s.empty()) {
        int v = s.begin()->second;
        s.erase(s.begin());
        for (auto [u, w] : adj[v])
            if (d[v] + w < d[u]) {
                if (d[u] != LLONG_MAX) s.erase({d[u], u});
                d[u] = d[v] + w;
                par[u] = v;
                s.insert({d[u], u});
            }
    }
    if (d[n] == LLONG_MAX) { puts("-1"); return 0; }
    vector<int> path;
    for (int v = n; v != -1; v = par[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    for (int v : path) printf("%d ", v);
    printf("\n");
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['set', 'pair'],
    },
  ],
  tests: [
    { input: '5 6\n1 2 2\n2 5 5\n2 3 4\n1 4 1\n4 3 3\n3 5 1', output: '1 4 3 5', source: 'sample', note: sample(1) },
    { input: '3 1\n1 2 5', output: '-1', source: 'own', note: L('n is unreachable.', 'n অপ্রাপ্য।') },
    { input: '2 2\n1 1 3\n1 2 7', output: '1 2', source: 'own', note: L('A loop is harmless.', 'একটি লুপ ক্ষতিকর নয়।') },
  ],
  pitfalls: [L('int distances.', 'int দূরত্ব।'), L('Not skipping stale entries, causing TLE on dense graphs.', 'পুরনো এন্ট্রি বাদ না দেওয়া, ঘন গ্রাফে TLE।')],
  related: [{ id: '3A', name: 'Shortest path of the king', why: L('Shortest paths on a board.', 'বোর্ডে সবচেয়ে ছোট পথ।') }],
  toolkit: ['priority-queue'],
};

export const p1057A: ProblemEntry = {
  id: '1057A',
  contestId: 1057,
  index: 'A',
  name: 'Bmail Computer Network',
  rating: 900,
  tags: ['dfs', 'trees'],
  why: L('Recover a root-to-node path by following parent pointers.', 'parent নির্দেশক অনুসরণ করে মূল থেকে নোড পর্যন্ত পথ বের করা।'),
  statement: L(
    'Router i (for i ≥ 2) was connected to an earlier router pᵢ < i. Print the path from router 1 to router n.',
    'রাউটার i (i ≥ ২) আগের একটি রাউটার pᵢ < i-এর সঙ্গে যুক্ত হয়েছিল। রাউটার ১ থেকে রাউটার n পর্যন্ত পথ প্রিন্ট করুন।',
  ),
  input: L('n, then p₂ … pₙ.', 'n, তারপর p₂ … pₙ।'),
  output: L('The routers on the path from 1 to n.', '১ থেকে n পর্যন্ত পথের রাউটারগুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵', '২ ≤ n ≤ ২·১০⁵')] },
  samples: [
    { input: '8\n1 1 2 2 3 2 5', output: '1 2 5 8', explain: L('p₈ = 5, p₅ = 2, p₂ = 1.', 'p₈ = ৫, p₅ = ২, p₂ = ১।') },
    { input: '6\n1 2 3 4 5', output: '1 2 3 4 5 6', explain: L('A chain.', 'একটি শৃঙ্খল।') },
    { input: '7\n1 1 2 3 4 3', output: '1 3 7', explain: L('p₇ = 3, p₃ = 1.', 'p₇ = ৩, p₃ = ১।') },
  ],
  observation: L('The parents form a tree rooted at 1, and the path from 1 to n is the parent chain from n, reversed.', 'parent-গুলো ১-এ মূলযুক্ত একটি ট্রি গঠন করে, আর ১ থেকে n পর্যন্ত পথ হলো n থেকে parent শৃঙ্খল, উল্টানো।'),
  approach: [L('Collect n, pₙ, p(pₙ), … until 1, then print in reverse.', 'n, pₙ, p(pₙ), … ১ পর্যন্ত জড়ো করে উল্টো প্রিন্ট করুন।')],
  walkthrough: { input: '7 / 1 1 2 3 4 3', steps: [{ state: '7 → 3 → 1', text: L('Reversed: 1 3 7.', 'উল্টানো: ১ ৩ ৭।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One walk up the tree.', 'ট্রিতে একবার ওপরে হাঁটা।') },
  solutions: [
    {
      id: 'parents',
      kind: 'optimal',
      title: L('Walk up, then reverse', 'ওপরে হেঁটে উল্টানো'),
      idea: L('Follow p from n to 1.', 'n থেকে ১ পর্যন্ত p অনুসরণ।'),
      explain: [L('Walking up from the target is the usual way to recover a path once parents are known; the same step ends every BFS or Dijkstra with path output.', 'parent জানা থাকলে লক্ষ্য থেকে ওপরে হাঁটাই পথ বের করার সাধারণ উপায়; পথ প্রিন্ট করা প্রতিটি BFS বা ডাইকস্ট্রা একই ধাপে শেষ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> p(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &p[i]);
    vector<int> path;
    for (int v = n; v != 0; v = p[v]) path.push_back(v);
    reverse(path.begin(), path.end());
    for (int v : path) printf("%d ", v);
    printf("\n");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['reverse-unique', 'c-io'],
    },
    {
      id: 'recursion',
      kind: 'method',
      title: L('Print on the way back from recursion', 'রিকার্শন থেকে ফেরার পথে প্রিন্ট'),
      idea: L('print(v): print(p[v]) first, then v.', 'print(v): আগে print(p[v]), তারপর v।'),
      explain: [L('Recursion reverses the order naturally. An explicit stack does the same without risking a deep call chain when the tree is a long path.', 'রিকার্শন স্বাভাবিকভাবেই ক্রম উল্টায়। ট্রি লম্বা পথ হলে গভীর কল শৃঙ্খলের ঝুঁকি ছাড়া একটি স্পষ্ট স্ট্যাক একই কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> p(n + 1, 0);
    for (int i = 2; i <= n; i++) scanf("%d", &p[i]);
    stack<int> st;
    for (int v = n; v != 0; v = p[v]) st.push(v);
    while (!st.empty()) { printf("%d ", st.top()); st.pop(); }
    printf("\n");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [
    { input: '8\n1 1 2 2 3 2 5', output: '1 2 5 8', source: 'sample', note: sample(1) },
    { input: '6\n1 2 3 4 5', output: '1 2 3 4 5 6', source: 'sample', note: sample(2) },
    { input: '7\n1 1 2 3 4 3', output: '1 3 7', source: 'sample', note: sample(3) },
    { input: '2\n1', output: '1 2', source: 'own', note: L('Two routers.', 'দুটি রাউটার।') },
  ],
  pitfalls: [L('Printing the path from n down to 1.', 'n থেকে ১ পর্যন্ত পথ প্রিন্ট।')],
  related: [{ id: '20C', name: 'Dijkstra?', why: L('Path recovery from parents.', 'parent থেকে পথ বের করা।') }],
  toolkit: ['reverse-unique'],
};

export const p1843C: ProblemEntry = {
  id: '1843C',
  contestId: 1843,
  index: 'C',
  name: 'Sum in Binary Tree',
  rating: 800,
  tags: ['bitmasks', 'combinatorics', 'math', 'trees'],
  why: L('In an implicit binary tree the parent of v is v / 2.', 'একটি অন্তর্নিহিত বাইনারি ট্রিতে v-এর parent হলো v / ২।'),
  statement: L(
    'In the infinite binary tree where vertex v has children 2v and 2v + 1, find the sum of the vertex numbers on the path from vertex 1 to vertex n. There are t test cases.',
    'অসীম বাইনারি ট্রিতে শীর্ষ v-এর সন্তান ২v আর ২v + ১; শীর্ষ ১ থেকে শীর্ষ n পর্যন্ত পথের শীর্ষ নম্বরগুলোর যোগফল বের করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('The sum for each test.', 'প্রতিটি টেস্টের যোগফল।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10¹⁶', '১ ≤ n ≤ ১০¹⁶')] },
  samples: [{ input: '6\n3\n10\n37\n1\n10000000000000000\n15', output: '4\n18\n71\n1\n19999999999999980\n26', explain: L('10 → 5 → 2 → 1: 18.', '১০ → ৫ → ২ → ১: ১৮।') }],
  observation: L('The parent of v is ⌊v / 2⌋, so the path is n, n/2, n/4, …, 1: about log₂ n vertices.', 'v-এর parent হলো ⌊v / ২⌋, তাই পথ n, n/২, n/৪, …, ১: প্রায় log₂ n শীর্ষ।'),
  approach: [L('Add n and halve it until it is 0.', 'n যোগ করে ০ না হওয়া পর্যন্ত অর্ধেক করুন।')],
  walkthrough: { input: '37', steps: [{ state: '37 + 18 + 9 + 4 + 2 + 1', text: L('71.', '৭১।') }] },
  complexity: { time: 'O(log n)', space: 'O(1)', why: L('About 54 halvings.', 'প্রায় ৫৪ বার অর্ধেক।') },
  solutions: [
    {
      id: 'halve',
      kind: 'optimal',
      title: L('Walk to the root by halving', 'অর্ধেক করে মূলে হাঁটা'),
      idea: L('while (n) sum += n, n /= 2.', 'while (n) sum += n, n /= ২।'),
      explain: [L('This implicit indexing is exactly how binary heaps and segment trees store a tree in an array. The sum stays below 2n ≤ 2·10¹⁶, inside long long.', 'এই অন্তর্নিহিত ইনডেক্সিংয়েই বাইনারি হিপ আর সেগমেন্ট ট্রি একটি অ্যারেতে ট্রি রাখে। যোগফল ২n ≤ ২·১০¹⁶-এর নিচে থাকে, long long-এর ভেতরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, sum = 0;
        cin >> n;
        for (; n > 0; n /= 2) sum += n;
        cout << sum << "\n";
    }
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
    {
      id: 'bits',
      kind: 'method',
      title: L('Sum of right shifts', 'ডান শিফটের যোগফল'),
      idea: L('Σ (n >> k) over k ≥ 0.', 'k ≥ ০-এর ওপর Σ (n >> k)।'),
      explain: [L('Halving is a right shift. In fact the sum equals 2n − popcount(n), a neat bit identity you can check against the loop.', 'অর্ধেক করা মানে একটি ডান শিফট। আসলে যোগফল ২n − popcount(n), একটি সুন্দর বিট অভেদ যা লুপের সঙ্গে মিলিয়ে দেখা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        cout << 2 * n - __builtin_popcountll(n) << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['popcount', 'bit-shift'],
    },
  ],
  tests: [
    { input: '6\n3\n10\n37\n1\n10000000000000000\n15', output: '4\n18\n71\n1\n19999999999999980\n26', source: 'sample', note: sample(1) },
    { input: '1\n2', output: '3', source: 'own', note: L('2 + 1.', '২ + ১।') },
  ],
  pitfalls: [L('int for n up to 10¹⁶.', '১০¹⁶ পর্যন্ত n-এর জন্য int।')],
  related: [{ id: '1057A', name: 'Bmail Computer Network', why: L('Walking up to the root.', 'মূলে ওপরে হাঁটা।') }],
  toolkit: ['long-long'],
};

export const p913B: ProblemEntry = {
  id: '913B',
  contestId: 913,
  index: 'B',
  name: 'Christmas Spruce',
  rating: 1200,
  tags: ['implementation', 'trees'],
  why: L('Count leaf children per vertex from a parent array.', 'parent অ্যারে থেকে প্রতি শীর্ষের পাতা-সন্তান গোনা।'),
  statement: L(
    'A rooted tree has n vertices; vertex i (i ≥ 2) has parent pᵢ. It is a spruce if every non-leaf vertex has at least 3 children that are leaves. Print Yes or No.',
    'একটি মূলযুক্ত ট্রিতে n শীর্ষ; শীর্ষ i (i ≥ ২)-এর parent pᵢ। এটি স্প্রুস যদি প্রতিটি পাতা-নয় শীর্ষের অন্তত ৩টি সন্তান পাতা হয়। Yes বা No প্রিন্ট করুন।',
  ),
  input: L('n, then p₂ … pₙ, one per line.', 'n, তারপর প্রতি লাইনে একটি করে p₂ … pₙ।'),
  output: L('Yes or No.', 'Yes অথবা No।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 1000; the root has at least 2 children', '৩ ≤ n ≤ ১০০০; মূলের অন্তত ২টি সন্তান')] },
  samples: [
    { input: '4\n1\n1\n1', output: 'Yes', explain: L('The root has 3 leaves.', 'মূলের ৩টি পাতা।') },
    { input: '7\n1\n1\n1\n2\n2\n2', output: 'No', explain: L('The root has only 2 leaf children.', 'মূলের মাত্র ২টি পাতা-সন্তান।') },
    { input: '8\n1\n1\n1\n1\n3\n3\n3', output: 'Yes', explain: L('Root: 3 leaves; vertex 3: 3 leaves.', 'মূল: ৩টি পাতা; শীর্ষ ৩: ৩টি পাতা।') },
  ],
  observation: L('A vertex is a leaf when it has no children. Count children per vertex, then for every vertex with children count how many of them are leaves.', 'যে শীর্ষের কোনো সন্তান নেই সেটি পাতা। প্রতি শীর্ষের সন্তান গুনুন, তারপর সন্তান আছে এমন প্রতিটি শীর্ষে কতগুলো সন্তান পাতা তা গুনুন।'),
  approach: [L('Two passes over the parent array.', 'parent অ্যারের ওপর দুবার।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'leaves 3, 4, 5, 6, 7; vertex 2 is not a leaf', text: L('Root has leaf children 3, 4 only: No.', 'মূলের পাতা-সন্তান শুধু ৩, ৪: No।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two passes.', 'দুবার।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('Children counts, then leaf counts', 'সন্তান গণনা, তারপর পাতা গণনা'),
      idea: L('leafKids[p[i]]++ for every leaf i.', 'প্রতিটি পাতা i-এর জন্য leafKids[p[i]]++।'),
      explain: [L('No graph traversal is needed: the parent array already tells everything about children.', 'কোনো গ্রাফ ঘোরা লাগে না: parent অ্যারেই সন্তান সম্পর্কে সব বলে দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1, 0), kids(n + 1, 0), leafKids(n + 1, 0);
    for (int i = 2; i <= n; i++) { cin >> p[i]; kids[p[i]]++; }
    for (int i = 2; i <= n; i++) if (kids[i] == 0) leafKids[p[i]]++;
    bool ok = true;
    for (int v = 1; v <= n; v++) if (kids[v] > 0 && leafKids[v] < 3) ok = false;
    cout << (ok ? "Yes" : "No") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
    {
      id: 'lists',
      kind: 'method',
      title: L('Children lists', 'সন্তানের তালিকা'),
      idea: L('Build children lists and check each internal vertex directly.', 'সন্তানের তালিকা বানিয়ে প্রতিটি ভেতরের শীর্ষ সরাসরি দেখুন।'),
      explain: [L('Turning a parent array into children lists is the standard first step for top-down tree processing.', 'parent অ্যারেকে সন্তানের তালিকায় বদলানো ওপর থেকে নিচে ট্রি প্রক্রিয়ার প্রচলিত প্রথম ধাপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> ch(n + 1);
    for (int i = 2; i <= n; i++) {
        int p;
        cin >> p;
        ch[p].push_back(i);
    }
    bool ok = true;
    for (int v = 1; v <= n; v++) {
        if (ch[v].empty()) continue;
        int leaves = 0;
        for (int c : ch[v]) if (ch[c].empty()) leaves++;
        if (leaves < 3) ok = false;
    }
    cout << (ok ? "Yes" : "No") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n1\n1\n1', output: 'Yes', source: 'sample', note: sample(1) },
    { input: '7\n1\n1\n1\n2\n2\n2', output: 'No', source: 'sample', note: sample(2) },
    { input: '8\n1\n1\n1\n1\n3\n3\n3', output: 'Yes', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Counting all children instead of leaf children.', 'পাতা-সন্তানের বদলে সব সন্তান গোনা।'), L('Printing YES in capitals.', 'বড় হাতের YES প্রিন্ট।')],
  related: [{ id: '115A', name: 'Party', why: L('Parent arrays.', 'parent অ্যারে।') }],
  toolkit: ['vector'],
};

export const p1843D: ProblemEntry = {
  id: '1843D',
  contestId: 1843,
  index: 'D',
  name: 'Apple Tree',
  rating: 1200,
  tags: ['combinatorics', 'dfs', 'dp', 'math', 'trees'],
  why: L('Leaves in a subtree, computed bottom-up once, answer each query in O(1).', 'সাবট্রিতে পাতার সংখ্যা, একবার নিচ থেকে ওপরে হিসাব করে প্রতিটি কোয়েরির উত্তর O(১)-এ।'),
  statement: L(
    'A tree is rooted at vertex 1. Two apples start at vertices x and y and each rolls down to some leaf of its own subtree. For each query (x, y), print how many ordered pairs of leaves (a, b) the apples can end at. There are t test cases.',
    'একটি ট্রি শীর্ষ ১-এ মূলযুক্ত। দুটি আপেল শীর্ষ x আর y থেকে শুরু করে প্রত্যেকে নিজের সাবট্রির কোনো পাতায় গড়িয়ে যায়। প্রতিটি কোয়েরি (x, y)-এর জন্য প্রিন্ট করুন আপেলগুলো কতগুলো ক্রমযুক্ত পাতার জোড়া (a, b)-তে শেষ হতে পারে। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, n − 1 edges, q and q pairs.', 't; প্রতিটি টেস্টে n, n − ১টি প্রান্ত, q আর q-টি জোড়া।'),
  output: L('One number per query.', 'প্রতি কোয়েরিতে একটি সংখ্যা।'),
  limits: { timeSec: 4, memoryMb: 512, notes: [L('Σ n, Σ q ≤ 2·10⁵', 'Σ n, Σ q ≤ ২·১০⁵')] },
  samples: [
    {
      input: '2\n5\n1 2\n3 4\n5 3\n3 2\n4\n3 4\n5 1\n4 4\n1 3\n3\n1 2\n1 3\n3\n1 1\n2 3\n3 1',
      output: '2\n2\n1\n4\n4\n1\n2',
      explain: L('Leaves of the first tree are 4 and 5; vertex 3 has both.', 'প্রথম ট্রির পাতা ৪ আর ৫; শীর্ষ ৩-এ দুটোই।'),
    },
  ],
  observation: L('The answer is leaves(x) · leaves(y), where leaves(v) is the number of leaves in v’s subtree. leaves(v) = 1 for a leaf, else the sum over children.', 'উত্তর leaves(x) · leaves(y), যেখানে leaves(v) হলো v-এর সাবট্রিতে পাতার সংখ্যা। পাতার জন্য leaves(v) = ১, না হলে সন্তানদের যোগফল।'),
  approach: [L('Get a BFS order from the root, then process it backwards to accumulate leaf counts into parents.', 'মূল থেকে BFS ক্রম নিয়ে পেছন থেকে প্রক্রিয়া করে parent-এ পাতার গণনা জমান।')],
  walkthrough: { input: 'tree 1-2-3-{4,5}', steps: [{ state: 'leaves: 4→1, 5→1, 3→2, 2→2, 1→2', text: L('Query (3, 4): 2 · 1 = 2.', 'কোয়েরি (৩, ৪): ২ · ১ = ২।') }] },
  complexity: { time: 'O(n + q)', space: 'O(n)', why: L('One traversal, O(1) per query.', 'একবার ঘোরা, প্রতি কোয়েরিতে O(১)।') },
  solutions: [
    {
      id: 'bfs-order',
      kind: 'optimal',
      title: L('Reverse BFS order', 'উল্টো BFS ক্রম'),
      idea: L('Children appear after parents in BFS order, so reversing it processes children first.', 'BFS ক্রমে সন্তান parent-এর পরে আসে, তাই উল্টালে আগে সন্তান প্রক্রিয়া হয়।'),
      explain: [L('This iterative “bottom-up DP on a tree” avoids recursion entirely. The product reaches 10¹⁰, so long long.', 'এই পুনরাবৃত্ত “ট্রিতে নিচ থেকে ওপরে DP” রিকার্শন পুরোপুরি এড়ায়। গুণফল ১০¹⁰ পর্যন্ত, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        vector<int> order, par(n + 1, 0);
        order.reserve(n);
        order.push_back(1);
        par[1] = -1;
        for (size_t i = 0; i < order.size(); i++) {
            int v = order[i];
            for (int u : adj[v]) if (u != par[v]) { par[u] = v; order.push_back(u); }
        }
        vector<long long> leaves(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            int v = order[i];
            if (leaves[v] == 0) leaves[v] = 1;      // no child added anything: a leaf
            if (par[v] > 0) leaves[par[v]] += leaves[v];
        }
        int q;
        scanf("%d", &q);
        while (q--) {
            int x, y;
            scanf("%d %d", &x, &y);
            printf("%lld\n", leaves[x] * leaves[y]);
        }
    }
    return 0;
}
`,
      time: 'O(n + q)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'c-io', 'long-long'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('Post-order DFS with an explicit stack', 'স্পষ্ট স্ট্যাকসহ পোস্ট-অর্ডার DFS'),
      idea: L('Push each vertex twice: once to expand it, once to finish it after its children.', 'প্রতিটি শীর্ষ দুবার পুশ করুন: একবার বিস্তার করতে, একবার সন্তানদের পরে শেষ করতে।'),
      explain: [L('The “visit twice” trick simulates the return step of recursion, which is where subtree values are combined.', '“দুবার দেখা” কৌশল রিকার্শনের ফেরার ধাপ অনুকরণ করে, যেখানে সাবট্রির মানগুলো মেলানো হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        vector<long long> leaves(n + 1, 0);
        vector<int> par(n + 1, 0);
        vector<pair<int, bool>> st = {{1, false}};
        par[1] = -1;
        while (!st.empty()) {
            auto [v, done] = st.back();
            st.pop_back();
            if (done) {
                bool leaf = true;
                for (int u : adj[v]) if (u != par[v]) { leaf = false; leaves[v] += leaves[u]; }
                if (leaf) leaves[v] = 1;
                continue;
            }
            st.push_back({v, true});
            for (int u : adj[v]) if (u != par[v]) { par[u] = v; st.push_back({u, false}); }
        }
        int q;
        scanf("%d", &q);
        while (q--) {
            int x, y;
            scanf("%d %d", &x, &y);
            printf("%lld\n", leaves[x] * leaves[y]);
        }
    }
    return 0;
}
`,
      time: 'O(n + q)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'structured-bindings'],
    },
  ],
  tests: [
    { input: '2\n5\n1 2\n3 4\n5 3\n3 2\n4\n3 4\n5 1\n4 4\n1 3\n3\n1 2\n1 3\n3\n1 1\n2 3\n3 1', output: '2\n2\n1\n4\n4\n1\n2', source: 'sample', note: sample(1) },
    { input: '1\n2\n1 2\n1\n1 1', output: '1', source: 'own', note: L('One leaf below the root.', 'মূলের নিচে একটি পাতা।') },
  ],
  pitfalls: [L('Treating the root as a leaf when it has degree 1.', 'মূলের ডিগ্রি ১ হলে একে পাতা ধরা।'), L('Recursion depth on a path of 2·10⁵.', '২·১০⁵ দৈর্ঘ্যের পথে রিকার্শনের গভীরতা।')],
  related: [{ id: '580C', name: 'Kefa and Park', why: L('Counting leaves of a tree.', 'ট্রির পাতা গোনা।') }],
  toolkit: ['vector', 'long-long'],
};
