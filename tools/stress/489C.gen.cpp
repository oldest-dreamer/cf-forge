#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int m = r() % 6 + 1; printf("%d %d\n", m, int(r() % (9 * m + 3))); }
