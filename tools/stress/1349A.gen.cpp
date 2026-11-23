#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 7 + 2; printf("%d\n", n); int pool[] = {2, 3, 4, 6, 8, 12, 18, 24, 36, 72, 5, 10}; for (int i = 0; i < n; i++) printf("%d ", pool[r() % 12]); puts(""); }
