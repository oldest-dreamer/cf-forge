#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 3; printf("%d\n", t);
    while (t--) {
        int n = r() % 8 + 1; printf("%d\n", n);
        std::set<std::pair<int,int>> used;
        for (int i = 0; i < n; i++) {
            int x, y; do { x = r() % 20; y = r() % 20; } while (used.count({x, y})); used.insert({x, y});
            int u, w; do { u = x + (int)(r() % 7) - 3; w = y + (int)(r() % 7) - 3; } while (u == x && w == y);
            printf("%d %d %d %d\n", x, y, u, w);
        }
    }
}
