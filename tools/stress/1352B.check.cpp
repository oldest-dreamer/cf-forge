#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int t; in >> t; while (t--) { long long n, k; in >> n >> k; string w, wa; out >> w; ans >> wa; if (wa == "YES") for (int i = 0; i < k; i++) { long long q; ans >> q; } if (w != wa) return 1; if (w == "NO") continue; long long s = 0; int par = -1; for (int i = 0; i < k; i++) { long long q; if (!(out >> q) || q <= 0) return 1; if (par == -1) par = q % 2; else if (q % 2 != par) return 1; s += q; } if (s != n) return 1; } return 0; }
