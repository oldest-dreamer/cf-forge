#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 6 + 1; printf("%d\n", t); while (t--) { std::string s = r() % 2 ? "yes" : "yez"; if (r() % 4 == 0) s[r() % 3] = 'a' + r() % 26; for (auto& ch : s) if (r() % 2) ch -= 32; puts(s.c_str()); } }
