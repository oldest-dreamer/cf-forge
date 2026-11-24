import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p1370A: ProblemEntry = {
  id: '1370A',
  contestId: 1370,
  index: 'A',
  name: 'Maximum GCD',
  rating: 800,
  tags: ['greedy', 'implementation', 'math', 'number-theory'],
  why: L('The best gcd of two numbers ≤ n comes from the pair (g, 2g).', 'n পর্যন্ত দুটি সংখ্যার সেরা gcd আসে (g, ২g) জোড়া থেকে।'),
  statement: L('Among all pairs of distinct integers a < b in 1..n, find the maximum value of gcd(a, b). There are t test cases.', '১..n-এ আলাদা পূর্ণসংখ্যার সব জোড়া a < b-এর মধ্যে gcd(a, b)-এর সর্বোচ্চ মান বের করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('The maximum gcd.', 'সর্বোচ্চ gcd।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁶', '২ ≤ n ≤ ১০⁶')] },
  samples: [{ input: '2\n3\n5', output: '1\n2', explain: L('n = 5: gcd(2, 4) = 2.', 'n = ৫: gcd(২, ৪) = ২।') }],
  observation: L('If gcd(a, b) = g with a < b, then b ≥ 2g, so g ≤ n / 2. The pair (⌊n/2⌋, 2⌊n/2⌋) achieves it.', 'a < b আর gcd(a, b) = g হলে b ≥ ২g, তাই g ≤ n / ২। (⌊n/২⌋, ২⌊n/২⌋) জোড়া তা অর্জন করে।'),
  approach: [L('Print n / 2.', 'n / ২ প্রিন্ট করুন।')],
  walkthrough: { input: '5', steps: [{ state: '5 / 2 = 2', text: L('Pair (2, 4).', 'জোড়া (২, ৪)।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A division.', 'একটি ভাগ।') },
  solutions: [
    {
      id: 'half',
      kind: 'optimal',
      title: L('Answer n / 2', 'উত্তর n / ২'),
      idea: L('Both numbers are multiples of g and distinct, so the larger is at least 2g.', 'দুটি সংখ্যাই g-এর গুণিতক আর আলাদা, তাই বড়টি অন্তত ২g।'),
      explain: [L('An upper bound plus a matching example is a complete proof, the usual shape of “maximum value” math problems.', 'একটি ঊর্ধ্বসীমা আর তার সঙ্গে মেলা একটি উদাহরণই সম্পূর্ণ প্রমাণ, “সর্বোচ্চ মান” গণিত প্রবলেমের সাধারণ আকার।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << n / 2 << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs (small n)', 'সব জোড়া (ছোট n)'),
      idea: L('Try every pair with std::gcd.', 'std::gcd দিয়ে প্রতিটি জোড়া চেষ্টা।'),
      explain: [L('O(n²) pairs confirm the formula on small n.', 'O(n²) জোড়া ছোট n-এ সূত্রটি নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n > 3000) { cout << "\n"; continue; }   // too slow beyond this
        int best = 0;
        for (int a = 1; a <= n; a++)
            for (int b = a + 1; b <= n; b++) best = max(best, gcd(a, b));
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n² log n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['gcd-lcm'],
    },
  ],
  tests: [
    { input: '2\n3\n5', output: '1\n2', source: 'sample', note: sample(1) },
    { input: '2\n2\n1000000', output: '1\n500000', source: 'own', note: L('Smallest and largest n.', 'সবচেয়ে ছোট আর বড় n।') },
  ],
  pitfalls: [L('Brute force over pairs for n = 10⁶.', 'n = ১০⁶-এ জোড়ার ওপর ব্রুট ফোর্স।')],
  related: [{ id: '1325A', name: 'EhAb AnD gCd', why: L('More gcd reasoning.', 'আরও gcd যুক্তি।') }],
  toolkit: ['io-basics'],
};

export const p1325A: ProblemEntry = {
  id: '1325A',
  contestId: 1325,
  index: 'A',
  name: 'EhAb AnD gCd',
  rating: 800,
  tags: ['constructive', 'greedy', 'number-theory'],
  why: L('A one-line construction: a = 1 makes both gcd and lcm trivial.', 'এক লাইনের গঠন: a = ১ হলে gcd আর lcm দুটোই তুচ্ছ।'),
  statement: L('Given x, find positive integers a and b with gcd(a, b) + lcm(a, b) = x. Any valid pair is accepted. There are t test cases.', 'x দেওয়া আছে; ধনাত্মক পূর্ণসংখ্যা a আর b বের করুন যাতে gcd(a, b) + lcm(a, b) = x। যেকোনো বৈধ জোড়া গ্রহণযোগ্য। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has x (2 ≤ x ≤ 10⁹).', 't; প্রতিটি টেস্টে x (২ ≤ x ≤ ১০⁹)।'),
  output: L('a and b.', 'a আর b।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [anyAnswer] },
  samples: [{ input: '2\n2\n14', output: '1 1\n6 4', explain: L('gcd(6, 4) + lcm(6, 4) = 2 + 12. Our answer 1 13 is also correct.', 'gcd(৬, ৪) + lcm(৬, ৪) = ২ + ১২। আমাদের উত্তর ১ ১৩-ও সঠিক।') }],
  observation: L('With a = 1: gcd(1, b) = 1 and lcm(1, b) = b, so b = x − 1 works for every x ≥ 2.', 'a = ১ হলে gcd(১, b) = ১ আর lcm(১, b) = b, তাই প্রতিটি x ≥ ২-এর জন্য b = x − ১ চলে।'),
  approach: [L('Print 1 and x − 1.', '১ আর x − ১ প্রিন্ট করুন।')],
  walkthrough: { input: '14', steps: [{ state: '1 + 13 = 14', text: L('Print 1 13.', '১ ১৩ প্রিন্ট।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Constant.', 'স্থির।') },
  solutions: [
    {
      id: 'one',
      kind: 'optimal',
      title: L('a = 1, b = x − 1', 'a = ১, b = x − ১'),
      idea: L('1 is coprime to everything.', '১ সবকিছুর সঙ্গে সহমৌলিক।'),
      explain: [L('In constructive problems, try the most extreme simple value first (0, 1, n, all equal). It often satisfies everything immediately.', 'কনস্ট্রাক্টিভ প্রবলেমে আগে সবচেয়ে চরম সরল মান চেষ্টা করুন (০, ১, n, সব সমান)। প্রায়ই এটি সঙ্গে সঙ্গে সব মেনে নেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x;
        cin >> x;
        cout << 1 << " " << x - 1 << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'even',
      kind: 'alt',
      title: L('Use a common factor', 'একটি সাধারণ উৎপাদক ব্যবহার'),
      idea: L('For even x, a = b = x / 2 gives x/2 + x/2; for odd x fall back to 1 and x − 1.', 'জোড় x-এ a = b = x / ২ দেয় x/২ + x/২; বিজোড় x-এ ১ আর x − ১-এ ফিরুন।'),
      explain: [L('A second valid construction, to show that the checker accepts any correct pair: equal numbers have gcd = lcm = the number itself.', 'দ্বিতীয় একটি বৈধ গঠন, দেখাতে যে চেকার যেকোনো সঠিক জোড়া গ্রহণ করে: সমান সংখ্যার gcd = lcm = সংখ্যাটি নিজেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x;
        cin >> x;
        if (x % 2 == 0) cout << x / 2 << " " << x / 2 << "\n";
        else cout << 1 << " " << x - 1 << "\n";
    }
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
    { input: '2\n2\n14', output: '1 1\n6 4', source: 'sample', note: sample(1) },
    { input: '1\n1000000000', output: '1 999999999', source: 'own', note: L('The largest x.', 'সবচেয়ে বড় x।') },
  ],
  pitfalls: [L('Searching for a pair by brute force up to 10⁹.', '১০⁹ পর্যন্ত ব্রুট ফোর্সে জোড়া খোঁজা।')],
  related: [{ id: '1617B', name: 'GCD Problem', why: L('Another gcd construction.', 'আরেকটি gcd গঠন।') }],
  toolkit: ['io-basics'],
};

export const p1360D: ProblemEntry = {
  id: '1360D',
  contestId: 1360,
  index: 'D',
  name: 'Buying Shovels',
  rating: 1300,
  tags: ['math', 'number-theory'],
  featuredFor: ['number-theory'],
  why: L('Find the largest divisor of n not exceeding k in O(√n).', 'O(√n)-এ k-এর বেশি নয় এমন n-এর সবচেয়ে বড় ভাজক খোঁজা।'),
  statement: L('Polycarp needs exactly n shovels. The shop sells packages of 1, 2, …, k shovels, but he must buy several packages of one single size. What is the minimum number of packages? There are t test cases.', 'পলিকার্পের ঠিক n-টি বেলচা দরকার। দোকানে ১, ২, …, k বেলচার প্যাকেট বিক্রি হয়, কিন্তু তাকে একটি মাত্র আকারের কয়েকটি প্যাকেট কিনতে হবে। সর্বনিম্ন কয়টি প্যাকেট? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and k.', 't; প্রতিটি টেস্টে n আর k।'),
  output: L('The minimum number of packages.', 'সর্বনিম্ন প্যাকেটের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, k ≤ 10⁹, t ≤ 100', '১ ≤ n, k ≤ ১০⁹, t ≤ ১০০')] },
  samples: [{ input: '5\n8 7\n8 1\n6 10\n999999733 999999732\n999999733 999999733', output: '2\n8\n1\n999999733\n1', explain: L('8 7: packages of 4, two of them.', '৮ ৭: ৪-এর প্যাকেট, দুটি।') }],
  observation: L('The package size d must divide n, and the count is n / d. So take the largest divisor d of n with d ≤ k. Divisors come in pairs (d, n/d), so scan d up to √n.', 'প্যাকেটের আকার d-কে n ভাগ করতে হবে, আর সংখ্যা n / d। তাই d ≤ k এমন n-এর সবচেয়ে বড় ভাজক d নিন। ভাজক (d, n/d) জোড়ায় আসে, তাই √n পর্যন্ত d দেখুন।'),
  approach: [L('For each divisor pair (d, n/d), keep the largest one that is ≤ k.', 'প্রতিটি ভাজক জোড়া (d, n/d)-এর মধ্যে ≤ k এমন সবচেয়ে বড়টি রাখুন।')],
  walkthrough: { input: '8 7', steps: [{ state: 'pairs (1,8), (2,4)', text: L('Largest ≤ 7 is 4: 8 / 4 = 2.', '≤ ৭ সবচেয়ে বড় ৪: ৮ / ৪ = ২।') }] },
  complexity: { time: 'O(√n) per test', space: 'O(1)', why: L('Trial division.', 'ভাগ করে দেখা।') },
  solutions: [
    {
      id: 'pairs',
      kind: 'optimal',
      title: L('Divisor pairs up to √n', '√n পর্যন্ত ভাজক জোড়া'),
      idea: L('Check both d and n / d against k.', 'd আর n / d দুটিকেই k-এর সঙ্গে মেলান।'),
      explain: [L('Checking only d ≤ √n would miss large divisors like n itself (sample 5). Each d found gives its partner n / d for free.', 'শুধু d ≤ √n দেখলে n নিজের মতো বড় ভাজক বাদ পড়ত (স্যাম্পল ৫)। পাওয়া প্রতিটি d তার সঙ্গী n / d বিনামূল্যে দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long best = 1;
        for (long long d = 1; d * d <= n; d++) {
            if (n % d) continue;
            if (d <= k) best = max(best, d);
            if (n / d <= k) best = max(best, n / d);
        }
        cout << n / best << "\n";
    }
    return 0;
}
`,
      time: 'O(√n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every size from k down', 'k থেকে নিচে প্রতিটি আকার চেষ্টা'),
      idea: L('The first d ≤ k dividing n, counting down, is the answer’s size.', 'নিচে গুনতে গুনতে n-কে ভাগ করা প্রথম d ≤ k-ই উত্তরের আকার।'),
      explain: [L('O(k) per test can reach 10⁹; it is the reference for small inputs.', 'প্রতি টেস্টে O(k) ১০⁹ পর্যন্ত যেতে পারে; এটি ছোট ইনপুটের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        if (min(n, k) > 10000000) { cout << "\n"; continue; }   // too slow beyond this
        for (long long d = min(n, k); d >= 1; d--)
            if (n % d == 0) { cout << n / d << "\n"; break; }
    }
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '5\n8 7\n8 1\n6 10\n999999733 999999732\n999999733 999999733', output: '2\n8\n1\n999999733\n1', source: 'sample', note: sample(1) },
    { input: '1\n12 5', output: '3', source: 'own', note: L('Size 4.', 'আকার ৪।') },
  ],
  pitfalls: [L('Only checking divisors up to √n and missing n / d.', 'শুধু √n পর্যন্ত ভাজক দেখে n / d বাদ দেওয়া।')],
  related: [{ id: '762A', name: 'k-th divisor', why: L('Divisor pairs again.', 'আবার ভাজক জোড়া।') }],
  toolkit: ['long-long'],
};

export const p1617B: ProblemEntry = {
  id: '1617B',
  contestId: 1617,
  index: 'B',
  name: 'GCD Problem',
  rating: 900,
  tags: ['brute-force', 'constructive', 'math', 'number-theory'],
  featuredFor: ['constructive'],
  why: L('Fix c = 1 and search a coprime pair with a small brute force.', 'c = ১ স্থির করে ছোট ব্রুট ফোর্সে একটি সহমৌলিক জোড়া খোঁজা।'),
  statement: L('Given n ≥ 10, find distinct positive integers a, b, c with a + b + c = n and gcd(a, b) = c. Any valid triple is accepted. There are t test cases.', 'n ≥ ১০ দেওয়া আছে; আলাদা ধনাত্মক পূর্ণসংখ্যা a, b, c বের করুন যাতে a + b + c = n আর gcd(a, b) = c। যেকোনো বৈধ ত্রয়ী গ্রহণযোগ্য। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('a, b, c.', 'a, b, c।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('10 ≤ n ≤ 10⁹', '১০ ≤ n ≤ ১০⁹'), anyAnswer] },
  samples: [{ input: '6\n18\n63\n73\n91\n438\n122690412', output: '6 9 3\n21 39 3\n29 43 1\n49 35 7\n146 219 73\n28622 122661788 2', explain: L('gcd(6, 9) = 3 and 6 + 9 + 3 = 18.', 'gcd(৬, ৯) = ৩ আর ৬ + ৯ + ৩ = ১৮।') }],
  observation: L('Take c = 1. Then a + b = n − 1 with gcd(a, b) = 1. Since gcd(a, b) = gcd(a, n − 1), try a = 2, 3, 4, … until gcd(a, n − 1) = 1; coprime values are dense, so this stops quickly.', 'c = ১ নিন। তখন a + b = n − ১ আর gcd(a, b) = ১। gcd(a, b) = gcd(a, n − ১) হওয়ায় gcd(a, n − ১) = ১ না হওয়া পর্যন্ত a = ২, ৩, ৪, … চেষ্টা করুন; সহমৌলিক মান ঘন, তাই দ্রুত থামে।'),
  approach: [L('c = 1; smallest a ≥ 2 with gcd(a, n − 1) = 1 and b = n − 1 − a distinct from a and 1.', 'c = ১; gcd(a, n − ১) = ১ এমন সবচেয়ে ছোট a ≥ ২, আর b = n − ১ − a, a ও ১ থেকে আলাদা।')],
  walkthrough: { input: '18', steps: [{ state: 'n − 1 = 17; a = 2', text: L('2, 15, 1.', '২, ১৫, ১।') }] },
  complexity: { time: 'O(log n · tries)', space: 'O(1)', why: L('A few gcd calls.', 'কয়েকটি gcd কল।') },
  solutions: [
    {
      id: 'c1',
      kind: 'optimal',
      title: L('c = 1 and a small coprime a', 'c = ১ আর একটি ছোট সহমৌলিক a'),
      idea: L('Search a from 2.', '২ থেকে a খুঁজুন।'),
      explain: [L('For n − 1 even, a = 2 fails, but some odd small prime not dividing n − 1 exists within a few tries, because n − 1 has at most 9 distinct prime factors below 10⁹.', 'n − ১ জোড় হলে a = ২ ব্যর্থ, কিন্তু কয়েকটি চেষ্টার মধ্যেই n − ১-কে ভাগ করে না এমন একটি ছোট বিজোড় মৌলিক থাকে, কারণ ১০⁹-এর নিচে n − ১-এর সর্বোচ্চ ৯টি ভিন্ন মৌলিক উৎপাদক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        long long s = n - 1;
        for (long long a = 2;; a++) {
            long long b = s - a;
            if (b != a && b > 1 && gcd(a, b) == 1) {
                cout << a << " " << b << " " << 1 << "\n";
                break;
            }
        }
    }
    return 0;
}
`,
      time: 'O(tries · log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['gcd-lcm', 'break-continue'],
    },
    {
      id: 'parity',
      kind: 'method',
      title: L('Case on parity', 'জোড়-বিজোড়ে কেস'),
      idea: L('n even: (2, n − 3, 1). n odd: pick a near (n − 1)/2 that is odd-spaced so a and b are coprime.', 'n জোড়: (২, n − ৩, ১)। n বিজোড়: (n − ১)/২-এর কাছে এমন a বাছুন যাতে a আর b সহমৌলিক।'),
      explain: [L('n even: n − 3 is odd, so gcd(2, n − 3) = 1. n odd: write n − 1 = 2m; if m is even take m − 1 and m + 1 (two odd numbers differing by 2, hence coprime); if m is odd take m − 2 and m + 2 (odd numbers differing by 4, also coprime).', 'n জোড়: n − ৩ বিজোড়, তাই gcd(২, n − ৩) = ১। n বিজোড়: n − ১ = ২m লিখুন; m জোড় হলে m − ১ আর m + ১ নিন (২ পার্থক্যের দুটি বিজোড়, তাই সহমৌলিক); m বিজোড় হলে m − ২ আর m + ২ নিন (৪ পার্থক্যের বিজোড়, এটিও সহমৌলিক)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        if (n % 2 == 0) {
            cout << 2 << " " << n - 3 << " " << 1 << "\n";
        } else {
            long long m = (n - 1) / 2;
            if (m % 2 == 0) cout << m - 1 << " " << m + 1 << " " << 1 << "\n";
            else cout << m - 2 << " " << m + 2 << " " << 1 << "\n";
        }
    }
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
    { input: '6\n18\n63\n73\n91\n438\n122690412', output: '6 9 3\n21 39 3\n29 43 1\n49 35 7\n146 219 73\n28622 122661788 2', source: 'sample', note: sample(1) },
    { input: '2\n10\n11', output: '2 7 1\n3 7 1', source: 'own', note: L('The smallest n.', 'সবচেয়ে ছোট n।') },
  ],
  pitfalls: [L('Forgetting that a, b, c must be distinct (a = b fails for c = 1 unless a = b = 1).', 'ভুলে যাওয়া যে a, b, c আলাদা হতে হবে।')],
  related: [{ id: '1325A', name: 'EhAb AnD gCd', why: L('Constructions with gcd.', 'gcd দিয়ে গঠন।') }],
  toolkit: ['gcd-lcm'],
};

export const p1514A: ProblemEntry = {
  id: '1514A',
  contestId: 1514,
  index: 'A',
  name: 'Perfectly Imperfect Array',
  rating: 800,
  tags: ['math', 'number-theory'],
  why: L('A product is a perfect square iff every factor works out; one non-square element is enough.', 'একটি গুণফল পূর্ণবর্গ কি না তা উৎপাদকের ওপর নির্ভর করে; একটি অ-বর্গ উপাদানই যথেষ্ট।'),
  statement: L('Does the array a have a non-empty subsequence whose product is not a perfect square? Print YES or NO for each of t test cases.', 'অ্যারে a-এর কি এমন খালি নয় সাবসিকোয়েন্স আছে যার গুণফল পূর্ণবর্গ নয়? t-টি টেস্ট কেসের প্রতিটিতে YES বা NO প্রিন্ট করুন।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('aᵢ ≤ 10⁴, n ≤ 100', 'aᵢ ≤ ১০⁴, n ≤ ১০০')] },
  samples: [{ input: '2\n3\n1 5 4\n2\n100 10000', output: 'YES\nNO', explain: L('5 alone is not a square.', 'শুধু ৫ বর্গ নয়।') }],
  observation: L('If some element is not a perfect square, the subsequence of just that element works. If every element is a square, every product of them is a square too.', 'কোনো উপাদান পূর্ণবর্গ না হলে শুধু সেই উপাদানের সাবসিকোয়েন্সই চলে। প্রতিটি উপাদান বর্গ হলে তাদের প্রতিটি গুণফলও বর্গ।'),
  approach: [L('YES iff some aᵢ is not a perfect square.', 'কোনো aᵢ পূর্ণবর্গ না হলেই YES।')],
  walkthrough: { input: '100 10000', steps: [{ state: '10², 100²', text: L('All squares: NO.', 'সব বর্গ: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One check per element.', 'প্রতি উপাদানে একটি যাচাই।') },
  solutions: [
    {
      id: 'sqrt',
      kind: 'optimal',
      title: L('Integer square root test', 'পূর্ণসংখ্যার বর্গমূল পরীক্ষা'),
      idea: L('r = round(√a); square iff r · r == a.', 'r = round(√a); r · r == a হলেই বর্গ।'),
      explain: [L('Rounding before squaring protects against floating-point error; for values up to 10⁴ it is exact anyway.', 'বর্গ করার আগে রাউন্ড করলে ভাসমান-বিন্দুর ত্রুটি থেকে রক্ষা হয়; ১০⁴ পর্যন্ত মানে এটি এমনিতেই নিখুঁত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        bool ok = false;
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            int r = lround(sqrt((double)a));
            if (r * r != a) ok = true;
        }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'table',
      kind: 'method',
      title: L('Table of squares', 'বর্গের টেবিল'),
      idea: L('Mark k² for k = 1..100, then look each element up.', 'k = ১..১০০-এর জন্য k² চিহ্নিত করে প্রতিটি উপাদান খুঁজুন।'),
      explain: [L('With values ≤ 10⁴ only 100 squares exist, so a boolean table avoids floating point entirely.', '≤ ১০⁴ মানে মাত্র ১০০টি বর্গ, তাই একটি বুলিয়ান টেবিল ভাসমান-বিন্দু পুরোপুরি এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<bool> isSq(10001, false);
    for (int k = 1; k * k <= 10000; k++) isSq[k * k] = true;
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        bool ok = false;
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            if (!isSq[a]) ok = true;
        }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '2\n3\n1 5 4\n2\n100 10000', output: 'YES\nNO', source: 'sample', note: sample(1) },
    { input: '1\n1\n1', output: 'NO', source: 'own', note: L('1 is a perfect square.', '১ একটি পূর্ণবর্গ।') },
  ],
  pitfalls: [L('Overthinking subsequence products.', 'সাবসিকোয়েন্সের গুণফল নিয়ে বেশি ভাবা।')],
  related: [{ id: '230B', name: 'T-primes', why: L('Perfect squares and divisors.', 'পূর্ণবর্গ আর ভাজক।') }],
  toolkit: ['io-basics'],
};

export const p762A: ProblemEntry = {
  id: '762A',
  contestId: 762,
  index: 'A',
  name: 'k-th divisor',
  rating: 1400,
  tags: ['math', 'number-theory'],
  why: L('List divisors in order with two lists from a √n scan.', '√n স্ক্যানের দুটি তালিকা থেকে ক্রমে ভাজক সাজানো।'),
  statement: L('Print the k-th smallest divisor of n, or −1 if n has fewer than k divisors.', 'n-এর k-তম ছোট ভাজক প্রিন্ট করুন, n-এর k-এর কম ভাজক থাকলে −১।'),
  input: L('n and k.', 'n আর k।'),
  output: L('The k-th divisor or −1.', 'k-তম ভাজক বা −১।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10¹⁵, 1 ≤ k ≤ 10⁹', '১ ≤ n ≤ ১০¹⁵, ১ ≤ k ≤ ১০⁹')] },
  samples: [
    { input: '4 2', output: '2', explain: L('Divisors 1, 2, 4.', 'ভাজক ১, ২, ৪।') },
    { input: '5 3', output: '-1', explain: L('Only 1 and 5.', 'শুধু ১ আর ৫।') },
    { input: '12 5', output: '6', explain: L('1, 2, 3, 4, 6, 12.', '১, ২, ৩, ৪, ৬, ১২।') },
  ],
  observation: L('Scanning d ≤ √n gives the small divisors in increasing order; their partners n / d are the large divisors in decreasing order. Concatenate them (without duplicating √n).', 'd ≤ √n স্ক্যান ছোট ভাজকগুলো বাড়তি ক্রমে দেয়; তাদের সঙ্গী n / d বড় ভাজকগুলো কমতি ক্রমে। এগুলো জুড়ে দিন (√n দুবার না নিয়ে)।'),
  approach: [L('Build small and large lists, reverse large, append.', 'ছোট আর বড় তালিকা বানিয়ে বড়টি উল্টে জুড়ুন।')],
  walkthrough: { input: '12 5', steps: [{ state: 'small 1 2 3, large 12 6 4', text: L('Combined 1 2 3 4 6 12; 5th = 6.', 'মিলিত ১ ২ ৩ ৪ ৬ ১২; ৫ম = ৬।') }] },
  complexity: { time: 'O(√n)', space: 'O(d(n))', why: L('√10¹⁵ ≈ 3·10⁷ steps.', '√১০¹⁵ ≈ ৩·১০⁷ ধাপ।') },
  solutions: [
    {
      id: 'two-lists',
      kind: 'optimal',
      title: L('Small and large divisor lists', 'ছোট আর বড় ভাজকের তালিকা'),
      idea: L('small ascending + reversed large.', 'ছোট বাড়তি + উল্টানো বড়।'),
      explain: [L('When d · d = n, d appears only once. n up to 10¹⁵ requires long long and d * d ≤ n as the loop condition.', 'd · d = n হলে d একবারই আসে। ১০¹⁵ পর্যন্ত n-এ long long আর লুপের শর্ত হিসেবে d * d ≤ n লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, k;
    cin >> n >> k;
    vector<long long> small, large;
    for (long long d = 1; d * d <= n; d++) {
        if (n % d) continue;
        small.push_back(d);
        if (d != n / d) large.push_back(n / d);
    }
    reverse(large.begin(), large.end());
    small.insert(small.end(), large.begin(), large.end());
    cout << (k <= (long long)small.size() ? small[k - 1] : -1) << "\n";
    return 0;
}
`,
      time: 'O(√n)',
      space: 'O(d(n))',
      accepted: true,
      toolkit: ['vector', 'reverse-unique', 'long-long'],
    },
    {
      id: 'sort',
      kind: 'method',
      title: L('Collect all divisors and sort', 'সব ভাজক জড়ো করে সর্ট'),
      idea: L('Push both d and n / d, then sort.', 'd আর n / d দুটোই পুশ করে সর্ট।'),
      explain: [L('Simpler to write; sorting at most ~27 000 divisors (the maximum for n ≤ 10¹⁵) costs nothing compared to the scan.', 'লেখা সহজ; সর্বোচ্চ প্রায় ২৭,০০০ ভাজক (n ≤ ১০¹⁵-এর জন্য সর্বোচ্চ) সর্ট করা স্ক্যানের তুলনায় কিছুই না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, k;
    cin >> n >> k;
    vector<long long> divs;
    for (long long d = 1; d * d <= n; d++)
        if (n % d == 0) {
            divs.push_back(d);
            if (d != n / d) divs.push_back(n / d);
        }
    sort(divs.begin(), divs.end());
    cout << (k <= (long long)divs.size() ? divs[k - 1] : -1) << "\n";
    return 0;
}
`,
      time: 'O(√n + d log d)',
      space: 'O(d(n))',
      accepted: true,
      toolkit: ['sort', 'long-long'],
    },
  ],
  tests: [
    { input: '4 2', output: '2', source: 'sample', note: sample(1) },
    { input: '5 3', output: '-1', source: 'sample', note: sample(2) },
    { input: '12 5', output: '6', source: 'sample', note: sample(3) },
    { input: '1 1', output: '1', source: 'own', note: L('n = 1.', 'n = ১।') },
    { input: '16 3', output: '4', source: 'own', note: L('√n counted once.', '√n একবার গোনা।') },
  ],
  pitfalls: [L('Counting √n twice for perfect squares.', 'পূর্ণবর্গে √n দুবার গোনা।'), L('int overflow in d * d.', 'd * d-এ int ওভারফ্লো।')],
  related: [{ id: '1360D', name: 'Buying Shovels', why: L('Divisor pairs.', 'ভাজক জোড়া।') }],
  toolkit: ['long-long'],
};

export const p1521A: ProblemEntry = {
  id: '1521A',
  contestId: 1521,
  index: 'A',
  name: 'Nastia and Nearly Good Numbers',
  rating: 1000,
  tags: ['constructive', 'math', 'number-theory'],
  why: L('Build x + y = z from multiples of A, with one of them a multiple of A·B.', 'A-এর গুণিতক থেকে x + y = z বানানো, যার একটি A·B-এর গুণিতক।'),
  statement: L(
    'A number is good if divisible by A·B and nearly good if divisible by A but not good. Find three distinct positive x, y, z with x + y = z, exactly one of them good and the other two nearly good, or print NO. There are t test cases.',
    'একটি সংখ্যা ভালো যদি A·B দিয়ে বিভাজ্য, আর প্রায় ভালো যদি A দিয়ে বিভাজ্য কিন্তু ভালো নয়। তিনটি আলাদা ধনাত্মক x, y, z বের করুন যাতে x + y = z, ঠিক একটি ভালো আর বাকি দুটি প্রায় ভালো, না হলে NO প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has A and B.', 't; প্রতিটি টেস্টে A আর B।'),
  output: L('NO, or YES and x y z.', 'NO, অথবা YES আর x y z।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ A, B ≤ 10⁶', '১ ≤ A, B ≤ ১০⁶'), anyAnswer] },
  samples: [{ input: '3\n5 3\n13 2\n7 11', output: 'YES\n10 50 60\nYES\n169 39 208\nYES\n28 154 182', explain: L('5 3: 60 is good (÷15); 10 and 50 are nearly good.', '৫ ৩: ৬০ ভালো (÷১৫); ১০ আর ৫০ প্রায় ভালো।') }],
  observation: L('If B = 1, every multiple of A is good, so no nearly good number exists: NO. Otherwise A + A·B = A·(B + 1): A and A·(B + 1) are not multiples of A·B (B and B + 1 are coprime with B ≥ 2), and A·B is good.', 'B = ১ হলে A-এর প্রতিটি গুণিতক ভালো, তাই কোনো প্রায় ভালো সংখ্যা নেই: NO। নাহলে A + A·B = A·(B + ১): A আর A·(B + ১) A·B-এর গুণিতক নয় (B ≥ ২-এ B আর B + ১ সহমৌলিক), আর A·B ভালো।'),
  approach: [L('B = 1 → NO; else A, A·B, A·(B + 1).', 'B = ১ → NO; নাহলে A, A·B, A·(B + ১)।')],
  walkthrough: { input: '5 3', steps: [{ state: '5 + 15 = 20', text: L('15 good, 5 and 20 nearly good.', '১৫ ভালো, ৫ আর ২০ প্রায় ভালো।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Constant.', 'স্থির।') },
  solutions: [
    {
      id: 'construct',
      kind: 'optimal',
      title: L('A + A·B = A·(B + 1)', 'A + A·B = A·(B + ১)'),
      idea: L('The good number sits in the middle of the sum.', 'ভালো সংখ্যাটি যোগফলের মাঝে বসে।'),
      explain: [L('B = 2 needs care: A·(B + 1) = 3A, fine, and A, 2A, 3A are distinct. Values reach 10¹² + 10⁶, so long long.', 'B = ২-এ খেয়াল: A·(B + ১) = ৩A, ঠিক আছে, আর A, ২A, ৩A আলাদা। মান ১০¹² + ১০⁶ পর্যন্ত, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long A, B;
        cin >> A >> B;
        if (B == 1) { cout << "NO\n"; continue; }
        cout << "YES\n" << A << " " << A * B << " " << A * (B + 1) << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'break-continue'],
    },
    {
      id: 'alt',
      kind: 'alt',
      title: L('A·(B − 1) + A = A·B', 'A·(B − ১) + A = A·B'),
      idea: L('Put the good number as the total instead: z = A·B.', 'ভালো সংখ্যাটি মোট হিসেবে রাখুন: z = A·B।'),
      explain: [L('This works when B ≥ 3 (so A and A·(B − 1) are distinct and neither is a multiple of A·B). For B = 2 it would give A + A = 2A with x = y, so fall back to the first construction.', 'B ≥ ৩ হলে এটি চলে (তাই A আর A·(B − ১) আলাদা আর কোনোটিই A·B-এর গুণিতক নয়)। B = ২-এ এটি A + A = ২A দিত, x = y, তাই প্রথম গঠনে ফিরুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long A, B;
        cin >> A >> B;
        if (B == 1) cout << "NO\n";
        else if (B == 2) cout << "YES\n" << A << " " << 2 * A << " " << 3 * A << "\n";
        else cout << "YES\n" << A << " " << A * (B - 1) << " " << A * B << "\n";
    }
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
    { input: '3\n5 3\n13 2\n7 11', output: 'YES\n10 50 60\nYES\n169 39 208\nYES\n28 154 182', source: 'sample', note: sample(1) },
    { input: '1\n4 1', output: 'NO', source: 'own', note: L('B = 1.', 'B = ১।') },
  ],
  pitfalls: [L('Missing B = 1.', 'B = ১ বাদ পড়া।'), L('int overflow in A·(B + 1).', 'A·(B + ১)-এ int ওভারফ্লো।')],
  related: [{ id: '1617B', name: 'GCD Problem', why: L('Number-theory construction.', 'নাম্বার থিওরির গঠন।') }],
  toolkit: ['long-long'],
};

export const p1352A: ProblemEntry = {
  id: '1352A',
  contestId: 1352,
  index: 'A',
  name: 'Sum of Round Numbers',
  rating: 800,
  tags: ['implementation', 'math'],
  why: L('Decompose by digits: each non-zero digit is its own round number.', 'অঙ্ক ধরে ভাঙা: প্রতিটি অশূন্য অঙ্ক নিজেই একটি রাউন্ড সংখ্যা।'),
  statement: L('A round number has one non-zero digit followed by zeros (like 4000 or 1). Write n as a sum of the minimum number of round numbers. Print the count and the terms in any order. There are t test cases.', 'রাউন্ড সংখ্যায় একটি অশূন্য অঙ্কের পর শুধু শূন্য (যেমন ৪০০০ বা ১)। n-কে সবচেয়ে কম রাউন্ড সংখ্যার যোগফল হিসেবে লিখুন। সংখ্যা আর পদগুলো যেকোনো ক্রমে প্রিন্ট করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n (1 ≤ n ≤ 10⁴).', 't; প্রতিটি টেস্টে n (১ ≤ n ≤ ১০⁴)।'),
  output: L('k, then k round numbers.', 'k, তারপর k-টি রাউন্ড সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [anyAnswer] },
  samples: [{ input: '5\n5009\n7\n9876\n10000\n10', output: '2\n5000 9\n1\n7\n4\n800 70 6 9000\n1\n10000\n1\n10', explain: L('9876 = 9000 + 800 + 70 + 6.', '৯৮৭৬ = ৯০০০ + ৮০০ + ৭০ + ৬।') }],
  observation: L('A round number has one non-zero digit, so each non-zero digit of n needs at least one term. Using exactly digit · 10ᵖ for each non-zero digit achieves that bound.', 'রাউন্ড সংখ্যায় একটি অশূন্য অঙ্ক, তাই n-এর প্রতিটি অশূন্য অঙ্কের জন্য অন্তত একটি পদ লাগে। প্রতিটি অশূন্য অঙ্কের জন্য ঠিক অঙ্ক · ১০ᵖ নিলে সেই সীমা অর্জিত হয়।'),
  approach: [L('Peel digits with % 10 and keep digit · place for non-zero digits.', '% ১০ দিয়ে অঙ্ক খুলে অশূন্য অঙ্কের জন্য অঙ্ক · স্থান রাখুন।')],
  walkthrough: { input: '5009', steps: [{ state: 'digits 9 (×1), 0, 0, 5 (×1000)', text: L('9 and 5000.', '৯ আর ৫০০০।') }] },
  complexity: { time: 'O(digits)', space: 'O(digits)', why: L('At most 5 digits.', 'সর্বোচ্চ ৫টি অঙ্ক।') },
  solutions: [
    {
      id: 'digits',
      kind: 'optimal',
      title: L('One term per non-zero digit', 'প্রতিটি অশূন্য অঙ্কে একটি পদ'),
      idea: L('n % 10 · place, place *= 10.', 'n % ১০ · স্থান, স্থান *= ১০।'),
      explain: [L('Reading digits from the right gives the terms from smallest to largest; any order is accepted.', 'ডান থেকে অঙ্ক পড়লে পদগুলো ছোট থেকে বড় আসে; যেকোনো ক্রম গ্রহণযোগ্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> terms;
        for (int place = 1; n > 0; place *= 10, n /= 10)
            if (n % 10) terms.push_back(n % 10 * place);
        cout << terms.size() << "\n";
        for (int x : terms) cout << x << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(digits)',
      space: 'O(digits)',
      accepted: true,
      toolkit: ['modulo', 'vector'],
    },
    {
      id: 'string',
      kind: 'method',
      title: L('Read n as a string', 'n-কে স্ট্রিং হিসেবে পড়া'),
      idea: L('Digit i followed by (len − 1 − i) zeros.', 'অঙ্ক i-এর পরে (len − ১ − i)টি শূন্য।'),
      explain: [L('Building each term as text (digit + zeros) avoids powers of ten and prints the terms from largest to smallest.', 'প্রতিটি পদ টেক্সট হিসেবে বানালে (অঙ্ক + শূন্য) দশের ঘাত লাগে না আর পদগুলো বড় থেকে ছোট প্রিন্ট হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        vector<string> terms;
        for (size_t i = 0; i < s.size(); i++)
            if (s[i] != '0') terms.push_back(s[i] + string(s.size() - 1 - i, '0'));
        cout << terms.size() << "\n";
        for (auto& x : terms) cout << x << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(digits²)',
      space: 'O(digits²)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [{ input: '5\n5009\n7\n9876\n10000\n10', output: '2\n5000 9\n1\n7\n4\n800 70 6 9000\n1\n10000\n1\n10', source: 'sample', note: sample(1) }],
  pitfalls: [L('Printing zero terms for zero digits.', 'শূন্য অঙ্কের জন্য শূন্য পদ প্রিন্ট।')],
  related: [{ id: '1343B', name: 'Balanced Array', why: L('Another construction.', 'আরেকটি গঠন।') }],
  toolkit: ['modulo'],
};

export const p1352B: ProblemEntry = {
  id: '1352B',
  contestId: 1352,
  index: 'B',
  name: 'Same Parity Summands',
  rating: 1200,
  tags: ['constructive', 'math'],
  why: L('Try “all odd” and “all even” with k − 1 tiny terms and one big term.', 'k − ১টি ছোট পদ আর একটি বড় পদ নিয়ে “সব বিজোড়” আর “সব জোড়” চেষ্টা।'),
  statement: L('Represent n as a sum of k positive integers that all have the same parity, or print NO. Any valid answer is accepted. There are t test cases.', 'n-কে একই জোড়-বিজোড়ের k-টি ধনাত্মক পূর্ণসংখ্যার যোগফল হিসেবে লিখুন, না হলে NO প্রিন্ট করুন। যেকোনো বৈধ উত্তর গ্রহণযোগ্য। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and k.', 't; প্রতিটি টেস্টে n আর k।'),
  output: L('NO, or YES and k numbers.', 'NO, অথবা YES আর k-টি সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹, 1 ≤ k ≤ 100', '১ ≤ n ≤ ১০⁹, ১ ≤ k ≤ ১০০'), anyAnswer] },
  samples: [{ input: '8\n10 3\n100 4\n8 7\n97 2\n8 8\n3 10\n5 3\n1000000000 9', output: 'YES\n4 2 4\nYES\n55 5 5 35\nNO\nNO\nYES\n1 1 1 1 1 1 1 1\nNO\nYES\n3 1 1\nYES\n111111110 111111110 111111110 111111110 111111110 111111110 111111110 111111110 111111120', explain: L('97 as two numbers of equal parity: their sum would be even. NO.', '৯৭-কে একই জোড়-বিজোড়ের দুটি সংখ্যায়: তাদের যোগফল জোড় হতো। NO।') }],
  observation: L('All odd: k − 1 ones and n − (k − 1), which needs n − k + 1 > 0 and odd. All even: k − 1 twos and n − 2(k − 1), which needs it > 0 and even. If neither works, nothing works, because the smallest terms leave the largest valid remainder.', 'সব বিজোড়: k − ১টি এক আর n − (k − ১), যার জন্য n − k + ১ > ০ আর বিজোড় লাগে। সব জোড়: k − ১টি দুই আর n − ২(k − ১), যার জন্য এটি > ০ আর জোড় লাগে। কোনোটিই না চললে কিছুই চলে না, কারণ সবচেয়ে ছোট পদগুলো সবচেয়ে বড় বৈধ বাকি রাখে।'),
  approach: [L('Check the odd construction, then the even one.', 'বিজোড় গঠন দেখুন, তারপর জোড়টি।')],
  walkthrough: { input: '10 3', steps: [{ state: 'odd: 1 1 8 ✗ (8 even)', text: L('even: 2 2 6 ✓.', 'জোড়: ২ ২ ৬ ✓।') }] },
  complexity: { time: 'O(k)', space: 'O(1)', why: L('Print k numbers.', 'k-টি সংখ্যা প্রিন্ট।') },
  solutions: [
    {
      id: 'two-cases',
      kind: 'optimal',
      title: L('Ones or twos, plus a remainder', 'এক বা দুই, সঙ্গে একটি বাকি'),
      idea: L('Smallest possible k − 1 terms, the rest goes into the last one.', 'সবচেয়ে ছোট সম্ভাব্য k − ১টি পদ, বাকিটা শেষটিতে।'),
      explain: [L('Keeping the remainder in one term means only its parity and positivity need checking.', 'বাকিটা একটি পদে রাখলে শুধু এর জোড়-বিজোড় আর ধনাত্মকতা দেখতে হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long odd = n - (k - 1), even = n - 2 * (k - 1);
        if (odd > 0 && odd % 2 == 1) {
            cout << "YES\n";
            for (int i = 0; i < k - 1; i++) cout << 1 << ' ';
            cout << odd << "\n";
        } else if (even > 0 && even % 2 == 0) {
            cout << "YES\n";
            for (int i = 0; i < k - 1; i++) cout << 2 << ' ';
            cout << even << "\n";
        } else {
            cout << "NO\n";
        }
    }
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo'],
    },
    {
      id: 'spread',
      kind: 'alt',
      title: L('Spread evenly, then fix parity', 'সমানভাবে ছড়িয়ে জোড়-বিজোড় ঠিক করা'),
      idea: L('Pick a parity p; give everyone the base p (1 or 2), then share the extra in steps of 2.', 'একটি জোড়-বিজোড় p বাছুন; সবাইকে ভিত্তি p (১ বা ২) দিন, তারপর বাড়তিটা ২-এর ধাপে ভাগ করুন।'),
      explain: [L('A different but equally valid answer, close to the sample’s style: the extra n − k·p must be even and non-negative, then each term gets 2 · (extra/2 / k) and the first few get 2 more.', 'আলাদা কিন্তু সমান বৈধ উত্তর, স্যাম্পলের ধরনের কাছাকাছি: বাড়তি n − k·p জোড় আর অঋণাত্মক হতে হবে, তারপর প্রতিটি পদ পায় ২ · (বাড়তি/২ / k) আর প্রথম কয়েকটি আরও ২।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        bool done = false;
        for (long long p : {1LL, 2LL}) {
            long long extra = n - k * p;
            if (extra < 0 || extra % 2) continue;
            long long units = extra / 2;
            cout << "YES\n";
            for (long long i = 0; i < k; i++) cout << p + 2 * (units / k + (i < units % k ? 1 : 0)) << ' ';
            cout << "\n";
            done = true;
            break;
        }
        if (!done) cout << "NO\n";
    }
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
  ],
  tests: [
    { input: '8\n10 3\n100 4\n8 7\n97 2\n8 8\n3 10\n5 3\n1000000000 9', output: 'YES\n4 2 4\nYES\n55 5 5 35\nNO\nNO\nYES\n1 1 1 1 1 1 1 1\nNO\nYES\n3 1 1\nYES\n111111110 111111110 111111110 111111110 111111110 111111110 111111110 111111110 111111120', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Allowing a zero term.', 'একটি শূন্য পদ হতে দেওয়া।')],
  related: [{ id: '1352A', name: 'Sum of Round Numbers', why: L('Same contest, another split.', 'একই কনটেস্ট, আরেকটি ভাগ।') }],
  toolkit: ['modulo'],
};

export const p1352G: ProblemEntry = {
  id: '1352G',
  contestId: 1352,
  index: 'G',
  name: 'Special Permutation',
  rating: 1600,
  tags: ['constructive'],
  featuredFor: ['constructive'],
  why: L('Find a pattern on small n: odds down, then 4 2, then evens up.', 'ছোট n-এ প্যাটার্ন খোঁজা: বিজোড় নিচে, তারপর ৪ ২, তারপর জোড় ওপরে।'),
  statement: L('Build a permutation of 1..n where every two neighbours differ by at least 2 and at most 4, or print −1. Any valid permutation is accepted. There are t test cases.', '১..n-এর একটি পারমুটেশন বানান যেখানে প্রতি দুই প্রতিবেশীর পার্থক্য অন্তত ২ আর সর্বোচ্চ ৪, না হলে −১ প্রিন্ট করুন। যেকোনো বৈধ পারমুটেশন গ্রহণযোগ্য। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('A permutation or −1.', 'একটি পারমুটেশন বা −১।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 1000', '২ ≤ n ≤ ১০০০'), anyAnswer] },
  samples: [{ input: '6\n10\n2\n4\n6\n7\n13', output: '9 6 10 8 4 7 3 1 5 2 \n-1\n3 1 4 2 \n5 3 6 2 4 1 \n5 1 3 6 2 4 7 \n13 9 7 11 8 4 1 3 5 2 6 10 12 ', explain: L('n = 2, 3 are impossible: the only differences are 1 and 2.', 'n = ২, ৩ অসম্ভব।') }],
  observation: L('Print the odd numbers in decreasing order down to 1, then 4, 2, then the remaining evens 6, 8, …. Odd–odd and even–even steps are 2; the joints 1 → 4 and 4 → 2 differ by 3 and 2. For n ≤ 3 no permutation works.', 'বিজোড় সংখ্যাগুলো কমতি ক্রমে ১ পর্যন্ত, তারপর ৪, ২, তারপর বাকি জোড় ৬, ৮, …। বিজোড়–বিজোড় আর জোড়–জোড় ধাপ ২; সংযোগ ১ → ৪ আর ৪ → ২-এর পার্থক্য ৩ আর ২। n ≤ ৩-এ কোনো পারমুটেশন চলে না।'),
  approach: [L('n < 4 → −1; else the pattern above.', 'n < ৪ → −১; নাহলে ওপরের প্যাটার্ন।')],
  walkthrough: { input: '6', steps: [{ state: '5 3 1 4 2 6', text: L('Differences 2 2 3 2 4.', 'পার্থক্য ২ ২ ৩ ২ ৪।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Print n numbers.', 'n-টি সংখ্যা প্রিন্ট।') },
  solutions: [
    {
      id: 'pattern',
      kind: 'optimal',
      title: L('Odds down, 4 2, evens up', 'বিজোড় নিচে, ৪ ২, জোড় ওপরে'),
      idea: L('All steps are 2 except two joints of 3 and 2.', 'দুটি সংযোগ (৩ আর ২) ছাড়া সব ধাপ ২।'),
      explain: [L('The pattern was found by solving n = 4..8 by hand (or by brute force) and noticing that odd and even numbers form two chains with step 2 that only need a good joint.', 'প্যাটার্নটি n = ৪..৮ হাতে (বা ব্রুট ফোর্সে) সমাধান করে পাওয়া, লক্ষ করে যে বিজোড় আর জোড় সংখ্যা ২ ধাপের দুটি শৃঙ্খল যাদের শুধু একটি ভালো সংযোগ লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n < 4) { cout << -1 << "\n"; continue; }
        for (int x = (n % 2 ? n : n - 1); x >= 1; x -= 2) cout << x << ' ';
        cout << 4 << ' ' << 2 << ' ';
        for (int x = 6; x <= n; x += 2) cout << x << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Backtracking search (small n)', 'ব্যাকট্র্যাকিং খোঁজ (ছোট n)'),
      idea: L('Extend the permutation with any unused value 2..4 away.', '২..৪ দূরের যেকোনো অব্যবহৃত মান দিয়ে পারমুটেশন বাড়ান।'),
      explain: [L('This is the tool for discovering the pattern: run it for n = 4..10 and look at the outputs. It is exponential, so it is used only for small n.', 'প্যাটার্ন আবিষ্কারের হাতিয়ার এটি: n = ৪..১০-এর জন্য চালিয়ে আউটপুট দেখুন। এটি সূচকীয়, তাই শুধু ছোট n-এ ব্যবহার হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> perm;
vector<bool> used;

bool go() {
    if ((int)perm.size() == n) return true;
    for (int v = 1; v <= n; v++) {
        if (used[v]) continue;
        if (!perm.empty()) {
            int d = abs(v - perm.back());
            if (d < 2 || d > 4) continue;
        }
        used[v] = true;
        perm.push_back(v);
        if (go()) return true;
        perm.pop_back();
        used[v] = false;
    }
    return false;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cin >> n;
        if (n > 12) { cout << "\n"; continue; }   // exponential: small n only
        perm.clear();
        used.assign(n + 1, false);
        if (!go()) { cout << -1 << "\n"; continue; }
        for (int x : perm) cout << x << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '6\n10\n2\n4\n6\n7\n13', output: '9 6 10 8 4 7 3 1 5 2 \n-1\n3 1 4 2 \n5 3 6 2 4 1 \n5 1 3 6 2 4 7 \n13 9 7 11 8 4 1 3 5 2 6 10 12 ', source: 'sample', note: sample(1) },
    { input: '2\n3\n5', output: '-1\n5 3 1 4 2', source: 'own', note: L('n = 3 and n = 5.', 'n = ৩ আর n = ৫।') },
  ],
  pitfalls: [L('Printing a pattern for n = 2 or 3.', 'n = ২ বা ৩-এর জন্য প্যাটার্ন প্রিন্ট।')],
  related: [{ id: '1343B', name: 'Balanced Array', why: L('Construction with a proof.', 'প্রমাণসহ গঠন।') }],
  toolkit: ['for-loop'],
};
