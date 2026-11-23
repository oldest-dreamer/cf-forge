#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> p(n + 1, 0); for (int i = 2; i <= n; i++) cin >> p[i]; bool ok = true; for (int v = 1; v <= n; v++) { bool hasKid = false; int lk = 0; for (int c = 2; c <= n; c++) if (p[c] == v) { hasKid = true; bool leaf = true; for (int d = 2; d <= n; d++) if (p[d] == c) leaf = false; if (leaf) lk++; } if (hasKid && lk < 3) ok = false; } cout << (ok ? "Yes" : "No") << "\n"; }
