#include <bits/stdc++.h>
using namespace std;
int n; vector<int> p;
int depth(int v) { return v == -1 ? 0 : 1 + depth(p[v]); }
int main() { cin >> n; p.assign(n + 1, -1); for (int i = 1; i <= n; i++) cin >> p[i]; int b = 0; for (int i = 1; i <= n; i++) b = max(b, depth(i)); cout << b << "\n"; }
