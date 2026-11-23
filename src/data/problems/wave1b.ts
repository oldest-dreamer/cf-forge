import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const p112A: ProblemEntry = {
  id: '112A',
  contestId: 112,
  index: 'A',
  name: 'Petya and Strings',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('Lexicographic comparison, the rule behind every string sort, with a case-insensitive twist.', 'অভিধানক্রমিক তুলনা, প্রতিটি স্ট্রিং সর্টের পেছনের নিয়ম, সঙ্গে বড়-ছোট হাতের পার্থক্য উপেক্ষা।'),
  statement: L(
    'Two strings of the same length made of Latin letters are given. Compare them in dictionary order, ignoring whether letters are uppercase or lowercase. Print −1 if the first is smaller, 1 if it is larger, and 0 if they are equal.',
    'একই দৈর্ঘ্যের ল্যাটিন অক্ষরের দুটি স্ট্রিং দেওয়া আছে। বড় না ছোট হাতের তা উপেক্ষা করে অভিধানক্রমে তুলনা করুন। প্রথমটি ছোট হলে −১, বড় হলে ১, আর সমান হলে ০ প্রিন্ট করুন।',
  ),
  input: L('Two lines, one string each.', 'দুটি লাইন, প্রতিটিতে একটি স্ট্রিং।'),
  output: L('-1, 1 or 0.', '-১, ১ অথবা ০।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Length 1 to 100', 'দৈর্ঘ্য ১ থেকে ১০০')] },
  samples: [
    { input: 'aaaa\naaaA', output: '0', explain: L('Equal once case is ignored.', 'বড়-ছোট উপেক্ষা করলে সমান।') },
    { input: 'abs\nAbz', output: '-1', explain: L('s < z at the third letter.', 'তৃতীয় অক্ষরে s < z।') },
    { input: 'abcdefg\nAbCdEfF', output: '1', explain: L('g > f at the last letter.', 'শেষ অক্ষরে g > f।') },
  ],
  observation: L('After lowercasing both strings, ordinary string comparison is exactly what is asked.', 'দুটি স্ট্রিং ছোট হাতের করার পর সাধারণ স্ট্রিং তুলনাই ঠিক যা চাওয়া হয়েছে।'),
  approach: [L('Lowercase both, then compare the first position where they differ.', 'দুটিই ছোট হাতের করুন, তারপর প্রথম যে অবস্থানে আলাদা সেটি তুলনা করুন।')],
  walkthrough: {
    input: 'abs\nAbz',
    steps: [
      { state: 'abs vs abz', text: L('After lowercasing.', 'ছোট হাতের করার পর।') },
      { state: 's < z', text: L('First difference at index 2, so −1.', 'প্রথম পার্থক্য ইনডেক্স ২-এ, তাই −১।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass over each string.', 'প্রতিটি স্ট্রিংয়ে একবার যাওয়া।') },
  solutions: [
    {
      id: 'loop',
      kind: 'method',
      title: L('Compare letter by letter', 'অক্ষর ধরে ধরে তুলনা'),
      idea: L('Walk both strings together and stop at the first different lowercase letter.', 'দুটি স্ট্রিং একসঙ্গে চলুন আর ছোট হাতের প্রথম আলাদা অক্ষরে থামুন।'),
      explain: [L('Dictionary order is decided by the first position where the strings differ; everything after it does not matter. tolower on each character makes A and a the same. If the loop finishes, the strings are equal.', 'অভিধানক্রম ঠিক হয় প্রথম যে অবস্থানে স্ট্রিং দুটি আলাদা, সেখানে; এর পরের কিছুই গুরুত্বপূর্ণ নয়। প্রতিটি অক্ষরে tolower দিলে A আর a একই হয়। লুপ শেষ হলে স্ট্রিং দুটি সমান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    for (size_t i = 0; i < a.size(); i++) {
        char x = tolower(a[i]), y = tolower(b[i]);
        if (x != y) {
            cout << (x < y ? -1 : 1) << "\n";
            return 0;
        }
    }
    cout << 0 << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'ternary'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('Lowercase with transform, then compare()', 'transform দিয়ে ছোট হাতের করে compare()'),
      idea: L('string::compare returns negative, zero or positive; map its sign to −1, 0, 1.', 'string::compare ঋণাত্মক, শূন্য বা ধনাত্মক দেয়; এর চিহ্নকে −১, ০, ১-এ রূপান্তর করুন।'),
      explain: [L('compare does not promise exactly −1 or 1, only the sign, so (c > 0) − (c < 0) turns it into the required value. This “sign of a number” trick is handy in many problems.', 'compare ঠিক −১ বা ১ দেওয়ার নিশ্চয়তা দেয় না, শুধু চিহ্ন, তাই (c > 0) − (c < 0) একে প্রয়োজনীয় মানে বদলায়। এই “সংখ্যার চিহ্ন” কৌশল অনেক প্রবলেমে কাজে লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    auto lower = [](string& s) { transform(s.begin(), s.end(), s.begin(), ::tolower); };
    lower(a);
    lower(b);
    int c = a.compare(b);
    cout << (c > 0) - (c < 0) << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['lambda', 'bool-arith'],
    },
  ],
  tests: [
    { input: 'aaaa\naaaA', output: '0', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'abs\nAbz', output: '-1', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'abcdefg\nAbCdEfF', output: '1', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: 'Z\na', output: '1', source: 'own', note: L('Plain comparison would say Z < a.', 'সাধারণ তুলনায় Z < a হতো।') },
  ],
  pitfalls: [
    L('Comparing without lowercasing: in ASCII every uppercase letter is smaller than every lowercase letter.', 'ছোট হাতের না করে তুলনা: ASCII-তে প্রতিটি বড় হাতের অক্ষর প্রতিটি ছোট হাতের অক্ষরের চেয়ে ছোট।'),
    L('Printing compare()’s raw result, which can be any negative or positive number.', 'compare()-এর কাঁচা ফল প্রিন্ট করা, যা যেকোনো ঋণাত্মক বা ধনাত্মক সংখ্যা হতে পারে।'),
  ],
  related: [{ id: '59A', name: 'Word', why: L('More case conversion.', 'আরও বড়-ছোট হাতের রূপান্তর।') }],
  toolkit: ['string-basics', 'lambda'],
};

export const p281A: ProblemEntry = {
  id: '281A',
  contestId: 281,
  index: 'A',
  name: 'Word Capitalization',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('The smallest string edit: change one character and keep the rest.', 'সবচেয়ে ছোট স্ট্রিং সম্পাদনা: একটি অক্ষর বদলে বাকিটা রেখে দেওয়া।'),
  statement: L(
    'Capitalise a word: make its first letter uppercase and leave every other letter exactly as it is.',
    'একটি শব্দের প্রথম অক্ষর বড় হাতের করুন, আর বাকি প্রতিটি অক্ষর যেমন আছে তেমনই রাখুন।',
  ),
  input: L('One word of Latin letters.', 'ল্যাটিন অক্ষরের একটি শব্দ।'),
  output: L('The capitalised word.', 'প্রথম অক্ষর বড় হাতের করা শব্দ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Length up to 1000', 'দৈর্ঘ্য সর্বোচ্চ ১০০০')] },
  samples: [
    { input: 'ApPLe', output: 'ApPLe', explain: L('Already capitalised; the rest stays.', 'আগেই বড় হাতের; বাকিটা থাকে।') },
    { input: 'konjac', output: 'Konjac', explain: L('Only k changes.', 'শুধু k বদলায়।') },
  ],
  observation: L('Only s[0] changes, and toupper leaves an uppercase letter unchanged.', 'শুধু s[0] বদলায়, আর toupper বড় হাতের অক্ষরকে অপরিবর্তিত রাখে।'),
  approach: [L('Apply toupper to the first character and print.', 'প্রথম অক্ষরে toupper প্রয়োগ করে প্রিন্ট করুন।')],
  walkthrough: { input: 'konjac', steps: [{ state: 'k → K', text: L('Print Konjac.', 'প্রিন্ট Konjac।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Reading and printing the word.', 'শব্দটি পড়া আর প্রিন্ট করা।') },
  solutions: [
    {
      id: 'toupper',
      kind: 'method',
      title: L('toupper on the first letter', 'প্রথম অক্ষরে toupper'),
      idea: L('s[0] = toupper(s[0]).', 's[0] = toupper(s[0])।'),
      explain: [L('A common mistake is lowercasing the rest of the word, but the statement says to keep it. toupper only changes lowercase letters, so an already-uppercase first letter is safe.', 'একটি প্রচলিত ভুল হলো বাকি শব্দ ছোট হাতের করে ফেলা, কিন্তু স্টেটমেন্ট বলে যেমন আছে রাখতে। toupper শুধু ছোট হাতের অক্ষর বদলায়, তাই আগেই বড় হাতের প্রথম অক্ষর নিরাপদ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    s[0] = toupper(s[0]);
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'ascii',
      kind: 'alt',
      title: L('ASCII arithmetic', 'ASCII হিসাব'),
      idea: L('If s[0] is between a and z, subtract 32 (the gap between a and A).', 's[0] যদি a থেকে z-এর মধ্যে হয়, ৩২ বিয়োগ করুন (a আর A-এর ব্যবধান)।'),
      explain: [L('Letters are numbers: \'a\' is 97 and \'A\' is 65. s[0] − \'a\' + \'A\' converts without any library call, and the range check keeps uppercase letters as they are. Knowing this helps when you need shifts like Caesar ciphers.', 'অক্ষরও সংখ্যা: \'a\' হলো ৯৭ আর \'A\' হলো ৬৫। s[0] − \'a\' + \'A\' কোনো লাইব্রেরি ছাড়াই রূপান্তর করে, আর পরিসরের পরীক্ষা বড় হাতের অক্ষর যেমন আছে রাখে। সিজার সাইফারের মতো সরানোর কাজে এটি জানা কাজে লাগে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    if (s[0] >= 'a' && s[0] <= 'z') s[0] = s[0] - 'a' + 'A';
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['char-count'],
    },
  ],
  tests: [
    { input: 'ApPLe', output: 'ApPLe', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'konjac', output: 'Konjac', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'a', output: 'A', source: 'own', note: L('One letter.', 'এক অক্ষর।') },
    { input: 'xYZ', output: 'XYZ', source: 'own', note: L('The rest is untouched.', 'বাকিটা অক্ষত।') },
  ],
  pitfalls: [L('Lowercasing the rest of the word.', 'শব্দের বাকি অংশ ছোট হাতের করা।')],
  related: [{ id: '131A', name: 'cAPS lOCK', why: L('A harder case-changing rule.', 'বড়-ছোট বদলের কঠিন নিয়ম।') }],
  toolkit: ['string-basics', 'char-count'],
};

export const p59A: ProblemEntry = {
  id: '59A',
  contestId: 59,
  index: 'A',
  name: 'Word',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('Count, compare, then transform: the three steps of many string tasks.', 'গোনা, তুলনা, তারপর রূপান্তর: অনেক স্ট্রিং কাজের তিনটি ধাপ।'),
  statement: L(
    'A word mixes uppercase and lowercase letters. If it has strictly more uppercase letters than lowercase ones, write the whole word in uppercase; otherwise write it in lowercase.',
    'একটি শব্দে বড় আর ছোট হাতের অক্ষর মেশানো। এতে ছোট হাতের চেয়ে কঠোরভাবে বেশি বড় হাতের অক্ষর থাকলে পুরো শব্দ বড় হাতের লিখুন; না হলে ছোট হাতের লিখুন।',
  ),
  input: L('One word, length 1 to 100.', 'একটি শব্দ, দৈর্ঘ্য ১ থেকে ১০০।'),
  output: L('The corrected word.', 'সংশোধিত শব্দ।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('A tie goes to lowercase.', 'সমান হলে ছোট হাতের।')] },
  samples: [
    { input: 'HoUse', output: 'house', explain: L('2 upper, 3 lower.', '২টি বড়, ৩টি ছোট।') },
    { input: 'ViP', output: 'VIP', explain: L('2 upper, 1 lower.', '২টি বড়, ১টি ছোট।') },
    { input: 'maTRIx', output: 'matrix', explain: L('3 and 3: a tie, so lowercase.', '৩ আর ৩: সমান, তাই ছোট হাতের।') },
  ],
  observation: L('Only the count of uppercase letters matters; lowercase is the length minus that.', 'শুধু বড় হাতের অক্ষরের সংখ্যা গুরুত্বপূর্ণ; ছোট হাতের হলো দৈর্ঘ্য বিয়োগ সেটি।'),
  approach: [L('Count uppercase letters, decide, and convert every character.', 'বড় হাতের অক্ষর গুনে সিদ্ধান্ত নিন, তারপর প্রতিটি অক্ষর রূপান্তর করুন।')],
  walkthrough: {
    input: 'maTRIx',
    steps: [
      { state: 'upper = 3', text: L('T, R, I.', 'T, R, I।') },
      { state: '3 > 3? no', text: L('Lowercase: matrix.', 'ছোট হাতের: matrix।') },
    ],
  },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('Two passes over the word.', 'শব্দের ওপর দুবার যাওয়া।') },
  solutions: [
    {
      id: 'count',
      kind: 'method',
      title: L('Count with isupper, then convert', 'isupper দিয়ে গুনে রূপান্তর'),
      idea: L('upper > n − upper decides the case of the whole word.', 'upper > n − upper পুরো শব্দের রূপ ঠিক করে।'),
      explain: [L('The strict comparison handles the tie rule for free: when the counts are equal the condition is false and the word becomes lowercase. Writing the count of lowercase letters as n − upper saves a second counter.', 'কঠোর তুলনা সমান হওয়ার নিয়ম আপনাআপনি সামলায়: গণনা সমান হলে শর্ত মিথ্যা আর শব্দ ছোট হাতের হয়। ছোট হাতের গণনাকে n − upper লিখলে দ্বিতীয় কাউন্টার লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int upper = 0;
    for (char c : s) if (isupper(c)) upper++;
    bool toUpper = upper > (int)s.size() - upper;
    for (char& c : s) c = toUpper ? toupper(c) : tolower(c);
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'ternary'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('count_if and transform', 'count_if আর transform'),
      idea: L('count_if counts uppercase letters; transform applies ::toupper or ::tolower to the whole string.', 'count_if বড় হাতের অক্ষর গোনে; transform পুরো স্ট্রিংয়ে ::toupper বা ::tolower প্রয়োগ করে।'),
      explain: [L('Both algorithms take a range and a function. Passing ::toupper or ::tolower as the function picks the conversion in one place, without a loop body.', 'দুটি অ্যালগরিদমই একটি পরিসর আর একটি ফাংশন নেয়। ফাংশন হিসেবে ::toupper বা ::tolower দিলে লুপের ভেতর ছাড়াই এক জায়গায় রূপান্তর বাছাই হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int upper = count_if(s.begin(), s.end(), [](unsigned char c) { return isupper(c); });
    if (2 * upper > (int)s.size()) transform(s.begin(), s.end(), s.begin(), ::toupper);
    else transform(s.begin(), s.end(), s.begin(), ::tolower);
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'lambda'],
    },
  ],
  tests: [
    { input: 'HoUse', output: 'house', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'ViP', output: 'VIP', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'maTRIx', output: 'matrix', source: 'sample', note: L('A tie.', 'সমান।') },
    { input: 'A', output: 'A', source: 'own', note: L('One uppercase letter.', 'একটি বড় হাতের অক্ষর।') },
  ],
  pitfalls: [L('Using ≥: a tie must give lowercase.', '≥ ব্যবহার: সমান হলে ছোট হাতের হতে হবে।')],
  related: [{ id: '112A', name: 'Petya and Strings', why: L('Case-insensitive comparison.', 'বড়-ছোট উপেক্ষা করে তুলনা।') }],
  toolkit: ['string-basics', 'count-find'],
};

export const p520A: ProblemEntry = {
  id: '520A',
  contestId: 520,
  index: 'A',
  name: 'Pangram',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('“Does every letter appear?”: a presence check over a fixed alphabet.', '“প্রতিটি অক্ষর কি আছে?”: নির্দিষ্ট বর্ণমালার ওপর উপস্থিতি পরীক্ষা।'),
  statement: L(
    'A string of n Latin letters is a pangram if every letter of the alphabet appears in it at least once, in uppercase or lowercase. Print YES if it is a pangram and NO otherwise.',
    'n-টি ল্যাটিন অক্ষরের একটি স্ট্রিং প্যানগ্রাম, যদি বর্ণমালার প্রতিটি অক্ষর বড় বা ছোট হাতে অন্তত একবার এতে থাকে। প্যানগ্রাম হলে YES, না হলে NO প্রিন্ট করুন।',
  ),
  input: L('n, then the string.', 'n, তারপর স্ট্রিং।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 100', '১ ≤ n ≤ ১০০')] },
  samples: [
    { input: '12\ntoosmallword', output: 'NO', explain: L('Too few letters to cover 26.', '২৬টি ঢাকতে খুব কম অক্ষর।') },
    { input: '35\nTheQuickBrownFoxJumpsOverTheLazyDog', output: 'YES', explain: L('The classic pangram.', 'বিখ্যাত প্যানগ্রাম।') },
  ],
  observation: L('Lowercase each letter and record it; the answer is YES exactly when 26 different letters were recorded.', 'প্রতিটি অক্ষর ছোট হাতের করে লিখে রাখুন; ২৬টি আলাদা অক্ষর লেখা হলেই উত্তর YES।'),
  approach: [L('Mark letters in a 26-slot array or a set, then check that all 26 are present.', '২৬ ঘরের অ্যারে বা set-এ অক্ষর চিহ্নিত করুন, তারপর দেখুন ২৬টিই আছে কি না।')],
  walkthrough: { input: '12\ntoosmallword', steps: [{ state: 'distinct = 9', text: L('t, o, s, m, a, l, w, r, d: fewer than 26. NO.', 't, o, s, m, a, l, w, r, d: ২৬-এর কম। NO।') }] },
  complexity: { time: 'O(n)', space: 'O(26)', why: L('One pass, fixed alphabet.', 'একবার যাওয়া, নির্দিষ্ট বর্ণমালা।') },
  solutions: [
    {
      id: 'set',
      kind: 'method',
      title: L('A set of lowercase letters', 'ছোট হাতের অক্ষরের set'),
      idea: L('Insert tolower(c) for every c; check the set has size 26.', 'প্রতিটি c-এর জন্য tolower(c) ঢোকান; set-এর আকার ২৬ কি না দেখুন।'),
      explain: [L('The set removes duplicates, and lowercasing merges A with a. Since only letters appear, size 26 means the whole alphabet.', 'set ডুপ্লিকেট বাদ দেয়, আর ছোট হাতের করলে A আর a মিলে যায়। যেহেতু শুধু অক্ষর আছে, আকার ২৬ মানে পুরো বর্ণমালা।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    set<char> letters;
    for (char c : s) letters.insert(tolower(c));
    cout << (letters.size() == 26 ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n log 26)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['set'],
    },
    {
      id: 'array',
      kind: 'alt',
      title: L('A seen[26] array and all_of', 'seen[26] অ্যারে আর all_of'),
      idea: L('Mark seen[tolower(c) − \'a\'] and test that every slot is marked.', 'seen[tolower(c) − \'a\'] চিহ্নিত করে দেখুন প্রতিটি ঘর চিহ্নিত কি না।'),
      explain: [L('This checks the definition directly: for every letter of the alphabet, was it seen? std::all_of states that in one line and returns false at the first missing letter.', 'এটি সংজ্ঞাটি সরাসরি যাচাই করে: বর্ণমালার প্রতিটি অক্ষর কি দেখা গেছে? std::all_of এক লাইনে তা বলে আর প্রথম অনুপস্থিত অক্ষরেই false দেয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    array<bool, 26> seen{};
    for (char c : s) seen[tolower(c) - 'a'] = true;
    bool all = all_of(seen.begin(), seen.end(), [](bool b) { return b; });
    cout << (all ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(26)',
      accepted: true,
      toolkit: ['char-count', 'ranges-any-of'],
    },
  ],
  tests: [
    { input: '12\ntoosmallword', output: 'NO', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '35\nTheQuickBrownFoxJumpsOverTheLazyDog', output: 'YES', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '26\nABCDEFGHIJKLMNOPQRSTUVWXYz', output: 'YES', source: 'own', note: L('Mixed case, exactly 26.', 'মেশানো, ঠিক ২৬টি।') },
    { input: '26\nabcdefghijklmnopqrstuvwxyy', output: 'NO', source: 'own', note: L('Missing z.', 'z অনুপস্থিত।') },
  ],
  pitfalls: [L('Forgetting that A and a are the same letter.', 'ভুলে যাওয়া যে A আর a একই অক্ষর।')],
  related: [{ id: '236A', name: 'Boy or Girl', why: L('Counting distinct letters.', 'ভিন্ন অক্ষর গোনা।') }],
  toolkit: ['set', 'char-count'],
};

export const p41A: ProblemEntry = {
  id: '41A',
  contestId: 41,
  index: 'A',
  name: 'Translation',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('Reversing a string, and checking a string against its mirror.', 'স্ট্রিং উল্টানো, আর একটি স্ট্রিংকে এর প্রতিবিম্বের সঙ্গে মেলানো।'),
  statement: L('A word s is translated into the other language by writing it backwards. Given s and a proposed translation t, print YES if t is s reversed and NO otherwise.', 'একটি শব্দ s-কে উল্টো করে লিখলে অন্য ভাষায় অনুবাদ হয়। s আর একটি প্রস্তাবিত অনুবাদ t দেওয়া আছে; t যদি s-এর উল্টো হয় তবে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('Two lines: s and t.', 'দুটি লাইন: s আর t।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Lengths up to 100', 'দৈর্ঘ্য সর্বোচ্চ ১০০')] },
  samples: [
    { input: 'code\nedoc', output: 'YES', explain: L('edoc is code backwards.', 'edoc হলো code-এর উল্টো।') },
    { input: 'abb\naba', output: 'NO', explain: L('abb reversed is bba.', 'abb উল্টালে bba।') },
    { input: 'code\ncode', output: 'NO', explain: L('Not reversed.', 'উল্টো নয়।') },
  ],
  observation: L('t must equal reverse(s), including having the same length.', 't-কে reverse(s)-এর সমান হতে হবে, দৈর্ঘ্যসহ।'),
  approach: [L('Reverse s and compare, or compare s[i] with t[n − 1 − i] directly.', 's উল্টে তুলনা করুন, অথবা সরাসরি s[i]-কে t[n − ১ − i]-এর সঙ্গে মেলান।')],
  walkthrough: { input: 'abb\naba', steps: [{ state: 'bba ≠ aba', text: L('Print NO.', 'প্রিন্ট NO।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One reverse and one comparison.', 'একবার উল্টানো আর একবার তুলনা।') },
  solutions: [
    {
      id: 'reverse',
      kind: 'stl',
      title: L('Build the reverse with rbegin/rend', 'rbegin/rend দিয়ে উল্টো বানানো'),
      idea: L('string(s.rbegin(), s.rend()) is s backwards; compare it with t.', 'string(s.rbegin(), s.rend()) হলো s উল্টো; এটি t-এর সঙ্গে তুলনা করুন।'),
      explain: [L('Reverse iterators walk a container from the end to the start, so constructing a string from them produces the reversal in one expression. == also checks the lengths.', 'রিভার্স ইটারেটর কনটেইনারের শেষ থেকে শুরুতে যায়, তাই এদের থেকে স্ট্রিং বানালে এক এক্সপ্রেশনেই উল্টো পাওয়া যায়। == দৈর্ঘ্যও যাচাই করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    cout << (string(s.rbegin(), s.rend()) == t ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['reverse-unique', 'string-basics'],
    },
    {
      id: 'two-ends',
      kind: 'method',
      title: L('Compare from both ends', 'দুই প্রান্ত থেকে তুলনা'),
      idea: L('After checking the lengths, s[i] must equal t[n − 1 − i] for every i.', 'দৈর্ঘ্য মেলানোর পর প্রতিটি i-তে s[i]-কে t[n − ১ − i]-এর সমান হতে হবে।'),
      explain: [L('No extra string is built. The index n − 1 − i is the mirror of i; this pairing is the same one used to test palindromes.', 'বাড়তি কোনো স্ট্রিং বানানো হয় না। ইনডেক্স n − ১ − i হলো i-এর প্রতিবিম্ব; প্যালিনড্রোম পরীক্ষাতেও একই জোড়া ব্যবহার হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    cin >> s >> t;
    bool ok = s.size() == t.size();
    int n = s.size();
    for (int i = 0; ok && i < n; i++)
        if (s[i] != t[n - 1 - i]) ok = false;
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: 'code\nedoc', output: 'YES', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'abb\naba', output: 'NO', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'code\ncode', output: 'NO', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: 'abc\ncb', output: 'NO', source: 'own', note: L('Different lengths.', 'ভিন্ন দৈর্ঘ্য।') },
    { input: 'aba\naba', output: 'YES', source: 'own', note: L('A palindrome is its own translation.', 'প্যালিনড্রোম নিজেই নিজের অনুবাদ।') },
  ],
  pitfalls: [L('Indexing t[n − 1 − i] without first checking that the lengths match.', 'দৈর্ঘ্য মেলে কি না না দেখেই t[n − ১ − i] ইনডেক্স করা।')],
  related: [{ id: '131A', name: 'cAPS lOCK', why: L('Another string rule.', 'আরেকটি স্ট্রিং নিয়ম।') }],
  toolkit: ['reverse-unique'],
};

export const p734A: ProblemEntry = {
  id: '734A',
  contestId: 734,
  index: 'A',
  name: 'Anton and Danik',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('Counting two kinds of characters and comparing: a three-way outcome.', 'দুই ধরনের অক্ষর গুনে তুলনা: তিনমুখী ফলাফল।'),
  statement: L('Anton and Danik played n games; the string records the winner of each game as A or D. Print Anton if Anton won more games, Danik if Danik won more, and Friendship if they won equally many.', 'অ্যান্টন আর দানিক n-টি খেলা খেলেছে; স্ট্রিংয়ে প্রতিটি খেলার বিজয়ী A বা D হিসেবে লেখা। অ্যান্টন বেশি জিতলে Anton, দানিক বেশি জিতলে Danik, আর সমান হলে Friendship প্রিন্ট করুন।'),
  input: L('n, then a string of n characters A or D.', 'n, তারপর A বা D-এর n অক্ষরের স্ট্রিং।'),
  output: L('Anton, Danik or Friendship.', 'Anton, Danik অথবা Friendship।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100000', '১ ≤ n ≤ ১০০০০০')] },
  samples: [
    { input: '6\nADAAAA', output: 'Anton', explain: L('5 to 1.', '৫ বনাম ১।') },
    { input: '7\nDDDAADA', output: 'Danik', explain: L('4 to 3 for Danik.', 'দানিকের ৪ বনাম ৩।') },
    { input: '6\nDADADA', output: 'Friendship', explain: L('3 each.', 'প্রত্যেকের ৩।') },
  ],
  observation: L('Count A; D is n minus that. Then compare.', 'A গুনুন; D হলো n বিয়োগ সেটি। তারপর তুলনা করুন।'),
  approach: [L('Count, then an if / else if / else chain for the three outcomes.', 'গুনে তিনটি ফলাফলের জন্য if / else if / else শৃঙ্খল।')],
  walkthrough: { input: '7\nDDDAADA', steps: [{ state: 'a = 3, d = 4', text: L('d > a: Danik.', 'd > a: Danik।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'loop',
      kind: 'method',
      title: L('Count in a loop', 'লুপে গোনা'),
      idea: L('Increment a or d for each character, then compare.', 'প্রতিটি অক্ষরে a বা d বাড়িয়ে তুলনা করুন।'),
      explain: [L('With three outcomes, check the two strict cases first and let else catch the tie. This order avoids writing the equality test at all.', 'তিনটি ফলাফলে আগে দুটি কঠোর কেস দেখুন আর সমান হওয়াটা else-কে ধরতে দিন। এই ক্রমে সমতার পরীক্ষা লিখতেই হয় না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    int a = 0, d = 0;
    for (char c : s) (c == 'A' ? a : d)++;
    if (a > d) cout << "Anton\n";
    else if (d > a) cout << "Danik\n";
    else cout << "Friendship\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['ternary'],
    },
    {
      id: 'count',
      kind: 'stl',
      title: L('std::count', 'std::count'),
      idea: L('a = count(s, \'A\'), d = n − a.', 'a = count(s, \'A\'), d = n − a।'),
      explain: [L('std::count does the loop for you. Because the string holds only two kinds of letters, one count is enough.', 'std::count আপনার হয়ে লুপটি চালায়। স্ট্রিংয়ে শুধু দুই ধরনের অক্ষর থাকায় একটি গণনাই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    string s;
    cin >> n >> s;
    int a = count(s.begin(), s.end(), 'A'), d = n - a;
    cout << (a > d ? "Anton" : d > a ? "Danik" : "Friendship") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['count-find', 'ternary'],
    },
  ],
  tests: [
    { input: '6\nADAAAA', output: 'Anton', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '7\nDDDAADA', output: 'Danik', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '6\nDADADA', output: 'Friendship', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: '1\nD', output: 'Danik', source: 'own', note: L('One game.', 'একটি খেলা।') },
  ],
  pitfalls: [L('Misspelling Friendship or the names.', 'Friendship বা নামগুলোর বানান ভুল।')],
  related: [{ id: '236A', name: 'Boy or Girl', why: L('Count, then decide.', 'গুনে সিদ্ধান্ত।') }],
  toolkit: ['count-find'],
};

export const p131A: ProblemEntry = {
  id: '131A',
  contestId: 131,
  index: 'A',
  name: 'cAPS lOCK',
  rating: 1000,
  tags: ['implementation', 'strings'],
  why: L('A condition over “all characters except the first”, which is easy to get subtly wrong.', '“প্রথমটি ছাড়া সব অক্ষর”-এর ওপর শর্ত, যা সূক্ষ্মভাবে ভুল করা সহজ।'),
  statement: L('A word was probably typed with Caps Lock on by accident if it is entirely uppercase, or if everything except its first letter is uppercase. In that case, swap the case of every letter; otherwise print the word unchanged.', 'একটি শব্দ সম্ভবত ভুল করে Caps Lock চালু রেখে লেখা, যদি এটি পুরোটাই বড় হাতের হয়, অথবা প্রথম অক্ষর ছাড়া বাকি সব বড় হাতের হয়। সেক্ষেত্রে প্রতিটি অক্ষরের বড়-ছোট উল্টে দিন; না হলে শব্দটি অপরিবর্তিত প্রিন্ট করুন।'),
  input: L('One word, length 1 to 100.', 'একটি শব্দ, দৈর্ঘ্য ১ থেকে ১০০।'),
  output: L('The word after the rule.', 'নিয়ম প্রয়োগের পর শব্দ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('A single letter always qualifies.', 'একটি অক্ষর সবসময় যোগ্য।')] },
  samples: [
    { input: 'cAPS', output: 'Caps', explain: L('All but the first are uppercase.', 'প্রথমটি ছাড়া সব বড় হাতের।') },
    { input: 'Lock', output: 'Lock', explain: L('o, c, k are lowercase, so unchanged.', 'o, c, k ছোট হাতের, তাই অপরিবর্তিত।') },
  ],
  observation: L('Both conditions say the same thing about s[1..]: every letter from index 1 on is uppercase. The first letter can be anything.', 'দুটি শর্তই s[1..] সম্পর্কে একই কথা বলে: ইনডেক্স ১ থেকে প্রতিটি অক্ষর বড় হাতের। প্রথম অক্ষর যা খুশি হতে পারে।'),
  approach: [L('Check that s[1..] is all uppercase; if so, swap the case of every letter.', 's[1..] পুরোটা বড় হাতের কি না দেখুন; হলে প্রতিটি অক্ষরের বড়-ছোট উল্টে দিন।')],
  walkthrough: { input: 'cAPS', steps: [{ state: 'APS all upper', text: L('Swap: c→C, A→a, P→p, S→s. Caps.', 'উল্টানো: c→C, A→a, P→p, S→s। Caps।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One check and one pass.', 'একটি পরীক্ষা আর একবার যাওয়া।') },
  solutions: [
    {
      id: 'loop',
      kind: 'method',
      title: L('Check from index 1, then swap', 'ইনডেক্স ১ থেকে দেখে উল্টানো'),
      idea: L('ok stays true only if every character from index 1 is uppercase.', 'ইনডেক্স ১ থেকে প্রতিটি অক্ষর বড় হাতের হলে তবেই ok সত্য থাকে।'),
      explain: [L('Merging the two conditions avoids a long if. A one-letter word has nothing after index 0, so the loop does not run and ok stays true, which matches the rule: “z” becomes “Z”.', 'দুটি শর্ত মিলিয়ে দিলে লম্বা if লাগে না। এক অক্ষরের শব্দে ইনডেক্স ০-এর পর কিছু নেই, তাই লুপ চলে না আর ok সত্য থাকে, যা নিয়মের সঙ্গে মেলে: “z” হয় “Z”।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    bool ok = true;
    for (size_t i = 1; i < s.size(); i++)
        if (!isupper(s[i])) ok = false;
    if (ok)
        for (char& c : s) c = isupper(c) ? tolower(c) : toupper(c);
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'ternary'],
    },
    {
      id: 'stl',
      kind: 'stl',
      title: L('all_of and the XOR case flip', 'all_of আর XOR দিয়ে বড়-ছোট উল্টানো'),
      idea: L('all_of(s.begin() + 1, s.end(), isupper); then c ^= 32 flips the case of a letter.', 'all_of(s.begin() + ১, s.end(), isupper); তারপর c ^= 32 একটি অক্ষরের বড়-ছোট উল্টায়।'),
      explain: [L('Uppercase and lowercase letters differ only in bit 5 (value 32): A is 65 and a is 97. XOR with 32 flips that bit, turning one into the other without any branch.', 'বড় আর ছোট হাতের অক্ষর শুধু বিট ৫-এ (মান ৩২) আলাদা: A হলো ৬৫ আর a হলো ৯৭। ৩২ দিয়ে XOR সেই বিট উল্টায়, কোনো শর্ত ছাড়াই একটিকে অন্যটিতে বদলায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    if (all_of(s.begin() + 1, s.end(), [](unsigned char c) { return isupper(c); }))
        for (char& c : s) c ^= 32;
    cout << s << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['ranges-any-of', 'bitwise-and'],
    },
  ],
  tests: [
    { input: 'cAPS', output: 'Caps', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: 'Lock', output: 'Lock', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: 'z', output: 'Z', source: 'own', note: L('A single letter.', 'একটি অক্ষর।') },
    { input: 'HTTP', output: 'http', source: 'own', note: L('All uppercase.', 'সব বড় হাতের।') },
    { input: 'aBc', output: 'aBc', source: 'own', note: L('A lowercase letter after index 0.', 'ইনডেক্স ০-এর পর একটি ছোট হাতের অক্ষর।') },
  ],
  pitfalls: [L('Forgetting the single-letter case.', 'এক অক্ষরের কেস ভুলে যাওয়া।'), L('Lowercasing everything instead of swapping: cAPS must become Caps.', 'উল্টানোর বদলে সব ছোট হাতের করা: cAPS-কে Caps হতে হবে।')],
  related: [{ id: '281A', name: 'Word Capitalization', why: L('A simpler case rule.', 'সহজ বড়-ছোট নিয়ম।') }],
  toolkit: ['string-basics', 'bitwise-and'],
};

export const p96A: ProblemEntry = {
  id: '96A',
  contestId: 96,
  index: 'A',
  name: 'Football',
  rating: 900,
  tags: ['implementation', 'strings'],
  why: L('The longest run of equal characters, a pattern that keeps coming back.', 'সমান অক্ষরের সবচেয়ে লম্বা ধারা, যে প্যাটার্ন বারবার ফিরে আসে।'),
  statement: L('Player positions are written as a string of 0s and 1s, one character per player, showing their team. The situation is dangerous if at least 7 players of the same team stand in a row. Print YES if it is dangerous and NO otherwise.', 'খেলোয়াড়দের অবস্থান ০ আর ১-এর স্ট্রিং হিসেবে লেখা, প্রতি খেলোয়াড়ে একটি অক্ষর, তার দল বোঝায়। একই দলের অন্তত ৭ জন পরপর দাঁড়ালে পরিস্থিতি বিপজ্জনক। বিপজ্জনক হলে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('A string of 0s and 1s, length up to 100.', '০ আর ১-এর স্ট্রিং, দৈর্ঘ্য সর্বোচ্চ ১০০।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Both teams appear at least once.', 'দুটি দলই অন্তত একবার আছে।')] },
  samples: [
    { input: '001001', output: 'NO', explain: L('Longest run is 2.', 'সবচেয়ে লম্বা ধারা ২।') },
    { input: '1000000001', output: 'YES', explain: L('Eight 0s in a row.', 'পরপর আটটি ০।') },
  ],
  observation: L('Keep the length of the current run; it resets to 1 whenever the character changes.', 'চলতি ধারার দৈর্ঘ্য রাখুন; অক্ষর বদলালেই এটি ১-এ ফেরে।'),
  approach: [L('Track the current run and report YES as soon as it reaches 7.', 'চলতি ধারা গুনুন আর ৭-এ পৌঁছালেই YES বলুন।')],
  walkthrough: { input: '1000000001', steps: [{ state: 'run of 0 = 7', text: L('Reached at index 7: YES.', 'ইনডেক্স ৭-এ পৌঁছায়: YES।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'run',
      kind: 'method',
      title: L('Count the current run', 'চলতি ধারা গোনা'),
      idea: L('run = s[i] == s[i − 1] ? run + 1 : 1; dangerous when run ≥ 7.', 'run = s[i] == s[i − ১] ? run + ১ : ১; run ≥ ৭ হলে বিপজ্জনক।'),
      explain: [L('This run-length counter is the general tool for “longest block of equal elements”. It looks only at the previous character, so it works on streams too.', 'এই ধারা-দৈর্ঘ্য কাউন্টার “সমান উপাদানের সবচেয়ে লম্বা ব্লক”-এর সাধারণ হাতিয়ার। এটি শুধু আগের অক্ষর দেখে, তাই একটানা আসা ডেটাতেও কাজ করে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int run = 1;
    bool danger = false;
    for (size_t i = 1; i < s.size(); i++) {
        run = s[i] == s[i - 1] ? run + 1 : 1;
        if (run >= 7) danger = true;
    }
    cout << (danger ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop', 'ternary'],
    },
    {
      id: 'find',
      kind: 'stl',
      title: L('Search for 0000000 or 1111111', '0000000 বা 1111111 খোঁজা'),
      idea: L('Seven in a row exists exactly when one of these substrings appears.', 'পরপর সাতটি থাকে ঠিক তখনই যখন এই দুটি সাবস্ট্রিংয়ের একটি আছে।'),
      explain: [L('A run of 7 or more always contains seven equal characters in a row, so string::find for both patterns answers the question. When the pattern is fixed and short, searching for it is often the simplest code.', '৭ বা তার বেশি লম্বা ধারায় সবসময় পরপর সাতটি সমান অক্ষর থাকে, তাই দুটি প্যাটার্নের জন্য string::find প্রশ্নের উত্তর দেয়। প্যাটার্ন নির্দিষ্ট আর ছোট হলে সেটি খোঁজাই প্রায়ই সবচেয়ে সহজ কোড।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    bool danger = s.find("0000000") != string::npos || s.find("1111111") != string::npos;
    cout << (danger ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics', 'count-find'],
    },
  ],
  tests: [
    { input: '001001', output: 'NO', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '1000000001', output: 'YES', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '01111110', output: 'NO', source: 'own', note: L('Exactly six.', 'ঠিক ছয়টি।') },
    { input: '11111110', output: 'YES', source: 'own', note: L('Exactly seven at the start.', 'শুরুতে ঠিক সাতটি।') },
  ],
  pitfalls: [L('Using > 7 instead of ≥ 7.', '≥ ৭-এর বদলে > ৭ ব্যবহার।'), L('Starting the run counter at 0.', 'ধারা কাউন্টার ০ থেকে শুরু করা।')],
  related: [{ id: '266A', name: 'Stones on the Table', why: L('Also about neighbouring equal characters.', 'এটিও পাশাপাশি সমান অক্ষর নিয়ে।') }],
  toolkit: ['string-basics'],
};

export const p339A: ProblemEntry = {
  id: '339A',
  contestId: 339,
  index: 'A',
  name: 'Helpful Maths',
  rating: 800,
  tags: ['greedy', 'implementation', 'sortings', 'strings'],
  why: L('Parse, sort, and rebuild a string: the round trip between text and numbers.', 'পার্স, সর্ট, আর আবার স্ট্রিং বানানো: টেক্সট আর সংখ্যার মধ্যে আসা-যাওয়া।'),
  statement: L('A sum like 3+2+1 uses only the numbers 1, 2 and 3. Rewrite it so the summands are in non-decreasing order, keeping the plus signs between them.', '৩+২+১-এর মতো একটি যোগফলে শুধু ১, ২ আর ৩ সংখ্যা আছে। যোগ্য সংখ্যাগুলো ছোট থেকে বড় ক্রমে সাজিয়ে আবার লিখুন, মাঝে যোগ চিহ্ন রেখে।'),
  input: L('One string, length up to 100, with no spaces.', 'একটি স্ট্রিং, দৈর্ঘ্য সর্বোচ্চ ১০০, কোনো স্পেস নেই।'),
  output: L('The sorted sum.', 'সাজানো যোগফল।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Every summand is 1, 2 or 3.', 'প্রতিটি যোগ্য সংখ্যা ১, ২ বা ৩।')] },
  samples: [
    { input: '3+2+1', output: '1+2+3', explain: L('Sorted digits.', 'সাজানো অঙ্ক।') },
    { input: '1+1+3+1+3', output: '1+1+1+3+3', explain: L('Duplicates stay.', 'ডুপ্লিকেট থাকে।') },
    { input: '2', output: '2', explain: L('A single number.', 'একটি সংখ্যা।') },
  ],
  observation: L('The digits sit at the even positions 0, 2, 4, …; sort those and join them with +.', 'অঙ্কগুলো জোড় অবস্থান ০, ২, ৪, …-এ বসে; সেগুলো সর্ট করে + দিয়ে জোড়া দিন।'),
  approach: [L('Collect the digits, sort them, and print them separated by +.', 'অঙ্কগুলো জড়ো করে সর্ট করুন, তারপর + দিয়ে আলাদা করে প্রিন্ট করুন।')],
  walkthrough: { input: '3+2+1', steps: [{ state: '[3, 2, 1] → [1, 2, 3]', text: L('Join: 1+2+3.', 'জোড়া: ১+২+৩।') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('Sorting the digits.', 'অঙ্কগুলো সর্ট।') },
  solutions: [
    {
      id: 'sort',
      kind: 'method',
      title: L('Extract, sort, join', 'বের করা, সর্ট, জোড়া'),
      idea: L('Take s[0], s[2], …, sort them, and print with + between.', 's[0], s[2], … নিয়ে সর্ট করুন, মাঝে + দিয়ে প্রিন্ট করুন।'),
      explain: [L('Printing the separator before every element except the first is the standard way to join; it avoids a trailing +.', 'প্রথমটি ছাড়া প্রতিটি উপাদানের আগে বিভাজক প্রিন্ট করাই জোড়া দেওয়ার প্রচলিত উপায়; এতে শেষে বাড়তি + আসে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    string d;
    for (size_t i = 0; i < s.size(); i += 2) d += s[i];
    sort(d.begin(), d.end());
    for (size_t i = 0; i < d.size(); i++) {
        if (i) cout << '+';
        cout << d[i];
    }
    cout << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['sort', 'string-basics'],
    },
    {
      id: 'count',
      kind: 'better',
      title: L('Count 1s, 2s and 3s', '১, ২ আর ৩ গোনা'),
      idea: L('Only three values exist, so count them and print each the right number of times.', 'শুধু তিনটি মান আছে, তাই সেগুলো গুনে প্রতিটি সঠিক সংখ্যক বার প্রিন্ট করুন।'),
      explain: [L('This is counting sort with three buckets. It is O(n) and shows why a sort is unnecessary when the set of values is tiny.', 'এটি তিনটি বালতির কাউন্টিং সর্ট। এটি O(n), আর দেখায় যে মানের সেট খুব ছোট হলে সর্ট দরকার নেই।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int cnt[4] = {};
    for (char c : s) if (c != '+') cnt[c - '0']++;
    string out;
    for (int v = 1; v <= 3; v++)
        for (int k = 0; k < cnt[v]; k++) {
            if (!out.empty()) out += '+';
            out += char('0' + v);
        }
    cout << out << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['char-count'],
    },
  ],
  tests: [
    { input: '3+2+1', output: '1+2+3', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '1+1+3+1+3', output: '1+1+1+3+3', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '2', output: '2', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: '3+3+3', output: '3+3+3', source: 'own', note: L('All the same.', 'সব একই।') },
  ],
  pitfalls: [L('Sorting the whole string, which moves the + signs to the front.', 'পুরো স্ট্রিং সর্ট করা, যাতে + চিহ্নগুলো সামনে চলে যায়।')],
  related: [{ id: '1360B', name: 'Honest Coach', why: L('Sorting makes the rest easy.', 'সর্ট করলে বাকিটা সহজ।') }],
  toolkit: ['sort', 'char-count'],
};

export const p469A: ProblemEntry = {
  id: '469A',
  contestId: 469,
  index: 'A',
  name: 'I Wanna Be the Guy',
  rating: 800,
  tags: ['greedy', 'implementation'],
  why: L('The union of two lists covers 1..n or not: a set-coverage check.', 'দুটি তালিকার মিলন ১..n ঢাকে কি না: সেট-আবরণ পরীক্ষা।'),
  statement: L('A game has n levels numbered 1 to n. Little X can pass p of them and Little Y can pass q of them. Playing together, can they pass every level? Print “I become the guy.” if yes and “Oh, my keyboard!” otherwise.', 'একটি গেমে ১ থেকে n নম্বরের n-টি লেভেল আছে। Little X এদের p-টি পার করতে পারে আর Little Y q-টি। একসঙ্গে খেললে তারা কি প্রতিটি লেভেল পার করতে পারবে? পারলে “I become the guy.”, না হলে “Oh, my keyboard!” প্রিন্ট করুন।'),
  input: L('n; then p and X’s levels; then q and Y’s levels.', 'n; তারপর p আর X-এর লেভেল; তারপর q আর Y-এর লেভেল।'),
  output: L('One of the two sentences.', 'দুটি বাক্যের একটি।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ n ≤ 100; p or q may be 0', '১ ≤ n ≤ ১০০; p বা q ০ হতে পারে')] },
  samples: [
    { input: '4\n3 1 2 3\n2 2 4', output: 'I become the guy.', explain: L('X covers 1–3, Y covers 4.', 'X ১–৩ ঢাকে, Y ৪ ঢাকে।') },
    { input: '4\n3 1 2 3\n2 2 3', output: 'Oh, my keyboard!', explain: L('Nobody passes level 4.', 'কেউ লেভেল ৪ পার করে না।') },
  ],
  observation: L('Mark every level either player can pass; all n marks must be set.', 'যেকোনো খেলোয়াড় যে লেভেল পার করতে পারে তা চিহ্নিত করুন; n-টি চিহ্নই থাকতে হবে।'),
  approach: [L('Read both lists into one set (or a boolean array) and check its size is n.', 'দুটি তালিকাই একটি set-এ (বা বুলিয়ান অ্যারেতে) পড়ে দেখুন এর আকার n কি না।')],
  walkthrough: { input: '4\n3 1 2 3\n2 2 3', steps: [{ state: '{1, 2, 3}', text: L('Size 3 < 4: Oh, my keyboard!', 'আকার ৩ < ৪: Oh, my keyboard!') }] },
  complexity: { time: 'O(n log n)', space: 'O(n)', why: L('At most 2n insertions.', 'সর্বোচ্চ ২n বার ঢোকানো।') },
  solutions: [
    {
      id: 'set',
      kind: 'method',
      title: L('One set for both players', 'দুজনের জন্য একটি set'),
      idea: L('Insert all levels of both players; covered if the set has n elements.', 'দুজনের সব লেভেল ঢোকান; set-এ n-টি উপাদান থাকলে সব ঢাকা।'),
      explain: [L('A level both can pass is inserted twice but stored once, so the set’s size is the size of the union. Levels are always between 1 and n, so size n means all of them. Reading p first and then exactly p numbers handles p = 0 naturally.', 'যে লেভেল দুজনেই পার করতে পারে সেটি দুবার ঢোকে কিন্তু একবার থাকে, তাই set-এর আকারই মিলনের আকার। লেভেল সবসময় ১ থেকে n-এর মধ্যে, তাই আকার n মানে সবগুলো। আগে p পড়ে তারপর ঠিক p-টি সংখ্যা পড়লে p = ০ আপনাআপনি সামলানো হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> levels;
    for (int player = 0; player < 2; player++) {
        int k;
        cin >> k;
        for (int i = 0; i < k; i++) {
            int x;
            cin >> x;
            levels.insert(x);
        }
    }
    cout << ((int)levels.size() == n ? "I become the guy." : "Oh, my keyboard!") << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['set'],
    },
    {
      id: 'array',
      kind: 'alt',
      title: L('A boolean array and a final scan', 'বুলিয়ান অ্যারে আর শেষে একবার দেখা'),
      idea: L('can[x] = true for each listed level, then check can[1..n].', 'তালিকার প্রতিটি লেভেলের জন্য can[x] = true, তারপর can[১..n] দেখা।'),
      explain: [L('Because levels are small integers, an array indexed by level is simpler and faster than a set. The final loop looks for any level nobody can pass.', 'লেভেলগুলো ছোট পূর্ণসংখ্যা হওয়ায় লেভেল দিয়ে ইনডেক্স করা অ্যারে set-এর চেয়ে সহজ আর দ্রুত। শেষ লুপ এমন কোনো লেভেল খোঁজে যা কেউ পার করতে পারে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<bool> can(n + 1, false);
    for (int player = 0; player < 2; player++) {
        int k;
        cin >> k;
        while (k--) {
            int x;
            cin >> x;
            can[x] = true;
        }
    }
    bool all = true;
    for (int lv = 1; lv <= n; lv++) if (!can[lv]) all = false;
    cout << (all ? "I become the guy." : "Oh, my keyboard!") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
  ],
  tests: [
    { input: '4\n3 1 2 3\n2 2 4', output: 'I become the guy.', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '4\n3 1 2 3\n2 2 3', output: 'Oh, my keyboard!', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '3\n0\n3 1 2 3', output: 'I become the guy.', source: 'own', note: L('X can pass nothing.', 'X কিছুই পার করতে পারে না।') },
    { input: '1\n0\n0', output: 'Oh, my keyboard!', source: 'own', note: L('Neither can play.', 'কেউ খেলতে পারে না।') },
  ],
  pitfalls: [L('Adding p + q and comparing with n: shared levels are counted twice.', 'p + q যোগ করে n-এর সঙ্গে তুলনা: যৌথ লেভেল দুবার গোনা হয়।'), L('Misreading the input when p = 0.', 'p = ০ হলে ইনপুট ভুল পড়া।')],
  related: [{ id: '520A', name: 'Pangram', why: L('Also “is everything covered?”.', 'এটিও “সব কি ঢাকা?”।') }],
  toolkit: ['set', 'vector'],
};

export const p546A: ProblemEntry = {
  id: '546A',
  contestId: 546,
  index: 'A',
  name: 'Soldier and Bananas',
  rating: 800,
  tags: ['brute-force', 'implementation', 'math'],
  why: L('An arithmetic series: a loop works, and so does the closed formula.', 'একটি সমান্তর ধারা: লুপও কাজ করে, বন্ধ সূত্রও।'),
  statement: L('A soldier wants to buy w bananas. The first costs k dollars, the second 2k, and the i-th costs i·k. He has n dollars. How much must he borrow? Print 0 if he has enough.', 'একজন সৈনিক w-টি কলা কিনতে চায়। প্রথমটির দাম k ডলার, দ্বিতীয়টির ২k, আর i-তম কলার দাম i·k। তার কাছে n ডলার আছে। তাকে কত ধার করতে হবে? যথেষ্ট থাকলে ০ প্রিন্ট করুন।'),
  input: L('Three integers k, n, w.', 'তিনটি পূর্ণসংখ্যা k, n, w।'),
  output: L('The amount to borrow.', 'ধারের পরিমাণ।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ k, w ≤ 1000; 0 ≤ n ≤ 10⁹', '১ ≤ k, w ≤ ১০০০; ০ ≤ n ≤ ১০⁹')] },
  samples: [{ input: '3 17 4', output: '13', explain: L('3 + 6 + 9 + 12 = 30; 30 − 17 = 13.', '৩ + ৬ + ৯ + ১২ = ৩০; ৩০ − ১৭ = ১৩।') }],
  observation: L('The total cost is k(1 + 2 + … + w) = k·w(w + 1)/2. Borrow max(0, cost − n).', 'মোট দাম k(১ + ২ + … + w) = k·w(w + ১)/২। ধার max(০, cost − n)।'),
  approach: [L('Compute the cost, subtract n, and clamp at 0.', 'দাম বের করে n বিয়োগ করুন, আর ০-এর নিচে যেতে দেবেন না।')],
  walkthrough: { input: '3 17 4', steps: [{ state: 'cost = 3·4·5/2 = 30', text: L('30 − 17 = 13.', '৩০ − ১৭ = ১৩।') }] },
  complexity: { time: 'O(1)', space: 'O(1)', why: L('A formula.', 'একটি সূত্র।') },
  solutions: [
    {
      id: 'loop',
      kind: 'brute',
      title: L('Add the prices one by one', 'এক এক করে দাম যোগ'),
      idea: L('Sum i·k for i = 1..w.', 'i = ১..w-এর জন্য i·k যোগ করুন।'),
      explain: [L('With w ≤ 1000 the loop is tiny. The total is at most 1000 · 500500 ≈ 5·10⁸, which fits in int, but long long keeps it safe if limits grow.', 'w ≤ ১০০০ হলে লুপটি খুব ছোট। মোট সর্বোচ্চ ১০০০ · ৫০০৫০০ ≈ ৫·১০⁸, যা int-এ আঁটে, কিন্তু সীমা বাড়লে long long নিরাপদ রাখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long k, n, w;
    cin >> k >> n >> w;
    long long cost = 0;
    for (long long i = 1; i <= w; i++) cost += i * k;
    cout << max(0LL, cost - n) << "\n";
    return 0;
}
`,
      time: 'O(w)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop', 'long-long'],
    },
    {
      id: 'formula',
      kind: 'optimal',
      title: L('Arithmetic series formula', 'সমান্তর ধারার সূত্র'),
      idea: L('cost = k · w · (w + 1) / 2.', 'cost = k · w · (w + ১) / ২।'),
      explain: [L('1 + 2 + … + w = w(w + 1)/2: pair the first and last terms, the second and second-to-last, and each pair sums to w + 1. One of w and w + 1 is even, so the division is exact.', '১ + ২ + … + w = w(w + ১)/২: প্রথম আর শেষ পদ, দ্বিতীয় আর শেষের আগের পদ জোড়া করুন, প্রতিটি জোড়ার যোগফল w + ১। w আর w + ১-এর একটি জোড়, তাই ভাগ নিখুঁত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    long long k, n, w;
    cin >> k >> n >> w;
    long long cost = k * w * (w + 1) / 2;
    cout << max(0LL, cost - n) << "\n";
    return 0;
}
`,
      time: 'O(1)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['long-long', 'min-max'],
    },
  ],
  tests: [
    { input: '3 17 4', output: '13', source: 'sample', note: L('The sample.', 'স্যাম্পল।') },
    { input: '1 2 1', output: '0', source: 'own', note: L('He has enough.', 'যথেষ্ট আছে।') },
    { input: '1000 0 1000', output: '500500000', source: 'own', note: L('Largest cost, no money.', 'সবচেয়ে বড় দাম, টাকা নেই।') },
  ],
  pitfalls: [L('Printing a negative number when he has more than enough.', 'বেশি টাকা থাকলে ঋণাত্মক সংখ্যা প্রিন্ট করা।')],
  related: [{ id: '617A', name: 'Elephant', why: L('Another one-line formula.', 'আরেকটি এক লাইনের সূত্র।') }],
  toolkit: ['long-long', 'min-max'],
};

export const p122A: ProblemEntry = {
  id: '122A',
  contestId: 122,
  index: 'A',
  name: 'Lucky Division',
  rating: 1000,
  tags: ['brute-force', 'number-theory'],
  why: L('Generate the candidates first, then test them: brute force over a small, structured set.', 'আগে সম্ভাব্য সংখ্যা বানাও, তারপর যাচাই করো: ছোট, কাঠামোবদ্ধ সেটের ওপর ব্রুট ফোর্স।'),
  statement: L('A lucky number has only the digits 4 and 7, like 4, 47 or 744. A number is almost lucky if some lucky number divides it. Given n, print YES if n is almost lucky and NO otherwise.', 'একটি লাকি সংখ্যায় শুধু ৪ আর ৭ অঙ্ক থাকে, যেমন ৪, ৪৭ বা ৭৪৪। কোনো লাকি সংখ্যা যদি একটি সংখ্যাকে ভাগ করে, তবে সেটি প্রায় লাকি। n দেওয়া আছে; n প্রায় লাকি হলে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('One integer n.', 'একটি পূর্ণসংখ্যা n।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 1000', '১ ≤ n ≤ ১০০০')] },
  samples: [
    { input: '47', output: 'YES', explain: L('47 is lucky and divides itself.', '৪৭ লাকি আর নিজেকে ভাগ করে।') },
    { input: '16', output: 'YES', explain: L('4 divides 16.', '৪ দিয়ে ১৬ বিভাজ্য।') },
    { input: '78', output: 'NO', explain: L('No lucky number divides 78.', 'কোনো লাকি সংখ্যা ৭৮-কে ভাগ করে না।') },
  ],
  observation: L('Any divisor of n is at most n ≤ 1000, so only lucky numbers up to 1000 matter: 4, 7, 44, 47, 74, 77, 444, 447, 474, 477, 744, 747, 774, 777.', 'n-এর যেকোনো ভাজক সর্বোচ্চ n ≤ ১০০০, তাই শুধু ১০০০ পর্যন্ত লাকি সংখ্যাগুলো গুরুত্বপূর্ণ: ৪, ৭, ৪৪, ৪৭, ৭৪, ৭৭, ৪৪৪, ৪৪৭, ৪৭৪, ৪৭৭, ৭৪৪, ৭৪৭, ৭৭৪, ৭৭৭।'),
  approach: [L('Try each lucky number up to n and check n % d == 0.', 'n পর্যন্ত প্রতিটি লাকি সংখ্যা চেষ্টা করে n % d == ০ দেখুন।')],
  walkthrough: { input: '78', steps: [{ state: '78 % 4 = 2, 78 % 7 = 1, …', text: L('Lucky numbers above 78 cannot divide it. NO.', '৭৮-এর বড় লাকি সংখ্যা একে ভাগ করতে পারে না। NO।') }] },
  complexity: { time: 'O(n · digits)', space: 'O(1)', why: L('At most 1000 candidates, each a few digits.', 'সর্বোচ্চ ১০০০টি সম্ভাব্য সংখ্যা, প্রতিটি কয়েক অঙ্কের।') },
  solutions: [
    {
      id: 'scan',
      kind: 'brute',
      title: L('Test every d from 1 to n', '১ থেকে n প্রতিটি d পরীক্ষা'),
      idea: L('For each d that divides n, check whether d is lucky.', 'n-কে ভাগ করে এমন প্রতিটি d-এর জন্য দেখুন d লাকি কি না।'),
      explain: [L('isLucky walks the digits of d and fails on any digit other than 4 or 7. This is the direct reading of the statement and is fast enough for n ≤ 1000.', 'isLucky d-এর অঙ্কগুলো ধরে চলে আর ৪ বা ৭ ছাড়া অন্য কোনো অঙ্কে ব্যর্থ হয়। এটি স্টেটমেন্টের সরাসরি পাঠ, আর n ≤ ১০০০-এর জন্য যথেষ্ট দ্রুত।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

bool isLucky(int d) {
    for (; d > 0; d /= 10)
        if (d % 10 != 4 && d % 10 != 7) return false;
    return true;
}

int main() {
    int n;
    cin >> n;
    bool ok = false;
    for (int d = 1; d <= n; d++)
        if (n % d == 0 && isLucky(d)) ok = true;
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['functions', 'modulo'],
    },
    {
      id: 'generate',
      kind: 'optimal',
      title: L('Generate lucky numbers by appending 4 or 7', '৪ বা ৭ জুড়ে লাকি সংখ্যা বানানো'),
      idea: L('Build all lucky numbers ≤ 1000 with a queue: from x make 10x + 4 and 10x + 7.', 'একটি কিউ দিয়ে ১০০০ পর্যন্ত সব লাকি সংখ্যা বানান: x থেকে 10x + ৪ আর 10x + ৭।'),
      explain: [L('Every lucky number is a shorter lucky number with 4 or 7 appended, so a breadth-first walk from 4 and 7 reaches all of them in increasing length. There are only 14 below 1000, and this generator scales to limits like 10⁹ where scanning would be too slow.', 'প্রতিটি লাকি সংখ্যা হলো ছোট একটি লাকি সংখ্যার শেষে ৪ বা ৭ জোড়া, তাই ৪ আর ৭ থেকে ব্রেডথ-ফার্স্ট চলায় দৈর্ঘ্য অনুযায়ী সবগুলোতে পৌঁছানো যায়। ১০০০-এর নিচে মাত্র ১৪টি, আর এই জেনারেটর ১০⁹-এর মতো সীমাতেও চলে যেখানে সব দেখা খুব ধীর হতো।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    queue<int> q;
    q.push(4);
    q.push(7);
    bool ok = false;
    while (!q.empty()) {
        int x = q.front();
        q.pop();
        if (x > n) continue;
        if (n % x == 0) ok = true;
        q.push(x * 10 + 4);
        q.push(x * 10 + 7);
    }
    cout << (ok ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(2^digits)',
      space: 'O(2^digits)',
      accepted: true,
      toolkit: ['stack-queue', 'modulo'],
    },
  ],
  tests: [
    { input: '47', output: 'YES', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '16', output: 'YES', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '78', output: 'NO', source: 'sample', note: L('Third sample.', 'তৃতীয় স্যাম্পল।') },
    { input: '1', output: 'NO', source: 'own', note: L('Smallest n.', 'সবচেয়ে ছোট n।') },
    { input: '777', output: 'YES', source: 'own', note: L('A three-digit lucky number.', 'তিন অঙ্কের লাকি সংখ্যা।') },
  ],
  pitfalls: [L('Checking only whether n itself is lucky.', 'শুধু n নিজে লাকি কি না দেখা।'), L('Treating 1 as lucky: it has no 4 or 7.', '১-কে লাকি ধরা: এতে ৪ বা ৭ নেই।')],
  related: [{ id: '271A', name: 'Beautiful Year', why: L('Brute force over a small range.', 'ছোট পরিসরে ব্রুট ফোর্স।') }],
  toolkit: ['modulo', 'stack-queue'],
};

export const p69A: ProblemEntry = {
  id: '69A',
  contestId: 69,
  index: 'A',
  name: 'Young Physicist',
  rating: 1000,
  tags: ['implementation', 'math'],
  why: L('Summing vectors component by component: the bridge from physics to code.', 'উপাদান ধরে ভেক্টর যোগ: পদার্থবিদ্যা থেকে কোডের সেতু।'),
  statement: L('n forces act on a body, each given as a vector (x, y, z). The body is in equilibrium if the forces add up to the zero vector. Print YES if it is in equilibrium and NO otherwise.', 'একটি বস্তুর ওপর n-টি বল কাজ করে, প্রতিটি একটি ভেক্টর (x, y, z)। বলগুলোর যোগফল শূন্য ভেক্টর হলে বস্তুটি সাম্যাবস্থায়। সাম্যাবস্থায় থাকলে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('n, then n lines of three integers.', 'n, তারপর তিনটি পূর্ণসংখ্যার n-টি লাইন।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('1 ≤ n ≤ 100; −100 ≤ coordinates ≤ 100', '১ ≤ n ≤ ১০০; −১০০ ≤ স্থানাঙ্ক ≤ ১০০')] },
  samples: [
    { input: '3\n4 1 7\n-2 4 -1\n1 -5 -3', output: 'NO', explain: L('Sum (3, 0, 3).', 'যোগফল (৩, ০, ৩)।') },
    { input: '3\n3 -1 7\n-5 2 -4\n2 -1 -3', output: 'YES', explain: L('Sum (0, 0, 0).', 'যোগফল (০, ০, ০)।') },
  ],
  observation: L('A vector sum is zero exactly when each of its three coordinates sums to zero separately.', 'ভেক্টরের যোগফল শূন্য ঠিক তখনই, যখন এর তিনটি স্থানাঙ্কের প্রতিটির যোগফল আলাদাভাবে শূন্য।'),
  approach: [L('Keep three running sums and check all of them at the end.', 'তিনটি চলতি যোগফল রেখে শেষে সবগুলো দেখুন।')],
  walkthrough: { input: '3\n4 1 7\n-2 4 -1\n1 -5 -3', steps: [{ state: '(3, 0, 3)', text: L('x and z are not zero: NO.', 'x আর z শূন্য নয়: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('Three additions per force.', 'প্রতি বলে তিনটি যোগ।') },
  solutions: [
    {
      id: 'sums',
      kind: 'method',
      title: L('Three running sums', 'তিনটি চলতি যোগফল'),
      idea: L('sx, sy, sz must all be zero.', 'sx, sy, sz সবগুলোকে শূন্য হতে হবে।'),
      explain: [L('A common mistake is checking sx + sy + sz == 0, which passes (1, −1, 0) by accident. Each coordinate has to be zero by itself.', 'একটি প্রচলিত ভুল হলো sx + sy + sz == ০ দেখা, যা (১, −১, ০)-কে ভুল করে পাস করায়। প্রতিটি স্থানাঙ্ককে নিজে থেকেই শূন্য হতে হবে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sx = 0, sy = 0, sz = 0;
    while (n--) {
        int x, y, z;
        cin >> x >> y >> z;
        sx += x;
        sy += y;
        sz += z;
    }
    cout << (sx == 0 && sy == 0 && sz == 0 ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['while-n'],
    },
    {
      id: 'array',
      kind: 'alt',
      title: L('An array of three sums', 'তিনটি যোগফলের অ্যারে'),
      idea: L('s[0..2] and an inner loop over the coordinates.', 's[০..২] আর স্থানাঙ্কের ওপর একটি ভেতরের লুপ।'),
      explain: [L('Storing the sums in an array means the same code works for any number of dimensions; only the 3 changes. all_of then checks every coordinate.', 'যোগফলগুলো অ্যারেতে রাখলে একই কোড যেকোনো মাত্রায় কাজ করে; শুধু ৩ বদলায়। তারপর all_of প্রতিটি স্থানাঙ্ক দেখে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    array<int, 3> s{};
    for (int i = 0; i < n; i++)
        for (int d = 0; d < 3; d++) {
            int v;
            cin >> v;
            s[d] += v;
        }
    bool zero = all_of(s.begin(), s.end(), [](int v) { return v == 0; });
    cout << (zero ? "YES" : "NO") << "\n";
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['ranges-any-of', 'lambda'],
    },
  ],
  tests: [
    { input: '3\n4 1 7\n-2 4 -1\n1 -5 -3', output: 'NO', source: 'sample', note: L('First sample.', 'প্রথম স্যাম্পল।') },
    { input: '3\n3 -1 7\n-5 2 -4\n2 -1 -3', output: 'YES', source: 'sample', note: L('Second sample.', 'দ্বিতীয় স্যাম্পল।') },
    { input: '1\n1 -1 0', output: 'NO', source: 'own', note: L('Coordinates add to zero, but the vector is not zero.', 'স্থানাঙ্কের যোগফল শূন্য, কিন্তু ভেক্টর শূন্য নয়।') },
    { input: '1\n0 0 0', output: 'YES', source: 'own', note: L('One zero force.', 'একটি শূন্য বল।') },
  ],
  pitfalls: [L('Adding all coordinates together instead of per axis.', 'অক্ষ ধরে না করে সব স্থানাঙ্ক একসঙ্গে যোগ করা।')],
  related: [{ id: '546A', name: 'Soldier and Bananas', why: L('More simple arithmetic.', 'আরও সহজ গণিত।') }],
  toolkit: ['while-n', 'ranges-any-of'],
};
