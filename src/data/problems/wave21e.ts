import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 1534E
export const p1534E: ProblemEntry = {
  id: '1534E',
  contestId: 1534,
  index: 'E',
  name: 'Lost Array',
  rating: 2300,
  interactive: true,
  tags: ['graphs', 'greedy', 'interactive', 'shortest-paths'],
  why: L(
    'Each query flips the parity of exactly k positions, and all that matters is how many positions have been covered an odd number of times. That count is a vertex in a tiny graph with n + 1 vertices, so the cheapest plan is a shortest path.',
    'প্রতিটি প্রশ্ন ঠিক k টি অবস্থানের জোড়-বিজোড় উল্টে দেয়, আর গুরুত্বপূর্ণ শুধু কতগুলো অবস্থান বিজোড়বার ঢাকা পড়েছে। সেই সংখ্যা n + ১ শীর্ষের ছোট গ্রাফের একটি শীর্ষ, তাই সবচেয়ে সস্তা পরিকল্পনা একটি সংক্ষিপ্ততম পথ।',
  ),
  statement: L(
    'The judge hides an array of n integers. A question lists exactly k distinct positions "? i₁ … i_k" and is answered with the xor of the elements at those positions. With at most 500 questions, print "! x" where x is the xor of the whole array. If no sequence of questions can ever give the xor of the whole array, print -1 instead.',
    'জাজ n টি পূর্ণসংখ্যার একটি অ্যারে লুকিয়েছে। প্রশ্নে ঠিক k টি আলাদা অবস্থান "? i₁ … i_k" দেওয়া হয় আর উত্তর সেই অবস্থানগুলোর মানের xor। সর্বোচ্চ ৫০০ প্রশ্নে "! x" প্রিন্ট করো যেখানে x পুরো অ্যারের xor। কোনো প্রশ্নের ক্রমেই যদি পুরো অ্যারের xor পাওয়া অসম্ভব হয়, তাহলে -১ প্রিন্ট করো।',
  ),
  input: L('First line: n and k. After each question, one integer: the xor.', 'প্রথম লাইনে n আর k। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: xor।'),
  output: L('Questions "? i₁ … i_k", then "! x" or "-1". Flush after every line.', 'প্রশ্ন "? i₁ … i_k", শেষে "! x" বা "-১"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k < n ≤ 500, values below 2³⁰, at most 500 questions', '১ ≤ k < n ≤ ৫০০, মান ২³⁰-এর নিচে, সর্বোচ্চ ৫০০ প্রশ্ন')] },
  samples: [
    {
      input: '5 3\n6 3 5 1 2',
      output: 'OK',
      transcript: '< 5 3\n> ? 5 4 3\n< 6\n> ? 3 4 2\n< 7\n> ? 4 3 1\n< 2\n> ! 3',
      explain: L('Three questions suffice for n = 5, k = 3: the counts of odd-covered positions go 0 → 3 → 2 → 5. After the three questions every position has been covered an odd number of times (positions 2 and 3 three times, the others once), so the xor of the three answers, 6 xor 7 xor 2 = 3, is the xor of the whole array. ' + made.en, 'n = ৫, k = ৩-এ তিন প্রশ্নই যথেষ্ট: বিজোড়বার ঢাকা অবস্থানের সংখ্যা যায় ০ → ৩ → ২ → ৫। তিন প্রশ্নের পর প্রতিটি অবস্থান বিজোড়বার ঢাকা (২ ও ৩ নম্বর তিনবার, বাকিরা একবার), তাই তিন উত্তরের xor, ৬ xor ৭ xor ২ = ৩, পুরো অ্যারের xor। ' + made.bn),
    },
    {
      input: '3 2\n1 2 3',
      output: 'OK',
      transcript: '< 3 2\n> -1',
      explain: L('With k = 2 every query covers two positions, so the total number of coverings is always even, but all three positions odd would need an odd total. It is impossible, and the right answer is -1 without asking anything. ' + made.en, 'k = ২-এ প্রতিটি প্রশ্ন দুটি অবস্থান ঢাকে, তাই মোট ঢাকার সংখ্যা সবসময় জোড়, অথচ তিনটি অবস্থানই বিজোড় হতে বিজোড় মোট লাগে। এটি অসম্ভব, সঠিক উত্তর কিছু জিজ্ঞেস না করেই -১। ' + made.bn),
    },
  ],
  observation: L(
    'The xor of several answers equals the xor of the elements covered an odd number of times. We want all n positions covered an odd number of times. Only the number x of currently odd positions matters, not which ones: a query that takes j positions from the odd set and k − j from the even set changes x to x − j + (k − j), and any j with j ≤ x and k − j ≤ n − x is allowed.',
    'কয়েকটি উত্তরের xor হলো বিজোড়বার ঢাকা উপাদানগুলোর xor। আমরা চাই সব n অবস্থান বিজোড়বার ঢাকা পড়ুক। শুধু বর্তমানে বিজোড় অবস্থানের সংখ্যা x গুরুত্বপূর্ণ, কোনগুলো নয়: যে প্রশ্ন বিজোড় সেট থেকে j টি আর জোড় সেট থেকে k − j টি নেয় সে x-কে x − j + (k − j) করে, আর j ≤ x ও k − j ≤ n − x হলে যেকোনো j চলবে।',
  ),
  approach: [
    L('Build a graph on the values x = 0 … n. From x there is an edge to x − j + (k − j) for every j with max(0, k − (n − x)) ≤ j ≤ min(k, x).', 'x = ০ … n মানগুলোর ওপর গ্রাফ বানাও। x থেকে প্রতিটি j-এর (max(০, k − (n − x)) ≤ j ≤ min(k, x)) জন্য x − j + (k − j)-এ edge।'),
    L('Run a BFS from 0. If n is unreachable print -1 and stop.', '০ থেকে BFS চালাও। n-এ পৌঁছানো না গেলে -১ প্রিন্ট করে থামো।'),
    L('Otherwise follow the shortest path back from n to 0 to get the sequence of j values.', 'নয়তো n থেকে ০-তে সংক্ষিপ্ততম পথ ধরে পেছনে গিয়ে j-এর ক্রম পাও।'),
    L('Replay the path: keep two lists, the odd and the even positions. For each j take j positions from the odd list and k − j from the even list, ask them, xor the answer into the result, and swap the taken positions to the other list.', 'পথটি চালাও: বিজোড় আর জোড় অবস্থানের দুটি তালিকা রাখো। প্রতিটি j-এর জন্য বিজোড় তালিকা থেকে j টি আর জোড় থেকে k − j টি নাও, জিজ্ঞেস করো, উত্তর ফলে xor করো, আর নেওয়া অবস্থানগুলো উল্টো তালিকায় সরাও।'),
    L('Print the accumulated xor.', 'জমানো xor প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '5 3\n6 3 5 1 2',
    steps: [
      { state: 'BFS: 0 → 3 → 2 → 5', text: L('From 0 only j = 0 is possible, giving 3. From 3, taking j = 2 odd positions gives 2. From 2, j = 0 gives 5.', '০ থেকে শুধু j = ০ সম্ভব, ফল ৩। ৩ থেকে j = ২ নিলে ২। ২ থেকে j = ০ নিলে ৫।') },
      { state: 'query 1: positions 5 4 3', text: L('All even, so j = 0: take three even positions. They become odd.', 'সব জোড়, তাই j = ০: তিনটি জোড় অবস্থান নাও। সেগুলো বিজোড় হয়।') },
      { state: 'query 2: positions 3 4 2', text: L('j = 2: positions 3 and 4 from the odd list, 2 from the even list.', 'j = ২: বিজোড় তালিকা থেকে ৩ ও ৪, জোড় তালিকা থেকে ২।') },
      { state: 'query 3: positions 4 3 1', text: L('j = 0: three even positions. Now all five are odd.', 'j = ০: তিনটি জোড় অবস্থান। এখন পাঁচটিই বিজোড়।') },
    ],
  },
  complexity: { time: 'O(n · k) for the BFS plus O(n) per query', space: 'O(n)', why: L('n + 1 states, at most k + 1 moves each, and at most a few hundred questions of size k.', 'n + ১ অবস্থা, প্রতিটিতে সর্বোচ্চ k + ১ চাল, আর k আকারের সর্বোচ্চ কয়েকশো প্রশ্ন।') },
  solutions: [
    {
      id: 'count-bfs',
      kind: 'optimal',
      title: L('BFS on the number of odd-covered positions', 'বিজোড়-ঢাকা অবস্থানের সংখ্যার ওপর BFS'),
      idea: L('Only how many positions are odd matters, so the state space has n + 1 states instead of 2ⁿ.', 'শুধু কয়টি অবস্থান বিজোড় তা-ই জরুরি, তাই অবস্থার সংখ্যা ২ⁿ নয়, n + ১।'),
      explain: [
        L('By symmetry every choice of which odd positions to flip is equivalent, so a representative choice (the last ones in the lists) is as good as any.', 'প্রতিসাম্যে কোন বিজোড় অবস্থানগুলো উল্টানো হবে তার প্রতিটি পছন্দ সমতুল্য, তাই প্রতিনিধি পছন্দ (তালিকার শেষের গুলো) অন্যটির মতোই ভালো।'),
        L('BFS finds the fewest queries, which is the only way to stay under the limit for the hardest values of n and k.', 'BFS সবচেয়ে কম প্রশ্ন দেয়, আর n ও k-র কঠিনতম মানে সীমার ভেতরে থাকার একমাত্র উপায় এটাই।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> dist(n + 1, -1), par(n + 1, -1), parj(n + 1, 0);
    queue<int> q;
    dist[0] = 0;
    q.push(0);
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        for (int j = max(0, k - (n - x)); j <= min(k, x); j++) {
            int y = x - j + (k - j);
            if (dist[y] < 0) {
                dist[y] = dist[x] + 1;
                par[y] = x;
                parj[y] = j;
                q.push(y);
            }
        }
    }
    if (dist[n] < 0) {
        cout << -1 << endl;
        return 0;
    }
    vector<int> js;
    for (int v = n; v != 0; v = par[v]) js.push_back(parj[v]);
    reverse(js.begin(), js.end());
    vector<int> odd, even;
    for (int i = 1; i <= n; i++) even.push_back(i);
    int result = 0;
    for (int j : js) {
        vector<int> fromOdd, fromEven, ask;
        for (int t = 0; t < j; t++) {
            fromOdd.push_back(odd.back());
            odd.pop_back();
        }
        for (int t = 0; t < k - j; t++) {
            fromEven.push_back(even.back());
            even.pop_back();
        }
        cout << "?";
        for (int v : fromOdd) cout << " " << v;
        for (int v : fromEven) cout << " " << v;
        cout << endl;
        int r;
        cin >> r;
        result ^= r;
        for (int v : fromOdd) even.push_back(v);
        for (int v : fromEven) odd.push_back(v);
    }
    cout << "! " << result << endl;
}
`,
      time: 'O(n · k)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('BFS over the real set of odd positions (bitmasks)', 'বিজোড় অবস্থানের আসল সেটের ওপর BFS (বিটমাস্ক)'),
      idea: L('The same search without the symmetry: 2ⁿ states, only for n up to about 20.', 'প্রতিসাম্য ছাড়া একই সার্চ: ২ⁿ অবস্থা, শুধু প্রায় n ≤ ২০-র জন্য।'),
      explain: [L('A state is the exact mask of odd positions and a move xors in any mask with k bits. It is obviously correct and shows why collapsing the masks to a single count is the right idea: n = 500 would need 2⁵⁰⁰ states.', 'অবস্থা হলো বিজোড় অবস্থানের সঠিক মাস্ক আর চাল হলো k বিটের যেকোনো মাস্ক xor করা। এটি সুস্পষ্টভাবে সঠিক, আর দেখায় কেন মাস্ককে একটিমাত্র সংখ্যায় গুটিয়ে আনা সঠিক ধারণা: n = ৫০০ হলে ২⁵⁰⁰ অবস্থা লাগত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    int full = (1 << n) - 1;
    vector<int> moves;
    for (int m = 1; m <= full; m++)
        if (__builtin_popcount(m) == k) moves.push_back(m);
    vector<int> par(full + 1, -1), via(full + 1, 0);
    queue<int> q;
    par[0] = 0;
    q.push(0);
    while (!q.empty() && par[full] < 0) {
        int s = q.front();
        q.pop();
        for (int m : moves) {
            int t = s ^ m;
            if (par[t] < 0) {
                par[t] = s;
                via[t] = m;
                q.push(t);
            }
        }
    }
    if (par[full] < 0) {
        cout << -1 << endl;
        return 0;
    }
    vector<int> path;
    for (int s = full; s != 0; s = par[s]) path.push_back(via[s]);
    int result = 0;
    for (int m : path) {
        cout << "?";
        for (int i = 0; i < n; i++)
            if (m >> i & 1) cout << " " << i + 1;
        cout << endl;
        int r;
        cin >> r;
        result ^= r;
    }
    cout << "! " << result << endl;
}
`,
      time: 'O(2ⁿ · C(n, k))',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['io-basics', 'vector', 'bitwise-and', 'bit-shift', 'popcount'],
    },
  ],
  tests: [
    { input: '2 1\n5 9', output: 'OK', source: 'own', note: L('k = 1: one question per position, n = 2.', 'k = ১: প্রতি অবস্থানে এক প্রশ্ন, n = ২।') },
    { input: '4 2\n1 2 4 8', output: 'OK', source: 'own', note: L('k = 2, n even: two questions.', 'k = ২, n জোড়: দুই প্রশ্ন।') },
    { input: '5 4\n7 7 1 2 3', output: 'OK', source: 'own', note: L('k = n − 1: the plan needs overlapping questions.', 'k = n − ১: পরিকল্পনায় একে অপরকে ছোঁয়া প্রশ্ন লাগে।') },
    { input: '6 4\n10 20 30 40 50 60', output: 'OK', source: 'own', note: L('A longer BFS path with mixed j values.', 'মিশ্র j মানের দীর্ঘতর BFS পথ।') },
    { input: '3 2\n1 2 3', output: 'OK', source: 'own', note: L('Impossible: the total number of coverings is even.', 'অসম্ভব: মোট ঢাকার সংখ্যা জোড়।') },
    { input: '7 4\n3 1 4 1 5 9 2', output: 'OK', source: 'own', note: L('Odd n with even k: only possible when the extra coverings can fall on a position more than once.', 'বিজোড় n ও জোড় k: শুধু তখনই সম্ভব যখন বাড়তি ঢাকা একই অবস্থানে একাধিকবার পড়তে পারে।') },
  ],
  pitfalls: [
    L('Asking for a fixed block pattern (positions 1…k, then k+1…2k, …): it fails when k does not divide n, and it wastes questions otherwise.', 'স্থির ব্লক ধরণ (১…k, তারপর k+১…২k, …) জিজ্ঞেস করা: k, n-কে ভাগ না করলে ব্যর্থ হয়, নয়তো প্রশ্ন নষ্ট করে।'),
    L('Deciding -1 by guessing parity rules: run the BFS and trust it, because the answer depends on n and k together.', 'জোড়-বিজোড়ের নিয়ম আন্দাজ করে -১ ঠিক করা: BFS চালাও আর তাতেই ভরসা রাখো, কারণ উত্তর n ও k-র সম্মিলিত ওপর নির্ভর করে।'),
    L('Allowing a j that takes more odd positions than exist, or more even positions than exist: keep max(0, k − (n − x)) ≤ j ≤ min(k, x).', 'যত বিজোড় অবস্থান আছে তার চেয়ে বেশি, বা যত জোড় আছে তার চেয়ে বেশি নেওয়ার j অনুমতি দেওয়া: max(০, k − (n − x)) ≤ j ≤ min(k, x) রাখো।'),
    L('Forgetting to move the used positions to the other list after each question.', 'প্রতি প্রশ্নের পর ব্যবহৃত অবস্থানগুলো উল্টো তালিকায় সরাতে ভুলে যাওয়া।'),
    L('Asking duplicate positions inside one question: the judge needs k distinct ones.', 'এক প্রশ্নে পুনরাবৃত্ত অবস্থান: জাজ k টি ভিন্ন অবস্থান চায়।'),
  ],
  related: [
    { id: '1534D', name: 'Lost Tree', why: L('The same contest: another structure rebuilt from questions.', 'একই কনটেস্ট: প্রশ্ন থেকে আরেকটি কাঠামো পুনর্গঠন।') },
    { id: '1556D', name: 'Take a Guess', why: L('Another interactive problem about xor-like combinations.', 'xor-জাতীয় সমন্বয় নিয়ে আরেকটি ইন্টারঅ্যাকটিভ সমস্যা।') },
  ],
  toolkit: ['io-basics', 'vector', 'min-max'],
};

