import type { ProblemEntry } from './types.ts';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const made = L(
  'This conversation is one we made up to show the protocol; the Codeforces statement has its own sample.',
  'এই কথোপকথনটি প্রোটোকল বোঝাতে আমাদের বানানো; কোডফোর্সেসের স্টেটমেন্টের নিজস্ব স্যাম্পল আছে।',
);

// ───────────────────────────────────────────── 1534D
export const p1534D: ProblemEntry = {
  id: '1534D',
  contestId: 1534,
  index: 'D',
  name: 'Lost Tree',
  rating: 1800,
  interactive: true,
  tags: ['constructive', 'interactive', 'trees'],
  why: L(
    'A tree is bipartite, and every edge joins the two colour classes. Distances from one vertex colour the whole tree, and then asking from every vertex of the smaller class exposes every edge, in at most ⌈n/2⌉ questions.',
    'গাছ দ্বিখণ্ডিত, আর প্রতিটি edge দুই রঙের শ্রেণিকে জোড়ে। এক শীর্ষ থেকে দূরত্ব পুরো গাছকে রঙ করে দেয়, তারপর ছোট শ্রেণির প্রতিটি শীর্ষ থেকে জিজ্ঞেস করলেই সব edge বেরিয়ে আসে, সর্বোচ্চ ⌈n/২⌉ প্রশ্নে।',
  ),
  statement: L(
    'The judge hides a tree on n vertices. A question "? r" is answered with n numbers: the distance from r to every vertex. You may ask at most ⌈n/2⌉ questions. Then print "!" and the n − 1 edges, one per line.',
    'জাজ n শীর্ষের একটি গাছ লুকিয়েছে। প্রশ্ন "? r"-এর উত্তরে n টি সংখ্যা আসে: r থেকে প্রতিটি শীর্ষের দূরত্ব। সর্বোচ্চ ⌈n/২⌉ টি প্রশ্ন করতে পারো। তারপর "!" আর n − ১ টি edge, প্রতি লাইনে একটি, প্রিন্ট করো।',
  ),
  input: L('First line: n. After each question, n integers: the distances.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর n টি পূর্ণসংখ্যা: দূরত্বগুলো।'),
  output: L('Questions "? r", then "!" and n − 1 lines "u v". Flush after every line.', 'প্রশ্ন "? r", শেষে "!" আর n − ১ টি লাইন "u v"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 2000, at most ⌈n/2⌉ questions', '২ ≤ n ≤ ২০০০, সর্বোচ্চ ⌈n/২⌉ প্রশ্ন')] },
  samples: [
    {
      input: '5\n1 2\n2 3\n2 4\n4 5',
      output: 'OK',
      transcript: '< 5\n> ? 1\n< 0 1 2 2 3\n> ? 2\n< 1 0 1 1 2\n> ? 5\n< 3 2 3 1 0\n> !\n> 2 1\n> 2 3\n> 2 4\n> 5 4',
      explain: L('Distances from 1 are 0 1 2 2 3, so the even-distance class is {1, 3, 4} and the odd one is {2, 5}. The odd class is smaller. Asking from 2 and from 5 shows every neighbour: 2 has neighbours 1, 3, 4 and 5 has neighbour 4. Three questions, and ⌈5/2⌉ = 3. ' + made.en, '১ থেকে দূরত্ব ০ ১ ২ ২ ৩, তাই জোড় দূরত্বের শ্রেণি {১, ৩, ৪} আর বিজোড়টি {২, ৫}। বিজোড় শ্রেণি ছোট। ২ আর ৫ থেকে জিজ্ঞেস করলেই সব প্রতিবেশী পাওয়া যায়: ২-এর প্রতিবেশী ১, ৩, ৪ আর ৫-এর প্রতিবেশী ৪। তিন প্রশ্ন, আর ⌈৫/২⌉ = ৩। ' + made.bn),
    },
  ],
  observation: L(
    'An answer of 1 in the reply for r means "neighbour of r", so one question reveals all edges at r. Every edge has exactly one end in each parity class of the distances from vertex 1, so the vertices of ONE class together touch every edge. The smaller class has at most ⌊n/2⌋ vertices.',
    'r-এর উত্তরে ১ মানে "r-এর প্রতিবেশী", তাই একটি প্রশ্নে r-এর সব edge জানা যায়। ১ নম্বর শীর্ষ থেকে দূরত্বের জোড়-বিজোড় অনুযায়ী প্রতিটি edge-এর ঠিক এক প্রান্ত প্রতি শ্রেণিতে, তাই যেকোনো একটি শ্রেণির শীর্ষগুলো মিলে প্রতিটি edge ছোঁয়। ছোট শ্রেণিতে সর্বোচ্চ ⌊n/২⌋ টি শীর্ষ।',
  ),
  approach: [
    L('Ask from vertex 1. Split the vertices by the parity of their distance.', '১ থেকে জিজ্ঞেস করো। দূরত্বের জোড়-বিজোড় অনুযায়ী শীর্ষ ভাগ করো।'),
    L('If the even class (it contains vertex 1) is not larger than the odd class, use it: vertex 1 is already asked, so the cost is its size, at most n/2.', 'জোড় শ্রেণি (এতে ১ আছে) বিজোড়ের চেয়ে বড় না হলে সেটি নাও: ১ আগেই জিজ্ঞেস করা, তাই খরচ শ্রেণির আকার, সর্বোচ্চ n/২।'),
    L('Otherwise use the odd class, which then has at most (n − 1)/2 vertices, so with the first question the total is at most ⌈n/2⌉.', 'নয়তো বিজোড় শ্রেণি নাও, যাতে সর্বোচ্চ (n − ১)/২ শীর্ষ, তাই প্রথম প্রশ্নসহ মোট সর্বোচ্চ ⌈n/২⌉।'),
    L('For every asked vertex r, each w with distance 1 gives the edge (r, w).', 'প্রতিটি জিজ্ঞেস করা r-এর জন্য দূরত্ব ১ এমন প্রতিটি w থেকে edge (r, w) পাও।'),
  ],
  walkthrough: {
    input: '5\n1 2\n2 3\n2 4\n4 5',
    steps: [
      { state: 'ask 1: 0 1 2 2 3', text: L('Even class {1, 3, 4}, odd class {2, 5}. The odd class is smaller.', 'জোড় শ্রেণি {১, ৩, ৪}, বিজোড় {২, ৫}। বিজোড়টি ছোট।') },
      { state: 'ask 2: 1 0 1 1 2', text: L('Distance 1 to vertices 1, 3, 4: edges (2,1), (2,3), (2,4).', '১, ৩, ৪-এ দূরত্ব ১: edge (২,১), (২,৩), (২,৪)।') },
      { state: 'ask 5: 3 2 3 1 0', text: L('Distance 1 to vertex 4: edge (5,4). That is all n − 1 = 4 edges.', '৪-এ দূরত্ব ১: edge (৫,৪)। এই হলো n − ১ = ৪ টি edge।') },
    ],
  },
  complexity: { time: 'O(n²)', space: 'O(n)', why: L('At most n/2 questions, each a row of n numbers to scan.', 'সর্বোচ্চ n/২ প্রশ্ন, প্রতিটিতে n সংখ্যার সারি স্ক্যান।') },
  solutions: [
    {
      id: 'parity',
      kind: 'optimal',
      title: L('Colour by distance parity, ask the smaller class', 'দূরত্বের জোড়-বিজোড়ে রঙ করে ছোট শ্রেণিকে জিজ্ঞেস'),
      idea: L('Every edge crosses the two classes, so the smaller class alone sees them all.', 'প্রতিটি edge দুই শ্রেণি পেরোয়, তাই শুধু ছোট শ্রেণিই সব দেখতে পায়।'),
      explain: [
        L('The first answer is reused when the even class is chosen, so vertex 1 costs nothing extra there. When the odd class is chosen it is strictly smaller than the even class, which keeps the total within ⌈n/2⌉.', 'জোড় শ্রেণি বাছলে প্রথম উত্তরটিই কাজে লাগে, তাই ১ নম্বরের জন্য বাড়তি খরচ নেই। বিজোড় শ্রেণি বাছলে সেটি জোড়ের চেয়ে কঠোরভাবে ছোট, ফলে মোট ⌈n/২⌉-এর ভেতরে থাকে।'),
        L('No edge is reported twice: its other end is in the class we did not ask from.', 'কোনো edge দুবার আসে না: তার অন্য প্রান্ত আছে যে শ্রেণিকে জিজ্ঞেস করিনি সেখানে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;

vector<int> ask(int r) {
    cout << "? " << r << endl;
    vector<int> d(n + 1);
    for (int i = 1; i <= n; i++) cin >> d[i];
    return d;
}

int main() {
    cin >> n;
    vector<int> d1 = ask(1);
    vector<int> even, odd;
    for (int v = 1; v <= n; v++) (d1[v] % 2 == 0 ? even : odd).push_back(v);
    vector<int>& use = even.size() <= odd.size() ? even : odd;
    vector<pair<int, int>> edges;
    for (int r : use) {
        vector<int> d = (r == 1) ? d1 : ask(r);
        for (int v = 1; v <= n; v++)
            if (d[v] == 1) edges.push_back({r, v});
    }
    cout << "!" << "\n";
    for (auto& e : edges) cout << e.first << " " << e.second << "\n";
    cout << flush;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'vector', 'pair'],
    },
    {
      id: 'all',
      kind: 'brute',
      title: L('Ask from every vertex', 'প্রতিটি শীর্ষ থেকে জিজ্ঞেস'),
      idea: L('n questions and every edge seen twice: correct but twice over the budget.', 'n টি প্রশ্ন, প্রতিটি edge দুবার দেখা: সঠিক, কিন্তু বাজেটের দ্বিগুণ।'),
      explain: [L('Print each edge once by keeping only u < v. It shows the idea (distance 1 means an edge) and is a correct reference, but it fails the question limit for n above 2.', 'u < v রেখে প্রতিটি edge একবার প্রিন্ট করো। এতে ধারণাটি (দূরত্ব ১ মানে edge) দেখা যায় আর এটি সঠিক রেফারেন্স, কিন্তু n > ২ হলে প্রশ্নসীমা পেরোয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> edges;
    for (int r = 1; r <= n; r++) {
        cout << "? " << r << endl;
        for (int v = 1; v <= n; v++) {
            int d;
            cin >> d;
            if (d == 1 && r < v) edges.push_back({r, v});
        }
    }
    cout << "!" << "\n";
    for (auto& e : edges) cout << e.first << " " << e.second << "\n";
    cout << flush;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics', 'vector', 'pair'],
    },
  ],
  tests: [
    { input: '2\n1 2', output: 'OK', source: 'own', note: L('Smallest tree: vertex 1 is already enough.', 'সবচেয়ে ছোট গাছ: ১ নম্বরই যথেষ্ট।') },
    { input: '4\n1 2\n1 3\n1 4', output: 'OK', source: 'own', note: L('A star: the even class is just the centre.', 'স্টার: জোড় শ্রেণিতে শুধু কেন্দ্র।') },
    { input: '6\n1 2\n2 3\n3 4\n4 5\n5 6', output: 'OK', source: 'own', note: L('A path of even length: the classes tie, the even one is used.', 'জোড় দৈর্ঘ্যের পথ: শ্রেণি দুটি সমান, জোড়টি ব্যবহার হয়।') },
    { input: '7\n4 1\n4 2\n4 3\n4 5\n5 6\n5 7', output: 'OK', source: 'own', note: L('Vertex 1 is a leaf, so the odd class is the small side.', '১ একটি পাতা, তাই বিজোড় শ্রেণিটি ছোট দিক।') },
  ],
  pitfalls: [
    L('Asking vertex 1 twice: reuse the first answer.', '১ নম্বর দুবার জিজ্ঞেস করা: প্রথম উত্তরটিই ব্যবহার করো।'),
    L('Choosing the odd class on a tie: for even n the total becomes n/2 + 1 and breaks the limit.', 'সমান হলে বিজোড় শ্রেণি নেওয়া: জোড় n-এ মোট n/২ + ১ হয়ে সীমা ভাঙে।'),
    L('Printing edges as (r, v) for every v with distance 1 from BOTH classes: each edge would appear twice.', 'দুই শ্রেণি থেকেই জিজ্ঞেস করে edge প্রিন্ট করা: প্রতিটি edge দুবার আসবে।'),
    L('Forgetting that the "!" line comes first, then the edges.', '"!" লাইন আগে, তারপর edge-গুলো, এটি ভুলে যাওয়া।'),
  ],
  related: [
    { id: '1407C', name: 'Chocolate Bunny', why: L('Another interactive reconstruction with a tight budget.', 'আরেকটি কঠোর বাজেটের ইন্টারঅ্যাকটিভ পুনর্গঠন।') },
    { id: '1797C', name: 'Li Hua and Chess', why: L('Distances as answers again.', 'এবারও উত্তর হিসেবে দূরত্ব।') },
  ],
  toolkit: ['io-basics', 'vector', 'pair'],
};

// ───────────────────────────────────────────── 862D
export const p862D: ProblemEntry = {
  id: '862D',
  contestId: 862,
  index: 'D',
  name: 'Mahmoud and Ehab and the binary string',
  rating: 2000,
  interactive: true,
  tags: ['binary-search', 'divide-and-conquer', 'interactive'],
  why: L(
    'A Hamming distance to a prefix query hides how many ones the prefix has. Once you can count ones in any prefix with one question, finding the first position that differs from position 1 is a plain binary search.',
    'কোনো প্রিফিক্স-প্রশ্নের হ্যামিং দূরত্ব ওই প্রিফিক্সে কয়টি ১ আছে তা লুকিয়ে রাখে। এক প্রশ্নে যেকোনো প্রিফিক্সের ১ গুনতে পারলে, ১ নম্বর অবস্থান থেকে আলাদা প্রথম অবস্থান খোঁজা সাধারণ বাইনারি সার্চ।',
  ),
  statement: L(
    'The judge hides a binary string s of length n that contains at least one 0 and at least one 1. A question "? t" with any binary string t of length n is answered with the Hamming distance between t and s (the number of positions where they differ). With at most 15 questions, print "! p q" where s_p = 0 and s_q = 1.',
    'জাজ n দৈর্ঘ্যের একটি বাইনারি স্ট্রিং s লুকিয়েছে, যাতে অন্তত একটি ০ আর অন্তত একটি ১ আছে। n দৈর্ঘ্যের যেকোনো বাইনারি স্ট্রিং t-এর জন্য প্রশ্ন "? t"-র উত্তর t আর s-এর হ্যামিং দূরত্ব (যত অবস্থানে তারা আলাদা)। সর্বোচ্চ ১৫ প্রশ্নে "! p q" প্রিন্ট করো যেখানে s_p = ০ আর s_q = ১।',
  ),
  input: L('First line: n. After each question, one integer: the distance.', 'প্রথম লাইনে n। প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: দূরত্ব।'),
  output: L('Questions "? t", then "! p q". Flush after every line.', 'প্রশ্ন "? t", শেষে "! p q"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('2 ≤ n ≤ 1000, at most 15 questions', '২ ≤ n ≤ ১০০০, সর্বোচ্চ ১৫ প্রশ্ন')] },
  samples: [
    {
      input: '101',
      output: 'OK',
      transcript: '< 3\n> ? 000\n< 2\n> ? 100\n< 1\n> ? 110\n< 2\n> ! 2 1',
      explain: L('"000" is at distance 2, so s has two ones. "100" is at distance 1, so position 1 is a 1 (the prefix of length 1 holds one 1). "110": the prefix of length 2 holds (2 + 2 − 2)/2 = 1 one, not 2, so position 2 already differs from position 1 and holds a 0. Answer: position 2 is a 0, position 1 is a 1. ' + made.en, '"০০০" দূরত্ব ২-এ, তাই s-এ দুটি ১। "১০০" দূরত্ব ১-এ, তাই ১ নম্বর অবস্থানে ১ (দৈর্ঘ্য ১ প্রিফিক্সে একটি ১)। "১১০": দৈর্ঘ্য ২ প্রিফিক্সে (২ + ২ − ২)/২ = ১ টি ১, ২ নয়, তাই ২ নম্বর অবস্থান ইতোমধ্যে ১ নম্বরের থেকে আলাদা, সেখানে ০। উত্তর: ২ নম্বরে ০, ১ নম্বরে ১। ' + made.bn),
    },
  ],
  observation: L(
    'Let k be the number of ones in s and let t_m be m ones followed by n − m zeros. Then dist(t_m, s) = (m − ones in the first m) + (k − ones in the first m), so the number of ones in the first m positions is (m + k − dist)/2. With one question you know that count for any m.',
    'ধরো s-এ ১-এর সংখ্যা k, আর t_m হলো m টি ১ এরপর n − m টি ০। তাহলে dist(t_m, s) = (m − প্রথম m-এ ১-এর সংখ্যা) + (k − প্রথম m-এ ১-এর সংখ্যা), তাই প্রথম m অবস্থানে ১-এর সংখ্যা (m + k − dist)/২। এক প্রশ্নে যেকোনো m-এর জন্য এই সংখ্যা জানা যায়।',
  ),
  approach: [
    L('Ask the all-zero string: the answer is k, the number of ones.', 'সব-শূন্য স্ট্রিং জিজ্ঞেস করো: উত্তর k, অর্থাৎ ১-এর সংখ্যা।'),
    L('Define ones(m) = (m + k − dist(t_m))/2. Then s_1 = ones(1).', 'ones(m) = (m + k − dist(t_m))/২ ধরো। তাহলে s_১ = ones(১)।'),
    L('The prefix of length m is "uniform" (all equal to s_1) exactly when ones(m) = m (if s_1 = 1) or ones(m) = 0 (if s_1 = 0). Uniform is monotone in m.', 'দৈর্ঘ্য m প্রিফিক্স "সমরূপ" (সব s_১-এর সমান) ঠিক তখন যখন ones(m) = m (s_১ = ১ হলে) বা ones(m) = ০ (s_১ = ০ হলে)। সমরূপতা m-এর সাথে একঘাতী।'),
    L('Binary search the smallest m whose prefix is not uniform: s_m differs from s_1. At most 10 questions for n ≤ 1000.', 'যে ক্ষুদ্রতম m-এর প্রিফিক্স সমরূপ নয় তা বাইনারি সার্চে খোঁজো: s_m আর s_১ আলাদা। n ≤ ১০০০ হলে সর্বোচ্চ ১০ প্রশ্ন।'),
    L('Total at most 1 + 1 + 10 = 12 questions. Print the pair (position with 0, position with 1).', 'মোট সর্বোচ্চ ১ + ১ + ১০ = ১২ প্রশ্ন। জোড়া (০-এর অবস্থান, ১-এর অবস্থান) প্রিন্ট করো।'),
  ],
  walkthrough: {
    input: '101',
    steps: [
      { state: '? 000 → 2', text: L('k = 2 ones.', 'k = ২ টি ১।') },
      { state: '? 100 → 1', text: L('ones(1) = (1 + 2 − 1)/2 = 1, so s_1 = 1.', 'ones(১) = (১ + ২ − ১)/২ = ১, তাই s_১ = ১।') },
      { state: '? 110 → 2', text: L('ones(2) = (2 + 2 − 2)/2 = 1 ≠ 2, so the prefix of length 2 is not all ones: the first differing position is 2.', 'ones(২) = (২ + ২ − ২)/২ = ১ ≠ ২, তাই দৈর্ঘ্য ২ প্রিফিক্স সব ১ নয়: প্রথম আলাদা অবস্থান ২।') },
    ],
  },
  complexity: { time: 'O(log n) questions', space: 'O(n)', why: L('One binary search over the length of the prefix.', 'প্রিফিক্সের দৈর্ঘ্যের ওপর একটি বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'prefix',
      kind: 'optimal',
      title: L('Count ones in a prefix, then binary search the first change', 'প্রিফিক্সে ১ গুনে প্রথম পরিবর্তন বাইনারি সার্চে'),
      idea: L('A prefix query t_m turns a Hamming distance into the number of ones in s[1..m].', 'প্রিফিক্স-প্রশ্ন t_m হ্যামিং দূরত্বকে s[১..m]-এর ১-এর সংখ্যায় বদলে দেয়।'),
      explain: [
        L('We never need the whole string. Both a 0 and a 1 exist, so some position differs from position 1, and the first one is found by halving.', 'পুরো স্ট্রিং লাগে না। ০ আর ১ দুটিই আছে, তাই ১ নম্বর থেকে আলাদা কোনো অবস্থান আছে, আর প্রথমটি অর্ধেক করে করে পাওয়া যায়।'),
        L('The invariant: prefix lo is uniform, prefix hi is not (prefix n is not, because both digits occur).', 'ইনভেরিয়ান্ট: প্রিফিক্স lo সমরূপ, প্রিফিক্স hi নয় (প্রিফিক্স n সমরূপ নয় কারণ দুই অঙ্কই আছে)।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, k;

int dist(int m) {  // distance to m ones followed by zeros
    string t = string(m, '1') + string(n - m, '0');
    cout << "? " << t << endl;
    int d;
    cin >> d;
    return d;
}

int ones(int m) { return (m + k - dist(m)) / 2; }

int main() {
    cin >> n;
    k = dist(0);
    int s1 = ones(1);
    int lo = 1, hi = n;
    while (hi - lo > 1) {
        int mid = (lo + hi) / 2;
        int o = ones(mid);
        bool uniform = s1 ? (o == mid) : (o == 0);
        if (uniform) lo = mid; else hi = mid;
    }
    if (s1) cout << "! " << hi << " 1" << endl;
    else cout << "! 1 " << hi << endl;
}
`,
      time: 'O(log n) questions',
      space: 'O(n)',
      accepted: true,
      toolkit: ['io-basics', 'binary-search'],
    },
    {
      id: 'each',
      kind: 'brute',
      title: L('Flip one position at a time', 'একবারে একটি অবস্থান উল্টে'),
      idea: L('n + 1 questions: learn every bit, then pick a 0 and a 1.', 'n + ১ প্রশ্ন: প্রতিটি বিট জেনে একটি ০ আর একটি ১ বেছে নাও।'),
      explain: [L('Query the all-zero string for k, then each string with a single 1 at position i: the distance is k − 1 if s_i = 1 and k + 1 otherwise. Correct, but it needs about n questions instead of 15.', 'k-র জন্য সব-শূন্য স্ট্রিং, তারপর শুধু i নম্বরে ১ আছে এমন প্রতিটি স্ট্রিং জিজ্ঞেস করো: s_i = ১ হলে দূরত্ব k − ১, নয়তো k + ১। সঠিক, কিন্তু ১৫-র বদলে প্রায় n প্রশ্ন লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    auto ask = [&](const string& t) {
        cout << "? " << t << endl;
        int d;
        cin >> d;
        return d;
    };
    int k = ask(string(n, '0'));
    int zero = -1, one = -1;
    for (int i = 0; i < n && (zero < 0 || one < 0); i++) {
        string t(n, '0');
        t[i] = '1';
        int d = ask(t);
        if (d == k - 1) { if (one < 0) one = i + 1; }
        else { if (zero < 0) zero = i + 1; }
    }
    cout << "! " << zero << " " << one << endl;
}
`,
      time: 'O(n) questions',
      space: 'O(n)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '01', output: 'OK', source: 'own', note: L('Smallest string, first bit is 0.', 'সবচেয়ে ছোট স্ট্রিং, প্রথম বিট ০।') },
    { input: '10', output: 'OK', source: 'own', note: L('Smallest string, first bit is 1.', 'সবচেয়ে ছোট স্ট্রিং, প্রথম বিট ১।') },
    { input: '0000001', output: 'OK', source: 'own', note: L('The only 1 is last: the search goes all the way right.', 'একমাত্র ১ শেষে: সার্চ একেবারে ডানে যায়।') },
    { input: '1110111', output: 'OK', source: 'own', note: L('A single 0 in the middle.', 'মাঝখানে একটিমাত্র ০।') },
    { input: '0101101001', output: 'OK', source: 'own', note: L('A mixed string.', 'মিশ্র স্ট্রিং।') },
  ],
  pitfalls: [
    L('Dividing by 2 without checking: m + k − dist is always even, but a wrong formula hides this and gives odd numbers.', '২ দিয়ে ভাগে সতর্ক না হওয়া: m + k − dist সবসময় জোড়, ভুল সূত্রে বিজোড় সংখ্যা এসে ব্যাপারটা ঢেকে যায়।'),
    L('Printing the pair in the wrong order: the first number is the position of a 0.', 'জোড়া উল্টো ক্রমে প্রিন্ট করা: প্রথম সংখ্যাটি ০-এর অবস্থান।'),
    L('Searching for "the first 1" directly: the prefix test only compares with s_1, so handle both cases of s_1.', 'সরাসরি "প্রথম ১" খোঁজা: প্রিফিক্স পরীক্ষা শুধু s_১-এর সাথে মেলায়, তাই s_১-এর দুই অবস্থাই সামলাও।'),
    L('Not counting the first two questions: 2 + 10 = 12, still inside 15, but a linear scan is not.', 'প্রথম দুই প্রশ্ন না গোনা: ২ + ১০ = ১২, ১৫-র ভেতরে, কিন্তু রৈখিক স্ক্যান নয়।'),
  ],
  related: [
    { id: '1697D', name: 'Guess The String', why: L('Another hidden string recovered from few questions.', 'কম প্রশ্নে লুকানো আরেকটি স্ট্রিং উদ্ধার।') },
    { id: '1698D', name: 'Fixed Point Guessing', why: L('Binary search with a counting answer.', 'গণনার উত্তর নিয়ে বাইনারি সার্চ।') },
  ],
  toolkit: ['io-basics', 'binary-search'],
};

// ───────────────────────────────────────────── 1088D
export const p1088D: ProblemEntry = {
  id: '1088D',
  contestId: 1088,
  index: 'D',
  name: 'Ehab and another another xor problem',
  rating: 2000,
  interactive: true,
  tags: ['bitmasks', 'constructive', 'interactive'],
  why: L(
    'Comparing a xor c with b xor d tells which of the two is larger, which is decided by the highest bit where they differ. Two probes per bit, plus the running comparison, reveal one bit of both numbers at a time.',
    'a xor c আর b xor d তুলনা করলে বোঝা যায় কোনটি বড়, আর সেটি ঠিক হয় যে সর্বোচ্চ বিটে তারা আলাদা সেখানে। প্রতি বিটে দুটি প্রোব আর চলমান তুলনা মিলে দুই সংখ্যারই একটি করে বিট প্রকাশ করে।',
  ),
  statement: L(
    'The judge hides two integers a and b, each in [0, 2³⁰). A question "? c d" (0 ≤ c, d < 2³⁰) is answered with 1 if (a xor c) > (b xor d), 0 if they are equal and −1 if (a xor c) < (b xor d). With at most 62 questions, print "! a b".',
    'জাজ দুটি পূর্ণসংখ্যা a আর b লুকিয়েছে, দুটিই [০, ২³⁰)-এ। প্রশ্ন "? c d" (০ ≤ c, d < ২³⁰)-এর উত্তর ১ যদি (a xor c) > (b xor d), ০ যদি সমান, আর −১ যদি (a xor c) < (b xor d)। সর্বোচ্চ ৬২ প্রশ্নে "! a b" প্রিন্ট করো।',
  ),
  input: L('After each question, one integer: 1, 0 or −1.', 'প্রতিটি প্রশ্নের পর একটি পূর্ণসংখ্যা: ১, ০ বা −১।'),
  output: L('Questions "? c d", then "! a b". Flush after every line.', 'প্রশ্ন "? c d", শেষে "! a b"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('0 ≤ a, b < 2³⁰, at most 62 questions. The real judge may answer −2 after an error; we show an error message instead.', '০ ≤ a, b < ২³⁰, সর্বোচ্চ ৬২ প্রশ্ন। আসল জাজ ভুলের পর −২ দিতে পারে; আমরা এর বদলে ভুলের বার্তা দেখাই।')] },
  samples: [
    {
      input: '3 1',
      output: 'OK',
      transcript: '> ? 0 0\n< 1\n> ? 2 0\n< 0\n> ? 0 2\n< 0\n> ? 3 0\n< -1\n> ? 2 1\n< 1\n> ! 3 1',
      explain: L('This is the algorithm run on only the last two bits (a = 3, b = 1, so all the higher bits are zero and are handled the same way, two probes each). Start: a > b gives 1. Bit 1: the two probes agree (0 and 0), so the bits differ, and because the start answer was 1, it is a that has the 1: a = 2. The new comparison is 0. Bit 0: the probes disagree (−1 and 1), so the bits are equal, and the first probe being −1 means both are 1. Result: a = 3, b = 1. A real run asks 1 + 2 · 30 = 61 questions. ' + made.en, 'এটি শুধু শেষ দুই বিটে চালানো অ্যালগরিদম (a = ৩, b = ১, তাই উপরের সব বিট শূন্য আর একইভাবে, দুই প্রোবে, সামলানো হয়)। শুরু: a > b তাই ১। বিট ১: দুই প্রোবের উত্তর এক (০ আর ০), তাই বিট দুটি আলাদা, আর শুরুর উত্তর ১ ছিল বলে ১টি a-এর: a = ২। নতুন তুলনা ০। বিট ০: প্রোব দুটির উত্তর ভিন্ন (−১ আর ১), তাই বিট সমান, আর প্রথম প্রোব −১ মানে দুটিই ১। ফল: a = ৩, b = ১। আসল রানে ১ + ২ · ৩০ = ৬১ প্রশ্ন হয়। ' + made.bn),
    },
  ],
  observation: L(
    'Keep the bits of a and b found so far as c and d, so that a xor c and b xor d are zero above bit i. For bit i, flip it in only one side at a time. If a_i = b_i, flipping bit i of c makes the sides differ at bit i, and flipping d makes them differ the other way, so the two answers are opposite. If a_i ≠ b_i, flipping either one makes them equal at bit i, so both answers equal the comparison of the lower bits.',
    'এ পর্যন্ত পাওয়া a আর b-এর বিট c আর d-তে রাখো, যাতে বিট i-র উপরে a xor c আর b xor d শূন্য। বিট i-র জন্য একবারে শুধু এক পাশে উল্টাও। a_i = b_i হলে c-র বিট i উল্টালে বিট i-তে দুই পাশ আলাদা হয়, d উল্টালে উল্টো দিকে, তাই দুই উত্তর বিপরীত। a_i ≠ b_i হলে যেকোনোটি উল্টালে বিট i-তে সমান হয়ে যায়, তাই দুই উত্তরই নিচের বিটগুলোর তুলনার সমান।',
  ),
  approach: [
    L('Ask (0, 0) once to get prev, the comparison of a and b.', 'prev, অর্থাৎ a আর b-এর তুলনা, পেতে একবার (০, ০) জিজ্ঞেস করো।'),
    L('For bit i from 29 down to 0 ask q1 = (c xor 2^i, d) and q2 = (c, d xor 2^i).', 'বিট i-কে ২৯ থেকে ০ পর্যন্ত নিয়ে q1 = (c xor ২^i, d) আর q2 = (c, d xor ২^i) জিজ্ঞেস করো।'),
    L('If q1 ≠ q2 the bits are equal: both are 1 exactly when q1 = −1. The comparison prev does not change.', 'q1 ≠ q2 হলে বিট সমান: q1 = −১ হলেই দুটিই ১। prev বদলায় না।'),
    L('If q1 = q2 the bits differ: a_i = 1 exactly when prev = 1. The new prev is q1.', 'q1 = q2 হলে বিট আলাদা: prev = ১ হলেই a_i = ১। নতুন prev হলো q1।'),
    L('Total 1 + 2 · 30 = 61 questions.', 'মোট ১ + ২ · ৩০ = ৬১ প্রশ্ন।'),
  ],
  walkthrough: {
    input: '3 1',
    steps: [
      { state: '? 0 0 → 1', text: L('prev = 1: a > b.', 'prev = ১: a > b।') },
      { state: 'bit 1: q1 = 0, q2 = 0', text: L('Equal answers, so the bits differ. prev = 1 gives a_1 = 1, b_1 = 0. New prev = 0.', 'উত্তর সমান, তাই বিট আলাদা। prev = ১ থেকে a_১ = ১, b_১ = ০। নতুন prev = ০।') },
      { state: 'bit 0: q1 = −1, q2 = 1', text: L('Different answers, so the bits are equal; q1 = −1 means both are 1. So a = 3, b = 1.', 'উত্তর ভিন্ন, তাই বিট সমান; q1 = −১ মানে দুটিই ১। তাই a = ৩, b = ১।') },
    ],
  },
  complexity: { time: 'O(30) questions', space: 'O(1)', why: L('Two probes per bit and one at the start.', 'প্রতি বিটে দুই প্রোব আর শুরুতে একটি।') },
  solutions: [
    {
      id: 'running',
      kind: 'optimal',
      title: L('Two probes per bit with a running comparison', 'চলমান তুলনাসহ প্রতি বিটে দুই প্রোব'),
      idea: L('Carry the comparison of the unresolved low parts, so each bit costs only two questions.', 'অমীমাংসিত নিচের অংশের তুলনা বয়ে নাও, ফলে প্রতি বিটে মাত্র দুই প্রশ্ন।'),
      explain: [
        L('The whole difficulty is that "a xor c > b xor d" only looks at the highest differing bit. By clearing resolved bits through c and d we make that bit the one we are examining.', 'আসল ব্যাপার হলো "a xor c > b xor d" শুধু সর্বোচ্চ আলাদা বিট দেখে। মীমাংসিত বিটগুলো c আর d দিয়ে মুছে দিয়ে আমরা সেই বিটকে সরাসরি পরীক্ষার বিটে আনি।'),
        L('The budget is 62 and this uses 61, so there is room for exactly one spare question.', 'বাজেট ৬২ আর এটি ৬১ ব্যবহার করে, তাই ঠিক একটি বাড়তি প্রশ্ন থাকে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int c, int d) {
    cout << "? " << c << " " << d << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    int a = 0, b = 0;  // bits found so far
    int prev = ask(0, 0);
    for (int i = 29; i >= 0; i--) {
        int q1 = ask(a ^ (1 << i), b);
        int q2 = ask(a, b ^ (1 << i));
        if (q1 != q2) {          // a_i == b_i
            if (q1 == -1) {      // both are 1
                a |= 1 << i;
                b |= 1 << i;
            }
        } else {                 // a_i != b_i, and prev says who has the 1
            if (prev == 1) a |= 1 << i;
            else b |= 1 << i;
            prev = q1;
        }
    }
    cout << "! " << a << " " << b << endl;
}
`,
      time: 'O(30) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'bitwise-and', 'bit-shift'],
    },
    {
      id: 'fresh',
      kind: 'brute',
      title: L('Re-ask the comparison at every bit', 'প্রতি বিটে তুলনা আবার জিজ্ঞেস'),
      idea: L('Same decoding, but without carrying prev: 3 questions per bit.', 'একই ডিকোডিং, কিন্তু prev না বয়ে: প্রতি বিটে ৩ প্রশ্ন।'),
      explain: [L('Simpler to reason about, since every bit starts from a fresh comparison, but 90 questions is far over the budget of 62. It is the idea that "carry the answer you already have" saves a third.', 'বোঝা সহজ, কারণ প্রতি বিট নতুন তুলনা দিয়ে শুরু, কিন্তু ৯০ প্রশ্ন বাজেট ৬২-র অনেক ওপরে। "যে উত্তর আগে থেকেই আছে তা বয়ে নাও" ধারণাটিই এক-তৃতীয়াংশ বাঁচায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int ask(int c, int d) {
    cout << "? " << c << " " << d << endl;
    int r;
    cin >> r;
    return r;
}

int main() {
    int a = 0, b = 0;
    for (int i = 29; i >= 0; i--) {
        int p = ask(a, b);
        int q1 = ask(a ^ (1 << i), b);
        int q2 = ask(a, b ^ (1 << i));
        if (q1 != q2) {
            if (q1 == -1) {
                a |= 1 << i;
                b |= 1 << i;
            }
        } else {
            if (p == 1) a |= 1 << i;
            else b |= 1 << i;
        }
    }
    cout << "! " << a << " " << b << endl;
}
`,
      time: 'O(90) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics', 'bitwise-and', 'bit-shift'],
    },
  ],
  tests: [
    { input: '0 0', output: 'OK', source: 'own', note: L('Everything is zero and equal.', 'সবকিছু শূন্য আর সমান।') },
    { input: '5 5', output: 'OK', source: 'own', note: L('Equal numbers: the comparison stays 0 throughout.', 'সমান সংখ্যা: তুলনা পুরোটাই ০।') },
    { input: '1073741823 0', output: 'OK', source: 'own', note: L('The largest value against zero.', 'বৃহত্তম মান বনাম শূন্য।') },
    { input: '0 1073741823', output: 'OK', source: 'own', note: L('The same, the other way round.', 'একই, উল্টো দিকে।') },
    { input: '123456789 987654321', output: 'OK', source: 'own', note: L('A mixed case with long equal and long differing stretches.', 'দীর্ঘ সমান আর দীর্ঘ আলাদা অংশওয়ালা মিশ্র কেস।') },
  ],
  pitfalls: [
    L('Letting c or d reach 2³⁰: the judge allows values below 2³⁰ only, so start from bit 29.', 'c বা d-কে ২³⁰-এ পৌঁছাতে দেওয়া: জাজ শুধু ২³⁰-এর কম মান নেয়, তাই বিট ২৯ থেকে শুরু করো।'),
    L('Updating prev in the equal-bits case: it must stay, because the lower parts have not changed.', 'সমান-বিটের ক্ষেত্রে prev বদলানো: এটি থাকতেই হবে, কারণ নিচের অংশ বদলায়নি।'),
    L('Setting only one of the two numbers in the equal-bits case: both must get the bit so that both sides lose it.', 'সমান-বিটের ক্ষেত্রে মাত্র একটি সংখ্যায় বিট বসানো: দুটিতেই বসাতে হবে যাতে দুই পাশেই বিটটি মুছে যায়।'),
    L('Using 3 questions per bit: 91 questions, well over 62.', 'প্রতি বিটে ৩ প্রশ্ন: ৯১ প্রশ্ন, ৬২-র অনেক ওপরে।'),
  ],
  related: [
    { id: '1556D', name: 'Take a Guess', why: L('Recovering numbers from AND/OR answers, bit by bit.', 'AND/OR উত্তর থেকে বিটে বিটে সংখ্যা উদ্ধার।') },
    { id: '1486C2', name: 'Guessing the Greatest (hard version)', why: L('A tight question budget again.', 'আবারও কঠোর প্রশ্নবাজেট।') },
  ],
  toolkit: ['io-basics', 'bitwise-and', 'bit-shift'],
};

// ───────────────────────────────────────────── 1103B
export const p1103B: ProblemEntry = {
  id: '1103B',
  contestId: 1103,
  index: 'B',
  name: 'Game with modulo',
  rating: 2000,
  interactive: true,
  tags: ['binary-search', 'constructive', 'interactive', 'math'],
  why: L(
    'The only question compares x mod a with y mod a. Asking about powers of two finds the right power-of-two range for a in about 30 questions, and then a binary search finishes it. The two phases together fit in 60 questions.',
    'একমাত্র প্রশ্নটি x mod a আর y mod a তুলনা করে। দুইয়ের ঘাত নিয়ে জিজ্ঞেস করলে প্রায় ৩০ প্রশ্নে a কোন দুইয়ের ঘাতের পাল্লায় তা পাওয়া যায়, তারপর বাইনারি সার্চ শেষ করে। দুই ধাপ মিলে ৬০ প্রশ্নের ভেতরে।',
  ),
  statement: L(
    'The judge hides an integer a with 1 ≤ a ≤ 10⁹. A question "? x y" (0 ≤ x, y ≤ 10⁹) is answered with "x" if x mod a ≥ y mod a and with "y" otherwise. With at most 60 questions, print "! a". The judge first prints "start". (On Codeforces the same program plays several games; our judge plays one.)',
    'জাজ একটি পূর্ণসংখ্যা a (১ ≤ a ≤ ১০⁹) লুকিয়েছে। প্রশ্ন "? x y" (০ ≤ x, y ≤ ১০⁹)-এর উত্তর "x" যদি x mod a ≥ y mod a, নয়তো "y"। সর্বোচ্চ ৬০ প্রশ্নে "! a" প্রিন্ট করো। জাজ প্রথমে "start" প্রিন্ট করে। (কোডফোর্সেসে একই প্রোগ্রাম কয়েকটি গেম খেলে; আমাদের জাজ একটি খেলে।)',
  ),
  input: L('First the word "start". After each question, the letter "x" or "y".', 'প্রথমে "start" শব্দ। প্রতিটি প্রশ্নের পর "x" বা "y" অক্ষর।'),
  output: L('Questions "? x y", then "! a". Flush after every line.', 'প্রশ্ন "? x y", শেষে "! a"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ a ≤ 10⁹, at most 60 questions per game', '১ ≤ a ≤ ১০⁹, প্রতি গেমে সর্বোচ্চ ৬০ প্রশ্ন')] },
  samples: [
    {
      input: '5',
      output: 'OK',
      transcript: '< start\n> ? 0 1\n< y\n> ? 1 2\n< y\n> ? 2 4\n< y\n> ? 4 8\n< x\n> ? 4 6\n< x\n> ? 4 5\n< x\n> ! 5',
      explain: L('(0, 1) says "y": a is not 1. Then (1, 2), (2, 4) say "y" (a is above 2, then above 4), and (4, 8) says "x": a is in (4, 8]. A binary search with the fixed 4 then asks (4, 6) and (4, 5): "x" both times, so a ≤ 5, and 5 is the only candidate left in (4, 5]. ' + made.en, '(০, ১) বলে "y": a ১ নয়। তারপর (১, ২), (২, ৪) বলে "y" (a ২-এর ওপরে, তারপর ৪-এর ওপরে), আর (৪, ৮) বলে "x": a আছে (৪, ৮]-এ। ৪ স্থির রেখে বাইনারি সার্চ জিজ্ঞেস করে (৪, ৬) আর (৪, ৫): দুবারই "x", তাই a ≤ ৫, আর (৪, ৫]-এ শুধু ৫ বাকি। ' + made.bn),
    },
  ],
  observation: L(
    'Let 2^k < a ≤ 2^(k+1). Then 2^k mod a = 2^k, and for 2^k < v ≤ 2^(k+1): if v < a then v mod a = v > 2^k, so the answer is "y"; if v ≥ a then v mod a = v − a < 2^k, so the answer is "x". So the question (2^k, v) is the test "v ≥ a". The same test with v = 2^(k+1) finds k.',
    'ধরো 2^k < a ≤ 2^(k+1)। তাহলে 2^k mod a = 2^k, আর 2^k < v ≤ 2^(k+1)-এর জন্য: v < a হলে v mod a = v > 2^k, তাই উত্তর "y"; v ≥ a হলে v mod a = v − a < 2^k, তাই উত্তর "x"। অর্থাৎ প্রশ্ন (2^k, v) হলো "v ≥ a" পরীক্ষা। v = 2^(k+1) নিয়ে একই পরীক্ষা k খুঁজে দেয়।',
  ),
  approach: [
    L('Ask (0, 1): the answer is "x" only if 1 mod a = 0, that is a = 1. Handle it first, since a = 1 would break the later test.', '(০, ১) জিজ্ঞেস করো: উত্তর "x" শুধু তখনই যখন ১ mod a = ০, অর্থাৎ a = ১। এটি আগে সামলাও, কারণ a = ১ পরের পরীক্ষা ভাঙে।'),
    L('Double: while lo < 2^29 and ask(lo, 2·lo) = "y", set lo = 2·lo. Now 2^k = lo < a ≤ 2^(k+1) (or a > 2^29).', 'দ্বিগুণ করো: যতক্ষণ lo < ২^২৯ আর ask(lo, ২·lo) = "y", lo = ২·lo। এখন ২^k = lo < a ≤ ২^(k+1) (বা a > ২^২৯)।'),
    L('Set hi = min(2·lo, 10⁹): the largest value we are allowed to ask about.', 'hi = min(২·lo, ১০⁹): যে বৃহত্তম মান নিয়ে জিজ্ঞেস করা যায়।'),
    L('Binary search the smallest v in (lo, hi] with ask(lo, v) = "x": that v is a.', '(lo, hi]-এ ক্ষুদ্রতম v যার ask(lo, v) = "x" তা বাইনারি সার্চে খোঁজো: সেই v-ই a।'),
    L('Questions: 1 + at most 29 for doubling + at most 29 for the search, so at most 59.', 'প্রশ্ন: ১ + দ্বিগুণ করতে সর্বোচ্চ ২৯ + সার্চে সর্বোচ্চ ২৯, মোট সর্বোচ্চ ৫৯।'),
  ],
  walkthrough: {
    input: '5',
    steps: [
      { state: '? 0 1 → y', text: L('a ≠ 1.', 'a ≠ ১।') },
      { state: '? 1 2, ? 2 4 → y, y', text: L('a > 4, so lo becomes 4.', 'a > ৪, তাই lo হয় ৪।') },
      { state: '? 4 8 → x', text: L('a ≤ 8: the range is (4, 8].', 'a ≤ ৮: পাল্লা (৪, ৮]।') },
      { state: '? 4 6 → x, ? 4 5 → x', text: L('v = 6 and v = 5 both reach a; the range shrinks to (4, 5], so a = 5.', 'v = ৬ আর v = ৫ দুটিই a-তে পৌঁছায়; পাল্লা (৪, ৫]-এ নামে, তাই a = ৫।') },
    ],
  },
  complexity: { time: 'O(log a) questions', space: 'O(1)', why: L('One doubling pass and one binary search, each about 30 steps.', 'একটি দ্বিগুণ করার পাস আর একটি বাইনারি সার্চ, প্রতিটি প্রায় ৩০ ধাপ।') },
  solutions: [
    {
      id: 'double-search',
      kind: 'optimal',
      title: L('Double to the right range, then binary search', 'ঠিক পাল্লায় দ্বিগুণ করে, তারপর বাইনারি সার্চ'),
      idea: L('A fixed power of two turns each question into the test "v ≥ a".', 'দুইয়ের একটি স্থির ঘাত প্রতিটি প্রশ্নকে "v ≥ a" পরীক্ষায় বদলে দেয়।'),
      explain: [
        L('The cap at 10⁹ matters: when a is above 2^29 we must not ask about 2^30, which exceeds the allowed range, so the search range is cut to (2^29, 10⁹].', '১০⁹-এর সীমা জরুরি: a ২^২৯-এর ওপরে হলে ২^৩০ নিয়ে জিজ্ঞেস করা যাবে না, কারণ সেটি অনুমোদিত পাল্লার বাইরে, তাই সার্চ পাল্লা কেটে (২^২৯, ১০⁹] করা হয়।'),
        L('The test still works in the capped range because 10⁹ < 2a when a > 2^29.', 'সীমা-কাটা পাল্লায়ও পরীক্ষা কাজ করে কারণ a > ২^২৯ হলে ১০⁹ < ২a।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

char ask(long long x, long long y) {
    cout << "? " << x << " " << y << endl;
    string s;
    cin >> s;
    return s[0];
}

int main() {
    string start;
    cin >> start;
    if (ask(0, 1) == 'x') {  // 1 mod a == 0
        cout << "! 1" << endl;
        return 0;
    }
    long long lo = 1;
    while (lo < (1LL << 29) && ask(lo, 2 * lo) == 'y') lo *= 2;
    long long base = lo, l = lo, h = min(2 * lo, 1000000000LL);
    while (h - l > 1) {
        long long m = (l + h) / 2;
        if (ask(base, m) == 'x') h = m;
        else l = m;
    }
    cout << "! " << h << endl;
}
`,
      time: 'O(log a) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'long-long', 'binary-search', 'modulo'],
    },
    {
      id: 'scan',
      kind: 'brute',
      title: L('Scan v = 2, 3, 4, …', 'v = ২, ৩, ৪, … স্ক্যান'),
      idea: L('Ask (1, v) until the answer is "x": the first such v is a.', '(১, v) জিজ্ঞেস করো যতক্ষণ না "x" আসে: প্রথম এমন v-ই a।'),
      explain: [L('For v < a the question gives "y" because v mod a = v > 1, and at v = a it gives "x" because v mod a = 0. That needs a − 1 questions, which is fine for tiny a and hopeless beyond 60.', 'v < a হলে প্রশ্ন "y" দেয় কারণ v mod a = v > ১, আর v = a-তে "x" দেয় কারণ v mod a = ০। এতে a − ১ প্রশ্ন লাগে, ছোট a-তে ঠিক আছে আর ৬০-এর পর আশাহীন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

char ask(long long x, long long y) {
    cout << "? " << x << " " << y << endl;
    string s;
    cin >> s;
    return s[0];
}

int main() {
    string start;
    cin >> start;
    if (ask(0, 1) == 'x') {
        cout << "! 1" << endl;
        return 0;
    }
    for (long long v = 2;; v++) {
        if (ask(1, v) == 'x') {
            cout << "! " << v << endl;
            return 0;
        }
    }
}
`,
      time: 'O(a) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics', 'long-long'],
    },
  ],
  tests: [
    { input: '1', output: 'OK', source: 'own', note: L('a = 1 is the special case that the (0, 1) question catches.', 'a = ১ বিশেষ কেস, যা (০, ১) প্রশ্ন ধরে।') },
    { input: '2', output: 'OK', source: 'own', note: L('The first doubling question already says "x".', 'প্রথম দ্বিগুণ-প্রশ্নেই "x" আসে।') },
    { input: '3', output: 'OK', source: 'own', note: L('a just above a power of two.', 'দুইয়ের ঘাতের ঠিক ওপরে a।') },
    { input: '4', output: 'OK', source: 'own', note: L('a equal to a power of two.', 'a দুইয়ের ঘাতের সমান।') },
    { input: '536870912', output: 'OK', source: 'own', note: L('a = 2^29, the last value before the capped range.', 'a = ২^২৯, সীমা-কাটা পাল্লার আগের শেষ মান।') },
    { input: '536870913', output: 'OK', source: 'own', note: L('First value in the capped range.', 'সীমা-কাটা পাল্লার প্রথম মান।') },
    { input: '1000000000', output: 'OK', source: 'own', note: L('The largest a: the capped search ends at exactly 10⁹.', 'বৃহত্তম a: সীমা-কাটা সার্চ ঠিক ১০⁹-এ শেষ।') },
    { input: '123456789', output: 'OK', source: 'own', note: L('A typical large value.', 'একটি সাধারণ বড় মান।') },
  ],
  pitfalls: [
    L('Skipping the a = 1 check: then (1, 2) answers "x" for a = 1 and you would print 2.', 'a = ১ পরীক্ষা বাদ দেওয়া: তখন a = ১-এ (১, ২) "x" দেয় আর তুমি ২ প্রিন্ট করবে।'),
    L('Asking about 2^30: it is above 10⁹ and the judge rejects it.', '২^৩০ নিয়ে জিজ্ঞেস করা: এটি ১০⁹-এর ওপরে, জাজ বাতিল করে।'),
    L('Moving the base while searching: the test "v ≥ a" only holds for the fixed base 2^k.', 'সার্চের সময় ভিত্তি নড়ানো: "v ≥ a" পরীক্ষা শুধু স্থির ভিত্তি ২^k-র জন্য সত্য।'),
    L('Using int for 2·lo and the products: use long long near 10⁹.', '২·lo আর গুণফলে int: ১০⁹-এর কাছে long long ব্যবহার করো।'),
  ],
  related: [
    { id: '1697D', name: 'Guess The String', why: L('Binary search inside an interactive protocol.', 'ইন্টারঅ্যাকটিভ প্রোটোকলের ভেতরে বাইনারি সার্চ।') },
    { id: '1088D', name: 'Ehab and another another xor problem', why: L('Bit by bit from a comparison answer.', 'তুলনার উত্তর থেকে বিটে বিটে।') },
  ],
  toolkit: ['io-basics', 'long-long', 'binary-search', 'modulo'],
};

// ───────────────────────────────────────────── 843B
export const p843B: ProblemEntry = {
  id: '843B',
  contestId: 843,
  index: 'B',
  name: 'Interactive LowerBound',
  rating: 2000,
  interactive: true,
  tags: ['brute-force', 'interactive', 'probabilities'],
  why: L(
    'A sorted linked list cannot be binary searched, but random sampling can jump close to the answer. Sample about a thousand cells, start from the best one below x, and walk. The walk is short with overwhelming probability.',
    'সর্টেড লিংকড লিস্টে বাইনারি সার্চ চলে না, কিন্তু র‍্যান্ডম স্যাম্পলিং উত্তরের কাছে লাফ দিতে পারে। প্রায় এক হাজার ঘর স্যাম্পল করো, x-এর নিচের সেরাটি থেকে শুরু করে হাঁটো। হাঁটা অত্যন্ত সম্ভাবনায় ছোট।',
  ),
  statement: L(
    'The judge holds a sorted singly linked list stored in n cells in scrambled order. Cell i has a value and the index of the next cell (−1 at the end). The judge first prints n, the index of the first cell, and a number x. A question "? i" is answered with the value and the next index of cell i. With at most 2000 questions, print "! v" where v is the smallest value in the list that is at least x, or "! -1" if there is none.',
    'জাজের কাছে n টি ঘরে এলোমেলো ক্রমে রাখা একটি সর্টেড একমুখী লিংকড লিস্ট। ঘর i-তে একটি মান আর পরের ঘরের সূচক (শেষে −১)। জাজ প্রথমে n, প্রথম ঘরের সূচক আর একটি সংখ্যা x প্রিন্ট করে। প্রশ্ন "? i"-র উত্তর i নম্বর ঘরের মান আর পরের সূচক। সর্বোচ্চ ২০০০ প্রশ্নে "! v" প্রিন্ট করো যেখানে v লিস্টের ক্ষুদ্রতম মান যা অন্তত x, আর না থাকলে "! -1"।',
  ),
  input: L('First line: n, start, x. After each question, two integers: value and next.', 'প্রথম লাইনে n, start, x। প্রতিটি প্রশ্নের পর দুটি পূর্ণসংখ্যা: মান আর next।'),
  output: L('Questions "? i", then "! v". Flush after every line.', 'প্রশ্ন "? i", শেষে "! v"। প্রতিটি লাইনের পর flush করো।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 50000, values and x up to 10⁹, at most 2000 questions', '১ ≤ n ≤ ৫০০০০, মান ও x সর্বোচ্চ ১০⁹, সর্বোচ্চ ২০০০ প্রশ্ন')] },
  samples: [
    {
      input: '5 3 80\n97 -1\n58 5\n16 2\n81 1\n79 4',
      output: 'OK',
      transcript: '< 5 3 80\n> ? 3\n< 16 2\n> ? 2\n< 58 5\n> ? 5\n< 79 4\n> ? 4\n< 81 1\n> ! 81',
      explain: L('The list is 16 → 58 → 79 → 81 → 97 (cells 3, 2, 5, 4, 1). With such a tiny list we can just walk from the start: 16, 58 and 79 are below 80 and 81 is the first value that is at least 80. The sampling program of the main solution would ask about 1000 random cells first; that is only worth it for long lists. ' + made.en, 'লিস্টটি ১৬ → ৫৮ → ৭৯ → ৮১ → ৯৭ (ঘর ৩, ২, ৫, ৪, ১)। এত ছোট লিস্টে শুরু থেকেই হাঁটা যায়: ১৬, ৫৮ আর ৭৯ হলো ৮০-র নিচে আর ৮১ প্রথম মান যা অন্তত ৮০। মূল সমাধানের স্যাম্পলিং প্রোগ্রাম আগে প্রায় ১০০০ এলোমেলো ঘর জিজ্ঞেস করত; সেটি শুধু লম্বা লিস্টেই লাভজনক। ' + made.bn),
    },
  ],
  observation: L(
    'The list is sorted by value, so the cell we want is the first cell whose value is at least x. If we know any cell with value below x, we can start walking from it and never miss the answer. A random sample of 1000 cells lands, in list order, about every n/1000 cells, so the best sampled cell below x is typically within a few dozen cells of the answer.',
    'লিস্টটি মান অনুযায়ী সর্টেড, তাই আমাদের কাঙ্ক্ষিত ঘর হলো যার মান অন্তত x এমন প্রথম ঘর। x-এর নিচের মানওয়ালা কোনো ঘর জানা থাকলে সেখান থেকে হাঁটা শুরু করা যায় আর উত্তর কখনও ফসকায় না। ১০০০ ঘরের র‍্যান্ডম স্যাম্পল লিস্টের ক্রমে প্রায় প্রতি n/১০০০ ঘরে একটি করে পড়ে, তাই x-এর নিচের সেরা স্যাম্পল সাধারণত উত্তর থেকে কয়েক ডজন ঘরের ভেতরে থাকে।',
  ),
  approach: [
    L('Ask the first cell. If its value is already at least x, it is the answer.', 'প্রথম ঘর জিজ্ঞেস করো। তার মান ইতোমধ্যে অন্তত x হলে সেটিই উত্তর।'),
    L('Ask 998 random cells (a fixed seed is fine). Remember the one with the largest value that is still below x, together with its next pointer.', '৯৯৮ টি এলোমেলো ঘর জিজ্ঞেস করো (স্থির সিড চলে)। x-এর নিচে থেকেও যার মান সবচেয়ে বড়, তা তার next পয়েন্টারসহ মনে রাখো।'),
    L('Walk from the next of that best cell, at most 1000 steps. The first value at least x is the answer; running off the end of the list means there is none.', 'ওই সেরা ঘরের next থেকে সর্বোচ্চ ১০০০ ধাপ হাঁটো। অন্তত x প্রথম মানই উত্তর; লিস্টের শেষ পেরোলে উত্তর নেই।'),
    L('Questions: 1 + 998 + 1000 = 1999 at most. The walk is far shorter in practice: about n/1000 steps.', 'প্রশ্ন: সর্বোচ্চ ১ + ৯৯৮ + ১০০০ = ১৯৯৯। বাস্তবে হাঁটা অনেক ছোট: প্রায় n/১০০০ ধাপ।'),
  ],
  walkthrough: {
    input: '5 3 80\n97 -1\n58 5\n16 2\n81 1\n79 4',
    steps: [
      { state: 'ask start (cell 3)', text: L('16 < 80, so cell 3 is the best so far, next = 2.', '১৬ < ৮০, তাই ৩ নম্বর ঘর এখন পর্যন্ত সেরা, next = ২।') },
      { state: 'sample cells', text: L('With n = 5 the random cells repeat a lot; cell 5 (79 < 80) beats cell 3, so the walk starts at its next, cell 4.', 'n = ৫-এ র‍্যান্ডম ঘর অনেক পুনরাবৃত্ত হয়; ৫ নম্বর ঘর (৭৯ < ৮০) ৩-কে হারায়, তাই হাঁটা শুরু তার next, ঘর ৪ থেকে।') },
      { state: 'walk: cell 4 = 81', text: L('81 ≥ 80 and the list is sorted, so 81 is the answer.', '৮১ ≥ ৮০ আর লিস্ট সর্টেড, তাই ৮১-ই উত্তর।') },
    ],
  },
  complexity: { time: 'O(1) questions (about 2000)', space: 'O(1)', why: L('A constant number of questions regardless of n, bounded by the sample size and the walk limit.', 'n যাই হোক প্রশ্ন ধ্রুবক, স্যাম্পলের আকার আর হাঁটার সীমায় বাঁধা।') },
  solutions: [
    {
      id: 'sample-walk',
      kind: 'optimal',
      title: L('Random sample, then walk from the best cell', 'র‍্যান্ডম স্যাম্পল, তারপর সেরা ঘর থেকে হাঁটা'),
      idea: L('Sampling replaces the missing binary search; the walk finishes the job.', 'স্যাম্পলিং না থাকা বাইনারি সার্চের জায়গা নেয়; হাঁটা কাজ শেষ করে।'),
      explain: [
        L('The chance that the walk exceeds 1000 steps is about (1 − 999/n)^1000-ish, at most e^(−20) for n = 50000, so we treat it as impossible. The seed is fixed, so the same program always asks the same cells, which also keeps the browser replay consistent.', 'হাঁটা ১০০০ ধাপ পেরোনোর সম্ভাবনা প্রায় (১ − ৯৯৯/n)-এর ঘাত ১০০০ ধরনের, n = ৫০০০০-এ সর্বোচ্চ e^(−২০), তাই একে অসম্ভব ধরা হয়। সিড স্থির, তাই একই প্রোগ্রাম সবসময় একই ঘর জিজ্ঞেস করে, যা ব্রাউজারের রিপ্লেও সঙ্গতিপূর্ণ রাখে।'),
        L('Never seed from the clock here: the site replays the program for every question, and a clock-seeded program would ask different cells each time.', 'এখানে কখনও ঘড়ি থেকে সিড নিও না: সাইট প্রতিটি প্রশ্নে প্রোগ্রাম রিপ্লে করে, আর ঘড়ি-সিডের প্রোগ্রাম প্রতিবার ভিন্ন ঘর জিজ্ঞেস করবে।'),
      ],
      code: raw`#include <bits/stdc++.h>
using namespace std;

pair<int, int> ask(int i) {
    cout << "? " << i << endl;
    int v, nx;
    cin >> v >> nx;
    return {v, nx};
}

int main() {
    int n, start, x;
    cin >> n >> start >> x;
    pair<int, int> first = ask(start);
    if (first.first >= x) {
        cout << "! " << first.first << endl;
        return 0;
    }
    int bestVal = first.first, bestNext = first.second;
    mt19937 rng(712367);
    for (int t = 0; t < 998; t++) {
        int i = rng() % n + 1;
        pair<int, int> c = ask(i);
        if (c.first < x && c.first > bestVal) {
            bestVal = c.first;
            bestNext = c.second;
        }
    }
    int cur = bestNext;
    for (int step = 0; step < 1000 && cur != -1; step++) {
        pair<int, int> c = ask(cur);
        if (c.first >= x) {
            cout << "! " << c.first << endl;
            return 0;
        }
        cur = c.second;
    }
    cout << "! -1" << endl;
}
`,
      time: 'O(1) questions',
      space: 'O(1)',
      accepted: true,
      toolkit: ['io-basics', 'pair'],
    },
    {
      id: 'walk',
      kind: 'brute',
      title: L('Walk the whole list from the start', 'শুরু থেকে পুরো লিস্টে হাঁটা'),
      idea: L('Follow the next pointers until a value reaches x: up to n questions.', 'মান x-এ পৌঁছানো পর্যন্ত next পয়েন্টার অনুসরণ: সর্বোচ্চ n প্রশ্ন।'),
      explain: [L('Obviously correct, and the intended solution for lists of up to 2000 cells. With n up to 50000 the question limit makes it fail.', 'স্পষ্টতই সঠিক, আর ২০০০ ঘর পর্যন্ত লিস্টের জন্য উদ্দিষ্ট সমাধান। n ৫০০০০ পর্যন্ত হলে প্রশ্নসীমায় এটি ব্যর্থ হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, start, x;
    cin >> n >> start >> x;
    int cur = start;
    while (cur != -1) {
        cout << "? " << cur << endl;
        int v, nx;
        cin >> v >> nx;
        if (v >= x) {
            cout << "! " << v << endl;
            return 0;
        }
        cur = nx;
    }
    cout << "! -1" << endl;
}
`,
      time: 'O(n) questions',
      space: 'O(1)',
      accepted: false,
      toolkit: ['io-basics'],
    },
  ],
  tests: [
    { input: '1 1 5\n3 -1', output: 'OK', source: 'own', note: L('One cell, below x: the answer is −1.', 'একটি ঘর, x-এর নিচে: উত্তর −১।') },
    { input: '1 1 3\n3 -1', output: 'OK', source: 'own', note: L('One cell, exactly x.', 'একটি ঘর, ঠিক x।') },
    { input: '3 2 0\n20 -1\n5 3\n10 1', output: 'OK', source: 'own', note: L('x = 0: the first cell is the answer.', 'x = ০: প্রথম ঘরই উত্তর।') },
    { input: '4 4 100\n70 -1\n60 1\n50 2\n1 3', output: 'OK', source: 'own', note: L('Everything is below x: walk to the end.', 'সব x-এর নিচে: শেষ পর্যন্ত হাঁটা।') },
    { input: '5 3 80\n97 -1\n58 5\n16 2\n81 1\n79 4', output: 'OK', source: 'sample', note: L('The Codeforces example.', 'কোডফোর্সেসের উদাহরণ।') },
  ],
  pitfalls: [
    L('Seeding with the time: the site replays your program per question, so the sampled cells must be the same every run.', 'সময় দিয়ে সিড: সাইট প্রতি প্রশ্নে প্রোগ্রাম রিপ্লে করে, তাই স্যাম্পল করা ঘর প্রতি রানে একই হতে হবে।'),
    L('Forgetting the first cell: its value may already be at least x, and then nothing below x exists to start from.', 'প্রথম ঘর ভুলে যাওয়া: তার মান ইতোমধ্যে অন্তত x হতে পারে, তখন শুরু করার মতো x-এর নিচের কিছু থাকে না।'),
    L('Walking from the sampled cell itself, not from its next: it has value below x, so that wastes a question and, worse, a check against cur = −1 is skipped.', 'স্যাম্পল করা ঘর থেকেই হাঁটা, তার next থেকে নয়: তার মান x-এর নিচে, তাই এক প্রশ্ন নষ্ট হয়, আর cur = −১ পরীক্ষাও বাদ পড়ে।'),
    L('Using only the sample and no walk: the best sampled cell is below the answer, not the answer.', 'শুধু স্যাম্পল, হাঁটা নেই: সেরা স্যাম্পল ঘর উত্তরের নিচে, উত্তর নয়।'),
  ],
  related: [
    { id: '1486C1', name: 'Guessing the Greatest (easy version)', why: L('Another interactive search with a hidden order.', 'লুকানো ক্রমসহ আরেকটি ইন্টারঅ্যাকটিভ সার্চ।') },
    { id: '1534D', name: 'Lost Tree', why: L('Reconstruct a structure from few questions.', 'কম প্রশ্নে কাঠামো পুনর্গঠন।') },
  ],
  toolkit: ['io-basics', 'pair'],
};
