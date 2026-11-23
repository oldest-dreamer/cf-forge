#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; if (is_sorted(a.begin(), a.end())) { cout << "yes\n1 1\n"; return 0; } for (int l = 0; l < n; l++) for (int r = l + 1; r < n; r++) { auto b = a; reverse(b.begin() + l, b.begin() + r + 1); if (is_sorted(b.begin(), b.end())) { cout << "yes\n" << l + 1 << " " << r + 1 << "\n"; return 0; } } cout << "no\n"; }
