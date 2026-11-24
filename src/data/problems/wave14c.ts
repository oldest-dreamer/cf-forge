import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');

export const p1265E: ProblemEntry = {
  id: '1265E',
  contestId: 1265,
  index: 'E',
  name: 'Beautiful Mirrors',
  rating: 2100,
  tags: ['dp', 'math', 'probabilities'],
  featuredFor: ['probabilities'],
  why: L('Expected value with restarts: a linear recurrence for the expectation, computed modulo a prime.', 'আবার শুরুসহ প্রত্যাশিত মান: প্রত্যাশার জন্য একটি রৈখিক পুনরাবৃত্তি, একটি মৌলিক মডুলো হিসাব।'),
  statement: L('Every day Creatnx asks the next mirror; mirror i says “beautiful” with probability pᵢ / 100. A yes moves him to mirror i + 1 (after mirror n he stops happily); a no sends him back to mirror 1 the next day. Find the expected number of days, modulo 998244353.', 'প্রতিদিন ক্রিয়েটনক্স পরের আয়নাকে জিজ্ঞেস করে; আয়না i pᵢ / ১০০ সম্ভাবনায় “সুন্দর” বলে। হ্যাঁ তাকে আয়না i + ১-এ নেয় (আয়না n-এর পরে সে খুশি হয়ে থামে); না পরদিন তাকে আয়না ১-এ ফেরত পাঠায়। প্রত্যাশিত দিনের সংখ্যা ৯৯৮২৪৪৩৫৩ মডুলো বের করুন।'),
  input: L('n, then p₁ … pₙ.', 'n, তারপর p₁ … pₙ।'),
  output: L('The expectation as p · q⁻¹ mod 998244353.', 'প্রত্যাশা p · q⁻¹ mod ৯৯৮২৪৪৩৫৩ হিসেবে।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 2·10⁵, 1 ≤ pᵢ ≤ 100', 'n ≤ ২·১০⁵, ১ ≤ pᵢ ≤ ১০০')] },
  samples: [
    { input: '1\n50', output: '2', explain: L('A geometric wait with success 1/2: 2 days.', '১/২ সাফল্যের জ্যামিতিক অপেক্ষা: ২ দিন।') },
    { input: '3\n10 20 50', output: '112', explain: L('(1 + 0.1 + 0.02) / 0.01 = 112.', '(১ + ০.১ + ০.০২) / ০.০১ = ১১২।') },
  ],
  observation: L('Let eᵢ be the expected days to have passed mirrors 1 … i. To pass mirror i you first pass 1 … i − 1, then spend one day; with probability 1 − pᵢ you must start over: eᵢ = eᵢ₋₁ + 1 + (1 − pᵢ) eᵢ, so eᵢ = (eᵢ₋₁ + 1) / pᵢ.', 'eᵢ হলো আয়না ১ … i পেরোনোর প্রত্যাশিত দিন। আয়না i পেরোতে আগে ১ … i − ১ পেরোন, তারপর একদিন; ১ − pᵢ সম্ভাবনায় আবার শুরু: eᵢ = eᵢ₋₁ + ১ + (১ − pᵢ) eᵢ, তাই eᵢ = (eᵢ₋₁ + ১) / pᵢ।'),
  approach: [L('Iterate e with modular inverses of pᵢ / 100.', 'pᵢ / ১০০-এর মডুলার ইনভার্স দিয়ে e পুনরাবৃত্তি।')],
  walkthrough: { input: '10 20 50', steps: [{ state: 'e₁ = 1/0.1 = 10, e₂ = 11/0.2 = 55, e₃ = 56/0.5 = 112', text: L('112.', '১১২।') }] },
  complexity: { time: 'O(n log p)', space: 'O(1)', why: L('One inverse per mirror.', 'প্রতি আয়নায় একটি ইনভার্স।') },
  solutions: [
    {
      id: 'recurrence',
      kind: 'optimal',
      title: L('eᵢ = (eᵢ₋₁ + 1) / pᵢ', 'eᵢ = (eᵢ₋₁ + ১) / pᵢ'),
      idea: L('Solve the self-referencing equation for eᵢ.', 'eᵢ-এর স্ব-উল্লেখকারী সমীকরণ সমাধান।'),
      explain: [L('Expected values that “restart” lead to equations where the unknown appears on both sides; solving for it gives a clean recurrence. Division becomes multiplication by a modular inverse.', '“আবার শুরু” করা প্রত্যাশিত মান এমন সমীকরণ দেয় যেখানে অজানা দুই দিকে আসে; তার জন্য সমাধান একটি পরিষ্কার পুনরাবৃত্তি দেয়। ভাগ মডুলার ইনভার্স দিয়ে গুণে পরিণত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int n;
    scanf("%d", &n);
    long long inv100 = power(100, MOD - 2), e = 0;
    for (int i = 0; i < n; i++) {
        long long p;
        scanf("%lld", &p);
        long long prob = p * inv100 % MOD;
        e = (e + 1) % MOD * power(prob, MOD - 2) % MOD;
    }
    printf("%lld\n", e);
    return 0;
}
`,
      time: 'O(n log p)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow', 'mod-arith'],
    },
    {
      id: 'closed-form',
      kind: 'method',
      title: L('Closed form with one inverse', 'একটি ইনভার্সসহ সরাসরি সূত্র'),
      idea: L('E = (1 + p₁ + p₁p₂ + … + p₁…pₙ₋₁) / (p₁…pₙ).', 'E = (১ + p₁ + p₁p₂ + … + p₁…pₙ₋₁) / (p₁…pₙ)।'),
      explain: [L('Unrolling the recurrence gives a ratio of two sums of prefix products; computing it in integers (with pᵢ as percentages) needs a single modular inverse at the end.', 'পুনরাবৃত্তি খুললে প্রিফিক্স গুণফলের দুটি যোগফলের অনুপাত আসে; পূর্ণসংখ্যায় (pᵢ শতাংশ হিসেবে) হিসাব করলে শেষে একটি মডুলার ইনভার্স লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int n;
    scanf("%d", &n);
    long long inv100 = power(100, MOD - 2);
    long long num = 0, prod = 1;
    for (int i = 0; i < n; i++) {
        long long p;
        scanf("%lld", &p);
        num = (num + prod) % MOD;              // 1 + p1 + p1 p2 + ...
        prod = prod * (p * inv100 % MOD) % MOD;
    }
    printf("%lld\n", num * power(prod, MOD - 2) % MOD);
    return 0;
}
`,
      time: 'O(n + log p)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Solve the Markov chain directly', 'মার্কভ চেইন সরাসরি সমাধান'),
      idea: L('Eᵢ = 1 + pᵢ Eᵢ₊₁ + (1 − pᵢ) E₁ for every state; Gaussian elimination mod p.', 'প্রতিটি অবস্থার জন্য Eᵢ = ১ + pᵢ Eᵢ₊₁ + (১ − pᵢ) E₁; mod p-তে গাউসীয় বিলোপন।'),
      explain: [L('The general method for expected hitting times: one linear equation per state. O(n³), so tiny n only, but it uses no clever unrolling.', 'প্রত্যাশিত পৌঁছানোর সময়ের সাধারণ পদ্ধতি: প্রতি অবস্থায় একটি রৈখিক সমীকরণ। O(n³), তাই শুধু ক্ষুদ্র n, কিন্তু কোনো চতুর খোলা ব্যবহার করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;
long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int n;
    cin >> n;
    vector<long long> p(n);
    long long inv100 = power(100, MOD - 2);
    for (auto& x : p) { cin >> x; x = x * inv100 % MOD; }
    if (n > 60) { cout << "\n"; return 0; }
    // unknowns E_0 .. E_{n-1} (E_n = 0): E_i - p_i E_{i+1} - (1 - p_i) E_0 = 1
    vector<vector<long long>> A(n, vector<long long>(n + 1, 0));
    for (int i = 0; i < n; i++) {
        A[i][i] = (A[i][i] + 1) % MOD;
        if (i + 1 < n) A[i][i + 1] = (A[i][i + 1] - p[i] + MOD) % MOD;
        A[i][0] = (A[i][0] - (1 - p[i] + MOD) % MOD + MOD) % MOD;
        A[i][n] = 1;
    }
    for (int c = 0; c < n; c++) {
        int piv = c;
        while (A[piv][c] == 0) piv++;
        swap(A[c], A[piv]);
        long long inv = power(A[c][c], MOD - 2);
        for (auto& x : A[c]) x = x * inv % MOD;
        for (int r = 0; r < n; r++)
            if (r != c && A[r][c]) {
                long long f = A[r][c];
                for (int k = 0; k <= n; k++) A[r][k] = (A[r][k] - f * A[c][k] % MOD + MOD) % MOD;
            }
    }
    cout << A[0][n] << "\n";
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n²)',
      accepted: false,
      toolkit: ['mod-pow', 'vector'],
    },
  ],
  tests: [
    { input: '1\n50', output: '2', source: 'sample', note: sample(1) },
    { input: '3\n10 20 50', output: '112', source: 'sample', note: sample(2) },
    { input: '2\n100 100', output: '2', source: 'own', note: L('Certain success: one day per mirror.', 'নিশ্চিত সাফল্য: প্রতি আয়নায় একদিন।') },
  ],
  pitfalls: [L('Using doubles: the answer must be exact modulo a prime.', 'double ব্যবহার: উত্তর একটি মৌলিক মডুলো নিখুঁত হতে হবে।')],
  related: [{ id: '518D', name: 'Ilya and Escalator', why: L('Probability DP.', 'সম্ভাবনার DP।') }],
  toolkit: ['mod-pow'],
};

