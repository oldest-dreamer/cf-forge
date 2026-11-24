#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n, k; cin >> n >> k; map<int,int> c; for (int i = 0; i < n; i++) { int a; cin >> a; c[a]++; } int bl = -1, br = -1; for (int l = 1; l <= 20; l++) for (int r = l; r <= 20; r++) { bool ok = true; for (int x = l; x <= r; x++) if (c[x] < k) ok = false; if (ok && (bl == -1 || r - l > br - bl)) bl = l, br = r; } if (bl == -1) cout << -1 << "\n"; else cout << bl << " " << br << "\n"; } }
