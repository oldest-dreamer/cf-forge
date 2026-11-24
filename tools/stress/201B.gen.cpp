#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1, m = r() % 4 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", int(r() % 3 ? r() % 10 : 0)); puts(""); } }
