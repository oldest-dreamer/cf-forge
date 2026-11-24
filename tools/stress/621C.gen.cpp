#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 4 + 3; int primes[] = {2, 3, 5, 7}; printf("%d %d\n", n, primes[r() % 4]); for (int i = 0; i < n; i++) { int a = r() % 12 + 1, b = a + r() % 6; printf("%d %d\n", a, b); } }
