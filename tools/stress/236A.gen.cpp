#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 30 + 1, k = r() % 26 + 1; std::string s; for (int i = 0; i < n; i++) s += char('a' + r() % k); puts(s.c_str()); }
