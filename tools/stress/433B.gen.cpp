#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); int m = r() % 6 + 1; printf("\n%d\n", m); while (m--) { int l = r() % n + 1, rr = l + r() % (n - l + 1); printf("%d %d %d\n", int(r() % 2 + 1), l, rr); } }
