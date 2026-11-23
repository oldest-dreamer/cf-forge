#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int p = r() % 25; for (int i = 0; i < 25; i++) printf("%d%c", i == p, i % 5 == 4 ? '\n' : ' '); }
