#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> w(n); int tot = 0; for (auto& x : w) cin >> x, tot += x; bool ok = false; for (int m = 0; m < (1 << n); m++) { int s = 0; for (int i = 0; i < n; i++) if (m >> i & 1) s += w[i]; if (2 * s == tot) ok = true; } cout << (ok ? "YES" : "NO") << "\n"; } }
