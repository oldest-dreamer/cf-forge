import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const hashingGuide: TagGuide = {
  slug: 'hashing',
  intro: [
    L('Hashing turns a string (or any object) into a number so that equal objects get equal numbers and different ones almost certainly get different numbers. A polynomial rolling hash lets you get the hash of any substring in O(1) after O(n) preprocessing.',
      'হ্যাশিং একটি স্ট্রিংকে (বা যেকোনো জিনিসকে) একটি সংখ্যায় রূপান্তর করে, যাতে সমান জিনিস সমান সংখ্যা পায় আর আলাদাগুলো প্রায় নিশ্চিতভাবে আলাদা সংখ্যা পায়। পলিনোমিয়াল রোলিং হ্যাশ O(n) প্রস্তুতির পর যেকোনো সাবস্ট্রিংয়ের হ্যাশ O(১)-এ দেয়।'),
    L('Comparing two substrings then costs O(1) instead of O(length). Use a random base and a large modulus (or two moduli) so that anti-hash tests cannot break you.',
      'তখন দুটি সাবস্ট্রিং তুলনায় O(দৈর্ঘ্য)-এর বদলে O(১) লাগে। এলোমেলো ভিত্তি আর বড় মডুলাস (বা দুটি মডুলাস) ব্যবহার করো, যাতে অ্যান্টি-হ্যাশ টেস্ট তোমাকে ভাঙতে না পারে।'),
  ],
  recognize: [
    L('Many substring comparisons, “number of distinct substrings with a property”.', 'অনেক সাবস্ট্রিং তুলনা, “একটি গুণসহ ভিন্ন সাবস্ট্রিংয়ের সংখ্যা”।'),
    L('Longest overlap between a suffix and a prefix.', 'একটি সাফিক্স আর একটি প্রিফিক্সের সবচেয়ে লম্বা মিল।'),
  ],
  patterns: [
    {
      name: L('Prefix hashes', 'প্রিফিক্স হ্যাশ'),
      explain: [
        L('h[i + 1] = h[i] · B + s[i]. The hash of s[l..r) is h[r] − h[l] · Bʳ⁻ˡ. Two substrings are (almost surely) equal when their hashes match.',
          'h[i + ১] = h[i] · B + s[i]। s[l..r)-এর হ্যাশ হলো h[r] − h[l] · Bʳ⁻ˡ। দুটি সাবস্ট্রিংয়ের হ্যাশ মিললে তারা (প্রায় নিশ্চিতভাবে) সমান।'),
      ],
      code: raw`const unsigned long long M = (1ULL << 61) - 1;
unsigned long long mulmod(unsigned long long a, unsigned long long b) { return (__uint128_t)a * b % M; }
vector<unsigned long long> h(n + 1, 0), pw(n + 1, 1);
for (int i = 0; i < n; i++) { h[i + 1] = (mulmod(h[i], B) + s[i]) % M; pw[i + 1] = mulmod(pw[i], B); }
auto get = [&](int l, int r) { return (h[r] + M - mulmod(h[l], pw[r - l])) % M; };`,
      example: { problem: '271D', text: L('Good Substrings: insert the hash of every substring with at most k bad letters into a set; its size is the answer.', 'Good Substrings: সর্বোচ্চ k খারাপ অক্ষরসহ প্রতিটি সাবস্ট্রিংয়ের হ্যাশ একটি set-এ ঢোকাও; এর আকারই উত্তর।') },
    },
    {
      name: L('Longest suffix that is a prefix', 'প্রিফিক্সও এমন সবচেয়ে লম্বা সাফিক্স'),
      explain: [
        L('When merging words, find the longest suffix of the current text equal to a prefix of the next word. Compare hashes for each length from long to short; only the last |word| characters of the text matter, so the total stays linear.',
          'শব্দ মেলানোর সময় বর্তমান টেক্সটের সবচেয়ে লম্বা সাফিক্স খোঁজো যা পরের শব্দের প্রিফিক্সের সমান। লম্বা থেকে ছোট প্রতিটি দৈর্ঘ্যের জন্য হ্যাশ তুলনা করো; টেক্সটের শুধু শেষ |word| অক্ষর গুরুত্বপূর্ণ, তাই মোট রৈখিক থাকে।'),
      ],
      code: raw`int k = min(text.size(), word.size());
for (int len = k; len >= 0; len--)
    if (suffixHash(text, len) == prefixHash(word, len)) { text += word.substr(len); break; }`,
      example: { problem: '1200E', text: L('Compress Words: merge each word, dropping the longest overlap with the end of the text.', 'Compress Words: প্রতিটি শব্দ মেলাও, টেক্সটের শেষের সঙ্গে সবচেয়ে লম্বা মিলটুকু বাদ দিয়ে।') },
    },
  ],
  mistakes: [
    L('A fixed, well-known base with modulus 2⁶⁴: there are known tests that break it.', 'মডুলাস ২⁶⁴ সহ নির্দিষ্ট, পরিচিত ভিত্তি: একে ভাঙার জানা টেস্ট আছে।'),
    L('Negative values after subtraction: add M before taking % M.', 'বিয়োগের পর ঋণাত্মক মান: % M নেওয়ার আগে M যোগ করো।'),
  ],
  plan: [
    L('Write a hashing struct with a random base and test it against direct comparison.', 'এলোমেলো ভিত্তিসহ একটি হ্যাশিং struct লিখে সরাসরি তুলনার সঙ্গে মেলাও।'),
    L('Solve 5 string problems with hashing, then learn the prefix function for exact alternatives.', 'হ্যাশিং দিয়ে ৫টি স্ট্রিং প্রবলেম করো, তারপর নিখুঁত বিকল্প হিসেবে প্রিফিক্স ফাংশন শেখো।'),
  ],
};

