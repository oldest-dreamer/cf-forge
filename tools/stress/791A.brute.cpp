#include <bits/stdc++.h>
int main() { double a, b; std::cin >> a >> b; for (int y = 1;; y++) { if (a * std::pow(3, y) > b * std::pow(2, y)) { std::cout << y << "\n"; return 0; } } }
