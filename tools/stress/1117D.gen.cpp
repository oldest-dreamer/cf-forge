#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); printf("%d %d\n", int(r() % 3000 + 1), int(r() % 12 + 2)); }
