#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; printf("%d\n", n); for (int k = 0; k < 2; k++) { for (int i = 0; i < n; i++) printf("%d ", int(r() % 20 + 1)); puts(""); } }
