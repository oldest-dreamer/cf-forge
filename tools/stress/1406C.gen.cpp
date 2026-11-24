#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 6 + 3; printf("%d\n", n); std::vector<int> lab(n); std::iota(lab.begin(), lab.end(), 1); std::shuffle(lab.begin(), lab.end(), r); for (int i = 1; i < n; i++) printf("%d %d\n", lab[r() % i], lab[i]); } }
