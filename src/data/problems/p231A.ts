import type { ProblemEntry } from './types';

export const p231A: ProblemEntry = {
  id: '231A',
  contestId: 231,
  index: 'A',
  name: 'Team',
  rating: 800,
  tags: ['brute-force', 'greedy'],
  why: {
    en: 'Counting over input lines with a simple rule. The kind of A problem you should finish in under five minutes.',
    bn: 'সহজ নিয়মে ইনপুটের লাইন গোনা। এমন A প্রবলেম, যা পাঁচ মিনিটের মধ্যে শেষ করা উচিত।',
  },

  statement: {
    en: 'Three friends enter a contest as a team. For each problem, each friend either is sure of the solution or is not. They will write a solution only if at least two of the three are sure. Given who is sure for each problem, count the problems they will solve.',
    bn: 'তিন বন্ধু একটি দল হয়ে কনটেস্টে অংশ নেয়। প্রতিটি প্রবলেমের সমাধান নিয়ে প্রত্যেক বন্ধু হয় নিশ্চিত, নয়তো নয়। তিনজনের অন্তত দুজন নিশ্চিত হলে তবেই তারা সমাধান লেখে। প্রতিটি প্রবলেমে কে নিশ্চিত দেওয়া আছে; কতগুলো প্রবলেম তারা সমাধান করবে গুনুন।',
  },
  input: {
    en: 'An integer n, then n lines with three numbers, each 0 or 1: whether each friend is sure.',
    bn: 'একটি পূর্ণসংখ্যা n, তারপর n লাইনে তিনটি করে সংখ্যা, প্রতিটি ০ বা ১: প্রত্যেক বন্ধু নিশ্চিত কি না।',
  },
  output: { en: 'The number of problems they will solve.', bn: 'যতগুলো প্রবলেম তারা সমাধান করবে।' },
  limits: {
    timeSec: 2,
    memoryMb: 256,
    notes: [{ en: '1 ≤ n ≤ 1000', bn: '১ ≤ n ≤ ১০০০' }],
  },

  samples: [
    {
      input: '3\n1 1 0\n1 1 1\n1 0 0',
      output: '2',
      explain: {
        en: 'Lines one and two have at least two 1s. Line three has only one.',
        bn: 'প্রথম ও দ্বিতীয় লাইনে অন্তত দুটি ১ আছে। তৃতীয় লাইনে মাত্র একটি।',
      },
    },
    {
      input: '2\n1 0 0\n0 1 1',
      output: '1',
      explain: {
        en: 'Only the second line has two friends who are sure.',
        bn: 'শুধু দ্বিতীয় লাইনে দুজন বন্ধু নিশ্চিত।',
      },
    },
  ],

  observation: {
    en: 'Because every value is 0 or 1, “at least two are sure” is the same as “the three numbers add up to at least 2”.',
    bn: 'প্রতিটি মান ০ বা ১ হওয়ায়, “অন্তত দুজন নিশ্চিত” আর “তিনটি সংখ্যার যোগফল কমপক্ষে ২” একই কথা।',
  },

  approach: [
    {
      en: 'Read each line, add the three numbers, and count the lines where the sum is 2 or 3.',
      bn: 'প্রতিটি লাইন পড়ে তিনটি সংখ্যা যোগ করুন, আর যেসব লাইনে যোগফল ২ বা ৩ সেগুলো গুনুন।',
    },
  ],

  walkthrough: {
    input: '3\n1 1 0\n1 1 1\n1 0 0',
    steps: [
      { state: '1+1+0 = 2', text: { en: 'Two are sure. count = 1.', bn: 'দুজন নিশ্চিত। count = ১।' } },
      { state: '1+1+1 = 3', text: { en: 'All three are sure. count = 2.', bn: 'তিনজনই নিশ্চিত। count = ২।' } },
      { state: '1+0+0 = 1', text: { en: 'Only one. count stays 2. Print 2.', bn: 'মাত্র একজন। count ২-ই থাকে। প্রিন্ট করুন ২।' } },
    ],
  },

  complexity: {
    time: 'O(n)',
    space: 'O(1)',
    why: { en: 'One pass over the lines; nothing is stored.', bn: 'লাইনগুলোর ওপর একবার যাওয়া; কিছু জমা রাখা হয় না।' },
  },

  solutions: [
    {
      id: 'optimal',
      kind: 'optimal',
      title: { en: 'Sum each line', bn: 'প্রতিটি লাইনের যোগফল' },
      idea: {
        en: 'Add the three values and count the line when the sum is at least 2.',
        bn: 'তিনটি মান যোগ করে যোগফল কমপক্ষে ২ হলে লাইনটি গুনুন।',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    int solved = 0;
    for (int i = 0; i < n; i++) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a + b + c >= 2) solved++;
    }

    cout << solved << "\\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'for-loop'],
    },
    {
      id: 'alt',
      kind: 'alt',
      title: { en: 'Bool addition in one expression', bn: 'এক এক্সপ্রেশনে bool যোগ' },
      idea: {
        en: 'A comparison is a bool, and a bool adds as 0 or 1, so the counter can grow by (a + b + c >= 2) directly.',
        bn: 'তুলনার ফল bool, আর bool যোগ হয় ০ বা ১ হিসেবে, তাই কাউন্টারে সরাসরি (a + b + c >= ২) যোগ করা যায়।',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, solved = 0;
    cin >> n;
    while (n--) {
        int a, b, c;
        cin >> a >> b >> c;
        solved += (a + b + c >= 2);
    }
    cout << solved << "\\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-fast', 'bool-arith', 'while-n'],
    },
  ],

  tests: [
    { input: '3\n1 1 0\n1 1 1\n1 0 0', output: '2', source: 'sample', note: { en: 'First statement sample.', bn: 'স্টেটমেন্টের প্রথম স্যাম্পল।' } },
    { input: '2\n1 0 0\n0 1 1', output: '1', source: 'sample', note: { en: 'Second statement sample.', bn: 'স্টেটমেন্টের দ্বিতীয় স্যাম্পল।' } },
    { input: '1\n0 0 0', output: '0', source: 'own', note: { en: 'Nobody is sure.', bn: 'কেউ নিশ্চিত নয়।' } },
    { input: '1\n1 1 1', output: '1', source: 'own', note: { en: 'Sum of 3 counts too, not only exactly 2.', bn: 'যোগফল ৩ হলেও গোনা হয়, শুধু ঠিক ২ নয়।' } },
  ],

  pitfalls: [
    { en: 'Checking a + b + c == 2. A line where all three are sure (sum 3) also counts.', bn: 'a + b + c == ২ দেখা। তিনজনই নিশ্চিত (যোগফল ৩) এমন লাইনও গোনা হয়।' },
    { en: 'Reading each line as a string and comparing characters. It works, but adding numbers is shorter and harder to get wrong.', bn: 'প্রতিটি লাইন স্ট্রিং হিসেবে পড়ে অক্ষর তুলনা করা। কাজ করে, তবে সংখ্যা যোগ করা ছোট আর ভুলের সম্ভাবনা কম।' },
  ],

  related: [
    { id: '4A', name: 'Watermelon', why: { en: 'Brute force on a tiny input, then a formula.', bn: 'ছোট ইনপুটে ব্রুট ফোর্স, তারপর সূত্র।' } },
    { id: '71A', name: 'Way Too Long Words', why: { en: 'Same input shape: n, then n items.', bn: 'একই ইনপুট গঠন: n, তারপর n-টি জিনিস।' } },
  ],
  toolkit: ['io-basics', 'io-fast', 'bool-arith'],
};
