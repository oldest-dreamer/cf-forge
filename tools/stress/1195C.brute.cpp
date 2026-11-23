#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<long long> h[2]; for (int k = 0; k < 2; k++) { h[k].resize(n); for (auto& x : h[k]) cin >> x; } long long best = 0;
  // choose for each column: 0 none, 1 top, 2 bottom
  int total = 1; for (int i = 0; i < n; i++) total *= 3;
  for (int m = 0; m < total; m++) { int x = m, last = -1; long long s = 0; bool ok = true; for (int i = 0; i < n; i++) { int c = x % 3; x /= 3; if (!c) continue; if (c - 1 == last) ok = false; last = c - 1; s += h[c - 1][i]; } if (ok) best = max(best, s); }
  cout << best << "\n"; }
