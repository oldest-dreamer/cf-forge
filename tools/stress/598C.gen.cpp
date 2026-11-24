#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 7 + 2; std::set<std::pair<int,int>> dirs; std::vector<std::pair<int,int>> out;
    while ((int)out.size() < n) {
        int x = (int)(r() % 21) - 10, y = (int)(r() % 21) - 10; if (!x && !y) continue;
        int g = std::gcd(abs(x), abs(y)); if (dirs.count({x / g, y / g})) continue;
        dirs.insert({x / g, y / g}); out.push_back({x, y});
    }
    printf("%d\n", n); for (auto [x, y] : out) printf("%d %d\n", x, y);
}
