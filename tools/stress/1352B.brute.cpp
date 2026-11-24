#include <bits/stdc++.h>
using namespace std;
// exhaustive feasibility for small n: k numbers of one parity summing to n
int main() { int t; cin >> t; while (t--) { int n, k; cin >> n >> k; bool found = false; for (int p = 1; p <= 2 && !found; p++) { int rest = n - (k - 1) * p; if (rest > 0 && rest % 2 == p % 2) { cout << "YES\n"; for (int i = 0; i < k - 1; i++) cout << p << ' '; cout << rest << "\n"; found = true; } } if (!found) cout << "NO\n"; } }
