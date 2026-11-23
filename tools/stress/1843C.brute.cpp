#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { long long n, s = 0; std::cin >> n; while (n >= 1) { s += n; n /= 2; } std::cout << s << "\n"; } }
