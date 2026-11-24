#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int n, m; in >> n >> m; vector<array<int,3>> e(m); for (auto& [a, b, w] : e) in >> a >> b >> w; string A, O; ans >> A; if (!(out >> O)) return 1; if (A == "Impossible") return O == "Impossible" ? 0 : 1; if (O == "Impossible") return 1; int k = stoi(O); if (k < 0 || k > n) return 1; vector<int> x(n + 1, 0); for (int i = 0; i < k; i++) { int y; if (!(out >> y) || y < 1 || y > n) return 1; x[y] ^= 1; } for (auto [a, b, w] : e) if ((w ^ x[a] ^ x[b]) != 1) return 1; return 0; }
