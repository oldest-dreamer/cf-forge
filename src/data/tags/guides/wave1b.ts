import type { TagGuide } from '../guideTypes';

const raw = String.raw;

export const greedyGuide: TagGuide = {
  slug: 'greedy',
  intro: [
    {
      en: 'A greedy algorithm builds the answer one decision at a time and always takes the choice that looks best right now, without ever going back. When it works, it is short and fast. The whole difficulty is knowing when it works.',
      bn: 'গ্রিডি অ্যালগরিদম একবারে একটি সিদ্ধান্ত নিয়ে উত্তর তৈরি করে, আর সবসময় এই মুহূর্তে যা সেরা দেখায় সেটাই নেয়, কখনো পিছনে ফেরে না। কাজ করলে এটি ছোট আর দ্রুত। পুরো কঠিনতা হলো কখন কাজ করে তা জানা।',
    },
    {
      en: 'The usual proof is an exchange argument: take any optimal answer that differs from the greedy one, swap one choice to match the greedy, and show it does not get worse. If you cannot argue that, test the greedy against a brute force on small inputs before trusting it.',
      bn: 'সাধারণ প্রমাণ হলো বিনিময় যুক্তি: গ্রিডি থেকে আলাদা যেকোনো সেরা উত্তর নিন, গ্রিডির সঙ্গে মেলাতে একটি সিদ্ধান্ত বদলান, আর দেখান তাতে খারাপ হয় না। এটা যুক্তি দিয়ে দেখাতে না পারলে, ভরসা করার আগে ছোট ইনপুটে ব্রুট ফোর্সের সঙ্গে মিলিয়ে দেখুন।',
    },
  ],
  recognize: [
    { en: 'You must pick some items to reach a target with as few items as possible, and bigger items are always at least as useful.', bn: 'যত কম সম্ভব জিনিস নিয়ে একটি লক্ষ্যে পৌঁছাতে হবে, আর বড় জিনিস সবসময় অন্তত সমান কাজের।' },
    { en: 'After sorting, the right choice at each step becomes obvious: the largest, the smallest, the earliest deadline.', bn: 'সর্ট করার পর প্রতিটি ধাপে সঠিক সিদ্ধান্ত স্পষ্ট হয়ে যায়: সবচেয়ে বড়, সবচেয়ে ছোট, সবচেয়ে আগের ডেডলাইন।' },
  ],
  patterns: [
    {
      name: { en: 'Take the biggest first', bn: 'আগে সবচেয়ে বড়টি নেওয়া' },
      explain: [
        {
          en: 'To pass a target with the fewest items, sort in decreasing order and take items until you pass it. Any other set of the same size has a smaller total, so it cannot pass sooner.',
          bn: 'সবচেয়ে কম জিনিস নিয়ে লক্ষ্য ছাড়াতে, বড় থেকে ছোট ক্রমে সর্ট করে লক্ষ্য না ছাড়ানো পর্যন্ত নিন। একই সংখ্যক অন্য যেকোনো সেটের যোগফল কম, তাই আগে লক্ষ্য ছাড়াতে পারে না।',
        },
      ],
      code: raw`sort(a.rbegin(), a.rend());          // largest first
int taken = 0, mine = 0;
while (mine * 2 <= total) mine += a[taken++];
cout << taken << "\n";`,
      example: { problem: '160A', text: { en: 'Twins: take the largest coins until your sum is more than half of the total.', bn: 'Twins: আপনার যোগফল মোটের অর্ধেকের বেশি না হওয়া পর্যন্ত সবচেয়ে বড় কয়েনগুলো নিন।' } },
    },
    {
      name: { en: 'Pair the largest with the smallest', bn: 'সবচেয়ে বড়টির সঙ্গে সবচেয়ে ছোটটি জোড়া' },
      explain: [
        {
          en: 'When containers have a fixed capacity, put the biggest leftover item in, then fill the remaining space with the smallest items that fit. Counting by size often replaces the actual packing.',
          bn: 'পাত্রের ধারণক্ষমতা নির্দিষ্ট হলে আগে সবচেয়ে বড় বাকি জিনিসটি রাখুন, তারপর বাকি জায়গা ভরুন যতটা আঁটে এমন সবচেয়ে ছোট জিনিস দিয়ে। আসল প্যাকিংয়ের বদলে প্রায়ই মাপ অনুযায়ী গুনলেই চলে।',
        },
      ],
      code: raw`// groups of size 1..4, taxis of capacity 4
int c[5] = {};
for (int x : s) c[x]++;
int taxis = c[4] + c[3] + c[2] / 2;
int ones = max(0, c[1] - c[3]);         // ones ride with the threes
if (c[2] % 2) { taxis++; ones = max(0, ones - 2); }
taxis += (ones + 3) / 4;`,
      example: { problem: '158B', text: { en: 'Taxi: every group of 3 takes one taxi and carries a 1 if one is left; pairs of 2 share a taxi.', bn: 'Taxi: ৩-জনের প্রতিটি দল একটি ট্যাক্সি নেয় আর বাকি থাকলে একজন ১-কে সঙ্গে নেয়; ২-জনের দল জোড়ায় একটি ট্যাক্সি ভাগ করে।' } },
    },
    {
      name: { en: 'Sort, then look only at neighbours', bn: 'সর্ট করে শুধু পাশাপাশি দেখা' },
      explain: [
        {
          en: 'The two closest values in a set are always neighbours after sorting. So “smallest difference” or “best split into a low part and a high part” becomes a single pass over adjacent pairs.',
          bn: 'সর্টের পর একটি সেটের সবচেয়ে কাছের দুটি মান সবসময় পাশাপাশি থাকে। তাই “সবচেয়ে কম পার্থক্য” বা “নিচু আর উঁচু অংশে সেরা ভাগ” পাশাপাশি জোড়ার ওপর একবার চললেই হয়।',
        },
      ],
      code: raw`sort(a.begin(), a.end());
int best = INT_MAX;
for (int i = 1; i < n; i++) best = min(best, a[i] - a[i - 1]);`,
      example: { problem: '1360B', text: { en: 'Honest Coach: the best split puts a[i − 1] in one team and a[i] in the other, for some adjacent pair.', bn: 'Honest Coach: সেরা ভাগে কোনো একটি পাশাপাশি জোড়ার a[i − 1] এক দলে আর a[i] অন্য দলে যায়।' } },
    },
  ],
  mistakes: [
    { en: 'Trusting a greedy because it passes the samples. Try to break it with a tiny counterexample first.', bn: 'স্যাম্পল পাস করছে বলে গ্রিডিতে ভরসা করা। আগে একটি ছোট্ট উল্টো উদাহরণ দিয়ে ভাঙার চেষ্টা করুন।' },
    { en: 'Sorting in the wrong direction, or forgetting to sort at all.', bn: 'ভুল দিকে সর্ট করা, বা সর্ট করতেই ভুলে যাওয়া।' },
    { en: 'Using ≥ where the statement says “strictly more”.', bn: 'স্টেটমেন্ট “কঠোরভাবে বেশি” বললেও ≥ ব্যবহার করা।' },
  ],
  plan: [
    { en: 'For every greedy you write, write the brute force too and compare them on random small inputs. CF Forge’s own solutions are checked this way.', bn: 'প্রতিটি গ্রিডির সঙ্গে ব্রুট ফোর্সও লিখুন আর ছোট র‍্যান্ডম ইনপুটে মেলান। CF Forge-এর নিজের সমাধানগুলো এভাবেই যাচাই করা।' },
    { en: 'Practise saying the exchange argument in one sentence: “if an optimal answer does X instead, swapping to Y is no worse because …”.', bn: 'বিনিময় যুক্তি এক বাক্যে বলা অনুশীলন করুন: “কোনো সেরা উত্তর Y-এর বদলে X করলে, Y-তে বদলালে খারাপ হয় না কারণ …”।' },
    { en: 'Climb the ladder to 1200, where greedy problems start needing a real proof.', bn: 'সিঁড়ি ধরে ১২০০ পর্যন্ত উঠুন, যেখানে গ্রিডি প্রবলেমে সত্যিকারের প্রমাণ লাগতে শুরু করে।' },
  ],
};

