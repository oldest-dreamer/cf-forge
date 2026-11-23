import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const constructiveGuide: TagGuide = {
  slug: 'constructive',
  intro: [
    L('In a constructive problem you do not compute a number; you build an object (an array, a permutation, a string, a graph) that satisfies some conditions, or say that none exists. Usually many answers are accepted, so you only need one that is easy to build.',
      'কনস্ট্রাক্টিভ প্রবলেমে একটি সংখ্যা হিসাব করা হয় না; কিছু শর্ত মানে এমন একটি জিনিস (অ্যারে, পারমুটেশন, স্ট্রিং, গ্রাফ) বানাতে হয়, অথবা বলতে হয় যে এমন কিছু নেই। সাধারণত অনেক উত্তরই গ্রহণযোগ্য, তাই সহজে বানানো যায় এমন একটিই যথেষ্ট।'),
    L('The usual route is: solve small cases by hand, look for a pattern that always works, prove it, and find exactly when no answer exists. A brute force over tiny n is the best way to see the pattern and to check the “impossible” cases.',
      'সাধারণ পথ হলো: ছোট কেসগুলো হাতে সমাধান করো, এমন একটি প্যাটার্ন খোঁজো যা সবসময় কাজ করে, প্রমাণ করো, আর ঠিক কখন উত্তর নেই তা বের করো। ছোট n-এর ওপর ব্রুট ফোর্স প্যাটার্ন দেখার আর “অসম্ভব” কেস যাচাইয়ের সেরা উপায়।'),
  ],
  recognize: [
    L('The output is a whole object, and the statement says “if there are several answers, print any”.', 'আউটপুট একটি পুরো জিনিস, আর স্টেটমেন্টে লেখা “একাধিক উত্তর থাকলে যেকোনোটি প্রিন্ট করুন”।'),
    L('You must print “−1” or “NO” when the construction is impossible.', 'বানানো অসম্ভব হলে “−1” বা “NO” প্রিন্ট করতে হয়।'),
    L('The limits are large, but the conditions are simple: parity, sums, adjacent differences, distinct values.', 'সীমা বড়, কিন্তু শর্তগুলো সরল: জোড়-বিজোড়, যোগফল, পাশাপাশি পার্থক্য, আলাদা মান।'),
  ],
  patterns: [
    {
      name: L('Use parity and sums to decide when it is impossible', 'কখন অসম্ভব তা জোড়-বিজোড় আর যোগফল দিয়ে ঠিক করা'),
      explain: [
        L('Before building, ask what every valid answer must satisfy. If n/2 even numbers and n/2 odd numbers must have equal sums, the odd half has the parity of n/2, so n/2 must be even. That one check usually splits YES from NO, and the construction then follows naturally.',
          'বানানোর আগে জিজ্ঞেস করো প্রতিটি বৈধ উত্তরকে কী মানতে হবে। n/2টি জোড় আর n/2টি বিজোড় সংখ্যার যোগফল সমান হতে হলে, বিজোড় অর্ধেকের যোগফলের জোড়-বিজোড় n/2-এর মতো, তাই n/2-কে জোড় হতে হবে। এই একটি পরীক্ষাই সাধারণত YES আর NO আলাদা করে, তারপর বানানোটা নিজেই চলে আসে।'),
      ],
      code: raw`// n is the array length: n/2 evens, then n/2 odds, with equal sums
if ((n / 2) % 2 == 1) { cout << "NO\n"; return; }
vector<long long> a;
for (int i = 1; i <= n / 2; i++) a.push_back(2 * i);
for (int i = 1; i < n / 2; i++) a.push_back(2 * i - 1);
a.push_back(3LL * (n / 2) - 1);   // fixes the odd sum
cout << "YES\n"; for (auto x : a) cout << x << ' '; cout << "\n";`,
      example: { problem: '1343B', text: L('Balanced Array: first half even, second half odd, equal sums. It works exactly when n is divisible by 4; the last odd number repairs the difference.', 'Balanced Array: প্রথম অর্ধেক জোড়, দ্বিতীয় অর্ধেক বিজোড়, যোগফল সমান। n যখন ৪ দিয়ে বিভাজ্য তখনই কাজ করে; শেষ বিজোড় সংখ্যাটি পার্থক্য পূরণ করে।') },
    },
    {
      name: L('Split into independent pieces', 'স্বাধীন টুকরোতে ভাগ করা'),
      explain: [
        L('Many objects can be built from parts that do not affect each other: digits of a number, odd and even positions, the two halves of an array. Build each part with the simplest rule and glue them.',
          'অনেক জিনিস এমন অংশ দিয়ে বানানো যায় যারা একে অপরকে প্রভাবিত করে না: একটি সংখ্যার অঙ্ক, বিজোড় আর জোড় অবস্থান, অ্যারের দুই অর্ধেক। প্রতিটি অংশ সবচেয়ে সহজ নিয়মে বানিয়ে জোড়া দাও।'),
      ],
      code: raw`// write n as a sum of round numbers (d * 10^k): one term per non-zero digit
string s = to_string(n);
vector<int> parts;
for (int i = 0; i < (int)s.size(); i++)
    if (s[i] != '0') parts.push_back((s[i] - '0') * (int)pow(10, s.size() - 1 - i));`,
      example: { problem: '1352A', text: L('Sum of Round Numbers: every non-zero digit becomes its own round number, so the count is the number of non-zero digits.', 'Sum of Round Numbers: প্রতিটি অশূন্য অঙ্ক নিজেই একটি রাউন্ড সংখ্যা হয়, তাই সংখ্যাটি হলো অশূন্য অঙ্কের সংখ্যা।') },
    },
    {
      name: L('Find a pattern on small n, then prove it', 'ছোট n-এ প্যাটার্ন খুঁজে প্রমাণ করা'),
      explain: [
        L('Write a brute force that prints all answers for n = 1..8, look at them, and guess a rule. For a permutation where neighbours differ by 2 to 4, the pattern “odds descending, then 4, 2, then the other evens” appears quickly, and the brute force also shows that n ≤ 3 is impossible.',
          'n = ১..৮-এর সব উত্তর প্রিন্ট করে এমন একটি ব্রুট ফোর্স লেখো, সেগুলো দেখো, আর একটি নিয়ম অনুমান করো। পাশাপাশি পার্থক্য ২ থেকে ৪ এমন পারমুটেশনে “বিজোড়গুলো কমতে কমতে, তারপর ৪, ২, তারপর বাকি জোড়” প্যাটার্নটি দ্রুত চোখে পড়ে, আর ব্রুট ফোর্স দেখায় n ≤ ৩ অসম্ভব।'),
      ],
      code: raw`// permutation of 1..n with 2 <= |p[i] - p[i+1]| <= 4 (n >= 4)
vector<int> p;
for (int x = (n % 2 ? n : n - 1); x >= 1; x -= 2) p.push_back(x);
p.push_back(4); p.push_back(2);
for (int x = 6; x <= n; x += 2) p.push_back(x);`,
      example: { problem: '1352G', text: L('Special Permutation: odds from the top down to 1, then 4, 2, then 6, 8, …; the jumps 1→4 and 4→2 are within the limits.', 'Special Permutation: বিজোড়গুলো ওপর থেকে ১ পর্যন্ত, তারপর ৪, ২, তারপর ৬, ৮, …; ১→৪ আর ৪→২ লাফ সীমার মধ্যে।') },
    },
  ],
  mistakes: [
    L('Not checking your output: write a tiny checker that verifies the conditions on your own answer.', 'নিজের আউটপুট যাচাই না করা: নিজের উত্তরে শর্তগুলো মেলে কি না দেখার জন্য ছোট একটি চেকার লেখো।'),
    L('Missing the impossible cases, especially n = 1, 2, 3.', 'অসম্ভব কেসগুলো বাদ পড়া, বিশেষ করে n = ১, ২, ৩।'),
    L('Building something correct but too slow, such as trying random answers until one works.', 'সঠিক কিন্তু খুব ধীর কিছু বানানো, যেমন একটা কাজ না করা পর্যন্ত এলোমেলো উত্তর চেষ্টা করা।'),
  ],
  plan: [
    L('Solve 10 constructive problems rated 800–1000 and always start by solving n = 1..5 on paper.', '৮০০–১০০০ রেটিংয়ের ১০টি কনস্ট্রাক্টিভ প্রবলেম করো, আর সবসময় কাগজে n = ১..৫ দিয়ে শুরু করো।'),
    L('For each, write the “when is it impossible” condition before writing any code.', 'প্রতিটিতে কোড লেখার আগে “কখন অসম্ভব” শর্তটি লিখে ফেলো।'),
    L('Move to 1100–1400; now write a brute force to find the pattern when paper is not enough.', '১১০০–১৪০০-তে যাও; এবার কাগজে না হলে প্যাটার্ন খুঁজতে ব্রুট ফোর্স লেখো।'),
    L('Keep a list of tricks you meet: parity, alternating signs, sorting then pairing, writing in base 2.', 'যে কৌশলগুলো পাও তার একটি তালিকা রাখো: জোড়-বিজোড়, পর্যায়ক্রমে চিহ্ন, সর্ট করে জোড়া, বেস ২-তে লেখা।'),
  ],
};

