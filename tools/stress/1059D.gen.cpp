#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, s = r() % 2 ? 1 : -1; printf("%d\n", n); while (n--) { int y = int(r() % 4 + 1) * (r() % 12 ? s : -s); printf("%d %d\n", int(r() % 11) - 5, y); } }
