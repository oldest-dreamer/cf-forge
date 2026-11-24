#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 4 + 1;
    std::vector<long long> b(n);
    long long a = 0;
    std::vector<std::array<long long,3>> seg;
    for (int i = 0; i < n; i++) { long long len = r() % 6 + 1; seg.push_back({a, a + len, (long long)(r() % 4)}); a += len; }
    long long k = seg.back()[0] + r() % (seg.back()[1] - seg.back()[0] + 1);
    printf("%d %lld\n", n, k);
    for (auto& s : seg) printf("%lld %lld %lld\n", s[0], s[1], s[2]);
}
