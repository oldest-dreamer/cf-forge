#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 1, q = r() % 5 + 1; printf("%d %d\n", n, q); for (int i = 0; i < n; i++) printf("%d ", int(r() % 10 + 1)); puts(""); while (q--) { int l = r() % n + 1, rr = l + r() % (n - l + 1); printf("%d %d\n", l, rr); } }
