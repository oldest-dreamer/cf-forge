import type { Lesson } from './types';

const raw = String.raw;

export const L13: Lesson = {
  id: 'types-overflow',
  title: { en: 'Number types and overflow', bn: 'সংখ্যার টাইপ ও ওভারফ্লো' },
  summary: {
    en: 'How big each type can get, why int silently breaks at about 2 billion, and how division and char really behave.',
    bn: 'প্রতিটি টাইপ কত বড় হতে পারে, কেন int প্রায় ২০০ কোটিতে চুপচাপ ভুল করে, আর ভাগ ও char আসলে কীভাবে কাজ করে।',
  },
  minutes: 20,
  toolkit: ['long-long', 'int-limits', 'casting', 'char-ascii'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A variable is a box of fixed size. An int box has 32 bits, so it holds whole numbers from about -2.1 billion to +2.1 billion (exactly 2147483647 at most). A long long box has 64 bits and holds up to about 9.2 × 10^18. If a result does not fit, the computer does not warn you: it wraps around and you get a wrong number. This single fact causes a huge share of Wrong Answer verdicts.',
        bn: 'ভেরিয়েবল হলো নির্দিষ্ট আকারের একটি বাক্স। int বাক্সে ৩২ বিট, তাই এতে প্রায় -২১০ কোটি থেকে +২১০ কোটি পর্যন্ত পূর্ণসংখ্যা ধরে (সর্বোচ্চ ঠিক 2147483647)। long long বাক্সে ৬৪ বিট, ধরে প্রায় ৯.২ × 10^18 পর্যন্ত। ফল বাক্সে না ঢুকলে কম্পিউটার কোনো সতর্কতা দেয় না: মানটি ঘুরে গিয়ে ভুল সংখ্যা হয়। Wrong Answer-এর একটি বড় অংশের কারণ এই একটি তথ্য।',
      },
    },
    {
      kind: 'list',
      items: [
        { en: 'int: 32 bits, up to 2147483647 (about 2·10^9).', bn: 'int: ৩২ বিট, সর্বোচ্চ 2147483647 (প্রায় 2·10^9)।' },
        { en: 'long long: 64 bits, up to 9223372036854775807 (about 9·10^18).', bn: 'long long: ৬৪ বিট, সর্বোচ্চ 9223372036854775807 (প্রায় 9·10^18)।' },
        { en: 'double: decimal numbers with about 15 correct digits. It is not exact: 0.1 cannot be stored perfectly.', bn: 'double: দশমিক সংখ্যা, প্রায় ১৫টি সঠিক অঙ্ক। এটি নিখুঁত নয়: 0.1 ঠিকঠাক রাখা যায় না।' },
        { en: 'char: one byte, a single character such as \'a\'. It is also a small number (its ASCII code).', bn: 'char: এক বাইট, একটি অক্ষর যেমন \'a\'। এটি একই সঙ্গে ছোট একটি সংখ্যাও (ASCII কোড)।' },
        { en: 'bool: true or false.', bn: 'bool: true বা false।' },
      ],
    },
    {
      kind: 'code',
      caption: { en: 'Run it and read each line of output next to the code.', bn: 'চালান আর কোডের পাশে প্রতিটি আউটপুট লাইন পড়ুন।' },
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "int max      = " << INT_MAX << "\n";
    cout << "long long max= " << LLONG_MAX << "\n";
    cout << "sizeof int   = " << sizeof(int) << " bytes\n";
    cout << "sizeof ll    = " << sizeof(long long) << " bytes\n";

    int x = 100000;
    long long wrong = 1LL * x * x;       // 1LL makes the multiplication 64-bit
    cout << "100000 * 100000 = " << wrong << "\n";

    cout << "7 / 2   = " << 7 / 2 << "\n";        // integer division drops the fraction
    cout << "7 % 2   = " << 7 % 2 << "\n";        // remainder
    cout << "7.0 / 2 = " << 7.0 / 2 << "\n";      // one side is a decimal, so the answer is too
    cout << "-7 / 2  = " << -7 / 2 << "\n";       // rounds toward zero
    cout << "-7 % 2  = " << -7 % 2 << "\n";       // remainder can be negative

    char c = 'a';
    cout << "'a' + 1 = " << c + 1 << "\n";        // a number: 98
    cout << "char    = " << char(c + 1) << "\n";   // back to a character: b
    cout << "'7' - '0' = " << '7' - '0' << "\n";  // digit character to number
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'The 1LL trick', bn: '1LL কৌশল' } },
    {
      kind: 'p',
      text: {
        en: 'In a * b the computer first multiplies in the type of a and b, and only then stores the answer. If both are int, the multiplication itself overflows even when the result variable is long long. Writing 1LL * a * b (or (long long)a * b) forces a 64-bit multiplication from the start.',
        bn: 'a * b-তে কম্পিউটার আগে a আর b-এর টাইপেই গুণ করে, তারপর উত্তর রাখে। দুটিই int হলে ফলাফল ভেরিয়েবল long long হলেও গুণটিই ওভারফ্লো করে। 1LL * a * b (অথবা (long long)a * b) লিখলে শুরু থেকেই ৬৪ বিটে গুণ হয়।',
      },
    },
    {
      kind: 'warn',
      text: {
        en: 'long long x = a * b; is still wrong when a and b are int. The conversion to long long happens after the overflow.',
        bn: 'a আর b int হলে long long x = a * b; তবুও ভুল। long long-এ রূপান্তর হয় ওভারফ্লোর পরে।',
      },
    },
    { kind: 'h', text: { en: 'How to choose a type', bn: 'টাইপ কীভাবে বাছবেন' } },
    {
      kind: 'list',
      items: [
        { en: 'Read the constraints. If any value or any possible sum or product can pass 2·10^9, use long long.', bn: 'কনস্ট্রেইন্ট পড়ুন। কোনো মান, যোগফল বা গুণফল 2·10^9 ছাড়াতে পারলে long long ব্যবহার করুন।' },
        { en: 'Sum of n numbers each up to 10^9 with n up to 2·10^5 reaches 2·10^14: long long.', bn: 'n সংখ্যার প্রতিটি 10^9 পর্যন্ত আর n 2·10^5 পর্যন্ত হলে যোগফল 2·10^14 হয়: long long।' },
        { en: 'When unsure, use long long. It costs almost nothing on Codeforces.', bn: 'নিশ্চিত না হলে long long নিন। কোডফোর্সেসে এর খরচ প্রায় শূন্য।' },
      ],
    },
  ],
  mistakes: [
    { en: 'Using int for a sum or product that can pass 2·10^9, and getting a negative or random answer.', bn: '2·10^9 ছাড়াতে পারে এমন যোগফল বা গুণফলের জন্য int ব্যবহার করে ঋণাত্মক বা এলোমেলো উত্তর পাওয়া।' },
    { en: 'Writing 1 / 2 and expecting 0.5. Both sides are int, so the answer is 0. Use 1.0 / 2.', bn: '1 / 2 লিখে 0.5 আশা করা। দুই পাশই int, তাই উত্তর 0। 1.0 / 2 লিখুন।' },
    { en: 'Comparing doubles with ==. Compare with a small tolerance such as fabs(a - b) < 1e-9.', bn: 'double-কে == দিয়ে তুলনা করা। ছোট সহনসীমায় তুলনা করুন, যেমন fabs(a - b) < 1e-9।' },
    { en: 'Forgetting that a negative number % m can be negative.', bn: 'ঋণাত্মক সংখ্যা % m ঋণাত্মক হতে পারে, এটি ভুলে যাওয়া।' },
  ],
  exercise: {
    prompt: {
      en: 'Read two integers a and b (each up to 10^9). Print their product. The product can be as large as 10^18.',
      bn: 'দুটি পূর্ণসংখ্যা a আর b পড়ুন (প্রতিটি 10^9 পর্যন্ত)। তাদের গুণফল প্রিন্ট করুন। গুণফল 10^18 পর্যন্ত হতে পারে।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // print a * b without overflow

    return 0;
}
`,
    tests: [
      { input: '3 4', output: '12' },
      { input: '1000000000 1000000000', output: '1000000000000000000' },
      { input: '999999999 123456789', output: '123456788876543211' },
    ],
    hint: { en: 'Store the answer in a long long and multiply with 1LL * a * b.', bn: 'উত্তর long long-এ রাখুন আর 1LL * a * b দিয়ে গুণ করুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << 1LL * a * b << "\n";
    return 0;
}
`,
  },
};

