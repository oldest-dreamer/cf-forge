#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 30 + 1, m = r() % 6 + 1; printf("%d %d\n", n, m); for (int i = 0; i < m; i++) { int d = r() % 10 + 1, a = r() % n + 1, kmax = (n - a) / d, k = kmax ? r() % (kmax + 1) : 0; printf("%d %d %d\n", a, d, k); } } }
