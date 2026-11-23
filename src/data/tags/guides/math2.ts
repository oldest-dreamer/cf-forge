import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

export const combinatoricsGuide: TagGuide = {
  slug: 'combinatorics',
  intro: [
    L('Combinatorics counts things without listing them: arrangements, selections, paths, colourings. The answer is usually huge, so it is printed modulo a prime like 10⁹ + 7.',
      'কম্বিনেটরিক্স জিনিসগুলো তালিকা না করেই গোনে: সাজানো, বাছাই, পথ, রং করা। উত্তর সাধারণত বিশাল, তাই ১০⁹ + ৭-এর মতো একটি মৌলিক সংখ্যার মডুলোতে প্রিন্ট হয়।'),
    L('Three rules do most of the work: multiply independent choices, add disjoint cases, and use C(n, k) = n! / (k! (n − k)!) for choosing k of n. Under a prime modulus, division becomes multiplication by a modular inverse.',
      'তিনটি নিয়ম বেশিরভাগ কাজ করে: স্বাধীন সিদ্ধান্তগুলো গুণ করো, আলাদা কেসগুলো যোগ করো, আর n থেকে k বাছতে C(n, k) = n! / (k! (n − k)!) ব্যবহার করো। মৌলিক মডুলাসে ভাগ মানে মডুলার ইনভার্স দিয়ে গুণ।'),
  ],
  recognize: [
    L('“How many ways …”, “count the number of arrays/strings such that …”.', '“কত উপায়ে …”, “এমন কতগুলো অ্যারে/স্ট্রিং আছে যাতে …”।'),
    L('Answer modulo 10⁹ + 7 or 998244353.', 'উত্তর ১০⁹ + ৭ বা ৯৯৮২৪৪৩৫৩ মডুলো।'),
    L('Order of identical items does not matter, or items are placed into groups.', 'একই রকম জিনিসের ক্রম গুরুত্বপূর্ণ নয়, বা জিনিসগুলো দলে রাখা হয়।'),
  ],
  patterns: [
    {
      name: L('Factorials and inverse factorials', 'ফ্যাক্টোরিয়াল আর ইনভার্স ফ্যাক্টোরিয়াল'),
      explain: [
        L('Precompute fact[i] and inv[i] = fact[i]⁻¹ once. By Fermat’s little theorem, x⁻¹ = x^(p − 2) mod p. Then every C(n, k) is three multiplications.',
          'একবার fact[i] আর inv[i] = fact[i]⁻¹ হিসাব করে রাখো। ফার্মার ছোট উপপাদ্য অনুযায়ী x⁻¹ = x^(p − ২) mod p। তারপর প্রতিটি C(n, k) তিনটি গুণ।'),
      ],
      code: raw`const long long MOD = 1e9 + 7;
vector<long long> fact(N + 1), inv(N + 1);
fact[0] = 1;
for (int i = 1; i <= N; i++) fact[i] = fact[i - 1] * i % MOD;
inv[N] = power(fact[N], MOD - 2, MOD);
for (int i = N; i > 0; i--) inv[i - 1] = inv[i] * i % MOD;
auto C = [&](int n, int k) { return k < 0 || k > n ? 0 : fact[n] * inv[k] % MOD * inv[n - k] % MOD; };`,
      example: { problem: '553A', text: L('Kyoya and Colored Balls: process colours in order; the last ball of colour i is fixed at the end, and its other balls choose places among the earlier ones with C(total − 1, cᵢ − 1).', 'Kyoya and Colored Balls: রংগুলো ক্রমে দেখো; রং i-এর শেষ বলটি শেষে স্থির, আর বাকি বলগুলো আগের জায়গাগুলোর মধ্যে C(total − ১, cᵢ − ১) উপায়ে বসে।') },
    },
    {
      name: L('Pascal’s triangle for small n', 'ছোট n-এর জন্য প্যাসকেলের ত্রিভুজ'),
      explain: [
        L('When n ≤ 60 and no modulus is given, build C with C[n][k] = C[n − 1][k − 1] + C[n − 1][k] in long long. It avoids division entirely.',
          'n ≤ ৬০ আর কোনো মডুলাস না থাকলে long long-এ C[n][k] = C[n − ১][k − ১] + C[n − ১][k] দিয়ে C বানাও। এতে ভাগ একেবারেই লাগে না।'),
      ],
      code: raw`long long C[61][61] = {};
for (int n = 0; n <= 60; n++) {
    C[n][0] = 1;
    for (int k = 1; k <= n; k++) C[n][k] = C[n - 1][k - 1] + C[n - 1][k];
}`,
      example: { problem: '131C', text: L('The World is a Theatre: sum C(n, b) · C(m, t − b) over the number of boys b ≥ 4 with t − b ≥ 1 girls.', 'The World is a Theatre: ছেলের সংখ্যা b ≥ ৪ আর মেয়ে t − b ≥ ১ ধরে C(n, b) · C(m, t − b) যোগ করো।') },
    },
    {
      name: L('Count the complement', 'বিপরীতটি গোনা'),
      explain: [
        L('When “at least one” is hard, count all objects and subtract those with none. Arrays of length n over k values where some two neighbours are equal = kⁿ − k(k − 1)ⁿ⁻¹.',
          '“অন্তত একটি” কঠিন হলে সব জিনিস গুনে যেগুলোতে একটিও নেই সেগুলো বাদ দাও। k মানের ওপর n দৈর্ঘ্যের অ্যারে যেখানে কোনো দুটি পাশাপাশি সমান = kⁿ − k(k − ১)ⁿ⁻¹।'),
      ],
      code: raw`long long all = power(k, n, MOD);
long long none = k % MOD * power(k - 1, n - 1, MOD) % MOD;
long long answer = (all - none + MOD) % MOD;`,
      example: { text: L('Whenever a direct count needs messy cases, try counting the opposite.', 'সরাসরি গোনায় জটিল কেস লাগলে বিপরীতটা গুনে দেখো।') },
    },
  ],
  mistakes: [
    L('Subtracting under a modulus without adding MOD back, which leaves a negative number.', 'মডুলাসে বিয়োগের পর MOD যোগ না করা, যাতে ঋণাত্মক সংখ্যা থেকে যায়।'),
    L('Dividing directly under a modulus instead of multiplying by an inverse.', 'ইনভার্স দিয়ে গুণের বদলে মডুলাসে সরাসরি ভাগ করা।'),
    L('Counting the same object twice through two different cases.', 'দুটি আলাদা কেস দিয়ে একই জিনিস দুবার গোনা।'),
  ],
  plan: [
    L('Check every formula with a brute force for n ≤ 6 before trusting it.', 'ভরসা করার আগে প্রতিটি সূত্র n ≤ ৬-এর জন্য ব্রুট ফোর্স দিয়ে মিলিয়ে নাও।'),
    L('Do 10 counting problems rated 1300–1700 using fact/inv templates.', 'fact/inv টেমপ্লেট দিয়ে ১৩০০–১৭০০ রেটিংয়ের ১০টি গণনার প্রবলেম করো।'),
    L('Learn stars and bars and inclusion–exclusion next.', 'এরপর স্টারস অ্যান্ড বারস আর ইনক্লুশন–এক্সক্লুশন শেখো।'),
  ],
};

