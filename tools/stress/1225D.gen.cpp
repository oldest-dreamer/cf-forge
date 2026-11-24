#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 30 + 1, k = r() % 3 ? r() % 4 + 2 : r() % 99 + 2;
    printf("%d %d\n", n, k);
    int pool[] = {1, 2, 3, 4, 8, 9, 16, 18, 24, 27, 32, 36, 64, 72, 81, 100, 128, 243, 1000, 99991, 65536, 100000};
    for (int i = 0; i < n; i++) printf("%d ", r() % 3 ? pool[r() % 22] : (int)(r() % 100000 + 1));
    puts("");
}
