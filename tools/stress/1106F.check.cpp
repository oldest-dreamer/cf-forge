#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 998244353;
ll pw(ll b, ll e) { ll r = 1; b %= P; for (; e; e >>= 1, b = b * b % P) if (e & 1) r = r * b % P; return r; }
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int k; in >> k; vector<ll> b(k); for (auto& x : b) in >> x; ll n, m; in >> n >> m;
    ll o, a; if (!(out >> o)) return 1; ans >> a;
    if (a == -1) return o == -1 ? 0 : 1;
    if (o < 1 || o >= P) return 1;
    // exponent of f_k in f_n by DP when n is small, else by matrix (mod P-1)
    const ll Q = P - 1;
    vector<vector<ll>> M(k, vector<ll>(k, 0)), R(k, vector<ll>(k, 0));
    for (int j = 0; j < k; j++) M[0][j] = b[j] % Q;
    for (int i = 1; i < k; i++) M[i][i - 1] = 1;
    for (int i = 0; i < k; i++) R[i][i] = 1;
    auto mul = [&](auto& x, auto& y) { vector<vector<ll>> z(k, vector<ll>(k, 0)); for (int i = 0; i < k; i++) for (int t = 0; t < k; t++) for (int j = 0; j < k; j++) z[i][j] = (z[i][j] + (__int128)x[i][t] * y[t][j]) % Q; return z; };
    for (ll e = n - k; e; e >>= 1, M = mul(M, M)) if (e & 1) R = mul(R, M);
    return pw(o, R[0][0]) == m ? 0 : 1;
}
