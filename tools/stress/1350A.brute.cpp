#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { long long n, k; cin >> n >> k; while (k--) { long long f = n; for (long long d = 2; d <= n; d++) if (n % d == 0) { f = d; break; } n += f; } cout << n << "\n"; } }
