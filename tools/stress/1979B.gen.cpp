#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int x = r() % 200, y = r() % 200; while (y == x) y = r() % 200; printf("%d %d\n", x, y); } }
