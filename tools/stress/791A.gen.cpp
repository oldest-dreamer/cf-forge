#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int b = r() % 10 + 1, a = r() % b + 1; printf("%d %d\n", a, b); }
