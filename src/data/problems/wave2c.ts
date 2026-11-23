import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1520D: ProblemEntry = {
  id: '1520D',
  contestId: 1520,
  index: 'D',
  name: 'Same Differences',
  rating: 1200,
  tags: ['data-structures', 'hashing', 'math'],
  featuredFor: ['data-structures'],
  why: L('Rewriting a pair condition so each side depends on one index, then counting with a map.', 'জোড়ার শর্ত এমনভাবে লেখা যাতে প্রতিটি পাশ এক ইনডেক্সের ওপর নির্ভর করে, তারপর map দিয়ে গোনা।'),
  statement: L(
    'Given an array a of n integers, count pairs of indices i < j with aⱼ − aᵢ = j − i. There are t test cases.',
    'n-টি পূর্ণসংখ্যার অ্যারে a দেওয়া আছে; i < j এমন ইনডেক্সের জোড়া গুনুন যেখানে aⱼ − aᵢ = j − i। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The number of pairs for each test.', 'প্রতিটি টেস্টের জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 2·10⁵, Σ n ≤ 2·10⁵', '১ ≤ n ≤ ২·১০⁵, Σ n ≤ ২·১০⁵'), L('1 ≤ aᵢ ≤ n', '১ ≤ aᵢ ≤ n')] },
  samples: [
    {
      input: '4\n6\n3 5 1 4 6 6\n3\n1 2 3\n4\n1 3 3 4\n6\n1 6 3 4 5 6',
      output: '1\n3\n3\n10',
      explain: L('In the second test aᵢ − i is 0 for all three, so every pair counts.', 'দ্বিতীয় টেস্টে তিনটিতেই aᵢ − i হলো ০, তাই প্রতিটি জোড়া গোনা হয়।'),
    },
  ],
  observation: L('aⱼ − aᵢ = j − i is the same as aⱼ − j = aᵢ − i. So pairs are just two indices with the same key bᵢ = aᵢ − i.', 'aⱼ − aᵢ = j − i মানেই aⱼ − j = aᵢ − i। তাই জোড়া হলো একই কী bᵢ = aᵢ − i-সহ দুটি ইনডেক্স।'),
  approach: [L('Walk left to right; for each j add how many earlier indices had the same key, then record j’s key.', 'বাম থেকে ডানে চলুন; প্রতিটি j-এর জন্য আগের কতগুলো ইনডেক্সের একই কী ছিল যোগ করুন, তারপর j-এর কী লিখে রাখুন।')],
  walkthrough: {
    input: '1 3 3 4',
    steps: [
      { state: 'keys 0, 1, 0, 0', text: L('aᵢ − i with 1-based i.', '১-ভিত্তিক i দিয়ে aᵢ − i।') },
      { state: '0 + 0 + 1 + 2 = 3', text: L('Each 0 pairs with the earlier 0s.', 'প্রতিটি ০ আগের ০-গুলোর সঙ্গে জোড়া।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('One map operation per element.', 'প্রতি উপাদানে একটি map অপারেশন।') },
  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every pair', 'প্রতিটি জোড়া দেখা'),
      idea: L('Two loops over i < j.', 'i < j-এর ওপর দুটি লুপ।'),
      explain: [L('n² / 2 pairs is 2·10¹⁰ in the worst case, so this is only a reference for testing.', 'সবচেয়ে খারাপ ক্ষেত্রে n² / ২ জোড়া মানে ২·১০¹⁰, তাই এটি শুধু পরীক্ষার রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n);
        for (auto& x : a) cin >> x;
        long long pairs = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (a[j] - a[i] == j - i) pairs++;
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
    {
      id: 'map',
      kind: 'optimal',
      title: L('Count equal keys with a map', 'map দিয়ে সমান কী গোনা'),
      idea: L('pairs += seen[aⱼ − j]; then seen[aⱼ − j]++.', 'pairs += seen[aⱼ − j]; তারপর seen[aⱼ − j]++।'),
      explain: [L('Counting before inserting makes each pair counted exactly once, at its right end j. The answer can reach n²/2 ≈ 2·10¹⁰, so it needs long long.', 'ঢোকানোর আগে গুনলে প্রতিটি জোড়া ঠিক একবার গোনা হয়, এর ডান প্রান্ত j-এ। উত্তর n²/২ ≈ ২·১০¹⁰ পর্যন্ত যায়, তাই long long লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        map<int, long long> seen;
        long long pairs = 0;
        for (int j = 0; j < n; j++) {
            int a;
            cin >> a;
            pairs += seen[a - j];
            seen[a - j]++;
        }
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'io-fast', 'long-long'],
    },
    {
      id: 'groups',
      kind: 'method',
      title: L('Group sizes and C(c, 2)', 'দলের আকার আর C(c, ২)'),
      idea: L('Sort the keys; a group of c equal keys contributes c(c − 1)/2 pairs.', 'কীগুলো সর্ট করুন; c-টি সমান কীর একটি দল c(c − ১)/২ জোড়া দেয়।'),
      explain: [L('Since aᵢ ≤ n, keys lie in [1 − n, n − 1], so a counting array of size 2n replaces the map. Counting all at once and then using the pair formula is a different way to see the same answer.', 'aᵢ ≤ n হওয়ায় কীগুলো [১ − n, n − ১]-এ থাকে, তাই ২n আকারের একটি গণনার অ্যারে map-এর জায়গা নেয়। সব একসঙ্গে গুনে তারপর জোড়ার সূত্র ব্যবহার একই উত্তরকে দেখার আরেক উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> cnt(2 * n + 1, 0);
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            cnt[a - i + n]++;          // shift keys to be non-negative
        }
        long long pairs = 0;
        for (long long c : cnt) pairs += c * (c - 1) / 2;
        cout << pairs << "\n";
    }
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
    { input: '4\n6\n3 5 1 4 6 6\n3\n1 2 3\n4\n1 3 3 4\n6\n1 6 3 4 5 6', output: '1\n3\n3\n10', source: 'sample', note: sample(1) },
    { input: '1\n1\n1', output: '0', source: 'own', note: L('A single element.', 'একটি মাত্র উপাদান।') },
    { input: '1\n3\n3 2 1', output: '0', source: 'own', note: L('All keys different.', 'সব কী আলাদা।') },
  ],
  pitfalls: [L('Storing the pair count in int.', 'জোড়ার গণনা int-এ রাখা।'), L('Counting each pair twice by inserting before counting.', 'গোনার আগে ঢুকিয়ে প্রতিটি জোড়া দুবার গোনা।')],
  related: [{ id: '4C', name: 'Registration system', why: L('Another map of counters.', 'কাউন্টারের আরেকটি map।') }],
  toolkit: ['map', 'long-long'],
};

export const p4C: ProblemEntry = {
  id: '4C',
  contestId: 4,
  index: 'C',
  name: 'Registration system',
  rating: 1300,
  tags: ['data-structures', 'hashing', 'implementation'],
  why: L('The simplest real use of a map: one counter per string.', 'map-এর সবচেয়ে সরল বাস্তব ব্যবহার: প্রতি স্ট্রিংয়ে একটি কাউন্টার।'),
  statement: L(
    'A site processes n registration requests, each a user name. If the name is new, it is registered and the site answers OK. Otherwise the site suggests the name followed by the smallest number i ≥ 1 such that name + i is not yet taken, registers that, and prints it.',
    'একটি সাইট n-টি নিবন্ধন অনুরোধ প্রক্রিয়া করে, প্রতিটি একটি ইউজারনেম। নাম নতুন হলে নিবন্ধিত হয় আর সাইট OK বলে। না হলে সাইট নামের পর সবচেয়ে ছোট i ≥ ১ সংখ্যা দেয় যাতে name + i তখনও নেওয়া না, সেটি নিবন্ধন করে প্রিন্ট করে।',
  ),
  input: L('n, then n names of lowercase letters.', 'n, তারপর ছোট হাতের অক্ষরের n-টি নাম।'),
  output: L('n lines: OK or the suggested name.', 'n-টি লাইন: OK বা প্রস্তাবিত নাম।'),
  limits: { timeSec: 5, memoryMb: 64, notes: [L('1 ≤ n ≤ 10⁵, names up to 32 letters', '১ ≤ n ≤ ১০⁵, নাম সর্বোচ্চ ৩২ অক্ষর')] },
  samples: [
    { input: '4\nabacaba\nacaba\nabacaba\nacab', output: 'OK\nOK\nabacaba1\nOK', explain: L('The second abacaba becomes abacaba1.', 'দ্বিতীয় abacaba হয় abacaba1।') },
    { input: '6\nfirst\nfirst\nsecond\nsecond\nthird\nthird', output: 'OK\nfirst1\nOK\nsecond1\nOK\nthird1', explain: L('Each repeat gets 1.', 'প্রতিটি পুনরাবৃত্তি ১ পায়।') },
  ],
  observation: L('Names contain only letters, so name + number can never equal another requested name. The k-th request for a name (counting from 0) always gets name + k.', 'নামে শুধু অক্ষর থাকে, তাই name + সংখ্যা কখনো অন্য কোনো অনুরোধ করা নামের সমান হতে পারে না। একটি নামের k-তম অনুরোধ (০ থেকে গুনে) সবসময় name + k পায়।'),
  approach: [L('Keep map<string, int> used. For each request, k = used[name]++; print OK if k is 0, else name + k.', 'map<string, int> used রাখুন। প্রতিটি অনুরোধে k = used[name]++; k ০ হলে OK, না হলে name + k প্রিন্ট করুন।')],
  walkthrough: {
    input: 'first first second',
    steps: [
      { state: 'used[first] 0 → 1', text: L('OK.', 'OK।') },
      { state: 'used[first] 1 → 2', text: L('first1.', 'first1।') },
      { state: 'used[second] 0 → 1', text: L('OK.', 'OK।') },
    ],
  },
  complexity: { time: 'O(n · L log n)', space: 'O(n · L)', why: L('A map lookup compares strings of length L.', 'map খোঁজায় L দৈর্ঘ্যের স্ট্রিং তুলনা হয়।') },
  solutions: [
    {
      id: 'map',
      kind: 'optimal',
      title: L('One counter per name', 'প্রতি নামে একটি কাউন্টার'),
      idea: L('used[name] is how many times the name was requested before.', 'used[name] হলো নামটি আগে কতবার অনুরোধ করা হয়েছে।'),
      explain: [L('map::operator[] creates a counter at 0 the first time a name is seen, which is exactly the OK case. Printing with "\\n" and fast IO matters for 10⁵ lines.', 'কোনো নাম প্রথমবার দেখা গেলে map::operator[] ০ মানের একটি কাউন্টার তৈরি করে, যা ঠিক OK-এর কেস। ১০⁵ লাইনের জন্য "\\n" আর দ্রুত IO দিয়ে প্রিন্ট করা জরুরি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    map<string, int> used;
    while (n--) {
        string name;
        cin >> name;
        int k = used[name]++;
        if (k == 0) cout << "OK\n";
        else cout << name << k << "\n";
    }
    return 0;
}
`,
      time: 'O(n · L log n)',
      space: 'O(n · L)',
      accepted: true,
      toolkit: ['map', 'io-fast'],
    },
    {
      id: 'taken-set',
      kind: 'method',
      title: L('Literal simulation with a set of taken names', 'নেওয়া নামের set দিয়ে আক্ষরিক সিমুলেশন'),
      idea: L('Keep every registered string and try name1, name2, … from where this name last stopped.', 'প্রতিটি নিবন্ধিত স্ট্রিং রাখুন আর এই নাম শেষবার যেখানে থেমেছিল সেখান থেকে name1, name2, … চেষ্টা করুন।'),
      explain: [L('This follows the statement word for word: it does not rely on the observation that numbered names never clash. Remembering the next number to try per name keeps it fast; without that memory it would be O(n²) for one repeated name.', 'এটি স্টেটমেন্ট শব্দে শব্দে মানে: সংখ্যাযুক্ত নাম কখনো সংঘর্ষ করে না সেই পর্যবেক্ষণের ওপর নির্ভর করে না। প্রতি নামে পরের চেষ্টার সংখ্যা মনে রাখলে এটি দ্রুত থাকে; না রাখলে একটি পুনরাবৃত্ত নামে O(n²) হতো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    set<string> taken;
    map<string, int> nextTry;
    while (n--) {
        string name;
        cin >> name;
        if (!taken.count(name)) {
            taken.insert(name);
            cout << "OK\n";
            continue;
        }
        int& i = nextTry[name];
        if (i == 0) i = 1;
        while (taken.count(name + to_string(i))) i++;
        string got = name + to_string(i);
        taken.insert(got);
        cout << got << "\n";
    }
    return 0;
}
`,
      time: 'O(n · L log n)',
      space: 'O(n · L)',
      accepted: true,
      toolkit: ['set', 'map', 'to-string'],
    },
  ],
  tests: [
    { input: '4\nabacaba\nacaba\nabacaba\nacab', output: 'OK\nOK\nabacaba1\nOK', source: 'sample', note: sample(1) },
    { input: '6\nfirst\nfirst\nsecond\nsecond\nthird\nthird', output: 'OK\nfirst1\nOK\nsecond1\nOK\nthird1', source: 'sample', note: sample(2) },
    { input: '4\na\na\na\na', output: 'OK\na1\na2\na3', source: 'own', note: L('Many repeats.', 'অনেক পুনরাবৃত্তি।') },
  ],
  pitfalls: [L('Searching for the next free number from 1 every time: O(n²) on repeated names.', 'প্রতিবার ১ থেকে পরের খালি সংখ্যা খোঁজা: পুনরাবৃত্ত নামে O(n²)।'), L('Using endl for 10⁵ lines.', '১০⁵ লাইনের জন্য endl ব্যবহার।')],
  related: [{ id: '1520D', name: 'Same Differences', why: L('Counting with a map.', 'map দিয়ে গোনা।') }],
  toolkit: ['map', 'io-fast'],
};

export const p1343B: ProblemEntry = {
  id: '1343B',
  contestId: 1343,
  index: 'B',
  name: 'Balanced Array',
  rating: 800,
  tags: ['constructive', 'math'],
  featuredFor: ['constructive'],
  why: L('A construction whose impossible cases come straight from parity.', 'এমন একটি গঠন যার অসম্ভব কেসগুলো সরাসরি জোড়-বিজোড় থেকে আসে।'),
  statement: L(
    'Given an even n, build an array of n distinct positive integers whose first n/2 elements are even, whose last n/2 elements are odd, and where the sum of the first half equals the sum of the second half. Print NO if it is impossible, otherwise YES and any such array. There are t test cases.',
    'একটি জোড় n দেওয়া আছে; n-টি ভিন্ন ধনাত্মক পূর্ণসংখ্যার একটি অ্যারে বানান যার প্রথম n/২টি উপাদান জোড়, শেষ n/২টি বিজোড়, আর প্রথম অর্ধেকের যোগফল দ্বিতীয় অর্ধেকের সমান। অসম্ভব হলে NO, না হলে YES আর এমন যেকোনো একটি অ্যারে প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has an even n.', 't; প্রতিটি টেস্টে একটি জোড় n।'),
  output: L('NO, or YES followed by the array.', 'NO, অথবা YES আর তারপর অ্যারে।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁵, Σ n ≤ 2·10⁵', '২ ≤ n ≤ ২·১০⁵, Σ n ≤ ২·১০⁵'), L('Any valid array is accepted.', 'যেকোনো বৈধ অ্যারে গ্রহণযোগ্য।')] },
  samples: [
    {
      input: '5\n2\n4\n6\n8\n10',
      output: 'NO\nYES\n2 4 1 5\nNO\nYES\n2 4 6 8 1 3 5 11\nNO',
      explain: L('Only n = 4 and n = 8 work.', 'শুধু n = ৪ আর n = ৮ কাজ করে।'),
    },
  ],
  observation: L('Let k = n/2. The odd half has k odd numbers, so its sum has the parity of k. The even half’s sum is even. Equal sums force k to be even, i.e. n divisible by 4. When it is, one construction always works.', 'ধরুন k = n/২। বিজোড় অর্ধেকে k-টি বিজোড় সংখ্যা, তাই এর যোগফলের জোড়-বিজোড় k-এর মতো। জোড় অর্ধেকের যোগফল জোড়। সমান যোগফল হতে k-কে জোড় হতে হয়, অর্থাৎ n ৪ দিয়ে বিভাজ্য। তখন একটি গঠন সবসময় কাজ করে।'),
  approach: [
    L('Evens 2, 4, …, 2k. Odds 1, 3, …, 2k − 3, and a last odd number that fixes the sum: Σ evens − Σ first k − 1 odds = k(k + 1) − (k − 1)² = 3k − 1, which is odd when k is even and larger than 2k − 3.', 'জোড়: ২, ৪, …, ২k। বিজোড়: ১, ৩, …, ২k − ৩, আর শেষে একটি বিজোড় সংখ্যা যা যোগফল ঠিক করে: Σ জোড় − প্রথম k − ১টি বিজোড়ের Σ = k(k + ১) − (k − ১)² = ৩k − ১, যা k জোড় হলে বিজোড় আর ২k − ৩-এর চেয়ে বড়।'),
  ],
  walkthrough: {
    input: 'n = 8',
    steps: [
      { state: 'k = 4', text: L('Evens 2 4 6 8, sum 20.', 'জোড় ২ ৪ ৬ ৮, যোগফল ২০।') },
      { state: '1 3 5 + 11', text: L('1 + 3 + 5 = 9, and 3·4 − 1 = 11 makes 20.', '১ + ৩ + ৫ = ৯, আর ৩·৪ − ১ = ১১ মিলে ২০।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Print n numbers.', 'n-টি সংখ্যা প্রিন্ট।') },
  solutions: [
    {
      id: 'construct',
      kind: 'optimal',
      title: L('Evens, odds, and one fixing number', 'জোড়, বিজোড়, আর একটি ঠিক করার সংখ্যা'),
      idea: L('If n % 4 ≠ 0 print NO; else 2..2k, 1..2k − 3, 3k − 1.', 'n % ৪ ≠ ০ হলে NO; নয়তো ২..২k, ১..২k − ৩, ৩k − ১।'),
      explain: [L('All numbers are distinct: the evens are distinct, the first k − 1 odds are distinct, and 3k − 1 is larger than every one of those odds. Printing as you go needs no array.', 'সব সংখ্যা আলাদা: জোড়গুলো আলাদা, প্রথম k − ১টি বিজোড় আলাদা, আর ৩k − ১ ওই প্রতিটি বিজোড়ের চেয়ে বড়। চলতে চলতে প্রিন্ট করলে অ্যারে লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        long long k = n / 2;
        if (k % 2 == 1) {
            cout << "NO\n";
            continue;
        }
        cout << "YES\n";
        for (long long i = 1; i <= k; i++) cout << 2 * i << ' ';
        for (long long i = 1; i < k; i++) cout << 2 * i - 1 << ' ';
        cout << 3 * k - 1 << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'break-continue'],
    },
    {
      id: 'running',
      kind: 'method',
      title: L('Balance the sums as you go', 'চলতে চলতে যোগফল মেলানো'),
      idea: L('Pair 2i with 2i − 1 (the odd side falls 1 behind each time), then repay the debt of k with the last odd number.', '২i-কে ২i − ১-এর সঙ্গে জোড়া দিন (প্রতিবার বিজোড় দিক ১ পিছিয়ে পড়ে), তারপর শেষ বিজোড় সংখ্যা দিয়ে k-এর ঘাটতি শোধ করুন।'),
      explain: [L('Building the array while tracking the difference of sums shows where 3k − 1 comes from: after k − 1 pairs the odd side is k − 1 behind, and the last pair needs 2k − 1 + k = 3k − 1. The final odd number must be odd, which again forces k even.', 'যোগফলের পার্থক্য দেখতে দেখতে অ্যারে বানালে বোঝা যায় ৩k − ১ কোথা থেকে আসে: k − ১টি জোড়ার পর বিজোড় দিক k − ১ পিছিয়ে, আর শেষ জোড়ায় দরকার ২k − ১ + k = ৩k − ১। শেষ সংখ্যাটি বিজোড় হতে হবে, যা আবার k-কে জোড় হতে বাধ্য করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        long long k = n / 2;
        vector<long long> ev, od;
        long long diff = 0;                    // sum(evens) - sum(odds)
        for (long long i = 1; i <= k; i++) {
            ev.push_back(2 * i);
            diff += 2 * i;
            long long o = (i < k) ? 2 * i - 1 : diff;   // last odd repays everything
            od.push_back(o);
            diff -= o;
        }
        if (od.back() % 2 == 0) {
            cout << "NO\n";
            continue;
        }
        cout << "YES\n";
        for (auto x : ev) cout << x << ' ';
        for (auto x : od) cout << x << ' ';
        cout << "\n";
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
    { input: '5\n2\n4\n6\n8\n10', output: 'NO\nYES\n2 4 1 5\nNO\nYES\n2 4 6 8 1 3 5 11\nNO', source: 'sample', note: sample(1) },
    { input: '1\n12', output: 'YES\n2 4 6 8 10 12 1 3 5 7 9 17', source: 'own', note: L('n = 12: k = 6 is even, so it works.', 'n = ১২: k = ৬ জোড়, তাই কাজ করে।') },
  ],
  pitfalls: [L('Putting the odd numbers first: the evens must come first.', 'বিজোড়গুলো আগে রাখা: জোড়গুলো আগে আসতে হবে।'), L('Missing that n = 2 is impossible.', 'n = ২ অসম্ভব তা বাদ পড়া।')],
  related: [{ id: '1373B', name: '01 Game', why: L('Another parity argument.', 'আরেকটি জোড়-বিজোড় যুক্তি।') }],
  toolkit: ['modulo'],
};

export const p1373B: ProblemEntry = {
  id: '1373B',
  contestId: 1373,
  index: 'B',
  name: '01 Game',
  rating: 900,
  tags: ['games'],
  featuredFor: ['games'],
  why: L('A game where the number of moves is fixed, so only its parity decides the winner.', 'এমন একটি খেলা যেখানে চালের সংখ্যা নির্দিষ্ট, তাই শুধু এর জোড়-বিজোড় বিজয়ী ঠিক করে।'),
  statement: L(
    'Alice and Bob play on a binary string, Alice first. A move deletes two adjacent different characters (“01” or “10”). The player who cannot move loses. Print DA if Alice wins with perfect play and NET otherwise. There are t test cases.',
    'অ্যালিস আর বব একটি বাইনারি স্ট্রিংয়ে খেলে, অ্যালিস আগে। একটি চালে দুটি পাশাপাশি আলাদা অক্ষর (“01” বা “10”) মোছা হয়। যে চাল দিতে পারে না সে হারে। নিখুঁত খেলায় অ্যালিস জিতলে DA, না হলে NET প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test is a binary string of length ≤ 100.', 't; প্রতিটি টেস্ট ≤ ১০০ দৈর্ঘ্যের একটি বাইনারি স্ট্রিং।'),
  output: L('DA or NET for each test.', 'প্রতিটি টেস্টের জন্য DA বা NET।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 1000', '১ ≤ t ≤ ১০০০')] },
  samples: [{ input: '3\n01\n1111\n0011', output: 'DA\nNET\nNET', explain: L('0011: two moves happen, so Bob makes the last one.', '0011: দুটি চাল হয়, তাই শেষটি বব দেয়।') }],
  observation: L('Every move removes one 0 and one 1. While both digits remain, some 0 and 1 are adjacent, so a move exists. So the game always lasts exactly min(zeros, ones) moves, whatever anyone does.', 'প্রতিটি চালে একটি ০ আর একটি ১ মুছে যায়। দুটি অঙ্কই থাকা পর্যন্ত কোথাও একটি ০ আর একটি ১ পাশাপাশি থাকে, তাই চাল থাকে। তাই যে যা-ই করুক, খেলা সবসময় ঠিক min(zeros, ones) চাল চলে।'),
  approach: [L('Alice makes moves 1, 3, 5, …; she wins exactly when the total is odd.', 'অ্যালিস ১, ৩, ৫, … নম্বর চাল দেয়; মোট বিজোড় হলেই সে জেতে।')],
  walkthrough: { input: '01', steps: [{ state: 'min(1, 1) = 1', text: L('One move, Alice makes it. DA.', 'একটি চাল, অ্যালিস দেয়। DA।') }] },
  complexity: { time: 'O(|s|)', space: 'O(1)', why: L('Count the zeros.', 'শূন্য গোনা।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Parity of min(zeros, ones)', 'min(zeros, ones)-এর জোড়-বিজোড়'),
      idea: L('DA when min(zeros, ones) is odd.', 'min(zeros, ones) বিজোড় হলে DA।'),
      explain: [L('Since the length of the game does not depend on the moves, there is no strategy at all. Recognising a fixed game length is one of the most common tricks in game problems.', 'খেলার দৈর্ঘ্য চালের ওপর নির্ভর না করায় কোনো কৌশলই নেই। নির্দিষ্ট খেলার দৈর্ঘ্য চেনা গেম প্রবলেমের সবচেয়ে প্রচলিত কৌশলগুলোর একটি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int zeros = count(s.begin(), s.end(), '0');
        int ones = s.size() - zeros;
        cout << (min(zeros, ones) % 2 == 1 ? "DA" : "NET") << "\n";
    }
    return 0;
}
`,
      time: 'O(|s|)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['count-find', 'min-max'],
    },
    {
      id: 'simulate',
      kind: 'method',
      title: L('Play the game with a stack', 'স্ট্যাক দিয়ে খেলাটি খেলা'),
      idea: L('Push characters; when the top differs from the next character, both vanish as one move.', 'অক্ষরগুলো পুশ করুন; ওপরেরটি পরের অক্ষর থেকে আলাদা হলে দুটিই একটি চাল হিসেবে মুছে যায়।'),
      explain: [L('Any sequence of moves gives the same count, so the stack’s particular order of deletions is as good as any. This simulation is a way to check the claim that the length is fixed.', 'যেকোনো ক্রমের চালে একই গণনা আসে, তাই স্ট্যাকের নির্দিষ্ট মোছার ক্রমও অন্য যেকোনোটির মতোই। এই সিমুলেশন দৈর্ঘ্য নির্দিষ্ট দাবিটি যাচাইয়ের উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s, st;
        cin >> s;
        int moves = 0;
        for (char c : s) {
            if (!st.empty() && st.back() != c) {
                st.pop_back();
                moves++;
            } else {
                st.push_back(c);
            }
        }
        cout << (moves % 2 ? "DA" : "NET") << "\n";
    }
    return 0;
}
`,
      time: 'O(|s|)',
      space: 'O(|s|)',
      accepted: true,
      toolkit: ['stack-queue'],
    },
  ],
  tests: [
    { input: '3\n01\n1111\n0011', output: 'DA\nNET\nNET', source: 'sample', note: sample(1) },
    { input: '2\n0\n010101', output: 'NET\nDA', source: 'own', note: L('No move at all; three moves.', 'কোনো চাল নেই; তিনটি চাল।') },
  ],
  pitfalls: [L('Trying to find a clever strategy when none matters.', 'কোনো কৌশল কাজে না এলেও চতুর কৌশল খোঁজা।'), L('Swapping DA and NET.', 'DA আর NET উল্টে ফেলা।')],
  related: [{ id: '1343B', name: 'Balanced Array', why: L('Parity decides again.', 'আবার জোড়-বিজোড় সিদ্ধান্ত দেয়।') }],
  toolkit: ['count-find'],
};

export const p1421A: ProblemEntry = {
  id: '1421A',
  contestId: 1421,
  index: 'A',
  name: 'XORwice',
  rating: 800,
  tags: ['bitmasks', 'greedy', 'math'],
  featuredFor: ['bitmasks'],
  why: L('The bit-by-bit way of thinking about XOR, in its shortest form.', 'XOR নিয়ে বিট ধরে ধরে ভাবার পদ্ধতি, সবচেয়ে সংক্ষিপ্ত রূপে।'),
  statement: L(
    'Given a and b, find the smallest possible value of (a ⊕ x) + (b ⊕ x) over all non-negative x, where ⊕ is bitwise XOR. There are t test cases.',
    'a আর b দেওয়া আছে; সব অঋণাত্মক x-এর ওপর (a ⊕ x) + (b ⊕ x)-এর সবচেয়ে ছোট সম্ভাব্য মান বের করুন, যেখানে ⊕ হলো বিটওয়াইজ XOR। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has a and b.', 't; প্রতিটি টেস্টে a আর b।'),
  output: L('The minimum for each test.', 'প্রতিটি টেস্টের সর্বনিম্ন।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a, b ≤ 10⁹', '১ ≤ a, b ≤ ১০⁹')] },
  samples: [
    { input: '6\n6 12\n4 9\n59 832\n28 14\n4925 2912\n1 1', output: '10\n13\n891\n18\n6237\n0', explain: L('6 ⊕ 12 = 10, achieved with x = 4.', '৬ ⊕ ১২ = ১০, x = ৪ দিয়ে পাওয়া যায়।') },
  ],
  observation: L('Each bit contributes independently. Where a and b have the same bit, choosing the same bit in x clears it in both. Where they differ, exactly one of the two results has that bit, whatever x is. So the minimum is a ⊕ b.', 'প্রতিটি বিট স্বাধীনভাবে অবদান রাখে। যেখানে a আর b-এর বিট একই, x-এ একই বিট বাছলে দুটিতেই মুছে যায়। যেখানে আলাদা, x যা-ই হোক দুটি ফলের ঠিক একটিতে সেই বিট থাকে। তাই সর্বনিম্ন হলো a ⊕ b।'),
  approach: [L('Print a ^ b (achieved by x = a & b).', 'a ^ b প্রিন্ট করুন (x = a & b দিয়ে পাওয়া যায়)।')],
  walkthrough: {
    input: '6 12',
    steps: [
      { state: '0110, 1100', text: L('Bit 2 is shared; bits 1 and 3 differ.', 'বিট ২ যৌথ; বিট ১ আর ৩ আলাদা।') },
      { state: 'x = 0100 → 0010 + 1000 = 10', text: L('Answer 10 = 6 ⊕ 12.', 'উত্তর ১০ = ৬ ⊕ ১২।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One XOR.', 'একটি XOR।') },
  solutions: [
    {
      id: 'xor',
      kind: 'optimal',
      title: L('The answer is a XOR b', 'উত্তর a XOR b'),
      idea: L('Shared bits can be cancelled, differing bits always cost once.', 'যৌথ বিট বাতিল করা যায়, আলাদা বিটের খরচ সবসময় একবার।'),
      explain: [L('Thinking per bit is the key habit for XOR, AND and OR problems: the operations never carry between bits, so the best choice for each bit can be made separately.', 'XOR, AND আর OR প্রবলেমে প্রতি বিট ধরে ভাবাই মূল অভ্যাস: এই অপারেশনে বিটগুলোর মধ্যে কখনো হাতে-রাখা হয় না, তাই প্রতিটি বিটের সেরা সিদ্ধান্ত আলাদাভাবে নেওয়া যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b;
        cin >> a >> b;
        cout << (a ^ b) << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and'],
    },
    {
      id: 'per-bit',
      kind: 'method',
      title: L('Choose x bit by bit', 'বিট ধরে ধরে x বাছা'),
      idea: L('For each bit, try x’s bit as 0 and 1 and keep the cheaper contribution.', 'প্রতিটি বিটের জন্য x-এর বিট ০ আর ১ চেষ্টা করে সস্তা অবদানটি রাখুন।'),
      explain: [L('This spells the reasoning out in code: for bit i, the cost is ((aᵢ ⊕ xᵢ) + (bᵢ ⊕ xᵢ)) · 2ⁱ. Summing the minimum over 31 bits gives the same result as a ⊕ b, and the same loop shape solves harder per-bit problems.', 'এটি যুক্তিটি কোডে লেখে: বিট i-এর খরচ ((aᵢ ⊕ xᵢ) + (bᵢ ⊕ xᵢ)) · ২ⁱ। ৩১টি বিটের সর্বনিম্ন যোগ করলে a ⊕ b-এর একই ফল আসে, আর একই লুপের আকার কঠিন প্রতি-বিট প্রবলেমও সমাধান করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b, total = 0;
        cin >> a >> b;
        for (int i = 0; i < 31; i++) {
            long long ai = a >> i & 1, bi = b >> i & 1, best = LLONG_MAX;
            for (long long xi = 0; xi <= 1; xi++) best = min(best, (ai ^ xi) + (bi ^ xi));
            total += best << i;
        }
        cout << total << "\n";
    }
    return 0;
}
`,
      time: 'O(31)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bit-shift', 'bitwise-and'],
    },
  ],
  tests: [
    { input: '6\n6 12\n4 9\n59 832\n28 14\n4925 2912\n1 1', output: '10\n13\n891\n18\n6237\n0', source: 'sample', note: sample(1) },
    { input: '1\n1000000000 1', output: '1000000001', source: 'own', note: L('Large values.', 'বড় মান।') },
  ],
  pitfalls: [L('Trying many x values by brute force.', 'ব্রুট ফোর্সে অনেক x চেষ্টা।'), L('Writing a ^ b inside cout without brackets: << binds tighter than ^.', 'বন্ধনী ছাড়া cout-এ a ^ b লেখা: <<-এর অগ্রাধিকার ^-এর চেয়ে বেশি।')],
  related: [{ id: '1097B', name: 'Petr and a Combination Lock', why: L('Another bitmask problem.', 'আরেকটি বিটমাস্ক প্রবলেম।') }],
  toolkit: ['bitwise-and'],
};
