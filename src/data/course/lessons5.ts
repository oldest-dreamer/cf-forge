import type { Lesson } from './types';

const raw = String.raw;

export const L18: Lesson = {
  id: 'recursion',
  title: { en: 'Recursion and memoization', bn: 'রিকার্শন ও মেমোইজেশন' },
  summary: {
    en: 'A function that calls itself, the base case that stops it, and caching answers so work is never repeated.',
    bn: 'নিজেকে ডাকা ফাংশন, তাকে থামানো বেস কেস, আর উত্তর জমিয়ে রাখা যাতে কাজ দ্বিতীয়বার না হয়।',
  },
  minutes: 22,
  toolkit: ['recursion', 'memo'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'Recursion solves a problem by solving a smaller copy of the same problem. Every recursive function has two parts: a base case, the smallest input whose answer you know directly, and a recursive step that reduces the input and calls the function again. Without a base case the calls never stop and the program crashes with a stack overflow.',
        bn: 'রিকার্শন একই সমস্যার ছোট একটি রূপ সমাধান করে মূল সমস্যা সমাধান করে। প্রতিটি রিকার্সিভ ফাংশনের দুটি অংশ: বেস কেস, অর্থাৎ সবচেয়ে ছোট ইনপুট যার উত্তর সরাসরি জানা, আর রিকার্সিভ ধাপ, যা ইনপুট ছোট করে ফাংশনকে আবার ডাকে। বেস কেস না থাকলে ডাক কখনো থামে না আর স্ট্যাক ওভারফ্লো হয়ে প্রোগ্রাম ক্র্যাশ করে।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long fact(int n) {
    if (n <= 1) return 1;            // base case
    return n * fact(n - 1);          // smaller problem
}

long long gcdRec(long long a, long long b) {
    if (b == 0) return a;            // base case
    return gcdRec(b, a % b);
}

int digitSum(long long x) {
    if (x == 0) return 0;
    return x % 10 + digitSum(x / 10);
}

int main() {
    cout << fact(10) << "\n";        // 3628800
    cout << gcdRec(84, 36) << "\n";  // 12
    cout << digitSum(98765) << "\n"; // 35
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'When recursion repeats itself: fibonacci', bn: 'যখন রিকার্শন নিজেকে পুনরাবৃত্তি করে: ফিবোনাচ্চি' } },
    {
      kind: 'p',
      text: {
        en: 'fib(n) = fib(n-1) + fib(n-2) is easy to write, but the plain version recomputes the same values again and again: fib(40) makes over 300 million calls. Memoization stores each answer the first time it is computed. The second time you just look it up, which turns exponential work into n steps.',
        bn: 'fib(n) = fib(n-1) + fib(n-2) লেখা সহজ, কিন্তু সরল রূপটি একই মান বারবার হিসাব করে: fib(40)-এ ৩০ কোটির বেশি ডাক হয়। মেমোইজেশন প্রতিটি উত্তর প্রথমবার হিসাব হলে জমিয়ে রাখে। দ্বিতীয়বার শুধু খুঁজে নেওয়া হয়, ফলে ঘাতীয় কাজ n ধাপে নেমে আসে।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long memo[100];
bool seen[100];

long long fib(int n) {
    if (n <= 1) return n;
    if (seen[n]) return memo[n];     // already computed: reuse
    seen[n] = true;
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    cout << fib(10) << "\n";         // 55
    cout << fib(90) << "\n";         // instant, even though plain recursion would never finish
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'This idea, answer each sub-problem once and store it, is exactly top-down dynamic programming. Learn to see the repeated sub-problems and the rest of DP follows.',
        bn: 'এই ধারণা, প্রতিটি উপ-সমস্যার উত্তর একবার বের করে জমিয়ে রাখা, হুবহু টপ-ডাউন ডায়নামিক প্রোগ্রামিং। পুনরাবৃত্ত উপ-সমস্যা চিনতে শিখলে DP-র বাকিটা সহজ হয়ে যায়।',
      },
    },
    {
      kind: 'warn',
      text: {
        en: 'Depth matters. Recursion deeper than about 10^5 levels can overflow the stack on some judges. For long chains use a loop or an explicit stack.',
        bn: 'গভীরতা গুরুত্বপূর্ণ। প্রায় 10^5 স্তরের বেশি রিকার্শন কিছু জাজে স্ট্যাক ওভারফ্লো করতে পারে। লম্বা চেইনে লুপ বা নিজের স্ট্যাক ব্যবহার করুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Forgetting the base case, or reaching a case it does not cover (for example n = 0 when it only handles n = 1).', bn: 'বেস কেস ভুলে যাওয়া, অথবা এমন কেসে পৌঁছানো যা বেস কেস ধরে না (যেমন শুধু n = 1 ধরে, n = 0 নয়)।' },
    { en: 'A recursive call that does not make the input smaller, so it never ends.', bn: 'রিকার্সিভ ডাকে ইনপুট ছোট না হওয়া, ফলে তা কখনো শেষ হয় না।' },
    { en: 'Using plain recursive fibonacci for n above 40.', bn: '৪০-এর বেশি n-এর জন্য সরল রিকার্সিভ ফিবোনাচ্চি ব্যবহার।' },
    { en: 'Using the memo array with values that can legitimately be 0 or -1 as the "not computed" mark without a separate seen array.', bn: 'যে মান বৈধভাবেই 0 বা -1 হতে পারে, আলাদা seen অ্যারে ছাড়া সেটিকেই "হিসাব হয়নি" চিহ্ন করা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n (0 <= n <= 90). Print the n-th Fibonacci number, where fib(0) = 0 and fib(1) = 1, using recursion with memoization.',
      bn: 'n পড়ুন (0 <= n <= 90)। মেমোইজেশনসহ রিকার্শন দিয়ে n-তম ফিবোনাচ্চি সংখ্যা প্রিন্ট করুন, যেখানে fib(0) = 0 আর fib(1) = 1।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

long long memo[100];
bool seen[100];

long long fib(int n) {
    // base case, memo lookup, recursive step
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << "\n";
    return 0;
}
`,
    tests: [
      { input: '10', output: '55' },
      { input: '0', output: '0' },
      { input: '1', output: '1' },
      { input: '90', output: '2880067194370816120' },
    ],
    hint: { en: 'Return n when n <= 1. Otherwise check seen[n], and store memo[n] = fib(n-1) + fib(n-2) before returning it.', bn: 'n <= 1 হলে n ফেরত দিন। নইলে seen[n] দেখুন, আর ফেরত দেওয়ার আগে memo[n] = fib(n-1) + fib(n-2) রাখুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

long long memo[100];
bool seen[100];

long long fib(int n) {
    if (n <= 1) return n;
    if (seen[n]) return memo[n];
    seen[n] = true;
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << "\n";
    return 0;
}
`,
  },
};

export const L19: Lesson = {
  id: 'stl-containers',
  title: { en: 'STL containers: stack, queue, deque, heap, multiset, unordered_map', bn: 'STL কনটেইনার: stack, queue, deque, heap, multiset, unordered_map' },
  summary: {
    en: 'The ready-made data structures, what each is good at, and a quick guide for choosing the right one.',
    bn: 'তৈরি ডেটা স্ট্রাকচারগুলো, প্রতিটির কোন কাজে সুবিধা, আর সঠিকটি বাছার একটি সংক্ষিপ্ত গাইড।',
  },
  minutes: 28,
  toolkit: ['stack-queue', 'deque', 'priority-queue', 'multiset', 'unordered-map', 'bitset'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'STL stands for Standard Template Library. It gives you data structures that are already written, tested and fast. The skill is choosing the right one. Ask three questions: do I need order? do I need duplicates? which end do I add to and take from?',
        bn: 'STL মানে Standard Template Library। এটি আগে থেকে লেখা, পরীক্ষিত ও দ্রুত ডেটা স্ট্রাকচার দেয়। আসল দক্ষতা সঠিকটি বাছা। তিনটি প্রশ্ন করুন: ক্রম লাগবে কি? ডুপ্লিকেট লাগবে কি? কোন প্রান্তে ঢোকাব আর কোন প্রান্ত থেকে নেব?',
      },
    },
    {
      kind: 'list',
      items: [
        { en: 'vector: indexed list, fast at the back. The default choice.', bn: 'vector: ইনডেক্সসহ তালিকা, পেছনে দ্রুত। ডিফল্ট পছন্দ।' },
        { en: 'stack: last in, first out. Undo history, matching brackets.', bn: 'stack: শেষে ঢোকা, আগে বেরোনো। আনডু ইতিহাস, বন্ধনী মেলানো।' },
        { en: 'queue: first in, first out. Waiting lines, BFS.', bn: 'queue: আগে ঢোকা, আগে বেরোনো। লাইন, BFS।' },
        { en: 'deque: add and remove at both ends. Sliding windows.', bn: 'deque: দুই প্রান্তেই ঢোকানো ও সরানো। স্লাইডিং উইন্ডো।' },
        { en: 'priority_queue: always gives the largest element first (a heap).', bn: 'priority_queue: সবসময় সবচেয়ে বড় উপাদান আগে দেয় (হিপ)।' },
        { en: 'set / multiset: sorted; set has no duplicates, multiset keeps them.', bn: 'set / multiset: সাজানো; set-এ ডুপ্লিকেট নেই, multiset-এ আছে।' },
        { en: 'map: sorted key to value. unordered_map: same idea, no order, usually faster.', bn: 'map: সাজানো কী থেকে মান। unordered_map: একই ধারণা, ক্রম নেই, সাধারণত দ্রুত।' },
      ],
    },
    {
      kind: 'code',
      caption: { en: 'One tiny demo of each. Read the output against the code.', bn: 'প্রতিটির একটি ছোট ডেমো। কোডের সঙ্গে আউটপুট মিলিয়ে পড়ুন।' },
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    stack<int> st;
    st.push(1); st.push(2); st.push(3);
    cout << "stack top " << st.top() << "\n";          // 3, the last one in
    st.pop();
    cout << "stack top after pop " << st.top() << "\n"; // 2

    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << "queue front " << q.front() << "\n";        // 1, the first one in
    q.pop();
    cout << "queue size " << q.size() << "\n";          // 2

    deque<int> dq;
    dq.push_back(2); dq.push_front(1); dq.push_back(3);
    cout << "deque " << dq.front() << " " << dq.back() << "\n";  // 1 3

    priority_queue<int> maxHeap;
    for (int x : {5, 1, 9, 3}) maxHeap.push(x);
    cout << "max heap top " << maxHeap.top() << "\n";    // 9

    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : {5, 1, 9, 3}) minHeap.push(x);
    cout << "min heap top " << minHeap.top() << "\n";    // 1

    multiset<int> ms = {4, 4, 7};
    ms.erase(ms.find(4));                                 // removes ONE 4
    cout << "multiset size " << ms.size() << ", count of 4 = " << ms.count(4) << "\n";

    unordered_map<string, int> um;
    um["apple"]++; um["apple"]++; um["pear"]++;
    cout << "apple " << um["apple"] << ", has kiwi? " << um.count("kiwi") << "\n";

    bitset<8> b("00001010");
    cout << "bits set " << b.count() << ", bit 1 is " << b[1] << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Costs at a glance', bn: 'খরচ এক নজরে' } },
    {
      kind: 'list',
      items: [
        { en: 'stack, queue, deque push/pop at the ends: O(1). priority_queue push/pop: O(log n), top: O(1).', bn: 'stack, queue, deque-এর প্রান্তে push/pop: O(1)। priority_queue push/pop: O(log n), top: O(1)।' },
        { en: 'set, multiset, map insert/erase/find: O(log n), kept sorted.', bn: 'set, multiset, map-এর insert/erase/find: O(log n), সাজানো থাকে।' },
        { en: 'unordered_map insert/find: O(1) on average, but a crafted input can make it slow; on Codeforces prefer map or a custom hash if hacks are possible.', bn: 'unordered_map-এর insert/find: গড়ে O(1), কিন্তু বিশেষ ইনপুটে ধীর করা যায়; কোডফোর্সেসে হ্যাকের সম্ভাবনা থাকলে map বা নিজস্ব হ্যাশ ব্যবহার করুন।' },
      ],
    },
    {
      kind: 'warn',
      text: {
        en: 'top(), front() and pop() on an empty container are undefined behaviour. Check empty() first.',
        bn: 'খালি কনটেইনারে top(), front() ও pop() অনির্ধারিত আচরণ। আগে empty() দেখে নিন।',
      },
    },
  ],
  mistakes: [
    { en: 'Calling ms.erase(4) on a multiset: it removes every 4. Use ms.erase(ms.find(4)) to remove one.', bn: 'multiset-এ ms.erase(4) ডাকা: এতে সব 4 মুছে যায়। একটি মুছতে ms.erase(ms.find(4)) ব্যবহার করুন।' },
    { en: 'Expecting priority_queue to be a min-heap. By default the largest comes out first.', bn: 'priority_queue min-heap হবে আশা করা। ডিফল্টে সবচেয়ে বড়টি আগে বেরোয়।' },
    { en: 'Reading map[key] to test presence: it creates the key with value 0. Use count(key) or find(key).', bn: 'আছে কি না দেখতে map[key] পড়া: এতে কী তৈরি হয়ে মান 0 হয়ে যায়। count(key) বা find(key) ব্যবহার করুন।' },
    { en: 'Using the wrong structure: a vector with erase from the front in a loop is O(n^2); use a queue or deque.', bn: 'ভুল স্ট্রাকচার বাছা: লুপে সামনে থেকে vector erase O(n^2); queue বা deque ব্যবহার করুন।' },
  ],
  exercise: {
    prompt: {
      en: 'Read a string made only of the characters ( ) [ ]. Print YES if the brackets are correctly matched and nested, otherwise NO. Use a stack.',
      bn: 'শুধু ( ) [ ] অক্ষর দিয়ে গড়া একটি স্ট্রিং পড়ুন। বন্ধনীগুলো ঠিকভাবে মেলানো ও নেস্ট করা থাকলে YES, নইলে NO প্রিন্ট করুন। stack ব্যবহার করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    // for each char: push an opening bracket; for a closing one, the top must be its partner

    cout << (ok && st.empty() ? "YES" : "NO") << "\n";
    return 0;
}
`,
    tests: [
      { input: '([])', output: 'YES' },
      { input: '([)]', output: 'NO' },
      { input: '((', output: 'NO' },
      { input: ')(', output: 'NO' },
      { input: '()[]()', output: 'YES' },
    ],
    hint: { en: 'On ( or [ push it. On ) or ], if the stack is empty or its top is not the matching opener, set ok = false; else pop.', bn: '( বা [ এলে push করুন। ) বা ] এলে স্ট্যাক খালি বা টপ মিলে যাওয়া খোলা বন্ধনী না হলে ok = false; নইলে pop।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[') {
            st.push(c);
        } else {
            char need = (c == ')') ? '(' : '[';
            if (st.empty() || st.top() != need) { ok = false; break; }
            st.pop();
        }
    }
    cout << (ok && st.empty() ? "YES" : "NO") << "\n";
    return 0;
}
`,
  },
};

