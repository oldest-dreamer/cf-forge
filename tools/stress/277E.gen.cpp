#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 2; std::set<std::pair<int, int>> s; while ((int)s.size() < n) s.insert({int(r() % 6), int(r() % 5)}); printf("%d\n", n); for (auto& p : s) printf("%d %d\n", p.first, p.second); }
