#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 5 + 1, m = r() % 5 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", r() % 2 ? int(r() % 9 + 1) : 0); puts(""); } } }
