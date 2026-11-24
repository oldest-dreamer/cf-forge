#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); std::vector<int> p = {1, 2, 3, 4, 5, 6, 7}; std::shuffle(p.begin(), p.end(), r); int n = r() % 4 + 1, m = r() % 14 + 1; printf("%d %d\n", n, m); for (int i = 0; i < n; i++) printf("%d ", p[i]); puts(""); }
