#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int a = r() % 8 + 1, b = a + 1 + r() % (9 - a); printf("%d %d %d\n", a, b, int(r() % 15 + 1)); }
