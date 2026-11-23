#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 2, m = r() % 12; printf("%d %d\n", n, m); for (int i = 0; i < m; i++) printf("%d %d %d\n", int(r() % n + 1), int(r() % n + 1), int(r() % 10 + 1)); }
