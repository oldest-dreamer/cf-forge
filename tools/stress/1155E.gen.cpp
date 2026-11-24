#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 1000003;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int deg = s % 4 == 0 ? 10 : r() % 11;
    vector<ll> a(11, 0);
    for (int i = 0; i <= deg; i++) a[i] = r() % P;
    if (s % 5 == 0) a[deg] = 1 + r() % (P - 1);
    int mode = s % 3;
    if (mode == 0) {  // force a root r0 by shifting the constant term
        ll r0 = r() % P, val = 0;
        for (int i = 10; i >= 1; i--) val = (val * r0 + a[i]) % P;
        val = val * r0 % P;
        a[0] = ((P - val) % P + P) % P;
    }
    if (mode == 1 && s % 2 == 0) { for (int i = 1; i <= 10; i++) a[i] = 0; a[0] = 1 + r() % (P - 1); }  // constant, no root
    for (int i = 0; i <= 10; i++) printf("%lld ", a[i]);
    puts("");
}
