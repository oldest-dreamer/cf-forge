#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 2, d = r() % (n - 1) + 1; printf("%d %d\n", n, d); for (int i = 0; i < d; i++) { int x = r() % n + 1, y = r() % n + 1; while (y == x) y = r() % n + 1; printf("%d %d\n", x, y); } }
