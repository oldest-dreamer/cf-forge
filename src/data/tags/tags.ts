import type { L } from '@/i18n/types';

export type TagGroup = 'core' | 'math' | 'graphs' | 'strings' | 'advanced';

export type TagInfo = {
  slug: string;
  /** Exact tag string used by Codeforces and its API. */
  cf: string;
  name: L;
  group: TagGroup;
  blurb: L;
  /** Clues in a statement that point to this tag. */
  signals: L[];
};

const t = <S extends string>(
  slug: S,
  cf: string,
  group: TagGroup,
  name: L,
  blurb: L,
  signals: L[],
): TagInfo & { slug: S } => ({ slug, cf, group, name, blurb, signals });

export const TAGS = [
  // ── Core ───────────────────────────────────────────────
  t('implementation', 'implementation', 'core',
    { en: 'Implementation', bn: 'ইমপ্লিমেন্টেশন' },
    { en: 'Do exactly what the statement says, carefully. The idea is easy; the bugs are not.', bn: 'স্টেটমেন্টে যা বলা আছে ঠিক তা-ই সাবধানে করা। আইডিয়া সহজ, কিন্তু বাগ সহজ নয়।' },
    [
      { en: 'Small limits and a long list of rules to follow step by step.', bn: 'ছোট সীমা আর ধাপে ধাপে মানতে হবে এমন অনেক নিয়ম।' },
      { en: 'The statement reads like a simulation: “then”, “after that”, “repeat”.', bn: 'স্টেটমেন্ট সিমুলেশনের মতো: “তারপর”, “এরপর”, “আবার করো”।' },
    ]),
  t('brute-force', 'brute force', 'core',
    { en: 'Brute force', bn: 'ব্রুট ফোর্স' },
    { en: 'Try every candidate and keep the good ones. Works whenever the search space is small enough.', bn: 'সব সম্ভাব্য উত্তর চেষ্টা করে ভালোগুলো রাখা। খোঁজার জায়গা যথেষ্ট ছোট হলেই কাজ করে।' },
    [
      { en: 'n is tiny (n ≤ 10, values ≤ 100) or the answer range is small.', bn: 'n খুব ছোট (n ≤ ১০, মান ≤ ১০০) অথবা উত্তরের পরিসর ছোট।' },
      { en: 'You can count the candidates and the count is under about 10⁸.', bn: 'সম্ভাব্য উত্তর গুনে দেখা যায়, আর সংখ্যাটা প্রায় ১০⁸-এর কম।' },
    ]),
  t('greedy', 'greedy', 'core',
    { en: 'Greedy', bn: 'গ্রিডি' },
    { en: 'Make the locally best choice at each step and prove it never hurts later.', bn: 'প্রতিটি ধাপে তখনকার সেরা সিদ্ধান্ত নেওয়া, আর প্রমাণ করা যে এতে পরে ক্ষতি হয় না।' },
    [
      { en: '“Minimum number of operations” or “maximum you can take” with large n.', bn: 'বড় n-এর সঙ্গে “সর্বনিম্ন কতবার” বা “সর্বোচ্চ কতগুলো নেওয়া যায়”।' },
      { en: 'Sorting the input makes the right choice obvious.', bn: 'ইনপুট সর্ট করলেই সঠিক সিদ্ধান্ত পরিষ্কার হয়ে যায়।' },
    ]),
  t('sortings', 'sortings', 'core',
    { en: 'Sortings', bn: 'সর্টিং' },
    { en: 'Put things in order so that pairs, gaps or ranks become easy to read off.', bn: 'জিনিসগুলো সাজিয়ে নেওয়া, যাতে জোড়া, ফাঁক বা ক্রম সহজে বোঝা যায়।' },
    [
      { en: 'The order of the input does not matter to the answer.', bn: 'ইনপুটের ক্রম উত্তরের ওপর কোনো প্রভাব ফেলে না।' },
      { en: 'You need the k-th smallest, closest pairs, or to match big with big.', bn: 'k-তম ছোট, সবচেয়ে কাছের জোড়া, বা বড়র সঙ্গে বড় মেলাতে হবে।' },
    ]),
  t('constructive', 'constructive algorithms', 'core',
    { en: 'Constructive algorithms', bn: 'কনস্ট্রাকটিভ অ্যালগরিদম' },
    { en: 'Build any object that meets the conditions, or say it cannot exist.', bn: 'শর্ত মেনে যেকোনো একটি জিনিস বানানো, অথবা বলা যে তা সম্ভব নয়।' },
    [
      { en: '“Print any array / permutation / string such that…”.', bn: '“এমন যেকোনো অ্যারে / পারমুটেশন / স্ট্রিং প্রিন্ট করো যাতে…”।' },
      { en: '“If there are several answers, print any of them.”', bn: '“একাধিক উত্তর থাকলে যেকোনো একটি প্রিন্ট করো।”' },
    ]),
  t('binary-search', 'binary search', 'core',
    { en: 'Binary search', bn: 'বাইনারি সার্চ' },
    { en: 'Halve the range each step: on a sorted array, or on the answer itself when “can we do x?” is monotone.', bn: 'প্রতি ধাপে পরিসর অর্ধেক করা: সর্টেড অ্যারেতে, অথবা “x দিয়ে কি সম্ভব?” প্রশ্ন একমুখী হলে সরাসরি উত্তরের ওপর।' },
    [
      { en: '“Find the minimum x such that…” and checking one x is easy.', bn: '“সর্বনিম্ন x বের করো যাতে…”, আর একটি x যাচাই করা সহজ।' },
      { en: 'If x works, every bigger x also works.', bn: 'x কাজ করলে x-এর চেয়ে বড় সবগুলোও কাজ করে।' },
    ]),
  t('two-pointers', 'two pointers', 'core',
    { en: 'Two pointers', bn: 'টু পয়েন্টার' },
    { en: 'Move two indices in one direction to scan all good windows or pairs in linear time.', bn: 'দুটি ইনডেক্স একদিকে সরিয়ে লিনিয়ার সময়ে সব ভালো উইন্ডো বা জোড়া দেখা।' },
    [
      { en: 'Longest or shortest subarray with a sum or count condition.', bn: 'যোগফল বা গণনার শর্তে সবচেয়ে লম্বা বা ছোট সাবঅ্যারে।' },
      { en: 'Pairs in a sorted array with a sum close to a target.', bn: 'সর্টেড অ্যারেতে লক্ষ্যের কাছাকাছি যোগফলের জোড়া।' },
    ]),
  t('dp', 'dp', 'core',
    { en: 'Dynamic programming', bn: 'ডাইনামিক প্রোগ্রামিং' },
    { en: 'Describe the answer through answers to smaller states and fill them in order.', bn: 'ছোট অবস্থার উত্তর দিয়ে বড় উত্তর বর্ণনা করা, তারপর ক্রমানুসারে পূরণ করা।' },
    [
      { en: '“Number of ways” (often modulo 10⁹+7) or “best total” over choices.', bn: '“কত উপায়ে” (প্রায়ই ১০⁹+৭ মডুলো) বা নানা সিদ্ধান্তের “সেরা মোট”।' },
      { en: 'Greedy fails on a small example because an early choice matters later.', bn: 'ছোট উদাহরণে গ্রিডি ব্যর্থ হয়, কারণ আগের সিদ্ধান্ত পরে প্রভাব ফেলে।' },
    ]),
  t('data-structures', 'data structures', 'core',
    { en: 'Data structures', bn: 'ডেটা স্ট্রাকচার' },
    { en: 'Answer many queries fast with sets, maps, heaps, prefix sums, Fenwick or segment trees.', bn: 'set, map, heap, প্রিফিক্স সাম, ফেনউইক বা সেগমেন্ট ট্রি দিয়ে অনেক কুয়েরির দ্রুত উত্তর।' },
    [
      { en: 'q queries up to 2·10⁵ mixing updates and questions.', bn: '২·১০⁵ পর্যন্ত q-টি কুয়েরি, যাতে আপডেট আর প্রশ্ন মেশানো।' },
      { en: '“Range sum / minimum on [l, r]” or “k-th element so far”.', bn: '“[l, r]-এ যোগফল / সর্বনিম্ন” বা “এখন পর্যন্ত k-তম উপাদান”।' },
    ]),
  t('bitmasks', 'bitmasks', 'core',
    { en: 'Bitmasks', bn: 'বিটমাস্ক' },
    { en: 'Treat numbers as bits: XOR, AND and OR tricks, or a subset stored as an integer.', bn: 'সংখ্যাকে বিট হিসেবে দেখা: XOR, AND, OR-এর কৌশল, অথবা একটি পূর্ণসংখ্যায় সাবসেট রাখা।' },
    [
      { en: 'The statement mentions XOR, AND, OR or powers of two.', bn: 'স্টেটমেন্টে XOR, AND, OR বা দুইয়ের ঘাত আছে।' },
      { en: 'n ≤ 20, so all 2ⁿ subsets fit.', bn: 'n ≤ ২০, তাই ২ⁿটি সাবসেট সব দেখা যায়।' },
    ]),
  t('interactive', 'interactive', 'core',
    { en: 'Interactive', bn: 'ইন্টারঅ্যাকটিভ' },
    { en: 'Talk to the judge: ask queries, read replies, and find the hidden answer within a query limit.', bn: 'জাজের সঙ্গে কথোপকথন: প্রশ্ন করা, উত্তর পড়া, আর সীমিত প্রশ্নে লুকানো উত্তর বের করা।' },
    [
      { en: 'The statement has an “Interaction” section and asks you to flush.', bn: 'স্টেটমেন্টে “Interaction” অংশ আছে, আর flush করতে বলা হয়।' },
      { en: 'A query limit like 30 or 2n hints at binary search or pairing.', bn: '৩০ বা ২n-এর মতো প্রশ্নসীমা বাইনারি সার্চ বা জোড়ার ইঙ্গিত দেয়।' },
    ]),

  // ── Math ───────────────────────────────────────────────
  t('math', 'math', 'math',
    { en: 'Math', bn: 'গণিত' },
    { en: 'A formula or a short argument replaces the loop you were about to write.', bn: 'যে লুপ লিখতে যাচ্ছিলেন, তার জায়গায় একটি সূত্র বা ছোট যুক্তি।' },
    [
      { en: 'Values up to 10⁹ or 10¹⁸, far too big to simulate.', bn: '১০⁹ বা ১০¹⁸ পর্যন্ত মান, সিমুলেট করার পক্ষে অনেক বড়।' },
      { en: 'Small cases on paper show a clean pattern.', bn: 'কাগজে ছোট কেসগুলো একটি পরিষ্কার প্যাটার্ন দেখায়।' },
    ]),
  t('number-theory', 'number theory', 'math',
    { en: 'Number theory', bn: 'সংখ্যাতত্ত্ব' },
    { en: 'Divisors, primes, gcd, lcm and modular arithmetic.', bn: 'ভাজক, মৌলিক সংখ্যা, গসাগু, লসাগু আর মডুলার অঙ্ক।' },
    [
      { en: 'Words like divisible, prime, gcd, remainder, modulo.', bn: 'বিভাজ্য, মৌলিক, গসাগু, ভাগশেষ, মডুলো এমন শব্দ।' },
      { en: 'Values up to 10⁶ or 10⁷ suggest a sieve.', bn: '১০⁶ বা ১০⁷ পর্যন্ত মান হলে সিভ-এর ইঙ্গিত।' },
    ]),
  t('combinatorics', 'combinatorics', 'math',
    { en: 'Combinatorics', bn: 'কম্বিনেটরিক্স' },
    { en: 'Count arrangements with nCr, factorials and inclusion–exclusion instead of listing them.', bn: 'তালিকা না করে nCr, ফ্যাক্টোরিয়াল আর ইনক্লুশন–এক্সক্লুশন দিয়ে বিন্যাস গোনা।' },
    [
      { en: '“How many ways”, with the answer modulo a prime.', bn: '“কত উপায়ে”, উত্তর একটি মৌলিক সংখ্যার মডুলো।' },
      { en: 'Choices are independent once you fix one thing.', bn: 'একটি জিনিস ঠিক করলে বাকি সিদ্ধান্তগুলো স্বাধীন হয়ে যায়।' },
    ]),
  t('probabilities', 'probabilities', 'math',
    { en: 'Probabilities', bn: 'সম্ভাবনা' },
    { en: 'Expected values and probabilities, usually through linearity of expectation or DP.', bn: 'প্রত্যাশিত মান আর সম্ভাবনা, সাধারণত প্রত্যাশার রৈখিকতা বা DP দিয়ে।' },
    [
      { en: '“Expected number of…” or “print the probability modulo 998244353”.', bn: '“প্রত্যাশিত সংখ্যা…” বা “সম্ভাবনা ৯৯৮২৪৪৩৫৩ মডুলোতে প্রিন্ট করো”।' },
      { en: 'Random choices described step by step.', bn: 'ধাপে ধাপে বর্ণিত এলোমেলো সিদ্ধান্ত।' },
    ]),
  t('games', 'games', 'math',
    { en: 'Games', bn: 'গেম' },
    { en: 'Two players play perfectly; find the winner from winning and losing positions or parity.', bn: 'দুজন খেলোয়াড় নিখুঁতভাবে খেলে; জেতা-হারার অবস্থান বা জোড়-বিজোড় দেখে বিজয়ী বের করা।' },
    [
      { en: '“Alice and Bob take turns… both play optimally.”', bn: '“অ্যালিস আর বব পালাক্রমে খেলে… দুজনেই সেরা চাল দেয়।”' },
      { en: 'Brute force on tiny inputs reveals a pattern.', bn: 'ছোট ইনপুটে ব্রুট ফোর্স চালালে প্যাটার্ন বেরিয়ে আসে।' },
    ]),
  t('geometry', 'geometry', 'math',
    { en: 'Geometry', bn: 'জ্যামিতি' },
    { en: 'Points, lines and polygons, best handled with integer cross products.', bn: 'বিন্দু, রেখা আর বহুভুজ, যা পূর্ণসংখ্যার ক্রস প্রোডাক্ট দিয়ে সবচেয়ে ভালো সামলানো যায়।' },
    [
      { en: 'Coordinates in the input, distances or areas in the output.', bn: 'ইনপুটে স্থানাঙ্ক, আউটপুটে দূরত্ব বা ক্ষেত্রফল।' },
      { en: '“Absolute or relative error does not exceed 10⁻⁶.”', bn: '“পরম বা আপেক্ষিক ত্রুটি ১০⁻⁶-এর বেশি হবে না।”' },
    ]),
  t('matrices', 'matrices', 'math',
    { en: 'Matrices', bn: 'ম্যাট্রিক্স' },
    { en: 'Speed up a linear recurrence with matrix exponentiation, or reason about grids as matrices.', bn: 'ম্যাট্রিক্স এক্সপোনেনশিয়েশন দিয়ে রৈখিক পুনরাবৃত্তি দ্রুত করা, অথবা গ্রিডকে ম্যাট্রিক্স হিসেবে ভাবা।' },
    [
      { en: 'A recurrence like Fibonacci with n up to 10¹⁸.', bn: '১০¹⁸ পর্যন্ত n-সহ ফিবোনাচ্চির মতো পুনরাবৃত্তি।' },
      { en: 'Counting walks of length k in a small graph.', bn: 'ছোট গ্রাফে k দৈর্ঘ্যের পথ গোনা।' },
    ]),
  t('crt', 'chinese remainder theorem', 'math',
    { en: 'Chinese remainder theorem', bn: 'চাইনিজ রিমেইন্ডার থিওরেম' },
    { en: 'Combine conditions “x mod mᵢ = aᵢ” into one condition modulo the lcm.', bn: '“x mod mᵢ = aᵢ” ধরনের শর্তগুলোকে লসাগুর মডুলোতে একটি শর্তে মেলানো।' },
    [
      { en: 'Several remainders for the same unknown number.', bn: 'একই অজানা সংখ্যার জন্য একাধিক ভাগশেষ।' },
      { en: 'Periodic events that must line up.', bn: 'পর্যায়ক্রমিক ঘটনা, যেগুলো একসঙ্গে মিলতে হবে।' },
    ]),

  // ── Graphs and trees ───────────────────────────────────
  t('graphs', 'graphs', 'graphs',
    { en: 'Graphs', bn: 'গ্রাফ' },
    { en: 'Model the problem as vertices and edges, then use a standard traversal or algorithm.', bn: 'প্রবলেমটিকে ভার্টেক্স আর এজ হিসেবে সাজিয়ে প্রচলিত ট্রাভার্সাল বা অ্যালগরিদম ব্যবহার করা।' },
    [
      { en: 'n vertices and m edges, or cities and roads, or friends.', bn: 'n ভার্টেক্স আর m এজ, অথবা শহর আর রাস্তা, অথবা বন্ধু।' },
      { en: 'A grid where you move between neighbouring cells.', bn: 'একটি গ্রিড, যেখানে পাশের ঘরে যাওয়া যায়।' },
    ]),
  t('dfs', 'dfs and similar', 'graphs',
    { en: 'DFS and similar', bn: 'DFS ও এ ধরনের' },
    { en: 'Depth-first and breadth-first search: components, cycles, bipartiteness, flood fill.', bn: 'ডেপথ-ফার্স্ট আর ব্রেডথ-ফার্স্ট সার্চ: কম্পোনেন্ট, সাইকেল, বাইপারটাইট, ফ্লাড ফিল।' },
    [
      { en: '“Is it connected?”, “how many groups?”, “is there a cycle?”.', bn: '“সংযুক্ত কি?”, “কতগুলো দল?”, “সাইকেল আছে কি?”।' },
      { en: 'Shortest path where every edge has the same cost (BFS).', bn: 'সব এজের খরচ সমান এমন সবচেয়ে ছোট পথ (BFS)।' },
    ]),
  t('trees', 'trees', 'graphs',
    { en: 'Trees', bn: 'ট্রি' },
    { en: 'Connected graphs with n−1 edges: subtree DP, depths, LCA, rerooting.', bn: 'n−১টি এজসহ সংযুক্ত গ্রাফ: সাবট্রি DP, গভীরতা, LCA, রিরুটিং।' },
    [
      { en: '“n vertices and n−1 edges” or “a rooted tree with parent pᵢ”.', bn: '“n ভার্টেক্স আর n−১টি এজ” বা “প্যারেন্ট pᵢ-সহ রুটেড ট্রি”।' },
      { en: 'Questions about subtrees or the path between two vertices.', bn: 'সাবট্রি বা দুটি ভার্টেক্সের মাঝের পথ নিয়ে প্রশ্ন।' },
    ]),
  t('shortest-paths', 'shortest paths', 'graphs',
    { en: 'Shortest paths', bn: 'শর্টেস্ট পাথ' },
    { en: 'Dijkstra, 0-1 BFS, Bellman–Ford and Floyd–Warshall for minimum-cost routes.', bn: 'সর্বনিম্ন খরচের পথের জন্য ডায়াকস্ট্রা, ০-১ BFS, বেলম্যান–ফোর্ড আর ফ্লয়েড–ওয়ারশাল।' },
    [
      { en: 'Weighted edges and “minimum time / cost to reach”.', bn: 'ওজনযুক্ত এজ আর “পৌঁছানোর সর্বনিম্ন সময় / খরচ”।' },
      { en: 'n ≤ 400 with all pairs asked: Floyd–Warshall.', bn: 'n ≤ ৪০০ আর সব জোড়ার প্রশ্ন: ফ্লয়েড–ওয়ারশাল।' },
    ]),
  t('dsu', 'dsu', 'graphs',
    { en: 'DSU', bn: 'DSU (ডিসজয়েন্ট সেট)' },
    { en: 'Disjoint set union merges groups and answers “same group?” almost instantly.', bn: 'ডিসজয়েন্ট সেট ইউনিয়ন দলগুলো মেলায় আর “একই দলে কি?” প্রায় সঙ্গে সঙ্গে বলে দেয়।' },
    [
      { en: 'Edges are added over time and you track components.', bn: 'সময়ের সঙ্গে এজ যোগ হয় আর কম্পোনেন্টের হিসাব রাখতে হয়।' },
      { en: 'Minimum spanning tree (Kruskal).', bn: 'মিনিমাম স্প্যানিং ট্রি (ক্রুসকাল)।' },
    ]),
  t('flows', 'flows', 'graphs',
    { en: 'Flows', bn: 'ফ্লো' },
    { en: 'Max flow and min cut model assignments with capacities.', bn: 'ম্যাক্স ফ্লো আর মিন কাট দিয়ে ধারণক্ষমতাসহ বণ্টন মডেল করা।' },
    [
      { en: 'Small n and m (a few hundred) with capacities on edges.', bn: 'ছোট n আর m (কয়েকশো), এজে ধারণক্ষমতা।' },
      { en: '“Remove the fewest edges to disconnect s from t.”', bn: '“সবচেয়ে কম এজ সরিয়ে s থেকে t বিচ্ছিন্ন করো।”' },
    ]),
  t('matchings', 'graph matchings', 'graphs',
    { en: 'Graph matchings', bn: 'গ্রাফ ম্যাচিং' },
    { en: 'Pair items from two sides so that as many as possible are matched.', bn: 'দুই পাশের জিনিস এমনভাবে জোড়া করা যাতে যত বেশি সম্ভব মেলে।' },
    [
      { en: 'Workers and jobs, boys and girls, rows and columns.', bn: 'কর্মী আর কাজ, ছেলে আর মেয়ে, সারি আর কলাম।' },
      { en: 'Each item can be used at most once.', bn: 'প্রতিটি জিনিস সর্বোচ্চ একবার ব্যবহার করা যায়।' },
    ]),
  t('2-sat', '2-sat', 'graphs',
    { en: '2-SAT', bn: '2-SAT' },
    { en: 'Boolean choices with “a or b” constraints, solved with strongly connected components.', bn: '“a অথবা b” শর্তসহ সত্য-মিথ্যা সিদ্ধান্ত, স্ট্রংলি কানেক্টেড কম্পোনেন্ট দিয়ে সমাধান।' },
    [
      { en: 'Every item has exactly two options.', bn: 'প্রতিটি জিনিসের ঠিক দুটি বিকল্প।' },
      { en: 'Rules of the form “if this, then not that”.', bn: '“এটা হলে ওটা নয়” ধরনের নিয়ম।' },
    ]),

  // ── Strings ────────────────────────────────────────────
  t('strings', 'strings', 'strings',
    { en: 'Strings', bn: 'স্ট্রিং' },
    { en: 'Counting characters, palindromes, substrings, and prefix functions such as KMP and Z.', bn: 'অক্ষর গোনা, প্যালিনড্রোম, সাবস্ট্রিং, আর KMP ও Z-এর মতো প্রিফিক্স ফাংশন।' },
    [
      { en: 'The input is a string of lowercase letters.', bn: 'ইনপুট ছোট হাতের অক্ষরের একটি স্ট্রিং।' },
      { en: 'Find a pattern inside a text, or a period.', bn: 'টেক্সটের ভেতরে একটি প্যাটার্ন, বা একটি পিরিয়ড খুঁজতে হবে।' },
    ]),
  t('hashing', 'hashing', 'strings',
    { en: 'Hashing', bn: 'হ্যাশিং' },
    { en: 'Compare substrings or sets in O(1) through polynomial or random hashes.', bn: 'পলিনোমিয়াল বা র‍্যান্ডম হ্যাশ দিয়ে O(1)-এ সাবস্ট্রিং বা সেট তুলনা।' },
    [
      { en: 'Many “are these two substrings equal?” checks.', bn: 'অনেকবার “এই দুটি সাবস্ট্রিং কি সমান?” যাচাই।' },
      { en: 'Counting distinct substrings or equal multisets.', bn: 'ভিন্ন সাবস্ট্রিং বা সমান মাল্টিসেট গোনা।' },
    ]),
  t('suffix-structures', 'string suffix structures', 'strings',
    { en: 'String suffix structures', bn: 'সাফিক্স স্ট্রাকচার' },
    { en: 'Suffix arrays, suffix automata and suffix trees for heavy substring questions.', bn: 'ভারী সাবস্ট্রিং প্রশ্নের জন্য সাফিক্স অ্যারে, সাফিক্স অটোমেটন আর সাফিক্স ট্রি।' },
    [
      { en: 'Distinct substrings, longest repeated substring, k-th substring.', bn: 'ভিন্ন সাবস্ট্রিং, সবচেয়ে লম্বা পুনরাবৃত্ত সাবস্ট্রিং, k-তম সাবস্ট্রিং।' },
      { en: 'Length up to 10⁵ or more with many substring queries.', bn: '১০⁵ বা বেশি দৈর্ঘ্য আর অনেক সাবস্ট্রিং কুয়েরি।' },
    ]),
  t('parsing', 'expression parsing', 'strings',
    { en: 'Expression parsing', bn: 'এক্সপ্রেশন পার্সিং' },
    { en: 'Read formulas, brackets or a small language with a stack or recursive descent.', bn: 'স্ট্যাক বা রিকার্সিভ ডিসেন্ট দিয়ে সূত্র, বন্ধনী বা ছোট একটি ভাষা পড়া।' },
    [
      { en: 'Brackets, operators and operator precedence.', bn: 'বন্ধনী, অপারেটর আর অপারেটরের অগ্রাধিকার।' },
      { en: 'Input described by a grammar.', bn: 'একটি ব্যাকরণ দিয়ে বর্ণিত ইনপুট।' },
    ]),

  // ── Advanced ───────────────────────────────────────────
  t('divide-and-conquer', 'divide and conquer', 'advanced',
    { en: 'Divide and conquer', bn: 'ডিভাইড অ্যান্ড কনকার' },
    { en: 'Split in halves, solve each, and combine: merge sort counting, CDQ, D&C DP.', bn: 'অর্ধেক করে ভাগ, প্রতিটির সমাধান, তারপর মেলানো: মার্জ সর্টে গণনা, CDQ, D&C DP।' },
    [
      { en: 'Counting pairs (i, j) across a split, like inversions.', bn: 'বিভাজনের দুই পাশে জোড়া (i, j) গোনা, যেমন ইনভার্শন।' },
      { en: 'A recursive structure where the halves are independent.', bn: 'রিকার্সিভ গঠন, যেখানে দুই অর্ধেক স্বাধীন।' },
    ]),
  t('meet-in-the-middle', 'meet-in-the-middle', 'advanced',
    { en: 'Meet in the middle', bn: 'মিট ইন দ্য মিডল' },
    { en: 'Enumerate two halves separately (2^(n/2) each) and join them with sorting or hashing.', bn: 'দুই অর্ধেক আলাদাভাবে (প্রতিটি ২^(n/২)) গুনে সর্টিং বা হ্যাশিং দিয়ে মেলানো।' },
    [
      { en: 'n around 35–40: too big for 2ⁿ, fine for 2^(n/2).', bn: 'n প্রায় ৩৫–৪০: ২ⁿ-এর জন্য বেশি, কিন্তু ২^(n/২)-এর জন্য ঠিক।' },
      { en: 'Subset sums hitting a target.', bn: 'লক্ষ্যে পৌঁছানো সাবসেট যোগফল।' },
    ]),
  t('ternary-search', 'ternary search', 'advanced',
    { en: 'Ternary search', bn: 'টারনারি সার্চ' },
    { en: 'Find the peak or valley of a function that rises then falls (unimodal).', bn: 'যে ফাংশন আগে বাড়ে পরে কমে (ইউনিমোডাল), তার চূড়া বা খাদ খোঁজা।' },
    [
      { en: 'Minimise a cost that is convex in one parameter.', bn: 'একটি প্যারামিটারে কনভেক্স খরচ সর্বনিম্ন করা।' },
      { en: 'Real-valued answer with a precision requirement.', bn: 'নির্ভুলতার শর্তসহ বাস্তব সংখ্যার উত্তর।' },
    ]),
  t('fft', 'fft', 'advanced',
    { en: 'FFT', bn: 'FFT' },
    { en: 'Multiply polynomials fast (FFT or NTT) to count sums of pairs or match patterns.', bn: 'জোড়ার যোগফল গোনা বা প্যাটার্ন মেলাতে দ্রুত পলিনোমিয়াল গুণ (FFT বা NTT)।' },
    [
      { en: 'For every s, count pairs with aᵢ + bⱼ = s, with n up to 10⁵ or more.', bn: 'প্রতিটি s-এর জন্য aᵢ + bⱼ = s এমন জোড়া গোনা, n ১০⁵ বা বেশি।' },
      { en: 'Convolution modulo 998244353.', bn: '৯৯৮২৪৪৩৫৩ মডুলোতে কনভোলিউশন।' },
    ]),
  t('schedules', 'schedules', 'advanced',
    { en: 'Schedules', bn: 'শিডিউল' },
    { en: 'Order jobs with deadlines and durations, usually with an exchange argument.', bn: 'ডেডলাইন ও সময়কালসহ কাজ সাজানো, সাধারণত বিনিময় যুক্তি দিয়ে।' },
    [
      { en: 'Tasks with start times, deadlines or penalties.', bn: 'শুরুর সময়, ডেডলাইন বা জরিমানাসহ কাজ।' },
      { en: '“In what order should the jobs be done?”', bn: '“কাজগুলো কোন ক্রমে করা উচিত?”' },
    ]),
] as const satisfies readonly TagInfo[];

export type TagSlug = (typeof TAGS)[number]['slug'];

export const TAG_BY_SLUG: Record<string, TagInfo> = Object.fromEntries(TAGS.map((x) => [x.slug, x]));

export const TAG_GROUPS: TagGroup[] = ['core', 'math', 'graphs', 'strings', 'advanced'];

export function cfTagUrl(tag: TagInfo) {
  return `https://codeforces.com/problemset?tags=${encodeURIComponent(tag.cf)}`;
}
