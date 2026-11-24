import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 1155E
export const p1155E: ProblemEntry = {
  id: '1155E',
  contestId: 1155,
  index: 'E',
  name: 'Guess the Root',
  rating: 2200,
  interactive: true,
  tags: ['interactive', 'math', 'number-theory', 'brute-force'],
  why: L(
    'A polynomial of degree at most 10 is fixed by 11 values. Ask 11 points, rebuild the polynomial modulo a prime, then test all one million residues yourself, with no further questions.',
    'ঘাত সর্বোচ্চ ১০ এমন বহুপদী ১১ টি মানেই নির্ধারিত। ১১ টি বিন্দু জিজ্ঞেস করো, মৌলিক সংখ্যার মডুলোতে বহুপদী পুনর্গঠন করো, তারপর আর কোনো প্রশ্ন ছাড়াই নিজে সব দশ লক্ষ অবশিষ্ট পরীক্ষা করো।',
  ),
  statement: L(
    'The judge hides a polynomial f(x) = a_0 + a_1 x + … + a_10 x¹⁰ whose coefficients are integers in [0, p) with p = 10⁶ + 3. A question "? x" (0 ≤ x < p) is answered with f(x) mod p. With at most 50 questions, print "! x" for some x with f(x) ≡ 0 (mod p), or "! -1" if no such x exists.',
    'জাজ একটি বহুপদী f(x) = a_0 + a_1 x + … + a_10 x¹⁰ লুকিয়েছে, যার সহগগুলো [০, p)-এর পূর্ণসংখ্যা, p = ১০⁶ + ৩। প্রশ্ন "? x" (০ ≤ x < p)-এর উত্তর f(x) mod p। সর্বোচ্চ ৫০ প্রশ্নে f(x) ≡ ০ (mod p) এমন কোনো x-এর জন্য "! x" প্রিন্ট করো, না থাকলে "! -1"।',
  ),
  input: L('After each question, one integer: f(x) mod p.', 'প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: f(x) mod p।'),
  output: L('Questions "? x", then "! x" or "! -1". Flush after every line.', 'প্রশ্ন "? x", শেষে "! x" বা "! -1"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('p = 1 000 003 is prime, at most 50 questions', 'p = ১ ০০০ ০০৩ মৌলিক, সর্বোচ্চ ৫০ প্রশ্ন')] },
  samples: [
    {
      input: '1000002 0 1 0 0 0 0 0 0 0 0',
      output: 'OK',
      transcript: '> ? 0\n< 1000002\n> ? 1\n< 0\n> ! 1',
      explain: L('Here f(x) = x² + 10⁶ + 2, because the constant term is p − 1. f(0) = p − 1, but f(1) = p ≡ 0, so 1 is a root. A real solution does not guess: it asks 11 points and then searches. ' + made.en, 'এখানে f(x) = x² + ১০⁶ + ২, কারণ ধ্রুবক পদ p − ১। f(০) = p − ১, কিন্তু f(১) = p ≡ ০, তাই ১ একটি মূল। আসল সমাধান আন্দাজ করে না: ১১ টি বিন্দু জিজ্ঞেস করে তারপর খোঁজে। ' + made.bn),
    },
    {
      input: '1 0 0 0 0 0 0 0 0 0 0',
      output: 'OK',
      transcript: '> ? 5\n< 1\n> ! -1',
      explain: L('The constant polynomial 1 never reaches 0, so the right answer is "! -1". The judge itself checks all one million values to know that. ' + made.en, 'ধ্রুবক বহুপদী ১ কখনও ০ হয় না, তাই সঠিক উত্তর "! -1"। এটি জানতে জাজ নিজে দশ লক্ষ মান পরীক্ষা করে। ' + made.bn),
    },
  ],
  observation: L(
    'Over a field a polynomial of degree ≤ 10 is determined by its values at any 11 distinct points. The questions are free to be spent on any 11 points, and once f is known, finding a root is just local computation: p is only about a million, so evaluate every residue.',
    'ক্ষেত্রের ওপর ঘাত ≤ ১০ বহুপদী যেকোনো ১১ টি ভিন্ন বিন্দুর মান দিয়ে নির্ধারিত। প্রশ্নগুলো যেকোনো ১১ বিন্দুতে খরচ করা যায়, আর f জানা হয়ে গেলে মূল খোঁজা শুধু স্থানীয় হিসাব: p মাত্র প্রায় দশ লক্ষ, তাই প্রতিটি অবশিষ্ট মূল্যায়ন করো।',
  ),
  approach: [
    L('Ask x = 0, 1, …, 10 and keep y_i = f(i) mod p.', 'x = ০, ১, …, ১০ জিজ্ঞেস করো আর y_i = f(i) mod p রাখো।'),
    L('Rebuild f: either solve the 11 × 11 Vandermonde system modulo p, or use Lagrange interpolation directly at each x.', 'f পুনর্গঠন করো: হয় মডুলো p-তে ১১ × ১১ ভ্যান্ডারমন্ড সিস্টেম সমাধান, নয়তো প্রতিটি x-এ সরাসরি লাগ্রাঞ্জ ইন্টারপোলেশন।'),
    L('Evaluate f at x = 0 … p − 1 (Horner with 10 multiplications each) and print the first x with f(x) ≡ 0.', 'x = ০ … p − ১-এ f মূল্যায়ন করো (প্রতিটিতে ১০ গুণ, হর্নার) আর f(x) ≡ ০ এমন প্রথম x প্রিন্ট করো।'),
    L('If none is found print -1. Only 11 questions are used.', 'কোনোটি না পেলে -১ প্রিন্ট করো। মাত্র ১১ টি প্রশ্ন ব্যবহার হয়।'),
  ],
  walkthrough: {
    input: '1000002 0 1 0 0 0 0 0 0 0 0',
    steps: [
      { state: 'ask x = 0 … 10', text: L('The answers are 1000002, 0, 5, 10, …: f(i) = i² − 1 mod p.', 'উত্তরগুলো ১০০০০০২, ০, ৫, ১০, …: f(i) = i² − ১ mod p।') },
      { state: 'interpolate', text: L('The 11 values force the coefficients (p − 1, 0, 1, 0, …, 0).', '১১ মান সহগগুলোকে (p − ১, ০, ১, ০, …, ০) করে দেয়।') },
      { state: 'scan x = 0 … p − 1', text: L('x = 1 is the first residue where f vanishes. Print "! 1".', 'x = ১ প্রথম অবশিষ্ট যেখানে f শূন্য। "! ১" প্রিন্ট করো।') },
    ],
  },
  complexity: { time: 'O(p · 10)', space: 'O(1)', why: L('Eleven questions, then one pass of about ten million multiplications.', 'এগারো প্রশ্ন, তারপর প্রায় এক কোটি গুণের একটি পাস।') },
  solutions: [
    {
      id: 'gauss',
      kind: 'optimal',
      title: L('Solve the Vandermonde system, then Horner over all residues', 'ভ্যান্ডারমন্ড সিস্টেম সমাধান, তারপর সব অবশিষ্টে হর্নার'),
      idea: L('Gaussian elimination modulo a prime gives the coefficients; Horner checks every x.', 'মৌলিকের মডুলোতে গাউসীয় এলিমিনেশন সহগ দেয়; হর্নার প্রতিটি x পরীক্ষা করে।'),
      explain: [
        L('The matrix with rows (1, i, i², …, i¹⁰) for i = 0 … 10 is invertible because the points are distinct, so elimination never fails to find a pivot.', 'i = ০ … ১০-এর জন্য (১, i, i², …, i¹⁰) সারির ম্যাট্রিক্স উল্টানো যায় কারণ বিন্দুগুলো ভিন্ন, তাই এলিমিনেশনে পিভট সবসময় মেলে।'),
        L('All products stay below p² ≈ 10¹², which fits in a 64-bit integer.', 'সব গুণফল p² ≈ ১০¹²-এর নিচে, যা ৬৪-বিট পূর্ণসংখ্যায় ধরে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 1000003;

ll power(ll b, ll e) {
    ll r = 1;
    b %= P;
    for (; e; e >>= 1, b = b * b % P)
        if (e & 1) r = r * b % P;
    return r;
}

int main() {
    const int D = 11;
    vector<vector<ll>> m(D, vector<ll>(D + 1));
    for (int i = 0; i < D; i++) {
        cout << "? " << i << endl;
        cin >> m[i][D];
        ll p = 1;
        for (int j = 0; j < D; j++) {
            m[i][j] = p;
            p = p * i % P;
        }
    }
    for (int c = 0; c < D; c++) {
        int piv = c;
        while (m[piv][c] == 0) piv++;
        swap(m[piv], m[c]);
        ll inv = power(m[c][c], P - 2);
        for (int j = c; j <= D; j++) m[c][j] = m[c][j] * inv % P;
        for (int r = 0; r < D; r++) {
            if (r == c || m[r][c] == 0) continue;
            ll f = m[r][c];
            for (int j = c; j <= D; j++) m[r][j] = ((m[r][j] - f * m[c][j]) % P + P) % P;
        }
    }
    for (ll x = 0; x < P; x++) {
        ll v = 0;
        for (int j = D - 1; j >= 0; j--) v = (v * x + m[j][D]) % P;
        if (v == 0) {
            cout << "! " << x << endl;
            return 0;
        }
    }
    cout << "! -1" << endl;
}
`,
      time: 'O(p · 10)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'long-long', 'modulo', 'mod-pow', 'vector'],
    },
    {
      id: 'lagrange',
      kind: 'alt',
      title: L('Lagrange interpolation at every x with prefix and suffix products', 'প্রতিটি x-এ প্রিফিক্স-সাফিক্স গুণফলসহ লাগ্রাঞ্জ'),
      idea: L('Skip the coefficients and evaluate the interpolation formula directly, in O(11) per x.', 'সহগ বাদ দিয়ে ইন্টারপোলেশন সূত্র সরাসরি মূল্যায়ন করো, প্রতি x-এ O(১১)।'),
      explain: [
        L('f(x) = Σ y_i · w_i · Π_{j≠i}(x − j), where w_i = 1 / Π_{j≠i}(i − j) is computed once. For x > 10 the product over j ≠ i is the prefix product up to i times the suffix product after i, so no division is needed per x.', 'f(x) = Σ y_i · w_i · Π_{j≠i}(x − j), যেখানে w_i = ১ / Π_{j≠i}(i − j) একবারই হিসাব। x > ১০-এর জন্য j ≠ i-এর গুণফল হলো i পর্যন্ত প্রিফিক্স গুণফল গুণ i-র পরের সাফিক্স গুণফল, তাই প্রতি x-এ ভাগ লাগে না।'),
        L('For x ≤ 10 the answer is already known: it is y_x.', 'x ≤ ১০-এর জন্য উত্তর আগে থেকেই জানা: y_x।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 1000003;

ll power(ll b, ll e) {
    ll r = 1;
    b %= P;
    for (; e; e >>= 1, b = b * b % P)
        if (e & 1) r = r * b % P;
    return r;
}

int main() {
    const int D = 11;
    ll y[D], w[D];
    for (int i = 0; i < D; i++) {
        cout << "? " << i << endl;
        cin >> y[i];
    }
    for (int i = 0; i < D; i++) {
        ll d = 1;
        for (int j = 0; j < D; j++)
            if (j != i) d = d * (((i - j) % P + P) % P) % P;
        w[i] = power(d, P - 2);
    }
    for (ll x = 0; x < P; x++) {
        ll v = 0;
        if (x < D) {
            v = y[x];
        } else {
            ll pre[D + 1], suf[D + 2];
            pre[0] = 1;
            for (int i = 0; i < D; i++) pre[i + 1] = pre[i] * (x - i) % P;
            suf[D] = 1;
            for (int i = D - 1; i >= 0; i--) suf[i] = suf[i + 1] * (x - i) % P;
            for (int i = 0; i < D; i++) v = (v + y[i] * w[i] % P * pre[i] % P * suf[i + 1]) % P;
        }
        if (v == 0) {
            cout << "! " << x << endl;
            return 0;
        }
    }
    cout << "! -1" << endl;
}
`,
      time: 'O(p · 11)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'long-long', 'modulo', 'mod-pow'],
    },
  ],
  tests: [
    { input: '1000002 0 1 0 0 0 0 0 0 0 0', output: 'OK', source: 'own', note: L('x² − 1: the roots 1 and p − 1.', 'x² − ১: মূল ১ আর p − ১।') },
    { input: '1 0 0 0 0 0 0 0 0 0 0', output: 'OK', source: 'own', note: L('A nonzero constant: no root.', 'অশূন্য ধ্রুবক: কোনো মূল নেই।') },
    { input: '0 1 0 0 0 0 0 0 0 0 0', output: 'OK', source: 'own', note: L('f(x) = x: the root 0 is among the queried points.', 'f(x) = x: মূল ০ জিজ্ঞেস করা বিন্দুগুলোর মধ্যেই।') },
    { input: '500003 1 0 0 0 0 0 0 0 0 0', output: 'OK', source: 'own', note: L('f(x) = x − 500000: the only root is far from the queried points.', 'f(x) = x − ৫০০০০০: একমাত্র মূল জিজ্ঞেস করা বিন্দু থেকে অনেক দূরে।') },
    { input: '5 4 3 2 1 0 0 0 0 0 0', output: 'OK', source: 'own', note: L('A degree-4 polynomial with arbitrary coefficients.', 'যথেচ্ছ সহগের ঘাত-৪ বহুপদী।') },
    { input: '1 0 0 0 0 0 0 0 0 0 1', output: 'OK', source: 'own', note: L('x¹⁰ + 1, full degree.', 'x¹⁰ + ১, পূর্ণ ঘাত।') },
  ],
  pitfalls: [
    L('Using fewer than 11 points: degree 10 needs 11 values, and 10 leave one coefficient free.', '১১-র কম বিন্দু ব্যবহার: ঘাত ১০-এর জন্য ১১ মান লাগে, ১০ মানে একটি সহগ মুক্ত থেকে যায়।'),
    L('Forgetting that 0⁰ = 1 when building the row for x = 0.', 'x = ০-এর সারি বানাতে ০⁰ = ১ ভুলে যাওয়া।'),
    L('Overflow: with int, a product of two residues reaches 10¹². Use long long and reduce after every product.', 'ওভারফ্লো: int-এ দুই অবশিষ্টের গুণফল ১০¹² ছোঁয়। long long নাও আর প্রতি গুণের পর কমাও।'),
    L('Asking x outside [0, p): the judge rejects it.', '[০, p)-এর বাইরে x জিজ্ঞেস: জাজ বাতিল করে।'),
    L('Printing 0 instead of -1 when there is no root.', 'মূল না থাকলে -১-এর বদলে ০ প্রিন্ট।'),
  ],
  related: [
    { id: '1088D', name: 'Ehab and another another xor problem', why: L('Another case where local computation does most of the work.', 'আরেকটি ক্ষেত্র যেখানে স্থানীয় হিসাবই বেশির ভাগ কাজ করে।') },
    { id: '727C', name: 'Guess the Array', why: L('Recover hidden numbers from a few algebraic answers.', 'কয়েকটি বীজগাণিতিক উত্তর থেকে লুকানো সংখ্যা উদ্ধার।') },
  ],
  toolkit: ['io-basics', 'long-long', 'modulo', 'mod-pow'],
};

// ───────────────────────────────────────────── 1153E
export const p1153E: ProblemEntry = {
  id: '1153E',
  contestId: 1153,
  index: 'E',
  name: 'Serval and Snake',
  rating: 2200,
  interactive: true,
  tags: ['binary-search', 'interactive'],
  why: L(
    'The parity of the number of border crossings of a rectangle equals the parity of how many ends of the snake lie inside it. That turns every query into a yes/no about the two ends, and rows, columns and binary search pin them down.',
    'আয়তক্ষেত্রের সীমানা পেরোনোর সংখ্যার জোড়-বিজোড় ঠিক সেই সংখ্যার জোড়-বিজোড়ের সমান যত প্রান্ত ভেতরে। এতে প্রতিটি প্রশ্ন দুই প্রান্ত নিয়ে হ্যাঁ/না হয়ে যায়, আর সারি, কলাম ও বাইনারি সার্চ তাদের ঠিক করে দেয়।',
  ),
  statement: L(
    'An n × n grid contains a snake: a path of at least two cells, each next to the previous one, never visiting a cell twice. The judge hides it. A question "? x1 y1 x2 y2" about a rectangle is answered with the number of times the snake\'s path steps across the rectangle\'s border (from a cell inside to a cell outside, or the other way). With at most 2019 questions, print "! hx hy tx ty", the cells of the head and the tail, in either order.',
    'n × n গ্রিডে একটি সাপ আছে: কমপক্ষে দুই ঘরের পথ, প্রতিটি ঘর আগেরটির পাশে, কোনো ঘর দুবার নয়। জাজ তা লুকিয়েছে। আয়তক্ষেত্রের প্রশ্ন "? x1 y1 x2 y2"-এর উত্তর সাপের পথ যতবার আয়তক্ষেত্রের সীমানা পেরোয় (ভেতরের ঘর থেকে বাইরের ঘরে, বা উল্টো) তত। সর্বোচ্চ ২০১৯ প্রশ্নে মাথা আর লেজের ঘর "! hx hy tx ty" হিসেবে প্রিন্ট করো, যেকোনো ক্রমে।',
  ),
  input: L('First line: n. After each question, one integer: the number of crossings.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: পেরোনোর সংখ্যা।'),
  output: L('Questions "? x1 y1 x2 y2" (x1 ≤ x2, y1 ≤ y2), then "! hx hy tx ty". Flush after every line.', 'প্রশ্ন "? x1 y1 x2 y2" (x1 ≤ x2, y1 ≤ y2), শেষে "! hx hy tx ty"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 1000, at most 2019 questions', '২ ≤ n ≤ ১০০০, সর্বোচ্চ ২০১৯ প্রশ্ন')] },
  samples: [
    {
      input: '3\n1 1\n1 2\n2 2\n3 2',
      output: 'OK',
      transcript: '< 3\n> ? 1 1 1 3\n< 1\n> ? 2 1 2 3\n< 2\n> ? 3 1 3 3\n< 1\n> ? 1 1 1 2\n< 1\n> ? 1 1 1 1\n< 1\n> ? 3 1 3 2\n< 1\n> ? 3 1 3 1\n< 0\n> ! 1 1 3 2',
      explain: L('The snake runs (1,1) → (1,2) → (2,2) → (3,2). Rows 1 and 3 answer an odd number, row 2 an even one, so the ends are in rows 1 and 3. Binary search on the columns of row 1: columns 1–2 give 1 and column 1 alone gives 1, so the end in row 1 is in column 1. In row 3, columns 1–2 give 1 but column 1 alone gives 0, so that end is in column 2. ' + made.en, 'সাপ চলে (১,১) → (১,২) → (২,২) → (৩,২)। সারি ১ ও ৩ বিজোড় উত্তর দেয়, সারি ২ জোড়, তাই প্রান্ত দুটি সারি ১ ও ৩-এ। সারি ১-এর কলামে বাইনারি সার্চ: কলাম ১–২ দেয় ১ আর একা কলাম ১ দেয় ১, তাই সারি ১-এর প্রান্ত কলাম ১-এ। সারি ৩-এ কলাম ১–২ দেয় ১ কিন্তু একা কলাম ১ দেয় ০, তাই ওই প্রান্ত কলাম ২-এ। ' + made.bn),
    },
  ],
  observation: L(
    'Every time the path enters the rectangle it must leave again, except at a path end. So the number of crossings is even for a rectangle with no end inside, and odd when exactly one end is inside; with both ends inside it is even again. Crossing parity is the parity of the number of ends inside.',
    'পথ যতবার আয়তক্ষেত্রে ঢোকে ততবার বেরোতেও হয়, শুধু পথের প্রান্ত ছাড়া। তাই ভেতরে কোনো প্রান্ত না থাকলে পেরোনো জোড়, ঠিক একটি প্রান্ত থাকলে বিজোড়, আর দুই প্রান্তই ভেতরে থাকলে আবার জোড়। পেরোনোর জোড়-বিজোড় মানে ভেতরের প্রান্ত-সংখ্যার জোড়-বিজোড়।',
  ),
  approach: [
    L('For each row i ask the rectangle (i, 1, i, n). The rows with an odd answer are exactly the rows that contain one end each.', 'প্রতিটি সারি i-এর জন্য আয়তক্ষেত্র (i, ১, i, n) জিজ্ঞেস করো। বিজোড় উত্তরের সারিগুলোই ঠিক সেই সারি যেগুলোতে একটি করে প্রান্ত আছে।'),
    L('If two rows r1, r2 are odd: in row r1 binary search the smallest m such that (r1, 1, r1, m) is odd; that m is the column of the end in r1. Do the same for r2.', 'দুটি সারি r1, r2 বিজোড় হলে: r1-এ ক্ষুদ্রতম m বাইনারি সার্চে খোঁজো যার জন্য (r1, ১, r1, m) বিজোড়; সেই m-ই r1-এর প্রান্তের কলাম। r2-এর জন্য একই।'),
    L('If no row is odd, both ends are in one row. Ask every column the same way: exactly two columns c1, c2 are odd.', 'কোনো সারি বিজোড় না হলে দুই প্রান্তই এক সারিতে। প্রতিটি কলাম একই ভাবে জিজ্ঞেস করো: ঠিক দুটি কলাম c1, c2 বিজোড়।'),
    L('Then binary search the row with the rectangles (1, c1, m, c1). Print (row, c1) and (row, c2).', 'তারপর আয়তক্ষেত্র (১, c1, m, c1) দিয়ে সারি বাইনারি সার্চে খোঁজো। (সারি, c1) আর (সারি, c2) প্রিন্ট করো।'),
    L('Questions: at most n + 2⌈log₂ n⌉ in the first case, at most 2n + ⌈log₂ n⌉ in the second: both within 2019.', 'প্রশ্ন: প্রথম ক্ষেত্রে সর্বোচ্চ n + ২⌈log₂ n⌉, দ্বিতীয়টিতে সর্বোচ্চ ২n + ⌈log₂ n⌉: দুটিই ২০১৯-এর ভেতরে।'),
  ],
  walkthrough: {
    input: '3\n1 1\n1 2\n2 2\n3 2',
    steps: [
      { state: 'rows: 1, 2, 1', text: L('Rows 1 and 3 are odd.', 'সারি ১ ও ৩ বিজোড়।') },
      { state: 'row 1, columns 1–2 → 1, column 1 → 1', text: L('The end in row 1 is in column 1.', 'সারি ১-এর প্রান্ত কলাম ১-এ।') },
      { state: 'row 3, columns 1–2 → 1, column 1 → 0', text: L('The end in row 3 is in column 2.', 'সারি ৩-এর প্রান্ত কলাম ২-এ।') },
    ],
  },
  complexity: { time: 'O(n) questions', space: 'O(n)', why: L('A scan over rows, sometimes columns, then a logarithmic search.', 'সারিতে স্ক্যান, কখনও কলামেও, তারপর লগারিদমিক সার্চ।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Row and column parities, then binary search', 'সারি-কলামের জোড়-বিজোড়, তারপর বাইনারি সার্চ'),
      idea: L('Odd crossing parity means exactly one end inside: scan, then halve.', 'বিজোড় পেরোনো মানে ভেতরে ঠিক একটি প্রান্ত: স্ক্যান করো, তারপর অর্ধেক করো।'),
      explain: [
        L('In the binary search the rectangle is a single row (or column) prefix. The other end is in a different row, so it never lies inside, which makes "odd" mean "my end is in this prefix".', 'বাইনারি সার্চে আয়তক্ষেত্র একটিমাত্র সারির (বা কলামের) প্রিফিক্স। অন্য প্রান্ত ভিন্ন সারিতে, তাই কখনও ভেতরে পড়ে না, ফলে "বিজোড়" মানে "আমার প্রান্ত এই প্রিফিক্সে"।'),
        L('The second case, with both ends in one row, needs the columns because the rows give no information.', 'দ্বিতীয় ক্ষেত্রে, দুই প্রান্ত এক সারিতে, কলাম লাগে কারণ সারি কোনো তথ্য দেয় না।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;

int ask(int x1, int y1, int x2, int y2) {
    cout << "? " << x1 << " " << y1 << " " << x2 << " " << y2 << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    cin >> n;
    vector<int> rows;
    for (int i = 1; i <= n; i++)
        if (ask(i, 1, i, n) % 2 == 1) rows.push_back(i);
    if (rows.size() == 2) {
        int col[2];
        for (int t = 0; t < 2; t++) {
            int r = rows[t], lo = 1, hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (ask(r, 1, r, mid) % 2 == 1) hi = mid;
                else lo = mid + 1;
            }
            col[t] = lo;
        }
        cout << "! " << rows[0] << " " << col[0] << " " << rows[1] << " " << col[1] << endl;
        return 0;
    }
    vector<int> cols;
    for (int j = 1; j <= n; j++)
        if (ask(1, j, n, j) % 2 == 1) cols.push_back(j);
    int c = cols[0], lo = 1, hi = n;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (ask(1, c, mid, c) % 2 == 1) hi = mid;
        else lo = mid + 1;
    }
    cout << "! " << lo << " " << cols[0] << " " << lo << " " << cols[1] << endl;
}
`,
      time: 'O(n) questions',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'binary-search'],
    },
    {
      id: 'cells',
      kind: 'brute',
      title: L('Ask every single cell', 'প্রতিটি ঘর আলাদা করে জিজ্ঞেস'),
      idea: L('A one-cell rectangle gives 1 at an end, 2 inside the body and 0 elsewhere: n² questions.', 'এক-ঘরের আয়তক্ষেত্র প্রান্তে ১, শরীরের ভেতরে ২, অন্যত্র ০ দেয়: n² প্রশ্ন।'),
      explain: [L('An end has one neighbour on the path, so exactly one step crosses its border; a body cell has two. Perfectly correct and far beyond the limit once n is above 44.', 'প্রান্তের পথে একটিই প্রতিবেশী, তাই ঠিক একটি ধাপ তার সীমানা পেরোয়; শরীরের ঘরে দুটি। পুরোপুরি সঠিক, কিন্তু n ৪৪ ছাড়ালে সীমার বহু ওপরে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> ends;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++) {
            cout << "? " << i << " " << j << " " << i << " " << j << endl;
            int r;
            cin >> r;
            if (r == 1) ends.push_back({i, j});
        }
    cout << "! " << ends[0].first << " " << ends[0].second << " " << ends[1].first << " " << ends[1].second << endl;
}
`,
      time: 'O(n²) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics', 'pair', 'vector'],
    },
  ],
  tests: [
    { input: '2\n1 1\n2 1', output: 'OK', source: 'own', note: L('A vertical domino: both ends in one column, in two rows.', 'উল্লম্ব ডোমিনো: দুই প্রান্ত এক কলামে, দুই সারিতে।') },
    { input: '2\n1 1\n1 2', output: 'OK', source: 'own', note: L('A horizontal domino: both ends in one row, so no row is odd.', 'অনুভূমিক ডোমিনো: দুই প্রান্ত এক সারিতে, তাই কোনো সারি বিজোড় নয়।') },
    { input: '3\n1 3\n2 3\n3 3\n3 2\n3 1', output: 'OK', source: 'own', note: L('An L-shape.', 'L-আকৃতি।') },
    { input: '4\n1 1\n1 2\n1 3\n1 4\n2 4\n2 3\n2 2\n2 1', output: 'OK', source: 'own', note: L('The snake turns back on itself and ends below its start.', 'সাপ নিজের দিকে ফিরে শুরুর ঠিক নিচে শেষ হয়।') },
    { input: '3\n2 2\n2 1\n1 1\n1 2\n1 3\n2 3\n3 3\n3 2\n3 1', output: 'OK', source: 'own', note: L('A long snake that fills most of the grid: many crossings, same parities.', 'প্রায় পুরো গ্রিড ভরা লম্বা সাপ: অনেক পেরোনো, একই জোড়-বিজোড়।') },
  ],
  pitfalls: [
    L('Reading the answer as "number of snake cells inside": it counts border crossings, which is why only parity is reliable.', 'উত্তরকে "ভেতরের সাপের ঘরের সংখ্যা" ভাবা: এটি সীমানা পেরোনো গোনে, তাই শুধু জোড়-বিজোড়ই নির্ভরযোগ্য।'),
    L('Assuming there are always two odd rows: both ends can share a row, and then you must use the columns.', 'সবসময় দুটি বিজোড় সারি ধরে নেওয়া: দুই প্রান্ত এক সারিতে থাকতে পারে, তখন কলাম ব্যবহার করতে হয়।'),
    L('Binary searching with a rectangle that spans several rows: the other end could be inside too and flip the parity.', 'একাধিক সারি জুড়ে আয়তক্ষেত্র নিয়ে বাইনারি সার্চ: অন্য প্রান্তও ভেতরে পড়ে জোড়-বিজোড় উল্টে দিতে পারে।'),
    L('Swapping x and y: the first coordinate is the row, the second the column.', 'x আর y অদলবদল: প্রথম স্থানাঙ্ক সারি, দ্বিতীয়টি কলাম।'),
  ],
  related: [
    { id: '1797C', name: 'Li Hua and Chess', why: L('Locating hidden cells on a grid with few questions.', 'কম প্রশ্নে গ্রিডে লুকানো ঘর খোঁজা।') },
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Parity of a count steering a binary search.', 'গণনার জোড়-বিজোড় দিয়ে বাইনারি সার্চ চালানো।') },
  ],
  toolkit: ['io-basics', 'vector', 'binary-search'],
};

