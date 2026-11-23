#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<string> db; while (n--) { string s; cin >> s; if (find(db.begin(), db.end(), s) == db.end()) { db.push_back(s); cout << "OK\n"; continue; } for (int i = 1;; i++) { string c = s + to_string(i); if (find(db.begin(), db.end(), c) == db.end()) { db.push_back(c); cout << c << "\n"; break; } } } }
