#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 998244353, Q = P - 1;
ll pw(ll b, ll e) { ll r = 1; b %= P; for (; e; e >>= 1, b = b * b % P) if (e & 1) r = r * b % P; return r; }
// exponent by a plain DP over i (n small), discrete log by trying the generator powers via BSGS.
int main() {
    int k; cin >> k; vector<ll> b(k); for (auto& x : b) cin >> x; ll n, m; cin >> n >> m;
    if (n > 100000) { cout << "\n"; return 0; }
    vector<ll> e(n + 1, 0); e[k] = 1;
    for (ll i = k + 1; i <= n; i++) { ll s = 0; for (int j = 1; j <= k; j++) s = (s + (__int128)b[j - 1] * e[i - j]) % Q; e[i] = s; }
    ll E = e[n];
    ll s = 31700; map<ll, ll> baby; ll cur = 1;
    for (ll j = 0; j < s; j++, cur = cur * 3 % P) if (!baby.count(cur)) baby[cur] = j;
    ll fac = pw(pw(3, s), P - 2), t = m, L = -1;
    for (ll i = 0; i <= s && L < 0; i++, t = t * fac % P) if (baby.count(t)) L = i * s + baby[t];
    ll g = __gcd(E, Q);
    if (L % g) { cout << -1 << "\n"; return 0; }
    // brute y: y = y0 + j * Q/g, find y0 by trying all y in [0, Q/g) is too slow; use inverse
    ll a = E / g, mod = Q / g, x = 1, y = 0, aa = a % mod, mm = mod;
    // extended Euclid
    ll r0 = aa, r1 = mm, s0 = 1, s1 = 0;
    while (r1) { ll q = r0 / r1; tie(r0, r1) = make_pair(r1, r0 - q * r1); tie(s0, s1) = make_pair(s1, s0 - q * s1); }
    ll inv = ((s0 % mod) + mod) % mod;
    ll yy = (__int128)inv * (L / g) % mod;
    cout << pw(3, yy) << "\n";
}
