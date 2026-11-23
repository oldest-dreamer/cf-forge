import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p939A: ProblemEntry = {
  id: '939A',
  contestId: 939,
  index: 'A',
  name: 'Love Triangle',
  rating: 800,
  tags: ['graphs'],
  why: L('A functional graph: detect a cycle of length exactly 3 by following edges three times.', 'একটি ফাংশনাল গ্রাফ: তিনবার প্রান্ত অনুসরণ করে ঠিক ৩ দৈর্ঘ্যের চক্র শনাক্ত করা।'),
  statement: L(
    'There are n planes; plane i likes plane fᵢ (fᵢ ≠ i). A love triangle is three planes A, B, C where A likes B, B likes C and C likes A. Is there a love triangle?',
    'n-টি প্লেন; প্লেন i পছন্দ করে প্লেন fᵢ-কে (fᵢ ≠ i)। ভালোবাসার ত্রিভুজ হলো তিনটি প্লেন A, B, C যেখানে A পছন্দ করে B-কে, B পছন্দ করে C-কে আর C পছন্দ করে A-কে। কোনো ভালোবাসার ত্রিভুজ আছে কি?',
  ),
  input: L('n, then f₁ … fₙ.', 'n, তারপর f₁ … fₙ।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 5000', '২ ≤ n ≤ ৫০০০')] },
  samples: [
    { input: '5\n2 4 5 1 3', output: 'YES', explain: L('1 → 2 → 4 → 1.', '১ → ২ → ৪ → ১।') },
    { input: '5\n5 5 5 5 1', output: 'NO', explain: L('Only the pair 1 ↔ 5.', 'শুধু জোড়া ১ ↔ ৫।') },
  ],
  observation: L('Each plane has exactly one outgoing edge, so a triangle through i exists exactly when f(f(f(i))) = i. Because fᵢ ≠ i, this cannot be a cycle of length 1.', 'প্রতিটি প্লেনের ঠিক একটি বহির্গামী প্রান্ত, তাই i দিয়ে ত্রিভুজ থাকে ঠিক তখনই যখন f(f(f(i))) = i। fᵢ ≠ i হওয়ায় এটি ১ দৈর্ঘ্যের চক্র হতে পারে না।'),
  approach: [L('Check f[f[f[i]]] == i for every i.', 'প্রতিটি i-এর জন্য f[f[f[i]]] == i দেখুন।')],
  walkthrough: { input: '2 4 5 1 3', steps: [{ state: 'f(1)=2, f(2)=4, f(4)=1', text: L('Back to 1: YES.', '১-এ ফেরা: YES।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Three lookups per plane.', 'প্রতি প্লেনে তিনটি খোঁজ।') },
  solutions: [
    {
      id: 'three-steps',
      kind: 'optimal',
      title: L('Follow three edges', 'তিনটি প্রান্ত অনুসরণ'),
      idea: L('f[f[f[i]]] == i.', 'f[f[f[i]]] == i।'),
      explain: [L('A cycle of length 2 cannot pass this test: after three steps from i you are at f(i), not i. A cycle of length 1 is impossible since fᵢ ≠ i.', '২ দৈর্ঘ্যের চক্র এই পরীক্ষায় পাস করতে পারে না: i থেকে তিন ধাপ পরে আপনি f(i)-তে, i-তে নয়। fᵢ ≠ i হওয়ায় ১ দৈর্ঘ্যের চক্র অসম্ভব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> f(n + 1);
    for (int i = 1; i <= n; i++) cin >> f[i];
    bool found = false;
    for (int i = 1; i <= n; i++) if (f[f[f[i]]] == i) found = true;
    cout << (found ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try all triples', 'সব ত্রয়ী চেষ্টা'),
      idea: L('For each a, b = f(a), check whether some c closes the triangle.', 'প্রতিটি a, b = f(a)-এর জন্য দেখুন কোনো c ত্রিভুজ বন্ধ করে কি না।'),
      explain: [L('Writing the definition literally: A likes B, B likes C, C likes A. Fixing A fixes B and C, so the “triple” search collapses back to the three-step test.', 'সংজ্ঞাটি আক্ষরিকভাবে লেখা: A পছন্দ করে B-কে, B পছন্দ করে C-কে, C পছন্দ করে A-কে। A স্থির করলে B আর C স্থির হয়, তাই “ত্রয়ী” খোঁজ আবার তিন-ধাপের পরীক্ষায় নামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> f(n + 1);
    for (int i = 1; i <= n; i++) cin >> f[i];
    bool found = false;
    for (int a = 1; a <= n; a++)
        for (int c = 1; c <= n; c++)
            if (f[f[a]] == c && f[c] == a && c != a) found = true;
    cout << (found ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '5\n2 4 5 1 3', output: 'YES', source: 'sample', note: sample(1) },
    { input: '5\n5 5 5 5 1', output: 'NO', source: 'sample', note: sample(2) },
    { input: '3\n2 3 1', output: 'YES', source: 'own', note: L('Exactly a triangle.', 'ঠিক একটি ত্রিভুজ।') },
    { input: '4\n2 3 4 1', output: 'NO', source: 'own', note: L('A 4-cycle is not a triangle.', '৪-চক্র ত্রিভুজ নয়।') },
  ],
  pitfalls: [L('Searching for any cycle instead of a cycle of length 3.', '৩ দৈর্ঘ্যের বদলে যেকোনো চক্র খোঁজা।')],
  related: [{ id: '1020B', name: 'Badge', why: L('Walking a functional graph.', 'ফাংশনাল গ্রাফে হাঁটা।') }],
  toolkit: ['vector'],
};

export const p500A: ProblemEntry = {
  id: '500A',
  contestId: 500,
  index: 'A',
  name: 'New Year Transportation',
  rating: 1000,
  tags: ['dfs', 'graphs', 'implementation'],
  why: L('Reachability when every vertex has one edge forward: just walk.', 'প্রতিটি শীর্ষের একটি সামনের প্রান্ত থাকলে পৌঁছানো: শুধু হাঁটুন।'),
  statement: L(
    'Cells are numbered 1..n. From cell i (i < n) a portal leads to cell i + aᵢ. Starting at cell 1, can you reach cell t?',
    'ঘরগুলো ১..n নম্বরের। ঘর i (i < n) থেকে একটি পোর্টাল যায় ঘর i + aᵢ-তে। ঘর ১ থেকে শুরু করে কি ঘর t-তে পৌঁছানো যায়?',
  ),
  input: L('n and t, then a₁ … aₙ₋₁.', 'n আর t, তারপর a₁ … aₙ₋₁।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 3·10⁴; 1 ≤ aᵢ ≤ n − i', '৩ ≤ n ≤ ৩·১০⁴; ১ ≤ aᵢ ≤ n − i')] },
  samples: [
    { input: '8 4\n1 2 1 2 1 2 1', output: 'YES', explain: L('1 → 2 → 4.', '১ → ২ → ৪।') },
    { input: '8 5\n1 2 1 2 1 1 1', output: 'NO', explain: L('1 → 2 → 4 → 6 → 7 → 8 skips 5.', '১ → ২ → ৪ → ৬ → ৭ → ৮, ৫ বাদ পড়ে।') },
  ],
  observation: L('From cell 1 the path is forced. Follow it while the position is below t; the answer is YES exactly when it lands on t.', 'ঘর ১ থেকে পথ বাধ্যতামূলক। অবস্থান t-এর নিচে থাকা পর্যন্ত অনুসরণ করুন; ঠিক t-তে পড়লেই YES।'),
  approach: [L('pos = 1; while pos < t: pos += a[pos].', 'pos = ১; pos < t যতক্ষণ: pos += a[pos]।')],
  walkthrough: { input: '8 5 …', steps: [{ state: '1, 2, 4, 6', text: L('Jumped past 5: NO.', '৫ পেরিয়ে গেছে: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('At most n jumps.', 'সর্বোচ্চ n লাফ।') },
  solutions: [
    {
      id: 'walk',
      kind: 'optimal',
      title: L('Follow the portals', 'পোর্টাল অনুসরণ'),
      idea: L('Stop once pos ≥ t.', 'pos ≥ t হলেই থামুন।'),
      explain: [L('Jumps only go forward, so once you pass t you can never come back to it.', 'লাফ শুধু সামনে যায়, তাই t পেরোলে আর কখনো ফেরা যায় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<int> a(n + 1);
    for (int i = 1; i < n; i++) cin >> a[i];
    int pos = 1;
    while (pos < t) pos += a[pos];
    cout << (pos == t ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('Graph reachability with DFS', 'DFS দিয়ে গ্রাফে পৌঁছানো'),
      idea: L('Build edges i → i + aᵢ and mark everything reachable from 1.', 'i → i + aᵢ প্রান্ত বানিয়ে ১ থেকে পৌঁছানো সব চিহ্নিত করুন।'),
      explain: [L('The general method for “can I get from s to t”, written with an explicit stack. Here each vertex has one edge, so it visits the same path as the walk.', '“s থেকে t-তে যাওয়া যায় কি” প্রশ্নের সাধারণ পদ্ধতি, স্পষ্ট স্ট্যাক দিয়ে লেখা। এখানে প্রতিটি শীর্ষের একটি প্রান্ত, তাই হাঁটার মতোই একই পথ দেখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    cin >> n >> t;
    vector<vector<int>> adj(n + 1);
    for (int i = 1; i < n; i++) {
        int a;
        cin >> a;
        adj[i].push_back(i + a);
    }
    vector<bool> seen(n + 1, false);
    vector<int> st = {1};
    seen[1] = true;
    while (!st.empty()) {
        int v = st.back();
        st.pop_back();
        for (int u : adj[v]) if (!seen[u]) { seen[u] = true; st.push_back(u); }
    }
    cout << (seen[t] ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'stack-queue'],
    },
  ],
  tests: [
    { input: '8 4\n1 2 1 2 1 2 1', output: 'YES', source: 'sample', note: sample(1) },
    { input: '8 5\n1 2 1 2 1 1 1', output: 'NO', source: 'sample', note: sample(2) },
    { input: '3 3\n2 1', output: 'YES', source: 'own', note: L('One jump to the end.', 'শেষে একটি লাফ।') },
  ],
  pitfalls: [L('Looping forever when pos passes t; stop at pos ≥ t.', 'pos, t পেরোলে অসীম লুপ; pos ≥ t-তে থামুন।')],
  related: [{ id: '939A', name: 'Love Triangle', why: L('One outgoing edge per vertex.', 'প্রতি শীর্ষে একটি বহির্গামী প্রান্ত।') }],
  toolkit: ['while-n'],
};

export const p1829E: ProblemEntry = {
  id: '1829E',
  contestId: 1829,
  index: 'E',
  name: 'The Lakes',
  rating: 1100,
  tags: ['dfs', 'dsu', 'graphs', 'implementation'],
  featuredFor: ['dfs'],
  why: L('Flood fill on a grid, summing values per component.', 'গ্রিডে ফ্লাড ফিল, প্রতি উপাদানে মান যোগ করা।'),
  statement: L(
    'An n × m grid has depths; a cell with depth > 0 is water. A lake is a maximal set of water cells connected through side-adjacent cells, and its volume is the sum of its depths. Print the largest lake volume (0 if there is no water). There are t test cases.',
    'একটি n × m গ্রিডে গভীরতা; গভীরতা > ০ এমন ঘর পানি। হ্রদ হলো পাশাপাশি ঘর দিয়ে যুক্ত পানির ঘরের সর্বোচ্চ সেট, আর এর আয়তন গভীরতার যোগফল। সবচেয়ে বড় হ্রদের আয়তন প্রিন্ট করুন (পানি না থাকলে ০)। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, m and the grid.', 't; প্রতিটি টেস্টে n, m আর গ্রিড।'),
  output: L('The maximum volume for each test.', 'প্রতিটি টেস্টের সর্বোচ্চ আয়তন।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n·m ≤ 10⁶', 'Σ n·m ≤ ১০⁶')] },
  samples: [
    {
      input: '5\n3 3\n1 2 0\n3 4 0\n0 0 5\n1 1\n0\n3 3\n0 1 1\n1 0 1\n1 1 1\n5 5\n1 1 1 1 1\n1 0 0 0 1\n1 0 5 0 1\n1 0 0 0 1\n1 1 1 1 1\n5 5\n1 1 1 1 1\n1 0 0 0 1\n1 1 4 0 1\n1 0 0 0 1\n1 1 1 1 1',
      output: '10\n0\n7\n16\n21',
      explain: L('First test: 1 + 2 + 3 + 4 = 10 beats the lone 5.', 'প্রথম টেস্ট: ১ + ২ + ৩ + ৪ = ১০, একা ৫-কে ছাড়ায়।'),
    },
  ],
  observation: L('Each lake is a connected component of the water cells. Explore each component once and add up its depths.', 'প্রতিটি হ্রদ পানির ঘরের একটি যুক্ত উপাদান। প্রতিটি উপাদান একবার ঘুরে গভীরতা যোগ করুন।'),
  approach: [L('For every unvisited water cell, run BFS/DFS with a stack and sum the component.', 'প্রতিটি না-দেখা পানির ঘর থেকে স্ট্যাকসহ BFS/DFS চালিয়ে উপাদানের যোগফল নিন।')],
  walkthrough: { input: '1 2 0 / 3 4 0 / 0 0 5', steps: [{ state: 'component {1,2,3,4} = 10, {5} = 5', text: L('Max 10.', 'সর্বোচ্চ ১০।') }] },
  complexity: { time: 'O(n · m)', space: 'O(n · m)', why: L('Each cell is visited once.', 'প্রতিটি ঘর একবার দেখা হয়।') },
  solutions: [
    {
      id: 'flood',
      kind: 'optimal',
      title: L('Iterative flood fill', 'পুনরাবৃত্ত ফ্লাড ফিল'),
      idea: L('Stack-based DFS from each new water cell.', 'প্রতিটি নতুন পানির ঘর থেকে স্ট্যাক-ভিত্তিক DFS।'),
      explain: [L('A grid of 10⁶ cells can make recursive DFS overflow the stack; an explicit stack avoids that. Mark a cell visited when you push it so it is never pushed twice.', '১০⁶ ঘরের গ্রিডে রিকার্সিভ DFS স্ট্যাক ওভারফ্লো করতে পারে; স্পষ্ট স্ট্যাক তা এড়ায়। পুশ করার সময়ই ঘর চিহ্নিত করুন যাতে কখনো দুবার পুশ না হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<vector<int>> g(n, vector<int>(m));
        for (auto& row : g) for (auto& x : row) scanf("%d", &x);
        vector<vector<bool>> seen(n, vector<bool>(m, false));
        int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1};
        long long best = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                if (g[i][j] == 0 || seen[i][j]) continue;
                long long vol = 0;
                vector<pair<int, int>> st = {{i, j}};
                seen[i][j] = true;
                while (!st.empty()) {
                    auto [r, c] = st.back();
                    st.pop_back();
                    vol += g[r][c];
                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d], nc = c + dc[d];
                        if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
                        if (g[nr][nc] > 0 && !seen[nr][nc]) { seen[nr][nc] = true; st.push_back({nr, nc}); }
                    }
                }
                best = max(best, vol);
            }
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['vector', 'stack-queue', 'structured-bindings'],
    },
    {
      id: 'dsu',
      kind: 'method',
      title: L('Union–find over cells', 'ঘরের ওপর ইউনিয়ন–ফাইন্ড'),
      idea: L('Union each water cell with its right and lower water neighbours, summing depths at the roots.', 'প্রতিটি পানির ঘরকে ডান আর নিচের পানির প্রতিবেশীর সঙ্গে যুক্ত করুন, মূলে গভীরতা যোগ করে।'),
      explain: [L('Each cell starts as its own set with sum = depth. Merging sets adds their sums. Afterwards the largest root sum is the answer. Checking only right and down neighbours covers every edge once.', 'প্রতিটি ঘর নিজের সেট হিসেবে শুরু হয়, যোগফল = গভীরতা। সেট মেলালে যোগফল যোগ হয়। শেষে সবচেয়ে বড় মূলের যোগফলই উত্তর। শুধু ডান আর নিচের প্রতিবেশী দেখলে প্রতিটি প্রান্ত একবার ঢাকা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
vector<long long> sum;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }
void unite(int a, int b) {
    a = find(a), b = find(b);
    if (a == b) return;
    p[b] = a;
    sum[a] += sum[b];
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<int> g(n * m);
        for (auto& x : g) scanf("%d", &x);
        p.resize(n * m);
        sum.assign(n * m, 0);
        for (int i = 0; i < n * m; i++) p[i] = i, sum[i] = g[i];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < m; c++) {
                int id = r * m + c;
                if (!g[id]) continue;
                if (c + 1 < m && g[id + 1]) unite(id, id + 1);
                if (r + 1 < n && g[id + m]) unite(id, id + m);
            }
        long long best = 0;
        for (int i = 0; i < n * m; i++) if (g[i] && find(i) == i) best = max(best, sum[i]);
        printf("%lld\n", best);
    }
    return 0;
}
`,
      time: 'O(n · m · α)',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['vector', 'functions'],
    },
  ],
  tests: [
    {
      input: '5\n3 3\n1 2 0\n3 4 0\n0 0 5\n1 1\n0\n3 3\n0 1 1\n1 0 1\n1 1 1\n5 5\n1 1 1 1 1\n1 0 0 0 1\n1 0 5 0 1\n1 0 0 0 1\n1 1 1 1 1\n5 5\n1 1 1 1 1\n1 0 0 0 1\n1 1 4 0 1\n1 0 0 0 1\n1 1 1 1 1',
      output: '10\n0\n7\n16\n21',
      source: 'sample',
      note: sample(1),
    },
  ],
  pitfalls: [L('Counting diagonal neighbours.', 'কোনাকুনি প্রতিবেশী গোনা।'), L('Recursive DFS on a 1000 × 1000 grid.', '১০০০ × ১০০০ গ্রিডে রিকার্সিভ DFS।')],
  related: [{ id: '977E', name: 'Cyclic Components', why: L('Components with a property.', 'একটি গুণসহ উপাদান।') }],
  toolkit: ['stack-queue', 'vector'],
};

export const p217A: ProblemEntry = {
  id: '217A',
  contestId: 217,
  index: 'A',
  name: 'Ice Skating',
  rating: 1200,
  tags: ['brute-force', 'dfs', 'dsu', 'graphs'],
  featuredFor: ['dsu'],
  why: L('Hidden graph: connect points that share a row or column, then count components.', 'লুকানো গ্রাফ: একই সারি বা কলামের বিন্দু যুক্ত করে উপাদান গোনা।'),
  statement: L(
    'Snow drifts stand at n points. From a drift you can slide north, south, east or west until you hit another drift. What is the minimum number of new drifts needed so that every drift can be reached from every other?',
    'n-টি বিন্দুতে বরফের স্তূপ। একটি স্তূপ থেকে উত্তর, দক্ষিণ, পূর্ব বা পশ্চিমে পিছলে অন্য স্তূপে না লাগা পর্যন্ত যাওয়া যায়। প্রতিটি স্তূপ থেকে প্রতিটিতে পৌঁছানোর জন্য সর্বনিম্ন কয়টি নতুন স্তূপ লাগবে?',
  ),
  input: L('n, then n points xᵢ yᵢ.', 'n, তারপর n-টি বিন্দু xᵢ yᵢ।'),
  output: L('The minimum number of new drifts.', 'সর্বনিম্ন নতুন স্তূপ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 100, coordinates ≤ 1000', '১ ≤ n ≤ ১০০, স্থানাঙ্ক ≤ ১০০০')] },
  samples: [
    { input: '2\n2 1\n1 2', output: '1', explain: L('Add a drift at (1, 1) or (2, 2).', '(১, ১) বা (২, ২)-এ একটি স্তূপ যোগ করুন।') },
    { input: '2\n2 1\n4 1', output: '0', explain: L('Same row already.', 'আগেই একই সারিতে।') },
  ],
  observation: L('Two drifts in the same row or column are directly connected. With k components, one new drift can join two components, so k − 1 drifts are needed and enough.', 'একই সারি বা কলামের দুটি স্তূপ সরাসরি যুক্ত। k-টি উপাদান থাকলে একটি নতুন স্তূপ দুটি উপাদান জুড়তে পারে, তাই k − ১টি স্তূপ লাগে আর যথেষ্ট।'),
  approach: [L('Union every pair sharing x or y; answer = components − 1.', 'x বা y ভাগ করে এমন প্রতিটি জোড়া যুক্ত করুন; উত্তর = উপাদান − ১।')],
  walkthrough: { input: '(2,1), (1,2)', steps: [{ state: 'no shared row/column', text: L('2 components: 1 new drift.', '২টি উপাদান: ১টি নতুন স্তূপ।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('All pairs.', 'সব জোড়া।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Union–find', 'ইউনিয়ন–ফাইন্ড'),
      idea: L('unite(i, j) when xᵢ = xⱼ or yᵢ = yⱼ.', 'xᵢ = xⱼ বা yᵢ = yⱼ হলে unite(i, j)।'),
      explain: [L('Every successful union reduces the number of components by one, so counting successful unions gives the components directly: n − unions.', 'প্রতিটি সফল ইউনিয়ন উপাদানের সংখ্যা এক কমায়, তাই সফল ইউনিয়ন গুনলেই সরাসরি উপাদান পাওয়া যায়: n − ইউনিয়ন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }

int main() {
    int n;
    cin >> n;
    vector<int> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    p.resize(n);
    iota(p.begin(), p.end(), 0);
    int comps = n;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if ((x[i] == x[j] || y[i] == y[j]) && find(i) != find(j)) {
                p[find(i)] = find(j);
                comps--;
            }
    cout << comps - 1 << "\n";
    return 0;
}
`,
      time: 'O(n² α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'vector'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('DFS over the implicit graph', 'অন্তর্নিহিত গ্রাফে DFS'),
      idea: L('Start a DFS from each unvisited drift; count the starts.', 'প্রতিটি না-দেখা স্তূপ থেকে DFS শুরু করুন; শুরুগুলো গুনুন।'),
      explain: [L('The edges are never stored: during DFS, the neighbours of i are simply all j sharing a row or column. With n ≤ 100 that is cheap.', 'প্রান্তগুলো কখনো রাখা হয় না: DFS-এর সময় i-এর প্রতিবেশী হলো একই সারি বা কলামের সব j। n ≤ ১০০-এ এটি সস্তা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> x, y;
vector<bool> seen;

void dfs(int i) {
    seen[i] = true;
    for (int j = 0; j < n; j++)
        if (!seen[j] && (x[i] == x[j] || y[i] == y[j])) dfs(j);
}

int main() {
    cin >> n;
    x.resize(n), y.resize(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    seen.assign(n, false);
    int comps = 0;
    for (int i = 0; i < n; i++) if (!seen[i]) { comps++; dfs(i); }
    cout << comps - 1 << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2\n2 1\n1 2', output: '1', source: 'sample', note: sample(1) },
    { input: '2\n2 1\n4 1', output: '0', source: 'sample', note: sample(2) },
    { input: '1\n5 5', output: '0', source: 'own', note: L('One drift.', 'একটি স্তূপ।') },
  ],
  pitfalls: [L('Connecting only neighbours that are adjacent in the input order.', 'শুধু ইনপুটের ক্রমে পাশাপাশিদের যুক্ত করা।')],
  related: [{ id: '1167C', name: 'News Distribution', why: L('Components with DSU.', 'DSU দিয়ে উপাদান।') }],
  toolkit: ['functions'],
};

export const p893C: ProblemEntry = {
  id: '893C',
  contestId: 893,
  index: 'C',
  name: 'Rumor',
  rating: 1300,
  tags: ['dfs', 'graphs', 'greedy'],
  why: L('Sum of the cheapest vertex in every connected component.', 'প্রতিটি যুক্ত উপাদানের সবচেয়ে সস্তা শীর্ষের যোগফল।'),
  statement: L(
    'n characters live in a city; character i agrees to start spreading a rumor for cᵢ gold. Once someone knows the rumor, all their friends learn it for free (and so on). What is the minimum gold to make everyone know the rumor?',
    'একটি শহরে n জন চরিত্র; চরিত্র i cᵢ স্বর্ণের বিনিময়ে গুজব ছড়ানো শুরু করতে রাজি। কেউ গুজব জানলে তার সব বন্ধু বিনামূল্যে জানে (এভাবে চলতে থাকে)। সবাইকে জানাতে সর্বনিম্ন কত স্বর্ণ লাগবে?',
  ),
  input: L('n and m, the costs, then m friendship pairs.', 'n আর m, খরচগুলো, তারপর m-টি বন্ধুত্বের জোড়া।'),
  output: L('The minimum total cost.', 'সর্বনিম্ন মোট খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 10⁵, cᵢ ≤ 10⁹', 'n, m ≤ ১০⁵, cᵢ ≤ ১০⁹')] },
  samples: [
    { input: '5 2\n2 5 3 4 8\n1 4\n4 5', output: '10', explain: L('Components {1,4,5}, {2}, {3}: 2 + 5 + 3.', 'উপাদান {১,৪,৫}, {২}, {৩}: ২ + ৫ + ৩।') },
    { input: '10 0\n1 2 3 4 5 6 7 8 9 10', output: '55', explain: L('Everyone alone.', 'সবাই একা।') },
    { input: '10 5\n1 6 2 7 3 8 4 9 5 10\n1 2\n3 4\n5 6\n7 8\n9 10', output: '15', explain: L('Pairs: 1 + 2 + 3 + 4 + 5.', 'জোড়া: ১ + ২ + ৩ + ৪ + ৫।') },
  ],
  observation: L('Within a component, paying one person is enough, and it should be the cheapest one. Components are independent.', 'একটি উপাদানে একজনকে টাকা দিলেই যথেষ্ট, আর সেটি সবচেয়ে সস্তাজন হওয়া উচিত। উপাদানগুলো স্বাধীন।'),
  approach: [L('For each component, find the minimum cost and add it.', 'প্রতিটি উপাদানের সর্বনিম্ন খরচ বের করে যোগ করুন।')],
  walkthrough: { input: '2 5 3 4 8, edges 1–4, 4–5', steps: [{ state: 'min{2,4,8} + 5 + 3', text: L('10.', '১০।') }] },
  complexity: { time: 'O(n + m)', space: 'O(n + m)', why: L('One traversal.', 'একবার ঘোরা।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('Minimum per component (BFS)', 'প্রতি উপাদানে সর্বনিম্ন (BFS)'),
      idea: L('BFS from each unvisited vertex, tracking the minimum cost.', 'প্রতিটি না-দেখা শীর্ষ থেকে BFS, সর্বনিম্ন খরচ রেখে।'),
      explain: [L('The total can reach 10⁵ · 10⁹ = 10¹⁴, so long long.', 'মোট ১০⁵ · ১০⁹ = ১০¹⁴ পর্যন্ত যেতে পারে, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<long long> c(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld", &c[i]);
    vector<vector<int>> adj(n + 1);
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<bool> seen(n + 1, false);
    long long total = 0;
    for (int s = 1; s <= n; s++) {
        if (seen[s]) continue;
        long long mn = c[s];
        queue<int> q;
        q.push(s);
        seen[s] = true;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            mn = min(mn, c[v]);
            for (int u : adj[v]) if (!seen[u]) { seen[u] = true; q.push(u); }
        }
        total += mn;
    }
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'c-io', 'long-long'],
    },
    {
      id: 'dsu',
      kind: 'method',
      title: L('DSU keeping the cheapest member', 'সবচেয়ে সস্তা সদস্যসহ DSU'),
      idea: L('When merging two sets, keep min(cost) at the root.', 'দুটি সেট মেলানোর সময় মূলে min(খরচ) রাখুন।'),
      explain: [L('Merging carries an aggregate (here the minimum) at the root: a common DSU pattern. At the end sum the value at every root.', 'মেলানোর সময় মূলে একটি সমষ্টি (এখানে সর্বনিম্ন) বহন করা: একটি প্রচলিত DSU প্যাটার্ন। শেষে প্রতিটি মূলের মান যোগ করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
vector<long long> best;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    p.resize(n + 1);
    best.resize(n + 1);
    for (int i = 1; i <= n; i++) { scanf("%lld", &best[i]); p[i] = i; }
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        a = find(a), b = find(b);
        if (a != b) { p[b] = a; best[a] = min(best[a], best[b]); }
    }
    long long total = 0;
    for (int i = 1; i <= n; i++) if (find(i) == i) total += best[i];
    printf("%lld\n", total);
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
    { input: '5 2\n2 5 3 4 8\n1 4\n4 5', output: '10', source: 'sample', note: sample(1) },
    { input: '10 0\n1 2 3 4 5 6 7 8 9 10', output: '55', source: 'sample', note: sample(2) },
    { input: '10 5\n1 6 2 7 3 8 4 9 5 10\n1 2\n3 4\n5 6\n7 8\n9 10', output: '15', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('int overflow in the total.', 'মোটে int ওভারফ্লো।'), L('Recursive DFS on a 10⁵-long chain.', '১০⁵ লম্বা শৃঙ্খলে রিকার্সিভ DFS।')],
  related: [{ id: '217A', name: 'Ice Skating', why: L('Counting components.', 'উপাদান গোনা।') }],
  toolkit: ['stack-queue', 'long-long'],
};

export const p862B: ProblemEntry = {
  id: '862B',
  contestId: 862,
  index: 'B',
  name: 'Mahmoud and Ehab and the bipartiteness',
  rating: 1300,
  tags: ['dfs', 'graphs', 'trees'],
  why: L('A tree is bipartite; the two colour classes decide how many edges can still be added.', 'একটি ট্রি বাইপার্টাইট; দুটি রঙের দল ঠিক করে আরও কতগুলো প্রান্ত যোগ করা যায়।'),
  statement: L(
    'A tree with n vertices is given. Add as many edges as possible so that the graph stays bipartite and simple (no loops or multiple edges). How many edges can be added?',
    'n শীর্ষের একটি ট্রি দেওয়া আছে। যত বেশি সম্ভব প্রান্ত যোগ করুন যাতে গ্রাফটি বাইপার্টাইট আর সরল থাকে (কোনো লুপ বা একাধিক প্রান্ত নয়)। কয়টি প্রান্ত যোগ করা যায়?',
  ),
  input: L('n, then n − 1 edges.', 'n, তারপর n − ১টি প্রান্ত।'),
  output: L('The maximum number of new edges.', 'সর্বোচ্চ নতুন প্রান্ত।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵')] },
  samples: [
    { input: '3\n1 2\n1 3', output: '0', explain: L('Sides {1} and {2, 3}: 2 edges possible, both exist.', 'দল {১} আর {২, ৩}: ২টি প্রান্ত সম্ভব, দুটোই আছে।') },
    { input: '5\n1 2\n2 3\n3 4\n4 5', output: '2', explain: L('Sides {1,3,5} and {2,4}: 6 − 4 = 2.', 'দল {১,৩,৫} আর {২,৪}: ৬ − ৪ = ২।') },
  ],
  observation: L('A tree has exactly one 2-colouring. A bipartite graph can only have edges between the colour classes of sizes a and b, so at most a · b edges; n − 1 already exist.', 'একটি ট্রির ঠিক একটি ২-রঙ আছে। বাইপার্টাইট গ্রাফে প্রান্ত শুধু a আর b আকারের রঙের দলের মধ্যে, তাই সর্বোচ্চ a · b প্রান্ত; n − ১টি আগেই আছে।'),
  approach: [L('2-colour with BFS, then print a · b − (n − 1).', 'BFS দিয়ে ২-রঙ করে a · b − (n − ১) প্রিন্ট করুন।')],
  walkthrough: { input: 'path 1-2-3-4-5', steps: [{ state: 'a = 3, b = 2', text: L('6 − 4 = 2.', '৬ − ৪ = ২।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('2-colour by BFS', 'BFS দিয়ে ২-রঙ'),
      idea: L('colour[child] = 1 − colour[parent].', 'colour[child] = ১ − colour[parent]।'),
      explain: [L('a · b can reach 2.5·10⁹, which overflows int: use long long.', 'a · b ২.৫·১০⁹ পর্যন্ত যেতে পারে, যা int ওভারফ্লো করে: long long ব্যবহার করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> colour(n + 1, -1);
    long long cnt[2] = {0, 0};
    queue<int> q;
    q.push(1);
    colour[1] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        cnt[colour[v]]++;
        for (int u : adj[v]) if (colour[u] == -1) { colour[u] = 1 - colour[v]; q.push(u); }
    }
    printf("%lld\n", cnt[0] * cnt[1] - (n - 1));
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'long-long'],
    },
    {
      id: 'depth',
      kind: 'method',
      title: L('Parity of depth with DFS', 'DFS দিয়ে গভীরতার জোড়-বিজোড়'),
      idea: L('A vertex’s colour is the parity of its depth.', 'একটি শীর্ষের রঙ হলো তার গভীরতার জোড়-বিজোড়।'),
      explain: [L('Depth parity is the same 2-colouring seen differently: edges always join depth d and d + 1. An iterative DFS with (vertex, parent, depth) on a stack avoids deep recursion.', 'গভীরতার জোড়-বিজোড় একই ২-রঙ ভিন্নভাবে দেখা: প্রান্ত সবসময় d আর d + ১ গভীরতা জোড়ে। স্ট্যাকে (শীর্ষ, parent, গভীরতা) সহ পুনরাবৃত্ত DFS গভীর রিকার্শন এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    long long even = 0, odd = 0;
    vector<array<int, 3>> st = {{1, 0, 0}};
    while (!st.empty()) {
        auto [v, par, d] = st.back();
        st.pop_back();
        (d % 2 ? odd : even)++;
        for (int u : adj[v]) if (u != par) st.push_back({u, v, d + 1});
    }
    printf("%lld\n", even * odd - (n - 1));
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['structured-bindings', 'long-long'],
    },
  ],
  tests: [
    { input: '3\n1 2\n1 3', output: '0', source: 'sample', note: sample(1) },
    { input: '5\n1 2\n2 3\n3 4\n4 5', output: '2', source: 'sample', note: sample(2) },
    { input: '1', output: '0', source: 'own', note: L('A single vertex.', 'একটি শীর্ষ।') },
  ],
  pitfalls: [L('Forgetting to subtract the existing n − 1 edges.', 'আগের n − ১টি প্রান্ত বাদ দিতে ভুলে যাওয়া।'), L('int overflow in a · b.', 'a · b-তে int ওভারফ্লো।')],
  related: [{ id: '580C', name: 'Kefa and Park', why: L('Another tree traversal.', 'আরেকটি ট্রি ঘোরা।') }],
  toolkit: ['stack-queue', 'long-long'],
};

export const p1167C: ProblemEntry = {
  id: '1167C',
  contestId: 1167,
  index: 'C',
  name: 'News Distribution',
  rating: 1400,
  tags: ['dfs', 'dsu', 'graphs'],
  featuredFor: ['dsu'],
  why: L('Join everyone in a group without adding all pairs: unite consecutive members.', 'সব জোড়া যোগ না করে দলের সবাইকে যুক্ত করা: পরপর সদস্যদের যুক্ত করুন।'),
  statement: L(
    'n users belong to m friend groups. News started by user x spreads to every friend of anyone who knows it (two users are friends if they share a group). For each x, print how many users eventually know the news.',
    'n জন ব্যবহারকারী m-টি বন্ধু দলে। ব্যবহারকারী x খবর শুরু করলে যে জানে তার প্রতিটি বন্ধুর কাছে ছড়ায় (একই দলে থাকলে দুজন বন্ধু)। প্রতিটি x-এর জন্য প্রিন্ট করুন শেষে কতজন খবরটি জানে।',
  ),
  input: L('n and m, then each group as k followed by k users.', 'n আর m, তারপর প্রতিটি দল k আর তারপর k জন ব্যবহারকারী।'),
  output: L('n numbers.', 'n-টি সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 5·10⁵, Σ k ≤ 5·10⁵', 'n, m ≤ ৫·১০⁵, Σ k ≤ ৫·১০⁵')] },
  samples: [{ input: '7 5\n3 2 5 4\n0\n2 1 2\n1 1\n2 6 7', output: '4 4 1 4 4 2 2', explain: L('Users 1, 2, 4, 5 are linked through groups.', 'ব্যবহারকারী ১, ২, ৪, ৫ দল দিয়ে যুক্ত।') }],
  observation: L('The answer for x is the size of x’s connected component. A group of k users is connected by uniting each member with the first one: k − 1 unions, not k² edges.', 'x-এর উত্তর হলো x-এর যুক্ত উপাদানের আকার। k জনের একটি দল প্রতিটি সদস্যকে প্রথমজনের সঙ্গে যুক্ত করলেই যুক্ত হয়: k − ১টি ইউনিয়ন, k² প্রান্ত নয়।'),
  approach: [L('DSU with sizes; answer size[find(x)].', 'আকারসহ DSU; উত্তর size[find(x)]।')],
  walkthrough: { input: 'groups {2,5,4}, {1,2}, {1}, {6,7}', steps: [{ state: 'sets {1,2,4,5}, {3}, {6,7}', text: L('Sizes 4, 1, 2.', 'আকার ৪, ১, ২।') }] },
  complexity: { time: 'O((n + Σk) α)', space: 'O(n)', why: L('One union per group member.', 'প্রতি দলের সদস্যে একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('DSU with component sizes', 'উপাদানের আকারসহ DSU'),
      idea: L('Unite each member with the group’s first member.', 'প্রতিটি সদস্যকে দলের প্রথম সদস্যের সঙ্গে যুক্ত করুন।'),
      explain: [L('Union by size plus path compression keeps every operation almost O(1). The large input needs fast IO.', 'আকার অনুযায়ী ইউনিয়ন আর পাথ কমপ্রেশন প্রতিটি অপারেশন প্রায় O(১) রাখে। বড় ইনপুটে দ্রুত IO লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p, sz;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }
void unite(int a, int b) {
    a = find(a), b = find(b);
    if (a == b) return;
    if (sz[a] < sz[b]) swap(a, b);
    p[b] = a;
    sz[a] += sz[b];
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    p.resize(n + 1);
    sz.assign(n + 1, 1);
    iota(p.begin(), p.end(), 0);
    while (m--) {
        int k, first = 0;
        scanf("%d", &k);
        for (int i = 0; i < k; i++) {
            int u;
            scanf("%d", &u);
            if (i == 0) first = u;
            else unite(first, u);
        }
    }
    for (int x = 1; x <= n; x++) printf("%d ", sz[find(x)]);
    printf("\n");
    return 0;
}
`,
      time: 'O((n + Σk) α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
    {
      id: 'bfs',
      kind: 'method',
      title: L('Bipartite users–groups graph + BFS', 'বাইপার্টাইট ব্যবহারকারী–দল গ্রাফ + BFS'),
      idea: L('Make a vertex for every group, connect it to its members, and BFS components counting only user vertices.', 'প্রতিটি দলের জন্য একটি শীর্ষ বানিয়ে সদস্যদের সঙ্গে যুক্ত করুন, তারপর শুধু ব্যবহারকারী শীর্ষ গুনে উপাদানে BFS করুন।'),
      explain: [L('Adding “group nodes” is a standard trick to avoid k² edges: a star through the group node connects all members with k edges.', '“দলের নোড” যোগ করা k² প্রান্ত এড়ানোর প্রচলিত কৌশল: দলের নোড দিয়ে একটি তারা k-টি প্রান্তে সব সদস্যকে যুক্ত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> adj(n + m + 1);
    for (int g = 1; g <= m; g++) {
        int k;
        scanf("%d", &k);
        while (k--) {
            int u;
            scanf("%d", &u);
            adj[u].push_back(n + g);
            adj[n + g].push_back(u);
        }
    }
    vector<int> comp(n + m + 1, -1), compSize;
    for (int s = 1; s <= n; s++) {
        if (comp[s] != -1) continue;
        int id = compSize.size(), users = 0;
        queue<int> q;
        q.push(s);
        comp[s] = id;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            if (v <= n) users++;
            for (int u : adj[v]) if (comp[u] == -1) { comp[u] = id; q.push(u); }
        }
        compSize.push_back(users);
    }
    for (int x = 1; x <= n; x++) printf("%d ", compSize[comp[x]]);
    printf("\n");
    return 0;
}
`,
      time: 'O(n + m + Σk)',
      space: 'O(n + m + Σk)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [
    { input: '7 5\n3 2 5 4\n0\n2 1 2\n1 1\n2 6 7', output: '4 4 1 4 4 2 2', source: 'sample', note: sample(1) },
    { input: '3 1\n0', output: '1 1 1', source: 'own', note: L('An empty group.', 'একটি খালি দল।') },
  ],
  pitfalls: [L('Adding an edge between every pair in a group: k² edges.', 'দলের প্রতিটি জোড়ার মধ্যে প্রান্ত যোগ: k²টি প্রান্ত।')],
  related: [{ id: '893C', name: 'Rumor', why: L('Component aggregates.', 'উপাদানের সমষ্টি।') }],
  toolkit: ['functions'],
};

export const p277A: ProblemEntry = {
  id: '277A',
  contestId: 277,
  index: 'A',
  name: 'Learning Languages',
  rating: 1400,
  tags: ['dfs', 'dsu'],
  why: L('Components, with a special case when nobody knows anything.', 'উপাদান, যখন কেউ কিছুই জানে না সেই বিশেষ কেসসহ।'),
  statement: L(
    'n employees know some of m languages (possibly none). Teaching one employee one language costs 1. Find the minimum cost so that any employee can talk to any other, possibly through translators.',
    'n জন কর্মী m-টি ভাষার কিছু জানে (হয়তো একটিও না)। একজন কর্মীকে একটি ভাষা শেখাতে খরচ ১। সর্বনিম্ন খরচ বের করুন যাতে যেকোনো কর্মী অন্য যেকোনোজনের সঙ্গে কথা বলতে পারে, হয়তো অনুবাদকের মাধ্যমে।',
  ),
  input: L('n and m, then for each employee k and k languages.', 'n আর m, তারপর প্রতিটি কর্মীর k আর k-টি ভাষা।'),
  output: L('The minimum cost.', 'সর্বনিম্ন খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n, m ≤ 100', '২ ≤ n, m ≤ ১০০')] },
  samples: [
    { input: '5 5\n1 2\n2 2 3\n2 3 4\n2 4 5\n1 5', output: '0', explain: L('A chain of shared languages.', 'যৌথ ভাষার একটি শৃঙ্খল।') },
    { input: '8 7\n0\n3 1 2 3\n1 1\n2 5 4\n2 6 7\n1 3\n2 7 4\n1 1', output: '2', explain: L('Two groups plus one silent employee.', 'দুটি দল আর একজন চুপ কর্মী।') },
    { input: '2 2\n1 2\n0', output: '1', explain: L('Teach the second employee language 2.', 'দ্বিতীয় কর্মীকে ভাষা ২ শেখান।') },
  ],
  observation: L('Employees sharing a language are connected. With c components the answer is c − 1, except when nobody knows any language: then every employee must learn one, costing n.', 'একই ভাষা জানা কর্মীরা যুক্ত। c-টি উপাদান থাকলে উত্তর c − ১, তবে কেউ কোনো ভাষা না জানলে প্রতিটি কর্মীকে একটি শিখতে হয়, খরচ n।'),
  approach: [L('DSU over employees, uniting those who share a language.', 'কর্মীদের ওপর DSU, একই ভাষা জানা কর্মীদের যুক্ত করে।')],
  walkthrough: { input: '2 2 / 1 2 / 0', steps: [{ state: '2 components, someone knows a language', text: L('Answer 1.', 'উত্তর ১।') }] },
  complexity: { time: 'O(n · m)', space: 'O(n + m)', why: L('Tiny limits.', 'ছোট সীমা।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('Unite employees through their first speaker', 'প্রথম বক্তার মাধ্যমে কর্মীদের যুক্ত করা'),
      idea: L('speaker[lang] = first employee who knows it; unite later ones with it.', 'speaker[lang] = যে প্রথম কর্মী ভাষাটি জানে; পরেরদের তার সঙ্গে যুক্ত করুন।'),
      explain: [L('The “nobody knows anything” case would give c − 1 = n − 1, but one more lesson is needed because the shared language has to be taught to everyone: n in total.', '“কেউ কিছু জানে না” কেসে c − ১ = n − ১ আসত, কিন্তু আরও একটি পাঠ লাগে কারণ যৌথ ভাষাটি সবাইকে শেখাতে হয়: মোট n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p;
int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }

int main() {
    int n, m;
    cin >> n >> m;
    p.resize(n);
    iota(p.begin(), p.end(), 0);
    vector<int> speaker(m + 1, -1);
    bool anyone = false;
    for (int i = 0; i < n; i++) {
        int k;
        cin >> k;
        if (k > 0) anyone = true;
        while (k--) {
            int l;
            cin >> l;
            if (speaker[l] == -1) speaker[l] = i;
            else p[find(i)] = find(speaker[l]);
        }
    }
    int comps = 0;
    for (int i = 0; i < n; i++) if (find(i) == i) comps++;
    cout << (anyone ? comps - 1 : n) << "\n";
    return 0;
}
`,
      time: 'O(n · m · α)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['functions'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('Employees + languages graph', 'কর্মী + ভাষার গ্রাফ'),
      idea: L('Connect employee i to each language they know; count components containing an employee.', 'কর্মী i-কে তার জানা প্রতিটি ভাষার সঙ্গে যুক্ত করুন; কর্মীসহ উপাদান গুনুন।'),
      explain: [L('Languages as extra vertices make “shares a language” a path of length 2. Unknown languages form isolated vertices and are ignored because the DFS starts only from employees.', 'ভাষাকে বাড়তি শীর্ষ বানালে “একই ভাষা জানা” হয় ২ দৈর্ঘ্যের পথ। অজানা ভাষা বিচ্ছিন্ন শীর্ষ আর উপেক্ষিত, কারণ DFS শুধু কর্মী থেকে শুরু হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + m);
    bool anyone = false;
    for (int i = 0; i < n; i++) {
        int k;
        cin >> k;
        if (k) anyone = true;
        while (k--) {
            int l;
            cin >> l;
            adj[i].push_back(n + l - 1);
            adj[n + l - 1].push_back(i);
        }
    }
    vector<bool> seen(n + m, false);
    int comps = 0;
    for (int s = 0; s < n; s++) {
        if (seen[s]) continue;
        comps++;
        vector<int> st = {s};
        seen[s] = true;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            for (int u : adj[v]) if (!seen[u]) { seen[u] = true; st.push_back(u); }
        }
    }
    cout << (anyone ? comps - 1 : n) << "\n";
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n · m)',
      accepted: true,
      toolkit: ['vector', 'stack-queue'],
    },
  ],
  tests: [
    { input: '5 5\n1 2\n2 2 3\n2 3 4\n2 4 5\n1 5', output: '0', source: 'sample', note: sample(1) },
    { input: '8 7\n0\n3 1 2 3\n1 1\n2 5 4\n2 6 7\n1 3\n2 7 4\n1 1', output: '2', source: 'sample', note: sample(2) },
    { input: '2 2\n1 2\n0', output: '1', source: 'sample', note: sample(3) },
    { input: '3 3\n0\n0\n0', output: '3', source: 'own', note: L('Nobody knows any language.', 'কেউ কোনো ভাষা জানে না।') },
  ],
  pitfalls: [L('Printing n − 1 when nobody knows any language.', 'কেউ কোনো ভাষা না জানলে n − ১ প্রিন্ট।')],
  related: [{ id: '1167C', name: 'News Distribution', why: L('Groups through shared membership.', 'যৌথ সদস্যপদের মাধ্যমে দল।') }],
  toolkit: ['functions'],
};

export const p1249B1: ProblemEntry = {
  id: '1249B1',
  contestId: 1249,
  index: 'B1',
  name: 'Books Exchange (easy version)',
  rating: 1000,
  tags: ['dsu', 'math'],
  why: L('A permutation splits into cycles; each element’s answer is its cycle length.', 'একটি পারমুটেশন চক্রে ভাগ হয়; প্রতিটি উপাদানের উত্তর তার চক্রের দৈর্ঘ্য।'),
  statement: L(
    'n kids each have a book. Every day kid i gives their current book to kid pᵢ (p is a permutation). For each kid, find the first day on which their own book returns to them. There are q queries.',
    'n শিশুর প্রত্যেকের একটি বই। প্রতিদিন শিশু i তার বর্তমান বইটি শিশু pᵢ-কে দেয় (p একটি পারমুটেশন)। প্রতিটি শিশুর জন্য প্রথম দিনটি বের করুন যেদিন তার নিজের বই তার কাছে ফেরে। q-টি কোয়েরি আছে।',
  ),
  input: L('q; each query has n and p.', 'q; প্রতিটি কোয়েরিতে n আর p।'),
  output: L('n numbers per query.', 'প্রতি কোয়েরিতে n-টি সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 200', 'n ≤ ২০০')] },
  samples: [
    {
      input: '6\n5\n1 2 3 4 5\n3\n2 3 1\n6\n4 6 2 1 5 3\n1\n1\n4\n3 4 1 2\n5\n5 1 2 4 3',
      output: '1 1 1 1 1\n3 3 3\n2 3 3 2 1 3\n1\n2 2 2 2\n4 4 4 1 4',
      explain: L('Third query: cycles (1 4), (2 6 3), (5).', 'তৃতীয় কোয়েরি: চক্র (১ ৪), (২ ৬ ৩), (৫)।'),
    },
  ],
  observation: L('The book of kid i travels i → pᵢ → p(pᵢ) → … and returns after the length of i’s cycle.', 'শিশু i-এর বই i → pᵢ → p(pᵢ) → … পথে ঘোরে আর i-এর চক্রের দৈর্ঘ্য পরে ফেরে।'),
  approach: [L('For each i, follow p until returning to i and count steps.', 'প্রতিটি i-এর জন্য i-এ না ফেরা পর্যন্ত p অনুসরণ করে ধাপ গুনুন।')],
  walkthrough: { input: 'p = 2 3 1', steps: [{ state: '1 → 2 → 3 → 1', text: L('Cycle length 3 for everyone.', 'সবার জন্য চক্রের দৈর্ঘ্য ৩।') }] },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('n ≤ 200.', 'n ≤ ২০০।') },
  solutions: [
    {
      id: 'simulate',
      kind: 'method',
      title: L('Follow each book', 'প্রতিটি বই অনুসরণ'),
      idea: L('Count steps until the book is back.', 'বই না ফেরা পর্যন্ত ধাপ গুনুন।'),
      explain: [L('With n ≤ 200 tracing every element is at most 40 000 steps per query.', 'n ≤ ২০০ হলে প্রতিটি উপাদান অনুসরণে প্রতি কোয়েরিতে সর্বোচ্চ ৪০,০০০ ধাপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    cin >> q;
    while (q--) {
        int n;
        cin >> n;
        vector<int> p(n + 1);
        for (int i = 1; i <= n; i++) cin >> p[i];
        for (int i = 1; i <= n; i++) {
            int days = 1, v = p[i];
            while (v != i) { v = p[v]; days++; }
            cout << days << (i == n ? '\n' : ' ');
        }
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'cycles',
      kind: 'optimal',
      title: L('Find each cycle once', 'প্রতিটি চক্র একবার খোঁজা'),
      idea: L('Walk a cycle once, then assign its length to all its members.', 'একটি চক্র একবার ঘুরে তার দৈর্ঘ্য সব সদস্যকে দিন।'),
      explain: [L('This O(n) version is what the hard version (n = 2·10⁵) needs: every element is visited exactly once.', 'এই O(n) সংস্করণই কঠিন সংস্করণে (n = ২·১০⁵) লাগে: প্রতিটি উপাদান ঠিক একবার দেখা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q;
    cin >> q;
    while (q--) {
        int n;
        cin >> n;
        vector<int> p(n + 1), ans(n + 1, 0);
        for (int i = 1; i <= n; i++) cin >> p[i];
        for (int i = 1; i <= n; i++) {
            if (ans[i]) continue;
            vector<int> cyc;
            for (int v = i; !ans[v] && (cyc.empty() || v != i); v = p[v]) cyc.push_back(v);
            for (int v : cyc) ans[v] = cyc.size();
        }
        for (int i = 1; i <= n; i++) cout << ans[i] << (i == n ? '\n' : ' ');
    }
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
    { input: '6\n5\n1 2 3 4 5\n3\n2 3 1\n6\n4 6 2 1 5 3\n1\n1\n4\n3 4 1 2\n5\n5 1 2 4 3', output: '1 1 1 1 1\n3 3 3\n2 3 3 2 1 3\n1\n2 2 2 2\n4 4 4 1 4', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Starting the day count at 0.', 'দিন গণনা ০ থেকে শুরু।')],
  related: [{ id: '1020B', name: 'Badge', why: L('Walking a functional graph.', 'ফাংশনাল গ্রাফে হাঁটা।') }],
  toolkit: ['vector'],
};
