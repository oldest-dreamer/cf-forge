#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 5;
    printf("%d\n", t);
    while (t--) {
        int n = r() % 9 + 3, k = r() % 3 + 1;
        printf("%d\n", n);
        for (int i = 0; i < n; i++) putchar('a' + r() % k);
        puts("");
    }
}
