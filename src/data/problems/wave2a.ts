import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p706B: ProblemEntry = {
  id: '706B',
  contestId: 706,
  index: 'B',
  name: 'Interesting drink',
  rating: 1100,
  tags: ['binary-search', 'dp', 'implementation'],
  featuredFor: ['binary-search'],
  why: L('The first “sort once, answer many queries with binary search” problem.', 'প্রথম “একবার সর্ট করো, অনেক কোয়েরির উত্তর বাইনারি সার্চে দাও” প্রবলেম।'),
  statement: L(
    'There are n shops; shop i sells the drink for xᵢ coins. For each of q days you know that Vasiliy has mᵢ coins that day. For every day, print how many shops he could buy the drink in.',
    'n-টি দোকান আছে; দোকান i পানীয়টি xᵢ কয়েনে বিক্রি করে। q-টি দিনের প্রতিটিতে জানা আছে সেদিন ভাসিলির কাছে mᵢ কয়েন আছে। প্রতিটি দিনের জন্য প্রিন্ট করুন সে কতগুলো দোকান থেকে পানীয় কিনতে পারত।',
  ),
  input: L('n, the n prices, q, then q values mᵢ.', 'n, n-টি দাম, q, তারপর q-টি মান mᵢ।'),
  output: L('q lines, the number of affordable shops each day.', 'q-টি লাইন, প্রতিদিন সাধ্যের মধ্যে থাকা দোকানের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, q ≤ 10⁵', '১ ≤ n, q ≤ ১০⁵'), L('1 ≤ xᵢ ≤ 10⁵, 1 ≤ mᵢ ≤ 10⁹', '১ ≤ xᵢ ≤ ১০⁵, ১ ≤ mᵢ ≤ ১০⁹')] },
  samples: [
    {
      input: '5\n3 10 8 6 11\n4\n1\n10\n3\n11',
      output: '0\n4\n1\n5',
      explain: L('With 10 coins he can buy at 3, 6, 8 and 10.', '১০ কয়েনে সে ৩, ৬, ৮ আর ১০ দামের দোকানে কিনতে পারে।'),
    },
  ],
  observation: L('The answer for a day is “how many prices are ≤ m”. After sorting the prices once, that count is the position of the first price greater than m.', 'একটি দিনের উত্তর হলো “কতগুলো দাম ≤ m”। দামগুলো একবার সর্ট করলে সেই গণনা হলো m-এর চেয়ে বড় প্রথম দামের অবস্থান।'),
  approach: [
    L('Sort the prices. For each query print upper_bound(prices, m) − begin.', 'দামগুলো সর্ট করুন। প্রতিটি কোয়েরিতে upper_bound(prices, m) − begin প্রিন্ট করুন।'),
    L('Checking every shop for every day is 10¹⁰ operations, far too slow.', 'প্রতিদিন প্রতিটি দোকান দেখা মানে ১০¹⁰ অপারেশন, অনেক বেশি ধীর।'),
  ],
  walkthrough: {
    input: 'prices 3 10 8 6 11, m = 10',
    steps: [
      { state: '3 6 8 10 11', text: L('Sorted once.', 'একবার সাজানো।') },
      { state: 'upper_bound(10) → index 4', text: L('The first price above 10 is 11 at index 4, so 4 shops.', '১০-এর বড় প্রথম দাম ১১, ইনডেক্স ৪-এ, তাই ৪টি দোকান।') },
    ],
  },
  complexity: { time: 'O((n + q) log n)', space: 'O(n)', why: L('One sort and one binary search per query.', 'একবার সর্ট আর প্রতি কোয়েরিতে একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every shop each day', 'প্রতিদিন প্রতিটি দোকান দেখা'),
      idea: L('Count prices ≤ m with a loop for every query.', 'প্রতিটি কোয়েরিতে লুপ দিয়ে ≤ m দাম গুনুন।'),
      explain: [L('Correct and obvious, but n · q can reach 10¹⁰. It is the reference the faster solutions are tested against.', 'সঠিক আর স্পষ্ট, কিন্তু n · q ১০¹⁰ পর্যন্ত হতে পারে। দ্রুত সমাধানগুলো এর সঙ্গে মিলিয়ে পরীক্ষা করা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> x(n);
    for (auto& v : x) scanf("%d", &v);
    int q;
    scanf("%d", &q);
    while (q--) {
        long long m;
        scanf("%lld", &m);
        int cnt = 0;
        for (int v : x) if (v <= m) cnt++;
        printf("%d\n", cnt);
    }
    return 0;
}
`,
      time: 'O(n · q)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['c-io', 'for-loop'],
    },
    {
      id: 'upper-bound',
      kind: 'optimal',
      title: L('Sort + upper_bound', 'সর্ট + upper_bound'),
      idea: L('upper_bound finds the first price greater than m in O(log n).', 'upper_bound O(log n)-এ m-এর বড় প্রথম দাম খুঁজে পায়।'),
      explain: [L('After sorting, all prices ≤ m form a prefix of the array. upper_bound returns the end of that prefix, so its index is the count. Use fast input: 2·10⁵ numbers are read.', 'সর্টের পর ≤ m সব দাম অ্যারের একটি শুরুর অংশ গঠন করে। upper_bound সেই অংশের শেষ ফেরত দেয়, তাই এর ইনডেক্সই গণনা। দ্রুত ইনপুট ব্যবহার করুন: ২·১০⁵টি সংখ্যা পড়া হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> x(n);
    for (auto& v : x) cin >> v;
    sort(x.begin(), x.end());
    int q;
    cin >> q;
    while (q--) {
        long long m;
        cin >> m;
        cout << upper_bound(x.begin(), x.end(), m) - x.begin() << "\n";
    }
    return 0;
}
`,
      time: 'O((n + q) log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'io-fast'],
    },
    {
      id: 'prefix',
      kind: 'better',
      title: L('Counting array + prefix sums', 'গণনার অ্যারে + প্রিফিক্স সাম'),
      idea: L('Prices are at most 10⁵: cnt[v] counts each price, and pre[v] = how many are ≤ v.', 'দাম সর্বোচ্চ ১০⁵: cnt[v] প্রতিটি দাম গোনে, আর pre[v] = কতগুলো ≤ v।'),
      explain: [L('This is the DP view from the problem’s tags: pre[v] = pre[v − 1] + cnt[v]. Each query is then O(1); clamp m to 10⁵ because larger budgets buy everywhere.', 'এটি প্রবলেমের ট্যাগের DP দৃষ্টিভঙ্গি: pre[v] = pre[v − ১] + cnt[v]। তারপর প্রতিটি কোয়েরি O(১); m-কে ১০⁵-এ সীমিত করুন কারণ বড় বাজেটে সব জায়গায় কেনা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    const int V = 100000;
    int n;
    cin >> n;
    vector<int> pre(V + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pre[x]++;
    }
    for (int v = 1; v <= V; v++) pre[v] += pre[v - 1];
    int q;
    cin >> q;
    while (q--) {
        long long m;
        cin >> m;
        cout << pre[min<long long>(m, V)] << "\n";
    }
    return 0;
}
`,
      time: 'O(n + V + q)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['prefix-sum', 'io-fast'],
    },
  ],
  tests: [
    { input: '5\n3 10 8 6 11\n4\n1\n10\n3\n11', output: '0\n4\n1\n5', source: 'sample', note: sample(1) },
    { input: '1\n5\n2\n4\n1000000000', output: '0\n1', source: 'own', note: L('A huge budget.', 'বিশাল বাজেট।') },
    { input: '3\n2 2 2\n1\n2', output: '3', source: 'own', note: L('Equal prices count as affordable.', 'সমান দাম সাধ্যের মধ্যে ধরা হয়।') },
  ],
  pitfalls: [
    L('Using lower_bound, which misses prices exactly equal to m.', 'lower_bound ব্যবহার, যা ঠিক m-এর সমান দাম বাদ দেয়।'),
    L('Slow input with cin and no sync_with_stdio(false).', 'sync_with_stdio(false) ছাড়া cin দিয়ে ধীর ইনপুট।'),
  ],
  related: [{ id: '279B', name: 'Books', why: L('Binary search or two pointers on prefix sums.', 'প্রিফিক্স সামে বাইনারি সার্চ বা টু পয়েন্টার।') }],
  toolkit: ['sort', 'lower-bound', 'prefix-sum'],
};

export const p279B: ProblemEntry = {
  id: '279B',
  contestId: 279,
  index: 'B',
  name: 'Books',
  rating: 1400,
  tags: ['binary-search', 'brute-force', 'implementation', 'two-pointers'],
  featuredFor: ['two-pointers'],
  why: L('The model sliding-window problem, solvable with two pointers or binary search on prefix sums.', 'আদর্শ স্লাইডিং-উইন্ডো প্রবলেম, টু পয়েন্টার বা প্রিফিক্স সামে বাইনারি সার্চ দিয়ে সমাধানযোগ্য।'),
  statement: L(
    'Valera has t free minutes and n books in a row; book i takes aᵢ minutes. He picks a starting book and reads books one after another in order, stopping when he runs out of books or does not have enough time to finish the next one completely. What is the maximum number of books he can read?',
    'ভালেরার t মিনিট অবসর আর একটি সারিতে n-টি বই আছে; বই i পড়তে aᵢ মিনিট লাগে। সে একটি শুরুর বই বেছে ক্রমানুসারে একটির পর একটি পড়ে, আর বই শেষ হলে বা পরের বইটি পুরো শেষ করার সময় না থাকলে থামে। সে সর্বোচ্চ কয়টি বই পড়তে পারে?',
  ),
  input: L('n and t, then a₁ … aₙ.', 'n আর t, তারপর a₁ … aₙ।'),
  output: L('The maximum number of books.', 'সর্বোচ্চ বইয়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ t ≤ 10⁹', '১ ≤ n ≤ ১০⁵, ১ ≤ t ≤ ১০⁹'), L('1 ≤ aᵢ ≤ 10⁴', '১ ≤ aᵢ ≤ ১০⁴')] },
  samples: [
    { input: '4 5\n3 1 2 1', output: '3', explain: L('Start at book 2: 1 + 2 + 1 = 4 ≤ 5.', 'বই ২ থেকে শুরু: ১ + ২ + ১ = ৪ ≤ ৫।') },
    { input: '3 3\n2 2 3', output: '1', explain: L('No two neighbours fit in 3 minutes.', 'কোনো দুটি পাশাপাশি বই ৩ মিনিটে আঁটে না।') },
  ],
  observation: L('He reads a contiguous block, so the answer is the longest subarray with sum ≤ t. All times are positive, so shrinking a block only lowers its sum.', 'সে একটি একটানা ব্লক পড়ে, তাই উত্তর হলো যোগফল ≤ t এমন সবচেয়ে লম্বা সাবঅ্যারে। সব সময় ধনাত্মক, তাই ব্লক ছোট করলে শুধু যোগফল কমে।'),
  approach: [L('Slide a window: add books on the right, drop books on the left while the sum is above t, and keep the longest window.', 'একটি উইন্ডো সরান: ডানে বই যোগ করুন, যোগফল t-এর বেশি হলে বাম থেকে বই বাদ দিন, আর সবচেয়ে লম্বা উইন্ডো রাখুন।')],
  walkthrough: {
    input: '4 5\n3 1 2 1',
    steps: [
      { state: '[3] sum 3', text: L('Length 1.', 'দৈর্ঘ্য ১।') },
      { state: '[3 1] sum 4', text: L('Length 2.', 'দৈর্ঘ্য ২।') },
      { state: '[3 1 2] sum 6 → drop 3 → [1 2] sum 3', text: L('Too long, shrink.', 'বেশি লম্বা, ছোট করা।') },
      { state: '[1 2 1] sum 4', text: L('Length 3. Answer 3.', 'দৈর্ঘ্য ৩। উত্তর ৩।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each pointer moves at most n times.', 'প্রতিটি পয়েন্টার সর্বোচ্চ n বার সরে।') },
  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: L('Simulate every start', 'প্রতিটি শুরু সিমুলেশন'),
      idea: L('For each start, read forward until the next book does not fit.', 'প্রতিটি শুরু থেকে পরের বই না আঁটা পর্যন্ত সামনে পড়ুন।'),
      explain: [L('This follows the statement literally and is O(n²) in the worst case (when t is large). It shows the structure: for each start, we want the furthest end that fits.', 'এটি স্টেটমেন্ট অক্ষরে অক্ষরে মানে আর সবচেয়ে খারাপ ক্ষেত্রে (t বড় হলে) O(n²)। এটি কাঠামো দেখায়: প্রতিটি শুরুর জন্য আঁটে এমন সবচেয়ে দূরের শেষ চাই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long t;
    cin >> n >> t;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int best = 0;
    for (int s = 0; s < n; s++) {
        long long used = 0;
        int cnt = 0;
        for (int i = s; i < n && used + a[i] <= t; i++) used += a[i], cnt++;
        best = max(best, cnt);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
    {
      id: 'window',
      kind: 'optimal',
      title: L('Two pointers (sliding window)', 'টু পয়েন্টার (স্লাইডিং উইন্ডো)'),
      idea: L('For every right end r, the left end l only moves right.', 'প্রতিটি ডান প্রান্ত r-এর জন্য বাম প্রান্ত l শুধু ডানে সরে।'),
      explain: [
        L('If [l, r] is too expensive, any window [l, r′] with r′ > r is too, so l never needs to move back. Each step adds a[r] once and removes each a[l] at most once: O(n) in total.', '[l, r] বেশি খরচের হলে r′ > r এমন যেকোনো উইন্ডো [l, r′]-ও তাই, তাই l-কে কখনো পেছনে যেতে হয় না। প্রতিটি ধাপে a[r] একবার যোগ হয় আর প্রতিটি a[l] সর্বোচ্চ একবার বাদ যায়: মোট O(n)।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long t;
    cin >> n >> t;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int l = 0, best = 0;
    long long sum = 0;
    for (int r = 0; r < n; r++) {
        sum += a[r];
        while (sum > t) sum -= a[l++];
        best = max(best, r - l + 1);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n', 'min-max'],
    },
    {
      id: 'binary',
      kind: 'method',
      title: L('Prefix sums + binary search', 'প্রিফিক্স সাম + বাইনারি সার্চ'),
      idea: L('For each start s, find the largest e with pre[e] − pre[s] ≤ t using upper_bound.', 'প্রতিটি শুরু s-এর জন্য upper_bound দিয়ে pre[e] − pre[s] ≤ t এমন সবচেয়ে বড় e খুঁজুন।'),
      explain: [L('Prefix sums are increasing, so the books from s onwards that fit are exactly the prefix sums ≤ pre[s] + t. upper_bound(pre[s] + t) gives the first index that does not fit; the count is that index − 1 − s.', 'প্রিফিক্স সাম ক্রমবর্ধমান, তাই s থেকে যে বইগুলো আঁটে সেগুলো ঠিক pre[s] + t-এর সমান বা কম প্রিফিক্স সাম। upper_bound(pre[s] + t) প্রথম না-আঁটা ইনডেক্স দেয়; গণনা হলো সেই ইনডেক্স − ১ − s।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long t;
    cin >> n >> t;
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pre[i + 1] = pre[i] + x;
    }
    long long best = 0;
    for (int s = 0; s < n; s++) {
        long long e = upper_bound(pre.begin(), pre.end(), pre[s] + t) - pre.begin() - 1;
        best = max(best, e - s);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'lower-bound'],
    },
  ],
  tests: [
    { input: '4 5\n3 1 2 1', output: '3', source: 'sample', note: sample(1) },
    { input: '3 3\n2 2 3', output: '1', source: 'sample', note: sample(2) },
    { input: '1 1\n2', output: '0', source: 'own', note: L('Not even one book fits.', 'একটি বইও আঁটে না।') },
    { input: '3 100\n1 2 3', output: '3', source: 'own', note: L('Everything fits.', 'সব আঁটে।') },
  ],
  pitfalls: [
    L('Assuming he must start at the first book.', 'ধরে নেওয়া যে তাকে প্রথম বই থেকে শুরু করতে হবে।'),
    L('Forgetting the answer can be 0.', 'ভুলে যাওয়া যে উত্তর ০ হতে পারে।'),
  ],
  related: [{ id: '1538C', name: 'Number of Pairs', why: L('Two pointers on a sorted array.', 'সাজানো অ্যারেতে টু পয়েন্টার।') }],
  toolkit: ['prefix-sum', 'lower-bound'],
};

export const p1201C: ProblemEntry = {
  id: '1201C',
  contestId: 1201,
  index: 'C',
  name: 'Maximum Median',
  rating: 1400,
  tags: ['binary-search', 'greedy', 'math', 'sortings'],
  featuredFor: ['binary-search'],
  why: L('The cleanest example of binary search on the answer with a greedy check.', 'গ্রিডি যাচাইসহ উত্তরের ওপর বাইনারি সার্চের সবচেয়ে পরিষ্কার উদাহরণ।'),
  statement: L(
    'You have an array of n integers (n is odd) and may perform at most k operations, each increasing one element by 1. Make the median (the middle element after sorting) as large as possible and print it.',
    'n-টি পূর্ণসংখ্যার একটি অ্যারে আছে (n বিজোড়), আর সর্বোচ্চ k-টি অপারেশন করা যায়, প্রতিটি একটি উপাদান ১ বাড়ায়। মিডিয়ান (সর্টের পর মাঝের উপাদান) যত বড় সম্ভব করে প্রিন্ট করুন।',
  ),
  input: L('n and k, then the array.', 'n আর k, তারপর অ্যারে।'),
  output: L('The maximum possible median.', 'সর্বোচ্চ সম্ভাব্য মিডিয়ান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵ (odd), 1 ≤ k ≤ 10⁹', '১ ≤ n ≤ ২·১০⁵ (বিজোড়), ১ ≤ k ≤ ১০⁹'), L('1 ≤ aᵢ ≤ 10⁹', '১ ≤ aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '3 2\n1 3 5', output: '5', explain: L('Raise 3 twice: 1 5 5, median 5.', '৩-কে দুবার বাড়ান: ১ ৫ ৫, মিডিয়ান ৫।') },
    { input: '5 5\n1 2 1 1 1', output: '3', explain: L('Sorted 1 1 1 1 2; raise the top three to 3 using 2 + 2 + 1 = 5.', 'সাজানো ১ ১ ১ ১ ২; ওপরের তিনটিকে ৩ করুন, ২ + ২ + ১ = ৫ খরচে।') },
    { input: '7 7\n4 1 2 4 3 4 4', output: '5', explain: L('Sorted 1 2 3 4 4 4 4; the top four need 4 operations to reach 5, but 8 to reach 6.', 'সাজানো ১ ২ ৩ ৪ ৪ ৪ ৪; ওপরের চারটিকে ৫-এ নিতে ৪টি অপারেশন, ৬-এ নিতে ৮টি।') },
  ],
  observation: L('Only the elements from the middle up matter: to make the median at least x, every one of them must be at least x, and raising smaller ones never helps. The cost Σ max(0, x − aᵢ) over that upper half grows with x.', 'শুধু মাঝ থেকে ওপরের উপাদানগুলো গুরুত্বপূর্ণ: মিডিয়ান অন্তত x করতে এদের প্রত্যেককে অন্তত x হতে হবে, আর ছোটগুলো বাড়ালে কোনো লাভ নেই। ওই ওপরের অর্ধেকের Σ max(০, x − aᵢ) খরচ x-এর সঙ্গে বাড়ে।'),
  approach: [
    L('Sort. Binary search the largest x whose cost over a[n/2 .. n−1] is at most k.', 'সর্ট করুন। a[n/2 .. n−১]-এর ওপর খরচ সর্বোচ্চ k এমন সবচেয়ে বড় x-এ বাইনারি সার্চ করুন।'),
  ],
  walkthrough: {
    input: '7 7\n4 1 2 4 3 4 4',
    steps: [
      { state: 'upper half 4 4 4 4', text: L('Sorted: 1 2 3 [4 4 4 4].', 'সাজানো: ১ ২ ৩ [৪ ৪ ৪ ৪]।') },
      { state: 'x = 5: cost 4 ≤ 7', text: L('Feasible.', 'সম্ভব।') },
      { state: 'x = 6: cost 8 > 7', text: L('Not feasible. Answer 5.', 'সম্ভব নয়। উত্তর ৫।') },
    ],
  },
  complexity: { time: 'O(n log n + n log k)', space: 'O(n)', why: L('A sort, then about 31 checks of O(n).', 'একটি সর্ট, তারপর O(n)-এর প্রায় ৩১টি যাচাই।') },
  solutions: [
    {
      id: 'bsearch',
      kind: 'optimal',
      title: L('Binary search on the median', 'মিডিয়ানের ওপর বাইনারি সার্চ'),
      idea: L('ok(x): Σ max(0, x − a[i]) for i ≥ n/2 is at most k.', 'ok(x): i ≥ n/2-এর জন্য Σ max(০, x − a[i]) সর্বোচ্চ k।'),
      explain: [
        L('lo = a[n/2] always works (zero cost) and hi = a[n/2] + k + 1 never does, because even spending all k on the median alone reaches only a[n/2] + k. Keep that invariant and halve the gap.', 'lo = a[n/2] সবসময় কাজ করে (শূন্য খরচ) আর hi = a[n/2] + k + ১ কখনো করে না, কারণ সব k শুধু মিডিয়ানে খরচ করলেও a[n/2] + k পর্যন্ত পৌঁছায়। এই নিয়ম রেখে ফাঁক অর্ধেক করুন।'),
        L('Stop summing as soon as the cost passes k, which also keeps the sum from overflowing.', 'খরচ k ছাড়ালেই যোগ থামান, এতে যোগফলের ওভারফ্লোও এড়ানো যায়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    auto ok = [&](long long x) {
        long long cost = 0;
        for (int i = n / 2; i < n && cost <= k; i++) cost += max(0LL, x - a[i]);
        return cost <= k;
    };
    long long lo = a[n / 2], hi = a[n / 2] + k + 1;
    while (hi - lo > 1) {
        long long mid = lo + (hi - lo) / 2;
        (ok(mid) ? lo : hi) = mid;
    }
    cout << lo << "\n";
    return 0;
}
`,
      time: 'O(n log n + n log k)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'long-long'],
    },
    {
      id: 'levels',
      kind: 'method',
      title: L('Raise the upper half level by level', 'ওপরের অর্ধেক স্তরে স্তরে তোলা'),
      idea: L('Lift a[n/2] up to a[n/2 + 1], then both up to a[n/2 + 2], and so on, while k lasts.', 'k যতক্ষণ থাকে, a[n/2]-কে a[n/2 + ১] পর্যন্ত তুলুন, তারপর দুটিকে a[n/2 + ২] পর্যন্ত, এভাবে।'),
      explain: [
        L('After sorting, keep the c lowest elements of the upper half at a common level cur. Raising them to the next element’s value costs c · (next − cur). If k is not enough, add k / c to cur and stop. If you reach the top, every remaining k / (n/2 + 1) operations lift the whole half by one more.', 'সর্টের পর ওপরের অর্ধেকের সবচেয়ে নিচের c-টি উপাদান একটি সাধারণ স্তর cur-এ রাখুন। এদের পরের উপাদানের মানে তুলতে খরচ c · (next − cur)। k যথেষ্ট না হলে cur-এ k / c যোগ করে থামুন। চূড়ায় পৌঁছালে বাকি প্রতি k / (n/2 + ১) অপারেশনে পুরো অর্ধেক আরও এক বাড়ে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    int m = n / 2;
    long long cur = a[m];
    long long c = 1;                       // how many elements sit at level cur
    for (int i = m + 1; i < n; i++, c++) {
        long long need = c * (a[i] - cur);
        if (need > k) break;
        k -= need;
        cur = a[i];
    }
    cur += k / c;
    cout << cur << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long'],
    },
  ],
  tests: [
    { input: '3 2\n1 3 5', output: '5', source: 'sample', note: sample(1) },
    { input: '5 5\n1 2 1 1 1', output: '3', source: 'sample', note: sample(2) },
    { input: '7 7\n4 1 2 4 3 4 4', output: '5', source: 'sample', note: sample(3) },
    { input: '1 1000000000\n1000000000', output: '2000000000', source: 'own', note: L('Needs 64-bit values.', '৬৪-বিট মান লাগে।') },
  ],
  pitfalls: [
    L('Spending operations on the lower half, which cannot raise the median.', 'নিচের অর্ধেকে অপারেশন খরচ, যা মিডিয়ান বাড়াতে পারে না।'),
    L('int overflow: the answer can be 2·10⁹.', 'int ওভারফ্লো: উত্তর ২·১০⁹ হতে পারে।'),
  ],
  related: [{ id: '371C', name: 'Hamburgers', why: L('Another binary search on the answer.', 'উত্তরের ওপর আরেকটি বাইনারি সার্চ।') }],
  toolkit: ['sort', 'lambda'],
};

export const p371C: ProblemEntry = {
  id: '371C',
  contestId: 371,
  index: 'C',
  name: 'Hamburgers',
  rating: 1600,
  tags: ['binary-search', 'brute-force'],
  why: L('Binary search on the answer with resources you can buy: the check is easy, the direct formula is not.', 'কেনা যায় এমন সম্পদসহ উত্তরের ওপর বাইনারি সার্চ: যাচাই সহজ, সরাসরি সূত্র নয়।'),
  statement: L(
    'A hamburger recipe is a string of letters B (bread), S (sausage) and C (cheese). The kitchen has nb, ns and nc pieces of each; the shop sells them for pb, ps and pc rubles each, and Polycarpus has r rubles. How many hamburgers can he make at most?',
    'একটি হ্যামবার্গারের রেসিপি হলো B (রুটি), S (সসেজ) আর C (চিজ) অক্ষরের একটি স্ট্রিং। রান্নাঘরে প্রতিটির nb, ns আর nc টুকরো আছে; দোকানে প্রতিটি pb, ps আর pc রুবলে বিক্রি হয়, আর পলিকার্পাসের কাছে r রুবল আছে। সে সর্বোচ্চ কয়টি হ্যামবার্গার বানাতে পারে?',
  ),
  input: L('The recipe; nb ns nc; pb ps pc; r.', 'রেসিপি; nb ns nc; pb ps pc; r।'),
  output: L('The maximum number of hamburgers.', 'সর্বোচ্চ হ্যামবার্গারের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Recipe length ≤ 100; nb, ns, nc, pb, ps, pc ≤ 100', 'রেসিপির দৈর্ঘ্য ≤ ১০০; nb, ns, nc, pb, ps, pc ≤ ১০০'), L('1 ≤ r ≤ 10¹²', '১ ≤ r ≤ ১০¹²')] },
  samples: [
    { input: 'BBBSSC\n6 4 1\n1 2 3\n4', output: '2', explain: L('Two burgers need 6 B, 4 S, 2 C: buy one C for 3.', 'দুটি বার্গারে ৬ B, ৪ S, ২ C লাগে: ৩ রুবলে একটি C কিনুন।') },
    { input: 'BBC\n1 10 1\n1 10 1\n21', output: '7', explain: L('Seven need 14 B and 7 C; buy 13 B and 6 C for 19.', 'সাতটিতে ১৪ B আর ৭ C লাগে; ১৯ রুবলে ১৩ B আর ৬ C কিনুন।') },
    { input: 'BSC\n1 1 1\n1 1 3\n1000000000000', output: '200000000001', explain: L('Each extra burger costs 5 after the first is free.', 'প্রথমটি বিনামূল্যে, তারপর প্রতিটি বাড়তি বার্গার ৫ রুবল।') },
  ],
  observation: L('For a target of x burgers, the money needed is Σ max(0, need · x − have) · price over the three ingredients. It never decreases as x grows, so binary search the largest affordable x.', 'x-টি বার্গারের লক্ষ্যে দরকারি টাকা হলো তিনটি উপকরণের ওপর Σ max(০, need · x − have) · price। x বাড়লে এটি কখনো কমে না, তাই সাধ্যের মধ্যে সবচেয়ে বড় x-এ বাইনারি সার্চ করুন।'),
  approach: [L('Count B, S and C in the recipe, then binary search x in [0, 2·10¹²] with that cost check.', 'রেসিপিতে B, S আর C গুনুন, তারপর সেই খরচ যাচাই দিয়ে [০, ২·১০¹²]-এ x খুঁজুন।')],
  walkthrough: {
    input: 'BBC / 1 10 1 / 1 10 1 / 21',
    steps: [
      { state: 'need B=2, S=0, C=1', text: L('Count the recipe.', 'রেসিপি গোনা।') },
      { state: 'x = 7: (14−1)·1 + (7−1)·1 = 19 ≤ 21', text: L('Affordable.', 'সাধ্যের মধ্যে।') },
      { state: 'x = 8: 15 + 7 = 22 > 21', text: L('Too expensive. Answer 7.', 'বেশি দামি। উত্তর ৭।') },
    ],
  },
  complexity: { time: 'O(|recipe| + log R)', space: 'O(1)', why: L('About 41 constant-time checks.', 'প্রায় ৪১টি স্থির-সময়ের যাচাই।') },
  solutions: [
    {
      id: 'bsearch',
      kind: 'optimal',
      title: L('Binary search on the number of burgers', 'বার্গারের সংখ্যায় বাইনারি সার্চ'),
      idea: L('cost(x) ≤ r is monotone in x.', 'cost(x) ≤ r, x-এ একঘেয়ে।'),
      explain: [
        L('The upper bound: even with no stock, each burger costs at least 1 ruble, so x ≤ r + 100 is safe; 2·10¹² is generous. need · x is at most 100 · 2·10¹² = 2·10¹⁴ and times a price of 100 is 2·10¹⁶, still well inside long long.', 'ঊর্ধ্বসীমা: মজুত না থাকলেও প্রতিটি বার্গারে অন্তত ১ রুবল লাগে, তাই x ≤ r + ১০০ নিরাপদ; ২·১০¹² উদার। need · x সর্বোচ্চ ১০০ · ২·১০¹² = ২·১০¹⁴, দাম ১০০ দিয়ে গুণে ২·১০¹⁶, তখনও long long-এর মধ্যে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string recipe;
    cin >> recipe;
    long long have[3], price[3], r, need[3] = {};
    for (auto& x : have) cin >> x;
    for (auto& x : price) cin >> x;
    cin >> r;
    for (char c : recipe) need[c == 'B' ? 0 : c == 'S' ? 1 : 2]++;
    auto cost = [&](long long x) {
        long long c = 0;
        for (int i = 0; i < 3; i++) c += max(0LL, need[i] * x - have[i]) * price[i];
        return c;
    };
    long long lo = 0, hi = 2000000000001LL;   // cost(lo) <= r, cost(hi) > r
    while (hi - lo > 1) {
        long long mid = lo + (hi - lo) / 2;
        (cost(mid) <= r ? lo : hi) = mid;
    }
    cout << lo << "\n";
    return 0;
}
`,
      time: 'O(log R)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda', 'long-long'],
    },
    {
      id: 'simulate',
      kind: 'method',
      title: L('Use stock first, then a formula', 'আগে মজুত, তারপর সূত্র'),
      idea: L('Make burgers one at a time while stock lasts (at most ~100 rounds), then every further burger costs exactly the full price.', 'মজুত থাকা পর্যন্ত একটি একটি করে বার্গার বানান (সর্বোচ্চ প্রায় ১০০ বার), তারপর প্রতিটি বাড়তি বার্গারে ঠিক পূর্ণ দাম লাগে।'),
      explain: [
        L('While any needed ingredient is still in stock, simulate one burger at a time, buying only what is missing. Stock is at most 100 of each, so this loop runs at most about 101 times. Once all needed stock is gone, each burger costs need·price in total, so the remaining money buys r / fullCost more.', 'প্রয়োজনীয় কোনো উপকরণ মজুত থাকা পর্যন্ত একটি একটি করে বার্গার সিমুলেট করুন, শুধু যা নেই তা কিনে। প্রতিটির মজুত সর্বোচ্চ ১০০, তাই এই লুপ সর্বোচ্চ প্রায় ১০১ বার চলে। প্রয়োজনীয় সব মজুত শেষ হলে প্রতিটি বার্গারের মোট দাম need·price, তাই বাকি টাকায় আরও r / fullCost-টি কেনা যায়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string recipe;
    cin >> recipe;
    long long have[3], price[3], r, need[3] = {};
    for (auto& x : have) cin >> x;
    for (auto& x : price) cin >> x;
    cin >> r;
    for (char c : recipe) need[c == 'B' ? 0 : c == 'S' ? 1 : 2]++;
    long long made = 0;
    auto stockLeft = [&]() {
        for (int i = 0; i < 3; i++) if (need[i] > 0 && have[i] > 0) return true;
        return false;
    };
    while (stockLeft()) {
        long long pay = 0;
        for (int i = 0; i < 3; i++) pay += max(0LL, need[i] - have[i]) * price[i];
        if (pay > r) { cout << made << "\n"; return 0; }
        r -= pay;
        for (int i = 0; i < 3; i++) have[i] = max(0LL, have[i] - need[i]);
        made++;
    }
    long long full = 0;
    for (int i = 0; i < 3; i++) full += need[i] * price[i];
    cout << made + r / full << "\n";
    return 0;
}
`,
      time: 'O(|recipe| + 100)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n', 'long-long'],
    },
  ],
  tests: [
    { input: 'BBBSSC\n6 4 1\n1 2 3\n4', output: '2', source: 'sample', note: sample(1) },
    { input: 'BBC\n1 10 1\n1 10 1\n21', output: '7', source: 'sample', note: sample(2) },
    { input: 'BSC\n1 1 1\n1 1 3\n1000000000000', output: '200000000001', source: 'sample', note: sample(3) },
    { input: 'B\n100 100 100\n100 100 100\n1', output: '100', source: 'own', note: L('Stock only.', 'শুধু মজুত।') },
  ],
  pitfalls: [
    L('Using int for r or the cost.', 'r বা খরচের জন্য int ব্যবহার।'),
    L('Counting cost for ingredients the recipe does not need.', 'রেসিপিতে লাগে না এমন উপকরণের খরচ গোনা।'),
    L('Too small an upper bound for the binary search.', 'বাইনারি সার্চের জন্য খুব ছোট ঊর্ধ্বসীমা।'),
  ],
  related: [{ id: '1201C', name: 'Maximum Median', why: L('Binary search on the answer again.', 'আবার উত্তরের ওপর বাইনারি সার্চ।') }],
  toolkit: ['lambda', 'long-long'],
};

