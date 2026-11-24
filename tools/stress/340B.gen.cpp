#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    while (true) {
        int n = r() % 6 + 4; std::vector<std::pair<long long,long long>> p;
        std::set<std::pair<long long,long long>> s;
        while ((int)s.size() < n) s.insert({(long long)(r() % 21) - 10, (long long)(r() % 21) - 10});
        p.assign(s.begin(), s.end());
        bool bad = false;
        for (int a = 0; a < n; a++) for (int b = a + 1; b < n; b++) for (int d = b + 1; d < n; d++)
            if ((p[b].first - p[a].first) * (p[d].second - p[a].second) == (p[b].second - p[a].second) * (p[d].first - p[a].first)) bad = true;
        if (bad) continue;
        std::shuffle(p.begin(), p.end(), r);
        printf("%d\n", n); for (auto [x, y] : p) printf("%lld %lld\n", x, y);
        return 0;
    }
}