export const probabilitiesGuide: TagGuide = {
  slug: 'probabilities',
  intro: [
    L('Probability problems ask for a chance or an expected value. With few random choices, list all equally likely outcomes and count the good ones. With many, use linearity of expectation: the expected sum is the sum of expected parts, even when the parts depend on each other.',
      'প্রোবাবিলিটি প্রবলেম একটি সম্ভাবনা বা প্রত্যাশিত মান চায়। এলোমেলো সিদ্ধান্ত কম হলে সব সমান সম্ভাব্য ফল তালিকা করে ভালোগুলো গুনো। বেশি হলে প্রত্যাশার রৈখিকতা ব্যবহার করো: যোগফলের প্রত্যাশা অংশগুলোর প্রত্যাশার যোগফল, এমনকি অংশগুলো পরস্পর নির্ভরশীল হলেও।'),
    L('Answers are printed either as a decimal with enough digits (use setprecision) or as p · q⁻¹ modulo a prime.',
      'উত্তর হয় যথেষ্ট অঙ্কসহ দশমিক হিসেবে (setprecision ব্যবহার করো), নয়তো একটি মৌলিক সংখ্যার মডুলোতে p · q⁻¹ হিসেবে প্রিন্ট হয়।'),
  ],
  recognize: [
    L('“Print the probability” or “the expected number of …”.', '“সম্ভাবনা প্রিন্ট করো” বা “… এর প্রত্যাশিত সংখ্যা”।'),
    L('Output with an absolute or relative error of 10⁻⁶ allowed.', '১০⁻⁶ পরম বা আপেক্ষিক ত্রুটি গ্রহণযোগ্য এমন আউটপুট।'),
    L('Dice, coins, random permutations.', 'ছক্কা, কয়েন, এলোমেলো পারমুটেশন।'),
  ],
  patterns: [
    {
      name: L('Enumerate equally likely outcomes', 'সমান সম্ভাব্য ফলগুলো গণনা'),
      explain: [
        L('If there are k unknown coin flips, there are 2ᵏ equally likely outcomes. Count those that end in the right place and divide by 2ᵏ.',
          'k-টি অজানা কয়েন টস থাকলে ২ᵏটি সমান সম্ভাব্য ফল। যেগুলো সঠিক জায়গায় শেষ হয় সেগুলো গুনে ২ᵏ দিয়ে ভাগ করো।'),
      ],
      code: raw`int good = 0, k = unknown;
for (int mask = 0; mask < (1 << k); mask++) {
    int pos = known;
    for (int i = 0; i < k; i++) pos += (mask >> i & 1) ? 1 : -1;
    if (pos == target) good++;
}
printf("%.12f\n", (double)good / (1 << k));`,
      example: { problem: '476B', text: L('Dreamoon and WiFi: each “?” is +1 or −1 with equal chance; enumerate all and count how many reach the intended position.', 'Dreamoon and WiFi: প্রতিটি “?” সমান সম্ভাবনায় +১ বা −১; সব গুনে দেখো কতগুলো উদ্দিষ্ট অবস্থানে পৌঁছায়।') },
    },
    {
      name: L('Expected maximum via P(max ≤ k)', 'P(max ≤ k) দিয়ে প্রত্যাশিত সর্বোচ্চ'),
      explain: [
        L('P(max of n rolls ≤ k) = (k/m)ⁿ, so P(max = k) = (k/m)ⁿ − ((k − 1)/m)ⁿ. Sum k times that. Working with “≤ k” is far easier than “= k” directly.',
          'P(n বার ছক্কার সর্বোচ্চ ≤ k) = (k/m)ⁿ, তাই P(max = k) = (k/m)ⁿ − ((k − ১)/m)ⁿ। k গুণ সেটি যোগ করো। সরাসরি “= k”-এর চেয়ে “≤ k” নিয়ে কাজ অনেক সহজ।'),
      ],
      code: raw`double e = 0;
for (int k = 1; k <= m; k++)
    e += k * (pow((double)k / m, n) - pow((double)(k - 1) / m, n));
printf("%.12f\n", e);`,
      example: { problem: '453A', text: L('Little Pony and Expected Maximum: exactly this formula with an m-sided die rolled n times.', 'Little Pony and Expected Maximum: m তলের ছক্কা n বার নিক্ষেপে ঠিক এই সূত্র।') },
    },
    {
      name: L('Linearity of expectation', 'প্রত্যাশার রৈখিকতা'),
      explain: [
        L('Write the quantity as a sum of indicator variables (1 if an event happens, else 0). Its expectation is the sum of the probabilities of the events. For example, the expected number of fixed points of a random permutation is n · (1/n) = 1.',
          'পরিমাণটিকে নির্দেশক চলকের যোগফল হিসেবে লেখো (ঘটনা ঘটলে ১, না হলে ০)। এর প্রত্যাশা হলো ঘটনাগুলোর সম্ভাবনার যোগফল। যেমন একটি এলোমেলো পারমুটেশনে স্থির বিন্দুর প্রত্যাশিত সংখ্যা n · (১/n) = ১।'),
      ],
      code: raw`// E[#i with p[i] == i] = sum over i of P(p[i] == i) = n * (1.0 / n)
double expected = 0;
for (int i = 0; i < n; i++) expected += 1.0 / n;`,
      example: { text: L('Whenever you see “expected number of …”, try to split it into “for each item, the probability that it counts”.', '“… এর প্রত্যাশিত সংখ্যা” দেখলেই একে “প্রতিটি জিনিসের জন্য, সেটি গোনায় আসার সম্ভাবনা”-তে ভাঙার চেষ্টা করো।') },
    },
  ],
  mistakes: [
    L('Printing with too few digits: cout’s default is 6 significant digits.', 'খুব কম অঙ্কে প্রিন্ট: cout-এর ডিফল্ট ৬টি অর্থপূর্ণ অঙ্ক।'),
    L('Treating outcomes as equally likely when they are not.', 'সমান সম্ভাব্য নয় এমন ফলকে সমান সম্ভাব্য ধরা।'),
    L('Integer division: 1 / n is 0 for int n.', 'পূর্ণসংখ্যার ভাগ: int n হলে 1 / n হয় ০।'),
  ],
  plan: [
    L('Do 5 problems by enumerating outcomes; check with a simulation if unsure.', 'ফল গণনা করে ৫টি প্রবলেম করো; নিশ্চিত না হলে সিমুলেশন দিয়ে মেলাও।'),
    L('Do 5 expected-value problems using linearity.', 'রৈখিকতা দিয়ে ৫টি প্রত্যাশিত মানের প্রবলেম করো।'),
    L('Then learn probability DP: dp[state] = chance of reaching it.', 'তারপর প্রোবাবিলিটি DP শেখো: dp[state] = সেখানে পৌঁছানোর সম্ভাবনা।'),
  ],
};

