#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> a(n), b(n); for (int i = 0; i < n; i++) cin >> a[i] >> b[i]; bool ok = false; for (int mask = 0; mask < (1 << n) && !ok; mask++) { bool good = true; for (int s = 0; s < 2 && good; s++) { vector<int> seen(n + 1, 0); for (int i = 0; i < n; i++) if ((mask >> i & 1) == s) { if (seen[a[i]]++ || seen[b[i]]++) good = false; } } ok = good; } cout << (ok ? "YES" : "NO") << "\n"; } }
