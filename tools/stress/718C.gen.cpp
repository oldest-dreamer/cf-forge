#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 8 + 1, m = r() % 8 + 1;
    printf("%d %d\n", n, m);
    for (int i = 0; i < n; i++) printf("%d ", r() % 2 ? (int)(r() % 10 + 1) : (int)(r() % 1000000000 + 1)); puts("");
    bool any = false;
    for (int i = 0; i < m; i++) {
        int l = r() % n + 1, rr = l + r() % (n - l + 1);
        if (r() % 2 || (i == m - 1 && !any)) { printf("2 %d %d\n", l, rr); any = true; }
        else printf("1 %d %d %d\n", l, rr, r() % 2 ? (int)(r() % 10 + 1) : (int)(r() % 1000000000 + 1));
    }
}