export const bruteForceGuide: TagGuide = {
  slug: 'brute-force',
  intro: [
    {
      en: 'Brute force means trying every candidate and keeping the ones that work. It is not a beginner’s fallback: it is the first thing strong competitors check. If the candidates are few enough, the simplest correct code wins, because it cannot have a clever bug.',
      bn: 'ব্রুট ফোর্স মানে সব সম্ভাব্য উত্তর চেষ্টা করে যেগুলো কাজ করে সেগুলো রাখা। এটা নতুনদের শেষ ভরসা নয়: দক্ষ প্রতিযোগীরা প্রথমেই এটা দেখেন। সম্ভাব্য উত্তর যথেষ্ট কম হলে সবচেয়ে সহজ সঠিক কোডই জেতে, কারণ এতে চালাক বাগ থাকতে পারে না।',
    },
    {
      en: 'The skill is counting: estimate how many candidates there are and how long checking one takes. Up to about 10⁸ simple steps in total is fine for one second.',
      bn: 'দক্ষতাটি হলো গোনা: কতগুলো সম্ভাব্য উত্তর আর একটি যাচাইয়ে কত সময় লাগে তা আন্দাজ করা। মোট প্রায় ১০⁸টি সাধারণ ধাপ পর্যন্ত এক সেকেন্ডে চলে।',
    },
  ],
  recognize: [
    { en: 'The answer lies in a small range, like a year between 1000 and 9000 or a number up to 1000.', bn: 'উত্তর একটি ছোট পরিসরে, যেমন ১০০০ থেকে ৯০০০-এর মধ্যে একটি বছর বা ১০০০ পর্যন্ত একটি সংখ্যা।' },
    { en: '“Find the smallest … such that …” where you can test one candidate easily.', bn: '“সবচেয়ে ছোট … বের করো যাতে …” যেখানে একটি সম্ভাব্য উত্তর সহজে পরীক্ষা করা যায়।' },
  ],
  patterns: [
    {
      name: { en: 'Try the next candidate until one works', bn: 'কাজ না করা পর্যন্ত পরের সম্ভাব্য উত্তর চেষ্টা' },
      explain: [
        {
          en: 'Start just after the given value and step forward, testing each candidate with a small helper function. Put the test in its own function so the loop stays readable.',
          bn: 'দেওয়া মানের ঠিক পর থেকে শুরু করে এগিয়ে যান, ছোট একটি সহায়ক ফাংশন দিয়ে প্রতিটি সম্ভাব্য উত্তর পরীক্ষা করুন। পরীক্ষাটি আলাদা ফাংশনে রাখুন, যাতে লুপ পড়তে সহজ থাকে।',
        },
      ],
      code: raw`bool distinctDigits(int y) {
    string s = to_string(y);
    sort(s.begin(), s.end());
    return unique(s.begin(), s.end()) == s.end();
}
// ...
int y;
cin >> y;
do y++; while (!distinctDigits(y));
cout << y << "\n";`,
      example: { problem: '271A', text: { en: 'Beautiful Year: at most a few thousand years to try, each checked in four steps.', bn: 'Beautiful Year: সর্বোচ্চ কয়েক হাজার বছর চেষ্টা, প্রতিটি চার ধাপে যাচাই।' } },
    },
    {
      name: { en: 'Generate the small special set', bn: 'ছোট বিশেষ সেটটি তৈরি করা' },
      explain: [
        {
          en: 'Sometimes the candidates themselves are few: numbers made of the digits 4 and 7, powers of two, perfect squares. List them all, then test each one against the input.',
          bn: 'কখনো সম্ভাব্য উত্তরগুলো নিজেরাই কম: শুধু ৪ আর ৭ অঙ্কের সংখ্যা, দুইয়ের ঘাত, পূর্ণবর্গ। সবগুলোর তালিকা করুন, তারপর প্রতিটিকে ইনপুটের সঙ্গে মেলান।',
        },
      ],
      code: raw`int lucky[] = {4, 7, 44, 47, 74, 77, 444, 447, 474, 477, 744, 747, 774, 777};
bool ok = false;
for (int d : lucky) if (n % d == 0) ok = true;`,
      example: { problem: '122A', text: { en: 'Lucky Division: only 14 lucky numbers are at most 1000.', bn: 'Lucky Division: ১০০০ পর্যন্ত মাত্র ১৪টি লাকি সংখ্যা।' } },
    },
  ],
  mistakes: [
    { en: 'Skipping brute force because it “feels too easy”, then writing a buggy clever solution.', bn: 'ব্রুট ফোর্স “খুব সহজ লাগে” বলে বাদ দিয়ে বাগযুক্ত চালাক সমাধান লেখা।' },
    { en: 'Not counting the work: a loop over 10⁹ candidates will not finish.', bn: 'কাজ না গোনা: ১০⁹টি সম্ভাব্য উত্তরের লুপ শেষ হবে না।' },
    { en: 'Starting the search at the given value when the statement asks for something strictly larger.', bn: 'স্টেটমেন্ট কঠোরভাবে বড় কিছু চাইলেও দেওয়া মান থেকেই খোঁজ শুরু করা।' },
  ],
  plan: [
    { en: 'For every problem, first ask: how many candidates are there? If under 10⁷, brute force it.', bn: 'প্রতিটি প্রবলেমে আগে জিজ্ঞেস করুন: কতগুলো সম্ভাব্য উত্তর? ১০⁷-এর কম হলে ব্রুট ফোর্স করুন।' },
    { en: 'Keep your brute forces: they become the checkers for your faster solutions later.', bn: 'ব্রুট ফোর্সগুলো রেখে দিন: পরে দ্রুত সমাধান যাচাইয়ে এগুলোই কাজে লাগবে।' },
  ],
};

