import { mk } from './mk.ts';

const raw = String.raw;


export const p48A = mk({
  "id": "48A",
  "name": "Rock-paper-scissors",
  "rating": 900,
  "tags": [
    "schedules",
    "implementation"
  ],
  "why": [
    "The gentlest “schedule” problem: three players each show a gesture in the same round, and you decide who, if anyone, wins it.",
    "সবচেয়ে সহজ “schedules” সমস্যা: তিনজন খেলোয়াড় একই রাউন্ডে একটি করে ভঙ্গি দেখায়, আর আপনি ঠিক করেন কে, যদি কেউ থাকে, জেতে।"
  ],
  "statement": [
    "Three friends, F, M and S, play one round of rock-paper-scissors. Rock beats scissors, scissors beats paper, paper beats rock. A player wins the round if their gesture beats both of the other two gestures. Print F, M or S for the winner, or “?” if nobody wins.",
    "তিন বন্ধু F, M ও S রক-পেপার-সিজার্সের এক রাউন্ড খেলে। রক কাঁচিকে, কাঁচি কাগজকে, কাগজ রককে হারায়। যার ভঙ্গি অন্য দুজনের ভঙ্গিকেই হারায় সে রাউন্ড জেতে। বিজয়ী F, M বা S ছাপুন, কেউ না জিতলে “?”।"
  ],
  "input": [
    "Three lines: the gestures of F, then M, then S, each one of rock, paper, scissors.",
    "তিন লাইন: F, তারপর M, তারপর S-এর ভঙ্গি, প্রতিটি rock, paper, scissors-এর একটি।"
  ],
  "output": [
    "F, M, S or “?”.",
    "F, M, S অথবা “?”।"
  ],
  "limits": {
    "timeSec": 2,
    "memoryMb": 256,
    "notes": [
      [
        "Exactly three words are given.",
        "ঠিক তিনটি শব্দ দেওয়া।"
      ]
    ]
  },
  "samples": [
    {
      "input": "rock\nrock\nrock",
      "output": "?",
      "explain": [
        "All equal: nobody beats anybody.",
        "সবাই সমান: কেউ কাউকে হারায় না।"
      ]
    },
    {
      "input": "paper\nrock\nrock",
      "output": "F",
      "explain": [
        "Paper beats both rocks.",
        "কাগজ দুটি রককেই হারায়।"
      ]
    },
    {
      "input": "scissors\nrock\nrock",
      "output": "?",
      "explain": [
        "Scissors lose to rock, so the rocks beat scissors but each rock ties with the other rock: no one beats both.",
        "কাঁচি রকের কাছে হারে, রক দুটি কাঁচিকে হারায় কিন্তু পরস্পর সমান: কেউ দুজনকেই হারায় না।"
      ]
    },
    {
      "input": "scissors\npaper\nrock",
      "output": "?",
      "explain": [
        "All three differ: each beats one and loses to the other.",
        "তিনজন ভিন্ন: প্রত্যেকে একজনকে হারায়, আরেকজনের কাছে হারে।"
      ]
    }
  ],
  "observation": [
    "A winner must beat both others, so a winner’s gesture can appear only once and the other two must both be the gesture it beats. Encode gestures as 0, 1, 2 so that x beats (x + 1) mod 3 and test each player.",
    "বিজয়ীকে দুজনকেই হারাতে হয়, তাই বিজয়ীর ভঙ্গি একবারই আসবে আর বাকি দুজনের ভঙ্গি তার হারানো ভঙ্গি। ভঙ্গিকে ০, ১, ২ করুন যাতে x হারায় (x + ১) mod ৩-কে, তারপর প্রতি খেলোয়াড়কে পরীক্ষা করুন।"
  ],
  "approach": [
    [
      "Read the three words and map rock, scissors, paper to 0, 1, 2.",
      "তিনটি শব্দ পড়ে rock, scissors, paper-কে ০, ১, ২ করুন।"
    ],
    [
      "For each player i check that both others show (g[i] + 1) mod 3.",
      "প্রতি খেলোয়াড় i-র জন্য দেখুন বাকি দুজনেই (g[i] + ১) mod ৩ দেখাচ্ছে।"
    ],
    [
      "Print the first such player, or “?”.",
      "প্রথম এমন খেলোয়াড় ছাপুন, নয়তো “?”।"
    ]
  ],
  "walk": {
    "input": "paper\nrock\nrock",
    "steps": [
      [
        "codes",
        [
          "rock = 0, scissors = 1, paper = 2: g = [2, 0, 0].",
          "rock = ০, scissors = ১, paper = ২: g = [২, ০, ০]।"
        ]
      ],
      [
        "F",
        [
          "(2 + 1) mod 3 = 0 and both others are 0: F wins.",
          "(২ + ১) mod ৩ = ০ এবং বাকি দুজনই ০: F জেতে।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(1)",
    "space": "O(1)",
    "why": [
      "Three players, constant work.",
      "তিনজন খেলোয়াড়, ধ্রুবক কাজ।"
    ]
  },
  "sols": [
    {
      "id": "cycle",
      "kind": "optimal",
      "title": [
        "Codes on a cycle",
        "চক্রে কোড"
      ],
      "idea": [
        "Gesture x beats (x + 1) mod 3; test every player.",
        "ভঙ্গি x হারায় (x + ১) mod ৩-কে; প্রতি খেলোয়াড়কে পরীক্ষা।"
      ],
      "explain": [
        [
          "The three gestures form a cycle, so “beats” is just “next on the cycle”, and no table of rules is needed.",
          "তিনটি ভঙ্গি একটি চক্র গড়ে, তাই “হারায়” মানে শুধু “চক্রে পরেরটি”, নিয়মের টেবিল লাগে না।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// 0 = rock, 1 = scissors, 2 = paper; gesture x beats (x + 1) % 3
int code(const string& s) { return s == "rock" ? 0 : s == "scissors" ? 1 : 2; }

int main() {
    string name = "FMS";
    int g[3];
    for (int i = 0; i < 3; i++) {
        string s;
        cin >> s;
        g[i] = code(s);
    }
    for (int i = 0; i < 3; i++) {
        bool winsAll = true;
        for (int j = 0; j < 3; j++)
            if (j != i && g[j] != (g[i] + 1) % 3) winsAll = false;
        if (winsAll) { cout << name[i] << "\n"; return 0; }
    }
    cout << "?\n";
}
`,
      "time": "O(1)",
      "space": "O(1)",
      "toolkit": [
        "io-basics"
      ]
    },
    {
      "id": "two-kinds",
      "kind": "alt",
      "title": [
        "Exactly two kinds of gestures",
        "ঠিক দুই রকম ভঙ্গি"
      ],
      "idea": [
        "There is a winner only if two different gestures appear and one player shows the winning one alone.",
        "বিজয়ী থাকে কেবল যদি দুই রকম ভঙ্গি আসে এবং একজন একাই জয়ী ভঙ্গি দেখায়।"
      ],
      "explain": [
        [
          "With all equal or all different gestures nobody wins. With exactly two kinds, one of them appears once; that player wins only if their gesture beats the other kind.",
          "সবাই সমান বা সবাই ভিন্ন হলে কেউ জেতে না। ঠিক দুই রকম হলে একটি একবার আসে; সেই খেলোয়াড় জেতে কেবল যদি তার ভঙ্গি অন্য রকমকে হারায়।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// A winner exists only when exactly two different gestures appear, and the winner is the
// only player showing the winning one (the other two show the loser).
int main() {
    string a[3];
    cin >> a[0] >> a[1] >> a[2];
    set<string> kinds(a, a + 3);
    if (kinds.size() != 2) { cout << "?\n"; return 0; }
    auto beats = [](const string& x, const string& y) {
        return (x == "rock" && y == "scissors") || (x == "scissors" && y == "paper") || (x == "paper" && y == "rock");
    };
    string name = "FMS";
    for (int i = 0; i < 3; i++) {
        int same = 0;
        for (int j = 0; j < 3; j++) same += a[j] == a[i];
        if (same == 1 && beats(a[i], a[(i + 1) % 3] == a[i] ? a[(i + 2) % 3] : a[(i + 1) % 3])) {
            cout << name[i] << "\n";
            return 0;
        }
    }
    cout << "?\n";
}
`,
      "time": "O(1)",
      "space": "O(1)",
      "toolkit": [
        "set"
      ]
    }
  ],
  "own": [
    {
      "input": "paper\npaper\nrock",
      "output": "?",
      "note": [
        "Two kinds, but the lone gesture loses.",
        "দুই রকম, কিন্তু একা ভঙ্গিটি হারে।"
      ]
    },
    {
      "input": "rock\nscissors\nscissors",
      "output": "F",
      "note": [
        "The winner can be the first player.",
        "প্রথম খেলোয়াড়ও বিজয়ী হতে পারে।"
      ]
    },
    {
      "input": "scissors\nscissors\nrock",
      "output": "S",
      "note": [
        "The winner can be the last player.",
        "শেষ খেলোয়াড়ও বিজয়ী হতে পারে।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Declaring a winner when two players tie and the third loses to both: a winner must beat both others.",
      "দুজন সমান আর তৃতীয়জন দুজনের কাছেই হারলে বিজয়ী ঘোষণা: বিজয়ীকে দুজনকেই হারাতে হয়।"
    ],
    [
      "Mixing up the order: input order is F, M, S.",
      "ক্রম গুলিয়ে ফেলা: ইনপুটের ক্রম F, M, S।"
    ]
  ],
  "related": [
    {
      "id": "380C",
      "name": "Sereja and Brackets",
      "why": [
        "The other schedules-tagged problem here, much harder.",
        "এখানকার অন্য schedules-ট্যাগ করা সমস্যা, অনেক কঠিন।"
      ]
    }
  ],
  "toolkit": [
    "io-basics"
  ]
});

export const p400B = mk({
  "id": "400B",
  "name": "Inna and New Matrix of Candies",
  "rating": 1200,
  "tags": [
    "schedules",
    "implementation"
  ],
  "why": [
    "Each row is its own little schedule; moves run in parallel across rows, so the answer is the number of distinct distances, not their sum.",
    "প্রতিটি সারি নিজস্ব ছোট সময়সূচি; চাল সারিগুলোতে সমান্তরালে চলে, তাই উত্তর দূরত্বের যোগফল নয়, ভিন্ন ভিন্ন দূরত্বের সংখ্যা।"
  ],
  "statement": [
    "The field has n rows and m columns. Every row contains exactly one dwarf “G” and exactly one candy “S”; the other cells are empty. In one move, every dwarf that is not yet on a candy walks right one cell at a time, all together, until at least one of them lands on a candy or reaches the right wall. The game is won when every dwarf stands on a candy. It is lost if a dwarf ends up at the wall without being on a candy. Print the minimum number of moves to win, or −1 if it cannot be won.",
    "মাঠে n সারি ও m কলাম। প্রতি সারিতে ঠিক একটি বামন “G” ও ঠিক একটি ক্যান্ডি “S”; বাকি ঘর ফাঁকা। এক চালে ক্যান্ডিতে না থাকা প্রতিটি বামন একসাথে ডানে এক ঘর করে হাঁটে, যতক্ষণ না অন্তত একজন ক্যান্ডিতে পৌঁছায় বা ডান দেয়ালে ঠেকে। সব বামন ক্যান্ডিতে দাঁড়ালে খেলা জেতা হয়। কোনো বামন ক্যান্ডিতে না থেকে দেয়ালে ঠেকলে হার। জিততে ন্যূনতম চাল ছাপুন, না পারলে −১।"
  ],
  "input": [
    "n and m, then n rows of m characters from “*”, “G”, “S”.",
    "n ও m, তারপর “*”, “G”, “S” দিয়ে m অক্ষরের n সারি।"
  ],
  "output": [
    "The minimum number of moves, or −1.",
    "ন্যূনতম চালের সংখ্যা, অথবা −১।"
  ],
  "limits": {
    "timeSec": 1,
    "memoryMb": 256,
    "notes": [
      [
        "1 ≤ n ≤ 1000, 2 ≤ m ≤ 1000",
        "১ ≤ n ≤ ১০০০, ২ ≤ m ≤ ১০০০"
      ]
    ]
  },
  "samples": [
    {
      "input": "3 4\n*G*S\nG**S\n*G*S",
      "output": "2",
      "explain": [
        "Distances to the candy are 2, 3, 2. The first move walks 2 steps and finishes rows 1 and 3; the second finishes row 2.",
        "ক্যান্ডির দূরত্ব ২, ৩, ২। প্রথম চালে ২ ধাপ হেঁটে ১ ও ৩ নম্বর সারি শেষ; দ্বিতীয় চালে ২ নম্বর সারি শেষ।"
      ]
    },
    {
      "input": "1 3\nS*G",
      "output": "-1",
      "explain": [
        "The dwarf is to the right of the candy and can never reach it.",
        "বামন ক্যান্ডির ডানে, কখনো পৌঁছতে পারে না।"
      ]
    }
  ],
  "observation": [
    "A dwarf to the right of its candy can never win, so the answer is −1. Otherwise each row needs its own distance d = S − G, and a move finishes all rows whose remaining distance is the smallest one at that moment, shortening the others by the same amount. So every different distance costs exactly one move: the answer is the number of distinct distances.",
    "ক্যান্ডির ডানে থাকা বামন কখনো জিততে পারে না, তাই উত্তর −১। নইলে প্রতিটি সারির নিজস্ব দূরত্ব d = S − G, আর এক চালে সেই মুহূর্তের ক্ষুদ্রতম অবশিষ্ট দূরত্বের সব সারি শেষ হয়, বাকিদের একই পরিমাণ কমে। তাই প্রতিটি আলাদা দূরত্বে ঠিক এক চাল: উত্তর ভিন্ন দূরত্বের সংখ্যা।"
  ],
  "approach": [
    [
      "For each row find the positions of G and S.",
      "প্রতি সারিতে G ও S-এর অবস্থান খুঁজুন।"
    ],
    [
      "If G is after S in any row, print −1.",
      "কোনো সারিতে G, S-এর পরে থাকলে −১ ছাপুন।"
    ],
    [
      "Put S − G into a set; print the size of the set.",
      "S − G একটি set-এ রাখুন; set-এর আকার ছাপুন।"
    ]
  ],
  "walk": {
    "input": "3 4\n*G*S\nG**S\n*G*S",
    "steps": [
      [
        "rows",
        [
          "Distances: 2, 3, 2 → set {2, 3}.",
          "দূরত্ব: ২, ৩, ২ → set {২, ৩}।"
        ]
      ],
      [
        "answer",
        [
          "Two different distances → 2 moves.",
          "দুটি ভিন্ন দূরত্ব → ২ চাল।"
        ]
      ]
    ]
  },
  "cx": {
    "time": "O(n · m)",
    "space": "O(n)",
    "why": [
      "Reading the field dominates; the set holds at most n values.",
      "মাঠ পড়াই প্রধান; set-এ সর্বোচ্চ n টি মান।"
    ]
  },
  "sols": [
    {
      "id": "set",
      "kind": "optimal",
      "title": [
        "Set of distances",
        "দূরত্বের set"
      ],
      "idea": [
        "Insert S − G for every row; reject if any is negative.",
        "প্রতি সারির S − G ঢোকান; ঋণাত্মক হলে বাতিল।"
      ],
      "explain": [
        [
          "A move finishes the nearest candies first, so rows with the same distance finish together. Rows with different distances can never finish in the same move.",
          "এক চাল সবচেয়ে কাছের ক্যান্ডি আগে শেষ করে, তাই সমান দূরত্বের সারি একসাথে শেষ হয়। ভিন্ন দূরত্বের সারি কখনো একই চালে শেষ হয় না।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    set<int> dist;
    bool bad = false;
    for (int i = 0; i < n; i++) {
        string row;
        cin >> row;
        int g = row.find('G'), s = row.find('S');
        if (g > s) bad = true;
        else dist.insert(s - g);
    }
    cout << (bad ? -1 : (int)dist.size()) << "\n";
}
`,
      "time": "O(n · m)",
      "space": "O(n)",
      "toolkit": [
        "set"
      ]
    },
    {
      "id": "simulate",
      "kind": "alt",
      "title": [
        "Play the game literally",
        "খেলাটি আক্ষরিক খেলা"
      ],
      "idea": [
        "Each move walks all unfinished dwarves by the smallest remaining distance.",
        "প্রতি চালে সব অসমাপ্ত বামন অবশিষ্ট ক্ষুদ্রতম দূরত্ব হাঁটে।"
      ],
      "explain": [
        [
          "This is a direct simulation of the statement, jumping each move by k = the smallest remaining gap so it takes at most n moves. It confirms the “distinct distances” shortcut.",
          "বিবৃতির সরাসরি সিমুলেশন, প্রতি চালে k = ক্ষুদ্রতম অবশিষ্ট ব্যবধান ধরে লাফ, তাই সর্বোচ্চ n চাল। এটি “ভিন্ন দূরত্ব” শর্টকাট নিশ্চিত করে।"
        ]
      ],
      "code": raw`#include <bits/stdc++.h>
using namespace std;

// Play the game literally. In a move every dwarf that is not on a candy walks right, all together,
// until one of them lands on a candy or reaches the right wall.
int main() {
    int n, m;
    cin >> n >> m;
    vector<int> g(n), s(n);
    for (int i = 0; i < n; i++) {
        string row;
        cin >> row;
        g[i] = row.find('G');
        s[i] = row.find('S');
    }
    int moves = 0;
    while (true) {
        int k = INT_MAX;
        for (int i = 0; i < n; i++)
            if (g[i] != s[i]) k = min(k, g[i] < s[i] ? s[i] - g[i] : m - 1 - g[i]);
        if (k == INT_MAX) break;  // everyone is on a candy
        for (int i = 0; i < n; i++)
            if (g[i] != s[i]) {
                if (g[i] > s[i] && g[i] + k == m - 1) { cout << -1 << "\n"; return 0; }
                g[i] += k;
            }
        // a dwarf stuck at the wall right of its candy cannot ever finish
        for (int i = 0; i < n; i++)
            if (g[i] > s[i] && g[i] == m - 1) { cout << -1 << "\n"; return 0; }
        moves++;
    }
    cout << moves << "\n";
}
`,
      "time": "O(n²)",
      "space": "O(n)",
      "toolkit": [
        "vector"
      ]
    }
  ],
  "own": [
    {
      "input": "1 2\nGS",
      "output": "1",
      "note": [
        "One row, distance 1.",
        "একটি সারি, দূরত্ব ১।"
      ]
    },
    {
      "input": "2 4\nG**S\nGS**",
      "output": "2",
      "note": [
        "Distances 3 and 1: two moves.",
        "দূরত্ব ৩ ও ১: দুই চাল।"
      ]
    },
    {
      "input": "2 3\nG*S\nS*G",
      "output": "-1",
      "note": [
        "One impossible row ruins the game.",
        "একটি অসম্ভব সারিই খেলা নষ্ট করে।"
      ]
    }
  ],
  "pitfalls": [
    [
      "Adding up the distances instead of counting distinct ones.",
      "ভিন্ন দূরত্ব গোনার বদলে দূরত্ব যোগ করা।"
    ],
    [
      "Checking only the first row for the −1 case.",
      "−১ এর শর্ত শুধু প্রথম সারিতে দেখা।"
    ],
    [
      "Using the column index counted from the wrong side.",
      "ভুল দিক থেকে গোনা কলাম সূচক ব্যবহার।"
    ]
  ],
  "related": [
    {
      "id": "48A",
      "name": "Rock-paper-scissors",
      "why": [
        "Another small schedules problem, with three players.",
        "আরেকটি ছোট schedules সমস্যা, তিনজন খেলোয়াড়সহ।"
      ]
    },
    {
      "id": "380C",
      "name": "Sereja and Brackets",
      "why": [
        "The same tag at a much higher level.",
        "একই ট্যাগ অনেক উঁচু স্তরে।"
      ]
    }
  ],
  "toolkit": [
    "set"
  ]
});

export const WAVE = [p48A, p400B];
