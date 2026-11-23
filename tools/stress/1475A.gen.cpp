// Mix of powers of two, small numbers and big numbers up to 1e14 (brute is the reference, so keep n moderate sometimes).
#include <bits/stdc++.h>
using namespace std;
int main(int argc, char** argv) {
    mt19937_64 rng(atoi(argv[1]));
    int t = 30;
    printf("%d\n", t);
    for (int i = 0; i < t; i++) {
        long long n;
        int kind = rng() % 4;
        if (kind == 0) n = 1LL << (rng() % 46 + 1);
        else if (kind == 1) n = (long long)(rng() % 1000000) + 2;
        else if (kind == 2) n = (1LL << (rng() % 30)) * (long long)(rng() % 999 * 2 + 3);
        else n = (long long)(rng() % 99999999999LL) + 2;
        printf("%lld\n", n);
    }
}
