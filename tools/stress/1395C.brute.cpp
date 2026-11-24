#include <bits/stdc++.h>
using namespace std;
int n, m, best = INT_MAX; vector<int> a, b;
void go(int i, int acc) { if (acc >= best) return; if (i == n) { best = acc; return; } for (int j = 0; j < m; j++) go(i + 1, acc | (a[i] & b[j])); }
int main() { cin >> n >> m; a.resize(n); b.resize(m); for (auto& x : a) cin >> x; for (auto& x : b) cin >> x; go(0, 0); cout << best << "\n"; }
