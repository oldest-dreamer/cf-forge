#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n; std::cin >> n; int best = 1e9; for (int c = 0; c <= n; c++) for (int h = 0; h <= n; h++) if (4 * c + 2 * h == n) best = std::min(best, c + h); std::cout << best << "\n"; } }
