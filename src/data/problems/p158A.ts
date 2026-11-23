import type { ProblemEntry } from './types';

const raw = String.raw;

export const p158A: ProblemEntry = {
  id: '158A',
  contestId: 158,
  index: 'A',
  name: 'Next Round',
  rating: 800,
  tags: ['implementation'],
  featuredFor: ['implementation'],
  why: {
    en: 'A pure “read the rule carefully” problem. One forgotten word in the statement, positive, is responsible for thousands of Wrong Answers.',
    bn: 'একেবারে “নিয়ম মন দিয়ে পড়ো” ধরনের প্রবলেম। স্টেটমেন্টের একটি ভুলে যাওয়া শব্দ, ধনাত্মক, হাজার হাজার Wrong Answer-এর কারণ।',
  },

  statement: {
    en: 'n people took part in a round, and their scores are given from highest to lowest. Everyone who scored at least as much as the person in k-th place advances, but only if their score is positive. How many people advance?',
    bn: 'একটি রাউন্ডে n জন অংশ নিয়েছে, আর তাদের স্কোর সবচেয়ে বেশি থেকে সবচেয়ে কম ক্রমে দেওয়া। k-তম স্থানের জনের সমান বা বেশি স্কোর যারা করেছে তারা পরের রাউন্ডে যায়, তবে শুধু যদি স্কোর ধনাত্মক হয়। কতজন পরের রাউন্ডে যাবে?',
  },
  input: {
    en: 'The first line has n and k. The second line has n scores a₁ ≥ a₂ ≥ … ≥ aₙ.',
    bn: 'প্রথম লাইনে n আর k। দ্বিতীয় লাইনে n-টি স্কোর a₁ ≥ a₂ ≥ … ≥ aₙ।',
  },
  output: { en: 'The number of people who advance.', bn: 'যতজন পরের রাউন্ডে যাবে।' },
  limits: {
    timeSec: 3,
    memoryMb: 256,
    notes: [
      { en: '1 ≤ k ≤ n ≤ 50', bn: '১ ≤ k ≤ n ≤ ৫০' },
      { en: '0 ≤ aᵢ ≤ 100', bn: '০ ≤ aᵢ ≤ ১০০' },
    ],
  },

  samples: [
    {
      input: '8 5\n10 9 8 7 7 7 5 5',
      output: '6',
      explain: {
        en: 'The 5th score is 7. The scores 10, 9, 8, 7, 7, 7 are at least 7 and positive: 6 people.',
        bn: '৫ম স্কোর ৭। 10, 9, 8, 7, 7, 7 স্কোরগুলো ৭-এর সমান বা বেশি আর ধনাত্মক: ৬ জন।',
      },
    },
    {
      input: '4 2\n0 0 0 0',
      output: '0',
      explain: {
        en: 'Everyone has at least the 2nd score (0), but nobody has a positive score, so nobody advances.',
        bn: 'সবারই ২য় স্কোরের (০) সমান স্কোর আছে, কিন্তু কারও স্কোর ধনাত্মক নয়, তাই কেউ যায় না।',
      },
    },
  ],

  observation: {
    en: 'A person advances when two things hold at once: score ≥ a[k] and score > 0. Both can be merged into one test, score ≥ max(a[k], 1), because scores are whole numbers.',
    bn: 'একজন তখনই যায় যখন একসঙ্গে দুটি শর্ত সত্য: স্কোর ≥ a[k] আর স্কোর > ০। স্কোর পূর্ণসংখ্যা বলে দুটিকে এক পরীক্ষায় মেলানো যায়: স্কোর ≥ max(a[k], ১)।',
  },

  approach: [
    {
      en: 'Read all scores into a vector so you can look up the k-th one, which is a[k − 1] with 0-based indexing.',
      bn: 'সব স্কোর একটি ভেক্টরে পড়ুন, যাতে k-তমটি দেখা যায়; ০-ভিত্তিক ইনডেক্সে সেটি a[k − 1]।',
    },
    {
      en: 'Count the scores that are at least a[k − 1] and greater than 0. Because the list is sorted, everyone who passes comes first, so you can also stop at the first failure or binary search for the boundary.',
      bn: 'যে স্কোরগুলো a[k − 1]-এর সমান বা বেশি আর ০-এর বড়, সেগুলো গুনুন। তালিকা সাজানো বলে যারা পাস করে তারা সবাই শুরুতে থাকে, তাই প্রথম ব্যর্থতায় থামা বা সীমানা বাইনারি সার্চ করাও যায়।',
    },
  ],

  walkthrough: {
    input: '8 5\n10 9 8 7 7 7 5 5',
    steps: [
      { state: 'a[4] = 7', text: { en: 'The 5th score (index 4) is the threshold: 7.', bn: '৫ম স্কোর (ইনডেক্স ৪) সীমা: ৭।' } },
      { state: '10 9 8 7 7 7', text: { en: 'These six are ≥ 7 and > 0, so they count.', bn: 'এই ছয়টি ≥ ৭ আর > ০, তাই গোনা হয়।' } },
      { state: '5 5', text: { en: 'Below the threshold; they do not count. Answer 6.', bn: 'সীমার নিচে; গোনা হয় না। উত্তর ৬।' } },
    ],
  },

  complexity: {
    time: 'O(n)',
    space: 'O(n)',
    why: {
      en: 'One pass over at most 50 scores. The binary-search version is O(log n) after reading, but reading already costs O(n).',
      bn: 'সর্বোচ্চ ৫০টি স্কোরের ওপর একবার যাওয়া। পড়ার পর বাইনারি সার্চ সংস্করণ O(log n), কিন্তু পড়তেই O(n) লাগে।',
    },
  },

  solutions: [
    {
      id: 'brute',
      kind: 'method',
      title: { en: 'Check every person', bn: 'প্রত্যেককে পরীক্ষা করা' },
      idea: {
        en: 'Look up the k-th score, then test both conditions for every person and count.',
        bn: 'k-তম স্কোর দেখে নিন, তারপর প্রত্যেকের জন্য দুটি শর্ত পরীক্ষা করে গুনুন।',
      },
      explain: [
        {
          en: 'This is the statement turned directly into code. The threshold is a[k − 1] because vectors start at 0 while places start at 1.',
          bn: 'এটি স্টেটমেন্টকে সরাসরি কোডে রূপ দেওয়া। সীমা a[k − 1], কারণ ভেক্টর ০ থেকে শুরু আর স্থান ১ থেকে।',
        },
        {
          en: 'The condition is written with && so both parts must hold. On the second sample every score equals the threshold 0, so the first part is true for everyone, and the second part (x > 0) correctly rejects them all.',
          bn: 'শর্তটি && দিয়ে লেখা, তাই দুটি অংশই সত্য হতে হবে। দ্বিতীয় স্যাম্পলে প্রতিটি স্কোর সীমা ০-এর সমান, তাই প্রথম অংশ সবার জন্য সত্য, আর দ্বিতীয় অংশ (x > 0) ঠিকভাবে সবাইকে বাদ দেয়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& x : a) cin >> x;

    int threshold = a[k - 1];
    int count = 0;
    for (int x : a) {
        if (x >= threshold && x > 0) count++;
    }
    cout << count << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'for-loop'],
    },
    {
      id: 'early-stop',
      kind: 'method',
      title: { en: 'Stop at the first person who fails', bn: 'প্রথম ব্যর্থ জনে থামা' },
      idea: {
        en: 'Scores are sorted from high to low, so once someone fails, everyone after them fails too.',
        bn: 'স্কোর বেশি থেকে কম ক্রমে সাজানো, তাই কেউ ব্যর্থ হলে তার পরের সবাইও ব্যর্থ।',
      },
      explain: [
        {
          en: 'If a[i] fails, then either a[i] < threshold or a[i] = 0. Every later score is ≤ a[i], so it fails for the same reason. The people who advance therefore form a prefix of the list.',
          bn: 'a[i] ব্যর্থ হলে হয় a[i] < সীমা, নয়তো a[i] = ০। পরের প্রতিটি স্কোর ≤ a[i], তাই একই কারণে ব্যর্থ। ফলে যারা যায় তারা তালিকার একটি শুরুর অংশ।',
        },
        {
          en: 'So walk from the top and break at the first failure. The answer is how far you got. With n ≤ 50 this is not faster in practice, but the “sorted means prefix” idea is used all the time in harder problems.',
          bn: 'তাই ওপর থেকে চলুন আর প্রথম ব্যর্থতায় break করুন। যতদূর গেলেন সেটাই উত্তর। n ≤ ৫০ হওয়ায় বাস্তবে দ্রুত হয় না, কিন্তু “সাজানো মানে শুরুর অংশ” আইডিয়াটি কঠিন প্রবলেমে সবসময় লাগে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& x : a) cin >> x;

    int count = 0;
    while (count < n && a[count] >= a[k - 1] && a[count] > 0) {
        count++;
    }
    cout << count << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['break-continue'],
    },
    {
      id: 'online',
      kind: 'method',
      title: { en: 'Count while reading', bn: 'পড়তে পড়তে গোনা' },
      idea: {
        en: 'Everyone in the top k automatically reaches the threshold, so they only need a positive score; after that, a person must tie the k-th score.',
        bn: 'প্রথম k জন আপনাআপনি সীমায় পৌঁছায়, তাই তাদের শুধু ধনাত্মক স্কোর লাগে; এরপর একজনকে k-তম স্কোরের সমান হতে হয়।',
      },
      explain: [
        {
          en: 'Do we really need to store the scores? The first k people (places 1 to k) all have score ≥ a[k] because the list is sorted. So for them only “positive” matters.',
          bn: 'স্কোরগুলো কি সত্যিই জমা রাখতে হবে? প্রথম k জনের (১ থেকে k স্থান) সবার স্কোর ≥ a[k], কারণ তালিকা সাজানো। তাই তাদের জন্য শুধু “ধনাত্মক” শর্তটাই জরুরি।',
        },
        {
          en: 'When we reach place k we learn the threshold. Anyone after place k has score ≤ a[k], so they pass only by being exactly equal to a[k] and positive. This needs O(1) memory: no vector at all.',
          bn: 'k স্থানে পৌঁছালে আমরা সীমা জানি। k-এর পরের যে কারও স্কোর ≤ a[k], তাই তারা পাস করে কেবল a[k]-এর ঠিক সমান আর ধনাত্মক হলে। এতে O(1) মেমোরি লাগে: কোনো ভেক্টরই নয়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int kth = 0, count = 0;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (i == k) kth = x;
        if (x > 0 && (i <= k || x == kth)) count++;
    }
    cout << count << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'binary-search',
      kind: 'method',
      title: { en: 'Binary search for the boundary', bn: 'সীমানার জন্য বাইনারি সার্চ' },
      idea: {
        en: 'The passing people form a prefix of a sorted list, so find where it ends with upper_bound.',
        bn: 'পাস করা লোকেরা সাজানো তালিকার একটি শুরুর অংশ, তাই upper_bound দিয়ে এর শেষ খুঁজুন।',
      },
      explain: [
        {
          en: 'Merge both conditions into one: a person passes when score ≥ t where t = max(a[k − 1], 1). Scores are integers, so “> 0” is the same as “≥ 1”.',
          bn: 'দুটি শর্তকে এক করুন: স্কোর ≥ t হলে পাস, যেখানে t = max(a[k − 1], ১)। স্কোর পূর্ণসংখ্যা, তাই “> ০” আর “≥ ১” একই।',
        },
        {
          en: 'The list is sorted in decreasing order, so we pass greater<int>() to upper_bound. It returns the first position whose score is below t, and that position is exactly the count.',
          bn: 'তালিকা কমতে থাকা ক্রমে সাজানো, তাই upper_bound-কে greater<int>() দিই। এটি প্রথম সেই অবস্থান দেয় যার স্কোর t-এর কম, আর সেই অবস্থানই গণনা।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& x : a) cin >> x;

    int t = max(a[k - 1], 1);
    // first index whose score is < t (the list is non-increasing)
    int count = upper_bound(a.begin(), a.end(), t, greater<int>()) - a.begin();
    cout << count << "\n";
    return 0;
}
`,
      time: 'O(n) read + O(log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lower-bound'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: { en: 'count_if with a lambda', bn: 'ল্যাম্বডা দিয়ে count_if' },
      idea: {
        en: 'The same count as the first method, written as one STL call.',
        bn: 'প্রথম পদ্ধতির একই গণনা, একটি STL কলে লেখা।',
      },
      explain: [
        {
          en: 'count_if(begin, end, rule) counts how many elements make rule return true. The lambda captures the threshold t by reference with [&].',
          bn: 'count_if(begin, end, rule) গোনে কতগুলো উপাদানে rule সত্য দেয়। ল্যাম্বডা [&] দিয়ে সীমা t রেফারেন্সে ধরে রাখে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (auto& x : a) cin >> x;

    int t = a[k - 1];
    cout << count_if(a.begin(), a.end(), [&](int x) { return x >= t && x > 0; }) << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'lambda'],
    },
  ],

  tests: [
    { input: '8 5\n10 9 8 7 7 7 5 5', output: '6', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '4 2\n0 0 0 0', output: '0', source: 'sample', note: { en: 'Second sample: all zero.', bn: 'দ্বিতীয় স্যাম্পল: সব শূন্য।' } },
    { input: '5 3\n9 5 0 0 0', output: '2', source: 'own', note: { en: 'The k-th score is 0; only positive scores count.', bn: 'k-তম স্কোর ০; শুধু ধনাত্মক স্কোর গোনা হয়।' } },
    { input: '5 1\n7 7 7 7 7', output: '5', source: 'own', note: { en: 'Ties with the first place all advance.', bn: 'প্রথম স্থানের সমান সবাই যায়।' } },
    { input: '1 1\n1', output: '1', source: 'own', note: { en: 'Smallest input.', bn: 'সবচেয়ে ছোট ইনপুট।' } },
    { input: '6 6\n100 50 3 2 1 1', output: '6', source: 'own', note: { en: 'k = n: everyone with a positive score.', bn: 'k = n: ধনাত্মক স্কোরের সবাই।' } },
  ],

  pitfalls: [
    { en: 'Forgetting “positive”: the second sample (all zeros) prints 4 instead of 0.', bn: '“ধনাত্মক” ভুলে যাওয়া: দ্বিতীয় স্যাম্পলে (সব শূন্য) ০-এর বদলে ৪ প্রিন্ট হয়।' },
    { en: 'Using a[k] instead of a[k − 1] with 0-based indexing, which picks the (k+1)-th score.', bn: '০-ভিত্তিক ইনডেক্সে a[k − 1]-এর বদলে a[k] লেখা, যা (k+1)-তম স্কোর নেয়।' },
    { en: 'Printing k when the k-th score is shared by several people after place k.', bn: 'k-তম স্কোর k স্থানের পরে আরও কয়েকজনের থাকলেও k প্রিন্ট করা।' },
  ],

  related: [
    { id: '266A', name: 'Stones on the Table', why: { en: 'Another careful counting problem.', bn: 'আরেকটি সাবধানে গোনার প্রবলেম।' } },
    { id: '231A', name: 'Team', why: { en: 'Count lines that satisfy a rule.', bn: 'নিয়ম মানে এমন লাইন গোনা।' } },
  ],
  toolkit: ['vector', 'count-find', 'lower-bound', 'lambda'],
};
