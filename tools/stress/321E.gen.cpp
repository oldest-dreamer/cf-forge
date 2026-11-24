#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, k = r() % n + 1; printf("%d %d\n", n, k); std::vector<std::vector<int>> a(n, std::vector<int>(n, 0)); for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) a[i][j] = a[j][i] = r() % 10; for (auto& row : a) { for (int x : row) printf("%d ", x); puts(""); } }
