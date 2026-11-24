#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int n; in >> n; vector<ll> x(n), y(n); for (int i = 0; i < n; i++) in >> x[i] >> y[i];
    int a, b, p, q; if (!(out >> a >> b)) return 1; ans >> p >> q;
    if (a < 1 || b < 1 || a > n || b > n || a == b) return 1;
    auto ang = [&](int i, int j, ll& cc, ll& d) { i--, j--; cc = llabs(x[i] * y[j] - y[i] * x[j]); d = x[i] * x[j] + y[i] * y[j]; };
    ll c1, d1, c2, d2; ang(a, b, c1, d1); ang(p, q, c2, d2);
    // fail if angle(ans) < angle(out): d2*c1 - c2*d1 > 0
    return d2 * c1 - c2 * d1 > 0 ? 1 : 0;
}
