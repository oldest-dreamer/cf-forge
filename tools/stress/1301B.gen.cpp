#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = 5; printf("%d\n", t); while (t--) { int n = r() % 7 + 2; std::vector<int> a(n); for (auto& x : a) x = r() % 3 == 0 ? -1 : int(r() % 13); a[r() % n] = -1; printf("%d\n", n); for (int x : a) printf("%d ", x); puts(""); } }
