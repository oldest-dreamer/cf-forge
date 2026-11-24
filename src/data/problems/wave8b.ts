import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1899A: ProblemEntry = {
  id: '1899A',
  contestId: 1899,
  index: 'A',
  name: 'Game with Integers',
  rating: 800,
  tags: ['games', 'math'],
  why: L('The simplest game: one player wins at once or the other can always undo.', 'সবচেয়ে সরল গেম: একজন সঙ্গে সঙ্গে জেতে, নইলে অন্যজন সবসময় ফিরিয়ে দিতে পারে।'),
  statement: L(
    'Vanya and Vova play with an integer n, Vanya first. On a turn a player adds 1 or subtracts 1. If after Vanya’s move the number is divisible by 3, Vanya wins. If 10 moves pass without that, Vova wins. Who wins with optimal play? There are t test cases.',
    'ভানিয়া আর ভোভা একটি পূর্ণসংখ্যা n নিয়ে খেলে, ভানিয়া আগে। এক চালে একজন ১ যোগ বা ১ বিয়োগ করে। ভানিয়ার চালের পরে সংখ্যাটি ৩ দিয়ে বিভাজ্য হলে ভানিয়া জেতে। তা ছাড়া ১০টি চাল পেরোলে ভোভা জেতে। সেরা খেলায় কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t, then n for each test.', 't, তারপর প্রতিটি টেস্টের n।'),
  output: L('First (Vanya) or Second (Vova).', 'First (ভানিয়া) অথবা Second (ভোভা)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000', '১ ≤ n ≤ ১০০০')] },
  samples: [{ input: '6\n1\n3\n5\n100\n999\n1000', output: 'First\nSecond\nFirst\nFirst\nSecond\nFirst', explain: L('n = 3: any move leaves remainder 1 or 2, and Vova moves back to a multiple of 3.', 'n = ৩: যেকোনো চাল ভাগশেষ ১ বা ২ রাখে, আর ভোভা আবার ৩-এর গুণিতকে ফিরিয়ে আনে।') }],
  observation: L('If n mod 3 ≠ 0, Vanya reaches a multiple of 3 in one move. If n mod 3 = 0, every Vanya move leaves remainder 1 or 2, and Vova just undoes it, returning to a multiple of 3 forever.', 'n mod ৩ ≠ ০ হলে ভানিয়া এক চালে ৩-এর গুণিতকে পৌঁছায়। n mod ৩ = ০ হলে ভানিয়ার প্রতিটি চাল ভাগশেষ ১ বা ২ রাখে, আর ভোভা সেটি উল্টে দিয়ে চিরকাল ৩-এর গুণিতকে ফেরে।'),
  approach: [L('Print First iff n % 3 ≠ 0.', 'n % ৩ ≠ ০ হলেই First প্রিন্ট।')],
  walkthrough: { input: '1000', steps: [{ state: '1000 mod 3 = 1', text: L('Vanya subtracts 1 → 999. First.', 'ভানিয়া ১ বিয়োগ করে → ৯৯৯। First।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('One remainder.', 'একটি ভাগশেষ।') },
  solutions: [
    {
      id: 'mod',
      kind: 'optimal',
      title: L('Remainder mod 3', '৩ দিয়ে ভাগশেষ'),
      idea: L('Instant win or a mirroring opponent.', 'তাৎক্ষণিক জয় বা প্রতিফলনকারী প্রতিপক্ষ।'),
      explain: [L('The “undo the opponent’s move” strategy is a classic game-theory pattern: if the losing state can always be restored, the player stuck in it never escapes.', '“প্রতিপক্ষের চাল উল্টে দাও” কৌশল গেম থিওরির একটি ক্লাসিক প্যাটার্ন: হারানো অবস্থা সবসময় ফিরিয়ে আনা গেলে তাতে আটকে থাকা খেলোয়াড় কখনো বেরোতে পারে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (n % 3 ? "First" : "Second") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Game-tree search over 10 moves', '১০ চালের গেম-ট্রি খোঁজ'),
      idea: L('Vanya wins if some move wins now, or some move after which every Vova reply still loses for Vova.', 'ভানিয়া জেতে যদি কোনো চাল এখনই জেতায়, বা এমন কোনো চাল যার পরে ভোভার প্রতিটি উত্তরেও ভোভা হারে।'),
      explain: [L('Only 2¹⁰ move sequences exist, so a plain minimax recursion is instant. It is how you discover the mod-3 rule in the first place.', 'মাত্র ২¹⁰টি চালের ক্রম আছে, তাই সাধারণ মিনিম্যাক্স রিকার্শন তাৎক্ষণিক। এভাবেই প্রথমে mod-৩ নিয়মটি আবিষ্কার করা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

// Vanya to move, 'left' moves remain in total.
bool vanyaWins(int n, int left) {
    if (left <= 0) return false;
    for (int d : {-1, 1}) {
        int m = n + d;
        if (m % 3 == 0) return true;
        if (left == 1) continue;
        bool forced = true;
        for (int e : {-1, 1}) if (!vanyaWins(m + e, left - 2)) forced = false;
        if (forced) return true;
    }
    return false;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        cout << (vanyaWins(n, 10) ? "First" : "Second") << "\n";
    }
    return 0;
}
`,
      time: 'O(2¹⁰) per test',
      space: 'O(10)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '6\n1\n3\n5\n100\n999\n1000', output: 'First\nSecond\nFirst\nFirst\nSecond\nFirst', source: 'sample', note: sample(1) },
    { input: '2\n2\n6', output: 'First\nSecond', source: 'own', note: L('2 → 3 wins; 6 is a multiple of 3.', '২ → ৩ জেতে; ৬ হলো ৩-এর গুণিতক।') },
  ],
  pitfalls: [L('Checking divisibility before Vanya moves.', 'ভানিয়ার চালের আগে বিভাজ্যতা দেখা।')],
  related: [{ id: '1858A', name: 'Buttons', why: L('Another one-line game.', 'আরেকটি এক লাইনের গেম।') }],
  toolkit: ['modulo'],
};

export const p1472D: ProblemEntry = {
  id: '1472D',
  contestId: 1472,
  index: 'D',
  name: 'Even-Odd Game',
  rating: 1200,
  tags: ['dp', 'games', 'greedy', 'sortings'],
  why: L('In a scoring game, taking the largest element is either a gain for you or a denial for the opponent.', 'স্কোরের গেমে সবচেয়ে বড় উপাদান নেওয়া হয় আপনার লাভ, নয়তো প্রতিপক্ষকে বঞ্চিত করা।'),
  statement: L(
    'Alice and Bob take turns removing any element from an array, Alice first. Alice scores the value if it is even, Bob scores it if it is odd; otherwise nobody scores. Who wins with optimal play (Alice, Bob or Tie)? There are t test cases.',
    'অ্যালিস আর বব পালা করে একটি অ্যারে থেকে যেকোনো উপাদান সরায়, অ্যালিস আগে। মান জোড় হলে অ্যালিস তা পায়, বিজোড় হলে বব পায়; নইলে কেউ পায় না। সেরা খেলায় কে জেতে (Alice, Bob বা Tie)? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('Alice, Bob or Tie.', 'Alice, Bob অথবা Tie।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, aᵢ ≤ 10⁹', 'Σ n ≤ ২·১০⁵, aᵢ ≤ ১০⁹')] },
  samples: [{ input: '4\n4\n5 2 7 3\n3\n3 2 1\n4\n2 2 2 2\n2\n7 8', output: 'Bob\nTie\nAlice\nAlice', explain: L('Second test: Alice takes 3 (denies Bob), Bob takes 2, Alice takes 1: 0 vs 0.', 'দ্বিতীয় টেস্ট: অ্যালিস ৩ নেয় (ববকে বঞ্চিত), বব ২ নেয়, অ্যালিস ১ নেয়: ০ বনাম ০।') }],
  observation: L('Look at the score difference from the mover’s side. Taking x is worth x to the mover: either they score it (their parity) or the opponent can never score it (the opponent’s parity). The largest remaining x is therefore always the best move, so both players take elements from the largest down.', 'স্কোরের পার্থক্য (অ্যালিস − বব) দেখুন। মান x সরালে চালকের পক্ষে পার্থক্য সর্বোচ্চ x পর্যন্ত বদলায়: নিজের রঙের হলে লাভ, অন্যের রঙের হলে প্রতিপক্ষ বঞ্চিত। সবচেয়ে বড় বাকি x পার্থক্যকে চালকের পক্ষে সবচেয়ে বেশি সরায়। তাই দুজনেই বড় থেকে ছোট গ্রিডি খেলে।'),
  approach: [L('Sort descending; on even turns Alice adds even values, on odd turns Bob adds odd values.', 'বড় থেকে সর্ট; জোড় পালায় অ্যালিস জোড় মান যোগ করে, বিজোড় পালায় বব বিজোড় মান।')],
  walkthrough: { input: '5 2 7 3', steps: [{ state: 'sorted 7 5 3 2', text: L('Alice takes 7 (0), Bob 5 (5), Alice 3 (0), Bob 2 (5). Bob.', 'অ্যালিস ৭ (০), বব ৫ (৫), অ্যালিস ৩ (০), বব ২ (৫)। Bob।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort.', 'একটি সর্ট।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Take the largest each turn', 'প্রতি পালায় সবচেয়ে বড়টি নেওয়া'),
      idea: L('Sort descending and alternate.', 'বড় থেকে সর্ট করে পালাক্রমে।'),
      explain: [L('Scores reach 2·10¹⁴: use long long. The exchange argument (“swapping to a smaller element never helps the mover”) is the standard proof for such greedy games.', 'স্কোর ২·১০¹⁴ পর্যন্ত: long long। বিনিময় যুক্তি (“ছোট উপাদানে বদলালে চালকের কখনো লাভ হয় না”) এমন গ্রিডি গেমের প্রচলিত প্রমাণ।')],
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
        sort(a.rbegin(), a.rend());
        long long alice = 0, bob = 0;
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0 && a[i] % 2 == 0) alice += a[i];
            if (i % 2 == 1 && a[i] % 2 == 1) bob += a[i];
        }
        puts(alice > bob ? "Alice" : bob > alice ? "Bob" : "Tie");
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'long-long', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Minimax over subsets', 'সাবসেটের ওপর মিনিম্যাক্স'),
      idea: L('best[mask] = best (mover − other) score difference for the remaining elements.', 'best[mask] = বাকি উপাদানে সেরা (চালক − অন্যজন) স্কোরের পার্থক্য।'),
      explain: [L('A zero-sum game is solved by maximising “my score minus yours”. The parity of removed elements tells whose turn it is. Exponential, but it proves the greedy on small arrays.', 'শূন্য-সমষ্টির গেম “আমার স্কোর বিয়োগ তোমার” সর্বোচ্চ করে সমাধান হয়। সরানো উপাদানের সংখ্যার জোড়-বিজোড় বলে কার পালা। সূচকীয়, কিন্তু ছোট অ্যারেতে গ্রিডি প্রমাণ করে।')],
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
        if (n > 16) { cout << "\n"; continue; }
        int full = (1 << n) - 1;
        vector<long long> best(1 << n, 0);
        // mask = elements already removed; best = mover's (own - other) from here
        for (int mask = full - 1; mask >= 0; mask--) {
            bool aliceMoves = __builtin_popcount(mask) % 2 == 0;
            long long b = LLONG_MIN;
            for (int i = 0; i < n; i++) {
                if (mask >> i & 1) continue;
                long long gain = (aliceMoves ? a[i] % 2 == 0 : a[i] % 2 == 1) ? a[i] : 0;
                b = max(b, gain - best[mask | 1 << i]);
            }
            best[mask] = b;
        }
        cout << (best[0] > 0 ? "Alice" : best[0] < 0 ? "Bob" : "Tie") << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['bitwise-and', 'popcount'],
    },
  ],
  tests: [
    { input: '4\n4\n5 2 7 3\n3\n3 2 1\n4\n2 2 2 2\n2\n7 8', output: 'Bob\nTie\nAlice\nAlice', source: 'sample', note: sample(1) },
    { input: '1\n1\n1', output: 'Tie', source: 'own', note: L('Alice takes the odd 1: nobody scores.', 'অ্যালিস বিজোড় ১ নেয়: কেউ পায় না।') },
  ],
  pitfalls: [L('Alice taking only even numbers and skipping big odd ones.', 'অ্যালিস শুধু জোড় নিয়ে বড় বিজোড় বাদ দেওয়া।'), L('int overflow.', 'int ওভারফ্লো।')],
  related: [{ id: '1858A', name: 'Buttons', why: L('Denying the opponent a shared resource.', 'প্রতিপক্ষকে ভাগের সম্পদ থেকে বঞ্চিত করা।') }],
  toolkit: ['sort', 'long-long'],
};

export const p1382B: ProblemEntry = {
  id: '1382B',
  contestId: 1382,
  index: 'B',
  name: 'Sequential Nim',
  rating: 1100,
  tags: ['dp', 'games'],
  why: L('Whoever reaches the first pile larger than 1 controls the rest of the game.', 'যে প্রথম ১-এর বড় স্তূপে পৌঁছায় সে খেলার বাকিটা নিয়ন্ত্রণ করে।'),
  statement: L(
    'n piles of stones in order. Players alternate, First starting. A move removes a positive number of stones from the first non-empty pile. The player who cannot move loses. Who wins? There are t test cases.',
    'ক্রমে n-টি পাথরের স্তূপ। খেলোয়াড়রা পালা করে, First শুরু করে। এক চালে প্রথম খালি নয় এমন স্তূপ থেকে ধনাত্মক সংখ্যক পাথর সরানো হয়। যে চাল দিতে পারে না সে হারে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the pile sizes.', 't; প্রতিটি টেস্টে n আর স্তূপের আকার।'),
  output: L('First or Second.', 'First অথবা Second।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 10⁵, aᵢ ≤ 10⁹', 'Σ n ≤ ১০⁵, aᵢ ≤ ১০⁹')] },
  samples: [{ input: '7\n3\n2 5 4\n8\n1 1 1 1 1 1 1 1\n6\n1 2 3 4 5 6\n6\n1 1 2 1 2 2\n1\n1000000000\n5\n1 2 2 1 1\n3\n1 1 1', output: 'First\nSecond\nSecond\nFirst\nFirst\nSecond\nFirst', explain: L('1 2 3 4 5 6: the one leading 1 hands the 2-pile to Second.', '১ ২ ৩ ৪ ৫ ৬: সামনের একটি ১ দুইয়ের স্তূপটি Second-কে দেয়।') }],
  observation: L('A player facing a pile with ≥ 2 stones can choose to take all of it or leave exactly one, so they decide who faces the next pile: they always win. Leading piles of size 1 are forced moves, so only their count k matters: First wins iff k is even, unless every pile is 1, where First wins iff n is odd.', '≥ ২ পাথরের স্তূপের সামনে থাকা খেলোয়াড় সবটা নিতে বা ঠিক একটি রাখতে পারে, তাই সে ঠিক করে পরের স্তূপের সামনে কে থাকবে: সে সবসময় জেতে। সামনের ১ আকারের স্তূপগুলো বাধ্য চাল, তাই শুধু তাদের সংখ্যা k গুরুত্বপূর্ণ: k জোড় হলেই First জেতে, যদি না সব স্তূপ ১ হয়, তখন n বিজোড় হলেই First জেতে।'),
  approach: [L('Count leading ones; apply the parity rule.', 'সামনের একগুলো গুনে জোড়-বিজোড় নিয়ম প্রয়োগ।')],
  walkthrough: { input: '1 1 2 1 2 2', steps: [{ state: 'k = 2 leading ones', text: L('First faces the 2-pile: First.', 'First দুইয়ের স্তূপের সামনে: First।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One scan.', 'একটি স্ক্যান।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Count leading ones', 'সামনের একগুলো গোনা'),
      idea: L('The first pile > 1 decides everything.', 'প্রথম ১-এর বড় স্তূপ সবকিছু ঠিক করে।'),
      explain: [L('“Whoever gets control first wins” is a common game shape: find the first position where a player has a real choice.', '“যে প্রথম নিয়ন্ত্রণ পায় সে জেতে” একটি সাধারণ গেমের রূপ: প্রথম অবস্থানটি খুঁজুন যেখানে খেলোয়াড়ের আসল বিকল্প আছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        int k = 0;
        while (k < n && a[k] == 1) k++;
        bool first = (k == n) ? (n % 2 == 1) : (k % 2 == 0);
        puts(first ? "First" : "Second");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['while-n', 'ternary'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('Backward DP over piles', 'স্তূপের ওপর পেছন থেকে DP'),
      idea: L('win[i] = does the player who starts pile i win? win[n] = false; win[i] = true if aᵢ > 1, else !win[i + 1].', 'win[i] = স্তূপ i শুরু করা খেলোয়াড় কি জেতে? win[n] = false; aᵢ > ১ হলে win[i] = true, নইলে !win[i + ১]।'),
      explain: [L('The same insight written as a DP from the last pile: a 1-pile passes the turn, a bigger pile lets you pick whichever of win[i+1] or its negation you like.', 'একই অন্তর্দৃষ্টি শেষ স্তূপ থেকে DP হিসেবে লেখা: ১-এর স্তূপ পালা পার করে, বড় স্তূপ আপনাকে win[i+১] বা তার উল্টো যেকোনোটি বাছতে দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<int> a(n);
        for (auto& x : a) scanf("%d", &x);
        bool win = false;
        for (int i = n - 1; i >= 0; i--) win = a[i] > 1 ? true : !win;
        puts(win ? "First" : "Second");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bool-arith'],
    },
  ],
  tests: [
    { input: '7\n3\n2 5 4\n8\n1 1 1 1 1 1 1 1\n6\n1 2 3 4 5 6\n6\n1 1 2 1 2 2\n1\n1000000000\n5\n1 2 2 1 1\n3\n1 1 1', output: 'First\nSecond\nSecond\nFirst\nFirst\nSecond\nFirst', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Forgetting the all-ones case.', 'সব-এক ক্ষেত্র ভুলে যাওয়া।')],
  related: [{ id: '1370C', name: 'Number Game', why: L('Win/lose states.', 'জয়/হারের অবস্থা।') }],
  toolkit: ['while-n'],
};

export const p1527B1: ProblemEntry = {
  id: '1527B1',
  contestId: 1527,
  index: 'B1',
  name: 'Palindrome Game (easy version)',
  rating: 1200,
  tags: ['constructive', 'games'],
  why: L('Mirror strategy on a palindrome, plus one trick with the centre.', 'প্যালিনড্রোমে প্রতিফলন কৌশল, সঙ্গে কেন্দ্রের একটি কৌশল।'),
  statement: L(
    'A binary palindrome s with at least one 0. Alice and Bob alternate, Alice first. A move either changes a 0 to 1 (costs 1 dollar) or reverses the string (free), allowed only if the string is not a palindrome and the previous move was not a reversal. When all characters are 1, the player who spent less wins. Output ALICE, BOB or DRAW. There are t test cases.',
    'অন্তত একটি ০-সহ একটি বাইনারি প্যালিনড্রোম s। অ্যালিস আর বব পালা করে, অ্যালিস আগে। এক চালে হয় একটি ০ কে ১ করা হয় (১ ডলার খরচ) বা স্ট্রিং উল্টানো হয় (বিনামূল্যে), যা কেবল স্ট্রিং প্যালিনড্রোম না হলে আর আগের চাল উল্টানো না হলে চলে। সব অক্ষর ১ হলে যে কম খরচ করেছে সে জেতে। ALICE, BOB বা DRAW প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and s.', 't; প্রতিটি টেস্টে n আর s।'),
  output: L('ALICE, BOB or DRAW.', 'ALICE, BOB অথবা DRAW।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 1000, s is a palindrome', 'n ≤ ১০০০, s একটি প্যালিনড্রোম')] },
  samples: [{ input: '2\n4\n1001\n1\n0', output: 'BOB\nBOB', explain: L('1001: Alice pays, Bob reverses for free, Alice pays again: 2 vs 0.', '১০০১: অ্যালিস খরচ করে, বব বিনামূল্যে উল্টায়, অ্যালিস আবার খরচ করে: ২ বনাম ০।') }],
  observation: L('Let z be the number of zeros. With z even, Bob mirrors: whenever Alice breaks the palindrome he restores it, except at the very end, where he reverses instead, so Alice ends up paying 2 more: Bob wins. With z odd and z > 1, Alice first fills the centre for 1 dollar, then plays Bob’s mirror strategy and gains 2: Alice wins. z = 1 means Alice must pay the only dollar: Bob.', 'z হলো ০-এর সংখ্যা। z জোড় হলে বব প্রতিফলন করে: অ্যালিস প্যালিনড্রোম ভাঙলেই সে ফিরিয়ে দেয়, শুধু একেবারে শেষে উল্টে দেয়, ফলে অ্যালিস ২ বেশি দেয়: বব জেতে। z বিজোড় আর z > ১ হলে অ্যালিস প্রথমে ১ ডলারে কেন্দ্র ভরে, তারপর ববের প্রতিফলন কৌশল খেলে ২ লাভ করে: অ্যালিস জেতে। z = ১ মানে অ্যালিসকে একমাত্র ডলার দিতে হয়: বব।'),
  approach: [L('Count zeros: z == 1 or even → BOB, otherwise ALICE. DRAW never happens in this version.', '০ গুনুন: z == ১ বা জোড় → BOB, নইলে ALICE। এই সংস্করণে DRAW কখনো হয় না।')],
  walkthrough: { input: '1001', steps: [{ state: 'z = 2', text: L('Alice pays 1, Bob reverses, Alice pays 1 again: 2 vs 0. BOB.', 'অ্যালিস ১ দেয়, বব উল্টায়, অ্যালিস আবার ১ দেয়: ২ বনাম ০। BOB।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Count characters.', 'অক্ষর গোনা।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('Count zeros', '০ গোনা'),
      idea: L('Parity of zeros and the centre trick.', '০-এর জোড়-বিজোড় আর কেন্দ্রের কৌশল।'),
      explain: [L('The free reversal is a “pass” move. Strategy stealing with the centre cell lets Alice become the mirroring player when z is odd.', 'বিনামূল্যে উল্টানো একটি “পাস” চাল। z বিজোড় হলে কেন্দ্রের ঘর দিয়ে কৌশল চুরি করে অ্যালিস প্রতিফলনকারী খেলোয়াড় হয়ে যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        int z = count(s.begin(), s.end(), '0');
        cout << (z == 1 || z % 2 == 0 ? "BOB" : "ALICE") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Minimax over (zeros mask, last move was reverse)', '(০-এর মাস্ক, শেষ চাল উল্টানো কি না)-র ওপর মিনিম্যাক্স'),
      idea: L('g(state) = smallest (my cost − opponent cost) the mover can force.', 'g(অবস্থা) = চালক সর্বনিম্ন যে (আমার খরচ − প্রতিপক্ষের খরচ) জোর করতে পারে।'),
      explain: [L('A flip costs 1 and gives the opponent the turn: 1 − g(next). A reversal costs 0: −g(reversed). States are finite because two reversals in a row are banned and each flip removes a zero.', 'একটি ফ্লিপ ১ খরচ করে আর প্রতিপক্ষকে পালা দেয়: ১ − g(পরের)। উল্টানো ০ খরচ: −g(উল্টো)। অবস্থা সসীম কারণ পরপর দুবার উল্টানো নিষিদ্ধ আর প্রতিটি ফ্লিপ একটি ০ সরায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
map<pair<string, bool>, int> memo;

int g(const string& s, bool lastRev) {
    if (count(s.begin(), s.end(), '0') == 0) return 0;
    auto key = make_pair(s, lastRev);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    int best = INT_MAX;
    for (int i = 0; i < n; i++)
        if (s[i] == '0') {
            string u = s;
            u[i] = '1';
            best = min(best, 1 - g(u, false));
        }
    string r(s.rbegin(), s.rend());
    if (!lastRev && r != s) best = min(best, -g(r, true));
    return memo[key] = best;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> n >> s;
        if (n > 12) { cout << "\n"; continue; }
        memo.clear();
        int v = g(s, false);
        cout << (v < 0 ? "ALICE" : v > 0 ? "BOB" : "DRAW") << "\n";
    }
    return 0;
}
`,
      time: 'O(2ⁿ · n²)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['map', 'functions'],
    },
  ],
  tests: [
    { input: '2\n4\n1001\n1\n0', output: 'BOB\nBOB', source: 'sample', note: sample(1) },
    { input: '2\n3\n000\n5\n10001', output: 'ALICE\nALICE', source: 'own', note: L('Three zeros: Alice takes the centre first.', 'তিনটি ০: অ্যালিস আগে কেন্দ্র নেয়।') },
  ],
  pitfalls: [L('Printing ALICE for z = 1.', 'z = ১-এ ALICE প্রিন্ট।')],
  related: [{ id: '1382B', name: 'Sequential Nim', why: L('Control-based game reasoning.', 'নিয়ন্ত্রণ-ভিত্তিক গেম যুক্তি।') }],
  toolkit: ['count-find'],
};

export const p1370C: ProblemEntry = {
  id: '1370C',
  contestId: 1370,
  index: 'C',
  name: 'Number Game',
  rating: 1400,
  tags: ['games', 'math', 'number-theory'],
  featuredFor: ['games'],
  why: L('Classify winning and losing numbers by their factorisation.', 'উৎপাদকে বিশ্লেষণ দিয়ে জয়ের আর হারের সংখ্যা শ্রেণিবদ্ধ।'),
  statement: L(
    'Ashishgup and FastestFinger play with n, Ashishgup first. A move either divides n by an odd divisor greater than 1, or subtracts 1 if n > 1. The player who cannot move (n = 1) loses. Who wins? There are t test cases.',
    'আশিশগুপ আর ফাস্টেস্টফিঙ্গার n নিয়ে খেলে, আশিশগুপ আগে। এক চালে হয় n-কে ১-এর বড় একটি বিজোড় ভাজক দিয়ে ভাগ, নয়তো n > ১ হলে ১ বিয়োগ। যে চাল দিতে পারে না (n = ১) সে হারে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t, then n for each test.', 't, তারপর প্রতিটি টেস্টের n।'),
  output: L('Ashishgup or FastestFinger.', 'Ashishgup অথবা FastestFinger।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹', '১ ≤ n ≤ ১০⁹')] },
  samples: [{ input: '7\n1\n2\n3\n4\n5\n6\n12', output: 'FastestFinger\nAshishgup\nAshishgup\nFastestFinger\nAshishgup\nFastestFinger\nAshishgup', explain: L('6 = 2·3: dividing by 3 leaves 2 (opponent wins), subtracting leaves 5 (opponent wins).', '৬ = ২·৩: ৩ দিয়ে ভাগে ২ থাকে (প্রতিপক্ষ জেতে), বিয়োগে ৫ থাকে (প্রতিপক্ষ জেতে)।') }],
  observation: L('n = 1 loses; n = 2 wins (subtract). Odd n > 1 wins (divide by n → 1). A power of two > 2 loses: the only move is subtracting, which gives an odd number. Otherwise n = 2ᵏ·m with odd m > 1: if k ≥ 2, divide by m to reach a losing power of two; if k = 1 and m is prime, both moves lose (2 or an odd number); if k = 1 and m is composite, divide by m / p to leave 2p, a losing number.', 'n = ১ হারে; n = ২ জেতে (বিয়োগ)। বিজোড় n > ১ জেতে (n দিয়ে ভাগ → ১)। ২-এর বড় দুইয়ের ঘাত হারে: একমাত্র চাল বিয়োগ, যা বিজোড় দেয়। নইলে n = ২ᵏ·m, বিজোড় m > ১: k ≥ ২ হলে m দিয়ে ভাগ করে হারানো দুইয়ের ঘাতে যান; k = ১ আর m মৌলিক হলে দুটি চালই হারায় (২ বা বিজোড়); k = ১ আর m যৌগিক হলে m / p দিয়ে ভাগ করে ২p রাখুন, একটি হারানো সংখ্যা।'),
  approach: [L('Apply the case analysis with a trial-division primality test.', 'ট্রায়াল ডিভিশন মৌলিকতা পরীক্ষাসহ ক্ষেত্র বিশ্লেষণ প্রয়োগ।')],
  walkthrough: { input: '12 = 2²·3', steps: [{ state: 'k = 2', text: L('Divide by 3 → 4, a losing number. Ashishgup.', '৩ দিয়ে ভাগ → ৪, হারানো সংখ্যা। Ashishgup।') }] },
  complexity: { time: 'O(√n)', space: 'O(1)', why: L('One primality test.', 'একটি মৌলিকতা পরীক্ষা।') },
  solutions: [
    {
      id: 'cases',
      kind: 'optimal',
      title: L('Case analysis on the factorisation', 'উৎপাদকে বিশ্লেষণের ওপর ক্ষেত্র বিশ্লেষণ'),
      idea: L('Losing numbers: 1, powers of two ≥ 4, and 2·(odd prime).', 'হারানো সংখ্যা: ১, ≥ ৪ দুইয়ের ঘাত, আর ২·(বিজোড় মৌলিক)।'),
      explain: [L('(n & (n − 1)) == 0 tests for a power of two. The structure of a game proof is always the same: every move from a losing state reaches a winning one, and every winning state has a move to a losing one.', '(n & (n − ১)) == ০ দুইয়ের ঘাত পরীক্ষা করে। গেমের প্রমাণের কাঠামো সবসময় একই: হারানো অবস্থা থেকে প্রতিটি চাল জয়ের অবস্থায় যায়, আর প্রতিটি জয়ের অবস্থা থেকে একটি হারানো অবস্থায় যাওয়ার চাল আছে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int d = 2; (long long)d * d <= x; d++) if (x % d == 0) return false;
    return true;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        bool first;
        if (n == 1) first = false;
        else if (n == 2 || n % 2 == 1) first = true;
        else if ((n & (n - 1)) == 0) first = false;
        else if ((n / 2) % 2 == 1 && isPrime(n / 2)) first = false;
        else first = true;
        cout << (first ? "Ashishgup" : "FastestFinger") << "\n";
    }
    return 0;
}
`,
      time: 'O(√n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Win/lose DP up to n', 'n পর্যন্ত জয়/হার DP'),
      idea: L('win[x] = some move from x reaches a losing number.', 'win[x] = x থেকে কোনো চাল হারানো সংখ্যায় পৌঁছায়।'),
      explain: [L('Fill win[] from 1 upward, trying x − 1 and x / d for every odd divisor d > 1. Too slow for 10⁹, but printing the losing numbers it finds is how the pattern 1, 4, 6, 8, 10, 14, 16… shows up.', '১ থেকে ওপরে win[] ভরুন, x − ১ আর প্রতিটি বিজোড় ভাজক d > ১-এর জন্য x / d চেষ্টা করে। ১০⁹-এর জন্য খুব ধীর, কিন্তু এটি যে হারানো সংখ্যা পায় তা প্রিন্ট করলেই ১, ৪, ৬, ৮, ১০, ১৪, ১৬… প্যাটার্ন দেখা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n > 100000) { cout << "\n"; continue; }
        vector<bool> win(n + 1, false);
        for (int x = 2; x <= n; x++) {
            bool w = !win[x - 1];
            for (int d = 3; d <= x && !w; d += 2)
                if (x % d == 0 && !win[x / d]) w = true;
            win[x] = w;
        }
        cout << (win[n] ? "Ashishgup" : "FastestFinger") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '7\n1\n2\n3\n4\n5\n6\n12', output: 'FastestFinger\nAshishgup\nAshishgup\nFastestFinger\nAshishgup\nFastestFinger\nAshishgup', source: 'sample', note: sample(1) },
    { input: '3\n18\n30\n1000000000', output: 'Ashishgup\nAshishgup\nAshishgup', source: 'own', note: L('18 = 2·9 and 30 = 2·15 have composite odd parts.', '১৮ = ২·৯ আর ৩০ = ২·১৫-এর বিজোড় অংশ যৌগিক।') },
  ],
  pitfalls: [L('Treating n = 2 like other powers of two.', 'n = ২-কে অন্য দুইয়ের ঘাতের মতো ধরা।')],
  related: [{ id: '1382B', name: 'Sequential Nim', why: L('Winning/losing positions.', 'জয়/হারের অবস্থান।') }],
  toolkit: ['bitwise-and'],
};

export const p276B: ProblemEntry = {
  id: '276B',
  contestId: 276,
  index: 'B',
  name: 'Little Girl and Game',
  rating: 1300,
  tags: ['games', 'greedy'],
  why: L('Only the number of letters with odd count matters, and each move changes it by one.', 'শুধু বিজোড় গণনার অক্ষরের সংখ্যা গুরুত্বপূর্ণ, আর প্রতিটি চাল তা এক বদলায়।'),
  statement: L('Two players alternately remove one letter from a string, First starting. If before a player’s turn the letters can be rearranged into a palindrome, that player wins. Who wins?', 'দুজন খেলোয়াড় পালা করে একটি স্ট্রিং থেকে একটি অক্ষর সরায়, First শুরু করে। কোনো খেলোয়াড়ের পালার আগে অক্ষরগুলো সাজিয়ে প্যালিনড্রোম বানানো গেলে সেই খেলোয়াড় জেতে। কে জেতে?'),
  input: L('The string s.', 'স্ট্রিং s।'),
  output: L('First or Second.', 'First অথবা Second।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|s| ≤ 1000', '|s| ≤ ১০০০')] },
  samples: [
    { input: 'aba', output: 'First', explain: L('Already a palindrome.', 'আগেই প্যালিনড্রোম।') },
    { input: 'abca', output: 'Second', explain: L('Two odd letters: whatever First removes, one odd letter remains for Second.', 'দুটি বিজোড় অক্ষর: First যা-ই সরাক, Second-এর জন্য একটি বিজোড় অক্ষর থাকে।') },
  ],
  observation: L('A multiset is palindromable iff at most one letter has odd count. Let c be the number of odd letters. Removing a letter changes c by exactly 1. With c ≤ 1 the mover wins now; otherwise moves count c down, and the player facing c = 1 wins. So First wins iff c is 0 or odd.', 'একটি মাল্টিসেট প্যালিনড্রোম করা যায় ঠিক তখনই যখন সর্বোচ্চ একটি অক্ষরের গণনা বিজোড়। c হলো বিজোড় অক্ষরের সংখ্যা। একটি অক্ষর সরালে c ঠিক ১ বদলায়। c ≤ ১ হলে চালক এখনই জেতে; নইলে চালগুলো c কমায়, আর c = ১-এর সামনে থাকা খেলোয়াড় জেতে। তাই c ০ বা বিজোড় হলেই First জেতে।'),
  approach: [L('Count letters, count odd ones, check parity.', 'অক্ষর গুনে বিজোড়গুলো গুনে জোড়-বিজোড় দেখুন।')],
  walkthrough: { input: 'abca', steps: [{ state: 'odd: b, c → c = 2', text: L('Even and nonzero: Second.', 'জোড় আর শূন্য নয়: Second।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('26 counters.', '২৬টি কাউন্টার।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Parity of odd letters', 'বিজোড় অক্ষরের জোড়-বিজোড়'),
      idea: L('c == 0 or c odd → First.', 'c == ০ বা c বিজোড় → First।'),
      explain: [L('Removing a letter from an odd group makes it even, removing from an even group makes it odd: either way c moves by one, so nobody can speed up or slow down the countdown.', 'বিজোড় দল থেকে অক্ষর সরালে তা জোড় হয়, জোড় দল থেকে সরালে বিজোড়: যেভাবেই হোক c এক সরে, তাই কেউ গণনা দ্রুত বা ধীর করতে পারে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[26] = {};
    for (char ch : s) cnt[ch - 'a']++;
    int odd = 0;
    for (int x : cnt) odd += x % 2;
    cout << (odd == 0 || odd % 2 == 1 ? "First" : "Second") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['char-count', 'modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Memoised game search on letter counts', 'অক্ষর গণনার ওপর মেমোসহ গেম খোঁজ'),
      idea: L('win(counts) = palindromable, or some removal leads to a losing state.', 'win(গণনা) = প্যালিনড্রোম করা যায়, বা কোনো সরানো হারানো অবস্থায় নেয়।'),
      explain: [L('State = the sorted string. Exponential in general, but it confirms the parity rule on short strings.', 'অবস্থা = সাজানো স্ট্রিং। সাধারণভাবে সূচকীয়, কিন্তু ছোট স্ট্রিংয়ে জোড়-বিজোড় নিয়ম নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<string, bool> memo;

bool palin(const string& s) {
    int cnt[26] = {}, odd = 0;
    for (char ch : s) cnt[ch - 'a']++;
    for (int x : cnt) odd += x % 2;
    return odd <= 1;
}

bool win(const string& s) {
    if (palin(s)) return true;
    auto it = memo.find(s);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (size_t i = 0; i < s.size() && !w; i++) {
        if (i && s[i] == s[i - 1]) continue;
        if (!win(s.substr(0, i) + s.substr(i + 1))) w = true;
    }
    return memo[s] = w;
}

int main() {
    string s;
    cin >> s;
    if (s.size() > 14) { cout << "\n"; return 0; }
    sort(s.begin(), s.end());
    cout << (win(s) ? "First" : "Second") << "\n";
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['map', 'functions'],
    },
  ],
  tests: [
    { input: 'aba', output: 'First', source: 'sample', note: sample(1) },
    { input: 'abca', output: 'Second', source: 'sample', note: sample(2) },
    { input: 'abc', output: 'First', source: 'own', note: L('Three odd letters.', 'তিনটি বিজোড় অক্ষর।') },
  ],
  pitfalls: [L('Simulating instead of counting.', 'গোনার বদলে সিমুলেশন।')],
  related: [{ id: '1527B1', name: 'Palindrome Game', why: L('Palindrome games.', 'প্যালিনড্রোম গেম।') }],
  toolkit: ['char-count'],
};

export const p1858A: ProblemEntry = {
  id: '1858A',
  contestId: 1858,
  index: 'A',
  name: 'Buttons',
  rating: 800,
  tags: ['games', 'greedy', 'math'],
  why: L('Shared resources first: both players press common buttons before their own.', 'ভাগের সম্পদ আগে: দুজনেই নিজেদেরগুলোর আগে সাধারণ বোতাম চাপে।'),
  statement: L(
    'There are a buttons only Anna can press, b only Katie can press, and c that either can press. Each button can be pressed once. Anna moves first; a player who cannot press anything loses. Who wins? There are t test cases.',
    'a-টি বোতাম শুধু আন্না চাপতে পারে, b-টি শুধু কেটি, আর c-টি যেকেউ। প্রতিটি বোতাম একবার চাপা যায়। আন্না আগে; যে কিছু চাপতে পারে না সে হারে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t, then a b c for each test.', 't, তারপর প্রতিটি টেস্টের a b c।'),
  output: L('First (Anna) or Second (Katie).', 'First (আন্না) অথবা Second (কেটি)।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a, b, c ≤ 10⁹', '১ ≤ a, b, c ≤ ১০⁹')] },
  samples: [{ input: '5\n1 1 1\n9 3 3\n1 2 3\n6 6 9\n2 2 8', output: 'First\nFirst\nSecond\nFirst\nSecond', explain: L('1 1 1: Anna takes the common button, then each has one; Katie runs out first.', '১ ১ ১: আন্না সাধারণ বোতাম নেয়, তারপর প্রত্যেকের একটি; কেটি আগে ফুরায়।') }],
  observation: L('Pressing a common button costs the opponent a potential move, so both press common buttons first. Anna gets ⌈c / 2⌉ of them, Katie ⌊c / 2⌋, and Anna’s extra one effectively adds 1 to her own pile when c is odd. Then Anna wins iff a + (c mod 2) > b.', 'সাধারণ বোতাম চাপলে প্রতিপক্ষের একটি সম্ভাব্য চাল কমে, তাই দুজনেই আগে সাধারণ বোতাম চাপে। আন্না পায় ⌈c / ২⌉টি, কেটি ⌊c / ২⌋টি, আর c বিজোড় হলে আন্নার বাড়তিটি কার্যত তার নিজের স্তূপে ১ যোগ করে। তখন a + (c mod ২) > b হলেই আন্না জেতে।'),
  approach: [L('Compare a + c % 2 with b.', 'a + c % ২-কে b-র সঙ্গে তুলনা।')],
  walkthrough: { input: '1 2 3', steps: [{ state: 'a + 1 = 2, b = 2', text: L('Not greater: Second.', 'বড় নয়: Second।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Arithmetic.', 'পাটিগণিত।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Common buttons first', 'আগে সাধারণ বোতাম'),
      idea: L('a + c % 2 > b → First.', 'a + c % ২ > b → First।'),
      explain: [L('With equal piles after the common phase, the player to move (Anna) runs out first, which is why the comparison is strict.', 'সাধারণ পর্বের পরে স্তূপ সমান হলে যার চাল (আন্না) সে আগে ফুরায়, তাই তুলনাটি কঠোর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long a, b, c;
        cin >> a >> b >> c;
        cout << (a + c % 2 > b ? "First" : "Second") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Win/lose table over (a, b, c, turn)', '(a, b, c, পালা)-র ওপর জয়/হার টেবিল'),
      idea: L('The mover wins if some press leads to a state where the other player loses.', 'কোনো চাপ যদি এমন অবস্থায় নেয় যেখানে অন্যজন হারে তবে চালক জেতে।'),
      explain: [L('Small values only, but this is the general method for any finite game, and it confirms the greedy “common first” idea.', 'শুধু ছোট মান, কিন্তু এটি যেকোনো সসীম গেমের সাধারণ পদ্ধতি আর গ্রিডি “আগে সাধারণ” ধারণা নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<array<int, 4>, bool> memo;

// turn 0 = Anna, 1 = Katie; returns whether the mover wins
bool win(int a, int b, int c, int turn) {
    array<int, 4> key = {a, b, c, turn};
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    bool w = false;
    int own = turn == 0 ? a : b;
    if (own > 0) w |= turn == 0 ? !win(a - 1, b, c, 1) : !win(a, b - 1, c, 0);
    if (c > 0) w |= !win(a, b, c - 1, 1 - turn);
    return memo[key] = w;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int a, b, c;
        cin >> a >> b >> c;
        if (a > 30 || b > 30 || c > 30) { cout << "\n"; continue; }
        cout << (win(a, b, c, 0) ? "First" : "Second") << "\n";
    }
    return 0;
}
`,
      time: 'O(a · b · c)',
      space: 'O(a · b · c)',
      accepted: false,
      toolkit: ['map', 'functions'],
    },
  ],
  tests: [
    { input: '5\n1 1 1\n9 3 3\n1 2 3\n6 6 9\n2 2 8', output: 'First\nFirst\nSecond\nFirst\nSecond', source: 'sample', note: sample(1) },
    { input: '1\n1000000000 1000000000 1', output: 'First', source: 'own', note: L('The odd common button breaks the tie.', 'বিজোড় সাধারণ বোতাম সমতা ভাঙে।') },
  ],
  pitfalls: [L('Using ≥ instead of >.', '>-এর বদলে ≥।')],
  related: [{ id: '1899A', name: 'Game with Integers', why: L('One-line games.', 'এক লাইনের গেম।') }],
  toolkit: ['modulo'],
};
