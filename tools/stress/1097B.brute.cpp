#include <bits/stdc++.h>
using namespace std;
int n; vector<int> a;
bool go(int i, int s) { if (i == n) return ((s % 360) + 360) % 360 == 0; return go(i + 1, s + a[i]) || go(i + 1, s - a[i]); }
int main() { cin >> n; a.resize(n); for (auto& x : a) cin >> x; cout << (go(0, 0) ? "YES" : "NO") << "\n"; }
