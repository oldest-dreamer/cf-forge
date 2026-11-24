#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, m = r() % 6 + 1, sr = r() % n, sc = r() % m; int x = r() % 5, y = r() % 5; if (r() % 4 == 0) x = 1000000000; printf("%d %d\n%d %d\n%d %d\n", n, m, sr + 1, sc + 1, x, y); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) putchar((i == sr && j == sc) || r() % 3 ? '.' : '*'); puts(""); } }
