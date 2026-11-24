#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]);
    int n, m; ll p; in >> n >> m >> p;
    vector<ll> a(n), b(m); for (auto& x : a) in >> x; for (auto& x : b) in >> x;
    ll t; if (!(out >> t) || t < 0 || t > n + m - 2) return 1;
    ll s = 0; for (int i = 0; i < n; i++) { ll j = t - i; if (j >= 0 && j < m) s += a[i] % p * (b[j] % p); }
    string x; if (out >> x) return 1;
    return s % p != 0 ? 0 : 1;
}
