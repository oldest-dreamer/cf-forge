#include <bits/stdc++.h>
using namespace std;
int n, m; vector<int> a, b; int best = 0;
void go(int i, vector<bool>& used, int cnt) { if (i == n) { best = max(best, cnt); return; } go(i + 1, used, cnt); for (int g = 0; g < m; g++) if (!used[g] && abs(a[i] - b[g]) <= 1) { used[g] = true; go(i + 1, used, cnt + 1); used[g] = false; } }
int main() { cin >> n; a.resize(n); for (auto& x : a) cin >> x; cin >> m; b.resize(m); for (auto& x : b) cin >> x; vector<bool> u(m, false); go(0, u, 0); cout << best << "\n"; }
