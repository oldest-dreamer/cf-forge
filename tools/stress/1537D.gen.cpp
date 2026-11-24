#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) printf("%d\n", r() % 3 == 0 ? 1 << (r() % 14) : int(r() % 3000 + 1)); }
