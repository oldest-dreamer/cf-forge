#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 30 + 1, m = r() % n + 1, k = r() % 4; const char* L = "ACGT"; int a = r() % 4 + 1; std::string s, t; for (int i = 0; i < n; i++) s += L[r() % a]; for (int i = 0; i < m; i++) t += L[r() % a]; printf("%d %d %d\n%s\n%s\n", n, m, k, s.c_str(), t.c_str()); }
