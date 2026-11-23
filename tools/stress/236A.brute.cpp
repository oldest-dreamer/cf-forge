#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; int d = 0; for (size_t i = 0; i < s.size(); i++) { bool first = true; for (size_t j = 0; j < i; j++) if (s[j] == s[i]) first = false; d += first; } cout << (d % 2 ? "IGNORE HIM!" : "CHAT WITH HER!") << "\n"; }
