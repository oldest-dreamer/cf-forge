#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 10 == 0 ? 50000 : 1 + r() % 60;
    std::vector<int> pos(n);
    std::iota(pos.begin(), pos.end(), 1);
    std::shuffle(pos.begin(), pos.end(), r);
    std::vector<int> val(n);
    for (int i = 0; i < n; i++) val[i] = (int)(r() % 1000000000);
    std::sort(val.begin(), val.end());
    if (s % 3 == 0) for (int i = 0; i < n; i++) val[i] = i * 2;
    int x = s % 7 == 0 ? 1000000000 : s % 5 == 0 ? 0 : (int)(r() % 1000000001);
    if (s % 3 == 0) x = (int)(r() % (2 * n + 2));
    std::vector<int> V(n + 1), N(n + 1);
    for (int i = 0; i < n; i++) {
        V[pos[i]] = val[i];
        N[pos[i]] = i + 1 < n ? pos[i + 1] : -1;
    }
    printf("%d %d %d\n", n, pos[0], x);
    for (int i = 1; i <= n; i++) printf("%d %d\n", V[i], N[i]);
}
