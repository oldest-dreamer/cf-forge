#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    while (true) {
        int n = r() % 6 + 1, m = r() % 6 + 1, mx = 2 * std::max(n, m);
        std::vector<int> pool(mx); std::iota(pool.begin(), pool.end(), 1);
        std::shuffle(pool.begin(), pool.end(), r); std::vector<int> a(pool.begin(), pool.begin() + n);
        std::shuffle(pool.begin(), pool.end(), r); std::vector<int> b(pool.begin(), pool.begin() + m);
        if (r() % 2) for (int i = 0; i < std::min(n, m); i++) b[i] = a[i];  // force many matches
        std::set<int> sb(b.begin(), b.end()); if ((int)sb.size() != m) continue;
        bool diff = false; for (int d = 0; d < n * m; d++) if (a[d % n] != b[d % m]) diff = true;
        if (!diff) continue;
        printf("%d %d %d\n", n, m, (int)(r() % 60 + 1));
        for (int x : a) printf("%d ", x); puts(""); for (int x : b) printf("%d ", x); puts("");
        return 0;
    }
}
