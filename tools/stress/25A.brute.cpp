#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; for (int i = 0; i < n; i++) { int same = 0; for (int j = 0; j < n; j++) if (j != i && a[j] % 2 == a[i] % 2) same++; if (same == 0) { cout << i + 1 << "\n"; return 0; } } }
