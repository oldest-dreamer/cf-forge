#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 10 + 3; printf("%d\n", n); printf("1\n1\n"); for (int i = 4; i <= n; i++) printf("%d\n", int(r() % std::min(i - 1, 4) + 1)); }
