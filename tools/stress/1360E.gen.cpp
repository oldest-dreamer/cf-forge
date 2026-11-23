#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 4 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) putchar('0' + r() % 2); puts(""); } } }
