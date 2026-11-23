#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 3, odd = r() % n, par = r() % 2; printf("%d\n", n); for (int i = 0; i < n; i++) { int x = 2 * (r() % 50 + 1); if ((i == odd) != (par == 1)) x--; printf("%d ", x); } puts(""); }
