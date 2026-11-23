#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 1, m = r() % 5 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) printf("%d ", int(r() % 100 + 1)); puts(""); for (int i = 0; i < m; i++) printf("%d ", int(r() % 100 + 1)); puts(""); }
