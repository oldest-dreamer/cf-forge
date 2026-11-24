#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 12 + 1; std::vector<int> a(n, 0); int k = r() % (n / 2 + 1); std::vector<int> idx(n); std::iota(idx.begin(), idx.end(), 0); std::shuffle(idx.begin(), idx.end(), r); for (int i = 0; i < k; i++) a[idx[i]] = 1; printf("%d\n", n); for (int x : a) printf("%d ", x); puts(""); }
