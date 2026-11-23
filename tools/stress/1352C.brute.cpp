#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { long long n, k, c = 0, x = 0; std::cin >> n >> k; while (c < k) { x++; if (x % n) c++; } std::cout << x << "\n"; } }
