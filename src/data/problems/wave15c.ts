import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const realAnswer = L('Answers within 10⁻⁶ absolute or relative error are accepted.', '১০⁻⁶ পরম বা আপেক্ষিক ভুলের মধ্যে উত্তর গ্রহণযোগ্য।');

export const p621C: ProblemEntry = {
  id: '621C',
  contestId: 621,
  index: 'C',
  name: 'Wet Shark and Flowers',
  rating: 1700,
  tags: ['combinatorics', 'math', 'number-theory', 'probabilities'],
  why: L('Linearity of expectation over the n neighbour pairs, plus “divisible by a prime p” turning a product condition into an OR.', 'n-টি প্রতিবেশী জোড়ার ওপর প্রত্যাশার রৈখিকতা, আর “মৌলিক p দিয়ে বিভাজ্য” গুণফলের শর্তকে একটি OR-এ বদলে দেয়।'),
  statement: L('n sharks sit in a circle. Shark i picks a uniformly random integer from [lᵢ, rᵢ]. For every pair of neighbours whose product is divisible by the prime p, each of the two gets 1000 dollars. Find the expected total amount of money.', 'n-টি হাঙর একটি বৃত্তে বসে। হাঙর i [lᵢ, rᵢ] থেকে একটি সমভাবে এলোমেলো পূর্ণসংখ্যা নেয়। প্রতিবেশী যেকোনো জোড়ার গুণফল মৌলিক p দিয়ে বিভাজ্য হলে দুজনেই ১০০০ ডলার পায়। মোট টাকার প্রত্যাশিত পরিমাণ বের করুন।'),
  input: L('n p, then n lines lᵢ rᵢ.', 'n p, তারপর n লাইনে lᵢ rᵢ।'),
  output: L('The expected total.', 'প্রত্যাশিত মোট।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('3 ≤ n ≤ 10⁵, 2 ≤ p ≤ 10⁹ prime, 1 ≤ lᵢ ≤ rᵢ ≤ 10⁹', '৩ ≤ n ≤ ১০⁵, ২ ≤ p ≤ ১০⁹ মৌলিক, ১ ≤ lᵢ ≤ rᵢ ≤ ১০⁹'), realAnswer] },
  samples: [
    { input: '3 2\n1 2\n420 421\n420420 420421', output: '4500.0', explain: L('Divisibility probabilities ½, ½, ½; each pair pays 2000 with probability ¾.', 'বিভাজ্যতার সম্ভাবনা ½, ½, ½; প্রতিটি জোড়া ¾ সম্ভাবনায় ২০০০ দেয়।') },
    { input: '3 5\n1 4\n2 3\n11 14', output: '0.0', explain: L('No range contains a multiple of 5.', 'কোনো পরিসরে ৫-এর গুণিতক নেই।') },
  ],
  observation: L('Because p is prime, p divides sᵢ · sⱼ exactly when p divides sᵢ or sⱼ. With qᵢ = (multiples of p in [lᵢ, rᵢ]) / (rᵢ − lᵢ + 1), a pair pays 2000 with probability 1 − (1 − qᵢ)(1 − qⱼ). By linearity add this over the n neighbouring pairs.', 'p মৌলিক বলে p ঠিক তখন sᵢ · sⱼ-কে ভাগ করে যখন p sᵢ বা sⱼ-কে ভাগ করে। qᵢ = ([lᵢ, rᵢ]-এ p-এর গুণিতক) / (rᵢ − lᵢ + ১) নিলে একটি জোড়া ১ − (১ − qᵢ)(১ − qⱼ) সম্ভাবনায় ২০০০ দেয়। রৈখিকতায় n-টি প্রতিবেশী জোড়ার ওপর যোগ।'),
  approach: [L('Multiples of p in [l, r]: r / p − (l − 1) / p with integer division.', '[l, r]-এ p-এর গুণিতক: পূর্ণসংখ্যা ভাগে r / p − (l − ১) / p।'), L('Sum 2000 · (1 − (1 − qᵢ)(1 − qᵢ₊₁)) cyclically.', 'বৃত্তাকারে ২০০০ · (১ − (১ − qᵢ)(১ − qᵢ₊₁)) যোগ।')],
  walkthrough: {
    input: 'first sample',
    steps: [
      { state: 'q = ½, ½, ½', text: L('Each range has one even number out of two.', 'প্রতিটি পরিসরে দুটির মধ্যে একটি জোড়।') },
      { state: '3 · 2000 · ¾ = 4500', text: L('Three neighbour pairs on the circle.', 'বৃত্তে তিনটি প্রতিবেশী জোড়া।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('O(1) per shark and per pair.', 'প্রতি হাঙর আর প্রতি জোড়ায় O(১)।') },
  solutions: [
    {
      id: 'linearity',
      kind: 'optimal',
      title: L('Linearity over pairs', 'জোড়ার ওপর রৈখিকতা'),
      idea: L('Expected money = Σ over pairs of 2000 · P(pair pays).', 'প্রত্যাশিত টাকা = জোড়ার ওপর Σ ২০০০ · P(জোড়া দেয়)।'),
      explain: [L('Neighbouring pairs share sharks, so their events are dependent; linearity does not care. The prime p is what makes “product divisible” equal to “one of them divisible”; for a composite p this would be false (2 · 3 is divisible by 6).', 'প্রতিবেশী জোড়াগুলো হাঙর ভাগ করে, তাই ঘটনাগুলো নির্ভরশীল; রৈখিকতার তাতে কিছু আসে যায় না। মৌলিক p-ই “গুণফল বিভাজ্য” = “একজন বিভাজ্য” করে; যৌগিক p-এ এটি মিথ্যা (২ · ৩ ছয় দিয়ে বিভাজ্য)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long p;
    scanf("%d %lld", &n, &p);
    vector<double> q(n);  // q[i] = probability that shark i's number is divisible by p
    for (int i = 0; i < n; i++) {
        long long l, r;
        scanf("%lld %lld", &l, &r);
        long long good = r / p - (l - 1) / p;
        q[i] = (double)good / (r - l + 1);
    }
    double ans = 0;
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;  // neighbours on the circle
        // The pair pays 2000 dollars unless both numbers avoid p.
        ans += 2000 * (1 - (1 - q[i]) * (1 - q[j]));
    }
    printf("%.10f\n", ans);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['long-long', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every assignment of numbers', 'সংখ্যার প্রতিটি বণ্টন'),
      idea: L('Enumerate all choices and average the payout.', 'সব পছন্দ তালিকা করে প্রাপ্তির গড়।'),
      explain: [L('Checks sᵢ · sᵢ₊₁ % p directly, so it would also catch a wrong prime argument.', 'সরাসরি sᵢ · sᵢ₊₁ % p যাচাই করে, তাই ভুল মৌলিক-যুক্তিও ধরত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long p;
    cin >> n >> p;
    vector<long long> l(n), r(n);
    long long total = 1;
    for (int i = 0; i < n; i++) { cin >> l[i] >> r[i]; total *= r[i] - l[i] + 1; }
    if (total > 2000000) { cout << "\n"; return 0; }
    vector<long long> s(n);
    double sum = 0;
    // Odometer over every assignment of numbers.
    for (long long code = 0; code < total; code++) {
        long long x = code;
        for (int i = 0; i < n; i++) { long long w = r[i] - l[i] + 1; s[i] = l[i] + x % w; x /= w; }
        long long money = 0;
        for (int i = 0; i < n; i++)
            if (s[i] * s[(i + 1) % n] % p == 0) money += 2000;
        sum += money;
    }
    printf("%.10f\n", sum / total);
    return 0;
}
`,
      time: 'O(Π (rᵢ − lᵢ + 1) · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['long-long'],
    },
  ],
  tests: [
    { input: '3 2\n1 2\n420 421\n420420 420421', output: '4500.0', source: 'sample', note: sample(1) },
    { input: '3 5\n1 4\n2 3\n11 14', output: '0.0', source: 'sample', note: sample(2) },
    { input: '3 2\n2 2\n4 4\n6 6', output: '6000', source: 'own', note: L('Every number is even: every pair pays.', 'প্রতিটি সংখ্যা জোড়: প্রতিটি জোড়া দেয়।') },
  ],
  pitfalls: [L('Forgetting the pair (n, 1) that closes the circle.', 'বৃত্ত বন্ধ করা জোড়া (n, ১) ভুলে যাওয়া।'), L('Paying 1000 instead of 2000 per pair: both sharks get the money.', 'প্রতি জোড়ায় ২০০০-এর বদলে ১০০০: দুই হাঙরই টাকা পায়।')],
  related: [
    { id: '280C', name: 'Game on Tree', why: L('Linearity of expectation.', 'প্রত্যাশার রৈখিকতা।') },
    { id: '1461C', name: 'Random Events', why: L('Probability of “at least one success”.', '“অন্তত একটি সাফল্য”-এর সম্ভাবনা।') },
  ],
  toolkit: ['setprecision'],
};

export const p1543C: ProblemEntry = {
  id: '1543C',
  contestId: 1543,
  index: 'C',
  name: 'Need for Pink Slips',
  rating: 1900,
  tags: ['bitmasks', 'brute-force', 'dfs', 'implementation', 'math', 'probabilities'],
  why: L('An expectation over a tree of states that is small because every step shrinks a probability by at least v ≥ 0.1.', 'অবস্থার একটি গাছের ওপর প্রত্যাশা, যা ছোট কারণ প্রতিটি ধাপ একটি সম্ভাবনাকে অন্তত v ≥ ০.১ কমায়।'),
  statement: L('Each race gives one slip: Cash with probability c, Marker m, or Pink p (c + m + p = 1). Drawing Pink ends the game. Drawing a non-pink slip with probability a: if a ≤ v the slip disappears and its probability a is split equally among the other valid slips; otherwise it drops to a − v and v is split equally among the other valid slips. Find the expected number of races.', 'প্রতিটি রেসে একটি স্লিপ: Cash c সম্ভাবনায়, Marker m, বা Pink p (c + m + p = ১)। Pink পেলে খেলা শেষ। a সম্ভাবনার একটি অ-পিঙ্ক স্লিপ পেলে: a ≤ v হলে স্লিপটি হারায় আর তার a সম্ভাবনা বাকি বৈধ স্লিপগুলোতে সমান ভাগ হয়; নইলে এটি a − v-তে নামে আর v বাকি বৈধ স্লিপগুলোতে সমান ভাগ হয়। প্রত্যাশিত রেসের সংখ্যা বের করুন।'),
  input: L('t; each case c m p v.', 't; প্রতি কেসে c m p v।'),
  output: L('One expectation per case.', 'প্রতি কেসে একটি প্রত্যাশা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('t ≤ 10, 0.1 ≤ v ≤ 0.9, at most 4 decimal places', 't ≤ ১০, ০.১ ≤ v ≤ ০.৯, সর্বোচ্চ ৪ দশমিক ঘর'), realAnswer] },
  samples: [
    {
      input: '4\n0.2 0.2 0.6 0.2\n0.4 0.2 0.4 0.8\n0.4998 0.4998 0.0004 0.1666\n0.3125 0.6561 0.0314 0.2048',
      output: '1.532000000000\n1.860000000000\n5.005050776521\n4.260163673896',
      explain: L('Four independent games.', 'চারটি স্বাধীন খেলা।'),
    },
  ],
  observation: L('E(c, m, p) = 1 + c · E(after drawing Cash) + m · E(after drawing Marker); drawing Pink contributes nothing more. Every non-pink draw lowers that slip by at least v ≥ 0.1 or removes it, so the recursion depth is at most about 20 and the whole tree is tiny.', 'E(c, m, p) = ১ + c · E(Cash পাওয়ার পর) + m · E(Marker পাওয়ার পর); Pink পেলে আর কিছু যোগ হয় না। প্রতিটি অ-পিঙ্ক টান সেই স্লিপকে অন্তত v ≥ ০.১ কমায় বা সরায়, তাই পুনরাবৃত্তির গভীরতা প্রায় সর্বোচ্চ ২০ আর পুরো গাছ ক্ষুদ্র।'),
  approach: [L('Write the transition once for “draw slip x, other slip y”, handling a vanished y (probability 0) by giving everything to Pink.', '“স্লিপ x টানো, অন্য স্লিপ y” রূপান্তর একবার লিখুন, হারানো y (সম্ভাবনা ০) হলে সব Pink-কে দিন।'), L('Recurse; compare with a small ε because of floating point.', 'পুনরাবৃত্তি; ভাসমান বিন্দুর কারণে ছোট ε দিয়ে তুলনা।')],
  walkthrough: {
    input: '0.2 0.2 0.6 0.2',
    steps: [
      { state: 'Cash: (0, 0.3, 0.7)', text: L('c = 0.2 ≤ v vanishes; 0.1 to each of Marker and Pink.', 'c = ০.২ ≤ v হারায়; Marker আর Pink প্রত্যেকে ০.১।') },
      { state: 'then Marker: (0, 0, 1)', text: L('Marker vanishes too, Pink becomes certain.', 'Marker-ও হারায়, Pink নিশ্চিত হয়।') },
      { state: 'E = 1.532', text: L('Summing the tree of such branches.', 'এমন শাখার গাছ যোগ করে।') },
    ],
  },
  complexity: { time: 'O(2^(2/v))', space: 'O(1/v)', why: L('Each path has at most ≈ 2/v non-pink draws.', 'প্রতিটি পথে সর্বোচ্চ ≈ ২/v অ-পিঙ্ক টান।') },
  solutions: [
    {
      id: 'recursion',
      kind: 'optimal',
      title: L('Recursive expectation', 'পুনরাবৃত্ত প্রত্যাশা'),
      idea: L('E = 1 + Σ over non-pink draws of P(draw) · E(next state).', 'E = ১ + অ-পিঙ্ক টানের ওপর Σ P(টান) · E(পরের অবস্থা)।'),
      explain: [L('The “+1” counts the current race, whatever is drawn; Pink stops, so it adds no further term. Representing a vanished slip by probability 0 keeps the code short, but use an ε because 0.3 − 0.1 − 0.1 − 0.1 is not exactly 0 in floating point.', '“+১” বর্তমান রেসটি গোনে, যা-ই টানা হোক; Pink থামায়, তাই আর কোনো পদ যোগ হয় না। হারানো স্লিপকে সম্ভাবনা ০ দিয়ে বোঝালে কোড ছোট থাকে, কিন্তু ε ব্যবহার করুন কারণ ভাসমান বিন্দুতে ০.৩ − ০.১ − ০.১ − ০.১ ঠিক ০ নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const double EPS = 1e-9;
double v;

// Expected number of races from the current probabilities (0 means the slip is gone).
double expectRaces(double c, double m, double p) {
    double res = 1;  // this race
    auto draw = [&](double x, double y) {
        // x is drawn; returns the new (x, y, pink) after the volatility rule; y is the other slip.
        double move = min(x, v);
        double nx = x - move;
        if (nx < EPS) nx = 0;
        if (y > EPS) return array<double, 3>{nx, y + move / 2, p + move / 2};
        return array<double, 3>{nx, y, p + move};
    };
    if (c > EPS) {
        auto [nc, nm, np] = draw(c, m);
        res += c * expectRaces(nc, nm, np);
    }
    if (m > EPS) {
        auto [nm, nc, np] = draw(m, c);
        res += m * expectRaces(nc, nm, np);
    }
    return res;  // drawing pink ends everything: contributes p * 1, already in res
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        double c, m, p;
        scanf("%lf %lf %lf %lf", &c, &m, &p, &v);
        printf("%.12f\n", expectRaces(c, m, p));
    }
    return 0;
}
`,
      time: 'O(2^(2/v))',
      space: 'O(1/v)',
      accepted: true,
      toolkit: ['lambda', 'structured-bindings', 'setprecision'],
    },
    {
      id: 'brute',
      kind: 'method',
      title: L('Explicit walk over draw sequences', 'টানের ক্রমের ওপর স্পষ্ট হাঁটা'),
      idea: L('Keep a stack of (state, probability, races so far); a Pink draw adds probability × length.', '(অবস্থা, সম্ভাবনা, এ পর্যন্ত রেস)-এর একটি স্ট্যাক রাখুন; Pink টান সম্ভাবনা × দৈর্ঘ্য যোগ করে।'),
      explain: [L('The definition of expectation, Σ P(sequence) · length, computed sequence by sequence. It visits the same tree as the recursion, written without recursion.', 'প্রত্যাশার সংজ্ঞা, Σ P(ক্রম) · দৈর্ঘ্য, ক্রম ধরে ধরে হিসাব। পুনরাবৃত্তির মতোই একই গাছ দেখে, পুনরাবৃত্তি ছাড়া লেখা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

// Walk every sequence of draws explicitly, accumulating P(sequence) * length.
struct State { double c, m, p, prob; int races; };

int main() {
    int t;
    cin >> t;
    while (t--) {
        double c, m, p, v;
        cin >> c >> m >> p >> v;
        vector<State> todo = {{c, m, p, 1, 0}};
        double ans = 0;
        while (!todo.empty()) {
            State s = todo.back();
            todo.pop_back();
            ans += s.prob * s.p * (s.races + 1);  // pink drawn now
            for (int which = 0; which < 2; which++) {
                double x = which == 0 ? s.c : s.m, y = which == 0 ? s.m : s.c;
                if (x <= 1e-9) continue;
                double nx, ny, np;
                if (x <= v + 1e-12) {  // the slip disappears
                    nx = 0;
                    if (y > 1e-9) ny = y + x / 2, np = s.p + x / 2;
                    else ny = y, np = s.p + x;
                } else {
                    nx = x - v;
                    if (y > 1e-9) ny = y + v / 2, np = s.p + v / 2;
                    else ny = y, np = s.p + v;
                }
                State nxt = which == 0 ? State{nx, ny, np, s.prob * x, s.races + 1} : State{ny, nx, np, s.prob * x, s.races + 1};
                todo.push_back(nxt);
            }
        }
        printf("%.12f\n", ans);
    }
    return 0;
}
`,
      time: 'O(2^(2/v))',
      space: 'O(2^(2/v))',
      accepted: true,
      toolkit: ['vector', 'setprecision'],
    },
  ],
  tests: [
    { input: '4\n0.2 0.2 0.6 0.2\n0.4 0.2 0.4 0.8\n0.4998 0.4998 0.0004 0.1666\n0.3125 0.6561 0.0314 0.2048', output: '1.532000000000\n1.860000000000\n5.005050776521\n4.260163673896', source: 'sample', note: sample(1) },
  ],
  pitfalls: [L('Giving half of the removed probability to a slip that has already vanished.', 'ইতিমধ্যে হারানো স্লিপকে সরানো সম্ভাবনার অর্ধেক দেওয়া।'), L('Comparing doubles with == 0.', 'double-কে == ০ দিয়ে তুলনা।')],
  related: [
    { id: '540D', name: 'Bad Luck Island', why: L('Expectation over a shrinking state.', 'সংকুচিত অবস্থার ওপর প্রত্যাশা।') },
    { id: '1265E', name: 'Beautiful Mirrors', why: L('Expected number of steps.', 'প্রত্যাশিত ধাপের সংখ্যা।') },
  ],
  toolkit: ['setprecision'],
};

export const p1461C: ProblemEntry = {
  id: '1461C',
  contestId: 1461,
  index: 'C',
  name: 'Random Events',
  rating: 1500,
  tags: ['dp', 'math', 'probabilities'],
  why: L('Reduce the process to one number (the last unsorted position) and then compute “at least one success”.', 'প্রক্রিয়াটিকে একটি সংখ্যায় নামিয়ে আনুন (শেষ অ-সাজানো অবস্থান), তারপর “অন্তত একটি সাফল্য” হিসাব।'),
  statement: L('A permutation of 1 … n goes through m experiments in order. Experiment i sorts the prefix of length rᵢ with probability pᵢ (and does nothing otherwise). Find the probability that the permutation is sorted at the end.', '১ … n-এর একটি পারমুটেশন ক্রমে m-টি পরীক্ষার মধ্য দিয়ে যায়। পরীক্ষা i pᵢ সম্ভাবনায় দৈর্ঘ্য rᵢ-এর প্রিফিক্স সাজায় (নইলে কিছু করে না)। শেষে পারমুটেশন সাজানো থাকার সম্ভাবনা বের করুন।'),
  input: L('t; each case n m, the permutation, then m lines rᵢ pᵢ.', 't; প্রতি কেসে n m, পারমুটেশন, তারপর m লাইনে rᵢ pᵢ।'),
  output: L('One probability per case.', 'প্রতি কেসে একটি সম্ভাবনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σn, Σm ≤ 10⁵', 'Σn, Σm ≤ ১০⁵'), realAnswer] },
  samples: [
    {
      input: '4\n4 3\n4 3 2 1\n1 0.3\n3 1\n4 0.6\n5 3\n4 2 1 3 5\n3 0.8\n4 0.6\n5 0.3\n6 5\n1 3 2 4 5 6\n4 0.9\n5 0.3\n2 0.4\n6 0.7\n3 0.5\n4 2\n1 2 3 4\n2 0.5\n4 0.1',
      output: '0.600000\n0.720000\n0.989500\n1.000000',
      explain: L('Case 1 needs the length-4 sort: 0.6. Case 4 is already sorted.', 'কেস ১-এ দৈর্ঘ্য-৪ সাজানো লাগে: ০.৬। কেস ৪ আগেই সাজানো।'),
    },
  ],
  observation: L('Let k be the last position with aₖ ≠ k. Positions after k are already correct. The array becomes sorted exactly when some experiment with rᵢ ≥ k happens (a shorter sort never fixes position k, and a successful long sort makes everything correct forever). So the answer is 1 − Π (1 − pᵢ) over experiments with rᵢ ≥ k, or 1 if k = 0.', 'k হলো শেষ অবস্থান যেখানে aₖ ≠ k। k-এর পরের অবস্থান আগেই সঠিক। অ্যারে সাজানো হয় ঠিক তখন যখন rᵢ ≥ k এমন কোনো পরীক্ষা ঘটে (ছোট সাজানো কখনো অবস্থান k ঠিক করে না, আর সফল লম্বা সাজানো সবকিছু চিরকাল সঠিক করে)। তাই উত্তর ১ − Π (১ − pᵢ), rᵢ ≥ k এমন পরীক্ষার ওপর, বা k = ০ হলে ১।'),
  approach: [L('Find k by scanning from the right.', 'ডান থেকে স্ক্যান করে k খুঁজুন।'), L('Multiply the failure probabilities of relevant experiments.', 'প্রাসঙ্গিক পরীক্ষার ব্যর্থতার সম্ভাবনা গুণ করুন।')],
  walkthrough: {
    input: '4 2 1 3 5 · (3, 0.8) (4, 0.6) (5, 0.3)',
    steps: [
      { state: 'k = 4', text: L('Position 5 is correct; position 4 holds 3.', 'অবস্থান ৫ সঠিক; অবস্থান ৪-এ ৩।') },
      { state: 'relevant: 0.6, 0.3', text: L('The length-3 sort cannot help.', 'দৈর্ঘ্য-৩ সাজানো সাহায্য করতে পারে না।') },
      { state: '1 − 0.4 · 0.7 = 0.72', text: L('At least one of them happens.', 'তাদের অন্তত একটি ঘটে।') },
    ],
  },
  complexity: { time: 'O(n + m)', space: 'O(n)', why: L('One scan and one product.', 'একটি স্ক্যান আর একটি গুণফল।') },
  solutions: [
    {
      id: 'complement',
      kind: 'optimal',
      title: L('1 − Π (1 − pᵢ) over long sorts', 'লম্বা সাজানোর ওপর ১ − Π (১ − pᵢ)'),
      idea: L('Only prefix sorts reaching the last wrong position matter.', 'শুধু শেষ ভুল অবস্থান পর্যন্ত পৌঁছানো প্রিফিক্স সাজানো গুরুত্বপূর্ণ।'),
      explain: [L('“At least one of several independent events” is always easiest through its complement “none of them”. The special case of an already sorted array must print 1, not 1 − (empty product) computed in a way that could go wrong.', '“কয়েকটি স্বাধীন ঘটনার অন্তত একটি” সবসময় তার পরিপূরক “একটিও নয়” দিয়ে সবচেয়ে সহজ। আগেই সাজানো অ্যারের বিশেষ ক্ষেত্রে ১ ছাপতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
        int need = n;  // the shortest prefix that must be sorted
        while (need > 0 && a[need] == need) need--;
        double allFail = 1;
        for (int i = 0; i < m; i++) {
            int r;
            double p;
            scanf("%d %lf", &r, &p);
            if (r >= need) allFail *= 1 - p;  // only long-enough prefixes can finish the job
        }
        printf("%.6f\n", need == 0 ? 1.0 : 1 - allFail);
    }
    return 0;
}
`,
      time: 'O(n + m)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['setprecision', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every subset of experiments', 'পরীক্ষার প্রতিটি উপসেট'),
      idea: L('Simulate each of the 2ᵐ outcomes with real sorting.', '২ᵐ ফলাফলের প্রতিটি আসল সাজানো দিয়ে অনুকরণ।'),
      explain: [L('Applies the sorts in order, so it checks the claim that only the last wrong position matters.', 'সাজানোগুলো ক্রমে প্রয়োগ করে, তাই শুধু শেষ ভুল অবস্থান গুরুত্বপূর্ণ এই দাবি যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        vector<int> r(m);
        vector<double> p(m);
        for (int i = 0; i < m; i++) cin >> r[i] >> p[i];
        if (m > 16) { cout << "\n"; continue; }
        double ans = 0;
        for (int mask = 0; mask < (1 << m); mask++) {  // which experiments happen
            double prob = 1;
            vector<int> b = a;
            for (int i = 0; i < m; i++) {
                if (mask >> i & 1) { prob *= p[i]; sort(b.begin(), b.begin() + r[i]); }
                else prob *= 1 - p[i];
            }
            if (is_sorted(b.begin(), b.end())) ans += prob;
        }
        printf("%.6f\n", ans);
    }
    return 0;
}
`,
      time: 'O(2ᵐ · m · n log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['sort'],
    },
  ],
  tests: [
    { input: '4\n4 3\n4 3 2 1\n1 0.3\n3 1\n4 0.6\n5 3\n4 2 1 3 5\n3 0.8\n4 0.6\n5 0.3\n6 5\n1 3 2 4 5 6\n4 0.9\n5 0.3\n2 0.4\n6 0.7\n3 0.5\n4 2\n1 2 3 4\n2 0.5\n4 0.1', output: '0.600000\n0.720000\n0.989500\n1.000000', source: 'sample', note: sample(1) },
    { input: '1\n2 1\n2 1\n1 0.9', output: '0.000000', source: 'own', note: L('The only sort is too short.', 'একমাত্র সাজানো খুব ছোট।') },
  ],
  pitfalls: [L('Printing 0 for an already sorted array because no experiment is “needed”.', 'আগেই সাজানো অ্যারের জন্য ০ ছাপা, কারণ কোনো পরীক্ষা “দরকার” নেই।')],
  related: [
    { id: '621C', name: 'Wet Shark and Flowers', why: L('“At least one” through the complement.', 'পরিপূরক দিয়ে “অন্তত একটি”।') },
    { id: '312B', name: 'Archer', why: L('Products of failure probabilities.', 'ব্যর্থতার সম্ভাবনার গুণফল।') },
  ],
  toolkit: ['setprecision'],
};

export const p107B: ProblemEntry = {
  id: '107B',
  contestId: 107,
  index: 'B',
  name: 'Basketball Team',
  rating: 1600,
  tags: ['combinatorics', 'dp', 'math', 'probabilities'],
  why: L('Counting probability: favourable teams over all teams, computed as a product of ratios to avoid huge binomials.', 'গণনার সম্ভাবনা: অনুকূল দল ভাগ সব দল, বিশাল দ্বিপদ এড়াতে অনুপাতের গুণফল হিসেবে।'),
  statement: L('A team of n players is chosen uniformly among all teams that include Herr Wafa. There are m departments; department i has sᵢ students, and Herr Wafa belongs to department h (counted in s_h). Find the probability that he has at least one teammate from his own department, or −1 if there are not enough students for a team.', 'Herr Wafa-কে নিয়ে গঠিত সব দলের মধ্যে সমভাবে n খেলোয়াড়ের একটি দল বাছা হয়। m-টি বিভাগ আছে; বিভাগ i-তে sᵢ জন ছাত্র, আর Herr Wafa বিভাগ h-এ (s_h-তে গোনা)। তার নিজের বিভাগের অন্তত একজন সতীর্থ থাকার সম্ভাবনা বের করুন, অথবা দলের জন্য যথেষ্ট ছাত্র না থাকলে −১।'),
  input: L('n m h, then s₁ … sₘ.', 'n m h, তারপর s₁ … sₘ।'),
  output: L('The probability, or −1.', 'সম্ভাবনা, অথবা −১।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100, 1 ≤ m ≤ 1000, 1 ≤ sᵢ ≤ 100', '১ ≤ n ≤ ১০০, ১ ≤ m ≤ ১০০০, ১ ≤ sᵢ ≤ ১০০'), realAnswer] },
  samples: [
    { input: '3 2 1\n2 1', output: '1', explain: L('All 3 students play, including his departmentmate.', '৩ জন ছাত্রই খেলে, তার বিভাগের সঙ্গীসহ।') },
    { input: '3 2 1\n1 1', output: '-1', explain: L('Only 2 students.', 'মাত্র ২ জন ছাত্র।') },
    { input: '3 2 1\n2 2', output: '0.666667', explain: L('1 − C(2,2)/C(3,2) = 1 − 1/3.', '১ − C(২,২)/C(৩,২) = ১ − ১/৩।') },
  ],
  observation: L('Fix Herr Wafa; the other n − 1 players are a uniform subset of the other S − 1 students (S = Σ sᵢ). The bad case is all of them from the S − s_h students outside his department: C(S − s_h, n − 1) / C(S − 1, n − 1). Answer 1 − that ratio.', 'Herr Wafa-কে স্থির ধরুন; বাকি n − ১ খেলোয়াড় বাকি S − ১ ছাত্রের একটি সমভাবে এলোমেলো উপসেট (S = Σ sᵢ)। খারাপ ক্ষেত্রে তারা সবাই তার বিভাগের বাইরের S − s_h ছাত্র থেকে: C(S − s_h, n − ১) / C(S − ১, n − ১)। উত্তর ১ − সেই অনুপাত।'),
  approach: [L('If S < n print −1.', 'S < n হলে −১ ছাপুন।'), L('Compute the ratio as Π (S − s_h − i) / (S − 1 − i) for i = 0 … n − 2.', 'অনুপাতটি i = ০ … n − ২-এর জন্য Π (S − s_h − i) / (S − ১ − i) হিসেবে।')],
  walkthrough: {
    input: '3 2 1 · s = 2 2',
    steps: [
      { state: 'S = 4, others = 3, outside = 2', text: L('Choose 2 teammates from 3.', '৩ জন থেকে ২ জন সতীর্থ।') },
      { state: 'P(none) = 2/3 · 1/2 = 1/3', text: L('Both teammates from outside.', 'দুই সতীর্থই বাইরে থেকে।') },
      { state: '1 − 1/3 = 0.666667', text: L('The answer.', 'উত্তর।') },
    ],
  },
  complexity: { time: 'O(m + n)', space: 'O(m)', why: L('A sum and a product of n − 1 ratios.', 'একটি যোগফল আর n − ১টি অনুপাতের গুণফল।') },
  solutions: [
    {
      id: 'ratio',
      kind: 'optimal',
      title: L('Complement as a product of ratios', 'অনুপাতের গুণফল হিসেবে পরিপূরক'),
      idea: L('Pick teammates one by one, each from outside his department.', 'একজন একজন করে সতীর্থ বাছুন, প্রত্যেককে তার বিভাগের বাইরে থেকে।'),
      explain: [L('C(a, k) / C(b, k) = Π (a − i)/(b − i): picking teammates in order, the i-th must come from the a − i remaining outsiders among the b − i remaining students. The numbers stay below 1, so a double is safe even though C(100 000, 99) is astronomically large.', 'C(a, k) / C(b, k) = Π (a − i)/(b − i): ক্রমে সতীর্থ বাছলে i-তম জনকে বাকি b − i ছাত্রের মধ্যে বাকি a − i বহিরাগত থেকে আসতে হবে। সংখ্যাগুলো ১-এর নিচে থাকে, তাই C(১০০০০০, ৯৯) বিশাল হলেও double নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, h;
    cin >> n >> m >> h;
    vector<int> s(m + 1);
    int total = 0;
    for (int i = 1; i <= m; i++) cin >> s[i], total += s[i];
    if (total < n) { cout << -1 << "\n"; return 0; }
    // Herr Wafa is in; the other n - 1 places are a uniform choice among the other total - 1 students.
    int others = total - 1, outside = total - s[h];  // students not from his department
    double none = 1;  // P(no teammate from his department) = C(outside, n-1) / C(others, n-1)
    for (int i = 0; i < n - 1; i++) none *= double(outside - i) / (others - i);
    printf("%.10f\n", 1 - none);
    return 0;
}
`,
      time: 'O(m + n)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['setprecision'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('List every team', 'প্রতিটি দলের তালিকা'),
      idea: L('Enumerate subsets of size n containing him, count those with a departmentmate.', 'তাকে নিয়ে n আকারের উপসেট তালিকা করে বিভাগ-সঙ্গীসহ দল গুনুন।'),
      explain: [L('Turns the definition of a uniform choice into counting; tiny inputs only.', 'সমভাবে বাছাইয়ের সংজ্ঞাকে গণনায় রূপান্তর; শুধু ক্ষুদ্র ইনপুট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m, h;
    cin >> n >> m >> h;
    vector<int> dept;  // department of every student; student 0 is Herr Wafa
    dept.push_back(h);
    for (int i = 1; i <= m; i++) {
        int s;
        cin >> s;
        for (int j = 0; j < s - (i == h); j++) dept.push_back(i);
    }
    int total = dept.size();
    if (total < n) { cout << -1 << "\n"; return 0; }
    if (total > 20) { cout << "\n"; return 0; }
    long long teams = 0, good = 0;
    for (int mask = 0; mask < (1 << total); mask++) {
        if (__builtin_popcount(mask) != n || !(mask & 1)) continue;  // teams that include him
        teams++;
        bool mate = false;
        for (int i = 1; i < total; i++)
            if ((mask >> i & 1) && dept[i] == h) mate = true;
        good += mate;
    }
    printf("%.10f\n", (double)good / teams);
    return 0;
}
`,
      time: 'O(2^S · S)',
      space: 'O(S)',
      accepted: false,
      toolkit: ['popcount'],
    },
  ],
  tests: [
    { input: '3 2 1\n2 1', output: '1', source: 'sample', note: sample(1) },
    { input: '3 2 1\n1 1', output: '-1', source: 'sample', note: sample(2) },
    { input: '3 2 1\n2 2', output: '0.666667', source: 'sample', note: sample(3) },
    { input: '1 1 1\n5', output: '0', source: 'own', note: L('A one-player team has no teammates.', 'এক খেলোয়াড়ের দলে কোনো সতীর্থ নেই।') },
  ],
  pitfalls: [L('Computing binomials as doubles: they overflow long before n = 100 with S up to 10⁵.', 'দ্বিপদ double হিসেবে হিসাব: S ১০⁵ পর্যন্ত হলে n = ১০০-এর অনেক আগেই ওভারফ্লো।'), L('Forgetting that s_h already includes Herr Wafa.', 's_h-এ Herr Wafa আগেই আছে তা ভুলে যাওয়া।')],
  related: [
    { id: '476B', name: 'Dreamoon and WiFi', why: L('Probability as favourable over total.', 'অনুকূল ভাগ মোট হিসেবে সম্ভাবনা।') },
    { id: '1462E2', name: 'Close Tuples (hard version)', why: L('Counting subsets.', 'উপসেট গণনা।') },
  ],
  toolkit: ['setprecision'],
};

export const p768D: ProblemEntry = {
  id: '768D',
  contestId: 768,
  index: 'D',
  name: 'Jon and Orbs',
  rating: 2200,
  tags: ['dp', 'math', 'probabilities'],
  why: L('The coupon-collector process as a DP over days, run once and then answered for every query by binary search.', 'কুপন-সংগ্রাহক প্রক্রিয়া দিনের ওপর DP হিসেবে, একবার চালিয়ে তারপর প্রতিটি কোয়েরির উত্তর বাইনারি সার্চে।'),
  statement: L('Every day one orb appears, of one of k kinds uniformly at random. For each query pᵢ, find the minimum number of days such that the probability of having at least one orb of every kind is at least (pᵢ − ε) / 2000, where ε < 10⁻⁷.', 'প্রতিদিন একটি অর্ব আসে, k ধরনের যেকোনো একটির, সমভাবে এলোমেলো। প্রতিটি কোয়েরি pᵢ-এর জন্য সর্বনিম্ন দিনের সংখ্যা বের করুন যাতে প্রতিটি ধরনের অন্তত একটি অর্ব থাকার সম্ভাবনা অন্তত (pᵢ − ε) / ২০০০ হয়, যেখানে ε < ১০⁻⁷।'),
  input: L('k q, then q lines pᵢ.', 'k q, তারপর q লাইনে pᵢ।'),
  output: L('The minimum number of days for every query.', 'প্রতিটি কোয়েরির জন্য সর্বনিম্ন দিন।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ k, q ≤ 1000, 1 ≤ pᵢ ≤ 1000', '১ ≤ k, q ≤ ১০০০, ১ ≤ pᵢ ≤ ১০০০')] },
  samples: [
    { input: '1 1\n1', output: '1', explain: L('With one kind, one day suffices.', 'এক ধরনে একদিনই যথেষ্ট।') },
    { input: '2 2\n1\n2', output: '2\n2', explain: L('After 2 days both kinds appear with probability ½.', '২ দিন পরে দুই ধরনই ½ সম্ভাবনায় আসে।') },
  ],
  observation: L('dp[d][j] = probability of having exactly j kinds after d days: dp[d+1][j] += dp[d][j] · j/k and dp[d+1][j+1] += dp[d][j] · (k − j)/k. Every target is at most 1000/2000 = ½, and P(all kinds) grows with d, so simulate until it reaches ½ (a few thousand days for k = 1000) and binary search each query in the list of P(all kinds).', 'dp[d][j] = d দিন পরে ঠিক j ধরন থাকার সম্ভাবনা: dp[d+১][j] += dp[d][j] · j/k আর dp[d+১][j+১] += dp[d][j] · (k − j)/k। প্রতিটি লক্ষ্য সর্বোচ্চ ১০০০/২০০০ = ½, আর P(সব ধরন) d-এর সঙ্গে বাড়ে, তাই ½ পৌঁছানো পর্যন্ত অনুকরণ করুন (k = ১০০০-এ কয়েক হাজার দিন) আর P(সব ধরন)-এর তালিকায় প্রতিটি কোয়েরি বাইনারি সার্চ করুন।'),
  approach: [L('Run the DP with two rows, recording dp[d][k] after each day.', 'দুই সারিতে DP চালান, প্রতিদিন dp[d][k] লিখে রাখুন।'), L('Answer each query with lower_bound.', 'প্রতিটি কোয়েরি lower_bound দিয়ে।')],
  walkthrough: {
    input: 'k = 2',
    steps: [
      { state: 'day 1: P(2 kinds) = 0', text: L('One orb is one kind.', 'একটি অর্ব এক ধরন।') },
      { state: 'day 2: P = ½', text: L('The second orb differs with ½.', 'দ্বিতীয় অর্ব ½ সম্ভাবনায় ভিন্ন।') },
      { state: 'targets 1/2000, 2/2000', text: L('Both are first reached on day 2.', 'দুটিই প্রথম দিন ২-এ পৌঁছায়।') },
    ],
  },
  complexity: { time: 'O(D · k + q log D)', space: 'O(k + D)', why: L('D ≈ 7300 days for k = 1000.', 'k = ১০০০-এ D ≈ ৭৩০০ দিন।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Day-by-day DP, then binary search', 'দিন-দিন DP, তারপর বাইনারি সার্চ'),
      idea: L('Precompute P(all kinds after d days) for every d up to the point it reaches ½.', 'প্রতিটি d-এর জন্য P(d দিন পরে সব ধরন) আগে হিসাব, ½ পৌঁছানো পর্যন্ত।'),
      explain: [L('Queries share all the work, so do it once. The answer is monotone in pᵢ, which is what makes a lower_bound over the precomputed list valid.', 'কোয়েরিগুলো সব কাজ ভাগ করে, তাই একবার করুন। উত্তর pᵢ-তে একমুখী, তাই আগে হিসাব করা তালিকায় lower_bound বৈধ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int k, q;
    scanf("%d %d", &k, &q);
    // dp[j] = probability of having exactly j kinds after the current number of days.
    vector<double> dp(k + 1, 0), nd(k + 1);
    dp[0] = 1;
    vector<double> full = {0};  // full[d] = probability of all k kinds after d days
    while (full.back() < 0.5) {  // every query asks for at most 1000/2000 = 0.5
        fill(nd.begin(), nd.end(), 0);
        for (int j = 0; j <= k; j++) {
            if (dp[j] == 0) continue;
            nd[j] += dp[j] * j / k;                       // an orb of a kind we have
            if (j < k) nd[j + 1] += dp[j] * (k - j) / k;  // a new kind
        }
        swap(dp, nd);
        full.push_back(dp[k]);
    }
    while (q--) {
        int p;
        scanf("%d", &p);
        double want = (p - 1e-7) / 2000;
        int d = lower_bound(full.begin(), full.end(), want) - full.begin();
        printf("%d\n", d);
    }
    return 0;
}
`,
      time: 'O(D · k + q log D)',
      space: 'O(k + D)',
      accepted: true,
      toolkit: ['lower-bound', 'vector'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Inclusion–exclusion per day', 'প্রতিদিন অন্তর্ভুক্তি–বর্জন'),
      idea: L('P(all kinds after d days) = Σᵢ (−1)ⁱ C(k, i) (1 − i/k)ᵈ.', 'P(d দিন পরে সব ধরন) = Σᵢ (−১)ⁱ C(k, i) (১ − i/k)ᵈ।'),
      explain: [L('An exact formula, but the alternating sum cancels catastrophically in floating point for large k, so it is only reliable for small k. That makes it a good cross-check and a lesson on why the DP is preferred.', 'একটি নিখুঁত সূত্র, কিন্তু বড় k-এ পর্যায়ক্রমিক যোগফল ভাসমান বিন্দুতে ভয়াবহভাবে বাতিল হয়, তাই শুধু ছোট k-এ নির্ভরযোগ্য। এটি ভালো ক্রস-চেক আর DP কেন পছন্দনীয় তার শিক্ষা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int k, q;
    cin >> k >> q;
    if (k > 8) { cout << "\n"; return 0; }
    // Inclusion-exclusion: P(all kinds after d days) = sum (-1)^i C(k, i) (1 - i/k)^d.
    auto full = [&](int d) {
        double s = 0, c = 1;
        for (int i = 0; i <= k; i++) {
            s += (i % 2 ? -1 : 1) * c * pow(1.0 - (double)i / k, d);
            c = c * (k - i) / (i + 1);
        }
        return s;
    };
    while (q--) {
        int p;
        cin >> p;
        int d = 0;
        while (full(d) < (p - 1e-7) / 2000) d++;
        printf("%d\n", d);
    }
    return 0;
}
`,
      time: 'O(q · D · k)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['lambda'],
    },
  ],
  tests: [
    { input: '1 1\n1', output: '1', source: 'sample', note: sample(1) },
    { input: '2 2\n1\n2', output: '2\n2', source: 'sample', note: sample(2) },
    { input: '1000 1\n1000', output: '7274', source: 'own', note: L('Largest k and the highest target.', 'সবচেয়ে বড় k আর সর্বোচ্চ লক্ষ্য।') },
  ],
  pitfalls: [L('Ignoring ε: the answer must be the first day with probability ≥ (p − ε)/2000, so compare against a slightly smaller target.', 'ε উপেক্ষা: উত্তর হবে সম্ভাবনা ≥ (p − ε)/২০০০ এমন প্রথম দিন, তাই সামান্য ছোট লক্ষ্যের সঙ্গে তুলনা করুন।'), L('Re-running the DP for each query: q · D · k is about 7·10⁹.', 'প্রতি কোয়েরিতে DP আবার চালানো: q · D · k প্রায় ৭·১০⁹।')],
  related: [
    { id: '518D', name: 'Ilya and Escalator', why: L('Probability DP over time.', 'সময়ের ওপর সম্ভাবনার DP।') },
    { id: '1265E', name: 'Beautiful Mirrors', why: L('More expected-time thinking.', 'আরও প্রত্যাশিত সময়ের ভাবনা।') },
  ],
  toolkit: ['lower-bound'],
};

export const p30C: ProblemEntry = {
  id: '30C',
  contestId: 30,
  index: 'C',
  name: 'Shooting Gallery',
  rating: 1800,
  tags: ['dp', 'probabilities'],
  why: L('Linearity of expectation turns “expected hits” into a plain weighted longest path over targets sorted by time.', 'প্রত্যাশার রৈখিকতা “প্রত্যাশিত আঘাত”-কে সময় অনুযায়ী সাজানো লক্ষ্যের ওপর একটি সাধারণ ভারযুক্ত দীর্ঘতম পথে বদলে দেয়।'),
  statement: L('n targets appear on a plane; target i appears at point (xᵢ, yᵢ) at time tᵢ and disappears instantly. If the gun is aimed at it at that moment, it is hit with probability pᵢ. The aim moves at speed 1 and may start anywhere at any time. Maximise the expected number of hit targets.', 'একটি সমতলে n-টি লক্ষ্য আসে; লক্ষ্য i বিন্দু (xᵢ, yᵢ)-এ সময় tᵢ-তে আসে আর সঙ্গে সঙ্গে হারায়। সেই মুহূর্তে বন্দুক এর দিকে তাক করা থাকলে pᵢ সম্ভাবনায় লাগে। নিশানা গতি ১-এ সরে আর যেকোনো জায়গায় যেকোনো সময় শুরু করতে পারে। প্রত্যাশিত আঘাত করা লক্ষ্যের সংখ্যা সর্বোচ্চ করুন।'),
  input: L('n, then n lines xᵢ yᵢ tᵢ pᵢ.', 'n, তারপর n লাইনে xᵢ yᵢ tᵢ pᵢ।'),
  output: L('The maximum expected number of hits.', 'সর্বোচ্চ প্রত্যাশিত আঘাত।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000, |x|, |y| ≤ 1000, 0 ≤ t ≤ 10⁹', '১ ≤ n ≤ ১০০০, |x|, |y| ≤ ১০০০, ০ ≤ t ≤ ১০⁹'), realAnswer] },
  samples: [
    { input: '1\n0 0 0 0.5', output: '0.5000000000', explain: L('Aim at the only target.', 'একমাত্র লক্ষ্যে তাক।') },
    { input: '2\n0 0 0 0.6\n5 0 5 0.7', output: '1.3000000000', explain: L('Distance 5 in time 5: both are reachable.', '৫ সময়ে দূরত্ব ৫: দুটিই পৌঁছানো যায়।') },
  ],
  observation: L('The expected hits along a route is the sum of pᵢ over targets on it, whether or not earlier shots hit. So we need the route maximising Σ p. Sort by time; target j can follow target i if the distance is at most tⱼ − tᵢ. dp[j] = pⱼ + max dp[i] over such i.', 'একটি পথে প্রত্যাশিত আঘাত হলো তার লক্ষ্যগুলোর pᵢ-এর যোগফল, আগের গুলি লাগুক বা না লাগুক। তাই Σ p সর্বোচ্চ করা পথ দরকার। সময় অনুযায়ী সাজান; দূরত্ব সর্বোচ্চ tⱼ − tᵢ হলে লক্ষ্য j লক্ষ্য i-এর পরে আসতে পারে। dp[j] = pⱼ + এমন i-এর ওপর সর্বোচ্চ dp[i]।'),
  approach: [L('Sort targets by t.', 't অনুযায়ী লক্ষ্য সাজান।'), L('O(n²) DP comparing squared distance with squared time gap in integers.', 'পূর্ণসংখ্যায় বর্গ দূরত্বকে সময়-ব্যবধানের বর্গের সঙ্গে তুলনা করে O(n²) DP।')],
  walkthrough: {
    input: 'second sample',
    steps: [
      { state: 'dp[1] = 0.6', text: L('Start at the first target.', 'প্রথম লক্ষ্যে শুরু।') },
      { state: 'dist² = 25 ≤ 5² = 25', text: L('Reachable exactly in time.', 'ঠিক সময়ে পৌঁছানো যায়।') },
      { state: 'dp[2] = 0.7 + 0.6 = 1.3', text: L('Answer.', 'উত্তর।') },
    ],
  },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('One million pairs.', 'দশ লক্ষ জোড়া।') },
  solutions: [
    {
      id: 'dp',
      kind: 'optimal',
      title: L('Longest weighted chain by time', 'সময় অনুযায়ী দীর্ঘতম ভারযুক্ত শৃঙ্খল'),
      idea: L('Linearity turns the probabilistic goal into a deterministic DP.', 'রৈখিকতা সম্ভাবনামূলক লক্ষ্যকে একটি নির্ধারিত DP-তে বদলে দেয়।'),
      explain: [L('Comparing dx² + dy² ≤ dt² in long long avoids sqrt and precision issues; dt can be 10⁹, so dt² needs 64 bits.', 'long long-এ dx² + dy² ≤ dt² তুলনা sqrt আর নির্ভুলতার সমস্যা এড়ায়; dt ১০⁹ হতে পারে, তাই dt²-তে ৬৪ বিট লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct Target { long long x, y, t; double p; };

int main() {
    int n;
    scanf("%d", &n);
    vector<Target> a(n);
    for (auto& g : a) scanf("%lld %lld %lld %lf", &g.x, &g.y, &g.t, &g.p);
    sort(a.begin(), a.end(), [](auto& u, auto& v) { return u.t < v.t; });
    // dp[i] = best expected hits on a route that ends by aiming at target i.
    vector<double> dp(n);
    double ans = 0;
    for (int i = 0; i < n; i++) {
        dp[i] = a[i].p;
        for (int j = 0; j < i; j++) {
            long long dx = a[i].x - a[j].x, dy = a[i].y - a[j].y, dt = a[i].t - a[j].t;
            if (dx * dx + dy * dy <= dt * dt) dp[i] = max(dp[i], dp[j] + a[i].p);  // reachable in time
        }
        ans = max(ans, dp[i]);
    }
    printf("%.10f\n", ans);
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lambda', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Every subset of targets', 'লক্ষ্যের প্রতিটি উপসেট'),
      idea: L('Sort each subset by time and check it is a feasible route.', 'প্রতিটি উপসেট সময় অনুযায়ী সাজিয়ে সম্ভব পথ কি না যাচাই।'),
      explain: [L('Exponential, but it makes no assumption about how chains are built.', 'এক্সপোনেনশিয়াল, কিন্তু শৃঙ্খল কীভাবে বানানো হয় সে বিষয়ে কোনো অনুমান করে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n), y(n), t(n);
    vector<double> p(n);
    for (int i = 0; i < n; i++) cin >> x[i] >> y[i] >> t[i] >> p[i];
    if (n > 15) { cout << "\n"; return 0; }
    double best = 0;
    // Any set of targets visited in time order; by linearity the expectation is the sum of p.
    for (int mask = 1; mask < (1 << n); mask++) {
        vector<int> idx;
        for (int i = 0; i < n; i++) if (mask >> i & 1) idx.push_back(i);
        sort(idx.begin(), idx.end(), [&](int a, int b) { return t[a] < t[b]; });
        bool ok = true;
        double sum = p[idx[0]];
        for (int k = 1; k < (int)idx.size(); k++) {
            int a = idx[k - 1], b = idx[k];
            long long dx = x[b] - x[a], dy = y[b] - y[a], dt = t[b] - t[a];
            if (dx * dx + dy * dy > dt * dt) ok = false;
            sum += p[b];
        }
        if (ok) best = max(best, sum);
    }
    printf("%.10f\n", best);
    return 0;
}
`,
      time: 'O(2ⁿ · n log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['sort'],
    },
  ],
  tests: [
    { input: '1\n0 0 0 0.5', output: '0.5000000000', source: 'sample', note: sample(1) },
    { input: '2\n0 0 0 0.6\n5 0 5 0.7', output: '1.3000000000', source: 'sample', note: sample(2) },
    { input: '2\n0 0 0 0.6\n1 0 0 0.7', output: '0.7', source: 'own', note: L('Same time, different places: pick the better one.', 'একই সময়, ভিন্ন জায়গা: ভালোটি বাছুন।') },
  ],
  pitfalls: [L('Thinking a miss changes the future: it does not, so expectations simply add.', 'মিস ভবিষ্যৎ বদলায় ভাবা: বদলায় না, তাই প্রত্যাশা সহজে যোগ হয়।'), L('Computing dt² in int.', 'int-এ dt² হিসাব।')],
  related: [
    { id: '280C', name: 'Game on Tree', why: L('Linearity of expectation.', 'প্রত্যাশার রৈখিকতা।') },
    { id: '1324F', name: 'Maximum White Subtree', why: L('More DP practice.', 'আরও DP অনুশীলন।') },
  ],
  toolkit: ['sort'],
};

export const p935D: ProblemEntry = {
  id: '935D',
  contestId: 935,
  index: 'D',
  name: 'Fafa and Ancient Alphabet',
  rating: 1900,
  tags: ['math', 'probabilities'],
  why: L('Lexicographic comparison as a left-to-right walk that keeps P(equal so far), with fractions written modulo a prime.', 'অভিধান-ক্রমের তুলনা বাম থেকে ডানে হাঁটা হিসেবে, P(এ পর্যন্ত সমান) রেখে, ভগ্নাংশ মৌলিক মডুলোতে লিখে।'),
  statement: L('Two words of length n over an alphabet 1 … m have some erased letters (written 0). Each erased letter is replaced by a uniformly random letter, independently. Find the probability that the first word is lexicographically greater than the second, as P · Q⁻¹ modulo 10⁹ + 7.', '১ … m বর্ণমালার দৈর্ঘ্য n-এর দুটি শব্দে কিছু অক্ষর মুছে গেছে (০ লেখা)। প্রতিটি মুছে যাওয়া অক্ষর স্বাধীনভাবে একটি সমভাবে এলোমেলো অক্ষর দিয়ে প্রতিস্থাপিত হয়। প্রথম শব্দ দ্বিতীয়টির চেয়ে অভিধান-ক্রমে বড় হওয়ার সম্ভাবনা P · Q⁻¹ হিসেবে ১০⁹ + ৭ মডুলো বের করুন।'),
  input: L('n m, then the two words as n numbers each.', 'n m, তারপর দুটি শব্দ, প্রতিটি n সংখ্যা হিসেবে।'),
  output: L('The probability modulo 10⁹ + 7.', 'সম্ভাবনা ১০⁹ + ৭ মডুলো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n, m ≤ 10⁵', '১ ≤ n, m ≤ ১০⁵')] },
  samples: [
    { input: '1 2\n0\n1', output: '500000004', explain: L('The erased letter is 2 with probability ½.', 'মুছে যাওয়া অক্ষর ½ সম্ভাবনায় ২।') },
    { input: '1 2\n1\n0', output: '0', explain: L('1 can never be greater.', '১ কখনো বড় হতে পারে না।') },
    { input: '7 26\n0 15 12 9 13 0 14\n11 1 0 13 15 12 0', output: '230769233', explain: L('Decided at position 1 or, if equal, at position 2 (15 > 1).', 'অবস্থান ১-এ, অথবা সমান হলে অবস্থান ২-এ (১৫ > ১) নির্ধারিত।') },
  ],
  observation: L('Walk left to right with eq = P(the prefixes so far are equal). At each position compute P(greater here) and P(equal here) from the four cases (known/erased on each side); add eq · P(greater) to the answer and multiply eq by P(equal). If both erased: P(equal) = 1/m and P(greater) = (1 − 1/m)/2 by symmetry.', 'বাম থেকে ডানে eq = P(এ পর্যন্ত প্রিফিক্স সমান) রেখে হাঁটুন। প্রতিটি অবস্থানে চারটি ক্ষেত্র (প্রতি পাশে জানা/মোছা) থেকে P(এখানে বড়) আর P(এখানে সমান) হিসাব করুন; উত্তরে eq · P(বড়) যোগ করুন আর eq-কে P(সমান) দিয়ে গুণ করুন। দুটিই মোছা হলে: P(সমান) = ১/m আর প্রতিসাম্যে P(বড়) = (১ − ১/m)/২।'),
  approach: [L('Precompute m⁻¹ and 2⁻¹ modulo the prime.', 'মৌলিকের মডুলোতে m⁻¹ আর ২⁻¹ আগে হিসাব।'), L('One pass, stopping early when eq becomes 0.', 'একটি পাস, eq ০ হলে আগেই থামুন।')],
  walkthrough: {
    input: '0 vs 1, m = 2',
    steps: [
      { state: 'erased vs 1', text: L('Greater when the letter is 2: (m − 1)/m = ½.', 'অক্ষর ২ হলে বড়: (m − ১)/m = ½।') },
      { state: '½ ≡ 500000004', text: L('Since 2 · 500000004 ≡ 1 (mod 10⁹ + 7).', 'কারণ ২ · ৫০০০০০০০৪ ≡ ১ (mod ১০⁹ + ৭)।') },
    ],
  },
  complexity: { time: 'O(n + log MOD)', space: 'O(n)', why: L('One pass plus two modular inverses.', 'একটি পাস আর দুটি মডুলার ইনভার্স।') },
  solutions: [
    {
      id: 'scan',
      kind: 'optimal',
      title: L('Left-to-right with P(equal so far)', 'P(এ পর্যন্ত সমান) সহ বাম থেকে ডানে'),
      idea: L('The first differing position decides; positions are independent.', 'প্রথম ভিন্ন অবস্থানই নির্ধারণ করে; অবস্থানগুলো স্বাধীন।'),
      explain: [L('Every probability here is a fraction with denominator mᵏ, so modular arithmetic represents it exactly: division by m becomes multiplication by m⁻¹. If both letters are known and different, eq becomes 0 and the loop can stop.', 'এখানে প্রতিটি সম্ভাবনা mᵏ হরের একটি ভগ্নাংশ, তাই মডুলার গণিত এটিকে নিখুঁতভাবে উপস্থাপন করে: m দিয়ে ভাগ মানে m⁻¹ দিয়ে গুণ। দুটি অক্ষর জানা আর ভিন্ন হলে eq ০ হয় আর লুপ থামতে পারে।')],
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
    int n;
    long long m;
    scanf("%d %lld", &n, &m);
    vector<long long> a(n), b(n);
    for (auto& x : a) scanf("%lld", &x);
    for (auto& x : b) scanf("%lld", &x);
    long long invM = power(m, MOD - 2), inv2 = power(2, MOD - 2);
    long long eq = 1, ans = 0;  // eq = P(the prefixes so far are equal)
    for (int i = 0; i < n && eq; i++) {
        long long greater, same;
        if (a[i] && b[i]) {
            greater = a[i] > b[i];
            same = a[i] == b[i];
        } else if (!a[i] && b[i]) {
            greater = (m - b[i]) % MOD * invM % MOD;  // a can be b+1 .. m
            same = invM;
        } else if (a[i] && !b[i]) {
            greater = (a[i] - 1) % MOD * invM % MOD;  // b can be 1 .. a-1
            same = invM;
        } else {
            greater = (m - 1) % MOD * invM % MOD * inv2 % MOD;  // (1 - 1/m) / 2
            same = invM;
        }
        ans = (ans + eq * greater) % MOD;
        eq = eq * same % MOD;
    }
    printf("%lld\n", ans);
    return 0;
}
`,
      time: 'O(n + log MOD)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-pow', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Fill every erased letter', 'প্রতিটি মোছা অক্ষর ভরাট'),
      idea: L('Count fillings where the first word wins, divide by mᶻ.', 'যেসব ভরাটে প্রথম শব্দ জেতে তা গুনে mᶻ দিয়ে ভাগ।'),
      explain: [L('vector comparison in C++ is lexicographic, so a > b checks the condition directly.', 'C++-এ vector তুলনা অভিধান-ক্রমিক, তাই a > b সরাসরি শর্ত যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(n);
    for (auto& x : a) cin >> x;
    for (auto& x : b) cin >> x;
    vector<int*> holes;
    for (auto& x : a) if (!x) holes.push_back(&x);
    for (auto& x : b) if (!x) holes.push_back(&x);
    long long total = 1;
    for (size_t i = 0; i < holes.size(); i++) total *= m;
    if (total > 2000000) { cout << "\n"; return 0; }
    long long good = 0;
    for (long long code = 0; code < total; code++) {
        long long x = code;
        for (auto h : holes) { *h = x % m + 1; x /= m; }
        if (a > b) good++;  // vector comparison is lexicographic
    }
    // probability = good / total, written modulo the prime
    cout << good % MOD * power(total % MOD, MOD - 2) % MOD << "\n";
    return 0;
}
`,
      time: 'O(mᶻ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['vector', 'mod-pow'],
    },
  ],
  tests: [
    { input: '1 2\n0\n1', output: '500000004', source: 'sample', note: sample(1) },
    { input: '1 2\n1\n0', output: '0', source: 'sample', note: sample(2) },
    { input: '7 26\n0 15 12 9 13 0 14\n11 1 0 13 15 12 0', output: '230769233', source: 'sample', note: sample(3) },
    { input: '2 3\n0 0\n0 0', output: '444444448', source: 'own', note: L('Fully erased, equal length: (1 − P(equal))/2 = (1 − 1/9)/2 = 4/9.', 'পুরো মোছা: (১ − P(সমান))/২ = (১ − ১/৯)/২ = ৪/৯।') },
  ],
  pitfalls: [L('Continuing after a known strict difference; harmless only if eq is set to 0.', 'জানা কঠোর পার্থক্যের পরে চালিয়ে যাওয়া; eq ০ করা হলেই কেবল নিরাপদ।'), L('Forgetting that equal words are not “greater”.', 'সমান শব্দ “বড়” নয় তা ভুলে যাওয়া।')],
  related: [
    { id: '1265E', name: 'Beautiful Mirrors', why: L('Probabilities modulo a prime.', 'মৌলিক মডুলোতে সম্ভাবনা।') },
    { id: '476B', name: 'Dreamoon and WiFi', why: L('Counting outcomes of random choices.', 'এলোমেলো পছন্দের ফলাফল গণনা।') },
  ],
  toolkit: ['mod-pow'],
};
