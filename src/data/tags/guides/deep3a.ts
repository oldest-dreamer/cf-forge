import type { TagGuide } from '../guideTypes';

const raw = String.raw;
const L = (en: string, bn: string) => ({ en, bn });

// ───────────────────────────────────────────────────────── meet-in-the-middle
export const meetInTheMiddleGuideDeep: TagGuide = {
  slug: 'meet-in-the-middle',
  intro: [
    L(
      'Meet in the middle is a brute-force trick: when a full search needs 2ⁿ (or 3ⁿ, or bᵈ) steps and n is about 40 to 50, search each half separately and join the two halves cleverly. Two searches of 2ⁿ/² each cost about a million operations instead of a trillion, and the join (sort, binary search, two pointers, or a hash map) costs only a little more.',
      'মিট ইন দ্য মিডল একটি ব্রুট-ফোর্স কৌশল: পূর্ণ সার্চে ২ⁿ (বা ৩ⁿ, বা bᵈ) ধাপ লাগলে এবং n প্রায় ৪০ থেকে ৫০ হলে, প্রতিটি অর্ধেক আলাদা সার্চ করে দুই অর্ধেক বুদ্ধি করে জোড়ো। ২ⁿ/²-এর দুটি সার্চে খরচ প্রায় দশ লাখ অপারেশন, ট্রিলিয়নের বদলে, আর জোড়ার (সর্ট, বাইনারি সার্চ, দুই পয়েন্টার বা হ্যাশ ম্যাপ) খরচ সামান্য বেশি।',
    ),
    L(
      'The trick works when the whole answer is built from two independent halves that interact only through a simple quantity: the sum of the chosen values, the XOR of a path, the number of stickers used. Then for every left half you ask: “which right halves complete it?”, and that question has a fast answer.',
      'কৌশলটি কাজ করে যখন পুরো উত্তর দুটি স্বাধীন অর্ধেক থেকে তৈরি আর তারা শুধু একটি সরল রাশির মাধ্যমে মিথস্ক্রিয়া করে: বাছা মানের যোগফল, পথের XOR, ব্যবহৃত স্টিকারের সংখ্যা। তখন প্রতিটি বাঁ অর্ধেকের জন্য জিজ্ঞেস করো: “কোন ডান অর্ধেক একে সম্পূর্ণ করে?”, আর সেই প্রশ্নের দ্রুত উত্তর আছে।',
    ),
  ],
  recognize: [
    L('n is between 30 and 50 and the statement is a subset choice: too big for 2ⁿ, too small for a polynomial algorithm to be expected.', 'n ৩০ থেকে ৫০-এর মধ্যে আর বিবৃতি উপসেট বাছাই: ২ⁿ-এর জন্য বড়, কিন্তু বহুপদী অ্যালগরিদমের আশা করার মতো ছোট নয়।'),
    L('A grid or graph with paths of length about 40 and a condition on the whole path (XOR, sum).', 'প্রায় ৪০ দৈর্ঘ্যের পথওয়ালা গ্রিড বা গ্রাফ আর পুরো পথের ওপর শর্ত (XOR, যোগফল)।'),
    L('Three choices per item (skip, take, take with a twist) and n up to about 25.', 'প্রতি জিনিসে তিন পছন্দ (বাদ, নাও, বিশেষভাবে নাও) আর n প্রায় ২৫ পর্যন্ত।'),
    L('A search whose depth is large but whose start and goal are both known: search from both ends.', 'যে সার্চের গভীরতা বেশি কিন্তু শুরু ও লক্ষ্য দুটোই জানা: দুই প্রান্ত থেকে সার্চ করো।'),
  ],
  patterns: [
    {
      name: L('Two sorted halves of subset sums', 'উপসেট যোগফলের দুটি সাজানো অর্ধেক'),
      explain: [
        L('List all 2^(n/2) subset sums of each half and sort them. A target such as “largest sum not above T” or “largest sum modulo m” is then answered for every left value with a two-pointer sweep: as the left value grows, the best partner on the right only moves down. For “modulo m” remember the wrap-around candidate: the largest right value added to the left one and reduced.', 'প্রতিটি অর্ধেকের সব ২^(n/২) উপসেট যোগফল তালিকা করে সাজাও। “T-র বেশি নয় এমন সবচেয়ে বড় যোগফল” বা “m মডুলোতে সবচেয়ে বড় যোগফল” ধরনের লক্ষ্য তখন প্রতিটি বাঁ মানের জন্য দুই-পয়েন্টার সুইপে মেলে: বাঁ মান বাড়লে ডানের সেরা সঙ্গী শুধু নিচে নামে। “m মডুলো”-তে ঘুরে আসা প্রার্থী মনে রাখো: ডানের সবচেয়ে বড় মান বাঁ মানের সাথে যোগ করে মডুলো।'),
      ],
      code: raw`vector<long long> allSums(const vector<long long>& a, int lo, int hi, long long m) {
    vector<long long> sums = {0};
    for (int i = lo; i < hi; i++) {
        size_t size = sums.size();
        for (size_t j = 0; j < size; j++) sums.push_back((sums[j] + a[i]) % m);
    }
    sort(sums.begin(), sums.end());
    return sums;
}

long long bestSubsetModulo(const vector<long long>& a, long long m) {
    int n = a.size(), h = n / 2;
    auto left = allSums(a, 0, h, m), right = allSums(a, h, n, m);
    long long best = 0;
    int j = (int)right.size() - 1;
    for (long long x : left) {                       // x grows, so the partner index only falls
        while (j >= 0 && x + right[j] >= m) j--;
        if (j >= 0) best = max(best, x + right[j]);
        best = max(best, (x + right.back()) % m);    // wrap-around candidate
    }
    return best;
}`,
      example: { problem: '888E', text: L('Maximum Subsequence: 35 numbers, maximise the subset sum modulo m. Halves of 17 and 18 numbers give about 131 000 and 262 000 sums each, sorted. The sweep above finishes in linear time after sorting.', 'Maximum Subsequence: ৩৫টি সংখ্যা, m মডুলোতে উপসেট যোগফল সর্বাধিক করো। ১৭ ও ১৮ সংখ্যার অর্ধেক থেকে প্রায় ১,৩১,০০০ ও ২,৬২,০০০টি সাজানো যোগফল মেলে। সর্টের পর সুইপ রৈখিক সময়ে শেষ হয়।') },
    },
    {
      name: L('Counting selections with an exact total', 'ঠিক নির্দিষ্ট মোটসহ নির্বাচন গোনা'),
      explain: [
        L('When you must count the subsets with sum exactly T, keep a map from sum to number of ways for the right half, and for every left sum look up T − sum. The number of distinct sums can be smaller than 2^(n/2), which makes the map smaller than the list.', 'ঠিক T যোগফলের উপসেট গুনতে হলে ডান অর্ধেকের জন্য যোগফল থেকে উপায়-সংখ্যার ম্যাপ রাখো, আর প্রতিটি বাঁ যোগফলের জন্য T − যোগফল খোঁজো। ভিন্ন যোগফলের সংখ্যা ২^(n/২)-এর চেয়ে কম হতে পারে, তাই ম্যাপ তালিকার চেয়ে ছোট হয়।'),
      ],
      code: raw`long long countSubsetsWithSum(const vector<long long>& a, long long target) {
    int n = a.size(), h = n / 2;
    auto sums = [&](int lo, int hi) {
        vector<long long> s = {0};
        for (int i = lo; i < hi; i++) {
            size_t size = s.size();
            for (size_t j = 0; j < size; j++) s.push_back(s[j] + a[i]);
        }
        return s;
    };
    map<long long, long long> right;
    for (long long x : sums(h, n)) right[x]++;
    long long ways = 0;
    for (long long x : sums(0, h)) {
        auto it = right.find(target - x);
        if (it != right.end()) ways += it->second;
    }
    return ways;
}`,
      example: { text: L('“How many subsets of 40 numbers add up to exactly S?” Each half has 20 numbers, about a million sums; the map answers a million lookups in a fraction of a second.', '“৪০টি সংখ্যার কতগুলো উপসেটের যোগফল ঠিক S?” প্রতি অর্ধেকে ২০টি সংখ্যা, প্রায় দশ লাখ যোগফল; ম্যাপ দশ লাখ খোঁজ সেকেন্ডের ভগ্নাংশে সামলায়।') },
    },
    {
      name: L('Paths meeting on a diagonal', 'কর্ণে মিলিত পথ'),
      explain: [
        L('On an n × m grid, all monotone paths from the top-left to the bottom-right number C(n + m − 2, n − 1), far too many when n + m is 40. But every path crosses the anti-diagonal i + j = (n + m − 2) / 2 exactly once. Walk forward to that diagonal storing the XOR so far, indexed by the cell reached; walk backward from the corner and look for the matching XOR in the same cell. The half walks have only 2^20 steps each.', 'n × m গ্রিডে উপরের-বাঁ থেকে নিচের-ডান পর্যন্ত সব একমুখী পথের সংখ্যা C(n + m − ২, n − ১), n + m ৪০ হলে অনেক বেশি। কিন্তু প্রতিটি পথ প্রতিবিন্দু-কর্ণ i + j = (n + m − ২) / ২ ঠিক একবার ছোঁয়। সেই কর্ণ পর্যন্ত এগিয়ে এ পর্যন্ত XOR রাখো, পৌঁছানো ঘর অনুযায়ী; কোণ থেকে পিছিয়ে একই ঘরে মিলে যাওয়া XOR খোঁজো। অর্ধেক হাঁটায় মাত্র ২^২০ ধাপ।'),
      ],
      code: raw`long long countXorPaths(const vector<vector<long long>>& g, long long k) {
    int n = g.size(), m = g[0].size(), half = (n + m - 2) / 2;
    vector<map<long long, long long>> mid(n);        // row of the meeting cell -> xor -> count
    function<void(int, int, long long)> forward = [&](int i, int j, long long x) {
        x ^= g[i][j];
        if (i + j == half) { mid[i][x]++; return; }
        if (i + 1 < n) forward(i + 1, j, x);
        if (j + 1 < m) forward(i, j + 1, x);
    };
    long long answer = 0;
    function<void(int, int, long long)> backward = [&](int i, int j, long long x) {
        if (i + j == half) {                          // the meeting cell is counted by the forward half
            auto it = mid[i].find(x ^ k);
            if (it != mid[i].end()) answer += it->second;
            return;
        }
        x ^= g[i][j];
        if (i > 0) backward(i - 1, j, x);
        if (j > 0) backward(i, j - 1, x);
    };
    forward(0, 0, 0);
    backward(n - 1, m - 1, 0);
    return answer;
}`,
      example: { problem: '1006F', text: L('Xor-Paths: the grid is at most 20 × 20, so a path has up to 38 steps. Meet on the middle diagonal; the meeting cell’s value is included once, by the forward half.', 'Xor-Paths: গ্রিড সর্বোচ্চ ২০ × ২০, তাই পথে সর্বোচ্চ ৩৮ ধাপ। মাঝের কর্ণে মিলো; মিলনস্থলের ঘরের মান শুধু সামনের অর্ধেক একবার ধরে।') },
    },
    {
      name: L('Three choices per item', 'প্রতি জিনিসে তিন পছন্দ'),
      explain: [
        L('With three states per item (not chosen, chosen, chosen with a sticker), 3ⁿ is out of reach already for n = 25, but 3^12 and 3^13 are about half a million and 1.6 million. For every sum on the left keep how many ways use exactly c stickers, turn those counts into prefix sums over c, and for each right half read how many left halves fit in the remaining sticker budget.', 'প্রতি জিনিসে তিন অবস্থা (বাছা নয়, বাছা, স্টিকারসহ বাছা) হলে n = ২৫-এ ৩ⁿ-এ আর পৌঁছানো যায় না, কিন্তু ৩^১২ ও ৩^১৩ প্রায় পাঁচ লাখ ও ষোল লাখ। প্রতিটি বাঁ যোগফলের জন্য ঠিক c টি স্টিকার ব্যবহারের উপায় রাখো, সেই গণনাকে c-র ওপর প্রিফিক্স যোগে বদলাও, আর প্রতিটি ডান অর্ধেকের জন্য অবশিষ্ট স্টিকার বাজেটে কতটি বাঁ অর্ধেক খাপ খায় পড়ো।'),
      ],
      code: raw`long long factorialOrBig(int a) {                  // a! if it stays below 1e18, else -1
    long long f = 1;
    for (int i = 2; i <= a; i++) { if (f > (long long)1e18 / i) return -1; f *= i; }
    return f;
}

long long countCubeWays(const vector<int>& a, int stickers, long long target) {
    int n = a.size(), h = n / 2;
    auto enumerate = [&](int lo, int hi) {            // list of {sum, stickers used}
        vector<pair<long long, int>> cur = {{0, 0}};
        for (int i = lo; i < hi; i++) {
            long long f = factorialOrBig(a[i]);
            vector<pair<long long, int>> next;
            for (auto [s, c] : cur) {
                next.push_back({s, c});
                if (s + a[i] <= target) next.push_back({s + a[i], c});
                if (f > 0 && s + f <= target && c + 1 <= stickers) next.push_back({s + f, c + 1});
            }
            cur = move(next);
        }
        return cur;
    };
    map<long long, vector<long long>> left;           // sum -> ways by sticker count
    for (auto [s, c] : enumerate(0, h)) {
        auto& v = left[s];
        if (v.empty()) v.assign(stickers + 1, 0);
        v[c]++;
    }
    for (auto& [s, v] : left)
        for (int c = 1; c <= stickers; c++) v[c] += v[c - 1];   // at most c stickers
    long long ways = 0;
    for (auto [s, c] : enumerate(h, n)) {
        auto it = left.find(target - s);
        if (it != left.end()) ways += it->second[stickers - c];
    }
    return ways;
}`,
      example: { problem: '525E', text: L('Anya and Cubes: n ≤ 26 cubes, up to k factorial stickers, the total must equal S. Each cube is skipped, taken, or taken with a sticker (a ≤ 18, otherwise the sticker is useless). That is 3^13 per half.', 'Anya and Cubes: n ≤ ২৬টি কিউব, সর্বোচ্চ k টি ফ্যাক্টোরিয়াল স্টিকার, মোট ঠিক S হতে হবে। প্রতিটি কিউব বাদ, নেওয়া বা স্টিকারসহ নেওয়া (a ≤ ১৮, নইলে স্টিকার অকেজো)। প্রতি অর্ধেকে ৩^১৩।') },
    },
    {
      name: L('Bidirectional search', 'দ্বিমুখী সার্চ'),
      explain: [
        L('If a search tree has branching factor b and the answer is at depth d, plain BFS touches about bᵈ states, but two searches from the start and the goal each go only to depth d/2 and touch about 2·b^(d/2). Always expand the smaller frontier, expand a whole level at a time, and stop when a state is seen by both sides; take the minimum over the level.', 'সার্চ ট্রির শাখা-গুণক b হলে এবং উত্তর গভীরতা d-তে থাকলে সাধারণ BFS প্রায় bᵈ অবস্থা ছোঁয়, কিন্তু শুরু ও লক্ষ্য থেকে দুটি সার্চ প্রত্যেকে মাত্র d/২ গভীরতা পর্যন্ত যায় আর প্রায় ২·b^(d/২) অবস্থা ছোঁয়। সবসময় ছোট ফ্রন্টিয়ার বাড়াও, এক সময়ে পুরো একটি স্তর বাড়াও, আর কোনো অবস্থা দুই পাশেই দেখা গেলে থামো; স্তরের ন্যূনতম নাও।'),
      ],
      code: raw`int bidirectionalBfs(const vector<vector<int>>& g, int s, int t) {
    if (s == t) return 0;
    int n = g.size();
    vector<int> distS(n, -1), distT(n, -1);
    distS[s] = 0; distT[t] = 0;
    vector<int> frontS = {s}, frontT = {t};
    while (!frontS.empty() && !frontT.empty()) {
        bool fromS = frontS.size() <= frontT.size();
        auto& front = fromS ? frontS : frontT;
        auto& mine = fromS ? distS : distT;
        auto& other = fromS ? distT : distS;
        vector<int> next;
        int best = -1;
        for (int v : front)
            for (int u : g[v]) {
                if (other[u] >= 0) {
                    int d = mine[v] + 1 + other[u];
                    if (best < 0 || d < best) best = d;
                }
                if (mine[u] < 0) { mine[u] = mine[v] + 1; next.push_back(u); }
            }
        if (best >= 0) return best;
        front = next;
    }
    return -1;
}`,
      example: { text: L('Sliding puzzles and cube-like states: when the number of moves is about 20 with a branching of about 10, one-sided BFS needs 10²⁰ states while the two-sided search needs about 2·10¹⁰ in the worst case, and far fewer with duplicate detection.', 'স্লাইডিং পাজল ও কিউবের মতো অবস্থা: প্রায় ২০ চাল ও প্রায় ১০ শাখা হলে একমুখী BFS-এ ১০²⁰ অবস্থা লাগে, দুমুখী সার্চে খারাপতম ক্ষেত্রে প্রায় ২·১০¹⁰, আর ডুপ্লিকেট শনাক্ত করলে আরও অনেক কম।') },
    },
  ],
  mistakes: [
    L('Splitting unevenly (10 and 30 items): the big half is still 2³⁰. Split as evenly as possible.', 'অসমান ভাগ (১০ ও ৩০ জিনিস): বড় অর্ধেক এখনও ২³⁰। যতটা সম্ভব সমান ভাগ করো।'),
    L('Forgetting the empty selection on one side, or counting the middle cell/element twice (or not at all).', 'এক পাশে ফাঁকা নির্বাচন ভুলে যাওয়া, বা মাঝের ঘর/উপাদান দুবার (বা একবারও না) গোনা।'),
    L('Using a slow join: an O(2^(n/2) · 2^(n/2)) double loop defeats the purpose. Sort, two pointers or hash.', 'ধীর জোড়া: O(২^(n/২) · ২^(n/২)) ডাবল লুপ উদ্দেশ্যই নষ্ট করে। সর্ট, দুই পয়েন্টার বা হ্যাশ ব্যবহার করো।'),
    L('Memory: 2²⁰ pairs of long long is fine, but maps of vectors per sum can blow up. Prefer sorted arrays.', 'মেমরি: ২²⁰ জোড়া long long ঠিক আছে, কিন্তু যোগফলপ্রতি ভেক্টরের ম্যাপ ফুলে উঠতে পারে। সাজানো অ্যারে পছন্দ করো।'),
    L('Overflow in sums or in factorial-like values: cap or prune values that already exceed the target.', 'যোগফলে বা ফ্যাক্টোরিয়ালের মতো মানে ওভারফ্লো: লক্ষ্য ছাড়ানো মান ছেঁটে ফেলো বা সীমা দাও।'),
  ],
  plan: [
    L('Solve Maximum Subsequence (888E) and write the sweep with two pointers instead of binary search.', 'Maximum Subsequence (৮৮৮E) সমাধান করো এবং বাইনারি সার্চের বদলে দুই-পয়েন্টার সুইপ লেখো।'),
    L('Do the grid version (1006F): decide the meeting diagonal and what each half counts, on paper first.', 'গ্রিড সংস্করণ (১০০৬F) করো: আগে কাগজে মিলনের কর্ণ আর প্রতিটি অর্ধেক কী গোনে তা ঠিক করো।'),
    L('Do the three-state version (525E) and learn to fold an extra budget (stickers) into prefix sums.', 'তিন-অবস্থার সংস্করণ (৫২৫E) করো এবং অতিরিক্ত বাজেট (স্টিকার) প্রিফিক্স যোগে ঢুকাতে শেখো।'),
    L('Try bidirectional search on any shortest-path-in-a-state-space problem from the full problemset.', 'পুরো প্রবলেমসেট থেকে যেকোনো অবস্থা-স্পেসের শর্টেস্ট-পাথ সমস্যায় দ্বিমুখী সার্চ চেষ্টা করো।'),
  ],
};

