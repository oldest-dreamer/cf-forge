#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 100 + 1, k = 22 + r() % 5; std::string s; for (int i = 0; i < n; i++) { char ch = 'a' + r() % k; if (r() % 2) ch -= 32; s += ch; } printf("%d\n%s\n", n, s.c_str()); }
