#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { long long A, B; std::cin >> A >> B; if (B == 1) std::cout << "NO\n"; else std::cout << "YES\n" << A << " " << A * B << " " << A * (B + 1) << "\n"; } }
