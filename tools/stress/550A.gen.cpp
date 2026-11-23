#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; std::string s; for (int i = 0; i < n; i++) s += "ABC"[r() % 3]; puts(s.c_str()); }
