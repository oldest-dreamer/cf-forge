#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 3 + 1, m = r() % 3 + 1, d = r() % 4 + 1, base = r() % 4; printf("%d %d %d\n", n, m, d); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", r() % 8 ? base + d * int(r() % 6) + d : int(r() % 15 + 1)); puts(""); } }
