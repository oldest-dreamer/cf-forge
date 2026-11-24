import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p1475F: ProblemEntry = {
  id: '1475F',
  contestId: 1475,
  index: 'F',
  name: 'Unusual Matrix',
  rating: 1900,
  tags: ['2-sat', 'brute-force', 'constructive'],
  why: L('Each cell gives an equation r_i ⊕ c_j = d_ij; fixing one variable determines all the others.', 'প্রতিটি ঘর একটি সমীকরণ দেয় r_i ⊕ c_j = d_ij; একটি চলক ঠিক করলে বাকি সব নির্ধারিত হয়।'),
  statement: L('Two n × n binary matrices a and b. An operation XORs a whole row or a whole column of a with 1. Can a be turned into b? There are t test cases.', 'দুটি n × n বাইনারি ম্যাট্রিক্স a আর b। একটি অপারেশন a-এর একটি পুরো সারি বা পুরো কলামকে ১ দিয়ে XOR করে। a-কে কি b বানানো যায়? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n, then a, then b.', 't; প্রতিটি টেস্টে n, তারপর a, তারপর b।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 1000', 'Σ n ≤ ১০০০')] },
  samples: [{ input: '3\n3\n110\n001\n110\n\n000\n000\n000\n3\n101\n010\n101\n\n010\n101\n010\n2\n01\n11\n\n10\n10', output: 'YES\nYES\nNO', explain: L('Third test: d has an odd number of ones in a 2 × 2 square, which no row/column flips can create.', 'তৃতীয় টেস্ট: d-এর একটি ২ × ২ বর্গে বিজোড় সংখ্যক ১, যা কোনো সারি/কলাম উল্টানো তৈরি করতে পারে না।') }],
  observation: L('Applying an operation twice cancels, so each row i is flipped r_i ∈ {0, 1} times and each column c_j times, with r_i ⊕ c_j = a_ij ⊕ b_ij. Flipping every row and every column changes nothing, so we may assume r₀ = 0. Then c_j = d₀ⱼ, r_i = d_i0 ⊕ c₀, and all other cells must agree.', 'একটি অপারেশন দুবার করলে বাতিল হয়, তাই প্রতিটি সারি i r_i ∈ {০, ১} বার আর প্রতিটি কলাম c_j বার উল্টানো হয়, যেখানে r_i ⊕ c_j = a_ij ⊕ b_ij। সব সারি আর সব কলাম উল্টালে কিছু বদলায় না, তাই r₀ = ০ ধরা যায়। তখন c_j = d₀ⱼ, r_i = d_i0 ⊕ c₀, আর বাকি সব ঘর মিলতে হবে।'),
  approach: [L('Compute d = a ⊕ b, derive r and c from row 0 and column 0, check every cell.', 'd = a ⊕ b হিসাব করে সারি ০ আর কলাম ০ থেকে r আর c বের করে প্রতিটি ঘর যাচাই।')],
  walkthrough: { input: 'test 1', steps: [{ state: 'd = 110 / 001 / 110', text: L('c = 1 1 0, r = 0 1 0: every cell matches. YES.', 'c = ১ ১ ০, r = ০ ১ ০: প্রতিটি ঘর মেলে। YES।') }] },
  complexity: { time: 'O(n²)', space: 'O(n²)', why: L('Read and check every cell once.', 'প্রতিটি ঘর একবার পড়া আর যাচাই।') },
  solutions: [
    {
      id: 'fix-row0',
      kind: 'optimal',
      title: L('Fix row 0, derive everything', 'সারি ০ ঠিক করে সব বের করা'),
      idea: L('r₀ = 0 is free; the rest is forced.', 'r₀ = ০ বিনামূল্যে; বাকিটা বাধ্যতামূলক।'),
      explain: [L('This is a system of XOR equations on a bipartite graph of rows and columns. 2-SAT is the general tool for “each variable is 0/1 and constraints link pairs”; when every constraint is an equation, plain propagation is enough.', 'এটি সারি আর কলামের একটি বাইপার্টাইট গ্রাফে XOR সমীকরণের ব্যবস্থা। “প্রতিটি চলক ০/১ আর শর্ত জোড়া যুক্ত করে”-এর সাধারণ হাতিয়ার 2-SAT; প্রতিটি শর্ত সমীকরণ হলে সাধারণ প্রসারণই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<string> a(n), b(n);
        for (auto& s : a) cin >> s;
        for (auto& s : b) cin >> s;
        vector<vector<int>> d(n, vector<int>(n));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) d[i][j] = (a[i][j] != b[i][j]);
        vector<int> c(n), r(n);
        for (int j = 0; j < n; j++) c[j] = d[0][j];
        for (int i = 0; i < n; i++) r[i] = d[i][0] ^ c[0];
        bool ok = true;
        for (int i = 0; i < n && ok; i++)
            for (int j = 0; j < n && ok; j++)
                if ((r[i] ^ c[j]) != d[i][j]) ok = false;
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['bitwise-and', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of row flips', 'সারি উল্টানোর প্রতিটি সেট চেষ্টা'),
      idea: L('For each of 2ⁿ row masks, each column is forced by its first cell.', '২ⁿ-টি সারি মাস্কের প্রতিটিতে প্রতিটি কলাম তার প্রথম ঘর দিয়ে বাধ্য।'),
      explain: [L('Exponential in n, so tiny inputs only; it shows that no clever choice was missed by fixing r₀ = 0.', 'n-এ সূচকীয়, তাই শুধু ক্ষুদ্র ইনপুট; এটি দেখায় r₀ = ০ ঠিক করায় কোনো চতুর বাছাই বাদ পড়েনি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<string> a(n), b(n);
        for (auto& s : a) cin >> s;
        for (auto& s : b) cin >> s;
        if (n > 12) { cout << "\n"; continue; }
        bool any = false;
        for (int mask = 0; mask < (1 << n) && !any; mask++) {
            bool ok = true;
            for (int j = 0; j < n && ok; j++) {
                int col = ((a[0][j] - '0') ^ (mask & 1)) != (b[0][j] - '0');
                for (int i = 0; i < n && ok; i++)
                    if ((((a[i][j] - '0') ^ (mask >> i & 1) ^ col)) != b[i][j] - '0') ok = false;
            }
            any = ok;
        }
        cout << (any ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n²)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [{ input: '3\n3\n110\n001\n110\n\n000\n000\n000\n3\n101\n010\n101\n\n010\n101\n010\n2\n01\n11\n\n10\n10', output: 'YES\nYES\nNO', source: 'sample', note: sample(1) }],
  pitfalls: [L('Trying flips greedily cell by cell.', 'ঘর ধরে ধরে গ্রিডিভাবে উল্টানো চেষ্টা।')],
  related: [{ id: '776D', name: 'The Door Problem', why: L('XOR equations between pairs of switches.', 'সুইচের জোড়ার মাঝে XOR সমীকরণ।') }],
  toolkit: ['bitwise-and'],
};

export const p776D: ProblemEntry = {
  id: '776D',
  contestId: 776,
  index: 'D',
  name: 'The Door Problem',
  rating: 2000,
  tags: ['2-sat', 'dfs', 'dsu', 'graphs'],
  featuredFor: ['2-sat'],
  why: L('Every door links exactly two switches, giving pairwise constraints: the textbook input for 2-SAT.', 'প্রতিটি দরজা ঠিক দুটি সুইচ যুক্ত করে, জোড়ায় জোড়ায় শর্ত দেয়: 2-SAT-এর পাঠ্যবইয়ের ইনপুট।'),
  statement: L('n doors are locked (0) or unlocked (1). m switches each toggle a set of doors, and every door is controlled by exactly two switches. Can all doors be unlocked at once?', 'n-টি দরজা বন্ধ (০) বা খোলা (১)। m-টি সুইচ প্রতিটি কিছু দরজা উল্টায়, আর প্রতিটি দরজা ঠিক দুটি সুইচ নিয়ন্ত্রণ করে। সব দরজা কি একসঙ্গে খোলা যায়?'),
  input: L('n m, the door states, then for each switch its doors.', 'n m, দরজার অবস্থা, তারপর প্রতিটি সুইচের দরজা।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 10⁵', 'n, m ≤ ১০⁵')] },
  samples: [
    { input: '3 3\n1 0 1\n2 1 3\n2 1 2\n2 2 3', output: 'NO', explain: L('The three constraints form an odd cycle.', 'তিনটি শর্ত একটি বিজোড় চক্র গঠন করে।') },
    { input: '3 3\n1 0 1\n3 1 2 3\n1 2\n2 1 3', output: 'YES', explain: L('Use switches 2 and 3: door 2 is toggled once, doors 1 and 3 twice.', 'সুইচ ২ আর ৩ ব্যবহার: দরজা ২ একবার, দরজা ১ আর ৩ দুবার উল্টায়।') },
    { input: '3 3\n1 0 1\n3 1 2 3\n2 1 2\n1 3', output: 'NO', explain: L('Contradictory requirements.', 'পরস্পরবিরোধী প্রয়োজন।') },
  ],
  observation: L('Door i with switches x, y and state rᵢ needs s_x ⊕ s_y = 1 − rᵢ: “same” if already unlocked, “different” otherwise. In 2-SAT form this is two clauses each; since all constraints are equalities, a parity DSU (or 2-colouring) decides it directly.', 'সুইচ x, y আর অবস্থা rᵢ-এর দরজা i চায় s_x ⊕ s_y = ১ − rᵢ: আগেই খোলা হলে “একই”, নইলে “ভিন্ন”। 2-SAT রূপে এটি প্রতিটিতে দুটি ক্লজ; সব শর্ত সমতা বলে একটি জোড়-বিজোড় DSU (বা ২-রঙ) সরাসরি সিদ্ধান্ত নেয়।'),
  approach: [L('Collect the two switches of each door, then check the XOR constraints.', 'প্রতিটি দরজার দুটি সুইচ জড়ো করে XOR শর্ত যাচাই।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'door 1 (open): s1 = s2; door 2 (locked): s2 ≠ s3; door 3 (open): s1 = s3', text: L('s1 = s2 = s3 but s2 ≠ s3: NO.', 's১ = s২ = s৩ কিন্তু s২ ≠ s৩: NO।') }] },
  complexity: { time: 'O((n + m) α)', space: 'O(n + m)', why: L('One union per door.', 'প্রতি দরজায় একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'parity-dsu',
      kind: 'optimal',
      title: L('Parity DSU', 'জোড়-বিজোড় DSU'),
      idea: L('Union x and y with required difference 1 − rᵢ.', 'প্রয়োজনীয় পার্থক্য ১ − rᵢ দিয়ে x আর y ইউনিয়ন।'),
      explain: [L('A weighted DSU stores each switch’s parity relative to its root; a constraint inside one set is checked in O(α).', 'একটি ওজনযুক্ত DSU প্রতিটি সুইচের মূলের সাপেক্ষে জোড়-বিজোড় রাখে; এক সেটের ভেতরের শর্ত O(α)-এ যাচাই হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> par, d;
int find(int x) {
    if (par[x] == x) return x;
    int r = find(par[x]);
    d[x] ^= d[par[x]];
    return par[x] = r;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> r(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &r[i]);
    vector<vector<int>> by(n + 1);
    for (int s = 1; s <= m; s++) {
        int k;
        scanf("%d", &k);
        while (k--) { int door; scanf("%d", &door); by[door].push_back(s); }
    }
    par.resize(m + 1);
    iota(par.begin(), par.end(), 0);
    d.assign(m + 1, 0);
    bool ok = true;
    for (int i = 1; i <= n && ok; i++) {
        int x = by[i][0], y = by[i][1], w = 1 - r[i];
        int rx = find(x), ry = find(y);
        if (rx == ry) { if ((d[x] ^ d[y]) != w) ok = false; }
        else { par[ry] = rx; d[ry] = d[x] ^ d[y] ^ w; }
    }
    puts(ok ? "YES" : "NO");
    return 0;
}
`,
      time: 'O((n + m) α)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['functions', 'bitwise-and'],
    },
    {
      id: 'two-sat',
      kind: 'method',
      title: L('Real 2-SAT with SCCs', 'SCC দিয়ে আসল 2-SAT'),
      idea: L('Variable s_x; each equality becomes two clauses; unsatisfiable iff x and ¬x share an SCC.', 'চলক s_x; প্রতিটি সমতা দুটি ক্লজ হয়; x আর ¬x একই SCC-তে থাকলেই অসন্তোষযোগ্য।'),
      explain: [L('s_x = s_y is (¬x ∨ y) ∧ (x ∨ ¬y); s_x ≠ s_y is (x ∨ y) ∧ (¬x ∨ ¬y). A clause (a ∨ b) adds implications ¬a → b and ¬b → a. Kosaraju (or Tarjan) finds SCCs; the formula is satisfiable iff no variable shares a component with its negation.', 's_x = s_y হলো (¬x ∨ y) ∧ (x ∨ ¬y); s_x ≠ s_y হলো (x ∨ y) ∧ (¬x ∨ ¬y)। একটি ক্লজ (a ∨ b) অন্তর্নিহিত ¬a → b আর ¬b → a যোগ করে। কোসারাজু (বা টার্জান) SCC খুঁজে পায়; কোনো চলক তার নেতির সঙ্গে একই উপাদানে না থাকলেই সূত্রটি সন্তোষযোগ্য।'), L('This is the general 2-SAT template: it also handles constraints like “at least one of x, y” that a parity DSU cannot express.', 'এটি সাধারণ 2-SAT টেমপ্লেট: এটি “x, y-এর অন্তত একটি”-র মতো শর্তও সামলায় যা জোড়-বিজোড় DSU প্রকাশ করতে পারে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int N;
vector<vector<int>> g, rg;
// literal 2*v = "switch v is on", 2*v+1 = "switch v is off"
void clause(int a, int b) {  // a OR b
    g[a ^ 1].push_back(b); g[b ^ 1].push_back(a);
    rg[b].push_back(a ^ 1); rg[a].push_back(b ^ 1);
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<int> r(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &r[i]);
    vector<vector<int>> by(n + 1);
    for (int s = 0; s < m; s++) {
        int k;
        scanf("%d", &k);
        while (k--) { int door; scanf("%d", &door); by[door].push_back(s); }
    }
    N = 2 * m;
    g.assign(N, {});
    rg.assign(N, {});
    for (int i = 1; i <= n; i++) {
        int x = 2 * by[i][0], y = 2 * by[i][1];
        if (r[i]) { clause(x ^ 1, y); clause(x, y ^ 1); }  // equal
        else { clause(x, y); clause(x ^ 1, y ^ 1); }       // different
    }
    // Kosaraju: order by finish time, then components on the reversed graph
    vector<int> order, comp(N, -1), it(N, 0);
    vector<bool> seen(N, false);
    for (int s = 0; s < N; s++) {
        if (seen[s]) continue;
        vector<int> st = {s};
        seen[s] = true;
        while (!st.empty()) {
            int v = st.back();
            if (it[v] < (int)g[v].size()) {
                int u = g[v][it[v]++];
                if (!seen[u]) { seen[u] = true; st.push_back(u); }
            } else { order.push_back(v); st.pop_back(); }
        }
    }
    int c = 0;
    for (int i = N - 1; i >= 0; i--) {
        int s = order[i];
        if (comp[s] != -1) continue;
        vector<int> st = {s};
        comp[s] = c;
        while (!st.empty()) {
            int v = st.back();
            st.pop_back();
            for (int u : rg[v]) if (comp[u] == -1) { comp[u] = c; st.push_back(u); }
        }
        c++;
    }
    bool ok = true;
    for (int v = 0; v < m; v++) if (comp[2 * v] == comp[2 * v + 1]) ok = false;
    puts(ok ? "YES" : "NO");
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every set of switches', 'সুইচের প্রতিটি সেট চেষ্টা'),
      idea: L('2ᵐ choices; simulate the doors.', '২ᵐ বিকল্প; দরজা সিমুলেশন।'),
      explain: [L('Exponential, for checking both methods on small inputs.', 'সূচকীয়, ছোট ইনপুটে দুটি পদ্ধতি যাচাইয়ের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> r(n + 1);
    for (int i = 1; i <= n; i++) cin >> r[i];
    vector<vector<int>> sw(m);
    for (auto& v : sw) { int k; cin >> k; v.resize(k); for (auto& x : v) cin >> x; }
    if (m > 16) { cout << "\n"; return 0; }
    bool any = false;
    for (int mask = 0; mask < (1 << m) && !any; mask++) {
        vector<int> s = r;
        for (int j = 0; j < m; j++) if (mask >> j & 1) for (int x : sw[j]) s[x] ^= 1;
        bool ok = true;
        for (int i = 1; i <= n; i++) if (!s[i]) ok = false;
        any = ok;
    }
    cout << (any ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(2ᵐ · n)',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '3 3\n1 0 1\n2 1 3\n2 1 2\n2 2 3', output: 'NO', source: 'sample', note: sample(1) },
    { input: '3 3\n1 0 1\n3 1 2 3\n1 2\n2 1 3', output: 'YES', source: 'sample', note: sample(2) },
    { input: '3 3\n1 0 1\n3 1 2 3\n2 1 2\n1 3', output: 'NO', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Treating the switches independently.', 'সুইচগুলোকে স্বাধীন ধরা।')],
  related: [{ id: '1594D', name: 'The Number of Imposters', why: L('Parity DSU.', 'জোড়-বিজোড় DSU।') }],
  toolkit: ['functions'],
};

export const p228E: ProblemEntry = {
  id: '228E',
  contestId: 228,
  index: 'E',
  name: 'The Road to Berland is Paved With Good Intentions',
  rating: 1900,
  tags: ['2-sat', 'dfs', 'dsu', 'graphs'],
  why: L('Choosing a city flips its roads: a road ends up asphalted iff its endpoints were chosen an odd number of times in total.', 'একটি শহর বাছলে তার রাস্তা উল্টায়: একটি রাস্তা শেষে পিচ করা ঠিক তখনই যখন তার প্রান্তবিন্দু মোট বিজোড় বার বাছা হয়।'),
  statement: L('Each road is asphalted (1) or not (0). One day’s work picks a city and flips the state of every road at that city. Make every road asphalted in at most n days, or print Impossible.', 'প্রতিটি রাস্তা পিচ করা (১) বা নয় (০)। একদিনের কাজে একটি শহর বেছে সেখানকার প্রতিটি রাস্তার অবস্থা উল্টানো হয়। সর্বোচ্চ n দিনে প্রতিটি রাস্তা পিচ করুন, না হলে Impossible প্রিন্ট করুন।'),
  input: L('n m, then m roads a b c.', 'n m, তারপর m-টি রাস্তা a b c।'),
  output: L('The number of days and the chosen cities, or Impossible.', 'দিনের সংখ্যা আর বাছা শহর, অথবা Impossible।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 100', 'n ≤ ১০০'), anyAnswer] },
  samples: [
    { input: '4 4\n1 2 1\n2 4 0\n4 3 1\n3 2 0', output: '4\n3 2 1 3', explain: L('Choosing a city twice is allowed but useless; any valid set works.', 'একটি শহর দুবার বাছা অনুমোদিত কিন্তু অকেজো; যেকোনো বৈধ সেট চলে।') },
    { input: '3 3\n1 2 0\n2 3 0\n3 1 0', output: 'Impossible', explain: L('An odd cycle of “different” constraints.', '“ভিন্ন” শর্তের একটি বিজোড় চক্র।') },
  ],
  observation: L('Choose each city 0 or 1 times: road (a, b, c) needs x_a ⊕ x_b = 1 − c. Solve the XOR system component by component with BFS colouring, starting each component at 0.', 'প্রতিটি শহর ০ বা ১ বার বাছুন: রাস্তা (a, b, c) চায় x_a ⊕ x_b = ১ − c। প্রতিটি উপাদানে ০ থেকে শুরু করে BFS রঙ দিয়ে XOR ব্যবস্থা সমাধান করুন।'),
  approach: [L('BFS colouring; output the cities with x = 1.', 'BFS রঙ; x = ১ এমন শহর প্রিন্ট।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'x1 = 0 → x2 = 0 (road 1–2 already done), x4 = 1, x3 = 1', text: L('Choose cities 3 and 4: two days.', 'শহর ৩ আর ৪ বাছুন: দুই দিন।') }] },
  complexity: { time: 'O(n + m)', space: 'O(n + m)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('XOR equations by BFS', 'BFS দিয়ে XOR সমীকরণ'),
      idea: L('x_b = x_a ⊕ (1 − c).', 'x_b = x_a ⊕ (১ − c)।'),
      explain: [L('At most n chosen cities is automatic: each city is chosen at most once.', 'সর্বোচ্চ n বাছা শহর আপনাআপনি: প্রতিটি শহর সর্বোচ্চ একবার বাছা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        adj[a].push_back({b, 1 - c});
        adj[b].push_back({a, 1 - c});
    }
    vector<int> x(n + 1, -1);
    bool ok = true;
    for (int s = 1; s <= n && ok; s++) {
        if (x[s] != -1) continue;
        x[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty() && ok) {
            int v = q.front();
            q.pop();
            for (auto [u, w] : adj[v]) {
                if (x[u] == -1) { x[u] = x[v] ^ w; q.push(u); }
                else if (x[u] != (x[v] ^ w)) ok = false;
            }
        }
    }
    if (!ok) { cout << "Impossible\n"; return 0; }
    vector<int> pick;
    for (int v = 1; v <= n; v++) if (x[v]) pick.push_back(v);
    cout << pick.size() << "\n";
    for (int v : pick) cout << v << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['stack-queue', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every subset of cities', 'শহরের প্রতিটি সাবসেট চেষ্টা'),
      idea: L('2ⁿ subsets; check every road.', '২ⁿ সাবসেট; প্রতিটি রাস্তা যাচাই।'),
      explain: [L('Choosing a city twice equals not choosing it, so subsets cover everything.', 'একটি শহর দুবার বাছা মানে না বাছা, তাই সাবসেট সবকিছু ঢাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<array<int, 3>> e(m);
    for (auto& [a, b, c] : e) cin >> a >> b >> c;
    if (n > 16) { cout << "\n"; return 0; }
    for (int mask = 0; mask < (1 << n); mask++) {
        bool ok = true;
        for (auto [a, b, c] : e) if ((c ^ (mask >> (a - 1) & 1) ^ (mask >> (b - 1) & 1)) != 1) ok = false;
        if (ok) {
            cout << __builtin_popcount(mask) << "\n";
            for (int v = 1; v <= n; v++) if (mask >> (v - 1) & 1) cout << v << ' ';
            cout << "\n";
            return 0;
        }
    }
    cout << "Impossible\n";
    return 0;
}
`,
      time: 'O(2ⁿ · m)',
      space: 'O(m)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '4 4\n1 2 1\n2 4 0\n4 3 1\n3 2 0', output: '4\n3 2 1 3', source: 'sample', note: sample(1) },
    { input: '3 3\n1 2 0\n2 3 0\n3 1 0', output: 'Impossible', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Simulating days greedily.', 'গ্রিডিভাবে দিন সিমুলেশন।')],
  related: [{ id: '776D', name: 'The Door Problem', why: L('The same kind of XOR system.', 'একই ধরনের XOR ব্যবস্থা।') }],
  toolkit: ['stack-queue'],
};

export const p27D: ProblemEntry = {
  id: '27D',
  contestId: 27,
  index: 'D',
  name: 'Ring Road 2',
  rating: 2200,
  tags: ['2-sat', 'dfs', 'dsu', 'graphs'],
  why: L('Two crossing chords must go to different sides: 2-colour the “conflict graph” of chords.', 'দুটি ছেদকারী জ্যা ভিন্ন দিকে যেতে হবে: জ্যাগুলোর “সংঘাত গ্রাফ” ২-রঙ করা।'),
  statement: L('Cities 1 … n lie on a ring road. m new roads (chords) must each be built inside or outside the ring so that no two roads cross. Print i/o for each road, or Impossible.', 'শহর ১ … n একটি বৃত্তাকার রাস্তায়। m-টি নতুন রাস্তা (জ্যা) প্রতিটি বৃত্তের ভেতরে বা বাইরে বানাতে হবে যাতে কোনো দুটি রাস্তা ছেদ না করে। প্রতিটি রাস্তার জন্য i/o প্রিন্ট করুন, না হলে Impossible।'),
  input: L('n m, then m chords a b.', 'n m, তারপর m-টি জ্যা a b।'),
  output: L('A string of i and o, or Impossible.', 'i আর o-এর একটি স্ট্রিং, অথবা Impossible।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 100, m ≤ 100', 'n ≤ ১০০, m ≤ ১০০'), anyAnswer] },
  samples: [
    { input: '4 2\n1 3\n2 4', output: 'io', explain: L('The two diagonals cross, so they go to different sides.', 'দুটি কর্ণ ছেদ করে, তাই ভিন্ন দিকে যায়।') },
    { input: '6 3\n1 3\n3 5\n5 1', output: 'ooo', explain: L('No two chords cross.', 'কোনো দুটি জ্যা ছেদ করে না।') },
  ],
  observation: L('Chords (a, b) and (c, d) with a < b, c < d cross iff exactly one of c, d lies strictly between a and b, and they share no endpoint. Crossing chords need different sides, so the answer exists iff the conflict graph is bipartite.', 'a < b, c < d-এর জ্যা (a, b) আর (c, d) ছেদ করে ঠিক তখনই যখন c, d-এর ঠিক একটি a আর b-এর মাঝে কঠোরভাবে আছে, আর কোনো প্রান্ত ভাগ করে না। ছেদকারী জ্যার ভিন্ন দিক লাগে, তাই উত্তর আছে ঠিক তখনই যখন সংঘাত গ্রাফ বাইপার্টাইট।'),
  approach: [L('Build O(m²) conflict edges, BFS-colour.', 'O(m²)টি সংঘাত প্রান্ত বানিয়ে BFS রঙ।')],
  walkthrough: { input: 'sample 1', steps: [{ state: '2 lies in (1, 3), 4 does not', text: L('Cross: colours i, o.', 'ছেদ: রঙ i, o।') }] },
  complexity: { time: 'O(m²)', space: 'O(m²)', why: L('All pairs of chords.', 'জ্যার সব জোড়া।') },
  solutions: [
    {
      id: 'bipartite',
      kind: 'optimal',
      title: L('Bipartite colouring of crossings', 'ছেদের বাইপার্টাইট রঙ'),
      idea: L('Each conflict is an “x ≠ y” clause.', 'প্রতিটি সংঘাত একটি “x ≠ y” ক্লজ।'),
      explain: [L('When every 2-SAT clause says “these two differ”, the implication graph is just a bipartiteness test.', 'যখন প্রতিটি 2-SAT ক্লজ বলে “এই দুটি ভিন্ন”, অন্তর্নিহিত গ্রাফটি শুধু বাইপার্টাইট পরীক্ষা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(m), b(m);
    for (int i = 0; i < m; i++) { cin >> a[i] >> b[i]; if (a[i] > b[i]) swap(a[i], b[i]); }
    auto inside = [&](int i, int x) { return a[i] < x && x < b[i]; };
    vector<vector<int>> adj(m);
    for (int i = 0; i < m; i++)
        for (int j = i + 1; j < m; j++) {
            if (a[i] == a[j] || a[i] == b[j] || b[i] == a[j] || b[i] == b[j]) continue;
            if (inside(i, a[j]) != inside(i, b[j])) { adj[i].push_back(j); adj[j].push_back(i); }
        }
    vector<int> col(m, -1);
    for (int s = 0; s < m; s++) {
        if (col[s] != -1) continue;
        col[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (int u : adj[v]) {
                if (col[u] == -1) { col[u] = 1 - col[v]; q.push(u); }
                else if (col[u] == col[v]) { cout << "Impossible\n"; return 0; }
            }
        }
    }
    for (int i = 0; i < m; i++) cout << (col[i] ? 'o' : 'i');
    cout << "\n";
    return 0;
}
`,
      time: 'O(m²)',
      space: 'O(m²)',
      accepted: true,
      toolkit: ['lambda', 'stack-queue'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every side assignment', 'প্রতিটি দিক বণ্টন চেষ্টা'),
      idea: L('2ᵐ assignments; reject any with two crossing chords on one side.', '২ᵐ বণ্টন; এক দিকে দুটি ছেদকারী জ্যা থাকলে বাতিল।'),
      explain: [L('Exponential; it checks the crossing test and the colouring together.', 'সূচকীয়; এটি ছেদ পরীক্ষা আর রঙ একসঙ্গে যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(m), b(m);
    for (int i = 0; i < m; i++) { cin >> a[i] >> b[i]; if (a[i] > b[i]) swap(a[i], b[i]); }
    if (m > 14) { cout << "\n"; return 0; }
    auto cross = [&](int i, int j) {
        set<int> pts = {a[i], b[i], a[j], b[j]};
        if (pts.size() < 4) return false;
        bool x = a[i] < a[j] && a[j] < b[i], y = a[i] < b[j] && b[j] < b[i];
        return x != y;
    };
    for (int mask = 0; mask < (1 << m); mask++) {
        bool ok = true;
        for (int i = 0; i < m && ok; i++)
            for (int j = i + 1; j < m && ok; j++)
                if ((mask >> i & 1) == (mask >> j & 1) && cross(i, j)) ok = false;
        if (ok) {
            for (int i = 0; i < m; i++) cout << (mask >> i & 1 ? 'o' : 'i');
            cout << "\n";
            return 0;
        }
    }
    cout << "Impossible\n";
    return 0;
}
`,
      time: 'O(2ᵐ · m²)',
      space: 'O(m)',
      accepted: false,
      toolkit: ['bit-shift', 'lambda'],
    },
  ],
  tests: [
    { input: '4 2\n1 3\n2 4', output: 'io', source: 'sample', note: sample(1) },
    { input: '6 3\n1 3\n3 5\n5 1', output: 'ooo', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Counting chords that share an endpoint as crossing.', 'একটি প্রান্ত ভাগ করা জ্যাকে ছেদকারী গোনা।')],
  related: [{ id: '862B', name: 'Mahmoud and Ehab and the bipartiteness', why: L('Bipartite graphs.', 'বাইপার্টাইট গ্রাফ।') }],
  toolkit: ['stack-queue'],
};

export const p888E: ProblemEntry = {
  id: '888E',
  contestId: 888,
  index: 'E',
  name: 'Maximum Subsequence',
  rating: 1800,
  tags: ['bitmasks', 'divide-and-conquer', 'meet-in-the-middle'],
  featuredFor: ['meet-in-the-middle'],
  why: L('2³⁵ subsets is too many, but 2 · 2¹⁷ half-subsets joined with sorting is fast.', '২³⁵ সাবসেট অনেক বেশি, কিন্তু সর্টিং দিয়ে যুক্ত ২ · ২¹⁷টি অর্ধ-সাবসেট দ্রুত।'),
  statement: L('Choose a subset of n numbers to maximise (sum of the subset) mod m.', 'n-টি সংখ্যার একটি সাবসেট বেছে (সাবসেটের যোগফল) mod m সর্বোচ্চ করুন।'),
  input: L('n m, then the numbers.', 'n m, তারপর সংখ্যাগুলো।'),
  output: L('The maximum value.', 'সর্বোচ্চ মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 35, m ≤ 10⁹', 'n ≤ ৩৫, m ≤ ১০⁹')] },
  samples: [
    { input: '4 4\n5 2 4 1', output: '3', explain: L('5 + 2 = 7, 7 mod 4 = 3.', '৫ + ২ = ৭, ৭ mod ৪ = ৩।') },
    { input: '3 20\n199 41 299', output: '19', explain: L('Take 299 alone: 299 mod 20 = 19.', 'শুধু ২৯৯ নিন: ২৯৯ mod ২০ = ১৯।') },
  ],
  observation: L('Split the array in half and list all subset sums mod m of each half (≤ 2¹⁸ each). For a left value x, the best partner is the largest right value y < m − x (sum stays below m), or the largest y overall (sum wraps, giving x + y − m, which is smaller than x + y and only useful when no y < m − x exists; taking the max y covers it).', 'অ্যারেকে অর্ধেক ভাগ করে প্রতিটি অর্ধের সব সাবসেট যোগফল mod m তালিকা করুন (প্রতিটি ≤ ২¹⁸)। বামের মান x-এর জন্য সেরা সঙ্গী হলো m − x-এর ছোট সবচেয়ে বড় ডানের মান y (যোগফল m-এর নিচে থাকে), বা সামগ্রিক সবচেয়ে বড় y (যোগফল ঘুরে x + y − m দেয়)।'),
  approach: [L('Enumerate halves, sort the right list, binary search for each left value.', 'অর্ধ গণনা, ডানের তালিকা সর্ট, প্রতিটি বামের মানে বাইনারি সার্চ।')],
  walkthrough: { input: '5 2 | 4 1, m = 4', steps: [{ state: 'left {0, 1, 2, 3}, right {0, 0, 1, 1}', text: L('x = 3 with y = 0 → 3. Answer 3.', 'x = ৩ আর y = ০ → ৩। উত্তর ৩।') }] },
  complexity: { time: 'O(2^(n/2) · n)', space: 'O(2^(n/2))', why: L('Two half enumerations and a sort.', 'দুটি অর্ধ গণনা আর একটি সর্ট।') },
  solutions: [
    {
      id: 'mitm',
      kind: 'optimal',
      title: L('Meet in the middle + binary search', 'মিট ইন দ্য মিডল + বাইনারি সার্চ'),
      idea: L('Pair each left sum with the best right sum below m − x.', 'প্রতিটি বামের যোগফলকে m − x-এর নিচের সেরা ডানের যোগফলের সঙ্গে জোড়া।'),
      explain: [L('Meet in the middle trades 2ⁿ for 2 · 2^(n/2) plus a join step. The join here is a sorted list and upper_bound.', 'মিট ইন দ্য মিডল ২ⁿ-কে ২ · ২^(n/২) আর একটি যুক্ত করার ধাপে বদলায়। এখানে যুক্ত করার ধাপ হলো একটি সাজানো তালিকা আর upper_bound।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long m;

vector<long long> sums(const vector<long long>& v) {
    vector<long long> s = {0};
    for (long long x : v) {
        size_t k = s.size();
        for (size_t i = 0; i < k; i++) s.push_back((s[i] + x) % m);
    }
    return s;
}

int main() {
    int n;
    cin >> n >> m;
    vector<long long> a(n);
    for (auto& x : a) { cin >> x; x %= m; }
    vector<long long> L(a.begin(), a.begin() + n / 2), R(a.begin() + n / 2, a.end());
    vector<long long> ls = sums(L), rs = sums(R);
    sort(rs.begin(), rs.end());
    long long best = 0;
    for (long long x : ls) {
        auto it = lower_bound(rs.begin(), rs.end(), m - x);  // first y with x + y >= m
        if (it != rs.begin()) best = max(best, x + *prev(it));
        best = max(best, (x + rs.back()) % m);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2^(n/2) · n)',
      space: 'O(2^(n/2))',
      accepted: true,
      toolkit: ['lower-bound', 'sort', 'functions'],
    },
    {
      id: 'two-pointers',
      kind: 'method',
      title: L('Both lists sorted + two pointers', 'দুটি তালিকা সাজানো + টু পয়েন্টার'),
      idea: L('As x increases, the best partner below m − x moves left.', 'x বাড়লে m − x-এর নিচের সেরা সঙ্গী বামে সরে।'),
      explain: [L('Sorting both halves replaces the binary search with a pointer that only moves one way.', 'দুটি অর্ধ সাজালে বাইনারি সার্চের জায়গায় একমুখী পয়েন্টার আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long m;
    cin >> n >> m;
    vector<long long> a(n);
    for (auto& x : a) { cin >> x; x %= m; }
    auto gen = [&](int lo, int hi) {
        vector<long long> s = {0};
        for (int i = lo; i < hi; i++) {
            size_t k = s.size();
            for (size_t j = 0; j < k; j++) s.push_back((s[j] + a[i]) % m);
        }
        sort(s.begin(), s.end());
        return s;
    };
    vector<long long> ls = gen(0, n / 2), rs = gen(n / 2, n);
    long long best = (ls.back() + rs.back()) % m;
    int j = (int)rs.size() - 1;
    for (long long x : ls) {
        while (j >= 0 && x + rs[j] >= m) j--;
        if (j >= 0) best = max(best, x + rs[j]);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2^(n/2) · n)',
      space: 'O(2^(n/2))',
      accepted: true,
      toolkit: ['sort', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All subsets', 'সব সাবসেট'),
      idea: L('2ⁿ sums.', '২ⁿ যোগফল।'),
      explain: [L('3.4·10¹⁰ for n = 35: far too slow, but the definition.', 'n = ৩৫-এ ৩.৪·১০¹⁰: অনেক ধীর, কিন্তু সংজ্ঞা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long m;
    cin >> n >> m;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    if (n > 22) { cout << "\n"; return 0; }
    long long best = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        long long s = 0;
        for (int i = 0; i < n; i++) if (mask >> i & 1) s += a[i];
        best = max(best, s % m);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '4 4\n5 2 4 1', output: '3', source: 'sample', note: sample(1) },
    { input: '3 20\n199 41 299', output: '19', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Forgetting the empty subset (value 0).', 'খালি সাবসেট (মান ০) ভুলে যাওয়া।')],
  related: [{ id: '550B', name: 'Preparing Olympiad', why: L('Plain subset enumeration.', 'সাধারণ সাবসেট গণনা।') }],
  toolkit: ['lower-bound'],
};

export const p1006F: ProblemEntry = {
  id: '1006F',
  contestId: 1006,
  index: 'F',
  name: 'Xor-Paths',
  rating: 2100,
  tags: ['bitmasks', 'brute-force', 'dp', 'meet-in-the-middle'],
  why: L('Meet on the middle diagonal: count XORs of first halves in maps, then match second halves.', 'মাঝের কর্ণে মিলন: প্রথম অর্ধের XOR map-এ গুনে দ্বিতীয় অর্ধ মেলানো।'),
  statement: L('Count paths from (1, 1) to (n, m) moving only right or down whose XOR of all visited numbers equals k.', '(১, ১) থেকে (n, m) পর্যন্ত শুধু ডানে বা নিচে চলা পথ গুনুন যাদের সব দেখা সংখ্যার XOR k-এর সমান।'),
  input: L('n m k, then the grid.', 'n m k, তারপর গ্রিড।'),
  output: L('The number of paths.', 'পথের সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n, m ≤ 20, values and k ≤ 10¹⁸', 'n, m ≤ ২০, মান আর k ≤ ১০¹⁸')] },
  samples: [
    { input: '3 3 11\n2 1 5\n7 10 0\n12 6 4', output: '3', explain: L('Three of the six paths have XOR 11.', 'ছয়টি পথের তিনটির XOR ১১।') },
    { input: '3 4 2\n1 3 3 3\n0 3 3 2\n3 0 1 1', output: '5', explain: L('Five paths.', 'পাঁচটি পথ।') },
    { input: '3 4 1000000000000000000\n1 3 3 3\n0 3 3 2\n3 0 1 1', output: '0', explain: L('No path reaches that XOR.', 'কোনো পথ সেই XOR-এ পৌঁছায় না।') },
  ],
  observation: L('A path has n + m − 2 moves, so up to C(38, 19) ≈ 3.5·10¹⁰ paths. Every path crosses the diagonal i + j = (n + m − 2) / 2 exactly once. Enumerate the first half from (0, 0) to each diagonal cell and store XOR counts per cell; then enumerate the second half backwards from (n − 1, m − 1) and look up the needed value.', 'একটি পথে n + m − ২টি চাল, তাই C(৩৮, ১৯) ≈ ৩.৫·১০¹⁰ পর্যন্ত পথ। প্রতিটি পথ কর্ণ i + j = (n + m − ২) / ২ ঠিক একবার পেরোয়। (০, ০) থেকে প্রতিটি কর্ণ ঘর পর্যন্ত প্রথম অর্ধ গণনা করে প্রতি ঘরে XOR গণনা রাখুন; তারপর (n − ১, m − ১) থেকে পেছনে দ্বিতীয় অর্ধ গণনা করে প্রয়োজনীয় মান খুঁজুন।'),
  approach: [L('Forward DFS fills cnt[cell][xor]; backward DFS adds cnt[cell][k ^ xor ^ a[cell]] (the diagonal cell is counted once).', 'সামনের DFS cnt[ঘর][xor] ভরে; পেছনের DFS cnt[ঘর][k ^ xor ^ a[ঘর]] যোগ করে (কর্ণের ঘর একবার গোনা)।')],
  walkthrough: { input: '3 × 3', steps: [{ state: 'middle diagonal i + j = 2', text: L('Each half has at most C(2, 1) = 2 paths per cell.', 'প্রতিটি অর্ধে প্রতি ঘরে সর্বোচ্চ C(২, ১) = ২টি পথ।') }] },
  complexity: { time: 'O(2^((n+m)/2) · log)', space: 'O(2^((n+m)/2))', why: L('Two half-length enumerations.', 'দুটি অর্ধ-দৈর্ঘ্যের গণনা।') },
  solutions: [
    {
      id: 'mitm',
      kind: 'optimal',
      title: L('Meet on the middle diagonal', 'মাঝের কর্ণে মিলন'),
      idea: L('Forward half into maps, backward half looks up.', 'সামনের অর্ধ map-এ, পেছনের অর্ধ খোঁজে।'),
      explain: [L('The diagonal cell’s value is included in the forward XOR, so the backward search must exclude it: needed = k ⊕ (backward XOR without that cell).', 'কর্ণের ঘরের মান সামনের XOR-এ আছে, তাই পেছনের খোঁজে বাদ দিতে হবে: প্রয়োজন = k ⊕ (সেই ঘর ছাড়া পেছনের XOR)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m, half;
long long k, a[20][20], ans = 0;
map<long long, long long> cnt[20];

void forward(int i, int j, long long x) {
    x ^= a[i][j];
    if (i + j == half) { cnt[i][x]++; return; }
    if (i + 1 < n) forward(i + 1, j, x);
    if (j + 1 < m) forward(i, j + 1, x);
}

void backward(int i, int j, long long x) {
    if (i + j == half) {
        auto it = cnt[i].find(k ^ x);
        if (it != cnt[i].end()) ans += it->second;
        return;
    }
    x ^= a[i][j];
    if (i > 0) backward(i - 1, j, x);
    if (j > 0) backward(i, j - 1, x);
}

int main() {
    cin >> n >> m >> k;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) cin >> a[i][j];
    half = (n + m - 2) / 2;
    forward(0, 0, 0);
    backward(n - 1, m - 1, 0);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(2^((n+m)/2) · log)',
      space: 'O(2^((n+m)/2))',
      accepted: true,
      toolkit: ['map', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate every path', 'প্রতিটি পথ গণনা'),
      idea: L('DFS to the corner.', 'কোণ পর্যন্ত DFS।'),
      explain: [L('C(n + m − 2, n − 1) paths: fine for small grids only.', 'C(n + m − ২, n − ১)টি পথ: শুধু ছোট গ্রিডে ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m;
long long k, a[20][20], ans = 0;

void go(int i, int j, long long x) {
    x ^= a[i][j];
    if (i == n - 1 && j == m - 1) { if (x == k) ans++; return; }
    if (i + 1 < n) go(i + 1, j, x);
    if (j + 1 < m) go(i, j + 1, x);
}

int main() {
    cin >> n >> m >> k;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) cin >> a[i][j];
    if (n + m > 24) { cout << "\n"; return 0; }
    go(0, 0, 0);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(C(n + m, n))',
      space: 'O(n + m)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3 3 11\n2 1 5\n7 10 0\n12 6 4', output: '3', source: 'sample', note: sample(1) },
    { input: '3 4 2\n1 3 3 3\n0 3 3 2\n3 0 1 1', output: '5', source: 'sample', note: sample(2) },
    { input: '3 4 1000000000000000000\n1 3 3 3\n0 3 3 2\n3 0 1 1', output: '0', source: 'sample', note: sample(3) },
    { input: '1 1 5\n5', output: '1', source: 'own', note: L('One cell.', 'একটি ঘর।') },
  ],
  pitfalls: [L('Counting the middle cell’s value twice.', 'মাঝের ঘরের মান দুবার গোনা।')],
  related: [{ id: '888E', name: 'Maximum Subsequence', why: L('Meet in the middle.', 'মিট ইন দ্য মিডল।') }],
  toolkit: ['map'],
};

export const p525E: ProblemEntry = {
  id: '525E',
  contestId: 525,
  index: 'E',
  name: 'Anya and Cubes',
  rating: 2100,
  tags: ['binary-search', 'bitmasks', 'brute-force', 'dp', 'math', 'meet-in-the-middle'],
  why: L('Three choices per cube (skip, take, take with !) gives 3²⁵; split into halves of 3¹² and join on (sum, stickers).', 'প্রতি কিউবে তিনটি বিকল্প (বাদ, নাও, ! দিয়ে নাও) ৩²⁵ দেয়; ৩¹²-এর অর্ধে ভাগ করে (যোগফল, স্টিকার)-এ যুক্ত করুন।'),
  statement: L('n cubes carry numbers aᵢ. Choose some cubes and put at most k “!” stickers on chosen cubes (at most one each), which turns aᵢ into aᵢ!. Count the ways for the chosen values to sum to exactly S.', 'n-টি কিউবে সংখ্যা aᵢ। কিছু কিউব বেছে বাছা কিউবে সর্বোচ্চ k-টি “!” স্টিকার লাগান (প্রতিটিতে সর্বোচ্চ একটি), যা aᵢ-কে aᵢ! করে। বাছা মানের যোগফল ঠিক S হওয়ার উপায় গুনুন।'),
  input: L('n k S, then the numbers.', 'n k S, তারপর সংখ্যাগুলো।'),
  output: L('The number of ways.', 'উপায়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 25, S ≤ 10¹⁶', 'n ≤ ২৫, S ≤ ১০¹⁶')] },
  samples: [
    { input: '2 2 30\n4 3', output: '1', explain: L('4! + 3! = 30.', '৪! + ৩! = ৩০।') },
    { input: '2 2 7\n4 3', output: '1', explain: L('4 + 3 = 7.', '৪ + ৩ = ৭।') },
    { input: '3 1 1\n1 1 1', output: '6', explain: L('Any single cube, with or without a sticker (1! = 1).', 'যেকোনো একটি কিউব, স্টিকারসহ বা ছাড়া (১! = ১)।') },
  ],
  observation: L('19! > 10¹⁶, so a sticker only matters for aᵢ ≤ 18. Enumerate 3^(n/2) options for each half, recording (sum, stickers used). For each left state (s, c), add the number of right states with sum S − s and stickers ≤ k − c: store, per sum, counts by sticker number and take prefix sums.', '১৯! > ১০¹⁶, তাই স্টিকার শুধু aᵢ ≤ ১৮-এ গুরুত্বপূর্ণ। প্রতিটি অর্ধে ৩^(n/২)টি বিকল্প গণনা করে (যোগফল, ব্যবহৃত স্টিকার) লিখুন। প্রতিটি বামের অবস্থা (s, c)-এর জন্য যোগফল S − s আর স্টিকার ≤ k − c এমন ডানের অবস্থার সংখ্যা যোগ করুন।'),
  approach: [L('Right half into map<sum, cnt[0..k]>, prefix over stickers, then scan the left half.', 'ডানের অর্ধ map<যোগফল, cnt[০..k]>-এ, স্টিকারে প্রিফিক্স, তারপর বামের অর্ধ স্ক্যান।')],
  walkthrough: { input: '4 3, S = 30', steps: [{ state: 'left {0, 4, 24}, right {0, 3, 6}', text: L('24 + 6 = 30 with 2 stickers ≤ 2: 1 way.', '২৪ + ৬ = ৩০, ২টি স্টিকার ≤ ২: ১টি উপায়।') }] },
  complexity: { time: 'O(3^(n/2) log)', space: 'O(3^(n/2) · k)', why: L('Two half enumerations.', 'দুটি অর্ধ গণনা।') },
  solutions: [
    {
      id: 'mitm',
      kind: 'optimal',
      title: L('Meet in the middle on (sum, stickers)', '(যোগফল, স্টিকার)-এ মিট ইন দ্য মিডল'),
      idea: L('3¹³ ≈ 1.6·10⁶ states per half.', 'প্রতি অর্ধে ৩¹³ ≈ ১.৬·১০⁶ অবস্থা।'),
      explain: [L('When the join needs a second condition (here “stickers ≤ budget”), bucket by the exact key and keep prefix counts over the extra dimension.', 'যুক্ত করার জন্য দ্বিতীয় শর্ত লাগলে (এখানে “স্টিকার ≤ বাজেট”), সঠিক কী দিয়ে ভাগ করে বাড়তি মাত্রায় প্রিফিক্স গণনা রাখুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, k;
long long S, a[25], fact[19];
unordered_map<long long, vector<long long>> right_;
long long ans = 0;

void genRight(int i, int end, long long s, int c) {
    if (s > S || c > k) return;
    if (i == end) {
        auto& v = right_[s];
        if (v.empty()) v.assign(k + 1, 0);
        v[c]++;
        return;
    }
    genRight(i + 1, end, s, c);
    genRight(i + 1, end, s + a[i], c);
    if (a[i] <= 18) genRight(i + 1, end, s + fact[a[i]], c + 1);
}

void genLeft(int i, int end, long long s, int c) {
    if (s > S || c > k) return;
    if (i == end) {
        auto it = right_.find(S - s);
        if (it != right_.end()) ans += it->second[k - c];
        return;
    }
    genLeft(i + 1, end, s, c);
    genLeft(i + 1, end, s + a[i], c);
    if (a[i] <= 18) genLeft(i + 1, end, s + fact[a[i]], c + 1);
}

int main() {
    cin >> n >> k >> S;
    for (int i = 0; i < n; i++) cin >> a[i];
    fact[0] = 1;
    for (int i = 1; i <= 18; i++) fact[i] = fact[i - 1] * i;
    int mid = n / 2;
    genRight(mid, n, 0, 0);
    for (auto& [s, v] : right_)
        for (int c = 1; c <= k; c++) v[c] += v[c - 1];  // prefix: stickers <= c
    genLeft(0, mid, 0, 0);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(3^(n/2))',
      space: 'O(3^(n/2) · k)',
      accepted: true,
      toolkit: ['map', 'functions', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All 3ⁿ choices', 'সব ৩ⁿ বিকল্প'),
      idea: L('Recursion over skip / take / take with sticker.', 'বাদ / নাও / স্টিকারসহ নাও-এর ওপর রিকার্শন।'),
      explain: [L('8·10¹¹ for n = 25, so small n only.', 'n = ২৫-এ ৮·১০¹¹, তাই শুধু ছোট n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, k;
long long S, a[25], fact[19], ans = 0;

void go(int i, long long s, int c) {
    if (s > S || c > k) return;
    if (i == n) { if (s == S) ans++; return; }
    go(i + 1, s, c);
    go(i + 1, s + a[i], c);
    if (a[i] <= 18) go(i + 1, s + fact[a[i]], c + 1);
}

int main() {
    cin >> n >> k >> S;
    for (int i = 0; i < n; i++) cin >> a[i];
    if (n > 13) { cout << "\n"; return 0; }
    fact[0] = 1;
    for (int i = 1; i <= 18; i++) fact[i] = fact[i - 1] * i;
    go(0, 0, 0);
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(3ⁿ)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2 2 30\n4 3', output: '1', source: 'sample', note: sample(1) },
    { input: '2 2 7\n4 3', output: '1', source: 'sample', note: sample(2) },
    { input: '3 1 1\n1 1 1', output: '6', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Computing factorials beyond 18 and overflowing.', '১৮-এর বেশি ফ্যাক্টরিয়াল হিসাব করে ওভারফ্লো।'), L('Counting sticker budget exactly k instead of at most k.', 'স্টিকার বাজেট সর্বোচ্চ k-এর বদলে ঠিক k গোনা।')],
  related: [{ id: '888E', name: 'Maximum Subsequence', why: L('Meet in the middle.', 'মিট ইন দ্য মিডল।') }],
  toolkit: ['map'],
};

export const p552E: ProblemEntry = {
  id: '552E',
  contestId: 552,
  index: 'E',
  name: 'Vanya and Brackets',
  rating: 2100,
  tags: ['brute-force', 'dp', 'parsing', 'greedy', 'implementation', 'strings'],
  featuredFor: ['parsing'],
  why: L('A small expression evaluator with a stack, run once for every useful bracket position.', 'একটি স্ট্যাকসহ ছোট এক্সপ্রেশন মূল্যায়নকারী, প্রতিটি কাজের বন্ধনী অবস্থানে একবার চালানো।'),
  statement: L('An expression of digits 1–9 alternating with + and * (at most 15 *). Insert one pair of brackets to maximise its value.', '১–৯ অঙ্ক আর + ও *-এর পালাক্রমের একটি এক্সপ্রেশন (সর্বোচ্চ ১৫টি *)। এর মান সর্বোচ্চ করতে একজোড়া বন্ধনী বসান।'),
  input: L('The expression.', 'এক্সপ্রেশনটি।'),
  output: L('The maximum value.', 'সর্বোচ্চ মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 5001, at most 15 multiplications', '|s| ≤ ৫০০১, সর্বোচ্চ ১৫টি গুণ')] },
  samples: [
    { input: '3+5*7+8*4', output: '303', explain: L('3 + 5 · (7 + 8) · 4 = 303.', '৩ + ৫ · (৭ + ৮) · ৪ = ৩০৩।') },
    { input: '2+3*5', output: '25', explain: L('(2 + 3) · 5.', '(২ + ৩) · ৫।') },
    { input: '3*4*5', output: '60', explain: L('Brackets cannot help.', 'বন্ধনী সাহায্য করতে পারে না।') },
  ],
  observation: L('A useful bracket opens right after a * (or at the start) and closes right before a * (or at the end): moving it into a + region never increases the value. With ≤ 15 multiplications there are ≤ 17² candidate pairs, each evaluated in O(|s|).', 'একটি কাজের বন্ধনী একটি *-এর ঠিক পরে (বা শুরুতে) খোলে আর একটি *-এর ঠিক আগে (বা শেষে) বন্ধ হয়: + অঞ্চলে সরালে মান কখনো বাড়ে না। ≤ ১৫টি গুণে ≤ ১৭²টি প্রার্থী জোড়া, প্রতিটি O(|s|)-এ মূল্যায়ন।'),
  approach: [L('Evaluate with two stacks (numbers and operators) honouring precedence and brackets.', 'অগ্রাধিকার আর বন্ধনী মেনে দুটি স্ট্যাক (সংখ্যা আর অপারেটর) দিয়ে মূল্যায়ন।')],
  walkthrough: { input: '2+3*5', steps: [{ state: 'candidates: open at 0 or after *, close before * or at end', text: L('(2+3)*5 = 25 is the best.', '(২+৩)*৫ = ২৫ সেরা।') }] },
  complexity: { time: 'O(17² · |s|)', space: 'O(|s|)', why: L('Few candidates, linear evaluation.', 'কম প্রার্থী, রৈখিক মূল্যায়ন।') },
  solutions: [
    {
      id: 'stack-eval',
      kind: 'optimal',
      title: L('Candidate brackets + stack evaluator', 'প্রার্থী বন্ধনী + স্ট্যাক মূল্যায়নকারী'),
      idea: L('Shunting-yard style: apply * immediately, + when lower precedence arrives.', 'শান্টিং-ইয়ার্ড ধরন: * সঙ্গে সঙ্গে, নিম্ন অগ্রাধিকার এলে +।'),
      explain: [L('The two-stack evaluator is the standard way to parse arithmetic: push numbers, and before pushing an operator, apply every stacked operator of equal or higher precedence; “(” blocks, “)” unwinds to it.', 'দুই-স্ট্যাক মূল্যায়নকারী পাটিগণিত পার্স করার প্রচলিত উপায়: সংখ্যা রাখুন, আর একটি অপারেটর রাখার আগে সমান বা উচ্চ অগ্রাধিকারের প্রতিটি রাখা অপারেটর প্রয়োগ করুন; “(” আটকায়, “)” সেখান পর্যন্ত খোলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long eval(const string& s) {
    vector<long long> num;
    vector<char> op;
    auto prec = [](char c) { return c == '*' ? 2 : c == '+' ? 1 : 0; };
    auto apply = [&]() {
        long long b = num.back(); num.pop_back();
        long long a = num.back(); num.pop_back();
        char o = op.back(); op.pop_back();
        num.push_back(o == '*' ? a * b : a + b);
    };
    for (char c : s) {
        if (isdigit(c)) num.push_back(c - '0');
        else if (c == '(') op.push_back(c);
        else if (c == ')') { while (op.back() != '(') apply(); op.pop_back(); }
        else {
            while (!op.empty() && prec(op.back()) >= prec(c)) apply();
            op.push_back(c);
        }
    }
    while (!op.empty()) apply();
    return num.back();
}

int main() {
    string s;
    cin >> s;
    vector<int> opens = {-1}, closes = {(int)s.size()};
    for (int i = 0; i < (int)s.size(); i++) if (s[i] == '*') { opens.push_back(i); closes.push_back(i); }
    long long best = eval(s);
    for (int o : opens)
        for (int c : closes)
            if (o < c) {
                string t = s.substr(0, o + 1) + "(" + s.substr(o + 1, c - o - 1) + ")" + s.substr(c);
                best = max(best, eval(t));
            }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(17² · |s|)',
      space: 'O(|s|)',
      accepted: true,
      toolkit: ['stack-queue', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every bracket position', 'প্রতিটি বন্ধনী অবস্থান চেষ্টা'),
      idea: L('Open before any digit, close after any later digit.', 'যেকোনো অঙ্কের আগে খোলা, পরের যেকোনো অঙ্কের পরে বন্ধ।'),
      explain: [L('O(|s|³) overall, so only short expressions; it confirms that only positions next to * matter.', 'সামগ্রিক O(|s|³), তাই শুধু ছোট এক্সপ্রেশন; এটি নিশ্চিত করে শুধু *-এর পাশের অবস্থান গুরুত্বপূর্ণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long expr(const string& s, size_t& i);
long long atom(const string& s, size_t& i) {
    if (s[i] == '(') { i++; long long v = expr(s, i); i++; return v; }
    return s[i++] - '0';
}
long long term(const string& s, size_t& i) {
    long long v = atom(s, i);
    while (i < s.size() && s[i] == '*') { i++; v *= atom(s, i); }
    return v;
}
long long expr(const string& s, size_t& i) {
    long long v = term(s, i);
    while (i < s.size() && s[i] == '+') { i++; v += term(s, i); }
    return v;
}

int main() {
    string s;
    cin >> s;
    if (s.size() > 41) { cout << "\n"; return 0; }
    long long best = 0;
    for (size_t l = 0; l < s.size(); l += 2)
        for (size_t r = l; r < s.size(); r += 2) {
            string t = s.substr(0, l) + "(" + s.substr(l, r - l + 1) + ")" + s.substr(r + 1);
            size_t i = 0;
            best = max(best, expr(t, i));
        }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(|s|³)',
      space: 'O(|s|)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3+5*7+8*4', output: '303', source: 'sample', note: sample(1) },
    { input: '2+3*5', output: '25', source: 'sample', note: sample(2) },
    { input: '3*4*5', output: '60', source: 'sample', note: sample(3) },
    { input: '9', output: '9', source: 'own', note: L('A single digit.', 'একটি অঙ্ক।') },
  ],
  pitfalls: [L('Trying all O(n²) positions with an O(n) evaluator on n = 5001.', 'n = ৫০০১-এ O(n) মূল্যায়নকারী দিয়ে সব O(n²) অবস্থান চেষ্টা।')],
  related: [{ id: '190C', name: 'STL', why: L('Recursive parsing.', 'রিকার্সিভ পার্সিং।') }],
  toolkit: ['stack-queue'],
};

export const p190C: ProblemEntry = {
  id: '190C',
  contestId: 190,
  index: 'C',
  name: 'STL',
  rating: 1500,
  tags: ['dfs', 'parsing'],
  why: L('Recursive descent: “pair” reads two types, “int” is a leaf; punctuation is added while unwinding.', 'রিকার্সিভ ডিসেন্ট: “pair” দুটি টাইপ পড়ে, “int” একটি পাতা; ফেরার সময় যতিচিহ্ন যোগ হয়।'),
  statement: L('Given the words “pair” and “int” in order (punctuation removed), restore the type, e.g. pair pair int int int → pair<pair<int,int>,int>, or print “Error occurred” if impossible.', 'ক্রমে “pair” আর “int” শব্দ দেওয়া (যতিচিহ্ন সরানো), টাইপটি পুনরুদ্ধার করুন, যেমন pair pair int int int → pair<pair<int,int>,int>, অসম্ভব হলে “Error occurred” প্রিন্ট করুন।'),
  input: L('n (the number of ints), then the words.', 'n (int-এর সংখ্যা), তারপর শব্দগুলো।'),
  output: L('The type, or Error occurred.', 'টাইপ, অথবা Error occurred।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵', 'n ≤ ১০⁵')] },
  samples: [
    { input: '3\npair pair int int int', output: 'pair<pair<int,int>,int>', explain: L('The only valid reading.', 'একমাত্র বৈধ পাঠ।') },
    { input: '1\npair int', output: 'Error occurred', explain: L('A pair needs two types.', 'একটি pair-এর দুটি টাইপ লাগে।') },
  ],
  observation: L('The words are a prefix (Polish) notation of a binary tree, so the type is unique if it exists. Parse recursively; fail if words run out, or if words remain after the top type ends.', 'শব্দগুলো একটি বাইনারি ট্রির প্রিফিক্স (পোলিশ) চিহ্ন, তাই টাইপ থাকলে অনন্য। রিকার্সিভভাবে পার্স করুন; শব্দ ফুরালে, বা শীর্ষ টাইপ শেষ হওয়ার পরে শব্দ বাকি থাকলে ব্যর্থ।'),
  approach: [L('Iterative stack (to avoid deep recursion on 10⁵ nested pairs).', 'পুনরাবৃত্ত স্ট্যাক (১০⁵ নেস্টেড pair-এ গভীর রিকার্শন এড়াতে)।')],
  walkthrough: { input: 'pair pair int int int', steps: [{ state: 'pair → pair → int, int → close → int → close', text: L('pair<pair<int,int>,int>.', 'pair<pair<int,int>,int>।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'stack',
      kind: 'optimal',
      title: L('Stack of open pairs', 'খোলা pair-এর স্ট্যাক'),
      idea: L('Each open pair remembers how many children it still needs.', 'প্রতিটি খোলা pair মনে রাখে আর কয়টি সন্তান লাগবে।'),
      explain: [L('After a complete type, the innermost open pair either gets its first child (print “,”) or its second (print “>” and close it, which may complete its parent too).', 'একটি সম্পূর্ণ টাইপের পরে সবচেয়ে ভেতরের খোলা pair হয় প্রথম সন্তান পায় (“,” প্রিন্ট) নয়তো দ্বিতীয় (“>” প্রিন্ট করে বন্ধ, যা এর parent-কেও সম্পূর্ণ করতে পারে)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<string> w;
    string x;
    while (cin >> x) w.push_back(x);
    string out;
    vector<int> need;  // children still missing for each open pair
    bool ok = true, done = false;
    for (const string& s : w) {
        if (done) { ok = false; break; }
        if (s == "pair") { out += "pair<"; need.push_back(2); continue; }
        out += "int";
        // a complete type has just ended
        while (true) {
            if (need.empty()) { done = true; break; }
            if (--need.back() == 1) { out += ","; break; }
            out += ">";
            need.pop_back();
        }
    }
    if (!ok || !done) cout << "Error occurred\n";
    else cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'io-fast'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Recursive descent', 'রিকার্সিভ ডিসেন্ট'),
      idea: L('parse(): read a word; if pair, parse() twice.', 'parse(): একটি শব্দ পড়ো; pair হলে দুবার parse()।'),
      explain: [L('The most natural parser for a grammar T → int | pair T T. On Codeforces the recursion depth (up to 10⁵) can be risky, which is why the stack version is the main solution.', 'ব্যাকরণ T → int | pair T T-এর সবচেয়ে স্বাভাবিক পার্সার। Codeforces-এ রিকার্শনের গভীরতা (১০⁵ পর্যন্ত) ঝুঁকিপূর্ণ হতে পারে, তাই স্ট্যাক সংস্করণ মূল সমাধান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<string> w;
size_t pos = 0;
string out;

bool parse() {
    if (pos >= w.size()) return false;
    if (w[pos++] == "int") { out += "int"; return true; }
    out += "pair<";
    if (!parse()) return false;
    out += ",";
    if (!parse()) return false;
    out += ">";
    return true;
}

int main() {
    int n;
    cin >> n;
    string x;
    while (cin >> x) w.push_back(x);
    if (parse() && pos == w.size()) cout << out << "\n";
    else cout << "Error occurred\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3\npair pair int int int', output: 'pair<pair<int,int>,int>', source: 'sample', note: sample(1) },
    { input: '1\npair int', output: 'Error occurred', source: 'sample', note: sample(2) },
    { input: '2\nint int', output: 'Error occurred', source: 'own', note: L('Extra word after a complete type.', 'সম্পূর্ণ টাইপের পরে বাড়তি শব্দ।') },
    { input: '1\nint', output: 'int', source: 'own', note: L('A single int.', 'একটি int।') },
  ],
  pitfalls: [L('Accepting extra words after the type ends.', 'টাইপ শেষ হওয়ার পরে বাড়তি শব্দ গ্রহণ।')],
  related: [{ id: '552E', name: 'Vanya and Brackets', why: L('Expression parsing.', 'এক্সপ্রেশন পার্সিং।') }],
  toolkit: ['stack-queue'],
};
