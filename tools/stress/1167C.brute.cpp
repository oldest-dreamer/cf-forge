#include <bits/stdc++.h>
using namespace std;
int main() { int n, m; cin >> n >> m; vector<vector<int>> groups(m); for (auto& g : groups) { int k; cin >> k; g.resize(k); for (auto& x : g) cin >> x; } for (int x = 1; x <= n; x++) { vector<int> know(n + 1, 0); know[x] = 1; bool ch = true; while (ch) { ch = false; for (auto& g : groups) { bool any = false; for (int u : g) if (know[u]) any = true; if (any) for (int u : g) if (!know[u]) know[u] = 1, ch = true; } } cout << count(know.begin(), know.end(), 1) << ' '; } cout << "\n"; }
