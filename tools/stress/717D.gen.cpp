#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 50 + 1, x = r() % 8 + 1; printf("%d %d\n", n, x); std::vector<double> p(x + 1); double s = 0; for (auto& q : p) q = r() % 100 + 1, s += q; for (auto& q : p) printf("%.6f ", q / s); puts(""); }
