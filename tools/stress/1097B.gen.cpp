#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; printf("%d\n", n); int pool[] = {10, 20, 30, 60, 90, 120, 180, 45, 75, 15}; for (int i = 0; i < n; i++) printf("%d\n", r() % 2 ? pool[r() % 10] : int(r() % 180 + 1)); }
