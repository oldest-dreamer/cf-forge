import type { Lesson } from './types';

const raw = String.raw;

export const L1: Lesson = {
  id: 'first-program',
  title: { en: 'Your first program', bn: 'আপনার প্রথম প্রোগ্রাম' },
  summary: {
    en: 'The shape every Codeforces solution has: includes, main, and printing output.',
    bn: 'প্রতিটি কোডফোর্সেস সমাধানের কাঠামো: include, main, আর আউটপুট প্রিন্ট করা।',
  },
  minutes: 10,
  toolkit: ['io-basics'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A C++ program is text that a compiler turns into something the computer can run. On Codeforces you paste that text, the judge compiles it, runs it on hidden tests and compares your output with the correct one. So the first skill is printing exactly the right output.',
        bn: 'C++ প্রোগ্রাম হলো এমন লেখা, যা কম্পাইলার কম্পিউটারে চালানোর উপযোগী রূপে বদলে দেয়। কোডফোর্সেসে আপনি সেই লেখা পেস্ট করেন, জাজ সেটি কম্পাইল করে, লুকানো টেস্টে চালায় আর আপনার আউটপুট সঠিক উত্তরের সঙ্গে মেলায়। তাই প্রথম দক্ষতা হলো ঠিক ঠিক আউটপুট প্রিন্ট করা।',
      },
    },
    {
      kind: 'code',
      caption: { en: 'Press Run to compile and run it in your browser.', bn: 'Run চাপলে আপনার ব্রাউজারেই কম্পাইল হয়ে চলবে।' },
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, CF Forge!" << "\n";
    cout << 2 + 3 << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Line by line', bn: 'লাইন ধরে ধরে' } },
    {
      kind: 'list',
      items: [
        {
          en: '#include <bits/stdc++.h> pulls in the whole standard library at once: input/output, vectors, sorting and the rest. Competitive programmers use it so they never forget an include.',
          bn: '#include <bits/stdc++.h> একসঙ্গে পুরো স্ট্যান্ডার্ড লাইব্রেরি নিয়ে আসে: ইনপুট/আউটপুট, ভেক্টর, সর্টিং আর বাকি সব। প্রতিযোগী প্রোগ্রামাররা এটি ব্যবহার করেন যাতে কোনো include ভুলে না যান।',
        },
        {
          en: 'using namespace std; lets you write cout instead of std::cout.',
          bn: 'using namespace std; লিখলে std::cout-এর বদলে শুধু cout লেখা যায়।',
        },
        {
          en: 'int main() { ... } is where the program starts. Everything inside the braces runs from top to bottom.',
          bn: 'int main() { ... } থেকে প্রোগ্রাম শুরু হয়। বন্ধনীর ভেতরের সব কিছু ওপর থেকে নিচে চলে।',
        },
        {
          en: 'cout << value prints a value. You can chain several << in one line. "\\n" starts a new line.',
          bn: 'cout << value একটি মান প্রিন্ট করে। এক লাইনে একাধিক << জোড়া যায়। "\\n" নতুন লাইন শুরু করে।',
        },
        {
          en: 'return 0; tells the judge the program finished normally. Any other value counts as a runtime error.',
          bn: 'return 0; জাজকে জানায় প্রোগ্রাম স্বাভাবিকভাবে শেষ হয়েছে। অন্য কোনো মান রানটাইম এরর হিসেবে ধরা হয়।',
        },
      ],
    },
    {
      kind: 'tip',
      text: {
        en: 'Prefer "\\n" over endl. endl also flushes the output, which is slow when you print hundreds of thousands of lines.',
        bn: 'endl-এর বদলে "\\n" ব্যবহার করুন। endl আউটপুট flush-ও করে, যা লাখ লাখ লাইন প্রিন্ট করলে ধীর হয়ে যায়।',
      },
    },
    { kind: 'h', text: { en: 'Comments', bn: 'কমেন্ট' } },
    {
      kind: 'p',
      text: {
        en: 'Text after // is a comment: the compiler ignores it. Use comments to remind yourself why a line exists.',
        bn: '// এর পরের লেখা কমেন্ট: কম্পাইলার এটি উপেক্ষা করে। কোনো লাইন কেন আছে তা মনে রাখতে কমেন্ট লিখুন।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    // This line prints a greeting.
    cout << "Assalamu alaikum" << "\n";
    cout << 10 * 4 << "\n";   // prints 40
    return 0;
}
`,
    },
  ],
  mistakes: [
    { en: 'Forgetting the semicolon ; at the end of a statement. The compiler error usually points at the next line.', bn: 'স্টেটমেন্টের শেষে সেমিকোলন ; ভুলে যাওয়া। কম্পাইলারের এরর সাধারণত পরের লাইন দেখায়।' },
    { en: 'Printing extra words like "Answer: 5" when the problem wants only 5. The judge compares exactly.', bn: 'প্রবলেম শুধু 5 চাইলে "Answer: 5" প্রিন্ট করা। জাজ হুবহু মেলায়।' },
    { en: 'Writing Main or MAIN. C++ is case-sensitive; it must be main.', bn: 'Main বা MAIN লেখা। C++ বড়-ছোট হাতের অক্ষর আলাদা ধরে; লিখতে হবে main।' },
  ],
  exercise: {
    prompt: {
      en: 'Print exactly two lines: Hello, Codeforces! on the first line and the value of 7 * 6 on the second.',
      bn: 'ঠিক দুটি লাইন প্রিন্ট করুন: প্রথম লাইনে Hello, Codeforces! আর দ্বিতীয় লাইনে 7 * 6-এর মান।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    // write your code here

    return 0;
}
`,
    tests: [{ input: '', output: 'Hello, Codeforces!\n42' }],
    hint: { en: 'Use two cout statements, each ending with "\\n".', bn: 'দুটি cout লিখুন, প্রতিটির শেষে "\\n"।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, Codeforces!" << "\n";
    cout << 7 * 6 << "\n";
    return 0;
}
`,
  },
};

export const L2: Lesson = {
  id: 'variables',
  title: { en: 'Variables and types', bn: 'ভেরিয়েবল ও টাইপ' },
  summary: {
    en: 'Store numbers and text, and learn the one type mistake that costs the most Wrong Answers: overflow.',
    bn: 'সংখ্যা আর লেখা রাখা, আর যে টাইপের ভুল সবচেয়ে বেশি Wrong Answer আনে তা শেখা: ওভারফ্লো।',
  },
  minutes: 15,
  toolkit: ['long-long', 'modulo'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A variable is a named box that holds a value. Every box has a type that decides what it can hold and how big the value can be.',
        bn: 'ভেরিয়েবল হলো নাম দেওয়া একটি বাক্স, যাতে একটি মান থাকে। প্রতিটি বাক্সের একটি টাইপ আছে, যা ঠিক করে কী রাখা যাবে আর মান কত বড় হতে পারে।',
      },
    },
    {
      kind: 'list',
      items: [
        { en: 'int: whole numbers up to about ±2.1 × 10⁹.', bn: 'int: প্রায় ±২.১ × ১০⁹ পর্যন্ত পূর্ণসংখ্যা।' },
        { en: 'long long: whole numbers up to about ±9.2 × 10¹⁸. Use it whenever a value can pass 2 × 10⁹.', bn: 'long long: প্রায় ±৯.২ × ১০¹⁸ পর্যন্ত পূর্ণসংখ্যা। মান ২ × ১০⁹ ছাড়াতে পারলেই এটি ব্যবহার করুন।' },
        { en: 'double: numbers with a decimal point, like 3.14. They are approximate.', bn: 'double: দশমিকসহ সংখ্যা, যেমন 3.14। এগুলো আনুমানিক।' },
        { en: 'char: one character, like \'a\'. bool: true or false. string: text, like "abc".', bn: 'char: একটি অক্ষর, যেমন \'a\'। bool: true বা false। string: লেখা, যেমন "abc"।' },
      ],
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int apples = 7;
    long long big = 3000000000LL;   // too big for int
    double price = 12.5;
    char grade = 'A';
    string name = "Nadia";
    bool ready = true;

    cout << apples << " " << big << " " << price << "\n";
    cout << grade << " " << name << " " << ready << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Arithmetic', bn: 'অঙ্ক' } },
    {
      kind: 'p',
      text: {
        en: 'C++ has +, −, *, / and %. With two integers, / throws away the fraction (7 / 2 is 3) and % gives the remainder (7 % 2 is 1). The remainder is how you test even and odd, and how you take answers “modulo 10⁹+7”.',
        bn: 'C++-এ +, −, *, / আর % আছে। দুটি পূর্ণসংখ্যায় / ভগ্নাংশ বাদ দেয় (7 / 2 হলো 3) আর % ভাগশেষ দেয় (7 % 2 হলো 1)। ভাগশেষ দিয়েই জোড়-বিজোড় পরীক্ষা করা হয়, আর “১০⁹+৭ মডুলো” উত্তর নেওয়া হয়।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << 7 / 2 << "\n";        // 3
    cout << 7 % 2 << "\n";        // 1
    cout << 7.0 / 2 << "\n";      // 3.5
    cout << -7 / 2 << "\n";       // -3 (rounds toward zero)
    cout << -7 % 2 << "\n";       // -1 (sign follows the left side)
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Overflow: the silent bug', bn: 'ওভারফ্লো: নীরব বাগ' } },
    {
      kind: 'p',
      text: {
        en: 'If a result does not fit in its type, C++ does not warn you. It wraps around and gives a wrong, often negative, number. 100000 * 100000 is 10¹⁰, which does not fit in int.',
        bn: 'ফল তার টাইপে না আঁটলে C++ সতর্ক করে না। মানটি ঘুরে গিয়ে ভুল, প্রায়ই ঋণাত্মক, সংখ্যা দেয়। 100000 * 100000 হলো ১০¹⁰, যা int-এ আঁটে না।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 100000, b = 100000;
    cout << a * b << "\n";              // wrong: int * int overflows
    cout << 1LL * a * b << "\n";        // right: 10000000000
    long long c = a, d = b;
    cout << c * d << "\n";              // also right
    return 0;
}
`,
    },
    {
      kind: 'warn',
      text: {
        en: 'long long x = a * b; is still wrong when a and b are int: the multiplication happens in int first. Make one side long long before multiplying.',
        bn: 'a আর b int হলে long long x = a * b; তবুও ভুল: গুণটা আগে int-এ হয়। গুণের আগে একপাশ long long করুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Using int for sums of many numbers or for products. When in doubt, use long long.', bn: 'অনেক সংখ্যার যোগফল বা গুণফলে int ব্যবহার করা। সন্দেহ হলে long long নিন।' },
    { en: 'Expecting 5 / 2 to be 2.5. With integers it is 2.', bn: '5 / 2 থেকে 2.5 আশা করা। পূর্ণসংখ্যায় এটি 2।' },
    { en: 'Comparing doubles with ==. Small rounding errors make equal-looking values differ.', bn: 'double-কে == দিয়ে তুলনা করা। ছোট রাউন্ডিং ত্রুটিতে সমান দেখানো মানও আলাদা হয়।' },
  ],
  exercise: {
    prompt: {
      en: 'Read two integers a and b (1 ≤ a, b ≤ 10⁹). Print a + b on the first line and a × b on the second.',
      bn: 'দুটি পূর্ণসংখ্যা a আর b পড়ুন (১ ≤ a, b ≤ ১০⁹)। প্রথম লাইনে a + b আর দ্বিতীয় লাইনে a × b প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << "\n";
    cout << a * b << "\n";
    return 0;
}
`,
    tests: [
      { input: '3 4', output: '7\n12' },
      { input: '1000000000 1000000000', output: '2000000000\n1000000000000000000' },
      { input: '123456 654321', output: '777777\n80779853376' },
    ],
    hint: {
      en: 'The starter overflows. Which type holds 10¹⁸?',
      bn: 'শুরুর কোড ওভারফ্লো করে। কোন টাইপে ১০¹⁸ আঁটে?',
    },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    cout << a + b << "\n";
    cout << a * b << "\n";
    return 0;
}
`,
  },
};

