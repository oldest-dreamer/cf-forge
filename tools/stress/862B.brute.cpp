#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<vector<int>> adj(n + 1); set<pair<int,int>> E; for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); adj[b].push_back(a); E.insert({min(a,b), max(a,b)}); } vector<int> col(n + 1, -1); col[1] = 0; vector<int> q = {1}; for (size_t i = 0; i < q.size(); i++) for (int u : adj[q[i]]) if (col[u] < 0) col[u] = 1 - col[q[i]], q.push_back(u); long long add = 0; for (int a = 1; a <= n; a++) for (int b = a + 1; b <= n; b++) if (col[a] != col[b] && !E.count({a, b})) add++; cout << add << "\n"; }