export const binarySearchGuide: TagGuide = {
  slug: 'binary-search',
  intro: [
    L('Binary search finds a boundary in something monotonic: a sorted array, or a yes/no question whose answer is “no, no, …, no, yes, yes, …”. Each step halves the range, so 10⁹ candidates need only about 30 steps.',
      'বাইনারি সার্চ একঘেয়ে (monotonic) কিছুর মধ্যে একটি সীমানা খুঁজে বের করে: একটি সাজানো অ্যারে, অথবা এমন হ্যাঁ/না প্রশ্ন যার উত্তর “না, না, …, না, হ্যাঁ, হ্যাঁ, …”। প্রতিটি ধাপে পরিসর অর্ধেক হয়, তাই ১০⁹টি সম্ভাব্য মানে মাত্র প্রায় ৩০টি ধাপ লাগে।'),
    L('The most important form in contests is “binary search on the answer”: instead of computing the best value directly, guess a value x, check whether x is achievable, and search for the largest (or smallest) achievable x.',
      'কনটেস্টে সবচেয়ে গুরুত্বপূর্ণ রূপ হলো “উত্তরের ওপর বাইনারি সার্চ”: সেরা মান সরাসরি হিসাব না করে একটি মান x অনুমান করো, x অর্জনযোগ্য কি না যাচাই করো, আর সবচেয়ে বড় (বা ছোট) অর্জনযোগ্য x খোঁজো।'),
  ],
  recognize: [
    L('“Find the maximum x such that …” or “the minimum time/size/cost so that …”, and checking one given x is easy.', '“এমন সর্বোচ্চ x বের করো যাতে …” বা “সর্বনিম্ন সময়/আকার/খরচ যাতে …”, আর একটি নির্দিষ্ট x যাচাই করা সহজ।'),
    L('If x works then every smaller (or larger) x also works.', 'x কাজ করলে প্রতিটি ছোট (বা বড়) x-ও কাজ করে।'),
    L('Queries of the form “how many values are ≤ v” on a sorted array.', 'সাজানো অ্যারেতে “কতগুলো মান ≤ v” ধরনের প্রশ্ন।'),
  ],
  patterns: [
    {
      name: L('lower_bound and upper_bound on a sorted array', 'সাজানো অ্যারেতে lower_bound আর upper_bound'),
      explain: [
        L('lower_bound returns the first position with value ≥ v, upper_bound the first with value > v. Their difference is how many elements equal v, and upper_bound − begin is how many are ≤ v.',
          'lower_bound প্রথম অবস্থান দেয় যেখানে মান ≥ v, upper_bound প্রথমটি যেখানে মান > v। এদের পার্থক্য হলো কতগুলো উপাদান v-এর সমান, আর upper_bound − begin হলো কতগুলো ≤ v।'),
      ],
      code: raw`sort(a.begin(), a.end());
int atMost = upper_bound(a.begin(), a.end(), v) - a.begin();   // count of a[i] <= v
int equal  = upper_bound(a.begin(), a.end(), v) - lower_bound(a.begin(), a.end(), v);`,
      example: { problem: '706B', text: L('Interesting drink: sort the shop prices once; for each day with m coins, the number of shops he can buy from is upper_bound(m).', 'Interesting drink: দোকানের দামগুলো একবার সর্ট করো; m কয়েনের প্রতিটি দিনে সে যত দোকান থেকে কিনতে পারে তা হলো upper_bound(m)।') },
    },
    {
      name: L('Binary search on the answer', 'উত্তরের ওপর বাইনারি সার্চ'),
      explain: [
        L('Keep lo as a value known to work and hi as a value known to fail. While hi − lo > 1, test mid; move lo or hi to mid. When the loop ends, lo is the largest working value. Choosing lo and hi this way removes every off-by-one doubt.',
          'lo রাখো এমন মান যা নিশ্চিত কাজ করে আর hi এমন মান যা নিশ্চিত ব্যর্থ। hi − lo > ১ যতক্ষণ, mid পরীক্ষা করো; lo বা hi-কে mid-এ সরাও। লুপ শেষে lo হলো সবচেয়ে বড় কাজ করা মান। এভাবে lo আর hi বাছলে এক কম-বেশির সব সন্দেহ দূর হয়।'),
      ],
      code: raw`auto ok = [&](long long x) -> bool { /* can we reach x? */ };
long long lo = 0, hi = 2e9 + 1;          // ok(lo) is true, ok(hi) is false
while (hi - lo > 1) {
    long long mid = lo + (hi - lo) / 2;
    (ok(mid) ? lo : hi) = mid;
}
cout << lo << "\n";`,
      example: { problem: '1201C', text: L('Maximum Median: can the median reach x with at most k operations? Raise every element from the middle up to x and add the costs; this is monotone in x.', 'Maximum Median: সর্বোচ্চ k অপারেশনে মিডিয়ান কি x-এ পৌঁছাতে পারে? মাঝ থেকে ওপরের প্রতিটি উপাদান x পর্যন্ত তুলে খরচ যোগ করো; এটি x-এ একঘেয়ে।') },
    },
    {
      name: L('Binary search with resources', 'সম্পদ নিয়ে বাইনারি সার্চ'),
      explain: [
        L('“How many items can I make with the stock I have plus money to buy more?” For a guess x, the cost of the missing ingredients is easy to compute; it grows with x, so search for the largest affordable x. Use long long and a generous hi.',
          '“হাতে থাকা মজুত আর আরও কেনার টাকা দিয়ে কতগুলো জিনিস বানাতে পারি?” একটি অনুমান x-এর জন্য অনুপস্থিত উপকরণের খরচ সহজে হিসাব করা যায়; এটি x-এর সঙ্গে বাড়ে, তাই সাধ্যের মধ্যে সবচেয়ে বড় x খোঁজো। long long আর উদার hi ব্যবহার করো।'),
      ],
      code: raw`auto cost = [&](long long x) {
    long long c = 0;
    for (int i = 0; i < k; i++) c += max(0LL, need[i] * x - have[i]) * price[i];
    return c;
};
long long lo = 0, hi = 2e12;
while (hi - lo > 1) { long long m = (lo + hi) / 2; (cost(m) <= money ? lo : hi) = m; }`,
      example: { problem: '371C', text: L('Hamburgers: count B, S and C in the recipe, then binary search the number of burgers; for each guess, pay for what the kitchen lacks.', 'Hamburgers: রেসিপিতে B, S আর C গুনো, তারপর বার্গারের সংখ্যায় বাইনারি সার্চ করো; প্রতিটি অনুমানে রান্নাঘরে যা নেই তার দাম দাও।') },
    },
  ],
  mistakes: [
    L('An infinite loop from lo = mid with while (lo < hi). Use the lo/hi invariant and hi − lo > 1.', 'while (lo < hi) দিয়ে lo = mid করলে অসীম লুপ। lo/hi নিয়ম আর hi − lo > ১ ব্যবহার করো।'),
    L('Overflow inside the check: cost × count can pass 10¹⁸; cap it or use __int128.', 'যাচাইয়ের ভেতরে ওভারফ্লো: খরচ × সংখ্যা ১০¹⁸ ছাড়াতে পারে; সীমা দাও বা __int128 ব্যবহার করো।'),
    L('Searching on something that is not monotone.', 'একঘেয়ে নয় এমন কিছুর ওপর সার্চ করা।'),
    L('Using lower_bound on an unsorted array.', 'অসাজানো অ্যারেতে lower_bound ব্যবহার।'),
  ],
  plan: [
    L('Do 5 problems that only need lower_bound/upper_bound on a sorted array.', 'শুধু সাজানো অ্যারেতে lower_bound/upper_bound লাগে এমন ৫টি প্রবলেম করো।'),
    L('Do 10 “binary search on the answer” problems rated 1200–1500; write the check function first and test it alone.', '১২০০–১৫০০ রেটিংয়ের ১০টি “উত্তরের ওপর বাইনারি সার্চ” করো; আগে যাচাইয়ের ফাংশন লিখে আলাদা করে পরীক্ষা করো।'),
    L('Then mix it with greedy checks and prefix sums, which is where most Div 2 C problems live.', 'তারপর গ্রিডি যাচাই আর প্রিফিক্স সামের সঙ্গে মেশাও, বেশিরভাগ Div 2 C প্রবলেম এখানেই।'),
  ],
};

