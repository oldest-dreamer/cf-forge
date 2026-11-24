#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { int n, acc = -1; std::cin >> n; while (n--) { int a; std::cin >> a; acc &= a; } std::cout << acc << "\n"; } }
