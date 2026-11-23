#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 20 + 2; std::string s; char cur = '0'; while ((int)s.size() < n) { int len = r() % 9 + 1; s += std::string(len, cur); cur ^= 1; } s = s.substr(0, n); if (s.find('0') == std::string::npos) s[0] = '0'; if (s.find('1') == std::string::npos) s[n - 1] = '1'; puts(s.c_str()); }
