#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) { int n = r() % 10 + 1, k = r() % n + 1; std::string s; for (int i = 0; i < n; i++) s += r() % 2 ? 'B' : 'W'; printf("%d %d\n%s\n", n, k, s.c_str()); } }
