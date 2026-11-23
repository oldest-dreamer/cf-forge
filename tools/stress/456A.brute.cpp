#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> a(n), b(n); for (int i = 0; i < n; i++) cin >> a[i] >> b[i]; bool h = false; for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (a[i] < a[j] && b[i] > b[j]) h = true; cout << (h ? "Happy Alex" : "Poor Alex") << "\n"; }
