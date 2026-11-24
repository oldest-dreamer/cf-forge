#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { string s; cin >> s; int n = s.size(), best = 0; for (int m = 0; m < (1 << n); m++) { string u; for (int i = 0; i < n; i++) if (m >> i & 1) u += s[i]; if (u.size() % 2) continue; bool ok = true; for (size_t i = 0; i < u.size(); i += 2) if (u[i] != u[i + 1]) ok = false; if (ok) best = max(best, (int)u.size()); } cout << n - best << "\n"; } }
