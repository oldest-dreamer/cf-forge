#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, l = r() % 30 + 1; printf("%d %d\n", n, l); for (int i = 0; i < n; i++) printf("%d ", int(r() % (l + 1))); puts(""); }
