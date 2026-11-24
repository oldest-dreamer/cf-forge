#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int s = atoi(v[1]);
    int n = s % 5 == 0 ? 3 + r() % 40 : 3 + r() % 8;
    long long hi = s % 3 == 0 ? 1000000000 : 20;
    printf("%d\n", n);
    for (int i = 0; i < n; i++) printf("%lld ", (long long)(r() % hi) + 1);
    puts("");
}
