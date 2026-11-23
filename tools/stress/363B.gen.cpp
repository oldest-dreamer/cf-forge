#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 1, k = r() % n + 1; printf("%d %d\n", n, k); for (int i = 0; i < n; i++) printf("%d ", int(r() % 5 + 1)); puts(""); }