export const gamesGuide: TagGuide = {
  slug: 'games',
  intro: [
    L('Game problems describe two players who move in turns and both play perfectly. A position is winning if some move leads to a losing position for the opponent, and losing if every move leads to a winning one.',
      'গেম প্রবলেমে দুজন খেলোয়াড় পালা করে চাল দেয় আর দুজনেই নিখুঁত খেলে। একটি অবস্থা জেতার, যদি কোনো চাল প্রতিপক্ষকে হারার অবস্থায় নেয়; আর হারার, যদি প্রতিটি চাল জেতার অবস্থায় নেয়।'),
    L('Solve tiny positions with that rule by brute force, print the table of wins and losses, and look for a pattern: parity, a count of something, or a simple invariant. Then prove it.',
      'এই নিয়মে ছোট অবস্থাগুলো ব্রুট ফোর্সে সমাধান করো, জেতা-হারার টেবিল প্রিন্ট করো, আর একটি প্যাটার্ন খোঁজো: জোড়-বিজোড়, কোনো কিছুর গণনা, বা সরল একটি অপরিবর্তনীয়। তারপর প্রমাণ করো।'),
  ],
  recognize: [
    L('“Alice and Bob play optimally; who wins?”.', '“অ্যালিস আর বব নিখুঁত খেলে; কে জেতে?”।'),
    L('Each move removes something, so the game always ends.', 'প্রতিটি চালে কিছু সরে যায়, তাই খেলা সবসময় শেষ হয়।'),
    L('Huge inputs, so the answer must be a simple formula.', 'বিশাল ইনপুট, তাই উত্তর একটি সরল সূত্র হতে হবে।'),
  ],
  patterns: [
    {
      name: L('Count the total number of moves', 'মোট চালের সংখ্যা গোনা'),
      explain: [
        L('If every game lasts the same number of moves no matter how anyone plays, the winner depends only on that number’s parity. Removing a “01” or “10” pair always removes one 0 and one 1, so the game lasts exactly min(zeros, ones) moves.',
          'যেভাবেই খেলা হোক, প্রতিটি খেলা যদি একই সংখ্যক চালে শেষ হয়, তবে বিজয়ী শুধু সেই সংখ্যার জোড়-বিজোড়ের ওপর নির্ভর করে। “01” বা “10” জোড়া সরালে সবসময় একটি ০ আর একটি ১ সরে, তাই খেলা ঠিক min(zeros, ones) চাল চলে।'),
      ],
      code: raw`int zeros = count(s.begin(), s.end(), '0');
int ones = s.size() - zeros;
cout << (min(zeros, ones) % 2 == 1 ? "DA" : "NET") << "\n";`,
      example: { problem: '1373B', text: L('01 Game: Alice wins exactly when min(zeros, ones) is odd.', '01 Game: min(zeros, ones) বিজোড় হলেই অ্যালিস জেতে।') },
    },
    {
      name: L('Brute force the win/lose table', 'জেতা/হারার টেবিল ব্রুট ফোর্সে'),
      explain: [
        L('win[x] = true if some move from x reaches a y with win[y] = false. Fill it for small x and print it; the pattern (period, parity, powers of two) usually jumps out.',
          'x থেকে কোনো চাল যদি এমন y-তে পৌঁছায় যেখানে win[y] = false, তবে win[x] = true। ছোট x-এর জন্য এটি ভরে প্রিন্ট করো; প্যাটার্ন (পর্যায়, জোড়-বিজোড়, দুইয়ের ঘাত) সাধারণত চোখে পড়ে।'),
      ],
      code: raw`vector<bool> win(N + 1, false);   // win[0] = false: no move, you lose
for (int x = 1; x <= N; x++)
    for (int take : moves)
        if (take <= x && !win[x - take]) win[x] = true;`,
      example: { text: L('Print win[1..50] for a subtraction game; you will usually see a repeating block.', 'একটি বিয়োগের খেলার জন্য win[১..৫০] প্রিন্ট করো; সাধারণত একটি পুনরাবৃত্ত ব্লক দেখবে।') },
    },
    {
      name: L('Simulate a stack of forced moves', 'বাধ্যতামূলক চালের স্ট্যাক সিমুলেশন'),
      explain: [
        L('When players remove two equal adjacent letters, the order of removals does not change how many happen. A stack counts the removals in O(n), and the first player wins when the count is odd.',
          'খেলোয়াড়রা যখন পাশাপাশি দুটি সমান অক্ষর সরায়, সরানোর ক্রম মোট সরানোর সংখ্যা বদলায় না। একটি স্ট্যাক O(n)-এ সরানোগুলো গোনে, আর গণনা বিজোড় হলে প্রথম খেলোয়াড় জেতে।'),
      ],
      code: raw`string st; int moves = 0;
for (char c : s) {
    if (!st.empty() && st.back() == c) { st.pop_back(); moves++; }
    else st.push_back(c);
}
cout << (moves % 2 ? "Yes" : "No") << "\n";`,
      example: { problem: '1104B', text: L('Game with string: count the pair removals with a stack; odd means the first player wins.', 'Game with string: স্ট্যাক দিয়ে জোড়া সরানো গুনো; বিজোড় মানে প্রথম খেলোয়াড় জেতে।') },
    },
  ],
  mistakes: [
    L('Guessing a pattern from two or three cases without a brute-force table.', 'ব্রুট-ফোর্স টেবিল ছাড়া দু-তিনটি কেস দেখে প্যাটার্ন অনুমান।'),
    L('Assuming the greedy move (take the most) is optimal.', 'ধরে নেওয়া যে গ্রিডি চাল (সবচেয়ে বেশি নেওয়া) সেরা।'),
    L('Swapping the names in the output.', 'আউটপুটে নামগুলো উল্টে ফেলা।'),
  ],
  plan: [
    L('For every game problem, write the brute-force table first.', 'প্রতিটি গেম প্রবলেমে আগে ব্রুট-ফোর্স টেবিল লেখো।'),
    L('Do 10 game problems rated 800–1400.', '৮০০–১৪০০ রেটিংয়ের ১০টি গেম প্রবলেম করো।'),
    L('Then learn Nim (XOR of pile sizes) and Sprague–Grundy numbers.', 'তারপর নিম (স্তূপের আকারের XOR) আর স্প্রাগ–গ্রান্ডি সংখ্যা শেখো।'),
  ],
};

