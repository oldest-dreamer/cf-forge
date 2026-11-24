#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, a = r() % 8 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { int len = r() % 3 + 1; std::string s; for (int j = 0; j < len; j++) s += char('a' + r() % a); puts(s.c_str()); } }
