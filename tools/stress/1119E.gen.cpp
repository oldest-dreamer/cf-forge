#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 6)); puts(""); }
