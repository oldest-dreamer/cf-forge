#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; int n = s.size(); bool ok = false; for (int a = 0; a < n; a++) for (int b = a + 1; b < n; b++) for (int c = b + 1; c < n; c++) for (int d = c + 1; d < n; d++) for (int e = d + 1; e < n; e++) if (s[a]=='h'&&s[b]=='e'&&s[c]=='l'&&s[d]=='l'&&s[e]=='o') ok = true; cout << (ok ? "YES" : "NO") << "\n"; }
