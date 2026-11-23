#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 2, m = r() % 3 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) printf("%d ", int(r() % 2)); puts(""); for (int i = 2; i <= n; i++) printf("%d %d\n", int(r() % (i - 1) + 1), i); }
