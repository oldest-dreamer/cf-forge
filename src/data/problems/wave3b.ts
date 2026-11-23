import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p476B: ProblemEntry = {
  id: '476B',
  contestId: 476,
  index: 'B',
  name: 'Dreamoon and WiFi',
  rating: 1300,
  tags: ['bitmasks', 'brute-force', 'combinatorics', 'dp', 'math', 'probabilities'],
  featuredFor: ['probabilities'],
  why: L('A probability found by counting equally likely outcomes, three ways.', 'সমান সম্ভাব্য ফল গুনে বের করা সম্ভাবনা, তিন উপায়ে।'),
  statement: L(
    'Drazil sends a list of + and − commands (move +1 or −1). Dreamoon receives a list of the same length, but some commands are unreadable (?); for each ? he flips a fair coin and moves +1 or −1. What is the probability he ends at the position Drazil intended?',
    'ড্রাজিল + আর − নির্দেশের একটি তালিকা পাঠায় (+১ বা −১ সরা)। ড্রিমুন একই দৈর্ঘ্যের তালিকা পায়, কিন্তু কিছু নির্দেশ অপাঠ্য (?); প্রতিটি ?-এর জন্য সে একটি ন্যায্য কয়েন টস করে +১ বা −১ সরে। সে ড্রাজিলের উদ্দিষ্ট অবস্থানে শেষ হওয়ার সম্ভাবনা কত?',
  ),
  input: L('Two strings: Drazil’s commands, then Dreamoon’s.', 'দুটি স্ট্রিং: ড্রাজিলের নির্দেশ, তারপর ড্রিমুনের।'),
  output: L('The probability, with absolute or relative error at most 10⁻⁹.', 'সম্ভাবনা, পরম বা আপেক্ষিক ত্রুটি সর্বোচ্চ ১০⁻⁹।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Length ≤ 10', 'দৈর্ঘ্য ≤ ১০')] },
  samples: [
    { input: '++-+-\n+-+-+', output: '1.000000000000', explain: L('Both end at +1.', 'দুটোই +১-এ শেষ।') },
    { input: '+-+-\n+-??', output: '0.500000000000', explain: L('The two ? must be one + and one −: 2 of 4 outcomes.', 'দুটি ?-কে একটি + আর একটি − হতে হবে: ৪টির ২টি ফল।') },
    { input: '+++\n??-', output: '0.000000000000', explain: L('Target 3 is unreachable with a −.', 'একটি − থাকলে লক্ষ্য ৩ অপ্রাপ্য।') },
  ],
  observation: L('With k question marks there are 2ᵏ equally likely outcomes. Only the number of + among them matters.', 'k-টি প্রশ্নচিহ্নে ২ᵏটি সমান সম্ভাব্য ফল। এদের মধ্যে কতগুলো + তা-ই গুরুত্বপূর্ণ।'),
  approach: [L('Let need = target − known position. You need (k + need)/2 pluses among the k unknowns: probability C(k, that) / 2ᵏ, or 0 if it is not a whole number in [0, k].', 'ধরুন need = লক্ষ্য − জানা অবস্থান। k-টি অজানার মধ্যে (k + need)/২টি + দরকার: সম্ভাবনা C(k, সেটি) / ২ᵏ, অথবা যদি এটি [০, k]-এ পূর্ণসংখ্যা না হয় তবে ০।')],
  walkthrough: { input: '+-+-\n+-??', steps: [{ state: 'target 0, known 0, k = 2', text: L('Need 0: one plus. C(2,1)/4 = 0.5.', 'need ০: একটি প্লাস। C(২,১)/৪ = ০.৫।') }] },
  complexity: { time: 'O(2ᵏ · k)', space: 'O(1)', why: L('k ≤ 10.', 'k ≤ ১০।') },
  solutions: [
    {
      id: 'enumerate',
      kind: 'method',
      title: L('Enumerate all coin outcomes', 'সব কয়েন ফল গণনা'),
      idea: L('Each mask over the ? positions is one equally likely outcome.', '? অবস্থানগুলোর ওপর প্রতিটি mask একটি সমান সম্ভাব্য ফল।'),
      explain: [L('Count masks whose final position equals the target and divide by 2ᵏ. With k ≤ 10 there are at most 1024 masks.', 'যে mask-গুলোর শেষ অবস্থান লক্ষ্যের সমান সেগুলো গুনে ২ᵏ দিয়ে ভাগ করুন। k ≤ ১০ হলে সর্বোচ্চ ১০২৪টি mask।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int target = 0, known = 0, k = 0;
    for (char c : a) target += (c == '+') ? 1 : -1;
    for (char c : b) {
        if (c == '?') k++;
        else known += (c == '+') ? 1 : -1;
    }
    int good = 0;
    for (int mask = 0; mask < (1 << k); mask++) {
        int pos = known;
        for (int i = 0; i < k; i++) pos += (mask >> i & 1) ? 1 : -1;
        if (pos == target) good++;
    }
    printf("%.12f\n", (double)good / (1 << k));
    return 0;
}
`,
      time: 'O(2ᵏ · k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'setprecision'],
    },
    {
      id: 'binomial',
      kind: 'optimal',
      title: L('Binomial coefficient', 'দ্বিপদী সহগ'),
      idea: L('C(k, p) / 2ᵏ with p = (k + need) / 2.', 'p = (k + need) / ২ সহ C(k, p) / ২ᵏ।'),
      explain: [L('p pluses and k − p minuses move by p − (k − p) = 2p − k, which must equal need. The number of ways to pick which p of the k coins land +, C(k, p), counts the good outcomes directly.', 'p-টি প্লাস আর k − p-টি মাইনাস p − (k − p) = ২p − k সরায়, যা need-এর সমান হতে হবে। k-টি কয়েনের কোন p-টি + হবে তা বাছার উপায় C(k, p) সরাসরি ভালো ফল গোনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int need = 0, k = 0;
    for (char c : a) need += (c == '+') ? 1 : -1;
    for (char c : b) {
        if (c == '?') k++;
        else need -= (c == '+') ? 1 : -1;
    }
    double ans = 0;
    if ((k + need) % 2 == 0 && abs(need) <= k) {
        int p = (k + need) / 2;
        double c = 1;
        for (int i = 0; i < p; i++) c = c * (k - i) / (i + 1);
        ans = c / (1 << k);
    }
    printf("%.12f\n", ans);
    return 0;
}
`,
      time: 'O(k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'dp',
      kind: 'alt',
      title: L('Probability DP over positions', 'অবস্থানের ওপর সম্ভাবনার DP'),
      idea: L('prob[pos] after each command; a ? splits the probability half and half.', 'প্রতিটি নির্দেশের পর prob[pos]; ? সম্ভাবনাকে অর্ধেক-অর্ধেক ভাগ করে।'),
      explain: [L('This is the method that still works when the coin is unfair or the moves are more varied: push probability mass forward step by step. Positions range over [−10, 10], so shift by 10 to index an array.', 'কয়েন অন্যায্য হলে বা চাল আরও বৈচিত্র্যময় হলেও এই পদ্ধতি কাজ করে: ধাপে ধাপে সম্ভাবনার ভর সামনে ঠেলুন। অবস্থান [−১০, ১০]-এ থাকে, তাই অ্যারেতে ইনডেক্স করতে ১০ সরান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int target = 0;
    for (char c : a) target += (c == '+') ? 1 : -1;
    const int OFF = 12;
    vector<double> prob(2 * OFF + 1, 0.0);
    prob[OFF] = 1.0;
    for (char c : b) {
        vector<double> next(2 * OFF + 1, 0.0);
        for (int p = 1; p < 2 * OFF; p++) {
            if (prob[p] == 0) continue;
            if (c == '+') next[p + 1] += prob[p];
            else if (c == '-') next[p - 1] += prob[p];
            else next[p + 1] += prob[p] / 2, next[p - 1] += prob[p] / 2;
        }
        prob = next;
    }
    printf("%.12f\n", prob[target + OFF]);
    return 0;
}
`,
      time: 'O(n · range)',
      space: 'O(range)',
      accepted: true,
      toolkit: ['vector', 'setprecision'],
    },
  ],
  tests: [
    { input: '++-+-\n+-+-+', output: '1.000000000000', source: 'sample', note: sample(1) },
    { input: '+-+-\n+-??', output: '0.500000000000', source: 'sample', note: sample(2) },
    { input: '+++\n??-', output: '0.000000000000', source: 'sample', note: sample(3) },
    { input: '++++++++++\n??????????', output: '0.000976562500', source: 'own', note: L('All ten must be +: 1/1024.', 'দশটিকেই + হতে হবে: ১/১০২৪।') },
  ],
  pitfalls: [L('Integer division in good / 2ᵏ.', 'good / ২ᵏ-এ পূর্ণসংখ্যার ভাগ।'), L('Printing too few decimals.', 'খুব কম দশমিক প্রিন্ট।')],
  related: [{ id: '1097B', name: 'Petr and a Combination Lock', why: L('Enumerate sign choices with a mask.', 'mask দিয়ে চিহ্নের সিদ্ধান্ত গণনা।') }],
  toolkit: ['bit-shift', 'setprecision'],
};

export const p489C: ProblemEntry = {
  id: '489C',
  contestId: 489,
  index: 'C',
  name: 'Given Length and Sum of Digits...',
  rating: 1400,
  tags: ['dp', 'greedy', 'implementation'],
  featuredFor: ['greedy'],
  why: L('Building the smallest and largest numbers digit by digit, with a feasibility check at each step.', 'প্রতিটি ধাপে সম্ভাব্যতা যাচাইসহ অঙ্ক ধরে ধরে সবচেয়ে ছোট আর বড় সংখ্যা বানানো।'),
  statement: L(
    'Find the smallest and the largest m-digit numbers (no leading zeros) whose digits sum to s. If none exist, print “−1 −1”.',
    'এমন সবচেয়ে ছোট আর সবচেয়ে বড় m অঙ্কের সংখ্যা (শুরুতে শূন্য ছাড়া) বের করুন যাদের অঙ্কের যোগফল s। না থাকলে “−১ −১” প্রিন্ট করুন।',
  ),
  input: L('m and s.', 'm আর s।'),
  output: L('The smallest and the largest number.', 'সবচেয়ে ছোট আর সবচেয়ে বড় সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ m ≤ 100, 0 ≤ s ≤ 900', '১ ≤ m ≤ ১০০, ০ ≤ s ≤ ৯০০')] },
  samples: [
    { input: '2 15', output: '69 96', explain: L('6 + 9 = 15.', '৬ + ৯ = ১৫।') },
    { input: '3 0', output: '-1 -1', explain: L('A 3-digit number cannot have digit sum 0.', '৩ অঙ্কের সংখ্যার অঙ্কের যোগফল ০ হতে পারে না।') },
  ],
  observation: L('A sum s is possible with m digits when 1 ≤ s ≤ 9m (or s = 0 and m = 1, the number 0). For the largest number put as much as possible in the leftmost digits; for the smallest, as little as possible while the rest can still reach s.', 'm অঙ্কে যোগফল s সম্ভব যখন ১ ≤ s ≤ ৯m (বা s = ০ আর m = ১, সংখ্যা ০)। সবচেয়ে বড় সংখ্যায় বাম দিকের অঙ্কে যত বেশি সম্ভব দিন; সবচেয়ে ছোটটিতে যত কম সম্ভব, যাতে বাকিরা তখনও s-এ পৌঁছাতে পারে।'),
  approach: [L('Largest: each digit min(9, remaining). Smallest: fill from the right with 9s using s − 1, and put the remaining + 1 in the first digit.', 'সবচেয়ে বড়: প্রতিটি অঙ্ক min(৯, বাকি)। সবচেয়ে ছোট: s − ১ দিয়ে ডান থেকে ৯ বসান, আর বাকি + ১ প্রথম অঙ্কে দিন।')],
  walkthrough: { input: '2 15', steps: [{ state: 'max: 9, 6', text: L('96.', '৯৬।') }, { state: 'min: last digit min(9, 14) = 9, first 1 + 5 = 6', text: L('69.', '৬৯।') }] },
  complexity: { time: 'O(m)', space: 'O(m)', why: L('One pass per number.', 'প্রতিটি সংখ্যায় একবার।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Fill from the left for max, from the right for min', 'সর্বোচ্চের জন্য বাম থেকে, সর্বনিম্নের জন্য ডান থেকে'),
      idea: L('Big digits first for the max; for the min, keep 1 in reserve for the leading digit.', 'সর্বোচ্চে আগে বড় অঙ্ক; সর্বনিম্নে প্রথম অঙ্কের জন্য ১ জমা রাখুন।'),
      explain: [L('For the smallest number, the first digit must be at least 1 and as small as possible, so the later digits should take as much of the sum as they can, which means 9s at the right end.', 'সবচেয়ে ছোট সংখ্যায় প্রথম অঙ্ক অন্তত ১ আর যত ছোট সম্ভব হতে হবে, তাই পরের অঙ্কগুলোকে যোগফলের যত বেশি সম্ভব নিতে হবে, অর্থাৎ ডান প্রান্তে ৯।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int m, s;
    cin >> m >> s;
    if (s == 0) {
        cout << (m == 1 ? "0 0" : "-1 -1") << "\n";
        return 0;
    }
    if (s > 9 * m) {
        cout << "-1 -1\n";
        return 0;
    }
    string mx(m, '0'), mn(m, '0');
    int rem = s;
    for (int i = 0; i < m; i++) {
        int d = min(9, rem);
        mx[i] = char('0' + d);
        rem -= d;
    }
    rem = s - 1;
    for (int i = m - 1; i > 0; i--) {
        int d = min(9, rem);
        mn[i] = char('0' + d);
        rem -= d;
    }
    mn[0] = char('0' + 1 + rem);
    cout << mn << " " << mx << "\n";
    return 0;
}
`,
      time: 'O(m)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['string-basics', 'min-max'],
    },
    {
      id: 'check',
      kind: 'method',
      title: L('Digit by digit with a feasibility check', 'সম্ভাব্যতা যাচাইসহ অঙ্ক ধরে ধরে'),
      idea: L('At each position try digits in order and keep the first that leaves a reachable remainder.', 'প্রতিটি অবস্থানে ক্রমে অঙ্ক চেষ্টা করুন আর প্রথম যেটি প্রাপ্য বাকি রাখে সেটি রাখুন।'),
      explain: [L('can(k, r): k more digits can sum to r exactly when 0 ≤ r ≤ 9k. For the smallest number try 0..9 (1..9 for the first digit); for the largest try 9..0. This general method works for many “lexicographically smallest valid answer” problems.', 'can(k, r): আরও k-টি অঙ্কের যোগফল r হতে পারে ঠিক তখনই যখন ০ ≤ r ≤ ৯k। সবচেয়ে ছোট সংখ্যার জন্য ০..৯ (প্রথম অঙ্কে ১..৯) চেষ্টা করুন; সবচেয়ে বড়টির জন্য ৯..০। এই সাধারণ পদ্ধতি অনেক “অভিধানক্রমে সবচেয়ে ছোট বৈধ উত্তর” প্রবলেমে কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int m, s;
bool can(int k, int r) { return r >= 0 && r <= 9 * k; }

string build(bool smallest) {
    string res;
    int rem = s;
    for (int i = 0; i < m; i++) {
        bool placed = false;
        for (int t = 0; t <= 9 && !placed; t++) {
            int d = smallest ? t : 9 - t;
            if (i == 0 && d == 0 && m > 1) continue;
            if (can(m - i - 1, rem - d)) { res += char('0' + d); rem -= d; placed = true; }
        }
        if (!placed) return "-1";
    }
    return res;
}

int main() {
    cin >> m >> s;
    string a = build(true), b = build(false);
    if (a == "-1" || b == "-1") cout << "-1 -1\n";
    else cout << a << " " << b << "\n";
    return 0;
}
`,
      time: 'O(10 · m)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['functions', 'string-basics'],
    },
  ],
  tests: [
    { input: '2 15', output: '69 96', source: 'sample', note: sample(1) },
    { input: '3 0', output: '-1 -1', source: 'sample', note: sample(2) },
    { input: '1 0', output: '0 0', source: 'own', note: L('The number 0 itself.', 'সংখ্যা ০ নিজে।') },
    { input: '2 19', output: '-1 -1', source: 'own', note: L('More than 9m.', '৯m-এর বেশি।') },
    { input: '3 1', output: '100 100', source: 'own', note: L('Sum 1.', 'যোগফল ১।') },
  ],
  pitfalls: [L('Forgetting m = 1, s = 0.', 'm = ১, s = ০ ভুলে যাওয়া।'), L('Leading zero in the smallest number.', 'সবচেয়ে ছোট সংখ্যায় শুরুতে শূন্য।')],
  related: [{ id: '1343B', name: 'Balanced Array', why: L('Another construction.', 'আরেকটি গঠন।') }],
  toolkit: ['string-basics'],
};

export const p698A: ProblemEntry = {
  id: '698A',
  contestId: 698,
  index: 'A',
  name: 'Vacations',
  rating: 1400,
  tags: ['dp'],
  why: L('The model “state = what I did yesterday” DP.', 'আদর্শ “অবস্থা = গতকাল কী করেছি” DP।'),
  statement: L(
    'For each of n days you know aᵢ: 0 means the gym is closed and there is no contest, 1 means only a contest, 2 means only the gym is open, 3 means both. Each day Vasya rests, writes the contest (if any) or goes to the gym (if open), but he never does the same activity on two consecutive days. Minimise the number of rest days.',
    'n দিনের প্রতিটির জন্য aᵢ জানা: ০ মানে জিম বন্ধ আর কোনো কনটেস্ট নেই, ১ মানে শুধু কনটেস্ট, ২ মানে শুধু জিম খোলা, ৩ মানে দুটোই। প্রতিদিন ভাস্যা বিশ্রাম নেয়, কনটেস্ট দেয় (থাকলে) বা জিমে যায় (খোলা থাকলে), কিন্তু পরপর দুদিন কখনো একই কাজ করে না। বিশ্রামের দিন সর্বনিম্ন করুন।',
  ),
  input: L('n, then a₁ … aₙ.', 'n, তারপর a₁ … aₙ।'),
  output: L('The minimum number of rest days.', 'সর্বনিম্ন বিশ্রামের দিন।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100', '১ ≤ n ≤ ১০০')] },
  samples: [
    { input: '4\n1 3 2 0', output: '2', explain: L('Contest, gym, rest, rest.', 'কনটেস্ট, জিম, বিশ্রাম, বিশ্রাম।') },
    { input: '7\n1 3 3 2 1 2 3', output: '0', explain: L('Alternate every day.', 'প্রতিদিন পালাক্রমে।') },
    { input: '2\n2 2', output: '1', explain: L('No gym twice in a row.', 'পরপর দুবার জিম নয়।') },
  ],
  observation: L('Whether today’s activity is allowed depends only on yesterday’s activity. So keep the best result for each possible “last activity”.', 'আজকের কাজ অনুমোদিত কি না তা শুধু গতকালের কাজের ওপর নির্ভর করে। তাই প্রতিটি সম্ভাব্য “শেষ কাজ”-এর জন্য সেরা ফল রাখুন।'),
  approach: [L('dp[i][j] = minimum rests in the first i days if day i ended with j (0 rest, 1 contest, 2 gym).', 'dp[i][j] = প্রথম i দিনে সর্বনিম্ন বিশ্রাম যদি দিন i j দিয়ে শেষ হয় (০ বিশ্রাম, ১ কনটেস্ট, ২ জিম)।')],
  walkthrough: { input: '2 2', steps: [{ state: 'day 1: gym 0, rest 1', text: L('Day 2 gym needs yesterday ≠ gym.', 'দিন ২-এ জিমের জন্য গতকাল জিম না হতে হবে।') }, { state: 'day 2: gym 1, rest 1', text: L('Answer 1.', 'উত্তর ১।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Three states per day.', 'প্রতিদিন তিনটি অবস্থা।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('DP on yesterday’s activity', 'গতকালের কাজের ওপর DP'),
      idea: L('Rest: 1 + best of anything; contest/gym: best of the other two states.', 'বিশ্রাম: ১ + যেকোনোটির সেরা; কনটেস্ট/জিম: অন্য দুটি অবস্থার সেরা।'),
      explain: [L('Impossible states (contest on a day without one) stay at a large value so they are never chosen. The answer is the best of the three states after the last day.', 'অসম্ভব অবস্থা (কনটেস্ট নেই এমন দিনে কনটেস্ট) বড় মানে থাকে যাতে কখনো বাছা না হয়। উত্তর শেষ দিনের পর তিনটি অবস্থার সেরাটি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    const int INF = 1e9;
    array<int, 3> dp = {0, INF, INF};   // before day 1: "rested"
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        array<int, 3> nd = {INF, INF, INF};
        nd[0] = 1 + min({dp[0], dp[1], dp[2]});
        if (a == 1 || a == 3) nd[1] = min(dp[0], dp[2]);
        if (a == 2 || a == 3) nd[2] = min(dp[0], dp[1]);
        dp = nd;
    }
    cout << min({dp[0], dp[1], dp[2]}) << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max'],
    },
    {
      id: 'greedy',
      kind: 'method',
      title: L('Greedy with a flexible day', 'নমনীয় দিনসহ গ্রিডি'),
      idea: L('Do whatever is allowed; on a “both” day after a rest, stay undecided.', 'যা অনুমোদিত তা-ই করুন; বিশ্রামের পর “দুটোই” দিনে সিদ্ধান্ত খোলা রাখুন।'),
      explain: [L('Doing an activity instead of resting is never worse. The only choice is on a day with both options: if yesterday was fixed, pick the other one; if yesterday was a rest or itself undecided, today can still adapt to tomorrow, so mark it undecided.', 'বিশ্রামের বদলে কাজ করা কখনো খারাপ নয়। একমাত্র সিদ্ধান্ত দুটো বিকল্পের দিনে: গতকাল নির্দিষ্ট হলে অন্যটি বাছুন; গতকাল বিশ্রাম বা নিজেই অনির্ধারিত হলে আজ তখনও আগামীকালের সঙ্গে মানিয়ে নিতে পারে, তাই অনির্ধারিত চিহ্ন দিন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int last = 0, rest = 0;   // last: 0 = rest/undecided, 1 = contest, 2 = gym
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        if (a == 0) { rest++; last = 0; }
        else if (a == 1) { if (last == 1) { rest++; last = 0; } else last = 1; }
        else if (a == 2) { if (last == 2) { rest++; last = 0; } else last = 2; }
        else last = (last == 1) ? 2 : (last == 2) ? 1 : 0;
    }
    cout << rest << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ternary'],
    },
  ],
  tests: [
    { input: '4\n1 3 2 0', output: '2', source: 'sample', note: sample(1) },
    { input: '7\n1 3 3 2 1 2 3', output: '0', source: 'sample', note: sample(2) },
    { input: '2\n2 2', output: '1', source: 'sample', note: sample(3) },
    { input: '3\n3 3 3', output: '0', source: 'own', note: L('Always both options.', 'সবসময় দুটো বিকল্প।') },
  ],
  pitfalls: [L('Choosing a fixed activity on a “3” day after a rest.', 'বিশ্রামের পর “৩” দিনে নির্দিষ্ট কাজ বেছে ফেলা।')],
  related: [{ id: '1195C', name: 'Basketball Exercise', why: L('Same “last choice” state.', 'একই “শেষ সিদ্ধান্ত” অবস্থা।') }],
  toolkit: ['min-max'],
};

export const p550A: ProblemEntry = {
  id: '550A',
  contestId: 550,
  index: 'A',
  name: 'Two Substrings',
  rating: 1500,
  tags: ['brute-force', 'dp', 'greedy', 'implementation', 'strings'],
  why: L('Non-overlapping occurrences: the order of the two patterns matters.', 'অ-উপরিপাতিত উপস্থিতি: দুটি প্যাটার্নের ক্রম গুরুত্বপূর্ণ।'),
  statement: L(
    'Does the string s contain two non-overlapping substrings “AB” and “BA” (in either order)? Print YES or NO.',
    'স্ট্রিং s-এ কি দুটি অ-উপরিপাতিত সাবস্ট্রিং “AB” আর “BA” আছে (যেকোনো ক্রমে)? YES বা NO প্রিন্ট করুন।',
  ),
  input: L('One string of uppercase letters.', 'বড় হাতের অক্ষরের একটি স্ট্রিং।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Length ≤ 10⁵', 'দৈর্ঘ্য ≤ ১০⁵')] },
  samples: [
    { input: 'ABA', output: 'NO', explain: L('AB and BA overlap.', 'AB আর BA উপরিপাতিত।') },
    { input: 'BACFAB', output: 'YES', explain: L('BA at the start, AB at the end.', 'শুরুতে BA, শেষে AB।') },
    { input: 'AXBYBXA', output: 'NO', explain: L('Neither appears.', 'কোনোটিই নেই।') },
  ],
  observation: L('Either AB comes first: then take the leftmost AB and look for BA after it. Or BA comes first: take the leftmost BA and look for AB after it. Taking the leftmost first occurrence leaves the most room.', 'হয় AB আগে: তাহলে সবচেয়ে বামের AB নিয়ে এর পরে BA খুঁজুন। নয়তো BA আগে: সবচেয়ে বামের BA নিয়ে এর পরে AB খুঁজুন। সবচেয়ে বামের প্রথম উপস্থিতি নিলে সবচেয়ে বেশি জায়গা থাকে।'),
  approach: [L('Two find calls for each order.', 'প্রতিটি ক্রমের জন্য দুটি find।')],
  walkthrough: { input: 'BACFAB', steps: [{ state: 'BA at 0, AB found at 4 ≥ 2', text: L('YES.', 'YES।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Four linear searches.', 'চারটি রৈখিক খোঁজ।') },
  solutions: [
    {
      id: 'find',
      kind: 'optimal',
      title: L('Leftmost first, then search after it', 'আগে সবচেয়ে বামেরটি, তারপর এর পরে খোঁজা'),
      idea: L('find("AB") then find("BA", i + 2), and the other order.', 'find("AB") তারপর find("BA", i + ২), আর উল্টো ক্রম।'),
      explain: [L('Starting the second search at i + 2 skips both characters of the first occurrence, which is exactly the non-overlap condition.', 'দ্বিতীয় খোঁজ i + ২ থেকে শুরু করলে প্রথম উপস্থিতির দুটি অক্ষরই বাদ যায়, যা ঠিক অ-উপরিপাতনের শর্ত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool firstThen(const string& s, const string& x, const string& y) {
    size_t i = s.find(x);
    return i != string::npos && s.find(y, i + 2) != string::npos;
}

int main() {
    string s;
    cin >> s;
    bool ok = firstThen(s, "AB", "BA") || firstThen(s, "BA", "AB");
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'functions'],
    },
    {
      id: 'extremes',
      kind: 'method',
      title: L('First and last positions', 'প্রথম আর শেষ অবস্থান'),
      idea: L('YES if firstAB + 1 < lastBA or firstBA + 1 < lastAB.', 'firstAB + ১ < lastBA বা firstBA + ১ < lastAB হলে YES।'),
      explain: [L('For the order “AB then BA”, the best pair is the earliest AB with the latest BA. They do not overlap when the BA starts at least two positions after the AB starts. rfind gives the last occurrence.', '“AB তারপর BA” ক্রমে সেরা জোড়া হলো সবচেয়ে আগের AB আর সবচেয়ে পরের BA। BA যদি AB-এর শুরু থেকে অন্তত দুই অবস্থান পরে শুরু হয়, তবে তারা উপরিপাতিত নয়। rfind শেষ উপস্থিতি দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    const auto N = string::npos;
    size_t fAB = s.find("AB"), lAB = s.rfind("AB"), fBA = s.find("BA"), lBA = s.rfind("BA");
    bool ok = (fAB != N && lBA != N && fAB + 1 < lBA) || (fBA != N && lAB != N && fBA + 1 < lAB);
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find'],
    },
  ],
  tests: [
    { input: 'ABA', output: 'NO', source: 'sample', note: sample(1) },
    { input: 'BACFAB', output: 'YES', source: 'sample', note: sample(2) },
    { input: 'AXBYBXA', output: 'NO', source: 'sample', note: sample(3) },
    { input: 'ABAB', output: 'NO', source: 'own', note: L('BA in the middle overlaps both ABs.', 'মাঝের BA দুটি AB-র সঙ্গেই উপরিপাতিত।') },
    { input: 'ABBA', output: 'YES', source: 'own', note: L('AB then BA, touching but not overlapping.', 'AB তারপর BA, ছুঁয়ে আছে কিন্তু উপরিপাতিত নয়।') },
    { input: 'BABA', output: 'NO', source: 'own', note: L('Only one usable order fails.', 'কোনো ক্রমেই হয় না।') },
  ],
  pitfalls: [L('Checking only one order.', 'শুধু এক ক্রম দেখা।'), L('Searching from i + 1, which allows ABA.', 'i + ১ থেকে খোঁজা, যা ABA-কে অনুমতি দেয়।')],
  related: [{ id: '96A', name: 'Football', why: L('Substring search.', 'সাবস্ট্রিং খোঁজ।') }],
  toolkit: ['string-basics'],
};

export const p1398C: ProblemEntry = {
  id: '1398C',
  contestId: 1398,
  index: 'C',
  name: 'Good Subarrays',
  rating: 1600,
  tags: ['data-structures', 'dp', 'math'],
  why: L('Subtract 1 from every element and the condition becomes “sum equals zero”: prefix sums plus a map.', 'প্রতিটি উপাদান থেকে ১ বিয়োগ করলে শর্ত হয় “যোগফল শূন্য”: প্রিফিক্স সাম আর একটি map।'),
  statement: L(
    'An array of digits is given as a string. A subarray a[l..r] is good if the sum of its elements equals its length, r − l + 1. Count the good subarrays. There are t test cases.',
    'একটি স্ট্রিং হিসেবে অঙ্কের অ্যারে দেওয়া আছে। একটি সাবঅ্যারে a[l..r] ভালো যদি এর উপাদানগুলোর যোগফল এর দৈর্ঘ্য r − l + ১-এর সমান হয়। ভালো সাবঅ্যারে গুনুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and a string of n digits.', 't; প্রতিটি টেস্টে n আর n অঙ্কের একটি স্ট্রিং।'),
  output: L('The number of good subarrays for each test.', 'প্রতিটি টেস্টের ভালো সাবঅ্যারের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, Σ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵, Σ n ≤ ১০⁵')] },
  samples: [{ input: '3\n3\n120\n5\n11011\n6\n600005', output: '3\n6\n1', explain: L('In 120: [1], [1 2 0] (sum 3, length 3) and [2 0] (sum 2, length 2).', '১২০-এ: [১], [১ ২ ০] (যোগফল ৩, দৈর্ঘ্য ৩), [২ ০] (যোগফল ২, দৈর্ঘ্য ২)। মোট তিনটি।') }],
  observation: L('Σ aᵢ = length ⇔ Σ (aᵢ − 1) = 0. With prefix sums P of bᵢ = aᵢ − 1, a subarray is good when P[r] = P[l − 1]. So count pairs of equal prefix sums.', 'Σ aᵢ = দৈর্ঘ্য ⇔ Σ (aᵢ − ১) = ০। bᵢ = aᵢ − ১-এর প্রিফিক্স সাম P নিলে, P[r] = P[l − ১] হলে সাবঅ্যারে ভালো। তাই সমান প্রিফিক্স সামের জোড়া গুনুন।'),
  approach: [L('Walk left to right with cnt[P], starting with cnt[0] = 1.', 'cnt[0] = ১ দিয়ে শুরু করে cnt[P] নিয়ে বাম থেকে ডানে চলুন।')],
  walkthrough: { input: '120', steps: [{ state: 'b = 0 1 −1, P = 0 0 1 0', text: L('Values 0 appear three times: 3 pairs.', '০ মান তিনবার আসে: ৩টি জোড়া।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One map operation per prefix.', 'প্রতি প্রিফিক্সে একটি map অপারেশন।') },
  solutions: [
    {
      id: 'map',
      kind: 'optimal',
      title: L('Shift by 1, count equal prefix sums', '১ সরিয়ে সমান প্রিফিক্স সাম গোনা'),
      idea: L('answer += cnt[P]; cnt[P]++.', 'answer += cnt[P]; cnt[P]++।'),
      explain: [L('This “turn the condition into sum = 0” trick appears in many problems: subtract the target per element so that the comparison becomes equality of prefix sums.', 'এই “শর্তকে যোগফল = ০-তে বদলানো” কৌশল অনেক প্রবলেমে আসে: প্রতি উপাদান থেকে লক্ষ্য বিয়োগ করুন যাতে তুলনাটি প্রিফিক্স সামের সমতা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        map<long long, long long> cnt;
        cnt[0] = 1;
        long long P = 0, good = 0;
        for (char c : s) {
            P += (c - '0') - 1;
            good += cnt[P];
            cnt[P]++;
        }
        cout << good << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'prefix-sum', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every subarray', 'প্রতিটি সাবঅ্যারে দেখা'),
      idea: L('Two loops with a running sum.', 'চলতি যোগফলসহ দুটি লুপ।'),
      explain: [L('O(n²) = 10¹⁰ steps at worst; the reference for testing the prefix-sum idea.', 'সবচেয়ে খারাপ ক্ষেত্রে O(n²) = ১০¹⁰ ধাপ; প্রিফিক্স-সাম আইডিয়া পরীক্ষার রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        long long good = 0;
        for (int l = 0; l < n; l++) {
            int sum = 0;
            for (int r = l; r < n; r++) {
                sum += s[r] - '0';
                if (sum == r - l + 1) good++;
            }
        }
        cout << good << "\n";
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
    { input: '3\n3\n120\n5\n11011\n6\n600005', output: '3\n6\n1', source: 'sample', note: sample(1) },
    { input: '1\n4\n1111', output: '10', source: 'own', note: L('Every subarray is good.', 'প্রতিটি সাবঅ্যারে ভালো।') },
    { input: '1\n3\n000', output: '0', source: 'own', note: L('None.', 'একটিও নয়।') },
  ],
  pitfalls: [L('Forgetting cnt[0] = 1 for subarrays starting at index 1.', 'সূচক ১ থেকে শুরু হওয়া সাবঅ্যারের জন্য cnt[0] = ১ ভুলে যাওয়া।'), L('int answer: up to 5·10⁹.', 'int উত্তর: ৫·১০⁹ পর্যন্ত।')],
  related: [{ id: '1520D', name: 'Same Differences', why: L('Same equal-keys counting.', 'একই সমান-কী গণনা।') }],
  toolkit: ['map', 'prefix-sum'],
};

export const p431C: ProblemEntry = {
  id: '431C',
  contestId: 431,
  index: 'C',
  name: 'k-Tree',
  rating: 1600,
  tags: ['dp', 'implementation', 'trees'],
  why: L('Counting paths with a sum, plus one extra flag in the state.', 'একটি যোগফলসহ পথ গোনা, সঙ্গে অবস্থায় একটি বাড়তি ফ্ল্যাগ।'),
  statement: L(
    'In an infinite rooted k-tree, every vertex has k children connected by edges of weights 1, 2, …, k. Count the paths going down from the root whose total weight is n and that use at least one edge of weight at least d. Print the count modulo 10⁹ + 7.',
    'একটি অসীম মূলযুক্ত k-ট্রিতে প্রতিটি শীর্ষের k-টি সন্তান, ১, ২, …, k ওজনের প্রান্ত দিয়ে যুক্ত। মূল থেকে নিচে নামা এমন পথ গুনুন যার মোট ওজন n আর যাতে অন্তত একটি প্রান্তের ওজন অন্তত d। গণনা ১০⁹ + ৭ মডুলোতে প্রিন্ট করুন।',
  ),
  input: L('n, k and d.', 'n, k আর d।'),
  output: L('The number of paths modulo 10⁹ + 7.', '১০⁹ + ৭ মডুলোতে পথের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, k ≤ 100, 1 ≤ d ≤ k', '১ ≤ n, k ≤ ১০০, ১ ≤ d ≤ k')] },
  samples: [
    { input: '3 3 2', output: '3', explain: L('2+1, 1+2, 3.', '২+১, ১+২, ৩।') },
    { input: '3 3 3', output: '1', explain: L('Only 3.', 'শুধু ৩।') },
    { input: '4 3 2', output: '6', explain: L('All compositions of 4 into parts ≤ 3, except 1+1+1+1.', '৩-এর বেশি নয় এমন অংশে ৪-এর সব বিন্যাস, ১+১+১+১ ছাড়া।') },
    { input: '4 5 2', output: '7', explain: L('Parts up to 5, minus the all-ones path.', '৫ পর্যন্ত অংশ, সব-এক পথ বাদ দিয়ে।') },
  ],
  observation: L('A path is an ordered sequence of edge weights summing to n. Count all sequences with parts ≤ k and subtract those with every part < d.', 'একটি পথ হলো n যোগফলের প্রান্ত-ওজনের একটি ক্রমযুক্ত ধারা। k-এর বেশি নয় এমন অংশের সব ধারা গুনে, যেগুলোর প্রতিটি অংশ d-এর কম সেগুলো বাদ দিন।'),
  approach: [L('ways(n, m) = number of sequences with parts 1..m summing to n, by DP. Answer ways(n, k) − ways(n, d − 1).', 'ways(n, m) = ১..m অংশে n যোগফলের ধারার সংখ্যা, DP দিয়ে। উত্তর ways(n, k) − ways(n, d − ১)।')],
  walkthrough: { input: '3 3 2', steps: [{ state: 'ways(3, 3) = 4', text: L('1+1+1, 1+2, 2+1, 3.', '১+১+১, ১+২, ২+১, ৩।') }, { state: 'ways(3, 1) = 1', text: L('4 − 1 = 3.', '৪ − ১ = ৩।') }] },
  complexity: { time: 'O(n · k)', space: 'O(n)', why: L('k transitions per sum.', 'প্রতি যোগফলে k-টি রূপান্তর।') },
  solutions: [
    {
      id: 'complement',
      kind: 'optimal',
      title: L('All paths minus paths with small edges only', 'সব পথ বিয়োগ শুধু ছোট প্রান্তের পথ'),
      idea: L('ways(n, k) − ways(n, d − 1), each a 1D DP.', 'ways(n, k) − ways(n, d − ১), প্রতিটি একটি 1D DP।'),
      explain: [L('Counting the complement avoids tracking the “used a big edge” condition. Add MOD before taking % after the subtraction.', 'বিপরীতটি গুনলে “বড় প্রান্ত ব্যবহার হয়েছে” শর্ত অনুসরণ করতে হয় না। বিয়োগের পর % নেওয়ার আগে MOD যোগ করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;

long long ways(int n, int m) {
    vector<long long> f(n + 1, 0);
    f[0] = 1;
    for (int s = 1; s <= n; s++)
        for (int w = 1; w <= m && w <= s; w++) f[s] = (f[s] + f[s - w]) % MOD;
    return f[n];
}

int main() {
    int n, k, d;
    cin >> n >> k >> d;
    cout << (ways(n, k) - ways(n, d - 1) + MOD) % MOD << "\n";
    return 0;
}
`,
      time: 'O(n · k)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-arith', 'functions'],
    },
    {
      id: 'flag',
      kind: 'method',
      title: L('DP with a “big edge used” flag', '“বড় প্রান্ত ব্যবহৃত” ফ্ল্যাগসহ DP'),
      idea: L('dp[s][0/1] = paths of weight s that have / have not used an edge ≥ d yet.', 'dp[s][০/১] = s ওজনের পথ যা d-এর সমান বা বড় প্রান্ত ব্যবহার করেছে / করেনি।'),
      explain: [L('Adding an edge of weight w ≥ d moves any path into state 1; adding a smaller edge keeps the state. This flag technique generalises to any “at least one” condition.', 'w ≥ d ওজনের প্রান্ত যোগ করলে যেকোনো পথ অবস্থা ১-এ যায়; ছোট প্রান্ত যোগ করলে অবস্থা থাকে। এই ফ্ল্যাগ কৌশল যেকোনো “অন্তত একটি” শর্তে কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const long long MOD = 1000000007;
    int n, k, d;
    cin >> n >> k >> d;
    vector<array<long long, 2>> dp(n + 1, {0, 0});
    dp[0][0] = 1;
    for (int s = 1; s <= n; s++)
        for (int w = 1; w <= k && w <= s; w++)
            for (int f = 0; f < 2; f++) {
                int nf = (f || w >= d) ? 1 : 0;
                dp[s][nf] = (dp[s][nf] + dp[s - w][f]) % MOD;
            }
    cout << dp[n][1] << "\n";
    return 0;
}
`,
      time: 'O(n · k)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-arith', 'vector'],
    },
  ],
  tests: [
    { input: '3 3 2', output: '3', source: 'sample', note: sample(1) },
    { input: '3 3 3', output: '1', source: 'sample', note: sample(2) },
    { input: '4 3 2', output: '6', source: 'sample', note: sample(3) },
    { input: '4 5 2', output: '7', source: 'sample', note: sample(4) },
    { input: '1 1 1', output: '1', source: 'own', note: L('One edge of weight 1.', 'ওজন ১-এর একটি প্রান্ত।') },
  ],
  pitfalls: [L('A negative result after the subtraction.', 'বিয়োগের পর ঋণাত্মক ফল।'), L('Treating paths as unordered (2+1 and 1+2 are different).', 'পথগুলোকে ক্রমহীন ধরা (২+১ আর ১+২ আলাদা)।')],
  related: [{ id: '189A', name: 'Cut Ribbon', why: L('Another DP over sums.', 'যোগফলের ওপর আরেকটি DP।') }],
  toolkit: ['mod-arith'],
};

export const p466C: ProblemEntry = {
  id: '466C',
  contestId: 466,
  index: 'C',
  name: 'Number of Ways',
  rating: 1700,
  tags: ['binary-search', 'brute-force', 'data-structures', 'dp', 'two-pointers'],
  why: L('Counting split points with prefix sums: for each second cut, count earlier first cuts.', 'প্রিফিক্স সাম দিয়ে কাটার বিন্দু গোনা: প্রতিটি দ্বিতীয় কাটের জন্য আগের প্রথম কাটগুলো গোনা।'),
  statement: L(
    'Count the ways to split an array of n integers into three non-empty contiguous parts with equal sums.',
    'n-টি পূর্ণসংখ্যার অ্যারেকে সমান যোগফলের তিনটি খালি নয় এমন একটানা অংশে ভাগ করার উপায় গুনুন।',
  ),
  input: L('n, then the array.', 'n, তারপর অ্যারে।'),
  output: L('The number of ways.', 'উপায়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 5·10⁵, |aᵢ| ≤ 10⁹', '১ ≤ n ≤ ৫·১০⁵, |aᵢ| ≤ ১০⁹')] },
  samples: [
    { input: '5\n1 2 3 0 3', output: '2', explain: L('[1 2][3][0 3] and [1 2][3 0][3].', '[১ ২][৩][০ ৩] আর [১ ২][৩ ০][৩]।') },
    { input: '4\n0 1 -1 0', output: '1', explain: L('[0][1 −1][0].', '[০][১ −১][০]।') },
    { input: '2\n4 1', output: '0', explain: L('Too short.', 'খুব ছোট।') },
  ],
  observation: L('With total S divisible by 3, cut after i (prefix sum S/3) and after j > i (prefix sum 2S/3, j < n). For each j with P[j] = 2S/3, add the number of i < j with P[i] = S/3.', 'মোট S ৩ দিয়ে বিভাজ্য হলে, i-এর পরে কাটুন (প্রিফিক্স সাম S/৩) আর j > i-এর পরে (প্রিফিক্স সাম ২S/৩, j < n)। P[j] = ২S/৩ এমন প্রতিটি j-এর জন্য P[i] = S/৩ এমন i < j-এর সংখ্যা যোগ করুন।'),
  approach: [L('Scan j from 2 to n − 1, keeping how many i ≤ j − 1 had P[i] = S/3.', 'j ২ থেকে n − ১ পর্যন্ত চালান, কতগুলো i ≤ j − ১-এ P[i] = S/৩ ছিল তা রেখে।')],
  walkthrough: { input: '1 2 3 0 3', steps: [{ state: 'P = 1 3 6 6 9, S/3 = 3', text: L('One i (P = 3 at 2); j = 3, 4 have P = 6. Answer 2.', 'একটি i (২-এ P = ৩); j = ৩, ৪-এ P = ৬। উত্তর ২।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over prefix sums.', 'প্রিফিক্স সামের ওপর একবার।') },
  solutions: [
    {
      id: 'scan',
      kind: 'optimal',
      title: L('Count first cuts while scanning second cuts', 'দ্বিতীয় কাট স্ক্যানের সময় প্রথম কাট গোনা'),
      idea: L('Update the first-cut count before checking j, so i < j always holds.', 'j দেখার আগে প্রথম-কাটের গণনা আপডেট করুন, যাতে i < j সবসময় থাকে।'),
      explain: [L('When S = 0, S/3 = 2S/3 = 0, so the order of updates matters: the count must include only i ≤ j − 1. The answer can reach about n²/2 ≈ 1.25·10¹¹, so use long long.', 'S = ০ হলে S/৩ = ২S/৩ = ০, তাই আপডেটের ক্রম গুরুত্বপূর্ণ: গণনায় শুধু i ≤ j − ১ থাকতে হবে। উত্তর প্রায় n²/২ ≈ ১.২৫·১০¹¹ পর্যন্ত যেতে পারে, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> P(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long a;
        scanf("%lld", &a);
        P[i] = P[i - 1] + a;
    }
    long long S = P[n];
    if (S % 3 != 0) { puts("0"); return 0; }
    long long third = S / 3, ways = 0, firstCuts = 0;
    for (int j = 2; j <= n - 1; j++) {
        if (P[j - 1] == third) firstCuts++;   // cut after position j-1
        if (P[j] == 2 * third) ways += firstCuts;
    }
    printf("%lld\n", ways);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'c-io', 'long-long'],
    },
    {
      id: 'suffix',
      kind: 'method',
      title: L('Suffix counts of valid second cuts', 'বৈধ দ্বিতীয় কাটের সাফিক্স গণনা'),
      idea: L('cnt[j] = how many positions ≥ j are valid second cuts; for each first cut i add cnt[i + 1].', 'cnt[j] = j বা পরের কতগুলো অবস্থান বৈধ দ্বিতীয় কাট; প্রতিটি প্রথম কাট i-এর জন্য cnt[i + ১] যোগ।'),
      explain: [L('The mirror view: fix the first cut and count second cuts to its right with a suffix array. It is the same O(n), and the version to reach for when the second condition is easier to precompute.', 'প্রতিবিম্ব দৃষ্টিভঙ্গি: প্রথম কাট স্থির করে সাফিক্স অ্যারে দিয়ে এর ডানে দ্বিতীয় কাট গুনুন। একই O(n), আর দ্বিতীয় শর্ত আগে হিসাব করা সহজ হলে এটাই বেছে নিন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> P(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long a;
        scanf("%lld", &a);
        P[i] = P[i - 1] + a;
    }
    long long S = P[n];
    if (S % 3 != 0) { puts("0"); return 0; }
    long long third = S / 3;
    vector<long long> cnt(n + 2, 0);       // cnt[j]: second cuts at positions j..n-1
    for (int j = n - 1; j >= 1; j--) cnt[j] = cnt[j + 1] + (P[j] == 2 * third);
    long long ways = 0;
    for (int i = 1; i <= n - 2; i++)
        if (P[i] == third) ways += cnt[i + 1];
    printf("%lld\n", ways);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every pair of cuts', 'কাটের প্রতিটি জোড়া চেষ্টা'),
      idea: L('Two loops over the cut positions.', 'কাটের অবস্থানের ওপর দুটি লুপ।'),
      explain: [L('O(n²) with prefix sums; the reference for the counting solutions.', 'প্রিফিক্স সামসহ O(n²); গণনার সমাধানগুলোর রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> P(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long a;
        cin >> a;
        P[i] = P[i - 1] + a;
    }
    long long ways = 0;
    for (int i = 1; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (P[i] == P[j] - P[i] && P[i] == P[n] - P[j]) ways++;
    cout << ways << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['prefix-sum'],
    },
  ],
  tests: [
    { input: '5\n1 2 3 0 3', output: '2', source: 'sample', note: sample(1) },
    { input: '4\n0 1 -1 0', output: '1', source: 'sample', note: sample(2) },
    { input: '2\n4 1', output: '0', source: 'sample', note: sample(3) },
    { input: '5\n0 0 0 0 0', output: '6', source: 'own', note: L('All zeros: C(4, 2) cut pairs.', 'সব শূন্য: C(৪, ২)টি কাটের জোড়া।') },
  ],
  pitfalls: [L('With S = 0, counting i = j.', 'S = ০ হলে i = j গোনা।'), L('int prefix sums: up to 5·10¹⁴.', 'int প্রিফিক্স সাম: ৫·১০¹⁴ পর্যন্ত।')],
  related: [{ id: '1398C', name: 'Good Subarrays', why: L('Prefix sums with counting.', 'গণনাসহ প্রিফিক্স সাম।') }],
  toolkit: ['prefix-sum'],
};

export const p5C: ProblemEntry = {
  id: '5C',
  contestId: 5,
  index: 'C',
  name: 'Longest Regular Bracket Sequence',
  rating: 1900,
  tags: ['constructive', 'data-structures', 'dp', 'greedy', 'sortings', 'strings'],
  why: L('The stack technique for brackets, and the matching DP that does the same in one array.', 'বন্ধনীর জন্য স্ট্যাক কৌশল, আর একই কাজ একটি অ্যারেতে করা DP।'),
  statement: L(
    'Given a string of brackets ( and ), find the length of its longest substring that is a regular (correctly matched) bracket sequence, and how many such substrings of that length exist. If there are none, print “0 1”.',
    '( আর ) বন্ধনীর একটি স্ট্রিং দেওয়া আছে; এর সবচেয়ে লম্বা সাবস্ট্রিংয়ের দৈর্ঘ্য বের করুন যা একটি নিয়মিত (সঠিকভাবে মেলানো) বন্ধনী ক্রম, আর সেই দৈর্ঘ্যের কতগুলো এমন সাবস্ট্রিং আছে। একটিও না থাকলে “০ ১” প্রিন্ট করুন।',
  ),
  input: L('One string of length ≤ 10⁶.', '≤ ১০⁶ দৈর্ঘ্যের একটি স্ট্রিং।'),
  output: L('The length and the count.', 'দৈর্ঘ্য আর গণনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Length ≤ 10⁶', 'দৈর্ঘ্য ≤ ১০⁶')] },
  samples: [
    { input: ')((())))(()())', output: '6 2', explain: L('((())) and (()()).', '((())) আর (()())।') },
    { input: '))(', output: '0 1', explain: L('None.', 'একটিও নয়।') },
  ],
  observation: L('Keep a stack of indices of unmatched “(” plus a sentinel: the index just before the current valid stretch. When “)” matches, the valid substring ending here starts right after the new top.', 'অমিলিত “(”-এর ইনডেক্সের একটি স্ট্যাক রাখুন, সঙ্গে একটি সেন্টিনেল: বর্তমান বৈধ অংশের ঠিক আগের ইনডেক্স। “)” মিললে এখানে শেষ হওয়া বৈধ সাবস্ট্রিং নতুন ওপরের ঠিক পরে শুরু হয়।'),
  approach: [L('Push −1. For “(” push i. For “)” pop; if the stack is empty push i as the new sentinel, else the length is i − top. Track the maximum and how often it appears.', '−১ পুশ করুন। “(”-এ i পুশ। “)”-এ পপ; স্ট্যাক খালি হলে i-কে নতুন সেন্টিনেল হিসেবে পুশ, না হলে দৈর্ঘ্য i − top। সর্বোচ্চ আর এটি কতবার আসে তা রাখুন।')],
  walkthrough: { input: '(()())', steps: [{ state: 'i = 2: length 2; i = 4: length 2; i = 5: length 6', text: L('At the last “)” the stack top is −1: length 6.', 'শেষ “)”-এ স্ট্যাকের ওপরে −১: দৈর্ঘ্য ৬।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each index is pushed and popped once.', 'প্রতিটি ইনডেক্স একবার পুশ আর পপ হয়।') },
  solutions: [
    {
      id: 'stack',
      kind: 'optimal',
      title: L('Stack of indices with a sentinel', 'সেন্টিনেলসহ ইনডেক্সের স্ট্যাক'),
      idea: L('Length = i − top after popping.', 'পপের পর দৈর্ঘ্য = i − top।'),
      explain: [L('Each position i gives the longest valid substring ending at i, so equal maximal lengths at different end positions are different substrings, which is exactly the count asked for.', 'প্রতিটি অবস্থান i, i-তে শেষ হওয়া সবচেয়ে লম্বা বৈধ সাবস্ট্রিং দেয়, তাই ভিন্ন শেষ অবস্থানে একই সর্বোচ্চ দৈর্ঘ্য মানে আলাদা সাবস্ট্রিং, যা ঠিক যে গণনা চাওয়া হয়েছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000005];
    scanf("%s", buf);
    int n = strlen(buf);
    vector<int> st;
    st.reserve(n + 1);
    st.push_back(-1);
    int best = 0, cnt = 1;
    for (int i = 0; i < n; i++) {
        if (buf[i] == '(') { st.push_back(i); continue; }
        st.pop_back();
        if (st.empty()) { st.push_back(i); continue; }
        int len = i - st.back();
        if (len > best) { best = len; cnt = 1; }
        else if (len == best) cnt++;
    }
    printf("%d %d\n", best, best ? cnt : 1);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'c-io'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('dp[i] = longest valid ending at i', 'dp[i] = i-তে শেষ হওয়া সবচেয়ে লম্বা বৈধ'),
      idea: L('For “)” at i, look at j = i − dp[i − 1] − 1; if s[j] is “(”, dp[i] = dp[i − 1] + 2 + dp[j − 1].', 'i-তে “)” হলে j = i − dp[i − ১] − ১ দেখুন; s[j] “(” হলে dp[i] = dp[i − ১] + ২ + dp[j − ১]।'),
      explain: [L('dp[i − 1] is the valid block just before i; the character before that block must be the “(” that matches s[i]. Then whatever valid block ends right before j joins on, giving the dp[j − 1] term.', 'dp[i − ১] হলো i-এর ঠিক আগের বৈধ ব্লক; সেই ব্লকের আগের অক্ষরকে s[i]-এর সঙ্গে মেলা “(” হতে হবে। তারপর j-এর ঠিক আগে শেষ হওয়া যেকোনো বৈধ ব্লক জুড়ে যায়, যা dp[j − ১] পদ দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    static char s[1000005];
    scanf("%s", s);
    int n = strlen(s);
    vector<int> dp(n, 0);
    int best = 0, cnt = 1;
    for (int i = 1; i < n; i++) {
        if (s[i] != ')') continue;
        int j = i - dp[i - 1] - 1;
        if (j >= 0 && s[j] == '(') {
            dp[i] = dp[i - 1] + 2 + (j >= 1 ? dp[j - 1] : 0);
            if (dp[i] > best) { best = dp[i]; cnt = 1; }
            else if (dp[i] == best) cnt++;
        }
    }
    printf("%d %d\n", best, best ? cnt : 1);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
  ],
  tests: [
    { input: ')((())))(()())', output: '6 2', source: 'sample', note: sample(1) },
    { input: '))(', output: '0 1', source: 'sample', note: sample(2) },
    { input: '()()', output: '4 1', source: 'own', note: L('Two blocks join.', 'দুটি ব্লক জুড়ে যায়।') },
    { input: '()(()', output: '2 2', source: 'own', note: L('Two separate pairs.', 'দুটি আলাদা জোড়া।') },
  ],
  pitfalls: [L('Printing “0 0” when there is no valid substring.', 'বৈধ সাবস্ট্রিং না থাকলে “০ ০” প্রিন্ট।'), L('A recursive matcher on 10⁶ characters overflows the stack; stay iterative.', '১০⁶ অক্ষরে রিকার্সিভ মেলানো স্ট্যাক ওভারফ্লো করে; পুনরাবৃত্ত পদ্ধতিতে থাকুন।')],
  related: [{ id: '1373B', name: '01 Game', why: L('Stack simulation.', 'স্ট্যাক সিমুলেশন।') }],
  toolkit: ['stack-queue'],
};
