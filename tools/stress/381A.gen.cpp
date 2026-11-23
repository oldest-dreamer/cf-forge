#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 9 + 1; std::vector<int> a(30); std::iota(a.begin(), a.end(), 1); std::shuffle(a.begin(), a.end(), r); printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", a[i]); puts(""); }
