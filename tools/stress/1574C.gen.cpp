#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 5 + 2, m = r() % 5 + 1; printf("%d\n", n); for (int i = 0; i < n; i++) printf("%d ", int(r() % 8 + 1)); printf("\n%d\n", m); while (m--) printf("%d %d\n", int(r() % 10 + 1), int(r() % 30 + 1)); }
