#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 2; std::vector<int> t(n); for (auto& x : t) x = r() % 2 + 1; t[0] = 1; t[n - 1] = 2; std::shuffle(t.begin(), t.end(), r); printf("%d\n", n); for (int x : t) printf("%d ", x); puts(""); }
