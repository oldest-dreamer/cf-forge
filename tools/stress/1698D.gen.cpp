#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 25 == 0 ? 9999 : 3 + 2 * (r() % 30);
    std::vector<int> id(n);
    std::iota(id.begin(), id.end(), 1);
    std::shuffle(id.begin(), id.end(), r);
    std::vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) a[i] = i;
    for (int k = 0; k + 1 < n; k += 2) std::swap(a[id[k]], a[id[k + 1]]);  // id[n-1] stays fixed
    printf("%d\n", n);
    for (int i = 1; i <= n; i++) printf("%d ", a[i]);
    puts("");
}
