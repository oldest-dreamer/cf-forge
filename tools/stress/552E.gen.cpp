#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int d = r() % 10 + 1; std::string s; int stars = 0; for (int i = 0; i < d; i++) { if (i) { bool st = r() % 2 && stars < 15; s += st ? '*' : '+'; stars += st; } s += char('1' + r() % 9); } puts(s.c_str()); }
