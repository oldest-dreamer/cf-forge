#include <bits/stdc++.h>
using namespace std;
// Hall-type subset condition: decides YES/NO independently of any flow code.
int main() { int n, m; cin >> n >> m; vector<long long> a(n), b(n); for (auto& x : a) cin >> x; for (auto& x : b) cin >> x; vector<int> nb(n); for (int i = 0; i < n; i++) nb[i] = 1 << i; for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; u--, v--; nb[u] |= 1 << v; nb[v] |= 1 << u; } bool ok = accumulate(a.begin(), a.end(), 0LL) == accumulate(b.begin(), b.end(), 0LL); for (int X = 1; X < (1 << n) && ok; X++) { long long need = 0, have = 0; int N = 0; for (int j = 0; j < n; j++) if (X >> j & 1) { need += b[j]; N |= nb[j]; } for (int i = 0; i < n; i++) if (N >> i & 1) have += a[i]; if (need > have) ok = false; } cout << (ok ? "YES" : "NO") << "\n"; }
