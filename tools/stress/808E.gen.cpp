#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1, m = r() % 12 + 1; printf("%d %d\n", n, m); while (n--) printf("%d %d\n", int(r() % 3 + 1), int(r() % 9 + 1)); }
