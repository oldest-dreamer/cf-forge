#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; std::set<std::pair<int,int>> s; while ((int)s.size() < n) s.insert({int(r() % 6 + 1), int(r() % 6 + 1)}); printf("%d\n", n); for (auto [x, y] : s) printf("%d %d\n", x, y); }
