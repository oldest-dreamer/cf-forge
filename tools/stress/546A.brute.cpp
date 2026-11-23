#include <bits/stdc++.h>
using namespace std;
int main() { long long k, n, w; cin >> k >> n >> w; long long c = 0; for (int i = 1; i <= w; i++) c += k * i; cout << (c > n ? c - n : 0) << "\n"; }
