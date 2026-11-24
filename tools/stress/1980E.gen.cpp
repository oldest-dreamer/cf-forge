#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 3; printf("%d\n", t);
    while (t--) {
        int n = r() % 3 + 1, m = r() % 3 + 1, N = n * m;
        std::vector<int> p(N); std::iota(p.begin(), p.end(), 1); std::shuffle(p.begin(), p.end(), r);
        printf("%d %d\n", n, m);
        for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", p[i * m + j]); puts(""); }
        std::vector<int> pr(n), pc(m); std::iota(pr.begin(), pr.end(), 0); std::iota(pc.begin(), pc.end(), 0);
        std::shuffle(pr.begin(), pr.end(), r); std::shuffle(pc.begin(), pc.end(), r);
        std::vector<int> q(N);
        for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) q[i * m + j] = p[pr[i] * m + pc[j]];
        if (r() % 2 && N > 1) { int a = r() % N, b = r() % N; std::swap(q[a], q[b]); }
        for (int i = 0; i < n; i++) { for (int j = 0; j < m; j++) printf("%d ", q[i * m + j]); puts(""); }
    }
}
