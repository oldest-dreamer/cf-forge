#include <bits/stdc++.h>
using namespace std;
int n; vector<int> a; int best = INT_MAX;
void go(int i, int last, int rest) { if (i == n) { best = min(best, rest); return; } go(i + 1, 0, rest + 1); if ((a[i] == 1 || a[i] == 3) && last != 1) go(i + 1, 1, rest); if ((a[i] == 2 || a[i] == 3) && last != 2) go(i + 1, 2, rest); }
int main() { cin >> n; a.resize(n); for (auto& x : a) cin >> x; go(0, 0, 0); cout << best << "\n"; }
