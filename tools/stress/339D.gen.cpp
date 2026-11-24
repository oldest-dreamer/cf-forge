#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1, m = r() % 6 + 1; printf("%d %d\n", n, m); for (int i = 0; i < (1 << n); i++) printf("%d ", int(r() % 64)); puts(""); while (m--) printf("%d %d\n", int(r() % (1 << n) + 1), int(r() % 64)); }
