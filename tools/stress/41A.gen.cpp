#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 1; std::string s, t; for (int i = 0; i < n; i++) s += char('a' + r() % 2); t = std::string(s.rbegin(), s.rend()); int m = r() % 3; if (m == 1) t[r() % n] = 'a' + r() % 2; if (m == 2) t += 'a'; printf("%s\n%s\n", s.c_str(), t.c_str()); }
