#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 2, z = r() % 10 + 1; printf("%d %d\n", n, z); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); puts(""); }
