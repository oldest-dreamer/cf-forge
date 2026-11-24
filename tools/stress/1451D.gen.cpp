#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) { int k = r() % 20 + 1, d = k + r() % (40 * k); printf("%d %d\n", d, k); } }
