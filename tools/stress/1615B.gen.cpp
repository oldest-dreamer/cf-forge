#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) { int a = r() % 3000 + 1, b = r() % 3000 + 1; if (a > b) std::swap(a, b); printf("%d %d\n", a, b); } }
