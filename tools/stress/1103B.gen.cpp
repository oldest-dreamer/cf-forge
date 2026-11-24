#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    long long a;
    int m = s % 6;
    if (m == 0) a = 1 + r() % 20;
    else if (m == 1) a = 1000000000 - r() % 5;
    else if (m == 2) a = (1LL << (1 + r() % 29)) + (r() % 3) - 1;
    else if (m == 3) a = 536870912 + r() % 4;
    else a = 1 + r() % 1000000000;
    if (a < 1) a = 1;
    if (a > 1000000000) a = 1000000000;
    printf("%lld\n", a);
}
