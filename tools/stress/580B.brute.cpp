#include <bits/stdc++.h>
using namespace std;
int main() { int n; long long d; cin >> n >> d; vector<long long> m(n), s(n); for (int i = 0; i < n; i++) cin >> m[i] >> s[i]; long long best = 0; for (int mask = 1; mask < (1 << n); mask++) { long long lo = LLONG_MAX, hi = LLONG_MIN, sum = 0; for (int i = 0; i < n; i++) if (mask >> i & 1) lo = min(lo, m[i]), hi = max(hi, m[i]), sum += s[i]; if (hi - lo < d) best = max(best, sum); } cout << best << "\n"; }
