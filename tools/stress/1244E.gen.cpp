#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 2, k = r() % 31; printf("%d %d\n", n, k); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); puts(""); }
