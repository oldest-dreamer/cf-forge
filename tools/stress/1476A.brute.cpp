#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { long long n, k; std::cin >> n >> k; for (long long m = 1;; m++) { bool ok = false; for (long long s = n; s <= n * m; s++) if (s % k == 0) ok = true; if (ok) { std::cout << m << "\n"; break; } } } }
