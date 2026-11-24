import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1492C: ProblemEntry = {
  id: '1492C',
  contestId: 1492,
  index: 'C',
  name: 'Maximum width',
  rating: 1500,
  tags: ['binary-search', 'data-structures', 'dp', 'greedy', 'two-pointers'],
  featuredFor: ['two-pointers'],
  why: L('Earliest and latest matching positions, from two greedy scans.', 'দুটি গ্রিডি স্ক্যান থেকে সবচেয়ে আগের আর সবচেয়ে পরের মেলানোর অবস্থান।'),
  statement: L(
    'String t (length m) is a subsequence of s (length n). Choose positions p₁ < … < pₘ in s with s[pᵢ] = t[i]. The width is the maximum gap pᵢ₊₁ − pᵢ. Find the maximum possible width.',
    'স্ট্রিং t (দৈর্ঘ্য m) হলো s (দৈর্ঘ্য n)-এর সাবসিকোয়েন্স। s-এ অবস্থান p₁ < … < pₘ বাছুন যেখানে s[pᵢ] = t[i]। প্রস্থ হলো সর্বোচ্চ ফাঁক pᵢ₊₁ − pᵢ। সর্বোচ্চ সম্ভাব্য প্রস্থ বের করুন।',
  ),
  input: L('n and m, then s and t.', 'n আর m, তারপর s আর t।'),
  output: L('The maximum width.', 'সর্বোচ্চ প্রস্থ।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('2 ≤ m ≤ n ≤ 2·10⁵', '২ ≤ m ≤ n ≤ ২·১০⁵')] },
  samples: [
    { input: '5 3\nabbbc\nabc', output: '3', explain: L('Positions 1, 2, 5 (or 1, 4, 5).', 'অবস্থান ১, ২, ৫ (বা ১, ৪, ৫)।') },
    { input: '5 2\naaaaa\naa', output: '4', explain: L('First and last a.', 'প্রথম আর শেষ a।') },
    { input: '5 5\nabcdf\nabcdf', output: '1', explain: L('Every position is forced.', 'প্রতিটি অবস্থান বাধ্যতামূলক।') },
    { input: '2 2\nab\nab', output: '1', explain: L('Adjacent.', 'পাশাপাশি।') },
  ],
  observation: L('left[i] = earliest position where t[0..i] can be matched; right[i] = latest position where t[i..m−1] can still be matched. For the gap between t[i] and t[i+1], put t[i] as early as possible and t[i+1] as late as possible: right[i+1] − left[i].', 'left[i] = সবচেয়ে আগের অবস্থান যেখানে t[০..i] মেলানো যায়; right[i] = সবচেয়ে পরের অবস্থান যেখানে t[i..m−১] তখনও মেলানো যায়। t[i] আর t[i+১]-এর ফাঁকে t[i] যত আগে আর t[i+১] যত পরে সম্ভব রাখুন: right[i+১] − left[i]।'),
  approach: [L('One greedy scan from the left, one from the right, then maximise right[i+1] − left[i].', 'বাম থেকে একটি গ্রিডি স্ক্যান, ডান থেকে একটি, তারপর right[i+১] − left[i] সর্বোচ্চ করুন।')],
  walkthrough: { input: 'abbbc / abc', steps: [{ state: 'left = 0 1 4, right = 0 3 4', text: L('max(3 − 0, 4 − 1) = 3.', 'max(৩ − ০, ৪ − ১) = ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(m)', why: L('Two linear scans.', 'দুটি রৈখিক স্ক্যান।') },
  solutions: [
    {
      id: 'left-right',
      kind: 'optimal',
      title: L('Earliest and latest matches', 'সবচেয়ে আগের আর পরের মিল'),
      idea: L('Two pointers from each end.', 'প্রতিটি প্রান্ত থেকে দুটি পয়েন্টার।'),
      explain: [L('Mixing the two arrays is valid: t[0..i] fits up to left[i], t[i+1..] fits from right[i+1], and left[i] < right[i+1] whenever a valid matching exists.', 'দুটি অ্যারে মেশানো বৈধ: t[০..i] left[i] পর্যন্ত আঁটে, t[i+১..] right[i+১] থেকে আঁটে, আর বৈধ মিল থাকলে left[i] < right[i+১]।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    string s, t;
    cin >> n >> m >> s >> t;
    vector<int> left(m), right(m);
    for (int i = 0, j = 0; j < m; i++)
        if (s[i] == t[j]) left[j++] = i;
    for (int i = n - 1, j = m - 1; j >= 0; i--)
        if (s[i] == t[j]) right[j--] = i;
    int best = 0;
    for (int i = 0; i + 1 < m; i++) best = max(best, right[i + 1] - left[i]);
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'positions',
      kind: 'method',
      title: L('Positions per letter + binary search', 'প্রতি অক্ষরের অবস্থান + বাইনারি সার্চ'),
      idea: L('Compute left[] with upper_bound on each letter’s position list, and right[] symmetrically.', 'প্রতিটি অক্ষরের অবস্থানের তালিকায় upper_bound দিয়ে left[], আর একইভাবে right[]।'),
      explain: [L('“Next occurrence of letter c after position p” by binary search is a reusable building block for subsequence problems with many queries.', 'বাইনারি সার্চে “p অবস্থানের পরে অক্ষর c-এর পরের উপস্থিতি” অনেক কোয়েরির সাবসিকোয়েন্স প্রবলেমে বারবার ব্যবহারযোগ্য অংশ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    string s, t;
    cin >> n >> m >> s >> t;
    vector<vector<int>> pos(26);
    for (int i = 0; i < n; i++) pos[s[i] - 'a'].push_back(i);
    vector<int> left(m), right(m);
    int p = -1;
    for (int j = 0; j < m; j++) {
        auto& v = pos[t[j] - 'a'];
        p = left[j] = *upper_bound(v.begin(), v.end(), p);
    }
    p = n;
    for (int j = m - 1; j >= 0; j--) {
        auto& v = pos[t[j] - 'a'];
        p = right[j] = *prev(lower_bound(v.begin(), v.end(), p));
    }
    int best = 0;
    for (int i = 0; i + 1 < m; i++) best = max(best, right[i + 1] - left[i]);
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n + m log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lower-bound', 'vector'],
    },
  ],
  tests: [
    { input: '5 3\nabbbc\nabc', output: '3', source: 'sample', note: sample(1) },
    { input: '5 2\naaaaa\naa', output: '4', source: 'sample', note: sample(2) },
    { input: '5 5\nabcdf\nabcdf', output: '1', source: 'sample', note: sample(3) },
    { input: '2 2\nab\nab', output: '1', source: 'sample', note: sample(4) },
  ],
  pitfalls: [L('Using only the greedy-leftmost matching.', 'শুধু গ্রিডি-বামতম মিল ব্যবহার।')],
  related: [{ id: '58A', name: 'Chat room', why: L('Greedy subsequence matching.', 'গ্রিডি সাবসিকোয়েন্স মেলানো।') }],
  toolkit: ['vector'],
};

export const p1873D: ProblemEntry = {
  id: '1873D',
  contestId: 1873,
  index: 'D',
  name: '1D Eraser',
  rating: 800,
  tags: ['greedy', 'implementation', 'two-pointers'],
  why: L('Greedy covering: start an operation at the first black cell and jump k ahead.', 'গ্রিডি আবরণ: প্রথম কালো ঘরে একটি অপারেশন শুরু করে k ঘর এগিয়ে লাফ।'),
  statement: L('A strip of n cells is B or W. One operation turns k consecutive cells white. Find the minimum number of operations to make every cell white. There are t test cases.', 'n ঘরের একটি ফালি B বা W। একটি অপারেশন পরপর k-টি ঘর সাদা করে। প্রতিটি ঘর সাদা করতে সর্বনিম্ন কয়টি অপারেশন লাগে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n, k and the strip.', 't; প্রতিটি টেস্টে n, k আর ফালি।'),
  output: L('The minimum number of operations.', 'সর্বনিম্ন অপারেশনের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '8\n6 3\nWBWWWB\n7 3\nWWBWBWW\n5 4\nBWBWB\n5 5\nBBBBB\n8 2\nBWBWBBBB\n10 2\nWBBWBBWBBW\n4 1\nBBBB\n3 2\nWWW', output: '2\n1\n2\n1\n4\n3\n4\n0', explain: L('WWBWBWW: one operation on cells 3..5.', 'WWBWBWW: ঘর ৩..৫-এ একটি অপারেশন।') }],
  observation: L('The leftmost black cell must be covered by some operation; starting that operation exactly at it covers the most cells to its right.', 'সবচেয়ে বামের কালো ঘর কোনো অপারেশনে ঢাকতেই হবে; ঠিক সেখান থেকে অপারেশন শুরু করলে এর ডানে সবচেয়ে বেশি ঘর ঢাকে।'),
  approach: [L('Scan i; when s[i] is B, count one and jump to i + k.', 'i ধরে স্ক্যান; s[i] B হলে একটি গুনে i + k-তে লাফ দিন।')],
  walkthrough: { input: 'WBWWWB, k = 3', steps: [{ state: 'B at 1 → cover 1..3, jump to 4', text: L('B at 5 → second operation. 2.', '৫-এ B → দ্বিতীয় অপারেশন। ২।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'jump',
      kind: 'optimal',
      title: L('Jump k after each operation', 'প্রতিটি অপারেশনের পর k লাফ'),
      idea: L('i += k on B, i++ on W.', 'B-তে i += k, W-তে i++।'),
      explain: [L('An operation may extend past the end of the strip in effect (we simply stop), which matches the real rule since we can always shift it left over white cells.', 'একটি অপারেশন কার্যত ফালির শেষ ছাড়াতে পারে (আমরা শুধু থামি), যা আসল নিয়মের সঙ্গে মেলে কারণ সাদা ঘরের ওপর একে সবসময় বামে সরানো যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        string s;
        cin >> n >> k >> s;
        int ops = 0;
        for (int i = 0; i < n;) {
            if (s[i] == 'B') { ops++; i += k; }
            else i++;
        }
        cout << ops << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'covered',
      kind: 'method',
      title: L('Track how far is already white', 'কতদূর সাদা তা রাখা'),
      idea: L('Keep coveredUntil; a B beyond it starts a new operation.', 'coveredUntil রাখুন; এর পরের B নতুন অপারেশন শুরু করে।'),
      explain: [L('The same greedy written as interval covering: a variable remembers the end of the last operation. This form generalises to covering points with intervals of fixed length.', 'একই গ্রিডি ব্যবধান-আবরণ হিসেবে লেখা: একটি ভেরিয়েবল শেষ অপারেশনের শেষ মনে রাখে। এই রূপ নির্দিষ্ট দৈর্ঘ্যের ব্যবধান দিয়ে বিন্দু ঢাকায় খাটে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        string s;
        cin >> n >> k >> s;
        int ops = 0, coveredUntil = -1;
        for (int i = 0; i < n; i++)
            if (s[i] == 'B' && i > coveredUntil) { ops++; coveredUntil = i + k - 1; }
        cout << ops << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '8\n6 3\nWBWWWB\n7 3\nWWBWBWW\n5 4\nBWBWB\n5 5\nBBBBB\n8 2\nBWBWBBBB\n10 2\nWBBWBBWBBW\n4 1\nBBBB\n3 2\nWWW', output: '2\n1\n2\n1\n4\n3\n4\n0', source: 'sample', note: sample(1) }],
  pitfalls: [L('Starting operations at white cells.', 'সাদা ঘরে অপারেশন শুরু।')],
  related: [{ id: '1690D', name: 'Black and White Stripe', why: L('Windows on a B/W strip.', 'B/W ফালিতে উইন্ডো।') }],
  toolkit: ['while-n'],
};

export const p6C: ProblemEntry = {
  id: '6C',
  contestId: 6,
  index: 'C',
  name: 'Alice, Bob and Chocolate',
  rating: 1200,
  tags: ['greedy', 'two-pointers'],
  why: L('Two eaters from opposite ends: always advance whoever finishes first.', 'বিপরীত প্রান্তের দুজন খাদক: যে আগে শেষ করে তাকে এগিয়ে দিন।'),
  statement: L(
    'n chocolate bars lie in a row; eating bar i takes tᵢ seconds. Alice eats from the left, Bob from the right, one bar at a time. If both would start the same bar at the same moment, Bob lets Alice have it. How many bars does each eat?',
    'n-টি চকলেট বার একটি সারিতে; বার i খেতে tᵢ সেকেন্ড লাগে। অ্যালিস বাম থেকে, বব ডান থেকে, একটি করে খায়। দুজনে একই মুহূর্তে একই বার শুরু করতে চাইলে বব অ্যালিসকে দেয়। প্রত্যেকে কয়টি বার খায়?',
  ),
  input: L('n, then t₁ … tₙ.', 'n, তারপর t₁ … tₙ।'),
  output: L('Alice’s and Bob’s counts.', 'অ্যালিস আর ববের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 64, notes: [L('1 ≤ n ≤ 10⁵, tᵢ ≤ 1000', '১ ≤ n ≤ ১০⁵, tᵢ ≤ ১০০০')] },
  samples: [{ input: '5\n2 9 8 2 7', output: '2 3', explain: L('Alice eats 2, 9; Bob eats 7, 2, 8.', 'অ্যালিস খায় ২, ৯; বব খায় ৭, ২, ৮।') }],
  observation: L('Keep each person’s total time. The one with the smaller total is free earlier and takes the next bar from their side; on a tie Alice goes first.', 'প্রত্যেকের মোট সময় রাখুন। যার মোট ছোট সে আগে মুক্ত হয় আর নিজের দিক থেকে পরের বার নেয়; সমান হলে অ্যালিস আগে।'),
  approach: [L('Two pointers l, r; give bar l to Alice when timeA ≤ timeB, else bar r to Bob.', 'দুটি পয়েন্টার l, r; timeA ≤ timeB হলে বার l অ্যালিসকে, না হলে বার r ববকে।')],
  walkthrough: { input: '2 9 8 2 7', steps: [{ state: 'A 2 | B 7 | A 11 | B 9 | B 17', text: L('Alice 2 bars, Bob 3.', 'অ্যালিস ২টি বার, বব ৩টি।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each bar once.', 'প্রতিটি বার একবার।') },
  solutions: [
    {
      id: 'pointers',
      kind: 'optimal',
      title: L('Advance the one who is free first', 'যে আগে মুক্ত তাকে এগিয়ে দেওয়া'),
      idea: L('Compare running times.', 'চলতি সময় তুলনা।'),
      explain: [L('Using ≤ for Alice implements the tie rule. The last bar goes to whoever is free first, which this loop handles with l ≤ r.', 'অ্যালিসের জন্য ≤ ব্যবহার সমতার নিয়ম প্রয়োগ করে। শেষ বার যে আগে মুক্ত তার কাছে যায়, যা l ≤ r দিয়ে এই লুপ সামলায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> t(n);
    for (auto& x : t) cin >> x;
    int l = 0, r = n - 1;
    long long ta = 0, tb = 0;
    while (l <= r) {
        if (ta <= tb) ta += t[l++];
        else tb += t[r--];
    }
    cout << l << " " << n - l << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Second-by-second simulation', 'সেকেন্ড ধরে সিমুলেশন'),
      idea: L('Advance time one second at a time and assign bars as people become free.', 'এক এক সেকেন্ড সময় এগিয়ে মানুষ মুক্ত হলে বার দেওয়া।'),
      explain: [L('Direct but slow (total time up to 10⁸ seconds); it confirms the pointer rule including ties.', 'সরাসরি কিন্তু ধীর (মোট সময় ১০⁸ সেকেন্ড পর্যন্ত); সমতাসহ পয়েন্টারের নিয়ম নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> t(n);
    for (auto& x : t) cin >> x;
    int l = 0, r = n - 1, freeA = 0, freeB = 0;
    for (int now = 0; l <= r; now++) {
        if (freeA <= now) freeA = now + t[l++];
        if (l <= r && freeB <= now) freeB = now + t[r--];
    }
    cout << l << " " << n - l << "\n";
    return 0;
}
`,
      time: 'O(Σ t)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '5\n2 9 8 2 7', output: '2 3', source: 'sample', note: sample(1) },
    { input: '1\n5', output: '1 0', source: 'own', note: L('Alice takes the only bar.', 'অ্যালিস একমাত্র বারটি নেয়।') },
    { input: '3\n1 1 1', output: '2 1', source: 'own', note: L('Tie on the middle bar goes to Alice.', 'মাঝের বারে সমতা অ্যালিসের।') },
  ],
  pitfalls: [L('Giving ties to Bob.', 'সমতা ববকে দেওয়া।')],
  related: [{ id: '1669F', name: 'Eating Candies', why: L('Two ends with balanced sums.', 'মিলিয়ে নেওয়া যোগফলসহ দুই প্রান্ত।') }],
  toolkit: ['while-n'],
};

export const p1676F: ProblemEntry = {
  id: '1676F',
  contestId: 1676,
  index: 'F',
  name: 'Longest Strike',
  rating: 1300,
  tags: ['data-structures', 'greedy', 'sortings', 'two-pointers'],
  why: L('Filter values by count, then find the longest run of consecutive values.', 'গণনা অনুযায়ী মান বাছাই, তারপর পরপর মানের সবচেয়ে লম্বা ধারা খোঁজা।'),
  statement: L('Given an array and k, find l ≤ r maximising r − l such that every integer in [l, r] appears in the array at least k times. Print l and r, or −1. Any optimal pair is accepted. There are t test cases.', 'একটি অ্যারে আর k দেওয়া আছে; r − l সর্বোচ্চ করে এমন l ≤ r বের করুন যাতে [l, r]-এর প্রতিটি পূর্ণসংখ্যা অ্যারেতে অন্তত k বার থাকে। l আর r প্রিন্ট করুন, না হলে −১। যেকোনো সেরা জোড়া গ্রহণযোগ্য। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n, k and the array.', 't; প্রতিটি টেস্টে n, k আর অ্যারে।'),
  output: L('l r, or −1.', 'l r, অথবা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, aᵢ ≤ 10⁹', 'Σ n ≤ ২·১০⁵, aᵢ ≤ ১০⁹'), L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।')] },
  samples: [{ input: '4\n7 2\n11 11 12 13 13 14 14\n5 1\n6 3 5 2 1\n6 4\n4 3 4 3 3 4\n14 2\n1 1 2 2 2 3 3 3 3 4 4 4 4 4', output: '13 14\n1 3\n-1\n1 4', explain: L('First test: 12 appears once, so the best run is 13..14.', 'প্রথম টেস্ট: ১২ একবার আসে, তাই সেরা ধারা ১৩..১৪।') }],
  observation: L('Keep only the values that appear at least k times, sorted. A valid [l, r] is a run of consecutive integers among them. Two pointers find the longest run.', 'শুধু অন্তত k বার আসা মানগুলো সাজিয়ে রাখুন। একটি বৈধ [l, r] এদের মধ্যে পরপর পূর্ণসংখ্যার একটি ধারা। টু পয়েন্টার সবচেয়ে লম্বা ধারা খুঁজে পায়।'),
  approach: [L('Count with a map, collect good values in order, scan for runs where each value is the previous + 1.', 'map দিয়ে গুনে ভালো মানগুলো ক্রমে জড়ো করুন, যেখানে প্রতিটি মান আগেরটি + ১ এমন ধারা খুঁজুন।')],
  walkthrough: { input: '11 11 12 13 13 14 14, k = 2', steps: [{ state: 'good: 11, 13, 14', text: L('Runs [11], [13, 14]: answer 13 14.', 'ধারা [১১], [১৩, ১৪]: উত্তর ১৩ ১৪।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A map or a sort.', 'একটি map বা সর্ট।') },
  solutions: [
    {
      id: 'map',
      kind: 'optimal',
      title: L('Good values + longest consecutive run', 'ভালো মান + সবচেয়ে লম্বা পরপর ধারা'),
      idea: L('Iterate a map in order; extend the run while value = previous + 1.', 'map ক্রমে চালান; মান = আগের + ১ যতক্ষণ, ধারা বাড়ান।'),
      explain: [L('The map iterates keys in increasing order, which gives the sorted good values for free.', 'map বাড়তি ক্রমে কী চালায়, যা বিনামূল্যে সাজানো ভালো মান দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        map<int, int> cnt;
        for (int i = 0; i < n; i++) {
            int a;
            scanf("%d", &a);
            cnt[a]++;
        }
        vector<int> good;
        for (auto& [v, c] : cnt) if (c >= k) good.push_back(v);
        if (good.empty()) { puts("-1"); continue; }
        int bestL = good[0], bestR = good[0];
        for (size_t i = 0, j; i < good.size(); i = j) {
            j = i + 1;
            while (j < good.size() && good[j] == good[j - 1] + 1) j++;
            if (good[j - 1] - good[i] > bestR - bestL) bestL = good[i], bestR = good[j - 1];
        }
        printf("%d %d\n", bestL, bestR);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'c-io'],
    },
    {
      id: 'sort',
      kind: 'method',
      title: L('Sort, count runs of equal values, then two pointers', 'সর্ট, সমান মানের ধারা গোনা, তারপর টু পয়েন্টার'),
      idea: L('After sorting, equal values are adjacent, so counts come from run lengths.', 'সর্টের পর সমান মান পাশাপাশি, তাই গণনা আসে ধারার দৈর্ঘ্য থেকে।'),
      explain: [L('No map needed: one sort replaces it. Then the same consecutive-run scan over the good values.', 'map লাগে না: একটি সর্ট তার জায়গা নেয়। তারপর ভালো মানের ওপর একই পরপর-ধারার স্ক্যান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, k;
        scanf("%d %d", &n, &k);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.begin(), a.end());
        vector<int> good;
        for (int i = 0, j; i < n; i = j) {
            j = i;
            while (j < n && a[j] == a[i]) j++;
            if (j - i >= k) good.push_back(a[i]);
        }
        if (good.empty()) { puts("-1"); continue; }
        int bestL = good[0], bestR = good[0], start = 0;
        for (int i = 1; i <= (int)good.size(); i++) {
            if (i < (int)good.size() && good[i] == good[i - 1] + 1) continue;
            if (good[i - 1] - good[start] > bestR - bestL) bestL = good[start], bestR = good[i - 1];
            start = i;
        }
        printf("%d %d\n", bestL, bestR);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'c-io'],
    },
  ],
  tests: [
    { input: '4\n7 2\n11 11 12 13 13 14 14\n5 1\n6 3 5 2 1\n6 4\n4 3 4 3 3 4\n14 2\n1 1 2 2 2 3 3 3 3 4 4 4 4 4', output: '13 14\n1 3\n-1\n1 4', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Treating 3 and 5 as consecutive.', '৩ আর ৫-কে পরপর ধরা।')],
  related: [{ id: '1138A', name: 'Sushi for Two', why: L('Runs in sequences.', 'ক্রমে ধারা।') }],
  toolkit: ['map'],
};

export const p1336A: ProblemEntry = {
  id: '1336A',
  contestId: 1336,
  index: 'A',
  name: 'Linova and Kingdom',
  rating: 1600,
  tags: ['dfs', 'dp', 'greedy', 'sortings', 'trees'],
  featuredFor: ['trees'],
  why: L('Turn a tree choice into independent values (depth − subtree size), then take the top k.', 'ট্রির সিদ্ধান্তকে স্বাধীন মানে (গভীরতা − সাবট্রির আকার) বদলে সেরা k-টি নেওয়া।'),
  statement: L(
    'A kingdom is a tree with capital 1. Choose exactly k cities to be industrial; the rest are tourist cities. Each industrial city sends an envoy to the capital, whose happiness is the number of tourist cities on the path. Maximise total happiness.',
    'একটি রাজ্য হলো রাজধানী ১-সহ একটি ট্রি। ঠিক k-টি শহরকে শিল্প শহর বানান; বাকিরা পর্যটন শহর। প্রতিটি শিল্প শহর রাজধানীতে একজন দূত পাঠায়, যার সুখ হলো পথে পর্যটন শহরের সংখ্যা। মোট সুখ সর্বোচ্চ করুন।',
  ),
  input: L('n and k, then n − 1 edges.', 'n আর k, তারপর n − ১টি প্রান্ত।'),
  output: L('The maximum total happiness.', 'সর্বোচ্চ মোট সুখ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, 1 ≤ k < n', '২ ≤ n ≤ ২·১০⁵, ১ ≤ k < n')] },
  samples: [
    { input: '7 4\n1 2\n1 3\n1 4\n3 5\n3 6\n4 7', output: '7', explain: L('Industrial 2, 5, 6, 7.', 'শিল্প ২, ৫, ৬, ৭।') },
    { input: '4 1\n1 2\n1 3\n2 4', output: '2', explain: L('Industrial 4.', 'শিল্প ৪।') },
    { input: '8 5\n7 5\n1 7\n6 1\n3 7\n8 3\n2 1\n4 5', output: '9', explain: L('A deeper example.', 'আরও গভীর উদাহরণ।') },
  ],
  observation: L('In an optimal choice, if v is industrial then its whole subtree is too. Making v industrial adds depth(v) (its envoy passes depth(v) cities) but costs 1 for every industrial city below it: value(v) = depth(v) − (size(v) − 1). These values are independent, so take the k largest.', 'সেরা সিদ্ধান্তে v শিল্প হলে এর পুরো সাবট্রিও শিল্প। v-কে শিল্প করলে depth(v) যোগ হয় (এর দূত depth(v)টি শহর পেরোয়) কিন্তু নিচের প্রতিটি শিল্প শহরের জন্য ১ খরচ: value(v) = depth(v) − (size(v) − ১)। এই মানগুলো স্বাধীন, তাই সবচেয়ে বড় k-টি নিন।'),
  approach: [L('BFS for depths (root depth 0), subtree sizes bottom-up, sort the values, sum the top k.', 'গভীরতার জন্য BFS (মূলের গভীরতা ০), নিচ থেকে ওপরে সাবট্রির আকার, মান সর্ট করে সেরা k-টি যোগ।')],
  walkthrough: { input: 'sample 2', steps: [{ state: 'values: 1→−3, 2→0, 3→1, 4→2', text: L('Top 1: 2.', 'সেরা ১টি: ২।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A traversal and a sort.', 'একটি ঘোরা আর একটি সর্ট।') },
  solutions: [
    {
      id: 'values',
      kind: 'optimal',
      title: L('depth − (size − 1), top k', 'গভীরতা − (আকার − ১), সেরা k'),
      idea: L('Sort values descending and sum k of them.', 'মান বড় থেকে সর্ট করে k-টি যোগ।'),
      explain: [L('Why the top k is consistent: a parent’s value is always smaller than its child’s (depth −1, size bigger), so the top k values automatically form “subtree-closed” sets. Sums reach about 2·10¹⁰: long long.', 'সেরা k কেন সামঞ্জস্যপূর্ণ: parent-এর মান সবসময় সন্তানের চেয়ে ছোট (গভীরতা −১, আকার বড়), তাই সেরা k মান আপনাআপনি “সাবট্রি-বদ্ধ” সেট গঠন করে। যোগফল প্রায় ২·১০¹⁰: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> order = {1}, par(n + 1, 0), depth(n + 1, 0), sz(n + 1, 1);
    par[1] = -1;
    for (size_t i = 0; i < order.size(); i++) {
        int v = order[i];
        for (int u : adj[v]) if (u != par[v]) { par[u] = v; depth[u] = depth[v] + 1; order.push_back(u); }
    }
    for (int i = n - 1; i > 0; i--) sz[par[order[i]]] += sz[order[i]];
    vector<long long> val(n);
    for (int v = 1; v <= n; v++) val[v - 1] = depth[v] - (sz[v] - 1);
    sort(val.rbegin(), val.rend());
    long long total = accumulate(val.begin(), val.begin() + k, 0LL);
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'accumulate', 'long-long'],
    },
    {
      id: 'nth',
      kind: 'better',
      title: L('nth_element instead of a full sort', 'পুরো সর্টের বদলে nth_element'),
      idea: L('Only the k largest values matter, not their order.', 'শুধু সবচেয়ে বড় k-টি মান গুরুত্বপূর্ণ, তাদের ক্রম নয়।'),
      explain: [L('nth_element partitions the array so the k largest values come first in O(n) on average, a small speed-up when only a top-k sum is needed. Depths are computed with an explicit stack this time.', 'nth_element অ্যারেকে এমনভাবে ভাগ করে যাতে সবচেয়ে বড় k-টি মান গড়ে O(n)-এ আগে আসে, শুধু সেরা-k যোগফল লাগলে একটু দ্রুত। এবার গভীরতা স্পষ্ট স্ট্যাক দিয়ে হিসাব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> par(n + 1, 0), depth(n + 1, 0), sz(n + 1, 1), order;
    vector<int> st = {1};
    par[1] = -1;
    while (!st.empty()) {
        int v = st.back();
        st.pop_back();
        order.push_back(v);
        for (int u : adj[v]) if (u != par[v]) { par[u] = v; depth[u] = depth[v] + 1; st.push_back(u); }
    }
    for (int i = n - 1; i > 0; i--) sz[par[order[i]]] += sz[order[i]];
    vector<long long> val;
    for (int v = 1; v <= n; v++) val.push_back(depth[v] - (sz[v] - 1));
    nth_element(val.begin(), val.begin() + k, val.end(), greater<long long>());
    printf("%lld\n", accumulate(val.begin(), val.begin() + k, 0LL));
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'accumulate'],
    },
  ],
  tests: [
    { input: '7 4\n1 2\n1 3\n1 4\n3 5\n3 6\n4 7', output: '7', source: 'sample', note: sample(1) },
    { input: '4 1\n1 2\n1 3\n2 4', output: '2', source: 'sample', note: sample(2) },
    { input: '8 5\n7 5\n1 7\n6 1\n3 7\n8 3\n2 1\n4 5', output: '9', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Taking the k deepest cities, which ignores the envoys’ lost tourist cities.', 'সবচেয়ে গভীর k-টি শহর নেওয়া, যা দূতদের হারানো পর্যটন শহর উপেক্ষা করে।')],
  related: [{ id: '1843D', name: 'Apple Tree', why: L('Subtree aggregates.', 'সাবট্রির সমষ্টি।') }],
  toolkit: ['sort', 'long-long'],
};

export const p161D: ProblemEntry = {
  id: '161D',
  contestId: 161,
  index: 'D',
  name: 'Distance in Tree',
  rating: 1800,
  tags: ['dfs', 'divide-and-conquer', 'dp', 'trees'],
  why: L('Tree DP: cnt[v][d] = vertices at depth d below v, merging children one by one.', 'ট্রি DP: cnt[v][d] = v-এর নিচে d গভীরতায় শীর্ষ, সন্তানগুলো একে একে মেলানো।'),
  statement: L('Count the unordered pairs of vertices of a tree whose distance is exactly k.', 'একটি ট্রির শীর্ষের এমন ক্রমহীন জোড়া গুনুন যাদের দূরত্ব ঠিক k।'),
  input: L('n and k, then n − 1 edges.', 'n আর k, তারপর n − ১টি প্রান্ত।'),
  output: L('The number of pairs.', 'জোড়ার সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 512, notes: [L('n ≤ 5·10⁴, k ≤ 500', 'n ≤ ৫·১০⁴, k ≤ ৫০০')] },
  samples: [
    { input: '5 2\n1 2\n2 3\n3 4\n2 5', output: '4', explain: L('(1,3), (1,5), (3,5), (2,4).', '(১,৩), (১,৫), (৩,৫), (২,৪)।') },
    { input: '5 3\n1 2\n2 3\n3 4\n4 5', output: '2', explain: L('(1,4), (2,5).', '(১,৪), (২,৫)।') },
  ],
  observation: L('Every pair at distance k has a highest vertex v (their LCA). Count, for each v, pairs passing through v: when merging child u into v, pair every vertex at depth d below v found so far with every vertex at depth k − d in u’s subtree (shifted by one).', 'দূরত্ব k-এর প্রতিটি জোড়ার একটি সবচেয়ে উঁচু শীর্ষ v (তাদের LCA)। প্রতিটি v-এর জন্য v দিয়ে যাওয়া জোড়া গুনুন: সন্তান u-কে v-তে মেলানোর সময় এ পর্যন্ত পাওয়া v-এর নিচে d গভীরতার প্রতিটি শীর্ষকে u-এর সাবট্রিতে k − d গভীরতার প্রতিটি শীর্ষের সঙ্গে জোড়া দিন (এক সরিয়ে)।'),
  approach: [L('Process vertices in reverse BFS order; cnt[v][0] = 1, then merge each child.', 'উল্টো BFS ক্রমে শীর্ষ প্রক্রিয়া; cnt[v][০] = ১, তারপর প্রতিটি সন্তান মেলান।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'at v = 2: children 1, 3, 5', text: L('Pairs through 2: (1,3), (1,5), (3,5), and (2,4) via child 3.', '২ দিয়ে জোড়া: (১,৩), (১,৫), (৩,৫), আর সন্তান ৩ দিয়ে (২,৪)।') }] },
  complexity: { time: 'O(n · k)', space: 'O(n · k)', why: L('k + 1 counters per vertex.', 'প্রতি শীর্ষে k + ১টি কাউন্টার।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Depth-count DP with merging', 'মেলানোসহ গভীরতা-গণনা DP'),
      idea: L('ans += cnt[v][d] · cnt[u][k − d − 1] before adding u into v.', 'u-কে v-তে যোগ করার আগে ans += cnt[v][d] · cnt[u][k − d − ১]।'),
      explain: [L('Counting before merging is what prevents pairing a vertex with another one in the same child subtree (their LCA would be lower). Memory is n · (k + 1) ints ≈ 2.5·10⁷, fine for 512 MB.', 'মেলানোর আগে গোনাই একই সন্তান-সাবট্রির দুটি শীর্ষ জোড়া হওয়া আটকায় (তাদের LCA নিচে হতো)। মেমোরি n · (k + ১)টি int ≈ ২.৫·১০⁷, ৫১২ MB-তে ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> order = {1}, par(n + 1, 0);
    par[1] = -1;
    for (size_t i = 0; i < order.size(); i++)
        for (int u : adj[order[i]]) if (u != par[order[i]]) { par[u] = order[i]; order.push_back(u); }
    vector<vector<int>> cnt(n + 1, vector<int>(k + 1, 0));
    long long ans = 0;
    for (int i = n - 1; i >= 0; i--) {
        int v = order[i];
        cnt[v][0] = 1;
        for (int u : adj[v]) {
            if (u == par[v]) continue;
            for (int d = 0; d < k; d++) ans += (long long)cnt[v][d] * cnt[u][k - d - 1];
            for (int d = 0; d < k; d++) cnt[v][d + 1] += cnt[u][d];
        }
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n · k)',
      space: 'O(n · k)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
    {
      id: 'centroid',
      kind: 'optimal',
      title: L('Centroid decomposition', 'সেন্ট্রয়েড ডিকম্পোজিশন'),
      idea: L('Split at the centroid, count crossing pairs with a depth table, recurse.', 'সেন্ট্রয়েডে ভাঙো, গভীরতা-সারণিতে ক্রসিং জোড়া গোনো, রিকার্স।'),
      explain: [L('The code is iterative: a stack holds the starts of the remaining components, a BFS finds each component’s vertex order, and sizes are accumulated in reverse BFS order. Depths beyond k are never needed, so the BFS stops there.', 'কোডটি ইটারেটিভ: স্ট্যাকে বাকি কম্পোনেন্টের শুরু থাকে, BFS প্রতিটি কম্পোনেন্টের শীর্ষক্রম দেয়, আর আকার উল্টো BFS ক্রমে জমা হয়। k-র বেশি গভীরতা কখনও দরকার নেই, তাই BFS সেখানেই থামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

int n, K;
vector<int> g[50005];
bool dead[50005];
int sz[50005], pr[50005];

int main() {
    scanf("%d %d", &n, &K);
    for (int i = 1; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        g[a].push_back(b), g[b].push_back(a);
    }
    vector<int> cnt(K + 1, 0), stk = {1}, order;
    ll ans = 0;
    while (!stk.empty()) {
        int s = stk.back();
        stk.pop_back();
        order.assign(1, s);
        pr[s] = 0;
        for (size_t i = 0; i < order.size(); i++)
            for (int w : g[order[i]])
                if (!dead[w] && w != pr[order[i]]) pr[w] = order[i], order.push_back(w);
        int tot = order.size();
        for (int v : order) sz[v] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[pr[order[i]]] += sz[order[i]];
        int c = s;
        for (int v : order) {
            int mx = tot - sz[v];
            for (int w : g[v])
                if (!dead[w] && w != pr[v]) mx = max(mx, sz[w]);
            if (2 * mx <= tot) { c = v; break; }
        }
        cnt[0] = 1;
        vector<int> used = {0};
        for (int w : g[c]) {
            if (dead[w]) continue;
            vector<int> nodes = {w}, par = {c}, dep = {1};
            for (size_t i = 0; i < nodes.size(); i++) {
                if (dep[i] >= K) continue;
                for (int x : g[nodes[i]])
                    if (!dead[x] && x != par[i]) nodes.push_back(x), par.push_back(nodes[i]), dep.push_back(dep[i] + 1);
            }
            for (int d : dep) ans += cnt[K - d];
            for (int d : dep) cnt[d]++, used.push_back(d);
        }
        for (int d : used) cnt[d] = 0;
        dead[c] = true;
        for (int w : g[c])
            if (!dead[w]) stk.push_back(w);
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('BFS from every vertex', 'প্রতিটি শীর্ষ থেকে BFS'),
      idea: L('Count vertices at distance k from each source and halve.', 'প্রতিটি উৎস থেকে k দূরত্বের শীর্ষ গুনে অর্ধেক।'),
      explain: [L('O(n²) = 2.5·10⁹ for n = 5·10⁴ is too slow, but it is the simplest correct method and checks the DP.', 'n = ৫·১০⁴-এ O(n²) = ২.৫·১০⁹ খুব ধীর, কিন্তু এটি সবচেয়ে সরল সঠিক পদ্ধতি আর DP যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    long long total = 0;
    for (int s = 1; s <= n; s++) {
        vector<int> d(n + 1, -1);
        queue<int> q;
        q.push(s);
        d[s] = 0;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            if (d[v] == k) { total++; continue; }
            for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
        }
    }
    cout << total / 2 << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [
    { input: '5 2\n1 2\n2 3\n3 4\n2 5', output: '4', source: 'sample', note: sample(1) },
    { input: '5 3\n1 2\n2 3\n3 4\n4 5', output: '2', source: 'sample', note: sample(2) },
    { input: '2 1\n1 2', output: '1', source: 'own', note: L('One edge.', 'একটি প্রান্ত।') },
  ],
  pitfalls: [L('Adding the child into cnt[v] before counting pairs.', 'জোড়া গোনার আগে সন্তানকে cnt[v]-তে যোগ।'), L('int overflow in the total.', 'মোটে int ওভারফ্লো।')],
  related: [{ id: '1336A', name: 'Linova and Kingdom', why: L('Depth-based tree reasoning.', 'গভীরতা-ভিত্তিক ট্রি যুক্তি।') }],
  toolkit: ['vector', 'long-long'],
};

export const p1143C: ProblemEntry = {
  id: '1143C',
  contestId: 1143,
  index: 'C',
  name: 'Queen',
  rating: 1400,
  tags: ['dfs', 'trees'],
  why: L('A local rule per vertex: it can be deleted iff it and all its children disrespect.', 'প্রতি শীর্ষে একটি স্থানীয় নিয়ম: এটি আর এর সব সন্তান অসম্মান করলেই মোছা যায়।'),
  statement: L(
    'A rooted tree: vertex i has parent pᵢ (−1 for the root) and cᵢ = 1 if it does not respect its parent. Repeatedly delete the smallest-numbered non-root vertex v with cᵥ = 1 whose children all have c = 1; v’s children attach to v’s parent. Print the deleted vertices in order, or −1 if none.',
    'একটি মূলযুক্ত ট্রি: শীর্ষ i-এর parent pᵢ (মূলের জন্য −১) আর cᵢ = ১ যদি এটি parent-কে সম্মান না করে। বারবার সবচেয়ে ছোট নম্বরের মূল নয় এমন শীর্ষ v মুছুন যার cᵥ = ১ আর যার সব সন্তানের c = ১; v-এর সন্তানরা v-এর parent-এ যুক্ত হয়। মোছা শীর্ষগুলো ক্রমে প্রিন্ট করুন, একটিও না হলে −১।',
  ),
  input: L('n, then pᵢ cᵢ for each vertex.', 'n, তারপর প্রতিটি শীর্ষের pᵢ cᵢ।'),
  output: L('The deleted vertices in order, or −1.', 'মোছা শীর্ষগুলো ক্রমে, অথবা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵')] },
  samples: [
    { input: '5\n3 1\n1 1\n-1 0\n2 1\n3 0', output: '1 2 4', explain: L('Vertices 1, 2, 4 qualify.', 'শীর্ষ ১, ২, ৪ যোগ্য।') },
    { input: '5\n-1 0\n1 1\n1 1\n2 0\n3 0', output: '-1', explain: L('Every disrespecting vertex has a respecting child.', 'প্রতিটি অসম্মানকারী শীর্ষের একটি সম্মানকারী সন্তান আছে।') },
    { input: '8\n2 1\n-1 0\n1 0\n1 1\n1 1\n4 0\n5 1\n7 0', output: '5', explain: L('Only vertex 5.', 'শুধু শীর্ষ ৫।') },
  ],
  observation: L('Deleting a vertex moves its children (all with c = 1) to its parent, which never changes whether the parent qualifies: the parent gains only c = 1 children. So the deleted set is exactly the vertices qualifying in the original tree, deleted in increasing order.', 'একটি শীর্ষ মুছলে এর সন্তানরা (সবার c = ১) parent-এ যায়, যা parent যোগ্য কি না তা কখনো বদলায় না: parent শুধু c = ১ সন্তান পায়। তাই মোছা সেট ঠিক মূল ট্রিতে যোগ্য শীর্ষগুলো, বাড়তি ক্রমে মোছা।'),
  approach: [L('bad[v] = 1 if some child of v has c = 0. Answer: all non-root v with cᵥ = 1 and !bad[v], in order.', 'v-এর কোনো সন্তানের c = ০ হলে bad[v] = ১। উত্তর: cᵥ = ১ আর !bad[v] এমন সব মূল-নয় v, ক্রমে।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'bad[3] = 1 (child 5 respects)', text: L('Candidates with c = 1: 1, 2, 4, all not bad.', 'c = ১-এর প্রার্থী: ১, ২, ৪, কেউ bad নয়।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'local',
      kind: 'optimal',
      title: L('Check each vertex once', 'প্রতিটি শীর্ষ একবার দেখা'),
      idea: L('A child with c = 0 blocks its parent forever.', 'c = ০-এর একটি সন্তান তার parent-কে চিরকালের জন্য আটকায়।'),
      explain: [L('Proving that deletions do not interact turns a scary simulation into one pass over the parent array.', 'মোছাগুলো পরস্পরকে প্রভাবিত করে না প্রমাণ করলে একটি ভয়ংকর সিমুলেশন parent অ্যারের ওপর একবার যাওয়ায় পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> p(n + 1), c(n + 1);
    vector<bool> blocked(n + 1, false);
    for (int i = 1; i <= n; i++) {
        scanf("%d %d", &p[i], &c[i]);
    }
    for (int i = 1; i <= n; i++) if (p[i] != -1 && c[i] == 0) blocked[p[i]] = true;
    bool any = false;
    for (int v = 1; v <= n; v++)
        if (p[v] != -1 && c[v] == 1 && !blocked[v]) { printf("%d ", v); any = true; }
    if (!any) printf("-1");
    printf("\n");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Literal simulation', 'আক্ষরিক সিমুলেশন'),
      idea: L('Repeatedly find the smallest deletable vertex, delete it, and reattach its children.', 'বারবার সবচেয়ে ছোট মোছার যোগ্য শীর্ষ খুঁজে মুছুন আর এর সন্তানদের আবার যুক্ত করুন।'),
      explain: [L('O(n²) in the worst case, but it follows the statement exactly and is what proves the observation on random trees.', 'সবচেয়ে খারাপ ক্ষেত্রে O(n²), কিন্তু স্টেটমেন্ট হুবহু মানে আর এলোমেলো ট্রিতে পর্যবেক্ষণটি প্রমাণ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i] >> c[i];
    vector<bool> gone(n + 1, false);
    vector<int> out;
    while (true) {
        int pick = -1;
        for (int v = 1; v <= n && pick == -1; v++) {
            if (gone[v] || p[v] == -1 || c[v] == 0) continue;
            bool ok = true;
            for (int u = 1; u <= n; u++) if (!gone[u] && p[u] == v && c[u] == 0) ok = false;
            if (ok) pick = v;
        }
        if (pick == -1) break;
        gone[pick] = true;
        out.push_back(pick);
        for (int u = 1; u <= n; u++) if (!gone[u] && p[u] == pick) p[u] = p[pick];
    }
    if (out.empty()) cout << -1;
    for (int v : out) cout << v << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['while-n'],
    },
  ],
  tests: [
    { input: '5\n3 1\n1 1\n-1 0\n2 1\n3 0', output: '1 2 4', source: 'sample', note: sample(1) },
    { input: '5\n-1 0\n1 1\n1 1\n2 0\n3 0', output: '-1', source: 'sample', note: sample(2) },
    { input: '8\n2 1\n-1 0\n1 0\n1 1\n1 1\n4 0\n5 1\n7 0', output: '5', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Deleting the root.', 'মূল মোছা।'), L('Simulating with O(n²) reattachment.', 'O(n²) পুনঃসংযোগে সিমুলেশন।')],
  related: [{ id: '913B', name: 'Christmas Spruce', why: L('Children properties from a parent array.', 'parent অ্যারে থেকে সন্তানের গুণ।') }],
  toolkit: ['vector'],
};

export const p1905B: ProblemEntry = {
  id: '1905B',
  contestId: 1905,
  index: 'B',
  name: "Begginer's Zelda",
  rating: 1100,
  tags: ['greedy', 'trees'],
  why: L('Each operation can remove at most two leaves, and two always suffices: ⌈leaves / 2⌉.', 'প্রতিটি অপারেশন সর্বোচ্চ দুটি পাতা সরাতে পারে, আর দুটি সবসময় যথেষ্ট: ⌈পাতা / ২⌉।'),
  statement: L('An operation picks two vertices u, v of a tree and contracts the whole path between them into one vertex. Find the minimum number of operations to shrink the tree to a single vertex. There are t test cases.', 'একটি অপারেশন ট্রির দুটি শীর্ষ u, v বেছে তাদের মাঝের পুরো পথকে একটি শীর্ষে সংকুচিত করে। ট্রিকে একটি শীর্ষে নামাতে সর্বনিম্ন কয়টি অপারেশন লাগে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and n − 1 edges.', 't; প্রতিটি টেস্টে n আর n − ১টি প্রান্ত।'),
  output: L('The minimum number of operations.', 'সর্বনিম্ন অপারেশনের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁵', '২ ≤ n ≤ ১০⁵')] },
  samples: [{ input: '3\n4\n1 2\n1 3\n3 4\n4\n1 2\n2 3\n3 4\n7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7', output: '1\n1\n2', explain: L('Third tree has 4 leaves: 2 operations.', 'তৃতীয় ট্রিতে ৪টি পাতা: ২টি অপারেশন।') }],
  observation: L('A contraction removes at most two leaves (the ends of the path) and never creates new ones. Pairing leaves so each path removes two is always possible, so the answer is ⌈leaves / 2⌉.', 'একটি সংকোচন সর্বোচ্চ দুটি পাতা সরায় (পথের দুই প্রান্ত) আর কখনো নতুন পাতা তৈরি করে না। প্রতিটি পথে দুটি সরে এমনভাবে পাতা জোড়া দেওয়া সবসময় সম্ভব, তাই উত্তর ⌈পাতা / ২⌉।'),
  approach: [L('Count vertices of degree 1.', 'ডিগ্রি ১-এর শীর্ষ গুনুন।')],
  walkthrough: { input: 'path 1-2-3-4', steps: [{ state: '2 leaves', text: L('1 operation.', '১টি অপারেশন।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Degrees only.', 'শুধু ডিগ্রি।') },
  solutions: [
    {
      id: 'degrees',
      kind: 'optimal',
      title: L('Count leaves', 'পাতা গোনা'),
      idea: L('(leaves + 1) / 2.', '(পাতা + ১) / ২।'),
      explain: [L('Only degrees are needed, so the edges never have to be stored.', 'শুধু ডিগ্রি লাগে, তাই প্রান্তগুলো রাখতেই হয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> deg(n + 1, 0);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            deg[a]++, deg[b]++;
        }
        int leaves = count(deg.begin() + 1, deg.end(), 1);
        printf("%d\n", (leaves + 1) / 2);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'ceil-div'],
    },
    {
      id: 'lists',
      kind: 'method',
      title: L('Adjacency lists and sizes', 'সংলগ্নতা তালিকা আর আকার'),
      idea: L('Build the tree and count vertices whose list has size 1.', 'ট্রি বানিয়ে যেসব শীর্ষের তালিকার আকার ১ সেগুলো গুনুন।'),
      explain: [L('The same count with the usual graph representation, which you would need anyway to print the operations.', 'প্রচলিত গ্রাফ রূপ দিয়ে একই গণনা, যা অপারেশনগুলো প্রিন্ট করতে এমনিতেই লাগত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        int leaves = 0;
        for (int v = 1; v <= n; v++) if (adj[v].size() == 1) leaves++;
        printf("%d\n", (leaves + 1) / 2);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3\n4\n1 2\n1 3\n3 4\n4\n1 2\n2 3\n3 4\n7\n1 2\n1 3\n2 4\n2 5\n3 6\n3 7', output: '1\n1\n2', source: 'sample', note: sample(1) },
    { input: '1\n4\n1 2\n1 3\n1 4', output: '2', source: 'own', note: L('A star with 3 leaves.', '৩ পাতার একটি তারা।') },
  ],
  pitfalls: [L('Printing leaves / 2 for an odd number of leaves.', 'বিজোড় পাতায় পাতা / ২ প্রিন্ট।')],
  related: [{ id: '913B', name: 'Christmas Spruce', why: L('Leaves of a tree.', 'ট্রির পাতা।') }],
  toolkit: ['count-find'],
};

export const p1830A: ProblemEntry = {
  id: '1830A',
  contestId: 1830,
  index: 'A',
  name: 'Copil Copac Draws Trees',
  rating: 1400,
  tags: ['dfs', 'dp', 'graphs', 'trees'],
  why: L('DP along root-to-leaf paths: a new reading starts whenever an edge index decreases.', 'মূল থেকে পাতার পথ ধরে DP: প্রান্তের ইনডেক্স কমলেই একটি নতুন পড়া শুরু হয়।'),
  statement: L(
    'Copil draws vertex 1, then repeatedly reads the edge list in order, drawing every edge that touches an already drawn vertex. How many full readings of the list does he need to draw the whole tree? There are t test cases.',
    'কোপিল শীর্ষ ১ আঁকে, তারপর বারবার প্রান্তের তালিকা ক্রমে পড়ে, আগেই আঁকা শীর্ষ ছোঁয় এমন প্রতিটি প্রান্ত আঁকে। পুরো ট্রি আঁকতে তালিকা কতবার পুরো পড়তে হবে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and n − 1 edges in order.', 't; প্রতিটি টেস্টে n আর ক্রমে n − ১টি প্রান্ত।'),
  output: L('The number of readings.', 'পড়ার সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '2\n6\n4 5\n1 3\n1 2\n3 4\n1 6\n7\n5 6\n2 4\n2 7\n1 3\n1 2\n4 5', output: '2\n3', explain: L('First tree: edge 4–5 comes before 3–4, so it needs a second reading.', 'প্রথম ট্রি: প্রান্ত ৪–৫ আসে ৩–৪-এর আগে, তাই দ্বিতীয় পড়া লাগে।') }],
  observation: L('Root the tree at 1. A child edge with a larger index than its parent’s edge is drawn in the same reading; with a smaller index it waits for the next reading. So reading[v] = reading[parent] + (idx(v) < idx(parent)).', 'ট্রিকে ১-এ মূল দিন। parent-এর প্রান্তের চেয়ে বড় ইনডেক্সের সন্তান-প্রান্ত একই পড়ায় আঁকা হয়; ছোট ইনডেক্স হলে পরের পড়ার অপেক্ষা করে। তাই reading[v] = reading[parent] + (idx(v) < idx(parent))।'),
  approach: [L('BFS from 1 carrying (reading, index of the edge used); answer the maximum reading.', '১ থেকে (পড়া, ব্যবহৃত প্রান্তের ইনডেক্স) নিয়ে BFS; উত্তর সর্বোচ্চ পড়া।')],
  walkthrough: { input: 'sample 1', steps: [{ state: '1→3 (idx 2), 3→4 (idx 4), 4→5 (idx 1 < 4)', text: L('Vertex 5 needs reading 2.', 'শীর্ষ ৫-এর পড়া ২ লাগে।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One BFS.', 'একটি BFS।') },
  solutions: [
    {
      id: 'bfs',
      kind: 'optimal',
      title: L('BFS with edge indices', 'প্রান্তের ইনডেক্সসহ BFS'),
      idea: L('Store (neighbour, edge index) and compare with the parent edge.', '(প্রতিবেশী, প্রান্তের ইনডেক্স) রেখে parent প্রান্তের সঙ্গে তুলনা।'),
      explain: [L('The root counts as reading 1 with a virtual edge index 0, which is smaller than every real index, so its children never add one.', 'মূলকে কাল্পনিক প্রান্ত ইনডেক্স ০ সহ পড়া ১ ধরা হয়, যা প্রতিটি আসল ইনডেক্সের চেয়ে ছোট, তাই এর সন্তানরা কখনো এক যোগ করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<pair<int, int>>> adj(n + 1);
        for (int i = 1; i < n; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            adj[a].push_back({b, i});
            adj[b].push_back({a, i});
        }
        vector<int> reading(n + 1, 0), via(n + 1, 0);
        reading[1] = 1;
        queue<int> q;
        q.push(1);
        int best = 1;
        while (!q.empty()) {
            int v = q.front();
            q.pop();
            for (auto [u, idx] : adj[v]) {
                if (reading[u]) continue;
                reading[u] = reading[v] + (idx < via[v] ? 1 : 0);
                via[u] = idx;
                best = max(best, reading[u]);
                q.push(u);
            }
        }
        printf("%d\n", best);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'pair'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Simulate the readings', 'পড়াগুলো সিমুলেশন'),
      idea: L('Repeat passes over the edge list until every vertex is drawn.', 'প্রতিটি শীর্ষ আঁকা না হওয়া পর্যন্ত প্রান্তের তালিকায় বারবার যাওয়া।'),
      explain: [L('O(n) per reading and up to n readings: O(n²) on a reversed path, but it is exactly the statement.', 'প্রতি পড়ায় O(n) আর সর্বোচ্চ n পড়া: উল্টো পথে O(n²), কিন্তু এটি ঠিক স্টেটমেন্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<pair<int, int>> e(n - 1);
        for (auto& [a, b] : e) cin >> a >> b;
        vector<bool> drawn(n + 1, false);
        drawn[1] = true;
        int count = 1, readings = 0;
        while (count < n) {
            readings++;
            for (auto [a, b] : e)
                if (drawn[a] != drawn[b]) { drawn[a] = drawn[b] = true; count++; }
        }
        cout << max(readings, 1) << "\n";
    }
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
    { input: '2\n6\n4 5\n1 3\n1 2\n3 4\n1 6\n7\n5 6\n2 4\n2 7\n1 3\n1 2\n4 5', output: '2\n3', source: 'sample', note: sample(1) },
    { input: '1\n2\n1 2', output: '1', source: 'own', note: L('One edge.', 'একটি প্রান্ত।') },
  ],
  pitfalls: [L('Counting the depth of the tree instead of index decreases.', 'ইনডেক্স কমার বদলে ট্রির গভীরতা গোনা।')],
  related: [{ id: '1843D', name: 'Apple Tree', why: L('Values carried along the tree.', 'ট্রি ধরে বহন করা মান।') }],
  toolkit: ['stack-queue'],
};

export const p1702E: ProblemEntry = {
  id: '1702E',
  contestId: 1702,
  index: 'E',
  name: 'Split Into Two Sets',
  rating: 1600,
  tags: ['dfs', 'dsu', 'graphs'],
  featuredFor: ['dsu'],
  why: L('Dominoes become a graph of numbers; the split exists iff every cycle is even.', 'ডোমিনো সংখ্যার একটি গ্রাফে পরিণত হয়; ভাগ সম্ভব ঠিক তখনই যখন প্রতিটি চক্র জোড়।'),
  statement: L(
    'n dominoes (n even) each carry two numbers from 1 to n. Can they be split into two sets so that within each set all numbers are different? There are t test cases.',
    'n-টি ডোমিনো (n জোড়) প্রতিটিতে ১ থেকে n-এর দুটি সংখ্যা। এগুলোকে কি দুটি সেটে ভাগ করা যায় যাতে প্রতিটি সেটের ভেতরে সব সংখ্যা আলাদা? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and n dominoes.', 't; প্রতিটি টেস্টে n আর n-টি ডোমিনো।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '6\n4\n1 2\n4 3\n2 1\n3 4\n6\n1 2\n4 5\n1 3\n4 6\n2 3\n5 6\n2\n1 1\n2 2\n2\n1 2\n2 1\n8\n2 1\n1 2\n4 3\n4 3\n5 6\n5 7\n8 6\n7 8\n8\n1 2\n2 1\n4 3\n5 3\n5 4\n6 7\n8 6\n7 8', output: 'YES\nNO\nNO\nYES\nYES\nNO', explain: L('Second test: dominoes 1–2, 2–3, 1–3 form an odd cycle.', 'দ্বিতীয় টেস্ট: ডোমিনো ১–২, ২–৩, ১–৩ একটি বিজোড় চক্র।') }],
  observation: L('Every number must appear exactly twice (once per set), and no domino may hold the same number twice. Then the numbers form a graph of disjoint cycles (each vertex has degree 2), and the dominoes on a cycle must alternate sets: possible iff every cycle has even length.', 'প্রতিটি সংখ্যাকে ঠিক দুবার আসতে হবে (প্রতি সেটে একবার), আর কোনো ডোমিনোতে একই সংখ্যা দুবার থাকতে পারবে না। তখন সংখ্যাগুলো বিচ্ছিন্ন চক্রের গ্রাফ গঠন করে (প্রতিটি শীর্ষের ডিগ্রি ২), আর একটি চক্রের ডোমিনোগুলোকে পালাক্রমে সেট বদলাতে হয়: প্রতিটি চক্র জোড় দৈর্ঘ্যের হলেই সম্ভব।'),
  approach: [L('Check counts, then DSU to find components and their sizes: every component (cycle) must have an even number of vertices.', 'গণনা দেখুন, তারপর DSU দিয়ে উপাদান আর তাদের আকার: প্রতিটি উপাদানে (চক্রে) জোড় সংখ্যক শীর্ষ থাকতে হবে।')],
  walkthrough: { input: 'test 2', steps: [{ state: 'cycles {1,2,3}, {4,5,6}', text: L('Odd sizes: NO.', 'বিজোড় আকার: NO।') }] },
  complexity: { time: 'O(n α)', space: 'O(n)', why: L('One union per domino.', 'প্রতি ডোমিনোতে একটি ইউনিয়ন।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('DSU with component sizes', 'উপাদানের আকারসহ DSU'),
      idea: L('Degree check, then every component size must be even.', 'ডিগ্রি যাচাই, তারপর প্রতিটি উপাদানের আকার জোড় হতে হবে।'),
      explain: [L('Once every vertex has degree 2, each component is a cycle whose length equals its number of vertices, so the even-cycle test becomes a size test.', 'প্রতিটি শীর্ষের ডিগ্রি ২ হলে প্রতিটি উপাদান একটি চক্র যার দৈর্ঘ্য তার শীর্ষের সংখ্যার সমান, তাই জোড়-চক্র পরীক্ষা আকার পরীক্ষায় পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> p, sz;
int find(int x) { while (p[x] != x) x = p[x] = p[p[x]]; return x; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        p.resize(n + 1);
        sz.assign(n + 1, 1);
        iota(p.begin(), p.end(), 0);
        vector<int> deg(n + 1, 0);
        bool ok = true;
        for (int i = 0; i < n; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            if (a == b) ok = false;
            deg[a]++, deg[b]++;
            a = find(a), b = find(b);
            if (a != b) { p[b] = a; sz[a] += sz[b]; }
        }
        for (int v = 1; v <= n; v++) if (deg[v] != 2) ok = false;
        for (int v = 1; v <= n && ok; v++) if (find(v) == v && sz[v] % 2) ok = false;
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n α)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
    {
      id: 'bipartite',
      kind: 'method',
      title: L('2-colour the dominoes', 'ডোমিনোগুলো ২-রঙ করা'),
      idea: L('Two dominoes sharing a number must be in different sets: check that this conflict graph is bipartite.', 'একটি সংখ্যা ভাগ করা দুটি ডোমিনো আলাদা সেটে থাকতে হবে: এই সংঘাতের গ্রাফ বাইপার্টাইট কি না দেখুন।'),
      explain: [L('This formulation needs no degree argument: build a graph on dominoes, connect two dominoes that share a number, and BFS-colour it. A number appearing three or more times creates an odd triangle and fails automatically.', 'এই রূপে ডিগ্রির যুক্তি লাগে না: ডোমিনোর ওপর একটি গ্রাফ বানান, একটি সংখ্যা ভাগ করা দুটি ডোমিনো যুক্ত করুন, আর BFS দিয়ে রঙ করুন। তিন বা বেশিবার আসা সংখ্যা একটি বিজোড় ত্রিভুজ তৈরি করে আর আপনাআপনি ব্যর্থ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<vector<int>> holders(n + 1);
        bool ok = true;
        for (int i = 0; i < n; i++) {
            int a, b;
            scanf("%d %d", &a, &b);
            if (a == b) ok = false;
            holders[a].push_back(i);
            holders[b].push_back(i);
        }
        for (int v = 1; v <= n; v++) if (holders[v].size() > 2) ok = false;
        if (!ok) { puts("NO"); continue; }
        vector<vector<int>> adj(n);
        for (int v = 1; v <= n; v++)
            if (holders[v].size() == 2) {
                adj[holders[v][0]].push_back(holders[v][1]);
                adj[holders[v][1]].push_back(holders[v][0]);
            }
        vector<int> col(n, -1);
        for (int s = 0; s < n && ok; s++) {
            if (col[s] != -1) continue;
            col[s] = 0;
            queue<int> q;
            q.push(s);
            while (!q.empty() && ok) {
                int d = q.front();
                q.pop();
                for (int e : adj[d]) {
                    if (col[e] == -1) { col[e] = 1 - col[d]; q.push(e); }
                    else if (col[e] == col[d]) ok = false;
                }
            }
        }
        puts(ok ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [
    { input: '6\n4\n1 2\n4 3\n2 1\n3 4\n6\n1 2\n4 5\n1 3\n4 6\n2 3\n5 6\n2\n1 1\n2 2\n2\n1 2\n2 1\n8\n2 1\n1 2\n4 3\n4 3\n5 6\n5 7\n8 6\n7 8\n8\n1 2\n2 1\n4 3\n5 3\n5 4\n6 7\n8 6\n7 8', output: 'YES\nNO\nNO\nYES\nYES\nNO', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Forgetting dominoes like (1, 1).', '(১, ১)-এর মতো ডোমিনো ভুলে যাওয়া।'), L('Not checking that each number appears exactly twice.', 'প্রতিটি সংখ্যা ঠিক দুবার আসে কি না না দেখা।')],
  related: [{ id: '862B', name: 'Mahmoud and Ehab and the bipartiteness', why: L('Bipartite colouring.', 'বাইপার্টাইট রঙ।') }],
  toolkit: ['functions'],
};