export const suffixStructuresGuide: TagGuide = {
  slug: 'suffix-structures',
  intro: [
    L('Suffix structures (suffix arrays, suffix automata, and the closely related prefix function and Z-function) answer questions about all substrings of a string at once: how often a pattern occurs, which prefixes are also suffixes, how many distinct substrings exist.',
      'সাফিক্স স্ট্রাকচার (সাফিক্স অ্যারে, সাফিক্স অটোমাটা, আর ঘনিষ্ঠ প্রিফিক্স ফাংশন ও Z-ফাংশন) একটি স্ট্রিংয়ের সব সাবস্ট্রিং নিয়ে একসঙ্গে প্রশ্নের উত্তর দেয়: একটি প্যাটার্ন কতবার আসে, কোন প্রিফিক্স সাফিক্সও, কতগুলো ভিন্ন সাবস্ট্রিং আছে।'),
    L('Start with the prefix function: π[i] is the length of the longest proper prefix of s[0..i] that is also its suffix. It is about ten lines and solves many problems that look like they need heavier tools.',
      'প্রিফিক্স ফাংশন দিয়ে শুরু করো: π[i] হলো s[0..i]-এর সবচেয়ে লম্বা প্রকৃত প্রিফিক্সের দৈর্ঘ্য যা এর সাফিক্সও। এটি প্রায় দশ লাইনের, আর ভারী হাতিয়ার লাগবে মনে হওয়া অনেক প্রবলেম সমাধান করে।'),
  ],
  recognize: [
    L('“Prefix that is also a suffix”, “occurrences of every prefix”.', '“এমন প্রিফিক্স যা সাফিক্সও”, “প্রতিটি প্রিফিক্সের উপস্থিতি”।'),
    L('Distinct substrings, longest repeated substring.', 'ভিন্ন সাবস্ট্রিং, সবচেয়ে লম্বা পুনরাবৃত্ত সাবস্ট্রিং।'),
  ],
  patterns: [
    {
      name: L('Prefix function', 'প্রিফিক্স ফাংশন'),
      explain: [
        L('Extend the previous border if the next character matches; otherwise fall back through shorter borders π[j − 1]. Amortised, the whole array takes O(n).',
          'পরের অক্ষর মিললে আগের বর্ডার বাড়াও; না হলে ছোট বর্ডার π[j − ১] ধরে পিছিয়ে যাও। গড়ে পুরো অ্যারে O(n)-এ হয়।'),
      ],
      code: raw`vector<int> pi(n, 0);
for (int i = 1; i < n; i++) {
    int j = pi[i - 1];
    while (j > 0 && s[i] != s[j]) j = pi[j - 1];
    if (s[i] == s[j]) j++;
    pi[i] = j;
}`,
      example: { problem: '126B', text: L('Password: find the longest substring that is a prefix, a suffix, and also appears in the middle; walk the chain of borders of the whole string.', 'Password: এমন সবচেয়ে লম্বা সাবস্ট্রিং খোঁজো যা প্রিফিক্স, সাফিক্স, আর মাঝেও আছে; পুরো স্ট্রিংয়ের বর্ডারের শৃঙ্খল ধরে চলো।') },
    },
    {
      name: L('Count occurrences of every prefix', 'প্রতিটি প্রিফিক্সের উপস্থিতি গোনা'),
      explain: [
        L('Every position i ends an occurrence of the prefix of length π[i], and of every shorter border. Count cnt[π[i]]++, then push counts down: cnt[π[len − 1]] += cnt[len] from long to short, and add 1 for each prefix itself.',
          'প্রতিটি অবস্থান i দৈর্ঘ্য π[i]-এর প্রিফিক্সের একটি উপস্থিতি শেষ করে, আর প্রতিটি ছোট বর্ডারেরও। cnt[π[i]]++ গুনো, তারপর লম্বা থেকে ছোট গণনা নিচে নামাও: cnt[π[len − ১]] += cnt[len], আর প্রতিটি প্রিফিক্সের নিজের জন্য ১ যোগ করো।'),
      ],
      code: raw`vector<int> cnt(n + 1, 0);
for (int i = 0; i < n; i++) cnt[pi[i]]++;
for (int len = n; len > 0; len--) cnt[pi[len - 1]] += cnt[len];
for (int len = 1; len <= n; len++) cnt[len]++;`,
      example: { problem: '432D', text: L('Prefixes and Suffixes: for every prefix that is also a suffix, print how many times it occurs.', 'Prefixes and Suffixes: সাফিক্সও এমন প্রতিটি প্রিফিক্সের জন্য প্রিন্ট করো এটি কতবার আসে।') },
    },
  ],
  mistakes: [
    L('Confusing the prefix function (borders) with the Z-function (matches with the whole prefix at each start).', 'প্রিফিক্স ফাংশন (বর্ডার) আর Z-ফাংশন (প্রতিটি শুরুতে পুরো প্রিফিক্সের সঙ্গে মিল) গুলিয়ে ফেলা।'),
    L('Counting the whole string as a proper border.', 'পুরো স্ট্রিংকে প্রকৃত বর্ডার গোনা।'),
  ],
  plan: [
    L('Learn the prefix function and Z-function; solve 5 problems with each.', 'প্রিফিক্স ফাংশন আর Z-ফাংশন শেখো; প্রতিটি দিয়ে ৫টি প্রবলেম করো।'),
    L('Suffix arrays and automata come later, for 2000+ problems.', 'সাফিক্স অ্যারে আর অটোমাটা পরে, ২০০০+ প্রবলেমের জন্য।'),
  ],
};

