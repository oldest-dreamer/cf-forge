import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 1407C
export const p1407C: ProblemEntry = {
  id: '1407C',
  contestId: 1407,
  index: 'C',
  name: 'Chocolate Bunny',
  rating: 1600,
  interactive: true,
  tags: ['constructive', 'interactive', 'math', 'two-pointers'],
  why: L(
    'One remainder answer is ambiguous, but a pair of them (a mod b and b mod a) always reveals the smaller number. Chaining that into a single pass recovers a whole permutation with 2(n − 1) questions.',
    'একটি ভাগশেষের উত্তর দ্ব্যর্থক, কিন্তু একজোড়া (a mod b আর b mod a) সবসময় ছোট সংখ্যাটি দেখিয়ে দেয়। এটিকে একটি পাসে জুড়ে ২(n − ১) প্রশ্নে পুরো পারমুটেশন উদ্ধার হয়।',
  ),
  statement: L(
    'The judge hides a permutation p of 1 … n. A question "? i j" (i ≠ j) is answered with p_i mod p_j. You may ask at most 2n questions. Print the permutation as "! p_1 … p_n".',
    'জাজ ১ … n-এর একটি পারমুটেশন p লুকিয়েছে। প্রশ্ন "? i j" (i ≠ j)-এর উত্তর p_i mod p_j। সর্বোচ্চ ২n টি প্রশ্ন করতে পারো। পারমুটেশনটি "! p_1 … p_n" হিসেবে প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, one integer: the remainder.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: ভাগশেষ।'),
  output: L('Questions "? i j", then "! p_1 … p_n". Flush after every line.', 'প্রশ্ন "? i j", শেষে "! p_1 … p_n"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁴, at most 2n questions', '৩ ≤ n ≤ ১০⁴, সর্বোচ্চ ২n প্রশ্ন')] },
  samples: [
    {
      input: '4\n3 1 4 2',
      output: 'OK',
      transcript: '< 4\n> ? 1 2\n< 0\n> ? 2 1\n< 1\n> ? 1 3\n< 3\n> ? 3 1\n< 1\n> ? 3 4\n< 0\n> ? 4 3\n< 2\n> ! 3 1 4 2',
      explain: L('Compare position 1 with position 2: the answers 0 and 1 show that p_2 = 1 is the smaller one. Position 1 against 3: the answers 3 and 1 show p_1 = 3 is the smaller one, so position 3 becomes the new candidate for the maximum. Position 3 against 4: p_4 = 2 is smaller. The last candidate, position 3, must hold 4. ' + made.en, '১ নম্বরের সঙ্গে ২ নম্বর তুলনা: উত্তর ০ আর ১ দেখায় ছোটটি p_2 = ১। ১ বনাম ৩: উত্তর ৩ আর ১ দেখায় ছোটটি p_1 = ৩, তাই ৩ নম্বর হয় সর্বোচ্চের নতুন প্রার্থী। ৩ বনাম ৪: ছোটটি p_4 = ২। শেষ প্রার্থী ৩ নম্বরে অবশ্যই ৪। ' + made.bn),
    },
  ],
  observation: L(
    'For two different numbers a < b: a mod b = a, while b mod a < a. So of the two answers p_i mod p_j and p_j mod p_i, the larger one is exactly the smaller number, and it belongs to the position that was on the left of "mod" in that answer. Asking both orders always reveals one of the two values.',
    'দুটি ভিন্ন সংখ্যা a < b-এর জন্য: a mod b = a, কিন্তু b mod a < a। তাই p_i mod p_j আর p_j mod p_i এই দুই উত্তরের বড়টিই ছোট সংখ্যা, আর সেটি ওই উত্তরে "mod"-এর বাঁ দিকে থাকা অবস্থানের। দুই ক্রমে জিজ্ঞেস করলে সবসময় দুটির একটির মান পাওয়া যায়।',
  ),
  approach: [
    L('Keep a candidate position cur for "the largest so far". Start with cur = 1.', '"এ পর্যন্ত সবচেয়ে বড়"-র প্রার্থী অবস্থান cur রাখো। শুরুতে cur = ১।'),
    L('For i = 2 … n ask (cur, i) and (i, cur). If the first answer is larger, p_cur equals it (cur was smaller) and i becomes the candidate; otherwise p_i equals the second answer.', 'i = ২ … n-এর জন্য (cur, i) আর (i, cur) জিজ্ঞেস করো। প্রথম উত্তর বড় হলে p_cur সেটির সমান (cur ছোট ছিল) আর i প্রার্থী হয়; নয়তো p_i দ্বিতীয় উত্তরের সমান।'),
    L('Every position but the last candidate has a value. The last candidate is n.', 'শেষ প্রার্থী ছাড়া সব অবস্থানের মান জানা। শেষ প্রার্থীটি n।'),
    L('That is 2(n − 1) questions, inside the budget of 2n.', 'মোট ২(n − ১) প্রশ্ন, ২n-এর বাজেটের মধ্যে।'),
  ],
  walkthrough: {
    input: '4\n3 1 4 2',
    steps: [
      { state: 'cur = 1, i = 2: (0, 1)', text: L('The second answer is larger, so p_2 = 1 and cur stays 1.', 'দ্বিতীয় উত্তর বড়, তাই p_২ = ১ আর cur ১-ই থাকে।') },
      { state: 'cur = 1, i = 3: (3, 1)', text: L('The first answer is larger, so p_1 = 3 and cur moves to 3.', 'প্রথম উত্তর বড়, তাই p_১ = ৩ আর cur ৩-এ যায়।') },
      { state: 'cur = 3, i = 4: (0, 2)', text: L('p_4 = 2. Position 3 is left, so p_3 = 4.', 'p_৪ = ২। ৩ নম্বর বাকি, তাই p_৩ = ৪।') },
    ],
  },
  complexity: { time: 'O(n) questions, O(n) time', space: 'O(n)', why: L('Two questions per position after the first.', 'প্রথমটির পর প্রতি অবস্থানে দুই প্রশ্ন।') },
  solutions: [
    {
      id: 'pair',
      kind: 'optimal',
      title: L('Sweep with a running candidate for the maximum', 'সর্বোচ্চের চলমান প্রার্থী নিয়ে স্ক্যান'),
      idea: L('Two questions per new position reveal the smaller of the two; the larger carries on.', 'প্রতি নতুন অবস্থানে দুই প্রশ্ন ছোটটিকে প্রকাশ করে; বড়টি এগিয়ে চলে।'),
      explain: [L('This is like the tournament for the maximum, except that every match also tells the value of the loser. After n − 1 matches only the winner is left, and it must be n because everything else has been named.', 'এটি সর্বোচ্চের টুর্নামেন্টের মতো, তফাত হলো প্রতিটি ম্যাচ পরাজিতের মানও জানায়। n − ১ ম্যাচের পর শুধু বিজয়ী বাকি, আর সেটি n হতেই হবে কারণ বাকি সবার নাম জানা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int i, int j) {
    cout << "? " << i << " " << j << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    int n;
    cin >> n;
    vector<int> p(n + 1, 0);
    int cur = 1;
    for (int i = 2; i <= n; i++) {
        int a = ask(cur, i);  // p[cur] mod p[i]
        int b = ask(i, cur);  // p[i] mod p[cur]
        if (a > b) {
            p[cur] = a;       // cur is the smaller number
            cur = i;
        } else {
            p[i] = b;
        }
    }
    p[cur] = n;
    cout << "!";
    for (int i = 1; i <= n; i++) cout << " " << p[i];
    cout << endl;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask every ordered pair, then search permutations', 'প্রতিটি ক্রমিক জোড়া জিজ্ঞেস করে পারমুটেশন খোঁজো'),
      idea: L('n(n − 1) questions and a factorial search: only for tiny n.', 'n(n − ১) প্রশ্ন আর ফ্যাক্টোরিয়াল সার্চ: শুধু খুব ছোট n-এর জন্য।'),
      explain: [L('Gather every remainder, then try each permutation until one reproduces the whole table. It is a trustworthy reference on tiny inputs and is useless beyond n of about 9.', 'সব ভাগশেষ জোগাড় করে এমন পারমুটেশন খোঁজো যা পুরো টেবিল মেলায়। ছোট ইনপুটে নির্ভরযোগ্য রেফারেন্স, প্রায় n = ৯-এর পর অকেজো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> m(n, vector<int>(n, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (i != j) {
                cout << "? " << i + 1 << " " << j + 1 << endl;
                cin >> m[i][j];
            }
    vector<int> p(n);
    iota(p.begin(), p.end(), 1);
    do {
        bool ok = true;
        for (int i = 0; i < n && ok; i++)
            for (int j = 0; j < n && ok; j++)
                if (i != j) ok = p[i] % p[j] == m[i][j];
        if (ok) break;
    } while (next_permutation(p.begin(), p.end()));
    cout << "!";
    for (int x : p) cout << " " << x;
    cout << endl;
}
`,
      time: 'n(n − 1) questions',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['io-basics', 'vector'],
    },
  ],
  tests: [
    { input: '3\n1 2 3', output: 'OK', source: 'own', note: L('Sorted.', 'ক্রমানুসারে।') },
    { input: '3\n3 2 1', output: 'OK', source: 'own', note: L('Reversed: every left-hand number is larger.', 'উল্টো: বাঁ দিকের প্রতিটি সংখ্যা বড়।') },
    { input: '5\n5 1 4 2 3', output: 'OK', source: 'own', note: L('The maximum is first, so the candidate never moves.', 'সর্বোচ্চ প্রথমে, তাই প্রার্থী কখনও সরে না।') },
    { input: '6\n2 4 6 1 3 5', output: 'OK', source: 'own', note: L('The candidate moves several times.', 'প্রার্থী কয়েকবার সরে।') },
  ],
  pitfalls: [
    L('Trusting a single remainder: a mod b alone can be a or something smaller, and you cannot tell which.', 'একটিমাত্র ভাগশেষে ভরসা: a mod b একা a বা তার চেয়ে ছোট কিছু হতে পারে, কোনটি তা বোঝা যায় না।'),
    L('Asking (i, i): the judge rejects equal indices.', '(i, i) জিজ্ঞেস করা: জাজ সমান সূচক বাতিল করে।'),
    L('Forgetting to set the last candidate to n, which leaves a 0 in the output.', 'শেষ প্রার্থীকে n না করা, ফলে আউটপুটে ০ থেকে যায়।'),
    L('Using n questions per pair: 2 per position is the whole budget, with nothing spare.', 'প্রতি জোড়ায় বেশি প্রশ্ন: প্রতি অবস্থানে ২ মানেই পুরো বাজেট, বাড়তি কিছু নেই।'),
  ],
  related: [
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Finding a maximum from weaker answers.', 'দুর্বল উত্তর থেকে সর্বোচ্চ খোঁজা।') },
    { id: '727C', name: 'Guess the Array', why: L('Recover n values from about n pair answers.', 'প্রায় n টি জোড়ার উত্তর থেকে n টি মান উদ্ধার।') },
  ],
  toolkit: ['io-basics', 'vector'],
};

// ───────────────────────────────────────────── 1797C
export const p1797C: ProblemEntry = {
  id: '1797C',
  contestId: 1797,
  index: 'C',
  name: 'Li Hua and Chess',
  rating: 1600,
  interactive: true,
  tags: ['constructive', 'greedy', 'interactive'],
  why: L(
    'Three questions find a hidden chess king on a grid. The solution is adaptive: the first answer reduces the candidates to an L-shape, and each next query is chosen to cut that L down to one point.',
    'তিনটি প্রশ্নে গ্রিডে লুকানো দাবার রাজাকে খোঁজা। সমাধানটি অভিযোজিত: প্রথম উত্তর প্রার্থীদের একটি L-আকৃতিতে নামায়, আর পরের প্রশ্ন বেছে নেওয়া হয় সেই L-কে এক বিন্দুতে কাটতে।',
  ),
  statement: L(
    'An n × m board hides one chess king at an unknown cell (x, y). A question "? a b" about any cell is answered with the number of king moves needed to go from (x, y) to (a, b), which is max(|x − a|, |y − b|). Find the king with at most 3 questions and print "! x y".',
    'n × m বোর্ডে অজানা ঘর (x, y)-এ একটি দাবার রাজা লুকানো। যেকোনো ঘরের প্রশ্ন "? a b"-র উত্তর (x, y) থেকে (a, b)-তে যেতে রাজার যত চাল লাগে তা, অর্থাৎ max(|x − a|, |y − b|)। সর্বোচ্চ ৩টি প্রশ্নে রাজাকে খুঁজে "! x y" প্রিন্ট করো।',
  ),
  input: L('First line: n and m. After each question, one integer: the distance.', 'প্রথম লাইনে n আর m। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: দূরত্ব।'),
  output: L('Questions "? a b" (inside the board), then "! x y". Flush after every line.', 'প্রশ্ন "? a b" (বোর্ডের ভেতরে), শেষে "! x y"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n, m ≤ 1000, at most 3 questions', '২ ≤ n, m ≤ ১০০০, সর্বোচ্চ ৩ প্রশ্ন')] },
  samples: [
    {
      input: '4 5 3 2',
      output: 'OK',
      transcript: '< 4 5\n> ? 1 1\n< 2\n> ? 1 3\n< 2\n> ? 3 1\n< 1\n> ! 3 2',
      explain: L('The corner says the king is exactly 2 away: on row 3 or on column 3. The cell (1, 3) is also 2 away from every row-3 cell, so the king is on row 3. A final look from (3, 1) gives the column: distance 1 means column 2. ' + made.en, 'কোণ বলে রাজা ঠিক ২ দূরে: ৩ নম্বর সারিতে বা ৩ নম্বর কলামে। (১, ৩) ঘরটি ৩ নম্বর সারির প্রতিটি ঘর থেকেও ২ দূরে, তাই রাজা ৩ নম্বর সারিতে। (৩, ১) থেকে শেষ দেখায় কলাম মেলে: দূরত্ব ১ মানে কলাম ২। ' + made.bn),
    },
  ],
  observation: L(
    'Ask the corner (1, 1) and get d. Every cell at king distance d from the corner has x = d + 1 (any y ≤ d + 1) or y = d + 1 (any x ≤ d). Now ask (1, d + 1): for a cell (d + 1, y) the distance is exactly d (the row gap is d and the column gap is at most d), but for a cell (x, d + 1) it is x − 1 < d, which names x directly. If the answer is d, the king is on row d + 1 and one more question from (d + 1, 1) reads off y as distance + 1.',
    'কোণ (১, ১) জিজ্ঞেস করে d পাও। কোণ থেকে রাজা-দূরত্ব d এমন প্রতিটি ঘরে x = d + ১ (যেকোনো y ≤ d + ১) অথবা y = d + ১ (যেকোনো x ≤ d)। এবার (১, d + ১) জিজ্ঞেস করো: ঘর (d + ১, y)-এর জন্য দূরত্ব ঠিক d (সারির ফাঁক d, কলামের ফাঁক ≤ d), কিন্তু ঘর (x, d + ১)-এর জন্য এটি x − ১ < d, যা সরাসরি x দেয়। উত্তর d হলে রাজা d + ১ নম্বর সারিতে, আর (d + ১, ১) থেকে আরেক প্রশ্নে দূরত্ব + ১ = y।',
  ),
  approach: [
    L('Ask (1, 1) and get d. If d = 0 the king is at (1, 1).', '(১, ১) জিজ্ঞেস করে d পাও। d = ০ হলে রাজা (১, ১)-এ।'),
    L('If d + 1 > n, the king must be in column d + 1: ask (1, d + 1), the distance e gives x = e + 1. If d + 1 > m, the king is on row d + 1: ask (d + 1, 1), the distance e gives y = e + 1.', 'd + ১ > n হলে রাজা d + ১ নম্বর কলামে: (১, d + ১) জিজ্ঞেস করলে দূরত্ব e থেকে x = e + ১। d + ১ > m হলে রাজা d + ১ নম্বর সারিতে: (d + ১, ১) জিজ্ঞেস করলে দূরত্ব e থেকে y = e + ১।'),
    L('Otherwise ask (1, d + 1). If the answer e < d, print (e + 1, d + 1). If e = d, the king is on row d + 1: ask (d + 1, 1) and print (d + 1, e′ + 1).', 'নয়তো (১, d + ১) জিজ্ঞেস করো। উত্তর e < d হলে (e + ১, d + ১) প্রিন্ট করো। e = d হলে রাজা d + ১ নম্বর সারিতে: (d + ১, ১) জিজ্ঞেস করে (d + ১, e′ + ১) প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '4 5 3 2',
    steps: [
      { state: '(1, 1) → d = 2', text: L('The king is on row 3 or on column 3.', 'রাজা ৩ নম্বর সারিতে বা ৩ নম্বর কলামে।') },
      { state: '(1, 3) → 2 = d', text: L('A column-3 king would be closer than 2 (its row minus 1, at most 1), so the king is on row 3.', 'কলাম ৩-এর রাজা ২-এর চেয়ে কাছে হতো (সারি − ১, সর্বোচ্চ ১), তাই রাজা ৩ নম্বর সারিতে।') },
      { state: '(3, 1) → 1', text: L('Same row, so the distance is the column gap: y = 2.', 'একই সারি, তাই দূরত্ব কলামের ফাঁক: y = ২।') },
    ],
  },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('Three questions at most.', 'সর্বোচ্চ তিনটি প্রশ্ন।') },
  solutions: [
    {
      id: 'adaptive',
      kind: 'optimal',
      title: L('Corner, then a probe that tells row from column', 'কোণ, তারপর সারি-কলাম আলাদা করার প্রোব'),
      idea: L('Use the answer to decide where the next question goes.', 'উত্তর দেখে পরের প্রশ্ন কোথায় হবে তা ঠিক করো।'),
      explain: [L('The probe at (1, d + 1) is chosen so that the two candidate families give different answers (d versus less than d). That is the general trick in adaptive search: pick the query that splits the candidates into groups with distinguishable answers.', '(১, d + ১)-এর প্রোব এমনভাবে বাছা যাতে দুই প্রার্থী পরিবার ভিন্ন উত্তর দেয় (d বনাম d-এর কম)। অভিযোজিত সার্চের সাধারণ কৌশল: এমন প্রশ্ন বাছো যা প্রার্থীদের আলাদা-করা-যায় এমন উত্তরের দলে ভাগ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int x, int y) {
    cout << "? " << x << " " << y << endl;
    int d;
    cin >> d;
    return d;
}

int main() {
    int n, m;
    cin >> n >> m;
    int d = ask(1, 1);
    int x, y;
    if (d == 0) {
        x = y = 1;
    } else if (d + 1 > n) {
        x = ask(1, d + 1) + 1;  // column d + 1, distance from (1, d + 1) is x - 1
        y = d + 1;
    } else if (d + 1 > m) {
        y = ask(d + 1, 1) + 1;  // row d + 1, distance from (d + 1, 1) is y - 1
        x = d + 1;
    } else {
        int e = ask(1, d + 1);
        if (e < d) {
            x = e + 1;
            y = d + 1;
        } else {
            x = d + 1;
            y = ask(d + 1, 1) + 1;
        }
    }
    cout << "! " << x << " " << y << endl;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Visit cells until the distance is 0', 'দূরত্ব ০ না হওয়া পর্যন্ত ঘরে ঘরে যাও'),
      idea: L('Up to n · m questions: fine for a 3 × 3 board, hopeless for 1000 × 1000.', 'সর্বোচ্চ n · m প্রশ্ন: ৩ × ৩ বোর্ডে চলে, ১০০০ × ১০০০-এ অসম্ভব।'),
      explain: [L('Ask every cell in order and stop at the first 0. It is the reference on tiny boards.', 'ক্রমে প্রতিটি ঘর জিজ্ঞেস করো, প্রথম ০-তে থামো। ছোট বোর্ডে রেফারেন্স।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    for (int x = 1; x <= n; x++)
        for (int y = 1; y <= m; y++) {
            cout << "? " << x << " " << y << endl;
            int d;
            cin >> d;
            if (d == 0) {
                cout << "! " << x << " " << y << endl;
                return 0;
            }
        }
}
`,
      time: 'O(nm) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '2 2 1 1', output: 'OK', source: 'own', note: L('The king in the asking corner.', 'যে কোণ জিজ্ঞেস করা হয় সেখানেই রাজা।') },
    { input: '2 2 2 2', output: 'OK', source: 'own', note: L('The opposite corner.', 'বিপরীত কোণ।') },
    { input: '3 7 3 7', output: 'OK', source: 'own', note: L('d + 1 exceeds n: only the column family exists.', 'd + ১ > n: শুধু কলাম পরিবার আছে।') },
    { input: '7 3 7 3', output: 'OK', source: 'own', note: L('d + 1 exceeds m: only the row family exists.', 'd + ১ > m: শুধু সারি পরিবার আছে।') },
    { input: '10 10 4 9', output: 'OK', source: 'own', note: L('A king in the interior, on column d + 1.', 'ভেতরের একটি রাজা, d + ১ নম্বর কলামে।') },
  ],
  pitfalls: [
    L('Querying a cell outside the board when d + 1 is larger than n or m. Handle those two shapes before the general case.', 'd + ১ n বা m-এর চেয়ে বড় হলে বোর্ডের বাইরের ঘর জিজ্ঞেস করা। সাধারণ ক্ষেত্রের আগে এই দুই আকৃতি সামলাও।'),
    L('Starting from the three fixed corners (1, 1), (1, m), (n, 1): on a 2-row board two different cells give the same three answers.', 'তিনটি স্থির কোণ (১, ১), (১, m), (n, ১) দিয়ে শুরু: দুই সারির বোর্ডে দুটি ভিন্ন ঘর একই তিন উত্তর দেয়।'),
    L('Mixing up x (row) and y (column) in the output order.', 'আউটপুটে x (সারি) আর y (কলাম) গুলিয়ে ফেলা।'),
  ],
  related: [
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Another problem solved by one well-chosen question at a time.', 'আরেকটি সমস্যা, যা ধাপে ধাপে এক সুনির্বাচিত প্রশ্নে সমাধান হয়।') },
    { id: '713B', name: 'Searching Rectangles', why: L('Locate hidden objects on a grid with a handful of questions.', 'কয়েকটি প্রশ্নে গ্রিডে লুকানো বস্তু খোঁজা।') },
  ],
  toolkit: ['io-basics'],
};

// ───────────────────────────────────────────── 1698D
export const p1698D: ProblemEntry = {
  id: '1698D',
  contestId: 1698,
  index: 'D',
  name: 'Fixed Point Guessing',
  rating: 1600,
  interactive: true,
  tags: ['binary-search', 'constructive', 'interactive'],
  why: L(
    'The jury array is built from disjoint swaps, so inside any range the swapped pairs contribute an even count and only the single fixed point can make it odd. Parity turns a counting oracle into a binary-search predicate.',
    'জুরির অ্যারে আলাদা আলাদা সোয়াপ দিয়ে বানানো, তাই যেকোনো পরিসরে সোয়াপ করা জোড়া জোড় সংখ্যা যোগ করে আর কেবল একমাত্র স্থির বিন্দুই এটিকে বিজোড় করতে পারে। জোড়-বিজোড় গণনা-ওরাকলকে বাইনারি সার্চের শর্তে বদলে দেয়।',
  ),
  statement: L(
    'The judge hides an array a of length n (n is odd): start from 1, 2, …, n, then swap the values of (n − 1) / 2 disjoint pairs of positions. Exactly one position x keeps a_x = x. A question "? l r" is answered with the number of positions i in [l, r] whose value a_i is also in [l, r]. Find x with at most 15 questions and print "! x".',
    'জাজ n দৈর্ঘ্যের (n বিজোড়) একটি অ্যারে a লুকিয়েছে: ১, ২, …, n থেকে শুরু করে (n − ১) / ২ টি আলাদা জোড়া অবস্থানের মান বদল করা। ঠিক একটি অবস্থান x-এ a_x = x থেকে যায়। প্রশ্ন "? l r"-এর উত্তর [l, r]-এর ওই অবস্থানের সংখ্যা যাদের মান a_i-ও [l, r]-এ। সর্বোচ্চ ১৫টি প্রশ্নে x বের করে "! x" প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, one integer: the count.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: গণনা।'),
  output: L('Questions "? l r" (l ≤ r), then "! x". Flush after every line.', 'প্রশ্ন "? l r" (l ≤ r), শেষে "! x"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n < 10⁴, n odd, at most 15 questions', '৩ ≤ n < ১০⁴, n বিজোড়, সর্বোচ্চ ১৫ প্রশ্ন')] },
  samples: [
    {
      input: '5\n2 1 3 5 4',
      output: 'OK',
      transcript: '< 5\n> ? 1 3\n< 3\n> ? 1 2\n< 2\n> ! 3',
      explain: L('Positions 1 … 3 hold 2, 1, 3: all three values lie in [1, 3], so the count is odd and the fixed point is among them. Positions 1 … 2 hold 2, 1: count 2, even, so the fixed point is 3. ' + made.en, '১ … ৩ অবস্থানে ২, ১, ৩: তিনটি মানই [১, ৩]-এ, তাই গণনা বিজোড় আর স্থির বিন্দু এদের মধ্যে। ১ … ২-এ ২, ১: গণনা ২, জোড়, তাই স্থির বিন্দু ৩। ' + made.bn),
    },
  ],
  observation: L(
    'Take any range [l, r]. A swapped pair (i, j) with both inside the range adds 2 to the count; a pair with one end inside adds 0 (its value is outside the range, so neither end counts, the inside one because its value is outside and the outside one because it is not in the range). The fixed point adds 1 when it is inside. So the count is odd exactly when the fixed point is inside [l, r].',
    'যেকোনো পরিসর [l, r] নাও। দুই প্রান্তই ভেতরে থাকা সোয়াপ জোড়া গণনায় ২ যোগ করে; এক প্রান্ত বাইরে থাকলে ০ যোগ করে (ভেতরের প্রান্তের মান বাইরে, আর বাইরের প্রান্ত পরিসরেই নেই)। স্থির বিন্দু ভেতরে থাকলে ১ যোগ করে। তাই গণনা বিজোড় ঠিক তখনই যখন স্থির বিন্দু [l, r]-এর ভেতরে।',
  ),
  approach: [
    L('Keep a range [lo, hi] that contains the fixed point; start with [1, n].', 'স্থির বিন্দু ধরে এমন পরিসর [lo, hi] রাখো; শুরুতে [১, n]।'),
    L('Ask the left half [lo, mid]. Odd: hi = mid. Even: lo = mid + 1.', 'বাঁ অর্ধেক [lo, mid] জিজ্ঞেস করো। বিজোড় হলে hi = mid। জোড় হলে lo = mid + ১।'),
    L('When lo = hi that position is the answer: ⌈log₂ n⌉ ≤ 14 questions.', 'lo = hi হলে ওই অবস্থানই উত্তর: ⌈log₂ n⌉ ≤ ১৪ প্রশ্ন।'),
  ],
  walkthrough: {
    input: '5\n2 1 3 5 4',
    steps: [
      { state: '[1, 5], ask [1, 3] → 3', text: L('Odd, so the fixed point is in [1, 3].', 'বিজোড়, তাই স্থির বিন্দু [১, ৩]-এ।') },
      { state: '[1, 3], ask [1, 2] → 2', text: L('Even, so it is not in [1, 2]: it is 3.', 'জোড়, তাই [১, ২]-এ নেই: এটি ৩।') },
    ],
  },
  complexity: { time: 'O(log n) questions', space: 'O(1)', why: L('One question halves the range.', 'এক প্রশ্নে পরিসর অর্ধেক।') },
  solutions: [
    {
      id: 'range',
      kind: 'optimal',
      title: L('Binary search on the parity of [lo, mid]', '[lo, mid]-এর জোড়-বিজোড়ে বাইনারি সার্চ'),
      idea: L('An odd count means the fixed point is in the queried half.', 'বিজোড় গণনা মানে স্থির বিন্দু জিজ্ঞেস করা অর্ধেকে।'),
      explain: [L('The parity argument works for every range, not only prefixes, so the current range can be asked directly and no information from earlier answers has to be carried.', 'জোড়-বিজোড়ের যুক্তি শুধু প্রিফিক্স নয়, প্রতিটি পরিসরে খাটে, তাই বর্তমান পরিসর সরাসরি জিজ্ঞেস করা যায়, আগের উত্তর বয়ে বেড়াতে হয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int lo = 1, hi = n;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        cout << "? " << lo << " " << mid << endl;
        int c;
        cin >> c;
        if (c % 2 == 1) hi = mid;
        else lo = mid + 1;
    }
    cout << "! " << lo << endl;
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'prefix',
      kind: 'method',
      title: L('Binary search on prefixes [1, mid]', 'প্রিফিক্স [১, mid]-এ বাইনারি সার্চ'),
      idea: L('The same parity test, always from position 1.', 'একই জোড়-বিজোড় পরীক্ষা, সবসময় ১ নম্বর থেকে।'),
      explain: [L('Ask [1, mid]: odd means the fixed point is at most mid. This is the classic "first index where a monotone predicate turns true" binary search, which makes the correctness argument one line.', '[১, mid] জিজ্ঞেস করো: বিজোড় মানে স্থির বিন্দু ≤ mid। এটি ক্লাসিক "একঘাত শর্ত প্রথম যেখানে সত্য হয়" বাইনারি সার্চ, তাই সঠিকতার যুক্তি এক লাইনের।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int lo = 1, hi = n;  // answer in [lo, hi]
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        cout << "? 1 " << mid << endl;
        int c;
        cin >> c;
        if (c % 2 == 1) hi = mid;   // fixed point is in [1, mid]
        else lo = mid + 1;
    }
    cout << "! " << lo << endl;
}
`,
      time: 'O(log n) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask each position alone', 'প্রতিটি অবস্থান আলাদা করে জিজ্ঞেস'),
      idea: L('A question on [i, i] answers 1 exactly when a_i = i. n questions.', '[i, i]-এর প্রশ্ন ঠিক তখনই ১ যখন a_i = i। n প্রশ্ন।'),
      explain: [L('The most direct reference: scan until a 1. It needs up to n questions, far beyond 15.', 'সবচেয়ে সরাসরি রেফারেন্স: ১ না পাওয়া পর্যন্ত স্ক্যান। সর্বোচ্চ n প্রশ্ন, ১৫-এর অনেক বেশি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cout << "? " << i << " " << i << endl;
        int c;
        cin >> c;
        if (c == 1) {
            cout << "! " << i << endl;
            return 0;
        }
    }
}
`,
      time: 'n questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '3\n1 3 2', output: 'OK', source: 'own', note: L('Fixed point at the left end.', 'স্থির বিন্দু বাম প্রান্তে।') },
    { input: '3\n2 1 3', output: 'OK', source: 'own', note: L('Fixed point at the right end.', 'স্থির বিন্দু ডান প্রান্তে।') },
    { input: '7\n4 2 6 1 7 3 5', output: 'OK', source: 'own', note: L('A swap pair straddles any split you try.', 'যেকোনো ভাগে একটি সোয়াপ জোড়া মাঝখান দিয়ে যায়।') },
    { input: '9\n9 8 7 6 5 4 3 2 1', output: 'OK', source: 'own', note: L('Every pair is nested around the middle fixed point, so each split has pairs straddling it.', 'প্রতিটি জোড়া মাঝের স্থির বিন্দুকে ঘিরে নেস্টেড, তাই প্রতিটি ভাগে জোড়া মাঝখান দিয়ে যায়।') },
  ],
  pitfalls: [
    L('Counting inside the range only: a pair with one end outside contributes 0, not 1, which is why the parity works.', 'শুধু পরিসরের ভেতরে গোনা: এক প্রান্ত বাইরে থাকা জোড়া ১ নয়, ০ যোগ করে, আর এ কারণেই জোড়-বিজোড় কাজ করে।'),
    L('Using (lo + hi + 1) / 2 with the hi = mid update: that can ask an empty or repeated range and loop forever.', 'hi = mid আপডেটের সাথে (lo + hi + ১) / ২ ব্যবহার: ফাঁকা বা পুনরাবৃত্ত পরিসর জিজ্ঞেস হয়ে অসীম লুপ হতে পারে।'),
    L('Asking more than 15 questions with a non-halving scheme (a scan or a ternary split).', 'অর্ধেক-না-করা পদ্ধতিতে (স্ক্যান বা তিন-ভাগ) ১৫-এর বেশি প্রশ্ন।'),
  ],
  related: [
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Another binary search where the oracle answer is not a plain comparison.', 'আরেকটি বাইনারি সার্চ যেখানে ওরাকলের উত্তর সাধারণ তুলনা নয়।') },
    { id: '1797C', name: 'Li Hua and Chess', why: L('Few questions, each chosen to cut the candidates sharply.', 'কয়েকটি প্রশ্ন, প্রতিটি প্রার্থীকে ধারালোভাবে কাটতে বাছা।') },
  ],
  toolkit: ['io-basics'],
};

// ───────────────────────────────────────────── 1697D
export const p1697D: ProblemEntry = {
  id: '1697D',
  contestId: 1697,
  index: 'D',
  name: 'Guess The String',
  rating: 1900,
  interactive: true,
  tags: ['binary-search', 'constructive', 'interactive'],
  why: L(
    'Two kinds of questions with two different budgets: reading a letter is scarce (26 times), counting distinct letters in a range is plentiful (6000). The solution reads a letter only when a new one first appears and finds repeats by a binary search over "letters ordered by last occurrence".',
    'দুই ধরনের প্রশ্নের দুটি আলাদা বাজেট: অক্ষর পড়া দুর্লভ (২৬ বার), পরিসরে ভিন্ন অক্ষরের সংখ্যা গোনা প্রচুর (৬০০০)। সমাধানটি নতুন অক্ষর প্রথমবার এলেই কেবল সেটি পড়ে, আর পুনরাবৃত্তি খোঁজে "শেষ উপস্থিতি অনুযায়ী সাজানো অক্ষর"-এ বাইনারি সার্চে।',
  ),
  statement: L(
    'The judge hides a string s of n lowercase letters. There are two kinds of questions. "? 1 i" returns the letter s_i; you may ask it at most 26 times. "? 2 l r" returns how many different letters occur in s_l … s_r; you may ask it at most 6000 times. Print the string as "! s".',
    'জাজ n টি ছোট হাতের অক্ষরের একটি স্ট্রিং s লুকিয়েছে। দুই ধরনের প্রশ্ন। "? 1 i" অক্ষর s_i ফেরত দেয়; সর্বোচ্চ ২৬ বার করা যায়। "? 2 l r" s_l … s_r-এ কতটি ভিন্ন অক্ষর আছে তা ফেরত দেয়; সর্বোচ্চ ৬০০০ বার করা যায়। স্ট্রিংটি "! s" হিসেবে প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, the answer: a letter or an integer.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর উত্তর: একটি অক্ষর বা পূর্ণসংখ্যা।'),
  output: L('Questions, then "! s". Flush after every line.', 'প্রশ্ন, শেষে "! s"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000, at most 26 questions of the first kind and 6000 of the second', '১ ≤ n ≤ ১০০০, প্রথম ধরনের সর্বোচ্চ ২৬ আর দ্বিতীয় ধরনের ৬০০০ প্রশ্ন')] },
  samples: [
    {
      input: '5\nabacb',
      output: 'OK',
      transcript: '< 5\n> ? 1 1\n< a\n> ? 2 1 2\n< 2\n> ? 1 2\n< b\n> ? 2 1 3\n< 2\n> ? 2 2 3\n< 2\n> ? 2 1 4\n< 3\n> ? 1 4\n< c\n> ? 2 1 5\n< 3\n> ? 2 3 5\n< 3\n> ! abacb',
      explain: L('Position 2: the number of different letters grows from 1 to 2, so it is new: read it. Position 3: still 2, so it repeats; the range "ba" at positions 2…3 has 2 letters, so s_3 is the second most recent letter (a). Position 4: grows to 3, new: read c. Position 5: still 3; the range 3…5 has 3 letters, so s_5 is the third most recent letter (b). ' + made.en, '২ নম্বর: ভিন্ন অক্ষরের সংখ্যা ১ থেকে ২ হলো, তাই নতুন: পড়ো। ৩ নম্বর: এখনও ২, তাই পুনরাবৃত্তি; ২…৩ পরিসরের "ba"-তে ২টি অক্ষর, তাই s_৩ দ্বিতীয় সবচেয়ে সাম্প্রতিক অক্ষর (a)। ৪ নম্বর: ৩ হলো, নতুন: c পড়ো। ৫ নম্বর: এখনও ৩; ৩…৫ পরিসরে ৩টি অক্ষর, তাই s_৫ তৃতীয় সবচেয়ে সাম্প্রতিক অক্ষর (b)। ' + made.bn),
    },
  ],
  observation: L(
    'Walk left to right with the distinct letters seen so far kept in order of last occurrence, most recent first: l₁, l₂, …, l_c. To find the new character s_i (when it is not new), ask for the number of distinct letters in [last(l_k), i]. The range from last(l_k) to i−1 holds exactly l₁ … l_k, so adding s_i the answer is k if s_i is one of them and k + 1 if not. That answer pattern is monotone in k, so a binary search finds the smallest k with answer k: l_k = s_i.',
    'বাঁ থেকে ডানে হাঁটো, এ পর্যন্ত দেখা ভিন্ন অক্ষরগুলো শেষ উপস্থিতির ক্রমে (সবচেয়ে সাম্প্রতিক আগে) রাখো: l₁, l₂, …, l_c। নতুন নয় এমন s_i খুঁজতে [last(l_k), i]-এ ভিন্ন অক্ষর কত জিজ্ঞেস করো। last(l_k) থেকে i−১ পর্যন্ত ঠিক l₁ … l_k আছে, তাই s_i যোগ করলে উত্তর k যদি s_i এদের একটি হয়, নয়তো k + ১। এই উত্তরের ধরন k-তে একঘাত, তাই বাইনারি সার্চে সবচেয়ে ছোট k যার উত্তর k: l_k = s_i।',
  ),
  approach: [
    L('Read s_1 with a first-kind question.', 'প্রথম ধরনের প্রশ্নে s_1 পড়ো।'),
    L('For each i from 2: ask the distinct count of [1, i]. If it grew, the letter is new: read it with a first-kind question (at most 26 such reads).', 'প্রতিটি i-এর জন্য (২ থেকে): [১, i]-এর ভিন্ন অক্ষর সংখ্যা জিজ্ঞেস করো। বাড়লে অক্ষরটি নতুন: প্রথম ধরনের প্রশ্নে পড়ো (সর্বোচ্চ ২৬ বার)।'),
    L('If it did not grow, binary search the smallest k with distinct([last(l_k), i]) = k; s_i = l_k.', 'না বাড়লে সবচেয়ে ছোট k বাইনারি সার্চে খোঁজো যার distinct([last(l_k), i]) = k; s_i = l_k।'),
    L('Move that letter to the front of the list and set its last position to i. Total at most 1 + ⌈log₂ 26⌉ = 6 second-kind questions per position, 5994 for n = 1000.', 'ওই অক্ষরকে তালিকার সামনে এনে তার শেষ অবস্থান i করো। প্রতি অবস্থানে সর্বোচ্চ ১ + ⌈log₂ ২৬⌉ = ৬টি দ্বিতীয় ধরনের প্রশ্ন, n = ১০০০-এ ৫৯৯৪।'),
  ],
  walkthrough: {
    input: '5\nabacb',
    steps: [
      { state: 'list = [a]', text: L('s_1 = a is read.', 's_১ = a পড়া হলো।') },
      { state: 'i = 3: list = [b, a]', text: L('distinct("ba") = 2 = k for k = 2, but for k = 1 distinct("b a") would be 2 ≠ 1, so k = 2 and s_3 = a.', 'k = ২-এর জন্য distinct("ba") = ২ = k, আর k = ১-এ distinct = ২ ≠ ১, তাই k = ২ আর s_৩ = a।') },
      { state: 'i = 5: list = [c, a, b]', text: L('For k = 2 the range 3…5 has 3 letters ≠ 2, so k = 3: s_5 = b.', 'k = ২-এ ৩…৫ পরিসরে ৩টি অক্ষর ≠ ২, তাই k = ৩: s_৫ = b।') },
    ],
  },
  complexity: { time: 'O(n log 26) questions, O(n) time', space: 'O(n)', why: L('One growth check plus a 5-step binary search per position.', 'প্রতি অবস্থানে একটি বৃদ্ধি-পরীক্ষা আর ৫ ধাপের বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'bs',
      kind: 'optimal',
      title: L('Letters by last occurrence, binary search for repeats', 'শেষ উপস্থিতিতে সাজানো অক্ষর, পুনরাবৃত্তিতে বাইনারি সার্চ'),
      idea: L('Read each new letter once; find every repeat with about log₂ 26 distinct-count questions.', 'প্রতিটি নতুন অক্ষর একবার পড়ো; প্রতিটি পুনরাবৃত্তি প্রায় log₂ ২৬ টি গণনা-প্রশ্নে খোঁজো।'),
      explain: [L('The list order is a move-to-front list: the letter just seen goes to the front. The number of distinct letters of the suffix beginning at a letter\'s last position is exactly its rank in the list, which is what makes the answers monotone.', 'তালিকাটি move-to-front: এইমাত্র দেখা অক্ষর সামনে যায়। কোনো অক্ষরের শেষ অবস্থান থেকে শুরু হওয়া সাফিক্সের ভিন্ন অক্ষর সংখ্যা ঠিক তালিকায় তার র‍্যাঙ্ক, ফলে উত্তরগুলো একঘাত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

char ask1(int i) {
    cout << "? 1 " << i << endl;
    char c;
    cin >> c;
    return c;
}
int ask2(int l, int r) {
    cout << "? 2 " << l << " " << r << endl;
    int d;
    cin >> d;
    return d;
}

int main() {
    int n;
    cin >> n;
    string s(n, '?');
    s[0] = ask1(1);
    vector<char> letter = {s[0]};  // by last occurrence, most recent first
    vector<int> last = {1};
    for (int i = 2; i <= n; i++) {
        int c = (int)letter.size();
        int d = ask2(1, i);
        if (d > c) {
            s[i - 1] = ask1(i);
            letter.insert(letter.begin(), s[i - 1]);
            last.insert(last.begin(), i);
        } else {
            int lo = 1, hi = c;  // smallest k with distinct(last[k], i) == k
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (ask2(last[mid - 1], i) == mid) hi = mid;
                else lo = mid + 1;
            }
            char ch = letter[lo - 1];
            s[i - 1] = ch;
            letter.erase(letter.begin() + lo - 1);
            last.erase(last.begin() + lo - 1);
            letter.insert(letter.begin(), ch);
            last.insert(last.begin(), i);
        }
    }
    cout << "! " << s << endl;
}
`,
      time: 'O(n log 26) questions',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector'],
    },
    {
      id: 'scan',
      kind: 'better',
      title: L('Linear scan over the letters instead of a binary search', 'বাইনারি সার্চের বদলে অক্ষরের ওপর রৈখিক স্ক্যান'),
      idea: L('Try the letters from the most recent: correct, but up to 26 questions per position.', 'সবচেয়ে সাম্প্রতিক থেকে অক্ষর যাচাই: ঠিক, কিন্তু প্রতি অবস্থানে ২৬ পর্যন্ত প্রশ্ন।'),
      explain: [L('Instead of halving, test k = 1, 2, … in turn. It finds the same letter and uses the same two kinds of questions, but the second kind can reach about 26 · n = 26000, over the allowed 6000. It shows exactly what the binary search saves.', 'অর্ধেক না করে k = ১, ২, … ক্রমে পরীক্ষা। একই অক্ষর খুঁজে পায়, একই দুই ধরনের প্রশ্ন, কিন্তু দ্বিতীয় ধরন প্রায় ২৬ · n = ২৬০০০ পর্যন্ত যেতে পারে, অনুমোদিত ৬০০০-এর বেশি। বাইনারি সার্চ ঠিক কী বাঁচায় তা দেখায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

char ask1(int i) {
    cout << "? 1 " << i << endl;
    char c;
    cin >> c;
    return c;
}
int ask2(int l, int r) {
    cout << "? 2 " << l << " " << r << endl;
    int d;
    cin >> d;
    return d;
}

int main() {
    int n;
    cin >> n;
    string s(n, '?');
    s[0] = ask1(1);
    vector<char> letter = {s[0]};
    vector<int> last = {1};
    for (int i = 2; i <= n; i++) {
        int c = (int)letter.size();
        if (ask2(1, i) > c) {
            s[i - 1] = ask1(i);
            letter.insert(letter.begin(), s[i - 1]);
            last.insert(last.begin(), i);
            continue;
        }
        int k = 1;
        while (k < c && ask2(last[k - 1], i) != k) k++;
        char ch = letter[k - 1];
        s[i - 1] = ch;
        letter.erase(letter.begin() + k - 1);
        last.erase(last.begin() + k - 1);
        letter.insert(letter.begin(), ch);
        last.insert(last.begin(), i);
    }
    cout << "! " << s << endl;
}
`,
      time: 'O(26 n) questions',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Read every letter', 'প্রতিটি অক্ষর পড়ো'),
      idea: L('n first-kind questions: only the 26-question limit stops it.', 'n টি প্রথম ধরনের প্রশ্ন: শুধু ২৬-এর সীমাই একে আটকায়।'),
      explain: [L('The honest reference: ask "? 1 i" for every i. It is correct for any n and violates the limit of 26 reads as soon as n > 26.', 'সৎ রেফারেন্স: প্রতিটি i-এর জন্য "? ১ i"। যেকোনো n-এ ঠিক, আর n > ২৬ হলেই ২৬ পড়ার সীমা ভাঙে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    string s;
    for (int i = 1; i <= n; i++) {
        cout << "? 1 " << i << endl;
        char c;
        cin >> c;
        s += c;
    }
    cout << "! " << s << endl;
}
`,
      time: 'n questions',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '1\nz', output: 'OK', source: 'own', note: L('A single letter: only the first read.', 'একটিমাত্র অক্ষর: শুধু প্রথম পড়া।') },
    { input: '5\naaaaa', output: 'OK', source: 'own', note: L('One letter repeated: the list never grows.', 'একটি অক্ষর বারবার: তালিকা বাড়ে না।') },
    { input: '26\nabcdefghijklmnopqrstuvwxyz', output: 'OK', source: 'own', note: L('26 new letters: exactly the 26 allowed reads.', '২৬টি নতুন অক্ষর: ঠিক অনুমোদিত ২৬ পড়া।') },
    { input: '12\nabababcbcbca', output: 'OK', source: 'own', note: L('Letters keep moving to the front of the list.', 'অক্ষরগুলো বারবার তালিকার সামনে আসে।') },
  ],
  pitfalls: [
    L('Reading the letter at every position with the first kind: only 26 reads are allowed.', 'প্রতিটি অবস্থানে প্রথম ধরনে অক্ষর পড়া: মাত্র ২৬ বার অনুমোদিত।'),
    L('Forgetting to move the repeated letter to the front of the list and updating its last position.', 'পুনরাবৃত্ত অক্ষরকে তালিকার সামনে না আনা আর তার শেষ অবস্থান আপডেট না করা।'),
    L('Searching the list in index order instead of by last occurrence: the answers are then not monotone and the binary search lies.', 'শেষ উপস্থিতির বদলে সূচক-ক্রমে তালিকা খোঁজা: তখন উত্তর একঘাত নয় আর বাইনারি সার্চ ভুল দেয়।'),
    L('Skipping the growth check and always binary searching: a new letter is not in the list, so no k satisfies the condition.', 'বৃদ্ধি-পরীক্ষা বাদ দিয়ে সবসময় বাইনারি সার্চ: নতুন অক্ষর তালিকায় নেই, কোনো k-ই শর্ত মেটায় না।'),
  ],
  related: [
    { id: '1698D', name: 'Fixed Point Guessing', why: L('A counting oracle turned into a binary-search predicate.', 'গণনা-ওরাকল বাইনারি সার্চের শর্তে বদল।') },
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Binary search with a tight query budget.', 'কড়া প্রশ্ন-বাজেটে বাইনারি সার্চ।') },
  ],
  toolkit: ['io-basics', 'vector'],
};

// ───────────────────────────────────────────── 1556D
export const p1556D: ProblemEntry = {
  id: '1556D',
  contestId: 1556,
  index: 'D',
  name: 'Take a Guess',
  rating: 1800,
  interactive: true,
  tags: ['bitmasks', 'constructive', 'interactive', 'math'],
  why: L(
    'OR and AND of two numbers add up to their sum (a | b) + (a & b) = a + b. That one identity turns a bit-fiddling oracle back into the plain pair-sum problem from 727C, with exactly 2n questions.',
    'দুটি সংখ্যার OR আর AND যোগ করলে যোগফল হয়: (a | b) + (a & b) = a + b। এই একটি অভেদ বিট-ওরাকলকে ৭২৭C-র সাধারণ জোড়া-যোগফলের সমস্যায় ফিরিয়ে আনে, ঠিক ২n প্রশ্নে।',
  ),
  statement: L(
    'The judge hides an array a of n non-negative integers (each below 2³⁰, not necessarily distinct). You may ask "or i j" (the bitwise OR of a_i and a_j) or "and i j" (the bitwise AND) for different positions i, j; at most 2n questions in total. Find the k-th smallest value of the array (counting from 1) and print it as "finish x".',
    'জাজ n টি অঋণাত্মক পূর্ণসংখ্যার একটি অ্যারে a লুকিয়েছে (প্রতিটি ২³⁰-এর কম, ভিন্ন হতে হবে না)। ভিন্ন অবস্থান i, j-র জন্য "or i j" (a_i ও a_j-র বিটওয়াইজ OR) বা "and i j" (বিটওয়াইজ AND) জিজ্ঞেস করতে পারো; মোট সর্বোচ্চ ২n প্রশ্ন। অ্যারের k-তম ক্ষুদ্রতম মান (১ থেকে গুনে) বের করে "finish x" হিসেবে প্রিন্ট করো।',
  ),
  input: L('First line: n and k. After each question, one integer: the answer.', 'প্রথম লাইনে n আর k। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: উত্তর।'),
  output: L('Questions "or i j" / "and i j", then "finish x". Flush after every line.', 'প্রশ্ন "or i j" / "and i j", শেষে "finish x"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁴, 1 ≤ k ≤ n, 0 ≤ a_i < 2³⁰, at most 2n questions', '৩ ≤ n ≤ ১০⁴, ১ ≤ k ≤ n, ০ ≤ a_i < ২³⁰, সর্বোচ্চ ২n প্রশ্ন')] },
  samples: [
    {
      input: '4 2\n6 3 5 1',
      output: 'OK',
      transcript: '< 4 2\n> or 1 2\n< 7\n> and 1 2\n< 2\n> or 1 3\n< 7\n> and 1 3\n< 4\n> or 2 3\n< 7\n> and 2 3\n< 1\n> or 1 4\n< 7\n> and 1 4\n< 0\n> finish 3',
      explain: L('The three pair sums are 9, 11, 8, so a_1 = (9 + 11 − 8) / 2 = 6, a_2 = 3, a_3 = 5. The fourth value comes from (7 + 0) − 6 = 1. Sorted: 1, 3, 5, 6, so the 2nd smallest is 3. ' + made.en, 'তিন জোড়ার যোগফল ৯, ১১, ৮, তাই a_১ = (৯ + ১১ − ৮) / ২ = ৬, a_২ = ৩, a_৩ = ৫। চতুর্থ মান (৭ + ০) − ৬ = ১। সাজালে ১, ৩, ৫, ৬, তাই ২য় ক্ষুদ্রতম ৩। ' + made.bn),
    },
  ],
  observation: L(
    'For every pair, (a | b) + (a & b) = a + b, because every bit that is set in both numbers is counted once in the OR and once in the AND. So two questions give the pair sum, and 2n questions give n pair sums: the 727C budget with a different oracle. Recover a_1, a_2, a_3 from the three pair sums among them (6 questions), then every a_i for i ≥ 4 from the sum with a_1 (2 questions each). Sort and read off the k-th.',
    'প্রতিটি জোড়ায় (a | b) + (a & b) = a + b, কারণ উভয় সংখ্যায় সেট থাকা প্রতিটি বিট OR-এ একবার আর AND-এ একবার গোনা হয়। তাই দুই প্রশ্নে জোড়ার যোগফল, আর ২n প্রশ্নে n টি যোগফল: ৭২৭C-র বাজেট, ভিন্ন ওরাকল। এদের তিনটির মধ্যের তিন যোগফল থেকে a_১, a_২, a_৩ (৬ প্রশ্ন), তারপর i ≥ ৪-এর প্রতিটি a_১-এর সঙ্গে যোগফল থেকে (প্রতিটিতে ২ প্রশ্ন)। সাজিয়ে k-তমটি পড়ো।',
  ),
  approach: [
    L('Write sum(i, j) = ask("or", i, j) + ask("and", i, j).', 'sum(i, j) = ask("or", i, j) + ask("and", i, j) লেখো।'),
    L('a_1 = (sum(1, 2) + sum(1, 3) − sum(2, 3)) / 2, a_2 = sum(1, 2) − a_1, a_3 = sum(1, 3) − a_1.', 'a_১ = (sum(১, ২) + sum(১, ৩) − sum(২, ৩)) / ২, a_২ = sum(১, ২) − a_১, a_৩ = sum(১, ৩) − a_১।'),
    L('For i ≥ 4: a_i = sum(1, i) − a_1.', 'i ≥ ৪-এর জন্য: a_i = sum(১, i) − a_১।'),
    L('Sort the values, print the k-th. Use long long: a sum is below 2³¹ and a_1 + a_2 + a_3 intermediates add up.', 'মানগুলো সাজাও, k-তমটি প্রিন্ট করো। long long নাও: যোগফল ২³¹-এর কম আর মধ্যবর্তী যোগফল বাড়ে।'),
  ],
  walkthrough: {
    input: '4 2\n6 3 5 1',
    steps: [
      { state: 'sum(1,2) = 7 + 2 = 9', text: L('or and and add up to the real sum 6 + 3 = 9.', 'or আর and মিলে আসল যোগফল ৬ + ৩ = ৯।') },
      { state: 'a_1 = (9 + 11 − 8) / 2 = 6', text: L('The three pair sums solve a_1, a_2, a_3 = 6, 3, 5.', 'তিন জোড়ার যোগফলে a_১, a_২, a_৩ = ৬, ৩, ৫।') },
      { state: 'a_4 = (7 + 0) − 6 = 1', text: L('Then sort 1, 3, 5, 6 and take the 2nd: 3.', 'তারপর ১, ৩, ৫, ৬ সাজিয়ে ২য়টি: ৩।') },
    ],
  },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('2n questions, then a sort.', '২n প্রশ্ন, তারপর সর্ট।') },
  solutions: [
    {
      id: 'anchor',
      kind: 'optimal',
      title: L('OR plus AND is the sum; anchor on a_1', 'OR + AND = যোগফল; a_১-কে নোঙর'),
      idea: L('Turn each pair of questions into a pair sum and solve like Guess the Array.', 'প্রতি দুই প্রশ্নকে জোড়ার যোগফলে বদলে Guess the Array-র মতো সমাধান।'),
      explain: [L('There is no cleverness beyond the identity: 6 + 2(n − 3) = 2n questions exactly. Any solution that spends a third question on anything is over budget.', 'অভেদটির বাইরে কোনো চালাকি নেই: ৬ + ২(n − ৩) = ঠিক ২n প্রশ্ন। তৃতীয় কোনো প্রশ্নে খরচ করলেই বাজেট ছাড়ায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long ask(const char* op, int i, int j) {
    cout << op << " " << i << " " << j << endl;
    long long v;
    cin >> v;
    return v;
}
long long sum(int i, int j) { return ask("or", i, j) + ask("and", i, j); }

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n + 1);
    long long s12 = sum(1, 2), s13 = sum(1, 3), s23 = sum(2, 3);
    a[1] = (s12 + s13 - s23) / 2;
    a[2] = s12 - a[1];
    a[3] = s13 - a[1];
    for (int i = 4; i <= n; i++) a[i] = sum(1, i) - a[1];
    sort(a.begin() + 1, a.end());
    cout << "finish " << a[k] << endl;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'sort', 'long-long'],
    },
    {
      id: 'chain',
      kind: 'method',
      title: L('Chain through neighbours', 'প্রতিবেশীর মধ্য দিয়ে শিকল'),
      idea: L('After the first three, a_i comes from sum(i − 1, i) and a_{i − 1}.', 'প্রথম তিনটির পর a_i আসে sum(i − ১, i) আর a_{i − ১} থেকে।'),
      explain: [L('The same budget and the same identity; only the dependency changes shape from a star to a path.', 'একই বাজেট, একই অভেদ; শুধু নির্ভরতার আকৃতি তারা থেকে পথে বদলায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long ask(const char* op, int i, int j) {
    cout << op << " " << i << " " << j << endl;
    long long v;
    cin >> v;
    return v;
}
long long sum(int i, int j) { return ask("or", i, j) + ask("and", i, j); }

int main() {
    int n, k;
    cin >> n >> k;
    vector<long long> a(n + 1);
    long long s12 = sum(1, 2), s13 = sum(1, 3), s23 = sum(2, 3);
    a[1] = (s12 + s13 - s23) / 2;
    a[2] = s12 - a[1];
    a[3] = s13 - a[1];
    for (int i = 4; i <= n; i++) a[i] = sum(i - 1, i) - a[i - 1];
    sort(a.begin() + 1, a.end());
    cout << "finish " << a[k] << endl;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'sort', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Ask OR and AND for every pair', 'প্রতিটি জোড়ায় OR আর AND জিজ্ঞেস'),
      idea: L('n(n − 1) questions: correct, far over 2n.', 'n(n − ১) প্রশ্ন: ঠিক, ২n-এর অনেক বেশি।'),
      explain: [L('Collect every pair sum, solve the first triangle, read the rest off row 1. Included to show how much of the data is redundant.', 'সব জোড়ার যোগফল জোগাড়, প্রথম ত্রিভুজ সমাধান, বাকি ১ নম্বর সারি থেকে পড়ো। কতটা তথ্য বাড়তি তা দেখাতে রাখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<vector<long long>> s(n + 1, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = i + 1; j <= n; j++) {
            long long o, a;
            cout << "or " << i << " " << j << endl;
            cin >> o;
            cout << "and " << i << " " << j << endl;
            cin >> a;
            s[i][j] = o + a;
        }
    vector<long long> a(n + 1);
    a[1] = (s[1][2] + s[1][3] - s[2][3]) / 2;
    for (int i = 2; i <= n; i++) a[i] = s[1][i] - a[1];
    sort(a.begin() + 1, a.end());
    cout << "finish " << a[k] << endl;
}
`,
      time: 'n(n − 1) questions',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['io-basics', 'vector', 'sort', 'long-long'],
    },
  ],
  tests: [
    { input: '3 1\n5 5 5', output: 'OK', source: 'own', note: L('All equal.', 'সব সমান।') },
    { input: '3 3\n1073741823 0 1073741823', output: 'OK', source: 'own', note: L('Values up to 2³⁰ − 1 and a zero: sums near 2³¹.', '২³⁰ − ১ পর্যন্ত মান আর একটি শূন্য: যোগফল ২³¹-এর কাছাকাছি।') },
    { input: '5 5\n2 7 1 8 2', output: 'OK', source: 'own', note: L('k = n asks for the maximum.', 'k = n হলে সর্বোচ্চ।') },
    { input: '6 3\n9 9 4 4 6 1', output: 'OK', source: 'own', note: L('Duplicates around the middle rank.', 'মাঝের র‍্যাঙ্কের কাছে সদৃশ মান।') },
  ],
  pitfalls: [
    L('Overflow: a sum of two values near 2³⁰ reaches 2³¹, which does not fit in a signed 32-bit int.', 'উপচানো: ২³⁰-এর কাছাকাছি দুই মানের যোগফল ২³¹ ছোঁয়, যা সাইনড ৩২ বিট int-এ ধরে না।'),
    L('Counting k from 0 instead of 1: the judge expects the k-th smallest counting from 1.', 'k ০ থেকে গোনা: জাজ ১ থেকে গোনা k-তম ক্ষুদ্রতম চায়।'),
    L('Spending a third question on a pair: the budget 2n has no spare.', 'এক জোড়ায় তৃতীয় প্রশ্ন: ২n বাজেটে বাড়তি নেই।'),
    L('Solving a_1 with a division that truncates a negative number: the three sums are non-negative, so (s12 + s13 − s23) is even and non-negative.', 'ঋণাত্মক সংখ্যার ছাঁটা ভাগ দিয়ে a_১ বের করা: তিন যোগফল অঋণাত্মক, তাই (s12 + s13 − s23) জোড় ও অঋণাত্মক।'),
  ],
  related: [
    { id: '727C', name: 'Guess the Array', why: L('The same structure with plain pair sums.', 'একই কাঠামো, সাধারণ জোড়া-যোগফল।') },
    { id: '1088D', name: 'Ehab and another another xor problem', why: L('Another bitwise oracle, solved bit by bit.', 'আরেকটি বিটওয়াইজ ওরাকল, বিটে বিটে সমাধান।') },
  ],
  toolkit: ['io-basics', 'vector', 'sort', 'long-long'],
};
