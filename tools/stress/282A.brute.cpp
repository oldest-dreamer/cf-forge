#include <bits/stdc++.h>
int main() { int n, x = 0; std::cin >> n; while (n--) { std::string s; std::cin >> s; if (s == "++X" || s == "X++") x++; else x--; } std::cout << x << "\n"; }
