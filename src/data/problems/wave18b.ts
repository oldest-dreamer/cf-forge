import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const ours = L('This example is our own.', 'এই উদাহরণটি আমাদের নিজের তৈরি।');

// ───────────────────────────────────────────── 1634E
export const p1634E: ProblemEntry = {
  id: '1634E',
  contestId: 1634,
  index: 'E',
  name: 'Fair Share',
  rating: 2400,
  tags: ['constructive', 'dfs', 'graphs', 'matchings'],
  why: L(
    'Two balance rules at once (every array half and half, every value half and half) look hard to satisfy together. Drawing every element as an edge between its array and its value turns both rules into “in-degree equals out-degree”, which an Euler tour gives for free.',
    'একসাথে দুটি ভারসাম্য নিয়ম (প্রতিটি অ্যারে অর্ধেক-অর্ধেক, প্রতিটি মান অর্ধেক-অর্ধেক) মেলানো কঠিন মনে হয়। প্রতিটি উপাদানকে তার অ্যারে আর তার মানের মধ্যে একটি কিনারা আঁকলে দুটি নিয়মই হয়ে যায় “ইন-ডিগ্রি = আউট-ডিগ্রি”, যা অয়লার ট্যুর বিনা খরচে দেয়।',
  ),
  statement: L(
    'You get m arrays; array i has an even length n_i. Every value occurs an even number of times over all arrays together. Colour every element L or R so that in each array exactly half of the elements are L, and for each value exactly half of its occurrences (over all arrays) are L. A valid colouring always exists; print any.',
    'm টি অ্যারে দেওয়া আছে; i-তম অ্যারের দৈর্ঘ্য জোড় সংখ্যা n_i। সব অ্যারে মিলিয়ে প্রতিটি মান জোড় সংখ্যক বার আছে। প্রতিটি উপাদানকে L বা R রং করো যাতে প্রতিটি অ্যারেতে ঠিক অর্ধেক উপাদান L হয়, আর প্রতিটি মানের (সব অ্যারে মিলিয়ে) ঠিক অর্ধেক উপস্থিতি L হয়। বৈধ রং সবসময় আছে; যেকোনোটি প্রিন্ট করো।',
  ),
  input: L('m, then m lines: n_i followed by the n_i elements.', 'm, তারপর m লাইনে: n_i এবং তার পর n_i টি উপাদান।'),
  output: L('m lines, each a string of L and R of length n_i (a checker accepts any valid colouring).', 'm লাইন, প্রতিটি n_i দৈর্ঘ্যের L ও R-এর স্ট্রিং (চেকার যেকোনো বৈধ রং গ্রহণ করে)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n_i ≤ 2·10⁵, values up to 10⁹, every n_i even', 'Σ n_i ≤ ২·১০⁵, মান ১০⁹ পর্যন্ত, প্রতিটি n_i জোড়')] },
  samples: [
    { input: '2\n4 1 2 2 1\n2 3 3', output: 'LLRR\nLR', explain: L('Array 1 has L on one 1 and one 2 (so half of its elements) and the same for R; the value 1 is L once and R once, the value 2 too, and the pair of 3s is split as L, R. ' + ours.en, 'প্রথম অ্যারেতে একটি ১ ও একটি ২ L, বাকিগুলো R (অর্ধেক-অর্ধেক); মান ১ একবার L একবার R, মান ২-ও তাই, আর ৩-এর জোড়া L, R। ' + ours.bn) },
  ],
  observation: L(
    'Build a bipartite multigraph: one vertex per array, one vertex per distinct value, and one edge per element joining its array to its value. Every array vertex has even degree n_i and every value vertex has even degree, since values occur an even number of times. In a graph where all degrees are even the edges split into closed trails, and walking a closed trail leaves every vertex as often as it enters it. Colour an edge L when the walk goes from the array vertex to the value vertex, R when it goes the other way. Then every array has as many L as R, and every value has as many incoming (L) as outgoing (R) edges.',
    'একটি দ্বিপক্ষীয় মাল্টিগ্রাফ বানাও: প্রতিটি অ্যারের জন্য একটি শীর্ষ, প্রতিটি আলাদা মানের জন্য একটি শীর্ষ, আর প্রতিটি উপাদানের জন্য তার অ্যারে ও মানকে জোড়া একটি কিনারা। প্রতিটি অ্যারে-শীর্ষের ডিগ্রি জোড় n_i, আর মান-শীর্ষেরও ডিগ্রি জোড়, কারণ মান জোড় সংখ্যক বার আছে। সব ডিগ্রি জোড় হলে কিনারাগুলো বদ্ধ ট্রেইলে ভাগ হয়, আর বদ্ধ ট্রেইলে হাঁটলে প্রতিটি শীর্ষে যতবার ঢোকা হয় ততবারই বেরোনো হয়। হাঁটা অ্যারে-শীর্ষ থেকে মান-শীর্ষে গেলে কিনারা L, উল্টো দিকে গেলে R। তখন প্রতিটি অ্যারেতে L ও R সমান, আর প্রতিটি মানের ঢোকা (L) ও বেরোনো (R) কিনারা সমান।',
  ),
  approach: [
    L('Compress the values and create the vertices: arrays 0 … m − 1, then one vertex per distinct value. Add one edge per element and remember its position in the output.', 'মানগুলো কম্প্রেস করে শীর্ষ বানাও: অ্যারে ০ … m − ১, তারপর প্রতিটি আলাদা মানের একটি শীর্ষ। প্রতিটি উপাদানের জন্য একটি কিনারা যোগ করো এবং আউটপুটে তার জায়গা মনে রাখো।'),
    L('From every vertex that still has an unused edge, walk along unused edges, marking each as used and noting its direction, until you get stuck. Because all degrees are even, you can only get stuck at the start vertex, so each walk is a closed trail.', 'যে শীর্ষে এখনও অব্যবহৃত কিনারা আছে সেখান থেকে অব্যবহৃত কিনারা ধরে হাঁটো, প্রতিটি কিনারা ব্যবহৃত চিহ্নিত করে আর তার দিক লিখে, আটকে যাওয়া পর্যন্ত। সব ডিগ্রি জোড় বলে শুধু শুরুর শীর্ষেই আটকাতে পারো, তাই প্রতিটি হাঁটা একটি বদ্ধ ট্রেইল।'),
    L('An edge traversed out of an array vertex is L, otherwise R. Print each array’s string in input order.', 'অ্যারে-শীর্ষ থেকে বেরোনো কিনারা L, নইলে R। প্রতিটি অ্যারের স্ট্রিং ইনপুটের ক্রমে প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '2\n4 1 2 2 1\n2 3 3',
    steps: [
      { state: 'vertices: A1, A2, v1, v2, v3; edges A1–v1, A1–v2, A1–v2, A1–v1, A2–v3, A2–v3', text: L('Degrees: A1 has 4, A2 has 2, and every value has degree 2 or 4.', 'ডিগ্রি: A১-এর ৪, A২-এর ২, আর প্রতিটি মানের ২ বা ৪।') },
      { state: 'walk from A1: A1 → v1 → A1 → v2 → A1', text: L('That trail is closed. Edges leaving A1 are L: the first and the third element. Edges entering A1 are R: the second and the fourth.', 'ট্রেইলটি বদ্ধ। A১ থেকে বেরোনো কিনারা L: প্রথম ও তৃতীয় উপাদান। A১-এ ঢোকা কিনারা R: দ্বিতীয় ও চতুর্থ উপাদান।') },
      { state: 'walk from A2: A2 → v3 → A2', text: L('One L and one R for the pair of 3s.', '৩-এর জোড়ার জন্য একটি L ও একটি R।') },
    ],
  },
  complexity: { time: 'O(Σ n_i · log)', space: 'O(Σ n_i)', why: L('Each edge is used once; the logarithm comes from compressing the values.', 'প্রতিটি কিনারা একবার ব্যবহৃত হয়; লগারিদম আসে মান কম্প্রেস করা থেকে।') },
  solutions: [
    {
      id: 'trail',
      kind: 'optimal',
      title: L('Euler trails on the array–value graph', 'অ্যারে–মান গ্রাফে অয়লার ট্রেইল'),
      idea: L('Orient edges along closed trails; direction gives the colour.', 'বদ্ধ ট্রেইল ধরে কিনারার দিক ঠিক করো; দিকই রং।'),
      explain: [L('A pointer per vertex skips edges already used, so every edge is looked at a constant number of times. The walk is iterative, so there is no recursion depth to worry about for 2·10⁵ edges.', 'প্রতি শীর্ষে একটি পয়েন্টার ব্যবহৃত কিনারা টপকে যায়, তাই প্রতিটি কিনারা ধ্রুব সংখ্যকবার দেখা হয়। হাঁটা ইটারেটিভ, তাই ২·১০⁵ কিনারায় রিকার্সনের গভীরতা নিয়ে চিন্তা নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m;
    scanf("%d", &m);
    vector<int> len(m);
    vector<vector<int>> a(m);
    vector<int> all;
    for (int i = 0; i < m; i++) {
        scanf("%d", &len[i]);
        a[i].resize(len[i]);
        for (int& x : a[i]) { scanf("%d", &x); all.push_back(x); }
    }
    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());
    int V = all.size();
    // vertices: arrays 0..m-1, values m..m+V-1; every element is an edge array - value
    int E = 0;
    vector<array<int, 2>> edge;
    vector<vector<int>> adj(m + V);
    for (int i = 0; i < m; i++)
        for (int x : a[i]) {
            int v = m + (lower_bound(all.begin(), all.end(), x) - all.begin());
            edge.push_back({i, v});
            adj[i].push_back(E);
            adj[v].push_back(E);
            E++;
        }
    vector<char> used(E, 0), isL(E, 0);
    vector<int> ptr(m + V, 0);
    for (int s = 0; s < m + V; s++) {
        while (true) {
            while (ptr[s] < (int)adj[s].size() && used[adj[s][ptr[s]]]) ptr[s]++;
            if (ptr[s] == (int)adj[s].size()) break;
            int v = s;
            // walk along unused edges; all degrees are even, so the walk returns to s
            while (true) {
                while (ptr[v] < (int)adj[v].size() && used[adj[v][ptr[v]]]) ptr[v]++;
                if (ptr[v] == (int)adj[v].size()) break;
                int id = adj[v][ptr[v]];
                used[id] = 1;
                int u = edge[id][0] == v ? edge[id][1] : edge[id][0];
                if (v < m) isL[id] = 1; // leaving an array vertex: L, entering one: R
                v = u;
            }
        }
    }
    int id = 0;
    for (int i = 0; i < m; i++) {
        string s;
        for (int j = 0; j < len[i]; j++) s += isL[id++] ? 'L' : 'R';
        puts(s.c_str());
    }
}
`,
      time: 'O(N log N)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['vector', 'sort', 'lower-bound'],
    },
    {
      id: 'pairing',
      kind: 'alt',
      title: L('Pair elements twice and 2-colour the cycles', 'দুবার জোড়া বানিয়ে চক্র দ্বি-রঙ করা'),
      idea: L('Pair neighbours inside each array, pair equal values across arrays; paired elements get different colours.', 'প্রতিটি অ্যারের ভেতরে প্রতিবেশী জোড়া করো, সব অ্যারে জুড়ে সমান মানের জোড়া করো; জোড়ার দুই উপাদান ভিন্ন রং পায়।'),
      explain: [L('Every element then has exactly two partners, one from each pairing, so the elements form cycles whose links alternate between the two pairings. Such cycles have even length, so they can be 2-coloured. Each array pair gets one L and one R (array balance), and each value pair gets one L and one R (value balance). This is the Euler-tour idea without building a graph.', 'তখন প্রতিটি উপাদানের ঠিক দুইজন সঙ্গী থাকে, প্রতি জোড়ায় একজন; ফলে উপাদানগুলো চক্র বানায় যার সংযোগ দুই জোড়ার মধ্যে পালা করে আসে। এমন চক্রের দৈর্ঘ্য জোড়, তাই দ্বি-রঙ করা যায়। প্রতিটি অ্যারে-জোড়া একটি L ও একটি R পায় (অ্যারের ভারসাম্য), আর প্রতিটি মান-জোড়াও একটি L ও একটি R পায় (মানের ভারসাম্য)। এটি গ্রাফ না বানিয়ে অয়লার ট্যুরের ধারণা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m;
    scanf("%d", &m);
    vector<int> len(m), start(m);
    vector<int> val;
    for (int i = 0; i < m; i++) {
        scanf("%d", &len[i]);
        start[i] = val.size();
        for (int j = 0; j < len[i]; j++) { int x; scanf("%d", &x); val.push_back(x); }
    }
    int N = val.size();
    // every element has exactly two "partners": the next element in its array pair
    // and the next equal value in its value pair; they must get different colours.
    vector<int> pa(N, -1), pv(N, -1);
    for (int i = 0; i < m; i++)
        for (int j = 0; j + 1 < len[i]; j += 2) {
            pa[start[i] + j] = start[i] + j + 1;
            pa[start[i] + j + 1] = start[i] + j;
        }
    map<int, vector<int>> where;
    for (int e = 0; e < N; e++) where[val[e]].push_back(e);
    for (auto& [x, ids] : where)
        for (size_t k = 0; k + 1 < ids.size(); k += 2) {
            pv[ids[k]] = ids[k + 1];
            pv[ids[k + 1]] = ids[k];
        }
    vector<int> color(N, -1);
    for (int s = 0; s < N; s++) {
        if (color[s] >= 0) continue;
        // the structure is a union of even cycles that alternate array-pair and value-pair links
        int cur = s, c = 0;
        bool viaArray = true;
        while (color[cur] < 0) {
            color[cur] = c;
            cur = viaArray ? pa[cur] : pv[cur];
            viaArray = !viaArray;
            c ^= 1;
        }
    }
    int id = 0;
    for (int i = 0; i < m; i++) {
        string s;
        for (int j = 0; j < len[i]; j++) s += color[id++] ? 'R' : 'L';
        puts(s.c_str());
    }
}
`,
      time: 'O(N log N)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['vector', 'map'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every colouring (tiny inputs)', 'সব রং-নির্ধারণ চেষ্টা (ছোট ইনপুট)'),
      idea: L('Enumerate 2^N colourings and test both balance rules.', '২^N রং-নির্ধারণ ধরে দুটি ভারসাম্য নিয়মই পরীক্ষা করো।'),
      explain: [L('It exists only as the reference for the stress test: it proves that the checker accepts exactly the valid colourings.', 'এটি শুধু স্ট্রেস টেস্টের রেফারেন্স: এটি দেখায় চেকার ঠিক বৈধ রংগুলোই গ্রহণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m;
    scanf("%d", &m);
    vector<vector<int>> a(m);
    vector<pair<int, int>> pos;
    for (int i = 0; i < m; i++) {
        int k;
        scanf("%d", &k);
        a[i].resize(k);
        for (int j = 0; j < k; j++) { scanf("%d", &a[i][j]); pos.push_back({i, j}); }
    }
    int N = pos.size();
    for (int mask = 0; mask < (1 << N); mask++) {
        vector<int> cntL(m, 0), cntAll(m, 0);
        map<int, int> bal;
        for (int e = 0; e < N; e++) {
            auto [i, j] = pos[e];
            cntAll[i]++;
            if (mask >> e & 1) { cntL[i]++; bal[a[i][j]]++; }
            else bal[a[i][j]]--;
        }
        bool ok = true;
        for (int i = 0; i < m; i++) if (2 * cntL[i] != cntAll[i]) ok = false;
        for (auto& [x, b] : bal) if (b != 0) ok = false;
        if (!ok) continue;
        int e = 0;
        for (int i = 0; i < m; i++) {
            string s;
            for (int j = 0; j < (int)a[i].size(); j++, e++) s += (mask >> e & 1) ? 'L' : 'R';
            puts(s.c_str());
        }
        return 0;
    }
}
`,
      time: 'O(2^N · N)',
      space: 'O(N)',
      accepted: false,
      toolkit: ['bit-shift', 'map'],
    },
  ],
  tests: [
    { input: '2\n4 1 2 2 1\n2 3 3', output: 'LLRR\nLR', source: 'sample', note: L('Two arrays, three values.', 'দুটি অ্যারে, তিনটি মান।') },
    { input: '3\n2 5 5\n4 5 7 7 5\n2 7 7', output: 'LR\nLLRR\nLR', source: 'own', note: L('Two values shared between arrays.', 'অ্যারেগুলোর মধ্যে দুটি ভাগ করা মান।') },
    { input: '1\n6 1 1 1 1 1 1', output: 'LRLRLR', source: 'own', note: L('One value only: any 3 + 3 split is right.', 'একটিই মান: যেকোনো ৩ + ৩ ভাগ ঠিক।') },
  ],
  pitfalls: [
    L('Colouring greedily array by array: the value balance can then be impossible to repair.', 'অ্যারে ধরে ধরে গ্রিডি রং করা: তখন মানের ভারসাম্য আর ঠিক করা যায় না।'),
    L('Forgetting that the same value may appear in many arrays: the value vertex is shared, not one per array.', 'একই মান অনেক অ্যারেতে থাকতে পারে ভুলে যাওয়া: মান-শীর্ষ ভাগ করা, প্রতি অ্যারেতে আলাদা নয়।'),
    L('Recursive DFS for the Euler tour on 2·10⁵ edges can overflow the stack; keep it iterative.', '২·১০⁵ কিনারায় রিকার্সিভ DFS-এ স্ট্যাক ওভারফ্লো হতে পারে; ইটারেটিভ রাখো।'),
    L('Printing the strings in the wrong order: element positions must be mapped back to their array.', 'স্ট্রিং ভুল ক্রমে প্রিন্ট: উপাদানের জায়গা তার অ্যারেতে ফেরত ম্যাপ করতে হবে।'),
  ],
  related: [
    { id: '1404E', name: 'Bricks', why: L('Another problem where a clever graph replaces the obvious search.', 'আরেকটি সমস্যা যেখানে চতুর গ্রাফ সোজা সার্চের জায়গা নেয়।') },
    { id: '489B', name: 'BerSU Ball', why: L('The easy end of matching.', 'ম্যাচিংয়ের সহজ প্রান্ত।') },
  ],
  toolkit: ['vector', 'sort'],
};

// ───────────────────────────────────────────── 1389F
export const p1389F: ProblemEntry = {
  id: '1389F',
  contestId: 1389,
  index: 'F',
  name: 'Bicolored Segments',
  rating: 2600,
  tags: ['data-structures', 'dp', 'matchings', 'sortings'],
  why: L(
    'The conflict graph (segments of different colours that touch) is bipartite, so the answer is n minus a maximum matching, but the graph is far too big to build. The structure of the chosen set is simpler than the graph: the line splits into blocks of one colour each, and a DP over blocks with a range-add segment tree runs in O(n log n).',
    'বিরোধ-গ্রাফ (ভিন্ন রঙের যে খণ্ডগুলো ছোঁয়) দ্বিপক্ষীয়, তাই উত্তর n − ম্যাক্সিমাম ম্যাচিং, কিন্তু গ্রাফটি বানানোর পক্ষে অনেক বড়। বাছা সেটের গঠন গ্রাফের চেয়ে সরল: রেখাটি একরঙা ব্লকে ভাগ হয়, আর ব্লকের ওপর DP রেঞ্জ-অ্যাড সেগমেন্ট ট্রি দিয়ে O(n log n)-এ চলে।',
  ),
  statement: L(
    'n closed segments [l_i, r_i] on a line are coloured 0 or 1. Choose as many segments as possible so that no two chosen segments of different colours share a point (touching at an endpoint counts as sharing). Segments of the same colour may overlap freely.',
    'একটি রেখায় n টি বদ্ধ খণ্ড [l_i, r_i] আছে, প্রতিটির রং ০ বা ১। যতগুলো সম্ভব খণ্ড বাছো যাতে ভিন্ন রঙের কোনো দুটি বাছা খণ্ডের একটি বিন্দুও সাধারণ না থাকে (প্রান্তে ছুঁলেও সাধারণ বিন্দু ধরা হয়)। একই রঙের খণ্ড যত খুশি ওপরে পড়তে পারে।',
  ),
  input: L('n, then n lines l r t (colour t ∈ {0, 1}).', 'n, তারপর n লাইনে l r t (রং t ∈ {০, ১})।'),
  output: L('One integer: the maximum number of segments.', 'একটি পূর্ণসংখ্যা: সর্বোচ্চ খণ্ডের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵, 1 ≤ l ≤ r ≤ 10⁹', '১ ≤ n ≤ ২·১০⁵, ১ ≤ l ≤ r ≤ ১০⁹')] },
  samples: [
    { input: '3\n1 3 0\n4 6 1\n2 5 1', output: '2', explain: L('Segment [1, 3] of colour 0 meets [2, 5] of colour 1, so we cannot have both. Taking the two colour-1 segments [4, 6] and [2, 5] is fine, because equal colours may overlap. ' + ours.en, 'রং ০-এর [১, ৩] খণ্ড রং ১-এর [২, ৫]-কে ছোঁয়, তাই দুটি একসাথে নেওয়া যায় না। রং ১-এর দুটি খণ্ড [৪, ৬] ও [২, ৫] নেওয়া ঠিক, কারণ সমান রঙ ওপরে পড়তে পারে। ' + ours.bn) },
  ],
  observation: L(
    'In an optimal set, sweep along the line: the occupied stretches of colour 0 and colour 1 never touch. Merge each maximal run of one colour into a block [s, e]; neighbouring blocks have different colours and e < next s. Given the blocks, we can take every segment of colour c that lies completely inside a block of colour c. So the task is to cut the line into blocks of alternating colours and to maximise the sum, over blocks, of the number of same-coloured segments inside them.',
    'সেরা সেটে রেখা ধরে এগোলে রং ০ ও রং ১-এর দখলকৃত অংশ কখনও ছোঁয় না। এক রঙের প্রতিটি সর্বোচ্চ ধারাকে একটি ব্লক [s, e] ধরো; পাশের ব্লকের রং ভিন্ন আর e < পরের s। ব্লক ঠিক থাকলে c রঙের যে খণ্ড সম্পূর্ণভাবে c রঙের ব্লকের ভেতরে পড়ে তার সবই নেওয়া যায়। তাই কাজ হলো রেখাটিকে পালাক্রমে রঙের ব্লকে কেটে প্রতিটি ব্লকের ভেতরের সমরঙা খণ্ডের সংখ্যার যোগ সর্বাধিক করা।',
  ),
  approach: [
    L('Compress all endpoints to 0 … K − 1 and group the segments by their right endpoint.', 'সব প্রান্ত ০ … K − ১-এ কম্প্রেস করো এবং খণ্ডগুলোকে ডান প্রান্ত ধরে ভাগ করো।'),
    L('Let dp[c][s] be the best total when a block of colour c starts at coordinate s and we have swept up to the current coordinate p; it already counts every colour-c segment with l ≥ s and r ≤ p, and every earlier block.', 'ধরো dp[c][s] হলো সর্বোত্তম মোট, যখন রং c-এর ব্লক s-এ শুরু হয়েছে আর আমরা বর্তমান স্থানাঙ্ক p পর্যন্ত এসেছি; এতে রং c-এর যেসব খণ্ডের l ≥ s ও r ≤ p এবং আগের সব ব্লক গোনা আছে।'),
    L('At each coordinate p, first open new blocks: dp[0][p] = max(0, max over s < p of dp[1][s]) and dp[1][p] symmetrically, because a block of the other colour must have ended before p.', 'প্রতিটি স্থানাঙ্ক p-তে প্রথমে নতুন ব্লক খোলো: dp[০][p] = max(০, s < p-এর জন্য dp[১][s]-এর সর্বোচ্চ), dp[১][p] প্রতিসম ভাবে, কারণ অন্য রঙের ব্লক p-র আগেই শেষ হতে হবে।'),
    L('Then for every segment (l, p, t) ending at p, add 1 to dp[t][s] for all s ≤ l: a range add on a segment tree. The answer is the largest value in either tree at the end.', 'তারপর p-তে শেষ হওয়া প্রতিটি খণ্ড (l, p, t)-র জন্য সব s ≤ l-এর dp[t][s]-এ ১ যোগ করো: সেগমেন্ট ট্রিতে রেঞ্জ-অ্যাড। শেষে দুই ট্রির বৃহত্তম মানই উত্তর।'),
  ],
  walkthrough: {
    input: '3\n1 3 0\n4 6 1\n2 5 1',
    steps: [
      { state: 'coordinates 1 2 3 4 5 6', text: L('Six distinct endpoints. Segments end at 3, 5 and 6.', 'ছয়টি আলাদা প্রান্ত। খণ্ডগুলো ৩, ৫ ও ৬-এ শেষ হয়।') },
      { state: 'p = 3: segment [1, 3] colour 0', text: L('dp[0][1] becomes 1: a colour-0 block starting at 1 holds that segment.', 'dp[০][১] হয় ১: ১-এ শুরু হওয়া রং ০ ব্লকে ওই খণ্ডটি আছে।') },
      { state: 'p = 4: open a colour-1 block after the colour-0 block: dp[1][4] = 1', text: L('The best earlier colour-0 value is 1, so a colour-1 block starting at 4 begins with 1.', 'আগের রং ০-এর সেরা মান ১, তাই ৪-এ শুরু রং ১ ব্লক ১ দিয়ে শুরু।') },
      { state: 'p = 5, 6: segments [2, 5] and [4, 6] of colour 1', text: L('dp[1][s] for s ≤ 2 and s ≤ 4 grow. A block of colour 1 starting at 1 or 2 holds both colour-1 segments and no colour-0 segment, giving 2.', 's ≤ ২ ও s ≤ ৪-এর জন্য dp[১][s] বাড়ে। ১ বা ২-এ শুরু রং ১ ব্লকে দুটি রং ১ খণ্ডই থাকে, রং ০ খণ্ড থাকে না, ফলে ২।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One range add per segment and two prefix-maximum queries per coordinate, on trees of size at most 2n.', 'প্রতি খণ্ডে একটি রেঞ্জ-অ্যাড আর প্রতি স্থানাঙ্কে দুটি প্রিফিক্স-ম্যাক্স কোয়েরি, সর্বোচ্চ ২n আকারের ট্রিতে।') },
  solutions: [
    {
      id: 'sweep',
      kind: 'optimal',
      title: L('Block DP with two range-add segment trees', 'দুটি রেঞ্জ-অ্যাড সেগমেন্ট ট্রি দিয়ে ব্লক DP'),
      idea: L('dp[c][s] = best total with a colour-c block opened at s; add 1 to a prefix when a segment ends.', 'dp[c][s] = s-এ রং c-এর ব্লক খোলা অবস্থায় সেরা মোট; খণ্ড শেষ হলে একটি প্রিফিক্সে ১ যোগ।'),
      explain: [
        L('Opening a block is an assignment, but position p has never been touched before the sweep reaches it (adds only cover s ≤ l ≤ current p), so adding the value to the stored 0 is the same thing.', 'ব্লক খোলা আসলে অ্যাসাইনমেন্ট, কিন্তু সুইপ p-তে পৌঁছানোর আগে p কখনও ছোঁয়া হয়নি (অ্যাড শুধু s ≤ l ≤ বর্তমান p-কে ঢাকে), তাই সংরক্ষিত ০-এর সাথে মান যোগ করাই যথেষ্ট।'),
        L('The tree stores a lazy add per node and a maximum that already includes the node’s own add, so range maximum queries combine children first and then add the node’s add.', 'ট্রি প্রতি নোডে একটি লেজি অ্যাড রাখে আর এমন একটি ম্যাক্স যাতে নোডের নিজের অ্যাড অন্তর্ভুক্ত; তাই রেঞ্জ-ম্যাক্স কোয়েরিতে আগে সন্তান মেলানো হয় তারপর নোডের অ্যাড যোগ হয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct SegTree {
    int n;
    vector<int> mx, add;
    SegTree(int n) : n(n), mx(4 * n, 0), add(4 * n, 0) {}
    void update(int node, int lo, int hi, int l, int r, int v) {
        if (r < lo || hi < l) return;
        if (l <= lo && hi <= r) { mx[node] += v; add[node] += v; return; }
        int mid = (lo + hi) / 2;
        update(2 * node, lo, mid, l, r, v);
        update(2 * node + 1, mid + 1, hi, l, r, v);
        mx[node] = max(mx[2 * node], mx[2 * node + 1]) + add[node];
    }
    int query(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return INT_MIN / 2;
        if (l <= lo && hi <= r) return mx[node];
        int mid = (lo + hi) / 2;
        return max(query(2 * node, lo, mid, l, r), query(2 * node + 1, mid + 1, hi, l, r)) + add[node];
    }
};

int main() {
    int n;
    scanf("%d", &n);
    vector<int> l(n), r(n), t(n);
    vector<int> xs;
    for (int i = 0; i < n; i++) {
        scanf("%d %d %d", &l[i], &r[i], &t[i]);
        xs.push_back(l[i]);
        xs.push_back(r[i]);
    }
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());
    int K = xs.size();
    vector<vector<pair<int, int>>> endingAt(K);
    for (int i = 0; i < n; i++) {
        int a = lower_bound(xs.begin(), xs.end(), l[i]) - xs.begin();
        int b = lower_bound(xs.begin(), xs.end(), r[i]) - xs.begin();
        endingAt[b].push_back({a, t[i]});
    }
    // dp[c][s]: best count when a block of colour c starts at coordinate s
    SegTree dp[2] = {SegTree(K), SegTree(K)};
    for (int p = 0; p < K; p++) {
        if (p > 0) {
            int best0 = max(0, dp[1].query(1, 0, K - 1, 0, p - 1));
            int best1 = max(0, dp[0].query(1, 0, K - 1, 0, p - 1));
            dp[0].update(1, 0, K - 1, p, p, best0);
            dp[1].update(1, 0, K - 1, p, p, best1);
        }
        for (auto [a, c] : endingAt[p]) dp[c].update(1, 0, K - 1, 0, a, 1);
    }
    int ans = max(dp[0].query(1, 0, K - 1, 0, K - 1), dp[1].query(1, 0, K - 1, 0, K - 1));
    printf("%d\n", max(ans, 0));
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'sort', 'lower-bound'],
    },
    {
      id: 'matching',
      kind: 'alt',
      title: L('Maximum independent set = n − maximum matching (Kuhn)', 'ম্যাক্সিমাম ইনডিপেন্ডেন্ট সেট = n − ম্যাক্সিমাম ম্যাচিং (Kuhn)'),
      idea: L('Join every colour-0 segment to every colour-1 segment it touches and match.', 'প্রতিটি রং ০ খণ্ডকে তার ছোঁয়া প্রতিটি রং ১ খণ্ডের সাথে জোড়ো এবং ম্যাচ করো।'),
      explain: [L('By König’s theorem the largest set of segments with no conflicting pair has size n minus the maximum matching of this bipartite graph. It is exactly right but builds up to n²/4 edges, so it only works for n in the low thousands. It is the cleanest way to see why the problem has the matching tag.', 'König-এর উপপাদ্য অনুযায়ী বিরোধহীন সবচেয়ে বড় খণ্ড-সেটের আকার n − এই দ্বিপক্ষীয় গ্রাফের ম্যাক্সিমাম ম্যাচিং। এটি নির্ভুল কিন্তু সর্বোচ্চ n²/৪ কিনারা বানায়, তাই n কয়েক হাজারে সীমিত। সমস্যাটির ম্যাচিং ট্যাগ কেন আছে তা বোঝার সবচেয়ে পরিষ্কার উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<vector<int>> adj;
vector<int> matchTo;
vector<char> seen;

bool tryKuhn(int u) {
    for (int v : adj[u]) {
        if (seen[v]) continue;
        seen[v] = 1;
        if (matchTo[v] < 0 || tryKuhn(matchTo[v])) { matchTo[v] = u; return true; }
    }
    return false;
}

int main() {
    scanf("%d", &n);
    vector<int> l(n), r(n), t(n);
    for (int i = 0; i < n; i++) scanf("%d %d %d", &l[i], &r[i], &t[i]);
    adj.assign(n, {});
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (t[i] == 0 && t[j] == 1 && max(l[i], l[j]) <= min(r[i], r[j])) adj[i].push_back(j);
    matchTo.assign(n, -1);
    int matching = 0;
    for (int i = 0; i < n; i++) {
        if (t[i] != 0) continue;
        seen.assign(n, 0);
        if (tryKuhn(i)) matching++;
    }
    printf("%d\n", n - matching);
}
`,
      time: 'O(n³) worst case',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every subset (tiny n)', 'সব উপসেট চেষ্টা (ছোট n)'),
      idea: L('Check all 2ⁿ subsets for a touching pair of different colours.', 'সব ২ⁿ উপসেটে ভিন্ন রঙের ছোঁয়া জোড়া খোঁজো।'),
      explain: [L('The definition of the problem turned into code; the reference for the stress test.', 'সমস্যার সংজ্ঞাকেই কোড করা; স্ট্রেস টেস্টের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> l(n), r(n), t(n);
    for (int i = 0; i < n; i++) scanf("%d %d %d", &l[i], &r[i], &t[i]);
    int best = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        bool ok = true;
        for (int i = 0; i < n && ok; i++)
            for (int j = i + 1; j < n; j++)
                if ((mask >> i & 1) && (mask >> j & 1) && t[i] != t[j] && max(l[i], l[j]) <= min(r[i], r[j])) { ok = false; break; }
        if (ok) best = max(best, __builtin_popcount(mask));
    }
    printf("%d\n", best);
}
`,
      time: 'O(2ⁿ · n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bitwise-and', 'popcount'],
    },
  ],
  tests: [
    { input: '3\n1 3 0\n4 6 1\n2 5 1', output: '2', source: 'sample', note: L('Same colour may overlap.', 'সমান রঙ ওপরে পড়তে পারে।') },
    { input: '4\n1 4 0\n2 3 1\n5 6 1\n6 9 0', output: '2', source: 'own', note: L('A nested pair and a chain.', 'ভেতরে বসা জোড়া আর একটি শৃঙ্খল।') },
    { input: '1\n7 7 1', output: '1', source: 'own', note: L('A single point segment.', 'একটি বিন্দু-খণ্ড।') },
    { input: '5\n1 10 0\n1 10 1\n2 3 0\n5 6 0\n8 9 1', output: '3', source: 'own', note: L('Two huge segments of different colours block everything; the three small ones around them are chosen instead.', 'ভিন্ন রঙের দুটি বিশাল খণ্ড সবকিছু আটকায়; তার বদলে ছোট তিনটি নেওয়া হয়।') },
    { input: '4\n1 2 0\n2 3 1\n3 4 0\n4 5 1', output: '2', source: 'own', note: L('A chain where every neighbour touches only at an endpoint.', 'এমন শৃঙ্খল যেখানে প্রতিটি প্রতিবেশী শুধু প্রান্তে ছোঁয়।') },
    { input: '3\n1 1000000000 0\n1 1 1\n1000000000 1000000000 1', output: '2', source: 'own', note: L('Large coordinates: the two point segments win over the long one.', 'বড় স্থানাঙ্ক: লম্বা খণ্ডের চেয়ে দুটি বিন্দু-খণ্ড ভালো।') },
  ],
  pitfalls: [
    L('Treating touching endpoints as not intersecting: segments [1, 2] and [2, 3] share the point 2.', 'প্রান্তে ছোঁয়াকে ছেদ না ধরা: [১, ২] ও [২, ৩]-এর বিন্দু ২ সাধারণ।'),
    L('Starting a new block at a coordinate ≤ the end of the previous one: the other-colour value must come from s < p only.', 'আগের ব্লকের শেষ ≤ স্থানাঙ্কে নতুন ব্লক শুরু করা: অন্য রঙের মান শুধু s < p থেকে আসবে।'),
    L('Adding to dp[t][s] for s > l: such a block starts inside the segment, so it cannot hold it.', 's > l-এর dp[t][s]-এ যোগ করা: ওই ব্লক খণ্ডের ভেতরে শুরু হয়, তাই খণ্ডটি ধরে রাখতে পারে না।'),
    L('Forgetting that the answer can be taken from any block start: take the maximum over both trees at the end.', 'যেকোনো ব্লকের শুরু থেকে উত্তর আসতে পারে ভুলে যাওয়া: শেষে দুই ট্রির সর্বোচ্চ নাও।'),
  ],
  related: [
    { id: '1404E', name: 'Bricks', why: L('A bipartite graph hidden in a grid.', 'গ্রিডের ভেতরে লুকানো দ্বিপক্ষীয় গ্রাফ।') },
    { id: '1198E', name: 'Rectangle Painting 2', why: L('Vertex cover by flow on compressed coordinates.', 'কম্প্রেসড কোঅর্ডিনেটে ফ্লো দিয়ে ভার্টেক্স কভার।') },
  ],
  toolkit: ['vector', 'sort'],
};

// ───────────────────────────────────────────── 1381C
export const p1381C: ProblemEntry = {
  id: '1381C',
  contestId: 1381,
  index: 'C',
  name: 'Mastermind',
  rating: 2500,
  tags: ['constructive', 'greedy', 'matchings', 'sortings', 'two-pointers'],
  why: L(
    'Building a guess with an exact number of exact matches and an exact number of colour matches is a derangement problem in disguise. The greedy that keeps the most frequent colours least frequent in the leftover, plus one cyclic shift, decides exactly when it is possible.',
    'ঠিক ততগুলো অবস্থান-মিল আর ততগুলো রং-মিলসহ অনুমান বানানো আসলে ছদ্মবেশে ডিরেঞ্জমেন্ট সমস্যা। যে গ্রিডি অবশিষ্টে সবচেয়ে বেশি-ঘটা রংকে সবচেয়ে কম রাখে, তার সাথে একটি চক্রীয় শিফট, ঠিক কখন সম্ভব তা নির্ধারণ করে।',
  ),
  statement: L(
    'A secret sequence a of length n is sorted in non-decreasing order, with values in 1 … n + 1. You must produce a guess b of the same length with values in 1 … n + 1 such that exactly x positions satisfy a_i = b_i, and the multiset overlap Σ_v min(count of v in a, count of v in b) equals y (so y ≥ x always). Print NO if no guess exists, otherwise YES and a guess.',
    'দৈর্ঘ্য n-এর একটি গোপন অনুক্রম a ননডিক্রিজিং ক্রমে সাজানো, মান ১ … n + ১। একই দৈর্ঘ্যের এমন একটি অনুমান b বানাও (মান ১ … n + ১) যাতে ঠিক x টি অবস্থানে a_i = b_i, এবং মাল্টিসেট ওভারলাপ Σ_v min(a-তে v-র সংখ্যা, b-তে v-র সংখ্যা) ঠিক y হয় (তাই সবসময় y ≥ x)। অনুমান না থাকলে NO, নইলে YES ও একটি অনুমান প্রিন্ট করো।',
  ),
  input: L('t test cases; each: n x y, then a_1 … a_n.', 't টি টেস্ট; প্রতিটিতে: n x y, তারপর a_১ … a_n।'),
  output: L('NO, or YES and the guess (a checker accepts any valid guess).', 'NO, অথবা YES ও অনুমান (চেকার যেকোনো বৈধ অনুমান গ্রহণ করে)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, 0 ≤ x ≤ y ≤ n', 'Σ n ≤ ২·১০⁵, ০ ≤ x ≤ y ≤ n')] },
  samples: [
    { input: '3\n5 2 4\n1 1 2 2 3\n4 0 4\n1 2 3 4\n3 1 3\n1 1 1', output: 'YES\n4 1 3 2 1\nYES\n2 3 4 1\nNO', explain: L('Test 1: b = 4 1 3 2 1 matches a = 1 1 2 2 3 at positions 2 and 4 only, and the colours shared are 1, 1, 2, 3, i.e. 4. Test 2 is a plain derangement of 1 2 3 4. Test 3 is impossible: an overlap of 3 forces b to be 1 1 1, which has 3 equal positions, not 1. ' + ours.en, 'টেস্ট ১: b = ৪ ১ ৩ ২ ১, a = ১ ১ ২ ২ ৩-এর সাথে শুধু ২ ও ৪ নম্বর অবস্থানে মেলে, আর ভাগ করা রং ১, ১, ২, ৩ অর্থাৎ ৪। টেস্ট ২ হলো ১ ২ ৩ ৪-এর সাধারণ ডিরেঞ্জমেন্ট। টেস্ট ৩ অসম্ভব: ওভারলাপ ৩ হলে b-কে ১ ১ ১ হতেই হয়, যাতে ৩টি অবস্থান সমান, ১টি নয়। ' + ours.bn) },
  ],
  observation: L(
    'Say which x positions stay equal (gold). The other r = n − x positions must be filled with colours so that none is equal to a, and exactly y − x of them still contribute to the colour overlap; the remaining n − y positions get a colour that does not occur in a at all (one always exists, because a has at most n distinct values out of n + 1). To keep as many positions as possible freely rearrangeable, take the gold positions from the colour with the most remaining occurrences each time. After that, shift the leftover sorted sequence cyclically by mx, the largest remaining frequency: each position receives a colour from mx steps ahead. The only positions that still collide with themselves come from the single colour of frequency mx when 2·mx > r, and there are exactly 2·mx − r of them. They must take the absent colour, so the answer is NO exactly when that number exceeds n − y.',
    'ধরো কোন x টি অবস্থান সমান থাকবে (গোল্ড)। বাকি r = n − x অবস্থানে এমন রং বসাতে হবে যাতে কোনোটি a-র সমান না হয়, আর তাদের মধ্যে ঠিক y − x টি রং-ওভারলাপে অবদান রাখে; বাকি n − y অবস্থানে এমন রং বসে যা a-তে একেবারেই নেই (সবসময় একটি আছে, কারণ a-তে n + ১-এর মধ্যে সর্বোচ্চ n টি আলাদা মান)। যতটা সম্ভব অবস্থান মুক্তভাবে সাজানোর জন্য প্রতিবার সবচেয়ে বেশি অবশিষ্ট উপস্থিতির রং থেকে গোল্ড অবস্থান নাও। তারপর অবশিষ্ট সাজানো অনুক্রমকে mx (সর্বোচ্চ অবশিষ্ট ফ্রিকোয়েন্সি) ধাপ চক্রীয়ভাবে সরাও: প্রতিটি অবস্থান mx ধাপ সামনের রং পায়। যেসব অবস্থান তখনও নিজের সাথে মিলে যায় তারা আসে mx ফ্রিকোয়েন্সির একমাত্র রং থেকে, যখন ২·mx > r, এবং তাদের সংখ্যা ঠিক ২·mx − r। তাদের অনুপস্থিত রং নিতেই হবে, তাই সংখ্যাটি n − y-এর বেশি হলে এবং শুধু তখনই উত্তর NO।',
  ),
  approach: [
    L('Find a colour u that does not occur in a (the smallest one).', 'a-তে নেই এমন একটি রং u খোঁজো (সবচেয়ে ছোট)।'),
    L('Put every colour in a max-heap by its count. Repeat x times: pop the colour with the most remaining occurrences, fix one of its positions as gold (b_i = a_i), push it back with one fewer.', 'প্রতিটি রং তার সংখ্যা ধরে ম্যাক্স-হিপে রাখো। x বার: সবচেয়ে বেশি অবশিষ্ট উপস্থিতির রং তোলো, তার একটি অবস্থান গোল্ড করো (b_i = a_i), এক কম সংখ্যায় ফেরত দাও।'),
    L('List the other positions in order (they stay sorted by colour). Let mx be the longest run of equal colours in that list. For every leftover position j give b the colour at position (j + mx) mod r; if it equals a at j, write u instead and count a collision.', 'বাকি অবস্থান ক্রমে তালিকা করো (রং অনুযায়ী সাজানোই থাকে)। mx হলো ওই তালিকায় সমান রঙের দীর্ঘতম ধারা। প্রতিটি অবশিষ্ট অবস্থান j-তে b-তে (j + mx) mod r অবস্থানের রং দাও; তা j-তে a-র সমান হলে u লেখো এবং সংঘর্ষ গোনো।'),
    L('If collisions exceed n − y, print NO. Otherwise turn more leftover positions into u until exactly n − y positions hold u, then print YES and b.', 'সংঘর্ষ n − y-এর বেশি হলে NO। নইলে আরও অবশিষ্ট অবস্থান u করো যতক্ষণ না ঠিক n − y অবস্থানে u থাকে, তারপর YES ও b প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '1\n5 2 4\n1 1 2 2 3',
    steps: [
      { state: 'u = 4; counts: 1→2, 2→2, 3→1', text: L('The colour 4 does not occur in a, so it is the “absent” colour.', 'রং ৪ a-তে নেই, তাই এটিই “অনুপস্থিত” রং।') },
      { state: 'pick gold twice: from colour 2 (count 2) and then colour 1 (count 2 ties, take one)', text: L('The leftover multiset is {1, 2, 3}, so r = 3 and mx = 1.', 'অবশিষ্ট মাল্টিসেট {১, ২, ৩}, তাই r = ৩ ও mx = ১।') },
      { state: 'shift by 1: the leftover positions receive 2, 3, 1', text: L('No position collides, so bad = 0 ≤ n − y = 1.', 'কোনো অবস্থান সংঘর্ষ করে না, তাই bad = ০ ≤ n − y = ১।') },
      { state: 'one more position becomes u = 4', text: L('Exactly n − y = 1 position holds the absent colour. The overlap is x + (r − 1) = 2 + 2 = 4 = y.', 'ঠিক n − y = ১ অবস্থানে অনুপস্থিত রং। ওভারলাপ x + (r − ১) = ২ + ২ = ৪ = y।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('x heap operations, one linear pass for the shift.', 'x টি হিপ অপারেশন আর শিফটের জন্য একটি রৈখিক পাস।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Gold by largest remaining frequency, then a cyclic shift', 'বৃহত্তম অবশিষ্ট ফ্রিকোয়েন্সি ধরে গোল্ড, তারপর চক্রীয় শিফট'),
      idea: L('Flatten the colour counts, derange the rest by shifting mx places, spend the absent colour on collisions.', 'রঙের সংখ্যা সমান করো, বাকি mx ধাপ সরিয়ে ডিরেঞ্জ করো, সংঘর্ষে অনুপস্থিত রং খরচ করো।'),
      explain: [
        L('Why take gold from the most frequent colour: the problem for the leftover is hardest when one colour dominates it, so we shave the dominant colours first. This minimises mx, and mx alone decides how many forced collisions remain.', 'সবচেয়ে বেশি ঘটা রং থেকে গোল্ড কেন: অবশিষ্টে একটি রং প্রধান হলে সমস্যা সবচেয়ে কঠিন, তাই প্রধান রংগুলো আগে ছাঁটি। এতে mx সবচেয়ে কম হয়, আর বাধ্যতামূলক সংঘর্ষ কতটি থাকে তা mx-ই ঠিক করে।'),
        L('The shift by mx works because equal colours form one block of length at most mx in the sorted leftover list, so moving by mx leaves the block; only the wrap-around of the longest block can come back onto itself, which is the 2·mx − r count.', 'mx সরানো কাজ করে কারণ সাজানো অবশিষ্ট তালিকায় সমান রঙ mx-এর বেশি লম্বা ব্লক বানায় না, তাই mx সরালে ব্লক ছেড়ে যায়; শুধু দীর্ঘতম ব্লকের ঘুরে-আসা অংশ নিজের ওপর ফিরতে পারে, যা ২·mx − r সংখ্যা।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, x, y;
        scanf("%d %d %d", &n, &x, &y);
        vector<int> a(n);
        vector<vector<int>> at(n + 2);
        for (int i = 0; i < n; i++) { scanf("%d", &a[i]); at[a[i]].push_back(i); }
        int unused = 1;
        while (!at[unused].empty()) unused++;
        priority_queue<pair<int, int>> pq;
        for (int v = 1; v <= n + 1; v++)
            if (!at[v].empty()) pq.push({(int)at[v].size(), v});
        vector<int> b(n, 0);
        vector<char> kept(n, 0);
        for (int k = 0; k < x; k++) {
            auto [cnt, v] = pq.top();
            pq.pop();
            int pos = at[v].back();
            at[v].pop_back();
            kept[pos] = 1;
            b[pos] = a[pos];
            if (cnt > 1) pq.push({cnt - 1, v});
        }
        vector<int> rem;
        for (int i = 0; i < n; i++)
            if (!kept[i]) rem.push_back(i);
        int r = rem.size(), mx = 0, run = 0;
        for (int j = 0; j < r; j++) {
            run = (j > 0 && a[rem[j]] == a[rem[j - 1]]) ? run + 1 : 1;
            mx = max(mx, run);
        }
        int bad = 0;
        for (int j = 0; j < r; j++) {
            int cand = a[rem[(j + mx) % r]];
            if (cand == a[rem[j]]) { b[rem[j]] = unused; bad++; }
            else b[rem[j]] = cand;
        }
        int needUnused = n - y;
        if (bad > needUnused) { puts("NO"); continue; }
        for (int j = 0; j < r && bad < needUnused; j++)
            if (b[rem[j]] != unused) { b[rem[j]] = unused; bad++; }
        puts("YES");
        for (int i = 0; i < n; i++) printf("%d ", b[i]);
        puts("");
    }
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['priority-queue', 'vector', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every guess (tiny n)', 'সব অনুমান গোনা (ছোট n)'),
      idea: L('Count in base n + 1 over all guesses and test both numbers.', 'সব অনুমানের ওপর (n + ১) ভিত্তিতে গুনে দুটি সংখ্যাই পরীক্ষা করো।'),
      explain: [L('Used as the reference: it decides YES or NO from scratch, and the checker confirms that the greedy’s guess is valid whenever the brute force says YES.', 'রেফারেন্স হিসেবে ব্যবহৃত: এটি শুরু থেকে YES/NO ঠিক করে, আর ব্রুট ফোর্স YES বললে চেকার দেখে নেয় গ্রিডির অনুমান বৈধ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, x, y;
        scanf("%d %d %d", &n, &x, &y);
        vector<int> a(n);
        for (int& v : a) scanf("%d", &v);
        vector<int> b(n, 1);
        bool found = false;
        while (true) {
            int gold = 0;
            vector<int> ca(n + 2, 0), cb(n + 2, 0);
            for (int i = 0; i < n; i++) { gold += a[i] == b[i]; ca[a[i]]++; cb[b[i]]++; }
            int common = 0;
            for (int v = 1; v <= n + 1; v++) common += min(ca[v], cb[v]);
            if (gold == x && common == y) { found = true; break; }
            int i = 0;
            while (i < n && b[i] == n + 1) b[i++] = 1;
            if (i == n) break;
            b[i]++;
        }
        if (!found) { puts("NO"); continue; }
        puts("YES");
        for (int v : b) printf("%d ", v);
        puts("");
    }
}
`,
      time: 'O((n + 1)ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'min-max'],
    },
  ],
  tests: [
    { input: '3\n5 2 4\n1 1 2 2 3\n4 0 4\n1 2 3 4\n3 1 3\n1 1 1', output: 'YES\n4 1 3 2 1\nYES\n2 3 4 1\nNO', source: 'sample', note: L('Three cases in one run.', 'এক রানে তিনটি কেস।') },
    { input: '2\n6 0 6\n1 1 2 2 3 3\n5 5 5\n1 2 3 4 5', output: 'YES\n2 2 3 3 1 1\nYES\n1 2 3 4 5', source: 'own', note: L('x = 0 with every colour shared, and x = n (the guess equals a).', 'x = ০ যেখানে প্রতিটি রং ভাগ করা, আর x = n (অনুমান = a)।') },
    { input: '2\n4 1 1\n1 1 1 2\n4 2 4\n1 1 1 1', output: 'YES\n3 3 1 3\nNO', source: 'own', note: L('A dominant colour. The second case asks for overlap 4 with only 2 equal positions, impossible because b would have to be all 1s.', 'প্রধান রং। দ্বিতীয় কেসে ওভারলাপ ৪ কিন্তু সমান অবস্থান মাত্র ২, অসম্ভব কারণ b-র সবই ১ হতে হয়।') },
  ],
  pitfalls: [
    L('Choosing the gold positions arbitrarily (say the first x): a dominant colour then survives in the leftover and forces collisions that a smarter choice would avoid.', 'গোল্ড অবস্থান যেমন-তেমন বাছা (যেমন প্রথম x টি): প্রধান রং অবশিষ্টে থেকে যায় আর এমন সংঘর্ষ বাধ্য করে যা বুদ্ধি করে বাছলে এড়ানো যেত।'),
    L('Using a value outside 1 … n + 1 for the absent colour; it must be one of the allowed values, and one always exists.', 'অনুপস্থিত রঙের জন্য ১ … n + ১-এর বাইরের মান নেওয়া; অনুমোদিত মানের একটি হতে হবে, আর একটি সবসময় আছে।'),
    L('Putting the absent colour at a gold position by mistake: the gold positions must keep b_i = a_i.', 'ভুল করে গোল্ড অবস্থানে অনুপস্থিত রং বসানো: গোল্ড অবস্থানে b_i = a_i থাকতেই হবে।'),
    L('Forgetting r = 0 (x = n), where the shift would divide by zero.', 'r = ০ (x = n) ভুলে যাওয়া, যেখানে শিফটে শূন্য দিয়ে ভাগ হয়ে যায়।'),
  ],
  related: [
    { id: '1634E', name: 'Fair Share', why: L('Balancing choices with a structural argument rather than search.', 'সার্চের বদলে কাঠামোগত যুক্তিতে ভারসাম্য মেলানো।') },
    { id: '1404E', name: 'Bricks', why: L('Optimisation by reduction to matching.', 'ম্যাচিংয়ে রূপান্তর করে অপ্টিমাইজেশন।') },
  ],
  toolkit: ['priority-queue', 'vector'],
};

