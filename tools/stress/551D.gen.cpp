#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 2, l = r() % 4; long long k = r() % 4 ? r() % (1 << (l + 1)) : 0; int ms[] = {1, 2, 3, 10, 1000000007, 998244353, 97}; printf("%d %lld %d %d\n", n, k, l, ms[r() % 7]); }
