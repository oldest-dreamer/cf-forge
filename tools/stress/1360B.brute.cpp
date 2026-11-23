#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> s(n); for (auto& x : s) cin >> x; int best = INT_MAX;
  for (int m = 1; m < (1 << n) - 1; m++) { int mx = INT_MIN, mn = INT_MAX; for (int i = 0; i < n; i++) if (m >> i & 1) mx = max(mx, s[i]); else mn = min(mn, s[i]); best = min(best, abs(mx - mn)); }
  cout << best << "\n"; } }
