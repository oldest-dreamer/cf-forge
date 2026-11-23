#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 50 + 1; printf("%d\n", n); while (n--) printf("%d %d %d\n", (int)(r() % 2), (int)(r() % 2), (int)(r() % 2)); }
