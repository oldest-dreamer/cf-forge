#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 12 + 1, a = r() % 3 + 1; std::string s; for (int i = 0; i < n; i++) s += char('1' + r() % a); if (r() % 2) for (auto& ch : s) ch = char('1' + r() % 3); puts(s.c_str()); } }
