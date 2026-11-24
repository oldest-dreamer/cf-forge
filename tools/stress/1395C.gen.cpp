#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, m = r() % 6 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) printf("%d ", int(r() % 512)); puts(""); for (int i = 0; i < m; i++) printf("%d ", int(r() % 512)); puts(""); }
