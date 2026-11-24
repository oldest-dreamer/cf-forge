#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 2; std::vector<int> p(n); std::iota(p.begin(), p.end(), 0); std::vector<std::pair<int,int>> e;
  // random forest: each node i>0 optionally attaches to an earlier node
  for (int i = 1; i < n; i++) if (r() % 3) e.push_back({int(r() % i) + 1, i + 1});
  int q = r() % 8 + 1; printf("%d %d %d\n", n, (int)e.size(), q); for (auto& x : e) printf("%d %d\n", x.first, x.second);
  while (q--) { if (r() % 2) printf("1 %d\n", int(r() % n) + 1); else printf("2 %d %d\n", int(r() % n) + 1, int(r() % n) + 1); } }
