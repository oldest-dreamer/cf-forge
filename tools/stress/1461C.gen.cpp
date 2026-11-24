#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    printf("3\n");
    for (int t = 0; t < 3; t++) {
        int n = r() % 6 + 1, m = r() % 6 + 1;
        std::vector<int> a(n);
        std::iota(a.begin(), a.end(), 1);
        int k = r() % (n + 1);  // shuffle only a prefix so sorted cases appear
        std::shuffle(a.begin(), a.begin() + k, r);
        printf("%d %d\n", n, m);
        for (int x : a) printf("%d ", x);
        printf("\n");
        for (int i = 0; i < m; i++) printf("%d %.2f\n", int(r() % n + 1), (r() % 101) / 100.0);
    }
}
