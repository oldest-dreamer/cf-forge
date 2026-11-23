#include <bits/stdc++.h>
int main() { int n; std::cin >> n; std::vector<int> a(n); for (auto& x : a) std::cin >> x; int s[2] = {0, 0}, t = 0; while (!a.empty()) { if (a.front() > a.back()) { s[t] += a.front(); a.erase(a.begin()); } else { s[t] += a.back(); a.pop_back(); } t = 1 - t; } std::cout << s[0] << " " << s[1] << "\n"; }