export const L3: Lesson = {
  id: 'input',
  title: { en: 'Reading input', bn: 'ইনপুট পড়া' },
  summary: {
    en: 'Read numbers and words with cin, and handle the “t test cases” format used by almost every Div. 2, 3 and 4 problem.',
    bn: 'cin দিয়ে সংখ্যা আর শব্দ পড়া, আর প্রায় সব Div. 2, 3, 4 প্রবলেমে ব্যবহৃত “t টেস্ট কেস” ফরম্যাট সামলানো।',
  },
  minutes: 15,
  toolkit: ['io-basics', 'while-n'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'cin >> x reads the next value into x, skipping spaces and newlines. So it does not matter whether the numbers are on one line or many.',
        bn: 'cin >> x স্পেস আর নতুন লাইন বাদ দিয়ে পরের মানটি x-এ পড়ে। তাই সংখ্যাগুলো এক লাইনে থাকুক বা অনেক লাইনে, কিছু যায় আসে না।',
      },
    },
    {
      kind: 'code',
      input: '5 8\nAyaan\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    string name;
    cin >> a >> b >> name;
    cout << name << " has " << a + b << " points\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Multiple test cases', bn: 'একাধিক টেস্ট কেস' } },
    {
      kind: 'p',
      text: {
        en: 'Most modern problems start with t, the number of test cases, and then t independent inputs. Read t, then repeat your solution t times with while (t--). Each answer goes on its own line.',
        bn: 'বেশিরভাগ আধুনিক প্রবলেম t দিয়ে শুরু হয়, অর্থাৎ টেস্ট কেসের সংখ্যা, তারপর t-টি আলাদা ইনপুট। t পড়ুন, তারপর while (t--) দিয়ে সমাধান t বার চালান। প্রতিটি উত্তর আলাদা লাইনে।',
      },
    },
    {
      kind: 'code',
      input: '3\n1 2\n10 -4\n7 7\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

void solve() {
    long long x, y;
    cin >> x >> y;
    cout << x + y << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'Putting one test case in a solve() function keeps variables fresh for every test. Old values from the previous test cannot leak in.',
        bn: 'একটি টেস্ট কেস solve() ফাংশনে রাখলে প্রতিটি টেস্টে ভেরিয়েবল নতুন থাকে। আগের টেস্টের পুরোনো মান ঢুকে পড়তে পারে না।',
      },
    },
    { kind: 'h', text: { en: 'Reading a whole line', bn: 'পুরো লাইন পড়া' } },
    {
      kind: 'p',
      text: {
        en: 'cin >> s stops at the first space. To read a line with spaces use getline(cin, s). If you used cin >> before, call cin.ignore() once first to skip the leftover newline.',
        bn: 'cin >> s প্রথম স্পেসে থেমে যায়। স্পেসসহ লাইন পড়তে getline(cin, s) ব্যবহার করুন। আগে cin >> ব্যবহার করে থাকলে প্রথমে একবার cin.ignore() ডাকুন, যাতে বাকি থাকা নতুন লাইন বাদ যায়।',
      },
    },
  ],
  mistakes: [
    { en: 'Forgetting to print a newline after each test case, so all answers end up on one line.', bn: 'প্রতিটি টেস্ট কেসের পর নতুন লাইন প্রিন্ট না করা, ফলে সব উত্তর এক লাইনে চলে যায়।' },
    { en: 'Declaring a counter outside the test loop and not resetting it.', bn: 'কাউন্টার টেস্ট লুপের বাইরে ঘোষণা করে আবার শূন্য না করা।' },
    { en: 'Using getline right after cin >> without cin.ignore(), and reading an empty line.', bn: 'cin >>-এর ঠিক পরে cin.ignore() ছাড়া getline ব্যবহার করা, আর খালি লাইন পড়া।' },
  ],
  exercise: {
    prompt: {
      en: 'The first line has t. Each of the next t lines has two integers a and b (|a|, |b| ≤ 10⁹). For each test, print the larger of the two.',
      bn: 'প্রথম লাইনে t। পরের t-টি লাইনের প্রতিটিতে দুটি পূর্ণসংখ্যা a আর b (|a|, |b| ≤ ১০⁹)। প্রতিটি টেস্টে দুটির মধ্যে বড়টি প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    // repeat t times

    return 0;
}
`,
    tests: [
      { input: '3\n1 2\n5 -5\n7 7', output: '2\n5\n7' },
      { input: '1\n-1000000000 -999999999', output: '-999999999' },
    ],
    hint: { en: 'while (t--) { read a and b; print max(a, b); }', bn: 'while (t--) { a আর b পড়ুন; max(a, b) প্রিন্ট করুন; }' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << max(a, b) << "\n";
    }
    return 0;
}
`,
  },
};

