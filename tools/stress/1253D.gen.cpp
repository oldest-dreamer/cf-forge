#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1, m = r() % 8; printf("%d %d\n", n, m); for (int i = 0; i < m; i++) { int a = r() % n + 1, b = r() % n + 1; printf("%d %d\n", a, b); } }
