#include <bits/stdc++.h>
int main() { std::string s; std::cin >> s; int n = s.size(); std::vector<std::pair<int,int>> out; for (int l = 1; l <= n; l++) { if (s.substr(0, l) != s.substr(n - l)) continue; int c = 0; for (int i = 0; i + l <= n; i++) if (s.compare(i, l, s, 0, l) == 0) c++; out.push_back({l, c}); } printf("%d\n", (int)out.size()); for (auto [l, c] : out) printf("%d %d\n", l, c); }
