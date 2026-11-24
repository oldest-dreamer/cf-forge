#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1, m = r() % 5 + 1; int p = r() % 3 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) putchar(r() % 4 < p + 1 ? '#' : '.'); puts(""); } }
