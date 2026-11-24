import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1236B: ProblemEntry = {
  id: '1236B',
  contestId: 1236,
  index: 'B',
  name: 'Alice and the List of Presents',
  rating: 1500,
  tags: ['combinatorics', 'math'],
  why: L('The cleanest “multiply independent choices” problem: each kind decides on its own, then fast power finishes it.', 'সবচেয়ে পরিষ্কার “স্বাধীন পছন্দ গুণ করো” প্রবলেম: প্রতিটি ধরন নিজে সিদ্ধান্ত নেয়, তারপর দ্রুত ঘাত কাজ শেষ করে।'),
  statement: L('There are n kinds of presents (unlimited copies of each) and m distinct boxes. Pack them so that no box holds two presents of the same kind and every kind appears in at least one box. Boxes may stay empty. Count the packings modulo 10⁹ + 7.', 'n ধরনের উপহার আছে (প্রতিটির অসীম কপি) আর m-টি আলাদা বাক্স। এমনভাবে প্যাক করুন যাতে কোনো বাক্সে একই ধরনের দুটি উপহার না থাকে এবং প্রতিটি ধরন অন্তত একটি বাক্সে থাকে। বাক্স খালি থাকতে পারে। প্যাকিংয়ের সংখ্যা ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('n and m.', 'n আর m।'),
  output: L('The number of packings modulo 10⁹ + 7.', 'প্যাকিংয়ের সংখ্যা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁹', '১ ≤ n, m ≤ ১০⁹')] },
  samples: [
    { input: '1 3', output: '7', explain: L('One kind, three boxes: any non-empty subset of boxes, 2³ − 1 = 7.', 'এক ধরন, তিন বাক্স: বাক্সের যেকোনো অশূন্য উপসেট, ২³ − ১ = ৭।') },
    { input: '2 2', output: '9', explain: L('Each kind picks one of 3 non-empty subsets: 3 · 3 = 9.', 'প্রতিটি ধরন ৩টি অশূন্য উপসেটের একটি বাছে: ৩ · ৩ = ৯।') },
  ],
  observation: L('A packing is fully described by, for each kind, the set of boxes holding it. That set can be any non-empty subset of the m boxes (2ᵐ − 1 choices), and different kinds never affect each other. So the answer is (2ᵐ − 1)ⁿ.', 'একটি প্যাকিং পুরোপুরি বোঝা যায় প্রতিটি ধরনের জন্য কোন কোন বাক্সে সেটি আছে তা দিয়ে। সেই সেট m বাক্সের যেকোনো অশূন্য উপসেট হতে পারে (২ᵐ − ১টি পছন্দ), আর আলাদা ধরন একে অপরকে প্রভাবিত করে না। তাই উত্তর (২ᵐ − ১)ⁿ।'),
  approach: [
    L('Compute 2ᵐ mod p with fast exponentiation and subtract 1 (add p first so it stays non-negative).', 'দ্রুত ঘাত দিয়ে ২ᵐ mod p বের করুন আর ১ বাদ দিন (ঋণাত্মক না হতে আগে p যোগ করুন)।'),
    L('Raise that to the n-th power, again with fast exponentiation.', 'আবার দ্রুত ঘাত দিয়ে সেটিকে n-তম ঘাতে তুলুন।'),
  ],
  walkthrough: {
    input: '2 2',
    steps: [
      { state: '2² − 1 = 3', text: L('Kind 1 can be in box 1, box 2, or both.', 'ধরন ১ থাকতে পারে বাক্স ১-এ, বাক্স ২-এ, বা দুটিতেই।') },
      { state: '3² = 9', text: L('Kind 2 chooses independently, so multiply.', 'ধরন ২ স্বাধীনভাবে বাছে, তাই গুণ।') },
    ],
  },
  complexity: { time: 'O(log n + log m)', space: 'O(1)', why: L('Two fast powers.', 'দুটি দ্রুত ঘাত।') },
  solutions: [
    {
      id: 'power',
      kind: 'optimal',
      title: L('(2ᵐ − 1)ⁿ with fast power', 'দ্রুত ঘাতে (২ᵐ − ১)ⁿ'),
      idea: L('Count choices per kind, then multiply n equal factors.', 'প্রতি ধরনের পছন্দ গুনুন, তারপর n-টি সমান উৎপাদক গুণ করুন।'),
      explain: [
        L('The rule “no box holds two of the same kind” means a kind is either in a box once or not at all, so a kind’s placement is a subset of boxes. “Every kind appears” removes only the empty subset.', '“কোনো বাক্সে একই ধরনের দুটি নয়” মানে একটি ধরন একটি বাক্সে হয় একবার আছে, নয় নেই, তাই একটি ধরনের অবস্থান বাক্সের একটি উপসেট। “প্রতিটি ধরন থাকবে” শুধু খালি উপসেট বাদ দেয়।'),
        L('With n and m up to 10⁹, both powers need binary exponentiation; a loop of n multiplications would be far too slow.', 'n আর m ১০⁹ পর্যন্ত হওয়ায় দুটি ঘাতেই বাইনারি এক্সপোনেনশিয়েশন লাগে; n-বার গুণের লুপ অনেক ধীর।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

int main() {
    long long n, m;
    cin >> n >> m;
    // Each kind independently picks a non-empty set of boxes: 2^m - 1 ways.
    long long perKind = (power(2, m) - 1 + MOD) % MOD;
    cout << power(perKind, n) << "\n";
    return 0;
}
`,
      time: 'O(log n + log m)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every packing', 'প্রতিটি প্যাকিং চেষ্টা'),
      idea: L('An n × m grid of yes/no bits; count grids where every row has a 1.', 'হ্যাঁ/না বিটের n × m গ্রিড; যেসব গ্রিডে প্রতিটি সারিতে একটি ১ আছে তা গুনুন।'),
      explain: [L('Bit (i, j) says whether kind i is in box j. Checking all 2ⁿᵐ grids needs no insight at all, which makes it a good referee for the formula on tiny inputs.', 'বিট (i, j) বলে ধরন i বাক্স j-তে আছে কি না। সব ২ⁿᵐ গ্রিড যাচাইয়ে কোনো অন্তর্দৃষ্টি লাগে না, তাই ক্ষুদ্র ইনপুটে সূত্রের ভালো বিচারক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    if (n * m > 20) { cout << "\n"; return 0; }  // only for tiny inputs
    // Bit (i*m + j) set = a present of kind i is in box j.
    long long count = 0;
    for (long long mask = 0; mask < (1LL << (n * m)); mask++) {
        bool ok = true;
        for (int i = 0; i < n && ok; i++) {
            bool used = false;
            for (int j = 0; j < m; j++)
                if (mask >> (i * m + j) & 1) used = true;
            ok = used;  // every kind must appear somewhere
        }
        if (ok) count++;
    }
    cout << count % 1000000007 << "\n";
    return 0;
}
`,
      time: 'O(2ⁿᵐ · nm)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '1 3', output: '7', source: 'sample', note: sample(1) },
    { input: '2 2', output: '9', source: 'sample', note: sample(2) },
    { input: '1 1', output: '1', source: 'own', note: L('One kind, one box.', 'এক ধরন, এক বাক্স।') },
    { input: '1000000000 1000000000', output: '751201557', source: 'own', note: L('Largest input: both powers must be fast.', 'সবচেয়ে বড় ইনপুট: দুটি ঘাতই দ্রুত হতে হবে।') },
  ],
  pitfalls: [
    L('Writing (power(2, m) − 1) % MOD without adding MOD: if 2ᵐ ≡ 0 it would go negative (it cannot here, but the habit matters).', 'MOD যোগ না করে (power(2, m) − 1) % MOD লেখা: ২ᵐ ≡ ০ হলে ঋণাত্মক হতো (এখানে হয় না, কিন্তু অভ্যাসটি জরুরি)।'),
    L('Reading n, m into int and multiplying before reducing.', 'n, m int-এ পড়ে মডুলো নেওয়ার আগেই গুণ করা।'),
  ],
  related: [
    { id: '1391C', name: 'Cyclic Permutations', why: L('Another count that is “total minus a power of two”.', 'আরেকটি গণনা যা “মোট বিয়োগ দুইয়ের ঘাত”।') },
    { id: '1288C', name: 'Two Arrays', why: L('Counting with a closed formula.', 'সরাসরি সূত্রে গণনা।') },
  ],
  toolkit: ['mod-pow'],
};

export const p1391C: ProblemEntry = {
  id: '1391C',
  contestId: 1391,
  index: 'C',
  name: 'Cyclic Permutations',
  rating: 1500,
  tags: ['combinatorics', 'dp', 'graphs', 'math'],
  why: L('Count the complement: the acyclic permutations turn out to be exactly the unimodal ones, and there are 2ⁿ⁻¹ of those.', 'পরিপূরক গুনুন: অচক্রীয় পারমুটেশনগুলো ঠিক একশৃঙ্গ (আগে বাড়ে পরে কমে) পারমুটেশন, আর সেগুলো ২ⁿ⁻¹টি।'),
  statement: L('For a permutation p of 1 … n build a graph: for every i, connect i to the largest j < i with pⱼ > pᵢ, and to the smallest j > i with pⱼ > pᵢ (when they exist). A permutation is cyclic if the graph has a simple cycle. Count cyclic permutations modulo 10⁹ + 7.', '১ … n-এর পারমুটেশন p-এর জন্য একটি গ্রাফ বানান: প্রতিটি i-কে যুক্ত করুন সবচেয়ে বড় j < i-এর সঙ্গে যেখানে pⱼ > pᵢ, আর সবচেয়ে ছোট j > i-এর সঙ্গে যেখানে pⱼ > pᵢ (থাকলে)। গ্রাফে সরল চক্র থাকলে পারমুটেশনটি চক্রীয়। চক্রীয় পারমুটেশন ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('n.', 'n।'),
  output: L('The count modulo 10⁹ + 7.', 'সংখ্যাটি ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁶', '৩ ≤ n ≤ ১০⁶')] },
  samples: [
    { input: '4', output: '16', explain: L('4! − 2³ = 24 − 8 = 16.', '৪! − ২³ = ২৪ − ৮ = ১৬।') },
    { input: '583291', output: '135712853', explain: L('Same formula, computed modulo 10⁹ + 7.', 'একই সূত্র, ১০⁹ + ৭ মডুলো।') },
  ],
  observation: L('If some pᵢ has larger values on both sides, then i, its left neighbour and its right neighbour form a triangle, since the left neighbour also links to the right one. So a permutation has no cycle exactly when no element has larger values on both sides: the values rise to n and then fall. Each value below n goes either left or right of n, giving 2ⁿ⁻¹ acyclic permutations.', 'কোনো pᵢ-এর দুই পাশেই বড় মান থাকলে i, তার বাম সংযোগ আর ডান সংযোগ একটি ত্রিভুজ বানায়, কারণ বাম সংযোগটি ডান সংযোগের সঙ্গেও যুক্ত। তাই চক্র নেই ঠিক তখন যখন কোনো উপাদানের দুই পাশে বড় মান নেই: মানগুলো n পর্যন্ত বাড়ে তারপর কমে। n-এর চেয়ে ছোট প্রতিটি মান n-এর বামে বা ডানে যায়, তাই ২ⁿ⁻¹টি অচক্রীয় পারমুটেশন।'),
  approach: [
    L('Total permutations: n!.', 'মোট পারমুটেশন: n!।'),
    L('Subtract the 2ⁿ⁻¹ unimodal ones, modulo 10⁹ + 7.', '২ⁿ⁻¹টি একশৃঙ্গ পারমুটেশন বাদ দিন, ১০⁹ + ৭ মডুলো।'),
  ],
  walkthrough: {
    input: '4',
    steps: [
      { state: 'p = 3 1 4 2', text: L('1 has 3 on its left and 4 on its right; 3 links to 4 too: triangle, cyclic.', '১-এর বামে ৩ আর ডানে ৪; ৩-ও ৪-এর সঙ্গে যুক্ত: ত্রিভুজ, চক্রীয়।') },
      { state: 'p = 1 3 4 2', text: L('Rises then falls: every element has a larger value on one side only. Acyclic.', 'বাড়ে তারপর কমে: প্রতিটি উপাদানের শুধু এক পাশে বড় মান। অচক্রীয়।') },
      { state: '24 − 8 = 16', text: L('Placing 1, 2, 3 left or right of 4 gives 8 unimodal permutations.', '১, ২, ৩-কে ৪-এর বামে বা ডানে বসিয়ে ৮টি একশৃঙ্গ পারমুটেশন।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One loop for n! and one for 2ⁿ⁻¹.', 'n!-এর জন্য একটি আর ২ⁿ⁻¹-এর জন্য একটি লুপ।') },
  solutions: [
    {
      id: 'complement',
      kind: 'optimal',
      title: L('n! − 2ⁿ⁻¹', 'n! − ২ⁿ⁻¹'),
      idea: L('Count acyclic permutations instead; they are the unimodal ones.', 'বরং অচক্রীয় পারমুটেশন গুনুন; সেগুলোই একশৃঙ্গ।'),
      explain: [
        L('When the target property is messy, look at its complement. Here “no cycle” forces a very rigid shape, and rigid shapes are easy to count.', 'লক্ষ্য বৈশিষ্ট্য জটিল হলে তার পরিপূরক দেখুন। এখানে “চক্র নেই” খুব কঠিন একটি আকার চাপায়, আর কঠিন আকার গোনা সহজ।'),
        L('Conversely, a unimodal permutation gives a tree: every element links only towards the peak, so there are exactly n − 1 edges and the graph is connected.', 'উল্টো দিকে, একশৃঙ্গ পারমুটেশন একটি গাছ দেয়: প্রতিটি উপাদান শুধু শীর্ষের দিকে যুক্ত হয়, তাই ঠিক n − ১টি প্রান্ত আর গ্রাফ সংযুক্ত।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

int main() {
    int n;
    cin >> n;
    long long fact = 1, pow2 = 1;
    for (int i = 1; i <= n; i++) fact = fact * i % MOD;
    for (int i = 1; i < n; i++) pow2 = pow2 * 2 % MOD;
    // Acyclic permutations are exactly the unimodal ones: 2^(n-1) of them.
    cout << (fact - pow2 + MOD) % MOD << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-arith', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Build every graph', 'প্রতিটি গ্রাফ বানানো'),
      idea: L('Enumerate permutations, add edges with a DSU and report a cycle when an edge joins an already connected pair.', 'পারমুটেশন তালিকা করুন, DSU দিয়ে প্রান্ত যোগ করুন, আর কোনো প্রান্ত আগে থেকে সংযুক্ত জোড়া জুড়লে চক্র ধরুন।'),
      explain: [L('This follows the statement literally. The same edge can be produced twice (from both ends); the DSU then sees a “cycle” of length 2, so a real solution must deduplicate. Here it cannot happen: an edge i–j is added from i only when pⱼ > pᵢ, and from j only when pᵢ > pⱼ.', 'এটি স্টেটমেন্ট হুবহু অনুসরণ করে। একই প্রান্ত দুই প্রান্ত থেকে দুবার তৈরি হতে পারত, তখন DSU দৈর্ঘ্য ২-এর “চক্র” দেখত। এখানে তা হয় না: প্রান্ত i–j i থেকে যোগ হয় শুধু pⱼ > pᵢ হলে, আর j থেকে শুধু pᵢ > pⱼ হলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int parent[20];
int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }

int main() {
    int n;
    cin >> n;
    if (n > 9) { cout << "\n"; return 0; }
    vector<int> p(n);
    iota(p.begin(), p.end(), 1);
    long long cyclic = 0;
    do {
        iota(parent, parent + n, 0);
        bool cycle = false;
        auto addEdge = [&](int a, int b) {
            int x = find(a), y = find(b);
            if (x == y) cycle = true;
            else parent[x] = y;
        };
        for (int i = 0; i < n; i++) {
            for (int j = i - 1; j >= 0; j--)  // largest j < i with p[j] > p[i]
                if (p[j] > p[i]) { addEdge(i, j); break; }
            for (int j = i + 1; j < n; j++)   // smallest j > i with p[j] > p[i]
                if (p[j] > p[i]) { addEdge(i, j); break; }
        }
        if (cycle) cyclic++;
    } while (next_permutation(p.begin(), p.end()));
    cout << cyclic << "\n";
    return 0;
}
`,
      time: 'O(n! · n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '4', output: '16', source: 'sample', note: sample(1) },
    { input: '583291', output: '135712853', source: 'sample', note: sample(2) },
    { input: '3', output: '2', source: 'own', note: L('Smallest n: only 2 1 3 and 3 1 2 are cyclic.', 'সবচেয়ে ছোট n: শুধু ২ ১ ৩ আর ৩ ১ ২ চক্রীয়।') },
  ],
  pitfalls: [
    L('Forgetting + MOD after the subtraction: n! mod p can be smaller than 2ⁿ⁻¹ mod p.', 'বিয়োগের পর + MOD ভুলে যাওয়া: n! mod p ২ⁿ⁻¹ mod p-এর চেয়ে ছোট হতে পারে।'),
    L('Trying to count cyclic permutations directly; the complement is far simpler.', 'সরাসরি চক্রীয় পারমুটেশন গোনার চেষ্টা; পরিপূরক অনেক সহজ।'),
  ],
  related: [
    { id: '1236B', name: 'Alice and the List of Presents', why: L('A power of two from independent left/right choices.', 'স্বাধীন বাম/ডান পছন্দ থেকে দুইয়ের ঘাত।') },
    { id: '1207D', name: 'Number of Permutations', why: L('Another “total minus bad” count.', 'আরেকটি “মোট বিয়োগ খারাপ” গণনা।') },
  ],
  toolkit: ['mod-arith'],
};

export const p1462E2: ProblemEntry = {
  id: '1462E2',
  contestId: 1462,
  index: 'E2',
  name: 'Close Tuples (hard version)',
  rating: 1700,
  tags: ['binary-search', 'combinatorics', 'implementation', 'math', 'sortings', 'two-pointers'],
  why: L('Fix the smallest chosen element so every tuple is counted once, then choose the rest with a binomial coefficient.', 'সবচেয়ে ছোট বাছাই করা উপাদান স্থির করুন যাতে প্রতিটি টাপল একবার গোনা হয়, তারপর বাকিগুলো দ্বিপদ সহগ দিয়ে বাছুন।'),
  statement: L('Given n numbers, count the ways to choose m of them (by position, i₁ < … < iₘ) such that the maximum minus the minimum of the chosen values is at most k. Print the count modulo 10⁹ + 7. Several test cases.', 'n-টি সংখ্যা দেওয়া। তার মধ্যে m-টি (অবস্থান অনুযায়ী, i₁ < … < iₘ) বাছার উপায় গুনুন যাতে বাছাই করা মানগুলোর সর্বোচ্চ বিয়োগ সর্বনিম্ন সর্বোচ্চ k হয়। সংখ্যাটি ১০⁹ + ৭ মডুলো ছাপুন। কয়েকটি টেস্ট কেস।'),
  input: L('t; each case has n, m, k and then a₁ … aₙ.', 't; প্রতিটি কেসে n, m, k তারপর a₁ … aₙ।'),
  output: L('One count per test case.', 'প্রতি টেস্ট কেসে একটি সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σn ≤ 2·10⁵, 1 ≤ m ≤ 100, 1 ≤ k ≤ n, 1 ≤ aᵢ ≤ n', 'Σn ≤ ২·১০⁵, ১ ≤ m ≤ ১০০, ১ ≤ k ≤ n, ১ ≤ aᵢ ≤ n')] },
  samples: [
    {
      input: '4\n4 3 2\n1 2 4 3\n4 2 1\n1 1 1 1\n1 1 1\n1\n10 4 3\n5 6 1 3 2 9 8 1 2 4',
      output: '2\n6\n1\n20',
      explain: L('Case 1: {1,2,3} and {2,4,3} fit, {1,2,4} and {1,4,3} do not. Case 2: any pair of equal values, C(4,2) = 6.', 'কেস ১: {১,২,৩} আর {২,৪,৩} মানায়, {১,২,৪} আর {১,৪,৩} মানায় না। কেস ২: সমান মানের যেকোনো জোড়া, C(৪,২) = ৬।'),
    },
  ],
  observation: L('Positions do not matter for the condition, so sort the values. Count each tuple at its smallest sorted index i: every other member lies in (i, r) where r is the first index with a[r] > a[i] + k. That gives C(r − i − 1, m − 1) tuples for this i, and no tuple is counted twice.', 'শর্তের জন্য অবস্থান গুরুত্বহীন, তাই মান সাজান। প্রতিটি টাপলকে তার সবচেয়ে ছোট সাজানো সূচক i-তে গুনুন: বাকি প্রতিটি সদস্য (i, r)-এ থাকে যেখানে r প্রথম সূচক যার a[r] > a[i] + k। এই i-এর জন্য C(r − i − ১, m − ১)টি টাপল, আর কোনো টাপল দুবার গোনা হয় না।'),
  approach: [
    L('Precompute factorials and inverse factorials once, up to 2·10⁵.', 'একবারে ২·১০⁵ পর্যন্ত ফ্যাক্টরিয়াল আর ইনভার্স ফ্যাক্টরিয়াল আগে হিসাব করুন।'),
    L('Sort; for every i find r with upper_bound (or a moving pointer).', 'সাজান; প্রতিটি i-এর জন্য upper_bound (বা চলমান পয়েন্টার) দিয়ে r খুঁজুন।'),
    L('Add C(r − i − 1, m − 1).', 'C(r − i − ১, m − ১) যোগ করুন।'),
  ],
  walkthrough: {
    input: 'n = 4, m = 3, k = 2, a = 1 2 4 3',
    steps: [
      { state: 'sorted 1 2 3 4', text: L('Work on sorted values.', 'সাজানো মানে কাজ।') },
      { state: 'i = 0 (1): r = 3', text: L('Values ≤ 3 after it: 2, 3. C(2, 2) = 1.', 'এর পরে ≤ ৩ মান: ২, ৩। C(২, ২) = ১।') },
      { state: 'i = 1 (2): r = 4', text: L('Values ≤ 4 after it: 3, 4. C(2, 2) = 1.', 'এর পরে ≤ ৪ মান: ৩, ৪। C(২, ২) = ১।') },
      { state: 'i = 2, 3', text: L('Fewer than 2 elements remain: 0. Total 2.', '২-এর কম উপাদান বাকি: ০। মোট ২।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Sorting plus one binary search per index.', 'সাজানো আর প্রতি সূচকে একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'binsearch',
      kind: 'optimal',
      title: L('Sort, upper_bound, binomial', 'সাজানো, upper_bound, দ্বিপদ'),
      idea: L('Anchor every tuple at its smallest element.', 'প্রতিটি টাপলকে তার সবচেয়ে ছোট উপাদানে নোঙর করুন।'),
      explain: [
        L('The danger in counting problems is double counting. Choosing a canonical representative (here the leftmost element in sorted order) makes each tuple belong to exactly one i.', 'গণনা প্রবলেমের বিপদ হলো দুবার গোনা। একটি নির্দিষ্ট প্রতিনিধি বাছাই (এখানে সাজানো ক্রমে সবচেয়ে বামের উপাদান) প্রতিটি টাপলকে ঠিক একটি i-এর সঙ্গে যুক্ত করে।'),
        L('Equal values are fine: ties are broken by sorted index, which corresponds to some fixed order of the original positions.', 'সমান মান সমস্যা নয়: সাজানো সূচক দিয়ে টাই ভাঙে, যা মূল অবস্থানগুলোর একটি নির্দিষ্ট ক্রমের সঙ্গে মেলে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
const int MAXN = 200005;
long long f[MAXN], inv[MAXN];

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return f[n] * inv[k] % MOD * inv[n - k] % MOD;
}

int main() {
    f[0] = 1;
    for (int i = 1; i < MAXN; i++) f[i] = f[i - 1] * i % MOD;
    inv[MAXN - 1] = power(f[MAXN - 1], MOD - 2);
    for (int i = MAXN - 1; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;

    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m, k;
        scanf("%d %d %d", &n, &m, &k);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.begin(), a.end());
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            // a[i] is the smallest chosen value (leftmost among equals).
            int r = upper_bound(a.begin(), a.end(), a[i] + k) - a.begin();
            ans = (ans + C(r - i - 1, m - 1)) % MOD;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'mod-pow'],
    },
    {
      id: 'two-pointers',
      kind: 'method',
      title: L('Anchor at the largest, two pointers', 'সবচেয়ে বড়তে নোঙর, দুই পয়েন্টার'),
      idea: L('Fix the largest element a[r]; the others lie in [l, r) where l only moves right.', 'সবচেয়ে বড় উপাদান a[r] স্থির করুন; বাকিগুলো [l, r)-এ থাকে যেখানে l শুধু ডানে সরে।'),
      explain: [L('The mirror image of the first idea. As r grows, the smallest allowed value a[r] − k grows too, so l never moves back and the scan is linear after sorting.', 'প্রথম ধারণার আয়না-প্রতিবিম্ব। r বাড়লে সবচেয়ে ছোট অনুমোদিত মান a[r] − k-ও বাড়ে, তাই l কখনো পিছায় না আর সাজানোর পর স্ক্যান রৈখিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m, k;
        scanf("%d %d %d", &n, &m, &k);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        sort(a.begin(), a.end());
        vector<long long> f(n + 1), inv(n + 1);
        f[0] = 1;
        for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
        inv[n] = power(f[n], MOD - 2);
        for (int i = n; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
        auto C = [&](int x, int y) { return (y < 0 || y > x) ? 0LL : f[x] * inv[y] % MOD * inv[x - y] % MOD; };

        // Fix the largest chosen element a[r]; l walks right while a[r] - a[l] > k.
        long long ans = 0;
        for (int l = 0, r = 0; r < n; r++) {
            while (a[r] - a[l] > k) l++;
            ans = (ans + C(r - l, m - 1)) % MOD;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every subset of size m', 'm আকারের প্রতিটি উপসেট'),
      idea: L('Enumerate bitmasks with m bits and check max − min.', 'm বিটের বিটমাস্ক তালিকা করে সর্বোচ্চ − সর্বনিম্ন যাচাই।'),
      explain: [L('Exponential, but it counts positions directly and so checks the tie handling of the fast solutions.', 'এক্সপোনেনশিয়াল, কিন্তু সরাসরি অবস্থান গোনে, তাই দ্রুত সমাধানের টাই সামলানো যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m, k;
        cin >> n >> m >> k;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        if (n > 16) { cout << "\n"; continue; }
        long long count = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            if (__builtin_popcount(mask) != m) continue;
            int lo = INT_MAX, hi = INT_MIN;
            for (int i = 0; i < n; i++)
                if (mask >> i & 1) lo = min(lo, a[i]), hi = max(hi, a[i]);
            if (hi - lo <= k) count++;
        }
        cout << count % 1000000007 << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['popcount'],
    },
  ],
  tests: [
    { input: '4\n4 3 2\n1 2 4 3\n4 2 1\n1 1 1 1\n1 1 1\n1\n10 4 3\n5 6 1 3 2 9 8 1 2 4', output: '2\n6\n1\n20', source: 'sample', note: sample(1) },
    { input: '1\n3 3 1\n1 2 3', output: '0', source: 'own', note: L('The only triple spans 2 > k.', 'একমাত্র ত্রয়ীর বিস্তার ২ > k।') },
  ],
  pitfalls: [
    L('Recomputing factorials for every test case up to 2·10⁵: with t up to 2·10⁵ that is too slow. Precompute once (or only up to n).', 'প্রতি টেস্ট কেসে ২·১০⁵ পর্যন্ত ফ্যাক্টরিয়াল আবার হিসাব: t ২·১০⁵ পর্যন্ত হলে খুব ধীর। একবার আগে হিসাব করুন (বা শুধু n পর্যন্ত)।'),
    L('Counting C(r − i, m) from each i: that counts tuples without i as well, so tuples get counted many times.', 'প্রতিটি i থেকে C(r − i, m) গোনা: তাতে i ছাড়া টাপলও গোনা হয়, ফলে টাপল বহুবার গোনা হয়।'),
  ],
  related: [
    { id: '1462E1', name: 'Close Tuples (easy version)', why: L('m = 3, k = 2 with exact 64-bit counts.', 'm = ৩, k = ২, নিখুঁত ৬৪-বিট সংখ্যা।') },
    { id: '1420D', name: 'Rescue Nibel!', why: L('Anchor each group at one element and choose the rest.', 'প্রতিটি দলকে একটি উপাদানে নোঙর করে বাকিগুলো বাছা।') },
  ],
  toolkit: ['sort', 'lower-bound'],
};

export const p1420D: ProblemEntry = {
  id: '1420D',
  contestId: 1420,
  index: 'D',
  name: 'Rescue Nibel!',
  rating: 1800,
  tags: ['combinatorics', 'data-structures', 'sortings'],
  why: L('Intervals that share a point are counted at the moment the last of them starts: a sweep plus one binomial per start.', 'যেসব ব্যবধান একটি বিন্দু ভাগ করে সেগুলো গোনা হয় তাদের শেষটি শুরুর মুহূর্তে: একটি সুইপ আর প্রতি শুরুতে একটি দ্বিপদ।'),
  statement: L('Lamp i is on during the time interval [lᵢ, rᵢ]. Count the ways to choose k lamps such that there is a moment when all chosen lamps are on at the same time. Print the count modulo 998244353.', 'বাতি i সময় ব্যবধান [lᵢ, rᵢ]-এ জ্বলে। k-টি বাতি বাছার উপায় গুনুন যাতে এমন একটি মুহূর্ত আছে যখন বাছাই করা সব বাতি একসঙ্গে জ্বলে। সংখ্যাটি ৯৯৮২৪৪৩৫৩ মডুলো ছাপুন।'),
  input: L('n and k, then n lines lᵢ rᵢ.', 'n আর k, তারপর n লাইনে lᵢ rᵢ।'),
  output: L('The count modulo 998244353.', 'সংখ্যাটি ৯৯৮২৪৪৩৫৩ মডুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k ≤ n ≤ 3·10⁵, 1 ≤ lᵢ ≤ rᵢ ≤ 10⁹', '১ ≤ k ≤ n ≤ ৩·১০⁵, ১ ≤ lᵢ ≤ rᵢ ≤ ১০⁹')] },
  samples: [
    { input: '7 3\n1 7\n3 8\n4 5\n6 7\n1 3\n5 10\n8 9', output: '9', explain: L('Nine triples share a common moment.', 'নয়টি ত্রয়ীর একটি সাধারণ মুহূর্ত আছে।') },
    { input: '3 1\n1 1\n2 2\n3 3', output: '3', explain: L('Any single lamp works.', 'যেকোনো একক বাতি চলে।') },
    { input: '3 2\n1 1\n2 2\n3 3', output: '0', explain: L('No two lamps overlap.', 'কোনো দুটি বাতি একসঙ্গে জ্বলে না।') },
    { input: '3 3\n1 3\n2 3\n3 3', output: '1', explain: L('All three are on at time 3.', 'সময় ৩-এ তিনটিই জ্বলে।') },
    { input: '5 2\n1 3\n2 4\n3 5\n4 6\n5 7', output: '7', explain: L('Seven overlapping pairs.', 'সাতটি পরস্পরছেদী জোড়া।') },
  ],
  observation: L('A set of intervals shares a point exactly when max l ≤ min r. Count each good set at the lamp with the largest l (ties broken by sweep order): when that lamp turns on, the other k − 1 must be lamps that are already on. If on lamps are on, that is C(on, k − 1).', 'একগুচ্ছ ব্যবধান একটি বিন্দু ভাগ করে ঠিক তখন যখন সর্বোচ্চ l ≤ সর্বনিম্ন r। প্রতিটি ভালো সেট গুনুন সবচেয়ে বড় l-এর বাতিতে (সুইপ ক্রমে টাই ভাঙে): সেই বাতি জ্বলার সময় বাকি k − ১টিকে এমন বাতি হতে হবে যা ইতিমধ্যে জ্বলছে। on-টি জ্বললে সেটি C(on, k − ১)।'),
  approach: [
    L('Create events (l, on) and (r, off); sort so that at equal times “on” comes first, because [a, t] and [t, b] do overlap at t.', 'ঘটনা (l, চালু) আর (r, বন্ধ) বানান; এমনভাবে সাজান যাতে একই সময়ে “চালু” আগে আসে, কারণ [a, t] আর [t, b] t-তে মেলে।'),
    L('Sweep, keeping the number of lamps currently on; at each “on” add C(on, k − 1) and then increment.', 'সুইপ করুন, এখন জ্বলা বাতির সংখ্যা রেখে; প্রতিটি “চালু”-তে C(on, k − ১) যোগ করে তারপর বাড়ান।'),
  ],
  walkthrough: {
    input: '5 2 · [1,3] [2,4] [3,5] [4,6] [5,7]',
    steps: [
      { state: 't = 1 on: 0 on', text: L('C(0, 1) = 0.', 'C(০, ১) = ০।') },
      { state: 't = 2 on: 1 on', text: L('Pairs with [1,3]: C(1, 1) = 1.', '[১,৩]-এর সঙ্গে জোড়া: C(১, ১) = ১।') },
      { state: 't = 3 on: 2 on', text: L('[3,5] pairs with both: +2 (on before off at t = 3).', '[৩,৫] দুটির সঙ্গেই জোড়া: +২ (t = ৩-এ চালু আগে বন্ধ পরে)।') },
      { state: 't = 4, 5 on', text: L('+2 each after the closings. Total 1 + 2 + 2 + 2 = 7.', 'বন্ধ হওয়ার পর প্রতিটিতে +২। মোট ১ + ২ + ২ + ২ = ৭।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Sorting 2n events dominates.', '২n ঘটনা সাজানোই প্রধান খরচ।') },
  solutions: [
    {
      id: 'sweep',
      kind: 'optimal',
      title: L('Sweep with C(on, k − 1)', 'C(on, k − ১) সহ সুইপ'),
      idea: L('Each good set is counted when its last lamp switches on.', 'প্রতিটি ভালো সেট গোনা হয় যখন তার শেষ বাতি জ্বলে।'),
      explain: [
        L('This “count at the last start” trick turns a question about sets into a question about one moment in time. Sorting pairs (time, type) with type 0 for on and 1 for off gives the right tie order for free.', 'এই “শেষ শুরুতে গোনা” কৌশল সেট নিয়ে প্রশ্নকে সময়ের একটি মুহূর্তের প্রশ্নে বদলে দেয়। (সময়, ধরন) জোড়া চালু = ০ আর বন্ধ = ১ দিয়ে সাজালে সঠিক টাই ক্রম বিনা খরচে পাওয়া যায়।'),
        L('Two lamps with the same l are ordered arbitrarily by the sort; the set is counted at whichever comes second, exactly once.', 'একই l-এর দুটি বাতি সাজানোয় যেকোনো ক্রমে আসে; সেটটি গোনা হয় যেটি পরে আসে সেখানে, ঠিক একবার।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    vector<pair<int, int>> ev;  // (time, type): type 0 = turns on, 1 = turns off
    for (int i = 0; i < n; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        ev.push_back({l, 0});
        ev.push_back({r, 1});
    }
    sort(ev.begin(), ev.end());  // at equal times, "on" comes before "off"

    vector<long long> f(n + 1), inv(n + 1);
    f[0] = 1;
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
    inv[n] = power(f[n], MOD - 2);
    for (int i = n; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
    auto C = [&](int a, int b) { return (b < 0 || b > a) ? 0LL : f[a] * inv[b] % MOD * inv[a - b] % MOD; };

    long long ans = 0;
    int on = 0;
    for (auto [time, type] : ev) {
        if (type == 0) {
            // Count each group once: at the moment its latest-starting lamp turns on.
            ans = (ans + C(on, k - 1)) % MOD;
            on++;
        } else {
            on--;
        }
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'pair', 'structured-bindings', 'mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every k-subset', 'প্রতিটি k-উপসেট যাচাই'),
      idea: L('A subset is good when its largest start is at most its smallest end.', 'একটি উপসেট ভালো যখন তার সবচেয়ে বড় শুরু তার সবচেয়ে ছোট শেষের চেয়ে বড় নয়।'),
      explain: [L('Uses the max l ≤ min r test directly. It is exponential, so it only checks the sweep on small inputs.', 'সরাসরি সর্বোচ্চ l ≤ সর্বনিম্ন r পরীক্ষা ব্যবহার করে। এক্সপোনেনশিয়াল, তাই শুধু ছোট ইনপুটে সুইপ যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> l(n), r(n);
    for (int i = 0; i < n; i++) cin >> l[i] >> r[i];
    if (n > 18) { cout << "\n"; return 0; }
    long long count = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        if (__builtin_popcount(mask) != k) continue;
        int latestOn = INT_MIN, earliestOff = INT_MAX;
        for (int i = 0; i < n; i++)
            if (mask >> i & 1) latestOn = max(latestOn, l[i]), earliestOff = min(earliestOff, r[i]);
        if (latestOn <= earliestOff) count++;  // some moment has all k on
    }
    cout << count % 998244353 << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['popcount'],
    },
  ],
  tests: [
    { input: '7 3\n1 7\n3 8\n4 5\n6 7\n1 3\n5 10\n8 9', output: '9', source: 'sample', note: sample(1) },
    { input: '3 1\n1 1\n2 2\n3 3', output: '3', source: 'sample', note: sample(2) },
    { input: '3 2\n1 1\n2 2\n3 3', output: '0', source: 'sample', note: sample(3) },
    { input: '3 3\n1 3\n2 3\n3 3', output: '1', source: 'sample', note: sample(4) },
    { input: '5 2\n1 3\n2 4\n3 5\n4 6\n5 7', output: '7', source: 'sample', note: sample(5) },
    { input: '2 2\n1 2\n2 3', output: '1', source: 'own', note: L('Touching at one moment counts.', 'এক মুহূর্তে ছোঁয়াও গণ্য।') },
  ],
  pitfalls: [
    L('Processing “off” before “on” at the same time, which misses sets that touch at a single moment.', 'একই সময়ে “চালু”-র আগে “বন্ধ” প্রক্রিয়া করা, যাতে এক মুহূর্তে ছোঁয়া সেট বাদ পড়ে।'),
    L('Adding C(on + 1, k) at each start instead of C(on, k − 1): that recounts old sets.', 'প্রতিটি শুরুতে C(on, k − ১)-এর বদলে C(on + ১, k) যোগ: তাতে পুরোনো সেট আবার গোনা হয়।'),
  ],
  related: [
    { id: '1462E2', name: 'Close Tuples (hard version)', why: L('Anchor and choose, on sorted values.', 'সাজানো মানে নোঙর করে বাছা।') },
    { id: '1288C', name: 'Two Arrays', why: L('More binomial counting.', 'আরও দ্বিপদ গণনা।') },
  ],
  toolkit: ['sort'],
};

export const p1207D: ProblemEntry = {
  id: '1207D',
  contestId: 1207,
  index: 'D',
  name: 'Number of Permutations',
  rating: 1800,
  tags: ['combinatorics'],
  why: L('Inclusion–exclusion in its smallest form: all orders, minus the two kinds of bad ones, plus the orders that are bad both ways.', 'অন্তর্ভুক্তি–বর্জন তার সবচেয়ে ছোট রূপে: সব ক্রম, বিয়োগ দুই ধরনের খারাপ ক্রম, যোগ যেগুলো দুইভাবেই খারাপ।'),
  statement: L('You have n pairs (aᵢ, bᵢ). An ordering of them is bad if the first elements are non-decreasing, or if the second elements are non-decreasing. Count the good orderings (permutations of the n positions) modulo 998244353.', 'আপনার কাছে n-টি জোড়া (aᵢ, bᵢ)। এদের একটি ক্রম খারাপ যদি প্রথম উপাদানগুলো অহ্রাসমান হয়, অথবা দ্বিতীয় উপাদানগুলো অহ্রাসমান হয়। ভালো ক্রম (n অবস্থানের পারমুটেশন) ৯৯৮২৪৪৩৫৩ মডুলো গুনুন।'),
  input: L('n, then n lines aᵢ bᵢ.', 'n, তারপর n লাইনে aᵢ bᵢ।'),
  output: L('The number of good permutations modulo 998244353.', 'ভালো পারমুটেশনের সংখ্যা ৯৯৮২৪৪৩৫৩ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 3·10⁵, 1 ≤ aᵢ, bᵢ ≤ n', '১ ≤ n ≤ ৩·১০⁵, ১ ≤ aᵢ, bᵢ ≤ n')] },
  samples: [
    { input: '3\n1 1\n2 2\n3 1', output: '3', explain: L('6 orders; 1 sorts a, 2 sort b, none sorts both: 6 − 1 − 2 = 3.', '৬টি ক্রম; ১টি a সাজায়, ২টি b সাজায়, কোনোটি দুটোই নয়: ৬ − ১ − ২ = ৩।') },
    { input: '4\n2 3\n2 2\n2 1\n2 4', output: '0', explain: L('All a are equal, so every order is sorted by a.', 'সব a সমান, তাই প্রতিটি ক্রম a অনুযায়ী সাজানো।') },
    { input: '3\n1 1\n1 1\n2 3', output: '4', explain: L('6 − 2 − 2 + 2 = 4.', '৬ − ২ − ২ + ২ = ৪।') },
  ],
  observation: L('Orders sorted by a: values must appear in increasing order, and equal values can be shuffled freely, so A = Π (count of each a value)!. The same for b gives B. Orders sorted by both: sort pairs by (a, b); if b is then non-decreasing, AB = Π (count of each identical pair)!, otherwise AB = 0. Answer n! − A − B + AB.', 'a অনুযায়ী সাজানো ক্রম: মানগুলো বাড়তি ক্রমে আসতে হবে, আর সমান মানগুলো ইচ্ছেমতো অদলবদল করা যায়, তাই A = Π (প্রতিটি a মানের সংখ্যা)!। b-এর জন্য একইভাবে B। দুটো অনুযায়ীই সাজানো: জোড়াগুলো (a, b) অনুযায়ী সাজান; তখন b অহ্রাসমান হলে AB = Π (প্রতিটি অভিন্ন জোড়ার সংখ্যা)!, নইলে AB = ০। উত্তর n! − A − B + AB।'),
  approach: [
    L('Compute factorials up to n.', 'n পর্যন্ত ফ্যাক্টরিয়াল হিসাব।'),
    L('A and B from frequency counts; AB after sorting the pairs.', 'ঘনত্ব গণনা থেকে A আর B; জোড়া সাজিয়ে AB।'),
    L('Combine with inclusion–exclusion, keeping the result non-negative.', 'অন্তর্ভুক্তি–বর্জনে মেলান, ফল অঋণাত্মক রেখে।'),
  ],
  walkthrough: {
    input: '(1,1) (1,1) (2,3)',
    steps: [
      { state: 'A = 2!·1! = 2', text: L('The two a = 1 pairs can swap.', 'দুটি a = ১ জোড়া জায়গা বদলাতে পারে।') },
      { state: 'B = 2!·1! = 2', text: L('Same for b.', 'b-এর জন্যও একই।') },
      { state: 'AB = 2', text: L('Sorted by (a, b), b is 1 1 3: fine. The identical pairs swap: 2!.', '(a, b) অনুযায়ী সাজালে b হয় ১ ১ ৩: ঠিক আছে। অভিন্ন জোড়া বদলায়: ২!।') },
      { state: '6 − 2 − 2 + 2 = 4', text: L('Four good orders.', 'চারটি ভালো ক্রম।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Sorting and map counting.', 'সাজানো আর map দিয়ে গণনা।') },
  solutions: [
    {
      id: 'inclusion-exclusion',
      kind: 'optimal',
      title: L('n! − A − B + AB', 'n! − A − B + AB'),
      idea: L('Count the bad orders with two factorial products and fix the overlap.', 'দুটি ফ্যাক্টরিয়াল গুণফলে খারাপ ক্রম গুনুন আর মিলনস্থল ঠিক করুন।'),
      explain: [
        L('|bad| = |sorted by a| + |sorted by b| − |sorted by both|. Each term is easy because “sorted” fixes the order of distinct values and only lets equal ones permute.', '|খারাপ| = |a অনুযায়ী সাজানো| + |b অনুযায়ী সাজানো| − |দুটো অনুযায়ী সাজানো|। প্রতিটি পদ সহজ কারণ “সাজানো” ভিন্ন মানের ক্রম স্থির করে আর শুধু সমানগুলোকে অদলবদল করতে দেয়।'),
        L('For the overlap, the only candidate order is “sort by (a, b)”, up to swapping identical pairs; it works only if b is non-decreasing in it.', 'মিলনস্থলের জন্য একমাত্র প্রার্থী ক্রম “(a, b) অনুযায়ী সাজানো”, অভিন্ন জোড়া অদলবদল ছাড়া; এটি চলে শুধু যদি তাতে b অহ্রাসমান হয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

int main() {
    int n;
    scanf("%d", &n);
    vector<pair<int, int>> s(n);
    for (auto& [a, b] : s) scanf("%d %d", &a, &b);
    vector<long long> f(n + 1);
    f[0] = 1;
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;

    // Number of orders that make one key non-decreasing = product of (group size)!
    auto sortedBy = [&](auto key) {
        map<long long, int> cnt;
        for (auto& p : s) cnt[key(p)]++;
        long long r = 1;
        for (auto& [v, c] : cnt) r = r * f[c] % MOD;
        return r;
    };
    long long A = sortedBy([](auto& p) { return (long long)p.first; });
    long long B = sortedBy([](auto& p) { return (long long)p.second; });

    // Both sorted at once: sort by (a, b); it only works if b is then non-decreasing.
    sort(s.begin(), s.end());
    long long AB = 0;
    bool ok = true;
    for (int i = 1; i < n; i++)
        if (s[i].second < s[i - 1].second) ok = false;
    if (ok) AB = sortedBy([](auto& p) { return (long long)p.first * 1000000LL + p.second; });

    long long ans = ((f[n] - A - B + AB) % MOD + 2 * MOD) % MOD;
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'sort', 'lambda', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All n! orders', 'সব n! ক্রম'),
      idea: L('next_permutation over indices, test both sortedness conditions.', 'সূচকের ওপর next_permutation, দুটি সাজানো-শর্ত পরীক্ষা।'),
      explain: [L('Permuting indices (not values) is what makes equal pairs count as different orderings, exactly as the statement wants.', 'মান নয়, সূচক পারমুট করাই সমান জোড়াকে আলাদা ক্রম হিসেবে গোনায়, ঠিক স্টেটমেন্ট যা চায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> s(n);
    for (auto& [a, b] : s) cin >> a >> b;
    if (n > 9) { cout << "\n"; return 0; }
    vector<int> p(n);
    iota(p.begin(), p.end(), 0);
    long long good = 0;
    do {
        bool sortedA = true, sortedB = true;
        for (int i = 1; i < n; i++) {
            if (s[p[i]].first < s[p[i - 1]].first) sortedA = false;
            if (s[p[i]].second < s[p[i - 1]].second) sortedB = false;
        }
        if (!sortedA && !sortedB) good++;
    } while (next_permutation(p.begin(), p.end()));
    cout << good % 998244353 << "\n";
    return 0;
}
`,
      time: 'O(n! · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3\n1 1\n2 2\n3 1', output: '3', source: 'sample', note: sample(1) },
    { input: '4\n2 3\n2 2\n2 1\n2 4', output: '0', source: 'sample', note: sample(2) },
    { input: '3\n1 1\n1 1\n2 3', output: '4', source: 'sample', note: sample(3) },
    { input: '1\n1 1', output: '0', source: 'own', note: L('One pair is always sorted.', 'একটি জোড়া সবসময় সাজানো।') },
  ],
  pitfalls: [
    L('Forgetting the + AB term, which subtracts doubly bad orders twice.', '+ AB পদ ভুলে যাওয়া, যাতে দুইভাবে খারাপ ক্রম দুবার বাদ যায়।'),
    L('Using AB = Π (count of each a)! · …: identical pairs, not equal a values, are what can swap in the overlap.', 'AB = Π (প্রতিটি a-এর সংখ্যা)! · … ধরা: মিলনস্থলে অভিন্ন জোড়াই বদলাতে পারে, শুধু সমান a নয়।'),
  ],
  related: [
    { id: '1391C', name: 'Cyclic Permutations', why: L('Count the complement.', 'পরিপূরক গোনা।') },
    { id: '1462E2', name: 'Close Tuples (hard version)', why: L('Factorials and binomials modulo a prime.', 'মৌলিক মডুলোতে ফ্যাক্টরিয়াল আর দ্বিপদ।') },
  ],
  toolkit: ['map'],
};

export const p869C: ProblemEntry = {
  id: '869C',
  contestId: 869,
  index: 'C',
  name: 'The Intriguing Obsession',
  rating: 1800,
  tags: ['combinatorics', 'dp', 'math'],
  why: L('Translate a distance rule into “matchings between every two colours”, then count matchings with binomials or a DP.', 'একটি দূরত্বের নিয়মকে “প্রতি দুই রঙের মধ্যে ম্যাচিং”-এ অনুবাদ, তারপর দ্বিপদ বা DP দিয়ে ম্যাচিং গোনা।'),
  statement: L('There are a red, b blue and c purple islands. Build bridges of length 1 between some pairs of islands so that any two islands of the same colour are either unreachable from each other or at distance at least 3. Count the possible sets of bridges modulo 998244353.', 'a-টি লাল, b-টি নীল আর c-টি বেগুনি দ্বীপ আছে। কিছু দ্বীপ-জোড়ার মধ্যে দৈর্ঘ্য ১-এর সেতু বানান যাতে একই রঙের যেকোনো দুটি দ্বীপ হয় একে অপরের থেকে অগম্য, নয়তো দূরত্ব অন্তত ৩। সম্ভাব্য সেতু-সেটের সংখ্যা ৯৯৮২৪৪৩৫৩ মডুলো গুনুন।'),
  input: L('a b c.', 'a b c।'),
  output: L('The count modulo 998244353.', 'সংখ্যাটি ৯৯৮২৪৪৩৫৩ মডুলো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a, b, c ≤ 5000', '১ ≤ a, b, c ≤ ৫০০০')] },
  samples: [
    { input: '1 1 1', output: '8', explain: L('Any subset of the 3 possible bridges: 2³.', '৩টি সম্ভাব্য সেতুর যেকোনো উপসেট: ২³।') },
    { input: '1 2 2', output: '63', explain: L('f(1,2) · f(2,2) · f(1,2) = 3 · 7 · 3.', 'f(১,২) · f(২,২) · f(১,২) = ৩ · ৭ · ৩।') },
    { input: '1 3 5', output: '3264', explain: L('4 · 136 · 6.', '৪ · ১৩৬ · ৬।') },
    { input: '6 2 9', output: '813023575', explain: L('The same product modulo 998244353.', 'একই গুণফল ৯৯৮২৪৪৩৫৩ মডুলো।') },
  ],
  observation: L('Distance ≥ 3 between same-coloured islands means: no bridge inside a colour, and no island linked to two islands of the same colour. So between any two colours the bridges form a matching, and the three matchings are independent. Answer f(a,b) · f(b,c) · f(a,c), where f(x,y) = Σₖ C(x,k) · C(y,k) · k!.', 'একই রঙের দ্বীপের মধ্যে দূরত্ব ≥ ৩ মানে: এক রঙের ভেতরে সেতু নেই, আর কোনো দ্বীপ একই রঙের দুটি দ্বীপের সঙ্গে যুক্ত নয়। তাই যেকোনো দুই রঙের মধ্যে সেতুগুলো একটি ম্যাচিং, আর তিনটি ম্যাচিং স্বাধীন। উত্তর f(a,b) · f(b,c) · f(a,c), যেখানে f(x,y) = Σₖ C(x,k) · C(y,k) · k!।'),
  approach: [
    L('Pascal’s triangle up to 5000 gives the binomials.', '৫০০০ পর্যন্ত প্যাসকেলের ত্রিভুজ দ্বিপদ দেয়।'),
    L('Compute f for the three colour pairs and multiply.', 'তিনটি রং-জোড়ার জন্য f হিসাব করে গুণ করুন।'),
  ],
  walkthrough: {
    input: '1 2 2',
    steps: [
      { state: 'f(1,2) = 1 + 2 = 3', text: L('Either no bridge, or the red island links to one of 2 blue islands.', 'হয় কোনো সেতু নেই, নয়তো লাল দ্বীপটি ২টি নীলের একটির সঙ্গে যুক্ত।') },
      { state: 'f(2,2) = 1 + 4 + 2 = 7', text: L('No edge, one of 4 edges, or one of 2 perfect matchings.', 'কোনো প্রান্ত নয়, ৪টি প্রান্তের একটি, বা ২টি পূর্ণ ম্যাচিংয়ের একটি।') },
      { state: '3 · 7 · 3 = 63', text: L('Multiply the three independent matchings.', 'তিনটি স্বাধীন ম্যাচিং গুণ।') },
    ],
  },
  complexity: { time: 'O(max² )', space: 'O(max²)', why: L('Pascal’s triangle of size 5000².', '৫০০০² আকারের প্যাসকেলের ত্রিভুজ।') },
  solutions: [
    {
      id: 'binomial',
      kind: 'optimal',
      title: L('Σ C(x,k) C(y,k) k!', 'Σ C(x,k) C(y,k) k!'),
      idea: L('Choose k islands on each side and pair them in k! ways.', 'প্রতি পাশে k-টি দ্বীপ বাছুন আর k! উপায়ে জোড়া বানান।'),
      explain: [
        L('A path red – blue – red would put two reds at distance 2; a path red – blue – purple – red is distance 3 and allowed. So each blue island may touch at most one red, and vice versa: exactly a matching.', 'লাল – নীল – লাল পথ দুটি লালকে দূরত্ব ২-এ রাখত; লাল – নীল – বেগুনি – লাল দূরত্ব ৩, অনুমোদিত। তাই প্রতিটি নীল দ্বীপ সর্বোচ্চ একটি লালকে ছুঁতে পারে, আর উল্টোটাও: ঠিক একটি ম্যাচিং।'),
        L('The three colour pairs use disjoint sets of possible bridges, so the counts multiply.', 'তিনটি রং-জোড়া সম্ভাব্য সেতুর আলাদা সেট ব্যবহার করে, তাই সংখ্যাগুলো গুণ হয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;
int C[5001][5001];  // int, not long long: 100 MB instead of 200 MB

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int m = max({a, b, c});
    for (int i = 0; i <= m; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
    // Ways to put a matching between x and y islands: choose k on each side, pair them k! ways.
    auto f = [&](int x, int y) {
        long long r = 0, fact = 1;
        for (int k = 0; k <= min(x, y); k++) {
            if (k) fact = fact * k % MOD;
            r = (r + (long long)C[x][k] * C[y][k] % MOD * fact) % MOD;
        }
        return r;
    };
    cout << f(a, b) * f(b, c) % MOD * f(a, c) % MOD << "\n";
    return 0;
}
`,
      time: 'O(max²)',
      space: 'O(max²)',
      accepted: true,
      toolkit: ['mod-arith', 'lambda'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('Matching DP', 'ম্যাচিং DP'),
      idea: L('g(x, y) = g(x − 1, y) + y · g(x − 1, y − 1).', 'g(x, y) = g(x − ১, y) + y · g(x − ১, y − ১)।'),
      explain: [L('Look at the last island of the first colour: it stays unmatched, or it picks one of the y partners, which then becomes unavailable. This avoids binomials entirely and is the natural derivation if you think recursively.', 'প্রথম রঙের শেষ দ্বীপটি দেখুন: সেটি অমিল থাকে, অথবা y সঙ্গীর একটিকে বাছে, যা তখন আর পাওয়া যায় না। এতে দ্বিপদ একেবারেই লাগে না, আর পুনরাবৃত্তিমূলকভাবে ভাবলে এটিই স্বাভাবিক নির্ণয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;
int g[5001][5001];  // int keeps the table at 100 MB

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int m = max({a, b, c});
    // g[x][y]: matchings between x and y islands.
    // The last of the x islands is either unmatched, or matched to one of the y islands.
    for (int x = 0; x <= m; x++)
        for (int y = 0; y <= m; y++) {
            if (x == 0 || y == 0) { g[x][y] = 1; continue; }
            g[x][y] = (g[x - 1][y] + (long long)y * g[x - 1][y - 1]) % MOD;
        }
    cout << (long long)g[a][b] * g[b][c] % MOD * g[a][c] % MOD << "\n";
    return 0;
}
`,
      time: 'O(max²)',
      space: 'O(max²)',
      accepted: true,
      toolkit: ['mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every set of bridges', 'প্রতিটি সেতু-সেট'),
      idea: L('Try all subsets of possible bridges and check the distance rule directly.', 'সম্ভাব্য সেতুর সব উপসেট চেষ্টা করে সরাসরি দূরত্বের নিয়ম যাচাই।'),
      explain: [L('This brute force tests the rule as written: no bridge between same colours and no common neighbour. It even allows bridges within a colour, so it checks that the reduction to three matchings is right.', 'এই ব্রুট ফোর্স নিয়মটি লেখা অনুযায়ী পরীক্ষা করে: একই রঙের মধ্যে সেতু নেই, সাধারণ প্রতিবেশী নেই। এটি এক রঙের ভেতরের সেতুও চেষ্টা করে, তাই তিন ম্যাচিংয়ে রূপান্তর ঠিক কি না যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int n = a + b + c;
    if (n > 7) { cout << "\n"; return 0; }
    vector<int> color(n);
    for (int i = 0; i < n; i++) color[i] = i < a ? 0 : i < a + b ? 1 : 2;
    vector<pair<int, int>> pairs;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) pairs.push_back({i, j});
    int E = pairs.size();
    long long count = 0;
    for (int mask = 0; mask < (1 << E); mask++) {
        vector<vector<bool>> adj(n, vector<bool>(n, false));
        for (int e = 0; e < E; e++)
            if (mask >> e & 1) adj[pairs[e].first][pairs[e].second] = adj[pairs[e].second][pairs[e].first] = true;
        bool ok = true;
        // Same colour: no bridge between them and no common neighbour (distance >= 3 or unreachable).
        for (int i = 0; i < n && ok; i++)
            for (int j = i + 1; j < n && ok; j++) {
                if (color[i] != color[j]) continue;
                if (adj[i][j]) ok = false;
                for (int x = 0; x < n && ok; x++)
                    if (adj[i][x] && adj[j][x]) ok = false;
            }
        if (ok) count++;
    }
    cout << count % 998244353 << "\n";
    return 0;
}
`,
      time: 'O(2^(n²/2) · n³)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '1 1 1', output: '8', source: 'sample', note: sample(1) },
    { input: '1 2 2', output: '63', source: 'sample', note: sample(2) },
    { input: '1 3 5', output: '3264', source: 'sample', note: sample(3) },
    { input: '6 2 9', output: '813023575', source: 'sample', note: sample(4) },
    { input: '5000 5000 5000', output: '986778560', source: 'own', note: L('Largest input: checks time and memory.', 'সবচেয়ে বড় ইনপুট: সময় আর মেমরি যাচাই।') },
  ],
  pitfalls: [
    L('Allowing an island to link to two islands of the same other colour: that creates distance 2.', 'একটি দ্বীপকে অন্য রঙের দুটি দ্বীপের সঙ্গে যুক্ত হতে দেওয়া: তাতে দূরত্ব ২ হয়।'),
    L('A 5001 × 5001 table of long long is 200 MB, too close to the limit: store int (100 MB) and cast to long long only when multiplying.', '৫০০১ × ৫০০১ long long টেবিল ২০০ MB, সীমার খুব কাছে: int রাখুন (১০০ MB) আর শুধু গুণের সময় long long-এ কাস্ট করুন।'),
  ],
  related: [
    { id: '1288C', name: 'Two Arrays', why: L('Binomial counting.', 'দ্বিপদ গণনা।') },
    { id: '1236B', name: 'Alice and the List of Presents', why: L('Independent parts multiply.', 'স্বাধীন অংশ গুণ হয়।') },
  ],
  toolkit: ['mod-arith'],
};

export const p559C: ProblemEntry = {
  id: '559C',
  contestId: 559,
  index: 'C',
  name: 'Gerald and Giant Chess',
  rating: 2200,
  tags: ['combinatorics', 'dp', 'math', 'number-theory'],
  why: L('Lattice paths avoiding obstacles: count paths to each black cell that avoid earlier black cells, and subtract.', 'বাধা এড়িয়ে ল্যাটিস পথ: প্রতিটি কালো ঘর পর্যন্ত এমন পথ গুনুন যা আগের কালো ঘর এড়ায়, তারপর বিয়োগ।'),
  statement: L('An h × w board has n black cells. A pawn starts at the top-left cell (1, 1) and moves only down or right to reach (h, w), never stepping on a black cell. Count the paths modulo 10⁹ + 7. The two corners are white.', 'একটি h × w বোর্ডে n-টি কালো ঘর। একটি বোড়ে উপরের-বাম ঘর (১, ১) থেকে শুধু নিচে বা ডানে চলে (h, w)-তে পৌঁছায়, কখনো কালো ঘরে পা দেয় না। পথের সংখ্যা ১০⁹ + ৭ মডুলো গুনুন। দুই কোণা সাদা।'),
  input: L('h w n, then n lines rᵢ cᵢ.', 'h w n, তারপর n লাইনে rᵢ cᵢ।'),
  output: L('The number of paths modulo 10⁹ + 7.', 'পথের সংখ্যা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ h, w ≤ 10⁵, 1 ≤ n ≤ 2000', '১ ≤ h, w ≤ ১০⁵, ১ ≤ n ≤ ২০০০')] },
  samples: [
    { input: '3 4 2\n2 2\n2 3', output: '2', explain: L('Only the two paths that go around the black pair.', 'শুধু কালো জোড়ার চারপাশ দিয়ে যাওয়া দুটি পথ।') },
    { input: '100 100 3\n15 16\n16 15\n99 88', output: '545732279', explain: L('Large board: the formula with factorials is required.', 'বড় বোর্ড: ফ্যাক্টরিয়ালসহ সূত্র দরকার।') },
  ],
  observation: L('Paths between two cells: C(dr + dc, dr). Sort black cells by (row, column) and add the target last. Let dp[i] = paths from the start to cell i that touch no black cell before i. Then dp[i] = paths(start, i) − Σ dp[j] · paths(j, i) over earlier cells j, because every bad path has a unique first black cell.', 'দুটি ঘরের মধ্যে পথ: C(dr + dc, dr)। কালো ঘরগুলো (সারি, কলাম) অনুযায়ী সাজান আর লক্ষ্য শেষে যোগ করুন। dp[i] = শুরু থেকে ঘর i পর্যন্ত এমন পথ যা i-এর আগে কোনো কালো ঘর ছোঁয় না। তাহলে আগের ঘর j-এর ওপর dp[i] = paths(শুরু, i) − Σ dp[j] · paths(j, i), কারণ প্রতিটি খারাপ পথের একটি অনন্য প্রথম কালো ঘর আছে।'),
  approach: [
    L('Precompute factorials up to h + w and their inverses.', 'h + w পর্যন্ত ফ্যাক্টরিয়াল আর তাদের ইনভার্স আগে হিসাব।'),
    L('Sort black cells; any cell that can reach another comes before it.', 'কালো ঘর সাজান; যে ঘর অন্যটিতে পৌঁছাতে পারে সেটি আগে আসে।'),
    L('O(n²) DP over the cells; the answer is dp at the target.', 'ঘরগুলোর ওপর O(n²) DP; উত্তর লক্ষ্যের dp।'),
  ],
  walkthrough: {
    input: '3 4 · black (2,2), (2,3)',
    steps: [
      { state: 'dp(2,2) = C(2,1) = 2', text: L('No earlier black cell.', 'আগে কোনো কালো ঘর নেই।') },
      { state: 'dp(2,3) = C(3,1) − 2 · 1 = 1', text: L('Remove paths that pass (2,2) first.', 'যেসব পথ আগে (২,২) দিয়ে যায় তা বাদ।') },
      { state: 'target: C(5,2) − 2 · 3 − 1 · 2 = 2', text: L('10 total paths, minus those whose first black cell is (2,2) or (2,3).', 'মোট ১০টি পথ, বিয়োগ যাদের প্রথম কালো ঘর (২,২) বা (২,৩)।') },
    ],
  },
  complexity: { time: 'O(n² + h + w)', space: 'O(n + h + w)', why: L('Four million pairs of black cells, each an O(1) binomial.', 'চল্লিশ লক্ষ কালো-ঘর জোড়া, প্রতিটি O(১) দ্বিপদ।') },
  solutions: [
    {
      id: 'first-black',
      kind: 'optimal',
      title: L('DP over black cells', 'কালো ঘরের ওপর DP'),
      idea: L('Classify bad paths by their first black cell.', 'খারাপ পথকে তার প্রথম কালো ঘর দিয়ে শ্রেণিবদ্ধ করুন।'),
      explain: [
        L('The board is too large for a cell-by-cell DP (10¹⁰ cells), but there are only 2000 obstacles. Working on obstacles only is the key change of viewpoint.', 'বোর্ড ঘর-ঘর DP-র জন্য অনেক বড় (১০¹⁰ ঘর), কিন্তু বাধা মাত্র ২০০০। শুধু বাধার ওপর কাজ করাই দৃষ্টিভঙ্গির মূল পরিবর্তন।'),
        L('A path that hits black cells hits a first one, j; it splits uniquely into a clean path to j and any path from j onwards. That gives the subtraction without double counting.', 'যে পথ কালো ঘর ছোঁয় সে একটি প্রথমটি, j, ছোঁয়; সেটি অনন্যভাবে j পর্যন্ত একটি পরিষ্কার পথ আর j থেকে যেকোনো পথে ভাগ হয়। এতে দুবার না গুনে বিয়োগ হয়।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
const int MAXF = 200005;
long long f[MAXF], inv[MAXF];

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

// Monotone paths from (r1, c1) to (r2, c2).
long long paths(int r1, int c1, int r2, int c2) {
    if (r2 < r1 || c2 < c1) return 0;
    int dr = r2 - r1, dc = c2 - c1;
    return f[dr + dc] * inv[dr] % MOD * inv[dc] % MOD;
}

int main() {
    f[0] = 1;
    for (int i = 1; i < MAXF; i++) f[i] = f[i - 1] * i % MOD;
    inv[MAXF - 1] = power(f[MAXF - 1], MOD - 2);
    for (int i = MAXF - 1; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;

    int h, w, n;
    scanf("%d %d %d", &h, &w, &n);
    vector<pair<int, int>> cell(n);
    for (auto& [r, c] : cell) scanf("%d %d", &r, &c);
    sort(cell.begin(), cell.end());
    cell.push_back({h, w});  // the target, processed last

    // dp[i] = paths from (1,1) to cell i that touch no black cell before it.
    vector<long long> dp(n + 1);
    for (int i = 0; i <= n; i++) {
        auto [r, c] = cell[i];
        dp[i] = paths(1, 1, r, c);
        for (int j = 0; j < i; j++)
            dp[i] = (dp[i] - dp[j] * paths(cell[j].first, cell[j].second, r, c)) % MOD;
        dp[i] = (dp[i] + MOD) % MOD;
    }
    printf("%lld\n", dp[n]);
    return 0;
}
`,
      time: 'O(n² + h + w)',
      space: 'O(n + h + w)',
      accepted: true,
      toolkit: ['mod-pow', 'sort', 'structured-bindings'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Grid DP', 'গ্রিড DP'),
      idea: L('ways[r][c] = ways[r − 1][c] + ways[r][c − 1], zero on black cells.', 'ways[r][c] = ways[r − ১][c] + ways[r][c − ১], কালো ঘরে শূন্য।'),
      explain: [L('The classic grid DP is correct and simple but needs h · w cells: fine for small boards, impossible for 10⁵ × 10⁵.', 'ক্লাসিক গ্রিড DP সঠিক আর সহজ কিন্তু h · w ঘর লাগে: ছোট বোর্ডে ঠিক, ১০⁵ × ১০⁵-এ অসম্ভব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int h, w, n;
    cin >> h >> w >> n;
    if ((long long)h * w > 4000000) { cout << "\n"; return 0; }
    vector<vector<char>> black(h + 1, vector<char>(w + 1, 0));
    for (int i = 0; i < n; i++) {
        int r, c;
        cin >> r >> c;
        black[r][c] = 1;
    }
    vector<vector<long long>> ways(h + 1, vector<long long>(w + 1, 0));
    for (int r = 1; r <= h; r++)
        for (int c = 1; c <= w; c++) {
            if (black[r][c]) continue;
            if (r == 1 && c == 1) { ways[r][c] = 1; continue; }
            ways[r][c] = (ways[r - 1][c] + ways[r][c - 1]) % 1000000007;
        }
    cout << ways[h][w] << "\n";
    return 0;
}
`,
      time: 'O(h · w)',
      space: 'O(h · w)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3 4 2\n2 2\n2 3', output: '2', source: 'sample', note: sample(1) },
    { input: '100 100 3\n15 16\n16 15\n99 88', output: '545732279', source: 'sample', note: sample(2) },
    { input: '2 2 1\n1 2', output: '1', source: 'own', note: L('One of the two paths is blocked.', 'দুটি পথের একটি বন্ধ।') },
  ],
  pitfalls: [
    L('Not sorting the black cells: dp[j] must be final before it is used for i.', 'কালো ঘর না সাজানো: i-এর জন্য ব্যবহারের আগে dp[j] চূড়ান্ত হতে হবে।'),
    L('Forgetting that paths(j, i) is 0 when j is below or right of i.', 'j যদি i-এর নিচে বা ডানে থাকে তবে paths(j, i) = ০, এটি ভুলে যাওয়া।'),
  ],
  related: [
    { id: '1288C', name: 'Two Arrays', why: L('Lattice-path style binomials.', 'ল্যাটিস-পথ ধাঁচের দ্বিপদ।') },
    { id: '1462E2', name: 'Close Tuples (hard version)', why: L('Factorials and inverse factorials.', 'ফ্যাক্টরিয়াল আর ইনভার্স ফ্যাক্টরিয়াল।') },
  ],
  toolkit: ['mod-pow'],
};
