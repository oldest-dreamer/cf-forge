#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, m; cin >> n >> m; vector<string> w(n); for (auto& s : w) cin >> s; int best = INT_MAX; for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (i != j) { int d = 0; for (int k = 0; k < m; k++) { int a = w[i][k], b = w[j][k]; while (a != b) { a += a < b ? 1 : -1; d++; } } best = min(best, d); } cout << best << "\n"; } }
