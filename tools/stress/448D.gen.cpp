#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 30 + 1, m = r() % 30 + 1; printf("%d %d %d\n", n, m, int(r() % (n * m) + 1)); }
