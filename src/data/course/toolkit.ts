import type { L } from '@/i18n/types';
import type { ToolkitEntry, ToolkitGroup } from './types';

const raw = String.raw;

export const TOOLKIT_GROUPS: { id: ToolkitGroup; name: L }[] = [
  { id: 'io', name: { en: 'Input and output', bn: 'ইনপুট ও আউটপুট' } },
  { id: 'basics', name: { en: 'Language basics', bn: 'ভাষার মৌলিক বিষয়' } },
  { id: 'math', name: { en: 'Math', bn: 'গণিত' } },
  { id: 'strings', name: { en: 'Strings', bn: 'স্ট্রিং' } },
  { id: 'containers', name: { en: 'Containers', bn: 'কনটেইনার' } },
  { id: 'algorithms', name: { en: 'Algorithms', bn: 'অ্যালগরিদম' } },
  { id: 'modern', name: { en: 'Modern C++', bn: 'আধুনিক C++' } },
  { id: 'bits', name: { en: 'Bits', bn: 'বিট' } },
];

export const TOOLKIT: ToolkitEntry[] = [
  // ── Input and output ─────────────────────────────────
  {
    id: 'io-basics',
    group: 'io',
    title: 'cin and cout',
    lesson: 'first-program',
    summary: {
      en: 'Read values with cin >> x and print them with cout << x. cin skips spaces and newlines between values.',
      bn: 'cin >> x দিয়ে মান পড়ুন আর cout << x দিয়ে প্রিন্ট করুন। মানগুলোর মাঝের স্পেস আর নতুন লাইন cin বাদ দেয়।',
    },
    code: raw`int n;
long long x;
cin >> n >> x;
cout << n << " " << x << "\n";`,
  },
  {
    id: 'io-fast',
    group: 'io',
    title: 'Fast I/O',
    lesson: 'complexity',
    summary: {
      en: 'Two lines at the top of main make cin and cout several times faster. Use them whenever the input has 10⁵ or more numbers.',
      bn: 'main-এর শুরুতে দুটি লাইন cin আর cout-কে কয়েক গুণ দ্রুত করে। ইনপুটে ১০⁵ বা বেশি সংখ্যা থাকলেই এগুলো লিখুন।',
    },
    code: raw`int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // ... read and print as usual
}`,
    notes: [
      { en: 'After this, do not mix cin/cout with scanf/printf.', bn: 'এরপর cin/cout-এর সঙ্গে scanf/printf মেশাবেন না।' },
      { en: 'Print "\\n", not endl.', bn: 'endl নয়, "\\n" প্রিন্ট করুন।' },
    ],
  },
  {
    id: 'c-io',
    group: 'io',
    title: 'scanf and printf',
    summary: {
      en: 'C-style input and output. Format codes: %d int, %lld long long, %s word, %c char, %.6f double with 6 decimals.',
      bn: 'C-স্টাইলের ইনপুট ও আউটপুট। ফরম্যাট কোড: %d int, %lld long long, %s শব্দ, %c char, %.6f ৬ দশমিকের double।',
    },
    code: raw`int n; long long x;
scanf("%d %lld", &n, &x);
printf("%d %lld\n", n, x);
puts("YES");      // prints a line`,
  },
  {
    id: 'while-n',
    group: 'io',
    title: 'while (t--)',
    lesson: 'input',
    summary: {
      en: 'The standard loop for “t test cases”: runs exactly t times and counts t down to 0.',
      bn: '“t টেস্ট কেস”-এর জন্য প্রচলিত লুপ: ঠিক t বার চলে আর t-কে 0 পর্যন্ত কমায়।',
    },
    code: raw`int t;
cin >> t;
while (t--) {
    solve();
}`,
  },
  {
    id: 'getline',
    group: 'io',
    title: 'getline',
    summary: {
      en: 'Reads a whole line, spaces included. Call cin.ignore() first if the previous read was cin >>.',
      bn: 'স্পেসসহ পুরো লাইন পড়ে। আগের পড়া cin >> হলে প্রথমে cin.ignore() ডাকুন।',
    },
    code: raw`int n;
cin >> n;
cin.ignore();          // skip the rest of this line
string line;
getline(cin, line);`,
  },
  {
    id: 'setprecision',
    group: 'io',
    title: 'Printing decimals',
    summary: {
      en: 'fixed with setprecision(k) prints exactly k digits after the decimal point.',
      bn: 'fixed আর setprecision(k) দশমিকের পরে ঠিক k-টি অঙ্ক প্রিন্ট করে।',
    },
    code: raw`double r = 2.0 / 3;
cout << fixed << setprecision(6) << r << "\n";   // 0.666667`,
  },

  // ── Language basics ──────────────────────────────────
  {
    id: 'long-long',
    group: 'basics',
    title: 'long long',
    lesson: 'variables',
    summary: {
      en: '64-bit integer, about ±9.2·10¹⁸. Use it for sums, products and anything that can pass 2·10⁹.',
      bn: '৬৪-বিট পূর্ণসংখ্যা, প্রায় ±৯.২·১০¹⁸। যোগফল, গুণফল আর ২·১০⁹ ছাড়াতে পারে এমন সব কিছুতে ব্যবহার করুন।',
    },
    code: raw`int a = 100000, b = 100000;
long long wrong = a * b;          // overflow happens before the assignment
long long right = 1LL * a * b;    // 10000000000`,
  },
  {
    id: 'modulo',
    group: 'basics',
    title: '% (remainder)',
    lesson: 'variables',
    summary: {
      en: 'a % b is the remainder of a / b. x % 2 == 0 tests even; x % 10 is the last digit.',
      bn: 'a % b হলো a / b-এর ভাগশেষ। x % 2 == 0 জোড় কি না দেখে; x % 10 শেষ অঙ্ক।',
    },
    code: raw`cout << 17 % 5 << "\n";    // 2
cout << -17 % 5 << "\n";   // -2: the sign follows the left side`,
  },
  {
    id: 'ternary',
    group: 'basics',
    title: 'cond ? a : b',
    lesson: 'conditions',
    summary: {
      en: 'Gives a when the condition is true and b otherwise. Wrap it in parentheses inside cout.',
      bn: 'শর্ত সত্য হলে a, না হলে b দেয়। cout-এর ভেতরে বন্ধনীতে রাখুন।',
    },
    code: raw`cout << (n % 2 == 0 ? "YES" : "NO") << "\n";`,
  },
  {
    id: 'bool-arith',
    group: 'basics',
    title: 'bool as 0 or 1',
    lesson: 'conditions',
    summary: {
      en: 'A comparison is true or false, and adds as 1 or 0. Handy for counting.',
      bn: 'তুলনার ফল true বা false, আর যোগে ১ বা ০ হিসেবে গোনা হয়। গণনায় কাজে লাগে।',
    },
    code: raw`int cnt = 0;
for (int x : a) cnt += (x > 0);   // number of positives`,
  },
  {
    id: 'for-loop',
    group: 'basics',
    title: 'for loop',
    lesson: 'loops',
    summary: {
      en: 'for (start; keep-going condition; step). The range-for form for (auto x : v) visits every element.',
      bn: 'for (শুরু; চালিয়ে যাওয়ার শর্ত; ধাপ)। range-for রূপ for (auto x : v) প্রতিটি উপাদান দেখে।',
    },
    code: raw`for (int i = 0; i < n; i++) cin >> a[i];
for (int x : a) cout << x << " ";
for (int i = n - 1; i >= 0; i--) cout << a[i];   // backwards`,
  },
  {
    id: 'break-continue',
    group: 'basics',
    title: 'break and continue',
    lesson: 'loops',
    summary: {
      en: 'break leaves the loop now; continue jumps to the next round.',
      bn: 'break এখনই লুপ ছাড়ে; continue পরের ধাপে চলে যায়।',
    },
    code: raw`for (int x : a) {
    if (x < 0) continue;   // skip negatives
    if (x == 0) break;     // stop at the first zero
    sum += x;
}`,
  },
  {
    id: 'functions',
    group: 'basics',
    title: 'Functions',
    lesson: 'functions',
    summary: {
      en: 'Return type, name, parameters. Use & to change the caller’s variable and const & to pass big objects without copying.',
      bn: 'রিটার্ন টাইপ, নাম, প্যারামিটার। ডাকার জায়গার ভেরিয়েবল বদলাতে & আর বড় অবজেক্ট কপি ছাড়া পাঠাতে const & ব্যবহার করুন।',
    },
    code: raw`long long sumOf(const vector<long long>& a) {
    long long s = 0;
    for (long long x : a) s += x;
    return s;
}
void bump(int& x) { x++; }`,
  },

  // ── Math ─────────────────────────────────────────────
  {
    id: 'ceil-div',
    group: 'math',
    title: 'Ceiling division',
    lesson: 'math-helpers',
    summary: {
      en: '⌈a / b⌉ for positive integers, with no floating point.',
      bn: 'ধনাত্মক পূর্ণসংখ্যার জন্য ⌈a / b⌉, কোনো দশমিক ছাড়া।',
    },
    code: raw`long long ceilDiv(long long a, long long b) {
    return (a + b - 1) / b;
}`,
    notes: [{ en: 'ceil(a / b) with integers is wrong: a / b is already rounded down.', bn: 'পূর্ণসংখ্যায় ceil(a / b) ভুল: a / b আগেই নিচের দিকে রাউন্ড হয়ে যায়।' }],
  },
  {
    id: 'gcd-lcm',
    group: 'math',
    title: 'gcd and lcm',
    lesson: 'math-helpers',
    summary: {
      en: 'Built into <numeric> since C++17. Both run in O(log min(a, b)).',
      bn: 'C++17 থেকে <numeric>-এ আছে। দুটিই O(log min(a, b))-এ চলে।',
    },
    cost: 'O(log n)',
    code: raw`long long g = gcd(a, b);
long long l = a / gcd(a, b) * b;   // lcm without overflowing in the middle`,
  },
  {
    id: 'mod-arith',
    group: 'math',
    title: 'Modular arithmetic',
    lesson: 'math-helpers',
    summary: {
      en: 'Keep every intermediate value below M = 10⁹+7: take % M after each + and *, and add M before % after a subtraction.',
      bn: 'প্রতিটি মধ্যবর্তী মান M = ১০⁹+৭-এর নিচে রাখুন: প্রতিটি + আর *-এর পর % M নিন, আর বিয়োগের পর % নেওয়ার আগে M যোগ করুন।',
    },
    code: raw`const long long MOD = 1'000'000'007;
long long add(long long a, long long b) { return (a + b) % MOD; }
long long sub(long long a, long long b) { return ((a - b) % MOD + MOD) % MOD; }
long long mul(long long a, long long b) { return a % MOD * (b % MOD) % MOD; }`,
  },
  {
    id: 'mod-pow',
    group: 'math',
    title: 'Fast power',
    lesson: 'math-helpers',
    summary: {
      en: 'aᵇ mod m in O(log b) by repeated squaring. With a prime m, power(a, m − 2, m) is the modular inverse of a.',
      bn: 'বারবার বর্গ করে O(log b)-এ aᵇ mod m। m মৌলিক হলে power(a, m − 2, m) হলো a-এর মডুলার ইনভার্স।',
    },
    cost: 'O(log b)',
    code: raw`long long power(long long a, long long b, long long m) {
    long long r = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) r = r * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return r;
}`,
  },
  {
    id: 'prefix-sum',
    group: 'math',
    title: 'Prefix sums',
    lesson: 'complexity',
    summary: {
      en: 'Precompute p[i] = a[1] + … + a[i]; then any range sum a[l..r] is p[r] − p[l−1] in O(1).',
      bn: 'আগে থেকে p[i] = a[1] + … + a[i] বের করুন; তখন যেকোনো পরিসরের যোগফল a[l..r] হলো O(1)-এ p[r] − p[l−1]।',
    },
    cost: 'O(n) build, O(1) query',
    code: raw`vector<long long> p(n + 1, 0);
for (int i = 1; i <= n; i++) p[i] = p[i - 1] + a[i];
long long rangeSum = p[r] - p[l - 1];`,
  },

  // ── Strings ──────────────────────────────────────────
  {
    id: 'string-basics',
    group: 'strings',
    title: 'string',
    lesson: 'strings',
    summary: {
      en: 'Length, indexing, the first and last character, substrings, and adding text.',
      bn: 'দৈর্ঘ্য, ইনডেক্স, প্রথম ও শেষ অক্ষর, সাবস্ট্রিং, আর লেখা জোড়া।',
    },
    code: raw`string s = "codeforces";
s.size();            // 10
s[0]; s.back();      // 'c', 's'
s.substr(4, 6);      // "forces"
s += '!';            // append a char
s.find("for");       // 4, or string::npos if absent`,
  },
  {
    id: 'to-string',
    group: 'strings',
    title: 'to_string and stoll',
    lesson: 'strings',
    summary: {
      en: 'Turn numbers into text and back. Digit characters convert with c − \'0\'.',
      bn: 'সংখ্যাকে লেখায় আর লেখাকে সংখ্যায় বদলানো। অঙ্কের অক্ষর c − \'0\' দিয়ে বদলায়।',
    },
    code: raw`string t = to_string(2024);      // "2024"
long long v = stoll("123456789012");
int d = '7' - '0';                 // 7`,
  },
  {
    id: 'char-count',
    group: 'strings',
    title: 'Counting letters',
    summary: {
      en: 'Map a lowercase letter to 0..25 with c − \'a\' and count in an array of 26.',
      bn: 'c − \'a\' দিয়ে ছোট হাতের অক্ষরকে 0..25-এ নিয়ে ২৬ ঘরের অ্যারেতে গুনুন।',
    },
    code: raw`array<int, 26> cnt{};
for (char c : s) cnt[c - 'a']++;`,
  },

  // ── Containers ───────────────────────────────────────
  {
    id: 'vector',
    group: 'containers',
    title: 'vector',
    lesson: 'vectors',
    summary: {
      en: 'A growable array. Index in O(1), push_back at the end in amortised O(1).',
      bn: 'বড় হতে পারে এমন অ্যারে। O(1)-এ ইনডেক্স, শেষে push_back গড়ে O(1)।',
    },
    cost: 'O(1) index, O(1) push_back',
    code: raw`vector<int> a(n);            // n zeros
vector<int> b(n, -1);        // n copies of -1
a.push_back(5); a.pop_back();
vector<vector<int>> grid(r, vector<int>(c, 0));`,
  },
  {
    id: 'pair',
    group: 'containers',
    title: 'pair',
    lesson: 'sorting',
    summary: {
      en: 'Two values in one. Compared and sorted by first, then by second.',
      bn: 'একসঙ্গে দুটি মান। আগে first, তারপর second দিয়ে তুলনা ও সর্ট হয়।',
    },
    code: raw`vector<pair<int, int>> v;    // (value, index)
v.push_back({x, i});
sort(v.begin(), v.end());
auto [value, idx] = v[0];`,
  },
  {
    id: 'set',
    group: 'containers',
    title: 'set and multiset',
    lesson: 'set-map',
    summary: {
      en: 'Sorted unique values (multiset keeps duplicates). Insert, erase and find in O(log n).',
      bn: 'সাজানো আলাদা মান (multiset ডুপ্লিকেটও রাখে)। O(log n)-এ insert, erase আর find।',
    },
    cost: 'O(log n)',
    code: raw`set<int> s;
s.insert(5); s.erase(5);
s.count(7);                      // 0 or 1
*s.begin(); *s.rbegin();         // min, max
auto it = s.lower_bound(x);      // first >= x (check it != s.end())
multiset<int> ms; ms.erase(ms.find(x));   // remove one copy`,
  },
  {
    id: 'map',
    group: 'containers',
    title: 'map',
    lesson: 'set-map',
    summary: {
      en: 'Key → value, sorted by key. m[k]++ counts. Use m.count(k) to test without inserting.',
      bn: 'কী → মান, কী অনুযায়ী সাজানো। m[k]++ দিয়ে গণনা। ঢোকানো ছাড়া পরীক্ষা করতে m.count(k)।',
    },
    cost: 'O(log n)',
    code: raw`map<int, int> cnt;
for (int x : a) cnt[x]++;
for (auto& [value, c] : cnt) cout << value << " " << c << "\n";
if (cnt.count(7)) { /* 7 is present */ }`,
  },
  {
    id: 'priority-queue',
    group: 'containers',
    title: 'priority_queue',
    summary: {
      en: 'Always gives the largest element first. Add greater<> for smallest-first. Core of Dijkstra and many greedies.',
      bn: 'সবসময় সবচেয়ে বড় উপাদান আগে দেয়। ছোটটি আগে পেতে greater<> যোগ করুন। ডায়াকস্ট্রা আর অনেক গ্রিডির মূল।',
    },
    cost: 'O(log n) push/pop',
    code: raw`priority_queue<int> mx;                              // max-heap
priority_queue<int, vector<int>, greater<int>> mn;  // min-heap
mx.push(3); mx.push(8);
mx.top();   // 8
mx.pop();`,
  },
  {
    id: 'stack-queue',
    group: 'containers',
    title: 'stack, queue, deque',
    summary: {
      en: 'stack: last in, first out (brackets). queue: first in, first out (BFS). deque: add or remove at both ends.',
      bn: 'stack: শেষে ঢুকলে আগে বের (বন্ধনী)। queue: আগে ঢুকলে আগে বের (BFS)। deque: দুই প্রান্তেই যোগ বা বাদ।',
    },
    cost: 'O(1)',
    code: raw`stack<int> st; st.push(1); st.top(); st.pop();
queue<int> q;  q.push(1);  q.front(); q.pop();
deque<int> d;  d.push_front(1); d.push_back(2); d.pop_front();`,
  },

  // ── Algorithms ───────────────────────────────────────
  {
    id: 'sort',
    group: 'algorithms',
    title: 'sort',
    lesson: 'sorting',
    summary: {
      en: 'Sorts a range in O(n log n). Pass greater<>() or a lambda for another order.',
      bn: 'একটি পরিসর O(n log n)-এ সর্ট করে। অন্য ক্রমের জন্য greater<>() বা ল্যাম্বডা দিন।',
    },
    cost: 'O(n log n)',
    code: raw`sort(a.begin(), a.end());
sort(a.rbegin(), a.rend());                // descending
sort(v.begin(), v.end(), [](auto& x, auto& y) { return x.second < y.second; });`,
  },
  {
    id: 'lower-bound',
    group: 'algorithms',
    title: 'lower_bound and upper_bound',
    summary: {
      en: 'On a sorted range: lower_bound finds the first element ≥ x, upper_bound the first > x. Their difference counts copies of x.',
      bn: 'সাজানো পরিসরে: lower_bound প্রথম ≥ x উপাদান খোঁজে, upper_bound প্রথম > x। দুটির পার্থক্য x কতবার আছে তা গোনে।',
    },
    cost: 'O(log n)',
    code: raw`// a is sorted
int i = lower_bound(a.begin(), a.end(), x) - a.begin();
int copies = upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x);`,
  },
  {
    id: 'min-max',
    group: 'algorithms',
    title: 'min, max, min_element',
    summary: {
      en: 'min and max of two values or a list; *min_element and *max_element over a range.',
      bn: 'দুটি মান বা একটি তালিকার min আর max; একটি পরিসরের ওপর *min_element আর *max_element।',
    },
    code: raw`int m = max({a, b, c});
int lo = *min_element(v.begin(), v.end());
int pos = max_element(v.begin(), v.end()) - v.begin();`,
  },
  {
    id: 'accumulate',
    group: 'algorithms',
    title: 'accumulate',
    summary: {
      en: 'Sums a range. The starting value sets the type, so pass 0LL to sum in long long.',
      bn: 'একটি পরিসরের যোগফল দেয়। শুরুর মান টাইপ ঠিক করে, তাই long long-এ যোগ করতে 0LL দিন।',
    },
    code: raw`long long s = accumulate(a.begin(), a.end(), 0LL);`,
  },
  {
    id: 'reverse-unique',
    group: 'algorithms',
    title: 'reverse and unique',
    summary: {
      en: 'reverse flips a range. sort then unique + erase removes duplicates.',
      bn: 'reverse একটি পরিসর উল্টে দেয়। sort করে তারপর unique + erase দিয়ে ডুপ্লিকেট সরান।',
    },
    code: raw`reverse(s.begin(), s.end());
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end()), a.end());`,
  },
  {
    id: 'next-permutation',
    group: 'algorithms',
    title: 'next_permutation',
    summary: {
      en: 'Steps through every ordering of a sorted range. Good for brute force when n ≤ 10.',
      bn: 'একটি সাজানো পরিসরের প্রতিটি ক্রমের মধ্য দিয়ে যায়। n ≤ ১০ হলে ব্রুট ফোর্সে ভালো।',
    },
    cost: 'O(n · n!) total',
    code: raw`vector<int> p = {1, 2, 3};
do {
    // use p
} while (next_permutation(p.begin(), p.end()));`,
  },
  {
    id: 'count-find',
    group: 'algorithms',
    title: 'count and find',
    summary: {
      en: 'Linear search helpers: how many times x appears, and where it first appears.',
      bn: 'রৈখিক খোঁজের সহায়ক: x কতবার আছে, আর প্রথম কোথায় আছে।',
    },
    cost: 'O(n)',
    code: raw`int c = count(a.begin(), a.end(), x);
auto it = find(a.begin(), a.end(), x);
if (it != a.end()) { /* found */ }`,
  },

  // ── Modern C++ ───────────────────────────────────────
  {
    id: 'lambda',
    group: 'modern',
    title: 'Lambdas',
    lesson: 'sorting',
    summary: {
      en: 'A small function written in place. [&] lets it use the variables around it.',
      bn: 'জায়গাতেই লেখা ছোট একটি ফাংশন। [&] লিখলে চারপাশের ভেরিয়েবল ব্যবহার করা যায়।',
    },
    code: raw`auto isGood = [&](int x) { return x % k == 0; };
sort(v.begin(), v.end(), [](int a, int b) { return a > b; });`,
  },
  {
    id: 'ranges-any-of',
    group: 'modern',
    title: 'ranges::any_of / all_of',
    summary: {
      en: 'Ask “does any (or every) element satisfy this?” without writing the loop.',
      bn: 'লুপ না লিখেই জিজ্ঞেস করা “কোনো (বা প্রতিটি) উপাদান কি এই শর্ত মানে?”',
    },
    code: raw`bool hasNeg = ranges::any_of(a, [](int x) { return x < 0; });
bool allEven = ranges::all_of(a, [](int x) { return x % 2 == 0; });`,
  },
  {
    id: 'views-iota',
    group: 'modern',
    title: 'views::iota',
    summary: {
      en: 'A lazy range of consecutive numbers: views::iota(1, n) is 1, 2, …, n−1, with no vector created.',
      bn: 'পরপর সংখ্যার একটি অলস পরিসর: views::iota(1, n) মানে 1, 2, …, n−1, কোনো ভেক্টর তৈরি ছাড়াই।',
    },
    code: raw`for (int i : views::iota(0, n)) cout << i << " ";`,
  },
  {
    id: 'structured-bindings',
    group: 'modern',
    title: 'auto [a, b]',
    summary: {
      en: 'Unpack a pair or tuple into named variables.',
      bn: 'pair বা tuple-কে নাম দেওয়া ভেরিয়েবলে খুলে নেওয়া।',
    },
    code: raw`for (auto& [key, value] : m) cout << key << " " << value << "\n";`,
  },

  // ── Bits ─────────────────────────────────────────────
  {
    id: 'bitwise-and',
    group: 'bits',
    title: '& | ^ (bitwise)',
    summary: {
      en: 'Work on each bit. x & 1 is the lowest bit (odd test), x ^ y flips bits where y has 1s.',
      bn: 'প্রতিটি বিটের ওপর কাজ। x & 1 সবচেয়ে নিচের বিট (বিজোড় পরীক্ষা), x ^ y সেই বিটগুলো উল্টায় যেখানে y-তে 1।',
    },
    code: raw`bool odd = x & 1;
int both = a & b, either = a | b, diff = a ^ b;`,
  },
  {
    id: 'bit-shift',
    group: 'bits',
    title: 'Shifts and masks',
    summary: {
      en: '1 << k is 2ᵏ. Check bit k with (x >> k) & 1. Loop over all subsets of n items with masks 0 .. 2ⁿ−1.',
      bn: '1 << k হলো ২ᵏ। (x >> k) & 1 দিয়ে k-তম বিট দেখুন। ০ .. ২ⁿ−১ মাস্ক দিয়ে n-টি জিনিসের সব সাবসেটের ওপর লুপ চালান।',
    },
    code: raw`for (int mask = 0; mask < (1 << n); mask++) {
    for (int k = 0; k < n; k++) {
        if ((mask >> k) & 1) { /* item k is in this subset */ }
    }
}
long long big = 1LL << 40;   // use 1LL for shifts past 31`,
  },
  {
    id: 'popcount',
    group: 'bits',
    title: '__builtin_popcount',
    summary: {
      en: 'Counts the 1 bits. Use the ll version for long long. __builtin_ctz counts trailing zeros.',
      bn: '1 বিট গোনে। long long-এর জন্য ll সংস্করণ। __builtin_ctz শেষের শূন্যগুলো গোনে।',
    },
    code: raw`int ones = __builtin_popcount(13);        // 3
int onesLL = __builtin_popcountll(x);
int tz = __builtin_ctz(12);               // 2`,
  },
];

export const TOOLKIT_BY_ID: Record<string, ToolkitEntry> = Object.fromEntries(TOOLKIT.map((e) => [e.id, e]));
