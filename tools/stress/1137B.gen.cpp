#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 10 + 1, m = r() % 5 + 1;
    for (int i = 0; i < n; i++) putchar('0' + r() % 2);
    puts("");
    for (int i = 0; i < m; i++) putchar('0' + r() % 2);
    puts("");
}
