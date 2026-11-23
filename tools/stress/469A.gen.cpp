#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1; printf("%d\n", n); for (int k = 0; k < 2; k++) { std::vector<int> a; for (int i = 1; i <= n; i++) if (r() % 3) a.push_back(i); std::shuffle(a.begin(), a.end(), r); printf("%d", (int)a.size()); for (int x : a) printf(" %d", x); puts(""); } }
