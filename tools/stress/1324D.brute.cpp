#include <bits/stdc++.h>
int main() { int n; std::cin >> n; std::vector<long long> a(n), b(n); for (auto& x : a) std::cin >> x; for (auto& x : b) std::cin >> x; long long c = 0; for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) if (a[i] + a[j] > b[i] + b[j]) c++; std::cout << c << "\n"; }
