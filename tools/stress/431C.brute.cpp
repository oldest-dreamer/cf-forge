#include <bits/stdc++.h>
using namespace std;
int n, k, d;
long long go(int s, bool big) { if (s == n) return big; long long t = 0; for (int w = 1; w <= k && s + w <= n; w++) t += go(s + w, big || w >= d); return t; }
int main() { cin >> n >> k >> d; cout << go(0, false) % 1000000007 << "\n"; }
