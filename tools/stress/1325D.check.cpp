#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); long long u, w; in >> u >> w; long long L, n; ans >> L; if (!(out >> n)) return 1; if (L == -1) return n == -1 ? 0 : 1; if (n != L) return 1; long long x = 0, s = 0; for (long long i = 0; i < n; i++) { long long e; if (!(out >> e) || e < 1) return 1; x ^= e; s += e; } return (x == u && s == w) ? 0 : 1; }
