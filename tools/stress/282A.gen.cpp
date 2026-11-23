#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 150 + 1; printf("%d\n", n); const char* s[] = {"++X", "X++", "--X", "X--"}; for (int i = 0; i < n; i++) printf("%s\n", s[r() % 4]); }
