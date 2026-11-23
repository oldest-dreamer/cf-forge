#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int q = r() % 3 + 1; printf("%d\n", q); while (q--) { int n = r() % 8 + 1; std::vector<int> p(n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); printf("%d\n", n); for (int x : p) printf("%d ", x); puts(""); } }
