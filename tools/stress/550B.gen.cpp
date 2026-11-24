#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; int l = r() % 40 + 1, rr = l + r() % 40, x = r() % 10; printf("%d %d %d %d\n", n, l, rr, x); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); puts(""); }
