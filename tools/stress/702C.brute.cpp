#include <bits/stdc++.h>
int main() { int n, m; std::cin >> n >> m; std::vector<long long> a(n), b(m); for (auto& x : a) std::cin >> x; for (auto& x : b) std::cin >> x; long long r = 0; for (auto x : a) { long long d = LLONG_MAX; for (auto y : b) d = std::min(d, std::llabs(x - y)); r = std::max(r, d); } std::cout << r << "\n"; }
