#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    long long m = r() % 30 + 3; int n = r() % 5;
    printf("%d %lld\n", n, m);
    for (int i = 0; i < n; i++) { long long l = 2 + r() % (m - 2), rr = l + r() % (m - l); printf("%d %lld %lld\n", (int)(r() % 3 + 1), l, rr); }
}
