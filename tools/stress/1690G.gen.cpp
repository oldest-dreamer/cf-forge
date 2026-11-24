#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 8 + 1, m = r() % 6 + 1; printf("\n%d %d\n", n, m); std::vector<int> a(n); for (auto& x : a) { x = r() % 30 + 1; printf("%d ", x); } puts(""); while (m--) { int k = r() % n; int d = r() % (a[k] + 1); a[k] -= d; printf("%d %d\n", k + 1, d); } } }
