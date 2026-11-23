#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = 50; printf("%d\n", t); while (t--) printf("%d %d\n", (int)(r() % 1000 + 1), (int)(r() % 60 + 1)); }
