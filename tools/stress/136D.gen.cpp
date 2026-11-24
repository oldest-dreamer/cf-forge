#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    std::vector<std::pair<int,int>> p;
    auto rect = [&](int x, int y, int ax, int ay, int k) {  // sides (ax, ay) and k*(-ay, ax)
        p.push_back({x, y}); p.push_back({x + ax, y + ay}); p.push_back({x + ax - k * ay, y + ay + k * ax}); p.push_back({x - k * ay, y + k * ax});
    };
    int mode = r() % 3;
    if (mode == 0) { for (int i = 0; i < 8; i++) p.push_back({(int)(r() % 9), (int)(r() % 9)}); }
    else { rect((int)(r() % 10), (int)(r() % 10), (int)(r() % 3 + 1), (int)(r() % 3), 1); rect(20 + (int)(r() % 10), (int)(r() % 10), (int)(r() % 3 + 1), (int)(r() % 3), (int)(r() % 3 + 1)); if (mode == 2) p[r() % 8].first += 1; }
    std::set<std::pair<int,int>> s(p.begin(), p.end());
    if (s.size() < 8) { p.clear(); for (int i = 0; i < 8; i++) p.push_back({i, i * i}); }
    std::shuffle(p.begin(), p.end(), r);
    for (auto [x, y] : p) printf("%d %d\n", x, y);
}
