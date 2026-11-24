#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 8 + 1; printf("%d\n", n); for (int i = 2; i <= n; i++) printf("%d ", int(r() % (i - 1) + 1)); printf("\n"); }
