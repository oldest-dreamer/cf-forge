#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    printf("3\n");
    for (int t = 0; t < 3; t++) {
        int a = r() % 9000 + 1, b = r() % (9999 - a) + 1;
        int p = 10000 - a - b, vol = r() % 8000 + 1000;
        printf("%.4f %.4f %.4f %.4f\n", a / 1e4, b / 1e4, p / 1e4, vol / 1e4);
    }
}
