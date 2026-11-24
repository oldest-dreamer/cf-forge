#include <bits/stdc++.h>
using namespace std;
bool sub(const string& a, const string& t) { size_t j = 0; for (char c : a) if (j < t.size() && c == t[j]) j++; return j == t.size(); }
int main() { string s, t; cin >> s >> t; int n = s.size(), best = 0; for (int l = 0; l < n; l++) for (int r = l; r < n; r++) if (sub(s.substr(0, l) + s.substr(r + 1), t)) best = max(best, r - l + 1); cout << best << "\n"; }
