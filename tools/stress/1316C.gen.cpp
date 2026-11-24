#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1, m = r() % 4 + 1; int ps[] = {2, 3, 5, 7}; int p = ps[r() % 4];
  auto mk = [&](int k) { std::vector<int> a(k); for (;;) { int g = 0; for (auto& x : a) { x = r() % 12 + 1; g = std::__gcd(g, x); } if (g == 1) return a; } };
  auto a = mk(n), b = mk(m); printf("%d %d %d\n", n, m, p); for (int x : a) printf("%d ", x); puts(""); for (int x : b) printf("%d ", x); puts(""); }
