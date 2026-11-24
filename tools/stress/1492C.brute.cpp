#include <bits/stdc++.h>
using namespace std;
int n, m, best = 0; string s, t;
void go(int i, int prev, int w) { if (i == m) { best = max(best, w); return; } for (int p = prev + 1; p < n; p++) if (s[p] == t[i]) go(i + 1, p, i ? max(w, p - prev) : 0); }
int main() { cin >> n >> m >> s >> t; go(0, -1, 0); cout << best << "\n"; }
