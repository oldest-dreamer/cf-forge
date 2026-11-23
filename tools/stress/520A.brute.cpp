#include <bits/stdc++.h>
using namespace std;
int main() { int n; string s; cin >> n >> s; bool ok = true; for (char c = 'a'; c <= 'z'; c++) { bool f = false; for (char x : s) if (tolower(x) == c) f = true; ok &= f; } cout << (ok ? "YES" : "NO") << "\n"; }
