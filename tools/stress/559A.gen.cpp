#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    while (true) {
        int a1 = r() % 6 + 1, a2 = r() % 6 + 1, a3 = r() % 6 + 1, a4 = r() % 6 + 1;
        int a5 = a1 + a2 - a4, a6 = a2 + a3 - a5;
        if (a5 < 1 || a6 < 1) continue;
        printf("%d %d %d %d %d %d\n", a1, a2, a3, a4, a5, a6);
        return 0;
    }
}
