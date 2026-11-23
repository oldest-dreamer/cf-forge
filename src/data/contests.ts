import type { L } from '@/i18n/types';

export type ScoringSystem = 'standard' | 'icpc';

export type Slot = {
  /** Problem letter range, e.g. "A", "B", "E–G". */
  letter: string;
  /** Typical rating range for this slot. */
  low: number;
  high: number;
  note: L;
};

export type ContestType = {
  id: string;
  name: string;
  ratedFor: L;
  /** Rating bounds of the rated audience, for the ladder bar. */
  band: [number, number];
  scoring: ScoringSystem;
  shape: L;
  hacks: L;
  slots: Slot[];
  strategy: L[];
};

export const SYSTEMS: Record<ScoringSystem, { name: L; body: L }> = {
  standard: {
    name: { en: 'Standard scoring', bn: 'স্ট্যান্ডার্ড স্কোরিং' },
    body: {
      en: 'Each problem has a point value that drops the longer you take. A wrong attempt costs 50 points if you later solve that problem. Successful hacks give +100, unsuccessful ones −50. Solving a hard problem late can still beat solving an easy one early, so read the point values.',
      bn: 'প্রতিটি প্রবলেমের একটি পয়েন্ট আছে, যা দেরি হলে কমতে থাকে। পরে সমাধান করলে প্রতিটি ভুল চেষ্টায় ৫০ পয়েন্ট কাটা যায়। সফল হ্যাকে +১০০, ব্যর্থ হ্যাকে −৫০। দেরিতে কঠিন প্রবলেম সমাধান করেও আগে সহজটি করার চেয়ে বেশি পাওয়া যায়, তাই পয়েন্টগুলো দেখে নিন।',
    },
  },
  icpc: {
    name: { en: 'Extended ICPC', bn: 'এক্সটেন্ডেড ICPC' },
    body: {
      en: 'Every problem is worth the same. Rank is by number solved, then by penalty: the minute of each accepted solution plus 10 minutes for each wrong attempt before it. After the round there is a 12-hour open hacking phase; then all solutions are retested on the new tests.',
      bn: 'সব প্রবলেমের মূল্য সমান। র‍্যাংক ঠিক হয় কতগুলো সমাধান হলো তা দিয়ে, তারপর পেনাল্টি দিয়ে: প্রতিটি অ্যাকসেপ্টেড সমাধানের মিনিট, সঙ্গে তার আগের প্রতিটি ভুল চেষ্টায় ১০ মিনিট। রাউন্ডের পর ১২ ঘণ্টার ওপেন হ্যাকিং চলে; তারপর নতুন টেস্টে সব সমাধান আবার যাচাই হয়।',
    },
  },
};

