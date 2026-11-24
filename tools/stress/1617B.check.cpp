#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]); int t; in >> t; while (t--) { long long n, a, b, cc; in >> n; if (!(out >> a >> b >> cc)) return 1; if (a < 1 || b < 1 || cc < 1 || a == b || b == cc || a == cc || a + b + cc != n || gcd(a, b) != cc) return 1; } return 0; }
