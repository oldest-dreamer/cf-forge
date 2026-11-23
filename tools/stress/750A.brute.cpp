#include <bits/stdc++.h>
int main() { int n, k; std::cin >> n >> k; int best = 0; for (int m = 0; m <= n; m++) { int s = 0; for (int i = 1; i <= m; i++) s += 5 * i; if (s + k <= 240) best = m; } std::cout << best << "\n"; }
