import type { ProblemEntry } from './types';

export const p71A: ProblemEntry = {
  id: '71A',
  contestId: 71,
  index: 'A',
  name: 'Way Too Long Words',
  rating: 800,
  tags: ['strings'],
  why: {
    en: 'A first look at reading several test lines and working with string length, first and last characters.',
    bn: 'একাধিক লাইন পড়া আর স্ট্রিংয়ের দৈর্ঘ্য, প্রথম ও শেষ অক্ষর নিয়ে কাজের প্রথম পরিচয়।',
  },

  statement: {
    en: 'A word is “too long” if it has more than 10 letters. Too-long words are shortened to: the first letter, then the number of letters between the first and last, then the last letter. So “localization” becomes “l10n”. Words of 10 letters or fewer stay as they are. Shorten each given word.',
    bn: '১০টির বেশি অক্ষর থাকলে শব্দটি “অনেক লম্বা”। লম্বা শব্দকে ছোট করা হয় এভাবে: প্রথম অক্ষর, তারপর প্রথম ও শেষের মাঝের অক্ষরের সংখ্যা, তারপর শেষ অক্ষর। যেমন “localization” হয় “l10n”। ১০ বা তার কম অক্ষরের শব্দ যেমন আছে তেমনই থাকে। প্রতিটি শব্দ ছোট করুন।',
  },
  input: {
    en: 'An integer n, then n words of lowercase Latin letters, one per line.',
    bn: 'একটি পূর্ণসংখ্যা n, তারপর প্রতি লাইনে একটি করে n-টি ছোট হাতের ল্যাটিন অক্ষরের শব্দ।',
  },
  output: { en: 'n lines: each word, shortened if needed.', bn: 'n-টি লাইন: প্রতিটি শব্দ, দরকার হলে ছোট করে।' },
  limits: {
    timeSec: 1,
    memoryMb: 256,
    notes: [
      { en: '1 ≤ n ≤ 100', bn: '১ ≤ n ≤ ১০০' },
      { en: 'Each word has 1 to 100 letters.', bn: 'প্রতিটি শব্দে ১ থেকে ১০০টি অক্ষর।' },
    ],
  },

  samples: [
    {
      input: '4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis',
      output: 'word\nl10n\ni18n\np43s',
      explain: {
        en: '“word” has 4 letters and stays. “localization” has 12, so 12 − 2 = 10 sit in the middle: l10n. The same rule gives i18n and p43s.',
        bn: '“word”-এ ৪টি অক্ষর, তাই একই থাকে। “localization”-এ ১২টি, তাই মাঝে ১২ − ২ = ১০টি: l10n। একই নিয়মে i18n আর p43s।',
      },
    },
  ],

  observation: {
    en: 'The middle count is always the length minus 2 (the first and last letters). The only decision is whether the length is greater than 10.',
    bn: 'মাঝের সংখ্যা সবসময় দৈর্ঘ্য থেকে ২ বাদ (প্রথম ও শেষ অক্ষর)। শুধু একটি সিদ্ধান্ত: দৈর্ঘ্য ১০-এর বেশি কি না।',
  },

  approach: [
    {
      en: 'Read n. For each word, if s.size() > 10, print s.front(), then s.size() − 2, then s.back(). Otherwise print s unchanged.',
      bn: 'n পড়ুন। প্রতিটি শব্দে s.size() > ১০ হলে s.front(), তারপর s.size() − ২, তারপর s.back() প্রিন্ট করুন। না হলে s যেমন আছে তেমন প্রিন্ট করুন।',
    },
  ],

  walkthrough: {
    input: 'localization',
    steps: [
      { state: 'size = 12', text: { en: '12 > 10, so shorten it.', bn: '১২ > ১০, তাই ছোট করতে হবে।' } },
      { state: "front = 'l'", text: { en: 'First letter l.', bn: 'প্রথম অক্ষর l।' } },
      { state: '12 − 2 = 10', text: { en: 'Ten letters in the middle.', bn: 'মাঝে দশটি অক্ষর।' } },
      { state: "back = 'n'", text: { en: 'Last letter n. Print l10n.', bn: 'শেষ অক্ষর n। প্রিন্ট করুন l10n।' } },
    ],
  },

  complexity: {
    time: 'O(total length)',
    space: 'O(longest word)',
    why: { en: 'Each word is read once and printed once.', bn: 'প্রতিটি শব্দ একবার পড়া আর একবার প্রিন্ট করা হয়।' },
  },

  solutions: [
    {
      id: 'optimal',
      kind: 'optimal',
      title: { en: 'front, size − 2, back', bn: 'front, size − ২, back' },
      idea: {
        en: 'Use the string’s own front(), back() and size() and let cout print the number.',
        bn: 'স্ট্রিংয়ের নিজস্ব front(), back() আর size() ব্যবহার করুন, সংখ্যাটি cout প্রিন্ট করবে।',
      },
      explain: [
        {
          en: "cout prints a char, then a number, then a char, so s.front() << s.size() − 2 << s.back() builds the short form directly on the output. Words of length 10 or less are printed unchanged.",
          bn: "cout একটি char, তারপর একটি সংখ্যা, তারপর একটি char প্রিন্ট করে, তাই s.front() << s.size() − 2 << s.back() সরাসরি আউটপুটেই ছোট রূপ তৈরি করে। ১০ বা কম দৈর্ঘ্যের শব্দ অপরিবর্তিত প্রিন্ট হয়।",
        },
      ],
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    while (n--) {
        string s;
        cin >> s;
        if (s.size() > 10) {
            cout << s.front() << s.size() - 2 << s.back() << "\\n";
        } else {
            cout << s << "\\n";
        }
    }
    return 0;
}
`,
      time: 'O(L)',
      space: 'O(L)',
      accepted: true,
      toolkit: ['string-basics', 'while-n'],
    },
    {
      id: 'alt',
      kind: 'alt',
      title: { en: 'Build the short form with to_string', bn: 'to_string দিয়ে ছোট রূপ তৈরি' },
      idea: {
        en: 'Build the new word as a string first. Handy when you need to store or compare the result instead of printing it.',
        bn: 'আগে নতুন শব্দটি স্ট্রিং হিসেবে বানান। ফল প্রিন্ট না করে রাখতে বা তুলনা করতে হলে কাজে লাগে।',
      },
      explain: [
        {
          en: "Building the result as a string with to_string makes the function reusable: you can return it, compare it or store it. string + char and char + string both work in C++; char + char does not.",
          bn: "to_string দিয়ে ফল স্ট্রিং হিসেবে বানালে ফাংশনটি বারবার ব্যবহার করা যায়: ফেরত দেওয়া, তুলনা বা জমা রাখা যায়। C++-এ string + char আর char + string দুটোই চলে; char + char চলে না।",
        },
      ],
      code: `#include <bits/stdc++.h>
using namespace std;

string shorten(const string& s) {
    if (s.size() <= 10) return s;
    return s.front() + to_string(s.size() - 2) + s.back();
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        cout << shorten(s) << "\\n";
    }
    return 0;
}
`,
      time: 'O(L)',
      space: 'O(L)',
      accepted: true,
      toolkit: ['string-basics', 'to-string', 'functions'],
    },
  ],

  tests: [
    {
      input: '4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis',
      output: 'word\nl10n\ni18n\np43s',
      source: 'sample',
      note: { en: 'The statement sample.', bn: 'স্টেটমেন্টের স্যাম্পল।' },
    },
    { input: '1\nabcdefghij', output: 'abcdefghij', source: 'own', note: { en: 'Exactly 10 letters is not too long.', bn: 'ঠিক ১০টি অক্ষর লম্বা নয়।' } },
    { input: '1\nabcdefghijk', output: 'a9k', source: 'own', note: { en: '11 letters is the first length that gets shortened.', bn: '১১টি অক্ষরই প্রথম দৈর্ঘ্য যা ছোট করা হয়।' } },
    { input: '1\nz', output: 'z', source: 'own', note: { en: 'A one-letter word.', bn: 'এক অক্ষরের শব্দ।' } },
  ],

  pitfalls: [
    { en: 'Using >= 10 instead of > 10. A 10-letter word must stay unchanged.', bn: '> ১০-এর জায়গায় >= ১০ লেখা। ১০ অক্ষরের শব্দ অপরিবর্তিত থাকবে।' },
    { en: 'Writing s[0] + (s.size() − 2) + s.back() with chars: that adds character codes instead of joining text.', bn: 'char দিয়ে s[0] + (s.size() − ২) + s.back() লেখা: এতে লেখা জোড়া না লেগে অক্ষরের কোড যোগ হয়ে যায়।' },
  ],

  related: [
    { id: '231A', name: 'Team', why: { en: 'Another “read n lines and decide for each” problem.', bn: 'আরেকটি “n লাইন পড়ে প্রতিটির জন্য সিদ্ধান্ত” প্রবলেম।' } },
  ],
  toolkit: ['string-basics', 'to-string'],
};
