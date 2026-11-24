import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 1174F
export const p1174F: ProblemEntry = {
  id: '1174F',
  contestId: 1174,
  index: 'F',
  name: 'Ehab and the Big Finale',
  rating: 2400,
  interactive: true,
  tags: ['binary-search', 'constructive', 'dfs', 'interactive', 'trees'],
  why: L(
    'Walking down to the hidden vertex through heavy paths crosses at most log n light edges. Each heavy path costs one distance question (to find where x leaves the path) and one "next vertex" question, which is exactly what a limit of 36 allows.',
    'ভারী পথ ধরে লুকানো শীর্ষের দিকে নামলে সর্বোচ্চ log n টি হালকা edge পার হতে হয়। প্রতিটি ভারী পথে একটি দূরত্বের প্রশ্ন (x পথ কোথায় ছাড়ে তা জানতে) আর একটি "পরের শীর্ষ" প্রশ্ন লাগে, যা ঠিক ৩৬-এর সীমার সাথে মেলে।',
  ),
  statement: L(
    'A tree on n vertices is rooted at vertex 1 and the judge hides one vertex x. A question "d u" is answered with the distance from u to x. A question "s u" is answered with the second vertex on the path from u to x, but it is only allowed when u is a proper ancestor of x. With at most 36 questions, print "! x".',
    'n শীর্ষের একটি গাছ ১ নম্বর শীর্ষে মূলিত, আর জাজ একটি শীর্ষ x লুকিয়েছে। প্রশ্ন "d u"-র উত্তর u থেকে x-এর দূরত্ব। প্রশ্ন "s u"-র উত্তর u থেকে x-এর পথের দ্বিতীয় শীর্ষ, কিন্তু এটি শুধু তখনই অনুমোদিত যখন u, x-এর প্রকৃত পূর্বপুরুষ। সর্বোচ্চ ৩৬ প্রশ্নে "! x" প্রিন্ট করো।',
  ),
  input: L('First line: n, then n − 1 lines "u v" with the edges. After each question, one integer.', 'প্রথম লাইনে n, তারপর n − ১ টি লাইন "u v" (edge)। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা।'),
  output: L('Questions "d u" or "s u", then "! x". Flush after every line.', 'প্রশ্ন "d u" বা "s u", শেষে "! x"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, at most 36 questions', '২ ≤ n ≤ ২·১০⁵, সর্বোচ্চ ৩৬ প্রশ্ন')] },
  samples: [
    {
      input: '5\n1 2\n1 3\n3 4\n3 5\n5',
      output: 'OK',
      transcript: '< 5\n< 1 2\n< 1 3\n< 3 4\n< 3 5\n> d 1\n< 2\n> d 4\n< 2\n> s 3\n< 5\n> d 5\n< 0\n> ! 5',
      explain: L('The hidden vertex is 5, at depth 2. The heavy path from the root is 1 → 3 → 4. Vertex 4 is at distance 2 from 5, so the meeting point with the path is at depth (2 + 2 − 2)/2 = 1, which is vertex 3. Vertex 3 is not at depth 2, so we ask "s 3" and learn that the next vertex is 5. From 5 (a leaf) its own path is just 5, at distance 0, so x = 5. Four questions. ' + made.en, 'লুকানো শীর্ষ ৫, গভীরতা ২। মূল থেকে ভারী পথ ১ → ৩ → ৪। ৪ নম্বর ৫ থেকে দূরত্ব ২-এ, তাই পথের সাথে মিলনবিন্দু গভীরতা (২ + ২ − ২)/২ = ১-এ, অর্থাৎ ৩ নম্বর শীর্ষ। ৩ গভীরতা ২-এ নয়, তাই "s ৩" জিজ্ঞেস করে জানি পরের শীর্ষ ৫। ৫ (পাতা) থেকে তার নিজের পথ শুধু ৫, দূরত্ব ০, তাই x = ৫। চারটি প্রশ্ন। ' + made.bn),
    },
  ],
  observation: L(
    'Suppose u is an ancestor of x and v is the lower end of the heavy path from u. The meeting point w of v and x lies on the path from u to v, and its depth is (depth(v) + depth(x) − dist(v, x))/2. If w is as deep as x, then w is x. Otherwise x is below w, the heavy path from w does not lead to x, so "s w" steps onto a light edge, and a light edge at least halves the subtree size.',
    'ধরো u, x-এর পূর্বপুরুষ আর v হলো u থেকে ভারী পথের নিচের প্রান্ত। v ও x-এর মিলনবিন্দু w, u থেকে v-র পথে থাকে, আর তার গভীরতা (depth(v) + depth(x) − dist(v, x))/২। w যদি x-এর সমান গভীর হয়, তবে w-ই x। নয়তো x, w-র নিচে, w থেকে ভারী পথ x-এ যায় না, তাই "s w" একটি হালকা edge-এ নামায়, আর হালকা edge উপগাছার আকার কমপক্ষে অর্ধেক করে।',
  ),
  approach: [
    L('Root the tree at 1, compute depths, subtree sizes and the heavy child of every vertex.', 'গাছ ১-এ মূলিত করো, গভীরতা, উপগাছার আকার আর প্রতিটি শীর্ষের ভারী সন্তান বের করো।'),
    L('Ask "d 1" to get D, the depth of x. Set u = 1.', '"d ১" জিজ্ঞেস করে x-এর গভীরতা D পাও। u = ১ ধরো।'),
    L('Let v be the end of the heavy path from u. Ask "d v" and compute the depth l = (depth(v) + D − d)/2. Climb from v to the ancestor w at depth l.', 'u থেকে ভারী পথের শেষ প্রান্ত v ধরো। "d v" জিজ্ঞেস করে গভীরতা l = (depth(v) + D − d)/২ বের করো। v থেকে উঠে গভীরতা l-এর পূর্বপুরুষ w-তে যাও।'),
    L('If depth(w) = D then x = w: print it. Otherwise ask "s w", set u to the answer and repeat.', 'depth(w) = D হলে x = w: প্রিন্ট করো। নয়তো "s w" জিজ্ঞেস করো, u-কে উত্তর ধরো আর পুনরাবৃত্তি করো।'),
    L('Questions: 1 + 2 per light edge + 1 final, at most about 36 for n up to 2·10⁵.', 'প্রশ্ন: ১ + প্রতি হালকা edge-এ ২ + শেষে ১, n ২·১০⁵ পর্যন্ত হলে সর্বোচ্চ প্রায় ৩৬।'),
  ],
  walkthrough: {
    input: '5\n1 2\n1 3\n3 4\n3 5\n5',
    steps: [
      { state: 'd 1 → 2', text: L('D = 2. Heavy path from 1: 1 → 3 → 4.', 'D = ২। ১ থেকে ভারী পথ: ১ → ৩ → ৪।') },
      { state: 'd 4 → 2', text: L('l = (2 + 2 − 2)/2 = 1, so w is the ancestor of 4 at depth 1: vertex 3.', 'l = (২ + ২ − ২)/২ = ১, তাই w হলো ৪-এর গভীরতা ১-এর পূর্বপুরুষ: ৩।') },
      { state: 's 3 → 5', text: L('Depth of 3 is 1, not 2, so step to the next vertex: 5.', '৩-এর গভীরতা ১, ২ নয়, তাই পরের শীর্ষে যাও: ৫।') },
      { state: 'd 5 → 0', text: L('5 is a leaf, its heavy path is itself and the distance is 0: w = 5 at depth 2 = D.', '৫ পাতা, তার ভারী পথ সে নিজেই আর দূরত্ব ০: w = ৫, গভীরতা ২ = D।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass to preprocess, and the climbs along heavy paths add up to at most n steps.', 'একটি পাসে প্রস্তুতি, আর ভারী পথ ধরে ওঠাগুলো মিলে সর্বোচ্চ n ধাপ।') },
  solutions: [
    {
      id: 'hld',
      kind: 'optimal',
      title: L('Descend heavy path by heavy path', 'ভারী পথ ধরে ধরে নামা'),
      idea: L('A distance question locates the exit point of the path; "s" takes the light edge.', 'দূরত্বের প্রশ্ন পথের বেরোনোর বিন্দু খুঁজে দেয়; "s" হালকা edge ধরায়।'),
      explain: [
        L('Choosing the heavy child by subtree size guarantees at most about log₂ n light edges on any root-to-vertex path, which is why 36 questions are enough.', 'উপগাছার আকার অনুযায়ী ভারী সন্তান বাছলে মূল থেকে যেকোনো শীর্ষের পথে সর্বোচ্চ প্রায় log₂ n টি হালকা edge থাকে, তাই ৩৬ প্রশ্নই যথেষ্ট।'),
        L('The query "s w" is legal because w is a proper ancestor of x when depth(w) < D.', 'প্রশ্ন "s w" বৈধ কারণ depth(w) < D হলে w, x-এর প্রকৃত পূর্বপুরুষ।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(char c, int u) {
    cout << c << " " << u << endl;
    int r;
    cin >> r;
    return r;
}

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
    vector<int> par(n + 1, 0), dep(n + 1, 0), sz(n + 1, 1), heavy(n + 1, 0), order;
    order.push_back(1);
    for (size_t h = 0; h < order.size(); h++) {
        int u = order[h];
        for (int w : adj[u])
            if (w != par[u]) {
                par[w] = u;
                dep[w] = dep[u] + 1;
                order.push_back(w);
            }
    }
    for (int i = n - 1; i >= 1; i--) sz[par[order[i]]] += sz[order[i]];
    for (int u : order) {
        int best = 0;
        for (int w : adj[u])
            if (w != par[u] && (best == 0 || sz[w] > sz[best])) best = w;
        heavy[u] = best;
    }
    int D = ask('d', 1);
    int u = 1;
    while (true) {
        int v = u;
        while (heavy[v]) v = heavy[v];
        int dv = ask('d', v);
        int l = (dep[v] + D - dv) / 2;
        int w = v;
        while (dep[w] > l) w = par[w];
        if (dep[w] == D) {
            cout << "! " << w << endl;
            return 0;
        }
        u = ask('s', w);
    }
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector'],
    },
    {
      id: 'scan',
      kind: 'brute',
      title: L('Ask the distance of every vertex', 'প্রতিটি শীর্ষের দূরত্ব জিজ্ঞেস'),
      idea: L('The vertex with distance 0 is x: up to n questions.', 'দূরত্ব ০ যার সে-ই x: সর্বোচ্চ n প্রশ্ন।'),
      explain: [L('Always right, never uses "s", and exceeds 36 questions as soon as n is large and x is late in the order.', 'সবসময় সঠিক, "s" ব্যবহার করে না, আর n বড় আর x পরের দিকে থাকলেই ৩৬ প্রশ্ন ছাড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
    }
    for (int u = 1; u <= n; u++) {
        cout << "d " << u << endl;
        int r;
        cin >> r;
        if (r == 0) {
            cout << "! " << u << endl;
            return 0;
        }
    }
}
`,
      time: 'O(n) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2\n1 2\n1', output: 'OK', source: 'own', note: L('Smallest tree, x is the root: depth 0.', 'সবচেয়ে ছোট গাছ, x মূল: গভীরতা ০।') },
    { input: '2\n1 2\n2', output: 'OK', source: 'own', note: L('Smallest tree, x is the leaf.', 'সবচেয়ে ছোট গাছ, x পাতা।') },
    { input: '6\n1 2\n2 3\n3 4\n4 5\n5 6\n4', output: 'OK', source: 'own', note: L('A path: one heavy path, no light edge needed.', 'পথ: একটি ভারী পথ, হালকা edge লাগে না।') },
    { input: '7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7\n7', output: 'OK', source: 'own', note: L('A complete binary tree: every step takes a light or heavy edge by tie-breaking.', 'পূর্ণ বাইনারি গাছ: টাই-ব্রেকিং অনুযায়ী প্রতি ধাপে হালকা বা ভারী edge।') },
    { input: '8\n1 2\n1 3\n1 4\n1 5\n1 6\n1 7\n1 8\n6', output: 'OK', source: 'own', note: L('A star: x is a light child of the root.', 'স্টার: x মূলের হালকা সন্তান।') },
    { input: '5\n1 2\n1 3\n3 4\n3 5\n5', output: 'OK', source: 'own', note: L('The tree used in the walkthrough.', 'ওয়াকথ্রুতে ব্যবহৃত গাছ।') },
  ],
  pitfalls: [
    L('Asking "s u" for a vertex that is not an ancestor of x: the judge answers with an error. Only use it for w when depth(w) < D.', 'x-এর পূর্বপুরুষ নয় এমন শীর্ষে "s u" জিজ্ঞেস: জাজ ভুলের বার্তা দেয়। শুধু depth(w) < D হলে w-তে ব্যবহার করো।'),
    L('Choosing any child instead of the heavy child: a long chain of light edges would break the limit of 36.', 'ভারী সন্তানের বদলে যেকোনো সন্তান বাছা: হালকা edge-এর লম্বা শৃঙ্খল ৩৬-এর সীমা ভাঙবে।'),
    L('Forgetting the first "d 1": without D you cannot decide whether w is already x.', 'প্রথম "d ১" ভুলে যাওয়া: D ছাড়া w ইতোমধ্যে x কি না তা ঠিক করা যায় না।'),
    L('Recursion on a path-shaped tree with n = 2·10⁵: build the rooted tree with a BFS order, not recursion.', 'n = ২·১০⁵ পথাকার গাছে রিকার্শন: রিকার্শনের বদলে BFS ক্রমে মূলিত গাছ বানাও।'),
  ],
  related: [
    { id: '1534D', name: 'Lost Tree', why: L('Another interactive problem on a hidden tree.', 'লুকানো গাছ নিয়ে আরেকটি ইন্টারঅ্যাকটিভ সমস্যা।') },
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Narrowing down a hidden position.', 'লুকানো অবস্থান সরু করা।') },
  ],
  toolkit: ['io-basics', 'vector'],
};

// ───────────────────────────────────────────── 713B
export const p713B: ProblemEntry = {
  id: '713B',
  contestId: 713,
  index: 'B',
  name: 'Searching Rectangles',
  rating: 2200,
  interactive: true,
  tags: ['binary-search', 'divide-and-conquer', 'interactive'],
  why: L(
    'Two disjoint rectangles can always be pulled apart by a vertical or a horizontal line. Binary search finds that line, and then each rectangle sits alone in its own half, where four more binary searches find its four edges.',
    'দুটি বিচ্ছিন্ন আয়তক্ষেত্রকে সবসময় একটি উল্লম্ব বা অনুভূমিক রেখা দিয়ে আলাদা করা যায়। বাইনারি সার্চ সেই রেখা খোঁজে, তারপর প্রতিটি আয়তক্ষেত্র নিজের অর্ধেকে একা থাকে, যেখানে আরও চারটি বাইনারি সার্চ তার চার প্রান্ত বের করে।',
  ),
  statement: L(
    'An n × n grid contains two axis-aligned rectangles that share no cell. The judge hides them. A question "? x1 y1 x2 y2" about a rectangle of the grid is answered with how many of the two hidden rectangles lie completely inside it (0, 1 or 2). With at most 200 questions, print "! " followed by the eight numbers of the two rectangles, in either order.',
    'n × n গ্রিডে দুটি অক্ষ-সমান্তরাল আয়তক্ষেত্র আছে যাদের কোনো ঘর সাধারণ নয়। জাজ তাদের লুকিয়েছে। গ্রিডের একটি আয়তক্ষেত্রের প্রশ্ন "? x1 y1 x2 y2"-এর উত্তর লুকানো দুটির মধ্যে কয়টি সম্পূর্ণ তার ভেতরে (০, ১ বা ২)। সর্বোচ্চ ২০০ প্রশ্নে "! " এর পর দুই আয়তক্ষেত্রের আটটি সংখ্যা প্রিন্ট করো, যেকোনো ক্রমে।',
  ),
  input: L('First line: n. After each question, one integer: 0, 1 or 2.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: ০, ১ বা ২।'),
  output: L('Questions "? x1 y1 x2 y2" (x1 ≤ x2, y1 ≤ y2), then "! x1 y1 x2 y2 x1 y1 x2 y2". Flush after every line.', 'প্রশ্ন "? x1 y1 x2 y2" (x1 ≤ x2, y1 ≤ y2), শেষে "! x1 y1 x2 y2 x1 y1 x2 y2"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 2¹⁶, at most 200 questions', '২ ≤ n ≤ ২¹⁶, সর্বোচ্চ ২০০ প্রশ্ন')] },
  samples: [
    {
      input: '3\n1 1 1 1\n3 3 3 3',
      output: 'OK',
      transcript: '< 3\n> ? 1 1 2 3\n< 1\n> ? 1 1 1 3\n< 1\n> ? 1 1 1 3\n< 1\n> ? 2 1 3 3\n< 1\n> ? 1 1 1 2\n< 1\n> ? 1 1 1 1\n< 1\n> ? 1 2 1 3\n< 0\n> ? 2 1 2 3\n< 0\n> ? 3 1 3 3\n< 1\n> ? 2 1 3 2\n< 0\n> ? 2 2 3 3\n< 1\n> ? 2 3 3 3\n< 1\n> ! 1 1 1 1 3 3 3 3',
      explain: L('The rectangles are the single cells (1, 1) and (3, 3). Columns up to x = 1 already contain one rectangle (found by halving), and the columns from x = 2 on contain the other, so a vertical line separates them. Inside the left strip the rectangle is pinned down by two more searches (the y-range), inside the right strip by four short searches. ' + made.en, 'আয়তক্ষেত্র দুটি একক ঘর (১, ১) আর (৩, ৩)। x = ১ পর্যন্ত কলামেই একটি আয়তক্ষেত্র আছে (অর্ধেক করে পাওয়া), আর x = ২ থেকে কলামে অন্যটি, তাই একটি উল্লম্ব রেখা তাদের আলাদা করে। বাঁ ফালিতে আরও দুটি সার্চে আয়তক্ষেত্র ঠিক হয় (y-পাল্লা), ডান ফালিতে চারটি ছোট সার্চে। ' + made.bn),
    },
  ],
  observation: L(
    'Two disjoint axis-aligned rectangles cannot overlap in both their x-ranges and their y-ranges, or they would share a cell. So either their x-ranges are disjoint or their y-ranges are. A prefix of the grid [1, m] × [1, n] contains a rectangle completely as soon as m reaches its right edge, so counting turns into a monotone yes/no and binary search works.',
    'দুটি বিচ্ছিন্ন অক্ষ-সমান্তরাল আয়তক্ষেত্রের x-পাল্লা আর y-পাল্লা দুটিতেই একসাথে ওভারল্যাপ হতে পারে না, নয়তো তারা একটি ঘর ভাগ করত। তাই হয় x-পাল্লা বিচ্ছিন্ন, নয়তো y-পাল্লা। গ্রিডের প্রিফিক্স [১, m] × [১, n] একটি আয়তক্ষেত্রকে সম্পূর্ণ ধরে যখনই m তার ডান প্রান্তে পৌঁছায়, তাই গণনা একঘাতী হ্যাঁ/না হয়ে যায় আর বাইনারি সার্চ চলে।',
  ),
  approach: [
    L('Find x0, the smallest m with a rectangle inside [1, m] × [1, n]. If exactly one rectangle is inside, and exactly one lies inside [x0 + 1, n] × [1, n], the line after column x0 separates them.', 'x0 বের করো: ক্ষুদ্রতম m যার জন্য [১, m] × [১, n]-এ একটি আয়তক্ষেত্র আছে। ঠিক একটি ভেতরে হলে আর ঠিক একটি [x0 + ১, n] × [১, n]-এ থাকলে, x0 কলামের পরের রেখা তাদের আলাদা করে।'),
    L('Otherwise do the same with rows: y0 is the smallest m with a rectangle inside [1, n] × [1, m]. This must work.', 'নয়তো একই কাজ সারিতে করো: y0 হলো ক্ষুদ্রতম m যার জন্য [১, n] × [১, m]-এ একটি আয়তক্ষেত্র আছে। এটি অবশ্যই কাজ করবে।'),
    L('Each side now holds exactly one rectangle. Find its right edge (smallest m such that [X1, m] contains it), left edge (largest m such that [m, X2] contains it), and the two y-edges the same way.', 'এখন প্রতি পাশে ঠিক একটি আয়তক্ষেত্র। তার ডান প্রান্ত (ক্ষুদ্রতম m যাতে [X1, m] তাকে ধরে), বাঁ প্রান্ত (বৃহত্তম m যাতে [m, X2] তাকে ধরে), আর y-এর দুই প্রান্ত একইভাবে বের করো।'),
    L('Questions: about 2 · 16 for the line and 8 · 16 for the eight edges: at most about 165, below 200.', 'প্রশ্ন: রেখার জন্য প্রায় ২ · ১৬ আর আট প্রান্তের জন্য ৮ · ১৬: সর্বোচ্চ প্রায় ১৬৫, ২০০-র নিচে।'),
  ],
  walkthrough: {
    input: '3\n1 1 1 1\n3 3 3 3',
    steps: [
      { state: 'find x0', text: L('[1, 2] × [1, 3] holds one rectangle, [1, 1] × [1, 3] too, so x0 = 1.', '[১, ২] × [১, ৩]-এ একটি আয়তক্ষেত্র, [১, ১] × [১, ৩]-এও, তাই x0 = ১।') },
      { state: 'check the split', text: L('One rectangle on the left of the line, one on the right: vertical split.', 'রেখার বাঁয়ে একটি, ডানে একটি: উল্লম্ব বিভাজন।') },
      { state: 'left strip', text: L('Its x-range is just column 1; two searches give the y-range 1 … 1.', 'তার x-পাল্লা শুধু কলাম ১; দুটি সার্চে y-পাল্লা ১ … ১।') },
      { state: 'right strip', text: L('Four searches give x = 3 … 3 and y = 3 … 3.', 'চারটি সার্চে x = ৩ … ৩ আর y = ৩ … ৩।') },
    ],
  },
  complexity: { time: 'O(log n) questions', space: 'O(1)', why: L('Ten binary searches, each about log₂ n questions.', 'দশটি বাইনারি সার্চ, প্রতিটিতে প্রায় log₂ n প্রশ্ন।') },
  solutions: [
    {
      id: 'split',
      kind: 'optimal',
      title: L('Binary search a separating line, then each rectangle\'s four edges', 'বিভাজক রেখা বাইনারি সার্চে, তারপর প্রতিটি আয়তক্ষেত্রের চার প্রান্ত'),
      idea: L('"Is the rectangle inside the prefix?" is monotone in the prefix length.', '"আয়তক্ষেত্র কি প্রিফিক্সের ভেতরে?" প্রিফিক্সের দৈর্ঘ্যে একঘাতী।'),
      explain: [
        L('Inside a strip that holds exactly one rectangle, a query returns 1 exactly when the whole rectangle fits in the query, so every edge is a plain monotone search.', 'ঠিক একটি আয়তক্ষেত্রওয়ালা ফালির ভেতরে প্রশ্ন তখনই ১ দেয় যখন পুরো আয়তক্ষেত্র প্রশ্নে ধরে, তাই প্রতিটি প্রান্ত সাধারণ একঘাতী সার্চ।'),
        L('The other rectangle can never be counted inside a sub-query of its own strip, because it lies completely outside that strip.', 'অন্য আয়তক্ষেত্র নিজের ফালির উপ-প্রশ্নে কখনও গোনা পড়ে না, কারণ সে ওই ফালির সম্পূর্ণ বাইরে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;

int ask(int x1, int y1, int x2, int y2) {
    cout << "? " << x1 << " " << y1 << " " << x2 << " " << y2 << endl;
    int r;
    cin >> r;
    return r;
}

struct Rect { int x1, y1, x2, y2; };

// the single rectangle inside the strip [X1,X2] x [Y1,Y2]
Rect locate(int X1, int Y1, int X2, int Y2) {
    Rect r;
    int lo = X1, hi = X2;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (ask(X1, Y1, mid, Y2) >= 1) hi = mid; else lo = mid + 1;
    }
    r.x2 = lo;
    lo = X1; hi = X2;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (ask(mid, Y1, X2, Y2) >= 1) lo = mid; else hi = mid - 1;
    }
    r.x1 = lo;
    lo = Y1; hi = Y2;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (ask(X1, Y1, X2, mid) >= 1) hi = mid; else lo = mid + 1;
    }
    r.y2 = lo;
    lo = Y1; hi = Y2;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (ask(X1, mid, X2, Y2) >= 1) lo = mid; else hi = mid - 1;
    }
    r.y1 = lo;
    return r;
}

int main() {
    cin >> n;
    int lo = 1, hi = n;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (ask(1, 1, mid, n) >= 1) hi = mid; else lo = mid + 1;
    }
    int x0 = lo;
    Rect a, b;
    if (ask(1, 1, x0, n) == 1 && x0 < n && ask(x0 + 1, 1, n, n) == 1) {
        a = locate(1, 1, x0, n);
        b = locate(x0 + 1, 1, n, n);
    } else {
        lo = 1; hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ask(1, 1, n, mid) >= 1) hi = mid; else lo = mid + 1;
        }
        int y0 = lo;
        a = locate(1, 1, n, y0);
        b = locate(1, y0 + 1, n, n);
    }
    cout << "! " << a.x1 << " " << a.y1 << " " << a.x2 << " " << a.y2 << " "
         << b.x1 << " " << b.y1 << " " << b.x2 << " " << b.y2 << endl;
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'binary-search'],
    },
    {
      id: 'linear',
      kind: 'brute',
      title: L('The same plan with linear scans', 'একই পরিকল্পনা, রৈখিক স্ক্যানে'),
      idea: L('Replace every halving by walking one column or row at a time: up to n questions per edge.', 'প্রতিটি অর্ধেক করাকে এক কলাম বা সারি করে হাঁটা দিয়ে বদলাও: প্রতি প্রান্তে সর্বোচ্চ n প্রশ্ন।'),
      explain: [L('Identical logic, so it is a good check of the strip idea, but it needs O(n) questions and fails the limit of 200 once n is above about 20.', 'একই যুক্তি, তাই ফালির ধারণার ভালো পরীক্ষা, কিন্তু O(n) প্রশ্ন লাগে আর n প্রায় ২০-র ওপরে হলে ২০০-র সীমা ভাঙে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;

int ask(int x1, int y1, int x2, int y2) {
    cout << "? " << x1 << " " << y1 << " " << x2 << " " << y2 << endl;
    int r;
    cin >> r;
    return r;
}

struct Rect { int x1, y1, x2, y2; };

Rect locate(int X1, int Y1, int X2, int Y2) {
    Rect r;
    r.x2 = X2;
    for (int m = X1; m < X2; m++)
        if (ask(X1, Y1, m, Y2) >= 1) { r.x2 = m; break; }
    r.x1 = X1;
    for (int m = X2; m > X1; m--)
        if (ask(m, Y1, X2, Y2) >= 1) { r.x1 = m; break; }
    r.y2 = Y2;
    for (int m = Y1; m < Y2; m++)
        if (ask(X1, Y1, X2, m) >= 1) { r.y2 = m; break; }
    r.y1 = Y1;
    for (int m = Y2; m > Y1; m--)
        if (ask(X1, m, X2, Y2) >= 1) { r.y1 = m; break; }
    return r;
}

int main() {
    cin >> n;
    int x0 = n;
    for (int m = 1; m < n; m++)
        if (ask(1, 1, m, n) >= 1) { x0 = m; break; }
    Rect a, b;
    if (ask(1, 1, x0, n) == 1 && x0 < n && ask(x0 + 1, 1, n, n) == 1) {
        a = locate(1, 1, x0, n);
        b = locate(x0 + 1, 1, n, n);
    } else {
        int y0 = n;
        for (int m = 1; m < n; m++)
            if (ask(1, 1, n, m) >= 1) { y0 = m; break; }
        a = locate(1, 1, n, y0);
        b = locate(1, y0 + 1, n, n);
    }
    cout << "! " << a.x1 << " " << a.y1 << " " << a.x2 << " " << a.y2 << " "
         << b.x1 << " " << b.y1 << " " << b.x2 << " " << b.y2 << endl;
}
`,
      time: 'O(n) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2\n1 1 1 1\n2 2 2 2', output: 'OK', source: 'own', note: L('The smallest grid, two diagonal cells.', 'সবচেয়ে ছোট গ্রিড, দুটি কোণাকুণি ঘর।') },
    { input: '2\n1 1 2 1\n1 2 2 2', output: 'OK', source: 'own', note: L('Two full-width bars: only a horizontal line separates them.', 'দুটি পূর্ণ-প্রস্থ পট্টি: শুধু অনুভূমিক রেখা আলাদা করে।') },
    { input: '5\n1 2 2 3\n4 1 5 5', output: 'OK', source: 'own', note: L('A short rectangle and a tall one on the right.', 'একটি ছোট আয়তক্ষেত্র আর ডানে একটি লম্বা।') },
    { input: '6\n2 2 5 3\n1 5 6 6', output: 'OK', source: 'own', note: L('The x-ranges overlap, the y-ranges do not.', 'x-পাল্লা ওভারল্যাপ করে, y-পাল্লা করে না।') },
    { input: '8\n1 1 4 4\n5 1 8 8', output: 'OK', source: 'own', note: L('Sharing no column: a vertical line, one rectangle taller than the other.', 'কোনো কলাম ভাগ নয়: উল্লম্ব রেখা, একটি অন্যটির চেয়ে লম্বা।') },
    { input: '3\n1 1 1 1\n3 3 3 3', output: 'OK', source: 'own', note: L('The tiny example from the walkthrough.', 'ওয়াকথ্রুর ছোট উদাহরণ।') },
  ],
  pitfalls: [
    L('Assuming the separating line is always vertical: when the x-ranges overlap you must switch to rows.', 'বিভাজক রেখা সবসময় উল্লম্ব ধরে নেওয়া: x-পাল্লা ওভারল্যাপ করলে সারিতে যেতেই হবে।'),
    L('Using the count of the whole prefix instead of "at least one": inside a strip the count is 0 or 1, but for the first search it can be 2.', 'প্রিফিক্সের পুরো গণনা ব্যবহার, "অন্তত একটি"-র বদলে: ফালির ভেতরে গণনা ০ বা ১, কিন্তু প্রথম সার্চে ২ হতে পারে।'),
    L('Mixing up lower and upper bounds in the "largest m" searches: use (lo + hi + 1) / 2 so the search always makes progress.', '"বৃহত্তম m" সার্চে নিচ ও ওপরের সীমা গুলিয়ে ফেলা: (lo + hi + ১) / ২ ব্যবহার করো যাতে সার্চ সবসময় এগোয়।'),
    L('Forgetting the second check ask(x0 + 1, …): one rectangle inside the prefix does not prove the other lies completely to the right.', 'দ্বিতীয় পরীক্ষা ask(x0 + ১, …) ভুলে যাওয়া: প্রিফিক্সে একটি আয়তক্ষেত্র থাকা প্রমাণ করে না যে অন্যটি সম্পূর্ণ ডানে।'),
  ],
  related: [
    { id: '1153E', name: 'Serval and Snake', why: L('Rectangle queries on a grid again.', 'আবারও গ্রিডে আয়তক্ষেত্রের প্রশ্ন।') },
    { id: '1797C', name: 'Li Hua and Chess', why: L('Finding hidden cells with few questions.', 'কম প্রশ্নে লুকানো ঘর খোঁজা।') },
  ],
  toolkit: ['io-basics', 'binary-search'],
};
