#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 10 + 1; std::string s; for (int i = 0; i < n; i++) s += char('a' + r() % 3); puts(s.c_str()); } }
