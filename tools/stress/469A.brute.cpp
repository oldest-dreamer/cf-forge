#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> all; for (int k = 0; k < 2; k++) { int p; cin >> p; while (p--) { int x; cin >> x; all.push_back(x); } } bool ok = true; for (int lv = 1; lv <= n; lv++) if (find(all.begin(), all.end(), lv) == all.end()) ok = false; cout << (ok ? "I become the guy." : "Oh, my keyboard!") << "\n"; }