// ───────────────────────────────────────────────────────── divide-and-conquer
export const divideAndConquerGuideDeep: TagGuide = {
  slug: 'divide-and-conquer',
  intro: [
    L(
      'Divide and conquer splits a problem into smaller pieces of the same kind, solves them, and combines the answers. On Codeforces the tag covers five quite different ideas: plain recursion on a range or a tree (split at the maximum, at the midpoint), counting pairs that cross the midpoint (inversions), the “divide and conquer optimisation” of a layered DP, centroid decomposition of a tree, and offline processing of queries by recursion on the index or on time.',
      'ডিভাইড অ্যান্ড কনকার একটি সমস্যাকে একই ধরনের ছোট টুকরোয় ভাঙে, সেগুলো সমাধান করে, আর উত্তর জোড়ে। Codeforces-এ ট্যাগটি পাঁচটি বেশ ভিন্ন ধারণা ঢাকে: রেঞ্জ বা ট্রিতে সাধারণ রিকার্সন (সর্বোচ্চে বা মাঝে ভাগ), মাঝ পেরোনো জোড়া গোনা (ইনভার্সন), স্তরযুক্ত DP-র “ডিভাইড অ্যান্ড কনকার অপ্টিমাইজেশন”, ট্রির সেন্ট্রয়েড ডিকম্পোজিশন, আর সূচক বা সময়ের ওপর রিকার্সনে কোয়েরির অফলাইন প্রক্রিয়া।',
    ),
    L(
      'What they share is the cost argument: if each level of the recursion does O(n) work in total and there are log n levels, the whole thing is O(n log n). Your job is to find a combine step that is cheap and a split that keeps the pieces balanced.',
      'এদের সাধারণ বিষয় খরচের যুক্তি: রিকার্সনের প্রতি স্তরে মোট O(n) কাজ আর log n স্তর থাকলে পুরোটা O(n log n)। তোমার কাজ সস্তা জোড়ার ধাপ আর টুকরো ভারসাম্যপূর্ণ রাখা ভাগ খুঁজে বের করা।',
    ),
  ],
  recognize: [
    L('A statement where the answer for a range is made from the answers of its two halves plus something that crosses the middle.', 'যে বিবৃতিতে রেঞ্জের উত্তর তার দুই অর্ধেকের উত্তর আর মাঝ পেরোনো কিছু দিয়ে তৈরি।'),
    L('“Split into k groups to minimise the total cost”, with a cost that depends on a group’s boundaries: layered DP with monotone optimum.', '“k দলে ভাগ করে মোট খরচ ন্যূনতম করো”, খরচ দলের সীমানার ওপর নির্ভর করে: একমুখী অপ্টিমামসহ স্তরযুক্ত DP।'),
    L('Counting paths in a tree with a property (length, digit string, letters), where paths through a vertex are easy: centroid decomposition.', 'ট্রিতে কোনো ধর্মসহ পথ গোনা (দৈর্ঘ্য, অঙ্কের স্ট্রিং, অক্ষর), যেখানে একটি শীর্ষ দিয়ে যাওয়া পথ সহজ: সেন্ট্রয়েড ডিকম্পোজিশন।'),
    L('Offline range queries where a data structure for “merge two precomputed halves” exists, such as a linear XOR basis.', 'অফলাইন রেঞ্জ কোয়েরি যেখানে “দুটি প্রি-কম্পিউটেড অর্ধেক মেলানো”-র ডেটা স্ট্রাকচার আছে, যেমন রৈখিক XOR বেসিস।'),
  ],
  patterns: [
    {
      name: L('Recursion on a range (split at the maximum)', 'রেঞ্জে রিকার্সন (সর্বোচ্চে ভাগ)'),
      explain: [
        L('When the structure of the answer follows “the largest element sits at the root and the two sides are independent subproblems”, recurse on the maximum’s position. On a random array the depth is O(log n); on a sorted one it is O(n), so for big inputs build the same tree with a stack in O(n) instead (the Cartesian tree).', 'উত্তরের কাঠামো যখন “সবচেয়ে বড় উপাদান মূলে বসে আর দুই পাশ স্বাধীন উপসমস্যা”, তখন সর্বোচ্চের অবস্থানে রিকার্সন করো। এলোমেলো অ্যারেতে গভীরতা O(log n); সাজানোতে O(n), তাই বড় ইনপুটে একই ট্রি স্ট্যাক দিয়ে O(n)-এ বানাও (কার্টেসিয়ান ট্রি)।'),
      ],
      code: raw`void depthByMax(const vector<int>& a, int l, int r, int depth, vector<int>& result) {
    if (l > r) return;
    int m = l;
    for (int i = l; i <= r; i++)
        if (a[i] > a[m]) m = i;
    result[m] = depth;
    depthByMax(a, l, m - 1, depth + 1, result);
    depthByMax(a, m + 1, r, depth + 1, result);
}`,
      example: { problem: '1490D', text: L('Permutation Transformation: the depth of each element in the “maximum is the root” tree is exactly this recursion. With n ≤ 100 the quadratic version is fine.', 'Permutation Transformation: “সর্বোচ্চ মূল” ট্রিতে প্রতিটি উপাদানের গভীরতা ঠিক এই রিকার্সন। n ≤ ১০০ হওয়ায় দ্বিঘাত সংস্করণ চলে।') },
    },
    {
      name: L('Counting pairs that cross the middle (merge sort)', 'মাঝ পেরোনো জোড়া গোনা (মার্জ সর্ট)'),
      explain: [
        L('Count the pairs inside the left half, inside the right half, and across. When both halves are sorted, the across pairs can be counted with two pointers while merging. The same shape counts “pairs with a_i + a_j ≥ T”, “reverse pairs” and “range sums in [lo, hi]” (via prefix sums).', 'বাঁ অর্ধেকের ভেতরের, ডান অর্ধেকের ভেতরের আর দুই পাশ পেরোনো জোড়া গোনো। দুই অর্ধেক সাজানো থাকলে মার্জ করার সময় দুই পয়েন্টারে পেরোনো জোড়া গোনা যায়। একই ধরন “a_i + a_j ≥ T” জোড়া, “রিভার্স জোড়া”, আর “[lo, hi]-তে রেঞ্জ যোগফল” (প্রিফিক্স যোগ দিয়ে) গোনে।'),
      ],
      code: raw`long long countInversions(vector<int>& a, vector<int>& tmp, int l, int r) {   // [l, r)
    if (r - l <= 1) return 0;
    int mid = (l + r) / 2;
    long long count = countInversions(a, tmp, l, mid) + countInversions(a, tmp, mid, r);
    int i = l, j = mid, k = l;
    while (i < mid || j < r) {
        if (j == r || (i < mid && a[i] <= a[j])) tmp[k++] = a[i++];
        else { count += mid - i; tmp[k++] = a[j++]; }            // a[j] is smaller than the rest of the left half
    }
    copy(tmp.begin() + l, tmp.begin() + r, a.begin() + l);
    return count;
}`,
      example: { text: L('“Count pairs i < j with a_i > a_j” is the merge above. For “count pairs with a_i > 2·a_j” run an extra two-pointer pass over the two sorted halves before merging.', '“a_i > a_j এমন i < j জোড়া গোনো” হলো উপরের মার্জ। “a_i > ২·a_j জোড়া গোনো”-র জন্য মার্জের আগে দুই সাজানো অর্ধেকে অতিরিক্ত দুই-পয়েন্টার পাস চালাও।') },
    },
    {
      name: L('Divide and conquer optimisation of a layered DP', 'স্তরযুক্ত DP-র ডিভাইড অ্যান্ড কনকার অপ্টিমাইজেশন'),
      explain: [
        L('For dp[j][i] = min over p < i of (dp[j − 1][p] + cost(p, i)), if the best split point opt(i) never decreases as i grows (true when cost satisfies the quadrangle inequality), compute the middle i first by trying every p in the allowed range, then recurse left with p ≤ opt and right with p ≥ opt. Each layer costs O(n log n) instead of O(n²), and k layers cost O(k n log n).', 'dp[j][i] = সব p < i-তে (dp[j − ১][p] + cost(p, i))-এর ন্যূনতম, যদি i বাড়লে সেরা বিভাজন বিন্দু opt(i) কখনও কমে না (cost চতুর্ভুজ অসমতা মানলে সত্য), তবে আগে মাঝের i-র জন্য অনুমোদিত পরিসরে সব p চেষ্টা করো, তারপর বাঁয়ে p ≤ opt আর ডানে p ≥ opt রেখে রিকার্সন করো। প্রতি স্তরে O(n²)-এর বদলে O(n log n), আর k স্তরে O(k n log n)।'),
      ],
      code: raw`const long long INF = LLONG_MAX / 4;

// computes cur[lo..hi] knowing that the optimal p for every i in [lo, hi] lies in [optLo, optHi]
template <class Cost>
void solveLayer(const vector<long long>& prev, vector<long long>& cur, int lo, int hi, int optLo, int optHi, Cost& cost) {
    if (lo > hi) return;
    int mid = (lo + hi) / 2, bestP = optLo;
    long long best = INF;
    for (int p = optLo; p <= min(mid - 1, optHi); p++) {
        if (prev[p] >= INF) continue;
        long long v = prev[p] + cost(p, mid);
        if (v < best) { best = v; bestP = p; }
    }
    cur[mid] = best;
    solveLayer(prev, cur, lo, mid - 1, optLo, bestP, cost);
    solveLayer(prev, cur, mid + 1, hi, bestP, optHi, cost);
}

// split a[1..n] into exactly k groups, cost of a group = (sum of the group) squared
long long splitSquares(const vector<long long>& a, int k) {
    int n = a.size();
    vector<long long> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    auto cost = [&](int p, int i) { long long s = pre[i] - pre[p]; return s * s; };
    vector<long long> prev(n + 1, INF), cur(n + 1, INF);
    prev[0] = 0;
    for (int j = 1; j <= k; j++) {
        fill(cur.begin(), cur.end(), INF);
        solveLayer(prev, cur, 1, n, 0, n - 1, cost);
        prev = cur;
    }
    return prev[n];
}`,
      example: { problem: '321E', text: L('Ciel and Gondolas: people on a line, the cost of a gondola is the sum of the unfamiliarity of every pair inside it, read from a 2D prefix table in O(1). That cost satisfies the quadrangle inequality, so the layered DP is exactly solveLayer. Yet Another Minimization Problem (868F) is the same shape, with a cost maintained by moving two pointers instead of a table.', 'Ciel and Gondolas: লাইনে মানুষ, গন্ডোলার খরচ ভেতরের প্রতিটি জোড়ার অপরিচিতির যোগফল, যা ২D প্রিফিক্স টেবিল থেকে O(1)-এ মেলে। এই খরচ চতুর্ভুজ অসমতা মানে, তাই স্তরযুক্ত DP ঠিক solveLayer। Yet Another Minimization Problem (৮৬৮F) একই আকৃতি, শুধু খরচ টেবিলের বদলে দুই পয়েন্টার সরিয়ে রাখা হয়।') },
    },
    {
      name: L('Centroid decomposition', 'সেন্ট্রয়েড ডিকম্পোজিশন'),
      explain: [
        L('Every tree has a centroid: a vertex whose removal leaves components of at most n/2 vertices. Count (or collect) everything about paths that pass through the centroid, delete it, and recurse into the components. Each vertex belongs to O(log n) levels, so total work is O(n log n) times the cost of handling one vertex per level.', 'প্রতিটি ট্রির একটি সেন্ট্রয়েড আছে: এমন শীর্ষ যা সরালে প্রতিটি কম্পোনেন্টে সর্বোচ্চ n/২ শীর্ষ থাকে। সেন্ট্রয়েড দিয়ে যাওয়া পথ সম্পর্কে সব গোনো (বা সংগ্রহ করো), তাকে মুছে ফেলো, আর কম্পোনেন্টগুলোতে রিকার্সন করো। প্রতিটি শীর্ষ O(log n) স্তরে পড়ে, তাই মোট কাজ O(n log n) গুণ প্রতি স্তরে এক শীর্ষ সামলানোর খরচ।'),
        L('To count pairs of vertices with a path property through the centroid, process its branches one at a time: look up each new vertex against everything already seen from earlier branches, then add the branch. That avoids pairing two vertices of the same branch.', 'সেন্ট্রয়েড দিয়ে যাওয়া পথের কোনো ধর্মসহ শীর্ষজোড়া গুনতে তার শাখাগুলো এক এক করে প্রক্রিয়া করো: প্রতিটি নতুন শীর্ষ আগের শাখাগুলো থেকে যা দেখা হয়েছে তার সাথে মেলাও, তারপর শাখাটি যোগ করো। এতে একই শাখার দুই শীর্ষের জোড়া বাদ যায়।'),
      ],
      code: raw`struct CentroidCounter {
    int K;
    vector<vector<int>> g;
    vector<int> sz;
    vector<char> dead;
    long long answer = 0;
    CentroidCounter(int n, int K) : K(K), g(n), sz(n), dead(n, 0) {}
    void addEdge(int a, int b) { g[a].push_back(b); g[b].push_back(a); }
    int calcSize(int v, int p) {
        sz[v] = 1;
        for (int u : g[v]) if (u != p && !dead[u]) sz[v] += calcSize(u, v);
        return sz[v];
    }
    int findCentroid(int v, int p, int total) {
        for (int u : g[v]) if (u != p && !dead[u] && sz[u] * 2 > total) return findCentroid(u, v, total);
        return v;
    }
    void collect(int v, int p, int depth, vector<int>& depths) {
        depths.push_back(depth);
        for (int u : g[v]) if (u != p && !dead[u]) collect(u, v, depth + 1, depths);
    }
    void solve(int root) {
        int total = calcSize(root, -1);
        int c = findCentroid(root, -1, total);
        dead[c] = 1;
        vector<long long> seen(total + 1, 0);
        seen[0] = 1;                                  // the centroid itself at depth 0
        for (int u : g[c]) {
            if (dead[u]) continue;
            vector<int> depths;
            collect(u, c, 1, depths);
            for (int d : depths) if (d <= K && K - d <= total) answer += seen[K - d];
            for (int d : depths) seen[d]++;
        }
        for (int u : g[c]) if (!dead[u]) solve(u);
    }
};   // usage: CentroidCounter cc(n, K); add edges; cc.solve(0); cc.answer = pairs at distance exactly K`,
      example: { problem: '321C', text: L('Ciel the Commander: the rule “between two equal ranks there is a higher rank” is exactly the shape of the centroid tree. Give the centroid rank A, its components rank B at their centroids, and so on; the depth is at most log₂ 10⁵ < 17, which fits in the 26 letters. Xenia and Tree (342E) keeps, per centroid, the nearest red vertex; Palindromes in a Tree (914E) and Digit Tree (715C) combine per-branch counts as in the code above.', 'Ciel the Commander: “দুটি সমান র‍্যাঙ্কের মাঝে একটি বড় র‍্যাঙ্ক থাকবে” নিয়ম ঠিক সেন্ট্রয়েড ট্রির আকৃতি। সেন্ট্রয়েডকে র‍্যাঙ্ক A দাও, তার কম্পোনেন্টের সেন্ট্রয়েডকে B, এভাবে; গভীরতা সর্বোচ্চ log₂ ১০⁵ < ১৭, যা ২৬ অক্ষরে ধরে। Xenia and Tree (৩৪২E) প্রতি সেন্ট্রয়েডে নিকটতম লাল শীর্ষ রাখে; Palindromes in a Tree (৯১৪E) ও Digit Tree (৭১৫C) উপরের কোডের মতো শাখাভিত্তিক গণনা মেলায়।') },
    },
    {
      name: L('Offline queries by recursion on the index', 'সূচকের ওপর রিকার্সনে অফলাইন কোয়েরি'),
      explain: [
        L('When there is a structure that answers a query from two halves, such as a linear XOR basis, split the index range at the middle and give each query to the first level where it crosses the middle. For a crossing query [ql, qr], build prefix structures going left from mid and going right from mid + 1 once per level, then merge the two for each query. Total: O(n log n) insertions plus O(1) merges per query.', 'যখন দুই অর্ধেক থেকে কোয়েরির উত্তর দেওয়ার মতো কাঠামো আছে, যেমন রৈখিক XOR বেসিস, তখন সূচক-পরিসর মাঝে ভাগ করো এবং প্রতিটি কোয়েরিকে প্রথম যে স্তরে সে মাঝ পেরোয় সেখানে দাও। মাঝ পেরোনো কোয়েরি [ql, qr]-এর জন্য প্রতি স্তরে একবার mid থেকে বাঁয়ে আর mid + ১ থেকে ডানে প্রিফিক্স কাঠামো বানাও, তারপর প্রতিটি কোয়েরির জন্য দুটি মেলাও। মোট: O(n log n) ইনসার্শন আর প্রতি কোয়েরিতে এক মেলানো।'),
      ],
      code: raw`struct Basis {
    int b[30];
    Basis() { fill(b, b + 30, 0); }
    void add(int x) {
        for (int i = 29; i >= 0 && x; i--) {
            if (!((x >> i) & 1)) continue;
            if (!b[i]) { b[i] = x; return; }
            x ^= b[i];
        }
    }
    int best() const {
        int r = 0;
        for (int i = 29; i >= 0; i--) if ((r ^ b[i]) > r) r ^= b[i];
        return r;
    }
};

void solveQueries(const vector<int>& a, int l, int r, const vector<int>& ids,
                  const vector<array<int, 2>>& q, vector<int>& ans) {
    if (ids.empty()) return;
    if (l == r) { for (int id : ids) ans[id] = a[l]; return; }
    int mid = (l + r) / 2;
    vector<int> leftIds, rightIds, crossIds;
    for (int id : ids) {
        if (q[id][1] <= mid) leftIds.push_back(id);
        else if (q[id][0] > mid) rightIds.push_back(id);
        else crossIds.push_back(id);
    }
    if (!crossIds.empty()) {
        vector<Basis> lb(mid - l + 1), rb(r - mid);
        Basis cur;
        for (int i = mid; i >= l; i--) { cur.add(a[i]); lb[i - l] = cur; }
        cur = Basis();
        for (int j = mid + 1; j <= r; j++) { cur.add(a[j]); rb[j - mid - 1] = cur; }
        for (int id : crossIds) {
            Basis merged = lb[q[id][0] - l];
            for (int t = 0; t < 30; t++)
                if (rb[q[id][1] - mid - 1].b[t]) merged.add(rb[q[id][1] - mid - 1].b[t]);
            ans[id] = merged.best();
        }
    }
    solveQueries(a, l, mid, leftIds, q, ans);
    solveQueries(a, mid + 1, r, rightIds, q, ans);
}`,
      example: { problem: '1100F', text: L('Ivan and Burgers: the maximum XOR of a subset of a[l..r] with n, q ≤ 5·10⁵. The recursion above handles it offline in O((n + q) log n · 30) time. The other classic answer keeps, for every prefix, a basis that remembers the latest position of each vector.', 'Ivan and Burgers: a[l..r]-এর উপসেটের সর্বোচ্চ XOR, n, q ≤ ৫·১০⁵। উপরের রিকার্সন অফলাইনে O((n + q) log n · ৩০) সময়ে সামলায়। অন্য ক্লাসিক উত্তর প্রতি প্রিফিক্সে এমন বেসিস রাখে যা প্রতিটি ভেক্টরের সর্বশেষ অবস্থান মনে রাখে।') },
    },
  ],
  mistakes: [
    L('A split that is not balanced: a recursion that peels off one element at a time is O(n²), not O(n log n).', 'অসম ভাগ: প্রতিবার এক উপাদান ছাড়িয়ে নেওয়া রিকার্সন O(n log n) নয়, O(n²)।'),
    L('Applying D&C optimisation without the monotone optimum: check the quadrangle inequality on a small case, or compare with the O(k n²) DP.', 'একমুখী অপ্টিমাম ছাড়া D&C অপ্টিমাইজেশন: ছোট ক্ষেত্রে চতুর্ভুজ অসমতা যাচাই করো বা O(k n²) DP-র সাথে মিলাও।'),
    L('Counting pairs inside the same branch in centroid decomposition: always process branches one at a time and add a branch only after querying it.', 'সেন্ট্রয়েড ডিকম্পোজিশনে একই শাখার জোড়া গোনা: শাখাগুলো এক এক করে প্রক্রিয়া করো এবং কোয়েরির পরে শাখা যোগ করো।'),
    L('Forgetting to mark the centroid dead before recursing: the recursion walks back into it and never ends.', 'রিকার্সনের আগে সেন্ট্রয়েডকে মৃত চিহ্নিত করতে ভুলে যাওয়া: রিকার্সন আবার তাতে ঢোকে আর শেষ হয় না।'),
    L('Deep recursion on a path-like tree with 10⁵ vertices: iterate the size computation, or raise the stack size.', '১০⁵ শীর্ষের পথের মতো ট্রিতে গভীর রিকার্সন: সাইজ গণনা ইটারেটিভ করো বা স্ট্যাক বাড়াও।'),
  ],
  plan: [
    L('Start with plain recursion (1490D) and merge-sort counting; learn to state the cost of a level.', 'সাধারণ রিকার্সন (১৪৯০D) ও মার্জ-সর্ট গণনা দিয়ে শুরু করো; এক স্তরের খরচ বলতে শেখো।'),
    L('Do the layered DP (321E, 833B), then the version with a moving-pointer cost (868F).', 'স্তরযুক্ত DP (৩২১E, ৮৩৩B) করো, তারপর চলমান-পয়েন্টার খরচের সংস্করণ (৮৬৮F)।'),
    L('Learn centroid decomposition on Ciel the Commander (321C), then use it for counting on Xenia and Tree (342E) and Digit Tree (715C).', 'Ciel the Commander (৩২১C) দিয়ে সেন্ট্রয়েড ডিকম্পোজিশন শেখো, তারপর Xenia and Tree (৩৪২E) ও Digit Tree (৭১৫C)-তে গণনায় ব্যবহার করো।'),
    L('Finish with offline index recursion (1100F) and the hard mixed problems 1527E and 150E.', 'অফলাইন সূচক-রিকার্সন (১১০০F) আর কঠিন মিশ্র সমস্যা ১৫২৭E ও ১৫০E দিয়ে শেষ করো।'),
  ],
};
