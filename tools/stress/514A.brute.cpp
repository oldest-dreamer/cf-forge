#include <bits/stdc++.h>
using namespace std;
int main() { string x; cin >> x; string o; for (size_t i = 0; i < x.size(); i++) { int t = x[i] - '0'; int u = 9 - t; int best = (i == 0 && u == 0) ? t : min(t, u); o += char('0' + best); } cout << o << "\n"; }
