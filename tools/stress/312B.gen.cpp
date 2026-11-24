#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int b = r() % 10 + 1, d = r() % 10 + 1; printf("%d %d %d %d\n", int(r() % b + 1), b, int(r() % d + 1), d); }