export const p455A: ProblemEntry = {
  id: '455A',
  contestId: 455,
  index: 'A',
  name: 'Boredom',
  rating: 1500,
  tags: ['dp'],
  featuredFor: ['dp'],
  why: L('Turns a strange game into the classic take-or-skip DP over values.', 'একটি অদ্ভুত খেলাকে মানের ওপর ক্লাসিক নেওয়া-বা-বাদ DP-তে রূপান্তর করে।'),
  statement: L(
    'You have a sequence of n integers. In one step you choose an element aₖ, delete it and every element equal to aₖ − 1 or aₖ + 1, and earn aₖ points. What is the maximum total number of points?',
    'n-টি পূর্ণসংখ্যার একটি ক্রম আছে। এক ধাপে একটি উপাদান aₖ বেছে সেটি আর aₖ − ১ বা aₖ + ১-এর সমান প্রতিটি উপাদান মুছে ফেলেন, আর aₖ পয়েন্ট পান। সর্বোচ্চ মোট পয়েন্ট কত?',
  ),
  input: L('n, then the sequence.', 'n, তারপর ক্রমটি।'),
  output: L('The maximum number of points.', 'সর্বোচ্চ পয়েন্ট।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ aᵢ ≤ 10⁵', '১ ≤ n ≤ ১০⁵, ১ ≤ aᵢ ≤ ১০⁵')] },
  samples: [
    { input: '2\n1 2', output: '2', explain: L('Taking 2 deletes the 1.', '২ নিলে ১ মুছে যায়।') },
    { input: '3\n1 2 3', output: '4', explain: L('Take 1 and 3; the 2 is deleted.', '১ আর ৩ নিন; ২ মুছে যায়।') },
    { input: '9\n1 2 1 3 2 2 2 2 3', output: '10', explain: L('Take all five 2s.', 'পাঁচটি ২-ই নিন।') },
  ],
  observation: L('If you take a value v once, its neighbours are gone and you can take every other copy of v for free, earning v · cnt[v]. So the real choice is which values to take, with the rule that two adjacent values cannot both be taken.', 'একবার মান v নিলে এর প্রতিবেশীরা চলে যায় আর v-এর বাকি প্রতিটি কপিও নেওয়া যায়, মোট v · cnt[v]। তাই আসল সিদ্ধান্ত হলো কোন মানগুলো নেবেন, এই নিয়মে যে দুটি পাশাপাশি মান একসঙ্গে নেওয়া যায় না।'),
  approach: [L('dp[v] = best total using values 1..v: dp[v] = max(dp[v − 1], dp[v − 2] + v · cnt[v]).', 'dp[v] = ১..v মান ব্যবহার করে সেরা মোট: dp[v] = max(dp[v − ১], dp[v − ২] + v · cnt[v])।')],
  walkthrough: {
    input: '1 2 1 3 2 2 2 2 3',
    steps: [
      { state: 'gain: 1→2, 2→10, 3→6', text: L('cnt = 2, 5, 2.', 'cnt = ২, ৫, ২।') },
      { state: 'dp = 2, 10, max(10, 2 + 6) = 10', text: L('Taking all 2s wins.', 'সব ২ নেওয়াই জেতে।') },
    ],
  },
  complexity: { time: 'O(n + V)', space: 'O(V)', why: L('One pass over the values.', 'মানগুলোর ওপর একবার যাওয়া।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Take-or-skip DP over values', 'মানের ওপর নেওয়া-বা-বাদ DP'),
      idea: L('Skip v (dp[v − 1]) or take all copies of v (dp[v − 2] + v · cnt[v]).', 'v বাদ (dp[v − ১]) অথবা v-এর সব কপি নেওয়া (dp[v − ২] + v · cnt[v])।'),
      explain: [
        L('Taking v forbids v − 1, so the best total before it can only use values up to v − 2. Skipping v leaves dp[v − 1]. The answer reaches 10⁵ · 10⁵ = 10¹⁰, so use long long.', 'v নিলে v − ১ নিষিদ্ধ, তাই এর আগের সেরা মোট শুধু v − ২ পর্যন্ত মান ব্যবহার করতে পারে। v বাদ দিলে থাকে dp[v − ১]। উত্তর ১০⁵ · ১০⁵ = ১০¹⁰ পর্যন্ত যায়, তাই long long।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const int V = 100000;
    int n;
    cin >> n;
    vector<long long> cnt(V + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
    }
    vector<long long> dp(V + 1, 0);
    dp[1] = cnt[1];
    for (int v = 2; v <= V; v++) dp[v] = max(dp[v - 1], dp[v - 2] + v * cnt[v]);
    cout << dp[V] << "\n";
    return 0;
}
`,
      time: 'O(n + V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['vector', 'long-long', 'min-max'],
    },
    {
      id: 'rolling',
      kind: 'better',
      title: L('Two variables instead of an array', 'অ্যারের বদলে দুটি ভেরিয়েবল'),
      idea: L('dp[v] needs only dp[v − 1] and dp[v − 2], so keep just those two.', 'dp[v]-এর শুধু dp[v − ১] আর dp[v − ২] লাগে, তাই শুধু ওই দুটি রাখুন।'),
      explain: [L('Rolling the DP saves the second array. The pattern “take = prevSkip + gain, skip = max(prevTake, prevSkip)” is the same house-robber recurrence written with two states.', 'DP গড়িয়ে নিলে দ্বিতীয় অ্যারে বাঁচে। “take = prevSkip + gain, skip = max(prevTake, prevSkip)” প্যাটার্ন একই হাউস-রবার পুনরাবৃত্তি, দুটি অবস্থা দিয়ে লেখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const int V = 100000;
    int n;
    cin >> n;
    vector<long long> cnt(V + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
    }
    long long take = 0, skip = 0;   // best so far if the previous value was taken / skipped
    for (int v = 1; v <= V; v++) {
        long long nt = skip + v * cnt[v];
        long long ns = max(take, skip);
        take = nt;
        skip = ns;
    }
    cout << max(take, skip) << "\n";
    return 0;
}
`,
      time: 'O(n + V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['long-long'],
    },
    {
      id: 'memo',
      kind: 'method',
      title: L('Top-down recursion with memo', 'মেমোসহ ওপর থেকে রিকার্শন'),
      idea: L('best(v) = max(best(v − 1), best(v − 2) + v · cnt[v]), cached.', 'best(v) = max(best(v − ১), best(v − ২) + v · cnt[v]), ক্যাশসহ।'),
      explain: [L('Writing the recursion first is often the easiest way to find a DP; the memo array makes each value computed once. Here the depth would reach 10⁵, so compute it bottom-up from small v to keep the stack shallow.', 'আগে রিকার্শন লেখা প্রায়ই DP খোঁজার সহজ উপায়; memo অ্যারে প্রতিটি মান একবার হিসাব করায়। এখানে গভীরতা ১০⁵ পর্যন্ত যেত, তাই স্ট্যাক অগভীর রাখতে ছোট v থেকে নিচ থেকে ওপরে হিসাব করা হয়েছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const int V = 100000;
long long cnt[V + 1], memo[V + 1];
bool done[V + 1];

long long best(int v) {
    if (v <= 0) return 0;
    if (done[v]) return memo[v];
    done[v] = true;
    return memo[v] = max(best(v - 1), best(v - 2) + (long long)v * cnt[v]);
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
    }
    for (int v = 1; v <= V; v++) best(v);   // warm up from small v: shallow recursion
    cout << best(V) << "\n";
    return 0;
}
`,
      time: 'O(n + V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: '2', source: 'sample', note: sample(1) },
    { input: '3\n1 2 3', output: '4', source: 'sample', note: sample(2) },
    { input: '9\n1 2 1 3 2 2 2 2 3', output: '10', source: 'sample', note: sample(3) },
    { input: '3\n100000 100000 100000', output: '300000', source: 'own', note: L('Large values.', 'বড় মান।') },
  ],
  pitfalls: [
    L('A greedy “take the largest value first” fails on 1 1 1 2.', 'গ্রিডি “সবচেয়ে বড় মান আগে নাও” ১ ১ ১ ২-তে ব্যর্থ হয়।'),
    L('int overflow in v · cnt[v].', 'v · cnt[v]-এ int ওভারফ্লো।'),
  ],
  related: [{ id: '189A', name: 'Cut Ribbon', why: L('Another one-dimensional DP.', 'আরেকটি একমাত্রিক DP।') }],
  toolkit: ['vector', 'long-long'],
};
