import type { ProblemEntry } from './types';

const raw = String.raw;

export const p617A: ProblemEntry = {
  id: '617A',
  contestId: 617,
  index: 'A',
  name: 'Elephant',
  rating: 800,
  tags: ['math'],
  featuredFor: ['math'],
  why: {
    en: 'The simplest greedy-plus-math problem there is, and the cleanest place to learn ceiling division four different ways.',
    bn: 'সবচেয়ে সহজ গ্রিডি-আর-গণিতের প্রবলেম, আর চার ভাবে সিলিং ভাগ শেখার সবচেয়ে পরিষ্কার জায়গা।',
  },

  statement: {
    en: 'An elephant stands at point 0 on a line and wants to reach its friend at point x > 0. In one step it can move forward by 1, 2, 3, 4 or 5. What is the fewest number of steps?',
    bn: 'একটি হাতি একটি রেখার ০ বিন্দুতে আছে আর x > ০ বিন্দুতে থাকা বন্ধুর কাছে যেতে চায়। এক ধাপে সামনে ১, ২, ৩, ৪ বা ৫ ঘর যেতে পারে। সবচেয়ে কম কত ধাপ লাগবে?',
  },
  input: { en: 'One integer x.', bn: 'একটি পূর্ণসংখ্যা x।' },
  output: { en: 'The minimum number of steps.', bn: 'সর্বনিম্ন ধাপের সংখ্যা।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '1 ≤ x ≤ 10⁶', bn: '১ ≤ x ≤ ১০⁶' }] },

  samples: [
    { input: '5', output: '1', explain: { en: 'One step of length 5.', bn: '৫ দৈর্ঘ্যের একটি ধাপ।' } },
    { input: '12', output: '3', explain: { en: 'For example 3 + 5 + 4. Two steps cover at most 10, which is not enough.', bn: 'যেমন ৩ + ৫ + ৪। দুই ধাপে সর্বোচ্চ ১০ যাওয়া যায়, যা যথেষ্ট নয়।' } },
  ],

  observation: {
    en: 's steps cover at most 5s, and any distance up to 5s can be reached in s steps by shortening some steps. So the answer is the smallest s with 5s ≥ x, which is ⌈x / 5⌉.',
    bn: 's ধাপে সর্বোচ্চ ৫s যাওয়া যায়, আর কিছু ধাপ ছোট করে ৫s পর্যন্ত যেকোনো দূরত্বে s ধাপে পৌঁছানো যায়। তাই উত্তর হলো সবচেয়ে ছোট s যাতে ৫s ≥ x, অর্থাৎ ⌈x / ৫⌉।',
  },

  approach: [
    {
      en: 'Lower bound: fewer than ⌈x / 5⌉ steps cover less than x. Upper bound: take steps of 5 and make the last one shorter. Both match, so ⌈x / 5⌉ is exact.',
      bn: 'নিম্ন সীমা: ⌈x / ৫⌉-এর কম ধাপে x-এর কম যাওয়া যায়। ঊর্ধ্ব সীমা: ৫-এর ধাপ নিন আর শেষটি ছোট করুন। দুটি মেলে, তাই ⌈x / ৫⌉-ই সঠিক।',
    },
    {
      en: 'Compute the ceiling with integers: (x + 4) / 5.',
      bn: 'পূর্ণসংখ্যা দিয়ে সিলিং বের করুন: (x + 4) / 5।',
    },
  ],

  walkthrough: {
    input: '12',
    steps: [
      { state: '12 / 5 = 2', text: { en: 'Two full steps of 5 reach 10.', bn: '৫-এর দুটি পূর্ণ ধাপে ১০-এ পৌঁছানো যায়।' } },
      { state: '12 % 5 = 2', text: { en: '2 is left over, so one more (shorter) step.', bn: '২ বাকি, তাই আরও একটি (ছোট) ধাপ।' } },
      { state: '(12 + 4) / 5 = 3', text: { en: 'The formula gives the same 3.', bn: 'সূত্রেও একই ৩।' } },
    ],
  },

  complexity: {
    time: 'O(1)',
    space: 'O(1)',
    why: { en: 'One addition and one division.', bn: 'একটি যোগ আর একটি ভাগ।' },
  },

  solutions: [
    {
      id: 'greedy-loop',
      kind: 'brute',
      title: { en: 'Walk greedily', bn: 'গ্রিডি ভাবে হাঁটা' },
      idea: {
        en: 'Always take the longest step that does not pass the friend, and count steps.',
        bn: 'সবসময় সবচেয়ে লম্বা ধাপ নিন যা বন্ধুকে ছাড়িয়ে যায় না, আর ধাপ গুনুন।',
      },
      explain: [
        {
          en: 'While distance remains, step min(5, remaining). Taking the biggest allowed step can never hurt, because a shorter step leaves more distance for later.',
          bn: 'দূরত্ব বাকি থাকা পর্যন্ত min(৫, বাকি) ধাপ নিন। সবচেয়ে বড় অনুমোদিত ধাপ কখনো ক্ষতি করে না, কারণ ছোট ধাপ পরের জন্য বেশি দূরত্ব রেখে দেয়।',
        },
        {
          en: 'x ≤ 10⁶, so the loop runs at most 200 000 times: fast. On bigger limits (like 10¹⁸) you would need the formula.',
          bn: 'x ≤ ১০⁶, তাই লুপ সর্বোচ্চ ২,০০,০০০ বার চলে: দ্রুত। বড় সীমায় (যেমন ১০¹⁸) সূত্র লাগবে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    int steps = 0;
    while (x > 0) {
        x -= min(5, x);
        steps++;
    }
    cout << steps << "\n";
    return 0;
}
`,
      time: 'O(x)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n', 'min-max'],
    },
    {
      id: 'full-plus-rest',
      kind: 'better',
      title: { en: 'Full steps plus the leftover', bn: 'পূর্ণ ধাপ আর বাকি অংশ' },
      idea: {
        en: 'x / 5 full steps, plus one more if anything is left over.',
        bn: 'x / ৫-টি পূর্ণ ধাপ, আর কিছু বাকি থাকলে আরও একটি।',
      },
      explain: [
        {
          en: 'The greedy loop takes x / 5 steps of exactly 5, then one short step if x % 5 is not zero. Writing that directly removes the loop.',
          bn: 'গ্রিডি লুপ ঠিক ৫-এর x / ৫-টি ধাপ নেয়, তারপর x % ৫ শূন্য না হলে একটি ছোট ধাপ। সেটি সরাসরি লিখলে লুপ লাগে না।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << x / 5 + (x % 5 != 0) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'bool-arith'],
    },
    {
      id: 'ceil-formula',
      kind: 'optimal',
      title: { en: 'Ceiling division (x + 4) / 5', bn: 'সিলিং ভাগ (x + 4) / 5' },
      idea: {
        en: 'Adding 4 before dividing rounds up whenever there is a remainder.',
        bn: 'ভাগের আগে ৪ যোগ করলে ভাগশেষ থাকলেই ওপরের দিকে রাউন্ড হয়।',
      },
      explain: [
        {
          en: 'In general ⌈a / b⌉ = (a + b − 1) / b for positive integers. If a is a multiple of b, the added b − 1 is not enough to reach the next multiple, so nothing changes. Otherwise it pushes a past the next multiple, adding exactly one.',
          bn: 'সাধারণভাবে ধনাত্মক পূর্ণসংখ্যায় ⌈a / b⌉ = (a + b − 1) / b। a যদি b-এর গুণিতক হয়, যোগ করা b − 1 পরের গুণিতকে পৌঁছাতে যথেষ্ট নয়, তাই কিছু বদলায় না। না হলে এটি a-কে পরের গুণিতকের ওপারে ঠেলে দেয়, ঠিক এক যোগ করে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << (x + 4) / 5 << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div'],
    },
    {
      id: 'search-s',
      kind: 'method',
      title: { en: 'Search for the smallest s', bn: 'সবচেয়ে ছোট s খোঁজা' },
      idea: {
        en: 'Try s = 1, 2, 3, … and stop at the first s whose maximum reach 5s covers x.',
        bn: 's = ১, ২, ৩, … চেষ্টা করুন আর প্রথম সেই s-এ থামুন যার সর্বোচ্চ নাগাল ৫s, x ঢেকে দেয়।',
      },
      explain: [
        {
          en: 'This follows the observation literally: the answer is the smallest s with 5s ≥ x. Searching s upward is a pattern you will use again with binary search, when checking one s is easy but the formula is not obvious.',
          bn: 'এটি পর্যবেক্ষণ হুবহু মেনে চলে: উত্তর হলো সবচেয়ে ছোট s যাতে ৫s ≥ x। s ওপরের দিকে খোঁজা এমন একটি প্যাটার্ন, যা পরে বাইনারি সার্চে আবার লাগবে, যখন একটি s যাচাই সহজ কিন্তু সূত্র স্পষ্ট নয়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    int s = 1;
    while (5 * s < x) s++;
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(x)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'ceil-double',
      kind: 'alt',
      title: { en: 'ceil() with doubles (and why to be careful)', bn: 'double দিয়ে ceil() (আর কেন সাবধান)' },
      idea: {
        en: 'ceil(x / 5.0) works here, but only because x is small; with huge values doubles can round wrongly.',
        bn: 'ceil(x / 5.0) এখানে কাজ করে, কিন্তু শুধু x ছোট বলে; বিশাল মানে double ভুলভাবে রাউন্ড করতে পারে।',
      },
      explain: [
        {
          en: 'Note 5.0, not 5: x / 5 with two integers is already rounded down before ceil sees it, so ceil(x / 5) would be wrong.',
          bn: '৫ নয়, ৫.০ খেয়াল করুন: দুটি পূর্ণসংখ্যায় x / ৫ ceil দেখার আগেই নিচের দিকে রাউন্ড হয়ে যায়, তাই ceil(x / 5) ভুল হতো।',
        },
        {
          en: 'A double holds integers exactly only up to 2⁵³ ≈ 9·10¹⁵. Above that, prefer the integer formula. Cast the result back to an integer before printing, or cout may print it like 3e+05.',
          bn: 'double পূর্ণসংখ্যা হুবহু রাখতে পারে কেবল ২⁵³ ≈ ৯·১০¹⁵ পর্যন্ত। এর ওপরে পূর্ণসংখ্যার সূত্র নিন। প্রিন্টের আগে ফলকে আবার পূর্ণসংখ্যায় রূপান্তর করুন, নইলে cout একে 3e+05-এর মতো প্রিন্ট করতে পারে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << (long long)ceil(x / 5.0) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div'],
    },
  ],

  tests: [
    { input: '5', output: '1', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '12', output: '3', source: 'sample', note: { en: 'Second sample.', bn: 'দ্বিতীয় স্যাম্পল।' } },
    { input: '1', output: '1', source: 'own', note: { en: 'Smallest x.', bn: 'সবচেয়ে ছোট x।' } },
    { input: '10', output: '2', source: 'own', note: { en: 'Exact multiple of 5.', bn: '৫-এর ঠিক গুণিতক।' } },
    { input: '1000000', output: '200000', source: 'own', note: { en: 'Largest x.', bn: 'সবচেয়ে বড় x।' } },
    { input: '999999', output: '200000', source: 'own', note: { en: 'Just below a multiple of 5.', bn: '৫-এর গুণিতকের ঠিক নিচে।' } },
  ],

  pitfalls: [
    { en: 'Printing x / 5: it forgets the last short step (12 / 5 = 2, but the answer is 3).', bn: 'x / 5 প্রিন্ট করা: শেষ ছোট ধাপটি ভুলে যায় (১২ / ৫ = ২, কিন্তু উত্তর ৩)।' },
    { en: 'Writing ceil(x / 5) with integers, which is already rounded down.', bn: 'পূর্ণসংখ্যা দিয়ে ceil(x / 5) লেখা, যা আগেই নিচের দিকে রাউন্ড হয়ে গেছে।' },
  ],

  related: [
    { id: '1A', name: 'Theatre Square', why: { en: 'Ceiling division in two dimensions.', bn: 'দুই মাত্রায় সিলিং ভাগ।' } },
    { id: '1328A', name: 'Divisibility Problem', why: { en: 'Distance to the next multiple.', bn: 'পরের গুণিতক পর্যন্ত দূরত্ব।' } },
  ],
  toolkit: ['ceil-div', 'modulo'],
};