export const geometryGuide: TagGuide = {
  slug: 'geometry',
  intro: [
    L('Contest geometry works with points, lines, segments and polygons in coordinates. Most of it rests on two operations: the dot product (angles, projections) and the cross product (orientation, area).',
      'কনটেস্ট জ্যামিতি স্থানাঙ্কে বিন্দু, রেখা, রেখাংশ আর বহুভুজ নিয়ে কাজ করে। এর বেশিরভাগ দুটি অপারেশনের ওপর দাঁড়ানো: ডট প্রোডাক্ট (কোণ, প্রক্ষেপণ) আর ক্রস প্রোডাক্ট (দিক, ক্ষেত্রফল)।'),
    L('Prefer integers whenever you can: cross products of integer points are exact, while doubles collect rounding errors.',
      'যখনই পারো পূর্ণসংখ্যা ব্যবহার করো: পূর্ণসংখ্যার বিন্দুর ক্রস প্রোডাক্ট নিখুঁত, আর double-এ রাউন্ডিং ত্রুটি জমে।'),
  ],
  recognize: [
    L('Coordinates of points are given.', 'বিন্দুর স্থানাঙ্ক দেওয়া আছে।'),
    L('Words like triangle, area, convex, intersect, distance.', 'ত্রিভুজ, ক্ষেত্রফল, উত্তল, ছেদ, দূরত্ব ধরনের শব্দ।'),
    L('Output with a precision requirement.', 'নির্ভুলতার শর্তসহ আউটপুট।'),
  ],
  patterns: [
    {
      name: L('Cross product and orientation', 'ক্রস প্রোডাক্ট আর দিক'),
      explain: [
        L('cross(b − a, c − a) is positive when a → b → c turns left, negative for right, and zero when the points are collinear. Its absolute value is twice the triangle’s area.',
          'cross(b − a, c − a) ধনাত্মক যখন a → b → c বামে ঘোরে, ডানে হলে ঋণাত্মক, আর বিন্দুগুলো একরেখায় হলে শূন্য। এর পরম মান ত্রিভুজের ক্ষেত্রফলের দ্বিগুণ।'),
      ],
      code: raw`long long cross(long long ax, long long ay, long long bx, long long by) {
    return ax * by - ay * bx;
}
// twice the area of triangle ABC:
long long twice = llabs(cross(bx - ax, by - ay, cx - ax, cy - ay));`,
      example: { text: L('Collinearity, triangle area and convex hulls all start from this one function.', 'একরেখীয়তা, ত্রিভুজের ক্ষেত্রফল আর উত্তল আবরণ সবই এই একটি ফাংশন থেকে শুরু।') },
    },
    {
      name: L('Shoelace formula for polygon area', 'বহুভুজের ক্ষেত্রফলের শুলেস সূত্র'),
      explain: [
        L('For vertices listed in order, twice the area is |Σ (xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|. With integer vertices the result is an integer or a half-integer, so keep it doubled until printing.',
          'ক্রমানুসারে দেওয়া শীর্ষবিন্দুর জন্য ক্ষেত্রফলের দ্বিগুণ হলো |Σ (xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|। পূর্ণসংখ্যার শীর্ষে ফল একটি পূর্ণসংখ্যা বা অর্ধ-পূর্ণসংখ্যা, তাই প্রিন্ট পর্যন্ত দ্বিগুণ রাখো।'),
      ],
      code: raw`long long twice = 0;
for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    twice += x[i] * y[j] - x[j] * y[i];
}
twice = llabs(twice);   // area = twice / 2`,
      example: { text: L('Any problem with a polygon’s area or with Pick’s theorem.', 'বহুভুজের ক্ষেত্রফল বা পিকের উপপাদ্যের যেকোনো প্রবলেম।') },
    },
    {
      name: L('Use the right shape of distance', 'সঠিক ধরনের দূরত্ব ব্যবহার'),
      explain: [
        L('Points under the line x + y = L form a right isosceles triangle. The smallest such triangle covering all points has leg max(xᵢ + yᵢ). Recognising the shape turns geometry into a max.',
          'x + y = L রেখার নিচের বিন্দুগুলো একটি সমকোণী সমদ্বিবাহু ত্রিভুজ গঠন করে। সব বিন্দু ঢাকা সবচেয়ে ছোট এমন ত্রিভুজের বাহু max(xᵢ + yᵢ)। আকারটি চিনলে জ্যামিতি একটি max-এ পরিণত হয়।'),
      ],
      code: raw`long long best = 0;
for (int i = 0; i < n; i++) best = max(best, x[i] + y[i]);
cout << best << "\n";`,
      example: { problem: '1047B', text: L('Cover Points: the answer is the largest x + y.', 'Cover Points: উত্তর হলো সবচেয়ে বড় x + y।') },
    },
  ],
  mistakes: [
    L('Comparing doubles with ==; compare with an epsilon or stay in integers.', 'double-কে == দিয়ে তুলনা; epsilon দিয়ে তুলনা করো বা পূর্ণসংখ্যায় থাকো।'),
    L('Overflow in cross products with coordinates up to 10⁹: use long long.', '১০⁹ পর্যন্ত স্থানাঙ্কে ক্রস প্রোডাক্টে ওভারফ্লো: long long ব্যবহার করো।'),
    L('Forgetting the collinear case.', 'একরেখীয় কেস ভুলে যাওয়া।'),
  ],
  plan: [
    L('Write a small point struct with +, −, dot and cross and reuse it.', '+, −, dot আর cross সহ একটি ছোট point struct লিখে বারবার ব্যবহার করো।'),
    L('Do 5 easy problems (areas, orientation), then convex hull.', '৫টি সহজ প্রবলেম (ক্ষেত্রফল, দিক) করো, তারপর উত্তল আবরণ।'),
    L('Geometry is rare in Div 2 A–C; spend most practice time on other tags.', 'Div 2 A–C-তে জ্যামিতি বিরল; বেশিরভাগ অনুশীলন অন্য ট্যাগে দাও।'),
  ],
};

