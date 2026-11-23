#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, m = r() % (n + 1); printf("%d %d\n", n, m); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20)); puts(""); for (int i = 0; i < m; i++) { int a = r() % n + 1, b; do b = r() % n + 1; while (b == a && n > 1); if (n == 1) b = a; printf("%d %d\n", a, b); } }
