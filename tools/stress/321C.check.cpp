#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]);
    int n; in >> n;
    vector<vector<int>> g(n + 1);
    for (int i = 1; i < n; i++) { int a, b; in >> a >> b; g[a].push_back(b); g[b].push_back(a); }
    vector<string> s(n + 1);
    for (int i = 1; i <= n; i++) { if (!(out >> s[i])) return 1; if (s[i].size() != 1 || s[i][0] < 'A' || s[i][0] > 'Z') return 1; }
    string extra; if (out >> extra) return 1;
    for (int u = 1; u <= n; u++) {
        vector<int> par(n + 1, -1), q = {u}; par[u] = 0;
        for (size_t h = 0; h < q.size(); h++) for (int w : g[q[h]]) if (par[w] < 0) par[w] = q[h], q.push_back(w);
        for (int w = u + 1; w <= n; w++) {
            if (s[u] != s[w]) continue;
            bool ok = false;
            for (int x = par[w]; x != 0 && x != u; x = par[x]) if (s[x][0] < s[u][0]) ok = true;
            if (!ok) return 1;
        }
    }
    return 0;
}
