#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 2, k = r() % 7 + 1; printf("%d %d\n", n, k); for (int i = 0; i < k; i++) { int a = r() % n + 1, b = r() % n + 1; while (b == a) b = r() % n + 1; printf("%d %d\n", a, b); } }
