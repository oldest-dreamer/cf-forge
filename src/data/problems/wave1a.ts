import type { ProblemEntry } from './types';

const raw = String.raw;

export const p282A: ProblemEntry = {
  id: '282A',
  contestId: 282,
  index: 'A',
  name: 'Bit++',
  rating: 800,
  tags: ['implementation'],
  why: {
    en: 'Reading a list of commands and updating a variable: the shape of countless simulation problems.',
    bn: 'আদেশের একটি তালিকা পড়ে একটি ভেরিয়েবল আপডেট করা: অসংখ্য সিমুলেশন প্রবলেমের কাঠামো।',
  },
  statement: {
    en: 'A tiny language has one variable x, starting at 0, and two operations: ++ adds 1 and -- subtracts 1. Each statement is an operation and x written together with no spaces, in either order, like X++ or --X. Run n statements and print the final x.',
    bn: 'একটি ছোট্ট ভাষায় একটি ভেরিয়েবল x আছে, শুরুতে ০, আর দুটি অপারেশন: ++ এক যোগ করে আর -- এক বিয়োগ করে। প্রতিটি স্টেটমেন্টে অপারেশন আর x স্পেস ছাড়া একসঙ্গে লেখা, যেকোনো ক্রমে, যেমন X++ বা --X। n-টি স্টেটমেন্ট চালিয়ে শেষ x প্রিন্ট করুন।',
  },
  input: { en: 'n, then n statements, one per line.', bn: 'n, তারপর প্রতি লাইনে একটি করে n-টি স্টেটমেন্ট।' },
  output: { en: 'The final value of x.', bn: 'x-এর শেষ মান।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '1 ≤ n ≤ 150', bn: '১ ≤ n ≤ ১৫০' }] },
  samples: [
    { input: '1\n++X', output: '1', explain: { en: 'One increment.', bn: 'একবার বাড়ানো।' } },
    { input: '2\nX++\n--X', output: '0', explain: { en: 'Up one, down one.', bn: 'এক ওপরে, এক নিচে।' } },
  ],
  observation: {
    en: 'Every statement is exactly three characters, and the middle one is always an operation sign. So s[1] alone tells you + or −.',
    bn: 'প্রতিটি স্টেটমেন্ট ঠিক তিন অক্ষরের, আর মাঝেরটি সবসময় অপারেশনের চিহ্ন। তাই শুধু s[1] দেখেই + নাকি − বোঝা যায়।',
  },
  approach: [
    { en: 'Read each statement as a string and add 1 or subtract 1 depending on its middle character.', bn: 'প্রতিটি স্টেটমেন্ট স্ট্রিং হিসেবে পড়ে মাঝের অক্ষর দেখে ১ যোগ বা বিয়োগ করুন।' },
  ],
  walkthrough: {
    input: '3\nX++\n--X\nX++',
    steps: [
      { state: 'x = 1', text: { en: 'X++: middle is +.', bn: 'X++: মাঝে +।' } },
      { state: 'x = 0', text: { en: '--X: middle is −.', bn: '--X: মাঝে −।' } },
      { state: 'x = 1', text: { en: 'X++ again. Print 1.', bn: 'আবার X++। প্রিন্ট ১।' } },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: { en: 'Constant work per statement.', bn: 'প্রতি স্টেটমেন্টে নির্দিষ্ট কাজ।' } },
  solutions: [
    {
      id: 'middle',
      kind: 'optimal',
      title: { en: 'Look at the middle character', bn: 'মাঝের অক্ষর দেখা' },
      idea: { en: 's[1] is + or − in all four forms.', bn: 'চারটি রূপেই s[1] হলো + বা −।' },
      explain: [
        {
          en: 'The four possible statements are ++X, X++, --X and X--. In every one of them, index 1 holds a + or a −, so a single comparison decides the update.',
          bn: 'সম্ভাব্য চারটি স্টেটমেন্ট ++X, X++, --X আর X--। প্রতিটিতে ইনডেক্স ১-এ + বা − থাকে, তাই একটি তুলনাই আপডেট ঠিক করে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x = 0;
    cin >> n;
    while (n--) {
        string s;
        cin >> s;
        if (s[1] == '+') x++;
        else x--;
    }
    cout << x << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics', 'while-n'],
    },
    {
      id: 'find',
      kind: 'alt',
      title: { en: 'Search for "++"', bn: '"++" খোঁজা' },
      idea: { en: 'A statement increments exactly when it contains "++".', bn: 'স্টেটমেন্টে "++" থাকলেই ঠিক তখন বাড়ে।' },
      explain: [
        {
          en: 's.find("++") returns string::npos when the text is absent. This version does not depend on the exact position of the sign, so it would survive if the statements had extra characters.',
          bn: 'লেখাটি না থাকলে s.find("++") string::npos ফেরত দেয়। এই সংস্করণ চিহ্নের ঠিক অবস্থানের ওপর নির্ভর করে না, তাই স্টেটমেন্টে বাড়তি অক্ষর থাকলেও কাজ করত।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        x += (s.find("++") != string::npos) ? 1 : -1;
    }
    cout << x << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics', 'ternary'],
    },
  ],
  tests: [
    { input: '1\n++X', output: '1', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '2\nX++\n--X', output: '0', source: 'sample', note: { en: 'Second sample.', bn: 'দ্বিতীয় স্যাম্পল।' } },
    { input: '3\nX--\n--X\nX--', output: '-3', source: 'own', note: { en: 'The answer can be negative.', bn: 'উত্তর ঋণাত্মক হতে পারে।' } },
  ],
  pitfalls: [
    { en: 'Checking only s[0], which is X in X++ and X--.', bn: 'শুধু s[0] দেখা, যা X++ আর X---এ X।' },
    { en: 'Using unsigned or starting x somewhere other than 0.', bn: 'unsigned ব্যবহার করা বা x-কে ০ ছাড়া অন্য মানে শুরু করা।' },
  ],
  related: [{ id: '977A', name: 'Wrong Subtraction', why: { en: 'Another step-by-step simulation.', bn: 'আরেকটি ধাপে ধাপে সিমুলেশন।' } }],
  toolkit: ['string-basics', 'while-n'],
};

export const p263A: ProblemEntry = {
  id: '263A',
  contestId: 263,
  index: 'A',
  name: 'Beautiful Matrix',
  rating: 800,
  tags: ['implementation'],
  why: {
    en: 'Reading a grid, finding a cell, and noticing that “number of swaps” is really a distance.',
    bn: 'একটি গ্রিড পড়া, একটি ঘর খোঁজা, আর বোঝা যে “অদলবদলের সংখ্যা” আসলে একটি দূরত্ব।',
  },
  statement: {
    en: 'A 5 × 5 matrix contains twenty-four 0s and a single 1. In one move you may swap two neighbouring rows or two neighbouring columns. Find the fewest moves that bring the 1 to the centre cell (row 3, column 3).',
    bn: 'একটি ৫ × ৫ ম্যাট্রিক্সে চব্বিশটি ০ আর একটি মাত্র ১। এক চালে পাশাপাশি দুটি সারি বা পাশাপাশি দুটি কলাম অদলবদল করা যায়। ১-কে মাঝের ঘরে (সারি ৩, কলাম ৩) আনতে সবচেয়ে কম কত চাল লাগবে?',
  },
  input: { en: 'Five lines of five numbers each.', bn: 'পাঁচটি লাইন, প্রতিটিতে পাঁচটি সংখ্যা।' },
  output: { en: 'The minimum number of moves.', bn: 'সর্বনিম্ন চালের সংখ্যা।' },
  limits: { timeSec: 2, memoryMb: 256, notes: [{ en: 'Exactly one cell holds 1.', bn: 'ঠিক একটি ঘরে ১।' }] },
  samples: [
    {
      input: '0 0 0 0 0\n0 0 0 0 1\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0',
      output: '3',
      explain: { en: 'The 1 is at row 2, column 5: one row move and two column moves.', bn: '১ আছে সারি ২, কলাম ৫-এ: এক সারি চাল আর দুই কলাম চাল।' },
    },
    {
      input: '0 0 0 0 0\n0 0 0 0 0\n0 1 0 0 0\n0 0 0 0 0\n0 0 0 0 0',
      output: '1',
      explain: { en: 'Row 3, column 2: one column move.', bn: 'সারি ৩, কলাম ২: এক কলাম চাল।' },
    },
  ],
  observation: {
    en: 'A row swap moves the 1 up or down by one and never changes its column; a column swap does the reverse. So the moves split into |row − 3| row moves and |col − 3| column moves.',
    bn: 'সারি অদলবদলে ১ এক ঘর ওপরে বা নিচে যায় আর কলাম কখনো বদলায় না; কলাম অদলবদলে উল্টোটা। তাই চালগুলো ভাগ হয় |row − 3| সারি চাল আর |col − 3| কলাম চালে।',
  },
  approach: [
    { en: 'Find the 1 while reading, then print |row − 3| + |col − 3| (1-based).', bn: 'পড়ার সময় ১ খুঁজুন, তারপর |row − 3| + |col − 3| প্রিন্ট করুন (১-ভিত্তিক)।' },
  ],
  walkthrough: {
    input: '1 at row 2, column 5',
    steps: [
      { state: '|2 − 3| = 1', text: { en: 'One row swap.', bn: 'এক সারি অদলবদল।' } },
      { state: '|5 − 3| = 2', text: { en: 'Two column swaps. Total 3.', bn: 'দুই কলাম অদলবদল। মোট ৩।' } },
    ],
  },
  complexity: { time: 'O(25)', space: 'O(1)', why: { en: 'Read 25 numbers once.', bn: '২৫টি সংখ্যা একবার পড়া।' } },
  solutions: [
    {
      id: 'distance',
      kind: 'optimal',
      title: { en: 'Manhattan distance to the centre', bn: 'মাঝ পর্যন্ত ম্যানহাটন দূরত্ব' },
      idea: { en: 'Moves needed = |row − 3| + |col − 3|.', bn: 'প্রয়োজনীয় চাল = |row − 3| + |col − 3|।' },
      explain: [
        {
          en: 'Count rows and columns from 1 so the centre is (3, 3). Each move fixes at most one unit of one coordinate, and you can always fix one, so the sum of the two distances is both necessary and enough.',
          bn: 'সারি আর কলাম ১ থেকে গুনুন, তাহলে মাঝ (৩, ৩)। প্রতিটি চাল একটি স্থানাঙ্কের সর্বোচ্চ এক ঘর ঠিক করে, আর একটা সবসময় ঠিক করা যায়, তাই দুই দূরত্বের যোগফল প্রয়োজনীয় আর যথেষ্ট দুটোই।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int row = 0, col = 0;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= 5; j++) {
            int x;
            cin >> x;
            if (x == 1) {
                row = i;
                col = j;
            }
        }
    }
    cout << abs(row - 3) + abs(col - 3) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
    {
      id: 'simulate',
      kind: 'brute',
      title: { en: 'Simulate the swaps', bn: 'অদলবদল সিমুলেট করা' },
      idea: { en: 'Move the 1 one step toward the centre at a time and count.', bn: 'একবারে এক ঘর করে ১-কে মাঝের দিকে সরিয়ে গুনুন।' },
      explain: [
        {
          en: 'If you do not trust the formula yet, act it out: while the row is not 3, step it toward 3; then do the same for the column. Counting the steps gives the same answer, which is a good way to convince yourself.',
          bn: 'সূত্রে এখনো ভরসা না হলে করে দেখুন: সারি ৩ না হওয়া পর্যন্ত ৩-এর দিকে এক ঘর সরান; তারপর কলামেও একই। ধাপ গুনলে একই উত্তর আসে, যা নিজেকে বোঝানোর ভালো উপায়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int row = 0, col = 0;
    for (int i = 1; i <= 5; i++)
        for (int j = 1; j <= 5; j++) {
            int x;
            cin >> x;
            if (x) row = i, col = j;
        }
    int moves = 0;
    while (row != 3) { row += (row < 3) ? 1 : -1; moves++; }
    while (col != 3) { col += (col < 3) ? 1 : -1; moves++; }
    cout << moves << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n', 'ternary'],
    },
  ],
  tests: [
    { input: '0 0 0 0 0\n0 0 0 0 1\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0', output: '3', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '0 0 0 0 0\n0 0 0 0 0\n0 1 0 0 0\n0 0 0 0 0\n0 0 0 0 0', output: '1', source: 'sample', note: { en: 'Second sample.', bn: 'দ্বিতীয় স্যাম্পল।' } },
    { input: '1 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0', output: '4', source: 'own', note: { en: 'Corner: the farthest case.', bn: 'কোণা: সবচেয়ে দূরের কেস।' } },
    { input: '0 0 0 0 0\n0 0 0 0 0\n0 0 1 0 0\n0 0 0 0 0\n0 0 0 0 0', output: '0', source: 'own', note: { en: 'Already in the centre.', bn: 'আগেই মাঝে।' } },
  ],
  pitfalls: [
    { en: 'Using 0-based loops but comparing with 3 instead of 2.', bn: '০-ভিত্তিক লুপ চালিয়ে ২-এর বদলে ৩-এর সঙ্গে তুলনা করা।' },
    { en: 'Trying to simulate actual row and column swaps of the whole matrix: correct but needless work.', bn: 'পুরো ম্যাট্রিক্সের সারি আর কলাম সত্যিই অদলবদল করে সিমুলেট করা: সঠিক কিন্তু অপ্রয়োজনীয়।' },
  ],
  related: [{ id: '266A', name: 'Stones on the Table', why: { en: 'Another reading-and-counting problem.', bn: 'আরেকটি পড়ে গোনার প্রবলেম।' } }],
  toolkit: ['for-loop'],
};

export const p977A: ProblemEntry = {
  id: '977A',
  contestId: 977,
  index: 'A',
  name: 'Wrong Subtraction',
  rating: 800,
  tags: ['implementation'],
  why: {
    en: 'Follow a strange rule exactly, k times. Practice for “simulate what the statement says”.',
    bn: 'একটি অদ্ভুত নিয়ম হুবহু k বার মানা। “স্টেটমেন্ট যা বলে তা সিমুলেট করো”-র অনুশীলন।',
  },
  statement: {
    en: 'A girl subtracts one from a number in an odd way: if the last digit is not zero, she decreases the number by one; if the last digit is zero, she divides the number by 10 (drops the zero). Starting from n, she does this k times. Print the result. It is guaranteed to stay positive.',
    bn: 'একটি মেয়ে অদ্ভুতভাবে একটি সংখ্যা থেকে এক বিয়োগ করে: শেষ অঙ্ক শূন্য না হলে সংখ্যাটি এক কমায়; শেষ অঙ্ক শূন্য হলে সংখ্যাটিকে ১০ দিয়ে ভাগ করে (শূন্যটি বাদ দেয়)। n থেকে শুরু করে সে এটি k বার করে। ফল প্রিন্ট করুন। নিশ্চিত যে এটি ধনাত্মক থাকবে।',
  },
  input: { en: 'Two integers n and k.', bn: 'দুটি পূর্ণসংখ্যা n আর k।' },
  output: { en: 'The number after k operations.', bn: 'k-টি অপারেশনের পরের সংখ্যা।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '2 ≤ n ≤ 10⁹, 1 ≤ k ≤ 50', bn: '২ ≤ n ≤ ১০⁹, ১ ≤ k ≤ ৫০' }] },
  samples: [
    { input: '512 4', output: '50', explain: { en: '512 → 511 → 510 → 51 → 50.', bn: '৫১২ → ৫১১ → ৫১০ → ৫১ → ৫০।' } },
    { input: '1000000000 9', output: '1', explain: { en: 'Each step drops one zero.', bn: 'প্রতি ধাপে একটি শূন্য বাদ যায়।' } },
  ],
  observation: {
    en: 'k is at most 50, so there is no trick needed: simulate all k steps.',
    bn: 'k সর্বোচ্চ ৫০, তাই কোনো কৌশল লাগে না: সব k ধাপ সিমুলেট করুন।',
  },
  approach: [
    { en: 'Loop k times; inside, check n % 10 and apply the matching rule.', bn: 'k বার লুপ চালান; ভেতরে n % 10 দেখে মিলে যাওয়া নিয়ম প্রয়োগ করুন।' },
  ],
  walkthrough: {
    input: '512 4',
    steps: [
      { state: '512 → 511', text: { en: 'Last digit 2: subtract one.', bn: 'শেষ অঙ্ক ২: এক বিয়োগ।' } },
      { state: '511 → 510', text: { en: 'Last digit 1: subtract one.', bn: 'শেষ অঙ্ক ১: এক বিয়োগ।' } },
      { state: '510 → 51', text: { en: 'Last digit 0: divide by 10.', bn: 'শেষ অঙ্ক ০: ১০ দিয়ে ভাগ।' } },
      { state: '51 → 50', text: { en: 'Subtract one. Print 50.', bn: 'এক বিয়োগ। প্রিন্ট ৫০।' } },
    ],
  },
  complexity: { time: 'O(k)', space: 'O(1)', why: { en: 'At most 50 steps.', bn: 'সর্বোচ্চ ৫০ ধাপ।' } },
  solutions: [
    {
      id: 'simulate',
      kind: 'optimal',
      title: { en: 'Simulate k steps', bn: 'k ধাপ সিমুলেট করা' },
      idea: { en: 'Apply the rule k times.', bn: 'নিয়মটি k বার প্রয়োগ করুন।' },
      explain: [
        {
          en: 'n % 10 is the last digit. The if/else mirrors the two rules exactly. Since k ≤ 50 and n ≤ 10⁹, everything fits in int and runs instantly.',
          bn: 'n % 10 হলো শেষ অঙ্ক। if/else দুটি নিয়ম হুবহু অনুসরণ করে। k ≤ ৫০ আর n ≤ ১০⁹ হওয়ায় সবকিছু int-এ আঁটে আর সঙ্গে সঙ্গে চলে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    for (int i = 0; i < k; i++) {
        if (n % 10 != 0) n--;
        else n /= 10;
    }
    cout << n << "\n";
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'modulo'],
    },
    {
      id: 'string',
      kind: 'alt',
      title: { en: 'Work on the digits as text', bn: 'অঙ্কগুলোকে লেখা হিসেবে ধরা' },
      idea: { en: 'Treat n as a string: drop a trailing "0", or decrement the last digit character.', bn: 'n-কে স্ট্রিং ধরুন: শেষের "0" বাদ দিন, বা শেষ অঙ্কের অক্ষর এক কমান।' },
      explain: [
        {
          en: 'When the last digit is not 0, subtracting one only changes that last character (5 → 4, 1 → 0), so s.back()-- is enough. When it is 0, dividing by 10 removes the last character. The guarantee that the result stays positive means the string never becomes empty.',
          bn: 'শেষ অঙ্ক ০ না হলে এক বিয়োগ শুধু শেষ অক্ষরটাই বদলায় (৫ → ৪, ১ → ০), তাই s.back()-- যথেষ্ট। ০ হলে ১০ দিয়ে ভাগ মানে শেষ অক্ষর সরানো। ফল ধনাত্মক থাকার নিশ্চয়তা মানে স্ট্রিং কখনো খালি হয় না।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    int k;
    cin >> s >> k;
    while (k--) {
        if (s.back() == '0') s.pop_back();
        else s.back()--;
    }
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(digits)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '512 4', output: '50', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '1000000000 9', output: '1', source: 'sample', note: { en: 'Second sample.', bn: 'দ্বিতীয় স্যাম্পল।' } },
    { input: '131 3', output: '12', source: 'own', note: { en: 'No zeros at all.', bn: 'কোনো শূন্য নেই।' } },
    { input: '20 2', output: '1', source: 'own', note: { en: 'Divide, then subtract.', bn: 'ভাগ, তারপর বিয়োগ।' } },
  ],
  pitfalls: [
    { en: 'Swapping the two rules, which turns 510 into 509.', bn: 'দুটি নিয়ম উল্টে ফেলা, যাতে ৫১০ হয় ৫০৯।' },
  ],
  related: [{ id: '282A', name: 'Bit++', why: { en: 'Another rule applied step by step.', bn: 'আরেকটি ধাপে ধাপে প্রয়োগ করা নিয়ম।' } }],
  toolkit: ['modulo', 'for-loop'],
};

export const p791A: ProblemEntry = {
  id: '791A',
  contestId: 791,
  index: 'A',
  name: 'Bear and Big Brother',
  rating: 800,
  tags: ['implementation'],
  why: {
    en: 'A loop that runs until a condition flips: the “count the years” pattern.',
    bn: 'একটি শর্ত উল্টে না যাওয়া পর্যন্ত চলা লুপ: “বছর গোনো” প্যাটার্ন।',
  },
  statement: {
    en: 'Limak weighs a and his brother Bob weighs b, with a ≤ b. Every year Limak’s weight triples and Bob’s doubles. After how many full years will Limak be strictly heavier than Bob?',
    bn: 'লিমাকের ওজন a আর তার ভাই ববের ওজন b, যেখানে a ≤ b। প্রতি বছর লিমাকের ওজন তিন গুণ আর ববের দুই গুণ হয়। কত পূর্ণ বছর পর লিমাক ববের চেয়ে কঠোরভাবে ভারী হবে?',
  },
  input: { en: 'Two integers a and b.', bn: 'দুটি পূর্ণসংখ্যা a আর b।' },
  output: { en: 'The number of years.', bn: 'বছরের সংখ্যা।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '1 ≤ a ≤ b ≤ 10', bn: '১ ≤ a ≤ b ≤ ১০' }] },
  samples: [
    { input: '4 7', output: '2', explain: { en: '12 vs 14 after one year, 36 vs 28 after two.', bn: 'এক বছর পর ১২ বনাম ১৪, দুই বছর পর ৩৬ বনাম ২৮।' } },
    { input: '4 9', output: '3', explain: { en: '12/18, 36/36 (equal is not enough), 108/72.', bn: '১২/১৮, ৩৬/৩৬ (সমান যথেষ্ট নয়), ১০৮/৭২।' } },
    { input: '1 1', output: '1', explain: { en: '3 vs 2 after one year.', bn: 'এক বছর পর ৩ বনাম ২।' } },
  ],
  observation: {
    en: 'The ratio a / b grows by 1.5 each year, so the loop always ends quickly; with b ≤ 10 it takes at most 6 years.',
    bn: 'a / b অনুপাত প্রতি বছর ১.৫ গুণ বাড়ে, তাই লুপ সবসময় দ্রুত শেষ হয়; b ≤ ১০ হলে সর্বোচ্চ ৬ বছর।',
  },
  approach: [
    { en: 'While a ≤ b, multiply a by 3 and b by 2 and count a year.', bn: 'a ≤ b থাকা পর্যন্ত a-কে ৩ আর b-কে ২ দিয়ে গুণ করে এক বছর গুনুন।' },
  ],
  walkthrough: {
    input: '4 9',
    steps: [
      { state: '12, 18', text: { en: 'Year 1: still lighter.', bn: 'বছর ১: এখনো হালকা।' } },
      { state: '36, 36', text: { en: 'Year 2: equal, keep going.', bn: 'বছর ২: সমান, চলতে থাকুন।' } },
      { state: '108, 72', text: { en: 'Year 3: heavier. Answer 3.', bn: 'বছর ৩: ভারী। উত্তর ৩।' } },
    ],
  },
  complexity: { time: 'O(log(b/a))', space: 'O(1)', why: { en: 'At most a handful of iterations.', bn: 'হাতে গোনা কয়েকবার।' } },
  solutions: [
    {
      id: 'loop',
      kind: 'optimal',
      title: { en: 'Simulate year by year', bn: 'বছর ধরে ধরে সিমুলেট করা' },
      idea: { en: 'Loop while a ≤ b, updating both weights.', bn: 'a ≤ b থাকা পর্যন্ত দুটি ওজন আপডেট করে লুপ চালান।' },
      explain: [
        {
          en: 'The loop condition is the opposite of what we wait for: we stop when a > b, so we continue while a ≤ b. That small detail handles the “equal is not enough” case of the second sample.',
          bn: 'লুপের শর্ত আমরা যার অপেক্ষায় তার উল্টো: a > b হলে থামি, তাই a ≤ b থাকা পর্যন্ত চলি। এই ছোট বিষয়টিই দ্বিতীয় স্যাম্পলের “সমান যথেষ্ট নয়” কেস সামলায়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int years = 0;
    while (a <= b) {
        a *= 3;
        b *= 2;
        years++;
    }
    cout << years << "\n";
    return 0;
}
`,
      time: 'O(log(b/a))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'for',
      kind: 'alt',
      title: { en: 'A for loop with the answer as its counter', bn: 'উত্তরকে কাউন্টার করে for লুপ' },
      idea: { en: 'The loop variable itself counts the years.', bn: 'লুপের ভেরিয়েবলই বছর গোনে।' },
      explain: [
        {
          en: 'A for loop can have an empty body: all the work happens in its third part. After the loop, the counter holds the number of years. Compact, but make sure the condition still reads clearly.',
          bn: 'for লুপের বডি খালি থাকতে পারে: সব কাজ তৃতীয় অংশে হয়। লুপের পর কাউন্টারে বছরের সংখ্যা থাকে। সংক্ষিপ্ত, কিন্তু খেয়াল রাখুন শর্তটি যেন পরিষ্কার পড়া যায়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, years;
    cin >> a >> b;
    for (years = 0; a <= b; years++) {
        a *= 3;
        b *= 2;
    }
    cout << years << "\n";
    return 0;
}
`,
      time: 'O(log(b/a))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '4 7', output: '2', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '4 9', output: '3', source: 'sample', note: { en: 'Equal weights after two years.', bn: 'দুই বছর পর সমান ওজন।' } },
    { input: '1 1', output: '1', source: 'sample', note: { en: 'Equal at the start.', bn: 'শুরুতেই সমান।' } },
    { input: '1 10', output: '6', source: 'own', note: { en: 'The largest gap.', bn: 'সবচেয়ে বড় ব্যবধান।' } },
  ],
  pitfalls: [{ en: 'Using a < b as the loop condition, which stops on equal weights.', bn: 'লুপের শর্ত a < b লেখা, যা সমান ওজনে থেমে যায়।' }],
  related: [{ id: '977A', name: 'Wrong Subtraction', why: { en: 'Another short simulation.', bn: 'আরেকটি ছোট সিমুলেশন।' } }],
  toolkit: ['while-n'],
};

export const p1328A: ProblemEntry = {
  id: '1328A',
  contestId: 1328,
  index: 'A',
  name: 'Divisibility Problem',
  rating: 800,
  tags: ['math'],
  why: {
    en: 'Turns a loop into a remainder formula, and adds the “t test cases” input format.',
    bn: 'একটি লুপকে ভাগশেষের সূত্রে বদলে দেয়, সঙ্গে “t টেস্ট কেস” ইনপুট ফরম্যাট।',
  },
  statement: {
    en: 'You have two positive integers a and b. In one move you add 1 to a. Find the fewest moves after which a is divisible by b.',
    bn: 'আপনার কাছে দুটি ধনাত্মক পূর্ণসংখ্যা a আর b আছে। এক চালে a-তে ১ যোগ করেন। সবচেয়ে কম কত চালে a, b দিয়ে বিভাজ্য হবে?',
  },
  input: { en: 't, then t lines with a and b.', bn: 't, তারপর t-টি লাইনে a আর b।' },
  output: { en: 'For each test, the number of moves.', bn: 'প্রতিটি টেস্টে চালের সংখ্যা।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '1 ≤ t ≤ 10⁴, 1 ≤ a, b ≤ 10⁹', bn: '১ ≤ t ≤ ১০⁴, ১ ≤ a, b ≤ ১০⁹' }] },
  samples: [
    {
      input: '5\n10 4\n13 9\n100 13\n123 456\n92 46',
      output: '2\n5\n4\n333\n0',
      explain: { en: '10 + 2 = 12 = 3·4. 92 is already 2·46, so 0 moves.', bn: '১০ + ২ = ১২ = ৩·৪। ৯২ আগেই ২·৪৬, তাই ০ চাল।' },
    },
  ],
  observation: {
    en: 'a mod b says how far a is past the previous multiple of b. The next multiple is b − (a mod b) away, except when a mod b is 0, where the answer is 0.',
    bn: 'a mod b বলে a, b-এর আগের গুণিতক থেকে কতটা সামনে। পরের গুণিতক b − (a mod b) দূরে, তবে a mod b শূন্য হলে উত্তর ০।',
  },
  approach: [
    { en: 'Print (b − a % b) % b for each test. The outer % b turns the case “b − 0 = b” back into 0.', bn: 'প্রতিটি টেস্টে (b − a % b) % b প্রিন্ট করুন। বাইরের % b, “b − ০ = b” কেসটিকে আবার ০-তে ফেরায়।' },
  ],
  walkthrough: {
    input: 'a = 13, b = 9',
    steps: [
      { state: '13 % 9 = 4', text: { en: '13 is 4 past the multiple 9.', bn: '১৩ হলো গুণিতক ৯-এর ৪ ঘর পরে।' } },
      { state: '9 − 4 = 5', text: { en: 'The next multiple, 18, is 5 away.', bn: 'পরের গুণিতক ১৮, ৫ ঘর দূরে।' } },
    ],
  },
  complexity: { time: 'O(1) per test', space: 'O(1)', why: { en: 'One formula per test.', bn: 'প্রতি টেস্টে একটি সূত্র।' } },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: { en: 'Remainder formula', bn: 'ভাগশেষের সূত্র' },
      idea: { en: '(b − a mod b) mod b.', bn: '(b − a mod b) mod b।' },
      explain: [
        {
          en: 'Adding one at a time could take up to 10⁹ moves per test, and with 10⁴ tests that is far too slow. The remainder tells the distance directly.',
          bn: 'একবারে এক করে যোগ করলে প্রতি টেস্টে ১০⁹ চাল পর্যন্ত লাগতে পারে, আর ১০⁴টি টেস্টে তা অনেক ধীর। ভাগশেষ সরাসরি দূরত্ব বলে দেয়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << (b - a % b) % b << "\n";
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'while-n'],
    },
    {
      id: 'ceil',
      kind: 'method',
      title: { en: 'Next multiple with ceiling division', bn: 'সিলিং ভাগ দিয়ে পরের গুণিতক' },
      idea: { en: 'The target is the smallest multiple of b that is ≥ a: ⌈a / b⌉ · b. The answer is that minus a.', bn: 'লক্ষ্য হলো a-এর সমান বা বড় b-এর সবচেয়ে ছোট গুণিতক: ⌈a / b⌉ · b। উত্তর তা থেকে a বাদ।' },
      explain: [
        {
          en: 'Thinking “which multiple do I land on?” is often easier than thinking about remainders. ⌈a / b⌉ counts how many b’s are needed to reach at least a; multiply back by b to get that multiple.',
          bn: '“কোন গুণিতকে পৌঁছাব?” ভাবা প্রায়ই ভাগশেষ নিয়ে ভাবার চেয়ে সহজ। ⌈a / b⌉ গোনে কমপক্ষে a-তে পৌঁছাতে কতগুলো b লাগে; আবার b দিয়ে গুণ করলে সেই গুণিতক পাওয়া যায়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        long long target = (a + b - 1) / b * b;
        cout << target - a << "\n";
    }
    return 0;
}
`,
      time: 'O(1) per test',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div', 'long-long'],
    },
  ],
  tests: [
    { input: '5\n10 4\n13 9\n100 13\n123 456\n92 46', output: '2\n5\n4\n333\n0', source: 'sample', note: { en: 'The statement sample.', bn: 'স্টেটমেন্টের স্যাম্পল।' } },
    { input: '2\n1 1\n1 1000000000', output: '0\n999999999', source: 'own', note: { en: 'b = 1, and the biggest jump.', bn: 'b = ১, আর সবচেয়ে বড় লাফ।' } },
    { input: '1\n1000000000 999999999', output: '999999998', source: 'own', note: { en: 'a just past a multiple.', bn: 'a গুণিতকের ঠিক পরে।' } },
  ],
  pitfalls: [
    { en: 'Printing b − a % b, which gives b instead of 0 when a is already divisible.', bn: 'b − a % b প্রিন্ট করা, যা a আগেই বিভাজ্য হলে ০-এর বদলে b দেয়।' },
    { en: 'Simulating a++ in a loop: up to 10⁹ steps per test.', bn: 'লুপে a++ সিমুলেট করা: প্রতি টেস্টে ১০⁹ ধাপ পর্যন্ত।' },
  ],
  related: [{ id: '617A', name: 'Elephant', why: { en: 'Ceiling division again.', bn: 'আবার সিলিং ভাগ।' } }],
  toolkit: ['modulo', 'ceil-div'],
};

export const p486A: ProblemEntry = {
  id: '486A',
  contestId: 486,
  index: 'A',
  name: 'Calculating Function',
  rating: 800,
  tags: ['implementation', 'math'],
  why: {
    en: 'n up to 10¹⁵ forbids a loop. Pairing the terms gives the answer in one line.',
    bn: 'n ১০¹⁵ পর্যন্ত হওয়ায় লুপ চলে না। পদগুলো জোড়া করলে এক লাইনে উত্তর মেলে।',
  },
  statement: {
    en: 'For a positive integer n, define f(n) = −1 + 2 − 3 + 4 − … + (−1)ⁿ · n: odd numbers are subtracted and even numbers are added. Compute f(n).',
    bn: 'ধনাত্মক পূর্ণসংখ্যা n-এর জন্য f(n) = −1 + 2 − 3 + 4 − … + (−1)ⁿ · n: বিজোড় সংখ্যা বিয়োগ আর জোড় সংখ্যা যোগ হয়। f(n) নির্ণয় করুন।',
  },
  input: { en: 'One integer n.', bn: 'একটি পূর্ণসংখ্যা n।' },
  output: { en: 'The value f(n).', bn: 'f(n)-এর মান।' },
  limits: { timeSec: 1, memoryMb: 256, notes: [{ en: '1 ≤ n ≤ 10¹⁵', bn: '১ ≤ n ≤ ১০¹⁵' }] },
  samples: [
    { input: '4', output: '2', explain: { en: '−1 + 2 − 3 + 4 = 2.', bn: '−১ + ২ − ৩ + ৪ = ২।' } },
    { input: '5', output: '-3', explain: { en: '−1 + 2 − 3 + 4 − 5 = −3.', bn: '−১ + ২ − ৩ + ৪ − ৫ = −৩।' } },
  ],
  observation: {
    en: 'Each pair (−(2i − 1) + 2i) equals 1. For even n there are n/2 pairs, so f(n) = n/2. For odd n, the n − 1 first terms give (n − 1)/2 and the last term subtracts n, so f(n) = −(n + 1)/2.',
    bn: 'প্রতিটি জোড়া (−(2i − 1) + 2i)-এর মান ১। n জোড় হলে n/2-টি জোড়া, তাই f(n) = n/2। n বিজোড় হলে প্রথম n − 1-টি পদ দেয় (n − 1)/2 আর শেষ পদ n বিয়োগ করে, তাই f(n) = −(n + 1)/2।',
  },
  approach: [
    { en: 'Read n as long long and print n/2 when n is even, or −(n + 1)/2 when n is odd.', bn: 'n-কে long long-এ পড়ুন; জোড় হলে n/2, বিজোড় হলে −(n + 1)/2 প্রিন্ট করুন।' },
  ],
  walkthrough: {
    input: '5',
    steps: [
      { state: '(−1 + 2) + (−3 + 4)', text: { en: 'Two pairs, each worth 1: total 2.', bn: 'দুটি জোড়া, প্রতিটির মান ১: মোট ২।' } },
      { state: '2 − 5 = −3', text: { en: 'The leftover −5. Answer −3 = −(5 + 1)/2.', bn: 'বাকি −৫। উত্তর −৩ = −(৫ + ১)/২।' } },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: { en: 'One formula.', bn: 'একটি সূত্র।' } },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: { en: 'Pair the terms', bn: 'পদগুলো জোড়া করা' },
      idea: { en: 'Even n: n/2. Odd n: −(n + 1)/2.', bn: 'জোড় n: n/2। বিজোড় n: −(n + 1)/2।' },
      explain: [
        {
          en: 'The pairing argument is in the observation. The only trap is the type: n is up to 10¹⁵, so both reading and printing must use long long.',
          bn: 'জোড়ার যুক্তি পর্যবেক্ষণে আছে। একমাত্র ফাঁদ হলো টাইপ: n ১০¹⁵ পর্যন্ত, তাই পড়া আর প্রিন্ট দুটোতেই long long লাগবে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if (n % 2 == 0) cout << n / 2 << "\n";
    else cout << -(n + 1) / 2 << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'modulo'],
    },
    {
      id: 'sums',
      kind: 'method',
      title: { en: 'Sum of evens minus sum of odds', bn: 'জোড়ের যোগফল বিয়োগ বিজোড়ের যোগফল' },
      idea: { en: 'Evens up to n sum to e(e + 1) where e = n/2; odds sum to o² where o = (n + 1)/2.', bn: 'n পর্যন্ত জোড়গুলোর যোগফল e(e + 1), যেখানে e = n/2; বিজোড়গুলোর যোগফল o², যেখানে o = (n + 1)/2।' },
      explain: [
        {
          en: 'f(n) is (2 + 4 + …) − (1 + 3 + …). With e even numbers, 2 + 4 + … + 2e = e(e + 1). With o odd numbers, 1 + 3 + … + (2o − 1) = o². Subtract.',
          bn: 'f(n) হলো (২ + ৪ + …) − (১ + ৩ + …)। e-টি জোড় সংখ্যায় ২ + ৪ + … + ২e = e(e + 1)। o-টি বিজোড় সংখ্যায় ১ + ৩ + … + (২o − ১) = o²। বিয়োগ করুন।',
        },
        {
          en: 'Careful with size: e and o are up to 5·10¹⁴, so e(e + 1) is about 2.5·10²⁹, which overflows long long. The two big terms cancel almost completely, so use __int128 for the middle step. This is a good lesson: a correct formula can still overflow.',
          bn: 'আকারে সাবধান: e আর o ৫·১০¹⁴ পর্যন্ত, তাই e(e + 1) প্রায় ২.৫·১০²⁹, যা long long ছাড়িয়ে যায়। দুটি বড় পদ প্রায় পুরোটা কাটাকাটি হয়, তাই মাঝের ধাপে __int128 নিন। ভালো শিক্ষা: সঠিক সূত্রও ওভারফ্লো করতে পারে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    __int128 e = n / 2, o = (n + 1) / 2;
    __int128 result = e * (e + 1) - o * o;
    cout << (long long)result << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '4', output: '2', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '5', output: '-3', source: 'sample', note: { en: 'Second sample.', bn: 'দ্বিতীয় স্যাম্পল।' } },
    { input: '1', output: '-1', source: 'own', note: { en: 'Smallest n.', bn: 'সবচেয়ে ছোট n।' } },
    { input: '1000000000000000', output: '500000000000000', source: 'own', note: { en: 'Largest even n.', bn: 'সবচেয়ে বড় জোড় n।' } },
    { input: '999999999999999', output: '-500000000000000', source: 'own', note: { en: 'Largest odd n.', bn: 'সবচেয়ে বড় বিজোড় n।' } },
  ],
  pitfalls: [
    { en: 'Looping to n: 10¹⁵ steps never finishes.', bn: 'n পর্যন্ত লুপ: ১০¹⁵ ধাপ কখনো শেষ হয় না।' },
    { en: 'Reading n into int.', bn: 'n-কে int-এ পড়া।' },
  ],
  related: [{ id: '4A', name: 'Watermelon', why: { en: 'Parity decides the answer again.', bn: 'আবারও জোড়-বিজোড় উত্তর ঠিক করে।' } }],
  toolkit: ['long-long', 'modulo'],
};

export const p50A: ProblemEntry = {
  id: '50A',
  contestId: 50,
  index: 'A',
  name: 'Domino piling',
  rating: 800,
  tags: ['greedy', 'math'],
  why: {
    en: 'A counting bound that is also always reachable: the simplest example of “upper bound + construction”.',
    bn: 'একটি গণনার সীমা যা সবসময় পৌঁছানোও যায়: “ঊর্ধ্ব সীমা + নির্মাণ”-এর সবচেয়ে সহজ উদাহরণ।',
  },
  statement: {
    en: 'A board has M × N squares. A domino covers two neighbouring squares. Dominoes may be rotated but must lie fully on the board and must not overlap. What is the largest number of dominoes you can place?',
    bn: 'একটি বোর্ডে M × N-টি বর্গ। একটি ডমিনো পাশাপাশি দুটি বর্গ ঢাকে। ডমিনো ঘোরানো যায়, কিন্তু পুরোটা বোর্ডের ওপর থাকতে হবে আর একটির ওপর আরেকটি পড়বে না। সর্বোচ্চ কতগুলো ডমিনো বসানো যায়?',
  },
  input: { en: 'Two integers M and N.', bn: 'দুটি পূর্ণসংখ্যা M আর N।' },
  output: { en: 'The maximum number of dominoes.', bn: 'সর্বোচ্চ ডমিনোর সংখ্যা।' },
  limits: { timeSec: 2, memoryMb: 256, notes: [{ en: '1 ≤ M ≤ N ≤ 16', bn: '১ ≤ M ≤ N ≤ ১৬' }] },
  samples: [
    { input: '2 4', output: '4', explain: { en: '8 squares, 4 dominoes, nothing left.', bn: '৮টি বর্গ, ৪টি ডমিনো, কিছু বাকি নেই।' } },
    { input: '3 3', output: '4', explain: { en: '9 squares: 4 dominoes and one square left over.', bn: '৯টি বর্গ: ৪টি ডমিনো আর একটি বর্গ বাকি।' } },
  ],
  observation: {
    en: 'Each domino uses 2 squares, so at most ⌊MN / 2⌋ fit. That many always fit: fill each row with horizontal dominoes, and if rows have odd length, pair up the leftover column vertically.',
    bn: 'প্রতিটি ডমিনো ২টি বর্গ নেয়, তাই সর্বোচ্চ ⌊MN / ২⌋-টি আঁটে। এতগুলো সবসময় আঁটে: প্রতিটি সারি আনুভূমিক ডমিনো দিয়ে ভরুন, আর সারির দৈর্ঘ্য বিজোড় হলে বাকি কলামটি খাড়াভাবে জোড়া করুন।',
  },
  approach: [
    { en: 'Print M · N / 2 with integer division.', bn: 'পূর্ণসংখ্যা ভাগে M · N / 2 প্রিন্ট করুন।' },
  ],
  walkthrough: {
    input: '3 3',
    steps: [
      { state: '9 squares', text: { en: 'At most ⌊9 / 2⌋ = 4 dominoes.', bn: 'সর্বোচ্চ ⌊৯ / ২⌋ = ৪টি ডমিনো।' } },
      { state: 'rows: 1 + 1 + 1', text: { en: 'One horizontal domino per row uses 6 squares; the last column’s top two cells take a vertical one. 4 placed.', bn: 'প্রতি সারিতে একটি আনুভূমিক ডমিনো ৬টি বর্গ নেয়; শেষ কলামের ওপরের দুই ঘরে একটি খাড়া। ৪টি বসল।' } },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: { en: 'One multiplication and one division.', bn: 'একটি গুণ আর একটি ভাগ।' } },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: { en: 'Half the squares, rounded down', bn: 'বর্গের অর্ধেক, নিচের দিকে রাউন্ড' },
      idea: { en: 'Upper bound MN/2, and a simple tiling reaches it.', bn: 'ঊর্ধ্ব সীমা MN/2, আর একটি সহজ বিন্যাস তাতে পৌঁছায়।' },
      explain: [
        {
          en: 'This is the “prove a limit, then show it is reachable” pattern. The bound comes from counting squares; the construction from tiling row by row. When both agree, the answer is exact.',
          bn: 'এটি “একটি সীমা প্রমাণ করো, তারপর দেখাও তা পৌঁছানো যায়” প্যাটার্ন। সীমা আসে বর্গ গুনে; নির্মাণ আসে সারি ধরে বিন্যাস করে। দুটি মিললে উত্তর সঠিক।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    cout << m * n / 2 << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'tile',
      kind: 'method',
      title: { en: 'Tile row by row', bn: 'সারি ধরে বিন্যাস' },
      idea: { en: 'Count the construction directly: horizontal dominoes per row, plus vertical ones in a leftover column.', bn: 'নির্মাণটি সরাসরি গুনুন: প্রতি সারির আনুভূমিক ডমিনো, আর বাকি কলামের খাড়া ডমিনো।' },
      explain: [
        {
          en: 'Each row of length N holds N / 2 horizontal dominoes. If N is odd, the last column is free in every row, and M cells stacked vertically hold M / 2 vertical dominoes. Adding these gives the same number as MN / 2, which proves the bound is reachable.',
          bn: 'N দৈর্ঘ্যের প্রতিটি সারিতে N / ২-টি আনুভূমিক ডমিনো ধরে। N বিজোড় হলে প্রতি সারির শেষ কলাম ফাঁকা থাকে, আর খাড়াভাবে সাজানো M-টি ঘরে M / ২-টি খাড়া ডমিনো ধরে। যোগ করলে MN / ২-এর সমান হয়, যা প্রমাণ করে সীমাটি পৌঁছানো যায়।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    int dominoes = m * (n / 2);          // horizontal, row by row
    if (n % 2 == 1) dominoes += m / 2;   // vertical, in the last column
    cout << dominoes << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo'],
    },
  ],
  tests: [
    { input: '2 4', output: '4', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '3 3', output: '4', source: 'sample', note: { en: 'Odd number of squares.', bn: 'বিজোড় সংখ্যক বর্গ।' } },
    { input: '1 1', output: '0', source: 'own', note: { en: 'No domino fits.', bn: 'কোনো ডমিনো আঁটে না।' } },
    { input: '16 16', output: '128', source: 'own', note: { en: 'Largest board.', bn: 'সবচেয়ে বড় বোর্ড।' } },
    { input: '5 7', output: '17', source: 'own', note: { en: 'Both sides odd.', bn: 'দুই বাহুই বিজোড়।' } },
  ],
  pitfalls: [{ en: 'Overthinking it with a search or DP: the counting bound is reachable.', bn: 'সার্চ বা DP দিয়ে অতিরিক্ত ভাবা: গণনার সীমাটিই পৌঁছানো যায়।' }],
  related: [{ id: '1A', name: 'Theatre Square', why: { en: 'Another tiling count.', bn: 'আরেকটি বিন্যাস গণনা।' } }],
  toolkit: ['io-basics'],
};