export const twoPointersGuide: TagGuide = {
  slug: 'two-pointers',
  intro: [
    L('Two pointers keep two indices into an array and only ever move them forward. Because each pointer moves at most n times, the whole scan is O(n), even though it looks at many pairs or windows.',
      'টু পয়েন্টার একটি অ্যারেতে দুটি ইনডেক্স রাখে আর সেগুলোকে শুধু সামনের দিকে সরায়। প্রতিটি পয়েন্টার সর্বোচ্চ n বার সরে, তাই পুরো স্ক্যান O(n), যদিও এটি অনেক জোড়া বা উইন্ডো দেখে।'),
    L('It works when a window that is valid stays valid if you shrink it (or a bad window stays bad if you grow it). Then for every right end, the best left end only moves right.',
      'এটি কাজ করে যখন একটি বৈধ উইন্ডো ছোট করলেও বৈধ থাকে (বা খারাপ উইন্ডো বড় করলেও খারাপ থাকে)। তখন প্রতিটি ডান প্রান্তের জন্য সেরা বাম প্রান্ত শুধু ডানে সরে।'),
  ],
  recognize: [
    L('“Longest/shortest subarray with sum ≤ k”, “at most k distinct values”, “all values present”.', '“যোগফল ≤ k এমন সবচেয়ে লম্বা/ছোট সাবঅ্যারে”, “সর্বোচ্চ k ভিন্ন মান”, “সব মান উপস্থিত”।'),
    L('Counting pairs in a sorted array with a sum or difference condition.', 'সাজানো অ্যারেতে যোগফল বা পার্থক্যের শর্তে জোড়া গোনা।'),
    L('Merging two sorted lists.', 'দুটি সাজানো তালিকা মেলানো।'),
  ],
  patterns: [
    {
      name: L('Sliding window with a sum limit', 'যোগফলের সীমাসহ স্লাইডিং উইন্ডো'),
      explain: [
        L('Extend the right end one step at a time and add a[r]. While the sum is too big, remove a[l] and move l. All values are positive, so shrinking always lowers the sum and the window [l, r] is the longest valid one ending at r.',
          'ডান প্রান্ত এক এক ধাপ বাড়াও আর a[r] যোগ করো। যোগফল বেশি হলে a[l] বাদ দিয়ে l সরাও। সব মান ধনাত্মক, তাই ছোট করলে সবসময় যোগফল কমে আর [l, r] হলো r-এ শেষ হওয়া সবচেয়ে লম্বা বৈধ উইন্ডো।'),
      ],
      code: raw`int l = 0, best = 0;
long long sum = 0;
for (int r = 0; r < n; r++) {
    sum += a[r];
    while (sum > t) sum -= a[l++];
    best = max(best, r - l + 1);
}`,
      example: { problem: '279B', text: L('Books: the longest run of consecutive books he can read in t minutes is exactly this window.', 'Books: t মিনিটে সে পরপর যত বই পড়তে পারে তার সবচেয়ে লম্বা ধারা ঠিক এই উইন্ডো।') },
    },
    {
      name: L('Window that must contain every type', 'যে উইন্ডোতে প্রতিটি ধরন থাকতে হবে'),
      explain: [
        L('Keep a count of each value inside the window and how many types are present. Grow r; while all types are present, record the length and shrink from the left. This gives the shortest window covering everything.',
          'উইন্ডোর ভেতরে প্রতিটি মানের গণনা আর কতগুলো ধরন উপস্থিত তা রাখো। r বাড়াও; সব ধরন থাকলে দৈর্ঘ্য লিখে রাখো আর বাম থেকে ছোট করো। এতে সবকিছু ঢাকা সবচেয়ে ছোট উইন্ডো পাওয়া যায়।'),
      ],
      code: raw`map<char,int> cnt; int have = 0, best = n;
for (int l = 0, r = 0; r < n; r++) {
    if (cnt[s[r]]++ == 0) have++;
    while (have == types) {
        best = min(best, r - l + 1);
        if (--cnt[s[l++]] == 0) have--;
    }
}`,
      example: { problem: '701C', text: L('They Are Everywhere: the shortest stretch of flats containing every Pokémon type.', 'They Are Everywhere: প্রতিটি পোকেমন ধরন আছে এমন সবচেয়ে ছোট ফ্ল্যাটের সারি।') },
    },
    {
      name: L('Opposite ends of a sorted array', 'সাজানো অ্যারের দুই প্রান্ত'),
      explain: [
        L('With the array sorted, put i at the start and j at the end. If a[i] + a[j] is too big, j must move left; if it is small enough, every k in (i, j] pairs with i, so count j − i and move i. This counts pairs with sum ≤ x in O(n).',
          'অ্যারে সাজানো থাকলে i শুরুতে আর j শেষে রাখো। a[i] + a[j] বেশি হলে j-কে বামে সরতে হবে; যথেষ্ট ছোট হলে (i, j]-এর প্রতিটি k i-এর সঙ্গে জোড়া হয়, তাই j − i গুনে i সরাও। এতে O(n)-এ যোগফল ≤ x জোড়া গোনা হয়।'),
      ],
      code: raw`sort(a.begin(), a.end());
long long pairs = 0;
for (int i = 0, j = n - 1; i < j; ) {
    if (a[i] + a[j] <= x) { pairs += j - i; i++; }
    else j--;
}`,
      example: { problem: '1538C', text: L('Number of Pairs: count pairs with sum ≤ r and subtract pairs with sum ≤ l − 1.', 'Number of Pairs: যোগফল ≤ r জোড়া গুনে যোগফল ≤ l − ১ জোড়া বাদ দাও।') },
    },
  ],
  mistakes: [
    L('Using a window when values can be negative: shrinking no longer lowers the sum.', 'মান ঋণাত্মক হতে পারলেও উইন্ডো ব্যবহার: ছোট করলে আর যোগফল কমে না।'),
    L('Moving l past r and reading an empty window.', 'l-কে r-এর পরে নিয়ে খালি উইন্ডো পড়া।'),
    L('Forgetting to sort before the opposite-ends technique.', 'দুই প্রান্তের কৌশলের আগে সর্ট করতে ভুলে যাওয়া।'),
  ],
  plan: [
    L('Rewrite three O(n²) subarray problems with two pointers and compare outputs.', 'তিনটি O(n²) সাবঅ্যারে প্রবলেম টু পয়েন্টার দিয়ে আবার লেখো আর আউটপুট মেলাও।'),
    L('Do 10 problems rated 1200–1600 tagged two pointers.', 'টু পয়েন্টার ট্যাগের ১২০০–১৬০০ রেটিংয়ের ১০টি প্রবলেম করো।'),
    L('Learn when binary search and two pointers solve the same task; two pointers saves the log.', 'কখন বাইনারি সার্চ আর টু পয়েন্টার একই কাজ করে তা শেখো; টু পয়েন্টারে log বাঁচে।'),
  ],
};

