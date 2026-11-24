#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, k; string s; cin >> n >> k >> s; int starts = n - k + 1, best = INT_MAX; for (int mask = 0; mask < (1 << starts); mask++) { vector<bool> w(n, false); for (int i = 0; i < starts; i++) if (mask >> i & 1) for (int j = i; j < i + k; j++) w[j] = true; bool ok = true; for (int i = 0; i < n; i++) if (s[i] == 'B' && !w[i]) ok = false; if (ok) best = min(best, __builtin_popcount(mask)); } cout << best << "\n"; } }
