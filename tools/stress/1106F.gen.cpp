#include <bits/stdc++.h>
typedef long long ll;
const ll P = 998244353;
ll pw(ll b, ll e) { ll r = 1; b %= P; for (; e; e >>= 1, b = b * b % P) if (e & 1) r = r * b % P; return r; }
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int k = r() % 4 + 1; ll n = k + 1 + r() % 12;
    std::vector<ll> b(k);
    for (auto& x : b) x = r() % 3 ? r() % 10 + 1 : (ll)(r() % 998244352) + 1;
    printf("%d\n", k); for (auto x : b) printf("%lld ", x); puts("");
    ll m;
    if (r() % 3) {  // solvable: simulate from a random f_k
        std::vector<ll> f(n + 1, 1); f[k] = r() % (P - 1) + 1;
        for (ll i = k + 1; i <= n; i++) { f[i] = 1; for (int j = 1; j <= k; j++) f[i] = f[i] * pw(f[i - j], b[j - 1]) % P; }
        m = f[n];
    } else m = r() % (P - 1) + 1;
    printf("%lld %lld\n", n, m);
}
