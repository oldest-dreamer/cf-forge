#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) { int n = r() % 12 + 1, a = r() % 3 + 1; std::string s; for (int i = 0; i < n; i++) s += char('a' + r() % a); if (r() % 2) { std::string rr(s.rbegin(), s.rend()); s = s.substr(0, n / 2) + std::string(1, 'a' + r() % a) + rr.substr(n - n / 2); } puts(s.c_str()); } }
