#include <bits/stdc++.h>
int main() { int t; std::cin >> t; std::vector<bool> ok(5001, false); ok[0] = true; for (int x = 1; x <= 5000; x++) for (int rep : {11, 111, 1111}) if (x >= rep && ok[x - rep]) ok[x] = true; while (t--) { int x; std::cin >> x; std::cout << (ok[x] ? "YES" : "NO") << "\n"; } }
