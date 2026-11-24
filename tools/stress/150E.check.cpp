#include <bits/stdc++.h>
using namespace std;
int n, L, R;
vector<vector<pair<int,int>>> g;
bool path(int u, int v, int& len, int& med) {
    vector<int> par(n + 1, -1), pw(n + 1, 0), q = {u}; par[u] = 0;
    for (size_t h = 0; h < q.size(); h++) for (auto [w, c] : g[q[h]]) if (par[w] < 0) par[w] = q[h], pw[w] = c, q.push_back(w);
    vector<int> ws; for (int x = v; x != u; x = par[x]) ws.push_back(pw[x]);
    sort(ws.begin(), ws.end()); len = ws.size(); med = ws[len / 2]; return true;
}
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    in >> n >> L >> R; g.assign(n + 1, {});
    for (int i = 1; i < n; i++) { int a, b, w; in >> a >> b >> w; g[a].push_back({b, w}); g[b].push_back({a, w}); }
    int u, w, a, b; if (!(out >> u >> w) || !(ans >> a >> b)) return 1;
    if (u == w || u < 1 || w < 1 || u > n || w > n) return 1;
    int l1, m1, l2, m2; path(u, w, l1, m1); path(a, b, l2, m2);
    if (l1 < L || l1 > R) return 1;
    return m1 == m2 ? 0 : 1;
}
