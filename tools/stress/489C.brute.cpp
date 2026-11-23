#include <bits/stdc++.h>
using namespace std;
int main() { int m, s; cin >> m >> s; long long lo = m == 1 ? 0 : (long long)pow(10, m - 1), hi = (long long)pow(10, m) - 1; long long mn = -1, mx = -1; for (long long x = lo; x <= hi; x++) { long long y = x; int d = 0; while (y) d += y % 10, y /= 10; if (d == s) { if (mn < 0) mn = x; mx = x; } } cout << mn << " " << mx << "\n"; }
