#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 14 + 1; std::string s; for (int i = 0; i < n; i++) s += r() % 2 ? '(' : ')'; int m = r() % 6 + 1; printf("%s\n%d\n", s.c_str(), m); while (m--) { int a = r() % n + 1, b = r() % n + 1; if (a > b) std::swap(a, b); printf("%d %d\n", a, b); } }
