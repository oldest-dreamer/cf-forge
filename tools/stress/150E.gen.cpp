#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { mt19937 r(atoi(v[1])); int n = r() % 8 + 2; vector<array<int,3>> e; vector<vector<int>> g(n + 1);
  for (int i = 2; i <= n; i++) { int p = r() % (i - 1) + 1; e.push_back({p, i, int(r() % 6) + 1}); g[p].push_back(i); g[i].push_back(p); }
  int diam = 0; for (int s = 1; s <= n; s++) { vector<int> d(n + 1, -1), q = {s}; d[s] = 0; for (size_t h = 0; h < q.size(); h++) for (int w : g[q[h]]) if (d[w] < 0) d[w] = d[q[h]] + 1, q.push_back(w); for (int x : q) diam = max(diam, d[x]); }
  int l = r() % diam + 1, rr = l + r() % (n - l); if (rr > n - 1) rr = n - 1; if (rr < l) rr = l;
  printf("%d %d %d\n", n, l, rr); for (auto& x : e) printf("%d %d %d\n", x[0], x[1], x[2]); }
