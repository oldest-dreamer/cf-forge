#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 14 + 1, a = r() % 3 + 1; std::string s; for (int i = 0; i < n; i++) s += char('a' + r() % a); puts(s.c_str()); }
