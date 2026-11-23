#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1; std::string s; for (int i = 0; i < n; i++) s += "helo"[r() % 4]; puts(s.c_str()); }
