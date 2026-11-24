#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) { int n = r() % 40 + 1, a = r() % n + 1, b = r() % std::min(26, a) + 1; printf("%d %d %d\n", n, a, b); } }
