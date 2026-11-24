#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = 10; printf("%d\n", t); while (t--) printf("%d %d %d\n", int(r() % 8 + 1), int(r() % 8 + 1), int(r() % 10 + 1)); }
