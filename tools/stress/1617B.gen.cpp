#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 4 + 1; printf("%d\n", t); while (t--) printf("%d\n", int(r() % 2 ? r() % 200 + 10 : r() % 1000000000 + 10)); }
