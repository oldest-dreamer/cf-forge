#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int a, b, cc; do { a = r() % 100 + 1; b = r() % 100 + 1; cc = r() % 100 + 1; } while (a == b || b == cc || a == cc); printf("%d %d %d\n", a, b, cc); }
