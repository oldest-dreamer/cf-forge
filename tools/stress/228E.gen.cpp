#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 2; std::set<std::pair<int,int>> e; int m = r() % (n * (n - 1) / 2) + 1; while ((int)e.size() < m) { int a = r() % n + 1, b = r() % n + 1; if (a != b) e.insert({std::min(a, b), std::max(a, b)}); } printf("%d %d\n", n, m); for (auto [a, b] : e) printf("%d %d %d\n", a, b, int(r() % 2)); }
