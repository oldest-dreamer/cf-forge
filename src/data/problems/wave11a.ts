import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1537D: ProblemEntry = {
  id: '1537D',
  contestId: 1537,
  index: 'D',
  name: 'Deleting Divisors',
  rating: 1700,
  tags: ['games', 'math', 'number-theory'],
  why: L('Find the losing positions with a brute-force table, then prove the pattern: odd numbers and odd powers of two lose.', 'ব্রুট-ফোর্স টেবিলে হারানো অবস্থান খুঁজে প্যাটার্নটি প্রমাণ: বিজোড় সংখ্যা আর দুইয়ের বিজোড় ঘাত হারে।'),
  statement: L('Starting from n, players alternately subtract a divisor of the current number that is neither 1 nor the number itself. The player who cannot move loses. Alice moves first. Who wins? There are t test cases.', 'n থেকে শুরু করে খেলোয়াড়রা পালা করে বর্তমান সংখ্যার এমন একটি ভাজক বিয়োগ করে যা ১ বা সংখ্যাটি নিজে নয়। যে চাল দিতে পারে না সে হারে। অ্যালিস আগে। কে জেতে? t-টি টেস্ট কেস আছে।'),
  input: L('t, then n per test.', 't, তারপর প্রতিটি টেস্টে n।'),
  output: L('Alice or Bob.', 'Alice অথবা Bob।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 10⁹', '১ ≤ n ≤ ১০⁹')] },
  samples: [{ input: '4\n1\n4\n12\n69', output: 'Bob\nAlice\nAlice\nBob', explain: L('4: subtract 2 → 2, which is prime, so Bob is stuck.', '৪: ২ বিয়োগ → ২, যা মৌলিক, তাই বব আটকে যায়।') }],
  observation: L('Odd n loses: every divisor d of an odd number is odd, so n − d is even and still has the odd divisor d; the opponent subtracts d again and hands back an odd number, until you are stuck on an odd prime. Even n that is not a power of two wins by subtracting an odd divisor, giving an odd number. For n = 2ᵏ the only sensible move is to 2ᵏ⁻¹ (other moves give even non-powers, which win for the opponent), so 2ᵏ wins iff k is even.', 'বিজোড় n হারে: প্রতিটি ভাজক d বিজোড়, তাই n − d জোড় আর তার একটি বিজোড় ভাজক d আছে; প্রতিপক্ষ আবার d বিয়োগ করে বিজোড়ে ফেরে। দুইয়ের ঘাত নয় এমন জোড় n একটি বিজোড় ভাজক বিয়োগ করে বিজোড় সংখ্যা দিয়ে জেতে। n = ২ᵏ-এ একমাত্র যুক্তিসংগত চাল ২ᵏ⁻¹-এ (অন্য চাল ঘাত নয় এমন জোড় দেয়, যা প্রতিপক্ষের জন্য জয়ের), তাই ২ᵏ জেতে ঠিক তখনই যখন k জোড়।'),
  approach: [L('Odd → Bob. Power of two 2ᵏ → Alice iff k even. Other even → Alice.', 'বিজোড় → Bob। দুইয়ের ঘাত ২ᵏ → k জোড় হলেই Alice। অন্য জোড় → Alice।')],
  walkthrough: { input: '12', steps: [{ state: '12 even, not a power of two', text: L('Subtract 3 → 9 (odd, losing for Bob). Alice.', '৩ বিয়োগ → ৯ (বিজোড়, ববের জন্য হারানো)। Alice।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A few bit operations.', 'কয়েকটি বিট অপারেশন।') },
  solutions: [
    {
      id: 'rule',
      kind: 'optimal',
      title: L('Parity and powers of two', 'জোড়-বিজোড় আর দুইয়ের ঘাত'),
      idea: L('Three cases.', 'তিনটি ক্ষেত্র।'),
      explain: [L('__builtin_ctz(n) gives k when n = 2ᵏ. The workflow — tabulate small n, spot the losing set, prove it — is the standard way to crack number games.', 'n = ২ᵏ হলে __builtin_ctz(n) k দেয়। কাজের ধারা — ছোট n-এর টেবিল, হারানো সেট চেনা, প্রমাণ — সংখ্যার গেম ভাঙার প্রচলিত উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        bool alice;
        if (n % 2 == 1) alice = false;
        else if ((n & (n - 1)) == 0) alice = __builtin_ctzll(n) % 2 == 0;
        else alice = true;
        cout << (alice ? "Alice" : "Bob") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['bitwise-and', 'modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Win/lose table', 'জয়/হার টেবিল'),
      idea: L('win[x] = some proper divisor d gives a losing x − d.', 'win[x] = কোনো প্রকৃত ভাজক d একটি হারানো x − d দেয়।'),
      explain: [L('O(n √n) up to the queried n. Printing the losing x it finds — 1, 2, 3, 5, 7, 8, 9, 11, … — is how the rule is discovered.', 'চাওয়া n পর্যন্ত O(n √n)। এটি যে হারানো x পায় — ১, ২, ৩, ৫, ৭, ৮, ৯, ১১, … — তা প্রিন্ট করেই নিয়মটি আবিষ্কার হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n > 20000) { cout << "\n"; continue; }
        vector<bool> win(n + 1, false);
        for (int x = 2; x <= n; x++)
            for (int d = 2; d * d <= x && !win[x]; d++)
                if (x % d == 0 && (!win[x - d] || (x / d != x && x / d > 1 && !win[x - x / d]))) win[x] = true;
        cout << (win[n] ? "Alice" : "Bob") << "\n";
    }
    return 0;
}
`,
      time: 'O(n √n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n1\n4\n12\n69', output: 'Bob\nAlice\nAlice\nBob', source: 'sample', note: sample(1) },
    { input: '3\n2\n8\n16', output: 'Bob\nBob\nAlice', source: 'own', note: L('Powers of two: 2¹, 2³ lose; 2⁴ wins.', 'দুইয়ের ঘাত: ২¹, ২³ হারে; ২⁴ জেতে।') },
  ],
  pitfalls: [L('Treating every even number as winning.', 'প্রতিটি জোড় সংখ্যাকে জয়ের ধরা।')],
  related: [{ id: '1370C', name: 'Number Game', why: L('Another factorisation game.', 'আরেকটি উৎপাদক-বিশ্লেষণের গেম।') }],
  toolkit: ['bitwise-and'],
};

export const p1451D: ProblemEntry = {
  id: '1451D',
  contestId: 1451,
  index: 'D',
  name: 'Circle Game',
  rating: 1700,
  tags: ['games', 'geometry', 'math'],
  featuredFor: ['geometry'],
  why: L('Symmetry along the diagonal: the second player mirrors, so everything depends on the last diagonal point inside the circle.', 'কর্ণ বরাবর প্রতিসাম্য: দ্বিতীয় খেলোয়াড় প্রতিফলন করে, তাই সবকিছু বৃত্তের ভেতরের শেষ কর্ণ বিন্দুর ওপর নির্ভর করে।'),
  statement: L('A token starts at (0, 0). Players alternately increase its x or y coordinate by exactly k; the token must stay within distance d of the origin. The player who cannot move loses. Ashish moves first. Who wins? There are t test cases.', 'একটি টোকেন (০, ০) থেকে শুরু। খেলোয়াড়রা পালা করে এর x বা y স্থানাঙ্ক ঠিক k বাড়ায়; টোকেনকে মূলবিন্দু থেকে d দূরত্বের মধ্যে থাকতে হবে। যে চাল দিতে পারে না সে হারে। আশিশ আগে। কে জেতে? t-টি টেস্ট কেস আছে।'),
  input: L('t, then d k per test.', 't, তারপর প্রতিটি টেস্টে d k।'),
  output: L('Ashish or Utkarsh.', 'Ashish অথবা Utkarsh।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k ≤ d ≤ 10⁵', '১ ≤ k ≤ d ≤ ১০⁵')] },
  samples: [{ input: '5\n2 1\n5 2\n10 3\n25 4\n15441 33', output: 'Utkarsh\nAshish\nUtkarsh\nUtkarsh\nAshish', explain: L('d = 2, k = 1: (1, 1) is inside but neither (2, 1) nor (1, 2) is, so after two moves Ashish is stuck.', 'd = ২, k = ১: (১, ১) ভেতরে কিন্তু (২, ১) বা (১, ২) নয়, তাই দুই চালের পরে আশিশ আটকে যায়।') }],
  observation: L('Let z be the largest integer with (zk, zk) inside the circle. Utkarsh can always answer to return to the diagonal, reaching (zk, zk) after 2z moves. If (zk, (z+1)k) is also inside, Ashish takes that step and then mirrors Utkarsh instead, winning; otherwise Utkarsh wins.', 'z হলো সবচেয়ে বড় পূর্ণসংখ্যা যেখানে (zk, zk) বৃত্তের ভেতরে। উৎকর্ষ সবসময় উত্তর দিয়ে কর্ণে ফিরতে পারে, ২z চালে (zk, zk)-তে পৌঁছায়। যদি (zk, (z+১)k)-ও ভেতরে থাকে, আশিশ সেই ধাপ নিয়ে তারপর উৎকর্ষকে প্রতিফলন করে জেতে; নইলে উৎকর্ষ জেতে।'),
  approach: [L('Increase z while 2((z+1)k)² ≤ d²; then test z²k² + (z+1)²k² ≤ d².', '২((z+১)k)² ≤ d² যতক্ষণ z বাড়ান; তারপর z²k² + (z+১)²k² ≤ d² পরীক্ষা।')],
  walkthrough: { input: 'd = 5, k = 2', steps: [{ state: 'z = 1: (2, 2) inside, (4, 4) not', text: L('(2, 4): 4 + 16 = 20 ≤ 25: Ashish.', '(২, ৪): ৪ + ১৬ = ২০ ≤ ২৫: Ashish।') }] },
  complexity: { time: 'O(d / k)', space: 'O(1)', why: L('z ≤ d / k.', 'z ≤ d / k।') },
  solutions: [
    {
      id: 'diagonal',
      kind: 'optimal',
      title: L('Last diagonal point', 'শেষ কর্ণ বিন্দু'),
      idea: L('Mirror strategy around y = x.', 'y = x-এর চারপাশে প্রতিফলন কৌশল।'),
      explain: [L('Integer arithmetic only: compare squared distances in long long to avoid floating-point errors near the boundary.', 'শুধু পূর্ণসংখ্যার পাটিগণিত: সীমানার কাছে ভাসমান-বিন্দুর ভুল এড়াতে long long-এ দূরত্বের বর্গ তুলনা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long d, k;
        cin >> d >> k;
        long long z = 0;
        while (2 * ((z + 1) * k) * ((z + 1) * k) <= d * d) z++;
        bool ashish = (z * k) * (z * k) + ((z + 1) * k) * ((z + 1) * k) <= d * d;
        cout << (ashish ? "Ashish" : "Utkarsh") << "\n";
    }
    return 0;
}
`,
      time: 'O(d / k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'while-n'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Win/lose grid', 'জয়/হার গ্রিড'),
      idea: L('win[i][j] for the point (ik, jk), filled from far to near.', 'বিন্দু (ik, jk)-এর জন্য win[i][j], দূর থেকে কাছে ভরা।'),
      explain: [L('A DAG game on the lattice points inside the circle. It confirms the mirror argument on small inputs.', 'বৃত্তের ভেতরের ল্যাটিস বিন্দুতে একটি DAG গেম। এটি ছোট ইনপুটে প্রতিফলন যুক্তি নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long d, k;
        cin >> d >> k;
        int M = d / k;
        if (M > 2000) { cout << "\n"; continue; }
        auto inside = [&](long long i, long long j) { return (i * k) * (i * k) + (j * k) * (j * k) <= d * d; };
        vector<vector<char>> win(M + 2, vector<char>(M + 2, 0));
        for (int i = M; i >= 0; i--)
            for (int j = M; j >= 0; j--) {
                if (!inside(i, j)) continue;
                bool w = false;
                if (inside(i + 1, j) && !win[i + 1][j]) w = true;
                if (inside(i, j + 1) && !win[i][j + 1]) w = true;
                win[i][j] = w;
            }
        cout << (win[0][0] ? "Ashish" : "Utkarsh") << "\n";
    }
    return 0;
}
`,
      time: 'O((d / k)²)',
      space: 'O((d / k)²)',
      accepted: false,
      toolkit: ['lambda', 'vector'],
    },
  ],
  tests: [{ input: '5\n2 1\n5 2\n10 3\n25 4\n15441 33', output: 'Utkarsh\nAshish\nUtkarsh\nUtkarsh\nAshish', source: 'sample', note: sample(1) }],
  pitfalls: [L('Using sqrt and doubles at the boundary.', 'সীমানায় sqrt আর double ব্যবহার।')],
  related: [{ id: '1365A', name: 'Matrix Game', why: L('Counting forced moves.', 'বাধ্য চাল গোনা।') }],
  toolkit: ['long-long'],
};

export const p1194D: ProblemEntry = {
  id: '1194D',
  contestId: 1194,
  index: 'D',
  name: '1-2-K Game',
  rating: 1700,
  tags: ['games', 'math'],
  why: L('Without k the losing cells are multiples of 3; a k divisible by 3 adds a period of k + 1.', 'k ছাড়া হারানো ঘর ৩-এর গুণিতক; ৩ দিয়ে বিভাজ্য k k + ১-এর একটি পর্যায় যোগ করে।'),
  statement: L('A chip is at cell n of a strip 0 … n. Players alternately move it 1, 2 or k cells left (not past 0). The player who cannot move loses. Alice starts. Who wins? There are t test cases.', '০ … n ফালির n ঘরে একটি চিপ। খেলোয়াড়রা পালা করে এটি ১, ২ বা k ঘর বামে সরায় (০ পেরিয়ে নয়)। যে চাল দিতে পারে না সে হারে। অ্যালিস শুরু করে। কে জেতে? t-টি টেস্ট কেস আছে।'),
  input: L('t, then n k per test.', 't, তারপর প্রতিটি টেস্টে n k।'),
  output: L('Alice or Bob.', 'Alice অথবা Bob।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('0 ≤ n ≤ 10⁹, 3 ≤ k ≤ 10⁹', '০ ≤ n ≤ ১০⁹, ৩ ≤ k ≤ ১০⁹')] },
  samples: [{ input: '4\n0 3\n3 3\n3 4\n4 4', output: 'Bob\nAlice\nBob\nAlice', explain: L('n = 3, k = 3: Alice jumps straight to 0.', 'n = ৩, k = ৩: অ্যালিস সরাসরি ০-তে লাফ দেয়।') }],
  observation: L('If k is not a multiple of 3, a k-move never changes n mod 3 in a useful way, and the losing cells are exactly the multiples of 3. If k is a multiple of 3, the pattern repeats with period k + 1: inside one period, position k is winning (jump to 0) and the others follow the mod-3 rule.', 'k ৩-এর গুণিতক না হলে k-চাল n mod ৩-কে কাজে লাগানোর মতো বদলায় না, আর হারানো ঘর ঠিক ৩-এর গুণিতক। k ৩-এর গুণিতক হলে প্যাটার্ন k + ১ পর্যায়ে ঘোরে: এক পর্যায়ের ভেতরে অবস্থান k জয়ের (০-তে লাফ) আর বাকিরা mod-৩ নিয়ম মানে।'),
  approach: [L('k % 3 ≠ 0: Bob iff n % 3 == 0. Else m = n % (k + 1): Alice if m == k, else Bob iff m % 3 == 0.', 'k % ৩ ≠ ০: n % ৩ == ০ হলেই Bob। নইলে m = n % (k + ১): m == k হলে Alice, নইলে m % ৩ == ০ হলেই Bob।')],
  walkthrough: { input: 'k = 3: positions 0…7', steps: [{ state: 'L W W W L W W W', text: L('Period 4 = k + 1, and position 3 wins via the k-move.', 'পর্যায় ৪ = k + ১, আর অবস্থান ৩ k-চালে জেতে।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Arithmetic.', 'পাটিগণিত।') },
  solutions: [
    {
      id: 'period',
      kind: 'optimal',
      title: L('Periodic losing positions', 'পর্যায়বৃত্ত হারানো অবস্থান'),
      idea: L('Two cases on k mod 3.', 'k mod ৩-এর ওপর দুটি ক্ষেত্র।'),
      explain: [L('Subtraction games always become periodic. A brute-force table up to a few hundred reveals the period; then you only need to explain it.', 'বিয়োগের গেম সবসময় পর্যায়বৃত্ত হয়। কয়েকশো পর্যন্ত ব্রুট-ফোর্স টেবিল পর্যায় দেখায়; তারপর শুধু ব্যাখ্যা করতে হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        bool bob;
        if (k % 3 != 0) bob = n % 3 == 0;
        else {
            long long m = n % (k + 1);
            bob = (m != k) && m % 3 == 0;
        }
        cout << (bob ? "Bob" : "Alice") << "\n";
    }
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo', 'bool-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Win/lose table', 'জয়/হার টেবিল'),
      idea: L('win[i] = some move to i − 1, i − 2 or i − k loses.', 'win[i] = i − ১, i − ২ বা i − k-তে কোনো চাল হারায়।'),
      explain: [L('O(n): the subtraction game straight from the statement.', 'O(n): স্টেটমেন্ট থেকে সরাসরি বিয়োগের গেম।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n, k;
        cin >> n >> k;
        if (n > 1000000) { cout << "\n"; continue; }
        vector<bool> win(n + 1, false);
        for (long long i = 1; i <= n; i++)
            win[i] = !win[i - 1] || (i >= 2 && !win[i - 2]) || (i >= k && !win[i - k]);
        cout << (win[n] ? "Alice" : "Bob") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n0 3\n3 3\n3 4\n4 4', output: 'Bob\nAlice\nBob\nAlice', source: 'sample', note: sample(1) },
    { input: '2\n1000000000 3\n1000000000 1000000000', output: 'Bob\nAlice', source: 'own', note: L('Huge n.', 'বিশাল n।') },
  ],
  pitfalls: [L('Forgetting that the k-jump to exactly 0 is allowed.', 'ঠিক ০-তে k-লাফ অনুমোদিত তা ভুলে যাওয়া।')],
  related: [{ id: '1899A', name: 'Game with Integers', why: L('Mod-3 games.', 'mod-৩ গেম।') }],
  toolkit: ['modulo'],
};

export const p1695B: ProblemEntry = {
  id: '1695B',
  contestId: 1695,
  index: 'B',
  name: 'Circle Game',
  rating: 1000,
  tags: ['games', 'greedy'],
  why: L('Each player owns fixed piles; taking one stone at a time, whoever owns the first smallest pile runs out first.', 'প্রতিটি খেলোয়াড়ের নির্দিষ্ট স্তূপ; এক এক পাথর নিলে যার সবচেয়ে ছোট প্রথম স্তূপ সে আগে ফুরায়।'),
  statement: L('n piles stand in a circle. Mike takes from pile 1, Joe from pile 2, Mike from pile 3, and so on around the circle; each turn the player must remove at least one stone from the current pile. A player facing an empty pile loses. Who wins? There are t test cases.', 'n-টি স্তূপ একটি বৃত্তে। মাইক স্তূপ ১ থেকে নেয়, জো স্তূপ ২ থেকে, মাইক স্তূপ ৩ থেকে, এভাবে বৃত্ত ঘুরে; প্রতি পালায় খেলোয়াড়কে বর্তমান স্তূপ থেকে অন্তত একটি পাথর সরাতে হয়। খালি স্তূপের সামনে পড়া খেলোয়াড় হারে। কে জেতে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the pile sizes.', 't; প্রতিটি টেস্টে n আর স্তূপের আকার।'),
  output: L('Mike or Joe.', 'Mike অথবা Joe।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 50, aᵢ ≤ 10⁹', 'n ≤ ৫০, aᵢ ≤ ১০⁹')] },
  samples: [{ input: '2\n1\n37\n2\n100 100', output: 'Mike\nJoe', explain: L('One pile: Mike takes it all. Two equal piles: Mike’s pile empties first.', 'একটি স্তূপ: মাইক সব নেয়। দুটি সমান স্তূপ: মাইকের স্তূপ আগে খালি হয়।') }],
  observation: L('If n is odd, Mike empties pile 1 completely and Joe meets it empty on the next lap. If n is even, each player always meets the same piles, so both take one stone per turn; the first player to meet an empty pile is the owner of the first minimum pile. Pile index i (0-based) is Mike’s when i is even.', 'n বিজোড় হলে মাইক স্তূপ ১ পুরো খালি করে আর পরের চক্রে জো সেটি খালি পায়। n জোড় হলে প্রতিটি খেলোয়াড় সবসময় একই স্তূপ পায়, তাই দুজনেই প্রতি পালায় একটি পাথর নেয়; প্রথম সর্বনিম্ন স্তূপের মালিক প্রথম খালি স্তূপ পায়। স্তূপ ইনডেক্স i (০-ভিত্তিক) জোড় হলে মাইকের।'),
  approach: [L('Odd n → Mike. Even n → find the first minimum; even index → Joe, odd index → Mike.', 'বিজোড় n → Mike। জোড় n → প্রথম সর্বনিম্ন খুঁজুন; জোড় ইনডেক্স → Joe, বিজোড় → Mike।')],
  walkthrough: { input: '100 100', steps: [{ state: 'first minimum at index 0 (Mike’s)', text: L('Mike runs out first: Joe.', 'মাইক আগে ফুরায়: Joe।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One scan.', 'একটি স্ক্যান।') },
  solutions: [
    {
      id: 'min-index',
      kind: 'optimal',
      title: L('Parity of n and of the first minimum', 'n আর প্রথম সর্বনিম্নের জোড়-বিজোড়'),
      idea: L('min_element returns the first minimum.', 'min_element প্রথম সর্বনিম্ন ফেরত দেয়।'),
      explain: [L('Taking one stone is optimal because it keeps your own piles as large as possible; the opponent’s piles are never touched by you when n is even.', 'একটি পাথর নেওয়া সেরা কারণ এটি আপনার নিজের স্তূপ যত বড় সম্ভব রাখে; n জোড় হলে প্রতিপক্ষের স্তূপ আপনি কখনো ছোঁন না।')],
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
        if (n % 2 == 1) { cout << "Mike\n"; continue; }
        int i = min_element(a.begin(), a.end()) - a.begin();
        cout << (i % 2 == 0 ? "Joe" : "Mike") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Memoised game search', 'মেমোসহ গেম খোঁজ'),
      idea: L('State = piles and whose pile is next; try removing 1 … aᵢ.', 'অবস্থা = স্তূপ আর কার স্তূপ পরে; ১ … aᵢ সরানো চেষ্টা।'),
      explain: [L('Small piles only. It checks both the odd-n trick and the “take one stone” claim.', 'শুধু ছোট স্তূপ। এটি বিজোড়-n কৌশল আর “একটি পাথর নাও” দাবি দুটিই যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<pair<vector<int>, int>, bool> memo;

bool win(vector<int>& a, int i) {
    if (a[i] == 0) return false;
    auto key = make_pair(a, i);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    bool w = false;
    int orig = a[i], nxt = (i + 1) % a.size();
    for (int take = 1; take <= orig && !w; take++) {
        a[i] = orig - take;
        if (!win(a, nxt)) w = true;
    }
    a[i] = orig;
    return memo[key] = w;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        long long s = 0;
        for (auto& x : a) { cin >> x; s += x; }
        if (s > 12) { cout << "\n"; continue; }
        memo.clear();
        cout << (win(a, 0) ? "Mike" : "Joe") << "\n";
    }
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
    { input: '2\n1\n37\n2\n100 100', output: 'Mike\nJoe', source: 'sample', note: sample(1) },
    { input: '2\n4\n5 3 7 3\n3\n1 1 1', output: 'Mike\nMike', source: 'own', note: L('First minimum at index 1 (Joe’s pile); odd n.', 'প্রথম সর্বনিম্ন ইনডেক্স ১-এ (জোর স্তূপ); বিজোড় n।') },
  ],
  pitfalls: [L('Using the last minimum instead of the first.', 'প্রথমের বদলে শেষ সর্বনিম্ন ব্যবহার।')],
  related: [{ id: '1382B', name: 'Sequential Nim', why: L('Piles played in a fixed order.', 'নির্দিষ্ট ক্রমে খেলা স্তূপ।') }],
  toolkit: ['min-max'],
};

export const p1404B: ProblemEntry = {
  id: '1404B',
  contestId: 1404,
  index: 'B',
  name: 'Tree Tag',
  rating: 1900,
  tags: ['dfs', 'dp', 'games', 'trees'],
  why: L('A chase on a tree: Alice wins if she catches Bob at once, controls the whole tree, or Bob is not fast enough to jump over her.', 'একটি ট্রিতে তাড়া: অ্যালিস জেতে যদি সঙ্গে সঙ্গে ববকে ধরে, পুরো ট্রি নিয়ন্ত্রণ করে, বা বব তার ওপর দিয়ে লাফানোর মতো দ্রুত না হয়।'),
  statement: L(
    'Alice is at vertex a and Bob at b of a tree. They alternate, Alice first: Alice moves to any vertex within distance da (or stays), Bob within db. If they ever share a vertex, Alice wins; if Bob avoids her forever, Bob wins. Who wins? There are t test cases.',
    'একটি ট্রিতে অ্যালিস শীর্ষ a-তে আর বব b-তে। তারা পালা করে, অ্যালিস আগে: অ্যালিস da দূরত্বের মধ্যে যেকোনো শীর্ষে যায় (বা থাকে), বব db-এর মধ্যে। কখনো একই শীর্ষে এলে অ্যালিস জেতে; বব চিরকাল এড়াতে পারলে বব জেতে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n a b da db and n − 1 edges.', 't; প্রতিটি টেস্টে n a b da db আর n − ১টি প্রান্ত।'),
  output: L('Alice or Bob.', 'Alice অথবা Bob।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Σ n ≤ 10⁵', 'Σ n ≤ ১০⁵')] },
  samples: [{ input: '4\n4 3 2 1 2\n1 2\n1 3\n1 4\n6 6 1 2 5\n1 2\n6 5\n2 3\n3 4\n4 5\n9 3 9 2 5\n1 2\n1 6\n1 9\n1 3\n9 5\n7 9\n4 8\n4 3\n11 8 11 3 3\n1 2\n11 9\n4 9\n6 5\n2 10\n3 2\n5 9\n8 3\n7 4\n7 10', output: 'Alice\nBob\nAlice\nAlice', explain: L('Second test: a long path and a fast Bob, who jumps over Alice.', 'দ্বিতীয় টেস্ট: একটি লম্বা পথ আর দ্রুত বব, যে অ্যালিসের ওপর দিয়ে লাফায়।') }],
  observation: L('Alice wins if (1) dist(a, b) ≤ da, catching Bob on move one; or (2) 2·da ≥ diameter, so from the centre she reaches every vertex; or (3) db ≤ 2·da, because she can corner Bob step by step and he can never jump past her radius. Otherwise Bob escapes forever.', 'অ্যালিস জেতে যদি (১) dist(a, b) ≤ da, প্রথম চালেই ববকে ধরে; বা (২) ২·da ≥ ব্যাস, তাই কেন্দ্র থেকে সে প্রতিটি শীর্ষে পৌঁছায়; বা (৩) db ≤ ২·da, কারণ সে ধাপে ধাপে ববকে কোণঠাসা করতে পারে আর বব কখনো তার ব্যাসার্ধ পেরিয়ে লাফাতে পারে না। নইলে বব চিরকাল পালায়।'),
  approach: [L('BFS from a for dist(a, b); two BFS for the diameter; check the three conditions.', 'dist(a, b)-এর জন্য a থেকে BFS; ব্যাসের জন্য দুটি BFS; তিনটি শর্ত যাচাই।')],
  walkthrough: { input: 'test 1', steps: [{ state: 'dist(3, 2) = 2 > 1, diameter 2 ≤ 2·1', text: L('Condition 2: Alice.', 'শর্ত ২: Alice।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Three BFS.', 'তিনটি BFS।') },
  solutions: [
    {
      id: 'conditions',
      kind: 'optimal',
      title: L('Distance, diameter and speed', 'দূরত্ব, ব্যাস আর গতি'),
      idea: L('Three checks.', 'তিনটি যাচাই।'),
      explain: [L('The diameter is found by BFS from any vertex to the farthest vertex u, then BFS from u. Game problems on trees often reduce to a few distances like this.', 'যেকোনো শীর্ষ থেকে সবচেয়ে দূরের শীর্ষ u পর্যন্ত BFS, তারপর u থেকে BFS করে ব্যাস পাওয়া যায়। ট্রির গেম প্রবলেম প্রায়ই এমন কয়েকটি দূরত্বে নামে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int s) {
    vector<int> d(adj.size(), -1);
    queue<int> q;
    q.push(s);
    d[s] = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int u : adj[v]) if (d[u] == -1) { d[u] = d[v] + 1; q.push(u); }
    }
    return d;
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, a, b, da, db;
        scanf("%d %d %d %d %d", &n, &a, &b, &da, &db);
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int u, v;
            scanf("%d %d", &u, &v);
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        vector<int> fromA = bfs(adj, a);
        int far = max_element(fromA.begin() + 1, fromA.end()) - fromA.begin();
        vector<int> fromFar = bfs(adj, far);
        int diameter = *max_element(fromFar.begin() + 1, fromFar.end());
        bool alice = fromA[b] <= da || 2 * da >= diameter || db <= 2 * da;
        puts(alice ? "Alice" : "Bob");
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'functions'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Retrograde analysis over (Alice, Bob, turn)', '(অ্যালিস, বব, পালা)-র ওপর পশ্চাৎমুখী বিশ্লেষণ'),
      idea: L('Grow the set of Alice-winning states until it stops changing.', 'অ্যালিসের জয়ের অবস্থার সেট বাড়ান যতক্ষণ না বদল থামে।'),
      explain: [L('An Alice-to-move state is winning if some move within da reaches a winning state; a Bob-to-move state is winning if every Bob move within db does. Everything never marked is a Bob escape. This is the general method for games that may last forever.', 'অ্যালিসের চালের অবস্থা জয়ের যদি da-এর মধ্যে কোনো চাল জয়ের অবস্থায় পৌঁছায়; ববের চালের অবস্থা জয়ের যদি db-এর মধ্যে ববের প্রতিটি চাল তা করে। কখনো চিহ্নিত না হওয়া সবকিছু ববের পলায়ন। চিরকাল চলতে পারে এমন গেমের এটি সাধারণ পদ্ধতি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, a, b, da, db;
        cin >> n >> a >> b >> da >> db;
        vector<vector<int>> adj(n + 1);
        for (int i = 0; i < n - 1; i++) {
            int u, v;
            cin >> u >> v;
            adj[u].push_back(v);
            adj[v].push_back(u);
        }
        if (n > 12) { cout << "\n"; continue; }
        vector<vector<int>> d(n + 1, vector<int>(n + 1, -1));
        for (int s = 1; s <= n; s++) {
            queue<int> q;
            q.push(s);
            d[s][s] = 0;
            while (!q.empty()) {
                int v = q.front();
                q.pop();
                for (int u : adj[v]) if (d[s][u] == -1) { d[s][u] = d[s][v] + 1; q.push(u); }
            }
        }
        // W[x][y][0]: Alice to move, W[x][y][1]: Bob to move; true = Alice wins
        vector<vector<array<bool, 2>>> W(n + 1, vector<array<bool, 2>>(n + 1, {false, false}));
        for (int x = 1; x <= n; x++) W[x][x] = {true, true};
        bool changed = true;
        while (changed) {
            changed = false;
            for (int x = 1; x <= n; x++)
                for (int y = 1; y <= n; y++) {
                    if (!W[x][y][0]) {
                        for (int x2 = 1; x2 <= n; x2++)
                            if (d[x][x2] <= da && W[x2][y][1]) { W[x][y][0] = changed = true; break; }
                    }
                    if (!W[x][y][1]) {
                        bool all = true;
                        for (int y2 = 1; y2 <= n && all; y2++)
                            if (d[y][y2] <= db && !W[x][y2][0]) all = false;
                        if (all) W[x][y][1] = changed = true;
                    }
                }
        }
        cout << (W[a][b][0] ? "Alice" : "Bob") << "\n";
    }
    return 0;
}
`,
      time: 'O(n⁴) per round',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['stack-queue', 'vector'],
    },
  ],
  tests: [{ input: '4\n4 3 2 1 2\n1 2\n1 3\n1 4\n6 6 1 2 5\n1 2\n6 5\n2 3\n3 4\n4 5\n9 3 9 2 5\n1 2\n1 6\n1 9\n1 3\n9 5\n7 9\n4 8\n4 3\n11 8 11 3 3\n1 2\n11 9\n4 9\n6 5\n2 10\n3 2\n5 9\n8 3\n7 4\n7 10', output: 'Alice\nBob\nAlice\nAlice', source: 'sample', note: sample(1) }],
  pitfalls: [L('Checking only db > da.', 'শুধু db > da যাচাই।'), L('Forgetting the first-move catch.', 'প্রথম চালে ধরা ভুলে যাওয়া।')],
  related: [{ id: '1092F', name: 'Tree with Maximum Cost', why: L('Distances in trees.', 'ট্রিতে দূরত্ব।') }],
  toolkit: ['stack-queue'],
};

export const p451A: ProblemEntry = {
  id: '451A',
  contestId: 451,
  index: 'A',
  name: 'Game With Sticks',
  rating: 900,
  tags: ['implementation'],
  why: L('Each move removes one stick of each kind, so the game lasts exactly min(n, m) moves.', 'প্রতিটি চাল প্রতিটি ধরনের একটি কাঠি সরায়, তাই গেম ঠিক min(n, m) চাল চলে।'),
  statement: L('A grid of n horizontal and m vertical sticks. A move picks an intersection point and removes both sticks through it. The player who cannot move loses; Akshat moves first. Who wins?', 'n-টি আনুভূমিক আর m-টি খাড়া কাঠির একটি গ্রিড। এক চালে একটি ছেদবিন্দু বেছে তার মধ্য দিয়ে যাওয়া দুটি কাঠি সরানো হয়। যে চাল দিতে পারে না সে হারে; অক্ষত আগে। কে জেতে?'),
  input: L('n m.', 'n m।'),
  output: L('Akshat or Malvika.', 'Akshat অথবা Malvika।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 100', '১ ≤ n, m ≤ ১০০')] },
  samples: [
    { input: '2 2', output: 'Malvika', explain: L('Two moves.', 'দুটি চাল।') },
    { input: '2 3', output: 'Malvika', explain: L('min = 2.', 'min = ২।') },
    { input: '3 3', output: 'Akshat', explain: L('Three moves.', 'তিনটি চাল।') },
  ],
  observation: L('Every move turns (n, m) into (n − 1, m − 1), and the game ends when either is 0. So exactly min(n, m) moves happen; the first player wins iff that is odd.', 'প্রতিটি চাল (n, m)-কে (n − ১, m − ১) করে, আর যেকোনোটি ০ হলে গেম শেষ। তাই ঠিক min(n, m)টি চাল হয়; এটি বিজোড় হলেই প্রথম খেলোয়াড় জেতে।'),
  approach: [L('Print Akshat iff min(n, m) is odd.', 'min(n, m) বিজোড় হলেই Akshat প্রিন্ট।')],
  walkthrough: { input: '2 3', steps: [{ state: '(2, 3) → (1, 2) → (0, 1)', text: L('Two moves: Malvika.', 'দুটি চাল: Malvika।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A comparison.', 'একটি তুলনা।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Parity of min(n, m)', 'min(n, m)-এর জোড়-বিজোড়'),
      idea: L('Fixed game length.', 'নির্দিষ্ট গেমের দৈর্ঘ্য।'),
      explain: [L('The simplest “no real choice” game: when every play lasts the same number of moves, only the parity of that number matters.', 'সবচেয়ে সরল “আসল বিকল্প নেই” গেম: যখন প্রতিটি খেলা একই সংখ্যক চাল চলে, শুধু সেই সংখ্যার জোড়-বিজোড় গুরুত্বপূর্ণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    cout << (min(n, m) % 2 ? "Akshat" : "Malvika") << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max', 'ternary'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recursive game', 'রিকার্সিভ গেম'),
      idea: L('win(n, m) = n > 0 and m > 0 and not win(n − 1, m − 1).', 'win(n, m) = n > ০ আর m > ০ আর win(n − ১, m − ১) নয়।'),
      explain: [L('The definition of winning and losing positions, in one line.', 'জয় আর হারের অবস্থানের সংজ্ঞা, এক লাইনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool win(int n, int m) { return n > 0 && m > 0 && !win(n - 1, m - 1); }

int main() {
    int n, m;
    cin >> n >> m;
    cout << (win(n, m) ? "Akshat" : "Malvika") << "\n";
    return 0;
}
`,
      time: 'O(min(n, m))',
      space: 'O(min(n, m))',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '2 2', output: 'Malvika', source: 'sample', note: sample(1) },
    { input: '2 3', output: 'Malvika', source: 'sample', note: sample(2) },
    { input: '3 3', output: 'Akshat', source: 'sample', note: sample(3) },
    { input: '1 100', output: 'Akshat', source: 'own', note: L('One move.', 'একটি চাল।') },
  ],
  pitfalls: [L('Using n · m (the number of points) instead of min(n, m).', 'min(n, m)-এর বদলে n · m (বিন্দুর সংখ্যা) ব্যবহার।')],
  related: [{ id: '1365A', name: 'Matrix Game', why: L('The same rows-and-columns idea.', 'একই সারি-আর-কলাম ধারণা।') }],
  toolkit: ['min-max'],
};

export const p1972B: ProblemEntry = {
  id: '1972B',
  contestId: 1972,
  index: 'B',
  name: 'Coin Games',
  rating: 900,
  tags: ['games'],
  why: L('An invariant: every move changes the number of face-up coins by an odd amount.', 'একটি অপরিবর্তনীয়: প্রতিটি চাল মুখ-ওপর মুদ্রার সংখ্যা বিজোড় পরিমাণে বদলায়।'),
  statement: L('n coins in a circle face Up or Down. A move removes a face-up coin and flips its two neighbours (with two coins left, the other is not flipped; with one left, nothing is flipped). A player with no face-up coin loses. Alice moves first; does she win? There are t test cases.', 'n-টি মুদ্রা একটি বৃত্তে Up বা Down মুখে। এক চালে একটি মুখ-ওপর মুদ্রা সরিয়ে তার দুই প্রতিবেশী উল্টানো হয় (দুটি বাকি থাকলে অন্যটি উল্টানো হয় না; একটি থাকলে কিছুই নয়)। মুখ-ওপর মুদ্রা না থাকলে খেলোয়াড় হারে। অ্যালিস আগে; সে কি জেতে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the string s.', 't; প্রতিটি টেস্টে n আর স্ট্রিং s।'),
  output: L('YES if Alice wins, otherwise NO.', 'অ্যালিস জিতলে YES, নইলে NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 100', 'n ≤ ১০০')] },
  samples: [{ input: '3\n5\nUUDUD\n5\nUDDUD\n2\nUU', output: 'YES\nNO\nNO', explain: L('UU: Alice removes one, Bob removes the other, Alice has none.', 'UU: অ্যালিস একটি সরায়, বব অন্যটি, অ্যালিসের কিছু নেই।') }],
  observation: L('Removing an Up coin changes the Up count by −1, and flipping two neighbours changes it by −2, 0 or +2. So every move flips the parity of the Up count, and the game must end (coins run out). The player who faces 0 Up coins loses, and 0 is even, so Alice wins iff the starting count is odd.', 'একটি Up মুদ্রা সরালে Up গণনা −১ বদলায়, আর দুই প্রতিবেশী উল্টালে −২, ০ বা +২। তাই প্রতিটি চাল Up গণনার জোড়-বিজোড় উল্টায়, আর গেম শেষ হতেই হয় (মুদ্রা ফুরায়)। যে ০টি Up মুদ্রার সামনে পড়ে সে হারে, আর ০ জোড়, তাই শুরুর গণনা বিজোড় হলেই অ্যালিস জেতে।'),
  approach: [L('Count U; print YES iff it is odd.', 'U গুনুন; বিজোড় হলেই YES।')],
  walkthrough: { input: 'UUDUD', steps: [{ state: '3 U (odd)', text: L('YES.', 'YES।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Count characters.', 'অক্ষর গোনা।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Parity invariant', 'জোড়-বিজোড় অপরিবর্তনীয়'),
      idea: L('Odd number of U → Alice.', 'বিজোড় সংখ্যক U → অ্যালিস।'),
      explain: [L('Look for a quantity whose parity every move flips. Then the outcome is fixed from the start, whatever the players do. The special rules for 1 or 2 coins keep the invariant too.', 'এমন একটি রাশি খুঁজুন যার জোড়-বিজোড় প্রতিটি চাল উল্টায়। তখন খেলোয়াড়রা যা-ই করুক, ফল শুরু থেকেই ঠিক। ১ বা ২ মুদ্রার বিশেষ নিয়মও অপরিবর্তনীয় রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        cout << (count(s.begin(), s.end(), 'U') % 2 ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['count-find', 'modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Game search on the circle', 'বৃত্তে গেম খোঁজ'),
      idea: L('Simulate every legal move, memoised on the circular string.', 'প্রতিটি বৈধ চাল সিমুলেশন, বৃত্তাকার স্ট্রিংয়ে মেমোসহ।'),
      explain: [L('After removing coin i, the circle is rebuilt starting just after i, so its two neighbours become the first and last characters.', 'মুদ্রা i সরানোর পরে বৃত্ত i-এর ঠিক পর থেকে আবার বানানো হয়, তাই এর দুই প্রতিবেশী প্রথম আর শেষ অক্ষর হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<string, bool> memo;

bool win(const string& s) {
    auto it = memo.find(s);
    if (it != memo.end()) return it->second;
    int n = s.size();
    bool w = false;
    for (int i = 0; i < n && !w; i++) {
        if (s[i] != 'U') continue;
        string r = s.substr(i + 1) + s.substr(0, i);  // circle without coin i
        if (n >= 3) {
            auto flip = [](char& c) { c = c == 'U' ? 'D' : 'U'; };
            flip(r.front());
            flip(r.back());
        }
        if (!win(r)) w = true;
    }
    return memo[s] = w;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string s;
        cin >> n >> s;
        if (n > 10) { cout << "\n"; continue; }
        cout << (win(s) ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['map', 'lambda'],
    },
  ],
  tests: [{ input: '3\n5\nUUDUD\n5\nUDDUD\n2\nUU', output: 'YES\nNO\nNO', source: 'sample', note: sample(1) }],
  pitfalls: [L('Simulating the game instead of finding the invariant.', 'অপরিবর্তনীয় না খুঁজে গেম সিমুলেশন।')],
  related: [{ id: '1104B', name: 'Game with string', why: L('Outcome fixed by parity.', 'জোড়-বিজোড়ে ফল ঠিক।') }],
  toolkit: ['count-find'],
};

export const p1990A: ProblemEntry = {
  id: '1990A',
  contestId: 1990,
  index: 'A',
  name: 'Submission Bait',
  rating: 900,
  tags: ['brute-force', 'games', 'greedy', 'sortings'],
  why: L('Find the largest value that occurs an odd number of times and start there.', 'বিজোড় বার আসা সবচেয়ে বড় মান খুঁজে সেখান থেকে শুরু।'),
  statement: L('An array a and mx = 0. A move picks i with aᵢ ≥ mx, sets mx = aᵢ and aᵢ = 0. The player who cannot move loses. Alice moves first; does she have a winning strategy? There are t test cases.', 'একটি অ্যারে a আর mx = ০। এক চালে aᵢ ≥ mx এমন i বেছে mx = aᵢ আর aᵢ = ০ করা হয়। যে চাল দিতে পারে না সে হারে। অ্যালিস আগে; তার কি জয়ের কৌশল আছে? t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 50, 1 ≤ aᵢ ≤ n', 'n ≤ ৫০, ১ ≤ aᵢ ≤ n')] },
  samples: [{ input: '5\n2\n2 1\n2\n1 1\n3\n3 3 3\n4\n3 3 4 4\n4\n1 2 2 2', output: 'YES\nNO\nYES\nNO\nYES', explain: L('3 3 4 4: every value appears twice, so Bob mirrors Alice.', '৩ ৩ ৪ ৪: প্রতিটি মান দুবার, তাই বব অ্যালিসকে প্রতিফলন করে।') }],
  observation: L('After choosing value v, only values ≥ v remain playable. If every value occurs an even number of times, Bob copies Alice’s value and wins. Otherwise Alice picks the largest value with an odd count; all larger values have even counts, and now Bob faces the mirroring situation.', 'মান v বাছার পরে শুধু v-এর সমান বা বড় মান খেলা যায়। প্রতিটি মান জোড় সংখ্যক বার এলে বব অ্যালিসের মান নকল করে জেতে। নইলে অ্যালিস বিজোড় গণনার সবচেয়ে বড় মান বাছে; এর বড় সব মানের গণনা জোড়, আর এখন বব প্রতিফলনের পরিস্থিতিতে।'),
  approach: [L('YES iff some value occurs an odd number of times.', 'কোনো মান বিজোড় সংখ্যক বার এলেই YES।')],
  walkthrough: { input: '1 2 2 2', steps: [{ state: 'counts: 1 → 1, 2 → 3', text: L('Largest odd count is value 2: Alice takes a 2, leaving two 2s for mirroring. YES.', 'বিজোড় গণনার সবচেয়ে বড় মান ২: অ্যালিস একটি ২ নেয়, প্রতিফলনের জন্য দুটি ২ রেখে। YES।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Counting.', 'গণনা।') },
  solutions: [
    {
      id: 'odd-count',
      kind: 'optimal',
      title: L('Some value with odd count', 'বিজোড় গণনার কোনো মান'),
      idea: L('Mirror strategy on equal values.', 'সমান মানে প্রতিফলন কৌশল।'),
      explain: [L('Mirroring (“copy the opponent’s move on an equal object”) is the most common winning strategy in pairing games.', 'প্রতিফলন (“সমান জিনিসে প্রতিপক্ষের চাল নকল”) জোড়ার গেমে সবচেয়ে সাধারণ জয়ের কৌশল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> cnt(n + 1, 0);
        for (int i = 0; i < n; i++) { int a; cin >> a; cnt[a]++; }
        bool odd = any_of(cnt.begin(), cnt.end(), [](int c) { return c % 2 == 1; });
        cout << (odd ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['ranges-any-of', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Memoised game search', 'মেমোসহ গেম খোঁজ'),
      idea: L('State = remaining multiset and mx.', 'অবস্থা = বাকি মাল্টিসেট আর mx।'),
      explain: [L('Since aᵢ ≥ 1, a zeroed element can never be picked again once mx ≥ 1, so removing chosen elements from the multiset is exact.', 'aᵢ ≥ ১ বলে mx ≥ ১ হলে শূন্য করা উপাদান আর বাছা যায় না, তাই বাছা উপাদান মাল্টিসেট থেকে সরানো নিখুঁত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<pair<vector<int>, int>, bool> memo;

bool win(vector<int>& a, int mx) {
    auto key = make_pair(a, mx);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (size_t i = 0; i < a.size() && !w; i++) {
        if (a[i] < mx || (i && a[i] == a[i - 1])) continue;
        vector<int> b = a;
        b.erase(b.begin() + i);
        if (!win(b, a[i])) w = true;
    }
    return memo[key] = w;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        if (n > 10) { cout << "\n"; continue; }
        sort(a.begin(), a.end());
        memo.clear();
        cout << (win(a, 0) ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['map', 'sort'],
    },
  ],
  tests: [{ input: '5\n2\n2 1\n2\n1 1\n3\n3 3 3\n4\n3 3 4 4\n4\n1 2 2 2', output: 'YES\nNO\nYES\nNO\nYES', source: 'sample', note: sample(1) }],
  pitfalls: [L('Only checking the count of the maximum value.', 'শুধু সর্বোচ্চ মানের গণনা দেখা।')],
  related: [{ id: '1972B', name: 'Coin Games', why: L('Parity decides.', 'জোড়-বিজোড় ঠিক করে।') }],
  toolkit: ['ranges-any-of'],
};

export const p493D: ProblemEntry = {
  id: '493D',
  contestId: 493,
  index: 'D',
  name: 'Vasya and Chess',
  rating: 1700,
  tags: ['constructive', 'games', 'math'],
  why: L('Symmetry: on an odd board Black mirrors White across the middle column; on an even board White breaks the symmetry first.', 'প্রতিসাম্য: বিজোড় বোর্ডে কালো সাদাকে মাঝের কলাম বরাবর প্রতিফলন করে; জোড় বোর্ডে সাদা আগে প্রতিসাম্য ভাঙে।'),
  statement: L(
    'On an n × n board the white queen stands at (1, 1), the black queen at (1, n), and green pawns fill every other cell. Players alternate, White first; each move a queen must capture a piece (a pawn or the enemy queen). A player who cannot capture, or whose queen was captured, loses. Print the winner; if White wins, also print White’s first move (smallest row, then smallest column).',
    'n × n বোর্ডে সাদা রানি (১, ১)-এ, কালো রানি (১, n)-এ, আর বাকি প্রতিটি ঘরে সবুজ সৈন্য। খেলোয়াড়রা পালা করে, সাদা আগে; প্রতিটি চালে রানিকে একটি গুটি (সৈন্য বা শত্রু রানি) খেতে হয়। যে খেতে পারে না, বা যার রানি খাওয়া হয়েছে, সে হারে। বিজয়ী প্রিন্ট করুন; সাদা জিতলে সাদার প্রথম চালও (সবচেয়ে ছোট সারি, তারপর সবচেয়ে ছোট কলাম)।',
  ),
  input: L('n.', 'n।'),
  output: L('“white” and the move, or “black”.', '“white” আর চাল, অথবা “black”।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁹', '২ ≤ n ≤ ১০⁹')] },
  samples: [
    { input: '2', output: 'white\n1 2', explain: L('White captures the black queen immediately.', 'সাদা সঙ্গে সঙ্গে কালো রানি খায়।') },
    { input: '3', output: 'black', explain: L('Black mirrors every White move across column 2.', 'কালো প্রতিটি সাদা চাল কলাম ২ বরাবর প্রতিফলন করে।') },
  ],
  observation: L('For odd n, the middle column is a mirror line: whatever White captures, Black captures the mirror image, and the white queen is the first to be forced into a losing spot. For even n, White plays (1, 2), and the position becomes the odd-board situation with White in Black’s role.', 'বিজোড় n-এ মাঝের কলাম একটি আয়নার রেখা: সাদা যা-ই খাক, কালো তার আয়নার প্রতিবিম্ব খায়, আর সাদা রানিই প্রথমে হারানো অবস্থানে বাধ্য হয়। জোড় n-এ সাদা (১, ২) খেলে, আর অবস্থানটি বিজোড় বোর্ডের পরিস্থিতিতে পরিণত হয় যেখানে সাদা কালোর ভূমিকায়।'),
  approach: [L('n even → “white” and “1 2”; n odd → “black”.', 'n জোড় → “white” আর “১ ২”; n বিজোড় → “black”।')],
  walkthrough: { input: '4', steps: [{ state: 'White captures (1, 2)', text: L('Now the queens are on columns 2 and 4 with an odd-width region between them.', 'এখন রানিরা কলাম ২ আর ৪-এ, মাঝে বিজোড় প্রস্থের এলাকা।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Parity.', 'জোড়-বিজোড়।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Parity of n', 'n-এর জোড়-বিজোড়'),
      idea: L('Mirror strategy.', 'প্রতিফলন কৌশল।'),
      explain: [L('A symmetric starting position usually means the second player can copy moves. The first player wins only if one move can create a symmetric position for the opponent.', 'প্রতিসম শুরুর অবস্থান সাধারণত বোঝায় দ্বিতীয় খেলোয়াড় চাল নকল করতে পারে। প্রথম খেলোয়াড় তখনই জেতে যখন একটি চাল প্রতিপক্ষের জন্য প্রতিসম অবস্থান তৈরি করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n;
    cin >> n;
    if (n % 2 == 0) cout << "white\n1 2\n";
    else cout << "black\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Full game search on tiny boards', 'ক্ষুদ্র বোর্ডে পূর্ণ গেম খোঁজ'),
      idea: L('State = occupied cells, both queens and the turn; a queen captures the first piece in each of 8 directions.', 'অবস্থা = দখলকৃত ঘর, দুটি রানি আর পালা; একটি রানি ৮ দিকের প্রতিটিতে প্রথম গুটি খায়।'),
      explain: [L('Feasible for n ≤ 4 (16 cells in a bitmask). It confirms the parity rule and the first move 1 2 on small boards.', 'n ≤ ৪-এ সম্ভব (বিটমাস্কে ১৬টি ঘর)। এটি ছোট বোর্ডে জোড়-বিজোড় নিয়ম আর প্রথম চাল ১ ২ নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
map<tuple<int, int, int>, bool> memo;
const int dr[] = {-1, -1, -1, 0, 0, 1, 1, 1}, dc[] = {-1, 0, 1, -1, 1, -1, 0, 1};

vector<int> captures(int occ, int q) {
    vector<int> res;
    int r = q / n, c = q % n;
    for (int k = 0; k < 8; k++) {
        int a = r + dr[k], b = c + dc[k];
        while (a >= 0 && a < n && b >= 0 && b < n && !(occ >> (a * n + b) & 1)) a += dr[k], b += dc[k];
        if (a >= 0 && a < n && b >= 0 && b < n) res.push_back(a * n + b);
    }
    return res;
}

// does the player to move (queen me, enemy queen other) win?
bool win(int occ, int me, int other) {
    auto key = make_tuple(occ, me, other);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (int cell : captures(occ, me)) {
        if (cell == other) { w = true; break; }       // capture the enemy queen
        if (!win(occ & ~(1 << me), other, cell)) { w = true; break; }  // my queen moves onto cell
    }
    return memo[key] = w;
}

int main() {
    cin >> n;
    if (n > 4) { cout << "\n"; return 0; }
    int full = (1 << (n * n)) - 1, w0 = 0, b0 = n - 1;
    vector<int> cap = captures(full, w0);
    int best = -1;
    for (int r = 0; r < n && best == -1; r++)
        for (int c = 0; c < n && best == -1; c++) {
            int cell = r * n + c;
            if (find(cap.begin(), cap.end(), cell) == cap.end()) continue;
            if (cell == b0 || !win(full & ~(1 << w0), b0, cell)) best = cell;
        }
    if (best == -1) cout << "black\n";
    else cout << "white\n" << best / n + 1 << " " << best % n + 1 << "\n";
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['map', 'bit-shift'],
    },
  ],
  tests: [
    { input: '2', output: 'white\n1 2', source: 'sample', note: sample(1) },
    { input: '3', output: 'black', source: 'sample', note: sample(2) },
    { input: '4', output: 'white\n1 2', source: 'own', note: L('Even board.', 'জোড় বোর্ড।') },
    { input: '1000000000', output: 'white\n1 2', source: 'own', note: L('Huge even board.', 'বিশাল জোড় বোর্ড।') },
  ],
  pitfalls: [L('Printing the move for Black too.', 'কালোর জন্যও চাল প্রিন্ট।')],
  related: [{ id: '1451D', name: 'Circle Game', why: L('Mirror strategies.', 'প্রতিফলন কৌশল।') }],
  toolkit: ['modulo'],
};