export const matricesGuide: TagGuide = {
  slug: 'matrices',
  intro: [
    L('The matrices tag covers grids treated as matrices and, more often, matrix exponentiation: a linear recurrence like Fibonacci can be written as a matrix times a vector, and raising the matrix to the power n computes the n-th term in O(k³ log n).',
      'ম্যাট্রিক্স ট্যাগে ম্যাট্রিক্স হিসেবে দেখা গ্রিড আর, বেশিরভাগ ক্ষেত্রে, ম্যাট্রিক্স এক্সপোনেনশিয়েশন থাকে: ফিবোনাচ্চির মতো রৈখিক পুনরাবৃত্তি একটি ম্যাট্রিক্স গুণ একটি ভেক্টর হিসেবে লেখা যায়, আর ম্যাট্রিক্সকে n ঘাতে তুললে O(k³ log n)-এ n-তম পদ পাওয়া যায়।'),
    L('Whenever n is up to 10¹⁸ and the next state depends linearly on a few previous ones, think of a k × k transition matrix.',
      'যখনই n ১০¹⁸ পর্যন্ত আর পরের অবস্থা আগের কয়েকটির ওপর রৈখিকভাবে নির্ভর করে, একটি k × k রূপান্তর ম্যাট্রিক্সের কথা ভাবো।'),
  ],
  recognize: [
    L('n up to 10¹⁸ with a recurrence.', 'পুনরাবৃত্তিসহ n ১০¹⁸ পর্যন্ত।'),
    L('“Number of paths of length exactly k in a small graph”.', '“ছোট গ্রাফে ঠিক k দৈর্ঘ্যের পথের সংখ্যা”।'),
    L('Operations on rows and columns of a grid.', 'গ্রিডের সারি আর কলামে অপারেশন।'),
  ],
  patterns: [
    {
      name: L('Matrix power', 'ম্যাট্রিক্স পাওয়ার'),
      explain: [
        L('Multiply matrices modulo m, then use the same square-and-multiply loop as fast integer power. The identity matrix plays the role of 1.',
          'মডুলো m-এ ম্যাট্রিক্স গুণ করো, তারপর দ্রুত পূর্ণসংখ্যা পাওয়ারের মতো একই বর্গ-ও-গুণ লুপ ব্যবহার করো। একক ম্যাট্রিক্স ১-এর ভূমিকা নেয়।'),
      ],
      code: raw`using Mat = vector<vector<long long>>;
Mat mul(const Mat& A, const Mat& B) {
    int k = A.size(); Mat C(k, vector<long long>(k, 0));
    for (int i = 0; i < k; i++) for (int t = 0; t < k; t++) if (A[i][t])
        for (int j = 0; j < k; j++) C[i][j] = (C[i][j] + A[i][t] * B[t][j]) % MOD;
    return C;
}
Mat mpow(Mat A, long long e) {
    Mat R(A.size(), vector<long long>(A.size(), 0));
    for (int i = 0; i < (int)A.size(); i++) R[i][i] = 1;
    for (; e > 0; e >>= 1, A = mul(A, A)) if (e & 1) R = mul(R, A);
    return R;
}`,
      example: { problem: '185A', text: L('Plant: the counts of upward and downward triangles follow a 2 × 2 linear recurrence; raise its matrix to the n-th power.', 'Plant: ওপরমুখী আর নিচমুখী ত্রিভুজের সংখ্যা একটি ২ × ২ রৈখিক পুনরাবৃত্তি মানে; এর ম্যাট্রিক্সকে n-তম ঘাতে তোলো।') },
    },
    {
      name: L('Fibonacci as a matrix', 'ম্যাট্রিক্স হিসেবে ফিবোনাচ্চি'),
      explain: [
        L('[[1, 1], [1, 0]]ⁿ = [[F(n + 1), F(n)], [F(n), F(n − 1)]]. The same idea builds the matrix for any recurrence of order k.',
          '[[১, ১], [১, ০]]ⁿ = [[F(n + ১), F(n)], [F(n), F(n − ১)]]। একই আইডিয়ায় k ক্রমের যেকোনো পুনরাবৃত্তির ম্যাট্রিক্স বানানো যায়।'),
      ],
      code: raw`Mat T = {{1, 1}, {1, 0}};
long long fib_n = mpow(T, n)[0][1];`,
      example: { text: L('Try it: compute F(10¹⁸) mod 10⁹ + 7 in microseconds.', 'চেষ্টা করো: মাইক্রোসেকেন্ডে F(১০¹⁸) mod ১০⁹ + ৭ হিসাব করো।') },
    },
    {
      name: L('Count paths of length k', 'k দৈর্ঘ্যের পথ গোনা'),
      explain: [
        L('If A is the adjacency matrix, entry (i, j) of Aᵏ is the number of walks of length exactly k from i to j.',
          'A যদি সংলগ্নতা ম্যাট্রিক্স হয়, Aᵏ-এর (i, j) ঘর হলো i থেকে j পর্যন্ত ঠিক k দৈর্ঘ্যের হাঁটার সংখ্যা।'),
      ],
      code: raw`Mat A(n, vector<long long>(n, 0));
for (auto [u, v] : edges) A[u][v] = 1;
long long walks = mpow(A, k)[s][t];`,
      example: { text: L('Classic for small graphs (n ≤ 100) with huge k.', 'বিশাল k-সহ ছোট গ্রাফের (n ≤ ১০০) জন্য ক্লাসিক।') },
    },
  ],
  mistakes: [
    L('Overflow in A[i][t] * B[t][j] when MOD is near 2⁶²; keep MOD around 10⁹.', 'MOD ২⁶²-এর কাছাকাছি হলে A[i][t] * B[t][j]-এ ওভারফ্লো; MOD প্রায় ১০⁹ রাখো।'),
    L('Off-by-one in the power: check n = 0, 1, 2 by hand.', 'ঘাতে এক কম-বেশি: n = ০, ১, ২ হাতে মিলিয়ে দেখো।'),
  ],
  plan: [
    L('Implement mul and mpow, test them on Fibonacci.', 'mul আর mpow লিখে ফিবোনাচ্চিতে পরীক্ষা করো।'),
    L('Do 5 problems turning a recurrence into a matrix.', 'একটি পুনরাবৃত্তিকে ম্যাট্রিক্সে রূপান্তরের ৫টি প্রবলেম করো।'),
  ],
};

