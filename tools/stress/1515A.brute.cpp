#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, x; cin >> n >> x; vector<int> w(n); for (auto& y : w) cin >> y; sort(w.begin(), w.end()); bool found = false; do { int s = 0; bool ok = true; for (int y : w) { s += y; if (s == x) ok = false; } if (ok) { found = true; break; } } while (next_permutation(w.begin(), w.end())); if (!found) { cout << "NO\n"; continue; } cout << "YES\n"; for (int y : w) cout << y << ' '; cout << "\n"; } }
