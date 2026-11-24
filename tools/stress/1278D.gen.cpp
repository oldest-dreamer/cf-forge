#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 1; std::vector<int> p(2 * n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d %d\n", std::min(p[2 * i], p[2 * i + 1]), std::max(p[2 * i], p[2 * i + 1])); }
