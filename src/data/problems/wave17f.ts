import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

// ───────────────────────────────────────────── 455C
export const p455C: ProblemEntry = {
  id: '455C',
  contestId: 455,
  index: 'C',
  name: 'Civilization',
  rating: 2100,
  tags: ['dfs', 'dp', 'dsu', 'ternary-search', 'trees'],
  why: L(
    'The best way to join two trees to keep the diameter small is to connect their centres. That makes the new diameter a closed formula in the two old diameters, so a DSU that stores one number per component answers everything.',
    'ব্যাস ছোট রাখতে দুটি গাছ জোড়ার সেরা উপায় তাদের কেন্দ্র দুটি জোড়া। তাই নতুন ব্যাস পুরোনো দুই ব্যাসের একটি বদ্ধ সূত্র, আর প্রতি কম্পোনেন্টে একটি সংখ্যা রাখা DSU-ই সব উত্তর দেয়।',
  ),
  statement: L(
    'There are n cities and m roads, and the road system is a forest (between two cities there is at most one path). You get q queries. Type 1 x: print the length of the longest path in the component of city x. Type 2 x y: if x and y are in different components, add one road between a city of x’s component and a city of y’s component so that the longest path in the merged component is as short as possible; otherwise do nothing.',
    'n টি শহর আর m টি সড়ক, সড়কব্যবস্থা একটি বন (দুই শহরের মধ্যে সর্বোচ্চ একটি পথ)। q টি কোয়েরি। ধরন ১ x: শহর x-এর কম্পোনেন্টের দীর্ঘতম পথের দৈর্ঘ্য প্রিন্ট করো। ধরন ২ x y: x আর y ভিন্ন কম্পোনেন্টে থাকলে x-এর কম্পোনেন্টের একটি আর y-এর কম্পোনেন্টের একটি শহরের মাঝে একটি সড়ক যোগ করো যাতে মিলিত কম্পোনেন্টের দীর্ঘতম পথ যথাসম্ভব ছোট হয়; নয়তো কিছু করো না।',
  ),
  input: L('n m q, then m roads, then q queries.', 'n m q, তারপর m টি সড়ক, তারপর q টি কোয়েরি।'),
  output: L('One line per query of type 1.', 'ধরন ১-এর প্রতিটি কোয়েরির জন্য এক লাইন।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 3·10⁵, 0 ≤ m < n, 1 ≤ q ≤ 3·10⁵', '১ ≤ n ≤ ৩·১০⁵, ০ ≤ m < n, ১ ≤ q ≤ ৩·১০⁵')] },
  samples: [
    { input: '6 0 6\n2 1 2\n2 3 4\n2 5 6\n2 3 2\n2 5 3\n1 1', output: '4', explain: L('Pairs have diameter 1; joining two of them gives 1 + 1 + 1 = 3; joining that to the last pair gives 1 + 2 + 1 = 4.', 'জোড়ার ব্যাস ১; দুটি জুড়লে ১ + ১ + ১ = ৩; তা শেষ জোড়ার সঙ্গে জুড়লে ১ + ২ + ১ = ৪।') },
  ],
  observation: L(
    'In a tree with diameter d every vertex is within ⌈d / 2⌉ of the tree’s centre. Joining centre to centre gives a longest path through the new edge of ⌈d₁ / 2⌉ + 1 + ⌈d₂ / 2⌉; the new diameter is the maximum of that and the two old diameters. No other pair of cities does better, because any join has a path of length at least ⌈d₁ / 2⌉ + 1 + ⌈d₂ / 2⌉ through the new road.',
    'ব্যাস d-র গাছে প্রতিটি শীর্ষ কেন্দ্র থেকে ⌈d / ২⌉-এর মধ্যে। কেন্দ্র থেকে কেন্দ্রে জুড়লে নতুন সড়ক দিয়ে দীর্ঘতম পথ ⌈d₁ / ২⌉ + ১ + ⌈d₂ / ২⌉; নতুন ব্যাস এর আর দুই পুরোনো ব্যাসের সর্বোচ্চ। অন্য কোনো জোড়া এর চেয়ে ভালো নয়, কারণ যেকোনো জোড়ায় নতুন সড়ক দিয়ে অন্তত ⌈d₁ / ২⌉ + ১ + ⌈d₂ / ২⌉ দৈর্ঘ্যের পথ থাকে।',
  ),
  approach: [
    L('Build the initial forest with a DSU and compute each tree’s diameter with two breadth-first searches (or one DP pass).', 'DSU দিয়ে শুরুর বন বানাও আর প্রতিটি গাছের ব্যাস দুটি BFS-এ (বা এক DP পাসে) বের করো।'),
    L('Store the diameter at each DSU root.', 'প্রতিটি DSU রুটে ব্যাস রাখো।'),
    L('On a merge set the new diameter to max(d₁, d₂, ⌈d₁ / 2⌉ + ⌈d₂ / 2⌉ + 1). A type 1 query just reads the root’s value.', 'মার্জে নতুন ব্যাস = max(d₁, d₂, ⌈d₁ / ২⌉ + ⌈d₂ / ২⌉ + ১)। ধরন ১ কোয়েরি শুধু রুটের মান পড়ে।'),
  ],
  walkthrough: {
    input: 'merge a tree of diameter 3 with a tree of diameter 1',
    steps: [
      { state: '⌈3 / 2⌉ = 2 and ⌈1 / 2⌉ = 1', text: L('Distances from each centre to its farthest vertex.', 'প্রতিটি কেন্দ্র থেকে সবচেয়ে দূরের শীর্ষের দূরত্ব।') },
      { state: '2 + 1 + 1 = 4', text: L('The path through the new road.', 'নতুন সড়ক দিয়ে পথ।') },
      { state: 'max(3, 1, 4) = 4', text: L('The merged diameter.', 'মিলিত ব্যাস।') },
    ],
  },
  complexity: { time: 'O((n + q) α(n))', space: 'O(n)', why: L('Linear initial work, then nearly constant per query.', 'শুরুর কাজ রৈখিক, তারপর প্রতি কোয়েরি প্রায় ধ্রুবক।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('Double BFS for diameters, DSU for the merges', 'ব্যাসের জন্য ডাবল BFS, মার্জের জন্য DSU'),
      idea: L('Farthest vertex from anywhere is a diameter end; BFS again from it.', 'যেকোনো স্থান থেকে সবচেয়ে দূরের শীর্ষ ব্যাসের প্রান্ত; সেখান থেকে আবার BFS।'),
      explain: [L('The recursion-free BFS keeps a 3·10⁵-deep path from overflowing the stack. After the initial diameters, a merge is O(1) with the closed formula.', 'রিকার্সনহীন BFS ৩·১০⁵ গভীর পথে স্ট্যাক ওভারফ্লো আটকায়। শুরুর ব্যাসের পর বদ্ধ সূত্রে মার্জ O(১)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int par[300005], dia[300005];
vector<int> adj[300005];

int find(int x) {
    while (par[x] != x) par[x] = par[par[x]], x = par[x];
    return x;
}

int main() {
    int n, m, q;
    scanf("%d %d %d", &n, &m, &q);
    for (int i = 1; i <= n; i++) par[i] = i;
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b), adj[b].push_back(a);
        par[find(a)] = find(b);
    }
    vector<int> d1(n + 1, -1), d2(n + 1, -1);
    for (int s = 1; s <= n; s++) {
        if (d1[s] != -1) continue;
        vector<int> comp = {s};
        d1[s] = 0;
        for (size_t h = 0; h < comp.size(); h++)
            for (int w : adj[comp[h]])
                if (d1[w] == -1) d1[w] = d1[comp[h]] + 1, comp.push_back(w);
        int far = comp.back();  // BFS order: the last vertex is the farthest
        vector<int> q2 = {far};
        d2[far] = 0;
        for (size_t h = 0; h < q2.size(); h++)
            for (int w : adj[q2[h]])
                if (d2[w] == -1) d2[w] = d2[q2[h]] + 1, q2.push_back(w);
        dia[find(s)] = d2[q2.back()];
    }
    while (q--) {
        int t, x, y;
        scanf("%d %d", &t, &x);
        if (t == 1) printf("%d\n", dia[find(x)]);
        else {
            scanf("%d", &y);
            int a = find(x), b = find(y);
            if (a == b) continue;
            int nd = max({dia[a], dia[b], (dia[a] + 1) / 2 + (dia[b] + 1) / 2 + 1});
            par[a] = b, dia[b] = nd;
        }
    }
    return 0;
}
`,
      time: 'O((n + q) α(n))',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'io-basics'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('Tree DP for the diameters', 'ব্যাসের জন্য ট্রি DP'),
      idea: L('Process vertices from the leaves up, keeping the two tallest child heights.', 'পাতা থেকে ওপরে শীর্ষ প্রক্রিয়া করো, দুটি সবচেয়ে উঁচু সন্তানের উচ্চতা রেখে।'),
      explain: [L('The diameter through v is h₁ + h₂ of its two tallest children (+1 each). A BFS order from any root gives parents before children, so walking it backwards needs no recursion. The merge part is the same closed formula.', 'v দিয়ে ব্যাস হলো দুই সবচেয়ে উঁচু সন্তানের h₁ + h₂ (প্রতিটিতে +১)। যেকোনো রুট থেকে BFS ক্রমে অভিভাবক আগে আসে, তাই উল্টো চললে রিকার্সন লাগে না। মার্জ অংশ একই সূত্র।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int par[300005], dia[300005];
vector<int> adj[300005];

int find(int x) {
    while (par[x] != x) par[x] = par[par[x]], x = par[x];
    return x;
}

int main() {
    int n, m, q;
    scanf("%d %d %d", &n, &m, &q);
    for (int i = 1; i <= n; i++) par[i] = i;
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b), adj[b].push_back(a);
        par[find(a)] = find(b);
    }
    vector<int> pr(n + 1, 0), h(n + 1, 0);
    vector<char> seen(n + 1, 0);
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        vector<int> order = {s};
        seen[s] = 1;
        for (size_t i = 0; i < order.size(); i++)
            for (int w : adj[order[i]])
                if (!seen[w]) seen[w] = 1, pr[w] = order[i], order.push_back(w);
        int best = 0;
        vector<int> top1(n + 1, 0), top2(n + 1, 0);
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int v = order[i];
            best = max(best, top1[v] + top2[v]);
            if (i == 0) break;
            int up = top1[v] + 1, p = pr[v];
            if (up > top1[p]) top2[p] = top1[p], top1[p] = up;
            else if (up > top2[p]) top2[p] = up;
        }
        dia[find(s)] = best;
    }
    while (q--) {
        int t, x, y;
        scanf("%d %d", &t, &x);
        if (t == 1) printf("%d\n", dia[find(x)]);
        else {
            scanf("%d", &y);
            int a = find(x), b = find(y);
            if (a == b) continue;
            int nd = max({dia[a], dia[b], (dia[a] + 1) / 2 + (dia[b] + 1) / 2 + 1});
            par[a] = b, dia[b] = nd;
        }
    }
    return 0;
}
`,
      time: 'O((n + q) α(n))',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every pair of cities to join', 'জোড়ার জন্য প্রতিটি শহরজোড়া'),
      idea: L('For a merge, test all (u, v) pairs, compute the resulting diameter by BFS from every vertex, keep the best.', 'মার্জে সব (u, v) জোড়া পরীক্ষা করো, প্রতিটি শীর্ষ থেকে BFS-এ ফলাফলের ব্যাস বের করো, সেরাটি রাখো।'),
      explain: [L('It never trusts the “join the centres” formula — it really adds the best road. Only for tiny forests.', 'এটি “কেন্দ্র জোড়া” সূত্রে ভরসা করে না — সত্যিই সেরা সড়কটি যোগ করে। শুধু ছোট বনের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> adj;

vector<int> comp_of(int s) {
    vector<int> seen(n + 1, 0), c = {s};
    seen[s] = 1;
    for (size_t i = 0; i < c.size(); i++)
        for (int w : adj[c[i]])
            if (!seen[w]) seen[w] = 1, c.push_back(w);
    return c;
}

int diameter(const vector<int>& c) {
    int best = 0;
    for (int s : c) {
        vector<int> d(n + 1, -1), qu = {s};
        d[s] = 0;
        for (size_t i = 0; i < qu.size(); i++)
            for (int w : adj[qu[i]])
                if (d[w] == -1) d[w] = d[qu[i]] + 1, qu.push_back(w);
        for (int v : qu) best = max(best, d[v]);
    }
    return best;
}

int main() {
    int m, q;
    scanf("%d %d %d", &n, &m, &q);
    adj.assign(n + 1, {});
    for (int i = 0; i < m; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b), adj[b].push_back(a);
    }
    while (q--) {
        int t, x, y;
        scanf("%d %d", &t, &x);
        if (t == 1) printf("%d\n", diameter(comp_of(x)));
        else {
            scanf("%d", &y);
            auto cx = comp_of(x);
            if (find(cx.begin(), cx.end(), y) != cx.end()) continue;
            auto cy = comp_of(y);
            int bd = INT_MAX, bu = 0, bv = 0;
            vector<int> all = cx;
            all.insert(all.end(), cy.begin(), cy.end());
            for (int u : cx)
                for (int v : cy) {
                    adj[u].push_back(v), adj[v].push_back(u);
                    int d = diameter(all);
                    adj[u].pop_back(), adj[v].pop_back();
                    if (d < bd) bd = d, bu = u, bv = v;
                }
            adj[bu].push_back(bv), adj[bv].push_back(bu);
        }
    }
    return 0;
}
`,
      time: 'exponential-ish; tiny n only',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'pair'],
    },
  ],
  tests: [
    { input: '6 0 6\n2 1 2\n2 3 4\n2 5 6\n2 3 2\n2 5 3\n1 1', output: '4', source: 'sample', note: sample(1) },
    { input: '5 4 1\n1 2\n2 3\n3 4\n4 5\n1 3', output: '4', source: 'own', note: L('A single path of five cities: diameter 4.', 'পাঁচ শহরের একটি পথ: ব্যাস ৪।') },
    { input: '3 0 4\n1 1\n2 1 2\n2 2 2\n1 1', output: '0\n1', source: 'own', note: L('A merge inside one component does nothing; merging two single cities gives diameter 1.', 'একই কম্পোনেন্টের ভেতরে মার্জে কিছু হয় না; দুটি একক শহর জুড়লে ব্যাস ১।') },
  ],
  pitfalls: [
    L('Recursive DFS on a 3·10⁵-long path overflows the stack: use BFS or an explicit order.', '৩·১০⁵ লম্বা পথে রিকার্সিভ DFS স্ট্যাক উপচে ফেলে: BFS বা সুস্পষ্ট ক্রম ব্যবহার করো।'),
    L('Using d₁ / 2 with floor division: the centre-to-far distance is the ceiling, (d + 1) / 2.', 'ফ্লোর ভাগে d₁ / ২: কেন্দ্র থেকে দূরের দূরত্ব সিলিং, (d + ১) / ২।'),
    L('Merging two vertices of the same component: do nothing, do not add a road.', 'একই কম্পোনেন্টের দুই শীর্ষ মার্জ করা: কিছু করো না, সড়ক যোগ করো না।'),
  ],
  related: [
    { id: '1244E', name: 'Minimizing Difference', why: L('A closed form after a small observation about structure.', 'কাঠামো নিয়ে ছোট পর্যবেক্ষণের পর বদ্ধ সূত্র।') },
    { id: '1213G', name: 'Path Queries', why: L('Another DSU that stores one aggregate per component.', 'আরেকটি DSU যা প্রতি কম্পোনেন্টে একটি সংখ্যা রাখে।') },
  ],
  toolkit: ['vector'],
};

// ───────────────────────────────────────────── 2020C
export const p2020C: ProblemEntry = {
  id: '2020C',
  contestId: 2020,
  index: 'C',
  name: 'Bitwise Balancing',
  rating: 1600,
  tags: ['bitmasks', 'implementation', 'math', 'schedules', 'ternary-search'],
  why: L(
    'The equation (a | b) − (a & c) = d never carries or borrows between bits, so every bit is its own tiny puzzle with eight cases. Solve the eight cases once and the whole problem is one bit trick.',
    'সমীকরণ (a | b) − (a & c) = d-তে বিটগুলোর মধ্যে ক্যারি বা বরো নেই, তাই প্রতিটি বিট নিজেই আট কেসের ছোট ধাঁধা। আটটি কেস একবার সমাধান করলেই পুরো সমস্যা এক বিট-কৌশল।',
  ),
  statement: L(
    'Given non-negative integers b, c and d, find any non-negative integer a ≤ 2⁶¹ such that (a | b) − (a & c) = d, or print −1 if there is none. Here | is bitwise OR and & is bitwise AND. There are t test cases.',
    'অঋণাত্মক পূর্ণসংখ্যা b, c, d দেওয়া। এমন একটি অঋণাত্মক পূর্ণসংখ্যা a ≤ ২⁶¹ বের করো যাতে (a | b) − (a & c) = d, না থাকলে −১ প্রিন্ট করো। এখানে | বিটওয়াইজ OR আর & বিটওয়াইজ AND। t টি টেস্ট কেস।',
  ),
  input: L('t, then t lines with b, c, d.', 't, তারপর t লাইনে b, c, d।'),
  output: L('For each test case any valid a, or −1.', 'প্রতিটি টেস্ট কেসে যেকোনো বৈধ a, বা −১।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ t ≤ 10⁵, 0 ≤ b, c, d ≤ 10¹⁸; a checker accepts any valid a', '১ ≤ t ≤ ১০⁵, ০ ≤ b, c, d ≤ ১০¹⁸; চেকার যেকোনো বৈধ a গ্রহণ করে')] },
  samples: [
    { input: '3\n2 2 2\n4 2 6\n10 2 14', output: '0\n-1\n12', explain: L('a = 0 works for the first; the second is impossible; for the third 12 (or 4) works.', 'প্রথমটিতে a = ০ কাজ করে; দ্বিতীয়টি অসম্ভব; তৃতীয়টিতে ১২ (বা ৪) কাজ করে।') },
  ],
  observation: L(
    'Look at one bit with values (bᵢ, cᵢ, dᵢ) and choose aᵢ ∈ {0, 1}. The bit of (a | b) − (a & c) is (aᵢ | bᵢ) − (aᵢ & cᵢ), which is always 0 or 1 because a | b contains a & c. So the number is just built bit by bit. The eight cases: (0,0,0)→0, (0,0,1)→1, (0,1,0)→0, (0,1,1)→impossible, (1,0,0)→impossible, (1,0,1)→0 or 1, (1,1,0)→1, (1,1,1)→0.',
    'একটি বিটে (bᵢ, cᵢ, dᵢ) নিয়ে aᵢ ∈ {০, ১} বাছো। (a | b) − (a & c)-র বিট (aᵢ | bᵢ) − (aᵢ & cᵢ), যা সবসময় ০ বা ১ কারণ a | b-তে a & c থাকে। তাই সংখ্যাটি শুধু বিট ধরে ধরে বানানো। আট কেস: (০,০,০)→০, (০,০,১)→১, (০,১,০)→০, (০,১,১)→অসম্ভব, (১,০,০)→অসম্ভব, (১,০,১)→০ বা ১, (১,১,০)→১, (১,১,১)→০।',
  ),
  approach: [
    L('For each of the 61 bits, read the three bits and apply the table above.', '৬১টি বিটের প্রতিটির জন্য তিনটি বিট পড়ে উপরের সারণি প্রয়োগ করো।'),
    L('If any bit is impossible print −1.', 'কোনো বিট অসম্ভব হলে −১ প্রিন্ট করো।'),
    L('Otherwise print the assembled a. As bits above 60 of b, c, d are zero, a stays below 2⁶¹.', 'নয়তো তৈরি a প্রিন্ট করো। b, c, d-র ৬০-এর ওপরের বিট শূন্য, তাই a ২⁶¹-এর নিচে থাকে।'),
  ],
  walkthrough: {
    input: 'b = 4 (100), c = 2 (010), d = 6 (110)',
    steps: [
      { state: 'bit 2: (1, 0, 1)', text: L('Either a bit works; take 0.', 'যেকোনো a বিট চলে; ০ নাও।') },
      { state: 'bit 1: (0, 1, 1)', text: L('(a | 0) − (a & 1) = 0 for either a: it cannot be 1. Impossible → −1.', 'যেকোনো a-র জন্য (a | ০) − (a & ১) = ০: ১ হতে পারে না। অসম্ভব → −১।') },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: L('At most 61 bit steps, or a handful of word operations with the bit trick.', 'সর্বোচ্চ ৬১ বিট-ধাপ, বা বিট-কৌশলে হাতেগোনা শব্দ-অপারেশন।') },
  solutions: [
    {
      id: 'trick',
      kind: 'optimal',
      title: L('Whole-word bit trick', 'পুরো শব্দের বিট-কৌশল'),
      idea: L('a = (~b & ~c & d) | (b & c & ~d); impossible if (b & ~c & ~d) | (~b & c & d) is non-zero.', 'a = (~b & ~c & d) | (b & c & ~d); (b & ~c & ~d) | (~b & c & d) অশূন্য হলে অসম্ভব।'),
      explain: [L('The eight-case table written as masks. Bits where both ~b and ~c are set and d is 1 need a = 1; bits where b = c = 1 and d = 0 need a = 1; all other possible bits can keep a = 0. Everything is masked to 61 bits so the result never exceeds 2⁶¹.', 'আট কেসের সারণি মাস্ক হিসেবে লেখা। যে বিটে ~b আর ~c দুটিই সেট আর d = ১, সেখানে a = ১; যেখানে b = c = ১ আর d = ০, সেখানে a = ১; বাকি সম্ভব বিটে a = ০ রাখা যায়। সব ৬১ বিটে মাস্ক করা, তাই ফল ২⁶¹ ছাড়ায় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef unsigned long long ull;

int main() {
    int t;
    scanf("%d", &t);
    const ull M = (1ULL << 61) - 1;
    while (t--) {
        ull b, c, d;
        scanf("%llu %llu %llu", &b, &c, &d);
        ull bad = ((b & ~c & ~d) | (~b & c & d)) & M;
        if (bad) puts("-1");
        else printf("%llu\n", ((~b & ~c & d) | (b & c & ~d)) & M);
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'bit-shift'],
    },
    {
      id: 'bits',
      kind: 'better',
      title: L('Bit-by-bit loop', 'বিট ধরে ধরে লুপ'),
      idea: L('Check all eight (b, c, d) cases per bit and set aᵢ accordingly.', 'প্রতি বিটে আট (b, c, d) কেস দেখে aᵢ ঠিক করো।'),
      explain: [L('The same table without bit-mask cleverness: easier to write correctly under pressure, and the loop makes the “no carries” fact explicit.', 'বিট-মাস্কের কৌশল ছাড়া একই সারণি: চাপের মধ্যে ঠিকঠাক লেখা সহজ, আর লুপ “ক্যারি নেই” তথ্যটি স্পষ্ট করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll b, c, d;
        scanf("%lld %lld %lld", &b, &c, &d);
        ll a = 0;
        bool ok = true;
        for (int i = 0; i < 61 && ok; i++) {
            int bi = b >> i & 1, ci = c >> i & 1, di = d >> i & 1;
            int pick = -1;
            for (int ai = 0; ai < 2 && pick < 0; ai++)
                if (((ai | bi) - (ai & ci)) == di) pick = ai;
            if (pick < 0) ok = false;
            else a |= (ll)pick << i;
        }
        if (ok) printf("%lld\n", a);
        else puts("-1");
    }
    return 0;
}
`,
      time: 'O(61) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'for-loop', 'break-continue'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every small a', 'প্রতিটি ছোট a চেষ্টা'),
      idea: L('For small b, c, d every needed bit of a is below 12, so test all a < 4096.', 'ছোট b, c, d-তে a-র দরকারি প্রতিটি বিট ১২-র নিচে, তাই সব a < ৪০৯৬ পরীক্ষা।'),
      explain: [L('Direct from the statement. It cannot cope with 10¹⁸, which is the lesson: the answer only depends on one bit at a time, so we should not enumerate numbers.', 'সরাসরি প্রবলেম-বিবরণ থেকে। ১০¹৮ সামলাতে পারে না, আর সেটাই শিক্ষা: উত্তর একবারে একটি বিটের ওপর নির্ভর করে, তাই সংখ্যা গোনা উচিত নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        ll b, c, d;
        scanf("%lld %lld %lld", &b, &c, &d);
        ll ans = -1;
        for (ll a = 0; a < 4096 && ans < 0; a++)
            if (((a | b) - (a & c)) == d) ans = a;
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(4096) per test',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop', 'long-long'],
    },
  ],
  tests: [
    { input: '3\n2 2 2\n4 2 6\n10 2 14', output: '0\n-1\n12', source: 'sample', note: sample(1) },
    { input: '1\n0 0 0', output: '0', source: 'own', note: L('Everything zero: a = 0.', 'সব শূন্য: a = ০।') },
    { input: '1\n0 0 1000000000000000000', output: '1000000000000000000', source: 'own', note: L('With b = c = 0 the only answer is a = d.', 'b = c = ০ হলে একমাত্র উত্তর a = d।') },
  ],
  pitfalls: [
    L('Using signed 64-bit ~: the complement sets the sign bit and breaks the 2⁶¹ limit — mask the answer to 61 bits.', 'স্বাক্ষরিত ৬৪-বিট ~: পরিপূরক সাইন-বিট সেট করে আর ২⁶¹ সীমা ভাঙে — উত্তর ৬১ বিটে মাস্ক করো।'),
    L('Believing there might be borrows between bits: (a | b) always contains (a & c), so each bit difference is 0 or 1.', 'বিটের মধ্যে বরো আছে ভাবা: (a | b)-তে সবসময় (a & c) থাকে, তাই প্রতি বিটের পার্থক্য ০ বা ১।'),
    L('Printing a for the impossible case instead of −1 when any bit conflicts.', 'কোনো বিটে দ্বন্দ্ব থাকলে −১-এর বদলে a প্রিন্ট করা।'),
  ],
  related: [
    { id: '1312C', name: 'Adding Powers', why: L('Another “look at the answer one digit at a time” problem.', 'আরেকটি “উত্তর একটি অঙ্ক করে দেখো” সমস্যা।') },
    { id: '1978B', name: 'New Bakery', why: L('A small case analysis that ends in one formula.', 'ছোট কেস বিশ্লেষণ যা এক সূত্রে শেষ হয়।') },
  ],
  toolkit: ['bitwise-and', 'bit-shift'],
};

