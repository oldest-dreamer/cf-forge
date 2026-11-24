#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 15 == 0 ? 1500 : 2 + r() % 30;
    int shape = s % 4;
    printf("%d\n", n);
    std::vector<int> id(n);
    std::iota(id.begin(), id.end(), 1);
    std::shuffle(id.begin(), id.end(), r);
    for (int i = 1; i < n; i++) {
        int p = shape == 0 ? r() % i : shape == 1 ? i - 1 : shape == 2 ? 0 : (int)(r() % std::min(i, 3));
        printf("%d %d\n", id[i], id[p]);
    }
}
