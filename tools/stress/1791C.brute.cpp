#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; string s; cin >> n >> s; int best = n; for (int k = 1; 2 * k <= n; k++) { bool ok = true; for (int i = 0; i < k; i++) if (s[i] == s[n - 1 - i]) ok = false; if (ok) best = n - 2 * k; else break; } cout << best << "\n"; } }
