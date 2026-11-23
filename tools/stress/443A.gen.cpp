#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6; std::string s = "{"; for (int i = 0; i < n; i++) { if (i) s += ", "; s += char('a' + r() % 5); } s += "}"; puts(s.c_str()); }
