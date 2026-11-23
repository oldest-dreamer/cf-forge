#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; long long k; cin >> n >> k; vector<long long> a(n); for (auto& x : a) cin >> x; vector<bool> dead(n, false); for (int done = 0; done < n;) { int j = -1; for (int i = 0; i < n; i++) if (!dead[i] && (j < 0 || a[i] > a[j])) j = i; a[j] -= k; if (a[j] <= 0) { dead[j] = true; done++; cout << j + 1 << ' '; } } cout << "\n"; } }
