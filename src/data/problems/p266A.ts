import type { ProblemEntry } from './types';

const raw = String.raw;

export const p266A: ProblemEntry = {
  id: '266A',
  contestId: 266,
  index: 'A',
  name: 'Stones on the Table',
  rating: 800,
  tags: ['implementation'],
  featuredFor: ['implementation'],
  why: {
    en: 'Teaches the “compare each element with its neighbour” loop, and shows how one problem can be seen as pairs, as runs, or as a simulation.',
    bn: '“প্রতিটি উপাদানকে পাশেরটির সঙ্গে তুলনা” লুপ শেখায়, আর দেখায় একই প্রবলেমকে জোড়া, রান বা সিমুলেশন হিসেবে কীভাবে দেখা যায়।',
  },

  statement: {
    en: 'n stones stand in a row, each red, green or blue. Remove as few stones as possible so that no two neighbouring stones in the remaining row have the same colour. How many must you remove?',
    bn: 'n-টি পাথর এক সারিতে আছে, প্রতিটি লাল, সবুজ বা নীল। সবচেয়ে কম পাথর সরান যাতে বাকি সারিতে পাশাপাশি কোনো দুটি পাথরের রং এক না হয়। কতগুলো সরাতে হবে?',
  },
  input: {
    en: 'The first line has n. The second line is a string of n letters R, G and B.',
    bn: 'প্রথম লাইনে n। দ্বিতীয় লাইনে R, G আর B অক্ষরের n দৈর্ঘ্যের একটি স্ট্রিং।',
  },
  output: { en: 'The minimum number of stones to remove.', bn: 'সর্বনিম্ন কতগুলো পাথর সরাতে হবে।' },
  limits: { timeSec: 2, memoryMb: 256, notes: [{ en: '1 ≤ n ≤ 50', bn: '১ ≤ n ≤ ৫০' }] },

  samples: [
    { input: '3\nRRG', output: '1', explain: { en: 'Remove one of the two R stones.', bn: 'দুটি R পাথরের একটি সরান।' } },
    { input: '5\nRRRRR', output: '4', explain: { en: 'Only one R may stay.', bn: 'মাত্র একটি R থাকতে পারে।' } },
    { input: '4\nBRBG', output: '0', explain: { en: 'No two neighbours match already.', bn: 'আগে থেকেই কোনো দুই পাশাপাশি পাথর এক রঙের নয়।' } },
  ],

  observation: {
    en: 'Every place where two equal colours touch forces exactly one removal, and removing a stone inside a block of equal colours never creates a new equal pair. So the answer is the number of adjacent equal pairs.',
    bn: 'যেখানেই দুটি একই রং পাশাপাশি, সেখানে ঠিক একটি পাথর সরাতেই হয়, আর একই রঙের একটি ব্লকের ভেতর থেকে পাথর সরালে কখনো নতুন সমান জোড়া তৈরি হয় না। তাই উত্তর হলো পাশাপাশি সমান জোড়ার সংখ্যা।',
  },

  approach: [
    {
      en: 'Group the row into blocks of the same colour (runs). From each run, keep one stone and remove the rest. A run of length L costs L − 1, which is exactly the number of equal pairs inside it.',
      bn: 'সারিটিকে একই রঙের ব্লকে (রান) ভাগ করুন। প্রতিটি রান থেকে একটি পাথর রেখে বাকিগুলো সরান। L দৈর্ঘ্যের একটি রানের খরচ L − 1, যা ঠিক এর ভেতরের সমান জোড়ার সংখ্যা।',
    },
    {
      en: 'Neighbouring runs have different colours by definition, so after keeping one stone per run, no equal neighbours are left. You cannot do better, because each equal pair needs at least one of its two stones gone.',
      bn: 'সংজ্ঞা অনুযায়ী পাশাপাশি রানের রং আলাদা, তাই প্রতি রানে একটি পাথর রাখার পর কোনো সমান পাশাপাশি থাকে না। এর চেয়ে ভালো সম্ভব নয়, কারণ প্রতিটি সমান জোড়ার দুটি পাথরের অন্তত একটি সরাতেই হয়।',
    },
  ],

  walkthrough: {
    input: '6\nRRGBBB',
    steps: [
      { state: 'R R', text: { en: 'Positions 1–2 match: +1.', bn: 'অবস্থান ১–২ মেলে: +১।' } },
      { state: 'R G, G B', text: { en: 'Different neighbours: nothing.', bn: 'ভিন্ন পাশাপাশি: কিছু নয়।' } },
      { state: 'B B, B B', text: { en: 'Two more matching pairs: +2. Answer 3.', bn: 'আরও দুটি মেলানো জোড়া: +২। উত্তর ৩।' } },
    ],
  },

  complexity: {
    time: 'O(n)',
    space: 'O(n)',
    why: { en: 'One pass over the string.', bn: 'স্ট্রিংয়ের ওপর একবার যাওয়া।' },
  },

  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: { en: 'Remove stones one by one', bn: 'এক এক করে পাথর সরানো' },
      idea: {
        en: 'While some neighbours match, erase one of them and count. Exactly what the statement describes.',
        bn: 'যতক্ষণ কোনো পাশাপাশি মেলে, তার একটি মুছে ফেলুন আর গুনুন। ঠিক স্টেটমেন্টের বর্ণনা।',
      },
      explain: [
        {
          en: 'Scan for the first i with s[i] == s[i + 1], erase s[i] with s.erase(i, 1), add one to the answer, and start again. Stop when no pair is found.',
          bn: 'প্রথম সেই i খুঁজুন যেখানে s[i] == s[i + 1], s.erase(i, 1) দিয়ে s[i] মুছুন, উত্তরে এক যোগ করুন, আর আবার শুরু করুন। কোনো জোড়া না পেলে থামুন।',
        },
        {
          en: 'Each erase can trigger a full rescan, so this is O(n²). With n ≤ 50 that is 2500 steps, which is instant. It is a useful reference for checking faster ideas.',
          bn: 'প্রতিটি মোছার পর পুরোটা আবার দেখা লাগতে পারে, তাই এটি O(n²)। n ≤ ৫০ হলে তা ২৫০০ ধাপ, সঙ্গে সঙ্গে শেষ। দ্রুত আইডিয়া যাচাইয়ের ভালো রেফারেন্স।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;

    int removed = 0;
    bool changed = true;
    while (changed) {
        changed = false;
        for (int i = 0; i + 1 < (int)s.size(); i++) {
            if (s[i] == s[i + 1]) {
                s.erase(i, 1);
                removed++;
                changed = true;
                break;
            }
        }
    }
    cout << removed << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'break-continue'],
    },
    {
      id: 'pairs',
      kind: 'optimal',
      title: { en: 'Count equal neighbours', bn: 'সমান পাশাপাশি গোনা' },
      idea: {
        en: 'Each adjacent equal pair costs exactly one removal, so count those pairs.',
        bn: 'প্রতিটি সমান পাশাপাশি জোড়ায় ঠিক একটি সরানো লাগে, তাই সেই জোড়াগুলো গুনুন।',
      },
      explain: [
        {
          en: 'From the observation, the answer equals the number of indices i (from 1 to n − 1) with s[i] == s[i − 1]. Starting at i = 1 means s[i − 1] always exists.',
          bn: 'পর্যবেক্ষণ থেকে, উত্তর হলো এমন i-এর সংখ্যা (১ থেকে n − 1) যেখানে s[i] == s[i − 1]। i = ১ থেকে শুরু করলে s[i − 1] সবসময় থাকে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;

    int removed = 0;
    for (int i = 1; i < n; i++) {
        if (s[i] == s[i - 1]) removed++;
    }
    cout << removed << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'for-loop'],
    },
    {
      id: 'runs',
      kind: 'method',
      title: { en: 'Count the runs', bn: 'রান গোনা' },
      idea: {
        en: 'One stone survives from each run of equal colours, so the answer is n minus the number of runs.',
        bn: 'একই রঙের প্রতিটি রান থেকে একটি পাথর থাকে, তাই উত্তর হলো n থেকে রানের সংখ্যা বাদ।',
      },
      explain: [
        {
          en: 'Think about what remains instead of what is removed. A run is a maximal block of equal colours. The best final row keeps exactly one stone per run, so it has as many stones as there are runs.',
          bn: 'কী সরানো হলো তার বদলে কী থাকল ভাবুন। রান হলো একই রঙের সর্বোচ্চ লম্বা ব্লক। সেরা শেষ সারিতে প্রতি রানে ঠিক একটি পাথর থাকে, তাই রানের সংখ্যার সমান পাথর থাকে।',
        },
        {
          en: 'A new run starts at position 0 and wherever the colour changes. Count those starts, then print n − runs.',
          bn: 'অবস্থান ০-তে আর যেখানেই রং বদলায় সেখানে নতুন রান শুরু হয়। সেই শুরুগুলো গুনে n − runs প্রিন্ট করুন।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;

    int runs = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || s[i] != s[i - 1]) runs++;
    }
    cout << n - runs << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: { en: 'std::unique', bn: 'std::unique' },
      idea: {
        en: 'unique collapses each run of equal neighbours into one element; the length lost is the answer.',
        bn: 'unique পাশাপাশি সমান উপাদানের প্রতিটি রানকে একটিতে নামিয়ে আনে; যতটা দৈর্ঘ্য কমে সেটাই উত্তর।',
      },
      explain: [
        {
          en: 'std::unique moves one copy of each run to the front and returns an iterator to the new end. The distance from begin to that iterator is the number of runs, so n minus it is the number of stones removed.',
          bn: 'std::unique প্রতিটি রানের একটি কপি সামনে আনে আর নতুন শেষের একটি ইটারেটর ফেরত দেয়। begin থেকে সেই ইটারেটরের দূরত্ব হলো রানের সংখ্যা, তাই n থেকে তা বাদ দিলে সরানো পাথরের সংখ্যা।',
        },
        {
          en: 'Note that unique only merges neighbours. That is exactly the rule here, which is why it fits so well.',
          bn: 'খেয়াল করুন, unique শুধু পাশাপাশি উপাদান মেলায়। এখানে নিয়মটাও ঠিক তাই, এজন্যই এত মানানসই।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    int kept = unique(s.begin(), s.end()) - s.begin();
    cout << n - kept << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['reverse-unique'],
    },
    {
      id: 'build',
      kind: 'alt',
      title: { en: 'Build the final row', bn: 'শেষ সারিটি বানানো' },
      idea: {
        en: 'Append each stone to a new row only if it differs from the last stone kept.',
        bn: 'প্রতিটি পাথর নতুন সারিতে যোগ করুন, শুধু যদি তা শেষ রাখা পাথর থেকে আলাদা হয়।',
      },
      explain: [
        {
          en: 'Walk through the stones and keep a string kept. A stone joins kept when kept is empty or its colour differs from kept.back(). Otherwise it is removed.',
          bn: 'পাথরগুলোর ওপর দিয়ে চলুন আর kept নামে একটি স্ট্রিং রাখুন। kept খালি হলে বা রং kept.back() থেকে আলাদা হলে পাথরটি kept-এ যোগ হয়। না হলে সরানো হয়।',
        },
        {
          en: 'This style, building the result with push_back and comparing with back(), is the same idea a stack uses, and it reappears in bracket and “remove adjacent duplicates” problems.',
          bn: 'push_back দিয়ে ফল বানানো আর back()-এর সঙ্গে তুলনা করার এই ধরন স্ট্যাকেরই আইডিয়া, আর বন্ধনী ও “পাশাপাশি ডুপ্লিকেট সরাও” প্রবলেমে আবার আসে।',
        },
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s, kept;
    cin >> n >> s;
    for (char c : s) {
        if (kept.empty() || kept.back() != c) kept.push_back(c);
    }
    cout << n - (int)kept.size() << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'stack-queue'],
    },
  ],

  tests: [
    { input: '3\nRRG', output: '1', source: 'sample', note: { en: 'First sample.', bn: 'প্রথম স্যাম্পল।' } },
    { input: '5\nRRRRR', output: '4', source: 'sample', note: { en: 'One long run.', bn: 'একটি লম্বা রান।' } },
    { input: '4\nBRBG', output: '0', source: 'sample', note: { en: 'Already fine.', bn: 'আগেই ঠিক আছে।' } },
    { input: '1\nG', output: '0', source: 'own', note: { en: 'A single stone.', bn: 'একটি মাত্র পাথর।' } },
    { input: '6\nRRGBBB', output: '3', source: 'own', note: { en: 'Two runs to shorten.', bn: 'দুটি রান ছোট করতে হবে।' } },
    { input: '7\nRGRGRGR', output: '0', source: 'own', note: { en: 'Alternating colours.', bn: 'পালাক্রমে রং।' } },
  ],

  pitfalls: [
    { en: 'Looping i from 0 and reading s[i − 1], which is outside the string.', bn: 'i-কে ০ থেকে চালিয়ে s[i − 1] পড়া, যা স্ট্রিংয়ের বাইরে।' },
    { en: 'Counting runs instead of removals and forgetting to subtract from n.', bn: 'সরানোর বদলে রান গুনে n থেকে বাদ দিতে ভুলে যাওয়া।' },
    { en: 'Thinking you must also separate stones that are two apart: only direct neighbours matter.', bn: 'ভাবা যে দুই ঘর দূরের পাথরও আলাদা করতে হবে: শুধু সরাসরি পাশাপাশি গুরুত্বপূর্ণ।' },
  ],

  related: [
    { id: '158A', name: 'Next Round', why: { en: 'Another careful counting problem.', bn: 'আরেকটি সাবধানে গোনার প্রবলেম।' } },
    { id: '71A', name: 'Way Too Long Words', why: { en: 'More practice with strings.', bn: 'স্ট্রিং নিয়ে আরও অনুশীলন।' } },
  ],
  toolkit: ['string-basics', 'reverse-unique', 'stack-queue'],
};
