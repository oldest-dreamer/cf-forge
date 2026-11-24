#include <bits/stdc++.h>
int main() { int q, x; std::cin >> q >> x; std::vector<int> cnt(x, 0); while (q--) { int y; std::cin >> y; cnt[y % x]++; std::vector<int> c = cnt; int v = 0; while (c[v % x] > 0) { c[v % x]--; v++; } std::cout << v << "\n"; } }
