#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]); int t; in >> t; while (t--) { int n, a, b; in >> n >> a >> b; string s; if (!(out >> s) || (int)s.size() != n) return 1; for (char ch : s) if (ch < 'a' || ch > 'z') return 1; for (int i = 0; i + a <= n; i++) { set<char> d(s.begin() + i, s.begin() + i + a); if ((int)d.size() != b) return 1; } } string extra; if (out >> extra) return 1; return 0; }
