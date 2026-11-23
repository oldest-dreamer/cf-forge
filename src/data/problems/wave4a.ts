import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p405A: ProblemEntry = {
  id: '405A',
  contestId: 405,
  index: 'A',
  name: 'Gravity Flip',
  rating: 900,
  tags: ['greedy', 'implementation', 'sortings'],
  why: L('A story that turns out to be “sort the array”.', 'এমন একটি গল্প যা শেষে “অ্যারে সর্ট করো”।'),
  statement: L(
    'n columns of toy cubes stand in a box; column i has aᵢ cubes. When gravity switches to pull right, cubes slide so the column heights end up rearranged. Print the new heights from left to right.',
    'একটি বাক্সে খেলনা কিউবের n-টি কলাম; কলাম i-তে aᵢটি কিউব। মাধ্যাকর্ষণ ডানে টানতে শুরু করলে কিউবগুলো সরে গিয়ে কলামের উচ্চতা নতুনভাবে সাজে। বাম থেকে ডানে নতুন উচ্চতাগুলো প্রিন্ট করুন।',
  ),
  input: L('n, then a₁ … aₙ.', 'n, তারপর a₁ … aₙ।'),
  output: L('The heights after the switch.', 'পরিবর্তনের পর উচ্চতা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100, 1 ≤ aᵢ ≤ 100', '১ ≤ n ≤ ১০০, ১ ≤ aᵢ ≤ ১০০')] },
  samples: [
    { input: '4\n3 2 1 2', output: '1 2 2 3', explain: L('Cubes pile up on the right.', 'কিউবগুলো ডানে জমে।') },
    { input: '3\n2 3 8', output: '2 3 8', explain: L('Already sorted.', 'আগেই সাজানো।') },
  ],
  observation: L('Each row of cubes slides to the right end, so row h ends up filling the rightmost (number of columns at least h) positions. The result is the heights in non-decreasing order.', 'কিউবের প্রতিটি সারি ডান প্রান্তে সরে, তাই সারি h ডানদিকের (অন্তত h উচ্চতার কলামের সংখ্যা)-টি অবস্থান ভরে। ফল হলো ছোট থেকে বড় ক্রমে উচ্চতাগুলো।'),
  approach: [L('Sort ascending and print.', 'ছোট থেকে বড় সর্ট করে প্রিন্ট করুন।')],
  walkthrough: { input: '3 2 1 2', steps: [{ state: 'sorted 1 2 2 3', text: L('Print it.', 'প্রিন্ট করুন।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'sort',
      kind: 'optimal',
      title: L('std::sort', 'std::sort'),
      idea: L('Gravity to the right sorts the columns.', 'ডানে মাধ্যাকর্ষণ কলামগুলো সাজিয়ে দেয়।'),
      explain: [L('Recognising a familiar operation behind a story is the whole problem. Simulating cube by cube would also work but is far longer.', 'গল্পের পেছনে চেনা অপারেশন চেনাই পুরো প্রবলেম। কিউব ধরে ধরে সিমুলেশনও চলত, কিন্তু অনেক লম্বা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    for (int x : a) cout << x << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort'],
    },
    {
      id: 'rows',
      kind: 'method',
      title: L('Simulate row by row', 'সারি ধরে সিমুলেশন'),
      idea: L('For each height level h, count columns reaching h and stack that many cubes at the right end.', 'প্রতিটি উচ্চতা স্তর h-এর জন্য h-এ পৌঁছানো কলাম গুনে ডান প্রান্তে ততগুলো কিউব রাখুন।'),
      explain: [L('This follows the physics: row h has c(h) cubes, and they slide to the last c(h) columns. Building the new heights this way shows why the result is sorted.', 'এটি পদার্থবিদ্যা মানে: সারি h-এ c(h)-টি কিউব, আর সেগুলো শেষ c(h)-টি কলামে সরে। এভাবে নতুন উচ্চতা বানালে বোঝা যায় কেন ফল সাজানো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n), b(n, 0);
    for (auto& x : a) cin >> x;
    for (int h = 1; h <= 100; h++) {
        int c = 0;
        for (int x : a) if (x >= h) c++;
        for (int i = n - c; i < n; i++) b[i]++;   // row h fills the last c columns
    }
    for (int x : b) cout << x << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n · H)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '4\n3 2 1 2', output: '1 2 2 3', source: 'sample', note: sample(1) },
    { input: '3\n2 3 8', output: '2 3 8', source: 'sample', note: sample(2) },
    { input: '1\n5', output: '5', source: 'own', note: L('One column.', 'একটি কলাম।') },
  ],
  pitfalls: [L('Sorting in decreasing order (that would be gravity to the left).', 'বড় থেকে ছোট সর্ট করা (সেটি বামে মাধ্যাকর্ষণ হতো)।')],
  related: [{ id: '339A', name: 'Helpful Maths', why: L('Another “just sort it”.', 'আরেকটি “শুধু সর্ট করো”।') }],
  toolkit: ['sort'],
};

export const p58A: ProblemEntry = {
  id: '58A',
  contestId: 58,
  index: 'A',
  name: 'Chat room',
  rating: 1000,
  tags: ['greedy', 'strings'],
  featuredFor: ['strings'],
  why: L('The greedy subsequence check, used in countless string problems.', 'গ্রিডি সাবসিকোয়েন্স যাচাই, অসংখ্য স্ট্রিং প্রবলেমে ব্যবহৃত।'),
  statement: L(
    'Vasya managed to say hello if some letters can be deleted from the typed word s to get “hello”. Print YES if so, otherwise NO.',
    'টাইপ করা শব্দ s থেকে কিছু অক্ষর মুছে “hello” পাওয়া গেলে ভাস্যা hello বলতে পেরেছে। পারলে YES, না হলে NO প্রিন্ট করুন।',
  ),
  input: L('One word of lowercase letters, length ≤ 100.', 'ছোট হাতের অক্ষরের একটি শব্দ, দৈর্ঘ্য ≤ ১০০।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Length ≤ 100', 'দৈর্ঘ্য ≤ ১০০')] },
  samples: [
    { input: 'ahhellllloou', output: 'YES', explain: L('h, e, l, l, o appear in order.', 'h, e, l, l, o ক্রমে আসে।') },
    { input: 'hlelo', output: 'NO', explain: L('After h, l, the e comes but then only one l remains before o.', 'h, l-এর পর e আসে, কিন্তু তারপর o-এর আগে মাত্র একটি l থাকে।') },
  ],
  observation: L('Match the letters of “hello” from left to right, always using the earliest possible character. Taking the earliest match never hurts: it leaves the most characters for the rest.', '“hello”-এর অক্ষরগুলো বাম থেকে ডানে মেলান, সবসময় সবচেয়ে আগের সম্ভাব্য অক্ষর নিয়ে। সবচেয়ে আগের মিল নেওয়ায় কখনো ক্ষতি নেই: বাকিদের জন্য সবচেয়ে বেশি অক্ষর থাকে।'),
  approach: [L('Pointer j into “hello”; advance it whenever s[i] equals target[j].', '“hello”-তে একটি পয়েন্টার j; s[i] যখন target[j]-এর সমান তখন এগিয়ে দিন।')],
  walkthrough: { input: 'hlelo', steps: [{ state: 'h ✓, l ✗, e ✓, l ✓, o ✗', text: L('Matched “hel” only: NO.', 'শুধু “hel” মিলেছে: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'pointer',
      kind: 'optimal',
      title: L('Greedy subsequence pointer', 'গ্রিডি সাবসিকোয়েন্স পয়েন্টার'),
      idea: L('j counts how much of “hello” has been matched.', 'j গোনে “hello”-এর কতটা মিলেছে।'),
      explain: [L('This “is t a subsequence of s?” loop is worth memorising; it works for any target string in O(|s|).', 'এই “t কি s-এর সাবসিকোয়েন্স?” লুপটি মুখস্থ রাখার মতো; এটি যেকোনো লক্ষ্য স্ট্রিংয়ে O(|s|)-এ কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    const string target = "hello";
    size_t j = 0;
    for (char c : s)
        if (j < target.size() && c == target[j]) j++;
    cout << (j == target.size() ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'find',
      kind: 'stl',
      title: L('Chain of find calls', 'find কলের শৃঙ্খল'),
      idea: L('Find each letter of “hello” starting just after the previous match.', 'আগের মিলের ঠিক পর থেকে “hello”-এর প্রতিটি অক্ষর খুঁজুন।'),
      explain: [L('s.find(c, pos) returns the first c at or after pos, which is exactly the earliest possible match. If any search fails (npos), the answer is NO.', 's.find(c, pos) pos বা তার পরের প্রথম c দেয়, যা ঠিক সবচেয়ে আগের সম্ভাব্য মিল। কোনো খোঁজ ব্যর্থ হলে (npos) উত্তর NO।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    size_t pos = 0;
    bool ok = true;
    for (char c : string("hello")) {
        size_t at = s.find(c, pos);
        if (at == string::npos) { ok = false; break; }
        pos = at + 1;
    }
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['count-find'],
    },
  ],
  tests: [
    { input: 'ahhellllloou', output: 'YES', source: 'sample', note: sample(1) },
    { input: 'hlelo', output: 'NO', source: 'sample', note: sample(2) },
    { input: 'hello', output: 'YES', source: 'own', note: L('Exactly hello.', 'ঠিক hello।') },
    { input: 'helo', output: 'NO', source: 'own', note: L('Only one l.', 'মাত্র একটি l।') },
  ],
  pitfalls: [L('Checking only that the letters exist, ignoring order and the double l.', 'শুধু অক্ষরগুলো আছে কি না দেখা, ক্রম আর দুটি l উপেক্ষা করে।')],
  related: [{ id: '118A', name: 'String Task', why: L('Another character scan.', 'আরেকটি অক্ষর স্ক্যান।') }],
  toolkit: ['string-basics'],
};

export const p230A: ProblemEntry = {
  id: '230A',
  contestId: 230,
  index: 'A',
  name: 'Dragons',
  rating: 1000,
  tags: ['greedy', 'sortings'],
  why: L('Order matters: fight the weakest first, and sorting tells you the order.', 'ক্রম গুরুত্বপূর্ণ: আগে সবচেয়ে দুর্বলের সঙ্গে লড়ো, আর সর্টিং সেই ক্রম বলে দেয়।'),
  statement: L(
    'Kirito has strength s and must defeat n dragons in any order. Dragon i has strength xᵢ; Kirito wins only if his strength is strictly greater, and then gains yᵢ strength. Can he defeat all dragons?',
    'কিরিটোর শক্তি s আর তাকে যেকোনো ক্রমে n-টি ড্রাগন হারাতে হবে। ড্রাগন i-এর শক্তি xᵢ; কিরিটো জেতে শুধু তার শক্তি কঠোরভাবে বেশি হলে, আর তখন yᵢ শক্তি পায়। সে কি সব ড্রাগন হারাতে পারবে?',
  ),
  input: L('s and n, then n lines xᵢ yᵢ.', 's আর n, তারপর n-টি লাইন xᵢ yᵢ।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ s ≤ 10⁴, 1 ≤ n ≤ 1000', '১ ≤ s ≤ ১০⁴, ১ ≤ n ≤ ১০০০')] },
  samples: [
    { input: '2 2\n1 99\n100 0', output: 'YES', explain: L('Beat the first, grow to 101, beat the second.', 'প্রথমটিকে হারিয়ে ১০১ হয়, তারপর দ্বিতীয়টি।') },
    { input: '10 1\n100 100', output: 'NO', explain: L('Too strong.', 'খুব শক্তিশালী।') },
  ],
  observation: L('Bonuses are never negative, so beating a dragon never hurts. Fighting dragons in increasing order of strength means you face each one with the largest strength you could have at that point.', 'বোনাস কখনো ঋণাত্মক নয়, তাই ড্রাগন হারানোয় কখনো ক্ষতি নেই। শক্তির বাড়তি ক্রমে লড়লে প্রতিটির মুখোমুখি হন সেই মুহূর্তে সম্ভাব্য সবচেয়ে বেশি শক্তি নিয়ে।'),
  approach: [L('Sort by xᵢ; walk through, failing if s ≤ xᵢ, else s += yᵢ.', 'xᵢ অনুযায়ী সর্ট করুন; ক্রমে চলুন, s ≤ xᵢ হলে ব্যর্থ, না হলে s += yᵢ।')],
  walkthrough: { input: '2 2\n1 99\n100 0', steps: [{ state: 's = 2 > 1 → 101 > 100', text: L('YES.', 'YES।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'sort',
      kind: 'optimal',
      title: L('Sort by dragon strength', 'ড্রাগনের শক্তি অনুযায়ী সর্ট'),
      idea: L('Weakest dragon first.', 'সবচেয়ে দুর্বল ড্রাগন আগে।'),
      explain: [L('If any order works, the sorted order works: whenever the current weakest unbeaten dragon cannot be beaten, no other remaining dragon can be either.', 'যেকোনো ক্রম কাজ করলে সাজানো ক্রমও কাজ করে: বর্তমান সবচেয়ে দুর্বল অপরাজিত ড্রাগনকে হারানো না গেলে বাকি কোনো ড্রাগনকেও হারানো যায় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long s;
    int n;
    cin >> s >> n;
    vector<pair<int, int>> d(n);
    for (auto& [x, y] : d) cin >> x >> y;
    sort(d.begin(), d.end());
    for (auto [x, y] : d) {
        if (s <= x) { cout << "NO\n"; return 0; }
        s += y;
    }
    cout << "YES\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'pair', 'structured-bindings'],
    },
    {
      id: 'rounds',
      kind: 'method',
      title: L('Repeat rounds until nothing changes', 'কিছু না বদলানো পর্যন্ত রাউন্ড চালানো'),
      idea: L('In each round, beat every beatable dragon; stop when a round beats none.', 'প্রতিটি রাউন্ডে হারানো যায় এমন প্রতিটি ড্রাগন হারান; কোনো রাউন্ডে একটিও না হারলে থামুন।'),
      explain: [L('No sorting needed: just keep sweeping. Each productive round beats at least one dragon, so there are at most n rounds and O(n²) work, fine for n ≤ 1000.', 'সর্টিং লাগে না: শুধু বারবার ঘুরুন। প্রতিটি ফলপ্রসূ রাউন্ডে অন্তত একটি ড্রাগন হারে, তাই সর্বোচ্চ n রাউন্ড আর O(n²) কাজ, n ≤ ১০০০-এর জন্য ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long s;
    int n;
    cin >> s >> n;
    vector<int> x(n), y(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i];
    vector<bool> dead(n, false);
    int left = n;
    bool progress = true;
    while (left > 0 && progress) {
        progress = false;
        for (int i = 0; i < n; i++)
            if (!dead[i] && s > x[i]) { dead[i] = true; s += y[i]; left--; progress = true; }
    }
    cout << (left == 0 ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n'],
    },
  ],
  tests: [
    { input: '2 2\n1 99\n100 0', output: 'YES', source: 'sample', note: sample(1) },
    { input: '10 1\n100 100', output: 'NO', source: 'sample', note: sample(2) },
    { input: '5 1\n5 10', output: 'NO', source: 'own', note: L('Equal strength loses.', 'সমান শক্তিতে হার।') },
  ],
  pitfalls: [L('Using ≥: equal strength is a loss.', '≥ ব্যবহার: সমান শক্তি মানে হার।'), L('Sorting by bonus instead of strength.', 'শক্তির বদলে বোনাস অনুযায়ী সর্ট।')],
  related: [{ id: '160A', name: 'Twins', why: L('Sort, then greedy.', 'সর্ট, তারপর গ্রিডি।') }],
  toolkit: ['sort', 'pair'],
};

export const p456A: ProblemEntry = {
  id: '456A',
  contestId: 456,
  index: 'A',
  name: 'Laptops',
  rating: 1100,
  tags: ['brute-force', 'implementation', 'sortings'],
  why: L('Sort by one key and look for a descent in the other: an inversion test.', 'এক কী অনুযায়ী সর্ট করে অন্যটিতে কমা খোঁজা: ইনভার্সন পরীক্ষা।'),
  statement: L(
    'n laptops have distinct prices aᵢ and distinct qualities bᵢ. Alex claims some laptop is cheaper than another yet has higher quality. Print “Happy Alex” if he is right and “Poor Alex” otherwise.',
    'n-টি ল্যাপটপের দাম aᵢ আলাদা আর মান bᵢ আলাদা। অ্যালেক্স দাবি করে কোনো ল্যাপটপ অন্যটির চেয়ে সস্তা অথচ মান বেশি। সে ঠিক হলে “Happy Alex”, না হলে “Poor Alex” প্রিন্ট করুন।',
  ),
  input: L('n, then n lines aᵢ bᵢ.', 'n, তারপর n-টি লাইন aᵢ bᵢ।'),
  output: L('Happy Alex or Poor Alex.', 'Happy Alex অথবা Poor Alex।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, values ≤ n', '১ ≤ n ≤ ১০⁵, মান ≤ n')] },
  samples: [{ input: '2\n1 2\n2 1', output: 'Happy Alex', explain: L('Price 1 has quality 2 > 1.', 'দাম ১-এর মান ২ > ১।') }],
  observation: L('Sort by price. Alex is wrong only if qualities are increasing too; any adjacent pair where quality drops proves him right.', 'দাম অনুযায়ী সর্ট করুন। মানও বাড়তে থাকলে তবেই অ্যালেক্স ভুল; যেকোনো পাশাপাশি জোড়ায় মান কমলে সে ঠিক।'),
  approach: [L('Sort pairs by price and check adjacent qualities.', 'দাম অনুযায়ী জোড়া সর্ট করে পাশাপাশি মান দেখুন।')],
  walkthrough: { input: '(1, 2), (2, 1)', steps: [{ state: 'qualities 2, 1', text: L('A drop: Happy Alex.', 'কমেছে: Happy Alex।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'sort',
      kind: 'method',
      title: L('Sort by price, look for a drop', 'দাম অনুযায়ী সর্ট, কমা খোঁজা'),
      idea: L('Any inversion has an adjacent inversion.', 'যেকোনো ইনভার্সনে একটি পাশাপাশি ইনভার্সন থাকে।'),
      explain: [L('If qualities, read in price order, were non-decreasing at every step, they would be increasing overall and no pair could break the rule. So checking neighbours is enough.', 'দামের ক্রমে মানগুলো প্রতিটি ধাপে না কমলে সামগ্রিকভাবে বাড়তে থাকত আর কোনো জোড়া নিয়ম ভাঙতে পারত না। তাই পাশাপাশি দেখাই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<pair<int, int>> l(n);
    for (auto& [a, b] : l) cin >> a >> b;
    sort(l.begin(), l.end());
    bool happy = false;
    for (int i = 1; i < n; i++) if (l[i].second < l[i - 1].second) happy = true;
    cout << (happy ? "Happy Alex" : "Poor Alex") << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'pair'],
    },
    {
      id: 'equal',
      kind: 'optimal',
      title: L('Price must equal quality', 'দাম আর মান সমান হতে হবে'),
      idea: L('Both are permutations of 1..n, so Alex is wrong exactly when aᵢ = bᵢ for every laptop.', 'দুটিই ১..n-এর পারমুটেশন, তাই প্রতিটি ল্যাপটপে aᵢ = bᵢ হলে তবেই অ্যালেক্স ভুল।'),
      explain: [L('With distinct values from 1 to n, “sorted by price means sorted by quality” forces the k-th cheapest to have the k-th lowest quality, i.e. price k with quality k. So one aᵢ ≠ bᵢ is enough to make Alex happy, with no sorting at all.', '১ থেকে n পর্যন্ত আলাদা মানে “দামে সাজানো মানে মানেও সাজানো” হলে k-তম সস্তাটির মান k-তম নিচু, অর্থাৎ দাম k-এর মান k। তাই একটি aᵢ ≠ bᵢ-ই অ্যালেক্সকে খুশি করতে যথেষ্ট, কোনো সর্ট ছাড়াই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    bool happy = false;
    for (int i = 0; i < n; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        if (a != b) happy = true;
    }
    puts(happy ? "Happy Alex" : "Poor Alex");
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['c-io'],
    },
  ],
  tests: [
    { input: '2\n1 2\n2 1', output: 'Happy Alex', source: 'sample', note: sample(1) },
    { input: '3\n1 1\n2 2\n3 3', output: 'Poor Alex', source: 'own', note: L('Perfectly aligned.', 'নিখুঁতভাবে মেলানো।') },
    { input: '1\n1 1', output: 'Poor Alex', source: 'own', note: L('One laptop.', 'একটি ল্যাপটপ।') },
  ],
  pitfalls: [L('Checking all pairs: 10¹⁰ comparisons.', 'সব জোড়া দেখা: ১০¹⁰টি তুলনা।')],
  related: [{ id: '230A', name: 'Dragons', why: L('Sort pairs by the first key.', 'প্রথম কী অনুযায়ী জোড়া সর্ট।') }],
  toolkit: ['sort', 'pair'],
};

export const p492B: ProblemEntry = {
  id: '492B',
  contestId: 492,
  index: 'B',
  name: 'Vanya and Lanterns',
  rating: 1200,
  tags: ['binary-search', 'implementation', 'math', 'sortings'],
  why: L('Gaps after sorting decide the answer, with special care at the two ends.', 'সর্টের পর ফাঁকগুলোই উত্তর ঠিক করে, দুই প্রান্তে বিশেষ যত্নসহ।'),
  statement: L(
    'A street runs from 0 to l and has n lanterns at positions aᵢ. Every lantern lights everything within distance d. Find the minimum d that lights the whole street.',
    'একটি রাস্তা ০ থেকে l পর্যন্ত, আর aᵢ অবস্থানে n-টি লণ্ঠন। প্রতিটি লণ্ঠন d দূরত্বের মধ্যে সব আলোকিত করে। পুরো রাস্তা আলোকিত করে এমন সর্বনিম্ন d বের করুন।',
  ),
  input: L('n and l, then the positions.', 'n আর l, তারপর অবস্থানগুলো।'),
  output: L('The minimum d (absolute or relative error ≤ 10⁻⁹).', 'সর্বনিম্ন d (পরম বা আপেক্ষিক ত্রুটি ≤ ১০⁻⁹)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000, 1 ≤ l ≤ 10⁹', '১ ≤ n ≤ ১০০০, ১ ≤ l ≤ ১০⁹')] },
  samples: [
    { input: '7 15\n15 5 3 7 9 14 0', output: '2.5000000000', explain: L('The gap 9..14 needs 2.5 from each side.', '৯..১৪ ফাঁকে প্রতিটি পাশ থেকে ২.৫ লাগে।') },
    { input: '2 5\n2 5', output: '2.0000000000', explain: L('The start 0..2 needs 2.', 'শুরুর ০..২-এ ২ লাগে।') },
  ],
  observation: L('After sorting, a gap between two lanterns needs d ≥ gap / 2, while the two ends need d ≥ a₁ and d ≥ l − aₙ, because only one lantern covers them.', 'সর্টের পর দুটি লণ্ঠনের মাঝের ফাঁকে d ≥ gap / ২ লাগে, আর দুই প্রান্তে d ≥ a₁ ও d ≥ l − aₙ, কারণ মাত্র একটি লণ্ঠন সেগুলো ঢাকে।'),
  approach: [L('Answer max(a₁, l − aₙ, max gap / 2).', 'উত্তর max(a₁, l − aₙ, সর্বোচ্চ ফাঁক / ২)।')],
  walkthrough: { input: '0 3 5 7 9 14 15', steps: [{ state: 'ends 0, 0; max gap 5', text: L('5 / 2 = 2.5.', '৫ / ২ = ২.৫।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'gaps',
      kind: 'optimal',
      title: L('Largest gap and the two ends', 'সবচেয়ে বড় ফাঁক আর দুই প্রান্ত'),
      idea: L('Work in doubled units to stay in integers: 2d = max(2a₁, 2(l − aₙ), max gap).', 'পূর্ণসংখ্যায় থাকতে দ্বিগুণ এককে কাজ করুন: ২d = max(২a₁, ২(l − aₙ), সর্বোচ্চ ফাঁক)।'),
      explain: [L('Doubling avoids any floating-point doubt until the final print, where dividing by 2 gives an exact .0 or .5.', 'দ্বিগুণ করলে শেষ প্রিন্টের আগে পর্যন্ত কোনো ভাসমান-বিন্দুর সন্দেহ থাকে না, শেষে ২ দিয়ে ভাগ করলে নিখুঁত .০ বা .৫ আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long l;
    cin >> n >> l;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    long long twice = max(2 * a[0], 2 * (l - a[n - 1]));
    for (int i = 1; i < n; i++) twice = max(twice, a[i] - a[i - 1]);
    printf("%.10f\n", twice / 2.0);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'setprecision'],
    },
    {
      id: 'bsearch',
      kind: 'method',
      title: L('Binary search on d', 'd-এর ওপর বাইনারি সার্চ'),
      idea: L('covers(d): walking left to right, each lantern must reach the end of the lit part.', 'covers(d): বাম থেকে ডানে চলতে প্রতিটি লণ্ঠনকে আলোকিত অংশের শেষ পর্যন্ত পৌঁছাতে হবে।'),
      explain: [L('A general technique when no formula is obvious: guess d, check coverage, and bisect 100 times on doubles. It reaches the same answer as the gap formula to well within 10⁻⁹.', 'কোনো সূত্র স্পষ্ট না হলে একটি সাধারণ কৌশল: d অনুমান করুন, আবরণ যাচাই করুন, আর double-এ ১০০ বার দ্বিখণ্ডন করুন। এটি ফাঁকের সূত্রের একই উত্তরে ১০⁻⁹-এর অনেক ভেতরে পৌঁছায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    double l;
    cin >> n >> l;
    vector<double> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    auto covers = [&](double d) {
        double lit = 0;
        for (double x : a) {
            if (x - d > lit + 1e-12) return false;
            lit = max(lit, x + d);
        }
        return lit >= l - 1e-12;
    };
    double lo = 0, hi = l;
    for (int it = 0; it < 100; it++) {
        double mid = (lo + hi) / 2;
        (covers(mid) ? hi : lo) = mid;
    }
    printf("%.10f\n", hi);
    return 0;
}
`,
      time: 'O(n log n + 100n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'setprecision'],
    },
  ],
  tests: [
    { input: '7 15\n15 5 3 7 9 14 0', output: '2.5000000000', source: 'sample', note: sample(1) },
    { input: '2 5\n2 5', output: '2.0000000000', source: 'sample', note: sample(2) },
    { input: '1 1000000000\n0', output: '1000000000.0000000000', source: 'own', note: L('One lantern at the start.', 'শুরুতে একটি লণ্ঠন।') },
  ],
  pitfalls: [L('Halving the end gaps too.', 'প্রান্তের ফাঁকও অর্ধেক করা।'), L('Forgetting to sort.', 'সর্ট করতে ভুলে যাওয়া।')],
  related: [{ id: '1360B', name: 'Honest Coach', why: L('Adjacent gaps after sorting.', 'সর্টের পর পাশাপাশি ফাঁক।') }],
  toolkit: ['sort', 'setprecision'],
};

export const p451B: ProblemEntry = {
  id: '451B',
  contestId: 451,
  index: 'B',
  name: 'Sort the Array',
  rating: 1300,
  tags: ['implementation', 'sortings'],
  featuredFor: ['sortings'],
  why: L('Compare with the sorted copy to find the only segment that could be reversed.', 'সাজানো কপির সঙ্গে মিলিয়ে একমাত্র উল্টানো যায় এমন অংশ খোঁজা।'),
  statement: L(
    'An array of n distinct integers is given. Can it be sorted in increasing order by reversing exactly one segment a[l..r]? Print “yes” and l r (any valid pair) or “no”.',
    'n-টি আলাদা পূর্ণসংখ্যার অ্যারে দেওয়া আছে। ঠিক একটি অংশ a[l..r] উল্টে কি একে ছোট থেকে বড় ক্রমে সাজানো যায়? “yes” আর l r (যেকোনো বৈধ জোড়া) অথবা “no” প্রিন্ট করুন।',
  ),
  input: L('n, then the array.', 'n, তারপর অ্যারে।'),
  output: L('“yes” and l r, or “no”.', '“yes” আর l r, অথবা “no”।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵', '১ ≤ n ≤ ১০⁵')] },
  samples: [
    { input: '3\n3 2 1', output: 'yes\n1 3', explain: L('Reverse everything.', 'সবটা উল্টান।') },
    { input: '4\n2 1 3 4', output: 'yes\n1 2', explain: L('Swap the first two.', 'প্রথম দুটি অদলবদল।') },
    { input: '4\n3 1 2 4', output: 'no', explain: L('No single reversal works.', 'একটি উল্টানোয় হয় না।') },
    { input: '2\n1 2', output: 'yes\n1 1', explain: L('Already sorted: reverse a length-1 segment.', 'আগেই সাজানো: ১ দৈর্ঘ্যের অংশ উল্টান।') },
  ],
  observation: L('Compare with the sorted array. Positions before the first difference and after the last difference must stay; the only candidate segment is from the first to the last difference.', 'সাজানো অ্যারের সঙ্গে তুলনা করুন। প্রথম পার্থক্যের আগের আর শেষ পার্থক্যের পরের অবস্থানগুলো একই থাকতে হবে; একমাত্র সম্ভাব্য অংশ প্রথম থেকে শেষ পার্থক্য পর্যন্ত।'),
  approach: [L('Find l and r, reverse a[l..r], and check whether the array is now sorted.', 'l আর r খুঁজে a[l..r] উল্টান, তারপর অ্যারে এখন সাজানো কি না দেখুন।')],
  walkthrough: { input: '3 1 2 4', steps: [{ state: 'sorted 1 2 3 4; differ at 1..3', text: L('Reversing 3 1 2 gives 2 1 3: not sorted. no.', '৩ ১ ২ উল্টালে ২ ১ ৩: সাজানো নয়। no।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One sort and two scans.', 'একটি সর্ট আর দুটি স্ক্যান।') },
  solutions: [
    {
      id: 'compare',
      kind: 'optimal',
      title: L('Compare with the sorted copy', 'সাজানো কপির সঙ্গে তুলনা'),
      idea: L('The segment must be exactly [first mismatch, last mismatch].', 'অংশটি ঠিক [প্রথম অমিল, শেষ অমিল] হতে হবে।'),
      explain: [L('If the array is already sorted there is no mismatch: print 1 1. Otherwise reverse the forced segment and compare once more; std::reverse and == on vectors make this three lines.', 'অ্যারে আগেই সাজানো হলে কোনো অমিল নেই: ১ ১ প্রিন্ট করুন। না হলে বাধ্যতামূলক অংশ উল্টে আরেকবার তুলনা করুন; std::reverse আর ভেক্টরে == দিয়ে এটি তিন লাইন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    vector<int> s = a;
    sort(s.begin(), s.end());
    int l = 0, r = n - 1;
    while (l < n && a[l] == s[l]) l++;
    if (l == n) { cout << "yes\n1 1\n"; return 0; }
    while (a[r] == s[r]) r--;
    reverse(a.begin() + l, a.begin() + r + 1);
    if (a == s) cout << "yes\n" << l + 1 << " " << r + 1 << "\n";
    else cout << "no\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'vector'],
    },
    {
      id: 'descent',
      kind: 'method',
      title: L('Find the decreasing run', 'কমতে থাকা ধারা খোঁজা'),
      idea: L('The reversed segment must be the one strictly decreasing run; check its borders.', 'উল্টানো অংশটি একমাত্র কঠোরভাবে কমতে থাকা ধারা হতে হবে; এর সীমানা দেখুন।'),
      explain: [L('Without sorting: find the first i with a[i] > a[i + 1], extend while decreasing to get [l, r], reverse it, then check the whole array is increasing. Any other descent means “no”.', 'সর্ট ছাড়া: প্রথম i খুঁজুন যেখানে a[i] > a[i + ১], কমতে থাকা পর্যন্ত বাড়িয়ে [l, r] পান, উল্টান, তারপর পুরো অ্যারে বাড়তে থাকা কি না দেখুন। অন্য কোনো কমা মানে “no”।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int l = 0;
    while (l + 1 < n && a[l] < a[l + 1]) l++;
    if (l + 1 >= n) { cout << "yes\n1 1\n"; return 0; }
    int r = l;
    while (r + 1 < n && a[r] > a[r + 1]) r++;
    reverse(a.begin() + l, a.begin() + r + 1);
    bool sorted = is_sorted(a.begin(), a.end());
    if (sorted) cout << "yes\n" << l + 1 << " " << r + 1 << "\n";
    else cout << "no\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['reverse-unique', 'while-n'],
    },
  ],
  tests: [
    { input: '3\n3 2 1', output: 'yes\n1 3', source: 'sample', note: sample(1) },
    { input: '4\n2 1 3 4', output: 'yes\n1 2', source: 'sample', note: sample(2) },
    { input: '4\n3 1 2 4', output: 'no', source: 'sample', note: sample(3) },
    { input: '2\n1 2', output: 'yes\n1 1', source: 'sample', note: sample(4) },
    { input: '5\n1 4 3 2 5', output: 'yes\n2 4', source: 'own', note: L('A middle segment.', 'মাঝের একটি অংশ।') },
  ],
  pitfalls: [L('Printing “no” for an already sorted array.', 'আগেই সাজানো অ্যারের জন্য “no” প্রিন্ট।'), L('Output in uppercase YES/NO: this problem wants lowercase.', 'বড় হাতের YES/NO আউটপুট: এই প্রবলেম ছোট হাতের চায়।')],
  related: [{ id: '405A', name: 'Gravity Flip', why: L('Sorting again.', 'আবার সর্টিং।') }],
  toolkit: ['sort', 'reverse-unique'],
};

export const p459B: ProblemEntry = {
  id: '459B',
  contestId: 459,
  index: 'B',
  name: 'Pashmak and Flowers',
  rating: 1300,
  tags: ['combinatorics', 'implementation', 'sortings'],
  featuredFor: ['combinatorics'],
  why: L('Count pairs achieving the maximum difference, with the special case where all values are equal.', 'সর্বোচ্চ পার্থক্য দেয় এমন জোড়া গোনা, সব মান সমান হওয়ার বিশেষ কেসসহ।'),
  statement: L(
    'n flowers have beauty bᵢ. Pashmak picks two flowers to maximise the difference of their beauties. Print that maximum difference and the number of ways to pick such a pair.',
    'n-টি ফুলের সৌন্দর্য bᵢ। পাশমাক দুটি ফুল বাছে যাতে তাদের সৌন্দর্যের পার্থক্য সর্বোচ্চ হয়। সেই সর্বোচ্চ পার্থক্য আর এমন জোড়া বাছার উপায়ের সংখ্যা প্রিন্ট করুন।',
  ),
  input: L('n, then the beauties.', 'n, তারপর সৌন্দর্যগুলো।'),
  output: L('The maximum difference and the number of ways.', 'সর্বোচ্চ পার্থক্য আর উপায়ের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, 1 ≤ bᵢ ≤ 10⁹', '২ ≤ n ≤ ২·১০⁵, ১ ≤ bᵢ ≤ ১০⁹')] },
  samples: [
    { input: '2\n1 2', output: '1 1', explain: L('One pair.', 'একটি জোড়া।') },
    { input: '3\n1 4 5', output: '4 1', explain: L('1 and 5.', '১ আর ৫।') },
    { input: '5\n3 1 2 3 1', output: '2 4', explain: L('Two 1s times two 3s.', 'দুটি ১ গুণ দুটি ৩।') },
  ],
  observation: L('The maximum difference is max − min. The pairs are any minimum with any maximum: cntMin · cntMax. If max = min, every pair works: n(n − 1)/2.', 'সর্বোচ্চ পার্থক্য হলো max − min। জোড়া হলো যেকোনো সর্বনিম্নের সঙ্গে যেকোনো সর্বোচ্চ: cntMin · cntMax। max = min হলে প্রতিটি জোড়া চলে: n(n − ১)/২।'),
  approach: [L('Count how many times the min and the max appear.', 'সর্বনিম্ন আর সর্বোচ্চ কতবার আসে গুনুন।')],
  walkthrough: { input: '3 1 2 3 1', steps: [{ state: 'min 1 ×2, max 3 ×2', text: L('2 · 2 = 4 ways.', '২ · ২ = ৪ উপায়।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass for min, max and counts.', 'সর্বনিম্ন, সর্বোচ্চ আর গণনার জন্য একবার।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('Count the extremes', 'চরম মানগুলো গোনা'),
      idea: L('cntMin · cntMax, or n(n − 1)/2 when all equal.', 'cntMin · cntMax, অথবা সব সমান হলে n(n − ১)/২।'),
      explain: [L('The all-equal case is the trap: there min and max are the same flowers, so multiplying counts would pair each flower with itself. The number of ways can reach about 2·10¹⁰, so use long long.', 'সব সমান কেসটাই ফাঁদ: সেখানে সর্বনিম্ন আর সর্বোচ্চ একই ফুল, তাই গণনা গুণ করলে প্রতিটি ফুল নিজের সঙ্গে জোড়া হতো। উপায়ের সংখ্যা প্রায় ২·১০¹⁰ পর্যন্ত যায়, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> b(n);
    for (auto& x : b) scanf("%lld", &x);
    long long mn = *min_element(b.begin(), b.end()), mx = *max_element(b.begin(), b.end());
    long long cmn = count(b.begin(), b.end(), mn), cmx = count(b.begin(), b.end(), mx);
    long long ways = (mn == mx) ? (long long)n * (n - 1) / 2 : cmn * cmx;
    printf("%lld %lld\n", mx - mn, ways);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'count-find', 'long-long'],
    },
    {
      id: 'sort',
      kind: 'method',
      title: L('Sort and count the ends', 'সর্ট করে দুই প্রান্ত গোনা'),
      idea: L('After sorting, the minimums are a prefix and the maximums a suffix.', 'সর্টের পর সর্বনিম্নগুলো একটি শুরুর অংশ আর সর্বোচ্চগুলো একটি শেষের অংশ।'),
      explain: [L('upper_bound(min) − begin counts the minimums and end − lower_bound(max) counts the maximums, the same counting with binary search on a sorted array.', 'upper_bound(min) − begin সর্বনিম্নগুলো আর end − lower_bound(max) সর্বোচ্চগুলো গোনে, সাজানো অ্যারেতে বাইনারি সার্চ দিয়ে একই গণনা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> b(n);
    for (auto& x : b) scanf("%lld", &x);
    sort(b.begin(), b.end());
    long long mn = b.front(), mx = b.back();
    long long cmn = upper_bound(b.begin(), b.end(), mn) - b.begin();
    long long cmx = b.end() - lower_bound(b.begin(), b.end(), mx);
    long long ways = (mn == mx) ? (long long)n * (n - 1) / 2 : cmn * cmx;
    printf("%lld %lld\n", mx - mn, ways);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: '1 1', source: 'sample', note: sample(1) },
    { input: '3\n1 4 5', output: '4 1', source: 'sample', note: sample(2) },
    { input: '5\n3 1 2 3 1', output: '2 4', source: 'sample', note: sample(3) },
    { input: '4\n7 7 7 7', output: '0 6', source: 'own', note: L('All equal: C(4, 2).', 'সব সমান: C(৪, ২)।') },
  ],
  pitfalls: [L('cntMin · cntMax when all values are equal.', 'সব মান সমান হলে cntMin · cntMax।'), L('int overflow in the count.', 'গণনায় int ওভারফ্লো।')],
  related: [{ id: '1360B', name: 'Honest Coach', why: L('Extremes after sorting.', 'সর্টের পর চরম মান।') }],
  toolkit: ['min-max', 'long-long'],
};

export const p276C: ProblemEntry = {
  id: '276C',
  contestId: 276,
  index: 'C',
  name: 'Little Girl and Maximum Sum',
  rating: 1500,
  tags: ['data-structures', 'greedy', 'implementation', 'sortings'],
  why: L('Count how often each position is used with a difference array, then pair big with big.', 'ডিফারেন্স অ্যারে দিয়ে প্রতিটি অবস্থান কতবার ব্যবহার হয় গুনে বড়কে বড়ের সঙ্গে জোড়া।'),
  statement: L(
    'You have an array of n numbers and q queries, each asking for the sum of a[l..r]. Before answering, you may rearrange the array in any order. Maximise the total of all query answers.',
    'n-টি সংখ্যার একটি অ্যারে আর q-টি কোয়েরি আছে, প্রতিটি a[l..r]-এর যোগফল চায়। উত্তর দেওয়ার আগে অ্যারেটি যেকোনো ক্রমে সাজানো যায়। সব কোয়েরির উত্তরের মোট সর্বোচ্চ করুন।',
  ),
  input: L('n and q, the array, then q lines l r.', 'n আর q, অ্যারে, তারপর q-টি লাইন l r।'),
  output: L('The maximum total.', 'সর্বোচ্চ মোট।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, q ≤ 2·10⁵, 1 ≤ aᵢ ≤ 2·10⁵', '১ ≤ n, q ≤ ২·১০⁵, ১ ≤ aᵢ ≤ ২·১০⁵')] },
  samples: [
    { input: '3 3\n5 3 2\n1 2\n2 3\n1 3', output: '25', explain: L('Position 2 is used 3 times: put 5 there.', 'অবস্থান ২ তিনবার ব্যবহার হয়: সেখানে ৫ রাখুন।') },
    { input: '5 3\n5 2 4 1 3\n1 5\n2 3\n2 3', output: '33', explain: L('Positions 2 and 3 are used 3 times each.', 'অবস্থান ২ আর ৩ প্রতিটি তিনবার।') },
  ],
  observation: L('The total equals Σ cᵢ · aᵢ, where cᵢ is how many queries cover position i. By the rearrangement inequality, the largest values should go to the most-used positions.', 'মোট হলো Σ cᵢ · aᵢ, যেখানে cᵢ হলো কতগুলো কোয়েরি অবস্থান i ঢাকে। পুনর্বিন্যাস অসমতা অনুযায়ী সবচেয়ে বড় মানগুলো সবচেয়ে বেশি ব্যবহৃত অবস্থানে যাওয়া উচিত।'),
  approach: [L('Get cᵢ with a difference array (+1 at l, −1 at r + 1, prefix sums). Sort a and c and multiply index by index.', 'ডিফারেন্স অ্যারে দিয়ে cᵢ বের করুন (l-এ +১, r + ১-এ −১, প্রিফিক্স সাম)। a আর c সর্ট করে ইনডেক্স ধরে গুণ করুন।')],
  walkthrough: { input: '5 3 2 with queries [1,2], [2,3], [1,3]', steps: [{ state: 'c = 2 3 2', text: L('Sorted c 2 2 3 with a 2 3 5: 4 + 6 + 15 = 25.', 'সাজানো c ২ ২ ৩ আর a ২ ৩ ৫: ৪ + ৬ + ১৫ = ২৫।') }] },
  complexity: { time: 'O((n + q) + n log n)', space: 'O(n)', why: L('Difference array plus two sorts.', 'ডিফারেন্স অ্যারে আর দুটি সর্ট।') },
  solutions: [
    {
      id: 'diff',
      kind: 'optimal',
      title: L('Difference array + sort both', 'ডিফারেন্স অ্যারে + দুটিই সর্ট'),
      idea: L('Each query is O(1): d[l]++, d[r + 1]−−.', 'প্রতিটি কোয়েরি O(১): d[l]++, d[r + ১]−−।'),
      explain: [L('Adding 1 to a whole range for every query would be O(n · q). A difference array records only the range ends, and one prefix-sum pass turns them into the counts. The total can be about 2·10⁵ · 2·10⁵ · 2·10⁵ = 8·10¹⁵, so long long.', 'প্রতিটি কোয়েরিতে পুরো পরিসরে ১ যোগ করলে O(n · q) হতো। ডিফারেন্স অ্যারে শুধু পরিসরের প্রান্ত লেখে, আর একবার প্রিফিক্স সাম সেগুলোকে গণনায় রূপান্তর করে। মোট প্রায় ২·১০⁵ · ২·১০⁵ · ২·১০⁵ = ৮·১০¹⁵ হতে পারে, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    scanf("%d %d", &n, &q);
    vector<long long> a(n), c(n + 1, 0);
    for (auto& x : a) scanf("%lld", &x);
    while (q--) {
        int l, r;
        scanf("%d %d", &l, &r);
        c[l - 1]++;
        c[r]--;
    }
    for (int i = 1; i < n; i++) c[i] += c[i - 1];
    c.pop_back();
    sort(a.begin(), a.end());
    sort(c.begin(), c.end());
    long long total = 0;
    for (int i = 0; i < n; i++) total += a[i] * c[i];
    printf("%lld\n", total);
    return 0;
}
`,
      time: 'O(n log n + q)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'sort', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Count coverage directly', 'আবরণ সরাসরি গোনা'),
      idea: L('Add 1 to every position of every query, then the same pairing.', 'প্রতিটি কোয়েরির প্রতিটি অবস্থানে ১ যোগ, তারপর একই জোড়া।'),
      explain: [L('Same greedy, but the counts cost O(n · q). It is the reference for the difference array.', 'একই গ্রিডি, কিন্তু গণনায় O(n · q) লাগে। এটি ডিফারেন্স অ্যারের রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> a(n), c(n, 0);
    for (auto& x : a) cin >> x;
    while (q--) {
        int l, r;
        cin >> l >> r;
        for (int i = l - 1; i < r; i++) c[i]++;
    }
    sort(a.begin(), a.end());
    sort(c.begin(), c.end());
    long long total = 0;
    for (int i = 0; i < n; i++) total += a[i] * c[i];
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(n · q)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['sort'],
    },
  ],
  tests: [
    { input: '3 3\n5 3 2\n1 2\n2 3\n1 3', output: '25', source: 'sample', note: sample(1) },
    { input: '5 3\n5 2 4 1 3\n1 5\n2 3\n2 3', output: '33', source: 'sample', note: sample(2) },
    { input: '1 1\n7\n1 1', output: '7', source: 'own', note: L('Tiny.', 'খুব ছোট।') },
  ],
  pitfalls: [L('Updating whole ranges per query.', 'প্রতি কোয়েরিতে পুরো পরিসর আপডেট।'), L('int for the total.', 'মোটের জন্য int।')],
  related: [{ id: '433B', name: "Kuriyama Mirai's Stones", why: L('Prefix sums over sorted data.', 'সাজানো ডেটার ওপর প্রিফিক্স সাম।') }],
  toolkit: ['prefix-sum', 'sort'],
};

export const p514A: ProblemEntry = {
  id: '514A',
  contestId: 514,
  index: 'A',
  name: 'Chewbaсca and Number',
  rating: 1200,
  tags: ['greedy', 'implementation'],
  why: L('Digit-by-digit greedy with one leading-zero exception.', 'শুরুর-শূন্যের একটি ব্যতিক্রমসহ অঙ্ক ধরে ধরে গ্রিডি।'),
  statement: L(
    'Chewbacca may invert any digits of the number x, replacing a digit t by 9 − t. Find the smallest positive number he can get; it must not start with a zero.',
    'চিউবাক্কা সংখ্যা x-এর যেকোনো অঙ্ক উল্টাতে পারে, অঙ্ক t-কে ৯ − t দিয়ে বদলে। সে সবচেয়ে ছোট যে ধনাত্মক সংখ্যা পেতে পারে তা বের করুন; এটি শূন্য দিয়ে শুরু হতে পারবে না।',
  ),
  input: L('One integer x (1 ≤ x ≤ 10¹⁸).', 'একটি পূর্ণসংখ্যা x (১ ≤ x ≤ ১০¹⁸)।'),
  output: L('The minimum number.', 'সর্বনিম্ন সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('x ≤ 10¹⁸', 'x ≤ ১০¹⁸')] },
  samples: [
    { input: '27', output: '22', explain: L('7 → 2.', '৭ → ২।') },
    { input: '4545', output: '4444', explain: L('Each 5 → 4.', 'প্রতিটি ৫ → ৪।') },
  ],
  observation: L('Digits are independent: each one should become min(t, 9 − t). The single exception is a leading 9, which would become 0.', 'অঙ্কগুলো স্বাধীন: প্রতিটির min(t, ৯ − t) হওয়া উচিত। একমাত্র ব্যতিক্রম শুরুর ৯, যা ০ হয়ে যেত।'),
  approach: [L('Work on the decimal string; skip the first digit if it is 9.', 'দশমিক স্ট্রিং নিয়ে কাজ করুন; প্রথম অঙ্ক ৯ হলে বাদ দিন।')],
  walkthrough: { input: '91730', steps: [{ state: '9 stays, 1→1, 7→2, 3→3, 0→0', text: L('91230.', '৯১২৩০।') }] },
  complexity: { time: 'O(digits)', space: 'O(digits)', why: L('At most 19 digits.', 'সর্বোচ্চ ১৯টি অঙ্ক।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Invert digits ≥ 5, except a leading 9', '৫ বা তার বেশি অঙ্ক উল্টানো, শুরুর ৯ ছাড়া'),
      idea: L('t ≥ 5 → 9 − t.', 't ≥ ৫ → ৯ − t।'),
      explain: [L('A smaller digit at an earlier position always wins, and choices at different positions do not interact, so each digit is minimised on its own. Reading x as a string avoids any 10¹⁸ arithmetic.', 'আগের অবস্থানে ছোট অঙ্ক সবসময় জেতে, আর ভিন্ন অবস্থানের সিদ্ধান্ত একে অপরকে প্রভাবিত করে না, তাই প্রতিটি অঙ্ক আলাদাভাবে ছোট করা হয়। x-কে স্ট্রিং হিসেবে পড়লে ১০¹⁸-এর হিসাব লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string x;
    cin >> x;
    for (size_t i = 0; i < x.size(); i++) {
        int t = x[i] - '0';
        if (i == 0 && t == 9) continue;
        if (t >= 5) x[i] = char('0' + 9 - t);
    }
    cout << x << "\n";
    return 0;
}
`,
      time: 'O(digits)',
      space: 'O(digits)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every subset of digits to invert', 'উল্টানোর জন্য অঙ্কের প্রতিটি সাবসেট চেষ্টা'),
      idea: L('2^digits options; keep the smallest valid one.', '২^অঙ্ক বিকল্প; সবচেয়ে ছোট বৈধটি রাখুন।'),
      explain: [L('At 19 digits that is half a million options, each built and compared as a string. It needs no reasoning at all and confirms the greedy.', '১৯টি অঙ্কে প্রায় পাঁচ লাখ বিকল্প, প্রতিটি স্ট্রিং হিসেবে বানানো আর তুলনা করা। এতে কোনো যুক্তিই লাগে না আর গ্রিডিকে নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string x;
    cin >> x;
    int d = x.size();
    string best = x;
    for (int mask = 0; mask < (1 << d); mask++) {
        string y = x;
        for (int i = 0; i < d; i++) if (mask >> i & 1) y[i] = char('0' + 9 - (y[i] - '0'));
        if (y[0] == '0') continue;
        if (y < best) best = y;   // same length, so string order is numeric order
    }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(2^d · d)',
      space: 'O(d)',
      accepted: true,
      toolkit: ['bit-shift', 'string-basics'],
    },
  ],
  tests: [
    { input: '27', output: '22', source: 'sample', note: sample(1) },
    { input: '4545', output: '4444', source: 'sample', note: sample(2) },
    { input: '9', output: '9', source: 'own', note: L('A lone 9 stays.', 'একা ৯ থাকে।') },
    { input: '999', output: '900', source: 'own', note: L('Leading 9 stays, others invert.', 'শুরুর ৯ থাকে, বাকিরা উল্টায়।') },
  ],
  pitfalls: [L('Turning a leading 9 into 0.', 'শুরুর ৯-কে ০ বানানো।'), L('Inverting 4 into 5, which makes it bigger.', '৪-কে ৫ বানানো, যাতে বড় হয়।')],
  related: [{ id: '489C', name: 'Given Length and Sum of Digits...', why: L('Digit-by-digit greedy.', 'অঙ্ক ধরে ধরে গ্রিডি।') }],
  toolkit: ['string-basics'],
};

export const p478B: ProblemEntry = {
  id: '478B',
  contestId: 478,
  index: 'B',
  name: 'Random Teams',
  rating: 1300,
  tags: ['combinatorics', 'constructive', 'greedy', 'math'],
  why: L('Extremes of Σ C(sizeᵢ, 2): spread evenly for the minimum, one giant team for the maximum.', 'Σ C(sizeᵢ, ২)-এর চরম মান: সর্বনিম্নের জন্য সমানভাবে ছড়ানো, সর্বোচ্চের জন্য একটি বিশাল দল।'),
  statement: L(
    'n participants are split into m non-empty teams; every two people in the same team become friends. Print the minimum and maximum possible number of pairs of friends.',
    'n জন অংশগ্রহণকারীকে m-টি খালি নয় এমন দলে ভাগ করা হয়; একই দলের প্রতি দুজন বন্ধু হয়। বন্ধুর জোড়ার সর্বনিম্ন আর সর্বোচ্চ সম্ভাব্য সংখ্যা প্রিন্ট করুন।',
  ),
  input: L('n and m.', 'n আর m।'),
  output: L('kmin and kmax.', 'kmin আর kmax।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ m ≤ n ≤ 10⁹', '১ ≤ m ≤ n ≤ ১০⁹')] },
  samples: [
    { input: '5 1', output: '10 10', explain: L('One team of 5: C(5, 2).', '৫ জনের একটি দল: C(৫, ২)।') },
    { input: '3 2', output: '1 1', explain: L('Sizes 1 and 2.', 'আকার ১ আর ২।') },
    { input: '6 3', output: '3 6', explain: L('2+2+2 gives 3; 4+1+1 gives 6.', '২+২+২-এ ৩; ৪+১+১-এ ৬।') },
  ],
  observation: L('C(s, 2) grows faster as s grows, so moving a person from a bigger team to a smaller one reduces pairs. Minimum: sizes as equal as possible. Maximum: m − 1 teams of size 1 and one team of n − m + 1.', 'C(s, ২) s বাড়লে দ্রুত বাড়ে, তাই বড় দল থেকে ছোট দলে একজনকে সরালে জোড়া কমে। সর্বনিম্ন: যত সম্ভব সমান আকার। সর্বোচ্চ: ১ আকারের m − ১টি দল আর n − m + ১-এর একটি দল।'),
  approach: [L('q = n / m, r = n % m: r teams of q + 1 and m − r teams of q for the minimum.', 'q = n / m, r = n % m: সর্বনিম্নে q + ১-এর r-টি দল আর q-এর m − r-টি দল।')],
  walkthrough: { input: '6 3', steps: [{ state: 'min: 2,2,2 → 3', text: L('Even split.', 'সমান ভাগ।') }, { state: 'max: 4,1,1 → 6', text: L('One big team.', 'একটি বড় দল।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Formulas.', 'সূত্র।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Even split and one big team', 'সমান ভাগ আর একটি বড় দল'),
      idea: L('kmin = r·C(q+1, 2) + (m−r)·C(q, 2); kmax = C(n−m+1, 2).', 'kmin = r·C(q+১, ২) + (m−r)·C(q, ২); kmax = C(n−m+১, ২)।'),
      explain: [L('Values reach about 5·10¹⁷, so long long is required everywhere.', 'মানগুলো প্রায় ৫·১০¹⁷ পর্যন্ত যায়, তাই সব জায়গায় long long লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long pairs(long long s) { return s * (s - 1) / 2; }

int main() {
    long long n, m;
    cin >> n >> m;
    long long q = n / m, r = n % m;
    long long kmin = r * pairs(q + 1) + (m - r) * pairs(q);
    long long kmax = pairs(n - m + 1);
    cout << kmin << " " << kmax << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every split (tiny n)', 'প্রতিটি ভাগ চেষ্টা (ছোট n)'),
      idea: L('Enumerate team sizes recursively and track the min and max of Σ C(s, 2).', 'দলের আকার রিকার্সিভভাবে গণনা করে Σ C(s, ২)-এর সর্বনিম্ন আর সর্বোচ্চ রাখুন।'),
      explain: [L('A brute force over partitions of n into m positive parts confirms both formulas on small inputs.', 'n-কে m-টি ধনাত্মক অংশে ভাগের ওপর ব্রুট ফোর্স ছোট ইনপুটে দুটি সূত্রই নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long lo = LLONG_MAX, hi = LLONG_MIN;
void go(long long left, long long teams, long long minSize, long long acc) {
    if (teams == 0) {
        if (left == 0) lo = min(lo, acc), hi = max(hi, acc);
        return;
    }
    for (long long s = minSize; s * teams <= left; s++) go(left - s, teams - 1, s, acc + s * (s - 1) / 2);
}

int main() {
    long long n, m;
    cin >> n >> m;
    if (n > 30) return 0;   // partitions explode: tiny n only
    go(n, m, 1, 0);
    cout << lo << " " << hi << "\n";
    return 0;
}
`,
      time: 'exponential',
      space: 'O(m)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '5 1', output: '10 10', source: 'sample', note: sample(1) },
    { input: '3 2', output: '1 1', source: 'sample', note: sample(2) },
    { input: '6 3', output: '3 6', source: 'sample', note: sample(3) },
    { input: '1000000000 1', output: '499999999500000000 499999999500000000', source: 'own', note: L('Needs 64 bits.', '৬৪ বিট লাগে।') },
  ],
  pitfalls: [L('int overflow: C(10⁹, 2) ≈ 5·10¹⁷.', 'int ওভারফ্লো: C(১০⁹, ২) ≈ ৫·১০¹⁷।')],
  related: [{ id: '459B', name: 'Pashmak and Flowers', why: L('Pair counting with C(n, 2).', 'C(n, ২) দিয়ে জোড়া গোনা।') }],
  toolkit: ['long-long'],
};