export const p518D: ProblemEntry = {
  id: '518D',
  contestId: 518,
  index: 'D',
  name: 'Ilya and Escalator',
  rating: 1700,
  tags: ['combinatorics', 'dp', 'math', 'probabilities'],
  why: L('A probability DP over (time, people already on), then linearity: the expectation is Σ j · P(j).', '(সময়, ইতিমধ্যে ওঠা মানুষ)-এর ওপর সম্ভাবনার DP, তারপর রৈখিকতা: প্রত্যাশা Σ j · P(j)।'),
  statement: L('n people queue for an escalator. Each second, with probability p the first person in the queue steps on (and never leaves); otherwise nobody moves. Find the expected number of people on the escalator after t seconds.', 'n-জন মানুষ একটি এসকেলেটরের সারিতে। প্রতি সেকেন্ডে p সম্ভাবনায় সারির প্রথম জন ওঠে (আর কখনো নামে না); নইলে কেউ সরে না। t সেকেন্ড পরে এসকেলেটরে প্রত্যাশিত মানুষের সংখ্যা বের করুন।'),
  input: L('n p t.', 'n p t।'),
  output: L('The expected number.', 'প্রত্যাশিত সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n, t ≤ 2000', 'n, t ≤ ২০০০'), realAnswer] },
  samples: [
    { input: '1 0.50 1', output: '0.5', explain: L('One coin flip.', 'একটি মুদ্রা নিক্ষেপ।') },
    { input: '1 0.50 4', output: '0.9375', explain: L('1 − 0.5⁴.', '১ − ০.৫⁴।') },
    { input: '4 0.20 2', output: '0.4', explain: L('2 · 0.2.', '২ · ০.২।') },
  ],
  observation: L('dp[i][j] = probability that after i seconds exactly j people are on. From j < n: j + 1 with p, j with 1 − p; j = n stays. Answer Σ j · dp[t][j].', 'dp[i][j] = i সেকেন্ড পরে ঠিক j জন ওঠার সম্ভাবনা। j < n থেকে: p-তে j + ১, ১ − p-তে j; j = n থাকে। উত্তর Σ j · dp[t][j]।'),
  approach: [L('O(n · t) DP with two rows.', 'দুটি সারিসহ O(n · t) DP।')],
  walkthrough: { input: '1 0.5 4', steps: [{ state: 'P(still 0) = 0.5⁴ = 0.0625', text: L('Expected = 1 · 0.9375.', 'প্রত্যাশা = ১ · ০.৯৩৭৫।') }] },
  complexity: { time: 'O(n · t)', space: 'O(n)', why: L('4·10⁶ transitions.', '৪·১০⁶টি রূপান্তর।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Probability DP', 'সম্ভাবনার DP'),
      idea: L('Distribute probability mass each second.', 'প্রতি সেকেন্ডে সম্ভাবনার ভর বণ্টন।'),
      explain: [L('A forward probability DP is the safest way to handle a capped process: the cap at n people is just a state that keeps its mass.', 'সীমাযুক্ত প্রক্রিয়া সামলানোর সবচেয়ে নিরাপদ উপায় একটি সামনের সম্ভাবনার DP: n জনের সীমা শুধু একটি অবস্থা যা তার ভর রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    double p;
    cin >> n >> p >> t;
    vector<double> cur(n + 1, 0.0), nxt(n + 1);
    cur[0] = 1;
    for (int i = 0; i < t; i++) {
        fill(nxt.begin(), nxt.end(), 0.0);
        for (int j = 0; j <= n; j++) {
            if (j == n) { nxt[n] += cur[n]; continue; }
            nxt[j + 1] += cur[j] * p;
            nxt[j] += cur[j] * (1 - p);
        }
        swap(cur, nxt);
    }
    double e = 0;
    for (int j = 0; j <= n; j++) e += j * cur[j];
    printf("%.10f\n", e);
    return 0;
}
`,
      time: 'O(n · t)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'vector'],
    },
    {
      id: 'binomial',
      kind: 'method',
      title: L('Binomial distribution, capped', 'সীমাযুক্ত দ্বিপদ বণ্টন'),
      idea: L('Without the cap, the count is Binomial(t, p); every outcome ≥ n counts as n.', 'সীমা ছাড়া গণনা Binomial(t, p); n-এর সমান বা বেশি প্রতিটি ফল n হিসেবে গোনে।'),
      explain: [L('Each second is an independent trial until the queue empties, so P(j) = C(t, j) pʲ (1 − p)^(t − j) for j < n, and the rest of the mass sits at n. Binomials are built iteratively in doubles to avoid overflow.', 'সারি খালি না হওয়া পর্যন্ত প্রতিটি সেকেন্ড একটি স্বাধীন পরীক্ষা, তাই j < n-এর জন্য P(j) = C(t, j) pʲ (১ − p)^(t − j), আর বাকি ভর n-এ। ওভারফ্লো এড়াতে দ্বিপদ double-এ ধাপে ধাপে বানানো হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    double p;
    cin >> n >> p >> t;
    // P(j) for j = 0..t via log-binomials
    vector<double> lf(t + 1, 0.0);
    for (int i = 1; i <= t; i++) lf[i] = lf[i - 1] + log((double)i);
    double e = 0, below = 0;
    for (int j = 0; j < n && j <= t; j++) {
        double pr;
        if (p == 0) pr = (j == 0);
        else if (p == 1) pr = (j == t);
        else pr = exp(lf[t] - lf[j] - lf[t - j] + j * log(p) + (t - j) * log(1 - p));
        e += j * pr;
        below += pr;
    }
    e += n * max(0.0, 1 - below);
    printf("%.10f\n", e);
    return 0;
}
`,
      time: 'O(t)',
      space: 'O(t)',
      accepted: true,
      toolkit: ['setprecision', 'for-loop'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All 2ᵗ histories', 'সব ২ᵗ ইতিহাস'),
      idea: L('Enumerate every sequence of successes and failures.', 'সাফল্য আর ব্যর্থতার প্রতিটি ক্রম গণনা।'),
      explain: [L('Exponential in t: only tiny inputs.', 't-এ সূচকীয়: শুধু ক্ষুদ্র ইনপুট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, t;
    double p;
    cin >> n >> p >> t;
    if (t > 20) { cout << "\n"; return 0; }
    double e = 0;
    for (int mask = 0; mask < (1 << t); mask++) {
        double pr = 1;
        int on = 0;
        for (int i = 0; i < t; i++) {
            bool step = mask >> i & 1;
            if (on == n) { if (step) { pr = 0; break; } continue; }  // nothing happens once the queue is empty
            pr *= step ? p : 1 - p;
            on += step;
        }
        e += pr * on;
    }
    printf("%.10f\n", e);
    return 0;
}
`,
      time: 'O(2ᵗ · t)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '1 0.50 1', output: '0.5', source: 'sample', note: sample(1) },
    { input: '1 0.50 4', output: '0.9375', source: 'sample', note: sample(2) },
    { input: '4 0.20 2', output: '0.4', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Ignoring the cap at n people.', 'n জনের সীমা উপেক্ষা।')],
  related: [{ id: '148D', name: 'Bag of mice', why: L('Probability DP.', 'সম্ভাবনার DP।') }],
  toolkit: ['setprecision'],
};

export const p148D: ProblemEntry = {
  id: '148D',
  contestId: 148,
  index: 'D',
  name: 'Bag of mice',
  rating: 1800,
  tags: ['dp', 'games', 'math', 'probabilities'],
  why: L('A two-player probability DP on (white, black) mice left.', 'বাকি (সাদা, কালো) ইঁদুরের ওপর দুই খেলোয়াড়ের সম্ভাবনার DP।'),
  statement: L('A bag has w white and b black mice. The princess draws first, then the dragon, alternately; whoever draws a white mouse first wins. After each dragon draw, one more random mouse jumps out of the bag. If the bag empties with no white drawn, the dragon wins. Find the probability that the princess wins.', 'একটি থলিতে w-টি সাদা আর b-টি কালো ইঁদুর। রাজকন্যা আগে তোলে, তারপর ড্রাগন, পালাক্রমে; যে আগে সাদা তোলে সে জেতে। প্রতিটি ড্রাগনের তোলার পরে আরও একটি এলোমেলো ইঁদুর থলি থেকে লাফিয়ে বের হয়। সাদা না তুলে থলি খালি হলে ড্রাগন জেতে। রাজকন্যার জেতার সম্ভাবনা বের করুন।'),
  input: L('w b.', 'w b।'),
  output: L('The probability.', 'সম্ভাবনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('w, b ≤ 1000', 'w, b ≤ ১০০০'), realAnswer] },
  samples: [
    { input: '1 3', output: '0.500000000', explain: L('The princess draws the white with 1/4, or later.', 'রাজকন্যা ১/৪-এ বা পরে সাদা তোলে।') },
    { input: '5 5', output: '0.658730159', explain: L('A larger bag.', 'বড় থলি।') },
  ],
  observation: L('P[w][b] = probability the princess wins when it is her turn. She wins at once with w / (w + b). Otherwise she draws black, then the dragon must also draw black, then a mouse jumps: white (→ P[w − 1][b − 2]) or black (→ P[w][b − 3]).', 'P[w][b] = রাজকন্যার পালায় তার জেতার সম্ভাবনা। সে w / (w + b)-তে সঙ্গে সঙ্গে জেতে। নইলে সে কালো তোলে, তারপর ড্রাগনকেও কালো তুলতে হয়, তারপর একটি ইঁদুর লাফায়: সাদা (→ P[w − ১][b − ২]) বা কালো (→ P[w][b − ৩])।'),
  approach: [L('Bottom-up DP over w and b.', 'w আর b-এর ওপর নিচ থেকে ওপরে DP।')],
  walkthrough: { input: '1 3', steps: [{ state: 'P = 1/4 + 3/4 · 2/3 · (jump: white 1/2 → 0, black 1/2 → P[1][0] = 1)', text: L('1/4 + 1/2 · 1/2 = 0.5.', '১/৪ + ১/২ · ১/২ = ০.৫।') }] },
  complexity: { time: 'O(w · b)', space: 'O(w · b)', why: L('10⁶ states.', '১০⁶টি অবস্থা।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('DP over (white, black)', '(সাদা, কালো)-এর ওপর DP'),
      idea: L('Condition on each random event in turn.', 'প্রতিটি এলোমেলো ঘটনার ওপর পালাক্রমে শর্ত।'),
      explain: [L('Multiply probabilities along each branch and add the branches: the law of total probability, written as a DP.', 'প্রতিটি শাখা ধরে সম্ভাবনা গুণ করে শাখাগুলো যোগ: মোট সম্ভাবনার সূত্র, DP হিসেবে লেখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int W, B;
    cin >> W >> B;
    vector<vector<double>> P(W + 1, vector<double>(B + 1, 0.0));
    for (int w = 1; w <= W; w++) P[w][0] = 1;
    for (int w = 1; w <= W; w++)
        for (int b = 1; b <= B; b++) {
            double tot = w + b;
            double res = w / tot;
            if (b >= 2) {
                double both = (b / tot) * ((b - 1) / (tot - 1));  // princess black, dragon black
                double rest = tot - 2;
                if (rest > 0) {
                    res += both * (w / rest) * P[w - 1][b - 2];
                    if (b >= 3) res += both * ((b - 2) / rest) * P[w][b - 3];
                }
            }
            P[w][b] = res;
        }
    printf("%.9f\n", P[W][B]);
    return 0;
}
`,
      time: 'O(w · b)',
      space: 'O(w · b)',
      accepted: true,
      toolkit: ['setprecision', 'vector'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Memoised recursion over turns', 'পালার ওপর মেমোসহ রিকার্শন'),
      idea: L('win(w, b, whoseTurn): princess and dragon draws handled as separate states.', 'win(w, b, কার পালা): রাজকন্যা আর ড্রাগনের তোলা আলাদা অবস্থা।'),
      explain: [L('Modelling each draw as its own state (instead of merging the dragon’s turn and the jump into one step) is closer to the story and easier to trust.', 'প্রতিটি তোলাকে নিজস্ব অবস্থা হিসেবে মডেল (ড্রাগনের পালা আর লাফকে এক ধাপে না মিলিয়ে) গল্পের কাছাকাছি আর বিশ্বাস করা সহজ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

map<tuple<int, int, int>, double> memo;

double princess(int w, int b, int turn) {  // probability the princess wins
    if (w == 0) return 0;
    if (w + b == 0) return 0;
    auto key = make_tuple(w, b, turn);
    auto it = memo.find(key);
    if (it != memo.end()) return it->second;
    double tot = w + b, r;
    if (turn == 0) r = w / tot + (b ? b / tot * princess(w, b - 1, 1) : 0);
    else {
        r = 0;  // dragon wins on white
        if (b) {
            int w2 = w, b2 = b - 1;
            double t2 = w2 + b2;
            if (t2 == 0) r = 0;
            else r = b / tot * (w2 / t2 * princess(w2 - 1, b2, 0) + (b2 ? b2 / t2 * princess(w2, b2 - 1, 0) : 0));
        }
    }
    return memo[key] = r;
}

int main() {
    int w, b;
    cin >> w >> b;
    if (w + b > 400) { cout << "\n"; return 0; }
    printf("%.9f\n", princess(w, b, 0));
    return 0;
}
`,
      time: 'O(w · b log)',
      space: 'O(w · b)',
      accepted: true,
      toolkit: ['map', 'functions'],
    },
  ],
  tests: [
    { input: '1 3', output: '0.500000000', source: 'sample', note: sample(1) },
    { input: '5 5', output: '0.658730159', source: 'sample', note: sample(2) },
    { input: '0 3', output: '0.000000000', source: 'own', note: L('No white mice.', 'কোনো সাদা ইঁদুর নেই।') },
  ],
  pitfalls: [L('Forgetting the mouse that jumps out after the dragon’s draw.', 'ড্রাগনের তোলার পরে লাফিয়ে বের হওয়া ইঁদুর ভুলে যাওয়া।')],
  related: [{ id: '518D', name: 'Ilya and Escalator', why: L('Probability DP.', 'সম্ভাবনার DP।') }],
  toolkit: ['setprecision'],
};

export const p839C: ProblemEntry = {
  id: '839C',
  contestId: 839,
  index: 'C',
  name: 'Journey',
  rating: 1500,
  tags: ['dfs', 'dp', 'graphs', 'probabilities', 'trees'],
  why: L('Expected depth of a random root-to-leaf walk: average the children’s expectations plus one.', 'এলোমেলো মূল-থেকে-পাতা হাঁটার প্রত্যাশিত গভীরতা: সন্তানদের প্রত্যাশার গড় যোগ এক।'),
  statement: L('A horse starts at city 1 of a tree and each step moves to a uniformly random neighbouring city it has not visited, stopping when there is none. Find the expected length of the journey.', 'একটি ঘোড়া একটি ট্রির শহর ১ থেকে শুরু করে প্রতি ধাপে একটি সমান সম্ভাব্য অদেখা প্রতিবেশী শহরে যায়, না থাকলে থামে। যাত্রার প্রত্যাশিত দৈর্ঘ্য বের করুন।'),
  input: L('n, then n − 1 edges.', 'n, তারপর n − ১টি প্রান্ত।'),
  output: L('The expected length.', 'প্রত্যাশিত দৈর্ঘ্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10⁵', 'n ≤ ১০⁵'), realAnswer] },
  samples: [
    { input: '4\n1 2\n1 3\n2 4', output: '1.500000000000000', explain: L('Half the time it goes 1–3 (length 1), half the time 1–2–4 (length 2).', 'অর্ধেক সময় ১–৩ (দৈর্ঘ্য ১), অর্ধেক সময় ১–২–৪ (দৈর্ঘ্য ২)।') },
    { input: '5\n1 2\n1 3\n3 4\n2 5', output: '2.000000000000000', explain: L('Both branches have length 2.', 'দুটি শাখারই দৈর্ঘ্য ২।') },
  ],
  observation: L('Rooted at 1, “unvisited neighbours” are exactly the children. E[v] = 0 at a leaf, otherwise E[v] = 1 + average of E over the children.', '১-এ মূল দিলে “অদেখা প্রতিবেশী” ঠিক সন্তানরা। পাতায় E[v] = ০, নইলে E[v] = ১ + সন্তানদের E-এর গড়।'),
  approach: [L('Process vertices in reverse BFS order.', 'উল্টো BFS ক্রমে শীর্ষ প্রক্রিয়া।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'E[4] = 0, E[2] = 1, E[3] = 0', text: L('E[1] = 1 + (1 + 0) / 2 = 1.5.', 'E[১] = ১ + (১ + ০) / ২ = ১.৫।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One traversal.', 'একটি ঘোরা।') },
  solutions: [
    {
      id: 'expectation-dp',
      kind: 'optimal',
      title: L('Expectation DP on the tree', 'ট্রিতে প্রত্যাশার DP'),
      idea: L('E[v] = 1 + mean(E[children]).', 'E[v] = ১ + গড়(E[সন্তান])।'),
      explain: [L('Linearity plus conditioning on the first step: the standard recursion for expected values on trees.', 'রৈখিকতা আর প্রথম ধাপে শর্ত: ট্রিতে প্রত্যাশিত মানের প্রচলিত রিকার্শন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<int> order = {1}, par(n + 1, 0);
    par[1] = -1;
    for (size_t i = 0; i < order.size(); i++)
        for (int u : adj[order[i]]) if (u != par[order[i]]) { par[u] = order[i]; order.push_back(u); }
    vector<double> E(n + 1, 0.0), sum(n + 1, 0.0);
    vector<int> kids(n + 1, 0);
    for (int i = n - 1; i >= 0; i--) {
        int v = order[i];
        E[v] = kids[v] ? 1 + sum[v] / kids[v] : 0;
        if (par[v] > 0) { sum[par[v]] += E[v]; kids[par[v]]++; }
    }
    printf("%.15f\n", E[1]);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'vector'],
    },
    {
      id: 'leaf-probability',
      kind: 'method',
      title: L('Σ over leaves of P(leaf) · depth', 'পাতাগুলোর ওপর Σ P(পাতা) · গভীরতা'),
      idea: L('Push probabilities down: a child gets prob[parent] / (#children).', 'সম্ভাবনা নিচে পাঠান: একটি সন্তান পায় prob[parent] / (#সন্তান)।'),
      explain: [L('The definition of expectation: the journey ends at exactly one leaf, so E = Σ P(end at leaf) · depth(leaf). Computed top-down with BFS.', 'প্রত্যাশার সংজ্ঞা: যাত্রা ঠিক একটি পাতায় শেষ হয়, তাই E = Σ P(পাতায় শেষ) · গভীরতা(পাতা)। BFS দিয়ে ওপর থেকে নিচে হিসাব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    vector<double> prob(n + 1, 0.0);
    vector<int> depth(n + 1, -1);
    queue<int> q;
    q.push(1);
    depth[1] = 0;
    prob[1] = 1;
    double e = 0;
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        int kids = 0;
        for (int u : adj[v]) if (depth[u] == -1) kids++;
        if (kids == 0) { e += prob[v] * depth[v]; continue; }
        for (int u : adj[v])
            if (depth[u] == -1) { depth[u] = depth[v] + 1; prob[u] = prob[v] / kids; q.push(u); }
    }
    printf("%.15f\n", e);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['stack-queue', 'setprecision'],
    },
  ],
  tests: [
    { input: '4\n1 2\n1 3\n2 4', output: '1.500000000000000', source: 'sample', note: sample(1) },
    { input: '5\n1 2\n1 3\n3 4\n2 5', output: '2.000000000000000', source: 'sample', note: sample(2) },
    { input: '1', output: '0.000000000000000', source: 'own', note: L('A single city.', 'একটি শহর।') },
  ],
  pitfalls: [L('Dividing by the degree instead of the number of children.', 'সন্তানের সংখ্যার বদলে ডিগ্রি দিয়ে ভাগ।')],
  related: [{ id: '1265E', name: 'Beautiful Mirrors', why: L('Expected values.', 'প্রত্যাশিত মান।') }],
  toolkit: ['setprecision'],
};

export const p1C: ProblemEntry = {
  id: '1C',
  contestId: 1,
  index: 'C',
  name: 'Ancient Berland Circus',
  rating: 2100,
  tags: ['geometry', 'math'],
  why: L('Three vertices fix the circumcircle; the central angles must be multiples of 2π / n, found with a floating-point gcd.', 'তিনটি শীর্ষ পরিবৃত্ত ঠিক করে; কেন্দ্রীয় কোণগুলো ২π / n-এর গুণিতক হতে হবে, ভাসমান-বিন্দুর gcd দিয়ে পাওয়া।'),
  statement: L('Three pillars are vertices of a regular polygon with at most 100 sides. Find the smallest possible area of the polygon.', 'তিনটি স্তম্ভ সর্বোচ্চ ১০০ বাহুর একটি সুষম বহুভুজের শীর্ষ। বহুভুজের সবচেয়ে ছোট সম্ভাব্য ক্ষেত্রফল বের করুন।'),
  input: L('Three points, one per line.', 'তিনটি বিন্দু, প্রতি লাইনে একটি।'),
  output: L('The area.', 'ক্ষেত্রফল।'),
  limits: { timeSec: 2, memoryMb: 64, notes: [L('n ≤ 100, coordinates ≤ 1000', 'n ≤ ১০০, স্থানাঙ্ক ≤ ১০০০'), realAnswer] },
  samples: [{ input: '0.000000 0.000000\n1.000000 1.000000\n0.000000 1.000000', output: '1.00000000', explain: L('A unit square.', 'একটি একক বর্গ।') }],
  observation: L('The polygon’s circumcircle passes through the three points; its radius R follows from the triangle: R = abc / (4 · area). Each side of the triangle subtends a central angle 2 · (opposite angle). All three must be integer multiples of 2π / n; the smallest n is π / gcd(A, B, C) for the triangle’s angles. Area = n/2 · R² · sin(2π / n).', 'বহুভুজের পরিবৃত্ত তিনটি বিন্দু দিয়ে যায়; এর ব্যাসার্ধ R ত্রিভুজ থেকে আসে: R = abc / (৪ · ক্ষেত্রফল)। ত্রিভুজের প্রতিটি বাহু একটি কেন্দ্রীয় কোণ ২ · (বিপরীত কোণ) রচনা করে। তিনটিকেই ২π / n-এর পূর্ণসংখ্যা গুণিতক হতে হবে; সবচেয়ে ছোট n হলো ত্রিভুজের কোণগুলোর জন্য π / gcd(A, B, C)। ক্ষেত্রফল = n/২ · R² · sin(২π / n)।'),
  approach: [L('Side lengths → angles (law of cosines) → float gcd → n → area.', 'বাহুর দৈর্ঘ্য → কোণ (কোসাইনের সূত্র) → ভাসমান gcd → n → ক্ষেত্রফল।')],
  walkthrough: { input: 'unit square corners', steps: [{ state: 'angles 45°, 45°, 90°; gcd 45° = π/4', text: L('n = 4, R = √2/2: area 2 · 0.5 · 1 = 1.', 'n = ৪, R = √২/২: ক্ষেত্রফল ২ · ০.৫ · ১ = ১।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A few trigonometric operations.', 'কয়েকটি ত্রিকোণমিতিক অপারেশন।') },
  solutions: [
    {
      id: 'float-gcd',
      kind: 'optimal',
      title: L('Floating-point gcd of the angles', 'কোণগুলোর ভাসমান-বিন্দু gcd'),
      idea: L('Euclid with a tolerance: stop when the remainder is tiny.', 'সহনশীলতাসহ ইউক্লিড: ভাগশেষ ক্ষুদ্র হলে থামুন।'),
      explain: [L('With inputs given to 6 decimals, a tolerance around 10⁻⁴ is needed in the gcd. Computing angles with acos of the law of cosines is accurate enough here.', '৬ দশমিকের ইনপুটে gcd-তে প্রায় ১০⁻⁴ সহনশীলতা লাগে। কোসাইনের সূত্রের acos দিয়ে কোণ হিসাব এখানে যথেষ্ট নির্ভুল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

double fgcd(double a, double b) {
    while (fabs(b) > 1e-4) { double r = fmod(a, b); a = b; b = r; }
    return a;
}

int main() {
    double x[3], y[3];
    for (int i = 0; i < 3; i++) cin >> x[i] >> y[i];
    double a = hypot(x[1] - x[2], y[1] - y[2]), b = hypot(x[0] - x[2], y[0] - y[2]), c = hypot(x[0] - x[1], y[0] - y[1]);
    double A = acos((b * b + c * c - a * a) / (2 * b * c));
    double B = acos((a * a + c * c - b * b) / (2 * a * c));
    double C = M_PI - A - B;
    double s = (a + b + c) / 2, tri = sqrt(s * (s - a) * (s - b) * (s - c));
    double R = a * b * c / (4 * tri);
    double g = fgcd(fgcd(A, B), C);
    double n = round(M_PI / g);
    printf("%.8f\n", n / 2 * R * R * sin(2 * M_PI / n));
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['setprecision', 'functions'],
    },
    {
      id: 'brute',
      kind: 'alt',
      title: L('Try every n from 3 to 100', '৩ থেকে ১০০ পর্যন্ত প্রতিটি n চেষ্টা'),
      idea: L('Accept the first n for which each angle is (nearly) a multiple of π / n.', 'প্রথম যে n-এ প্রতিটি কোণ (প্রায়) π / n-এর গুণিতক তা গ্রহণ।'),
      explain: [L('A bounded n makes a direct search safer than a floating gcd: for each n check how close A · n / π is to an integer. Smaller n gives smaller area, so the first match is the answer.', 'সীমিত n ভাসমান gcd-এর চেয়ে সরাসরি খোঁজকে নিরাপদ করে: প্রতিটি n-এ দেখুন A · n / π একটি পূর্ণসংখ্যার কত কাছে। ছোট n ছোট ক্ষেত্রফল দেয়, তাই প্রথম মিলই উত্তর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    double x[3], y[3];
    for (int i = 0; i < 3; i++) cin >> x[i] >> y[i];
    double a = hypot(x[1] - x[2], y[1] - y[2]), b = hypot(x[0] - x[2], y[0] - y[2]), c = hypot(x[0] - x[1], y[0] - y[1]);
    double A = acos((b * b + c * c - a * a) / (2 * b * c));
    double B = acos((a * a + c * c - b * b) / (2 * a * c));
    double C = M_PI - A - B;
    double s = (a + b + c) / 2, tri = sqrt(s * (s - a) * (s - b) * (s - c));
    double R = a * b * c / (4 * tri);
    auto near = [](double v) { return fabs(v - round(v)) < 1e-3; };
    for (int n = 3; n <= 100; n++)
        if (near(A * n / M_PI) && near(B * n / M_PI) && near(C * n / M_PI)) {
            printf("%.8f\n", n / 2.0 * R * R * sin(2 * M_PI / n));
            return 0;
        }
    return 0;
}
`,
      time: 'O(100)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['lambda', 'setprecision'],
    },
  ],
  tests: [
    { input: '0.000000 0.000000\n1.000000 1.000000\n0.000000 1.000000', output: '1.00000000', source: 'sample', note: sample(1) },
    { input: '1.000000 0.000000\n-0.500000 0.866025\n-0.500000 -0.866025', output: '1.29903811', source: 'own', note: L('An equilateral triangle in the unit circle.', 'একক বৃত্তে একটি সমবাহু ত্রিভুজ।') },
  ],
  pitfalls: [L('A gcd tolerance that is too tight for 6-digit input.', '৬-অঙ্কের ইনপুটের জন্য খুব কঠোর gcd সহনশীলতা।')],
  related: [{ id: '1451D', name: 'Circle Game', why: L('Geometry with circles.', 'বৃত্তসহ জ্যামিতি।') }],
  toolkit: ['setprecision'],
};

export const p659D: ProblemEntry = {
  id: '659D',
  contestId: 659,
  index: 'D',
  name: 'Bicycle Race',
  rating: 1500,
  tags: ['geometry', 'implementation', 'math'],
  why: L('The sign of a cross product tells left from right turns.', 'একটি ক্রস প্রোডাক্টের চিহ্ন বাম আর ডান বাঁক আলাদা করে।'),
  statement: L('A closed axis-parallel track around a lake starts at the southernmost-westernmost point heading north, and goes clockwise. A turn is dangerous if riding straight on would lead into the lake. Count dangerous turns.', 'একটি হ্রদের চারপাশে একটি বদ্ধ অক্ষ-সমান্তরাল ট্র্যাক সবচেয়ে দক্ষিণ-পশ্চিমের বিন্দু থেকে উত্তরমুখী শুরু হয় আর ঘড়ির কাঁটার দিকে চলে। সোজা চালিয়ে গেলে হ্রদে পড়লে একটি বাঁক বিপজ্জনক। বিপজ্জনক বাঁক গুনুন।'),
  input: L('n, then n + 1 points (the last equals the first).', 'n, তারপর n + ১টি বিন্দু (শেষটি প্রথমটির সমান)।'),
  output: L('The number of dangerous turns.', 'বিপজ্জনক বাঁকের সংখ্যা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('4 ≤ n ≤ 1000', '৪ ≤ n ≤ ১০০০')] },
  samples: [
    { input: '6\n0 0\n0 1\n1 1\n1 2\n2 2\n2 0\n0 0', output: '1', explain: L('Only the turn at (1, 1) is a left turn.', 'শুধু (১, ১)-এর বাঁক বাম বাঁক।') },
    { input: '16\n1 1\n1 5\n3 5\n3 7\n2 7\n2 9\n6 9\n6 7\n5 7\n5 3\n4 3\n4 4\n3 4\n3 2\n5 2\n5 1\n1 1', output: '6', explain: L('Six left turns.', 'ছয়টি বাম বাঁক।') },
  ],
  observation: L('Going clockwise, the lake is on the right. Riding straight at a left turn goes to the right side of the new direction, i.e. into the lake. So count left turns: cross(prev direction, next direction) > 0. Since a clockwise rectilinear polygon has (right turns − left turns) = 4, the answer is also (n − 4) / 2.', 'ঘড়ির কাঁটার দিকে গেলে হ্রদ ডান দিকে। একটি বাম বাঁকে সোজা গেলে নতুন দিকের ডান দিকে, অর্থাৎ হ্রদে যায়। তাই বাম বাঁক গুনুন: cross(আগের দিক, পরের দিক) > ০। ঘড়ির কাঁটার দিকের একটি সমকোণী বহুভুজে (ডান বাঁক − বাম বাঁক) = ৪ বলে উত্তর (n − ৪) / ২-ও।'),
  approach: [L('Cross products at every vertex.', 'প্রতিটি শীর্ষে ক্রস প্রোডাক্ট।')],
  walkthrough: { input: 'sample 1', steps: [{ state: 'east then north at (1, 1)', text: L('cross((1, 0), (0, 1)) = 1 > 0: dangerous.', 'cross((১, ০), (০, ১)) = ১ > ০: বিপজ্জনক।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One cross product per vertex.', 'প্রতি শীর্ষে একটি ক্রস প্রোডাক্ট।') },
  solutions: [
    {
      id: 'cross',
      kind: 'optimal',
      title: L('Count left turns with cross products', 'ক্রস প্রোডাক্ট দিয়ে বাম বাঁক গোনা'),
      idea: L('u × v > 0 means v turns left from u.', 'u × v > ০ মানে v u থেকে বামে বাঁকে।'),
      explain: [L('Integer cross products are the backbone of computational geometry: orientation tests, polygon area and convexity all come from them, with no floating-point error.', 'পূর্ণসংখ্যার ক্রস প্রোডাক্ট গণনামূলক জ্যামিতির মেরুদণ্ড: দিক পরীক্ষা, বহুভুজের ক্ষেত্রফল আর উত্তলতা সব এগুলো থেকে আসে, কোনো ভাসমান-বিন্দুর ভুল ছাড়া।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n + 1), y(n + 1);
    for (int i = 0; i <= n; i++) cin >> x[i] >> y[i];
    int dangerous = 0;
    for (int i = 1; i < n; i++) {
        long long ux = x[i] - x[i - 1], uy = y[i] - y[i - 1];
        long long vx = x[i + 1] - x[i], vy = y[i + 1] - y[i];
        if (ux * vy - uy * vx > 0) dangerous++;
    }
    cout << dangerous << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'for-loop'],
    },
    {
      id: 'formula',
      kind: 'alt',
      title: L('Turn counting formula', 'বাঁক গণনার সূত্র'),
      idea: L('Right turns − left turns = 4, right + left = n, so left = (n − 4) / 2.', 'ডান বাঁক − বাম বাঁক = ৪, ডান + বাম = n, তাই বাম = (n − ৪) / ২।'),
      explain: [L('Walking once around a simple closed curve turns by 360° in total; each right turn is +90° and each left turn −90° for a clockwise tour.', 'একটি সরল বদ্ধ বক্ররেখার চারপাশে একবার হাঁটলে মোট ৩৬০° ঘোরা হয়; ঘড়ির কাঁটার দিকের ভ্রমণে প্রতিটি ডান বাঁক +৯০° আর প্রতিটি বাম বাঁক −৯০°।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << (n - 4) / 2 << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '6\n0 0\n0 1\n1 1\n1 2\n2 2\n2 0\n0 0', output: '1', source: 'sample', note: sample(1) },
    { input: '16\n1 1\n1 5\n3 5\n3 7\n2 7\n2 9\n6 9\n6 7\n5 7\n5 3\n4 3\n4 4\n3 4\n3 2\n5 2\n5 1\n1 1', output: '6', source: 'sample', note: sample(2) },
    { input: '4\n0 0\n0 1\n1 1\n1 0\n0 0', output: '0', source: 'own', note: L('A square has no dangerous turns.', 'একটি বর্গে বিপজ্জনক বাঁক নেই।') },
  ],
  pitfalls: [L('Getting the sign of the cross product backwards.', 'ক্রস প্রোডাক্টের চিহ্ন উল্টো ধরা।')],
  related: [{ id: '1047B', name: 'Cover Points', why: L('Coordinate geometry.', 'স্থানাঙ্ক জ্যামিতি।') }],
  toolkit: ['long-long'],
};

export const p1047B: ProblemEntry = {
  id: '1047B',
  contestId: 1047,
  index: 'B',
  name: 'Cover Points',
  rating: 900,
  tags: ['geometry', 'math'],
  featuredFor: ['geometry'],
  why: L('A right isosceles triangle with legs on the axes covers (x, y) iff x + y ≤ leg.', 'অক্ষে বাহুসহ একটি সমকোণী সমদ্বিবাহু ত্রিভুজ (x, y) ঢাকে ঠিক তখনই যখন x + y ≤ বাহু।'),
  statement: L('Place an isosceles right triangle with its two legs on the coordinate axes to cover all given points. Find the minimum leg length.', 'স্থানাঙ্ক অক্ষে দুটি বাহু রেখে একটি সমদ্বিবাহু সমকোণী ত্রিভুজ বসান যাতে সব প্রদত্ত বিন্দু ঢাকা হয়। সবচেয়ে ছোট বাহুর দৈর্ঘ্য বের করুন।'),
  input: L('n, then n points.', 'n, তারপর n-টি বিন্দু।'),
  output: L('The minimum leg length.', 'সবচেয়ে ছোট বাহুর দৈর্ঘ্য।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 10⁵, 1 ≤ x, y ≤ 10⁹', 'n ≤ ১০⁵, ১ ≤ x, y ≤ ১০⁹')] },
  samples: [
    { input: '3\n1 1\n1 2\n2 1', output: '3', explain: L('max(x + y) = 3.', 'max(x + y) = ৩।') },
    { input: '4\n1 1\n1 2\n2 1\n2 2', output: '4', explain: L('(2, 2) needs 4.', '(২, ২)-এর জন্য ৪ লাগে।') },
  ],
  observation: L('The hypotenuse is the line x + y = L, so a point is covered iff x + y ≤ L. The answer is max(xᵢ + yᵢ).', 'অতিভুজ হলো রেখা x + y = L, তাই একটি বিন্দু ঢাকা ঠিক তখনই যখন x + y ≤ L। উত্তর max(xᵢ + yᵢ)।'),
  approach: [L('One pass.', 'একবার যাওয়া।')],
  walkthrough: { input: '(2, 2)', steps: [{ state: '2 + 2 = 4', text: L('Leg 4.', 'বাহু ৪।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('A maximum.', 'একটি সর্বোচ্চ।') },
  solutions: [
    {
      id: 'max-sum',
      kind: 'optimal',
      title: L('Maximum of x + y', 'x + y-এর সর্বোচ্চ'),
      idea: L('The hypotenuse is a level line of x + y.', 'অতিভুজ x + y-এর একটি সমতল রেখা।'),
      explain: [L('Turning a shape into an inequality (“inside iff x + y ≤ L”) is the first step of most geometry problems.', 'একটি আকারকে অসমতায় বদলানো (“ভেতরে ঠিক তখনই যখন x + y ≤ L”) বেশিরভাগ জ্যামিতি প্রবলেমের প্রথম ধাপ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    long long best = 0;
    for (int i = 0; i < n; i++) {
        long long x, y;
        scanf("%lld %lld", &x, &y);
        best = max(best, x + y);
    }
    printf("%lld\n", best);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['min-max', 'long-long'],
    },
    {
      id: 'binary-search',
      kind: 'method',
      title: L('Binary search on the leg', 'বাহুর ওপর বাইনারি সার্চ'),
      idea: L('Check whether leg L covers every point.', 'বাহু L প্রতিটি বিন্দু ঢাকে কি না যাচাই।'),
      explain: [L('Monotone feasibility (a bigger triangle covers more) allows binary search, a useful habit when no closed form is obvious.', 'একমুখী সম্ভাব্যতা (বড় ত্রিভুজ বেশি ঢাকে) বাইনারি সার্চ চালাতে দেয়, সরাসরি সূত্র স্পষ্ট না হলে একটি কাজের অভ্যাস।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<long long> x(n), y(n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &x[i], &y[i]);
    auto covers = [&](long long L) {
        for (int i = 0; i < n; i++) if (x[i] + y[i] > L) return false;
        return true;
    };
    long long lo = 0, hi = 2000000000LL;
    while (lo < hi) {
        long long mid = (lo + hi) / 2;
        if (covers(mid)) hi = mid; else lo = mid + 1;
    }
    printf("%lld\n", lo);
    return 0;
}
`,
      time: 'O(n log V)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'while-n'],
    },
  ],
  tests: [
    { input: '3\n1 1\n1 2\n2 1', output: '3', source: 'sample', note: sample(1) },
    { input: '4\n1 1\n1 2\n2 1\n2 2', output: '4', source: 'sample', note: sample(2) },
    { input: '1\n1000000000 1000000000', output: '2000000000', source: 'own', note: L('Needs long long.', 'long long লাগে।') },
  ],
  pitfalls: [L('int overflow for x + y = 2·10⁹.', 'x + y = ২·১০⁹-এ int ওভারফ্লো।')],
  related: [{ id: '659D', name: 'Bicycle Race', why: L('Simple geometry.', 'সরল জ্যামিতি।') }],
  toolkit: ['long-long'],
};

const matCode = raw`using Mat = vector<vector<long long>>;

Mat mul(const Mat& A, const Mat& B, long long mod) {
    int n = A.size();
    Mat C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (!A[i][k]) continue;
            for (int j = 0; j < n; j++) C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
        }
    return C;
}

Mat power(Mat A, long long e, long long mod) {
    int n = A.size();
    Mat R(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) R[i][i] = 1;
    while (e) {
        if (e & 1) R = mul(R, A, mod);
        A = mul(A, A, mod);
        e >>= 1;
    }
    return R;
}`;

export const p1117D: ProblemEntry = {
  id: '1117D',
  contestId: 1117,
  index: 'D',
  name: 'Magic Gems',
  rating: 2100,
  tags: ['dp', 'math', 'matrices'],
  featuredFor: ['matrices'],
  why: L('A linear recurrence f(n) = f(n − 1) + f(n − M) with n up to 10¹⁸: matrix exponentiation.', 'n ১০¹⁸ পর্যন্ত একটি রৈখিক পুনরাবৃত্তি f(n) = f(n − ১) + f(n − M): ম্যাট্রিক্স সূচক।'),
  statement: L('A magic gem takes 1 unit of space, or can be split into M normal gems taking M units. Count configurations that take exactly N units, modulo 10⁹ + 7.', 'একটি জাদুর রত্ন ১ একক জায়গা নেয়, বা M-টি সাধারণ রত্নে ভেঙে M একক নেয়। ঠিক N একক নেয় এমন বিন্যাস ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('N M.', 'N M।'),
  output: L('The count mod 10⁹ + 7.', 'গণনা mod ১০⁹ + ৭।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('N ≤ 10¹⁸, 2 ≤ M ≤ 100', 'N ≤ ১০¹⁸, ২ ≤ M ≤ ১০০')] },
  samples: [
    { input: '4 2', output: '5', explain: L('1111, 211, 121, 112, 22.', '১১১১, ২১১, ১২১, ১১২, ২২।') },
    { input: '3 2', output: '3', explain: L('111, 21, 12.', '১১১, ২১, ১২।') },
  ],
  observation: L('The last item is a 1-gem or an M-block, so f(n) = f(n − 1) + f(n − M), f(0) = 1, f(<0) = 0. The state (f(n), …, f(n − M + 1)) moves by a fixed M × M matrix, so raise it to the power N.', 'শেষ জিনিস হয় একটি ১-রত্ন নয়তো একটি M-ব্লক, তাই f(n) = f(n − ১) + f(n − M), f(০) = ১, f(<০) = ০। অবস্থা (f(n), …, f(n − M + ১)) একটি নির্দিষ্ট M × M ম্যাট্রিক্সে সরে, তাই এটিকে N ঘাতে তুলুন।'),
  approach: [L('Companion matrix, fast exponentiation, read the top-left entry.', 'সহচর ম্যাট্রিক্স, দ্রুত সূচক, ওপরের-বামের মান পড়া।')],
  walkthrough: { input: 'M = 2', steps: [{ state: 'Fibonacci: 1, 1, 2, 3, 5', text: L('f(4) = 5.', 'f(৪) = ৫।') }] },
  complexity: { time: 'O(M³ log N)', space: 'O(M²)', why: L('60 matrix squarings of size 100.', '১০০ আকারের ৬০টি ম্যাট্রিক্স বর্গ।') },
  solutions: [
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('Matrix exponentiation', 'ম্যাট্রিক্স সূচক'),
      idea: L('Row 0 = [1, 0, …, 0, 1]; rows below shift the window.', 'সারি ০ = [১, ০, …, ০, ১]; নিচের সারিগুলো উইন্ডো সরায়।'),
      explain: [L('Any linear recurrence of order M becomes vector ← matrix · vector; repeated squaring gives the N-th term in O(M³ log N).', 'M ক্রমের যেকোনো রৈখিক পুনরাবৃত্তি ভেক্টর ← ম্যাট্রিক্স · ভেক্টর হয়; বারবার বর্গ O(M³ log N)-এ N-তম পদ দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${matCode}

int main() {
    long long N;
    int M;
    cin >> N >> M;
    const long long MOD = 1000000007;
    Mat T(M, vector<long long>(M, 0));
    T[0][0] = 1;
    T[0][M - 1] += 1;
    for (int i = 1; i < M; i++) T[i][i - 1] = 1;
    // state (f(n), f(n-1), ..., f(n-M+1)) with f(0) = 1 and f(<0) = 0
    Mat P = power(T, N, MOD);
    cout << P[0][0] << "\n";
    return 0;
}
`,
      time: 'O(M³ log N)',
      space: 'O(M²)',
      accepted: true,
      toolkit: ['vector', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Linear DP', 'রৈখিক DP'),
      idea: L('f(n) = f(n − 1) + f(n − M) for n up to N.', 'n থেকে N পর্যন্ত f(n) = f(n − ১) + f(n − M)।'),
      explain: [L('O(N): correct, but N = 10¹⁸ makes it impossible; it checks the matrix version.', 'O(N): সঠিক, কিন্তু N = ১০¹⁸ এটিকে অসম্ভব করে; ম্যাট্রিক্স সংস্করণ যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long N;
    int M;
    cin >> N >> M;
    if (N > 1000000) { cout << "\n"; return 0; }
    const long long MOD = 1000000007;
    vector<long long> f(N + 1, 0);
    f[0] = 1;
    for (long long n = 1; n <= N; n++) f[n] = (f[n - 1] + (n >= M ? f[n - M] : 0)) % MOD;
    cout << f[N] << "\n";
    return 0;
}
`,
      time: 'O(N)',
      space: 'O(N)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4 2', output: '5', source: 'sample', note: sample(1) },
    { input: '3 2', output: '3', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Putting the initial values in the wrong order inside the state vector.', 'অবস্থা ভেক্টরের ভেতরে প্রাথমিক মান ভুল ক্রমে রাখা।')],
  related: [{ id: '621E', name: 'Wet Shark and Blocks', why: L('Matrix power over a DP.', 'একটি DP-এর ওপর ম্যাট্রিক্স ঘাত।') }],
  toolkit: ['vector'],
};

export const p621E: ProblemEntry = {
  id: '621E',
  contestId: 621,
  index: 'E',
  name: 'Wet Shark and Blocks',
  rating: 2000,
  tags: ['dp', 'matrices'],
  why: L('A DP over remainders where every block applies the same transition: raise the x × x transition matrix to the power b.', 'ভাগশেষের ওপর একটি DP যেখানে প্রতিটি ব্লক একই রূপান্তর প্রয়োগ করে: x × x রূপান্তর ম্যাট্রিক্সকে b ঘাতে তুলুন।'),
  statement: L('There are b identical blocks of n digits each. Pick one digit from every block and write them in order as a number. Count the ways for the number to be ≡ k (mod x), modulo 10⁹ + 7.', 'n অঙ্কের b-টি একই ব্লক। প্রতিটি ব্লক থেকে একটি অঙ্ক বেছে ক্রমে একটি সংখ্যা লিখুন। সংখ্যাটি ≡ k (mod x) হওয়ার উপায় ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('n b k x, then the digits.', 'n b k x, তারপর অঙ্কগুলো।'),
  output: L('The count mod 10⁹ + 7.', 'গণনা mod ১০⁹ + ৭।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 5·10⁴, b ≤ 10⁹, x ≤ 100', 'n ≤ ৫·১০⁴, b ≤ ১০⁹, x ≤ ১০০')] },
  samples: [
    { input: '12 1 5 10\n3 5 6 7 8 9 5 1 1 1 1 5', output: '3', explain: L('Three 5s in the block.', 'ব্লকে তিনটি ৫।') },
    { input: '3 2 1 2\n6 2 2', output: '0', explain: L('All digits are even.', 'সব অঙ্ক জোড়।') },
    { input: '3 2 1 2\n3 1 2', output: '6', explain: L('Last digit odd: 2 · 3 = 6 choices.', 'শেষ অঙ্ক বিজোড়: ২ · ৩ = ৬টি বিকল্প।') },
  ],
  observation: L('Appending a digit d to remainder r gives (10r + d) mod x. Let cnt[d] be how many times d occurs in a block. The transition T[r][(10r + d) mod x] += cnt[d] is the same for every block, so the answer is (T^b)[0][k].', 'ভাগশেষ r-এ একটি অঙ্ক d যোগ করলে (১০r + d) mod x হয়। cnt[d] হলো একটি ব্লকে d কতবার আসে। রূপান্তর T[r][(১০r + d) mod x] += cnt[d] প্রতিটি ব্লকে একই, তাই উত্তর (T^b)[০][k]।'),
  approach: [L('Build T, fast power, read row 0.', 'T বানিয়ে দ্রুত ঘাত, সারি ০ পড়া।')],
  walkthrough: { input: '3 1 2, x = 2, k = 1, b = 2', steps: [{ state: 'T[r][r′]: odd digits {3, 1} lead to 1, even {2} to 0', text: L('Two blocks: 3 · 2 = 6 ways to end odd.', 'দুটি ব্লক: বিজোড়ে শেষ হওয়ার ৩ · ২ = ৬টি উপায়।') }] },
  complexity: { time: 'O(x³ log b + n)', space: 'O(x²)', why: L('30 squarings of a 100 × 100 matrix.', '১০০ × ১০০ ম্যাট্রিক্সের ৩০টি বর্গ।') },
  solutions: [
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('Transition matrix to the power b', 'রূপান্তর ম্যাট্রিক্সের b ঘাত'),
      idea: L('Same step repeated b times.', 'একই ধাপ b বার পুনরাবৃত্তি।'),
      explain: [L('A DP whose step does not depend on the step number is a matrix power in disguise: dpₜ₊₁ = dpₜ · T.', 'যে DP-এর ধাপ ধাপের সংখ্যার ওপর নির্ভর করে না তা ছদ্মবেশে একটি ম্যাট্রিক্স ঘাত: dpₜ₊₁ = dpₜ · T।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${matCode}

int main() {
    int n, k, x;
    long long b;
    scanf("%d %lld %d %d", &n, &b, &k, &x);
    vector<long long> cnt(10, 0);
    for (int i = 0; i < n; i++) { int d; scanf("%d", &d); cnt[d]++; }
    const long long MOD = 1000000007;
    Mat T(x, vector<long long>(x, 0));
    for (int r = 0; r < x; r++)
        for (int d = 1; d <= 9; d++) T[r][(10 * r + d) % x] = (T[r][(10 * r + d) % x] + cnt[d]) % MOD;
    Mat P = power(T, b, MOD);
    printf("%lld\n", P[0][k]);
    return 0;
}
`,
      time: 'O(x³ log b)',
      space: 'O(x²)',
      accepted: true,
      toolkit: ['vector', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP block by block', 'ব্লক ধরে DP'),
      idea: L('dp[r] over remainders, b times.', 'ভাগশেষের ওপর dp[r], b বার।'),
      explain: [L('O(b · x · 10): fine for small b, the same transition the matrix encodes.', 'O(b · x · ১০): ছোট b-তে ঠিক, ম্যাট্রিক্স যে রূপান্তর লেখে সেটিই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k, x;
    long long b;
    cin >> n >> b >> k >> x;
    vector<long long> cnt(10, 0);
    for (int i = 0; i < n; i++) { int d; cin >> d; cnt[d]++; }
    if (b > 100000) { cout << "\n"; return 0; }
    const long long MOD = 1000000007;
    vector<long long> dp(x, 0);
    dp[0] = 1;
    for (long long t = 0; t < b; t++) {
        vector<long long> nd(x, 0);
        for (int r = 0; r < x; r++)
            if (dp[r])
                for (int d = 1; d <= 9; d++) nd[(10 * r + d) % x] = (nd[(10 * r + d) % x] + dp[r] * cnt[d]) % MOD;
        dp = nd;
    }
    cout << dp[k] << "\n";
    return 0;
}
`,
      time: 'O(b · x · 10)',
      space: 'O(x)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '12 1 5 10\n3 5 6 7 8 9 5 1 1 1 1 5', output: '3', source: 'sample', note: sample(1) },
    { input: '3 2 1 2\n6 2 2', output: '0', source: 'sample', note: sample(2) },
    { input: '3 2 1 2\n3 1 2', output: '6', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Building the matrix from the n digits n times instead of using counts.', 'গণনার বদলে n অঙ্ক থেকে n বার ম্যাট্রিক্স বানানো।')],
  related: [{ id: '1117D', name: 'Magic Gems', why: L('Matrix exponentiation.', 'ম্যাট্রিক্স সূচক।') }],
  toolkit: ['vector'],
};

export const p222E: ProblemEntry = {
  id: '222E',
  contestId: 222,
  index: 'E',
  name: 'Decoding Genome',
  rating: 1900,
  tags: ['dp', 'matrices'],
  why: L('Counting walks of length n − 1 in a “which letter may follow which” graph: the adjacency matrix to the power n − 1.', '“কোন অক্ষরের পরে কোনটি আসতে পারে” গ্রাফে n − ১ দৈর্ঘ্যের হাঁটা গোনা: সংলগ্নতা ম্যাট্রিক্সের n − ১ ঘাত।'),
  statement: L('Strings of length n over m nucleotides (a–z then A–Z). k ordered pairs are forbidden as adjacent letters. Count valid strings modulo 10⁹ + 7.', 'm নিউক্লিওটাইডের (a–z তারপর A–Z) n দৈর্ঘ্যের স্ট্রিং। k-টি ক্রমযুক্ত জোড়া পাশাপাশি অক্ষর হিসেবে নিষিদ্ধ। বৈধ স্ট্রিং ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('n m k, then k forbidden pairs.', 'n m k, তারপর k-টি নিষিদ্ধ জোড়া।'),
  output: L('The count mod 10⁹ + 7.', 'গণনা mod ১০⁹ + ৭।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 10¹⁵, m ≤ 52', 'n ≤ ১০¹⁵, m ≤ ৫২')] },
  samples: [
    { input: '3 3 2\nab\nba', output: '17', explain: L('27 strings minus those containing ab or ba.', '২৭টি স্ট্রিং বিয়োগ ab বা ba ধারণকারী।') },
    { input: '3 3 0', output: '27', explain: L('No restrictions.', 'কোনো বাধা নেই।') },
    { input: '2 1 1\naa', output: '0', explain: L('The only string is forbidden.', 'একমাত্র স্ট্রিংটি নিষিদ্ধ।') },
  ],
  observation: L('Let A[i][j] = 1 if letter j may follow letter i. The number of valid strings of length n is the number of walks with n − 1 steps: the sum of all entries of A^(n − 1).', 'A[i][j] = ১ যদি অক্ষর j অক্ষর i-এর পরে আসতে পারে। n দৈর্ঘ্যের বৈধ স্ট্রিংয়ের সংখ্যা n − ১ ধাপের হাঁটার সংখ্যা: A^(n − ১)-এর সব মানের যোগফল।'),
  approach: [L('Matrix power, sum entries.', 'ম্যাট্রিক্স ঘাত, মান যোগ।')],
  walkthrough: { input: 'n = 2, m = 1, aa forbidden', steps: [{ state: 'A = [0]', text: L('Sum 0.', 'যোগফল ০।') }] },
  complexity: { time: 'O(m³ log n)', space: 'O(m²)', why: L('50 squarings of a 52 × 52 matrix.', '৫২ × ৫২ ম্যাট্রিক্সের ৫০টি বর্গ।') },
  solutions: [
    {
      id: 'matrix',
      kind: 'optimal',
      title: L('Walk counting by matrix power', 'ম্যাট্রিক্স ঘাতে হাঁটা গোনা'),
      idea: L('(Aᵗ)[i][j] = number of walks i → j of length t.', '(Aᵗ)[i][j] = t দৈর্ঘ্যের i → j হাঁটার সংখ্যা।'),
      explain: [L('The key identity of matrices in counting: powers of the adjacency matrix count walks.', 'গণনায় ম্যাট্রিক্সের মূল অভেদ: সংলগ্নতা ম্যাট্রিক্সের ঘাত হাঁটা গোনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${matCode}

int idx(char c) { return islower(c) ? c - 'a' : c - 'A' + 26; }

int main() {
    long long n;
    int m, k;
    cin >> n >> m >> k;
    const long long MOD = 1000000007;
    Mat A(m, vector<long long>(m, 1));
    for (int i = 0; i < k; i++) {
        string s;
        cin >> s;
        A[idx(s[0])][idx(s[1])] = 0;
    }
    Mat P = power(A, n - 1, MOD);
    long long total = 0;
    for (auto& row : P) for (long long v : row) total = (total + v) % MOD;
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(m³ log n)',
      space: 'O(m²)',
      accepted: true,
      toolkit: ['vector', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('DP over the last letter', 'শেষ অক্ষরের ওপর DP'),
      idea: L('dp[c] = strings ending in c; extend n − 1 times.', 'dp[c] = c-তে শেষ হওয়া স্ট্রিং; n − ১ বার বাড়ানো।'),
      explain: [L('O(n · m²) for small n.', 'ছোট n-এ O(n · m²)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int idx(char c) { return islower(c) ? c - 'a' : c - 'A' + 26; }

int main() {
    long long n;
    int m, k;
    cin >> n >> m >> k;
    vector<vector<bool>> bad(m, vector<bool>(m, false));
    for (int i = 0; i < k; i++) { string s; cin >> s; bad[idx(s[0])][idx(s[1])] = true; }
    if (n > 100000) { cout << "\n"; return 0; }
    const long long MOD = 1000000007;
    vector<long long> dp(m, 1);
    for (long long t = 1; t < n; t++) {
        vector<long long> nd(m, 0);
        for (int a = 0; a < m; a++)
            for (int b = 0; b < m; b++) if (!bad[a][b]) nd[b] = (nd[b] + dp[a]) % MOD;
        dp = nd;
    }
    long long total = 0;
    for (long long v : dp) total = (total + v) % MOD;
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(n · m²)',
      space: 'O(m)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '3 3 2\nab\nba', output: '17', source: 'sample', note: sample(1) },
    { input: '3 3 0', output: '27', source: 'sample', note: sample(2) },
    { input: '2 1 1\naa', output: '0', source: 'sample', note: sample(3) },
    { input: '1 5 0', output: '5', source: 'own', note: L('n = 1: just the letters.', 'n = ১: শুধু অক্ষর।') },
  ],
  pitfalls: [L('Raising to the power n instead of n − 1.', 'n − ১-এর বদলে n ঘাতে তোলা।')],
  related: [{ id: '1117D', name: 'Magic Gems', why: L('Matrix exponentiation.', 'ম্যাট্রিক্স সূচক।') }],
  toolkit: ['vector'],
};

export const p687B: ProblemEntry = {
  id: '687B',
  contestId: 687,
  index: 'B',
  name: 'Remainders Game',
  rating: 1800,
  tags: ['crt', 'math', 'number-theory'],
  featuredFor: ['crt'],
  why: L('By the Chinese remainder theorem, knowing x mod every cᵢ means knowing x mod lcm(c); so x mod k is known iff k divides that lcm.', 'চাইনিজ রিমেইন্ডার উপপাদ্য অনুযায়ী প্রতিটি cᵢ দিয়ে x mod জানা মানে lcm(c) দিয়ে x mod জানা; তাই x mod k জানা যায় ঠিক তখনই যখন k সেই lcm-কে ভাগ করে।'),
  statement: L('A hidden positive x. You are told x mod c₁, …, x mod cₙ. Can you always determine x mod k?', 'একটি লুকানো ধনাত্মক x। আপনাকে x mod c₁, …, x mod cₙ বলা হয়। আপনি কি সবসময় x mod k নির্ধারণ করতে পারবেন?'),
  input: L('n k, then c₁ … cₙ.', 'n k, তারপর c₁ … cₙ।'),
  output: L('Yes or No.', 'Yes অথবা No।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n, k, cᵢ ≤ 10⁶', 'n, k, cᵢ ≤ ১০⁶')] },
  samples: [
    { input: '4 5\n2 3 5 12', output: 'Yes', explain: L('5 is one of the cᵢ.', '৫ cᵢ-গুলোর একটি।') },
    { input: '2 7\n2 3', output: 'No', explain: L('x = 1 and x = 7 look the same mod 2 and 3.', 'x = ১ আর x = ৭ mod ২ আর ৩-এ একই দেখায়।') },
  ],
  observation: L('The remainders determine x exactly modulo L = lcm(c₁, …, cₙ), and nothing more (x and x + L are indistinguishable). So x mod k is determined iff k | L. The lcm can be huge, so compute lcm of gcd(cᵢ, k) instead, which stays ≤ k.', 'ভাগশেষগুলো x-কে ঠিক L = lcm(c₁, …, cₙ) মডুলো নির্ধারণ করে, এর বেশি নয় (x আর x + L আলাদা করা যায় না)। তাই x mod k নির্ধারিত ঠিক তখনই যখন k | L। lcm বিশাল হতে পারে, তাই বদলে gcd(cᵢ, k)-এর lcm হিসাব করুন, যা ≤ k থাকে।'),
  approach: [L('g = lcm over i of gcd(cᵢ, k); Yes iff g == k.', 'g = সব i-এর ওপর gcd(cᵢ, k)-এর lcm; g == k হলেই Yes।')],
  walkthrough: { input: 'k = 7, c = 2 3', steps: [{ state: 'gcd(2, 7) = 1, gcd(3, 7) = 1', text: L('lcm 1 ≠ 7: No.', 'lcm ১ ≠ ৭: No।') }] },
  complexity: { time: 'O(n log k)', space: 'O(1)', why: L('One gcd per number.', 'প্রতি সংখ্যায় একটি gcd।') },
  solutions: [
    {
      id: 'lcm-gcd',
      kind: 'optimal',
      title: L('lcm of gcd(cᵢ, k)', 'gcd(cᵢ, k)-এর lcm'),
      idea: L('Keep only the part of each cᵢ that matters for k.', 'প্রতিটি cᵢ-এর শুধু k-এর জন্য গুরুত্বপূর্ণ অংশ রাখা।'),
      explain: [L('k | lcm(cᵢ) is equivalent to k = lcm(gcd(cᵢ, k)), which never exceeds k: a standard way to avoid huge lcms.', 'k | lcm(cᵢ) সমতুল্য k = lcm(gcd(cᵢ, k))-এর, যা কখনো k ছাড়ায় না: বিশাল lcm এড়ানোর প্রচলিত উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long k;
    scanf("%d %lld", &n, &k);
    long long g = 1;
    for (int i = 0; i < n; i++) {
        long long c;
        scanf("%lld", &c);
        long long d = __gcd(c, k);
        g = g / __gcd(g, d) * d;
    }
    puts(g == k ? "Yes" : "No");
    return 0;
}
`,
      time: 'O(n log k)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['gcd-lcm', 'c-io'],
    },
    {
      id: 'prime-powers',
      kind: 'method',
      title: L('Check each prime power of k', 'k-এর প্রতিটি মৌলিক ঘাত যাচাই'),
      idea: L('k | lcm iff for every pᵉ ∥ k some cᵢ is divisible by pᵉ.', 'k | lcm ঠিক তখনই যখন প্রতিটি pᵉ ∥ k-এর জন্য কোনো cᵢ pᵉ দিয়ে বিভাজ্য।'),
      explain: [L('The CRT view: x mod k splits into independent x mod pᵉ for the prime powers of k, and x mod pᵉ is known iff some cᵢ is a multiple of pᵉ.', 'CRT দৃষ্টি: x mod k k-এর মৌলিক ঘাতের জন্য স্বাধীন x mod pᵉ-তে ভাগ হয়, আর x mod pᵉ জানা ঠিক তখনই যখন কোনো cᵢ pᵉ-এর গুণিতক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long k;
    scanf("%d %lld", &n, &k);
    vector<long long> c(n);
    for (auto& v : c) scanf("%lld", &v);
    vector<long long> pp;  // prime powers of k
    long long t = k;
    for (long long p = 2; p * p <= t; p++)
        if (t % p == 0) {
            long long q = 1;
            while (t % p == 0) { t /= p; q *= p; }
            pp.push_back(q);
        }
    if (t > 1) pp.push_back(t);
    bool ok = true;
    for (long long q : pp) {
        bool found = false;
        for (long long v : c) if (v % q == 0) { found = true; break; }
        if (!found) ok = false;
    }
    puts(ok ? "Yes" : "No");
    return 0;
}
`,
      time: 'O(n · ω(k) + √k)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['modulo', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Look for two indistinguishable x', 'আলাদা করা যায় না এমন দুটি x খোঁজা'),
      idea: L('Group x by its remainder vector and check x mod k inside each group.', 'x-কে তার ভাগশেষ ভেক্টর দিয়ে দলে ভাগ করে প্রতিটি দলের ভেতরে x mod k যাচাই।'),
      explain: [L('Directly tests the definition on x up to (lcm · k): small values only.', '(lcm · k) পর্যন্ত x-এ সরাসরি সংজ্ঞা পরীক্ষা: শুধু ছোট মান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> c(n);
    for (auto& v : c) cin >> v;
    long long L = 1;
    for (long long v : c) { L = L / __gcd(L, v) * v; if (L > 10000) { cout << "\n"; return 0; } }
    if (L * k > 200000) { cout << "\n"; return 0; }
    map<vector<long long>, long long> seen;
    bool ok = true;
    for (long long x = 1; x <= L * k && ok; x++) {
        vector<long long> key;
        for (long long v : c) key.push_back(x % v);
        auto it = seen.find(key);
        if (it == seen.end()) seen[key] = x % k;
        else if (it->second != x % k) ok = false;
    }
    cout << (ok ? "Yes" : "No") << "\n";
    return 0;
}
`,
      time: 'O(L · k · n)',
      space: 'O(L · n)',
      accepted: false,
      toolkit: ['map', 'gcd-lcm'],
    },
  ],
  tests: [
    { input: '4 5\n2 3 5 12', output: 'Yes', source: 'sample', note: sample(1) },
    { input: '2 7\n2 3', output: 'No', source: 'sample', note: sample(2) },
    { input: '2 6\n2 3', output: 'Yes', source: 'own', note: L('lcm(2, 3) = 6.', 'lcm(২, ৩) = ৬।') },
  ],
  pitfalls: [L('Computing the lcm of all cᵢ directly and overflowing.', 'সব cᵢ-এর lcm সরাসরি হিসাব করে ওভারফ্লো।')],
  related: [{ id: '1370C', name: 'Number Game', why: L('Number theory.', 'সংখ্যাতত্ত্ব।') }],
  toolkit: ['gcd-lcm'],
};
