#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 10 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", r() % 8 == 0 ? 1000000000 : int(r() % (n + 2))); puts(""); } }
