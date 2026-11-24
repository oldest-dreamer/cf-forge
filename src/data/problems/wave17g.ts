import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 321C
export const p321C: ProblemEntry = {
  id: '321C',
  contestId: 321,
  index: 'C',
  name: 'Ciel the Commander',
  rating: 2100,
  tags: ['dfs', 'divide-and-conquer', 'greedy', 'trees'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'The rule “between two equal ranks there must be a higher rank” is exactly the shape of a centroid decomposition: the centroid gets the highest rank, and every deeper level gets a lower one. Depth log n means 17 letters are always enough.',
    '“দুটি সমান র‍্যাঙ্কের মাঝে উচ্চতর র‍্যাঙ্ক থাকতেই হবে” নিয়মটি ঠিক সেন্ট্রয়েড ডিকম্পোজিশনের আকৃতি: সেন্ট্রয়েড সর্বোচ্চ র‍্যাঙ্ক পায়, আর প্রতিটি গভীর স্তর নিচের একটি। গভীরতা log n মানে ১৭টি অক্ষরই সবসময় যথেষ্ট।',
  ),
  statement: L(
    'A tree of n cities. Assign each city a rank from A (highest) to Z (lowest) so that for any two cities with the same rank, the path between them contains a city of strictly higher rank. Print any valid assignment, or Impossible! if there is none.',
    'n শহরের একটি গাছ। প্রতিটি শহরকে A (সর্বোচ্চ) থেকে Z (সর্বনিম্ন) র‍্যাঙ্ক দাও যাতে সমান র‍্যাঙ্কের যেকোনো দুই শহরের মাঝের পথে কঠোরভাবে উচ্চতর র‍্যাঙ্কের শহর থাকে। যেকোনো বৈধ বণ্টন প্রিন্ট করো, না থাকলে Impossible! প্রিন্ট করো।',
  ),
  input: L('n, then n − 1 edges.', 'n, তারপর n − ১ টি কিনারা।'),
  output: L('n space-separated letters, or Impossible!.', 'n টি স্পেস-বিভক্ত অক্ষর, বা Impossible!।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵; any valid answer is accepted (checker)', '১ ≤ n ≤ ১০⁵; যেকোনো বৈধ উত্তর গ্রহণযোগ্য (চেকার)')] },
  samples: [
    { input: '4\n1 2\n1 3\n1 4', output: 'A B B B', explain: L('The centre gets A; the leaves share B, and every path between two leaves passes through the A.', 'কেন্দ্র পায় A; পাতারা সবাই B, আর দুই পাতার মাঝের প্রতিটি পথ A দিয়ে যায়।') },
  ],
  observation: L(
    'Remove a centroid and give it the highest unused letter: any two vertices in different remaining components have the centroid on their path, so they may even share a letter. Recursing into each component with the next letter handles the pairs inside it. After k levels every component has at most n / 2ᵏ vertices, so at most ⌊log₂ n⌋ + 1 ≤ 17 letters are used — answer is never Impossible!.',
    'একটি সেন্ট্রয়েড সরিয়ে তাকে সর্বোচ্চ অব্যবহৃত অক্ষর দাও: বাকি ভিন্ন কম্পোনেন্টের যেকোনো দুই শীর্ষের পথে সেন্ট্রয়েড থাকে, তাই তারা একই অক্ষরও পেতে পারে। প্রতিটি কম্পোনেন্টে পরের অক্ষরে রিকার্স করলে তার ভেতরের জোড়া সামলানো হয়। k স্তর পর প্রতিটি কম্পোনেন্টে সর্বোচ্চ n / ২ᵏ শীর্ষ, তাই সর্বোচ্চ ⌊log₂ n⌋ + ১ ≤ ১৭ অক্ষর লাগে — উত্তর কখনও Impossible! নয়।',
  ),
  approach: [
    L('Keep a stack of (component start, level).', '(কম্পোনেন্টের শুরু, স্তর)-এর একটি স্ট্যাক রাখো।'),
    L('For each component find a centroid c, set rank[c] = level, mark c dead.', 'প্রতিটি কম্পোনেন্টে সেন্ট্রয়েড c খুঁজে rank[c] = স্তর দাও, c মৃত চিহ্নিত করো।'),
    L('Push every live neighbour of c with level + 1; finally print rank as letters.', 'c-র প্রতিটি জীবিত প্রতিবেশীকে স্তর + ১-সহ স্ট্যাকে ঢোকাও; শেষে র‍্যাঙ্ক অক্ষর হিসেবে প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'path 1–2–3–4–5',
    steps: [
      { state: 'centroid 3 → A', text: L('Components {1, 2} and {4, 5}.', 'কম্পোনেন্ট {১, ২} আর {৪, ৫}।') },
      { state: 'centroid of {1, 2} → B (vertex 1 or 2)', text: L('The other gets C.', 'অন্যটি পায় C।') },
      { state: 'result: B C A B C', text: L('Equal letters 1,4 and 2,5 have the A between them.', 'সমান অক্ষর ১,৪ আর ২,৫-এর মাঝে A আছে।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One BFS per component per level.', 'প্রতি স্তরে প্রতি কম্পোনেন্টে একটি BFS।') },
  solutions: [
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Iterative centroid decomposition', 'ইটারেটিভ সেন্ট্রয়েড ডিকম্পোজিশন'),
      idea: L('Rank = depth in the centroid tree.', 'র‍্যাঙ্ক = সেন্ট্রয়েড-গাছে গভীরতা।'),
      explain: [L('No recursion, so a path of 10⁵ vertices cannot overflow the stack. Letters are computed from the level and printed at the end.', 'রিকার্সন নেই, তাই ১০⁵ শীর্ষের পথেও স্ট্যাক উপচায় না। অক্ষর স্তর থেকে বের করে শেষে প্রিন্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    vector<int> rk(n + 1, 0), sz(n + 1), pr(n + 1);
    vector<char> dead(n + 1, 0);
    vector<pair<int, int>> stk = {{1, 0}};
    vector<int> order;
    while (!stk.empty()) {
        auto [s, lev] = stk.back();
        stk.pop_back();
        order.assign(1, s);
        pr[s] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (int w : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = s;
        for (int v : order) {
            int mx = tot - sz[v];
            for (int w : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        rk[c] = lev;
        dead[c] = 1;
        for (int w : g[c])
            if (!dead[w]) stk.push_back({w, lev + 1});
    }
    for (int i = 1; i <= n; i++) printf("%c%c", 'A' + rk[i], i == n ? '\n' : ' ');
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'pair', 'structured-bindings'],
    },
    {
      id: 'recursive',
      kind: 'method',
      title: L('Recursive centroid with subtree sizes', 'সাবট্রি সাইজসহ রিকার্সিভ সেন্ট্রয়েড'),
      idea: L('The textbook version: compute sizes with a DFS, walk toward the heavy child to the centroid.', 'পাঠ্যবইয়ের সংস্করণ: DFS-এ সাইজ বের করে ভারী সন্তানের দিকে হেঁটে সেন্ট্রয়েডে।'),
      explain: [L('Shorter to write, and the recursion depth of the DFS is at most the component size. On Codeforces’ large stack this is fine for 10⁵; on a default 8 MB stack a long path may be risky, which is why the iterative version above is the safer habit.', 'লিখতে ছোট, আর DFS-এর রিকার্সন গভীরতা কম্পোনেন্টের আকারের বেশি নয়। কোডফোর্সেসের বড় স্ট্যাকে ১০⁵-এ ঠিক; ডিফল্ট ৮ MB স্ট্যাকে লম্বা পথ ঝুঁকিপূর্ণ হতে পারে, তাই ওপরের ইটারেটিভ সংস্করণই নিরাপদ অভ্যাস।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> g[100005];
int sz[100005], rk[100005];
bool dead[100005];

int calc(int v, int p) {
    sz[v] = 1;
    for (int w : g[v])
        if (w != p && !dead[w]) sz[v] += calc(w, v);
    return sz[v];
}

int centroid(int v, int p, int tot) {
    for (int w : g[v])
        if (w != p && !dead[w] && 2 * sz[w] > tot) return centroid(w, v, tot);
    return v;
}

void solve(int v, int lev) {
    int tot = calc(v, 0);
    int c = centroid(v, 0, tot);
    rk[c] = lev;
    dead[c] = true;
    for (int w : g[c])
        if (!dead[w]) solve(w, lev + 1);
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    solve(1, 0);
    for (int i = 1; i <= n; i++) printf("%c%c", 'A' + rk[i], i == n ? '\n' : ' ');
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try letter assignments', 'অক্ষর বণ্টন চেষ্টা'),
      idea: L('For tiny n try all 4ⁿ assignments of A–D and keep the first valid one.', 'ছোট n-এ A–D-র সব ৪ⁿ বণ্টন চেষ্টা করে প্রথম বৈধটি রাখো।'),
      explain: [L('Four letters always suffice for n ≤ 8 (the centroid tree has at most 4 levels). The validity test is the statement’s rule, checked on every same-letter pair.', 'n ≤ ৮-এ চারটি অক্ষরই যথেষ্ট (সেন্ট্রয়েড-গাছে সর্বোচ্চ ৪ স্তর)। বৈধতা পরীক্ষা প্রবলেম-বিবরণের নিয়ম, প্রতিটি সমান-অক্ষর জোড়ায় যাচাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> g[20];
int a[20];

bool valid() {
    for (int u = 1; u <= n; u++) {
        vector<int> par(n + 1, -1), q = {u};
        par[u] = 0;
        for (size_t h = 0; h < q.size(); h++)
            for (int w : g[q[h]])
                if (par[w] < 0) par[w] = q[h], q.push_back(w);
        for (int w = u + 1; w <= n; w++) {
            if (a[u] != a[w]) continue;
            bool ok = false;
            for (int x = par[w]; x != u; x = par[x])
                if (a[x] < a[u]) ok = true;
            if (!ok) return false;
        }
    }
    return true;
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i < n; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        g[x].push_back(y), g[y].push_back(x);
    }
    int total = 1;
    for (int i = 0; i < n; i++) total *= 4;
    for (int m = 0; m < total; m++) {
        int t = m;
        for (int i = 1; i <= n; i++) a[i] = t % 4, t /= 4;
        if (valid()) {
            for (int i = 1; i <= n; i++) printf("%c%c", 'A' + a[i], i == n ? '\n' : ' ');
            return 0;
        }
    }
    puts("Impossible!");
    return 0;
}
`,
      time: 'O(4ⁿ · n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'for-loop'],
    },
  ],
  tests: [
    { input: '4\n1 2\n1 3\n1 4', output: 'A B B B', source: 'sample', note: sample(1) },
    { input: '1', output: 'A', source: 'own', note: L('A single city gets A.', 'একটিমাত্র শহর A পায়।') },
    { input: '3\n1 2\n2 3', output: 'B A B', source: 'own', note: L('The middle city is the centroid; any valid answer is accepted.', 'মাঝের শহরই সেন্ট্রয়েড; যেকোনো বৈধ উত্তর গ্রহণযোগ্য।') },
  ],
  pitfalls: [
    L('Printing Impossible! for big n: 17 levels are always enough, so it never happens.', 'বড় n-এ Impossible! প্রিন্ট: ১৭ স্তর সবসময় যথেষ্ট, তাই কখনও ঘটে না।'),
    L('Choosing any vertex instead of a centroid: the depth then reaches n and runs out of letters.', 'সেন্ট্রয়েডের বদলে যেকোনো শীর্ষ বাছা: তখন গভীরতা n ছোঁয় আর অক্ষর ফুরায়।'),
    L('Giving the centroid a higher letter than its children: A is the strongest, so levels go A, B, C … downward.', 'সেন্ট্রয়েডকে সন্তানের চেয়ে ছোট অক্ষর দেওয়া: A সবচেয়ে শক্তিশালী, তাই স্তরগুলো A, B, C … নিচে।'),
  ],
  related: [
    { id: '161D', name: 'Distance in Tree', why: L('The same centroid skeleton, counting instead of labelling.', 'একই সেন্ট্রয়েড কাঠামো, লেবেলের বদলে গণনা।') },
    { id: '1490D', name: 'Permutation Transformation', why: L('Another “split at the best element and recurse” tree.', 'আরেকটি “সেরা উপাদানে ভেঙে রিকার্স” গাছ।') },
  ],
  toolkit: ['vector', 'pair'],
};

// ───────────────────────────────────────────── 342E
export const p342E: ProblemEntry = {
  id: '342E',
  contestId: 342,
  index: 'E',
  name: 'Xenia and Tree',
  rating: 2400,
  tags: ['data-structures', 'divide-and-conquer', 'trees'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'Nearest-red-vertex queries with insertions are the classic use of centroid decomposition as a data structure: every vertex has only log n centroid ancestors, and the nearest red vertex is found through one of them.',
    'সন্নিবেশসহ নিকটতম লাল শীর্ষের কোয়েরি সেন্ট্রয়েড ডিকম্পোজিশনকে ডেটা স্ট্রাকচার হিসেবে ব্যবহারের ক্লাসিক: প্রতিটি শীর্ষের মাত্র log n সেন্ট্রয়েড পূর্বপুরুষ, আর নিকটতম লাল শীর্ষ তাদেরই একটির মাধ্যমে মেলে।',
  ),
  statement: L(
    'A tree has n vertices, vertex 1 is red and all others are blue. Process m queries: type 1 v paints v red; type 2 v asks for the distance from v to the nearest red vertex.',
    'একটি গাছে n শীর্ষ, শীর্ষ ১ লাল আর বাকিরা নীল। m টি কোয়েরি: ধরন ১ v শীর্ষ v-কে লাল করে; ধরন ২ v জিজ্ঞাসা করে v থেকে নিকটতম লাল শীর্ষের দূরত্ব।',
  ),
  input: L('n m, then n − 1 edges, then m queries.', 'n m, তারপর n − ১ টি কিনারা, তারপর m টি কোয়েরি।'),
  output: L('One line per type 2 query.', 'ধরন ২-এর প্রতিটি কোয়েরির জন্য এক লাইন।'),
  limits: { timeSec: 5, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁵', '১ ≤ n, m ≤ ১০⁵')] },
  samples: [
    { input: '5 4\n1 2\n2 3\n2 4\n4 5\n2 1\n2 5\n1 2\n2 5', output: '0\n3\n2', explain: L('Vertex 1 is red: distance 0. Vertex 5 is three edges from 1. After painting 2, vertex 5 is two edges away.', 'শীর্ষ ১ লাল: দূরত্ব ০। শীর্ষ ৫ থেকে ১ তিন কিনারা। ২ রং করার পর শীর্ষ ৫ দুই কিনারা দূরে।') },
  ],
  observation: L(
    'In the centroid tree every path u → v passes through the centroid c that first separates them, which is a centroid ancestor of both. So dist(u, nearest red) = min over centroid ancestors a of u of (dist(u, a) + best[a]), where best[a] is the nearest red vertex to a inside a’s component. Painting v updates best[a] = min(best[a], dist(v, a)) for its O(log n) ancestors.',
    'সেন্ট্রয়েড-গাছে প্রতিটি পথ u → v সেই সেন্ট্রয়েড c দিয়ে যায় যা তাদের প্রথম আলাদা করে, আর তা উভয়েরই সেন্ট্রয়েড পূর্বপুরুষ। তাই দূরত্ব(u, নিকটতম লাল) = u-র সব সেন্ট্রয়েড পূর্বপুরুষ a-র ওপর (দূরত্ব(u, a) + best[a])-র ন্যূনতম, যেখানে best[a] হলো a-র কম্পোনেন্টে a-র নিকটতম লাল শীর্ষ। v রং করলে তার O(log n) পূর্বপুরুষে best[a] = min(best[a], দূরত্ব(v, a))।',
  ),
  approach: [
    L('Build the centroid tree; for every centroid store the BFS distance from it to each vertex of its component, one array per level.', 'সেন্ট্রয়েড-গাছ বানাও; প্রতিটি সেন্ট্রয়েডের জন্য তার কম্পোনেন্টের প্রতিটি শীর্ষের BFS দূরত্ব রাখো, প্রতি স্তরে একটি অ্যারে।'),
    L('Paint v: walk up the centroid ancestors updating best[a].', 'v রং: সেন্ট্রয়েড পূর্বপুরুষ বেয়ে ওঠো আর best[a] হালনাগাদ করো।'),
    L('Query v: walk up the same chain and take the minimum of dist + best.', 'কোয়েরি v: একই শৃঙ্খল বেয়ে ওঠো আর দূরত্ব + best-এর ন্যূনতম নাও।'),
  ],
  walkthrough: {
    input: 'path 1–2–3 and query vertex 3 after painting 1',
    steps: [
      { state: 'centroid tree: 2 → {1, 3}', text: L('Vertex 2 is the centroid and the parent of the other two.', 'শীর্ষ ২ সেন্ট্রয়েড আর অন্য দুটির পিতা।') },
      { state: 'paint 1: best[1] = 0, best[2] = 1', text: L('Distances 0 to itself and 1 to the centroid.', 'নিজের থেকে ০ আর সেন্ট্রয়েড থেকে ১।') },
      { state: 'query 3: min(0 + INF, 1 + best[2] = 2)', text: L('Answer 2.', 'উত্তর ২।') },
    ],
  },
  complexity: { time: 'O((n + m) log n)', space: 'O(n log n)', why: L('Building is O(n log n); each paint and each query touches one chain of at most log n centroids.', 'বানানো O(n log n); প্রতিটি রং আর কোয়েরি সর্বোচ্চ log n সেন্ট্রয়েডের একটি শৃঙ্খল ছোঁয়।') },
  solutions: [
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Centroid decomposition as a data structure', 'ডেটা স্ট্রাকচার হিসেবে সেন্ট্রয়েড ডিকম্পোজিশন'),
      idea: L('best[c] = nearest red vertex inside c’s component, answered via the chain of ancestors.', 'best[c] = c-র কম্পোনেন্টে নিকটতম লাল শীর্ষ, পূর্বপুরুষ শৃঙ্খলে উত্তর।'),
      explain: [L('During the iterative decomposition each centroid runs a BFS inside its component, filling dist[level][x]. Each vertex’s own level is that of the centroid it eventually becomes, so lev[a] indexes the right row when walking up from any v.', 'ইটারেটিভ ডিকম্পোজিশনের সময় প্রতিটি সেন্ট্রয়েড তার কম্পোনেন্টে BFS চালিয়ে dist[স্তর][x] ভরে। যেকোনো v থেকে ওপরে ওঠার সময় lev[a] সঠিক সারি দেখায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    vector<int> sz(n + 1), pr(n + 1), cpar(n + 1, 0), lev(n + 1, 0), best(n + 1, INF);
    vector<vector<int>> dist(18, vector<int>(n + 1, 0));
    vector<char> dead(n + 1, 0);
    struct Job { int s, par, lv; };
    vector<Job> stk = {{1, 0, 0}};
    vector<int> order;
    while (!stk.empty()) {
        Job j = stk.back();
        stk.pop_back();
        order.assign(1, j.s);
        pr[j.s] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (int w : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = j.s;
        for (int v : order) {
            int mx = tot - sz[v];
            for (int w : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        cpar[c] = j.par, lev[c] = j.lv;
        // BFS from the centroid inside its component
        vector<int> q = {c};
        vector<int>& d = dist[j.lv];
        d[c] = 0;
        pr[c] = 0;
        for (size_t i = 0; i < q.size(); i++)
            for (int w : g[q[i]])
                if (!dead[w] && w != pr[q[i]]) pr[w] = q[i], d[w] = d[q[i]] + 1, q.push_back(w);
        dead[c] = 1;
        for (int w : g[c])
            if (!dead[w]) stk.push_back({w, c, j.lv + 1});
    }
    auto paint = [&](int v) {
        for (int a = v; a; a = cpar[a]) best[a] = min(best[a], dist[lev[a]][v]);
    };
    auto query = [&](int v) {
        int r = INF;
        for (int a = v; a; a = cpar[a])
            if (best[a] < INF) r = min(r, best[a] + dist[lev[a]][v]);
        return r;
    };
    paint(1);
    while (m--) {
        int t, v;
        scanf("%d %d", &t, &v);
        if (t == 1) paint(v);
        else printf("%d\n", query(v));
    }
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n log n)',
      accepted: true,
      toolkit: ['vector', 'lambda'],
    },
    {
      id: 'sqrt',
      kind: 'better',
      title: L('Rebuild every √n paints', 'প্রতি √n রংয়ে পুনর্নির্মাণ'),
      idea: L('Keep a BFS distance array for the old reds and a small buffer for the new ones.', 'পুরোনো লালদের জন্য BFS দূরত্ব-অ্যারে আর নতুনদের জন্য ছোট বাফার রাখো।'),
      explain: [L('A query is min(old array, distance to each buffered red). Distances use an Euler-tour sparse table for O(1) LCA. When the buffer reaches B vertices, run one multi-source BFS and empty it. With B ≈ 300 the total is about (m / B)·n + m·B ≈ 7·10⁷ steps.', 'কোয়েরি = min(পুরোনো অ্যারে, প্রতিটি বাফার-লালের দূরত্ব)। দূরত্ব বের করতে Euler-tour স্পার্স টেবিলে O(১) LCA। বাফার B শীর্ষে পৌঁছালে একটি মাল্টি-সোর্স BFS চালিয়ে বাফার খালি করো। B ≈ ৩০০-তে মোট প্রায় (m / B)·n + m·B ≈ ৭·১০⁷ ধাপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    // iterative Euler tour of depths
    vector<int> dep(n + 1, 0), first(n + 1, 0), par(n + 1, 0), it(n + 1, 0), eul;
    vector<int> st = {1};
    first[1] = 0;
    eul.push_back(0);
    while (!st.empty()) {
        int v = st.back();
        if (it[v] < (int)g[v].size()) {
            int w = g[v][it[v]++];
            if (w == par[v]) continue;
            par[w] = v, dep[w] = dep[v] + 1;
            first[w] = eul.size(), eul.push_back(dep[w]);
            st.push_back(w);
        } else {
            st.pop_back();
            if (!st.empty()) eul.push_back(dep[st.back()]);
        }
    }
    int E = eul.size(), LG = 1;
    while ((1 << LG) <= E) LG++;
    vector<vector<int>> sp(LG, vector<int>(E));
    sp[0] = eul;
    for (int j = 1; j < LG; j++)
        for (int i = 0; i + (1 << j) <= E; i++) sp[j][i] = min(sp[j - 1][i], sp[j - 1][i + (1 << (j - 1))]);
    auto dist = [&](int u, int v) {
        int l = first[u], r = first[v];
        if (l > r) swap(l, r);
        int k = 31 - __builtin_clz(r - l + 1);
        return dep[u] + dep[v] - 2 * min(sp[k][l], sp[k][r - (1 << k) + 1]);
    };
    vector<int> reds = {1}, buf, d(n + 1);
    auto rebuild = [&]() {
        fill(d.begin(), d.end(), -1);
        vector<int> q;
        for (int r : reds) d[r] = 0, q.push_back(r);
        for (size_t i = 0; i < q.size(); i++)
            for (int w : g[q[i]])
                if (d[w] < 0) d[w] = d[q[i]] + 1, q.push_back(w);
        buf.clear();
    };
    rebuild();
    const int B = 300;
    while (m--) {
        int t, v;
        scanf("%d %d", &t, &v);
        if (t == 1) {
            reds.push_back(v), buf.push_back(v);
            if ((int)buf.size() >= B) rebuild();
        } else {
            int r = d[v];
            for (int b : buf) r = min(r, dist(v, b));
            printf("%d\n", r);
        }
    }
    return 0;
}
`,
      time: 'O(n·m / B + m·B)',
      space: 'O(n log n)',
      accepted: true,
      toolkit: ['vector', 'lambda', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Multi-source BFS per query', 'প্রতি কোয়েরিতে মাল্টি-সোর্স BFS'),
      idea: L('Keep the list of reds; on a query BFS from all of them.', 'লালদের তালিকা রাখো; কোয়েরিতে সবার থেকে BFS।'),
      explain: [L('O(n) per query: the definition, and the reference for the data-structure versions.', 'প্রতি কোয়েরিতে O(n): সংজ্ঞাই, ডেটা-স্ট্রাকচার সংস্করণের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    vector<char> red(n + 1, 0);
    red[1] = 1;
    while (m--) {
        int t, v;
        scanf("%d %d", &t, &v);
        if (t == 1) red[v] = 1;
        else {
            vector<int> d(n + 1, -1), q;
            for (int i = 1; i <= n; i++)
                if (red[i]) d[i] = 0, q.push_back(i);
            for (size_t i = 0; i < q.size(); i++)
                for (int w : g[q[i]])
                    if (d[w] < 0) d[w] = d[q[i]] + 1, q.push_back(w);
            printf("%d\n", d[v]);
        }
    }
    return 0;
}
`,
      time: 'O(n·m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'stack-queue'],
    },
  ],
  tests: [
    { input: '5 4\n1 2\n2 3\n2 4\n4 5\n2 1\n2 5\n1 2\n2 5', output: '0\n3\n2', source: 'sample', note: sample(1) },
    { input: '2 3\n1 2\n2 2\n1 2\n2 2', output: '1\n0', source: 'own', note: L('Two vertices: first distance 1, after painting 2 it is 0.', 'দুটি শীর্ষ: প্রথমে দূরত্ব ১, ২ রং করলে ০।') },
  ],
  pitfalls: [
    L('Painting the same vertex twice: harmless for min, but a BFS that expects a fresh vertex can double-count.', 'একই শীর্ষ দুবার রং করা: min-এ ক্ষতিহীন, কিন্তু নতুন শীর্ষ আশা করা BFS দুবার গুনতে পারে।'),
    L('Forgetting that vertex 1 starts red.', 'শীর্ষ ১ লাল দিয়ে শুরু, তা ভুলে যাওয়া।'),
    L('Using dist(u, a) + best[a] when best[a] is still infinite: adding to INF overflows 32-bit signed integers.', 'best[a] অসীম থাকতে dist(u, a) + best[a]: INF-এ যোগ ৩২-বিট সাইনড পূর্ণসংখ্যা উপচে দেয়।'),
  ],
  related: [
    { id: '161D', name: 'Distance in Tree', why: L('The same centroid tree, counting instead of storing a minimum.', 'একই সেন্ট্রয়েড-গাছ, ন্যূনতম রাখার বদলে গণনা।') },
    { id: '321C', name: 'Ciel the Commander', why: L('Using the centroid tree’s shape directly as the answer.', 'সেন্ট্রয়েড-গাছের আকারই সরাসরি উত্তর হিসেবে।') },
  ],
  toolkit: ['vector', 'lambda'],
};

// ───────────────────────────────────────────── 914E
export const p914E: ProblemEntry = {
  id: '914E',
  contestId: 914,
  index: 'E',
  name: 'Palindromes in a Tree',
  rating: 2400,
  tags: ['data-structures', 'divide-and-conquer', 'trees'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'A path can be rearranged into a palindrome exactly when at most one letter occurs an odd number of times — a bitmask with popcount ≤ 1. Centroid decomposition turns “count such paths through every vertex” into XOR masks and a 2²⁰ counting table.',
    'একটি পথ ঠিক তখনই পুনর্বিন্যস্ত হয়ে প্যালিনড্রোম হয় যখন সর্বোচ্চ একটি অক্ষর বিজোড়বার আসে — popcount ≤ ১-এর একটি বিটমাস্ক। সেন্ট্রয়েড ডিকম্পোজিশন “প্রতিটি শীর্ষ দিয়ে এমন পথ গোনা”-কে XOR মাস্ক আর ২²⁰ গণনা-সারণিতে নামায়।',
  ),
  statement: L(
    'A tree of n vertices, each carrying a letter from a to t. A path is “good” if its letters can be rearranged into a palindrome. For every vertex print the number of good paths (including single-vertex paths) that pass through it.',
    'n শীর্ষের গাছ, প্রতিটিতে a থেকে t-র একটি অক্ষর। একটি পথ “ভালো” যদি তার অক্ষরগুলো পুনর্বিন্যস্ত করে প্যালিনড্রোম বানানো যায়। প্রতিটি শীর্ষের জন্য তার ওপর দিয়ে যাওয়া ভালো পথের (একক-শীর্ষ পথসহ) সংখ্যা প্রিন্ট করো।',
  ),
  input: L('n, the n − 1 edges, then a string of n letters.', 'n, n − ১ টি কিনারা, তারপর n অক্ষরের একটি স্ট্রিং।'),
  output: L('n integers.', 'n টি পূর্ণসংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 512, notes: [L('1 ≤ n ≤ 2·10⁵, letters a–t', '১ ≤ n ≤ ২·১০⁵, অক্ষর a–t')] },
  samples: [
    { input: '5\n1 2\n2 3\n3 4\n3 5\nabcbb', output: '1 3 4 3 3', explain: L('Vertex 1 is only on its own path; vertex 3 is on four good paths.', 'শীর্ষ ১ শুধু নিজের পথে; শীর্ষ ৩ চারটি ভালো পথে।') },
  ],
  observation: L(
    'With m(x) the XOR of the letter bits from the centroid c to x (c included), the path x … c … z has mask m(x) ⊕ m(z) ⊕ bit(c). It is good iff that mask is 0 or a single bit, so for each x there are 21 masks to look up in a table. The number of good paths through a vertex y ≠ c equals the sum, over the vertices x in y’s subtree (rooted at c), of f(x) = the number of partners of x through c — each path through y has exactly one endpoint below y.',
    'm(x) = কেন্দ্র c থেকে x পর্যন্ত (c সহ) অক্ষর-বিটের XOR ধরলে পথ x … c … z-র মাস্ক m(x) ⊕ m(z) ⊕ bit(c)। এটি ০ বা একটিমাত্র বিট হলেই পথ ভালো, তাই প্রতিটি x-এর জন্য সারণিতে ২১টি মাস্ক খুঁজতে হয়। y ≠ c দিয়ে যাওয়া ভালো পথের সংখ্যা = y-র উপগাছের (c-কে রুট ধরে) প্রতিটি x-এর f(x)-র যোগফল, যেখানে f(x) = c দিয়ে x-এর সঙ্গী সংখ্যা — y দিয়ে যাওয়া প্রতিটি পথের ঠিক একটি প্রান্ত y-র নিচে।',
  ),
  approach: [
    L('Every vertex starts with 1 for its own single-vertex path.', 'প্রতিটি শীর্ষ নিজের একক-শীর্ষ পথের জন্য ১ দিয়ে শুরু করে।'),
    L('At each centroid c: BFS each child subtree, compute masks, put all masks in a global table; for every subtree remove its own masks, compute f(x) by looking up 21 masks, put them back.', 'প্রতিটি সেন্ট্রয়েড c-তে: প্রতিটি সন্তান-উপগাছে BFS, মাস্ক হিসাব, সব মাস্ক গ্লোবাল সারণিতে; প্রতিটি উপগাছের নিজের মাস্ক সরিয়ে ২১টি মাস্ক খুঁজে f(x) বের করো, আবার ঢোকাও।'),
    L('Accumulate f upward inside the subtree to add the path counts to each vertex; add (Σ f + g) / 2 to c where g counts the vertices whose path to c is good.', 'উপগাছের ভেতরে f ওপরে জমা করে প্রতিটি শীর্ষে পথসংখ্যা যোগ করো; c-তে (Σ f + g) / ২ যোগ করো, g = যেসব শীর্ষ থেকে c পর্যন্ত পথ ভালো।'),
  ],
  walkthrough: {
    input: 'a path a – b – a',
    steps: [
      { state: 'good paths: [a], [b], [a], [a b a]', text: L('Single vertices and the whole path (counts a:2, b:1 → one odd letter). Pairs a-b are not good.', 'একক শীর্ষ আর পুরো পথ (a:২, b:১ → একটি বিজোড় অক্ষর)। জোড়া a-b ভালো নয়।') },
      { state: 'answers: 2, 2, 2', text: L('The ends lie on [a] and the full path; the middle on [b] and the full path.', 'প্রান্ত দুটি [a] আর পুরো পথে; মাঝেরটি [b] আর পুরো পথে।') },
    ],
  },
  complexity: { time: 'O(n log n · 21)', space: 'O(n + 2²⁰)', why: L('Each vertex is processed once per level with 21 table lookups.', 'প্রতিটি শীর্ষ প্রতি স্তরে একবার, ২১টি সারণি-খোঁজসহ।') },
  solutions: [
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Centroid decomposition with a mask table', 'মাস্ক সারণিসহ সেন্ট্রয়েড ডিকম্পোজিশন'),
      idea: L('Count partners f(x) per vertex, then sum f over each subtree.', 'প্রতিটি শীর্ষের সঙ্গী f(x) গুনে প্রতিটি উপগাছে f যোগ করো।'),
      explain: [L('Removing a subtree’s own masks before querying stops two vertices of the same child subtree from pairing (their path does not go through c). The table is cleared by decrementing exactly what was added, so there is no 2²⁰ memset per centroid.', 'কোয়েরির আগে উপগাছের নিজের মাস্ক সরালে একই সন্তান-উপগাছের দুই শীর্ষ জোড়া বাঁধে না (তাদের পথ c দিয়ে যায় না)। যা যোগ হয়েছিল ঠিক তাই বিয়োগ করে সারণি পরিষ্কার হয়, তাই প্রতি সেন্ট্রয়েডে ২²⁰ memset নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

static int cnt[1 << 20];

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    static char s[200005];
    scanf("%s", s);
    vector<int> bit(n + 1);
    for (int i = 1; i <= n; i++) bit[i] = 1 << (s[i - 1] - 'a');
    vector<ll> res(n + 1, 1);
    vector<int> sz(n + 1), pr(n + 1), mask(n + 1);
    vector<ll> acc(n + 1);
    vector<char> dead(n + 1, 0);
    vector<int> stk = {1}, order;
    while (!stk.empty()) {
        int s0 = stk.back();
        stk.pop_back();
        order.assign(1, s0);
        pr[s0] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (int w : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = s0;
        for (int v : order) {
            int mx = tot - sz[v];
            for (int w : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        // groups: one BFS list per child subtree
        vector<vector<int>> groups;
        mask[c] = bit[c];
        cnt[mask[c]]++;
        for (int w : g[c]) {
            if (dead[w]) continue;
            vector<int> lst = {w};
            pr[w] = c;
            mask[w] = bit[c] ^ bit[w];
            for (size_t i = 0; i < lst.size(); i++)
                for (int x : g[lst[i]])
                    if (!dead[x] && x != pr[lst[i]]) pr[x] = lst[i], mask[x] = mask[lst[i]] ^ bit[x], lst.push_back(x);
            for (int x : lst) cnt[mask[x]]++;
            groups.push_back(lst);
        }
        ll sumF = 0, gcount = 0;
        for (auto& lst : groups) {
            for (int x : lst) cnt[mask[x]]--;
            for (int x : lst) {
                int q0 = mask[x] ^ bit[c];
                ll f = cnt[q0];
                for (int t = 0; t < 20; t++) f += cnt[q0 ^ (1 << t)];
                acc[x] = f;
                sumF += f;
                if (__builtin_popcount(mask[x]) <= 1) gcount++;
            }
            for (int x : lst) cnt[mask[x]]++;
            for (int i = (int)lst.size() - 1; i >= 0; i--) {
                int x = lst[i];
                res[x] += acc[x];
                if (pr[x] != c) acc[pr[x]] += acc[x];
            }
        }
        res[c] += (sumF + gcount) / 2;
        cnt[mask[c]]--;
        for (auto& lst : groups)
            for (int x : lst) cnt[mask[x]]--;
        dead[c] = 1;
        for (int w : g[c])
            if (!dead[w]) stk.push_back(w);
    }
    for (int i = 1; i <= n; i++) printf("%lld%c", res[i], i == n ? '\n' : ' ');
    return 0;
}
`,
      time: 'O(21 · n log n)',
      space: 'O(n + 2²⁰)',
      accepted: true,
      toolkit: ['vector', 'bitwise-and', 'popcount', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every path', 'প্রতিটি পথ পরীক্ষা'),
      idea: L('For every pair u ≤ v walk the path, test the mask, add 1 to every vertex on it.', 'প্রতিটি জোড়া u ≤ v-র জন্য পথ হেঁটে মাস্ক পরীক্ষা করো, পথের প্রতিটি শীর্ষে ১ যোগ।'),
      explain: [L('O(n³) in the worst case: the statement as written. Used for stress testing.', 'সবচেয়ে খারাপ ক্ষেত্রে O(n³): প্রবলেম-বিবরণ যেমন লেখা। স্ট্রেস টেস্টের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    char s[64];
    scanf("%s", s);
    vector<ll> res(n + 1, 0);
    for (int u = 1; u <= n; u++) {
        vector<int> par(n + 1, -1), q = {u};
        par[u] = 0;
        for (size_t h = 0; h < q.size(); h++)
            for (int w : g[q[h]])
                if (par[w] < 0) par[w] = q[h], q.push_back(w);
        for (int v = u; v <= n; v++) {
            int mask = 0;
            for (int x = v; x != 0; x = par[x]) mask ^= 1 << (s[x - 1] - 'a');
            if (__builtin_popcount(mask) > 1) continue;
            for (int x = v; x != 0; x = par[x]) res[x]++;
        }
    }
    for (int i = 1; i <= n; i++) printf("%lld%c", res[i], i == n ? '\n' : ' ');
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'popcount'],
    },
  ],
  tests: [
    { input: '5\n1 2\n2 3\n3 4\n3 5\nabcbb', output: '1 3 4 3 3', source: 'sample', note: sample(1) },
    { input: '1\na', output: '1', source: 'own', note: L('A single vertex: only its own path.', 'একটিমাত্র শীর্ষ: শুধু নিজের পথ।') },
    { input: '3\n1 2\n2 3\naba', output: '2 2 2', source: 'own', note: L('The walkthrough case.', 'walkthrough-র কেস।') },
  ],
  pitfalls: [
    L('Pairing two vertices of the same child subtree: their path avoids the centroid. Remove the subtree’s own masks before querying.', 'একই সন্তান-উপগাছের দুই শীর্ষ জোড়া বাঁধা: তাদের পথ সেন্ট্রয়েড এড়ায়। কোয়েরির আগে উপগাছের নিজের মাস্ক সরাও।'),
    L('Counting a path twice: (x, z) is found from both x and z. Halve the total for the centroid, but not for the subtree sums.', 'একই পথ দুবার গোনা: (x, z) x আর z উভয় থেকে পাওয়া যায়। সেন্ট্রয়েডের মোট অর্ধেক করো, কিন্তু উপগাছের যোগফলে নয়।'),
    L('Forgetting that single-vertex paths count: every answer includes at least 1.', 'একক-শীর্ষ পথ গোনা ভুলে যাওয়া: প্রতিটি উত্তরে অন্তত ১।'),
  ],
  related: [
    { id: '161D', name: 'Distance in Tree', why: L('The same decomposition with depths instead of masks.', 'একই ডিকম্পোজিশন, মাস্কের বদলে গভীরতা।') },
    { id: '342E', name: 'Xenia and Tree', why: L('Centroid ancestors used as a data structure.', 'সেন্ট্রয়েড পূর্বপুরুষ ডেটা স্ট্রাকচার হিসেবে।') },
  ],
  toolkit: ['bitwise-and', 'popcount', 'vector'],
};
