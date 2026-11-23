import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p996A: ProblemEntry = {
  id: '996A',
  contestId: 996,
  index: 'A',
  name: 'Hit the Lottery',
  rating: 800,
  tags: ['dp', 'greedy'],
  why: L('Coin change where greedy is provably optimal, checked against a real DP.', 'কয়েন বদল যেখানে গ্রিডি প্রমাণসহ সেরা, আসল DP দিয়ে মিলিয়ে দেখা।'),
  statement: L(
    'Allen has n dollars and wants to withdraw them using the fewest bills. Bills come in 1, 5, 10, 20 and 100 dollars. What is the minimum number of bills?',
    'অ্যালেনের n ডলার আছে আর সে সবচেয়ে কম নোটে তা তুলতে চায়। নোট আছে ১, ৫, ১০, ২০ আর ১০০ ডলারের। সর্বনিম্ন নোটের সংখ্যা কত?',
  ),
  input: L('One integer n.', 'একটি পূর্ণসংখ্যা n।'),
  output: L('The minimum number of bills.', 'সর্বনিম্ন নোটের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹', '১ ≤ n ≤ ১০⁹')] },
  samples: [
    { input: '125', output: '3', explain: L('100 + 20 + 5.', '১০০ + ২০ + ৫।') },
    { input: '43', output: '5', explain: L('20 + 20 + 1 + 1 + 1.', '২০ + ২০ + ১ + ১ + ১।') },
    { input: '1000000000', output: '10000000', explain: L('Ten million 100s.', 'এক কোটি ১০০-এর নোট।') },
  ],
  observation: L('For these bills, any group of smaller bills worth as much as a larger bill uses more pieces (five 20s for a 100, two 10s for a 20, two 5s for a 10, five 1s for a 5). So taking as many of the largest bill as possible is always best.', 'এই নোটগুলোতে একটি বড় নোটের সমান মূল্যের ছোট নোটের যেকোনো দলে বেশি টুকরো লাগে (১০০-এর জন্য পাঁচটি ২০, ২০-এর জন্য দুটি ১০, ১০-এর জন্য দুটি ৫, ৫-এর জন্য পাঁচটি ১)। তাই সবচেয়ে বড় নোট যত সম্ভব নেওয়াই সবসময় সেরা।'),
  approach: [L('For 100, 20, 10, 5, 1 in that order: take n / bill bills and continue with n % bill.', '১০০, ২০, ১০, ৫, ১ এই ক্রমে: n / bill-টি নোট নিন আর n % bill নিয়ে চালিয়ে যান।')],
  walkthrough: { input: '43', steps: [{ state: '43 → 2×20, rest 3', text: L('No 100s; two 20s.', 'কোনো ১০০ নেই; দুটি ২০।') }, { state: '3 → 3×1', text: L('Total 5.', 'মোট ৫।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Five divisions.', 'পাঁচটি ভাগ।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Largest bill first', 'সবচেয়ে বড় নোট আগে'),
      idea: L('Divide by each bill from largest to smallest.', 'বড় থেকে ছোট প্রতিটি নোট দিয়ে ভাগ।'),
      explain: [L('For this set of bills, replacing any group of smaller bills by a larger one never increases the count, so the greedy is optimal. That is not true for every coin system (with coins 1, 3, 4 and amount 6, greedy uses 3 coins but 3 + 3 uses 2), which is why the DP below exists.', 'এই নোটের সেটে ছোট নোটের যেকোনো দলকে একটি বড় নোটে বদলালে সংখ্যা কখনো বাড়ে না, তাই গ্রিডি সেরা। প্রতিটি কয়েন ব্যবস্থায় এটি সত্য নয় (১, ৩, ৪ কয়েনে ৬-এর জন্য গ্রিডি ৩টি কয়েন নেয় কিন্তু ৩ + ৩-এ ২টি), তাই নিচের DP আছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    long long bills = 0;
    for (int b : {100, 20, 10, 5, 1}) {
        bills += n / b;
        n %= b;
    }
    cout << bills << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Coin-change DP (small n)', 'কয়েন-বদলের DP (ছোট n)'),
      idea: L('dp[x] = 1 + min over bills b of dp[x − b].', 'dp[x] = ১ + নোট b-এর ওপর dp[x − b]-এর সর্বনিম্ন।'),
      explain: [L('The general method for any coin system. It needs O(n) memory, impossible for n = 10⁹, but it proves the greedy right on every small n.', 'যেকোনো কয়েন ব্যবস্থার সাধারণ পদ্ধতি। এতে O(n) মেমোরি লাগে, n = ১০⁹-এ অসম্ভব, কিন্তু প্রতিটি ছোট n-এ গ্রিডিকে সঠিক প্রমাণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if (n > 10000000) return 0;   // memory: small n only
    vector<int> dp(n + 1, INT_MAX);
    dp[0] = 0;
    for (long long x = 1; x <= n; x++)
        for (int b : {1, 5, 10, 20, 100})
            if (x >= b && dp[x - b] != INT_MAX) dp[x] = min(dp[x], dp[x - b] + 1);
    cout << dp[n] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'min-max'],
    },
  ],
  tests: [
    { input: '125', output: '3', source: 'sample', note: sample(1) },
    { input: '43', output: '5', source: 'sample', note: sample(2) },
    { input: '1000000000', output: '10000000', source: 'sample', note: sample(3) },
    { input: '1', output: '1', source: 'own', note: L('Smallest n.', 'সবচেয়ে ছোট n।') },
    { input: '99', output: '10', source: 'own', note: L('4 × 20 + 10 + 5 + 4 × 1: ten bills.', '৪ × ২০ + ১০ + ৫ + ৪ × ১: দশটি নোট।') },
  ],
  pitfalls: [L('Assuming greedy always works for coins; check the coin system.', 'ধরে নেওয়া যে কয়েনে গ্রিডি সবসময় কাজ করে; কয়েন ব্যবস্থা যাচাই করুন।')],
  related: [{ id: '1472B', name: 'Fair Division', why: L('Another easy DP/greedy pair.', 'আরেকটি সহজ DP/গ্রিডি জোড়া।') }],
  toolkit: ['modulo'],
};

export const p1472B: ProblemEntry = {
  id: '1472B',
  contestId: 1472,
  index: 'B',
  name: 'Fair Division',
  rating: 800,
  tags: ['dp', 'greedy', 'math'],
  why: L('Splitting into equal halves: a case analysis, or a subset-sum DP.', 'সমান দুই ভাগ: কেস বিশ্লেষণ, বা সাবসেট-যোগফল DP।'),
  statement: L(
    'Alice and Bob have n candies, each weighing 1 or 2 grams. Can they split all candies between them (without cutting any) so that both get the same total weight? Print YES or NO for each of t test cases.',
    'অ্যালিস আর ববের n-টি ক্যান্ডি আছে, প্রতিটির ওজন ১ বা ২ গ্রাম। কোনোটি না কেটে সব ক্যান্ডি কি এমনভাবে ভাগ করা যায় যাতে দুজনের মোট ওজন সমান হয়? t-টি টেস্ট কেসের প্রতিটিতে YES বা NO প্রিন্ট করুন।',
  ),
  input: L('t; each test has n and the weights.', 't; প্রতিটি টেস্টে n আর ওজনগুলো।'),
  output: L('YES or NO for each test.', 'প্রতিটি টেস্টের জন্য YES বা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 100', '১ ≤ n ≤ ১০০')] },
  samples: [
    { input: '5\n2\n1 1\n2\n1 2\n4\n1 2 1 2\n3\n2 2 2\n3\n2 1 2', output: 'YES\nNO\nYES\nNO\nNO', explain: L('Three 2s total 6, but 3 can’t be made from 2s.', 'তিনটি ২-এর মোট ৬, কিন্তু শুধু ২ দিয়ে ৩ হয় না।') },
  ],
  observation: L('Let c1 and c2 be the counts. The total must be even, so c1 is even. If c1 = 0, each half needs an equal number of 2s, so c2 must be even. If c1 ≥ 2, the 1s can always fix the halves.', 'c1 আর c2 গণনা ধরুন। মোট জোড় হতে হবে, তাই c1 জোড়। c1 = ০ হলে প্রতিটি অর্ধেকে সমান সংখ্যক ২ লাগে, তাই c2 জোড় হতে হবে। c1 ≥ ২ হলে ১-গুলো সবসময় অর্ধেক মিলিয়ে দেয়।'),
  approach: [L('YES exactly when c1 is even and not (c1 = 0 and c2 odd).', 'c1 জোড় আর (c1 = ০ আর c2 বিজোড়) না হলেই YES।')],
  walkthrough: { input: '2 1 2', steps: [{ state: 'c1 = 1', text: L('Odd total 5: NO.', 'বিজোড় মোট ৫: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Count the weights.', 'ওজন গোনা।') },
  solutions: [
    {
      id: 'cases',
      kind: 'optimal',
      title: L('Parity case analysis', 'জোড়-বিজোড় কেস বিশ্লেষণ'),
      idea: L('c1 even, and if c1 = 0 then c2 even.', 'c1 জোড়, আর c1 = ০ হলে c2 জোড়।'),
      explain: [L('When c1 ≥ 2 and c2 is odd, give one extra 2 to one side and two 1s to the other: the 1s are exactly what make this possible.', 'c1 ≥ ২ আর c2 বিজোড় হলে এক পাশে একটি বাড়তি ২ আর অন্য পাশে দুটি ১ দিন: ১-গুলোই এটি সম্ভব করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, c1 = 0, c2 = 0;
        cin >> n;
        for (int i = 0; i < n; i++) {
            int w;
            cin >> w;
            (w == 1 ? c1 : c2)++;
        }
        bool ok = c1 % 2 == 0 && !(c1 == 0 && c2 % 2 == 1);
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
    {
      id: 'subset',
      kind: 'method',
      title: L('Subset-sum DP', 'সাবসেট-যোগফল DP'),
      idea: L('can[s] = some candies weigh exactly s; check can[total / 2].', 'can[s] = কিছু ক্যান্ডির ওজন ঠিক s; can[total / ২] দেখুন।'),
      explain: [L('This is the general tool for “split into two equal parts”, and needs no insight. Iterate s downwards so each candy is used at most once. With weights up to 2 and n ≤ 100, total ≤ 200.', 'এটি “দুটি সমান ভাগে ভাগ করো”-র সাধারণ হাতিয়ার, কোনো বিশেষ ধারণা লাগে না। s নিচের দিকে চালান যাতে প্রতিটি ক্যান্ডি সর্বোচ্চ একবার ব্যবহার হয়। ওজন সর্বোচ্চ ২ আর n ≤ ১০০ হলে মোট ≤ ২০০।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, total = 0;
        cin >> n;
        vector<int> w(n);
        for (auto& x : w) cin >> x, total += x;
        vector<bool> can(total + 1, false);
        can[0] = true;
        for (int x : w)
            for (int s = total; s >= x; s--)
                if (can[s - x]) can[s] = true;
        cout << (total % 2 == 0 && can[total / 2] ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n · total)',
      space: 'O(total)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '5\n2\n1 1\n2\n1 2\n4\n1 2 1 2\n3\n2 2 2\n3\n2 1 2', output: 'YES\nNO\nYES\nNO\nNO', source: 'sample', note: sample(1) },
    { input: '1\n3\n1 1 2', output: 'YES', source: 'own', note: L('1 + 1 vs 2.', '১ + ১ বনাম ২।') },
    { input: '1\n1\n2', output: 'NO', source: 'own', note: L('One candy.', 'একটি ক্যান্ডি।') },
  ],
  pitfalls: [L('Only checking that the total is even (2 2 2 fails).', 'শুধু মোট জোড় কি না দেখা (২ ২ ২ ব্যর্থ)।')],
  related: [{ id: '996A', name: 'Hit the Lottery', why: L('Greedy versus DP.', 'গ্রিডি বনাম DP।') }],
  toolkit: ['modulo', 'vector'],
};

export const p580A: ProblemEntry = {
  id: '580A',
  contestId: 580,
  index: 'A',
  name: 'Kefa and First Steps',
  rating: 900,
  tags: ['brute-force', 'dp', 'implementation'],
  why: L('The simplest DP over positions: the best run ending here.', 'অবস্থানের ওপর সবচেয়ে সরল DP: এখানে শেষ হওয়া সেরা ধারা।'),
  statement: L(
    'Kefa earned aᵢ money on day i. Find the length of the longest run of consecutive days in which the amounts never decrease.',
    'কেফা দিন i-তে aᵢ টাকা আয় করেছে। পরপর দিনের সবচেয়ে লম্বা ধারার দৈর্ঘ্য বের করুন যেখানে আয় কখনো কমে না।',
  ),
  input: L('n, then a₁ … aₙ.', 'n, তারপর a₁ … aₙ।'),
  output: L('The maximum length.', 'সর্বোচ্চ দৈর্ঘ্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ aᵢ ≤ 10⁹', '১ ≤ n ≤ ১০⁵, ১ ≤ aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '6\n2 2 1 3 4 1', output: '3', explain: L('1 3 4.', '১ ৩ ৪।') },
    { input: '3\n2 2 9', output: '3', explain: L('Equal values are allowed.', 'সমান মান অনুমোদিত।') },
  ],
  observation: L('len[i], the longest good run ending at day i, is len[i − 1] + 1 when aᵢ ≥ aᵢ₋₁, and 1 otherwise.', 'len[i], দিন i-তে শেষ হওয়া সবচেয়ে লম্বা ভালো ধারা, aᵢ ≥ aᵢ₋₁ হলে len[i − ১] + ১, না হলে ১।'),
  approach: [L('Keep the current run length and the best one.', 'চলতি ধারার দৈর্ঘ্য আর সেরাটি রাখুন।')],
  walkthrough: { input: '2 2 1 3 4 1', steps: [{ state: 'len 1 2 1 2 3 1', text: L('Max 3.', 'সর্বোচ্চ ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'run',
      kind: 'optimal',
      title: L('Current run length', 'চলতি ধারার দৈর্ঘ্য'),
      idea: L('Extend on ≥, reset to 1 on a drop.', '≥ হলে বাড়ান, কমলে ১-এ ফেরান।'),
      explain: [L('This is DP with only the last state kept: len[i] depends on len[i − 1] alone, so one variable is enough.', 'এটি শুধু শেষ অবস্থা রাখা DP: len[i] শুধু len[i − ১]-এর ওপর নির্ভর করে, তাই একটি ভেরিয়েবলই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long prev = 0;
    int run = 0, best = 0;
    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        run = (i > 0 && a >= prev) ? run + 1 : 1;
        best = max(best, run);
        prev = a;
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ternary', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Extend from every start', 'প্রতিটি শুরু থেকে বাড়ানো'),
      idea: L('From each i, walk right while non-decreasing.', 'প্রতিটি i থেকে না কমা পর্যন্ত ডানে চলুন।'),
      explain: [L('O(n²) on a sorted array, too slow for n = 10⁵, but obviously correct; it is the reference for the DP.', 'সাজানো অ্যারেতে O(n²), n = ১০⁵-এর জন্য খুব ধীর, কিন্তু স্পষ্টতই সঠিক; এটি DP-র রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    int best = 0;
    for (int i = 0; i < n; i++) {
        int j = i;
        while (j + 1 < n && a[j + 1] >= a[j]) j++;
        best = max(best, j - i + 1);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['while-n'],
    },
  ],
  tests: [
    { input: '6\n2 2 1 3 4 1', output: '3', source: 'sample', note: sample(1) },
    { input: '3\n2 2 9', output: '3', source: 'sample', note: sample(2) },
    { input: '1\n5', output: '1', source: 'own', note: L('One day.', 'একটি দিন।') },
    { input: '4\n4 3 2 1', output: '1', source: 'own', note: L('Strictly falling.', 'কঠোরভাবে কমছে।') },
  ],
  pitfalls: [L('Using > instead of ≥: equal days continue the run.', '≥-এর বদলে > ব্যবহার: সমান দিন ধারা চালিয়ে যায়।')],
  related: [{ id: '96A', name: 'Football', why: L('Another run counter.', 'আরেকটি ধারা কাউন্টার।') }],
  toolkit: ['min-max'],
};

export const p1475B: ProblemEntry = {
  id: '1475B',
  contestId: 1475,
  index: 'B',
  name: "New Year's Number",
  rating: 900,
  tags: ['brute-force', 'dp', 'math'],
  why: L('Representing n with two coins that differ by 1: a neat counting argument.', '১ পার্থক্যের দুটি কয়েনে n লেখা: একটি সুন্দর গণনার যুক্তি।'),
  statement: L(
    'Can n be written as a sum of some number of 2020s and some number of 2021s? Print YES or NO for each of t test cases.',
    'n-কে কি কিছু সংখ্যক ২০২০ আর কিছু সংখ্যক ২০২১-এর যোগফল হিসেবে লেখা যায়? t-টি টেস্ট কেসের প্রতিটিতে YES বা NO প্রিন্ট করুন।',
  ),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁶', '১ ≤ n ≤ ১০⁶')] },
  samples: [{ input: '5\n1\n4041\n4042\n8081\n8079', output: 'NO\nYES\nYES\nYES\nNO', explain: L('4041 = 2020 + 2021.', '৪০৪১ = ২০২০ + ২০২১।') }],
  observation: L('With k coins in total, the sum is 2020k plus the number of 2021s, which can be anything from 0 to k. So n works exactly when n mod 2020 ≤ n / 2020.', 'মোট k-টি কয়েনে যোগফল হলো ২০২০k যোগ ২০২১-এর সংখ্যা, যা ০ থেকে k পর্যন্ত যেকোনো কিছু হতে পারে। তাই n কাজ করে ঠিক তখনই যখন n mod ২০২০ ≤ n / ২০২০।'),
  approach: [L('Check n % 2020 ≤ n / 2020.', 'n % ২০২০ ≤ n / ২০২০ দেখুন।')],
  walkthrough: { input: '8079', steps: [{ state: '8079 = 3·2020 + 2019', text: L('2019 > 3: NO.', '২০১৯ > ৩: NO।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One division.', 'একটি ভাগ।') },
  solutions: [
    {
      id: 'math',
      kind: 'optimal',
      title: L('Quotient and remainder', 'ভাগফল আর ভাগশেষ'),
      idea: L('YES iff n % 2020 ≤ n / 2020.', 'n % ২০২০ ≤ n / ২০২০ হলেই YES।'),
      explain: [L('Using as many coins as possible (k = n / 2020) gives the most room: the remainder r must be covered by turning r of those 2020s into 2021s, which needs r ≤ k.', 'যত বেশি সম্ভব কয়েন (k = n / ২০২০) নিলে সবচেয়ে বেশি জায়গা: ভাগশেষ r ঢাকতে ওই ২০২০-গুলোর r-টিকে ২০২১ বানাতে হয়, যার জন্য r ≤ k লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (n % 2020 <= n / 2020 ? "YES" : "NO") << "\n";
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
      id: 'dp',
      kind: 'method',
      title: L('Reachability DP up to 10⁶', '১০⁶ পর্যন্ত পৌঁছানোর DP'),
      idea: L('ok[x] = ok[x − 2020] or ok[x − 2021]; precompute once for all tests.', 'ok[x] = ok[x − ২০২০] অথবা ok[x − ২০২১]; সব টেস্টের জন্য একবার আগে হিসাব।'),
      explain: [L('The same unbounded-knapsack DP as Cut Ribbon, but answering yes/no. Precomputing 10⁶ values once makes each test O(1), and the DP needs no math insight.', 'Cut Ribbon-এর মতো একই সীমাহীন-ন্যাপস্যাক DP, তবে হ্যাঁ/না উত্তর। একবার ১০⁶টি মান আগে হিসাব করলে প্রতিটি টেস্ট O(১) হয়, আর DP-তে কোনো গাণিতিক ধারণা লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const int N = 1000000;
    vector<bool> ok(N + 1, false);
    ok[0] = true;
    for (int x = 1; x <= N; x++)
        ok[x] = (x >= 2020 && ok[x - 2020]) || (x >= 2021 && ok[x - 2021]);
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (ok[n] ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(N + t)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '5\n1\n4041\n4042\n8081\n8079', output: 'NO\nYES\nYES\nYES\nNO', source: 'sample', note: sample(1) },
    { input: '3\n2020\n2021\n1000000', output: 'YES\nYES\nYES', source: 'own', note: L('Single coins and the limit.', 'একক কয়েন আর সীমা।') },
  ],
  pitfalls: [L('Looping over both coin counts up to 500 each for every test: fine, but the formula is simpler.', 'প্রতিটি টেস্টে দুটি কয়েনের সংখ্যা ৫০০ পর্যন্ত লুপ: চলে, কিন্তু সূত্র সহজ।')],
  related: [{ id: '189A', name: 'Cut Ribbon', why: L('The same reachability DP.', 'একই পৌঁছানোর DP।') }],
  toolkit: ['modulo'],
};

export const p1182A: ProblemEntry = {
  id: '1182A',
  contestId: 1182,
  index: 'A',
  name: 'Filling Shapes',
  rating: 1000,
  tags: ['dp', 'math'],
  why: L('Counting tilings: a DP that reduces to a power of two.', 'টাইলিং গোনা: এমন DP যা দুইয়ের ঘাতে নেমে আসে।'),
  statement: L(
    'Count the ways to fill a 3 × n grid with a given L-shaped tile of 3 cells (the shape from the statement’s picture), with no gaps or overlaps.',
    'স্টেটমেন্টের ছবির ৩ ঘরের একটি L-আকৃতির টাইল দিয়ে ফাঁক বা উপরিপাতন ছাড়া একটি ৩ × n গ্রিড ভরার উপায় গুনুন।',
  ),
  input: L('One integer n.', 'একটি পূর্ণসংখ্যা n।'),
  output: L('The number of ways.', 'উপায়ের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 60', '১ ≤ n ≤ ৬০')] },
  samples: [
    { input: '4', output: '4', explain: L('Two 3 × 2 blocks, each filled in 2 ways.', 'দুটি ৩ × ২ ব্লক, প্রতিটি ২ উপায়ে ভরা।') },
    { input: '1', output: '0', explain: L('A 3 × 1 strip cannot be filled.', '৩ × ১ ফালি ভরা যায় না।') },
  ],
  observation: L('The leftmost column can only be covered together with the second one, forming a 3 × 2 block that has exactly 2 fillings. So f(n) = 2 · f(n − 2), f(0) = 1, and odd n gives 0.', 'বামের কলাম শুধু দ্বিতীয়টির সঙ্গে মিলে ঢাকা যায়, একটি ৩ × ২ ব্লক গঠন করে যার ঠিক ২টি ভরাট। তাই f(n) = ২ · f(n − ২), f(০) = ১, আর বিজোড় n-এ ০।'),
  approach: [L('Answer 2^(n/2) for even n, 0 for odd n. 2³⁰ fits in long long.', 'জোড় n-এ উত্তর ২^(n/২), বিজোড়ে ০। ২³⁰ long long-এ আঁটে।')],
  walkthrough: { input: '4', steps: [{ state: 'f(2) = 2, f(4) = 4', text: L('Answer 4.', 'উত্তর ৪।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A shift.', 'একটি শিফট।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Power of two', 'দুইয়ের ঘাত'),
      idea: L('1LL << (n / 2) when n is even.', 'n জোড় হলে 1LL << (n / ২)।'),
      explain: [L('Each of the n/2 independent 3 × 2 blocks chooses one of 2 fillings, so the choices multiply.', 'n/২টি স্বাধীন ৩ × ২ ব্লকের প্রতিটি ২টি ভরাটের একটি বাছে, তাই সিদ্ধান্তগুলো গুণ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << (n % 2 ? 0LL : 1LL << (n / 2)) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'ternary'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('The recurrence as a DP', 'DP হিসেবে পুনরাবৃত্তি'),
      idea: L('f[0] = 1, f[i] = 2 · f[i − 2].', 'f[0] = ১, f[i] = ২ · f[i − ২]।'),
      explain: [L('Writing the recurrence first, then noticing it is a power of two, is the usual path for tiling problems. Harder tilings (2 × n dominoes) give Fibonacci instead.', 'আগে পুনরাবৃত্তি লিখে তারপর দেখা যে এটি দুইয়ের ঘাত, টাইলিং প্রবলেমের সাধারণ পথ। কঠিন টাইলিং (২ × n ডোমিনো) ফিবোনাচ্চি দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> f(n + 1, 0);
    f[0] = 1;
    for (int i = 2; i <= n; i++) f[i] = 2 * f[i - 2];
    cout << f[n] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
  ],
  tests: [
    { input: '4', output: '4', source: 'sample', note: sample(1) },
    { input: '1', output: '0', source: 'sample', note: sample(2) },
    { input: '60', output: '1073741824', source: 'own', note: L('2³⁰ needs 64 bits.', '২³⁰-এর জন্য ৬৪ বিট লাগে।') },
    { input: '59', output: '0', source: 'own', note: L('Odd n.', 'বিজোড় n।') },
  ],
  pitfalls: [L('1 << 30 is fine but 1 << 31 overflows int; use 1LL.', '1 << 30 ঠিক আছে কিন্তু 1 << 31 int ওভারফ্লো; 1LL ব্যবহার করুন।')],
  related: [{ id: '50A', name: 'Domino piling', why: L('Another tiling count.', 'আরেকটি টাইলিং গণনা।') }],
  toolkit: ['bit-shift'],
};

export const p363B: ProblemEntry = {
  id: '363B',
  contestId: 363,
  index: 'B',
  name: 'Fence',
  rating: 1100,
  tags: ['brute-force', 'dp'],
  why: L('Fixed-length window sums, by sliding or by prefix sums.', 'নির্দিষ্ট দৈর্ঘ্যের উইন্ডোর যোগফল, সরিয়ে বা প্রিফিক্স সাম দিয়ে।'),
  statement: L(
    'A fence has n planks with heights h₁ … hₙ. Find k consecutive planks with the smallest total height and print the index of the first one (1-based). If several work, print any.',
    'একটি বেড়ায় h₁ … hₙ উচ্চতার n-টি তক্তা। সবচেয়ে কম মোট উচ্চতার পরপর k-টি তক্তা খুঁজে প্রথমটির ইনডেক্স (১-ভিত্তিক) প্রিন্ট করুন। একাধিক হলে যেকোনোটি।',
  ),
  input: L('n and k, then the heights.', 'n আর k, তারপর উচ্চতাগুলো।'),
  output: L('The starting index.', 'শুরুর ইনডেক্স।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k ≤ n ≤ 1.5·10⁵, 1 ≤ hᵢ ≤ 100', '১ ≤ k ≤ n ≤ ১.৫·১০⁵, ১ ≤ hᵢ ≤ ১০০')] },
  samples: [{ input: '7 3\n1 2 6 1 1 7 1', output: '3', explain: L('Planks 3..5: 6 + 1 + 1 = 8.', 'তক্তা ৩..৫: ৬ + ১ + ১ = ৮।') }],
  observation: L('Moving the window one step right adds one plank and removes one, so each window sum costs O(1) from the previous one.', 'উইন্ডো এক ধাপ ডানে সরালে একটি তক্তা যোগ হয় আর একটি বাদ যায়, তাই প্রতিটি উইন্ডোর যোগফল আগেরটি থেকে O(১)-এ পাওয়া যায়।'),
  approach: [L('Slide a window of length k, remember the smallest sum and where it started (first one on ties).', 'k দৈর্ঘ্যের উইন্ডো সরান, সবচেয়ে ছোট যোগফল আর কোথায় শুরু হয়েছিল মনে রাখুন (সমান হলে প্রথমটি)।')],
  walkthrough: { input: '7 3\n1 2 6 1 1 7 1', steps: [{ state: 'sums 9 9 8 9 9', text: L('Smallest at start 3.', 'সবচেয়ে ছোট শুরু ৩-এ।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'slide',
      kind: 'optimal',
      title: L('Sliding window sum', 'স্লাইডিং উইন্ডো যোগফল'),
      idea: L('sum += h[i] − h[i − k].', 'sum += h[i] − h[i − k]।'),
      explain: [L('Use strict < when updating the best, so the first minimal window is kept; this matches any “print any” checker and makes the output deterministic.', 'সেরাটি আপডেটে কঠোর < ব্যবহার করুন, যাতে প্রথম সর্বনিম্ন উইন্ডো থাকে; এটি যেকোনো “যেকোনো প্রিন্ট করো” চেকারের সঙ্গে মেলে আর আউটপুট নির্দিষ্ট রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> h(n);
    for (auto& x : h) cin >> x;
    long long sum = 0;
    for (int i = 0; i < k; i++) sum += h[i];
    long long best = sum;
    int start = 0;
    for (int i = k; i < n; i++) {
        sum += h[i] - h[i - k];
        if (sum < best) { best = sum; start = i - k + 1; }
    }
    cout << start + 1 << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
    {
      id: 'prefix',
      kind: 'method',
      title: L('Prefix sums', 'প্রিফিক্স সাম'),
      idea: L('Window [i, i + k) has sum pre[i + k] − pre[i].', 'উইন্ডো [i, i + k)-এর যোগফল pre[i + k] − pre[i]।'),
      explain: [L('Prefix sums answer any range-sum question in O(1), which is more flexible than sliding when windows are not all the same length.', 'প্রিফিক্স সাম যেকোনো পরিসর-যোগফলের প্রশ্নের উত্তর O(১)-এ দেয়, যা সব উইন্ডো একই দৈর্ঘ্যের না হলে সরানোর চেয়ে নমনীয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        pre[i + 1] = pre[i] + x;
    }
    int start = 0;
    for (int i = 1; i + k <= n; i++)
        if (pre[i + k] - pre[i] < pre[start + k] - pre[start]) start = i;
    cout << start + 1 << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum'],
    },
  ],
  tests: [
    { input: '7 3\n1 2 6 1 1 7 1', output: '3', source: 'sample', note: sample(1) },
    { input: '1 1\n5', output: '1', source: 'own', note: L('One plank.', 'একটি তক্তা।') },
    { input: '4 4\n1 2 3 4', output: '1', source: 'own', note: L('k = n.', 'k = n।') },
  ],
  pitfalls: [L('Recomputing each window from scratch: O(n · k).', 'প্রতিটি উইন্ডো শুরু থেকে হিসাব: O(n · k)।'), L('Printing a 0-based index.', '০-ভিত্তিক ইনডেক্স প্রিন্ট।')],
  related: [{ id: '279B', name: 'Books', why: L('A variable-length window.', 'পরিবর্তনশীল দৈর্ঘ্যের উইন্ডো।') }],
  toolkit: ['prefix-sum'],
};

export const p489B: ProblemEntry = {
  id: '489B',
  contestId: 489,
  index: 'B',
  name: 'BerSU Ball',
  rating: 1200,
  tags: ['dfs', 'dp', 'greedy', 'matchings', 'sortings', 'two-pointers'],
  featuredFor: ['matchings'],
  why: L('Maximum matching that becomes a greedy two-pointer scan after sorting.', 'সর্বোচ্চ ম্যাচিং যা সর্টের পর গ্রিডি টু-পয়েন্টার স্ক্যানে পরিণত হয়।'),
  statement: L(
    'n boys and m girls have dancing skills. A boy and a girl can form a pair if their skills differ by at most 1, and everyone dances in at most one pair. What is the largest number of pairs?',
    'n জন ছেলে আর m জন মেয়ের নাচের দক্ষতা আছে। দক্ষতার পার্থক্য সর্বোচ্চ ১ হলে একজন ছেলে আর একজন মেয়ে জোড়া হতে পারে, আর প্রত্যেকে সর্বোচ্চ একটি জোড়ায় নাচে। সর্বোচ্চ কয়টি জোড়া হতে পারে?',
  ),
  input: L('n and the boys’ skills, then m and the girls’ skills.', 'n আর ছেলেদের দক্ষতা, তারপর m আর মেয়েদের দক্ষতা।'),
  output: L('The maximum number of pairs.', 'সর্বোচ্চ জোড়ার সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 100; skills ≤ 100', '১ ≤ n, m ≤ ১০০; দক্ষতা ≤ ১০০')] },
  samples: [
    { input: '4\n1 4 6 2\n5\n5 1 5 7 9', output: '3', explain: L('1–1, 4–5, 6–5 (or 6–7).', '১–১, ৪–৫, ৬–৫ (বা ৬–৭)।') },
    { input: '4\n1 2 3 4\n4\n10 11 12 13', output: '0', explain: L('Nobody is close enough.', 'কেউ যথেষ্ট কাছে নয়।') },
    { input: '5\n1 1 1 1 1\n3\n1 2 3', output: '2', explain: L('Only girls 1 and 2 can be matched.', 'শুধু মেয়ে ১ আর ২ মেলানো যায়।') },
  ],
  observation: L('Sort both lists. The weakest unmatched boy and girl: if they are compatible, pairing them never hurts; if not, the weaker one cannot pair with anybody remaining and can be dropped.', 'দুটি তালিকা সর্ট করুন। সবচেয়ে দুর্বল অমিলিত ছেলে আর মেয়ে: মিললে জোড়া করায় কখনো ক্ষতি নেই; না মিললে দুর্বলজন বাকি কারও সঙ্গে জোড়া হতে পারে না আর বাদ দেওয়া যায়।'),
  approach: [L('Two pointers over the sorted lists.', 'সাজানো তালিকার ওপর টু পয়েন্টার।')],
  walkthrough: {
    input: 'boys 1 2 4 6, girls 1 5 5 7 9',
    steps: [
      { state: '1–1 pair', text: L('Both advance.', 'দুটোই এগোয়।') },
      { state: '2 vs 5: boy too weak', text: L('Drop boy 2.', 'ছেলে ২ বাদ।') },
      { state: '4–5, 6–5', text: L('Two more pairs. Total 3.', 'আরও দুটি জোড়া। মোট ৩।') },
    ],
  },
  complexity: { time: 'O(n log n + m log m)', space: 'O(n + m)', why: L('Sorting.', 'সর্টিং।') },
  solutions: [
    {
      id: 'two-pointers',
      kind: 'optimal',
      title: L('Sort and match greedily', 'সর্ট করে গ্রিডিভাবে মেলানো'),
      idea: L('Match when |a − b| ≤ 1, else advance the smaller.', '|a − b| ≤ ১ হলে মেলান, না হলে ছোটটি এগোন।'),
      explain: [L('Exchange argument: if an optimal matching pairs the weakest boy b with some girl g′ while the weakest girl g is compatible with b, swapping g and g′ keeps every pair valid, so pairing b with g is safe.', 'বিনিময় যুক্তি: কোনো সেরা ম্যাচিং যদি সবচেয়ে দুর্বল ছেলে b-কে অন্য মেয়ে g′-এর সঙ্গে জোড়া দেয় অথচ সবচেয়ে দুর্বল মেয়ে g, b-এর সঙ্গে মেলে, তাহলে g আর g′ অদলবদল করলে প্রতিটি জোড়া বৈধ থাকে, তাই b-কে g-এর সঙ্গে জোড়া নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    cin >> m;
    vector<int> b(m);
    for (auto& x : b) cin >> x;
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    int i = 0, j = 0, pairs = 0;
    while (i < n && j < m) {
        if (abs(a[i] - b[j]) <= 1) { pairs++; i++; j++; }
        else if (a[i] < b[j]) i++;
        else j++;
    }
    cout << pairs << "\n";
    return 0;
}
`,
      time: 'O(n log n + m log m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'while-n'],
    },
    {
      id: 'kuhn',
      kind: 'method',
      title: L('General bipartite matching (Kuhn)', 'সাধারণ বাইপার্টাইট ম্যাচিং (কুন)'),
      idea: L('Build edges between compatible boys and girls and find a maximum matching with augmenting paths.', 'মেলে এমন ছেলে আর মেয়ের মধ্যে প্রান্ত বানিয়ে অগমেন্টিং পথ দিয়ে সর্বোচ্চ ম্যাচিং খুঁজুন।'),
      explain: [L('This works for any compatibility rule, not just “skills differ by at most 1”. Here n, m ≤ 100, so O(n · edges) is tiny. It is also a reference that does not depend on the greedy proof.', 'এটি যেকোনো মিলের নিয়মে কাজ করে, শুধু “দক্ষতার পার্থক্য সর্বোচ্চ ১” নয়। এখানে n, m ≤ ১০০, তাই O(n · প্রান্ত) খুব ছোট। এটি গ্রিডির প্রমাণের ওপর নির্ভর করে না এমন রেফারেন্সও।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m;
vector<int> a, b, matchGirl;
vector<bool> used;

bool tryBoy(int v) {
    for (int g = 0; g < m; g++) {
        if (abs(a[v] - b[g]) > 1 || used[g]) continue;
        used[g] = true;
        if (matchGirl[g] == -1 || tryBoy(matchGirl[g])) { matchGirl[g] = v; return true; }
    }
    return false;
}

int main() {
    cin >> n;
    a.resize(n);
    for (auto& x : a) cin >> x;
    cin >> m;
    b.resize(m);
    for (auto& x : b) cin >> x;
    matchGirl.assign(m, -1);
    int pairs = 0;
    for (int v = 0; v < n; v++) {
        used.assign(m, false);
        if (tryBoy(v)) pairs++;
    }
    cout << pairs << "\n";
    return 0;
}
`,
      time: 'O(n · n · m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['functions', 'vector'],
    },
  ],
  tests: [
    { input: '4\n1 4 6 2\n5\n5 1 5 7 9', output: '3', source: 'sample', note: sample(1) },
    { input: '4\n1 2 3 4\n4\n10 11 12 13', output: '0', source: 'sample', note: sample(2) },
    { input: '5\n1 1 1 1 1\n3\n1 2 3', output: '2', source: 'sample', note: sample(3) },
    { input: '1\n100\n1\n99', output: '1', source: 'own', note: L('Difference exactly 1.', 'পার্থক্য ঠিক ১।') },
  ],
  pitfalls: [L('Not sorting before the two-pointer scan.', 'টু-পয়েন্টার স্ক্যানের আগে সর্ট না করা।')],
  related: [{ id: '279B', name: 'Books', why: L('Two pointers again.', 'আবার টু পয়েন্টার।') }],
  toolkit: ['sort'],
};

export const p433B: ProblemEntry = {
  id: '433B',
  contestId: 433,
  index: 'B',
  name: "Kuriyama Mirai's Stones",
  rating: 1200,
  tags: ['dp', 'implementation', 'sortings'],
  why: L('Range sums on two arrays at once: the original and a sorted copy.', 'একসঙ্গে দুটি অ্যারেতে পরিসরের যোগফল: মূলটি আর একটি সাজানো কপি।'),
  statement: L(
    'There are n stones with costs v₁ … vₙ. Answer m questions. Type 1: the sum of vₗ … vᵣ. Type 2: the sum of the l-th to r-th cheapest stones (positions l..r after sorting the costs).',
    'n-টি পাথর, দাম v₁ … vₙ। m-টি প্রশ্নের উত্তর দিন। ধরন ১: vₗ … vᵣ-এর যোগফল। ধরন ২: l-তম থেকে r-তম সস্তা পাথরের যোগফল (দাম সর্টের পর l..r অবস্থান)।',
  ),
  input: L('n, the costs, m, then m lines “type l r”.', 'n, দামগুলো, m, তারপর m-টি লাইন “type l r”।'),
  output: L('The answer to each question.', 'প্রতিটি প্রশ্নের উত্তর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁵, 1 ≤ vᵢ ≤ 10⁹', '১ ≤ n, m ≤ ১০⁵, ১ ≤ vᵢ ≤ ১০⁹')] },
  samples: [{ input: '6\n6 4 2 7 2 7\n3\n2 3 6\n1 3 4\n1 1 6', output: '24\n9\n28', explain: L('Sorted: 2 2 4 6 7 7; positions 3..6 sum to 24.', 'সাজানো: ২ ২ ৪ ৬ ৭ ৭; অবস্থান ৩..৬-এর যোগফল ২৪।') }],
  observation: L('Both question types are range sums, one over the original array and one over the sorted array. Build prefix sums for both once.', 'দুই ধরনের প্রশ্নই পরিসরের যোগফল, একটি মূল অ্যারের ওপর আর একটি সাজানো অ্যারের ওপর। দুটিরই প্রিফিক্স সাম একবার বানান।'),
  approach: [L('pre1 over v, pre2 over sorted v; answer = pre[r] − pre[l − 1].', 'v-এর ওপর pre1, সাজানো v-এর ওপর pre2; উত্তর = pre[r] − pre[l − ১]।')],
  walkthrough: { input: '1 3 4', steps: [{ state: 'v₃ + v₄ = 2 + 7', text: L('9.', '৯।') }] },
  complexity: { time: 'O(n log n + m)', space: 'O(n)', why: L('A sort, then O(1) per question.', 'একটি সর্ট, তারপর প্রতি প্রশ্নে O(১)।') },
  solutions: [
    {
      id: 'prefix',
      kind: 'optimal',
      title: L('Two prefix-sum arrays', 'দুটি প্রিফিক্স-সাম অ্যারে'),
      idea: L('One for the original order, one for the sorted order.', 'একটি মূল ক্রমের জন্য, একটি সাজানো ক্রমের জন্য।'),
      explain: [L('Sums reach 10¹⁴, so use long long. Read with fast IO: up to 4·10⁵ numbers.', 'যোগফল ১০¹⁴ পর্যন্ত যায়, তাই long long। দ্রুত IO দিয়ে পড়ুন: সর্বোচ্চ ৪·১০⁵টি সংখ্যা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> v(n);
    for (auto& x : v) cin >> x;
    vector<long long> s = v;
    sort(s.begin(), s.end());
    vector<long long> p1(n + 1, 0), p2(n + 1, 0);
    for (int i = 0; i < n; i++) p1[i + 1] = p1[i] + v[i], p2[i + 1] = p2[i] + s[i];
    int m;
    cin >> m;
    while (m--) {
        int type, l, r;
        cin >> type >> l >> r;
        auto& p = (type == 1) ? p1 : p2;
        cout << p[r] - p[l - 1] << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n + m)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'sort', 'io-fast'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Sum each range directly', 'প্রতিটি পরিসর সরাসরি যোগ'),
      idea: L('Loop from l to r for every question.', 'প্রতিটি প্রশ্নে l থেকে r পর্যন্ত লুপ।'),
      explain: [L('n · m = 10¹⁰ in the worst case. The prefix-sum version answers the same thing in O(1) per question; this one is kept as the reference.', 'সবচেয়ে খারাপ ক্ষেত্রে n · m = ১০¹⁰। প্রিফিক্স-সাম সংস্করণ একই উত্তর প্রতি প্রশ্নে O(১)-এ দেয়; এটি রেফারেন্স হিসেবে রাখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> v(n);
    for (auto& x : v) cin >> x;
    vector<long long> s = v;
    sort(s.begin(), s.end());
    int m;
    cin >> m;
    while (m--) {
        int type, l, r;
        cin >> type >> l >> r;
        long long sum = 0;
        for (int i = l - 1; i < r; i++) sum += (type == 1 ? v[i] : s[i]);
        cout << sum << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '6\n6 4 2 7 2 7\n3\n2 3 6\n1 3 4\n1 1 6', output: '24\n9\n28', source: 'sample', note: sample(1) },
    { input: '2\n1000000000 1000000000\n1\n1 1 2', output: '2000000000', source: 'own', note: L('Needs long long.', 'long long লাগে।') },
  ],
  pitfalls: [L('Sorting the original array and losing type-1 answers.', 'মূল অ্যারে সর্ট করে ধরন-১-এর উত্তর হারানো।'), L('int sums.', 'int যোগফল।')],
  related: [{ id: '363B', name: 'Fence', why: L('Prefix sums again.', 'আবার প্রিফিক্স সাম।') }],
  toolkit: ['prefix-sum', 'sort'],
};
