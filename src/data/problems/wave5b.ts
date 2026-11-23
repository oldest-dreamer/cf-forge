import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p381A: ProblemEntry = {
  id: '381A',
  contestId: 381,
  index: 'A',
  name: 'Sereja and Dima',
  rating: 800,
  tags: ['greedy', 'implementation', 'two-pointers'],
  why: L('Taking from either end of an array: the simplest two-pointer simulation.', 'অ্যারের যেকোনো প্রান্ত থেকে নেওয়া: সবচেয়ে সরল টু-পয়েন্টার সিমুলেশন।'),
  statement: L(
    'n cards with distinct numbers lie in a row. Sereja and Dima take turns, Sereja first; on each turn a player takes the larger of the two end cards. Print both players’ totals.',
    'আলাদা সংখ্যার n-টি কার্ড একটি সারিতে। সেরেজা আর দিমা পালা করে নেয়, সেরেজা আগে; প্রতিটি পালায় খেলোয়াড় দুই প্রান্তের কার্ডের বড়টি নেয়। দুজনের মোট প্রিন্ট করুন।',
  ),
  input: L('n, then the numbers.', 'n, তারপর সংখ্যাগুলো।'),
  output: L('Sereja’s and Dima’s totals.', 'সেরেজা আর দিমার মোট।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000', '১ ≤ n ≤ ১০০০')] },
  samples: [
    { input: '4\n4 1 2 10', output: '12 5', explain: L('Sereja: 10, 2; Dima: 4, 1.', 'সেরেজা: ১০, ২; দিমা: ৪, ১।') },
    { input: '7\n1 2 3 4 5 6 7', output: '16 12', explain: L('They alternate from the right end.', 'তারা ডান প্রান্ত থেকে পালাক্রমে নেয়।') },
  ],
  observation: L('The remaining cards always form a contiguous segment [l, r]. Two pointers model it exactly.', 'বাকি কার্ডগুলো সবসময় একটি একটানা অংশ [l, r] গঠন করে। দুটি পয়েন্টার এটি হুবহু মডেল করে।'),
  approach: [L('While l ≤ r, take max(a[l], a[r]) for the current player and move that pointer.', 'l ≤ r যতক্ষণ, বর্তমান খেলোয়াড়ের জন্য max(a[l], a[r]) নিন আর সেই পয়েন্টার সরান।')],
  walkthrough: { input: '4 1 2 10', steps: [{ state: 'S 10, D 4, S 2, D 1', text: L('12 and 5.', '১২ আর ৫।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('n turns.', 'n-টি পালা।') },
  solutions: [
    {
      id: 'pointers',
      kind: 'optimal',
      title: L('Two pointers', 'টু পয়েন্টার'),
      idea: L('turn toggles between the players.', 'turn খেলোয়াড়দের মধ্যে পালা বদলায়।'),
      explain: [L('score[turn] with turn ^= 1 avoids duplicating the code for the two players.', 'turn ^= ১ সহ score[turn] দুজন খেলোয়াড়ের জন্য কোড দ্বিগুণ করা এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int l = 0, r = n - 1, turn = 0, score[2] = {0, 0};
    while (l <= r) {
        if (a[l] > a[r]) score[turn] += a[l++];
        else score[turn] += a[r--];
        turn ^= 1;
    }
    cout << score[0] << " " << score[1] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n', 'bitwise-and'],
    },
    {
      id: 'deque',
      kind: 'stl',
      title: L('A deque', 'একটি deque'),
      idea: L('Pop from whichever end is larger.', 'যে প্রান্ত বড় সেখান থেকে পপ।'),
      explain: [L('std::deque gives O(1) access and removal at both ends, which matches the game literally.', 'std::deque দুই প্রান্তে O(১)-এ প্রবেশ আর অপসারণ দেয়, যা খেলাটির সঙ্গে হুবহু মেলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    deque<int> d(n);
    for (auto& x : d) cin >> x;
    long long s[2] = {0, 0};
    for (int turn = 0; !d.empty(); turn ^= 1) {
        if (d.front() > d.back()) { s[turn] += d.front(); d.pop_front(); }
        else { s[turn] += d.back(); d.pop_back(); }
    }
    cout << s[0] << " " << s[1] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [
    { input: '4\n4 1 2 10', output: '12 5', source: 'sample', note: sample(1) },
    { input: '7\n1 2 3 4 5 6 7', output: '16 12', source: 'sample', note: sample(2) },
    { input: '1\n5', output: '5 0', source: 'own', note: L('One card.', 'একটি কার্ড।') },
  ],
  pitfalls: [L('Taking the larger card of the whole array instead of the ends.', 'প্রান্তের বদলে পুরো অ্যারের বড় কার্ড নেওয়া।')],
  related: [{ id: '1669F', name: 'Eating Candies', why: L('Two ends again.', 'আবার দুই প্রান্ত।') }],
  toolkit: ['while-n'],
};

export const p1791C: ProblemEntry = {
  id: '1791C',
  contestId: 1791,
  index: 'C',
  name: 'Prepend and Append',
  rating: 800,
  tags: ['implementation', 'two-pointers'],
  why: L('Undo operations from the outside in with two pointers.', 'টু পয়েন্টার দিয়ে বাইরে থেকে ভেতরে অপারেশন ফেরানো।'),
  statement: L(
    'Timur starts with a binary string and repeatedly adds 0 to one end and 1 to the other end. Given the final string, find the shortest possible length of the original string. There are t test cases.',
    'তিমুর একটি বাইনারি স্ট্রিং নিয়ে শুরু করে বারবার এক প্রান্তে ০ আর অন্য প্রান্তে ১ যোগ করে। শেষ স্ট্রিং দেওয়া আছে; মূল স্ট্রিংয়ের সবচেয়ে ছোট সম্ভাব্য দৈর্ঘ্য বের করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the string.', 't; প্রতিটি টেস্টে n আর স্ট্রিং।'),
  output: L('The minimum original length.', 'মূলের সর্বনিম্ন দৈর্ঘ্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 2000', '১ ≤ n ≤ ২০০০')] },
  samples: [
    { input: '9\n3\n100\n4\n0111\n5\n10101\n6\n101010\n7\n1010110\n1\n1\n2\n10\n2\n11\n10\n1011011010', output: '1\n2\n5\n0\n3\n1\n0\n2\n4', explain: L('101010 peels completely: 0 left.', '১০১০১০ পুরো খোলা যায়: ০ বাকি।') },
  ],
  observation: L('The last operation left different characters at the two ends. So while the ends differ, strip them both; the first time they are equal (or nothing is left), stop.', 'শেষ অপারেশন দুই প্রান্তে আলাদা অক্ষর রেখেছে। তাই প্রান্তগুলো আলাদা যতক্ষণ, দুটোই সরান; প্রথমবার সমান হলে (বা কিছু না থাকলে) থামুন।'),
  approach: [L('l = 0, r = n − 1; while l < r and s[l] ≠ s[r], move both inwards. Answer r − l + 1.', 'l = ০, r = n − ১; l < r আর s[l] ≠ s[r] যতক্ষণ, দুটোই ভেতরে সরান। উত্তর r − l + ১।')],
  walkthrough: { input: '1010110', steps: [{ state: '1…0 ✓, 0…1 ✓, 1…1 ✗', text: L('Middle 011 remains: 3.', 'মাঝে ০১১ থাকে: ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each pointer moves at most n/2 times.', 'প্রতিটি পয়েন্টার সর্বোচ্চ n/২ বার সরে।') },
  solutions: [
    {
      id: 'pointers',
      kind: 'optimal',
      title: L('Peel matching ends', 'মেলা প্রান্তগুলো খোলা'),
      idea: L('Shrink while s[l] ≠ s[r].', 's[l] ≠ s[r] যতক্ষণ ছোট করুন।'),
      explain: [L('Stripping greedily is safe: if the ends differ, they could have come from one operation, and stripping them can only make the remainder shorter.', 'গ্রিডিভাবে সরানো নিরাপদ: প্রান্তগুলো আলাদা হলে তারা একটি অপারেশন থেকে আসতে পারত, আর সরালে বাকিটা শুধু ছোট হতে পারে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        int l = 0, r = n - 1;
        while (l < r && s[l] != s[r]) l++, r--;
        cout << max(0, r - l + 1) << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n', 'min-max'],
    },
    {
      id: 'erase',
      kind: 'method',
      title: L('Erase the ends from the string', 'স্ট্রিং থেকে প্রান্ত মোছা'),
      idea: L('Literally remove front and back while they differ.', 'আলাদা থাকা পর্যন্ত আক্ষরিকভাবে সামনে আর পেছন সরানো।'),
      explain: [L('Using pop_back and erase(0, 1) mirrors the statement. erase at the front is O(n), making this O(n²), still fine for n ≤ 2000.', 'pop_back আর erase(০, ১) স্টেটমেন্টের প্রতিচ্ছবি। সামনে erase O(n), তাই এটি O(n²), n ≤ ২০০০-এর জন্য তবুও ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        while (s.size() >= 2 && s.front() != s.back()) {
            s.pop_back();
            s.erase(0, 1);
        }
        cout << s.size() << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '9\n3\n100\n4\n0111\n5\n10101\n6\n101010\n7\n1010110\n1\n1\n2\n10\n2\n11\n10\n1011011010', output: '1\n2\n5\n0\n3\n1\n0\n2\n4', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Printing a negative length when l passes r.', 'l, r-কে ছাড়ালে ঋণাত্মক দৈর্ঘ্য প্রিন্ট।')],
  related: [{ id: '381A', name: 'Sereja and Dima', why: L('Both ends.', 'দুই প্রান্ত।') }],
  toolkit: ['while-n'],
};

export const p1690D: ProblemEntry = {
  id: '1690D',
  contestId: 1690,
  index: 'D',
  name: 'Black and White Stripe',
  rating: 1000,
  tags: ['implementation', 'two-pointers'],
  featuredFor: ['two-pointers'],
  why: L('A fixed-length window counting whites: slide or use prefix sums.', 'সাদা গোনা নির্দিষ্ট দৈর্ঘ্যের উইন্ডো: সরানো বা প্রিফিক্স সাম।'),
  statement: L(
    'A stripe of n cells is coloured W or B. Find the minimum number of white cells to recolour black so that some k consecutive cells are all black. There are t test cases.',
    'n ঘরের একটি ফালি W বা B রঙের। সবচেয়ে কম কয়টি সাদা ঘর কালো করতে হবে যাতে পরপর কোনো k-টি ঘর সব কালো হয়? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, k and the stripe.', 't; প্রতিটি টেস্টে n, k আর ফালি।'),
  output: L('The minimum recolouring for each test.', 'প্রতিটি টেস্টের সর্বনিম্ন রং বদল।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '4\n5 3\nBBWBW\n5 5\nBBWBW\n5 1\nBBWBW\n1 1\nW', output: '1\n2\n0\n1', explain: L('k = 3: window BBW or BWB needs 1.', 'k = ৩: উইন্ডো BBW বা BWB-তে ১ লাগে।') }],
  observation: L('For a window of length k the cost is the number of W inside it. Take the minimum over all n − k + 1 windows.', 'k দৈর্ঘ্যের উইন্ডোর খরচ হলো এর ভেতরের W-এর সংখ্যা। সব n − k + ১টি উইন্ডোর সর্বনিম্ন নিন।'),
  approach: [L('Slide the window, updating the count of W in O(1).', 'উইন্ডো সরান, W-এর গণনা O(১)-এ আপডেট করে।')],
  walkthrough: { input: 'BBWBW, k = 3', steps: [{ state: 'BBW 1, BWB 1, WBW 2', text: L('Minimum 1.', 'সর্বনিম্ন ১।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'slide',
      kind: 'optimal',
      title: L('Sliding window count', 'স্লাইডিং উইন্ডো গণনা'),
      idea: L('Add the new cell, remove the cell that left.', 'নতুন ঘর যোগ, বের হওয়া ঘর বাদ।'),
      explain: [L('The window count changes by at most one per step, so every window costs O(1) after the first.', 'প্রতিটি ধাপে উইন্ডোর গণনা সর্বোচ্চ এক বদলায়, তাই প্রথমটির পর প্রতিটি উইন্ডো O(১)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        string s;
        cin >> n >> k >> s;
        int w = 0;
        for (int i = 0; i < k; i++) w += s[i] == 'W';
        int best = w;
        for (int i = k; i < n; i++) {
            w += (s[i] == 'W') - (s[i - k] == 'W');
            best = min(best, w);
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bool-arith', 'min-max'],
    },
    {
      id: 'prefix',
      kind: 'method',
      title: L('Prefix counts of W', 'W-এর প্রিফিক্স গণনা'),
      idea: L('W in [i, i + k) = pre[i + k] − pre[i].', '[i, i + k)-এ W = pre[i + k] − pre[i]।'),
      explain: [L('Prefix counts answer the same window question for any i in O(1) and are easier to adapt when windows have different lengths.', 'প্রিফিক্স গণনা যেকোনো i-এর জন্য একই উইন্ডো প্রশ্নের উত্তর O(১)-এ দেয় আর উইন্ডোর দৈর্ঘ্য আলাদা হলে মানিয়ে নেওয়া সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        string s;
        cin >> n >> k >> s;
        vector<int> pre(n + 1, 0);
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] == 'W');
        int best = INT_MAX;
        for (int i = 0; i + k <= n; i++) best = min(best, pre[i + k] - pre[i]);
        cout << best << "\n";
    }
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
    { input: '4\n5 3\nBBWBW\n5 5\nBBWBW\n5 1\nBBWBW\n1 1\nW', output: '1\n2\n0\n1', source: 'sample', note: sample(1) },
    { input: '1\n3 2\nBBB', output: '0', source: 'own', note: L('Already black.', 'আগেই কালো।') },
  ],
  pitfalls: [L('Recounting every window from scratch: O(n · k).', 'প্রতিটি উইন্ডো শুরু থেকে গোনা: O(n · k)।')],
  related: [{ id: '363B', name: 'Fence', why: L('Fixed-length window.', 'নির্দিষ্ট দৈর্ঘ্যের উইন্ডো।') }],
  toolkit: ['prefix-sum'],
};

export const p1669F: ProblemEntry = {
  id: '1669F',
  contestId: 1669,
  index: 'F',
  name: 'Eating Candies',
  rating: 1100,
  tags: ['binary-search', 'data-structures', 'greedy', 'two-pointers'],
  why: L('Two pointers from opposite ends balancing two sums.', 'দুটি যোগফল মেলাতে বিপরীত প্রান্ত থেকে টু পয়েন্টার।'),
  statement: L(
    'n candies lie in a row with weights wᵢ. Alice eats some candies from the left, Bob some from the right, and nobody eats the same candy. Their total weights must be equal. Maximise the total number of candies eaten. There are t test cases.',
    'wᵢ ওজনের n-টি ক্যান্ডি একটি সারিতে। অ্যালিস বাম থেকে কিছু, বব ডান থেকে কিছু খায়, আর কেউ একই ক্যান্ডি খায় না। তাদের মোট ওজন সমান হতে হবে। মোট খাওয়া ক্যান্ডি সর্বোচ্চ করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the weights.', 't; প্রতিটি টেস্টে n আর ওজনগুলো।'),
  output: L('The maximum number of candies.', 'সর্বোচ্চ ক্যান্ডির সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, wᵢ ≤ 10⁴', 'Σ n ≤ ২·১০⁵, wᵢ ≤ ১০⁴')] },
  samples: [
    { input: '4\n3\n10 20 10\n6\n2 1 4 2 4 1\n5\n1 2 4 8 16\n9\n7 3 20 5 15 1 11 8 10', output: '2\n6\n0\n7', explain: L('First test: each eats one 10.', 'প্রথম টেস্ট: প্রত্যেকে একটি ১০ খায়।') },
  ],
  observation: L('Grow whichever side has the smaller total. Whenever the totals are equal, record the number eaten. Weights are positive, so every equal pair is visited.', 'যে পাশের মোট ছোট সেটি বাড়ান। মোট সমান হলেই খাওয়ার সংখ্যা লিখে রাখুন। ওজন ধনাত্মক, তাই প্রতিটি সমান জোড়া দেখা হয়।'),
  approach: [L('l from the left, r from the right; add to the smaller sum; stop when they meet.', 'বাম থেকে l, ডান থেকে r; ছোট যোগফলে যোগ করুন; মিলিত হলে থামুন।')],
  walkthrough: { input: '10 20 10', steps: [{ state: 'A 10, B 10: equal, 2 eaten', text: L('Then A 30 > B 10, they meet.', 'তারপর A ৩০ > B ১০, তারা মিলিত।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each pointer moves at most n times.', 'প্রতিটি পয়েন্টার সর্বোচ্চ n বার সরে।') },
  solutions: [
    {
      id: 'pointers',
      kind: 'optimal',
      title: L('Balance from both ends', 'দুই প্রান্ত থেকে মেলানো'),
      idea: L('Always extend the lighter side.', 'সবসময় হালকা দিক বাড়ান।'),
      explain: [L('If Alice’s sum is smaller, Bob taking more can only widen the gap, so Alice must eat next; the reverse holds too. This forced choice makes the scan correct.', 'অ্যালিসের যোগফল ছোট হলে বব আরও নিলে ফাঁক শুধু বাড়ে, তাই অ্যালিসকেই পরেরটি খেতে হবে; উল্টোটাও সত্য। এই বাধ্যতামূলক সিদ্ধান্ত স্ক্যানটিকে সঠিক করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> w(n);
        for (auto& x : w) cin >> x;
        int l = 0, r = n - 1, best = 0;
        long long A = 0, B = 0;
        while (l <= r) {
            if (A <= B) A += w[l++];
            else B += w[r--];
            if (A == B) best = l + (n - 1 - r);
        }
        cout << best << "\n";
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
      id: 'map',
      kind: 'method',
      title: L('Prefix sums matched with a map', 'map দিয়ে মেলানো প্রিফিক্স সাম'),
      idea: L('Store each prefix sum with its length; for each suffix sum look up an equal prefix that does not overlap.', 'প্রতিটি প্রিফিক্স সাম তার দৈর্ঘ্যসহ রাখুন; প্রতিটি সাফিক্স সামের জন্য অ-উপরিপাতিত সমান প্রিফিক্স খুঁজুন।'),
      explain: [L('Prefix sums are strictly increasing, so each value maps to one length. For a suffix of length j, a prefix of length i with the same sum works if i + j ≤ n.', 'প্রিফিক্স সাম কঠোরভাবে বাড়ে, তাই প্রতিটি মান একটি দৈর্ঘ্যে যায়। j দৈর্ঘ্যের সাফিক্সের জন্য একই যোগফলের i দৈর্ঘ্যের প্রিফিক্স কাজ করে যদি i + j ≤ n।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> w(n);
        for (auto& x : w) cin >> x;
        map<long long, int> prefLen;
        long long s = 0;
        for (int i = 0; i < n; i++) { s += w[i]; prefLen[s] = i + 1; }
        int best = 0;
        s = 0;
        for (int j = 1; j <= n; j++) {
            s += w[n - j];
            auto it = prefLen.find(s);
            if (it != prefLen.end() && it->second + j <= n) best = max(best, it->second + j);
        }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'prefix-sum'],
    },
  ],
  tests: [
    { input: '4\n3\n10 20 10\n6\n2 1 4 2 4 1\n5\n1 2 4 8 16\n9\n7 3 20 5 15 1 11 8 10', output: '2\n6\n0\n7', source: 'sample', note: sample(1) },
    { input: '1\n1\n5', output: '0', source: 'own', note: L('One candy cannot be shared.', 'একটি ক্যান্ডি ভাগ করা যায় না।') },
  ],
  pitfalls: [L('Letting both eat the middle candy.', 'দুজনকেই মাঝের ক্যান্ডি খেতে দেওয়া।')],
  related: [{ id: '381A', name: 'Sereja and Dima', why: L('Taking from both ends.', 'দুই প্রান্ত থেকে নেওয়া।') }],
  toolkit: ['while-n'],
};

export const p1343C: ProblemEntry = {
  id: '1343C',
  contestId: 1343,
  index: 'C',
  name: 'Alternating Subsequence',
  rating: 1200,
  tags: ['dp', 'greedy', 'two-pointers'],
  why: L('Group by sign and take the maximum of each group.', 'চিহ্ন অনুযায়ী দল করে প্রতিটি দলের সর্বোচ্চ নেওয়া।'),
  statement: L(
    'An array has non-zero integers. Among all longest subsequences whose signs alternate, find the largest possible sum. There are t test cases.',
    'একটি অ্যারেতে শূন্য নয় এমন পূর্ণসংখ্যা। যেসব সবচেয়ে লম্বা সাবসিকোয়েন্সে চিহ্ন পর্যায়ক্রমে বদলায়, তাদের মধ্যে সবচেয়ে বড় সম্ভাব্য যোগফল বের করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The maximum sum for each test.', 'প্রতিটি টেস্টের সর্বোচ্চ যোগফল।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, |aᵢ| ≤ 10⁹', 'Σ n ≤ ২·১০⁵, |aᵢ| ≤ ১০⁹')] },
  samples: [
    { input: '4\n5\n1 2 3 -1 -2\n4\n-1 -2 -1 -3\n10\n-2 8 3 8 -4 -15 5 -2 -3 1\n6\n1 -1000000000 1 -1000000000 1 -1000000000', output: '2\n-1\n6\n-2999999997', explain: L('First test: 3 and −1.', 'প্রথম টেস্ট: ৩ আর −১।') }],
  observation: L('The longest length is the number of maximal same-sign blocks, one element from each. To maximise the sum, take the largest element of every block.', 'সবচেয়ে লম্বা দৈর্ঘ্য হলো একই চিহ্নের সর্বোচ্চ ব্লকের সংখ্যা, প্রতিটি থেকে একটি উপাদান। যোগফল সর্বোচ্চ করতে প্রতিটি ব্লকের সবচেয়ে বড় উপাদান নিন।'),
  approach: [L('Walk the array; inside a block keep the running max; when the sign flips, add it and start a new block.', 'অ্যারে ধরে চলুন; ব্লকের ভেতরে চলতি সর্বোচ্চ রাখুন; চিহ্ন বদলালে সেটি যোগ করে নতুন ব্লক শুরু করুন।')],
  walkthrough: { input: '1 2 3 −1 −2', steps: [{ state: 'blocks [1 2 3], [−1 −2]', text: L('3 + (−1) = 2.', '৩ + (−১) = ২।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'blocks',
      kind: 'optimal',
      title: L('Max of each sign block', 'প্রতিটি চিহ্ন-ব্লকের সর্বোচ্চ'),
      idea: L('Sum of block maxima.', 'ব্লক সর্বোচ্চের যোগফল।'),
      explain: [L('Any alternating subsequence uses at most one element per block, so maximal length forces exactly one per block, and those choices are independent. Sums reach 2·10¹⁴: long long.', 'যেকোনো পর্যায়ক্রমিক সাবসিকোয়েন্স প্রতি ব্লকে সর্বোচ্চ একটি উপাদান নেয়, তাই সর্বোচ্চ দৈর্ঘ্য প্রতি ব্লকে ঠিক একটি বাধ্য করে, আর সেই সিদ্ধান্তগুলো স্বাধীন। যোগফল ২·১০¹⁴ পর্যন্ত: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> a(n);
        for (auto& x : a) scanf("%lld", &x);
        long long sum = 0, cur = a[0];
        for (int i = 1; i < n; i++) {
            if ((a[i] > 0) == (a[i - 1] > 0)) cur = max(cur, a[i]);
            else { sum += cur; cur = a[i]; }
        }
        printf("%lld\n", sum + cur);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['c-io', 'long-long'],
    },
    {
      id: 'pointers',
      kind: 'method',
      title: L('Two pointers over each block', 'প্রতিটি ব্লকের ওপর টু পয়েন্টার'),
      idea: L('j runs to the end of the block starting at i; take max_element of [i, j).', 'i-তে শুরু হওয়া ব্লকের শেষ পর্যন্ত j চলে; [i, j)-এর max_element নিন।'),
      explain: [L('Same idea with explicit block boundaries; i jumps to j, so each element is visited once.', 'স্পষ্ট ব্লক সীমানাসহ একই আইডিয়া; i, j-তে লাফ দেয়, তাই প্রতিটি উপাদান একবার দেখা হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> a(n);
        for (auto& x : a) scanf("%lld", &x);
        long long sum = 0;
        for (int i = 0; i < n;) {
            int j = i;
            while (j < n && (a[j] > 0) == (a[i] > 0)) j++;
            sum += *max_element(a.begin() + i, a.begin() + j);
            i = j;
        }
        printf("%lld\n", sum);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'while-n'],
    },
  ],
  tests: [
    { input: '4\n5\n1 2 3 -1 -2\n4\n-1 -2 -1 -3\n10\n-2 8 3 8 -4 -15 5 -2 -3 1\n6\n1 -1000000000 1 -1000000000 1 -1000000000', output: '2\n-1\n6\n-2999999997', source: 'sample', note: sample(1) },
    { input: '1\n1\n-7', output: '-7', source: 'own', note: L('One element.', 'একটি উপাদান।') },
  ],
  pitfalls: [L('Initialising the block max to 0, which is wrong for negative blocks.', 'ব্লকের সর্বোচ্চ ০ দিয়ে শুরু, যা ঋণাত্মক ব্লকে ভুল।')],
  related: [{ id: '1138A', name: 'Sushi for Two', why: L('Blocks of equal type.', 'একই ধরনের ব্লক।') }],
  toolkit: ['long-long'],
};

export const p1324D: ProblemEntry = {
  id: '1324D',
  contestId: 1324,
  index: 'D',
  name: 'Pair of Topics',
  rating: 1400,
  tags: ['binary-search', 'data-structures', 'sortings', 'two-pointers'],
  featuredFor: ['two-pointers'],
  why: L('Move everything to one side: cᵢ = aᵢ − bᵢ, then count pairs with cᵢ + cⱼ > 0.', 'সব এক পাশে আনুন: cᵢ = aᵢ − bᵢ, তারপর cᵢ + cⱼ > ০ জোড়া গোনা।'),
  statement: L(
    'Topic i is aᵢ interesting for the teacher and bᵢ for the students. Count pairs i < j such that aᵢ + aⱼ > bᵢ + bⱼ.',
    'বিষয় i শিক্ষকের কাছে aᵢ আর ছাত্রদের কাছে bᵢ আকর্ষণীয়। i < j এমন জোড়া গুনুন যেখানে aᵢ + aⱼ > bᵢ + bⱼ।',
  ),
  input: L('n, then a, then b.', 'n, তারপর a, তারপর b।'),
  output: L('The number of good pairs.', 'ভালো জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵', '২ ≤ n ≤ ২·১০⁵')] },
  samples: [
    { input: '5\n4 8 2 6 2\n4 5 4 1 3', output: '7', explain: L('c = 0 3 −2 5 −1.', 'c = ০ ৩ −২ ৫ −১।') },
    { input: '4\n1 3 2 4\n1 3 2 4', output: '0', explain: L('Every c is 0.', 'প্রতিটি c হলো ০।') },
  ],
  observation: L('aᵢ + aⱼ > bᵢ + bⱼ ⇔ cᵢ + cⱼ > 0 with cᵢ = aᵢ − bᵢ. The pair condition no longer depends on the order, so sort c.', 'cᵢ = aᵢ − bᵢ নিলে aᵢ + aⱼ > bᵢ + bⱼ ⇔ cᵢ + cⱼ > ০। জোড়ার শর্ত আর ক্রমের ওপর নির্ভর করে না, তাই c সর্ট করুন।'),
  approach: [L('Two pointers from both ends of sorted c.', 'সাজানো c-এর দুই প্রান্ত থেকে টু পয়েন্টার।')],
  walkthrough: { input: 'c sorted −2 −1 0 3 5', steps: [{ state: 'pairs with sum > 0', text: L('7 pairs.', '৭টি জোড়া।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'pointers',
      kind: 'optimal',
      title: L('Sort c, two pointers', 'c সর্ট, টু পয়েন্টার'),
      idea: L('If c[l] + c[r] > 0, all of l..r − 1 pair with r.', 'c[l] + c[r] > ০ হলে l..r − ১ সবাই r-এর সঙ্গে জোড়া।'),
      explain: [L('When the smallest remaining value works with c[r], every larger value does too, so r contributes r − l pairs and moves left. Otherwise c[l] is too small for anyone and moves right.', 'বাকি সবচেয়ে ছোট মান c[r]-এর সঙ্গে কাজ করলে প্রতিটি বড় মানও করে, তাই r দেয় r − l জোড়া আর বামে সরে। না হলে c[l] কারও জন্যই খুব ছোট আর ডানে সরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n), c(n);
    for (auto& x : a) scanf("%lld", &x);
    for (int i = 0; i < n; i++) {
        long long b;
        scanf("%lld", &b);
        c[i] = a[i] - b;
    }
    sort(c.begin(), c.end());
    long long pairs = 0;
    int l = 0, r = n - 1;
    while (l < r) {
        if (c[l] + c[r] > 0) { pairs += r - l; r--; }
        else l++;
    }
    printf("%lld\n", pairs);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'c-io', 'long-long'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Binary search for partners', 'সঙ্গীর জন্য বাইনারি সার্চ'),
      idea: L('For each i, count j > i with c[j] > −c[i] using upper_bound.', 'প্রতিটি i-এর জন্য upper_bound দিয়ে c[j] > −c[i] এমন j > i গুনুন।'),
      explain: [L('Searching only in the part after i counts each pair once. This version is easy to adapt when the condition changes, e.g. to ≥.', 'শুধু i-এর পরের অংশে খুঁজলে প্রতিটি জোড়া একবার গোনা হয়। শর্ত বদলালে (যেমন ≥) এই সংস্করণ সহজে মানিয়ে নেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> a(n), c(n);
    for (auto& x : a) scanf("%lld", &x);
    for (int i = 0; i < n; i++) {
        long long b;
        scanf("%lld", &b);
        c[i] = a[i] - b;
    }
    sort(c.begin(), c.end());
    long long pairs = 0;
    for (int i = 0; i < n; i++)
        pairs += c.end() - upper_bound(c.begin() + i + 1, c.end(), -c[i]);
    printf("%lld\n", pairs);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lower-bound', 'sort'],
    },
  ],
  tests: [
    { input: '5\n4 8 2 6 2\n4 5 4 1 3', output: '7', source: 'sample', note: sample(1) },
    { input: '4\n1 3 2 4\n1 3 2 4', output: '0', source: 'sample', note: sample(2) },
    { input: '2\n2 2\n1 1', output: '1', source: 'own', note: L('One pair.', 'একটি জোড়া।') },
  ],
  pitfalls: [L('Pairing i with itself.', 'i-কে নিজের সঙ্গে জোড়া।'), L('int answer: up to 2·10¹⁰.', 'int উত্তর: ২·১০¹⁰ পর্যন্ত।')],
  related: [{ id: '1538C', name: 'Number of Pairs', why: L('Pair counting on a sorted array.', 'সাজানো অ্যারেতে জোড়া গোনা।') }],
  toolkit: ['sort', 'long-long'],
};

export const p630A: ProblemEntry = {
  id: '630A',
  contestId: 630,
  index: 'A',
  name: 'Again Twenty Five!',
  rating: 800,
  tags: ['number-theory'],
  why: L('A huge power whose last digits never change: look for the pattern before computing.', 'একটি বিশাল ঘাত যার শেষ অঙ্কগুলো কখনো বদলায় না: হিসাবের আগে প্যাটার্ন খুঁজুন।'),
  statement: L('Print the last two digits of 5ⁿ.', '৫ⁿ-এর শেষ দুটি অঙ্ক প্রিন্ট করুন।'),
  input: L('One integer n (2 ≤ n ≤ 2·10¹⁸).', 'একটি পূর্ণসংখ্যা n (২ ≤ n ≤ ২·১০¹⁸)।'),
  output: L('The last two digits.', 'শেষ দুটি অঙ্ক।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≥ 2', 'n ≥ ২')] },
  samples: [{ input: '2', output: '25', explain: L('5² = 25.', '৫² = ২৫।') }],
  observation: L('25 · 5 = 125, which again ends in 25. So every 5ⁿ with n ≥ 2 ends in 25.', '২৫ · ৫ = ১২৫, যা আবার ২৫-এ শেষ। তাই n ≥ ২ হলে প্রতিটি ৫ⁿ ২৫-এ শেষ হয়।'),
  approach: [L('Print 25.', '২৫ প্রিন্ট করুন।')],
  walkthrough: { input: '3', steps: [{ state: '125', text: L('Ends in 25.', '২৫-এ শেষ।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Constant.', 'স্থির।') },
  solutions: [
    {
      id: 'constant',
      kind: 'optimal',
      title: L('Always 25', 'সবসময় ২৫'),
      idea: L('The last two digits are fixed from n = 2 on.', 'n = ২ থেকে শেষ দুটি অঙ্ক নির্দিষ্ট।'),
      explain: [L('Spotting a cycle (here of length 1) in modular arithmetic is often the whole trick when n is astronomically large.', 'n অকল্পনীয়ভাবে বড় হলে মডুলার হিসাবে একটি চক্র (এখানে দৈর্ঘ্য ১) খুঁজে পাওয়াই প্রায়ই পুরো কৌশল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    cout << 25 << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'power',
      kind: 'method',
      title: L('Fast modular exponentiation', 'দ্রুত মডুলার পাওয়ার'),
      idea: L('Compute 5ⁿ mod 100 by squaring.', 'বর্গ করে ৫ⁿ mod ১০০ হিসাব।'),
      explain: [L('The general tool works even if you do not spot the pattern: O(log n) multiplications. Print with two digits (%02lld) in case the result were below 10.', 'প্যাটার্ন না দেখলেও সাধারণ হাতিয়ারটি কাজ করে: O(log n)টি গুণ। ফল ১০-এর নিচে হলে দুই অঙ্কে (%02lld) প্রিন্ট করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    long long result = 1, base = 5;
    for (long long e = n; e > 0; e >>= 1) {
        if (e & 1) result = result * base % 100;
        base = base * base % 100;
    }
    printf("%02lld\n", result);
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow'],
    },
  ],
  tests: [
    { input: '2', output: '25', source: 'sample', note: sample(1) },
    { input: '2000000000000000000', output: '25', source: 'own', note: L('The largest n.', 'সবচেয়ে বড় n।') },
  ],
  pitfalls: [L('Trying to compute 5ⁿ directly.', 'সরাসরি ৫ⁿ হিসাবের চেষ্টা।')],
  related: [{ id: '742A', name: 'Arpa’s hard exam', why: L('Another last-digit cycle.', 'আরেকটি শেষ-অঙ্কের চক্র।') }],
  toolkit: ['mod-pow'],
};

export const p742A: ProblemEntry = {
  id: '742A',
  contestId: 742,
  index: 'A',
  name: 'Arpa’s hard exam and Mehrdad’s naive cheat',
  rating: 1000,
  tags: ['implementation', 'math', 'number-theory'],
  why: L('Last digits of powers repeat with period 4, with n = 0 as the trap.', 'ঘাতের শেষ অঙ্ক ৪ পর্যায়ে পুনরাবৃত্ত হয়, n = ০ হলো ফাঁদ।'),
  statement: L('Print the last digit of 1378ⁿ.', '১৩৭৮ⁿ-এর শেষ অঙ্ক প্রিন্ট করুন।'),
  input: L('One integer n (0 ≤ n ≤ 10⁹).', 'একটি পূর্ণসংখ্যা n (০ ≤ n ≤ ১০⁹)।'),
  output: L('The last digit.', 'শেষ অঙ্ক।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n can be 0', 'n ০ হতে পারে')] },
  samples: [
    { input: '1', output: '8', explain: L('1378 ends in 8.', '১৩৭৮-এর শেষে ৮।') },
    { input: '2', output: '4', explain: L('8 · 8 = 64.', '৮ · ৮ = ৬৪।') },
  ],
  observation: L('Only the last digit 8 matters. Powers of 8 end in 8, 4, 2, 6, 8, … with period 4, and 8⁰ = 1.', 'শুধু শেষ অঙ্ক ৮ গুরুত্বপূর্ণ। ৮-এর ঘাত ৮, ৪, ২, ৬, ৮, … দিয়ে শেষ হয়, পর্যায় ৪, আর ৮⁰ = ১।'),
  approach: [L('If n = 0 print 1, else print {6, 8, 4, 2}[n mod 4].', 'n = ০ হলে ১ প্রিন্ট, না হলে {৬, ৮, ৪, ২}[n mod ৪]।')],
  walkthrough: { input: '5', steps: [{ state: '5 mod 4 = 1', text: L('8.', '৮।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A lookup.', 'একটি খোঁজ।') },
  solutions: [
    {
      id: 'cycle',
      kind: 'optimal',
      title: L('Period-4 table', 'পর্যায়-৪ টেবিল'),
      idea: L('{6, 8, 4, 2}[n % 4], with n = 0 giving 1.', '{৬, ৮, ৪, ২}[n % ৪], n = ০-এ ১।'),
      explain: [L('The table is indexed by n mod 4 so that n = 4 maps to 6 (8⁴ ends in 6). n = 0 must be handled separately because 8⁰ = 1 is not part of the cycle.', 'টেবিলটি n mod ৪ দিয়ে ইনডেক্স করা যাতে n = ৪ যায় ৬-এ (৮⁴-এর শেষে ৬)। n = ০ আলাদাভাবে সামলাতে হবে কারণ ৮⁰ = ১ চক্রের অংশ নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int last[4] = {6, 8, 4, 2};
    cout << (n == 0 ? 1 : last[n % 4]) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
    {
      id: 'power',
      kind: 'method',
      title: L('Fast power modulo 10', '১০ মডুলোতে দ্রুত পাওয়ার'),
      idea: L('Compute 8ⁿ mod 10 by squaring.', 'বর্গ করে ৮ⁿ mod ১০ হিসাব।'),
      explain: [L('It handles n = 0 automatically (the loop never runs, result stays 1), so it avoids the trap without special-casing.', 'এটি n = ০ আপনাআপনি সামলায় (লুপ চলে না, ফল ১ থাকে), তাই বিশেষ কেস ছাড়াই ফাঁদ এড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    long long r = 1, b = 8;
    for (; n > 0; n >>= 1) {
        if (n & 1) r = r * b % 10;
        b = b * b % 10;
    }
    cout << r << "\n";
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow'],
    },
  ],
  tests: [
    { input: '1', output: '8', source: 'sample', note: sample(1) },
    { input: '2', output: '4', source: 'sample', note: sample(2) },
    { input: '0', output: '1', source: 'own', note: L('Anything to the power 0 is 1.', 'যেকোনো কিছুর ঘাত ০ হলে ১।') },
    { input: '4', output: '6', source: 'own', note: L('The cycle position 0.', 'চক্রের অবস্থান ০।') },
  ],
  pitfalls: [L('Printing 6 for n = 0.', 'n = ০-এ ৬ প্রিন্ট।')],
  related: [{ id: '630A', name: 'Again Twenty Five!', why: L('Repeating last digits.', 'পুনরাবৃত্ত শেষ অঙ্ক।') }],
  toolkit: ['modulo', 'mod-pow'],
};
