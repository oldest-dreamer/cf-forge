#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) printf("%d %d\n", int(r() % 30 + 1), int(r() % 30 + 1)); }
