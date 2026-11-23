import type { TagGuide } from '../guideTypes';

const raw = String.raw;

export const implementationGuide: TagGuide = {
  slug: 'implementation',
  intro: [
    {
      en: 'Implementation problems hide no clever trick. The statement tells you exactly what to do, and the challenge is doing it without a mistake: reading the input correctly, following every rule in order, and handling the small cases the statement mentions only once.',
      bn: 'ইমপ্লিমেন্টেশন প্রবলেমে কোনো লুকানো কৌশল থাকে না। স্টেটমেন্টে ঠিক কী করতে হবে বলা থাকে, আর চ্যালেঞ্জ হলো ভুল ছাড়া সেটা করা: ইনপুট ঠিকমতো পড়া, প্রতিটি নিয়ম ক্রমানুসারে মানা, আর স্টেটমেন্টে একবারই উল্লেখ করা ছোট কেসগুলো সামলানো।',
    },
    {
      en: 'It is the most common tag on Codeforces and sits on almost every Div. 3 and Div. 4 problem A and B. Being fast and accurate here is what moves a Newbie to Pupil: every wrong attempt costs you points or 10 penalty minutes, while the idea itself is free.',
      bn: 'কোডফোর্সেসে এটিই সবচেয়ে বেশি দেখা ট্যাগ, আর প্রায় প্রতিটি Div. 3 ও Div. 4-এর A আর B প্রবলেমে থাকে। এখানে দ্রুত আর নির্ভুল হওয়াই একজন নিউবিকে পিউপিল বানায়: প্রতিটি ভুল সাবমিশনে পয়েন্ট বা ১০ মিনিট পেনাল্টি যায়, অথচ আইডিয়াটা বিনামূল্যে পাওয়া।',
    },
  ],
  recognize: [
    {
      en: 'The limits are tiny (n ≤ 100, values ≤ 1000), so speed does not matter, yet the statement is long and full of rules.',
      bn: 'সীমা খুব ছোট (n ≤ ১০০, মান ≤ ১০০০), তাই গতি কোনো ব্যাপার নয়, অথচ স্টেটমেন্ট লম্বা আর নিয়মে ভরা।',
    },
    {
      en: 'Words like “then”, “after that”, “repeat k times”, “if …, otherwise …” describe a process you can simulate directly.',
      bn: '“তারপর”, “এরপর”, “k বার করো”, “যদি …, না হলে …” এমন শব্দ এমন একটি প্রক্রিয়া বোঝায়, যা সরাসরি সিমুলেট করা যায়।',
    },
    {
      en: 'The answer can be checked by hand on the samples by literally following the statement. If you can do that on paper, you can code it.',
      bn: 'স্টেটমেন্ট হুবহু মেনে হাতে স্যাম্পলের উত্তর মেলানো যায়। কাগজে পারলে কোডেও পারবেন।',
    },
  ],
  patterns: [
    {
      name: { en: 'Simulate the process step by step', bn: 'প্রক্রিয়াটি ধাপে ধাপে সিমুলেট করা' },
      explain: [
        {
          en: 'Keep the state in variables and apply each rule in a loop, exactly in the order the statement gives. Before coding, count the steps: if it is at most around 10⁷, plain simulation is fast enough.',
          bn: 'অবস্থা ভেরিয়েবলে রাখুন আর স্টেটমেন্টের ক্রম ঠিক রেখে লুপে প্রতিটি নিয়ম প্রয়োগ করুন। কোড লেখার আগে ধাপ গুনুন: প্রায় ১০⁷ পর্যন্ত হলে সাধারণ সিমুলেশনই যথেষ্ট দ্রুত।',
        },
      ],
      code: raw`// "k times: if the last digit is not zero, subtract 1; otherwise divide by 10"
long long n; int k;
cin >> n >> k;
for (int step = 0; step < k; step++) {
    if (n % 10 != 0) n--;
    else n /= 10;
}
cout << n << "\n";`,
      example: {
        problem: '977A',
        text: {
          en: 'Wrong Subtraction: k is at most 50, so simulating all k steps is instant. The only care needed is the order of the two rules.',
          bn: 'Wrong Subtraction: k সর্বোচ্চ ৫০, তাই k-টি ধাপ সিমুলেট করা সঙ্গে সঙ্গে শেষ হয়। শুধু দুটি নিয়মের ক্রমে খেয়াল রাখতে হয়।',
        },
      },
    },
    {
      name: { en: 'Count with a condition', bn: 'শর্ত দিয়ে গোনা' },
      explain: [
        {
          en: 'Many A problems ask “how many items satisfy this rule?”. Read every item, test the rule, and add one when it holds. Write the rule exactly as stated, including words like “positive” or “at least”.',
          bn: 'অনেক A প্রবলেম জিজ্ঞেস করে “কতগুলো জিনিস এই নিয়ম মানে?”। প্রতিটি জিনিস পড়ুন, নিয়ম পরীক্ষা করুন, মানলে এক যোগ করুন। “ধনাত্মক” বা “কমপক্ষে”-র মতো শব্দসহ নিয়মটি হুবহু লিখুন।',
        },
      ],
      code: raw`int n, k;
cin >> n >> k;
vector<int> a(n);
for (auto& x : a) cin >> x;
int threshold = a[k - 1], count = 0;
for (int x : a) {
    if (x >= threshold && x > 0) count++;
}
cout << count << "\n";`,
      example: {
        problem: '158A',
        text: {
          en: 'Next Round: the rule has two parts, “at least the k-th score” and “positive”. Forgetting the second part is the classic Wrong Answer on the test where everyone scored 0.',
          bn: 'Next Round: নিয়মের দুটি অংশ, “k-তম স্কোরের সমান বা বেশি” আর “ধনাত্মক”। দ্বিতীয় অংশ ভুলে গেলে সবাই ০ পাওয়া টেস্টে ক্লাসিক Wrong Answer আসে।',
        },
      },
    },
    {
      name: { en: 'Compare neighbours', bn: 'পাশাপাশি উপাদান তুলনা' },
      explain: [
        {
          en: 'When the rule talks about adjacent elements, loop from the second element and compare s[i] with s[i − 1]. Starting at index 1 avoids reading before the start of the array.',
          bn: 'নিয়ম পাশাপাশি উপাদান নিয়ে হলে দ্বিতীয় উপাদান থেকে লুপ চালিয়ে s[i]-কে s[i − 1]-এর সঙ্গে মেলান। ইনডেক্স ১ থেকে শুরু করলে অ্যারের শুরুর আগে পড়ার ভুল হয় না।',
        },
      ],
      code: raw`string s;
cin >> n >> s;
int same = 0;
for (int i = 1; i < n; i++) {
    if (s[i] == s[i - 1]) same++;
}
cout << same << "\n";`,
      example: {
        problem: '266A',
        text: {
          en: 'Stones on the Table: every pair of equal neighbours forces one removal, so the answer is just the number of such pairs.',
          bn: 'Stones on the Table: প্রতিটি সমান পাশাপাশি জোড়ার জন্য একটি পাথর সরাতেই হয়, তাই উত্তর শুধু এমন জোড়ার সংখ্যা।',
        },
      },
    },
    {
      name: { en: 'Read grids and find positions', bn: 'গ্রিড পড়া ও অবস্থান খোঁজা' },
      explain: [
        {
          en: 'For an r × c grid, read it with two nested loops and remember the row and column of what you are looking for. Decide early whether you count from 0 or from 1, and stick to it.',
          bn: 'r × c গ্রিড দুটি নেস্টেড লুপে পড়ুন আর যা খুঁজছেন তার সারি ও কলাম মনে রাখুন। ০ থেকে নাকি ১ থেকে গুনবেন তা শুরুতেই ঠিক করে সেটাই মেনে চলুন।',
        },
      ],
      code: raw`int row = 0, col = 0;
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        int x;
        cin >> x;
        if (x == 1) { row = i; col = j; }
    }
}
cout << abs(row - 3) + abs(col - 3) << "\n";`,
      example: {
        problem: '263A',
        text: {
          en: 'Beautiful Matrix: each swap moves the 1 by one row or one column, so the answer is the distance |row − 3| + |col − 3|.',
          bn: 'Beautiful Matrix: প্রতিটি অদলবদলে 1 এক সারি বা এক কলাম সরে, তাই উত্তর দূরত্ব |row − 3| + |col − 3|।',
        },
      },
    },
  ],
  mistakes: [
    {
      en: 'Skimming the statement. Underline every condition (“positive”, “strictly”, “at least”) before you start typing.',
      bn: 'স্টেটমেন্ট ভাসা ভাসা পড়া। টাইপ করার আগে প্রতিটি শর্তে (“ধনাত্মক”, “কঠোরভাবে”, “কমপক্ষে”) দাগ দিন।',
    },
    {
      en: 'Printing in a slightly different format: extra spaces, Yes instead of YES, or a missing newline between test cases.',
      bn: 'সামান্য ভিন্ন ফরম্যাটে প্রিন্ট করা: বাড়তি স্পেস, YES-এর বদলে Yes, বা টেস্ট কেসের মাঝে নতুন লাইন বাদ পড়া।',
    },
    {
      en: 'Mixing 0-based and 1-based indices, especially in grids and when printing positions.',
      bn: '০-ভিত্তিক আর ১-ভিত্তিক ইনডেক্স মিশিয়ে ফেলা, বিশেষ করে গ্রিডে আর অবস্থান প্রিন্টের সময়।',
    },
    {
      en: 'Submitting without running the samples. Always run them, and invent one smallest case of your own.',
      bn: 'স্যাম্পল না চালিয়েই সাবমিট করা। সবসময় চালান, আর নিজের একটি সবচেয়ে ছোট কেস বানান।',
    },
  ],
  plan: [
    {
      en: 'Solve ten 800-rated implementation problems in a row with a timer. Aim for under 10 minutes each with zero wrong attempts.',
      bn: 'টাইমার চালিয়ে পরপর দশটি ৮০০ রেটিংয়ের ইমপ্লিমেন্টেশন প্রবলেম সমাধান করুন। লক্ষ্য: প্রতিটি ১০ মিনিটের কম, শূন্য ভুল সাবমিশন।',
    },
    {
      en: 'Before every submit, test the samples plus one edge case: the smallest input, all values equal, or all zeros.',
      bn: 'প্রতিটি সাবমিটের আগে স্যাম্পল আর একটি এজ কেস পরীক্ষা করুন: সবচেয়ে ছোট ইনপুট, সব মান সমান, বা সব শূন্য।',
    },
    {
      en: 'Move to 1000–1200 when 800s feel routine. These add longer statements and more cases, which is exactly the skill to train.',
      bn: '৮০০ স্বাভাবিক লাগলে ১০০০–১২০০-তে যান। এগুলোতে স্টেটমেন্ট লম্বা আর কেস বেশি, যা ঠিক এই দক্ষতাই বাড়ায়।',
    },
  ],
};
