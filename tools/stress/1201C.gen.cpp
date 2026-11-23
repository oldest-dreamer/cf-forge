#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = 2 * (r() % 4) + 1; printf("%d %d\n", n, int(r() % 15 + 1)); for (int i = 0; i < n; i++) printf("%d ", int(r() % 10 + 1)); puts(""); }
