#include <bits/stdc++.h>
using namespace std;
int n, m; vector<vector<int>> g; vector<vector<int>> seen;
long long go(int r, int c) { if (r < 0 || r >= n || c < 0 || c >= m || !g[r][c] || seen[r][c]) return 0; seen[r][c] = 1; return g[r][c] + go(r + 1, c) + go(r - 1, c) + go(r, c + 1) + go(r, c - 1); }
int main() { int t; cin >> t; while (t--) { cin >> n >> m; g.assign(n, vector<int>(m)); for (auto& row : g) for (auto& x : row) cin >> x; seen.assign(n, vector<int>(m, 0)); long long b = 0; for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) b = max(b, go(i, j)); cout << b << "\n"; } }
