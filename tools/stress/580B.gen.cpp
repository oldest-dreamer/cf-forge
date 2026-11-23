#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 1; printf("%d %d\n", n, int(r() % 10 + 1)); for (int i = 0; i < n; i++) printf("%d %d\n", int(r() % 20), int(r() % 20)); }
