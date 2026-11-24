#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) { int n = r() % 4 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { int q = r() % 100 + 1; printf("%d ", r() % 3 ? q * q : int(r() % 10000 + 1)); } puts(""); } }
