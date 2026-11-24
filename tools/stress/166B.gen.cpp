#include <bits/stdc++.h>
typedef long long ll;
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    // strictly convex A: points on a circle-ish, take convex hull of random points
    std::vector<std::pair<ll,ll>> pts;
    for (int i = 0; i < 12; i++) pts.push_back({(ll)(r() % 21) - 10, (ll)(r() % 21) - 10});
    std::sort(pts.begin(), pts.end()); pts.erase(std::unique(pts.begin(), pts.end()), pts.end());
    auto cr = [](std::pair<ll,ll> o, std::pair<ll,ll> a, std::pair<ll,ll> b) { return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first); };
    std::vector<std::pair<ll,ll>> h;
    for (int pass = 0; pass < 2; pass++) {
        size_t st = h.size();
        for (auto& p : pts) { while (h.size() >= st + 2 && cr(h[h.size() - 2], h.back(), p) <= 0) h.pop_back(); h.push_back(p); }
        h.pop_back(); std::reverse(pts.begin(), pts.end());
    }
    if (h.size() < 3) { puts("3\n0 0\n0 5\n5 0\n3\n1 1\n2 1\n1 2"); return 0; }
    std::reverse(h.begin(), h.end());  // clockwise
    printf("%d\n", (int)h.size()); for (auto [x, y] : h) printf("%lld %lld\n", x, y);
    // B: a small triangle (simple polygon), clockwise
    ll x = (ll)(r() % 15) - 7, y = (ll)(r() % 15) - 7;
    printf("3\n%lld %lld\n%lld %lld\n%lld %lld\n", x, y, x, y + 1 + r() % 2, x + 1 + r() % 2, y);
}
