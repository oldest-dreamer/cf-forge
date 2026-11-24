#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 2, q = r() % 10 + 1; printf("%d %d\n", n, q); for (int i = 2; i <= n; i++) printf("%d %d\n", int(r() % (i - 1)) + 1, i); while (q--) printf("%d %d\n", int(r() % 2) + 1, int(r() % n) + 1); }
