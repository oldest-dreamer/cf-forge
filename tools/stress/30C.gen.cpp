#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 8 + 1;
    std::set<std::pair<int, int>> used;
    printf("%d\n", n);
    for (int i = 0; i < n; i++) {
        int x, y;
        do { x = r() % 7 - 3; y = r() % 7 - 3; } while (used.count({x, y}));
        used.insert({x, y});
        printf("%d %d %d %.2f\n", x, y, int(r() % 10), (r() % 101) / 100.0);
    }
}
