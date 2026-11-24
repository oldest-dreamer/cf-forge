#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 13 == 0 ? 40 : 2 + r() % 9;
    vector<vector<char>> seen(n + 2, vector<char>(n + 2, 0));
    vector<pair<int, int>> path;
    int x = 1 + r() % n, y = 1 + r() % n;
    int target = 2 + r() % (n * n / 2 + 1);
    path.push_back({x, y});
    seen[x][y] = 1;
    int dx[] = {1, -1, 0, 0}, dy[] = {0, 0, 1, -1};
    while ((int)path.size() < target) {
        vector<int> opts;
        for (int d = 0; d < 4; d++) {
            int nx = x + dx[d], ny = y + dy[d];
            if (nx >= 1 && nx <= n && ny >= 1 && ny <= n && !seen[nx][ny]) opts.push_back(d);
        }
        if (opts.empty()) break;
        int d = opts[r() % opts.size()];
        x += dx[d];
        y += dy[d];
        seen[x][y] = 1;
        path.push_back({x, y});
    }
    if (path.size() < 2) {  // stuck at length 1 (cannot happen for n >= 2) -- extend anyway
        path.push_back({x == n ? x - 1 : x + 1, y});
    }
    printf("%d\n", n);
    for (auto& p : path) printf("%d %d\n", p.first, p.second);
}
