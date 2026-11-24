#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 2; std::vector<std::pair<int,int>> e; int p = r() % 100; for (int i = 1; i <= n; i++) for (int j = i + 1; j <= n; j++) if (int(r() % 100) < p) e.push_back({i, j}); printf("%d %d\n", n, (int)e.size()); for (auto [a, b] : e) printf("%d %d\n", a, b); }
