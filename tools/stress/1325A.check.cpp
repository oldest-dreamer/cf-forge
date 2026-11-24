#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]); int t; in >> t; while (t--) { long long x, a, b; in >> x; if (!(out >> a >> b) || a < 1 || b < 1) return 1; if (gcd(a, b) + a / gcd(a, b) * b != x) return 1; } string extra; return (out >> extra) ? 1 : 0; }
