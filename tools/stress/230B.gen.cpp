#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { long long x = r() % 2 ? (long long)(r() % 1000 + 1) * (r() % 1000 + 1) : r() % 1000 + 1; if (r() % 3 == 0) { long long q = r() % 1000 + 1; x = q * q; } printf("%lld ", x); } puts(""); }
