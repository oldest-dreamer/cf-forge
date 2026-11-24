#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { std::string s; std::cin >> s; bool ok = true; const char* w = "yes"; for (int i = 0; i < 3; i++) if (s[i] != w[i] && s[i] != w[i] - 32) ok = false; std::cout << (ok ? "YES" : "NO") << "\n"; } }
