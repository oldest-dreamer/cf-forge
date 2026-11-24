#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    printf("3\n");
    for (int t = 0; t < 3; t++) {
        int n = r() % 9 + 1, m = r() % std::min(n, 4) + 1, k = r() % 4 + 1;
        printf("%d %d %d\n", n, m, k);
        for (int i = 0; i < n; i++) printf("%d ", int(r() % n + 1));
        printf("\n");
    }
}
