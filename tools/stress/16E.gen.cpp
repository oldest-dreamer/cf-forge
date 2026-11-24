#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 6 + 1;
    double a[8][8] = {};
    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) { a[i][j] = (r() % 101) / 100.0; a[j][i] = 1 - a[i][j]; }
    printf("%d\n", n);
    for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) printf("%.2f ", a[i][j]); printf("\n"); }
}
