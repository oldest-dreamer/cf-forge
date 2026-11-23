import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1742D: ProblemEntry = {
  id: '1742D',
  contestId: 1742,
  index: 'D',
  name: 'Coprime',
  rating: 1100,
  tags: ['brute-force', 'greedy', 'number-theory'],
  why: L('n is large but values are small: brute force over values, not indices.', 'n বড় কিন্তু মান ছোট: ইনডেক্স নয়, মানের ওপর ব্রুট ফোর্স।'),
  statement: L(
    'Given an array of n positive integers (each ≤ 1000), find the maximum i + j (1-based, i and j may be equal) such that gcd(aᵢ, aⱼ) = 1, or −1 if no such pair exists. There are t test cases.',
    'n-টি ধনাত্মক পূর্ণসংখ্যার অ্যারে দেওয়া আছে (প্রতিটি ≤ ১০০০); gcd(aᵢ, aⱼ) = ১ এমন সর্বোচ্চ i + j বের করুন (১-ভিত্তিক, i আর j সমান হতে পারে), না থাকলে −১। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The maximum i + j, or −1.', 'সর্বোচ্চ i + j, অথবা −১।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n ≤ 2·10⁵, aᵢ ≤ 1000', 'n ≤ ২·১০⁵, aᵢ ≤ ১০০০')] },
  samples: [
    { input: '6\n3\n3 2 1\n7\n1 3 5 2 4 7 7\n5\n1 2 3 4 5\n3\n2 2 4\n6\n5 4 3 15 12 16\n5\n1 2 2 3 6', output: '6\n12\n9\n-1\n10\n7', explain: L('First test: a₃ = 1 is coprime with itself: 3 + 3.', 'প্রথম টেস্ট: a₃ = ১ নিজের সঙ্গে সহমৌলিক: ৩ + ৩।') },
  ],
  observation: L('Only the last index of each value matters (a larger index is always better). There are at most 1000 distinct values, so try all pairs of values: 10⁶ gcds.', 'প্রতিটি মানের শুধু শেষ ইনডেক্স গুরুত্বপূর্ণ (বড় ইনডেক্স সবসময় ভালো)। সর্বোচ্চ ১০০০টি ভিন্ন মান, তাই মানগুলোর সব জোড়া চেষ্টা করুন: ১০⁶টি gcd।'),
  approach: [L('last[v] = largest index with value v; maximise last[x] + last[y] over coprime x, y present.', 'last[v] = v মানের সবচেয়ে বড় ইনডেক্স; উপস্থিত সহমৌলিক x, y-এর ওপর last[x] + last[y] সর্বোচ্চ করুন।')],
  walkthrough: { input: '1 3 5 2 4 7 7', steps: [{ state: 'last[7] = 7, last[5] = 3, last[4] = 5', text: L('7 and 4 are coprime: 7 + 5 = 12.', '৭ আর ৪ সহমৌলিক: ৭ + ৫ = ১২।') }] },
  complexity: { time: 'O(n + V² log V)', space: 'O(V)', why: L('V = 1000 values.', 'V = ১০০০ মান।') },
  solutions: [
    {
      id: 'values',
      kind: 'optimal',
      title: L('Pairs of values with their last index', 'শেষ ইনডেক্সসহ মানের জোড়া'),
      idea: L('Iterate x, y in 1..1000 where both appear.', 'দুটোই আছে এমন x, y-এর ওপর ১..১০০০ লুপ।'),
      explain: [L('Reducing n indices to at most 1000 representatives is the key: the brute force then runs over values instead of positions.', 'n-টি ইনডেক্সকে সর্বোচ্চ ১০০০ প্রতিনিধিতে নামানোই মূল কথা: তখন ব্রুট ফোর্স অবস্থানের বদলে মানের ওপর চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> last(1001, 0);
        for (int i = 1; i <= n; i++) {
            int a;
            scanf("%d", &a);
            last[a] = i;
        }
        int best = -1;
        for (int x = 1; x <= 1000; x++) {
            if (!last[x]) continue;
            for (int y = x; y <= 1000; y++)
                if (last[y] && gcd(x, y) == 1) best = max(best, last[x] + last[y]);
        }
        printf("%d\n", best);
    }
    return 0;
}
`,
      time: 'O(n + V² log V)',
      space: 'O(V)',
      accepted: true,
      toolkit: ['gcd-lcm', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All index pairs', 'সব ইনডেক্স জোড়া'),
      idea: L('Check gcd for every i ≤ j.', 'প্রতিটি i ≤ j-এর জন্য gcd দেখুন।'),
      explain: [L('n² / 2 = 2·10¹⁰ gcds is far too many; this exists to check the value-based solution.', 'n² / ২ = ২·১০¹⁰টি gcd অনেক বেশি; এটি মান-ভিত্তিক সমাধান যাচাইয়ের জন্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        int best = -1;
        for (int i = 1; i <= n; i++)
            for (int j = i; j <= n; j++)
                if (gcd(a[i], a[j]) == 1) best = max(best, i + j);
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n² log V)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['gcd-lcm'],
    },
  ],
  tests: [
    { input: '6\n3\n3 2 1\n7\n1 3 5 2 4 7 7\n5\n1 2 3 4 5\n3\n2 2 4\n6\n5 4 3 15 12 16\n5\n1 2 2 3 6', output: '6\n12\n9\n-1\n10\n7', source: 'sample', note: sample(1) },
    { input: '1\n2\n1 1', output: '4', source: 'own', note: L('i = j = 2.', 'i = j = ২।') },
  ],
  pitfalls: [L('Forgetting that i = j is allowed (only when aᵢ = 1).', 'ভুলে যাওয়া যে i = j অনুমোদিত (শুধু aᵢ = ১ হলে)।')],
  related: [{ id: '1458A', name: 'Row GCD', why: L('More gcd.', 'আরও gcd।') }],
  toolkit: ['gcd-lcm'],
};

export const p1541B: ProblemEntry = {
  id: '1541B',
  contestId: 1541,
  index: 'B',
  name: 'Pleasant Pairs',
  rating: 1200,
  tags: ['brute-force', 'implementation', 'math', 'number-theory'],
  why: L('Enumerate multiples instead of pairs: a harmonic-series bound makes it O(n log n).', 'জোড়ার বদলে গুণিতক গণনা: হারমোনিক ধারার সীমা একে O(n log n) করে।'),
  statement: L(
    'An array of n distinct integers (1 ≤ aᵢ ≤ 2n) is given. Count pairs i < j with aᵢ · aⱼ = i + j (1-based indices). There are t test cases.',
    'n-টি আলাদা পূর্ণসংখ্যার অ্যারে দেওয়া আছে (১ ≤ aᵢ ≤ ২n)। i < j এমন জোড়া গুনুন যেখানে aᵢ · aⱼ = i + j (১-ভিত্তিক ইনডেক্স)। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The number of pairs.', 'জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '3\n2\n3 1\n3\n6 1 5\n5\n3 1 5 9 2', output: '1\n1\n3', explain: L('First test: 3 · 1 = 1 + 2.', 'প্রথম টেস্ট: ৩ · ১ = ১ + ২।') }],
  observation: L('i + j ≤ 2n − 1, so aᵢ · aⱼ < 2n. For a fixed i, j must make i + j a multiple of aᵢ: j = k · aᵢ − i. Checking those j costs about 2n / aᵢ, and since the aᵢ are distinct, Σ 2n / aᵢ = O(n log n).', 'i + j ≤ ২n − ১, তাই aᵢ · aⱼ < ২n। নির্দিষ্ট i-এর জন্য j-কে i + j-কে aᵢ-এর গুণিতক বানাতে হবে: j = k · aᵢ − i। সেই j-গুলো দেখতে প্রায় ২n / aᵢ খরচ, আর aᵢ আলাদা হওয়ায় Σ ২n / aᵢ = O(n log n)।'),
  approach: [L('For every i, step j through k·aᵢ − i for j > i and test aᵢ · aⱼ == i + j.', 'প্রতিটি i-এর জন্য j > i-এ k·aᵢ − i ধরে j চালিয়ে aᵢ · aⱼ == i + j পরীক্ষা করুন।')],
  walkthrough: { input: '3 1', steps: [{ state: 'i = 1, a = 3: j = 2', text: L('3 · 1 = 3 = 1 + 2. One pair.', '৩ · ১ = ৩ = ১ + ২। একটি জোড়া।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Harmonic sum over distinct values.', 'আলাদা মানের ওপর হারমোনিক যোগফল।') },
  solutions: [
    {
      id: 'multiples',
      kind: 'optimal',
      title: L('Step through multiples of aᵢ', 'aᵢ-এর গুণিতক ধরে চলা'),
      idea: L('j starts at the first value > i with (i + j) % aᵢ == 0, then j += aᵢ.', 'j শুরু হয় i-এর বড় প্রথম মানে যেখানে (i + j) % aᵢ == ০, তারপর j += aᵢ।'),
      explain: [L('The distinctness of the values is what makes the total small: the large aᵢ take few steps, and only a few aᵢ can be small.', 'মানগুলো আলাদা হওয়াই মোটকে ছোট রাখে: বড় aᵢ-তে অল্প ধাপ, আর অল্প কয়েকটি aᵢ-ই ছোট হতে পারে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) scanf("%lld", &a[i]);
        long long pairs = 0;
        for (long long i = 1; i <= n; i++) {
            long long j = a[i] - i;                 // smallest j with (i + j) % a[i] == 0
            while (j <= i) j += a[i];
            for (; j <= n; j += a[i])
                if (a[i] * a[j] == i + j) pairs++;
        }
        printf("%lld\n", pairs);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['c-io', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs', 'সব জোড়া'),
      idea: L('Two loops.', 'দুটি লুপ।'),
      explain: [L('O(n²); the reference.', 'O(n²); রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        long long pairs = 0;
        for (int i = 1; i <= n; i++)
            for (int j = i + 1; j <= n; j++)
                if (a[i] * a[j] == i + j) pairs++;
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '3\n2\n3 1\n3\n6 1 5\n5\n3 1 5 9 2', output: '1\n1\n3', source: 'sample', note: sample(1) },
    { input: '1\n2\n1 2', output: '0', source: 'own', note: L('1 · 2 ≠ 3.', '১ · ২ ≠ ৩।') },
  ],
  pitfalls: [L('O(n²) over all pairs for n = 10⁵.', 'n = ১০⁵-এ সব জোড়ার ওপর O(n²)।')],
  related: [{ id: '1742D', name: 'Coprime', why: L('Brute force over values.', 'মানের ওপর ব্রুট ফোর্স।') }],
  toolkit: ['long-long'],
};

export const p1526B: ProblemEntry = {
  id: '1526B',
  contestId: 1526,
  index: 'B',
  name: 'I Hate 1111',
  rating: 1400,
  tags: ['dp', 'math', 'number-theory'],
  why: L('Every repunit from 1111 on is made of 11 and 111, so only two coins matter.', '১১১১ থেকে প্রতিটি রিপিউনিট ১১ আর ১১১ দিয়ে তৈরি, তাই শুধু দুটি কয়েন গুরুত্বপূর্ণ।'),
  statement: L(
    'Can x be written as a sum of numbers 11, 111, 1111, 11111, … (each used any number of times)? Print YES or NO for each of t test cases.',
    'x-কে কি ১১, ১১১, ১১১১, ১১১১১, … সংখ্যাগুলোর যোগফল হিসেবে লেখা যায় (প্রতিটি যতবার খুশি)? t-টি টেস্ট কেসের প্রতিটিতে YES বা NO প্রিন্ট করুন।',
  ),
  input: L('t; each test has x.', 't; প্রতিটি টেস্টে x।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ x ≤ 10⁹', '১ ≤ x ≤ ১০⁹')] },
  samples: [{ input: '3\n33\n144\n69', output: 'YES\nYES\nNO', explain: L('144 = 111 + 11 + 11 + 11.', '১৪৪ = ১১১ + ১১ + ১১ + ১১।') }],
  observation: L('1111 = 11 · 101 and 11111 = 111 · 100 + 11, and so on: every larger repunit is a combination of 11 and 111. So x = 11a + 111b. Since 111 = 11 · 10 + 1, b ≡ x (mod 11) works if 111 · (x mod 11) ≤ x.', '১১১১ = ১১ · ১০১ আর ১১১১১ = ১১১ · ১০০ + ১১, এভাবে: প্রতিটি বড় রিপিউনিট ১১ আর ১১১-এর সমন্বয়। তাই x = ১১a + ১১১b। ১১১ = ১১ · ১০ + ১ হওয়ায়, ১১১ · (x mod ১১) ≤ x হলে b ≡ x (mod ১১) কাজ করে।'),
  approach: [L('YES iff 111 · (x mod 11) ≤ x.', '১১১ · (x mod ১১) ≤ x হলেই YES।')],
  walkthrough: { input: '69', steps: [{ state: '69 mod 11 = 3, 333 > 69', text: L('NO.', 'NO।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One modulo.', 'একটি মডুলো।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Smallest number of 111s', 'সবচেয়ে কম ১১১'),
      idea: L('b = x mod 11; check 111 · b ≤ x.', 'b = x mod ১১; ১১১ · b ≤ x দেখুন।'),
      explain: [L('Each 111 adds 1 modulo 11, so the number of 111s must be ≡ x (mod 11). Using the smallest such count leaves the largest remainder for the 11s.', 'প্রতিটি ১১১ মডুলো ১১-এ ১ যোগ করে, তাই ১১১-এর সংখ্যা ≡ x (mod ১১) হতে হবে। এমন সবচেয়ে ছোট সংখ্যা নিলে ১১-এর জন্য সবচেয়ে বেশি বাকি থাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x;
        cin >> x;
        cout << (111 * (x % 11) <= x ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo'],
    },
    {
      id: 'loop',
      kind: 'method',
      title: L('Try up to 10 copies of 111', '১১১-এর সর্বোচ্চ ১০টি কপি চেষ্টা'),
      idea: L('For b = 0..10, check whether x − 111b is a non-negative multiple of 11.', 'b = ০..১০-এর জন্য দেখুন x − ১১১b অঋণাত্মক আর ১১-এর গুণিতক কি না।'),
      explain: [L('Eleven 111s equal 111 elevens, so more than 10 of them never helps. This tiny brute force avoids the modular argument.', 'এগারোটি ১১১ মানে ১১১টি এগারো, তাই ১০টির বেশি কখনো কাজে আসে না। এই ছোট ব্রুট ফোর্স মডুলার যুক্তি এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long x;
        cin >> x;
        bool ok = false;
        for (int b = 0; b <= 10 && 111 * b <= x; b++)
            if ((x - 111 * b) % 11 == 0) ok = true;
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'modulo'],
    },
  ],
  tests: [
    { input: '3\n33\n144\n69', output: 'YES\nYES\nNO', source: 'sample', note: sample(1) },
    { input: '3\n1\n1099\n1110', output: 'NO\nNO\nYES', source: 'own', note: L('1099 needs ten 111s (1110 > 1099), so NO; 1110 = ten 111s.', '১০৯৯-এ দশটি ১১১ লাগে (১১১০ > ১০৯৯), তাই NO; ১১১০ = দশটি ১১১।') },
  ],
  pitfalls: [L('Trying all repunits with a DP up to 10⁹.', '১০⁹ পর্যন্ত DP দিয়ে সব রিপিউনিট চেষ্টা।')],
  related: [{ id: '1475B', name: "New Year's Number", why: L('Two coins again.', 'আবার দুটি কয়েন।') }],
  toolkit: ['modulo'],
};

export const p1350B: ProblemEntry = {
  id: '1350B',
  contestId: 1350,
  index: 'B',
  name: 'Orac and Models',
  rating: 1400,
  tags: ['dp', 'math', 'number-theory'],
  why: L('A DP over indices where transitions go to multiples: O(n log n) by the harmonic sum.', 'ইনডেক্সের ওপর DP যেখানে রূপান্তর গুণিতকে যায়: হারমোনিক যোগফলে O(n log n)।'),
  statement: L(
    'Models are numbered 1..n with sizes sᵢ. Choose an increasing sequence of indices where each index divides the next and sizes strictly increase. What is the longest such sequence? There are t test cases.',
    'মডেলগুলো ১..n নম্বরের, আকার sᵢ। ইনডেক্সের একটি বাড়তি ক্রম বাছুন যেখানে প্রতিটি ইনডেক্স পরেরটিকে ভাগ করে আর আকার কঠোরভাবে বাড়ে। এমন সবচেয়ে লম্বা ক্রম কত? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the sizes.', 't; প্রতিটি টেস্টে n আর আকার।'),
  output: L('The maximum length.', 'সর্বোচ্চ দৈর্ঘ্য।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n ≤ 10⁵', 'Σ n ≤ ১০⁵')] },
  samples: [{ input: '4\n4\n5 3 4 6\n7\n1 4 2 3 6 4 9\n5\n5 4 3 2 1\n1\n9', output: '2\n3\n1\n1', explain: L('Second test: indices 1, 3, 6 with sizes 1, 2, 4.', 'দ্বিতীয় টেস্ট: ইনডেক্স ১, ৩, ৬, আকার ১, ২, ৪।') }],
  observation: L('dp[i] = longest valid sequence ending at index i. From i, the next index is a multiple of i, so push dp[i] + 1 to every multiple j with sⱼ > sᵢ.', 'dp[i] = ইনডেক্স i-তে শেষ হওয়া সবচেয়ে লম্বা বৈধ ক্রম। i থেকে পরের ইনডেক্স i-এর গুণিতক, তাই sⱼ > sᵢ এমন প্রতিটি গুণিতক j-তে dp[i] + ১ পাঠান।'),
  approach: [L('Process i from 1 to n, relaxing all multiples of i.', 'i ১ থেকে n পর্যন্ত, i-এর সব গুণিতক শিথিল করে।')],
  walkthrough: { input: '1 4 2 3 6 4 9', steps: [{ state: 'dp[1]=1 → dp[3]=2 → dp[6]=3', text: L('Answer 3.', 'উত্তর ৩।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('n/1 + n/2 + … + n/n steps.', 'n/১ + n/২ + … + n/n ধাপ।') },
  solutions: [
    {
      id: 'push',
      kind: 'optimal',
      title: L('Push DP to multiples', 'গুণিতকে DP ঠেলে দেওয়া'),
      idea: L('for j = 2i, 3i, …: dp[j] = max(dp[j], dp[i] + 1) if s[j] > s[i].', 'j = ২i, ৩i, …: s[j] > s[i] হলে dp[j] = max(dp[j], dp[i] + ১)।'),
      explain: [L('dp[i] is final when we reach i because every divisor of i is smaller and was processed earlier. The total work n · (1 + 1/2 + … + 1/n) is about n ln n.', 'i-তে পৌঁছানোর সময় dp[i] চূড়ান্ত, কারণ i-এর প্রতিটি ভাজক ছোট আর আগেই প্রক্রিয়া হয়েছে। মোট কাজ n · (১ + ১/২ + … + ১/n), প্রায় n ln n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> s(n + 1), dp(n + 1, 1);
        for (int i = 1; i <= n; i++) scanf("%d", &s[i]);
        for (int i = 1; i <= n; i++)
            for (int j = 2 * i; j <= n; j += i)
                if (s[j] > s[i]) dp[j] = max(dp[j], dp[i] + 1);
        printf("%d\n", *max_element(dp.begin() + 1, dp.end()));
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
    {
      id: 'pull',
      kind: 'method',
      title: L('Pull DP from divisors', 'ভাজক থেকে DP টেনে আনা'),
      idea: L('For each j, look at its divisors d < j found by trial division up to √j.', 'প্রতিটি j-এর জন্য √j পর্যন্ত ভাগ করে পাওয়া ভাজক d < j দেখুন।'),
      explain: [L('The same recurrence read the other way: dp[j] = 1 + max dp[d] over divisors d with s[d] < s[j]. It costs O(n √n), slower but still fine for 10⁵.', 'একই পুনরাবৃত্তি উল্টো দিক থেকে: s[d] < s[j] এমন ভাজক d-এর ওপর dp[j] = ১ + সর্বোচ্চ dp[d]। খরচ O(n √n), ধীর কিন্তু ১০⁵-এর জন্য ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> s(n + 1), dp(n + 1, 1);
        for (int i = 1; i <= n; i++) scanf("%d", &s[i]);
        int best = 1;
        for (int j = 2; j <= n; j++) {
            for (int d = 1; d * d <= j; d++) {
                if (j % d) continue;
                for (int div : {d, j / d})
                    if (div < j && s[div] < s[j]) dp[j] = max(dp[j], dp[div] + 1);
            }
            best = max(best, dp[j]);
        }
        printf("%d\n", best);
    }
    return 0;
}
`,
      time: 'O(n √n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n4\n5 3 4 6\n7\n1 4 2 3 6 4 9\n5\n5 4 3 2 1\n1\n9', output: '2\n3\n1\n1', source: 'sample', note: sample(1) },
    { input: '1\n8\n1 2 3 4 5 6 7 8', output: '4', source: 'own', note: L('Chain 1, 2, 4, 8.', 'শৃঙ্খল ১, ২, ৪, ৮।') },
  ],
  pitfalls: [L('Requiring sizes to be non-decreasing instead of strictly increasing.', 'কঠোরভাবে বাড়ার বদলে না-কমা আকার চাওয়া।')],
  related: [{ id: '1541B', name: 'Pleasant Pairs', why: L('Harmonic-sum loops.', 'হারমোনিক-যোগফলের লুপ।') }],
  toolkit: ['vector'],
};