// ───────────────────────────────────────────── 568C
export const p568C: ProblemEntry = {
  id: '568C',
  contestId: 568,
  index: 'C',
  name: 'New Language',
  rating: 2600,
  tags: ['2-sat', 'greedy', 'strings'],
  why: L(
    'Finding the lexicographically smallest valid word is a greedy over positions, and each greedy step asks one yes/no question: can the rest still be completed? Vowel/consonant rules between positions are two-literal clauses, so every such question is a 2-SAT instance.',
    'লেক্সিকোগ্রাফিক্যালি ক্ষুদ্রতম বৈধ শব্দ খোঁজা মানে অবস্থান ধরে গ্রিডি, আর প্রতিটি ধাপ একটি হ্যাঁ/না প্রশ্ন করে: বাকিটা কি এখনও সম্পূর্ণ করা যায়? অবস্থানগুলোর মধ্যে স্বর/ব্যঞ্জন নিয়ম দুই-লিটারেল ক্লজ, তাই প্রতিটি প্রশ্ন একটি 2-SAT ইনস্ট্যান্স।',
  ),
  statement: L(
    'The first l lowercase letters form an alphabet, and each letter is a vowel (V) or a consonant (C). There are m rules of the form “if the letter at position p₁ has type t₁, then the letter at position p₂ has type t₂”. A word of length n is valid when it uses only the alphabet and breaks no rule. Given a string s of length n over the alphabet, print the smallest valid word that is lexicographically at least s, or -1 if none exists.',
    'প্রথম l টি ছোট হাতের অক্ষর নিয়ে বর্ণমালা, প্রতিটি অক্ষর স্বর (V) বা ব্যঞ্জন (C)। m টি নিয়ম আছে এই আকারে: “p₁ অবস্থানের অক্ষরের ধরন t₁ হলে p₂ অবস্থানের অক্ষরের ধরন t₂”। দৈর্ঘ্য n-এর শব্দ বৈধ যদি তা শুধু বর্ণমালার অক্ষর ব্যবহার করে ও কোনো নিয়ম না ভাঙে। বর্ণমালার অক্ষরে গড়া দৈর্ঘ্য n-এর স্ট্রিং s দেওয়া আছে; s-এর সমান বা বড় সবচেয়ে ছোট বৈধ শব্দ প্রিন্ট করো, না থাকলে -১।',
  ),
  input: L('A string of V and C of length l (the types of a, b, c, …); then n m; then m lines p₁ t₁ p₂ t₂; then s.', 'l দৈর্ঘ্যের V ও C-এর স্ট্রিং (a, b, c, …-এর ধরন); তারপর n m; তারপর m লাইনে p₁ t₁ p₂ t₂; তারপর s।'),
  output: L('The word, or -1.', 'শব্দটি, অথবা -১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ l ≤ 26, 1 ≤ n ≤ 200, 0 ≤ m ≤ 4n(n − 1)', '১ ≤ l ≤ ২৬, ১ ≤ n ≤ ২০০, ০ ≤ m ≤ ৪n(n − ১)')] },
  samples: [
    { input: 'VC\n2 1\n1 V 2 C\naa', output: 'ab', explain: L('a is a vowel, b a consonant. The rule says a vowel at position 1 forces a consonant at position 2, so “aa” fails and the next candidate “ab” is the answer.', 'a স্বর, b ব্যঞ্জন। নিয়ম বলে ১ম অবস্থানে স্বর থাকলে ২য় অবস্থানে ব্যঞ্জন, তাই “aa” ব্যর্থ আর পরের প্রার্থী “ab”-ই উত্তর।') },
    { input: 'VC\n2 1\n1 C 2 V\nbb', output: '-1', explain: L('“bb” breaks the rule (a consonant first needs a vowel second), and no larger word over {a, b} exists.', '“bb” নিয়ম ভাঙে (প্রথমে ব্যঞ্জন হলে দ্বিতীয়টি স্বর হতে হয়), আর {a, b}-তে এর চেয়ে বড় কোনো শব্দ নেই।') },
    { input: 'VCC\n4 3\n1 C 2 V\n2 C 3 V\n3 V 4 V\nabac', output: 'acaa', explain: L('Positions 1–4 of “abac” fail, so we increase the last position that can grow: “ac” in the second place gives a consonant there, which forces a vowel at position 3, which forces a vowel at position 4, and the smallest completion is “acaa”.', '“abac”-এর ১–৪ অবস্থান ব্যর্থ, তাই যে শেষ অবস্থান বাড়ানো যায় সেটি বাড়াই: দ্বিতীয় স্থানে “c” ব্যঞ্জন, যা ৩য় অবস্থানে স্বর বাধ্য করে, যা ৪র্থ অবস্থানে স্বর বাধ্য করে; সবচেয়ে ছোট পূরণ “acaa”।') },
  ],
  observation: L(
    'A word only matters through the type (vowel or consonant) of each position. “Does a valid word exist with these positions already fixed?” is a 2-SAT question: one boolean per position (“is it a vowel?”), each rule is the implication “position p₁ has type t₁ ⇒ position p₂ has type t₂”, and a fixed position or a type missing from the alphabet is a unit clause. The smallest word ≥ s is then found by the usual lexicographic argument: keep the longest possible prefix of s, increase the letter right after it, and fill the rest with the smallest letters that keep the instance satisfiable.',
    'শব্দ শুধু প্রতিটি অবস্থানের ধরনের (স্বর বা ব্যঞ্জন) মধ্য দিয়ে গুরুত্বপূর্ণ। “এই অবস্থানগুলো ঠিক রেখে কোনো বৈধ শব্দ আছে কি?” একটি 2-SAT প্রশ্ন: প্রতি অবস্থানে একটি বুলিয়ান (“এটি কি স্বর?”), প্রতিটি নিয়ম হলো ইমপ্লিকেশন “p₁-এর ধরন t₁ ⇒ p₂-এর ধরন t₂”, আর ঠিক করা অবস্থান বা বর্ণমালায় অনুপস্থিত ধরন হলো একক ক্লজ। তখন s-এর সমান বা বড় সবচেয়ে ছোট শব্দ পাওয়া যায় স্বাভাবিক লেক্সিকোগ্রাফিক যুক্তিতে: s-এর সবচেয়ে লম্বা সম্ভব প্রিফিক্স রাখো, তার ঠিক পরের অক্ষর বাড়াও, আর বাকিটা এমন সবচেয়ে ছোট অক্ষর দিয়ে ভরো যাতে ইনস্ট্যান্স সন্তুষ্টিযোগ্য থাকে।',
  ),
  approach: [
    L('Write the implications into a graph with two nodes per position (vowel, consonant). For each rule add the edge and its contrapositive. Build this base graph once.', 'প্রতি অবস্থানে দুটি নোড (স্বর, ব্যঞ্জন) নিয়ে ইমপ্লিকেশনগুলো গ্রাফে লেখো। প্রতিটি নিয়মের জন্য কিনারা ও তার কনট্রাপজিটিভ যোগ করো। এই বেস গ্রাফ একবারই বানাও।'),
    L('feasible(fixed types): add one forced edge per fixed position and per missing type, run Tarjan’s SCC, and answer no exactly when some position has both of its nodes in one component.', 'feasible(নির্দিষ্ট ধরন): প্রতিটি নির্দিষ্ট অবস্থান ও অনুপস্থিত ধরনের জন্য একটি বাধ্যতামূলক কিনারা যোগ করো, Tarjan SCC চালাও, আর কোনো অবস্থানের দুটি নোড একই কম্পোনেন্টে থাকলে এবং শুধু তখনই উত্তর না।'),
    L('If s itself is feasible, print it. Otherwise for i = n − 1 down to 0: fix the types of s[0 … i − 1], and try raising position i to each larger letter, skipping a letter whose type already failed at this position. At the first feasible choice, complete the word.', 's নিজে feasible হলে সেটি প্রিন্ট করো। নইলে i = n − ১ থেকে ০: s[০ … i − ১]-এর ধরন ঠিক করো, আর অবস্থান i-কে প্রতিটি বড় অক্ষরে তুলে দেখো; এই অবস্থানে যে অক্ষরের ধরন আগেই ব্যর্থ তা বাদ দাও। প্রথম feasible পছন্দে শব্দটি সম্পূর্ণ করো।'),
    L('To complete: for each later position, test the smallest vowel and the smallest consonant of the alphabet in increasing letter order and keep the first one that stays feasible. If no position can be raised, print -1.', 'সম্পূর্ণ করতে: প্রতিটি পরের অবস্থানে বর্ণমালার সবচেয়ে ছোট স্বর ও সবচেয়ে ছোট ব্যঞ্জন অক্ষরের ক্রমে পরীক্ষা করো এবং প্রথম feasible-টি রাখো। কোনো অবস্থান বাড়ানো না গেলে -১।'),
  ],
  walkthrough: {
    input: 'VCC\n4 3\n1 C 2 V\n2 C 3 V\n3 V 4 V\nabac',
    steps: [
      { state: 'types: a = V, b = C, c = C; s = abac → V C V C', text: L('Position 3 is a vowel, so rule 3 demands a vowel at position 4, but s has a consonant there: infeasible.', 'অবস্থান ৩ স্বর, তাই নিয়ম ৩ অবস্থান ৪-এ স্বর দাবি করে, কিন্তু s-এ সেখানে ব্যঞ্জন: অসম্ভব।') },
      { state: 'raise position 4: no letter above “c”', text: L('The last letter is already the largest of the alphabet.', 'শেষ অক্ষর বর্ণমালার সবচেয়ে বড়ই।') },
      { state: 'raise position 3 (prefix “ab”): b or c, both consonants', text: L('Position 2 is the consonant b, so rule 2 demands a vowel at position 3. A consonant there is infeasible.', 'অবস্থান ২ ব্যঞ্জন b, তাই নিয়ম ২ অবস্থান ৩-এ স্বর দাবি করে। সেখানে ব্যঞ্জন অসম্ভব।') },
      { state: 'raise position 2 (prefix “a”): b → c', text: L('The prefix “ac” has types V C, which is feasible: rule 2 then forces a vowel at position 3 and rule 3 forces a vowel at position 4. The smallest vowel is a, so the completion is “aa” and the answer is acaa.', '“ac” প্রিফিক্সের ধরন V C, যা feasible: নিয়ম ২ অবস্থান ৩-এ স্বর বাধ্য করে, নিয়ম ৩ অবস্থান ৪-এ স্বর বাধ্য করে। সবচেয়ে ছোট স্বর a, তাই পূরণ “aa” এবং উত্তর acaa।') },
    ],
  },
  complexity: { time: 'O(n · (n + m))', space: 'O(n + m)', why: L('At most two feasibility checks per position while raising and two while completing, each a linear SCC pass over about 2m edges.', 'বাড়ানোর সময় প্রতি অবস্থানে সর্বোচ্চ দুটি আর পূরণের সময় দুটি feasibility পরীক্ষা, প্রতিটি প্রায় ২m কিনারায় রৈখিক SCC পাস।') },
  solutions: [
    {
      id: 'twosat',
      kind: 'optimal',
      title: L('Greedy over positions with a 2-SAT feasibility test', 'অবস্থান ধরে গ্রিডি, 2-SAT feasibility পরীক্ষাসহ'),
      idea: L('Keep the longest prefix of s, raise one letter, complete with the smallest letters that stay satisfiable.', 's-এর দীর্ঘতম প্রিফিক্স রাখো, একটি অক্ষর বাড়াও, সন্তুষ্টিযোগ্য থাকে এমন সবচেয়ে ছোট অক্ষর দিয়ে পূরণ করো।'),
      explain: [
        L('Only two candidate types exist per position, so there is no need to test all 26 letters: the smallest allowed letter of each type decides, and a type that fails once at a position fails for all of its letters.', 'প্রতি অবস্থানে প্রার্থী ধরন মাত্র দুটি, তাই সব ২৬ অক্ষর পরীক্ষার দরকার নেই: প্রতিটি ধরনের সবচেয়ে ছোট অনুমোদিত অক্ষরই ঠিক করে, আর একটি ধরন কোনো অবস্থানে একবার ব্যর্থ হলে তার সব অক্ষরের জন্যই ব্যর্থ।'),
        L('The base implication graph is built once and each feasibility call only adds at most one extra edge per node, which keeps the worst case with 160 000 rules fast.', 'বেস ইমপ্লিকেশন গ্রাফ একবারই বানানো হয় আর প্রতিটি feasibility কলে প্রতি নোডে সর্বোচ্চ একটি বাড়তি কিনারা যোগ হয়, ফলে ১৬০ ০০০ নিয়মের সবচেয়ে খারাপ ক্ষেত্রেও দ্রুত চলে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m, L;
string kind;                 // kind[c] is 'V' or 'C' for letter c
vector<array<int, 4>> rules;  // pos1, type1, pos2, type2 (type 0 = vowel, 1 = consonant)
bool has[2];

vector<vector<int>> base;  // implication graph of the rules, built once

// Is there a type assignment consistent with the rules and with the fixed positions?
// fixedType[i] is -1 (free), 0 (vowel) or 1 (consonant). Node 2*i + t means "position i has type t".
bool feasible(const vector<int>& fixedType) {
    int N = 2 * n;
    vector<int> extra(N, -1);  // one forced implication per node: "not this type" -> "the other type"
    for (int i = 0; i < n; i++) {
        if (fixedType[i] >= 0) extra[2 * i + (fixedType[i] ^ 1)] = 2 * i + fixedType[i];
        for (int t = 0; t < 2; t++)
            if (!has[t]) extra[2 * i + t] = 2 * i + (t ^ 1);
    }
    vector<int> idx(N, -1), low(N, 0), comp(N, -1), stk;
    vector<char> on(N, 0);
    int timer = 0, comps = 0;
    function<void(int)> dfs = [&](int v) {
        idx[v] = low[v] = timer++;
        stk.push_back(v);
        on[v] = 1;
        auto visit = [&](int u) {
            if (idx[u] < 0) { dfs(u); low[v] = min(low[v], low[u]); }
            else if (on[u]) low[v] = min(low[v], idx[u]);
        };
        for (int u : base[v]) visit(u);
        if (extra[v] >= 0) visit(extra[v]);
        if (low[v] == idx[v]) {
            while (true) {
                int u = stk.back(); stk.pop_back();
                on[u] = 0;
                comp[u] = comps;
                if (u == v) break;
            }
            comps++;
        }
    };
    for (int v = 0; v < N; v++)
        if (idx[v] < 0) dfs(v);
    for (int i = 0; i < n; i++)
        if (comp[2 * i] == comp[2 * i + 1]) return false;
    return true;
}

int main() {
    cin >> kind >> n >> m;
    L = kind.size();
    rules.resize(m);
    for (auto& r : rules) {
        char t1, t2;
        cin >> r[0] >> t1 >> r[2] >> t2;
        r[0]--; r[2]--;
        r[1] = t1 == 'C'; r[3] = t2 == 'C';
    }
    string s;
    cin >> s;
    base.assign(2 * n, {});
    for (auto& r : rules) {
        int a = 2 * r[0] + r[1], b = 2 * r[2] + r[3];
        base[a].push_back(b);
        base[b ^ 1].push_back(a ^ 1);
    }
    for (char ch : kind) has[ch == 'C'] = true;
    auto typeOf = [&](int letter) { return kind[letter] == 'C' ? 1 : 0; };
    vector<int> fixedType(n, -1);
    // w = s itself
    for (int i = 0; i < n; i++) fixedType[i] = typeOf(s[i] - 'a');
    if (feasible(fixedType)) { cout << s << endl; return 0; }
    for (int i = n - 1; i >= 0; i--) {
        fill(fixedType.begin(), fixedType.end(), -1);
        for (int j = 0; j < i; j++) fixedType[j] = typeOf(s[j] - 'a');
        bool failed[2] = {false, false};  // a type that is infeasible here is infeasible for every letter of it
        for (int c = s[i] - 'a' + 1; c < L; c++) {
            if (failed[typeOf(c)]) continue;
            fixedType[i] = typeOf(c);
            if (!feasible(fixedType)) { failed[typeOf(c)] = true; continue; }
            string w = s.substr(0, i) + char('a' + c);
            for (int j = i + 1; j < n; j++) {
                int first[2] = {-1, -1};
                for (int d = L - 1; d >= 0; d--) first[typeOf(d)] = d;
                vector<int> order;
                if (first[0] >= 0) order.push_back(first[0]);
                if (first[1] >= 0) order.push_back(first[1]);
                sort(order.begin(), order.end());
                for (int d : order) {
                    fixedType[j] = typeOf(d);
                    if (feasible(fixedType)) { w += char('a' + d); break; }
                }
            }
            cout << w << endl;
            return 0;
        }
    }
    cout << -1 << endl;
}
`,
      time: 'O(n · (n + m))',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['vector', 'io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Walk through all words from s upwards (tiny l and n)', 's থেকে ওপরের দিকে সব শব্দ ধরে হাঁটা (ছোট l ও n)'),
      idea: L('Increment the word like a base-l counter and test every rule.', 'শব্দকে base-l কাউন্টারের মতো বাড়াও এবং প্রতিটি নিয়ম পরীক্ষা করো।'),
      explain: [L('Correct by definition but exponential: it is the reference for stress tests.', 'সংজ্ঞা অনুযায়ী ঠিক কিন্তু এক্সপোনেনশিয়াল: স্ট্রেস টেস্টের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string kind, s;
    int n, m;
    cin >> kind >> n >> m;
    int L = kind.size();
    vector<array<int, 4>> rules(m);
    for (auto& r : rules) {
        char t1, t2;
        cin >> r[0] >> t1 >> r[2] >> t2;
        r[0]--; r[2]--;
        r[1] = t1 == 'C'; r[3] = t2 == 'C';
    }
    cin >> s;
    string w = s;
    while (true) {
        bool ok = true;
        for (auto& r : rules) {
            int a = kind[w[r[0]] - 'a'] == 'C', b = kind[w[r[2]] - 'a'] == 'C';
            if (a == r[1] && b != r[3]) { ok = false; break; }
        }
        if (ok) { cout << w << endl; return 0; }
        int i = n - 1;
        while (i >= 0 && w[i] == char('a' + L - 1)) w[i--] = 'a';
        if (i < 0) break;
        w[i]++;
    }
    cout << -1 << endl;
}
`,
      time: 'O(lⁿ · m)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: 'VC\n2 1\n1 V 2 C\naa', output: 'ab', source: 'sample', note: L('One rule forces the second letter up.', 'একটি নিয়ম দ্বিতীয় অক্ষর বাড়াতে বাধ্য করে।') },
    { input: 'VC\n2 1\n1 C 2 V\nbb', output: '-1', source: 'sample', note: L('No larger word exists.', 'বড় কোনো শব্দ নেই।') },
    { input: 'VCC\n4 3\n1 C 2 V\n2 C 3 V\n3 V 4 V\nabac', output: 'acaa', source: 'sample', note: L('A chain of implications.', 'ইমপ্লিকেশনের শৃঙ্খল।') },
    { input: 'VCCV\n3 2\n1 V 2 V\n2 C 3 C\nbbb', output: 'bbb', source: 'own', note: L('s itself is already valid.', 's নিজেই বৈধ।') },
  ],
  pitfalls: [
    L('Treating a rule as an equivalence: it is a one-way implication, so “position 1 is a consonant” says nothing about position 2 here.', 'নিয়মকে সমতুল্যতা ভাবা: এটি একমুখী ইমপ্লিকেশন, তাই “অবস্থান ১ ব্যঞ্জন” এখানে অবস্থান ২ সম্পর্কে কিছু বলে না।'),
    L('Forgetting the contrapositive edge: without it the implication graph is incomplete and 2-SAT answers wrongly.', 'কনট্রাপজিটিভ কিনারা ভুলে যাওয়া: তা ছাড়া ইমপ্লিকেশন গ্রাফ অসম্পূর্ণ এবং 2-SAT ভুল উত্তর দেয়।'),
    L('Forgetting that the alphabet may contain no vowel (or no consonant): that type must be forbidden at every position.', 'বর্ণমালায় স্বর (বা ব্যঞ্জন) না থাকতে পারে ভুলে যাওয়া: ওই ধরন প্রতিটি অবস্থানে নিষিদ্ধ করতে হবে।'),
    L('Raising a letter and then checking only the new position: the whole word, including the free suffix, must remain satisfiable.', 'অক্ষর বাড়িয়ে শুধু নতুন অবস্থান পরীক্ষা করা: মুক্ত সাফিক্সসহ পুরো শব্দ সন্তুষ্টিযোগ্য থাকতে হবে।'),
  ],
  related: [
    { id: '468B', name: 'Two Sets', why: L('Another problem where “this or that” constraints become 2-SAT.', 'আরেকটি সমস্যা যেখানে “এটা নয়তো ওটা” শর্ত 2-SAT হয়ে যায়।') },
    { id: '776D', name: 'The Door Problem', why: L('A cleaner first 2-SAT.', 'আরও পরিষ্কার প্রথম 2-SAT।') },
  ],
  toolkit: ['vector', 'io-basics'],
};

// ───────────────────────────────────────────── 468B
export const p468B: ProblemEntry = {
  id: '468B',
  contestId: 468,
  index: 'B',
  name: 'Two Sets',
  rating: 2000,
  tags: ['2-sat', 'dfs', 'dsu', 'graphs'],
  why: L(
    'Every number with a missing partner is forced into one set, and numbers that must travel together form groups, so it can be solved with a union-find and flags, or equally as a 2-SAT. Seeing that the rule “x in A forces a − x in A” is really an equivalence is what makes the groups appear.',
    'যে সংখ্যার সঙ্গী নেই সে একটি সেটে বাধ্য, আর যেসব সংখ্যা একসাথে যায় তারা গ্রুপ বানায়, তাই ইউনিয়ন-ফাইন্ড আর ফ্ল্যাগ দিয়ে সমাধান হয়, কিংবা সমানভাবে 2-SAT দিয়ে। “x ∈ A হলে a − x ∈ A” আসলে সমতুল্যতা, এটি দেখলেই গ্রুপগুলো স্পষ্ট হয়।',
  ),
  statement: L(
    'You have n distinct numbers p₁ … p_n and two numbers a and b. Split them into sets A and B (every number goes to exactly one) such that: if x is in A then a − x is also in A, and if x is in B then b − x is also in B. Print YES and, for every number in input order, 0 if it goes to A and 1 if it goes to B, or print NO.',
    'তোমার কাছে n টি ভিন্ন সংখ্যা p₁ … p_n এবং দুটি সংখ্যা a ও b। সংখ্যাগুলোকে সেট A ও B-তে ভাগ করো (প্রতিটি ঠিক একটিতে) যাতে: x ∈ A হলে a − x-ও A-তে, আর x ∈ B হলে b − x-ও B-তে। YES ও ইনপুটের ক্রমে প্রতিটি সংখ্যার জন্য ০ (A-তে) বা ১ (B-তে) প্রিন্ট করো, অথবা NO।',
  ),
  input: L('n a b, then the n numbers.', 'n a b, তারপর n টি সংখ্যা।'),
  output: L('NO, or YES and n values 0/1 (a checker accepts any valid split).', 'NO, অথবা YES ও n টি ০/১ মান (চেকার যেকোনো বৈধ ভাগ গ্রহণ করে)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ a, b, p_i ≤ 10⁹, p_i distinct', '১ ≤ n ≤ ১০⁵, ১ ≤ a, b, p_i ≤ ১০⁹, p_i ভিন্ন')] },
  samples: [
    { input: '4 5 9\n2 3 4 5', output: 'YES\n0 0 1 1', explain: L('2 and 3 add up to a = 5 so they live in A together; 4 and 5 add up to b = 9 so they live in B together.', '২ ও ৩-এর যোগফল a = ৫, তাই দুজনই A-তে; ৪ ও ৫-এর যোগফল b = ৯, তাই দুজনই B-তে।') },
    { input: '3 3 4\n1 2 4', output: 'NO', explain: L('The number 4 has no partner for a (3 − 4 is not in the list), so it must be in B; but then b − 4 = 0 would also be in B, and 0 is not in the list.', '৪-এর a-র সঙ্গী নেই (৩ − ৪ তালিকায় নেই), তাই সে B-তে; কিন্তু তখন b − ৪ = ০ও B-তে থাকত, আর ০ তালিকায় নেই।') },
  ],
  observation: L(
    'If x and a − x are both in the list, then x in A forces a − x in A, and a − x in A forces x in A (apply the rule to a − x). So, for such a pair, the two numbers are in A together, or neither is in A, i.e. both are in B. They always travel together. The same holds for x and b − x. Put x and its partners a − x and b − x into one union-find group. A number with no partner for a cannot be in A (its a-partner would be missing), so its whole group is forced into B; a number with no partner for b forces its group into A. A group forced both ways means NO; every other group can go to either side, and a forced side wins.',
    'x আর a − x দুটিই তালিকায় থাকলে x ∈ A হলে a − x ∈ A, আর a − x ∈ A হলে x ∈ A (নিয়মটি a − x-এ প্রয়োগ করো)। অর্থাৎ এমন জোড়ায় দুজন একসাথে A-তে, নয়তো কেউই A-তে নেই, মানে দুজনই B-তে। তারা সবসময় একসাথে চলে। x ও b − x-এর ক্ষেত্রেও একই। x এবং তার সঙ্গী a − x ও b − x-কে একই ইউনিয়ন-ফাইন্ড গ্রুপে রাখো। a-র সঙ্গীহীন সংখ্যা A-তে যেতে পারে না, তাই তার পুরো গ্রুপ B-তে বাধ্য; b-র সঙ্গীহীন সংখ্যা তার গ্রুপকে A-তে বাধ্য করে। একটি গ্রুপ দুই দিকেই বাধ্য হলে NO; বাকি গ্রুপ যেকোনো পাশে যেতে পারে, আর বাধ্যতামূলক পাশই প্রাধান্য পায়।',
  ),
  approach: [
    L('Index the numbers in a map. For each x, look up a − x and b − x.', 'সংখ্যাগুলোকে একটি ম্যাপে সূচিবদ্ধ করো। প্রতিটি x-এর জন্য a − x ও b − x খোঁজো।'),
    L('If a − x exists, union x with it; otherwise mark x “forced into B”. If b − x exists, union x with it; otherwise mark x “forced into A”.', 'a − x থাকলে x-কে তার সাথে ইউনিয়ন করো; নইলে x-কে “B-তে বাধ্য” চিহ্নিত করো। b − x থাকলে ইউনিয়ন করো; নইলে x-কে “A-তে বাধ্য” চিহ্নিত করো।'),
    L('Spread the marks to the group roots. If some group has both marks, print NO.', 'চিহ্নগুলো গ্রুপের রুটে ছড়িয়ে দাও। কোনো গ্রুপে দুটি চিহ্নই থাকলে NO।'),
    L('Print YES; a number gets 1 if its group is forced into B, otherwise 0.', 'YES প্রিন্ট করো; সংখ্যার গ্রুপ B-তে বাধ্য হলে ১, নইলে ০।'),
  ],
  walkthrough: {
    input: '4 5 9\n2 3 4 5',
    steps: [
      { state: 'a-partners: 2↔3, 4↔1 (missing), 5↔0 (missing)', text: L('2 and 3 are partners for a; 4 and 5 have no a-partner, so both are forced into B.', '২ ও ৩ a-র সঙ্গী; ৪ ও ৫-এর a-র সঙ্গী নেই, তাই দুজনই B-তে বাধ্য।') },
      { state: 'b-partners: 4↔5, 2↔7 (missing), 3↔6 (missing)', text: L('4 and 5 are partners for b; 2 and 3 have no b-partner, so both are forced into A.', '৪ ও ৫ b-র সঙ্গী; ২ ও ৩-এর b-র সঙ্গী নেই, তাই দুজনই A-তে বাধ্য।') },
      { state: 'groups {2, 3} → A, {4, 5} → B, no conflict', text: L('Output 0 0 1 1.', 'আউটপুট ০ ০ ১ ১।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One map lookup per number and per partner, near-constant union-find.', 'প্রতি সংখ্যা ও প্রতি সঙ্গীর জন্য একটি ম্যাপ খোঁজ, প্রায় ধ্রুব ইউনিয়ন-ফাইন্ড।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Union-find groups with forced flags', 'ফ্ল্যাগসহ ইউনিয়ন-ফাইন্ড গ্রুপ'),
      idea: L('Partners travel together; a missing partner forces the whole group to a side.', 'সঙ্গীরা একসাথে চলে; সঙ্গী না থাকলে পুরো গ্রুপ একটি পাশে বাধ্য।'),
      explain: [L('This is the 2-SAT solved without a graph search: the implication graph here only ever contains equivalences, so its strongly connected components are exactly the union-find groups, and the only contradictions are a group forced to both sides.', 'এটি গ্রাফ সার্চ ছাড়া সমাধান করা 2-SAT: এখানকার ইমপ্লিকেশন গ্রাফে শুধু সমতুল্যতাই থাকে, তাই এর শক্তভাবে সংযুক্ত কম্পোনেন্টই ইউনিয়ন-ফাইন্ড গ্রুপ, আর একমাত্র বিরোধ হলো গ্রুপ দুই পাশেই বাধ্য হওয়া।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> parent;
int find(int v) { return parent[v] == v ? v : parent[v] = find(parent[v]); }

int main() {
    int n;
    long long a, b;
    scanf("%d %lld %lld", &n, &a, &b);
    vector<long long> p(n);
    map<long long, int> id;
    for (int i = 0; i < n; i++) { scanf("%lld", &p[i]); id[p[i]] = i; }
    parent.resize(n);
    iota(parent.begin(), parent.end(), 0);
    vector<char> needB(n, 0), needA(n, 0);  // forced into B (no partner for a) / forced into A (no partner for b)
    for (int i = 0; i < n; i++) {
        auto ia = id.find(a - p[i]), ib = id.find(b - p[i]);
        if (ia != id.end()) parent[find(i)] = find(ia->second); else needB[i] = 1;
        if (ib != id.end()) parent[find(i)] = find(ib->second); else needA[i] = 1;
    }
    vector<char> compB(n, 0), compA(n, 0);
    for (int i = 0; i < n; i++) {
        if (needB[i]) compB[find(i)] = 1;
        if (needA[i]) compA[find(i)] = 1;
    }
    for (int i = 0; i < n; i++)
        if (compA[find(i)] && compB[find(i)]) { puts("NO"); return 0; }
    puts("YES");
    for (int i = 0; i < n; i++) printf("%d ", compB[find(i)] ? 1 : 0);
    puts("");
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'vector'],
    },
    {
      id: 'twosat',
      kind: 'alt',
      title: L('Straight 2-SAT with Tarjan’s SCC', 'সরাসরি 2-SAT, Tarjan SCC দিয়ে'),
      idea: L('One boolean per number; the rules are implications; read the assignment from the component order.', 'প্রতি সংখ্যায় একটি বুলিয়ান; নিয়মগুলো ইমপ্লিকেশন; কম্পোনেন্টের ক্রম থেকে অ্যাসাইনমেন্ট পড়ো।'),
      explain: [L('Each number i has two nodes, “in A” and “in B”. “x in A ⇒ a − x in A” and “x in B ⇒ b − x in B” are edges (with contrapositives); a missing partner adds the forcing edge “in A ⇒ in B” (or the reverse). The instance is unsatisfiable exactly when a number’s two nodes share a component, and otherwise the node whose component closes first in Tarjan’s order is true.', 'প্রতি সংখ্যা i-র দুটি নোড, “A-তে” ও “B-তে”। “x A-তে ⇒ a − x A-তে” ও “x B-তে ⇒ b − x B-তে” কিনারা (কনট্রাপজিটিভসহ); সঙ্গী না থাকলে বাধ্যতামূলক কিনারা “A-তে ⇒ B-তে” (বা উল্টো)। কোনো সংখ্যার দুই নোড এক কম্পোনেন্টে পড়লেই এবং শুধু তখনই অসন্তুষ্ট; নইলে Tarjan ক্রমে যে নোডের কম্পোনেন্ট আগে বন্ধ হয় সেটি সত্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long a, b;
    scanf("%d %lld %lld", &n, &a, &b);
    vector<long long> p(n);
    map<long long, int> id;
    for (int i = 0; i < n; i++) { scanf("%lld", &p[i]); id[p[i]] = i; }
    // node 2*i: number i is in A; node 2*i+1: number i is in B
    int N = 2 * n;
    vector<vector<int>> g(N);
    auto implies = [&](int u, int v) { g[u].push_back(v); g[v ^ 1].push_back(u ^ 1); };
    for (int i = 0; i < n; i++) {
        auto ia = id.find(a - p[i]), ib = id.find(b - p[i]);
        if (ia == id.end()) implies(2 * i, 2 * i + 1);          // cannot be in A, so it is in B
        else implies(2 * i, 2 * ia->second);                       // in A forces the partner into A
        if (ib == id.end()) implies(2 * i + 1, 2 * i);          // cannot be in B, so it is in A
        else implies(2 * i + 1, 2 * ib->second + 1);               // in B forces the partner into B
    }
    vector<int> idx(N, -1), low(N, 0), comp(N, -1), stk;
    vector<char> on(N, 0);
    int timer = 0, comps = 0;
    function<void(int)> dfs = [&](int v) {
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
    };
    for (int v = 0; v < N; v++)
        if (idx[v] < 0) dfs(v);
    for (int i = 0; i < n; i++)
        if (comp[2 * i] == comp[2 * i + 1]) { puts("NO"); return 0; }
    puts("YES");
    // Tarjan numbers components in reverse topological order: a smaller number is "later".
    for (int i = 0; i < n; i++) printf("%d ", comp[2 * i + 1] < comp[2 * i] ? 1 : 0);
    puts("");
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every split (tiny n)', 'সব ভাগ চেষ্টা (ছোট n)'),
      idea: L('Enumerate 2ⁿ splits and test both closure rules.', '২ⁿ ভাগ ধরে দুটি ক্লোজার নিয়মই পরীক্ষা করো।'),
      explain: [L('The definition as code; it is the reference that the checker compares YES/NO against.', 'সংজ্ঞাই কোড; চেকার YES/NO যার সাথে মেলায় সেই রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long a, b;
    scanf("%d %lld %lld", &n, &a, &b);
    vector<long long> p(n);
    set<long long> all;
    for (auto& x : p) { scanf("%lld", &x); all.insert(x); }
    for (int mask = 0; mask < (1 << n); mask++) {
        bool ok = true;
        set<long long> sa, sb;
        for (int i = 0; i < n; i++) (mask >> i & 1 ? sb : sa).insert(p[i]);
        for (long long x : sa) if (!sa.count(a - x)) ok = false;
        for (long long x : sb) if (!sb.count(b - x)) ok = false;
        if (!ok) continue;
        puts("YES");
        for (int i = 0; i < n; i++) printf("%d ", mask >> i & 1);
        puts("");
        return 0;
    }
    puts("NO");
}
`,
      time: 'O(2ⁿ · n log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['set', 'bit-shift'],
    },
  ],
  tests: [
    { input: '4 5 9\n2 3 4 5', output: 'YES\n0 0 1 1', source: 'sample', note: L('Two groups, each forced.', 'দুটি গ্রুপ, দুটিই বাধ্য।') },
    { input: '3 3 4\n1 2 4', output: 'NO', source: 'sample', note: L('4 has no partner on either side.', '৪-এর কোনো দিকেই সঙ্গী নেই।') },
    { input: '1 2 4\n1', output: 'YES\n0', source: 'own', note: L('A single number that is its own a-partner (2 − 1 = 1), so it fits in A.', 'একটিমাত্র সংখ্যা যে নিজেই নিজের a-র সঙ্গী (২ − ১ = ১), তাই A-তে বসে।') },
    { input: '6 10 7\n3 7 4 6 5 2', output: 'YES\n0 0 0 0 1 1', source: 'own', note: L('Free groups can go either way; any valid split is accepted.', 'মুক্ত গ্রুপ যেকোনো দিকে যেতে পারে; যেকোনো বৈধ ভাগ গ্রহণযোগ্য।') },
    { input: '2 8 8\n3 5', output: 'YES\n0 0', source: 'own', note: L('a = b: both rules agree, and 3 + 5 = 8 works for A.', 'a = b: দুটি নিয়ম একমত, ৩ + ৫ = ৮ তাই A-তে চলে।') },
    { input: '3 6 100\n3 4 2', output: 'YES\n0 0 0', source: 'own', note: L('Pairs 3 + 3, 4 + 2 for a = 6; b is useless here, so everything stays in A.', 'a = ৬-এর জন্য ৩ + ৩, ৪ + ২; এখানে b অকেজো, তাই সবই A-তে।') },
  ],
  pitfalls: [
    L('Thinking x ∈ B puts no constraint on a − x: because x ∈ A ⇔ a − x ∈ A, x ∈ B forces a − x ∈ B too.', 'ভাবা যে x ∈ B হলে a − x-এ কোনো শর্ত নেই: যেহেতু x ∈ A ⇔ a − x ∈ A, x ∈ B হলে a − x ∈ B-ও বাধ্য।'),
    L('Treating x = a − x (a = 2x) as a missing partner: it is its own partner and costs nothing.', 'x = a − x (a = ২x)-কে সঙ্গীহীন ধরা: সে নিজেই নিজের সঙ্গী, কোনো ঝামেলা নেই।'),
    L('Marking the forced flags on the number, not on its group root, before all unions are done.', 'সব ইউনিয়ন শেষ হওয়ার আগে ফ্ল্যাগ সংখ্যায় রাখা, গ্রুপ-রুটে নয়।'),
    L('Using 32-bit ints for a − x when a and x are up to 10⁹: use long long to be safe with negative values.', 'a ও x ১০⁹ পর্যন্ত হলে a − x-এ ৩২-বিট ব্যবহার: ঋণাত্মক মানের জন্য long long নাও।'),
  ],
  related: [
    { id: '568C', name: 'New Language', why: L('2-SAT as a feasibility oracle inside a greedy.', 'গ্রিডির ভেতরে feasibility অ্যাসক্রেল হিসেবে 2-SAT।') },
    { id: '776D', name: 'The Door Problem', why: L('Equivalence constraints that become union-find or 2-SAT.', 'সমতুল্যতা শর্ত যা ইউনিয়ন-ফাইন্ড বা 2-SAT হয়।') },
  ],
  toolkit: ['map', 'vector'],
};
