#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 40 == 0 ? 10000 : 3 + r() % 6;
    std::vector<int> p(n);
    std::iota(p.begin(), p.end(), 1);
    std::shuffle(p.begin(), p.end(), r);
    printf("%d\n", n);
    for (int x : p) printf("%d ", x);
    puts("");
}
