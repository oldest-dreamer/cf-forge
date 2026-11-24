#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 40 + 1; printf("%d %d\n", n, int(r() % 11) - 5); for (int i = 0; i < n; i++) printf("%d ", int(r() % 11) - 5); puts(""); }