export const p1458A: ProblemEntry = {
  id: '1458A',
  contestId: 1458,
  index: 'A',
  name: 'Row GCD',
  rating: 1600,
  tags: ['math', 'number-theory'],
  featuredFor: ['number-theory'],
  why: L('gcd(x, y) = gcd(x, y − x) turns n gcds per query into one.', 'gcd(x, y) = gcd(x, y − x) প্রতি কোয়েরির n-টি gcd-কে একটিতে নামায়।'),
  statement: L(
    'Given arrays a (n numbers) and b (m numbers), for every j print gcd(a₁ + bⱼ, a₂ + bⱼ, …, aₙ + bⱼ).',
    'অ্যারে a (n-টি সংখ্যা) আর b (m-টি সংখ্যা) দেওয়া আছে; প্রতিটি j-এর জন্য gcd(a₁ + bⱼ, a₂ + bⱼ, …, aₙ + bⱼ) প্রিন্ট করুন।',
  ),
  input: L('n and m, then a, then b.', 'n আর m, তারপর a, তারপর b।'),
  output: L('m numbers.', 'm-টি সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵, values ≤ 10¹⁸', 'n, m ≤ ২·১০⁵, মান ≤ ১০¹⁸')] },
  samples: [{ input: '4 4\n1 25 121 169\n1 2 7 23', output: '2 3 8 24', explain: L('b = 1: gcd(2, 26, 122, 170) = 2.', 'b = ১: gcd(২, ২৬, ১২২, ১৭০) = ২।') }],
  observation: L('Subtracting one argument from another keeps the gcd: gcd(a₁ + b, …, aₙ + b) = gcd(a₁ + b, a₂ − a₁, …, aₙ − a₁). The differences do not depend on b, so compute their gcd G once.', 'এক আর্গুমেন্ট থেকে অন্যটি বিয়োগ করলে gcd একই থাকে: gcd(a₁ + b, …, aₙ + b) = gcd(a₁ + b, a₂ − a₁, …, aₙ − a₁)। পার্থক্যগুলো b-এর ওপর নির্ভর করে না, তাই এদের gcd G একবার হিসাব করুন।'),
  approach: [L('G = gcd of |aᵢ − a₁|; answer for bⱼ is gcd(a₁ + bⱼ, G).', 'G = |aᵢ − a₁|-এর gcd; bⱼ-এর উত্তর gcd(a₁ + bⱼ, G)।')],
  walkthrough: { input: 'a = 1 25 121 169', steps: [{ state: 'differences 24, 120, 168 → G = 24', text: L('b = 23: gcd(24, 24) = 24.', 'b = ২৩: gcd(২৪, ২৪) = ২৪।') }] },
  complexity: { time: 'O((n + m) log C)', space: 'O(n)', why: L('One gcd per element.', 'প্রতি উপাদানে একটি gcd।') },
  solutions: [
    {
      id: 'diff',
      kind: 'optimal',
      title: L('gcd of differences', 'পার্থক্যের gcd'),
      idea: L('gcd(a₁ + b, G).', 'gcd(a₁ + b, G)।'),
      explain: [L('Use absolute values for the differences (or sort a first). std::gcd(x, 0) = x, so G = 0 when n = 1 and the answer is just a₁ + bⱼ. Values reach 2·10¹⁸, which fits in long long.', 'পার্থক্যে পরম মান ব্যবহার করুন (বা আগে a সর্ট করুন)। std::gcd(x, ০) = x, তাই n = ১ হলে G = ০ আর উত্তর শুধু a₁ + bⱼ। মান ২·১০¹⁸ পর্যন্ত যায়, যা long long-এ আঁটে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<long long> a(n);
    for (auto& x : a) scanf("%lld", &x);
    long long G = 0;
    for (int i = 1; i < n; i++) G = gcd(G, llabs(a[i] - a[0]));
    for (int j = 0; j < m; j++) {
        long long b;
        scanf("%lld", &b);
        printf("%lld ", gcd(a[0] + b, G));
    }
    printf("\n");
    return 0;
}
`,
      time: 'O((n + m) log C)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['gcd-lcm', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Direct gcd per query', 'প্রতি কোয়েরিতে সরাসরি gcd'),
      idea: L('n gcds for every bⱼ.', 'প্রতিটি bⱼ-এর জন্য n-টি gcd।'),
      explain: [L('O(n · m) = 4·10¹⁰ in the worst case; the reference.', 'সবচেয়ে খারাপ ক্ষেত্রে O(n · m) = ৪·১০¹⁰; রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    for (int j = 0; j < m; j++) {
        long long b, g = 0;
        cin >> b;
        for (long long x : a) g = gcd(g, x + b);
        cout << g << ' ';
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n · m · log C)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['gcd-lcm'],
    },
  ],
  tests: [
    { input: '4 4\n1 25 121 169\n1 2 7 23', output: '2 3 8 24', source: 'sample', note: sample(1) },
    { input: '1 2\n5\n1 10', output: '6 15', source: 'own', note: L('n = 1: the answer is a₁ + b.', 'n = ১: উত্তর a₁ + b।') },
  ],
  pitfalls: [L('Negative differences passed to gcd.', 'gcd-এ ঋণাত্মক পার্থক্য দেওয়া।'), L('O(n · m) per query.', 'প্রতি কোয়েরিতে O(n · m)।')],
  related: [{ id: '1349A', name: 'Orac and LCM', why: L('gcd and lcm identities.', 'gcd আর lcm-এর অভেদ।') }],
  toolkit: ['gcd-lcm'],
};

export const p1349A: ProblemEntry = {
  id: '1349A',
  contestId: 1349,
  index: 'A',
  name: 'Orac and LCM',
  rating: 1600,
  tags: ['math', 'number-theory'],
  why: L('gcd over all pairwise lcms, computed with suffix gcds in one line per element.', 'সব জোড়ার lcm-এর ওপর gcd, প্রতি উপাদানে এক লাইনে সাফিক্স gcd দিয়ে হিসাব।'),
  statement: L(
    'For an array a of n positive integers, consider lcm(aᵢ, aⱼ) for every pair i < j. Print the gcd of all these lcms.',
    'n-টি ধনাত্মক পূর্ণসংখ্যার অ্যারে a-এর প্রতিটি জোড়া i < j-এর জন্য lcm(aᵢ, aⱼ) বিবেচনা করুন। এই সব lcm-এর gcd প্রিন্ট করুন।',
  ),
  input: L('n, then the array.', 'n, তারপর অ্যারে।'),
  output: L('The gcd of all pairwise lcms.', 'সব জোড়ার lcm-এর gcd।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵, aᵢ ≤ 2·10⁵', '২ ≤ n ≤ ১০⁵, aᵢ ≤ ২·১০⁵')] },
  samples: [
    { input: '2\n1 1', output: '1', explain: L('One pair.', 'একটি জোড়া।') },
    { input: '4\n10 24 40 80', output: '40', explain: L('All lcms are multiples of 40.', 'সব lcm ৪০-এর গুণিতক।') },
    { input: '10\n540 648 810 648 720 540 594 864 972 648', output: '54', explain: L('A larger example.', 'একটি বড় উদাহরণ।') },
  ],
  observation: L('For a fixed i, gcd over j > i of lcm(aᵢ, aⱼ) = lcm(aᵢ, gcd of the later elements). So with suffix gcds sufᵢ₊₁, the answer is gcd over i of lcm(aᵢ, sufᵢ₊₁).', 'নির্দিষ্ট i-এর জন্য j > i-এর ওপর lcm(aᵢ, aⱼ)-এর gcd = lcm(aᵢ, পরের উপাদানগুলোর gcd)। তাই সাফিক্স gcd sufᵢ₊₁ দিয়ে উত্তর হলো i-এর ওপর lcm(aᵢ, sufᵢ₊₁)-এর gcd।'),
  approach: [L('Compute suffix gcds, then fold gcd over lcm(aᵢ, sufᵢ₊₁).', 'সাফিক্স gcd হিসাব করে lcm(aᵢ, sufᵢ₊₁)-এর ওপর gcd ভাঁজ করুন।')],
  walkthrough: { input: '10 24 40 80', steps: [{ state: 'suf: 8, 40, 80', text: L('lcm(10,8)=40, lcm(24,40)=120, lcm(40,80)=80 → gcd 40.', 'lcm(১০,৮)=৪০, lcm(২৪,৪০)=১২০, lcm(৪০,৮০)=৮০ → gcd ৪০।') }] },
  complexity: { time: 'O(n log C)', space: 'O(n)', why: L('One gcd and one lcm per element.', 'প্রতি উপাদানে একটি gcd আর একটি lcm।') },
  solutions: [
    {
      id: 'suffix',
      kind: 'optimal',
      title: L('Suffix gcd and the lcm–gcd identity', 'সাফিক্স gcd আর lcm–gcd অভেদ'),
      idea: L('ans = gcd over i of lcm(aᵢ, gcd(aᵢ₊₁..aₙ)).', 'ans = i-এর ওপর lcm(aᵢ, gcd(aᵢ₊₁..aₙ))-এর gcd।'),
      explain: [L('The identity gcd(lcm(a, x), lcm(a, y)) = lcm(a, gcd(x, y)) holds prime by prime: for each prime the exponents are max(e, min(…)). lcm values stay below 4·10¹⁰, so long long is enough.', 'gcd(lcm(a, x), lcm(a, y)) = lcm(a, gcd(x, y)) অভেদ প্রতিটি মৌলিকের জন্য খাটে: প্রতিটি মৌলিকের ঘাত max(e, min(…))। lcm-এর মান ৪·১০¹⁰-এর নিচে থাকে, তাই long long যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n), suf(n + 1, 0);
    for (auto& x : a) scanf("%lld", &x);
    for (int i = n - 1; i >= 0; i--) suf[i] = gcd(suf[i + 1], a[i]);
    long long ans = 0;
    for (int i = 0; i + 1 < n; i++) ans = gcd(ans, lcm(a[i], suf[i + 1]));
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log C)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['gcd-lcm', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All pairs', 'সব জোড়া'),
      idea: L('Fold gcd over every pairwise lcm.', 'প্রতিটি জোড়ার lcm-এর ওপর gcd ভাঁজ।'),
      explain: [L('O(n²) pairs: the reference.', 'O(n²) জোড়া: রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long ans = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) ans = gcd(ans, lcm(a[i], a[j]));
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n² log C)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['gcd-lcm'],
    },
  ],
  tests: [
    { input: '2\n1 1', output: '1', source: 'sample', note: sample(1) },
    { input: '4\n10 24 40 80', output: '40', source: 'sample', note: sample(2) },
    { input: '10\n540 648 810 648 720 540 594 864 972 648', output: '54', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Overflow in a · b before dividing by gcd: std::lcm divides first.', 'gcd দিয়ে ভাগের আগে a · b-তে ওভারফ্লো: std::lcm আগে ভাগ করে।')],
  related: [{ id: '1458A', name: 'Row GCD', why: L('Another gcd identity.', 'আরেকটি gcd অভেদ।') }],
  toolkit: ['gcd-lcm'],
};