export const parsingGuide: TagGuide = {
  slug: 'parsing',
  intro: [
    L('Parsing problems give input in a textual format you must break apart: expressions, dates, file paths, formatted logs, or a small language. The algorithm is usually easy; reading the format correctly is the challenge.',
      'পার্সিং প্রবলেম এমন টেক্সট ফরম্যাটে ইনপুট দেয় যা ভাঙতে হয়: এক্সপ্রেশন, তারিখ, ফাইল পাথ, ফরম্যাট করা লগ, বা ছোট একটি ভাষা। অ্যালগরিদম সাধারণত সহজ; ফরম্যাট ঠিকভাবে পড়াই চ্যালেঞ্জ।'),
    L('Read whole lines with getline, then scan characters or split with stringstream. Write small helper functions (readNumber, split) instead of one long loop.',
      'getline দিয়ে পুরো লাইন পড়ো, তারপর অক্ষর ধরে দেখো বা stringstream দিয়ে ভাগ করো। একটি লম্বা লুপের বদলে ছোট সহায়ক ফাংশন (readNumber, split) লেখো।'),
  ],
  recognize: [
    L('Input lines with punctuation, spaces that matter, or nested brackets.', 'বিরামচিহ্ন, গুরুত্বপূর্ণ স্পেস বা নেস্টেড বন্ধনীসহ ইনপুট লাইন।'),
    L('The statement spends most of its length describing a format.', 'স্টেটমেন্টের বেশিরভাগ অংশ একটি ফরম্যাট বর্ণনায় ব্যয়।'),
  ],
  patterns: [
    {
      name: L('Split a line by a separator', 'বিভাজক দিয়ে লাইন ভাগ'),
      explain: [
        L('getline(stream, token, sep) reads up to the next separator. Wrap the line in a stringstream and loop; each token can then be converted with stoi or stoll.',
          'getline(stream, token, sep) পরের বিভাজক পর্যন্ত পড়ে। লাইনটিকে একটি stringstream-এ মুড়ে লুপ চালাও; তারপর প্রতিটি টোকেন stoi বা stoll দিয়ে রূপান্তর করা যায়।'),
      ],
      code: raw`string line; getline(cin, line);
stringstream ss(line);
string tok; vector<int> nums;
while (getline(ss, tok, '+')) nums.push_back(stoi(tok));`,
      example: { problem: '339A', text: L('Helpful Maths: split “3+2+1” by “+”, sort the numbers and join them again.', 'Helpful Maths: “3+2+1”-কে “+” দিয়ে ভাগ করে সংখ্যাগুলো সর্ট করো আর আবার জোড়া দাও।') },
    },
    {
      name: L('Evaluate with a stack', 'স্ট্যাক দিয়ে মূল্যায়ন'),
      explain: [
        L('For brackets, push on “(” and pop on “)”; the depth tells you nesting, and a pop on an empty stack means the expression is invalid.',
          'বন্ধনীর জন্য “(”-এ পুশ আর “)”-এ পপ করো; গভীরতা নেস্টিং বোঝায়, আর খালি স্ট্যাকে পপ মানে এক্সপ্রেশনটি অবৈধ।'),
      ],
      code: raw`int depth = 0; bool ok = true;
for (char c : s) {
    if (c == '(') depth++;
    else if (c == ')') { if (depth == 0) ok = false; else depth--; }
}
ok = ok && depth == 0;`,
      example: { text: L('Bracket sequences, nested lists and tiny expression languages.', 'বন্ধনীর ক্রম, নেস্টেড তালিকা আর ছোট এক্সপ্রেশন ভাষা।') },
    },
  ],
  mistakes: [
    L('Mixing cin >> and getline: the newline after a number is still waiting; call cin.ignore() first.', 'cin >> আর getline মেশানো: একটি সংখ্যার পরের নিউলাইন তখনও অপেক্ষায়; আগে cin.ignore() ডাকো।'),
    L('Assuming no leading zeros, spaces or empty tokens when the statement allows them.', 'স্টেটমেন্ট অনুমতি দিলেও শুরুর শূন্য, স্পেস বা খালি টোকেন নেই ধরে নেওয়া।'),
  ],
  plan: [
    L('Practise getline, stringstream and character classification on 5 problems.', '৫টি প্রবলেমে getline, stringstream আর অক্ষর শ্রেণিবিভাগ অনুশীলন করো।'),
    L('Write a recursive-descent parser for + − × ( ) once.', 'একবার + − × ( )-এর জন্য রিকার্সিভ-ডিসেন্ট পার্সার লেখো।'),
  ],
};

