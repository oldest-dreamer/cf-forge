#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 14 + 1, a = r() % 2 + 1; auto gen = [&](int len) { std::string s; for (int i = 0; i < len; i++) s += char('a' + r() % a); return s; }; std::string t = gen(n), x = gen(r() % 3 + 1), y = gen(r() % 3 + 1); printf("%s\n%s\n%s\n", t.c_str(), x.c_str(), y.c_str()); }