export const crtGuide: TagGuide = {
  slug: 'crt',
  intro: [
    L('The Chinese Remainder Theorem says that if the moduli are pairwise coprime, knowing x mod m₁, …, x mod mₖ determines x mod (m₁ · … · mₖ) uniquely. In contests it appears as “combine several congruences” or “what do these remainders tell us”.',
      'চাইনিজ রিমেইন্ডার থিওরেম বলে, মডুলাসগুলো জোড়ায় জোড়ায় সহমৌলিক হলে x mod m₁, …, x mod mₖ জানলে x mod (m₁ · … · mₖ) একভাবে নির্ধারিত হয়। কনটেস্টে এটি আসে “কয়েকটি সমশেষ মেলানো” বা “এই ভাগশেষগুলো কী বলে” হিসেবে।'),
    L('A practical consequence: the remainders mod c₁, …, cₙ determine x mod k exactly when k divides lcm(c₁, …, cₙ).',
      'একটি ব্যবহারিক ফল: c₁, …, cₙ মডুলোর ভাগশেষ x mod k নির্ধারণ করে ঠিক তখনই, যখন k, lcm(c₁, …, cₙ)-কে ভাগ করে।'),
  ],
  recognize: [
    L('Several conditions x ≡ aᵢ (mod mᵢ).', 'কয়েকটি শর্ত x ≡ aᵢ (mod mᵢ)।'),
    L('Questions about what remainders reveal.', 'ভাগশেষ কী প্রকাশ করে তা নিয়ে প্রশ্ন।'),
  ],
  patterns: [
    {
      name: L('lcm of the moduli', 'মডুলাসগুলোর lcm'),
      explain: [
        L('Keep the lcm modulo k: l = lcm(l, gcd(cᵢ, k)) stays a divisor of k, so it never overflows. At the end, check l == k.',
          'lcm-কে k-এর মধ্যে রাখো: l = lcm(l, gcd(cᵢ, k)) সবসময় k-এর ভাজক থাকে, তাই কখনো ওভারফ্লো হয় না। শেষে l == k কি না দেখো।'),
      ],
      code: raw`long long l = 1;
for (long long c : cs) {
    long long g = gcd(c, k);
    l = l / gcd(l, g) * g;
}
cout << (l == k ? "Yes" : "No") << "\n";`,
      example: { problem: '687B', text: L('Remainders Game: Arya can always find x mod k exactly when k divides the lcm of the ancient numbers.', 'Remainders Game: আরিয়া সবসময় x mod k বের করতে পারে ঠিক তখনই, যখন k প্রাচীন সংখ্যাগুলোর lcm-কে ভাগ করে।') },
    },
    {
      name: L('Combine two congruences', 'দুটি সমশেষ মেলানো'),
      explain: [
        L('For x ≡ a (mod m) and x ≡ b (mod n), write x = a + m·t and solve m·t ≡ b − a (mod n) with the extended Euclidean algorithm. A solution exists only if gcd(m, n) divides b − a.',
          'x ≡ a (mod m) আর x ≡ b (mod n)-এর জন্য x = a + m·t লেখো আর বর্ধিত ইউক্লিডীয় অ্যালগরিদম দিয়ে m·t ≡ b − a (mod n) সমাধান করো। সমাধান থাকে শুধু যদি gcd(m, n), b − a-কে ভাগ করে।'),
      ],
      code: raw`long long ext(long long a, long long b, long long& x, long long& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long g = ext(b, a % b, y, x);
    y -= a / b * x;
    return g;
}`,
      example: { text: L('Merge congruences one by one; the modulus grows to the lcm.', 'সমশেষগুলো একটি একটি করে মেলাও; মডুলাস বেড়ে lcm হয়।') },
    },
  ],
  mistakes: [
    L('Computing a huge lcm directly and overflowing.', 'সরাসরি বিশাল lcm হিসাব করে ওভারফ্লো।'),
    L('Applying CRT to moduli that are not coprime without the gcd check.', 'gcd যাচাই ছাড়া সহমৌলিক নয় এমন মডুলাসে CRT প্রয়োগ।'),
  ],
  plan: [
    L('Learn extended Euclid and modular inverse first.', 'আগে বর্ধিত ইউক্লিড আর মডুলার ইনভার্স শেখো।'),
    L('Then do the few CRT problems on Codeforces; the tag is rare.', 'তারপর Codeforces-এর অল্প কয়েকটি CRT প্রবলেম করো; ট্যাগটি বিরল।'),
  ],
};

