#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    while (true) {
        int n = r() % 6 + 3;
        std::set<std::pair<int,int>> s;
        while ((int)s.size() < n) s.insert({(int)(r() % 7) - 3, (int)(r() % 7) - 3});
        std::vector<std::pair<int,int>> p(s.begin(), s.end());
        std::shuffle(p.begin(), p.end(), r);
        bool col = true;
        for (int k = 2; k < n; k++) if ((long long)(p[1].first - p[0].first) * (p[k].second - p[0].second) - (long long)(p[1].second - p[0].second) * (p[k].first - p[0].first)) col = false;
        if (col) continue;
        printf("%d\n", n);
        for (auto [x, y] : p) printf("%d %d\n", x, y);
        return 0;
    }
}
