#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 5 + 2, m = r() % 4 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) { std::string s; for (int j = 0; j < m; j++) s += char('a' + r() % 26); puts(s.c_str()); } } }
