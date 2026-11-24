#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 9 + 1, k = r() % n + 1;
    printf("%d %d\n", n, k);
    for (int i = 0; i < n; i++) { int a = r() % 12 + 1, b = r() % 12 + 1; if (a > b) std::swap(a, b); printf("%d %d\n", a, b); }
}
