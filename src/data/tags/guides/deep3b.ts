import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

// ───────────────────────────────────────────────────────── ternary-search
export const ternarySearchGuideDeep: TagGuide = {
  slug: 'ternary-search',
  intro: [
    L(
      'Binary search needs a yes/no test that flips once. Ternary search needs a function that goes down and then up (or up and then down) exactly once, a “valley” or a “hill”, and finds its extreme point by comparing the function at two interior points and discarding the third of the range that cannot contain the extreme. Convex functions, parabolas, sums of absolute values and maxima of straight lines are all valleys.',
      'বাইনারি সার্চ চায় একবার উল্টে যাওয়া হ্যাঁ/না পরীক্ষা। টারনারি সার্চ চায় এমন ফাংশন যা ঠিক একবার নামে আর ওঠে (বা ওঠে আর নামে), “উপত্যকা” বা “পাহাড়”, আর সে দুটি ভেতরের বিন্দুতে ফাংশনের মান তুলনা করে চরম বিন্দু খোঁজে এবং রেঞ্জের যে তৃতীয়াংশে চরম থাকতে পারে না তা বাদ দেয়। উত্তল ফাংশন, প্যারাবোলা, পরম মানের যোগফল আর সরলরেখার সর্বোচ্চ সবই উপত্যকা।',
    ),
    L(
      'In practice the skill is spotting the valley. “Minimise the maximum distance”, “the best number of items to take”, “the best angle”, “the point that minimises total squared distance” are all of this kind. And when the valley has a plateau only at the bottom (convex), you can skip the thirds and compare f(m) with f(m + 1): that is a binary search on the slope and works on integers without fuss.',
      'বাস্তবে আসল দক্ষতা উপত্যকা চিনতে পারা। “সর্বোচ্চ দূরত্বকে সর্বনিম্ন করো”, “কতগুলো জিনিস নিলে সেরা”, “সেরা কোণ”, “মোট বর্গ দূরত্ব ন্যূনতম করা বিন্দু” সবই এই ধরনের। আর উপত্যকার সমতল অংশ শুধু তলায় থাকলে (উত্তল), তৃতীয়াংশ বাদ দিয়ে f(m) ও f(m + ১) তুলনা করা যায়: এটি ঢালের ওপর বাইনারি সার্চ এবং পূর্ণসংখ্যায় ঝামেলা ছাড়াই কাজ করে।',
    ),
  ],
  recognize: [
    L('“Minimise the largest …” or “maximise the smallest …” over a continuous or integer parameter.', 'কোনো ধারাবাহিক বা পূর্ণসংখ্যা প্যারামিটারের ওপর “সবচেয়ে বড়টি ন্যূনতম করো” বা “সবচেয়ে ছোটটি সর্বাধিক করো”।'),
    L('A cost that is a sum of |x − cᵢ|, (x − cᵢ)² or a maximum of linear pieces: convex by construction.', 'এমন খরচ যা |x − cᵢ|, (x − cᵢ)²-এর যোগফল বা রৈখিক টুকরোর সর্বোচ্চ: গঠনগতভাবেই উত্তল।'),
    L('Geometry with one free parameter: an angle, a point on a line, a radius.', 'একটি মুক্ত প্যারামিটারসহ জ্যামিতি: কোণ, রেখার ওপর বিন্দু, ব্যাসার্ধ।'),
    L('A greedy that works for a fixed count k, and the question is the best k: the profit as a function of k rises and then falls.', 'নির্দিষ্ট সংখ্যা k-র জন্য কাজ করা গ্রিডি, আর প্রশ্ন সেরা k: k-র ফাংশন হিসেবে লাভ বাড়ে তারপর কমে।'),
  ],
  patterns: [
    {
      name: L('Real-valued ternary search', 'বাস্তব-মানের টারনারি সার্চ'),
      explain: [
        L('Pick m₁ = lo + (hi − lo)/3 and m₂ = hi − (hi − lo)/3. If f(m₁) < f(m₂) the minimum cannot lie to the right of m₂, so set hi = m₂; otherwise set lo = m₁. A fixed number of iterations (80 to 100) is safer than an epsilon test, because each round keeps 2/3 of the range and 100 rounds shrink it by about 10¹⁷.', 'm₁ = lo + (hi − lo)/৩ ও m₂ = hi − (hi − lo)/৩ নাও। f(m₁) < f(m₂) হলে ন্যূনতম m₂-র ডানে থাকতে পারে না, তাই hi = m₂; নইলে lo = m₁। ইপসিলন পরীক্ষার চেয়ে নির্দিষ্ট সংখ্যক পুনরাবৃত্তি (৮০ থেকে ১০০) নিরাপদ, কারণ প্রতি রাউন্ডে ২/৩ রেঞ্জ থাকে আর ১০০ রাউন্ডে তা প্রায় ১০¹⁷ গুণ ছোট হয়।'),
      ],
      code: raw`template <class F>
double ternaryMin(double lo, double hi, F f, int iterations = 100) {
    for (int it = 0; it < iterations; it++) {
        double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2;
        else lo = m1;
    }
    return (lo + hi) / 2;
}`,
      example: { problem: '98C', text: L('Help Greg the Dwarf: a coffin of length l must turn a corner between corridors of widths a and b. At angle θ the clearance is a function of θ with a single minimum, and the answer follows from that minimum (after the easy cases where the coffin already fits lengthwise in one corridor). Ternary search over θ ∈ [0, π/2] finds it.', 'Help Greg the Dwarf: দৈর্ঘ্য l-এর কফিনকে a ও b প্রস্থের করিডোরের কোণ ঘুরতে হবে। কোণ θ-তে ফাঁক θ-র একটি ফাংশন যার একটিই ন্যূনতম, আর উত্তর সেই ন্যূনতম থেকে আসে (সহজ ক্ষেত্র আগে সামলে, যেখানে কফিন একটি করিডোরে লম্বালম্বি ধরে যায়)। θ ∈ [০, π/২]-এ টারনারি সার্চ তা খোঁজে।') },
    },
    {
      name: L('Integer search on the slope', 'ঢালের ওপর পূর্ণসংখ্যা সার্চ'),
      explain: [
        L('For an integer convex f, compare f(m) with f(m + 1). If f(m) ≤ f(m + 1), a minimum exists at or before m, so hi = m; otherwise lo = m + 1. This never splits into thirds and never gets stuck on integers. It returns the leftmost minimum, and it takes about log₂(range) evaluations.', 'পূর্ণসংখ্যার উত্তল f-এর জন্য f(m) ও f(m + ১) তুলনা করো। f(m) ≤ f(m + ১) হলে ন্যূনতম m-এ বা আগে আছে, তাই hi = m; নইলে lo = m + ১। এটি কখনও তৃতীয়াংশে ভাগ করে না আর পূর্ণসংখ্যায় আটকায় না। এটি সবচেয়ে বাঁয়ের ন্যূনতম দেয় এবং প্রায় log₂(পরিসর) বার মূল্যায়ন লাগে।'),
        L('This works only for convex (or at least “falls, flat only at the bottom, then rises”) functions. A plateau elsewhere breaks both versions of ternary search.', 'এটি শুধু উত্তল (বা অন্তত “নামে, শুধু তলায় সমতল, তারপর ওঠে”) ফাংশনে কাজ করে। অন্য কোথাও সমতল অংশ থাকলে টারনারি সার্চের দুই সংস্করণই ভেঙে যায়।'),
      ],
      code: raw`// leftmost integer minimiser of a convex f on [lo, hi]
template <class F>
long long argminConvex(long long lo, long long hi, F f) {
    while (lo < hi) {
        long long m = lo + (hi - lo) / 2;
        if (f(m) <= f(m + 1)) hi = m;
        else lo = m + 1;
    }
    return lo;
}`,
      example: { problem: '439D', text: L('Devu and his Brother: raise the elements of a and lower the elements of b to a common value x. Devu needs min(a) ≥ max(b), so choose a value x, raise the small elements of a to x and lower the large elements of b to x. The number of moves is Σ max(0, x − aᵢ) + Σ max(0, bⱼ − x), a sum of one-sided V-shaped pieces: a convex function of x. argminConvex over x ∈ [1, 10⁹] finds the cheapest x.', 'Devu and his Brother: Devu-র দরকার min(a) ≥ max(b), তাই একটি মান x বাছো, a-এর ছোট উপাদান x-এ তোলো আর b-এর বড় উপাদান x-এ নামাও। মোট চাল Σ max(০, x − aᵢ) + Σ max(০, bⱼ − x), একমুখী V-আকৃতির টুকরোর যোগফল: x-এর উত্তল ফাংশন। x ∈ [১, ১০⁹]-এ argminConvex সবচেয়ে সস্তা x খোঁজে।') },
    },
    {
      name: L('A maximum of V shapes: search and formula', 'V-আকৃতির সর্বোচ্চ: সার্চ ও সূত্র'),
      explain: [
        L('The function f(x) = max over i of |x − cᵢ| is convex with slopes ±1, so its bottom is exactly at the midpoint of the smallest and largest cᵢ. You can find it by ternary search, or write the formula. Doing both and comparing on random tests is a good way to trust either.', 'f(x) = সব i-তে |x − cᵢ|-এর সর্বোচ্চ ফাংশনটি উত্তল, ঢাল ±১, তাই তার তলা ঠিক সবচেয়ে ছোট ও সবচেয়ে বড় cᵢ-র মধ্যবিন্দুতে। তুমি টারনারি সার্চে তা পেতে পারো, বা সূত্র লিখতে পারো। দুটোই করে এলোমেলো টেস্টে তুলনা করা যেকোনো একটিতে ভরসা করার ভালো উপায়।'),
      ],
      code: raw`long long maxDistance(const vector<long long>& c, long long x) {
    long long worst = 0;
    for (long long v : c) worst = max(worst, llabs(x - v));
    return worst;
}

// both ways to get the best x and its cost
pair<long long, long long> bestBySearch(const vector<long long>& c) {
    long long lo = *min_element(c.begin(), c.end()), hi = *max_element(c.begin(), c.end());
    long long x = argminConvex(lo, hi, [&](long long t) { return maxDistance(c, t); });
    return {x, maxDistance(c, x)};
}
pair<long long, long long> bestByFormula(const vector<long long>& c) {
    long long lo = *min_element(c.begin(), c.end()), hi = *max_element(c.begin(), c.end());
    long long x = (lo + hi) / 2;
    return {x, maxDistance(c, x)};
}`,
      example: { problem: '1301B', text: L('Motarack’s Birthday: the missing elements are replaced by one value k, and the cost is the largest adjacent difference. Only differences next to a missing element depend on k, each a V shape |k − c|, so the cost is a maximum of V shapes: the midpoint of the smallest and largest neighbour is optimal.', 'Motarack’s Birthday: হারানো উপাদানগুলো একটি মান k দিয়ে বদলানো হয়, আর খরচ হলো সবচেয়ে বড় পাশাপাশি পার্থক্য। শুধু হারানো উপাদানের পাশের পার্থক্য k-র ওপর নির্ভর করে, প্রতিটি V আকৃতির |k − c|, তাই খরচ V-এর সর্বোচ্চ: সবচেয়ে ছোট ও বড় প্রতিবেশীর মধ্যবিন্দুই সেরা।') },
    },
    {
      name: L('Two parameters: nested ternary search', 'দুই প্যারামিটার: নেস্টেড টারনারি সার্চ'),
      explain: [
        L('If f(x, y) is convex in both variables jointly, then g(x) = min over y of f(x, y) is convex in x. Run an outer ternary search on x, and for each x an inner one on y. The cost is (iterations)² evaluations, so use around 60 iterations each, which is already beyond double precision.', 'f(x, y) দুই চলকে একসাথে উত্তল হলে g(x) = সব y-তে f(x, y)-এর ন্যূনতম x-এ উত্তল। x-এ বাইরের টারনারি সার্চ চালাও, আর প্রতি x-এর জন্য y-তে ভেতরেরটি। খরচ (পুনরাবৃত্তি)² মূল্যায়ন, তাই প্রতিটিতে প্রায় ৬০ ধরো, যা ইতিমধ্যে ডাবলের নির্ভুলতা ছাড়িয়ে যায়।'),
      ],
      code: raw`template <class F>
pair<double, double> minimise2D(double xl, double xr, double yl, double yr, F f) {
    auto bestY = [&](double x) {
        double lo = yl, hi = yr;
        for (int it = 0; it < 60; it++) {
            double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
            if (f(x, m1) < f(x, m2)) hi = m2; else lo = m1;
        }
        return (lo + hi) / 2;
    };
    double lo = xl, hi = xr;
    for (int it = 0; it < 60; it++) {
        double m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
        if (f(m1, bestY(m1)) < f(m2, bestY(m2))) hi = m2; else lo = m1;
    }
    double x = (lo + hi) / 2;
    return {x, bestY(x)};
}`,
      example: { problem: '201B', text: L('Guess That Car!: the cost of a point is a sum of weighted squared distances to grid cells, and it splits into an x part and a y part. Each part is a convex parabola, so the two axes are minimised independently (the nested version is only needed when the parts interact).', 'Guess That Car!: একটি বিন্দুর খরচ গ্রিড ঘর পর্যন্ত ওজনযুক্ত বর্গ দূরত্বের যোগফল, যা x অংশ ও y অংশে ভাঙে। প্রতিটি অংশ উত্তল প্যারাবোলা, তাই দুই অক্ষ স্বাধীনভাবে ন্যূনতম করা হয় (অংশগুলো মিথস্ক্রিয়া করলেই শুধু নেস্টেড সংস্করণ লাগে)।') },
    },
    {
      name: L('Searching over a count', 'সংখ্যার ওপর সার্চ'),
      explain: [
        L('When a problem fixes a count k (items taken, days waited, promotions run) and a simple greedy gives the best value for each k, the profit P(k) is often a concave parabola-like function. Search for the best k with the integer slope search on −P. Check the shape first: compute P(k) for small ranges and look.', 'যখন সমস্যা একটি সংখ্যা k (নেওয়া জিনিস, অপেক্ষার দিন, চালানো প্রোমোশন) ঠিক করে আর সরল গ্রিডি প্রতিটি k-র সেরা মান দেয়, তখন লাভ P(k) প্রায়ই অবতল প্যারাবোলার মতো। −P-তে পূর্ণসংখ্যা ঢাল সার্চ দিয়ে সেরা k খোঁজো। আগে আকৃতি দেখো: ছোট পরিসরে P(k) হিসাব করে দেখো।'),
      ],
      code: raw`// profit of running the promotion for the first k buns: price b, b-1, ..., then a for the rest
long long bakeryProfit(long long n, long long a, long long b, long long k) {
    long long promo = k * b - k * (k - 1) / 2;        // b + (b-1) + ... + (b-k+1)
    return promo + (n - k) * a;
}

long long bestBakery(long long n, long long a, long long b) {
    long long hi = min(n, b);
    long long k = argminConvex(0, hi, [&](long long t) { return -bakeryProfit(n, a, b, t); });
    return bakeryProfit(n, a, b, k);
}`,
      example: { problem: '1978B', text: L('New Bakery: the first k buns sell for b, b − 1, …, and the rest for a. The profit is a downward parabola in k, so the best k is found by the slope search, and then compared with the closed form k = b − a (clamped).', 'New Bakery: প্রথম k টি বান b, b − ১, … দামে বিক্রি হয়, বাকিগুলো a দামে। লাভ k-র নিম্নমুখী প্যারাবোলা, তাই ঢাল সার্চে সেরা k মেলে, তারপর বদ্ধ সূত্র k = b − a (সীমাবদ্ধ)-এর সাথে মেলানো যায়।') },
    },
  ],
  mistakes: [
    L('Ternary search on a function with a flat part that is not at the bottom (for example floor or min/max of constants): it can discard the wrong third. Use binary search on a monotone property instead.', 'তলায় নয় এমন সমতল অংশসহ ফাংশনে টারনারি সার্চ (যেমন floor বা ধ্রুবকের min/max): ভুল তৃতীয়াংশ বাদ যেতে পারে। বদলে একমুখী ধর্মের ওপর বাইনারি সার্চ নাও।'),
    L('An epsilon stop condition like (hi − lo) > 1e-9 on large ranges: doubles cannot resolve it and the loop never ends. Use a fixed iteration count.', 'বড় পরিসরে (hi − lo) > 1e-9 ধরনের ইপসিলন থামার শর্ত: ডাবল তা ধরতে পারে না আর লুপ শেষ হয় না। নির্দিষ্ট পুনরাবৃত্তি সংখ্যা নাও।'),
    L('Mixing minimum and maximum: ternary search for a hill needs the comparison reversed.', 'ন্যূনতম ও সর্বোচ্চ গুলিয়ে ফেলা: পাহাড়ের জন্য টারনারি সার্চে তুলনা উল্টাতে হয়।'),
    L('Using ternary search where the closed form is simple: a formula is exact and faster, and a good test for the search.', 'সূত্র সহজ হলেও টারনারি সার্চ ব্যবহার: সূত্র নিখুঁত ও দ্রুত, আর সার্চের জন্য ভালো পরীক্ষা।'),
    L('Printing with too few digits, or comparing doubles with ==: print with 9 to 12 digits and allow an error margin.', 'খুব কম অঙ্কে প্রিন্ট করা, বা ডাবল == দিয়ে তুলনা: ৯ থেকে ১২ অঙ্কে প্রিন্ট করো এবং ত্রুটির সীমা দাও।'),
  ],
  plan: [
    L('Start with the cleanest valleys: Deadline (1288A) and Meeting on the Line (1730B).', 'সবচেয়ে পরিষ্কার উপত্যকা দিয়ে শুরু করো: Deadline (১২৮৮A) ও Meeting on the Line (১৭৩০B)।'),
    L('Do integer convex costs: Devu and his Brother (439D) and Motarack’s Birthday (1301B), writing both the search and the formula.', 'পূর্ণসংখ্যা উত্তল খরচ করো: Devu and his Brother (৪৩৯D) ও Motarack’s Birthday (১৩০১B), সার্চ ও সূত্র দুটোই লিখে।'),
    L('Move to geometry: Help Greg the Dwarf (98C) and Nature Reserve (1059D).', 'জ্যামিতিতে যাও: Help Greg the Dwarf (৯৮C) ও Nature Reserve (১০৫৯D)।'),
    L('Finish with counts that hide a parabola (808E, 1413E) and the hard Bear and Bowling 4 (660F), where ternary search meets a convex-hull trick.', 'পরাবলা লুকানো সংখ্যার সমস্যা (৮০৮E, ১৪১৩E) আর কঠিন Bear and Bowling 4 (৬৬০F) দিয়ে শেষ করো, যেখানে টারনারি সার্চ ও উত্তল-হাল ট্রিক মেলে।'),
  ],
};

