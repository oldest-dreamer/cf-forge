#include <bits/stdc++.h>
int main() { int n, m, t; std::cin >> n >> m >> t; long long w = 0; for (int mask = 0; mask < 1 << (n + m); mask++) { if (__builtin_popcount(mask) != t) continue; int b = __builtin_popcount(mask & ((1 << n) - 1)); if (b >= 4 && t - b >= 1) w++; } std::cout << w << "\n"; }
