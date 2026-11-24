#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n, m;
    if (s % 7 == 0) { n = 2 + r() % 3; m = 2 + r() % 3; }
    else if (s % 11 == 0) { n = 1000; m = 1000; }
    else { n = 2 + r() % 12; m = 2 + r() % 12; }
    printf("%d %d %d %d\n", n, m, int(r() % n + 1), int(r() % m + 1));
}
