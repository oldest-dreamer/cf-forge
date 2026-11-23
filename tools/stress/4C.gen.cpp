#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { int len = r() % 2 + 1; std::string s; for (int k = 0; k < len; k++) s += char('a' + r() % 2); puts(s.c_str()); } }
