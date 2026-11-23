#include <bits/stdc++.h>
using namespace std;
vector<int> p; vector<int> path;
void go(int v) { if (v == 0) return; go(p[v]); path.push_back(v); }
int main() { int n; cin >> n; p.assign(n + 1, 0); for (int i = 2; i <= n; i++) cin >> p[i]; go(n); for (int v : path) cout << v << ' '; cout << "\n"; }
