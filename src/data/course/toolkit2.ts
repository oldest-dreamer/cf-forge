import type { L } from '@/i18n/types';
import type { ToolkitEntry } from './types';

const raw = String.raw;

/** New entries added with the C++ basics and STL lessons. */
export const TOOLKIT_EXTRA: ToolkitEntry[] = [
  // ── Basics ───────────────────────────────────────────
  {
    id: 'int-limits',
    group: 'basics',
    title: 'INT_MAX, LLONG_MAX and infinity',
    lesson: 'types-overflow',
    summary: {
      en: 'The largest values of int and long long, and how to choose a safe "infinity" for minimum searches.',
      bn: 'int ও long long-এর বৃহত্তম মান, আর ন্যূনতম খোঁজার জন্য নিরাপদ "অসীম" বাছার উপায়।',
    },
    code: raw`const int INF = 1e9;              // safe for int: INF + INF = 2e9 still fits
const long long LINF = 4e18;       // safe for long long: LINF + LINF would overflow, LINF + 1e18 fits
cout << INT_MAX << " " << LLONG_MAX << "\n";   // 2147483647 9223372036854775807
int best = INT_MAX;                // start of a "find the minimum" loop
for (int x : a) best = min(best, x);`,
    explain: [
      {
        en: 'A "minimum so far" variable must start bigger than any real value, so the first real value replaces it. Use INT_MAX, or a named constant INF. Choose INF so that adding two of them still fits in the type; otherwise a shortest-path update like dist[u] + w overflows and produces a negative number.',
        bn: '"এ পর্যন্ত ন্যূনতম" ভেরিয়েবল শুরুতে যেকোনো বাস্তব মানের চেয়ে বড় হতে হবে, যাতে প্রথম বাস্তব মানটি তাকে সরিয়ে দেয়। INT_MAX বা INF নামের ধ্রুবক ব্যবহার করুন। INF এমন বাছুন যাতে দুটি INF যোগ করলেও টাইপে ধরে; নইলে সংক্ষিপ্ততম পথের dist[u] + w-এর মতো হিসাবে ওভারফ্লো হয়ে ঋণাত্মক সংখ্যা আসে।',
      },
    ],
    pitfalls: [
      { en: 'INT_MAX + 1 overflows. Do not add to INT_MAX.', bn: 'INT_MAX + 1 ওভারফ্লো করে। INT_MAX-এ কিছু যোগ করবেন না।' },
      { en: 'Using 1e9 as INF when real answers can exceed 10^9.', bn: 'বাস্তব উত্তর 10^9 ছাড়াতে পারলে INF হিসেবে 1e9 নেওয়া।' },
    ],
  },
  {
    id: 'casting',
    group: 'basics',
    title: 'Casting and division',
    lesson: 'types-overflow',
    summary: {
      en: 'Convert between int, long long and double on purpose. Integer division drops the fraction; a decimal on either side keeps it.',
      bn: 'ইচ্ছা করে int, long long আর double-এর মধ্যে রূপান্তর। পূর্ণসংখ্যার ভাগ ভগ্নাংশ ফেলে দেয়; কোনো পাশে দশমিক থাকলে তা থাকে।',
    },
    code: raw`int a = 7, b = 2;
cout << a / b << "\n";              // 3
cout << (double)a / b << "\n";      // 3.5
cout << 1.0 * a / b << "\n";        // 3.5 (another way)
long long big = 1LL * a * 1000000000;
int back = (int)big;                // narrowing: only if you are sure it fits`,
    explain: [
      {
        en: 'C++ decides the type of an expression from its operands, not from where you store the result. int / int is an int division even if the variable on the left is a double. Convert one operand first: (double)a / b.',
        bn: 'C++ রাশির টাইপ ঠিক করে অপারেন্ড থেকে, ফল কোথায় রাখছেন তা দেখে নয়। বাঁ পাশের ভেরিয়েবল double হলেও int / int পূর্ণসংখ্যার ভাগ। আগে একটি অপারেন্ড বদলে নিন: (double)a / b।',
      },
    ],
    pitfalls: [
      { en: 'double r = a / b; with int a and b still gives 3, not 3.5.', bn: 'int a ও b হলে double r = a / b; তবুও 3 দেয়, 3.5 নয়।' },
      { en: 'Casting a too-big long long to int silently cuts it.', bn: 'বেশি বড় long long-কে int-এ কাস্ট করলে নিঃশব্দে কেটে যায়।' },
    ],
  },
  {
    id: 'char-ascii',
    group: 'basics',
    title: 'char, digits and letters',
    lesson: 'types-overflow',
    summary: {
      en: 'A char is a small number. Subtract \'0\' to turn a digit character into a number, subtract \'a\' to get a letter\'s position 0..25.',
      bn: 'char হলো ছোট একটি সংখ্যা। অঙ্কের অক্ষরকে সংখ্যা করতে \'0\' বিয়োগ করুন, অক্ষরের অবস্থান ০..২৫ পেতে \'a\' বিয়োগ করুন।',
    },
    code: raw`char c = '7';
int digit = c - '0';                 // 7
char d = 'd';
int pos = d - 'a';                   // 3
char next = 'a' + 5;                 // 'f'
bool isLow = islower(d), isDig = isdigit(c);
char up = toupper(d);                // 'D'`,
    explain: [
      {
        en: 'Letters and digits are stored as consecutive codes: \'a\'..\'z\' are 97..122 and \'0\'..\'9\' are 48..57. Because they are consecutive, differences give positions. This is why cnt[c - \'a\']++ counts letters.',
        bn: 'অক্ষর ও অঙ্ক পরপর কোড হিসেবে রাখা হয়: \'a\'..\'z\' হলো ৯৭..১২২ আর \'0\'..\'9\' হলো ৪৮..৫৭। পরপর বলে বিয়োগফল অবস্থান দেয়। এ কারণেই cnt[c - \'a\']++ অক্ষর গোনে।',
      },
    ],
    pitfalls: [
      { en: 'Printing c + 1 gives a number, not a character. Wrap it: char(c + 1).', bn: 'c + 1 প্রিন্ট করলে সংখ্যা আসে, অক্ষর নয়। char(c + 1) লিখুন।' },
      { en: 'Forgetting uppercase letters have a different base: \'A\'.', bn: 'বড় হাতের অক্ষরের ভিত্তি আলাদা (\'A\'), এটি ভুলে যাওয়া।' },
    ],
  },

  // ── Memory and structure ─────────────────────────────
  {
    id: 'array',
    group: 'memory',
    title: 'Arrays',
    lesson: 'arrays',
    summary: {
      en: 'Fixed-size list. Positions start at 0. Declare big arrays globally; they start filled with zeros.',
      bn: 'নির্দিষ্ট আকারের তালিকা। অবস্থান ০ থেকে শুরু। বড় অ্যারে গ্লোবালি ঘোষণা করুন; এগুলো শূন্য দিয়ে ভরা অবস্থায় শুরু হয়।',
    },
    cost: 'O(1) index',
    code: raw`const int N = 200005;
int a[N];                     // global: zeros
int cnt[26] = {};             // local small array, zeroed with = {}
int g[3][4] = {};             // 3 rows, 4 columns
for (int i = 0; i < n; i++) cin >> a[i];
sort(a, a + n);               // arrays work with STL: begin = a, end = a + n`,
    explain: [
      {
        en: 'Use an array when the size is known up front and you want the simplest, fastest storage. Use vector when the size depends on input or when you want push_back. Both index in O(1).',
        bn: 'আকার আগে থেকে জানা থাকলে এবং সবচেয়ে সরল ও দ্রুত সংরক্ষণ চাইলে অ্যারে নিন। আকার ইনপুটের ওপর নির্ভর করলে বা push_back চাইলে vector নিন। দুটিতেই ইনডেক্স O(1)।',
      },
    ],
    pitfalls: [
      { en: 'a[n] is out of range for size n.', bn: 'আকার n হলে a[n] সীমার বাইরে।' },
      { en: 'A big local array overflows the stack. Make it global.', bn: 'বড় লোকাল অ্যারে স্ট্যাক ওভারফ্লো করে। গ্লোবাল করুন।' },
    ],
  },
  {
    id: 'fill-memset',
    group: 'memory',
    title: 'fill and memset',
    lesson: 'arrays',
    summary: {
      en: 'Set every element to one value. fill works for any value; memset is only safe for 0 and -1 on int arrays.',
      bn: 'সব উপাদানে একই মান বসানো। fill যেকোনো মানে কাজ করে; memset শুধু int অ্যারেতে 0 ও -1-এর জন্য নিরাপদ।',
    },
    code: raw`fill(a, a + n, 7);                       // a[0..n-1] = 7
fill(v.begin(), v.end(), -5);            // vector version
memset(cnt, 0, sizeof(cnt));             // all zero bytes -> 0
memset(dp, -1, sizeof(dp));              // all 0xFF bytes -> -1
vector<int> w(n, 1);                     // or build already filled`,
    explain: [
      {
        en: 'memset writes bytes, not numbers. Filling every byte with 0 gives the int 0, and with 255 gives -1, but filling with 1 gives 16843009 for an int. Use fill for any other value.',
        bn: 'memset সংখ্যা নয়, বাইট লেখে। প্রতি বাইটে 0 দিলে int 0 হয়, 255 দিলে -1 হয়, কিন্তু 1 দিলে int হয় 16843009। অন্য যেকোনো মানের জন্য fill ব্যবহার করুন।',
      },
    ],
    pitfalls: [
      { en: 'memset(a, 1, sizeof a) does not set ones.', bn: 'memset(a, 1, sizeof a) এক বসায় না।' },
      { en: 'sizeof(a) on a pointer or a function parameter gives the pointer size, not the array size.', bn: 'পয়েন্টার বা ফাংশন প্যারামিটারে sizeof(a) অ্যারের নয়, পয়েন্টারের আকার দেয়।' },
    ],
  },
  {
    id: 'grid',
    group: 'memory',
    title: 'Grid and 2D vector',
    lesson: 'grids',
    summary: {
      en: 'A board as vector<string> (characters) or vector<vector<int>> (numbers). g[i][j] is row i, column j.',
      bn: 'বোর্ড হিসেবে vector<string> (অক্ষর) বা vector<vector<int>> (সংখ্যা)। g[i][j] হলো সারি i, কলাম j।',
    },
    code: raw`int n, m; cin >> n >> m;
vector<string> g(n);
for (auto& row : g) cin >> row;                   // each row is one word
vector<vector<int>> dist(n, vector<int>(m, -1));  // n x m table of -1
bool inside = (i >= 0 && i < n && j >= 0 && j < m);`,
    pitfalls: [
      { en: 'Swapping n and m when sizing: the outer vector has n rows, each inner has m columns.', bn: 'আকার দিতে n ও m উল্টে ফেলা: বাইরের ভেক্টরে n সারি, ভেতরের প্রতিটিতে m কলাম।' },
      { en: 'Skipping the inside check before reading a neighbour.', bn: 'প্রতিবেশী পড়ার আগে ভেতরে আছে কি না পরীক্ষা না করা।' },
    ],
  },
  {
    id: 'directions',
    group: 'memory',
    title: 'Direction arrays',
    lesson: 'grids',
    summary: {
      en: 'Two small arrays turn "visit the four (or eight) neighbours" into a four-line loop.',
      bn: 'দুটি ছোট অ্যারে "চার (বা আট) প্রতিবেশী দেখা"-কে চার লাইনের লুপে বদলে দেয়।',
    },
    code: raw`const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};
for (int d = 0; d < 4; d++) {
    int ni = i + dx[d], nj = j + dy[d];
    if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;
    // use cell (ni, nj)
}
// eight directions: dx = {-1,-1,-1,0,0,1,1,1}, dy = {-1,0,1,-1,1,-1,0,1}`,
    explain: [
      {
        en: 'Walking a grid by hand with four copy-pasted blocks is where bugs hide. With direction arrays you write the logic once, and adding diagonals is just a longer array.',
        bn: 'চারটি কপি-পেস্ট ব্লক দিয়ে গ্রিডে হাঁটলে বাগ লুকিয়ে থাকে। দিকের অ্যারে থাকলে যুক্তি একবারই লিখতে হয়, আর কোনাকুনি যোগ করা মানে শুধু অ্যারে লম্বা করা।',
      },
    ],
  },
  {
    id: 'reference',
    group: 'memory',
    title: 'References and const &',
    lesson: 'references-pointers',
    summary: {
      en: 'T& lets a function change the caller\'s variable. const T& passes a big object without copying it.',
      bn: 'T& ফাংশনকে কলারের ভেরিয়েবল বদলাতে দেয়। const T& বড় অবজেক্ট কপি না করে পাঠায়।',
    },
    code: raw`void addOne(int& x) { x++; }                         // changes the original
long long total(const vector<int>& v) { /* read only */ return 0; }
for (int& x : v) x *= 2;                             // edit elements in place
for (const auto& s : words) cout << s << "\n";       // read without copying strings`,
    explain: [
      {
        en: 'A reference is another name for an existing variable, not a copy. Passing a vector by value copies all its elements every call; passing it by const reference costs nothing.',
        bn: 'রেফারেন্স হলো বিদ্যমান ভেরিয়েবলেরই আরেকটি নাম, কপি নয়। ভেক্টর মান দিয়ে পাঠালে প্রতিবার সব উপাদান কপি হয়; const রেফারেন্সে পাঠালে কোনো খরচ নেই।',
      },
    ],
    pitfalls: [
      { en: 'for (auto x : v) x++ changes copies, not the vector.', bn: 'for (auto x : v) x++ ভেক্টর নয়, কপি বদলায়।' },
      { en: 'Returning a reference to a local variable: it dies when the function ends.', bn: 'লোকাল ভেরিয়েবলের রেফারেন্স ফেরত দেওয়া: ফাংশন শেষে সেটি নষ্ট হয়।' },
    ],
  },
  {
    id: 'iterator',
    group: 'memory',
    title: 'Iterators: begin, end, *it',
    lesson: 'references-pointers',
    summary: {
      en: 'An iterator points at an element. begin() is the first, end() is one past the last, *it is the value, it - v.begin() is the index.',
      bn: 'ইটারেটর একটি উপাদানের দিকে নির্দেশ করে। begin() প্রথমটি, end() শেষের পরের ঘর, *it মান, it - v.begin() ইনডেক্স।',
    },
    code: raw`auto it = find(v.begin(), v.end(), 7);
if (it != v.end()) {
    cout << *it << " at " << it - v.begin() << "\n";
}
auto last = prev(v.end());           // iterator to the last element
auto nxt = next(it);                 // the one after it
for (auto it2 = s.begin(); it2 != s.end(); ++it2) cout << *it2 << " ";   // walk a set`,
    explain: [
      {
        en: 'set and map have no [] index, so iterators are how you walk them and how you receive the result of lower_bound. For a vector you can convert an iterator to an index by subtracting begin().',
        bn: 'set ও map-এ [] ইনডেক্স নেই, তাই ইটারেটর দিয়েই এগুলোতে হাঁটতে হয় এবং lower_bound-এর ফল পেতে হয়। ভেক্টরে begin() বিয়োগ করে ইটারেটরকে ইনডেক্সে বদলানো যায়।',
      },
    ],
    pitfalls: [
      { en: 'Dereferencing end(). It points past the data.', bn: 'end()-এ * ব্যবহার করা। এটি ডেটার পরের ঘর নির্দেশ করে।' },
      { en: 'Keeping an iterator after erase or push_back on a vector: it may no longer be valid.', bn: 'ভেক্টরে erase বা push_back-এর পর পুরনো ইটারেটর রেখে দেওয়া: তা অবৈধ হয়ে যেতে পারে।' },
    ],
  },
  {
    id: 'struct',
    group: 'memory',
    title: 'struct',
    lesson: 'structs',
    summary: {
      en: 'Group related fields into one type. Sort a vector of structs with a comparator.',
      bn: 'সম্পর্কিত ফিল্ড এক টাইপে বাঁধা। structs-এর ভেক্টর কম্পারেটর দিয়ে সর্ট করুন।',
    },
    code: raw`struct Edge {
    int to;
    long long w;
};
vector<Edge> e;
e.push_back({3, 10});
sort(e.begin(), e.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });
struct P { int x, y; bool operator<(const P& o) const { return x != o.x ? x < o.x : y < o.y; } };`,
    explain: [
      {
        en: 'Define operator< inside the struct once and sort(), set, map and priority_queue all work with it without extra arguments.',
        bn: 'struct-এর ভেতরে একবার operator< লিখলে sort(), set, map ও priority_queue বাড়তি আর্গুমেন্ট ছাড়াই তা ব্যবহার করে।',
      },
    ],
    pitfalls: [
      { en: 'A comparator must be strict: never return true for equal items.', bn: 'কম্পারেটর কড়া হতে হবে: সমান বস্তুর জন্য কখনো true নয়।' },
      { en: 'Missing semicolon after the closing brace.', bn: 'বন্ধ-ব্রেসের পরে সেমিকোলন না থাকা।' },
    ],
  },
  {
    id: 'recursion',
    group: 'memory',
    title: 'Recursion template',
    lesson: 'recursion',
    summary: {
      en: 'Base case first, then a smaller call. Keep depth under about 10^5.',
      bn: 'আগে বেস কেস, তারপর ছোট ডাক। গভীরতা প্রায় 10^5-এর নিচে রাখুন।',
    },
    code: raw`long long solve(int n) {
    if (n == 0) return 1;            // base case: answer known directly
    return n * solve(n - 1);         // smaller problem, then combine
}
// try all subsets of n items
void go(int i, vector<int>& chosen) {
    if (i == n) { /* use chosen */ return; }
    go(i + 1, chosen);                   // skip item i
    chosen.push_back(i); go(i + 1, chosen); chosen.pop_back();   // take item i
}`,
    pitfalls: [
      { en: 'No base case, or a call that does not shrink the input: infinite recursion and a crash.', bn: 'বেস কেস নেই, বা ডাকে ইনপুট ছোট হয় না: অনন্ত রিকার্শন ও ক্র্যাশ।' },
      { en: 'Plain recursion that repeats sub-problems (fibonacci): add memoization.', bn: 'উপ-সমস্যা পুনরাবৃত্তি করে এমন সরল রিকার্শন (ফিবোনাচ্চি): মেমোইজেশন যোগ করুন।' },
    ],
  },
  {
    id: 'memo',
    group: 'memory',
    title: 'Memoization',
    lesson: 'recursion',
    summary: {
      en: 'Store each computed answer so it is calculated once. Turns exponential recursion into linear work.',
      bn: 'প্রতিটি হিসাব করা উত্তর জমিয়ে রাখুন যাতে একবারই হিসাব হয়। ঘাতীয় রিকার্শনকে রৈখিক কাজে নামায়।',
    },
    code: raw`long long memo[100]; bool seen[100];
long long fib(int n) {
    if (n <= 1) return n;
    if (seen[n]) return memo[n];
    seen[n] = true;
    return memo[n] = fib(n - 1) + fib(n - 2);
}
map<pair<int,int>, long long> cache;   // when the state has two numbers`,
    explain: [
      {
        en: 'Ask: "if I call this function twice with the same arguments, do I get the same answer?" If yes, and the same arguments come up often, cache by arguments. That is dynamic programming.',
        bn: 'নিজেকে জিজ্ঞেস করুন: "একই আর্গুমেন্টে ফাংশন দুবার ডাকলে কি একই উত্তর পাই?" হ্যাঁ হলে, আর একই আর্গুমেন্ট প্রায়ই এলে, আর্গুমেন্ট ধরে জমিয়ে রাখুন। এটাই ডায়নামিক প্রোগ্রামিং।',
      },
    ],
  },

  // ── Containers ───────────────────────────────────────
  {
    id: 'deque',
    group: 'containers',
    title: 'deque',
    lesson: 'stl-containers',
    summary: {
      en: 'Double-ended queue: push and pop at both ends in O(1), and index in O(1). Used for sliding windows and 0-1 BFS.',
      bn: 'দুই-মুখী কিউ: দুই প্রান্তেই push ও pop O(1), ইনডেক্সও O(1)। স্লাইডিং উইন্ডো ও ০-১ BFS-এ ব্যবহৃত।',
    },
    cost: 'O(1) at both ends',
    code: raw`deque<int> d;
d.push_back(2); d.push_front(1);     // 1 2
d.front(); d.back(); d[1];
d.pop_front(); d.pop_back();
// sliding-window maximum idea: keep indices with decreasing values in d`,
    pitfalls: [{ en: 'front() or back() on an empty deque is undefined behaviour.', bn: 'খালি deque-এ front() বা back() অনির্ধারিত আচরণ।' }],
  },
  {
    id: 'multiset',
    group: 'containers',
    title: 'multiset',
    lesson: 'stl-containers',
    summary: {
      en: 'A sorted bag: duplicates allowed. Insert, erase one copy, find min and max in O(log n).',
      bn: 'সাজানো থলি: ডুপ্লিকেট চলে। O(log n)-এ ঢোকানো, একটি কপি মোছা, ক্ষুদ্রতম ও বৃহত্তম খোঁজা।',
    },
    cost: 'O(log n)',
    code: raw`multiset<int> ms = {4, 4, 7};
ms.insert(4);
ms.erase(ms.find(4));                // remove exactly one 4
ms.erase(4);                         // removes ALL 4s
int mn = *ms.begin(), mx = *ms.rbegin();
int c = ms.count(4);                 // number of copies (O(log n + c))`,
    pitfalls: [{ en: 'erase(value) deletes every copy. Use erase(find(value)) for one.', bn: 'erase(value) সব কপি মোছে। একটির জন্য erase(find(value))।' }],
  },
  {
    id: 'unordered-map',
    group: 'containers',
    title: 'unordered_map and unordered_set',
    lesson: 'stl-containers',
    summary: {
      en: 'Hash tables: average O(1) insert and find, but no order. A crafted input can make them slow, so prefer map unless speed demands it.',
      bn: 'হ্যাশ টেবিল: গড়ে O(1) ঢোকানো ও খোঁজা, কিন্তু ক্রম নেই। বিশেষ ইনপুটে এগুলো ধীর করা যায়, তাই গতি একান্ত দরকার না হলে map নিন।',
    },
    cost: 'O(1) average',
    code: raw`unordered_map<string, int> freq;
freq["apple"]++;
if (freq.find("kiwi") == freq.end()) { /* absent */ }
unordered_set<int> seen;
if (!seen.insert(x).second) { /* x was already there */ }
freq.reserve(1 << 20);               // fewer rehashes`,
    pitfalls: [
      { en: 'Iterating gives an unpredictable order; do not rely on it.', bn: 'ঘুরলে ক্রম অনির্ধারিত; এর ওপর নির্ভর করবেন না।' },
      { en: 'On Codeforces anti-hash tests can make it O(n) per operation; use map or a randomised hash.', bn: 'কোডফোর্সেসে অ্যান্টি-হ্যাশ টেস্টে প্রতি অপারেশন O(n) হতে পারে; map বা র‍্যান্ডম হ্যাশ ব্যবহার করুন।' },
    ],
  },
  {
    id: 'bitset',
    group: 'containers',
    title: 'bitset',
    lesson: 'stl-containers',
    summary: {
      en: 'A fixed-size array of bits, 64 flags per machine word. Great for sieves and for speeding up DP by a factor of 64.',
      bn: 'বিটের নির্দিষ্ট আকারের অ্যারে, এক মেশিন শব্দে ৬৪টি ফ্ল্যাগ। সিভ আর DP ৬৪ গুণ দ্রুত করতে চমৎকার।',
    },
    code: raw`bitset<1000> b;                 // size is a compile-time constant
b[5] = 1; b.set(7); b.reset(5); b.flip(3);
int ones = b.count();
bitset<1000> c = (b << 2) | b;  // shift and OR whole sets at once
bool any = b.any(), none = b.none();`,
    pitfalls: [{ en: 'The size must be a constant known at compile time.', bn: 'আকার কম্পাইল-টাইমে জানা ধ্রুবক হতে হবে।' }],
  },

  // ── Algorithms ───────────────────────────────────────
  {
    id: 'iota-fill',
    group: 'algorithms',
    title: 'iota',
    lesson: 'stl-algorithms',
    summary: {
      en: 'Fill a range with consecutive values 0, 1, 2, ... Perfect for an index array to sort by another key.',
      bn: 'পরিসর ০, ১, ২, ... ধারাবাহিক মানে ভরা। অন্য কীর ভিত্তিতে সর্ট করার ইনডেক্স অ্যারের জন্য আদর্শ।',
    },
    code: raw`vector<int> idx(n);
iota(idx.begin(), idx.end(), 0);                 // 0 1 2 ... n-1
sort(idx.begin(), idx.end(), [&](int i, int j) { return a[i] < a[j]; });
// idx[0] is now the position of the smallest a`,
    explain: [
      {
        en: 'Sorting indices instead of values lets you keep the original positions. After the sort, idx[k] tells you where the k-th smallest value lived in the input.',
        bn: 'মানের বদলে ইনডেক্স সর্ট করলে মূল অবস্থান ধরে রাখা যায়। সর্টের পর idx[k] বলে k-তম ক্ষুদ্রতম মান ইনপুটে কোথায় ছিল।',
      },
    ],
  },
  {
    id: 'erase-remove',
    group: 'algorithms',
    title: 'erase, remove_if and unique',
    lesson: 'stl-algorithms',
    summary: {
      en: 'Delete elements from a vector in one pass: remove_if or unique moves the keepers forward, erase cuts the tail.',
      bn: 'এক পাসে ভেক্টর থেকে উপাদান মোছা: remove_if বা unique রাখার মানগুলো সামনে আনে, erase লেজ কেটে দেয়।',
    },
    code: raw`v.erase(remove(v.begin(), v.end(), 0), v.end());                 // delete all zeros
v.erase(remove_if(v.begin(), v.end(), [](int x) { return x < 0; }), v.end());
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());                    // distinct values
v.erase(v.begin() + 2);                                          // one element, O(n)`,
    pitfalls: [
      { en: 'remove and unique alone do not shrink the vector; you must erase the tail.', bn: 'শুধু remove বা unique ভেক্টর ছোট করে না; লেজ erase করতে হয়।' },
      { en: 'Erasing in a loop one element at a time is O(n^2).', bn: 'লুপে একটি একটি করে erase করা O(n^2)।' },
    ],
  },
  {
    id: 'rotate-algo',
    group: 'algorithms',
    title: 'rotate, swap and shuffle',
    lesson: 'stl-algorithms',
    summary: {
      en: 'Cyclic shift, exchange two values, and random order.',
      bn: 'চক্রাকার সরানো, দুটি মান অদলবদল, আর এলোমেলো ক্রম।',
    },
    code: raw`rotate(v.begin(), v.begin() + k, v.end());   // left rotate by k
swap(a, b);  swap(v[i], v[j]);
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
shuffle(v.begin(), v.end(), rng);
int r = rng() % 100;                          // random number 0..99`,
    explain: [
      {
        en: 'shuffle before sort is a cheap shield against inputs built to make quicksort-like code slow. For random numbers use mt19937, not rand().',
        bn: 'কুইকসর্টের মতো কোড ধীর করার জন্য বানানো ইনপুট ঠেকাতে sort-এর আগে shuffle সস্তা সুরক্ষা। এলোমেলো সংখ্যার জন্য rand() নয়, mt19937 ব্যবহার করুন।',
      },
    ],
  },

  // ── Debugging ────────────────────────────────────────
  {
    id: 'cerr-debug',
    group: 'debug',
    title: 'Debug printing with cerr',
    lesson: 'debugging',
    summary: {
      en: 'Print what the program really holds, to the error stream so the judge ignores it.',
      bn: 'প্রোগ্রামে আসলে কী আছে তা এরর স্ট্রিমে প্রিন্ট করুন, যাতে জাজ তা উপেক্ষা করে।',
    },
    code: raw`#define dbg(x) cerr << #x << " = " << (x) << "\n"
int a = 5; long long s = 99;
dbg(a); dbg(s);                       // a = 5, s = 99
for (int x : v) cerr << x << " ";
cerr << "\n";`,
    pitfalls: [
      { en: 'Debug lines printed with cout break the answer. Always cerr.', bn: 'cout দিয়ে ডিবাগ প্রিন্ট করলে উত্তর নষ্ট হয়। সবসময় cerr।' },
      { en: 'Heavy debug output left in a final submission can cause Time Limit Exceeded.', bn: 'চূড়ান্ত জমায় বেশি ডিবাগ আউটপুট রেখে দিলে Time Limit Exceeded হতে পারে।' },
    ],
  },
  {
    id: 'assert-check',
    group: 'debug',
    title: 'assert',
    lesson: 'debugging',
    summary: {
      en: 'State a fact you believe is true. If it is false the program stops loudly at that line, so you find the first wrong belief.',
      bn: 'এমন তথ্য লিখুন যা সত্য বলে বিশ্বাস করেন। মিথ্যা হলে প্রোগ্রাম ওই লাইনেই জোরে থামে, ফলে প্রথম ভুল ধারণা ধরা পড়ে।',
    },
    code: raw`assert(n >= 1);
assert(i >= 0 && i < (int)v.size());
assert(sum >= 0);                     // overflow often shows up here`,
    explain: [
      {
        en: 'assert is for you while testing. A failed assert gives a Runtime Error on the judge, which is still more useful than a mysterious Wrong Answer because it tells you the exact line and condition.',
        bn: 'assert পরীক্ষার সময় আপনার জন্য। জাজে ব্যর্থ assert Runtime Error দেয়, যা রহস্যময় Wrong Answer-এর চেয়ে বেশি কাজের, কারণ এটি ঠিক লাইন ও শর্ত জানায়।',
      },
    ],
  },
];