export const L14: Lesson = {
  id: 'arrays',
  title: { en: 'Arrays', bn: 'অ্যারে' },
  summary: {
    en: 'Fixed-size lists, zero-based positions, global arrays, and counting with an array.',
    bn: 'নির্দিষ্ট আকারের তালিকা, ০ থেকে শুরু হওয়া অবস্থান, গ্লোবাল অ্যারে, আর অ্যারে দিয়ে গণনা।',
  },
  minutes: 18,
  toolkit: ['array', 'fill-memset'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'An array is a row of boxes of the same type. int a[5]; makes five int boxes numbered 0, 1, 2, 3, 4. The first box is a[0] and the last is a[4]. There is no a[5]: reading or writing it touches memory that is not yours and may crash or silently corrupt other variables.',
        bn: 'অ্যারে হলো একই টাইপের বাক্সের সারি। int a[5]; পাঁচটি int বাক্স বানায়, যাদের নম্বর 0, 1, 2, 3, 4। প্রথম বাক্স a[0], শেষ বাক্স a[4]। a[5] বলে কিছু নেই: এটি পড়লে বা লিখলে আপনার নয় এমন মেমরিতে হাত পড়ে, প্রোগ্রাম ক্র্যাশ করতে পারে বা চুপচাপ অন্য ভেরিয়েবল নষ্ট হতে পারে।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int a[100005];            // global: size above the limit, starts as all zeros

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];

    long long sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    cout << "sum = " << sum << "\n";

    cout << "first = " << a[0] << ", last = " << a[n - 1] << "\n";
    return 0;
}
`,
      input: '5\n4 8 15 16 23',
    },
    { kind: 'h', text: { en: 'Why global, and why a bit larger', bn: 'কেন গ্লোবাল, আর কেন একটু বড়' } },
    {
      kind: 'list',
      items: [
        { en: 'A global array starts filled with zeros. A local array inside main starts with garbage.', bn: 'গ্লোবাল অ্যারে শূন্য দিয়ে ভরা অবস্থায় শুরু হয়। main-এর ভেতরের লোকাল অ্যারেতে আবর্জনা থাকে।' },
        { en: 'Big arrays (millions of elements) must be global. The stack inside main is small and a big local array crashes the program.', bn: 'বড় অ্যারে (লাখ-লাখ উপাদান) অবশ্যই গ্লোবাল হবে। main-এর স্ট্যাক ছোট, বড় লোকাল অ্যারে প্রোগ্রাম ক্র্যাশ করায়।' },
        { en: 'Make the size a little above the limit (100005 for n up to 100000) so an off-by-one slip does not crash.', bn: 'সীমার চেয়ে একটু বড় সাইজ দিন (n 100000 পর্যন্ত হলে 100005), যাতে এক ঘরের ভুলে ক্র্যাশ না করে।' },
      ],
    },
    { kind: 'h', text: { en: 'Counting with an array', bn: 'অ্যারে দিয়ে গণনা' } },
    {
      kind: 'p',
      text: {
        en: 'When values are small (say 0 to 9, or a letter), use the value itself as the position: cnt[x]++ means "one more x". This is the simplest and fastest way to count, and it is the idea behind counting sort.',
        bn: 'মানগুলো ছোট হলে (ধরুন ০ থেকে ৯, বা একটি অক্ষর) মানটিকেই অবস্থান হিসেবে ব্যবহার করুন: cnt[x]++ মানে "x আরও একটি"। গণনার এটাই সবচেয়ে সহজ ও দ্রুত উপায়, আর এটাই কাউন্টিং সর্টের ধারণা।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "banana";
    int cnt[26] = {};                 // = {} sets all 26 boxes to 0
    for (char c : s) cnt[c - 'a']++;  // 'a' -> 0, 'b' -> 1, ...

    for (int i = 0; i < 26; i++)
        if (cnt[i] > 0) cout << char('a' + i) << ": " << cnt[i] << "\n";

    int grid[3][4] = {};              // 2D array: 3 rows, 4 columns
    grid[1][2] = 7;
    cout << grid[1][2] << " " << grid[0][0] << "\n";
    return 0;
}
`,
    },
    {
      kind: 'tip',
      text: {
        en: 'To reset a global array before each test case, use fill(a, a + n, 0). Do not reset all 10^6 cells every test when there are 10^5 tests: reset only the first n.',
        bn: 'প্রতিটি টেস্ট কেসের আগে গ্লোবাল অ্যারে রিসেট করতে fill(a, a + n, 0) ব্যবহার করুন। ১০^৫টি টেস্ট থাকলে প্রতিবার ১০^৬ ঘর রিসেট করবেন না: শুধু প্রথম n ঘর রিসেট করুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Using a[n] as the last element. The last one is a[n - 1].', bn: 'শেষ উপাদান হিসেবে a[n] ব্যবহার করা। শেষটি a[n - 1]।' },
    { en: 'Making the array smaller than the largest possible n.', bn: 'সম্ভাব্য বড়তম n-এর চেয়ে ছোট অ্যারে বানানো।' },
    { en: 'Declaring a huge array inside main. Move it outside as a global.', bn: 'main-এর ভেতরে বিশাল অ্যারে ঘোষণা করা। এটিকে বাইরে গ্লোবাল করুন।' },
    { en: 'Forgetting to reset counters between test cases.', bn: 'টেস্ট কেসের মাঝে কাউন্টার রিসেট করতে ভুলে যাওয়া।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n, then n digits (each from 0 to 9). Print ten numbers on one line: how many times 0 appears, how many times 1 appears, ..., how many times 9 appears.',
      bn: 'n পড়ুন, তারপর n টি অঙ্ক (প্রতিটি ০ থেকে ৯)। এক লাইনে দশটি সংখ্যা প্রিন্ট করুন: 0 কতবার, 1 কতবার, ..., 9 কতবার এসেছে।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int cnt[10] = {};
    // read the digits and count them

    // print cnt[0] ... cnt[9] separated by spaces

    return 0;
}
`,
    tests: [
      { input: '5\n1 2 2 9 0', output: '1 1 2 0 0 0 0 0 0 1' },
      { input: '3\n5 5 5', output: '0 0 0 0 0 3 0 0 0 0' },
      { input: '1\n0', output: '1 0 0 0 0 0 0 0 0 0' },
    ],
    hint: { en: 'For every digit d you read, do cnt[d]++. Then loop i from 0 to 9 and print cnt[i].', bn: 'যে অঙ্ক d পড়বেন তার জন্য cnt[d]++ করুন। তারপর i-কে 0 থেকে 9 পর্যন্ত ঘুরিয়ে cnt[i] প্রিন্ট করুন।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    int cnt[10] = {};
    for (int i = 0; i < n; i++) {
        int d;
        cin >> d;
        cnt[d]++;
    }
    for (int i = 0; i < 10; i++) {
        if (i) cout << " ";
        cout << cnt[i];
    }
    cout << "\n";
    return 0;
}
`,
  },
};

