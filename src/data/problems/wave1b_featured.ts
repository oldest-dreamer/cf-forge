import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const p160A: ProblemEntry = {
  id: '160A',
  contestId: 160,
  index: 'A',
  name: 'Twins',
  rating: 900,
  tags: ['greedy', 'sortings'],
  featuredFor: ['greedy', 'sortings'],
  why: L('The textbook first greedy: sort, take the biggest, and prove why that is optimal.', 'পাঠ্যবইয়ের প্রথম গ্রিডি: সর্ট করো, সবচেয়ে বড়টি নাও, আর কেন সেটাই সেরা তা প্রমাণ করো।'),
  statement: L(
    'There are n coins with values a₁ … aₙ. You want to take as few coins as possible so that the total value you take is strictly greater than the total value of the coins left for your twin. How many coins must you take?',
    'n-টি কয়েন আছে, মান a₁ … aₙ। আপনি যত কম সম্ভব কয়েন নিতে চান, যাতে আপনার নেওয়া মোট মান যমজ ভাইয়ের জন্য রেখে যাওয়া কয়েনের মোট মানের চেয়ে কঠোরভাবে বেশি হয়। কতগুলো কয়েন নিতে হবে?',
  ),
  input: L('n, then n coin values.', 'n, তারপর n-টি কয়েনের মান।'),
  output: L('The minimum number of coins.', 'সর্বনিম্ন কয়েনের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 100', '১ ≤ n ≤ ১০০'), L('1 ≤ aᵢ ≤ 100', '১ ≤ aᵢ ≤ ১০০')] },
  samples: [
    { input: '2\n3 3', output: '2', explain: L('One coin gives 3 vs 3, not strictly more, so take both.', 'একটি কয়েনে ৩ বনাম ৩, কঠোরভাবে বেশি নয়, তাই দুটিই নিন।') },
    { input: '3\n2 1 2', output: '2', explain: L('Take 2 and 2: 4 vs 1.', '২ আর ২ নিন: ৪ বনাম ১।') },
  ],
  observation: L(
    'Your sum S beats the rest when S > total − S, that is 2S > total. For a fixed number of coins, the largest coins give the largest S, so taking coins from largest to smallest reaches 2S > total as early as possible.',
    'আপনার যোগফল S বাকিটাকে ছাড়ায় যখন S > total − S, অর্থাৎ 2S > total। নির্দিষ্ট সংখ্যক কয়েনে সবচেয়ে বড় কয়েনগুলোই সবচেয়ে বড় S দেয়, তাই বড় থেকে ছোট ক্রমে নিলে যত আগে সম্ভব 2S > total হয়।',
  ),
  approach: [
    L('Compute the total. Sort the coins in decreasing order and take them one by one until twice your sum is more than the total.', 'মোট যোগফল বের করুন। কয়েনগুলো বড় থেকে ছোট ক্রমে সর্ট করে একটা একটা করে নিন, যতক্ষণ না আপনার যোগফলের দ্বিগুণ মোটের চেয়ে বেশি হয়।'),
    L('Comparing 2S > total avoids dividing and the off-by-one trap of total / 2.', '2S > total তুলনা করলে ভাগ লাগে না, আর total / 2-এর এক কম-বেশির ফাঁদও এড়ানো যায়।'),
  ],
  walkthrough: {
    input: '5\n1 4 2 4 3',
    steps: [
      { state: 'total = 14', text: L('Sorted: 4 4 3 2 1.', 'সাজানো: ৪ ৪ ৩ ২ ১।') },
      { state: 'S = 4, 8 ≤ 14', text: L('One coin is not enough.', 'একটি কয়েন যথেষ্ট নয়।') },
      { state: 'S = 8, 16 > 14', text: L('Two coins: 8 vs 6. Answer 2.', 'দুটি কয়েন: ৮ বনাম ৬। উত্তর ২।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('The sort dominates.', 'সর্টই প্রধান খরচ।') },
  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every subset', 'সব সাবসেট চেষ্টা'),
      idea: L('Check all 2ⁿ ways to choose coins and keep the smallest winning one. Only possible for tiny n.', 'কয়েন বাছাইয়ের সব ২ⁿ উপায় দেখে সবচেয়ে ছোট জেতার উপায়টি রাখুন। শুধু খুব ছোট n-এ সম্ভব।'),
      explain: [
        L('Each bit of mask says whether that coin is taken. For every mask, add the chosen coins and check 2S > total. With n = 100 there are 2¹⁰⁰ subsets, so this times out; it exists to prove the greedy right on small cases.', 'mask-এর প্রতিটি বিট বলে সেই কয়েন নেওয়া হলো কি না। প্রতিটি mask-এ বাছাই করা কয়েন যোগ করে 2S > total দেখুন। n = ১০০ হলে ২¹⁰⁰টি সাবসেট, তাই টাইম আউট হয়; এটি ছোট কেসে গ্রিডি সঠিক প্রমাণ করতে আছে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    int total = 0;
    for (auto& x : a) cin >> x, total += x;
    if (n > 20) return 0;                 // 2^n is too many beyond this
    int best = n;
    for (int mask = 0; mask < (1 << n); mask++) {
        int sum = 0, cnt = __builtin_popcount(mask);
        for (int i = 0; i < n; i++) if (mask >> i & 1) sum += a[i];
        if (2 * sum > total) best = min(best, cnt);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift', 'popcount'],
    },
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Sort descending, take the largest', 'বড় থেকে সর্ট করে সবচেয়ে বড়টি নেওয়া'),
      idea: L('Largest coins first until 2 · mine > total.', 'সবচেয়ে বড় কয়েন আগে, যতক্ষণ না 2 · mine > total।'),
      explain: [
        L('Exchange argument: suppose an optimal choice of k coins skips a larger coin but takes a smaller one. Swapping them raises the sum, so it still wins with k coins. Repeating the swap turns any optimal choice into “the k largest”, so checking prefixes of the sorted list is enough.', 'বিনিময় যুক্তি: ধরুন k-টি কয়েনের কোনো সেরা বাছাই একটি বড় কয়েন বাদ দিয়ে ছোট একটি নেয়। এদের অদলবদল করলে যোগফল বাড়ে, তাই k-টি কয়েনেই জেতে। বারবার অদলবদল করে যেকোনো সেরা বাছাইকে “k-টি সবচেয়ে বড়” বানানো যায়, তাই সাজানো তালিকার শুরুর অংশগুলো দেখাই যথেষ্ট।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    int total = 0;
    for (auto& x : a) {
        cin >> x;
        total += x;
    }
    sort(a.rbegin(), a.rend());
    int mine = 0, taken = 0;
    while (2 * mine <= total) mine += a[taken++];
    cout << taken << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'while-n'],
    },
    {
      id: 'counting',
      kind: 'better',
      title: L('Counting sort over values 1..100', '১..১০০ মানের ওপর কাউন্টিং সর্ট'),
      idea: L('Values are at most 100, so count each value and walk from 100 down.', 'মান সর্বোচ্চ ১০০, তাই প্রতিটি মান গুনে ১০০ থেকে নিচে নামুন।'),
      explain: [
        L('cnt[v] says how many coins have value v. Visiting v = 100, 99, … and taking coins one at a time is the same as reading the sorted list, but costs O(n + 100) with no comparison sort.', 'cnt[v] বলে v মানের কয়েন কতগুলো। v = ১০০, ৯৯, … ধরে একটা একটা কয়েন নেওয়া সাজানো তালিকা পড়ার মতোই, কিন্তু তুলনামূলক সর্ট ছাড়া O(n + ১০০) খরচ।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int cnt[101] = {}, total = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
        total += x;
    }
    int mine = 0, taken = 0;
    for (int v = 100; v >= 1 && 2 * mine <= total; v--) {
        while (cnt[v] > 0 && 2 * mine <= total) {
            mine += v;
            cnt[v]--;
            taken++;
        }
    }
    cout << taken << "\n";
    return 0;
}
`,
      time: 'O(n + V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['for-loop'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('greater<> sort and partial sums', 'greater<> সর্ট আর partial_sum'),
      idea: L('Sort descending, build prefix sums with partial_sum, and find the first prefix over half.', 'বড় থেকে সর্ট করুন, partial_sum দিয়ে প্রিফিক্স সাম বানান, আর অর্ধেকের বেশি প্রথম প্রিফিক্স খুঁজুন।'),
      explain: [
        L('After partial_sum, p[i] is the sum of the i + 1 largest coins. The prefix sums increase, so find_if returns the first one with 2 · p[i] > total, and its index + 1 is the answer.', 'partial_sum-এর পর p[i] হলো সবচেয়ে বড় i + ১-টি কয়েনের যোগফল। প্রিফিক্স সাম বাড়তে থাকে, তাই find_if প্রথম সেটি দেয় যেখানে 2 · p[i] > total, আর তার ইনডেক্স + ১ উত্তর।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int total = accumulate(a.begin(), a.end(), 0);
    sort(a.begin(), a.end(), greater<int>());
    vector<int> p(n);
    partial_sum(a.begin(), a.end(), p.begin());
    auto it = find_if(p.begin(), p.end(), [&](int s) { return 2 * s > total; });
    cout << (it - p.begin()) + 1 << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'accumulate', 'lambda'],
    },
    {
      id: 'remaining',
      kind: 'alt',
      title: L('Track what is left for the twin', 'যমজের জন্য বাকি অংশ গোনা'),
      idea: L('Keep both sums: move the largest coin from the twin’s pile to yours until yours is bigger.', 'দুটি যোগফলই রাখুন: আপনারটা বড় না হওয়া পর্যন্ত যমজের স্তূপ থেকে সবচেয়ে বড় কয়েন নিজের দিকে সরান।'),
      explain: [
        L('This version reads like the story: the twin starts with everything, and you take the biggest coin each time. A priority_queue hands you the largest remaining coin without sorting the whole list first.', 'এই সংস্করণ গল্পের মতো পড়া যায়: শুরুতে সব যমজের, আর আপনি প্রতিবার সবচেয়ে বড় কয়েনটি নেন। priority_queue পুরো তালিকা আগে সর্ট না করেই বাকিগুলোর মধ্যে সবচেয়ে বড় কয়েন দেয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    priority_queue<int> pile;
    int twin = 0, mine = 0, taken = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pile.push(x);
        twin += x;
    }
    while (mine <= twin) {
        int c = pile.top();
        pile.pop();
        mine += c;
        twin -= c;
        taken++;
    }
    cout << taken << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['priority-queue'],
    },
  ],
  tests: [
    { input: '2\n3 3', output: '2', source: 'sample', note: L('Ties are not enough.', 'সমান হলে যথেষ্ট নয়।') },
    { input: '3\n2 1 2', output: '2', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '1\n5', output: '1', source: 'own', note: L('A single coin.', 'একটি মাত্র কয়েন।') },
    { input: '5\n1 4 2 4 3', output: '2', source: 'own', note: L('Unsorted input.', 'অসাজানো ইনপুট।') },
    { input: '4\n100 1 1 1', output: '1', source: 'own', note: L('One big coin wins alone.', 'একটি বড় কয়েন একাই জেতে।') },
  ],
  pitfalls: [
    L('Using ≥ instead of >: a tie does not count as more.', '>-এর বদলে ≥ ব্যবহার: সমান হলে বেশি ধরা হয় না।'),
    L('Comparing with total / 2 using integer division, which rounds down.', 'পূর্ণসংখ্যা ভাগে total / 2-এর সঙ্গে তুলনা, যা নিচের দিকে রাউন্ড করে।'),
    L('Sorting ascending and taking from the front.', 'ছোট থেকে বড় সর্ট করে সামনে থেকে নেওয়া।'),
  ],
  related: [
    { id: '158B', name: 'Taxi', why: L('Another greedy with a short proof.', 'ছোট প্রমাণসহ আরেকটি গ্রিডি।') },
    { id: '1360B', name: 'Honest Coach', why: L('Sorting makes the answer obvious.', 'সর্টিং উত্তর স্পষ্ট করে দেয়।') },
  ],
  toolkit: ['sort', 'accumulate', 'priority-queue'],
};

export const p158B: ProblemEntry = {
  id: '158B',
  contestId: 158,
  index: 'B',
  name: 'Taxi',
  rating: 1100,
  tags: ['greedy', 'implementation'],
  featuredFor: ['greedy'],
  why: L('A packing problem where counting by size replaces any real search. The first greedy that needs case analysis.', 'একটি প্যাকিং প্রবলেম, যেখানে মাপ অনুযায়ী গণনাই আসল খোঁজের জায়গা নেয়। কেস বিশ্লেষণ লাগে এমন প্রথম গ্রিডি।'),
  statement: L(
    'n groups of children, each of size 1 to 4, want to go to a party. A taxi carries at most 4 children, and every group must ride in the same taxi (one taxi may carry several groups). What is the fewest number of taxis?',
    'n-টি শিশুদের দল, প্রতিটির আকার ১ থেকে ৪, একটি পার্টিতে যেতে চায়। একটি ট্যাক্সিতে সর্বোচ্চ ৪ জন শিশু ধরে, আর প্রতিটি দলকে একই ট্যাক্সিতে যেতে হবে (এক ট্যাক্সিতে একাধিক দল যেতে পারে)। সবচেয়ে কম কয়টি ট্যাক্সি লাগবে?',
  ),
  input: L('n, then the n group sizes.', 'n, তারপর n-টি দলের আকার।'),
  output: L('The minimum number of taxis.', 'সর্বনিম্ন ট্যাক্সির সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵'), L('1 ≤ sᵢ ≤ 4', '১ ≤ sᵢ ≤ ৪')] },
  samples: [
    { input: '5\n1 2 4 3 3', output: '4', explain: L('4 | 3+1 | 3 | 2.', '৪ | ৩+১ | ৩ | ২।') },
    { input: '8\n2 3 4 4 2 1 3 1', output: '5', explain: L('4 | 4 | 3+1 | 3+1 | 2+2.', '৪ | ৪ | ৩+১ | ৩+১ | ২+২।') },
  ],
  observation: L(
    'Groups of 4 and 3 each need their own taxi, and a 3 has exactly one free seat, which only a 1 can use. Two 2s fill a taxi. A leftover 2 can take up to two 1s. Remaining 1s go four per taxi.',
    '৪ আর ৩-এর প্রতিটি দলের নিজস্ব ট্যাক্সি লাগে, আর ৩-এর ঠিক একটি সিট ফাঁকা থাকে, যা শুধু ১ ব্যবহার করতে পারে। দুটি ২ একটি ট্যাক্সি ভরে। বাকি থাকা একটি ২ সর্বোচ্চ দুটি ১ নিতে পারে। বাকি ১-গুলো প্রতি ট্যাক্সিতে চারজন।',
  ),
  approach: [
    L('Count groups of each size, then apply the rules in order: 4s, 3s with 1s, pairs of 2s, a leftover 2 with up to two 1s, and the remaining 1s.', 'প্রতিটি আকারের দল গুনুন, তারপর ক্রমানুসারে নিয়ম প্রয়োগ করুন: ৪, ১-সহ ৩, ২-এর জোড়া, সর্বোচ্চ দুটি ১-সহ বাকি থাকা একটি ২, আর বাকি ১-গুলো।'),
  ],
  walkthrough: {
    input: '8\n2 3 4 4 2 1 3 1',
    steps: [
      { state: 'c = [2, 2, 2, 2]', text: L('Two of each size 1..4.', '১..৪ প্রতিটি আকারের দুটি করে।') },
      { state: '2 + 2 = 4 taxis', text: L('Two 4s, two 3s each carrying a 1.', 'দুটি ৪, দুটি ৩ প্রতিটি একটি ১ নিয়ে।') },
      { state: '+1 = 5', text: L('The two 2s share one taxi. No 1s left. Answer 5.', 'দুটি ২ একটি ট্যাক্সি ভাগ করে। কোনো ১ বাকি নেই। উত্তর ৫।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Count once, then constant work.', 'একবার গোনা, তারপর নির্দিষ্ট কাজ।') },
  solutions: [
    {
      id: 'counts',
      kind: 'optimal',
      title: L('Count by size and pack', 'আকার অনুযায়ী গুনে প্যাক'),
      idea: L('Four rules applied to the counts c₁ … c₄.', 'c₁ … c₄ গণনার ওপর চারটি নিয়ম।'),
      explain: [
        L('Every 4 and every 3 starts its own taxi. Each 3 takes one 1 if available, so max(0, c₁ − c₃) ones are still waiting. Pairs of 2s share taxis; if one 2 is left over, it takes a taxi and up to two waiting 1s. Finally the rest of the 1s ride four per taxi: ⌈ones / 4⌉.', 'প্রতিটি ৪ আর প্রতিটি ৩ নিজস্ব ট্যাক্সি নেয়। প্রতিটি ৩ পাওয়া গেলে একটি ১ নেয়, তাই max(0, c₁ − c₃)-টি ১ তখনও অপেক্ষায়। ২-এর জোড়া ট্যাক্সি ভাগ করে; একটি ২ বাকি থাকলে সে একটি ট্যাক্সি আর অপেক্ষায় থাকা সর্বোচ্চ দুটি ১ নেয়। শেষে বাকি ১-গুলো প্রতি ট্যাক্সিতে চারজন: ⌈ones / ৪⌉।'),
        L('Why optimal: nothing can join a 4; only a 1 can join a 3, and putting a 1 there never hurts because that seat is otherwise wasted. Two 2s exactly fill a taxi. Every rule uses seats that no other choice could use better.', 'কেন সেরা: ৪-এর সঙ্গে কেউ যেতে পারে না; ৩-এর সঙ্গে শুধু ১ যেতে পারে, আর সেখানে ১ রাখায় কখনো ক্ষতি নেই কারণ সিটটি না হলে নষ্ট হতো। দুটি ২ ঠিক একটি ট্যাক্সি ভরে। প্রতিটি নিয়ম এমন সিট ব্যবহার করে যা অন্য কোনো সিদ্ধান্ত এর চেয়ে ভালোভাবে ব্যবহার করতে পারত না।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int c[5] = {};
    for (int i = 0; i < n; i++) {
        int s;
        cin >> s;
        c[s]++;
    }
    int taxis = c[4] + c[3] + c[2] / 2;
    int ones = max(0, c[1] - c[3]);
    if (c[2] % 2 == 1) {
        taxis++;
        ones = max(0, ones - 2);
    }
    taxis += (ones + 3) / 4;
    cout << taxis << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div', 'min-max'],
    },
    {
      id: 'simulate',
      kind: 'method',
      title: L('Fill taxis largest group first', 'বড় দল আগে দিয়ে ট্যাক্সি ভরা'),
      idea: L('Sort groups descending; each taxi takes the biggest waiting group, then the smallest groups that still fit.', 'দলগুলো বড় থেকে সর্ট করুন; প্রতিটি ট্যাক্সি সবচেয়ে বড় অপেক্ষমাণ দল নেয়, তারপর যতগুলো আঁটে এমন সবচেয়ে ছোট দল।'),
      explain: [
        L('With two pointers on the sorted list, the left pointer takes the biggest group into a new taxi, and the right pointer adds the smallest groups while they fit. This is the general “first fit” greedy; it reaches the same counts as the rules without having to think of them.', 'সাজানো তালিকায় দুটি পয়েন্টার দিয়ে, বাম পয়েন্টার সবচেয়ে বড় দলটিকে নতুন ট্যাক্সিতে তোলে, আর ডান পয়েন্টার যতক্ষণ আঁটে সবচেয়ে ছোট দলগুলো যোগ করে। এটি সাধারণ “first fit” গ্রিডি; নিয়মগুলো না ভেবেই একই গণনায় পৌঁছায়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> s(n);
    for (auto& x : s) cin >> x;
    sort(s.rbegin(), s.rend());
    int l = 0, r = n - 1, taxis = 0;
    while (l <= r) {
        int seats = 4 - s[l++];
        while (l <= r && s[r] <= seats) seats -= s[r--];
        taxis++;
    }
    cout << taxis << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Search all packings (tiny n)', 'সব প্যাকিং খোঁজা (ছোট n)'),
      idea: L('Put each group into an existing taxi or a new one, trying every option.', 'প্রতিটি দলকে বিদ্যমান কোনো ট্যাক্সিতে বা নতুনটিতে রাখুন, সব বিকল্প চেষ্টা করে।'),
      explain: [
        L('A backtracking search over all ways to assign groups to taxis. It explodes for large n, but on small inputs it gives the true optimum and is the reference CF Forge uses to stress-test the greedy rules.', 'দলগুলোকে ট্যাক্সিতে ভাগ করার সব উপায়ের ওপর ব্যাকট্র্যাকিং খোঁজ। বড় n-এ এটি বিস্ফোরিত হয়, কিন্তু ছোট ইনপুটে আসল সেরা উত্তর দেয়, আর CF Forge গ্রিডি নিয়মগুলো স্ট্রেস-টেস্ট করতে এটাকেই রেফারেন্স হিসেবে ব্যবহার করে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, best;
vector<int> s, load;

void place(int i) {
    if ((int)load.size() >= best) return;           // cannot beat best
    if (i == n) { best = (int)load.size(); return; }
    for (int t = 0; t < (int)load.size(); t++) {
        if (load[t] + s[i] <= 4) {
            load[t] += s[i];
            place(i + 1);
            load[t] -= s[i];
        }
    }
    load.push_back(s[i]);
    place(i + 1);
    load.pop_back();
}

int main() {
    cin >> n;
    s.resize(n);
    for (auto& x : s) cin >> x;
    if (n > 12) return 0;   // exponential: tiny inputs only
    sort(s.rbegin(), s.rend());
    best = n;
    place(0);
    cout << best << "\n";
    return 0;
}
`,
      time: 'exponential',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
    {
      id: 'ones-math',
      kind: 'alt',
      title: L('Count seats instead of groups', 'দলের বদলে সিট গোনা'),
      idea: L('After placing 4s, 3s and 2s, compute the free seats and let the 1s use them before opening new taxis.', '৪, ৩ আর ২ বসানোর পর ফাঁকা সিট গুনুন, আর নতুন ট্যাক্সি খোলার আগে ১-গুলোকে সেগুলো ব্যবহার করতে দিন।'),
      explain: [
        L('Taxis for the big groups: c₄ + c₃ + ⌈c₂ / 2⌉. Their free seats: one per 3, plus 2 if there is a lone 2. Ones fill free seats first; the rest need ⌈rest / 4⌉ new taxis. Same answer as the rules, written as “capacity left over”, which generalises to other capacities.', 'বড় দলগুলোর ট্যাক্সি: c₄ + c₃ + ⌈c₂ / ২⌉। এদের ফাঁকা সিট: প্রতিটি ৩-এ একটি, আর একা একটি ২ থাকলে ২টি। ১-গুলো আগে ফাঁকা সিট ভরে; বাকিদের ⌈rest / ৪⌉-টি নতুন ট্যাক্সি লাগে। নিয়মগুলোর একই উত্তর, “বাকি ধারণক্ষমতা” হিসেবে লেখা, যা অন্য ধারণক্ষমতাতেও খাটে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long c[5] = {};
    for (int i = 0; i < n; i++) {
        int s;
        cin >> s;
        c[s]++;
    }
    long long taxis = c[4] + c[3] + (c[2] + 1) / 2;
    long long freeSeats = c[3] + (c[2] % 2 ? 2 : 0);
    long long rest = max(0LL, c[1] - freeSeats);
    taxis += (rest + 3) / 4;
    cout << taxis << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div'],
    },
    {
      id: 'map',
      kind: 'stl',
      title: L('Counts with count()', 'count() দিয়ে গণনা'),
      idea: L('Read into a vector and use std::count for each size, then the same four rules.', 'ভেক্টরে পড়ে প্রতিটি আকারের জন্য std::count ব্যবহার করুন, তারপর একই চারটি নিয়ম।'),
      explain: [
        L('std::count(begin, end, v) returns how many elements equal v. Calling it four times is O(4n), still linear, and keeps the counting code to one line per size.', 'std::count(begin, end, v) বলে কতগুলো উপাদান v-এর সমান। চারবার ডাকলে O(৪n), তবুও রৈখিক, আর প্রতি আকারের গণনার কোড এক লাইনে থাকে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> s(n);
    for (auto& x : s) cin >> x;
    int c1 = count(s.begin(), s.end(), 1), c2 = count(s.begin(), s.end(), 2);
    int c3 = count(s.begin(), s.end(), 3), c4 = count(s.begin(), s.end(), 4);
    int taxis = c4 + c3 + c2 / 2;
    int ones = max(0, c1 - c3);
    if (c2 % 2) {
        taxis++;
        ones = max(0, ones - 2);
    }
    cout << taxis + (ones + 3) / 4 << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find'],
    },
  ],
  tests: [
    { input: '5\n1 2 4 3 3', output: '4', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '8\n2 3 4 4 2 1 3 1', output: '5', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '5\n1 1 1 1 1', output: '2', source: 'own', note: L('Only ones.', 'শুধু ১।') },
    { input: '3\n2 1 1', output: '1', source: 'own', note: L('A lone 2 carries two 1s.', 'একা একটি ২ দুটি ১ নেয়।') },
    { input: '4\n3 3 3 1', output: '3', source: 'own', note: L('More 3s than 1s.', '১-এর চেয়ে বেশি ৩।') },
    { input: '1\n4', output: '1', source: 'own', note: L('A single full group.', 'একটি মাত্র পূর্ণ দল।') },
  ],
  pitfalls: [
    L('Letting a 2 ride with a 3: 5 children do not fit.', '৩-এর সঙ্গে ২-কে যেতে দেওয়া: ৫ জন আঁটে না।'),
    L('Forgetting that a lone 2 can still take two 1s.', 'ভুলে যাওয়া যে একা একটি ২ তবুও দুটি ১ নিতে পারে।'),
    L('Making c₁ − c₃ negative and then rounding a negative number.', 'c₁ − c₃ ঋণাত্মক করে তারপর একটি ঋণাত্মক সংখ্যা রাউন্ড করা।'),
  ],
  related: [{ id: '160A', name: 'Twins', why: L('Another greedy with a proof.', 'প্রমাণসহ আরেকটি গ্রিডি।') }],
  toolkit: ['ceil-div', 'sort', 'count-find'],
};

export const p271A: ProblemEntry = {
  id: '271A',
  contestId: 271,
  index: 'A',
  name: 'Beautiful Year',
  rating: 800,
  tags: ['brute-force'],
  featuredFor: ['brute-force'],
  why: L('The clearest “just try the next one” problem, and five different ways to test whether digits repeat.', 'সবচেয়ে পরিষ্কার “শুধু পরেরটা চেষ্টা করো” প্রবলেম, আর অঙ্ক পুনরাবৃত্ত হয় কি না পরীক্ষার পাঁচটি ভিন্ন উপায়।'),
  statement: L(
    'Given a year y, find the smallest year strictly greater than y whose four digits are all different.',
    'একটি বছর y দেওয়া আছে। y-এর চেয়ে কঠোরভাবে বড় সবচেয়ে ছোট বছরটি বের করুন, যার চারটি অঙ্কই আলাদা।',
  ),
  input: L('One integer y.', 'একটি পূর্ণসংখ্যা y।'),
  output: L('The next year with distinct digits.', 'আলাদা অঙ্কের পরের বছর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1000 ≤ y ≤ 9000; the answer exists', '১০০০ ≤ y ≤ ৯০০০; উত্তর আছে')] },
  samples: [
    { input: '1987', output: '2013', explain: L('Every year from 1988 to 2012 repeats a digit.', '১৯৮৮ থেকে ২০১২ প্রতিটি বছরে কোনো অঙ্ক পুনরাবৃত্ত হয়।') },
    { input: '2013', output: '2014', explain: L('2014 already has distinct digits.', '২০১৪-তে আগেই সব অঙ্ক আলাদা।') },
  ],
  observation: L(
    'The answer is at most 9012, so at most about 8000 candidates exist, each checked in a few steps. Brute force is far below any time limit.',
    'উত্তর সর্বোচ্চ ৯০১২, তাই প্রায় ৮০০০টির বেশি সম্ভাব্য উত্তর নেই, প্রতিটি কয়েক ধাপে যাচাই। ব্রুট ফোর্স যেকোনো সময়সীমার অনেক নিচে।',
  ),
  approach: [
    L('Start from y + 1 and increase until the digits are distinct. Put the digit test in its own function.', 'y + ১ থেকে শুরু করে অঙ্কগুলো আলাদা না হওয়া পর্যন্ত বাড়ান। অঙ্ক পরীক্ষাটি আলাদা ফাংশনে রাখুন।'),
  ],
  walkthrough: {
    input: '2013',
    steps: [
      { state: '2014', text: L('Digits 2, 0, 1, 4: all different. Done.', 'অঙ্ক ২, ০, ১, ৪: সব আলাদা। শেষ।') },
    ],
  },
  complexity: { time: 'O(answer − y)', space: 'O(1)', why: L('At most a few thousand candidates.', 'সর্বোচ্চ কয়েক হাজার সম্ভাব্য উত্তর।') },
  solutions: [
    {
      id: 'pairs',
      kind: 'brute',
      title: L('Compare every pair of digits', 'প্রতিটি অঙ্কের জোড়া তুলনা'),
      idea: L('Four digits form six pairs; the year is good if no pair is equal.', 'চারটি অঙ্কে ছয়টি জোড়া; কোনো জোড়া সমান না হলে বছরটি ভালো।'),
      explain: [
        L('Extract the digits with / and %, then two nested loops compare each pair once (j > i). This is the most direct reading of “all digits different”.', '/ আর % দিয়ে অঙ্কগুলো বের করুন, তারপর দুটি নেস্টেড লুপ প্রতিটি জোড়া একবার তুলনা করে (j > i)। “সব অঙ্ক আলাদা”-র সবচেয়ে সরাসরি পাঠ।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool distinctDigits(int y) {
    int d[4] = {y / 1000, y / 100 % 10, y / 10 % 10, y % 10};
    for (int i = 0; i < 4; i++)
        for (int j = i + 1; j < 4; j++)
            if (d[i] == d[j]) return false;
    return true;
}

int main() {
    int y;
    cin >> y;
    do y++; while (!distinctDigits(y));
    cout << y << "\n";
    return 0;
}
`,
      time: 'O(answer − y)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions', 'modulo'],
    },
    {
      id: 'seen',
      kind: 'better',
      title: L('Mark seen digits', 'দেখা অঙ্ক চিহ্নিত করা'),
      idea: L('Walk through the digits with a seen[10] array; a repeat shows up as an already-marked digit.', 'seen[10] অ্যারে নিয়ে অঙ্কগুলোর ওপর চলুন; পুনরাবৃত্তি মানে আগেই চিহ্নিত অঙ্ক।'),
      explain: [
        L('Instead of comparing pairs, remember which digits appeared. This scales to numbers with many digits, where pair comparison would be slow.', 'জোড়া তুলনার বদলে মনে রাখুন কোন অঙ্কগুলো এসেছে। অনেক অঙ্কের সংখ্যাতেও এটি কাজ করে, যেখানে জোড়া তুলনা ধীর হতো।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool distinctDigits(int y) {
    bool seen[10] = {};
    while (y > 0) {
        int d = y % 10;
        if (seen[d]) return false;
        seen[d] = true;
        y /= 10;
    }
    return true;
}

int main() {
    int y;
    cin >> y;
    do y++; while (!distinctDigits(y));
    cout << y << "\n";
    return 0;
}
`,
      time: 'O(answer − y)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions', 'while-n'],
    },
    {
      id: 'set',
      kind: 'stl',
      title: L('A set of characters', 'অক্ষরের একটি set'),
      idea: L('Put the digits of to_string(y) into a set; four distinct digits make a set of size 4.', 'to_string(y)-এর অঙ্কগুলো একটি set-এ রাখুন; চারটি আলাদা অঙ্কে set-এর আকার ৪।'),
      explain: [
        L('A set drops duplicates automatically, so comparing its size with the number of digits answers the question in one line.', 'set নিজেই ডুপ্লিকেট বাদ দেয়, তাই এর আকার অঙ্কের সংখ্যার সঙ্গে মেলালেই এক লাইনে উত্তর।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int y;
    cin >> y;
    while (true) {
        y++;
        string s = to_string(y);
        if (set<char>(s.begin(), s.end()).size() == s.size()) break;
    }
    cout << y << "\n";
    return 0;
}
`,
      time: 'O(answer − y)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['set', 'to-string'],
    },
    {
      id: 'sort-unique',
      kind: 'method',
      title: L('Sort the digits and look for neighbours', 'অঙ্ক সর্ট করে পাশাপাশি দেখা'),
      idea: L('After sorting the digit string, equal digits sit next to each other; unique finds them.', 'অঙ্কের স্ট্রিং সর্ট করলে সমান অঙ্কগুলো পাশাপাশি বসে; unique সেগুলো খুঁজে পায়।'),
      explain: [
        L('This is the “sort, then compare neighbours” idea from the sortings tag. If unique returns the end iterator, nothing was merged, so all digits differ.', 'এটি সর্টিং ট্যাগের “সর্ট করো, তারপর পাশাপাশি তুলনা করো” আইডিয়া। unique যদি শেষের ইটারেটর ফেরত দেয়, কিছুই মেলানো হয়নি, তাই সব অঙ্ক আলাদা।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool distinctDigits(int y) {
    string s = to_string(y);
    sort(s.begin(), s.end());
    return unique(s.begin(), s.end()) == s.end();
}

int main() {
    int y;
    cin >> y;
    do y++; while (!distinctDigits(y));
    cout << y << "\n";
    return 0;
}
`,
      time: 'O(answer − y)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique'],
    },
    {
      id: 'bitmask',
      kind: 'alt',
      title: L('A 10-bit mask of digits', 'অঙ্কের ১০-বিট মাস্ক'),
      idea: L('Set bit d for each digit d; a digit is repeated if its bit is already on.', 'প্রতিটি অঙ্ক d-এর জন্য বিট d চালু করুন; বিট আগেই চালু থাকলে অঙ্কটি পুনরাবৃত্ত।'),
      explain: [
        L('The same as the seen array, packed into one integer: mask >> d & 1 tests the bit and mask |= 1 << d sets it. Bitmasks of digits or letters are a common compact trick.', 'seen অ্যারের মতোই, একটি পূর্ণসংখ্যায় ভরা: mask >> d & 1 বিট পরীক্ষা করে আর mask |= 1 << d সেটি চালু করে। অঙ্ক বা অক্ষরের বিটমাস্ক একটি প্রচলিত সংক্ষিপ্ত কৌশল।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool distinctDigits(int y) {
    int mask = 0;
    for (; y > 0; y /= 10) {
        int d = y % 10;
        if (mask >> d & 1) return false;
        mask |= 1 << d;
    }
    return true;
}

int main() {
    int y;
    cin >> y;
    do y++; while (!distinctDigits(y));
    cout << y << "\n";
    return 0;
}
`,
      time: 'O(answer − y)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'bitwise-and'],
    },
  ],
  tests: [
    { input: '1987', output: '2013', source: 'sample', note: L('A long gap.', 'লম্বা ব্যবধান।') },
    { input: '2013', output: '2014', source: 'sample', note: L('The very next year.', 'ঠিক পরের বছর।') },
    { input: '1000', output: '1023', source: 'own', note: L('Smallest input.', 'সবচেয়ে ছোট ইনপুট।') },
    { input: '9000', output: '9012', source: 'own', note: L('Largest input.', 'সবচেয়ে বড় ইনপুট।') },
    { input: '8999', output: '9012', source: 'own', note: L('Crossing into a new thousand.', 'নতুন হাজারে প্রবেশ।') },
  ],
  pitfalls: [
    L('Checking y itself: the answer must be strictly greater.', 'y নিজেকে পরীক্ষা করা: উত্তর কঠোরভাবে বড় হতে হবে।'),
    L('Comparing only adjacent digits without sorting: 1213 has no equal neighbours but repeats 1.', 'সর্ট ছাড়া শুধু পাশাপাশি অঙ্ক তুলনা: ১২১৩-তে সমান পাশাপাশি নেই কিন্তু ১ পুনরাবৃত্ত।'),
  ],
  related: [{ id: '122A', name: 'Lucky Division', why: L('Another small search space.', 'আরেকটি ছোট খোঁজার পরিসর।') }],
  toolkit: ['set', 'reverse-unique', 'bit-shift'],
};

export const p236A: ProblemEntry = {
  id: '236A',
  contestId: 236,
  index: 'A',
  name: 'Boy or Girl',
  rating: 800,
  tags: ['brute-force', 'implementation', 'strings'],
  featuredFor: ['strings'],
  why: L('Counting distinct characters, the most common string sub-task, done five ways.', 'ভিন্ন অক্ষর গোনা, স্ট্রিংয়ের সবচেয়ে প্রচলিত ছোট কাজ, পাঁচ ভাবে।'),
  statement: L(
    'A user name of lowercase letters is given. If the number of different letters in it is odd, print IGNORE HIM!; if it is even, print CHAT WITH HER!.',
    'ছোট হাতের অক্ষরের একটি ইউজারনেম দেওয়া আছে। এতে আলাদা অক্ষরের সংখ্যা বিজোড় হলে IGNORE HIM! প্রিন্ট করুন; জোড় হলে CHAT WITH HER! প্রিন্ট করুন।',
  ),
  input: L('One non-empty string of lowercase letters.', 'ছোট হাতের অক্ষরের একটি খালি নয় এমন স্ট্রিং।'),
  output: L('CHAT WITH HER! or IGNORE HIM!', 'CHAT WITH HER! অথবা IGNORE HIM!'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Length at most 100', 'দৈর্ঘ্য সর্বোচ্চ ১০০')] },
  samples: [
    { input: 'wjmzbmr', output: 'CHAT WITH HER!', explain: L('Distinct letters w, j, m, z, b, r: 6, even.', 'ভিন্ন অক্ষর w, j, m, z, b, r: ৬, জোড়।') },
    { input: 'xiaodao', output: 'IGNORE HIM!', explain: L('x, i, a, o, d: 5, odd.', 'x, i, a, o, d: ৫, বিজোড়।') },
    { input: 'sevenkplus', output: 'CHAT WITH HER!', explain: L('s, e, v, n, k, p, l, u: 8.', 's, e, v, n, k, p, l, u: ৮।') },
  ],
  observation: L('Only the count of distinct letters matters, and there are at most 26 of them.', 'শুধু ভিন্ন অক্ষরের সংখ্যা গুরুত্বপূর্ণ, আর তা সর্বোচ্চ ২৬।'),
  approach: [L('Count distinct letters, then test the count with % 2.', 'ভিন্ন অক্ষর গুনে % 2 দিয়ে গণনা পরীক্ষা করুন।')],
  walkthrough: {
    input: 'xiaodao',
    steps: [
      { state: '{x, i, a, o, d}', text: L('The second a and o are already counted.', 'দ্বিতীয় a আর o আগেই গোনা।') },
      { state: '5 % 2 = 1', text: L('Odd: IGNORE HIM!', 'বিজোড়: IGNORE HIM!') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass; at most 26 distinct letters.', 'একবার যাওয়া; সর্বোচ্চ ২৬টি ভিন্ন অক্ষর।') },
  solutions: [
    {
      id: 'set',
      kind: 'optimal',
      title: L('Put the letters in a set', 'অক্ষরগুলো set-এ রাখা'),
      idea: L('A set keeps each letter once; its size is the distinct count.', 'set প্রতিটি অক্ষর একবার রাখে; এর আকারই ভিন্ন অক্ষরের সংখ্যা।'),
      explain: [L('Constructing set<char> from the string’s range inserts every character and discards repeats. Then size() % 2 decides.', 'স্ট্রিংয়ের পরিসর থেকে set<char> বানালে প্রতিটি অক্ষর ঢোকে আর পুনরাবৃত্তি বাদ যায়। তারপর size() % 2 সিদ্ধান্ত দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    set<char> letters(s.begin(), s.end());
    cout << (letters.size() % 2 == 0 ? "CHAT WITH HER!" : "IGNORE HIM!") << "\n";
    return 0;
}
`,
      time: 'O(n log 26)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['set', 'ternary'],
    },
    {
      id: 'array',
      kind: 'method',
      title: L('A seen[26] array', 'একটি seen[26] অ্যারে'),
      idea: L('Mark each letter c at seen[c − \'a\'] and count the marks.', 'প্রতিটি অক্ষর c-কে seen[c − \'a\']-এ চিহ্নিত করে চিহ্নগুলো গুনুন।'),
      explain: [L('Count a letter only the first time it is marked. This is the standard letter-index trick and runs in pure O(n).', 'একটি অক্ষর শুধু প্রথমবার চিহ্নিত হলে গুনুন। এটি প্রচলিত অক্ষর-ইনডেক্স কৌশল আর পুরোপুরি O(n)-এ চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    bool seen[26] = {};
    int distinct = 0;
    for (char c : s) {
        if (!seen[c - 'a']) {
            seen[c - 'a'] = true;
            distinct++;
        }
    }
    cout << (distinct % 2 == 0 ? "CHAT WITH HER!" : "IGNORE HIM!") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['char-count'],
    },
    {
      id: 'sort-unique',
      kind: 'stl',
      title: L('sort + unique', 'sort + unique'),
      idea: L('Sort the letters so repeats are adjacent, then unique keeps one of each.', 'অক্ষরগুলো সর্ট করুন যাতে পুনরাবৃত্তিগুলো পাশাপাশি থাকে, তারপর unique প্রতিটির একটি রাখে।'),
      explain: [L('After unique, the distance from begin to the returned iterator is the number of distinct letters. Useful when you also need the distinct letters themselves, in order.', 'unique-এর পর begin থেকে ফেরত আসা ইটারেটরের দূরত্বই ভিন্ন অক্ষরের সংখ্যা। ভিন্ন অক্ষরগুলোও ক্রমানুসারে দরকার হলে এটি কাজে লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    sort(s.begin(), s.end());
    int distinct = unique(s.begin(), s.end()) - s.begin();
    cout << (distinct % 2 == 0 ? "CHAT WITH HER!" : "IGNORE HIM!") << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique'],
    },
    {
      id: 'bitmask',
      kind: 'alt',
      title: L('A 26-bit mask and popcount', '২৬-বিটের মাস্ক আর popcount'),
      idea: L('Set bit c − \'a\' for each letter; the number of set bits is the distinct count.', 'প্রতিটি অক্ষরের জন্য বিট c − \'a\' চালু করুন; চালু বিটের সংখ্যাই ভিন্ন অক্ষরের সংখ্যা।'),
      explain: [L('Setting a bit twice changes nothing, so duplicates vanish on their own. __builtin_popcount counts the set bits in one instruction.', 'একটি বিট দুবার চালু করলে কিছু বদলায় না, তাই ডুপ্লিকেট নিজেই বাদ পড়ে। __builtin_popcount এক নির্দেশেই চালু বিট গোনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int mask = 0;
    for (char c : s) mask |= 1 << (c - 'a');
    cout << (__builtin_popcount(mask) % 2 == 0 ? "CHAT WITH HER!" : "IGNORE HIM!") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'popcount'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check each letter of the alphabet', 'বর্ণমালার প্রতিটি অক্ষর পরীক্ষা'),
      idea: L('For each of the 26 letters, search the name for it.', '২৬টি অক্ষরের প্রতিটির জন্য নামে খুঁজুন।'),
      explain: [L('26 searches over at most 100 characters is 2600 steps. It turns “distinct letters” into “how many letters of the alphabet appear”, which is sometimes the easier way to think.', 'সর্বোচ্চ ১০০ অক্ষরে ২৬ বার খোঁজা মানে ২৬০০ ধাপ। এটি “ভিন্ন অক্ষর”-কে “বর্ণমালার কতগুলো অক্ষর আছে”-তে বদলে দেয়, যা কখনো ভাবতে সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int distinct = 0;
    for (char c = 'a'; c <= 'z'; c++) {
        if (s.find(c) != string::npos) distinct++;
    }
    cout << (distinct % 2 == 0 ? "CHAT WITH HER!" : "IGNORE HIM!") << "\n";
    return 0;
}
`,
      time: 'O(26 · n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics', 'count-find'],
    },
  ],
  tests: [
    { input: 'wjmzbmr', output: 'CHAT WITH HER!', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'xiaodao', output: 'IGNORE HIM!', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'sevenkplus', output: 'CHAT WITH HER!', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: 'a', output: 'IGNORE HIM!', source: 'own', note: L('One letter: 1 is odd.', 'এক অক্ষর: ১ বিজোড়।') },
    { input: 'aaaaab', output: 'CHAT WITH HER!', source: 'own', note: L('Many repeats.', 'অনেক পুনরাবৃত্তি।') },
  ],
  pitfalls: [
    L('Using the length of the name instead of the number of distinct letters.', 'ভিন্ন অক্ষরের সংখ্যার বদলে নামের দৈর্ঘ্য ব্যবহার করা।'),
    L('Typos in the output: the exclamation marks and capitals must match exactly.', 'আউটপুটে টাইপো: বিস্ময়চিহ্ন আর বড় হাতের অক্ষর হুবহু মিলতে হবে।'),
  ],
  related: [{ id: '118A', name: 'String Task', why: L('More character-by-character work.', 'অক্ষর ধরে ধরে আরও কাজ।') }],
  toolkit: ['set', 'char-count', 'popcount'],
};

export const p118A: ProblemEntry = {
  id: '118A',
  contestId: 118,
  index: 'A',
  name: 'String Task',
  rating: 1000,
  tags: ['implementation', 'strings'],
  featuredFor: ['strings'],
  why: L('Three rules applied to every character: the template for “transform a string” problems.', 'প্রতিটি অক্ষরে তিনটি নিয়ম: “স্ট্রিং রূপান্তর করো” প্রবলেমের ছাঁচ।'),
  statement: L(
    'Given a string of uppercase and lowercase Latin letters, delete every vowel, put a dot before every remaining consonant, and turn every uppercase consonant into lowercase. The vowels are A, O, Y, E, U and I.',
    'বড় ও ছোট হাতের ল্যাটিন অক্ষরের একটি স্ট্রিং দেওয়া আছে। প্রতিটি স্বরবর্ণ মুছুন, বাকি প্রতিটি ব্যঞ্জনবর্ণের আগে একটি বিন্দু দিন, আর প্রতিটি বড় হাতের ব্যঞ্জনবর্ণকে ছোট হাতের করুন। স্বরবর্ণ হলো A, O, Y, E, U আর I।',
  ),
  input: L('One string of length 1 to 100.', '১ থেকে ১০০ দৈর্ঘ্যের একটি স্ট্রিং।'),
  output: L('The processed string (it may be empty).', 'প্রক্রিয়াকৃত স্ট্রিং (খালি হতে পারে)।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Note that Y is a vowel here.', 'খেয়াল করুন এখানে Y স্বরবর্ণ।')] },
  samples: [
    { input: 'tour', output: '.t.r', explain: L('o and u are removed.', 'o আর u মুছে যায়।') },
    { input: 'Codeforces', output: '.c.d.f.r.c.s', explain: L('C becomes .c, vowels vanish.', 'C হয় .c, স্বরবর্ণ উধাও।') },
    { input: 'aBAcAba', output: '.b.c.b', explain: L('Only B, c and b remain.', 'শুধু B, c আর b থাকে।') },
  ],
  observation: L('Each character is handled independently: lowercase it, skip it if it is a vowel, otherwise output a dot and the character.', 'প্রতিটি অক্ষর আলাদাভাবে সামলানো হয়: ছোট হাতের করুন, স্বরবর্ণ হলে বাদ দিন, না হলে একটি বিন্দু আর অক্ষরটি দিন।'),
  approach: [L('Loop over the characters, apply tolower first so the vowel test only needs lowercase letters, and append to the answer.', 'অক্ষরগুলোর ওপর লুপ চালান, আগে tolower প্রয়োগ করুন যাতে স্বরবর্ণ পরীক্ষায় শুধু ছোট হাতের অক্ষর লাগে, আর উত্তরে যোগ করুন।')],
  walkthrough: {
    input: 'aBAcAba',
    steps: [
      { state: 'a, A, A, a', text: L('Vowels: skipped.', 'স্বরবর্ণ: বাদ।') },
      { state: 'B → .b, c → .c, b → .b', text: L('Consonants get a dot. Result .b.c.b.', 'ব্যঞ্জনবর্ণে বিন্দু। ফল .b.c.b।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over the string.', 'স্ট্রিংয়ের ওপর একবার যাওয়া।') },
  solutions: [
    {
      id: 'find',
      kind: 'optimal',
      title: L('Lowercase, then test against "aoyeui"', 'ছোট হাতের করে "aoyeui"-এর সঙ্গে পরীক্ষা'),
      idea: L('A vowel string plus find() makes the vowel test one line.', 'একটি স্বরবর্ণ স্ট্রিং আর find() দিয়ে স্বরবর্ণ পরীক্ষা এক লাইনে।'),
      explain: [L('Lowercasing first means the vowel list has six letters, not twelve, and the output is already lowercase. s += c and s += \'.\' append in O(1).', 'আগে ছোট হাতের করলে স্বরবর্ণের তালিকায় বারোটির বদলে ছয়টি অক্ষর লাগে, আর আউটপুট আগেই ছোট হাতের হয়। s += c আর s += \'.\' O(1)-এ যোগ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, out;
    cin >> s;
    const string vowels = "aoyeui";
    for (char c : s) {
        c = tolower(c);
        if (vowels.find(c) != string::npos) continue;
        out += '.';
        out += c;
    }
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'break-continue'],
    },
    {
      id: 'switch',
      kind: 'method',
      title: L('A helper with a switch', 'switch দিয়ে একটি সহায়ক ফাংশন'),
      idea: L('isVowel(c) lists the six vowels in a switch.', 'isVowel(c) একটি switch-এ ছয়টি স্বরবর্ণ তালিকা করে।'),
      explain: [L('Naming the test isVowel makes the main loop read like the statement. A switch with fall-through cases is a compact way to match several characters.', 'পরীক্ষাটির নাম isVowel দিলে মূল লুপ স্টেটমেন্টের মতো পড়া যায়। fall-through কেসসহ switch একাধিক অক্ষর মেলানোর সংক্ষিপ্ত উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isVowel(char c) {
    switch (c) {
        case 'a': case 'o': case 'y': case 'e': case 'u': case 'i':
            return true;
        default:
            return false;
    }
}

int main() {
    string s;
    cin >> s;
    for (char c : s) {
        c = tolower(c);
        if (!isVowel(c)) cout << '.' << c;
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions'],
    },
    {
      id: 'table',
      kind: 'better',
      title: L('A lookup table of vowels', 'স্বরবর্ণের লুকআপ টেবিল'),
      idea: L('Precompute isVowel[26] once; each test is then a single array read.', 'একবার isVowel[26] বানিয়ে নিন; তারপর প্রতিটি পরীক্ষা একটি অ্যারে পড়া।'),
      explain: [L('Lookup tables trade a little memory for speed and clarity. Here the gain is tiny, but the idea matters in tighter problems where the same test runs millions of times.', 'লুকআপ টেবিল সামান্য মেমোরির বিনিময়ে গতি আর স্পষ্টতা দেয়। এখানে লাভ সামান্য, কিন্তু যেখানে একই পরীক্ষা লাখ লাখ বার চলে সেখানে আইডিয়াটি জরুরি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    bool isVowel[26] = {};
    for (char v : string("aoyeui")) isVowel[v - 'a'] = true;
    string s, out;
    cin >> s;
    for (char c : s) {
        c = tolower(c);
        if (!isVowel[c - 'a']) {
            out.push_back('.');
            out.push_back(c);
        }
    }
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['char-count'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('transform, remove_if, then insert dots', 'transform, remove_if, তারপর বিন্দু বসানো'),
      idea: L('Lowercase with transform, delete vowels with erase(remove_if), then build the dotted string.', 'transform দিয়ে ছোট হাতের করুন, erase(remove_if) দিয়ে স্বরবর্ণ মুছুন, তারপর বিন্দুযুক্ত স্ট্রিং বানান।'),
      explain: [L('The erase–remove idiom deletes every element matching a rule in one O(n) pass: remove_if shifts the kept elements forward and erase cuts the tail. It is worth recognising because it appears in many solutions.', 'erase–remove ইডিয়ম একটি নিয়ম মেলে এমন সব উপাদান একবার O(n)-এ মুছে ফেলে: remove_if রাখা উপাদানগুলো সামনে সরায় আর erase শেষের অংশ কেটে দেয়। এটি চিনে রাখা দরকার কারণ অনেক সমাধানে আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    transform(s.begin(), s.end(), s.begin(), [](unsigned char c) { return tolower(c); });
    s.erase(remove_if(s.begin(), s.end(), [](char c) { return string("aoyeui").find(c) != string::npos; }), s.end());
    string out;
    for (char c : s) out += string(".") + c;
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Three passes, one rule each', 'তিনবার চলা, প্রতিবার একটি নিয়ম'),
      idea: L('Apply the three rules one after another, each as its own loop, exactly as worded.', 'তিনটি নিয়ম একটির পর একটি প্রয়োগ করুন, প্রতিটি আলাদা লুপে, ঠিক যেমন লেখা।'),
      explain: [L('When a statement lists several rules, applying them in separate passes is the easiest way to be sure each one is right. Later you can merge the passes, as the first solution does.', 'স্টেটমেন্টে কয়েকটি নিয়ম থাকলে আলাদা আলাদা পাসে প্রয়োগ করাই প্রতিটি নিয়ম ঠিক হলো কি না নিশ্চিত হওয়ার সহজ উপায়। পরে প্রথম সমাধানের মতো পাসগুলো মেলানো যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    string noVowels;
    for (char c : s)                                   // rule 1: delete vowels
        if (string("AOYEUIaoyeui").find(c) == string::npos) noVowels += c;
    for (char& c : noVowels) c = tolower(c);          // rule 3: lowercase
    string out;
    for (char c : noVowels) out += '.', out += c;     // rule 2: dots
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: 'tour', output: '.t.r', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'Codeforces', output: '.c.d.f.r.c.s', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'aBAcAba', output: '.b.c.b', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: 'Yy', output: '', source: 'own', note: L('Y is a vowel; the output is empty.', 'Y স্বরবর্ণ; আউটপুট খালি।') },
    { input: 'XYZ', output: '.x.z', source: 'own', note: L('Uppercase consonants become lowercase.', 'বড় হাতের ব্যঞ্জনবর্ণ ছোট হাতের হয়।') },
  ],
  pitfalls: [
    L('Leaving out Y from the vowels.', 'স্বরবর্ণ থেকে Y বাদ দেওয়া।'),
    L('Checking vowels before lowercasing, so uppercase vowels slip through.', 'ছোট হাতের করার আগে স্বরবর্ণ দেখা, ফলে বড় হাতের স্বরবর্ণ ফসকে যায়।'),
  ],
  related: [{ id: '236A', name: 'Boy or Girl', why: L('Another per-character string task.', 'অক্ষর ধরে আরেকটি স্ট্রিংয়ের কাজ।') }],
  toolkit: ['string-basics', 'lambda'],
};

export const p1360B: ProblemEntry = {
  id: '1360B',
  contestId: 1360,
  index: 'B',
  name: 'Honest Coach',
  rating: 800,
  tags: ['greedy', 'sortings'],
  featuredFor: ['sortings'],
  why: L('Shows why sorting turns “best split” into “smallest neighbouring gap”.', 'দেখায় কেন সর্টিং “সেরা ভাগ”-কে “সবচেয়ে ছোট পাশাপাশি ফাঁক”-এ বদলে দেয়।'),
  statement: L(
    'n athletes have strengths s₁ … sₙ. Split them into two non-empty teams A and B so that |max(A) − min(B)| is as small as possible. Print that smallest value. There are t test cases.',
    'n জন খেলোয়াড়ের শক্তি s₁ … sₙ। তাদের দুটি খালি নয় এমন দল A আর B-তে ভাগ করুন যাতে |max(A) − min(B)| যত ছোট সম্ভব হয়। সেই সবচেয়ে ছোট মান প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, then n strengths.', 't; প্রতিটি টেস্টে n, তারপর n-টি শক্তি।'),
  output: L('The minimum value for each test.', 'প্রতিটি টেস্টের সর্বনিম্ন মান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ t ≤ 1000, 2 ≤ n ≤ 50', '১ ≤ t ≤ ১০০০, ২ ≤ n ≤ ৫০'), L('1 ≤ sᵢ ≤ 1000', '১ ≤ sᵢ ≤ ১০০০')] },
  samples: [
    {
      input: '5\n5\n3 1 2 6 4\n6\n2 1 3 2 4 3\n4\n7 9 3 1\n2\n1 1000\n3\n100 150 200',
      output: '1\n0\n2\n999\n50',
      explain: L('First test: sorted 1 2 3 4 6, the smallest gap is 1 (e.g. A = {1, 2}, B = {3, 4, 6}).', 'প্রথম টেস্ট: সাজানো ১ ২ ৩ ৪ ৬, সবচেয়ে ছোট ফাঁক ১ (যেমন A = {১, ২}, B = {৩, ৪, ৬})।'),
    },
  ],
  observation: L(
    'Sort the strengths. Cutting the sorted list into a prefix (team A) and a suffix (team B) costs exactly one neighbouring gap, and no split can beat the smallest neighbouring gap. So the answer is the smallest difference between adjacent sorted values.',
    'শক্তিগুলো সর্ট করুন। সাজানো তালিকাকে একটি শুরুর অংশ (দল A) আর একটি শেষের অংশে (দল B) কাটলে খরচ ঠিক একটি পাশাপাশি ফাঁক, আর কোনো ভাগ সবচেয়ে ছোট পাশাপাশি ফাঁকের চেয়ে ভালো করতে পারে না। তাই উত্তর হলো সাজানো মানগুলোর পাশাপাশি সবচেয়ে ছোট পার্থক্য।',
  ),
  approach: [
    L('Sort. For the split at position i, A = s[0..i − 1] and B = s[i..n − 1], so max(A) − min(B) is s[i] − s[i − 1]. Take the minimum over i.', 'সর্ট করুন। অবস্থান i-তে ভাগ করলে A = s[0..i − 1] আর B = s[i..n − 1], তাই max(A) − min(B) হলো s[i] − s[i − 1]। সব i-এর ওপর সর্বনিম্ন নিন।'),
  ],
  walkthrough: {
    input: '7 9 3 1',
    steps: [
      { state: '1 3 7 9', text: L('Sorted.', 'সাজানো।') },
      { state: 'gaps 2, 4, 2', text: L('The smallest is 2.', 'সবচেয়ে ছোট ২।') },
    ],
  },
  complexity: { time: 'O(n log n) per test', space: 'O(n)', why: L('Sorting each test.', 'প্রতিটি টেস্টে সর্ট।') },
  solutions: [
    {
      id: 'sort-gap',
      kind: 'optimal',
      title: L('Sort and take the smallest adjacent gap', 'সর্ট করে সবচেয়ে ছোট পাশাপাশি ফাঁক'),
      idea: L('min over i of s[i] − s[i − 1] after sorting.', 'সর্টের পর সব i-এর s[i] − s[i − 1]-এর সর্বনিম্ন।'),
      explain: [L('Every prefix/suffix split of the sorted list is a valid pair of non-empty teams, and its cost is exactly one adjacent gap. No split can do better: whatever teams you pick, max(A) and min(B) are two different athletes, and the closest two athletes are always neighbours in sorted order.', 'সাজানো তালিকার প্রতিটি শুরু/শেষ ভাগই দুটি খালি নয় এমন দলের বৈধ জোড়া, আর এর খরচ ঠিক একটি পাশাপাশি ফাঁক। কোনো ভাগ এর চেয়ে ভালো করতে পারে না: যে দলই বাছুন, max(A) আর min(B) দুজন আলাদা খেলোয়াড়, আর সবচেয়ে কাছের দুই খেলোয়াড় সবসময় সাজানো ক্রমে পাশাপাশি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> s(n);
        for (auto& x : s) cin >> x;
        sort(s.begin(), s.end());
        int best = INT_MAX;
        for (int i = 1; i < n; i++) best = min(best, s[i] - s[i - 1]);
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'min-max'],
    },
    {
      id: 'all-pairs',
      kind: 'brute',
      title: L('Smallest difference over all pairs', 'সব জোড়ার সবচেয়ে ছোট পার্থক্য'),
      idea: L('The closest pair of values is the answer; check all n² pairs.', 'সবচেয়ে কাছের মানের জোড়াই উত্তর; সব n² জোড়া দেখুন।'),
      explain: [L('The minimum adjacent gap after sorting equals the minimum |sᵢ − sⱼ| over all pairs. With n ≤ 50 the double loop is only 1225 pairs per test, so even this passes.', 'সর্টের পর সবচেয়ে ছোট পাশাপাশি ফাঁক সব জোড়ার |sᵢ − sⱼ|-এর সর্বনিম্নের সমান। n ≤ ৫০ হলে ডাবল লুপে প্রতি টেস্টে মাত্র ১২২৫টি জোড়া, তাই এটিও পাস করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> s(n);
        for (auto& x : s) cin >> x;
        int best = INT_MAX;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                best = min(best, abs(s[i] - s[j]));
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
    {
      id: 'counting',
      kind: 'better',
      title: L('Counting sort over 1..1000', '১..১০০০-এর ওপর কাউন্টিং সর্ট'),
      idea: L('Mark which strengths appear; walk 1..1000 and measure gaps between present values.', 'কোন শক্তিগুলো আছে চিহ্নিত করুন; ১..১০০০ ধরে চলে উপস্থিত মানগুলোর মাঝের ফাঁক মাপুন।'),
      explain: [L('A duplicate gives gap 0 immediately. Otherwise the gaps between consecutive present values are exactly the sorted adjacent gaps. Useful when values are small and n is large.', 'একটি ডুপ্লিকেট সঙ্গে সঙ্গে ০ ফাঁক দেয়। না হলে পরপর উপস্থিত মানগুলোর ফাঁকই সাজানো পাশাপাশি ফাঁক। মান ছোট আর n বড় হলে কাজে লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> cnt(1001, 0);
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            cnt[x]++;
        }
        int best = INT_MAX, prev = -1;
        for (int v = 1; v <= 1000; v++) {
            if (cnt[v] == 0) continue;
            if (cnt[v] >= 2) best = 0;
            if (prev != -1) best = min(best, v - prev);
            prev = v;
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n + V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['vector'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('adjacent_difference', 'adjacent_difference'),
      idea: L('After sorting, adjacent_difference writes every neighbouring gap; take min_element of them.', 'সর্টের পর adjacent_difference প্রতিটি পাশাপাশি ফাঁক লেখে; সেগুলোর min_element নিন।'),
      explain: [L('adjacent_difference stores s[0] in the first slot and s[i] − s[i − 1] in the rest, so skip the first slot with begin() + 1.', 'adjacent_difference প্রথম ঘরে s[0] আর বাকিগুলোতে s[i] − s[i − 1] রাখে, তাই begin() + 1 দিয়ে প্রথম ঘরটি বাদ দিন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> s(n);
        for (auto& x : s) cin >> x;
        sort(s.begin(), s.end());
        vector<int> d(n);
        adjacent_difference(s.begin(), s.end(), d.begin());
        cout << *min_element(d.begin() + 1, d.end()) << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'min-max'],
    },
    {
      id: 'set',
      kind: 'alt',
      title: L('Insert into a multiset and check neighbours', 'multiset-এ ঢুকিয়ে পাশাপাশি দেখা'),
      idea: L('A multiset keeps values sorted as you insert them; walk it with two iterators.', 'multiset ঢোকানোর সময়ই মানগুলো সাজিয়ে রাখে; দুটি ইটারেটর দিয়ে এর ওপর চলুন।'),
      explain: [L('This is the same idea with a sorted container instead of a sort call. Walking a set with prev(it) and it is a pattern you will reuse when values arrive one at a time.', 'একই আইডিয়া, sort ডাকার বদলে সাজানো কনটেইনার দিয়ে। prev(it) আর it দিয়ে set-এর ওপর চলা এমন প্যাটার্ন, যা মান এক এক করে এলে আবার লাগবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        multiset<int> ms;
        for (int i = 0; i < n; i++) {
            int x;
            cin >> x;
            ms.insert(x);
        }
        int best = INT_MAX;
        for (auto it = next(ms.begin()); it != ms.end(); ++it) best = min(best, *it - *prev(it));
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set'],
    },
  ],
  tests: [
    { input: '5\n5\n3 1 2 6 4\n6\n2 1 3 2 4 3\n4\n7 9 3 1\n2\n1 1000\n3\n100 150 200', output: '1\n0\n2\n999\n50', source: 'sample', note: L('The statement sample.', 'স্টেটমেন্টের স্যাম্পল।') },
    { input: '1\n2\n5 5', output: '0', source: 'own', note: L('Equal strengths.', 'সমান শক্তি।') },
    { input: '1\n4\n10 1 1000 500', output: '9', source: 'own', note: L('Unsorted input.', 'অসাজানো ইনপুট।') },
  ],
  pitfalls: [
    L('Forgetting to sort, then comparing neighbours in input order.', 'সর্ট করতে ভুলে গিয়ে ইনপুটের ক্রমে পাশাপাশি তুলনা করা।'),
    L('Initialising the minimum to 0 instead of a large value.', 'সর্বনিম্নকে বড় মানের বদলে ০ দিয়ে শুরু করা।'),
  ],
  related: [{ id: '160A', name: 'Twins', why: L('Sorting plus greedy again.', 'আবার সর্টিং আর গ্রিডি।') }],
  toolkit: ['sort', 'min-max', 'set'],
};
