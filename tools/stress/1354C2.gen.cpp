#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int T = 3; printf("%d\n", T); while (T--) printf("%d\n", 2 * (int)(r() % 99) + 3); }
