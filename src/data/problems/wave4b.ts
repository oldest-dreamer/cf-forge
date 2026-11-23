import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p723A: ProblemEntry = {
  id: '723A',
  contestId: 723,
  index: 'A',
  name: 'The New Year: Meeting Friends',
  rating: 800,
  tags: ['implementation', 'math', 'sortings'],
  why: L('The median minimises total distance; with three points that is max − min.', 'মিডিয়ান মোট দূরত্ব সর্বনিম্ন করে; তিনটি বিন্দুতে তা max − min।'),
  statement: L(
    'Three friends live at distinct points x₁, x₂, x₃ on a line. They meet at one point. Minimise the total distance they travel.',
    'তিন বন্ধু একটি রেখার আলাদা বিন্দু x₁, x₂, x₃-এ থাকে। তারা এক বিন্দুতে মিলিত হয়। তাদের মোট ভ্রমণের দূরত্ব সর্বনিম্ন করুন।',
  ),
  input: L('Three integers.', 'তিনটি পূর্ণসংখ্যা।'),
  output: L('The minimum total distance.', 'সর্বনিম্ন মোট দূরত্ব।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ xᵢ ≤ 100', '১ ≤ xᵢ ≤ ১০০')] },
  samples: [
    { input: '7 1 4', output: '6', explain: L('Meet at 4: 3 + 3 + 0.', '৪-এ মিলন: ৩ + ৩ + ০।') },
    { input: '30 20 10', output: '20', explain: L('Meet at 20.', '২০-এ মিলন।') },
  ],
  observation: L('Meeting at the middle point, the two outer friends together walk exactly the distance between them, and no point does better.', 'মাঝের বিন্দুতে মিললে বাইরের দুই বন্ধু মিলে ঠিক তাদের মাঝের দূরত্ব হাঁটে, আর কোনো বিন্দু এর চেয়ে ভালো নয়।'),
  approach: [L('Print max − min.', 'max − min প্রিন্ট করুন।')],
  walkthrough: { input: '7 1 4', steps: [{ state: '7 − 1 = 6', text: L('Answer 6.', 'উত্তর ৬।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Constant.', 'স্থির।') },
  solutions: [
    {
      id: 'minmax',
      kind: 'optimal',
      title: L('max − min', 'max − min'),
      idea: L('The median is the best meeting point.', 'মিডিয়ানই সেরা মিলনস্থল।'),
      explain: [L('For any meeting point p, the outer two together walk at least max − min, since they must close that gap. The middle friend walks 0 at p = median, so max − min is achieved.', 'যেকোনো মিলনস্থল p-এর জন্য বাইরের দুজন মিলে অন্তত max − min হাঁটে, কারণ তাদের সেই ফাঁক বন্ধ করতে হবে। p = মিডিয়ানে মাঝের বন্ধু ০ হাঁটে, তাই max − min অর্জিত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << max({a, b, c}) - min({a, b, c}) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every meeting point', 'প্রতিটি মিলনস্থল চেষ্টা'),
      idea: L('Points 1..100; compute the total for each.', '১..১০০ বিন্দু; প্রতিটির মোট হিসাব।'),
      explain: [L('Only 100 candidate points, so checking all of them is instant and needs no proof.', 'মাত্র ১০০টি সম্ভাব্য বিন্দু, তাই সবগুলো দেখা তাৎক্ষণিক আর কোনো প্রমাণ লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int best = INT_MAX;
    for (int p = 1; p <= 100; p++) best = min(best, abs(a - p) + abs(b - p) + abs(c - p));
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(100)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '7 1 4', output: '6', source: 'sample', note: sample(1) },
    { input: '30 20 10', output: '20', source: 'sample', note: sample(2) },
    { input: '1 2 100', output: '99', source: 'own', note: L('Far apart.', 'অনেক দূরে।') },
  ],
  pitfalls: [L('Meeting at the average instead of the median.', 'মিডিয়ানের বদলে গড়ে মিলন।')],
  related: [{ id: '1360B', name: 'Honest Coach', why: L('Sorting and extremes.', 'সর্টিং আর চরম মান।') }],
  toolkit: ['min-max'],
};

export const p1849B: ProblemEntry = {
  id: '1849B',
  contestId: 1849,
  index: 'B',
  name: 'Monsters',
  rating: 1000,
  tags: ['greedy', 'math', 'sortings'],
  why: L('Simulating is too slow, but the death order depends only on each health modulo k.', 'সিমুলেশন খুব ধীর, কিন্তু মৃত্যুর ক্রম শুধু প্রতিটি স্বাস্থ্যের k মডুলোর ওপর নির্ভর করে।'),
  statement: L(
    'n monsters have health aᵢ. Each attack hits the monster with the highest current health (the smallest index on ties) and removes k health; a monster with health ≤ 0 dies. Print the indices in the order the monsters die. There are t test cases.',
    'n-টি দানবের স্বাস্থ্য aᵢ। প্রতিটি আক্রমণ বর্তমান সবচেয়ে বেশি স্বাস্থ্যের দানবকে আঘাত করে (সমান হলে সবচেয়ে ছোট ইনডেক্স) আর k স্বাস্থ্য কমায়; স্বাস্থ্য ≤ ০ হলে দানব মরে। দানবগুলো যে ক্রমে মরে সেই ইনডেক্সগুলো প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, k and the healths.', 't; প্রতিটি টেস্টে n, k আর স্বাস্থ্য।'),
  output: L('The death order for each test.', 'প্রতিটি টেস্টের মৃত্যুর ক্রম।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 3·10⁵, 1 ≤ k, aᵢ ≤ 10⁹', '১ ≤ n ≤ ৩·১০⁵, ১ ≤ k, aᵢ ≤ ১০⁹')] },
  samples: [
    { input: '3\n3 2\n1 2 3\n2 3\n1 1\n4 3\n2 8 3 5', output: '2 1 3\n1 2\n3 1 2 4', explain: L('First test, k = 2: the remainders are 1, 2, 1, so monster 2 dies first, then 1 and 3.', 'প্রথম টেস্ট, k = ২: ভাগশেষ ১, ২, ১, তাই প্রথমে দানব ২ মরে, তারপর ১ আর ৩।') },
  ],
  observation: L('Attacks first bring every monster down into (0, k]: their healths become rᵢ = ((aᵢ − 1) mod k) + 1 before anyone dies. From then on each attack kills the current maximum. So they die by rᵢ descending, then by index.', 'আক্রমণগুলো প্রথমে প্রতিটি দানবকে (০, k]-এ নামিয়ে আনে: কেউ মরার আগে তাদের স্বাস্থ্য হয় rᵢ = ((aᵢ − ১) mod k) + ১। তারপর প্রতিটি আক্রমণ বর্তমান সর্বোচ্চকে মারে। তাই তারা rᵢ বড় থেকে ছোট, তারপর ইনডেক্স অনুযায়ী মরে।'),
  approach: [L('Sort indices by (−rᵢ, i).', '(−rᵢ, i) অনুযায়ী ইনডেক্স সর্ট করুন।')],
  walkthrough: { input: 'k = 3, a = 2 8 3 5', steps: [{ state: 'r = 2 2 3 2', text: L('Monster 3 first, then 1, 2, 4.', 'প্রথমে দানব ৩, তারপর ১, ২, ৪।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort per test.', 'প্রতি টেস্টে একটি সর্ট।') },
  solutions: [
    {
      id: 'sort',
      kind: 'optimal',
      title: L('Sort by remainder', 'ভাগশেষ অনুযায়ী সর্ট'),
      idea: L('Key: ((a − 1) % k) + 1 descending, index ascending.', 'কী: ((a − ১) % k) + ১ বড় থেকে ছোট, ইনডেক্স ছোট থেকে বড়।'),
      explain: [L('Writing the remainder as ((a − 1) % k) + 1 maps multiples of k to k instead of 0, because a monster with health exactly k needs one full hit, the same as one with the largest remainder.', 'ভাগশেষকে ((a − ১) % k) + ১ লিখলে k-এর গুণিতক ০-এর বদলে k হয়, কারণ ঠিক k স্বাস্থ্যের দানবের একটি পূর্ণ আঘাত লাগে, সবচেয়ে বড় ভাগশেষের দানবের মতোই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long k;
        cin >> n >> k;
        vector<long long> r(n);
        for (auto& x : r) { cin >> x; x = (x - 1) % k + 1; }
        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        stable_sort(idx.begin(), idx.end(), [&](int i, int j) { return r[i] > r[j]; });
        for (int i : idx) cout << i + 1 << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'io-fast'],
    },
    {
      id: 'simulate',
      kind: 'brute',
      title: L('Simulate with a priority queue', 'প্রায়োরিটি কিউ দিয়ে সিমুলেশন'),
      idea: L('Pop the strongest, hit it, push it back if alive.', 'সবচেয়ে শক্তিশালীকে পপ করে আঘাত করুন, বেঁচে থাকলে আবার পুশ করুন।'),
      explain: [L('Correct by definition, but the number of attacks is Σ aᵢ / k, up to 3·10¹⁴. It confirms the remainder rule on small inputs.', 'সংজ্ঞা অনুযায়ী সঠিক, কিন্তু আক্রমণের সংখ্যা Σ aᵢ / k, ৩·১০¹⁴ পর্যন্ত। ছোট ইনপুটে ভাগশেষের নিয়ম নিশ্চিত করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        long long k;
        cin >> n >> k;
        priority_queue<pair<long long, int>> pq;   // (health, -index)
        for (int i = 0; i < n; i++) {
            long long a;
            cin >> a;
            pq.push({a, -i});
        }
        while (!pq.empty()) {
            auto [h, ni] = pq.top();
            pq.pop();
            h -= k;
            if (h <= 0) cout << -ni + 1 << ' ';
            else pq.push({h, ni});
        }
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(Σa / k · log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['priority-queue'],
    },
  ],
  tests: [
    { input: '3\n3 2\n1 2 3\n2 3\n1 1\n4 3\n2 8 3 5', output: '2 1 3\n1 2\n3 1 2 4', source: 'sample', note: sample(1) },
    { input: '1\n2 5\n10 5', output: '1 2', source: 'own', note: L('Both are multiples of k: tie by index.', 'দুটিই k-এর গুণিতক: ইনডেক্স অনুযায়ী।') },
  ],
  pitfalls: [L('Using a % k, which maps multiples of k to 0 instead of k.', 'a % k ব্যবহার, যা k-এর গুণিতককে k-এর বদলে ০ বানায়।'), L('An unstable sort that breaks the index order on ties.', 'অস্থির সর্ট যা সমান হলে ইনডেক্সের ক্রম ভাঙে।')],
  related: [{ id: '230A', name: 'Dragons', why: L('Order by a computed key.', 'হিসাব করা কী অনুযায়ী ক্রম।') }],
  toolkit: ['sort', 'lambda'],
};

export const p1294C: ProblemEntry = {
  id: '1294C',
  contestId: 1294,
  index: 'C',
  name: 'Product of Three Numbers',
  rating: 1300,
  tags: ['greedy', 'math', 'number-theory'],
  featuredFor: ['number-theory'],
  why: L('Greedy factorisation: take the smallest divisors first so the third factor stays large and distinct.', 'গ্রিডি উৎপাদক বিশ্লেষণ: আগে সবচেয়ে ছোট ভাজকগুলো নিন যাতে তৃতীয় উৎপাদক বড় আর আলাদা থাকে।'),
  statement: L(
    'Find three distinct integers a, b, c ≥ 2 with a · b · c = n, or say it is impossible. Print NO, or YES and any such triple. There are t test cases.',
    'a · b · c = n এমন তিনটি আলাদা পূর্ণসংখ্যা a, b, c ≥ ২ বের করুন, অথবা বলুন অসম্ভব। NO, অথবা YES আর এমন যেকোনো একটি ত্রয়ী প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n.', 't; প্রতিটি টেস্টে n।'),
  output: L('NO, or YES and a b c.', 'NO, অথবা YES আর a b c।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 10⁹, t ≤ 100', '২ ≤ n ≤ ১০⁹, t ≤ ১০০')] },
  samples: [
    { input: '5\n64\n32\n97\n2\n12345', output: 'YES\n2 4 8\nNO\nNO\nNO\nYES\n3 5 823', explain: L('32 = 2⁵ cannot be split into three distinct factors ≥ 2.', '৩২ = ২⁵-কে ২ বা বড় তিনটি আলাদা উৎপাদকে ভাঙা যায় না।') },
  ],
  observation: L('Take a = the smallest divisor ≥ 2 of n, then b = the smallest divisor of n / a that is greater than a; c = n / (a · b) must then be ≥ 2 and different from a and b. Choosing small a and b leaves c as large as possible.', 'a = n-এর ২ বা বড় সবচেয়ে ছোট ভাজক নিন, তারপর b = n / a-এর a-এর বড় সবচেয়ে ছোট ভাজক; তখন c = n / (a · b)-কে ২ বা বড় আর a ও b থেকে আলাদা হতে হবে। ছোট a আর b বাছলে c যত বড় সম্ভব থাকে।'),
  approach: [L('Two trial-division searches up to √n, then check c.', '√n পর্যন্ত দুটি ভাগ করে খোঁজা, তারপর c যাচাই।')],
  walkthrough: { input: '64', steps: [{ state: 'a = 2, rest 32', text: L('Smallest divisor of 32 above 2 is 4.', '৩২-এর ২-এর বড় সবচেয়ে ছোট ভাজক ৪।') }, { state: 'c = 64 / 8 = 8', text: L('2, 4, 8 are distinct: YES.', '২, ৪, ৮ আলাদা: YES।') }] },
  complexity: { time: 'O(√n) per test', space: 'O(1)', why: L('Trial division.', 'ভাগ করে দেখা।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Smallest divisors first', 'আগে সবচেয়ে ছোট ভাজক'),
      idea: L('a = smallest divisor, b = next distinct divisor of n / a, c = the rest.', 'a = সবচেয়ে ছোট ভাজক, b = n / a-এর পরের আলাদা ভাজক, c = বাকিটা।'),
      explain: [L('If any valid triple exists, this one is valid too: the smallest a and b make c largest, so c > b whenever a solution exists. The search for b starts at a + 1 to keep it distinct from a.', 'কোনো বৈধ ত্রয়ী থাকলে এটিও বৈধ: সবচেয়ে ছোট a আর b, c-কে সবচেয়ে বড় করে, তাই সমাধান থাকলে c > b। a থেকে আলাদা রাখতে b-এর খোঁজ a + ১ থেকে শুরু হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        long long a = -1, b = -1;
        for (long long d = 2; d * d <= n; d++) if (n % d == 0) { a = d; break; }
        if (a != -1) {
            long long m = n / a;
            for (long long d = a + 1; d * d < m; d++) if (m % d == 0) { b = d; break; }
        }
        if (a == -1 || b == -1) { cout << "NO\n"; continue; }
        long long c = n / a / b;
        cout << "YES\n" << a << " " << b << " " << c << "\n";
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
      id: 'search',
      kind: 'method',
      title: L('Search a < b < c directly', 'সরাসরি a < b < c খোঁজা'),
      idea: L('Try a while a³ < n and b while a · b² < n; the first divisible pair gives c = n / (a · b) > b.', 'a³ < n যতক্ষণ a আর a · b² < n যতক্ষণ b চেষ্টা করুন; প্রথম বিভাজ্য জোড়া c = n / (a · b) > b দেয়।'),
      explain: [L('Writing the three factors in increasing order bounds the search: a < ∛n and b < √(n / a). The first pair found is the same one the greedy finds, so this doubles as a check of the greedy argument.', 'তিনটি উৎপাদক বাড়তি ক্রমে লিখলে খোঁজার সীমা পাওয়া যায়: a < ∛n আর b < √(n / a)। প্রথম পাওয়া জোড়াটি গ্রিডির পাওয়া জোড়াই, তাই এটি গ্রিডি যুক্তির যাচাইও।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;
        cin >> n;
        bool found = false;
        for (long long a = 2; a * a * a < n && !found; a++) {
            if (n % a) continue;
            long long m = n / a;
            for (long long b = a + 1; b * b < m; b++)
                if (m % b == 0) {
                    cout << "YES\n" << a << " " << b << " " << m / b << "\n";
                    found = true;
                    break;
                }
        }
        if (!found) cout << "NO\n";
    }
    return 0;
}
`,
      time: 'O(∛n + d · √n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'break-continue'],
    },
  ],
  tests: [
    { input: '5\n64\n32\n97\n2\n12345', output: 'YES\n2 4 8\nNO\nNO\nNO\nYES\n3 5 823', source: 'sample', note: sample(1) },
    { input: '2\n24\n30', output: 'YES\n2 3 4\nYES\n2 3 5', source: 'own', note: L('Small composites.', 'ছোট যৌগিক সংখ্যা।') },
  ],
  pitfalls: [L('Allowing c = b or c = 1.', 'c = b বা c = ১ হতে দেওয়া।')],
  related: [{ id: '26A', name: 'Almost Prime', why: L('Trial division again.', 'আবার ভাগ করে দেখা।') }],
  toolkit: ['long-long'],
};

export const p467B: ProblemEntry = {
  id: '467B',
  contestId: 467,
  index: 'B',
  name: 'Fedor and New Game',
  rating: 1100,
  tags: ['bitmasks', 'brute-force', 'constructive', 'implementation'],
  why: L('Hamming distance in one line: popcount of a XOR.', 'এক লাইনে হ্যামিং দূরত্ব: একটি XOR-এর popcount।'),
  statement: L(
    'Armies are described by numbers whose n lowest bits say which soldier types they contain. There are m + 1 players; Fedor is the last. Two players can be friends if their armies differ in at most k soldier types. How many of the first m players can be Fedor’s friends?',
    'সেনাবাহিনী সংখ্যা দিয়ে বর্ণিত, যার সবচেয়ে নিচের n-টি বিট বলে কোন ধরনের সৈনিক আছে। m + ১ জন খেলোয়াড়; ফেদর শেষজন। দুজনের সেনাবাহিনী সর্বোচ্চ k ধরনের সৈনিকে আলাদা হলে তারা বন্ধু হতে পারে। প্রথম m জনের কতজন ফেদরের বন্ধু হতে পারে?',
  ),
  input: L('n, m, k, then m + 1 numbers.', 'n, m, k, তারপর m + ১টি সংখ্যা।'),
  output: L('The number of potential friends.', 'সম্ভাব্য বন্ধুর সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k ≤ n ≤ 20, 1 ≤ m ≤ 1000', '১ ≤ k ≤ n ≤ ২০, ১ ≤ m ≤ ১০০০')] },
  samples: [
    { input: '7 3 1\n8\n5\n111\n17', output: '0', explain: L('Every army differs from 17 in at least two types.', 'প্রতিটি সেনাবাহিনী ১৭ থেকে অন্তত দুই ধরনে আলাদা।') },
    { input: '3 3 3\n1\n2\n3\n4', output: '3', explain: L('k = 3 = n allows anything.', 'k = ৩ = n হলে সব চলে।') },
  ],
  observation: L('The bits where two armies differ are exactly the 1-bits of x ⊕ y. So count players with popcount(xᵢ ⊕ fedor) ≤ k.', 'দুটি সেনাবাহিনী যে বিটগুলোতে আলাদা সেগুলো ঠিক x ⊕ y-এর ১-বিট। তাই popcount(xᵢ ⊕ fedor) ≤ k এমন খেলোয়াড় গুনুন।'),
  approach: [L('One XOR and one popcount per player.', 'প্রতি খেলোয়াড়ে একটি XOR আর একটি popcount।')],
  walkthrough: { input: '8 vs 17', steps: [{ state: '01000 ⊕ 10001 = 11001', text: L('Three differences > 1.', 'তিনটি পার্থক্য > ১।') }] },
  complexity: { time: 'O(m)', space: 'O(m)', why: L('Constant work per player.', 'প্রতি খেলোয়াড়ে স্থির কাজ।') },
  solutions: [
    {
      id: 'popcount',
      kind: 'optimal',
      title: L('popcount(x ⊕ fedor)', 'popcount(x ⊕ fedor)'),
      idea: L('XOR marks the differing bits; popcount counts them.', 'XOR আলাদা বিটগুলো চিহ্নিত করে; popcount সেগুলো গোনে।'),
      explain: [L('This Hamming-distance trick appears whenever sets are stored as bitmasks.', 'সেট বিটমাস্কে রাখা হলেই এই হ্যামিং-দূরত্বের কৌশল আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> x(m + 1);
    for (auto& v : x) cin >> v;
    int friends = 0;
    for (int i = 0; i < m; i++)
        if (__builtin_popcount(x[i] ^ x[m]) <= k) friends++;
    cout << friends << "\n";
    return 0;
}
`,
      time: 'O(m)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['popcount', 'bitwise-and'],
    },
    {
      id: 'bits',
      kind: 'method',
      title: L('Compare bit by bit', 'বিট ধরে ধরে তুলনা'),
      idea: L('For each of the n bits, compare (x >> j & 1) with (fedor >> j & 1).', 'n-টি বিটের প্রতিটির জন্য (x >> j & ১)-কে (fedor >> j & ১)-এর সঙ্গে তুলনা।'),
      explain: [L('The same count without XOR or builtins, which makes the meaning of each bit explicit.', 'XOR বা বিল্টইন ছাড়া একই গণনা, যা প্রতিটি বিটের অর্থ স্পষ্ট করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, k;
    cin >> n >> m >> k;
    vector<int> x(m + 1);
    for (auto& v : x) cin >> v;
    int friends = 0;
    for (int i = 0; i < m; i++) {
        int diff = 0;
        for (int j = 0; j < n; j++) diff += ((x[i] >> j & 1) != (x[m] >> j & 1));
        if (diff <= k) friends++;
    }
    cout << friends << "\n";
    return 0;
}
`,
      time: 'O(m · n)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '7 3 1\n8\n5\n111\n17', output: '0', source: 'sample', note: sample(1) },
    { input: '3 3 3\n1\n2\n3\n4', output: '3', source: 'sample', note: sample(2) },
    { input: '1 1 1\n1\n1', output: '1', source: 'own', note: L('Identical armies.', 'একই সেনাবাহিনী।') },
  ],
  pitfalls: [L('Counting Fedor as his own friend.', 'ফেদরকে তার নিজের বন্ধু গোনা।')],
  related: [{ id: '1421A', name: 'XORwice', why: L('XOR, bit by bit.', 'XOR, বিট ধরে ধরে।') }],
  toolkit: ['popcount'],
};

export const p327A: ProblemEntry = {
  id: '327A',
  contestId: 327,
  index: 'A',
  name: 'Flipping Game',
  rating: 1200,
  tags: ['brute-force', 'dp', 'implementation'],
  why: L('Exactly one flip: brute force over segments, or a maximum-subarray (Kadane) trick.', 'ঠিক একবার উল্টানো: অংশগুলোর ওপর ব্রুট ফোর্স, বা সর্বোচ্চ-সাবঅ্যারে (কাডেন) কৌশল।'),
  statement: L(
    'You have n bits a₁ … aₙ. You must choose exactly one segment [i, j] and flip every bit in it (0 ↔ 1). Maximise the number of ones afterwards.',
    'আপনার n-টি বিট a₁ … aₙ আছে। ঠিক একটি অংশ [i, j] বেছে এর প্রতিটি বিট উল্টাতে হবে (০ ↔ ১)। এরপর একের সংখ্যা সর্বোচ্চ করুন।',
  ),
  input: L('n, then the bits.', 'n, তারপর বিটগুলো।'),
  output: L('The maximum number of ones.', 'একের সর্বোচ্চ সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100', '১ ≤ n ≤ ১০০')] },
  samples: [
    { input: '5\n1 0 0 1 0', output: '4', explain: L('Flip [2, 3].', '[২, ৩] উল্টান।') },
    { input: '4\n1 0 0 1', output: '4', explain: L('Flip the two zeros.', 'দুটি শূন্য উল্টান।') },
  ],
  observation: L('Flipping a segment changes the count by (zeros − ones) inside it. Give each 0 the value +1 and each 1 the value −1; the best flip is the maximum-sum subarray (which must be non-empty, so an all-ones array loses one).', 'একটি অংশ উল্টালে গণনা বদলায় এর ভেতরের (শূন্য − এক) পরিমাণে। প্রতিটি ০-কে +১ আর প্রতিটি ১-কে −১ মান দিন; সেরা উল্টানো হলো সর্বোচ্চ-যোগফলের সাবঅ্যারে (যা খালি হতে পারে না, তাই সব-এক অ্যারেতে একটি হারায়)।'),
  approach: [L('ones + maximum subarray sum of ±1 values, computed with Kadane.', 'ones + ±১ মানের সর্বোচ্চ সাবঅ্যারে যোগফল, কাডেন দিয়ে।')],
  walkthrough: { input: '1 0 0 1 0', steps: [{ state: 'values −1 +1 +1 −1 +1', text: L('Best subarray sum 2 ([2,3]). 2 + 2 = 4.', 'সেরা সাবঅ্যারে যোগফল ২ ([২,৩])। ২ + ২ = ৪।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Kadane is one pass.', 'কাডেন একবার যাওয়া।') },
  solutions: [
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every segment', 'প্রতিটি অংশ চেষ্টা'),
      idea: L('O(n²) segments, count ones after flipping each.', 'O(n²)টি অংশ, প্রতিটি উল্টানোর পর এক গোনা।'),
      explain: [L('With n ≤ 100 even O(n³) is fine. This is the safest first solution and exactly what the tags suggest.', 'n ≤ ১০০ হলে এমনকি O(n³)-ও ঠিক। এটি সবচেয়ে নিরাপদ প্রথম সমাধান আর ঠিক যা ট্যাগগুলো ইঙ্গিত দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int best = 0;
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            int ones = 0;
            for (int k = 0; k < n; k++) ones += (k >= i && k <= j) ? 1 - a[k] : a[k];
            best = max(best, ones);
        }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
    {
      id: 'kadane',
      kind: 'optimal',
      title: L('Maximum subarray (Kadane)', 'সর্বোচ্চ সাবঅ্যারে (কাডেন)'),
      idea: L('gain = max non-empty subarray sum with 0 → +1, 1 → −1.', 'gain = ০ → +১, ১ → −১ দিয়ে খালি নয় এমন সর্বোচ্চ সাবঅ্যারে যোগফল।'),
      explain: [L('Kadane keeps the best sum of a subarray ending at i: cur = max(v, cur + v). Turning “flip gain” into a subarray sum lets it handle n = 10⁶ just as easily.', 'কাডেন i-তে শেষ হওয়া সাবঅ্যারের সেরা যোগফল রাখে: cur = max(v, cur + v)। “উল্টানোর লাভ”-কে সাবঅ্যারে যোগফলে বদলালে এটি n = ১০⁶-ও সমান সহজে সামলায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int ones = 0, cur = 0, gain = INT_MIN;
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        ones += a;
        int v = a ? -1 : 1;
        cur = max(v, cur + v);
        gain = max(gain, cur);
    }
    cout << ones + gain << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max'],
    },
  ],
  tests: [
    { input: '5\n1 0 0 1 0', output: '4', source: 'sample', note: sample(1) },
    { input: '4\n1 0 0 1', output: '4', source: 'sample', note: sample(2) },
    { input: '3\n1 1 1', output: '2', source: 'own', note: L('A flip is mandatory.', 'উল্টানো বাধ্যতামূলক।') },
  ],
  pitfalls: [L('Allowing an empty flip, which gives n for all ones.', 'খালি উল্টানো অনুমতি দেওয়া, যা সব-একে n দেয়।')],
  related: [{ id: '580A', name: 'Kefa and First Steps', why: L('A one-pass DP over positions.', 'অবস্থানের ওপর এক-পাসের DP।') }],
  toolkit: ['min-max'],
};

export const p479A: ProblemEntry = {
  id: '479A',
  contestId: 479,
  index: 'A',
  name: 'Expression',
  rating: 1000,
  tags: ['brute-force', 'math'],
  why: L('When there are only six possibilities, list them all.', 'যখন মাত্র ছয়টি সম্ভাবনা, সবগুলো তালিকা করো।'),
  statement: L(
    'Given three positive integers a, b, c in this order, insert + or × between them and optionally brackets, keeping the order. What is the largest value you can get?',
    'এই ক্রমে তিনটি ধনাত্মক পূর্ণসংখ্যা a, b, c দেওয়া আছে; ক্রম বজায় রেখে তাদের মাঝে + বা × আর ইচ্ছামতো বন্ধনী বসান। সবচেয়ে বড় কত মান পাওয়া যায়?',
  ),
  input: L('a, b, c on three lines.', 'তিন লাইনে a, b, c।'),
  output: L('The maximum value.', 'সর্বোচ্চ মান।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a, b, c ≤ 10', '১ ≤ a, b, c ≤ ১০')] },
  samples: [
    { input: '1\n2\n3', output: '9', explain: L('(1 + 2) × 3.', '(১ + ২) × ৩।') },
    { input: '2\n10\n3', output: '60', explain: L('2 × 10 × 3.', '২ × ১০ × ৩।') },
  ],
  observation: L('The distinct expressions are a+b+c, a·b·c, (a+b)·c, a·(b+c), a+b·c and a·b+c. The last two are never larger than the bracketed ones, but checking all six is simplest.', 'আলাদা এক্সপ্রেশন হলো a+b+c, a·b·c, (a+b)·c, a·(b+c), a+b·c আর a·b+c। শেষ দুটি কখনো বন্ধনীযুক্তগুলোর চেয়ে বড় নয়, তবে ছয়টিই দেখা সবচেয়ে সহজ।'),
  approach: [L('Take the max of the six values.', 'ছয়টি মানের সর্বোচ্চ নিন।')],
  walkthrough: { input: '1 2 3', steps: [{ state: '6, 6, 9, 5, 7, 5', text: L('Max 9.', 'সর্বোচ্চ ৯।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Six expressions.', 'ছয়টি এক্সপ্রেশন।') },
  solutions: [
    {
      id: 'six',
      kind: 'optimal',
      title: L('All six expressions', 'ছয়টি এক্সপ্রেশনই'),
      idea: L('max({...}).', 'max({...})।'),
      explain: [L('An initializer list inside max() compares any number of values at once.', 'max()-এর ভেতরে একটি ইনিশিয়ালাইজার লিস্ট একসঙ্গে যেকোনো সংখ্যক মান তুলনা করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << max({a + b + c, a * b * c, (a + b) * c, a * (b + c), a + b * c, a * b + c}) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max'],
    },
    {
      id: 'ops',
      kind: 'method',
      title: L('Loop over operators and bracket order', 'অপারেটর আর বন্ধনীর ক্রমে লুপ'),
      idea: L('Two operator choices × two bracketings, applied with a small helper.', 'দুটি অপারেটর বিকল্প × দুটি বন্ধনী বিন্যাস, একটি ছোট সহায়ক দিয়ে প্রয়োগ।'),
      explain: [L('Generating expressions systematically scales when there are more numbers, which is the start of interval DP over expressions.', 'এক্সপ্রেশন নিয়মমাফিক তৈরি করলে বেশি সংখ্যায় বাড়ানো যায়, যা এক্সপ্রেশনের ওপর ইন্টারভাল DP-র সূচনা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int apply(int x, int y, int op) { return op ? x * y : x + y; }

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int best = 0;
    for (int o1 = 0; o1 < 2; o1++)
        for (int o2 = 0; o2 < 2; o2++) {
            best = max(best, apply(apply(a, b, o1), c, o2));   // (a ? b) ? c
            best = max(best, apply(a, apply(b, c, o2), o1));   // a ? (b ? c)
        }
    cout << best << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '1\n2\n3', output: '9', source: 'sample', note: sample(1) },
    { input: '2\n10\n3', output: '60', source: 'sample', note: sample(2) },
    { input: '1\n1\n1', output: '3', source: 'own', note: L('All ones: addition wins.', 'সব এক: যোগ জেতে।') },
  ],
  pitfalls: [L('Forgetting a bracketing, e.g. a × (b + c).', 'একটি বন্ধনী বিন্যাস ভুলে যাওয়া, যেমন a × (b + c)।')],
  related: [{ id: '1097B', name: 'Petr and a Combination Lock', why: L('Enumerate a tiny search space.', 'ছোট খোঁজার পরিসর গণনা।') }],
  toolkit: ['min-max'],
};

export const p25A: ProblemEntry = {
  id: '25A',
  contestId: 25,
  index: 'A',
  name: 'IQ test',
  rating: 1300,
  tags: ['brute-force'],
  why: L('Find the odd one out by parity: decide the majority, then find the exception.', 'জোড়-বিজোড় দিয়ে ব্যতিক্রম খোঁজা: সংখ্যাগরিষ্ঠ ঠিক করো, তারপর ব্যতিক্রম খোঁজো।'),
  statement: L(
    'n numbers are given; exactly one of them differs from all the others in evenness. Print its 1-based index.',
    'n-টি সংখ্যা দেওয়া আছে; ঠিক একটি জোড়-বিজোড়ে বাকি সবার থেকে আলাদা। এর ১-ভিত্তিক ইনডেক্স প্রিন্ট করুন।',
  ),
  input: L('n, then the numbers.', 'n, তারপর সংখ্যাগুলো।'),
  output: L('The index.', 'ইনডেক্স।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 100', '৩ ≤ n ≤ ১০০')] },
  samples: [
    { input: '5\n2 4 7 8 10', output: '3', explain: L('7 is the only odd number.', '৭ একমাত্র বিজোড়।') },
    { input: '4\n1 2 1 1', output: '2', explain: L('2 is the only even number.', '২ একমাত্র জোড়।') },
  ],
  observation: L('Count the evens. If there is one even number, find it; otherwise find the one odd number.', 'জোড়গুলো গুনুন। একটি জোড় থাকলে সেটি খুঁজুন; না হলে একটি বিজোড়টি খুঁজুন।'),
  approach: [L('Two passes: count, then search for the minority parity.', 'দুবার: গোনা, তারপর সংখ্যালঘু জোড়-বিজোড় খোঁজা।')],
  walkthrough: { input: '2 4 7 8 10', steps: [{ state: 'evens 4, odds 1', text: L('Find the odd: index 3.', 'বিজোড়টি খুঁজুন: ইনডেক্স ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two passes.', 'দুবার।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('Count, then find the minority', 'গুনে সংখ্যালঘু খোঁজা'),
      idea: L('The minority parity has exactly one member.', 'সংখ্যালঘু জোড়-বিজোড়ের ঠিক একটি সদস্য।'),
      explain: [L('Deciding the majority first avoids special cases where the odd one out is the first or second number.', 'আগে সংখ্যাগরিষ্ঠ ঠিক করলে ব্যতিক্রমটি প্রথম বা দ্বিতীয় সংখ্যা হওয়ার বিশেষ কেস এড়ানো যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    int evens = 0;
    for (auto& x : a) cin >> x, evens += (x % 2 == 0);
    int want = (evens == 1) ? 0 : 1;   // parity of the odd one out
    for (int i = 0; i < n; i++)
        if (a[i] % 2 == want) { cout << i + 1 << "\n"; break; }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['modulo'],
    },
    {
      id: 'first-three',
      kind: 'method',
      title: L('Majority from the first three', 'প্রথম তিনটি থেকে সংখ্যাগরিষ্ঠ'),
      idea: L('At least two of the first three share the majority parity.', 'প্রথম তিনটির অন্তত দুটি সংখ্যাগরিষ্ঠ জোড়-বিজোড় ভাগ করে।'),
      explain: [L('Only one number is different, so among any three numbers the majority parity is the common one. Then a single scan finds the exception, which also works for a stream of input.', 'মাত্র একটি সংখ্যা আলাদা, তাই যেকোনো তিনটি সংখ্যার মধ্যে সংখ্যাগরিষ্ঠ জোড়-বিজোড়ই সাধারণটি। তারপর একবার স্ক্যানে ব্যতিক্রম পাওয়া যায়, যা একটানা ইনপুটেও চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int oddsInFirst3 = (a[0] & 1) + (a[1] & 1) + (a[2] & 1);
    int common = (oddsInFirst3 >= 2) ? 1 : 0;
    for (int i = 0; i < n; i++)
        if ((a[i] & 1) != common) { cout << i + 1 << "\n"; break; }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['bitwise-and'],
    },
  ],
  tests: [
    { input: '5\n2 4 7 8 10', output: '3', source: 'sample', note: sample(1) },
    { input: '4\n1 2 1 1', output: '2', source: 'sample', note: sample(2) },
    { input: '3\n5 2 4', output: '1', source: 'own', note: L('The first number is the odd one.', 'প্রথম সংখ্যাটিই ব্যতিক্রম।') },
  ],
  pitfalls: [L('Comparing only with the first number, which fails when the first is the exception.', 'শুধু প্রথম সংখ্যার সঙ্গে তুলনা, যা প্রথমটিই ব্যতিক্রম হলে ব্যর্থ।')],
  related: [{ id: '1475A', name: 'Odd Divisor', why: L('Parity reasoning.', 'জোড়-বিজোড় যুক্তি।') }],
  toolkit: ['modulo'],
};

export const p208A: ProblemEntry = {
  id: '208A',
  contestId: 208,
  index: 'A',
  name: 'Dubstep',
  rating: 900,
  tags: ['strings'],
  why: L('Splitting a string by a multi-character separator and dropping empty pieces.', 'একাধিক অক্ষরের বিভাজক দিয়ে স্ট্রিং ভাগ করা আর খালি টুকরো বাদ দেওয়া।'),
  statement: L(
    'A song’s words were remixed by inserting “WUB” before the first word, after the last word, and at least once between words (possibly zero times at the ends). Given the remix, restore the original words separated by spaces.',
    'একটি গানের শব্দগুলো রিমিক্স করা হয়েছে প্রথম শব্দের আগে, শেষ শব্দের পরে আর শব্দগুলোর মাঝে অন্তত একবার “WUB” বসিয়ে (প্রান্তে শূন্যবারও হতে পারে)। রিমিক্স দেওয়া আছে; মূল শব্দগুলো স্পেস দিয়ে আলাদা করে ফিরিয়ে আনুন।',
  ),
  input: L('One string of uppercase letters, length ≤ 200.', 'বড় হাতের অক্ষরের একটি স্ট্রিং, দৈর্ঘ্য ≤ ২০০।'),
  output: L('The original words separated by spaces.', 'স্পেস দিয়ে আলাদা মূল শব্দগুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('No original word contains WUB.', 'কোনো মূল শব্দে WUB নেই।')] },
  samples: [
    { input: 'WUBWUBABCWUB', output: 'ABC ', explain: L('One word.', 'একটি শব্দ।') },
    { input: 'WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB', output: 'WE ARE THE CHAMPIONS MY FRIEND ', explain: L('Double WUBs are just one gap.', 'দুটি WUB একটি মাত্র ফাঁক।') },
  ],
  observation: L('Every run of WUBs is a separator. Splitting by WUB gives the words plus empty pieces wherever WUBs were adjacent or at the ends; drop the empty ones.', 'WUB-এর প্রতিটি ধারা একটি বিভাজক। WUB দিয়ে ভাগ করলে শব্দগুলোর সঙ্গে খালি টুকরো আসে যেখানে WUB পাশাপাশি বা প্রান্তে ছিল; খালিগুলো বাদ দিন।'),
  approach: [L('Scan with an index: skip WUB when it starts at i, otherwise collect letters into the current word.', 'একটি ইনডেক্স নিয়ে স্ক্যান করুন: i-তে WUB শুরু হলে বাদ দিন, না হলে অক্ষরগুলো বর্তমান শব্দে জড়ো করুন।')],
  walkthrough: { input: 'WUBWUBABCWUB', steps: [{ state: 'skip, skip, ABC, skip', text: L('Print “ABC”.', '“ABC” প্রিন্ট।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'scan',
      kind: 'optimal',
      title: L('Scan and skip WUB', 'স্ক্যান করে WUB বাদ'),
      idea: L('compare(i, 3, "WUB") detects the separator.', 'compare(i, ৩, "WUB") বিভাজক শনাক্ত করে।'),
      explain: [L('When a WUB is skipped, finish the current word if it is non-empty. That way consecutive WUBs never produce empty words.', 'একটি WUB বাদ দেওয়ার সময় বর্তমান শব্দ খালি না হলে শেষ করুন। এভাবে পরপর WUB কখনো খালি শব্দ তৈরি করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    vector<string> words;
    string cur;
    for (size_t i = 0; i < s.size();) {
        if (s.compare(i, 3, "WUB") == 0) {
            if (!cur.empty()) { words.push_back(cur); cur.clear(); }
            i += 3;
        } else {
            cur += s[i++];
        }
    }
    if (!cur.empty()) words.push_back(cur);
    for (auto& w : words) cout << w << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'vector'],
    },
    {
      id: 'replace',
      kind: 'stl',
      title: L('Replace WUB with spaces, then read words', 'WUB-কে স্পেসে বদলে শব্দ পড়া'),
      idea: L('Turn every WUB into a space and let a stringstream split by whitespace.', 'প্রতিটি WUB-কে স্পেসে বদলে stringstream-কে হোয়াইটস্পেসে ভাগ করতে দিন।'),
      explain: [L('operator>> on a stringstream skips any amount of whitespace, so runs of WUB automatically collapse into single gaps.', 'stringstream-এ operator>> যেকোনো পরিমাণ হোয়াইটস্পেস বাদ দেয়, তাই WUB-এর ধারা আপনাআপনি একক ফাঁকে নেমে আসে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    size_t p;
    while ((p = s.find("WUB")) != string::npos) s.replace(p, 3, " ");
    stringstream ss(s);
    string w;
    while (ss >> w) cout << w << ' ';
    cout << "\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'count-find'],
    },
  ],
  tests: [
    { input: 'WUBWUBABCWUB', output: 'ABC ', source: 'sample', note: sample(1) },
    { input: 'WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB', output: 'WE ARE THE CHAMPIONS MY FRIEND ', source: 'sample', note: sample(2) },
    { input: 'AWUBB', output: 'A B', source: 'own', note: L('No WUB at the ends.', 'প্রান্তে WUB নেই।') },
  ],
  pitfalls: [L('Printing several spaces for consecutive WUBs.', 'পরপর WUB-এর জন্য কয়েকটি স্পেস প্রিন্ট।')],
  related: [{ id: '58A', name: 'Chat room', why: L('Another string scan.', 'আরেকটি স্ট্রিং স্ক্যান।') }],
  toolkit: ['string-basics'],
};

export const p266B: ProblemEntry = {
  id: '266B',
  contestId: 266,
  index: 'B',
  name: 'Queue at the School',
  rating: 800,
  tags: ['constructive', 'implementation'],
  why: L('Simulating simultaneous swaps: skip ahead after each swap so a girl moves only once per second.', 'একসঙ্গে অদলবদল সিমুলেশন: প্রতিটি অদলবদলের পর এগিয়ে যান যাতে প্রতি সেকেন্ডে একটি মেয়ে একবারই সরে।'),
  statement: L(
    'A queue of n children is a string of B (boy) and G (girl). Every second, each boy standing directly in front of a girl lets her go ahead: every “BG” becomes “GB”, all at the same time. Print the queue after t seconds.',
    'n শিশুর একটি সারি B (ছেলে) আর G (মেয়ে)-এর স্ট্রিং। প্রতি সেকেন্ডে মেয়ের ঠিক সামনে দাঁড়ানো প্রতিটি ছেলে তাকে আগে যেতে দেয়: প্রতিটি “BG” একসঙ্গে “GB” হয়। t সেকেন্ড পর সারিটি প্রিন্ট করুন।',
  ),
  input: L('n and t, then the queue.', 'n আর t, তারপর সারি।'),
  output: L('The queue after t seconds.', 't সেকেন্ড পর সারি।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, t ≤ 50', '১ ≤ n, t ≤ ৫০')] },
  samples: [
    { input: '5 1\nBGGBG', output: 'GBGGB', explain: L('Positions 1–2 and 4–5 swap.', 'অবস্থান ১–২ আর ৪–৫ অদলবদল।') },
    { input: '5 2\nBGGBG', output: 'GGBGB', explain: L('One more second.', 'আরেক সেকেন্ড।') },
    { input: '4 1\nGGGB', output: 'GGGB', explain: L('No boy is before a girl.', 'কোনো ছেলে মেয়ের আগে নেই।') },
  ],
  observation: L('In one second, a swap at positions i, i + 1 must not be followed by another swap involving the same girl. After swapping, jump to i + 2.', 'এক সেকেন্ডে i, i + ১ অবস্থানে অদলবদলের পর একই মেয়েকে নিয়ে আরেকটি অদলবদল হতে পারবে না। অদলবদলের পর i + ২-এ লাফ দিন।'),
  approach: [L('Repeat t times: scan left to right, swap each BG and skip the next position.', 't বার: বাম থেকে ডানে স্ক্যান করুন, প্রতিটি BG অদলবদল করে পরের অবস্থান বাদ দিন।')],
  walkthrough: { input: 'BGGBG, t = 1', steps: [{ state: 'i=0 swap → GBGBG, jump to 2', text: L('i=2: G, i=3: BG swap → GBGGB.', 'i=২: G, i=৩: BG অদলবদল → GBGGB।') }] },
  complexity: { time: 'O(n · t)', space: 'O(n)', why: L('t scans.', 't বার স্ক্যান।') },
  solutions: [
    {
      id: 'skip',
      kind: 'optimal',
      title: L('In-place scan with a skip', 'বাদসহ জায়গায় স্ক্যান'),
      idea: L('swap, then i += 2.', 'অদলবদল, তারপর i += ২।'),
      explain: [L('Without the skip, a girl could move several places in one second: BGG… becomes GBG… and then the same G would swap again. Skipping models the “all at the same time” rule.', 'বাদ না দিলে এক সেকেন্ডে একটি মেয়ে কয়েক ঘর সরে যেত। বাদ দেওয়া “একসঙ্গে” নিয়মকে মডেল করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    string s;
    cin >> n >> t >> s;
    while (t--) {
        for (int i = 0; i + 1 < n; i++)
            if (s[i] == 'B' && s[i + 1] == 'G') { swap(s[i], s[i + 1]); i++; }
    }
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n · t)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'copy',
      kind: 'method',
      title: L('Read from the old queue, write a new one', 'পুরনো সারি থেকে পড়ে নতুন লেখা'),
      idea: L('Build the next second’s queue from an unchanged copy.', 'অপরিবর্তিত কপি থেকে পরের সেকেন্ডের সারি বানান।'),
      explain: [L('Reading from the old state and writing to a new one is the general way to simulate simultaneous updates (like the Game of Life). Here every BG in the old string becomes GB in the new one.', 'পুরনো অবস্থা থেকে পড়ে নতুনটিতে লেখা একসঙ্গে হওয়া আপডেট সিমুলেট করার সাধারণ উপায় (যেমন গেম অফ লাইফ)। এখানে পুরনো স্ট্রিংয়ের প্রতিটি BG নতুনটিতে GB হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    string s;
    cin >> n >> t >> s;
    while (t--) {
        string next = s;
        for (int i = 0; i + 1 < n; i++)
            if (s[i] == 'B' && s[i + 1] == 'G') { next[i] = 'G'; next[i + 1] = 'B'; }
        s = next;
    }
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n · t)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '5 1\nBGGBG', output: 'GBGGB', source: 'sample', note: sample(1) },
    { input: '5 2\nBGGBG', output: 'GGBGB', source: 'sample', note: sample(2) },
    { input: '4 1\nGGGB', output: 'GGGB', source: 'sample', note: sample(3) },
    { input: '3 5\nBBG', output: 'GBB', source: 'own', note: L('The girl reaches the front and stops.', 'মেয়েটি সামনে পৌঁছে থামে।') },
  ],
  pitfalls: [L('Letting the same girl move twice in one second.', 'এক সেকেন্ডে একই মেয়েকে দুবার সরতে দেওয়া।')],
  related: [{ id: '208A', name: 'Dubstep', why: L('Another string simulation.', 'আরেকটি স্ট্রিং সিমুলেশন।') }],
  toolkit: ['string-basics'],
};

export const p443A: ProblemEntry = {
  id: '443A',
  contestId: 443,
  index: 'A',
  name: 'Anton and Letters',
  rating: 800,
  tags: ['constructive', 'implementation'],
  why: L('Reading a whole line with spaces and punctuation, then counting distinct letters.', 'স্পেস আর বিরামচিহ্নসহ পুরো লাইন পড়া, তারপর ভিন্ন অক্ষর গোনা।'),
  statement: L(
    'Anton wrote a set of small letters like “{a, b, c}” (letters separated by a comma and a space, inside braces), possibly with repeats. How many distinct letters are in the set?',
    'অ্যান্টন “{a, b, c}”-এর মতো ছোট হাতের অক্ষরের একটি সেট লিখেছে (বন্ধনীর ভেতরে কমা আর স্পেস দিয়ে আলাদা অক্ষর), হয়তো পুনরাবৃত্তিসহ। সেটে কতগুলো ভিন্ন অক্ষর?',
  ),
  input: L('One line, length ≤ 1000.', 'একটি লাইন, দৈর্ঘ্য ≤ ১০০০।'),
  output: L('The number of distinct letters.', 'ভিন্ন অক্ষরের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('The line may be just “{}”.', 'লাইনটি শুধু “{}” হতে পারে।')] },
  samples: [
    { input: '{a, b, c}', output: '3', explain: L('Three letters.', 'তিনটি অক্ষর।') },
    { input: '{b, a, b, a}', output: '2', explain: L('a and b.', 'a আর b।') },
    { input: '{}', output: '0', explain: L('Empty set.', 'খালি সেট।') },
  ],
  observation: L('Ignore every character that is not a letter; count the distinct letters that remain.', 'অক্ষর নয় এমন প্রতিটি চিহ্ন উপেক্ষা করুন; বাকি ভিন্ন অক্ষর গুনুন।'),
  approach: [L('getline the whole line, insert every lowercase letter into a set.', 'getline দিয়ে পুরো লাইন পড়ে প্রতিটি ছোট হাতের অক্ষর একটি set-এ ঢোকান।')],
  walkthrough: { input: '{b, a, b, a}', steps: [{ state: '{a, b}', text: L('Size 2.', 'আকার ২।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('At most 26 letters stored.', 'সর্বোচ্চ ২৬টি অক্ষর রাখা।') },
  solutions: [
    {
      id: 'set',
      kind: 'optimal',
      title: L('getline + set of letters', 'getline + অক্ষরের set'),
      idea: L('islower filters out braces, commas and spaces.', 'islower বন্ধনী, কমা আর স্পেস বাদ দেয়।'),
      explain: [L('cin >> would stop at the first space; getline reads the full line, which is the key detail here.', 'cin >> প্রথম স্পেসে থেমে যেত; getline পুরো লাইন পড়ে, যা এখানে মূল বিষয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    set<char> letters;
    for (char c : line) if (islower(c)) letters.insert(c);
    cout << letters.size() << "\n";
    return 0;
}
`,
      time: 'O(n log 26)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['getline', 'set'],
    },
    {
      id: 'array',
      kind: 'method',
      title: L('Read character by character', 'অক্ষর ধরে ধরে পড়া'),
      idea: L('Mark seen[c − \'a\'] while reading every character, spaces included.', 'স্পেসসহ প্রতিটি অক্ষর পড়ার সময় seen[c − \'a\'] চিহ্নিত করুন।'),
      explain: [L('cin.get(c) reads every character including spaces, so no getline is needed. Counting with an array of 26 flags avoids the set.', 'cin.get(c) স্পেসসহ প্রতিটি অক্ষর পড়ে, তাই getline লাগে না। ২৬টি ফ্ল্যাগের অ্যারে দিয়ে গুনলে set লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    bool seen[26] = {};
    char c;
    while (cin.get(c))
        if (c >= 'a' && c <= 'z') seen[c - 'a'] = true;
    cout << count(seen, seen + 26, true) << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['char-count', 'count-find'],
    },
  ],
  tests: [
    { input: '{a, b, c}', output: '3', source: 'sample', note: sample(1) },
    { input: '{b, a, b, a}', output: '2', source: 'sample', note: sample(2) },
    { input: '{}', output: '0', source: 'sample', note: sample(3) },
    { input: '{z}', output: '1', source: 'own', note: L('One letter.', 'একটি অক্ষর।') },
  ],
  pitfalls: [L('Reading with cin >>, which stops at the first space.', 'cin >> দিয়ে পড়া, যা প্রথম স্পেসে থামে।')],
  related: [{ id: '236A', name: 'Boy or Girl', why: L('Distinct letter count.', 'ভিন্ন অক্ষর গণনা।') }],
  toolkit: ['getline', 'set'],
};
