#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int s = r() % 10 + 1, n = r() % 5 + 1; printf("%d %d\n", s, n); for (int i = 0; i < n; i++) printf("%d %d\n", int(r() % 20 + 1), int(r() % 6)); }
