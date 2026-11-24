#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; printf("%d %d %d %d\n", n, int(r() % 10), int(r() % 10), int(r() % 10)); for (int i = 0; i < n; i++) printf("%d ", int(r() % 30)); puts(""); }
