#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 11 + 2, k = r() % 6 + 1; printf("%d %d\n", n, k); for (int i = 2; i <= n; i++) printf("%d %d\n", int(r() % (i - 1)) + 1, i); }
