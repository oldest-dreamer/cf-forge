#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n; std::cin >> n; std::vector<int> v; for (int p = 1; n; p *= 10, n /= 10) if (n % 10) v.push_back(n % 10 * p); std::cout << v.size() << "\n"; for (int x : v) std::cout << x << " "; std::cout << "\n"; } }
