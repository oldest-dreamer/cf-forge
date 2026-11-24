#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int q = r() % 12 + 1, x = r() % 5 + 1; printf("%d %d\n", q, x); while (q--) printf("%d\n", int(r() % 15)); }
