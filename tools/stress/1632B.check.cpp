#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]); int t; in >> t; while (t--) { int n; in >> n; vector<int> p(n); vector<bool> seen(n, false); for (auto& x : p) { if (!(out >> x) || x < 0 || x >= n || seen[x]) return 1; seen[x] = true; } int mx = 0; for (int i = 0; i + 1 < n; i++) mx = max(mx, p[i] ^ p[i + 1]); if (mx != (1 << __lg(n - 1))) return 1; } return 0; }
