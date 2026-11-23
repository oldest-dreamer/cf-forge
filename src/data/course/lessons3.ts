import type { Lesson } from './types';

const raw = String.raw;

export const L9: Lesson = {
  id: 'sorting',
  title: { en: 'Sorting, pairs and lambdas', bn: 'সর্টিং, pair আর ল্যাম্বডা' },
  summary: {
    en: 'Put data in order with sort, keep two values together with pair, and sort by your own rule.',
    bn: 'sort দিয়ে ডেটা সাজানো, pair দিয়ে দুটি মান একসঙ্গে রাখা, আর নিজের নিয়মে সর্ট করা।',
  },
  minutes: 20,
  toolkit: ['sort', 'pair', 'lambda'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'sort(a.begin(), a.end()) puts a vector in increasing order in O(n log n). That is fast enough for n up to a few million, and it is the first tool to try in a greedy problem.',
        bn: 'sort(a.begin(), a.end()) একটি ভেক্টরকে O(n log n)-এ ছোট থেকে বড় ক্রমে সাজায়। কয়েক মিলিয়ন n পর্যন্ত এটি যথেষ্ট দ্রুত, আর গ্রিডি প্রবলেমে প্রথমেই চেষ্টা করার টুল।',
      },
    },
    {
      kind: 'code',
      input: '6\n5 1 4 1 5 9\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;

    sort(a.begin(), a.end());
    for (int x : a) cout << x << " ";
    cout << "\n";

    sort(a.begin(), a.end(), greater<int>());   // largest first
    for (int x : a) cout << x << " ";
    cout << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'pair', bn: 'pair' } },
    {
      kind: 'p',
      text: {
        en: 'pair<int, string> keeps two values together, reached with .first and .second. Pairs sort by first, and by second when the firsts are equal.',
        bn: 'pair<int, string> দুটি মান একসঙ্গে রাখে, .first আর .second দিয়ে পাওয়া যায়। pair আগে first দিয়ে সর্ট হয়, first সমান হলে second দিয়ে।',
      },
    },
    { kind: 'h', text: { en: 'Your own order with a lambda', bn: 'ল্যাম্বডা দিয়ে নিজের ক্রম' } },
    {
      kind: 'p',
      text: {
        en: 'A lambda is a small function written in place: [](int a, int b) { return a > b; }. Pass it to sort to say “a should come before b when this is true”.',
        bn: 'ল্যাম্বডা হলো জায়গাতেই লেখা ছোট একটি ফাংশন: [](int a, int b) { return a > b; }। sort-কে এটি দিলে বোঝায় “এটি সত্য হলে a, b-এর আগে আসবে”।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<pair<string, int>> people = {{"Rafi", 1450}, {"Mim", 1610}, {"Tanha", 1450}, {"Arif", 1200}};

    // higher rating first; equal ratings by name A to Z
    sort(people.begin(), people.end(), [](const auto& a, const auto& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });

    for (auto& [name, rating] : people) cout << name << " " << rating << "\n";
    return 0;
}
`,
    },
    {
      kind: 'warn',
      text: {
        en: 'A comparator must say false for equal elements. Writing >= instead of > can crash sort.',
        bn: 'সমান উপাদানের জন্য কম্পেয়ারেটরকে false দিতে হবে। > এর বদলে >= লিখলে sort ক্র্যাশ করতে পারে।',
      },
    },
  ],
  mistakes: [
    { en: 'Using <= or >= in a comparator.', bn: 'কম্পেয়ারেটরে <= বা >= ব্যবহার করা।' },
    { en: 'Sorting when the original positions matter, then printing the wrong indices. Sort pairs of (value, index) instead.', bn: 'মূল অবস্থান জরুরি হলেও সর্ট করে ভুল ইনডেক্স প্রিন্ট করা। বরং (মান, ইনডেক্স) pair সর্ট করুন।' },
    { en: 'Re-sorting inside a loop when sorting once would do.', bn: 'একবার সর্ট করলেই যেখানে চলে, সেখানে লুপের ভেতরে বারবার সর্ট করা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n (1 ≤ n ≤ 2·10⁵) and n integers. Print them from largest to smallest, separated by spaces.',
      bn: 'n (১ ≤ n ≤ ২·১০⁵) আর n-টি পূর্ণসংখ্যা পড়ুন। বড় থেকে ছোট ক্রমে স্পেস দিয়ে প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;

    return 0;
}
`,
    tests: [
      { input: '6\n5 1 4 1 5 9', output: '9 5 5 4 1 1' },
      { input: '3\n-1 -3 -2', output: '-1 -2 -3' },
      { input: '1\n7', output: '7' },
    ],
    hint: { en: 'sort with greater<long long>(), or sort normally and print backwards.', bn: 'greater<long long>() দিয়ে সর্ট করুন, অথবা সাধারণভাবে সর্ট করে উল্টো দিক থেকে প্রিন্ট করুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end(), greater<long long>());
    for (int i = 0; i < n; i++) cout << a[i] << " \n"[i == n - 1];
    return 0;
}
`,
  },
};

export const L10: Lesson = {
  id: 'set-map',
  title: { en: 'set and map', bn: 'set আর map' },
  summary: {
    en: 'Keep unique values in order with set, and count things by key with map.',
    bn: 'set দিয়ে আলাদা মানগুলো ক্রমানুসারে রাখা, আর map দিয়ে কী অনুযায়ী গণনা করা।',
  },
  minutes: 20,
  toolkit: ['set', 'map'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A set keeps each value once, always sorted. Inserting, erasing and checking whether a value is present all take O(log n).',
        bn: 'set প্রতিটি মান একবারই রাখে, সবসময় সাজানো অবস্থায়। ঢোকানো, মোছা আর কোনো মান আছে কি না দেখা, সবই O(log n)।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    set<int> s = {5, 1, 4, 1, 5, 9};
    cout << s.size() << "\n";                  // 4 distinct values
    for (int x : s) cout << x << " ";          // 1 4 5 9
    cout << "\n";
    cout << s.count(4) << " " << s.count(7) << "\n";   // 1 0
    s.insert(7);
    s.erase(1);
    cout << *s.begin() << " " << *s.rbegin() << "\n";  // smallest, largest
    auto it = s.lower_bound(6);                // first value >= 6
    cout << *it << "\n";                       // 7
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'map: a dictionary', bn: 'map: একটি অভিধান' } },
    {
      kind: 'p',
      text: {
        en: 'map<K, V> stores a value for each key, sorted by key. m[key] creates the key with value 0 the first time you touch it, which makes counting one line: m[x]++.',
        bn: 'map<K, V> প্রতিটি কী-এর জন্য একটি মান রাখে, কী অনুযায়ী সাজানো। প্রথমবার m[key] ছুঁলেই মান 0 দিয়ে কী তৈরি হয়, তাই গণনা এক লাইনের কাজ: m[x]++।',
      },
    },
    {
      kind: 'code',
      input: 'apple banana apple cherry banana apple\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    map<string, int> freq;
    string w;
    while (cin >> w) freq[w]++;            // read until input ends
    for (auto& [word, c] : freq) cout << word << " " << c << "\n";
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'unordered_map and unordered_set are faster on average but have no order, and special tests can make them slow. In rated rounds, map and set are the safe choice.',
        bn: 'unordered_map আর unordered_set গড়ে দ্রুত, কিন্তু কোনো ক্রম নেই, আর বিশেষ টেস্টে ধীর হয়ে যেতে পারে। রেটেড রাউন্ডে map আর set নিরাপদ।',
      },
    },
  ],
  mistakes: [
    { en: 'Checking if (m[x]) to test presence: it inserts x. Use m.count(x) or m.find(x).', bn: 'উপস্থিতি দেখতে if (m[x]) লেখা: এতে x ঢুকে যায়। m.count(x) বা m.find(x) ব্যবহার করুন।' },
    { en: 'Using set when duplicates matter; use multiset instead.', bn: 'ডুপ্লিকেট জরুরি হলেও set ব্যবহার করা; বরং multiset নিন।' },
    { en: 'Dereferencing lower_bound without checking it is not end().', bn: 'end() নয় তা না দেখেই lower_bound-এর মান পড়া।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n (1 ≤ n ≤ 2·10⁵) and n integers. For each distinct value, from smallest to largest, print the value and how many times it appears, one pair per line.',
      bn: 'n (১ ≤ n ≤ ২·১০⁵) আর n-টি পূর্ণসংখ্যা পড়ুন। প্রতিটি আলাদা মানের জন্য, ছোট থেকে বড় ক্রমে, মানটি আর সেটি কতবার এসেছে তা প্রতি লাইনে একটি করে জোড়া হিসেবে প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    return 0;
}
`,
    tests: [
      { input: '6\n3 1 3 2 3 1', output: '1 2\n2 1\n3 3' },
      { input: '1\n1000000000', output: '1000000000 1' },
      { input: '4\n-2 -2 -2 -2', output: '-2 4' },
    ],
    hint: { en: 'map<long long, int> cnt; cnt[x]++ for each x, then loop over the map.', bn: 'map<long long, int> cnt; প্রতিটি x-এর জন্য cnt[x]++, তারপর map-এর ওপর লুপ চালান।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<long long, int> cnt;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        cnt[x]++;
    }
    for (auto& [value, c] : cnt) cout << value << " " << c << "\n";
    return 0;
}
`,
  },
};

export const L11: Lesson = {
  id: 'complexity',
  title: { en: 'Will it run in time?', bn: 'সময়ের মধ্যে চলবে তো?' },
  summary: {
    en: 'Estimate the work your solution does from the limits, and use prefix sums and fast I/O to stay fast.',
    bn: 'সীমা দেখে আপনার সমাধানের কাজের পরিমাণ আন্দাজ করা, আর দ্রুত থাকতে প্রিফিক্স সাম ও দ্রুত I/O ব্যবহার করা।',
  },
  minutes: 25,
  toolkit: ['io-fast', 'prefix-sum'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A Codeforces judge does roughly 10⁸ simple operations per second. Before you code, plug the largest n into your idea’s complexity. If the result is under about 10⁸ per second of time limit, it will pass.',
        bn: 'কোডফোর্সেসের জাজ প্রতি সেকেন্ডে মোটামুটি ১০⁸টি সাধারণ অপারেশন করে। কোড লেখার আগে সবচেয়ে বড় n আপনার আইডিয়ার কমপ্লেক্সিটিতে বসান। ফল প্রতি সেকেন্ড টাইম লিমিটে প্রায় ১০⁸-এর কম হলে পাস করবে।',
      },
    },
    {
      kind: 'list',
      items: [
        { en: 'n ≤ 10: O(n!) is fine, try every order.', bn: 'n ≤ ১০: O(n!) চলবে, সব ক্রম চেষ্টা করুন।' },
        { en: 'n ≤ 20: O(2ⁿ), try every subset.', bn: 'n ≤ ২০: O(২ⁿ), সব সাবসেট চেষ্টা করুন।' },
        { en: 'n ≤ 500: O(n³).', bn: 'n ≤ ৫০০: O(n³)।' },
        { en: 'n ≤ 5000: O(n²).', bn: 'n ≤ ৫০০০: O(n²)।' },
        { en: 'n ≤ 2·10⁵ or 10⁶: O(n log n) or O(n). This is the usual case.', bn: 'n ≤ ২·১০⁵ বা ১০⁶: O(n log n) বা O(n)। সাধারণত এটিই হয়।' },
        { en: 'n ≤ 10¹⁸: O(log n) or O(1), a formula or binary search.', bn: 'n ≤ ১০¹⁸: O(log n) বা O(1), একটি সূত্র বা বাইনারি সার্চ।' },
      ],
    },
    { kind: 'h', text: { en: 'Prefix sums', bn: 'প্রিফিক্স সাম' } },
    {
      kind: 'p',
      text: {
        en: 'Summing a range for each of q queries costs O(n·q), too slow for 2·10⁵ each. Instead build p[i] = a[1] + … + a[i] once. Then the sum of a[l..r] is p[r] − p[l−1], one subtraction per query.',
        bn: 'q-টি কুয়েরির প্রতিটিতে একটি পরিসরের যোগফল বের করলে খরচ O(n·q), দুটিই ২·১০⁵ হলে অনেক ধীর। বরং একবার p[i] = a[1] + … + a[i] বানান। তখন a[l..r]-এর যোগফল p[r] − p[l−1], প্রতি কুয়েরিতে একটি বিয়োগ।',
      },
    },
    {
      kind: 'code',
      input: '5 3\n3 1 4 1 5\n1 3\n2 5\n4 4\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        p[i] = p[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << "\n";
    }
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Fast input and output', bn: 'দ্রুত ইনপুট ও আউটপুট' } },
    {
      kind: 'p',
      text: {
        en: 'With 10⁵ or more numbers, start main with ios::sync_with_stdio(false); cin.tie(nullptr);. It makes cin and cout several times faster. After that, do not mix cin/cout with scanf/printf.',
        bn: '১০⁵ বা বেশি সংখ্যা থাকলে main শুরু করুন ios::sync_with_stdio(false); cin.tie(nullptr); দিয়ে। এতে cin আর cout কয়েক গুণ দ্রুত হয়। এরপর cin/cout-এর সঙ্গে scanf/printf মেশাবেন না।',
      },
    },
  ],
  mistakes: [
    { en: 'Reaching for a nested loop when n is 2·10⁵.', bn: 'n ২·১০⁵ হলেও নেস্টেড লুপ লেখা।' },
    { en: 'Prefix sums in int when the total can pass 2·10⁹.', bn: 'যোগফল ২·১০⁹ ছাড়াতে পারলেও প্রিফিক্স সাম int-এ রাখা।' },
    { en: 'Using endl in a loop that prints 10⁵ lines.', bn: '১০⁵ লাইন প্রিন্ট করা লুপে endl ব্যবহার করা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n and q (1 ≤ n, q ≤ 2·10⁵), then n integers (|aᵢ| ≤ 10⁹), then q lines l r (1 ≤ l ≤ r ≤ n). For each query print a[l] + … + a[r]. The starter is too slow for big inputs; make it fast.',
      bn: 'n আর q (১ ≤ n, q ≤ ২·১০⁵) পড়ুন, তারপর n-টি পূর্ণসংখ্যা (|aᵢ| ≤ ১০⁹), তারপর q-টি লাইনে l r (১ ≤ l ≤ r ≤ n)। প্রতিটি কুয়েরিতে a[l] + … + a[r] প্রিন্ট করুন। শুরুর কোড বড় ইনপুটে খুব ধীর; একে দ্রুত করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    while (q--) {
        int l, r;
        cin >> l >> r;
        long long s = 0;
        for (int i = l; i <= r; i++) s += a[i];   // O(n) per query
        cout << s << "\n";
    }
    return 0;
}
`,
    tests: [
      { input: '5 3\n3 1 4 1 5\n1 3\n2 5\n4 4', output: '8\n11\n1' },
      { input: '3 2\n1000000000 1000000000 1000000000\n1 3\n2 2', output: '3000000000\n1000000000' },
      { input: '4 1\n-5 2 -1 7\n1 4', output: '3' },
    ],
    hint: { en: 'Build p[i] = p[i−1] + a[i] once; answer each query with p[r] − p[l−1].', bn: 'একবার p[i] = p[i−1] + a[i] বানান; প্রতিটি কুয়েরির উত্তর p[r] − p[l−1]।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    cin >> n >> q;
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        p[i] = p[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << "\n";
    }
    return 0;
}
`,
  },
};

export const L12: Lesson = {
  id: 'math-helpers',
  title: { en: 'Math every round needs', bn: 'প্রতিটি রাউন্ডে দরকারি গণিত' },
  summary: {
    en: 'Ceiling division, gcd and lcm, answers modulo 10⁹+7, and fast exponentiation.',
    bn: 'সিলিং ভাগ, গসাগু ও লসাগু, ১০⁹+৭ মডুলোতে উত্তর, আর দ্রুত ঘাত নির্ণয়।',
  },
  minutes: 25,
  toolkit: ['ceil-div', 'gcd-lcm', 'mod-arith', 'mod-pow'],
  blocks: [
    { kind: 'h', text: { en: 'Rounding up', bn: 'ওপরের দিকে রাউন্ড' } },
    {
      kind: 'p',
      text: {
        en: 'For positive a and b, the smallest k with k·b ≥ a is (a + b − 1) / b. It avoids floating point entirely.',
        bn: 'ধনাত্মক a আর b-এর জন্য k·b ≥ a হয় এমন সবচেয়ে ছোট k হলো (a + b − 1) / b। এতে দশমিক একেবারেই লাগে না।',
      },
    },
    { kind: 'h', text: { en: 'gcd and lcm', bn: 'গসাগু ও লসাগু' } },
    {
      kind: 'p',
      text: {
        en: 'C++17 has gcd(a, b) and lcm(a, b) built in. Compute lcm as a / gcd(a, b) * b so the middle value never overflows.',
        bn: 'C++17-এ gcd(a, b) আর lcm(a, b) আগে থেকেই আছে। lcm বের করুন a / gcd(a, b) * b হিসেবে, যাতে মাঝের মান কখনো ওভারফ্লো না করে।',
      },
    },
    { kind: 'h', text: { en: 'Answers modulo 10⁹+7', bn: '১০⁹+৭ মডুলোতে উত্তর' } },
    {
      kind: 'p',
      text: {
        en: 'When an answer is astronomically large, problems ask for it modulo M = 10⁹+7. Take % M after every + and *. Two numbers below M multiply to under 10¹⁸, which fits in long long. For subtraction, add M before taking %, so the result is never negative.',
        bn: 'উত্তর অকল্পনীয় বড় হলে প্রবলেম M = ১০⁹+৭ মডুলোতে উত্তর চায়। প্রতিটি + আর *-এর পর % M নিন। M-এর চেয়ে ছোট দুটি সংখ্যার গুণফল ১০¹⁸-এর নিচে থাকে, যা long long-এ আঁটে। বিয়োগে % নেওয়ার আগে M যোগ করুন, যাতে ফল কখনো ঋণাত্মক না হয়।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007;

int main() {
    long long a = 7, b = 1'000'000'000;
    cout << (a + b - 1) / b << "\n";              // ceil(7 / 1e9) = 1
    cout << gcd(84LL, 36LL) << " " << lcm(4LL, 6LL) << "\n";

    long long fact = 1;
    for (int i = 1; i <= 100; i++) fact = fact * i % MOD;
    cout << "100! mod 1e9+7 = " << fact << "\n";

    long long x = 3, y = 10;
    cout << ((x - y) % MOD + MOD) % MOD << "\n";  // safe subtraction
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Fast exponentiation', bn: 'দ্রুত ঘাত নির্ণয়' } },
    {
      kind: 'p',
      text: {
        en: 'To compute aᵇ mod M with b up to 10¹⁸, square the base and halve the exponent each step: O(log b) multiplications instead of b.',
        bn: 'b ১০¹⁸ পর্যন্ত হলে aᵇ mod M বের করতে প্রতি ধাপে ভিত্তি বর্গ করুন আর ঘাত অর্ধেক করুন: b বার নয়, O(log b) বার গুণ।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long power(long long a, long long b, long long m) {
    long long result = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) result = result * a % m;   // this bit of b is set
        a = a * a % m;
        b >>= 1;
    }
    return result;
}

int main() {
    cout << power(2, 10, 1'000'000'007) << "\n";                    // 1024
    cout << power(3, 1'000'000'000'000'000'000LL, 1'000'000'007) << "\n";
    return 0;
}
`,
    },
  ],
  mistakes: [
    { en: 'Taking % M only at the very end, after the value has already overflowed.', bn: 'মান ওভারফ্লো হয়ে যাওয়ার পর একেবারে শেষে % M নেওয়া।' },
    { en: 'Using pow() from <cmath> for big integers: it works in double and loses precision.', bn: 'বড় পূর্ণসংখ্যার জন্য <cmath>-এর pow() ব্যবহার করা: এটি double-এ কাজ করে আর নির্ভুলতা হারায়।' },
    { en: 'A negative result after subtraction under a modulus.', bn: 'মডুলোর অধীনে বিয়োগের পর ঋণাত্মক ফল।' },
  ],
  exercise: {
    prompt: {
      en: 'Read t, then t lines with a and b (0 ≤ a ≤ 10⁹, 0 ≤ b ≤ 10¹⁸). Print aᵇ mod 10⁹+7 for each. (0⁰ counts as 1.)',
      bn: 't পড়ুন, তারপর t-টি লাইনে a আর b (০ ≤ a ≤ ১০⁹, ০ ≤ b ≤ ১০¹⁸)। প্রতিটির aᵇ mod ১০⁹+৭ প্রিন্ট করুন। (০⁰ ধরা হবে ১।)',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007;

long long power(long long a, long long b) {
    // your code here
    return 1;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << power(a, b) << "\n";
    }
    return 0;
}
`,
    tests: [
      { input: '3\n2 10\n5 0\n0 5', output: '1024\n1\n0' },
      { input: '1\n2 1000000006', output: '1' },
      { input: '1\n1000000000 1000000000000000000', output: '259616729' },
      { input: '1\n0 0', output: '1' },
    ],
    hint: {
      en: 'Repeated squaring: while b > 0, multiply the result by a when b is odd, square a, halve b. Reduce a modulo M first.',
      bn: 'বারবার বর্গ: b > 0 থাকা পর্যন্ত b বিজোড় হলে ফলকে a দিয়ে গুণ করুন, a বর্গ করুন, b অর্ধেক করুন। আগে a-কে M মডুলো করে নিন।',
    },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1'000'000'007;

long long power(long long a, long long b) {
    long long result = 1;
    a %= MOD;
    while (b > 0) {
        if (b & 1) result = result * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return result;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << power(a, b) << "\n";
    }
    return 0;
}
`,
  },
};
