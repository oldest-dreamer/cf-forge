#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int len = r() % 6 + 1; std::string s; for (int i = 0; i < len; i++) s += "BSC"[r() % 3]; printf("%s\n%d %d %d\n%d %d %d\n%d\n", s.c_str(), int(r() % 6), int(r() % 6), int(r() % 6), int(r() % 5 + 1), int(r() % 5 + 1), int(r() % 5 + 1), int(r() % 60 + 1)); }
