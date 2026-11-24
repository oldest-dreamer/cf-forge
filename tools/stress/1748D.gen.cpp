#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = 5; printf("%d\n", t); while (t--) printf("%d %d %d\n", (int)(r() % 255 + 1), (int)(r() % 255 + 1), (int)(r() % 255 + 1)); }
