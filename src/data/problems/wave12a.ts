import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

const dsuCode = raw`vector<int> par, sz;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }
bool unite(int a, int b) {
    a = find(a), b = find(b);
    if (a == b) return false;
    if (sz[a] < sz[b]) swap(a, b);
    par[b] = a;
    sz[a] += sz[b];
    return true;
}`;

export const p1609D: ProblemEntry = {
  id: '1609D',
  contestId: 1609,
  index: 'D',
  name: 'Social Network',
  rating: 1600,
  tags: ['dsu', 'graphs', 'greedy', 'implementation', 'trees'],
  featuredFor: ['dsu'],
  why: L('Edges that land inside one component are “free”: each can instead glue on another whole component.', 'যেসব প্রান্ত এক উপাদানের ভেতরে পড়ে সেগুলো “বিনামূল্যে”: প্রতিটি বরং আরেকটি পুরো উপাদান জুড়ে দিতে পারে।'),
  statement: L(
    'n people, no acquaintances yet. There are d conditions: condition i says xᵢ and yᵢ must be connected. For each i, consider making exactly i introductions so that conditions 1 … i all hold; maximise the largest number of people one person is connected to (component size − 1). Each i is answered independently.',
    'n-জন মানুষ, এখনও কোনো পরিচয় নেই। d-টি শর্ত আছে: শর্ত i বলে xᵢ আর yᵢ সংযুক্ত হতে হবে। প্রতিটি i-এর জন্য ঠিক i-টি পরিচয় করানো ধরুন যাতে শর্ত ১ … i সব মানে; একজন মানুষ সর্বোচ্চ কতজনের সঙ্গে সংযুক্ত (উপাদানের আকার − ১) তা সর্বোচ্চ করুন। প্রতিটি i আলাদাভাবে উত্তর দেওয়া হয়।',
  ),
  input: L('n d, then d pairs.', 'n d, তারপর d-টি জোড়া।'),
  output: L('d answers.', 'd-টি উত্তর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10³, d < n', 'n ≤ ১০³, d < n')] },
  samples: [{ input: '7 6\n1 2\n3 4\n2 4\n7 6\n6 5\n1 7', output: '1\n1\n3\n3\n3\n6', explain: L('After 6 conditions all 7 people can be in one component: 6.', '৬টি শর্তের পরে ৭ জনই এক উপাদানে থাকতে পারে: ৬।') }],
  observation: L('Process conditions with a DSU. A condition whose endpoints are already connected costs no edge, so it becomes a spare introduction. With s spares, glue the s + 1 largest components together: answer = sum of the s + 1 largest sizes − 1.', 'DSU দিয়ে শর্তগুলো প্রক্রিয়া করুন। যে শর্তের প্রান্ত আগেই সংযুক্ত তা কোনো প্রান্ত খরচ করে না, তাই এটি একটি বাড়তি পরিচয় হয়। s-টি বাড়তি থাকলে সবচেয়ে বড় s + ১টি উপাদান জুড়ুন: উত্তর = সবচেয়ে বড় s + ১টি আকারের যোগফল − ১।'),
  approach: [L('After each condition, collect root sizes, sort descending, sum the top spares + 1.', 'প্রতিটি শর্তের পরে মূলের আকার জড়ো করে বড় থেকে সর্ট, সেরা বাড়তি + ১টি যোগ।')],
  walkthrough: { input: 'after 3 conditions', steps: [{ state: '{1, 2, 3, 4} and singletons; 0 spares', text: L('Largest = 4 → 3.', 'সবচেয়ে বড় = ৪ → ৩।') }] },
  complexity: { time: 'O(d · n log n)', space: 'O(n)', why: L('A sort after each condition.', 'প্রতিটি শর্তের পরে একটি সর্ট।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('DSU + spare edges', 'DSU + বাড়তি প্রান্ত'),
      idea: L('Spare = condition inside one component.', 'বাড়তি = এক উপাদানের ভেতরের শর্ত।'),
      explain: [L('Any spanning structure works, so only component sizes and the spare count matter — the DSU tracks both.', 'যেকোনো স্প্যানিং কাঠামো চলে, তাই শুধু উপাদানের আকার আর বাড়তির সংখ্যা গুরুত্বপূর্ণ — DSU দুটিই রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${dsuCode}

int main() {
    int n, d;
    cin >> n >> d;
    par.resize(n + 1);
    sz.assign(n + 1, 1);
    iota(par.begin(), par.end(), 0);
    int spare = 0;
    for (int i = 0; i < d; i++) {
        int x, y;
        cin >> x >> y;
        if (!unite(x, y)) spare++;
        vector<int> sizes;
        for (int v = 1; v <= n; v++) if (find(v) == v) sizes.push_back(sz[v]);
        sort(sizes.rbegin(), sizes.rend());
        int total = 0;
        for (int k = 0; k <= spare && k < (int)sizes.size(); k++) total += sizes[k];
        cout << total - 1 << "\n";
    }
    return 0;
}
`,
      time: 'O(d · n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'sort'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of i introductions', 'i-টি পরিচয়ের প্রতিটি সেট চেষ্টা'),
      idea: L('For tiny n, enumerate edge sets of size i and keep those satisfying the conditions.', 'ক্ষুদ্র n-এ i আকারের প্রান্তের সেট গণনা করে শর্ত মানে এমনগুলো রাখা।'),
      explain: [L('It reads the statement literally and makes no claim about spare edges, so agreement is real evidence.', 'এটি স্টেটমেন্ট আক্ষরিকভাবে পড়ে আর বাড়তি প্রান্ত নিয়ে কোনো দাবি করে না, তাই মিলে যাওয়া আসল প্রমাণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, d;
    cin >> n >> d;
    vector<pair<int, int>> cond(d), all;
    for (auto& [x, y] : cond) cin >> x >> y;
    for (int a = 1; a <= n; a++) for (int b = a + 1; b <= n; b++) all.push_back({a, b});
    int E = all.size();
    if (E > 15) { cout << "\n"; return 0; }
    for (int i = 1; i <= d; i++) {
        int best = -1;
        for (int mask = 0; mask < (1 << E); mask++) {
            if (__builtin_popcount(mask) != i) continue;
            vector<int> p(n + 1);
            iota(p.begin(), p.end(), 0);
            function<int(int)> f = [&](int x) { return p[x] == x ? x : p[x] = f(p[x]); };
            for (int e = 0; e < E; e++) if (mask >> e & 1) p[f(all[e].first)] = f(all[e].second);
            bool ok = true;
            for (int j = 0; j < i; j++) if (f(cond[j].first) != f(cond[j].second)) ok = false;
            if (!ok) continue;
            map<int, int> cnt;
            for (int v = 1; v <= n; v++) cnt[f(v)]++;
            for (auto& [r, c] : cnt) best = max(best, c - 1);
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['bit-shift', 'lambda'],
    },
  ],
  tests: [{ input: '7 6\n1 2\n3 4\n2 4\n7 6\n6 5\n1 7', output: '1\n1\n3\n3\n3\n6', source: 'sample', note: sample(1) }],
  pitfalls: [L('Ignoring conditions that are already satisfied.', 'আগেই মানা শর্ত উপেক্ষা।')],
  related: [{ id: '217A', name: 'Ice Skating', why: L('Components with DSU.', 'DSU দিয়ে উপাদান।') }],
  toolkit: ['sort'],
};

export const p1213G: ProblemEntry = {
  id: '1213G',
  contestId: 1213,
  index: 'G',
  name: 'Path Queries',
  rating: 1800,
  tags: ['divide-and-conquer', 'dsu', 'graphs', 'sortings', 'trees'],
  why: L('Offline queries: sort edges and queries by weight, and add edges to a DSU while counting new pairs.', 'অফলাইন কোয়েরি: প্রান্ত আর কোয়েরি ওজন অনুযায়ী সর্ট করে, নতুন জোড়া গুনতে গুনতে DSU-তে প্রান্ত যোগ।'),
  statement: L('A weighted tree with n vertices and m queries qᵢ: count pairs u < v whose path has maximum edge weight ≤ qᵢ.', 'n শীর্ষের একটি ওজনযুক্ত ট্রি আর m-টি কোয়েরি qᵢ: এমন জোড়া u < v গুনুন যাদের পথের সর্বোচ্চ প্রান্তের ওজন ≤ qᵢ।'),
  input: L('n m, n − 1 weighted edges, then q₁ … qₘ.', 'n m, n − ১টি ওজনযুক্ত প্রান্ত, তারপর q₁ … qₘ।'),
  output: L('m answers.', 'm-টি উত্তর।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵', 'n, m ≤ ২·১০⁵')] },
  samples: [{ input: '7 5\n1 2 1\n3 2 3\n2 4 1\n4 5 2\n5 7 4\n3 6 2\n5 2 3 4 1', output: '21 7 15 21 3', explain: L('q = 1: only edges of weight 1 → component {1, 2, 4} gives 3 pairs.', 'q = ১: শুধু ওজন ১-এর প্রান্ত → উপাদান {১, ২, ৪} ৩টি জোড়া দেয়।') }],
  observation: L('Pairs with max edge ≤ q are exactly the pairs inside components of the graph that keeps only edges ≤ q. Adding edges in increasing weight, merging components of sizes a and b creates a · b new pairs.', 'সর্বোচ্চ প্রান্ত ≤ q এমন জোড়া ঠিক সেই গ্রাফের উপাদানের ভেতরের জোড়া যেখানে শুধু ≤ q প্রান্ত থাকে। বাড়তি ওজনে প্রান্ত যোগ করলে a আর b আকারের উপাদান মিললে a · b-টি নতুন জোড়া হয়।'),
  approach: [L('Sort edges; sort queries keeping indices; sweep.', 'প্রান্ত সর্ট; ইনডেক্স রেখে কোয়েরি সর্ট; সুইপ।')],
  walkthrough: { input: 'q = 2', steps: [{ state: 'edges ≤ 2 join {1, 2, 4, 5} and {3, 6}', text: L('6 + 1 = 7 pairs.', '৬ + ১ = ৭টি জোড়া।') }] },
  complexity: { time: 'O((n + m) log)', space: 'O(n + m)', why: L('Two sorts and a sweep.', 'দুটি সর্ট আর একটি সুইপ।') },
  solutions: [
    {
      id: 'offline',
      kind: 'optimal',
      title: L('Offline sweep with DSU', 'DSU-সহ অফলাইন সুইপ'),
      idea: L('Answer queries in increasing order of q.', 'q-এর বাড়তি ক্রমে কোয়েরির উত্তর।'),
      explain: [L('Answering queries in a convenient order and writing results back by index is the “offline” trick; a DSU can only add edges, so increasing q fits it perfectly.', 'সুবিধাজনক ক্রমে কোয়েরির উত্তর দিয়ে ইনডেক্স ধরে ফল ফেরত লেখা হলো “অফলাইন” কৌশল; DSU শুধু প্রান্ত যোগ করতে পারে, তাই বাড়তি q এর সঙ্গে নিখুঁত মেলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${dsuCode}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<array<int, 3>> e(n - 1);
    for (auto& [w, u, v] : e) scanf("%d %d %d", &u, &v, &w);
    sort(e.begin(), e.end());
    vector<pair<int, int>> q(m);
    for (int i = 0; i < m; i++) { scanf("%d", &q[i].first); q[i].second = i; }
    sort(q.begin(), q.end());
    par.resize(n + 1);
    sz.assign(n + 1, 1);
    iota(par.begin(), par.end(), 0);
    vector<long long> ans(m);
    long long pairs = 0;
    size_t k = 0;
    for (auto [lim, idx] : q) {
        while (k < e.size() && e[k][0] <= lim) {
            int a = find(e[k][1]), b = find(e[k][2]);
            pairs += (long long)sz[a] * sz[b];
            unite(a, b);
            k++;
        }
        ans[idx] = pairs;
    }
    for (long long x : ans) printf("%lld ", x);
    printf("\n");
    return 0;
}
`,
      time: 'O((n + m) log)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'long-long', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Rebuild components for every query', 'প্রতিটি কোয়েরিতে উপাদান আবার বানানো'),
      idea: L('Keep edges ≤ q, find components by DFS, add C(size, 2).', '≤ q প্রান্ত রেখে DFS দিয়ে উপাদান খুঁজে C(আকার, ২) যোগ।'),
      explain: [L('O(n · m): the direct method, fine for checking.', 'O(n · m): সরাসরি পদ্ধতি, যাচাইয়ে ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<array<int, 3>> e(n - 1);
    for (auto& [u, v, w] : e) cin >> u >> v >> w;
    while (m--) {
        int q;
        cin >> q;
        vector<vector<int>> adj(n + 1);
        for (auto [u, v, w] : e) if (w <= q) { adj[u].push_back(v); adj[v].push_back(u); }
        vector<bool> seen(n + 1, false);
        long long pairs = 0;
        for (int s = 1; s <= n; s++) {
            if (seen[s]) continue;
            long long c = 0;
            vector<int> st = {s};
            seen[s] = true;
            while (!st.empty()) {
                int v = st.back();
                st.pop_back();
                c++;
                for (int u : adj[v]) if (!seen[u]) { seen[u] = true; st.push_back(u); }
            }
            pairs += c * (c - 1) / 2;
        }
        cout << pairs << ' ';
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [{ input: '7 5\n1 2 1\n3 2 3\n2 4 1\n4 5 2\n5 7 4\n3 6 2\n5 2 3 4 1', output: '21 7 15 21 3', source: 'sample', note: sample(1) }],
  pitfalls: [L('Answering queries online with a fresh DSU each time.', 'প্রতিবার নতুন DSU দিয়ে অনলাইনে কোয়েরির উত্তর।'), L('int overflow in the pair count.', 'জোড়ার গণনায় int ওভারফ্লো।')],
  related: [{ id: '1609D', name: 'Social Network', why: L('Component sizes in a DSU.', 'DSU-তে উপাদানের আকার।') }],
  toolkit: ['sort'],
};

export const p1559D1: ProblemEntry = {
  id: '1559D1',
  contestId: 1559,
  index: 'D1',
  name: 'Mocha and Diana (Easy Version)',
  rating: 1400,
  tags: ['brute-force', 'constructive', 'dsu', 'graphs', 'greedy', 'trees'],
  why: L('Two DSUs at once: an edge may be added iff it joins different components in both forests.', 'একসঙ্গে দুটি DSU: একটি প্রান্ত যোগ করা যায় ঠিক তখনই যখন এটি দুটি বনেই আলাদা উপাদান যুক্ত করে।'),
  statement: L('Two forests on the same n vertices. Add as many edges as possible, the same edges to both, so that both stay forests. Print the edges.', 'একই n শীর্ষের ওপর দুটি বন। যত বেশি সম্ভব প্রান্ত যোগ করুন, দুটিতে একই প্রান্ত, যাতে দুটিই বন থাকে। প্রান্তগুলো প্রিন্ট করুন।'),
  input: L('n m₁ m₂, then the edges of each forest.', 'n m₁ m₂, তারপর প্রতিটি বনের প্রান্ত।'),
  output: L('The number of edges, then the edges.', 'প্রান্তের সংখ্যা, তারপর প্রান্তগুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 1000', 'n ≤ ১০০০'), anyAnswer] },
  samples: [
    { input: '3 2 2\n1 2\n2 3\n1 2\n1 3', output: '0', explain: L('Both forests are already trees.', 'দুটি বনই আগে থেকে ট্রি।') },
    { input: '5 3 2\n5 4\n2 1\n4 3\n4 3\n1 4', output: '1\n2 4', explain: L('2–4 joins different components in both.', '২–৪ দুটিতেই আলাদা উপাদান যুক্ত করে।') },
  ],
  observation: L('Try every pair (i, j): if i and j are in different components of both forests, add the edge and union in both. Greedy is optimal here because the maximum count is fixed: adding a valid edge never blocks more than it enables (the final forests are as merged as possible).', 'প্রতিটি জোড়া (i, j) চেষ্টা করুন: i আর j দুটি বনেই আলাদা উপাদানে থাকলে প্রান্ত যোগ করে দুটিতে ইউনিয়ন। এখানে গ্রিডি সেরা কারণ সর্বোচ্চ সংখ্যা নির্দিষ্ট: একটি বৈধ প্রান্ত যোগ যত সক্ষম করে তার বেশি কখনো আটকায় না।'),
  approach: [L('O(n²) pairs × α.', 'O(n²) জোড়া × α।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'pair (1, 2): same in forest 1', text: L('Skip; (2, 4): different in both → add.', 'বাদ; (২, ৪): দুটিতেই আলাদা → যোগ।') }] },
  complexity: { time: 'O(n² α)', space: 'O(n)', why: L('All pairs.', 'সব জোড়া।') },
  solutions: [
    {
      id: 'two-dsu',
      kind: 'optimal',
      title: L('Two DSUs, all pairs', 'দুটি DSU, সব জোড়া'),
      idea: L('Add (i, j) when both DSUs say “different”.', 'দুটি DSU “আলাদা” বললে (i, j) যোগ।'),
      explain: [L('A DSU tells in near-O(1) whether an edge would close a cycle, which is exactly “stays a forest”.', 'একটি DSU প্রায় O(১)-এ বলে একটি প্রান্ত চক্র বন্ধ করবে কি না, যা ঠিক “বন থাকে”।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> p;
    DSU(int n) : p(n + 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }
    void unite(int a, int b) { p[find(a)] = find(b); }
};

int main() {
    int n, m1, m2;
    cin >> n >> m1 >> m2;
    DSU A(n), B(n);
    for (int i = 0; i < m1; i++) { int u, v; cin >> u >> v; A.unite(u, v); }
    for (int i = 0; i < m2; i++) { int u, v; cin >> u >> v; B.unite(u, v); }
    vector<pair<int, int>> added;
    for (int i = 1; i <= n; i++)
        for (int j = i + 1; j <= n; j++)
            if (A.find(i) != A.find(j) && B.find(i) != B.find(j)) {
                A.unite(i, j);
                B.unite(i, j);
                added.push_back({i, j});
            }
    cout << added.size() << "\n";
    for (auto [u, v] : added) cout << u << " " << v << "\n";
    return 0;
}
`,
      time: 'O(n² α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'pair'],
    },
    {
      id: 'reverse',
      kind: 'alt',
      title: L('Same greedy in another order', 'অন্য ক্রমে একই গ্রিডি'),
      idea: L('Scan pairs from the largest vertex down.', 'সবচেয়ে বড় শীর্ষ থেকে নিচে জোড়া স্ক্যান।'),
      explain: [L('Any order of trying edges reaches the same maximum count: both forests end up with the same number of edges regardless of order. The checker accepts any valid set.', 'প্রান্ত চেষ্টার যেকোনো ক্রম একই সর্বোচ্চ সংখ্যায় পৌঁছায়: ক্রম যা-ই হোক দুটি বনেই একই সংখ্যক প্রান্ত হয়। চেকার যেকোনো বৈধ সেট গ্রহণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> pa, pb;
int fa(int x) { return pa[x] == x ? x : pa[x] = fa(pa[x]); }
int fb(int x) { return pb[x] == x ? x : pb[x] = fb(pb[x]); }

int main() {
    int n, m1, m2;
    cin >> n >> m1 >> m2;
    pa.resize(n + 1);
    pb.resize(n + 1);
    iota(pa.begin(), pa.end(), 0);
    iota(pb.begin(), pb.end(), 0);
    for (int i = 0; i < m1; i++) { int u, v; cin >> u >> v; pa[fa(u)] = fa(v); }
    for (int i = 0; i < m2; i++) { int u, v; cin >> u >> v; pb[fb(u)] = fb(v); }
    vector<pair<int, int>> added;
    for (int i = n; i >= 1; i--)
        for (int j = i - 1; j >= 1; j--)
            if (fa(i) != fa(j) && fb(i) != fb(j)) {
                pa[fa(i)] = fa(j);
                pb[fb(i)] = fb(j);
                added.push_back({i, j});
            }
    cout << added.size() << "\n";
    for (auto [u, v] : added) cout << u << " " << v << "\n";
    return 0;
}
`,
      time: 'O(n² α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3 2 2\n1 2\n2 3\n1 2\n1 3', output: '0', source: 'sample', note: sample(1) },
    { input: '5 3 2\n5 4\n2 1\n4 3\n4 3\n1 4', output: '1\n2 4', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Checking only one forest.', 'শুধু একটি বন যাচাই।')],
  related: [{ id: '25D', name: 'Roads not only in Berland', why: L('Reconnecting forests.', 'বন আবার যুক্ত করা।') }],
  toolkit: ['functions'],
};

export const p25D: ProblemEntry = {
  id: '25D',
  contestId: 25,
  index: 'D',
  name: 'Roads not only in Berland',
  rating: 1900,
  tags: ['dsu', 'graphs', 'trees'],
  why: L('Every edge that closes a cycle is redundant; each one can be moved to join two components.', 'চক্র বন্ধ করা প্রতিটি প্রান্ত অপ্রয়োজনীয়; প্রতিটিকে দুটি উপাদান যুক্ত করতে সরানো যায়।'),
  statement: L('n cities and n − 1 roads. Each day you may close one road and build one new road. Make the network a tree in the minimum number of days; print the days as “closed i j, built u v”.', 'n-টি শহর আর n − ১টি রাস্তা। প্রতিদিন একটি রাস্তা বন্ধ করে একটি নতুন রাস্তা বানানো যায়। সর্বনিম্ন দিনে নেটওয়ার্ককে একটি ট্রি বানান; দিনগুলো “বন্ধ i j, বানানো u v” হিসেবে প্রিন্ট করুন।'),
  input: L('n, then n − 1 roads.', 'n, তারপর n − ১টি রাস্তা।'),
  output: L('The number of days, then i j u v per day.', 'দিনের সংখ্যা, তারপর প্রতিদিন i j u v।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 1000', 'n ≤ ১০০০'), anyAnswer] },
  samples: [
    { input: '2\n1 2', output: '0', explain: L('Already a tree.', 'আগেই একটি ট্রি।') },
    { input: '7\n1 2\n2 3\n3 1\n4 5\n5 6\n6 7', output: '1\n3 1 3 7', explain: L('Close 3–1, build 3–7.', '৩–১ বন্ধ, ৩–৭ বানানো।') },
  ],
  observation: L('With c components and n − 1 edges, exactly c − 1 edges close cycles. A DSU finds them as the edges joining already-connected vertices. Pair the k-th redundant edge with joining component representative 0 to representative k.', 'c-টি উপাদান আর n − ১টি প্রান্তে ঠিক c − ১টি প্রান্ত চক্র বন্ধ করে। DSU এগুলোকে আগেই সংযুক্ত শীর্ষ যুক্ত করা প্রান্ত হিসেবে খুঁজে পায়। k-তম অপ্রয়োজনীয় প্রান্তকে উপাদান প্রতিনিধি ০ থেকে প্রতিনিধি k যুক্ত করার সঙ্গে জোড়া দিন।'),
  approach: [L('DSU over edges, collect redundant edges and roots.', 'প্রান্তের ওপর DSU, অপ্রয়োজনীয় প্রান্ত আর মূল জড়ো।')],
  walkthrough: { input: 'sample 2', steps: [{ state: '3–1 redundant; roots {1}, {4}', text: L('Close 3 1, build 1 4 (any vertex of each).', '৩ ১ বন্ধ, ১ ৪ বানানো (প্রতিটির যেকোনো শীর্ষ)।') }] },
  complexity: { time: 'O(n α)', space: 'O(n)', why: L('One pass over edges.', 'প্রান্তগুলোর ওপর একবার।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Redundant edges ↔ missing links', 'অপ্রয়োজনীয় প্রান্ত ↔ অনুপস্থিত সংযোগ'),
      idea: L('Counts match: c − 1 of each.', 'গণনা মেলে: প্রতিটির c − ১।'),
      explain: [L('Removing a cycle edge keeps connectivity, so after all moves the graph has n − 1 edges and is connected: a tree. Fewer days is impossible since each day joins at most two components.', 'একটি চক্র প্রান্ত সরালে সংযুক্ততা থাকে, তাই সব পরিবর্তনের পরে গ্রাফে n − ১টি প্রান্ত আর এটি সংযুক্ত: একটি ট্রি। কম দিন অসম্ভব কারণ প্রতিদিন সর্বোচ্চ দুটি উপাদান যুক্ত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${dsuCode}

int main() {
    int n;
    cin >> n;
    par.resize(n + 1);
    sz.assign(n + 1, 1);
    iota(par.begin(), par.end(), 0);
    vector<pair<int, int>> extra;
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        if (!unite(a, b)) extra.push_back({a, b});
    }
    vector<int> roots;
    for (int v = 1; v <= n; v++) if (find(v) == v) roots.push_back(v);
    cout << extra.size() << "\n";
    for (size_t k = 0; k < extra.size(); k++)
        cout << extra[k].first << " " << extra[k].second << " " << roots[0] << " " << roots[k + 1] << "\n";
    return 0;
}
`,
      time: 'O(n α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'pair'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('DFS for components and back edges', 'উপাদান আর ব্যাক প্রান্তের জন্য DFS'),
      idea: L('A DFS forest uses n − c edges; every other edge is redundant.', 'একটি DFS বন n − c প্রান্ত ব্যবহার করে; বাকি প্রতিটি প্রান্ত অপ্রয়োজনীয়।'),
      explain: [L('Mark the edges used by the DFS tree (by index, so parallel edges are handled); the unmarked ones are exactly the redundant edges.', 'DFS ট্রির ব্যবহৃত প্রান্ত চিহ্নিত করুন (ইনডেক্স ধরে, তাই সমান্তরাল প্রান্তও সামলায়); অচিহ্নিতগুলোই ঠিক অপ্রয়োজনীয় প্রান্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> e(n - 1);
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        auto& [a, b] = e[i];
        cin >> a >> b;
        adj[a].push_back({b, i});
        adj[b].push_back({a, i});
    }
    vector<bool> seen(n + 1, false), used(n - 1, false);
    vector<int> roots;
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        roots.push_back(s);
        vector<int> st = {s};
        seen[s] = true;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            for (auto [u, id] : adj[v])
                if (!seen[u]) { seen[u] = true; used[id] = true; st.push_back(u); }
        }
    }
    vector<int> extra;
    for (int i = 0; i < n - 1; i++) if (!used[i]) extra.push_back(i);
    cout << extra.size() << "\n";
    for (size_t k = 0; k < extra.size(); k++)
        cout << e[extra[k]].first << " " << e[extra[k]].second << " " << roots[k] << " " << roots[k + 1] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'pair'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: '0', source: 'sample', note: sample(1) },
    { input: '7\n1 2\n2 3\n3 1\n4 5\n5 6\n6 7', output: '1\n3 1 3 7', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Closing a tree edge, which disconnects a component.', 'একটি ট্রি প্রান্ত বন্ধ করা, যা একটি উপাদান বিচ্ছিন্ন করে।')],
  related: [{ id: '1559D1', name: 'Mocha and Diana', why: L('Forests and DSU.', 'বন আর DSU।') }],
  toolkit: ['functions'],
};

export const p1253D: ProblemEntry = {
  id: '1253D',
  contestId: 1253,
  index: 'D',
  name: 'Harmonious Graph',
  rating: 1700,
  tags: ['constructive', 'dfs', 'dsu', 'graphs', 'greedy', 'sortings'],
  why: L('Each component spans an interval [min, max]; overlapping intervals must merge, one edge per merge.', 'প্রতিটি উপাদান একটি ব্যবধান [min, max] জুড়ে; একে অপরকে ছেদ করা ব্যবধান মিলতে হবে, প্রতি মিলনে একটি প্রান্ত।'),
  statement: L('A graph is harmonious if whenever l can reach r (l < r), it can also reach every m with l < m < r. Add the minimum number of edges to make the graph harmonious.', 'একটি গ্রাফ সুসংগত যদি l যখনই r-এ পৌঁছাতে পারে (l < r), তখন l < m < r এমন প্রতিটি m-এও পৌঁছাতে পারে। গ্রাফকে সুসংগত করতে সর্বনিম্ন কয়টি প্রান্ত যোগ করতে হবে?'),
  input: L('n m, then m edges.', 'n m, তারপর m-টি প্রান্ত।'),
  output: L('The minimum number of edges.', 'প্রান্তের সর্বনিম্ন সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵', 'n, m ≤ ২·১০⁵')] },
  samples: [
    { input: '14 8\n1 2\n2 7\n3 4\n6 3\n5 7\n3 8\n6 8\n11 12', output: '1', explain: L('Join {1, 2, 5, 7} with {3, 4, 6, 8}.', '{১, ২, ৫, ৭}-কে {৩, ৪, ৬, ৮}-এর সঙ্গে যুক্ত করুন।') },
    { input: '200000 3\n7 9\n9 8\n4 5', output: '0', explain: L('Already harmonious.', 'আগেই সুসংগত।') },
  ],
  observation: L('Harmonious means every component is a contiguous interval of labels. Scan i from 1 to n tracking the furthest reach R of the current block; if i ≤ R but i is in another component, it must be merged: one edge, and R grows to that component’s maximum.', 'সুসংগত মানে প্রতিটি উপাদান লেবেলের একটি পরপর ব্যবধান। i-কে ১ থেকে n পর্যন্ত স্ক্যান করে বর্তমান ব্লকের সবচেয়ে দূরের নাগাল R রাখুন; i ≤ R কিন্তু i অন্য উপাদানে থাকলে মেলাতে হবে: একটি প্রান্ত, আর R সেই উপাদানের সর্বোচ্চে বাড়ে।'),
  approach: [L('DSU with component maximum; greedy left-to-right scan.', 'উপাদানের সর্বোচ্চসহ DSU; বাম থেকে ডানে গ্রিডি স্ক্যান।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'block of 1 reaches 7; at 3 a different component', text: L('Merge (1 edge); reach grows to 8. Then 9, 10, 11–12 are fine.', 'মেলানো (১টি প্রান্ত); নাগাল ৮-এ বাড়ে। তারপর ৯, ১০, ১১–১২ ঠিক।') }] },
  complexity: { time: 'O((n + m) α)', space: 'O(n)', why: L('DSU plus one scan.', 'DSU আর একটি স্ক্যান।') },
  solutions: [
    {
      id: 'scan',
      kind: 'optimal',
      title: L('Left-to-right scan with a DSU', 'DSU-সহ বাম থেকে ডানে স্ক্যান'),
      idea: L('Merge whenever i falls inside the current reach but in another component.', 'i বর্তমান নাগালের ভেতরে কিন্তু অন্য উপাদানে পড়লেই মেলানো।'),
      explain: [L('The DSU stores each component’s maximum label, so after a merge the reach updates in O(1).', 'DSU প্রতিটি উপাদানের সর্বোচ্চ লেবেল রাখে, তাই মিলনের পরে নাগাল O(১)-এ হালনাগাদ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par, mx;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }
void unite(int a, int b) {
    a = find(a), b = find(b);
    if (a == b) return;
    par[b] = a;
    mx[a] = max(mx[a], mx[b]);
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    par.resize(n + 1);
    mx.resize(n + 1);
    iota(par.begin(), par.end(), 0);
    iota(mx.begin(), mx.end(), 0);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        unite(a, b);
    }
    int added = 0, cur = 1, reach = mx[find(1)];
    for (int i = 2; i <= n; i++) {
        if (i > reach) { cur = i; reach = mx[find(i)]; continue; }
        if (find(i) != find(cur)) { unite(cur, i); added++; reach = mx[find(cur)]; }
    }
    printf("%d\n", added);
    return 0;
}
`,
      time: 'O((n + m) α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'min-max'],
    },
    {
      id: 'intervals',
      kind: 'alt',
      title: L('Merge component intervals', 'উপাদানের ব্যবধান মেলানো'),
      idea: L('Each component is an interval [min, max]; a group of k overlapping intervals needs k − 1 edges.', 'প্রতিটি উপাদান একটি ব্যবধান [min, max]; k-টি ছেদকারী ব্যবধানের একটি দল k − ১টি প্রান্ত চায়।'),
      explain: [L('Find components by DFS, sort their intervals by left end and merge overlaps as in the classic interval-union problem, counting components per merged block.', 'DFS দিয়ে উপাদান খুঁজে তাদের ব্যবধান বাম প্রান্ত ধরে সর্ট করে ক্লাসিক ব্যবধান-ইউনিয়ন প্রবলেমের মতো ছেদ মেলান, প্রতি মিলিত ব্লকে উপাদান গুনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<bool> seen(n + 1, false);
    vector<pair<int, int>> iv;
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        int lo = s, hi = s;
        vector<int> st = {s};
        seen[s] = true;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            lo = min(lo, v), hi = max(hi, v);
            for (int u : adj[v]) if (!seen[u]) { seen[u] = true; st.push_back(u); }
        }
        iv.push_back({lo, hi});
    }
    sort(iv.begin(), iv.end());
    long long added = 0;
    int reach = -1;
    for (auto [lo, hi] : iv) {
        if (lo < reach) added++;  // overlaps the current block
        reach = max(reach, hi);
    }
    printf("%lld\n", added);
    return 0;
}
`,
      time: 'O(n log n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'stack-queue'],
    },
  ],
  tests: [
    { input: '14 8\n1 2\n2 7\n3 4\n6 3\n5 7\n3 8\n6 8\n11 12', output: '1', source: 'sample', note: sample(1) },
    { input: '200000 3\n7 9\n9 8\n4 5', output: '0', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Counting merges per vertex instead of per component.', 'উপাদানের বদলে প্রতি শীর্ষে মিলন গোনা।')],
  related: [{ id: '1609D', name: 'Social Network', why: L('Merging components greedily.', 'গ্রিডিভাবে উপাদান মেলানো।') }],
  toolkit: ['functions'],
};

export const p1131F: ProblemEntry = {
  id: '1131F',
  contestId: 1131,
  index: 'F',
  name: 'Asya And Kittens',
  rating: 1700,
  tags: ['constructive', 'dsu'],
  why: L('DSU where each set also stores a linked list (head and tail), so merging two rows is O(1).', 'DSU যেখানে প্রতিটি সেট একটি লিঙ্কড লিস্টও (মাথা আর লেজ) রাখে, তাই দুটি সারি মেলানো O(১)।'),
  statement: L('n kittens sat in a row of cells separated by partitions. On each of n − 1 days, two neighbouring kittens xᵢ and yᵢ (in adjacent groups) had the partition between their groups removed. Recover any initial arrangement.', 'n-টি বিড়ালছানা দেয়াল দিয়ে আলাদা ঘরের একটি সারিতে বসেছিল। n − ১ দিনের প্রতিটিতে পাশাপাশি দলের দুটি বিড়ালছানা xᵢ আর yᵢ-এর দলের মাঝের দেয়াল সরানো হয়েছিল। যেকোনো প্রাথমিক বিন্যাস পুনরুদ্ধার করুন।'),
  input: L('n, then n − 1 pairs.', 'n, তারপর n − ১টি জোড়া।'),
  output: L('A permutation: the kitten in each cell.', 'একটি পারমুটেশন: প্রতিটি ঘরের বিড়ালছানা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 1.5·10⁵', 'n ≤ ১.৫·১০⁵'), anyAnswer] },
  samples: [{ input: '5\n1 4\n2 5\n3 1\n4 5', output: '3 1 4 2 5', explain: L('Groups merge as {1,4}, {2,5}, {3,1,4}, then all.', 'দলগুলো মেলে {১,৪}, {২,৫}, {৩,১,৪}, তারপর সব।') }],
  observation: L('Each day joins two groups that are adjacent, so we can always put x’s group immediately to the left of y’s group. Keep each group as a linked list (head, tail, next); merging appends one list to the other in O(1). The final list is a valid row.', 'প্রতিদিন দুটি পাশাপাশি দল যুক্ত হয়, তাই আমরা সবসময় x-এর দলকে y-এর দলের ঠিক বামে বসাতে পারি। প্রতিটি দলকে লিঙ্কড লিস্ট (মাথা, লেজ, পরের) হিসেবে রাখুন; মেলানো একটি তালিকা অন্যটির পরে O(১)-এ জোড়ে। চূড়ান্ত তালিকা একটি বৈধ সারি।'),
  approach: [L('DSU + head/tail/next arrays; print by walking from the final head.', 'DSU + মাথা/লেজ/পরের অ্যারে; চূড়ান্ত মাথা থেকে হেঁটে প্রিন্ট।')],
  walkthrough: { input: 'day 1: 1 4', steps: [{ state: 'list 1 → 4', text: L('Day 3 (3, 1): 3 → 1 → 4. Day 4 joins with 2 → 5.', 'দিন ৩ (৩, ১): ৩ → ১ → ৪। দিন ৪ ২ → ৫-এর সঙ্গে জোড়ে।') }] },
  complexity: { time: 'O(n α)', space: 'O(n)', why: L('O(1) per merge.', 'প্রতি মিলনে O(১)।') },
  solutions: [
    {
      id: 'linked',
      kind: 'optimal',
      title: L('DSU with linked lists', 'লিঙ্কড লিস্টসহ DSU'),
      idea: L('next[tail[x]] = head[y].', 'next[tail[x]] = head[y]।'),
      explain: [L('The DSU answers “which group is this kitten in”; the list stores the order inside the group. Together they replace an expensive array concatenation.', 'DSU উত্তর দেয় “এই বিড়ালছানা কোন দলে”; তালিকা দলের ভেতরের ক্রম রাখে। একসঙ্গে এরা একটি ব্যয়বহুল অ্যারে জোড়ার জায়গা নেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par;
int find(int x) { while (par[x] != x) x = par[x] = par[par[x]]; return x; }

int main() {
    int n;
    scanf("%d", &n);
    par.resize(n + 1);
    iota(par.begin(), par.end(), 0);
    vector<int> head(n + 1), tail(n + 1), nxt(n + 1, 0);
    iota(head.begin(), head.end(), 0);
    iota(tail.begin(), tail.end(), 0);
    for (int i = 0; i < n - 1; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        x = find(x), y = find(y);
        nxt[tail[x]] = head[y];  // x's row, then y's row
        tail[x] = tail[y];
        par[y] = x;
    }
    for (int v = head[find(1)]; v; v = nxt[v]) printf("%d ", v);
    printf("\n");
    return 0;
}
`,
      time: 'O(n α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
    {
      id: 'small-to-large',
      kind: 'alt',
      title: L('Small-to-large with deques', 'deque দিয়ে ছোট-থেকে-বড়'),
      idea: L('Move the smaller group’s kittens into the larger deque, on the correct side.', 'ছোট দলের বিড়ালছানাগুলো বড় deque-এ, সঠিক পাশে সরানো।'),
      explain: [L('Each kitten moves O(log n) times, because the group it moves into is at least twice as large. If x’s group is smaller, its kittens are pushed to the front of y’s deque in reverse; otherwise y’s kittens go to the back of x’s.', 'প্রতিটি বিড়ালছানা O(log n) বার সরে, কারণ যে দলে যায় তা অন্তত দ্বিগুণ বড়। x-এর দল ছোট হলে এর বিড়ালছানাগুলো উল্টো ক্রমে y-এর deque-এর সামনে যায়; নইলে y-এর বিড়ালছানাগুলো x-এর পেছনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> grp(n + 1);
    vector<deque<int>> row(n + 1);
    for (int v = 1; v <= n; v++) { grp[v] = v; row[v] = {v}; }
    for (int i = 0; i < n - 1; i++) {
        int x, y;
        scanf("%d %d", &x, &y);
        int gx = grp[x], gy = grp[y];
        if (row[gx].size() < row[gy].size()) {
            for (auto it = row[gx].rbegin(); it != row[gx].rend(); ++it) { row[gy].push_front(*it); grp[*it] = gy; }
            row[gx].clear();
        } else {
            for (int v : row[gy]) { row[gx].push_back(v); grp[v] = gx; }
            row[gy].clear();
        }
    }
    for (int v : row[grp[1]]) printf("%d ", v);
    printf("\n");
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
  ],
  tests: [{ input: '5\n1 4\n2 5\n3 1\n4 5', output: '3 1 4 2 5', source: 'sample', note: sample(1) }],
  pitfalls: [L('Concatenating vectors naively: O(n²).', 'সরলভাবে vector জোড়া: O(n²)।')],
  related: [{ id: '1609D', name: 'Social Network', why: L('DSU with extra data.', 'বাড়তি তথ্যসহ DSU।') }],
  toolkit: ['functions'],
};
