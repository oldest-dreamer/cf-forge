#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int k = r() % 7 + 1, q = 5; printf("%d %d\n", k, q); for (int i = 0; i < q; i++) printf("%d\n", int(r() % 1000 + 1)); }
