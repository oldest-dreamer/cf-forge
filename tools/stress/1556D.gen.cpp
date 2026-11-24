#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 30 == 0 ? 10000 : 3 + r() % 8;
    int k = 1 + r() % n;
    long long hi = s % 2 ? (1LL << 30) : 8;
    printf("%d %d\n", n, k);
    for (int i = 0; i < n; i++) printf("%lld ", (long long)(r() % hi));
    puts("");
}