// ───────────────────────────────────────────── 1762D
export const p1762D: ProblemEntry = {
  id: '1762D',
  contestId: 1762,
  index: 'D',
  name: 'GCD Queries',
  rating: 2100,
  interactive: true,
  tags: ['constructive', 'interactive', 'math', 'number-theory'],
  why: L(
    'gcd(0, c) = c is the largest value gcd(a, c) can take for any a, so comparing two gcds against the same third number eliminates one of two candidates for the zero. A single sweep keeps two candidates and uses two questions per element.',
    'gcd(০, c) = c, যা যেকোনো a-র জন্য gcd(a, c)-এর সর্বোচ্চ মান, তাই একই তৃতীয় সংখ্যার সাথে দুটি gcd তুলনা করলে শূন্যের দুই প্রার্থীর একটি বাদ পড়ে। একটি স্ক্যানে দুই প্রার্থী রেখে প্রতি উপাদানে দুটি প্রশ্ন লাগে।',
  ),
  statement: L(
    'The judge hides a permutation p of 0, 1, …, n − 1. A question "? i j" (i ≠ j) is answered with gcd(p_i, p_j), where gcd(x, 0) = x. With at most 2n questions, print "! x y" (the two positions may be equal) such that p_x = 0 or p_y = 0. (On Codeforces the judge then answers 1 or −1 and one run has several test cases; ours plays one case, and the program should still read that answer.)',
    'জাজ ০, ১, …, n − ১-এর একটি পারমুটেশন p লুকিয়েছে। প্রশ্ন "? i j" (i ≠ j)-এর উত্তর gcd(p_i, p_j), যেখানে gcd(x, ০) = x। সর্বোচ্চ ২n প্রশ্নে "! x y" প্রিন্ট করো (অবস্থান দুটি সমানও হতে পারে) যাতে p_x = ০ বা p_y = ০। (কোডফোর্সেসে জাজ এরপর ১ বা −১ বলে আর একটি রানে কয়েকটি টেস্ট থাকে; আমাদেরটি একটি টেস্ট খেলে, তবু প্রোগ্রামের সেই উত্তর পড়া উচিত।)',
  ),
  input: L('First line: the number of test cases (1 here), then n. After each question, one integer: the gcd.', 'প্রথম লাইনে টেস্টের সংখ্যা (এখানে ১), তারপর n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: gcd।'),
  output: L('Questions "? i j", then "! x y". Flush after every line.', 'প্রশ্ন "? i j", শেষে "! x y"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2·10⁴ over all test cases, at most 2n questions per test case', 'সব টেস্ট মিলিয়ে ২ ≤ n ≤ ২·১০⁴, প্রতি টেস্টে সর্বোচ্চ ২n প্রশ্ন')] },
  samples: [
    {
      input: '5\n2 4 0 1 3',
      output: 'OK',
      transcript: '< 1\n< 5\n> ? 1 3\n< 2\n> ? 2 3\n< 4\n> ? 3 4\n< 1\n> ? 2 4\n< 1\n> ? 3 5\n< 3\n> ? 2 5\n< 1\n> ! 3 5',
      explain: L('The hidden permutation is 2 4 0 1 3 (the Codeforces sample). Candidates start as positions 1 and 2. Against position 3: gcd(p_1, p_3) = 2 is smaller than gcd(p_2, p_3) = 4, so position 1 cannot hold 0 and position 3 replaces it. Against position 4 both gcds are 1, so position 4 is not the zero and nothing changes. Against position 5: 3 versus 1, so position 2 is dropped and 5 takes its place. The final pair is (3, 5), and p_3 = 0. This run uses 6 of the 10 allowed questions. ' + made.en, 'লুকানো পারমুটেশন ২ ৪ ০ ১ ৩ (কোডফোর্সেসের স্যাম্পল)। প্রার্থী শুরুতে অবস্থান ১ ও ২। অবস্থান ৩-এর বিপরীতে: gcd(p_১, p_৩) = ২, gcd(p_২, p_৩) = ৪-এর ছোট, তাই অবস্থান ১ শূন্য হতে পারে না আর ৩ তার জায়গা নেয়। অবস্থান ৪-এর বিপরীতে দুটি gcd-ই ১, তাই ৪ শূন্য নয় আর কিছু বদলায় না। অবস্থান ৫-এর বিপরীতে: ৩ বনাম ১, তাই অবস্থান ২ বাদ পড়ে আর ৫ তার জায়গা নেয়। শেষ জোড়া (৩, ৫), আর p_৩ = ০। এই রানে অনুমোদিত ১০টির মধ্যে ৬টি প্রশ্ন লাগে। ' + made.bn),
    },
  ],
  observation: L(
    'Suppose the zero is at x. Then gcd(p_x, c) = c, which is at least gcd(a, c) for every a. So if gcd(p_x, c) < gcd(p_y, c) for some c, then x is not the zero. If the two gcds are equal then c cannot be the zero, because with c = 0 they would be p_x and p_y, which are different.',
    'ধরো শূন্য আছে x-এ। তাহলে gcd(p_x, c) = c, যা প্রতিটি a-র জন্য gcd(a, c)-এর চেয়ে ছোট নয়। তাই কোনো c-র জন্য gcd(p_x, c) < gcd(p_y, c) হলে x শূন্য নয়। দুই gcd সমান হলে c শূন্য হতে পারে না, কারণ c = ০ হলে gcd দুটি হতো p_x আর p_y, যারা ভিন্ন।',
  ),
  approach: [
    L('Keep two candidate positions x = 1 and y = 2: the zero is among them or among the positions not seen yet.', 'দুটি প্রার্থী অবস্থান x = ১ আর y = ২ রাখো: শূন্য এ দুটির মধ্যে, বা এখনও না দেখা অবস্থানগুলোর মধ্যে।'),
    L('For each new position z = 3 … n ask g₁ = gcd(p_x, p_z) and g₂ = gcd(p_y, p_z).', 'প্রতিটি নতুন অবস্থান z = ৩ … n-এর জন্য g₁ = gcd(p_x, p_z) আর g₂ = gcd(p_y, p_z) জিজ্ঞেস করো।'),
    L('If g₁ < g₂, x cannot be the zero: replace x by z. If g₁ > g₂, replace y by z. If they are equal, z is not the zero: keep both candidates and drop z.', 'g₁ < g₂ হলে x শূন্য হতে পারে না: x-কে z দিয়ে বদলাও। g₁ > g₂ হলে y-কে বদলাও। সমান হলে z শূন্য নয়: দুই প্রার্থী রাখো আর z বাদ দাও।'),
    L('After the sweep print "! x y". That is 2(n − 2) questions.', 'স্ক্যানের পর "! x y" প্রিন্ট করো। এতে ২(n − ২) প্রশ্ন।'),
  ],
  walkthrough: {
    input: '5\n2 4 0 1 3',
    steps: [
      { state: 'x = 1, y = 2, z = 3: (2, 4)', text: L('g₁ < g₂, so x becomes 3. Candidates: 3 and 2.', 'g₁ < g₂, তাই x হয় ৩। প্রার্থী: ৩ ও ২।') },
      { state: 'z = 4: (1, 1)', text: L('Equal, nothing changes.', 'সমান, কিছু বদলায় না।') },
      { state: 'z = 5: (3, 1)', text: L('g₁ > g₂, so y becomes 5. Candidates: 3 and 5, and p_3 = 0.', 'g₁ > g₂, তাই y হয় ৫। প্রার্থী: ৩ ও ৫, আর p_৩ = ০।') },
    ],
  },
  complexity: { time: 'O(n) questions', space: 'O(1)', why: L('Two questions per new position.', 'প্রতি নতুন অবস্থানে দুই প্রশ্ন।') },
  solutions: [
    {
      id: 'eliminate',
      kind: 'optimal',
      title: L('Two candidates for the zero, dropped by comparing gcds', 'শূন্যের দুই প্রার্থী, gcd তুলনা করে বাদ'),
      idea: L('A zero is the best possible partner for any c, so it can never lose a comparison.', 'যেকোনো c-র জন্য শূন্যই সেরা সঙ্গী, তাই সে কখনও তুলনায় হারে না।'),
      explain: [
        L('The invariant is: the zero is one of the two candidates or one of the positions not processed yet. Each step keeps it true and spends exactly two questions.', 'ইনভেরিয়ান্ট: শূন্য দুই প্রার্থীর একটি, বা এখনও না দেখা অবস্থানের একটি। প্রতি ধাপে এটি সত্য থাকে আর ঠিক দুই প্রশ্ন খরচ হয়।'),
        L('Because x = y is allowed in the answer, two candidates are all that is needed: the output does not have to name the zero itself.', 'উত্তরে x = y চলে, তাই দুই প্রার্থীই যথেষ্ট: আউটপুটে শূন্যের নাম বলা জরুরি নয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int i, int j) {
    cout << "? " << i << " " << j << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int x = 1, y = 2;
        for (int z = 3; z <= n; z++) {
            int g1 = ask(x, z);
            int g2 = ask(y, z);
            if (g1 < g2) x = z;
            else if (g1 > g2) y = z;
        }
        cout << "! " << x << " " << y << endl;
        int verdict;
        cin >> verdict;
    }
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'all-pairs',
      kind: 'brute',
      title: L('Ask every pair and look for the largest gcds', 'প্রতিটি জোড়া জিজ্ঞেস করে বৃহত্তম gcd খোঁজা'),
      idea: L('For each position take the largest gcd it ever gives; the zero and the number n − 1 are the only two positions that reach n − 1.', 'প্রতিটি অবস্থানের জন্য সে যে বৃহত্তম gcd দেয় তা নাও; শূন্য আর সংখ্যা n − ১-ই একমাত্র দুটি অবস্থান যারা n − ১ ছোঁয়।'),
      explain: [L('gcd(a, b) = n − 1 forces n − 1 to divide a, and a ≤ n − 1, so a is 0 or n − 1. Printing those two positions is therefore a correct answer. It needs n(n − 1)/2 questions, far above 2n for n above 5.', 'gcd(a, b) = n − ১ হলে n − ১, a-কে ভাগ করে আর a ≤ n − ১, তাই a হয় ০ নয়তো n − ১। ওই দুই অবস্থান প্রিন্ট করা তাই সঠিক উত্তর। এতে n(n − ১)/২ প্রশ্ন লাগে, n ৫-এর বেশি হলে ২n-এর বহু ওপরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> best(n + 1, 0);
        for (int i = 1; i <= n; i++)
            for (int j = i + 1; j <= n; j++) {
                cout << "? " << i << " " << j << endl;
                int g;
                cin >> g;
                best[i] = max(best[i], g);
                best[j] = max(best[j], g);
            }
        vector<int> hit;
        for (int i = 1; i <= n; i++)
            if (best[i] == n - 1) hit.push_back(i);
        cout << "! " << hit[0] << " " << hit[1] << endl;
        int verdict;
        cin >> verdict;
    }
}
`,
      time: 'O(n²) questions',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics', 'vector', 'min-max'],
    },
  ],
  tests: [
    { input: '2\n0 1', output: 'OK', source: 'own', note: L('n = 2: no question is needed, any pair is right.', 'n = ২: কোনো প্রশ্ন লাগে না, যেকোনো জোড়া ঠিক।') },
    { input: '3\n2 0 1', output: 'OK', source: 'own', note: L('n = 3 with the zero in the middle.', 'n = ৩, শূন্য মাঝখানে।') },
    { input: '5\n2 4 0 1 3', output: 'OK', source: 'sample', note: L('The Codeforces example.', 'কোডফোর্সেসের উদাহরণ।') },
    { input: '6\n5 4 3 2 1 0', output: 'OK', source: 'own', note: L('Zero last, descending values.', 'শূন্য শেষে, মান নিচের দিকে।') },
    { input: '7\n0 6 5 4 3 2 1', output: 'OK', source: 'own', note: L('Zero first.', 'শূন্য প্রথমে।') },
    { input: '8\n4 2 6 0 7 1 3 5', output: 'OK', source: 'own', note: L('Many equal gcds of 1 and 2 along the way.', 'পথে ১ ও ২-এর অনেক সমান gcd।') },
  ],
  pitfalls: [
    L('Dropping a candidate when the gcds are equal: equal gcds say nothing about x and y, only that z is not the zero.', 'gcd সমান হলে প্রার্থী বাদ দেওয়া: সমান gcd x আর y সম্পর্কে কিছু বলে না, শুধু বলে z শূন্য নয়।'),
    L('Dropping the wrong one: the SMALLER gcd belongs to the candidate that cannot be the zero.', 'ভুলটি বাদ দেওয়া: ছোট gcd যার, সে-ই শূন্য হতে পারে না।'),
    L('Asking (x, x) when x equals z: the candidates are always earlier positions, so z is new.', 'x, z-র সমান হলে (x, x) জিজ্ঞেস: প্রার্থী সবসময় আগের অবস্থান, তাই z নতুন।'),
    L('Trying to identify the zero uniquely: the problem only asks for a pair that contains it.', 'শূন্যকে একক ভাবে চিহ্নিত করার চেষ্টা: সমস্যা শুধু এমন একটি জোড়া চায় যাতে শূন্য আছে।'),
  ],
  related: [
    { id: '1407C', name: 'Chocolate Bunny', why: L('Another permutation found from an arithmetic answer.', 'গাণিতিক উত্তর থেকে আরেকটি পারমুটেশন খোঁজা।') },
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Narrowing candidates with comparisons.', 'তুলনা দিয়ে প্রার্থী ছাঁটা।') },
  ],
  toolkit: ['io-basics'],
};
