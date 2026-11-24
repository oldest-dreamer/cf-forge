#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 2; std::set<std::pair<int,int>> e; while ((int)e.size() < n - 1) { int a = r() % n + 1, b = r() % n + 1; if (a == b) continue; e.insert({std::min(a, b), std::max(a, b)}); } printf("%d\n", n); for (auto [a, b] : e) printf("%d %d\n", a, b); }
