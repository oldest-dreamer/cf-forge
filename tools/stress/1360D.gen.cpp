#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) printf("%d %d\n", int(r() % 500 + 1), int(r() % 500 + 1)); }