export const dpGuide: TagGuide = {
  slug: 'dp',
  intro: [
    L('Dynamic programming solves a problem by solving smaller versions of it once and storing the results. You define a state (what you need to know to continue), a transition (how a state is built from smaller ones), and a base case.',
      'ডাইনামিক প্রোগ্রামিং একটি প্রবলেমের ছোট সংস্করণগুলো একবার করে সমাধান করে ফল জমা রাখে। একটি অবস্থা (চালিয়ে যেতে যা জানা দরকার), একটি রূপান্তর (ছোট অবস্থা থেকে কীভাবে বড়টি তৈরি হয়), আর একটি ভিত্তি কেস নির্ধারণ করতে হয়।'),
    L('If a brute force explores the same sub-question many times, DP can remember each answer. The art is choosing a state small enough to store and rich enough to decide the future.',
      'ব্রুট ফোর্স যদি একই ছোট প্রশ্ন বারবার দেখে, DP প্রতিটি উত্তর মনে রাখতে পারে। শিল্পটা হলো এমন অবস্থা বাছা যা জমা রাখার মতো ছোট আর ভবিষ্যৎ ঠিক করার মতো যথেষ্ট তথ্যপূর্ণ।'),
  ],
  recognize: [
    L('“Maximum/minimum over all ways”, “number of ways modulo 10⁹ + 7”.', '“সব উপায়ের ওপর সর্বোচ্চ/সর্বনিম্ন”, “উপায়ের সংখ্যা ১০⁹ + ৭ মডুলো”।'),
    L('A greedy choice fails on some small example, but choices only depend on a little information.', 'কোনো ছোট উদাহরণে গ্রিডি সিদ্ধান্ত ব্যর্থ হয়, কিন্তু সিদ্ধান্তগুলো অল্প তথ্যের ওপর নির্ভর করে।'),
    L('n up to a few thousand (O(n²) DP) or a value limit around 10⁵ (DP over values).', 'n কয়েক হাজার পর্যন্ত (O(n²) DP) বা মানের সীমা প্রায় ১০⁵ (মানের ওপর DP)।'),
  ],
  patterns: [
    {
      name: L('Take or skip (linear DP)', 'নেওয়া বা বাদ দেওয়া (রৈখিক DP)'),
      explain: [
        L('dp[i] is the best answer using only items up to i. Either you skip item i (dp[i − 1]) or take it, which may forbid its neighbour (dp[i − 2] + gain[i]). This is the “house robber” shape and appears constantly.',
          'dp[i] হলো শুধু i পর্যন্ত জিনিস দিয়ে সেরা উত্তর। হয় i বাদ দাও (dp[i − ১]), নয়তো নাও, যা পাশেরটিকে নিষিদ্ধ করতে পারে (dp[i − ২] + gain[i])। এটি “হাউস রবার” আকার আর সবসময় আসে।'),
      ],
      code: raw`// gain[v] = v * count(v); choosing v forbids v-1 and v+1
vector<long long> dp(MAXV + 1, 0);
dp[1] = gain[1];
for (int v = 2; v <= MAXV; v++) dp[v] = max(dp[v - 1], dp[v - 2] + gain[v]);`,
      example: { problem: '455A', text: L('Boredom: deleting value v earns v per copy and removes v − 1 and v + 1, so over values it is exactly take-or-skip.', 'Boredom: মান v মুছলে প্রতি কপিতে v পাওয়া যায় আর v − ১ ও v + ১ মুছে যায়, তাই মানগুলোর ওপর এটি ঠিক নেওয়া-বা-বাদ।') },
    },
    {
      name: L('Unbounded knapsack: best way to reach a total', 'সীমাহীন ন্যাপস্যাক: একটি মোটে পৌঁছানোর সেরা উপায়'),
      explain: [
        L('dp[x] is the best result for total exactly x, or −∞ if x cannot be reached. For every piece size p, dp[x] = max(dp[x], dp[x − p] + 1). Initialise unreachable states to −∞, not 0.',
          'dp[x] হলো ঠিক x মোটের জন্য সেরা ফল, অথবা x-এ পৌঁছানো না গেলে −∞। প্রতিটি টুকরার আকার p-এর জন্য dp[x] = max(dp[x], dp[x − p] + ১)। অপ্রাপ্য অবস্থাকে ০ নয়, −∞ দিয়ে শুরু করো।'),
      ],
      code: raw`vector<int> dp(n + 1, INT_MIN);
dp[0] = 0;
for (int x = 1; x <= n; x++)
    for (int p : {a, b, c})
        if (x >= p && dp[x - p] != INT_MIN) dp[x] = max(dp[x], dp[x - p] + 1);`,
      example: { problem: '189A', text: L('Cut Ribbon: the most pieces of lengths a, b, c that sum to n.', 'Cut Ribbon: a, b, c দৈর্ঘ্যের সবচেয়ে বেশি টুকরো যাদের যোগফল n।') },
    },
    {
      name: L('A small extra dimension for “last choice”', '“শেষ সিদ্ধান্ত”-এর জন্য ছোট বাড়তি মাত্রা'),
      explain: [
        L('When the rule depends on the previous pick (do not take two from the same row in a row), add it to the state: dp[i][r] is the best answer for the first i columns where column i used row r.',
          'নিয়ম যখন আগের বাছাইয়ের ওপর নির্ভর করে (একই সারি থেকে পরপর দুবার নেওয়া যাবে না), সেটি অবস্থায় যোগ করো: dp[i][r] হলো প্রথম i কলামের সেরা উত্তর যেখানে কলাম i সারি r ব্যবহার করেছে।'),
      ],
      code: raw`// dp0 = best ending with row 0 at column i, dp1 = row 1
long long dp0 = 0, dp1 = 0;
for (int i = 0; i < n; i++) {
    long long n0 = max(dp0, dp1 + h0[i]);
    long long n1 = max(dp1, dp0 + h1[i]);
    dp0 = n0, dp1 = n1;
}`,
      example: { problem: '1195C', text: L('Basketball Exercise: pick players left to right, never two from the same row consecutively.', 'Basketball Exercise: বাম থেকে ডানে খেলোয়াড় বাছো, কখনো একই সারি থেকে পরপর দুজন নয়।') },
    },
  ],
  mistakes: [
    L('Initialising impossible states to 0, which lets them pretend to be valid.', 'অসম্ভব অবস্থাকে ০ দিয়ে শুরু করা, যাতে সেগুলো বৈধ হওয়ার ভান করে।'),
    L('Forgetting the modulo after every addition in counting problems.', 'গণনার প্রবলেমে প্রতিটি যোগের পর মডুলো ভুলে যাওয়া।'),
    L('A state that is too large: n × n × n with n = 5000 does not fit in memory or time.', 'খুব বড় অবস্থা: n = ৫০০০ হলে n × n × n মেমোরি বা সময়ে আঁটে না।'),
    L('Writing the transition before deciding precisely what dp[i] means.', 'dp[i] ঠিক কী বোঝায় তা ঠিক করার আগেই রূপান্তর লেখা।'),
  ],
  plan: [
    L('Write the meaning of dp[…] as a sentence in a comment above every DP you write.', 'প্রতিটি DP-এর ওপর একটি কমেন্টে dp[…]-এর অর্থ একটি বাক্যে লেখো।'),
    L('Do 10 classic problems: 1D, knapsack, grid paths, LIS, LCS.', '১০টি ক্লাসিক প্রবলেম করো: 1D, ন্যাপস্যাক, গ্রিডের পথ, LIS, LCS।'),
    L('Then 10 Codeforces DP problems rated 1300–1700, starting each with a recursive brute force and adding memoisation.', 'তারপর ১৩০০–১৭০০ রেটিংয়ের ১০টি Codeforces DP, প্রতিটি রিকার্সিভ ব্রুট ফোর্স দিয়ে শুরু করে মেমোইজেশন যোগ করে।'),
  ],
};

