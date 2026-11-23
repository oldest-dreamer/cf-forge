#include <bits/stdc++.h>
int main() { std::string s, t; std::cin >> s >> t; int k = std::max(abs(s[0] - t[0]), abs(s[1] - t[1])); std::cout << k << "\n"; int x = s[0], y = s[1]; while (x != t[0] || y != t[1]) { std::string m; if (x < t[0]) m += 'R', x++; else if (x > t[0]) m += 'L', x--; if (y < t[1]) m += 'U', y++; else if (y > t[1]) m += 'D', y--; std::cout << m << "\n"; } }
