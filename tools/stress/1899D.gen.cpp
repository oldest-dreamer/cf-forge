#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 4;
    printf("%d\n", t);
    while (t--) {
        int n = r() % 12 + 1;
        printf("%d\n", n);
        for (int i = 0; i < n; i++) printf("%d ", r() % 4 ? (int)(r() % 6 + 1) : (int)(r() % 1000000000 + 1));
        puts("");
    }
}
