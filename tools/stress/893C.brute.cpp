#include <bits/stdc++.h>
using namespace std;
int main() { int n, m; cin >> n >> m; vector<long long> c(n + 1); for (int i = 1; i <= n; i++) cin >> c[i]; vector<int> comp(n + 1); iota(comp.begin(), comp.end(), 0); for (int i = 0; i < m; i++) { int a, b; cin >> a >> b; int ca = comp[a], cb = comp[b]; for (int v = 1; v <= n; v++) if (comp[v] == cb) comp[v] = ca; } map<int, long long> mn; for (int v = 1; v <= n; v++) { if (!mn.count(comp[v])) mn[comp[v]] = c[v]; else mn[comp[v]] = min(mn[comp[v]], c[v]); } long long s = 0; for (auto& [k, x] : mn) s += x; cout << s << "\n"; }
