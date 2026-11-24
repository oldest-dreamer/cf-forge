#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); printf("%d %.2f %d\n", int(r() % 5 + 1), (r() % 101) / 100.0, int(r() % 12 + 1)); }
