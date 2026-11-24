import type { ProblemEntry } from './types';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });
const sample = (n: number) => L(`Sample ${n}.`, `স্যাম্পল ${'০১২৩৪৫৬৭৮৯'[n]}।`);

export const p1703A: ProblemEntry = {
  id: '1703A',
  contestId: 1703,
  index: 'A',
  name: 'YES or YES?',
  rating: 800,
  tags: ['brute-force', 'implementation', 'strings'],
  why: L('Case-insensitive string comparison in its smallest form.', 'সবচেয়ে ছোট রূপে বড়-ছোট হাতের পার্থক্য উপেক্ষা করে স্ট্রিং তুলনা।'),
  statement: L('For each of t strings of length 3, print YES if it equals “yes” ignoring letter case, and NO otherwise.', 't-টি ৩ দৈর্ঘ্যের স্ট্রিংয়ের প্রতিটির জন্য, বড়-ছোট হাতের অক্ষর উপেক্ষা করে “yes”-এর সমান হলে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('t, then t strings.', 't, তারপর t-টি স্ট্রিং।'),
  output: L('YES or NO for each.', 'প্রতিটির জন্য YES বা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 10³', '১ ≤ t ≤ ১০³')] },
  samples: [{ input: '10\nYES\nyES\nyes\nYes\nYeS\nNoo\norZ\nyEz\nYas\nXES', output: 'YES\nYES\nYES\nYES\nYES\nNO\nNO\nNO\nNO\nNO', explain: L('Every mix of cases of y, e, s works.', 'y, e, s-এর যেকোনো বড়-ছোট মিশ্রণ চলে।') }],
  observation: L('Lowercase the string and compare with "yes".', 'স্ট্রিং ছোট হাতের করে "yes"-এর সঙ্গে তুলনা করুন।'),
  approach: [L('Apply tolower to each character, then ==.', 'প্রতিটি অক্ষরে tolower, তারপর ==।')],
  walkthrough: { input: 'yEz', steps: [{ state: 'yez ≠ yes', text: L('NO.', 'NO।') }] },
  complexity: { time: 'O(t)', space: 'O(1)', why: L('Three characters per string.', 'প্রতি স্ট্রিংয়ে তিনটি অক্ষর।') },
  solutions: [
    {
      id: 'lower',
      kind: 'optimal',
      title: L('Lowercase, then compare', 'ছোট হাতের করে তুলনা'),
      idea: L('Normalise the case first.', 'আগে বড়-ছোট হাতের রূপ এক করুন।'),
      explain: [L('Normalising before comparing is the general recipe for any case-insensitive check: it turns 8 spellings of “yes” into one.', 'তুলনার আগে রূপ এক করা যেকোনো বড়-ছোট উপেক্ষা করা যাচাইয়ের সাধারণ উপায়: “yes”-এর ৮টি বানানকে একটিতে নামায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        for (char& c : s) c = tolower(c);
        cout << (s == "yes" ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(t)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'chars',
      kind: 'method',
      title: L('Check each position', 'প্রতিটি অবস্থান দেখা'),
      idea: L('Position 0 is y or Y, 1 is e or E, 2 is s or S.', 'অবস্থান ০ y বা Y, ১ e বা E, ২ s বা S।'),
      explain: [L('With a fixed short target, comparing each position against both cases is just as clear and needs no conversion.', 'ছোট নির্দিষ্ট লক্ষ্যে প্রতিটি অবস্থানকে দুই রূপের সঙ্গে তুলনা করাও সমান স্পষ্ট, রূপান্তর লাগে না।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        bool ok = (s[0] == 'y' || s[0] == 'Y') && (s[1] == 'e' || s[1] == 'E') && (s[2] == 's' || s[2] == 'S');
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(t)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['string-basics'],
    },
  ],
  tests: [{ input: '10\nYES\nyES\nyes\nYes\nYeS\nNoo\norZ\nyEz\nYas\nXES', output: 'YES\nYES\nYES\nYES\nYES\nNO\nNO\nNO\nNO\nNO', source: 'sample', note: sample(1) }],
  pitfalls: [L('Comparing without normalising case.', 'রূপ এক না করে তুলনা।')],
  related: [{ id: '112A', name: 'Petya and Strings', why: L('Case-insensitive comparison.', 'বড়-ছোট উপেক্ষা করে তুলনা।') }],
  toolkit: ['string-basics'],
};

export const p1619A: ProblemEntry = {
  id: '1619A',
  contestId: 1619,
  index: 'A',
  name: 'Square String?',
  rating: 800,
  tags: ['implementation', 'strings'],
  why: L('A string written twice: compare the two halves.', 'দুবার লেখা একটি স্ট্রিং: দুই অর্ধেক তুলনা।'),
  statement: L('A string is square if it is some string written twice in a row, like “aa” or “abcabc”. For each of t strings, print YES if it is square and NO otherwise.', 'একটি স্ট্রিং বর্গ যদি এটি কোনো স্ট্রিং পরপর দুবার লেখা হয়, যেমন “aa” বা “abcabc”। t-টি স্ট্রিংয়ের প্রতিটির জন্য বর্গ হলে YES, না হলে NO প্রিন্ট করুন।'),
  input: L('t, then t strings of length ≤ 100.', 't, তারপর ≤ ১০০ দৈর্ঘ্যের t-টি স্ট্রিং।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('1 ≤ t ≤ 100', '১ ≤ t ≤ ১০০')] },
  samples: [{ input: '10\na\naa\naaa\naaaa\nabab\nabcabc\nabacaba\nxxyy\nxyyx\nxyxy', output: 'NO\nYES\nNO\nYES\nYES\nYES\nNO\nNO\nNO\nYES', explain: L('Odd lengths are never square.', 'বিজোড় দৈর্ঘ্য কখনো বর্গ নয়।') }],
  observation: L('The length must be even and the first half must equal the second half.', 'দৈর্ঘ্য জোড় হতে হবে আর প্রথম অর্ধেক দ্বিতীয় অর্ধেকের সমান হতে হবে।'),
  approach: [L('Check n % 2 == 0 and s.substr(0, n/2) == s.substr(n/2).', 'n % ২ == ০ আর s.substr(০, n/২) == s.substr(n/২) দেখুন।')],
  walkthrough: { input: 'xyyx', steps: [{ state: '"xy" vs "yx"', text: L('Different: NO.', 'আলাদা: NO।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One comparison.', 'একটি তুলনা।') },
  solutions: [
    {
      id: 'substr',
      kind: 'optimal',
      title: L('Compare the halves', 'অর্ধেক তুলনা'),
      idea: L('substr and ==.', 'substr আর ==।'),
      explain: [L('Checking the length first avoids comparing halves of different sizes.', 'আগে দৈর্ঘ্য দেখলে ভিন্ন আকারের অর্ধেক তুলনা এড়ানো যায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size();
        bool ok = n % 2 == 0 && s.substr(0, n / 2) == s.substr(n / 2);
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['string-basics'],
    },
    {
      id: 'index',
      kind: 'method',
      title: L('s[i] == s[i + n/2]', 's[i] == s[i + n/২]'),
      idea: L('Compare positions i and i + n/2 without building substrings.', 'সাবস্ট্রিং না বানিয়ে অবস্থান i আর i + n/২ তুলনা।'),
      explain: [L('This index pairing is how you check periodicity in general: a string has period p when s[i] = s[i + p] for every valid i.', 'এই ইনডেক্স জোড়াই সাধারণভাবে পর্যায়ক্রমিকতা যাচাইয়ের উপায়: প্রতিটি বৈধ i-এ s[i] = s[i + p] হলে স্ট্রিংটির পর্যায় p।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size();
        bool ok = n % 2 == 0;
        for (int i = 0; ok && i < n / 2; i++)
            if (s[i] != s[i + n / 2]) ok = false;
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [{ input: '10\na\naa\naaa\naaaa\nabab\nabcabc\nabacaba\nxxyy\nxyyx\nxyxy', output: 'NO\nYES\nNO\nYES\nYES\nYES\nNO\nNO\nNO\nYES', source: 'sample', note: sample(1) }],
  pitfalls: [L('Forgetting odd lengths.', 'বিজোড় দৈর্ঘ্য ভুলে যাওয়া।')],
  related: [{ id: '41A', name: 'Translation', why: L('Index pairing in strings.', 'স্ট্রিংয়ে ইনডেক্স জোড়া।') }],
  toolkit: ['string-basics'],
};

export const p1660C: ProblemEntry = {
  id: '1660C',
  contestId: 1660,
  index: 'C',
  name: 'Get an Even String',
  rating: 1300,
  tags: ['dp', 'greedy', 'strings'],
  featuredFor: ['strings'],
  why: L('A greedy that closes a pair as soon as any letter repeats.', 'যেকোনো অক্ষর পুনরাবৃত্ত হলেই একটি জোড়া বন্ধ করে এমন গ্রিডি।'),
  statement: L(
    'A string is even if it splits into pairs of equal adjacent letters, like “aabbdd”. Remove the minimum number of characters from s to make it even. There are t test cases.',
    'একটি স্ট্রিং জোড় যদি এটি সমান পাশাপাশি অক্ষরের জোড়ায় ভাগ হয়, যেমন “aabbdd”। s থেকে সবচেয়ে কম অক্ষর মুছে একে জোড় বানান। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has a string.', 't; প্রতিটি টেস্টে একটি স্ট্রিং।'),
  output: L('The minimum number of removals.', 'সর্বনিম্ন মোছার সংখ্যা।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ |s| ≤ 2·10⁵', 'Σ |s| ≤ ২·১০⁵')] },
  samples: [{ input: '6\naabbdabdccc\nzyx\naaababbb\naabbcc\noaoaaaoo\nbmefbmuyw', output: '3\n3\n2\n0\n2\n7', explain: L('aabbdabdccc keeps aa bb dd cc: 8 of 11.', 'aabbdabdccc-তে aa bb dd cc থাকে: ১১-এর ৮টি।') }],
  observation: L('Build pairs left to right. Keep the set of letters seen since the last completed pair; the first time a letter repeats, close a pair with it and clear the set. Closing as early as possible leaves the most room for later pairs.', 'বাম থেকে ডানে জোড়া বানান। শেষ সম্পূর্ণ জোড়ার পর থেকে দেখা অক্ষরের সেট রাখুন; প্রথমবার কোনো অক্ষর পুনরাবৃত্ত হলে তা দিয়ে একটি জোড়া বন্ধ করে সেট খালি করুন। যত আগে সম্ভব বন্ধ করলে পরের জোড়ার জন্য সবচেয়ে বেশি জায়গা থাকে।'),
  approach: [L('Answer = n − 2 · (number of pairs closed).', 'উত্তর = n − ২ · (বন্ধ করা জোড়ার সংখ্যা)।')],
  walkthrough: { input: 'aaababbb', steps: [{ state: 'aa ✓ | a b a ✓ (a repeats) | b b ✓ | b', text: L('Three pairs: keep 6, remove 2.', 'তিনটি জোড়া: ৬টি থাকে, ২টি মোছা।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('26 flags.', '২৬টি ফ্ল্যাগ।') },
  solutions: [
    {
      id: 'greedy',
      kind: 'optimal',
      title: L('Close the earliest possible pair', 'সবচেয়ে আগের সম্ভাব্য জোড়া বন্ধ'),
      idea: L('seen[26] since the last pair; a repeat closes a pair.', 'শেষ জোড়ার পর থেকে seen[২৬]; পুনরাবৃত্তি একটি জোড়া বন্ধ করে।'),
      explain: [L('Exchange argument: any optimal answer’s first pair ends at or after the first position where some letter repeats, so ending it exactly there can only free more characters for the rest.', 'বিনিময় যুক্তি: যেকোনো সেরা উত্তরের প্রথম জোড়া সেই প্রথম অবস্থানে বা পরে শেষ হয় যেখানে কোনো অক্ষর পুনরাবৃত্ত হয়, তাই ঠিক সেখানে শেষ করলে বাকিদের জন্য শুধু বেশি অক্ষর মুক্ত হয়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        bool seen[26] = {};
        int pairs = 0;
        for (char c : s) {
            if (seen[c - 'a']) {
                pairs++;
                memset(seen, 0, sizeof seen);
            } else {
                seen[c - 'a'] = true;
            }
        }
        cout << s.size() - 2 * pairs << "\n";
    }
    return 0;
}
`,
      time: 'O(26 · n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['char-count'],
    },
    {
      id: 'dp',
      kind: 'method',
      title: L('DP over the last position of each letter', 'প্রতিটি অক্ষরের শেষ অবস্থানের ওপর DP'),
      idea: L('best[i] = most pairs in s[0..i); a pair ending at i uses the previous occurrence j of s[i]: best[i + 1] = max(best[i], best[j] + 1).', 'best[i] = s[০..i)-এ সর্বোচ্চ জোড়া; i-তে শেষ জোড়া s[i]-এর আগের উপস্থিতি j ব্যবহার করে: best[i + ১] = max(best[i], best[j] + ১)।'),
      explain: [L('This DP needs no greedy argument: for the pair ending at i, the closest earlier equal letter is always the best partner, because it leaves the longest prefix before it.', 'এই DP-তে গ্রিডি যুক্তি লাগে না: i-তে শেষ জোড়ার জন্য সবচেয়ে কাছের আগের সমান অক্ষরই সেরা সঙ্গী, কারণ এর আগে সবচেয়ে লম্বা শুরুর অংশ থাকে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int n = s.size();
        vector<int> best(n + 1, 0);
        int last[26];
        fill(last, last + 26, -1);
        for (int i = 0; i < n; i++) {
            best[i + 1] = best[i];
            int j = last[s[i] - 'a'];
            if (j != -1) best[i + 1] = max(best[i + 1], best[j] + 1);
            last[s[i] - 'a'] = i;
        }
        cout << n - 2 * best[n] << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector', 'min-max'],
    },
  ],
  tests: [
    { input: '6\naabbdabdccc\nzyx\naaababbb\naabbcc\noaoaaaoo\nbmefbmuyw', output: '3\n3\n2\n0\n2\n7', source: 'sample', note: sample(1) },
    { input: '1\nabba', output: '2', source: 'own', note: L('Only one pair fits.', 'মাত্র একটি জোড়া আঁটে।') },
  ],
  pitfalls: [L('Pairing only adjacent equal characters of the original string.', 'শুধু মূল স্ট্রিংয়ের পাশাপাশি সমান অক্ষর জোড়া করা।')],
  related: [{ id: '58A', name: 'Chat room', why: L('Greedy over a string.', 'স্ট্রিংয়ের ওপর গ্রিডি।') }],
  toolkit: ['char-count'],
};

export const p1676C: ProblemEntry = {
  id: '1676C',
  contestId: 1676,
  index: 'C',
  name: 'Most Similar Words',
  rating: 800,
  tags: ['brute-force', 'greedy', 'implementation', 'math', 'strings'],
  why: L('All pairs plus a per-character distance.', 'সব জোড়া আর প্রতি অক্ষরের দূরত্ব।'),
  statement: L(
    'n words of equal length m are given. One move changes a letter to its neighbour in the alphabet (a ↔ b, …). The difference of two words is the minimum number of moves to make them equal. Print the minimum difference over all pairs. There are t test cases.',
    'সমান দৈর্ঘ্য m-এর n-টি শব্দ দেওয়া আছে। একটি চালে একটি অক্ষর বর্ণমালায় তার প্রতিবেশীতে বদলায় (a ↔ b, …)। দুটি শব্দের পার্থক্য হলো তাদের সমান করার সর্বনিম্ন চাল। সব জোড়ার সর্বনিম্ন পার্থক্য প্রিন্ট করুন। t-টি টেস্ট কেস আছে।',
  ),
  input: L('t; each test has n, m and n words.', 't; প্রতিটি টেস্টে n, m আর n-টি শব্দ।'),
  output: L('The minimum difference.', 'সর্বনিম্ন পার্থক্য।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('2 ≤ n ≤ 50, 1 ≤ m ≤ 8', '২ ≤ n ≤ ৫০, ১ ≤ m ≤ ৮')] },
  samples: [{ input: '6\n2 4\nbest\ncost\n6 3\nabb\nzba\nbef\ncdu\nooo\nzzz\n2 7\naaabbbc\nbbaezfe\n3 2\nab\nab\nab\n2 8\naaaaaaaa\nzzzzzzzz\n3 1\na\nu\ny', output: '11\n8\n35\n0\n200\n4', explain: L('best vs cost: |b−c| + |e−o| + 0 + 0 = 1 + 10 = 11.', 'best বনাম cost: |b−c| + |e−o| + ০ + ০ = ১ + ১০ = ১১।') }],
  observation: L('Positions are independent, and making two letters equal costs their alphabet distance |a − b|. So the difference is Σ |sᵢ − tᵢ|.', 'অবস্থানগুলো স্বাধীন, আর দুটি অক্ষর সমান করার খরচ তাদের বর্ণমালার দূরত্ব |a − b|। তাই পার্থক্য Σ |sᵢ − tᵢ|।'),
  approach: [L('Try all pairs of words.', 'শব্দের সব জোড়া চেষ্টা।')],
  walkthrough: { input: 'a, u, y', steps: [{ state: 'u–y = 4', text: L('Smallest: 4.', 'সবচেয়ে ছোট: ৪।') }] },
  complexity: { time: 'O(n² m)', space: 'O(n m)', why: L('All pairs, m letters each.', 'সব জোড়া, প্রতিটিতে m অক্ষর।') },
  solutions: [
    {
      id: 'pairs',
      kind: 'optimal',
      title: L('All pairs with letter distance', 'অক্ষর দূরত্বসহ সব জোড়া'),
      idea: L('min over i < j of Σ |w[i][k] − w[j][k]|.', 'i < j-এর ওপর Σ |w[i][k] − w[j][k]|-এর সর্বনিম্ন।'),
      explain: [L('n ≤ 50 means at most 1225 pairs: brute force is the intended solution.', 'n ≤ ৫০ মানে সর্বোচ্চ ১২২৫টি জোড়া: ব্রুট ফোর্সই উদ্দিষ্ট সমাধান।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<string> w(n);
        for (auto& s : w) cin >> s;
        int best = INT_MAX;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int d = 0;
                for (int k = 0; k < m; k++) d += abs(w[i][k] - w[j][k]);
                best = min(best, d);
            }
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n² m)',
      space: 'O(n m)',
      accepted: true,
      toolkit: ['for-loop', 'min-max'],
    },
    {
      id: 'lambda',
      kind: 'stl',
      title: L('A distance function with inner_product', 'inner_product দিয়ে দূরত্বের ফাংশন'),
      idea: L('inner_product with plus and |a − b| computes Σ |aᵢ − bᵢ| in one call.', 'plus আর |a − b| সহ inner_product এক কলে Σ |aᵢ − bᵢ| হিসাব করে।'),
      explain: [L('std::inner_product takes a “sum” and a “combine” operation, so any element-wise distance (L1, Hamming, squared) is one line.', 'std::inner_product একটি “যোগ” আর একটি “মেলানো” অপারেশন নেয়, তাই যেকোনো উপাদান-ধরে দূরত্ব (L1, হ্যামিং, বর্গ) এক লাইনে।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m;
        cin >> n >> m;
        vector<string> w(n);
        for (auto& s : w) cin >> s;
        auto dist = [](const string& a, const string& b) {
            return inner_product(a.begin(), a.end(), b.begin(), 0, plus<int>(),
                                 [](char x, char y) { return abs(x - y); });
        };
        int best = INT_MAX;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) best = min(best, dist(w[i], w[j]));
        cout << best << "\n";
    }
    return 0;
}
`,
      time: 'O(n² m)',
      space: 'O(n m)',
      accepted: true,
      toolkit: ['lambda'],
    },
  ],
  tests: [{ input: '6\n2 4\nbest\ncost\n6 3\nabb\nzba\nbef\ncdu\nooo\nzzz\n2 7\naaabbbc\nbbaezfe\n3 2\nab\nab\nab\n2 8\naaaaaaaa\nzzzzzzzz\n3 1\na\nu\ny', output: '11\n8\n35\n0\n200\n4', source: 'sample', note: sample(1) }],
  pitfalls: [L('Thinking the alphabet wraps around (z ↔ a is not one move).', 'ধরে নেওয়া যে বর্ণমালা ঘুরে আসে (z ↔ a এক চাল নয়)।')],
  related: [{ id: '467B', name: 'Fedor and New Game', why: L('Distance between objects.', 'বস্তুর মধ্যে দূরত্ব।') }],
  toolkit: ['for-loop'],
};

export const p1324B: ProblemEntry = {
  id: '1324B',
  contestId: 1324,
  index: 'B',
  name: 'Yet Another Palindrome Problem',
  rating: 1100,
  tags: ['brute-force', 'strings'],
  why: L('A long palindrome subsequence exists iff a short one (length 3) does.', 'লম্বা প্যালিনড্রোম সাবসিকোয়েন্স থাকে ঠিক তখনই যখন একটি ছোট (দৈর্ঘ্য ৩) থাকে।'),
  statement: L('Given an array a, is there a subsequence of length at least 3 that is a palindrome? Print YES or NO for each of t test cases.', 'অ্যারে a দেওয়া আছে; অন্তত ৩ দৈর্ঘ্যের কোনো সাবসিকোয়েন্স কি প্যালিনড্রোম? t-টি টেস্ট কেসের প্রতিটিতে YES বা NO প্রিন্ট করুন।'),
  input: L('t; each test has n and the array.', 't; প্রতিটি টেস্টে n আর অ্যারে।'),
  output: L('YES or NO.', 'YES অথবা NO।'),
  limits: { timeSec: 2, memoryMb: 256, notes: [L('Σ n ≤ 5000', 'Σ n ≤ ৫০০০')] },
  samples: [{ input: '5\n3\n1 2 1\n5\n1 2 2 3 2\n3\n1 1 2\n4\n1 2 2 1\n10\n1 1 2 2 3 3 4 4 5 5', output: 'YES\nYES\nNO\nYES\nNO', explain: L('1 1 2: the two 1s are adjacent, nothing fits between them.', '১ ১ ২: দুটি ১ পাশাপাশি, মাঝে কিছু আঁটে না।') }],
  observation: L('Any palindrome of length ≥ 3 contains one of length 3: its two ends plus any middle element. So the question is whether some value appears at two positions i < j with j − i ≥ 2.', '৩ বা বেশি দৈর্ঘ্যের যেকোনো প্যালিনড্রোমে ৩ দৈর্ঘ্যের একটি থাকে: এর দুই প্রান্ত আর মাঝের যেকোনো উপাদান। তাই প্রশ্ন হলো কোনো মান কি j − i ≥ ২ এমন দুটি অবস্থান i < j-এ আছে।'),
  approach: [L('Record the first position of every value; a later occurrence at distance ≥ 2 means YES.', 'প্রতিটি মানের প্রথম অবস্থান লিখে রাখুন; ≥ ২ দূরত্বে পরের উপস্থিতি মানে YES।')],
  walkthrough: { input: '1 2 2 3 2', steps: [{ state: 'first[2] = 1, 2 again at 4', text: L('Distance 3 ≥ 2: YES.', 'দূরত্ব ৩ ≥ ২: YES।') }] },
  complexity: { time: 'O(n)', space: 'O(n)', why: L('One pass.', 'একবার যাওয়া।') },
  solutions: [
    {
      id: 'first',
      kind: 'optimal',
      title: L('First occurrence of each value', 'প্রতিটি মানের প্রথম উপস্থিতি'),
      idea: L('YES if i − first[a[i]] ≥ 2 for some i.', 'কোনো i-তে i − first[a[i]] ≥ ২ হলে YES।'),
      explain: [L('Using the first occurrence maximises the distance for every later position, so checking against it is enough.', 'প্রথম উপস্থিতি ব্যবহার করলে পরের প্রতিটি অবস্থানের দূরত্ব সর্বোচ্চ হয়, তাই এর সঙ্গে মেলানোই যথেষ্ট।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> first(n + 1, -1);
        bool ok = false;
        for (int i = 0; i < n; i++) {
            int a;
            cin >> a;
            if (first[a] == -1) first[a] = i;
            else if (i - first[a] >= 2) ok = true;
        }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['vector'],
    },
    {
      id: 'pairs',
      kind: 'brute',
      title: L('All pairs at distance ≥ 2', '≥ ২ দূরত্বের সব জোড়া'),
      idea: L('Two loops with j ≥ i + 2.', 'j ≥ i + ২ সহ দুটি লুপ।'),
      explain: [L('Σ n ≤ 5000 makes O(n²) fine, so this direct check is also accepted.', 'Σ n ≤ ৫০০০ হলে O(n²) চলে, তাই এই সরাসরি যাচাইও গ্রহণযোগ্য।')],
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
        bool ok = false;
        for (int i = 0; i < n && !ok; i++)
            for (int j = i + 2; j < n; j++)
                if (a[i] == a[j]) { ok = true; break; }
        cout << (ok ? "YES" : "NO") << "\n";
    }
    return 0;
}
`,
      time: 'O(n²)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['for-loop'],
    },
  ],
  tests: [
    { input: '5\n3\n1 2 1\n5\n1 2 2 3 2\n3\n1 1 2\n4\n1 2 2 1\n10\n1 1 2 2 3 3 4 4 5 5', output: 'YES\nYES\nNO\nYES\nNO', source: 'sample', note: sample(1) },
    { input: '1\n3\n2 2 2', output: 'YES', source: 'own', note: L('First and last 2.', 'প্রথম আর শেষ ২।') },
  ],
  pitfalls: [L('Counting adjacent equal values.', 'পাশাপাশি সমান মান গোনা।')],
  related: [{ id: '41A', name: 'Translation', why: L('Palindrome-style comparisons.', 'প্যালিনড্রোম ধরনের তুলনা।') }],
  toolkit: ['vector'],
};

export const p1551B1: ProblemEntry = {
  id: '1551B1',
  contestId: 1551,
  index: 'B1',
  name: 'Wonderful Coloring - 1',
  rating: 800,
  tags: ['greedy', 'strings'],
  why: L('Each letter can contribute at most two painted copies: count, cap, halve.', 'প্রতিটি অক্ষর সর্বোচ্চ দুটি রঙ করা কপি দিতে পারে: গোনা, সীমা, অর্ধেক।'),
  statement: L(
    'Paint some letters of s red or green so that equal letters never share a colour, both colours have the same number of letters, and that number k is as large as possible. Print k for each of t test cases.',
    's-এর কিছু অক্ষর লাল বা সবুজ রঙ করুন যাতে সমান অক্ষর কখনো একই রঙ না পায়, দুই রঙে সমান সংখ্যক অক্ষর থাকে, আর সেই সংখ্যা k যত বড় সম্ভব হয়। t-টি টেস্ট কেসের প্রতিটিতে k প্রিন্ট করুন।',
  ),
  input: L('t; each test has a string.', 't; প্রতিটি টেস্টে একটি স্ট্রিং।'),
  output: L('k for each test.', 'প্রতিটি টেস্টের জন্য k।'),
  limits: { timeSec: 1, memoryMb: 256, notes: [L('|s| ≤ 50', '|s| ≤ ৫০')] },
  samples: [{ input: '5\nkzaaa\ncodeforces\narchive\ny\nxxxxxx', output: '2\n5\n3\n0\n1', explain: L('kzaaa: k, z, a, a can be painted: 4 letters, k = 2.', 'kzaaa: k, z, a, a রঙ করা যায়: ৪টি অক্ষর, k = ২।') }],
  observation: L('A letter appearing c times can have at most min(c, 2) painted copies (one per colour). Any multiset of such copies can be split evenly, so k = ⌊Σ min(c, 2) / 2⌋.', 'c বার আসা একটি অক্ষরের সর্বোচ্চ min(c, ২)টি রঙ করা কপি থাকতে পারে (প্রতি রঙে একটি)। এমন কপির যেকোনো সমষ্টি সমানভাবে ভাগ করা যায়, তাই k = ⌊Σ min(c, ২) / ২⌋।'),
  approach: [L('Count letters, sum min(cnt, 2), halve.', 'অক্ষর গুনে min(cnt, ২)-এর যোগফল অর্ধেক করুন।')],
  walkthrough: { input: 'codeforces', steps: [{ state: 'c2 o2 d1 e2 f1 r1 s1', text: L('Sum 10 → k = 5.', 'যোগফল ১০ → k = ৫।') }] },
  complexity: { time: 'O(n)', space: 'O(1)', why: L('26 counters.', '২৬টি কাউন্টার।') },
  solutions: [
    {
      id: 'count',
      kind: 'optimal',
      title: L('Cap each letter at two', 'প্রতিটি অক্ষর দুটিতে সীমিত'),
      idea: L('k = Σ min(cnt, 2) / 2.', 'k = Σ min(cnt, ২) / ২।'),
      explain: [L('Why the split always works: list the chosen copies grouped by letter and colour them alternately red, green, red, …; equal letters are adjacent in the list, so they get different colours.', 'কেন ভাগ সবসময় চলে: বাছা কপিগুলো অক্ষর অনুযায়ী দলবদ্ধ করে পালাক্রমে লাল, সবুজ, লাল, … রঙ দিন; সমান অক্ষর তালিকায় পাশাপাশি, তাই আলাদা রঙ পায়।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        int cnt[26] = {};
        for (char c : s) cnt[c - 'a']++;
        int total = 0;
        for (int c : cnt) total += min(c, 2);
        cout << total / 2 << "\n";
    }
    return 0;
}
`,
      time: 'O(n)',
      space: 'O(1)',
      accepted: true,
      toolkit: ['char-count', 'min-max'],
    },
    {
      id: 'map',
      kind: 'stl',
      title: L('Count with a map', 'map দিয়ে গোনা'),
      idea: L('map<char, int>, then the same formula.', 'map<char, int>, তারপর একই সূত্র।'),
      explain: [L('A map works for any alphabet, not just lowercase letters, which matters in the hard version where values are numbers.', 'map যেকোনো বর্ণমালায় চলে, শুধু ছোট হাতের অক্ষরে নয়, যা কঠিন সংস্করণে (মান সংখ্যা) গুরুত্বপূর্ণ।')],
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int t;
    cin >> t;
    while (t--) {
        string s;
        cin >> s;
        map<char, int> cnt;
        for (char c : s) cnt[c]++;
        int total = 0;
        for (auto& [c, k] : cnt) total += min(k, 2);
        cout << total / 2 << "\n";
    }
    return 0;
}
`,
      time: 'O(n log n)',
      space: 'O(n)',
      accepted: true,
      toolkit: ['map', 'structured-bindings'],
    },
  ],
  tests: [{ input: '5\nkzaaa\ncodeforces\narchive\ny\nxxxxxx', output: '2\n5\n3\n0\n1', source: 'sample', note: sample(1) }],
  pitfalls: [L('Using the number of distinct letters instead of min(cnt, 2).', 'min(cnt, ২)-এর বদলে ভিন্ন অক্ষরের সংখ্যা।')],
  related: [{ id: '236A', name: 'Boy or Girl', why: L('Counting letters.', 'অক্ষর গোনা।') }],
  toolkit: ['char-count'],
};
