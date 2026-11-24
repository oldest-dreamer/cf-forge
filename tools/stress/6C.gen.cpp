#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, mx = r() % 2 ? 3 : 20; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % mx + 1)); puts(""); }
