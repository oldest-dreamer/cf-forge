#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 10 + 1;
    printf("%d\n", n);
    std::vector<long long> a(n), b(n);
    for (int i = 0; i < n; i++) {
        a[i] = (int)(r() % 7) - 3;
        b[i] = (int)(r() % 7) - 3;
        if (r() % 5 == 0) { a[i] *= 333333333; b[i] *= 333333333; }
    }
    for (auto x : a) printf("%lld ", x);
    puts("");
    for (auto x : b) printf("%lld ", x);
    puts("");
}
