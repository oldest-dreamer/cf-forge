#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n; std::cin >> n; for (int i = 0; i < n; i++) { long long a; std::cin >> a; std::cout << (1LL << std::__lg(a)) << ' '; } std::cout << "\n"; } }