export const stringsGuide: TagGuide = {
  slug: 'strings',
  intro: [
    {
      en: 'String problems give you text and ask you to inspect, count or transform it. At 800–1200 the tools are always the same: loop over characters, compare, count with an array of 26, change case, and build a new string.',
      bn: 'স্ট্রিং প্রবলেমে লেখা দেওয়া থাকে আর তা দেখতে, গুনতে বা বদলাতে বলা হয়। ৮০০–১২০০ রেটিংয়ে টুল সবসময় একই: অক্ষরের ওপর লুপ, তুলনা, ২৬ ঘরের অ্যারেতে গণনা, হাতের ধরন বদলানো, আর নতুন স্ট্রিং তৈরি।',
    },
    {
      en: 'Characters are small numbers, and lowercase letters are consecutive, so c − \'a\' turns a letter into an index from 0 to 25. That single idea solves most counting tasks.',
      bn: 'অক্ষর আসলে ছোট সংখ্যা, আর ছোট হাতের অক্ষরগুলো পরপর, তাই c − \'a\' একটি অক্ষরকে ০ থেকে ২৫-এর ইনডেক্সে বদলায়। এই একটি আইডিয়াতেই বেশিরভাগ গণনার কাজ হয়ে যায়।',
    },
  ],
  recognize: [
    { en: 'The input is a word or a line of letters, and the output is a count, YES/NO, or a changed string.', bn: 'ইনপুট একটি শব্দ বা অক্ষরের লাইন, আর আউটপুট একটি গণনা, YES/NO, বা বদলানো স্ট্রিং।' },
    { en: 'Upper and lower case are mentioned: the statement wants case-insensitive comparison or a case change.', bn: 'বড় আর ছোট হাতের অক্ষরের কথা আছে: স্টেটমেন্ট হয় হাতের ধরন উপেক্ষা করে তুলনা, নয়তো ধরন বদল চায়।' },
  ],
  patterns: [
    {
      name: { en: 'Count letters with an array of 26', bn: '২৬ ঘরের অ্যারেতে অক্ষর গোনা' },
      explain: [
        {
          en: 'Lowercase each character, then add one at cnt[c − \'a\']. Questions like “how many distinct letters” or “does every letter appear” become a loop over the 26 counters.',
          bn: 'প্রতিটি অক্ষর ছোট হাতের করে cnt[c − \'a\']-এ এক যোগ করুন। “কতগুলো ভিন্ন অক্ষর” বা “প্রতিটি অক্ষর আছে কি” ধরনের প্রশ্ন ২৬টি কাউন্টারের ওপর একটি লুপে পরিণত হয়।',
        },
      ],
      code: raw`int cnt[26] = {};
for (char c : s) cnt[tolower(c) - 'a']++;
int distinct = 0;
for (int i = 0; i < 26; i++) if (cnt[i] > 0) distinct++;`,
      example: { problem: '236A', text: { en: 'Boy or Girl: the answer depends only on whether the number of distinct letters is odd.', bn: 'Boy or Girl: উত্তর শুধু নির্ভর করে ভিন্ন অক্ষরের সংখ্যা বিজোড় কি না তার ওপর।' } },
    },
    {
      name: { en: 'Build the answer character by character', bn: 'অক্ষর ধরে ধরে উত্তর তৈরি' },
      explain: [
        {
          en: 'Start with an empty string and decide for each input character what to append: nothing, the character itself, or something else. s += c is fast; avoid s = s + c inside loops.',
          bn: 'খালি স্ট্রিং দিয়ে শুরু করুন আর প্রতিটি ইনপুট অক্ষরের জন্য ঠিক করুন কী যোগ হবে: কিছুই না, অক্ষরটি নিজে, বা অন্য কিছু। s += c দ্রুত; লুপের ভেতরে s = s + c এড়িয়ে চলুন।',
        },
      ],
      code: raw`string out;
for (char c : s) {
    c = tolower(c);
    if (string("aoyeui").find(c) != string::npos) continue;   // drop vowels
    out += '.';
    out += c;
}`,
      example: { problem: '118A', text: { en: 'String Task: delete vowels, lowercase the rest, and put a dot before each.', bn: 'String Task: স্বরবর্ণ মুছুন, বাকিগুলো ছোট হাতের করুন, আর প্রতিটির আগে একটি বিন্দু দিন।' } },
    },
    {
      name: { en: 'Compare ignoring case', bn: 'হাতের ধরন উপেক্ষা করে তুলনা' },
      explain: [
        {
          en: 'Transform both strings to lowercase first, then compare normally with <, > and ==. Strings compare lexicographically, like a dictionary.',
          bn: 'আগে দুটি স্ট্রিংকেই ছোট হাতের করুন, তারপর <, > আর == দিয়ে সাধারণভাবে তুলনা করুন। স্ট্রিং অভিধানের মতো শব্দানুক্রমে তুলনা হয়।',
        },
      ],
      code: raw`for (char& c : a) c = tolower(c);
for (char& c : b) c = tolower(c);
cout << (a < b ? -1 : a > b ? 1 : 0) << "\n";`,
      example: { problem: '112A', text: { en: 'Petya and Strings: lowercase both, then a single comparison decides.', bn: 'Petya and Strings: দুটিকে ছোট হাতের করুন, তারপর একটি তুলনাই সিদ্ধান্ত দেয়।' } },
    },
  ],
  mistakes: [
    { en: 'Reading a line with spaces using cin >> s, which stops at the first space.', bn: 'স্পেসসহ লাইন cin >> s দিয়ে পড়া, যা প্রথম স্পেসে থেমে যায়।' },
    { en: 'Forgetting that Y counts as a vowel when the statement says so.', bn: 'স্টেটমেন্ট বললেও Y-কে স্বরবর্ণ ধরতে ভুলে যাওয়া।' },
    { en: 'Indexing s[i + 1] at the last character.', bn: 'শেষ অক্ষরে s[i + 1] পড়া।' },
  ],
  plan: [
    { en: 'Learn toupper, tolower, isupper, islower, isdigit, reverse and string::find until you can write them without looking.', bn: 'toupper, tolower, isupper, islower, isdigit, reverse আর string::find এমনভাবে শিখুন যাতে না দেখে লিখতে পারেন।' },
    { en: 'Solve the 800 string problems in the ladder, then move to 1200, where prefix counts and two pointers start to appear.', bn: 'সিঁড়ির ৮০০-র স্ট্রিং প্রবলেমগুলো সমাধান করুন, তারপর ১২০০-তে যান, যেখানে প্রিফিক্স গণনা আর টু পয়েন্টার আসতে শুরু করে।' },
  ],
};

