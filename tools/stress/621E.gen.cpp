#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 2, b = r() % 60 + 1, x = r() % 30 + 2, k = r() % x; printf("%d %d %d %d\n", n, b, k, x); for (int i = 0; i < n; i++) printf("%d ", int(r() % 9 + 1)); puts(""); }
