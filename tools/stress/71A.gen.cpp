#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 20 + 1; printf("%d\n", n); while (n--) { int L = r() % 3 ? r() % 15 + 1 : r() % 100 + 1; std::string s; for (int i = 0; i < L; i++) s += char('a' + r() % 26); printf("%s\n", s.c_str()); } }
