#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 9 + 2; std::vector<int> p(2 * n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", p[i]); puts(""); } }
