#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int a, b, d;
    do { a = r() % 3 + 1; b = r() % 3 + 1; d = r() % 3 + 1; } while (a + b + d > 6);
    printf("%d %d %d\n", a, b, d);
}
