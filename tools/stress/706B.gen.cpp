#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); int q = r() % 6 + 1; printf("\n%d\n", q); for (int i = 0; i < q; i++) printf("%d\n", int(r() % 4 ? r() % 25 + 1 : r() % 1000000000 + 1)); }
