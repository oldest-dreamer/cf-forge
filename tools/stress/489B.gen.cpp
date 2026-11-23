#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); for (int k = 0; k < 2; k++) { int n = r() % 7 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 8 + 1)); puts(""); } }
