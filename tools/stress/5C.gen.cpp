#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 14 + 1; std::string s; for (int i = 0; i < n; i++) s += "()"[r() % 2]; puts(s.c_str()); }
