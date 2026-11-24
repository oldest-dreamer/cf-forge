#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
// skewness = mean - median = N / (2k) with N = 2*sum - k*(m1+m2)
bool skew(istream& s, map<ll, int> avail, ll& N, ll& k) {
    if (!(s >> k) || k < 1) return false;
    vector<ll> e(k);
    for (auto& x : e) { if (!(s >> x)) return false; if (--avail[x] < 0) return false; }
    sort(e.begin(), e.end());
    ll sum = 0; for (ll x : e) sum += x;
    ll mid = k % 2 ? 2 * e[k / 2] : e[k / 2 - 1] + e[k / 2];
    N = 2 * sum - k * mid;
    return true;
}
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int n; in >> n; map<ll, int> av; for (int i = 0; i < n; i++) { ll x; in >> x; av[x]++; }
    ll N1, k1, N2, k2;
    if (!skew(out, av, N1, k1) || !skew(ans, av, N2, k2)) return 1;
    string t; if (out >> t) return 1;
    return (__int128)N1 * k2 == (__int128)N2 * k1 ? 0 : 1;
}
