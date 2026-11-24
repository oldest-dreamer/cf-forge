#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]);
    int n; in >> n; vector<long long> x(n), y(n); for (int i = 0; i < n; i++) in >> x[i] >> y[i];
    int a, b, cc; if (!(out >> a >> b >> cc)) return 1;
    if (a < 1 || b < 1 || cc < 1 || a > n || b > n || cc > n || a == b || b == cc || a == cc) return 1;
    a--, b--, cc--;
    auto cr = [&](int p, int q, int r) { return (x[q] - x[p]) * (y[r] - y[p]) - (y[q] - y[p]) * (x[r] - x[p]); };
    long long s = cr(a, b, cc); if (s == 0) return 1;
    auto sg = [](long long t) { return (t > 0) - (t < 0); };
    for (int p = 0; p < n; p++) {
        if (p == a || p == b || p == cc) continue;
        int s1 = sg(cr(a, b, p)) * sg(s), s2 = sg(cr(b, cc, p)) * sg(s), s3 = sg(cr(cc, a, p)) * sg(s);
        if (s1 >= 0 && s2 >= 0 && s3 >= 0) return 1;
    }
    return 0;
}
