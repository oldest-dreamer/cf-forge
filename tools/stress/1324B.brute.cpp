#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; bool ok = false; for (int m = 0; m < (1 << n); m++) { if (__builtin_popcount(m) < 3) continue; vector<int> s; for (int i = 0; i < n; i++) if (m >> i & 1) s.push_back(a[i]); auto r = s; reverse(r.begin(), r.end()); if (r == s) ok = true; } cout << (ok ? "YES" : "NO") << "\n"; } }
