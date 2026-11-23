#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; std::vector<int> a(n), b(n); std::iota(a.begin(), a.end(), 1); std::iota(b.begin(), b.end(), 1); std::shuffle(a.begin(), a.end(), r); if (r() % 2) b = a; else std::shuffle(b.begin(), b.end(), r); printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d %d\n", a[i], b[i]); }
