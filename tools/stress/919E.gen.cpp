#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int ps[] = {2, 3, 5, 7, 11, 13, 101, 1009}; int p = ps[r() % 8]; printf("%d %d %d %d\n", (int)(r() % (p - 1) + 1), (int)(r() % (p - 1) + 1), p, (int)(r() % 5000 + 1)); }
