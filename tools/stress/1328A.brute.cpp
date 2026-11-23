#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { long long a, b, m = 0; std::cin >> a >> b; while ((a + m) % b) m++; std::cout << m << "\n"; } }
