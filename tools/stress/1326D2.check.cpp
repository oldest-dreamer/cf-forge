#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int t; in >> t; while (t--) { string s, a, o; in >> s; ans >> a; if (!(out >> o) || o.size() != a.size() || o.size() > s.size()) return 1; if (!equal(o.begin(), o.end(), o.rbegin())) return 1; int n = s.size(), L = o.size(); bool ok = false; for (int k = 0; k <= L && !ok; k++) if (o.compare(0, k, s, 0, k) == 0 && o.compare(k, L - k, s, n - (L - k), L - k) == 0) ok = true; if (!ok) return 1; } return 0; }