export const CONTESTS: ContestType[] = [
  {
    id: 'div4',
    name: 'Div. 4',
    ratedFor: { en: 'Rating below 1400', bn: '১৪০০-এর নিচে রেটিং' },
    band: [0, 1399],
    scoring: 'icpc',
    shape: { en: 'Usually 7–8 problems in about 2 h 30 min.', bn: 'সাধারণত প্রায় ২ ঘণ্টা ৩০ মিনিটে ৭–৮টি প্রবলেম।' },
    hacks: { en: 'Only in the 12-hour phase after the round. Hacks give no points.', bn: 'শুধু রাউন্ডের পরের ১২ ঘণ্টায়। হ্যাকে কোনো পয়েন্ট নেই।' },
    slots: [
      { letter: 'A–B', low: 800, high: 800, note: { en: 'Read carefully and implement. One loop or one formula.', bn: 'মন দিয়ে পড়ে ইমপ্লিমেন্ট করুন। একটি লুপ বা একটি সূত্র।' } },
      { letter: 'C–D', low: 900, high: 1200, note: { en: 'Simple greedy, counting with a map, prefix sums.', bn: 'সহজ গ্রিডি, map দিয়ে গণনা, প্রিফিক্স সাম।' } },
      { letter: 'E–F', low: 1200, high: 1600, note: { en: 'Two pointers, binary search, light math or a BFS.', bn: 'টু পয়েন্টার, বাইনারি সার্চ, হালকা গণিত বা BFS।' } },
      { letter: 'G–H', low: 1700, high: 2100, note: { en: 'DP, DSU, graph tricks. A stretch goal.', bn: 'DP, DSU, গ্রাফের কৌশল। লক্ষ্যের চেয়ে একটু উঁচুতে।' } },
    ],
    strategy: [
      { en: 'Speed and zero wrong attempts matter most; each wrong attempt costs 10 minutes.', bn: 'গতি আর শূন্য ভুল চেষ্টাই সবচেয়ে জরুরি; প্রতিটি ভুলে ১০ মিনিট যায়।' },
      { en: 'Test on the samples and one edge case before every submit.', bn: 'প্রতিটি সাবমিটের আগে স্যাম্পল আর একটি এজ কেসে পরীক্ষা করুন।' },
      { en: 'Your solution can still be hacked for 12 hours, so avoid int overflow and slow I/O.', bn: '১২ ঘণ্টা পর্যন্ত সমাধান হ্যাক হতে পারে, তাই int ওভারফ্লো আর ধীর I/O এড়িয়ে চলুন।' },
    ],
  },
  {
    id: 'div3',
    name: 'Div. 3',
    ratedFor: { en: 'Rating below 1600', bn: '১৬০০-এর নিচে রেটিং' },
    band: [0, 1599],
    scoring: 'icpc',
    shape: { en: 'Usually 7 problems in 2 h 15 min.', bn: 'সাধারণত ২ ঘণ্টা ১৫ মিনিটে ৭টি প্রবলেম।' },
    hacks: { en: 'Only in the 12-hour phase after the round. Hacks give no points.', bn: 'শুধু রাউন্ডের পরের ১২ ঘণ্টায়। হ্যাকে কোনো পয়েন্ট নেই।' },
    slots: [
      { letter: 'A', low: 800, high: 800, note: { en: 'Warm-up: direct simulation or a formula.', bn: 'ওয়ার্ম-আপ: সরাসরি সিমুলেশন বা সূত্র।' } },
      { letter: 'B–C', low: 900, high: 1300, note: { en: 'Greedy, sorting, counting.', bn: 'গ্রিডি, সর্টিং, গণনা।' } },
      { letter: 'D–E', low: 1400, high: 1800, note: { en: 'Binary search, two pointers, prefix sums, BFS/DFS.', bn: 'বাইনারি সার্চ, টু পয়েন্টার, প্রিফিক্স সাম, BFS/DFS।' } },
      { letter: 'F–G', low: 1900, high: 2300, note: { en: 'DP, trees, DSU, data structures.', bn: 'DP, ট্রি, DSU, ডেটা স্ট্রাকচার।' } },
    ],
    strategy: [
      { en: 'Solve in order; the letters are sorted by difficulty more strictly than in Div. 2.', bn: 'ক্রমানুসারে সমাধান করুন; Div. 2-এর চেয়ে এখানে অক্ষরগুলো কঠিনতা অনুযায়ী বেশি সাজানো।' },
      { en: 'To appear in the official standings you must be a trusted participant: at least five rated rounds with a problem solved in each, and never rated 1900 or higher.', bn: 'অফিশিয়াল স্ট্যান্ডিংসে থাকতে হলে ট্রাস্টেড অংশগ্রহণকারী হতে হবে: কমপক্ষে পাঁচটি রেটেড রাউন্ড, প্রতিটিতে অন্তত একটি সমাধান, আর কখনো ১৯০০ বা তার বেশি রেটিং না থাকা।' },
      { en: 'Expect anti-hash and max-size tests in the hacking phase.', bn: 'হ্যাকিং পর্বে অ্যান্টি-হ্যাশ আর সর্বোচ্চ আকারের টেস্ট আশা করুন।' },
    ],
  },
  {
    id: 'edu',
    name: 'Educational',
    ratedFor: { en: 'Rating below 2100', bn: '২১০০-এর নিচে রেটিং' },
    band: [0, 2099],
    scoring: 'icpc',
    shape: { en: 'Usually 6–7 problems in 2 hours.', bn: 'সাধারণত ২ ঘণ্টায় ৬–৭টি প্রবলেম।' },
    hacks: { en: 'Only in the 12-hour phase after the round. Hacks give no points.', bn: 'শুধু রাউন্ডের পরের ১২ ঘণ্টায়। হ্যাকে কোনো পয়েন্ট নেই।' },
    slots: [
      { letter: 'A', low: 800, high: 1000, note: { en: 'Short and clean.', bn: 'ছোট ও পরিষ্কার।' } },
      { letter: 'B–C', low: 1100, high: 1600, note: { en: 'Classic techniques in a light disguise.', bn: 'হালকা ছদ্মবেশে প্রচলিত কৌশল।' } },
      { letter: 'D–E', low: 1700, high: 2200, note: { en: 'Textbook DP, combinatorics, segment trees.', bn: 'বইয়ের মতো DP, কম্বিনেটরিক্স, সেগমেন্ট ট্রি।' } },
      { letter: 'F+', low: 2300, high: 2800, note: { en: 'Hard, and very instructive to upsolve.', bn: 'কঠিন, আর পরে সমাধান করলে অনেক কিছু শেখা যায়।' } },
    ],
    strategy: [
      { en: 'These rounds teach standard ideas; upsolve one problem past your limit every time.', bn: 'এই রাউন্ডগুলো প্রচলিত আইডিয়া শেখায়; প্রতিবার নিজের সীমার পরের একটি প্রবলেম পরে সমাধান করুন।' },
      { en: 'All problems are worth the same, so skip a stuck problem quickly.', bn: 'সব প্রবলেমের মূল্য সমান, তাই আটকে গেলে দ্রুত পরেরটিতে যান।' },
    ],
  },
  {
    id: 'div2',
    name: 'Div. 2',
    ratedFor: { en: 'Rating below 2100', bn: '২১০০-এর নিচে রেটিং' },
    band: [0, 2099],
    scoring: 'standard',
    shape: { en: 'Usually 6 problems in 2 hours, sometimes with easy and hard versions.', bn: 'সাধারণত ২ ঘণ্টায় ৬টি প্রবলেম, কখনো সহজ ও কঠিন সংস্করণসহ।' },
    hacks: { en: 'During the round, after you lock a problem. +100 / −50.', bn: 'রাউন্ড চলাকালীন, প্রবলেম লক করার পর। +১০০ / −৫০।' },
    slots: [
      { letter: 'A', low: 800, high: 1000, note: { en: 'Observation-based, often a one-liner after thinking.', bn: 'পর্যবেক্ষণনির্ভর, ভাবার পর প্রায়ই এক লাইনের উত্তর।' } },
      { letter: 'B', low: 1000, high: 1300, note: { en: 'Greedy or constructive with a short proof.', bn: 'ছোট প্রমাণসহ গ্রিডি বা কনস্ট্রাকটিভ।' } },
      { letter: 'C', low: 1300, high: 1700, note: { en: 'The usual dividing line between Pupil and Specialist.', bn: 'সাধারণত পিউপিল আর স্পেশালিস্টের মাঝের সীমারেখা।' } },
      { letter: 'D', low: 1700, high: 2100, note: { en: 'Binary search on answer, DP, graphs, number theory.', bn: 'উত্তরের ওপর বাইনারি সার্চ, DP, গ্রাফ, সংখ্যাতত্ত্ব।' } },
      { letter: 'E–F', low: 2100, high: 2700, note: { en: 'Often shared with Div. 1 B–D.', bn: 'প্রায়ই Div. 1-এর B–D-এর সঙ্গে একই।' } },
    ],
    strategy: [
      { en: 'Points fall over time, so solve A and B fast before thinking long about C.', bn: 'সময়ের সঙ্গে পয়েন্ট কমে, তাই C নিয়ে লম্বা ভাবার আগে A আর B দ্রুত করুন।' },
      { en: 'Pretests are not the final tests. Check overflow and edge cases before submitting.', bn: 'প্রিটেস্ট চূড়ান্ত টেস্ট নয়। সাবমিটের আগে ওভারফ্লো আর এজ কেস দেখে নিন।' },
      { en: 'Problems are not always sorted by difficulty; glance at the solve counts.', bn: 'প্রবলেম সবসময় কঠিনতা অনুযায়ী সাজানো নয়; কতজন সমাধান করেছে তা দেখে নিন।' },
    ],
  },
  {
    id: 'div1',
    name: 'Div. 1',
    ratedFor: { en: 'Rating 1900 or higher', bn: '১৯০০ বা তার বেশি রেটিং' },
    band: [1900, 3800],
    scoring: 'standard',
    shape: { en: 'Usually 6 problems in 2–2.5 hours, run in parallel with a Div. 2.', bn: 'সাধারণত ২–২.৫ ঘণ্টায় ৬টি প্রবলেম, একটি Div. 2-এর সঙ্গে একসঙ্গে।' },
    hacks: { en: 'During the round, after you lock a problem. +100 / −50.', bn: 'রাউন্ড চলাকালীন, প্রবলেম লক করার পর। +১০০ / −৫০।' },
    slots: [
      { letter: 'A', low: 1500, high: 1900, note: { en: 'Usually Div. 2 C or D.', bn: 'সাধারণত Div. 2-এর C বা D।' } },
      { letter: 'B–C', low: 1900, high: 2500, note: { en: 'Strong observations plus a standard tool.', bn: 'জোরালো পর্যবেক্ষণ আর একটি প্রচলিত টুল।' } },
      { letter: 'D+', low: 2500, high: 3500, note: { en: 'Research-level ideas and heavy data structures.', bn: 'গবেষণাধর্মী আইডিয়া আর ভারী ডেটা স্ট্রাকচার।' } },
    ],
    strategy: [
      { en: 'Your long-term goal. Train Div. 2 C and D until they feel routine.', bn: 'দীর্ঘমেয়াদি লক্ষ্য। Div. 2-এর C আর D স্বাভাবিক মনে না হওয়া পর্যন্ত অনুশীলন করুন।' },
    ],
  },
  {
    id: 'combined',
    name: 'Div. 1 + Div. 2',
    ratedFor: { en: 'Everyone', bn: 'সবার জন্য' },
    band: [0, 3800],
    scoring: 'standard',
    shape: { en: 'Usually 7–9 problems in 2.5–3 hours, one shared problemset.', bn: 'সাধারণত ২.৫–৩ ঘণ্টায় ৭–৯টি প্রবলেম, সবার জন্য একই সেট।' },
    hacks: { en: 'During the round, after you lock a problem. +100 / −50.', bn: 'রাউন্ড চলাকালীন, প্রবলেম লক করার পর। +১০০ / −৫০।' },
    slots: [
      { letter: 'A–B', low: 800, high: 1300, note: { en: 'Accessible, but expect tricky observations.', bn: 'সহজলভ্য, তবে কৌশলী পর্যবেক্ষণ থাকতে পারে।' } },
      { letter: 'C–D', low: 1500, high: 2100, note: { en: 'Where most of the rating changes happen.', bn: 'বেশিরভাগ রেটিং পরিবর্তন এখানেই হয়।' } },
      { letter: 'E+', low: 2300, high: 3500, note: { en: 'Top-level problems.', bn: 'শীর্ষ পর্যায়ের প্রবলেম।' } },
    ],
    strategy: [
      { en: 'Global Rounds belong here too: open and rated for everyone.', bn: 'গ্লোবাল রাউন্ডও এর মধ্যে পড়ে: সবার জন্য খোলা ও রেটেড।' },
      { en: 'A fast A and B against the whole field moves your rating a lot.', bn: 'সবার বিপক্ষে দ্রুত A আর B করলে রেটিং অনেক বাড়ে।' },
    ],
  },
];
