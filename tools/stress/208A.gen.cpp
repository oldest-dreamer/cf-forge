#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int w = r() % 4 + 1; std::string s; for (int k = r() % 3; k > 0; k--) s += "WUB"; for (int i = 0; i < w; i++) { if (i) for (int k = r() % 3 + 1; k > 0; k--) s += "WUB"; int len = r() % 3 + 1; for (int j = 0; j < len; j++) s += "ABW"[r() % 3]; } for (int k = r() % 3; k > 0; k--) s += "WUB"; puts(s.c_str()); }
