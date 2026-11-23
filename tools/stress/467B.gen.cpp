#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, m = r() % 5 + 1, k = r() % n + 1; printf("%d %d %d\n", n, m, k); for (int i = 0; i <= m; i++) printf("%d\n", n == 1 ? 1 : int(r() % ((1 << n) - 1) + 1)); }