export const divideAndConquerGuide: TagGuide = {
  slug: 'divide-and-conquer',
  intro: [
    L('Divide and conquer splits a problem into parts, solves each recursively, and combines the results. Merge sort is the classic example; it also counts inversions while merging.',
      'ডিভাইড অ্যান্ড কনকার একটি প্রবলেমকে অংশে ভাগ করে, প্রতিটি রিকার্সিভভাবে সমাধান করে, আর ফলগুলো মেলায়। মার্জ সর্ট ক্লাসিক উদাহরণ; মেলানোর সময় এটি ইনভার্সনও গোনে।'),
    L('The cost follows the recurrence T(n) = 2T(n/2) + O(n) = O(n log n). Another shape is “split at the minimum”: the smallest element divides the array into independent sides.',
      'খরচ T(n) = 2T(n/2) + O(n) = O(n log n) পুনরাবৃত্তি মানে। আরেকটি আকার হলো “সর্বনিম্নে ভাগ”: সবচেয়ে ছোট উপাদান অ্যারেকে স্বাধীন দুই পাশে ভাগ করে।'),
  ],
  recognize: [
    L('“Count pairs i < j with a[i] > a[j]” (inversions).', '“i < j এমন জোড়া গুনো যেখানে a[i] > a[j]” (ইনভার্সন)।'),
    L('A process that, after one step, leaves several independent smaller pieces.', 'এমন প্রক্রিয়া যা এক ধাপের পর কয়েকটি স্বাধীন ছোট টুকরো রেখে যায়।'),
  ],
  patterns: [
    {
      name: L('Split at the minimum', 'সর্বনিম্নে ভাগ'),
      explain: [
        L('To paint a fence of heights h with horizontal or vertical strokes, either paint every plank vertically (r − l + 1 strokes) or paint the common minimum horizontally and recurse on the pieces above it. Take the smaller.',
          'h উচ্চতার বেড়া আনুভূমিক বা উল্লম্ব টানে রং করতে, হয় প্রতিটি তক্তা উল্লম্বভাবে রং করো (r − l + ১ টান), নয়তো সাধারণ সর্বনিম্ন অংশ আনুভূমিকভাবে রং করে এর ওপরের টুকরোগুলোতে রিকার্শন করো। ছোটটি নাও।'),
      ],
      code: raw`long long solve(int l, int r, long long base) {
    if (l > r) return 0;
    int m = min_element(h.begin() + l, h.begin() + r + 1) - h.begin();
    long long horiz = h[m] - base;
    long long res = horiz + solve(l, m - 1, h[m]) + solve(m + 1, r, h[m]);
    return min(res, (long long)(r - l + 1));
}`,
      example: { problem: '448C', text: L('Painting Fence: exactly this recursion, O(n²) in the worst case, fine for n ≤ 5000.', 'Painting Fence: ঠিক এই রিকার্শন, সবচেয়ে খারাপ ক্ষেত্রে O(n²), n ≤ ৫০০০-এর জন্য ঠিক।') },
    },
    {
      name: L('Count inversions with merge sort', 'মার্জ সর্ট দিয়ে ইনভার্সন গোনা'),
      explain: [
        L('While merging two sorted halves, when an element from the right half is taken before the remaining k elements of the left half, it forms k inversions.',
          'দুটি সাজানো অর্ধেক মেলানোর সময় ডান অর্ধেকের একটি উপাদান যখন বাম অর্ধেকের বাকি k-টি উপাদানের আগে নেওয়া হয়, তখন এটি k-টি ইনভার্সন তৈরি করে।'),
      ],
      code: raw`long long sortCount(vector<int>& a, int l, int r) {   // [l, r)
    if (r - l < 2) return 0;
    int m = (l + r) / 2;
    long long inv = sortCount(a, l, m) + sortCount(a, m, r);
    vector<int> tmp; int i = l, j = m;
    while (i < m || j < r) {
        if (j == r || (i < m && a[i] <= a[j])) tmp.push_back(a[i++]);
        else { inv += m - i; tmp.push_back(a[j++]); }
    }
    copy(tmp.begin(), tmp.end(), a.begin() + l);
    return inv;
}`,
      example: { text: L('Minimum adjacent swaps to sort an array equals its number of inversions.', 'একটি অ্যারে সাজাতে সর্বনিম্ন পাশাপাশি অদলবদল এর ইনভার্সনের সংখ্যার সমান।') },
    },
  ],
  mistakes: [
    L('Recursing on overlapping ranges, which multiplies work.', 'পরস্পর ঢাকা পরিসরে রিকার্শন, যাতে কাজ বহুগুণ হয়।'),
    L('Returning int for inversion counts up to n²/2.', 'n²/২ পর্যন্ত ইনভার্সন গণনার জন্য int ফেরত দেওয়া।'),
  ],
  plan: [
    L('Implement merge sort with inversion counting.', 'ইনভার্সন গণনাসহ মার্জ সর্ট লেখো।'),
    L('Solve 5 problems where one step splits the array into independent parts.', 'এক ধাপে অ্যারে স্বাধীন অংশে ভাগ হয় এমন ৫টি প্রবলেম করো।'),
  ],
};

export const meetInTheMiddleGuide: TagGuide = {
  slug: 'meet-in-the-middle',
  intro: [
    L('Meet in the middle splits the input into two halves, enumerates all possibilities of each half separately (2^(n/2) each), and combines them with sorting or binary search. It turns 2⁴⁰ into about 2 · 2²⁰.',
      'মিট ইন দ্য মিডল ইনপুটকে দুই অর্ধেকে ভাগ করে, প্রতিটি অর্ধেকের সব সম্ভাবনা আলাদাভাবে গোনে (প্রতিটিতে ২^(n/২)), আর সর্ট বা বাইনারি সার্চ দিয়ে মেলায়। এটি ২⁴⁰-কে প্রায় ২ · ২²⁰-এ নামায়।'),
  ],
  recognize: [
    L('n around 30–40 with subsets: too many for 2ⁿ, small enough for 2^(n/2).', 'সাবসেটসহ n প্রায় ৩০–৪০: ২ⁿ-এর জন্য বেশি, ২^(n/২)-এর জন্য যথেষ্ট ছোট।'),
  ],
  patterns: [
    {
      name: L('Best subset sum modulo m', 'm মডুলোতে সেরা সাবসেট যোগফল'),
      explain: [
        L('List all subset sums mod m of each half and sort the second list. For each sum x from the first half, the best partner is the largest y < m − x (found with lower_bound), or simply the largest y overall.',
          'প্রতিটি অর্ধেকের সব সাবসেট যোগফল mod m তালিকা করো আর দ্বিতীয় তালিকা সর্ট করো। প্রথম অর্ধেকের প্রতিটি যোগফল x-এর জন্য সেরা সঙ্গী হলো m − x-এর চেয়ে ছোট সবচেয়ে বড় y (lower_bound দিয়ে পাওয়া), অথবা সামগ্রিকভাবে সবচেয়ে বড় y।'),
      ],
      code: raw`auto sums = [&](int l, int r) {
    vector<long long> s = {0};
    for (int i = l; i < r; i++) { int k = s.size(); for (int j = 0; j < k; j++) s.push_back((s[j] + a[i]) % m); }
    return s;
};
auto A = sums(0, n / 2), B = sums(n / 2, n);
sort(B.begin(), B.end());
long long best = 0;
for (long long x : A) {
    auto it = lower_bound(B.begin(), B.end(), m - x);
    if (it != B.begin()) best = max(best, x + *prev(it));
    best = max(best, (x + B.back()) % m);
}`,
      example: { problem: '888E', text: L('Maximum Subsequence: n ≤ 35, so split into halves of at most 18 and combine with binary search.', 'Maximum Subsequence: n ≤ ৩৫, তাই সর্বোচ্চ ১৮-এর অর্ধেকে ভাগ করে বাইনারি সার্চ দিয়ে মেলাও।') },
    },
  ],
  mistakes: [
    L('Generating 2ⁿ sums with n = 35 directly.', 'n = ৩৫ হলে সরাসরি ২ⁿ যোগফল তৈরি।'),
    L('Forgetting the empty subset in one of the halves.', 'একটি অর্ধেকে খালি সাবসেট ভুলে যাওয়া।'),
  ],
  plan: [
    L('Solve the subset-sum version first, then 3 meet-in-the-middle problems rated 1800+.', 'আগে সাবসেট-যোগফল সংস্করণ করো, তারপর ১৮০০+ রেটিংয়ের ৩টি মিট-ইন-দ্য-মিডল প্রবলেম।'),
  ],
};

