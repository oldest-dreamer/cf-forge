#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, m; cin >> n >> m; vector<int> nb(n, 0); for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; a--, b--; nb[a] |= 1 << b; nb[b] |= 1 << a; } for (int mask = 1; mask < 1 << n; mask++) { if (__builtin_popcount(mask) > n / 2) continue; bool ok = true; for (int v = 0; v < n; v++) if (!(mask >> v & 1) && !(nb[v] & mask)) ok = false; if (ok) { cout << __builtin_popcount(mask) << "\n"; for (int v = 0; v < n; v++) if (mask >> v & 1) cout << v + 1 << ' '; cout << "\n"; break; } } } }
