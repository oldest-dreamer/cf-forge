import type { ProblemEntry } from './types';

const raw = String.raw;

export const p1475A: ProblemEntry = {
  id: '1475A',
  contestId: 1475,
  index: 'A',
  name: 'Odd Divisor',
  rating: 900,
  tags: ['math', 'number-theory'],
  featuredFor: ['math'],
  why: {
    en: 'A tiny question with five genuinely different solutions: division, bit tricks, popcount and trailing zeros. A perfect first contact with “think in binary”.',
    bn: 'ছোট একটি প্রশ্ন, যার পাঁচটি সত্যিকারের ভিন্ন সমাধান: ভাগ, বিটের কৌশল, popcount আর শেষের শূন্য। “বাইনারিতে ভাবো”-র নিখুঁত প্রথম পরিচয়।',
  },

  statement: {
    en: 'For each given number n, decide whether n has an odd divisor greater than 1, that is, an odd x > 1 with n divisible by x.',
    bn: 'প্রতিটি সংখ্যা n-এর জন্য ঠিক করুন, n-এর ১-এর বড় কোনো বিজোড় ভাজক আছে কি না, অর্থাৎ এমন বিজোড় x > ১ যাতে n, x দিয়ে বিভাজ্য।',
  },
  input: {
    en: 'The first line has t. Each of the next t lines has one integer n.',
    bn: 'প্রথম লাইনে t। পরের t-টি লাইনের প্রতিটিতে একটি পূর্ণসংখ্যা n।',
  },
  output: { en: 'For each n, print YES or NO.', bn: 'প্রতিটি n-এর জন্য YES বা NO প্রিন্ট করুন।' },
  limits: {
    timeSec: 2,
    memoryMb: 256,
    notes: [
      { en: '1 ≤ t ≤ 10⁴', bn: '১ ≤ t ≤ ১০⁴' },
      { en: '2 ≤ n ≤ 10¹⁴', bn: '২ ≤ n ≤ ১০¹⁴' },
    ],
  },

  samples: [
    {
      input: '6\n2\n3\n4\n5\n998244353\n1099511627776',
      output: 'NO\nYES\nNO\nYES\nYES\nNO',
      explain: {
        en: '2 and 4 are powers of two, and so is 1099511627776 = 2⁴⁰: no odd divisor. 3, 5 and 998244353 are odd themselves.',
        bn: '২ আর ৪ দুইয়ের ঘাত, আর 1099511627776 = ২⁴⁰-ও তাই: কোনো বিজোড় ভাজক নেই। ৩, ৫ আর 998244353 নিজেরাই বিজোড়।',
      },
    },
  ],

  observation: {
    en: 'Write n = 2ᵏ × m with m odd. Any odd divisor of n divides m. So an odd divisor greater than 1 exists exactly when m > 1, which means n is not a power of two.',
    bn: 'n = ২ᵏ × m লিখুন, যেখানে m বিজোড়। n-এর যেকোনো বিজোড় ভাজক m-কে ভাগ করে। তাই ১-এর বড় বিজোড় ভাজক ঠিক তখনই আছে যখন m > ১, অর্থাৎ n দুইয়ের ঘাত নয়।',
  },

  approach: [
    {
      en: 'The question becomes: is n a power of two? If yes, print NO; otherwise print YES.',
      bn: 'প্রশ্নটি দাঁড়ায়: n কি দুইয়ের ঘাত? হ্যাঁ হলে NO, না হলে YES প্রিন্ট করুন।',
    },
    {
      en: 'n can be 10¹⁴, so read it as long long and avoid trial division up to n. Dividing out twos takes at most 47 steps, and the bit methods take one.',
      bn: 'n ১০¹⁴ পর্যন্ত হতে পারে, তাই long long-এ পড়ুন আর n পর্যন্ত ভাগ করে দেখা এড়িয়ে চলুন। দুই ভাগ করে ফেলতে সর্বোচ্চ ৪৭ ধাপ লাগে, আর বিট পদ্ধতিতে এক ধাপ।',
    },
  ],

  walkthrough: {
    input: 'n = 12',
    steps: [
      { state: '12 → 6', text: { en: '12 is even; divide by 2.', bn: '১২ জোড়; ২ দিয়ে ভাগ।' } },
      { state: '6 → 3', text: { en: '6 is even; divide by 2.', bn: '৬ জোড়; ২ দিয়ে ভাগ।' } },
      { state: 'm = 3', text: { en: '3 is odd and greater than 1, so 3 divides 12: YES.', bn: '৩ বিজোড় আর ১-এর বড়, তাই ৩, ১২-কে ভাগ করে: YES।' } },
    ],
  },

  complexity: {
    time: 'O(log n) per test',
    space: 'O(1)',
    why: {
      en: 'Dividing by 2 takes at most log₂(10¹⁴) ≈ 47 steps. The bit tricks are O(1).',
      bn: '২ দিয়ে ভাগ করতে সর্বোচ্চ log₂(১০¹⁴) ≈ ৪৭ ধাপ। বিটের কৌশলগুলো O(1)।',
    },
  },

  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: { en: 'Try odd divisors up to √n', bn: '√n পর্যন্ত বিজোড় ভাজক চেষ্টা' },
      idea: {
        en: 'Search for an odd divisor directly. Correct, but too slow for 10⁴ tests with n up to 10¹⁴.',
        bn: 'সরাসরি বিজোড় ভাজক খোঁজা। সঠিক, কিন্তু n ১০¹⁴ পর্যন্ত আর ১০⁴টি টেস্টে অনেক ধীর।',
      },
      explain: [
        {
          en: 'If n is odd, n itself is an odd divisor greater than 1. Otherwise check odd d = 3, 5, 7, … while d·d ≤ n; also check n / d, the paired divisor, which may be odd even when d is small.',
          bn: 'n বিজোড় হলে n নিজেই ১-এর বড় বিজোড় ভাজক। না হলে d·d ≤ n পর্যন্ত বিজোড় d = ৩, ৫, ৭, … দেখুন; সঙ্গে জোড়া ভাজক n / d-ও দেখুন, যা d ছোট হলেও বিজোড় হতে পারে।',
        },
        {
          en: 'For n = 10¹⁴ this loop runs about 5·10⁶ times per test, and 10⁴ tests make 5·10¹⁰ steps: Time limit exceeded. It is here as a correct reference and as a reminder to look at the limits first.',
          bn: 'n = ১০¹⁴ হলে এই লুপ প্রতি টেস্টে প্রায় ৫·১০⁶ বার চলে, আর ১০⁴টি টেস্টে ৫·১০¹⁰ ধাপ: টাইম লিমিট এক্সিডেড। এটি সঠিক রেফারেন্স হিসেবে আছে, আর মনে করিয়ে দেয় আগে সীমা দেখতে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool hasOddDivisor(long long n) {
    if (n % 2 == 1) return true;                 // n itself
    for (long long d = 3; d * d <= n; d += 2) {
        if (n % d == 0) return true;             // odd d divides n
    }
    for (long long d = 1; d * d <= n; d++) {
        if (n % d == 0 && (n / d) % 2 == 1 && n / d > 1) return true;
    }
    return false;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        cout << (hasOddDivisor(n) ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(√n) per test',
      space: 'O(1)',
      accepted: false,
      toolkit: ['long-long', 'functions'],
    },
    {
      id: 'divide',
      kind: 'optimal',
      title: { en: 'Divide out all factors of 2', bn: '২-এর সব উৎপাদক ভাগ করে ফেলা' },
      idea: {
        en: 'Keep halving n while it is even. What remains is the odd part m; the answer is YES when m > 1.',
        bn: 'n জোড় থাকা পর্যন্ত অর্ধেক করতে থাকুন। যা থাকে তা বিজোড় অংশ m; m > ১ হলে উত্তর YES।',
      },
      explain: [
        {
          en: 'This is the observation turned into code. Each halving removes one factor of 2 and keeps all odd factors, so the loop ends exactly at m, the odd part.',
          bn: 'এটি পর্যবেক্ষণকে কোডে রূপ দেওয়া। প্রতিবার অর্ধেক করলে ২-এর একটি উৎপাদক যায় আর সব বিজোড় উৎপাদক থাকে, তাই লুপ ঠিক m-এ, অর্থাৎ বিজোড় অংশে, থামে।',
        },
        {
          en: 'n ≤ 10¹⁴ < 2⁴⁷, so the loop runs at most 46 times per test. Even with 10⁴ tests that is under half a million steps.',
          bn: 'n ≤ ১০¹⁴ < ২⁴⁷, তাই প্রতি টেস্টে লুপ সর্বোচ্চ ৪৬ বার চলে। ১০⁴টি টেস্টেও তা পাঁচ লাখের কম ধাপ।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        while (n % 2 == 0) n /= 2;
        cout << (n > 1 ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(log n) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'modulo', 'while-n'],
    },
    {
      id: 'and-trick',
      kind: 'method',
      title: { en: 'Power-of-two test: n & (n − 1)', bn: 'দুইয়ের ঘাত পরীক্ষা: n & (n − 1)' },
      idea: {
        en: 'A power of two has a single 1 bit, and n & (n − 1) clears the lowest 1 bit. The result is 0 exactly for powers of two.',
        bn: 'দুইয়ের ঘাতে একটিই 1 বিট থাকে, আর n & (n − 1) সবচেয়ে নিচের 1 বিটটি মুছে দেয়। ফল ০ হয় ঠিক দুইয়ের ঘাতে।',
      },
      explain: [
        {
          en: 'Subtracting 1 from n flips the lowest 1 bit to 0 and every 0 bit below it to 1. For example 12 = 1100₂ and 11 = 1011₂, so 12 & 11 = 1000₂: the lowest 1 bit disappeared.',
          bn: 'n থেকে ১ বিয়োগ করলে সবচেয়ে নিচের 1 বিট 0 হয় আর তার নিচের সব 0 বিট 1 হয়। যেমন ১২ = 1100₂ আর ১১ = 1011₂, তাই 12 & 11 = 1000₂: সবচেয়ে নিচের 1 বিট উধাও।',
        },
        {
          en: 'If n has only one 1 bit, nothing is left and the result is 0. If it has two or more, the higher ones survive. Wrap n & (n − 1) in parentheses: == binds tighter than &.',
          bn: 'n-এ মাত্র একটি 1 বিট থাকলে কিছুই থাকে না আর ফল ০। দুই বা বেশি থাকলে ওপরেরগুলো থেকে যায়। n & (n − 1) বন্ধনীতে রাখুন: &-এর চেয়ে == আগে কাজ করে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        bool powerOfTwo = (n & (n - 1)) == 0;
        cout << (powerOfTwo ? "NO" : "YES") << "\n";
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and'],
    },
    {
      id: 'popcount',
      kind: 'stl',
      title: { en: 'Count the 1 bits', bn: '1 বিট গোনা' },
      idea: {
        en: '__builtin_popcountll(n) counts the 1 bits. A power of two has exactly one.',
        bn: '__builtin_popcountll(n) 1 বিটগুলো গোনে। দুইয়ের ঘাতে ঠিক একটি থাকে।',
      },
      explain: [
        {
          en: 'The compiler turns __builtin_popcountll into a single CPU instruction on most machines. Use the ll version for long long; the plain version only looks at 32 bits and would give wrong answers above 2³¹.',
          bn: 'বেশিরভাগ মেশিনে কম্পাইলার __builtin_popcountll-কে একটি মাত্র CPU নির্দেশে বদলে দেয়। long long-এর জন্য ll সংস্করণ নিন; সাধারণটি শুধু ৩২ বিট দেখে আর ২³¹-এর ওপরে ভুল উত্তর দেবে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        cout << (__builtin_popcountll(n) == 1 ? "NO" : "YES") << "\n";
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['popcount'],
    },
    {
      id: 'ctz',
      kind: 'alt',
      title: { en: 'Shift out the trailing zeros', bn: 'শেষের শূন্যগুলো সরিয়ে দেওয়া' },
      idea: {
        en: '__builtin_ctzll(n) counts trailing zero bits, which is k in n = 2ᵏ × m. Shifting right by k gives m in one step.',
        bn: '__builtin_ctzll(n) শেষের শূন্য বিট গোনে, যা n = ২ᵏ × m-এর k। ডানে k ঘর সরালে এক ধাপেই m পাওয়া যায়।',
      },
      explain: [
        {
          en: 'This is the “divide out all twos” method done in a single operation. In binary, dividing by 2 is a right shift by one, and the number of times we can divide by 2 is the number of trailing zeros.',
          bn: 'এটি “সব দুই ভাগ করে ফেলো” পদ্ধতি, এক অপারেশনে করা। বাইনারিতে ২ দিয়ে ভাগ মানে ডানে এক ঘর সরানো, আর কতবার ২ দিয়ে ভাগ করা যায় তা হলো শেষের শূন্যের সংখ্যা।',
        },
        {
          en: 'Careful: __builtin_ctzll(0) is undefined, but n ≥ 2 here so it is safe.',
          bn: 'সাবধান: __builtin_ctzll(0) অসংজ্ঞায়িত, কিন্তু এখানে n ≥ ২ তাই নিরাপদ।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        long long oddPart = n >> __builtin_ctzll(n);
        cout << (oddPart > 1 ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'popcount'],
    },
  ],

  tests: [
    { input: '6\n2\n3\n4\n5\n998244353\n1099511627776', output: 'NO\nYES\nNO\nYES\nYES\nNO', source: 'sample', note: { en: 'The statement sample.', bn: 'স্টেটমেন্টের স্যাম্পল।' } },
    { input: '3\n6\n12\n1024', output: 'YES\nYES\nNO', source: 'own', note: { en: 'Even numbers with and without an odd part.', bn: 'বিজোড় অংশসহ ও ছাড়া জোড় সংখ্যা।' } },
    { input: '2\n70368744177664\n99999999999999', output: 'NO\nYES', source: 'own', note: { en: '2⁴⁶ and the largest odd value near the limit.', bn: '২⁴⁶ আর সীমার কাছের সবচেয়ে বড় বিজোড় মান।' } },
    { input: '1\n100000000000000', output: 'YES', source: 'own', note: { en: 'n = 10¹⁴ = 2¹⁴ × 5¹⁴.', bn: 'n = ১০¹⁴ = ২¹⁴ × ৫¹⁴।' } },
  ],

  pitfalls: [
    { en: 'Reading n into int: 10¹⁴ does not fit.', bn: 'n-কে int-এ পড়া: ১০¹⁴ আঁটে না।' },
    { en: 'Writing n & n − 1 == 0 without parentheses; it parses as n & ((n − 1) == 0).', bn: 'বন্ধনী ছাড়া n & n − 1 == 0 লেখা; এটি n & ((n − 1) == 0) হিসেবে পড়া হয়।' },
    { en: 'Using __builtin_popcount (32-bit) instead of __builtin_popcountll on a long long.', bn: 'long long-এ __builtin_popcountll-এর বদলে __builtin_popcount (৩২-বিট) ব্যবহার করা।' },
    { en: 'Trial division up to √n for every test: correct but too slow.', bn: 'প্রতিটি টেস্টে √n পর্যন্ত ভাগ করে দেখা: সঠিক কিন্তু খুব ধীর।' },
  ],

  related: [
    { id: '4A', name: 'Watermelon', why: { en: 'Another parity question.', bn: 'আরেকটি জোড়-বিজোড়ের প্রশ্ন।' } },
    { id: '617A', name: 'Elephant', why: { en: 'Another one-line math answer.', bn: 'আরেকটি এক লাইনের গাণিতিক উত্তর।' } },
  ],
  toolkit: ['bitwise-and', 'popcount', 'bit-shift', 'long-long'],
};
