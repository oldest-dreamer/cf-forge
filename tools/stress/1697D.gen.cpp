#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 20 == 0 ? 1000 : 1 + r() % 40;
    int k = s % 3 == 0 ? 26 : 1 + r() % 26;
    printf("%d\n", n);
    for (int i = 0; i < n; i++) putchar('a' + r() % k);
    puts("");
}
