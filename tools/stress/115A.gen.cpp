#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 1; std::vector<int> perm(n); std::iota(perm.begin(), perm.end(), 1); std::shuffle(perm.begin(), perm.end(), r); std::vector<int> p(n + 1, -1);
  for (int i = 1; i < n; i++) if (r() % 4) p[perm[i]] = perm[r() % i]; printf("%d\n", n); for (int i = 1; i <= n; i++) printf("%d\n", p[i]); }
