#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    long long n = r() % 60 + 1, m = r() % 60 + 1; int k = r() % 4 + 1;
    std::vector<long long> a(k);
    if (r() % 2) { long long i = r() % n + 1, j = r() % m + 1; for (int l = 0; l < k; l++) a[l] = std::__gcd(i, j + l); }
    else for (auto& x : a) x = r() % 12 + 1;
    printf("%lld %lld %d\n", n, m, k); for (auto x : a) printf("%lld ", x); puts("");
}
