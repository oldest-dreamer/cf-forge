#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; while (n--) { long long x; cin >> x; int d = 0; for (long long k = 1; k * k <= x; k++) if (x % k == 0) d += (k * k == x) ? 1 : 2; cout << (d == 3 ? "YES" : "NO") << "\n"; } }
