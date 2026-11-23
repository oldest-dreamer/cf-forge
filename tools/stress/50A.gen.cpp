#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 1, m = r() % n + 1; printf("%d %d\n", m, n); }
