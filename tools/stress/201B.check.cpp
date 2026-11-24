#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
// check in out ans: same minimal value, and the printed point really achieves it
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int n, m; in >> n >> m;
    vector<vector<ll>> a(n, vector<ll>(m));
    for (auto& r : a) for (auto& x : r) in >> x;
    ll va, xa, ya, vo, xo, yo;
    if (!(ans >> va >> xa >> ya) || !(out >> vo >> xo >> yo)) return 1;
    if (vo != va || xo < 0 || xo > n || yo < 0 || yo > m) return 1;
    ll s = 0;
    for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) { ll dx = 4 * xo - (4 * i + 2), dy = 4 * yo - (4 * j + 2); s += a[i][j] * (dx * dx + dy * dy); }
    string t; if (out >> t) return 1;
    return s == va ? 0 : 1;
}