export const dataStructuresGuide: TagGuide = {
  slug: 'data-structures',
  intro: [
    L('Data structure problems ask many questions (queries) about data that may change. Answering each query from scratch is too slow, so you keep the data in a structure that answers quickly: a map, a set, prefix sums, a Fenwick tree, a segment tree.',
      'ডেটা স্ট্রাকচার প্রবলেম পরিবর্তনশীল ডেটা নিয়ে অনেক প্রশ্ন (কোয়েরি) করে। প্রতিটি কোয়েরির উত্তর শুরু থেকে বের করা খুব ধীর, তাই ডেটা এমন কাঠামোতে রাখো যা দ্রুত উত্তর দেয়: map, set, প্রিফিক্স সাম, ফেনউইক ট্রি, সেগমেন্ট ট্রি।'),
    L('Choose by the operations you need: lookups by key (map/unordered_map), the smallest/largest element (set/priority_queue), range sums without updates (prefix sums), range sums with point updates (Fenwick), any associative range operation with updates (segment tree).',
      'যে অপারেশন দরকার সেই অনুযায়ী বাছো: কী দিয়ে খোঁজা (map/unordered_map), সবচেয়ে ছোট/বড় উপাদান (set/priority_queue), আপডেট ছাড়া পরিসরের যোগফল (প্রিফিক্স সাম), পয়েন্ট আপডেটসহ পরিসরের যোগফল (ফেনউইক), আপডেটসহ যেকোনো সহযোগী পরিসর অপারেশন (সেগমেন্ট ট্রি)।'),
  ],
  recognize: [
    L('n and q both up to 2·10⁵ with “for each query print …”.', 'n আর q দুটিই ২·১০⁵ পর্যন্ত, সঙ্গে “প্রতিটি কোয়েরির জন্য প্রিন্ট করো …”।'),
    L('You need counts of earlier values, e.g. “pairs i < j with a[j] − a[i] = j − i”.', 'আগের মানগুলোর গণনা দরকার, যেমন “i < j জোড়া যেখানে a[j] − a[i] = j − i”।'),
    L('Updates mixed with questions about ranges.', 'আপডেটের সঙ্গে পরিসর নিয়ে প্রশ্ন মেশানো।'),
  ],
  patterns: [
    {
      name: L('Count earlier values with a map', 'map দিয়ে আগের মান গোনা'),
      explain: [
        L('Rewrite the condition so one side depends only on i and the other only on j. a[j] − a[i] = j − i becomes a[j] − j = a[i] − i, so count, for each j, how many earlier indices had the same key.',
          'শর্তটি এমনভাবে লেখো যাতে এক পাশ শুধু i আর অন্য পাশ শুধু j-এর ওপর নির্ভর করে। a[j] − a[i] = j − i হয় a[j] − j = a[i] − i, তাই প্রতিটি j-এর জন্য গুনো আগের কতগুলো ইনডেক্সে একই কী ছিল।'),
      ],
      code: raw`map<int, long long> seen;
long long pairs = 0;
for (int j = 0; j < n; j++) {
    int key = a[j] - j;
    pairs += seen[key];
    seen[key]++;
}`,
      example: { problem: '1520D', text: L('Same Differences: the key a[i] − i turns pair counting into counting equal keys.', 'Same Differences: কী a[i] − i জোড়া গোনাকে সমান কী গোনায় বদলে দেয়।') },
    },
    {
      name: L('A map of names to counters', 'নাম থেকে কাউন্টারের map'),
      explain: [
        L('When the data are strings or huge numbers, a map stores a counter for each one in O(log n) per operation. It is the simplest data structure and solves many Div 3 problems on its own.',
          'ডেটা যখন স্ট্রিং বা বিশাল সংখ্যা, তখন map প্রতিটির জন্য প্রতি অপারেশনে O(log n)-এ একটি কাউন্টার রাখে। এটি সবচেয়ে সহজ ডেটা স্ট্রাকচার আর একাই অনেক Div 3 প্রবলেম সমাধান করে।'),
      ],
      code: raw`map<string, int> used;
for (auto& name : requests) {
    int k = used[name]++;
    if (k == 0) cout << "OK\n";
    else cout << name << k << "\n";
}`,
      example: { problem: '4C', text: L('Registration system: the first time a name appears print OK; later print the name followed by how many times it was taken before.', 'Registration system: একটি নাম প্রথমবার এলে OK প্রিন্ট করো; পরে নামের পর আগে কতবার নেওয়া হয়েছে তা।') },
    },
    {
      name: L('Fenwick tree for prefix sums with updates', 'আপডেটসহ প্রিফিক্স সামের জন্য ফেনউইক ট্রি'),
      explain: [
        L('A Fenwick (binary indexed) tree supports “add v at position i” and “sum of positions 1..i” in O(log n), with about ten lines of code. A range sum l..r is sum(r) − sum(l − 1).',
          'ফেনউইক (বাইনারি ইনডেক্সড) ট্রি প্রায় দশ লাইনের কোডে O(log n)-এ “অবস্থান i-তে v যোগ” আর “১..i অবস্থানের যোগফল” সমর্থন করে। পরিসরের যোগফল l..r হলো sum(r) − sum(l − ১)।'),
      ],
      code: raw`struct Fenwick {
    int n; vector<long long> t;
    Fenwick(int n) : n(n), t(n + 1, 0) {}
    void add(int i, long long v) { for (; i <= n; i += i & -i) t[i] += v; }
    long long sum(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += t[i]; return s; }
};`,
      example: { problem: '1234D', text: L('Distinct Characters Queries: one structure per letter (a Fenwick tree or a set of positions) answers “does letter c appear in l..r?” after each update.', 'Distinct Characters Queries: প্রতি অক্ষরের জন্য একটি কাঠামো (ফেনউইক ট্রি বা অবস্থানের set) প্রতিটি আপডেটের পর “l..r-এ অক্ষর c আছে কি?” উত্তর দেয়।') },
    },
  ],
  mistakes: [
    L('unordered_map on Codeforces can be attacked with anti-hash tests; use map or a custom hash.', 'Codeforces-এ unordered_map অ্যান্টি-হ্যাশ টেস্ট দিয়ে আক্রমণ করা যায়; map বা কাস্টম হ্যাশ ব্যবহার করো।'),
    L('Mixing 0-based arrays with a 1-based Fenwick tree.', '০-ভিত্তিক অ্যারের সঙ্গে ১-ভিত্তিক ফেনউইক ট্রি মেশানো।'),
    L('Using map[key] just to check existence, which inserts the key.', 'শুধু অস্তিত্ব দেখতে map[key] ব্যবহার, যা কী-টি ঢুকিয়ে দেয়।'),
  ],
  plan: [
    L('Master map, set, multiset and priority_queue on 10 problems rated 1000–1400.', '১০০০–১৪০০ রেটিংয়ের ১০টি প্রবলেমে map, set, multiset আর priority_queue আয়ত্ত করো।'),
    L('Learn prefix sums and difference arrays, then the Fenwick tree.', 'প্রিফিক্স সাম আর ডিফারেন্স অ্যারে শেখো, তারপর ফেনউইক ট্রি।'),
    L('Finally write a segment tree from memory and use it on 5 range-query problems.', 'শেষে স্মৃতি থেকে একটি সেগমেন্ট ট্রি লেখো আর ৫টি পরিসর-কোয়েরি প্রবলেমে ব্যবহার করো।'),
  ],
};

