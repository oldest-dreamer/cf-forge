import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p1354B: ProblemEntry = {
  id: '1354B',
  contestId: 1354,
  index: 'B',
  name: 'Ternary String',
  rating: 1200,
  tags: ['binary-search', 'dp', 'implementation', 'two-pointers'],
  why: L('The shortest window containing every type: a sliding window with counts.', 'প্রতিটি ধরন থাকা সবচেয়ে ছোট উইন্ডো: গণনাসহ একটি স্লাইডিং উইন্ডো।'),
  statement: L('A string of characters 1, 2, 3. Find the length of the shortest substring containing all three, or 0 if none exists. There are t test cases.', '১, ২, ৩ অক্ষরের একটি স্ট্রিং। তিনটিই আছে এমন সবচেয়ে ছোট সাবস্ট্রিংয়ের দৈর্ঘ্য বের করুন, না থাকলে ০। t-টি টেস্ট কেস আছে।'),
  input: L('t, then a string per test.', 't, তারপর প্রতিটি টেস্টে একটি স্ট্রিং।'),
  output: L('The shortest length, or 0.', 'সবচেয়ে ছোট দৈর্ঘ্য, অথবা ০।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ |s| ≤ 2·10⁵', 'Σ |s| ≤ ২·১০⁵')] },
  samples: [{ input: '7\n123\n12222133333332\n112233\n332211\n12121212\n333333\n31121', output: '3\n3\n4\n4\n0\n0\n4', explain: L('12222133333332: “213” has length 3.', '১২২২২১৩৩৩৩৩৩৩২: “২১৩”-এর দৈর্ঘ্য ৩।') }],
  observation: L('For each right end r, move the left end l forward while the window still contains all three digits. The window [l, r] is then the shortest valid one ending at r.', 'প্রতিটি ডান প্রান্ত r-এর জন্য বাম প্রান্ত l এগিয়ে নিন যতক্ষণ উইন্ডোতে তিনটি অঙ্কই থাকে। তখন [l, r] হলো r-এ শেষ হওয়া সবচেয়ে ছোট বৈধ উইন্ডো।'),
  approach: [L('Counts for 1, 2, 3 in the window; shrink while every count > 0 after removing s[l].', 'উইন্ডোতে ১, ২, ৩-এর গণনা; s[l] সরানোর পরেও প্রতিটি গণনা > ০ হলে ছোট করুন।')],
  walkthrough: { input: '31121', steps: [{ state: 'r = 3 (window 3112)', text: L('Removing 3 would lose the 3: length 4. Later windows are no shorter.', '৩ সরালে ৩ হারায়: দৈর্ঘ্য ৪। পরের উইন্ডোগুলো এর চেয়ে ছোট নয়।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Each pointer moves at most n times.', 'প্রতিটি পয়েন্টার সর্বোচ্চ n বার সরে।') },
  solutions: [
    {
      id: 'window',
      kind: 'optimal',
      title: L('Sliding window with counts', 'গণনাসহ স্লাইডিং উইন্ডো'),
      idea: L('Grow on the right, shrink on the left.', 'ডানে বাড়ানো, বামে ছোট করা।'),
      explain: [L('The classic “shortest window containing every type” template; it generalises to k types by tracking how many types currently have a positive count.', 'ক্লাসিক “প্রতিটি ধরনসহ সবচেয়ে ছোট উইন্ডো” টেমপ্লেট; কয়টি ধরনের গণনা এখন ধনাত্মক তা রেখে k ধরনে সাধারণীকরণ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size(), cnt[4] = {}, best = INT_MAX;
        for (int l = 0, r = 0; r < n; r++) {
            cnt[s[r] - '0']++;
            while (cnt[s[l] - '0'] > 1) cnt[s[l++] - '0']--;
            if (cnt[1] && cnt[2] && cnt[3]) best = min(best, r - l + 1);
        }
        cout << (best == INT_MAX ? 0 : best) << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'min-max'],
    },
    {
      id: 'last',
      kind: 'method',
      title: L('Last positions of each digit', 'প্রতিটি অঙ্কের শেষ অবস্থান'),
      idea: L('At position r, the best window ending here starts at min(last1, last2, last3).', 'অবস্থান r-এ এখানে শেষ হওয়া সেরা উইন্ডো শুরু হয় min(last1, last2, last3)-এ।'),
      explain: [L('An even simpler view: remember the latest index of each digit; the shortest window ending at r must reach back to the oldest of the three.', 'আরও সরল দৃষ্টি: প্রতিটি অঙ্কের সর্বশেষ ইনডেক্স মনে রাখুন; r-এ শেষ হওয়া সবচেয়ে ছোট উইন্ডোকে তিনটির সবচেয়ে পুরোনোটি পর্যন্ত পেছনে যেতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int last[4] = {-1, -1, -1, -1}, best = INT_MAX;
        for (int r = 0; r < (int)s.size(); r++) {
            last[s[r] - '0'] = r;
            int oldest = min({last[1], last[2], last[3]});
            if (oldest >= 0) best = min(best, r - oldest + 1);
        }
        cout << (best == INT_MAX ? 0 : best) << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max'],
    },
  ],
  tests: [{ input: '7\n123\n12222133333332\n112233\n332211\n12121212\n333333\n31121', output: '3\n3\n4\n4\n0\n0\n4', source: 'sample', note: sample(1) }],
  pitfalls: [L('Printing INT_MAX when a digit is missing.', 'কোনো অঙ্ক না থাকলে INT_MAX প্রিন্ট।')],
  related: [{ id: '1680C', name: 'Binary String', why: L('Window reasoning on a string.', 'স্ট্রিংয়ে উইন্ডোর যুক্তি।') }],
  toolkit: ['min-max'],
};

export const p1680C: ProblemEntry = {
  id: '1680C',
  contestId: 1680,
  index: 'C',
  name: 'Binary String',
  rating: 1600,
  tags: ['binary-search', 'greedy', 'strings', 'two-pointers'],
  why: L('An exchange argument fixes the window length, then a fixed-size sliding window finishes it.', 'একটি বিনিময় যুক্তি উইন্ডোর দৈর্ঘ্য ঠিক করে, তারপর নির্দিষ্ট আকারের স্লাইডিং উইন্ডো শেষ করে।'),
  statement: L('Delete a prefix and a suffix of a binary string. The cost is max(zeros left in the string, ones deleted). Minimise the cost. There are t test cases.', 'একটি বাইনারি স্ট্রিংয়ের একটি প্রিফিক্স আর একটি সাফিক্স মুছুন। খরচ হলো max(স্ট্রিংয়ে থাকা শূন্য, মোছা এক)। খরচ সর্বনিম্ন করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t, then a string per test.', 't, তারপর প্রতিটি টেস্টে একটি স্ট্রিং।'),
  output: L('The minimum cost.', 'সর্বনিম্ন খরচ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ |s| ≤ 2·10⁵', 'Σ |s| ≤ ২·১০⁵')] },
  samples: [{ input: '5\n101110110\n1001001001001\n0000111111\n00000\n1111', output: '1\n3\n0\n0\n0', explain: L('101110110: keep “11101”: one zero left, one 1 deleted.', '১০১১১০১১০: “১১১০১” রাখুন: একটি শূন্য থাকে, একটি ১ মোছে।') }],
  observation: L('Let k be the number of ones. For a kept window of length k, zeros inside = k − ones inside = ones outside, so both parts of the cost are equal. Longer or shorter windows can be shrunk or grown towards length k without increasing the max. So the answer is the minimum number of zeros in any window of length k.', 'k হলো একের সংখ্যা। k দৈর্ঘ্যের রাখা উইন্ডোতে ভেতরের শূন্য = k − ভেতরের এক = বাইরের এক, তাই খরচের দুটি অংশ সমান। লম্বা বা ছোট উইন্ডোকে max না বাড়িয়ে k দৈর্ঘ্যের দিকে ছোট বা বড় করা যায়। তাই উত্তর হলো k দৈর্ঘ্যের যেকোনো উইন্ডোতে সর্বনিম্ন শূন্যের সংখ্যা।'),
  approach: [L('Count ones; slide a window of length k and track zeros.', 'এক গুনুন; k দৈর্ঘ্যের উইন্ডো সরিয়ে শূন্য রাখুন।')],
  walkthrough: { input: '1001001001001 (k = 5)', steps: [{ state: 'every window of length 5 has ≥ 3 zeros', text: L('Answer 3.', 'উত্তর ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One sliding window.', 'একটি স্লাইডিং উইন্ডো।') },
  solutions: [
    {
      id: 'fixed-window',
      kind: 'optimal',
      title: L('Fixed window of length k', 'k দৈর্ঘ্যের নির্দিষ্ট উইন্ডো'),
      idea: L('Minimum zeros in a window of length = number of ones.', 'এক-এর সংখ্যার সমান দৈর্ঘ্যের উইন্ডোতে সর্বনিম্ন শূন্য।'),
      explain: [L('When two costs move in opposite directions, look for the point where they are equal: that balance point is often forced, and here it fixes the window length.', 'যখন দুটি খরচ বিপরীত দিকে চলে, যেখানে তারা সমান সেই বিন্দু খুঁজুন: সেই ভারসাম্য বিন্দু প্রায়ই বাধ্যতামূলক, আর এখানে এটি উইন্ডোর দৈর্ঘ্য ঠিক করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size(), k = count(s.begin(), s.end(), '1');
        if (k == 0) { cout << 0 << "\n"; continue; }
        int zeros = 0;
        for (int i = 0; i < k; i++) zeros += s[i] == '0';
        int best = zeros;
        for (int i = k; i < n; i++) {
            zeros += (s[i] == '0') - (s[i - k] == '0');
            best = min(best, zeros);
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['count-find', 'bool-arith'],
    },
    {
      id: 'binary-search',
      kind: 'method',
      title: L('Binary search on the cost', 'খরচের ওপর বাইনারি সার্চ'),
      idea: L('Cost ≤ c is possible iff some window has ≤ c zeros and ≥ k − c ones: check with two pointers.', 'খরচ ≤ c সম্ভব ঠিক তখনই যখন কোনো উইন্ডোতে ≤ c শূন্য আর ≥ k − c এক: টু পয়েন্টারে যাচাই।'),
      explain: [L('The more general route that needs no exchange argument: feasibility is monotone in c, and for fixed c the best window for each right end is the longest one with at most c zeros.', 'আরও সাধারণ পথ যাতে বিনিময় যুক্তি লাগে না: সম্ভাব্যতা c-তে একমুখী, আর নির্দিষ্ট c-তে প্রতিটি ডান প্রান্তের সেরা উইন্ডো হলো সর্বোচ্চ c শূন্যসহ সবচেয়ে লম্বা উইন্ডো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size(), k = count(s.begin(), s.end(), '1');
        auto ok = [&](int c) {
            if (c >= k) return true;  // deleting everything costs k
            int zeros = 0, ones = 0;
            for (int l = 0, r = 0; r < n; r++) {
                (s[r] == '0' ? zeros : ones)++;
                while (zeros > c) (s[l++] == '0' ? zeros : ones)--;
                if (ones >= k - c) return true;
            }
            return false;
        };
        int lo = 0, hi = k;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (ok(mid)) hi = mid; else lo = mid + 1;
        }
        cout << lo << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda', 'while-n'],
    },
  ],
  tests: [{ input: '5\n101110110\n1001001001001\n0000111111\n00000\n1111', output: '1\n3\n0\n0\n0', source: 'sample', note: sample(1) }],
  pitfalls: [L('Minimising zeros and deleted ones separately.', 'শূন্য আর মোছা এক আলাদাভাবে সর্বনিম্ন করা।')],
  related: [{ id: '1354B', name: 'Ternary String', why: L('Sliding windows.', 'স্লাইডিং উইন্ডো।') }],
  toolkit: ['count-find'],
};

export const p1203D2: ProblemEntry = {
  id: '1203D2',
  contestId: 1203,
  index: 'D2',
  name: 'Remove the Substring (hard version)',
  rating: 1700,
  tags: ['binary-search', 'greedy', 'implementation', 'two-pointers'],
  why: L('Earliest and latest match positions tell how big a gap can open between t[i] and t[i + 1].', 'সবচেয়ে আগের আর পরের মিলের অবস্থান বলে t[i] আর t[i + ১]-এর মাঝে কত বড় ফাঁক খোলা যায়।'),
  statement: L('t is a subsequence of s. Remove one contiguous substring of s, as long as possible, so that t is still a subsequence of what remains.', 't হলো s-এর একটি সাবসিকোয়েন্স। s থেকে যত লম্বা সম্ভব একটি পরপর সাবস্ট্রিং সরান যাতে বাকি অংশে t তখনও সাবসিকোয়েন্স থাকে।'),
  input: L('s, then t.', 's, তারপর t।'),
  output: L('The maximum length removed.', 'সর্বোচ্চ সরানো দৈর্ঘ্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|s| ≤ 2·10⁵', '|s| ≤ ২·১০⁵')] },
  samples: [
    { input: 'bbaba\nbb', output: '3', explain: L('Keep the first two b’s.', 'প্রথম দুটি b রাখুন।') },
    { input: 'baaba\nab', output: '2', explain: L('Remove “aa” or “ba”.', '“aa” বা “ba” সরান।') },
    { input: 'abcde\nabcde', output: '0', explain: L('Nothing can go.', 'কিছুই যেতে পারে না।') },
    { input: 'asdfasdf\nfasd', output: '3', explain: L('Remove “asd” at the start.', 'শুরুর “asd” সরান।') },
  ],
  observation: L('left[i] = earliest position matching t[i] (greedy from the left), right[i] = latest (greedy from the right). The removed block can sit before t[0], after t[m−1], or between t[i] at left[i] and t[i+1] at right[i+1].', 'left[i] = t[i]-এর সবচেয়ে আগের মিলের অবস্থান (বাম থেকে গ্রিডি), right[i] = সবচেয়ে পরের (ডান থেকে গ্রিডি)। সরানো অংশ t[০]-এর আগে, t[m−১]-এর পরে, বা left[i]-এ t[i] আর right[i+১]-এ t[i+১]-এর মাঝে থাকতে পারে।'),
  approach: [L('max(right[0], n − 1 − left[m − 1], max over i of right[i + 1] − left[i] − 1).', 'max(right[০], n − ১ − left[m − ১], সব i-এর ওপর right[i + ১] − left[i] − ১-এর max)।')],
  walkthrough: { input: 'bbaba / bb', steps: [{ state: 'left = 0 1, right = 1 3', text: L('n − 1 − left[1] = 3 (remove “aba”).', 'n − ১ − left[১] = ৩ (“aba” সরান)।') }] },
  complexity: { time: 'O(n)', space: 'O(m)', why: L('Two greedy scans.', 'দুটি গ্রিডি স্ক্যান।') },
  solutions: [
    {
      id: 'left-right',
      kind: 'optimal',
      title: L('Earliest and latest matches', 'সবচেয়ে আগের আর পরের মিল'),
      idea: L('The same arrays as 1492C, with the two ends added.', '1492C-এর একই অ্যারে, দুই প্রান্ত যোগ করে।'),
      explain: [L('Prefix of t matched as early as possible + suffix matched as late as possible leaves the largest possible gap between them.', 't-এর প্রিফিক্স যত আগে সম্ভব আর সাফিক্স যত পরে সম্ভব মেলালে তাদের মাঝে সবচেয়ে বড় সম্ভাব্য ফাঁক থাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    int n = s.size(), m = t.size();
    vector<int> left(m), right(m);
    for (int i = 0, j = 0; j < m; i++) if (s[i] == t[j]) left[j++] = i;
    for (int i = n - 1, j = m - 1; j >= 0; i--) if (s[i] == t[j]) right[j--] = i;
    int best = max(right[0], n - 1 - left[m - 1]);
    for (int i = 0; i + 1 < m; i++) best = max(best, right[i + 1] - left[i] - 1);
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
      id: 'binary-search',
      kind: 'method',
      title: L('Binary search on the length', 'দৈর্ঘ্যের ওপর বাইনারি সার্চ'),
      idea: L('If length len can be removed, so can anything shorter; test each start in O(1) with prefix/suffix match counts.', 'দৈর্ঘ্য len সরানো গেলে ছোট যেকোনোটিও যায়; প্রিফিক্স/সাফিক্স মিলের গণনা দিয়ে প্রতিটি শুরু O(১)-এ যাচাই।'),
      explain: [L('pre[i] = how many characters of t the prefix s[0..i) matches greedily; suf[i] = how many from the end the suffix s[i..) matches. Removing [l, l + len) works iff pre[l] + suf[l + len] ≥ m.', 'pre[i] = প্রিফিক্স s[০..i) গ্রিডিভাবে t-এর কয়টি অক্ষর মেলায়; suf[i] = সাফিক্স s[i..) শেষ থেকে কয়টি মেলায়। [l, l + len) সরানো চলে ঠিক তখনই যখন pre[l] + suf[l + len] ≥ m।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    int n = s.size(), m = t.size();
    vector<int> pre(n + 1, 0), suf(n + 2, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + (pre[i] < m && s[i] == t[pre[i]]);
    for (int i = n - 1; i >= 0; i--) suf[i] = suf[i + 1] + (suf[i + 1] < m && s[i] == t[m - 1 - suf[i + 1]]);
    auto ok = [&](int len) {
        for (int l = 0; l + len <= n; l++) if (pre[l] + suf[l + len] >= m) return true;
        return false;
    };
    int lo = 0, hi = n - m;
    while (lo < hi) {
        int mid = (lo + hi + 1) / 2;
        if (ok(mid)) lo = mid; else hi = mid - 1;
    }
    cout << lo << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'lambda'],
    },
  ],
  tests: [
    { input: 'bbaba\nbb', output: '3', source: 'sample', note: sample(1) },
    { input: 'baaba\nab', output: '2', source: 'sample', note: sample(2) },
    { input: 'abcde\nabcde', output: '0', source: 'sample', note: sample(3) },
    { input: 'asdfasdf\nfasd', output: '3', source: 'sample', note: sample(4) },
  ],
  pitfalls: [L('Forgetting the block before t[0] or after t[m − 1].', 't[০]-এর আগের বা t[m − ১]-এর পরের অংশ ভুলে যাওয়া।')],
  related: [{ id: '1492C', name: 'Maximum width', why: L('The same left/right arrays.', 'একই বাম/ডান অ্যারে।') }],
  toolkit: ['vector'],
};

export const p1632B: ProblemEntry = {
  id: '1632B',
  contestId: 1632,
  index: 'B',
  name: 'Roof Construction',
  rating: 1000,
  tags: ['bitmasks', 'constructive'],
  why: L('The highest bit forces a cost of at least 2ᵏ; place 0 next to 2ᵏ to pay exactly that.', 'সবচেয়ে উঁচু বিট অন্তত ২ᵏ খরচ বাধ্য করে; ঠিক সেটুকু দিতে ০-কে ২ᵏ-এর পাশে বসান।'),
  statement: L('Arrange 0, 1, …, n − 1 in a row to minimise the maximum XOR of adjacent elements. Print any optimal arrangement. There are t test cases.', '০, ১, …, n − ১-কে এক সারিতে সাজান যাতে পাশাপাশি উপাদানের সর্বোচ্চ XOR সর্বনিম্ন হয়। যেকোনো সেরা সাজানো প্রিন্ট করুন। t-টি টেস্ট কেস আছে।'),
  input: L('t, then n per test.', 't, তারপর প্রতিটি টেস্টে n।'),
  output: L('A permutation of 0 … n − 1.', '০ … n − ১-এর একটি পারমুটেশন।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, n ≥ 2', 'Σ n ≤ ২·১০⁵, n ≥ ২'), anyAnswer] },
  samples: [{ input: '4\n2\n3\n5\n10', output: '0 1\n2 0 1\n3 2 1 0 4\n4 6 3 2 0 8 9 1 7 5', explain: L('n = 5: max XOR is 4 (between 0 and 4).', 'n = ৫: সর্বোচ্চ XOR ৪ (০ আর ৪-এর মাঝে)।') }],
  observation: L('Let 2ᵏ be the highest power of two ≤ n − 1. Somewhere a number < 2ᵏ sits next to a number ≥ 2ᵏ, and their XOR is ≥ 2ᵏ. Order 2ᵏ − 1, …, 1, 0, 2ᵏ, 2ᵏ + 1, …, n − 1: inside each group the XOR is < 2ᵏ, and the only crossing is 0 ^ 2ᵏ = 2ᵏ.', '২ᵏ হলো n − ১-এর সমান বা ছোট সবচেয়ে বড় দুইয়ের ঘাত। কোথাও ২ᵏ-এর ছোট একটি সংখ্যা ২ᵏ-এর সমান বা বড় একটি সংখ্যার পাশে বসে, আর তাদের XOR ≥ ২ᵏ। সাজান ২ᵏ − ১, …, ১, ০, ২ᵏ, ২ᵏ + ১, …, n − ১: প্রতিটি দলের ভেতরে XOR < ২ᵏ, আর একমাত্র সংযোগ ০ ^ ২ᵏ = ২ᵏ।'),
  approach: [L('Print 2ᵏ − 1 down to 0, then 2ᵏ up to n − 1.', '২ᵏ − ১ থেকে ০ পর্যন্ত, তারপর ২ᵏ থেকে n − ১ পর্যন্ত প্রিন্ট।')],
  walkthrough: { input: 'n = 5', steps: [{ state: 'k = 2: 3 2 1 0 4', text: L('XORs 1, 3, 1, 4: max 4.', 'XOR ১, ৩, ১, ৪: সর্বোচ্চ ৪।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Print in order.', 'ক্রমে প্রিন্ট।') },
  solutions: [
    {
      id: 'split',
      kind: 'optimal',
      title: L('Lower block reversed, then upper block', 'নিচের অংশ উল্টো, তারপর ওপরের অংশ'),
      idea: L('0 meets 2ᵏ at the boundary.', 'সীমানায় ০ মেলে ২ᵏ-এর সঙ্গে।'),
      explain: [L('A lower bound (“some pair crosses the top bit”) plus a construction that meets it is the standard shape of a constructive proof.', 'একটি নিম্নসীমা (“কোনো জোড়া উঁচু বিট পেরোয়”) আর সেটি ছোঁয় এমন একটি গঠন কনস্ট্রাক্টিভ প্রমাণের প্রচলিত রূপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        int k = 1 << __lg(n - 1);
        for (int x = k - 1; x >= 0; x--) printf("%d ", x);
        for (int x = k; x < n; x++) printf("%d ", x);
        printf("\n");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'c-io'],
    },
    {
      id: 'mirror',
      kind: 'alt',
      title: L('Upper block reversed, then 2ᵏ, 0, 1, …', 'ওপরের অংশ উল্টো, তারপর ২ᵏ, ০, ১, …'),
      idea: L('n − 1, …, 2ᵏ, 0, 1, …, 2ᵏ − 1.', 'n − ১, …, ২ᵏ, ০, ১, …, ২ᵏ − ১।'),
      explain: [L('The same idea mirrored: any order inside each block is fine, as long as the two blocks touch only at 2ᵏ and 0. Numbers ≥ 2ᵏ share the top bit, so their XOR drops below 2ᵏ.', 'একই ধারণা আয়নায়: প্রতিটি অংশের ভেতরে যেকোনো ক্রম চলে, যতক্ষণ দুটি অংশ শুধু ২ᵏ আর ০-তে ছোঁয়। ২ᵏ-এর সমান বা বড় সংখ্যাগুলো উঁচু বিট ভাগ করে, তাই তাদের XOR ২ᵏ-এর নিচে নামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        int k = 1 << __lg(n - 1);
        for (int x = n - 1; x >= k; x--) printf("%d ", x);
        for (int x = 0; x < k; x++) printf("%d ", x);
        printf("\n");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [{ input: '4\n2\n3\n5\n10', output: '0 1\n2 0 1\n3 2 1 0 4\n4 6 3 2 0 8 9 1 7 5', source: 'sample', note: sample(1) }],
  pitfalls: [L('Printing 0 … n − 1 in order (XOR of 2ᵏ − 1 and 2ᵏ is huge).', '০ … n − ১ ক্রমে প্রিন্ট (২ᵏ − ১ আর ২ᵏ-এর XOR বিশাল)।')],
  related: [{ id: '1420B', name: 'Rock and Lever', why: L('Highest-bit reasoning.', 'সবচেয়ে উঁচু বিটের যুক্তি।') }],
  toolkit: ['bit-shift'],
};

export const p1474A: ProblemEntry = {
  id: '1474A',
  contestId: 1474,
  index: 'A',
  name: 'Puzzle From the Future',
  rating: 800,
  tags: ['constructive', 'greedy'],
  why: L('Greedy digit by digit: the leftmost digits matter most, so make each as large as possible without repeating the previous one.', 'অঙ্ক ধরে গ্রিডি: বামের অঙ্কই সবচেয়ে গুরুত্বপূর্ণ, তাই আগেরটি পুনরাবৃত্তি না করে প্রতিটি যত বড় সম্ভব করুন।'),
  statement: L(
    'Given binary b of length n, choose binary a. c is the digit-wise sum (digits 0–2, no carry), and d is c with runs of equal digits collapsed to one. Choose a to maximise d as an integer. There are t test cases.',
    'n দৈর্ঘ্যের বাইনারি b দেওয়া; বাইনারি a বাছুন। c হলো অঙ্ক ধরে যোগফল (অঙ্ক ০–২, হাতে নেই), আর d হলো c যেখানে সমান অঙ্কের ধারা একটিতে নামানো। d-কে পূর্ণসংখ্যা হিসেবে সর্বোচ্চ করতে a বাছুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and b.', 't; প্রতিটি টেস্টে n আর b।'),
  output: L('Any a giving the maximum d.', 'সর্বোচ্চ d দেয় এমন যেকোনো a।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 10⁵', 'Σ n ≤ ১০⁵'), anyAnswer] },
  samples: [{ input: '5\n1\n0\n3\n011\n3\n110\n6\n111000\n6\n001011', output: '1\n110\n100\n101101\n101110', explain: L('b = 011, a = 110 → c = 121 → d = 121.', 'b = ০১১, a = ১১০ → c = ১২১ → d = ১২১।') }],
  observation: L('d is longest when no two adjacent c digits are equal, and larger when its leading digits are larger. Going left to right, choose aᵢ = 1 if bᵢ + 1 differs from the previous c digit, otherwise aᵢ = 0 (bᵢ + 0 then differs automatically).', 'পাশাপাশি কোনো দুটি c অঙ্ক সমান না হলে d সবচেয়ে লম্বা, আর সামনের অঙ্ক বড় হলে d বড়। বাম থেকে ডানে, bᵢ + ১ আগের c অঙ্ক থেকে আলাদা হলে aᵢ = ১ বাছুন, নইলে aᵢ = ০ (তখন bᵢ + ০ আপনাআপনি আলাদা)।'),
  approach: [L('Track the previous c digit.', 'আগের c অঙ্ক রাখুন।')],
  walkthrough: { input: 'b = 110', steps: [{ state: 'c: 2, then 1+1 = 2 repeats → 1, then 0+1 = 1 repeats → 0', text: L('a = 100, d = 210.', 'a = ১০০, d = ২১০।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Prefer the larger digit unless it repeats', 'পুনরাবৃত্তি না হলে বড় অঙ্ক পছন্দ'),
      idea: L('Never let two equal c digits touch.', 'কখনো দুটি সমান c অঙ্ক পাশাপাশি নয়।'),
      explain: [L('Both choices for aᵢ give different c digits, so at least one differs from the previous: d always has full length n, and greedy picks the largest possible digit at each step.', 'aᵢ-এর দুটি বিকল্প ভিন্ন c অঙ্ক দেয়, তাই অন্তত একটি আগেরটি থেকে আলাদা: d সবসময় পূর্ণ n দৈর্ঘ্যের, আর গ্রিডি প্রতিটি ধাপে সবচেয়ে বড় সম্ভাব্য অঙ্ক বাছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string b;
        cin >> n >> b;
        string a;
        int prev = -1;
        for (char ch : b) {
            int bi = ch - '0';
            if (bi + 1 != prev) { a += '1'; prev = bi + 1; }
            else { a += '0'; prev = bi; }
        }
        cout << a << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every a', 'প্রতিটি a চেষ্টা'),
      idea: L('2ⁿ strings, compute d, keep the largest.', '২ⁿ-টি স্ট্রিং, d হিসাব করে সবচেয়ে বড়টি রাখা।'),
      explain: [L('d strings of different lengths compare as numbers: longer is larger (no leading zeros once length ≥ 2, since a leading 0 in c only appears alone). Small n only.', 'ভিন্ন দৈর্ঘ্যের d স্ট্রিং সংখ্যা হিসেবে তুলনা: লম্বাটি বড় (দৈর্ঘ্য ≥ ২ হলে সামনে শূন্য থাকে না)। শুধু ছোট n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string b;
        cin >> n >> b;
        if (n > 14) { cout << "\n"; continue; }
        string bestA, bestD;
        for (int mask = 0; mask < (1 << n); mask++) {
            string a(n, '0'), d;
            for (int i = 0; i < n; i++) {
                if (mask >> i & 1) a[i] = '1';
                char c = char('0' + (a[i] - '0') + (b[i] - '0'));
                if (d.empty() || d.back() != c) d += c;
            }
            while (d.size() > 1 && d[0] == '0') d.erase(d.begin());
            if (bestD.empty() || d.size() > bestD.size() || (d.size() == bestD.size() && d > bestD)) bestD = d, bestA = a;
        }
        cout << bestA << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['bit-shift', 'string-basics'],
    },
  ],
  tests: [{ input: '5\n1\n0\n3\n011\n3\n110\n6\n111000\n6\n001011', output: '1\n110\n100\n101101\n101110', source: 'sample', note: sample(1) }],
  pitfalls: [L('Always choosing aᵢ = 1, which repeats digits and shortens d.', 'সবসময় aᵢ = ১ বাছা, যা অঙ্ক পুনরাবৃত্তি করে d ছোট করে।')],
  related: [{ id: '1335B', name: 'Construct the String', why: L('Character-by-character construction.', 'অক্ষর ধরে গঠন।') }],
  toolkit: ['string-basics'],
};

export const p1515A: ProblemEntry = {
  id: '1515A',
  contestId: 1515,
  index: 'A',
  name: 'Phoenix and Gold',
  rating: 800,
  tags: ['constructive', 'greedy', 'math'],
  why: L('Distinct weights: if a prefix hits x, swapping in the next weight jumps past it.', 'আলাদা ওজন: কোনো প্রিফিক্স x ছুঁলে পরের ওজন অদলবদল করে সেটি পেরিয়ে যাওয়া।'),
  statement: L(
    'n gold pieces with distinct weights wᵢ are put on a scale one by one. The scale explodes if the total ever equals exactly x. Find an order that avoids this, or print NO. There are t test cases.',
    'আলাদা ওজন wᵢ-এর n-টি সোনার টুকরো একে একে দাঁড়িপাল্লায় রাখা হয়। মোট কখনো ঠিক x হলে পাল্লা ফেটে যায়। এটি এড়ায় এমন একটি ক্রম বের করুন, না হলে NO প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n x and the weights.', 't; প্রতিটি টেস্টে n x আর ওজনগুলো।'),
  output: L('YES and an order, or NO.', 'YES আর একটি ক্রম, অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 100, wᵢ ≤ 100 distinct', 'n ≤ ১০০, wᵢ ≤ ১০০ আলাদা'), anyAnswer] },
  samples: [{ input: '3\n3 2\n3 2 1\n5 3\n1 2 3 4 8\n1 5\n5', output: 'YES\n3 2 1\nYES\n8 1 2 3 4\nNO', explain: L('Third test: the only piece weighs exactly x.', 'তৃতীয় টেস্ট: একমাত্র টুকরোর ওজন ঠিক x।') }],
  observation: L('If the total is x, the last step always explodes: NO. Otherwise take any order; if prefix i hits x, swap wᵢ with wᵢ₊₁ (it exists, since the full total ≠ x). The new prefix i is x − wᵢ + wᵢ₊₁ ≠ x (weights are distinct), and prefix i + 1 and everything after it are unchanged.', 'মোট x হলে শেষ ধাপ সবসময় ফাটে: NO। নইলে যেকোনো ক্রম নিন; প্রিফিক্স i x ছুঁলে wᵢ আর wᵢ₊₁ অদলবদল করুন (এটি আছে, কারণ পূর্ণ মোট ≠ x)। নতুন প্রিফিক্স i হলো x − wᵢ + wᵢ₊₁ ≠ x (ওজন আলাদা), আর প্রিফিক্স i + ১ অপরিবর্তিত।'),
  approach: [L('Sort ascending, walk the prefix, swap once if needed.', 'ছোট থেকে সর্ট, প্রিফিক্স ধরে যান, দরকার হলে একবার অদলবদল।')],
  walkthrough: { input: 'w = 1 2 3 4 8, x = 3', steps: [{ state: 'prefix 1, 3 → hits x at i = 2', text: L('Swap 2 and 3: 1 3 2 4 8, prefixes 1, 4, 6, 10, 18.', '২ আর ৩ অদলবদল: ১ ৩ ২ ৪ ৮, প্রিফিক্স ১, ৪, ৬, ১০, ১৮।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort and a scan.', 'একটি সর্ট আর একটি স্ক্যান।') },
  solutions: [
    {
      id: 'swap',
      kind: 'optimal',
      title: L('Sort and swap on a hit', 'সর্ট আর মিললে অদলবদল'),
      idea: L('Only one prefix can equal x in an ascending order.', 'ছোট থেকে ক্রমে শুধু একটি প্রিফিক্স x-এর সমান হতে পারে।'),
      explain: [L('In ascending order prefix sums strictly increase, so at most one hits x; after the swap, prefix i + 1 is the old one (> x), and all later prefixes are larger still.', 'ছোট থেকে ক্রমে প্রিফিক্স যোগফল কঠোরভাবে বাড়ে, তাই সর্বোচ্চ একটি x ছোঁয়; অদলবদলের পরে প্রিফিক্স i + ১ পুরোনোটি (> x), আর পরের সব প্রিফিক্স আরও বড়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, x;
        cin >> n >> x;
        vector<int> w(n);
        for (auto& v : w) cin >> v;
        if (accumulate(w.begin(), w.end(), 0) == x) { cout << "NO\n"; continue; }
        sort(w.begin(), w.end());
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += w[i];
            if (sum == x) { swap(w[i], w[i + 1]); break; }
        }
        cout << "YES\n";
        for (int v : w) cout << v << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'accumulate'],
    },
    {
      id: 'largest-first',
      kind: 'alt',
      title: L('Move the offending piece to the end', 'সমস্যার টুকরোটি শেষে সরানো'),
      idea: L('In any order, if prefix i hits x, move wᵢ to the very end.', 'যেকোনো ক্রমে প্রিফিক্স i x ছুঁলে wᵢ একেবারে শেষে সরান।'),
      explain: [L('After the move, prefixes before i are unchanged (< x in ascending order), prefixes from i on skip wᵢ until the last, and the final total ≠ x. A second valid construction with a different argument.', 'সরানোর পরে i-এর আগের প্রিফিক্স অপরিবর্তিত (ছোট থেকে ক্রমে < x), i থেকে প্রিফিক্সগুলো শেষ পর্যন্ত wᵢ বাদ দেয়, আর শেষ মোট ≠ x। ভিন্ন যুক্তিসহ দ্বিতীয় একটি বৈধ গঠন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, x;
        cin >> n >> x;
        vector<int> w(n);
        for (auto& v : w) cin >> v;
        if (accumulate(w.begin(), w.end(), 0) == x) { cout << "NO\n"; continue; }
        sort(w.begin(), w.end());
        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += w[i];
            if (sum == x) { int v = w[i]; w.erase(w.begin() + i); w.push_back(v); break; }
        }
        cout << "YES\n";
        for (int v : w) cout << v << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'vector'],
    },
  ],
  tests: [{ input: '3\n3 2\n3 2 1\n5 3\n1 2 3 4 8\n1 5\n5', output: 'YES\n3 2 1\nYES\n8 1 2 3 4\nNO', source: 'sample', note: sample(1) }],
  pitfalls: [L('Printing NO whenever some prefix hits x.', 'কোনো প্রিফিক্স x ছুঁলেই NO প্রিন্ট।')],
  related: [{ id: '1343B', name: 'Balanced Array', why: L('Sum-based construction.', 'যোগফল-ভিত্তিক গঠন।') }],
  toolkit: ['sort'],
};

export const p1263D: ProblemEntry = {
  id: '1263D',
  contestId: 1263,
  index: 'D',
  name: 'Secret Passwords',
  rating: 1500,
  tags: ['dfs', 'dsu', 'graphs'],
  why: L('Connect letters, not passwords: a DSU on 26 letters merges every password in O(length).', 'পাসওয়ার্ড নয়, অক্ষর যুক্ত করুন: ২৬ অক্ষরের একটি DSU প্রতিটি পাসওয়ার্ড O(দৈর্ঘ্য)-এ মেলায়।'),
  statement: L('Two passwords are equivalent if they share a letter, or both are equivalent to a third. Count the equivalence classes among n passwords.', 'দুটি পাসওয়ার্ড সমতুল্য যদি তারা একটি অক্ষর ভাগ করে, বা দুটিই তৃতীয় একটির সমতুল্য হয়। n-টি পাসওয়ার্ডের মধ্যে সমতুল্যতার শ্রেণি গুনুন।'),
  input: L('n, then n passwords.', 'n, তারপর n-টি পাসওয়ার্ড।'),
  output: L('The number of classes.', 'শ্রেণির সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 2·10⁵, total length ≤ 10⁶', 'n ≤ ২·১০⁵, মোট দৈর্ঘ্য ≤ ১০⁶')] },
  samples: [
    { input: '4\na\nb\nab\nd', output: '2', explain: L('{a, b, ab} and {d}.', '{a, b, ab} আর {d}।') },
    { input: '3\nab\nbc\nabc', output: '1', explain: L('All share letters.', 'সবাই অক্ষর ভাগ করে।') },
    { input: '1\ncodeforces', output: '1', explain: L('One password.', 'একটি পাসওয়ার্ড।') },
  ],
  observation: L('Union all letters of each password. Two passwords are in one class iff their letters are in one DSU component. So the answer is the number of components among letters that appear at all.', 'প্রতিটি পাসওয়ার্ডের সব অক্ষর ইউনিয়ন করুন। দুটি পাসওয়ার্ড এক শ্রেণিতে ঠিক তখনই যখন তাদের অক্ষর এক DSU উপাদানে। তাই উত্তর হলো যেসব অক্ষর আদৌ আসে তাদের মধ্যে উপাদানের সংখ্যা।'),
  approach: [L('DSU on 26 letters; mark used letters; count roots among used letters.', '২৬ অক্ষরে DSU; ব্যবহৃত অক্ষর চিহ্নিত; ব্যবহৃত অক্ষরের মধ্যে মূল গুনুন।')],
  walkthrough: { input: 'a, b, ab, d', steps: [{ state: 'union(a, b); used {a, b, d}', text: L('Roots: {a, b}, {d} → 2.', 'মূল: {a, b}, {d} → ২।') }] },
  complexity: { time: 'O(total length)', space: 'O(26)', why: L('Constant-size DSU.', 'নির্দিষ্ট আকারের DSU।') },
  solutions: [
    {
      id: 'dsu',
      kind: 'optimal',
      title: L('DSU on letters', 'অক্ষরে DSU'),
      idea: L('Shrink the graph to 26 vertices.', 'গ্রাফকে ২৬ শীর্ষে নামানো।'),
      explain: [L('Joining passwords pairwise would be O(n²). Making the shared objects (letters) the vertices is a common modelling trick for “share something” relations.', 'পাসওয়ার্ড জোড়ায় জোড়ায় যুক্ত করলে O(n²) হতো। ভাগ করা জিনিসকে (অক্ষর) শীর্ষ বানানো “কিছু ভাগ করে” সম্পর্কের প্রচলিত মডেলিং কৌশল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int p[26];
int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    iota(p, p + 26, 0);
    bool used[26] = {};
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        for (char c : s) {
            used[c - 'a'] = true;
            p[find(c - 'a')] = find(s[0] - 'a');
        }
    }
    int classes = 0;
    for (int c = 0; c < 26; c++) if (used[c] && find(c) == c) classes++;
    cout << classes << "\n";
    return 0;
}
`,
      time: 'O(total length · α)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['functions', 'io-fast'],
    },
    {
      id: 'dfs',
      kind: 'method',
      title: L('Letter graph + DFS', 'অক্ষরের গ্রাফ + DFS'),
      idea: L('Edge between consecutive letters of each password; count components among used letters.', 'প্রতিটি পাসওয়ার্ডের পরপর অক্ষরের মাঝে প্রান্ত; ব্যবহৃত অক্ষরের মধ্যে উপাদান গুনুন।'),
      explain: [L('A 26 × 26 adjacency matrix is enough. Connecting each letter to the password’s first letter (or chaining consecutive letters) puts all its letters in one component.', 'একটি ২৬ × ২৬ সংলগ্নতা ম্যাট্রিক্সই যথেষ্ট। প্রতিটি অক্ষরকে পাসওয়ার্ডের প্রথম অক্ষরের সঙ্গে যুক্ত করলে (বা পরপর অক্ষর শৃঙ্খলিত করলে) এর সব অক্ষর এক উপাদানে আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool adj[26][26], used[26], seen[26];

void dfs(int v) {
    seen[v] = true;
    for (int u = 0; u < 26; u++) if (adj[v][u] && !seen[u]) dfs(u);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        for (size_t j = 0; j < s.size(); j++) {
            used[s[j] - 'a'] = true;
            if (j) adj[s[j] - 'a'][s[j - 1] - 'a'] = adj[s[j - 1] - 'a'][s[j] - 'a'] = true;
        }
    }
    int classes = 0;
    for (int c = 0; c < 26; c++) if (used[c] && !seen[c]) { dfs(c); classes++; }
    cout << classes << "\n";
    return 0;
}
`,
      time: 'O(total length + 26²)',
      space: 'O(26²)',
      accepted: true,
      toolkit: ['functions', 'io-fast'],
    },
  ],
  tests: [
    { input: '4\na\nb\nab\nd', output: '2', source: 'sample', note: sample(1) },
    { input: '3\nab\nbc\nabc', output: '1', source: 'sample', note: sample(2) },
    { input: '1\ncodeforces', output: '1', source: 'sample', note: sample(3) },
    { input: '3\na\na\na', output: '1', source: 'own', note: L('Duplicates are one class.', 'পুনরাবৃত্তি এক শ্রেণি।') },
  ],
  pitfalls: [L('Comparing passwords pairwise.', 'পাসওয়ার্ড জোড়ায় জোড়ায় তুলনা।'), L('Counting unused letters as classes.', 'অব্যবহৃত অক্ষরকে শ্রেণি গোনা।')],
  related: [{ id: '217A', name: 'Ice Skating', why: L('DSU on shared coordinates.', 'ভাগ করা স্থানাঙ্কে DSU।') }],
  toolkit: ['functions'],
};
