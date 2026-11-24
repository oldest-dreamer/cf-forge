#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = 6; printf("%d\n", t); while (t--) { int n = r() % 3 + 1, k = r() % 3 + 2; printf("%d %d\n", n, k); for (int i = 0; i < n; i++) printf("%d ", int(r() % 31)); puts(""); } }
