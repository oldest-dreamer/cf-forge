#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 2, m = r() % 5 + 1; printf("%d %d\n", n, m); for (int i = 2; i <= n; i++) printf("%d %d %d\n", int(r() % (i - 1) + 1), i, int(r() % 6 + 1)); for (int i = 0; i < m; i++) printf("%d ", int(r() % 7 + 1)); puts(""); }
