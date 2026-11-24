#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, x = r() % 3 ? r() % 300 : r() % 50000; printf("%d %d\n", n, x); for (int i = 0; i < n; i++) printf("%d ", r() % 2 ? (int)(r() % 5 + 1) : (int)(r() % 100 + 1)); puts(""); }
