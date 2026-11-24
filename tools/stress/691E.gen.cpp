#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937_64 r(atoi(v[1])); int n = r() % 8 + 1; long long k = r() % 30 + 1; printf("%d %lld\n", n, k); for (int i = 0; i < n; i++) printf("%llu ", r() % 3 ? r() % 64 : r() % 1000000000000000000ULL); puts(""); }