export const ternarySearchGuide: TagGuide = {
  slug: 'ternary-search',
  intro: [
    L('Ternary search finds the minimum of a function that decreases and then increases (unimodal). Compare f at two interior points; the side with the larger value cannot contain the minimum and is discarded. Each round keeps two thirds of the interval.',
      'টার্নারি সার্চ এমন একটি ফাংশনের সর্বনিম্ন খোঁজে যা কমে তারপর বাড়ে (ইউনিমোডাল)। দুটি ভেতরের বিন্দুতে f তুলনা করো; বড় মানের দিকটিতে সর্বনিম্ন থাকতে পারে না, তাই বাদ দাও। প্রতিটি রাউন্ডে ব্যবধানের দুই-তৃতীয়াংশ থাকে।'),
    L('On real numbers, run a fixed number of iterations (100 is plenty). On integers, stop when the range is two or three wide and check the survivors directly. The same idea finds a maximum of a function that rises and then falls.',
      'বাস্তব সংখ্যায় নির্দিষ্ট সংখ্যক পুনরাবৃত্তি চালাও (১০০ যথেষ্ট)। পূর্ণসংখ্যায় পরিসর দুই-তিন চওড়া হলে থেমে বেঁচে থাকাগুলো সরাসরি যাচাই করো। একই ধারণায় এমন ফাংশনের সর্বোচ্চও মেলে যা আগে বাড়ে, পরে কমে।'),
    L('What you really need is convexity (or concavity), not just “one valley”: a convex function may be flat only at its minimum, and that is exactly what makes the comparison safe. A function with a flat stretch away from the minimum — a ceiling, a floor, equal values in a sorted array — can fool the search.',
      'আসলে লাগে উত্তলতা (বা অবতলতা), শুধু “একটি উপত্যকা” নয়: উত্তল ফাংশন শুধু ন্যূনতমেই সমতল হতে পারে, আর ঠিক এতেই তুলনা নিরাপদ হয়। ন্যূনতম থেকে দূরে সমতল অংশ আছে এমন ফাংশন — সিলিং, ফ্লোর, সর্টেড অ্যারের সমান মান — সার্চকে ধোঁকা দিতে পারে।'),
  ],
  recognize: [
    L('“Choose x to minimise …” where moving x too far in either direction makes things worse.', '“x বাছো যাতে … সর্বনিম্ন হয়” যেখানে x-কে যেকোনো দিকে বেশি সরালে খারাপ হয়।'),
    L('A convex cost, such as a sum of |aᵢ − x|, a sum of max(0, x − aᵢ), or a maximum of linear functions.', 'একটি উত্তল খরচ, যেমন |aᵢ − x|-এর যোগফল, max(০, x − aᵢ)-এর যোগফল, বা রৈখিক ফাংশনের সর্বোচ্চ।'),
    L('A “meeting point”, “best position” or “best moment” with a cost that grows in both directions.', '“মিলনবিন্দু”, “সেরা অবস্থান” বা “সেরা মুহূর্ত” যার খরচ দুই দিকেই বাড়ে।'),
    L('The statement asks for the minimum of a maximum, or a maximum of a minimum, over a continuous or very large integer range.', 'প্রবলেম একটি ক্রমাগত বা খুব বড় পূর্ণসংখ্যা পরিসরে সর্বোচ্চের ন্যূনতম, বা ন্যূনতমের সর্বোচ্চ চায়।'),
  ],
  patterns: [
    {
      name: L('Ternary search on a real number', 'বাস্তব সংখ্যায় টার্নারি সার্চ'),
      explain: [
        L('Each iteration keeps two thirds of the interval, so 100 iterations shrink it by (2/3)¹⁰⁰, far below any required precision. Print the midpoint (or f at the midpoint).',
          'প্রতিটি পুনরাবৃত্তি ব্যবধানের দুই-তৃতীয়াংশ রাখে, তাই ১০০টি পুনরাবৃত্তি একে (২/৩)¹⁰⁰ গুণ ছোট করে, যেকোনো প্রয়োজনীয় নির্ভুলতার অনেক নিচে। মধ্যবিন্দু (বা সেখানে f) প্রিন্ট করো।'),
      ],
      code: raw`double lo = -1e4, hi = 1e4;
for (int it = 0; it < 100; it++) {
    double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) hi = m2; else lo = m1;
}
printf("%.10f\n", f((lo + hi) / 2));`,
      example: { problem: '578C', text: L('Weakness and Poorness: the weakness of a − x is convex in x; ternary search x, computing the weakness with maximum-subarray sums. Meeting on the Line (1730B) is the same loop on a maximum of V shapes.', 'Weakness and Poorness: a − x-এর দুর্বলতা x-এ উত্তল; x-এ টার্নারি সার্চ করো, সর্বোচ্চ-সাবঅ্যারে যোগফল দিয়ে দুর্বলতা হিসাব করে। Meeting on the Line (1730B) একই লুপ, V আকৃতির সর্বোচ্চের ওপর।') },
    },
    {
      name: L('Integer ternary search with the “equal” rule', 'পূর্ণসংখ্যায় টার্নারি সার্চ, “সমান” নিয়মসহ'),
      explain: [
        L('For a convex f on integers: if f(m1) < f(m2) the minimum is left of m2; if f(m1) > f(m2) it is right of m1; if they are equal it lies between them. Stop when hi − lo ≤ 2 and scan. This is safe precisely because a convex function repeats a value only around its minimum.',
          'পূর্ণসংখ্যায় উত্তল f-এর জন্য: f(m1) < f(m2) হলে ন্যূনতম m2-র বাঁয়ে; f(m1) > f(m2) হলে m1-এর ডানে; সমান হলে তাদের মাঝে। hi − lo ≤ ২ হলে থামো আর স্ক্যান করো। এটি নিরাপদ কারণ উত্তল ফাংশন কোনো মান পুনরাবৃত্তি করে কেবল ন্যূনতমের আশেপাশেই।'),
      ],
      code: raw`long long lo = 0, hi = N;
while (hi - lo > 2) {
    long long m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
    long long f1 = f(m1), f2 = f(m2);
    if (f1 < f2) hi = m2 - 1;
    else if (f1 > f2) lo = m1 + 1;
    else lo = m1, hi = m2;       // equal: the minimum is between
}
long long best = LLONG_MAX;
for (long long x = lo; x <= hi; x++) best = min(best, f(x));`,
      example: { problem: '439D', text: L('Devu and his Brother: the cost of lifting every a and lowering every b to a threshold x is convex; ternary-search x, evaluating f in O(n + m). The same problem also has a greedy pairing and a prefix-sum solution.', 'Devu and his Brother: প্রতিটি a তুলে আর প্রতিটি b নামিয়ে সীমা x-এ আনার খরচ উত্তল; x-এ টার্নারি সার্চ করো, f O(n + m)-এ মূল্যায়ন করে। একই প্রবলেমে গ্রিডি জোড়া মেলানো আর প্রিফিক্স সামের সমাধানও আছে।') },
    },
    {
      name: L('Search the clean relaxation, not the ceiling', 'সিলিং নয়, পরিষ্কার শিথিলীকরণে খোঁজো'),
      explain: [
        L('A ceiling or floor turns a smooth curve into steps; steps away from the minimum break the ternary comparison. Turn the condition into an inequality on a smooth function first — for example ⌈d/(x+1)⌉ ≤ n − x becomes d ≤ (n − x)(x + 1), a parabola — and search that.',
          'সিলিং বা ফ্লোর মসৃণ রেখাকে ধাপে বদলায়; ন্যূনতম থেকে দূরের ধাপ টার্নারি তুলনা ভেঙে দেয়। আগে শর্তটিকে মসৃণ ফাংশনের অসমতায় বদলাও — যেমন ⌈d/(x+১)⌉ ≤ n − x হয় d ≤ (n − x)(x + ১), একটি প্যারাবোলা — তারপর সেটি খোঁজো।'),
      ],
      code: raw`// is there an integer x >= 0 with x + ceil(d / (x + 1)) <= n ?
auto h = [&](long long x) { return (n - x) * (x + 1); };   // concave
// ternary-search the maximum of h, or just test x = (n - 1) / 2
bool yes = max(h((n - 1) / 2), h((n - 1) / 2 + 1)) >= d;`,
      example: { problem: '1288A', text: L('Deadline: the optimised running time is x + ⌈d/(x+1)⌉. Rewrite the “can I finish in n days” test as a parabola and the whole problem is O(1).', 'Deadline: অপ্টিমাইজ করা চলার সময় x + ⌈d/(x+১)⌉। “n দিনে শেষ করা যাবে কি” পরীক্ষাটিকে প্যারাবোলায় লিখলেই পুরো প্রবলেম O(১)।') },
    },
    {
      name: L('A search inside a search', 'সার্চের ভেতরে সার্চ'),
      explain: [
        L('When the answer is a width and the check is “does some position work?”, binary-search the width and ternary-search the position. The position cost must be convex; the width check must be monotone (a wider window never costs more).',
          'উত্তর যখন একটি প্রস্থ আর পরীক্ষা “কোনো অবস্থান চলে কি?”, প্রস্থে বাইনারি সার্চ আর অবস্থানে টার্নারি সার্চ করো। অবস্থানের খরচ উত্তল হতে হবে; প্রস্থের পরীক্ষা একঘাতিক হতে হবে (চওড়া জানালা কখনো বেশি খরচে আসে না)।'),
      ],
      code: raw`// cost(L, D): moves needed to squeeze all values into [L, L + D]
auto feasible = [&](long long D) {
    long long lo = mn, hi = mx;              // ternary over the window start
    while (hi - lo > 2) { /* compare cost(m1, D) and cost(m2, D) */ }
    long long best = LLONG_MAX;
    for (long long L = lo; L <= hi; L++) best = min(best, cost(L, D));
    return best <= k;
};
// then: binary search the smallest D with feasible(D)`,
      example: { problem: '1244E', text: L('Minimizing Difference: binary-search the final width D; the cheapest window start for a given D is found by ternary search with prefix sums. A greedy that shrinks the cheaper end solves the same problem without any search.', 'Minimizing Difference: চূড়ান্ত প্রস্থ D বাইনারি সার্চে খোঁজো; নির্দিষ্ট D-র সস্তা জানালা-শুরু প্রিফিক্স সামসহ টার্নারি সার্চে মেলে। সস্তা প্রান্ত ছোট করা একটি গ্রিডি কোনো সার্চ ছাড়াই একই প্রবলেম সমাধান করে।') },
    },
    {
      name: L('A convex penalty as a feasibility test', 'সম্ভাব্যতা পরীক্ষা হিসেবে উত্তল জরিমানা'),
      explain: [
        L('To ask “is there a p with several linear constraints?”, define the total violation g(p) = Σ max(0, constraintᵢ(p)). Each term is convex, so g is too, and the answer is yes exactly when min g = 0. Ternary search finds min g without solving the inequalities by hand.',
          '“কয়েকটি রৈখিক শর্ত মানে এমন p আছে কি?” জানতে মোট লঙ্ঘন g(p) = Σ max(০, শর্তᵢ(p)) সংজ্ঞায়িত করো। প্রতিটি পদ উত্তল, তাই g-ও উত্তল, আর উত্তর হ্যাঁ ঠিক তখনই যখন min g = ০। টার্নারি সার্চ হাতে অসমতা সমাধান না করেই min g খুঁজে দেয়।'),
      ],
      code: raw`auto g = [&](long long p) {            // shortage of red + shortage of blue
    return max(0LL, p * a + (k - p) * b - x) + max(0LL, p * b + (k - p) * a - y);
};
// ternary-search p in [0, k]; k sets are possible iff min g == 0`,
      example: { problem: '1538G', text: L('Gift Set: for a fixed number of sets k the split p is checked either by interval algebra or by ternary-searching the penalty; the number of sets itself is binary-searched.', 'Gift Set: নির্দিষ্ট সেট-সংখ্যা k-র জন্য ভাগ p হয় ব্যবধান-বীজগণিতে নয়তো জরিমানার টার্নারি সার্চে যাচাই করা হয়; সেটের সংখ্যা নিজে বাইনারি সার্চে খোঁজা হয়।') },
    },
    {
      name: L('Sometimes a maximum of V shapes has a formula', 'কখনো V আকৃতির সর্বোচ্চের সূত্র থাকে'),
      explain: [
        L('A maximum of terms |x − cᵢ| + tᵢ is max(B + x, A − x) with A = max(cᵢ + tᵢ) and B = max(tᵢ − cᵢ). Its minimum is where the two lines meet. Learn to recognise this: ternary search is the safe fallback, the formula is the clean finish.',
          '|x − cᵢ| + tᵢ পদগুলোর সর্বোচ্চ হলো max(B + x, A − x), যেখানে A = max(cᵢ + tᵢ) আর B = max(tᵢ − cᵢ)। এর ন্যূনতম যেখানে দুই রেখা মেলে। এটি চিনতে শেখো: টার্নারি সার্চ নিরাপদ বিকল্প, সূত্রটি পরিষ্কার সমাপ্তি।'),
      ],
      code: raw`long long A = LLONG_MIN, B = LLONG_MIN;
for (int i = 0; i < n; i++) A = max(A, t[i] + c[i]), B = max(B, t[i] - c[i]);
double best_x = (A - B) / 2.0;      // where B + x == A - x`,
      example: { problem: '1301B', text: L('Motarack’s Birthday: the best replacement k is the midpoint of the smallest and largest known neighbour. Meeting on the Line (1730B) is the same shape with real positions.', 'Motarack’s Birthday: সেরা প্রতিস্থাপন k হলো সবচেয়ে ছোট আর সবচেয়ে বড় জানা প্রতিবেশীর মধ্যবিন্দু। Meeting on the Line (1730B) একই আকার, বাস্তব অবস্থানসহ।') },
    },
  ],
  mistakes: [
    L('Using it on a function with flat regions away from the minimum, or with several valleys.', 'ন্যূনতম থেকে দূরে সমতল অংশ বা একাধিক উপত্যকাসহ ফাংশনে ব্যবহার।'),
    L('Stopping too early on integers: check the last few candidates by hand.', 'পূর্ণসংখ্যায় খুব আগে থামা: শেষ কয়েকটি সম্ভাব্য মান নিজে দেখো।'),
    L('Searching a function with ceilings or floors directly instead of a smooth relaxation of the condition.', 'শর্তের মসৃণ শিথিলীকরণের বদলে সিলিং বা ফ্লোরসহ ফাংশনে সরাসরি খোঁজা।'),
    L('Running a ternary search over sorted values with duplicates: equal values then are not the minimum. Deduplicate first.', 'ডুপ্লিকেটসহ সর্টেড মানের ওপর টার্নারি সার্চ: তখন সমান মান ন্যূনতম নয়। আগে ডুপ্লিকেট সরাও।'),
    L('Too few iterations on a large real range, or int overflow in the cost function.', 'বড় বাস্তব পরিসরে কম পুনরাবৃত্তি, বা খরচ ফাংশনে int উপচে পড়া।'),
  ],
  plan: [
    L('Prove convexity before using it; otherwise use binary search on a derivative-like condition.', 'ব্যবহারের আগে উত্তলতা প্রমাণ করো; না হলে ডেরিভেটিভ-সদৃশ শর্তে বাইনারি সার্চ করো।'),
    L('Warm up on Deadline (1288A) and Motarack’s Birthday (1301B): both have a search and a formula.', 'Deadline (1288A) আর Motarack’s Birthday (1301B) দিয়ে শুরু করো: দুটিতেই সার্চ আর সূত্র দুই-ই আছে।'),
    L('Do Meeting on the Line (1730B), then Devu and his Brother (439D) for integer ternary search.', 'Meeting on the Line (1730B), তারপর পূর্ণসংখ্যার টার্নারি সার্চের জন্য Devu and his Brother (439D) করো।'),
    L('Move to nested searches: Minimizing Difference (1244E) and Gift Set (1538G).', 'নেস্টেড সার্চে যাও: Minimizing Difference (1244E) আর Gift Set (1538G)।'),
  ],
};

