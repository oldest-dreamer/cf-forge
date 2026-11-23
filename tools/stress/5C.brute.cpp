#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; int n = s.size(), best = 0, cnt = 0; for (int i = 0; i < n; i++) for (int j = i; j < n; j++) { int bal = 0; bool ok = true; for (int k = i; k <= j; k++) { bal += s[k] == '(' ? 1 : -1; if (bal < 0) ok = false; } if (ok && bal == 0) { int len = j - i + 1; if (len > best) best = len, cnt = 1; else if (len == best) cnt++; } } cout << best << " " << (best ? cnt : 1) << "\n"; }
