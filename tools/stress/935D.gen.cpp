#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 4 + 1, m = r() % 5 + 1;
    printf("%d %d\n", n, m);
    for (int k = 0; k < 2; k++) { for (int i = 0; i < n; i++) printf("%d ", r() % 3 ? int(r() % m + 1) : 0); printf("\n"); }
}
