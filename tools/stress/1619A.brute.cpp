#include <bits/stdc++.h>
int main() { int t; std::cin >> t; while (t--) { std::string s; std::cin >> s; bool ok = false; for (size_t k = 0; k <= s.size(); k++) { std::string a = s.substr(0, k); if (a + a == s) ok = true; } std::cout << (ok ? "YES" : "NO") << "\n"; } }