export const bitmasksGuide: TagGuide = {
  slug: 'bitmasks',
  intro: [
    L('A bitmask stores a set of up to 64 items in one integer: bit i is 1 when item i is in the set. Union, intersection and membership become |, & and a shift, each a single instruction.',
      'বিটমাস্ক একটি পূর্ণসংখ্যায় সর্বোচ্চ ৬৪টি জিনিসের সেট রাখে: জিনিস i সেটে থাকলে বিট i হলো ১। ইউনিয়ন, ইন্টারসেকশন আর সদস্যপদ হয়ে যায় |, & আর একটি শিফট, প্রতিটি একটি মাত্র নির্দেশ।'),
    L('The tag also covers problems about XOR, AND and OR, where looking at each bit separately is the key idea: bits do not interact in these operations.',
      'এই ট্যাগে XOR, AND আর OR নিয়ে প্রবলেমও আছে, যেখানে প্রতিটি বিট আলাদা করে দেখাই মূল আইডিয়া: এসব অপারেশনে বিটগুলো একে অপরকে প্রভাবিত করে না।'),
  ],
  recognize: [
    L('n ≤ 20: try all 2ⁿ subsets.', 'n ≤ ২০: সব ২ⁿ সাবসেট চেষ্টা করো।'),
    L('The statement mentions XOR, AND or OR.', 'স্টেটমেন্টে XOR, AND বা OR আছে।'),
    L('Each item is either chosen or not, or turned one way or the other.', 'প্রতিটি জিনিস হয় বাছা হয় নয়তো না, অথবা একদিকে বা অন্যদিকে ঘোরানো হয়।'),
  ],
  patterns: [
    {
      name: L('Enumerate all subsets', 'সব সাবসেট গণনা'),
      explain: [
        L('Loop mask from 0 to 2ⁿ − 1; bit i of mask tells whether item i is chosen (or turned clockwise). With n ≤ 15 that is only 32768 masks.',
          'mask ০ থেকে ২ⁿ − ১ পর্যন্ত লুপ চালাও; mask-এর বিট i বলে জিনিস i বাছা হয়েছে কি না (বা ঘড়ির কাঁটার দিকে ঘোরানো)। n ≤ ১৫ হলে মাত্র ৩২৭৬৮টি mask।'),
      ],
      code: raw`bool ok = false;
for (int mask = 0; mask < (1 << n); mask++) {
    int angle = 0;
    for (int i = 0; i < n; i++) angle += (mask >> i & 1) ? a[i] : -a[i];
    if (angle % 360 == 0) ok = true;
}`,
      example: { problem: '1097B', text: L('Petr and a Combination Lock: each rotation goes either way; try all 2ⁿ directions and check whether the total is a multiple of 360.', 'Petr and a Combination Lock: প্রতিটি ঘূর্ণন যেকোনো দিকে; সব ২ⁿ দিক চেষ্টা করে দেখো মোট ৩৬০-এর গুণিতক কি না।') },
    },
    {
      name: L('Think bit by bit for XOR', 'XOR-এর জন্য বিট ধরে ধরে ভাবা'),
      explain: [
        L('(a ⊕ x) + (b ⊕ x) is minimised bit by bit: in a bit where a and b agree, set x to the same bit to clear both; where they differ, one of them is 1 whatever x is. So x = a & b works and the minimum is a ⊕ b.',
          '(a ⊕ x) + (b ⊕ x) বিট ধরে ধরে সর্বনিম্ন হয়: যে বিটে a আর b মেলে, সেখানে x-এর বিটও একই রাখলে দুটিই মুছে যায়; যেখানে আলাদা, x যা-ই হোক একটিতে ১ থাকে। তাই x = a & b কাজ করে আর সর্বনিম্ন হলো a ⊕ b।'),
      ],
      code: raw`long long a, b;
cin >> a >> b;
cout << (a ^ b) << "\n";   // achieved by x = a & b`,
      example: { problem: '1421A', text: L('XORwice: the answer is simply a XOR b.', 'XORwice: উত্তর সরাসরি a XOR b।') },
    },
    {
      name: L('Subsets with conditions on sum, min and max', 'যোগফল, সর্বনিম্ন আর সর্বোচ্চের শর্তসহ সাবসেট'),
      explain: [
        L('For each mask compute the sum, minimum and maximum of chosen elements in O(n), then test the conditions. O(2ⁿ · n) is fine for n ≤ 15.',
          'প্রতিটি mask-এর জন্য O(n)-এ বাছা উপাদানগুলোর যোগফল, সর্বনিম্ন আর সর্বোচ্চ হিসাব করো, তারপর শর্তগুলো দেখো। n ≤ ১৫ হলে O(২ⁿ · n) ঠিক আছে।'),
      ],
      code: raw`int ways = 0;
for (int mask = 0; mask < (1 << n); mask++) {
    if (__builtin_popcount(mask) < 2) continue;
    long long sum = 0; int mn = INT_MAX, mx = INT_MIN;
    for (int i = 0; i < n; i++) if (mask >> i & 1) sum += c[i], mn = min(mn, c[i]), mx = max(mx, c[i]);
    if (l <= sum && sum <= r && mx - mn >= x) ways++;
}`,
      example: { problem: '550B', text: L('Preparing Olympiad: count subsets of at least two problems with total difficulty in [l, r] and spread at least x.', 'Preparing Olympiad: অন্তত দুটি প্রবলেমের এমন সাবসেট গুনো যার মোট কঠিনতা [l, r]-এ আর ব্যাপ্তি অন্তত x।') },
    },
  ],
  mistakes: [
    L('Writing 1 << 40 with int: use 1LL << 40.', 'int দিয়ে 1 << 40 লেখা: 1LL << 40 ব্যবহার করো।'),
    L('Operator precedence: a & 1 == 0 means a & (1 == 0). Always add parentheses.', 'অপারেটরের অগ্রাধিকার: a & 1 == 0 মানে a & (1 == 0)। সবসময় বন্ধনী দাও।'),
    L('Trying 2ⁿ subsets with n = 40.', 'n = ৪০ হলে ২ⁿ সাবসেট চেষ্টা করা।'),
  ],
  plan: [
    L('Do 5 subset-enumeration problems with n ≤ 20.', 'n ≤ ২০ এমন ৫টি সাবসেট-গণনার প্রবলেম করো।'),
    L('Do 5 XOR/AND/OR problems, always reasoning one bit at a time.', '৫টি XOR/AND/OR প্রবলেম করো, সবসময় একটি করে বিট ধরে ভেবে।'),
    L('Then learn bitmask DP (dp[mask]) for assignment problems.', 'তারপর অ্যাসাইনমেন্ট প্রবলেমের জন্য বিটমাস্ক DP (dp[mask]) শেখো।'),
  ],
};

