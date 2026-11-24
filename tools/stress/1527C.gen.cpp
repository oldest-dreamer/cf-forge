#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 4;
    printf("%d\n", t);
    while (t--) {
        int n = r() % 15 + 1, k = r() % 4 + 1;
        printf("%d\n", n);
        for (int i = 0; i < n; i++) printf("%d ", (int)(r() % k) * 250000000 + 1);
        puts("");
    }
}
