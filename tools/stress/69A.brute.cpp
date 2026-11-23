#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<array<int,3>> f(n); for (auto& a : f) cin >> a[0] >> a[1] >> a[2]; bool ok = true; for (int d = 0; d < 3; d++) { int s = 0; for (auto& a : f) s += a[d]; if (s) ok = false; } cout << (ok ? "YES" : "NO") << "\n"; }
