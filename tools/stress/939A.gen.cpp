#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 2; printf("%d\n", n); for (int i = 1; i <= n; i++) { int f; do f = r() % n + 1; while (f == i); printf("%d ", f); } puts(""); }
