#include <bits/stdc++.h>
using namespace std;
// check in out ans: same minimal m, and the printed k really achieves m
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int t; in >> t;
    while (t--) {
        int n; in >> n;
        vector<long long> a(n);
        for (auto& x : a) in >> x;
        long long m, k, m2, k2;
        if (!(ans >> m2 >> k2) || !(out >> m >> k)) return 1;
        if (m != m2 || k < 0 || k > 1000000000) return 1;
        long long mx = 0;
        for (int i = 0; i + 1 < n; i++) {
            long long x = a[i] == -1 ? k : a[i], y = a[i + 1] == -1 ? k : a[i + 1];
            mx = max(mx, llabs(x - y));
        }
        if (mx != m) return 1;
    }
    string s;
    return (out >> s) ? 1 : 0;
}
