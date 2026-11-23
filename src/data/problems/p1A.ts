import type { ProblemEntry } from './types';

export const p1A: ProblemEntry = {
  id: '1A',
  contestId: 1,
  index: 'A',
  name: 'Theatre Square',
  rating: 1000,
  tags: ['math'],
  why: {
    en: 'Teaches integer ceiling division and why int is not enough for answers near 10¹⁸.',
    bn: 'পূর্ণসংখ্যায় সিলিং ভাগ শেখায়, আর ১০¹⁸-এর কাছাকাছি উত্তরে কেন int যথেষ্ট নয় তা দেখায়।',
  },

  statement: {
    en: 'A rectangular square measures n by m metres. It must be paved with square flagstones of side a. Flagstones cannot be broken and must be aligned with the sides of the square; they may stick out past the edge. What is the fewest flagstones needed to cover the whole square?',
    bn: 'একটি আয়তাকার চত্বর n × m মিটার। একে a বাহুর বর্গাকার পাথর দিয়ে ঢাকতে হবে। পাথর ভাঙা যাবে না আর চত্বরের বাহুর সমান্তরালে বসাতে হবে; প্রান্তের বাইরে বেরিয়ে থাকতে পারে। পুরো চত্বর ঢাকতে কমপক্ষে কতগুলো পাথর লাগবে?',
  },
  input: { en: 'Three integers n, m and a.', bn: 'তিনটি পূর্ণসংখ্যা n, m আর a।' },
  output: { en: 'The minimum number of flagstones.', bn: 'সর্বনিম্ন পাথরের সংখ্যা।' },
  limits: {
    timeSec: 1,
    memoryMb: 256,
    notes: [{ en: '1 ≤ n, m, a ≤ 10⁹', bn: '১ ≤ n, m, a ≤ ১০⁹' }],
  },

  samples: [
    {
      input: '6 6 4',
      output: '4',
      explain: {
        en: 'Along each side, 6 metres need 2 stones of 4 metres (one full, one sticking out). 2 × 2 = 4.',
        bn: 'প্রতিটি বাহুতে ৬ মিটারের জন্য ৪ মিটারের ২টি পাথর লাগে (একটি পুরো, একটি বেরিয়ে থাকে)। ২ × ২ = ৪।',
      },
    },
  ],

  observation: {
    en: 'The two directions are independent. Along n you need ⌈n / a⌉ stones and along m you need ⌈m / a⌉, so the answer is their product.',
    bn: 'দুই দিক একে অপরের ওপর নির্ভর করে না। n বরাবর ⌈n / a⌉টি আর m বরাবর ⌈m / a⌉টি পাথর লাগে, তাই উত্তর এদের গুণফল।',
  },

  approach: [
    {
      en: 'Compute ⌈x / a⌉ with integers only: (x + a − 1) / a. It rounds up without any floating point.',
      bn: 'শুধু পূর্ণসংখ্যা দিয়ে ⌈x / a⌉ বের করুন: (x + a − ১) / a। কোনো দশমিক ছাড়াই এটি ওপরের দিকে রাউন্ড করে।',
    },
    {
      en: 'Multiply the two counts in long long. With n = m = 10⁹ and a = 1 the answer is 10¹⁸, far past the int limit of about 2.1 × 10⁹.',
      bn: 'দুটি সংখ্যা long long-এ গুণ করুন। n = m = ১০⁹ আর a = ১ হলে উত্তর ১০¹⁸, যা int-এর প্রায় ২.১ × ১০⁹ সীমার অনেক বেশি।',
    },
  ],

  walkthrough: {
    input: '6 6 4',
    steps: [
      { state: '⌈6/4⌉', text: { en: '(6 + 3) / 4 = 9 / 4 = 2 stones along n.', bn: '(৬ + ৩) / ৪ = ৯ / ৪ = n বরাবর ২টি পাথর।' } },
      { state: '⌈6/4⌉', text: { en: 'The same 2 stones along m.', bn: 'm বরাবরও একই ২টি পাথর।' } },
      { state: '2 × 2', text: { en: 'Answer 4.', bn: 'উত্তর ৪।' } },
    ],
  },

  complexity: {
    time: 'O(1)',
    space: 'O(1)',
    why: { en: 'Two divisions and one multiplication.', bn: 'দুটি ভাগ আর একটি গুণ।' },
  },

  solutions: [
    {
      id: 'optimal',
      kind: 'optimal',
      title: { en: 'Integer ceiling, long long product', bn: 'পূর্ণসংখ্যার সিলিং, long long গুণফল' },
      idea: {
        en: 'Round each side up with (x + a − 1) / a and multiply in 64-bit.',
        bn: 'প্রতিটি বাহু (x + a − ১) / a দিয়ে ওপরে রাউন্ড করে ৬৪-বিটে গুণ করুন।',
      },
      explain: [
        {
          en: "Along one side of length n you need the smallest count c with c · a ≥ n, which is ⌈n / a⌉ = (n + a − 1) / a. The other side is independent, so the grid of stones has ⌈n / a⌉ × ⌈m / a⌉ cells.",
          bn: "n দৈর্ঘ্যের এক বাহু বরাবর এমন সবচেয়ে ছোট c লাগে যাতে c · a ≥ n, অর্থাৎ ⌈n / a⌉ = (n + a − 1) / a। অন্য বাহু স্বাধীন, তাই পাথরের গ্রিডে ⌈n / a⌉ × ⌈m / a⌉-টি ঘর।",
        },
        {
          en: "Both factors can be 10⁹, so the product needs 64 bits. Declaring n, m, a as long long makes every step 64-bit, which is the simplest way to be safe.",
          bn: "দুটি গুণকই ১০⁹ হতে পারে, তাই গুণফলে ৬৪ বিট লাগে। n, m, a-কে long long ঘোষণা করলে প্রতিটি ধাপ ৬৪-বিটে হয়, নিরাপদ থাকার সবচেয়ে সহজ উপায়।",
        },
      ],
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m, a;
    cin >> n >> m >> a;

    long long alongN = (n + a - 1) / a;
    long long alongM = (m + a - 1) / a;

    cout << alongN * alongM << "\\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'ceil-div'],
    },
    {
      id: 'alt',
      kind: 'alt',
      title: { en: 'Divide, then add one if there is a remainder', bn: 'ভাগ করে ভাগশেষ থাকলে এক যোগ' },
      idea: {
        en: 'x / a full stones, plus one more if x % a is not zero. Same result, written the way you would think it.',
        bn: 'x / a-টি পুরো পাথর, আর x % a শূন্য না হলে আরও একটি। একই ফল, যেভাবে ভাবেন সেভাবে লেখা।',
      },
      explain: [
        {
          en: "x / a counts the stones that fit completely; if something is left (x % a ≠ 0) one more stone sticks out past the edge. This is the same ceiling, written the way you would explain it aloud.",
          bn: "x / a গোনে কতগুলো পাথর পুরোপুরি আঁটে; কিছু বাকি থাকলে (x % a ≠ ০) আরও একটি পাথর প্রান্ত ছাড়িয়ে বেরিয়ে থাকে। এটি একই সিলিং, মুখে যেভাবে বোঝাতেন সেভাবে লেখা।",
        },
      ],
      code: `#include <bits/stdc++.h>
using namespace std;

long long stones(long long x, long long a) {
    return x / a + (x % a != 0 ? 1 : 0);
}

int main() {
    long long n, m, a;
    cin >> n >> m >> a;
    cout << stones(n, a) * stones(m, a) << "\\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'functions'],
    },
  ],

  tests: [
    { input: '6 6 4', output: '4', source: 'sample', note: { en: 'The statement sample.', bn: 'স্টেটমেন্টের স্যাম্পল।' } },
    { input: '1 1 1', output: '1', source: 'own', note: { en: 'Smallest everything.', bn: 'সব সবচেয়ে ছোট।' } },
    { input: '1000000000 1000000000 1', output: '1000000000000000000', source: 'own', note: { en: 'Overflows int; needs long long.', bn: 'int ছাড়িয়ে যায়; long long লাগে।' } },
    { input: '1 1 1000000000', output: '1', source: 'own', note: { en: 'One huge stone covers everything.', bn: 'একটি বিশাল পাথরেই সব ঢাকা পড়ে।' } },
    { input: '7 5 2', output: '12', source: 'own', note: { en: 'Both sides need rounding up: 4 × 3.', bn: 'দুই বাহুতেই ওপরে রাউন্ড লাগে: ৪ × ৩।' } },
  ],

  pitfalls: [
    { en: 'Reading n, m, a into int and multiplying: the product overflows and prints a negative or wrong number.', bn: 'n, m, a int-এ পড়ে গুণ করা: গুণফল ওভারফ্লো হয়ে ঋণাত্মক বা ভুল সংখ্যা দেখায়।' },
    { en: 'Using ceil(n / a) with integers: n / a is already rounded down before ceil sees it.', bn: 'পূর্ণসংখ্যা দিয়ে ceil(n / a) লেখা: ceil দেখার আগেই n / a নিচের দিকে রাউন্ড হয়ে যায়।' },
    { en: 'Computing area / stone area: (n·m) / a² ignores that stones cannot be broken.', bn: 'ক্ষেত্রফল / পাথরের ক্ষেত্রফল হিসাব: (n·m) / a² ভুলে যায় যে পাথর ভাঙা যায় না।' },
  ],

  related: [
    { id: '4A', name: 'Watermelon', why: { en: 'Another problem where a short argument replaces a search.', bn: 'আরেকটি প্রবলেম, যেখানে ছোট যুক্তি খোঁজার জায়গা নেয়।' } },
  ],
  toolkit: ['long-long', 'ceil-div'],
};
