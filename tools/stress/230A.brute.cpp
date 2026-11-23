#include <bits/stdc++.h>
using namespace std;
int main() { int s, n; cin >> s >> n; vector<int> x(n), y(n), p(n); for (int i = 0; i < n; i++) cin >> x[i] >> y[i]; iota(p.begin(), p.end(), 0); bool any = false; do { long long t = s; bool ok = true; for (int i : p) { if (t <= x[i]) { ok = false; break; } t += y[i]; } if (ok) any = true; } while (next_permutation(p.begin(), p.end())); cout << (any ? "YES" : "NO") << "\n"; }
