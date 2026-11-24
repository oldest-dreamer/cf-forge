#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 30 + 2, k = r() % std::min(n, 100) + 1; printf("%d %d\n", n, k); for (int i = 0; i < n; i++) printf("%d ", int(r() % (n + 1))); puts(""); } }
