#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 1, m = r() % 5 + 1; printf("%d %d %d\n", n, m, int(r() % 8)); for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", int(r() % 8)); puts(""); } }
