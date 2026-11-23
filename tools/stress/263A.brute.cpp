// BFS over the 1's position: each move shifts row or column by one.
#include <bits/stdc++.h>
using namespace std;
int main() { int r = 0, c = 0; for (int i = 0; i < 5; i++) for (int j = 0; j < 5; j++) { int x; cin >> x; if (x) r = i, c = j; }
  vector<vector<int>> d(5, vector<int>(5, -1)); queue<pair<int,int>> q; d[r][c] = 0; q.push({r, c});
  while (!q.empty()) { auto [a, b] = q.front(); q.pop(); int dr[] = {1,-1,0,0}, dc[] = {0,0,1,-1};
    for (int k = 0; k < 4; k++) { int x = a + dr[k], y = b + dc[k]; if (x < 0 || y < 0 || x > 4 || y > 4 || d[x][y] >= 0) continue; d[x][y] = d[a][b] + 1; q.push({x, y}); } }
  cout << d[2][2] << "\n"; }
