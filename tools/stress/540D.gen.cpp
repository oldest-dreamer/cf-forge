#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int m = atoi(v[1]) % 3 ? 8 : 100; printf("%d %d %d\n", int(r() % m + 1), int(r() % m + 1), int(r() % m + 1)); }
