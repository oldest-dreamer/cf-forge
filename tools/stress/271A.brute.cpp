#include <bits/stdc++.h>
using namespace std;
int main() { int y; cin >> y; for (int x = y + 1;; x++) { string s = to_string(x); bool ok = true; for (int i = 0; i < 4; i++) for (int j = 0; j < 4; j++) if (i != j && s[i] == s[j]) ok = false; if (ok) { cout << x << "\n"; return 0; } } }
