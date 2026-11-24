#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 3 + 3; printf("%d %d %d\n", n, int(r() % 11) - 5, int(r() % 11) - 5); for (int i = 0; i < n; i++) printf("%d %d\n", int(r() % 11) - 5, int(r() % 11) - 5); }
