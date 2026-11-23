#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, m = r() % 5 + 1; printf("%d %d\n", n, m); for (int g = 0; g < m; g++) { std::vector<int> p(n); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r); int k = r() % (n + 1); if (k > 3) k = 3; printf("%d", k); for (int i = 0; i < k; i++) printf(" %d", p[i]); puts(""); } }
