#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 3, t = r() % (n - 1) + 2; printf("%d %d\n", n, t); for (int i = 1; i < n; i++) printf("%d ", int(r() % (n - i) + 1)); puts(""); }
