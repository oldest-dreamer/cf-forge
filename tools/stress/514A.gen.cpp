#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int d = r() % 8 + 1; std::string s; s += char('1' + r() % 9); for (int i = 1; i < d; i++) s += char('0' + r() % 10); puts(s.c_str()); }
