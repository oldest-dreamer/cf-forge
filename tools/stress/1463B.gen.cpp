#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 8 + 2, mx = r() % 2 ? 20 : 1000000000; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % mx + 1)); puts(""); } }
