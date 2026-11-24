#include <bits/stdc++.h>
using namespace std;
// check input output answer: same YES/NO as the answer; a YES must come with a valid b.
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int t;
    in >> t;
    while (t--) {
        int n, x, y;
        in >> n >> x >> y;
        vector<int> a(n);
        for (int& q : a) in >> q;
        string o, w;
        if (!(out >> o) || !(ans >> w) || o != w) return 1;
        if (w == "NO") continue;
        vector<int> b(n), ca(n + 2, 0), cb(n + 2, 0);
        int gold = 0;
        for (int i = 0; i < n; i++) {
            if (!(out >> b[i]) || b[i] < 1 || b[i] > n + 1) return 1;
            ca[a[i]]++; cb[b[i]]++;
            gold += a[i] == b[i];
        }
        int common = 0;
        for (int q = 1; q <= n + 1; q++) common += min(ca[q], cb[q]);
        if (gold != x || common != y) return 1;
        for (int i = 0; i < n; i++) ans >> w;
    }
    return 0;
}
