#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int t; in >> t;
    while (t--) {
        ll b, cc, d, x, y;
        in >> b >> cc >> d;
        if (!(ans >> y) || !(out >> x)) return 1;
        if (y == -1) { if (x != -1) return 1; continue; }
        if (x < 0 || x > (1LL << 61) || ((x | b) - (x & cc)) != d) return 1;
    }
    string s; return (out >> s) ? 1 : 0;
}
