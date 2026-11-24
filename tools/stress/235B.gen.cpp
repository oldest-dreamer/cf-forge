#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%.2f ", (r() % 101) / 100.0); printf("\n"); }
