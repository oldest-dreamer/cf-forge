#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 10 == 0 ? 100000 : s % 3 == 0 ? 2 + r() % 5 : 2 + r() % 300;
    std::vector<int> p(n);
    std::iota(p.begin(), p.end(), 1);
    std::shuffle(p.begin(), p.end(), r);
    printf("%d\n", n);
    for (int x : p) printf("%d ", x);
    puts("");
}
