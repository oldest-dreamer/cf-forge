#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]); int t; in >> t; while (t--) { int n; in >> n; vector<long long> a(n), b(n); long long S = 0, d = 0; for (auto& x : a) { in >> x; S += x; } for (int i = 0; i < n; i++) { if (!(out >> b[i]) || b[i] < 1 || b[i] > 1000000000) return 1; d += llabs(a[i] - b[i]); } for (int i = 0; i + 1 < n; i++) { long long x = min(b[i], b[i + 1]), y = max(b[i], b[i + 1]); if (y % x) return 1; } if (2 * d > S) return 1; } return 0; }
