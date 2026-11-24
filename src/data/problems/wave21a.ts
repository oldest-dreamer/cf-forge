import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 679A
export const p679A: ProblemEntry = {
  id: '679A',
  contestId: 679,
  index: 'A',
  name: 'Bear and Prime 100',
  rating: 1400,
  interactive: true,
  tags: ['constructive', 'interactive', 'math'],
  why: L(
    'The gentlest interactive problem: a hidden number up to 100 and a budget of 20 yes/no questions. The whole trick is the fact that a composite number up to 100 always has a prime factor of at most 7, and deciding which questions to ask is the first lesson in planning a query budget.',
    'সবচেয়ে নরম ইন্টারঅ্যাকটিভ সমস্যা: ১০০-র মধ্যে একটি লুকানো সংখ্যা আর ২০টি হ্যাঁ/না প্রশ্নের বাজেট। মূল কৌশল হলো ১০০-র মধ্যে প্রতিটি যৌগিক সংখ্যার একটি মৌলিক উৎপাদক ৭-এর ছোট বা সমান; কোন প্রশ্ন করবে তা ঠিক করাই কোয়েরি-বাজেট পরিকল্পনার প্রথম পাঠ।',
  ),
  statement: L(
    'The judge secretly picked an integer n with 2 ≤ n ≤ 100. You may ask at most 20 questions. A question is an integer x with 2 ≤ x ≤ 100 printed on its own line; the judge answers "yes" if x divides n and "no" otherwise. After at most 20 questions print "prime" if n is prime or "composite" if it is not, and stop.',
    'জাজ গোপনে একটি পূর্ণসংখ্যা n নিয়েছে, ২ ≤ n ≤ ১০০। তুমি সর্বোচ্চ ২০টি প্রশ্ন করতে পারো। প্রশ্ন মানে ২ ≤ x ≤ ১০০ একটি পূর্ণসংখ্যা আলাদা লাইনে প্রিন্ট করা; x যদি n-কে ভাগ করে তবে জাজ "yes" বলে, নয়তো "no"। বড়জোর ২০ প্রশ্নের পর n মৌলিক হলে "prime", নয়তো "composite" প্রিন্ট করে থামো।',
  ),
  input: L('There is no input file. After each question you read one word, "yes" or "no".', 'কোনো ইনপুট ফাইল নেই। প্রতিটি প্রশ্নের পর একটি শব্দ পড়ো, "yes" বা "no"।'),
  output: L('Questions (one integer per line), then the final word "prime" or "composite". Flush after every line.', 'প্রশ্ন (প্রতি লাইনে একটি পূর্ণসংখ্যা), শেষে "prime" বা "composite"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 100, at most 20 questions', '২ ≤ n ≤ ১০০, সর্বোচ্চ ২০ প্রশ্ন')] },
  samples: [
    {
      input: '30',
      output: 'OK',
      transcript: '> 2\n< yes\n> 3\n< yes\n> composite',
      explain: L('n = 30 is divisible by both 2 and 3, so it has two different prime factors and cannot be prime. ' + made.en, 'n = ৩০ সংখ্যাটি ২ আর ৩ দুটিতেই বিভাজ্য, তাই এর দুটি ভিন্ন মৌলিক উৎপাদক আছে, এটি মৌলিক নয়। ' + made.bn),
    },
    {
      input: '4',
      output: 'OK',
      transcript: '> 2\n< yes\n> 4\n< yes\n> composite',
      explain: L('A single small prime p dividing n tells nothing yet (n could be p itself). Asking p² settles the squares: 4 divides 4, so it is composite. ' + made.en, 'একটি ছোট মৌলিক p দিয়ে n ভাগ গেলে এখনই কিছু বোঝা যায় না (n নিজেই p হতে পারে)। p² জিজ্ঞেস করলে বর্গের ব্যাপারটি মেটে: ৪ দিয়ে ৪ ভাগ যায়, তাই যৌগিক। ' + made.bn),
    },
  ],
  observation: L(
    'A composite number n ≤ 100 has a prime factor of at most √100 = 10, so one of 2, 3, 5, 7. If none of these divides n, then n is prime. If exactly one prime p of them divides n, then n is either p itself or a composite that is a multiple of p. Two cases need more questions: p² (catches 4, 9, 25, 49 and their multiples) and a larger prime q ≥ 11 (catches 2q, 3q, 5q, 7q such as 22 or 91). Only the primes below 50 matter, since 2·53 is already above 100.',
    '১০০-র মধ্যে যৌগিক n-এর একটি মৌলিক উৎপাদক সর্বোচ্চ √১০০ = ১০, অর্থাৎ ২, ৩, ৫, ৭ এর একটি। এদের কোনোটিই n-কে ভাগ না করলে n মৌলিক। এদের ঠিক একটি মৌলিক p ভাগ করলে n হয় নিজেই p, নয়তো p-র যৌগিক গুণিতক। দুই ক্ষেত্রে আরও প্রশ্ন লাগে: p² (৪, ৯, ২৫, ৪৯ ও তাদের গুণিতক ধরে) এবং ১১ বা তার বড় মৌলিক q (২q, ৩q, ৫q, ৭q, যেমন ২২ বা ৯১)। শুধু ৫০-এর ছোট মৌলিকই দরকার, কারণ ২·৫৩ ইতিমধ্যে ১০০ ছাড়ায়।',
  ),
  approach: [
    L('Ask 2, 3, 5, 7. If two of them divide n, print composite: two different primes divide it.', '২, ৩, ৫, ৭ জিজ্ঞেস করো। দুটি ভাগ করলে composite: দুটি ভিন্ন মৌলিক ভাগ করে।'),
    L('If none divides n, print prime.', 'কোনোটিই ভাগ না করলে prime।'),
    L('If exactly one prime p divides n, ask p². A yes means composite.', 'ঠিক একটি মৌলিক p ভাগ করলে p² জিজ্ঞেস করো। yes হলে composite।'),
    L('Finally ask the primes 11, 13, …, 47. A yes means n = p·q is composite; all no means n = p is prime. This is at most 4 + 1 + 11 = 16 questions.', 'শেষে ১১, ১৩, …, ৪৭ মৌলিকগুলো জিজ্ঞেস করো। yes হলে n = p·q যৌগিক; সব no হলে n = p মৌলিক। মোট সর্বোচ্চ ৪ + ১ + ১১ = ১৬ প্রশ্ন।'),
  ],
  walkthrough: {
    input: '59',
    steps: [
      { state: '2 no, 3 no, 5 no, 7 no', text: L('No prime up to 7 divides 59, and a composite number up to 100 would be divisible by one of them.', '৭ পর্যন্ত কোনো মৌলিক ৫৯-কে ভাগ করে না, আর ১০০-র মধ্যে যৌগিক সংখ্যা এদের একটিতে বিভাজ্য হতো।') },
      { state: 'print prime', text: L('Four questions are enough. Compare with n = 7: after 7 says yes and 49 says no, the primes 11 … 47 are still needed to rule out 77 and 91.', 'চারটি প্রশ্নই যথেষ্ট। n = ৭-এর সঙ্গে মেলাও: ৭-এ yes আর ৪৯-এ no পাওয়ার পরও ৭৭ আর ৯১ বাদ দিতে ১১ … ৪৭ লাগে।') },
    ],
  },
  complexity: { time: 'O(1) questions', space: 'O(1)', why: L('At most 16 questions with the early-exit plan, 19 with the plain plan.', 'আগেভাগে থামা পরিকল্পনায় সর্বোচ্চ ১৬ প্রশ্ন, সাদামাটা পরিকল্পনায় ১৯।') },
  solutions: [
    {
      id: 'early',
      kind: 'optimal',
      title: L('Small primes first, stop as soon as the answer is known', 'আগে ছোট মৌলিক, উত্তর জানা হলেই থামো'),
      idea: L('Ask 2, 3, 5, 7 (and the square of a divisor you find), then the primes up to 47.', '২, ৩, ৫, ৭ জিজ্ঞেস করো (যেটি ভাগ করে তার বর্গসহ), তারপর ৪৭ পর্যন্ত মৌলিক।'),
      explain: [
        L('Two small primes dividing n settle it at once. One small prime p is ambiguous until p² and the larger primes are ruled out. Four, five or sixteen questions happen only when they are needed.', 'দুটি ছোট মৌলিক ভাগ করলেই সিদ্ধান্ত। একটি ছোট মৌলিক p-তে p² আর বড় মৌলিকগুলো বাদ না দেওয়া পর্যন্ত অনিশ্চিত। ৪, ৫ বা ১৬ প্রশ্ন শুধু প্রয়োজনে হয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool yes(int x) {
    cout << x << endl;  // endl flushes
    string s;
    cin >> s;
    return s == "yes";
}

int main() {
    int found = 0;
    for (int p : {2, 3, 5, 7}) {
        if (yes(p)) {
            if (found || yes(p * p)) {
                cout << "composite" << endl;
                return 0;
            }
            found = p;
        }
    }
    if (found) {
        for (int q : {11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}) {
            if (yes(q)) {
                cout << "composite" << endl;
                return 0;
            }
        }
    }
    cout << "prime" << endl;
}
`,
      time: 'O(1) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'allprimes',
      kind: 'method',
      title: L('Ask every prime below 50, plus four squares', '৫০-এর নিচের সব মৌলিক আর চারটি বর্গ জিজ্ঞেস করো'),
      idea: L('15 primes and 4 squares is 19 questions: always enough, never clever.', '১৫ মৌলিক আর ৪ বর্গ মোট ১৯ প্রশ্ন: সবসময় যথেষ্ট, চালাকি নেই।'),
      explain: [
        L('Count how many primes below 50 divide n, and whether any of 4, 9, 25, 49 does. If the count is at least 2 or a square divides, n is composite. If exactly one prime divides and no square does, n is that prime. If none divides, n is a prime above 50. The 19 questions fit in the budget of 20, which is why the problem allows exactly 20.', '৫০-এর নিচের কতগুলো মৌলিক n-কে ভাগ করে গুনো, আর ৪, ৯, ২৫, ৪৯ এর কোনোটি ভাগ করে কিনা দেখো। সংখ্যা ২ বা বেশি হলে, বা কোনো বর্গ ভাগ করলে, n যৌগিক। ঠিক একটি মৌলিক ভাগ করে আর কোনো বর্গ নয় হলে n সেই মৌলিক। কোনোটিই না ভাগ করলে n ৫০-এর বড় মৌলিক। ১৯ প্রশ্ন ২০-এর বাজেটে ধরে, তাই সমস্যায় ঠিক ২০ দেওয়া।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool yes(int x) {
    cout << x << endl;
    string s;
    cin >> s;
    return s == "yes";
}

int main() {
    int primes[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47};
    int count = 0;
    for (int p : primes) count += yes(p);
    bool square = false;
    for (int p : {2, 3, 5, 7}) square |= yes(p * p);
    cout << (count >= 2 || square ? "composite" : "prime") << endl;
}
`,
      time: 'O(1) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask every number from 2 to 50 and count the yeses', '২ থেকে ৫০ সব জিজ্ঞেস করে হ্যাঁ গুনো'),
      idea: L('A prime ≤ 50 divides only itself (one yes); a composite has at least two divisors in 2..50 (two or more yeses). It works but uses 49 questions.', '৫০-এর মধ্যে মৌলিক শুধু নিজেকে ভাগ করে (একটি yes); যৌগিকের ২..৫০-এ অন্তত দুটি উৎপাদক (দুই বা বেশি yes)। চলে, কিন্তু ৪৯ প্রশ্ন লাগে।'),
      explain: [
        L('The statement allows only 20 questions, so this is rejected on the judge; it is here to show what a budget forces you to avoid. It is also a handy reference: write it first, then thin the questions out.', 'স্টেটমেন্টে মাত্র ২০ প্রশ্ন, তাই জাজে এটি বাতিল; বাজেট কী এড়াতে বাধ্য করে তা দেখাতেই এটি। রেফারেন্স হিসেবেও কাজের: আগে এটি লেখো, তারপর প্রশ্ন ছেঁটে ফেলো।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int yeses = 0;
    for (int x = 2; x <= 50; x++) {
        cout << x << endl;
        string s;
        cin >> s;
        yeses += s == "yes";
    }
    cout << (yeses >= 2 ? "composite" : "prime") << endl;
}
`,
      time: '49 questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2', output: 'OK', source: 'own', note: L('The smallest prime.', 'সবচেয়ে ছোট মৌলিক।') },
    { input: '49', output: 'OK', source: 'own', note: L('A prime square: only the question 49 or 7² catches it.', 'মৌলিকের বর্গ: শুধু ৪৯ বা ৭² জিজ্ঞেস করলে ধরা পড়ে।') },
    { input: '91', output: 'OK', source: 'own', note: L('7 · 13: one small prime and one larger one.', '৭ · ১৩: একটি ছোট আর একটি বড় মৌলিক।') },
    { input: '97', output: 'OK', source: 'own', note: L('The largest prime below 100.', '১০০-র নিচে সবচেয়ে বড় মৌলিক।') },
    { input: '94', output: 'OK', source: 'own', note: L('2 · 47: the largest cofactor that matters.', '২ · ৪৭: গুরুত্বপূর্ণ সবচেয়ে বড় সহগুণক।') },
    { input: '100', output: 'OK', source: 'own', note: L('Many divisors.', 'অনেক উৎপাদক।') },
  ],
  pitfalls: [
    L('Forgetting to flush: the judge never sees the question and the program is stopped for idleness. Use endl or fflush(stdout).', 'flush ভুলে যাওয়া: জাজ প্রশ্নই দেখে না, প্রোগ্রাম নিষ্ক্রিয়তার জন্য থামানো হয়। endl বা fflush(stdout) ব্যবহার করো।'),
    L('Treating "divisible by 2" as proof of compositeness: n = 2 itself is prime. The same for 3, 5, 7.', '"২ দিয়ে বিভাজ্য" মানেই যৌগিক ধরা: n = ২ নিজেই মৌলিক। ৩, ৫, ৭-এর বেলায়ও তাই।'),
    L('Stopping after the primes up to 7 when one divides: 22, 26, …, 94 are composite but have only one small prime factor and no square.', 'একটি ভাগ করার পর ৭ পর্যন্ত মৌলিকেই থেমে যাওয়া: ২২, ২৬, …, ৯৪ যৌগিক, কিন্তু একটি ছোট মৌলিক উৎপাদক আর কোনো বর্গ নেই।'),
    L('Printing anything except the question number or the final word.', 'প্রশ্নের সংখ্যা বা শেষ শব্দ ছাড়া অন্য কিছু প্রিন্ট করা।'),
  ],
  related: [
    { id: '1167B', name: 'Lost Numbers', why: L('Another tiny search space where the real work is choosing the questions.', 'আরেকটি ছোট সার্চ স্পেস যেখানে আসল কাজ প্রশ্ন বাছাই।') },
    { id: '1103B', name: 'Game with modulo', why: L('Binary search on a hidden value with a 60-question budget.', '৬০ প্রশ্নের বাজেটে লুকানো মানের বাইনারি সার্চ।') },
  ],
  toolkit: ['io-basics'],
};

// ───────────────────────────────────────────── 727C
export const p727C: ProblemEntry = {
  id: '727C',
  contestId: 727,
  index: 'C',
  name: 'Guess the Array',
  rating: 1400,
  interactive: true,
  tags: ['constructive', 'interactive', 'math'],
  why: L(
    'Pair sums look like they need n²/2 questions, but three of them solve for one element and every other element then costs one question. A first taste of reading off unknowns from a small linear system.',
    'জোড়ার যোগফল মনে হয় n²/২ প্রশ্ন চায়, অথচ তিনটি প্রশ্নে একটি উপাদান বের হয় আর বাকি প্রতিটির জন্য একটি করে। ছোট রৈখিক সমীকরণ থেকে অজানা বের করার প্রথম স্বাদ।',
  ),
  statement: L(
    'The judge hides an array a of n positive integers (3 ≤ n ≤ 5000, every value at most 10⁹). You may ask for the sum a_i + a_j of any two different positions; you are allowed n questions in total. Then print the whole array.',
    'জাজ n টি ধনাত্মক পূর্ণসংখ্যার একটি অ্যারে a লুকিয়েছে (৩ ≤ n ≤ ৫০০০, প্রতিটি মান ≤ ১০⁹)। যেকোনো দুটি ভিন্ন অবস্থানের যোগফল a_i + a_j জিজ্ঞেস করতে পারো; মোট n টি প্রশ্নের অনুমতি। তারপর পুরো অ্যারে প্রিন্ট করো।',
  ),
  input: L('First line: n. Then, after each question "? i j", one integer: a_i + a_j.', 'প্রথম লাইনে n। তারপর প্রতিটি প্রশ্ন "? i j"-এর পর একটি পূর্ণসংখ্যা: a_i + a_j।'),
  output: L('Questions "? i j" (i ≠ j), then "! a_1 … a_n". Flush after every line.', 'প্রশ্ন "? i j" (i ≠ j), শেষে "! a_1 … a_n"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 5000, 1 ≤ a_i ≤ 10⁹, at most n questions', '৩ ≤ n ≤ ৫০০০, ১ ≤ a_i ≤ ১০⁹, সর্বোচ্চ n প্রশ্ন')] },
  samples: [
    {
      input: '5\n4 1 5 9 2',
      output: 'OK',
      transcript: '< 5\n> ? 1 2\n< 5\n> ? 1 3\n< 9\n> ? 2 3\n< 6\n> ? 1 4\n< 13\n> ? 1 5\n< 6\n> ! 4 1 5 9 2',
      explain: L('Three sums give a_1 = (5 + 9 − 6) / 2 = 4. Then a_4 = 13 − 4 = 9 and a_5 = 6 − 4 = 2: five questions for n = 5. ' + made.en, 'তিনটি যোগফলে a_1 = (৫ + ৯ − ৬) / ২ = ৪। তারপর a_4 = ১৩ − ৪ = ৯ আর a_5 = ৬ − ৪ = ২: n = ৫-এর জন্য পাঁচটি প্রশ্ন। ' + made.bn),
    },
  ],
  observation: L(
    'Adding the first two sums and subtracting the third cancels everything but one unknown: (a_1 + a_2) + (a_1 + a_3) − (a_2 + a_3) = 2·a_1. Once a_1 is known, each other element is one question away: a_i = (a_1 + a_i) − a_1. That uses 3 + (n − 3) = n questions, exactly the budget.',
    'প্রথম দুই যোগফল যোগ করে তৃতীয়টি বিয়োগ করলে একটি অজানা বাদে সব কাটা যায়: (a_1 + a_2) + (a_1 + a_3) − (a_2 + a_3) = ২·a_1। a_1 জানা হলে বাকি প্রতিটি এক প্রশ্ন দূরে: a_i = (a_1 + a_i) − a_1। মোট ৩ + (n − ৩) = n প্রশ্ন, ঠিক বাজেটের সমান।',
  ),
  approach: [
    L('Ask (1, 2), (1, 3), (2, 3) and compute a_1 = (s12 + s13 − s23) / 2.', '(১, ২), (১, ৩), (২, ৩) জিজ্ঞেস করে a_1 = (s12 + s13 − s23) / ২ বের করো।'),
    L('Set a_2 = s12 − a_1 and a_3 = s13 − a_1.', 'a_2 = s12 − a_1 আর a_3 = s13 − a_1।'),
    L('For i = 4 … n ask (1, i) and set a_i = s1i − a_1.', 'i = ৪ … n-এর জন্য (১, i) জিজ্ঞেস করে a_i = s1i − a_1।'),
    L('Use long long: a sum can reach 2·10⁹.', 'long long নাও: যোগফল ২·১০⁹ পর্যন্ত হতে পারে।'),
  ],
  walkthrough: {
    input: '5\n4 1 5 9 2',
    steps: [
      { state: 's12 = 5, s13 = 9, s23 = 6', text: L('(5 + 9 − 6) / 2 = 4 is a_1; then a_2 = 1 and a_3 = 5.', '(৫ + ৯ − ৬) / ২ = ৪ হলো a_1; তারপর a_2 = ১ আর a_3 = ৫।') },
      { state: 's14 = 13, s15 = 6', text: L('a_4 = 13 − 4 = 9, a_5 = 6 − 4 = 2.', 'a_4 = ১৩ − ৪ = ৯, a_5 = ৬ − ৪ = ২।') },
    ],
  },
  complexity: { time: 'O(n) questions, O(n) time', space: 'O(n)', why: L('One question per element beyond the first three, plus three to start.', 'প্রথম তিনটির পর প্রতি উপাদানে একটি প্রশ্ন, শুরুতে তিনটি।') },
  solutions: [
    {
      id: 'anchor',
      kind: 'optimal',
      title: L('Anchor on a_1', 'a_1-কে নোঙর করো'),
      idea: L('Three questions find a_1; every other element is s(1, i) − a_1.', 'তিন প্রশ্নে a_1; বাকি সব s(১, i) − a_1।'),
      explain: [L('The first three questions form a triangle on positions 1, 2, 3, which is the smallest system with a unique solution. After that the star centred at 1 does the rest.', 'প্রথম তিন প্রশ্ন ১, ২, ৩ অবস্থানের একটি ত্রিভুজ, যা একক সমাধানসহ সবচেয়ে ছোট সিস্টেম। এরপর ১-কে কেন্দ্র করে তারা-গঠনই বাকিটা করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long ask(int i, int j) {
    cout << "? " << i << " " << j << endl;
    long long s;
    cin >> s;
    return s;
}

int main() {
    int n;
    cin >> n;
    vector<long long> a(n + 1);
    long long s12 = ask(1, 2), s13 = ask(1, 3), s23 = ask(2, 3);
    a[1] = (s12 + s13 - s23) / 2;
    a[2] = s12 - a[1];
    a[3] = s13 - a[1];
    for (int i = 4; i <= n; i++) a[i] = ask(1, i) - a[1];
    cout << "!";
    for (int i = 1; i <= n; i++) cout << " " << a[i];
    cout << endl;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'long-long'],
    },
    {
      id: 'chain',
      kind: 'method',
      title: L('A chain: each new element from its neighbour', 'শিকল: প্রতিটি নতুন উপাদান প্রতিবেশী থেকে'),
      idea: L('After the first triangle ask (i − 1, i) and subtract the known neighbour.', 'প্রথম ত্রিভুজের পর (i − ১, i) জিজ্ঞেস করে জানা প্রতিবেশী বিয়োগ করো।'),
      explain: [L('Same question count, different shape: a path instead of a star. A path is the better picture when the unknowns can only be reached from the previous one, which happens in harder variants where only neighbours may be queried.', 'প্রশ্নের সংখ্যা একই, আকৃতি আলাদা: তারার বদলে পথ। অজানাকে শুধু আগেরটি থেকে পাওয়া গেলে পথই ভালো ছবি; যেসব কঠিন সংস্করণে শুধু প্রতিবেশী জিজ্ঞেস করা যায় সেখানে এমন হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long ask(int i, int j) {
    cout << "? " << i << " " << j << endl;
    long long s;
    cin >> s;
    return s;
}

int main() {
    int n;
    cin >> n;
    vector<long long> a(n + 1);
    long long s12 = ask(1, 2), s13 = ask(1, 3), s23 = ask(2, 3);
    a[1] = (s12 + s13 - s23) / 2;
    a[2] = s12 - a[1];
    a[3] = s13 - a[1];
    for (int i = 4; i <= n; i++) a[i] = ask(i - 1, i) - a[i - 1];
    cout << "!";
    for (int i = 1; i <= n; i++) cout << " " << a[i];
    cout << endl;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask every pair', 'প্রতিটি জোড়া জিজ্ঞেস করো'),
      idea: L('n(n − 1)/2 questions, then solve. Correct, but far over the budget.', 'n(n − ১)/২ প্রশ্ন, তারপর সমাধান। ঠিক, কিন্তু বাজেটের অনেক বেশি।'),
      explain: [L('Collect s(i, j) for all i < j, then a_1 comes from the first triangle and everything else from row 1. All the extra questions are redundant, which is exactly what the budget of n tells you to avoid.', 'সব i < j-র জন্য s(i, j) জোগাড় করো; a_1 প্রথম ত্রিভুজ থেকে, বাকি সব ১ নম্বর সারি থেকে। বাড়তি প্রশ্নগুলো অপ্রয়োজনীয়, n-এর বাজেট ঠিক এটাই এড়াতে বলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<long long>> s(n + 1, vector<long long>(n + 1));
    for (int i = 1; i <= n; i++)
        for (int j = i + 1; j <= n; j++) {
            cout << "? " << i << " " << j << endl;
            cin >> s[i][j];
        }
    vector<long long> a(n + 1);
    a[1] = (s[1][2] + s[1][3] - s[2][3]) / 2;
    for (int i = 2; i <= n; i++) a[i] = s[1][i] - a[1];
    cout << "!";
    for (int i = 1; i <= n; i++) cout << " " << a[i];
    cout << endl;
}
`,
      time: 'O(n²) questions',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['io-basics', 'vector', 'long-long'],
    },
  ],
  tests: [
    { input: '3\n1000000000 1000000000 1000000000', output: 'OK', source: 'own', note: L('The smallest n and the largest values: sums are 2·10⁹, which overflows int.', 'সবচেয়ে ছোট n আর সবচেয়ে বড় মান: যোগফল ২·১০⁹, যা int-এ উপচে পড়ে।') },
    { input: '4\n1 1 1 1', output: 'OK', source: 'own', note: L('All equal.', 'সব সমান।') },
    { input: '6\n7 3 9 1 1000000000 5', output: 'OK', source: 'own', note: L('A large value in the middle.', 'মাঝখানে একটি বড় মান।') },
  ],
  pitfalls: [
    L('int overflow: a sum of two values near 10⁹ does not fit in 32 bits.', 'int উপচানো: ১০⁹-এর কাছাকাছি দুই মানের যোগফল ৩২ বিটে ধরে না।'),
    L('Asking the same pair twice or asking (i, i): the judge treats i = j as an error.', 'একই জোড়া দুবার বা (i, i) জিজ্ঞেস করা: i = j হলে জাজ এটিকে ভুল ধরে।'),
    L('Starting the loop at 3 instead of 4 and spending a fourth question on a_3, which breaks the budget for n = 3.', 'লুপ ৪-এর বদলে ৩ থেকে শুরু করলে a_3-র জন্য চতুর্থ প্রশ্ন খরচ হয়, n = ৩-এ বাজেট ভাঙে।'),
  ],
  related: [
    { id: '1167B', name: 'Lost Numbers', why: L('Same idea with products and only six values.', 'একই ধারণা, গুণফল আর মাত্র ছয়টি মান।') },
    { id: '1407C', name: 'Chocolate Bunny', why: L('Recover a permutation with about n questions.', 'প্রায় n প্রশ্নে একটি পারমুটেশন উদ্ধার।') },
  ],
  toolkit: ['io-basics', 'vector', 'long-long'],
};

