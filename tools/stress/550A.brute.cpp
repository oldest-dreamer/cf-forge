#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; int n = s.size(); bool ok = false; for (int i = 0; i + 1 < n; i++) for (int j = 0; j + 1 < n; j++) if (abs(i - j) >= 2 && s.substr(i, 2) == "AB" && s.substr(j, 2) == "BA") ok = true; cout << (ok ? "YES" : "NO") << "\n"; }
