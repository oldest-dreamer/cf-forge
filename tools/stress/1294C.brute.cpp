#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { long long n; cin >> n; bool f = false; if (n <= 3000) { for (long long a = 2; a <= n && !f; a++) for (long long b = a + 1; a * b <= n && !f; b++) { if (n % (a * b)) continue; long long c = n / (a * b); if (c > b) { cout << "YES\n" << a << " " << b << " " << c << "\n"; f = true; } } if (!f) cout << "NO\n"; }
  else { // fall back to the same bounded search for large n
    for (long long a = 2; a * a * a < n && !f; a++) { if (n % a) continue; long long m = n / a; for (long long b = a + 1; b * b < m; b++) if (m % b == 0) { cout << "YES\n" << a << " " << b << " " << m / b << "\n"; f = true; break; } } if (!f) cout << "NO\n"; } } }