export const L15: Lesson = {
  id: 'grids',
  title: { en: 'Grids and 2D vectors', bn: 'গ্রিড ও ২ডি ভেক্টর' },
  summary: {
    en: 'Store a map of cells, walk to the four neighbours safely, and stay inside the borders.',
    bn: 'ঘরের মানচিত্র সংরক্ষণ করা, চার প্রতিবেশীর কাছে নিরাপদে যাওয়া, আর সীমানার ভেতরে থাকা।',
  },
  minutes: 20,
  toolkit: ['grid', 'directions'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'Many problems give a board: n rows and m columns of characters such as "." for empty and "#" for a wall. The easiest way to store it is vector<string>: g[i] is row i and g[i][j] is the character in row i, column j. Rows and columns both start at 0.',
        bn: 'অনেক প্রবলেমে একটি বোর্ড দেওয়া থাকে: n সারি আর m কলামের অক্ষর, যেমন ফাঁকা বোঝাতে "." আর দেয়াল বোঝাতে "#"। এটি রাখার সবচেয়ে সহজ উপায় vector<string>: g[i] হলো i-তম সারি আর g[i][j] হলো i সারি ও j কলামের অক্ষর। সারি ও কলাম দুটোই ০ থেকে শুরু।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (int i = 0; i < n; i++) cin >> g[i];

    int walls = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == '#') walls++;

    cout << "walls = " << walls << "\n";
    cout << "top-left = " << g[0][0] << ", bottom-right = " << g[n - 1][m - 1] << "\n";
    return 0;
}
`,
      input: '3 4\n#..#\n....\n..##',
    },
    { kind: 'h', text: { en: 'Walking to the four neighbours', bn: 'চার প্রতিবেশীর কাছে যাওয়া' } },
    {
      kind: 'p',
      text: {
        en: 'From cell (i, j) the neighbours are up (i-1, j), down (i+1, j), left (i, j-1) and right (i, j+1). Put the four changes in two small arrays and loop over them. Before touching a neighbour, always check it is inside the board, otherwise g[-1][0] or g[n][0] reads memory that does not exist.',
        bn: '(i, j) ঘর থেকে প্রতিবেশীরা হলো ওপরে (i-1, j), নিচে (i+1, j), বামে (i, j-1) আর ডানে (i, j+1)। চারটি পরিবর্তন দুটি ছোট অ্যারেতে রেখে লুপ চালান। প্রতিবেশীকে ছোঁয়ার আগে অবশ্যই দেখে নিন সেটি বোর্ডের ভেতরে কি না, নইলে g[-1][0] বা g[n][0] অস্তিত্বহীন মেমরি পড়বে।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto &row : g) cin >> row;

    const int dx[4] = {-1, 1, 0, 0};   // row change
    const int dy[4] = {0, 0, -1, 1};   // column change

    int i = 1, j = 1;                  // look around cell (1, 1)
    int openNeighbours = 0;
    for (int d = 0; d < 4; d++) {
        int ni = i + dx[d], nj = j + dy[d];
        if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;   // outside the board
        if (g[ni][nj] == '.') openNeighbours++;
    }
    cout << "open neighbours of (1,1): " << openNeighbours << "\n";
    return 0;
}
`,
      input: '3 3\n#..\n.#.\n...',
    },
    {
      kind: 'tip',
      text: {
        en: 'For numbers instead of characters use vector<vector<int>> a(n, vector<int>(m, 0)); it makes an n by m table filled with 0.',
        bn: 'অক্ষরের বদলে সংখ্যা রাখতে vector<vector<int>> a(n, vector<int>(m, 0)); ব্যবহার করুন; এটি 0 দিয়ে ভরা n × m টেবিল বানায়।',
      },
    },
  ],
  mistakes: [
    { en: 'Mixing up rows and columns: g[i][j] is row i, column j, not x then y of a picture.', bn: 'সারি ও কলাম গুলিয়ে ফেলা: g[i][j] হলো সারি i, কলাম j, ছবির x ও y নয়।' },
    { en: 'Skipping the border check and reading g[-1][...].', bn: 'সীমানা পরীক্ষা বাদ দিয়ে g[-1][...] পড়া।' },
    { en: 'Reading the grid with getline after cin >> n >> m without clearing the leftover newline. Reading with cin >> row avoids this.', bn: 'cin >> n >> m-এর পর বাকি নতুন লাইন না সরিয়ে getline দিয়ে গ্রিড পড়া। cin >> row দিয়ে পড়লে এ সমস্যা হয় না।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n, m and an n by m grid of "." and "#". Print how many "." cells have at least one "#" directly above, below, left or right of them.',
      bn: 'n, m আর "." ও "#" দিয়ে n × m গ্রিড পড়ুন। কতগুলো "." ঘরের ঠিক ওপরে, নিচে, বামে বা ডানে অন্তত একটি "#" আছে তা প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto &row : g) cin >> row;

    const int dx[4] = {-1, 1, 0, 0};
    const int dy[4] = {0, 0, -1, 1};
    int answer = 0;
    // for every '.' cell, check its four neighbours (stay inside the board)

    cout << answer << "\n";
    return 0;
}
`,
    tests: [
      { input: '3 3\n#..\n...\n..#', output: '4' },
      { input: '1 1\n.', output: '0' },
      { input: '2 2\n##\n##', output: '0' },
      { input: '1 3\n#.#', output: '1' },
    ],
    hint: { en: 'Loop over all cells. If g[i][j] is ".", loop d from 0 to 3, skip outside cells, and if any neighbour is "#" add 1 once and stop checking that cell.', bn: 'সব ঘরে ঘুরুন। g[i][j] "." হলে d-কে 0 থেকে 3 ঘোরান, বাইরের ঘর বাদ দিন, কোনো প্রতিবেশী "#" হলে একবার 1 যোগ করে ওই ঘরের পরীক্ষা থামান।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto &row : g) cin >> row;

    const int dx[4] = {-1, 1, 0, 0};
    const int dy[4] = {0, 0, -1, 1};
    int answer = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (g[i][j] != '.') continue;
            bool near = false;
            for (int d = 0; d < 4; d++) {
                int ni = i + dx[d], nj = j + dy[d];
                if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;
                if (g[ni][nj] == '#') near = true;
            }
            if (near) answer++;
        }
    }
    cout << answer << "\n";
    return 0;
}
`,
  },
};

