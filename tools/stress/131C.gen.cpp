#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 4, m = r() % 6 + 1, t = 5 + r() % (n + m - 4); printf("%d %d %d\n", n, m, t); }
