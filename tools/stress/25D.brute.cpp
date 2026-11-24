#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> p(n + 1); iota(p.begin(), p.end(), 0); function<int(int)> f = [&](int x) { return p[x] == x ? x : p[x] = f(p[x]); }; vector<pair<int,int>> ex; for (int i = 0; i < n - 1; i++) { int a, b; cin >> a >> b; if (f(a) == f(b)) ex.push_back({a, b}); else p[f(a)] = f(b); } vector<int> roots; for (int v = 1; v <= n; v++) if (f(v) == v) roots.push_back(v); cout << ex.size() << "\n"; for (size_t k = 0; k < ex.size(); k++) cout << ex[k].first << " " << ex[k].second << " " << roots[k] << " " << roots[k + 1] << "\n"; }
