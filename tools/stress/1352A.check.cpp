#include <bits/stdc++.h>
using namespace std;
bool rnd(long long x) { if (x <= 0) return false; while (x % 10 == 0) x /= 10; return x < 10; }
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int t; in >> t; while (t--) { long long n; in >> n; int k, ka; out >> k; ans >> ka; for (int i = 0; i < ka; i++) { long long q; ans >> q; } if (k != ka) return 1; long long s = 0; for (int i = 0; i < k; i++) { long long q; if (!(out >> q) || !rnd(q)) return 1; s += q; } if (s != n) return 1; } return 0; }
