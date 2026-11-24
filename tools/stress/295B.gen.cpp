#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) printf("%d ", i == j ? 0 : int(r() % 30 + 1)); puts(""); } std::vector<int> p(n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); for (int x : p) printf("%d ", x); puts(""); }
