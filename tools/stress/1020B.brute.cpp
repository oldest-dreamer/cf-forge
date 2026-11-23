#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<int> p(n + 1); for (int i = 1; i <= n; i++) cin >> p[i]; for (int a = 1; a <= n; a++) { vector<int> holes(n + 1, 0); int v = a; while (true) { holes[v]++; if (holes[v] == 2) break; v = p[v]; } cout << v << ' '; } cout << "\n"; }
