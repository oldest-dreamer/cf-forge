#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, m; cin >> n >> m; vector<array<int,3>> c(m); for (auto& [a, b, w] : c) { string s; cin >> a >> b >> s; a--, b--; w = s[0] == 'i'; } int best = -1; for (int mask = 0; mask < (1 << n); mask++) { bool ok = true; for (auto [a, b, w] : c) { int ia = mask >> a & 1, ib = mask >> b & 1; bool claim = w ? ib == 1 : ib == 0; if (ia == 0 && !claim) ok = false; if (ia == 1 && claim) ok = false; } if (ok) best = max(best, __builtin_popcount(mask)); } cout << best << "\n"; } }
