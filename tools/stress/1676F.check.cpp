#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int t; in >> t; while (t--) { int n, k; in >> n >> k; map<long long,int> cnt; for (int i = 0; i < n; i++) { long long a; in >> a; cnt[a]++; } long long al, ol; ans >> al; out >> ol; if (!out) return 1; if (al == -1) { if (ol != -1) return 1; continue; } long long ar, orr; ans >> ar; if (!(out >> orr)) return 1; if (orr - ol != ar - al || ol > orr) return 1; for (long long x = ol; x <= orr; x++) if (cnt[x] < k) return 1; } return 0; }
