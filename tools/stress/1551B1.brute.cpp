#include <bits/stdc++.h>
using namespace std;
// try all colourings (0 none, 1 red, 2 green) for tiny strings
int main() { int t; cin >> t; while (t--) { string s; cin >> s; int n = s.size(), best = 0, total = 1; for (int i = 0; i < n; i++) total *= 3; for (int m = 0; m < total; m++) { int x = m, r = 0, g = 0; vector<int> col(n); for (int i = 0; i < n; i++) { col[i] = x % 3; x /= 3; } bool ok = true; for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (col[i] && col[i] == col[j] && s[i] == s[j]) ok = false; for (int i = 0; i < n; i++) r += col[i] == 1, g += col[i] == 2; if (ok && r == g) best = max(best, r); } cout << best << "\n"; } }
