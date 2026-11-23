#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % (r() % 2 ? 5 : 100) + 1)); puts(""); }
