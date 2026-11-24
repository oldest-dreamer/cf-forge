#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937_64 r(atoi(v[1])); long long n = r() % 2 ? r() % 2000 + 1 : r() % 1000000000000000LL + 1; printf("%lld %d\n", n, int(r() % 20 + 1)); }
