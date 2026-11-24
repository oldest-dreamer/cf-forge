#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 9, cc = r() % 4;
    std::vector<std::pair<char,int>> cond; int prod = 1;
    for (int i = 0; i < cc; i++) { int m = r() % 4 + 1; if (prod * m > 123) break; prod *= m; cond.push_back({(char)('A' + r() % 3), m}); }
    printf("%d %d\n", n, (int)cond.size());
    for (auto [t, m] : cond) printf("%c %d\n", t, m);
}
