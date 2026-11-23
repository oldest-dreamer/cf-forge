#include <bits/stdc++.h>
int main() { int n, ans = 0; std::cin >> n; while (n--) { int s = 0; for (int i = 0; i < 3; i++) { int x; std::cin >> x; if (x == 1) s++; } if (s >= 2) ans++; } std::cout << ans << "\n"; }