export const interactiveGuide: TagGuide = {
  slug: 'interactive',
  intro: [
    L('In an interactive problem the judge hides something, and your program asks questions and reads the answers before printing its guess. There is a limit on the number of questions, so the task is to design a strategy that always finds the answer within the limit.',
      'ইন্টারঅ্যাক্টিভ প্রবলেমে জাজ কিছু লুকিয়ে রাখে, আর তোমার প্রোগ্রাম প্রশ্ন করে উত্তর পড়ে, তারপর অনুমান প্রিন্ট করে। প্রশ্নের সংখ্যার একটি সীমা আছে, তাই কাজ হলো এমন কৌশল বানানো যা সবসময় সীমার মধ্যে উত্তর খুঁজে পায়।'),
    L('After every question you must flush the output (cout << endl or cout.flush()), otherwise the judge never sees it and you get “Idleness limit exceeded”.',
      'প্রতিটি প্রশ্নের পর আউটপুট ফ্লাশ করতে হবে (cout << endl বা cout.flush()), না হলে জাজ তা কখনো দেখে না আর “Idleness limit exceeded” আসে।'),
  ],
  recognize: [
    L('The statement has an “Interaction” section instead of fixed input.', 'স্টেটমেন্টে নির্দিষ্ট ইনপুটের বদলে “Interaction” অংশ থাকে।'),
    L('A limit like “at most 20 queries”.', '“সর্বোচ্চ ২০টি কোয়েরি”-র মতো সীমা।'),
  ],
  patterns: [
    {
      name: L('Binary search with queries', 'কোয়েরি দিয়ে বাইনারি সার্চ'),
      explain: [
        L('With an answer between 1 and n and “is it ≥ x?” questions, binary search needs ⌈log₂ n⌉ queries. 10⁶ needs only 20.',
          '১ থেকে n-এর মধ্যে উত্তর আর “এটা কি ≥ x?” প্রশ্ন থাকলে বাইনারি সার্চে ⌈log₂ n⌉টি কোয়েরি লাগে। ১০⁶-এর জন্য মাত্র ২০টি।'),
      ],
      code: raw`int lo = 1, hi = n;
while (lo < hi) {
    int mid = (lo + hi + 1) / 2;
    cout << mid << endl;              // endl flushes
    string r; cin >> r;
    if (r == ">=") lo = mid; else hi = mid - 1;
}
cout << "! " << lo << endl;`,
      example: { text: L('The standard “guess the number” interaction.', 'প্রচলিত “সংখ্যা অনুমান” ইন্টারঅ্যাকশন।') },
    },
    {
      name: L('Ask about small primes', 'ছোট মৌলিক সংখ্যা নিয়ে প্রশ্ন'),
      explain: [
        L('To decide whether a hidden number in [2, 100] is prime with 20 questions “is d a divisor?”, ask about the primes up to 50 and the squares 4, 9, 25, 49. Two “yes” answers mean composite.',
          '২০টি প্রশ্ন “d কি ভাজক?” দিয়ে [২, ১০০]-এর লুকানো সংখ্যা মৌলিক কি না বুঝতে ৫০ পর্যন্ত মৌলিক সংখ্যা আর বর্গ ৪, ৯, ২৫, ৪৯ জিজ্ঞেস করো। দুটি “হ্যাঁ” মানে যৌগিক।'),
      ],
      code: raw`int yes = 0;
for (int d : {2, 3, 4, 5, 7, 9, 11, 13, 17, 19, 23, 25, 29, 31, 37, 41, 43, 47, 49}) {
    cout << d << endl;
    string r; cin >> r;
    if (r == "yes") yes++;
}
cout << (yes >= 2 ? "composite" : "prime") << endl;`,
      example: { problem: '679A', text: L('Bear and Prime 100: exactly this list of 19 questions.', 'Bear and Prime 100: ঠিক এই ১৯টি প্রশ্নের তালিকা।') },
    },
  ],
  mistakes: [
    L('Not flushing after each query.', 'প্রতিটি কোয়েরির পর ফ্লাশ না করা।'),
    L('Using ios::sync_with_stdio(false) and then mixing printf with cout.', 'ios::sync_with_stdio(false) দিয়ে তারপর printf আর cout মেশানো।'),
    L('Asking one query too many in the worst case.', 'সবচেয়ে খারাপ ক্ষেত্রে একটি কোয়েরি বেশি করা।'),
  ],
  plan: [
    L('Write a local interactor that plays the judge, so you can test your strategy.', 'জাজের ভূমিকায় একটি লোকাল ইন্টারঅ্যাক্টর লেখো, যাতে কৌশল পরীক্ষা করতে পারো।'),
    L('Do 5 interactive problems rated 1200–1600.', '১২০০–১৬০০ রেটিংয়ের ৫টি ইন্টারঅ্যাক্টিভ প্রবলেম করো।'),
  ],
};
