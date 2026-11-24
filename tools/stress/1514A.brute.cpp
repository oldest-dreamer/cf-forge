#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n; std::cin >> n; bool ok = false; for (int i = 0; i < n; i++) { int a; std::cin >> a; bool sq = false; for (int k = 1; k * k <= a; k++) if (k * k == a) sq = true; if (!sq) ok = true; } std::cout << (ok ? "YES" : "NO") << "\n"; } }
