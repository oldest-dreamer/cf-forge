#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 8 + 1; std::string s(n, '1'); for (int i = 0; i < (n + 1) / 2; i++) if (r() % 2) s[i] = s[n - 1 - i] = '0'; if (s.find('0') == std::string::npos) s[n / 2] = s[n - 1 - n / 2] = '0'; printf("%d\n%s\n", n, s.c_str()); } }
