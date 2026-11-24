#include <bits/stdc++.h>
int main() { int n; std::cin >> n; long long b = 0; while (n--) { long long x, y; std::cin >> x >> y; b = std::max(b, x + y); } std::cout << b << "\n"; }
