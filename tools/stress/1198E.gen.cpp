#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 1, m = r() % 5 + 1; printf("%d %d\n", n, m); while (m--) { int a = r() % n + 1, b = r() % n + 1, c2 = r() % n + 1, d = r() % n + 1; printf("%d %d %d %d\n", std::min(a, b), std::min(c2, d), std::max(a, b), std::max(c2, d)); } }
