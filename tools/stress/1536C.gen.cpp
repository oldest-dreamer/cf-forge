#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 4;
    printf("%d\n", t);
    while (t--) {
        int n = r() % 15 + 1, bias = r() % 4;
        printf("%d\n", n);
        for (int i = 0; i < n; i++) putchar(r() % 4 < (unsigned)bias ? 'D' : 'K');
        puts("");
    }
}
