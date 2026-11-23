#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1, k = r() % 6 + 1, d = r() % k + 1; printf("%d %d %d\n", n, k, d); }