/** Longer explanations added to the original entries. */
export const TOOLKIT_EXPLAIN: Record<string, { explain?: L[]; pitfalls?: L[] }> = {
  vector: {
    explain: [
      {
        en: 'vector is the default container. It stores elements side by side, so v[i] is instant and walking through it is the fastest thing a computer can do. It grows by doubling its capacity, so push_back is cheap on average.',
        bn: 'vector ডিফল্ট কনটেইনার। এটি উপাদানগুলো পাশাপাশি রাখে, তাই v[i] তাৎক্ষণিক আর এর ভেতর দিয়ে হাঁটা কম্পিউটারের সবচেয়ে দ্রুত কাজ। এটি ধারণক্ষমতা দ্বিগুণ করে বাড়ে, তাই push_back গড়ে সস্তা।',
      },
      {
        en: 'Useful members: size() (cast to int when comparing with negatives), empty(), back(), front(), clear(), resize(k), insert(pos, x) and erase(pos) which are O(n) because later elements shift.',
        bn: 'কাজের সদস্য: size() (ঋণাত্মকের সঙ্গে তুলনায় int-এ কাস্ট করুন), empty(), back(), front(), clear(), resize(k), এবং insert(pos, x) ও erase(pos) যা O(n), কারণ পরের উপাদান সরে যায়।',
      },
    ],
    pitfalls: [
      { en: 'v.size() is unsigned: v.size() - 1 on an empty vector becomes a huge number. Write (int)v.size() - 1.', bn: 'v.size() আনসাইন্ড: খালি ভেক্টরে v.size() - 1 বিশাল সংখ্যা হয়। (int)v.size() - 1 লিখুন।' },
      { en: 'Reading v[i] beyond size() is not checked and may crash far from the bug. Test locally with v.at(i) or -D_GLIBCXX_DEBUG.', bn: 'size() ছাড়িয়ে v[i] পড়া যাচাই হয় না, বাগ থেকে দূরে ক্র্যাশ করতে পারে। লোকালি v.at(i) বা -D_GLIBCXX_DEBUG দিয়ে পরীক্ষা করুন।' },
      { en: 'vector<int> v(n) then push_back adds after n zeros. Use reserve(n) when you want an empty vector with space.', bn: 'vector<int> v(n)-এর পর push_back করলে n টি শূন্যের পরে যোগ হয়। জায়গাসহ খালি ভেক্টর চাইলে reserve(n) ব্যবহার করুন।' },
    ],
  },
  pair: {
    explain: [
      {
        en: 'pair<A,B> holds .first and .second. Comparing two pairs compares first, then second only if the firsts are equal. That is why sorting pairs gives "by first, ties by second" for free.',
        bn: 'pair<A,B>-তে .first ও .second থাকে। দুটি pair তুলনায় আগে first, first সমান হলে তবেই second দেখা হয়। এ কারণেই pair সর্ট করলে বিনামূল্যে "first অনুযায়ী, সমান হলে second" ক্রম মেলে।',
      },
    ],
    pitfalls: [{ en: 'To sort by the larger first element use pair<int,int> with negative values, or a custom comparator.', bn: 'বড় first আগে সর্ট করতে ঋণাত্মক মান রাখুন বা নিজস্ব কম্পারেটর দিন।' }],
  },
  set: {
    explain: [
      {
        en: 'Think of a set as a sorted list that rejects duplicates and can insert and delete anywhere quickly. Because it is sorted you can ask "what is the smallest value that is at least x?" with lower_bound(x), which a vector can only answer after sorting once.',
        bn: 'set-কে ভাবুন এমন সাজানো তালিকা হিসেবে যা ডুপ্লিকেট নেয় না এবং যেকোনো জায়গায় দ্রুত ঢোকানো-মোছা করা যায়। সাজানো বলে "x বা তার বেশি সবচেয়ে ছোট মান কোনটি?" জিজ্ঞেস করা যায় lower_bound(x) দিয়ে, যা ভেক্টর একবার সর্ট করার পরই পারে।',
      },
    ],
    pitfalls: [
      { en: 'Use s.lower_bound(x), not lower_bound(s.begin(), s.end(), x): the second walks one step at a time and is O(n).', bn: 's.lower_bound(x) ব্যবহার করুন, lower_bound(s.begin(), s.end(), x) নয়: দ্বিতীয়টি এক পা এক পা হাঁটে, O(n)।' },
      { en: 'Elements of a set cannot be modified; erase and insert instead.', bn: 'set-এর উপাদান বদলানো যায় না; erase করে insert করুন।' },
    ],
  },
  map: {
    explain: [
      {
        en: 'A map is a set of keys, each carrying a value. m[key] finds the value, and if the key is missing it creates it with a default (0 for numbers). That is convenient for counting but it also means that merely looking up a missing key adds it.',
        bn: 'map হলো কী-এর সেট, প্রতিটি কী একটি মান বহন করে। m[key] মান খোঁজে, কী না থাকলে ডিফল্ট (সংখ্যার জন্য 0) দিয়ে তৈরি করে। গণনায় এটি সুবিধাজনক, কিন্তু অনুপস্থিত কী শুধু দেখলেও তা যোগ হয়ে যায়।',
      },
    ],
    pitfalls: [
      { en: 'if (m[k] == 0) creates k. Use m.count(k) or m.find(k) to test.', bn: 'if (m[k] == 0) k তৈরি করে ফেলে। পরীক্ষায় m.count(k) বা m.find(k) ব্যবহার করুন।' },
      { en: 'Iterating while erasing needs care: it = m.erase(it).', bn: 'মুছতে মুছতে ঘুরলে সতর্ক হন: it = m.erase(it)।' },
    ],
  },
  'priority-queue': {
    explain: [
      {
        en: 'A heap does one thing well: hand you the best element now, and accept new elements at any time. It cannot search or list in order. Use it for "repeatedly take the largest/smallest" such as Dijkstra, merging sorted lists and scheduling greedies.',
        bn: 'হিপ একটি কাজ ভালো করে: এখনই সেরা উপাদান দেয়, আর যেকোনো সময় নতুন উপাদান নেয়। এটি খুঁজতে বা ক্রমে তালিকা দিতে পারে না। "বারবার সবচেয়ে বড়/ছোট নাও" ধরনের কাজে ব্যবহার করুন, যেমন ডায়াকস্ট্রা, সাজানো তালিকা মেশানো ও শিডিউলিং গ্রিডি।',
      },
    ],
    pitfalls: [
      { en: 'To get smallest-first with pairs, push negatives or use greater<>.', bn: 'pair-এ ছোটটি আগে পেতে ঋণাত্মক মান ঢোকান বা greater<> দিন।' },
      { en: 'top() on an empty heap is undefined behaviour.', bn: 'খালি হিপে top() অনির্ধারিত আচরণ।' },
    ],
  },
  'stack-queue': {
    explain: [
      {
        en: 'A stack is a pile of plates: you only touch the top. A queue is a line at a shop: the first person in is served first. Both hide everything except the one end (or two) you are allowed to use, which makes mistakes harder.',
        bn: 'stack হলো থালার স্তূপ: শুধু ওপরেরটি ছোঁয়া যায়। queue হলো দোকানের লাইন: আগে আসা মানুষ আগে সেবা পায়। দুটিই অনুমোদিত এক (বা দুই) প্রান্ত ছাড়া সব লুকিয়ে রাখে, ফলে ভুল করা কঠিন হয়।',
      },
    ],
    pitfalls: [{ en: 'pop() returns nothing. Read top() or front() first, then pop().', bn: 'pop() কিছু ফেরত দেয় না। আগে top() বা front() পড়ুন, তারপর pop()।' }],
  },
  sort: {
    explain: [
      {
        en: 'sort(begin, end) orders the range in O(n log n). Give a third argument to change the rule: greater<int>() for descending, or a lambda for anything custom. sort is not stable; use stable_sort when equal items must keep their original order.',
        bn: 'sort(begin, end) O(n log n)-এ পরিসর সাজায়। নিয়ম বদলাতে তৃতীয় আর্গুমেন্ট দিন: অবরোহী ক্রমের জন্য greater<int>(), অন্য কিছুর জন্য ল্যাম্বডা। sort স্থিতিশীল নয়; সমান উপাদানের মূল ক্রম রাখতে stable_sort নিন।',
      },
    ],
    pitfalls: [
      { en: 'Sorting a range of length n with sort(a, a + n) but writing a + n + 1 reads past the end.', bn: 'n দৈর্ঘ্যের পরিসরে sort(a, a + n) লিখে a + n + 1 দিলে শেষ ছাড়িয়ে পড়ে।' },
      { en: 'A comparator that returns true for equal items can crash.', bn: 'সমান উপাদানের জন্য true দেয় এমন কম্পারেটর ক্র্যাশ করাতে পারে।' },
    ],
  },
  'lower-bound': {
    explain: [
      {
        en: 'On a sorted range, lower_bound(x) is the first position whose value is at least x, and upper_bound(x) is the first position whose value is greater than x. The distance between them is how many times x appears. Both take O(log n).',
        bn: 'সাজানো পরিসরে lower_bound(x) হলো প্রথম অবস্থান যার মান অন্তত x, আর upper_bound(x) হলো প্রথম অবস্থান যার মান x-এর চেয়ে বেশি। এ দুইয়ের দূরত্ব x কতবার আছে তা বলে। দুটিই O(log n)।',
      },
    ],
    pitfalls: [{ en: 'The range must already be sorted by the same rule.', bn: 'পরিসর আগে থেকেই একই নিয়মে সাজানো থাকতে হবে।' }],
  },
  'long-long': {
    explain: [
      {
        en: 'Rule of thumb: if a value, a sum or a product can be larger than about 2·10^9, store it in long long and make sure the first multiplication is already 64-bit (1LL * a * b).',
        bn: 'মোটামুটি নিয়ম: কোনো মান, যোগফল বা গুণফল প্রায় 2·10^9-এর বেশি হতে পারলে long long-এ রাখুন এবং প্রথম গুণটিই যেন ৬৪ বিটে হয় (1LL * a * b)।',
      },
    ],
  },
  modulo: {
    explain: [
      {
        en: 'x % m is the remainder after dividing by m. When counting problems ask for "the answer modulo 10^9 + 7", reduce after every addition or multiplication so numbers never get big. For negative values add m before the final %.',
        bn: 'x % m হলো m দিয়ে ভাগের পর ভাগশেষ। গণনার প্রবলেম "উত্তর modulo 10^9 + 7" চাইলে প্রতিটি যোগ বা গুণের পর কমিয়ে নিন যাতে সংখ্যা বড় না হয়। ঋণাত্মক মানের জন্য শেষ % করার আগে m যোগ করুন।',
      },
    ],
    pitfalls: [{ en: '(a - b) % m can be negative. Use ((a - b) % m + m) % m.', bn: '(a - b) % m ঋণাত্মক হতে পারে। ((a - b) % m + m) % m ব্যবহার করুন।' }],
  },
  'io-fast': {
    explain: [
      {
        en: 'By default cin and cout stay in step with C input/output, which costs time. The two lines switch that off. After that, mixing scanf and cin gives mixed-up input.',
        bn: 'ডিফল্টে cin ও cout C-এর ইনপুট/আউটপুটের সঙ্গে তাল মিলিয়ে চলে, যাতে সময় লাগে। দুটি লাইন তা বন্ধ করে। এরপর scanf ও cin মেশালে ইনপুট গুলিয়ে যায়।',
      },
    ],
  },
};
