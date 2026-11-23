#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); while (true) { int n = r() % 60 + 1, a = r() % 12 + 1, b = r() % 12 + 1, cc = r() % 12 + 1; bool ok = false; for (int i = 0; i * a <= n; i++) for (int j = 0; i * a + j * b <= n; j++) if ((n - i * a - j * b) % cc == 0) ok = true; if (ok) { printf("%d %d %d %d\n", n, a, b, cc); return 0; } } }