// ───────────────────────────────────────────── 1363D
export const p1363D: ProblemEntry = {
  id: '1363D',
  contestId: 1363,
  index: 'D',
  name: 'Guess The Maximums',
  rating: 2000,
  interactive: true,
  tags: ['binary-search', 'interactive', 'math'],
  why: L(
    'The overall maximum is the answer for every subset except the one that contains it. Find the maximum, binary search for where it sits, and spend one more question on the single subset that needs a different value.',
    'সর্বোচ্চ মানটিই প্রতিটি সাবসেটের উত্তর, শুধু যে সাবসেটে সেটি আছে তা বাদে। সর্বোচ্চ খোঁজো, বাইনারি সার্চে তার অবস্থান বের করো, আর যে একটি সাবসেটের ভিন্ন মান লাগে তার জন্য আরেকটি প্রশ্ন খরচ করো।',
  ),
  statement: L(
    'The judge hides an array a of n positive integers and sends you k disjoint subsets of the positions 1 … n that together cover all positions. A question "? c i₁ … i_c" is answered with the maximum of a over those c positions. With at most 12 questions, print "! m₁ … m_k" where m_j is the maximum of a over all positions NOT in subset j. (On Codeforces the judge then answers "Correct" or "Incorrect", and one run has several test cases; ours plays one case, and the program should still read the verdict.)',
    'জাজ n টি ধনাত্মক পূর্ণসংখ্যার একটি অ্যারে a লুকিয়েছে আর ১ … n অবস্থানের k টি আলাদা সাবসেট পাঠায় যা মিলে সব অবস্থান ঢাকে। প্রশ্ন "? c i₁ … i_c"-র উত্তর ওই c অবস্থানে a-র সর্বোচ্চ। সর্বোচ্চ ১২ প্রশ্নে "! m₁ … m_k" প্রিন্ট করো যেখানে m_j হলো সাবসেট j-এর বাইরের সব অবস্থানে a-র সর্বোচ্চ। (কোডফোর্সেসে জাজ এরপর "Correct" বা "Incorrect" বলে, আর একটি রানে কয়েকটি টেস্ট থাকে; আমাদেরটি একটি টেস্ট খেলে, তবু প্রোগ্রামের রায় পড়া উচিত।)',
  ),
  input: L('First line: the number of test cases (1 here). Then n and k, then k lines "c i₁ … i_c". After each question, one integer: the maximum.', 'প্রথম লাইনে টেস্টের সংখ্যা (এখানে ১)। তারপর n আর k, তারপর k টি লাইন "c i₁ … i_c"। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: সর্বোচ্চ।'),
  output: L('Questions "? c i₁ … i_c", then "! m₁ … m_k". Flush after every line.', 'প্রশ্ন "? c i₁ … i_c", শেষে "! m₁ … m_k"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ k ≤ n ≤ 1000, values up to 10⁹, at most 12 questions per test case', '২ ≤ k ≤ n ≤ ১০০০, মান সর্বোচ্চ ১০⁹, প্রতি টেস্টে সর্বোচ্চ ১২ প্রশ্ন')] },
  samples: [
    {
      input: '4 2\n2 1 3\n2 2 4\n5 1 2 9',
      output: 'OK',
      transcript: '< 1\n< 4 2\n< 2 1 3\n< 2 2 4\n> ? 4 1 2 3 4\n< 9\n> ? 2 1 2\n< 5\n> ? 1 3\n< 2\n> ? 2 1 3\n< 5\n> ! 9 5',
      explain: L('The array is 5 1 2 9. The maximum 9 comes from the first question. Prefix {1, 2} has maximum 5, not 9, then {3} has 2, so the 9 is at position 4, which lies in subset 2. Asking everything outside subset 2, positions 1 and 3, gives 5. So subset 1 gets 9 and subset 2 gets 5. ' + made.en, 'অ্যারে ৫ ১ ২ ৯। প্রথম প্রশ্ন থেকে সর্বোচ্চ ৯। প্রিফিক্স {১, ২}-এর সর্বোচ্চ ৫, ৯ নয়, তারপর {৩}-এর ২, তাই ৯ আছে ৪ নম্বর অবস্থানে, যা সাবসেট ২-এ। সাবসেট ২-এর বাইরে, অবস্থান ১ ও ৩, জিজ্ঞেস করে ৫ পাওয়া যায়। তাই সাবসেট ১ পায় ৯ আর সাবসেট ২ পায় ৫। ' + made.bn),
    },
  ],
  observation: L(
    'Let M be the maximum of the whole array. For a subset that does not contain a position of M, "everything outside it" still includes M, so the answer is M. A position holding M belongs to exactly one subset S; only for S can the answer be smaller, and one question about the complement of S gives it. (If M also occurs outside S the same question returns M, which is right.)',
    'ধরো পুরো অ্যারের সর্বোচ্চ M। যে সাবসেটে M-এর কোনো অবস্থান নেই, তার "বাইরের সবকিছু"-তে M আছে, তাই উত্তর M। M-ধারী একটি অবস্থান ঠিক একটি সাবসেট S-এ পড়ে; শুধু S-এর উত্তরই ছোট হতে পারে, আর S-এর পূরকের একটি প্রশ্নেই তা পাওয়া যায়। (M যদি S-এর বাইরেও থাকে একই প্রশ্ন M দেয়, যা সঠিক।)',
  ),
  approach: [
    L('Ask all positions 1 … n: M.', 'সব অবস্থান ১ … n জিজ্ঞেস করো: M।'),
    L('Binary search a position p of M: keep a window [lo, hi] that still contains M; ask the left half [lo, mid]; if it returns M, keep the left half, otherwise the right half. At most ⌈log₂ 1000⌉ = 10 questions.', 'M-এর একটি অবস্থান p বাইনারি সার্চে খোঁজো: M আছে এমন জানালা [lo, hi] রাখো; বাঁ অর্ধেক [lo, mid] জিজ্ঞেস করো; M এলে বাঁ অর্ধেক রাখো, নয়তো ডান। সর্বোচ্চ ⌈log₂ ১০০০⌉ = ১০ প্রশ্ন।'),
    L('Let S be the subset containing p. Ask every position outside S: that is the answer for S.', 'p যে সাবসেট S-এ, সেটি ধরো। S-এর বাইরের সব অবস্থান জিজ্ঞেস করো: সেটিই S-এর উত্তর।'),
    L('Print M for every other subset. Total: 1 + 10 + 1 = 12 questions.', 'অন্য সব সাবসেটের জন্য M প্রিন্ট করো। মোট: ১ + ১০ + ১ = ১২ প্রশ্ন।'),
  ],
  walkthrough: {
    input: '4 2\n2 1 3\n2 2 4\n5 1 2 9',
    steps: [
      { state: 'all → 9', text: L('M = 9.', 'M = ৯।') },
      { state: '{1,2} → 5, {3} → 2', text: L('Neither half returns 9, so the window moves right to position 4.', 'কোনো অর্ধেকই ৯ দেয়নি, তাই জানালা ডানে ৪ নম্বরে যায়।') },
      { state: 'outside subset 2 → 5', text: L('Position 4 is in subset 2, whose answer is the maximum of {1, 3} = 5. Subset 1 gets 9.', '৪ নম্বর সাবসেট ২-এ, যার উত্তর {১, ৩}-এর সর্বোচ্চ = ৫। সাবসেট ১ পায় ৯।') },
    ],
  },
  complexity: { time: 'O(n log n) work, 12 questions', space: 'O(n)', why: L('Every question lists up to n positions; there are at most 12.', 'প্রতিটি প্রশ্নে সর্বোচ্চ n অবস্থান; প্রশ্ন সর্বোচ্চ ১২।') },
  solutions: [
    {
      id: 'locate',
      kind: 'optimal',
      title: L('Find the maximum, locate it, fix its subset', 'সর্বোচ্চ খুঁজে, অবস্থান বের করে, তার সাবসেট ঠিক করা'),
      idea: L('Only one subset can differ from the global maximum.', 'শুধু একটি সাবসেটই বৈশ্বিক সর্বোচ্চ থেকে আলাদা হতে পারে।'),
      explain: [
        L('The binary search never needs distinct values: any position holding M works, and the complement question gives the right answer either way.', 'বাইনারি সার্চে ভিন্ন মান লাগে না: M-ধারী যেকোনো অবস্থানই চলে, আর পূরকের প্রশ্ন দুই ক্ষেত্রেই সঠিক উত্তর দেয়।'),
        L('The budget is exactly 12 when n = 1000: the first and last question plus ten halvings.', 'n = ১০০০-এ বাজেট ঠিক ১২: প্রথম ও শেষ প্রশ্ন আর দশটি অর্ধেক করা।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(const vector<int>& v) {
    cout << "? " << v.size();
    for (int x : v) cout << " " << x;
    cout << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<int> owner(n + 1);
        for (int i = 0; i < k; i++) {
            int c;
            cin >> c;
            for (int j = 0; j < c; j++) {
                int x;
                cin >> x;
                owner[x] = i;
            }
        }
        vector<int> all(n);
        iota(all.begin(), all.end(), 1);
        int M = ask(all);
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            vector<int> half;
            for (int i = lo; i <= mid; i++) half.push_back(i);
            if (ask(half) == M) hi = mid;
            else lo = mid + 1;
        }
        int s = owner[lo];
        vector<int> outside;
        for (int i = 1; i <= n; i++)
            if (owner[i] != s) outside.push_back(i);
        vector<int> ans(k, M);
        ans[s] = ask(outside);
        cout << "!";
        for (int x : ans) cout << " " << x;
        cout << endl;
        string verdict;
        cin >> verdict;
    }
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'binary-search', 'min-max'],
    },
    {
      id: 'complements',
      kind: 'brute',
      title: L('Ask the complement of every subset', 'প্রতিটি সাবসেটের পূরক জিজ্ঞেস'),
      idea: L('k questions, each directly the answer: right for k ≤ 12, over budget beyond.', 'k টি প্রশ্ন, প্রতিটিই সরাসরি উত্তর: k ≤ ১২ হলে ঠিক, তার বেশিতে বাজেটের বাইরে।'),
      explain: [L('This is the first thing anyone writes. It shows what is being asked and is a correct reference, but k can reach n, so the limit of 12 forces the idea of finding the maximum once.', 'সবাই প্রথমে এটিই লেখে। কী চাওয়া হচ্ছে তা বোঝায় আর এটি সঠিক রেফারেন্স, কিন্তু k n পর্যন্ত হতে পারে, তাই ১২-র সীমা একবারই সর্বোচ্চ খোঁজার ধারণা বাধ্যতামূলক করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, k;
        cin >> n >> k;
        vector<int> owner(n + 1);
        for (int i = 0; i < k; i++) {
            int c;
            cin >> c;
            for (int j = 0; j < c; j++) {
                int x;
                cin >> x;
                owner[x] = i;
            }
        }
        vector<int> ans(k);
        for (int s = 0; s < k; s++) {
            vector<int> outside;
            for (int i = 1; i <= n; i++)
                if (owner[i] != s) outside.push_back(i);
            cout << "? " << outside.size();
            for (int x : outside) cout << " " << x;
            cout << endl;
            cin >> ans[s];
        }
        cout << "!";
        for (int x : ans) cout << " " << x;
        cout << endl;
        string verdict;
        cin >> verdict;
    }
}
`,
      time: 'O(k · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics', 'vector'],
    },
  ],
  tests: [
    { input: '2 2\n1 1\n1 2\n5 7', output: 'OK', source: 'own', note: L('The smallest case.', 'সবচেয়ে ছোট কেস।') },
    { input: '3 3\n1 1\n1 2\n1 3\n4 4 4', output: 'OK', source: 'own', note: L('Equal values: the maximum occurs in every subset.', 'সমান মান: সর্বোচ্চ প্রতিটি সাবসেটে আছে।') },
    { input: '5 2\n4 1 2 3 4\n1 5\n1 2 3 4 9', output: 'OK', source: 'own', note: L('The maximum is alone in its subset.', 'সর্বোচ্চ নিজের সাবসেটে একা।') },
    { input: '6 3\n2 1 6\n2 2 5\n2 3 4\n10 20 30 40 50 60', output: 'OK', source: 'own', note: L('Interleaved subsets with increasing values.', 'ক্রমবর্ধমান মানসহ মিশ্র সাবসেট।') },
    { input: '5 5\n1 5\n1 4\n1 3\n1 2\n1 1\n3 9 9 9 2', output: 'OK', source: 'own', note: L('k = n with repeated maxima: the brute force would need five questions here, the real solution still three plus the search.', 'k = n আর পুনরাবৃত্ত সর্বোচ্চ: ব্রুট ফোর্সে এখানে পাঁচ প্রশ্ন লাগত, আসল সমাধানে তিন আর সার্চ।') },
  ],
  pitfalls: [
    L('Searching on the whole prefix [1, mid] when the window starts at lo > 1: the left half must be [lo, mid], or an old maximum outside the window fools you.', 'জানালা lo > ১ থেকে শুরু হলেও পুরো প্রিফিক্স [১, mid] নিয়ে সার্চ: বাঁ অর্ধেক [lo, mid]-ই হতে হবে, নয়তো জানালার বাইরের পুরনো সর্বোচ্চ বিভ্রান্ত করে।'),
    L('Reporting the position of the maximum instead of the values: the output is k maximums, one per subset.', 'মানের বদলে সর্বোচ্চের অবস্থান জানানো: আউটপুট k টি সর্বোচ্চ, প্রতি সাবসেটে একটি।'),
    L('Forgetting to read the verdict line after "!": with several test cases the next read would take "Correct" for n.', '"!"-এর পর রায়ের লাইন না পড়া: কয়েকটি টেস্ট থাকলে পরের পড়া "Correct"-কে n ধরবে।'),
    L('Asking an empty subset: c must be at least 1.', 'খালি সাবসেট জিজ্ঞেস: c অন্তত ১ হতে হবে।'),
  ],
  related: [
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('Another search for a maximum with a small budget.', 'ছোট বাজেটে সর্বোচ্চ খোঁজার আরেকটি সার্চ।') },
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Binary search steered by a count.', 'গণনা দিয়ে চালিত বাইনারি সার্চ।') },
  ],
  toolkit: ['io-basics', 'vector', 'binary-search', 'min-max'],
};
