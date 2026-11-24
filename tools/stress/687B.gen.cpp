#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 3 + 1, k = r() % 30 + 1; printf("%d %d\n", n, k); for (int i = 0; i < n; i++) printf("%d ", int(r() % 12 + 1)); puts(""); }
