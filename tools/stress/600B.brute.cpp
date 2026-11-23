#include <bits/stdc++.h>
int main() { int n, m; std::cin >> n >> m; std::vector<int> a(n); for (auto& x : a) std::cin >> x; while (m--) { int b, c = 0; std::cin >> b; for (int x : a) c += x <= b; std::cout << c << ' '; } std::cout << "\n"; }
