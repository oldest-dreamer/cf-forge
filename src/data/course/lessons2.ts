import type { Lesson } from './types';

const raw = String.raw;

export const L5: Lesson = {
  id: 'loops',
  title: { en: 'Loops', bn: 'লুপ' },
  summary: {
    en: 'Repeat work with for and while, stop early with break, and skip with continue.',
    bn: 'for আর while দিয়ে কাজ বারবার করা, break দিয়ে আগেই থামা, আর continue দিয়ে বাদ দেওয়া।',
  },
  minutes: 20,
  toolkit: ['for-loop', 'break-continue', 'while-n'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'for (int i = 1; i <= n; i++) has three parts: where to start, when to keep going, and what to do after each round. The body runs once for each i.',
        bn: 'for (int i = 1; i <= n; i++)-এর তিনটি অংশ: কোথা থেকে শুরু, কখন চলতে থাকবে, আর প্রতি ধাপের পর কী হবে। প্রতিটি i-এর জন্য বডি একবার চলে।',
      },
    },
    {
      kind: 'code',
      input: '5\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
        cout << "after " << i << ": " << sum << "\n";
    }
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'while', bn: 'while' } },
    {
      kind: 'p',
      text: {
        en: 'while (condition) repeats as long as the condition holds. It fits when you do not know the number of rounds in advance, like taking a number apart digit by digit.',
        bn: 'while (condition) শর্ত সত্য থাকা পর্যন্ত বারবার চলে। কতবার চলবে আগে থেকে না জানলে এটি মানানসই, যেমন একটি সংখ্যাকে অঙ্ক ধরে ধরে ভাঙা।',
      },
    },
    {
      kind: 'code',
      input: '90210\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int digits = 0;
    while (n > 0) {
        cout << "last digit " << n % 10 << "\n";
        n /= 10;          // drop the last digit
        digits++;
    }
    cout << digits << " digits\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'break and continue', bn: 'break আর continue' } },
    {
      kind: 'p',
      text: {
        en: 'break leaves the loop at once. continue skips the rest of this round and moves to the next one.',
        bn: 'break সঙ্গে সঙ্গে লুপ থেকে বেরিয়ে যায়। continue এই ধাপের বাকিটা বাদ দিয়ে পরের ধাপে যায়।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    for (int i = 1; i <= 20; i++) {
        if (i % 3 != 0) continue;   // only multiples of 3
        if (i > 12) break;          // stop after 12
        cout << i << " ";
    }
    cout << "\n";                    // prints 3 6 9 12
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'Loops inside loops multiply the work. Two nested loops up to n run about n² times; with n = 10⁵ that is 10¹⁰ steps, far too slow.',
        bn: 'লুপের ভেতরে লুপ কাজ গুণ করে বাড়ায়। n পর্যন্ত দুটি নেস্টেড লুপ প্রায় n² বার চলে; n = ১০⁵ হলে তা ১০¹⁰ ধাপ, অনেক ধীর।',
      },
    },
  ],
  mistakes: [
    { en: 'Off-by-one: i < n when you meant i <= n, or starting at 0 when the problem counts from 1.', bn: 'এক ঘর ভুল: i <= n বোঝাতে i < n লেখা, বা প্রবলেম ১ থেকে গুনলে ০ থেকে শুরু করা।' },
    { en: 'A while loop whose condition never becomes false: Time limit exceeded.', bn: 'যে while লুপের শর্ত কখনো মিথ্যা হয় না: টাইম লিমিট এক্সিডেড।' },
    { en: 'Using int for a running sum that can pass 2 × 10⁹.', bn: '২ × ১০⁹ ছাড়াতে পারে এমন চলমান যোগফলে int ব্যবহার করা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n (1 ≤ n ≤ 10¹⁸). Print the sum of its digits.',
      bn: 'n পড়ুন (১ ≤ n ≤ ১০¹⁸)। এর অঙ্কগুলোর যোগফল প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    return 0;
}
`,
    tests: [
      { input: '12345', output: '15' },
      { input: '1000000000000000000', output: '1' },
      { input: '999999999999999999', output: '162' },
      { input: '7', output: '7' },
    ],
    hint: { en: 'Add n % 10, then n /= 10, while n > 0.', bn: 'n > 0 থাকা পর্যন্ত n % 10 যোগ করুন, তারপর n /= 10।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    cout << sum << "\n";
    return 0;
}
`,
  },
};

