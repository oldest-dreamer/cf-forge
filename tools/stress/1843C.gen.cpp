#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937_64 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) printf("%llu\n", (unsigned long long)(r() % 2 ? r() % 1000 + 1 : r() % 10000000000000000ULL + 1)); }
