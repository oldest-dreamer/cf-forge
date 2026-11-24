import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

export const p1335B: ProblemEntry = {
  id: '1335B',
  contestId: 1335,
  index: 'B',
  name: 'Construct the String',
  rating: 900,
  tags: ['constructive', 'strings'],
  why: L('A periodic string makes every window look the same.', 'একটি পর্যায়বৃত্ত স্ট্রিং প্রতিটি উইন্ডোকে একরকম দেখায়।'),
  statement: L('Build a string of length n from lowercase letters such that every substring of length a contains exactly b distinct letters. There are t test cases.', 'ছোট হাতের অক্ষর দিয়ে n দৈর্ঘ্যের একটি স্ট্রিং বানান যাতে a দৈর্ঘ্যের প্রতিটি সাবস্ট্রিংয়ে ঠিক b-টি আলাদা অক্ষর থাকে। t-টি টেস্ট কেস আছে।'),
  input: L('t, then n a b for each test.', 't, তারপর প্রতিটি টেস্টের n a b।'),
  output: L('Any valid string per test.', 'প্রতিটি টেস্টে যেকোনো বৈধ স্ট্রিং।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ a ≤ n ≤ 2000, 1 ≤ b ≤ min(26, a)', '১ ≤ a ≤ n ≤ ২০০০, ১ ≤ b ≤ min(২৬, a)'), anyAnswer] },
  samples: [{ input: '4\n7 5 3\n6 1 1\n6 6 1\n5 2 2', output: 'tleelte\nqwerty\nvvvvvv\nabcde', explain: L('In tleelte every window of length 5 has letters {t, l, e}.', 'tleelte-তে ৫ দৈর্ঘ্যের প্রতিটি উইন্ডোতে অক্ষর {t, l, e}।') }],
  observation: L('Repeat “abc…” with period b: s[i] = ‘a’ + i mod b. Any b consecutive characters are all b letters, and since a ≥ b, every window of length a contains all of them and nothing else.', 'b পর্যায়ে “abc…” পুনরাবৃত্তি: s[i] = ‘a’ + i mod b। যেকোনো b-টি পরপর অক্ষর সব b-টি অক্ষর, আর a ≥ b বলে a দৈর্ঘ্যের প্রতিটি উইন্ডোতে এগুলো সব আছে আর অন্য কিছু নেই।'),
  approach: [L('Print ‘a’ + i % b for i in [0, n).', '[০, n)-এর প্রতিটি i-এর জন্য ‘a’ + i % b প্রিন্ট।')],
  walkthrough: { input: '7 5 3', steps: [{ state: 'abcabca', text: L('Every window of 5 holds a, b, c.', '৫-এর প্রতিটি উইন্ডোতে a, b, c।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One character per position.', 'প্রতি অবস্থানে একটি অক্ষর।') },
  solutions: [
    {
      id: 'period-b',
      kind: 'optimal',
      title: L('Period b', 'পর্যায় b'),
      idea: L('Cycle through the first b letters.', 'প্রথম b-টি অক্ষর ঘুরিয়ে।'),
      explain: [L('n and a barely matter: the construction depends only on b. Recognising which parameters can be ignored is a common constructive shortcut.', 'n আর a প্রায় গুরুত্বহীন: গঠনটি শুধু b-এর ওপর নির্ভর করে। কোন প্যারামিটার উপেক্ষা করা যায় তা চেনা একটি প্রচলিত কনস্ট্রাক্টিভ শর্টকাট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, a, b;
        cin >> n >> a >> b;
        string s;
        for (int i = 0; i < n; i++) s += char('a' + i % b);
        cout << s << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['modulo', 'string-basics'],
    },
    {
      id: 'period-a',
      kind: 'alt',
      title: L('Period a with a fixed block', 'নির্দিষ্ট ব্লকসহ পর্যায় a'),
      idea: L('Block = b distinct letters then a − b copies of ‘a’; repeat it.', 'ব্লক = b-টি আলাদা অক্ষর তারপর a − b-টি ‘a’; পুনরাবৃত্তি।'),
      explain: [L('In a string with period a, every window of length a is a rotation of the block, so it has the same letters as the block: exactly b distinct. This argument works for any block you like.', 'a পর্যায়ের স্ট্রিংয়ে a দৈর্ঘ্যের প্রতিটি উইন্ডো ব্লকের একটি ঘূর্ণন, তাই এতে ব্লকের একই অক্ষর: ঠিক b-টি আলাদা। এই যুক্তি যেকোনো ব্লকে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, a, b;
        cin >> n >> a >> b;
        string block;
        for (int i = 0; i < a; i++) block += char('a' + (i < b ? i : 0));
        string s;
        for (int i = 0; i < n; i++) s += block[i % a];
        cout << s << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['modulo', 'string-basics'],
    },
  ],
  tests: [{ input: '4\n7 5 3\n6 1 1\n6 6 1\n5 2 2', output: 'tleelte\nqwerty\nvvvvvv\nabcde', source: 'sample', note: sample(1) }],
  pitfalls: [L('Using more than b letters.', 'b-এর বেশি অক্ষর ব্যবহার।')],
  related: [{ id: '1352G', name: 'Special Permutation', why: L('Pattern-based construction.', 'প্যাটার্ন-ভিত্তিক গঠন।') }],
  toolkit: ['modulo'],
};

export const p1463B: ProblemEntry = {
  id: '1463B',
  contestId: 1463,
  index: 'B',
  name: 'Find The Array',
  rating: 1400,
  tags: ['bitmasks', 'constructive', 'greedy'],
  why: L('Two constructions: ones on the cheaper half, or round every number down to a power of two.', 'দুটি গঠন: সস্তা অর্ধে ১, অথবা প্রতিটি সংখ্যাকে নিচের দুইয়ের ঘাতে নামানো।'),
  statement: L(
    'Given a with sum S, build b with 1 ≤ bᵢ ≤ 10⁹ such that for every adjacent pair one divides the other, and 2 · Σ |aᵢ − bᵢ| ≤ S. There are t test cases.',
    'S যোগফলের a দেওয়া আছে; এমন b বানান যেখানে ১ ≤ bᵢ ≤ ১০⁹, প্রতিটি পাশাপাশি জোড়ায় একটি অন্যটিকে ভাগ করে, আর ২ · Σ |aᵢ − bᵢ| ≤ S। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and a.', 't; প্রতিটি টেস্টে n আর a।'),
  output: L('Any valid b per test.', 'প্রতিটি টেস্টে যেকোনো বৈধ b।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 50, aᵢ ≤ 10⁹', 'n ≤ ৫০, aᵢ ≤ ১০⁹'), anyAnswer] },
  samples: [{ input: '4\n5\n1 2 3 4 5\n2\n4 6\n2\n1 1000000000\n6\n3 4 8 1 2 3', output: '3 3 3 3 3\n3 6\n1 1000000000\n4 4 8 1 3 3', explain: L('4 6 → 3 6: cost 2 · 1 = 2 ≤ 10.', '৪ ৬ → ৩ ৬: খরচ ২ · ১ = ২ ≤ ১০।') }],
  observation: L('1 divides everything. Split positions by parity; one class has sum ≤ S / 2. Set those to 1 and keep the rest: cost 2 · Σ(aᵢ − 1) < 2 · (S / 2) = S, and every adjacent pair contains a 1.', '১ সবকিছুকে ভাগ করে। অবস্থানগুলো জোড়-বিজোড়ে ভাগ করুন; একটি দলের যোগফল ≤ S / ২। সেগুলোকে ১ করে বাকিগুলো রাখুন: খরচ ২ · Σ(aᵢ − ১) < ২ · (S / ২) = S, আর প্রতিটি পাশাপাশি জোড়ায় একটি ১ আছে।'),
  approach: [L('Compare the sums at even and odd positions; replace the smaller class by ones.', 'জোড় আর বিজোড় অবস্থানের যোগফল তুলনা করে ছোট দলটি ১ দিয়ে বদলান।')],
  walkthrough: { input: '1 2 3 4 5', steps: [{ state: 'even positions 1 + 3 + 5 = 9, odd 2 + 4 = 6', text: L('Ones at the odd positions: 1 1 3 1 5, cost 2 · 4 = 8 ≤ 15.', 'বিজোড় অবস্থানে ১: ১ ১ ৩ ১ ৫, খরচ ২ · ৪ = ৮ ≤ ১৫।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two sums.', 'দুটি যোগফল।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Ones on the cheaper parity class', 'সস্তা জোড়-বিজোড় দলে ১'),
      idea: L('Alternate kept values and ones.', 'রাখা মান আর ১ পালাক্রমে।'),
      explain: [L('A pigeonhole-style argument: of two classes summing to S, one is at most S / 2.', 'পায়রার খোপ ধরনের যুক্তি: S যোগফলের দুটি দলের একটি সর্বোচ্চ S / ২।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n);
        long long s[2] = {0, 0};
        for (int i = 0; i < n; i++) { cin >> a[i]; s[i % 2] += a[i]; }
        int ones = s[0] <= s[1] ? 0 : 1;
        for (int i = 0; i < n; i++) cout << (i % 2 == ones ? 1 : a[i]) << ' ';
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'ternary'],
    },
    {
      id: 'powers',
      kind: 'alt',
      title: L('Round down to a power of two', 'দুইয়ের ঘাতে নিচে নামানো'),
      idea: L('bᵢ = highest power of two ≤ aᵢ.', 'bᵢ = aᵢ-এর সমান বা ছোট সবচেয়ে বড় দুইয়ের ঘাত।'),
      explain: [L('Powers of two always divide each other. And aᵢ − 2^⌊log aᵢ⌋ < aᵢ / 2, so 2 · Σ|aᵢ − bᵢ| < S. Each element is fixed on its own, without looking at neighbours.', 'দুইয়ের ঘাত সবসময় একে অপরকে ভাগ করে। আর aᵢ − ২^⌊log aᵢ⌋ < aᵢ / ২, তাই ২ · Σ|aᵢ − bᵢ| < S। প্রতিবেশী না দেখেই প্রতিটি উপাদান আলাদাভাবে ঠিক হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        for (int i = 0; i < n; i++) {
            long long a;
            cin >> a;
            cout << (1LL << __lg(a)) << ' ';
        }
        cout << "\n";
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
  tests: [{ input: '4\n5\n1 2 3 4 5\n2\n4 6\n2\n1 1000000000\n6\n3 4 8 1 2 3', output: '3 3 3 3 3\n3 6\n1 1000000000\n4 4 8 1 3 3', source: 'sample', note: sample(1) }],
  pitfalls: [L('Setting every element to 1, which can cost almost 2S.', 'প্রতিটি উপাদান ১ করা, যার খরচ প্রায় ২S হতে পারে।')],
  related: [{ id: '1335B', name: 'Construct the String', why: L('Alternating constructions.', 'পালাক্রমের গঠন।') }],
  toolkit: ['bit-shift'],
};

export const p1220C: ProblemEntry = {
  id: '1220C',
  contestId: 1220,
  index: 'C',
  name: 'Substring Game in the Lesson',
  rating: 1300,
  tags: ['games', 'greedy', 'strings'],
  why: L('A game where the first move decides everything: if a smaller letter exists to the left, Ann jumps there and Mike is stuck.', 'একটি গেম যেখানে প্রথম চালেই সব ঠিক হয়: বামে ছোট অক্ষর থাকলে অ্যান সেখানে লাফ দেয় আর মাইক আটকে যায়।'),
  statement: L(
    'For each k, the game starts with the substring s[k..k]. Ann moves first; a move replaces the current s[l..r] by some s[l′..r′] with l′ ≤ l, r′ ≥ r that is lexicographically smaller. The player who cannot move loses. For each k print the winner.',
    'প্রতিটি k-এর জন্য গেম s[k..k] সাবস্ট্রিং দিয়ে শুরু হয়। অ্যান আগে চালে; এক চালে বর্তমান s[l..r]-কে এমন s[l′..r′] দিয়ে বদলানো হয় যেখানে l′ ≤ l, r′ ≥ r আর এটি অভিধানক্রমে ছোট। যে চাল দিতে পারে না সে হারে। প্রতিটি k-এর বিজয়ী প্রিন্ট করুন।',
  ),
  input: L('The string s.', 'স্ট্রিং s।'),
  output: L('|s| lines: Mike or Ann.', '|s|-টি লাইন: Mike অথবা Ann।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|s| ≤ 5·10⁵', '|s| ≤ ৫·১০⁵')] },
  samples: [
    { input: 'abba', output: 'Mike\nAnn\nAnn\nMike', explain: L('k = 2 (b): Ann moves to “ab”, which starts with the smallest letter so far, and Mike cannot move.', 'k = ২ (b): অ্যান “ab”-তে যায়, যা এ পর্যন্ত সবচেয়ে ছোট অক্ষর দিয়ে শুরু, আর মাইক চাল দিতে পারে না।') },
    { input: 'cba', output: 'Mike\nMike\nMike', explain: L('No smaller letter ever appears to the left.', 'বামে কখনো ছোট অক্ষর আসে না।') },
  ],
  observation: L('A smaller substring must start with a letter ≤ s[k]; extending right only makes it larger, so it must start with a strictly smaller letter to the left. If one exists, Ann moves to s[j..k] where s[j] is the minimum of the prefix: no letter smaller than s[j] exists further left, so Mike is stuck. If none exists, Ann is stuck immediately.', 'একটি ছোট সাবস্ট্রিং s[k]-এর সমান বা ছোট অক্ষরে শুরু হতে হবে; ডানে বাড়ালে শুধু বড় হয়, তাই বামে কঠোরভাবে ছোট একটি অক্ষরে শুরু হতে হবে। এমন থাকলে অ্যান s[j..k]-তে যায় যেখানে s[j] প্রিফিক্সের সর্বনিম্ন: আরও বামে s[j]-এর ছোট কোনো অক্ষর নেই, তাই মাইক আটকে যায়। না থাকলে অ্যান সঙ্গে সঙ্গে আটকে যায়।'),
  approach: [L('Keep the prefix minimum; Ann wins at k iff it is smaller than s[k].', 'প্রিফিক্সের সর্বনিম্ন রাখুন; k-তে অ্যান জেতে ঠিক তখনই যখন সেটি s[k]-এর ছোট।')],
  walkthrough: { input: 'abba', steps: [{ state: 'prefix min a, a, a, a', text: L('k = 0: a not smaller → Mike; b, b → Ann; a → Mike.', 'k = ০: a ছোট নয় → Mike; b, b → Ann; a → Mike।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'prefix-min',
      kind: 'optimal',
      title: L('Prefix minimum', 'প্রিফিক্সের সর্বনিম্ন'),
      idea: L('Ann iff min(s[0..k−1]) < s[k].', 'min(s[০..k−১]) < s[k] হলেই Ann।'),
      explain: [L('The game never lasts more than one move under optimal play. Many CF game problems collapse like this once you show the first player can reach a dead position immediately.', 'সেরা খেলায় গেমটি কখনো এক চালের বেশি চলে না। প্রথম খেলোয়াড় সঙ্গে সঙ্গে একটি মৃত অবস্থানে পৌঁছাতে পারে দেখালে CF-এর অনেক গেম প্রবলেম এভাবে ভেঙে পড়ে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    cin >> s;
    char lo = 'z' + 1;
    string out;
    for (char ch : s) {
        out += lo < ch ? "Ann\n" : "Mike\n";
        lo = min(lo, ch);
    }
    cout << out;
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['min-max', 'io-fast'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Game search over substrings', 'সাবস্ট্রিংয়ের ওপর গেম খোঁজ'),
      idea: L('win(l, r) = some smaller enclosing substring is a losing position.', 'win(l, r) = কোনো ছোট ঘেরা সাবস্ট্রিং একটি হারানো অবস্থান।'),
      explain: [L('Every move makes the substring lexicographically smaller, so the recursion terminates. O(n⁴) states-and-moves with string comparisons: tiny strings only, but it follows the rules exactly.', 'প্রতিটি চাল সাবস্ট্রিংকে অভিধানক্রমে ছোট করে, তাই রিকার্শন থামে। স্ট্রিং তুলনাসহ O(n⁴) অবস্থা-আর-চাল: শুধু ক্ষুদ্র স্ট্রিং, কিন্তু নিয়ম হুবহু মানে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

string s;
int n;
map<pair<int, int>, bool> memo;

bool win(int l, int r) {
    auto it = memo.find({l, r});
    if (it != memo.end()) return it->second;
    string cur = s.substr(l, r - l + 1);
    bool w = false;
    for (int a = 0; a <= l && !w; a++)
        for (int b = r; b < n && !w; b++)
            if (s.substr(a, b - a + 1) < cur && !win(a, b)) w = true;
    return memo[{l, r}] = w;
}

int main() {
    cin >> s;
    n = s.size();
    if (n > 30) { cout << "\n"; return 0; }
    for (int k = 0; k < n; k++) cout << (win(k, k) ? "Ann" : "Mike") << "\n";
    return 0;
}
`,
      time: 'O(n⁵)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['map', 'functions'],
    },
  ],
  tests: [
    { input: 'abba', output: 'Mike\nAnn\nAnn\nMike', source: 'sample', note: sample(1) },
    { input: 'cba', output: 'Mike\nMike\nMike', source: 'sample', note: sample(2) },
    { input: 'a', output: 'Mike', source: 'own', note: L('Single letter.', 'একটি অক্ষর।') },
  ],
  pitfalls: [L('Comparing with s[k − 1] only instead of the whole prefix.', 'পুরো প্রিফিক্সের বদলে শুধু s[k − ১]-এর সঙ্গে তুলনা।'), L('Slow output for 5·10⁵ lines.', '৫·১০⁵ লাইনে ধীর আউটপুট।')],
  related: [{ id: '1899A', name: 'Game with Integers', why: L('One-move games.', 'এক চালের গেম।') }],
  toolkit: ['min-max'],
};

export const p1104B: ProblemEntry = {
  id: '1104B',
  contestId: 1104,
  index: 'B',
  name: 'Game with string',
  rating: 1200,
  tags: ['data-structures', 'implementation', 'math'],
  why: L('The number of removals does not depend on the order, and a stack counts them.', 'সরানোর সংখ্যা ক্রমের ওপর নির্ভর করে না, আর একটি স্ট্যাক সেগুলো গোনে।'),
  statement: L('Two players alternately delete two equal adjacent letters from a string. The player who cannot move loses. Does the first player win (Yes / No)?', 'দুজন খেলোয়াড় পালা করে একটি স্ট্রিং থেকে দুটি সমান পাশাপাশি অক্ষর মোছে। যে চাল দিতে পারে না সে হারে। প্রথম খেলোয়াড় কি জেতে (Yes / No)?'),
  input: L('The string s.', 'স্ট্রিং s।'),
  output: L('Yes or No.', 'Yes অথবা No।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 10⁵', '|s| ≤ ১০⁵')] },
  samples: [
    { input: 'abacaba', output: 'No', explain: L('No move at all.', 'কোনো চালই নেই।') },
    { input: 'iiq', output: 'Yes', explain: L('One removal.', 'একটি সরানো।') },
    { input: 'abba', output: 'No', explain: L('bb, then aa: two removals.', 'bb, তারপর aa: দুটি সরানো।') },
  ],
  observation: L('Removing adjacent equal pairs until none remain always ends in the same reduced string, whatever the order (like cancelling brackets). So the total number of moves is fixed, and the first player wins iff it is odd.', 'কোনোটি না থাকা পর্যন্ত পাশাপাশি সমান জোড়া সরালে ক্রম যা-ই হোক সবসময় একই সংক্ষিপ্ত স্ট্রিংয়ে শেষ হয় (বন্ধনী বাতিলের মতো)। তাই মোট চালের সংখ্যা নির্দিষ্ট, আর এটি বিজোড় হলেই প্রথম খেলোয়াড় জেতে।'),
  approach: [L('Push characters on a stack; when the top equals the new one, pop and count a removal.', 'অক্ষরগুলো স্ট্যাকে রাখুন; উপরেরটি নতুনটির সমান হলে পপ করে একটি সরানো গুনুন।')],
  walkthrough: { input: 'abba', steps: [{ state: 'a | ab | a (pop b) | (pop a)', text: L('2 removals: No.', '২টি সরানো: No।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Each character pushed and popped once.', 'প্রতিটি অক্ষর একবার পুশ আর পপ।') },
  solutions: [
    {
      id: 'stack',
      kind: 'optimal',
      title: L('Stack reduction', 'স্ট্যাক সংক্ষেপণ'),
      idea: L('A string used as a stack.', 'স্ট্যাক হিসেবে একটি স্ট্রিং।'),
      explain: [L('std::string has push_back, back and pop_back, so it works as a stack of characters without a separate container.', 'std::string-এর push_back, back আর pop_back আছে, তাই আলাদা কন্টেইনার ছাড়াই এটি অক্ষরের স্ট্যাক হিসেবে চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, st;
    cin >> s;
    int moves = 0;
    for (char ch : s) {
        if (!st.empty() && st.back() == ch) { st.pop_back(); moves++; }
        else st.push_back(ch);
    }
    cout << (moves % 2 ? "Yes" : "No") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Full game search', 'পূর্ণ গেম খোঁজ'),
      idea: L('win(s) = some deletion leads to a losing string.', 'win(s) = কোনো মোছা একটি হারানো স্ট্রিংয়ে নেয়।'),
      explain: [L('It does not assume the order-independence claim, so agreement on random strings is real evidence for it.', 'এটি ক্রম-স্বাধীনতার দাবি ধরে নেয় না, তাই এলোমেলো স্ট্রিংয়ে মিলে যাওয়া দাবিটির আসল প্রমাণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<string, bool> memo;

bool win(const string& s) {
    auto it = memo.find(s);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (size_t i = 0; i + 1 < s.size() && !w; i++)
        if (s[i] == s[i + 1] && !win(s.substr(0, i) + s.substr(i + 2))) w = true;
    return memo[s] = w;
}

int main() {
    string s;
    cin >> s;
    if (s.size() > 16) { cout << "\n"; return 0; }
    cout << (win(s) ? "Yes" : "No") << "\n";
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
    { input: 'abacaba', output: 'No', source: 'sample', note: sample(1) },
    { input: 'iiq', output: 'Yes', source: 'sample', note: sample(2) },
    { input: 'abba', output: 'No', source: 'sample', note: sample(3) },
    { input: 'aaa', output: 'Yes', source: 'own', note: L('Only one pair can go.', 'শুধু একটি জোড়া যেতে পারে।') },
  ],
  pitfalls: [L('Counting adjacent equal pairs in the original string only.', 'শুধু মূল স্ট্রিংয়ের পাশাপাশি সমান জোড়া গোনা।')],
  related: [{ id: '1220C', name: 'Substring Game in the Lesson', why: L('String games.', 'স্ট্রিং গেম।') }],
  toolkit: ['stack-queue'],
};

export const p1396B: ProblemEntry = {
  id: '1396B',
  contestId: 1396,
  index: 'B',
  name: 'Stoned Game',
  rating: 1800,
  tags: ['brute-force', 'constructive', 'games', 'greedy'],
  why: L('A dominant pile wins outright; otherwise the game always runs to the end, so only the parity of the total matters.', 'একটি প্রভাবশালী স্তূপ সরাসরি জেতে; নইলে গেম সবসময় শেষ পর্যন্ত চলে, তাই শুধু মোটের জোড়-বিজোড় গুরুত্বপূর্ণ।'),
  statement: L(
    'n piles of stones. T and HL alternate, T first. A move removes one stone from any non-empty pile except the pile chosen in the previous turn (by the other player). The player who cannot move loses. Who wins? There are t test cases.',
    'n-টি পাথরের স্তূপ। T আর HL পালা করে, T আগে। এক চালে যেকোনো খালি নয় এমন স্তূপ থেকে একটি পাথর সরানো হয়, শুধু আগের পালায় (অন্য খেলোয়াড়ের) বাছা স্তূপটি ছাড়া। যে চাল দিতে পারে না সে হারে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n and the pile sizes.', 't; প্রতিটি টেস্টে n আর স্তূপের আকার।'),
  output: L('T or HL.', 'T অথবা HL।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 100, aᵢ ≤ 100', 'n ≤ ১০০, aᵢ ≤ ১০০')] },
  samples: [{ input: '2\n1\n2\n2\n1 1', output: 'T\nHL', explain: L('1 1: T takes one pile, HL takes the other, T is blocked.', '১ ১: T একটি স্তূপ নেয়, HL অন্যটি, T আটকে যায়।') }],
  observation: L('If the largest pile exceeds the sum of all others, T keeps taking from it; HL runs out of other stones first. Otherwise both players can always keep every pile at most half of the total, so the game uses all S stones: T wins iff S is odd.', 'সবচেয়ে বড় স্তূপ বাকি সবার যোগফলের চেয়ে বেশি হলে T বারবার সেটি থেকে নেয়; HL-এর অন্য পাথর আগে ফুরায়। নইলে দুজনেই সবসময় প্রতিটি স্তূপকে মোটের অর্ধেক বা কম রাখতে পারে, তাই গেম সব S-টি পাথর ব্যবহার করে: S বিজোড় হলেই T জেতে।'),
  approach: [L('T if max > S − max or S is odd, else HL.', 'max > S − max বা S বিজোড় হলে T, নইলে HL।')],
  walkthrough: { input: '1 1', steps: [{ state: 'max 1 = rest 1, S = 2 even', text: L('HL.', 'HL।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Sum and max.', 'যোগফল আর max।') },
  solutions: [
    {
      id: 'rule',
      kind: 'optimal',
      title: L('Dominant pile or parity', 'প্রভাবশালী স্তূপ বা জোড়-বিজোড়'),
      idea: L('Two cases, one line.', 'দুটি ক্ষেত্র, এক লাইন।'),
      explain: [L('The strategy without a dominant pile: always take from the largest allowed pile. That keeps the maximum from ever exceeding the rest, so nobody gets stuck early.', 'প্রভাবশালী স্তূপ না থাকলে কৌশল: সবসময় অনুমোদিত সবচেয়ে বড় স্তূপ থেকে নাও। এতে সর্বোচ্চ কখনো বাকিদের ছাড়ায় না, তাই কেউ আগে আটকায় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int sum = 0, mx = 0;
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            sum += a;
            mx = max(mx, a);
        }
        cout << (mx > sum - mx || sum % 2 ? "T" : "HL") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max', 'modulo'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Memoised game search', 'মেমোসহ গেম খোঁজ'),
      idea: L('State = pile sizes + the pile that is blocked.', 'অবস্থা = স্তূপের আকার + আটকে থাকা স্তূপ।'),
      explain: [L('The “previous pile” is part of the state, which is what makes this game unusual. Small inputs only.', '“আগের স্তূপ” অবস্থার অংশ, যা এই গেমকে অস্বাভাবিক করে। শুধু ছোট ইনপুট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<pair<vector<int>, int>, bool> memo;

bool win(vector<int>& a, int blocked) {
    auto key = make_pair(a, blocked);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (int i = 0; i < (int)a.size() && !w; i++) {
        if (i == blocked || a[i] == 0) continue;
        a[i]--;
        if (!win(a, i)) w = true;
        a[i]++;
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
        int sum = 0;
        for (auto& x : a) { cin >> x; sum += x; }
        if (sum > 14) { cout << "\n"; continue; }
        cout << (win(a, -1) ? "T" : "HL") << "\n";
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
    { input: '2\n1\n2\n2\n1 1', output: 'T\nHL', source: 'sample', note: sample(1) },
    { input: '2\n3\n2 2 2\n2\n5 1', output: 'HL\nT', source: 'own', note: L('Balanced even total; then a dominant pile.', 'সুষম জোড় মোট; তারপর একটি প্রভাবশালী স্তূপ।') },
  ],
  pitfalls: [L('Ignoring the dominant-pile case.', 'প্রভাবশালী-স্তূপের ক্ষেত্র উপেক্ষা।')],
  related: [{ id: '1382B', name: 'Sequential Nim', why: L('Stone-removal games.', 'পাথর সরানোর গেম।') }],
  toolkit: ['min-max'],
};

export const p1365A: ProblemEntry = {
  id: '1365A',
  contestId: 1365,
  index: 'A',
  name: 'Matrix Game',
  rating: 1100,
  tags: ['games', 'greedy', 'implementation'],
  why: L('The game is just counting moves: each claim uses one free row and one free column.', 'গেমটি শুধু চাল গোনা: প্রতিটি দাবি একটি মুক্ত সারি আর একটি মুক্ত কলাম খরচ করে।'),
  statement: L(
    'An n × m matrix of 0s and 1s (1 = claimed). Ashish and Vivek alternate, Ashish first. A move claims a 0-cell whose row and column contain no claimed cell. The player who cannot move loses. Who wins? There are t test cases.',
    '০ আর ১-এর একটি n × m ম্যাট্রিক্স (১ = দাবিকৃত)। আশিশ আর বিবেক পালা করে, আশিশ আগে। এক চালে এমন একটি ০-ঘর দাবি করা হয় যার সারি আর কলামে কোনো দাবিকৃত ঘর নেই। যে চাল দিতে পারে না সে হারে। কে জেতে? t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n m and the matrix.', 't; প্রতিটি টেস্টে n m আর ম্যাট্রিক্স।'),
  output: L('Ashish or Vivek.', 'Ashish অথবা Vivek।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, m ≤ 50', 'n, m ≤ ৫০')] },
  samples: [{ input: '4\n2 2\n0 0\n0 0\n2 2\n0 0\n0 1\n2 3\n1 0 1\n1 1 0\n3 3\n1 0 0\n0 0 0\n1 0 0', output: 'Vivek\nAshish\nVivek\nAshish', explain: L('Fourth test: one free row and two free columns, so exactly one move.', 'চতুর্থ টেস্ট: একটি মুক্ত সারি আর দুটি মুক্ত কলাম, তাই ঠিক একটি চাল।') }],
  observation: L('A move needs a fully empty row and a fully empty column, and it destroys exactly one of each. Any free row and free column cross at a free cell, so moves are possible exactly while both kinds remain: the game lasts min(freeRows, freeCols) moves. Ashish wins iff that is odd.', 'একটি চালে একটি সম্পূর্ণ খালি সারি আর একটি সম্পূর্ণ খালি কলাম লাগে, আর এটি প্রতিটির ঠিক একটি নষ্ট করে। যেকোনো মুক্ত সারি আর মুক্ত কলাম একটি মুক্ত ঘরে মেলে, তাই দুধরনেরই বাকি থাকলে চাল সম্ভব: গেমটি min(মুক্ত সারি, মুক্ত কলাম) চাল চলে। এটি বিজোড় হলেই আশিশ জেতে।'),
  approach: [L('Count empty rows and columns, take the minimum, check parity.', 'খালি সারি আর কলাম গুনে সর্বনিম্নটি নিয়ে জোড়-বিজোড় দেখুন।')],
  walkthrough: { input: 'test 2', steps: [{ state: 'free rows {1}, free cols {1}', text: L('1 move: Ashish.', '১টি চাল: Ashish।') }] },
  complexity: { time: 'O(n · m)', space: 'O(n + m)', why: L('Read the matrix once.', 'ম্যাট্রিক্স একবার পড়া।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('min(free rows, free columns)', 'min(মুক্ত সারি, মুক্ত কলাম)'),
      idea: L('Fixed game length, so only parity matters.', 'গেমের দৈর্ঘ্য নির্দিষ্ট, তাই শুধু জোড়-বিজোড় গুরুত্বপূর্ণ।'),
      explain: [L('Whenever every possible play lasts the same number of moves, the winner is decided by parity alone and strategy is irrelevant.', 'যখনই প্রতিটি সম্ভাব্য খেলা একই সংখ্যক চাল চলে, বিজয়ী শুধু জোড়-বিজোড়ে ঠিক হয় আর কৌশল অপ্রাসঙ্গিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<bool> rowUsed(n, false), colUsed(m, false);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                int x;
                cin >> x;
                if (x) rowUsed[i] = colUsed[j] = true;
            }
        int fr = count(rowUsed.begin(), rowUsed.end(), false);
        int fc = count(colUsed.begin(), colUsed.end(), false);
        cout << (min(fr, fc) % 2 ? "Ashish" : "Vivek") << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n + m)',
      accepted: true,
      toolkit: ['count-find', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Game search over claimed cells', 'দাবিকৃত ঘরের ওপর গেম খোঁজ'),
      idea: L('Bitmask of claimed cells; win(mask) = some legal claim leads to a losing mask.', 'দাবিকৃত ঘরের বিটমাস্ক; win(mask) = কোনো বৈধ দাবি একটি হারানো মাস্কে নেয়।'),
      explain: [L('Up to 16 cells fit in one int mask. Tiny boards only, but nothing is assumed about the structure of the game.', '১৬টি পর্যন্ত ঘর একটি int মাস্কে আঁটে। শুধু ক্ষুদ্র বোর্ড, কিন্তু গেমের কাঠামো নিয়ে কিছু ধরে নেওয়া হয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m;
map<int, bool> memo;

bool win(int mask) {
    auto it = memo.find(mask);
    if (it != memo.end()) return it->second;
    bool w = false;
    for (int i = 0; i < n && !w; i++)
        for (int j = 0; j < m && !w; j++) {
            bool ok = true;
            for (int k = 0; k < m; k++) if (mask >> (i * m + k) & 1) ok = false;
            for (int k = 0; k < n; k++) if (mask >> (k * m + j) & 1) ok = false;
            if (ok && !win(mask | 1 << (i * m + j))) w = true;
        }
    return memo[mask] = w;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cin >> n >> m;
        int mask = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                int x;
                cin >> x;
                if (x && i * m + j < 30) mask |= 1 << (i * m + j);
            }
        if (n * m > 16) { cout << "\n"; continue; }
        memo.clear();
        cout << (win(mask) ? "Ashish" : "Vivek") << "\n";
    }
    return 0;
}
`,
      time: 'exponential',
      space: 'exponential',
      accepted: false,
      toolkit: ['bit-shift', 'map'],
    },
  ],
  tests: [
    { input: '4\n2 2\n0 0\n0 0\n2 2\n0 0\n0 1\n2 3\n1 0 1\n1 1 0\n3 3\n1 0 0\n0 0 0\n1 0 0', output: 'Vivek\nAshish\nVivek\nAshish', source: 'sample', note: sample(1) },
    { input: '1\n1 1\n0', output: 'Ashish', source: 'own', note: L('One free cell.', 'একটি মুক্ত ঘর।') },
  ],
  pitfalls: [L('Counting free cells instead of free rows and columns.', 'মুক্ত সারি আর কলামের বদলে মুক্ত ঘর গোনা।')],
  related: [{ id: '1858A', name: 'Buttons', why: L('Parity of a fixed game length.', 'নির্দিষ্ট গেম দৈর্ঘ্যের জোড়-বিজোড়।') }],
  toolkit: ['count-find'],
};