export const L16: Lesson = {
  id: 'references-pointers',
  title: { en: 'References, pointers and iterators', bn: 'রেফারেন্স, পয়েন্টার ও ইটারেটর' },
  summary: {
    en: 'Pass big things without copying, change the caller\'s variable, and read the * and & signs you meet in STL code.',
    bn: 'বড় জিনিস কপি না করে পাঠানো, কলারের ভেরিয়েবল বদলানো, আর STL কোডে যে * ও & চিহ্ন দেখেন সেগুলো পড়তে শেখা।',
  },
  minutes: 22,
  toolkit: ['reference', 'iterator'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'When you pass a variable to a function, C++ normally makes a copy. The function changes the copy and your original stays the same. Writing & after the type (int &x) makes x another name for the original, so changes are real. It also avoids copying a big vector.',
        bn: 'ফাংশনে ভেরিয়েবল পাঠালে C++ সাধারণত একটি কপি বানায়। ফাংশন কপি বদলায়, আপনার মূলটি যেমন ছিল তেমনই থাকে। টাইপের পরে & লিখলে (int &x) x মূল ভেরিয়েবলেরই আরেকটি নাম হয়ে যায়, ফলে পরিবর্তন সত্যিই হয়। এতে বড় ভেক্টর কপির খরচও বাঁচে।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

void addOneCopy(int x)      { x++; }          // changes only the copy
void addOneRef(int &x)      { x++; }          // changes the caller's variable

long long sumAll(const vector<int> &v) {      // const & : no copy, cannot modify
    long long s = 0;
    for (int x : v) s += x;
    return s;
}

void doubleAll(vector<int> &v) {              // & : modifies the real vector
    for (int &x : v) x *= 2;                  // &x edits the elements
}

int main() {
    int a = 5;
    addOneCopy(a);
    cout << "after copy version: " << a << "\n";
    addOneRef(a);
    cout << "after reference version: " << a << "\n";

    vector<int> v = {1, 2, 3};
    doubleAll(v);
    cout << sumAll(v) << "\n";                // 12
    swap(v[0], v[2]);                         // swap uses references inside
    cout << v[0] << " " << v[1] << " " << v[2] << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'Which one to write', bn: 'কোনটি লিখবেন' } },
    {
      kind: 'list',
      items: [
        { en: 'Small value you will not change (int, char, bool): pass by value.', bn: 'ছোট মান যা বদলাবেন না (int, char, bool): মান দিয়ে পাঠান।' },
        { en: 'Big object you only read (vector, string): const T &.', bn: 'বড় অবজেক্ট যা শুধু পড়বেন (vector, string): const T &।' },
        { en: 'Anything the function must change for the caller: T &.', bn: 'ফাংশন কলারের জন্য যা বদলাবে: T &।' },
        { en: 'In a range-for, for (auto &x : v) edits elements; for (auto x : v) edits copies.', bn: 'range-for-তে for (auto &x : v) উপাদান বদলায়; for (auto x : v) কপি বদলায়।' },
      ],
    },
    { kind: 'h', text: { en: 'Pointers and iterators in one minute', bn: 'এক মিনিটে পয়েন্টার ও ইটারেটর' } },
    {
      kind: 'p',
      text: {
        en: 'A pointer stores where a value lives. &x means "the address of x" and *p means "the value at address p". An iterator is the same idea for containers: v.begin() points to the first element, v.end() points just past the last, *it is the element, and it + 1 is the next one. Functions like sort, find and lower_bound give you iterators back, and you turn them into positions by subtracting v.begin().',
        bn: 'পয়েন্টার মনে রাখে মানটি কোথায় থাকে। &x মানে "x-এর ঠিকানা" আর *p মানে "p ঠিকানার মান"। কনটেইনারের জন্য ইটারেটরও একই ধারণা: v.begin() প্রথম উপাদানের দিকে নির্দেশ করে, v.end() শেষের ঠিক পরের ঘরে, *it হলো উপাদানটি আর it + 1 পরেরটি। sort, find, lower_bound-এর মতো ফাংশন ইটারেটর ফেরত দেয়, আর v.begin() বিয়োগ করে সেটিকে অবস্থানে (ইনডেক্সে) বদলে নিতে হয়।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int x = 10;
    int *p = &x;            // p holds the address of x
    *p = 99;                // change x through the pointer
    cout << x << "\n";

    vector<int> v = {4, 7, 7, 9};
    auto it = find(v.begin(), v.end(), 7);      // iterator to the first 7
    if (it != v.end()) cout << "found " << *it << " at index " << it - v.begin() << "\n";

    auto big = max_element(v.begin(), v.end());
    cout << "max " << *big << " at index " << big - v.begin() << "\n";
    return 0;
}
`,
    },
  ],
  mistakes: [
    { en: 'Forgetting & and wondering why the function did not change your variable.', bn: '& ভুলে গিয়ে ভাবা কেন ফাংশন আপনার ভেরিয়েবল বদলাল না।' },
    { en: 'Passing a big vector by value in a function called many times: it copies every time and gets slow.', bn: 'বহুবার ডাকা ফাংশনে বড় ভেক্টর মান দিয়ে পাঠানো: প্রতিবার কপি হয়ে ধীর হয়ে যায়।' },
    { en: 'Dereferencing v.end() or an iterator you did not check. Always compare with v.end() first.', bn: 'v.end() বা অপরীক্ষিত ইটারেটরে * ব্যবহার করা। আগে v.end()-এর সঙ্গে তুলনা করুন।' },
    { en: 'Using auto x : v and expecting the vector to change.', bn: 'auto x : v লিখে ভেক্টর বদলাবে আশা করা।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n and n integers. Write a function void addOne(vector<int> &v) that adds 1 to every element, call it, and print the vector on one line.',
      bn: 'n আর n টি পূর্ণসংখ্যা পড়ুন। void addOne(vector<int> &v) নামে একটি ফাংশন লিখুন যা প্রতিটি উপাদানে 1 যোগ করে, সেটি কল করুন, আর ভেক্টরটি এক লাইনে প্রিন্ট করুন।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

void addOne(vector<int> &v) {
    // add 1 to every element
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (auto &x : v) cin >> x;
    addOne(v);
    for (int i = 0; i < n; i++) cout << v[i] << (i + 1 < n ? " " : "\n");
    return 0;
}
`,
    tests: [
      { input: '3\n1 2 3', output: '2 3 4' },
      { input: '1\n-1', output: '0' },
      { input: '4\n0 0 0 0', output: '1 1 1 1' },
    ],
    hint: { en: 'Loop with for (int &x : v) x++; The & is what makes the change stick.', bn: 'for (int &x : v) x++; দিয়ে ঘুরুন। & থাকলেই পরিবর্তন স্থায়ী হয়।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

void addOne(vector<int> &v) {
    for (int &x : v) x++;
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (auto &x : v) cin >> x;
    addOne(v);
    for (int i = 0; i < n; i++) cout << v[i] << (i + 1 < n ? " " : "\n");
    return 0;
}
`,
  },
};

export const L17: Lesson = {
  id: 'structs',
  title: { en: 'Structs and custom sorting', bn: 'স্ট্রাক্ট ও নিজস্ব সর্টিং' },
  summary: {
    en: 'Bundle several values into one object and sort objects by any rule you like.',
    bn: 'কয়েকটি মান এক অবজেক্টে বাঁধা, আর যেকোনো নিয়মে অবজেক্ট সর্ট করা।',
  },
  minutes: 20,
  toolkit: ['struct', 'sort', 'lambda'],
  blocks: [
    {
      kind: 'p',
      text: {
        en: 'A struct groups related values under one name. A student has a name and a score; a point has x and y. Instead of two parallel vectors that you must keep in the same order, you keep one vector of structs and the pieces can never get out of step.',
        bn: 'struct সম্পর্কিত মানগুলোকে এক নামে গুছিয়ে রাখে। একজন শিক্ষার্থীর নাম আর নম্বর আছে; একটি বিন্দুর x আর y আছে। একই ক্রমে রাখতে হয় এমন দুটি আলাদা ভেক্টরের বদলে structs-এর একটি ভেক্টর রাখলে অংশগুলো কখনো এলোমেলো হয় না।',
      },
    },
    {
      kind: 'code',
      code: raw`#include <bits/stdc++.h>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> s = {{"bob", 80}, {"ann", 95}, {"cid", 80}};

    // highest score first; if equal, alphabetical name
    sort(s.begin(), s.end(), [](const Student &a, const Student &b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });

    for (const Student &x : s) cout << x.name << " " << x.score << "\n";
    return 0;
}
`,
    },
    { kind: 'h', text: { en: 'The comparator rule', bn: 'কম্পারেটরের নিয়ম' } },
    {
      kind: 'p',
      text: {
        en: 'The function you give to sort answers one question: "should a come before b?" Return true if yes. It must be strict: for two equal items it must return false, never true (so use < or >, never <= or >=). Break ties by checking the next field, as the code above does with the name.',
        bn: 'sort-কে যে ফাংশন দেন সেটি একটিই প্রশ্নের উত্তর দেয়: "a কি b-এর আগে আসবে?" হ্যাঁ হলে true ফেরত দিন। এটি কড়া হতে হবে: সমান দুটি বস্তুর জন্য অবশ্যই false দেবে, কখনো true নয় (তাই < বা > ব্যবহার করুন, <= বা >= নয়)। সমান হলে পরের ফিল্ড দেখে সিদ্ধান্ত নিন, যেমন ওপরের কোডে নাম দেখা হয়েছে।',
      },
    },
    {
      kind: 'warn',
      text: {
        en: 'A comparator that returns true for equal items (using <=) can crash sort or loop forever.',
        bn: 'সমান বস্তুর জন্য true দেয় এমন কম্পারেটর (<= ব্যবহার করলে) sort ক্র্যাশ করাতে বা অনন্ত লুপে ফেলতে পারে।',
      },
    },
    {
      kind: 'p',
      text: {
        en: 'For small groups you do not need a struct: pair<int,int> and tuple<int,int,int> compare field by field automatically, first element first. Use a struct when the fields deserve names.',
        bn: 'ছোট দলের জন্য struct লাগে না: pair<int,int> আর tuple<int,int,int> নিজে থেকেই ফিল্ড ধরে ধরে তুলনা করে, প্রথম উপাদান আগে। ফিল্ডগুলোর নাম থাকা দরকার হলে struct ব্যবহার করুন।',
      },
    },
  ],
  mistakes: [
    { en: 'Writing <= in a comparator.', bn: 'কম্পারেটরে <= লেখা।' },
    { en: 'Forgetting the semicolon after the closing brace of a struct.', bn: 'struct-এর বন্ধ-ব্রেসের পরে সেমিকোলন ভুলে যাওয়া।' },
    { en: 'Comparing only the first field and leaving the order of ties random.', bn: 'শুধু প্রথম ফিল্ড তুলনা করে সমানদের ক্রম এলোমেলো রেখে দেওয়া।' },
    { en: 'Taking the comparator arguments by value, which copies strings every comparison. Use const T &.', bn: 'কম্পারেটরের আর্গুমেন্ট মান দিয়ে নেওয়া, যাতে প্রতি তুলনায় স্ট্রিং কপি হয়। const T & ব্যবহার করুন।' },
  ],
  exercise: {
    prompt: {
      en: 'Read n, then n lines each with a name and an integer score. Print the names, one per line, ordered by score from high to low; when scores are equal, alphabetically.',
      bn: 'n পড়ুন, তারপর n লাইন, প্রতিটিতে একটি নাম ও পূর্ণসংখ্যা নম্বর। নামগুলো নম্বর বেশি থেকে কম ক্রমে, প্রতি লাইনে একটি করে প্রিন্ট করুন; নম্বর সমান হলে বর্ণানুক্রমে।',
    },
    starter: raw`#include <bits/stdc++.h>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> s(n);
    for (auto &x : s) cin >> x.name >> x.score;
    // sort with a comparator, then print the names

    return 0;
}
`,
    tests: [
      { input: '3\nbob 90\nann 90\ncid 95', output: 'cid\nann\nbob' },
      { input: '1\nzed 5', output: 'zed' },
      { input: '4\nd 1\nc 2\nb 2\na 3', output: 'a\nb\nc\nd' },
    ],
    hint: { en: 'Use the lambda from the lesson. Compare score with > first, and only if equal compare names with <.', bn: 'পাঠের ল্যাম্বডাটি ব্যবহার করুন। আগে নম্বর > দিয়ে তুলনা করুন, সমান হলে তবেই নাম < দিয়ে।' },
    solution: raw`#include <bits/stdc++.h>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> s(n);
    for (auto &x : s) cin >> x.name >> x.score;
    sort(s.begin(), s.end(), [](const Student &a, const Student &b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (const Student &x : s) cout << x.name << "\n";
    return 0;
}
`,
  },
};
