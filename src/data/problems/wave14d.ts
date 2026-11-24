import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);
const anyAnswer = L('Any valid answer is accepted; CF Forge checks yours with a checker.', 'যেকোনো বৈধ উত্তর গ্রহণযোগ্য; CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।');

const prefixFunction = raw`vector<int> prefixFunction(const string& s) {
    int n = s.size();
    vector<int> pi(n, 0);
    for (int i = 1; i < n; i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) k = pi[k - 1];
        if (s[i] == s[k]) k++;
        pi[i] = k;
    }
    return pi;
}`;

const zFunction = raw`vector<int> zFunction(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    z[0] = n;
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) l = i, r = i + z[i];
    }
    return z;
}`;

export const p126B: ProblemEntry = {
  id: '126B',
  contestId: 126,
  index: 'B',
  name: 'Password',
  rating: 1700,
  tags: ['binary-search', 'dp', 'hashing', 'suffix-structures', 'strings'],
  featuredFor: ['suffix-structures'],
  why: L('Borders of a string (prefix = suffix) come straight out of the prefix function, and so does “occurs inside”.', 'একটি স্ট্রিংয়ের বর্ডার (প্রিফিক্স = সাফিক্স) সরাসরি প্রিফিক্স ফাংশন থেকে আসে, আর “ভেতরে আছে”-ও।'),
  statement: L('Find the longest substring t of s that is a prefix of s, a suffix of s, and also occurs somewhere strictly inside s (neither at the start nor at the end). Print “Just a legend” if none exists.', 's-এর সবচেয়ে লম্বা সাবস্ট্রিং t বের করুন যা s-এর প্রিফিক্স, s-এর সাফিক্স, আর s-এর ভেতরে কোথাও কঠোরভাবে আছে (শুরুতে বা শেষে নয়)। না থাকলে “Just a legend” প্রিন্ট করুন।'),
  input: L('The string s.', 'স্ট্রিং s।'),
  output: L('t, or Just a legend.', 't, অথবা Just a legend।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('|s| ≤ 10⁶', '|s| ≤ ১০⁶')] },
  samples: [
    { input: 'fixprefixsuffix', output: 'fix', explain: L('“fix” starts, ends, and appears in the middle.', '“fix” শুরু করে, শেষ করে, আর মাঝে আসে।') },
    { input: 'abcdabc', output: 'Just a legend', explain: L('“abc” never appears in the middle.', '“abc” মাঝে কখনো আসে না।') },
  ],
  observation: L('With the prefix function π, the longest border has length L = π[n − 1], and the next shorter border is π[L − 1]. A border of length L appears inside iff some π[i] ≥ L for i < n − 1. If L fails, the border π[L − 1] always appears inside (as a suffix of the prefix of length L), so it is the answer if non-zero.', 'প্রিফিক্স ফাংশন π দিয়ে সবচেয়ে লম্বা বর্ডারের দৈর্ঘ্য L = π[n − ১], আর পরের ছোট বর্ডার π[L − ১]। L দৈর্ঘ্যের বর্ডার ভেতরে আসে ঠিক তখনই যখন i < n − ১-এর জন্য কোনো π[i] ≥ L। L ব্যর্থ হলে বর্ডার π[L − ১] সবসময় ভেতরে আসে (L দৈর্ঘ্যের প্রিফিক্সের সাফিক্স হিসেবে), তাই শূন্য না হলে এটি উত্তর।'),
  approach: [L('Compute π; check L against max π[0 … n − 2]; else fall back to π[L − 1].', 'π হিসাব; L-কে max π[০ … n − ২]-এর সঙ্গে মেলান; নইলে π[L − ১]-এ ফিরুন।')],
  walkthrough: { input: 'fixprefixsuffix', steps: [{ state: 'π[n − 1] = 3 (“fix”); π reaches 3 at index 8', text: L('Inside: answer “fix”.', 'ভেতরে: উত্তর “fix”।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One prefix function.', 'একটি প্রিফিক্স ফাংশন।') },
  solutions: [
    {
      id: 'prefix-function',
      kind: 'optimal',
      title: L('Prefix function (KMP)', 'প্রিফিক্স ফাংশন (KMP)'),
      idea: L('Borders are the chain π[n − 1], π[π[n − 1] − 1], …', 'বর্ডারগুলো হলো শৃঙ্খল π[n − ১], π[π[n − ১] − ১], …'),
      explain: [L('π[i] is the length of the longest proper prefix of s[0..i] that is also its suffix. It is the core tool for borders, periods and pattern matching, computed in amortised O(n).', 'π[i] হলো s[০..i]-এর সবচেয়ে লম্বা যথাযথ প্রিফিক্সের দৈর্ঘ্য যা এর সাফিক্সও। এটি বর্ডার, পর্যায় আর প্যাটার্ন মেলানোর মূল হাতিয়ার, গড়ে O(n)-এ হিসাব।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${prefixFunction}

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> pi = prefixFunction(s);
    int L = pi[n - 1];
    int inside = n >= 2 ? *max_element(pi.begin(), pi.end() - 1) : 0;
    if (L > 0 && inside >= L) cout << s.substr(0, L) << "\n";
    else if (L > 0 && pi[L - 1] > 0) cout << s.substr(0, pi[L - 1]) << "\n";
    else cout << "Just a legend\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'vector'],
    },
    {
      id: 'z-function',
      kind: 'method',
      title: L('Z-function', 'Z-ফাংশন'),
      idea: L('Border of length ℓ: a position i = n − ℓ with z[i] = ℓ. Inside: some 0 < j < n − ℓ with z[j] ≥ ℓ.', 'ℓ দৈর্ঘ্যের বর্ডার: z[i] = ℓ এমন অবস্থান i = n − ℓ। ভেতরে: z[j] ≥ ℓ এমন কোনো ০ < j < n − ℓ।'),
      explain: [L('Scan i from left to right while keeping the maximum z seen so far: when i + z[i] = n, the border of length z[i] occurs inside iff that running maximum (over earlier positions) is ≥ z[i]. The first such i gives the longest answer.', 'বাম থেকে ডানে i স্ক্যান করুন আর এ পর্যন্ত দেখা সর্বোচ্চ z রাখুন: i + z[i] = n হলে z[i] দৈর্ঘ্যের বর্ডার ভেতরে আসে ঠিক তখনই যখন সেই চলতি সর্বোচ্চ (আগের অবস্থানে) ≥ z[i]। প্রথম এমন i সবচেয়ে লম্বা উত্তর দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${zFunction}

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> z = zFunction(s);
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (i + z[i] == n && best >= z[i]) {
            cout << s.substr(0, z[i]) << "\n";
            return 0;
        }
        best = max(best, z[i]);
    }
    cout << "Just a legend\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every length', 'প্রতিটি দৈর্ঘ্য চেষ্টা'),
      idea: L('From long to short: check border, then search inside.', 'লম্বা থেকে ছোট: বর্ডার যাচাই, তারপর ভেতরে খোঁজ।'),
      explain: [L('O(n²) with string::find; fine for short strings.', 'string::find দিয়ে O(n²); ছোট স্ট্রিংয়ে ঠিক।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    for (int len = n - 2; len >= 1; len--) {
        if (s.substr(0, len) != s.substr(n - len)) continue;
        size_t pos = s.find(s.substr(0, len), 1);
        if (pos != string::npos && (int)pos + len < n) { cout << s.substr(0, len) << "\n"; return 0; }
    }
    cout << "Just a legend\n";
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: 'fixprefixsuffix', output: 'fix', source: 'sample', note: sample(1) },
    { input: 'abcdabc', output: 'Just a legend', source: 'sample', note: sample(2) },
    { input: 'aaaa', output: 'aa', source: 'own', note: L('Overlapping occurrences.', 'একে অপরকে ছাপিয়ে যাওয়া উপস্থিতি।') },
  ],
  pitfalls: [L('Counting the final suffix itself as an inside occurrence.', 'শেষ সাফিক্সকেই ভেতরের উপস্থিতি গোনা।')],
  related: [{ id: '432D', name: 'Prefixes and Suffixes', why: L('Borders and their occurrences.', 'বর্ডার আর তাদের উপস্থিতি।') }],
  toolkit: ['string-basics'],
};

export const p432D: ProblemEntry = {
  id: '432D',
  contestId: 432,
  index: 'D',
  name: 'Prefixes and Suffixes',
  rating: 2000,
  tags: ['dp', 'suffix-structures', 'strings', 'two-pointers'],
  why: L('Count occurrences of every prefix at once by pushing prefix-function counts down the border tree.', 'বর্ডার ট্রি ধরে প্রিফিক্স-ফাংশন গণনা নিচে পাঠিয়ে প্রতিটি প্রিফিক্সের উপস্থিতি একসঙ্গে গোনা।'),
  statement: L('For every prefix of s that is also a suffix of s, print its length and how many times it occurs in s as a substring.', 's-এর প্রতিটি প্রিফিক্স যা s-এর সাফিক্সও, তার দৈর্ঘ্য আর s-এ সাবস্ট্রিং হিসেবে কতবার আসে তা প্রিন্ট করুন।'),
  input: L('The string s.', 'স্ট্রিং s।'),
  output: L('k, then k lines “length count” in increasing length.', 'k, তারপর বাড়তি দৈর্ঘ্যে k-টি লাইন “দৈর্ঘ্য গণনা”।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 10⁵', '|s| ≤ ১০⁵')] },
  samples: [
    { input: 'ABACABA', output: '3\n1 4\n3 2\n7 1', explain: L('A occurs 4 times, ABA twice, the whole string once.', 'A চারবার, ABA দুবার, পুরো স্ট্রিং একবার।') },
    { input: 'AAA', output: '3\n1 3\n2 2\n3 1', explain: L('Every prefix is a suffix.', 'প্রতিটি প্রিফিক্স একটি সাফিক্স।') },
  ],
  observation: L('cnt[ℓ] = number of positions i with π[i] = ℓ counts occurrences ending somewhere as the longest border; each occurrence of length ℓ also contains the shorter border π[ℓ − 1]. So process ℓ from n down and add cnt[ℓ] into cnt[π[ℓ − 1]]; finally add 1 for the prefix itself.', 'cnt[ℓ] = π[i] = ℓ এমন অবস্থানের সংখ্যা সবচেয়ে লম্বা বর্ডার হিসেবে কোথাও শেষ হওয়া উপস্থিতি গোনে; ℓ দৈর্ঘ্যের প্রতিটি উপস্থিতিতে ছোট বর্ডার π[ℓ − ১]-ও থাকে। তাই ℓ-কে n থেকে নিচে প্রক্রিয়া করে cnt[ℓ]-কে cnt[π[ℓ − ১]]-এ যোগ করুন; শেষে প্রিফিক্সের নিজের জন্য ১ যোগ।'),
  approach: [L('Prefix function, count propagation, list borders along the chain from π[n − 1].', 'প্রিফিক্স ফাংশন, গণনা প্রসারণ, π[n − ১] থেকে শৃঙ্খল ধরে বর্ডার তালিকা।')],
  walkthrough: { input: 'ABACABA', steps: [{ state: 'π = 0 0 1 0 1 2 3; borders 7, 3, 1', text: L('Counts after propagation: 1 → 4, 3 → 2, 7 → 1.', 'প্রসারণের পরে গণনা: ১ → ৪, ৩ → ২, ৭ → ১।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Linear passes.', 'রৈখিক পাস।') },
  solutions: [
    {
      id: 'prefix-function',
      kind: 'optimal',
      title: L('Prefix function + count propagation', 'প্রিফিক্স ফাংশন + গণনা প্রসারণ'),
      idea: L('cnt[π[ℓ − 1]] += cnt[ℓ] from long to short.', 'লম্বা থেকে ছোট cnt[π[ℓ − ১]] += cnt[ℓ]।'),
      explain: [L('The values π form a tree (each length points to its longest border), and counting occurrences is a sum over subtrees of that tree.', 'π-এর মানগুলো একটি ট্রি গঠন করে (প্রতিটি দৈর্ঘ্য তার সবচেয়ে লম্বা বর্ডারের দিকে নির্দেশ করে), আর উপস্থিতি গোনা হলো সেই ট্রির সাবট্রির ওপর যোগফল।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${prefixFunction}

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> pi = prefixFunction(s);
    vector<long long> cnt(n + 1, 0);
    for (int i = 0; i < n; i++) cnt[pi[i]]++;
    for (int l = n; l > 0; l--) cnt[pi[l - 1]] += cnt[l];
    for (int l = 1; l <= n; l++) cnt[l]++;  // the prefix itself
    vector<int> borders;
    for (int l = n; l > 0; l = pi[l - 1]) borders.push_back(l);
    reverse(borders.begin(), borders.end());
    printf("%d\n", (int)borders.size());
    for (int l : borders) printf("%d %lld\n", l, cnt[l]);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'reverse-unique'],
    },
    {
      id: 'z-function',
      kind: 'method',
      title: L('Z-function + suffix counts', 'Z-ফাংশন + সাফিক্স গণনা'),
      idea: L('The prefix of length ℓ occurs at i iff z[i] ≥ ℓ; count with a suffix sum over z values.', 'ℓ দৈর্ঘ্যের প্রিফিক্স i-তে আসে ঠিক তখনই যখন z[i] ≥ ℓ; z মানের ওপর সাফিক্স সাম দিয়ে গোনা।'),
      explain: [L('A border of length ℓ is a position n − ℓ with z = ℓ. Occurrences of the prefix of length ℓ are the positions with z ≥ ℓ, which a histogram of z plus a suffix sum gives in O(1) each.', 'ℓ দৈর্ঘ্যের বর্ডার হলো z = ℓ এমন অবস্থান n − ℓ। ℓ দৈর্ঘ্যের প্রিফিক্সের উপস্থিতি হলো z ≥ ℓ এমন অবস্থান, যা z-এর একটি হিস্টোগ্রাম আর সাফিক্স সাম প্রতিটিতে O(১)-এ দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${zFunction}

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> z = zFunction(s);
    vector<long long> atLeast(n + 2, 0);
    for (int i = 0; i < n; i++) atLeast[z[i]]++;
    for (int l = n - 1; l >= 0; l--) atLeast[l] += atLeast[l + 1];
    vector<int> borders;
    for (int l = 1; l <= n; l++) if (z[n - l] == l) borders.push_back(l);
    printf("%d\n", (int)borders.size());
    for (int l : borders) printf("%d %lld\n", l, atLeast[l]);
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['prefix-sum', 'vector'],
    },
  ],
  tests: [
    { input: 'ABACABA', output: '3\n1 4\n3 2\n7 1', source: 'sample', note: sample(1) },
    { input: 'AAA', output: '3\n1 3\n2 2\n3 1', source: 'sample', note: sample(2) },
    { input: 'AB', output: '1\n2 1', source: 'own', note: L('Only the whole string.', 'শুধু পুরো স্ট্রিং।') },
  ],
  pitfalls: [L('Forgetting to add the occurrence at position 0.', 'অবস্থান ০-এর উপস্থিতি যোগ করতে ভুলে যাওয়া।')],
  related: [{ id: '126B', name: 'Password', why: L('Borders with the prefix function.', 'প্রিফিক্স ফাংশন দিয়ে বর্ডার।') }],
  toolkit: ['vector'],
};

export const p1200E: ProblemEntry = {
  id: '1200E',
  contestId: 1200,
  index: 'E',
  name: 'Compress Words',
  rating: 2000,
  tags: ['brute-force', 'hashing', 'implementation', 'suffix-structures', 'strings'],
  featuredFor: ['hashing'],
  why: L('The longest overlap between the result and the next word, found with KMP on a short window or with hashes.', 'ফল আর পরের শব্দের সবচেয়ে লম্বা মিল, একটি ছোট উইন্ডোতে KMP বা হ্যাশ দিয়ে খোঁজা।'),
  statement: L('Merge n words left to right; when appending a word, delete the longest prefix of it that equals a suffix of the current result.', 'n-টি শব্দ বাম থেকে ডানে মেলান; একটি শব্দ যোগ করার সময় তার সবচেয়ে লম্বা প্রিফিক্স মুছুন যা বর্তমান ফলের একটি সাফিক্সের সমান।'),
  input: L('n, then the words.', 'n, তারপর শব্দগুলো।'),
  output: L('The merged word.', 'মেলানো শব্দ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('Total length ≤ 10⁶', 'মোট দৈর্ঘ্য ≤ ১০⁶')] },
  samples: [
    { input: '5\nI want to order pizza', output: 'Iwantorderpizza', explain: L('“to” and “order” overlap in “o”.', '“to” আর “order” “o”-তে মেলে।') },
    { input: '5\nsample please ease in out', output: 'sampleaseinout', explain: L('Several overlaps.', 'কয়েকটি মিল।') },
  ],
  observation: L('Only the last |w| characters of the result can overlap with the next word w. Build w + “#” + (that suffix) and take the prefix function at the end: it is the longest prefix of w that is a suffix of the result. Total work stays linear.', 'ফলের শুধু শেষ |w|টি অক্ষর পরের শব্দ w-এর সঙ্গে মিলতে পারে। w + “#” + (সেই সাফিক্স) বানিয়ে শেষে প্রিফিক্স ফাংশন নিন: এটি w-এর সবচেয়ে লম্বা প্রিফিক্স যা ফলের সাফিক্স। মোট কাজ রৈখিক থাকে।'),
  approach: [L('For each word, KMP on a window of size 2|w| + 1.', 'প্রতিটি শব্দে ২|w| + ১ আকারের উইন্ডোতে KMP।')],
  walkthrough: { input: 'sample + please', steps: [{ state: 'please#sample → π at the end = 3 (“ple”)', text: L('Append “ase”: samplease.', '“ase” যোগ: samplease।') }] },
  complexity: { time: 'O(total length)', space: 'O(total length)', why: L('Each window is proportional to the new word.', 'প্রতিটি উইন্ডো নতুন শব্দের সমানুপাতিক।') },
  solutions: [
    {
      id: 'kmp',
      kind: 'optimal',
      title: L('Prefix function on word + # + tail', 'শব্দ + # + লেজে প্রিফিক্স ফাংশন'),
      idea: L('The separator stops matches from crossing.', 'বিভাজক মিলকে পার হতে দেয় না।'),
      explain: [L('Concatenating pattern + separator + text is the classic way to reuse the prefix function for “longest prefix of A that is a suffix of B”.', 'প্যাটার্ন + বিভাজক + টেক্সট জোড়া “A-এর সবচেয়ে লম্বা প্রিফিক্স যা B-এর সাফিক্স”-এর জন্য প্রিফিক্স ফাংশন পুনর্ব্যবহারের ক্লাসিক উপায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${prefixFunction}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    string res;
    cin >> res;
    for (int i = 1; i < n; i++) {
        string w;
        cin >> w;
        int len = min(w.size(), res.size());
        string t = w + "#" + res.substr(res.size() - len);
        vector<int> pi = prefixFunction(t);
        res += w.substr(pi.back());
    }
    cout << res << "\n";
    return 0;
}
`,
      time: 'O(total length)',
      space: 'O(total length)',
      accepted: true,
      toolkit: ['string-basics', 'io-fast'],
    },
    {
      id: 'hashing',
      kind: 'method',
      title: L('Rolling hashes', 'রোলিং হ্যাশ'),
      idea: L('Compare the hash of every prefix of w with the hash of the result’s suffix of the same length.', 'w-এর প্রতিটি প্রিফিক্সের হ্যাশকে ফলের একই দৈর্ঘ্যের সাফিক্সের হ্যাশের সঙ্গে তুলনা।'),
      explain: [L('Prefix hashes of the result are kept incrementally as characters are appended, so any suffix hash is O(1). Polynomial hashing compares substrings in O(1) with a tiny error probability; a 64-bit modulus with a random base keeps it negligible.', 'অক্ষর যোগের সঙ্গে ফলের প্রিফিক্স হ্যাশ ধাপে ধাপে রাখা হয়, তাই যেকোনো সাফিক্স হ্যাশ O(১)। বহুপদী হ্যাশিং ক্ষুদ্র ভুলের সম্ভাবনায় O(১)-এ সাবস্ট্রিং তুলনা করে; এলোমেলো ভিত্তিসহ ৬৪-বিট মডুলাস এটিকে নগণ্য রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef unsigned long long ull;
const ull MOD = (1ULL << 61) - 1;

ull mulmod(ull a, ull b) {
    __uint128_t c = (__uint128_t)a * b;
    ull r = (ull)(c & MOD) + (ull)(c >> 61);
    return r >= MOD ? r - MOD : r;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
    const ull B = rng() % (MOD - 1000) + 500;
    int n;
    cin >> n;
    string res;
    vector<ull> h = {0}, pw = {1};
    auto push = [&](char c) {
        res += c;
        h.push_back((mulmod(h.back(), B) + (ull)c) % MOD);
        pw.push_back(mulmod(pw.back(), B));
    };
    auto sub = [&](int l, int r) {  // hash of res[l, r)
        return (h[r] + MOD - mulmod(h[l], pw[r - l])) % MOD;
    };
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        int len = min(w.size(), res.size()), best = 0;
        ull hw = 0;
        for (int k = 1; k <= len; k++) {
            hw = (mulmod(hw, B) + (ull)w[k - 1]) % MOD;
            if (hw == sub(res.size() - k, res.size())) best = k;
        }
        for (size_t k = best; k < w.size(); k++) push(w[k]);
    }
    cout << res << "\n";
    return 0;
}
`,
      time: 'O(total length)',
      space: 'O(total length)',
      accepted: true,
      toolkit: ['lambda', 'string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Compare overlaps directly', 'মিল সরাসরি তুলনা'),
      idea: L('Try every overlap length with substring comparison.', 'সাবস্ট্রিং তুলনা দিয়ে প্রতিটি মিলের দৈর্ঘ্য চেষ্টা।'),
      explain: [L('O(|w|²) per word: correct and simple, too slow for long words.', 'প্রতি শব্দে O(|w|²): সঠিক আর সরল, লম্বা শব্দে খুব ধীর।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    string res;
    cin >> res;
    for (int i = 1; i < n; i++) {
        string w;
        cin >> w;
        int best = 0;
        for (int k = min(w.size(), res.size()); k > 0; k--)
            if (res.compare(res.size() - k, k, w, 0, k) == 0) { best = k; break; }
        res += w.substr(best);
    }
    cout << res << "\n";
    return 0;
}
`,
      time: 'O(Σ |w|²)',
      space: 'O(total length)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [
    { input: '5\nI want to order pizza', output: 'Iwantorderpizza', source: 'sample', note: sample(1) },
    { input: '5\nsample please ease in out', output: 'sampleaseinout', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Running KMP over the whole result each time: O(n²).', 'প্রতিবার পুরো ফলের ওপর KMP: O(n²)।')],
  related: [{ id: '126B', name: 'Password', why: L('Prefix function.', 'প্রিফিক্স ফাংশন।') }],
  toolkit: ['string-basics'],
};

export const p113B: ProblemEntry = {
  id: '113B',
  contestId: 113,
  index: 'B',
  name: 'Petr#',
  rating: 2000,
  tags: ['brute-force', 'data-structures', 'hashing', 'strings'],
  why: L('Counting distinct substrings by hashing each one into a set.', 'প্রতিটি সাবস্ট্রিং একটি set-এ হ্যাশ করে আলাদা সাবস্ট্রিং গোনা।'),
  statement: L('Count the distinct substrings of t that start with s_begin and end with s_end (the two may overlap).', 't-এর এমন আলাদা সাবস্ট্রিং গুনুন যা s_begin দিয়ে শুরু আর s_end দিয়ে শেষ (দুটি একে অপরকে ছাপিয়ে যেতে পারে)।'),
  input: L('t, s_begin, s_end.', 't, s_begin, s_end।'),
  output: L('The number of distinct substrings.', 'আলাদা সাবস্ট্রিংয়ের সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('All lengths ≤ 2000', 'সব দৈর্ঘ্য ≤ ২০০০')] },
  samples: [
    { input: 'round\nro\nou', output: '1', explain: L('“rou”.', '“rou”।') },
    { input: 'codeforces\ncode\nforca', output: '0', explain: L('“forca” never occurs.', '“forca” কখনো আসে না।') },
    { input: 'abababab\na\nb', output: '4', explain: L('ab, abab, ababab, abababab.', 'ab, abab, ababab, abababab।') },
    { input: 'aba\nab\nba', output: '1', explain: L('“aba”, with overlap.', '“aba”, ছাপিয়ে।') },
  ],
  observation: L('Mark positions where s_begin starts and where s_end ends. For every start i and every end j ≥ i with the substring long enough for both, insert the substring hash into a set. There are at most ~2·10⁶ pairs; hashing makes each insertion O(1).', 's_begin যেখানে শুরু আর s_end যেখানে শেষ সেই অবস্থান চিহ্নিত করুন। প্রতিটি শুরু i আর দুটির জন্য যথেষ্ট লম্বা প্রতিটি শেষ j ≥ i-এর জন্য সাবস্ট্রিংয়ের হ্যাশ একটি set-এ রাখুন। সর্বোচ্চ ~২·১০⁶টি জোড়া; হ্যাশিং প্রতিটি সংযোজন O(১) করে।'),
  approach: [L('Prefix hashes with a 2⁶¹ − 1 modulus; collect hashes; sort + unique.', '২⁶¹ − ১ মডুলাসে প্রিফিক্স হ্যাশ; হ্যাশ জড়ো; সর্ট + unique।')],
  walkthrough: { input: 'abababab, a, b', steps: [{ state: 'starts 0, 2, 4, 6; ends 1, 3, 5, 7', text: L('10 pairs but only 4 distinct strings.', '১০টি জোড়া কিন্তু মাত্র ৪টি আলাদা স্ট্রিং।') }] },
  complexity: { time: 'O(n² log n)', space: 'O(n²)', why: L('All pairs, then a sort.', 'সব জোড়া, তারপর একটি সর্ট।') },
  solutions: [
    {
      id: 'hash-set',
      kind: 'optimal',
      title: L('Polynomial hashes, deduplicated', 'বহুপদী হ্যাশ, অনন্য করা'),
      idea: L('Same hash ⇔ same string (with high probability).', 'একই হ্যাশ ⇔ একই স্ট্রিং (উচ্চ সম্ভাবনায়)।'),
      explain: [L('Storing hashes in a vector and sorting is faster than inserting into a set; with modulus 2⁶¹ − 1 collisions among 2·10⁶ values are practically impossible. Hash the pair (hash, length) to separate strings of different lengths.', 'set-এ রাখার চেয়ে vector-এ হ্যাশ রেখে সর্ট দ্রুত; ২⁶¹ − ১ মডুলাসে ২·১০⁶টি মানের মধ্যে সংঘর্ষ কার্যত অসম্ভব। বিভিন্ন দৈর্ঘ্যের স্ট্রিং আলাদা করতে (হ্যাশ, দৈর্ঘ্য) জোড়া হ্যাশ করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

typedef unsigned long long ull;
const ull MOD = (1ULL << 61) - 1;
ull mulmod(ull a, ull b) {
    __uint128_t c = (__uint128_t)a * b;
    ull r = (ull)(c & MOD) + (ull)(c >> 61);
    return r >= MOD ? r - MOD : r;
}

int main() {
    string t, a, b;
    cin >> t >> a >> b;
    int n = t.size(), la = a.size(), lb = b.size();
    vector<bool> st(n, false), en(n, false);
    for (int i = 0; i + la <= n; i++) if (t.compare(i, la, a) == 0) st[i] = true;
    for (int j = lb - 1; j < n; j++) if (t.compare(j - lb + 1, lb, b) == 0) en[j] = true;
    const ull B = 131;
    vector<ull> h(n + 1, 0), pw(n + 1, 1);
    for (int i = 0; i < n; i++) { h[i + 1] = (mulmod(h[i], B) + (ull)t[i]) % MOD; pw[i + 1] = mulmod(pw[i], B); }
    vector<ull> all;
    for (int i = 0; i < n; i++) {
        if (!st[i]) continue;
        for (int j = i + max(la, lb) - 1; j < n; j++)
            if (en[j]) {
                ull v = (h[j + 1] + MOD - mulmod(h[i], pw[j + 1 - i])) % MOD;
                all.push_back(v * 2003 + (j - i + 1));  // mix in the length
            }
    }
    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());
    printf("%d\n", (int)all.size());
    return 0;
}
`,
      time: 'O(n² log n)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['sort', 'reverse-unique', 'string-basics'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Set of actual strings', 'আসল স্ট্রিংয়ের set'),
      idea: L('Insert every valid substring into std::set<string>.', 'প্রতিটি বৈধ সাবস্ট্রিং std::set<string>-এ রাখা।'),
      explain: [L('No collisions possible, but O(n³) work and memory for long strings.', 'কোনো সংঘর্ষ সম্ভব নয়, কিন্তু লম্বা স্ট্রিংয়ে O(n³) কাজ আর মেমোরি।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string t, a, b;
    cin >> t >> a >> b;
    int n = t.size();
    if (n > 300) { cout << "\n"; return 0; }
    set<string> s;
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            string sub = t.substr(i, j - i + 1);
            if (sub.size() >= a.size() && sub.size() >= b.size() && sub.compare(0, a.size(), a) == 0 && sub.compare(sub.size() - b.size(), b.size(), b) == 0) s.insert(sub);
        }
    cout << s.size() << "\n";
    return 0;
}
`,
      time: 'O(n³ log n)',
      space: 'O(n³)',
      accepted: false,
      toolkit: ['set'],
    },
  ],
  tests: [
    { input: 'round\nro\nou', output: '1', source: 'sample', note: sample(1) },
    { input: 'codeforces\ncode\nforca', output: '0', source: 'sample', note: sample(2) },
    { input: 'abababab\na\nb', output: '4', source: 'sample', note: sample(3) },
    { input: 'aba\nab\nba', output: '1', source: 'sample', note: sample(4) },
  ],
  pitfalls: [L('Requiring s_begin and s_end not to overlap.', 's_begin আর s_end-কে ছাপিয়ে না যেতে বলা।'), L('Using a small modulus and getting collisions.', 'ছোট মডুলাস ব্যবহার করে সংঘর্ষ।')],
  related: [{ id: '1200E', name: 'Compress Words', why: L('Rolling hashes.', 'রোলিং হ্যাশ।') }],
  toolkit: ['sort'],
};

export const p1326D2: ProblemEntry = {
  id: '1326D2',
  contestId: 1326,
  index: 'D2',
  name: 'Prefix-Suffix Palindrome (Hard version)',
  rating: 1800,
  tags: ['binary-search', 'greedy', 'hashing', 'suffix-structures', 'strings'],
  why: L('Strip the matching outer layers greedily, then find the longest palindromic prefix or suffix of the middle with KMP.', 'মেলা বাইরের স্তর গ্রিডিভাবে সরিয়ে KMP দিয়ে মাঝের সবচেয়ে লম্বা প্যালিনড্রোমিক প্রিফিক্স বা সাফিক্স খোঁজা।'),
  statement: L('Find the longest palindrome t = a + b where a is a prefix of s, b is a suffix of s, and |a| + |b| ≤ |s|. There are t test cases.', 'সবচেয়ে লম্বা প্যালিনড্রোম t = a + b বের করুন যেখানে a s-এর প্রিফিক্স, b s-এর সাফিক্স, আর |a| + |b| ≤ |s|। t-টি টেস্ট কেস আছে।'),
  input: L('t, then a string per test.', 't, তারপর প্রতিটি টেস্টে একটি স্ট্রিং।'),
  output: L('One palindrome per test.', 'প্রতিটি টেস্টে একটি প্যালিনড্রোম।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ |s| ≤ 10⁶', 'Σ |s| ≤ ১০⁶'), anyAnswer] },
  samples: [{ input: '5\na\nabcdfdcecba\nabbaxyzyx\ncodeforces\nacbba', output: 'a\nabcdfdcba\nxyzyx\nc\nabba', explain: L('abcdfdcecba: outer “abc…cba”, then the palindromic prefix “dfd” of the middle.', 'abcdfdcecba: বাইরে “abc…cba”, তারপর মাঝের প্যালিনড্রোমিক প্রিফিক্স “dfd”।') }],
  observation: L('Let k be the largest number with s[0..k) = reverse(s[n−k..n)) and 2k ≤ n. Taking those outer layers is always optimal. Then t = s[0..k) + P + s[n−k..n), where P is the longest palindrome that is a prefix or a suffix of the middle part m. The longest palindromic prefix of m is π at the end of m + “#” + reverse(m).', 'k হলো সবচেয়ে বড় সংখ্যা যেখানে s[০..k) = reverse(s[n−k..n)) আর ২k ≤ n। সেই বাইরের স্তর নেওয়া সবসময় সেরা। তারপর t = s[০..k) + P + s[n−k..n), যেখানে P হলো মাঝের অংশ m-এর প্রিফিক্স বা সাফিক্স এমন সবচেয়ে লম্বা প্যালিনড্রোম। m-এর সবচেয়ে লম্বা প্যালিনড্রোমিক প্রিফিক্স হলো m + “#” + reverse(m)-এর শেষে π।'),
  approach: [L('Two-pointer strip, then two prefix-function runs.', 'টু-পয়েন্টারে সরানো, তারপর দুটি প্রিফিক্স-ফাংশন চালানো।')],
  walkthrough: { input: 'abbaxyzyx', steps: [{ state: 'k = 0; m = whole string', text: L('Longest palindromic prefix “abba” (4), suffix “xyzyx” (5): take the suffix.', 'সবচেয়ে লম্বা প্যালিনড্রোমিক প্রিফিক্স “abba” (৪), সাফিক্স “xyzyx” (৫): সাফিক্স নিন।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Linear string algorithms.', 'রৈখিক স্ট্রিং অ্যালগরিদম।') },
  solutions: [
    {
      id: 'kmp',
      kind: 'optimal',
      title: L('Greedy strip + KMP palindromic prefix', 'গ্রিডি সরানো + KMP প্যালিনড্রোমিক প্রিফিক্স'),
      idea: L('π of m + # + reverse(m) gives the longest palindromic prefix.', 'm + # + reverse(m)-এর π সবচেয়ে লম্বা প্যালিনড্রোমিক প্রিফিক্স দেয়।'),
      explain: [L('A prefix of m is a palindrome iff it equals the same-length suffix of reverse(m), which is exactly what the prefix function of the concatenation measures.', 'm-এর একটি প্রিফিক্স প্যালিনড্রোম ঠিক তখনই যখন এটি reverse(m)-এর একই দৈর্ঘ্যের সাফিক্সের সমান, যা ঠিক জোড়ার প্রিফিক্স ফাংশন মাপে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

${prefixFunction}

int palPrefix(const string& m) {
    string r(m.rbegin(), m.rend());
    return prefixFunction(m + "#" + r).back();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size(), k = 0;
        while (2 * k + 1 < n && s[k] == s[n - 1 - k]) k++;
        if (2 * k >= n - 1) { cout << s << "\n"; continue; }
        string m = s.substr(k, n - 2 * k);
        string rm(m.rbegin(), m.rend());
        int p = palPrefix(m), q = palPrefix(rm);
        string mid = p >= q ? m.substr(0, p) : m.substr(m.size() - q);
        cout << s.substr(0, k) << mid << s.substr(n - k) << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'io-fast'],
    },
    {
      id: 'manacher',
      kind: 'method',
      title: L('Manacher’s algorithm', 'ম্যানাকারের অ্যালগরিদম'),
      idea: L('Palindrome radii at every centre; a palindrome touching the left (or right) end of m is a palindromic prefix (or suffix).', 'প্রতিটি কেন্দ্রে প্যালিনড্রোম ব্যাসার্ধ; m-এর বাম (বা ডান) প্রান্ত ছোঁয়া প্যালিনড্রোম একটি প্যালিনড্রোমিক প্রিফিক্স (বা সাফিক্স)।'),
      explain: [L('Manacher computes, in O(n), the longest palindrome centred at every position of “#a#b#…#”. Scanning centres finds the longest palindrome that starts at m’s first character or ends at its last.', 'ম্যানাকার O(n)-এ “#a#b#…#”-এর প্রতিটি অবস্থানে কেন্দ্রিক সবচেয়ে লম্বা প্যালিনড্রোম হিসাব করে। কেন্দ্র স্ক্যান করে m-এর প্রথম অক্ষরে শুরু বা শেষ অক্ষরে শেষ হওয়া সবচেয়ে লম্বা প্যালিনড্রোম পাওয়া যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size(), k = 0;
        while (2 * k + 1 < n && s[k] == s[n - 1 - k]) k++;
        if (2 * k >= n - 1) { cout << s << "\n"; continue; }
        string m = s.substr(k, n - 2 * k);
        string u = "#";
        for (char c : m) { u += c; u += '#'; }
        int N = u.size();
        vector<int> d(N, 0);  // radius in u
        for (int i = 0, l = 0, r = -1; i < N; i++) {
            int x = i > r ? 1 : min(d[l + r - i], r - i + 1);
            while (i - x >= 0 && i + x < N && u[i - x] == u[i + x]) x++;
            d[i] = x;
            if (i + x - 1 > r) l = i - x + 1, r = i + x - 1;
        }
        int bestLen = 0, bestStart = 0;
        for (int i = 0; i < N; i++) {
            int len = d[i] - 1;              // palindrome length in m
            int start = (i - d[i] + 1) / 2;  // start index in m
            if (start == 0 && len > bestLen) bestLen = len, bestStart = 0;
            if (start + len == (int)m.size() && len > bestLen) bestLen = len, bestStart = start;
        }
        cout << s.substr(0, k) << m.substr(bestStart, bestLen) << s.substr(n - k) << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'min-max'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Try every prefix and suffix length', 'প্রতিটি প্রিফিক্স আর সাফিক্স দৈর্ঘ্য চেষ্টা'),
      idea: L('All (|a|, |b|) pairs, check palindrome.', 'সব (|a|, |b|) জোড়া, প্যালিনড্রোম যাচাই।'),
      explain: [L('O(n³): small strings only.', 'O(n³): শুধু ছোট স্ট্রিং।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size();
        if (n > 60) { cout << "\n"; continue; }
        string best;
        for (int a = 0; a <= n; a++)
            for (int b = 0; a + b <= n; b++) {
                string c = s.substr(0, a) + s.substr(n - b);
                if (c.size() > best.size() && equal(c.begin(), c.end(), c.rbegin())) best = c;
            }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['string-basics'],
    },
  ],
  tests: [{ input: '5\na\nabcdfdcecba\nabbaxyzyx\ncodeforces\nacbba', output: 'a\nabcdfdcba\nxyzyx\nc\nabba', source: 'sample', note: sample(1) }],
  pitfalls: [L('Not stripping the outer matching layers first.', 'আগে বাইরের মেলা স্তর না সরানো।')],
  related: [{ id: '126B', name: 'Password', why: L('Prefix function tricks.', 'প্রিফিক্স ফাংশনের কৌশল।') }],
  toolkit: ['string-basics'],
};

export const p1312D: ProblemEntry = {
  id: '1312D',
  contestId: 1312,
  index: 'D',
  name: 'Count the Arrays',
  rating: 1700,
  tags: ['combinatorics', 'math'],
  why: L('Build the count from independent choices: which values, which one repeats, and which side each value goes.', 'স্বাধীন বাছাই থেকে গণনা: কোন মান, কোনটি পুনরাবৃত্তি, আর প্রতিটি মান কোন দিকে যায়।'),
  statement: L('Count arrays of length n with values in [1, m] such that exactly one pair of elements is equal, and the array strictly increases up to some peak and strictly decreases after it. Modulo 998244353.', 'n দৈর্ঘ্যের [১, m] মানের এমন অ্যারে গুনুন যেখানে ঠিক একজোড়া উপাদান সমান, আর অ্যারেটি কোনো চূড়া পর্যন্ত কঠোরভাবে বাড়ে আর তারপর কঠোরভাবে কমে। ৯৯৮২৪৪৩৫৩ মডুলো।'),
  input: L('n m.', 'n m।'),
  output: L('The count.', 'গণনা।'),
  limits: { timeSec: 2, memoryMb: 512, notes: [L('2 ≤ n ≤ m ≤ 2·10⁵', '২ ≤ n ≤ m ≤ ২·১০⁵')] },
  samples: [
    { input: '3 4', output: '6', explain: L('[1,2,1], [1,3,1], [1,4,1], [2,3,2], [2,4,2], [3,4,3].', '[১,২,১], [১,৩,১], [১,৪,১], [২,৩,২], [২,৪,২], [৩,৪,৩]।') },
    { input: '3 5', output: '10', explain: L('C(5, 2) · 1 · 1.', 'C(৫, ২) · ১ · ১।') },
    { input: '42 1337', output: '806066790', explain: L('Large values.', 'বড় মান।') },
    { input: '100000 200000', output: '707899035', explain: L('Largest case.', 'সবচেয়ে বড় ক্ষেত্র।') },
  ],
  observation: L('There are n − 1 distinct values: choose them, C(m, n − 1). The maximum is the peak and cannot repeat; choose which of the other n − 2 values repeats (n − 2 ways). Both copies go on opposite sides; each of the remaining n − 3 values goes left or right: 2ⁿ⁻³. Answer C(m, n − 1) · (n − 2) · 2ⁿ⁻³ (0 for n = 2).', 'n − ১টি আলাদা মান: এগুলো বাছুন, C(m, n − ১)। সর্বোচ্চটি চূড়া আর পুনরাবৃত্তি হতে পারে না; বাকি n − ২টি মানের কোনটি পুনরাবৃত্তি তা বাছুন (n − ২ উপায়)। দুটি কপি বিপরীত দিকে যায়; বাকি n − ৩টি মানের প্রতিটি বামে বা ডানে: ২ⁿ⁻³। উত্তর C(m, n − ১) · (n − ২) · ২ⁿ⁻³ (n = ২-এ ০)।'),
  approach: [L('Factorials and inverse factorials mod p.', 'mod p-তে ফ্যাক্টরিয়াল আর ইনভার্স ফ্যাক্টরিয়াল।')],
  walkthrough: { input: '3 4', steps: [{ state: 'C(4, 2) = 6, n − 2 = 1, 2⁰ = 1', text: L('6.', '৬।') }] },
  complexity: { time: 'O(m + log p)', space: 'O(m)', why: L('Factorial tables.', 'ফ্যাক্টরিয়াল টেবিল।') },
  solutions: [
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Product of independent choices', 'স্বাধীন বাছাইয়ের গুণফল'),
      idea: L('Values × repeated value × sides.', 'মান × পুনরাবৃত্ত মান × দিক।'),
      explain: [L('The multiplication principle: describe each array by a sequence of independent decisions that recover it uniquely, then multiply the numbers of options.', 'গুণনের নীতি: প্রতিটি অ্যারেকে স্বাধীন সিদ্ধান্তের একটি ক্রম দিয়ে বর্ণনা করুন যা এটিকে অনন্যভাবে ফিরিয়ে আনে, তারপর বিকল্পের সংখ্যা গুণ করুন।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;
long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e > 0) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    long long n, m;
    cin >> n >> m;
    if (n == 2) { cout << 0 << "\n"; return 0; }
    vector<long long> f(m + 1, 1);
    for (int i = 1; i <= m; i++) f[i] = f[i - 1] * i % MOD;
    long long C = f[m] * power(f[n - 1], MOD - 2) % MOD * power(f[m - n + 1], MOD - 2) % MOD;
    cout << C * ((n - 2) % MOD) % MOD * power(2, n - 3) % MOD << "\n";
    return 0;
}
`,
      time: 'O(m + log p)',
      space: 'O(m)',
      accepted: true,
      toolkit: ['mod-pow', 'mod-arith'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate all arrays', 'সব অ্যারে গণনা'),
      idea: L('mⁿ arrays, test the conditions.', 'mⁿ অ্যারে, শর্ত পরীক্ষা।'),
      explain: [L('Only for tiny n and m, but it checks every factor of the formula.', 'শুধু ক্ষুদ্র n আর m-এ, কিন্তু সূত্রের প্রতিটি গুণক যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int n, m;
long long cnt = 0;
vector<int> a;

void go(int i) {
    if (i == n) {
        map<int, int> c;
        for (int x : a) c[x]++;
        int pairs = 0;
        for (auto& [v, k] : c) { if (k > 2) return; if (k == 2) pairs++; }
        if (pairs != 1) return;
        int p = max_element(a.begin(), a.end()) - a.begin();
        for (int j = 0; j < p; j++) if (a[j] >= a[j + 1]) return;
        for (int j = p; j + 1 < n; j++) if (a[j] <= a[j + 1]) return;
        cnt++;
        return;
    }
    for (int v = 1; v <= m; v++) { a[i] = v; go(i + 1); }
}

int main() {
    cin >> n >> m;
    if (pow(m, n) > 3e6) { cout << "\n"; return 0; }
    a.assign(n, 0);
    go(0);
    cout << cnt % 998244353 << "\n";
    return 0;
}
`,
      time: 'O(mⁿ · n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['functions'],
    },
  ],
  tests: [
    { input: '3 4', output: '6', source: 'sample', note: sample(1) },
    { input: '3 5', output: '10', source: 'sample', note: sample(2) },
    { input: '42 1337', output: '806066790', source: 'sample', note: sample(3) },
    { input: '100000 200000', output: '707899035', source: 'sample', note: sample(4) },
  ],
  pitfalls: [L('Letting the repeated value be the maximum.', 'পুনরাবৃত্ত মানকে সর্বোচ্চ হতে দেওয়া।')],
  related: [{ id: '1288C', name: 'Two Arrays', why: L('Counting with binomials.', 'দ্বিপদ দিয়ে গণনা।') }],
  toolkit: ['mod-pow'],
};

export const p1288C: ProblemEntry = {
  id: '1288C',
  contestId: 1288,
  index: 'C',
  name: 'Two Arrays',
  rating: 1600,
  tags: ['combinatorics', 'dp'],
  why: L('Glue a and reversed b into one non-decreasing sequence of length 2m, then stars and bars.', 'a আর উল্টো b জুড়ে ২m দৈর্ঘ্যের একটি অ-হ্রাসমান ক্রম, তারপর তারা আর দণ্ড।'),
  statement: L('Count pairs of arrays a, b of length m with values in [1, n], a non-decreasing, b non-increasing, and aᵢ ≤ bᵢ for all i. Modulo 10⁹ + 7.', '[১, n] মানের m দৈর্ঘ্যের অ্যারের জোড়া a, b গুনুন যেখানে a অ-হ্রাসমান, b অ-বর্ধমান, আর সব i-এ aᵢ ≤ bᵢ। ১০⁹ + ৭ মডুলো।'),
  input: L('n m.', 'n m।'),
  output: L('The count.', 'গণনা।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('n ≤ 1000, m ≤ 10', 'n ≤ ১০০০, m ≤ ১০')] },
  samples: [
    { input: '2 2', output: '5', explain: L('Five pairs.', 'পাঁচটি জোড়া।') },
    { input: '10 1', output: '55', explain: L('Pairs a ≤ b: C(11, 2).', 'জোড়া a ≤ b: C(১১, ২)।') },
    { input: '723 9', output: '157557417', explain: L('Large.', 'বড়।') },
  ],
  observation: L('a₁ ≤ … ≤ aₘ ≤ bₘ ≤ … ≤ b₁, because aₘ ≤ bₘ is the only cross condition needed. So the pair is one non-decreasing sequence of length 2m over [1, n]: C(n + 2m − 1, 2m).', 'a₁ ≤ … ≤ aₘ ≤ bₘ ≤ … ≤ b₁, কারণ aₘ ≤ bₘ-ই একমাত্র প্রয়োজনীয় আন্তঃশর্ত। তাই জোড়াটি [১, n]-এর ওপর ২m দৈর্ঘ্যের একটি অ-হ্রাসমান ক্রম: C(n + ২m − ১, ২m)।'),
  approach: [L('Pascal’s triangle up to 1020.', '১০২০ পর্যন্ত প্যাসকেলের ত্রিভুজ।')],
  walkthrough: { input: '10 1', steps: [{ state: 'one sequence of length 2 over 10 values', text: L('C(11, 2) = 55.', 'C(১১, ২) = ৫৫।') }] },
  complexity: { time: 'O((n + m)²)', space: 'O((n + m)²)', why: L('A small Pascal table.', 'একটি ছোট প্যাসকেল টেবিল।') },
  solutions: [
    {
      id: 'stars-bars',
      kind: 'optimal',
      title: L('Stars and bars', 'তারা আর দণ্ড'),
      idea: L('Non-decreasing sequences of length k over n values: C(n + k − 1, k).', 'n মানের ওপর k দৈর্ঘ্যের অ-হ্রাসমান ক্রম: C(n + k − ১, k)।'),
      explain: [L('Recognising that several monotone sequences chain into one is the key modelling step; then the standard multiset count applies.', 'কয়েকটি একমুখী ক্রম একটিতে জোড়া লাগে তা চেনাই মূল মডেলিং ধাপ; তারপর প্রচলিত মাল্টিসেট গণনা খাটে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    const long long MOD = 1000000007;
    int N = n + 2 * m;
    vector<vector<long long>> C(N + 1, vector<long long>(2 * m + 1, 0));
    for (int i = 0; i <= N; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= min(i, 2 * m); j++) C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
    cout << C[n + 2 * m - 1][2 * m] << "\n";
    return 0;
}
`,
      time: 'O((n + m) · m)',
      space: 'O((n + m) · m)',
      accepted: true,
      toolkit: ['vector', 'mod-arith'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('DP over the last pair', 'শেষ জোড়ার ওপর DP'),
      idea: L('dp[x][y] = ways with aᵢ = x, bᵢ = y; next pair needs x′ ≥ x, y′ ≤ y, x′ ≤ y′.', 'dp[x][y] = aᵢ = x, bᵢ = y-সহ উপায়; পরের জোড়ায় x′ ≥ x, y′ ≤ y, x′ ≤ y′।'),
      explain: [L('A 2D prefix-sum DP that needs no combinatorial insight: O(m · n²), fast for n ≤ 1000 and m ≤ 10.', 'একটি দ্বিমাত্রিক প্রিফিক্স-সাম DP যাতে কোনো গাণনিক অন্তর্দৃষ্টি লাগে না: O(m · n²), n ≤ ১০০০ আর m ≤ ১০-এ দ্রুত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    const long long MOD = 1000000007;
    vector<vector<long long>> dp(n + 2, vector<long long>(n + 2, 0));
    for (int x = 1; x <= n; x++) for (int y = x; y <= n; y++) dp[x][y] = 1;
    for (int step = 1; step < m; step++) {
        // S[x][y] = sum of dp[x'][y'] with x' <= x and y' >= y
        vector<vector<long long>> S(n + 2, vector<long long>(n + 2, 0)), nd(n + 2, vector<long long>(n + 2, 0));
        for (int x = 1; x <= n; x++)
            for (int y = n; y >= 1; y--)
                S[x][y] = (dp[x][y] + S[x - 1][y] + S[x][y + 1] - S[x - 1][y + 1] + MOD) % MOD;
        for (int x = 1; x <= n; x++) for (int y = x; y <= n; y++) nd[x][y] = S[x][y];
        dp = nd;
    }
    long long total = 0;
    for (int x = 1; x <= n; x++) for (int y = x; y <= n; y++) total = (total + dp[x][y]) % MOD;
    cout << total << "\n";
    return 0;
}
`,
      time: 'O(m · n²)',
      space: 'O(n²)',
      accepted: true,
      toolkit: ['prefix-sum', 'vector'],
    },
  ],
  tests: [
    { input: '2 2', output: '5', source: 'sample', note: sample(1) },
    { input: '10 1', output: '55', source: 'sample', note: sample(2) },
    { input: '723 9', output: '157557417', source: 'sample', note: sample(3) },
  ],
  pitfalls: [L('Requiring aᵢ ≤ bᵢ separately for every i (it follows from aₘ ≤ bₘ).', 'প্রতিটি i-এ আলাদাভাবে aᵢ ≤ bᵢ চাওয়া (এটি aₘ ≤ bₘ থেকেই আসে)।')],
  related: [{ id: '1312D', name: 'Count the Arrays', why: L('Combinatorics.', 'গণনাতত্ত্ব।') }],
  toolkit: ['vector'],
};

export const p1462E1: ProblemEntry = {
  id: '1462E1',
  contestId: 1462,
  index: 'E1',
  name: 'Close Tuples (easy version)',
  rating: 1500,
  tags: ['binary-search', 'combinatorics', 'math', 'sortings', 'two-pointers'],
  why: L('Fix the smallest element and choose the other two from a window: C(k, 2) per element.', 'সবচেয়ে ছোট উপাদান ঠিক করে একটি উইন্ডো থেকে বাকি দুটি বাছা: প্রতি উপাদানে C(k, ২)।'),
  statement: L('Count triples i < j < z with max(aᵢ, aⱼ, a_z) − min(aᵢ, aⱼ, a_z) ≤ 2. There are t test cases.', 'i < j < z এমন ত্রয়ী গুনুন যেখানে max(aᵢ, aⱼ, a_z) − min(aᵢ, aⱼ, a_z) ≤ ২। t-টি টেস্ট কেস আছে।'),
  input: L('t; each test has n and the array (1 ≤ aᵢ ≤ n).', 't; প্রতিটি টেস্টে n আর অ্যারে (১ ≤ aᵢ ≤ n)।'),
  output: L('The number of triples.', 'ত্রয়ীর সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 2·10⁵', 'Σ n ≤ ২·১০⁵')] },
  samples: [{ input: '4\n4\n1 2 4 3\n4\n1 1 1 1\n1\n1\n10\n5 6 1 3 2 9 8 1 2 4', output: '2\n4\n0\n15', explain: L('First test: (1, 2, 3) and (2, 4, 3) by value.', 'প্রথম টেস্ট: মানে (১, ২, ৩) আর (২, ৪, ৩)।') }],
  observation: L('Sort. For each position i taken as the smallest (first in sorted order), let k be how many later elements are ≤ aᵢ + 2. They can be chosen freely: C(k, 2). Each triple is counted once, by its first element in sorted order.', 'সর্ট। প্রতিটি অবস্থান i-কে সবচেয়ে ছোট (সাজানো ক্রমে প্রথম) ধরে k হলো পরের কয়টি উপাদান ≤ aᵢ + ২। এগুলো স্বাধীনভাবে বাছা যায়: C(k, ২)। প্রতিটি ত্রয়ী সাজানো ক্রমে তার প্রথম উপাদান দিয়ে একবার গোনা হয়।'),
  approach: [L('Sort + upper_bound (or two pointers).', 'সর্ট + upper_bound (বা টু পয়েন্টার)।')],
  walkthrough: { input: '1 2 3 4', steps: [{ state: 'i = 0 (1): later ≤ 3 → {2, 3}: C(2, 2) = 1; i = 1 (2): {3, 4}: 1', text: L('Total 2.', 'মোট ২।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('A sort and binary searches.', 'একটি সর্ট আর বাইনারি সার্চ।') },
  solutions: [
    {
      id: 'sorted-window',
      kind: 'optimal',
      title: L('Fix the minimum, choose 2 from the window', 'সর্বনিম্ন ঠিক করে উইন্ডো থেকে ২টি বাছা'),
      idea: L('Σ C(k_i, 2).', 'Σ C(k_i, ২)।'),
      explain: [L('Counting each object exactly once by a canonical representative (here, the first element in sorted order) avoids inclusion–exclusion.', 'প্রতিটি বস্তুকে একটি প্রামাণিক প্রতিনিধি দিয়ে (এখানে, সাজানো ক্রমে প্রথম উপাদান) ঠিক একবার গোনা অন্তর্ভুক্তি–বর্জন এড়ায়।')],
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
        sort(a.begin(), a.end());
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            long long k = upper_bound(a.begin(), a.end(), a[i] + 2) - a.begin() - i - 1;
            ans += k * (k - 1) / 2;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'lower-bound', 'long-long'],
    },
    {
      id: 'counts',
      kind: 'method',
      title: L('Counting by value windows', 'মানের উইন্ডো দিয়ে গণনা'),
      idea: L('Triples inside values {x, x+1, x+2} minus those inside {x+1, x+2}.', '{x, x+১, x+২} মানের ভেতরের ত্রয়ী বিয়োগ {x+১, x+২}-এর ভেতরের।'),
      explain: [L('Small values allow a counting array: C(c_x + c_{x+1} + c_{x+2}, 3) − C(c_{x+1} + c_{x+2}, 3) counts triples whose minimum is exactly x. O(n), no sort.', 'ছোট মান একটি গণনার অ্যারে চালাতে দেয়: C(c_x + c_{x+1} + c_{x+2}, ৩) − C(c_{x+1} + c_{x+2}, ৩) ঠিক x সর্বনিম্নের ত্রয়ী গোনে। O(n), কোনো সর্ট নয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

long long c3(long long k) { return k * (k - 1) * (k - 2) / 6; }

int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        vector<long long> c(n + 3, 0);
        for (int i = 0; i < n; i++) { int a; scanf("%d", &a); c[a]++; }
        long long ans = 0;
        for (int x = 1; x <= n; x++) ans += c3(c[x] + c[x + 1] + c[x + 2]) - c3(c[x + 1] + c[x + 2]);
        printf("%lld\n", ans);
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['functions', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('All triples', 'সব ত্রয়ী'),
      idea: L('Three nested loops.', 'তিনটি নেস্টেড লুপ।'),
      explain: [L('O(n³), for checking.', 'যাচাইয়ের জন্য O(n³)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (auto& x : a) cin >> x;
        long long cnt = 0;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                for (int z = j + 1; z < n; z++)
                    if (max({a[i], a[j], a[z]}) - min({a[i], a[j], a[z]}) <= 2) cnt++;
        cout << cnt << "\n";
    }
    return 0;
}
`,
      time: 'O(n³)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['min-max'],
    },
  ],
  tests: [{ input: '4\n4\n1 2 4 3\n4\n1 1 1 1\n1\n1\n10\n5 6 1 3 2 9 8 1 2 4', output: '2\n4\n0\n15', source: 'sample', note: sample(1) }],
  pitfalls: [L('Double counting triples with equal values.', 'সমান মানের ত্রয়ী দুবার গোনা।')],
  related: [{ id: '1475E', name: 'Advertising Agency', why: L('Binomials over sorted data.', 'সাজানো ডেটায় দ্বিপদ।') }],
  toolkit: ['sort'],
};

export const p300C: ProblemEntry = {
  id: '300C',
  contestId: 300,
  index: 'C',
  name: 'Beautiful Numbers',
  rating: 1800,
  tags: ['brute-force', 'combinatorics'],
  why: L('The digit sum depends only on how many a’s there are: loop over that count and add C(n, i).', 'অঙ্কের যোগফল শুধু কয়টি a আছে তার ওপর নির্ভর করে: সেই সংখ্যার ওপর লুপ চালিয়ে C(n, i) যোগ।'),
  statement: L('A number is good if all its digits are a or b. It is excellent if it is good and its digit sum is also good. Count excellent numbers of exactly n digits, modulo 10⁹ + 7.', 'একটি সংখ্যা ভালো যদি এর সব অঙ্ক a বা b হয়। এটি চমৎকার যদি এটি ভালো আর এর অঙ্কের যোগফলও ভালো। ঠিক n অঙ্কের চমৎকার সংখ্যা ১০⁹ + ৭ মডুলো গুনুন।'),
  input: L('a b n.', 'a b n।'),
  output: L('The count.', 'গণনা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ a < b ≤ 9, n ≤ 10⁶', '১ ≤ a < b ≤ ৯, n ≤ ১০⁶')] },
  samples: [
    { input: '1 3 3', output: '1', explain: L('Only 111 (sum 3).', 'শুধু ১১১ (যোগফল ৩)।') },
    { input: '2 3 10', output: '165', explain: L('Sums that are themselves made of 2s and 3s.', 'যোগফল যা নিজেই ২ আর ৩ দিয়ে তৈরি।') },
  ],
  observation: L('With i digits equal to a, the sum is i · a + (n − i) · b and there are C(n, i) such numbers. Loop i = 0 … n, test the sum’s digits, add C(n, i).', 'i-টি অঙ্ক a-এর সমান হলে যোগফল i · a + (n − i) · b আর এমন সংখ্যা C(n, i)টি। i = ০ … n লুপ চালিয়ে যোগফলের অঙ্ক পরীক্ষা করে C(n, i) যোগ।'),
  approach: [L('Factorials + inverse factorials up to n.', 'n পর্যন্ত ফ্যাক্টরিয়াল + ইনভার্স ফ্যাক্টরিয়াল।')],
  walkthrough: { input: '1 3 3', steps: [{ state: 'i = 3 → sum 3 (good): C(3, 3) = 1; other i give 5, 7, 9', text: L('Answer 1.', 'উত্তর ১।') }] },
  complexity: { time: 'O(n log)', space: 'O(n)', why: L('n binomials and digit checks.', 'n-টি দ্বিপদ আর অঙ্ক যাচাই।') },
  solutions: [
    {
      id: 'factorials',
      kind: 'optimal',
      title: L('Factorial tables', 'ফ্যাক্টরিয়াল টেবিল'),
      idea: L('C(n, i) = n! / (i! (n − i)!).', 'C(n, i) = n! / (i! (n − i)!)।'),
      explain: [L('Inverse factorials are computed backwards from inv(n!) with one fast power, then every binomial is O(1).', 'ইনভার্স ফ্যাক্টরিয়াল একটি দ্রুত পাওয়ার দিয়ে inv(n!) থেকে পেছনে হিসাব, তারপর প্রতিটি দ্বিপদ O(১)।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007;
long long power(long long b, long long e) {
    long long r = 1;
    b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

int main() {
    int a, b, n;
    cin >> a >> b >> n;
    vector<long long> f(n + 1, 1), inv(n + 1, 1);
    for (int i = 1; i <= n; i++) f[i] = f[i - 1] * i % MOD;
    inv[n] = power(f[n], MOD - 2);
    for (int i = n; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
    auto good = [&](long long s) {
        for (; s; s /= 10) if (s % 10 != a && s % 10 != b) return false;
        return true;
    };
    long long ans = 0;
    for (int i = 0; i <= n; i++)
        if (good((long long)i * a + (long long)(n - i) * b)) ans = (ans + f[n] * inv[i] % MOD * inv[n - i]) % MOD;
    cout << ans << "\n";
    return 0;
}
`,
      time: 'O(n log)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['mod-pow', 'lambda'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Enumerate all good numbers', 'সব ভালো সংখ্যা গণনা'),
      idea: L('2ⁿ choices of digits.', 'অঙ্কের ২ⁿ বিকল্প।'),
      explain: [L('Exponential: checks the counting argument on small n.', 'সূচকীয়: ছোট n-এ গণনার যুক্তি যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b, n;
    cin >> a >> b >> n;
    if (n > 20) { cout << "\n"; return 0; }
    long long cnt = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        long long s = 0;
        for (int i = 0; i < n; i++) s += mask >> i & 1 ? a : b;
        bool ok = true;
        for (; s; s /= 10) if (s % 10 != a && s % 10 != b) ok = false;
        if (ok) cnt++;
    }
    cout << cnt % 1000000007 << "\n";
    return 0;
}
`,
      time: 'O(2ⁿ · n)',
      space: 'O(1)',
      accepted: false,
      toolkit: ['bit-shift'],
    },
  ],
  tests: [
    { input: '1 3 3', output: '1', source: 'sample', note: sample(1) },
    { input: '2 3 10', output: '165', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Recomputing each binomial with a loop: O(n²).', 'প্রতিটি দ্বিপদ লুপে আবার হিসাব: O(n²)।')],
  related: [{ id: '1312D', name: 'Count the Arrays', why: L('Factorials mod p.', 'mod p-তে ফ্যাক্টরিয়াল।') }],
  toolkit: ['mod-pow'],
};

export const p1182E: ProblemEntry = {
  id: '1182E',
  contestId: 1182,
  index: 'E',
  name: 'Product Oriented Recurrence',
  rating: 2300,
  tags: ['dp', 'math', 'matrices', 'number-theory'],
  why: L('Turn a product recurrence into an additive recurrence on exponents, then use a 3 × 3 matrix modulo p − 1.', 'একটি গুণফলের পুনরাবৃত্তিকে সূচকের ওপর যোজনীয় পুনরাবৃত্তিতে বদলে p − ১ মডুলো একটি ৩ × ৩ ম্যাট্রিক্স।'),
  statement: L('f_x = c^(2x − 6) · f_{x−1} · f_{x−2} · f_{x−3} for x ≥ 4. Given n, f₁, f₂, f₃ and c, find fₙ modulo 10⁹ + 7.', 'x ≥ ৪-এর জন্য f_x = c^(২x − ৬) · f_{x−১} · f_{x−২} · f_{x−৩}। n, f₁, f₂, f₃ আর c দেওয়া, fₙ ১০⁹ + ৭ মডুলো বের করুন।'),
  input: L('n f₁ f₂ f₃ c.', 'n f₁ f₂ f₃ c।'),
  output: L('fₙ mod 10⁹ + 7.', 'fₙ mod ১০⁹ + ৭।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('4 ≤ n ≤ 10¹⁸, values ≤ 10⁹', '৪ ≤ n ≤ ১০¹⁸, মান ≤ ১০⁹')] },
  samples: [
    { input: '5 1 2 5 3', output: '72900', explain: L('f₄ = 90, f₅ = 72900.', 'f₄ = ৯০, f₅ = ৭২৯০০।') },
    { input: '17 97 41 37 11', output: '317451037', explain: L('Large n.', 'বড় n।') },
  ],
  observation: L('Let g_x = c^x · f_x. Then g_x = g_{x−1} g_{x−2} g_{x−3} exactly. So gₙ = g₁^A g₂^B g₃^C where (A, B, C) follow the tribonacci recurrence; compute them with a 3 × 3 matrix power modulo p − 1 (Fermat). Finally fₙ = gₙ · c^(−n).', 'g_x = c^x · f_x ধরুন। তখন g_x = g_{x−১} g_{x−২} g_{x−৩} নিখুঁতভাবে। তাই gₙ = g₁^A g₂^B g₃^C যেখানে (A, B, C) ট্রিবোনাচি পুনরাবৃত্তি মানে; p − ১ মডুলো (ফার্মা) একটি ৩ × ৩ ম্যাট্রিক্স ঘাতে এগুলো হিসাব করুন। শেষে fₙ = gₙ · c^(−n)।'),
  approach: [L('Exponents via matrix power, then three fast powers and an inverse.', 'ম্যাট্রিক্স ঘাতে সূচক, তারপর তিনটি দ্রুত পাওয়ার আর একটি ইনভার্স।')],
  walkthrough: { input: '5 1 2 5 3', steps: [{ state: 'g = 3, 18, 135, g₄ = 7290, g₅ = 17714700', text: L('f₅ = g₅ / 3⁵ = 72900.', 'f₅ = g₅ / ৩⁵ = ৭২৯০০।') }] },
  complexity: { time: 'O(27 log n)', space: 'O(1)', why: L('A 3 × 3 matrix power.', 'একটি ৩ × ৩ ম্যাট্রিক্স ঘাত।') },
  solutions: [
    {
      id: 'exponents',
      kind: 'optimal',
      title: L('Exponent matrix modulo p − 1', 'p − ১ মডুলো সূচকের ম্যাট্রিক্স'),
      idea: L('Products ↔ sums of exponents; exponents live modulo p − 1.', 'গুণফল ↔ সূচকের যোগফল; সূচক p − ১ মডুলোতে থাকে।'),
      explain: [L('By Fermat’s little theorem, xᵉ ≡ x^(e mod (p − 1)) for x not divisible by p, so exponent recurrences are reduced modulo p − 1, not p. The trick g_x = c^x f_x removes the extra c factor.', 'ফার্মার ছোট উপপাদ্য অনুযায়ী p দিয়ে বিভাজ্য নয় এমন x-এ xᵉ ≡ x^(e mod (p − ১)), তাই সূচকের পুনরাবৃত্তি p নয়, p − ১ মডুলো ছোট করা হয়। কৌশল g_x = c^x f_x বাড়তি c গুণক সরায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long P = 1000000007, Q = P - 1;
typedef array<array<long long, 3>, 3> M3;

M3 mul(const M3& a, const M3& b) {
    M3 c{};
    for (int i = 0; i < 3; i++)
        for (int k = 0; k < 3; k++)
            for (int j = 0; j < 3; j++) c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % Q;
    return c;
}

long long power(long long b, long long e) {
    long long r = 1;
    b %= P;
    while (e) { if (e & 1) r = r * b % P; b = b * b % P; e >>= 1; }
    return r;
}

int main() {
    long long n, f1, f2, f3, c;
    cin >> n >> f1 >> f2 >> f3 >> c;
    M3 T = {{{1, 1, 1}, {1, 0, 0}, {0, 1, 0}}}, R = {{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}};
    for (long long e = n - 3; e; e >>= 1, T = mul(T, T)) if (e & 1) R = mul(R, T);
    // (e_n, e_{n-1}, e_{n-2}) = R · (e_3, e_2, e_1): exponents of g3, g2, g1 in g_n
    long long A = R[0][0], B = R[0][1], C = R[0][2];
    long long g3 = power(c, 3) * f3 % P, g2 = power(c, 2) * f2 % P, g1 = c % P * f1 % P;
    long long gn = power(g3, A) * power(g2, B) % P * power(g1, C) % P;
    long long cn = power(c, n % Q);
    cout << gn * power(cn, P - 2) % P << "\n";
    return 0;
}
`,
      time: 'O(log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['mod-pow', 'long-long'],
    },
    {
      id: 'brute',
      kind: 'brute',
      title: L('Direct recurrence', 'সরাসরি পুনরাবৃত্তি'),
      idea: L('Compute f₄ … fₙ modulo p.', 'p মডুলো f₄ … fₙ হিসাব।'),
      explain: [L('O(n log n): only small n, but it applies the definition literally.', 'O(n log n): শুধু ছোট n, কিন্তু সংজ্ঞাটি আক্ষরিকভাবে প্রয়োগ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

const long long P = 1000000007;
long long power(long long b, long long e) {
    long long r = 1;
    b %= P;
    while (e) { if (e & 1) r = r * b % P; b = b * b % P; e >>= 1; }
    return r;
}

int main() {
    long long n, f1, f2, f3, c;
    cin >> n >> f1 >> f2 >> f3 >> c;
    if (n > 1000000) { cout << "\n"; return 0; }
    vector<long long> f = {0, f1 % P, f2 % P, f3 % P};
    for (long long x = 4; x <= n; x++) f.push_back(power(c, 2 * x - 6) * f[x - 1] % P * f[x - 2] % P * f[x - 3] % P);
    cout << f[n] << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: false,
      toolkit: ['mod-pow'],
    },
  ],
  tests: [
    { input: '5 1 2 5 3', output: '72900', source: 'sample', note: sample(1) },
    { input: '17 97 41 37 11', output: '317451037', source: 'sample', note: sample(2) },
  ],
  pitfalls: [L('Reducing exponents modulo p instead of p − 1.', 'সূচক p − ১-এর বদলে p মডুলো ছোট করা।')],
  related: [{ id: '1117D', name: 'Magic Gems', why: L('Matrix exponentiation.', 'ম্যাট্রিক্স সূচক।') }],
  toolkit: ['mod-pow'],
};