export const L6: Lesson = {
  id: 'vectors',
  title: { en: 'Arrays and vectors', bn: 'অ্যারে ও ভেক্টর' },
  summary: {
    en: 'Store n numbers, walk through them, and find the largest, smallest or a running total.',
    bn: 'n-টি সংখ্যা রাখা, সেগুলো এক এক করে দেখা, আর সবচেয়ে বড়, সবচেয়ে ছোট বা চলমান যোগফল বের করা।',
  },
  minutes: 20,
  toolkit: ['vector'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'vector<int> a(n) makes n integers, numbered a[0] to a[n−1], all starting at 0. Unlike a plain array, a vector knows its size (a.size()) and can grow with push_back.',
        bn: 'vector<int> a(n) n-টি পূর্ণসংখ্যা তৈরি করে, a[0] থেকে a[n−1] পর্যন্ত, সবগুলো শুরুতে 0। সাধারণ অ্যারের মতো নয়, ভেক্টর নিজের আকার জানে (a.size()) আর push_back দিয়ে বড় হতে পারে।',
      },
    },
    {
      kind: 'code',
      input: '5\n4 -2 9 9 1\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long sum = 0, best = a[0];
    for (long long x : a) {          // range-for: each element in turn
        sum += x;
        best = max(best, x);
    }
    cout << "sum " << sum << ", max " << best << "\n";
    cout << "last " << a.back() << ", size " << a.size() << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Growing a vector', bn: 'ভেক্টর বড় করা' } },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> evens;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) evens.push_back(i);
    }
    for (int x : evens) cout << x << " ";
    cout << "\n";
    evens.pop_back();                 // remove the last one
    cout << evens.size() << "\n";     // 4
    return 0;
}
`,
    },
    {
      kind: 'warn',
      text: {
        en: 'a[n] does not exist in a vector of size n; the last element is a[n−1]. Reading past the end gives garbage or a runtime error.',
        bn: 'n আকারের ভেক্টরে a[n] নেই; শেষ উপাদান a[n−1]। শেষের পরে পড়লে আবর্জনা মান বা রানটাইম এরর আসে।',
      },
    },
    {
      kind: 'tip',
      text: {
        en: 'Problems number positions from 1, vectors from 0. Either subtract 1 when reading positions, or make the vector one bigger and use indices 1..n.',
        bn: 'প্রবলেমে অবস্থান ১ থেকে গোনা হয়, ভেক্টরে ০ থেকে। অবস্থান পড়ার সময় ১ বাদ দিন, অথবা ভেক্টর এক ঘর বড় করে ১..n ইনডেক্স ব্যবহার করুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Declaring vector<int> a; without a size and then writing a[i] = x. Use a(n) or push_back.', bn: 'আকার ছাড়া vector<int> a; ঘোষণা করে a[i] = x লেখা। a(n) বা push_back ব্যবহার করুন।' },
    { en: 'Starting best at 0 when all numbers can be negative. Start from a[0] instead.', bn: 'সব সংখ্যা ঋণাত্মক হতে পারলে best-কে 0 দিয়ে শুরু করা। বরং a[0] দিয়ে শুরু করুন।' },
    { en: 'Mixing 0-based and 1-based positions in the same solution.', bn: 'একই সমাধানে ০-ভিত্তিক আর ১-ভিত্তিক অবস্থান মিশিয়ে ফেলা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n (1 ≤ n ≤ 2·10⁵) and n integers (|aᵢ| ≤ 10⁹). Print the largest value and the first position (1-based) where it appears.',
      bn: 'n (১ ≤ n ≤ ২·১০⁵) আর n-টি পূর্ণসংখ্যা (|aᵢ| ≤ ১০⁹) পড়ুন। সবচেয়ে বড় মান আর এটি প্রথম যে অবস্থানে আছে (১ থেকে গুনে) তা প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;

    return 0;
}
`,
    tests: [
      { input: '5\n4 -2 9 9 1', output: '9 3' },
      { input: '3\n-5 -1 -7', output: '-1 2' },
      { input: '1\n42', output: '42 1' },
    ],
    hint: { en: 'Keep the best value and its index; update only when you see something strictly bigger.', bn: 'সেরা মান আর তার ইনডেক্স রাখুন; কেবল আরও বড় কিছু পেলে আপডেট করুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    int pos = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] > a[pos]) pos = i;
    }
    cout << a[pos] << " " << pos + 1 << "\n";
    return 0;
}
`,
  },
};

export const L7: Lesson = {
  id: 'strings',
  title: { en: 'Strings and characters', bn: 'স্ট্রিং ও অক্ষর' },
  summary: {
    en: 'Read words, look at single characters, count letters and build new strings.',
    bn: 'শব্দ পড়া, আলাদা অক্ষর দেখা, অক্ষর গোনা আর নতুন স্ট্রিং তৈরি করা।',
  },
  minutes: 20,
  toolkit: ['string-basics', 'to-string'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A string is a sequence of chars. s.size() is its length, s[i] is the i-th character (from 0), and you can loop over it like a vector.',
        bn: 'স্ট্রিং হলো char-এর একটি ক্রম। s.size() এর দৈর্ঘ্য, s[i] হলো i-তম অক্ষর (০ থেকে), আর ভেক্টরের মতো এর ওপর লুপ চালানো যায়।',
      },
    },
    {
      kind: 'code',
      input: 'codeforces\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << "length " << s.size() << "\n";
    cout << "first " << s[0] << ", last " << s.back() << "\n";
    cout << "middle part " << s.substr(2, 4) << "\n";   // 4 chars from index 2

    int count_o = 0;
    for (char c : s) if (c == 'o') count_o++;
    cout << "o appears " << count_o << " times\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Characters are small numbers', bn: 'অক্ষর আসলে ছোট সংখ্যা' } },
    {
      kind: 'p',
      text: {
        en: 'Each char has a code, and letters are consecutive. So c − \'a\' turns a lowercase letter into 0..25, which is perfect as an index for counting letters. A digit character d becomes its value with d − \'0\'.',
        bn: 'প্রতিটি char-এর একটি কোড আছে, আর অক্ষরগুলো পরপর সাজানো। তাই c − \'a\' ছোট হাতের অক্ষরকে 0..25-এ বদলে দেয়, যা অক্ষর গোনার ইনডেক্স হিসেবে চমৎকার। অঙ্কের অক্ষর d, d − \'0\' দিয়ে তার মানে পরিণত হয়।',
      },
    },
    {
      kind: 'code',
      input: 'banana\n',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    vector<int> cnt(26, 0);
    for (char c : s) cnt[c - 'a']++;
    for (int i = 0; i < 26; i++) {
        if (cnt[i] > 0) cout << char('a' + i) << ": " << cnt[i] << "\n";
    }
    string t = s;
    reverse(t.begin(), t.end());
    cout << (s == t ? "palindrome" : "not a palindrome") << "\n";
    cout << s + "!" << " " << to_string(42) + "7" << "\n";
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'toupper(c) and tolower(c) change case; isdigit(c) and isalpha(c) test what kind of character c is.',
        bn: 'toupper(c) আর tolower(c) অক্ষরের হাতের ধরন বদলায়; isdigit(c) আর isalpha(c) দেখে c কোন ধরনের অক্ষর।',
      },
    },
  ],
  mistakes: [
    { en: 'Adding chars and expecting text: \'a\' + \'b\' is a number, not "ab".', bn: 'char যোগ করে লেখা আশা করা: \'a\' + \'b\' একটি সংখ্যা, "ab" নয়।' },
    { en: 'Building a long answer with s = s + c in a loop; use s += c, which is much faster.', bn: 'লুপে s = s + c দিয়ে লম্বা উত্তর বানানো; s += c ব্যবহার করুন, যা অনেক দ্রুত।' },
    { en: 'Calling substr with a start past the end, which crashes.', bn: 'শেষের পরের শুরু দিয়ে substr ডাকা, যাতে প্রোগ্রাম ক্র্যাশ করে।' },
  ],
  exercise: {
    prompt: {
      en: 'Read one word of lowercase letters (length up to 10⁵). Print how many of its letters are vowels (a, e, i, o, u).',
      bn: 'ছোট হাতের অক্ষরের একটি শব্দ পড়ুন (দৈর্ঘ্য ১০⁵ পর্যন্ত)। এর কতগুলো অক্ষর স্বরবর্ণ (a, e, i, o, u) তা প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;

    return 0;
}
`,
    tests: [
      { input: 'codeforces', output: '4' },
      { input: 'rhythm', output: '0' },
      { input: 'aeiou', output: '5' },
    ],
    hint: { en: 'Loop over the characters and check each one against the five vowels.', bn: 'অক্ষরগুলোর ওপর লুপ চালিয়ে প্রতিটিকে পাঁচটি স্বরবর্ণের সঙ্গে মেলান।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    string vowels = "aeiou";
    int count = 0;
    for (char c : s) {
        if (vowels.find(c) != string::npos) count++;
    }
    cout << count << "\n";
    return 0;
}
`,
  },
};

export const L8: Lesson = {
  id: 'functions',
  title: { en: 'Functions and recursion', bn: 'ফাংশন ও রিকার্শন' },
  summary: {
    en: 'Name a piece of logic, reuse it, pass values in and out, and let a function call itself.',
    bn: 'যুক্তির একটি অংশের নাম দেওয়া, বারবার ব্যবহার, মান পাঠানো ও ফেরত পাওয়া, আর ফাংশনকে নিজেকেই ডাকতে দেওয়া।',
  },
  minutes: 20,
  toolkit: ['functions'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A function has a return type, a name, parameters and a body. Calling it runs the body with the values you pass and gives back the result.',
        bn: 'ফাংশনের একটি রিটার্ন টাইপ, নাম, প্যারামিটার আর বডি থাকে। ডাকলে আপনার দেওয়া মান নিয়ে বডি চলে আর ফল ফেরত দেয়।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long square(long long x) {
    return x * x;
}

bool isPrime(int n) {
    if (n < 2) return false;
    for (int d = 2; 1LL * d * d <= n; d++) {
        if (n % d == 0) return false;
    }
    return true;
}

int main() {
    cout << square(12) << "\n";                 // 144
    for (int n = 1; n <= 20; n++) {
        if (isPrime(n)) cout << n << " ";
    }
    cout << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'By value or by reference', bn: 'মান দিয়ে নাকি রেফারেন্স দিয়ে' } },
    {
      kind: 'p',
      text: {
        en: 'Normally a function gets a copy: changing it inside does not change the caller’s variable. Add & to the parameter (int& x) to work on the original. Pass big vectors and strings as const vector<int>& to avoid copying them.',
        bn: 'সাধারণত ফাংশন একটি কপি পায়: ভেতরে বদলালে ডাকার জায়গার ভেরিয়েবল বদলায় না। মূলটির ওপর কাজ করতে প্যারামিটারে & দিন (int& x)। বড় ভেক্টর আর স্ট্রিং কপি এড়াতে const vector<int>& হিসেবে পাঠান।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

void addOneCopy(int x) { x++; }
void addOneRef(int& x) { x++; }

long long total(const vector<long long>& a) {
    long long s = 0;
    for (long long x : a) s += x;
    return s;
}

int main() {
    int v = 5;
    addOneCopy(v);
    cout << v << "\n";     // still 5
    addOneRef(v);
    cout << v << "\n";     // 6
    cout << total({1, 2, 3, 4}) << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Recursion', bn: 'রিকার্শন' } },
    {
      kind: 'p',
      text: {
        en: 'A recursive function solves a problem by calling itself on a smaller version. It needs a base case that stops. Euclid’s algorithm is a classic: gcd(a, b) = gcd(b, a mod b), and gcd(a, 0) = a.',
        bn: 'রিকার্সিভ ফাংশন ছোট সংস্করণে নিজেকে ডেকে সমস্যার সমাধান করে। এর একটি বেস কেস লাগে যেখানে থামে। ইউক্লিডের অ্যালগরিদম ক্লাসিক উদাহরণ: gcd(a, b) = gcd(b, a mod b), আর gcd(a, 0) = a।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long gcdRec(long long a, long long b) {
    if (b == 0) return a;          // base case
    return gcdRec(b, a % b);       // smaller problem
}

long long factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

int main() {
    cout << gcdRec(84, 36) << "\n";    // 12
    cout << factorial(10) << "\n";     // 3628800
    return 0;
}
`,
    },
  ],
  mistakes: [
    { en: 'A recursive function with no base case, or one that is never reached: the program crashes.', bn: 'বেস কেস নেই, বা কখনো পৌঁছায় না এমন রিকার্সিভ ফাংশন: প্রোগ্রাম ক্র্যাশ করে।' },
    { en: 'Passing a vector by value inside a loop, copying it millions of times. Use const & instead.', bn: 'লুপের ভেতরে ভেক্টর মান দিয়ে পাঠিয়ে লাখ লাখ বার কপি করা। বরং const & ব্যবহার করুন।' },
    { en: 'Forgetting return in a function that should give a value.', bn: 'যে ফাংশনের মান ফেরত দেওয়ার কথা, তাতে return ভুলে যাওয়া।' },
  ],
  exercise: {
    prompt: {
      en: 'Write a function gcd(a, b) using Euclid’s algorithm. Read t, then t pairs a b (1 ≤ a, b ≤ 10¹⁸), and print gcd(a, b) for each.',
      bn: 'ইউক্লিডের অ্যালগরিদম দিয়ে gcd(a, b) ফাংশন লিখুন। t পড়ুন, তারপর t-টি জোড়া a b (১ ≤ a, b ≤ ১০¹⁸), আর প্রতিটির gcd(a, b) প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    // your code here
    return 0;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << myGcd(a, b) << "\n";
    }
    return 0;
}
`,
    tests: [
      { input: '3\n84 36\n7 13\n100 10', output: '12\n1\n10' },
      { input: '1\n1000000000000000000 999999999999999999', output: '1' },
      { input: '1\n600000000000000000 400000000000000000', output: '200000000000000000' },
    ],
    hint: { en: 'If b is 0 return a; otherwise return myGcd(b, a % b).', bn: 'b শূন্য হলে a ফেরত দিন; না হলে myGcd(b, a % b) ফেরত দিন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

long long myGcd(long long a, long long b) {
    if (b == 0) return a;
    return myGcd(b, a % b);
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << myGcd(a, b) << "\n";
    }
    return 0;
}
`,
  },
};