// ───────────────────────────────────────────────────────── interactive
export const interactiveGuideDeep: TagGuide = {
  slug: 'interactive',
  intro: [
    L(
      'In an interactive problem the input is not fixed. Your program talks to a judge program (the interactor) that holds a hidden object and answers your questions one at a time. You print a query, flush the output, read the reply, and continue, until you can print the final answer. The score depends on getting the answer right and on the number of questions you ask.',
      'ইন্টারঅ্যাকটিভ সমস্যায় ইনপুট নির্দিষ্ট নয়। তোমার প্রোগ্রাম একটি জাজ প্রোগ্রামের (ইন্টারঅ্যাক্টর) সাথে কথা বলে যার কাছে একটি লুকানো বস্তু আছে এবং সে একটি একটি করে প্রশ্নের উত্তর দেয়। তুমি একটি প্রশ্ন প্রিন্ট করো, আউটপুট ফ্লাশ করো, উত্তর পড়ো, আর চালিয়ে যাও, যতক্ষণ না চূড়ান্ত উত্তর প্রিন্ট করতে পারো। স্কোর নির্ভর করে উত্তর সঠিক হওয়া আর কতগুলো প্রশ্ন করলে তার ওপর।',
    ),
    L(
      'The real problem is information theory. If there are N possibilities and each answer carries at most b bits, you need at least log N / b questions; a good solution designs queries so that every answer rules out about half (or more) of what is left. Typical devices are binary search on an index, bit-by-bit determination, queries that reveal a sum or a distance, and a single carefully chosen first query that splits the problem.',
      'আসল সমস্যা তথ্যতত্ত্ব। N টি সম্ভাবনা আর প্রতি উত্তরে সর্বোচ্চ b বিট থাকলে অন্তত log N / b টি প্রশ্ন লাগে; ভালো সমাধান এমন প্রশ্ন বানায় যাতে প্রতি উত্তর অবশিষ্টের প্রায় অর্ধেক (বা বেশি) বাদ দেয়। সাধারণ উপায় সূচকের ওপর বাইনারি সার্চ, বিট ধরে ধরে নির্ধারণ, যোগফল বা দূরত্ব প্রকাশ করা প্রশ্ন, আর সমস্যা ভাগ করা একটি সাবধানে বাছা প্রথম প্রশ্ন।',
    ),
  ],
  recognize: [
    L('The statement says “interactive”, shows a dialogue in the examples, and gives a limit on the number of queries.', 'বিবৃতিতে “interactive” লেখা, উদাহরণে সংলাপ, আর প্রশ্নের সংখ্যার সীমা।'),
    L('A hidden number, array, tree, string or grid, and a query that returns a comparison, a sum, a distance or a count.', 'লুকানো সংখ্যা, অ্যারে, ট্রি, স্ট্রিং বা গ্রিড, আর এমন প্রশ্ন যা তুলনা, যোগফল, দূরত্ব বা গণনা ফেরত দেয়।'),
    L('A limit close to log₂ of the search space (about 30 for 10⁹, 60 for 10¹⁸): think binary search or bits.', 'সার্চ স্পেসের log₂-এর কাছাকাছি সীমা (১০⁹-এর জন্য প্রায় ৩০, ১০¹⁸-এর জন্য ৬০): বাইনারি সার্চ বা বিট ভাবো।'),
    L('A limit linear in n (n, 2n, ⌈n/2⌉): each question must reveal one new fact, often an edge, an element or a letter.', 'n-এর রৈখিক সীমা (n, ২n, ⌈n/২⌉): প্রতি প্রশ্নে একটি নতুন তথ্য প্রকাশ হতে হবে, প্রায়ই একটি কিনারা, উপাদান বা অক্ষর।'),
  ],
  patterns: [
    {
      name: L('The protocol: ask, flush, read, stop on −1', 'প্রোটোকল: প্রশ্ন, ফ্লাশ, পড়া, −১ এ থামা'),
      explain: [
        L('Every query must be printed with a flush (endl does it, or cout.flush()), otherwise the interactor waits forever and the verdict is Idleness limit exceeded. Read the reply with the same stream. If the reply is −1 the interactor says you broke a rule (too many queries, bad format): exit at once, because continuing only turns a wrong answer into a runtime error or a hang.', 'প্রতিটি প্রশ্ন ফ্লাশসহ প্রিন্ট করতে হয় (endl করে, বা cout.flush()), নইলে ইন্টারঅ্যাক্টর চিরকাল অপেক্ষা করে আর রায় Idleness limit exceeded। একই স্ট্রিম থেকে উত্তর পড়ো। উত্তর −১ হলে ইন্টারঅ্যাক্টর বলছে তুমি নিয়ম ভেঙেছ (বেশি প্রশ্ন, ভুল ফরম্যাট): সঙ্গে সঙ্গে বেরিয়ে যাও, কারণ চালিয়ে গেলে ভুল উত্তর রানটাইম এরর বা হ্যাং-এ বদলায়।'),
        L('Print nothing else to standard output. Debug output goes to cerr. And never use the “untie / sync off” speed tricks incorrectly: with cin.tie(nullptr), you must flush yourself.', 'স্ট্যান্ডার্ড আউটপুটে আর কিছু প্রিন্ট করো না। ডিবাগ আউটপুট cerr-এ। গতির কৌশল ভুলভাবে ব্যবহার করো না: cin.tie(nullptr) করলে ফ্লাশ নিজেকে করতে হয়।'),
      ],
      code: raw`int queriesUsed = 0;

// one question with two integers, one integer reply
int ask(int a, int b) {
    cout << "? " << a << " " << b << endl;        // endl flushes
    int reply;
    cin >> reply;
    if (reply == -1) exit(0);                      // the interactor rejected us: stop immediately
    queriesUsed++;
    return reply;
}

void answer(long long x) {
    cout << "! " << x << endl;
}

// first position in [lo, hi] where the monotone predicate becomes true (hi + 1 if never)
template <class Pred>
int firstTrue(int lo, int hi, Pred pred) {
    int low = lo, high = hi + 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (pred(mid)) high = mid; else low = mid + 1;
    }
    return low;
}`,
      example: { problem: '679A', text: L('Bear and Prime 100: the hidden number is up to 100 and you may ask 20 “is it divisible by d?” questions. Ask about every prime up to 50 and the squares 4, 9, 25, 49: a number is composite when two different primes divide it or when a prime square does. That is 19 questions, and the reply is read as a word “yes” or “no”.', 'Bear and Prime 100: লুকানো সংখ্যা ১০০ পর্যন্ত আর ২০টি “d দিয়ে বিভাজ্য?” প্রশ্ন করা যায়। ৫০ পর্যন্ত প্রতিটি মৌলিক সংখ্যা আর বর্গ ৪, ৯, ২৫, ৪৯ নিয়ে প্রশ্ন করো: দুটি ভিন্ন মৌলিক বা একটি মৌলিকের বর্গ ভাগ করলে সংখ্যা যৌগিক। এতে ১৯টি প্রশ্ন, আর উত্তর শব্দ “yes” বা “no” হিসেবে পড়া হয়।') },
    },
    {
      name: L('Binary search with a question as the predicate', 'প্রশ্নকে প্রেডিকেট করে বাইনারি সার্চ'),
      explain: [
        L('If a query answers “is the target at or left of m?” (or something equivalent, like the second maximum of a range telling you on which side the maximum sits), the whole problem is a binary search with the query as the test. Count how many questions each step uses, and compare with the limit: 2 per step doubles the budget.', 'কোনো প্রশ্ন “লক্ষ্য কি m-এ বা বাঁয়ে?” (বা সমতুল্য কিছু, যেমন রেঞ্জের দ্বিতীয় সর্বোচ্চ বলে দেয় সর্বোচ্চ কোন পাশে) উত্তর দিলে পুরো সমস্যা প্রশ্নকে পরীক্ষা করে বাইনারি সার্চ। প্রতি ধাপে কতগুলো প্রশ্ন লাগে গুনো এবং সীমার সাথে মেলাও: ধাপপ্রতি ২ মানে বাজেট দ্বিগুণ।'),
      ],
      code: raw`// find the position of the maximum when query(l, r) returns the position of the SECOND maximum of [l, r]
int findMaximum(int n, const function<int(int, int)>& query) {
    int s = query(1, n);                              // the second maximum of everything is the anchor
    bool toTheLeft = s > 1 && query(1, s) == s;       // does the maximum lie to the left of s?
    if (toTheLeft) {                                  // query(m, s) == s exactly while m <= position of the maximum
        int lo = 1, hi = s - 1;
        while (lo < hi) {
            int m = (lo + hi + 1) / 2;
            if (query(m, s) == s) lo = m; else hi = m - 1;
        }
        return lo;
    }
    int lo = s + 1, hi = n;                           // query(s, m) == s exactly while m >= position of the maximum
    while (lo < hi) {
        int m = (lo + hi) / 2;
        if (query(s, m) == s) hi = m; else lo = m + 1;
    }
    return lo;
}`,
      example: { problem: '1486C2', text: L('Guessing the Greatest (hard version): one query on the whole range gives the second maximum s, and s is then a fixed anchor. A second query on [1, s] says whether the maximum is to its left; after that every query is “does [m, s] (or [s, m]) still have s as its second maximum?”, which is true exactly while the range still contains the maximum. That is a plain binary search, 2 + ⌈log₂ n⌉ questions, which fits the limit of 20. The easy version (1486C1) allows 40, so even a cruder halving works.', 'Guessing the Greatest (কঠিন সংস্করণ): পুরো রেঞ্জে একটি প্রশ্ন দ্বিতীয় সর্বোচ্চ s দেয়, আর s তখন একটি নির্দিষ্ট নোঙর। [১, s]-এ দ্বিতীয় প্রশ্ন বলে সর্বোচ্চ তার বাঁয়ে কি না; তারপর প্রতিটি প্রশ্ন “[m, s] (বা [s, m])-এ কি এখনও s দ্বিতীয় সর্বোচ্চ?”, যা ঠিক তখন সত্য যখন রেঞ্জে এখনও সর্বোচ্চ আছে। এটি সাধারণ বাইনারি সার্চ, ২ + ⌈log₂ n⌉টি প্রশ্ন, যা ২০-এর সীমায় ধরে। সহজ সংস্করণ (১৪৮৬C১) ৪০ দেয়, তাই অনেক স্থূল ভাগেও চলে।') },
    },
    {
      name: L('Learning two numbers bit by bit', 'দুটি সংখ্যা বিট ধরে ধরে জানা'),
      explain: [
        L('When a query compares two expressions in the hidden numbers, such as sign((a xor c) − (b xor d)) for your chosen c, d, determine the numbers from the highest bit down. Keep c and d equal to the known high bits of a and b, so the high bits of both expressions are zero and the sign depends only on the unknown low part. At bit i, flip bit i of c alone, then of d alone: equal replies mean the two bits differ and the old comparison says which is larger; different replies mean the bits are equal and the first reply gives their value.', 'কোনো প্রশ্ন লুকানো সংখ্যায় দুটি রাশি তুলনা করলে, যেমন তোমার বাছা c, d-র জন্য sign((a xor c) − (b xor d)), সংখ্যাগুলো সর্বোচ্চ বিট থেকে নিচে নির্ধারণ করো। c ও d-কে a ও b-র জানা উঁচু বিটের সমান রাখো, যাতে দুই রাশির উঁচু বিট শূন্য আর চিহ্ন শুধু অজানা নিচের অংশের ওপর নির্ভর করে। বিট i-তে শুধু c-র বিট i উল্টাও, তারপর শুধু d-র: দুই উত্তর সমান হলে দুই বিট ভিন্ন আর পুরোনো তুলনা বলে কোনটি বড়; উত্তর ভিন্ন হলে বিট সমান আর প্রথম উত্তর তাদের মান বলে।'),
      ],
      code: raw`// ask(c, d) returns 1, 0, -1 for sign((a ^ c) - (b ^ d)); at most 62 questions for 30-bit a, b
pair<int, int> recoverPair(const function<int(int, int)>& query) {
    int c = 0, d = 0;
    int cmp = query(0, 0);                          // comparison of the unknown low parts
    for (int i = 29; i >= 0; i--) {
        int bit = 1 << i;
        int flipA = query(c | bit, d);
        int flipB = query(c, d | bit);
        if (flipA == flipB) {                       // the two bits differ; cmp says which number has the 1
            if (cmp == 1) c |= bit; else d |= bit;
            cmp = flipA;                            // comparison of the remaining low parts
        } else if (flipA == -1) {                   // both bits are 1
            c |= bit; d |= bit;
        }                                           // else both bits are 0
    }
    return {c, d};
}`,
      example: { problem: '1088D', text: L('Ehab and another another xor problem: this is exactly the problem, with a, b < 2³⁰ and a limit of 62 questions: one initial question and two per bit. The same comparison idea, with a different query, is used in Game with modulo (1103B).', 'Ehab and another another xor problem: এটিই ঠিক সমস্যা, a, b < ২³০ ও ৬২টি প্রশ্নের সীমা: একটি প্রাথমিক প্রশ্ন আর প্রতি বিটে দুটি। একই তুলনার ধারণা ভিন্ন প্রশ্নসহ Game with modulo (১১০৩B)-এও ব্যবহৃত হয়।') },
    },
    {
      name: L('Reconstructing a graph from distances', 'দূরত্ব থেকে গ্রাফ পুনর্গঠন'),
      explain: [
        L('A query “distances from vertex v to every vertex” in a tree reveals the whole neighbourhood of v. A tree is bipartite, so the distances from any one vertex colour the tree by parity; every edge joins an even vertex to an odd one. Asking from every vertex of the smaller colour class therefore exposes every edge exactly once, in at most ⌈n/2⌉ questions.', 'ট্রিতে “শীর্ষ v থেকে প্রতিটি শীর্ষে দূরত্ব” প্রশ্ন v-র পুরো প্রতিবেশ প্রকাশ করে। ট্রি দ্বিপক্ষীয়, তাই যেকোনো এক শীর্ষ থেকে দূরত্ব প্যারিটি দিয়ে ট্রিকে রং করে; প্রতিটি কিনারা একটি জোড় আর একটি বিজোড় শীর্ষ জোড়ে। ছোট রঙের শ্রেণির প্রতিটি শীর্ষ থেকে জিজ্ঞেস করলে তাই প্রতিটি কিনারা ঠিক একবার প্রকাশ পায়, সর্বোচ্চ ⌈n/২⌉ প্রশ্নে।'),
      ],
      code: raw`// distancesFrom(v) returns the distance from v to every vertex (0-indexed)
vector<pair<int, int>> recoverTree(int n, const function<vector<int>(int)>& distancesFrom) {
    auto d0 = distancesFrom(0);
    vector<int> even, odd;
    for (int v = 0; v < n; v++) (d0[v] % 2 == 0 ? even : odd).push_back(v);
    const vector<int>& chosen = even.size() <= odd.size() ? even : odd;
    vector<pair<int, int>> edges;
    for (int v : chosen) {
        vector<int> d = v == 0 ? d0 : distancesFrom(v);       // vertex 0 was already asked
        for (int u = 0; u < n; u++)
            if (d[u] == 1) edges.push_back({v, u});
    }
    return edges;
}`,
      example: { problem: '1534D', text: L('Lost Tree: n ≤ 2000 and at most ⌈n/2⌉ questions. Ask from vertex 1, split by parity, and ask from every vertex of the smaller class (preferring the even class on a tie, since it already contains the first vertex).', 'Lost Tree: n ≤ ২০০০ ও সর্বোচ্চ ⌈n/২⌉টি প্রশ্ন। শীর্ষ ১ থেকে জিজ্ঞেস করো, প্যারিটি দিয়ে ভাগ করো, আর ছোট শ্রেণির প্রতিটি শীর্ষ থেকে জিজ্ঞেস করো (সমান হলে জোড় শ্রেণি, কারণ তাতে প্রথম শীর্ষ আছে)।') },
    },
    {
      name: L('Solving for few values, then deriving the rest', 'কয়েকটি মান বের করে বাকিগুলো হিসাব'),
      explain: [
        L('If queries reveal sums or similar combinations of two hidden values, spend a few questions to pin down one element exactly, then every other element costs one question. For sums of pairs, three questions s₁₂, s₁₃, s₂₃ give a₁ = (s₁₂ + s₁₃ − s₂₃) / 2, and then aᵢ = s₁ᵢ − a₁ for the rest, n questions in total instead of n²/2.', 'প্রশ্ন দুটি লুকানো মানের যোগফল বা অনুরূপ সংমিশ্রণ প্রকাশ করলে, একটি উপাদান নিখুঁতভাবে বের করতে কয়েকটি প্রশ্ন খরচ করো, তারপর বাকি প্রতিটি উপাদানে একটি প্রশ্ন। জোড়ার যোগফলে তিনটি প্রশ্ন s₁₂, s₁₃, s₂₃ দেয় a₁ = (s₁₂ + s₁₃ − s₂₃) / ২, তারপর বাকিদের জন্য aᵢ = s₁ᵢ − a₁, মোট n টি প্রশ্ন, n²/২-এর বদলে।'),
      ],
      code: raw`// sumQuery(i, j) returns a_i + a_j for i != j
vector<long long> recoverFromSums(int n, const function<long long(int, int)>& sumQuery) {
    long long s12 = sumQuery(0, 1), s13 = sumQuery(0, 2), s23 = sumQuery(1, 2);
    vector<long long> a(n);
    a[0] = (s12 + s13 - s23) / 2;
    a[1] = s12 - a[0];
    a[2] = s13 - a[0];
    for (int i = 3; i < n; i++) a[i] = sumQuery(0, i) - a[0];
    return a;
}`,
      example: { problem: '727C', text: L('Guess the Array: n ≤ 5000 and at most n questions of the form “a_i + a_j”. The three-sum trick above uses exactly 3 + (n − 3) = n questions. The same “find one anchor, then spend one question per remaining item” shape appears in 1556D (OR and AND give the sum) and 1407C (a pair of remainders names the larger value).', 'Guess the Array: n ≤ ৫০০০ ও সর্বোচ্চ n টি “a_i + a_j” প্রশ্ন। উপরের তিন-যোগফল কৌশলে ঠিক ৩ + (n − ৩) = n টি প্রশ্ন। একই “একটি নোঙর খোঁজো, তারপর বাকি প্রতিটির জন্য একটি প্রশ্ন” আকৃতি ১৫৫৬D (OR ও AND যোগফল দেয়) আর ১৪০৭C (দুটি ভাগশেষের জোড়া বড় মানটি বলে)-তে আছে।') },
    },
  ],
  mistakes: [
    L('Forgetting to flush: the program waits for a reply that never comes, and the verdict is Idleness limit exceeded.', 'ফ্লাশ ভুলে যাওয়া: প্রোগ্রাম এমন উত্তরের অপেক্ষায় থাকে যা আসে না, আর রায় Idleness limit exceeded।'),
    L('Ignoring the −1 reply and continuing: always exit as soon as the interactor reports an error.', '−১ উত্তর উপেক্ষা করে চালিয়ে যাওয়া: ইন্টারঅ্যাক্টর ত্রুটি জানালেই বেরিয়ে যাও।'),
    L('Exceeding the question limit on a corner case such as n = 1 or the first and last positions: test the worst-case count with a local mock.', 'n = ১ বা প্রথম ও শেষ অবস্থানের মতো কোণার ক্ষেত্রে প্রশ্নের সীমা ছাড়ানো: লোকাল মকে সবচেয়ে খারাপ সংখ্যা পরীক্ষা করো।'),
    L('Printing the answer in the wrong format or a second time after it, or printing debug text to standard output.', 'ভুল ফরম্যাটে উত্তর প্রিন্ট করা, তার পরে আবার প্রিন্ট করা, বা স্ট্যান্ডার্ড আউটপুটে ডিবাগ লেখা।'),
    L('Assuming the hidden data is fixed when the interactor is adaptive: your algorithm must be correct for every consistent answer, not only the ones in the sample.', 'ইন্টারঅ্যাক্টর অ্যাডাপ্টিভ হলেও লুকানো ডেটা নির্দিষ্ট ধরে নেওয়া: তোমার অ্যালগরিদম প্রতিটি সামঞ্জস্যপূর্ণ উত্তরের জন্য ঠিক হতে হবে, শুধু নমুনার জন্য নয়।'),
  ],
  plan: [
    L('Start with the protocol and a tiny problem (679A, 1167B) and make flushing and the −1 rule automatic.', 'প্রোটোকল ও ছোট সমস্যা (৬৭৯A, ১১৬৭B) দিয়ে শুরু করো এবং ফ্লাশ ও −১ নিয়ম স্বয়ংক্রিয় করে ফেলো।'),
    L('Practise binary search through queries (1486C1, 1486C2, 713B) and count the questions on paper before coding.', 'প্রশ্নের মাধ্যমে বাইনারি সার্চের অনুশীলন করো (১৪৮৬C১, ১৪৮৬C২, ৭১৩B) এবং কোডের আগে কাগজে প্রশ্ন গুনো।'),
    L('Learn the bit-by-bit and anchor patterns (1088D, 1103B, 727C, 1556D) and write a local mock interactor for each, so you can test thousands of hidden inputs.', 'বিট-ধরে-ধরে ও নোঙর ধরন শেখো (১০৮৮D, ১১০৩B, ৭২৭C, ১৫৫৬D) এবং প্রতিটির জন্য লোকাল মক ইন্টারঅ্যাক্টর লেখো, যাতে হাজার হাজার লুকানো ইনপুট পরীক্ষা করা যায়।'),
    L('Finish with structure problems (1534D, 1174F, 1153E) where the query reveals a neighbourhood, a distance or a parity.', 'কাঠামোর সমস্যা (১৫৩৪D, ১১৭৪F, ১১৫৩E) দিয়ে শেষ করো, যেখানে প্রশ্ন প্রতিবেশ, দূরত্ব বা প্যারিটি প্রকাশ করে।'),
  ],
};
