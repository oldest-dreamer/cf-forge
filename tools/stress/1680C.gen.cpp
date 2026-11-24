#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 12 + 1, p = r() % 100; std::string s; for (int i = 0; i < n; i++) s += int(r() % 100) < p ? '1' : '0'; puts(s.c_str()); } }