// ───────────────────────────────────────────── 98C
export const p98C: ProblemEntry = {
  id: '98C',
  contestId: 98,
  index: 'C',
  name: 'Help Greg the Dwarf',
  rating: 2100,
  tags: ['geometry', 'ternary-search'],
  featuredFor: ['ternary-search'],
  why: L(
    'Pushing a long coffin around a corner is limited by the tightest moment of the turn. That tightest moment is the minimum of a smooth function of the angle — a one-dimensional minimum that ternary search finds directly.',
    'লম্বা কফিন কোণ ঘোরানোর সীমা মোড়ের সবচেয়ে সংকীর্ণ মুহূর্ত। সেই মুহূর্ত কোণের মসৃণ ফাংশনের ন্যূনতম — যা টারনারি সার্চ সরাসরি খুঁজে দেয়।',
  ),
  statement: L(
    'Two corridors of widths a and b meet at a right angle. Greg has a coffin that is a rectangle with length l and some width w (w ≤ l); you choose w. Find the largest w so that the coffin can be carried through the corner without leaving the corridors, or print that it is impossible when w would be below 10⁻⁸.',
    'a আর b প্রস্থের দুটি করিডর সমকোণে মিলেছে। গ্রেগের কফিন দৈর্ঘ্য l আর কোনো প্রস্থ w (w ≤ l)-এর আয়তক্ষেত্র; w তুমি বাছো। সবচেয়ে বড় w বের করো যাতে করিডরের বাইরে না গিয়ে কোণ পেরিয়ে কফিন নেওয়া যায়, নয়তো w ১০⁻⁸-এর নিচে হলে অসম্ভব বলে প্রিন্ট করো।',
  ),
  input: L('a, b and l.', 'a, b আর l।'),
  output: L('The largest width with error up to 10⁻⁷, or “My poor head =(”.', 'সবচেয়ে বড় প্রস্থ, ত্রুটি ১০⁻⁷ পর্যন্ত, নয়তো “My poor head =(”।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ a, b, l ≤ 10⁴', '১ ≤ a, b, l ≤ ১০⁴')] },
  samples: [
    { input: '2 2 1', output: '1.0000000', explain: L('l ≤ both widths: the coffin can lie across with width l.', 'l দুই প্রস্থেরই ছোট: কফিন আড়াআড়ি শুইয়ে প্রস্থ l।') },
    { input: '2 2 2', output: '2.0000000', explain: L('l = 2 = a: still a square coffin fits.', 'l = ২ = a: এখনও বর্গাকার কফিন ঢোকে।') },
    { input: '2 2 3', output: '1.3284271', explain: L('The tightest angle is 45°: 2·0.7071 + 2·0.7071 − 3·0.5 = 1.3284.', 'সবচেয়ে সংকীর্ণ কোণ ৪৫°: ২·০.৭০৭১ + ২·০.৭০৭১ − ৩·০.৫ = ১.৩২৮৪।') },
    { input: '2 2 6', output: 'My poor head =(', explain: L('The coffin is too long to turn at all.', 'কফিন এত লম্বা যে ঘোরানোই যায় না।') },
  ],
  observation: L(
    'Fix the coffin’s long side as a segment of length l touching the outer walls, tilted at an angle θ. Its distance from the inner corner is f(θ) = a·cos θ + b·sin θ − l·sin θ·cos θ, and the coffin has to pass every θ, so w = min over θ of f(θ). The result also cannot exceed l, and if l is no longer than one of the corridors there is no turn to make at all.',
    'কফিনের লম্বা বাহুকে l দৈর্ঘ্যের রেখাংশ ধরো যা বাইরের দেয়াল ছুঁয়ে আছে, কোণ θ-তে হেলানো। ভেতরের কোণ থেকে তার দূরত্ব f(θ) = a·cos θ + b·sin θ − l·sin θ·cos θ, আর কফিনকে প্রতিটি θ পেরোতে হয়, তাই w = সব θ-র ওপর f(θ)-র ন্যূনতম। ফল l-র বেশি হতে পারে না, আর l এক করিডরের চেয়ে বড় না হলে মোড় ঘোরানোর দরকারই নেই।',
  ),
  approach: [
    L('If l ≤ b the answer is min(a, l); else if l ≤ a it is min(b, l).', 'l ≤ b হলে উত্তর min(a, l); নয়তো l ≤ a হলে min(b, l)।'),
    L('Otherwise ternary search θ in [0, π / 2] for the minimum of f(θ).', 'নয়তো [০, π / ২]-এ θ-র টারনারি সার্চে f(θ)-র ন্যূনতম।'),
    L('Take min(f, l); if it is below 10⁻⁸ print the poor-head message.', 'min(f, l) নাও; ১০⁻⁸-এর নিচে হলে poor-head বার্তা প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'a = b = 2, l = 3',
    steps: [
      { state: 'f(0) = 2, f(π / 2) = 2', text: L('At the ends the coffin hugs one wall.', 'দুই প্রান্তে কফিন এক দেয়াল জড়িয়ে থাকে।') },
      { state: 'f(π / 4) = 2.828 − 1.5 = 1.328', text: L('The middle is lower: that is the minimum.', 'মাঝখানে নিচু: সেটাই ন্যূনতম।') },
    ],
  },
  complexity: { time: 'O(iterations)', space: 'O(1)', why: L('A hundred ternary rounds are plenty.', 'একশ টারনারি রাউন্ডই যথেষ্ট।') },
  solutions: [
    {
      id: 'ternary',
      kind: 'optimal',
      title: L('Ternary search the angle', 'কোণে টারনারি সার্চ'),
      idea: L('f(θ) = a cos θ + b sin θ − l sin θ cos θ is unimodal on [0, π / 2] when l > a, b.', 'l > a, b হলে [০, π / ২]-এ f(θ) এক-শীর্ষক।'),
      explain: [L('Take the clear cases first (the coffin fits along a corridor), then search the angle with long double and 200 iterations. The final min with l covers coffins whose width cannot exceed their length.', 'আগে স্পষ্ট কেস (কফিন করিডর বরাবর ঢোকে), তারপর long double আর ২০০ ধাপে কোণ খোঁজো। শেষে l-র সঙ্গে min সেই কফিনগুলো সামলায় যাদের প্রস্থ দৈর্ঘ্য ছাড়ায় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    ld a, b, l;
    scanf("%Lf %Lf %Lf", &a, &b, &l);
    ld ans;
    if (l <= b) ans = min(a, l);
    else if (l <= a) ans = min(b, l);
    else {
        auto f = [&](ld t) { return a * cosl(t) + b * sinl(t) - l * sinl(t) * cosl(t); };
        ld lo = 0, hi = acosl(-1.0L) / 2;
        for (int it = 0; it < 200; it++) {
            ld m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (f(m1) < f(m2)) hi = m2;
            else lo = m1;
        }
        ans = min(f((lo + hi) / 2), l);
    }
    if (ans < 1e-8L) puts("My poor head =(");
    else printf("%.7Lf\n", ans);
    return 0;
}
`,
      time: 'O(200)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'lambda'],
    },
    {
      id: 'refine',
      kind: 'method',
      title: L('Coarse grid, then zoom in', 'মোটা গ্রিড, তারপর জুম'),
      idea: L('Sample the angle on a grid, take the best point, and refine around it.', 'কোণ গ্রিডে নমুনা নাও, সেরা বিন্দু ধরে তার চারপাশে ঘন করো।'),
      explain: [L('This does not assume the function is unimodal; it only needs the grid to be fine enough to land in the right valley. Each refinement shrinks the window by 100×.', 'ফাংশন এক-শীর্ষক ধরে না; শুধু গ্রিড এত ঘন হতে হবে যাতে সঠিক উপত্যকায় পড়ে। প্রতি পরিমার্জনে জানালা ১০০ গুণ ছোট হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    ld a, b, l;
    scanf("%Lf %Lf %Lf", &a, &b, &l);
    ld ans;
    if (l <= b) ans = min(a, l);
    else if (l <= a) ans = min(b, l);
    else {
        auto f = [&](ld t) { return a * cosl(t) + b * sinl(t) - l * sinl(t) * cosl(t); };
        ld lo = 0, hi = acosl(-1.0L) / 2, best = 1e30L;
        for (int round = 0; round < 12; round++) {
            ld bt = lo;
            best = 1e30L;
            for (int i = 0; i <= 1000; i++) {
                ld t = lo + (hi - lo) * i / 1000;
                if (f(t) < best) best = f(t), bt = t;
            }
            ld w = (hi - lo) / 100;
            lo = max((ld)0, bt - w), hi = min(acosl(-1.0L) / 2, bt + w);
        }
        ans = min(best, l);
    }
    if (ans < 1e-8L) puts("My poor head =(");
    else printf("%.7Lf\n", ans);
    return 0;
}
`,
      time: 'O(12 000)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'lambda', 'for-loop'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Dense sampling of the angle', 'কোণের ঘন নমুনা'),
      idea: L('Evaluate f on two million equally spaced angles and keep the minimum.', 'বিশ লক্ষ সমদূরবর্তী কোণে f মূল্যায়ন করে ন্যূনতম রাখো।'),
      explain: [L('Accurate to about 10⁻¹² and independent of any search logic; slow only because it is thorough.', 'প্রায় ১০⁻¹² নির্ভুল আর কোনো সার্চ-যুক্তির ওপর নির্ভর করে না; ধীর কারণ এটি পুঙ্খানুপুঙ্খ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long double ld;

int main() {
    ld a, b, l;
    scanf("%Lf %Lf %Lf", &a, &b, &l);
    ld ans;
    if (l <= b) ans = min(a, l);
    else if (l <= a) ans = min(b, l);
    else {
        ld best = 1e30L, pi2 = acosl(-1.0L) / 2;
        const int K = 2000000;
        for (int i = 0; i <= K; i++) {
            ld t = pi2 * i / K;
            best = min(best, a * cosl(t) + b * sinl(t) - l * sinl(t) * cosl(t));
        }
        ans = min(best, l);
    }
    if (ans < 1e-8L) puts("My poor head =(");
    else printf("%.7Lf\n", ans);
    return 0;
}
`,
      time: 'O(2·10⁶)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['setprecision', 'for-loop'],
    },
  ],
  tests: [
    { input: '2 2 1', output: '1.0000000', source: 'sample', note: sample(1) },
    { input: '2 2 2', output: '2.0000000', source: 'sample', note: sample(2) },
    { input: '2 2 3', output: '1.3284271', source: 'sample', note: sample(3) },
    { input: '2 2 6', output: 'My poor head =(', source: 'sample', note: sample(4) },
    { input: '1 10000 1', output: '1.0000000', source: 'own', note: L('Short coffin, one narrow corridor: width l.', 'ছোট কফিন, একটি সরু করিডর: প্রস্থ l।') },
  ],
  pitfalls: [
    L('Ternary searching without the early cases: when l ≤ a or l ≤ b the minimum sits at an end and the cheap answer is exact.', 'আগের কেস ছাড়া টারনারি সার্চ: l ≤ a বা l ≤ b হলে ন্যূনতম প্রান্তে আর সহজ উত্তরই সঠিক।'),
    L('Forgetting the cap w ≤ l.', 'w ≤ l সীমা ভুলে যাওয়া।'),
    L('Printing the message for a width near but above 10⁻⁸ because of float noise: keep long double and compare with 10⁻⁸ only at the end.', 'ফ্লোট ত্রুটিতে ১০⁻⁸-এর একটু ওপরের প্রস্থেও বার্তা প্রিন্ট: long double রাখো আর শেষে ১০⁻⁸-এর সঙ্গে তুলনা করো।'),
  ],
  related: [
    { id: '613A', name: 'Peter and Snow Blower', why: L('A geometric minimum found per edge, by projection or by ternary search.', 'প্রতি কিনারায় পাওয়া জ্যামিতিক ন্যূনতম, প্রজেকশনে বা টারনারি সার্চে।') },
    { id: '1059D', name: 'Nature Reserve', why: L('A real-valued convex minimisation with a feasibility twist.', 'সম্ভাব্যতার মোড়সহ বাস্তব-মানের উত্তল ন্যূনতমকরণ।') },
  ],
  toolkit: ['setprecision'],
};

// ───────────────────────────────────────────── 1316C
export const p1316C: ProblemEntry = {
  id: '1316C',
  contestId: 1316,
  index: 'C',
  name: 'Primitive Primes',
  rating: 1700,
  tags: ['constructive', 'math', 'ternary-search'],
  why: L(
    'A product of two polynomials has a coefficient not divisible by p whenever you multiply the first “bad” coefficient of each. No convolution is needed: two linear scans give the answer.',
    'দুটি বহুপদীর গুণফলে একটি সহগ p দিয়ে বিভাজ্য না হবেই, যদি প্রতিটির প্রথম “খারাপ” সহগ গুণ করো। কনভোলিউশন লাগে না: দুটি রৈখিক স্ক্যানই উত্তর।',
  ),
  statement: L(
    'You are given two polynomials a(x) with n coefficients and b(x) with m coefficients, and a prime p. The gcd of the coefficients of each polynomial is 1. Their product c(x) = a(x)·b(x) has coefficients c₀, c₁, …. Print any index t such that c_t is not divisible by p.',
    'n টি সহগের বহুপদী a(x), m টি সহগের বহুপদী b(x) আর একটি মৌলিক সংখ্যা p দেওয়া। প্রতিটি বহুপদীর সহগের গসাগু ১। গুণফল c(x) = a(x)·b(x)-র সহগ c₀, c₁, …। এমন যেকোনো সূচক t প্রিন্ট করো যার c_t, p দিয়ে বিভাজ্য নয়।',
  ),
  input: L('n m p, then the n coefficients of a, then the m coefficients of b.', 'n m p, তারপর a-র n টি সহগ, তারপর b-র m টি সহগ।'),
  output: L('Any valid t (a checker is used).', 'যেকোনো বৈধ t (চেকার আছে)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁶, p prime up to 10⁹, coefficients up to 10⁹', '১ ≤ n, m ≤ ১০⁶, p মৌলিক ১০⁹ পর্যন্ত, সহগ ১০⁹ পর্যন্ত')] },
  samples: [
    { input: '3 2 2\n1 1 2\n2 1', output: '1', explain: L('The product is 2 + 3x + 4x² + 2x³; c₁ = 3 is odd. Our answer is also 1 (index 0 + index 1).', 'গুণফল ২ + ৩x + ৪x² + ২x³; c₁ = ৩ বিজোড়। আমাদের উত্তরও ১ (সূচক ০ + সূচক ১)।') },
  ],
  observation: L(
    'Let i be the first index with a_i not divisible by p and j the first index with b_j not divisible by p; they exist because the gcd of each polynomial is 1. In c_{i+j} = Σ a_u·b_{i+j−u} every term except u = i has either u < i (so p | a_u) or u > i (so i + j − u < j and p | b). Only a_i·b_j remains, and p ∤ a_i·b_j since p is prime.',
    'i হলো সেই প্রথম সূচক যেখানে a_i, p দিয়ে বিভাজ্য নয়, আর j সেই প্রথম সূচক যেখানে b_j, p দিয়ে বিভাজ্য নয়; দুটিই আছে কারণ প্রতিটি বহুপদীর গসাগু ১। c_{i+j} = Σ a_u·b_{i+j−u}-র u = i ছাড়া প্রতিটি পদে হয় u < i (তাই p | a_u) নয়তো u > i (তাই i + j − u < j আর p | b)। শুধু a_i·b_j থাকে, আর p মৌলিক বলে p ∤ a_i·b_j।',
  ),
  approach: [
    L('Scan a for the first coefficient not divisible by p.', 'a-তে p দিয়ে অবিভাজ্য প্রথম সহগ স্ক্যান করো।'),
    L('Scan b the same way.', 'b-তেও একইভাবে।'),
    L('Print i + j.', 'i + j প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: 'p = 2, a = 1 1 2, b = 2 1',
    steps: [
      { state: 'i = 0', text: L('a₀ = 1 is odd.', 'a₀ = ১ বিজোড়।') },
      { state: 'j = 1', text: L('b₀ = 2 is divisible by 2; b₁ = 1 is not.', 'b₀ = ২, ২ দিয়ে বিভাজ্য; b₁ = ১ নয়।') },
      { state: 'answer 0 + 1 = 1', text: L('c₁ = a₀b₁ + a₁b₀ = 1 + 2 = 3.', 'c₁ = a₀b₁ + a₁b₀ = ১ + ২ = ৩।') },
    ],
  },
  complexity: { time: 'O(n + m)', space: 'O(1)', why: L('Two scans; the polynomials need not even be stored.', 'দুটি স্ক্যান; বহুপদী সংরক্ষণও লাগে না।') },
  solutions: [
    {
      id: 'first',
      kind: 'optimal',
      title: L('First bad coefficient of each', 'প্রতিটির প্রথম খারাপ সহগ'),
      idea: L('Answer i + j with i, j the first indices not divisible by p.', 'উত্তর i + j, যেখানে i, j হলো p দিয়ে অবিভাজ্য প্রথম সূচক।'),
      explain: [L('Reads the input in one pass and keeps only the first qualifying index of each polynomial.', 'ইনপুট এক পাসে পড়ে, প্রতিটি বহুপদীর শুধু প্রথম যোগ্য সূচকটি রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    long long p;
    scanf("%d %d %lld", &n, &m, &p);
    int i0 = -1, j0 = -1;
    for (int i = 0; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        if (i0 < 0 && x % p != 0) i0 = i;
    }
    for (int j = 0; j < m; j++) {
        long long x;
        scanf("%lld", &x);
        if (j0 < 0 && x % p != 0) j0 = j;
    }
    printf("%d\n", i0 + j0);
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Multiply the polynomials mod p', 'p মডুলোতে বহুপদী গুণ'),
      idea: L('Compute every c_t mod p by double loop and print the first non-zero one.', 'ডবল লুপে প্রতিটি c_t mod p হিসাব করে প্রথম অশূন্যটি প্রিন্ট করো।'),
      explain: [L('O(nm) — it checks the claim that some coefficient is not divisible by p, directly.', 'O(nm) — কোনো সহগ p দিয়ে অবিভাজ্য, এই দাবিটাই সরাসরি যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int main() {
    int n, m;
    ll p;
    scanf("%d %d %lld", &n, &m, &p);
    vector<ll> a(n), b(m), c(n + m - 1, 0);
    for (ll& x : a) scanf("%lld", &x), x %= p;
    for (ll& x : b) scanf("%lld", &x), x %= p;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) c[i + j] = (c[i + j] + a[i] * b[j]) % p;
    for (int t = 0; t < n + m - 1; t++)
        if (c[t] != 0) {
            printf("%d\n", t);
            return 0;
        }
    return 0;
}
`,
      time: 'O(nm)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['vector', 'for-loop', 'modulo'],
    },
  ],
  tests: [
    { input: '3 2 2\n1 1 2\n2 1', output: '1', source: 'sample', note: sample(1) },
    { input: '2 2 3\n3 1\n3 1', output: '2', source: 'own', note: L('Both first bad indices are 1, so the answer is 2: c = 9 + 6x + x², and only c₂ = 1 is not divisible by 3.', 'দুটির প্রথম খারাপ সূচক ১, তাই উত্তর ২: c = ৯ + ৬x + x², আর শুধু c₂ = ১, ৩ দিয়ে বিভাজ্য নয়।') },
  ],
  pitfalls: [
    L('Computing the product with FFT or a double loop: n, m reach 10⁶, and the answer needs no product at all.', 'FFT বা ডবল লুপে গুণফল হিসাব: n, m ১০⁶ পর্যন্ত, আর উত্তরে গুণফল লাগেই না।'),
    L('Taking the first non-zero coefficient of the product: it can be a multiple of p — only i + j is guaranteed.', 'গুণফলের প্রথম অশূন্য সহগ নেওয়া: তা p-র গুণিতক হতে পারে — শুধু i + j নিশ্চিত।'),
    L('Reading the coefficients in the wrong order: the lowest-degree coefficient comes first.', 'সহগ ভুল ক্রমে পড়া: সবচেয়ে ছোট ঘাতের সহগ আগে।'),
  ],
  related: [
    { id: '1312C', name: 'Adding Powers', why: L('Another constructive problem solved by a single clean invariant.', 'আরেকটি গঠনমূলক সমস্যা যা একটি পরিষ্কার ইনভ্যারিয়েন্টে সমাধান হয়।') },
    { id: '2020C', name: 'Bitwise Balancing', why: L('Per-component reasoning that avoids any heavy computation.', 'উপাদান ধরে ধরে যুক্তি, ভারী হিসাব এড়ায়।') },
  ],
  toolkit: ['modulo'],
};
