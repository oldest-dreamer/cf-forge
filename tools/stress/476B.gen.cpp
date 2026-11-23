#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 1; std::string a, b; for (int i = 0; i < n; i++) { a += "+-"[r() % 2]; b += "+-?"[r() % 3]; } printf("%s\n%s\n", a.c_str(), b.c_str()); }