export const fftGuide: TagGuide = {
  slug: 'fft',
  intro: [
    L('FFT (or NTT, its modular version) multiplies two polynomials of degree n in O(n log n) instead of O(n²). Many counting problems are polynomial products in disguise: “for each sum s, how many pairs (a, b) with a + b = s”.',
      'FFT (বা এর মডুলার সংস্করণ NTT) n ডিগ্রির দুটি বহুপদীকে O(n²)-এর বদলে O(n log n)-এ গুণ করে। অনেক গণনার প্রবলেম ছদ্মবেশী বহুপদী গুণফল: “প্রতিটি যোগফল s-এর জন্য, a + b = s এমন কতগুলো জোড়া (a, b)”।'),
  ],
  recognize: [
    L('Counting pairs by sum or difference with values up to 10⁵–10⁶.', '১০⁵–১০⁶ পর্যন্ত মানসহ যোগফল বা পার্থক্য অনুযায়ী জোড়া গোনা।'),
    L('Matching a pattern against a text with wildcards or tolerance.', 'ওয়াইল্ডকার্ড বা সহনশীলতাসহ একটি টেক্সটের সঙ্গে প্যাটার্ন মেলানো।'),
  ],
  patterns: [
    {
      name: L('Pair counts by sum', 'যোগফল অনুযায়ী জোড়ার গণনা'),
      explain: [
        L('Let A(x) = Σ cnt[v] xᵛ. Then A(x)² has coefficient c[s] = the number of ordered pairs with sum s. Multiply with FFT and read the coefficients.',
          'ধরো A(x) = Σ cnt[v] xᵛ। তাহলে A(x)²-এর সহগ c[s] = যোগফল s এমন ক্রমযুক্ত জোড়ার সংখ্যা। FFT দিয়ে গুণ করে সহগগুলো পড়ো।'),
      ],
      code: raw`using cd = complex<double>;
void fft(vector<cd>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) { int b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) swap(a[i], a[j]); }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * M_PI / len * (inv ? -1 : 1); cd w(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) { cd x(1); for (int k = 0; k < len / 2; k++, x *= w) {
            cd u = a[i + k], v = a[i + k + len / 2] * x; a[i + k] = u + v; a[i + k + len / 2] = u - v; } }
    }
    if (inv) for (auto& x : a) x /= n;
}`,
      example: { problem: '528D', text: L('Fuzzy Search: for each letter, convolve “text has this letter nearby” with “pattern has this letter” to count matches at every shift.', 'Fuzzy Search: প্রতিটি অক্ষরের জন্য “টেক্সটে কাছাকাছি এই অক্ষর আছে” আর “প্যাটার্নে এই অক্ষর আছে” কনভলভ করে প্রতিটি সরণে মিল গোনো।') },
    },
  ],
  mistakes: [
    L('Precision loss with doubles when coefficients exceed about 10¹⁵; use NTT or split the numbers.', 'সহগ প্রায় ১০¹⁵ ছাড়ালে double-এ নির্ভুলতা হারানো; NTT ব্যবহার করো বা সংখ্যাগুলো ভাগ করো।'),
    L('Forgetting to round the real parts after the inverse transform.', 'উল্টো রূপান্তরের পর বাস্তব অংশ রাউন্ড করতে ভুলে যাওয়া।'),
  ],
  plan: [
    L('FFT is a 2200+ topic; learn it after DP, graphs and data structures feel solid.', 'FFT একটি ২২০০+ বিষয়; DP, গ্রাফ আর ডেটা স্ট্রাকচার পোক্ত হলে শেখো।'),
    L('Implement it once, test on random polynomials against O(n²) multiplication.', 'একবার লিখে এলোমেলো বহুপদীতে O(n²) গুণের সঙ্গে মেলাও।'),
  ],
};

