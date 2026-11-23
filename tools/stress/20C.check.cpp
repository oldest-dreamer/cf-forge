#include <bits/stdc++.h>
using namespace std;
// accepts any path from 1 to n whose length equals the reference path's length
long long pathLen(const vector<int>& p, map<pair<int,int>, long long>& w, int n) {
    if (p.empty() || p.front() != 1 || p.back() != n) return -2;
    long long s = 0;
    for (size_t i = 1; i < p.size(); i++) { auto it = w.find({p[i - 1], p[i]}); if (it == w.end()) return -2; s += it->second; }
    return s;
}
vector<int> readPath(istream& f) { vector<int> v; long long x; while (f >> x) v.push_back((int)x); return v; }
int main(int argc, char** argv) {
    ifstream in(argv[1]), out(argv[2]), ans(argv[3]);
    int n, m; in >> n >> m;
    map<pair<int,int>, long long> w;
    for (int i = 0; i < m; i++) { int a, b; long long c; in >> a >> b >> c; for (auto e : {make_pair(a, b), make_pair(b, a)}) { auto it = w.find(e); if (it == w.end() || it->second > c) w[e] = c; } }
    auto P = readPath(out), A = readPath(ans);
    if (A.size() == 1 && A[0] == -1) return (P.size() == 1 && P[0] == -1) ? 0 : 1;
    long long a = pathLen(A, w, n), p = pathLen(P, w, n);
    return (p >= 0 && p == a) ? 0 : 1;
}
