#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); std::vector<int> p(n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); for (int i = 1; i < n; i++) printf("%d %d\n", p[int(r() % i)], p[i]); }
