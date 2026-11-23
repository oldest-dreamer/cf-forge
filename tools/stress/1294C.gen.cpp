#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 5 + 1; printf("%d\n", t); while (t--) printf("%d\n", int(r() % 3 ? r() % 2000 + 2 : r() % 1000000000 + 2)); }
