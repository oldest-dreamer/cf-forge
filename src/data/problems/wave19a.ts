import { mk } from './mk.ts';

const raw = String.raw;


export const p727B = mk({
  "id": "727B",
  "name": "Bill Total Value",
  "rating": 1600,
  "tags": [
    "parsing",
    "implementation",
    "strings"
  ],
  "why": [
    "Reading prices with dots as both thousand separators and the cents separator is pure format parsing, and printing the total back needs the same care.",
    "দাম পড়া, যেখানে ডট একই সাথে হাজারের বিভাজক ও সেন্টের বিভাজক, খাঁটি ফরম্যাট পার্সিং; যোগফল ফিরিয়ে ছাপাতেও একই যত্ন লাগে।"
  ],
  "statement": [
    "A bill is one string: item names (lowercase letters) each immediately followed by a price, with no separators between them. A price is written with dots after every group of three digits of the whole-dollar part. If cents are present they come last as a dot and exactly two digits; if the cents are zero they are left out. Sum all prices and print the total in the same format.",
    "একটি বিল একটিই স্ট্রিং: পণ্যের নাম (ছোট হাতের অক্ষর), প্রতিটির ঠিক পরে দাম, মাঝে কোনো বিভাজক নেই। দামে পূর্ণ ডলার অংশের প্রতি তিন অঙ্কের গ্রুপের পরে ডট বসে। সেন্ট থাকলে তা শেষে একটি ডট ও ঠিক দুই অঙ্ক হিসেবে আসে; সেন্ট শূন্য হলে বাদ থাকে। সব দামের যোগফল একই ফরম্যাটে ছাপুন।"
  ],
  "input": [
    "One string, at most 1000 characters, a valid bill.",
    "একটি স্ট্রিং, সর্বোচ্চ ১০০০ অক্ষর, একটি বৈধ বিল।"
  ],
  "output": [
    "The total price, formatted like the prices in the bill.",
    "মোট দাম, বিলের দামের মতো ফরম্যাটে।"
  ],
  "limits": {
    "timeSec": 1,
    "memoryMb": 256,
    "notes": [
      [
        "Every price is positive and below 10⁶ dollars.",
        "প্রতিটি দাম ধনাত্মক এবং ১০⁶ ডলারের কম।"
      ],
      [
        "No leading zeros, except a lone “0” before the cents.",
        "শুরুতে শূন্য নেই, শুধু সেন্টের আগে একটি “0” ছাড়া।"
      ]
    ]
  },
  "samples": [
    {
      "input": "chipsy48.32televizor12.390",
      "output": "12.438.32",
      "explain": [
        "48.32 is 48 dollars 32 cents; 12.390 is 12390 dollars. The total is 12438.32.",
        "48.32 মানে ৪৮ ডলার ৩২ সেন্ট; 12.390 মানে ১২৩৯০ ডলার। মোট ১২৪৩৮.৩২।"
      ]
    },
    {
      "input": "a1b2c3.38",
      "output": "6.38",
      "explain": [
        "1 + 2 + 3.38 = 6.38.",
        "১ + ২ + ৩.৩৮ = ৬.৩৮।"
      ]
    },
    {
      "input": "aa0.01t0.03",
      "output": "0.04",
      "explain": [
        "Cents only: 1 + 3 = 4 cents, written 0.04.",
        "শুধু সেন্ট: ১ + ৩ = ৪ সেন্ট, লেখা হয় 0.04।"
      ]
    }
  ],
  "observation": [
    "A dot followed by exactly two digits at the very end of a price is the cents separator; every other dot is only a thousand separator. So strip dots, split off cents by that one rule, and add in cents.",
    "দামের একদম শেষে ডট ও ঠিক দুটি অঙ্ক হলে সেটাই সেন্টের বিভাজক; বাকি সব ডট শুধু হাজারের বিভাজক। তাই ডট সরান, এই এক নিয়মে সেন্ট আলাদা করুন, আর সেন্টে যোগ করুন।"
  ],
  "approach": [
    [
      "Cut the string into prices: maximal runs of digits and dots.",
      "স্ট্রিংকে দামে কাটুন: অঙ্ক ও ডটের সর্বোচ্চ ধারা।"
    ],
    [
      "In each run, if the third character from the end is a dot, the last two digits are cents.",
      "প্রতিটি ধারায় শেষ থেকে তৃতীয় অক্ষর ডট হলে শেষ দুই অঙ্ক সেন্ট।"
    ],
    [
      "Add everything as cents in a 64-bit integer.",
      "সবকিছু সেন্টে ৬৪-বিট পূর্ণসংখ্যায় যোগ করুন।"
    ],
    [
      "Print dollars with a dot before each group of three digits counted from the right, then “.” and two digits only if cents are not zero.",
      "ডলার ছাপুন ডানদিক থেকে প্রতি তিন অঙ্কের আগে ডট দিয়ে, তারপর সেন্ট শূন্য না হলেই “.” ও দুই অঙ্ক।"
    ]
  ],
  "walk": {
    "input": "chipsy48.32televizor12.390",
    "steps": [
      [
        "48.32",
        [
          "Third from the end is a dot: 48 dollars, 32 cents → 4832 cents.",
          "শেষ থেকে তৃতীয়টি ডট: ৪৮ ডলার, ৩২ সেন্ট → ৪৮৩২ সেন্ট।"
        ]
      ],
      [
        "12.390",
        [
          "Third from the end is “3”: no cents; dots removed gives 12390 dollars → 1239000 cents.",
          "শেষ থেকে তৃতীয়টি “3”: সেন্ট নেই; ডট সরিয়ে ১২৩৯০ ডলার → ১২৩৯০০০ সেন্ট।"
        ]
      ],
      [
        "total",
        [
          "1243832 cents = 12438 dollars 32 cents → 12.438.32.",
          "১২৪৩৮৩২ সেন্ট = ১২৪৩৮ ডলার ৩২ সেন্ট → 12.438.32।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(|s|)",
    "space": "O(|s|)",
    "why": [
      "One pass to split, one to print.",
      "ভাগ করতে একবার, ছাপতে একবার।"
    ]
  },
  "sols": [
    {
      "id": "scan",
      "kind": "optimal",
      "title": [
        "Manual scan",
        "হাতে স্ক্যান"
      ],
      "idea": [
        "Skip letters, take a price run, apply the “dot at position −3” rule.",
        "অক্ষর বাদ দিন, একটি দামের ধারা নিন, “−৩ অবস্থানে ডট” নিয়ম খাটান।"
      ],
      "explain": [
        [
          "The only subtle point is that “12.390” is twelve thousand three hundred ninety dollars, not 12.39 dollars: the dot is followed by three digits, so it is a thousand separator.",
          "সূক্ষ্ম জায়গা একটাই: “12.390” মানে বারো হাজার তিনশো নব্বই ডলার, ১২.৩৯ নয়: ডটের পরে তিন অঙ্ক, তাই এটি হাজারের বিভাজক।"
        ],
        [
          "Printing groups digits from the right: put a dot before index k when (length − k) is a multiple of 3.",
          "ছাপার সময় ডানদিক থেকে গ্রুপ করুন: (দৈর্ঘ্য − k) তিনের গুণিতক হলে k-এর আগে ডট বসান।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    long long cents = 0;
    size_t i = 0;
    while (i < s.size()) {
        while (i < s.size() && isalpha((unsigned char)s[i])) i++;
        size_t j = i;
        while (j < s.size() && !isalpha((unsigned char)s[j])) j++;
        string p = s.substr(i, j - i);
        i = j;
        if (p.empty()) continue;
        long long c = 0;
        if (p.size() >= 3 && p[p.size() - 3] == '.') {
            c = (p[p.size() - 2] - '0') * 10 + (p[p.size() - 1] - '0');
            p.resize(p.size() - 3);
        }
        long long d = 0;
        for (char ch : p)
            if (ch != '.') d = d * 10 + (ch - '0');
        cents += d * 100 + c;
    }
    long long d = cents / 100, c = cents % 100;
    string ds = to_string(d), out;
    for (size_t k = 0; k < ds.size(); k++) {
        if (k > 0 && (ds.size() - k) % 3 == 0) out += '.';
        out += ds[k];
    }
    if (c) {
        out += '.';
        out += char('0' + c / 10);
        out += char('0' + c % 10);
    }
    cout << out << "\n";
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "io-fast"
      ]
    },
    {
      "id": "sstream",
      "kind": "alt",
      "title": [
        "Letters to spaces + recursive grouping",
        "অক্ষর → স্পেস + রিকার্সিভ গ্রুপিং"
      ],
      "idea": [
        "Turn every letter into a space so a stringstream yields the prices; format the answer by recursion on dollars / 1000.",
        "প্রতিটি অক্ষর স্পেস করুন যাতে stringstream দামগুলো দেয়; ডলার / ১০০০-এ রিকার্শনে উত্তর সাজান।"
      ],
      "explain": [
        [
          "Same rule, different plumbing: the stringstream hands over each price, and the printer builds “group(d/1000) + . + three digits”.",
          "একই নিয়ম, ভিন্ন কাঠামো: রেজেক্স [0-9][0-9.]* প্রতিটি দাম ধরে, আর প্রিন্টার “group(d/1000) + . + তিন অঙ্ক” দিয়ে সাজায়।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    for (char& ch : s)
        if (isalpha((unsigned char)ch)) ch = ' ';  // letters become separators
    istringstream in(s);
    long long cents = 0;
    string p;
    while (in >> p) {
        // a dot followed by exactly two digits at the very end is the cents separator
        string dollars = p, cc = "00";
        if (p.size() >= 3 && p[p.size() - 3] == '.') {
            cc = p.substr(p.size() - 2);
            dollars = p.substr(0, p.size() - 3);
        }
        dollars.erase(remove(dollars.begin(), dollars.end(), '.'), dollars.end());
        cents += stoll(dollars) * 100 + stoll(cc);
    }
    // print dollars with a dot before every group of three digits, counted from the right
    function<string(long long)> group = [&](long long d) -> string {
        if (d < 1000) return to_string(d);
        char buf[8];
        snprintf(buf, sizeof buf, "%03lld", d % 1000);
        return group(d / 1000) + "." + buf;
    };
    string out = group(cents / 100);
    if (cents % 100) {
        char buf[8];
        snprintf(buf, sizeof buf, ".%02lld", cents % 100);
        out += buf;
    }
    cout << out << "\n";
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "io-basics"
      ]
    }
  ],
  "own": [
    {
      "input": "x0.01",
      "output": "0.01",
      "note": [
        "A single price below one dollar.",
        "এক ডলারের কম একটি দাম।"
      ]
    },
    {
      "input": "a999.999b0.01",
      "output": "999.999.01",
      "note": [
        "Thousand separators and cents in one price list.",
        "একই তালিকায় হাজারের বিভাজক ও সেন্ট।"
      ]
    },
    {
      "input": "a500.000b500.000",
      "output": "1.000.000",
      "note": [
        "The sum gains a digit group; no cents are printed.",
        "যোগফলে একটি নতুন গ্রুপ আসে; সেন্ট ছাপা হয় না।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Reading “12.390” as 12.39 dollars.",
      "“12.390”-কে ১২.৩৯ ডলার ধরা।"
    ],
    [
      "Printing “.00” when the cents are zero, or dropping the leading “0” of an amount under one dollar.",
      "সেন্ট শূন্য হলেও “.00” ছাপা, বা এক ডলারের কম অঙ্কের “0” বাদ দেওয়া।"
    ],
    [
      "Using double: sums of cents must be exact.",
      "double ব্যবহার: সেন্টের যোগ সঠিক হতে হবে।"
    ]
  ],
  "related": [
    {
      "id": "552E",
      "name": "Vanya and Brackets",
      "why": [
        "More parsing, with operator precedence.",
        "আরও পার্সিং, অপারেটর অগ্রাধিকারসহ।"
      ]
    }
  ],
  "toolkit": [
    "io-basics"
  ]
});

export const p778B = mk({
  "id": "778B",
  "name": "Bitwise Formula",
  "rating": 1800,
  "tags": [
    "parsing",
    "implementation",
    "bitmasks",
    "brute-force"
  ],
  "why": [
    "A tiny interpreter for a bit-formula language, then the observation that every bit position is an independent little problem.",
    "বিট-ফর্মুলা ভাষার একটি ছোট ইন্টারপ্রেটার, তারপর এই পর্যবেক্ষণ যে প্রতিটি বিট অবস্থান আলাদা ছোট সমস্যা।"
  ],
  "statement": [
    "There are n variables, each holding an m-bit number, defined one per line in order. A definition is either a constant bit string, or “operand OP operand” where OP is AND, OR or XOR and each operand is an earlier variable or “?”, the m-bit number Peter will choose. Choose Peter’s number so that the sum of all n variables is as small as possible, and again so that it is as large as possible. If several numbers tie, print the smallest.",
    "n টি চলক, প্রতিটি m-বিট সংখ্যা, ক্রমানুসারে প্রতি লাইনে সংজ্ঞায়িত। সংজ্ঞা হয় একটি ধ্রুবক বিট স্ট্রিং, নয়তো “operand OP operand”, যেখানে OP হলো AND, OR বা XOR আর প্রতিটি operand আগের কোনো চলক অথবা “?”, অর্থাৎ পিটারের বেছে নেওয়া m-বিট সংখ্যা। পিটারের সংখ্যা এমনভাবে বাছুন যাতে সব চলকের যোগফল সবচেয়ে ছোট হয়, আর আলাদাভাবে সবচেয়ে বড় হয়। একাধিক সংখ্যায় সমান হলে ছোটটি ছাপুন।"
  ],
  "input": [
    "n and m, then n lines “name := binary” or “name := a OP b”.",
    "n ও m, তারপর n লাইন “name := binary” বা “name := a OP b”।"
  ],
  "output": [
    "Two m-bit strings: Peter’s number for the minimum sum, then for the maximum sum.",
    "দুটি m-বিট স্ট্রিং: ন্যূনতম যোগফলের জন্য পিটারের সংখ্যা, তারপর সর্বোচ্চ যোগফলের জন্য।"
  ],
  "limits": {
    "timeSec": 1,
    "memoryMb": 256,
    "notes": [
      [
        "1 ≤ n ≤ 5000, 1 ≤ m ≤ 1000",
        "১ ≤ n ≤ ৫০০০, ১ ≤ m ≤ ১০০০"
      ],
      [
        "Names are lowercase letters; operands always refer to earlier lines.",
        "নাম ছোট হাতের অক্ষর; operand সবসময় আগের লাইনের।"
      ]
    ]
  },
  "samples": [
    {
      "input": "3 3\na := 101\nb := 011\nc := ? XOR b",
      "output": "011\n100",
      "explain": [
        "Bit 3 (rightmost) of the sum: a and b contribute 1 + 1, and c = ? XOR 1. The sum only counts ones per column, so each column picks its own best bit.",
        "ডানের বিটে a ও b মিলে ১ + ১, আর c = ? XOR ১। যোগফল শুধু প্রতি কলামের এক গুনে, তাই প্রতিটি কলাম নিজের সেরা বিট বাছে।"
      ]
    },
    {
      "input": "5 1\na := 1\nbb := 0\ncx := ? OR a\nd := ? XOR ?\ne := d AND bb",
      "output": "0\n0",
      "explain": [
        "With 1 bit: cx is always 1 and d is always 0, so ? never changes the sum; ties go to the smaller number, 0.",
        "১ বিটে: cx সবসময় ১, d সবসময় ০, তাই ? যোগফল বদলায় না; সমান হলে ছোটটি, ০।"
      ]
    }
  ],
  "observation": [
    "Every operation is bitwise, so bit k of every variable depends only on bit k of “?”. The sum is the total number of ones over all columns, and columns never interact: decide each bit of Peter’s number alone.",
    "প্রতিটি ক্রিয়া বিটওয়াইজ, তাই প্রতিটি চলকের k-তম বিট শুধু “?”-এর k-তম বিটের উপর নির্ভর করে। যোগফল সব কলামের এক-এর মোট সংখ্যা, কলামগুলো পরস্পরকে প্রভাবিত করে না: পিটারের সংখ্যার প্রতিটি বিট আলাদাভাবে ঠিক করুন।"
  ],
  "approach": [
    [
      "For a column, evaluate all n variables twice: once with ? = 0, once with ? = 1, counting the ones.",
      "একটি কলামে সব n চলক দুবার হিসাব করুন: একবার ? = ০, একবার ? = ১, এক গুনুন।"
    ],
    [
      "For the minimum take the bit with fewer ones; for the maximum, the bit with more; on a tie take 0.",
      "ন্যূনতমের জন্য কম এক-এর বিট; সর্বোচ্চের জন্য বেশি এক-এর বিট; সমান হলে ০।"
    ],
    [
      "That is O(n · m) work. Choosing 0 on ties makes the whole number smallest, since each bit is chosen independently.",
      "কাজ O(n · m)। সমানে ০ নেওয়ায় পুরো সংখ্যা ছোটতম, কারণ প্রতিটি বিট স্বাধীন।"
    ]
  ],
  "walk": {
    "input": "3 3\na := 101\nb := 011\nc := ? XOR b",
    "steps": [
      [
        "column 1",
        [
          "a=1, b=0: with ?=0, c=0 → 1 one; with ?=1, c=1 → 2 ones. Min takes 0, max takes 1.",
          "a=১, b=০: ?=০ হলে c=০ → ১টি এক; ?=১ হলে c=১ → ২টি এক। ন্যূনতমে ০, সর্বোচ্চে ১।"
        ]
      ],
      [
        "column 2",
        [
          "a=0, b=1: ?=0 gives c=1 → 2 ones; ?=1 gives c=0 → 1 one. Min takes 1, max takes 0.",
          "a=০, b=১: ?=০ হলে c=১ → ২টি; ?=১ হলে c=০ → ১টি। ন্যূনতমে ১, সর্বোচ্চে ০।"
        ]
      ],
      [
        "column 3",
        [
          "a=1, b=1: ?=0 gives c=1 → 3 ones; ?=1 gives c=0 → 2 ones. Min takes 1, max takes 0. So min = 011, max = 100.",
          "a=১, b=১: ?=০ হলে c=১ → ৩টি; ?=১ হলে c=০ → ২টি। ন্যূনতমে ১, সর্বোচ্চে ০। অতএব ন্যূনতম 011, সর্বোচ্চ 100।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n · m)",
    "space": "O(n)",
    "why": [
      "Two evaluations of n variables for each of m columns: 2 · 5000 · 1000 = 10⁷ steps.",
      "m কলামের প্রতিটিতে n চলকের দুবার হিসাব: ২ · ৫০০০ · ১০০০ = ১০⁷ ধাপ।"
    ]
  },
  "sols": [
    {
      "id": "columns",
      "kind": "optimal",
      "title": [
        "Column by column",
        "কলামে কলামে"
      ],
      "idea": [
        "For each bit position evaluate the whole program for ? = 0 and ? = 1.",
        "প্রতিটি বিট অবস্থানে ? = ০ ও ? = ১ ধরে পুরো প্রোগ্রাম হিসাব করুন।"
      ],
      "explain": [
        [
          "Parse once into (left, right, op) triples. Then for each column, loop over the variables in order; each value only needs the values of earlier variables, so a flat array suffices.",
          "একবার (বাম, ডান, op) তিনটিতে পার্স করুন। তারপর প্রতি কলামে চলকগুলো ক্রমে ঘুরুন; প্রতিটি মান শুধু আগের চলকের মান চায়, তাই একটি সমতল অ্যারেই যথেষ্ট।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    // each variable: constant bits, or (a, op, b); index -1 means "?"
    vector<string> cst(n);
    vector<int> A(n, -2), B(n, -2), op(n, 0);
    unordered_map<string, int> id;
    for (int i = 0; i < n; i++) {
        string name, assign, x;
        cin >> name >> assign >> x;
        id[name] = i;
        if (x[0] == '0' || x[0] == '1') {
            cst[i] = x;
            continue;
        }
        string o, y;
        cin >> o >> y;
        A[i] = x == "?" ? -1 : id[x];
        B[i] = y == "?" ? -1 : id[y];
        op[i] = o == "AND" ? 0 : o == "OR" ? 1 : 2;
    }
    string mn(m, '0'), mx(m, '0');
    vector<char> val(n);
    for (int b = 0; b < m; b++) {
        int ones[2];
        for (int q = 0; q < 2; q++) {  // Peter's bit = q
            int cnt = 0;
            for (int i = 0; i < n; i++) {
                if (A[i] == -2) {
                    val[i] = cst[i][b] - '0';
                } else {
                    int x = A[i] < 0 ? q : val[A[i]];
                    int y = B[i] < 0 ? q : val[B[i]];
                    val[i] = op[i] == 0 ? (x & y) : op[i] == 1 ? (x | y) : (x ^ y);
                }
                cnt += val[i];
            }
            ones[q] = cnt;
        }
        if (ones[1] < ones[0]) mn[b] = '1';  // ties keep 0: that gives the smaller number
        if (ones[1] > ones[0]) mx[b] = '1';
    }
    cout << mn << "\n" << mx << "\n";
}
`,
      "time": "O(n·m)",
      "space": "O(n)",
      "toolkit": [
        "io-fast"
      ]
    },
    {
      "id": "bitset",
      "kind": "better",
      "title": [
        "One bitset per variable",
        "চলক প্রতি একটি bitset"
      ],
      "idea": [
        "Evaluate all columns at once with bitset AND / OR / XOR, for ? = all zeros and ? = all ones.",
        "bitset-এর AND / OR / XOR দিয়ে সব কলাম একসাথে হিসাব করুন, ? = সব শূন্য ও ? = সব এক ধরে।"
      ],
      "explain": [
        [
          "Because operations are bitwise, a whole variable is one bitset<1000>. Two bitsets per variable (for the two choices of ?) give the per-column counts at the end.",
          "ক্রিয়াগুলো বিটওয়াইজ, তাই একটি পুরো চলক একটি bitset<1000>। প্রতি চলকে দুটি bitset (? এর দুই পছন্দে) শেষে কলাম-ভিত্তিক গণনা দেয়।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// All m bits at once: every variable is a bitset, evaluated for ? = all zeros and ? = all ones.
const int M = 1000;
typedef bitset<M> B;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    cin >> n >> m;
    vector<B> v0(n), v1(n);
    B all;
    for (int i = 0; i < m; i++) all[i] = 1;
    unordered_map<string, int> id;
    vector<int> cnt0(m, 0), cnt1(m, 0);
    auto get = [&](const string& x, int q) -> B {
        if (x == "?") return q ? all : B();
        return q ? v1[id[x]] : v0[id[x]];
    };
    for (int i = 0; i < n; i++) {
        string name, assign, x;
        cin >> name >> assign >> x;
        id[name] = i;
        if (x[0] == '0' || x[0] == '1') {
            B c;
            for (int b = 0; b < m; b++) c[b] = x[b] == '1';
            v0[i] = v1[i] = c;
        } else {
            string o, y;
            cin >> o >> y;
            for (int q = 0; q < 2; q++) {
                B a = get(x, q), b = get(y, q);
                B r = o == "AND" ? (a & b) : o == "OR" ? (a | b) : (a ^ b);
                (q ? v1 : v0)[i] = r;
            }
        }
        for (int b = 0; b < m; b++) {
            cnt0[b] += v0[i][b];
            cnt1[b] += v1[i][b];
        }
    }
    string mn(m, '0'), mx(m, '0');
    for (int b = 0; b < m; b++) {
        if (cnt1[b] < cnt0[b]) mn[b] = '1';
        if (cnt1[b] > cnt0[b]) mx[b] = '1';
    }
    cout << mn << "\n" << mx << "\n";
}
`,
      "time": "O(n·m/64 + n·m)",
      "space": "O(n·m/64)",
      "toolkit": [
        "bitwise-and"
      ]
    },
    {
      "id": "brute",
      "kind": "brute",
      "title": [
        "Try every Peter number",
        "পিটারের প্রতিটি সংখ্যা চেষ্টা"
      ],
      "idea": [
        "Enumerate all 2^m values of ?, evaluate, keep the first best.",
        "সব ২^m টি ? এর মান দেখুন, হিসাব করুন, প্রথম সেরাটি রাখুন।"
      ],
      "explain": [
        [
          "Correct but exponential in m; useful only as a reference for small m. Scanning values in increasing order and updating only on strict improvement gives the smallest number on ties.",
          "সঠিক, কিন্তু m-এ সূচকীয়; ছোট m-এ রেফারেন্স হিসেবেই কাজের। মান ছোট থেকে বড় ক্রমে দেখে শুধু কঠোর উন্নতিতে বদলালে সমানে ছোট সংখ্যা মেলে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Try every Peter number (m is tiny) and keep the first best one.
int main() {
    int n, m;
    cin >> n >> m;
    struct V { string c, a, o, b; };
    vector<V> vs(n);
    unordered_map<string, int> id;
    for (int i = 0; i < n; i++) {
        string name, as, x;
        cin >> name >> as >> x;
        id[name] = i;
        vs[i].a = x;
        if (x[0] == '0' || x[0] == '1') { vs[i].c = x; continue; }
        cin >> vs[i].o >> vs[i].b;
    }
    long long bestMin = LLONG_MAX, bestMax = -1;
    int argMin = 0, argMax = 0;
    for (int q = 0; q < (1 << m); q++) {
        string pq;
        for (int b = m - 1; b >= 0; b--) pq += char('0' + ((q >> b) & 1));
        vector<string> val(n);
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            if (!vs[i].c.empty()) val[i] = vs[i].c;
            else {
                string x = vs[i].a == "?" ? pq : val[id[vs[i].a]];
                string y = vs[i].b == "?" ? pq : val[id[vs[i].b]];
                string r(m, '0');
                for (int b = 0; b < m; b++) {
                    int p = x[b] - '0', s = y[b] - '0';
                    r[b] = char('0' + (vs[i].o == "AND" ? (p & s) : vs[i].o == "OR" ? (p | s) : (p ^ s)));
                }
                val[i] = r;
            }
            for (char ch : val[i]) sum += ch - '0';
        }
        if (sum < bestMin) { bestMin = sum; argMin = q; }
        if (sum > bestMax) { bestMax = sum; argMax = q; }
    }
    auto bits = [&](int q) { string s; for (int b = m - 1; b >= 0; b--) s += char('0' + ((q >> b) & 1)); return s; };
    cout << bits(argMin) << "\n" << bits(argMax) << "\n";
}
`,
      "time": "O(2^m · n · m)",
      "space": "O(n·m)",
      "accepted": false,
      "toolkit": [
        "bitwise-and"
      ]
    }
  ],
  "own": [
    {
      "input": "1 3\na := 101",
      "output": "000\n000",
      "note": [
        "No “?” at all: both answers are 000.",
        "“?” নেই: দুটি উত্তরই 000।"
      ]
    },
    {
      "input": "2 4\na := ? AND ?\nb := a XOR ?",
      "output": "0000\n1111",
      "note": [
        "“?” used twice in one formula, and a variable reused later.",
        "একটি সূত্রে “?” দুবার, এবং একটি চলক পরে আবার ব্যবহার।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Choosing 1 on ties for the minimum: the problem wants the smallest number among equal sums.",
      "সমানে ন্যূনতমে ১ বাছা: সমান যোগফলে ছোট সংখ্যা চাওয়া হয়েছে।"
    ],
    [
      "Treating a constant as an operand; constants only appear alone on the right of :=.",
      "ধ্রুবককে operand ধরা; ধ্রুবক শুধু := এর ডানে একা আসে।"
    ],
    [
      "Looking up a variable name before it is defined; operands always point backwards, so a map filled as you read works.",
      "সংজ্ঞার আগে নাম খোঁজা; operand সবসময় পেছনে নির্দেশ করে, তাই পড়ার সাথে ভরা map-ই চলে।"
    ]
  ],
  "related": [
    {
      "id": "552E",
      "name": "Vanya and Brackets",
      "why": [
        "Evaluate an expression you first have to parse.",
        "যে এক্সপ্রেশন আগে পার্স করতে হয় তার মান বের করা।"
      ]
    }
  ],
  "toolkit": [
    "bitwise-and",
    "io-fast"
  ]
});

export const p195C = mk({
  "id": "195C",
  "name": "Try and Catch",
  "rating": 1800,
  "tags": [
    "parsing",
    "implementation"
  ],
  "why": [
    "A mini-language with try / catch / throw: matching blocks with a stack and noticing that a handler must start before the throw and sit after it.",
    "try / catch / throw সহ একটি মিনি-ভাষা: স্ট্যাকে ব্লক মেলানো, আর খেয়াল করা যে হ্যান্ডলারের try থ্রো-র আগে শুরু হবে আর catch থ্রো-র পরে থাকবে।"
  ],
  "statement": [
    "A program has one operator per line (spaces anywhere, empty lines allowed): “try”, “throw ( type )” and “catch ( type , \"message\" )”. Every catch closes the nearest still-open try. There is at most one throw. When it runs, control goes to the first catch that follows it, belongs to a try that was opened before the throw, and has the same type. Print that catch’s message (without quotes), or “Unhandled Exception” if there is none.",
    "প্রোগ্রামে প্রতি লাইনে একটি অপারেটর (যেকোনো জায়গায় স্পেস, ফাঁকা লাইন চলে): “try”, “throw ( type )” আর “catch ( type , \"message\" )”। প্রতিটি catch সবচেয়ে কাছের এখনও খোলা try বন্ধ করে। সর্বোচ্চ একটি throw আছে। এটি চললে নিয়ন্ত্রণ যায় তার পরের প্রথম সেই catch-এ, যার try থ্রো-র আগে খোলা হয়েছে এবং যার type একই। সেই catch-এর বার্তা (উদ্ধৃতি চিহ্ন ছাড়া) ছাপুন, না থাকলে “Unhandled Exception”।"
  ],
  "input": [
    "n, then n lines of the program.",
    "n, তারপর প্রোগ্রামের n লাইন।"
  ],
  "output": [
    "The message, or Unhandled Exception.",
    "বার্তা, অথবা Unhandled Exception।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "n ≤ 10⁵; the program is valid (every catch has a try).",
        "n ≤ ১০⁵; প্রোগ্রাম বৈধ (প্রতিটি catch-এর একটি try আছে)।"
      ],
      [
        "Types are short words; a message has no quote character inside.",
        "type ছোট শব্দ; বার্তার ভেতরে উদ্ধৃতি চিহ্ন নেই।"
      ]
    ]
  },
  "samples": [
    {
      "input": "8\ntry\n    try\n        throw ( AE ) \n    catch ( BE, \"BE in line 3\")\n\n    try\n    catch(AE, \"AE in line 5\") \ncatch(AE,\"AE somewhere\")",
      "output": "AE somewhere",
      "explain": [
        "The throw is on line 3. The first catch after it has type BE, no match. The next catch (line 7) belongs to a try opened on line 6, after the throw, so it cannot handle it. The last catch, type AE, closes the try of line 1, which was open at the throw.",
        "throw তৃতীয় লাইনে। এর পরের প্রথম catch-এর type BE, মেলে না। পরের catch (৭ নম্বর) ৬ নম্বর লাইনে খোলা try-এর, যা throw-র পরে, তাই সামলাতে পারে না। শেষ catch, type AE, ১ নম্বর লাইনের try বন্ধ করে, যা throw-র সময় খোলা ছিল।"
      ]
    }
  ],
  "observation": [
    "Pair every catch with its try using a stack of try line numbers. A catch can handle the throw only if its try line is smaller than the throw line and it comes later in the text; the first such catch with a matching type wins.",
    "try লাইন নম্বরের স্ট্যাক দিয়ে প্রতিটি catch-কে তার try-র সাথে জোড়ুন। একটি catch থ্রো সামলাতে পারে কেবল যদি তার try-র লাইন থ্রো-র লাইনের ছোট হয় এবং সে লেখায় পরে থাকে; এমন প্রথম type-মেলা catch জেতে।"
  ],
  "approach": [
    [
      "Read line by line (use getline, as the lines hold spaces) and trim.",
      "লাইন ধরে ধরে পড়ুন (স্পেস থাকায় getline), এবং ট্রিম করুন।"
    ],
    [
      "“try”: push the line number. “throw”: remember its line and type. “catch”: pop a try number.",
      "“try”: লাইন নম্বর পুশ। “throw”: তার লাইন ও type মনে রাখুন। “catch”: একটি try নম্বর পপ।"
    ],
    [
      "At a catch, if a throw has happened, its popped try number is below the throw line, and the type matches, print the message and stop.",
      "catch-এ throw ঘটে গেছে, পপ করা try নম্বর throw-র লাইনের নিচে, এবং type মেলে হলে বার্তা ছাপে থামুন।"
    ]
  ],
  "walk": {
    "input": "8\ntry\n    try\n        throw ( AE ) \n    catch ( BE, \"BE in line 3\")\n\n    try\n    catch(AE, \"AE in line 5\") \ncatch(AE,\"AE somewhere\")",
    "steps": [
      [
        "stack 1,2",
        [
          "Lines 1 and 2 push their numbers; line 3 throws AE.",
          "১ ও ২ লাইন নম্বর পুশ করে; ৩ নম্বর AE থ্রো করে।"
        ]
      ],
      [
        "line 4",
        [
          "catch(BE) pops try 2 (< 3) but BE ≠ AE: skip.",
          "catch(BE) try ২ পপ করে (< ৩) কিন্তু BE ≠ AE: বাদ।"
        ]
      ],
      [
        "lines 6-7",
        [
          "Line 6 pushes 6; line 7 pops 6, which is > 3: it started after the throw, skip.",
          "৬ নম্বর ৬ পুশ করে; ৭ নম্বর ৬ পপ করে, যা > ৩: throw-র পরে শুরু, বাদ।"
        ]
      ],
      [
        "line 8",
        [
          "catch(AE) pops try 1 (< 3) and AE matches: print “AE somewhere”.",
          "catch(AE) try ১ পপ করে (< ৩), AE মেলে: “AE somewhere” ছাপুন।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n)",
    "space": "O(n)",
    "why": [
      "One pass with a stack.",
      "স্ট্যাক নিয়ে একবার যাওয়া।"
    ]
  },
  "sols": [
    {
      "id": "stack",
      "kind": "optimal",
      "title": [
        "One pass with a stack",
        "স্ট্যাকসহ এক পাস"
      ],
      "idea": [
        "Push on try, pop on catch, compare the popped line with the throw line.",
        "try-তে পুশ, catch-এ পপ, পপ করা লাইনকে throw-র লাইনের সাথে তুলনা।"
      ],
      "explain": [
        [
          "The stack must be popped on every catch, even before the throw, otherwise later catches pair with the wrong try.",
          "প্রতিটি catch-এ স্ট্যাক পপ করতেই হবে, throw-র আগেও, নইলে পরের catch ভুল try-র সাথে জোড়া লাগে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

static string trim(const string& s) {
    size_t a = s.find_first_not_of(" \t\r"), b = s.find_last_not_of(" \t\r");
    return a == string::npos ? "" : s.substr(a, b - a + 1);
}

int main() {
    int n;
    string line;
    getline(cin, line);
    n = stoi(line);
    vector<int> tries;  // line numbers of try blocks that are still open
    int throwLine = -1;
    string type;
    for (int i = 0; i < n; i++) {
        getline(cin, line);
        string t = trim(line);
        if (t.empty()) continue;
        if (t.compare(0, 3, "try") == 0) {
            tries.push_back(i);
        } else if (t.compare(0, 5, "throw") == 0) {
            size_t l = t.find('('), r = t.find(')');
            type = trim(t.substr(l + 1, r - l - 1));
            throwLine = i;
        } else {  // catch ( type , "message" )
            int opened = tries.back();
            tries.pop_back();
            if (throwLine < 0 || opened > throwLine) continue;
            size_t l = t.find('('), c = t.find(',');
            string ty = trim(t.substr(l + 1, c - l - 1));
            if (ty != type) continue;
            size_t q1 = t.find('"'), q2 = t.find('"', q1 + 1);
            cout << t.substr(q1 + 1, q2 - q1 - 1) << "\n";
            return 0;
        }
    }
    cout << "Unhandled Exception\n";
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "io-basics"
      ]
    },
    {
      "id": "two-pass",
      "kind": "alt",
      "title": [
        "Pair first, then scan",
        "আগে জোড়, তারপর স্ক্যান"
      ],
      "idea": [
        "Pass 1 records the try line of every catch; pass 2 scans catches after the throw.",
        "প্রথম পাসে প্রতিটি catch-এর try-লাইন লেখা; দ্বিতীয় পাসে throw-র পরের catch-গুলো স্ক্যান।"
      ],
      "explain": [
        [
          "Equivalent to the one-pass version, but it separates “which try does this catch close” from “who handles the throw”, which makes each part easy to check.",
          "এক-পাস সংস্করণের সমতুল্য, কিন্তু “এই catch কোন try বন্ধ করে” ও “কে throw সামলায়” আলাদা করায় প্রতিটি অংশ যাচাই সহজ।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

static string trim(const string& s) {
    size_t a = s.find_first_not_of(" \t\r"), b = s.find_last_not_of(" \t\r");
    return a == string::npos ? "" : s.substr(a, b - a + 1);
}

// Pass 1 pairs every catch with its try. Pass 2 looks for the first catch after the throw
// whose try started before the throw and whose type fits.
int main() {
    string line;
    getline(cin, line);
    int n = stoi(line);
    vector<string> L(n);
    for (auto& s : L) {
        getline(cin, s);
        s = trim(s);
    }
    vector<int> tryOf(n, -1), st;
    int th = -1;
    string type;
    for (int i = 0; i < n; i++) {
        if (L[i].compare(0, 3, "try") == 0) st.push_back(i);
        else if (L[i].compare(0, 5, "catch") == 0) { tryOf[i] = st.back(); st.pop_back(); }
        else if (L[i].compare(0, 5, "throw") == 0) {
            th = i;
            size_t l = L[i].find('('), r = L[i].find(')');
            type = trim(L[i].substr(l + 1, r - l - 1));
        }
    }
    for (int i = th + 1; th >= 0 && i < n; i++) {
        if (tryOf[i] < 0 || tryOf[i] > th) continue;
        size_t l = L[i].find('('), c = L[i].find(',');
        if (trim(L[i].substr(l + 1, c - l - 1)) != type) continue;
        size_t q1 = L[i].find('"'), q2 = L[i].find('"', q1 + 1);
        cout << L[i].substr(q1 + 1, q2 - q1 - 1) << "\n";
        return 0;
    }
    cout << "Unhandled Exception\n";
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "io-basics"
      ]
    }
  ],
  "own": [
    {
      "input": "2\ntry\ncatch(A,\"x y\")",
      "output": "Unhandled Exception",
      "note": [
        "No throw at all.",
        "কোনো throw নেই।"
      ]
    },
    {
      "input": "3\ntry\n throw(A)\ncatch ( B , \"no\" )\n",
      "output": "Unhandled Exception",
      "note": [
        "The only catch has the wrong type.",
        "একমাত্র catch-এর type ভুল।"
      ]
    },
    {
      "input": "5\ntry\ncatch(A,\"early\")\ntry\nthrow(A)\ncatch(A,\"late ok\")",
      "output": "late ok",
      "note": [
        "A handler that closed before the throw must not count.",
        "throw-র আগে বন্ধ হওয়া হ্যান্ডলার গণ্য নয়।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Not popping the stack for catches that precede the throw.",
      "throw-র আগের catch-এ স্ট্যাক পপ না করা।"
    ],
    [
      "Splitting on spaces: the message may contain spaces, so cut between the quotes.",
      "স্পেসে ভাঙা: বার্তায় স্পেস থাকতে পারে, তাই উদ্ধৃতি চিহ্নের মাঝখান থেকে কাটুন।"
    ],
    [
      "Reading with cin >> and losing line boundaries; use getline.",
      "cin >> দিয়ে পড়ে লাইনের সীমা হারানো; getline ব্যবহার করুন।"
    ]
  ],
  "related": [
    {
      "id": "190C",
      "name": "STL",
      "why": [
        "Another stack-based reading of a tiny language.",
        "ছোট একটি ভাষার আরেকটি স্ট্যাক-ভিত্তিক পাঠ।"
      ]
    }
  ],
  "toolkit": [
    "io-basics"
  ]
});

export const p51B = mk({
  "id": "51B",
  "name": "bHTML Tables Analisys",
  "rating": 1700,
  "tags": [
    "parsing",
    "dfs",
    "implementation"
  ],
  "why": [
    "Nested tags are a bracket sequence in disguise: a stack of counters answers “how many cells does each table have”.",
    "নেস্টেড ট্যাগ আসলে ছদ্মবেশী বন্ধনী ক্রম: কাউন্টারের স্ট্যাক বলে দেয় “প্রতিটি টেবিলে কয়টি ঘর”।"
  ],
  "statement": [
    "A page is built only from <table>, </table>, <tr>, </tr>, <td> and </td>. A table holds one or more rows, a row holds one or more cells, and a cell is either empty or contains exactly one whole table. The text was cut into lines at arbitrary places, even inside a tag, and must be glued back with nothing in between. Print the number of cells of every table (nested ones included), in non-decreasing order.",
    "একটি পেজ শুধু <table>, </table>, <tr>, </tr>, <td> ও </td> দিয়ে গড়া। টেবিলে এক বা একাধিক সারি, সারিতে এক বা একাধিক ঘর, আর ঘর হয় ফাঁকা নয়তো ঠিক একটি পূর্ণ টেবিল ধারণ করে। লেখাটি যেকোনো জায়গায় লাইনে কাটা, ট্যাগের ভেতরেও, এবং মাঝে কিছু না দিয়ে জোড়া লাগাতে হবে। প্রতিটি টেবিলের ঘরের সংখ্যা (নেস্টেডসহ) অ-হ্রাসমান ক্রমে ছাপুন।"
  ],
  "input": [
    "Several lines whose concatenation is a single table; the total length is at most 5000.",
    "কয়েকটি লাইন, যাদের জোড়া একটি টেবিল; মোট দৈর্ঘ্য সর্বোচ্চ ৫০০০।"
  ],
  "output": [
    "The cell counts of all tables, separated by spaces, sorted ascending.",
    "সব টেবিলের ঘরের সংখ্যা, স্পেসে আলাদা, ছোট থেকে বড় ক্রমে।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "Lines contain no spaces; tags are lowercase and exactly as written above.",
        "লাইনে স্পেস নেই; ট্যাগ ছোট হাতের এবং ঠিক উপরের মতো।"
      ]
    ]
  },
  "samples": [
    {
      "input": "<table><tr><td></td></tr></table>",
      "output": "1",
      "explain": [
        "One table with one cell.",
        "একটি টেবিল, একটি ঘর।"
      ]
    },
    {
      "input": "<table>\n<tr>\n<td>\n<table><tr><td></td></tr><tr><td></\ntd\n></tr><tr\n><td></td></tr><tr><td></td></tr></table>\n</td>\n</tr>\n</table>",
      "output": "1 4",
      "explain": [
        "After gluing the lines, the outer table has one cell, which holds an inner table with four cells (one per row).",
        "লাইন জোড়ার পরে বাইরের টেবিলে একটি ঘর, যার ভেতরে চার ঘরের (সারি প্রতি একটি) একটি টেবিল।"
      ]
    }
  ],
  "observation": [
    "Only two things matter: <table> opens a new counter and </table> closes it; every <td> adds one to the innermost open table. A stack of counters is enough, and the finished counters are the answer.",
    "শুধু দুটি জিনিস গুরুত্বপূর্ণ: <table> নতুন কাউন্টার খোলে, </table> তা বন্ধ করে; প্রতিটি <td> সবচেয়ে ভেতরের খোলা টেবিলে এক যোগ করে। কাউন্টারের স্ট্যাকই যথেষ্ট, আর শেষ হওয়া কাউন্টারগুলোই উত্তর।"
  ],
  "approach": [
    [
      "Read every token with cin >> and append it to one string; that removes line breaks, even those inside tags.",
      "প্রতিটি টোকেন cin >> দিয়ে পড়ে একটি স্ট্রিংয়ে জুড়ুন; এতে ট্যাগের ভেতরের সহ সব লাইন-ভাঙা চলে যায়।"
    ],
    [
      "Walk the string tag by tag (from “<” to the next “>”).",
      "স্ট্রিং ট্যাগ ধরে ধরে হাঁটুন (“<” থেকে পরের “>” পর্যন্ত)।"
    ],
    [
      "<table>: push 0. <td>: increment the top. </table>: pop, store.",
      "<table>: ০ পুশ। <td>: টপ বাড়ান। </table>: পপ করে রাখুন।"
    ],
    [
      "Sort and print.",
      "সাজিয়ে ছাপুন।"
    ]
  ],
  "walk": {
    "input": "<table><tr><td><table><tr><td></td></tr></table></td></tr></table>",
    "steps": [
      [
        "<table>",
        [
          "Push 0: stack [0].",
          "০ পুশ: স্ট্যাক [০]।"
        ]
      ],
      [
        "<td>",
        [
          "Top becomes 1: [1].",
          "টপ ১: [১]।"
        ]
      ],
      [
        "<table> <td>",
        [
          "Push 0, then top 1: [1, 1].",
          "০ পুশ, তারপর টপ ১: [১, ১]।"
        ]
      ],
      [
        "</table>",
        [
          "Pop 1 (inner table has 1 cell): stack [1].",
          "১ পপ (ভেতরের টেবিলে ১ ঘর): স্ট্যাক [১]।"
        ]
      ],
      [
        "</table>",
        [
          "Pop 1 (outer): answer 1 1.",
          "১ পপ (বাইরের): উত্তর ১ ১।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n log n)",
    "space": "O(n)",
    "why": [
      "One pass over at most 5000 characters, then a sort of the table counts.",
      "সর্বোচ্চ ৫০০০ অক্ষরের ওপর একবার, তারপর টেবিলের গণনার সর্ট।"
    ]
  },
  "sols": [
    {
      "id": "stack",
      "kind": "optimal",
      "title": [
        "Stack of counters",
        "কাউন্টারের স্ট্যাক"
      ],
      "idea": [
        "Push 0 on <table>, add one on <td>, pop on </table>.",
        "<table>-এ ০ পুশ, <td>-তে এক যোগ, </table>-এ পপ।"
      ],
      "explain": [
        [
          "Because a cell can only hold a table, the open tables nest properly, so the innermost open table is always the right one to credit.",
          "ঘর শুধু টেবিলই ধারণ করতে পারে, তাই খোলা টেবিলগুলো সঠিকভাবে নেস্ট করে, ফলে সবচেয়ে ভেতরেরটিই সবসময় ঠিক টেবিল।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string all, part;
    while (cin >> part) all += part;  // the markup is cut into lines at arbitrary places
    vector<int> open, sizes;
    for (size_t i = 0; i < all.size();) {
        size_t j = all.find('>', i);
        string tag = all.substr(i, j - i + 1);
        i = j + 1;
        if (tag == "<table>") open.push_back(0);
        else if (tag == "</table>") { sizes.push_back(open.back()); open.pop_back(); }
        else if (tag == "<td>") open.back()++;
    }
    sort(sizes.begin(), sizes.end());
    for (size_t i = 0; i < sizes.size(); i++) cout << sizes[i] << (i + 1 < sizes.size() ? ' ' : '\n');
}
`,
      "time": "O(n + t log t)",
      "space": "O(n)",
      "toolkit": [
        "io-fast"
      ]
    },
    {
      "id": "descent",
      "kind": "alt",
      "title": [
        "Recursive descent on the grammar",
        "ব্যাকরণ ধরে রিকার্সিভ ডিসেন্ট"
      ],
      "idea": [
        "table → rows → cells → optional table, following the markup rules exactly.",
        "table → সারি → ঘর → ঐচ্ছিক table, মার্কআপ নিয়ম অক্ষরে অক্ষরে মেনে।"
      ],
      "explain": [
        [
          "This mirrors the statement: parseTable reads <tr> blocks, each with <td> cells, and recurses when a cell starts with <table>. Depth is at most 2500, which is safe.",
          "এটি বিবৃতির আয়না: parseTable <tr> ব্লক পড়ে, প্রতিটিতে <td> ঘর, আর ঘর <table> দিয়ে শুরু হলে রিকার্সন। গভীরতা সর্বোচ্চ ২৫০০, নিরাপদ।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Recursive descent on  table -> <table> (<tr> (<td> [table] </td>)+ </tr>)+ </table>
vector<string> tok;
size_t pos = 0;
vector<int> sizes;

int parseTable() {
    pos++;  // <table>
    int cells = 0;
    while (tok[pos] == "<tr>") {
        pos++;
        while (tok[pos] == "<td>") {
            pos++;
            cells++;
            if (tok[pos] == "<table>") cells += 0, parseTable();
            pos++;  // </td>
        }
        pos++;  // </tr>
    }
    pos++;  // </table>
    sizes.push_back(cells);
    return cells;
}

int main() {
    string all, part;
    while (cin >> part) all += part;
    for (size_t i = 0; i < all.size();) {
        size_t j = all.find('>', i);
        tok.push_back(all.substr(i, j - i + 1));
        i = j + 1;
    }
    parseTable();
    sort(sizes.begin(), sizes.end());
    for (size_t i = 0; i < sizes.size(); i++) cout << sizes[i] << (i + 1 < sizes.size() ? ' ' : '\n');
}
`,
      "time": "O(n + t log t)",
      "space": "O(n)",
      "toolkit": [
        "functions"
      ]
    }
  ],
  "own": [
    {
      "input": "<table><tr><td></td><td></td></tr><tr><td></td></tr></table>",
      "output": "3",
      "note": [
        "Two rows, three cells in total.",
        "দুটি সারি, মোট তিন ঘর।"
      ]
    },
    {
      "input": "<table><tr><td><table><tr><td></td></tr></table></td><td><table><tr><td></td><td></td></tr></table></td></tr></table>",
      "output": "1 2 2",
      "note": [
        "Two inner tables in one row; sorted output.",
        "এক সারিতে দুটি ভেতরের টেবিল; সাজানো আউটপুট।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Reading with getline and joining with spaces: a tag split across lines would break.",
      "getline দিয়ে পড়ে স্পেসে জোড়া: লাইনে ভাঙা ট্যাগ নষ্ট হয়।"
    ],
    [
      "Counting <tr> instead of <td>.",
      "<td>-র বদলে <tr> গোনা।"
    ],
    [
      "Forgetting to sort the output.",
      "আউটপুট সাজাতে ভুলে যাওয়া।"
    ]
  ],
  "related": [
    {
      "id": "190C",
      "name": "STL",
      "why": [
        "Another nesting grammar, with pair and int.",
        "pair ও int দিয়ে আরেকটি নেস্টিং ব্যাকরণ।"
      ]
    }
  ],
  "toolkit": [
    "io-fast"
  ]
});

export const p59C = mk({
  "id": "59C",
  "name": "Title",
  "rating": 1600,
  "tags": [
    "parsing",
    "greedy",
    "strings"
  ],
  "why": [
    "Palindrome filling with a coverage requirement: first force the mirrored letters, then spend the free pairs wisely to keep the string lexicographically smallest.",
    "কভারেজ শর্তসহ প্যালিনড্রোম পূরণ: আগে আয়না-অক্ষর বাধ্য করুন, তারপর মুক্ত জোড়াগুলো বুদ্ধি করে খরচ করে স্ট্রিং লেক্সিকোগ্রাফিক্যালি ছোট রাখুন।"
  ],
  "statement": [
    "A title is a string over the first k letters of the alphabet (a, b, c, …), some positions are unknown and written “?”. Fill in the “?” so the title is a palindrome and uses every one of the k letters at least once. Among all fillings print the lexicographically smallest, or IMPOSSIBLE if none exists.",
    "একটি শিরোনাম বর্ণমালার প্রথম k অক্ষরের (a, b, c, …) স্ট্রিং, কিছু অবস্থান অজানা, “?” লেখা। “?” এমনভাবে পূরণ করুন যাতে শিরোনাম প্যালিনড্রোম হয় এবং k টি অক্ষরের প্রতিটি অন্তত একবার থাকে। সব পূরণের মধ্যে লেক্সিকোগ্রাফিক্যালি ক্ষুদ্রতমটি ছাপুন, না থাকলে IMPOSSIBLE।"
  ],
  "input": [
    "k, then the string.",
    "k, তারপর স্ট্রিং।"
  ],
  "output": [
    "The title or IMPOSSIBLE.",
    "শিরোনাম অথবা IMPOSSIBLE।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "1 ≤ k ≤ 26; the string has at most 100 characters.",
        "১ ≤ k ≤ ২৬; স্ট্রিংয়ে সর্বোচ্চ ১০০ অক্ষর।"
      ]
    ]
  },
  "samples": [
    {
      "input": "3\na?c",
      "output": "IMPOSSIBLE",
      "explain": [
        "Positions 1 and 3 are mirrors but hold a and c.",
        "অবস্থান ১ ও ৩ আয়না কিন্তু a ও c।"
      ]
    },
    {
      "input": "2\n??b?",
      "output": "abba",
      "explain": [
        "The last ? mirrors the first; the third position mirrors the second (b), so it is b. The first pair is free and must supply the missing a.",
        "শেষ ? প্রথমটির আয়না; তৃতীয় অবস্থান দ্বিতীয়টির (b) আয়না, তাই b। প্রথম জোড়া মুক্ত এবং অনুপস্থিত a দিতে হবে।"
      ]
    },
    {
      "input": "2\na??a",
      "output": "abba",
      "explain": [
        "The middle pair is free and has to supply b.",
        "মাঝের জোড়া মুক্ত এবং b দিতে হবে।"
      ]
    }
  ],
  "observation": [
    "Mirror positions must be equal, so first copy letters across and reject conflicts. What is left are free pairs (both ends “?”). Missing letters must be placed into free pairs, and the leftover free pairs get “a”. To keep the string smallest, the large missing letters should go as far inside as possible.",
    "আয়না-অবস্থান সমান হতে হবে, তাই আগে অক্ষর কপি করে দ্বন্দ্ব বাতিল করুন। যা বাকি তা মুক্ত জোড়া (দুই প্রান্তই “?”)। অনুপস্থিত অক্ষর মুক্ত জোড়ায় বসাতে হবে, বাকি মুক্ত জোড়ায় “a”। স্ট্রিং ছোট রাখতে বড় অনুপস্থিত অক্ষর যত সম্ভব ভেতরে যাবে।"
  ],
  "approach": [
    [
      "Pass 1: for each i, mirror j = n−1−i; copy a letter onto a “?”, or output IMPOSSIBLE if two different letters meet.",
      "ধাপ ১: প্রতি i-র জন্য আয়না j = n−1−i; “?”-এ অক্ষর কপি, দুটি ভিন্ন অক্ষর মিললে IMPOSSIBLE।"
    ],
    [
      "Mark which of the k letters occur.",
      "k অক্ষরের কোনগুলো আছে চিহ্নিত করুন।"
    ],
    [
      "Walk the free pairs from the middle outwards. Give each the largest letter still missing; when none is missing, give “a”.",
      "মুক্ত জোড়াগুলো মাঝ থেকে বাইরের দিকে হাঁটুন। প্রতিটিকে এখনও অনুপস্থিত সবচেয়ে বড় অক্ষর দিন; কিছু অনুপস্থিত না থাকলে “a”।"
    ],
    [
      "If a letter is still missing at the end, print IMPOSSIBLE.",
      "শেষেও কোনো অক্ষর অনুপস্থিত থাকলে IMPOSSIBLE।"
    ]
  ],
  "walk": {
    "input": "2\n??b?",
    "steps": [
      [
        "mirror",
        [
          "The string is “??b?”. Position 1 mirrors position 2 (“b”), so it becomes b; positions 0 and 3 are still a free pair.",
          "আয়না: s[১]-এর আয়না s[২]=“b”, তাই s[১] = b; s[০] ও s[৩] এখনও মুক্ত জোড়া।"
        ]
      ],
      [
        "letters",
        [
          "Used: {b}. Missing: {a}.",
          "ব্যবহৃত: {b}। অনুপস্থিত: {a}।"
        ]
      ],
      [
        "free pair",
        [
          "The only free pair is (0, 3): give it a → “abba”.",
          "একমাত্র মুক্ত জোড়া (০, ৩): a দিন → “abba”।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n + k)",
    "space": "O(n)",
    "why": [
      "A few linear passes.",
      "কয়েকটি রৈখিক পাস।"
    ]
  },
  "sols": [
    {
      "id": "greedy",
      "kind": "optimal",
      "title": [
        "Fill from the middle outwards",
        "মাঝ থেকে বাইরের দিকে ভরা"
      ],
      "idea": [
        "Spend the largest missing letters on the innermost free pairs.",
        "সবচেয়ে ভেতরের মুক্ত জোড়ায় সবচেয়ে বড় অনুপস্থিত অক্ষর খরচ করুন।"
      ],
      "explain": [
        [
          "The lexicographic order is decided by the earliest position. Free pairs near the outside are earliest, so they should hold the smallest possible letter, “a”, whenever we can afford it. We must place m missing letters in some m free pairs; putting them in the innermost m pairs, largest innermost, leaves the outside as small as possible.",
          "লেক্সিকোগ্রাফিক ক্রম ঠিক হয় সবচেয়ে আগের অবস্থানে। বাইরের মুক্ত জোড়া সবচেয়ে আগে, তাই সম্ভব হলে সেখানে সবচেয়ে ছোট “a”। m টি অনুপস্থিত অক্ষর m টি মুক্ত জোড়ায় বসাতে হবে; ভেতরের m জোড়ায়, সবচেয়ে বড়টি সবচেয়ে ভেতরে, বসালে বাইরেটা সবচেয়ে ছোট থাকে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int k;
    string s;
    cin >> k >> s;
    int n = s.size();
    for (int i = 0; i < n; i++) {
        int j = n - 1 - i;
        if (s[i] == '?') s[i] = s[j];
        else if (s[j] == '?') s[j] = s[i];
        else if (s[i] != s[j]) { cout << "IMPOSSIBLE\n"; return 0; }
    }
    vector<bool> used(k, false);
    for (char ch : s)
        if (ch != '?') used[ch - 'a'] = true;
    int next = k - 1;  // largest letter not used yet
    for (int i = (n - 1) / 2; i >= 0; i--) {  // free pairs, from the middle outwards
        if (s[i] != '?') continue;
        while (next >= 0 && used[next]) next--;
        char ch = next >= 0 ? char('a' + next) : 'a';
        if (next >= 0) used[next] = true;
        s[i] = s[n - 1 - i] = ch;
    }
    for (int c = 0; c < k; c++)
        if (!used[c]) { cout << "IMPOSSIBLE\n"; return 0; }
    cout << s << "\n";
}
`,
      "time": "O(n + k)",
      "space": "O(n)",
      "toolkit": [
        "io-basics"
      ]
    },
    {
      "id": "brute",
      "kind": "brute",
      "title": [
        "Try fillings in order",
        "ক্রমানুসারে পূরণ চেষ্টা"
      ],
      "idea": [
        "Enumerate all k^q fillings of the q question marks in lexicographic order; print the first palindrome using all letters.",
        "q টি প্রশ্নচিহ্নের সব k^q পূরণ লেক্সিকোগ্রাফিক ক্রমে দেখুন; সব অক্ষর ব্যবহার করা প্রথম প্যালিনড্রোম ছাপুন।"
      ],
      "explain": [
        [
          "A direct translation of the statement, exponential in the number of “?”. It is the reference our stress test compares the greedy against.",
          "বিবৃতির সরাসরি অনুবাদ, “?” সংখ্যায় সূচকীয়। আমাদের স্ট্রেস টেস্টে গ্রিডির রেফারেন্স এটাই।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Try every filling in lexicographic order and print the first that works.
int main() {
    int k;
    string s;
    cin >> k >> s;
    int n = s.size();
    vector<int> q;
    for (int i = 0; i < n; i++)
        if (s[i] == '?') q.push_back(i);
    long long total = 1;
    for (size_t i = 0; i < q.size(); i++) total *= k;
    for (long long mask = 0; mask < total; mask++) {
        string t = s;
        long long m = mask;
        for (int i = (int)q.size() - 1; i >= 0; i--) { t[q[i]] = char('a' + m % k); m /= k; }
        string rt(t.rbegin(), t.rend());
        if (t != rt) continue;
        set<char> seen(t.begin(), t.end());
        if ((int)seen.size() == k) { cout << t << "\n"; return 0; }
    }
    cout << "IMPOSSIBLE\n";
}
`,
      "time": "O(k^q · n)",
      "space": "O(n)",
      "accepted": false,
      "toolkit": [
        "io-basics"
      ]
    }
  ],
  "own": [
    {
      "input": "1\n?",
      "output": "a",
      "note": [
        "k = 1: the only letter fills the string.",
        "k = ১: একমাত্র অক্ষরই স্ট্রিং ভরে।"
      ]
    },
    {
      "input": "3\n?????",
      "output": "abcba",
      "note": [
        "Five free positions, three letters to cover.",
        "পাঁচটি মুক্ত অবস্থান, তিনটি অক্ষর ঢাকতে হবে।"
      ]
    },
    {
      "input": "3\n??",
      "output": "IMPOSSIBLE",
      "note": [
        "One free pair cannot hold three different letters.",
        "একটি মুক্ত জোড়ায় তিনটি ভিন্ন অক্ষর ধরে না।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Filling free pairs from the outside: it puts big letters first and makes the string larger.",
      "বাইরে থেকে মুক্ত জোড়া ভরা: বড় অক্ষর আগে আসে, স্ট্রিং বড় হয়।"
    ],
    [
      "Forgetting the middle character of an odd-length string, which is its own mirror.",
      "বিজোড় দৈর্ঘ্যের মাঝের অক্ষর ভুলে যাওয়া, যা নিজেই নিজের আয়না।"
    ],
    [
      "Checking only the letters in the input, not whether all k are used at the end.",
      "শুধু ইনপুটের অক্ষর দেখা, শেষে সব k ব্যবহৃত কি না না দেখা।"
    ]
  ],
  "related": [
    {
      "id": "552E",
      "name": "Vanya and Brackets",
      "why": [
        "Another “parse, then decide” problem.",
        "আরেকটি “পার্স করুন, তারপর সিদ্ধান্ত” সমস্যা।"
      ]
    }
  ],
  "toolkit": [
    "io-basics"
  ]
});

export const p747E = mk({
  "id": "747E",
  "name": "Comments",
  "rating": 1700,
  "tags": [
    "parsing",
    "dfs",
    "implementation"
  ],
  "why": [
    "A comment tree arrives as a flat token list in pre-order; the task is to rebuild its depth levels without recursion.",
    "মন্তব্যের গাছ পূর্ব-ক্রমে সমতল টোকেন তালিকা হিসেবে আসে; কাজ হলো রিকার্সন ছাড়াই গভীরতার স্তর পুনর্গঠন।"
  ],
  "statement": [
    "Comments are written in one line, separated by commas. A comment is its text (letters), then the number of replies, then each reply written the same way (recursively). Several top-level comments follow one another. Print the maximum nesting depth, then for every depth from 1 up the comments of that depth in order of appearance, separated by spaces.",
    "মন্তব্যগুলো এক লাইনে কমা দিয়ে লেখা। একটি মন্তব্য হলো তার লেখা (অক্ষর), তারপর উত্তরের সংখ্যা, তারপর প্রতিটি উত্তর একই ভাবে (রিকার্সিভলি) লেখা। একাধিক সর্বোচ্চ-স্তরের মন্তব্য একের পর এক আসে। সর্বোচ্চ নেস্টিং গভীরতা ছাপুন, তারপর ১ থেকে প্রতিটি গভীরতার মন্তব্য প্রকাশের ক্রমে, স্পেসে আলাদা।"
  ],
  "input": [
    "One line of comma-separated tokens.",
    "কমা-বিভক্ত টোকেনের একটি লাইন।"
  ],
  "output": [
    "The depth, then one line per depth level.",
    "গভীরতা, তারপর প্রতি স্তরে এক লাইন।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "The line has at most about 10⁶ characters, so the tree can be very deep.",
        "লাইনে সর্বোচ্চ প্রায় ১০⁶ অক্ষর, তাই গাছ খুব গভীর হতে পারে।"
      ]
    ]
  },
  "samples": [
    {
      "input": "hello,2,ok,0,bye,0,test,0,one,1,two,2,a,0,b,0",
      "output": "3\nhello test one\nok bye two\na b",
      "explain": [
        "hello has replies ok and bye; test is another top comment; one has reply two with replies a and b.",
        "hello-র উত্তর ok ও bye; test আরেকটি সর্বোচ্চ-স্তরের মন্তব্য; one-এর উত্তর two, যার উত্তর a ও b।"
      ]
    },
    {
      "input": "a,5,A,0,a,0,A,0,a,0,A,0",
      "output": "2\na\nA a A a A",
      "explain": [
        "One root with five leaf replies.",
        "একটি মূল, পাঁচটি পাতা-উত্তরসহ।"
      ]
    },
    {
      "input": "A,3,B,2,C,0,D,1,E,0,F,1,G,0,H,1,I,1,J,0,K,1,L,0,M,2,N,0,O,1,P,0",
      "output": "4\nA K M\nB F H L N O\nC D G I P\nE J",
      "explain": [
        "A deeper forest; each level lists comments in the order they were read.",
        "আরও গভীর বন; প্রতিটি স্তরে মন্তব্য পড়ার ক্রমে।"
      ]
    }
  ],
  "observation": [
    "Pre-order means the depth of a comment is the number of unfinished ancestors at the moment it is read. Keep a stack of “replies still to read” for each open comment; its size is the depth, and a finished leaf closes every ancestor whose last reply it was.",
    "পূর্ব-ক্রমে একটি মন্তব্যের গভীরতা হলো পড়ার সময় অসমাপ্ত পূর্বপুরুষের সংখ্যা। প্রতিটি খোলা মন্তব্যের “আর কয়টি উত্তর পড়া বাকি” এর স্ট্যাক রাখুন; এর আকারই গভীরতা, আর শেষ হওয়া পাতা সেই সব পূর্বপুরুষ বন্ধ করে যাদের শেষ উত্তর সে।"
  ],
  "approach": [
    [
      "Split the line on commas into tokens; read them as (text, count) pairs.",
      "লাইনকে কমায় ভেঙে টোকেন করুন; (লেখা, সংখ্যা) জোড়ায় পড়ুন।"
    ],
    [
      "The depth of a pair is stack.size() + 1; append its text to that level.",
      "একটি জোড়ার গভীরতা stack.size() + ১; তার লেখা সেই স্তরে যোগ করুন।"
    ],
    [
      "If count > 0, push count. Otherwise decrement the top, popping while it hits 0 (and decrementing the next).",
      "সংখ্যা > ০ হলে সংখ্যাটি পুশ। নইলে টপ কমান, ০ হলে পপ করে (এবং পরেরটি কমিয়ে) চলুন।"
    ]
  ],
  "walk": {
    "input": "a,2,b,0,c,0",
    "steps": [
      [
        "a,2",
        [
          "Depth 1, stack empty. Push 2: [2].",
          "গভীরতা ১, স্ট্যাক ফাঁকা। ২ পুশ: [২]।"
        ]
      ],
      [
        "b,0",
        [
          "Depth 2. Leaf: top 2 → 1: [1].",
          "গভীরতা ২। পাতা: টপ ২ → ১: [১]।"
        ]
      ],
      [
        "c,0",
        [
          "Depth 2. Leaf: top 1 → 0, pop: [].",
          "গভীরতা ২। পাতা: টপ ১ → ০, পপ: []।"
        ]
      ],
      [
        "levels",
        [
          "Level 1: a. Level 2: b c. Depth 2.",
          "স্তর ১: a। স্তর ২: b c। গভীরতা ২।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n)",
    "space": "O(n)",
    "why": [
      "Each token is read once and pushed or popped at most once.",
      "প্রতিটি টোকেন একবার পড়া এবং সর্বোচ্চ একবার পুশ/পপ।"
    ]
  },
  "sols": [
    {
      "id": "stack",
      "kind": "optimal",
      "title": [
        "Iterative stack of pending replies",
        "বাকি উত্তরের পুনরাবৃত্ত স্ট্যাক"
      ],
      "idea": [
        "The stack size is the depth; a finished leaf pops every ancestor it completes.",
        "স্ট্যাকের আকারই গভীরতা; শেষ হওয়া পাতা যে পূর্বপুরুষদের সম্পূর্ণ করে তাদের পপ করে।"
      ],
      "explain": [
        [
          "This avoids recursion entirely, which matters because a chain of 250000 nested comments would overflow the call stack.",
          "এতে রিকার্সন পুরোপুরি বাদ, যা জরুরি কারণ ২৫০০০০ নেস্টেড মন্তব্যের শিকল কল-স্ট্যাক ভরিয়ে দেবে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    vector<string> tok;
    stringstream ss(line);
    string t;
    while (getline(ss, t, ',')) tok.push_back(t);
    vector<vector<string>> level;
    vector<int> waiting;  // replies still to come for each open comment
    for (size_t i = 0; i + 1 < tok.size(); i += 2) {
        size_t d = waiting.size();
        if (level.size() <= d) level.resize(d + 1);
        level[d].push_back(tok[i]);
        int cnt = stoi(tok[i + 1]);
        if (cnt > 0) {
            waiting.push_back(cnt);
        } else {
            // a leaf finished: close every ancestor whose last reply it was
            while (!waiting.empty() && --waiting.back() == 0) waiting.pop_back();
        }
    }
    cout << level.size() << "\n";
    for (auto& v : level) {
        for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i + 1 < v.size() ? " " : "\n");
    }
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "io-basics"
      ]
    },
    {
      "id": "recursive",
      "kind": "alt",
      "title": [
        "Recursive descent",
        "রিকার্সিভ ডিসেন্ট"
      ],
      "idea": [
        "comment(d): record the text at level d, then call comment(d+1) once per reply.",
        "comment(d): d স্তরে লেখা রাখুন, তারপর প্রতিটি উত্তরের জন্য comment(d+1) ডাকুন।"
      ],
      "explain": [
        [
          "The grammar read literally. It is the cleanest code, but with very deep inputs it can overflow the stack, so the iterative stack is the safe submission.",
          "ব্যাকরণ আক্ষরিক পাঠ। এটি সবচেয়ে পরিষ্কার কোড, কিন্তু অতি গভীর ইনপুটে স্ট্যাক ভরতে পারে, তাই পুনরাবৃত্ত স্ট্যাকই নিরাপদ জমা।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Natural recursive reading: comment := text , k , comment*k
vector<string> tok;
size_t pos = 0;
vector<vector<string>> level;

void comment(int d) {
    if (level.size() <= (size_t)d) level.resize(d + 1);
    level[d].push_back(tok[pos]);
    int k = stoi(tok[pos + 1]);
    pos += 2;
    while (k--) comment(d + 1);
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    string t;
    while (getline(ss, t, ',')) tok.push_back(t);
    while (pos < tok.size()) comment(0);
    cout << level.size() << "\n";
    for (auto& v : level)
        for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i + 1 < v.size() ? " " : "\n");
}
`,
      "time": "O(n)",
      "space": "O(depth)",
      "toolkit": [
        "functions"
      ]
    }
  ],
  "own": [
    {
      "input": "x,0",
      "output": "1\nx",
      "note": [
        "A single comment.",
        "একটি মাত্র মন্তব্য।"
      ]
    },
    {
      "input": "a,1,b,1,c,1,d,0,e,0",
      "output": "4\na e\nb\nc\nd",
      "note": [
        "A chain, then a second top-level comment.",
        "একটি শিকল, তারপর দ্বিতীয় সর্বোচ্চ-স্তরের মন্তব্য।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Recursing on a 10⁵-deep chain.",
      "১০⁵ গভীর শিকলে রিকার্সন।"
    ],
    [
      "Forgetting that finishing a leaf can finish several ancestors at once.",
      "ভুলে যাওয়া যে একটি পাতা শেষ হলে একাধিক পূর্বপুরুষ একসাথে শেষ হতে পারে।"
    ],
    [
      "Splitting on commas but leaving the trailing newline on the last token.",
      "কমায় ভাঙলেও শেষ টোকেনে নতুন লাইন রেখে দেওয়া।"
    ]
  ],
  "related": [
    {
      "id": "190C",
      "name": "STL",
      "why": [
        "Also a pre-order token list rebuilt into a tree shape.",
        "এটিও পূর্ব-ক্রম টোকেন তালিকা থেকে গাছের আকার পুনর্গঠন।"
      ]
    }
  ],
  "toolkit": [
    "io-basics"
  ]
});

export const p223A = mk({
  "id": "223A",
  "name": "Bracket Sequence",
  "rating": 1700,
  "tags": [
    "parsing",
    "data-structures",
    "implementation"
  ],
  "why": [
    "Find the best regular bracket substring: the stack matches brackets, and maximal runs of matched positions are exactly the candidates.",
    "সেরা নিয়মিত বন্ধনী সাবস্ট্রিং খোঁজা: স্ট্যাক বন্ধনী মেলায়, আর মিলে যাওয়া অবস্থানের সর্বোচ্চ ধারাগুলোই প্রার্থী।"
  ],
  "statement": [
    "A string of round and square brackets is given. Find a substring that is a regular bracket sequence and contains as many “[” as possible. Print that count, then the substring (any one if several are best). An empty substring is allowed when there is no “[”.",
    "গোল ও চৌকো বন্ধনীর একটি স্ট্রিং দেওয়া আছে। এমন একটি সাবস্ট্রিং খুঁজুন যা নিয়মিত বন্ধনী ক্রম এবং যতটা সম্ভব “[” ধারণ করে। সেই সংখ্যা ছাপুন, তারপর সাবস্ট্রিং (একাধিক সেরা হলে যেকোনোটি)। “[” না থাকলে ফাঁকা সাবস্ট্রিং চলবে।"
  ],
  "input": [
    "One string of at most 10⁵ characters “()[]”.",
    "“()[]” এর সর্বোচ্চ ১০⁵ অক্ষরের একটি স্ট্রিং।"
  ],
  "output": [
    "The count, then the substring.",
    "সংখ্যা, তারপর সাবস্ট্রিং।"
  ],
  "limits": {
    "timeSec": 1,
    "memoryMb": 256,
    "notes": [
      [
        "Several answers can be right, so CF Forge checks yours with a checker.",
        "একাধিক উত্তর সঠিক হতে পারে, তাই CF Forge একটি চেকার দিয়ে আপনারটি যাচাই করে।"
      ]
    ]
  },
  "samples": [
    {
      "input": "([])",
      "output": "1\n([])",
      "explain": [
        "The whole string is regular and has one “[”.",
        "পুরো স্ট্রিং নিয়মিত এবং একটি “[” আছে।"
      ]
    },
    {
      "input": "(((",
      "output": "0\n",
      "explain": [
        "No “[” and nothing matches; print 0 and an empty line.",
        "“[” নেই, কিছুই মেলে না; ০ ও একটি ফাঁকা লাইন ছাপুন।"
      ]
    }
  ],
  "observation": [
    "Run the usual stack matching, but when a closer cannot match, clear the stack: nothing before it can join with anything after it. Every maximal run of consecutive matched positions is then a regular sequence, and the best answer is the run with the most “[”, found with prefix counts.",
    "স্ট্যাকে মেলানো চলুক, কিন্তু কোনো বন্ধ-বন্ধনী না মিললে স্ট্যাক ফাঁকা করুন: এর আগের কিছু পরের কিছুর সাথে জুড়তে পারে না। তখন পরপর মিলে যাওয়া অবস্থানের প্রতিটি সর্বোচ্চ ধারা একটি নিয়মিত ক্রম, আর সেরা উত্তর হলো যে ধারায় সবচেয়ে বেশি “[”, প্রিফিক্স গণনায়।"
  ],
  "approach": [
    [
      "Scan with a stack of open-bracket positions; on a matching closer, mark both positions matched.",
      "খোলা বন্ধনীর অবস্থানের স্ট্যাকে স্ক্যান; মিলে যাওয়া বন্ধ-বন্ধনীতে দুই অবস্থান চিহ্নিত।"
    ],
    [
      "On a closer that does not match, clear the stack.",
      "না-মেলা বন্ধ-বন্ধনীতে স্ট্যাক ফাঁকা।"
    ],
    [
      "Prefix-count “[” and take the best maximal run of matched positions.",
      "“[” এর প্রিফিক্স গণনা করে মিলে যাওয়া অবস্থানের সেরা সর্বোচ্চ ধারা নিন।"
    ]
  ],
  "walk": {
    "input": "([)]",
    "steps": [
      [
        "( [",
        [
          "Push positions 0 and 1.",
          "অবস্থান ০ ও ১ পুশ।"
        ]
      ],
      [
        ")",
        [
          "Top is “[”: no match. Clear the stack.",
          "টপ “[”: মেলে না। স্ট্যাক ফাঁকা।"
        ]
      ],
      [
        "]",
        [
          "Stack empty: no match. Nothing is matched, so the answer is 0 and an empty line.",
          "স্ট্যাক ফাঁকা: মেলে না। কিছুই মেলেনি, তাই উত্তর ০ ও ফাঁকা লাইন।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n)",
    "space": "O(n)",
    "why": [
      "One scan plus one pass over runs.",
      "একটি স্ক্যান এবং ধারাগুলোর ওপর একটি পাস।"
    ]
  },
  "sols": [
    {
      "id": "runs",
      "kind": "optimal",
      "title": [
        "Stack matching and maximal runs",
        "স্ট্যাক মেলানো ও সর্বোচ্চ ধারা"
      ],
      "idea": [
        "Mark matched positions; each maximal matched run is a regular sequence.",
        "মিলে যাওয়া অবস্থান চিহ্নিত করুন; প্রতিটি সর্বোচ্চ ধারা একটি নিয়মিত ক্রম।"
      ],
      "explain": [
        [
          "Why is a run regular? Every matched pair encloses only matched positions, and nothing unmatched sits between two matched positions of one run, so the run is a concatenation of balanced blocks.",
          "ধারা কেন নিয়মিত? প্রতিটি মিলে যাওয়া জোড়া শুধু মিলে যাওয়া অবস্থান ঘিরে থাকে, আর এক ধারার দুই অবস্থানের মাঝে অমেলা কিছু নেই, তাই ধারাটি সুষম ব্লকের জোড়া।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<char> matched(n, 0);
    vector<int> st;
    for (int i = 0; i < n; i++) {
        bool open = s[i] == '(' || s[i] == '[';
        if (open) { st.push_back(i); continue; }
        if (!st.empty() && ((s[i] == ')' && s[st.back()] == '(') || (s[i] == ']' && s[st.back()] == '['))) {
            matched[i] = matched[st.back()] = 1;
            st.pop_back();
        } else {
            st.clear();  // nothing before a bad closer can be combined with what follows
        }
    }
    vector<int> pre(n + 1, 0);
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + (s[i] == '[');
    int best = 0, bl = 0, br = 0;  // answer is s[bl, br)
    for (int i = 0; i < n;) {
        if (!matched[i]) { i++; continue; }
        int j = i;
        while (j < n && matched[j]) j++;
        if (pre[j] - pre[i] > best) best = pre[j] - pre[i], bl = i, br = j;
        i = j;
    }
    cout << best << "\n" << s.substr(bl, br - bl) << "\n";
}
`,
      "time": "O(n)",
      "space": "O(n)",
      "toolkit": [
        "prefix-sum"
      ]
    },
    {
      "id": "brute",
      "kind": "brute",
      "title": [
        "Test every substring",
        "প্রতিটি সাবস্ট্রিং পরীক্ষা"
      ],
      "idea": [
        "For every pair (i, j) run a stack check and count “[”.",
        "প্রতিটি (i, j) জোড়ায় স্ট্যাক পরীক্ষা চালান ও “[” গুনুন।"
      ],
      "explain": [
        [
          "O(n³) overall, only for tiny n, but it is the definition of the task and our stress reference.",
          "মোট O(n³), শুধু ছোট n-এর জন্য, কিন্তু এটি কাজের সংজ্ঞা এবং আমাদের স্ট্রেস রেফারেন্স।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Check every substring with a counter-free stack test; keep the one with most '['.
int main() {
    string s;
    cin >> s;
    int n = s.size(), best = 0, bl = 0, bl_len = 0;
    for (int i = 0; i < n; i++)
        for (int j = i; j < n; j++) {
            vector<char> st;
            bool ok = true;
            int cnt = 0;
            for (int k = i; k <= j && ok; k++) {
                char c = s[k];
                if (c == '(' || c == '[') { st.push_back(c); cnt += c == '['; }
                else if (!st.empty() && ((c == ')' && st.back() == '(') || (c == ']' && st.back() == '['))) st.pop_back();
                else ok = false;
            }
            if (ok && st.empty() && cnt > best) best = cnt, bl = i, bl_len = j - i + 1;
        }
    cout << best << "\n" << s.substr(bl, bl_len) << "\n";
}
`,
      "time": "O(n³)",
      "space": "O(n)",
      "accepted": false,
      "toolkit": [
        "io-basics"
      ]
    }
  ],
  "own": [
    {
      "input": "()[]",
      "output": "1\n()[]",
      "note": [
        "Two adjacent blocks form one run.",
        "দুটি পাশাপাশি ব্লক একটি ধারা গড়ে।"
      ]
    },
    {
      "input": "[]([",
      "output": "1\n[]",
      "note": [
        "The unmatched openers separate runs; the answer is unique.",
        "অমেলা খোলা বন্ধনী ধারা আলাদা করে; উত্তর অনন্য।"
      ]
    },
    {
      "input": ")(",
      "output": "0\n",
      "note": [
        "No regular substring besides the empty one.",
        "ফাঁকা ছাড়া কোনো নিয়মিত সাবস্ট্রিং নেই।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Not clearing the stack on a bad closer: it can then pair a bracket with an opener far to the left, across a break.",
      "খারাপ বন্ধ-বন্ধনীতে স্ট্যাক ফাঁকা না করা: তখন ফাঁক পেরিয়ে অনেক বামের খোলা বন্ধনীর সাথে জোড়া লাগতে পারে।"
    ],
    [
      "Counting “(” as well as “[”.",
      "“[” এর সাথে “(” ও গোনা।"
    ],
    [
      "Printing nothing at all when the answer is 0: print the 0 and then an empty line.",
      "উত্তর ০ হলে কিছুই না ছাপা: ০ ছাপুন, তারপর একটি ফাঁকা লাইন।"
    ]
  ],
  "related": [
    {
      "id": "552E",
      "name": "Vanya and Brackets",
      "why": [
        "Brackets again, this time with evaluation.",
        "আবার বন্ধনী, এবার মান নির্ণয়সহ।"
      ]
    }
  ],
  "toolkit": [
    "prefix-sum"
  ]
});

export const WAVE = [p727B, p778B, p195C, p51B, p59C, p747E, p223A];
