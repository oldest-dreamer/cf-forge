#include <bits/stdc++.h>
using namespace std;
int main() { int n, k; cin >> n >> k; vector<int> a(n); for (auto& x : a) cin >> x; while (k--) { sort(a.begin(), a.end()); a[n / 2]++; } sort(a.begin(), a.end()); cout << a[n / 2] << "\n"; }
