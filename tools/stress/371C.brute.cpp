#include <bits/stdc++.h>
using namespace std;
int main() { string s; long long h[3], p[3], r, need[3] = {}; cin >> s >> h[0] >> h[1] >> h[2] >> p[0] >> p[1] >> p[2] >> r; for (char c : s) need[c == 'B' ? 0 : c == 'S' ? 1 : 2]++;
  long long x = 0; while (true) { long long c = 0; for (int i = 0; i < 3; i++) c += max(0LL, need[i] * (x + 1) - h[i]) * p[i]; if (c > r) break; x++; } cout << x << "\n"; }
