#include <bits/stdc++.h>
int main() { std::string s; int q; std::cin >> s >> q; while (q--) { int t; std::cin >> t; if (t == 1) { int p; char c; std::cin >> p >> c; s[p - 1] = c; } else { int l, r; std::cin >> l >> r; std::set<char> d(s.begin() + l - 1, s.begin() + r); std::cout << d.size() << "\n"; } } }
