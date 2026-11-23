#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<long long> b(n); for (auto& x : b) cin >> x; long long best = -1, ways = 0; for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) { long long d = llabs(b[i] - b[j]); if (d > best) best = d, ways = 1; else if (d == best) ways++; } cout << best << " " << ways << "\n"; }