export const sortingsGuide: TagGuide = {
  slug: 'sortings',
  intro: [
    {
      en: 'Sorting is the most useful single step in competitive programming. Once data is in order, the largest and smallest are at the ends, equal values sit together, close values are neighbours, and many greedy choices become obvious.',
      bn: 'প্রতিযোগিতামূলক প্রোগ্রামিংয়ে সর্টিংই সবচেয়ে কাজের একক ধাপ। ডেটা সাজানো হলে সবচেয়ে বড় আর ছোট দুই প্রান্তে থাকে, সমান মানগুলো একসঙ্গে বসে, কাছের মানগুলো পাশাপাশি থাকে, আর অনেক গ্রিডি সিদ্ধান্ত স্পষ্ট হয়ে যায়।',
    },
    {
      en: 'std::sort runs in O(n log n), fast enough for millions of elements. The question to ask on every problem is: “does the original order matter?” If not, sort first and think second.',
      bn: 'std::sort O(n log n)-এ চলে, লাখ লাখ উপাদানের জন্য যথেষ্ট দ্রুত। প্রতিটি প্রবলেমে প্রশ্ন করুন: “মূল ক্রম কি গুরুত্বপূর্ণ?” না হলে আগে সর্ট, পরে চিন্তা।',
    },
  ],
  recognize: [
    { en: 'The answer would be the same if the input were shuffled.', bn: 'ইনপুট এলোমেলো করলেও উত্তর একই থাকত।' },
    { en: 'Words like smallest difference, k-th largest, median, or rearrange in order.', bn: 'সবচেয়ে কম পার্থক্য, k-তম বড়, মধ্যমা, বা ক্রমে সাজাও এমন শব্দ।' },
  ],
  patterns: [
    {
      name: { en: 'Sort, then scan once', bn: 'সর্ট করে একবার দেখা' },
      explain: [
        {
          en: 'After sorting, one pass answers questions about extremes, duplicates and gaps. Combined with the sort it is O(n log n).',
          bn: 'সর্টের পর একবার দেখলেই চরম মান, ডুপ্লিকেট আর ফাঁক নিয়ে প্রশ্নের উত্তর মেলে। সর্টসহ এটি O(n log n)।',
        },
      ],
      code: raw`sort(a.begin(), a.end());
int gaps = INT_MAX;
for (int i = 1; i < n; i++) gaps = min(gaps, a[i] - a[i - 1]);`,
      example: { problem: '1360B', text: { en: 'Honest Coach: the smallest adjacent gap after sorting is the answer.', bn: 'Honest Coach: সর্টের পর সবচেয়ে ছোট পাশাপাশি ফাঁকই উত্তর।' } },
    },
    {
      name: { en: 'Pull values out, sort, put them back', bn: 'মান বের করে সর্ট করে আবার বসানো' },
      explain: [
        {
          en: 'When numbers are hidden inside text, extract them into a vector, sort it, and rebuild the text. Counting sort is even simpler when values come from a tiny range like 1..3.',
          bn: 'সংখ্যা লেখার ভেতরে লুকানো থাকলে সেগুলো একটি ভেক্টরে বের করে সর্ট করুন, তারপর লেখাটি আবার বানান। মান ১..৩-এর মতো ছোট পরিসর থেকে এলে কাউন্টিং সর্ট আরও সহজ।',
        },
      ],
      code: raw`vector<char> d;
for (char c : s) if (c != '+') d.push_back(c);
sort(d.begin(), d.end());
for (int i = 0; i < (int)d.size(); i++) cout << (i ? "+" : "") << d[i];`,
      example: { problem: '339A', text: { en: 'Helpful Maths: take the digits out of "3+2+1", sort them, and join them with plus signs.', bn: 'Helpful Maths: "3+2+1" থেকে অঙ্কগুলো বের করে সর্ট করুন, তারপর যোগ চিহ্ন দিয়ে জুড়ুন।' } },
    },
  ],
  mistakes: [
    { en: 'Sorting when the problem asks about original positions; sort (value, index) pairs instead.', bn: 'প্রবলেম মূল অবস্থান নিয়ে প্রশ্ন করলেও সর্ট করা; বরং (মান, ইনডেক্স) জোড়া সর্ট করুন।' },
    { en: 'Writing a comparator with <= or >=, which can crash sort.', bn: '<= বা >= দিয়ে কম্পেয়ারেটর লেখা, যাতে sort ক্র্যাশ করতে পারে।' },
  ],
  plan: [
    { en: 'Whenever you are stuck, ask “what if I sort it?” and write the sorted sample on paper.', bn: 'আটকে গেলেই জিজ্ঞেস করুন “সর্ট করলে কী হয়?” আর কাগজে সাজানো স্যাম্পল লিখুন।' },
    { en: 'Learn sort with greater<>(), with a lambda, and on pairs, then climb the ladder to 1300.', bn: 'greater<>() দিয়ে, ল্যাম্বডা দিয়ে আর pair-এর ওপর sort শিখুন, তারপর সিঁড়ি ধরে ১৩০০ পর্যন্ত উঠুন।' },
  ],
};
