#include <bits/stdc++.h>
// The statement guarantees that the exit cell (n, m) is empty.
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 3 + 1, m = r() % 4 + 1; printf("%d %d\n", n, m); const char* ch = "..#GB"; for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) putchar(i == n - 1 && j == m - 1 ? '.' : ch[r() % 5]); puts(""); } } }
