#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> t(n); for (auto& x : t) cin >> x; int best = 0; for (int l = 0; l < n; l++) for (int len = 2; l + len <= n; len += 2) { int h = len / 2; bool ok = true; for (int i = l; i < l + h; i++) if (t[i] != t[l]) ok = false; for (int i = l + h; i < l + len; i++) if (t[i] != t[l + h]) ok = false; if (t[l] == t[l + h]) ok = false; if (ok) best = max(best, len); } cout << best << "\n"; }
