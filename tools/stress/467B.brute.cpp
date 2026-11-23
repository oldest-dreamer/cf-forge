#include <bits/stdc++.h>
using namespace std;
int main() { int n, m, k; cin >> n >> m >> k; vector<int> x(m + 1); for (auto& v : x) cin >> v; int f = 0; for (int i = 0; i < m; i++) { int a = x[i], b = x[m], d = 0; while (a || b) { d += (a & 1) != (b & 1); a >>= 1; b >>= 1; } if (d <= k) f++; } cout << f << "\n"; }
