#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1, m = r() % 2 ? 2 : 100; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d %d %d\n", int(r() % (2 * m + 1)) - m, int(r() % (2 * m + 1)) - m, int(r() % (2 * m + 1)) - m); }
