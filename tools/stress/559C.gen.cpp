#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int h = r() % 10 + 1, w = r() % 10 + 1;
    std::set<std::pair<int, int>> s;
    int want = r() % 6;
    for (int t = 0; t < 50 && (int)s.size() < want; t++) {
        int a = r() % h + 1, b = r() % w + 1;
        if ((a == 1 && b == 1) || (a == h && b == w)) continue;
        s.insert({a, b});
    }
    printf("%d %d %d\n", h, w, (int)s.size());
    for (auto [a, b] : s) printf("%d %d\n", a, b);
}
