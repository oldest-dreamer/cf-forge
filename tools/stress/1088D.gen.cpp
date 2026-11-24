#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    unsigned M = (1u << 30) - 1;
    unsigned a = r() & M, b = r() & M;
    int m = s % 5;
    if (m == 1) b = a;
    if (m == 2) a &= 255, b &= 255;
    if (m == 3) a = M - (r() & 7), b = r() & 7;
    printf("%u %u\n", a, b);
}
