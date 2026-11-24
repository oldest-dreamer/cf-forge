#include <bits/stdc++.h>
using namespace std;
// check input output answer: same YES/NO; a YES must come with a valid split.
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    int n;
    long long a, b;
    in >> n >> a >> b;
    vector<long long> p(n);
    for (auto& x : p) in >> x;
    string o, w;
    if (!(out >> o) || !(ans >> w) || o != w) return 1;
    if (w == "NO") return 0;
    set<long long> sa, sb;
    for (int i = 0; i < n; i++) {
        int s;
        if (!(out >> s) || (s != 0 && s != 1)) return 1;
        (s ? sb : sa).insert(p[i]);
    }
    for (long long x : sa) if (!sa.count(a - x)) return 1;
    for (long long x : sb) if (!sb.count(b - x)) return 1;
    return 0;
}
