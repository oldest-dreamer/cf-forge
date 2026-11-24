#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { std::string s; std::cin >> s; int n = s.size(), k = std::count(s.begin(), s.end(), '1'), best = k; for (int l = 0; l < n; l++) for (int r = l; r < n; r++) { int z = 0, o = 0; for (int i = l; i <= r; i++) (s[i] == '0' ? z : o)++; best = std::min(best, std::max(z, k - o)); } std::cout << best << "\n"; } }
