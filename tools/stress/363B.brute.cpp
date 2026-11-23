#include <bits/stdc++.h>
using namespace std;
int main() { int n, k; cin >> n >> k; vector<int> h(n); for (auto& x : h) cin >> x; int best = INT_MAX, at = 0; for (int i = 0; i + k <= n; i++) { int s = 0; for (int j = i; j < i + k; j++) s += h[j]; if (s < best) best = s, at = i; } cout << at + 1 << "\n"; }
