import type { ProblemEntry } from './types';

export const p4A: ProblemEntry = {
  id: '4A',
  contestId: 4,
  index: 'A',
  name: 'Watermelon',
  rating: 800,
  tags: ['brute-force', 'math'],
  featuredFor: ['brute-force'],
  why: {
    en: 'The classic first problem. It shows how a loop over every split turns into a one-line condition once you see the pattern.',
    bn: 'ক্লাসিক প্রথম প্রবলেম। সব ভাগ পরীক্ষা করার লুপ প্যাটার্ন চোখে পড়লেই কীভাবে এক লাইনের শর্তে পরিণত হয়, তা দেখায়।',
  },

  statement: {
    en: 'Two friends buy one watermelon that weighs w kilos. They want to cut it into two pieces so that each piece weighs an even, positive whole number of kilos. The pieces do not have to be equal. Can they do it?',
    bn: 'দুই বন্ধু w কেজির একটি তরমুজ কিনেছে। তারা এটিকে দুই টুকরো করতে চায়, যাতে প্রতিটি টুকরোর ওজন একটি জোড়, ধনাত্মক পূর্ণসংখ্যা কেজি হয়। টুকরো দুটি সমান হতে হবে না। তারা কি পারবে?',
  },
  input: {
    en: 'One integer w, the weight of the watermelon.',
    bn: 'একটি পূর্ণসংখ্যা w, তরমুজের ওজন।',
  },
  output: {
    en: 'Print YES if such a cut exists, otherwise NO.',
    bn: 'এমন ভাগ সম্ভব হলে YES, না হলে NO প্রিন্ট করুন।',
  },
  limits: {
    timeSec: 1,
    memoryMb: 64,
    notes: [{ en: '1 ≤ w ≤ 100', bn: '১ ≤ w ≤ ১০০' }],
  },

  samples: [
    {
      input: '8',
      output: 'YES',
      explain: {
        en: '8 can be cut into 2 + 6 (or 4 + 4). Both parts are even and positive.',
        bn: '৮-কে ২ + ৬ (বা ৪ + ৪) ভাগ করা যায়। দুটি অংশই জোড় ও ধনাত্মক।',
      },
    },
  ],

  observation: {
    en: 'Even + even is always even, so w must be even. And the smallest even positive piece is 2, so w must be at least 2 + 2 = 4. Any even w ≥ 4 works: cut it into 2 and w − 2.',
    bn: 'জোড় + জোড় সবসময় জোড়, তাই w অবশ্যই জোড় হতে হবে। আর সবচেয়ে ছোট জোড় ধনাত্মক টুকরো ২, তাই w কমপক্ষে ২ + ২ = ৪ হতে হবে। যেকোনো জোড় w ≥ ৪ কাজ করে: ২ আর w − ২-এ ভাগ করুন।',
  },

  approach: [
    {
      en: 'Start from the definition: try every first piece a from 1 to w − 1 and check whether both a and w − a are even. With w ≤ 100 this is instant.',
      bn: 'সংজ্ঞা থেকে শুরু করুন: প্রথম টুকরো a-কে ১ থেকে w − ১ পর্যন্ত সব মান দিয়ে চেষ্টা করুন, আর দেখুন a ও w − a দুটোই জোড় কি না। w ≤ ১০০ হওয়ায় এটা সঙ্গে সঙ্গে চলে।',
    },
    {
      en: 'Then notice that if any split works, the split 2 + (w − 2) works too. So you only need to check that one split: w − 2 is even and positive, which means w is even and w > 2.',
      bn: 'তারপর লক্ষ করুন, কোনো ভাগ কাজ করলে ২ + (w − ২) ভাগটিও কাজ করে। তাই শুধু ওই একটি ভাগ দেখলেই চলে: w − ২ জোড় ও ধনাত্মক, অর্থাৎ w জোড় আর w > ২।',
    },
  ],

  walkthrough: {
    input: '8',
    steps: [
      { state: 'a = 1', text: { en: '1 is odd, so this split fails.', bn: '১ বিজোড়, তাই এই ভাগ চলবে না।' } },
      { state: 'a = 2', text: { en: '2 is even and 8 − 2 = 6 is even. A valid split exists.', bn: '২ জোড় আর ৮ − ২ = ৬ জোড়। একটি সঠিক ভাগ পাওয়া গেল।' } },
      { state: 'w % 2 == 0, w > 2', text: { en: 'The formula agrees: 8 is even and greater than 2, so print YES.', bn: 'সূত্রও একই কথা বলে: ৮ জোড় এবং ২-এর বড়, তাই YES প্রিন্ট করুন।' } },
    ],
  },

  complexity: {
    time: 'O(1)',
    space: 'O(1)',
    why: {
      en: 'The final solution checks two conditions on one number. The brute force is O(w), which is also fine for w ≤ 100.',
      bn: 'চূড়ান্ত সমাধান একটি সংখ্যার ওপর দুটি শর্ত দেখে। ব্রুট ফোর্স O(w), যা w ≤ ১০০-এর জন্যও ঠিক আছে।',
    },
  },

  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: { en: 'Try every split', bn: 'সব ভাগ চেষ্টা করা' },
      idea: {
        en: 'Loop the first piece a over 1…w−1. If both a and w − a are even for some a, the answer is YES.',
        bn: 'প্রথম টুকরো a-কে ১…w−১ পর্যন্ত লুপ করুন। কোনো a-র জন্য a ও w − a দুটোই জোড় হলে উত্তর YES।',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int w;
    cin >> w;

    bool ok = false;
    for (int a = 1; a < w; a++) {
        int b = w - a;
        if (a % 2 == 0 && b % 2 == 0) ok = true;
    }

    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}
`,
      time: 'O(w)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'for-loop', 'modulo'],
    },
    {
      id: 'better',
      kind: 'better',
      title: { en: 'Only even pieces, stop early', bn: 'শুধু জোড় টুকরো, আগেই থামা' },
      idea: {
        en: 'The first piece has to be even anyway, so step a by 2 starting at 2, and stop as soon as a split works.',
        bn: 'প্রথম টুকরো তো জোড় হতেই হবে, তাই a-কে ২ থেকে শুরু করে ২ করে বাড়ান, আর প্রথম সঠিক ভাগ পেলেই থামুন।',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int w;
    cin >> w;

    bool ok = false;
    for (int a = 2; a <= w - 2; a += 2) {
        if ((w - a) % 2 == 0) {
            ok = true;
            break;
        }
    }

    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}
`,
      time: 'O(w)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'break-continue'],
    },
    {
      id: 'optimal',
      kind: 'optimal',
      title: { en: 'One condition', bn: 'একটি শর্ত' },
      idea: {
        en: 'A valid split exists exactly when w is even and w > 2, because 2 + (w − 2) then works.',
        bn: 'সঠিক ভাগ ঠিক তখনই আছে যখন w জোড় আর w > ২, কারণ তখন ২ + (w − ২) কাজ করে।',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int w;
    cin >> w;
    cout << (w % 2 == 0 && w > 2 ? "YES" : "NO") << "\\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: { en: 'ranges::any_of over the splits', bn: 'ভাগগুলোর ওপর ranges::any_of' },
      idea: {
        en: 'The same search as the brute force, written as “does any a in 1…w−1 give two even pieces?” with C++20 ranges.',
        bn: 'ব্রুট ফোর্সের একই খোঁজ, C++20 ranges দিয়ে লেখা: “১…w−১-এর কোনো a কি দুটি জোড় টুকরো দেয়?”',
      },
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int w;
    cin >> w;

    bool ok = ranges::any_of(views::iota(1, w), [&](int a) {
        return a % 2 == 0 && (w - a) % 2 == 0;
    });

    cout << (ok ? "YES" : "NO") << "\\n";
    return 0;
}
`,
      time: 'O(w)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ranges-any-of', 'views-iota', 'lambda'],
    },
    {
      id: 'alt',
      kind: 'alt',
      title: { en: 'Bit check with printf', bn: 'printf দিয়ে বিট পরীক্ষা' },
      idea: {
        en: 'A number is even when its lowest bit is 0, so (w & 1) == 0 replaces w % 2 == 0. C-style I/O, same logic.',
        bn: 'সবচেয়ে নিচের বিট ০ হলে সংখ্যা জোড়, তাই w % 2 == 0-এর জায়গায় (w & 1) == 0। C-স্টাইলের I/O, যুক্তি একই।',
      },
      code: `#include <cstdio>

int main() {
    int w;
    scanf("%d", &w);
    puts(((w & 1) == 0 && w != 2) ? "YES" : "NO");
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'c-io'],
    },
  ],

  tests: [
    { input: '8', output: 'YES', source: 'sample', note: { en: 'The statement sample.', bn: 'স্টেটমেন্টের স্যাম্পল।' } },
    { input: '2', output: 'NO', source: 'own', note: { en: 'Even but too small: 2 = 1 + 1 or 2 + 0.', bn: 'জোড় কিন্তু খুব ছোট: ২ = ১ + ১ অথবা ২ + ০।' } },
    { input: '1', output: 'NO', source: 'own', note: { en: 'Smallest input.', bn: 'সবচেয়ে ছোট ইনপুট।' } },
    { input: '4', output: 'YES', source: 'own', note: { en: 'Smallest YES: 2 + 2.', bn: 'সবচেয়ে ছোট YES: ২ + ২।' } },
    { input: '99', output: 'NO', source: 'own', note: { en: 'Odd numbers never work.', bn: 'বিজোড় সংখ্যা কখনো কাজ করে না।' } },
    { input: '100', output: 'YES', source: 'own', note: { en: 'Largest input.', bn: 'সবচেয়ে বড় ইনপুট।' } },
  ],

  pitfalls: [
    {
      en: 'Checking only w % 2 == 0. That prints YES for w = 2, but 2 cannot be split into two positive even pieces.',
      bn: 'শুধু w % 2 == 0 দেখা। এতে w = ২-এর জন্য YES আসে, কিন্তু ২-কে দুটি ধনাত্মক জোড় টুকরোয় ভাগ করা যায় না।',
    },
    {
      en: 'Thinking the halves must be equal. 6 = 2 + 4 is fine even though 6 / 2 = 3 is odd.',
      bn: 'ভাবা যে দুই ভাগ সমান হতে হবে। ৬ = ২ + ৪ ঠিক আছে, যদিও ৬ / ২ = ৩ বিজোড়।',
    },
    {
      en: 'Printing Yes or yes. Print the words exactly as the statement shows them.',
      bn: 'Yes বা yes প্রিন্ট করা। স্টেটমেন্টে যেভাবে আছে ঠিক সেভাবেই প্রিন্ট করুন।',
    },
  ],

  related: [
    { id: '1A', name: 'Theatre Square', why: { en: 'Another one-formula problem, this time with numbers that overflow int.', bn: 'আরেকটি এক-সূত্রের প্রবলেম, এবার int ছাড়িয়ে যাওয়া সংখ্যাসহ।' } },
    { id: '231A', name: 'Team', why: { en: 'A brute-force count over a small input.', bn: 'ছোট ইনপুটে ব্রুট-ফোর্স গণনা।' } },
  ],
  toolkit: ['io-basics', 'modulo', 'ternary', 'ranges-any-of', 'bitwise-and'],
};
