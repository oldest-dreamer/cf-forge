#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int t; in >> t;
    while (t--) {
        long long a, b, d, o, w; in >> a >> b >> d; ans >> w;
        if (!(out >> o)) return 1;
        if (w == -1) { if (o != -1) return 1; continue; }
        if (o < 0 || o >= (1LL << 60)) return 1;
        if ((a | o) % d || (b | o) % d) return 1;
    }
    return 0;
}