export const L4: Lesson = {
  id: 'conditions',
  title: { en: 'Making decisions', bn: 'সিদ্ধান্ত নেওয়া' },
  summary: {
    en: 'if, else, logical operators and the ternary operator: how a program chooses what to do.',
    bn: 'if, else, লজিক্যাল অপারেটর আর টারনারি অপারেটর: প্রোগ্রাম কীভাবে ঠিক করে কী করবে।',
  },
  minutes: 15,
  toolkit: ['ternary', 'bool-arith'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'if (condition) { ... } runs the block only when the condition is true. else runs when it is false, and else if lets you check several cases in order. The first true branch wins.',
        bn: 'if (condition) { ... } শর্ত সত্য হলেই ব্লকটি চালায়। শর্ত মিথ্যা হলে else চলে, আর else if দিয়ে ক্রমানুসারে কয়েকটি কেস দেখা যায়। প্রথম সত্য শাখাটিই চলে।',
      },
    },
    {
      kind: 'code',
      input: '1450\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int rating;
    cin >> rating;
    if (rating < 1200) {
        cout << "Newbie\n";
    } else if (rating < 1400) {
        cout << "Pupil\n";
    } else if (rating < 1600) {
        cout << "Specialist\n";
    } else {
        cout << "Expert or higher\n";
    }
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Comparisons and logic', bn: 'তুলনা ও লজিক' } },
    {
      kind: 'list',
      items: [
        { en: '== equal, != not equal, <, <=, >, >=.', bn: '== সমান, != সমান নয়, <, <=, >, >=।' },
        { en: '&& is “and”, || is “or”, ! is “not”.', bn: '&& মানে “এবং”, || মানে “অথবা”, ! মানে “না”।' },
        { en: 'a <= x && x <= b checks that x is between a and b. Writing a <= x <= b compiles but means something else.', bn: 'a <= x && x <= b দেখে x, a আর b-এর মাঝে কি না। a <= x <= b কম্পাইল হয়, কিন্তু অর্থ অন্য।' },
      ],
    },
    { kind: 'h', text: { en: 'The ternary operator', bn: 'টারনারি অপারেটর' } },
    {
      kind: 'p',
      text: {
        en: 'condition ? A : B gives A when the condition is true and B otherwise. It is handy for printing YES or NO in one line.',
        bn: 'condition ? A : B শর্ত সত্য হলে A, না হলে B দেয়। এক লাইনে YES বা NO প্রিন্ট করতে এটি কাজে লাগে।',
      },
    },
    {
      kind: 'code',
      input: '8\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << (n % 2 == 0 ? "YES" : "NO") << "\n";
    bool positive = n > 0;
    cout << positive + positive << "\n";   // true counts as 1
    return 0;
}
`,
    },
    {
      kind: 'warn',
      text: {
        en: 'if (x = 5) assigns 5 to x and is always true. Comparison is ==.',
        bn: 'if (x = 5) x-এ 5 বসায় আর সবসময় সত্য হয়। তুলনা হলো ==।',
      },
    },
  ],
  mistakes: [
    { en: 'Using = instead of == inside if.', bn: 'if-এর ভেতরে == এর বদলে = লেখা।' },
    { en: 'Forgetting the parentheses around a ternary inside cout: cout << x > 0 ? ... does not do what you expect.', bn: 'cout-এর ভেতরে টারনারির চারপাশে বন্ধনী ভুলে যাওয়া: cout << x > 0 ? ... প্রত্যাশামতো কাজ করে না।' },
    { en: 'Checking cases in the wrong order, so an earlier, wider condition catches values meant for a later one.', bn: 'ভুল ক্রমে কেস দেখা, ফলে আগের চওড়া শর্তই পরের শর্তের মানগুলো ধরে ফেলে।' },
  ],
  exercise: {
    prompt: {
      en: 'Read an integer x (|x| ≤ 10⁹). Print Positive, Negative or Zero.',
      bn: 'একটি পূর্ণসংখ্যা x পড়ুন (|x| ≤ ১০⁹)। Positive, Negative অথবা Zero প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long x;
    cin >> x;

    return 0;
}
`,
    tests: [
      { input: '5', output: 'Positive' },
      { input: '-3', output: 'Negative' },
      { input: '0', output: 'Zero' },
    ],
    hint: { en: 'if (x > 0) ... else if (x < 0) ... else ...', bn: 'if (x > 0) ... else if (x < 0) ... else ...' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long x;
    cin >> x;
    if (x > 0) cout << "Positive\n";
    else if (x < 0) cout << "Negative\n";
    else cout << "Zero\n";
    return 0;
}
`,
  },
};
