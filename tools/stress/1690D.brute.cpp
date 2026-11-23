#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n, k; std::string s; std::cin >> n >> k >> s; int best = 1e9; for (int i = 0; i + k <= n; i++) best = std::min(best, (int)std::count(s.begin() + i, s.begin() + i + k, 'W')); std::cout << best << "\n"; } }
