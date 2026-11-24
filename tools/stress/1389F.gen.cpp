#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 1, R = r() % 10 + 3; printf("%d\n", n); while (n--) { int a = r() % R + 1, b = r() % R + 1; printf("%d %d %d\n", std::min(a, b), std::max(a, b), int(r() % 2)); } }
