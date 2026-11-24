#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 32)); puts(""); int q = r() % 8 + 1; printf("%d\n", q); while (q--) { int l = r() % n + 1, rr = r() % n + 1; if (l > rr) std::swap(l, rr); printf("%d %d\n", l, rr); } }
