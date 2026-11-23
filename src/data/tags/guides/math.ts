import type { TagGuide } from '../guideTypes';

const raw = String.raw;

export const mathGuide: TagGuide = {
  slug: 'math',
  intro: [
    {
      en: 'A math problem looks like it needs a loop or a search, but a short argument turns it into a formula. The values are usually huge (up to 10⁹ or 10¹⁸), which is the hint: you cannot simulate, so you must think.',
      bn: 'গণিতের প্রবলেম দেখতে মনে হয় লুপ বা খোঁজ লাগবে, কিন্তু একটি ছোট যুক্তি একে সূত্রে পরিণত করে। মান সাধারণত বিশাল (১০⁹ বা ১০¹⁸ পর্যন্ত), আর সেটাই ইঙ্গিত: সিমুলেট করা যাবে না, তাই ভাবতে হবে।',
    },
    {
      en: 'The tools are school maths: parity (even and odd), remainders, rounding up, sums of series, and small case analysis. What makes it hard is spotting which tool fits. The habit that helps most is solving tiny cases by hand and looking for the pattern.',
      bn: 'টুলগুলো স্কুলের গণিত: জোড়-বিজোড়, ভাগশেষ, ওপরের দিকে রাউন্ড, ধারার যোগফল, আর ছোট কেস বিশ্লেষণ। কঠিন অংশ হলো কোন টুল খাটে তা চেনা। সবচেয়ে কাজের অভ্যাস: হাতে ছোট কেস সমাধান করে প্যাটার্ন খোঁজা।',
    },
  ],
  recognize: [
    {
      en: 'Limits like n ≤ 10⁹ or n ≤ 10¹⁸ with only one or two numbers in the input.',
      bn: 'ইনপুটে মাত্র এক-দুটি সংখ্যা, আর সীমা n ≤ ১০⁹ বা n ≤ ১০¹⁸।',
    },
    {
      en: 'The question is “how many”, “minimum number of steps” or “is it possible”, and the steps are all the same size.',
      bn: 'প্রশ্ন হলো “কতগুলো”, “সর্বনিম্ন কত ধাপ” বা “সম্ভব কি না”, আর সব ধাপ একই মাপের।',
    },
    {
      en: 'Writing out the answers for n = 1, 2, 3, … shows a clean pattern: alternating, linear, or depending on n mod something.',
      bn: 'n = ১, ২, ৩, … এর উত্তর লিখলে একটি পরিষ্কার প্যাটার্ন দেখা যায়: পালাক্রমে বদলায়, রৈখিক, বা n mod কিছুর ওপর নির্ভর করে।',
    },
  ],
  patterns: [
    {
      name: { en: 'Round up a division', bn: 'ভাগ ওপরের দিকে রাউন্ড করা' },
      explain: [
        {
          en: '“Fewest steps of size at most k to cover x” is ⌈x / k⌉. With integers, write it as (x + k − 1) / k. It also covers boxes, buses, tiles: whenever whole units must cover an amount.',
          bn: '“সর্বোচ্চ k মাপের ধাপে x ঢাকতে সবচেয়ে কম কত ধাপ” হলো ⌈x / k⌉। পূর্ণসংখ্যায় লিখুন (x + k − 1) / k। বাক্স, বাস, টাইল সবই এর মধ্যে: যখনই পূর্ণ একক দিয়ে একটি পরিমাণ ঢাকতে হয়।',
        },
      ],
      code: raw`long long x, k;
cin >> x >> k;
cout << (x + k - 1) / k << "\n";`,
      example: {
        problem: '617A',
        text: {
          en: 'Elephant: steps of 1 to 5, so always step 5 and round up: ⌈x / 5⌉.',
          bn: 'Elephant: ধাপ ১ থেকে ৫, তাই সবসময় ৫ ধাপ নিন আর ওপরে রাউন্ড করুন: ⌈x / ৫⌉।',
        },
      },
    },
    {
      name: { en: 'Distance to the next multiple', bn: 'পরের গুণিতক পর্যন্ত দূরত্ব' },
      explain: [
        {
          en: 'To make a divisible by b by adding 1 repeatedly, you need (b − a mod b) mod b steps. The outer mod handles the case where a is already divisible and the answer is 0.',
          bn: 'বারবার ১ যোগ করে a-কে b দিয়ে বিভাজ্য করতে (b − a mod b) mod b ধাপ লাগে। বাইরের mod সেই কেস সামলায় যেখানে a আগেই বিভাজ্য আর উত্তর ০।',
        },
      ],
      code: raw`long long a, b;
cin >> a >> b;
cout << (b - a % b) % b << "\n";`,
      example: {
        problem: '1328A',
        text: {
          en: 'Divisibility Problem: a up to 10⁹ and up to 10⁴ tests, so adding one at a time is far too slow; the formula answers each test instantly.',
          bn: 'Divisibility Problem: a ১০⁹ পর্যন্ত আর ১০⁴টি পর্যন্ত টেস্ট, তাই একটা একটা করে যোগ করা অনেক ধীর; সূত্রে প্রতিটি টেস্টের উত্তর সঙ্গে সঙ্গে।',
        },
      },
    },
    {
      name: { en: 'Pair up terms and use parity', bn: 'পদ জোড়া করা ও জোড়-বিজোড় ব্যবহার' },
      explain: [
        {
          en: 'Alternating sums collapse when you group terms in pairs. −1 + 2 = 1, −3 + 4 = 1, … so n/2 pairs give n/2, and an odd n adds one more −n.',
          bn: 'পদগুলো জোড়ায় জোড়ায় সাজালে পর্যায়ক্রমিক যোগফল ছোট হয়ে যায়। −1 + 2 = 1, −3 + 4 = 1, … তাই n/2-টি জোড়া দেয় n/2, আর n বিজোড় হলে আরও একটি −n যোগ হয়।',
        },
      ],
      code: raw`long long n;
cin >> n;
cout << (n % 2 == 0 ? n / 2 : n / 2 - n) << "\n";`,
      example: {
        problem: '486A',
        text: {
          en: 'Calculating Function: n is up to 10¹⁵, so the loop is impossible, but the pairing argument gives the answer in O(1).',
          bn: 'Calculating Function: n ১০¹⁵ পর্যন্ত, তাই লুপ অসম্ভব, কিন্তু জোড়ার যুক্তিতে O(1)-এ উত্তর মেলে।',
        },
      },
    },
    {
      name: { en: 'Powers of two and factors of two', bn: 'দুইয়ের ঘাত ও দুইয়ের উৎপাদক' },
      explain: [
        {
          en: 'Every n ≥ 1 is 2ᵏ × (an odd number). Dividing out all factors of 2 leaves that odd part. If it is 1, n was a power of two. In binary, a power of two has exactly one 1 bit, so n & (n − 1) == 0 tests it in one step.',
          bn: 'প্রতিটি n ≥ ১ হলো ২ᵏ × (একটি বিজোড় সংখ্যা)। ২-এর সব উৎপাদক ভাগ করে ফেললে সেই বিজোড় অংশ থাকে। সেটি ১ হলে n ছিল দুইয়ের ঘাত। বাইনারিতে দুইয়ের ঘাতে ঠিক একটি 1 বিট থাকে, তাই n & (n − 1) == 0 এক ধাপেই তা পরীক্ষা করে।',
        },
      ],
      code: raw`long long n;
cin >> n;
while (n % 2 == 0) n /= 2;              // keep the odd part
cout << (n > 1 ? "YES" : "NO") << "\n";`,
      example: {
        problem: '1475A',
        text: {
          en: 'Odd Divisor: n has an odd divisor greater than 1 exactly when its odd part is greater than 1, that is, when n is not a power of two.',
          bn: 'Odd Divisor: n-এর ১-এর বড় বিজোড় ভাজক থাকে ঠিক তখনই, যখন এর বিজোড় অংশ ১-এর বড়, অর্থাৎ n দুইয়ের ঘাত নয়।',
        },
      },
    },
  ],
  mistakes: [
    {
      en: 'Using int when the answer or an intermediate product passes 2 × 10⁹. Read the limits, then choose long long.',
      bn: 'উত্তর বা মাঝের গুণফল ২ × ১০⁹ ছাড়ালেও int ব্যবহার করা। সীমা পড়ে তারপর long long বেছে নিন।',
    },
    {
      en: 'Using ceil() or pow() from <cmath> on large integers: they work in double and can be off by one.',
      bn: 'বড় পূর্ণসংখ্যায় <cmath>-এর ceil() বা pow() ব্যবহার করা: এগুলো double-এ কাজ করে আর এক কম-বেশি হতে পারে।',
    },
    {
      en: 'Guessing a formula from one sample. Check it on at least three small cases you work out by hand.',
      bn: 'একটি স্যাম্পল দেখে সূত্র আন্দাজ করা। হাতে বের করা অন্তত তিনটি ছোট কেসে মিলিয়ে দেখুন।',
    },
    {
      en: 'Forgetting the edge case where the answer is 0 or the input is already “done”.',
      bn: 'উত্তর ০ বা ইনপুট আগেই “সমাধান হয়ে আছে” এমন এজ কেস ভুলে যাওয়া।',
    },
  ],
  plan: [
    {
      en: 'For every math problem, first write a brute force for small inputs and print its answers for n = 1 … 20. Most formulas jump out of that table.',
      bn: 'প্রতিটি গণিতের প্রবলেমে আগে ছোট ইনপুটের জন্য ব্রুট ফোর্স লিখে n = ১ … ২০ এর উত্তর প্রিন্ট করুন। বেশিরভাগ সূত্র ওই টেবিল থেকেই বেরিয়ে আসে।',
    },
    {
      en: 'Then prove the pattern in one or two sentences before coding it. If you cannot explain why it holds, it may break on a hidden test.',
      bn: 'তারপর কোড লেখার আগে এক-দুই বাক্যে প্যাটার্নটি প্রমাণ করুন। কেন সত্য তা ব্যাখ্যা করতে না পারলে লুকানো টেস্টে ভেঙে যেতে পারে।',
    },
    {
      en: 'Climb the ladder below to about 1200, then continue with the number theory tag.',
      bn: 'নিচের সিঁড়ি ধরে প্রায় ১২০০ পর্যন্ত উঠুন, তারপর সংখ্যাতত্ত্ব ট্যাগে যান।',
    },
  ],
};
