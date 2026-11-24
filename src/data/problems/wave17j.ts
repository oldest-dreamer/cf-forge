import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 150E
export const p150E: ProblemEntry = {
  id: '150E',
  contestId: 150,
  index: 'E',
  name: 'Freezing with Style',
  rating: 3100,
  tags: ['binary-search', 'data-structures', 'divide-and-conquer', 'trees'],
  featuredFor: ['divide-and-conquer'],
  why: L(
    'Maximising a median is a binary search on the answer: “is there a path of allowed length whose median is at least x?” becomes “is there a path with weighted sum ≥ 0 when every edge counts +1 or −1?”. Answering that on a tree is centroid decomposition with a sliding-window maximum.',
    'মধ্যমা সর্বোচ্চ করা মানে উত্তরের ওপর বাইনারি সার্চ: “অনুমোদিত দৈর্ঘ্যের এমন পথ আছে কি যার মধ্যমা অন্তত x?” হয়ে যায় “প্রতিটি কিনারা +১ বা −১ ধরলে ওজনযুক্ত যোগফল ≥ ০ এমন পথ আছে কি?”। গাছে এর উত্তর সেন্ট্রয়েড ডিকম্পোজিশন আর স্লাইডিং-উইন্ডো সর্বোচ্চে।',
  ),
  statement: L(
    'A tree with n vertices has a beauty on every edge. Choose a path whose number of edges is between l and r, inclusive, so that the median beauty of its edges is as large as possible (the median of k sorted values is the one at 0-based index ⌊k / 2⌋). Print any two endpoints of such a path.',
    'n শীর্ষের গাছের প্রতিটি কিনারায় একটি সৌন্দর্য-মান আছে। কিনারা সংখ্যা l থেকে r (উভয়সহ)-এর মধ্যে এমন পথ বাছো যার কিনারাগুলোর সৌন্দর্যের মধ্যমা যথাসম্ভব বড় (k টি সর্টেড মানের মধ্যমা ০-ভিত্তিক সূচক ⌊k / ২⌋-এর মান)। এমন পথের যেকোনো দুই প্রান্ত প্রিন্ট করো।',
  ),
  input: L('n l r, then n − 1 edges a b c.', 'n l r, তারপর n − ১ টি কিনারা a b c।'),
  output: L('Two vertices u v (a checker accepts any optimal path).', 'দুটি শীর্ষ u v (চেকার যেকোনো সেরা পথ গ্রহণ করে)।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, 1 ≤ l ≤ r ≤ n − 1, beauty ≤ 10⁹; a path of allowed length exists', '২ ≤ n ≤ ১০⁵, ১ ≤ l ≤ r ≤ n − ১, সৌন্দর্য ≤ ১০⁹; অনুমোদিত দৈর্ঘ্যের পথ আছে')] },
  samples: [
    { input: '6 3 4\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n5 6 1', output: '4 1', explain: L('All beauties are equal, so any path of 3 or 4 edges has median 1.', 'সব সৌন্দর্য সমান, তাই ৩ বা ৪ কিনারার যেকোনো পথের মধ্যমা ১।') },
    { input: '6 3 4\n1 2 1\n2 3 1\n3 4 1\n4 5 2\n5 6 2', output: '6 3', explain: L('The path 6 – 5 – 4 – 3 has beauties 2, 2, 1: median index 1 is 2, the best possible.', 'পথ ৬ – ৫ – ৪ – ৩-এর সৌন্দর্য ২, ২, ১: সূচক ১-এর মধ্যমা ২, যা সম্ভাব্য সেরা।') },
  ],
  observation: L(
    'Fix a threshold x. A path with k edges has median ≥ x exactly when the number of edges below x is at most ⌊k / 2⌋, i.e. when (edges ≥ x) − (edges < x) ≥ 0. So give each edge +1 if its beauty is ≥ x and −1 otherwise: we need a path with length in [l, r] and sum ≥ 0. This predicate is monotone in x, so binary search the largest feasible x among the edge beauties. For the predicate use centroid decomposition: a path through the centroid joins two root paths with depths d₁ + d₂ ∈ [l, r], and for each depth we only need the best sum.',
    'একটি সীমা x ধরো। k কিনারার পথের মধ্যমা ≥ x হয় ঠিক তখনই যখন x-এর চেয়ে ছোট কিনারা সংখ্যা সর্বোচ্চ ⌊k / ২⌋, অর্থাৎ (কিনারা ≥ x) − (কিনারা < x) ≥ ০। তাই সৌন্দর্য ≥ x হলে কিনারাকে +১, নয়তো −১ দাও: দৈর্ঘ্য [l, r]-এ আর যোগফল ≥ ০ এমন পথ চাই। এই শর্ত x-এ মনোটোন, তাই কিনারার সৌন্দর্যগুলোর মধ্যে সবচেয়ে বড় সম্ভাব্য x বাইনারি সার্চে খোঁজো। শর্ত যাচাইয়ে সেন্ট্রয়েড ডিকম্পোজিশন: সেন্ট্রয়েড দিয়ে যাওয়া পথ দুটি মূল-পথ জোড়ে যাদের গভীরতা d₁ + d₂ ∈ [l, r], আর প্রতিটি গভীরতায় শুধু সেরা যোগফল লাগে।',
  ),
  approach: [
    L('Precompute the centroid decomposition once, storing for every centroid its child subtrees (vertices in BFS order with depth, parent index and edge beauty), sorted by maximum depth ascending.', 'সেন্ট্রয়েড ডিকম্পোজিশন একবার বানাও, প্রতিটি সেন্ট্রয়েডের সন্তান-উপগাছ (BFS ক্রমে শীর্ষ, গভীরতা, অভিভাবক সূচক, কিনারার সৌন্দর্যসহ) সংরক্ষণ করো, সর্বোচ্চ গভীরতার ঊর্ধ্বক্রমে সাজিয়ে।'),
    L('For a threshold x, process each centroid’s subtrees in that order: best[d] is the best (sum, vertex) at depth d among earlier subtrees; for the new subtree, slide a window [l − d, r − d] over best[] with a monotone deque.', 'সীমা x-এর জন্য প্রতিটি সেন্ট্রয়েডের উপগাছ সেই ক্রমে প্রক্রিয়া করো: best[d] আগের উপগাছগুলোতে গভীরতা d-এ সেরা (যোগফল, শীর্ষ); নতুন উপগাছে best[] জুড়ে মনোটোন ডেকে জানালা [l − d, r − d] সরাও।'),
    L('Binary search the largest feasible beauty, then run the check once more to read off the endpoints.', 'সবচেয়ে বড় সম্ভাব্য সৌন্দর্য বাইনারি সার্চে খুঁজে আরেকবার যাচাই চালিয়ে প্রান্ত দুটি পড়ো।'),
  ],
  walkthrough: {
    input: 'second sample, threshold x = 2',
    steps: [
      { state: 'edge values: 1–2: −1, 2–3: −1, 3–4: −1, 4–5: +1, 5–6: +1', text: L('Only beauty 2 edges count as +1.', 'শুধু সৌন্দর্য ২-এর কিনারা +১ ধরা হয়।') },
      { state: 'path 6 → 3: +1 + 1 − 1 = 1 ≥ 0 with length 3', text: L('Feasible, and no 3- or 4-edge path can use x = 3 because no edge has beauty 3.', 'সম্ভব, আর ৩-কিনারার বা ৪-কিনারার কোনো পথ x = ৩ নিতে পারে না কারণ কোনো কিনারার সৌন্দর্য ৩ নয়।') },
    ],
  },
  complexity: { time: 'O(n log n · log n)', space: 'O(n log n)', why: L('About log n binary-search rounds, each O(n log n) with the sorted-by-depth trick.', 'প্রায় log n বাইনারি সার্চ রাউন্ড, প্রতিটি গভীরতা-অনুযায়ী-সাজানোর কৌশলে O(n log n)।') },
  solutions: [
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Binary search + centroid decomposition + sliding window', 'বাইনারি সার্চ + সেন্ট্রয়েড ডিকম্পোজিশন + স্লাইডিং উইন্ডো'),
      idea: L('Process subtrees by ascending max depth so the window work per subtree stays linear in its size.', 'উপগাছ ঊর্ধ্বমুখী সর্বোচ্চ গভীরতায় প্রক্রিয়া করলে প্রতি উপগাছে জানালার কাজ তার আকারের রৈখিক থাকে।'),
      explain: [L('The window over best[] only has as many entries as the current subtree’s max depth, which is at least that of every previously processed subtree. That keeps each subtree’s cost proportional to its own size, so a whole centroid level is O(n).', 'best[]-এর ওপর জানালায় ততগুলোই এন্ট্রি যত বর্তমান উপগাছের সর্বোচ্চ গভীরতা, যা আগে প্রক্রিয়া করা প্রতিটির চেয়ে কম নয়। এতে প্রতিটি উপগাছের খরচ তার নিজের আকারের সমানুপাতিক থাকে, তাই পুরো সেন্ট্রয়েড স্তর O(n)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int NEG = -1e9;

struct Sub {
    vector<int> node, dep, par, w;
    int maxd = 0;
};
struct Comp {
    int c;
    vector<Sub> subs;
};

int n, L, R;
vector<vector<pair<int, int>>> g;
vector<Comp> comps;
int ru, rv;

void decompose() {
    vector<int> sz(n + 1), pr(n + 1);
    vector<char> dead(n + 1, 0);
    vector<int> stk = {1}, order;
    while (!stk.empty()) {
        int s = stk.back();
        stk.pop_back();
        order.assign(1, s);
        pr[s] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (auto [w, d] : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = s;
        for (int v : order) {
            int mx = tot - sz[v];
            for (auto [w, d] : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        Comp comp;
        comp.c = c;
        for (auto [w, wt] : g[c]) {
            if (dead[w]) continue;
            Sub sb;
            sb.node = {w}, sb.dep = {1}, sb.par = {-1}, sb.w = {wt};
            for (size_t i = 0; i < sb.node.size(); i++) {
                int parentVertex = sb.par[i] < 0 ? c : sb.node[sb.par[i]];
                for (auto [x, t] : g[sb.node[i]])
                    if (!dead[x] && x != parentVertex)
                        sb.node.push_back(x), sb.dep.push_back(sb.dep[i] + 1), sb.par.push_back(i), sb.w.push_back(t);
            }
            sb.maxd = sb.dep.back();
            comp.subs.push_back(move(sb));
        }
        sort(comp.subs.begin(), comp.subs.end(), [](const Sub& a, const Sub& b) { return a.maxd < b.maxd; });
        comps.push_back(move(comp));
        dead[c] = 1;
        for (auto [w, d] : g[c])
            if (!dead[w]) stk.push_back(w);
    }
}

bool feasible(int x) {
    for (auto& comp : comps) {
        int maxDepth = 0;
        for (auto& sb : comp.subs) maxDepth = max(maxDepth, sb.maxd);
        vector<pair<int, int>> f(maxDepth + 2, {NEG, 0});
        f[0] = {0, comp.c};
        int maxD = 0;
        for (auto& sb : comp.subs) {
            int m = sb.node.size();
            vector<int> sum(m);
            vector<pair<int, int>> gd(sb.maxd + 1, {NEG, 0});
            for (int i = 0; i < m; i++) {
                sum[i] = (sb.par[i] < 0 ? 0 : sum[sb.par[i]]) + (sb.w[i] >= x ? 1 : -1);
                if (sum[i] > gd[sb.dep[i]].first) gd[sb.dep[i]] = {sum[i], sb.node[i]};
            }
            deque<int> dq;
            int ptr = min(maxD, R - 1);
            for (int d = 1; d <= sb.maxd; d++) {
                int hi = min(maxD, R - d), lo = max(0, L - d);
                if (R - d < 0) break;
                while (ptr >= lo) {
                    while (!dq.empty() && f[dq.back()].first <= f[ptr].first) dq.pop_back();
                    dq.push_back(ptr);
                    ptr--;
                }
                while (!dq.empty() && dq.front() > hi) dq.pop_front();
                if (!dq.empty() && f[dq.front()].first > NEG / 2 && gd[d].first > NEG / 2 && f[dq.front()].first + gd[d].first >= 0) {
                    ru = f[dq.front()].second, rv = gd[d].second;
                    return true;
                }
            }
            for (int d = 1; d <= sb.maxd; d++)
                if (gd[d].first > f[d].first) f[d] = gd[d];
            maxD = max(maxD, sb.maxd);
        }
    }
    return false;
}

int main() {
    scanf("%d %d %d", &n, &L, &R);
    g.assign(n + 1, {});
    vector<int> ws;
    for (int i = 1; i < n; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        g[a].push_back({b, c}), g[b].push_back({a, c});
        ws.push_back(c);
    }
    sort(ws.begin(), ws.end());
    ws.erase(unique(ws.begin(), ws.end()), ws.end());
    decompose();
    int lo = 0, hi = ws.size() - 1;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (feasible(ws[mid])) lo = mid;
        else hi = mid - 1;
    }
    feasible(ws[lo]);
    printf("%d %d\n", ru, rv);
    return 0;
}
`,
      time: 'O(n log² n)',
      space: 'O(n log n)',
      accepted: true,
      toolkit: ['vector', 'pair', 'structured-bindings', 'stack-queue', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Evaluate every pair of endpoints', 'প্রতিটি প্রান্ত-জোড়া মূল্যায়ন'),
      idea: L('For every pair u < v with a legal length compute the real median and keep the best.', 'বৈধ দৈর্ঘ্যের প্রতিটি জোড়া u < v-র আসল মধ্যমা বের করে সেরাটি রাখো।'),
      explain: [L('O(n³) with a sort per path. It uses the median’s definition directly, so it also checks the “+1 / −1 ≥ 0” reduction.', 'পথ প্রতি সর্টসহ O(n³)। মধ্যমার সংজ্ঞা সরাসরি ব্যবহার করে, তাই “+১ / −১ ≥ ০” রূপান্তরও যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, L, R;
    scanf("%d %d %d", &n, &L, &R);
    vector<vector<pair<int, int>>> g(n + 1);
    for (int i = 1; i < n; i++) {
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        g[a].push_back({b, c}), g[b].push_back({a, c});
    }
    int best = -1, bu = 1, bv = 2;
    for (int u = 1; u <= n; u++) {
        vector<int> par(n + 1, -1), pw(n + 1, 0), q = {u};
        par[u] = 0;
        for (size_t h = 0; h < q.size(); h++)
            for (auto [w, c] : g[q[h]])
                if (par[w] < 0) par[w] = q[h], pw[w] = c, q.push_back(w);
        for (int v = u + 1; v <= n; v++) {
            vector<int> ws;
            for (int x = v; x != u; x = par[x]) ws.push_back(pw[x]);
            int len = ws.size();
            if (len < L || len > R) continue;
            sort(ws.begin(), ws.end());
            if (ws[len / 2] > best) best = ws[len / 2], bu = u, bv = v;
        }
    }
    printf("%d %d\n", bu, bv);
    return 0;
}
`,
      time: 'O(n³ log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'sort', 'pair', 'structured-bindings'],
    },
  ],
  tests: [
    { input: '6 3 4\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n5 6 1', output: '4 1', source: 'sample', note: sample(1) },
    { input: '6 3 4\n1 2 1\n2 3 1\n3 4 1\n4 5 2\n5 6 2', output: '6 3', source: 'sample', note: sample(2) },
    { input: '2 1 1\n1 2 7', output: '1 2', source: 'own', note: L('A single edge: the only path.', 'একটিমাত্র কিনারা: একমাত্র পথ।') },
  ],
  pitfalls: [
    L('Using the lower median for even lengths: the problem takes the element at index ⌊k / 2⌋, the upper one, which is why the check is “sum ≥ 0” and not “sum > 0”.', 'জোড় দৈর্ঘ্যে নিচের মধ্যমা ধরা: সমস্যা সূচক ⌊k / ২⌋-এর, অর্থাৎ ওপরের উপাদান নেয়, তাই যাচাই “যোগফল ≥ ০”, “> ০” নয়।'),
    L('Processing the subtrees in input order: a shallow subtree after a deep one makes the window scan the deep range again and the decomposition degrades to O(n²) on a star of long paths.', 'উপগাছ ইনপুট ক্রমে প্রক্রিয়া: গভীরের পর অগভীর উপগাছ এলে জানালা আবার গভীর পরিসর স্ক্যান করে, আর লম্বা পথের স্টারে ডিকম্পোজিশন O(n²) হয়ে যায়।'),
    L('Forgetting the centroid itself as an endpoint with depth 0 and sum 0.', 'গভীরতা ০ আর যোগফল ০-সহ সেন্ট্রয়েড নিজেকে প্রান্ত হিসেবে ভুলে যাওয়া।'),
  ],
  related: [
    { id: '342E', name: 'Xenia and Tree', why: L('Another problem where every vertex needs its centroid ancestors.', 'আরেকটি সমস্যা যেখানে প্রতিটি শীর্ষের সেন্ট্রয়েড পূর্বপুরুষ লাগে।') },
    { id: '715C', name: 'Digit Tree', why: L('Counting valid paths through the centroid, with modular arithmetic.', 'সেন্ট্রয়েড দিয়ে বৈধ পথ গণনা, মডুলার গণিতসহ।') },
  ],
  toolkit: ['vector', 'pair'],
};

// ───────────────────────────────────────────── 438E
export const p438E: ProblemEntry = {
  id: '438E',
  contestId: 438,
  index: 'E',
  name: 'The Child and Binary Tree',
  rating: 3200,
  tags: ['combinatorics', 'divide-and-conquer', 'fft', 'math'],
  featuredFor: ['fft'],
  why: L(
    'The number of binary trees with a given total weight satisfies F = 1 + C·F², a quadratic equation in power series. It can be solved in closed form with a polynomial square root and inverse (Newton iteration over NTT), or step by step with online (relaxed) convolution — a divide and conquer over the index that calls FFT on the halves.',
    'নির্দিষ্ট মোট ওজনের বাইনারি ট্রি-র সংখ্যা F = 1 + C·F² মানে, যা পাওয়ার সিরিজে দ্বিঘাত সমীকরণ। এটি বহুপদীর বর্গমূল ও বিপরীত (NTT-র ওপর নিউটন ইটারেশন) দিয়ে বদ্ধ রূপে, অথবা অনলাইন (রিল্যাক্সড) কনভোলিউশনে ধাপে ধাপে সমাধান করা যায় — সূচকের ওপর ডিভাইড অ্যান্ড কনকার যা অর্ধ দুটিতে FFT ডাকে।',
  ),
  statement: L(
    'You have a set C of n distinct positive integers. A binary tree is good if every vertex carries a weight from C (the empty tree is not counted, but a vertex may have missing children; left and right children are distinct). For every s from 1 to m print the number of good trees whose total vertex weight is s, modulo 998244353.',
    'তোমার কাছে n টি ভিন্ন ধনাত্মক পূর্ণসংখ্যার সেট C। একটি বাইনারি ট্রি ভালো যদি প্রতিটি শীর্ষের ওজন C থেকে হয় (ফাঁকা ট্রি গোনা হয় না, কিন্তু শীর্ষের সন্তান না থাকতে পারে; বাম আর ডান সন্তান আলাদা)। s = ১ থেকে m প্রতিটির জন্য মোট শীর্ষ-ওজন s এমন ভালো ট্রি-র সংখ্যা ৯৯৮২৪৪৩৫৩ মডুলোতে প্রিন্ট করো।',
  ),
  input: L('n m, then the n values of C.', 'n m, তারপর C-র n টি মান।'),
  output: L('m numbers, one per weight s = 1 … m.', 'm টি সংখ্যা, প্রতিটি ওজন s = ১ … m-র জন্য।'),
  limits: { timeSec: 4, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ m ≤ 10⁵, 1 ≤ c ≤ 10⁵', '১ ≤ n ≤ ১০⁵, ১ ≤ m ≤ ১০⁵, ১ ≤ c ≤ ১০⁵')] },
  samples: [
    { input: '2 3\n1 2', output: '1 3 9', explain: L('Weight 1: one vertex of weight 1. Weight 2: one vertex of weight 2, or a root 1 with a single child 1 on the left or the right (3 trees). Weight 3: 9 trees.', 'ওজন ১: একটি ওজন-১ শীর্ষ। ওজন ২: একটি ওজন-২ শীর্ষ, অথবা মূল ১ আর বাম বা ডান পাশে একটি সন্তান ১ (মোট ৩)। ওজন ৩: ৯টি ট্রি।') },
    { input: '3 10\n9 4 3', output: '0 0 1 1 0 2 4 2 6 15', explain: L('Only weights 3, 4, 9 exist; for example total 5 needs no combination and total 6 has the two arrangements of 3 + 3.', 'শুধু ৩, ৪, ৯ ওজন আছে; যেমন মোট ৫ কোনো সমন্বয়েই মেলে না, আর মোট ৬-এ ৩ + ৩-এর দুটি বিন্যাস।') },
  ],
  observation: L(
    'Let f(s) be the number of trees of total weight s, counting the empty tree as weight 0 (f(0) = 1). A non-empty tree has a root with weight c ∈ C and an ordered pair of subtrees (possibly empty) with weights i and j, so f(s) = Σ_{c ∈ C} Σ_{i + j = s − c} f(i)·f(j). In series form F = 1 + C·F². Solving: F = (1 − √(1 − 4C)) / (2C) = 2 / (1 + √(1 − 4C)). So you need a power series square root and an inverse.',
    'f(s) = মোট ওজন s-এর ট্রি-র সংখ্যা, ফাঁকা ট্রি ওজন ০ ধরে (f(০) = ১)। অশূন্য ট্রি-র মূল ওজন c ∈ C আর দুটি ক্রমিক উপট্রি (ফাঁকা হতে পারে) যাদের ওজন i আর j, তাই f(s) = Σ_{c ∈ C} Σ_{i + j = s − c} f(i)·f(j)। সিরিজ রূপে F = ১ + C·F²। সমাধান: F = (১ − √(১ − ৪C)) / (২C) = ২ / (১ + √(১ − ৪C))। তাই পাওয়ার সিরিজের বর্গমূল আর বিপরীত দরকার।',
  ),
  approach: [
    L('Build P = 1 − 4C modulo 998244353 up to degree m.', 'ডিগ্রি m পর্যন্ত P = ১ − ৪C (৯৯৮২৪৪৩৫৩ মডুলোতে) বানাও।'),
    L('Compute S = √P with Newton’s iteration S ← (S + P·S⁻¹) / 2, doubling the precision each step (the inverse is itself a Newton iteration).', 'নিউটন ইটারেশনে S = √P বের করো S ← (S + P·S⁻¹) / ২, প্রতি ধাপে নির্ভুলতা দ্বিগুণ (বিপরীতও নিজে একটি নিউটন ইটারেশন)।'),
    L('Output the coefficients 1 … m of F = 2 / (1 + S).', 'F = ২ / (১ + S)-এর সহগ ১ … m প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'C = {1}, so F = 1 + xF²',
    steps: [
      { state: 'f(0) = 1', text: L('The empty tree.', 'ফাঁকা ট্রি।') },
      { state: 'f(1) = Σ f(0)f(0) = 1', text: L('One vertex.', 'একটি শীর্ষ।') },
      { state: 'f(2) = 2 f(0)f(1) = 2, f(3) = 2f(0)f(2) + f(1)f(1) = 5', text: L('Catalan numbers 1, 1, 2, 5, … as expected.', 'প্রত্যাশামতো ক্যাটালান সংখ্যা ১, ১, ২, ৫, …।') },
    ],
  },
  complexity: { time: 'O(m log m)', space: 'O(m)', why: L('Each Newton step costs a constant number of NTTs of the current size; the sizes double, so the total is dominated by the last.', 'প্রতিটি নিউটন ধাপে বর্তমান আকারের ধ্রুব সংখ্যক NTT; আকার দ্বিগুণ হয় তাই মোট শেষটির সমান।') },
  solutions: [
    {
      id: 'newton',
      kind: 'optimal',
      title: L('Polynomial square root and inverse (Newton)', 'বহুপদীর বর্গমূল ও বিপরীত (নিউটন)'),
      idea: L('F = 2 / (1 + √(1 − 4C)).', 'F = ২ / (১ + √(১ − ৪C))।'),
      explain: [L('The inverse uses b ← b·(2 − a·b) and the square root uses s ← (s + a·s⁻¹) / 2; both double the number of correct coefficients per round. Constant term of 1 − 4C is 1 (C has no constant term), so the square root’s start value is 1.', 'বিপরীত b ← b·(২ − a·b) আর বর্গমূল s ← (s + a·s⁻¹) / ২; দুটিতেই প্রতি রাউন্ডে সঠিক সহগ দ্বিগুণ হয়। ১ − ৪C-র ধ্রুব পদ ১ (C-তে ধ্রুব পদ নেই), তাই বর্গমূলের শুরুর মান ১।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int MOD = 998244353;

ll pw(ll b, ll e) {
    ll r = 1;
    b %= MOD;
    for (; e; e >>= 1, b = b * b % MOD)
        if (e & 1) r = r * b % MOD;
    return r;
}

void ntt(vector<int>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        ll w = pw(3, (MOD - 1) / len);
        if (inv) w = pw(w, MOD - 2);
        for (int i = 0; i < n; i += len) {
            ll cur = 1;
            for (int j = 0; j < len / 2; j++) {
                int u = a[i + j], v = a[i + j + len / 2] * cur % MOD;
                a[i + j] = u + v >= MOD ? u + v - MOD : u + v;
                a[i + j + len / 2] = u - v < 0 ? u - v + MOD : u - v;
                cur = cur * w % MOD;
            }
        }
    }
    if (inv) {
        ll ni = pw(n, MOD - 2);
        for (int& x : a) x = x * ni % MOD;
    }
}

vector<int> polyInv(const vector<int>& a, int n) {
    vector<int> b = {(int)pw(a[0], MOD - 2)};
    for (int len = 1; len < n; len <<= 1) {
        int l2 = len * 2, sz = l2 * 2;
        vector<int> fa(sz, 0), fb(sz, 0);
        for (int i = 0; i < min<int>(l2, a.size()); i++) fa[i] = a[i];
        for (size_t i = 0; i < b.size(); i++) fb[i] = b[i];
        ntt(fa, false), ntt(fb, false);
        for (int i = 0; i < sz; i++) fa[i] = (ll)fb[i] * ((2 - (ll)fa[i] * fb[i] % MOD + MOD) % MOD) % MOD;
        ntt(fa, true);
        fa.resize(l2);
        b = fa;
    }
    b.resize(n);
    return b;
}

vector<int> polySqrt(const vector<int>& a, int n) {  // a[0] == 1
    vector<int> s = {1};
    ll inv2 = (MOD + 1) / 2;
    for (int len = 1; len < n; len <<= 1) {
        int l2 = len * 2, sz = l2 * 2;
        vector<int> sinv = polyInv(s, l2);
        vector<int> ta(sz, 0), tb(sz, 0);
        for (int i = 0; i < min<int>(l2, a.size()); i++) ta[i] = a[i];
        for (int i = 0; i < l2; i++) tb[i] = sinv[i];
        ntt(ta, false), ntt(tb, false);
        for (int i = 0; i < sz; i++) ta[i] = (ll)ta[i] * tb[i] % MOD;
        ntt(ta, true);
        s.resize(l2);
        for (int i = 0; i < l2; i++) s[i] = ((ll)s[i] + ta[i]) % MOD * inv2 % MOD;
    }
    s.resize(n);
    return s;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    int N = m + 1;
    vector<int> P(N, 0);
    P[0] = 1;
    for (int i = 0; i < n; i++) {
        int c;
        scanf("%d", &c);
        if (c <= m) P[c] = (P[c] + MOD - 4) % MOD;
    }
    vector<int> S = polySqrt(P, N);
    S[0] = (S[0] + 1) % MOD;
    vector<int> F = polyInv(S, N);
    for (int i = 1; i <= m; i++) printf("%d\n", (int)(2LL * F[i] % MOD));
    return 0;
}
`,
      time: 'O(m log m)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['mod-pow', 'mod-arith', 'vector', 'long-long'],
    },
    {
      id: 'cdq',
      kind: 'method',
      title: L('Online convolution (CDQ divide and conquer + NTT)', 'অনলাইন কনভোলিউশন (CDQ ডিভাইড অ্যান্ড কনকার + NTT)'),
      idea: L('Fill f left to right; contributions of a finished half to the other half are one NTT multiplication.', 'f বাঁ থেকে ডানে ভরো; সমাপ্ত অর্ধের অন্য অর্ধে অবদান একটি NTT গুণ।'),
      explain: [L('Maintain g = f·f and the weighted sums fc[k] = Σ_{j < k, k − j ∈ C} g[j]. After the left half [l, mid) is final, add its g-values into fc for the right half, and its f-values (paired with earlier ones, doubled when l > 0) into g for the right half. A leaf k sets f[k] = fc[k] and adds the two pairs (k, 0), (0, k) into g[k]. Small blocks use direct loops. The array size is rounded up to a power of two so the “earlier part is not longer than l” property holds.', 'g = f·f আর ভারযুক্ত যোগফল fc[k] = Σ_{j < k, k − j ∈ C} g[j] রাখো। বাম অর্ধ [l, mid) চূড়ান্ত হলে তার g-মান ডান অর্ধের fc-তে যোগ করো, আর তার f-মান (আগেরগুলোর সঙ্গে জোড়া, l > ০ হলে দ্বিগুণ) ডান অর্ধের g-তে যোগ করো। পাতা k f[k] = fc[k] বসায় আর g[k]-তে জোড়া (k, ০), (০, k) যোগ করে। ছোট ব্লকে সরাসরি লুপ। অ্যারে আকার দুইয়ের ঘাতে বাড়ানো হয় যাতে “আগের অংশ l-এর চেয়ে লম্বা নয়” ধর্ম খাটে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int MOD = 998244353;

ll pw(ll b, ll e) {
    ll r = 1;
    b %= MOD;
    for (; e; e >>= 1, b = b * b % MOD)
        if (e & 1) r = r * b % MOD;
    return r;
}

void ntt(vector<int>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        ll w = pw(3, (MOD - 1) / len);
        if (inv) w = pw(w, MOD - 2);
        for (int i = 0; i < n; i += len) {
            ll cur = 1;
            for (int j = 0; j < len / 2; j++) {
                int u = a[i + j], v = a[i + j + len / 2] * cur % MOD;
                a[i + j] = u + v >= MOD ? u + v - MOD : u + v;
                a[i + j + len / 2] = u - v < 0 ? u - v + MOD : u - v;
                cur = cur * w % MOD;
            }
        }
    }
    if (inv) {
        ll ni = pw(n, MOD - 2);
        for (int& x : a) x = x * ni % MOD;
    }
}

vector<int> mul(vector<int> a, vector<int> b) {
    int need = a.size() + b.size() - 1;
    if (a.size() < 32 || b.size() < 32) {
        vector<int> r(need, 0);
        for (size_t i = 0; i < a.size(); i++)
            for (size_t j = 0; j < b.size(); j++) r[i + j] = (r[i + j] + (ll)a[i] * b[j]) % MOD;
        return r;
    }
    int sz = 1;
    while (sz < need) sz <<= 1;
    a.resize(sz), b.resize(sz);
    ntt(a, false), ntt(b, false);
    for (int i = 0; i < sz; i++) a[i] = (ll)a[i] * b[i] % MOD;
    ntt(a, true);
    a.resize(need);
    return a;
}

int N;
vector<int> f, g, fc, Cind;

void solve(int l, int r) {
    if (r - l == 1) {
        if (l == 0) f[0] = 1, g[0] = 1;
        else {
            f[l] = fc[l] % MOD;
            g[l] = (g[l] + 2LL * f[l]) % MOD;
        }
        return;
    }
    int mid = (l + r) / 2;
    solve(l, mid);
    {  // g[l..mid) -> fc[mid..r)
        vector<int> A(g.begin() + l, g.begin() + mid), B(Cind.begin(), Cind.begin() + (r - l));
        auto P = mul(A, B);
        for (int k = mid; k < r; k++) fc[k] = (fc[k] + P[k - l]) % MOD;
    }
    {  // f -> g[mid..r)
        if (l == 0) {
            vector<int> A(f.begin(), f.begin() + mid);
            auto P = mul(A, A);
            for (int k = mid; k < r; k++)
                if (k < (int)P.size()) g[k] = (g[k] + P[k]) % MOD;
        } else {
            vector<int> A(f.begin() + l, f.begin() + mid), B(f.begin(), f.begin() + (r - l));
            auto P = mul(A, B);
            for (int k = mid; k < r; k++) g[k] = (g[k] + 2LL * P[k - l]) % MOD;
        }
    }
    solve(mid, r);
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    N = 1;
    while (N < m + 1) N <<= 1;
    Cind.assign(N, 0), f.assign(N, 0), g.assign(N, 0), fc.assign(N, 0);
    for (int i = 0; i < n; i++) {
        int c;
        scanf("%d", &c);
        if (c < N) Cind[c] = 1;
    }
    solve(0, N);
    for (int i = 1; i <= m; i++) printf("%d\n", f[i]);
    return 0;
}
`,
      time: 'O(m log² m)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['vector', 'mod-arith', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Direct O(m²) recurrence', 'সরাসরি O(m²) পুনরাবৃত্তি'),
      idea: L('Keep g[t] = Σ f(i)f(t − i); then f(s) = Σ_{c ∈ C} g[s − c].', 'g[t] = Σ f(i)f(t − i) রাখো; তারপর f(s) = Σ_{c ∈ C} g[s − c]।'),
      explain: [L('Correct and simple, quadratic in m. Independent of any series algebra, so it validates the closed form.', 'সঠিক ও সহজ, m-এ দ্বিঘাত। কোনো সিরিজ বীজগণিতের ওপর নির্ভর করে না, তাই বদ্ধ রূপ যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int MOD = 998244353;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> cs(n);
    for (int& c : cs) scanf("%d", &c);
    vector<ll> f(m + 1, 0), g(m + 1, 0);
    f[0] = 1, g[0] = 1;
    for (int s = 1; s <= m; s++) {
        ll v = 0;
        for (int c : cs)
            if (c <= s) v += g[s - c];
        f[s] = v % MOD;
        ll t = 0;
        for (int i = 0; i <= s; i++) t = (t + f[i] * f[s - i]) % MOD;
        g[s] = t;
    }
    for (int s = 1; s <= m; s++) printf("%lld\n", f[s]);
    return 0;
}
`,
      time: 'O(m² + m n)',
      space: 'O(m)',
      accepted: false,
      toolkit: ['vector', 'long-long', 'modulo'],
    },
  ],
  tests: [
    { input: '2 3\n1 2', output: '1\n3\n9', source: 'sample', note: sample(1) },
    { input: '3 10\n9 4 3', output: '0\n0\n1\n1\n0\n2\n4\n2\n6\n15', source: 'sample', note: sample(2) },
    { input: '1 5\n1', output: '1\n2\n5\n14\n42', source: 'own', note: L('Only weight 1: Catalan numbers.', 'শুধু ওজন ১: ক্যাটালান সংখ্যা।') },
  ],
  pitfalls: [
    L('Forgetting that the empty tree counts as f(0) = 1 inside the equation although it is not printed.', 'সমীকরণের ভেতরে ফাঁকা ট্রি f(০) = ১ ধরা ভুলে যাওয়া, যদিও তা প্রিন্ট হয় না।'),
    L('Taking the wrong sign of the square root: 1 + √(1 − 4C) has constant term 2, while 1 − √ would not be invertible.', 'বর্গমূলের ভুল চিহ্ন: ১ + √(১ − ৪C)-র ধ্রুব পদ ২, আর ১ − √ বিপরীতযোগ্য হতো না।'),
    L('In the online version, counting ordered pairs once instead of twice when the earlier part is strictly shorter than the new block.', 'অনলাইন সংস্করণে আগের অংশ নতুন ব্লকের চেয়ে কঠোরভাবে ছোট হলে ক্রমিক জোড়া দুবারের বদলে একবার গোনা।'),
  ],
  related: [
    { id: '660F', name: 'Bear and Bowling 4', why: L('Divide and conquer over an index with a structure on the halves.', 'সূচকের ওপর ডিভাইড অ্যান্ড কনকার, অর্ধ দুটিতে কাঠামোসহ।') },
    { id: '1100F', name: 'Ivan and Burgers', why: L('Another divide and conquer that combines two precomputed halves.', 'আরেকটি ডিভাইড অ্যান্ড কনকার যা আগে-হিসাব-করা দুই অর্ধ মেলায়।') },
  ],
  toolkit: ['mod-pow', 'mod-arith'],
};
