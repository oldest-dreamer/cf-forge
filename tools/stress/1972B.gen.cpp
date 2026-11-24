#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 8 + 1; std::string s; for (int i = 0; i < n; i++) s += r() % 2 ? 'U' : 'D'; printf("%d\n%s\n", n, s.c_str()); } }
