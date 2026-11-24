#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 6, m = r() % 6 + 1;
    printf("%d %d\n", n, m);
    std::vector<std::string> mem;
    auto rnd = [&]() { int L = r() % 4 + 1; std::string s; for (int i = 0; i < L; i++) s += 'a' + r() % 3; return s; };
    for (int i = 0; i < n; i++) { mem.push_back(rnd()); puts(mem.back().c_str()); }
    for (int i = 0; i < m; i++) {
        std::string q = (n && r() % 2) ? mem[r() % n] : rnd();
        if (r() % 2 && !q.empty()) q[r() % q.size()] = 'a' + r() % 3;
        puts(q.c_str());
    }
}
