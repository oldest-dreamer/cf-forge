#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 2, m = n + r() % 3; printf("%d %d\n", n, m); }
