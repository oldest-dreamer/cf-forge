#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, t = r() % 6 + 1; std::string s; for (int i = 0; i < n; i++) s += "BG"[r() % 2]; printf("%d %d\n%s\n", n, t, s.c_str()); }
