#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; std::string s; for (int i = 0; i < n; i++) { char ch = 'a' + r() % 26; if (r() % 2) ch -= 32; s += ch; } puts(s.c_str()); }
