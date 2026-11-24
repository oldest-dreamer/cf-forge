#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int R = r() % 10 + 1, x1 = (int)(r() % 11) - 5, y1 = (int)(r() % 11) - 5;
    int x2 = r() % 5 ? x1 + (int)(r() % 9) - 4 : x1, y2 = r() % 5 ? y1 + (int)(r() % 9) - 4 : y1;
    if (r() % 6 == 0) x2 = x1 + 20;
    printf("%d %d %d %d %d\n", R, x1, y1, x2, y2);
}
