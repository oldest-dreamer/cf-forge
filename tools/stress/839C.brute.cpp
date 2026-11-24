#include <bits/stdc++.h>
using namespace std;
int n; vector<vector<int>> adj; double ans = 0;
// Explore every walk the horse can take, with its probability.
void go(int v, int parent, int len, double pr) { vector<int> nx; for (int u : adj[v]) if (u != parent) nx.push_back(u); if (nx.empty()) { ans += pr * len; return; } for (int u : nx) go(u, v, len + 1, pr / nx.size()); }
int main() { cin >> n; adj.resize(n + 1); for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; adj[a].push_back(b); adj[b].push_back(a); } go(1, 0, 0, 1.0); printf("%.15f\n", ans); }
