#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 8 + 1, x0 = (int)(r() % 7) - 3, y0 = (int)(r() % 7) - 3;
    printf("%d %d %d\n", n, x0, y0);
    for (int i = 0; i < n; i++) { int x, y; do { x = (int)(r() % 9) - 4; y = (int)(r() % 9) - 4; } while (x == x0 && y == y0); printf("%d %d\n", x, y); }
}
