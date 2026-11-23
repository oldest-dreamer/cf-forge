#include <bits/stdc++.h>
using namespace std;
int main() { int n, l; cin >> n >> l; vector<int> a(n); for (auto& x : a) cin >> x; // try d = k/2 for k = 0..2l, check every half-point
  for (int k = 0; k <= 2 * l; k++) { bool ok = true; for (int p2 = 0; p2 <= 2 * l && ok; p2++) { bool cov = false; for (int x : a) if (abs(2 * x - p2) <= k) cov = true; if (!cov) ok = false; } if (ok) { printf("%.10f\n", k / 2.0); return 0; } } }
