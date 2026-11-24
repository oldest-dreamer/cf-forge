#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 2)); puts(""); std::vector<int> lab(n); std::iota(lab.begin(), lab.end(), 1); std::shuffle(lab.begin(), lab.end(), r); for (int i = 1; i < n; i++) printf("%d %d\n", lab[r() % i], lab[i]); }