export const numberTheoryGuide: TagGuide = {
  slug: 'number-theory',
  intro: [
    L('Number theory problems are about divisibility: primes, divisors, gcd and lcm, remainders. A few tools cover most of them: trial division up to √n, the sieve of Eratosthenes, Euclid’s gcd and fast modular exponentiation.',
      'নাম্বার থিওরি প্রবলেম বিভাজ্যতা নিয়ে: মৌলিক সংখ্যা, ভাজক, gcd আর lcm, ভাগশেষ। কয়েকটি হাতিয়ার বেশিরভাগ সামলায়: √n পর্যন্ত ভাগ করে দেখা, ইরাতোস্থেনিসের ছাঁকনি, ইউক্লিডের gcd আর দ্রুত মডুলার পাওয়ার।'),
    L('The key fact behind √n: divisors come in pairs d and n/d, and one of each pair is at most √n. So checking up to √n finds every divisor and every small prime factor.',
      '√n-এর পেছনের মূল তথ্য: ভাজকগুলো d আর n/d জোড়ায় আসে, আর প্রতিটি জোড়ার একটি সর্বোচ্চ √n। তাই √n পর্যন্ত দেখলেই প্রতিটি ভাজক আর প্রতিটি ছোট মৌলিক উৎপাদক পাওয়া যায়।'),
  ],
  recognize: [
    L('Words like prime, divisor, gcd, multiple, “divisible by”.', 'মৌলিক, ভাজক, gcd, গুণিতক, “দিয়ে বিভাজ্য” ধরনের শব্দ।'),
    L('Numbers up to 10¹² (trial division) or many queries up to 10⁷ (sieve).', '১০¹² পর্যন্ত সংখ্যা (ভাগ করে দেখা) বা ১০⁷ পর্যন্ত অনেক কোয়েরি (ছাঁকনি)।'),
    L('Answers “modulo 10⁹ + 7”.', 'উত্তর “১০⁹ + ৭ মডুলো”।'),
  ],
  patterns: [
    {
      name: L('Sieve of Eratosthenes', 'ইরাতোস্থেনিসের ছাঁকনি'),
      explain: [
        L('Mark every multiple of each prime as composite, starting from p². What remains unmarked is prime. It runs in O(N log log N), which handles N = 10⁷ easily.',
          'প্রতিটি মৌলিক সংখ্যার প্রতিটি গুণিতক p² থেকে শুরু করে যৌগিক চিহ্নিত করো। যা চিহ্নহীন থাকে তা মৌলিক। এটি O(N log log N)-এ চলে, যা N = ১০⁷ সহজে সামলায়।'),
      ],
      code: raw`const int N = 1000000;
vector<bool> composite(N + 1, false);
composite[0] = composite[1] = true;
for (long long p = 2; p * p <= N; p++)
    if (!composite[p])
        for (long long m = p * p; m <= N; m += p) composite[m] = true;`,
      example: { problem: '230B', text: L('T-primes: a number has exactly three divisors exactly when it is the square of a prime; take the integer square root and look it up in the sieve.', 'T-primes: একটি সংখ্যার ঠিক তিনটি ভাজক থাকে ঠিক তখনই যখন সেটি একটি মৌলিক সংখ্যার বর্গ; পূর্ণসংখ্যার বর্গমূল নিয়ে ছাঁকনিতে দেখো।') },
    },
    {
      name: L('Factorise by trial division', 'ভাগ করে দেখে উৎপাদকে বিশ্লেষণ'),
      explain: [
        L('Divide out each d from 2 while d·d ≤ n. If anything above 1 remains, it is a prime factor larger than √n. This lists all prime factors in O(√n).',
          'd·d ≤ n যতক্ষণ, ২ থেকে প্রতিটি d দিয়ে ভাগ করে বের করো। শেষে ১-এর বেশি কিছু থাকলে সেটি √n-এর বড় একটি মৌলিক উৎপাদক। এতে O(√n)-এ সব মৌলিক উৎপাদক পাওয়া যায়।'),
      ],
      code: raw`vector<long long> primes;
for (long long d = 2; d * d <= n; d++)
    if (n % d == 0) {
        primes.push_back(d);
        while (n % d == 0) n /= d;
    }
if (n > 1) primes.push_back(n);`,
      example: { problem: '26A', text: L('Almost Prime: count numbers up to n with exactly two distinct prime factors; factorise each one or count with a sieve.', 'Almost Prime: n পর্যন্ত এমন সংখ্যা গুনো যাদের ঠিক দুটি ভিন্ন মৌলিক উৎপাদক; প্রতিটিকে বিশ্লেষণ করো বা ছাঁকনি দিয়ে গুনো।') },
    },
    {
      name: L('gcd, lcm and fast power', 'gcd, lcm আর দ্রুত পাওয়ার'),
      explain: [
        L('std::gcd uses Euclid’s algorithm in O(log). lcm(a, b) = a / gcd(a, b) · b (divide first to avoid overflow). Modular power squares the base and halves the exponent, so aᵇ mod m takes O(log b).',
          'std::gcd O(log)-এ ইউক্লিডের অ্যালগরিদম ব্যবহার করে। lcm(a, b) = a / gcd(a, b) · b (ওভারফ্লো এড়াতে আগে ভাগ)। মডুলার পাওয়ার ভিত্তিকে বর্গ করে আর ঘাত অর্ধেক করে, তাই aᵇ mod m-এ O(log b) লাগে।'),
      ],
      code: raw`long long power(long long a, long long b, long long m) {
    long long r = 1; a %= m;
    while (b > 0) {
        if (b & 1) r = r * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return r;
}`,
      example: { problem: '1350A', text: L('Orac and Factors: add the smallest divisor f(n) once; after that n is even and every step adds 2.', 'Orac and Factors: একবার সবচেয়ে ছোট ভাজক f(n) যোগ করো; তারপর n জোড় আর প্রতিটি ধাপে ২ যোগ হয়।') },
    },
  ],
  mistakes: [
    L('Looping d up to n instead of √n.', 'd-কে √n-এর বদলে n পর্যন্ত চালানো।'),
    L('Forgetting the leftover prime factor after trial division.', 'ভাগ করে দেখার পর বাকি থাকা মৌলিক উৎপাদক ভুলে যাওয়া।'),
    L('sqrt() with doubles for large numbers: fix it with while (r * r > n) r-- and while ((r + 1) * (r + 1) <= n) r++.', 'বড় সংখ্যায় double দিয়ে sqrt(): while (r * r > n) r-- আর while ((r + 1) * (r + 1) <= n) r++ দিয়ে ঠিক করো।'),
  ],
  plan: [
    L('Write the sieve, trial division and fast power from memory until each takes under two minutes.', 'ছাঁকনি, ভাগ করে দেখা আর দ্রুত পাওয়ার স্মৃতি থেকে লেখো, যতক্ষণ না প্রতিটিতে দুই মিনিটের কম লাগে।'),
    L('Do 10 number theory problems rated 1000–1400.', '১০০০–১৪০০ রেটিংয়ের ১০টি নাম্বার থিওরি প্রবলেম করো।'),
    L('Then learn modular inverses and counting divisors from a factorisation.', 'তারপর মডুলার ইনভার্স আর উৎপাদক বিশ্লেষণ থেকে ভাজক গোনা শেখো।'),
  ],
};
