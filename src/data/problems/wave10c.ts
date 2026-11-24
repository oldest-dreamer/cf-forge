import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p380C: ProblemEntry = {
  id: '380C',
  contestId: 380,
  index: 'C',
  name: 'Sereja and Brackets',
  rating: 2000,
  tags: ['data-structures', 'schedules'],
  featuredFor: ['data-structures'],
  why: L('The classic segment tree whose nodes store a small summary (matched, open, close) that merges in O(1).', 'ক্লাসিক সেগমেন্ট ট্রি যার নোডে একটি ছোট সারাংশ (মেলানো, খোলা, বন্ধ) থাকে যা O(১)-এ মেলে।'),
  statement: L('A bracket string s and m queries l r: print the length of the longest correct bracket subsequence of s[l..r].', 'একটি বন্ধনী স্ট্রিং s আর m-টি কোয়েরি l r: s[l..r]-এর সবচেয়ে লম্বা সঠিক বন্ধনী সাবসিকোয়েন্সের দৈর্ঘ্য প্রিন্ট করুন।'),
  input: L('s, m, then m pairs l r.', 's, m, তারপর m-টি জোড়া l r।'),
  output: L('One answer per query.', 'প্রতি কোয়েরিতে একটি উত্তর।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 10⁶, m ≤ 10⁵', '|s| ≤ ১০⁶, m ≤ ১০⁵')] },
  samples: [{ input: '())(())(())(\n7\n1 1\n2 3\n1 2\n1 12\n8 12\n5 11\n2 10', output: '0\n0\n2\n10\n4\n6\n6', explain: L('Whole string: 5 matched pairs.', 'পুরো স্ট্রিং: ৫টি মেলানো জোড়া।') }],
  observation: L('Greedy matching inside a segment leaves some unmatched ‘)’ on the left and unmatched ‘(’ on the right. Two segments combine by matching min(left.open, right.close) more pairs. So a node stores (pairs, open, close).', 'একটি অংশের ভেতরে গ্রিডি মিল বামে কিছু অমেলানো ‘)’ আর ডানে অমেলানো ‘(’ রাখে। দুটি অংশ min(বাম.খোলা, ডান.বন্ধ)টি আরও জোড়া মিলিয়ে যুক্ত হয়। তাই একটি নোড রাখে (জোড়া, খোলা, বন্ধ)।'),
  approach: [L('Build the tree once; answer each query by merging O(log n) nodes; print 2 · pairs.', 'একবার ট্রি বানিয়ে প্রতিটি কোয়েরিতে O(log n)টি নোড মিলিয়ে উত্তর; ২ · জোড়া প্রিন্ট।')],
  walkthrough: { input: '"())(" and "())"', steps: [{ state: '(1 pair, 1 open, 1 close) + (1, 0, 1)', text: L('Merge: t = min(1, 1) = 1 → (3, 0, 1).', 'মেলানো: t = min(১, ১) = ১ → (৩, ০, ১)।') }] },
  complexity: { time: 'O(n + m log n)', space: 'O(n)', why: L('Tree of 2n nodes.', '২n নোডের ট্রি।') },
  solutions: [
    {
      id: 'segtree',
      kind: 'optimal',
      title: L('Segment tree of (pairs, open, close)', '(জোড়া, খোলা, বন্ধ)-এর সেগমেন্ট ট্রি'),
      idea: L('An associative merge makes any range query possible.', 'একটি সহযোজী মেলানো যেকোনো পরিসর কোয়েরি সম্ভব করে।'),
      explain: [L('This bottom-up (iterative) segment tree keeps left and right partial results separately, because the merge is not commutative: left parts must stay on the left.', 'এই নিচ থেকে ওপরে (পুনরাবৃত্ত) সেগমেন্ট ট্রি বাম আর ডান আংশিক ফল আলাদা রাখে, কারণ মেলানো বিনিময়যোগ্য নয়: বাম অংশ বামেই থাকতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct Node { int pairs = 0, open = 0, close = 0; };

Node merge(const Node& a, const Node& b) {
    int t = min(a.open, b.close);
    return {a.pairs + b.pairs + t, a.open + b.open - t, a.close + b.close - t};
}

int main() {
    static char buf[1000005];
    scanf("%s", buf);
    int n = strlen(buf);
    vector<Node> tr(2 * n);
    for (int i = 0; i < n; i++) tr[n + i] = buf[i] == '(' ? Node{0, 1, 0} : Node{0, 0, 1};
    for (int i = n - 1; i > 0; i--) tr[i] = merge(tr[2 * i], tr[2 * i + 1]);
    int m;
    scanf("%d", &m);
    while (m--) {
        int l, r;
        scanf("%d %d", &l, &r);
        Node left, right;
        for (l += n - 1, r += n; l < r; l >>= 1, r >>= 1) {
            if (l & 1) left = merge(left, tr[l++]);
            if (r & 1) right = merge(tr[--r], right);
        }
        printf("%d\n", 2 * merge(left, right).pairs);
    }
    return 0;
}
`,
      time: 'O(n + m log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'c-io'],
    },
    {
      id: 'rmq',
      kind: 'alt',
      title: L('Prefix balance + range minimum', 'প্রিফিক্স ব্যালেন্স + পরিসরের সর্বনিম্ন'),
      idea: L('Unmatched brackets come from how low the balance dips inside the range.', 'অমেলানো বন্ধনী আসে পরিসরের ভেতরে ব্যালেন্স কত নিচে নামে তা থেকে।'),
      explain: [L('P[i] = balance after i characters. In [l, r], unmatched ‘)’ = P[l−1] − min(P[l−1..r]) and unmatched ‘(’ = P[r] − min(P[l−1..r]). The answer is the length minus both. A sparse table gives the minimum in O(1).', 'P[i] = i অক্ষরের পরে ব্যালেন্স। [l, r]-এ অমেলানো ‘)’ = P[l−১] − min(P[l−১..r]) আর অমেলানো ‘(’ = P[r] − min(P[l−১..r])। উত্তর হলো দৈর্ঘ্য বিয়োগ দুটিই। একটি স্পার্স টেবিল O(১)-এ সর্বনিম্ন দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    static char buf[1000005];
    scanf("%s", buf);
    int n = strlen(buf);
    int LOG = __lg(n + 1) + 1;
    vector<vector<int>> sp(LOG, vector<int>(n + 1));
    sp[0][0] = 0;
    for (int i = 1; i <= n; i++) sp[0][i] = sp[0][i - 1] + (buf[i - 1] == '(' ? 1 : -1);
    vector<int>& P = sp[0];
    for (int k = 1; k < LOG; k++)
        for (int i = 0; i + (1 << k) <= n + 1; i++)
            sp[k][i] = min(sp[k - 1][i], sp[k - 1][i + (1 << (k - 1))]);
    int m;
    scanf("%d", &m);
    while (m--) {
        int l, r;
        scanf("%d %d", &l, &r);
        int a = l - 1, b = r, k = __lg(b - a + 1);
        int lo = min(sp[k][a], sp[k][b - (1 << k) + 1]);
        int unmatched = (P[a] - lo) + (P[b] - lo);
        printf("%d\n", (r - l + 1) - unmatched);
    }
    return 0;
}
`,
      time: 'O(n log n + m)',
      space: 'O(n log n)',
      accepted: true,
      toolkit: ['prefix-sum', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Stack per query', 'প্রতি কোয়েরিতে স্ট্যাক'),
      idea: L('Greedy matching with a counter for each query.', 'প্রতিটি কোয়েরিতে একটি কাউন্টার দিয়ে গ্রিডি মিল।'),
      explain: [L('O(length) per query: 10¹¹ in the worst case, too slow, but it is the definition.', 'প্রতি কোয়েরিতে O(দৈর্ঘ্য): সবচেয়ে খারাপ ক্ষেত্রে ১০¹¹, খুব ধীর, কিন্তু এটিই সংজ্ঞা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    int m;
    cin >> s >> m;
    while (m--) {
        int l, r;
        cin >> l >> r;
        int open = 0, pairs = 0;
        for (int i = l - 1; i < r; i++) {
            if (s[i] == '(') open++;
            else if (open) { open--; pairs++; }
        }
        cout << 2 * pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '())(())(())(\n7\n1 1\n2 3\n1 2\n1 12\n8 12\n5 11\n2 10', output: '0\n0\n2\n10\n4\n6\n6', source: 'sample', note: sample(1) }],
  pitfalls: [L('Merging left and right partial results in the wrong order.', 'বাম আর ডান আংশিক ফল ভুল ক্রমে মেলানো।'), L('Printing pairs instead of 2 · pairs.', '২ · জোড়ার বদলে জোড়া প্রিন্ট।')],
  related: [{ id: '339D', name: 'Xenia and Bit Operations', why: L('Another segment tree with a custom merge.', 'কাস্টম মেলানোসহ আরেকটি সেগমেন্ট ট্রি।') }],
  toolkit: ['functions'],
};

export const p339D: ProblemEntry = {
  id: '339D',
  contestId: 339,
  index: 'D',
  name: 'Xenia and Bit Operations',
  rating: 1700,
  tags: ['data-structures', 'trees'],
  why: L('A segment tree where the operation depends on the level: OR at the bottom, then XOR, then OR…', 'একটি সেগমেন্ট ট্রি যেখানে অপারেশন স্তরের ওপর নির্ভর করে: নিচে OR, তারপর XOR, তারপর OR…'),
  statement: L(
    'A sequence of 2ⁿ numbers is reduced by OR-ing adjacent pairs, then XOR-ing adjacent pairs of the result, alternating until one number v remains. After each of m point updates, print v.',
    '২ⁿ সংখ্যার একটি ক্রম পাশাপাশি জোড়া OR করে, তারপর ফলের পাশাপাশি জোড়া XOR করে, পালাক্রমে একটি সংখ্যা v না থাকা পর্যন্ত ছোট করা হয়। m-টি বিন্দু আপডেটের প্রতিটির পরে v প্রিন্ট করুন।',
  ),
  input: L('n m, the 2ⁿ numbers, then m pairs p b (set a_p = b).', 'n m, ২ⁿ সংখ্যা, তারপর m-টি জোড়া p b (a_p = b করুন)।'),
  output: L('v after each update.', 'প্রতিটি আপডেটের পরে v।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('n ≤ 17, m ≤ 10⁵', 'n ≤ ১৭, m ≤ ১০⁵')] },
  samples: [{ input: '2 4\n1 6 3 5\n1 4\n3 4\n1 2\n1 2', output: '1\n3\n3\n3', explain: L('After a₁ = 4: (4 | 6) ^ (3 | 5) = 6 ^ 7 = 1.', 'a₁ = ৪-এর পরে: (৪ | ৬) ^ (৩ | ৫) = ৬ ^ ৭ = ১।') }],
  observation: L('The reduction is exactly a perfect binary tree over the array. A node at height h (leaves at 0) uses OR if h is odd and XOR if h is even. A point update changes only the n nodes on one leaf-to-root path.', 'সংক্ষেপণটি ঠিক অ্যারের ওপর একটি পূর্ণ বাইনারি ট্রি। উচ্চতা h-এর একটি নোড (পাতা ০-তে) h বিজোড় হলে OR আর জোড় হলে XOR ব্যবহার করে। একটি বিন্দু আপডেট শুধু একটি পাতা-থেকে-মূল পথের n-টি নোড বদলায়।'),
  approach: [L('Array tree with leaves at [2ⁿ, 2ⁿ⁺¹); after an update, walk up recomputing with the right operation.', '[২ⁿ, ২ⁿ⁺¹)-এ পাতাসহ অ্যারে ট্রি; আপডেটের পরে সঠিক অপারেশনে আবার হিসাব করে ওপরে যান।')],
  walkthrough: { input: '4 6 3 5', steps: [{ state: 'height 1: 4|6 = 6, 3|5 = 7', text: L('Height 2: 6 ^ 7 = 1.', 'উচ্চতা ২: ৬ ^ ৭ = ১।') }] },
  complexity: { time: 'O(2ⁿ + m · n)', space: 'O(2ⁿ)', why: L('n levels per update.', 'প্রতি আপডেটে n স্তর।') },
  solutions: [
    {
      id: 'iterative',
      kind: 'optimal',
      title: L('Iterative tree with level parity', 'স্তরের জোড়-বিজোড়সহ পুনরাবৃত্ত ট্রি'),
      idea: L('Track the height while walking up.', 'ওপরে যাওয়ার সময় উচ্চতা রাখা।'),
      explain: [L('With 2ⁿ leaves the heap layout (children 2i, 2i + 1) is a perfect tree, and the height of node i is n − ⌊log₂ i⌋.', '২ⁿ পাতায় হিপ বিন্যাস (সন্তান ২i, ২i + ১) একটি পূর্ণ ট্রি, আর নোড i-এর উচ্চতা n − ⌊log₂ i⌋।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    int N = 1 << n;
    vector<int> tr(2 * N);
    for (int i = 0; i < N; i++) scanf("%d", &tr[N + i]);
    auto pull = [&](int i) {
        int h = n - __lg(i);  // height of node i
        tr[i] = h % 2 ? (tr[2 * i] | tr[2 * i + 1]) : (tr[2 * i] ^ tr[2 * i + 1]);
    };
    for (int i = N - 1; i >= 1; i--) pull(i);
    while (m--) {
        int p, b;
        scanf("%d %d", &p, &b);
        int i = N + p - 1;
        tr[i] = b;
        for (i >>= 1; i >= 1; i >>= 1) pull(i);
        printf("%d\n", tr[1]);
    }
    return 0;
}
`,
      time: 'O(2ⁿ + m · n)',
      space: 'O(2ⁿ)',
      accepted: true,
      toolkit: ['lambda', 'bitwise-and', 'c-io'],
    },
    {
      id: 'recursive',
      kind: 'method',
      title: L('Recursive segment tree', 'রিকার্সিভ সেগমেন্ট ট্রি'),
      idea: L('build/update return whether this level used OR, so the parent uses the other operation.', 'build/update জানায় এই স্তর OR ব্যবহার করেছে কি না, তাই parent অন্য অপারেশন নেয়।'),
      explain: [L('The textbook recursive form. Returning the operation of the child level avoids computing heights explicitly.', 'পাঠ্যবইয়ের রিকার্সিভ রূপ। সন্তান স্তরের অপারেশন ফেরত দিলে উচ্চতা আলাদা হিসাব করতে হয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int N;
vector<int> a, tr;

// returns true if this node was combined with OR
bool build(int v, int l, int r) {
    if (l == r) { tr[v] = a[l]; return false; }
    int mid = (l + r) / 2;
    bool childOr = build(2 * v, l, mid);
    build(2 * v + 1, mid + 1, r);
    tr[v] = childOr ? (tr[2 * v] ^ tr[2 * v + 1]) : (tr[2 * v] | tr[2 * v + 1]);
    return !childOr;
}

bool update(int v, int l, int r, int pos, int val) {
    if (l == r) { tr[v] = val; return false; }
    int mid = (l + r) / 2;
    bool childOr = pos <= mid ? update(2 * v, l, mid, pos, val) : update(2 * v + 1, mid + 1, r, pos, val);
    tr[v] = childOr ? (tr[2 * v] ^ tr[2 * v + 1]) : (tr[2 * v] | tr[2 * v + 1]);
    return !childOr;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    N = 1 << n;
    a.resize(N);
    tr.assign(4 * N, 0);
    for (auto& x : a) scanf("%d", &x);
    build(1, 0, N - 1);
    while (m--) {
        int p, b;
        scanf("%d %d", &p, &b);
        update(1, 0, N - 1, p - 1, b);
        printf("%d\n", tr[1]);
    }
    return 0;
}
`,
      time: 'O(2ⁿ + m · n)',
      space: 'O(2ⁿ)',
      accepted: true,
      toolkit: ['functions', 'bitwise-and'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recompute everything', 'সবকিছু আবার হিসাব'),
      idea: L('Do the full reduction after every update.', 'প্রতিটি আপডেটের পরে পুরো সংক্ষেপণ।'),
      explain: [L('O(2ⁿ) per update, 1.3·10¹⁰ in total for the largest input. It follows the statement literally.', 'প্রতি আপডেটে O(২ⁿ), সবচেয়ে বড় ইনপুটে মোট ১.৩·১০¹⁰। এটি স্টেটমেন্ট আক্ষরিকভাবে মানে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(1 << n);
    for (auto& x : a) cin >> x;
    while (m--) {
        int p, b;
        cin >> p >> b;
        a[p - 1] = b;
        vector<int> cur = a;
        bool useOr = true;
        while (cur.size() > 1) {
            vector<int> nxt;
            for (size_t i = 0; i < cur.size(); i += 2) nxt.push_back(useOr ? cur[i] | cur[i + 1] : cur[i] ^ cur[i + 1]);
            cur = nxt;
            useOr = !useOr;
        }
        cout << cur[0] << "\n";
    }
    return 0;
}
`,
      time: 'O(m · 2ⁿ)',
      space: 'O(2ⁿ)',
      accepted: false,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '2 4\n1 6 3 5\n1 4\n3 4\n1 2\n1 2', output: '1\n3\n3\n3', source: 'sample', note: sample(1) },
    { input: '1 1\n1 2\n2 4', output: '5', source: 'own', note: L('n = 1: just one OR.', 'n = ১: শুধু একটি OR।') },
  ],
  pitfalls: [L('Starting with XOR at the bottom.', 'নিচে XOR দিয়ে শুরু।')],
  related: [{ id: '380C', name: 'Sereja and Brackets', why: L('Segment tree with a custom merge.', 'কাস্টম মেলানোসহ সেগমেন্ট ট্রি।') }],
  toolkit: ['bitwise-and'],
};

export const p1234D: ProblemEntry = {
  id: '1234D',
  contestId: 1234,
  index: 'D',
  name: 'Distinct Characters Queries',
  rating: 1600,
  tags: ['data-structures'],
  why: L('26 letters means 26 small structures: one set (or Fenwick tree) of positions per letter.', '২৬টি অক্ষর মানে ২৬টি ছোট কাঠামো: প্রতি অক্ষরে অবস্থানের একটি set (বা ফেনউইক ট্রি)।'),
  statement: L('A string s and q queries: “1 pos c” sets s[pos] = c; “2 l r” asks for the number of distinct characters in s[l..r].', 'একটি স্ট্রিং s আর q-টি কোয়েরি: “১ pos c” s[pos] = c করে; “২ l r” s[l..r]-এ আলাদা অক্ষরের সংখ্যা জানতে চায়।'),
  input: L('s, q, then the queries.', 's, q, তারপর কোয়েরিগুলো।'),
  output: L('An answer for each type-2 query.', 'প্রতিটি ধরন-২ কোয়েরির উত্তর।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|s|, q ≤ 10⁵', '|s|, q ≤ ১০⁵')] },
  samples: [{ input: 'abacaba\n5\n2 1 4\n1 4 b\n1 5 b\n2 4 6\n2 1 7', output: '3\n1\n2', explain: L('After the updates s = ababbba, and positions 4–6 are “bbb”.', 'আপডেটের পরে s = ababbba, আর ৪–৬ অবস্থান “bbb”।') }],
  observation: L('For each letter keep the sorted set of its positions. Letter c occurs in [l, r] iff the first position ≥ l is ≤ r: one lower_bound. Updates erase and insert one position.', 'প্রতিটি অক্ষরের অবস্থানের সাজানো set রাখুন। অক্ষর c [l, r]-এ আছে ঠিক তখনই যখন l-এর সমান বা বড় প্রথম অবস্থান ≤ r: একটি lower_bound। আপডেট একটি অবস্থান মোছে আর যোগ করে।'),
  approach: [L('26 sets; query = 26 lower_bounds.', '২৬টি set; কোয়েরি = ২৬টি lower_bound।')],
  walkthrough: { input: '2 1 4 on abac', steps: [{ state: 'a at 1, b at 2, c at 4', text: L('3 distinct.', '৩টি আলাদা।') }] },
  complexity: { time: 'O(26 · q log n)', space: 'O(n)', why: L('Each position lives in one set.', 'প্রতিটি অবস্থান একটি set-এ থাকে।') },
  solutions: [
    {
      id: 'sets',
      kind: 'optimal',
      title: L('One set of positions per letter', 'প্রতি অক্ষরে অবস্থানের একটি set'),
      idea: L('lower_bound(l) ≤ r ⇒ the letter is present.', 'lower_bound(l) ≤ r ⇒ অক্ষরটি আছে।'),
      explain: [L('A small alphabet lets you split one hard query into many easy ones; the same trick appears with 26 prefix sums or 26 Fenwick trees.', 'ছোট বর্ণমালা একটি কঠিন কোয়েরিকে অনেক সহজ কোয়েরিতে ভাগ করতে দেয়; একই কৌশল ২৬টি প্রিফিক্স সাম বা ২৬টি ফেনউইক ট্রিতে দেখা যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    int q;
    cin >> s >> q;
    set<int> pos[26];
    for (int i = 0; i < (int)s.size(); i++) pos[s[i] - 'a'].insert(i + 1);
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int p;
            char c;
            cin >> p >> c;
            pos[s[p - 1] - 'a'].erase(p);
            s[p - 1] = c;
            pos[c - 'a'].insert(p);
        } else {
            int l, r, distinct = 0;
            cin >> l >> r;
            for (int c = 0; c < 26; c++) {
                auto it = pos[c].lower_bound(l);
                if (it != pos[c].end() && *it <= r) distinct++;
            }
            cout << distinct << "\n";
        }
    }
    return 0;
}
`,
      time: 'O(26 · q log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set', 'lower-bound', 'io-fast'],
    },
    {
      id: 'fenwick',
      kind: 'method',
      title: L('26 Fenwick trees', '২৬টি ফেনউইক ট্রি'),
      idea: L('bit[c] counts letter c by position; present iff sum(r) − sum(l − 1) > 0.', 'bit[c] অবস্থান ধরে অক্ষর c গোনে; sum(r) − sum(l − ১) > ০ হলে আছে।'),
      explain: [L('Fenwick trees answer “how many in a range” with point updates, which also gives counts, not just presence. Memory is 26 · n ints.', 'ফেনউইক ট্রি বিন্দু আপডেটসহ “একটি পরিসরে কয়টি” উত্তর দেয়, যা শুধু উপস্থিতি নয়, গণনাও দেয়। মেমোরি ২৬ · n-টি int।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> bit[26];

void add(int c, int i, int d) { for (; i <= n; i += i & -i) bit[c][i] += d; }
int sum(int c, int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[c][i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string s;
    int q;
    cin >> s >> q;
    n = s.size();
    for (auto& b : bit) b.assign(n + 1, 0);
    for (int i = 0; i < n; i++) add(s[i] - 'a', i + 1, 1);
    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int p;
            char c;
            cin >> p >> c;
            add(s[p - 1] - 'a', p, -1);
            s[p - 1] = c;
            add(c - 'a', p, 1);
        } else {
            int l, r, distinct = 0;
            cin >> l >> r;
            for (int c = 0; c < 26; c++) if (sum(c, r) - sum(c, l - 1) > 0) distinct++;
            cout << distinct << "\n";
        }
    }
    return 0;
}
`,
      time: 'O(26 · q log n)',
      space: 'O(26 · n)',
      accepted: true,
      toolkit: ['functions', 'bitwise-and'],
    },
  ],
  tests: [{ input: 'abacaba\n5\n2 1 4\n1 4 b\n1 5 b\n2 4 6\n2 1 7', output: '3\n1\n2', source: 'sample', note: sample(1) }],
  pitfalls: [L('Scanning the range for every query: O(n · q).', 'প্রতিটি কোয়েরিতে পরিসর স্ক্যান: O(n · q)।'), L('Forgetting to erase the old letter’s position.', 'পুরোনো অক্ষরের অবস্থান মুছতে ভুলে যাওয়া।')],
  related: [{ id: '380C', name: 'Sereja and Brackets', why: L('Range queries on a string.', 'স্ট্রিংয়ে পরিসর কোয়েরি।') }],
  toolkit: ['set'],
};

export const p1690G: ProblemEntry = {
  id: '1690G',
  contestId: 1690,
  index: 'G',
  name: 'Count the Trains',
  rating: 2000,
  tags: ['binary-search', 'data-structures', 'greedy', 'sortings'],
  why: L('Keep only the “record lows”: an ordered map of train heads that only ever shrinks locally.', 'শুধু “রেকর্ড নিম্ন” রাখুন: ট্রেনের মাথার একটি ক্রমযুক্ত map যা কেবল স্থানীয়ভাবে ছোট হয়।'),
  statement: L(
    'Wagons 1 … n have maximum speeds aᵢ. Each wagon moves at the minimum of its own speed and the speed of the wagon ahead, and wagons with equal speed form one train. m times, aₖ decreases by d; after each change print the number of trains. There are t test cases.',
    'ওয়াগন ১ … n-এর সর্বোচ্চ গতি aᵢ। প্রতিটি ওয়াগন নিজের গতি আর সামনের ওয়াগনের গতির সর্বনিম্নে চলে, আর সমান গতির ওয়াগন একটি ট্রেন। m বার aₖ d কমে; প্রতিটি বদলের পরে ট্রেনের সংখ্যা প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n m, the speeds, and m pairs k d.', 't; প্রতিটি টেস্টে n m, গতিগুলো, আর m-টি জোড়া k d।'),
  output: L('m numbers per test.', 'প্রতি টেস্টে m-টি সংখ্যা।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('Σ n, Σ m ≤ 10⁵', 'Σ n, Σ m ≤ ১০⁵')] },
  samples: [{ input: '3\n\n4 2\n6 2 3 7\n3 2\n4 7\n\n5 4\n10 13 5 2 6\n2 4\n5 2\n1 5\n3 2\n\n13 4\n769 514 336 173 181 373 519 338 985 709 729 702 168\n12 581\n6 222\n7 233\n5 117', output: '3 4\n4 4 2 3\n5 6 6 5', explain: L('First test: speeds become 6 2 1 7 → heads 1, 2, 3; then 6 2 1 0 → 4 heads.', 'প্রথম টেস্ট: গতি হয় ৬ ২ ১ ৭ → মাথা ১, ২, ৩; তারপর ৬ ২ ১ ০ → ৪টি মাথা।') }],
  observation: L('Wagon i starts a train iff aᵢ is smaller than every earlier a: a prefix minimum record. Store the records in an ordered map. When aₖ drops, it becomes a record if it is below the record just before it, and then it deletes every later record that is no longer smaller. Each record is deleted at most once.', 'ওয়াগন i একটি ট্রেন শুরু করে ঠিক তখনই যখন aᵢ আগের প্রতিটি a-এর চেয়ে ছোট: একটি প্রিফিক্স-সর্বনিম্ন রেকর্ড। রেকর্ডগুলো একটি ক্রমযুক্ত map-এ রাখুন। aₖ কমলে, ঠিক আগের রেকর্ডের নিচে হলে এটি রেকর্ড হয়, তারপর পরের যেসব রেকর্ড আর ছোট নয় সেগুলো মোছে। প্রতিটি রেকর্ড সর্বোচ্চ একবার মোছে।'),
  approach: [L('map index → speed for heads; after each update print its size.', 'মাথার জন্য map ইনডেক্স → গতি; প্রতিটি আপডেটের পরে এর আকার প্রিন্ট।')],
  walkthrough: { input: '6 2 3 7, a₃ −= 2', steps: [{ state: 'heads {1:6, 2:2}; a₃ = 1 < 2', text: L('Insert 3; no later head to remove: 3 trains.', '৩ যোগ; পরে মোছার মাথা নেই: ৩টি ট্রেন।') }] },
  complexity: { time: 'O((n + m) log n)', space: 'O(n)', why: L('Amortised: each head is inserted and erased once per update at most.', 'গড়ে: প্রতিটি মাথা প্রতি আপডেটে সর্বোচ্চ একবার যোগ ও মোছা।') },
  solutions: [
    {
      id: 'map',
      kind: 'optimal',
      title: L('Ordered map of prefix-minimum records', 'প্রিফিক্স-সর্বনিম্ন রেকর্ডের ক্রমযুক্ত map'),
      idea: L('Insert the new record, erase dominated records after it.', 'নতুন রেকর্ড যোগ, এর পরের আধিপত্যপ্রাপ্ত রেকর্ড মোছা।'),
      explain: [L('Values only decrease, so a deleted head never returns without being re-inserted by its own update. That amortisation is what makes the while-erase loop cheap overall.', 'মান শুধু কমে, তাই মোছা একটি মাথা নিজের আপডেটে আবার যোগ না হলে ফেরে না। এই গড় হিসাবই while-মোছা লুপকে সামগ্রিকভাবে সস্তা করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n, m;
        scanf("%d %d", &n, &m);
        vector<long long> a(n + 1);
        map<int, long long> heads;
        for (int i = 1; i <= n; i++) {
            scanf("%lld", &a[i]);
            if (heads.empty() || a[i] < prev(heads.end())->second) heads[i] = a[i];
        }
        while (m--) {
            int k;
            long long d;
            scanf("%d %lld", &k, &d);
            a[k] -= d;
            auto it = prev(heads.upper_bound(k));  // record at or before k
            if (it->first == k) it->second = a[k];
            else if (a[k] < it->second) it = heads.emplace(k, a[k]).first;
            else { printf("%d ", (int)heads.size()); continue; }
            auto nx = next(it);
            while (nx != heads.end() && nx->second >= a[k]) nx = heads.erase(nx);
            printf("%d ", (int)heads.size());
        }
        printf("\n");
    }
    return 0;
}
`,
      time: 'O((n + m) log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'lower-bound', 'c-io'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Recount after every update', 'প্রতিটি আপডেটের পরে আবার গোনা'),
      idea: L('Scan the array and count new prefix minima.', 'অ্যারে স্ক্যান করে নতুন প্রিফিক্স সর্বনিম্ন গোনা।'),
      explain: [L('O(n) per update, 10¹⁰ in the worst case, but it is the definition of a train.', 'প্রতি আপডেটে O(n), সবচেয়ে খারাপ ক্ষেত্রে ১০¹⁰, কিন্তু এটিই ট্রেনের সংজ্ঞা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        while (m--) {
            int k;
            long long d;
            cin >> k >> d;
            a[k] -= d;
            int trains = 0;
            long long lo = LLONG_MAX;
            for (int i = 1; i <= n; i++) if (a[i] < lo) { lo = a[i]; trains++; }
            cout << trains << ' ';
        }
        cout << "\n";
    }
    return 0;
}
`,
      time: 'O(n · m)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '3\n\n4 2\n6 2 3 7\n3 2\n4 7\n\n5 4\n10 13 5 2 6\n2 4\n5 2\n1 5\n3 2\n\n13 4\n769 514 336 173 181 373 519 338 985 709 729 702 168\n12 581\n6 222\n7 233\n5 117', output: '3 4\n4 4 2 3\n5 6 6 5', source: 'sample', note: sample(1) }],
  pitfalls: [L('Treating equal speeds as separate trains.', 'সমান গতিকে আলাদা ট্রেন ধরা।'), L('Rescanning the whole array after each update.', 'প্রতিটি আপডেটের পরে পুরো অ্যারে আবার স্ক্যান।')],
  related: [{ id: '1294D', name: 'MEX maximizing', why: L('Maintaining an answer under updates.', 'আপডেটে একটি উত্তর বজায় রাখা।') }],
  toolkit: ['map'],
};

export const p1294D: ProblemEntry = {
  id: '1294D',
  contestId: 1294,
  index: 'D',
  name: 'MEX maximizing',
  rating: 1600,
  tags: ['data-structures', 'greedy', 'implementation', 'math'],
  why: L('Only residues mod x matter; the MEX never decreases, so it can be advanced with a pointer.', 'শুধু x দিয়ে ভাগশেষ গুরুত্বপূর্ণ; MEX কখনো কমে না, তাই একটি পয়েন্টার দিয়ে এগোনো যায়।'),
  statement: L('Numbers arrive one by one. Any element may be changed by adding or subtracting x any number of times (staying ≥ 0). After each arrival, print the maximum possible MEX of the array.', 'সংখ্যা একে একে আসে। যেকোনো উপাদান যতবার খুশি x যোগ বা বিয়োগ করে বদলানো যায় (≥ ০ থেকে)। প্রতিটি আগমনের পরে অ্যারের সর্বোচ্চ সম্ভাব্য MEX প্রিন্ট করুন।'),
  input: L('q x, then q numbers.', 'q x, তারপর q-টি সংখ্যা।'),
  output: L('The maximum MEX after each query.', 'প্রতিটি কোয়েরির পরে সর্বোচ্চ MEX।'),
  limits: { timeSec: 3, memoryMb: 256, notes: [L('q, x ≤ 4·10⁵', 'q, x ≤ ৪·১০⁵')] },
  samples: [
    { input: '7 3\n0\n1\n2\n2\n0\n0\n10', output: '1\n2\n3\n3\n4\n4\n7', explain: L('After 0 1 2 2 0 0 10, values can be 0…6.', '০ ১ ২ ২ ০ ০ ১০-এর পরে মান ০…৬ হতে পারে।') },
    { input: '4 3\n1\n2\n1\n2', output: '0\n0\n0\n0', explain: L('No element can become 0.', 'কোনো উপাদান ০ হতে পারে না।') },
  ],
  observation: L('An element y can become any value ≡ y (mod x). So only cnt[r] (how many have residue r) matters: residue r covers r, r + x, …, r + (cnt[r] − 1)x. The MEX is min over r of r + cnt[r] · x, and it only grows, so advance it while the next value is covered.', 'একটি উপাদান y যেকোনো মান ≡ y (mod x) হতে পারে। তাই শুধু cnt[r] (কয়টির ভাগশেষ r) গুরুত্বপূর্ণ: ভাগশেষ r ঢাকে r, r + x, …, r + (cnt[r] − ১)x। MEX হলো সব r-এর ওপর r + cnt[r] · x-এর সর্বনিম্ন, আর এটি শুধু বাড়ে, তাই পরের মান ঢাকা থাকলে এগোন।'),
  approach: [L('cnt[y % x]++, then while cnt[mex % x] > mex / x: mex++.', 'cnt[y % x]++, তারপর cnt[mex % x] > mex / x হলে mex++।')],
  walkthrough: { input: 'x = 3: 0 1 2', steps: [{ state: 'cnt = 1 1 1', text: L('Covered 0, 1, 2; 3 needs cnt[0] ≥ 2: MEX 3.', '০, ১, ২ ঢাকা; ৩-এর জন্য cnt[০] ≥ ২ লাগে: MEX ৩।') }] },
  complexity: { time: 'O(q + x)', space: 'O(x)', why: L('The MEX pointer moves at most q times in total.', 'MEX পয়েন্টার মোট সর্বোচ্চ q বার সরে।') },
  solutions: [
    {
      id: 'pointer',
      kind: 'optimal',
      title: L('Residue counts + monotone pointer', 'ভাগশেষ গণনা + একমুখী পয়েন্টার'),
      idea: L('Value v is coverable iff cnt[v % x] > v / x.', 'মান v ঢাকা যায় ঠিক তখনই যখন cnt[v % x] > v / x।'),
      explain: [L('An answer that only increases can be maintained with a while loop whose total work is bounded by the final answer (≤ q).', 'যে উত্তর শুধু বাড়ে তা একটি while লুপ দিয়ে বজায় রাখা যায় যার মোট কাজ চূড়ান্ত উত্তর (≤ q) দিয়ে সীমিত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q, x;
    scanf("%d %d", &q, &x);
    vector<int> cnt(x, 0);
    int mex = 0;
    while (q--) {
        int y;
        scanf("%d", &y);
        cnt[y % x]++;
        while (cnt[mex % x] > mex / x) mex++;
        printf("%d\n", mex);
    }
    return 0;
}
`,
      time: 'O(q + x)',
      space: 'O(x)',
      accepted: true,
      toolkit: ['modulo', 'while-n', 'c-io'],
    },
    {
      id: 'set',
      kind: 'method',
      title: L('Set of (count, residue)', '(গণনা, ভাগশেষ)-এর set'),
      idea: L('MEX = min over r of cnt[r] · x + r: keep the pairs (cnt[r], r) in a set and read the smallest.', 'MEX = সব r-এর ওপর cnt[r] · x + r-এর সর্বনিম্ন: (cnt[r], r) জোড়া একটি set-এ রেখে সবচেয়ে ছোটটি পড়ুন।'),
      explain: [L('Ordering by (cnt, r) is the same as ordering by cnt · x + r because r < x. This version works even if elements could also be removed, where the pointer trick would fail.', '(cnt, r) দিয়ে সাজানো আর cnt · x + r দিয়ে সাজানো একই, কারণ r < x। উপাদান সরানো গেলেও এই সংস্করণ চলে, যেখানে পয়েন্টার কৌশল ব্যর্থ হতো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int q, x;
    scanf("%d %d", &q, &x);
    vector<int> cnt(x, 0);
    set<pair<int, int>> s;
    for (int r = 0; r < x; r++) s.insert({0, r});
    while (q--) {
        int y;
        scanf("%d", &y);
        int r = y % x;
        s.erase({cnt[r], r});
        cnt[r]++;
        s.insert({cnt[r], r});
        auto [c, rr] = *s.begin();
        printf("%lld\n", (long long)c * x + rr);
    }
    return 0;
}
`,
      time: 'O((q + x) log x)',
      space: 'O(x)',
      accepted: true,
      toolkit: ['set', 'pair', 'structured-bindings'],
    },
  ],
  tests: [
    { input: '7 3\n0\n1\n2\n2\n0\n0\n10', output: '1\n2\n3\n3\n4\n4\n7', source: 'sample', note: sample(1) },
    { input: '4 3\n1\n2\n1\n2', output: '0\n0\n0\n0', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Storing the actual values instead of residues.', 'ভাগশেষের বদলে আসল মান রাখা।')],
  related: [{ id: '1690G', name: 'Count the Trains', why: L('Answers maintained under updates.', 'আপডেটে বজায় রাখা উত্তর।') }],
  toolkit: ['modulo'],
};

export const p1703F: ProblemEntry = {
  id: '1703F',
  contestId: 1703,
  index: 'F',
  name: 'Yet Another Problem About Pairs Satisfying an Inequality',
  rating: 1300,
  tags: ['binary-search', 'data-structures', 'dp', 'greedy', 'sortings'],
  why: L('A chained inequality splits into a filter (aᵢ < i) and a counting query (i < aⱼ), answered by prefix counts.', 'একটি শৃঙ্খলিত অসমতা একটি ছাঁকনি (aᵢ < i) আর একটি গণনার কোয়েরিতে (i < aⱼ) ভাগ হয়, যার উত্তর প্রিফিক্স গণনা দেয়।'),
  statement: L('Count pairs (i, j) with 1 ≤ i, j ≤ n and aᵢ < i < aⱼ < j. There are t test cases.', '১ ≤ i, j ≤ n আর aᵢ < i < aⱼ < j এমন জোড়া (i, j) গুনুন। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('The number of pairs.', 'জোড়ার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵, 0 ≤ aᵢ ≤ 10⁹', 'Σ n ≤ ২·১০⁵, ০ ≤ aᵢ ≤ ১০⁹')] },
  samples: [{ input: '5\n8\n1 1 2 3 8 2 1 4\n2\n1 2\n10\n0 2 1 6 3 4 1 2 8 3\n2\n1 1000000000\n3\n0 1000000000 2', output: '3\n0\n10\n0\n1', explain: L('First test: (2, 4), (2, 8), (3, 8).', 'প্রথম টেস্ট: (২, ৪), (২, ৮), (৩, ৮)।') }],
  observation: L('Both i and j must be “good” (aₖ < k). For a good j, count good i with i < aⱼ. A prefix count of good indices answers that in O(1).', 'i আর j দুটিকেই “ভালো” (aₖ < k) হতে হবে। একটি ভালো j-এর জন্য i < aⱼ এমন ভালো i গুনুন। ভালো ইনডেক্সের প্রিফিক্স গণনা O(১)-এ তার উত্তর দেয়।'),
  approach: [L('pre[k] = number of good indices ≤ k; for each good j with aⱼ ≥ 1 add pre[aⱼ − 1].', 'pre[k] = k পর্যন্ত ভালো ইনডেক্সের সংখ্যা; aⱼ ≥ ১ এমন প্রতিটি ভালো j-এর জন্য pre[aⱼ − ১] যোগ।')],
  walkthrough: { input: '1 1 2 3 8 2 1 4', steps: [{ state: 'good: 2, 3, 4, 6, 7, 8', text: L('j = 4 (a = 3): good i < 3 → {2}; j = 8 (a = 4): {2, 3}; j = 6, 7 (a = 2, 1): none. Total 3.', 'j = ৪ (a = ৩): ভালো i < ৩ → {২}; j = ৮ (a = ৪): {২, ৩}; j = ৬, ৭ (a = ২, ১): কেউ নয়। মোট ৩।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One prefix array.', 'একটি প্রিফিক্স অ্যারে।') },
  solutions: [
    {
      id: 'prefix',
      kind: 'optimal',
      title: L('Prefix count of good indices', 'ভালো ইনডেক্সের প্রিফিক্স গণনা'),
      idea: L('Split the inequality: filter, then count.', 'অসমতা ভাগ: ছাঁকনি, তারপর গণনা।'),
      explain: [L('aⱼ < j ≤ n keeps every lookup inside the array. Up to n² / 4 pairs: long long.', 'aⱼ < j ≤ n প্রতিটি খোঁজ অ্যারের ভেতরে রাখে। n² / ৪ পর্যন্ত জোড়া: long long।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> a(n + 1);
        vector<int> pre(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            scanf("%lld", &a[i]);
            pre[i] = pre[i - 1] + (a[i] < i);
        }
        long long pairs = 0;
        for (int j = 1; j <= n; j++)
            if (a[j] < j && a[j] >= 1) pairs += pre[a[j] - 1];
        printf("%lld\n", pairs);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'long-long', 'c-io'],
    },
    {
      id: 'binary-search',
      kind: 'method',
      title: L('Sorted good indices + lower_bound', 'সাজানো ভালো ইনডেক্স + lower_bound'),
      idea: L('Collect good indices (already sorted) and count those < aⱼ with lower_bound.', 'ভালো ইনডেক্স জড়ো করে (আগেই সাজানো) lower_bound দিয়ে aⱼ-এর ছোটগুলো গুনুন।'),
      explain: [L('The same split, with binary search instead of a prefix array, which also works when the bound aⱼ could be outside [1, n].', 'একই ভাগ, প্রিফিক্স অ্যারের বদলে বাইনারি সার্চ দিয়ে, যা aⱼ সীমা [১, n]-এর বাইরে হলেও চলে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> a(n + 1);
        vector<long long> good;
        for (int i = 1; i <= n; i++) {
            scanf("%lld", &a[i]);
            if (a[i] < i) good.push_back(i);
        }
        long long pairs = 0;
        for (long long j : good) pairs += lower_bound(good.begin(), good.end(), a[j]) - good.begin();
        printf("%lld\n", pairs);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lower-bound', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Check every pair', 'প্রতিটি জোড়া দেখা'),
      idea: L('Two loops.', 'দুটি লুপ।'),
      explain: [L('O(n²), for checking.', 'যাচাইয়ের জন্য O(n²)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n + 1);
        for (int i = 1; i <= n; i++) cin >> a[i];
        long long pairs = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (a[i] < i && i < a[j] && a[j] < j) pairs++;
        cout << pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '5\n8\n1 1 2 3 8 2 1 4\n2\n1 2\n10\n0 2 1 6 3 4 1 2 8 3\n2\n1 1000000000\n3\n0 1000000000 2', output: '3\n0\n10\n0\n1', source: 'sample', note: sample(1) }],
  pitfalls: [L('Counting pairs with i ≥ j.', 'i ≥ j এমন জোড়া গোনা।'), L('int overflow.', 'int ওভারফ্লো।')],
  related: [{ id: '1324D', name: 'Pair of Topics', why: L('Counting pairs with sorting or binary search.', 'সর্ট বা বাইনারি সার্চে জোড়া গোনা।') }],
  toolkit: ['prefix-sum'],
};
