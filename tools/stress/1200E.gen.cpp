#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, a = r() % 2 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { int len = r() % 5 + 1; std::string w; for (int j = 0; j < len; j++) w += char('a' + r() % a); printf("%s ", w.c_str()); } puts(""); }
