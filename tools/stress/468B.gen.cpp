#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int M = r() % 8 + 4, a = r() % M + 2, b = r() % M + 2;
    std::set<int> s;
    if (r() % 3) {
        int k = r() % 4 + 1;
        while (k--) { int x = r() % (a - 1) + 1; s.insert(x); s.insert(a - x); }
        k = r() % 4;
        while (k--) { int x = r() % (b - 1) + 1; s.insert(x); s.insert(b - x); }
        if (r() % 4 == 0) s.insert(r() % M + 1);
    } else {
        int n = r() % 9 + 1;
        while ((int)s.size() < n && (int)s.size() < M) s.insert(r() % M + 1);
    }
    while (s.size() > 12) s.erase(s.begin());
    printf("%d %d %d\n", (int)s.size(), a, b);
    for (int x : s) printf("%d ", x);
    puts("");
}
