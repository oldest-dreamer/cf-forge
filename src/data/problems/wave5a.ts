import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p750A: ProblemEntry = {
  id: '750A',
  contestId: 750,
  index: 'A',
  name: 'New Year and Hurry',
  rating: 800,
  tags: ['binary-search', 'brute-force', 'implementation', 'math'],
  why: L('A cumulative-time budget: loop until the next item no longer fits.', 'মোট সময়ের বাজেট: পরের জিনিস আর না আঁটা পর্যন্ত লুপ।'),
  statement: L(
    'A contest starts at 20:00 and lasts 4 hours with n problems; problem i takes 5·i minutes. Limak must leave k minutes before midnight to reach a party. How many problems can he solve?',
    'একটি কনটেস্ট ২০:০০-তে শুরু হয়ে ৪ ঘণ্টা চলে, n-টি প্রবলেম; প্রবলেম i-তে ৫·i মিনিট লাগে। পার্টিতে পৌঁছাতে লিমাককে মধ্যরাতের k মিনিট আগে বের হতে হবে। সে কয়টি প্রবলেম সমাধান করতে পারে?',
  ),
  input: L('n and k.', 'n আর k।'),
  output: L('The maximum number of problems.', 'সর্বোচ্চ প্রবলেমের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10, 1 ≤ k ≤ 240', '১ ≤ n ≤ ১০, ১ ≤ k ≤ ২৪০')] },
  samples: [
    { input: '3 222', output: '2', explain: L('18 minutes left: 5 + 10 fit, 15 more does not.', '১৮ মিনিট বাকি: ৫ + ১০ আঁটে, আরও ১৫ নয়।') },
    { input: '4 190', output: '4', explain: L('50 minutes: 5 + 10 + 15 + 20.', '৫০ মিনিট: ৫ + ১০ + ১৫ + ২০।') },
    { input: '7 1', output: '7', explain: L('Plenty of time.', 'অনেক সময়।') },
  ],
  observation: L('He has 240 − k minutes. Solving problems in order costs 5(1 + 2 + … + m) = 5m(m + 1)/2.', 'তার ২৪০ − k মিনিট আছে। ক্রমে সমাধান করলে খরচ ৫(১ + ২ + … + m) = ৫m(m + ১)/২।'),
  approach: [L('Increase m while the next problem still fits and m < n.', 'পরের প্রবলেম আঁটে আর m < n যতক্ষণ, m বাড়ান।')],
  walkthrough: { input: '3 222', steps: [{ state: 'budget 18: 5, 15, 30', text: L('Two fit.', 'দুটি আঁটে।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('At most 10 steps.', 'সর্বোচ্চ ১০ ধাপ।') },
  solutions: [
    {
      id: 'loop',
      kind: 'optimal',
      title: L('Add problems until time runs out', 'সময় শেষ না হওয়া পর্যন্ত প্রবলেম যোগ'),
      idea: L('used += 5·(m + 1) while it fits.', 'আঁটলে used += ৫·(m + ১)।'),
      explain: [L('Easier problems first is forced here (they come in order), so the loop simply stops at the first problem that does not fit.', 'এখানে সহজ প্রবলেম আগে বাধ্যতামূলক (ক্রমে আসে), তাই লুপ প্রথম না-আঁটা প্রবলেমে থেমে যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int budget = 240 - k, used = 0, m = 0;
    while (m < n && used + 5 * (m + 1) <= budget) {
        m++;
        used += 5 * m;
    }
    cout << m << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Binary search on m', 'm-এর ওপর বাইনারি সার্চ'),
      idea: L('Find the largest m ≤ n with 5m(m + 1)/2 ≤ 240 − k.', '৫m(m + ১)/২ ≤ ২৪০ − k এমন সবচেয়ে বড় m ≤ n খুঁজুন।'),
      explain: [L('The total time is increasing in m, so binary search applies. With n ≤ 10 it is overkill, but it is the same template you need when n is 10⁹.', 'মোট সময় m-এ বাড়তে থাকে, তাই বাইনারি সার্চ চলে। n ≤ ১০-এ এটি বাড়াবাড়ি, কিন্তু n ১০⁹ হলে এই একই টেমপ্লেট লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    auto fits = [&](int m) { return 5 * m * (m + 1) / 2 <= 240 - k; };
    int lo = 0, hi = n + 1;            // fits(lo) is true, hi is out of range
    while (hi - lo > 1) {
        int mid = (lo + hi) / 2;
        (fits(mid) ? lo : hi) = mid;
    }
    cout << lo << "\n";
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '3 222', output: '2', source: 'sample', note: sample(1) },
    { input: '4 190', output: '4', source: 'sample', note: sample(2) },
    { input: '7 1', output: '7', source: 'sample', note: sample(3) },
    { input: '1 240', output: '0', source: 'own', note: L('No time at all.', 'একদম সময় নেই।') },
  ],
  pitfalls: [L('Forgetting the cap m ≤ n.', 'm ≤ n সীমা ভুলে যাওয়া।')],
  related: [{ id: '279B', name: 'Books', why: L('Fitting tasks into a time budget.', 'সময়ের বাজেটে কাজ আঁটানো।') }],
  toolkit: ['while-n'],
};

export const p1996A: ProblemEntry = {
  id: '1996A',
  contestId: 1996,
  index: 'A',
  name: 'Legs',
  rating: 800,
  tags: ['binary-search', 'math', 'ternary-search'],
  why: L('Minimise the count by using as many of the bigger item as possible.', 'বড় জিনিস যত সম্ভব বেশি নিয়ে সংখ্যা কমানো।'),
  statement: L(
    'A farm has only chickens (2 legs) and cows (4 legs). Farmer John counted n legs in total (n is even). What is the minimum number of animals? There are t test cases.',
    'একটি খামারে শুধু মুরগি (২ পা) আর গরু (৪ পা)। ফার্মার জন মোট n-টি পা গুনেছে (n জোড়)। সর্বনিম্ন কয়টি প্রাণী? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('The minimum number of animals.', 'সর্বনিম্ন প্রাণীর সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10³, n even', '২ ≤ n ≤ ২·১০³, n জোড়')] },
  samples: [{ input: '3\n2\n6\n8', output: '1\n2\n2', explain: L('6 = 4 + 2, 8 = 4 + 4.', '৬ = ৪ + ২, ৮ = ৪ + ৪।') }],
  observation: L('Use as many cows as possible: n / 4 cows, plus one chicken if 2 legs remain. That is ⌈n / 4⌉.', 'যত সম্ভব বেশি গরু: n / ৪টি গরু, আর ২টি পা বাকি থাকলে একটি মুরগি। অর্থাৎ ⌈n / ৪⌉।'),
  approach: [L('Print (n + 3) / 4.', '(n + ৩) / ৪ প্রিন্ট করুন।')],
  walkthrough: { input: '6', steps: [{ state: '1 cow + 1 chicken', text: L('2 animals.', '২টি প্রাণী।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Ceiling division', 'সিলিং ভাগ'),
      idea: L('⌈n / 4⌉ = (n + 3) / 4.', '⌈n / ৪⌉ = (n + ৩) / ৪।'),
      explain: [L('Replacing two chickens by one cow keeps the legs and reduces the count, so at most one chicken remains in the best answer.', 'দুটি মুরগির বদলে একটি গরু নিলে পা একই থাকে আর সংখ্যা কমে, তাই সেরা উত্তরে সর্বোচ্চ একটি মুরগি থাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (n + 3) / 4 << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div'],
    },
    {
      id: 'brute',
      kind: 'method',
      title: L('Try every number of cows', 'গরুর প্রতিটি সংখ্যা চেষ্টা'),
      idea: L('For c cows, the rest n − 4c must be chickens: total c + (n − 4c)/2.', 'c-টি গরুর জন্য বাকি n − ৪c হবে মুরগি: মোট c + (n − ৪c)/২।'),
      explain: [L('n ≤ 2000 makes a loop over c trivial, and it needs no insight about which animal to prefer.', 'n ≤ ২০০০ হলে c-এর ওপর লুপ তুচ্ছ, আর কোন প্রাণী আগে নিতে হবে সেই ধারণা লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int best = INT_MAX;
        for (int c = 0; 4 * c <= n; c++) best = min(best, c + (n - 4 * c) / 2);
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'min-max'],
    },
  ],
  tests: [
    { input: '3\n2\n6\n8', output: '1\n2\n2', source: 'sample', note: sample(1) },
    { input: '2\n4\n2000', output: '1\n500', source: 'own', note: L('Only cows.', 'শুধু গরু।') },
  ],
  pitfalls: [L('Printing n / 4 and losing the leftover chicken.', 'n / ৪ প্রিন্ট করে বাকি মুরগি হারানো।')],
  related: [{ id: '996A', name: 'Hit the Lottery', why: L('Use the largest unit first.', 'আগে সবচেয়ে বড় একক।') }],
  toolkit: ['ceil-div'],
};

export const p1138A: ProblemEntry = {
  id: '1138A',
  contestId: 1138,
  index: 'A',
  name: 'Sushi for Two',
  rating: 900,
  tags: ['binary-search', 'greedy', 'implementation'],
  why: L('Think in runs of equal values: the answer comes from two neighbouring runs.', 'সমান মানের ধারায় ভাবুন: উত্তর আসে দুটি পাশাপাশি ধারা থেকে।'),
  statement: L(
    'n pieces of sushi in a row are each tuna (1) or eel (2). Find the longest contiguous segment with equally many of each type, where the first half is all one type and the second half all the other.',
    'একটি সারিতে n টুকরো সুশি, প্রতিটি টুনা (১) বা ইল (২)। সবচেয়ে লম্বা একটানা অংশ খুঁজুন যাতে দুই ধরনের সমান সংখ্যক থাকে, আর প্রথম অর্ধেক পুরো এক ধরনের ও দ্বিতীয় অর্ধেক পুরো অন্য ধরনের।',
  ),
  input: L('n, then the types.', 'n, তারপর ধরনগুলো।'),
  output: L('The maximum length.', 'সর্বোচ্চ দৈর্ঘ্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵; both types appear', '২ ≤ n ≤ ১০⁵; দুই ধরনই আছে')] },
  samples: [
    { input: '7\n2 2 2 1 1 2 2', output: '4', explain: L('2 2 1 1 or 1 1 2 2.', '২ ২ ১ ১ বা ১ ১ ২ ২।') },
    { input: '6\n1 2 1 2 1 2', output: '2', explain: L('Runs of length 1.', '১ দৈর্ঘ্যের ধারা।') },
    { input: '9\n2 2 1 1 1 2 2 2 2', output: '6', explain: L('1 1 1 2 2 2.', '১ ১ ১ ২ ২ ২।') },
  ],
  observation: L('Split the row into maximal runs of equal type. A valid segment uses the end of one run and the start of the next, so for neighbouring runs of lengths x and y the best is 2 · min(x, y).', 'সারিটিকে একই ধরনের সর্বোচ্চ ধারায় ভাগ করুন। একটি বৈধ অংশ একটি ধারার শেষ আর পরেরটির শুরু ব্যবহার করে, তাই x আর y দৈর্ঘ্যের পাশাপাশি ধারার জন্য সেরা ২ · min(x, y)।'),
  approach: [L('Compute run lengths in one pass and take the max of 2 · min over neighbours.', 'এক পাসে ধারার দৈর্ঘ্য বের করে পাশাপাশি জোড়ার ২ · min-এর সর্বোচ্চ নিন।')],
  walkthrough: { input: '2 2 1 1 1 2 2 2 2', steps: [{ state: 'runs 2, 3, 4', text: L('2·min(2,3) = 4, 2·min(3,4) = 6.', '২·min(২,৩) = ৪, ২·min(৩,৪) = ৬।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'runs',
      kind: 'optimal',
      title: L('Run lengths', 'ধারার দৈর্ঘ্য'),
      idea: L('Answer = max over adjacent runs of 2 · min(len).', 'উত্তর = পাশাপাশি ধারার ওপর ২ · min(দৈর্ঘ্য)-এর সর্বোচ্চ।'),
      explain: [L('Run-length encoding turns many “contiguous equal values” problems into simple arithmetic on a short list.', 'রান-লেংথ এনকোডিং অনেক “একটানা সমান মান” প্রবলেমকে একটি ছোট তালিকার সরল হিসাবে বদলে দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> t(n);
    for (auto& x : t) cin >> x;
    vector<int> runs;
    for (int i = 0; i < n; i++) {
        if (i > 0 && t[i] == t[i - 1]) runs.back()++;
        else runs.push_back(1);
    }
    int best = 0;
    for (size_t i = 1; i < runs.size(); i++) best = max(best, 2 * min(runs[i], runs[i - 1]));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'expand',
      kind: 'method',
      title: L('Expand around each boundary', 'প্রতিটি সীমানার চারপাশে বাড়ানো'),
      idea: L('At each position where the type changes, grow left and right while both sides stay uniform.', 'যেখানে ধরন বদলায় সেখানে দুই পাশ একরঙা থাকা পর্যন্ত বামে আর ডানে বাড়ান।'),
      explain: [L('Every valid segment is centred on a boundary between two types. Expanding from each boundary costs at most the two run lengths, so the total is O(n).', 'প্রতিটি বৈধ অংশ দুই ধরনের মাঝের একটি সীমানাকে কেন্দ্র করে। প্রতিটি সীমানা থেকে বাড়াতে সর্বোচ্চ দুটি ধারার দৈর্ঘ্য লাগে, তাই মোট O(n)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> t(n);
    for (auto& x : t) cin >> x;
    int best = 0;
    for (int b = 1; b < n; b++) {
        if (t[b] == t[b - 1]) continue;
        int k = 1;
        while (b - k - 1 >= 0 && b + k < n && t[b - k - 1] == t[b - 1] && t[b + k] == t[b]) k++;
        best = max(best, 2 * k);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
  ],
  tests: [
    { input: '7\n2 2 2 1 1 2 2', output: '4', source: 'sample', note: sample(1) },
    { input: '6\n1 2 1 2 1 2', output: '2', source: 'sample', note: sample(2) },
    { input: '9\n2 2 1 1 1 2 2 2 2', output: '6', source: 'sample', note: sample(3) },
    { input: '2\n1 2', output: '2', source: 'own', note: L('Smallest case.', 'সবচেয়ে ছোট কেস।') },
  ],
  pitfalls: [L('Counting equal totals without requiring each half to be uniform (1 2 1 2 is not valid).', 'প্রতিটি অর্ধেক একরঙা না চেয়ে শুধু সমান মোট গোনা (১ ২ ১ ২ বৈধ নয়)।')],
  related: [{ id: '96A', name: 'Football', why: L('Runs of equal characters.', 'সমান অক্ষরের ধারা।') }],
  toolkit: ['vector'],
};

export const p1476A: ProblemEntry = {
  id: '1476A',
  contestId: 1476,
  index: 'A',
  name: 'K-divisible Sum',
  rating: 1000,
  tags: ['binary-search', 'constructive', 'greedy', 'math'],
  why: L('Pick the smallest valid total first, then spread it as evenly as possible.', 'আগে সবচেয়ে ছোট বৈধ মোট বাছুন, তারপর যত সম্ভব সমানভাবে ছড়ান।'),
  statement: L(
    'Build an array of n positive integers whose sum is divisible by k, so that the maximum element is as small as possible. Print that minimum possible maximum. There are t test cases.',
    'n-টি ধনাত্মক পূর্ণসংখ্যার একটি অ্যারে বানান যার যোগফল k দিয়ে বিভাজ্য, যাতে সর্বোচ্চ উপাদান যত ছোট সম্ভব হয়। সেই সর্বনিম্ন সম্ভাব্য সর্বোচ্চ প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and k.', 't; প্রতিটি টেস্টে n আর k।'),
  output: L('The minimum possible maximum.', 'সর্বনিম্ন সম্ভাব্য সর্বোচ্চ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, k ≤ 10⁹', '১ ≤ n, k ≤ ১০⁹')] },
  samples: [{ input: '4\n1 5\n4 3\n8 8\n8 17', output: '5\n2\n1\n3', explain: L('4 3: sum 6 as 2 1 2 1 gives max 2.', '৪ ৩: যোগফল ৬, ২ ১ ২ ১ দিলে সর্বোচ্চ ২।') }],
  observation: L('The sum must be at least n (all elements ≥ 1), so the smallest usable sum is the first multiple of k that is ≥ n: S = k · ⌈n / k⌉. Spreading S over n elements gives maximum ⌈S / n⌉.', 'যোগফল অন্তত n (সব উপাদান ≥ ১), তাই সবচেয়ে ছোট ব্যবহারযোগ্য যোগফল হলো n বা বড় k-এর প্রথম গুণিতক: S = k · ⌈n / k⌉। S-কে n-টি উপাদানে ছড়ালে সর্বোচ্চ ⌈S / n⌉।'),
  approach: [L('S = k · ⌈n / k⌉; answer ⌈S / n⌉.', 'S = k · ⌈n / k⌉; উত্তর ⌈S / n⌉।')],
  walkthrough: { input: '8 17', steps: [{ state: 'S = 17', text: L('17 over 8 elements: max ⌈17/8⌉ = 3.', '৮টি উপাদানে ১৭: সর্বোচ্চ ⌈১৭/৮⌉ = ৩।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Two ceiling divisions.', 'দুটি সিলিং ভাগ।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Smallest multiple of k, spread evenly', 'k-এর সবচেয়ে ছোট গুণিতক, সমানভাবে ছড়ানো'),
      idea: L('⌈k·⌈n/k⌉ / n⌉.', '⌈k·⌈n/k⌉ / n⌉।'),
      explain: [L('A larger total can never give a smaller maximum, so the smallest valid total is best. S can reach 2·10⁹, so use long long.', 'বড় মোট কখনো ছোট সর্বোচ্চ দিতে পারে না, তাই সবচেয়ে ছোট বৈধ মোটই সেরা। S ২·১০⁹ পর্যন্ত যেতে পারে, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long S = (n + k - 1) / k * k;
        cout << (S + n - 1) / n << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ceil-div', 'long-long'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Binary search on the maximum', 'সর্বোচ্চের ওপর বাইনারি সার্চ'),
      idea: L('With maximum m, any sum in [n, n·m] is reachable; check whether that range contains a multiple of k.', 'সর্বোচ্চ m হলে [n, n·m]-এর যেকোনো যোগফল পাওয়া যায়; এই পরিসরে k-এর কোনো গুণিতক আছে কি না দেখুন।'),
      explain: [L('ok(m) is monotone: a larger cap allows more sums. The range [n, n·m] contains a multiple of k exactly when ⌈n / k⌉ · k ≤ n · m.', 'ok(m) একঘেয়ে: বড় সীমা বেশি যোগফল অনুমোদন করে। [n, n·m] পরিসরে k-এর গুণিতক থাকে ঠিক তখনই যখন ⌈n / k⌉ · k ≤ n · m।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long target = (n + k - 1) / k * k;
        long long lo = 0, hi = 2000000001LL;   // ok(lo) false, ok(hi) true
        while (hi - lo > 1) {
            long long m = (lo + hi) / 2;
            (target <= n * m ? hi : lo) = m;
        }
        cout << hi << "\n";
    }
    return 0;
}
`,
      time: 'O(log k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '4\n1 5\n4 3\n8 8\n8 17', output: '5\n2\n1\n3', source: 'sample', note: sample(1) },
    { input: '1\n1000000000 1', output: '1', source: 'own', note: L('k = 1.', 'k = ১।') },
    { input: '1\n1 1000000000', output: '1000000000', source: 'own', note: L('One element.', 'একটি উপাদান।') },
  ],
  pitfalls: [L('Using k itself as the sum when n > k.', 'n > k হলেও k-কেই যোগফল ধরা।')],
  related: [{ id: '1996A', name: 'Legs', why: L('Another ceiling division.', 'আরেকটি সিলিং ভাগ।') }],
  toolkit: ['ceil-div'],
};

export const p1873E: ProblemEntry = {
  id: '1873E',
  contestId: 1873,
  index: 'E',
  name: 'Building an Aquarium',
  rating: 1100,
  tags: ['binary-search', 'sortings'],
  featuredFor: ['binary-search'],
  why: L('Binary search on the answer with a one-line check.', 'এক লাইনের যাচাইসহ উত্তরের ওপর বাইনারি সার্চ।'),
  statement: L(
    'Columns of coral have heights aᵢ. You choose a water height h; every column with aᵢ < h needs h − aᵢ units of water. With at most x units, find the largest h. There are t test cases.',
    'প্রবালের কলামগুলোর উচ্চতা aᵢ। আপনি একটি পানির উচ্চতা h বাছেন; aᵢ < h এমন প্রতিটি কলামে h − aᵢ একক পানি লাগে। সর্বোচ্চ x একক দিয়ে সবচেয়ে বড় h বের করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, x and the heights.', 't; প্রতিটি টেস্টে n, x আর উচ্চতাগুলো।'),
  output: L('The maximum h for each test.', 'প্রতিটি টেস্টের সর্বোচ্চ h।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵, x, aᵢ ≤ 10⁹', 'n ≤ ২·১০⁵, x, aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '5\n7 9\n3 1 2 4 6 2 5\n3 10\n1 1 1\n4 1\n1 4 3 4\n6 1984\n2 6 5 9 1 8\n1 1000000000\n1', output: '4\n4\n2\n335\n1000000001', explain: L('First test: h = 4 needs 1+3+2+0+0+2+0 = 8 ≤ 9.', 'প্রথম টেস্ট: h = ৪-এ ১+৩+২+০+০+২+০ = ৮ ≤ ৯।') },
  ],
  observation: L('water(h) = Σ max(0, h − aᵢ) grows with h, so binary search the largest h with water(h) ≤ x. The answer is at most min(a) + x ≤ 2·10⁹.', 'water(h) = Σ max(০, h − aᵢ) h-এর সঙ্গে বাড়ে, তাই water(h) ≤ x এমন সবচেয়ে বড় h-এ বাইনারি সার্চ করুন। উত্তর সর্বোচ্চ min(a) + x ≤ ২·১০⁹।'),
  approach: [L('lo = 1 (always fine), hi = 2·10⁹ + 1 (never fine), binary search.', 'lo = ১ (সবসময় ঠিক), hi = ২·১০⁹ + ১ (কখনো নয়), বাইনারি সার্চ।')],
  walkthrough: { input: '3 10 / 1 1 1', steps: [{ state: 'h = 4: 3·3 = 9 ≤ 10; h = 5: 12', text: L('Answer 4.', 'উত্তর ৪।') }] },
  complexity: { time: 'O(n log C)', space: 'O(n)', why: L('About 31 checks of O(n).', 'O(n)-এর প্রায় ৩১টি যাচাই।') },
  solutions: [
    {
      id: 'bsearch',
      kind: 'optimal',
      title: L('Binary search on h', 'h-এর ওপর বাইনারি সার্চ'),
      idea: L('ok(h) = Σ max(0, h − aᵢ) ≤ x.', 'ok(h) = Σ max(০, h − aᵢ) ≤ x।'),
      explain: [L('Stop summing early once the water passes x; it saves time and keeps the sum small. h = 1 is always valid since every aᵢ ≥ 1.', 'পানি x ছাড়ালেই যোগ আগে থামান; এতে সময় বাঁচে আর যোগফল ছোট থাকে। প্রতিটি aᵢ ≥ ১ হওয়ায় h = ১ সবসময় বৈধ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long x;
        cin >> n >> x;
        vector<long long> a(n);
        for (auto& v : a) cin >> v;
        auto ok = [&](long long h) {
            long long w = 0;
            for (long long v : a) { if (h > v) w += h - v; if (w > x) return false; }
            return true;
        };
        long long lo = 1, hi = 2000000001LL;
        while (hi - lo > 1) {
            long long mid = lo + (hi - lo) / 2;
            (ok(mid) ? lo : hi) = mid;
        }
        cout << lo << "\n";
    }
    return 0;
}
`,
      time: 'O(n log C)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'io-fast', 'long-long'],
    },
    {
      id: 'sorted',
      kind: 'method',
      title: L('Fill level by level after sorting', 'সর্টের পর স্তরে স্তরে ভরা'),
      idea: L('Sort; raise the water over the lowest c columns to the next height while x allows.', 'সর্ট করুন; x যতক্ষণ অনুমতি দেয়, সবচেয়ে নিচু c-টি কলামের ওপর পানি পরের উচ্চতা পর্যন্ত তুলুন।'),
      explain: [L('Like pouring real water: the first c columns are submerged at level cur; reaching a[c] costs c · (a[c] − cur). When x is not enough, the remaining water raises the level by x / c.', 'আসল পানি ঢালার মতো: প্রথম c-টি কলাম cur স্তরে ডুবে আছে; a[c]-এ পৌঁছাতে খরচ c · (a[c] − cur)। x যথেষ্ট না হলে বাকি পানি স্তর x / c বাড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long x;
        cin >> n >> x;
        vector<long long> a(n);
        for (auto& v : a) cin >> v;
        sort(a.begin(), a.end());
        long long cur = a[0];
        int c = 1;
        while (c < n && (a[c] - cur) * c <= x) {
            x -= (a[c] - cur) * c;
            cur = a[c];
            c++;
        }
        cout << cur + x / c << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long'],
    },
  ],
  tests: [
    { input: '5\n7 9\n3 1 2 4 6 2 5\n3 10\n1 1 1\n4 1\n1 4 3 4\n6 1984\n2 6 5 9 1 8\n1 1000000000\n1', output: '4\n4\n2\n335\n1000000001', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('hi too small: with one column the answer is a₁ + x.', 'hi খুব ছোট: একটি কলামে উত্তর a₁ + x।'), L('int overflow in the water sum.', 'পানির যোগফলে int ওভারফ্লো।')],
  related: [{ id: '1201C', name: 'Maximum Median', why: L('The same level-raising idea.', 'একই স্তর-তোলার আইডিয়া।') }],
  toolkit: ['lambda', 'long-long'],
};

export const p1352C: ProblemEntry = {
  id: '1352C',
  contestId: 1352,
  index: 'C',
  name: 'K-th Not Divisible by n',
  rating: 1200,
  tags: ['binary-search', 'math'],
  why: L('Counting function + binary search, or a direct formula from blocks of n − 1.', 'গণনার ফাংশন + বাইনারি সার্চ, বা n − ১-এর ব্লক থেকে সরাসরি সূত্র।'),
  statement: L(
    'Given n and k, print the k-th positive integer that is not divisible by n. There are t test cases.',
    'n আর k দেওয়া আছে; n দিয়ে বিভাজ্য নয় এমন k-তম ধনাত্মক পূর্ণসংখ্যা প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and k.', 't; প্রতিটি টেস্টে n আর k।'),
  output: L('The k-th such number.', 'k-তম এমন সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁹, 1 ≤ k ≤ 10⁹', '২ ≤ n ≤ ১০⁹, ১ ≤ k ≤ ১০⁹')] },
  samples: [
    { input: '6\n3 7\n4 12\n2 1000000000\n7 97\n1000000000 1000000000\n2 1', output: '10\n15\n1999999999\n113\n1000000001\n1', explain: L('n = 3: 1 2 4 5 7 8 10, the 7th is 10.', 'n = ৩: ১ ২ ৪ ৫ ৭ ৮ ১০, ৭ম হলো ১০।') },
  ],
  observation: L('Among 1..x, exactly x − ⌊x / n⌋ numbers are not divisible by n. This count grows with x, so the answer is the smallest x with count ≥ k.', '১..x-এর মধ্যে ঠিক x − ⌊x / n⌋টি সংখ্যা n দিয়ে বিভাজ্য নয়। এই গণনা x-এর সঙ্গে বাড়ে, তাই উত্তর হলো গণনা ≥ k এমন সবচেয়ে ছোট x।'),
  approach: [L('Formula: every block of n numbers has n − 1 good ones, so the answer is k + (k − 1) / (n − 1).', 'সূত্র: n সংখ্যার প্রতিটি ব্লকে n − ১টি ভালো, তাই উত্তর k + (k − ১) / (n − ১)।')],
  walkthrough: { input: '3 7', steps: [{ state: '(7 − 1) / 2 = 3 skipped multiples', text: L('7 + 3 = 10.', '৭ + ৩ = ১০।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Skip one multiple per n − 1 numbers', 'প্রতি n − ১ সংখ্যায় একটি গুণিতক বাদ'),
      idea: L('k + (k − 1) / (n − 1).', 'k + (k − ১) / (n − ১)।'),
      explain: [L('Before the k-th good number, (k − 1) / (n − 1) complete blocks have passed, each skipping exactly one multiple of n. The result reaches 2·10⁹, so use long long.', 'k-তম ভালো সংখ্যার আগে (k − ১) / (n − ১)টি পূর্ণ ব্লক পেরিয়ে যায়, প্রতিটিতে n-এর ঠিক একটি গুণিতক বাদ পড়ে। ফল ২·১০⁹ পর্যন্ত যায়, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        cout << k + (k - 1) / (n - 1) << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Binary search with a counting function', 'গণনার ফাংশনসহ বাইনারি সার্চ'),
      idea: L('Smallest x with x − x / n ≥ k.', 'x − x / n ≥ k এমন সবচেয়ে ছোট x।'),
      explain: [L('When a direct formula is hard to see, “count how many good numbers are ≤ x” plus binary search almost always works. This pattern solves many k-th element problems.', 'সরাসরি সূত্র চোখে না পড়লে “x পর্যন্ত কতগুলো ভালো সংখ্যা” গোনা আর বাইনারি সার্চ প্রায় সবসময় কাজ করে। এই প্যাটার্ন অনেক k-তম উপাদানের প্রবলেম সমাধান করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long lo = 0, hi = 4000000000LL;   // count(lo) < k <= count(hi)
        while (hi - lo > 1) {
            long long x = (lo + hi) / 2;
            (x - x / n >= k ? hi : lo) = x;
        }
        cout << hi << "\n";
    }
    return 0;
}
`,
      time: 'O(log C)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '6\n3 7\n4 12\n2 1000000000\n7 97\n1000000000 1000000000\n2 1', output: '10\n15\n1999999999\n113\n1000000001\n1', source: 'sample', note: sample(1) },
    { input: '1\n2 3', output: '5', source: 'own', note: L('Odd numbers: 1, 3, 5.', 'বিজোড় সংখ্যা: ১, ৩, ৫।') },
  ],
  pitfalls: [L('Simulating up to 2·10⁹.', '২·১০⁹ পর্যন্ত সিমুলেশন।'), L('Off by one: (k − 1) / (n − 1), not k / (n − 1).', 'এক কম-বেশি: (k − ১) / (n − ১), k / (n − ১) নয়।')],
  related: [{ id: '1475B', name: "New Year's Number", why: L('Quotient-and-remainder reasoning.', 'ভাগফল-ভাগশেষ যুক্তি।') }],
  toolkit: ['long-long'],
};

export const p600B: ProblemEntry = {
  id: '600B',
  contestId: 600,
  index: 'B',
  name: 'Queries about less or equal elements',
  rating: 1300,
  tags: ['binary-search', 'data-structures', 'sortings', 'two-pointers'],
  why: L('Two ways to answer “how many ≤ b?”: binary search per query, or sort the queries and sweep with two pointers.', '“কতগুলো ≤ b?” উত্তরের দুটি উপায়: প্রতি কোয়েরিতে বাইনারি সার্চ, বা কোয়েরি সর্ট করে টু পয়েন্টারে চলা।'),
  statement: L(
    'Given arrays a (n numbers) and b (m numbers), for every bⱼ print how many elements of a are less than or equal to bⱼ.',
    'অ্যারে a (n-টি সংখ্যা) আর b (m-টি সংখ্যা) দেওয়া আছে; প্রতিটি bⱼ-এর জন্য প্রিন্ট করুন a-এর কতগুলো উপাদান bⱼ-এর সমান বা ছোট।',
  ),
  input: L('n and m, then a, then b.', 'n আর m, তারপর a, তারপর b।'),
  output: L('m numbers.', 'm-টি সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, m ≤ 2·10⁵, |values| ≤ 10⁹', 'n, m ≤ ২·১০⁵, |মান| ≤ ১০⁹')] },
  samples: [
    { input: '5 4\n1 3 5 7 9\n6 4 2 8', output: '3 2 1 4', explain: L('≤ 6: 1, 3, 5.', '≤ ৬: ১, ৩, ৫।') },
    { input: '5 5\n1 2 1 2 5\n3 1 4 1 5', output: '4 2 4 2 5', explain: L('Duplicates are counted.', 'ডুপ্লিকেটও গোনা হয়।') },
  ],
  observation: L('After sorting a, the count for b is the position of the first element greater than b.', 'a সর্টের পর b-এর গণনা হলো b-এর বড় প্রথম উপাদানের অবস্থান।'),
  approach: [L('Sort a; upper_bound for each query.', 'a সর্ট করুন; প্রতিটি কোয়েরিতে upper_bound।')],
  walkthrough: { input: 'a = 1 3 5 7 9, b = 6', steps: [{ state: 'upper_bound(6) → index 3', text: L('3.', '৩।') }] },
  complexity: { time: 'O((n + m) log n)', space: 'O(n)', why: L('Sort plus binary searches.', 'সর্ট আর বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'upper',
      kind: 'optimal',
      title: L('Sort + upper_bound', 'সর্ট + upper_bound'),
      idea: L('upper_bound(a, b) − a.begin().', 'upper_bound(a, b) − a.begin()।'),
      explain: [L('This is the standard “count ≤ v” query; remember that upper_bound (not lower_bound) includes the elements equal to v.', 'এটি প্রচলিত “≤ v গোনা” কোয়েরি; মনে রাখুন upper_bound (lower_bound নয়) v-এর সমান উপাদানগুলোও ধরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    for (int j = 0; j < m; j++) {
        int b;
        cin >> b;
        cout << upper_bound(a.begin(), a.end(), b) - a.begin() << ' ';
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'io-fast'],
    },
    {
      id: 'sweep',
      kind: 'method',
      title: L('Sort queries, sweep with two pointers', 'কোয়েরি সর্ট, টু পয়েন্টারে চলা'),
      idea: L('Process queries in increasing order; the pointer into a only moves forward.', 'কোয়েরিগুলো বাড়তি ক্রমে দেখুন; a-তে পয়েন্টার শুধু সামনে যায়।'),
      explain: [L('Offline processing: sort queries with their original indices, answer them in sorted order, then print in the original order. This sweep idea is the base of many harder offline techniques.', 'অফলাইন প্রক্রিয়া: আসল ইনডেক্সসহ কোয়েরি সর্ট করে সাজানো ক্রমে উত্তর দিন, তারপর আসল ক্রমে প্রিন্ট করুন। এই সুইপ আইডিয়া অনেক কঠিন অফলাইন কৌশলের ভিত্তি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    vector<pair<int, int>> q(m);
    for (int j = 0; j < m; j++) cin >> q[j].first, q[j].second = j;
    sort(q.begin(), q.end());
    vector<int> ans(m);
    int i = 0;
    for (auto [b, j] : q) {
        while (i < n && a[i] <= b) i++;
        ans[j] = i;
    }
    for (int x : ans) cout << x << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n log n + m log m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['sort', 'pair', 'structured-bindings'],
    },
  ],
  tests: [
    { input: '5 4\n1 3 5 7 9\n6 4 2 8', output: '3 2 1 4', source: 'sample', note: sample(1) },
    { input: '5 5\n1 2 1 2 5\n3 1 4 1 5', output: '4 2 4 2 5', source: 'sample', note: sample(2) },
    { input: '2 2\n-5 5\n-10 10', output: '0 2', source: 'own', note: L('Negative values.', 'ঋণাত্মক মান।') },
  ],
  pitfalls: [L('lower_bound, which misses equal elements.', 'lower_bound, যা সমান উপাদান বাদ দেয়।')],
  related: [{ id: '706B', name: 'Interesting drink', why: L('The same query.', 'একই কোয়েরি।') }],
  toolkit: ['sort', 'lower-bound'],
};

export const p580B: ProblemEntry = {
  id: '580B',
  contestId: 580,
  index: 'B',
  name: 'Kefa and Company',
  rating: 1500,
  tags: ['binary-search', 'sortings', 'two-pointers'],
  featuredFor: ['two-pointers'],
  why: L('Sort by one key, then a sliding window with a running sum of another.', 'এক কী অনুযায়ী সর্ট, তারপর অন্য কীর চলতি যোগফলসহ স্লাইডিং উইন্ডো।'),
  statement: L(
    'Kefa has n friends; friend i has money mᵢ and friendship factor sᵢ. He invites a group in which nobody feels poor: no one has at least d more money than another. Maximise the total friendship factor of the group.',
    'কেফার n জন বন্ধু; বন্ধু i-এর টাকা mᵢ আর বন্ধুত্বের মান sᵢ। সে এমন একটি দলকে আমন্ত্রণ জানায় যেখানে কেউ নিজেকে গরিব মনে করে না: কারও টাকা অন্য কারও চেয়ে অন্তত d বেশি নয়। দলের মোট বন্ধুত্বের মান সর্বোচ্চ করুন।',
  ),
  input: L('n and d, then n lines mᵢ sᵢ.', 'n আর d, তারপর n-টি লাইন mᵢ sᵢ।'),
  output: L('The maximum total friendship.', 'সর্বোচ্চ মোট বন্ধুত্ব।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, values ≤ 10⁹', '১ ≤ n ≤ ১০⁵, মান ≤ ১০⁹')] },
  samples: [
    { input: '4 5\n75 5\n0 100\n150 20\n75 1', output: '100', explain: L('Invite only the friend with 0 money.', 'শুধু ০ টাকার বন্ধুকে আমন্ত্রণ।') },
    { input: '5 100\n0 7\n11 32\n99 10\n46 8\n87 54', output: '111', explain: L('Everyone: the spread is 99 < 100.', 'সবাই: ব্যাপ্তি ৯৯ < ১০০।') },
  ],
  observation: L('After sorting by money, a valid group is best taken as a contiguous window with max − min < d (adding anyone in between never hurts).', 'টাকা অনুযায়ী সর্টের পর বৈধ দল সবচেয়ে ভালো হয় একটি একটানা উইন্ডো হিসেবে যেখানে max − min < d (মাঝের কাউকে যোগ করায় কখনো ক্ষতি নেই)।'),
  approach: [L('Sliding window over the sorted friends with a running sum of sᵢ.', 'সাজানো বন্ধুদের ওপর sᵢ-এর চলতি যোগফলসহ স্লাইডিং উইন্ডো।')],
  walkthrough: { input: '0 11 46 87 99, d = 100', steps: [{ state: 'window covers all, spread 99', text: L('Sum 111.', 'যোগফল ১১১।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort, then a linear window.', 'একটি সর্ট, তারপর রৈখিক উইন্ডো।') },
  solutions: [
    {
      id: 'window',
      kind: 'optimal',
      title: L('Two pointers after sorting', 'সর্টের পর টু পয়েন্টার'),
      idea: L('Move l while m[r] − m[l] ≥ d.', 'm[r] − m[l] ≥ d যতক্ষণ, l সরান।'),
      explain: [L('All sᵢ are non-negative, so the widest valid window ending at r is the best one ending there. Totals reach 10¹⁴: long long.', 'সব sᵢ অঋণাত্মক, তাই r-এ শেষ হওয়া সবচেয়ে চওড়া বৈধ উইন্ডোই সেখানে সেরা। মোট ১০¹⁴ পর্যন্ত: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long d;
    cin >> n >> d;
    vector<pair<long long, long long>> f(n);
    for (auto& [m, s] : f) cin >> m >> s;
    sort(f.begin(), f.end());
    long long sum = 0, best = 0;
    for (int l = 0, r = 0; r < n; r++) {
        sum += f[r].second;
        while (f[r].first - f[l].first >= d) sum -= f[l++].second;
        best = max(best, sum);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'pair', 'long-long'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Prefix sums + binary search', 'প্রিফিক্স সাম + বাইনারি সার্চ'),
      idea: L('For each poorest friend i, the group ends before the first friend with money ≥ mᵢ + d.', 'প্রতিটি সবচেয়ে গরিব বন্ধু i-এর জন্য দলটি mᵢ + d বা বেশি টাকার প্রথম বন্ধুর আগে শেষ হয়।'),
      explain: [L('lower_bound on the sorted money finds that end; a prefix sum of sᵢ gives the window total in O(1).', 'সাজানো টাকায় lower_bound সেই শেষ খুঁজে পায়; sᵢ-এর প্রিফিক্স সাম O(১)-এ উইন্ডোর মোট দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    long long d;
    cin >> n >> d;
    vector<pair<long long, long long>> f(n);
    for (auto& [m, s] : f) cin >> m >> s;
    sort(f.begin(), f.end());
    vector<long long> money(n), pre(n + 1, 0);
    for (int i = 0; i < n; i++) money[i] = f[i].first, pre[i + 1] = pre[i] + f[i].second;
    long long best = 0;
    for (int i = 0; i < n; i++) {
        int end = lower_bound(money.begin(), money.end(), money[i] + d) - money.begin();
        best = max(best, pre[end] - pre[i]);
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'lower-bound'],
    },
  ],
  tests: [
    { input: '4 5\n75 5\n0 100\n150 20\n75 1', output: '100', source: 'sample', note: sample(1) },
    { input: '5 100\n0 7\n11 32\n99 10\n46 8\n87 54', output: '111', source: 'sample', note: sample(2) },
    { input: '2 1\n5 3\n5 4', output: '7', source: 'own', note: L('Equal money is fine.', 'সমান টাকা ঠিক আছে।') },
  ],
  pitfalls: [L('Using > d instead of ≥ d for “feels poor”.', '“গরিব মনে করা”-র জন্য ≥ d-এর বদলে > d।')],
  related: [{ id: '279B', name: 'Books', why: L('Sliding window.', 'স্লাইডিং উইন্ডো।') }],
  toolkit: ['sort', 'pair'],
};

export const p702C: ProblemEntry = {
  id: '702C',
  contestId: 702,
  index: 'C',
  name: 'Cellular Network',
  rating: 1500,
  tags: ['binary-search', 'implementation', 'two-pointers'],
  why: L('Nearest neighbour in a sorted list, for every point.', 'প্রতিটি বিন্দুর জন্য সাজানো তালিকায় সবচেয়ে কাছের প্রতিবেশী।'),
  statement: L(
    'n cities and m cellular towers lie on a line (both lists sorted). Every tower covers cities within distance r. Find the minimum r so that every city is covered.',
    'n-টি শহর আর m-টি মোবাইল টাওয়ার একটি রেখায় (দুটি তালিকাই সাজানো)। প্রতিটি টাওয়ার r দূরত্বের মধ্যে শহর ঢাকে। প্রতিটি শহর ঢাকা পড়ে এমন সর্বনিম্ন r বের করুন।',
  ),
  input: L('n and m, the cities, then the towers.', 'n আর m, শহরগুলো, তারপর টাওয়ারগুলো।'),
  output: L('The minimum r.', 'সর্বনিম্ন r।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('n, m ≤ 10⁵, |coordinates| ≤ 10⁹', 'n, m ≤ ১০⁵, |স্থানাঙ্ক| ≤ ১০⁹')] },
  samples: [
    { input: '3 2\n-2 2 4\n-3 0', output: '4', explain: L('City 4 is 4 away from tower 0.', 'শহর ৪, টাওয়ার ০ থেকে ৪ দূরে।') },
    { input: '5 3\n1 5 10 14 17\n4 11 15', output: '3', explain: L('City 1 is 3 from tower 4.', 'শহর ১, টাওয়ার ৪ থেকে ৩ দূরে।') },
  ],
  observation: L('r must be at least the distance from each city to its nearest tower, and that is enough. So the answer is the maximum over cities of the nearest-tower distance.', 'r-কে প্রতিটি শহর থেকে তার সবচেয়ে কাছের টাওয়ারের দূরত্বের সমান বা বড় হতে হবে, আর সেটাই যথেষ্ট। তাই উত্তর হলো শহরগুলোর ওপর সবচেয়ে কাছের টাওয়ারের দূরত্বের সর্বোচ্চ।'),
  approach: [L('For each city, lower_bound into the towers and check the tower found and the one before it.', 'প্রতিটি শহরের জন্য টাওয়ারে lower_bound করে পাওয়া টাওয়ার আর তার আগেরটি দেখুন।')],
  walkthrough: { input: 'city 1, towers 4 11 15', steps: [{ state: 'lower_bound → 4, no tower before', text: L('Distance 3.', 'দূরত্ব ৩।') }] },
  complexity: { time: 'O(n log m)', space: 'O(n + m)', why: L('A binary search per city.', 'প্রতি শহরে একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'lower',
      kind: 'optimal',
      title: L('Nearest tower by lower_bound', 'lower_bound দিয়ে সবচেয়ে কাছের টাওয়ার'),
      idea: L('The nearest tower is either the first one ≥ city or the one just before it.', 'সবচেয়ে কাছের টাওয়ার হয় শহর বা তার পরের প্রথমটি, নয়তো ঠিক তার আগেরটি।'),
      explain: [L('Check both candidates, handling the cases where lower_bound returns begin() or end().', 'দুটি প্রার্থীই দেখুন, lower_bound যখন begin() বা end() দেয় সেই কেসগুলো সামলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<long long> a(n), b(m);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    long long r = 0;
    for (long long city : a) {
        auto it = lower_bound(b.begin(), b.end(), city);
        long long d = LLONG_MAX;
        if (it != b.end()) d = min(d, *it - city);
        if (it != b.begin()) d = min(d, city - *prev(it));
        r = max(r, d);
    }
    cout << r << "\n";
    return 0;
}
`,
      time: 'O(n log m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['lower-bound', 'min-max'],
    },
    {
      id: 'pointers',
      kind: 'method',
      title: L('Two pointers over both sorted lists', 'দুটি সাজানো তালিকায় টু পয়েন্টার'),
      idea: L('As cities move right, the nearest tower index never moves left.', 'শহরগুলো ডানে সরলে সবচেয়ে কাছের টাওয়ারের ইনডেক্স কখনো বামে সরে না।'),
      explain: [L('Advance j while the next tower is at least as close to the current city. Both pointers only move forward, so the scan is O(n + m).', 'পরের টাওয়ারটি বর্তমান শহরের অন্তত সমান কাছে থাকলে j এগোন। দুটি পয়েন্টারই শুধু সামনে যায়, তাই স্ক্যান O(n + m)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<long long> a(n), b(m);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    long long r = 0;
    int j = 0;
    for (long long city : a) {
        while (j + 1 < m && llabs(b[j + 1] - city) <= llabs(b[j] - city)) j++;
        r = max(r, llabs(b[j] - city));
    }
    cout << r << "\n";
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['while-n'],
    },
  ],
  tests: [
    { input: '3 2\n-2 2 4\n-3 0', output: '4', source: 'sample', note: sample(1) },
    { input: '5 3\n1 5 10 14 17\n4 11 15', output: '3', source: 'sample', note: sample(2) },
    { input: '1 1\n5\n5', output: '0', source: 'own', note: L('Tower on the city.', 'শহরের ওপরই টাওয়ার।') },
  ],
  pitfalls: [L('Checking only the tower to the right.', 'শুধু ডানের টাওয়ার দেখা।')],
  related: [{ id: '492B', name: 'Vanya and Lanterns', why: L('Coverage on a line.', 'রেখায় আবরণ।') }],
  toolkit: ['lower-bound'],
};

export const p448D: ProblemEntry = {
  id: '448D',
  contestId: 448,
  index: 'D',
  name: 'Multiplication Table',
  rating: 1800,
  tags: ['binary-search', 'brute-force'],
  why: L('The k-th smallest of a huge implicit table: binary search on the value with an O(n) counter.', 'একটি বিশাল অন্তর্নিহিত টেবিলের k-তম ছোট: O(n) গণক দিয়ে মানের ওপর বাইনারি সার্চ।'),
  statement: L(
    'An n × m multiplication table has i · j in row i, column j. Print the k-th smallest number in the table (counting duplicates).',
    'একটি n × m গুণের টেবিলে সারি i, কলাম j-তে i · j। টেবিলের k-তম ছোট সংখ্যা প্রিন্ট করুন (ডুপ্লিকেটসহ গুনে)।',
  ),
  input: L('n, m and k.', 'n, m আর k।'),
  output: L('The k-th smallest value.', 'k-তম ছোট মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 5·10⁵, 1 ≤ k ≤ n·m', '১ ≤ n, m ≤ ৫·১০⁵, ১ ≤ k ≤ n·m')] },
  samples: [
    { input: '2 2 2', output: '2', explain: L('Values 1 2 2 4.', 'মান ১ ২ ২ ৪।') },
    { input: '2 3 4', output: '3', explain: L('Values 1 2 2 3 4 6.', 'মান ১ ২ ২ ৩ ৪ ৬।') },
    { input: '1 10 5', output: '5', explain: L('A single row 1..10.', 'একটি সারি ১..১০।') },
  ],
  observation: L('How many entries are ≤ x? Row i contributes min(m, ⌊x / i⌋). That count grows with x, so the answer is the smallest x with count ≥ k.', 'কতগুলো ঘর ≤ x? সারি i দেয় min(m, ⌊x / i⌋)। এই গণনা x-এর সঙ্গে বাড়ে, তাই উত্তর হলো গণনা ≥ k এমন সবচেয়ে ছোট x।'),
  approach: [L('Binary search x in [1, n·m] with the O(n) counter.', 'O(n) গণক দিয়ে [১, n·m]-এ x-এ বাইনারি সার্চ।')],
  walkthrough: { input: '2 3 4', steps: [{ state: 'count(2) = 2 + 1 = 3 < 4; count(3) = 3 + 1 = 4', text: L('Answer 3.', 'উত্তর ৩।') }] },
  complexity: { time: 'O(n log(nm))', space: 'O(1)', why: L('About 38 counts of O(n).', 'O(n)-এর প্রায় ৩৮টি গণনা।') },
  solutions: [
    {
      id: 'bsearch',
      kind: 'optimal',
      title: L('Binary search on the value', 'মানের ওপর বাইনারি সার্চ'),
      idea: L('count(x) = Σ min(m, x / i).', 'count(x) = Σ min(m, x / i)।'),
      explain: [L('The table has up to 2.5·10¹¹ entries, so it can never be built. Counting how many are ≤ x needs only one pass over the rows. Loop over the smaller dimension to make it faster.', 'টেবিলে ২.৫·১০¹¹ পর্যন্ত ঘর, তাই কখনো বানানো যায় না। কতগুলো ≤ x তা গুনতে শুধু সারিগুলোর ওপর একবার যেতে হয়। দ্রুত করতে ছোট মাত্রার ওপর লুপ চালান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m, k;
    cin >> n >> m >> k;
    if (n > m) swap(n, m);
    auto count = [&](long long x) {
        long long c = 0;
        for (long long i = 1; i <= n; i++) c += min(m, x / i);
        return c;
    };
    long long lo = 0, hi = n * m;   // count(lo) < k <= count(hi)
    while (hi - lo > 1) {
        long long mid = (lo + hi) / 2;
        (count(mid) >= k ? hi : lo) = mid;
    }
    cout << hi << "\n";
    return 0;
}
`,
      time: 'O(min(n, m) · log(nm))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Build and sort the table', 'টেবিল বানিয়ে সর্ট'),
      idea: L('List every product and use nth_element.', 'প্রতিটি গুণফল তালিকা করে nth_element ব্যবহার।'),
      explain: [L('Only possible for small tables; it is the reference for the binary search.', 'শুধু ছোট টেবিলে সম্ভব; এটি বাইনারি সার্চের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, m, k;
    cin >> n >> m >> k;
    if (n * m > 10000000) return 0;   // too big to build
    vector<long long> v;
    for (long long i = 1; i <= n; i++)
        for (long long j = 1; j <= m; j++) v.push_back(i * j);
    nth_element(v.begin(), v.begin() + (k - 1), v.end());
    cout << v[k - 1] << "\n";
    return 0;
}
`,
      time: 'O(nm)',
      space: 'O(nm)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '2 2 2', output: '2', source: 'sample', note: sample(1) },
    { input: '2 3 4', output: '3', source: 'sample', note: sample(2) },
    { input: '1 10 5', output: '5', source: 'sample', note: sample(3) },
    { input: '500000 500000 250000000000', output: '250000000000', source: 'own', note: L('The largest entry.', 'সবচেয়ে বড় ঘর।') },
  ],
  pitfalls: [L('Building the table.', 'টেবিল বানানো।'), L('int overflow in n · m.', 'n · m-এ int ওভারফ্লো।')],
  related: [{ id: '1352C', name: 'K-th Not Divisible by n', why: L('k-th element via counting.', 'গণনা দিয়ে k-তম উপাদান।') }],
  toolkit: ['lambda', 'long-long'],
};
