#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int pool[] = {5, 10, 13, 15, 17, 20, 25, 26, 29, 1, 2, 3, 7, 30}; printf("%d %d\n", r() % 2 ? pool[r() % 14] : (int)(r() % 30 + 1), r() % 2 ? pool[r() % 14] : (int)(r() % 30 + 1)); }
