#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) { int h = r() % 4 + 1; std::string a; for (int i = 0; i < h; i++) a += char('a' + r() % 2); std::string s = a + a; int m = r() % 3; if (m == 1) s[r() % s.size()] = 'c'; if (m == 2) s += 'a'; puts(s.c_str()); } }
