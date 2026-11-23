#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { int n; cin >> n; bool ok = false; for (int b = 0; b * 2021 <= n; b++) if ((n - b * 2021) % 2020 == 0) ok = true; cout << (ok ? "YES" : "NO") << "\n"; } }