// ───────────────────────────────────────────── 1167B
export const p1167B: ProblemEntry = {
  id: '1167B',
  contestId: 1167,
  index: 'B',
  name: 'Lost Numbers',
  rating: 1400,
  interactive: true,
  tags: ['brute-force', 'divide-and-conquer', 'interactive', 'math'],
  why: L(
    'Only 720 arrangements exist, so four products are enough to name one of them. The point is to let the computer search after a few well-chosen questions instead of reasoning out the structure by hand.',
    'মাত্র ৭২০টি বিন্যাস আছে, তাই চারটি গুণফলই একটিকে চিহ্নিত করতে যথেষ্ট। কয়েকটি ভালো প্রশ্নের পর হাতে কাঠামো বের করার বদলে কম্পিউটারকে খুঁজতে দেওয়াই এখানে কথা।',
  ),
  statement: L(
    'The judge hides an array of six numbers that is some ordering of 4, 8, 15, 16, 23, 42. You may ask at most 4 questions "? i j" (1 ≤ i, j ≤ 6, the two indices may be equal); the answer is the product a_i · a_j. Then print the array.',
    'জাজ ছয়টি সংখ্যার একটি অ্যারে লুকিয়েছে, যা ৪, ৮, ১৫, ১৬, ২৩, ৪২ এর কোনো একটি ক্রম। সর্বোচ্চ ৪টি প্রশ্ন "? i j" করতে পারো (১ ≤ i, j ≤ ৬, দুটি সূচক সমানও হতে পারে); উত্তর গুণফল a_i · a_j। তারপর অ্যারেটি প্রিন্ট করো।',
  ),
  input: L('After each question, one integer: the product.', 'প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: গুণফল।'),
  output: L('Up to four questions "? i j", then "! a_1 … a_6". Flush after every line.', 'সর্বোচ্চ চারটি প্রশ্ন "? i j", শেষে "! a_1 … a_6"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('the array is a permutation of 4 8 15 16 23 42, at most 4 questions', 'অ্যারে ৪ ৮ ১৫ ১৬ ২৩ ৪২-এর একটি বিন্যাস, সর্বোচ্চ ৪ প্রশ্ন')] },
  samples: [
    {
      input: '15 4 42 8 23 16',
      output: 'OK',
      transcript: '> ? 1 2\n< 60\n> ? 2 3\n< 168\n> ? 3 4\n< 336\n> ? 4 5\n< 184\n> ! 15 4 42 8 23 16',
      explain: L('Four products of neighbours. Among the 720 orderings only one gives 60, 168, 336, 184 in these places. ' + made.en, 'প্রতিবেশীদের চারটি গুণফল। ৭২০ বিন্যাসের মধ্যে ঠিক একটিই এই জায়গাগুলোতে ৬০, ১৬৮, ৩৩৬, ১৮৪ দেয়। ' + made.bn),
    },
  ],
  observation: L(
    'Ask the neighbour products (1,2), (2,3), (3,4), (4,5). Each product of two of these six numbers is distinct and the four answers overlap in a chain, so only one permutation matches all of them. The sixth value is simply what is left. A computer can try all 720 arrangements in an instant.',
    'প্রতিবেশীর গুণফল (১,২), (২,৩), (৩,৪), (৪,৫) জিজ্ঞেস করো। এই ছয়টি সংখ্যার যেকোনো দুটির গুণফল আলাদা, আর চারটি উত্তর শিকলের মতো জুড়ে থাকে, তাই কেবল একটি বিন্যাসই সবগুলোর সঙ্গে মেলে। ষষ্ঠ মানটি বাকি থাকা সংখ্যা। কম্পিউটার ৭২০টি বিন্যাস নিমেষে ঘেঁটে নিতে পারে।',
  ),
  approach: [
    L('Ask (1, 2), (2, 3), (3, 4), (4, 5) and store the four products.', '(১, ২), (২, ৩), (৩, ৪), (৪, ৫) জিজ্ঞেস করে চারটি গুণফল রাখো।'),
    L('Go through every permutation of {4, 8, 15, 16, 23, 42} with next_permutation.', 'next_permutation দিয়ে {৪, ৮, ১৫, ১৬, ২৩, ৪২}-এর প্রতিটি বিন্যাস দেখো।'),
    L('Print the first permutation whose neighbour products equal the four answers.', 'যে বিন্যাসের প্রতিবেশী গুণফল চার উত্তরের সমান, প্রথমটি প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '15 4 42 8 23 16',
    steps: [
      { state: '60, 168, 336, 184', text: L('The four answers. 60 = 4 · 15, 168 = 4 · 42, 336 = 8 · 42, 184 = 8 · 23.', 'চার উত্তর। ৬০ = ৪ · ১৫, ১৬৮ = ৪ · ৪২, ৩৩৬ = ৮ · ৪২, ১৮৪ = ৮ · ২৩।') },
      { state: '4 and 42 share 168 and 60 / 336', text: L('The element in position 2 is in two products (60 and 168), so it is the common factor of both: 4.', 'দুই নম্বর অবস্থানের উপাদান দুটি গুণফলে (৬০ ও ১৬৮) আছে, তাই এটিই দুইয়ের সাধারণ উৎপাদক: ৪।') },
      { state: '15 4 42 8 23 16', text: L('Following the chain gives 15, 4, 42, 8, 23, and 16 is what remains.', 'শিকল ধরে ১৫, ৪, ৪২, ৮, ২৩, আর বাকি থাকে ১৬।') },
    ],
  },
  complexity: { time: '720 · 5 per search, 4 questions', space: 'O(1)', why: L('A constant number of permutations is checked.', 'ধ্রুবক সংখ্যক বিন্যাস যাচাই হয়।') },
  solutions: [
    {
      id: 'perm',
      kind: 'optimal',
      title: L('Four neighbour products, then try all 720 orders', 'চারটি প্রতিবেশী গুণফল, তারপর ৭২০ বিন্যাস'),
      idea: L('next_permutation over the six numbers, compare the four products.', 'ছয় সংখ্যার ওপর next_permutation, চারটি গুণফল মেলাও।'),
      explain: [L('The questions are chosen so that the answers pin the permutation down uniquely. The search is a constant 720 steps and nothing else is needed. If an order matches, it is the order the judge holds.', 'প্রশ্ন এমনভাবে বাছা যে উত্তরগুলো বিন্যাসকে অনন্যভাবে ধরে ফেলে। সার্চ ধ্রুবক ৭২০ ধাপ, আর কিছু লাগে না। কোনো ক্রম মিললে সেটিই জাজের ক্রম।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int i, int j) {
    cout << "? " << i << " " << j << endl;
    int p;
    cin >> p;
    return p;
}

int main() {
    int q[4] = {ask(1, 2), ask(2, 3), ask(3, 4), ask(4, 5)};
    int a[6] = {4, 8, 15, 16, 23, 42};
    do {
        bool ok = true;
        for (int i = 0; i < 4; i++) ok &= a[i] * a[i + 1] == q[i];
        if (ok) break;
    } while (next_permutation(a, a + 6));
    cout << "!";
    for (int x : a) cout << " " << x;
    cout << endl;
}
`,
      time: 'O(720)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('Backtracking with the products as constraints', 'গুণফলকে শর্ত ধরে ব্যাকট্র্যাকিং'),
      idea: L('Place the numbers one by one and prune as soon as a neighbour product disagrees.', 'এক এক করে সংখ্যা বসাও, প্রতিবেশী গুণফল না মিললেই ছেঁটে ফেলো।'),
      explain: [L('This is the same search written as a depth-first walk: after placing position k, the product a_{k−1} · a_k is already known to match or not, so most branches die at depth 2 or 3.', 'একই সার্চ গভীরতা-প্রথম হাঁটায়: k নম্বর বসানোর পর a_{k−১} · a_k মেলে কি না তখনই জানা, তাই বেশিরভাগ শাখা ২ বা ৩ গভীরতায় মরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int q[4], a[6], used[6];
const int V[6] = {4, 8, 15, 16, 23, 42};

bool go(int k) {
    if (k == 6) return true;
    for (int c = 0; c < 6; c++) {
        if (used[c]) continue;
        if (k >= 1 && k <= 4 && a[k - 1] * V[c] != q[k - 1]) continue;
        used[c] = 1;
        a[k] = V[c];
        if (go(k + 1)) return true;
        used[c] = 0;
    }
    return false;
}

int main() {
    for (int i = 0; i < 4; i++) {
        cout << "? " << i + 1 << " " << i + 2 << endl;
        cin >> q[i];
    }
    go(0);
    cout << "!";
    for (int x : a) cout << " " << x;
    cout << endl;
}
`,
      time: 'O(720) worst, much less in practice',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask all 15 pairs', 'সব ১৫টি জোড়া জিজ্ঞেস করো'),
      idea: L('Plenty of information, but 15 questions are far over the budget of 4.', 'তথ্য প্রচুর, কিন্তু ১৫ প্রশ্ন ৪-এর বাজেটের অনেক বেশি।'),
      explain: [L('Ask (i, j) for every i < j, then search for the permutation that reproduces all products. It is correct and shows how much slack the real solution squeezes out.', 'প্রতিটি i < j-র জন্য (i, j) জিজ্ঞেস করে সব গুণফল ফেরত দেয় এমন বিন্যাস খোঁজো। এটি ঠিক, আর আসল সমাধান কত অতিরিক্ত তথ্য কমায় তা দেখায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int p[6][6] = {};
    for (int i = 0; i < 6; i++)
        for (int j = i + 1; j < 6; j++) {
            cout << "? " << i + 1 << " " << j + 1 << endl;
            cin >> p[i][j];
        }
    int a[6] = {4, 8, 15, 16, 23, 42};
    do {
        bool ok = true;
        for (int i = 0; i < 6; i++)
            for (int j = i + 1; j < 6; j++) ok &= a[i] * a[j] == p[i][j];
        if (ok) break;
    } while (next_permutation(a, a + 6));
    cout << "!";
    for (int x : a) cout << " " << x;
    cout << endl;
}
`,
      time: '15 questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '4 8 15 16 23 42', output: 'OK', source: 'own', note: L('Sorted order.', 'ক্রমানুসারে।') },
    { input: '42 23 16 15 8 4', output: 'OK', source: 'own', note: L('Reverse order.', 'উল্টো ক্রম।') },
    { input: '16 4 23 42 15 8', output: 'OK', source: 'own', note: L('A mixed order where the last two values only appear in one product.', 'মিশ্র ক্রম, যেখানে শেষ দুটি মান একটিমাত্র গুণফলে আসে।') },
  ],
  pitfalls: [
    L('Asking (i, i): the square only names one number and wastes a question. Neighbour products overlap, which is what makes the answers decisive.', '(i, i) জিজ্ঞেস করা: বর্গ একটি সংখ্যাই বলে, প্রশ্ন নষ্ট হয়। প্রতিবেশী গুণফল ওভারল্যাপ করে বলেই উত্তর নির্ণায়ক।'),
    L('Choosing four questions that do not chain, such as (1, 2), (3, 4), (5, 6), (1, 3): they can leave two orders possible.', 'শিকল না হওয়া চারটি প্রশ্ন বাছা, যেমন (১, ২), (৩, ৪), (৫, ৬), (১, ৩): দুটি ক্রম সম্ভব থেকে যেতে পারে।'),
    L('Printing the array after reading a "-1": the judge uses it to say a query was invalid. Stop at once.', '"-১" পড়ার পরও অ্যারে প্রিন্ট করা: জাজ এটি দিয়ে অবৈধ প্রশ্ন বোঝায়। সঙ্গে সঙ্গে থামো।'),
  ],
  related: [
    { id: '727C', name: 'Guess the Array', why: L('Sums instead of products, n elements instead of 6.', 'গুণফলের বদলে যোগফল, ৬-এর বদলে n টি উপাদান।') },
    { id: '1407C', name: 'Chocolate Bunny', why: L('Recover a whole permutation from pair answers.', 'জোড়ার উত্তর থেকে পুরো পারমুটেশন উদ্ধার।') },
  ],
  toolkit: ['io-basics'],
};

// ───────────────────────────────────────────── 1486C1
export const p1486C1: ProblemEntry = {
  id: '1486C1',
  contestId: 1486,
  index: 'C1',
  name: 'Guessing the Greatest (easy version)',
  rating: 1600,
  interactive: true,
  tags: ['binary-search', 'interactive'],
  why: L(
    'The second maximum of a range reveals which side of it the maximum lies on. Binary search without ever looking at a value is the heart of "searching with a weak oracle".',
    'কোনো পরিসরের দ্বিতীয় বৃহত্তম থেকে বোঝা যায় সর্বোচ্চটি তার কোন পাশে। কোনো মান না দেখেই বাইনারি সার্চ: "দুর্বল ওরাকল দিয়ে খোঁজা"-র মূল কথা।',
  ),
  statement: L(
    'The judge hides a permutation a of 1 … n. A question "? l r" (l < r) is answered with the position of the second largest element of a_l … a_r. Find the position of the number n using at most 40 questions and print it as "! p".',
    'জাজ ১ … n-এর একটি পারমুটেশন a লুকিয়েছে। প্রশ্ন "? l r" (l < r)-এর উত্তর a_l … a_r-এর দ্বিতীয় বৃহত্তম উপাদানের অবস্থান। সর্বোচ্চ ৪০টি প্রশ্নে সংখ্যা n-এর অবস্থান বের করে "! p" প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, one integer: a position.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: একটি অবস্থান।'),
  output: L('Questions "? l r", then "! p". Flush after every line.', 'প্রশ্ন "? l r", শেষে "! p"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, at most 40 questions', '২ ≤ n ≤ ১০⁵, সর্বোচ্চ ৪০ প্রশ্ন')] },
  samples: [
    {
      input: '5\n2 5 1 4 3',
      output: 'OK',
      transcript: '< 5\n> ? 1 5\n< 4\n> ? 1 4\n< 4\n> ? 1 2\n< 1\n> ! 2',
      explain: L('The second largest of the whole array (value 4) is at position 4. The range 1 … 4 still has 4 as second largest, so 5 is to the left of position 4, and 1 … 2 says the second largest there is position 1, so the 5 is at 2. ' + made.en, 'পুরো অ্যারের দ্বিতীয় বৃহত্তম (মান ৪) ৪ নম্বর অবস্থানে। ১ … ৪ পরিসরেও ৪ দ্বিতীয় বৃহত্তম, তাই ৫ চার নম্বরের বাঁয়ে, আর ১ … ২-এ দ্বিতীয় বৃহত্তম ১ নম্বর অবস্থানে, তাই ৫ আছে ২ নম্বরে। ' + made.bn),
    },
  ],
  observation: L(
    'Let s be the position of the second largest in the whole range. The maximum is on one side of s. Ask the range from l to s: if its second largest is still s, then the larger value (the maximum) must be inside that range, so it is left of s. If not, the maximum is right of s. Either way the maximum is confined to one side, and each further question halves the candidates.',
    'ধরো s পুরো পরিসরের দ্বিতীয় বৃহত্তমের অবস্থান। সর্বোচ্চ s-এর এক পাশে। l থেকে s পরিসর জিজ্ঞেস করো: এর দ্বিতীয় বৃহত্তম এখনও s হলে বড় মান (সর্বোচ্চ) ওই পরিসরের ভেতরেই, অর্থাৎ s-এর বাঁয়ে। নয়তো ডানে। যেকোনো ভাবে সর্বোচ্চ এক পাশে আটকা, আর প্রতিটি প্রশ্ন প্রার্থীদের অর্ধেক করে।',
  ),
  approach: [
    L('Keep a range [l, r] that contains the maximum and the position s of its second largest. At the start ask (1, n).', 'সর্বোচ্চসহ একটি পরিসর [l, r] আর তার দ্বিতীয় বৃহত্তমের অবস্থান s রাখো। শুরুতে (১, n) জিজ্ঞেস করো।'),
    L('Let m be the middle. If s ≤ m, ask (l, m): when the answer is s the maximum is in [l, m], so shrink to it, and s stays the second largest. Otherwise the maximum is in [m + 1, r]; ask that range for its new second largest.', 'm মাঝের বিন্দু। s ≤ m হলে (l, m) জিজ্ঞেস করো: উত্তর s হলে সর্বোচ্চ [l, m]-এ, পরিসর ছোট করো, s-ই দ্বিতীয় বৃহত্তম থাকে। নয়তো সর্বোচ্চ [m + ১, r]-এ; তার নতুন দ্বিতীয় বৃহত্তম জিজ্ঞেস করো।'),
    L('If s > m do the mirror image with (m + 1, r).', 's > m হলে আয়না-প্রতিচ্ছবি (m + ১, r) দিয়ে।'),
    L('That is at most 2 questions per halving, about 1 + 2·17 = 35 for n = 10⁵: within 40.', 'প্রতি অর্ধেকে সর্বোচ্চ ২ প্রশ্ন, n = ১০⁵-এ প্রায় ১ + ২·১৭ = ৩৫: ৪০-এর মধ্যে।'),
  ],
  walkthrough: {
    input: '5\n2 5 1 4 3',
    steps: [
      { state: '(1, 5) → s = 4', text: L('The whole array has the second largest at position 4.', 'পুরো অ্যারের দ্বিতীয় বৃহত্তম ৪ নম্বরে।') },
      { state: 'm = 3, s > m: ask (4, 5) → 5', text: L('Position 5 holds 3 and position 4 holds 4; the second largest of [4, 5] is position 5, not 4, so the maximum is not in [4, 5].', '৫ নম্বরে ৩ আর ৪ নম্বরে ৪; [৪, ৫]-এর দ্বিতীয় বৃহত্তম ৫ নম্বর, ৪ নয়, তাই সর্বোচ্চ [৪, ৫]-এ নেই।') },
      { state: 'range [1, 3], new s from (1, 3) → 1', text: L('Narrowed to the left; its second largest is position 1 (value 2).', 'বাঁয়ে সংকুচিত; এর দ্বিতীয় বৃহত্তম ১ নম্বর (মান ২)।') },
      { state: 'm = 2, s ≤ m: ask (1, 2) → 1', text: L('Equals s, so the maximum is in [1, 2], and since s = 1 it is position 2.', 'এটি s-এর সমান, তাই সর্বোচ্চ [১, ২]-এ, আর s = ১ বলে এটি ২ নম্বর।') },
    ],
  },
  complexity: { time: 'O(log n) questions', space: 'O(1)', why: L('Each halving costs at most two questions.', 'প্রতিটি অর্ধেক করতে সর্বোচ্চ দুই প্রশ্ন।') },
  solutions: [
    {
      id: 'half',
      kind: 'method',
      title: L('Halve the range, two questions per step', 'পরিসর অর্ধেক করো, ধাপে দুই প্রশ্ন'),
      idea: L('Ask the half that contains the current second largest; if it keeps it, the maximum is there, otherwise in the other half.', 'বর্তমান দ্বিতীয় বৃহত্তম যে অর্ধেকে আছে তা জিজ্ঞেস করো; ধরে রাখলে সর্বোচ্চ সেখানে, নয়তো অন্য অর্ধেকে।'),
      explain: [
        L('This is the textbook halving. The only extra cost: when the maximum is in the half that does not contain s, the new range needs a fresh second largest, which is one more question. Total 1 + 2 · ⌈log₂ n⌉ ≤ 35 for n up to 10⁵.', 'এটি পাঠ্যবইয়ের অর্ধেক করা। একমাত্র বাড়তি খরচ: সর্বোচ্চ যে অর্ধেকে s নেই সেখানে থাকলে নতুন পরিসরের দ্বিতীয় বৃহত্তম আরেক প্রশ্ন। n ≤ ১০⁵-এ মোট ১ + ২ · ⌈log₂ n⌉ ≤ ৩৫।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int l, int r) {
    cout << "? " << l << " " << r << endl;
    int p;
    cin >> p;
    return p;
}

int main() {
    int n;
    cin >> n;
    int l = 1, r = n;
    int s = ask(l, r);
    while (l < r) {
        int m = (l + r) / 2;
        if (s <= m) {
            if (l < m && ask(l, m) == s) {
                r = m;           // maximum is in [l, m], s is still its second largest
            } else {
                l = m + 1;       // maximum is in [m + 1, r]
                if (l < r) s = ask(l, r);
            }
        } else {
            if (m + 1 < r && ask(m + 1, r) == s) {
                l = m + 1;
            } else {
                r = m;
                if (l < r) s = ask(l, r);
            }
        }
    }
    cout << "! " << l << endl;
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'ternary'],
    },
    {
      id: 'side',
      kind: 'optimal',
      title: L('Anchor on s: one question per step', 'a s-কে নোঙর করো: ধাপে এক প্রশ্ন'),
      idea: L('After finding s, binary search only on the side that holds the maximum, always asking ranges that end at s.', 's পাওয়ার পর শুধু সর্বোচ্চ-ধারী পাশে বাইনারি সার্চ, সবসময় s-এ শেষ হওয়া পরিসর জিজ্ঞেস করে।'),
      explain: [
        L('A range [x, s] has second largest s exactly when the maximum is in [x, s − 1]. So one question per step decides a threshold on the left side, and (s, y) does the same on the right. This costs 1 + 1 + ⌈log₂ n⌉ ≤ 19, which is the solution that also passes the 20-question hard version.', '[x, s] পরিসরের দ্বিতীয় বৃহত্তম s হয় ঠিক তখনই যখন সর্বোচ্চ [x, s − ১]-এ। তাই ধাপে এক প্রশ্নে বাম পাশের একটি সীমা ঠিক হয়, ডান পাশে (s, y) একই কাজ করে। খরচ ১ + ১ + ⌈log₂ n⌉ ≤ ১৯, এটিই ২০-প্রশ্নের কঠিন সংস্করণেও পাস করে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int l, int r) {
    cout << "? " << l << " " << r << endl;
    int p;
    cin >> p;
    return p;
}

int main() {
    int n;
    cin >> n;
    int s = ask(1, n);
    bool left = s > 1 && ask(1, s) == s;  // is the maximum to the left of s?
    int lo, hi;
    if (left) {
        // maximum in [lo, s - 1]; find the largest x with ask(x, s) == s
        lo = 1;
        hi = s - 1;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (ask(mid, s) == s) lo = mid;
            else hi = mid - 1;
        }
        cout << "! " << lo << endl;
    } else {
        // maximum in [s + 1, n]; find the smallest y with ask(s, y) == s
        lo = s + 1;
        hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ask(s, mid) == s) hi = mid;
            else lo = mid + 1;
        }
        cout << "! " << lo << endl;
    }
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Tournament over neighbours: n − 1 questions', 'প্রতিবেশীদের টুর্নামেন্ট: n − ১ প্রশ্ন'),
      idea: L('A question on two cells returns the smaller one, so the larger survives; scan once.', 'দুটি ঘরের প্রশ্ন ছোটটি ফেরত দেয়, তাই বড়টি বেঁচে যায়; একবার স্ক্যান করো।'),
      explain: [L('Keep the best position so far and ask (best, i): the answer is the smaller of the two, so the other is the new best. Perfectly correct, but it needs n − 1 questions, hopeless against a budget of 40.', 'এ পর্যন্ত সেরা অবস্থান রাখো আর (best, i) জিজ্ঞেস করো: উত্তর দুটির ছোটটি, তাই অন্যটি নতুন সেরা। সম্পূর্ণ ঠিক, কিন্তু n − ১ প্রশ্ন লাগে, ৪০-এর বাজেটে অসম্ভব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int best = 1;
    for (int i = 2; i <= n; i++) {
        int l = min(best, i), r = max(best, i);
        cout << "? " << l << " " << r << endl;
        int smaller;
        cin >> smaller;
        best = smaller == best ? i : best;
    }
    cout << "! " << best << endl;
}
`,
      time: 'n − 1 questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: 'OK', source: 'own', note: L('The smallest n: one question, or none.', 'সবচেয়ে ছোট n: একটি প্রশ্ন, বা একটিও নয়।') },
    { input: '2\n2 1', output: 'OK', source: 'own', note: L('The maximum first.', 'সর্বোচ্চ আগে।') },
    { input: '6\n6 5 4 3 2 1', output: 'OK', source: 'own', note: L('Maximum at the left end.', 'সর্বোচ্চ বাম প্রান্তে।') },
    { input: '7\n1 2 3 4 5 6 7', output: 'OK', source: 'own', note: L('Maximum at the right end.', 'সর্বোচ্চ ডান প্রান্তে।') },
    { input: '8\n3 8 1 5 7 2 4 6', output: 'OK', source: 'own', note: L('Second largest is to the right of the maximum.', 'দ্বিতীয় বৃহত্তম সর্বোচ্চের ডানে।') },
  ],
  pitfalls: [
    L('Asking a range with l = r: the judge requires l < r. Handle length-one ranges without a question.', 'l = r পরিসর জিজ্ঞেস করা: জাজের শর্ত l < r। দৈর্ঘ্য এক পরিসর প্রশ্ন ছাড়াই সামলাও।'),
    L('Mixing up which side the maximum is on: it is on the side of s where the question returns s again.', 'সর্বোচ্চ কোন পাশে তা গুলিয়ে ফেলা: s-এর যে পাশের প্রশ্ন আবার s ফেরত দেয়, সেটিই।'),
    L('Integer division when the midpoint is rounded for the left search: use (lo + hi + 1) / 2 when moving lo up.', 'বাঁ-সার্চে মধ্যবিন্দু রাউন্ডিং: lo বাড়ানোর সময় (lo + hi + ১) / ২ নাও।'),
  ],
  related: [
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Same oracle, only 20 questions.', 'একই ওরাকল, মাত্র ২০ প্রশ্ন।') },
    { id: '1103B', name: 'Game with modulo', why: L('Binary search through a comparison oracle.', 'তুলনা-ওরাকল দিয়ে বাইনারি সার্চ।') },
  ],
  toolkit: ['io-basics'],
};

// ───────────────────────────────────────────── 1486C2
export const p1486C2: ProblemEntry = {
  id: '1486C2',
  contestId: 1486,
  index: 'C2',
  name: 'Guessing the Greatest (hard version)',
  rating: 1900,
  interactive: true,
  tags: ['binary-search', 'interactive'],
  why: L(
    'The same oracle with half the budget. Squeezing the question count from 35 to 19 means finding one anchor (the second largest) and asking every later question against it.',
    'একই ওরাকল, বাজেট অর্ধেক। প্রশ্ন ৩৫ থেকে ১৯-এ আনতে একটি নোঙর (দ্বিতীয় বৃহত্তম) বের করে পরের সব প্রশ্ন তার বিরুদ্ধে করতে হয়।',
  ),
  statement: L(
    'Exactly as the easy version, but you may ask at most 20 questions: the judge hides a permutation of 1 … n; "? l r" (l < r) returns the position of the second largest in a_l … a_r; print the position of n as "! p".',
    'সহজ সংস্করণের মতোই, কিন্তু সর্বোচ্চ ২০টি প্রশ্ন: জাজ ১ … n-এর একটি পারমুটেশন লুকিয়েছে; "? l r" (l < r) a_l … a_r-এর দ্বিতীয় বৃহত্তমের অবস্থান দেয়; n-এর অবস্থান "! p" হিসেবে প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, one integer: a position.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: একটি অবস্থান।'),
  output: L('Questions "? l r", then "! p". Flush after every line.', 'প্রশ্ন "? l r", শেষে "! p"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, at most 20 questions', '২ ≤ n ≤ ১০⁵, সর্বোচ্চ ২০ প্রশ্ন')] },
  samples: [
    {
      input: '5\n2 5 1 4 3',
      output: 'OK',
      transcript: '< 5\n> ? 1 5\n< 4\n> ? 1 4\n< 4\n> ? 1 2\n< 1\n> ! 2',
      explain: L('Same hidden array as the easy version. Three questions here; the bound for n = 10⁵ is 19. ' + made.en, 'সহজ সংস্করণের একই লুকানো অ্যারে। এখানে তিনটি প্রশ্ন; n = ১০⁵-এ সীমা ১৯। ' + made.bn),
    },
  ],
  observation: L(
    'Two facts are enough. (1) One question on the whole array gives s, the second largest. (2) A range that ends at s, [x, s], returns s as second largest exactly when the maximum is in [x, s − 1]: that is a monotone yes/no in x, so it can be binary searched with one question per step. The mirror image works on the right. The total is 1 + 1 + ⌈log₂ n⌉ ≤ 19.',
    'দুটি তথ্যই যথেষ্ট। (১) পুরো অ্যারেতে একটি প্রশ্নে দ্বিতীয় বৃহত্তম s। (২) s-এ শেষ হওয়া পরিসর [x, s] দ্বিতীয় বৃহত্তম s ফেরত দেয় ঠিক তখনই যখন সর্বোচ্চ [x, s − ১]-এ: এটি x-এর একটি একঘাত হ্যাঁ/না, তাই ধাপে এক প্রশ্নে বাইনারি সার্চ। ডানে আয়না-প্রতিচ্ছবি। মোট ১ + ১ + ⌈log₂ n⌉ ≤ ১৯।',
  ),
  approach: [
    L('Ask (1, n) to get s.', '(১, n) জিজ্ঞেস করে s পাও।'),
    L('Decide the side: if s > 1 ask (1, s). If the answer is s the maximum is left of s, otherwise it is right.', 'পাশ ঠিক করো: s > ১ হলে (১, s) জিজ্ঞেস করো। উত্তর s হলে সর্বোচ্চ s-এর বাঁয়ে, নয়তো ডানে।'),
    L('Left side: binary search for the largest x with ask(x, s) = s. Right side: the smallest y with ask(s, y) = s.', 'বাঁ পাশে: ask(x, s) = s হয় এমন সবচেয়ে বড় x বাইনারি সার্চে। ডান পাশে: ask(s, y) = s হয় এমন সবচেয়ে ছোট y।'),
    L('The found x or y is the position of n.', 'পাওয়া x বা y-ই n-এর অবস্থান।'),
  ],
  walkthrough: {
    input: '5\n2 5 1 4 3',
    steps: [
      { state: '(1, 5) → s = 4', text: L('The second largest overall is at position 4.', 'সামগ্রিক দ্বিতীয় বৃহত্তম ৪ নম্বরে।') },
      { state: '(1, 4) → 4 = s', text: L('Still s, so the maximum is in [1, 3].', 'এখনও s, তাই সর্বোচ্চ [১, ৩]-এ।') },
      { state: 'search x in [1, 3]: (2, 4) → 4 = s', text: L('The maximum is in [2, 3]; move the lower end up to 2.', 'সর্বোচ্চ [২, ৩]-এ; নিচের সীমা ২-এ।') },
      { state: 'x = 3: (3, 4) → 3 ≠ s', text: L('The maximum is not in [3, 3], so it is at 2.', 'সর্বোচ্চ [৩, ৩]-এ নেই, তাই ২ নম্বরে।') },
    ],
  },
  complexity: { time: 'O(log n) questions', space: 'O(1)', why: L('1 + 1 + ⌈log₂(10⁵)⌉ = 19.', '১ + ১ + ⌈log₂(১০⁵)⌉ = ১৯।') },
  solutions: [
    {
      id: 'side',
      kind: 'optimal',
      title: L('Anchor on s and binary search one side', 's-কে নোঙর করে এক পাশে বাইনারি সার্চ'),
      idea: L('One question per step: ranges that end at s.', 'ধাপে এক প্রশ্ন: s-এ শেষ হওয়া পরিসর।'),
      explain: [L('The answer to a question never needs a new second largest because every question contains s. That is the whole saving over the easy version.', 'প্রতিটি প্রশ্নে s আছে বলে নতুন দ্বিতীয় বৃহত্তম দরকার হয় না। সহজ সংস্করণের তুলনায় পুরো সাশ্রয় এখানেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int l, int r) {
    cout << "? " << l << " " << r << endl;
    int p;
    cin >> p;
    return p;
}

int main() {
    int n;
    cin >> n;
    int s = ask(1, n);
    bool left = s > 1 && ask(1, s) == s;
    if (left) {
        int lo = 1, hi = s - 1;
        while (lo < hi) {
            int mid = (lo + hi + 1) / 2;
            if (ask(mid, s) == s) lo = mid;
            else hi = mid - 1;
        }
        cout << "! " << lo << endl;
    } else {
        int lo = s + 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ask(s, mid) == s) hi = mid;
            else lo = mid + 1;
        }
        cout << "! " << lo << endl;
    }
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'half',
      kind: 'method',
      title: L('Plain halving (2 questions per step, 35 in all)', 'সাদামাটা অর্ধেক করা (ধাপে ২ প্রশ্ন, মোট ৩৫)'),
      idea: L('Correct, and enough for the easy version, but it overshoots 20.', 'ঠিক, আর সহজ সংস্করণের জন্য যথেষ্ট, কিন্তু ২০ ছাড়ায়।'),
      explain: [L('Keep a range with its second largest, ask the half that contains s, and refresh the second largest when the maximum moves to the other half. Each halving may cost two questions, so for n = 10⁵ it can reach 35. The point of keeping it here is to see exactly where the extra questions come from.', 'দ্বিতীয় বৃহত্তমসহ একটি পরিসর রাখো, s যে অর্ধেকে সেটি জিজ্ঞেস করো, আর সর্বোচ্চ অন্য অর্ধেকে গেলে দ্বিতীয় বৃহত্তম নতুন করে নাও। প্রতি অর্ধেকে দুই প্রশ্ন লাগতে পারে, n = ১০⁵-এ ৩৫ পর্যন্ত। এখানে রাখার কারণ বাড়তি প্রশ্নগুলো ঠিক কোথা থেকে আসে তা দেখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int l, int r) {
    cout << "? " << l << " " << r << endl;
    int p;
    cin >> p;
    return p;
}

int main() {
    int n;
    cin >> n;
    int l = 1, r = n;
    int s = ask(l, r);
    while (l < r) {
        int m = (l + r) / 2;
        if (s <= m) {
            if (l < m && ask(l, m) == s) {
                r = m;
            } else {
                l = m + 1;
                if (l < r) s = ask(l, r);
            }
        } else {
            if (m + 1 < r && ask(m + 1, r) == s) {
                l = m + 1;
            } else {
                r = m;
                if (l < r) s = ask(l, r);
            }
        }
    }
    cout << "! " << l << endl;
}
`,
      time: 'O(log n) questions, up to 35',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Tournament over neighbours: n − 1 questions', 'প্রতিবেশীদের টুর্নামেন্ট: n − ১ প্রশ্ন'),
      idea: L('A question on two cells returns the smaller one.', 'দুটি ঘরের প্রশ্ন ছোটটি ফেরত দেয়।'),
      explain: [L('The same linear scan as in the easy version, kept as a reference to compare against on small inputs.', 'সহজ সংস্করণের মতোই রৈখিক স্ক্যান, ছোট ইনপুটে তুলনার রেফারেন্স হিসেবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int best = 1;
    for (int i = 2; i <= n; i++) {
        int l = min(best, i), r = max(best, i);
        cout << "? " << l << " " << r << endl;
        int smaller;
        cin >> smaller;
        best = smaller == best ? i : best;
    }
    cout << "! " << best << endl;
}
`,
      time: 'n − 1 questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: 'OK', source: 'own', note: L('The smallest n.', 'সবচেয়ে ছোট n।') },
    { input: '3\n3 1 2', output: 'OK', source: 'own', note: L('Maximum at the left end, second largest at the right.', 'সর্বোচ্চ বাম প্রান্তে, দ্বিতীয় বৃহত্তম ডান প্রান্তে।') },
    { input: '10\n1 2 3 4 5 6 7 8 9 10', output: 'OK', source: 'own', note: L('Sorted: the maximum is at the right end.', 'ক্রমানুসারে: সর্বোচ্চ ডান প্রান্তে।') },
    { input: '10\n10 9 8 7 6 5 4 3 2 1', output: 'OK', source: 'own', note: L('Reverse sorted.', 'উল্টো ক্রম।') },
  ],
  pitfalls: [
    L('Using the 40-question solution: it passes the easy version and fails here for n close to 10⁵.', '৪০-প্রশ্নের সমাধান ব্যবহার: সহজ সংস্করণে পাস করে, n ≈ ১০⁵-এ এখানে ফেল।'),
    L('Forgetting that the side test needs one question: it is "(1, s) → s?" for the left and the absence of that for the right.', 'পাশ যাচাইয়ে এক প্রশ্ন লাগে তা ভুলে যাওয়া: বামে "(১, s) → s?", ডানে তার অনুপস্থিতি।'),
    L('Wrong midpoint rounding in the left search: with hi = mid − 1 you need the upper midpoint or the loop never ends.', 'বাঁ-সার্চে ভুল মধ্যবিন্দু রাউন্ডিং: hi = mid − ১ হলে ওপরের মধ্যবিন্দু লাগে, নয়তো লুপ থামে না।'),
  ],
  related: [
    { id: '1486C1', name: 'Guessing the Greatest (easy version)', why: L('The same oracle with a budget of 40.', '৪০ প্রশ্নের বাজেটে একই ওরাকল।') },
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Another binary search where one count answers a yes/no.', 'আরেকটি বাইনারি সার্চ যেখানে একটি গণনা হ্যাঁ/না-র উত্তর দেয়।') },
  ],
  toolkit: ['io-basics'],
};
