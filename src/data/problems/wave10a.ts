import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

// Shared reading code for rooted-tree problems: BFS order from vertex 1 with parents.
const bfsOrder = raw`    vector<int> order = {1}, par(n + 1, 0);
    par[1] = -1;
    for (size_t i = 0; i < order.size(); i++)
        for (int u : adj[order[i]]) if (u != par[order[i]]) { par[u] = order[i]; order.push_back(u); }`;

export const p1092F: ProblemEntry = {
  id: '1092F',
  contestId: 1092,
  index: 'F',
  name: 'Tree with Maximum Cost',
  rating: 1900,
  tags: ['dfs', 'dp', 'trees'],
  featuredFor: ['trees'],
  why: L('Rerooting: compute the answer for one root, then move the root across each edge in O(1).', 'রিরুটিং: একটি মূলের উত্তর বের করে প্রতিটি প্রান্ত পেরিয়ে O(১)-এ মূল সরানো।'),
  statement: L('A tree with n vertices has values aᵥ. The cost of a vertex v is Σᵤ dist(v, u) · aᵤ. Find the maximum cost over all v.', 'n শীর্ষের একটি ট্রিতে মান aᵥ। একটি শীর্ষ v-এর খরচ Σᵤ dist(v, u) · aᵤ। সব v-এর ওপর সর্বোচ্চ খরচ বের করুন।'),
  input: L('n, the values, then n − 1 edges.', 'n, মানগুলো, তারপর n − ১টি প্রান্ত।'),
  output: L('The maximum cost.', 'সর্বোচ্চ খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵, aᵢ ≤ 2·10⁵', 'n ≤ ২·১০⁵, aᵢ ≤ ২·১০⁵')] },
  samples: [
    { input: '8\n9 4 1 7 10 1 6 5\n1 2\n2 3\n1 4\n1 5\n5 6\n5 7\n5 8', output: '121', explain: L('Vertex 3 is best.', 'শীর্ষ ৩ সেরা।') },
    { input: '1\n1337', output: '0', explain: L('A single vertex.', 'একটি শীর্ষ।') },
  ],
  observation: L('Let sub[c] be the total value in c’s subtree and S the total. Moving the root from p to its child c brings sub[c] closer by 1 and pushes S − sub[c] away by 1: cost(c) = cost(p) + S − 2 · sub[c].', 'sub[c] হলো c-এর সাবট্রির মোট মান আর S মোট। মূল p থেকে সন্তান c-তে সরালে sub[c] এক কাছে আসে আর S − sub[c] এক দূরে যায়: cost(c) = cost(p) + S − ২ · sub[c]।'),
  approach: [L('One pass for depths and subtree sums, cost(1) = Σ depth · a, then a top-down pass using the formula.', 'গভীরতা আর সাবট্রির যোগফলের জন্য একবার যাওয়া, cost(১) = Σ depth · a, তারপর সূত্র দিয়ে ওপর থেকে নিচে যাওয়া।')],
  walkthrough: { input: 'path 1 – 2 with values 1, 3', steps: [{ state: 'cost(1) = 3, S = 4, sub[2] = 3', text: L('cost(2) = 3 + 4 − 6 = 1. Max 3.', 'cost(২) = ৩ + ৪ − ৬ = ১। সর্বোচ্চ ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two traversals.', 'দুটি ঘোরা।') },
  solutions: [
    {
      id: 'reroot',
      kind: 'optimal',
      title: L('Rerooting in two passes', 'দুই পাসে রিরুটিং'),
      idea: L('Bottom-up subtree sums, top-down costs.', 'নিচ থেকে ওপরে সাবট্রির যোগফল, ওপর থেকে নিচে খরচ।'),
      explain: [L('BFS order processed backwards is a children-before-parent order, so no recursion is needed (a path of 2·10⁵ would overflow a recursive DFS stack on some judges). Costs reach 2·10⁵ · 2·10⁵ · 2·10⁵: long long.', 'উল্টো ক্রমে BFS সন্তান-আগে-parent ক্রম, তাই রিকার্শন লাগে না (২·১০⁵-এর একটি পথ কিছু জাজে রিকার্সিভ DFS স্ট্যাক উপচে দিত)। খরচ ২·১০⁵ · ২·১০⁵ · ২·১০⁵ পর্যন্ত: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
${bfsOrder}
    vector<long long> sub(a), depth(n + 1, 0), cost(n + 1, 0);
    long long S = 0;
    for (int v = 1; v <= n; v++) S += a[v];
    for (int i = 1; i < n; i++) depth[order[i]] = depth[par[order[i]]] + 1;
    for (int i = n - 1; i > 0; i--) sub[par[order[i]]] += sub[order[i]];
    for (int v = 1; v <= n; v++) cost[1] += depth[v] * a[v];
    long long best = cost[1];
    for (int i = 1; i < n; i++) {
        int c = order[i];
        cost[c] = cost[par[c]] + S - 2 * sub[c];
        best = max(best, cost[c]);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'vector', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('BFS from every vertex', 'প্রতিটি শীর্ষ থেকে BFS'),
      idea: L('Compute each cost from scratch.', 'প্রতিটি খরচ শুরু থেকে হিসাব।'),
      explain: [L('O(n²): the definition, written out. Rerooting is precisely the trick that avoids redoing this work for every root.', 'O(n²): সংজ্ঞাটি লিখে ফেলা। রিরুটিং ঠিক সেই কৌশল যা প্রতিটি মূলের জন্য এই কাজ আবার করা এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    long long best = 0;
    for (int s = 1; s <= n; s++) {
        vector<int> d(n + 1, -1);
        queue<int> q;
        q.push(s);
        d[s] = 0;
        long long cost = 0;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            cost += d[v] * a[v];
            for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
        }
        best = max(best, cost);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['stack-queue', 'long-long'],
    },
  ],
  tests: [
    { input: '8\n9 4 1 7 10 1 6 5\n1 2\n2 3\n1 4\n1 5\n5 6\n5 7\n5 8', output: '121', source: 'sample', note: sample(1) },
    { input: '1\n1337', output: '0', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Recursion depth on a long path.', 'লম্বা পথে রিকার্শনের গভীরতা।'), L('int overflow.', 'int ওভারফ্লো।')],
  related: [{ id: '1187E', name: 'Tree Painting', why: L('The same rerooting formula with sizes.', 'আকার দিয়ে একই রিরুটিং সূত্র।') }],
  toolkit: ['long-long'],
};

export const p1187E: ProblemEntry = {
  id: '1187E',
  contestId: 1187,
  index: 'E',
  name: 'Tree Painting',
  rating: 2100,
  tags: ['dfs', 'dp', 'trees'],
  why: L('Once the first vertex is fixed, the score is the sum of subtree sizes; rerooting tries every first vertex.', 'প্রথম শীর্ষ ঠিক হলে স্কোর হলো সাবট্রির আকারের যোগফল; রিরুটিং প্রতিটি প্রথম শীর্ষ চেষ্টা করে।'),
  statement: L(
    'All vertices of a tree start white. First you paint any vertex black. Then, repeatedly, you paint a white vertex adjacent to a black one; each time you score the size of the white component containing the chosen vertex. The first move also scores n. Maximise the total.',
    'একটি ট্রির সব শীর্ষ শুরুতে সাদা। প্রথমে যেকোনো একটি শীর্ষ কালো রঙ করুন। তারপর বারবার একটি কালো শীর্ষের পাশের একটি সাদা শীর্ষ রঙ করুন; প্রতিবার বাছা শীর্ষ যে সাদা উপাদানে আছে তার আকার স্কোর পান। প্রথম চালও n স্কোর দেয়। মোট সর্বোচ্চ করুন।',
  ),
  input: L('n, then n − 1 edges.', 'n, তারপর n − ১টি প্রান্ত।'),
  output: L('The maximum total score.', 'সর্বোচ্চ মোট স্কোর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵', '২ ≤ n ≤ ২·১০⁵')] },
  samples: [
    { input: '9\n1 2\n2 3\n2 5\n2 6\n1 4\n4 9\n9 7\n9 8', output: '36', explain: L('Starting at vertex 2 is optimal.', 'শীর্ষ ২ থেকে শুরু সেরা।') },
    { input: '5\n1 2\n1 3\n2 4\n2 5', output: '14', explain: L('Start at a leaf below 2.', '২-এর নিচের একটি পাতা থেকে শুরু।') },
  ],
  observation: L('With first vertex r, painting a vertex v scores the size of v’s subtree when the tree is rooted at r, and the order does not matter. So score(r) = Σ size_r(v). Moving the root from p to child c: score(c) = score(p) + n − 2 · sz[c].', 'প্রথম শীর্ষ r হলে, একটি শীর্ষ v রঙ করলে স্কোর হয় r-এ মূল দেওয়া ট্রিতে v-এর সাবট্রির আকার, আর ক্রম গুরুত্বহীন। তাই score(r) = Σ size_r(v)। মূল p থেকে সন্তান c-তে: score(c) = score(p) + n − ২ · sz[c]।'),
  approach: [L('Subtree sizes from root 1, score(1) = Σ sz, then reroot.', 'মূল ১ থেকে সাবট্রির আকার, score(১) = Σ sz, তারপর রিরুট।')],
  walkthrough: { input: 'path 1 – 2 – 3', steps: [{ state: 'root 1: sizes 3, 2, 1 → 6', text: L('Root 2: 6 + 3 − 4 = 5. Root 3: 5 + 3 − 2 = 6. Max 6.', 'মূল ২: ৬ + ৩ − ৪ = ৫। মূল ৩: ৫ + ৩ − ২ = ৬। সর্বোচ্চ ৬।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two traversals.', 'দুটি ঘোরা।') },
  solutions: [
    {
      id: 'reroot',
      kind: 'optimal',
      title: L('Sum of subtree sizes, rerooted', 'সাবট্রির আকারের যোগফল, রিরুট করা'),
      idea: L('score(c) = score(p) + n − 2 · sz[c].', 'score(c) = score(p) + n − ২ · sz[c]।'),
      explain: [L('This is 1092F with every value equal to 1, shifted: Σ sizes = Σ (depth + 1). Recognising a known formula in disguise is half the battle in tree DP.', 'এটি হলো সব মান ১ ধরে 1092F, সরানো: Σ আকার = Σ (গভীরতা + ১)। ছদ্মবেশে পরিচিত সূত্র চেনাই ট্রি DP-এর অর্ধেক কাজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
${bfsOrder}
    vector<long long> sz(n + 1, 1), score(n + 1, 0);
    for (int i = n - 1; i > 0; i--) sz[par[order[i]]] += sz[order[i]];
    for (int v = 1; v <= n; v++) score[1] += sz[v];
    long long best = score[1];
    for (int i = 1; i < n; i++) {
        int c = order[i];
        score[c] = score[par[c]] + n - 2 * sz[c];
        best = max(best, score[c]);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Subtree sizes for every root', 'প্রতিটি মূলের জন্য সাবট্রির আকার'),
      idea: L('Root at r, add up sizes, keep the best.', 'r-এ মূল দিয়ে আকার যোগ করে সেরাটি রাখা।'),
      explain: [L('O(n²), for checking. It relies on the same observation (score = Σ sizes) but not on the rerooting formula.', 'যাচাইয়ের জন্য O(n²)। এটি একই পর্যবেক্ষণের (স্কোর = Σ আকার) ওপর নির্ভর করে কিন্তু রিরুটিং সূত্রের ওপর নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    long long best = 0;
    for (int r = 1; r <= n; r++) {
        vector<int> order = {r}, par(n + 1, 0);
        par[r] = -1;
        for (size_t i = 0; i < order.size(); i++)
            for (int u : adj[order[i]]) if (u != par[order[i]]) { par[u] = order[i]; order.push_back(u); }
        vector<long long> sz(n + 1, 1);
        for (int i = n - 1; i > 0; i--) sz[par[order[i]]] += sz[order[i]];
        best = max(best, accumulate(sz.begin() + 1, sz.end(), 0LL));
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['accumulate'],
    },
  ],
  tests: [
    { input: '9\n1 2\n2 3\n2 5\n2 6\n1 4\n4 9\n9 7\n9 8', output: '36', source: 'sample', note: sample(1) },
    { input: '5\n1 2\n1 3\n2 4\n2 5', output: '14', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Simulating the painting order.', 'রঙ করার ক্রম সিমুলেশন।')],
  related: [{ id: '1092F', name: 'Tree with Maximum Cost', why: L('Rerooting.', 'রিরুটিং।') }],
  toolkit: ['long-long'],
};

export const p1324F: ProblemEntry = {
  id: '1324F',
  contestId: 1324,
  index: 'F',
  name: 'Maximum White Subtree',
  rating: 1800,
  tags: ['dfs', 'dp', 'graphs', 'trees'],
  why: L('Rerooting with a max(0, ·): the parent’s best value without this child’s contribution.', 'max(০, ·)-সহ রিরুটিং: এই সন্তানের অবদান বাদে parent-এর সেরা মান।'),
  statement: L('Each vertex is white (1) or black (0). For every vertex v, find the maximum of (white − black) over connected subgraphs containing v.', 'প্রতিটি শীর্ষ সাদা (১) বা কালো (০)। প্রতিটি শীর্ষ v-এর জন্য v ধারণকারী সংযুক্ত সাবগ্রাফের ওপর (সাদা − কালো)-এর সর্বোচ্চ বের করুন।'),
  input: L('n, the colours, then n − 1 edges.', 'n, রঙগুলো, তারপর n − ১টি প্রান্ত।'),
  output: L('n numbers.', 'n-টি সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵', 'n ≤ ২·১০⁵')] },
  samples: [
    { input: '9\n0 1 1 1 0 0 0 0 1\n1 2\n1 3\n3 4\n3 5\n2 6\n4 7\n6 8\n5 9', output: '2 2 2 2 2 1 1 0 2', explain: L('Vertex 8 can only get 0 at best.', 'শীর্ষ ৮ সর্বোচ্চ ০ পেতে পারে।') },
    { input: '4\n0 0 1 0\n1 2\n1 3\n1 4', output: '0 -1 1 -1', explain: L('Vertex 2 alone gives −1, and adding more only hurts.', 'শীর্ষ ২ একা −১ দেয়, আর বেশি যোগ করলে শুধু ক্ষতি।') },
  ],
  observation: L('Let val = +1 for white and −1 for black. Down-DP: dp[v] = val[v] + Σ max(0, dp[c]). Up-DP: ans[c] = dp[c] + max(0, ans[p] − max(0, dp[c])): the parent’s full answer minus what c contributed to it.', 'সাদায় val = +১ আর কালোয় −১। নিচে-DP: dp[v] = val[v] + Σ max(০, dp[c])। ওপরে-DP: ans[c] = dp[c] + max(০, ans[p] − max(০, dp[c])): parent-এর পূর্ণ উত্তর বিয়োগ c-এর অবদান।'),
  approach: [L('Bottom-up dp, then top-down ans.', 'নিচ থেকে ওপরে dp, তারপর ওপর থেকে নিচে ans।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'dp: 1 → 0 (−1 + 1), others −1, 1, −1', text: L('ans[2] = −1 + max(0, 0 − 0) = −1.', 'ans[২] = −১ + max(০, ০ − ০) = −১।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two passes.', 'দুটি পাস।') },
  solutions: [
    {
      id: 'reroot',
      kind: 'optimal',
      title: L('Down DP + up DP', 'নিচে DP + ওপরে DP'),
      idea: L('Remove the child’s own contribution before passing the parent’s value down.', 'parent-এর মান নিচে পাঠানোর আগে সন্তানের নিজের অবদান বাদ দিন।'),
      explain: [L('“Answer for every vertex” on a tree almost always means rerooting. The key step is always the same: subtract what the child added to the parent.', 'ট্রিতে “প্রতিটি শীর্ষের উত্তর” প্রায় সবসময় রিরুটিং বোঝায়। মূল ধাপ সবসময় একই: সন্তান parent-এ যা যোগ করেছিল তা বিয়োগ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> val(n + 1);
    for (int i = 1; i <= n; i++) { int c; scanf("%d", &c); val[i] = c ? 1 : -1; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
${bfsOrder}
    vector<int> dp(val), ans(n + 1);
    for (int i = n - 1; i > 0; i--) dp[par[order[i]]] += max(0, dp[order[i]]);
    ans[1] = dp[1];
    for (int i = 1; i < n; i++) {
        int c = order[i];
        ans[c] = dp[c] + max(0, ans[par[c]] - max(0, dp[c]));
    }
    for (int v = 1; v <= n; v++) printf("%d ", ans[v]);
    printf("\n");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Down DP from every root', 'প্রতিটি মূল থেকে নিচে DP'),
      idea: L('Root the tree at v and read dp[v].', 'ট্রিকে v-এ মূল দিয়ে dp[v] পড়া।'),
      explain: [L('With v as the root, the best subgraph containing v is exactly the down-DP value: O(n) per vertex, O(n²) total.', 'v মূল হলে v ধারণকারী সেরা সাবগ্রাফ ঠিক নিচে-DP মান: প্রতি শীর্ষে O(n), মোট O(n²)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> val(n + 1);
    for (int i = 1; i <= n; i++) { int c; cin >> c; val[i] = c ? 1 : -1; }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int r = 1; r <= n; r++) {
        vector<int> order = {r}, par(n + 1, 0);
        par[r] = -1;
        for (size_t i = 0; i < order.size(); i++)
            for (int u : adj[order[i]]) if (u != par[order[i]]) { par[u] = order[i]; order.push_back(u); }
        vector<int> dp(val);
        for (int i = n - 1; i > 0; i--) dp[par[order[i]]] += max(0, dp[order[i]]);
        cout << dp[r] << ' ';
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '9\n0 1 1 1 0 0 0 0 1\n1 2\n1 3\n3 4\n3 5\n2 6\n4 7\n6 8\n5 9', output: '2 2 2 2 2 1 1 0 2', source: 'sample', note: sample(1) },
    { input: '4\n0 0 1 0\n1 2\n1 3\n1 4', output: '0 -1 1 -1', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Passing ans[p] down without removing the child’s part (double counting).', 'সন্তানের অংশ বাদ না দিয়ে ans[p] নিচে পাঠানো (দুবার গোনা)।')],
  related: [{ id: '1092F', name: 'Tree with Maximum Cost', why: L('Rerooting.', 'রিরুটিং।') }],
  toolkit: ['min-max'],
};

export const p1528A: ProblemEntry = {
  id: '1528A',
  contestId: 1528,
  index: 'A',
  name: "Parsa's Humongous Tree",
  rating: 1600,
  tags: ['dfs', 'dp', 'graphs', 'greedy', 'trees'],
  why: L('An extreme-value argument shrinks each vertex to two choices, then a two-state tree DP.', 'একটি প্রান্তিক-মান যুক্তি প্রতিটি শীর্ষকে দুটি বিকল্পে নামায়, তারপর দুই-অবস্থার ট্রি DP।'),
  statement: L('Vertex v must get a value aᵥ ∈ [lᵥ, rᵥ]. The beauty is Σ over edges |aᵤ − aᵥ|. Maximise it. There are t test cases.', 'শীর্ষ v-কে একটি মান aᵥ ∈ [lᵥ, rᵥ] দিতে হবে। সৌন্দর্য হলো প্রান্তগুলোর ওপর Σ |aᵤ − aᵥ|। এটি সর্বোচ্চ করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n, the ranges, then n − 1 edges.', 't; প্রতিটি টেস্টে n, পরিসরগুলো, তারপর n − ১টি প্রান্ত।'),
  output: L('The maximum beauty.', 'সর্বোচ্চ সৌন্দর্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, values ≤ 10⁹', 'Σ n ≤ ২·১০⁵, মান ≤ ১০⁹')] },
  samples: [{ input: '3\n2\n1 6\n3 8\n1 2\n3\n1 3\n4 6\n7 9\n1 2\n2 3\n6\n3 14\n12 20\n12 19\n2 12\n10 17\n3 17\n3 2\n6 5\n1 5\n2 6\n4 6', output: '7\n8\n62', explain: L('First test: a₁ = 1, a₂ = 8.', 'প্রথম টেস্ট: a₁ = ১, a₂ = ৮।') }],
  observation: L('With all neighbours fixed, the beauty is a convex function of aᵥ, so its maximum is at an end: lᵥ or rᵥ. Then dp[v][0/1] = best sum in v’s subtree if v takes l or r.', 'সব প্রতিবেশী ঠিক থাকলে সৌন্দর্য aᵥ-এর একটি উত্তল ফাংশন, তাই এর সর্বোচ্চ এক প্রান্তে: lᵥ বা rᵥ। তারপর dp[v][০/১] = v l বা r নিলে v-এর সাবট্রিতে সেরা যোগফল।'),
  approach: [L('dp[v][j] = Σ over children c of max(dp[c][0] + |x − l_c|, dp[c][1] + |x − r_c|), x = (l_v or r_v).', 'dp[v][j] = প্রতিটি সন্তান c-এর ওপর Σ max(dp[c][০] + |x − l_c|, dp[c][১] + |x − r_c|), x = (l_v বা r_v)।')],
  walkthrough: { input: 'test 2: path with ranges [1,3], [4,6], [7,9]', steps: [{ state: 'a = (1, 4, 9)', text: L('|1 − 4| + |4 − 9| = 3 + 5 = 8, and no endpoint choice does better.', '|১ − ৪| + |৪ − ৯| = ৩ + ৫ = ৮, আর কোনো প্রান্তবিন্দু বাছাই এর চেয়ে ভালো নয়।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two states per vertex.', 'প্রতি শীর্ষে দুটি অবস্থা।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Two-state tree DP', 'দুই-অবস্থার ট্রি DP'),
      idea: L('Only endpoints matter.', 'শুধু প্রান্তবিন্দু গুরুত্বপূর্ণ।'),
      explain: [L('The convexity argument is reusable: a sum of |x − c| terms is maximised at an endpoint of the allowed interval, which turns a continuous choice into a binary one.', 'উত্তলতার যুক্তি বারবার ব্যবহারযোগ্য: |x − c| পদের যোগফল অনুমোদিত ব্যবধানের এক প্রান্তে সর্বোচ্চ, যা একটি অবিচ্ছিন্ন বাছাইকে দ্বিমুখী বাছাইয়ে বদলায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<array<long long, 2>> v(n + 1);
        for (int i = 1; i <= n; i++) scanf("%lld %lld", &v[i][0], &v[i][1]);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
${bfsOrder.replace(/^/gm, '    ')}
        vector<array<long long, 2>> dp(n + 1, {0, 0});
        for (int i = n - 1; i > 0; i--) {
            int c = order[i], p = par[c];
            for (int j = 0; j < 2; j++)
                dp[p][j] += max(dp[c][0] + llabs(v[p][j] - v[c][0]), dp[c][1] + llabs(v[p][j] - v[c][1]));
        }
        printf("%lld\n", max(dp[1][0], dp[1][1]));
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every endpoint assignment', 'প্রতিটি প্রান্তবিন্দু বণ্টন চেষ্টা'),
      idea: L('2ⁿ choices of l or r per vertex.', 'প্রতি শীর্ষে l বা r-এর ২ⁿ বিকল্প।'),
      explain: [L('Exponential, but it checks the DP independently of the tree order.', 'সূচকীয়, কিন্তু ট্রির ক্রম থেকে স্বাধীনভাবে DP যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<array<long long, 2>> v(n);
        for (auto& x : v) cin >> x[0] >> x[1];
        vector<pair<int, int>> e(n - 1);
        for (auto& [a, b] : e) { cin >> a >> b; a--, b--; }
        if (n > 16) { cout << "\n"; continue; }
        long long best = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            long long s = 0;
            for (auto [a, b] : e) s += llabs(v[a][mask >> a & 1] - v[b][mask >> b & 1]);
            best = max(best, s);
        }
        cout << best << "\n";
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
  tests: [{ input: '3\n2\n1 6\n3 8\n1 2\n3\n1 3\n4 6\n7 9\n1 2\n2 3\n6\n3 14\n12 20\n12 19\n2 12\n10 17\n3 17\n3 2\n6 5\n1 5\n2 6\n4 6', output: '7\n8\n62', source: 'sample', note: sample(1) }],
  pitfalls: [L('Trying values inside the ranges.', 'পরিসরের ভেতরের মান চেষ্টা।')],
  related: [{ id: '1324F', name: 'Maximum White Subtree', why: L('Tree DP.', 'ট্রি DP।') }],
  toolkit: ['long-long'],
};

export const p1676G: ProblemEntry = {
  id: '1676G',
  contestId: 1676,
  index: 'G',
  name: 'White-Black Balanced Subtrees',
  rating: 1300,
  tags: ['dfs', 'graphs', 'trees'],
  why: L('The basic tree DP: a subtree value is the vertex’s own value plus its children’s.', 'মৌলিক ট্রি DP: একটি সাবট্রির মান হলো শীর্ষের নিজের মান আর তার সন্তানদের মান।'),
  statement: L('A rooted tree (root 1) is given by parents a₂ … aₙ; each vertex is W or B. Count vertices whose subtree has equally many white and black vertices. There are t test cases.', 'একটি মূলযুক্ত ট্রি (মূল ১) parent a₂ … aₙ দিয়ে দেওয়া; প্রতিটি শীর্ষ W বা B। এমন শীর্ষ গুনুন যার সাবট্রিতে সমান সংখ্যক সাদা আর কালো শীর্ষ। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n, the parents, and the colour string.', 't; প্রতিটি টেস্টে n, parent-গুলো, আর রঙের স্ট্রিং।'),
  output: L('The number of balanced subtrees.', 'সুষম সাবট্রির সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, aᵢ < i', 'Σ n ≤ ২·১০⁵, aᵢ < i')] },
  samples: [{ input: '3\n7\n1 1 2 3 3 5\nWBBWWBW\n2\n1\nBW\n8\n1 2 3 4 5 6 7\nBWBWBWBW', output: '2\n1\n4', explain: L('Third test is a path: every second suffix is balanced.', 'তৃতীয় টেস্ট একটি পথ: প্রতি দ্বিতীয় সাফিক্স সুষম।') }],
  observation: L('Give W = +1 and B = −1. A subtree is balanced iff its sum is 0. Because aᵢ < i, processing i from n down to 2 handles children before parents.', 'W = +১ আর B = −১ দিন। একটি সাবট্রি সুষম ঠিক তখনই যখন তার যোগফল ০। aᵢ < i বলে i-কে n থেকে ২ পর্যন্ত চালালে parent-এর আগে সন্তান আসে।'),
  approach: [L('sum[i] = ±1; for i = n..2 add sum[i] to sum[aᵢ]; count zeros.', 'sum[i] = ±১; i = n..২-এর জন্য sum[i]-কে sum[aᵢ]-তে যোগ; শূন্য গুনুন।')],
  walkthrough: { input: 'n = 2, BW', steps: [{ state: 'sum = −1, +1 → root 0', text: L('One balanced subtree.', 'একটি সুষম সাবট্রি।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'reverse',
      kind: 'optimal',
      title: L('Reverse index order', 'উল্টো ইনডেক্স ক্রম'),
      idea: L('Parents have smaller indices.', 'parent-দের ইনডেক্স ছোট।'),
      explain: [L('When the input guarantees parent < child, a simple backwards loop replaces DFS entirely.', 'ইনপুট parent < সন্তান নিশ্চিত করলে একটি সরল পেছনের লুপ পুরো DFS-এর জায়গা নেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> p(n + 1, 0);
        for (int i = 2; i <= n; i++) scanf("%d", &p[i]);
        static char s[200005];
        scanf("%s", s);
        vector<int> sum(n + 1);
        for (int i = 1; i <= n; i++) sum[i] = s[i - 1] == 'W' ? 1 : -1;
        for (int i = n; i >= 2; i--) sum[p[i]] += sum[i];
        printf("%d\n", (int)count(sum.begin() + 1, sum.end(), 0));
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'c-io'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('DFS with children lists', 'সন্তান তালিকাসহ DFS'),
      idea: L('Build children lists and compute sums with an explicit stack.', 'সন্তান তালিকা বানিয়ে স্পষ্ট স্ট্যাক দিয়ে যোগফল।'),
      explain: [L('The general method that works without the aᵢ < i guarantee: record a DFS order, then add sums in reverse.', 'aᵢ < i নিশ্চয়তা ছাড়াও চলে এমন সাধারণ পদ্ধতি: একটি DFS ক্রম লিখে উল্টো দিকে যোগফল যোগ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> p(n + 1, 0);
        vector<vector<int>> ch(n + 1);
        for (int i = 2; i <= n; i++) { cin >> p[i]; ch[p[i]].push_back(i); }
        string s;
        cin >> s;
        vector<int> sum(n + 1), order, st = {1};
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            order.push_back(v);
            for (int c : ch[v]) st.push_back(c);
        }
        for (int i = 1; i <= n; i++) sum[i] = s[i - 1] == 'W' ? 1 : -1;
        int balanced = 0;
        for (int i = n - 1; i >= 0; i--) {
            int v = order[i];
            if (v != 1) sum[p[v]] += sum[v];
            if (sum[v] == 0) balanced++;
        }
        cout << balanced << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [{ input: '3\n7\n1 1 2 3 3 5\nWBBWWBW\n2\n1\nBW\n8\n1 2 3 4 5 6 7\nBWBWBWBW', output: '2\n1\n4', source: 'sample', note: sample(1) }],
  pitfalls: [L('Adding a child into its parent after the parent was already checked.', 'parent যাচাইয়ের পরে সন্তানকে parent-এ যোগ।')],
  related: [{ id: '1843D', name: 'Apple Tree', why: L('Subtree aggregates.', 'সাবট্রির সমষ্টি।') }],
  toolkit: ['count-find'],
};

export const p1153D: ProblemEntry = {
  id: '1153D',
  contestId: 1153,
  index: 'D',
  name: 'Serval and Rooted Tree',
  rating: 1900,
  tags: ['binary-search', 'dfs', 'dp', 'greedy', 'trees'],
  why: L('Tree DP on ranks: track how many leaves a node’s value is forced below, not the value itself.', 'র‍্যাংকের ওপর ট্রি DP: মানটি নয়, একটি নোডের মান কয়টি পাতার নিচে বাধ্য তা রাখা।'),
  statement: L(
    'Each internal node of a rooted tree is a max or a min of its children. The k leaves get the numbers 1 … k in some order. Maximise the value at the root.',
    'একটি মূলযুক্ত ট্রির প্রতিটি অভ্যন্তরীণ নোড তার সন্তানদের max বা min। k-টি পাতায় কোনো ক্রমে ১ … k সংখ্যা বসে। মূলের মান সর্বোচ্চ করুন।',
  ),
  input: L('n, the operations (1 = max, 0 = min), then parents f₂ … fₙ.', 'n, অপারেশন (১ = max, ০ = min), তারপর parent f₂ … fₙ।'),
  output: L('The maximum root value.', 'মূলের সর্বোচ্চ মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 3·10⁵, fᵢ < i', 'n ≤ ৩·১০⁵, fᵢ < i')] },
  samples: [
    { input: '6\n1 0 1 1 0 1\n1 2 2 2 2', output: '1', explain: L('A min over all four leaves, then max of one: always 1.', 'চারটি পাতার min, তারপর একটির max: সবসময় ১।') },
    { input: '5\n1 0 1 0 1\n1 1 1 1', output: '4', explain: L('Root is a max of four leaves.', 'মূল চারটি পাতার max।') },
    { input: '8\n1 0 0 1 0 1 1 0\n1 1 2 2 3 3 3', output: '4', explain: L('Mixed operations.', 'মিশ্র অপারেশন।') },
    { input: '9\n1 1 0 0 1 0 1 0 1\n1 1 2 2 3 3 4 4', output: '5', explain: L('Deeper tree.', 'আরও গভীর ট্রি।') },
  ],
  observation: L('Let dp[v] = the minimum number of leaves in v’s subtree that must get values ≥ v’s result (so smaller dp is better). A leaf: 1. A max node: it only needs its best child, min of dp. A min node: every child must be large, sum of dp. Answer: k − dp[root] + 1.', 'dp[v] = v-এর সাবট্রিতে সর্বনিম্ন কয়টি পাতাকে v-এর ফলের ≥ মান পেতেই হবে (তাই ছোট dp ভালো)। পাতা: ১। max নোড: শুধু সেরা সন্তান লাগে, dp-এর min। min নোড: প্রতিটি সন্তানকে বড় হতে হবে, dp-এর যোগফল। উত্তর: k − dp[মূল] + ১।'),
  approach: [L('Process vertices from n down to 1 (parents have smaller indices).', 'n থেকে ১ পর্যন্ত শীর্ষ প্রক্রিয়া (parent-এর ইনডেক্স ছোট)।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'root max over 4 leaves: dp = 1, k = 4', text: L('4 − 1 + 1 = 4.', '৪ − ১ + ১ = ৪।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('DP on “leaves that must be large”', '“যে পাতাগুলো বড় হতেই হবে”-র ওপর DP'),
      idea: L('max → min of children, min → sum of children.', 'max → সন্তানদের min, min → সন্তানদের যোগফল।'),
      explain: [L('Values are a permutation, so “the root gets the j-th largest number” is what matters; counting forced leaves turns that into an additive DP.', 'মানগুলো একটি পারমুটেশন, তাই “মূল j-তম বড় সংখ্যা পায়” সেটিই গুরুত্বপূর্ণ; বাধ্য পাতা গোনা তাকে একটি যোজনীয় DP-তে পরিণত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> op(n + 1), par(n + 1, 0), childCount(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &op[i]);
    for (int i = 2; i <= n; i++) { scanf("%d", &par[i]); childCount[par[i]]++; }
    const int INF = INT_MAX;
    vector<int> dp(n + 1);
    for (int v = 1; v <= n; v++) dp[v] = childCount[v] == 0 ? 1 : (op[v] == 1 ? INF : 0);
    int leaves = 0;
    for (int v = n; v >= 1; v--) {
        if (childCount[v] == 0) leaves++;
        if (v == 1) break;
        int p = par[v];
        if (op[p] == 1) dp[p] = min(dp[p], dp[v]);
        else dp[p] += dp[v];
    }
    printf("%d\n", leaves - dp[1] + 1);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every leaf permutation', 'প্রতিটি পাতার পারমুটেশন চেষ্টা'),
      idea: L('next_permutation over 1 … k and evaluate the tree.', '১ … k-এর ওপর next_permutation আর ট্রি মূল্যায়ন।'),
      explain: [L('k! orders, so only tiny trees, but it does not rely on the counting argument.', 'k! ক্রম, তাই শুধু ক্ষুদ্র ট্রি, কিন্তু গণনার যুক্তির ওপর নির্ভর করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> op(n + 1), par(n + 1, 0);
    vector<vector<int>> ch(n + 1);
    for (int i = 1; i <= n; i++) cin >> op[i];
    for (int i = 2; i <= n; i++) { cin >> par[i]; ch[par[i]].push_back(i); }
    vector<int> leaves;
    for (int v = 1; v <= n; v++) if (ch[v].empty()) leaves.push_back(v);
    int k = leaves.size();
    if (k > 8) { cout << "\n"; return 0; }
    vector<int> perm(k);
    iota(perm.begin(), perm.end(), 1);
    int best = 0;
    do {
        vector<int> val(n + 1);
        for (int i = 0; i < k; i++) val[leaves[i]] = perm[i];
        for (int v = n; v >= 1; v--) {
            if (ch[v].empty()) continue;
            val[v] = op[v] ? 0 : INT_MAX;
            for (int c : ch[v]) val[v] = op[v] ? max(val[v], val[c]) : min(val[v], val[c]);
        }
        best = max(best, val[1]);
    } while (next_permutation(perm.begin(), perm.end()));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(k! · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['min-max'],
    },
  ],
  tests: [
    { input: '6\n1 0 1 1 0 1\n1 2 2 2 2', output: '1', source: 'sample', note: sample(1) },
    { input: '5\n1 0 1 0 1\n1 1 1 1', output: '4', source: 'sample', note: sample(2) },
    { input: '8\n1 0 0 1 0 1 1 0\n1 1 2 2 3 3 3', output: '4', source: 'sample', note: sample(3) },
    { input: '9\n1 1 0 0 1 0 1 0 1\n1 1 2 2 3 3 4 4', output: '5', source: 'sample', note: sample(4) },
  ],
  pitfalls: [L('Propagating actual values instead of counts.', 'গণনার বদলে আসল মান পাঠানো।')],
  related: [{ id: '1676G', name: 'White-Black Balanced Subtrees', why: L('Bottom-up over a parent array.', 'parent অ্যারের ওপর নিচ থেকে ওপরে।') }],
  toolkit: ['min-max'],
};

export const p1406C: ProblemEntry = {
  id: '1406C',
  contestId: 1406,
  index: 'C',
  name: 'Link Cut Centroids',
  rating: 1700,
  tags: ['constructive', 'dfs', 'graphs', 'trees'],
  why: L('A tree has one centroid or two adjacent ones; moving one leaf breaks the tie.', 'একটি ট্রির একটি সেন্ট্রয়েড বা দুটি পাশাপাশি সেন্ট্রয়েড থাকে; একটি পাতা সরালে সমতা ভাঙে।'),
  statement: L(
    'A centroid of a tree is a vertex whose removal leaves components of size at most n / 2. Remove one edge and add one edge so that the result is a tree with exactly one centroid. Print both edges (they may be the same). There are t test cases.',
    'একটি ট্রির সেন্ট্রয়েড হলো এমন শীর্ষ যা সরালে উপাদানগুলোর আকার সর্বোচ্চ n / ২। একটি প্রান্ত সরিয়ে একটি প্রান্ত যোগ করুন যাতে ফল ঠিক একটি সেন্ট্রয়েডসহ একটি ট্রি হয়। দুটি প্রান্তই প্রিন্ট করুন (এরা একই হতে পারে)। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and n − 1 edges.', 't; প্রতিটি টেস্টে n আর n − ১টি প্রান্ত।'),
  output: L('The removed edge, then the added edge.', 'সরানো প্রান্ত, তারপর যোগ করা প্রান্ত।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁵', '৩ ≤ n ≤ ১০⁵'), anyAnswer] },
  samples: [{ input: '2\n5\n1 2\n1 3\n2 4\n2 5\n6\n1 2\n1 3\n1 4\n2 5\n2 6', output: '1 2\n1 2\n1 3\n2 3', explain: L('Second tree has centroids 1 and 2; moving leaf 3 under 2 leaves only 2.', 'দ্বিতীয় ট্রির সেন্ট্রয়েড ১ আর ২; পাতা ৩-কে ২-এর নিচে সরালে শুধু ২ থাকে।') }],
  observation: L('If there is one centroid, cut and re-add any edge. If there are two, c₁ and c₂, they are adjacent and each side has exactly n / 2 vertices. Take a leaf ℓ on c₂’s side, cut it from its parent and attach it to c₁: now c₁’s side is larger and c₁ is the only centroid.', 'একটি সেন্ট্রয়েড হলে যেকোনো প্রান্ত কেটে আবার যোগ করুন। দুটি হলে, c₁ আর c₂, এরা পাশাপাশি আর প্রতিটি দিকে ঠিক n / ২টি শীর্ষ। c₂-এর দিকের একটি পাতা ℓ নিন, তার parent থেকে কেটে c₁-এ যুক্ত করুন: এখন c₁-এর দিক বড় আর c₁ একমাত্র সেন্ট্রয়েড।'),
  approach: [L('Subtree sizes; centroids are vertices whose largest component ≤ n / 2. For two centroids, walk down from c₂ away from c₁ to a leaf.', 'সাবট্রির আকার; সেন্ট্রয়েড হলো যেসব শীর্ষের সবচেয়ে বড় উপাদান ≤ n / ২। দুটি সেন্ট্রয়েডে c₂ থেকে c₁-এর বিপরীতে নেমে একটি পাতায় যান।')],
  walkthrough: { input: 'tree 2', steps: [{ state: 'centroids 1, 2; leaf 5 below 2', text: L('Cut 2–5, add 1–5 (or the sample’s choice).', '২–৫ কেটে ১–৫ যোগ (বা স্যাম্পলের বাছাই)।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One traversal.', 'একটি ঘোরা।') },
  solutions: [
    {
      id: 'centroids',
      kind: 'optimal',
      title: L('Find centroids, move a leaf', 'সেন্ট্রয়েড খুঁজে একটি পাতা সরানো'),
      idea: L('largest component of v = max(n − sz[v], max child size).', 'v-এর সবচেয়ে বড় উপাদান = max(n − sz[v], সবচেয়ে বড় সন্তানের আকার)।'),
      explain: [L('Every tree has one or two centroids, and two centroids are always adjacent. Knowing these facts turns the problem into a few lines.', 'প্রতিটি ট্রির এক বা দুটি সেন্ট্রয়েড, আর দুটি সেন্ট্রয়েড সবসময় পাশাপাশি। এই তথ্যগুলো জানলে প্রবলেমটি কয়েক লাইনে পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<int>> adj(n + 1);
        int ea = 0, eb = 0;
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
            ea = a, eb = b;
        }
${bfsOrder.replace(/^/gm, '    ')}
        vector<int> sz(n + 1, 1), big(n + 1, 0);
        for (int i = n - 1; i > 0; i--) {
            int v = order[i];
            sz[par[v]] += sz[v];
            big[par[v]] = max(big[par[v]], sz[v]);
        }
        vector<int> cent;
        for (int v = 1; v <= n; v++) if (max(big[v], n - sz[v]) * 2 <= n) cent.push_back(v);
        if (cent.size() == 1) {
            printf("%d %d\n%d %d\n", ea, eb, ea, eb);
            continue;
        }
        int c1 = cent[0], c2 = cent[1];
        int prev = c1, cur = c2;  // walk from c2 away from c1 until a leaf
        while (true) {
            int nxt = -1;
            for (int u : adj[cur]) if (u != prev) { nxt = u; break; }
            if (nxt == -1) break;
            prev = cur, cur = nxt;
        }
        printf("%d %d\n%d %d\n", prev, cur, c1, cur);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every cut and every link', 'প্রতিটি কাটা আর প্রতিটি যোগ চেষ্টা'),
      idea: L('For each removed edge and each new pair, check whether the result is a tree with one centroid.', 'প্রতিটি সরানো প্রান্ত আর প্রতিটি নতুন জোড়ার জন্য ফল এক সেন্ট্রয়েডের ট্রি কি না দেখুন।'),
      explain: [L('O(n⁴) on small trees. It shows that an answer always exists and is used as the stress-test reference.', 'ছোট ট্রিতে O(n⁴)। এটি দেখায় যে উত্তর সবসময় আছে আর স্ট্রেস টেস্টের রেফারেন্স হিসেবে ব্যবহৃত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;

int centroids(const vector<pair<int, int>>& e) {
    vector<vector<int>> adj(n + 1);
    for (auto [a, b] : e) { adj[a].push_back(b); adj[b].push_back(a); }
    vector<int> order = {1}, par(n + 1, 0);
    vector<bool> seen(n + 1, false);
    seen[1] = true;
    for (size_t i = 0; i < order.size(); i++)
        for (int u : adj[order[i]]) if (!seen[u]) { seen[u] = true; par[u] = order[i]; order.push_back(u); }
    if ((int)order.size() != n) return -1;  // the new edge closed a cycle
    vector<int> sz(n + 1, 1), big(n + 1, 0);
    for (int i = n - 1; i > 0; i--) {
        sz[par[order[i]]] += sz[order[i]];
        big[par[order[i]]] = max(big[par[order[i]]], sz[order[i]]);
    }
    int c = 0;
    for (int v = 1; v <= n; v++) if (max(big[v], n - sz[v]) * 2 <= n) c++;
    return c;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cin >> n;
        vector<pair<int, int>> e(n - 1);
        for (auto& [a, b] : e) cin >> a >> b;
        if (n > 9) { cout << "\n"; continue; }
        bool done = false;
        for (int i = 0; i < n - 1 && !done; i++)
            for (int a = 1; a <= n && !done; a++)
                for (int b = a + 1; b <= n && !done; b++) {
                    auto f = e;
                    f[i] = {a, b};
                    if (centroids(f) == 1) {
                        cout << e[i].first << ' ' << e[i].second << "\n" << a << ' ' << b << "\n";
                        done = true;
                    }
                }
    }
    return 0;
}
`,
      time: 'O(n⁴)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions', 'pair'],
    },
  ],
  tests: [{ input: '2\n5\n1 2\n1 3\n2 4\n2 5\n6\n1 2\n1 3\n1 4\n2 5\n2 6', output: '1 2\n1 2\n1 3\n2 3', source: 'sample', note: sample(1) }],
  pitfalls: [L('Moving a leaf from c₁’s own side, which keeps the tie.', 'c₁-এর নিজের দিক থেকে পাতা সরানো, যা সমতা রাখে।')],
  related: [{ id: '1336A', name: 'Linova and Kingdom', why: L('Subtree sizes.', 'সাবট্রির আকার।') }],
  toolkit: ['vector'],
};

export const p1176E: ProblemEntry = {
  id: '1176E',
  contestId: 1176,
  index: 'E',
  name: 'Cover it!',
  rating: 1700,
  tags: ['dfs', 'dsu', 'graphs', 'shortest-paths', 'trees'],
  why: L('BFS layers split the graph into two classes that each dominate it; the smaller has at most n / 2 vertices.', 'BFS স্তর গ্রাফকে দুটি দলে ভাগ করে যাদের প্রতিটি গ্রাফকে আধিপত্য করে; ছোটটিতে সর্বোচ্চ n / ২টি শীর্ষ।'),
  statement: L(
    'A connected graph with n vertices. Choose at most ⌊n / 2⌋ vertices so that every unchosen vertex is adjacent to a chosen one. There are t test cases.',
    'n শীর্ষের একটি সংযুক্ত গ্রাফ। সর্বোচ্চ ⌊n / ২⌋টি শীর্ষ বাছুন যাতে প্রতিটি অবাছা শীর্ষ একটি বাছা শীর্ষের পাশে থাকে। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n m and m edges.', 't; প্রতিটি টেস্টে n m আর m-টি প্রান্ত।'),
  output: L('k, then k vertices.', 'k, তারপর k-টি শীর্ষ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ m ≤ 2·10⁵', 'Σ m ≤ ২·১০⁵'), anyAnswer] },
  samples: [{ input: '2\n4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4\n6 8\n2 5\n5 4\n4 3\n4 1\n1 3\n2 3\n2 6\n5 6', output: '2\n1 3\n3\n4 3 6', explain: L('Any dominating set of the right size works.', 'সঠিক আকারের যেকোনো আধিপত্যকারী সেট চলে।') }],
  observation: L('Colour vertices by the parity of their BFS distance from 1. Every vertex at distance d ≥ 1 has a neighbour at distance d − 1 (its BFS parent), which has the other parity. So each parity class dominates the graph, and the smaller class has ≤ ⌊n / 2⌋ vertices.', '১ থেকে BFS দূরত্বের জোড়-বিজোড় দিয়ে শীর্ষ রঙ করুন। দূরত্ব d ≥ ১-এর প্রতিটি শীর্ষের একটি প্রতিবেশী d − ১ দূরত্বে (এর BFS parent), যার জোড়-বিজোড় অন্যটি। তাই প্রতিটি দল গ্রাফকে আধিপত্য করে, আর ছোট দলে ≤ ⌊n / ২⌋টি শীর্ষ।'),
  approach: [L('BFS, split by dist % 2, print the smaller class.', 'BFS, dist % ২ দিয়ে ভাগ, ছোট দল প্রিন্ট।')],
  walkthrough: { input: 'test 1', steps: [{ state: 'dist: 1→0, others 1', text: L('Classes {1} and {2, 3, 4}: print 1.', 'দল {১} আর {২, ৩, ৪}: ১ প্রিন্ট।') }] },
  complexity: { time: 'O(n + m)', space: 'O(n + m)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('Parity of BFS distance', 'BFS দূরত্বের জোড়-বিজোড়'),
      idea: L('Each vertex is dominated by its BFS parent.', 'প্রতিটি শীর্ষ তার BFS parent দ্বারা আধিপত্য পায়।'),
      explain: [L('Only the BFS tree matters; extra edges never hurt domination. This is why the problem is also tagged trees and DSU (a spanning tree from DSU works equally).', 'শুধু BFS ট্রি গুরুত্বপূর্ণ; বাড়তি প্রান্ত আধিপত্যে কখনো ক্ষতি করে না। তাই প্রবলেমটি ট্রি আর DSU ট্যাগও পেয়েছে (DSU থেকে একটি স্প্যানিং ট্রিও একইভাবে চলে)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < m; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        vector<int> d(n + 1, -1);
        queue<int> q;
        q.push(1);
        d[1] = 0;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
        }
        vector<int> cls[2];
        for (int v = 1; v <= n; v++) cls[d[v] % 2].push_back(v);
        auto& pick = cls[0].size() <= cls[1].size() ? cls[0] : cls[1];
        printf("%d\n", (int)pick.size());
        for (int v : pick) printf("%d ", v);
        printf("\n");
    }
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
    {
      id: 'dsu-tree',
      kind: 'alt',
      title: L('Spanning tree by DSU, then 2-colour it', 'DSU দিয়ে স্প্যানিং ট্রি, তারপর ২-রঙ'),
      idea: L('Keep only edges that join two DSU components, then colour that tree.', 'শুধু দুটি DSU উপাদান যুক্ত করে এমন প্রান্ত রেখে সেই ট্রি রঙ করুন।'),
      explain: [L('Any spanning tree works, not only the BFS tree: in a tree, every vertex except the root has a parent of the opposite colour, and the root has a child of the opposite colour (n ≥ 2).', 'শুধু BFS ট্রি নয়, যেকোনো স্প্যানিং ট্রি চলে: একটি ট্রিতে মূল ছাড়া প্রতিটি শীর্ষের বিপরীত রঙের parent আছে, আর মূলের বিপরীত রঙের সন্তান আছে (n ≥ ২)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        p.resize(n + 1);
        iota(p.begin(), p.end(), 0);
        vector<vector<int>> tree(n + 1);
        for (int i = 0; i < m; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            if (find(a) != find(b)) {
                p[find(a)] = find(b);
                tree[a].push_back(b);
                tree[b].push_back(a);
            }
        }
        vector<int> col(n + 1, -1), st = {1};
        col[1] = 0;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            for (int u : tree[v]) if (col[u] == -1) { col[u] = 1 - col[v]; st.push_back(u); }
        }
        int zeros = count(col.begin() + 1, col.end(), 0);
        int want = zeros * 2 <= n ? 0 : 1;
        printf("%d\n", want == 0 ? zeros : n - zeros);
        for (int v = 1; v <= n; v++) if (col[v] == want) printf("%d ", v);
        printf("\n");
    }
    return 0;
}
`,
      time: 'O((n + m) α)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['functions', 'stack-queue'],
    },
  ],
  tests: [{ input: '2\n4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4\n6 8\n2 5\n5 4\n4 3\n4 1\n1 3\n2 3\n2 6\n5 6', output: '2\n1 3\n3\n4 3 6', source: 'sample', note: sample(1) }],
  pitfalls: [L('Trying to find a minimum dominating set (NP-hard).', 'সর্বনিম্ন আধিপত্যকারী সেট খোঁজার চেষ্টা (NP-হার্ড)।')],
  related: [{ id: '862B', name: 'Mahmoud and Ehab and the bipartiteness', why: L('2-colouring a tree.', 'একটি ট্রি ২-রঙ করা।') }],
  toolkit: ['stack-queue'],
};