export const L20: Lesson = {
  id: 'stl-algorithms',
  title: { en: 'STL algorithms and iterators', bn: 'STL অ্যালগরিদম ও ইটারেটর' },
  summary: {
    en: 'find, count, min/max element, unique, reverse, rotate, accumulate and friends, all working on [begin, end).',
    bn: 'find, count, min/max element, unique, reverse, rotate, accumulate ও সঙ্গীরা, সবই [begin, end) জুড়ে কাজ করে।',
  },
  minutes: 28,
  toolkit: ['iterator', 'sort', 'lower-bound', 'accumulate', 'reverse-unique', 'next-permutation', 'count-find', 'iota-fill', 'erase-remove', 'rotate-algo'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'Almost every algorithm in <algorithm> takes a range written as two iterators, begin and end. The range includes begin and stops just before end, written [begin, end). For a vector v the whole range is v.begin(), v.end(); for the first k elements it is v.begin(), v.begin() + k; for an array a of length n it is a, a + n.',
        bn: '<algorithm>-এর প্রায় প্রতিটি অ্যালগরিদম দুটি ইটারেটর, begin আর end, দিয়ে লেখা পরিসর নেয়। পরিসরে begin থাকে আর end-এর ঠিক আগে থামে, লেখা হয় [begin, end)। ভেক্টর v-এর পুরোটার জন্য v.begin(), v.end(); প্রথম k উপাদানের জন্য v.begin(), v.begin() + k; n দৈর্ঘ্যের অ্যারে a-এর জন্য a, a + n।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {5, 3, 8, 3, 1, 8, 8};

    cout << "count of 8: " << count(v.begin(), v.end(), 8) << "\n";
    cout << "any > 7? " << any_of(v.begin(), v.end(), [](int x) { return x > 7; }) << "\n";

    int mx = *max_element(v.begin(), v.end());
    int idx = max_element(v.begin(), v.end()) - v.begin();
    cout << "max " << mx << " first at index " << idx << "\n";

    cout << "sum " << accumulate(v.begin(), v.end(), 0LL) << "\n";

    // distinct values: sort, then unique moves duplicates to the end, erase removes them
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    for (int x : v) cout << x << " ";
    cout << "\n";                                   // 1 3 5 8

    // binary search on the sorted vector
    cout << "first >= 4 is at index " << lower_bound(v.begin(), v.end(), 4) - v.begin() << "\n";   // 2
    cout << "contains 5? " << binary_search(v.begin(), v.end(), 5) << "\n";

    reverse(v.begin(), v.end());
    for (int x : v) cout << x << " ";
    cout << "\n";                                   // 8 5 3 1

    rotate(v.begin(), v.begin() + 1, v.end());      // move the first element to the end
    for (int x : v) cout << x << " ";
    cout << "\n";                                   // 5 3 1 8

    vector<int> id(5);
    iota(id.begin(), id.end(), 0);                  // 0 1 2 3 4
    cout << id.back() << "\n";

    string s = "abc";
    do { cout << s << " "; } while (next_permutation(s.begin(), s.end()));
    cout << "\n";                                   // all 6 orders
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Index from an iterator', bn: 'ইটারেটর থেকে ইনডেক্স' } },
    {
      kind: 'p',
      text: {
        en: 'find, lower_bound, max_element and friends return an iterator. To get a position subtract v.begin(). To get the value write *it. Before using *it check it is not v.end(), because end points to nothing.',
        bn: 'find, lower_bound, max_element ও সঙ্গীরা ইটারেটর ফেরত দেয়। অবস্থান পেতে v.begin() বিয়োগ করুন। মান পেতে *it লিখুন। *it ব্যবহারের আগে দেখুন সেটি v.end() নয়, কারণ end কোনো কিছুর দিকে নির্দেশ করে না।',
      },
    },
    { kind: 'h', text: { en: 'Pick the right tool', bn: 'সঠিক হাতিয়ার বাছুন' } },
    {
      kind: 'list',
      items: [
        { en: 'Is x present, unsorted? find / count: O(n).', bn: 'x আছে কি, অসাজানো? find / count: O(n)।' },
        { en: 'Is x present, sorted? binary_search / lower_bound: O(log n).', bn: 'x আছে কি, সাজানো? binary_search / lower_bound: O(log n)।' },
        { en: 'Smallest or largest value or its position: min_element / max_element.', bn: 'ক্ষুদ্রতম বা বৃহত্তম মান বা তার অবস্থান: min_element / max_element।' },
        { en: 'Distinct values: sort + unique + erase.', bn: 'আলাদা মান: sort + unique + erase।' },
        { en: 'Total: accumulate with 0LL as the start so it adds in long long.', bn: 'মোট: accumulate-এ শুরু 0LL দিন যাতে long long-এ যোগ হয়।' },
        { en: 'All arrangements: sort first, then do { ... } while (next_permutation(...)).', bn: 'সব সাজানো: আগে sort, তারপর do { ... } while (next_permutation(...))।' },
      ],
    },
    {
      kind: 'warn',
      text: {
        en: 'accumulate(v.begin(), v.end(), 0) adds in int even when v holds long long. Write 0LL.',
        bn: 'v-তে long long থাকলেও accumulate(v.begin(), v.end(), 0) int-এ যোগ করে। 0LL লিখুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Calling unique on an unsorted vector and expecting all duplicates to go. It removes only neighbours that are equal.', bn: 'অসাজানো ভেক্টরে unique ডেকে সব ডুপ্লিকেট যাবে আশা করা। এটি শুধু পাশাপাশি সমানগুলো সরায়।' },
    { en: 'Using lower_bound or binary_search on an unsorted range.', bn: 'অসাজানো পরিসরে lower_bound বা binary_search ব্যবহার।' },
    { en: 'Calling unique without erase: the size stays the same and junk remains at the end.', bn: 'erase ছাড়া unique ডাকা: আকার একই থাকে আর শেষে আবর্জনা থেকে যায়।' },
    { en: 'Dereferencing max_element on an empty range.', bn: 'খালি পরিসরে max_element-এর *-এ নেওয়া।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n and n integers. Print two numbers: how many different values there are, and the 0-based index of the first occurrence of the maximum.',
      bn: 'n আর n টি পূর্ণসংখ্যা পড়ুন। দুটি সংখ্যা প্রিন্ট করুন: কতগুলো আলাদা মান আছে, আর সর্বোচ্চ মানের প্রথম অবস্থানের ০-ভিত্তিক ইনডেক্স।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto &x : a) cin >> x;
    // 1) index of the first maximum (before you sort!)
    // 2) number of distinct values (sort a copy, unique, count)

    return 0;
}
`,
    tests: [
      { input: '5\n3 1 3 2 1', output: '3 0' },
      { input: '4\n1 5 5 2', output: '3 1' },
      { input: '1\n7', output: '1 0' },
    ],
    hint: { en: 'max_element returns the FIRST maximum. Copy the vector to b, sort b, and distinct = unique(b.begin(), b.end()) - b.begin().', bn: 'max_element প্রথম সর্বোচ্চটিই ফেরত দেয়। ভেক্টর b-তে কপি করে sort করুন, আর distinct = unique(b.begin(), b.end()) - b.begin()।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto &x : a) cin >> x;
    int idx = max_element(a.begin(), a.end()) - a.begin();
    vector<int> b = a;
    sort(b.begin(), b.end());
    int distinct = unique(b.begin(), b.end()) - b.begin();
    cout << distinct << " " << idx << "\n";
    return 0;
}
`,
  },
};

export const L21: Lesson = {
  id: 'debugging',
  title: { en: 'Verdicts and debugging', bn: 'ভার্ডিক্ট ও ডিবাগিং' },
  summary: {
    en: 'What WA, RE, TLE and CE mean, the checklist that finds most bugs, and how to test your own code.',
    bn: 'WA, RE, TLE ও CE-এর মানে, বেশির ভাগ বাগ ধরার চেকলিস্ট, আর নিজের কোড পরীক্ষা করার উপায়।',
  },
  minutes: 22,
  toolkit: ['cerr-debug', 'assert-check'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'When a submission fails the judge gives a verdict. Each one points to a different kind of mistake, so reading it correctly saves time.',
        bn: 'সাবমিশন ব্যর্থ হলে জাজ একটি ভার্ডিক্ট দেয়। প্রতিটি ভিন্ন ধরনের ভুলের ইঙ্গিত দেয়, তাই ঠিকভাবে পড়লে সময় বাঁচে।',
      },
    },
    {
      kind: 'list',
      items: [
        { en: 'Compilation error (CE): the code is not valid C++. Read the first error message and the line it names.', bn: 'Compilation error (CE): কোড বৈধ C++ নয়। প্রথম এরর বার্তা ও যে লাইনের নাম আছে তা পড়ুন।' },
        { en: 'Wrong answer (WA): it runs but prints the wrong thing. Suspect overflow, a missed edge case, a misread statement, or an unreset variable.', bn: 'Wrong answer (WA): চলে কিন্তু ভুল প্রিন্ট করে। ওভারফ্লো, বাদ পড়া এজ কেস, ভুল পড়া স্টেটমেন্ট বা রিসেট না হওয়া ভেরিয়েবল সন্দেহ করুন।' },
        { en: 'Runtime error (RE): it crashed. Suspect an index outside the array, division by zero, an empty container, or recursion too deep.', bn: 'Runtime error (RE): ক্র্যাশ করেছে। অ্যারের বাইরের ইনডেক্স, শূন্য দিয়ে ভাগ, খালি কনটেইনার বা অতি গভীর রিকার্শন সন্দেহ করুন।' },
        { en: 'Time limit exceeded (TLE): too slow. Count operations: n up to 2·10^5 needs about n log n, not n squared. Add fast I/O.', bn: 'Time limit exceeded (TLE): খুব ধীর। অপারেশন গুনুন: n 2·10^5 পর্যন্ত হলে n log n লাগে, n বর্গ নয়। fast I/O দিন।' },
        { en: 'Memory limit exceeded (MLE): arrays or containers too large for the limit.', bn: 'Memory limit exceeded (MLE): অ্যারে বা কনটেইনার সীমার তুলনায় বড়।' },
      ],
    },
    { kind: 'h', text: { en: 'The WA checklist', bn: 'WA চেকলিস্ট' } },
    {
      kind: 'list',
      items: [
        { en: 'Reread the statement. Did you answer exactly what is asked (minimum or maximum, 1-based or 0-based, YES or Yes)?', bn: 'স্টেটমেন্ট আবার পড়ুন। ঠিক যা চেয়েছে তাই কি উত্তর দিয়েছেন (সর্বনিম্ন না সর্বোচ্চ, ১-ভিত্তিক না ০-ভিত্তিক, YES না Yes)?' },
        { en: 'Try the smallest input: n = 1, an empty-looking case, all numbers equal.', bn: 'সবচেয়ে ছোট ইনপুট চেষ্টা করুন: n = 1, খালির মতো কেস, সব সংখ্যা সমান।' },
        { en: 'Try the largest values: do sums and products fit in long long?', bn: 'সবচেয়ে বড় মান চেষ্টা করুন: যোগফল ও গুণফল কি long long-এ ঢোকে?' },
        { en: 'Are all variables reset for every test case?', bn: 'প্রতিটি টেস্ট কেসের জন্য সব ভেরিয়েবল কি রিসেট হয়েছে?' },
        { en: 'Is the loop range off by one (< vs <=)?', bn: 'লুপের পরিসর কি এক ঘর এদিক-ওদিক (< না <=)?' },
      ],
    },
    {
      kind: 'code',
      caption: { en: 'Print debug information to cerr so it never mixes with the real answer. The judge ignores cerr.', bn: 'ডিবাগ তথ্য cerr-এ প্রিন্ট করুন যাতে আসল উত্তরের সঙ্গে না মেশে। জাজ cerr উপেক্ষা করে।' },
      code: raw`#include <bits/stdc++.h>
using namespace std;

// A trusted slow method and the fast method you want to check.
long long slowSum(int n) { long long s = 0; for (int i = 1; i <= n; i++) s += i; return s; }
long long fastSum(int n) { return 1LL * n * (n + 1) / 2; }

int main() {
    // Self-test: compare both methods on every small input.
    for (int n = 0; n <= 2000; n++) {
        if (slowSum(n) != fastSum(n)) {
            cerr << "MISMATCH at n = " << n << "\n";
            return 1;
        }
    }
    cerr << "all small cases agree\n";   // goes to the error stream
    assert(fastSum(10) == 55);            // crashes loudly if your belief is wrong
    cout << fastSum(100000) << "\n";
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'This habit, a slow obviously-correct brute force next to your fast solution, then compare on many small inputs, is called stress testing. It finds bugs that samples never show. The Problems section of this site uses it for every solution.',
        bn: 'এই অভ্যাস, দ্রুত সমাধানের পাশে ধীর অথচ নিশ্চিতভাবে সঠিক ব্রুট ফোর্স রেখে অনেক ছোট ইনপুটে তুলনা করা, স্ট্রেস টেস্টিং নামে পরিচিত। এটি এমন বাগ ধরে যা স্যাম্পল কখনো দেখায় না। এই সাইটের Problems অংশে প্রতিটি সমাধানে এটি করা হয়েছে।',
      },
    },
  ],
  mistakes: [
    { en: 'Debugging by guessing instead of printing the values the program actually has.', bn: 'প্রোগ্রামে আসলে কী মান আছে তা না দেখে আন্দাজে ডিবাগ করা।' },
    { en: 'Leaving debug output on cout in the submitted code.', bn: 'জমা দেওয়া কোডে ডিবাগ আউটপুট cout-এ রেখে দেওয়া।' },
    { en: 'Testing only the sample. Samples are small and kind; the hidden tests are not.', bn: 'শুধু স্যাম্পল পরীক্ষা করা। স্যাম্পল ছোট ও সদয়; লুকানো টেস্ট তা নয়।' },
    { en: 'Changing code at random after a WA. Find the failing input first.', bn: 'WA-এর পর এলোমেলো কোড বদলানো। আগে ব্যর্থ ইনপুটটি খুঁজুন।' },
  ],
  exercise: {
    prompt: {
      en: 'This program should print 1 + 2 + ... + n for n up to 2000000000 but it overflows. Fix it.',
      bn: 'এই প্রোগ্রামের n পর্যন্ত (n সর্বোচ্চ 2000000000) 1 + 2 + ... + n প্রিন্ট করার কথা, কিন্তু এটি ওভারফ্লো করে। ঠিক করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int s = n * (n + 1) / 2;
    cout << s << "\n";
    return 0;
}
`,
    tests: [
      { input: '100000', output: '5000050000' },
      { input: '2000000000', output: '2000000001000000000' },
      { input: '1', output: '1' },
    ],
    hint: { en: 'Both n * (n + 1) and the result need 64 bits. Use long long and 1LL.', bn: 'n * (n + 1) আর ফলাফল দুটোতেই ৬৪ বিট লাগে। long long ও 1LL ব্যবহার করুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    long long s = n * (n + 1) / 2;
    cout << s << "\n";
    return 0;
}
`,
  },
};
