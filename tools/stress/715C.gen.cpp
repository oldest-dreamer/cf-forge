#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 2; int ms[] = {1, 3, 7, 9, 11, 13, 21, 27}; int M = ms[r() % 8]; printf("%d %d\n", n, M); for (int i = 1; i < n; i++) printf("%d %d %d\n", int(r() % i), i, int(r() % 10)); }
