#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 7 + 1, top = r() % 3 + 1;
    printf("%d\n", n);
    for (int i = 0; i < n; i++) printf("%d %d\n", int(r() % top + 1), int(r() % top + 1));
}
