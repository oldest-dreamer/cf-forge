#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 10 + 1; std::vector<int> p(n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); printf("%d\n", n); for (int x : p) printf("%d ", x); puts(""); } }
