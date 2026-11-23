#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; bool d = false; for (size_t i = 0; i + 7 <= s.size(); i++) { bool same = true; for (int k = 1; k < 7; k++) if (s[i + k] != s[i]) same = false; d |= same; } cout << (d ? "YES" : "NO") << "\n"; }
