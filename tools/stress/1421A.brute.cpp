#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { long long a, b, best = LLONG_MAX; cin >> a >> b; for (long long x = 0; x < 512; x++) best = min(best, (a ^ x) + (b ^ x)); cout << best << "\n"; } }
