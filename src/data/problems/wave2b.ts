import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p189A: ProblemEntry = {
  id: '189A',
  contestId: 189,
  index: 'A',
  name: 'Cut Ribbon',
  rating: 1300,
  tags: ['brute-force', 'dp'],
  featuredFor: ['dp'],
  why: L('Unbounded knapsack in its simplest form, and a case where greedy fails.', 'সবচেয়ে সরল রূপে সীমাহীন ন্যাপস্যাক, আর এমন একটি কেস যেখানে গ্রিডি ব্যর্থ।'),
  statement: L(
    'A ribbon of length n must be cut into pieces so that every piece has length a, b or c. Maximise the number of pieces. At least one valid cutting is guaranteed to exist.',
    'n দৈর্ঘ্যের একটি ফিতা এমনভাবে টুকরো করতে হবে যাতে প্রতিটি টুকরোর দৈর্ঘ্য a, b বা c হয়। টুকরোর সংখ্যা সর্বোচ্চ করুন। অন্তত একটি বৈধ কাটার উপায় থাকার নিশ্চয়তা আছে।',
  ),
  input: L('Four integers n, a, b, c.', 'চারটি পূর্ণসংখ্যা n, a, b, c।'),
  output: L('The maximum number of pieces.', 'সর্বোচ্চ টুকরোর সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, a, b, c ≤ 4000', '১ ≤ n, a, b, c ≤ ৪০০০')] },
  samples: [
    { input: '5 5 3 2', output: '2', explain: L('3 + 2.', '৩ + ২।') },
    { input: '7 5 5 2', output: '2', explain: L('5 + 2.', '৫ + ২।') },
  ],
  observation: L('Greedy (always cut the shortest piece) fails: 7 with pieces 2 and 5 cannot use 2 + 2 + 2. dp[x] = the most pieces summing to exactly x tries every last piece.', 'গ্রিডি (সবসময় সবচেয়ে ছোট টুকরো কাটা) ব্যর্থ: ২ আর ৫ টুকরোয় ৭-এ ২ + ২ + ২ চলে না। dp[x] = ঠিক x যোগফলের সর্বোচ্চ টুকরো, প্রতিটি শেষ টুকরো চেষ্টা করে।'),
  approach: [L('dp[0] = 0, every other dp[x] starts as “impossible”; dp[x] = max over p ∈ {a, b, c} of dp[x − p] + 1.', 'dp[0] = ০, বাকি প্রতিটি dp[x] “অসম্ভব” দিয়ে শুরু; dp[x] = p ∈ {a, b, c}-এর ওপর dp[x − p] + ১-এর সর্বোচ্চ।')],
  walkthrough: {
    input: '7 5 5 2',
    steps: [
      { state: 'dp[2]=1, dp[4]=2, dp[5]=1, dp[6]=3', text: L('dp[5] comes from 5; dp[7] from dp[5] + 1 or dp[2] + 1.', 'dp[৫] আসে ৫ থেকে; dp[৭] আসে dp[৫] + ১ বা dp[২] + ১ থেকে।') },
      { state: 'dp[7] = 2', text: L('Answer 2.', 'উত্তর ২।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Three transitions per length.', 'প্রতি দৈর্ঘ্যে তিনটি রূপান্তর।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('DP over lengths', 'দৈর্ঘ্যের ওপর DP'),
      idea: L('dp[x] = max(dp[x − a], dp[x − b], dp[x − c]) + 1 over reachable states.', 'প্রাপ্য অবস্থার ওপর dp[x] = max(dp[x − a], dp[x − b], dp[x − c]) + ১।'),
      explain: [L('Unreachable lengths must stay marked (−1 here), otherwise a length like 1 would pretend to be 0 pieces and spoil every length built on it. dp[n] is reachable by the guarantee.', 'অপ্রাপ্য দৈর্ঘ্যগুলো চিহ্নিত (এখানে −১) থাকতে হবে, না হলে ১-এর মতো দৈর্ঘ্য ০ টুকরোর ভান করবে আর এর ওপর বানানো প্রতিটি দৈর্ঘ্য নষ্ট করবে। নিশ্চয়তা অনুযায়ী dp[n] প্রাপ্য।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, a, b, c;
    cin >> n >> a >> b >> c;
    vector<int> dp(n + 1, -1);
    dp[0] = 0;
    for (int x = 1; x <= n; x++)
        for (int p : {a, b, c})
            if (x >= p && dp[x - p] != -1) dp[x] = max(dp[x], dp[x - p] + 1);
    cout << dp[n] << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'method',
      title: L('Try counts of two piece types', 'দুই ধরনের টুকরোর সংখ্যা চেষ্টা'),
      idea: L('Choose how many a-pieces (i) and b-pieces (j); the rest must be a multiple of c.', 'কয়টি a-টুকরো (i) আর b-টুকরো (j) বাছুন; বাকিটা c-এর গুণিতক হতে হবে।'),
      explain: [L('With n ≤ 4000 the double loop is at most 16 million cheap steps. This brute force needs no DP insight at all and is a good fallback in a contest when limits allow.', 'n ≤ ৪০০০ হলে ডাবল লুপ সর্বোচ্চ ১ কোটি ৬০ লাখ সস্তা ধাপ। এই ব্রুট ফোর্সে DP-র কোনো ধারণাই লাগে না, আর সীমা অনুমতি দিলে কনটেস্টে ভালো বিকল্প।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, a, b, c;
    cin >> n >> a >> b >> c;
    int best = 0;
    for (int i = 0; i * a <= n; i++)
        for (int j = 0; i * a + j * b <= n; j++) {
            int rest = n - i * a - j * b;
            if (rest % c == 0) best = max(best, i + j + rest / c);
        }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n² / (a·b))',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'modulo'],
    },
  ],
  tests: [
    { input: '5 5 3 2', output: '2', source: 'sample', note: sample(1) },
    { input: '7 5 5 2', output: '2', source: 'sample', note: sample(2) },
    { input: '4000 1 2 3', output: '4000', source: 'own', note: L('All pieces of length 1.', 'সব টুকরো ১ দৈর্ঘ্যের।') },
    { input: '7 2 5 5', output: '2', source: 'own', note: L('Greedy on the smallest piece fails here.', 'এখানে সবচেয়ে ছোট টুকরোর গ্রিডি ব্যর্থ।') },
  ],
  pitfalls: [L('Initialising dp to 0 instead of “impossible”.', '“অসম্ভব”-এর বদলে dp-কে ০ দিয়ে শুরু করা।'), L('Trying a greedy.', 'গ্রিডি চেষ্টা করা।')],
  related: [{ id: '455A', name: 'Boredom', why: L('Another DP over values.', 'মানের ওপর আরেকটি DP।') }],
  toolkit: ['vector'],
};

export const p1195C: ProblemEntry = {
  id: '1195C',
  contestId: 1195,
  index: 'C',
  name: 'Basketball Exercise',
  rating: 1400,
  tags: ['dp'],
  why: L('A DP whose state needs one extra fact: which row the last chosen player came from.', 'এমন DP যার অবস্থায় একটি বাড়তি তথ্য লাগে: শেষ বাছা খেলোয়াড় কোন সারি থেকে এসেছে।'),
  statement: L(
    '2n students stand in two rows of n, with heights given for each row. Choose a team from left to right: each chosen student must stand strictly to the right of the previous one, and two consecutive chosen students may not come from the same row. Maximise the total height.',
    '২n জন ছাত্র n জনের দুটি সারিতে দাঁড়িয়ে, প্রতিটি সারির উচ্চতা দেওয়া। বাম থেকে ডানে একটি দল বাছুন: প্রতিটি বাছা ছাত্রকে আগের জনের কঠোরভাবে ডানে থাকতে হবে, আর পরপর দুজন বাছা ছাত্র একই সারি থেকে আসতে পারবে না। মোট উচ্চতা সর্বোচ্চ করুন।',
  ),
  input: L('n, the first row, the second row.', 'n, প্রথম সারি, দ্বিতীয় সারি।'),
  output: L('The maximum total height.', 'সর্বোচ্চ মোট উচ্চতা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, heights ≤ 10⁹', '১ ≤ n ≤ ১০⁵, উচ্চতা ≤ ১০⁹')] },
  samples: [
    { input: '5\n9 3 5 7 3\n5 8 1 4 5', output: '29', explain: L('9 (top), 8 (bottom), 5 (top), 7… no; 9 + 8 + 5 + 4 + 3 = 29 alternates rows.', '৯ (ওপর), ৮ (নিচ), ৫ (ওপর), ৪ (নিচ), ৩ (ওপর) = ২৯, সারি পর্যায়ক্রমে।') },
    { input: '3\n1 2 9\n10 1 1', output: '19', explain: L('10 (bottom) then 9 (top).', '১০ (নিচ) তারপর ৯ (ওপর)।') },
    { input: '1\n7\n4', output: '7', explain: L('Just the taller one.', 'শুধু লম্বাজন।') },
  ],
  observation: L('Going left to right, all that matters about the past is the best total so far and which row it ended in. Columns can be skipped.', 'বাম থেকে ডানে যেতে অতীতের শুধু এটুকু গুরুত্বপূর্ণ: এ পর্যন্ত সেরা মোট আর সেটি কোন সারিতে শেষ হয়েছে। কলাম বাদ দেওয়া যায়।'),
  approach: [L('top = best total whose last pick is in row 1, bottom = same for row 2. At column i: top′ = max(top, bottom + h1[i]), bottom′ = max(bottom, top + h2[i]).', 'top = শেষ বাছাই সারি ১-এ এমন সেরা মোট, bottom = সারি ২-এর জন্য একই। কলাম i-তে: top′ = max(top, bottom + h1[i]), bottom′ = max(bottom, top + h2[i])।')],
  walkthrough: {
    input: '3\n1 2 9\n10 1 1',
    steps: [
      { state: 'top 1, bottom 10', text: L('Column 1.', 'কলাম ১।') },
      { state: 'top max(1, 10+2)=12, bottom max(10, 1+1)=10', text: L('Column 2.', 'কলাম ২।') },
      { state: 'top max(12, 10+9)=19', text: L('Column 3. Answer 19.', 'কলাম ৩। উত্তর ১৯।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two states per column.', 'প্রতি কলামে দুটি অবস্থা।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Two-state DP', 'দুই-অবস্থার DP'),
      idea: L('Keep the best total ending in each row; update both from the old values.', 'প্রতিটি সারিতে শেষ হওয়া সেরা মোট রাখুন; দুটিই পুরনো মান থেকে আপডেট করুন।'),
      explain: [L('Compute the new pair from the old pair (not from each other half-updated), otherwise one column could be used twice. The “max with the old value” lets you skip a column.', 'নতুন জোড়া পুরনো জোড়া থেকে হিসাব করুন (একে অপরের অর্ধ-আপডেট থেকে নয়), না হলে একটি কলাম দুবার ব্যবহার হতে পারে। “পুরনো মানের সঙ্গে max” একটি কলাম বাদ দেওয়ার সুযোগ দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> h1(n), h2(n);
    for (auto& x : h1) cin >> x;
    for (auto& x : h2) cin >> x;
    long long top = 0, bottom = 0;
    for (int i = 0; i < n; i++) {
        long long nt = max(top, bottom + h1[i]);
        long long nb = max(bottom, top + h2[i]);
        top = nt;
        bottom = nb;
    }
    cout << max(top, bottom) << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
    {
      id: 'table',
      kind: 'method',
      title: L('Full dp[i][row] table', 'পূর্ণ dp[i][row] টেবিল'),
      idea: L('dp[i][r] = best total using columns 0..i with the last pick at (i, r).', 'dp[i][r] = ০..i কলাম ব্যবহার করে সেরা মোট যেখানে শেষ বাছাই (i, r)-এ।'),
      explain: [L('Here the last pick is exactly at column i. It can follow a pick in the other row at column i − 1 or i − 2 (skipping one column is never worse than skipping two, since a third column could always be inserted). This table form is easier to extend to three rows.', 'এখানে শেষ বাছাই ঠিক কলাম i-তে। এটি কলাম i − ১ বা i − ২-এ অন্য সারির বাছাইয়ের পরে আসতে পারে (দুটি কলাম বাদ দেওয়া কখনো একটি বাদ দেওয়ার চেয়ে ভালো নয়, কারণ মাঝে সবসময় আরেকটি কলাম ঢোকানো যায়)। এই টেবিল রূপ তিন সারিতে বাড়ানো সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<array<long long, 2>> h(n), dp(n);
    for (int r = 0; r < 2; r++)
        for (int i = 0; i < n; i++) cin >> h[i][r];
    long long best = 0;
    for (int i = 0; i < n; i++)
        for (int r = 0; r < 2; r++) {
            long long prev = 0;
            if (i >= 1) prev = max(prev, dp[i - 1][1 - r]);
            if (i >= 2) prev = max(prev, dp[i - 2][1 - r]);
            dp[i][r] = prev + h[i][r];
            best = max(best, dp[i][r]);
        }
    cout << best << "\n";
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
    { input: '5\n9 3 5 7 3\n5 8 1 4 5', output: '29', source: 'sample', note: sample(1) },
    { input: '3\n1 2 9\n10 1 1', output: '19', source: 'sample', note: sample(2) },
    { input: '1\n7\n4', output: '7', source: 'sample', note: sample(3) },
    { input: '2\n1000000000 1000000000\n1000000000 1000000000', output: '2000000000', source: 'own', note: L('Needs long long.', 'long long লাগে।') },
  ],
  pitfalls: [L('Updating top and then using the new top for bottom.', 'top আপডেট করে নতুন top দিয়ে bottom হিসাব।'), L('Forcing a pick in every column.', 'প্রতিটি কলামে বাছাই বাধ্যতামূলক করা।')],
  related: [{ id: '455A', name: 'Boredom', why: L('Take-or-skip again.', 'আবার নেওয়া-বা-বাদ।') }],
  toolkit: ['long-long'],
};

export const p230B: ProblemEntry = {
  id: '230B',
  contestId: 230,
  index: 'B',
  name: 'T-primes',
  rating: 1300,
  tags: ['binary-search', 'implementation', 'math', 'number-theory'],
  featuredFor: ['number-theory'],
  why: L('A divisor-count question that collapses to “is it the square of a prime?”, answered with a sieve.', 'ভাজক-সংখ্যার একটি প্রশ্ন যা “এটা কি একটি মৌলিক সংখ্যার বর্গ?”-তে নেমে আসে, ছাঁকনি দিয়ে উত্তর।'),
  statement: L(
    'A positive integer is a T-prime if it has exactly three positive divisors. For each of n given numbers, print YES if it is a T-prime and NO otherwise.',
    'একটি ধনাত্মক পূর্ণসংখ্যা T-prime যদি এর ঠিক তিনটি ধনাত্মক ভাজক থাকে। দেওয়া n-টি সংখ্যার প্রতিটির জন্য T-prime হলে YES, না হলে NO প্রিন্ট করুন।',
  ),
  input: L('n, then n numbers xᵢ.', 'n, তারপর n-টি সংখ্যা xᵢ।'),
  output: L('YES or NO for each number.', 'প্রতিটি সংখ্যার জন্য YES বা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁵, 1 ≤ xᵢ ≤ 10¹²', '১ ≤ n ≤ ১০⁵, ১ ≤ xᵢ ≤ ১০¹²')] },
  samples: [{ input: '3\n4 5 6', output: 'YES\nNO\nNO', explain: L('4 has divisors 1, 2, 4.', '৪-এর ভাজক ১, ২, ৪।') }],
  observation: L('Divisors pair up as d and x/d, so the count is odd only for perfect squares. A square r² has exactly three divisors (1, r, r²) exactly when r is prime.', 'ভাজকগুলো d আর x/d জোড়ায় আসে, তাই সংখ্যাটি বিজোড় শুধু পূর্ণবর্গের জন্য। একটি বর্গ r²-এর ঠিক তিনটি ভাজক (১, r, r²) থাকে ঠিক তখনই যখন r মৌলিক।'),
  approach: [L('Sieve primes up to 10⁶. For each x, take r = ⌊√x⌋ exactly; answer YES if r² = x and r is prime.', '১০⁶ পর্যন্ত মৌলিক সংখ্যা ছাঁকুন। প্রতিটি x-এর জন্য নিখুঁতভাবে r = ⌊√x⌋ নিন; r² = x আর r মৌলিক হলে YES।')],
  walkthrough: {
    input: '4 5 6',
    steps: [
      { state: '4 = 2², 2 prime', text: L('YES.', 'YES।') },
      { state: '5, 6 not squares', text: L('NO, NO.', 'NO, NO।') },
    ],
  },
  complexity: { time: 'O(N log log N + n)', space: 'O(N)', why: L('Sieve to N = 10⁶, then O(1) per number.', 'N = ১০⁶ পর্যন্ত ছাঁকনি, তারপর প্রতি সংখ্যায় O(১)।') },
  solutions: [
    {
      id: 'sieve',
      kind: 'optimal',
      title: L('Sieve + integer square root', 'ছাঁকনি + পূর্ণসংখ্যার বর্গমূল'),
      idea: L('x is a T-prime ⇔ x = r² with r prime.', 'x T-prime ⇔ x = r² যেখানে r মৌলিক।'),
      explain: [L('sqrtl can be off by one for numbers near 10¹², so adjust r with two small while loops before comparing r · r with x. The sieve only needs to reach 10⁶ because r ≤ √10¹².', '১০¹²-এর কাছের সংখ্যায় sqrtl এক কম-বেশি হতে পারে, তাই r · r-কে x-এর সঙ্গে তুলনার আগে দুটি ছোট while লুপে r ঠিক করুন। ছাঁকনি শুধু ১০⁶ পর্যন্ত লাগে কারণ r ≤ √১০¹²।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const int N = 1000000;
    vector<bool> composite(N + 1, false);
    composite[0] = composite[1] = true;
    for (int p = 2; (long long)p * p <= N; p++)
        if (!composite[p])
            for (int m = p * p; m <= N; m += p) composite[m] = true;
    int n;
    scanf("%d", &n);
    while (n--) {
        long long x;
        scanf("%lld", &x);
        long long r = sqrtl((long double)x);
        while (r * r > x) r--;
        while ((r + 1) * (r + 1) <= x) r++;
        puts(r * r == x && !composite[r] ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(N log log N + n)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['c-io', 'long-long'],
    },
    {
      id: 'set',
      kind: 'method',
      title: L('Precompute all T-primes in a set', 'সব T-prime আগে একটি set-এ'),
      idea: L('Insert p² for every prime p ≤ 10⁶, then look each x up.', 'প্রতিটি মৌলিক p ≤ ১০⁶-এর জন্য p² ঢুকিয়ে প্রতিটি x খুঁজুন।'),
      explain: [L('There are only 78498 primes up to 10⁶, so the set of T-primes is small. A sorted vector with binary_search works the same and is faster, which is where the binary search tag comes from.', '১০⁶ পর্যন্ত মাত্র ৭৮৪৯৮টি মৌলিক সংখ্যা, তাই T-prime-এর সেট ছোট। binary_search সহ একটি সাজানো ভেক্টর একইভাবে কাজ করে আর দ্রুত, বাইনারি সার্চ ট্যাগ এখান থেকেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    const int N = 1000000;
    vector<bool> composite(N + 1, false);
    vector<long long> tprimes;
    for (long long p = 2; p <= N; p++) {
        if (composite[p]) continue;
        tprimes.push_back(p * p);
        for (long long m = p * p; m <= N; m += p) composite[m] = true;
    }
    int n;
    scanf("%d", &n);
    while (n--) {
        long long x;
        scanf("%lld", &x);
        puts(binary_search(tprimes.begin(), tprimes.end(), x) ? "YES" : "NO");
    }
    return 0;
}
`,
      time: 'O(N log log N + n log N)',
      space: 'O(N)',
      accepted: true,
      toolkit: ['lower-bound', 'c-io'],
    },
  ],
  tests: [
    { input: '3\n4 5 6', output: 'YES\nNO\nNO', source: 'sample', note: sample(1) },
    { input: '4\n1 9 25 16', output: 'NO\nYES\nYES\nNO', source: 'own', note: L('1 and 16 = 4² are not T-primes.', '১ আর ১৬ = ৪² T-prime নয়।') },
    { input: '2\n999966000289 1000000000000', output: 'YES\nNO', source: 'own', note: L('999983² and 10⁶² near the limit.', 'সীমার কাছে ৯৯৯৯৮৩² আর (১০⁶)²।') },
  ],
  pitfalls: [
    L('Counting divisors up to √x for each of 10⁵ numbers: 10⁵ · 10⁶ steps.', '১০⁵টি সংখ্যার প্রতিটিতে √x পর্যন্ত ভাজক গোনা: ১০⁵ · ১০⁶ ধাপ।'),
    L('Trusting sqrt() on doubles for 12-digit numbers.', '১২ অঙ্কের সংখ্যায় double-এর sqrt()-এ ভরসা।'),
    L('Treating 1 as a T-prime.', '১-কে T-prime ধরা।'),
  ],
  related: [{ id: '26A', name: 'Almost Prime', why: L('Another prime-factor count.', 'আরেকটি মৌলিক উৎপাদক গণনা।') }],
  toolkit: ['c-io', 'lower-bound'],
};

export const p26A: ProblemEntry = {
  id: '26A',
  contestId: 26,
  index: 'A',
  name: 'Almost Prime',
  rating: 900,
  tags: ['number-theory'],
  why: L('Counting distinct prime factors, by trial division or by a sieve that does the counting for you.', 'ভিন্ন মৌলিক উৎপাদক গোনা, ভাগ করে দেখে বা এমন ছাঁকনি দিয়ে যা নিজেই গুনে দেয়।'),
  statement: L(
    'A number is almost prime if it has exactly two distinct prime divisors (6, 18 and 24 are; 4, 8, 9 and 42 are not). Count the almost prime numbers between 1 and n inclusive.',
    'একটি সংখ্যা প্রায়-মৌলিক যদি এর ঠিক দুটি ভিন্ন মৌলিক ভাজক থাকে (৬, ১৮ আর ২৪ প্রায়-মৌলিক; ৪, ৮, ৯ আর ৪২ নয়)। ১ থেকে n পর্যন্ত প্রায়-মৌলিক সংখ্যা গুনুন।',
  ),
  input: L('One integer n.', 'একটি পূর্ণসংখ্যা n।'),
  output: L('The count.', 'গণনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 3000', '১ ≤ n ≤ ৩০০০')] },
  samples: [
    { input: '10', output: '2', explain: L('6 and 10.', '৬ আর ১০।') },
    { input: '21', output: '8', explain: L('6, 10, 12, 14, 15, 18, 20, 21.', '৬, ১০, ১২, ১৪, ১৫, ১৮, ২০, ২১।') },
  ],
  observation: L('Only the number of distinct primes matters, not their powers: 12 = 2² · 3 counts as two.', 'শুধু ভিন্ন মৌলিকের সংখ্যা গুরুত্বপূর্ণ, ঘাত নয়: ১২ = ২² · ৩ দুটি ধরা হয়।'),
  approach: [L('For each k ≤ n, count its distinct prime factors and check for 2.', 'প্রতিটি k ≤ n-এর ভিন্ন মৌলিক উৎপাদক গুনে ২ কি না দেখুন।')],
  walkthrough: { input: '10', steps: [{ state: '6 = 2·3, 10 = 2·5', text: L('Two numbers. Answer 2.', 'দুটি সংখ্যা। উত্তর ২।') }] },
  complexity: { time: 'O(n √n)', space: 'O(1)', why: L('Trial division of every number.', 'প্রতিটি সংখ্যা ভাগ করে দেখা।') },
  solutions: [
    {
      id: 'trial',
      kind: 'method',
      title: L('Trial division per number', 'প্রতিটি সংখ্যায় ভাগ করে দেখা'),
      idea: L('Divide out each prime factor and count how many different ones there were.', 'প্রতিটি মৌলিক উৎপাদক ভাগ করে বের করুন আর কতগুলো আলাদা ছিল গুনুন।'),
      explain: [L('Dividing out d completely before moving on guarantees that only primes divide the remainder. Anything left above 1 at the end is one more prime.', 'পরের দিকে যাওয়ার আগে d পুরো ভাগ করে বের করলে নিশ্চিত হয় যে বাকি অংশ শুধু মৌলিক দিয়ে ভাগ হয়। শেষে ১-এর বেশি কিছু থাকলে সেটি আরেকটি মৌলিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int distinctPrimes(int x) {
    int cnt = 0;
    for (int d = 2; d * d <= x; d++)
        if (x % d == 0) {
            cnt++;
            while (x % d == 0) x /= d;
        }
    if (x > 1) cnt++;
    return cnt;
}

int main() {
    int n;
    cin >> n;
    int ans = 0;
    for (int k = 1; k <= n; k++) if (distinctPrimes(k) == 2) ans++;
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n √n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions', 'modulo'],
    },
    {
      id: 'sieve',
      kind: 'better',
      title: L('Sieve that counts prime factors', 'মৌলিক উৎপাদক গোনে এমন ছাঁকনি'),
      idea: L('For every prime p, add 1 to cnt[m] for each multiple m of p.', 'প্রতিটি মৌলিক p-এর জন্য p-এর প্রতিটি গুণিতক m-এ cnt[m]-এ ১ যোগ করুন।'),
      explain: [L('A number p is prime exactly when cnt[p] is still 0 when the loop reaches it, since no smaller prime divided it. After the loop, cnt[m] is the number of distinct primes of m for every m at once.', 'একটি সংখ্যা p মৌলিক ঠিক তখনই, যখন লুপ সেখানে পৌঁছানোর সময় cnt[p] তখনও ০, কারণ কোনো ছোট মৌলিক একে ভাগ করেনি। লুপের পর প্রতিটি m-এর জন্য cnt[m] একসঙ্গে m-এর ভিন্ন মৌলিকের সংখ্যা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> cnt(n + 1, 0);
    for (int p = 2; p <= n; p++)
        if (cnt[p] == 0)                       // no smaller prime divides p
            for (int m = p; m <= n; m += p) cnt[m]++;
    cout << count(cnt.begin(), cnt.end(), 2) << "\n";
    return 0;
}
`,
      time: 'O(n log log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'count-find'],
    },
  ],
  tests: [
    { input: '10', output: '2', source: 'sample', note: sample(1) },
    { input: '21', output: '8', source: 'sample', note: sample(2) },
    { input: '1', output: '0', source: 'own', note: L('Smallest n.', 'সবচেয়ে ছোট n।') },
    { input: '3000', output: '1375', source: 'own', note: L('Largest n.', 'সবচেয়ে বড় n।') },
  ],
  pitfalls: [L('Counting prime factors with multiplicity (4 = 2·2 is not almost prime).', 'পুনরাবৃত্তিসহ মৌলিক উৎপাদক গোনা (৪ = ২·২ প্রায়-মৌলিক নয়)।'), L('Missing the last prime factor above √k.', '√k-এর বড় শেষ মৌলিক উৎপাদক বাদ পড়া।')],
  related: [{ id: '230B', name: 'T-primes', why: L('Sieve again.', 'আবার ছাঁকনি।') }],
  toolkit: ['functions', 'vector'],
};

export const p1350A: ProblemEntry = {
  id: '1350A',
  contestId: 1350,
  index: 'A',
  name: 'Orac and Factors',
  rating: 900,
  tags: ['math'],
  why: L('Simulating k steps is impossible, but one step changes the problem into something trivial.', 'k ধাপ সিমুলেট করা অসম্ভব, কিন্তু একটি ধাপ প্রবলেমটিকে তুচ্ছ কিছুতে বদলে দেয়।'),
  statement: L(
    'Let f(n) be the smallest divisor of n greater than 1. Starting from n, perform k operations, each replacing n by n + f(n). Print the final n. There are t test cases.',
    'ধরুন f(n) হলো n-এর ১-এর বড় সবচেয়ে ছোট ভাজক। n থেকে শুরু করে k-টি অপারেশন করুন, প্রতিটিতে n-এর জায়গায় n + f(n)। শেষ n প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and k.', 't; প্রতিটি টেস্টে n আর k।'),
  output: L('The final value for each test.', 'প্রতিটি টেস্টের শেষ মান।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁶, 1 ≤ k ≤ 10⁹; Σ n ≤ 10⁶', '২ ≤ n ≤ ১০⁶, ১ ≤ k ≤ ১০⁹; Σ n ≤ ১০⁶')] },
  samples: [{ input: '3\n5 1\n8 2\n3 4', output: '10\n12\n12', explain: L('3 → 6 → 8 → 10 → 12.', '৩ → ৬ → ৮ → ১০ → ১২।') }],
  observation: L('After one step n becomes even: if n is odd, f(n) is odd too, and odd + odd is even. From then on f(n) = 2, so each remaining step adds 2.', 'এক ধাপের পর n জোড় হয়: n বিজোড় হলে f(n)-ও বিজোড়, আর বিজোড় + বিজোড় = জোড়। তারপর থেকে f(n) = ২, তাই বাকি প্রতিটি ধাপে ২ যোগ হয়।'),
  approach: [L('Answer: n + f(n) + 2 · (k − 1).', 'উত্তর: n + f(n) + ২ · (k − ১)।')],
  walkthrough: { input: '3 4', steps: [{ state: '3 + 3 = 6', text: L('First step adds f(3) = 3.', 'প্রথম ধাপে f(৩) = ৩ যোগ।') }, { state: '6 + 2·3 = 12', text: L('Three more steps add 2 each.', 'আরও তিনটি ধাপে ২ করে।') }] },
  complexity: { time: 'O(√n) per test', space: 'O(1)', why: L('Finding f(n) by trial division.', 'ভাগ করে দেখে f(n) বের করা।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('One real step, then +2 each time', 'একটি আসল ধাপ, তারপর প্রতিবার +২'),
      idea: L('n + f(n) + 2(k − 1).', 'n + f(n) + ২(k − ১)।'),
      explain: [L('f(n) is found by trying d = 2, 3, … up to √n; if none divides n, n is prime and f(n) = n. The result can reach about 2·10⁹, so use long long.', 'd = ২, ৩, … √n পর্যন্ত চেষ্টা করে f(n) পাওয়া যায়; কোনোটি n-কে ভাগ না করলে n মৌলিক আর f(n) = n। ফল প্রায় ২·১০⁹ পর্যন্ত যেতে পারে, তাই long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        long long f = n;
        for (long long d = 2; d * d <= n; d++)
            if (n % d == 0) { f = d; break; }
        cout << n + f + 2 * (k - 1) << "\n";
    }
    return 0;
}
`,
      time: 'O(√n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'break-continue'],
    },
    {
      id: 'simulate',
      kind: 'brute',
      title: L('Simulate every step', 'প্রতিটি ধাপ সিমুলেশন'),
      idea: L('Apply n += f(n) k times.', 'k বার n += f(n) প্রয়োগ।'),
      explain: [L('With k up to 10⁹ this times out, but on small k it confirms the pattern: after the first step every f is 2.', 'k ১০⁹ পর্যন্ত হলে এটি টাইম আউট হয়, কিন্তু ছোট k-তে প্যাটার্ন নিশ্চিত করে: প্রথম ধাপের পর প্রতিটি f হলো ২।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long f(long long n) {
    for (long long d = 2; d * d <= n; d++) if (n % d == 0) return d;
    return n;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        while (k--) n += f(n);
        cout << n << "\n";
    }
    return 0;
}
`,
      time: 'O(k √n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3\n5 1\n8 2\n3 4', output: '10\n12\n12', source: 'sample', note: sample(1) },
    { input: '1\n999983 1000000000', output: '2001999964', source: 'own', note: L('A large prime and huge k.', 'বড় মৌলিক আর বিশাল k।') },
    { input: '1\n9 3', output: '16', source: 'own', note: L('9 → 12 → 14 → 16.', '৯ → ১২ → ১৪ → ১৬।') },
  ],
  pitfalls: [L('Simulating 10⁹ steps.', '১০⁹ ধাপ সিমুলেট করা।'), L('int overflow in the final answer.', 'শেষ উত্তরে int ওভারফ্লো।')],
  related: [{ id: '26A', name: 'Almost Prime', why: L('More about smallest divisors.', 'সবচেয়ে ছোট ভাজক নিয়ে আরও।') }],
  toolkit: ['long-long'],
};
