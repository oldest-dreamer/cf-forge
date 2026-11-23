#include <bits/stdc++.h>
using namespace std;
bool prime(int p) { if (p < 2) return false; for (int d = 2; d < p; d++) if (p % d == 0) return false; return true; }
int main() { int n; cin >> n; int ans = 0; for (int k = 1; k <= n; k++) { int c = 0; for (int p = 2; p <= k; p++) if (k % p == 0 && prime(p)) c++; if (c == 2) ans++; } cout << ans << "\n"; }
