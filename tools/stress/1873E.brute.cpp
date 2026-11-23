#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n; long long x; std::cin >> n >> x; std::vector<long long> a(n); for (auto& v : a) std::cin >> v; long long h = 1; while (true) { long long w = 0; for (auto v : a) w += std::max(0LL, h + 1 - v); if (w > x) break; h++; } std::cout << h << "\n"; } }
