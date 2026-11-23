#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 2; printf("%d\n", n); for (int k = 0; k < 2; k++) { for (int i = 0; i < n; i++) printf("%d ", int(r() % 10 + 1)); puts(""); } }
