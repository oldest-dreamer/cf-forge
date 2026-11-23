#include <bits/stdc++.h>
int main() { int n, t; std::cin >> n >> t; std::vector<int> a(n + 1); for (int i = 1; i < n; i++) std::cin >> a[i]; std::set<int> seen; int p = 1; while (p < n) { seen.insert(p); p += a[p]; } seen.insert(p); std::cout << (seen.count(t) ? "YES" : "NO") << "\n"; }