export const schedulesGuide: TagGuide = {
  slug: 'schedules',
  intro: [
    L('Schedule problems ask you to order tasks in time: deadlines, durations, rest periods, or several machines. They are usually solved with sorting plus greedy, sometimes with a priority queue or binary search on the finishing time.',
      'শিডিউল প্রবলেম সময়ে কাজগুলো সাজাতে বলে: ডেডলাইন, সময়কাল, বিশ্রামের সময়, বা কয়েকটি মেশিন। সাধারণত সর্টিং আর গ্রিডি দিয়ে সমাধান হয়, কখনো প্রায়োরিটি কিউ বা শেষ হওয়ার সময়ে বাইনারি সার্চ দিয়ে।'),
  ],
  recognize: [
    L('Tasks with start times, durations or deadlines.', 'শুরুর সময়, সময়কাল বা ডেডলাইনসহ কাজ।'),
    L('“Maximum number of non-overlapping …”.', '“সর্বোচ্চ সংখ্যক অ-ওভারল্যাপিং …”।'),
  ],
  patterns: [
    {
      name: L('Earliest finishing time first', 'যেটি আগে শেষ হয় সেটি আগে'),
      explain: [
        L('To fit the most non-overlapping intervals, sort by end time and take every interval that starts after the last chosen one ends. Ending early leaves the most room for the rest.',
          'সবচেয়ে বেশি অ-ওভারল্যাপিং ব্যবধান রাখতে শেষ সময় অনুযায়ী সর্ট করো আর শেষ বাছাইটি শেষ হওয়ার পরে শুরু হয় এমন প্রতিটি ব্যবধান নাও। আগে শেষ হলে বাকিদের জন্য সবচেয়ে বেশি জায়গা থাকে।'),
      ],
      code: raw`sort(iv.begin(), iv.end(), [](auto& a, auto& b) { return a.second < b.second; });
int count = 0; long long lastEnd = LLONG_MIN;
for (auto [s, e] : iv) if (s > lastEnd) { count++; lastEnd = e; }`,
      example: { text: L('Classic activity selection; the same idea appears in many 1200–1600 problems.', 'ক্লাসিক অ্যাক্টিভিটি সিলেকশন; একই আইডিয়া অনেক ১২০০–১৬০০ প্রবলেমে আসে।') },
    },
    {
      name: L('Simulate time with a priority queue', 'প্রায়োরিটি কিউ দিয়ে সময় সিমুলেশন'),
      explain: [
        L('Process events in time order; keep the currently available tasks in a heap ordered by priority (shortest, most urgent, most valuable) and take the best one whenever a machine is free.',
          'ঘটনাগুলো সময়ের ক্রমে দেখো; বর্তমানে প্রাপ্য কাজগুলো অগ্রাধিকার অনুযায়ী (সবচেয়ে ছোট, সবচেয়ে জরুরি, সবচেয়ে মূল্যবান) একটি হিপে রাখো আর মেশিন খালি হলেই সেরাটি নাও।'),
      ],
      code: raw`sort(tasks.begin(), tasks.end());          // by release time
priority_queue<long long, vector<long long>, greater<>> ready;   // by duration
long long t = 0; size_t i = 0;
while (i < tasks.size() || !ready.empty()) {
    if (ready.empty()) t = max(t, tasks[i].first);
    while (i < tasks.size() && tasks[i].first <= t) ready.push(tasks[i++].second);
    t += ready.top(); ready.pop();
}`,
      example: { text: L('Single-machine scheduling with release times.', 'রিলিজ সময়সহ এক-মেশিন শিডিউলিং।') },
    },
  ],
  mistakes: [
    L('Sorting by start time when the greedy needs end time.', 'গ্রিডির শেষ সময় দরকার হলেও শুরুর সময় অনুযায়ী সর্ট।'),
    L('Off-by-one on whether touching intervals overlap.', 'ছোঁয়া ব্যবধান ওভারল্যাপ করে কি না তাতে এক কম-বেশি।'),
  ],
  plan: [
    L('Learn activity selection and deadline scheduling with a heap.', 'অ্যাক্টিভিটি সিলেকশন আর হিপ দিয়ে ডেডলাইন শিডিউলিং শেখো।'),
    L('The tag is rare; most schedule problems are listed under greedy and sortings.', 'ট্যাগটি বিরল; বেশিরভাগ শিডিউল প্রবলেম গ্রিডি আর সর্টিংয়ের নিচে থাকে।'),
  ],
};
