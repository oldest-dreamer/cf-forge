#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
ll X[8], Y[8];
int shape(vector<int> p) {
    vector<ll> d;
    for (int i = 0; i < 4; i++) for (int j = i + 1; j < 4; j++) { ll dx = X[p[i]] - X[p[j]], dy = Y[p[i]] - Y[p[j]]; d.push_back(dx * dx + dy * dy); }
    sort(d.begin(), d.end());
    if (d[0] == 0 || d[0] != d[1] || d[2] != d[3] || d[4] != d[5] || d[0] + d[2] != d[4]) return 0;
    return d[0] == d[2] ? 2 : 1;
}
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    for (int i = 0; i < 8; i++) in >> X[i] >> Y[i];
    string o, w; ans >> w; if (!(out >> o)) return 1;
    if (o != w) return 1;
    if (o == "NO") return 0;
    vector<int> a(4), b(4); set<int> all;
    for (auto& x : a) { if (!(out >> x) || x < 1 || x > 8) return 1; x--; all.insert(x); }
    for (auto& x : b) { if (!(out >> x) || x < 1 || x > 8) return 1; x--; all.insert(x); }
    if (all.size() != 8) return 1;
    return shape(a) == 2 && shape(b) >= 1 ? 0 : 1;
}
